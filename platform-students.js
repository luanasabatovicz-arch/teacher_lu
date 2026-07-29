/* ==========================================================================
   Teacher Lu Platform — Student store (single source of truth)
   --------------------------------------------------------------------------
   The student list used to be copy-pasted into six pages. This file is now
   the only place it exists. Every module reads from here.

   WHY THIS FILE EXISTS
   --------------------
   Six copies of DEFAULT_STUDENTS meant six versions of the truth: if one
   drifted, different pages would show different students. One file, one list.

   PUBLIC API
   ----------
     TeacherLu.Students.DEFAULTS      the seed list
     TeacherLu.Students.load()        the saved list (seeds on first run)
     TeacherLu.Students.save(list)
     TeacherLu.Students.byId(id)
     TeacherLu.Students.byName(name)
     TeacherLu.Students.nameOf(id)    display name, falls back to the id
     TeacherLu.Students.idOf(name)
     TeacherLu.Students.slug(name)    stable id from a name
     TeacherLu.Students.resolveId(x)  accepts an object, an id or a name

   IMPORTANT — IDENTITY RULE
   -------------------------
   Every stored record in the platform must be keyed by `student.id`.
   The name is for display only: the teacher can rename a student at any
   time and nothing may break. See migrateScheduleKeys() below.

   CONTRACT
   --------
   • Never throws.
   • Declares nothing in the global scope except window.TeacherLu.
     (Bare top-level `const` would collide with the pages that still
      declare STU_KEY / DEFAULT_STUDENTS.)
   ========================================================================== */

(function (global) {
  'use strict';

  var NS = global.TeacherLu = global.TeacherLu || {};

  var STU_KEY = 'sabatovicz_students';

  /** The seed list — previously duplicated in six pages. */
  var DEFAULTS = [
    { id: 'natali', name: 'Natali', emoji: '🌟', level: 'A1', age: '' },
    { id: 'heitor', name: 'Heitor', emoji: '🚀', level: 'A1', age: '' },
    { id: 'joao',   name: 'João',   emoji: '⚽', level: 'A1', age: '' },
    { id: 'maria',  name: 'Maria',  emoji: '🌸', level: 'A1', age: '' },
    { id: 'lais',   name: 'Lais',   emoji: '🎨', level: 'A1', age: '' },
    { id: 'regis',  name: 'Régis',  emoji: '🎸', level: 'A1', age: '' },
    { id: 'isa',    name: 'Isa',    emoji: '🦄', level: 'A1', age: 10 }
  ];

  /* ====================================================================
     SCHEDULE CONFIG PER STUDENT
     --------------------------------------------------------------------
     Some students take two consecutive lessons (e.g. 19:00–19:50 + break
     + 20:00–20:50). The student record may carry a `schedule` object:

       schedule: {
         mode:         'single' | 'double',
         startTime:    'HH:MM',      // optional
         duration:     50,           // minutes per lesson
         breakMinutes: 10            // gap between sessions (double only)
       }

     Students without a `schedule` field are treated as single-lesson —
     backward compatible with every legacy record.
     ==================================================================== */
  var SCHEDULE_DEFAULT = {
    mode: 'single',
    startTime: '',
    duration: 50,
    breakMinutes: 10
  };

  /** Parse "HH:MM" (24h) — returns minutes since midnight, or null. */
  function parseTime(t) {
    if (!t || typeof t !== 'string') return null;
    var m = t.match(/^(\d{1,2}):(\d{2})$/);
    if (!m) return null;
    var h = +m[1], mm = +m[2];
    if (h < 0 || h > 23 || mm < 0 || mm > 59) return null;
    return h * 60 + mm;
  }
  /** Minutes since midnight -> "HH:MM". */
  function formatTime(min) {
    if (min == null || isNaN(min)) return '';
    var h = Math.floor(min / 60) % 24;
    var mm = Math.abs(Math.round(min % 60));
    return String(h).padStart(2, '0') + ':' + String(mm).padStart(2, '0');
  }

  var Students = {

    VERSION: '1.1.0',
    KEY: STU_KEY,
    DEFAULTS: DEFAULTS,
    SCHEDULE_DEFAULT: SCHEDULE_DEFAULT,

    /** The saved list. Seeds with DEFAULTS on the very first run. */
    load: function () {
      try {
        var v = localStorage.getItem(STU_KEY);
        if (v) {
          var a = JSON.parse(v);
          if (Array.isArray(a) && a.length) return a;
        }
      } catch (e) {
        console.warn('[students] could not read the student list', e);
      }
      try { localStorage.setItem(STU_KEY, JSON.stringify(DEFAULTS)); } catch (e) {}
      return DEFAULTS.slice();
    },

    save: function (list) {
      try {
        localStorage.setItem(STU_KEY, JSON.stringify(list || []));
        return true;
      } catch (e) {
        console.error('[students] could not save the student list', e);
        return false;
      }
    },

    byId: function (id) {
      var list = Students.load();
      for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
      return null;
    },

    byName: function (name) {
      var list = Students.load();
      for (var i = 0; i < list.length; i++) if (list[i].name === name) return list[i];
      return null;
    },

    nameOf: function (id) {
      var s = Students.byId(id);
      return s ? s.name : id;
    },

    idOf: function (name) {
      var s = Students.byName(name);
      return s ? s.id : null;
    },

    /** Accepts a student object, an id or a name — always returns an id. */
    resolveId: function (x) {
      if (!x) return null;
      if (typeof x === 'object') return x.id || Students.idOf(x.name);
      return Students.byId(x) ? x : Students.idOf(x);
    },

    /* ====================================================================
       SCHEDULE HELPERS
       ==================================================================== */

    /** Read the schedule config of a student — always returns a normalised object. */
    scheduleOf: function (studentOrId) {
      var s = studentOrId;
      if (typeof studentOrId === 'string') s = Students.byId(studentOrId);
      if (!s) return Object.assign({}, SCHEDULE_DEFAULT);
      var sc = s.schedule || {};
      return {
        mode: sc.mode === 'double' ? 'double' : 'single',
        startTime: typeof sc.startTime === 'string' ? sc.startTime : '',
        duration: +sc.duration > 0 ? +sc.duration : SCHEDULE_DEFAULT.duration,
        breakMinutes: +sc.breakMinutes >= 0 ? +sc.breakMinutes : SCHEDULE_DEFAULT.breakMinutes
      };
    },

    /** True if student has two consecutive lessons. */
    isDouble: function (studentOrId) {
      return Students.scheduleOf(studentOrId).mode === 'double';
    },

    /**
     * Compute session windows for the student.
     * Returns [{ label, start, end, startMin, endMin }] — 1 item for single, 2 for double.
     * Returns [] when the student has no startTime set (no timeline to compute).
     */
    sessionsOf: function (studentOrId) {
      var sc = Students.scheduleOf(studentOrId);
      var startMin = parseTime(sc.startTime);
      if (startMin == null) return [];
      var s1End = startMin + sc.duration;
      var out = [{
        label: sc.mode === 'double' ? 'Aula 1' : 'Aula',
        start: formatTime(startMin),
        end: formatTime(s1End),
        startMin: startMin,
        endMin: s1End
      }];
      if (sc.mode === 'double') {
        var s2Start = s1End + sc.breakMinutes;
        var s2End = s2Start + sc.duration;
        out.push({
          label: 'Aula 2',
          start: formatTime(s2Start),
          end: formatTime(s2End),
          startMin: s2Start,
          endMin: s2End
        });
      }
      return out;
    },

    /** Compact time range for the whole block, e.g. "19:00–20:50" — '' if no time set. */
    blockRange: function (studentOrId) {
      var sess = Students.sessionsOf(studentOrId);
      if (!sess.length) return '';
      return sess[0].start + '–' + sess[sess.length - 1].end;
    },

    /** Total block minutes (both lessons + break in double mode). */
    blockMinutes: function (studentOrId) {
      var sc = Students.scheduleOf(studentOrId);
      return sc.mode === 'double'
        ? (sc.duration * 2 + sc.breakMinutes)
        : sc.duration;
    },

    slug: function (name) {
      return String(name || '')
        .normalize('NFD').replace(/[̀-ͯ]/g, '')
        .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
        || ('stu' + Date.now());
    },

    /* ====================================================================
       MIGRATION — lesson keys from name to id
       --------------------------------------------------------------------
       The Lesson Calendar used to store 'sched|<name>|<date>'. Renaming a
       student orphaned their whole history, and silently zeroed per-lesson
       billing in Finance.

       This rewrites those keys to 'sched|<id>|<date>'. It runs once,
       is idempotent, and never destroys data: a key it cannot resolve is
       left exactly where it is.
       ==================================================================== */
    migrateScheduleKeys: function () {
      var FLAG = 'sabatovicz_sched_id_migrated';
      var result = { ran: false, moved: 0, kept: 0, skipped: [] };

      try {
        if (localStorage.getItem(FLAG) === '1') return result;

        var list = Students.load();
        var idSet = {}, nameToId = {};
        list.forEach(function (s) { idSet[s.id] = true; nameToId[s.name] = s.id; });

        // Snapshot first: we are about to write while reading.
        var keys = [];
        for (var i = 0; i < localStorage.length; i++) {
          var k = localStorage.key(i);
          if (k && k.indexOf('sched|') === 0) keys.push(k);
        }

        keys.forEach(function (key) {
          var parts = key.split('|');
          if (parts.length < 3) return;
          var who = parts[1], date = parts[2];

          if (idSet[who]) { result.kept++; return; }        // already an id

          var id = nameToId[who];
          if (!id) { result.skipped.push(who); return; }    // unknown — leave it

          var target = 'sched|' + id + '|' + date;
          var value = localStorage.getItem(key);

          // Never overwrite an existing id-keyed record.
          if (localStorage.getItem(target) === null) {
            localStorage.setItem(target, value);
            result.moved++;
          }
          localStorage.removeItem(key);
        });

        localStorage.setItem(FLAG, '1');
        result.ran = true;

        if (result.moved) {
          console.info('[students] ' + result.moved +
            ' lesson record(s) migrated from name-based to id-based keys.');
        }
        if (result.skipped.length) {
          console.warn('[students] lesson records kept under an unknown name: ' +
            result.skipped.filter(function (v, i, a) { return a.indexOf(v) === i; }).join(', '));
        }
      } catch (e) {
        console.error('[students] schedule migration failed — nothing was lost', e);
      }

      return result;
    }
  };

  NS.Students = Students;

  // Runs as soon as the file loads, on every page that includes it.
  // Idempotent: only the first call does any work.
  Students.migrateScheduleKeys();

})(typeof window !== 'undefined' ? window : this);
