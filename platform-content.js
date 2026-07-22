/* ==========================================================================
   Teacher Lu Platform — Content Registry (Learning Progress catalogue)
   --------------------------------------------------------------------------
   One place that answers: "what can a student learn on this platform?"

   WHY THIS FILE EXISTS
   --------------------
   Content lives in the modules that own it: grammar topics in the Grammar
   Engine, activities in the Speaking Lab, vocabulary in the Conversation
   Lessons. Nothing is copied here. This registry only *collects* what the
   modules publish and hands it over as one deduplicated catalogue.

   ADDING A NEW MODULE LATER — no file below this line needs to change:

     TeacherLu.Content.register({
       id: 'reading',                 // unique provider id
       skill: 'reading',              // one of Content.SKILLS
       label: 'Reading Lab',
       load: function () {            // return an array of raw items
         return window.READING_TEXTS || [];
       },
       map: function (raw, i) {       // shape one item
         return { key: raw.id, title: raw.title, level: raw.level, order: i };
       }
     });

   Two ways a module can feed the registry:
     1. LIVE  — the module's data file is loaded on the current page and the
                provider reads its global (grammar, speaking).
     2. PUBLISHED — catalogos gravados em localStorage por versoes
                anteriores. Continuam sendo lidos por published(), mas
                nenhum modulo publica mais: todo conteudo vive em engine/*.js.

   CONTRACT
   --------
   • Never throws: a broken provider is skipped with a console warning.
   • Deduplicates by item id, so the same content never appears twice.
   • Stable ids: '<skill>:<key>' — safe to store in a student's history.
   ========================================================================== */

(function (global) {
  'use strict';

  var NS = global.TeacherLu = global.TeacherLu || {};

  /* ----------------------------------------------------------------------
     The six skills of Learning Progress.
     Order here is the order shown in every interface.
     ---------------------------------------------------------------------- */
  var SKILLS = [
    { id: 'vocabulary', label: 'Vocabulary', icon: '🗂', color: '#7c3aed' },
    { id: 'grammar',    label: 'Grammar',    icon: '📐', color: '#166581' },
    { id: 'structures', label: 'Structures', icon: '🧩', color: '#0284c7' },
    { id: 'speaking',   label: 'Speaking',   icon: '💬', color: '#db2777' },
    { id: 'reading',    label: 'Reading',    icon: '📖', color: '#0d9488' },
    { id: 'writing',    label: 'Writing',    icon: '✍️', color: '#b45309' },
    { id: 'listening',  label: 'Listening',  icon: '🎧', color: '#4E3768' }
  ];

  var PUBLISH_PREFIX = 'sabatovicz_catalog_';

  var providers = [];

  /* ----------------------------------------------------------------------
     Internals
     ---------------------------------------------------------------------- */

  function safe(fn, fallback, label) {
    try { return fn(); }
    catch (e) {
      console.warn('[content-registry] provider "' + label + '" failed', e);
      return fallback;
    }
  }

  /** Normalise one item coming from a provider. */
  function shape(skill, source, raw, index) {
    if (!raw) return null;
    var key = String(raw.key == null ? index : raw.key);
    var title = String(raw.title || '').trim();
    if (!title) return null;
    return {
      id: skill + ':' + key,
      key: key,
      skill: skill,
      title: title,
      subtitle: raw.subtitle ? String(raw.subtitle) : '',
      level: raw.level ? String(raw.level) : '',
      order: typeof raw.order === 'number' ? raw.order : index,
      source: source
    };
  }

  /* ----------------------------------------------------------------------
     Public API
     ---------------------------------------------------------------------- */

  var Content = {

    VERSION: '1.0.0',
    SKILLS: SKILLS,

    /** Register a content provider. Later modules call this and nothing else. */
    register: function (provider) {
      if (!provider || !provider.id || !provider.skill) {
        console.warn('[content-registry] a provider needs at least id and skill');
        return Content;
      }
      // Re-registering the same id replaces it, so a page can never double up.
      providers = providers.filter(function (p) { return p.id !== provider.id; });
      providers.push(provider);
      return Content;
    },

    registered: function () {
      return providers.map(function (p) {
        return { id: p.id, skill: p.skill, label: p.label || p.id };
      });
    },


    /** Every published catalogue found in storage, grouped by skill. */
    published: function (skill) {
      var out = [];
      try {
        for (var i = 0; i < localStorage.length; i++) {
          var k = localStorage.key(i);
          if (!k || k.indexOf(PUBLISH_PREFIX) !== 0) continue;
          var payload = JSON.parse(localStorage.getItem(k));
          if (!payload || !Array.isArray(payload.items)) continue;
          if (skill && payload.skill !== skill) continue;
          out.push(payload);
        }
      } catch (e) {
        console.warn('[content-registry] could not read published catalogues', e);
      }
      return out;
    },

    /**
     * The catalogue for one skill: live providers + published catalogues,
     * deduplicated by id and sorted.
     */
    items: function (skillId) {
      var seen = {};
      var out = [];

      function push(item) {
        if (!item || seen[item.id]) return;
        seen[item.id] = true;
        out.push(item);
      }

      // 1. Live providers
      providers
        .filter(function (p) { return p.skill === skillId; })
        .forEach(function (p) {
          var raws = safe(function () { return p.load ? p.load() : []; }, [], p.id) || [];
          raws.forEach(function (raw, i) {
            var mapped = safe(function () {
              return p.map ? p.map(raw, i) : raw;
            }, null, p.id);
            push(shape(skillId, p.id, mapped, i));
          });
        });

      // 2. Published catalogues
      Content.published(skillId).forEach(function (payload) {
        payload.items.forEach(function (raw, i) {
          push(shape(skillId, payload.source, raw, i));
        });
      });

      return out.sort(function (a, b) {
        return a.order - b.order || (a.title < b.title ? -1 : 1);
      });
    },

    /** The whole catalogue: [{ skill, label, icon, color, items }]. */
    all: function () {
      return SKILLS.map(function (s) {
        return {
          skill: s.id, label: s.label, icon: s.icon, color: s.color,
          items: Content.items(s.id)
        };
      });
    },

    /** Look one item up by its stable id — used to render history entries. */
    byId: function (itemId) {
      if (!itemId) return null;
      var skill = String(itemId).split(':')[0];
      var list = Content.items(skill);
      for (var i = 0; i < list.length; i++) {
        if (list[i].id === itemId) return list[i];
      }
      return null;
    },

    skill: function (skillId) {
      for (var i = 0; i < SKILLS.length; i++) {
        if (SKILLS[i].id === skillId) return SKILLS[i];
      }
      return null;
    },

    /** Total number of items across every skill. */
    count: function () {
      return SKILLS.reduce(function (n, s) { return n + Content.items(s.id).length; }, 0);
    }
  };

  NS.Content = Content;

  /* ----------------------------------------------------------------------
     Registros que chegaram ANTES deste arquivo.
     Um arquivo de conteúdo carregado primeiro empilha em __pendingProviders
     em vez de falhar em silêncio. Assim a ordem dos <script> deixa de
     importar — qualquer página monta o catálogo completo.
     ---------------------------------------------------------------------- */
  if (Array.isArray(NS.__pendingProviders)) {
    NS.__pendingProviders.forEach(function (p) { Content.register(p); });
    NS.__pendingProviders = [];
  }

  /* ======================================================================
     BUILT-IN PROVIDERS
     Each one reads a module's own data. If that module's file is not loaded
     on the current page, load() returns [] and the skill simply shows up
     empty — nothing breaks.
     ====================================================================== */

  /* ---- Grammar ← engine/grammar-topics.js (window.ENGINE_TOPICS) ------- */
  Content.register({
    id: 'grammar-engine',
    skill: 'grammar',
    label: 'Grammar Engine',
    load: function () {
      var topics = global.ENGINE_TOPICS;
      if (!topics) return [];
      return Object.keys(topics).map(function (k) { return topics[k]; });
    },
    map: function (t, i) {
      return {
        key: t.id || ('topic-' + i),
        title: t.name || t.short || t.id,
        subtitle: t.family || '',
        level: t.level || '',
        order: i
      };
    }
  });

  /* ---- Speaking ← engine/speaking-activities.js ------------------------ */
  Content.register({
    id: 'speaking-lab',
    skill: 'speaking',
    label: 'Speaking Lab',
    load: function () {
      return global.SPEAKING_ACTIVITIES || [];
    },
    map: function (a, i) {
      return {
        key: a.id || ('activity-' + i),
        title: a.n || a.name || a.id,
        subtitle: a.comp || '',
        level: a.lo ? ('levels ' + a.lo + '–' + a.hi) : '',
        order: i
      };
    }
  });

  /* ---- Vocabulary ← engine/conversation-lessons.js --------------------
     Aquele arquivo se auto-registra, igual a Grammar e Structures.
     Content.published() continua funcionando como fallback para dados
     publicados por versões anteriores.
     -------------------------------------------------------------------- */

  /* ---- Reading / Writing / Listening ----------------------------------
     No module owns these yet. They appear in Learning Progress as empty,
     ready-to-fill skills. The teacher can add items by hand, and the day a
     Reading module exists it just calls Content.register(...) — no file
     here or in the Curriculum Map needs to change.
     -------------------------------------------------------------------- */

})(typeof window !== 'undefined' ? window : this);
