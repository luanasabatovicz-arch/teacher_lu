/* ============================================================
   LANGUAGE STRUCTURES — CONTEÚDO (só dados; a página nunca muda)
   ------------------------------------------------------------
   Estruturas da língua que não estão no Grammar Engine (tempos
   verbais) nem no Vocabulary (temas por semana): preposições,
   conjunções, artigos, determinantes, quantificadores, pronomes,
   advérbios, adjetivos, ordem das palavras, formação de perguntas,
   negação e estrutura da frase.

   `window.STRUCTURES_TOPICS` (não const): const no topo de um
   <script> NÃO vira propriedade de window — mesma armadilha
   documentada em grammar-topics.js.

   SCHEMA DE CADA LIÇÃO — as 8 seções do padrão Teacher Lu:
     explain   { text, points[] }        explicação objetiva
     examples  [{ use, items[] }]        exemplos
     mistakes  [{ bad, good, why }]      erros comuns (foco PT→EN)
     exercises [{ q, a, options? }]      exercícios
     speaking  { prompt, cues[] }        speaking practice
     complete  [{ q, a }]                complete the sentence
     questions []                        conversation questions
     review    { key[], oneLiner }       revisão rápida

   {name} = nome do aluno (personalização, igual ao Grammar Engine).
   ============================================================ */

window.STRUCTURES_CATEGORIES = [
  { id:'prepositions',  label:'Prepositions',      icon:'📍', order:1  },
  { id:'conjunctions',  label:'Conjunctions',      icon:'🔗', order:2  },
  { id:'articles',      label:'Articles',          icon:'🅰️', order:3  },
  { id:'determiners',   label:'Determiners',       icon:'👉', order:4  },
  { id:'quantifiers',   label:'Quantifiers',       icon:'⚖️', order:5  },
  { id:'pronouns',      label:'Pronouns',          icon:'🧍', order:6  },
  { id:'adverbs',       label:'Adverbs',           icon:'⏱', order:7  },
  { id:'adjectives',    label:'Adjectives',        icon:'🎨', order:8  },
  { id:'word-order',    label:'Word Order',        icon:'🔤', order:9  },
  { id:'questions',     label:'Question Formation',icon:'❓', order:10 },
  { id:'negation',      label:'Negation',          icon:'🚫', order:11 },
  { id:'sentence',      label:'Sentence Structure',icon:'🧱', order:12 }
];

window.STRUCTURES_TOPICS = {

/* ══════════════ 1 · PREPOSITIONS OF PLACE (A1) ══════════════ */
'prep-place':{
  id:'prep-place', category:'prepositions', level:'A1', order:1,
  title:'Prepositions of place — in / on / at',
  short:'in / on / at',
  goal:'Say exactly where something or someone is.',

  explain:{
    text:'Three little words carry almost every place in English. Think of them as three sizes: <b>in</b> is inside something, <b>on</b> is touching a surface, <b>at</b> is a point you can put a pin on.',
    points:[
      '<b>in</b> — inside a space: <i>in the kitchen, in Brazil, in my bag</i>',
      '<b>on</b> — touching a surface: <i>on the table, on the wall, on the bus</i>',
      '<b>at</b> — a specific point or place: <i>at home, at work, at the door</i>',
      'Fixed pairs you just memorise: <i>at home · at work · at school · in bed · on TV</i>'
    ]
  },

  examples:[
    { use:'① in — inside a space', items:['The milk is <b>in</b> the fridge.','She lives <b>in</b> Curitiba.','My keys are <b>in</b> my pocket.','We study <b>in</b> the living room.'] },
    { use:'② on — on a surface', items:['Your book is <b>on</b> the table.','There is a picture <b>on</b> the wall.','I am <b>on</b> the bus.','Write your name <b>on</b> the paper.'] },
    { use:'③ at — a point', items:['I am <b>at</b> home.','She is <b>at</b> work.','Meet me <b>at</b> the door.','He is <b>at</b> the bus stop.'] }
  ],

  mistakes:[
    { bad:'I am in home.', good:'I am <b>at</b> home.', why:'"Home" is a point, not a space. No "the" either.' },
    { bad:'I live in the Brazil.', good:'I live <b>in</b> Brazil.', why:'Countries take no article.' },
    { bad:'She is in the bus.', good:'She is <b>on</b> the bus.', why:'Public transport you can walk in takes "on".' },
    { bad:'I saw it in the TV.', good:'I saw it <b>on</b> TV.', why:'Fixed pair: "on TV", no article.' }
  ],

  exercises:[
    { q:'The cat is ___ the sofa.', a:'on' },
    { q:'My parents are ___ home tonight.', a:'at' },
    { q:'There is water ___ the glass.', a:'in' },
    { q:'I met her ___ the bus stop.', a:'at' },
    { q:'Your phone is ___ your bag.', a:'in' },
    { q:'The photo is ___ the wall.', a:'on' }
  ],

  complete:[
    { q:'Right now I am ___ ...', a:'at home / at work / in the kitchen' },
    { q:'My phone is usually ___ ...', a:'in my pocket / on the table' },
    { q:'On Sundays my family is ___ ...', a:'at home / at church / in the park' }
  ],

  speaking:{
    prompt:'Look around the room you are in. Describe where five things are, using in, on and at at least once each.',
    cues:['Where is your phone right now?','Where do you usually study English?','Where is your favourite chair?','Where are your shoes?']
  },

  questions:[
    'Where do you live? Which city, which neighbourhood?',
    'Where are you when you feel most relaxed?',
    'What is on the wall in your bedroom?',
    'Where do you keep your keys so you never lose them?'
  ],

  review:{
    key:['<b>in</b> = inside','<b>on</b> = touching a surface','<b>at</b> = a point'],
    oneLiner:'in a box, on a table, at the door — space, surface, point.'
  }
},

/* ══════════════ 2 · BASIC CONJUNCTIONS (A1) ══════════════ */
'conj-basic':{
  id:'conj-basic', category:'conjunctions', level:'A1', order:1,
  title:'Joining ideas — and, but, or, because, so',
  short:'and / but / or / because / so',
  goal:'Turn short sentences into longer, natural ones.',

  explain:{
    text:'Beginners speak in short pieces: <i>I like coffee. I don\'t like tea.</i> Conjunctions glue those pieces together and make you sound fluent immediately. Each one carries a different relationship.',
    points:[
      '<b>and</b> — adds: <i>I study and I work.</i>',
      '<b>but</b> — contrasts: <i>I like it, but it is expensive.</i>',
      '<b>or</b> — offers a choice: <i>Tea or coffee?</i>',
      '<b>because</b> — gives the reason: <i>I am tired because I worked a lot.</i>',
      '<b>so</b> — gives the result: <i>I was tired, so I went to bed.</i>',
      'Reason vs result: <b>because</b> comes before the cause, <b>so</b> before the consequence.'
    ]
  },

  examples:[
    { use:'① and / but', items:['She speaks English <b>and</b> Spanish.','I want to travel, <b>but</b> I have no money.','He is small <b>but</b> very strong.'] },
    { use:'② or', items:['Do you want tea <b>or</b> coffee?','We can study today <b>or</b> tomorrow.','Is it big <b>or</b> small?'] },
    { use:'③ because / so', items:['I study English <b>because</b> I want a better job.','It was raining, <b>so</b> we stayed home.','She is happy <b>because</b> it is Friday.'] }
  ],

  mistakes:[
    { bad:'I am tired because of I worked a lot.', good:'I am tired <b>because</b> I worked a lot.', why:'"Because of" comes before a noun; "because" before a full sentence.' },
    { bad:'Because it was late, so we left.', good:'<b>Because</b> it was late, we left. / It was late, <b>so</b> we left.', why:'One connector per relationship — never both.' },
    { bad:'I like coffee and I don\'t like tea.', good:'I like coffee, <b>but</b> I don\'t like tea.', why:'Contrast needs "but", not "and".' }
  ],

  exercises:[
    { q:'I speak Portuguese ___ English.', a:'and' },
    { q:'I wanted to go, ___ I was sick.', a:'but' },
    { q:'Would you like water ___ juice?', a:'or' },
    { q:'She is happy ___ she passed the test.', a:'because' },
    { q:'It was very cold, ___ I wore a coat.', a:'so' },
    { q:'He studies at night ___ he works during the day.', a:'because' }
  ],

  complete:[
    { q:'I study English because ___', a:'... I want to travel / I need it at work' },
    { q:'I like my job, but ___', a:'... it is tiring / the hours are long' },
    { q:'I was very tired, so ___', a:'... I went to bed early' }
  ],

  speaking:{
    prompt:'Tell me three things about your week. Use "because" at least twice and "but" at least once.',
    cues:['Why do you study English?','What do you like about your city, and what do you not like?','What did you do last weekend, and why?']
  },

  questions:[
    'Why did you start learning English?',
    'What do you love about your job but would change if you could?',
    'Would you rather live in a big city or a small town? Why?',
    'Tell me about something that made you happy this week and why.'
  ],

  review:{
    key:['<b>and</b> adds','<b>but</b> contrasts','<b>or</b> chooses','<b>because</b> = reason','<b>so</b> = result'],
    oneLiner:'because comes before the cause; so comes before the consequence.'
  }
},

/* ══════════════ 3 · ARTICLES (A1) ══════════════ */
'articles-basic':{
  id:'articles-basic', category:'articles', level:'A1', order:1,
  title:'Articles — a, an, the and no article',
  short:'a / an / the / —',
  goal:'Stop guessing when to use "the".',

  explain:{
    text:'Portuguese uses articles far more than English. The rule that solves most cases: use <b>a/an</b> the first time you mention something, <b>the</b> when both of you already know which one, and <b>no article</b> when you talk about things in general.',
    points:[
      '<b>a / an</b> — one of many, first mention: <i>I have a car.</i>',
      '<b>an</b> before a vowel <i>sound</i>: <i>an apple, an hour</i> (but <i>a university</i>)',
      '<b>the</b> — we both know which one: <i>The car is outside.</i>',
      '<b>no article</b> — general ideas, plurals, uncountables: <i>I like coffee. Dogs are friendly.</i>',
      'No article with: countries, languages, meals, most names — <i>I speak English. Lunch is at noon.</i>'
    ]
  },

  examples:[
    { use:'① a/an → the (first, then known)', items:['I bought <b>a</b> book. <b>The</b> book is great.','There is <b>an</b> email for you. <b>The</b> email is from work.'] },
    { use:'② no article — general', items:['I love <b>music</b>.','<b>Children</b> learn fast.','She drinks <b>coffee</b> every morning.'] },
    { use:'③ fixed cases', items:['I speak <b>Portuguese</b>.','We have <b>lunch</b> at one.','He lives in <b>Brazil</b>.','She plays <b>the</b> guitar.'] }
  ],

  mistakes:[
    { bad:'I like the dogs.', good:'I like <b>dogs</b>.', why:'General idea takes no article. "The dogs" = specific dogs we both know.' },
    { bad:'She is a engineer.', good:'She is <b>an</b> engineer.', why:'Vowel sound → "an".' },
    { bad:'I speak the English.', good:'I speak <b>English</b>.', why:'Languages never take an article.' },
    { bad:'The life is beautiful.', good:'<b>Life</b> is beautiful.', why:'Abstract nouns in general take no article.' },
    { bad:'I go to the work.', good:'I go to <b>work</b>.', why:'Fixed pair: to work, to school, to bed — no article.' }
  ],

  exercises:[
    { q:'I have ___ dog. ___ dog is very small.', a:'a / The' },
    { q:'She is ___ excellent teacher.', a:'an' },
    { q:'I don\'t like ___ tomatoes.', a:'— (no article)' },
    { q:'We had ___ dinner at eight.', a:'— (no article)' },
    { q:'Can you close ___ window, please?', a:'the' },
    { q:'He wants to be ___ doctor.', a:'a' }
  ],

  complete:[
    { q:'I live in ___ (country)', a:'... Brazil — no article' },
    { q:'In my free time I like ___', a:'... music / films — no article for general' },
    { q:'My favourite room in my house is ___', a:'... the kitchen — we know which one' }
  ],

  speaking:{
    prompt:'Describe your house to me. First mention each room with "a", then talk about it again with "the".',
    cues:['Tell me about a place you visited recently.','What do you like in general? (no article!)','Describe one object on your desk.']
  },

  questions:[
    'What languages do you speak?',
    'What kind of food do you love in general?',
    'Tell me about a film you watched recently. Was the ending good?',
    'What is the best place in your city?'
  ],

  review:{
    key:['<b>a/an</b> = first mention','<b>the</b> = we both know it','<b>no article</b> = in general'],
    oneLiner:'Portuguese loves articles; English drops them for general ideas.'
  }
},

/* ══════════════ 4 · DETERMINERS (A1) ══════════════ */
'det-demonstratives':{
  id:'det-demonstratives', category:'determiners', level:'A1', order:1,
  title:'This, that, these, those',
  short:'this / that / these / those',
  goal:'Point at things near and far, singular and plural.',

  explain:{
    text:'Two questions decide the word: is it <b>near or far</b>, and is it <b>one or many</b>? That is the whole system.',
    points:[
      '<b>this</b> — near + singular: <i>This book (in my hand).</i>',
      '<b>that</b> — far + singular: <i>That car (over there).</i>',
      '<b>these</b> — near + plural: <i>These shoes (I am wearing).</i>',
      '<b>those</b> — far + plural: <i>Those people (across the street).</i>',
      'On the phone: <i>This is Lu.</i> — you always introduce yourself with "this".'
    ]
  },

  examples:[
    { use:'① near', items:['<b>This</b> is my phone.','<b>These</b> are my keys.','I like <b>this</b> song.'] },
    { use:'② far', items:['<b>That</b> is her house.','<b>Those</b> are my neighbours.','Who is <b>that</b> man?'] },
    { use:'③ in time', items:['<b>This</b> morning I woke up early.','I was sick <b>that</b> day.','<b>These</b> days I study a lot.'] }
  ],

  mistakes:[
    { bad:'This are my books.', good:'<b>These</b> are my books.', why:'Plural needs these/those.' },
    { bad:'I like these car.', good:'I like <b>this</b> car.', why:'"Car" is singular.' },
    { bad:'Hello, I am Lu. (on the phone)', good:'Hello, <b>this is</b> Lu.', why:'Fixed phone formula.' }
  ],

  exercises:[
    { q:'___ shoes here are new.', a:'These' },
    { q:'Look at ___ bird in the sky!', a:'that' },
    { q:'___ is my sister (next to me).', a:'This' },
    { q:'___ houses over there are expensive.', a:'Those' },
    { q:'I love ___ coffee I am drinking.', a:'this' }
  ],

  complete:[
    { q:'This is my ___', a:'... phone / bag / notebook' },
    { q:'Those people over there are ___', a:'... my neighbours / tourists' },
    { q:'These days I ___', a:'... study a lot / work from home' }
  ],

  speaking:{
    prompt:'Point at four things — two close to you and two far away — and describe them. Use all four words.',
    cues:['What is this? (hold something up)','Who is that in the photo?','These days, what are you busy with?']
  },

  questions:[
    'What is one thing near you right now that you really like?',
    'These days, what takes most of your time?',
    'Tell me about that one place you always want to go back to.'
  ],

  review:{
    key:['near + 1 = <b>this</b>','far + 1 = <b>that</b>','near + many = <b>these</b>','far + many = <b>those</b>'],
    oneLiner:'Near or far, one or many — two questions, four words.'
  }
},

/* ══════════════ 5 · QUANTIFIERS (A1+) ══════════════ */
'quant-basic':{
  id:'quant-basic', category:'quantifiers', level:'A1+', order:1,
  title:'Some, any, much, many, a lot of',
  short:'some / any / much / many',
  goal:'Talk about quantity without counting.',

  explain:{
    text:'First ask: can I count it? <i>Two coffees</i> — yes. <i>Two waters</i> — no, water is uncountable. That answer decides the word.',
    points:[
      '<b>some</b> — positive sentences: <i>I have some money.</i>',
      '<b>any</b> — negatives and questions: <i>I don\'t have any money. Do you have any?</i>',
      '<b>many</b> + countable: <i>many friends, many books</i>',
      '<b>much</b> + uncountable: <i>much time, much water</i>',
      '<b>a lot of</b> — works with both, and is what people actually say: <i>a lot of friends, a lot of time</i>',
      'Offers and requests break the rule: <i>Would you like <b>some</b> coffee?</i>'
    ]
  },

  examples:[
    { use:'① some / any', items:['There is <b>some</b> milk in the fridge.','There isn\'t <b>any</b> milk.','Do you have <b>any</b> questions?','Would you like <b>some</b> water?'] },
    { use:'② many / much', items:['How <b>many</b> students are there?','How <b>much</b> time do you have?','I don\'t have <b>much</b> money.','She has <b>many</b> friends.'] },
    { use:'③ a lot of', items:['I have <b>a lot of</b> work today.','There are <b>a lot of</b> people here.','He drinks <b>a lot of</b> coffee.'] }
  ],

  mistakes:[
    { bad:'I have many money.', good:'I have <b>a lot of</b> money.', why:'Money is uncountable → much / a lot of.' },
    { bad:'Do you have some questions?', good:'Do you have <b>any</b> questions?', why:'Questions normally take "any".' },
    { bad:'I don\'t have some time.', good:'I don\'t have <b>any</b> time.', why:'Negatives take "any".' },
    { bad:'How much people are there?', good:'How <b>many</b> people are there?', why:'People are countable.' }
  ],

  exercises:[
    { q:'There aren\'t ___ eggs left.', a:'any' },
    { q:'How ___ sugar do you want?', a:'much' },
    { q:'She has ___ books in her room.', a:'many / a lot of' },
    { q:'I bought ___ bread this morning.', a:'some' },
    { q:'Do you speak ___ other languages?', a:'any' },
    { q:'He doesn\'t have ___ free time.', a:'much / any' }
  ],

  complete:[
    { q:'In my fridge there is some ___', a:'... milk / cheese / juice' },
    { q:'I don\'t have much ___', a:'... time / patience / money' },
    { q:'I have a lot of ___', a:'... work / friends / ideas' }
  ],

  speaking:{
    prompt:'Open your fridge in your mind and tell me what is there. Use some, any and a lot of.',
    cues:['How many people live in your house?','How much coffee do you drink a day?','Is there anything you never have enough of?']
  },

  questions:[
    'How much free time do you have during the week?',
    'How many languages would you like to speak?',
    'Is there anything you have a lot of at home?',
    'What is something you never have enough of?'
  ],

  review:{
    key:['<b>some</b> = positive','<b>any</b> = negative + question','<b>many</b> = countable','<b>much</b> = uncountable','<b>a lot of</b> = both'],
    oneLiner:'Can you count it? That question answers everything.'
  }
},

/* ══════════════ 6 · PRONOUNS (A1) ══════════════ */
'pron-subject-object':{
  id:'pron-subject-object', category:'pronouns', level:'A1', order:1,
  title:'Subject and object pronouns',
  short:'I / me · he / him',
  goal:'Stop dropping the subject — English always needs one.',

  explain:{
    text:'In Portuguese you can say <i>Está chovendo</i> with no subject. English cannot: every sentence needs a subject, even an empty one — <i>It is raining.</i> And the pronoun changes shape depending on whether it does the action or receives it.',
    points:[
      'Subject (does the action): <b>I, you, he, she, it, we, they</b>',
      'Object (receives the action): <b>me, you, him, her, it, us, them</b>',
      'Subject goes before the verb; object goes after the verb or after a preposition.',
      'English always needs a subject: <i>It is cold. There is a problem.</i>'
    ]
  },

  examples:[
    { use:'① subject before the verb', items:['<b>I</b> work here.','<b>She</b> speaks English.','<b>They</b> live in Curitiba.','<b>It</b> is raining.'] },
    { use:'② object after the verb', items:['Call <b>me</b> tomorrow.','I know <b>her</b>.','We saw <b>them</b> yesterday.','Give it to <b>us</b>.'] },
    { use:'③ both in one sentence', items:['<b>She</b> loves <b>him</b>.','<b>We</b> invited <b>them</b>.','<b>He</b> told <b>me</b> the truth.'] }
  ],

  mistakes:[
    { bad:'Is raining.', good:'<b>It</b> is raining.', why:'English never drops the subject, even when it means nothing.' },
    { bad:'Me and my sister went out.', good:'<b>My sister and I</b> went out.', why:'Subject position needs "I", and politeness puts the other person first.' },
    { bad:'She gave the book to I.', good:'She gave the book to <b>me</b>.', why:'After a preposition, always the object form.' },
    { bad:'Him is my brother.', good:'<b>He</b> is my brother.', why:'Before the verb, subject form.' }
  ],

  exercises:[
    { q:'___ is my best friend. (he/him)', a:'He' },
    { q:'Can you help ___? (I/me)', a:'me' },
    { q:'___ are studying English. (we/us)', a:'We' },
    { q:'I saw ___ at the party. (they/them)', a:'them' },
    { q:'___ is very hot today.', a:'It' },
    { q:'This present is for ___. (she/her)', a:'her' }
  ],

  complete:[
    { q:'My best friend — I met ___ when ___', a:'... him/her ... we were children' },
    { q:'It is ___ today.', a:'... hot / cold / rainy' },
    { q:'My family and I ___ every Sunday.', a:'... have lunch together' }
  ],

  speaking:{
    prompt:'Tell me about two people you love. Use he/she when they do something, and him/her when something happens to them.',
    cues:['Who helps you the most? How does he/she help you?','Describe the weather today.','Who did you talk to yesterday?']
  },

  questions:[
    'Who is the person you call when you have good news? Why him or her?',
    'What is the weather like where you are?',
    'Tell me about someone who taught you something important.'
  ],

  review:{
    key:['Subject <b>before</b> the verb: I, he, she, they','Object <b>after</b> the verb: me, him, her, them','English never drops the subject'],
    oneLiner:'"Is raining" does not exist — it is raining.'
  }
},

/* ══════════════ 7 · ADVERBS OF FREQUENCY (A1+) ══════════════ */
'adv-frequency':{
  id:'adv-frequency', category:'adverbs', level:'A1+', order:1,
  title:'Adverbs of frequency and where they go',
  short:'always / usually / never',
  goal:'Say how often you do things — and put the word in the right place.',

  explain:{
    text:'The words are easy; the position is what trips everyone. The rule has one exception and it is worth memorising: <b>before the main verb, but after "to be"</b>.',
    points:[
      'The scale: <b>always</b> 100% · <b>usually</b> · <b>often</b> · <b>sometimes</b> · <b>rarely</b> · <b>never</b> 0%',
      'Before the main verb: <i>I <b>always</b> drink coffee.</i>',
      'After the verb "to be": <i>She <b>is always</b> late.</i>',
      'Longer expressions go at the end: <i>every day, twice a week, once a month.</i>',
      '<b>never</b> is already negative — never say "don\'t never".'
    ]
  },

  examples:[
    { use:'① before the main verb', items:['I <b>usually</b> wake up at seven.','She <b>never</b> eats meat.','We <b>often</b> study together.'] },
    { use:'② after "to be"', items:['He <b>is always</b> tired.','They <b>are never</b> at home.','I <b>am usually</b> busy on Mondays.'] },
    { use:'③ expressions at the end', items:['I go to the gym <b>three times a week</b>.','She calls her mother <b>every day</b>.','We travel <b>once a year</b>.'] }
  ],

  mistakes:[
    { bad:'I drink always coffee.', good:'I <b>always drink</b> coffee.', why:'The adverb comes before the main verb, not after.' },
    { bad:'She always is late.', good:'She <b>is always</b> late.', why:'With "to be", the adverb comes after.' },
    { bad:'I don\'t never smoke.', good:'I <b>never</b> smoke.', why:'"Never" is already the negative — no double negative in English.' },
    { bad:'I go every day to work.', good:'I go to work <b>every day</b>.', why:'Time expressions go at the end.' }
  ],

  exercises:[
    { q:'I ___ (always) have breakfast at home.', a:'always have' },
    { q:'She ___ (never) is angry. → correct it', a:'is never' },
    { q:'They ___ (usually) go out on Fridays.', a:'usually go' },
    { q:'He ___ (often) is late for class. → correct it', a:'is often' },
    { q:'We study English ___ (twice / week).', a:'twice a week' }
  ],

  complete:[
    { q:'I always ___ in the morning.', a:'... drink coffee / check my phone' },
    { q:'I am never ___', a:'... late / bored on weekends' },
    { q:'I ___ once a month.', a:'... visit my parents / go to the cinema' }
  ],

  speaking:{
    prompt:'Describe your normal week to me. Use at least four different frequency words.',
    cues:['What do you always do before bed?','What do you never do?','How often do you speak English?']
  },

  questions:[
    'What is something you always do on Sunday?',
    'What do you never do, no matter what?',
    'How often do you see your closest friends?',
    'What is a habit you would like to do more often?'
  ],

  review:{
    key:['Before the main verb','<b>After</b> the verb "to be"','Long expressions at the end','No double negative with never'],
    oneLiner:'I always drink · I am always tired — that flip is the whole lesson.'
  }
},

/* ══════════════ 8 · ADJECTIVES (A1+) ══════════════ */
'adj-position-order':{
  id:'adj-position-order', category:'adjectives', level:'A1+', order:1,
  title:'Adjectives — position and order',
  short:'a big red car',
  goal:'Describe things the way English speakers actually order words.',

  explain:{
    text:'Portuguese says <i>carro vermelho</i> — noun first. English says <i>red car</i> — adjective first, always. And when you stack several adjectives, they follow a fixed order that native speakers never think about but always obey.',
    points:[
      'Adjective <b>before</b> the noun: <i>a beautiful house</i>',
      'Or after the verb "to be": <i>The house is beautiful.</i>',
      'Adjectives <b>never</b> take a plural -s: <i>two big cars</i>, not "bigs cars".',
      'The order: <b>opinion → size → age → shape → colour → origin → material → NOUN</b>',
      '<i>a lovely little old round brown Italian wooden table</i> — the full chain, rarely all at once.'
    ]
  },

  examples:[
    { use:'① before the noun', items:['a <b>new</b> phone','an <b>interesting</b> book','<b>expensive</b> shoes'] },
    { use:'② after "to be"', items:['This coffee is <b>hot</b>.','The children are <b>tired</b>.','My city is <b>beautiful</b>.'] },
    { use:'③ stacking in order', items:['a <b>nice big</b> house (opinion + size)','a <b>small black</b> bag (size + colour)','a <b>beautiful old Italian</b> car (opinion + age + origin)'] }
  ],

  mistakes:[
    { bad:'I have a car red.', good:'I have a <b>red car</b>.', why:'English puts the adjective first — the opposite of Portuguese.' },
    { bad:'They are bigs houses.', good:'They are <b>big</b> houses.', why:'Adjectives never take -s.' },
    { bad:'a red big car', good:'a <b>big red</b> car', why:'Size comes before colour.' },
    { bad:'She is a person very nice.', good:'She is a <b>very nice</b> person.', why:'"Very" goes with the adjective, before the noun.' }
  ],

  exercises:[
    { q:'Reorder: house / old / a / beautiful', a:'a beautiful old house' },
    { q:'Reorder: bag / small / black / a', a:'a small black bag' },
    { q:'Correct: I bought a jacket new.', a:'I bought a new jacket.' },
    { q:'Correct: They are tireds.', a:'They are tired.' },
    { q:'Reorder: Brazilian / a / young / woman', a:'a young Brazilian woman' }
  ],

  complete:[
    { q:'I live in a ___ house.', a:'... small comfortable / big old' },
    { q:'My favourite jacket is ___', a:'... an old black leather jacket' },
    { q:'Today I feel ___', a:'... tired / happy / relaxed' }
  ],

  speaking:{
    prompt:'Describe three things you own using two adjectives each, in the right order.',
    cues:['Describe your phone.','Describe the room you are in.','Describe your favourite piece of clothing.']
  },

  questions:[
    'What is the most beautiful place you have ever seen?',
    'Describe your ideal house in three adjectives.',
    'What kind of people do you enjoy being around?'
  ],

  review:{
    key:['Adjective <b>before</b> the noun','Never plural','opinion → size → age → colour → origin → material'],
    oneLiner:'carro vermelho → red car. Flip it, every time.'
  }
},

/* ══════════════ 9 · WORD ORDER (A1) ══════════════ */
'word-order-svo':{
  id:'word-order-svo', category:'word-order', level:'A1', order:1,
  title:'Basic word order — Subject + Verb + Object',
  short:'S + V + O',
  goal:'Build any English sentence on a skeleton that never changes.',

  explain:{
    text:'English word order is far stricter than Portuguese. Portuguese lets you move things around for emphasis; English does not. Learn the skeleton and most sentences build themselves.',
    points:[
      'The core: <b>Subject + Verb + Object</b> — <i>I (S) love (V) coffee (O).</i>',
      'Then extras, in this order: <b>S + V + O + place + time</b>',
      '<i>I study English at home every night.</i>',
      'Nothing comes between the verb and its object: never <i>I like very much coffee</i>.',
      'Time can jump to the front for emphasis: <i>Every night, I study English.</i>'
    ]
  },

  examples:[
    { use:'① the skeleton', items:['<b>She</b> <b>reads</b> <b>books</b>.','<b>We</b> <b>bought</b> <b>a car</b>.','<b>They</b> <b>speak</b> <b>English</b>.'] },
    { use:'② adding place and time', items:['I work <b>at home</b> <b>on Mondays</b>.','She met him <b>in Curitiba</b> <b>last year</b>.','We study English <b>here</b> <b>every week</b>.'] },
    { use:'③ time at the front', items:['<b>Yesterday</b> I went to the gym.','<b>Every morning</b> she drinks tea.'] }
  ],

  mistakes:[
    { bad:'I like very much coffee.', good:'I like coffee <b>very much</b>.', why:'Nothing separates the verb from its object.' },
    { bad:'Every day I to the gym go.', good:'Every day I <b>go to the gym</b>.', why:'Verb comes right after the subject.' },
    { bad:'I study every night English.', good:'I study <b>English every night</b>.', why:'Object first, then time.' },
    { bad:'Likes she chocolate.', good:'<b>She likes</b> chocolate.', why:'Statements are never inverted — only questions are.' }
  ],

  exercises:[
    { q:'Reorder: coffee / drinks / she / every morning', a:'She drinks coffee every morning.' },
    { q:'Reorder: English / at home / study / I', a:'I study English at home.' },
    { q:'Correct: I like very much this song.', a:'I like this song very much.' },
    { q:'Reorder: last week / we / a film / watched', a:'We watched a film last week.' },
    { q:'Correct: Plays he football on Sundays.', a:'He plays football on Sundays.' }
  ],

  complete:[
    { q:'I ___ every morning.', a:'... drink coffee / check my messages' },
    { q:'My family ___ on Sundays.', a:'... has lunch together' },
    { q:'Last weekend I ___', a:'... watched a film / visited my parents' }
  ],

  speaking:{
    prompt:'Tell me five things you did yesterday. Keep every sentence in Subject + Verb + Object order.',
    cues:['What do you do every morning?','What did you do last weekend?','What are you going to do tomorrow?']
  },

  questions:[
    'Describe your typical day from morning to night.',
    'What did you do last weekend?',
    'What do you usually do to relax after work?'
  ],

  review:{
    key:['<b>S + V + O</b>','then place, then time','never split verb and object'],
    oneLiner:'I study English at home every night — who, does, what, where, when.'
  }
},

/* ══════════════ 10 · QUESTION FORMATION (A1) ══════════════ */
'questions-formation':{
  id:'questions-formation', category:'questions', level:'A1', order:1,
  title:'Making questions — yes/no and wh-',
  short:'Do you...? / Where do you...?',
  goal:'Ask questions without sounding like a statement.',

  explain:{
    text:'In Portuguese you can ask just by raising your voice: <i>Você gosta de café?</i> English needs a structural change — an auxiliary verb, and it goes first.',
    points:[
      'Yes/no questions: <b>Do / Does / Did / Am / Is / Are / Can</b> + subject + verb',
      '<i>Do you like coffee? · Is she your sister? · Can you swim?</i>',
      'Wh- questions: <b>question word + auxiliary + subject + verb</b>',
      '<i>Where do you live? · What did she say? · Why are you tired?</i>',
      'The verb "to be" needs no helper — it just swaps places: <i>You are ready → Are you ready?</i>',
      'After do/does/did, the main verb goes back to base form: <i>Does she <b>like</b>...</i>, never "likes".'
    ]
  },

  examples:[
    { use:'① yes/no with do/does', items:['<b>Do</b> you speak English?','<b>Does</b> he work here?','<b>Did</b> they arrive?'] },
    { use:'② yes/no with be / can', items:['<b>Are</b> you tired?','<b>Is</b> it expensive?','<b>Can</b> you help me?'] },
    { use:'③ wh- questions', items:['<b>Where do</b> you live?','<b>What does</b> she do?','<b>Why are</b> you late?','<b>How many</b> brothers do you have?'] }
  ],

  mistakes:[
    { bad:'You like coffee?', good:'<b>Do</b> you like coffee?', why:'Intonation is not enough in English — you need the auxiliary.' },
    { bad:'Does she likes chocolate?', good:'Does she <b>like</b> chocolate?', why:'After does, the verb returns to base form.' },
    { bad:'Where you live?', good:'Where <b>do</b> you live?', why:'Wh- questions still need the auxiliary.' },
    { bad:'Are you have a car?', good:'<b>Do</b> you have a car?', why:'"Have" is a main verb here, so it needs do.' },
    { bad:'What means this word?', good:'What <b>does this word mean</b>?', why:'Subject comes before the verb, even in questions.' }
  ],

  exercises:[
    { q:'___ you work on Saturdays?', a:'Do' },
    { q:'___ she live near here?', a:'Does' },
    { q:'Where ___ you go last night?', a:'did' },
    { q:'___ they your friends?', a:'Are' },
    { q:'Correct: Does he plays tennis?', a:'Does he play tennis?' },
    { q:'Correct: Why you are sad?', a:'Why are you sad?' }
  ],

  complete:[
    { q:'Where do you ___?', a:'... live / work / study' },
    { q:'What time do you ___?', a:'... wake up / start work' },
    { q:'Why did you ___?', a:'... choose this job / come here' }
  ],

  speaking:{
    prompt:'Interview me. Ask eight questions about my life — four yes/no and four wh- questions.',
    cues:['Ask me about my routine.','Ask me about last weekend.','Ask me something you are really curious about.']
  },

  questions:[
    'What questions do you usually ask when you meet someone new?',
    'What would you ask your favourite artist if you met them?',
    'What is a question people often ask you?'
  ],

  review:{
    key:['Auxiliary <b>first</b>','After do/does/did → base form','"to be" just swaps places'],
    oneLiner:'Do you...? Where do you...? — the helper always leads.'
  }
},

/* ══════════════ 11 · NEGATION (A1) ══════════════ */
'negation-basic':{
  id:'negation-basic', category:'negation', level:'A1', order:1,
  title:'Saying no — don\'t, doesn\'t, isn\'t',
  short:'don\'t / doesn\'t / isn\'t',
  goal:'Make negatives without the double-negative trap.',

  explain:{
    text:'English is strict about negation: <b>one negative per sentence</b>. Portuguese happily says <i>não vi ninguém</i> — two negatives. English says <i>I didn\'t see anybody</i> — one negative, then "anybody".',
    points:[
      'Main verbs: <b>don\'t / doesn\'t / didn\'t</b> + base verb — <i>I don\'t work on Sundays.</i>',
      '"to be": just add <b>not</b> — <i>She isn\'t tired. They aren\'t here.</i>',
      'After doesn\'t/didn\'t, the verb loses its ending: <i>He doesn\'t <b>work</b></i>, not "works".',
      'One negative only: <b>never</b>, <b>nobody</b>, <b>nothing</b> already carry it.',
      'With a negative verb, switch to <b>any-</b>: <i>I don\'t have <b>any</b>thing.</i>'
    ]
  },

  examples:[
    { use:'① don\'t / doesn\'t / didn\'t', items:['I <b>don\'t</b> drink alcohol.','She <b>doesn\'t</b> like coffee.','We <b>didn\'t</b> go out yesterday.'] },
    { use:'② to be + not', items:['He <b>isn\'t</b> at home.','They <b>aren\'t</b> ready.','I <b>wasn\'t</b> tired.'] },
    { use:'③ one negative only', items:['I saw <b>nobody</b>. / I <b>didn\'t</b> see <b>anybody</b>.','There is <b>nothing</b> here. / There <b>isn\'t anything</b> here.','I <b>never</b> smoke.'] }
  ],

  mistakes:[
    { bad:'I don\'t know nothing.', good:'I don\'t know <b>anything</b>. / I know <b>nothing</b>.', why:'Only one negative per sentence.' },
    { bad:'She doesn\'t likes tea.', good:'She doesn\'t <b>like</b> tea.', why:'"Doesn\'t" already carries the -s.' },
    { bad:'I not understand.', good:'I <b>don\'t</b> understand.', why:'Main verbs need do/does/did.' },
    { bad:'He don\'t work here.', good:'He <b>doesn\'t</b> work here.', why:'He/she/it → doesn\'t.' },
    { bad:'I didn\'t went.', good:'I didn\'t <b>go</b>.', why:'"Didn\'t" already marks the past.' }
  ],

  exercises:[
    { q:'I ___ (not / like) horror films.', a:'don\'t like' },
    { q:'She ___ (not / have) a car.', a:'doesn\'t have' },
    { q:'They ___ (not / be) at the party.', a:'weren\'t / aren\'t' },
    { q:'Correct: I don\'t need nothing.', a:'I don\'t need anything.' },
    { q:'Correct: He doesn\'t works on Fridays.', a:'He doesn\'t work on Fridays.' },
    { q:'Correct: We didn\'t saw the film.', a:'We didn\'t see the film.' }
  ],

  complete:[
    { q:'I don\'t ___ very often.', a:'... go out / cook' },
    { q:'My best friend doesn\'t ___', a:'... eat meat / like flying' },
    { q:'I never ___', a:'... skip breakfast / work weekends' }
  ],

  speaking:{
    prompt:'Tell me five things you don\'t do — and be careful: only one negative per sentence.',
    cues:['What don\'t you like eating?','What did you not do last weekend?','What is something you never do?']
  },

  questions:[
    'What is something popular that you don\'t enjoy?',
    'What did you not have time for this week?',
    'Is there something you never do, even if people ask you to?'
  ],

  review:{
    key:['don\'t / doesn\'t / didn\'t + base verb','"to be" takes only <b>not</b>','<b>One</b> negative per sentence'],
    oneLiner:'não vi ninguém → I didn\'t see anybody. Drop the second negative.'
  }
},

/* ══════════════ 12 · SENTENCE STRUCTURE (A2) ══════════════ */
'sentence-building':{
  id:'sentence-building', category:'sentence', level:'A2', order:1,
  title:'Building longer sentences',
  short:'simple → compound → complex',
  goal:'Move from short choppy sentences to natural connected speech.',

  explain:{
    text:'A sentence needs one thing to exist: a subject and a verb. Everything after that is expansion. The jump from A1 to A2 is mostly the jump from one clause to two.',
    points:[
      '<b>Simple</b> — one idea: <i>I work in a hospital.</i>',
      '<b>Compound</b> — two equal ideas joined by and / but / so / or: <i>I work in a hospital <b>and</b> I study at night.</i>',
      '<b>Complex</b> — one main idea + one dependent: <i>I study at night <b>because</b> I work all day.</i>',
      'Dependent clauses start with: <i>because, when, if, although, while, after, before</i>.',
      'If the dependent clause comes first, use a comma: <i>When I finish work, I go to the gym.</i>',
      'A dependent clause cannot stand alone: <i>Because I was tired.</i> ✗'
    ]
  },

  examples:[
    { use:'① simple', items:['She lives in Curitiba.','They have two children.','I speak three languages.'] },
    { use:'② compound', items:['I wanted to go <b>but</b> I was busy.','She studies English <b>and</b> she works full time.','It was raining, <b>so</b> we stayed in.'] },
    { use:'③ complex', items:['<b>When</b> I finish work, I go home.','I will call you <b>if</b> I have time.','<b>Although</b> it was expensive, we bought it.','She was happy <b>because</b> her son visited.'] }
  ],

  mistakes:[
    { bad:'Because I was tired.', good:'I went to bed <b>because I was tired</b>.', why:'A dependent clause needs a main clause to lean on.' },
    { bad:'When I will arrive, I will call you.', good:'<b>When I arrive</b>, I will call you.', why:'After "when" and "if", use the present for future meaning.' },
    { bad:'I work and study and I have two kids and I am tired.', good:'I work <b>and</b> study. <b>Since</b> I have two kids, I am always tired.', why:'Vary the connectors — chains of "and" sound like a child.' },
    { bad:'Although it was expensive, but we bought it.', good:'<b>Although</b> it was expensive, we bought it.', why:'One connector per relationship.' }
  ],

  exercises:[
    { q:'Join: I was tired. I went to bed. (so)', a:'I was tired, so I went to bed.' },
    { q:'Join: It was raining. We went out. (although)', a:'Although it was raining, we went out.' },
    { q:'Join: I finish work. I call my mother. (when)', a:'When I finish work, I call my mother.' },
    { q:'Correct: If I will have time, I will help you.', a:'If I have time, I will help you.' },
    { q:'Correct: Because it was late.', a:'We left because it was late.' }
  ],

  complete:[
    { q:'I study English because ___', a:'... I want to work abroad' },
    { q:'When I have free time, ___', a:'... I read / I go for a walk' },
    { q:'Although my job is hard, ___', a:'... I really enjoy it' }
  ],

  speaking:{
    prompt:'Tell me your life story in six sentences. At least two must be complex — use because, when or although.',
    cues:['Tell me about your work using two connected ideas.','Describe your perfect weekend with when and if.','Talk about a hard decision using although.']
  },

  questions:[
    'What do you do when you have a difficult day?',
    'If you had one free month, what would you do?',
    'Although life is busy, what always makes time for itself?',
    'Tell me about a decision you made because of someone else.'
  ],

  review:{
    key:['Simple = 1 clause','Compound = 2 equal clauses','Complex = main + dependent','Comma when the dependent comes first'],
    oneLiner:'Two ideas per sentence is the whole jump from A1 to A2.'
  }
}

};

/* ============================================================
   AUTO-REGISTRO NO LEARNING PROGRESS
   ------------------------------------------------------------
   O módulo se apresenta ao registro compartilhado. Nenhum outro
   arquivo precisa saber que este existe — é exatamente o contrato
   documentado em platform-content.js.
   ============================================================ */
(function registerStructures(){
  try{
    var NS = window.TeacherLu = window.TeacherLu || {};

    var CATS = {};
    window.STRUCTURES_CATEGORIES.forEach(function(c){ CATS[c.id] = c; });

    var provider = {
      id: 'language-structures',
      skill: 'structures',
      label: 'Language Structures',
      load: function(){
        return Object.keys(window.STRUCTURES_TOPICS).map(function(k){
          return window.STRUCTURES_TOPICS[k];
        });
      },
      map: function(t, i){
        var cat = CATS[t.category] || { label: t.category, order: 99 };
        return {
          key:      t.id,
          title:    t.title,
          subtitle: cat.label,
          level:    t.level || '',
          order:    (cat.order || 99) * 100 + (t.order || i)
        };
      }
    };
    /* Se o registro ainda nao carregou, enfileira: platform-content.js drena.
       Assim a ordem dos <script> deixa de importar. */
    if (NS.Content) NS.Content.register(provider);
    else (NS.__pendingProviders = NS.__pendingProviders || []).push(provider);
  }catch(e){
    console.warn('[structures] could not register with Learning Progress', e);
  }
})();
