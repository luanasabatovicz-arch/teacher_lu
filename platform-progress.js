/* ==========================================================================
   Teacher Lu Platform — Learning Progress store
   --------------------------------------------------------------------------
   What each student has actually studied, and what comes next.

   WHY THIS FILE EXISTS
   --------------------
   The Curriculum Map ticks contents off. The Lesson Calendar records what
   was covered in a given lesson. Both need the same history, so neither
   owns it — this shared store does.

   DATA
   ----
   Key:   'sabatovicz_progress_<studentId>'
   Value: {
            items: {
              'grammar:verb-to-be': {
                 firstAt: '2026-07-06',    // when it was first covered
                 lastAt:  '2026-07-20',    // most recent time
                 times:   2,               // how many lessons touched it
                 lessons: ['2026-07-06','2026-07-20'],
                 note:    'still mixing up is/are'
              }, ...
            }
          }

   Teacher-added items (for skills with no module yet) live in
   'sabatovicz_custom_content' and are exposed through the Content registry
   by whoever loads this file.

   CONTRACT
   --------
   • Never throws.
   • Idempotent: recording the same item for the same lesson date twice does
     not inflate the counters.
   • Knows nothing about any specific module.

   CONSECUTIVE LESSONS — DESIGN DECISION
   -------------------------------------
   Progress is indexed by DAY, not by SESSION. If a student takes two
   consecutive lessons on the same evening, contents covered in both
   sessions are consolidated under the same date. This is deliberate:
   Progress answers "when did this student study X?" — the answer is
   a date, not a session number. Full rationale in
   docs/CONSECUTIVE-LESSONS.md §7.2 (design decision D2).
   ========================================================================== */

(function (global) {
  'use strict';

  var NS = global.TeacherLu = global.TeacherLu || {};

  var PREFIX = 'sabatovicz_progress_';
  var CUSTOM_KEY = 'sabatovicz_custom_content';

  function read(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return fallback;
      var v = JSON.parse(raw);
      return v == null ? fallback : v;
    } catch (e) {
      console.warn('[progress] could not read ' + key, e);
      return fallback;
    }
  }

  function write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('[progress] could not save ' + key, e);
      return false;
    }
  }

  function studentKey(studentId) { return PREFIX + studentId; }

  function today() {
    var d = new Date();
    var p = function (n) { return (n < 10 ? '0' : '') + n; };
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
  }

  var Progress = {

    VERSION: '1.0.0',

    /* ------------------------------------------------------------------
       Reading
       ------------------------------------------------------------------ */

    /** Whole record for a student: { items: {...} }. */
    of: function (studentId) {
      var rec = read(studentKey(studentId), null);
      if (!rec || typeof rec !== 'object') rec = { items: {} };
      if (!rec.items) rec.items = {};
      return rec;
    },

    /** True when this content was already covered at least once. */
    isCovered: function (studentId, itemId) {
      return !!Progress.of(studentId).items[itemId];
    },

    /** The entry for one item, or null. */
    entry: function (studentId, itemId) {
      return Progress.of(studentId).items[itemId] || null;
    },

    /** Every covered item id. */
    coveredIds: function (studentId) {
      return Object.keys(Progress.of(studentId).items);
    },

    /** Covered ids for one skill only. */
    coveredIdsOf: function (studentId, skillId) {
      return Progress.coveredIds(studentId).filter(function (id) {
        return id.indexOf(skillId + ':') === 0;
      });
    },

    /**
     * Everything covered in one lesson date, newest first.
     * Used by the calendar to show what a given lesson contained.
     */
    ofLesson: function (studentId, lessonDate) {
      var items = Progress.of(studentId).items;
      return Object.keys(items).filter(function (id) {
        return (items[id].lessons || []).indexOf(lessonDate) !== -1;
      });
    },

    /** Full history as a flat, sorted list — good for exports. */
    history: function (studentId) {
      var items = Progress.of(studentId).items;
      var out = [];
      Object.keys(items).forEach(function (id) {
        var e = items[id];
        (e.lessons || []).forEach(function (date) {
          out.push({ itemId: id, date: date, note: e.note || '' });
        });
      });
      return out.sort(function (a, b) { return a.date < b.date ? 1 : -1; });
    },

    /* ------------------------------------------------------------------
       Writing
       ------------------------------------------------------------------ */

    /**
     * Record that a set of contents was covered in a lesson.
     *   Progress.record('isa', ['grammar:verb-to-be'], '2026-07-06')
     * Idempotent per (item, lessonDate).
     */
    record: function (studentId, itemIds, lessonDate) {
      if (!studentId || !itemIds || !itemIds.length) return false;
      var date = lessonDate || today();
      var rec = Progress.of(studentId);

      itemIds.forEach(function (id) {
        var e = rec.items[id];
        if (!e) {
          rec.items[id] = { firstAt: date, lastAt: date, times: 1, lessons: [date], note: '' };
          return;
        }
        if (!e.lessons) e.lessons = [];
        if (e.lessons.indexOf(date) !== -1) return;   // already recorded
        e.lessons.push(date);
        e.lessons.sort();
        e.times = e.lessons.length;
        e.firstAt = e.lessons[0];
        e.lastAt = e.lessons[e.lessons.length - 1];
      });

      return write(studentKey(studentId), rec);
    },

    /** Remove a content from a specific lesson (undo a wrong tick). */
    unrecord: function (studentId, itemId, lessonDate) {
      var rec = Progress.of(studentId);
      var e = rec.items[itemId];
      if (!e) return false;

      if (lessonDate && e.lessons) {
        e.lessons = e.lessons.filter(function (d) { return d !== lessonDate; });
        if (!e.lessons.length) {
          delete rec.items[itemId];
        } else {
          e.times = e.lessons.length;
          e.firstAt = e.lessons[0];
          e.lastAt = e.lessons[e.lessons.length - 1];
        }
      } else {
        delete rec.items[itemId];
      }
      return write(studentKey(studentId), rec);
    },

    /**
     * Toggle a content on/off for a lesson date.
     * Returns { on, ok }:
     *   on — the new state (true = now covered)
     *   ok — whether the change was persisted (false = write failed)
     * Callers must not report success when ok is false (F-2).
     */
    toggle: function (studentId, itemId, lessonDate) {
      var date = lessonDate || today();
      var e = Progress.entry(studentId, itemId);
      var on = e && (e.lessons || []).indexOf(date) !== -1;
      var ok = on
        ? Progress.unrecord(studentId, itemId, date)
        : Progress.record(studentId, [itemId], date);
      return { on: !on, ok: ok !== false };
    },

    /** Free-text note attached to one content for one student. */
    setNote: function (studentId, itemId, note) {
      var rec = Progress.of(studentId);
      if (!rec.items[itemId]) return false;
      rec.items[itemId].note = String(note || '');
      return write(studentKey(studentId), rec);
    },

    /** Wipe a student's progress (asks nothing — the caller confirms). */
    reset: function (studentId) {
      return write(studentKey(studentId), { items: {} });
    },

    /* ------------------------------------------------------------------
       Statistics and suggestions
       ------------------------------------------------------------------ */

    /**
     * Per-skill numbers for a student:
     *   [{ skill, label, icon, color, total, done, pct }]
     */
    stats: function (studentId) {
      var Content = NS.Content;
      if (!Content) return [];
      var covered = Progress.of(studentId).items;

      return Content.SKILLS.map(function (s) {
        var items = Content.items(s.id);
        var done = items.filter(function (it) { return !!covered[it.id]; }).length;
        return {
          skill: s.id, label: s.label, icon: s.icon, color: s.color,
          total: items.length, done: done,
          pct: items.length ? Math.round(done / items.length * 100) : 0
        };
      });
    },

    /** Overall completion across every skill. */
    overall: function (studentId) {
      var st = Progress.stats(studentId);
      var total = st.reduce(function (n, s) { return n + s.total; }, 0);
      var done = st.reduce(function (n, s) { return n + s.done; }, 0);
      return { total: total, done: done, pct: total ? Math.round(done / total * 100) : 0 };
    },

    /**
     * What to teach next: the first not-yet-covered item of each skill,
     * skills with the least progress first.
     *   suggestions('isa', 6) -> [{ item, skill, label, icon, color }]
     */
    suggestions: function (studentId, limit) {
      var Content = NS.Content;
      if (!Content) return [];
      var covered = Progress.of(studentId).items;
      var out = [];

      var bySkill = Content.SKILLS.map(function (s) {
        var items = Content.items(s.id);
        var next = items.filter(function (it) { return !covered[it.id]; });
        var done = items.length - next.length;
        return {
          skill: s, next: next,
          pct: items.length ? done / items.length : 1
        };
      }).filter(function (g) { return g.next.length; })
        .sort(function (a, b) { return a.pct - b.pct; });

      // One item per skill first, then fill up with the remaining ones.
      bySkill.forEach(function (g) {
        out.push({ item: g.next[0], skill: g.skill });
      });
      bySkill.forEach(function (g) {
        for (var i = 1; i < g.next.length && out.length < (limit || 6); i++) {
          out.push({ item: g.next[i], skill: g.skill });
        }
      });

      return out.slice(0, limit || 6);
    },

    /* ------------------------------------------------------------------
       Teacher-added content (skills with no module yet)
       ------------------------------------------------------------------ */

    customItems: function () {
      var v = read(CUSTOM_KEY, []);
      return Array.isArray(v) ? v : [];
    },

    /**
     * Conteúdo adicionado pela professora.
     *   addCustomItem('reading', 'Cool English — Unlucky Lottery Winner')
     *   addCustomItem('reading', 'Unlucky Lottery Winner', '', 'Cool English')
     *
     * `source` é texto livre opcional (Cool English, Canva, material
     * próprio…) — a PROCEDÊNCIA do material. Fica guardado no item e não
     * é exposto como subtitle: veja o comentário do provider no fim deste
     * arquivo. Itens gravados antes deste campo continuam válidos.
     */
    addCustomItem: function (skillId, title, level, source) {
      title = String(title || '').trim();
      if (!skillId || !title) return null;
      var list = Progress.customItems();
      var item = {
        key: 'custom-' + Date.now().toString(36),
        skill: skillId,
        title: title,
        level: level || '',
        source: String(source || '').trim(),
        order: 1000 + list.length
      };
      list.push(item);
      // F-2: null quando a gravação falha, para o chamador não reportar sucesso.
      return write(CUSTOM_KEY, list) ? item : null;
    },

    removeCustomItem: function (skillId, key) {
      var list = Progress.customItems().filter(function (i) {
        return !(i.skill === skillId && i.key === key);
      });
      return write(CUSTOM_KEY, list);
    },

    /* ------------------------------------------------------------------
       LEGACY WEEK-PROGRESS MIGRATION  (Fase 2A)
       ------------------------------------------------------------------
       The Annual Plan used to store one raw localStorage key per
       (student, week):

         '<studentIdOrName>-week<N>'  = 'true'

       That parallel model diverges from Progress. This one-shot migration
       copies every 'true' occurrence into
         Progress.items['vocabulary:w<N>']  with date '1970-01-01'
       preserving the legacy keys intact (never deletes them). It is
       idempotent, guarded by FLAG_V2, and takes a defensive backup of
       every legacy key it saw before writing anything.

       Runs from ANY page that loads platform-progress.js + platform-
       students.js — Builder, Annual Plan, Report, Schedule, Structures.
       The Annual Plan no longer needs its own copy.
       ------------------------------------------------------------------ */
    ensureMigrated: function () {
      var FLAG_V2 = 'sabatovicz_lp_migrated_v2';
      var BACKUP_KEY = 'sabatovicz_week_progress_backup_v1';
      var result = { ran: false, migrated: 0, students: 0, backupWritten: false };
      try {
        if (localStorage.getItem(FLAG_V2) === '1') { result.reason = 'already-migrated'; return result; }
        var Students = NS.Students;
        if (!Students) { result.reason = 'no-students'; return result; }

        // idOf maps both current ids and current names to the canonical id.
        // Falling back to name preserves legacy keys written before the id
        // migration (see platform-students.migrateScheduleKeys).
        var list = Students.load();
        var idOf = {};
        list.forEach(function (s) { idOf[s.id] = s.id; if (s.name) idOf[s.name] = s.id; });

        // Snapshot every '<X>-week<N>' key regardless of match — the backup
        // is a full rollback surface, not a filtered view.
        var backup = {};
        var toMigrate = [];
        for (var i = 0; i < localStorage.length; i++) {
          var k = localStorage.key(i);
          if (!k) continue;
          var m = k.match(/^(.+)-week(\d+)$/);
          if (!m) continue;
          var v = localStorage.getItem(k);
          backup[k] = v;
          if (v !== 'true') continue;
          var sid = idOf[m[1]];
          if (!sid) continue;
          toMigrate.push({ sid: sid, week: parseInt(m[2], 10) });
        }

        // Write backup ONCE, only if there's anything to preserve AND we
        // don't already have a backup on disk. Never overwrite.
        if (Object.keys(backup).length && localStorage.getItem(BACKUP_KEY) === null) {
          try {
            localStorage.setItem(BACKUP_KEY, JSON.stringify({
              _v: 1, createdAt: today(), keys: backup
            }));
            result.backupWritten = true;
          } catch (e) { /* backup best-effort — do not block migration */ }
        }

        // Group by student, but ONLY migrate items that Progress does not
        // already know about. Migração é consolidação de estado — se o
        // item já existe, preserva integralmente o registro (times,
        // firstAt, lastAt, lessons, note). Sem esta guarda, um segundo
        // boot com legado+Progress inflava times e injetava '1970-01-01'.
        var byStu = {};
        toMigrate.forEach(function (t) {
          var id = 'vocabulary:w' + t.week;
          if (Progress.isCovered(t.sid, id)) return;   // já em Progress → skip
          (byStu[t.sid] = byStu[t.sid] || []).push(id);
        });
        Object.keys(byStu).forEach(function (sid) {
          // Data '1970-01-01' sinaliza cobertura pré-Progress; o Report
          // já ignora esta data em campos "last:". Como filtramos itens
          // pré-existentes, esta chamada só CRIA registros novos.
          Progress.record(sid, byStu[sid], '1970-01-01');
        });

        localStorage.setItem(FLAG_V2, '1');
        result.ran = true;
        result.migrated = toMigrate.length;
        result.students = Object.keys(byStu).length;
        if (result.migrated) {
          console.info('[progress] migrated ' + result.migrated + ' legacy week records for ' +
                       result.students + ' student(s). Legacy keys preserved.');
        }
      } catch (e) {
        console.warn('[progress] ensureMigrated failed — no changes were written', e);
        result.error = e && e.message;
      }
      return result;
    }
  };

  NS.Progress = Progress;

  /* Auto-run on load. Requires TeacherLu.Students — every page that also
     loads Progress also loads Students (verified across builder, annual-
     plan, report, schedule, structures, students). Pages that don't need
     Progress (speaking-games, listening, grammar) simply don't trigger
     the migration; the flag remains unset until a Progress-bearing page
     opens, at which point migration runs exactly once. */
  try { if (NS.Students) Progress.ensureMigrated(); } catch (e) { /* never throws */ }

  /* ----------------------------------------------------------------------
     Teacher-added items feed the registry through a normal provider, one
     per skill. This is exactly the same public API a future Reading module
     would use — no special case anywhere.
     ---------------------------------------------------------------------- */
  if (NS.Content) {
    NS.Content.SKILLS.forEach(function (s) {
      NS.Content.register({
        id: 'custom-' + s.id,
        skill: s.id,
        label: 'Added by teacher',
        load: function () {
          return Progress.customItems().filter(function (i) { return i.skill === s.id; });
        },
        map: function (i, idx) {
          return {
            key: i.key, title: i.title, level: i.level || '',
            /* subtitle FICA VAZIO DE PROPÓSITO.
               Ele não é um rótulo livre: o Monthly Report interpreta
               subtitle como CATEGORIA de vocabulário, TEMA de speaking e
               pista de competência (engine/competencies.js). Nada disso
               vale para conteúdo adicionado à mão — nem o rótulo interno
               "added by you", nem a fonte do material ("Cool English"),
               que é procedência e não competência pedagógica.
               A fonte continua guardada em item.source e disponível para
               a interface; o que o aluno vê é o título humano, que já
               pode trazer a fonte: "Cool English — Unlucky Lottery Winner". */
            subtitle: '', order: i.order != null ? i.order : 1000 + idx
          };
        }
      });
    });
  }

})(typeof window !== 'undefined' ? window : this);
