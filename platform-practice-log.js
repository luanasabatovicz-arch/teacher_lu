/* ==========================================================================
   Teacher Lu Platform — Practice Log
   --------------------------------------------------------------------------
   Which individual EXERCISES a student has actually done.

   WHY THIS FILE EXISTS — AND WHY IT IS NOT platform-progress.js
   -------------------------------------------------------------
   Progress answers "WHEN did this student study this CONTENT?". It is
   indexed by day and, by design, the same content may be recorded again on
   another date — that is what makes the Calendar and the Monthly Report
   work.

   This store answers a different question: "has this student ALREADY DONE
   this exercise?". The answer must be permanent, so the exercise never
   comes back in that student's pool. Mixing the two would flood the
   Monthly Report with hundreds of exercise rows and break Progress's
   per-day semantics.

   Two stores, two questions, zero coupling. This file never reads or
   writes anything owned by platform-progress.js.

   DATA
   ----
   Key:   'sabatovicz_practice_<studentId>'
   Value: {
            done: {
              'past-complete-001': { at: '2026-08-18', n: 1 },
              'reading-routine-004': { at: '2026-08-11', n: 2 }
            }
          }

   `at` is the date of the FIRST completion and never changes — it is the
   answer to "when did the student do this?". `n` counts on how many
   DIFFERENT days the exercise was used; it only ever grows through a
   future manual "Review completed exercises" action. The normal filter
   looks at the existence of the key, never at `n`.

   CONTRACT
   --------
   • Never throws.
   • Keyed by studentId — never by name.
   • markDone is idempotent per (exercise, day): clicking the verdict twice
     in the same lesson changes nothing and still reports success.
   • Getting it WRONG also counts as used. The exercise was spent; the
     error belongs in the review queue, which is somebody else's job.
   • Knows nothing about any specific exercise format or bank.

   PHASE NOTE (etapa 4 — "register without hiding")
   ------------------------------------------------
   Nothing filters on this store yet. It records; the Exercise Bank keeps
   showing every exercise. Filtering is switched on only after the
   completion rule has been validated in real lessons.
   ========================================================================== */

(function (global) {
  'use strict';

  var NS = global.TeacherLu = global.TeacherLu || {};

  var PREFIX = 'sabatovicz_practice_';

  function read(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return fallback;
      var v = JSON.parse(raw);
      return v == null ? fallback : v;
    } catch (e) {
      console.warn('[practice-log] could not read ' + key, e);
      return fallback;
    }
  }

  function write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('[practice-log] could not save ' + key, e);
      return false;
    }
  }

  function studentKey(studentId) { return PREFIX + studentId; }

  function today() {
    var d = new Date();
    var p = function (n) { return (n < 10 ? '0' : '') + n; };
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
  }

  /** A pool may be an array of exercise objects or of plain id strings. */
  function idOf(x) {
    if (x == null) return '';
    if (typeof x === 'string') return x;
    return String(x.id || '');
  }

  var PracticeLog = {

    VERSION: '1.0.0',

    /* ------------------------------------------------------------------
       Reading
       ------------------------------------------------------------------ */

    /** Whole record for a student: { done: {...} }. */
    of: function (studentId) {
      var rec = read(studentKey(studentId), null);
      if (!rec || typeof rec !== 'object') rec = { done: {} };
      if (!rec.done || typeof rec.done !== 'object') rec.done = {};
      return rec;
    },

    /** True when this student has already done this exercise. */
    isDone: function (studentId, exerciseId) {
      if (!studentId || !exerciseId) return false;
      return !!PracticeLog.of(studentId).done[exerciseId];
    },

    /** The entry for one exercise, or null. */
    entry: function (studentId, exerciseId) {
      if (!studentId || !exerciseId) return null;
      return PracticeLog.of(studentId).done[exerciseId] || null;
    },

    /** Every exercise id this student has done. */
    doneIds: function (studentId) {
      if (!studentId) return [];
      return Object.keys(PracticeLog.of(studentId).done);
    },

    /** How many exercises this student has used, in total. */
    countDone: function (studentId) {
      return PracticeLog.doneIds(studentId).length;
    },

    /* ------------------------------------------------------------------
       Writing
       ------------------------------------------------------------------ */

    /**
     * Record that this student really did this exercise.
     *   PracticeLog.markDone('isa', 'past-complete-001')
     *
     * Idempotent per (exercise, day). Returns false ONLY when the write
     * failed — callers must not report success on false (same rule as
     * Progress, F-2).
     */
    markDone: function (studentId, exerciseId, date) {
      if (!studentId || !exerciseId) return false;
      var d = date || today();
      var rec = PracticeLog.of(studentId);
      var e = rec.done[exerciseId];

      if (!e) {
        rec.done[exerciseId] = { at: d, n: 1 };
      } else {
        if (e.at === d || e.lastAt === d) return true;   // same day → no-op
        e.n = (e.n || 1) + 1;
        e.lastAt = d;                                    // only set on repeats
      }
      return write(studentKey(studentId), rec);
    },

    /** Undo a wrong mark — for THIS student only. */
    undo: function (studentId, exerciseId) {
      if (!studentId || !exerciseId) return false;
      var rec = PracticeLog.of(studentId);
      if (!rec.done[exerciseId]) return true;            // nothing to undo
      delete rec.done[exerciseId];
      return write(studentKey(studentId), rec);
    },

    /** Wipe a student's practice log (the caller confirms). */
    reset: function (studentId) {
      if (!studentId) return false;
      return write(studentKey(studentId), { done: {} });
    },

    /* ------------------------------------------------------------------
       Pool helpers
       ------------------------------------------------------------------
       NOT wired to any screen yet — see the PHASE NOTE at the top.
       ------------------------------------------------------------------ */

    /** The exercises of `pool` this student has NOT done yet. */
    available: function (studentId, pool) {
      if (!Array.isArray(pool)) return [];
      if (!studentId) return pool.slice();
      var done = PracticeLog.of(studentId).done;
      return pool.filter(function (x) { return !done[idOf(x)]; });
    },

    /** { total, done, left } for one pool. */
    stats: function (studentId, pool) {
      var list = Array.isArray(pool) ? pool : [];
      var left = PracticeLog.available(studentId, list).length;
      return { total: list.length, done: list.length - left, left: left };
    },

    /**
     * One random not-yet-done exercise, or null when the pool is spent.
     * Prepared for the filtering phase; nothing calls it today.
     */
    next: function (studentId, pool) {
      var left = PracticeLog.available(studentId, pool);
      if (!left.length) return null;
      return left[Math.floor(Math.random() * left.length)];
    },

    /** Flat history, newest first — for a future "what has Maria done?" view. */
    history: function (studentId) {
      var done = PracticeLog.of(studentId).done;
      return Object.keys(done).map(function (id) {
        var e = done[id] || {};
        return { exerciseId: id, at: e.at || '', n: e.n || 1 };
      }).sort(function (a, b) { return a.at < b.at ? 1 : (a.at > b.at ? -1 : 0); });
    }
  };

  NS.PracticeLog = PracticeLog;

})(typeof window !== 'undefined' ? window : this);
