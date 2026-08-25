/* ==========================================================================
   Teacher Lu Studio — Migração e Backup
   --------------------------------------------------------------------------
   Leva os dados que JÁ existem no localStorage para o Supabase, uma única
   vez, com conferência antes e depois.

   REGRAS QUE ESTE ARQUIVO NUNCA QUEBRA
   ------------------------------------
   • Não apaga nada do localStorage. Nem depois de terminar (§31).
   • Não roda sozinho. Só quando você clica em migracao.html (§30).
   • Rodar duas vezes por engano não duplica nada (§19): toda operação usa
     a chave primária da linha — aluno por id, aula por (aluno, data),
     conteúdo por (aluno, conteúdo, data), exercício por (aluno, exercício).
   • Não sobrescreve a nuvem em silêncio: se já houver dados lá, a tela
     mostra o que existe e espera sua confirmação.

   O QUE NÃO ENTRA NESTA FASE
   --------------------------
   Finance. Continua 100% no armazenamento atual (§21). O backup abaixo
   COPIA as chaves do Finance mesmo assim — backup é seguro, migração é
   escopo.
   ========================================================================== */

(function (global) {
  'use strict';

  var NS = global.TeacherLu = global.TeacherLu || {};

  var PREFIX_PROGRESS = 'sabatovicz_progress_';
  var PREFIX_PRACTICE = 'sabatovicz_practice_';
  var KEY_STUDENTS    = 'sabatovicz_students';
  var KEY_CUSTOM      = 'sabatovicz_custom_content';
  var PREFIX_SCHED    = 'sched|';

  function parse(raw, fb) {
    if (raw == null) return fb;
    try { var v = JSON.parse(raw); return v == null ? fb : v; } catch (e) { return fb; }
  }
  function get(k, fb) { return parse(localStorage.getItem(k), fb); }
  function isDate(s) { return /^\d{4}-\d{2}-\d{2}$/.test(String(s || '')); }

  /* ======================================================================
     1–4. ANÁLISE
     ====================================================================== */

  /**
   * Varre o localStorage e devolve o retrato completo do que seria enviado,
   * junto com tudo que parece errado. Não escreve nada em lugar nenhum.
   */
  function analyze() {
    var r = {
      students: [], lessons: [], content: [], notes: [],
      custom: [], practice: [],
      counts: {}, ids: { students: [], contents: [], exercises: [] },
      duplicates: [], warnings: []
    };

    /* -- alunos -- */
    var stu = get(KEY_STUDENTS, []);
    var seenStu = {};
    (Array.isArray(stu) ? stu : []).forEach(function (s, i) {
      if (!s || !s.id) { r.warnings.push('Aluno sem id na posição ' + i + ' — ignorado.'); return; }
      if (seenStu[s.id]) { r.duplicates.push('Aluno repetido: ' + s.id); return; }
      seenStu[s.id] = true;
      var known = { id:1, name:1, emoji:1, level:1, age:1, schedule:1 };
      var extra = {};
      Object.keys(s).forEach(function (k) { if (!known[k]) extra[k] = s[k]; });
      r.students.push({
        id: String(s.id), name: String(s.name || s.id),
        emoji: String(s.emoji || ''), level: String(s.level || ''),
        age: s.age == null ? '' : String(s.age),
        schedule: s.schedule || null, extra: extra, sort_order: i
      });
      r.ids.students.push(String(s.id));
    });

    /* -- conteúdo externo -- */
    var seenCustom = {};
    (get(KEY_CUSTOM, []) || []).forEach(function (c) {
      if (!c || !c.key) { r.warnings.push('Conteúdo externo sem chave — ignorado.'); return; }
      if (seenCustom[c.key]) { r.duplicates.push('Conteúdo externo repetido: ' + c.key); return; }
      seenCustom[c.key] = true;
      r.custom.push({
        content_key: String(c.key), skill: String(c.skill || ''),
        title: String(c.title || ''), level: String(c.level || ''),
        source: String(c.source || ''),
        sort_order: c.order != null ? c.order : 1000
      });
    });

    /* -- varredura das chaves por aluno -- */
    var contentSeen = {}, exSeen = {}, occSeen = {}, lessonSeen = {};
    for (var i = 0; i < localStorage.length; i++) {
      var k = localStorage.key(i);
      if (!k) continue;

      if (k.indexOf(PREFIX_PROGRESS) === 0) {
        var sid = k.slice(PREFIX_PROGRESS.length);
        var items = (get(k, {}) || {}).items || {};
        Object.keys(items).forEach(function (cid) {
          var e = items[cid] || {};
          contentSeen[cid] = true;
          var lessons = (e.lessons || []).filter(isDate);
          if (!lessons.length && (e.times || e.firstAt)) {
            r.warnings.push('Conteúdo "' + cid + '" de ' + sid +
              ' tem contador mas nenhuma data — não há ocorrência para migrar.');
          }
          lessons.forEach(function (d) {
            var okey = sid + '|' + cid + '|' + d;
            if (occSeen[okey]) { r.duplicates.push('Ocorrência repetida: ' + okey); return; }
            occSeen[okey] = true;
            r.content.push({ student_id: sid, content_id: cid, lesson_date: d });
          });
          if (e.note) r.notes.push({ student_id: sid, content_id: cid, note: String(e.note) });
        });
        if (!seenStu[sid]) {
          r.warnings.push('Progresso encontrado para "' + sid +
            '", que não está na lista de alunos. Vai ser migrado assim mesmo — ' +
            'o histórico é preservado.');
        }
        continue;
      }

      if (k.indexOf(PREFIX_PRACTICE) === 0) {
        var psid = k.slice(PREFIX_PRACTICE.length);
        var done = (get(k, {}) || {}).done || {};
        Object.keys(done).forEach(function (eid) {
          var e = done[eid] || {};
          exSeen[eid] = true;
          if (!isDate(e.at)) {
            r.warnings.push('Exercício "' + eid + '" de ' + psid +
              ' sem data válida — migrado com a data de hoje para não sumir.');
          }
          r.practice.push({
            student_id: psid, exercise_id: eid,
            first_at: isDate(e.at) ? e.at : today(),
            last_at: isDate(e.lastAt) ? e.lastAt : null,
            usage_count: Math.max(1, parseInt(e.n, 10) || 1)
          });
        });
        continue;
      }

      if (k.indexOf(PREFIX_SCHED) === 0) {
        var p = k.split('|');
        if (p.length < 3 || !isDate(p[2])) {
          r.warnings.push('Chave de aula fora do formato: "' + k + '" — não migrada.');
          continue;
        }
        var lkey = p[1] + '|' + p[2];
        if (lessonSeen[lkey]) { r.duplicates.push('Aula repetida: ' + lkey); continue; }
        lessonSeen[lkey] = true;
        var rec = get(k, null);
        if (!rec || typeof rec !== 'object') {
          r.warnings.push('Registro de aula ilegível em "' + k + '" — não migrado.');
          continue;
        }
        var kn = { status:1, note:1, sessions:1 };
        var ex = {};
        Object.keys(rec).forEach(function (kk) { if (!kn[kk]) ex[kk] = rec[kk]; });
        r.lessons.push({
          student_id: p[1], lesson_date: p[2],
          status: String(rec.status || ''), note: String(rec.note || ''),
          sessions: Array.isArray(rec.sessions) ? rec.sessions : null,
          extra: ex
        });
      }
    }

    r.ids.contents = Object.keys(contentSeen).sort();
    r.ids.exercises = Object.keys(exSeen).sort();

    r.counts = {
      students: r.students.length,
      lessons: r.lessons.length,
      content: r.content.length,
      notes: r.notes.length,
      custom: r.custom.length,
      practice: r.practice.length
    };
    r.total = r.counts.students + r.counts.lessons + r.counts.content +
              r.counts.notes + r.counts.custom + r.counts.practice;
    return r;
  }

  function today() {
    var d = new Date(), p = function (n) { return (n < 10 ? '0' : '') + n; };
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
  }

  /* ======================================================================
     5. O QUE JÁ EXISTE NA NUVEM
     ====================================================================== */

  function cloudCounts() {
    var Cloud = NS.Cloud;
    if (!Cloud) return Promise.reject(new Error('platform-cloud.js não carregado'));
    return Cloud.pullSnapshot().then(function (snap) {
      return {
        students: (snap.students || []).length,
        lessons:  (snap.lessons  || []).length,
        content:  (snap.content  || []).length,
        notes:    (snap.notes    || []).length,
        custom:   (snap.custom   || []).length,
        practice: (snap.practice || []).length,
        _snap: snap
      };
    });
  }

  /* ======================================================================
     6. IMPORTAÇÃO
     ====================================================================== */

  /** Converte a análise nas mesmas operações idempotentes do engine de sync. */
  function opsFrom(a) {
    var ops = [];
    a.students.forEach(function (row) { ops.push({ t: 'students.upsert', row: row }); });
    a.custom.forEach(function (row) { ops.push({ t: 'custom.upsert', row: row }); });
    a.lessons.forEach(function (row) { ops.push({ t: 'lesson.upsert', row: row }); });
    a.content.forEach(function (o) {
      ops.push({ t: 'content.add', student_id: o.student_id,
                 content_id: o.content_id, lesson_date: o.lesson_date });
    });
    a.notes.forEach(function (o) {
      ops.push({ t: 'note.upsert', student_id: o.student_id,
                 content_id: o.content_id, note: o.note });
    });
    a.practice.forEach(function (o) {
      ops.push({ t: 'practice.merge', student_id: o.student_id,
                 exercise_id: o.exercise_id,
                 entry: { first_at: o.first_at, last_at: o.last_at,
                          usage_count: o.usage_count } });
    });
    return ops;
  }

  /**
   * Envia tudo. `onProgress(feitas, total)` é chamado a cada lote.
   * Nada é apagado do localStorage — nem antes, nem depois.
   */
  function run(analysis, onProgress) {
    var Cloud = NS.Cloud, Auth = NS.Auth;
    if (!Cloud || !Auth) return Promise.reject(new Error('camada de nuvem não carregada'));
    var c = Auth.client(), owner = Auth.userId();
    if (!c || !owner) return Promise.reject(new Error('sem sessão — faça login de novo'));

    var ops = opsFrom(analysis);
    var total = ops.length, done = 0, CHUNK = 100;

    function step(i) {
      if (i >= ops.length) return Promise.resolve({ ok: true, sent: total });
      var batch = ops.slice(i, i + CHUNK);
      return Cloud.applyOps(c, owner, batch).then(function () {
        done += batch.length;
        if (onProgress) { try { onProgress(done, total); } catch (e) {} }
        return step(i + CHUNK);
      });
    }
    return step(0);
  }

  /* ======================================================================
     7. CONFERÊNCIA
     ====================================================================== */

  /** Compara o que havia no localStorage com o que o banco devolve agora. */
  function verify(analysis) {
    return cloudCounts().then(function (cc) {
      var rows = [
        ['Alunos',              analysis.counts.students, cc.students],
        ['Aulas (Calendar)',    analysis.counts.lessons,  cc.lessons],
        ['Conteúdo por aula',   analysis.counts.content,  cc.content],
        ['Notas de conteúdo',   analysis.counts.notes,    cc.notes],
        ['Conteúdo externo',    analysis.counts.custom,   cc.custom],
        ['Exercícios usados',   analysis.counts.practice, cc.practice]
      ].map(function (r) {
        return {
          label: r[0], local: r[1], cloud: r[2],
          // A nuvem pode ter MAIS do que este computador (o outro notebook
          // já mandou coisa). Faltar é que é problema.
          ok: r[2] >= r[1]
        };
      });
      return { rows: rows, ok: rows.every(function (r) { return r.ok; }), cloud: cc };
    });
  }

  /* ======================================================================
     BACKUP  (§20) — continua existindo mesmo com a nuvem
     ====================================================================== */

  /** Cópia integral de tudo que interessa, inclusive Finance. */
  function backupObject() {
    var out = { _format: 'teacher-lu-backup', _v: 1, createdAt: new Date().toISOString(), keys: {} };
    for (var i = 0; i < localStorage.length; i++) {
      var k = localStorage.key(i);
      if (!k) continue;
      var keep = k.indexOf('sabatovicz') === 0 ||
                 k.indexOf(PREFIX_SCHED) === 0 ||
                 /-week\d+$/.test(k) ||
                 k.indexOf('finance') === 0 ||
                 k.indexOf('tl_') === 0;
      if (!keep) continue;
      out.keys[k] = localStorage.getItem(k);
    }
    out.count = Object.keys(out.keys).length;
    return out;
  }

  function downloadBackup() {
    var data = backupObject();
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'teacher-lu-backup-' + today() + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
    return data.count;
  }

  /**
   * Import Backup — restaura chaves de um arquivo exportado.
   * ADITIVO por padrão: só grava chave que não existe. `overwrite` é uma
   * escolha explícita de quem chama, nunca o default.
   */
  function importBackup(json, overwrite) {
    var data = typeof json === 'string' ? parse(json, null) : json;
    if (!data || data._format !== 'teacher-lu-backup' || !data.keys) {
      return { ok: false, message: 'Arquivo não é um backup da Teacher Lu Studio.' };
    }
    var written = 0, skipped = 0;
    Object.keys(data.keys).forEach(function (k) {
      var exists = localStorage.getItem(k) !== null;
      if (exists && !overwrite) { skipped++; return; }
      try { localStorage.setItem(k, data.keys[k]); written++; } catch (e) { skipped++; }
    });
    return { ok: true, written: written, skipped: skipped };
  }

  NS.CloudMigrate = {
    VERSION: '1.0.0',
    analyze: analyze,
    cloudCounts: cloudCounts,
    opsFrom: opsFrom,
    run: run,
    verify: verify,
    backupObject: backupObject,
    downloadBackup: downloadBackup,
    importBackup: importBackup
  };

})(typeof window !== 'undefined' ? window : this);
