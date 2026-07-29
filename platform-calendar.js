/* ==========================================================================
   Teacher Lu Platform — Calendar Service (shared integration layer)
   --------------------------------------------------------------------------
   A READ-ONLY adapter over the lesson data owned by schedule.html.

   WHY THIS FILE EXISTS
   --------------------
   The Lesson Calendar is the single source of truth for lessons. Other
   modules (Finance today, anything else tomorrow) need to *read* those
   lessons without knowing how they are stored and without schedule.html
   having to change.

   This file is the only place in the platform that knows:
     • the storage key format   'sched|<student id>|<YYYY-MM-DD>'
     • the record shape         { status, note, sessions? }
     • that records are keyed by student.id (migrated from name in v1.1)

   CONSECUTIVE LESSONS
   -------------------
   Since v1.2.0 the record may carry an optional `sessions` array for
   students with two consecutive lessons in the same evening. The
   full contract, rollup rules and per-module semantics live in
   docs/CONSECUTIVE-LESSONS.md — the CANONICAL reference.

   `toLesson()` automatically normalises sessions and computes the
   rollup status. `sessionsDoneOn(student, date)` is the correct helper
   for anyone who needs to count SESSIONS (not days), e.g. per_lesson
   billing.

   If schedule.html ever changes its storage, ONLY this file is touched.
   Consumers keep calling the same methods.

   CONTRACT
   --------
   • Read-only. This service never writes to a 'sched|' key. Ever.
   • Never throws. Every method degrades to an empty/neutral result.
   • No caching of stale data: reads are cheap and always fresh.
   • No dependency on any consumer module.

   USAGE
   -----
     <script src="platform-calendar.js"></script>

     var cal = window.TeacherLu.Calendar;
     if (cal.isAvailable()) {
       cal.lessons({ student: {id:'isa', name:'Isa'}, month: '2026-07' });
       cal.countDone({ id:'isa', name:'Isa' }, '2026-07');
     }
   ========================================================================== */

(function (global) {
  'use strict';

  var NS = global.TeacherLu = global.TeacherLu || {};

  /* ----------------------------------------------------------------------
     Storage details owned by schedule.html — the only coupling point.
     ---------------------------------------------------------------------- */
  var SCHEDULE = {
    prefix: 'sched|',
    /** 'sched|isa|2026-07-15' -> { name:'isa', date:'2026-07-15' } */
    parseKey: function (key) {
      if (!key || key.indexOf(SCHEDULE.prefix) !== 0) return null;
      var parts = key.split('|');
      if (parts.length < 3) return null;
      return { name: parts[1], date: parts[2] };
    },
    /**
     * Normalise a stored record into the public lesson shape.
     *
     * Records may now carry a `sessions` array for students with two
     * consecutive lessons. The rollup keeps working the same for consumers
     * (Finance still counts one "lesson done" per calendar cell — see below).
     *
     *   Legacy record: { status, note }
     *   New record:    { status, note, sessions: [{status,note,homework},
     *                                              {status,note,homework}] }
     *
     * Rollup status precedence:
     *   any 'done' → 'done'      (a done half counts as a done lesson)
     *   any 'scheduled' && !done → 'scheduled'
     *   any 'cancelled' && no other → 'cancelled'
     *   else → ''
     */
    toLesson: function (name, date, raw) {
      if (!raw) return null;

      var sessions = Array.isArray(raw.sessions) ? raw.sessions : null;
      var rollup = raw.status || '';

      if (sessions && sessions.length) {
        var hasDone = false, hasSched = false, hasCanc = false;
        for (var i = 0; i < sessions.length; i++) {
          var st = (sessions[i] || {}).status || '';
          if (st === 'done') hasDone = true;
          else if (st === 'scheduled') hasSched = true;
          else if (st === 'cancelled') hasCanc = true;
        }
        if (hasDone) rollup = 'done';
        else if (hasSched) rollup = 'scheduled';
        else if (hasCanc) rollup = 'cancelled';
      }

      // A record with a note but no status counts as a lesson that happened.
      if (!rollup && raw.note) rollup = 'done';
      if (!rollup && !sessions) return null;
      if (!rollup) return null;

      return {
        studentKey: name,          // student.id desde a migração
        studentName: name,         // mantido por compatibilidade
        date: date,
        status: rollup,            // 'done' | 'scheduled' | 'cancelled'
        note: raw.note || '',
        sessions: sessions ? sessions.map(function (s) {
          return {
            status: (s && s.status) || '',
            note: (s && s.note) || '',
            homework: (s && s.homework) || ''
          };
        }) : null
      };
    }
  };

  /** Statuses the rest of the platform can rely on. */
  var STATUS = { DONE: 'done', SCHEDULED: 'scheduled', CANCELLED: 'cancelled' };

  /* ----------------------------------------------------------------------
     Internals
     ---------------------------------------------------------------------- */

  /**
   * Accepts a student object, an id or a name — returns the key the calendar
   * stores lessons under.
   *
   * Since the id migration, that key is `student.id`. The name fallback is
   * kept for records that could not be migrated (a lesson stored under a name
   * that no longer matches any student), so no history is ever invisible.
   */
  function resolveKey(student) {
    if (!student) return null;
    if (typeof student === 'object') return student.id || student.name || null;

    // A plain string: prefer it as an id, fall back to translating a name.
    var S = global.TeacherLu && global.TeacherLu.Students;
    if (S) {
      if (S.byId(student)) return student;
      var id = S.idOf(student);
      if (id) return id;
    }
    return student;
  }

  function safeParse(raw) {
    try { return JSON.parse(raw); } catch (e) { return null; }
  }

  /** Walk every 'sched|' key once, applying a visitor. Never throws. */
  function eachRecord(visitor) {
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var parsed = SCHEDULE.parseKey(key);
        if (!parsed) continue;
        var lesson = SCHEDULE.toLesson(
          parsed.name, parsed.date, safeParse(localStorage.getItem(key))
        );
        if (lesson) visitor(lesson);
      }
    } catch (e) {
      console.warn('[calendar-service] could not read the calendar', e);
    }
  }

  function byDate(a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; }

  /* ----------------------------------------------------------------------
     Public API
     ---------------------------------------------------------------------- */

  var Calendar = {

    VERSION: '1.2.0',
    SOURCE: 'schedule.html',
    STATUS: STATUS,

    /** True when the Lesson Calendar has any data at all. */
    isAvailable: function () {
      var found = false;
      try {
        for (var i = 0; i < localStorage.length; i++) {
          var k = localStorage.key(i);
          if (k && k.indexOf(SCHEDULE.prefix) === 0) { found = true; break; }
        }
      } catch (e) { return false; }
      return found;
    },

    /** True when this specific student has any lesson recorded. */
    hasData: function (student) {
      var name = resolveKey(student);
      if (!name) return false;
      var found = false;
      eachRecord(function (l) { if (l.studentKey === name) found = true; });
      return found;
    },

    /**
     * Query lessons.
     *
     *   lessons({
     *     student: {id,name} | 'Isa',   // optional — omit for all students
     *     month:   '2026-07',           // optional
     *     from:    '2026-07-01',        // optional
     *     to:      '2026-07-31',        // optional
     *     status:  'done'               // optional, or ['done','scheduled']
     *   })
     *
     * Returns [{ studentName, date, status, note }] sorted by date.
     */
    lessons: function (query) {
      var q = query || {};
      var name = q.student ? resolveKey(q.student) : null;
      var statuses = q.status
        ? (Array.isArray(q.status) ? q.status : [q.status])
        : null;

      var out = [];
      eachRecord(function (l) {
        if (name && l.studentKey !== name) return;
        if (q.month && l.date.slice(0, 7) !== q.month) return;
        if (q.from && l.date < q.from) return;
        if (q.to && l.date > q.to) return;
        if (statuses && statuses.indexOf(l.status) === -1) return;
        out.push(l);
      });
      return out.sort(byDate);
    },

    /** Lessons marked as done for a student in a "YYYY-MM" month. */
    lessonsDone: function (student, month) {
      return Calendar.lessons({ student: student, month: month, status: STATUS.DONE });
    },

    /** How many lessons were done — the number Finance charges for. */
    countDone: function (student, month) {
      return Calendar.lessonsDone(student, month).length;
    },

    /** Counts per status for a month: { done, scheduled, cancelled, total }. */
    summary: function (student, month) {
      var s = { done: 0, scheduled: 0, cancelled: 0, total: 0 };
      Calendar.lessons({ student: student, month: month }).forEach(function (l) {
        if (s[l.status] !== undefined) s[l.status]++;
        s.total++;
      });
      return s;
    },

    /** Lessons done from a date onwards — used for package credits. */
    countDoneSince: function (student, fromISO) {
      return Calendar.lessons({
        student: student, from: fromISO, status: STATUS.DONE
      }).length;
    },

    /**
     * How many lesson-sessions were done on a date for a student.
     * Returns 0, 1 or 2 (for double-lesson students where both were done).
     * Used by Finance to charge per actual half-lesson given.
     */
    sessionsDoneOn: function (student, date) {
      var lessons = Calendar.lessons({ student: student, from: date, to: date });
      if (!lessons.length) return 0;
      var l = lessons[0];
      if (l.sessions && l.sessions.length) {
        var n = 0;
        for (var i = 0; i < l.sessions.length; i++) {
          if (l.sessions[i].status === 'done') n++;
        }
        return n;
      }
      return l.status === 'done' ? 1 : 0;
    },

    /** Every month that has data, newest first — handy for reports. */
    monthsWithData: function (student) {
      var name = student ? resolveKey(student) : null;
      var months = {};
      eachRecord(function (l) {
        if (name && l.studentKey !== name) return;
        months[l.date.slice(0, 7)] = true;
      });
      return Object.keys(months).sort().reverse();
    }
  };

  NS.Calendar = Calendar;

})(typeof window !== 'undefined' ? window : this);
