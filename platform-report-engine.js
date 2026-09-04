/* ==========================================================================
   Teacher Lu Platform — Monthly Learning Report Engine
   --------------------------------------------------------------------------
   Motor pluggable que produz o modelo do relatório pedagógico mensal do
   aluno. Sem DOM, sem side-effects — pura função de estado persistido.

   USO
   ---
     var model = TeacherLu.ReportEngine.buildModel('maria', '2026-07');
     // → objeto pronto para renderizar em HTML/PDF

   ARQUITETURA
   -----------
   1. SECTIONS — cada seção do relatório é um "coletor" registrável.
      Adicionar uma seção não altera o motor: registrar e pronto.

        TeacherLu.ReportEngine.registerSection({
          id: 'reading',
          order: 15,
          collect: function (ctx) { return { count: 3, ... } }
        });

      Ordem determina posição no PDF. Se `collect` retornar null/undefined,
      a seção é omitida.

   2. GENERATORS — os textos gerados (resumo do mês, competências, dicas)
      são pontos de extensão substituíveis. Hoje: regras determinísticas.
      Amanhã: IA. A assinatura é a mesma:

        TeacherLu.ReportEngine.generators.summary = async function (model) {
          return await callLLM(model);   // string
        };

      Cada generator recebe o `model` construído até aquele ponto e
      retorna string ou array (conforme documentado abaixo).

   3. MODEL — objeto plano e serializável. Não contém referências ao DOM.
      Pode ser gravado em localStorage, enviado por rede, cacheado.

   4. NUNCA LANÇA — módulos que falham geram seção vazia + console.warn.

   DEPENDÊNCIAS
   ------------
     TeacherLu.Students     obrigatório
     TeacherLu.Calendar     obrigatório
     TeacherLu.Progress     opcional (sem ele, seção conteúdos fica vazia)
     TeacherLu.Content      opcional (sem ele, títulos ficam como ids)
     TeacherLu.Competencies opcional (sem ele, "O que aprendeu" fica genérico)
     CURRICULUM_WEEKS (glob)opcional (sem ele, "Próximos conteúdos" some)

   PREPARADO PARA IA
   -----------------
   Toda geração de TEXTO passa por ReportEngine.generators.*. Substituir
   uma função por uma chamada async a um LLM é a única mudança necessária
   quando a IA chegar. `buildModel()` já é async-friendly (mas hoje síncrona).
   ========================================================================== */

(function (global) {
  'use strict';

  var NS = global.TeacherLu = global.TeacherLu || {};

  /* ------------------------------------------------------------------
     Helpers
     ------------------------------------------------------------------ */
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function iso(y, m, d) { return y + '-' + pad(m + 1) + '-' + pad(d); }
  function todayISO() { var d = new Date(); return iso(d.getFullYear(), d.getMonth(), d.getDate()); }
  function safe(fn, fb) { try { return fn(); } catch (e) { return fb; } }
  function unique(arr) {
    var seen = {}, out = [];
    for (var i = 0; i < arr.length; i++) {
      var k = arr[i]; if (k == null) continue;
      var s = typeof k === 'string' ? k.toLowerCase() : String(k);
      if (seen[s]) continue;
      seen[s] = true;
      out.push(arr[i]);
    }
    return out;
  }
  var MONTH_PT = ['janeiro','fevereiro','março','abril','maio','junho',
                  'julho','agosto','setembro','outubro','novembro','dezembro'];
  var WEEKDAY_PT = ['Domingo','Segunda-feira','Terça-feira','Quarta-feira',
                    'Quinta-feira','Sexta-feira','Sábado'];
  function monthLabel(ym) {
    var p = ym.split('-'); var m = parseInt(p[1], 10) - 1; var y = parseInt(p[0], 10);
    return MONTH_PT[m] + ' de ' + y;
  }
  function weekdayOf(dateISO) {
    var d = new Date(dateISO + 'T12:00:00');
    return WEEKDAY_PT[d.getDay()];
  }
  function daysInMonth(ym) {
    var p = ym.split('-'); return new Date(parseInt(p[0],10), parseInt(p[1],10), 0).getDate();
  }
  function firstOfMonth(ym) { return ym + '-01'; }
  function lastOfMonth(ym)  { return ym + '-' + pad(daysInMonth(ym)); }
  function weeksInMonth(ym) {
    // Aproximação: (número de segundas-feiras + 1)/1. Bom o suficiente para
    // computar "aulas previstas" para alunos com aula 1x/semana.
    var p = ym.split('-'); var y = parseInt(p[0],10), m = parseInt(p[1],10)-1;
    var d = new Date(y, m, 1); var count = 0;
    while (d.getMonth() === m) {
      if (d.getDay() === 1) count++;      // segunda
      d.setDate(d.getDate() + 1);
    }
    return count || 4;
  }

  /* ------------------------------------------------------------------
     Section registry — pluggable.
     ------------------------------------------------------------------ */
  var sections = [];
  function registerSection(section) {
    if (!section || !section.id || typeof section.collect !== 'function') {
      console.warn('[report-engine] section needs id + collect(ctx)');
      return;
    }
    sections = sections.filter(function (s) { return s.id !== section.id; });
    sections.push(section);
    sections.sort(function (a, b) {
      return (a.order == null ? 999 : a.order) - (b.order == null ? 999 : b.order);
    });
  }

  /* ------------------------------------------------------------------
     Text generators (rule-based; substituíveis por IA depois).
     ------------------------------------------------------------------ */
  var generators = {

    /* Resumo curto do mês em uma frase. */
    summary: function (model) {
      var n = model.cover.totalSessions;
      if (n === 0) return 'Este mês ficou sem aulas registradas. Vamos retomar no próximo!';
      var themes = model.themes.slice(0, 3);
      var themeText = '';
      if (themes.length === 3)      themeText = themes[0] + ', ' + themes[1] + ' e ' + themes[2];
      else if (themes.length === 2) themeText = themes[0] + ' e ' + themes[1];
      else if (themes.length === 1) themeText = themes[0];

      var pieces = [];
      pieces.push('Este mês você participou de ' + n + (n === 1 ? ' aula' : ' aulas'));
      if (themeText) {
        pieces.push(', desenvolvendo principalmente ' + themeText + '.');
      } else {
        pieces.push('.');
      }
      if (model.attendance.pct >= 90) {
        pieces.push(' Sua presença foi excelente (' + model.attendance.pct + '%), mantendo o ritmo do curso.');
      } else if (model.attendance.pct >= 70) {
        pieces.push(' Sua presença foi boa (' + model.attendance.pct + '%).');
      } else if (n > 0) {
        pieces.push(' Alguns dias faltaram (' + model.attendance.pct + '% de presença) — vamos ajustar juntos.');
      }
      return pieces.join('');
    },

    /* Lista de "Agora você consegue..." — deduplica competências vindas de
       todos os conteúdos estudados no mês. */
    learnedThings: function (model) {
      var all = [];
      Object.keys(model.competencies).forEach(function (itemId) {
        model.competencies[itemId].forEach(function (phrase) { all.push(phrase); });
      });
      return unique(all).slice(0, 12);
    },

    /* Sugestão de categoria para uma palavra de vocabulário — placeholder
       antes da IA. Vem por skill/subtitle do item. */
    vocabularyCategory: function (word, item) {
      if (item && item.subtitle) return item.subtitle;
      if (item && item.level)    return 'nível ' + item.level;
      return 'geral';
    },

    /* Recomendações padrão — genéricas, o teacher edita à mão. */
    recommendations: function (model) {
      var recs = [];
      if (model.themes.length) {
        recs.push('Continue revisando ' + model.themes[0] + ' em situações do dia a dia.');
      }
      if (model.cover.totalHours > 0) {
        recs.push('Pratique 5 minutos de speaking por dia — pode ser em voz alta com você mesma(o).');
      }
      recs.push('Assista vídeos curtos em inglês sobre temas que você gosta (com legenda em inglês).');
      return recs;
    }
  };

  /* ==================================================================
     COLLECTORS PADRÃO — registrados abaixo no boot
     ================================================================== */

  /* --- 3. Aulas realizadas ---------------------------------------- */
  function collectLessons(ctx) {
    var Cal = NS.Calendar; if (!Cal) return { rows: [] };
    var lessons = Cal.lessons({ student: ctx.studentId, month: ctx.month });

    // O relatório vai para o ALUNO. Um conteúdo registrado no Progress que
    // saiu do catálogo — externo removido, módulo ausente, registro antigo —
    // caía aqui como id cru ('grammar:custom-mf3k2a') no meio das aulas.
    // titleResolver() é a mesma resolução usada pelo Perfil e pelo Calendar,
    // com o catálogo indexado uma vez para o mês inteiro.
    var titleOf = (ctx.Progress && ctx.Progress.titleResolver)
      ? ctx.Progress.titleResolver()
      : function (id) {
          var it = ctx.Content ? ctx.Content.byId(id) : null;
          return (it && it.title) ? it.title : 'Previously recorded content';
        };

    var rows = lessons.map(function (l) {
      var contentIds = ctx.Progress ? ctx.Progress.ofLesson(ctx.studentId, l.date) : [];
      var contentTitles = contentIds.map(titleOf);
      var homework = '';
      if (l.sessions) {
        homework = l.sessions.map(function (s) { return s.homework; }).filter(Boolean).join(' · ');
      }
      var noteJoined = l.note || '';
      if (l.sessions) {
        var sessionNotes = l.sessions.map(function (s, i) {
          return s.note ? ('Aula ' + (i+1) + ': ' + s.note) : '';
        }).filter(Boolean).join(' · ');
        if (sessionNotes) noteJoined = noteJoined ? (noteJoined + ' · ' + sessionNotes) : sessionNotes;
      }
      return {
        date: l.date,
        dayOfWeek: weekdayOf(l.date),
        contents: contentTitles,
        status: l.status,
        // Quantas SESSÕES concluídas esta linha vale. É o mesmo helper que
        // alimenta o resumo — por isso tabela e resumo nunca divergem.
        completed: Cal.completedLessonCount(l),
        administrative: !!l.administrative,
        homework: homework,
        note: noteJoined,
        sessions: l.sessions || null
      };
    });

    /* `count` NÃO é rows.length. Uma linha cancelada, agendada ou puramente
       administrativa aparece na tabela e vale zero; um dia com aula dupla
       aparece numa linha só e vale dois. */
    var official = Cal.completedLessonsForMonth(ctx.studentId, ctx.month);
    return { rows: rows, count: official.count, occurrences: official.occurrences };
  }

  /* --- 4. Conteúdos estudados ------------------------------------- */
  function collectContents(ctx) {
    if (!ctx.Content) return { bySkill: {}, allIds: [] };
    // Reúne todos os itemIds cobertos em qualquer aula do mês.
    var allIds = [];
    ctx.lessonsInMonth.forEach(function (l) {
      if (!ctx.Progress) return;
      ctx.Progress.ofLesson(ctx.studentId, l.date).forEach(function (id) { allIds.push(id); });
    });
    allIds = unique(allIds);
    // Agrupa por skill
    var bySkill = {};
    ctx.Content.SKILLS.forEach(function (s) { bySkill[s.id] = []; });
    allIds.forEach(function (id) {
      var it = ctx.Content.byId(id);
      if (!it) return;
      if (!bySkill[it.skill]) bySkill[it.skill] = [];
      bySkill[it.skill].push(it);
    });
    // Ordena cada bucket por título
    Object.keys(bySkill).forEach(function (k) {
      bySkill[k].sort(function (a, b) { return (a.title < b.title ? -1 : 1); });
    });
    return { bySkill: bySkill, allIds: allIds };
  }

  /* --- 5. Competências (map por item) ----------------------------- */
  function collectCompetencies(ctx) {
    var out = {};
    var themes = [];
    if (!NS.Competencies) return { byItem: out, themes: [] };

    // Competência é uma AFIRMAÇÃO sobre o aluno ("você consegue ler textos
    // curtos nesse tema"). Quando nem o título do conteúdo é recuperável, a
    // frase cairia para o nível da skill e o relatório afirmaria algo sobre
    // um conteúdo que ninguém consegue identificar. Melhor não afirmar:
    // a aula continua listada na seção de aulas, com título neutro.
    var P = ctx.Progress;
    var titleOf = (P && P.titleResolver) ? P.titleResolver() : null;
    var NEUTRAL = (P && P.NEUTRAL_TITLE) || 'Previously recorded content';

    ctx.allItemIds.forEach(function (id) {
      var it = ctx.Content ? ctx.Content.byId(id) : null;
      if (!it && titleOf && titleOf(id) === NEUTRAL) return;   // não identificável
      var comps = NS.Competencies.of(id, it);
      if (comps.length) out[id] = comps;
      var theme = NS.Competencies.themeOf(id, it);
      if (theme) themes.push(theme);
    });
    return { byItem: out, themes: unique(themes) };
  }

  /* --- 7. Vocabulário --------------------------------------------- */
  function collectVocabulary(ctx) {
    var Content = ctx.Content; if (!Content) return { total: 0, byCategory: {} };
    var vocabItems = (ctx.contentsBySkill.vocabulary || []);
    var byCat = {};
    vocabItems.forEach(function (it) {
      var cat = generators.vocabularyCategory(it.title, it) || 'geral';
      if (!byCat[cat]) byCat[cat] = [];
      byCat[cat].push(it.title);
    });
    // Dedup por categoria
    Object.keys(byCat).forEach(function (k) { byCat[k] = unique(byCat[k]); });
    return { total: vocabItems.length, byCategory: byCat };
  }

  /* --- 8. Estruturas gramaticais (linguagem amigável) ------------- */
  function collectStructures(ctx) {
    var items = (ctx.contentsBySkill.grammar || []).concat(ctx.contentsBySkill.structures || []);
    if (!items.length) return { practiced: [] };
    // Amigo: agrupar por padrões comuns
    var practiced = [];
    var titles = items.map(function (it) { return String(it.title||'').toLowerCase(); }).join(' | ');
    if (/affirm|afirma/.test(titles)) practiced.push('frases afirmativas');
    if (/negati/.test(titles))        practiced.push('frases negativas');
    if (/question|pergunta/.test(titles)) practiced.push('perguntas');
    if (/short answer|resposta curta/.test(titles)) practiced.push('respostas curtas');
    if (/compar/.test(titles))        practiced.push('comparações');
    if (/preposit/.test(titles))      practiced.push('preposições');
    // Se nada foi detectado por padrão, listar títulos como fallback
    if (!practiced.length) practiced = items.map(function (it) { return it.title; }).slice(0, 5);
    return { practiced: practiced, itemTitles: items.map(function (i) { return i.title; }) };
  }

  /* --- 9. Speaking ------------------------------------------------ */
  function collectSpeaking(ctx) {
    var items = ctx.contentsBySkill.speaking || [];
    return {
      activities: items.map(function (i) { return i.title; }),
      count: items.length,
      themes: unique(items.map(function (i) { return i.subtitle || ''; }).filter(Boolean))
    };
  }

  /* --- 10. Homework ---------------------------------------------- */
  function collectHomework(ctx) {
    var hw = [];
    ctx.lessonsInMonth.forEach(function (l) {
      if (l.sessions) {
        l.sessions.forEach(function (s, i) {
          if (s.homework) hw.push({ date: l.date, description: s.homework, source: 'aula ' + (i+1), status: s.status });
        });
      }
      // Legado: alguns records podem ter homework como parte do note
    });
    return { items: hw };
  }

  /* --- 11. Frequência -------------------------------------------- */
  function collectAttendance(ctx) {
    var lessons = ctx.lessonsInMonth;
    var Cal = NS.Calendar;

    /* AULAS DADAS vem de UMA função só — Calendar.completedLessonsForMonth().
       Antes existiam três números no mesmo modelo (linhas da tabela, dias com
       status done, sessões concluídas) e a tela mostrava dois deles lado a
       lado, com valores diferentes. Agora há um número, e a tabela deriva
       dele. */
    var official = Cal
      ? Cal.completedLessonsForMonth(ctx.studentId, ctx.month)
      : { count: 0, occurrences: [] };
    var done = official.count;
    var sessionsDone = done;          // mantido por compatibilidade: mesmo valor

    var scheduled = 0, cancelled = 0, administrative = 0;
    lessons.forEach(function (l) {
      if (l.status === 'scheduled') scheduled++;
      if (l.status === 'cancelled') cancelled++;
      if (l.administrative)         administrative++;
    });
    // Aulas previstas: heurística — para aluno com startTime configurado,
    // assume 1 aula por semana (ou 2 sessões/semana para double). Se sem
    // startTime, usa max(done+scheduled+cancelled, weeksInMonth).
    var sc = ctx.Students.scheduleOf(ctx.studentId);
    var wks = weeksInMonth(ctx.month);
    var planned;
    if (sc.startTime) {
      planned = wks;   // uma "aula" por semana (o dia); a duplicação vem em sessões
    } else {
      planned = Math.max(done + scheduled + cancelled, wks);
    }
    var missed = Math.max(0, planned - (done + cancelled + scheduled));
    var pct = planned ? Math.round((done / Math.max(planned, done+cancelled+scheduled)) * 100) : 0;
    return {
      administrative: administrative,
      planned: planned,
      done: done,
      scheduled: scheduled,
      cancelled: cancelled,
      missed: missed,
      sessionsDone: sessionsDone,
      pct: pct
    };
  }

  /* --- 15. Evolução (indicadores 0-100) -------------------------- */
  function collectProgressIndicators(ctx) {
    var out = { speaking:0, listening:0, grammar:0, vocabulary:0, pronunciation:0, reading:0, writing:0 };
    if (!ctx.Progress || !ctx.Content) return out;
    var stats = ctx.Progress.stats(ctx.studentId);
    stats.forEach(function (s) {
      if (out.hasOwnProperty(s.skill)) out[s.skill] = s.pct;
    });
    // Pronunciation não existe como skill hoje — deriva de speaking/listening.
    out.pronunciation = Math.round((out.speaking + out.listening) / 2);
    return out;
  }

  /* --- 16. Próximos conteúdos ------------------------------------ */
  function collectNextContents(ctx) {
    var cur = global.CURRICULUM_WEEKS;
    if (!cur || !cur.length || !ctx.Progress) return { hasPlan: false, items: [] };
    var covered = ctx.Progress.of(ctx.studentId).items || {};
    var upcoming = [];
    for (var i = 0; i < cur.length && upcoming.length < 4; i++) {
      var w = cur[i];
      if (!covered['vocabulary:w' + w.week]) {
        upcoming.push({ week: w.week, theme: w.theme, stage: w.stage || '' });
      }
    }
    return { hasPlan: upcoming.length > 0, items: upcoming };
  }

  /* --- 1. Cover — computado a partir de attendance ---------------- */
  function collectCover(ctx) {
    var att = ctx.attendance || {};
    var sc = ctx.Students.scheduleOf(ctx.studentId);
    var sessDone = att.sessionsDone || att.done || 0;
    var totalMinutes = sessDone * (sc.duration || 50);
    var totalHours = Math.round(totalMinutes / 6) / 10;   // 1 casa decimal
    return {
      studentName: ctx.Students.nameOf(ctx.studentId),
      monthLabel: monthLabel(ctx.month),
      totalLessons: att.done || 0,
      totalSessions: sessDone,
      totalHours: totalHours,
      brandName: 'Teacher Lu Studio'
    };
  }

  /* ==================================================================
     PUBLIC API
     ================================================================== */
  var ReportEngine = {

    VERSION: '1.0.0',
    generators: generators,
    registerSection: registerSection,

    /**
     * Constrói o Model completo do relatório.
     * A ordem interna prepara ctx incrementalmente para que cada seção
     * receba os dados que as anteriores já colheram.
     */
    buildModel: function (studentId, month, overrides) {
      if (!studentId || !month) return null;

      var ctx = {
        studentId: studentId,
        month: month,
        from: firstOfMonth(month),
        to: lastOfMonth(month),
        generatedAt: todayISO(),
        Students: NS.Students,
        Calendar: NS.Calendar,
        Progress: NS.Progress,
        Content: NS.Content,
        Competencies: NS.Competencies
      };

      var stu = ctx.Students ? ctx.Students.byId(studentId) : null;

      // Preparação (dependência) — collectors abaixo consomem estes
      ctx.lessonsInMonth = ctx.Calendar
        ? safe(function () { return ctx.Calendar.lessons({ student: studentId, month: month }); }, [])
        : [];

      // Rodada 1: coletores diretos
      var lessonsResult = collectLessons(ctx);
      var contentsResult = collectContents(ctx);
      ctx.contentsBySkill = contentsResult.bySkill;
      ctx.allItemIds = contentsResult.allIds;
      var competenciesResult = collectCompetencies(ctx);
      var vocabularyResult = collectVocabulary(ctx);
      var structuresResult = collectStructures(ctx);
      var speakingResult = collectSpeaking(ctx);
      var homeworkResult = collectHomework(ctx);
      var attendanceResult = collectAttendance(ctx);
      var indicatorsResult = collectProgressIndicators(ctx);
      var nextResult = collectNextContents(ctx);
      ctx.attendance = attendanceResult;
      var coverResult = collectCover(ctx);

      var model = {
        _version: 1,
        student: {
          id: studentId,
          name: ctx.Students ? ctx.Students.nameOf(studentId) : studentId,
          emoji: stu && stu.emoji || '🙂',
          level: stu && stu.level || '',
          age: stu && stu.age || '',
          schedule: ctx.Students ? ctx.Students.scheduleOf(studentId) : null
        },
        period: {
          month: month,
          monthLabel: monthLabel(month),
          year: month.split('-')[0],
          from: ctx.from,
          to: ctx.to
        },
        generatedAt: ctx.generatedAt,
        cover: coverResult,
        themes: competenciesResult.themes,
        lessons: lessonsResult.rows,
        contentsBySkill: contentsResult.bySkill,
        competencies: competenciesResult.byItem,
        vocabulary: vocabularyResult,
        structures: structuresResult,
        speaking: speakingResult,
        homework: homeworkResult.items,
        attendance: attendanceResult,
        progressIndicators: indicatorsResult,
        nextMonth: nextResult,

        /* Textos gerados (podem virar chamadas a IA no futuro) */
        summary:      '',
        learnedThings: [],
        recommendations: [],

        /* Campos editáveis — o teacher edita na UI antes de gerar o PDF */
        editable: {
          teacherComments: '',
          recommendations: '',
          nextGoals: ''
        }
      };

      // Rodada 2: generators de texto (dependem do model quase completo)
      model.summary        = generators.summary(model);
      model.learnedThings  = generators.learnedThings(model);
      model.recommendations = generators.recommendations(model);

      // Rodada 3: seções custom registradas via ReportEngine.registerSection
      var extra = {};
      sections.forEach(function (s) {
        var data = safe(function () { return s.collect(ctx, model); }, null);
        if (data != null) extra[s.id] = { order: s.order, data: data };
      });
      model._extraSections = extra;

      // Overrides opcionais (o UI pode injetar campos editáveis ao rodar)
      if (overrides && overrides.editable) {
        Object.keys(overrides.editable).forEach(function (k) {
          model.editable[k] = overrides.editable[k];
        });
      }

      return model;
    }
  };

  NS.ReportEngine = ReportEngine;

})(typeof window !== 'undefined' ? window : this);
