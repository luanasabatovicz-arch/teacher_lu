/* ==========================================================================
   Teacher Lu Practice — Bootstrap
   --------------------------------------------------------------------------
   Ponto de entrada da Practice. Não implementa nenhuma funcionalidade
   pedagógica — apenas:

     1. Verifica que TODOS os módulos compartilhados da Studio foram
        carregados (Design System + platform-*.js + engine/*.js).
     2. Publica o namespace TeacherLu.Practice como ponto de extensão.
     3. Expõe um snapshot inspecionável do estado da plataforma.

   CONVENÇÕES SEGUIDAS (per docs/AUDITORIA-STUDIO-vs-PRACTICE.md §9)
     ✓ IIFE ES5 padrão da plataforma
     ✓ Nunca lança — degradação silenciosa + console.warn
     ✓ Identity by student.id — nunca por nome
     ✓ Prefixo de storage 'sabatovicz_practice_*' para dados próprios
     ✓ Publica em window.TeacherLu, jamais em globais soltos

   NÃO CRIA
     ✗ atividades · exercícios · jogos · speaking · listening · grammar
     ✗ nenhum content próprio · nenhum registry paralelo
     ✗ nenhuma UI de aula
   ========================================================================== */

(function (global) {
  'use strict';

  var NS = global.TeacherLu = global.TeacherLu || {};

  /* --------------------------------------------------------------
     1. Chaves de storage da Practice — todas com prefixo canônico.
     -------------------------------------------------------------- */
  var STORAGE_KEYS = {
    settings: 'sabatovicz_practice_settings',
    /* Reservados para módulos futuros — declarados agora para
       oficializar a nomenclatura e evitar colisões. */
    sessions:  'sabatovicz_practice_sessions',    // registros de prática
    streaks:   'sabatovicz_practice_streaks',     // sequência diária
    prefs:     'sabatovicz_practice_prefs'        // preferências do aluno
  };

  /* --------------------------------------------------------------
     2. Health-check dos módulos compartilhados.
        Cada entrada retorna { ok, detail } — nunca lança.
     -------------------------------------------------------------- */
  var CHECKS = [
    {
      id: 'design-system',
      label: 'Design System',
      icon: 'palette',
      check: function () {
        try {
          var probe = document.createElement('div');
          probe.style.display = 'none';
          document.body.appendChild(probe);
          var color = getComputedStyle(probe).getPropertyValue('--tl-primary').trim();
          document.body.removeChild(probe);
          if (color) {
            return { ok: true, detail: 'token --tl-primary resolvido: ' + color };
          }
          return { ok: false, detail: 'variáveis --tl-* não presentes (design-system/theme.css não linkado?)' };
        } catch (e) { return { ok: false, detail: 'erro ao inspecionar tokens: ' + e.message }; }
      }
    },
    {
      id: 'icons',
      label: 'Lucide Icons',
      icon: 'sparkles',
      check: function () {
        var loaded = !!(global.lucide && typeof global.lucide.createIcons === 'function');
        return loaded
          ? { ok: true, detail: 'lucide carregado via design-system/icons.js' }
          : { ok: true, detail: 'lucide carrega assíncronamente — verifique após 1s' };
        /* icons.js usa MutationObserver — ok ficar defer neste probe. */
      }
    },
    {
      id: 'students',
      label: 'Student Store',
      icon: 'users',
      check: function () {
        if (!NS.Students) return { ok: false, detail: 'TeacherLu.Students indisponível — platform-students.js não carregado' };
        var list = safe(function () { return NS.Students.load(); }, []);
        return {
          ok: true,
          detail: list.length + ' aluno(s) carregado(s) · versão ' + (NS.Students.VERSION || '?')
        };
      }
    },
    {
      id: 'calendar',
      label: 'Calendar',
      icon: 'calendar',
      check: function () {
        if (!NS.Calendar) return { ok: false, detail: 'TeacherLu.Calendar indisponível' };
        var avail = safe(function () { return NS.Calendar.isAvailable(); }, false);
        return {
          ok: true,
          detail: 'versão ' + (NS.Calendar.VERSION || '?') +
                  ' · ' + (avail ? 'com registros' : 'sem registros ainda')
        };
      }
    },
    {
      id: 'progress',
      label: 'Progress Engine',
      icon: 'trending-up',
      check: function () {
        if (!NS.Progress) return { ok: false, detail: 'TeacherLu.Progress indisponível' };
        return {
          ok: true,
          detail: 'versão ' + (NS.Progress.VERSION || '?') +
                  ' · pronto para leitura e escrita'
        };
      }
    },
    {
      id: 'content',
      label: 'Content Registry',
      icon: 'library',
      check: function () {
        if (!NS.Content) return { ok: false, detail: 'TeacherLu.Content indisponível' };
        var total = safe(function () { return NS.Content.count(); }, 0);
        var skills = NS.Content.SKILLS ? NS.Content.SKILLS.length : 0;
        var providers = safe(function () { return NS.Content.registered().length; }, 0);
        return {
          ok: total > 0,
          detail: total + ' itens · ' + skills + ' skills · ' + providers + ' providers registrados'
        };
      }
    },
    {
      id: 'competencies',
      label: 'Competencies Map',
      icon: 'award',
      check: function () {
        if (!NS.Competencies) return { ok: false, detail: 'TeacherLu.Competencies indisponível' };
        var count = 0;
        try { count = Object.keys(NS.Competencies.BY_KEY || {}).length; } catch (e) {}
        return {
          ok: count > 0,
          detail: count + ' conteúdos mapeados para competências'
        };
      }
    },
    {
      id: 'curriculum',
      label: 'Curriculum Map',
      icon: 'map',
      check: function () {
        var weeks = global.CURRICULUM_WEEKS;
        if (!weeks || !weeks.length) {
          return { ok: false, detail: 'CURRICULUM_WEEKS não carregado (engine/curriculum-map.js ausente)' };
        }
        return {
          ok: true,
          detail: weeks.length + ' semanas planejadas'
        };
      }
    },
    {
      id: 'report-engine',
      label: 'Report Engine',
      icon: 'file-text',
      check: function () {
        if (!NS.ReportEngine) return { ok: false, detail: 'TeacherLu.ReportEngine indisponível' };
        return {
          ok: true,
          detail: 'versão ' + (NS.ReportEngine.VERSION || '?') +
                  ' · aceita seções extras via registerSection()'
        };
      }
    },
    {
      id: 'lesson-builder',
      label: 'Lesson Builder',
      icon: 'notebook-pen',
      check: function () {
        if (!NS.LessonBuilder) return {
          ok: false,
          detail: 'TeacherLu.LessonBuilder indisponível — só necessário se Practice quiser gerar planos'
        };
        return {
          ok: true,
          detail: 'versão ' + (NS.LessonBuilder.VERSION || '?')
        };
      }
    }
  ];

  function safe(fn, fb) { try { return fn(); } catch (e) { return fb; } }

  /* --------------------------------------------------------------
     3. Run all checks. Deliberadamente síncrono — cada check deve
        ser rápido (< 1ms). Retorna um objeto inspecionável.
     -------------------------------------------------------------- */
  function runChecks() {
    var results = [];
    var okCount = 0, failCount = 0;
    for (var i = 0; i < CHECKS.length; i++) {
      var c = CHECKS[i];
      var r = safe(c.check, { ok: false, detail: 'check falhou silenciosamente' });
      results.push({
        id: c.id,
        label: c.label,
        icon: c.icon,
        ok: !!r.ok,
        detail: r.detail || ''
      });
      if (r.ok) okCount++; else failCount++;
    }
    return {
      total: results.length,
      passing: okCount,
      failing: failCount,
      allGreen: failCount === 0,
      results: results
    };
  }

  /* --------------------------------------------------------------
     4. Namespace público da Practice.
        Módulos futuros vão pendurar aqui: TeacherLu.Practice.Sessions,
        .Streaks, .Sessions etc. — nunca em globais soltos.
     -------------------------------------------------------------- */
  var Practice = {
    VERSION: '0.1.0',
    STAGE: 'phase-1-bootstrap',
    STORAGE_KEYS: STORAGE_KEYS,

    /** Snapshot do estado dos módulos compartilhados. */
    healthCheck: runChecks,

    /**
     * True somente se TODOS os módulos essenciais estão presentes.
     * Módulos essenciais para F1 = design-system, students, content,
     * progress, competencies, curriculum.
     */
    isReady: function () {
      var essentials = ['design-system','students','content','progress','competencies','curriculum'];
      var report = runChecks();
      for (var i = 0; i < report.results.length; i++) {
        var r = report.results[i];
        if (essentials.indexOf(r.id) !== -1 && !r.ok) return false;
      }
      return true;
    },

    /**
     * Ponto de extensão futuro: módulos da Practice se registram aqui.
     * Ex: TeacherLu.Practice.registerModule({
     *       id:'flashcards', label:'Flashcards', icon:'layers',
     *       route:'flashcards.html'
     *     });
     * Nada é implementado ainda — só o contrato.
     */
    modules: [],
    registerModule: function (mod) {
      if (!mod || !mod.id) {
        console.warn('[practice] módulo precisa de id');
        return Practice;
      }
      Practice.modules = Practice.modules.filter(function (m) { return m.id !== mod.id; });
      Practice.modules.push(mod);
      return Practice;
    }
  };

  NS.Practice = Practice;

})(typeof window !== 'undefined' ? window : this);
