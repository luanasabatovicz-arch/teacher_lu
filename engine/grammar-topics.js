/* ============================================================
   GRAMMAR ENGINE v1 — CONTEÚDO (só dados; o motor nunca muda)
   4 tópicos migrados. Schema: 6 slots + §1–§10 + C2/C3.
   {name} = nome do aluno (personalização G7).
   ============================================================ */
const ENGINE_TOPICS={

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
    {t:'fill',q:'I ___ fine, and I ___ ready for class.',a:'am / am',hint:'Same word twice — the "I" word.',fu:'Now say it about ME.'},
    {t:'fill',q:'My best friend ___ very smart.',a:'is',hint:'One person → i...',fu:'Really? And how old is he/she?'},
    {t:'fill',q:'My parents ___ at work right now.',a:'are',hint:'Two people → a...',fu:'And where are YOU right now?'},
    {t:'mc',q:'"My city ___ beautiful."',opts:['am','is','are'],a:'B — is',hint:'city = it.',fu:'Why not C? And IS your city beautiful?'},
    {t:'mc',q:'"___ you happy today?"',opts:['Is','Am','Are'],a:'C — Are',hint:'with "you", one of the three is always the right one.',fu:'So — ARE you? Why?'},
    {t:'mc',q:'"I ___ not from the USA."',opts:['am','is','are'],a:'A — am',hint:'I → only one option ever.',fu:'Where are you from? Full sentence!'},
    {t:'us',q:'is / my / hungry / dog',a:'My dog is hungry.',hint:'Start with WHOSE dog.',fu:'Is YOUR pet hungry right now?'},
    {t:'us',q:'are / we / class / in / English',a:'We are in English class.',hint:'Who first, then are.',fu:'True or false right now?'},
    {t:'ec',q:'My sister have 10 years.',a:'My sister IS 10 (years old).',hint:'Age: be, not have.',fu:'How old is someone in YOUR family?'},
    {t:'ec',q:'You is my teacher.',a:'You ARE my teacher.',hint:'"you" never takes "is" — you → are.',fu:'Say one more thing about me with "are".'},
    {t:'tr',q:'Make it negative: "I am hungry."',a:'I am NOT hungry. / I\'m not hungry.',hint:'Add one small word after am.',fu:'Is it true? Are you hungry right now?'},
    {t:'tr',q:'Make it a question: "She is Brazilian."',a:'IS she Brazilian?',hint:'Move "is" to the front.',fu:'Ask me a question with "Are you...?"'}
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
}
};
