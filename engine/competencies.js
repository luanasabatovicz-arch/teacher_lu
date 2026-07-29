/* ==========================================================================
   Teacher Lu — Competencies Map
   --------------------------------------------------------------------------
   Traduz cada CONTEÚDO catalogado no Content Registry para uma lista de
   COMPETÊNCIAS COMUNICATIVAS em português — o que o aluno CONSEGUE fazer
   depois de estudar aquilo.

   Consumido por platform-report-engine.js na seção "O que você aprendeu"
   do Monthly Learning Report.

   ESTRUTURA
   ---------
     TeacherLu.Competencies.of(itemId, contentItem?) → [phrase, phrase, ...]
     TeacherLu.Competencies.themeOf(itemId, contentItem?) → 'rotina' | 'comparação' | ...

   ESTRATÉGIA DE MATCHING
   ----------------------
     1. Match exato pelo item.id                (ex: 'grammar:present-simple')
     2. Match por family/key                    (ex: 'present-simple' em qualquer skill)
     3. Match por palavras-chave no title       (ex: 'compar' → comparatives)
     4. Fallback genérico por skill             ('conseguiu estudar novo conteúdo de X')

   Nunca lança. Sempre retorna array (pode ser vazio) e tema (pode ser '').

   ADICIONANDO NOVOS CONTEÚDOS
   ---------------------------
   Basta acrescentar uma entrada em BY_KEY ou BY_KEYWORD abaixo. O motor de
   relatórios pega automaticamente sem mudar nenhuma outra linha.

   PRÉ-IA
   ------
   Este arquivo é uma tabela estática por design. A camada de IA (futura)
   pode substituir Competencies.of() por uma função async que chame um
   modelo — a assinatura permanece a mesma.
   ========================================================================== */

(function (global) {
  'use strict';

  var NS = global.TeacherLu = global.TeacherLu || {};

  /* ------------------------------------------------------------------
     Mapa principal — por chave do conteúdo (não pelo id completo, para
     dar match independente do skill que hospeda o tópico).
     Cada entrada: { theme, do: [ ... competências ... ] }
     ------------------------------------------------------------------ */
  var BY_KEY = {

    /* ---------- Tempos verbais ---------- */
    'present-simple': {
      theme: 'rotina',
      do: [
        'falar sobre sua rotina diária',
        'perguntar sobre hábitos e preferências',
        'responder perguntas sobre trabalho e estudos',
        'descrever atividades regulares'
      ]
    },
    'present-continuous': {
      theme: 'ações em andamento',
      do: [
        'falar sobre o que está acontecendo agora',
        'descrever cenas e imagens em tempo real',
        'contar planos próximos usando "going to / -ing"',
        'perguntar sobre ações que estão em curso'
      ]
    },
    'past-simple': {
      theme: 'passado',
      do: [
        'contar o que fez ontem, no fim de semana, nas férias',
        'narrar histórias curtas em ordem cronológica',
        'perguntar sobre experiências recentes',
        'usar verbos irregulares nos contextos mais comuns'
      ]
    },
    'past-continuous': {
      theme: 'passado em andamento',
      do: [
        'descrever ações que estavam acontecendo em um momento do passado',
        'combinar past continuous com past simple para narrativas',
        'contar histórias com mais riqueza de detalhes'
      ]
    },
    'present-perfect': {
      theme: 'experiências',
      do: [
        'falar sobre experiências de vida ("I have already been to...")',
        'usar "ever / never / already / yet / just" corretamente',
        'diferenciar situações do presente perfect e do past simple',
        'perguntar e responder sobre conquistas'
      ]
    },
    'future-will': {
      theme: 'futuro',
      do: [
        'fazer previsões e promessas',
        'oferecer ajuda usando "I\'ll..."',
        'decidir algo na hora usando "will"'
      ]
    },
    'future-going-to': {
      theme: 'planos futuros',
      do: [
        'falar sobre planos e intenções ("I\'m going to...")',
        'diferenciar planos concretos de previsões',
        'combinar going to com marcadores temporais'
      ]
    },

    /* ---------- Verb to be ---------- */
    'verb-to-be': {
      theme: 'identidade e características',
      do: [
        'apresentar-se e apresentar outras pessoas',
        'falar sobre nacionalidade, profissão e origem',
        'perguntar e responder sobre estado emocional e físico',
        'construir frases básicas afirmativas, negativas e interrogativas'
      ]
    },

    /* ---------- Modais ---------- */
    'can-could': {
      theme: 'habilidade e permissão',
      do: [
        'falar sobre o que sabe fazer ("I can...")',
        'pedir permissão de forma educada ("Could I...?")',
        'oferecer ajuda ("Can I help you?")'
      ]
    },
    'must-have-to': {
      theme: 'obrigação',
      do: [
        'expressar obrigação e necessidade',
        'diferenciar regras impostas de necessidades pessoais',
        'falar sobre o que precisa ser feito no trabalho e em casa'
      ]
    },
    'should': {
      theme: 'conselhos',
      do: [
        'dar conselhos e sugestões',
        'expressar opiniões suaves sobre o que é melhor fazer',
        'reagir a problemas de outras pessoas'
      ]
    },

    /* ---------- Comparação ---------- */
    'comparatives': {
      theme: 'comparação',
      do: [
        'comparar pessoas, objetos e lugares',
        'usar "than" corretamente',
        'aplicar comparativos com adjetivos curtos e longos'
      ]
    },
    'superlatives': {
      theme: 'superlativos',
      do: [
        'destacar o melhor, o pior, o maior em um grupo',
        'usar "the ...est / the most ..." adequadamente',
        'descrever preferências extremas'
      ]
    },

    /* ---------- Perguntas ---------- */
    'wh-questions': {
      theme: 'perguntas abertas',
      do: [
        'formular perguntas com "what, where, when, who, why, how"',
        'obter informações específicas em uma conversa',
        'reagir a respostas com perguntas de acompanhamento'
      ]
    },
    'yes-no-questions': {
      theme: 'perguntas fechadas',
      do: [
        'fazer perguntas de sim ou não',
        'dar respostas curtas apropriadas ("Yes, I do / No, I don\'t")',
        'construir mini-diálogos naturais'
      ]
    },
    'questions': {
      theme: 'perguntas',
      do: [
        'formular perguntas em diferentes tempos verbais',
        'usar auxiliares corretos em cada tempo',
        'sustentar uma conversa fazendo perguntas'
      ]
    },

    /* ---------- Negação ---------- */
    'negation': {
      theme: 'negação',
      do: [
        'formar frases negativas nos principais tempos verbais',
        'usar contrações naturais ("don\'t / didn\'t / isn\'t")',
        'evitar dupla negação em inglês'
      ]
    },

    /* ---------- Advérbios / adjetivos ---------- */
    'frequency-adverbs': {
      theme: 'frequência',
      do: [
        'falar com que frequência faz cada atividade',
        'posicionar advérbios corretamente na frase',
        'usar "always, usually, often, sometimes, never" no contexto'
      ]
    },
    'adjectives': {
      theme: 'descrição',
      do: [
        'descrever pessoas, lugares e objetos com riqueza de detalhes',
        'usar adjetivos na ordem natural em inglês',
        'expressar opiniões e reações'
      ]
    },

    /* ---------- Estruturas ---------- */
    'articles': {
      theme: 'artigos',
      do: [
        'usar "a / an / the" nos contextos mais comuns',
        'omitir o artigo em nomes próprios e conceitos gerais',
        'diferenciar coisas específicas de coisas em geral'
      ]
    },
    'prepositions-time': {
      theme: 'preposições de tempo',
      do: [
        'usar "in / on / at" para horários, dias e meses',
        'falar sobre rotinas com marcadores temporais',
        'organizar frases sobre agenda com clareza'
      ]
    },
    'prepositions-place': {
      theme: 'preposições de lugar',
      do: [
        'descrever a localização de objetos e pessoas',
        'dar direções básicas',
        'usar "in / on / at / next to / between / behind" no lugar certo'
      ]
    },
    'word-order': {
      theme: 'ordem da frase',
      do: [
        'construir frases em inglês com sujeito + verbo + complemento',
        'evitar erros comuns de inversão',
        'organizar o pensamento antes de falar'
      ]
    },

    /* ---------- Vocabulário / temas de conversação ---------- */
    'daily-routine': {
      theme: 'rotina',
      do: [
        'descrever seu dia da manhã até a noite',
        'falar sobre horários e atividades diárias',
        'comparar rotinas de dia útil e fim de semana'
      ]
    },
    'family': {
      theme: 'família',
      do: [
        'apresentar familiares',
        'falar sobre relações e histórias familiares',
        'perguntar sobre a família de outras pessoas'
      ]
    },
    'jobs': {
      theme: 'profissões',
      do: [
        'falar sobre a própria profissão e a de outras pessoas',
        'perguntar sobre trabalho em conversas casuais',
        'usar vocabulário de escritório, saúde, educação'
      ]
    },
    'food': {
      theme: 'comida',
      do: [
        'pedir comida em restaurantes',
        'falar sobre preferências alimentares',
        'descrever pratos e receitas simples'
      ]
    },
    'travel': {
      theme: 'viagem',
      do: [
        'falar sobre destinos favoritos e experiências de viagem',
        'fazer perguntas em hotel e aeroporto',
        'planejar uma viagem em inglês'
      ]
    },
    'hobbies': {
      theme: 'hobbies',
      do: [
        'falar sobre passatempos e interesses',
        'perguntar sobre o tempo livre de outras pessoas',
        'sustentar conversas sobre lazer'
      ]
    },
    'weather': {
      theme: 'clima',
      do: [
        'descrever o tempo em diferentes estações',
        'reagir naturalmente a comentários sobre o clima',
        'planejar atividades baseado na previsão'
      ]
    },
    'time': {
      theme: 'horas',
      do: [
        'dizer e perguntar as horas',
        'combinar encontros com precisão',
        'usar preposições de tempo com fluência'
      ]
    }
  };

  /* ------------------------------------------------------------------
     Palavras-chave no título — capturam variações que a chave exata
     não captura. Ex: um tópico chamado "Comparativos com adjetivos curtos"
     bate em 'compar' e herda as competências de comparatives.
     ------------------------------------------------------------------ */
  var BY_KEYWORD = [
    { keyword: 'present simple',       key: 'present-simple' },
    { keyword: 'simple present',       key: 'present-simple' },
    { keyword: 'present continuous',   key: 'present-continuous' },
    { keyword: 'past simple',          key: 'past-simple' },
    { keyword: 'simple past',          key: 'past-simple' },
    { keyword: 'past continuous',      key: 'past-continuous' },
    { keyword: 'present perfect',      key: 'present-perfect' },
    { keyword: 'going to',             key: 'future-going-to' },
    { keyword: 'will',                 key: 'future-will' },
    { keyword: 'verb to be',           key: 'verb-to-be' },
    { keyword: 'to be',                key: 'verb-to-be' },
    { keyword: 'can',                  key: 'can-could' },
    { keyword: 'could',                key: 'can-could' },
    { keyword: 'must',                 key: 'must-have-to' },
    { keyword: 'have to',              key: 'must-have-to' },
    { keyword: 'should',               key: 'should' },
    { keyword: 'compar',               key: 'comparatives' },
    { keyword: 'superlat',             key: 'superlatives' },
    { keyword: 'wh-question',          key: 'wh-questions' },
    { keyword: 'wh question',          key: 'wh-questions' },
    { keyword: 'yes/no',               key: 'yes-no-questions' },
    { keyword: 'yes-no',               key: 'yes-no-questions' },
    { keyword: 'question',             key: 'questions' },
    { keyword: 'negati',               key: 'negation' },
    { keyword: 'frequency',            key: 'frequency-adverbs' },
    { keyword: 'adjective',            key: 'adjectives' },
    { keyword: 'article',              key: 'articles' },
    { keyword: 'preposition of time',  key: 'prepositions-time' },
    { keyword: 'preposition of place', key: 'prepositions-place' },
    { keyword: 'word order',           key: 'word-order' },
    { keyword: 'daily routine',        key: 'daily-routine' },
    { keyword: 'routine',              key: 'daily-routine' },
    { keyword: 'family',               key: 'family' },
    { keyword: 'job',                  key: 'jobs' },
    { keyword: 'profess',              key: 'jobs' },
    { keyword: 'food',                 key: 'food' },
    { keyword: 'travel',               key: 'travel' },
    { keyword: 'hobb',                 key: 'hobbies' },
    { keyword: 'weather',              key: 'weather' },
    { keyword: 'time',                 key: 'time' }
  ];

  /* ------------------------------------------------------------------
     Fallback genérico por skill.
     ------------------------------------------------------------------ */
  var FALLBACK_BY_SKILL = {
    grammar:    { theme: 'gramática',    do: ['aplicar essa estrutura gramatical em frases próprias'] },
    structures: { theme: 'estrutura',    do: ['construir frases com essa estrutura em inglês'] },
    vocabulary: { theme: 'vocabulário',  do: ['reconhecer e usar novas palavras em contexto'] },
    speaking:   { theme: 'conversa',     do: ['sustentar uma conversa curta sobre esse tema'] },
    listening:  { theme: 'compreensão',  do: ['entender áudios curtos nesse tema'] },
    reading:    { theme: 'leitura',      do: ['ler textos curtos nesse tema'] },
    writing:    { theme: 'escrita',      do: ['escrever frases curtas nesse tema'] }
  };

  function findByKey(id) {
    if (!id) return null;
    // id vem no formato "skill:key"
    var parts = String(id).split(':');
    var key = parts.length > 1 ? parts.slice(1).join(':') : parts[0];
    return BY_KEY[key] || null;
  }

  function findByTitle(title) {
    if (!title) return null;
    var lower = String(title).toLowerCase();
    for (var i = 0; i < BY_KEYWORD.length; i++) {
      if (lower.indexOf(BY_KEYWORD[i].keyword) !== -1) {
        return BY_KEY[BY_KEYWORD[i].key] || null;
      }
    }
    return null;
  }

  var Competencies = {

    VERSION: '1.0.0',
    BY_KEY: BY_KEY,

    /**
     * Retorna array de frases descrevendo o que o aluno consegue fazer
     * depois de estudar esse conteúdo. Nunca lança.
     */
    of: function (itemId, item) {
      var hit = findByKey(itemId);
      if (!hit && item && item.title) hit = findByTitle(item.title);
      if (!hit && item && item.subtitle) hit = findByTitle(item.subtitle);
      if (hit) return hit.do.slice();

      // Fallback por skill
      var skill = item && item.skill;
      if (!skill && itemId) skill = String(itemId).split(':')[0];
      var fb = FALLBACK_BY_SKILL[skill];
      return fb ? fb.do.slice() : [];
    },

    /**
     * Tema/rótulo curto do conteúdo — usado para agrupar competências
     * na seção "Agora você consegue...".
     */
    themeOf: function (itemId, item) {
      var hit = findByKey(itemId);
      if (!hit && item && item.title) hit = findByTitle(item.title);
      if (hit) return hit.theme;
      var skill = item && item.skill;
      if (!skill && itemId) skill = String(itemId).split(':')[0];
      var fb = FALLBACK_BY_SKILL[skill];
      return fb ? fb.theme : '';
    },

    /**
     * True se o mapa cobre esse conteúdo (útil para telemetria futura de
     * cobertura da tabela).
     */
    covers: function (itemId, item) {
      var hit = findByKey(itemId);
      if (!hit && item && item.title) hit = findByTitle(item.title);
      return !!hit;
    }
  };

  NS.Competencies = Competencies;

})(typeof window !== 'undefined' ? window : this);
