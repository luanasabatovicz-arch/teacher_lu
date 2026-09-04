/* ==========================================================================
   Teacher Lu Studio — Cloud Sync
   --------------------------------------------------------------------------
   A camada que leva os dados da Studio para o Supabase e traz de volta,
   SEM transformar as centenas de chamadas síncronas de localStorage em
   async, e SEM salvar tudo num blob JSON gigante.

   COMO FUNCIONA — A IDEIA CENTRAL
   ------------------------------
   Toda a Studio já conversa com o mundo por uma única porta:
   `localStorage.setItem` / `removeItem`. Este arquivo se instala NESSA
   PORTA. Cada gravação continua sendo instantânea e síncrona — a aula não
   espera a rede — e, no mesmo instante, o engine calcula QUAIS LINHAS
   mudaram e enfileira só elas.

   Consequência: `platform-students.js`, `platform-progress.js`,
   `platform-practice-log.js` e `schedule.html` não mudaram uma linha.
   Nenhum `await` foi introduzido em código de aula.

   POR QUE LINHAS E NÃO UM BLOB (§9 do briefing)
   ---------------------------------------------
   Se o Notebook A gravasse "todo o localStorage" e o Notebook B também,
   o último a sincronizar apagaria o trabalho do outro. Aqui cada aluno,
   cada aula, cada ocorrência de conteúdo e cada exercício é uma LINHA com
   chave primária própria. Dois computadores editando coisas diferentes
   nunca se sobrescrevem; editando a MESMA coisa, vence a alteração mais
   recente daquela linha — e só daquela linha.

   Para dados aditivos por natureza — conteúdo coberto numa data e
   exercício gasto — não existe sobrescrita nenhuma: os dois são gravados
   como EVENTOS POR DIA, com a data dentro da chave primária.
     • lesson_content       → (aluno, conteúdo, data)
     • practice_usage_days  → (aluno, exercício, data)

   POR QUE O PRACTICE LOG VIRA EVENTO POR DIA
   ------------------------------------------
   A primeira versão guardava um contador e resolvia conflito com
   greatest(usage_count). Isso PERDE evento:

     nuvem: 2 usos · Notebook A offline usa em 24/08 → 3
                   · Notebook B offline usa em 25/08 → 3
     greatest(3,3) = 3, quando a resposta certa é 4.

   Contador não é comutativo; conjunto de datas é. Com uma linha por dia, A
   grava 24/08, B grava 25/08, e a contagem sai de COUNT(DISTINCT usage_date)
   — 4, sem combinação nenhuma de ordem de sincronização que erre. Dois
   notebooks no MESMO dia colidem na chave primária e viram uma linha só,
   que é exatamente a semântica do markDone (idempotente por dia).

   O formato que platform-practice-log.js lê ({ at, n, lastAt }) continua
   idêntico: ele é DERIVADO das datas na hidratação. Nenhuma API mudou.

   MODOS
   -----
     'off'                Supabase não configurado. Studio 100% local.
     'pending-migration'  Há dados locais que ainda não foram migrados.
                          O engine NÃO envia e NÃO sobrescreve nada.
     'live'               Sincronizando.

   O modo 'pending-migration' existe para cumprir o §30: os dados reais da
   professora não sobem sozinhos, e a nuvem não desce por cima deles. A
   passagem para 'live' é um ato explícito, feito em migracao.html.

   O QUE NUNCA ACONTECE AQUI
   -------------------------
   • `localStorage.clear()` — em lugar nenhum, nunca (§31).
   • remoção de chave antiga.
   • migração automática de dado real (§30).
   ========================================================================== */

(function (global) {
  'use strict';

  var NS = global.TeacherLu = global.TeacherLu || {};
  var CFG = NS.CloudConfig || {};

  var STATE_KEY = 'sabatovicz_cloud_state';
  var QUEUE_KEY = 'sabatovicz_cloud_queue';

  /* Chaves de controle do próprio engine — nunca sincronizadas. */
  var INTERNAL = {};
  INTERNAL[STATE_KEY] = 1;
  INTERNAL[QUEUE_KEY] = 1;

  var PREFIX_PROGRESS = 'sabatovicz_progress_';
  var PREFIX_PRACTICE = 'sabatovicz_practice_';
  var KEY_STUDENTS    = 'sabatovicz_students';
  var KEY_CUSTOM      = 'sabatovicz_custom_content';
  var PREFIX_SCHED    = 'sched|';

  /* Guarda as funções originais ANTES de interceptar. Toda escrita interna
     do engine (hidratação) passa por aqui, para não virar fila de novo. */
  var NATIVE = {
    setItem: localStorage.setItem.bind(localStorage),
    removeItem: localStorage.removeItem.bind(localStorage),
    getItem: localStorage.getItem.bind(localStorage)
  };

  /* ----------------------------------------------------------------------
     Utilidades
     ---------------------------------------------------------------------- */

  function parse(raw, fallback) {
    if (raw == null) return fallback;
    try {
      var v = JSON.parse(raw);
      return v == null ? fallback : v;
    } catch (e) { return fallback; }
  }

  function readLocal(key, fallback) { return parse(NATIVE.getItem(key), fallback); }

  function writeLocalRaw(key, value) {
    try { NATIVE.setItem(key, JSON.stringify(value)); return true; }
    catch (e) { console.error('[cloud] não foi possível gravar ' + key, e); return false; }
  }

  function isDate(s) { return /^\d{4}-\d{2}-\d{2}$/.test(String(s || '')); }

  /** Classifica uma chave do localStorage. */
  function classify(key) {
    if (!key || INTERNAL[key]) return null;
    if (key === KEY_STUDENTS) return { kind: 'students' };
    if (key === KEY_CUSTOM)   return { kind: 'custom' };
    if (key.indexOf(PREFIX_PROGRESS) === 0) {
      return { kind: 'progress', studentId: key.slice(PREFIX_PROGRESS.length) };
    }
    if (key.indexOf(PREFIX_PRACTICE) === 0) {
      return { kind: 'practice', studentId: key.slice(PREFIX_PRACTICE.length) };
    }
    if (key.indexOf(PREFIX_SCHED) === 0) {
      var p = key.split('|');
      if (p.length >= 3 && isDate(p[2])) {
        return { kind: 'lesson', studentId: p[1], date: p[2] };
      }
    }
    return null;
  }

  /** Todas as chaves sincronizáveis presentes agora. */
  function syncedKeys() {
    var out = [];
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (classify(k)) out.push(k);
      }
    } catch (e) { /* nunca lança */ }
    return out;
  }

  /* ----------------------------------------------------------------------
     Estado persistente do engine
     ---------------------------------------------------------------------- */

  function loadState() {
    var s = readLocal(STATE_KEY, null);
    if (!s || typeof s !== 'object') s = {};
    return {
      migrated:  s.migrated === true,
      ownerId:   s.ownerId || '',
      hydratedAt: s.hydratedAt || ''
    };
  }

  function saveState(patch) {
    var s = loadState();
    Object.keys(patch || {}).forEach(function (k) { s[k] = patch[k]; });
    writeLocalRaw(STATE_KEY, s);
    return s;
  }

  /* ----------------------------------------------------------------------
     Fila offline (§14)
     ------------------------------------------------------------------------
     Pequena de propósito. Cada operação carrega os dados que precisa e é
     idempotente: reenviar duas vezes produz o mesmo estado no banco. Não há
     motor de retry sofisticado, nem log, nem dashboard — só a garantia de
     que nada se perde quando a internet cai no meio da aula.
     ---------------------------------------------------------------------- */

  var queue = [];

  function loadQueue() {
    var q = readLocal(QUEUE_KEY, []);
    queue = Array.isArray(q) ? q : [];
  }

  function persistQueue() { writeLocalRaw(QUEUE_KEY, queue); }

  function enqueue(op) {
    queue.push(op);
    persistQueue();
    render();
    scheduleFlush();
  }

  /* ----------------------------------------------------------------------
     Sombra: o último valor conhecido de cada chave
     ------------------------------------------------------------------------
     Para saber O QUE mudou numa gravação, é preciso saber o que havia
     antes. O interceptor compara o valor novo com esta sombra e emite só
     as linhas afetadas.
     ---------------------------------------------------------------------- */

  var shadow = {};

  function snapshot(key) { shadow[key] = readLocal(key, null); }

  function snapshotAll() {
    shadow = {};
    syncedKeys().forEach(snapshot);
  }

  /* ======================================================================
     CODECS — localStorage <-> linhas
     ====================================================================== */

  /* -------- students -------- */

  function studentRow(s, idx) {
    var known = { id:1, name:1, emoji:1, level:1, age:1, schedule:1 };
    var extra = {};
    Object.keys(s || {}).forEach(function (k) { if (!known[k]) extra[k] = s[k]; });
    return {
      id: String(s.id),
      name: String(s.name || s.id),
      emoji: String(s.emoji || ''),
      level: String(s.level || ''),
      age: s.age == null ? '' : String(s.age),
      schedule: s.schedule || null,
      extra: extra,
      sort_order: idx
    };
  }

  function studentFromRow(r) {
    var s = {
      id: r.id, name: r.name, emoji: r.emoji || '',
      level: r.level || '', age: r.age || ''
    };
    if (r.schedule) s.schedule = r.schedule;
    Object.keys(r.extra || {}).forEach(function (k) { s[k] = r.extra[k]; });
    return s;
  }

  /* -------- progress: items -> ocorrências + notas -------- */

  /** { 'cid|date': true } a partir de { items: { cid: { lessons:[] } } } */
  function progressOccurrences(rec) {
    var out = {};
    var items = (rec && rec.items) || {};
    Object.keys(items).forEach(function (cid) {
      var lessons = (items[cid] && items[cid].lessons) || [];
      lessons.forEach(function (d) { if (isDate(d)) out[cid + '|' + d] = true; });
    });
    return out;
  }

  /** { cid: note } — só os que têm nota não vazia. */
  function progressNotes(rec) {
    var out = {};
    var items = (rec && rec.items) || {};
    Object.keys(items).forEach(function (cid) {
      var n = items[cid] && items[cid].note;
      if (n) out[cid] = String(n);
    });
    return out;
  }

  /* -------- practice -------- */

  /**
   * As DATAS que o registro local realmente expõe para cada exercício.
   *
   * `{ at, n, lastAt }` só carrega duas datas de verdade — a primeira e a
   * última. É o suficiente: markDone só consegue criar uma data nova por
   * chamada, e essa data sempre aparece em `at` (primeira vez) ou em
   * `lastAt` (repetição). Comparar este conjunto antes/depois da gravação
   * dá exatamente o dia que acabou de ser usado.
   *
   * Os dias intermediários de um registro legado não estão aqui porque
   * nunca foram gravados em lugar nenhum — viram `extra_count`, e não
   * datas inventadas.
   */
  function practiceDays(rec) {
    var done = (rec && rec.done) || {};
    var out = {};
    Object.keys(done).forEach(function (eid) {
      var e = done[eid] || {}, days = {};
      if (isDate(e.at)) days[e.at] = true;
      if (isDate(e.lastAt)) days[e.lastAt] = true;
      out[eid] = days;
    });
    return out;
  }

  /* ======================================================================
     INTERCEPTOR
     ------------------------------------------------------------------------
     PROTEÇÃO CONTRA LAÇO DE HIDRATAÇÃO
     ----------------------------------
     O risco: hidratar grava no localStorage → o interceptor vê a gravação →
     enfileira exatamente o que acabou de descer → empurra de volta → puxa de
     novo. Um ciclo que nunca fecha.

     São DUAS barreiras independentes, e qualquer uma sozinha já basta:

     1. `NATIVE` — as funções originais de localStorage, capturadas ANTES de
        instalar o interceptor. Toda escrita interna do engine (hidratação,
        fila, estado) chama NATIVE.setItem, que não passa pelo interceptor.
        A escrita simplesmente não é observada.

     2. `hydrating` — um contador explícito. Enquanto ele for > 0, o
        interceptor atualiza a sombra e volta sem enfileirar nada, mesmo que
        alguma escrita escape para o caminho público (um código futuro, uma
        extensão do navegador, um teste).

     Além disso, `applySnapshotLocally` atualiza `shadow` com o valor que
     desceu. Mesmo que uma gravação idêntica passasse pelo interceptor
     depois, o diff daria vazio — não há linha diferente para enfileirar.
     ====================================================================== */

  var hydrating = 0;

  /* PORTÃO DE SAÍDA — nada sobe enquanto o bootstrap não termina.
     ------------------------------------------------------------------------
     Requisito crítico do computador novo: o cache vazio dele NUNCA pode virar
     delete ou upsert contra uma nuvem que já tem os dados. `Cloud.mode` sozinho
     não bastava: no caminho de um device já migrado o modo vira 'live' ANTES do
     pull terminar, e qualquer semeadura de DEFAULTS nessa janela entraria na
     fila. Enquanto `bootstrapping` for true, o interceptor observa e atualiza a
     sombra, mas não enfileira nada. */
  var bootstrapping = true;

  /** Roda `fn` sem que o interceptor enfileire nada do que ela gravar. */
  function withoutSync(fn) {
    hydrating++;
    try { return fn(); }
    finally { hydrating--; }
  }

  function installInterceptor() {
    if (localStorage.setItem === interceptSet) return;
    localStorage.setItem = interceptSet;
    localStorage.removeItem = interceptRemove;
  }

  function interceptSet(key, value) {
    NATIVE.setItem(key, value);
    try {
      var meta = classify(key);
      if (!meta) return;
      if (hydrating > 0 || bootstrapping || Cloud.mode !== 'live') {
        shadow[key] = parse(value, null);
        return;
      }
      diffAndQueue(meta, key, shadow[key], parse(value, null));
      shadow[key] = parse(value, null);
    } catch (e) {
      console.warn('[cloud] falha ao enfileirar a alteração de ' + key, e);
    }
  }

  function interceptRemove(key) {
    NATIVE.removeItem(key);
    try {
      var meta = classify(key);
      if (!meta) return;
      if (hydrating > 0 || bootstrapping || Cloud.mode !== 'live') { delete shadow[key]; return; }
      diffAndQueue(meta, key, shadow[key], null);
      delete shadow[key];
    } catch (e) {
      console.warn('[cloud] falha ao enfileirar a remoção de ' + key, e);
    }
  }

  /**
   * Traduz "antes -> depois" em operações de linha.
   *
   * PURA de propósito: recebe dois objetos JavaScript e devolve um array de
   * operações. Não lê nem escreve localStorage, não enfileira, não fala com
   * a rede. Quem enfileira é diffAndQueue(), logo abaixo.
   *
   * É essa separação que deixa verificacao-cloud.html testar a lógica REAL
   * de diff — a mesma que roda em aula — sem precisar do engine em modo
   * 'live' e sem encostar nos dados da professora.
   */
  function computeOps(meta, before, after) {
    var ops = [];
    var enqueue = function (op) { ops.push(op); };


    if (meta.kind === 'students') {
      var prev = {}, next = {};
      (Array.isArray(before) ? before : []).forEach(function (s) { if (s && s.id) prev[s.id] = s; });
      (Array.isArray(after) ? after : []).forEach(function (s, i) {
        if (s && s.id) next[s.id] = studentRow(s, i);
      });
      // Upsert é idempotente, então mandar um aluno inalterado não faz mal —
      // mas encher a fila com a lista inteira a cada gravação faria. Só sobe
      // quem realmente mudou, incluindo mudança de posição na lista.
      var prevOrder = {};
      (Array.isArray(before) ? before : []).forEach(function (s, i) {
        if (s && s.id) prevOrder[s.id] = JSON.stringify(studentRow(s, i));
      });
      Object.keys(next).forEach(function (id) {
        if (prevOrder[id] === JSON.stringify(next[id])) return;
        enqueue({ t: 'students.upsert', row: next[id] });
      });
      Object.keys(prev).forEach(function (id) {
        if (!next[id]) enqueue({ t: 'students.delete', id: id });
      });
      return ops;
    }

    if (meta.kind === 'custom') {
      var pb = {}, na = {};
      (Array.isArray(before) ? before : []).forEach(function (c) { if (c && c.key) pb[c.key] = c; });
      (Array.isArray(after) ? after : []).forEach(function (c) { if (c && c.key) na[c.key] = c; });
      Object.keys(na).forEach(function (k) {
        var c = na[k];
        if (JSON.stringify(pb[k] || null) === JSON.stringify(c)) return;
        enqueue({ t: 'custom.upsert', row: {
          content_key: k,
          skill: String(c.skill || ''),
          title: String(c.title || ''),
          level: String(c.level || ''),
          source: String(c.source || ''),
          sort_order: c.order != null ? c.order : 1000
        }});
      });
      Object.keys(pb).forEach(function (k) {
        if (!na[k]) enqueue({ t: 'custom.delete', content_key: k });
      });
      return ops;
    }

    if (meta.kind === 'progress') {
      var sid = meta.studentId;
      var occB = progressOccurrences(before), occA = progressOccurrences(after);
      Object.keys(occA).forEach(function (k) {
        if (occB[k]) return;
        var p = k.split('|');
        enqueue({ t: 'content.add', student_id: sid, content_id: p[0], lesson_date: p[1] });
      });
      Object.keys(occB).forEach(function (k) {
        if (occA[k]) return;
        var p = k.split('|');
        enqueue({ t: 'content.remove', student_id: sid, content_id: p[0], lesson_date: p[1] });
      });

      var nB = progressNotes(before), nA = progressNotes(after);
      Object.keys(nA).forEach(function (cid) {
        if (nB[cid] === nA[cid]) return;
        enqueue({ t: 'note.upsert', student_id: sid, content_id: cid, note: nA[cid] });
      });
      Object.keys(nB).forEach(function (cid) {
        if (nA[cid] == null) enqueue({ t: 'note.delete', student_id: sid, content_id: cid });
      });
      return ops;
    }

    if (meta.kind === 'practice') {
      var psid = meta.studentId;
      var eB = practiceDays(before), eA = practiceDays(after);
      Object.keys(eA).forEach(function (eid) {
        var was = eB[eid] || {};
        Object.keys(eA[eid]).forEach(function (d) {
          if (was[d]) return;
          enqueue({ t: 'practice.day.add', student_id: psid,
                    exercise_id: eid, usage_date: d });
        });
      });
      Object.keys(eB).forEach(function (eid) {
        // O exercício sumiu do registro: PracticeLog.undo() ou reset().
        // Some da nuvem inteiro — dias e resto legado.
        if (!eA[eid]) {
          enqueue({ t: 'practice.forget', student_id: psid, exercise_id: eid });
        }
      });
      return ops;
    }

    if (meta.kind === 'lesson') {
      if (after == null) {
        enqueue({ t: 'lesson.delete', student_id: meta.studentId, lesson_date: meta.date });
      } else {
        var known = { status:1, note:1, sessions:1 };
        var extra = {};
        Object.keys(after).forEach(function (k) { if (!known[k]) extra[k] = after[k]; });
        enqueue({ t: 'lesson.upsert', row: {
          student_id: meta.studentId,
          lesson_date: meta.date,
          status: String(after.status || ''),
          note: String(after.note || ''),
          sessions: Array.isArray(after.sessions) ? after.sessions : null,
          extra: extra
        }});
      }
    }
  

    return ops;
  }

  /** Aplica o diff na fila de sincronização. */
  function diffAndQueue(meta, key, before, after) {
    computeOps(meta, before, after).forEach(enqueue);
  }

  /* ======================================================================
     PUSH — esvaziar a fila
     ====================================================================== */

  var flushing = false;
  var flushTimer = null;

  function scheduleFlush(delay) {
    if (flushTimer) return;
    flushTimer = global.setTimeout(function () {
      flushTimer = null;
      flush();
    }, delay == null ? 250 : delay);
  }

  function ownerId() { return (NS.Auth && NS.Auth.userId()) || ''; }

  function flush() {
    if (bootstrapping) return Promise.resolve(false);   // nada sai antes de hidratar
    if (flushing || Cloud.mode !== 'live' || !queue.length) return Promise.resolve(true);
    var c = NS.Auth && NS.Auth.client();
    var owner = ownerId();
    if (!c || !owner) return Promise.resolve(false);

    flushing = true;
    render();

    var batch = queue.slice(0, 200);

    return applyOps(c, owner, batch).then(function () {
      queue = queue.slice(batch.length);
      persistQueue();
      flushing = false;
      Cloud.online = true;
      Cloud.lastError = '';
      render();
      if (queue.length) scheduleFlush(50);
      return true;
    }).catch(function (e) {
      flushing = false;
      Cloud.online = false;
      Cloud.lastError = String((e && e.message) || e || 'erro de rede');
      render();
      // Não descarta nada: a fila fica no localStorage e tenta de novo.
      scheduleFlush(8000);
      return false;
    });
  }

  function must(res) {
    if (res && res.error) throw res.error;
    return res;
  }

  /** Executa as operações agrupadas por tipo, na ordem em que chegaram. */
  function applyOps(c, owner, ops) {
    var chain = Promise.resolve();

    ops.forEach(function (op) {
      chain = chain.then(function () {

        if (op.t === 'students.upsert') {
          return c.from('students')
            .upsert(Object.assign({ owner_id: owner }, op.row),
                    { onConflict: 'owner_id,id' }).then(must);
        }
        if (op.t === 'students.delete') {
          return c.from('students').delete()
            .eq('owner_id', owner).eq('id', op.id).then(must);
        }

        if (op.t === 'custom.upsert') {
          return c.from('custom_content')
            .upsert(Object.assign({ owner_id: owner }, op.row),
                    { onConflict: 'owner_id,content_key' }).then(must);
        }
        if (op.t === 'custom.delete') {
          return c.from('custom_content').delete()
            .eq('owner_id', owner).eq('content_key', op.content_key).then(must);
        }

        if (op.t === 'content.add') {
          // Aditivo e idempotente: a PK já impede duplicata, e
          // ignoreDuplicates evita erro quando o outro notebook chegou antes.
          return c.from('lesson_content')
            .upsert({
              owner_id: owner, student_id: op.student_id,
              content_id: op.content_id, lesson_date: op.lesson_date
            }, { onConflict: 'owner_id,student_id,content_id,lesson_date',
                 ignoreDuplicates: true }).then(must);
        }
        if (op.t === 'content.remove') {
          return c.from('lesson_content').delete()
            .eq('owner_id', owner).eq('student_id', op.student_id)
            .eq('content_id', op.content_id).eq('lesson_date', op.lesson_date).then(must);
        }

        if (op.t === 'note.upsert') {
          return c.from('content_notes')
            .upsert({
              owner_id: owner, student_id: op.student_id,
              content_id: op.content_id, note: op.note
            }, { onConflict: 'owner_id,student_id,content_id' }).then(must);
        }
        if (op.t === 'note.delete') {
          return c.from('content_notes').delete()
            .eq('owner_id', owner).eq('student_id', op.student_id)
            .eq('content_id', op.content_id).then(must);
        }

        if (op.t === 'practice.day.add') {
          // Um dia = uma linha. A chave primária resolve o conflito sozinha:
          // dois notebooks no mesmo dia colidem e viram uma linha; em dias
          // diferentes, viram duas. Nenhum contador é comparado.
          return c.from('practice_usage_days')
            .upsert({
              owner_id: owner, student_id: op.student_id,
              exercise_id: op.exercise_id, usage_date: op.usage_date
            }, { onConflict: 'owner_id,student_id,exercise_id,usage_date',
                 ignoreDuplicates: true }).then(must);
        }
        if (op.t === 'practice.legacy.set') {
          // Só a migração emite isto. greatest() no servidor para que rodar
          // a migração duas vezes não some o resto legado.
          return c.rpc('merge_practice_legacy', {
            p_student_id: op.student_id,
            p_exercise_id: op.exercise_id,
            p_extra_count: op.extra_count
          }).then(must);
        }
        if (op.t === 'practice.forget') {
          return c.from('practice_usage_days').delete()
            .eq('owner_id', owner).eq('student_id', op.student_id)
            .eq('exercise_id', op.exercise_id).then(must)
            .then(function () {
              return c.from('practice_usage_legacy').delete()
                .eq('owner_id', owner).eq('student_id', op.student_id)
                .eq('exercise_id', op.exercise_id).then(must);
            });
        }

        if (op.t === 'lesson.upsert') {
          return c.from('lesson_records')
            .upsert(Object.assign({ owner_id: owner }, op.row),
                    { onConflict: 'owner_id,student_id,lesson_date' }).then(must);
        }
        if (op.t === 'lesson.delete') {
          return c.from('lesson_records').delete()
            .eq('owner_id', owner).eq('student_id', op.student_id)
            .eq('lesson_date', op.lesson_date).then(must);
        }

        return null;
      });
    });

    return chain;
  }

  /* ======================================================================
     PULL — trazer o banco para o cache local
     ====================================================================== */

  function fetchAll(c, table, owner) {
    var rows = [], page = 0, SIZE = 1000;
    function step() {
      return c.from(table).select('*').eq('owner_id', owner)
        .range(page * SIZE, page * SIZE + SIZE - 1)
        .then(function (res) {
          must(res);
          var got = res.data || [];
          rows = rows.concat(got);
          if (got.length < SIZE) return rows;
          page++;
          return step();
        });
    }
    return step();
  }

  /** Lê tudo do banco e devolve o retrato pronto para virar localStorage. */
  function pullSnapshot() {
    var c = NS.Auth && NS.Auth.client();
    var owner = ownerId();
    if (!c || !owner) return Promise.reject(new Error('sem sessão'));

    return Promise.all([
      fetchAll(c, 'students', owner),
      fetchAll(c, 'lesson_records', owner),
      fetchAll(c, 'lesson_content', owner),
      fetchAll(c, 'content_notes', owner),
      fetchAll(c, 'custom_content', owner),
      fetchAll(c, 'practice_usage_days', owner),
      fetchAll(c, 'practice_usage_legacy', owner)
    ]).then(function (r) {
      return {
        students: r[0], lessons: r[1], content: r[2],
        notes: r[3], custom: r[4],
        practiceDays: r[5], practiceLegacy: r[6]
      };
    });
  }

  /** Converte o retrato do banco no formato que a Studio já sabe ler. */
  function snapshotToLocal(snap) {
    var out = {};

    /* students
       ------------------------------------------------------------------
       NUNCA escrever uma lista VAZIA por cima da local. `students` e
       `custom_content` são listas inteiras, não linhas independentes: uma
       nuvem sem linhas produzia `[]` aqui e apagava a lista da máquina —
       numa instalação nova, zerava os alunos semeados a cada carga.

       O preço é conhecido e aceito: apagar o ÚLTIMO aluno no computador A
       não esvazia a lista do computador B sozinho (qualquer lista com pelo
       menos um aluno propaga normalmente). Perder a lista por engano é pior
       do que manter uma lista velha por mais um ciclo. */
    if ((snap.students || []).length) {
      out[KEY_STUDENTS] = snap.students.slice()
        .sort(function (a, b) { return (a.sort_order || 0) - (b.sort_order || 0); })
        .map(studentFromRow);
    }

    /* custom content — mesma regra da lista de alunos */
    if ((snap.custom || []).length) out[KEY_CUSTOM] = (snap.custom || []).slice()
      .sort(function (a, b) { return (a.sort_order || 0) - (b.sort_order || 0); })
      .map(function (r) {
        return {
          key: r.content_key, skill: r.skill, title: r.title,
          level: r.level || '', source: r.source || '',
          order: r.sort_order != null ? r.sort_order : 1000
        };
      });

    /* progress — DERIVADO das ocorrências, exatamente como o §11 pede */
    var byStudent = {};
    (snap.content || []).forEach(function (r) {
      var rec = byStudent[r.student_id] || (byStudent[r.student_id] = { items: {} });
      var it = rec.items[r.content_id] ||
               (rec.items[r.content_id] = { lessons: [], note: '' });
      it.lessons.push(String(r.lesson_date).slice(0, 10));
    });
    (snap.notes || []).forEach(function (r) {
      var rec = byStudent[r.student_id] || (byStudent[r.student_id] = { items: {} });
      var it = rec.items[r.content_id];
      // Uma nota sem nenhuma ocorrência não vira entrada fantasma no
      // histórico: sem aula registrada, não há o que mostrar.
      if (it) it.note = r.note || '';
    });
    Object.keys(byStudent).forEach(function (sid) {
      var items = byStudent[sid].items;
      Object.keys(items).forEach(function (cid) {
        var it = items[cid];
        it.lessons.sort();
        it.times = it.lessons.length;
        it.firstAt = it.lessons[0] || '';
        it.lastAt = it.lessons[it.lessons.length - 1] || '';
      });
      out[PREFIX_PROGRESS + sid] = byStudent[sid];
    });

    /* ------------------------------------------------------------------
       practice — DERIVADO dos dias, no formato que o frontend já espera
       ------------------------------------------------------------------
         at      = MIN(usage_date)
         lastAt  = MAX(usage_date), só quando houve repetição
         n       = COUNT(DISTINCT usage_date) + extra_count legado

       `extra_count` são utilizações antigas cujas DATAS nunca existiram no
       localStorage (o formato guardava só `at` e `n`). Elas contam, mas não
       viram data: inventar dia para bater contador seria fabricar histórico.
       ------------------------------------------------------------------ */
    var pdays = {};
    (snap.practiceDays || []).forEach(function (r) {
      var byStu = pdays[r.student_id] || (pdays[r.student_id] = {});
      (byStu[r.exercise_id] || (byStu[r.exercise_id] = []))
        .push(String(r.usage_date).slice(0, 10));
    });
    var pextra = {};
    (snap.practiceLegacy || []).forEach(function (r) {
      var byStu = pextra[r.student_id] || (pextra[r.student_id] = {});
      byStu[r.exercise_id] = Math.max(0, r.extra_count || 0);
    });

    Object.keys(pdays).forEach(function (sid) {
      var rec = { done: {} };
      Object.keys(pdays[sid]).forEach(function (eid) {
        var days = pdays[sid][eid].slice().sort();
        var extra = (pextra[sid] || {})[eid] || 0;
        var e = { at: days[0], n: days.length + extra };
        // `lastAt` só existe quando o exercício foi reutilizado — é assim
        // que platform-practice-log.js grava, e markDone compara com ele.
        if (days.length > 1) e.lastAt = days[days.length - 1];
        rec.done[eid] = e;
      });
      out[PREFIX_PRACTICE + sid] = rec;
    });

    /* lesson records */
    (snap.lessons || []).forEach(function (r) {
      var rec = { status: r.status || '', note: r.note || '' };
      if (Array.isArray(r.sessions)) rec.sessions = r.sessions;
      Object.keys(r.extra || {}).forEach(function (k) { rec[k] = r.extra[k]; });
      out[PREFIX_SCHED + r.student_id + '|' + String(r.lesson_date).slice(0, 10)] = rec;
    });

    return out;
  }

  /**
   * Escreve o retrato da nuvem no cache local.
   * Só remove chaves sincronizadas que sumiram do banco — nenhuma chave
   * de outro domínio (Finance, flags de migração, backups) é tocada.
   */
  function applySnapshotLocally(local) {
    return withoutSync(function () { return applySnapshotInner(local); });
  }

  function applySnapshotInner(local) {
    var changed = 0;
    var seen = {};

    Object.keys(local).forEach(function (k) {
      seen[k] = true;
      var current = NATIVE.getItem(k);
      var next = JSON.stringify(local[k]);
      if (current !== next) { NATIVE.setItem(k, next); changed++; }
      shadow[k] = local[k];
    });

    syncedKeys().forEach(function (k) {
      if (seen[k]) return;
      var meta = classify(k);
      if (!meta) return;
      /* Só as chaves DERIVADAS de linhas somem quando a linha some da nuvem.
         `sabatovicz_students` e `sabatovicz_custom_content` são listas
         inteiras e podem legitimamente não vir no retrato (nuvem sem linhas);
         removê-las aqui apagaria a lista local — foi assim que a instalação
         nova ficava sem nenhum aluno. */
      if (meta.kind !== 'lesson' && meta.kind !== 'progress' && meta.kind !== 'practice') return;
      NATIVE.removeItem(k);
      delete shadow[k];
      changed++;
    });

    return changed;
  }

  /* ======================================================================
     INDICADOR DISCRETO (§32)
     ====================================================================== */

  var chip = null;

  function ensureChip() {
    if (chip || !document.body) return chip;
    try {
      var css = document.createElement('style');
      css.textContent =
        '#tl-sync{position:fixed;right:14px;bottom:52px;z-index:9999;' +
        'font:500 12px/1 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;' +
        'border-radius:999px;padding:7px 12px;border:1px solid transparent;' +
        'backdrop-filter:blur(6px);box-shadow:0 1px 3px rgba(15,76,92,.10);' +
        'transition:opacity .3s;user-select:none}' +
        '#tl-sync[data-s="synced"]{background:rgba(255,255,255,.92);' +
        'color:#0f4c5c;border-color:rgba(15,76,92,.18);opacity:.55}' +
        '#tl-sync[data-s="saving"]{background:rgba(64,190,190,.16);' +
        'color:#0f4c5c;border-color:rgba(64,190,190,.45)}' +
        '#tl-sync[data-s="offline"]{background:rgba(255,107,92,.14);' +
        'color:#8a2f24;border-color:rgba(255,107,92,.42)}' +
        '#tl-sync[data-s="local"]{background:rgba(255,255,255,.92);' +
        'color:#8a6d1f;border-color:rgba(214,158,46,.5)}' +
        '@media print{#tl-sync{display:none}}';
      document.head.appendChild(css);

      chip = document.createElement('div');
      chip.id = 'tl-sync';
      chip.setAttribute('role', 'status');
      chip.setAttribute('aria-live', 'polite');
      document.body.appendChild(chip);
    } catch (e) { chip = null; }
    return chip;
  }

  function render() {
    var el = ensureChip();
    if (!el) return;
    var s, label;

    if (Cloud.mode === 'off')                   { s = 'local';   label = 'Local'; }
    else if (Cloud.mode === 'bootstrapping')    { s = 'saving';  label = 'Loading data…'; }
    else if (Cloud.mode === 'conflict')         { s = 'offline'; label = 'Setup necessário'; }
    else if (Cloud.mode === 'pending-migration'){ s = 'local';   label = 'Local — migração pendente'; }
    else if (!Cloud.online)                     { s = 'offline'; label = queue.length ? ('Offline · ' + queue.length + ' pendente' + (queue.length > 1 ? 's' : '')) : 'Offline'; }
    else if (flushing || queue.length)          { s = 'saving';  label = 'Saving…'; }
    else                                        { s = 'synced';  label = '✓ Synced'; }

    el.setAttribute('data-s', s);
    if (el.textContent !== label) el.textContent = label;
    el.title = Cloud.lastError || '';
  }

  /* ======================================================================
     BOOT
     ====================================================================== */

  /* Os ids semeados por platform-students.js. Ficam aqui porque hasLocalData()
     roda em páginas que NÃO carregam platform-students.js — index.html e
     finance.html, por exemplo. Sem esta lista, NS.Students é undefined ali, a
     comparação com DEFAULTS falha, e uma lista puramente semeada passaria por
     "dados da professora", bloqueando a hidratação do computador novo. */
  var SEED_STUDENT_IDS = ['natali','heitor','joao','maria','lais','regis','isa'];

  function isSeedStudentList(list) {
    if (!Array.isArray(list) || !list.length) return true;
    var D = NS.Students && NS.Students.DEFAULTS;
    if (D && JSON.stringify(list) === JSON.stringify(D)) return true;
    // Sem NS.Students na página: cai no conjunto de ids conhecido.
    if (list.length !== SEED_STUDENT_IDS.length) return false;
    for (var i = 0; i < list.length; i++) {
      if (SEED_STUDENT_IDS.indexOf(String((list[i] || {}).id)) === -1) return false;
    }
    return true;
  }

  /** Há dado de verdade no localStorage desta máquina? */
  function hasLocalData() {
    var keys = syncedKeys();
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i], meta = classify(k);
      if (meta.kind === 'lesson') return true;
      var v = readLocal(k, null);
      if (meta.kind === 'progress' && v && Object.keys(v.items || {}).length) return true;
      if (meta.kind === 'practice' && v && Object.keys(v.done || {}).length) return true;
      if (meta.kind === 'custom' && Array.isArray(v) && v.length) return true;
      // A lista semeada pela própria Studio não conta como "dado da professora".
      if (meta.kind === 'students' && !isSeedStudentList(v)) return true;
    }
    return false;
  }

  /* Toda tabela conta. A versão anterior olhava `snap.practice`, campo que
     deixou de existir quando o PracticeLog virou evento por dia — uma nuvem que
     tivesse só prática seria lida como vazia. */
  function cloudIsEmpty(snap) {
    return !(snap.students       || []).length &&
           !(snap.lessons        || []).length &&
           !(snap.content        || []).length &&
           !(snap.notes          || []).length &&
           !(snap.custom         || []).length &&
           !(snap.practiceDays   || []).length &&
           !(snap.practiceLegacy || []).length;
  }

  /* ======================================================================
     RENDER DEPOIS DA HIDRATAÇÃO — o reload único
     ------------------------------------------------------------------------
     A página monta a tela no DOMContentLoaded, a partir do cache. No primeiro
     acesso de um computador novo esse cache ainda está vazio (ou com os alunos
     semeados), e o pull da nuvem só termina uns instantes depois. Resultado
     observado: a Studio mostrava os 7 alunos de exemplo enquanto os 11 reais já
     estavam gravados no localStorage — bastava um F5 para tudo aparecer.

     Re-renderizar sem F5 exigiria mexer no render de 18 páginas. Um reload
     único, só na PRIMEIRA hidratação deste dispositivo, resolve sem tocar em
     nenhuma delas.

     Contra laço: a marca vai no sessionStorage ANTES do reload. Se o
     sessionStorage não estiver disponível, não recarrega — melhor a tela
     desatualizada do que um loop.
     ====================================================================== */
  var RELOAD_FLAG = 'sabatovicz_cloud_bootstrapped';

  function reloadOnce(motivo) {
    try {
      if (sessionStorage.getItem(RELOAD_FLAG)) return false;
      sessionStorage.setItem(RELOAD_FLAG, '1');
      console.info('[cloud] ' + motivo + ' — recarregando uma vez para a tela ' +
                   'mostrar os dados que acabaram de descer.');
      global.setTimeout(function () { location.reload(); }, 60);
      return true;
    } catch (e) {
      console.warn('[cloud] sessionStorage indisponível — sem reload automático. ' +
                   'Atualize a página para ver os dados.', e);
      return false;
    }
  }

  var Cloud = {

    VERSION: '1.1.0',
    mode: 'off',
    online: true,
    lastError: '',

    /* ---- introspecção usada pelas telas de migração e verificação ---- */
    queueLength: function () { return queue.length; },
    state: loadState,
    classify: classify,
    syncedKeys: syncedKeys,
    native: NATIVE,
    snapshotToLocal: snapshotToLocal,
    pullSnapshot: pullSnapshot,
    hasLocalData: hasLocalData,
    flush: flush,
    applyOps: applyOps,
    applySnapshotLocally: applySnapshotLocally,
    /** Diff puro (sem fila, sem localStorage) — usado por verificacao-cloud.html. */
    computeOps: computeOps,
    /** Barreira de hidratação ativa? Usado pelo teste M da verificação. */
    isHydrating: function () { return hydrating > 0; },
    interceptorInstalled: function () { return localStorage.setItem === interceptSet; },

    /** Reconsulta o banco e reescreve o cache. Retorna quantas chaves mudaram. */
    pull: function (duranteBoot) {
      if (!duranteBoot && Cloud.mode !== 'live') return Promise.resolve(0);
      return flush().then(pullSnapshot).then(function (snap) {
        var n = applySnapshotLocally(snapshotToLocal(snap));
        saveState({ hydratedAt: new Date().toISOString() });
        Cloud.online = true;
        render();
        return n;
      }).catch(function (e) {
        Cloud.online = false;
        Cloud.lastError = String((e && e.message) || e);
        render();
        return -1;
      });
    },

    /**
     * Liga o modo 'live'. Chamado por migracao.html depois que a migração
     * termina e as contagens conferem — nunca automaticamente sobre dados
     * reais (§30).
     */
    markMigrated: function () {
      saveState({ migrated: true, ownerId: ownerId() });
      Cloud.mode = 'live';
      snapshotAll();
      render();
      return Cloud.pull();
    },

    /** Volta ao modo local. Não apaga nada, nem local nem na nuvem. */
    unmarkMigrated: function () {
      saveState({ migrated: false });
      Cloud.mode = 'pending-migration';
      render();
    },

    boot: function () {
      bootstrapping = true;
      Cloud.mode = 'bootstrapping';
      loadQueue();
      snapshotAll();
      installInterceptor();
      render();

      /* Todo caminho de saída passa por aqui: libera o portão e pinta o chip. */
      function done(mode, resultado) {
        bootstrapping = false;
        Cloud.mode = mode;
        render();
        if (mode === 'live' && queue.length) scheduleFlush(200);
        return resultado || mode;
      }

      if (!CFG.isConfigured || !CFG.isConfigured()) return Promise.resolve(done('off'));
      if (!NS.Auth) return Promise.resolve(done('off', 'no-session'));

      /* A SESSÃO PODE AINDA NÃO ESTAR PRONTA.
         --------------------------------------------------------------------
         isSignedIn() é uma leitura SÍNCRONA do armazenamento. O supabase-js
         recupera e revalida a sessão de forma assíncrona no carregamento, e
         há uma janela curta em que a chave não está lá. Quem lesse só o cache
         concluía "sem sessão", ia para 'off' e NUNCA mais tentava — e num
         computador novo isso dá exatamente o sintoma "faço login e os dados
         não aparecem". getSession() é a fonte autoritativa: espera o
         supabase-js terminar antes de concluir que não há sessão. */
      return esperarSessao().then(function (temSessao) {
        if (!temSessao) return done('off', 'no-session');
        return decidirBootstrap();
      });

      function esperarSessao() {
        if (NS.Auth.isSignedIn()) return Promise.resolve(true);
        var c = NS.Auth.client();
        if (!c || !c.auth || !c.auth.getSession) return Promise.resolve(false);
        return c.auth.getSession().then(function (res) {
          return !!(res && res.data && res.data.session);
        }).catch(function () { return NS.Auth.isSignedIn(); });
      }

      function decidirBootstrap() {
      var st = loadState();

      // Cache de OUTRA conta neste navegador: não é dado desta professora.
      if (st.ownerId && ownerId() && st.ownerId !== ownerId()) {
        console.warn('[cloud] este navegador tem cache de outra conta — ' +
                     'sincronização pausada até uma decisão explícita');
        return Promise.resolve(done('conflict', 'other-owner'));
      }

      // Dispositivo já conhecido: só atualiza.
      if (st.migrated) {
        return Cloud.pull(true).then(function () { return done('live'); })
                               .catch(function () { return done('live'); });
      }

      /* Dispositivo ainda não marcado. Decide sem destruir nada. */
      return pullSnapshot().then(function (snap) {
        var cloudVazia = cloudIsEmpty(snap);
        var temLocal   = hasLocalData();

        // (B) NOVO DISPOSITIVO — nuvem tem dados, esta máquina não tem nada
        //     da professora. A nuvem é a autoridade: hidrata e entra no ar.
        if (!cloudVazia && !temLocal) {
          var n = applySnapshotLocally(snapshotToLocal(snap));
          saveState({ migrated: true, ownerId: ownerId(),
                      hydratedAt: new Date().toISOString() });
          snapshotAll();
          var r = done('live', 'new-device');
          if (n > 0) reloadOnce('primeira hidratação deste dispositivo (' + n + ' chaves)');
          return r;
        }

        // (C) CONFLITO — as duas pontas têm dados e este device nunca foi
        //     marcado. NÃO sobrescreve nem sobe nada: espera uma decisão.
        if (!cloudVazia && temLocal) {
          console.warn('[cloud] esta máquina tem dados locais E a nuvem já tem dados. ' +
                       'Nada foi enviado nem sobrescrito. Abra migracao.html para decidir.');
          return done('conflict', 'conflict');
        }

        // (D) INSTALAÇÃO NOVA — nada dos dois lados. Entra no ar sem inventar
        //     dado nenhum; o que for criado daqui para frente sincroniza.
        if (cloudVazia && !temLocal) {
          saveState({ migrated: true, ownerId: ownerId(),
                      hydratedAt: new Date().toISOString() });
          snapshotAll();
          return done('live', 'fresh-install');
        }

        // (A) PRIMEIRA MIGRAÇÃO — dados locais, nuvem vazia. Continua parado
        //     até a professora rodar migracao.html.
        return done('pending-migration');
      }).catch(function (e) {
        Cloud.online = false;
        Cloud.lastError = String((e && e.message) || e);
        return done('pending-migration', 'offline');
      });
      }
    }
  };

  NS.Cloud = Cloud;

  /* O interceptor é instalado AGORA, no parse deste arquivo — antes de
     platform-students.js / progress / practice-log serem carregados. Se
     esperasse o DOMContentLoaded, as gravações que esses arquivos fazem no
     próprio load (semear DEFAULTS, migrateScheduleKeys, ensureMigrated)
     escapariam sem serem observadas. Em modo 'off' ou 'pending-migration'
     ele só mantém a sombra em dia e não enfileira nada. */
  installInterceptor();

  /* Rede voltou → tenta esvaziar a fila. */
  try {
    global.addEventListener('online', function () {
      Cloud.online = true; render(); scheduleFlush(200);
    });
    global.addEventListener('offline', function () {
      Cloud.online = false; render();
    });
  } catch (e) { /* nunca lança */ }

  /* Boot automático quando o body existir (o chip precisa dele). */
  function start() { try { Cloud.boot(); } catch (e) { console.error('[cloud] boot falhou', e); } }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }

})(typeof window !== 'undefined' ? window : this);
