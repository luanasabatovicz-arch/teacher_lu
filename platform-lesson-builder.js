/* ==========================================================================
   Teacher Lu Platform — Lesson Builder (recommendation engine)
   --------------------------------------------------------------------------
   Answers one question: "What should I teach this student today?"

   WHAT IT IS
   ----------
   An ORCHESTRATOR. It owns no content whatsoever. It reads what the
   platform already knows and assembles a lesson out of it:

     TeacherLu.Content    → the whole catalogue (all skills, all modules)
     TeacherLu.Progress   → what this student has already studied
     TeacherLu.Calendar   → when the last lesson happened, how often
     TeacherLu.Students   → who the student is
     CURRICULUM_WEEKS     → the 52-week yearly route (engine/curriculum-map.js)

   Add a Reading module tomorrow and it appears in the plan automatically,
   because it appears in the Content registry. Nothing here changes.

   PURE
   ----
   No DOM, no side effects. build() is a function of stored state, so it can
   be tested headlessly and reasoned about.

   USAGE
   -----
     var plan = TeacherLu.LessonBuilder.build('isa', 45);
     plan.blocks.forEach(b => console.log(b.label, b.title, b.why));
   ========================================================================== */

(function (global) {
  'use strict';

  var NS = global.TeacherLu = global.TeacherLu || {};

  var CURRICULUM_KEY = 'sabatovicz_curriculum_map';

  /* ----------------------------------------------------------------------
     Duration profiles
     ----------------------------------------------------------------------
     Each profile lists the blocks that fit and how many minutes each gets.
     Shorter lessons drop the extras and keep the core: one new thing,
     one chance to speak.
     ---------------------------------------------------------------------- */
  var PROFILES = {
    15: {
      label: 'Quick session',
      note: 'One focus only — no time to open a second front.',
      blocks: [
        { id:'warmup',   minutes:3 },
        { id:'focus',    minutes:9 },
        { id:'review',   minutes:3 }
      ]
    },
    30: {
      label: 'Standard lesson',
      note: 'One new structure plus vocabulary, and time to use both.',
      blocks: [
        { id:'warmup',       minutes:4 },
        { id:'focus',        minutes:10 },
        { id:'vocabulary',   minutes:6 },
        { id:'conversation', minutes:7 },
        { id:'review',       minutes:3 }
      ]
    },
    45: {
      label: 'Full lesson',
      note: 'Grammar and structures both get a turn, with a speaking task.',
      blocks: [
        { id:'warmup',       minutes:5 },
        { id:'grammar',      minutes:9 },
        { id:'structures',   minutes:9 },
        { id:'vocabulary',   minutes:6 },
        { id:'exercise',     minutes:6 },
        { id:'speaking',     minutes:6 },
        { id:'conversation', minutes:4 }
      ]
    },
    60: {
      label: 'Extended lesson',
      note: 'The complete sequence, ending with homework.',
      blocks: [
        { id:'warmup',       minutes:5 },
        { id:'grammar',      minutes:11 },
        { id:'structures',   minutes:10 },
        { id:'vocabulary',   minutes:8 },
        { id:'exercise',     minutes:7 },
        { id:'speaking',     minutes:9 },
        { id:'conversation', minutes:6 },
        { id:'homework',     minutes:4 }
      ]
    }
  };

  var BLOCK_LABELS = {
    warmup:'Warm-up', focus:'Main focus', grammar:'Grammar',
    structures:'Language Structures', vocabulary:'Vocabulary',
    exercise:'Exercise', speaking:'Speaking activity',
    conversation:'Conversation questions', homework:'Homework', review:'Quick review'
  };

  /* ----------------------------------------------------------------------
     Helpers
     ---------------------------------------------------------------------- */

  function today() {
    var d = new Date(), p = function (n) { return (n < 10 ? '0' : '') + n; };
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
  }

  function daysBetween(a, b) {
    var pa = String(a).split('-'), pb = String(b).split('-');
    var da = new Date(+pa[0], +pa[1] - 1, +pa[2]);
    var db = new Date(+pb[0], +pb[1] - 1, +pb[2]);
    return Math.round((db - da) / 86400000);
  }

  function safe(fn, fallback) {
    try { return fn(); } catch (e) { return fallback; }
  }

  /** The full topic object behind a catalogue item, when the module is loaded. */
  function topicOf(item) {
    if (!item) return null;
    if (item.skill === 'structures' && global.STRUCTURES_TOPICS) {
      return global.STRUCTURES_TOPICS[item.key] || null;
    }
    if (item.skill === 'grammar' && global.ENGINE_TOPICS) {
      return global.ENGINE_TOPICS[item.key] || null;
    }
    if (item.skill === 'speaking' && global.SPEAKING_ACTIVITIES) {
      for (var i = 0; i < global.SPEAKING_ACTIVITIES.length; i++) {
        if (global.SPEAKING_ACTIVITIES[i].id === item.key) return global.SPEAKING_ACTIVITIES[i];
      }
    }
    return null;
  }

  var LessonBuilder = {

    VERSION: '1.0.0',
    PROFILES: PROFILES,
    DURATIONS: [15, 30, 45, 60],

    /* ==================================================================
       READING THE PLATFORM
       ================================================================== */

    /**
     * The 52-week route.
     * Preferred source: engine/curriculum-map.js, loaded by this page —
     * funciona em navegador novo, sem depender de outra página.
     * Fallback: a publicação antiga em localStorage, para instalações
     * que ainda a tenham gravada.
     */
    curriculum: function () {
      if (global.CURRICULUM_WEEKS && global.CURRICULUM_WEEKS.length) {
        return { weeks: global.CURRICULUM_WEEKS,
                 stages: global.CURRICULUM_STAGES || [] };
      }
      return safe(function () {
        var raw = localStorage.getItem(CURRICULUM_KEY);
        if (!raw) return null;
        var p = JSON.parse(raw);
        return (p && Array.isArray(p.weeks)) ? p : null;
      }, null);
    },

    /**
     * Everything the platform knows about this student right now.
     * This is the evidence every recommendation is justified with.
     */
    context: function (studentId) {
      var Progress = NS.Progress, Calendar = NS.Calendar, Students = NS.Students;
      var ctx = {
        studentId: studentId,
        name: Students ? Students.nameOf(studentId) : studentId,
        lastLesson: null,
        daysSince: null,
        lessonsDone: 0,
        lastTaught: [],
        overall: { done: 0, total: 0, pct: 0 },
        stats: [],
        weakest: null,
        curriculumWeek: null
      };

      // --- Lesson Calendar ---
      if (Calendar && Students) {
        var stu = Students.byId(studentId) || { id: studentId };
        var done = safe(function () {
          return Calendar.lessons({ student: stu, status: 'done' });
        }, []);
        ctx.lessonsDone = done.length;
        if (done.length) {
          ctx.lastLesson = done[done.length - 1].date;
          ctx.daysSince = daysBetween(ctx.lastLesson, today());
        }
      }

      // --- Learning Progress ---
      if (Progress) {
        ctx.overall = Progress.overall(studentId);
        ctx.stats = Progress.stats(studentId);
        // Weakest skill that actually has content in it.
        var withContent = ctx.stats.filter(function (s) { return s.total > 0; });
        withContent.sort(function (a, b) { return a.pct - b.pct; });
        ctx.weakest = withContent[0] || null;

        // What was covered in the most recent lesson — used for recycling.
        if (ctx.lastLesson) {
          ctx.lastTaught = safe(function () {
            return Progress.ofLesson(studentId, ctx.lastLesson);
          }, []);
        }
      }

      // --- Curriculum Map: where the student is on the yearly route ---
      var cur = LessonBuilder.curriculum();
      if (cur && Progress) {
        var covered = Progress.of(studentId).items;
        for (var i = 0; i < cur.weeks.length; i++) {
          if (!covered['vocabulary:w' + cur.weeks[i].week]) {
            ctx.curriculumWeek = cur.weeks[i];
            break;
          }
        }
      }

      return ctx;
    },

    /**
     * The date this lesson should be recorded under — inferred from the
     * calendar so that Calendar and Learning Progress never diverge (F-1).
     *
     * Preference, all read from data the flow already has:
     *   1. A lesson marked TODAY (scheduled or done) → today.
     *      The teacher is giving today's scheduled lesson.
     *   2. The next SCHEDULED lesson (today or later, nearest) → that date.
     *      The teacher is preparing an upcoming, already-scheduled lesson.
     *   3. No calendar lesson available → today() — the previous behaviour,
     *      unchanged.
     *
     * It never invents a date: every value returned is either today or a
     * date the teacher already put on the calendar.
     */
    resolveLessonDate: function (studentId) {
      var Calendar = NS.Calendar, Students = NS.Students;
      var t = today();
      if (!Calendar || !Students) return t;

      var stu = Students.byId(studentId) || { id: studentId };
      var all = safe(function () { return Calendar.lessons({ student: stu }); }, []);

      // 1. a lesson dated today (any status) → today
      for (var i = 0; i < all.length; i++) {
        if (all[i].date === t) return t;
      }
      // 2. the nearest scheduled lesson from today onwards
      var upcoming = all.filter(function (l) {
        return l.status === 'scheduled' && l.date >= t;
      }); // Calendar.lessons() already returns them sorted ascending
      if (upcoming.length) return upcoming[0].date;

      // 3. fallback — unchanged behaviour
      return t;
    },

    /** The next not-yet-covered item of a skill, in catalogue order. */
    nextIn: function (studentId, skillId, exclude) {
      var Content = NS.Content, Progress = NS.Progress;
      if (!Content || !Progress) return null;
      var covered = Progress.of(studentId).items;
      var skip = exclude || {};
      var items = Content.items(skillId);
      for (var i = 0; i < items.length; i++) {
        if (!covered[items[i].id] && !skip[items[i].id]) return items[i];
      }
      return null;
    },

    /** Something already taught, to recycle in the warm-up. */
    recycleItem: function (ctx) {
      var Content = NS.Content;
      if (!Content || !ctx.lastTaught.length) return null;
      for (var i = 0; i < ctx.lastTaught.length; i++) {
        var it = Content.byId(ctx.lastTaught[i]);
        if (it) return it;
      }
      return null;
    },

    /* ==================================================================
       BUILDING THE PLAN
       ================================================================== */

    /**
     * build(studentId, duration) -> plan
     *
     * Every block carries `why`: the evidence behind the choice, in plain
     * language. The teacher should never wonder where a suggestion came from.
     */
    build: function (studentId, duration) {
      var profile = PROFILES[duration] || PROFILES[45];
      var ctx = LessonBuilder.context(studentId);
      var used = {};            // avoid suggesting the same item twice
      var blocks = [];

      /** Pick the next item of a skill and remember it. */
      function take(skill) {
        var it = LessonBuilder.nextIn(studentId, skill, used);
        if (it) used[it.id] = true;
        return it;
      }

      // The "focus" block of short lessons goes to the weakest skill.
      var focusSkill = ctx.weakest ? ctx.weakest.skill : 'structures';

      profile.blocks.forEach(function (slot) {
        var b = {
          id: slot.id,
          label: BLOCK_LABELS[slot.id] || slot.id,
          minutes: slot.minutes,
          item: null, topic: null, title: '', why: '', source: '', content: null,
          hostId: null,      // bloco derivado: pratica o conteúdo de outro bloco
          recycled: false    // warm-up: conteúdo já ensinado, revisto de propósito
        };

        switch (slot.id) {

          /* ---- Warm-up: recycle, or open the year ---- */
          case 'warmup':
            var rec = LessonBuilder.recycleItem(ctx);
            if (rec) {
              b.item = rec;
              b.topic = topicOf(rec);
              b.recycled = true;
              b.title = 'Recycle: ' + rec.title;
              b.source = rec.skill;
              b.why = 'You taught this in the last lesson (' + ctx.lastLesson +
                      '). Starting with it turns new content into revision.';
              b.content = { questions: (b.topic && b.topic.questions) ? b.topic.questions.slice(0, 2) : [] };
            } else if (ctx.lessonsDone === 0) {
              b.title = 'First lesson — get to know each other';
              b.why = 'No lessons recorded yet for ' + ctx.name + '. Start by listening to them.';
              b.content = { questions: [
                'What is your name and where are you from?',
                'Why do you want to learn English?',
                'What do you do in your free time?'
              ] };
            } else {
              b.title = 'Free conversation';
              b.why = 'No content was recorded in the last lesson, so open with free talk.';
              b.content = { questions: ['How was your week?', 'What did you do since our last lesson?'] };
            }
            break;

          /* ---- Focus: the weakest skill, for short lessons ---- */
          case 'focus':
            var f = take(focusSkill);
            b.item = f; b.topic = topicOf(f);
            b.title = f ? f.title : 'Free practice';
            b.source = focusSkill;
            b.why = ctx.weakest
              ? BLOCK_LABELS[focusSkill] || focusSkill + ' is the weakest area (' +
                ctx.weakest.pct + '% covered), and 15 minutes fits exactly one focus.'
              : 'Next item in the catalogue.';
            if (ctx.weakest) {
              b.why = ctx.weakest.label + ' is the least covered skill (' + ctx.weakest.done +
                      ' of ' + ctx.weakest.total + ', ' + ctx.weakest.pct +
                      '%). A 15-minute lesson fits exactly one focus.';
            }
            b.content = LessonBuilder.contentOf(b.topic, f);
            break;

          /* ---- The catalogue-driven blocks ---- */
          case 'grammar':
          case 'structures':
          case 'vocabulary':
            var it = take(slot.id);
            b.item = it; b.topic = topicOf(it);
            b.source = slot.id;
            if (it) {
              b.title = it.title;
              var st = ctx.stats.filter(function (s) { return s.skill === slot.id; })[0];
              b.why = 'Next ' + slot.id + ' item never taught to ' + ctx.name +
                      (st ? ' — ' + st.done + ' of ' + st.total + ' covered so far' : '') +
                      (it.level ? ' · level ' + it.level : '') + '.';
              if (slot.id === 'vocabulary' && ctx.curriculumWeek) {
                b.why += ' This is also where the 52-week route points: ' +
                         ctx.curriculumWeek.theme + '.';
              }
            } else {
              b.title = 'Everything covered — revise instead';
              b.why = 'No untaught ' + slot.id + ' items left. Revise the weakest one.';
            }
            b.content = LessonBuilder.contentOf(b.topic, it);
            break;

          /* ---- Speaking ---- */
          case 'speaking':
            var sp = take('speaking');
            b.item = sp; b.topic = topicOf(sp);
            b.source = 'speaking';
            b.title = sp ? sp.title : 'Free speaking';
            b.why = sp
              ? 'Speaking activity not used with ' + ctx.name + ' yet' +
                (sp.subtitle ? ' — competence: ' + sp.subtitle : '') + '.'
              : 'All activities used. Repeat the one they enjoyed most.';
            b.content = LessonBuilder.contentOf(b.topic, sp);
            break;

          /* ---- Exercise: reuse the drills of a block already chosen ---- */
          case 'exercise':
            var host = blocks.filter(function (x) {
              return !x.recycled && x.topic && x.topic.exercises && x.topic.exercises.length;
            })[0];
            if (host) {
              b.hostId = host.id; b.topic = host.topic;
              b.title = 'Drills from "' + host.title + '"';
              b.source = host.source;
              b.why = 'Practises exactly what you just taught in the ' +
                      host.label.toLowerCase() + ' block — no new content to explain.';
              b.content = { exercises: host.topic.exercises.slice(0, 6),
                            complete: host.topic.complete || [] };
            } else {
              b.title = 'Open practice';
              b.why = 'No drill bank available for the chosen content.';
            }
            break;

          /* ---- Conversation questions ---- */
          case 'conversation':
            var qHost = blocks.filter(function (x) {
              return !x.recycled && x.topic && x.topic.questions && x.topic.questions.length;
            }).pop();
            if (qHost) {
              b.hostId = qHost.id; b.topic = qHost.topic;
              b.title = 'Questions from "' + qHost.title + '"';
              b.source = qHost.source;
              b.why = 'Pushes the new language into real conversation while it is fresh.';
              b.content = { questions: qHost.topic.questions };
            } else {
              b.title = 'General conversation';
              b.why = 'No question bank in the chosen content — talk freely.';
              b.content = { questions: [
                'What was the best part of your week?',
                'What are you looking forward to?'
              ] };
            }
            break;

          /* ---- Homework ---- */
          case 'homework':
            var hw = blocks.filter(function (x) {
              return !x.recycled && x.topic && (x.topic.complete || x.topic.exercises);
            })[0];
            b.title = hw ? 'Finish the sentences from "' + hw.title + '"' : 'Review today\'s notes';
            b.why = 'Homework repeats today\'s content, never new content — that is what makes it doable alone.';
            b.content = hw ? { complete: (hw.topic.complete || []),
                               exercises: (hw.topic.exercises || []).slice(-3) } : null;
            if (hw) { b.hostId = hw.id; b.topic = hw.topic; b.source = hw.source; }
            break;

          /* ---- Quick review ---- */
          case 'review':
            var rHost = blocks.filter(function (x) {
              return !x.recycled && x.topic && x.topic.review;
            })[0] || blocks.filter(function (x) { return x.topic && x.topic.review; })[0];
            if (rHost) {
              b.hostId = rHost.id; b.topic = rHost.topic;
              b.title = 'Review: ' + rHost.title;
              b.source = rHost.source;
              b.why = 'Closing with the key points is what makes them stick.';
              b.content = { review: rHost.topic.review };
            } else {
              b.title = 'Recap out loud';
              b.why = 'Ask the student to say three things they learned today.';
            }
            break;
        }

        blocks.push(b);
      });

      return {
        studentId: studentId,
        studentName: ctx.name,
        duration: duration,
        profile: profile.label,
        profileNote: profile.note,
        generatedAt: today(),
        /* Data sob a qual esta aula será registrada — inferida do calendário
           (F-1). Garante que Calendar e Learning Progress usem a MESMA data. */
        lessonDate: LessonBuilder.resolveLessonDate(studentId),
        context: ctx,
        blocks: blocks,
        totalMinutes: blocks.reduce(function (s, b) { return s + b.minutes; }, 0),
        /* Conteúdo NOVO da aula — nunca ensinado a este aluno antes. */
        newItemIds: blocks.filter(function (b) { return b.item && !b.recycled; })
                          .map(function (b) { return b.item.id; })
                          .filter(function (v, i, a) { return a.indexOf(v) === i; }),

        /* Tudo que a aula toca, incluindo a revisão do warm-up.
           É isto que vai para o Learning Progress: rever também é ensinar. */
        itemIds: blocks.filter(function (b) { return b.item; })
                       .map(function (b) { return b.item.id; })
                       .filter(function (v, i, a) { return a.indexOf(v) === i; })
      };
    },

    /** Normalise a topic into the pieces the lesson view renders. */
    contentOf: function (topic, item) {
      if (!topic) return item ? { note: item.subtitle || '' } : null;
      return {
        goal:      topic.goal || (topic.goals ? topic.goals.join(' · ') : ''),
        explain:   topic.explain || null,
        examples:  topic.examples || null,
        mistakes:  topic.mistakes || null,
        exercises: topic.exercises || null,
        speaking:  topic.speaking || null,
        complete:  topic.complete || null,
        questions: topic.questions || null,
        review:    topic.review || null,
        // Speaking Lab activities have a different shape
        activity:  topic.n ? { name: topic.n, comp: topic.comp, stt: topic.stt,
                               goals: topic.goals, deps: topic.deps } : null
      };
    },

    /**
     * Record the whole lesson in Learning Progress, in one call.
     * The date defaults to the plan's calendar-inferred `lessonDate` (F-1),
     * so Progress lands on the same day the Calendar uses. An explicit
     * `lessonDate` argument still wins, and today() remains the last resort.
     */
    recordLesson: function (plan, lessonDate) {
      if (!NS.Progress || !plan || !plan.itemIds.length) return false;
      var date = lessonDate || plan.lessonDate || today();
      return NS.Progress.record(plan.studentId, plan.itemIds, date);
    }
  };

  NS.LessonBuilder = LessonBuilder;

})(typeof window !== 'undefined' ? window : this);
