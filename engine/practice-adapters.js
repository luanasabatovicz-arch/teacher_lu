/* ==========================================================================
   Teacher Lu Platform — Practice adapters
   --------------------------------------------------------------------------
   Bancos que já existem, expostos ao Practice sem serem copiados.

   POR QUE ESTE ARQUIVO EXISTE
   ---------------------------
   engine/grammar-topics.js guarda 337 exercícios com id permanente
   (gr-<topico>-pr-001 / -pm- / -ex-). Copiá-los para o practice-bank
   criaria duas verdades sobre o mesmo conteúdo: corrigir um erro de
   digitação passaria a exigir dois arquivos, e um dia eles divergiriam.

   Então nada é copiado. Este adapter lê o banco no lugar onde ele já
   mora e devolve os itens já no formato normalizado que o Practice
   entende. grammar-topics.js NÃO é alterado — nem por este arquivo, nem
   por ninguém.

   MAPA DE TIPOS
   -------------
     fill  → complete            us → unscramble        tr → transform
     mc    → multiple_choice     ec → fix
     cq · md · itens de `exit`   → open (produção / resposta aberta)

   Os itens de `exit` entram como exercício normal. A interface nunca os
   chama de "Exit Ticket".

   O QUE ESTE ARQUIVO NÃO FAZ
   --------------------------
   Não gera id (todos já existem no dado), não consulta o PracticeLog e
   não sabe quem é o aluno.
   ========================================================================== */

(function (global) {
  'use strict';

  var NS = global.TeacherLu = global.TeacherLu || {};

  var FORMAT_OF = {
    fill: 'complete',
    mc:   'multiple_choice',
    us:   'unscramble',
    ec:   'fix',
    tr:   'transform',
    cq:   'open',
    md:   'open'
  };

  /** Um item do Grammar no descritor normalizado do Practice. */
  function shape(topic, item, defType) {
    var t = item.t || defType;
    return {
      id:         item.id || '',
      format:     FORMAT_OF[t] || 'open',
      topic:      'gr:' + topic.id,
      topicLabel: topic.short || topic.name || topic.id,
      level:      topic.level || '',
      theme:      '',
      groupId:    '',
      passage:    null,

      // Campos canônicos. O Grammar guarda a resposta do MC como
      // "B — went"; a página mostra a string como está, e é isso que a
      // professora confere em voz alta.
      q:            item.q || (item.lines ? item.lines.join('\n') : ''),
      a:            item.a || '',
      options:      item.opts || null,
      correctIndex: null,
      statements:   null,
      pairs:        null,

      title: '', context: '', wordBank: null, text: '',
      lines: item.lines || null, answers: null,
      verbs: null, instruction: '', prompt: '', answerLine: '', expected: '',

      // Feedback de erro que o banco já carrega — só aparece junto da resposta.
      why:     item.why || '',
      ruleRef: item.ruleRef || '',
      exSample: item.ex || '',
      followUp: item.fu || '',

      raw: item
    };
  }

  var GrammarSource = {
    id: 'grammar-topics',

    load: function () {
      var TOPICS = global.ENGINE_TOPICS;
      if (!TOPICS) return [];                 // arquivo não carregado nesta página
      var out = [];
      Object.keys(TOPICS).forEach(function (k) {
        var t = TOPICS[k];
        (t.practice     || []).forEach(function (it) { out.push(shape(t, it, 'fill')); });
        (t.practiceMore || []).forEach(function (it) { out.push(shape(t, it, 'cq'));   });
        (t.exit         || []).forEach(function (it) { out.push(shape(t, it, 'cq'));   });
      });
      return out;
    }
  };

  if (NS.PracticeBank) NS.PracticeBank.registerSource(GrammarSource);
  else (NS.__pendingPracticeSources = NS.__pendingPracticeSources || []).push(GrammarSource);

})(typeof window !== 'undefined' ? window : this);
