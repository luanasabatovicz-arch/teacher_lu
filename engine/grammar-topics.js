/* ============================================================
   GRAMMAR ENGINE v1 — CONTEÚDO (só dados; o motor nunca muda)
   4 tópicos migrados. Schema: 6 slots + §1–§10 + C2/C3.
   {name} = nome do aluno (personalização G7).
   ============================================================ */
/* window.ENGINE_TOPICS (não const): const/let no topo de um <script> NÃO viram
   propriedade de window, e grammar.html decide usar o engine testando
   window.ENGINE_TOPICS. Com const, a checagem falhava e a página caía sempre
   no renderizador legado. */
window.ENGINE_TOPICS={

/* ══════════════ 1 · VERB TO BE — PRESENT (A1) ══════════════ */
'verb-to-be':{
  id:'verb-to-be', name:'Verb to be — Present', short:'Verb to be', level:'A1', family:'tense',
  slots:{
    form:'am / is / are (+ contrações)', meaning:'identidade, estado, origem, idade — quem/como algo É agora',
    use:{yes:['name & age','feelings','where you are / are from','jobs & descriptions'],no:['actions ("I am work" ✗)','age with have ("I have 25 years" ✗)']},
    contrast:'Present Simple (ações) — be não usa do/does', ptTrap:{bad:'I have 25 years',good:'I am 25 years old',why:'idade em inglês É, não SE TEM'},
    visual:'now'
  },
  goal:{ can:'introduce themselves and describe people they love — name, age, feelings and city', kid:'present their family like a TV star — names, ages and feelings', teaser:'...the first verb of English, and you\'ll own it today.' },
  examples:{
    byUse:[
      {use:'① Name & identity — who someone is',ex:['I <b>am</b> Lu.','My name <b>is</b> Ana.','They <b>are</b> my students.','You <b>are</b> a teacher.']},
      {use:'② Origin — where someone is from',ex:['I <b>am</b> from Brazil.','She <b>is</b> from Japan.','<b>Are</b> you from here?','We <b>are</b> from Curitiba.']},
      {use:'③ Age — how old someone is',ex:['I <b>am</b> 25 (years old).','He <b>is</b> 40.','How old <b>are</b> you?','My dog <b>is</b> 3.']},
      {use:'④ Feelings & states — how someone is',ex:['I <b>am</b> happy.','She <b>isn\'t</b> tired.','<b>Are</b> you okay?','We <b>are</b> excited!']},
      {use:'⑤ Description — what someone/something is like',ex:['My city <b>is</b> big.','The dogs <b>are</b> small.','It <b>is</b> beautiful.','You <b>are</b> very kind.']}
    ],
    aff:['I <b>am</b> a teacher.','You <b>are</b> my student.','She <b>is</b> from Brazil.','He <b>is</b> 30 years old.','We <b>are</b> happy today.','They <b>are</b> at home.','It <b>is</b> a nice day.','My friends <b>are</b> funny.'],
    neg:['I <b>am not</b> (I\'m not) tired.','You <b>aren\'t</b> late.','She <b>isn\'t</b> from the USA.','We <b>aren\'t</b> ready yet.','It <b>isn\'t</b> cold today.','They <b>aren\'t</b> at school.'],
    q:['<b>Am</b> I right?','<b>Are</b> you a student?','<b>Is</b> she Brazilian?','<b>Are</b> they your friends?','<b>Is</b> it far?','How old <b>are</b> you?'],
    context:['At a party: "Hi, I<b>\'m</b> Ana. I<b>\'m</b> from Curitiba. Nice to meet you!"','Meeting a friend: "You <b>are</b> so happy today! What\'s new?"','On the phone: "Sorry, she <b>isn\'t</b> here right now."','At work: "We <b>are</b> a small team, but we <b>are</b> good."','Introducing family: "This <b>is</b> my brother. He <b>is</b> 15."','Small talk: "<b>Are</b> you tired? It <b>is</b> a long day."'],
    contrast:[
      {bad:'I have 25 years',good:'I am 25 (years old)',why:'idade em inglês é com "be", não "have"'},
      {bad:'She happy',good:'She IS happy',why:'o "be" não pode sumir'},
      {bad:'They is my friends',good:'They ARE my friends',why:'they → are'},
      {bad:'You is nice',good:'You ARE nice',why:'you → are, nunca is'},
      {bad:'Is very hot today',good:'IT is very hot today',why:'o "be" precisa de sujeito (it)'}
    ]
  },
  explain:[
    {title:'What "be" really means',text:'"Be" is not an action. It tells us WHO or HOW someone/something IS — identity, origin, age, feelings, description. If there is no action, "be" is usually the verb.',ex:['I <b>am</b> a teacher. (identity)','She <b>is</b> tired. (feeling)','It <b>is</b> cold. (description)']},
    {title:'It changes with the person (the only verb that does this in 3 ways)',text:'Learn the three pairs and you own the verb: I → am · he / she / it → is · you / we / they → are.',ex:['I <b>am</b> · You <b>are</b> · He <b>is</b>','She <b>is</b> · We <b>are</b> · They <b>are</b>']},
    {title:'Negatives — just add "not"',text:'To say no, put "not" after am / is / are. In real speech we shrink it: isn\'t, aren\'t (and I\'m not).',ex:['I <b>am not</b> ready.','She <b>isn\'t</b> here.','We <b>aren\'t</b> late.']},
    {title:'Questions — put "be" first',text:'To ask, move am / is / are to the front. Never use do/does with "be".',ex:['<b>Are</b> you happy?','<b>Is</b> she Brazilian?','<b>Am</b> I right?']},
    {title:'The #1 Brazilian trap — age',text:'Age uses "be", not "have". "I have 25 years" is wrong — in English your age is something you ARE.',ex:['✅ I <b>am</b> 25 years old.','❌ I have 25 years.','✅ How old <b>are</b> you?']}
  ],
  warmup:{
    gap:['Tell me about you — who... you?','Your best friend: how old...?','Your city — it... big? small? beautiful?'],
    kidGame:'30s challenge — point at 3 things and say what they are!',
    hint:'Point at yourself: "I...?" — one word.'
  },
  notice:{
    examples:['I <b>am</b> {name}.','My mom <b>is</b> at home right now.','My friends <b>are</b> funny.','I<b>\'m</b> not tired today.'],
    altExamples:['You <b>are</b> my student.','{name} <b>is</b> from Brazil.','We <b>are</b> in class now.','It <b>is</b>n\'t cold today.'],
    qs:{form:'Which little words appear in every sentence?',meaning:'Is this about actions — or about who/how people ARE?'},
    hints:['Point at am / is / are — say them aloud.','Cover the little word — does the sentence still work?','Is it one word for everybody, or does it change with the person?']
  },
  ccqs:{
    main:[
      {q:'"I am 25." — Am I talking about an action or about me?',a:'about me / who I am'},
      {q:'"She is happy." — Is this now or yesterday?',a:'now'},
      {q:'"They are from Brazil." — One person or more?',a:'more (they)'},
      {q:'"I am at home." — Where am I?',a:'at home'},
      {q:'"He is 200 years old." — Possible? 😄',a:'no! (absurdo p/ negar rindo)'}
    ],
    reserve:[
      {q:'Point at yourself. Which word: am, is or are?',a:'am'},
      {q:'Point at me. Which word?',a:'are (you)'},
      {q:'"My dog is big." — Is the dog DOING something?',a:'no — it just IS big'}
    ]
  },
  rule:{
    text:'"be" is the verb of WHO and HOW: name, age, feelings, origin, descriptions. It changes with the person: I <b>am</b> · he/she/it <b>is</b> · you/we/they <b>are</b>. Use it now, about states — never for actions (for actions you use other verbs, no "be").',
    kid:'BE = the "who & how" word! I <b>am</b> · she <b>is</b> · they <b>are</b>. Look at the picture!',
    pron:'Contractions are the real English: I\'m /aɪm/, she\'s /ʃiːz/, they\'re /ðeər/. Full forms sound robotic.',
    pt:'Português: "eu TENHO 25 anos" → inglês: "I AM 25". Idade é estado, não posse.',
    why:'Mostre 2 frases: "I am happy" (estado) vs "I play" (ação) — be só entra na primeira.'
  },
  watchout:[
    {bad:'I have 25 years',good:'I am 25 (years old)',why:'idade = be, nunca have'},
    {bad:'She happy',good:'She IS happy',why:'be não pode sumir'},
    {bad:'Is very hot today',good:'IT is very hot today',why:'be sempre precisa de sujeito'},
    {bad:'They is my friends',good:'They ARE my friends',why:'they → are, sempre'}
  ],
  practice:[
    {t:'fill',q:'I ___ fine, and I ___ ready for class.',a:'am / am',hint:'Same word twice — the "I" word.',fu:'Now say it about ME.',
     why:'"I" nunca usa "is" nem "are" — só "am".',ruleRef:'I → am',ex:'I am happy. I am here.'},
    {t:'fill',q:'My best friend ___ very smart.',a:'is',hint:'One person → i...',fu:'Really? And how old is he/she?',
     why:'uma pessoa (he/she) usa "is", não "are".',ruleRef:'he / she / it → is',ex:'My mother is a nurse.'},
    {t:'fill',q:'My parents ___ at work right now.',a:'are',hint:'Two people → a...',fu:'And where are YOU right now?',
     why:'plural (they) pede "are", nunca "is".',ruleRef:'you / we / they → are',ex:'My friends are here.'},
    {t:'fill',q:'You ___ a really good student.',a:'are',hint:'"you" → a...',fu:'Say something nice about me with "are".',
     why:'"you" sempre usa "are" — nunca "is".',ruleRef:'you → are',ex:'You are kind.'},
    {t:'fill',q:'It ___ cold today.',a:'is',hint:'weather = it → i...',fu:'Is it hot or cold where you are?',
     why:'o tempo/uma coisa (it) usa "is".',ruleRef:'it → is',ex:'It is a nice day.'},
    {t:'mc',q:'"My city ___ beautiful."',opts:['am','is','are'],a:'B — is',hint:'city = it.',fu:'Why not C? And IS your city beautiful?',
     why:'"city" é uma coisa (it) → is; "are" seria só no plural (cities).',ruleRef:'it → is',ex:'The house is big.'},
    {t:'mc',q:'"___ you happy today?"',opts:['Is','Am','Are'],a:'C — Are',hint:'with "you", one of the three is always the right one.',fu:'So — ARE you? Why?',
     why:'com "you" a pergunta começa sempre com "Are".',ruleRef:'question: Are you...?',ex:'Are you tired?'},
    {t:'mc',q:'"I ___ not from the USA."',opts:['am','is','are'],a:'A — am',hint:'I → only one option ever.',fu:'Where are you from? Full sentence!',
     why:'"I" só combina com "am" — inclusive na negativa (I\'m not).',ruleRef:'I → am',ex:'I am not ready.'},
    {t:'mc',q:'"My brothers ___ tall."',opts:['am','is','are'],a:'C — are',hint:'brothers = they.',fu:'Who is tall in your family?',
     why:'"brothers" é plural (they) → are; "is" seria só p/ uma pessoa.',ruleRef:'they → are',ex:'My friends are here.'},
    {t:'mc',q:'"___ she your teacher?"',opts:['Am','Is','Are'],a:'B — Is',hint:'she → the question starts with...',fu:'And AM I your teacher? Answer with "You are..."',
     why:'"she" usa "is", e a pergunta começa com "Is".',ruleRef:'question: Is she...?',ex:'Is he ready?'},
    {t:'us',q:'is / my / hungry / dog',a:'My dog is hungry.',hint:'Start with WHOSE dog.',fu:'Is YOUR pet hungry right now?',
     why:'o sujeito vem primeiro, depois "is" e o adjetivo.',ruleRef:'subject + is + adjective',ex:'My cat is small.'},
    {t:'us',q:'are / we / class / in / English',a:'We are in English class.',hint:'Who first, then are.',fu:'True or false right now?',
     why:'"we" pede "are"; o lugar fecha a frase.',ruleRef:'we → are',ex:'We are at home.'},
    {t:'us',q:'from / she / Brazil / is',a:'She is from Brazil.',hint:'Who first, then is.',fu:'And where are YOU from?',
     why:'sujeito + is + o resto; "she" → is.',ruleRef:'she → is',ex:'He is from Rio.'},
    {t:'ec',q:'My sister have 10 years.',a:'My sister IS 10 (years old).',hint:'Age: be, not have.',fu:'How old is someone in YOUR family?',
     why:'idade em inglês é com "be" (não "have"): não "have 10 years".',ruleRef:'age → be (She is 10)',ex:'I am 20 years old.'},
    {t:'ec',q:'You is my teacher.',a:'You ARE my teacher.',hint:'"you" never takes "is" — you → are.',fu:'Say one more thing about me with "are".',
     why:'"you" nunca usa "is" — sempre "are".',ruleRef:'you → are',ex:'You are kind.'},
    {t:'ec',q:'We is happy today.',a:'We ARE happy today.',hint:'we → are.',fu:'Are you happy today? Why?',
     why:'"we" pede "are", nunca "is".',ruleRef:'we → are',ex:'We are ready.'},
    {t:'tr',q:'Make it negative: "I am hungry."',a:'I am NOT hungry. / I\'m not hungry.',hint:'Add one small word after am.',fu:'Is it true? Are you hungry right now?',
     why:'a negativa é só "not" depois de am/is/are — o verbo não muda.',ruleRef:'negative: am/is/are + not',ex:'She is not tired.'},
    {t:'tr',q:'Make it a question: "She is Brazilian."',a:'IS she Brazilian?',hint:'Move "is" to the front.',fu:'Ask me a question with "Are you...?"',
     why:'na pergunta, o "be" vai para o começo da frase.',ruleRef:'question: is/are + subject?',ex:'Are they ready?'}
  ],
  practiceMore:[
    {t:'cq',q:'I say: "I\'m Lu, I\'m from Curitiba, and I\'m a teacher." Now YOU — introduce yourself the same way (3 sentences).',a:'e.g. "I\'m Ana, I\'m from São Paulo, and I\'m a student."',fu:'Now add: how are you feeling today?'},
    {t:'cq',q:'Look at me — am I a teacher or a student? Answer in a FULL sentence.',a:'You are a teacher.',fu:'And is this class in the morning or the evening?'},
    {t:'cq',q:'Tell me about one person in your family: who is he/she, and how old?',a:'e.g. "This is my brother. He is 15 years old."',fu:'Is he/she happy today?',
     why:'lembre: "he IS 15", não "he have 15".',ruleRef:'he/she → is · age → be',ex:'My sister is 20.'},
    {t:'md',lines:['A: Hi! What ___ your name?','B: My name ___ Ana.','A: ___ you a student?','B: No, I ___ a nurse.'],a:'is · is · Are · am (I\'m)',fu:'Now swap roles and do it about YOU.'},
    {t:'md',lines:['A: Where ___ you from?','B: I ___ from Brazil. And you?','A: I ___ from Italy.','B: Nice! ___ it a big country?'],a:'are · am (I\'m) · am (I\'m) · Is',fu:'Ask ME one more question with "Are you...?"'},
    {t:'cq',q:'Describe where you are right now in 2 sentences (use is / are).',a:'e.g. "It is a small room. The walls are white."',fu:'Is it warm or cold in there?'},
    {t:'md',lines:['A: ___ you tired?','B: No, I ___ fine. And you?','A: I ___ a little tired today.','B: ___ it a hard day?'],a:'Are · am (I\'m) · am (I\'m) · Is',fu:'Now say the TRUE version about you right now.'}
  ],
  c3:{
    fill:[{q:'I ___ happy.',a:'am',hint:'The "I" word.',fu:'Show me a happy face!'},{q:'She ___ my friend.',a:'is',hint:'One person.',fu:'Who IS your friend?'}],
    mc:[{q:'"He ___ tall."',opts:['am','is','are'],a:'B — is',hint:'he = 1 person.',fu:'Who is tall in your family?'},{q:'"They ___ happy."',opts:['is','are','am'],a:'B — are',hint:'they = many.',fu:'And you?'}],
    us:[{q:'am / I / happy',a:'I am happy.',hint:'I first.',fu:'True?'},{q:'is / big / it',a:'It is big.',hint:'It first.',fu:'What is big in this room?'}],
    ec:[{q:'I is a student.',a:'I AM a student.',hint:'I → am.',fu:'And I am a...?'},{q:'We is friends.',a:'We ARE friends.',hint:'we → are.',fu:'Are we?'}],
    tr:[{q:'Negative: "He is sad."',a:'He is NOT sad.',hint:'not after is.',fu:'Is he happy then?'},{q:'Question: "You are ready."',a:'ARE you ready?',hint:'are goes first.',fu:'Answer it!'}]
  },
  makeit:['I am ______ (how do you feel right now?).','My favorite person is ______ — he/she is ______.','My ______ and I are... (family/friends)','Right now, my phone is... (where? how?)','In my house, my ______ is very old.','Ask ME: "Are you...?" — anything you want!'],
  task:{
    title:'The Interview',
    mission:'You are famous — a reporter (me!) interviews you live. Answer at least 6 questions about you, your family and your city. The interview ends when the audience knows WHO you are.',
    kid:'You are a SUPERSTAR on TV! I am the reporter. Tell the audience who you are, your age, your family and your favorite things!',
    roles:{student:'the famous guest — answers in full sentences, asks the reporter 1 question back',teacher:'the reporter — asks, reacts, takes notes (no corrections now)'},
    complication:'The reporter got your info WRONG ("So, you are 40 and from Argentina, right?") — correct them politely!',
    extras:['The microphone "breaks" — repeat your 2 best answers louder and clearer.','A second guest arrives (teacher voice change): introduce yourself to them.'],
    rescue:['name?','age?','from?','family?','feelings?'],
    c4:'Formal version: it\'s a JOB interview now — "I am organized, I am calm, I am good with people." Same verb, new register.'
  },
  exit:[
    {tag:'🗣 speak',q:'In 4 sentences: who are you? (name, age, from, one feeling)'},
    {tag:'🗣 speak',q:'Describe one person in your family: who is he/she? how old? how is he/she today?'},
    {tag:'✏ create',q:'Make a sentence about US with "are".'},
    {tag:'✏ create',q:'Make a NEGATIVE sentence about your city.',a:'aceite qualquer isn\'t/aren\'t correta ("My city isn\'t small.")'},
    {tag:'⚠ fix it',q:'"My brother have 15 years."',a:'My brother IS 15 (years old).'},
    {tag:'💭 concept',q:'When do we use am/is/are — and when NOT? One example of each.',a:'estados/identidade sim; ações não (I am happy ✓ / I am work ✗)'}
  ]
},

/* ══════════════ 2 · PRESENT SIMPLE (A1) ══════════════ */
'present-simple':{
  id:'present-simple', name:'Present Simple', short:'Present Simple', level:'A1', family:'tense',
  slots:{
    form:'verbo base; he/she/it + -s · negativa/pergunta com do/does', meaning:'rotinas, hábitos, fatos — o que acontece sempre/regularmente',
    use:{yes:['every day / always / usually','routines & habits','facts ("Brazilians drink a lot of coffee")','likes & dislikes'],no:['only this exact moment','things already finished (yesterday)']},
    contrast:'Present Continuous (agora) — simple é rotina, não momento', ptTrap:{bad:'She don\'t like',good:'She doesn\'t like',why:'he/she/it exige does'},
    visual:'routine'
  },
  goal:{ can:'describe a normal day of their life — work, meals, hobbies — and ask about mine', kid:'tell me their whole day like a story — morning to night!', teaser:'...and catch the famous "-s" that everyone forgets.' },
  warmup:{
    gap:['What... you... every morning? (tente contar!)','Your best friend — what... he/she... on weekends?','One thing... you... every single day? (qual?)'],
    kidGame:'Mime 3 things you do every day — I guess!',
    hint:'"Every day I..." — one action, one word.'
  },
  notice:{
    examples:['I <b>drink</b> coffee every morning.','{name} <b>studies</b> English on Tuesdays.','My mom <b>works</b> a lot.','We <b>don\'t watch</b> TV in the morning.'],
    altExamples:['I <b>wake up</b> early.','My friend <b>plays</b> videogames every night.','She <b>doesn\'t eat</b> meat.','They <b>live</b> in Curitiba.'],
    qs:{form:'Look at the verbs — when does the little "-s" appear?',meaning:'Is this happening NOW, at this second — or always/regularly?'},
    hints:['Compare "I drink" and "she studieS" — what\'s different?','Who gets the -s: I? you? she?','Two ideas: (A) -s is for he/she/it · (B) -s is random. Which one?']
  },
  ccqs:{
    main:[
      {q:'"I drink coffee every morning." — Am I drinking coffee right now?',a:'no (não precisa) — é hábito'},
      {q:'"She works at a bank." — Today only, or in general?',a:'in general'},
      {q:'"He plays football on Sundays." — How often?',a:'every Sunday / regularly'},
      {q:'"I don\'t eat sushi." — Never, or just not now?',a:'in general / never'},
      {q:'"My cat speaks English every day." — Normal? 😄',a:'no! (fato absurdo)'}
    ],
    reserve:[
      {q:'You brush your teeth every day. NOW, this second — are you brushing?',a:'no'},
      {q:'"The sun rises in the east." — True yesterday? Today? Tomorrow?',a:'always — fact'},
      {q:'Point at the timeline: is "every day" ONE dot or MANY dots?',a:'many'}
    ]
  },
  rule:{
    text:'Present Simple = things that repeat or are always true: routines, habits, facts, likes. Base verb for I/you/we/they; <b>he/she/it takes -s</b>. Negatives and questions call the helpers: <b>don\'t / doesn\'t</b>, <b>Do / Does</b> — and then the verb goes back to base form. Not for what\'s happening this exact second.',
    kid:'Every day = Present Simple! I play · she playS (the S is for he/she/it!). Don\'t / doesn\'t say NO.',
    pron:'The -s has 3 sounds: works /s/ · plays /z/ · watches /ɪz/. Say them: s-z-iz!',
    pt:'Português não tem o "-s" do he/she/it nem o "do/does" — por isso brasileiro esquece os dois. É o par de armadilhas nº1.',
    why:'Regra de ouro: quando do/does entra, o -s sai do verbo ("Does she work?" — work sem s).'
  },
  watchout:[
    {bad:'She don\'t like coffee',good:'She DOESN\'T like coffee',why:'he/she/it → does'},
    {bad:'He work every day',good:'He workS every day',why:'he/she/it → -s'},
    {bad:'Do she play?',good:'DOES she play?',why:'she → does'},
    {bad:'She doesn\'t likes it',good:'She doesn\'t like it',why:'does entrou → -s sai'}
  ],
  practice:[
    {t:'fill',q:'I ___ (wake up) at 7 every day.',a:'wake up',hint:'I → base verb, no -s.',fu:'And what time do YOU really wake up?'},
    {t:'fill',q:'My mom ___ (make) amazing food.',a:'makes',hint:'she → -s.',fu:'What does she make? Tell me!'},
    {t:'fill',q:'We ___ (not/study) on Sundays.',a:'don\'t study',hint:'we → don\'t + verb.',fu:'What do you do on Sundays then?'},
    {t:'mc',q:'"___ your friend play videogames?"',opts:['Do','Does','Is'],a:'B — Does',hint:'your friend = he/she.',fu:'Why not A? And does your friend play?'},
    {t:'mc',q:'"My grandparents ___ near here."',opts:['lives','live','living'],a:'B — live',hint:'grandparents = they → base verb.',fu:'And where do YOUR grandparents live?'},
    {t:'mc',q:'"She ___ coffee."',opts:['don\'t drink','doesn\'t drink','doesn\'t drinks'],a:'B — doesn\'t drink',hint:'does came in → -s goes out.',fu:'Why not C? That\'s the famous trap!'},
    {t:'us',q:'every Sunday / cooks / my / lunch / dad',a:'My dad cooks lunch every Sunday.',hint:'Who first, time last.',fu:'Who cooks in YOUR house — and what do they cook?'},
    {t:'us',q:'don\'t / we / coffee / at night / drink',a:'We don\'t drink coffee at night.',hint:'don\'t before the verb.',fu:'And in YOUR house? What do you drink at night?'},
    {t:'ec',q:'My dad work on Saturdays.',a:'My dad workS on Saturdays.',hint:'dad = he.',fu:'Does anyone in your family work on weekends?'},
    {t:'ec',q:'She don\'t eat meat.',a:'She DOESN\'T eat meat.',hint:'she → doesn\'t.',fu:'Do you know a vegetarian? Who?'},
    {t:'tr',q:'Make it a question: "He speaks English."',a:'DOES he speak English?',hint:'Does first — and the -s leaves.',fu:'Now ask me about MY routine.'},
    {t:'tr',q:'Make it negative: "I like Mondays."',a:'I DON\'T like Mondays.',hint:'don\'t before like.',fu:'Is it true for you? Why?'}
  ],
  c3:{
    fill:[{q:'She ___ (like) music.',a:'likes',hint:'she → -s.',fu:'What music does she like?'},{q:'I ___ (play) on weekends.',a:'play',hint:'I → no -s.',fu:'Play what?'}],
    mc:[{q:'"He ___ TV."',opts:['watch','watches'],a:'B — watches',hint:'he → -es.',fu:'What does HE watch?'},{q:'"I ___ like tea."',opts:['don\'t','doesn\'t'],a:'A — don\'t',hint:'I → don\'t.',fu:'Coffee or tea?'}],
    us:[{q:'plays / he / football',a:'He plays football.',hint:'He first.',fu:'And you?'},{q:'like / I / pizza',a:'I like pizza.',hint:'I first.',fu:'Which pizza?'}],
    ec:[{q:'He like pizza.',a:'He likeS pizza.',hint:'he → -s.',fu:'Favorite pizza?'},{q:'I doesn\'t work.',a:'I DON\'T work.',hint:'I → don\'t.',fu:'Do you study or work?'}],
    tr:[{q:'Question: "You like coffee."',a:'DO you like coffee?',hint:'Do first.',fu:'Answer it!'},{q:'Negative: "She works."',a:'She DOESN\'T work.',hint:'doesn\'t + base.',fu:'Who works in your family?'}]
  },
  makeit:['Every morning, I ______ before anything else.','My ______ (person) always... — it\'s so funny/annoying!','I never ______ — never ever!','On weekends, my family usually...','One thing I do that my friends DON\'T do is...','Ask ME about my routine: "Do you...?"'],
  task:{
    title:'Routine Detective',
    mission:'I am a "suspect" 🕵️ and you are the detective. Interrogate me about my daily routine (at least 7 questions with Do/Does + what time/when). Then decide: is my alibi solid — or do I have a secret?',
    kid:'You are a detective! 🕵️ Ask me about my day (7+ questions) and find my SECRET habit. No question, no clue — keep asking!',
    roles:{student:'the detective — asks all the questions, takes "notes", announces the conclusion',teacher:'the suspect — answers with juicy details, hides one strange habit until asked the right question'},
    complication:'The suspect gives a suspicious answer ("I feed my crocodile at 6am") — the detective must follow up with 2 more questions about it!',
    extras:['A "witness" (teacher, new voice) contradicts one answer — detective re-checks with the suspect.','Time pressure: the boss calls — solve the case in 4 more questions, maximum.'],
    rescue:['What time...?','Do you...?','Does your...?','How often...?'],
    c4:'Switch: now the detective (you, teacher) interrogates {name} — student answers under pressure with full sentences, then delivers the case report ALOUD in 4 sentences.'
  },
  exit:[
    {tag:'🗣 speak',q:'Your perfect Saturday: 4 sentences about what you do.'},
    {tag:'🗣 speak',q:'One person in your family: 3 things he/she does every week.'},
    {tag:'✏ create',q:'A sentence with "never" about you.'},
    {tag:'✏ create',q:'A QUESTION for me with "Does...?"'},
    {tag:'⚠ fix it',q:'"My brother don\'t plays videogames."',a:'My brother DOESN\'T play videogames.'},
    {tag:'💭 concept',q:'Present Simple: when yes, when no? One example of each.',a:'rotina/fato sim ("I work every day"); só este exato momento, não'}
  ]
},

/* ══════════════ 3 · PRESENT CONTINUOUS (A1) ══════════════ */
'present-continuous':{
  id:'present-continuous', name:'Present Continuous', short:'Present Continuous', level:'A1', family:'tense',
  slots:{
    form:'am/is/are + verbo-ing', meaning:'ação acontecendo AGORA ou situação temporária',
    use:{yes:['right now / at the moment','Look! Listen!','temporary situations ("this week")'],no:['routines (→ simple)','state verbs: like, want, know, need'],},
    contrast:'Present Simple — rotina vs agora', ptTrap:{bad:'I am study now',good:'I am studying now',why:'faltou o -ing (o "am" sozinho não basta)'},
    visual:'now-progress'
  },
  goal:{ can:'describe what is happening around them right now — live, like a sports commentator', kid:'be a cartoon narrator — say what everyone is doing right now!', teaser:'...and yes, it can even talk about the future. Teaser for another day!' },
  warmup:{
    gap:['Look out your window — what... happening right now?','Your family, this exact moment: what... they... ?','What... I... right now? (olhe para mim!)'],
    kidGame:'Freeze! I mime, you say what I\'m doing — 3 rounds!',
    hint:'Point out the window: "A man... walk...?" — stretch the word.'
  },
  notice:{
    examples:['I <b>am talking</b> to you right now.','You <b>are learning</b> English at this moment.','My neighbor <b>is making</b> noise again!','Look! It<b>\'s raining</b>.'],
    altExamples:['{name} <b>is sitting</b> in front of the screen.','We <b>are studying</b> together now.','My phone <b>is charging</b>.','The dogs outside <b>are barking</b>.'],
    qs:{form:'Two pieces in every verb — which are they?',meaning:'Is this a habit — or is it happening THIS second?'},
    hints:['Point at am/is/are... and then what ending?','Cover the -ing — does "I am talk" sound complete?','Two hypotheses: (A) be + -ing together · (B) only -ing. Test both.']
  },
  ccqs:{
    main:[
      {q:'"I am drinking coffee." — Is the coffee in my hand NOW?',a:'yes'},
      {q:'"She is working from home this week." — Forever, or temporary?',a:'temporary'},
      {q:'"Look! It\'s raining." — Can I see it at this moment?',a:'yes'},
      {q:'"They are sleeping." — Are they awake?',a:'no'},
      {q:'"The sofa is running in the park." — Possible? 😄',a:'no!'}
    ],
    reserve:[
      {q:'I do THIS (professora encena beber água) — what am I doing? Now or every day?',a:'drinking — now'},
      {q:'"I play tennis" vs "I am playing tennis" — which one has a racket in my hand RIGHT NOW?',a:'the second'},
      {q:'On the timeline: is "now" a long line or one moment in progress?',a:'in progress, around now'}
    ]
  },
  rule:{
    text:'Present Continuous = action in progress around NOW, or a temporary situation. Two pieces, always together: <b>am/is/are + verb-ing</b>. If one piece is missing, it breaks. Not for routines, and not for state verbs (like, want, know — these stay simple).',
    kid:'NOW = be + ing! I am playING · she is eatING. Both pieces or it breaks!',
    pron:'-ing = /ɪŋ/ (nasal, sem "gue" no final): playing /ˈpleɪɪŋ/, not "playin-gue". Spelling: run→ruNNing, make→makIng.',
    pt:'Igualzinho ao gerúndio do PT ("estou estudando") — o perigo é esquecer o be: "I studying" = "eu estudando" sem o "estou".',
    why:'be é o motor, -ing é a roda: "I am study" (sem roda) e "I studying" (sem motor) — os dois quebram.'
  },
  watchout:[
    {bad:'I am study now',good:'I am studyING now',why:'faltou o -ing'},
    {bad:'She working today',good:'She IS working today',why:'faltou o be'},
    {bad:'I am wanting a pizza',good:'I want a pizza',why:'want é estado — sem -ing'},
    {bad:'It\'s rainning',good:'It\'s raining',why:'rain não dobra o n'}
  ],
  practice:[
    {t:'fill',q:'Right now, I ___ (use) my computer.',a:'am using',hint:'Two pieces: am + ...ing (use → using).',fu:'And what ELSE are you doing right now?'},
    {t:'fill',q:'Shh! The baby ___ (sleep).',a:'is sleeping',hint:'baby = it/she → is + ing.',fu:'Who is sleeping in your house right now, probably?'},
    {t:'fill',q:'My friends ___ (not/study) right now, I\'m sure!',a:'aren\'t studying',hint:'are + not + ing.',fu:'What are they probably doing?'},
    {t:'mc',q:'"Look! The kids ___ outside."',opts:['play','are playing','playing'],a:'B — are playing',hint:'"Look!" = this second.',fu:'Why not A? And why not C?'},
    {t:'mc',q:'"___ you listening to me?"',opts:['Do','Is','Are'],a:'C — Are',hint:'you → are, first position.',fu:'ARE you? Prove it — repeat my last sentence! 😄'},
    {t:'mc',q:'"I ___ pizza right now." (want)',opts:['am wanting','want','wanting'],a:'B — want',hint:'want = state verb!',fu:'Why not A? That\'s the state-verb trap. What do you want right now?'},
    {t:'us',q:'is / my / barking / dog / again',a:'My dog is barking again.',hint:'Whose dog first.',fu:'What sounds do you hear right now? Use -ing!'},
    {t:'us',q:'are / we / English / practicing / now',a:'We are practicing English now.',hint:'we are + verb-ing.',fu:'True! And what are we NOT doing?'},
    {t:'ec',q:'She cooking dinner now.',a:'She IS cooking dinner now.',hint:'The motor (be) is missing.',fu:'Who cooks dinner in your house — and are they cooking NOW?'},
    {t:'ec',q:'I am watch a series this week.',a:'I am watchING a series this week.',hint:'The wheel (-ing) is missing.',fu:'Are you watching a series these days? Which one?'},
    {t:'tr',q:'Make it a question: "He is playing videogames."',a:'IS he playing videogames?',hint:'is jumps to the front.',fu:'Ask me what I\'m doing — right now!'},
    {t:'tr',q:'Habit → NOW: "I drink coffee every day." (right now version)',a:'I am drinking coffee right now.',hint:'Add the two pieces.',fu:'And which one is TRUE for you this minute?'}
  ],
  c3:{
    fill:[{q:'I ___ (sit) on my chair.',a:'am sitting',hint:'am + ing.',fu:'Comfortable?'},{q:'She ___ (eat) now.',a:'is eating',hint:'is + ing.',fu:'Eating what, you think?'}],
    mc:[{q:'"They ___ playing."',opts:['is','are'],a:'B — are',hint:'they → are.',fu:'Playing what?'},{q:'"He is ___."',opts:['run','running'],a:'B — running',hint:'-ing, double n.',fu:'Where to?'}],
    us:[{q:'am / I / studying',a:'I am studying.',hint:'I am + ing.',fu:'Studying what?'},{q:'is / raining / it',a:'It is raining.',hint:'It first.',fu:'Now, really?'}],
    ec:[{q:'I studying now.',a:'I AM studying now.',hint:'be missing.',fu:'Studying what?'},{q:'He is play now.',a:'He is playING now.',hint:'-ing missing.',fu:'Playing what?'}],
    tr:[{q:'Question: "She is sleeping."',a:'IS she sleeping?',hint:'Is first.',fu:'Answer: yes or no?'},{q:'Negative: "I am working."',a:'I am NOT working.',hint:'not after am.',fu:'True for you now?'}]
  },
  makeit:['Right now, I am ______ and also ______ (two things!).','My ______ (person) is probably ______ at this moment.','This week, I am ______ (something temporary).','Outside my window, ______ is/are ______-ing right now.','I am NOT ______ right now!','Ask ME: "Are you...?" — about this exact moment.'],
  task:{
    title:'Live Commentator',
    mission:'You are a live TV commentator 🎙. I will act out a scene (silently!). Narrate EVERYTHING that is happening, live, for at least 90 seconds: "She is opening... now she is looking..." The broadcast fails if you stop narrating!',
    kid:'You are the narrator of a cartoon! 📺 I act, you tell the story LIVE: "He is jumping! Now he is hiding!" Don\'t let the show stop!',
    roles:{student:'the commentator — narrates non-stop, in full -ing sentences',teacher:'the actor — mimes a scene with surprises (cooking? finding a spider? dancing?)'},
    complication:'Mid-scene, the "signal drops" — when it returns, the commentator catches the audience up: "She is still...! Now she is...!" (3 sentences, fast).',
    extras:['A second "camera" (teacher points at things in the student\'s room): narrate what is happening THERE.','Slow-motion replay: narrate the best moment again AS IF live — still in -ing, slower and with more detail.'],
    rescue:['open...','look...','hold...','walk...','What is she doing?'],
    c4:'Professional broadcast: narrate a real muted video (or window view) for 2 minutes, formal register: "As we can see, the residents are..."'
  },
  exit:[
    {tag:'🗣 speak',q:'4 sentences: what is happening around you right NOW (room, street, house)?'},
    {tag:'🗣 speak',q:'What are 2 people you love probably doing at this moment?'},
    {tag:'✏ create',q:'A sentence with "Look!" + continuous.'},
    {tag:'✏ create',q:'A NEGATIVE sentence: something you are NOT doing now.'},
    {tag:'⚠ fix it',q:'"My mom cooking dinner now."',a:'My mom IS cooking dinner now.'},
    {tag:'💭 concept',q:'Continuous vs Simple: "I work" / "I am working" — what\'s the difference? Example of each.',a:'rotina vs agora'}
  ]
},

/* ══════════════ 4 · PAST SIMPLE — REGULAR (A1+) ══════════════ */
'past-simple':{
  id:'past-simple', name:'Past Simple — Regular verbs', short:'Past Regular', level:'A1+', family:'tense',
  slots:{
    form:'verbo + -ed · negativa/pergunta com did (verbo volta ao base)', meaning:'ação terminada em tempo definido do passado',
    use:{yes:['yesterday / last week / in 2020','finished actions','stories ("first..., then...")'],no:['things still happening now','routines that continue today']},
    contrast:'Present Perfect — passado com hora marcada vs sem', ptTrap:{bad:'I didn\'t worked',good:'I didn\'t work',why:'did entrou → -ed sai (dupla marcação)'},
    visual:'past-point'
  },
  goal:{ can:'tell me what they did yesterday and last weekend — a real story with beginning and end', kid:'tell yesterday like an adventure story — what happened?!', teaser:'...irregular verbs are next week\'s boss battle. Today: the -ed family.' },
  warmup:{
    gap:['Yesterday — what... you...? (tente me contar!)','Last weekend: where...?','Last night: what... you... (watch? play? listen to?)'],
    kidGame:'Yesterday mime! Act 3 things you did yesterday — I guess.',
    hint:'"Yesterday I..." + verb — stretch it: "play...?"'
  },
  notice:{
    examples:['Last night I <b>listened</b> to music.','{name} <b>studied</b> English last week.','We <b>talked</b> about movies on Monday.','My friend <b>didn\'t answer</b> my message.'],
    altExamples:['Yesterday I <b>worked</b> a lot.','She <b>cooked</b> dinner yesterday.','They <b>played</b> together last Sunday.','I <b>didn\'t like</b> the movie.'],
    qs:{form:'Look at the end of the verbs — what appears? And in the negative one?',meaning:'Is this happening now — or is it finished, with a time tag (yesterday, last week)?'},
    hints:['Point at the last 2 letters of listened, studied, talked.','Compare: "I listen" (today) / "I listenED" (?) — when is the -ed one?','In "didn\'t answer" — where did the -ed go? Who carries the past now?']
  },
  ccqs:{
    main:[
      {q:'"I worked yesterday." — Am I working now?',a:'no — finished'},
      {q:'"She studied last night." — Do we know WHEN?',a:'yes — last night'},
      {q:'"We talked on Monday." — Is the conversation still happening?',a:'no'},
      {q:'"I didn\'t play." — Did I play: yes or no?',a:'no'},
      {q:'"Tomorrow I visited my grandma." — Possible? 😄',a:'no! tomorrow ≠ past'}
    ],
    reserve:[
      {q:'Point at the timeline: "yesterday" — before or after NOW?',a:'before'},
      {q:'"I cooked." — Is the food ready or am I cooking?',a:'ready — finished'},
      {q:'Which word screams "past": now, every day, or last week?',a:'last week'}
    ]
  },
  rule:{
    text:'Past Simple = finished action with a time tag: yesterday, last week, in 2020. Regular verbs take <b>-ed</b> (work → worked). Negatives and questions call <b>did / didn\'t</b> — and the verb drops the -ed and goes back to base: "Did you work?", "I didn\'t work". One past mark per sentence, never two.',
    kid:'Yesterday = verb + ED! play → playED. To say NO: didn\'t + verb (the ED runs away!).',
    pron:'-ed has 3 sounds: worked /t/ · played /d/ · wanted /ɪd/ — only -ted/-ded get an extra syllable.',
    pt:'Como o "-ou/-ei" do português (trabalhou, joguei) — mas no negativo o did rouba o passado do verbo: didn\'t work (não "didn\'t worked"). E "workED" com "É" no fim é o sotaque nº1 do brasileiro.',
    why:'did JÁ é o passado — o verbo não precisa marcar de novo. Dupla marcação = "fui foi".'
  },
  watchout:[
    {bad:'I didn\'t worked',good:'I didn\'t work',why:'did entrou → -ed sai'},
    {bad:'Did you played?',good:'Did you play?',why:'mesma regra na pergunta'},
    {bad:'workED com "é" no fim',good:'worked = /t/ (1 sílaba)',why:'só -ted/-ded ganham sílaba'},
    {bad:'I work yesterday',good:'I workED yesterday',why:'yesterday exige passado'}
  ],
  practice:[
    {t:'fill',q:'Yesterday I ___ (watch) a movie at home.',a:'watched',hint:'verb + ed.',fu:'Which movie did YOU watch last?'},
    {t:'fill',q:'She ___ (study) for the test last night.',a:'studied',hint:'y → ied.',fu:'When did you last study something?'},
    {t:'fill',q:'We ___ (not/talk) yesterday.',a:'didn\'t talk',hint:'didn\'t + base verb.',fu:'Who did you talk to yesterday?'},
    {t:'mc',q:'"___ you play videogames last weekend?"',opts:['Do','Did','Does'],a:'B — Did',hint:'last weekend = past.',fu:'And DID you? What did you play?'},
    {t:'mc',q:'"He ___ his room on Saturday."',opts:['cleaned','cleans','cleaning'],a:'A — cleaned',hint:'on Saturday (passado).',fu:'When did you last clean YOUR room? 😄'},
    {t:'mc',q:'"I ___ like the food."',opts:['didn\'t liked','didn\'t like','don\'t liked'],a:'B — didn\'t like',hint:'did came → -ed goes.',fu:'Why not A? Tell me a food you didn\'t like before.'},
    {t:'us',q:'yesterday / cleaned / house / the / I',a:'I cleaned the house yesterday.',hint:'Who first, time last.',fu:'And you? What did you clean or organize last week?'},
    {t:'us',q:'didn\'t / we / TV / watch / night / last',a:'We didn\'t watch TV last night.',hint:'didn\'t before the verb.',fu:'What did you watch or play last night instead?'},
    {t:'ec',q:'I didn\'t studied for the test.',a:'I didn\'t STUDY for the test.',hint:'double past!',fu:'Confess: did you ever skip studying? 😄'},
    {t:'ec',q:'Did she watched the game?',a:'Did she WATCH the game?',hint:'did already marks past.',fu:'Did anyone in your house watch something yesterday?'},
    {t:'tr',q:'Make it past: "I play with my dog every day." (yesterday version)',a:'I playED with my dog yesterday.',hint:'verb + ed, swap the time word.',fu:'Who did you play or talk with yesterday?'},
    {t:'tr',q:'Make it a question: "They visited their grandma."',a:'DID they visit their grandma?',hint:'Did first, -ed leaves.',fu:'Ask ME about my weekend — with Did!'}
  ],
  c3:{
    fill:[{q:'I ___ (play) yesterday.',a:'played',hint:'+ed.',fu:'Played what?'},{q:'He ___ (work) last week.',a:'worked',hint:'+ed.',fu:'Where?'}],
    mc:[{q:'"She ___ TV." (yesterday)',opts:['watch','watched'],a:'B — watched',hint:'past → ed.',fu:'And you?'},{q:'"___ you cook?"',opts:['Did','Do'],a:'A — Did',hint:'past question.',fu:'Answer it!'}],
    us:[{q:'played / I / yesterday',a:'I played yesterday.',hint:'I first.',fu:'Played what?'},{q:'talked / we / Monday / on',a:'We talked on Monday.',hint:'time last.',fu:'About what?'}],
    ec:[{q:'I didn\'t played.',a:'I didn\'t PLAY.',hint:'-ed out.',fu:'Why not?'},{q:'Did he worked?',a:'Did he WORK?',hint:'-ed out.',fu:'Did he?'}],
    tr:[{q:'Past: "I talk to my mom."',a:'I talkED to my mom.',hint:'+ed.',fu:'When?'},{q:'Negative: "She cooked."',a:'She DIDN\'T cook.',hint:'didn\'t + base.',fu:'Who cooked then?'}]
  },
  makeit:['Yesterday I ______ — and it was great/terrible!','Last weekend, my family and I...','I ______ (verb+ed) for hours last week!','One thing I planned but DIDN\'T do last week...','The last time I laughed a lot: I was with ______ and we ______ (verb+ed)!','Ask ME: "Did you...?" — about my yesterday!'],
  task:{
    title:'The Alibi',
    mission:'A cake disappeared from the kitchen yesterday at 4pm 🍰. You are the main suspect! Convince me (the investigator) with your alibi: tell me EVERYTHING you did yesterday, hour by hour. I will try to find holes in your story!',
    kid:'Someone ate the magic cake! 🍰 You are the suspect — tell me your day, hour by hour. Convince me it wasn\'t you... or confess!',
    roles:{student:'the suspect — tells the full alibi in past simple, defends the details',teacher:'the investigator — asks "What did you do at 3pm?", doubts everything, finds contradictions'},
    complication:'The investigator has a "photo" of the suspect near the kitchen at 3:55pm — explain it!',
    extras:['A "witness" claims they called you at 4pm and you didn\'t answer — where were you?','The investigator asks the same question again, different words — the story must stay identical.'],
    rescue:['At 2pm I...','Then I...','After that...','I didn\'t...'],
    c4:'Formal statement: repeat the alibi as an official declaration — "At approximately 4pm, I visited..." — 5 sentences, no hesitation.'
  },
  exit:[
    {tag:'🗣 speak',q:'Yesterday in 4 sentences (use -ed verbs!): morning, afternoon, evening, night.'},
    {tag:'🗣 speak',q:'Tell me about the last time you cooked, cleaned or studied — when and what happened?'},
    {tag:'✏ create',q:'A sentence with "last week" about someone in your family.'},
    {tag:'✏ create',q:'A NEGATIVE sentence: something you didn\'t do yesterday.'},
    {tag:'⚠ fix it',q:'"I didn\'t watched the game."',a:'I didn\'t WATCH the game.'},
    {tag:'💭 concept',q:'Past Simple: when yes, when no? One example of each.',a:'ação terminada com tempo definido sim ("I worked yesterday"); agora/rotina não'}
  ]
},

/* ══════════════ 5 · PRESENT SIMPLE vs CONTINUOUS (A1+) ══════════════ */
'present-simple-continuous':{
  id:'present-simple-continuous', name:'Present Simple vs Continuous', short:'Simple vs Continuous', level:'A1+', family:'contrast',
  slots:{
    form:'simple: base / he-she-it +s · continuous: am/is/are + -ing', meaning:'rotina/fato (simple) × ação acontecendo agora/temporária (continuous)',
    use:{yes:['simple → every day, always, usually','continuous → now, right now, Look!','continuous → temporary ("this week")'],no:['continuous com state verbs (like, want, know)','simple para o que está em progresso agora']},
    contrast:'os dois presentes convivendo — o segredo é o marcador de tempo', ptTrap:{bad:'I am going to the gym every day',good:'I go to the gym every day',why:'"every day" é rotina → simple, não continuous'},
    visual:'now-progress'
  },
  goal:{ can:'switch between "what I usually do" and "what I\'m doing now" without mixing them up', kid:'be a reporter: say what people DO every day AND what they are doing right now', teaser:'...the difference that makes your English sound native instead of translated.' },
  warmup:{
    gap:['Something you do every single morning — what... it?','And right NOW, this second — what... you... ?','Your best friend on a normal day vs right now — same or different?'],
    kidGame:'I mime: you say "every day" or "right now"? 3 rounds!',
    hint:'"Every day I..." (habit) then "Right now I am ...ing".'
  },
  notice:{
    examples:['I usually <b>drink</b> coffee, but right now I<b>\'m drinking</b> tea.','{name} <b>works</b> in an office, but today she<b>\'s working</b> from home.','We often <b>play</b> cards, but we <b>aren\'t playing</b> now.','He <b>speaks</b> English — and right now he <b>is speaking</b> it!'],
    altExamples:['I <b>go</b> to bed early, but tonight I<b>\'m staying</b> up.','She <b>studies</b> a lot, but this week she<b>\'s resting</b>.','They <b>live</b> in Rio, but they<b>\'re travelling</b> now.','My phone always <b>works</b>, but today it<b>\'s acting</b> weird.'],
    qs:{form:'Two verb shapes appear — which words trigger each one?',meaning:'One is "in general / always", the other is "this exact moment". Which is which?'},
    hints:['Underline the time words: every day / usually vs now / right now / today.','Cover "usually" — does the sentence still feel like a routine?','Two ideas: (A) -ing goes with NOW · (B) -ing is random. Test both.']
  },
  ccqs:{
    main:[
      {q:'"I usually walk to work." — Am I walking at this moment?',a:'no — it\'s a habit'},
      {q:'"Look! She is running." — Now or every day?',a:'now'},
      {q:'"He plays tennis on Sundays." — This exact second?',a:'no — regularly'},
      {q:'"I\'m working from home this week." — Forever or temporary?',a:'temporary'},
      {q:'"Every day I am eating breakfast." — Sounds right? 😄',a:'no — every day → I eat'}
    ],
    reserve:[
      {q:'Which time word screams "now": usually, every day, or right now?',a:'right now'},
      {q:'"I read books" vs "I\'m reading a book" — which has a book open in my hands NOW?',a:'the second'},
      {q:'Point at the clock: habit = many days, or one moment?',a:'many days'}
    ]
  },
  rule:{
    text:'Same present, two jobs. <b>Present Simple</b> = routine, habit, fact (every day, usually, always): base verb, +s for he/she/it. <b>Present Continuous</b> = happening now or temporary (now, right now, Look!, this week): am/is/are + verb-ing. The time word tells you which one. And remember: state verbs (like, want, know, need) stay simple even when you mean "now".',
    kid:'Every day = simple (I play). Right now = be + ing (I am playing). Listen to the time word!',
    pron:'Contrast the two out loud: "I WORK" (habit) vs "I\'m WORKing" (now). The -ing form leans on am/is/are — don\'t drop it.',
    pt:'Português usa o presente contínuo bem mais que o inglês. "Eu trabalho todo dia" NÃO é "I am working every day" — é "I work every day". O -ing é só para o agora/temporário.',
    why:'Regra de ouro: ache o marcador de tempo primeiro. every day/usually → simple; now/right now/Look! → continuous.'
  },
  watchout:[
    {bad:'I am going to the gym every day',good:'I GO to the gym every day',why:'every day = rotina → simple'},
    {bad:'Look! He plays football',good:'Look! He IS PLAYING football',why:'Look! = agora → continuous'},
    {bad:'I am wanting a coffee now',good:'I WANT a coffee now',why:'want é state verb — fica simple'},
    {bad:'Right now I work',good:'Right now I AM WORKING',why:'right now → continuous'}
  ],
  practice:[
    {t:'fill',q:'I ___ (usually/drink) coffee, but today I ___ (drink) tea.',a:'usually drink / am drinking',hint:'habit first, then the now version.',fu:'And what are YOU drinking right now?'},
    {t:'fill',q:'She ___ (work) in a bank, but this week she ___ (work) from home.',a:'works / is working',hint:'she → +s for the habit; be+ing for the temporary.',fu:'Do you ever work or study from home?'},
    {t:'fill',q:'Listen! The neighbours ___ (make) noise again.',a:'are making',hint:'Listen! = right now.',fu:'What can you hear around you right now?'},
    {t:'mc',q:'"He ___ football every Sunday."',opts:['is playing','plays','playing'],a:'B — plays',hint:'every Sunday = routine.',fu:'Why not A? And do you play anything on weekends?'},
    {t:'mc',q:'"Look! It ___ outside."',opts:['rains','is raining','rain'],a:'B — is raining',hint:'Look! = this moment.',fu:'Is it raining where you are now?'},
    {t:'mc',q:'"I ___ this song right now." (love)',opts:['am loving','love','loving'],a:'B — love',hint:'love = state verb → stays simple.',fu:'That\'s the state-verb trap! What song do you love these days?'},
    {t:'us',q:'usually / I / early / wake up',a:'I usually wake up early.',hint:'time adverb before the verb.',fu:'True for you? What time exactly?'},
    {t:'us',q:'is / now / she / sleeping / right',a:'She is sleeping right now.',hint:'Who first, then is + -ing.',fu:'Who\'s probably sleeping in your house now?'},
    {t:'ec',q:'I am studying English every day.',a:'I STUDY English every day.',hint:'every day = habit → simple.',fu:'How often do you really study?'},
    {t:'ec',q:'Look! The baby cry.',a:'Look! The baby IS CRYING.',hint:'Look! → continuous, and add -ing.',fu:'What makes a baby cry, usually?'},
    {t:'tr',q:'Habit → now: "I watch series." (right now version)',a:'I am watching a series right now.',hint:'add am + -ing.',fu:'Which series are you watching these days?'},
    {t:'tr',q:'Now → habit: "She is drinking coffee." (every morning version)',a:'She drinks coffee every morning.',hint:'drop be+ing, add the habit.',fu:'Coffee or tea person — you?'}
  ],
  c3:{
    fill:[{q:'I ___ (play) tennis on Sundays.',a:'play',hint:'Sundays = habit.',fu:'And now?'},{q:'Right now she ___ (cook).',a:'is cooking',hint:'right now → be+ing.',fu:'Cooking what?'}],
    mc:[{q:'"Look! They ___."',opts:['run','are running'],a:'B — are running',hint:'Look! = now.',fu:'Where to?'},{q:'"He ___ every day."',opts:['works','is working'],a:'A — works',hint:'every day = habit.',fu:'Where?'}],
    us:[{q:'now / I / eating / am',a:'I am eating now.',hint:'I am + ing.',fu:'Eating what?'},{q:'usually / we / study / at night',a:'We usually study at night.',hint:'habit.',fu:'You too?'}],
    ec:[{q:'I am liking it now.',a:'I LIKE it now.',hint:'like = state verb.',fu:'Like what?'},{q:'She work right now.',a:'She IS WORKING right now.',hint:'now → be+ing.',fu:'On what?'}],
    tr:[{q:'To now: "I read."',a:'I am reading (now).',hint:'be+ing.',fu:'Reading what?'},{q:'To habit: "She is running."',a:'She runs (every day).',hint:'drop be+ing.',fu:'How often?'}]
  },
  makeit:['Every morning I ______, but this morning I ______ instead.','My ______ (person) usually ______, but right now he/she is probably ______.','This week I am ______ — it\'s only temporary.','I never ______ on weekdays, but I sometimes ______ at weekends.','Right now, in this room, ______ is/are ______-ing.','Ask ME: one "Do you...?" (habit) and one "Are you...?" (now).'],
  task:{
    title:'Split Screen',
    mission:'We play "split screen": I name a person (your mom, your boss, your dog). You tell me TWO things — what they DO every day (routine) and what they are PROBABLY DOING right now. At least 5 people, no mixing the two tenses!',
    kid:'Split screen TV! 📺 I say a person, you tell me what they do every day AND what they are doing right now. Don\'t mix them!',
    roles:{student:'the narrator — gives a habit sentence AND a "right now" sentence for each person',teacher:'names people, reacts, catches any tense mix-up with a raised eyebrow'},
    complication:'I throw in a state verb ("your dad — and he LOVES...") — {name} must keep it simple, no -ing!',
    extras:['Speed round: 3 people in 30 seconds, both tenses each.','Switch: {name} names the people, teacher answers — student catches the mistakes.'],
    rescue:['every day...','right now...','usually...','at the moment...'],
    c4:'Live-report a window or a photo for 90 seconds mixing both: "People here usually..., but today they are..."'
  },
  exit:[
    {tag:'🗣 speak',q:'One habit + one "right now" about yourself, in two clear sentences.'},
    {tag:'🗣 speak',q:'Describe a family member: what they do every day AND what they\'re doing now.'},
    {tag:'✏ create',q:'A sentence with "Look!" (continuous).'},
    {tag:'✏ create',q:'A sentence with "usually" (simple).'},
    {tag:'⚠ fix it',q:'"I am going to work every day."',a:'I GO to work every day.'},
    {tag:'💭 concept',q:'Which time words go with each tense? Give one example of each.',a:'every day/usually → simple; now/Look! → continuous'}
  ]
},

/* ══════════════ 6 · VERB TO BE — PAST (was/were) (A1+) ══════════════ */
'past-to-be':{
  id:'past-to-be', name:'Verb to be — Past (was / were)', short:'Was / Were', level:'A1+', family:'tense',
  slots:{
    form:'I/he/she/it + was · you/we/they + were · neg wasn\'t/weren\'t', meaning:'estados e situações no passado — como algo estava, onde você estava, como se sentia',
    use:{yes:['past states ("I was tired")','past location ("we were at home")','past feelings & descriptions','age in the past ("she was 20 then")'],no:['past actions (→ past simple: "I worked", not "I was work")']},
    contrast:'am/is/are → was/were; be no passado não usa did', ptTrap:{bad:'I was work yesterday',good:'I worked yesterday',why:'"was + verbo" não existe — para ação use past simple'},
    visual:'past-point'
  },
  goal:{ can:'talk about how things WERE — where they were, how they felt, what a place was like', kid:'tell me about yesterday: where you were and how you felt, like a little story', teaser:'...the past of the very first verb you learned. Full circle!' },
  warmup:{
    gap:['Yesterday evening — where... you?','This morning when you woke up: how... you? Tired? Happy?','Your last holiday — how... it? Good? Boring?'],
    kidGame:'"Yesterday I was..." — say 3 feelings with faces!',
    hint:'Point back in time: "Yesterday I... ?" — one word: was.'
  },
  notice:{
    examples:['I <b>was</b> really tired last night.','{name} <b>was</b> at home all weekend.','My friends <b>were</b> late again.','The party <b>wasn\'t</b> boring at all!'],
    altExamples:['You <b>were</b> right about that film.','It <b>was</b> cold yesterday.','We <b>were</b> so happy on the trip.','They <b>weren\'t</b> ready in time.'],
    qs:{form:'Two past words appear — who gets which one?',meaning:'Is this about an action, or about how someone/something WAS?'},
    hints:['Compare "I was" and "they were" — what changes with the person?','Cover was/were — does "I ___ tired" still work without it?','One word for I/he/she/it, another for you/we/they. Which is which?']
  },
  ccqs:{
    main:[
      {q:'"I was tired." — Now or before?',a:'before / past'},
      {q:'"They were at the party." — One person or more?',a:'more (they)'},
      {q:'"She was 10 in that photo." — Is she 10 now?',a:'no — then'},
      {q:'"It wasn\'t cold." — Was it warm or cold?',a:'warm (not cold)'},
      {q:'"Yesterday I was play football." — Sounds right? 😄',a:'no! → I played'}
    ],
    reserve:[
      {q:'Point at the timeline: "last night" — before or after now?',a:'before'},
      {q:'"We were happy." — Is this an action or a feeling?',a:'a feeling / state'},
      {q:'I/he/she/it takes was. And you/we/they?',a:'were'}
    ]
  },
  rule:{
    text:'was/were is the PAST of am/is/are — for states, feelings, places and descriptions in the past. <b>I / he / she / it → was</b>; <b>you / we / they → were</b>. Negative: <b>wasn\'t / weren\'t</b>. Question: put was/were first ("Were you there?"). It never uses "did" — was/were already IS the past. And never put a normal verb after it: for actions, use the past simple.',
    kid:'was = I/he/she/it · were = you/we/they. To say no: wasn\'t / weren\'t. Look back in time!',
    pron:'Weak forms in real speech: was /wəz/, were /wə/ — "I was tired" sounds like "I wuz tired". Wasn\'t /ˈwɒznt/, weren\'t /wɜːnt/.',
    pt:'"Was/were" é o "era/estava/foi/fui" do passado de ser/estar. Cuidado: "I was work" não existe — "was" não junta com verbo. Ação no passado = past simple ("I worked").',
    why:'Regra de ouro: was/were vem sozinho ou com adjetivo/lugar. Se tem outro verbo depois, não é was/were — é past simple.'
  },
  watchout:[
    {bad:'I were tired',good:'I WAS tired',why:'I → was, sempre'},
    {bad:'They was happy',good:'They WERE happy',why:'they → were'},
    {bad:'Was you at home?',good:'WERE you at home?',why:'you → were, também na pergunta'},
    {bad:'I was work yesterday',good:'I WORKED yesterday',why:'ação → past simple, não was+verbo'}
  ],
  practice:[
    {t:'fill',q:'I ___ very tired after work yesterday.',a:'was',hint:'I → was.',fu:'Why were you tired? Tell me.'},
    {t:'fill',q:'My parents ___ at home all weekend.',a:'were',hint:'parents = they → were.',fu:'And where were YOU last weekend?'},
    {t:'fill',q:'The film ___ (not) good — we left early.',a:'wasn\'t',hint:'film = it → wasn\'t.',fu:'What\'s the last bad film you saw?'},
    {t:'mc',q:'"___ you at the party last night?"',opts:['Was','Were','Did'],a:'B — Were',hint:'you → were.',fu:'So — WERE you? Where were you?'},
    {t:'mc',q:'"She ___ happy with the news."',opts:['were','was','did'],a:'B — was',hint:'she → was.',fu:'When were you last really happy?'},
    {t:'mc',q:'"They ___ ready on time."',opts:['wasn\'t','weren\'t','didn\'t'],a:'B — weren\'t',hint:'they → weren\'t.',fu:'Are you usually early or late? 😄'},
    {t:'us',q:'was / cold / it / last night / very',a:'It was very cold last night.',hint:'It first, time last.',fu:'How\'s the weather where you are now?'},
    {t:'us',q:'were / we / at / the beach',a:'We were at the beach.',hint:'We → were.',fu:'When were you last at the beach?'},
    {t:'ec',q:'I were happy yesterday.',a:'I WAS happy yesterday.',hint:'I → was.',fu:'What made you happy recently?'},
    {t:'ec',q:'Was they at school?',a:'WERE they at school?',hint:'they → were.',fu:'Ask me: "Were you...?"'},
    {t:'tr',q:'Make it negative: "I was at home."',a:'I wasn\'t at home. / I was not at home.',hint:'add n\'t / not after was.',fu:'So where WERE you?'},
    {t:'tr',q:'Make it a question: "They were tired."',a:'WERE they tired?',hint:'were goes first.',fu:'Ask me the same about yesterday.'}
  ],
  c3:{
    fill:[{q:'I ___ at home.',a:'was',hint:'I → was.',fu:'When?'},{q:'They ___ happy.',a:'were',hint:'they → were.',fu:'Why?'}],
    mc:[{q:'"He ___ tired."',opts:['were','was'],a:'B — was',hint:'he → was.',fu:'After what?'},{q:'"You ___ right."',opts:['was','were'],a:'B — were',hint:'you → were.',fu:'About what?'}],
    us:[{q:'was / I / late',a:'I was late.',hint:'I first.',fu:'Why?'},{q:'were / they / here',a:'They were here.',hint:'they → were.',fu:'When?'}],
    ec:[{q:'She were sad.',a:'She WAS sad.',hint:'she → was.',fu:'Why?'},{q:'We was ready.',a:'We WERE ready.',hint:'we → were.',fu:'For what?'}],
    tr:[{q:'Negative: "It was cold."',a:'It wasn\'t cold.',hint:'add n\'t.',fu:'Was it warm?'},{q:'Question: "You were there."',a:'WERE you there?',hint:'were first.',fu:'Answer it!'}]
  },
  makeit:['Last night I was ______ (where? how?).','When I was a child, I was very ______.','My last holiday was ______ — because ______.','This morning I wasn\'t ______, I was ______.','The best day of my week was ______ — I was ______.','Ask ME: "Were you...?" about my yesterday!'],
  task:{
    title:'Where Were You?',
    mission:'Something funny happened in town yesterday at 8pm 🎪. I need everyone\'s story: where were you, who were you with, how were you feeling? Give me your full "where were you" account — at least 5 was/were sentences. I\'ll ask follow-ups!',
    kid:'A friendly ghost visited last night! 👻 Tell me: where were you? How were you? Who was with you? Paint the picture with was/were!',
    roles:{student:'the witness — describes where they were and how everything was, in past states',teacher:'the curious investigator — asks "and how was that? were you alone?"'},
    complication:'I claim I saw you somewhere else ("but you were at the mall, right?") — correct me with was/were!',
    extras:['A second witness (new voice) remembers it differently — {name} defends their version.','Rewind further: "and the day before, where were you?"'],
    rescue:['I was...','we were...','it was...','they weren\'t...'],
    c4:'Tell the story of a real memorable day entirely in was/were + past states: the weather, the place, the people, the mood — a mini time-capsule, 6 sentences.'
  },
  exit:[
    {tag:'🗣 speak',q:'Yesterday in 3 sentences with was/were: where, who with, how you felt.'},
    {tag:'🗣 speak',q:'Describe a place from your childhood: how was it? (was/were)'},
    {tag:'✏ create',q:'A NEGATIVE sentence with wasn\'t or weren\'t about last week.'},
    {tag:'✏ create',q:'A QUESTION with "Were you...?" for me.'},
    {tag:'⚠ fix it',q:'"They was at the party."',a:'They WERE at the party.'},
    {tag:'💭 concept',q:'Who takes was, who takes were? And when do we NOT use was/were? One example.',a:'I/he/she/it→was; you/we/they→were; not before a normal verb (ação=past simple)'}
  ]
},

/* ══════════════ 7 · PAST SIMPLE — IRREGULAR (A1+) ══════════════ */
'past-irregular':{
  id:'past-irregular', name:'Past Simple — Irregular verbs', short:'Past Irregular', level:'A1+', family:'tense',
  slots:{
    form:'forma irregular própria (go→went) · neg/perg com did + base', meaning:'ação terminada no passado — mas o verbo muda de forma, sem regra de -ed',
    use:{yes:['finished actions in the past','stories: first... then...','yesterday / last week / ...ago'],no:['-ed on irregular verbs ("goed" ✗)','double past ("did you went" ✗)']},
    contrast:'mesmos gatilhos do past regular — só a forma afirmativa muda', ptTrap:{bad:'I goed home',good:'I went home',why:'verbos irregulares têm forma própria — não levam -ed'},
    visual:'past-point'
  },
  goal:{ can:'tell a real past story using the most common irregular verbs without freezing', kid:'tell yesterday like an adventure: I went, I saw, I ate...!', teaser:'...the "boss verbs" — the ones you\'ll use in every single story.' },
  warmup:{
    gap:['Yesterday — where... you...? (go)','What... you... for dinner? (have/eat)','Something you... last weekend that was fun? (do)'],
    kidGame:'Yesterday charades: act go / eat / see — I guess the past form!',
    hint:'"Yesterday I..." — go becomes... went?'
  },
  notice:{
    examples:['Yesterday I <b>went</b> to the beach.','{name} <b>had</b> a huge breakfast this morning.','We <b>saw</b> a great film last night.','I <b>didn\'t sleep</b> well — too much coffee.'],
    altExamples:['She <b>made</b> an amazing cake.','They <b>took</b> the early bus.','I <b>bought</b> new shoes last week.','He <b>didn\'t come</b> to the meeting.'],
    qs:{form:'These past verbs don\'t end in -ed — what happened to them? And look at the negative one.',meaning:'Finished and dated, or still happening?'},
    hints:['Compare go/went, have/had, see/saw — the whole word changes.','In "didn\'t sleep" — where did the past go? Who carries it now?','Two hypotheses: (A) add -ed anyway · (B) learn a new form. Which is real?']
  },
  ccqs:{
    main:[
      {q:'"I went home." — Am I going now?',a:'no — finished'},
      {q:'"She had lunch." — Is she eating now?',a:'no — done'},
      {q:'"We saw it yesterday." — Do we know when?',a:'yes — yesterday'},
      {q:'"I didn\'t go." — Did I go or not?',a:'not'},
      {q:'"I goed to school." — Correct? 😄',a:'no! → went'}
    ],
    reserve:[
      {q:'go → went. So eat → ...?',a:'ate'},
      {q:'"Did you went?" — one past too many. Fix it.',a:'Did you go?'},
      {q:'Which is past: go, went, or going?',a:'went'}
    ]
  },
  rule:{
    text:'Past Simple again — but many common verbs are <b>irregular</b>: they don\'t take -ed, they change shape (go→went, have→had, see→saw, make→made, take→took, buy→bought). You just learn them. The good news: negatives and questions work exactly like regular verbs — <b>did / didn\'t + base verb</b>: "Did you go?", "I didn\'t go". The special form only shows up in the positive.',
    kid:'Some verbs are rebels! go→went, eat→ate, see→saw. To say no: didn\'t + the normal verb (the rebel calms down!).',
    pron:'went /went/, saw /sɔː/, bought /bɔːt/, thought /θɔːt/ — "ough" = /ɔː/. Don\'t say "boughted".',
    pt:'Igual aos irregulares do português (fui, fiz, vim) — só decorar. A pegadinha: no negativo/pergunta o "did" já marca o passado, então o verbo volta ao normal: "Did you GO?" (não "went").',
    why:'Regra de ouro: a forma irregular só aparece no afirmativo. Entrou did/didn\'t → verbo base, sempre.'
  },
  watchout:[
    {bad:'I goed home',good:'I WENT home',why:'go é irregular → went'},
    {bad:'She eated it',good:'She ATE it',why:'eat → ate'},
    {bad:'Did you went?',good:'Did you GO?',why:'did marca o passado → base'},
    {bad:'I didn\'t saw it',good:'I didn\'t SEE it',why:'didn\'t → base verb'}
  ],
  practice:[
    {t:'fill',q:'Last night I ___ (go) to bed very late.',a:'went',hint:'go → w...',fu:'What time did YOU go to bed?'},
    {t:'fill',q:'She ___ (have) eggs for breakfast.',a:'had',hint:'have → h...',fu:'What did you have this morning?'},
    {t:'fill',q:'We ___ (not/see) the end of the film.',a:'didn\'t see',hint:'didn\'t + base (see, not saw).',fu:'What film do you want to finish?'},
    {t:'mc',q:'"I ___ a new phone last week."',opts:['buyed','bought','buy'],a:'B — bought',hint:'buy → bought.',fu:'What was the last thing YOU bought?'},
    {t:'mc',q:'"___ you go out yesterday?"',opts:['Do','Did','Were'],a:'B — Did',hint:'past question → Did.',fu:'And DID you? Where?'},
    {t:'mc',q:'"She ___ come to the party."',opts:['didn\'t came','didn\'t come','not came'],a:'B — didn\'t come',hint:'didn\'t → base verb.',fu:'Why not A? Who came to your last party?'},
    {t:'us',q:'to work / I / by bus / went',a:'I went to work by bus.',hint:'Who first, how last.',fu:'How did you get to work/school last time?'},
    {t:'us',q:'a / she / cake / made / delicious',a:'She made a delicious cake.',hint:'Who + made + what.',fu:'Who\'s the best cook in your family?'},
    {t:'ec',q:'I seed a great movie.',a:'I SAW a great movie.',hint:'see → saw.',fu:'What\'s a movie you saw recently?'},
    {t:'ec',q:'Did she made dinner?',a:'Did she MAKE dinner?',hint:'did → base verb.',fu:'Who made dinner in your house yesterday?'},
    {t:'tr',q:'Make it past: "I eat pizza." (last night version)',a:'I ate pizza last night.',hint:'eat → ate.',fu:'What did you eat last night?'},
    {t:'tr',q:'Make it a question: "They took the bus."',a:'DID they take the bus?',hint:'Did first, took → take.',fu:'Ask me how I got here — with Did!'}
  ],
  c3:{
    fill:[{q:'I ___ (go) out.',a:'went',hint:'go→went.',fu:'Where?'},{q:'He ___ (have) a coffee.',a:'had',hint:'have→had.',fu:'Where?'}],
    mc:[{q:'"I ___ it." (see)',opts:['seed','saw'],a:'B — saw',hint:'see→saw.',fu:'Saw what?'},{q:'"___ you go?"',opts:['Did','Were'],a:'A — Did',hint:'past question.',fu:'Answer it!'}],
    us:[{q:'went / I / home',a:'I went home.',hint:'I first.',fu:'When?'},{q:'made / she / it',a:'She made it.',hint:'she + made.',fu:'Made what?'}],
    ec:[{q:'I goed there.',a:'I WENT there.',hint:'go→went.',fu:'Why?'},{q:'Did he went?',a:'Did he GO?',hint:'did→base.',fu:'Did he?'}],
    tr:[{q:'Past: "I take the train."',a:'I took the train.',hint:'take→took.',fu:'To where?'},{q:'Negative: "She saw it."',a:'She didn\'t see it.',hint:'didn\'t+base.',fu:'Why not?'}]
  },
  makeit:['Yesterday I went to ______ and I ______ (another irregular!).','The last time I ate something amazing, it was ______.','Last week I bought ______ — I really needed it!','One thing I did yesterday that I didn\'t want to do...','I saw ______ recently and it surprised me.','Ask ME: "Did you...?" about my weekend — use an irregular verb!'],
  task:{
    title:'Yesterday, Frame by Frame',
    mission:'Reconstruct your yesterday like a movie, frame by frame — but you can only use irregular verbs (went, had, saw, made, took, got, ate, came...). At least 6 frames, in order. I\'ll ask "and then?" to keep the reel rolling!',
    kid:'Let\'s make yesterday into a movie! 🎬 Each scene starts with a rebel verb: "I woke up... I ate... I went..." Tell me the whole day!',
    roles:{student:'the director — narrates the day in past irregular verbs, in sequence',teacher:'the audience — reacts, asks "and then?", flags any "goed/eated"'},
    complication:'I claim one frame is impossible ("you ate pizza AND ran a marathon?") — {name} explains or corrects the story.',
    extras:['Play it backwards: tell yesterday from night to morning, same verbs.','Fast-forward: the whole day in 4 sentences, only irregulars.'],
    rescue:['I got up...','then I went...','I had...','after that I saw...'],
    c4:'Tell the story of the best trip you ever took — 8 sentences, mostly irregular verbs, with a beginning, a surprise, and an ending.'
  },
  exit:[
    {tag:'🗣 speak',q:'Your yesterday in 4 sentences using only irregular verbs.'},
    {tag:'🗣 speak',q:'Tell me about the last meal you really enjoyed: where you went, what you ate.'},
    {tag:'✏ create',q:'A sentence with "last week" and an irregular verb.'},
    {tag:'✏ create',q:'A NEGATIVE sentence: something you didn\'t do yesterday.'},
    {tag:'⚠ fix it',q:'"I didn\'t went to work."',a:'I didn\'t GO to work.'},
    {tag:'💭 concept',q:'Where does the irregular form appear — and where does the verb go back to base? Example of each.',a:'irregular no afirmativo (I went); base após did/didn\'t (Did you go?)'}
  ]
},

/* ══════════════ 8 · FUTURE — GOING TO (A2) ══════════════ */
'going-to':{
  id:'going-to', name:'Future — Going to', short:'Going to', level:'A2', family:'tense',
  slots:{
    form:'am/is/are + going to + verbo base', meaning:'planos e intenções já decididos, e previsões com evidência visível',
    use:{yes:['plans already decided ("I\'m going to travel")','intentions','predictions with evidence ("Look at the clouds!")'],no:['decisions made right now (→ will)','the "to be" cannot disappear']},
    contrast:'will (decisão na hora) × going to (plano já feito)', ptTrap:{bad:'I going to travel',good:'I\'m going to travel',why:'faltou o "to be" (am/is/are) antes de going to'},
    visual:'table'
  },
  goal:{ can:'talk about their real plans and intentions for the near future with confidence', kid:'tell me your plans like a countdown: "I\'m going to...!"', teaser:'...and the difference from "will" is coming next — a cliffhanger!' },
  warmup:{
    gap:['This weekend — what... you... do?','Any plan for your next holiday?','One thing you decided to do this month — what?'],
    kidGame:'"This weekend I\'m going to..." — 3 fun plans with excitement!',
    hint:'"This weekend I\'m going to..." + one activity.'
  },
  notice:{
    examples:['I<b>\'m going to</b> travel next month.','{name} <b>is going to</b> start a new course.','We <b>aren\'t going to</b> work on Friday.','Look at those clouds — it<b>\'s going to</b> rain!'],
    altExamples:['They<b>\'re going to</b> move to a new house.','She <b>is going to</b> call you tonight.','I<b>\'m not going to</b> buy it — too expensive.','You look pale — you<b>\'re going to</b> be sick!'],
    qs:{form:'Three pieces sit before the main verb — which are they?',meaning:'A decision made just now, or a plan already in your head?'},
    hints:['Point at am/is/are + going to + verb — three parts.','Cover "am/is/are" — does "I going to travel" sound complete?','Is the verb after "to" base or -ing? Check.']
  },
  ccqs:{
    main:[
      {q:'"I\'m going to travel." — Did I decide now or before?',a:'before — it\'s a plan'},
      {q:'"Look! It\'s going to fall." — Can I see it coming?',a:'yes — evidence'},
      {q:'"She\'s going to study medicine." — Is it decided?',a:'yes'},
      {q:'"We aren\'t going to come." — Yes or no to coming?',a:'no'},
      {q:'"I going to sleep." — Missing something? 😄',a:'yes — the "to be" (I\'m)'}
    ],
    reserve:[
      {q:'"I\'m going to cook" — is "cook" base or -ing?',a:'base'},
      {q:'Plan already made or split-second decision: which is "going to"?',a:'plan already made'},
      {q:'Dark clouds → "It\'s going to ___." Evidence-based prediction, right?',a:'yes (rain)'}
    ]
  },
  rule:{
    text:'"Going to" = future you\'ve already decided, plus predictions you can SEE coming. Structure: <b>am / is / are + going to + base verb</b> ("I\'m going to travel"). All three pieces are obligatory — the "to be" can never drop. Negative: am/is/are + not. Question: put the "to be" first ("Are you going to come?"). Use it for plans and intentions; for a decision made this very second, English prefers "will".',
    kid:'Plan = be + going to + verb! "I\'m going to play!" Keep the am/is/are — it\'s the engine.',
    pron:'In fast speech "going to" becomes "gonna" /ˈɡənə/: "I\'m gonna travel". Understand it, and use it in casual talk.',
    pt:'"Going to" = o nosso "vou/vai + verbo" ("eu VOU viajar"). O erro nº1 do brasileiro é comer o "to be": "I going to" → o certo é "I\'M going to".',
    why:'Regra de ouro: plano já decidido ou evidência na frente dos olhos → going to. Decisão no susto → will.'
  },
  watchout:[
    {bad:'I going to travel',good:'I\'M going to travel',why:'faltou o to be'},
    {bad:'She go to study',good:'She IS GOING TO study',why:'estrutura completa'},
    {bad:'I\'m going to travelling',good:'I\'m going to TRAVEL',why:'após "to", verbo base'},
    {bad:'Are you going travel?',good:'Are you going TO travel?',why:'o "to" não some'}
  ],
  practice:[
    {t:'fill',q:'This weekend I ___ (going to/visit) my grandma.',a:'am going to visit',hint:'am + going to + base.',fu:'And what are YOU going to do this weekend?'},
    {t:'fill',q:'She ___ (going to/start) a new job.',a:'is going to start',hint:'she → is going to.',fu:'Any new plans starting soon for you?'},
    {t:'fill',q:'We ___ (not/going to/travel) this year.',a:'aren\'t going to travel',hint:'are + not + going to + base.',fu:'Where would you go if you could?'},
    {t:'mc',q:'"Look at the sky! It ___ rain."',opts:['will','is going to','going to'],a:'B — is going to',hint:'evidence you can see → going to.',fu:'Why not C? Is it going to rain today where you are?'},
    {t:'mc',q:'"___ you going to help me?"',opts:['Do','Are','Will'],a:'B — Are',hint:'"to be" first in the question.',fu:'ARE you? 😄 What are you good at helping with?'},
    {t:'mc',q:'"I\'m going to ___ English every day."',opts:['studying','study','studied'],a:'B — study',hint:'after "to" → base verb.',fu:'Is that a real plan for you? Be honest!'},
    {t:'us',q:'going to / I / a car / buy / am',a:'I am going to buy a car.',hint:'am + going to + verb + object.',fu:'What\'s the next big thing you\'re going to buy?'},
    {t:'us',q:'is / she / going to / us / call',a:'She is going to call us.',hint:'is going to + verb.',fu:'Who are you going to call today?'},
    {t:'ec',q:'I going to cook tonight.',a:'I\'M going to cook tonight.',hint:'add the to be.',fu:'What are you going to cook, then?'},
    {t:'ec',q:'They going to studying.',a:'They\'re going to STUDY.',hint:'to be missing + base verb.',fu:'What are they going to study?'},
    {t:'tr',q:'Make it a question: "He\'s going to move."',a:'IS he going to move?',hint:'"is" jumps to the front.',fu:'Ask me about MY plans with "Are you going to...?"'},
    {t:'tr',q:'Make it negative: "I\'m going to work on Sunday."',a:'I\'m NOT going to work on Sunday.',hint:'add not after am.',fu:'What ARE you going to do on Sunday?'}
  ],
  c3:{
    fill:[{q:'I ___ (going to/rest).',a:'am going to rest',hint:'am + going to.',fu:'When?'},{q:'She ___ (going to/cook).',a:'is going to cook',hint:'is going to.',fu:'What?'}],
    mc:[{q:'"It ___ rain." (clouds!)',opts:['will','is going to'],a:'B — is going to',hint:'evidence.',fu:'Today?'},{q:'"I\'m going to ___."',opts:['sleep','sleeping'],a:'A — sleep',hint:'base after to.',fu:'When?'}],
    us:[{q:'going to / I / am / travel',a:'I am going to travel.',hint:'am + going to.',fu:'Where?'},{q:'call / going to / she / is / me',a:'She is going to call me.',hint:'is going to.',fu:'When?'}],
    ec:[{q:'I going to eat.',a:'I\'M going to eat.',hint:'to be.',fu:'Eat what?'},{q:'He going to running.',a:'He\'s going to RUN.',hint:'to be + base.',fu:'Where?'}],
    tr:[{q:'Question: "You\'re going to come."',a:'ARE you going to come?',hint:'are first.',fu:'Answer!'},{q:'Negative: "She\'s going to work."',a:'She\'s NOT going to work.',hint:'not after is.',fu:'Why not?'}]
  },
  makeit:['This weekend I\'m going to ______.','Next year, I\'m going to ______ — it\'s a real plan.','I\'m definitely NOT going to ______ this month!','My family is going to ______ soon.','Look at me — I think I\'m going to ______ right after this class!','Ask ME: "Are you going to...?" about my week.'],
  task:{
    title:'The Big Plan',
    mission:'You\'re planning something big — a trip, a party, a project. Pitch me your plan: at least 6 things you\'re going to do, in order. I\'m your excited-but-doubtful friend, so I\'ll ask "and how are you going to do THAT?"',
    kid:'You\'re planning the BEST day ever! 🎉 Tell me everything you\'re going to do — step by step. I want all the details!',
    roles:{student:'the planner — lays out the plan with "going to", handles my doubts',teacher:'the curious friend — reacts, asks how/when, pokes one hole in the plan'},
    complication:'I raise a problem ("but the tickets are expensive — what are you going to do?") — {name} adapts the plan, still using going to.',
    extras:['Budget cut: half the money is gone — re-plan 3 steps.','Invite me: tell me what WE are going to do together.'],
    rescue:['First I\'m going to...','then...','after that...','I\'m not going to...'],
    c4:'Turn the plan into a 60-second "vision pitch" for next year: 5 big "I\'m going to..." goals with one reason each.'
  },
  exit:[
    {tag:'🗣 speak',q:'Your real plans for this weekend — 3 sentences with "going to".'},
    {tag:'🗣 speak',q:'One prediction based on something you can see right now (going to).'},
    {tag:'✏ create',q:'A NEGATIVE plan: something you\'re NOT going to do.'},
    {tag:'✏ create',q:'A QUESTION for me with "Are you going to...?"'},
    {tag:'⚠ fix it',q:'"I going to study tonight."',a:'I\'M going to study tonight.'},
    {tag:'💭 concept',q:'When "going to" and when "will"? One example of each.',a:'plano decidido/evidência → going to; decisão na hora → will'}
  ]
},

/* ══════════════ 9 · FUTURE — WILL (A2) ══════════════ */
'will':{
  id:'will', name:'Future — Will', short:'Will', level:'A2', family:'tense',
  slots:{
    form:'will + verbo base (won\'t = will not)', meaning:'decisões na hora, previsões, promessas e ofertas de ajuda',
    use:{yes:['instant decisions ("I\'ll help you")','predictions/opinions ("I think it will rain")','promises & offers'],no:['plans already decided (→ going to)','will never changes form; no "to" after it']},
    contrast:'going to (plano) × will (na hora / opinião)', ptTrap:{bad:'I will to help you',good:'I will help you',why:'depois de will não entra "to" — vai o verbo base'},
    visual:'table'
  },
  goal:{ can:'offer help, make promises and give predictions naturally in the moment', kid:'be a fortune teller: "You will...!" — predict fun things', teaser:'...the twin of "going to". Same future, different feeling.' },
  warmup:{
    gap:['I need help carrying this — any offer? (start with "I...")','Do you think it... rain tomorrow?','Promise me one thing for this week — what?'],
    kidGame:'Fortune teller! Predict 3 things about me with "You will..."',
    hint:'Offer help: "I... help you." — one little word: will.'
  },
  notice:{
    examples:['That bag looks heavy — I<b>\'ll</b> help you.','I think it <b>will</b> rain tomorrow.','Don\'t worry, I <b>won\'t</b> tell anyone.','One day she <b>will</b> be a great doctor.'],
    altExamples:['The phone\'s ringing — I<b>\'ll</b> get it!','Maybe they <b>will</b> come later.','I promise I <b>won\'t</b> be late.','In 2050 cars <b>will</b> fly, probably.'],
    qs:{form:'What comes right after "will"? And does "will" change with the person?',meaning:'A plan you had, or a decision/prediction happening as you speak?'},
    hints:['Check the verb after will — base form, no "to", no -s.','Compare "I will" and "she will" — does will change?','Is "I\'ll help" a plan from yesterday, or a decision right now?']
  },
  ccqs:{
    main:[
      {q:'"The phone\'s ringing — I\'ll get it." — Did I plan this or decide now?',a:'decided now'},
      {q:'"I think it will rain." — Sure, or a prediction?',a:'prediction/opinion'},
      {q:'"I won\'t tell anyone." — Will I tell or not?',a:'not — a promise'},
      {q:'"She will wills help." — Does will change with she? 😄',a:'no — will never changes'},
      {q:'"I will to help." — Correct?',a:'no — no "to" after will'}
    ],
    reserve:[
      {q:'won\'t means will + what?',a:'not'},
      {q:'After will: base verb or -ing?',a:'base'},
      {q:'Offer to help someone carrying bags — will or going to?',a:'will (on the spot)'}
    ]
  },
  rule:{
    text:'"Will" is the on-the-spot future: decisions you make as you speak ("I\'ll get it!"), predictions and opinions ("I think it will rain"), promises and offers ("I won\'t forget", "I\'ll help you"). Structure is beautifully simple: <b>will + base verb</b>, the same for everybody — no -s, no "to". Negative: <b>won\'t</b> (= will not). For plans you already decided, use "going to" instead.',
    kid:'will = base verb, always the same! "I will win! You will smile!" Say no with won\'t.',
    pron:'Usually contracted: I\'ll /aɪl/, she\'ll /ʃiːl/, we\'ll /wiːl/. won\'t /wəʊnt/ (long o — not "want"!). This /wəʊnt/ vs /wɒnt/ contrast matters.',
    pt:'"Will" também é "vou/vai", mas para decisão do momento, promessa ou palpite. Dois erros clássicos: pôr "to" ("I will TO help" ✗) e conjugar ("she wills" ✗) — will é fixo e vem sozinho com o verbo.',
    why:'Regra de ouro: se você está decidindo AGORA, prometendo ou opinando sobre o futuro → will. Se o plano já existia → going to.'
  },
  watchout:[
    {bad:'I will to help you',good:'I will HELP you',why:'sem "to" depois de will'},
    {bad:'She wills come',good:'She WILL come',why:'will nunca muda'},
    {bad:'I will helping',good:'I will HELP',why:'verbo base após will'},
    {bad:'I not will go',good:'I WON\'T go',why:'negativa = won\'t'}
  ],
  practice:[
    {t:'fill',q:'That looks heavy — I ___ (help) you.',a:'will help / \'ll help',hint:'on-the-spot offer → will + base.',fu:'When did someone last help YOU?'},
    {t:'fill',q:'I think she ___ (call) you later.',a:'will call',hint:'prediction → will.',fu:'Who do you think will call you today?'},
    {t:'fill',q:'Don\'t worry, I ___ (not/forget) your birthday.',a:'won\'t forget',hint:'promise, negative → won\'t.',fu:'What\'s a promise you always keep?'},
    {t:'mc',q:'"The bell rang. I ___ open the door."',opts:['am going to','will','open'],a:'B — will',hint:'decision at this second → will.',fu:'Why not A? A is for plans made before.'},
    {t:'mc',q:'"In 20 years, robots ___ everywhere."',opts:['will be','will are','will being'],a:'A — will be',hint:'will + base (be).',fu:'What do you think will change in 20 years?'},
    {t:'mc',q:'"I promise I ___ late again."',opts:['won\'t be','not will','will not be'],a:'A — won\'t be',hint:'won\'t + base.',fu:'Are you usually on time? 😄'},
    {t:'us',q:'help / I / you / will',a:'I will help you.',hint:'will + base + object.',fu:'What will you help me with?'},
    {t:'us',q:'won\'t / it / I think / rain',a:'I think it won\'t rain.',hint:'I think + subject + won\'t.',fu:'What\'s your prediction for tomorrow?'},
    {t:'ec',q:'I will to call you.',a:'I will CALL you.',hint:'no "to" after will.',fu:'When will you call me?'},
    {t:'ec',q:'She wills be happy.',a:'She WILL be happy.',hint:'will never changes.',fu:'What will make her happy?'},
    {t:'tr',q:'Make it negative: "I will tell him."',a:'I won\'t tell him. / I will not tell him.',hint:'will not = won\'t.',fu:'Can you keep a secret? 😄'},
    {t:'tr',q:'Make it a question: "They will come."',a:'WILL they come?',hint:'will goes first.',fu:'Ask me a "Will you...?" question.'}
  ],
  c3:{
    fill:[{q:'I ___ (help) you.',a:'will help',hint:'will+base.',fu:'With what?'},{q:'It ___ (not/rain).',a:'won\'t rain',hint:'won\'t.',fu:'Sure?'}],
    mc:[{q:'"I ___ get it!" (phone rings)',opts:['am going to','will'],a:'B — will',hint:'now decision.',fu:'Why?'},{q:'"She ___ come."',opts:['will','wills'],a:'A — will',hint:'never changes.',fu:'When?'}],
    us:[{q:'will / I / win',a:'I will win.',hint:'will+base.',fu:'Win what?'},{q:'won\'t / he / come',a:'He won\'t come.',hint:'won\'t.',fu:'Why not?'}],
    ec:[{q:'I will to go.',a:'I will GO.',hint:'no to.',fu:'Where?'},{q:'They wills help.',a:'They WILL help.',hint:'fixed.',fu:'With what?'}],
    tr:[{q:'Negative: "I will call."',a:'I won\'t call.',hint:'won\'t.',fu:'Why not?'},{q:'Question: "You will be there."',a:'WILL you be there?',hint:'will first.',fu:'Answer!'}]
  },
  makeit:['I\'m tired — I think I\'ll ______ after this class.','I promise I won\'t ______ this week.','I predict that one day I will ______.','If you need me, I\'ll ______.','In ten years, I think the world will ______.','Ask ME: "Will you...?" — I\'ll answer honestly!'],
  task:{
    title:'The Fortune Teller',
    mission:'You\'re a fortune teller 🔮 and I\'m your curious customer. Predict my future — my week, my year, my life — with at least 6 "you will / you won\'t" predictions. I\'ll react and ask "really? why will that happen?"',
    kid:'You have a magic crystal ball! 🔮 Tell me my future: "You will...!" Make 6 fun predictions about me!',
    roles:{student:'the fortune teller — makes bold predictions with will/won\'t and defends them',teacher:'the customer — reacts, doubts, asks for reasons'},
    complication:'I refuse to believe one prediction ("I won\'t become famous!") — convince me it will happen.',
    extras:['Switch: I predict YOUR future — you react with follow-up questions.','Bad-news round: make 3 gentle "you won\'t..." predictions and soften them.'],
    rescue:['You will...','you won\'t...','I think...','probably...'],
    c4:'Give a 60-second "prediction speech" about technology or your city in 2040 — 5 will-statements with reasons.'
  },
  exit:[
    {tag:'🗣 speak',q:'Make 3 predictions about tomorrow using "will".'},
    {tag:'🗣 speak',q:'Offer to help me with 2 things (spontaneous "I\'ll...").'},
    {tag:'✏ create',q:'A promise with "won\'t".'},
    {tag:'✏ create',q:'A QUESTION for me with "Will you...?"'},
    {tag:'⚠ fix it',q:'"I will to help you."',a:'I will HELP you.'},
    {tag:'💭 concept',q:'Will vs going to — when each? One example of each.',a:'will = decisão na hora/promessa/palpite; going to = plano já feito'}
  ]
},

/* ══════════════ 10 · PRESENT PERFECT (A2) ══════════════ */
'present-perfect':{
  id:'present-perfect', name:'Present Perfect', short:'Present Perfect', level:'A2', family:'tense',
  slots:{
    form:'have/has + past participle (seen, gone, eaten)', meaning:'experiências de vida (sem quando), ações com resultado agora, e o que começou no passado e continua',
    use:{yes:['life experience ("I have been to Japan")','result now ("I\'ve lost my keys")','ever/never/just/already/yet','since/for (started and continues)'],no:['specific past time (yesterday, last week → past simple)']},
    contrast:'past simple (quando definido) × present perfect (sem quando / até agora)', ptTrap:{bad:'I have visited Paris last year',good:'I visited Paris last year',why:'com tempo definido (last year) usa-se past simple, não present perfect'},
    visual:'table'
  },
  goal:{ can:'talk about their life experiences and recent news without saying exactly when', kid:'brag about everything you\'ve EVER done: "I have...!"', teaser:'...the tense that connects your past to your right-now.' },
  warmup:{
    gap:['Something amazing you... in your life? (do/see)','A country you... to? (be/go)','...you... breakfast today? (yes/no)'],
    kidGame:'"I have..." brag battle — 3 cool things you\'ve done!',
    hint:'"In my life, I have..." + past participle. Have you ever...?'
  },
  notice:{
    examples:['I <b>have visited</b> three countries.','{name} <b>has just finished</b> her homework.','We <b>haven\'t seen</b> that film yet.','<b>Have</b> you <b>ever eaten</b> sushi?'],
    altExamples:['She <b>has lived</b> here for five years.','They <b>have already left</b>.','I<b>\'ve never broken</b> a bone.','He<b>\'s gone</b> to the shop — he\'ll be back.'],
    qs:{form:'Two verb pieces appear — a helper and a special form. Which are they?',meaning:'Do we know exactly WHEN it happened, or just that it happened (sometime)?'},
    hints:['Point at have/has + the third verb form (visited, seen, been).','Look for ever/never/just/already/yet — the perfect\'s best friends.','Is there a "yesterday" or "last week"? If yes, it\'s NOT this tense.']
  },
  ccqs:{
    main:[
      {q:'"I have been to Japan." — Do we know when?',a:'no — sometime in life'},
      {q:'"She has just arrived." — Long ago or recently?',a:'recently — just now'},
      {q:'"I\'ve lost my keys." — Do I have them now?',a:'no — result now'},
      {q:'"Have you finished?" — Asking about the past or the result now?',a:'result now'},
      {q:'"I have seen it yesterday." — Correct? 😄',a:'no! yesterday → I saw it'}
    ],
    reserve:[
      {q:'ever = ? / never = ?',a:'in your life / not once'},
      {q:'"I have eaten" — is "eaten" the past participle of eat?',a:'yes'},
      {q:'Known WHEN → which tense? Unknown when → which?',a:'past simple / present perfect'}
    ]
  },
  rule:{
    text:'Present Perfect links the past to now. Use it for life experience (no specific time), for recent actions with a result you feel now, and for things that started in the past and continue. Structure: <b>have / has + past participle</b> (seen, gone, eaten, been). Friends: <b>ever, never, just, already, yet, since, for</b>. The golden rule: the moment you say a finished time (yesterday, in 2019, last week), switch to Past Simple.',
    kid:'have/has + special verb! "I have eaten!" Use it for anything you\'ve done in your WHOLE life.',
    pron:'Contract them: I\'ve /aɪv/, she\'s /ʃiːz/ (= she has here!), they\'ve /ðeɪv/. "I\'ve seen it" flows as one.',
    pt:'Não é o "tenho feito" do português! "I have visited Paris" = "já visitei / conheci Paris", não "tenho visitado". E o erro nº1: juntar com tempo definido — "last year" pede past simple.',
    why:'Regra de ouro: tem hora marcada (yesterday, in 2020)? → past simple. Só "já/nunca/na vida"? → present perfect.'
  },
  watchout:[
    {bad:'I have visited Paris last year',good:'I VISITED Paris last year',why:'tempo definido → past simple'},
    {bad:'She has went',good:'She has GONE',why:'past participle, não past simple'},
    {bad:'I have ate lunch',good:'I have EATEN lunch',why:'eat → eaten (participle)'},
    {bad:'Have you saw it?',good:'Have you SEEN it?',why:'participle após have'}
  ],
  practice:[
    {t:'fill',q:'I ___ (see) that film — it\'s great!',a:'have seen / \'ve seen',hint:'have + participle (see→seen).',fu:'What\'s the best film you\'ve seen?'},
    {t:'fill',q:'She ___ (just/arrive).',a:'has just arrived',hint:'has + just + participle.',fu:'Who has just arrived in your life recently?'},
    {t:'fill',q:'We ___ (not/finish) the project yet.',a:'haven\'t finished',hint:'haven\'t + participle.',fu:'What haven\'t you finished yet?'},
    {t:'mc',q:'"___ you ever been to another country?"',opts:['Did','Have','Are'],a:'B — Have',hint:'ever → present perfect.',fu:'So HAVE you? Which one?'},
    {t:'mc',q:'"He has ___ here for ten years."',opts:['live','lived','living'],a:'B — lived',hint:'has + participle.',fu:'How long have you lived in your city?'},
    {t:'mc',q:'"I ___ Paris in 2019."',opts:['have visited','visited','has visited'],a:'B — visited',hint:'2019 = specific time → past simple!',fu:'Why not A? That\'s the classic trap.'},
    {t:'us',q:'never / I / have / broken / a bone',a:'I have never broken a bone.',hint:'have + never + participle.',fu:'Lucky? Have you ever been to hospital?'},
    {t:'us',q:'she / just / has / left / the office',a:'She has just left the office.',hint:'has + just + participle.',fu:'What have you just done, before this class?'},
    {t:'ec',q:'I have saw that show.',a:'I have SEEN that show.',hint:'see → seen.',fu:'Which show? Any good?'},
    {t:'ec',q:'She has lived here since 5 years.',a:'She has lived here FOR 5 years.',hint:'a period → for; a point → since.',fu:'For how long have you studied English?'},
    {t:'tr',q:'Make it a question: "You have tried Japanese food."',a:'HAVE you tried Japanese food?',hint:'have jumps to the front.',fu:'Answer it — and tell me about it!'},
    {t:'tr',q:'Perfect → past simple: "I have visited Rome." (add: last summer)',a:'I visited Rome last summer.',hint:'a fixed time switches the tense.',fu:'Where did you go last summer?'}
  ],
  c3:{
    fill:[{q:'I ___ (be) to Italy.',a:'have been',hint:'have+been.',fu:'When... no, HAVE you?'},{q:'She ___ (finish).',a:'has finished',hint:'has+participle.',fu:'What?'}],
    mc:[{q:'"I ___ it yesterday."',opts:['have seen','saw'],a:'B — saw',hint:'yesterday=past simple.',fu:'Saw what?'},{q:'"Have you ___?"',opts:['ate','eaten'],a:'B — eaten',hint:'participle.',fu:'Eaten what?'}],
    us:[{q:'have / I / never / lied',a:'I have never lied.',hint:'have+never+participle.',fu:'Really? 😄'},{q:'has / just / he / arrived',a:'He has just arrived.',hint:'has+just.',fu:'From where?'}],
    ec:[{q:'I have went there.',a:'I have GONE there.',hint:'go→gone.',fu:'When?'},{q:'She has ate.',a:'She has EATEN.',hint:'eat→eaten.',fu:'What?'}],
    tr:[{q:'Question: "You have seen it."',a:'HAVE you seen it?',hint:'have first.',fu:'Answer!'},{q:'To past: "I have met her." (+yesterday)',a:'I met her yesterday.',hint:'fixed time.',fu:'Where?'}]
  },
  makeit:['In my life, I have ______ — and I\'m proud of it.','I have never ______, and I\'m okay with that!','I have just ______ (something from today).','I\'ve ______ my city/job for ______ (since/for).','One country I\'ve always wanted to visit but haven\'t ______ yet...','Ask ME: "Have you ever...?" — anything!'],
  task:{
    title:'The Life Bucket List',
    mission:'We compare life experiences! Tell me at least 6 things you HAVE done and 2 things you have NEVER done (but want to). I\'ll say "me too / me neither" or "really?! when?" — and remember, no dates allowed, or you switch tenses!',
    kid:'Show me your "I have done it!" trophy shelf 🏆 — 6 amazing things you\'ve done in your whole life. Then one thing you\'ve NEVER done!',
    roles:{student:'the adventurer — shares experiences with present perfect, dodges the "when" trap',teacher:'the comparer — reacts with "me too/never", asks for the story (which flips it to past simple!)'},
    complication:'When I ask "really? WHEN?", {name} must switch correctly to past simple to give the story.',
    extras:['Two truths and a lie, all in present perfect — I guess the lie.','Bucket list: 3 "I haven\'t ___ yet, but I will" sentences.'],
    rescue:['I have...','I\'ve never...','ever...','just...','yet...'],
    c4:'Give a 60-second "my life so far" monologue: 5 experiences (present perfect) + one you did last year (past simple) — notice the switch yourself.'
  },
  exit:[
    {tag:'🗣 speak',q:'3 life experiences using present perfect (no dates!).'},
    {tag:'🗣 speak',q:'Something you have never done but want to — and why.'},
    {tag:'✏ create',q:'A question with "Have you ever...?"'},
    {tag:'✏ create',q:'A sentence with "just", "already" or "yet".'},
    {tag:'⚠ fix it',q:'"I have seen her yesterday."',a:'I SAW her yesterday.'},
    {tag:'💭 concept',q:'Present perfect vs past simple — what decides which? One example of each.',a:'sem hora marcada → present perfect; com hora marcada → past simple'}
  ]
},

/* ══════════════ 11 · CAN / COULD (A1) ══════════════ */
'can-could':{
  id:'can-could', name:'Can / Could', short:'Can / Could', level:'A1', family:'modal',
  slots:{
    form:'can / could + verbo base · neg can\'t / couldn\'t', meaning:'habilidade e pedidos/permissão (can = presente · could = passado ou pedido educado)',
    use:{yes:['present ability ("I can swim")','permission/requests ("Can I...? Could you...?")','past ability ("I could read at 4")'],no:['"to" after can/could','changing form (never "cans")']},
    contrast:'can (presente/informal) × could (passado/mais educado)', ptTrap:{bad:'I can to swim',good:'I can swim',why:'depois de can/could vai o verbo base, sem "to"'},
    visual:'table'
  },
  goal:{ can:'say what they can and can\'t do, and make polite requests naturally', kid:'show off your superpowers: "I can...!" and ask for things nicely', teaser:'...one tiny word that does ability AND good manners.' },
  warmup:{
    gap:['One thing you... do really well?','One thing you... do at all?','Could you please... me something? (make a polite request)'],
    kidGame:'Superpower show: "I can ___!" — mime 3 things you can do!',
    hint:'"I can..." + one skill (swim? cook? sing?).'
  },
  notice:{
    examples:['I <b>can</b> speak two languages.','She <b>can\'t</b> come today — she\'s busy.','<b>Could</b> you open the window, please?','When I was five, I <b>could</b> already read.'],
    altExamples:['He <b>can</b> cook amazing pasta.','We <b>can\'t</b> hear you well.','<b>Can</b> I use your phone?','My grandpa <b>could</b> run fast in his youth.'],
    qs:{form:'What comes right after can/could? Does can change with "she"?',meaning:'Which sentences are ABILITY, and which are asking/permission?'},
    hints:['Check the verb after can — base form, no "to", no -s.','can vs could: which one feels more polite / more past?','"She can" or "she cans"? Which sounds right?']
  },
  ccqs:{
    main:[
      {q:'"I can swim." — Ability or permission?',a:'ability'},
      {q:'"Can I sit here?" — Ability or asking permission?',a:'permission'},
      {q:'"Could you help me?" — Polite or rude?',a:'polite'},
      {q:'"When I was 5, I could read." — Now or in the past?',a:'past'},
      {q:'"She cans dance." — Correct? 😄',a:'no! → she can dance'}
    ],
    reserve:[
      {q:'After can, do we say "to"? ("I can to go")',a:'no — I can go'},
      {q:'can\'t = can + ?',a:'not'},
      {q:'Which is more polite: "Give me that" or "Could you give me that?"',a:'Could you...'}
    ]
  },
  rule:{
    text:'"Can" and "could" are modal verbs — they add meaning to another verb and never change shape. <b>Can</b> = present ability ("I can swim") and informal requests/permission ("Can I...?"). <b>Could</b> = past ability ("I could swim at 4") and more polite requests ("Could you...?"). Always <b>can/could + base verb</b>: no "to", no -s, no -ing. Negative: <b>can\'t / couldn\'t</b>.',
    kid:'can = base verb, always! "I can jump!" Ask nicely with "Can I...? Could you...?"',
    pron:'can is weak /kən/ in "I can swim", but can\'t is strong /kɑːnt/ — the difference is how you HEAR yes vs no. Stress can\'t clearly.',
    pt:'"Can" = poder/saber ("eu SEI nadar", "eu POSSO entrar?"). Dois erros: pôr "to" ("I can TO swim" ✗) e conjugar ("she cans" ✗). Modal é fixo e vem colado ao verbo base.',
    why:'Regra de ouro: could é o passado E a versão educada de can. Pedido formal → could; habilidade agora → can.'
  },
  watchout:[
    {bad:'I can to swim',good:'I can SWIM',why:'sem "to" depois de can'},
    {bad:'She cans dance',good:'She CAN dance',why:'can nunca muda'},
    {bad:'Do you can help?',good:'CAN you help?',why:'modal já faz a pergunta, sem do'},
    {bad:'I can swimming',good:'I can SWIM',why:'verbo base após can'}
  ],
  practice:[
    {t:'fill',q:'I ___ (ability) speak a little English already.',a:'can',hint:'present ability → can.',fu:'What else can you do well?'},
    {t:'fill',q:'She ___ (not/ability) drive — no licence yet.',a:'can\'t',hint:'negative ability → can\'t.',fu:'Can you drive? Do you want to?'},
    {t:'fill',q:'When he was young, he ___ (past ability) run for hours.',a:'could',hint:'past ability → could.',fu:'What could YOU do easily as a kid?'},
    {t:'mc',q:'"___ you help me with this, please?"',opts:['Do','Could','Are'],a:'B — Could',hint:'polite request → could.',fu:'What do you often need help with?'},
    {t:'mc',q:'"She ___ play the piano beautifully."',opts:['cans','can','can to'],a:'B — can',hint:'can never changes, no "to".',fu:'Can anyone in your family play an instrument?'},
    {t:'mc',q:'"___ I open the window? It\'s hot."',opts:['Do','Can','Am'],a:'B — Can',hint:'asking permission → Can I.',fu:'How do you ask for permission politely?'},
    {t:'us',q:'swim / can / very well / I',a:'I can swim very well.',hint:'I + can + base + rest.',fu:'True? How did you learn?'},
    {t:'us',q:'you / could / the door / open / ?',a:'Could you open the door?',hint:'Could you + base?',fu:'Ask me something politely with "Could you...?"'},
    {t:'ec',q:'I can to cook.',a:'I can COOK.',hint:'no "to".',fu:'What can you cook?'},
    {t:'ec',q:'She cans sing.',a:'She CAN sing.',hint:'can is fixed.',fu:'Is she good?'},
    {t:'tr',q:'Make it a polite request: "Give me the salt."',a:'Could you give me the salt, please?',hint:'Could you + base + please.',fu:'Now ask me for something politely.'},
    {t:'tr',q:'Make it negative: "I can come tonight."',a:'I can\'t come tonight. / I cannot come tonight.',hint:'can not = can\'t.',fu:'Why can\'t you? Give an excuse! 😄'}
  ],
  c3:{
    fill:[{q:'I ___ swim.',a:'can',hint:'ability.',fu:'How well?'},{q:'She ___ (not) come.',a:'can\'t',hint:'negative.',fu:'Why not?'}],
    mc:[{q:'"He ___ dance."',opts:['cans','can'],a:'B — can',hint:'fixed.',fu:'Well?'},{q:'"___ you help?"',opts:['Do','Could'],a:'B — Could',hint:'polite.',fu:'With what?'}],
    us:[{q:'can / I / cook',a:'I can cook.',hint:'I+can+base.',fu:'What?'},{q:'you / could / help / ?',a:'Could you help?',hint:'Could you+base.',fu:'Ask me!'}],
    ec:[{q:'I can to go.',a:'I can GO.',hint:'no to.',fu:'Where?'},{q:'She cans read.',a:'She CAN read.',hint:'fixed.',fu:'What?'}],
    tr:[{q:'Polite: "Pass the water."',a:'Could you pass the water?',hint:'Could you.',fu:'Ask me!'},{q:'Negative: "I can drive."',a:'I can\'t drive.',hint:'can\'t.',fu:'Why not?'}]
  },
  makeit:['I can ______ really well — it\'s my thing!','I can\'t ______ at all, and it\'s a bit embarrassing 😄','When I was a child, I could ______.','Could you please ______? (ask me for a real favour)','One skill I want to learn so I can ______...','Ask ME: "Can you...?" — test my skills!'],
  task:{
    title:'The Talent Agency',
    mission:'I run a talent agency and you\'re looking for a job. Convince me: tell me everything you CAN do (at least 6 skills), what you CAN\'T do, and politely ask me things ("Could I...?"). I\'ll challenge your skills!',
    kid:'You\'re a SUPERHERO applying to the hero team! 🦸 Tell me all your powers ("I can...!"), your one weakness ("I can\'t..."), and ask permission to join!',
    roles:{student:'the applicant — lists abilities with can/can\'t, makes polite requests with could',teacher:'the boss — impressed or doubtful, asks "can you REALLY?", requires polite language'},
    complication:'I doubt one skill ("you can\'t really do that!") — {name} defends it or proves it.',
    extras:['Childhood round: "When I was little, I could..." — 3 past abilities.','Politeness test: make 3 requests, each more polite than the last.'],
    rescue:['I can...','I can\'t...','Could I...?','Could you...?'],
    c4:'Job interview register: describe your professional abilities formally — "I can manage, I can communicate..." — 5 sentences, polished.'
  },
  exit:[
    {tag:'🗣 speak',q:'3 things you can do and 1 thing you can\'t.'},
    {tag:'🗣 speak',q:'Something you could do as a child but maybe can\'t now.'},
    {tag:'✏ create',q:'A polite request with "Could you...?"'},
    {tag:'✏ create',q:'A permission question with "Can I...?"'},
    {tag:'⚠ fix it',q:'"She cans play tennis."',a:'She CAN play tennis.'},
    {tag:'💭 concept',q:'Can vs could — the two main differences? One example of each.',a:'could = passado de can E pedido mais educado'}
  ]
},

/* ══════════════ 12 · COMPARATIVES (A2) ══════════════ */
'comparatives':{
  id:'comparatives', name:'Comparatives', short:'Comparatives', level:'A2', family:'adjective',
  slots:{
    form:'curto: adj+-er than · longo: more+adj than · irreg: good→better', meaning:'comparar DUAS coisas — uma é maior/melhor/mais cara que a outra',
    use:{yes:['comparing two things ("A is bigger than B")','short adj → -er','long adj → more','not as ___ as'],no:['double comparison ("more bigger")','"that" instead of "than"']},
    contrast:'superlativo (o mais de todos) × comparativo (entre dois)', ptTrap:{bad:'more cheaper',good:'cheaper',why:'ou -er OU more, nunca os dois juntos'},
    visual:'table'
  },
  goal:{ can:'compare two things — places, people, options — and explain their choice', kid:'be the judge: which is bigger, faster, better? Compare everything!', teaser:'...and next week, the winner of all: the superlative.' },
  warmup:{
    gap:['Your city and another city — which is bigger?','Coffee or tea — which is... for you?','You and a family member — who is taller?'],
    kidGame:'"This is bigger than that!" — compare 3 pairs of things in the room!',
    hint:'"A cat is small... a dog is..." — bigger? than a cat.'
  },
  notice:{
    examples:['A plane is <b>faster than</b> a car.','This book is <b>more interesting than</b> that one.','My brother is <b>taller than</b> me.','Health is <b>more important than</b> money.'],
    altExamples:['Today is <b>hotter than</b> yesterday.','A house is <b>more expensive than</b> a flat.','She is <b>better than</b> me at chess.','A bike is <b>cheaper than</b> a car.'],
    qs:{form:'Short adjectives get an ending; long ones get an extra word. Which is which?',meaning:'How many things are we comparing here?'},
    hints:['Compare "taller" and "more interesting" — short vs long adjective.','What little word appears after every comparison? (than!)','good and bad don\'t follow the rule — what do they become?']
  },
  ccqs:{
    main:[
      {q:'"A is bigger than B." — How many things?',a:'two'},
      {q:'"cheap" is short — cheaper or more cheap?',a:'cheaper'},
      {q:'"expensive" is long — expensiver or more expensive?',a:'more expensive'},
      {q:'"good" becomes...?',a:'better'},
      {q:'"more bigger" — right? 😄',a:'no! just bigger'}
    ],
    reserve:[
      {q:'What word links the two things?',a:'than'},
      {q:'"big" → bigger (one g or two)?',a:'two — bigger'},
      {q:'bad → ?',a:'worse'}
    ]
  },
  rule:{
    text:'Comparatives compare exactly TWO things. Short adjectives (1 syllable, or 2 ending in -y): add <b>-er + than</b> (cheaper than, bigger than, happier than). Long adjectives (2+ syllables): use <b>more + adjective + than</b> (more expensive than). A few are irregular: good→<b>better</b>, bad→<b>worse</b>, far→<b>further</b>. Never combine -er and more ("more cheaper" ✗). And it\'s always "than", never "that".',
    kid:'Small word + ER (bigger!). Big word + MORE (more beautiful!). Winner links with THAN!',
    pron:'-er is weak /ə/: "bigger" = /ˈbɪɡə/, "than" is weak /ðən/ — "bigger than a cat" flows fast.',
    pt:'Português usa "mais" para tudo ("mais barato", "mais caro"). Em inglês, adjetivo curto NÃO leva "more" — leva -er. "More cheaper" é o erro nº1: escolha um só.',
    why:'Regra de ouro: adjetivo curto → -er (nunca more junto). Adjetivo longo → more (nunca -er). E sempre than.'
  },
  watchout:[
    {bad:'more cheaper',good:'cheaper',why:'-er OU more, não os dois'},
    {bad:'more big',good:'bigger',why:'adjetivo curto → -er'},
    {bad:'gooder',good:'better',why:'good é irregular'},
    {bad:'taller that me',good:'taller THAN me',why:'than, não that'}
  ],
  practice:[
    {t:'fill',q:'A car is ___ (fast) than a bike.',a:'faster',hint:'short adj → +er.',fu:'What\'s faster than a car?'},
    {t:'fill',q:'This phone is ___ (expensive) than that one.',a:'more expensive',hint:'long adj → more.',fu:'What\'s the most you\'d pay for a phone?'},
    {t:'fill',q:'Winter is ___ (cold) than summer here.',a:'colder',hint:'short adj → +er.',fu:'Which season do you prefer? Why?'},
    {t:'mc',q:'"Health is ___ than money."',opts:['importanter','more important','more importanter'],a:'B — more important',hint:'long adjective → more.',fu:'Do you agree? Why?'},
    {t:'mc',q:'"My English is ___ than last year."',opts:['gooder','better','more good'],a:'B — better',hint:'good is irregular.',fu:'What helped you improve?'},
    {t:'mc',q:'"A bus is ___ a taxi."',opts:['cheaper than','more cheap than','cheaper that'],a:'A — cheaper than',hint:'short → -er, and "than".',fu:'How do you usually travel in your city?'},
    {t:'us',q:'than / is / taller / she / me',a:'She is taller than me.',hint:'A + is + comparative + than + B.',fu:'Who\'s the tallest in your family?'},
    {t:'us',q:'more / this / interesting / is / than / that',a:'This is more interesting than that.',hint:'more + adj + than.',fu:'Name two things — which is more interesting?'},
    {t:'ec',q:'A plane is more faster than a train.',a:'A plane is FASTER than a train.',hint:'-er OR more, not both.',fu:'Have you been on a plane recently?'},
    {t:'ec',q:'Today is hotter that yesterday.',a:'Today is hotter THAN yesterday.',hint:'than, not that.',fu:'Is today hot where you are?'},
    {t:'tr',q:'Compare: "big" — an elephant and a dog.',a:'An elephant is bigger than a dog.',hint:'big → bigger than.',fu:'Compare two animals you like.'},
    {t:'tr',q:'Compare: "good" — your two favourite foods.',a:'___ is better than ___. (e.g. Pizza is better than pasta.)',hint:'good → better than.',fu:'Defend your choice!'}
  ],
  c3:{
    fill:[{q:'A is ___ (small) than B.',a:'smaller',hint:'+er.',fu:'Example?'},{q:'It\'s ___ (beautiful) than that.',a:'more beautiful',hint:'more.',fu:'Why?'}],
    mc:[{q:'"cheap" →',opts:['more cheap','cheaper'],a:'B — cheaper',hint:'short.',fu:'Than what?'},{q:'"good" →',opts:['gooder','better'],a:'B — better',hint:'irregular.',fu:'Better than?'}],
    us:[{q:'than / bigger / it / is / me',a:'It is bigger than me.',hint:'comparative+than.',fu:'What is?'},{q:'more / is / it / expensive',a:'It is more expensive.',hint:'more+adj.',fu:'Than what?'}],
    ec:[{q:'more taller',a:'taller',hint:'not both.',fu:'Than?'},{q:'better that me',a:'better THAN me',hint:'than.',fu:'At what?'}],
    tr:[{q:'Compare "fast": car/bike.',a:'A car is faster than a bike.',hint:'-er than.',fu:'Faster still?'},{q:'Compare "important": time/money.',a:'Time is more important than money.',hint:'more than.',fu:'Agree?'}]
  },
  makeit:['My city is ______ than ______ (a nearby city).','I think ______ is more interesting than ______.','I\'m ______ than I was five years ago.','In my family, ______ is taller/older than ______.','For me, ______ is better than ______ — no doubt!','Ask ME to compare two things — I\'ll answer!'],
  task:{
    title:'The Great Debate',
    mission:'We debate! I\'ll name two things (city vs countryside, coffee vs tea, phone vs book) and you tell me which is better and WHY, using at least 2 comparatives each round. I\'ll defend the other side — convince me!',
    kid:'You\'re the judge of the "Which is Better?" show! ⚖️ I show you two things, you decide which wins and why — using bigger, faster, better!',
    roles:{student:'the debater — compares with -er/more + than, justifies the choice',teacher:'the opponent — argues the other side, demands comparisons not just opinions'},
    complication:'I flip it: "okay, but isn\'t the other one cheaper / faster?" — {name} responds with a new comparison.',
    extras:['Rapid fire: 4 pairs in 60 seconds, one comparative each.','Switch sides: now defend the option you just argued against.'],
    rescue:['bigger than...','more ... than...','better/worse than...','not as ... as...'],
    c4:'Compare two real options in your life (two jobs, two trips, two phones) across 3 criteria each — a mini decision speech.'
  },
  exit:[
    {tag:'🗣 speak',q:'Compare your city with another city — 2 comparatives.'},
    {tag:'🗣 speak',q:'Compare two foods you like and say which is better, and why.'},
    {tag:'✏ create',q:'A sentence with "more ___ than" (long adjective).'},
    {tag:'✏ create',q:'A sentence with an irregular comparative (better/worse).'},
    {tag:'⚠ fix it',q:'"A car is more faster than a bike."',a:'A car is FASTER than a bike.'},
    {tag:'💭 concept',q:'When -er and when "more"? And the irregular ones? One example each.',a:'curto→-er, longo→more; good→better, bad→worse'}
  ]
},

/* ══════════════ 13 · SUPERLATIVES (A2) ══════════════ */
'superlatives':{
  id:'superlatives', name:'Superlatives', short:'Superlatives', level:'A2', family:'adjective',
  slots:{
    form:'curto: the + adj+-est · longo: the most + adj · irreg: good→the best', meaning:'o topo do grupo — o maior, o melhor, o mais caro de todos',
    use:{yes:['the top of a group','short adj → the -est','long adj → the most','with of/in ("in the world")'],no:['double superlative ("the most tallest")','forgetting "the"']},
    contrast:'comparativo (entre dois) × superlativo (o de todos)', ptTrap:{bad:'the more expensive',good:'the most expensive',why:'superlativo de adj longo é "the most", não "the more"'},
    visual:'table'
  },
  goal:{ can:'name the best, the worst and the most ___ things in their world and explain why', kid:'crown the champions: the biggest, the best, the fastest of ALL!', teaser:'...the comparative\'s big brother: the absolute winner.' },
  warmup:{
    gap:['The best place in your city — which is it?','The most difficult thing about English — what?','The happiest day of your week — when?'],
    kidGame:'"The biggest / the best!" — crown 3 champions in the room!',
    hint:'"The best thing in my city is..." — the + adjective + est.'
  },
  notice:{
    examples:['Everest is <b>the highest</b> mountain in the world.','This is <b>the most expensive</b> restaurant in town.','She\'s <b>the best</b> student in the class.','Today is <b>the hottest</b> day of the year.'],
    altExamples:['He\'s <b>the tallest</b> in the family.','It was <b>the most boring</b> film ever.','That\'s <b>the worst</b> idea I\'ve heard!','This is <b>the happiest</b> moment of my life.'],
    qs:{form:'What little word appears before every one? And short vs long adjectives?',meaning:'Comparing two things, or picking the top of a whole group?'},
    hints:['Every superlative starts with the same word — which?','Short → the ___est. Long → the most ___. Spot both.','good and bad again: the best, the ___?']
  },
  ccqs:{
    main:[
      {q:'"the tallest building" — one, or the top of many?',a:'the top of many'},
      {q:'"tall" is short — the tallest or the most tall?',a:'the tallest'},
      {q:'"beautiful" is long — the beautifulest or the most beautiful?',a:'the most beautiful'},
      {q:'"good" becomes...?',a:'the best'},
      {q:'"the most biggest" — correct? 😄',a:'no! the biggest'}
    ],
    reserve:[
      {q:'What word always comes before a superlative?',a:'the'},
      {q:'bad → the ___?',a:'the worst'},
      {q:'"in the class" or "of the class" — both okay after superlative?',a:'yes'}
    ]
  },
  rule:{
    text:'Superlatives pick the ONE at the top of a group. Short adjectives: <b>the + adj + -est</b> (the biggest, the cheapest, the happiest). Long adjectives: <b>the most + adjective</b> (the most expensive). Irregulars: good→<b>the best</b>, bad→<b>the worst</b>, far→<b>the furthest</b>. Two must-haves: keep <b>"the"</b>, and never combine -est and most ("the most tallest" ✗). Often followed by in/of + group ("the best in the world").',
    kid:'THE + small word + EST (the biggest!). THE MOST + big word (the most fun!). Always keep "the"!',
    pron:'-est is /ɪst/: "biggest" /ˈbɪɡɪst/, "the best" /ðə best/. Don\'t drop the "the".',
    pt:'"O mais ___ de todos". Adjetivo longo = "the MOST", não "the more" (esse é comparativo). E não esqueça o "the": "she is best" ✗ → "she is THE best".',
    why:'Regra de ouro: dois → comparativo (than); grupo inteiro → superlativo (the ___est / the most).'
  },
  watchout:[
    {bad:'the most tallest',good:'the tallest',why:'-est OU most, não os dois'},
    {bad:'the more expensive (de todos)',good:'the most expensive',why:'superlativo longo = the most'},
    {bad:'she is best',good:'she is THE best',why:'o "the" é obrigatório'},
    {bad:'the goodest',good:'the best',why:'good é irregular'}
  ],
  practice:[
    {t:'fill',q:'Everest is ___ (high) mountain in the world.',a:'the highest',hint:'short adj → the ___est.',fu:'What\'s the highest place you\'ve been?'},
    {t:'fill',q:'This is ___ (expensive) hotel in the city.',a:'the most expensive',hint:'long adj → the most.',fu:'What\'s the most you\'d pay for a hotel?'},
    {t:'fill',q:'That was ___ (funny) joke of the night.',a:'the funniest',hint:'y → the ___iest.',fu:'Who\'s the funniest person you know?'},
    {t:'mc',q:'"She is ___ singer in the group."',opts:['the goodest','the best','the most good'],a:'B — the best',hint:'good is irregular.',fu:'Who\'s the best singer you know?'},
    {t:'mc',q:'"It\'s ___ day of the year."',opts:['the hotter','the hottest','the most hot'],a:'B — the hottest',hint:'short adj → the ___est.',fu:'When\'s the hottest time where you live?'},
    {t:'mc',q:'"This is ___ film I\'ve ever seen."',opts:['the most boring','the boringest','the more boring'],a:'A — the most boring',hint:'long adj → the most.',fu:'What\'s the most boring film you\'ve seen?'},
    {t:'us',q:'the / in / tallest / he / is / family / the',a:'He is the tallest in the family.',hint:'the + adj-est + in the group.',fu:'Who\'s the tallest in yours?'},
    {t:'us',q:'the / it / most / is / beautiful / city',a:'It is the most beautiful city.',hint:'the most + adj + noun.',fu:'What\'s the most beautiful city you know?'},
    {t:'ec',q:'It\'s the most biggest house here.',a:'It\'s the BIGGEST house here.',hint:'-est OR most, not both.',fu:'What\'s the biggest place you\'ve lived in?'},
    {t:'ec',q:'She is best in the class.',a:'She is THE best in the class.',hint:'keep "the".',fu:'Best at what?'},
    {t:'tr',q:'Superlative: "high" — mountain in the world.',a:'the highest mountain in the world',hint:'the + high+est.',fu:'Name it!'},
    {t:'tr',q:'Superlative: "good" — day of your life.',a:'the best day of my life',hint:'good → the best.',fu:'Tell me about it!'}
  ],
  c3:{
    fill:[{q:'the ___ (big) house.',a:'the biggest',hint:'the -est.',fu:'Where?'},{q:'the ___ (expensive).',a:'the most expensive',hint:'the most.',fu:'What?'}],
    mc:[{q:'"tall" →',opts:['the most tall','the tallest'],a:'B — the tallest',hint:'short.',fu:'Who?'},{q:'"good" →',opts:['the goodest','the best'],a:'B — the best',hint:'irregular.',fu:'At what?'}],
    us:[{q:'the / it / best / is',a:'It is the best.',hint:'the best.',fu:'Of what?'},{q:'the / most / it / is / fun',a:'It is the most fun.',hint:'the most.',fu:'Really?'}],
    ec:[{q:'the most tallest',a:'the tallest',hint:'not both.',fu:'Who?'},{q:'she is best',a:'she is THE best',hint:'the.',fu:'At?'}],
    tr:[{q:'Super: "hot" — day.',a:'the hottest day',hint:'the -est.',fu:'When?'},{q:'Super: "bad" — film.',a:'the worst film',hint:'bad→worst.',fu:'Which?'}]
  },
  makeit:['The best thing about my city is ______.','The most difficult part of English for me is ______.','______ is the happiest person I know.','The most delicious food I\'ve ever eaten was ______.','The worst film/book I know is ______ — trust me!','Ask ME a "What\'s the best/worst...?" question!'],
  task:{
    title:'The Award Ceremony',
    mission:'Welcome to your personal Award Ceremony 🏆! You give out at least 6 "the most ___ / the best ___" awards from your life — best food, worst habit, most beautiful place, funniest friend — and justify each. I\'m the audience shouting "why THAT one?!"',
    kid:'You\'re hosting the Champions Awards! 🏆 Give out 6 golden trophies: the biggest, the best, the funniest — and say why each one wins!',
    roles:{student:'the host — announces superlative awards and defends each choice',teacher:'the audience — reacts, challenges "is it really THE best?"'},
    complication:'I nominate a rival ("but isn\'t X the best instead?") — {name} defends the winner with reasons.',
    extras:['Category twist: give 3 "the worst ___" awards, kindly.','Speed awards: 4 categories in 45 seconds.'],
    rescue:['the best...','the most...','the biggest...','in the world / of all'],
    c4:'Deliver a 60-second "best of my year" speech: 5 superlatives (best moment, biggest surprise, hardest challenge...) with one line each.'
  },
  exit:[
    {tag:'🗣 speak',q:'The best and the worst thing about your city — with superlatives.'},
    {tag:'🗣 speak',q:'The most ___ person or place in your life, and why.'},
    {tag:'✏ create',q:'A sentence with "the most ___" (long adjective).'},
    {tag:'✏ create',q:'A sentence with an irregular superlative (the best/the worst).'},
    {tag:'⚠ fix it',q:'"It\'s the most biggest city."',a:'It\'s the BIGGEST city.'},
    {tag:'💭 concept',q:'Comparative vs superlative — when each? One example of each.',a:'dois → comparativo (than); grupo → superlativo (the ___est/the most)'}
  ]
},

/* ══════════════ 14 · THERE IS / THERE ARE (A1) ══════════════ */
'there-is-are':{
  id:'there-is-are', name:'There is / There are', short:'There is/are', level:'A1', family:'structure',
  slots:{
    form:'There is + singular · There are + plural · neg isn\'t/aren\'t any', meaning:'dizer que algo existe (ou não) num lugar',
    use:{yes:['saying what exists in a place','There is + one thing','There are + many things','a/an (sing) · some/any (plural)'],no:['using "have" for existence ("it has a park" ✗)','There is + plural noun']},
    contrast:'have (posse) × there is/are (existência)', ptTrap:{bad:'Have a book on the table',good:'There is a book on the table',why:'"tem" de existência é "there is/are", não "have"'},
    visual:'table'
  },
  goal:{ can:'describe what exists in a place — their room, their city, a photo', kid:'be a room explorer: "There is... there are...!" — list what you see', teaser:'...the structure that lets you describe any place in the world.' },
  warmup:{
    gap:['Your bedroom — what... in it?','...a park near your house?','How many windows... in this room?'],
    kidGame:'Room detective! Say 3 "There is/are..." about what you see now!',
    hint:'"In my room, there is a..." — one thing first.'
  },
  notice:{
    examples:['<b>There is</b> a big park near my house.','<b>There are</b> two cafés on my street.','<b>There isn\'t</b> any milk in the fridge.','<b>Are there</b> any good restaurants here?'],
    altExamples:['<b>There is</b> a problem with my phone.','<b>There are</b> lots of people today.','<b>There aren\'t</b> any chairs.','<b>Is there</b> a bank near here?'],
    qs:{form:'When is it "is" and when "are"? And what changes in questions?',meaning:'Are we saying something EXISTS, or who OWNS it?'},
    hints:['Count the thing after it: one → is, many → are.','In the question, which word jumps to the front?','some or any — which goes with negatives and questions?']
  },
  ccqs:{
    main:[
      {q:'"There is a cat." — One cat or many?',a:'one'},
      {q:'"There are three books." — is or are? Why?',a:'are — plural'},
      {q:'"There isn\'t any bread." — Bread: yes or no?',a:'no'},
      {q:'"Is there a bank?" — Am I asking or telling?',a:'asking'},
      {q:'"There is two cars." — Correct? 😄',a:'no! there ARE two cars'}
    ],
    reserve:[
      {q:'one thing → there ___?',a:'is'},
      {q:'many things → there ___?',a:'are'},
      {q:'negative/question uses some or any?',a:'any'}
    ]
  },
  rule:{
    text:'"There is / There are" says that something exists in a place. <b>There is</b> + singular (a/an): "There is a park." <b>There are</b> + plural: "There are two parks." Negative: <b>there isn\'t / there aren\'t</b> (+ any). Question: flip it — <b>Is there...? Are there...?</b> Use a/an with singular, some in positives and any in negatives/questions. Careful: existence is "there is", never "it has".',
    kid:'One thing = There is. Many things = There are. To ask: Is there...? Are there...?',
    pron:'"There\'s" /ðeəz/ is the natural contraction for "there is". "There are" often reduces to "there\'re" /ðeərə/.',
    pt:'O "tem" do português (existência) é "there is/are" em inglês, NÃO "have": "Tem um parque" = "There is a park" (não "Have a park"). Esse é o erro nº1 do brasileiro.',
    why:'Regra de ouro: conte o substantivo. Singular → there is. Plural → there are. E "tem" de existir = there is/are.'
  },
  watchout:[
    {bad:'There is two cars',good:'There ARE two cars',why:'plural → there are'},
    {bad:'There are a book',good:'There IS a book',why:'singular → there is'},
    {bad:'Have a park in my city',good:'THERE IS a park in my city',why:'existência = there is'},
    {bad:'There is any milk',good:'There ISN\'T any milk (neg) / There is SOME milk (aff)',why:'any na negativa, some na afirmativa'}
  ],
  practice:[
    {t:'fill',q:'___ a cat on the sofa.',a:'There is / There\'s',hint:'one → there is.',fu:'What\'s on your sofa right now?'},
    {t:'fill',q:'___ five students in the class.',a:'There are',hint:'many → there are.',fu:'How many people are in your home right now?'},
    {t:'fill',q:'There ___ (not) any bread at home.',a:'isn\'t',hint:'bread (uncount) → isn\'t any.',fu:'What isn\'t in your fridge right now?'},
    {t:'mc',q:'"___ a park near your house?"',opts:['Is there','Are there','Have there'],a:'A — Is there',hint:'a park = singular question.',fu:'So — IS there? Tell me about it.'},
    {t:'mc',q:'"___ many cars in the street."',opts:['There is','There are','It has'],a:'B — There are',hint:'many cars = plural.',fu:'Is your street busy or quiet?'},
    {t:'mc',q:'"There ___ any chairs in the room."',opts:['isn\'t','aren\'t','not are'],a:'B — aren\'t',hint:'chairs = plural negative.',fu:'What\'s missing in your room?'},
    {t:'us',q:'a / there / bank / is / near / here',a:'There is a bank near here.',hint:'There is + a + noun + place.',fu:'Is there a bank near you?'},
    {t:'us',q:'are / people / there / many / today',a:'There are many people today.',hint:'There are + plural.',fu:'Where are there many people in your city?'},
    {t:'ec',q:'Have a problem with my computer.',a:'THERE IS a problem with my computer.',hint:'existence = there is.',fu:'Any problem with YOUR computer lately?'},
    {t:'ec',q:'There is three windows here.',a:'There ARE three windows here.',hint:'three → plural.',fu:'How many windows are there in this room?'},
    {t:'tr',q:'Make it a question: "There is a supermarket near here."',a:'IS there a supermarket near here?',hint:'Is jumps to the front.',fu:'Ask me about shops near me.'},
    {t:'tr',q:'Make it negative: "There are some eggs."',a:'There aren\'t any eggs.',hint:'aren\'t + any.',fu:'What don\'t you have in your kitchen?'}
  ],
  c3:{
    fill:[{q:'___ a dog here.',a:'There is',hint:'one.',fu:'Whose?'},{q:'___ two cats.',a:'There are',hint:'many.',fu:'Where?'}],
    mc:[{q:'"___ a bank?"',opts:['Is there','Are there'],a:'A — Is there',hint:'singular.',fu:'Where?'},{q:'"There ___ people."',opts:['is','are'],a:'B — are',hint:'plural.',fu:'Many?'}],
    us:[{q:'is / there / a / car',a:'There is a car.',hint:'there is + a.',fu:'Whose?'},{q:'are / there / books / two',a:'There are two books.',hint:'there are.',fu:'About what?'}],
    ec:[{q:'There is two dogs.',a:'There ARE two dogs.',hint:'plural.',fu:'Whose?'},{q:'Have a park.',a:'THERE IS a park.',hint:'existence.',fu:'Big?'}],
    tr:[{q:'Question: "There is a shop."',a:'IS there a shop?',hint:'Is first.',fu:'Answer!'},{q:'Negative: "There are some chairs."',a:'There aren\'t any chairs.',hint:'aren\'t any.',fu:'Really?'}]
  },
  makeit:['In my bedroom, there is ______ and there are ______.','In my neighbourhood, there is a great ______.','There isn\'t any ______ in my kitchen right now.','In my city there are too many ______.','There is one thing in this room I love: ______.','Ask ME: "Is there / Are there...?" about my place!'],
  task:{
    title:'The Virtual Tour',
    mission:'Give me a virtual tour of a place you know well — your home, your street, your favourite café. Describe at least 8 things using There is / There are (and one "there isn\'t any..."). I\'m the visitor asking "and what else is there?"',
    kid:'You\'re a tour guide of your bedroom! 🏠 Show me everything: "There is... there are...!" At least 8 things — don\'t miss the best toy!',
    roles:{student:'the tour guide — describes the place with there is/are, room by room',teacher:'the curious visitor — asks "and what else? is there a...?"'},
    complication:'I ask for something that isn\'t there ("Is there a pool?") — {name} answers with "there isn\'t any / there aren\'t any".',
    extras:['Compare: "In my old house there was... but here there is..."','Dream version: describe your dream home — what is there?'],
    rescue:['There is...','there are...','there isn\'t any...','next to / near'],
    c4:'Describe your city to a tourist: what there is, what there isn\'t, and what makes it special — 6 sentences.'
  },
  exit:[
    {tag:'🗣 speak',q:'Describe your room: 4 sentences with There is / There are.'},
    {tag:'🗣 speak',q:'What is there (and isn\'t there) in your neighbourhood?'},
    {tag:'✏ create',q:'A NEGATIVE sentence with "There isn\'t/aren\'t any".'},
    {tag:'✏ create',q:'A QUESTION with "Is there...?" for me.'},
    {tag:'⚠ fix it',q:'"There is two parks in my city."',a:'There ARE two parks in my city.'},
    {tag:'💭 concept',q:'When "is" and when "are"? And how do we say the "tem" of existence? Example.',a:'singular→is, plural→are; existência = there is/are (não have)'}
  ]
},

/* ══════════════ 15 · QUESTION WORDS (WH-) (A1) ══════════════ */
'wh-questions':{
  id:'wh-questions', name:'Question Words (WH-)', short:'WH- Questions', level:'A1', family:'structure',
  slots:{
    form:'WH + auxiliar (do/does/is/are) + sujeito + verbo', meaning:'perguntas abertas — pedem informação, não sim/não',
    use:{yes:['open questions (what/where/when/why/how...)','asking for information','WH + do/does + subject + verb'],no:['dropping the auxiliary ("Where you live?" ✗)','yes/no answers']},
    contrast:'yes/no questions (Do you...?) × WH questions (What do you...?)', ptTrap:{bad:'Where you live?',good:'Where do you live?',why:'falta o auxiliar do/does entre o WH e o sujeito'},
    visual:'table'
  },
  goal:{ can:'ask real questions to keep a conversation going — not just answer them', kid:'become a question machine: what? where? why? — ask me everything!', teaser:'...the words that turn you from an answerer into a real talker.' },
  warmup:{
    gap:['Ask me my name — how?','Ask me about where I live.','Ask me the reason I teach English.'],
    kidGame:'Question ping-pong: ask me 3 questions with what / where / why!',
    hint:'"What... your name?" — what\'s missing between What and your?'
  },
  notice:{
    examples:['<b>What</b> is your name?','<b>Where</b> do you live?','<b>Why</b> are you learning English?','<b>How</b> do you go to work?'],
    altExamples:['<b>When</b> does the class start?','<b>Who</b> is your best friend?','<b>What</b> do you do on weekends?','<b>How much</b> is this coffee?'],
    qs:{form:'What sits between the WH- word and "you"? Look closely.',meaning:'Can you answer these with just "yes" or "no"?'},
    hints:['Point at the word after What/Where (is, do, does) — the auxiliary.','Compare "Where you live?" and "Where do you live?" — what\'s added?','Match each WH- to its job: what=thing, where=place, why=reason...']
  },
  ccqs:{
    main:[
      {q:'"Where do you live?" — Can I answer yes/no?',a:'no — it wants a place'},
      {q:'"What" asks about a thing or a person?',a:'a thing'},
      {q:'"Why" asks for...?',a:'a reason'},
      {q:'"Where you live?" — Is something missing?',a:'yes — do'},
      {q:'"How old you are?" — Correct? 😄',a:'no! How old ARE you?'}
    ],
    reserve:[
      {q:'who = ? / where = ? / when = ?',a:'person / place / time'},
      {q:'"What ___ you do?" — do or does for "you"?',a:'do'},
      {q:'"Where ___ she live?" — do or does?',a:'does'}
    ]
  },
  rule:{
    text:'WH- questions ask for information (not yes/no). The words: <b>what</b> (thing), <b>who</b> (person), <b>where</b> (place), <b>when</b> (time), <b>why</b> (reason), <b>how</b> (manner), plus <b>which</b> (choice), <b>whose</b> (owner), <b>how much/many/old</b>. Word order: <b>WH + auxiliary + subject + verb</b> — "Where <u>do</u> you live?", "What <u>is</u> she doing?" The auxiliary (do/does/is/are) can never disappear. That missing auxiliary is the classic Portuguese-speaker slip.',
    kid:'WH word + helper + you + verb! "Where DO you live?" Never forget the helper!',
    pron:'"What do you" blends to /ˈwɒdʒə/ ("whaddaya do?"), "Where do you" to /ˈweədʒə/. Recognise it fast, say it relaxed.',
    pt:'Em português a pergunta é só a entonação ("Onde você mora?"). Em inglês precisa do auxiliar: "Where DO you live?". Esquecer o do/does é o erro nº1 do brasileiro em perguntas.',
    why:'Regra de ouro: WH + do/does/is/are + sujeito + verbo. Se não tem auxiliar, a pergunta está incompleta.'
  },
  watchout:[
    {bad:'Where you live?',good:'Where DO you live?',why:'falta o auxiliar do'},
    {bad:'What means this?',good:'What DOES this mean?',why:'this → does + verbo base'},
    {bad:'How old you are?',good:'How old ARE you?',why:'com be, inverta: are you'},
    {bad:'Where she works?',good:'Where DOES she work?',why:'she → does, verbo base'}
  ],
  practice:[
    {t:'fill',q:'___ is your name? (thing)',a:'What',hint:'asking a thing → What.',fu:'And what\'s MY name? 😄'},
    {t:'fill',q:'___ do you live? (place)',a:'Where',hint:'place → Where.',fu:'Where exactly? Tell me more.'},
    {t:'fill',q:'___ are you learning English? (reason)',a:'Why',hint:'reason → Why.',fu:'Answer your own question!'},
    {t:'mc',q:'"___ do you go to work?"',opts:['What','How','Who'],a:'B — How',hint:'by car? by bus? → How.',fu:'So HOW do you? And how long does it take?'},
    {t:'mc',q:'"Where ___ she work?"',opts:['do','does','is'],a:'B — does',hint:'she → does + base.',fu:'Where does someone in your family work?'},
    {t:'mc',q:'"___ is your birthday?"',opts:['What','When','Who'],a:'B — When',hint:'a time → When.',fu:'When IS it? What do you do?'},
    {t:'us',q:'do / where / you / live / ?',a:'Where do you live?',hint:'WH + do + you + verb.',fu:'Now answer it!'},
    {t:'us',q:'does / what / she / do / ?',a:'What does she do?',hint:'What + does + she + verb.',fu:'Ask about a real person you know.'},
    {t:'ec',q:'Where you work?',a:'Where DO you work?',hint:'add the auxiliary.',fu:'Answer it about yourself!'},
    {t:'ec',q:'How old you are?',a:'How old ARE you?',hint:'with be, invert.',fu:'Ask ME how old I am — correctly!'},
    {t:'tr',q:'Make a question: answer is "I live in Curitiba." (ask where)',a:'Where do you live?',hint:'Where + do + you + live.',fu:'Ask me 2 more WH- questions.'},
    {t:'tr',q:'Make a question: answer is "She\'s a nurse." (ask job)',a:'What does she do?',hint:'What + does + she + do.',fu:'What do YOU do?'}
  ],
  c3:{
    fill:[{q:'___ do you live?',a:'Where',hint:'place.',fu:'Where?'},{q:'___ is your name?',a:'What',hint:'thing.',fu:'Answer!'}],
    mc:[{q:'"Where ___ she live?"',opts:['do','does'],a:'B — does',hint:'she→does.',fu:'Where?'},{q:'"___ are you sad?"',opts:['What','Why'],a:'B — Why',hint:'reason.',fu:'Answer!'}],
    us:[{q:'do / where / you / work',a:'Where do you work?',hint:'WH+do+you+verb.',fu:'Answer!'},{q:'is / who / she',a:'Who is she?',hint:'Who+is.',fu:'Tell me.'}],
    ec:[{q:'Where you live?',a:'Where DO you live?',hint:'auxiliary.',fu:'Answer!'},{q:'What means this?',a:'What DOES this mean?',hint:'does+base.',fu:'Try it.'}],
    tr:[{q:'Ask the place: "I work in a bank."',a:'Where do you work?',hint:'Where do.',fu:'Answer!'},{q:'Ask the time: "It starts at 8."',a:'When does it start?',hint:'When does.',fu:'Answer!'}]
  },
  makeit:['Ask me about my job: "What ______?"','Ask me about my weekend: "What ______?"','Ask me the reason for something: "Why ______?"','Ask me about a place I like: "Where ______?"','Ask me about time: "When ______?" or "What time ______?"','Interview me! Ask 3 WH- questions in a row.'],
  task:{
    title:'The Talk Show Host',
    mission:'You\'re a talk show host and I\'m your guest 🎤. Interview me with at least 8 WH- questions — and each new question should follow from my last answer (real curiosity, not a fixed list!). The audience wants a great interview!',
    kid:'You\'re the host of your own TV show! 🎤 Ask me LOTS of questions — what, where, why, how — and dig deeper with each answer!',
    roles:{student:'the host — asks well-formed WH- questions, builds on each answer',teacher:'the guest — gives answers with hooks that invite the next question'},
    complication:'I give a surprising answer ("I have a pet snake") — {name} must ask 2 follow-up WH- questions about it.',
    extras:['Speed interview: 5 different WH- words in 60 seconds.','Switch: I interview YOU — answer in full sentences.'],
    rescue:['What...?','Where...?','Why...?','How...?','When...?'],
    c4:'Prepare and run a 2-minute "podcast interview" on a topic I choose — at least 6 WH- questions, all following naturally.'
  },
  exit:[
    {tag:'🗣 speak',q:'Ask me 3 WH- questions in a row (what, where, why).'},
    {tag:'🗣 speak',q:'Interview a family member in your head — say 4 questions you\'d ask.'},
    {tag:'✏ create',q:'A question with "How much / How many / How old".'},
    {tag:'✏ create',q:'A "why" question for me.'},
    {tag:'⚠ fix it',q:'"Where you live?"',a:'Where DO you live?'},
    {tag:'💭 concept',q:'What\'s the word order of a WH- question? What can never be missing? Example.',a:'WH + auxiliar (do/does/is/are) + sujeito + verbo; o auxiliar nunca some'}
  ]
},

/* ══════════════ 16 · COUNTABLE & UNCOUNTABLE (A2) ══════════════ */
'countable-uncountable':{
  id:'countable-uncountable', name:'Countable & Uncountable', short:'Some / Any', level:'A2', family:'noun',
  slots:{
    form:'some (aff) · any (neg/perg) · many + contável · much + incontável', meaning:'contáveis (apple, book) × incontáveis (water, rice) mudam some/any e much/many',
    use:{yes:['some in positives','any in negatives/questions','many + countable plural','much + uncountable'],no:['many + uncountable ("many water" ✗)','counting uncountables ("two rices" ✗)']},
    contrast:'contável (conta: 1,2,3) × incontável (massa: água, arroz)', ptTrap:{bad:'How many water',good:'How much water',why:'água é incontável → much, não many'},
    visual:'table'
  },
  goal:{ can:'talk about food and quantities correctly — how much, how many, some, any', kid:'be a shopping helper: how much? how many? some? any?', teaser:'...the difference that stops "many waters" forever.' },
  warmup:{
    gap:['How... coffee do you drink a day?','How... languages do you speak?','...any food you never eat?'],
    kidGame:'Countable or not? I say a word, you say "one/two" or "some"!',
    hint:'Water: can you say "two waters"? Apples: "two apples"?'
  },
  notice:{
    examples:['There is <b>some</b> milk in the glass.','I don\'t have <b>any</b> money.','How <b>many</b> brothers do you have?','How <b>much</b> time do we have?'],
    altExamples:['Would you like <b>some</b> coffee?','There isn\'t <b>any</b> bread.','How <b>many</b> eggs do you want?','How <b>much</b> water do you drink?'],
    qs:{form:'some vs any — which goes where? many vs much — which noun each?',meaning:'Which words can you count one-by-one, and which can\'t?'},
    hints:['some appears in "yes" sentences; any in "no" and "?" ones.','many counts (eggs); much measures (water). Match them.','Can you count "money"? "rice"? Then it\'s much, not many.']
  },
  ccqs:{
    main:[
      {q:'"apple" — countable or uncountable?',a:'countable'},
      {q:'"water" — can you say "two waters"?',a:'no — uncountable'},
      {q:'Positive sentence: some or any?',a:'some'},
      {q:'"How ___ money?" — much or many?',a:'much (uncountable)'},
      {q:'"How many water?" — right? 😄',a:'no! How MUCH water'}
    ],
    reserve:[
      {q:'Negatives and questions take some or any?',a:'any'},
      {q:'many goes with countable or uncountable?',a:'countable'},
      {q:'"two rices" or "two bowls of rice"?',a:'two bowls of rice'}
    ]
  },
  rule:{
    text:'Countable nouns can be counted (one apple, two apples); uncountable nouns can\'t (water, rice, money, time). Quantity words follow: <b>some</b> in positives ("I have some money"), <b>any</b> in negatives and questions ("I don\'t have any / Do you have any?"). For "how much?": <b>many</b> + countable plural (how many eggs), <b>much</b> + uncountable (how much water). "A lot of" works with both. To count an uncountable, use a container: "two glasses of water".',
    kid:'Count it? → some / many / a number. Can\'t count it (water, rice)? → some / much. Any for no and questions!',
    pron:'some is weak /səm/ in "some milk"; any is /ˈeni/. "How much" /haʊ mʌtʃ/ vs "how many" /haʊ ˈmeni/ — clear vowels.',
    pt:'Português conta tudo ("muitas águas" soa ok). Inglês separa: água/arroz/dinheiro são incontáveis → much, não many. "How many water" é o erro nº1.',
    why:'Regra de ouro: dá para contar 1,2,3? → countable (many). É massa/líquido/abstrato? → uncountable (much). some no positivo, any no resto.'
  },
  watchout:[
    {bad:'How many water',good:'How MUCH water',why:'água é incontável → much'},
    {bad:'I have any apples',good:'I have SOME apples',why:'afirmativa → some'},
    {bad:'two rices',good:'two BOWLS of rice',why:'incontável precisa de recipiente'},
    {bad:'Do you have some money?',good:'Do you have ANY money?',why:'pergunta → any'}
  ],
  practice:[
    {t:'fill',q:'I have ___ (positive) apples in my bag.',a:'some',hint:'positive → some.',fu:'What fruit do you have at home?'},
    {t:'fill',q:'There isn\'t ___ (negative) milk left.',a:'any',hint:'negative → any.',fu:'What runs out fast in your kitchen?'},
    {t:'fill',q:'How ___ coffee do you drink a day? (uncountable)',a:'much',hint:'coffee = uncountable → much.',fu:'Honestly — how much? 😄'},
    {t:'mc',q:'"How ___ languages do you speak?"',opts:['much','many','any'],a:'B — many',hint:'languages = countable.',fu:'So HOW many? Which ones?'},
    {t:'mc',q:'"Would you like ___ tea?" (offer)',opts:['any','some','many'],a:'B — some',hint:'offers use some.',fu:'Tea or coffee for you?'},
    {t:'mc',q:'"There isn\'t ___ sugar."',opts:['some','any','many'],a:'B — any',hint:'negative → any.',fu:'Do you take sugar?'},
    {t:'us',q:'much / how / do / water / you / drink / ?',a:'How much water do you drink?',hint:'How much + uncountable + do you...',fu:'Answer it!'},
    {t:'us',q:'some / there / bread / is',a:'There is some bread.',hint:'positive → some.',fu:'What\'s in your kitchen right now?'},
    {t:'ec',q:'How many money do you have?',a:'How MUCH money do you have?',hint:'money = uncountable.',fu:'Don\'t answer that one! 😄'},
    {t:'ec',q:'I don\'t have some time.',a:'I don\'t have ANY time.',hint:'negative → any.',fu:'What do you never have time for?'},
    {t:'tr',q:'Make it a question: "You have some brothers." (how many)',a:'How many brothers do you have?',hint:'How many + countable.',fu:'Answer it!'},
    {t:'tr',q:'Positive → negative: "There is some milk."',a:'There isn\'t any milk.',hint:'some → any in negatives.',fu:'What isn\'t in your fridge?'}
  ],
  c3:{
    fill:[{q:'I have ___ apples.',a:'some',hint:'positive.',fu:'How many?'},{q:'Not ___ milk.',a:'any',hint:'negative.',fu:'None?'}],
    mc:[{q:'"How ___ eggs?"',opts:['much','many'],a:'B — many',hint:'countable.',fu:'How many?'},{q:'"How ___ water?"',opts:['much','many'],a:'A — much',hint:'uncountable.',fu:'A lot?'}],
    us:[{q:'some / have / I / bread',a:'I have some bread.',hint:'positive some.',fu:'How much?'},{q:'any / not / I / have / money',a:'I don\'t have any money.',hint:'negative any.',fu:'None?'}],
    ec:[{q:'many water',a:'MUCH water',hint:'uncountable.',fu:'How much?'},{q:'I have any tea.',a:'I have SOME tea.',hint:'positive.',fu:'A lot?'}],
    tr:[{q:'Question: "You have some money."',a:'Do you have any money?',hint:'any in questions.',fu:'Answer!'},{q:'Negative: "There are some eggs."',a:'There aren\'t any eggs.',hint:'any.',fu:'None?'}]
  },
  makeit:['In my fridge right now there is some ______ and some ______.','I don\'t have any ______ at home — I need to buy it.','I drink ______ (how much?) coffee/water every day.','I have ______ (how many?) ______ in my family.','There\'s a food I never have any of: ______.','Ask ME "How much...?" and "How many...?" — one of each!'],
  task:{
    title:'The Fridge Inspector',
    mission:'I\'m coming to cook at your house 🍳 — inspect your fridge and cupboards for me! Tell me what there is (some...) and isn\'t (not any...), and I\'ll ask "how much? how many?" for a shopping list. At least 8 quantity sentences!',
    kid:'You\'re the kitchen boss! 👨‍🍳 Check what you have: "some apples, some milk, no bread!" I ask how much and how many — help me shop!',
    roles:{student:'the host — reports quantities with some/any/much/many',teacher:'the guest cook — asks "how much/many?", builds a shopping list'},
    complication:'I want to cook something specific ("let\'s make a cake") — {name} checks if there are/enough ingredients.',
    extras:['Restaurant switch: you\'re the waiter — "how much/many would you like?"','Budget: buy only 5 things — decide the quantities out loud.'],
    rescue:['there is some...','there isn\'t any...','how much...?','how many...?'],
    c4:'Plan a dinner for 4 people: list ingredients with exact quantities (much/many, containers) — a full spoken shopping list.'
  },
  exit:[
    {tag:'🗣 speak',q:'What\'s in your kitchen? Use some / any / much / many (4 sentences).'},
    {tag:'🗣 speak',q:'Describe your eating in a day using quantities.'},
    {tag:'✏ create',q:'A "How much...?" question and a "How many...?" question.'},
    {tag:'✏ create',q:'A negative sentence with "any".'},
    {tag:'⚠ fix it',q:'"How many water do you drink?"',a:'How MUCH water do you drink?'},
    {tag:'💭 concept',q:'Countable vs uncountable — how do you know? And some vs any? Example.',a:'conta 1,2,3 → countable (many); massa → uncountable (much); some no positivo, any no resto'}
  ]
},

/* ══════════════ 17 · SHOULD / MUST / HAVE TO (A2) ══════════════ */
'should-must':{
  id:'should-must', name:'Should / Must / Have to', short:'Should / Must', level:'A2', family:'modal',
  slots:{
    form:'should/must + base · have to / has to · neg shouldn\'t / mustn\'t / don\'t have to', meaning:'conselho (should) e obrigação (must / have to); mustn\'t = proibido',
    use:{yes:['advice → should','strong obligation → must / have to','forbidden → mustn\'t','not necessary → don\'t have to'],no:['"to" after should/must ("should to" ✗)','has to → he/she/it']},
    contrast:'should (conselho) × must/have to (obrigação) × mustn\'t (proibição)', ptTrap:{bad:'You should to rest',good:'You should rest',why:'should/must são modais — verbo base, sem "to"'},
    visual:'table'
  },
  goal:{ can:'give advice and talk about rules and obligations in real situations', kid:'be the wise advisor: "You should...!" and the rule-keeper: "You mustn\'t...!"', teaser:'...three ways to tell people what to do — from gentle to serious.' },
  warmup:{
    gap:['I\'m tired all the time — what... I do? (advice)','One thing you... do every day at work? (obligation)','One thing people... do while driving? (forbidden)'],
    kidGame:'Advice game: I say a problem, you say "You should...!" — 3 rounds!',
    hint:'"You should..." + advice (rest? sleep? drink water?).'
  },
  notice:{
    examples:['You <b>should</b> see a doctor.','I <b>have to</b> work tomorrow.','You <b>mustn\'t</b> smoke here.','You <b>don\'t have to</b> come if you\'re tired.'],
    altExamples:['She <b>should</b> rest more.','He <b>has to</b> study for the exam.','You <b>must</b> stop at a red light.','We <b>shouldn\'t</b> eat so late.'],
    qs:{form:'What comes after should/must? And what changes to "has to"?',meaning:'Which is advice, which is a strong rule, and which means "don\'t do it"?'},
    hints:['Check the verb after should/must — base form, no "to".','should = a good idea; must/have to = no choice. Which sentences are which?','mustn\'t vs don\'t have to — "forbidden" or "not necessary"? Big difference!']
  },
  ccqs:{
    main:[
      {q:'"You should rest." — advice or obligation?',a:'advice'},
      {q:'"I have to work." — Do I have a choice?',a:'no — obligation'},
      {q:'"You mustn\'t smoke here." — Is it allowed?',a:'no — forbidden'},
      {q:'"You don\'t have to pay." — Must you pay?',a:'no — but you can'},
      {q:'"You should to go." — Correct? 😄',a:'no! → you should go'}
    ],
    reserve:[
      {q:'mustn\'t = forbidden or not necessary?',a:'forbidden'},
      {q:'don\'t have to = forbidden or not necessary?',a:'not necessary'},
      {q:'he ___ to work: have or has?',a:'has'}
    ]
  },
  rule:{
    text:'Three ways to talk about advice and obligation. <b>Should</b> = advice, a good idea ("You should rest"). <b>Must / have to</b> = strong obligation, no choice ("I must go / I have to work"). Note the negatives carry very different meanings: <b>mustn\'t</b> = forbidden ("you mustn\'t smoke"), while <b>don\'t have to</b> = not necessary ("you don\'t have to come"). should/must + base verb (no "to"); "have to" changes to <b>has to</b> for he/she/it.',
    kid:'should = good idea. must / have to = you really need to. mustn\'t = NO, don\'t! No "to" after should/must!',
    pron:'should /ʃʊd/ (silent l!), must /mʌst/, "have to" often /ˈhæftə/, "has to" /ˈhæstə/. mustn\'t /ˈmʌsnt/ (silent t in the middle).',
    pt:'"Should" = deveria (conselho). "Must/have to" = tem que (obrigação). Cuidado: são modais → sem "to" ("you should TO rest" ✗). E "mustn\'t" (proibido) ≠ "don\'t have to" (não precisa) — armadilha clássica.',
    why:'Regra de ouro: conselho → should; obrigação → must/have to; proibição → mustn\'t; dispensa → don\'t have to.'
  },
  watchout:[
    {bad:'You should to rest',good:'You should REST',why:'sem "to" após should'},
    {bad:'I must to go',good:'I must GO',why:'sem "to" após must'},
    {bad:'He have to work',good:'He HAS to work',why:'he/she/it → has to'},
    {bad:'You mustn\'t pay (= não precisa)',good:'You DON\'T HAVE TO pay',why:'mustn\'t = proibido, não "não precisa"'}
  ],
  practice:[
    {t:'fill',q:'You look sick — you ___ (advice) see a doctor.',a:'should',hint:'advice → should.',fu:'What should someone do for a cold?'},
    {t:'fill',q:'I ___ (obligation) work this Saturday.',a:'have to',hint:'obligation → have to.',fu:'What do you have to do this week?'},
    {t:'fill',q:'He ___ (obligation, he) study tonight.',a:'has to',hint:'he → has to.',fu:'What does someone in your family have to do?'},
    {t:'mc',q:'"You ___ park here — it\'s forbidden."',opts:['don\'t have to','mustn\'t','should'],a:'B — mustn\'t',hint:'forbidden → mustn\'t.',fu:'What mustn\'t you do at your job?'},
    {t:'mc',q:'"It\'s free — you ___ pay."',opts:['mustn\'t','don\'t have to','should'],a:'B — don\'t have to',hint:'not necessary → don\'t have to.',fu:'What don\'t you have to do on weekends?'},
    {t:'mc',q:'"You ___ drink more water."',opts:['should to','should','must to'],a:'B — should',hint:'no "to" after should.',fu:'Good advice? Do you drink enough?'},
    {t:'us',q:'see / should / a / you / doctor',a:'You should see a doctor.',hint:'You should + base.',fu:'Give me advice for stress.'},
    {t:'us',q:'to / has / work / she / early',a:'She has to work early.',hint:'has to + base.',fu:'What time do you have to start?'},
    {t:'ec',q:'You should to sleep more.',a:'You should SLEEP more.',hint:'no "to".',fu:'Do you sleep enough?'},
    {t:'ec',q:'He have to go now.',a:'He HAS to go now.',hint:'he → has to.',fu:'Where does he have to go?'},
    {t:'tr',q:'Give advice: "I\'m always tired."',a:'You should sleep more / rest more.',hint:'You should + base.',fu:'Take your own advice? 😄'},
    {t:'tr',q:'Make it forbidden: "smoking in here" (use mustn\'t)',a:'You mustn\'t smoke in here.',hint:'mustn\'t + base.',fu:'What else mustn\'t you do here?'}
  ],
  c3:{
    fill:[{q:'You ___ (advice) rest.',a:'should',hint:'advice.',fu:'Why?'},{q:'I ___ (obligation) go.',a:'have to',hint:'obligation.',fu:'Where?'}],
    mc:[{q:'"He ___ study."',opts:['have to','has to'],a:'B — has to',hint:'he→has.',fu:'For what?'},{q:'"You ___ smoke here."',opts:['don\'t have to','mustn\'t'],a:'B — mustn\'t',hint:'forbidden.',fu:'Why not?'}],
    us:[{q:'should / you / rest',a:'You should rest.',hint:'should+base.',fu:'Why?'},{q:'to / has / work / she',a:'She has to work.',hint:'has to.',fu:'When?'}],
    ec:[{q:'You should to go.',a:'You should GO.',hint:'no to.',fu:'Where?'},{q:'He have to study.',a:'He HAS to study.',hint:'has to.',fu:'What?'}],
    tr:[{q:'Advice: "I can\'t sleep."',a:'You should relax before bed.',hint:'You should.',fu:'Do you?'},{q:'Forbidden: "use phones here"',a:'You mustn\'t use phones here.',hint:'mustn\'t.',fu:'Why?'}]
  },
  makeit:['If you visit my city, you should ______.','Every day at work/school, I have to ______.','You mustn\'t ______ — it\'s a real rule where I live.','On weekends, I don\'t have to ______, and I love that.','My best advice for learning English: you should ______.','Ask ME for advice about something — I\'ll say "You should..."'],
  task:{
    title:'The Advice Studio',
    mission:'You run an advice studio 💡. I bring you problems (I\'m stressed, I sleep badly, I want to learn guitar) and you give real advice with should, and talk about what I must / mustn\'t / don\'t have to do. Solve at least 4 of my problems!',
    kid:'You\'re a wise wizard giving advice! 🧙 I tell you my problems, you say "You should...!" and "You mustn\'t...!" Help me with 4 troubles!',
    roles:{student:'the advisor — gives advice (should) and rules (must/mustn\'t/don\'t have to)',teacher:'the client — brings problems, pushes back ("but I don\'t have time!")'},
    complication:'I resist one piece of advice ("I can\'t do that!") — {name} offers a different should.',
    extras:['Rulebook round: give 3 rules for a place (gym, library, pool) with must/mustn\'t.','Reverse: I advise YOU — react and decide if you\'ll follow it.'],
    rescue:['You should...','you have to...','you mustn\'t...','you don\'t have to...'],
    c4:'Give a 60-second "survival guide" for a newcomer to your city or job: 3 shoulds, 2 musts, 1 mustn\'t.'
  },
  exit:[
    {tag:'🗣 speak',q:'Give me 2 pieces of advice with "should" for learning English.'},
    {tag:'🗣 speak',q:'What do you have to do — and not have to do — this week?'},
    {tag:'✏ create',q:'A "forbidden" sentence with "mustn\'t".'},
    {tag:'✏ create',q:'A "not necessary" sentence with "don\'t have to".'},
    {tag:'⚠ fix it',q:'"He have to work on Sunday."',a:'He HAS to work on Sunday.'},
    {tag:'💭 concept',q:'should vs must vs mustn\'t vs don\'t have to — one example of each.',a:'conselho / obrigação / proibido / não necessário'}
  ]
},

/* ══════════════ 18 · FIRST CONDITIONAL (B1) ══════════════ */
'first-conditional':{
  id:'first-conditional', name:'First Conditional', short:'First Conditional', level:'B1', family:'structure',
  slots:{
    form:'If + present simple, ... will + verbo base', meaning:'situações reais/possíveis no futuro e suas consequências: se X, então Y',
    use:{yes:['real/possible future','if + present, will + verb','when / unless','cause → consequence'],no:['"will" in the if-part ("if it will rain" ✗)','impossible/imaginary situations']},
    contrast:'zero conditional (fatos) × first (futuro possível)', ptTrap:{bad:'If it will rain, I will stay',good:'If it rains, I will stay',why:'depois de "if" usa-se o presente, não "will"'},
    visual:'table'
  },
  goal:{ can:'talk about real future possibilities and their consequences — plans, deals, warnings', kid:'make magic deals: "If you..., I will...!"', teaser:'...the "what if" of real life — and the door to the imaginary conditionals later.' },
  warmup:{
    gap:['If the weather is good this weekend, what... you... do?','If you have free time tonight, what... you...?','What... happen if you don\'t sleep tonight?'],
    kidGame:'Deal maker: "If you smile, I will...!" — make 3 fun deals!',
    hint:'"If it rains, I will..." — finish the deal.'
  },
  notice:{
    examples:['If it <b>rains</b>, I<b>\'ll stay</b> home.','If you <b>study</b>, you<b>\'ll pass</b> the exam.','I<b>\'ll call</b> you if I <b>have</b> time.','If you <b>don\'t hurry</b>, you<b>\'ll miss</b> the bus.'],
    altExamples:['If she <b>asks</b>, I<b>\'ll help</b> her.','We<b>\'ll go</b> out if it <b>stops</b> raining.','If he <b>arrives</b> late, we<b>\'ll start</b> without him.','You<b>\'ll feel</b> better if you <b>rest</b>.'],
    qs:{form:'Two clauses — which tense is in the "if" part, which in the other?',meaning:'Is this a real possibility, or pure imagination?'},
    hints:['Find "if" — what tense follows it? (not will!)','The other half uses will — which half?','Swap the order: does the comma move too?']
  },
  ccqs:{
    main:[
      {q:'"If it rains, I\'ll stay home." — Is rain possible?',a:'yes — real possibility'},
      {q:'Which part has "will": the if-part or the result?',a:'the result'},
      {q:'"If you study, you\'ll pass." — Study first, or pass first?',a:'study first'},
      {q:'"If it will rain..." — Correct? 😄',a:'no! → if it rains'},
      {q:'"unless" means...?',a:'if not'}
    ],
    reserve:[
      {q:'After "if", present or future?',a:'present'},
      {q:'"I\'ll help if you ___ (ask)." — ask or will ask?',a:'ask'},
      {q:'Can the "if" part come second? "I\'ll go if..."',a:'yes'}
    ]
  },
  rule:{
    text:'The First Conditional talks about real, possible futures and their consequences. Structure: <b>If + present simple, ... will + base verb</b> — "If it rains, I\'ll stay home." The key rule: after <b>if</b>, use the <u>present</u>, never "will" — the "will" lives only in the result half. You can flip the order ("I\'ll stay home if it rains" — no comma then). Related words: <b>when</b> (certain), <b>unless</b> (= if not).',
    kid:'IF + now, ... WILL + verb! "If you help me, I will help you!" The "if" part has no will!',
    pron:'"I\'ll" /aɪl/, "you\'ll" /juːl/ contract in the result. The if-clause often drops in pitch, the result rises.',
    pt:'Em português dizemos "SE chover, eu FICO/vou ficar" — os dois no mesmo tempo. Em inglês NÃO: depois de "if" é presente ("if it rains"), e o "will" só na outra parte. "If it will rain" é o erro nº1.',
    why:'Regra de ouro: um "will" por frase, e ele nunca fica na parte do "if". If + presente → will + base.'
  },
  watchout:[
    {bad:'If it will rain, I will stay',good:'If it RAINS, I will stay',why:'depois de if → presente'},
    {bad:'If I will have time, I will call',good:'If I HAVE time, I will call',why:'if + presente'},
    {bad:'I will help if you will ask',good:'I will help if you ASK',why:'a parte do if fica no presente'},
    {bad:'If you study, you pass',good:'If you study, you WILL pass',why:'a consequência leva will'}
  ],
  practice:[
    {t:'fill',q:'If it ___ (rain), we\'ll stay home.',a:'rains',hint:'after if → present.',fu:'What will you do if it rains this weekend?'},
    {t:'fill',q:'If you study hard, you ___ (pass) the test.',a:'will pass',hint:'result → will + base.',fu:'What are you studying for right now?'},
    {t:'fill',q:'I ___ (call) you if I ___ (have) time later.',a:'will call / have',hint:'result=will; if=present.',fu:'Who will you call if you have time today?'},
    {t:'mc',q:'"If you ___ now, you\'ll be on time."',opts:['will leave','leave','leaving'],a:'B — leave',hint:'after if → present.',fu:'Why not A? And are you usually on time?'},
    {t:'mc',q:'"If she asks me, I ___ say yes."',opts:['will','am','ask'],a:'A — will',hint:'result → will.',fu:'What would make you say yes to something?'},
    {t:'mc',q:'"You\'ll be tired if you ___ enough."',opts:['won\'t sleep','don\'t sleep','not sleep'],a:'B — don\'t sleep',hint:'if part, negative present.',fu:'Do you sleep enough?'},
    {t:'us',q:'stay / home / if / rains / it / I\'ll',a:'If it rains, I\'ll stay home.',hint:'If + present, will + verb.',fu:'And if it\'s sunny?'},
    {t:'us',q:'you / study / pass / if / will / you',a:'If you study, you will pass.',hint:'If + present, will.',fu:'True in your experience?'},
    {t:'ec',q:'If it will rain, I will stay home.',a:'If it RAINS, I will stay home.',hint:'if → present.',fu:'What will you do this weekend?'},
    {t:'ec',q:'I will help you if you will ask.',a:'I will help you if you ASK.',hint:'if part = present.',fu:'Will you ask me for help? 😄'},
    {t:'tr',q:'Join them: "Maybe it rains." + "I stay home."',a:'If it rains, I\'ll stay home.',hint:'If + present, will + base.',fu:'Make one about your weekend.'},
    {t:'tr',q:'Finish it: "If I have time this weekend, ..."',a:'..., I\'ll ___ (e.g. I\'ll visit my family).',hint:'result → will + base.',fu:'Say the real version for you!'}
  ],
  c3:{
    fill:[{q:'If it ___ (rain), I\'ll stay.',a:'rains',hint:'if→present.',fu:'And if not?'},{q:'You ___ (pass) if you study.',a:'will pass',hint:'result→will.',fu:'Studying now?'}],
    mc:[{q:'"If you ___, you\'ll win."',opts:['will try','try'],a:'B — try',hint:'if→present.',fu:'Will you?'},{q:'"I ___ help if you ask."',opts:['will','am'],a:'A — will',hint:'result.',fu:'Ask me!'}],
    us:[{q:'rains / if / it / stay / I\'ll',a:'If it rains, I\'ll stay.',hint:'if+present,will.',fu:'And if sunny?'},{q:'study / if / you / pass / will / you',a:'If you study, you will pass.',hint:'if+present,will.',fu:'True?'}],
    ec:[{q:'If it will rain...',a:'If it RAINS...',hint:'present.',fu:'Then what?'},{q:'if you will ask',a:'if you ASK',hint:'present.',fu:'Will you?'}],
    tr:[{q:'Join: "Maybe you hurry." + "You catch it."',a:'If you hurry, you\'ll catch it.',hint:'if+present,will.',fu:'Catch what?'},{q:'Finish: "If I win money, ..."',a:'..., I\'ll buy ___.',hint:'result will.',fu:'Really?'}]
  },
  makeit:['If it\'s sunny this weekend, I\'ll ______.','If I have enough money this year, I\'ll ______.','If I study English every day, I\'ll ______.','If you visit my city, I\'ll ______.','If I feel tired after this class, I\'ll ______.','Ask ME: "What will you do if...?"'],
  task:{
    title:'The Chain Reaction',
    mission:'We build a chain of consequences! I start ("If you win the lottery...") and you finish AND start the next link ("...I\'ll buy a house. And if I buy a house, ..."). Keep the chain going for at least 6 links without breaking the grammar!',
    kid:'Magic chain game! ⛓️ "If you eat the candy, you\'ll grow wings. If you grow wings, you\'ll..." — keep the story going!',
    roles:{student:'the chain-builder — completes and extends each "if... will..." link',teacher:'the starter — kicks off, reacts, catches any "if I will..." slip'},
    complication:'I throw a twist ("but if it goes wrong...?") — {name} adds a negative-consequence link.',
    extras:['Deal-making: negotiate with me — "If you..., I\'ll..." until we agree.','Warnings round: 3 "If you don\'t..., you\'ll..." warnings.'],
    rescue:['If I..., I\'ll...','then...','unless...','if you don\'t...'],
    c4:'Plan a real "if-then" strategy for a goal (a trip, an exam, a project): 4 conditional steps, each depending on the last.'
  },
  exit:[
    {tag:'🗣 speak',q:'3 real plans for your weekend using "If..., I\'ll...".'},
    {tag:'🗣 speak',q:'A chain of 2 consequences: "If I..., I\'ll..., and then..."'},
    {tag:'✏ create',q:'A first-conditional sentence with "unless" or "when".'},
    {tag:'✏ create',q:'A warning: "If you don\'t..., you\'ll..."'},
    {tag:'⚠ fix it',q:'"If it will rain, I will stay home."',a:'If it RAINS, I will stay home.'},
    {tag:'💭 concept',q:'Which tense after "if", and where does "will" go? One example.',a:'if + presente; will só na consequência (If it rains, I will stay)'}
  ]
}
};
