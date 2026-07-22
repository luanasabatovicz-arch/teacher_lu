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

    addCustomItem: function (skillId, title, level) {
      title = String(title || '').trim();
      if (!skillId || !title) return null;
      var list = Progress.customItems();
      var item = {
        key: 'custom-' + Date.now().toString(36),
        skill: skillId,
        title: title,
        level: level || '',
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
    }
  };

  NS.Progress = Progress;

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
            subtitle: 'added by you', order: i.order != null ? i.order : 1000 + idx
          };
        }
      });
    });
  }

})(typeof window !== 'undefined' ? window : this);
