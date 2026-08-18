/* ==========================================================================
   Teacher Lu Platform — Practice Bank (data only)
   --------------------------------------------------------------------------
   The exercise bank that used to live inside exercise-generator.html.

   WHY IT MOVED
   ------------
   Content belongs in engine/*.js, next to grammar-topics.js and
   listening-content.js — never inside a page. Nothing else changed in
   this move: same topics, same order, same answers, same schema. The
   Exercise Bank page reads TeacherLu.PracticeBank.TOPICS and behaves
   exactly as before.

   THE ONE ADDITION — PERMANENT EXERCISE IDS
   -----------------------------------------
   Every exercise now carries a permanent `id`:

       <topic>-<format>-<NNN>      personal-mc-001
                                   past-complete-009
                                   reading-morning-match-006

   Format tokens: mc (multiple choice) · complete (fill in the blank)
                  tf (true/false block) · match (matching block)

   RULES FOR THESE IDS
   -------------------
   • The id is DATA, not a position. Reordering, inserting or deleting an
     exercise must never change the id of any other one — otherwise a
     student's practice log would silently point at the wrong exercise.
   • A true/false or matching BLOCK is one exercise unit with one id. Its
     statements/pairs are sub-items, not exercises.
   • New exercises get the next free number in their topic. Numbers of
     deleted exercises are never reused.
   • Run PracticeBank.audit() after editing this file.

   GRUPOS — QUANDO O EXERCÍCIO NÃO É A UNIDADE DE USO
   --------------------------------------------------
   Um tópico pode declarar um `groupId`. Isso diz: "pedagogicamente, o que
   se consome aqui é o CONJUNTO, não cada item".

   O caso é o Reading. Um texto tem 6 perguntas com 6 ids próprios, mas
   oferecer o mesmo texto de novo só porque sobraram 2 perguntas não é
   prática nova — o aluno reconhece o texto. Então:

     • cada pergunta continua registrando o seu id individual;
     • o `groupId` só é registrado quando TODAS as perguntas do tópico
       tiverem veredicto — inclusive somando aulas diferentes;
     • aula interrompida no meio deixa o grupo em aberto, e o texto
       continua disponível;
     • abrir o texto ou revelar uma resposta não fecha nada.

   O filtro futuro pergunta uma coisa só:

       PracticeLog.isDone(studentId, topic.groupId)

   e tira o texto inteiro do pool daquele aluno. Os ids individuais
   continuam existindo para o histórico — nada é apagado.

   Um groupId vive no mesmo espaço de nomes dos ids de exercício, então a
   auditoria também o verifica contra ausência e duplicidade.

   ========================================================================== */

(function (global) {
  'use strict';

  var NS = global.TeacherLu = global.TeacherLu || {};

var TOPICS = {
  personal:{ label:"Personal Info (to be)", keys:["personal","identity","i am","to be","name","apresent"], exercises:[
    {id:"personal-mc-001",type:"multiple_choice",question:"I ___ a teacher.",options:["am","is","are","be"],correct:0},
    {id:"personal-mc-002",type:"multiple_choice",question:"She ___ from Brazil.",options:["am","are","is","be"],correct:2},
    {id:"personal-mc-003",type:"multiple_choice",question:"They ___ my friends.",options:["is","am","are","be"],correct:2},
    {id:"personal-mc-004",type:"multiple_choice",question:"___ you happy today?",options:["Is","Am","Are","Be"],correct:2},
    {id:"personal-mc-005",type:"multiple_choice",question:"He ___ 45 years old.",options:["am","is","are","be"],correct:1},
    {id:"personal-mc-006",type:"multiple_choice",question:"We ___ students.",options:["is","am","are","been"],correct:2},
    {id:"personal-complete-007",type:"fill_blank",question:"My name ___ Ana.",correct:"is"},
    {id:"personal-complete-008",type:"fill_blank",question:"I ___ from Curitiba.",correct:"am"},
    {id:"personal-complete-009",type:"fill_blank",question:"You ___ very kind.",correct:"are"},
    {id:"personal-complete-010",type:"fill_blank",question:"It ___ a nice day.",correct:"is"},
    {id:"personal-complete-011",type:"fill_blank",question:"We ___ tired.",correct:"are"},
    {id:"personal-tf-012",type:"true_false",statements:[
      {text:"'I'm' is short for 'I am'.",answer:true},
      {text:"'She are happy' is correct.",answer:false},
      {text:"We use 'is' with he, she and it.",answer:true},
      {text:"'Are you a doctor?' is a question.",answer:true},
      {text:"'They is my family' is correct.",answer:false},
      {text:"'I'm not' means 'I am not'.",answer:true}
    ]},
    {id:"personal-match-013",type:"matching",question:"Match the word to its meaning:",pairs:[
      {left:"name",right:"what people call you"},{left:"age",right:"how old you are"},{left:"country",right:"a nation"},
      {left:"married",right:"has a husband or wife"},{left:"single",right:"not married"}
    ]}
  ]},

  jobs:{ label:"Jobs & Nationalities", keys:["job","profession","national","work","nacional"], exercises:[
    {id:"jobs-mc-001",type:"multiple_choice",question:"A person who teaches is a ___.",options:["doctor","teacher","nurse","pilot"],correct:1},
    {id:"jobs-mc-002",type:"multiple_choice",question:"A person from Brazil is ___.",options:["Brazil","Brazilian","Brazilic","Brazilish"],correct:1},
    {id:"jobs-mc-003",type:"multiple_choice",question:"A ___ works in a hospital and cares for patients.",options:["teacher","nurse","lawyer","chef"],correct:1},
    {id:"jobs-mc-004",type:"multiple_choice",question:"A person from the United States is ___.",options:["American","America","Americano","US"],correct:0},
    {id:"jobs-mc-005",type:"multiple_choice",question:"A person who designs bridges is an ___.",options:["artist","engineer","actor","author"],correct:1},
    {id:"jobs-mc-006",type:"multiple_choice",question:"What ___ you do for work?",options:["do","are","is","be"],correct:0},
    {id:"jobs-complete-007",type:"fill_blank",question:"I teach English. I'm a ___.",correct:"teacher"},
    {id:"jobs-complete-008",type:"fill_blank",question:"She's from Italy. She's ___.",correct:"italian"},
    {id:"jobs-complete-009",type:"fill_blank",question:"He flies planes. He's a ___.",correct:"pilot"},
    {id:"jobs-complete-010",type:"fill_blank",question:"A person who cooks in a restaurant is a ___.",correct:"chef"},
    {id:"jobs-complete-011",type:"fill_blank",question:"I'm from Brazil, so I'm ___.",correct:"brazilian"},
    {id:"jobs-tf-012",type:"true_false",statements:[
      {text:"A nurse works in a hospital.",answer:true},
      {text:"A person from France is 'Frenchian'.",answer:false},
      {text:"An engineer designs and builds things.",answer:true},
      {text:"'Teacher' is a nationality.",answer:false},
      {text:"A person from Japan is Japanese.",answer:true},
      {text:"A retired person works every day.",answer:false}
    ]},
    {id:"jobs-match-013",type:"matching",question:"Match the job to its meaning:",pairs:[
      {left:"teacher",right:"teaches students"},{left:"nurse",right:"cares for patients"},{left:"engineer",right:"designs machines"},
      {left:"lawyer",right:"works with the law"},{left:"retired",right:"stopped working"}
    ]}
  ]},

  family:{ label:"Family", keys:["family","famil","relatives"], exercises:[
    {id:"family-mc-001",type:"multiple_choice",question:"My mother's mother is my ___.",options:["aunt","grandmother","sister","cousin"],correct:1},
    {id:"family-mc-002",type:"multiple_choice",question:"My father's brother is my ___.",options:["uncle","cousin","nephew","grandfather"],correct:0},
    {id:"family-mc-003",type:"multiple_choice",question:"My brother's daughter is my ___.",options:["sister","niece","aunt","cousin"],correct:1},
    {id:"family-mc-004",type:"multiple_choice",question:"My sister's son is my ___.",options:["nephew","niece","uncle","cousin"],correct:0},
    {id:"family-mc-005",type:"multiple_choice",question:"The children of my aunt are my ___.",options:["siblings","cousins","parents","nieces"],correct:1},
    {id:"family-mc-006",type:"multiple_choice",question:"My wife's mother is my ___.",options:["sister","mother-in-law","aunt","cousin"],correct:1},
    {id:"family-complete-007",type:"fill_blank",question:"My mother and father are my ___.",correct:"parents"},
    {id:"family-complete-008",type:"fill_blank",question:"My brother and sister are my ___.",correct:"siblings"},
    {id:"family-complete-009",type:"fill_blank",question:"My son and daughter are my ___.",correct:"children"},
    {id:"family-complete-010",type:"fill_blank",question:"My father's wife is my ___.",correct:"mother"},
    {id:"family-complete-011",type:"fill_blank",question:"I'm married. My female partner is my ___.",correct:"wife"},
    {id:"family-tf-012",type:"true_false",statements:[
      {text:"Your parents are your mother and father.",answer:true},
      {text:"Your uncle is your mother's sister.",answer:false},
      {text:"Cousins are children of your parents' siblings.",answer:true},
      {text:"A daughter is a female child.",answer:true},
      {text:"Your grandmother is your mother's daughter.",answer:false},
      {text:"'Siblings' means brothers and sisters.",answer:true}
    ]},
    {id:"family-match-013",type:"matching",question:"Match the word to its meaning:",pairs:[
      {left:"mother",right:"female parent"},{left:"husband",right:"married man"},{left:"daughter",right:"female child"},
      {left:"brother",right:"male sibling"},{left:"parents",right:"mother and father"}
    ]}
  ]},

  routine:{ label:"Daily Routine", keys:["routine","daily","everyday","day"], exercises:[
    {id:"routine-mc-001",type:"multiple_choice",question:"I ___ up at 7 AM.",options:["wake","sleep","cook","work"],correct:0},
    {id:"routine-mc-002",type:"multiple_choice",question:"She ___ to work by bus.",options:["go","goes","going","gone"],correct:1},
    {id:"routine-mc-003",type:"multiple_choice",question:"I have ___ in the morning.",options:["dinner","breakfast","lunch","night"],correct:1},
    {id:"routine-mc-004",type:"multiple_choice",question:"He ___ a shower every day.",options:["take","takes","taking","took"],correct:1},
    {id:"routine-mc-005",type:"multiple_choice",question:"At night, I go to ___.",options:["bed","work","school","gym"],correct:0},
    {id:"routine-mc-006",type:"multiple_choice",question:"We ___ dinner at 8 PM.",options:["have","has","having","to have"],correct:0},
    {id:"routine-complete-007",type:"fill_blank",question:"I ___ up at 6 o'clock.",correct:"wake"},
    {id:"routine-complete-008",type:"fill_blank",question:"She ___ (go) to work at 8.",correct:"goes"},
    {id:"routine-complete-009",type:"fill_blank",question:"I ___ breakfast at 7.",correct:"have"},
    {id:"routine-complete-010",type:"fill_blank",question:"He ___ (brush) his teeth.",correct:"brushes"},
    {id:"routine-complete-011",type:"fill_blank",question:"They ___ eight hours.",correct:"sleep"},
    {id:"routine-tf-012",type:"true_false",statements:[
      {text:"We usually have breakfast in the morning.",answer:true},
      {text:"'He go to work' is correct.",answer:false},
      {text:"'Wake up' means to stop sleeping.",answer:true},
      {text:"People normally sleep at noon.",answer:false},
      {text:"'She has lunch at 1 PM' is correct.",answer:true},
      {text:"We add -s to the verb with he, she, it.",answer:true}
    ]},
    {id:"routine-match-013",type:"matching",question:"Match the action to its meaning:",pairs:[
      {left:"wake up",right:"stop sleeping"},{left:"have lunch",right:"eat at midday"},{left:"cook",right:"prepare food"},
      {left:"sleep",right:"rest at night"},{left:"go to bed",right:"go to sleep"}
    ]}
  ]},

  frequency:{ label:"Frequency", keys:["frequency","often","adverb","how often"], exercises:[
    {id:"frequency-mc-001",type:"multiple_choice",question:"'100% of the time' = ___.",options:["never","always","rarely","sometimes"],correct:1},
    {id:"frequency-mc-002",type:"multiple_choice",question:"'0% of the time' = ___.",options:["always","never","often","usually"],correct:1},
    {id:"frequency-mc-003",type:"multiple_choice",question:"I ___ drink coffee (about 90%).",options:["never","usually","rarely","sometimes"],correct:1},
    {id:"frequency-mc-004",type:"multiple_choice",question:"She is ___ late (rarely).",options:["rarely","always","often","usually"],correct:0},
    {id:"frequency-mc-005",type:"multiple_choice",question:"Correct: 'I ___ go to the gym.'",options:["always","go always","am always go","go to always"],correct:0},
    {id:"frequency-mc-006",type:"multiple_choice",question:"'Once a week' means ___.",options:["one time every week","every day","never","always"],correct:0},
    {id:"frequency-complete-007",type:"fill_blank",question:"I ___ eat breakfast.",correct:"always"},
    {id:"frequency-complete-008",type:"fill_blank",question:"He ___ smokes.",correct:"never"},
    {id:"frequency-complete-009",type:"fill_blank",question:"They ___ travel.",correct:"sometimes"},
    {id:"frequency-complete-010",type:"fill_blank",question:"She is ___ happy.",correct:"usually"},
    {id:"frequency-complete-011",type:"fill_blank",question:"We go to church ___ a week.",correct:"once"},
    {id:"frequency-tf-012",type:"true_false",statements:[
      {text:"'Always' means 100% of the time.",answer:true},
      {text:"Frequency adverbs go after the main verb.",answer:false},
      {text:"'Never' is a negative idea.",answer:true},
      {text:"'She is always late' is correct.",answer:true},
      {text:"'I go usually to work' is correct word order.",answer:false},
      {text:"'Every day' means daily.",answer:true}
    ]},
    {id:"frequency-match-013",type:"matching",question:"Match the adverb to its meaning:",pairs:[
      {left:"always",right:"100% of the time"},{left:"never",right:"0% of the time"},{left:"sometimes",right:"now and then"},
      {left:"usually",right:"most of the time"},{left:"rarely",right:"almost never"}
    ]}
  ]},

  freetime:{ label:"Free Time / Hobbies", keys:["free time","hobby","hobbies","leisure","freetime","tempo livre"], exercises:[
    {id:"freetime-mc-001",type:"multiple_choice",question:"I like ___ (read) books.",options:["read","reading","reads","to reading"],correct:1},
    {id:"freetime-mc-002",type:"multiple_choice",question:"She loves ___ (dance).",options:["dance","dancing","dances","danced"],correct:1},
    {id:"freetime-mc-003",type:"multiple_choice",question:"I don't ___ cooking.",options:["likes","like","liking","to like"],correct:1},
    {id:"freetime-mc-004",type:"multiple_choice",question:"He ___ playing video games.",options:["enjoy","enjoys","enjoying","to enjoy"],correct:1},
    {id:"freetime-mc-005",type:"multiple_choice",question:"'I hate ___ early' (wake).",options:["wake","waking","wakes","woke"],correct:1},
    {id:"freetime-mc-006",type:"multiple_choice",question:"A ___ is an activity you do for fun.",options:["job","hobby","homework","chore"],correct:1},
    {id:"freetime-complete-007",type:"fill_blank",question:"I like ___ (listen) to music.",correct:"listening"},
    {id:"freetime-complete-008",type:"fill_blank",question:"She enjoys ___ (paint).",correct:"painting"},
    {id:"freetime-complete-009",type:"fill_blank",question:"They love ___ (travel).",correct:"traveling"},
    {id:"freetime-complete-010",type:"fill_blank",question:"I don't like ___ (cook).",correct:"cooking"},
    {id:"freetime-complete-011",type:"fill_blank",question:"My favorite ___ is reading.",correct:"hobby"},
    {id:"freetime-tf-012",type:"true_false",statements:[
      {text:"After 'like', the verb takes -ing.",answer:true},
      {text:"'I like read' is correct.",answer:false},
      {text:"'Enjoy' is followed by -ing.",answer:true},
      {text:"A hobby is something you do for work.",answer:false},
      {text:"'She loves dancing' is correct.",answer:true},
      {text:"'Don't' is used with I, you, we, they.",answer:true}
    ]},
    {id:"freetime-match-013",type:"matching",question:"Match the word to its meaning:",pairs:[
      {left:"read",right:"look at a book"},{left:"travel",right:"go to other places"},{left:"dance",right:"move to music"},
      {left:"relax",right:"rest and calm down"},{left:"hobby",right:"a free-time activity"}
    ]}
  ]},

  sports:{ label:"Sports", keys:["sport","sports"], exercises:[
    {id:"sports-mc-001",type:"multiple_choice",question:"You play this with feet and a ball: ___.",options:["tennis","football","swimming","boxing"],correct:1},
    {id:"sports-mc-002",type:"multiple_choice",question:"This sport is in water: ___.",options:["running","swimming","cycling","golf"],correct:1},
    {id:"sports-mc-003",type:"multiple_choice",question:"You ride a bike in ___.",options:["walking","cycling","yoga","boxing"],correct:1},
    {id:"sports-mc-004",type:"multiple_choice",question:"Right now I ___ (play) tennis.",options:["play","am playing","plays","played"],correct:1},
    {id:"sports-mc-005",type:"multiple_choice",question:"She ___ (run) in the park at the moment.",options:["runs","is running","run","ran"],correct:1},
    {id:"sports-mc-006",type:"multiple_choice",question:"A group of players is a ___.",options:["team","gym","coach","ball"],correct:0},
    {id:"sports-complete-007",type:"fill_blank",question:"I go to the ___ to exercise.",correct:"gym"},
    {id:"sports-complete-008",type:"fill_blank",question:"Look! They ___ (swim) now.",correct:"are swimming"},
    {id:"sports-complete-009",type:"fill_blank",question:"He usually ___ (play) football on Sundays.",correct:"plays"},
    {id:"sports-complete-010",type:"fill_blank",question:"Right now we ___ (watch) a game.",correct:"are watching"},
    {id:"sports-complete-011",type:"fill_blank",question:"My favorite ___ is basketball.",correct:"sport"},
    {id:"sports-tf-012",type:"true_false",statements:[
      {text:"Present continuous = am/is/are + verb-ing.",answer:true},
      {text:"'I am play football now' is correct.",answer:false},
      {text:"Swimming is a water sport.",answer:true},
      {text:"'She plays tennis every week' talks about a habit.",answer:true},
      {text:"'They are run' is correct.",answer:false},
      {text:"A team is one single player.",answer:false}
    ]},
    {id:"sports-match-013",type:"matching",question:"Match the word to its meaning:",pairs:[
      {left:"football",right:"game with feet and a ball"},{left:"swimming",right:"sport in water"},{left:"gym",right:"place to exercise"},
      {left:"team",right:"group of players"},{left:"win",right:"to be first"}
    ]}
  ]},

  food:{ label:"Food & Drinks", keys:["food","eat","drink","comida"], exercises:[
    {id:"food-mc-001",type:"multiple_choice",question:"Which is a fruit? ___.",options:["carrot","apple","lettuce","potato"],correct:1},
    {id:"food-mc-002",type:"multiple_choice",question:"Which is a drink? ___.",options:["bread","water","rice","meat"],correct:1},
    {id:"food-mc-003",type:"multiple_choice",question:"Which is a vegetable? ___.",options:["banana","carrot","milk","chicken"],correct:1},
    {id:"food-mc-004",type:"multiple_choice",question:"We ___ breakfast in the morning.",options:["have","has","having","drinks"],correct:0},
    {id:"food-mc-005",type:"multiple_choice",question:"Rice is ___ : we say 'some rice'.",options:["countable","uncountable","plural","a number"],correct:1},
    {id:"food-mc-006",type:"multiple_choice",question:"'How ___ apples do you want?'",options:["much","many","any","lot"],correct:1},
    {id:"food-complete-007",type:"fill_blank",question:"I drink ___ in the morning.",correct:"coffee"},
    {id:"food-complete-008",type:"fill_blank",question:"An ___ a day keeps the doctor away.",correct:"apple"},
    {id:"food-complete-009",type:"fill_blank",question:"I have ___ for breakfast.",correct:"eggs"},
    {id:"food-complete-010",type:"fill_blank",question:"'How ___ water do you drink?'",correct:"much"},
    {id:"food-complete-011",type:"fill_blank",question:"Chicken and beef are types of ___.",correct:"meat"},
    {id:"food-tf-012",type:"true_false",statements:[
      {text:"An apple is a fruit.",answer:true},
      {text:"Chicken is a vegetable.",answer:false},
      {text:"Water is a drink.",answer:true},
      {text:"We use 'many' with countable nouns.",answer:true},
      {text:"'Rice' is countable: one rice, two rices.",answer:false},
      {text:"Milk is a dairy product.",answer:true}
    ]},
    {id:"food-match-013",type:"matching",question:"Match the word to its meaning:",pairs:[
      {left:"apple",right:"a round fruit"},{left:"water",right:"a clear drink"},{left:"bread",right:"made from wheat"},
      {left:"meat",right:"chicken or beef"},{left:"egg",right:"comes from a hen"}
    ]}
  ]},

  restaurant:{ label:"Restaurant", keys:["restaurant","order","waiter","menu"], exercises:[
    {id:"restaurant-mc-001",type:"multiple_choice",question:"I ___ like a coffee, please.",options:["would","will","want to","am"],correct:0},
    {id:"restaurant-mc-002",type:"multiple_choice",question:"The person who serves you is the ___.",options:["chef","waiter","manager","guest"],correct:1},
    {id:"restaurant-mc-003",type:"multiple_choice",question:"You pay at the end. You ask for the ___.",options:["menu","bill","tip","order"],correct:1},
    {id:"restaurant-mc-004",type:"multiple_choice",question:"___ you like a dessert?",options:["Would","Do","Are","Will"],correct:0},
    {id:"restaurant-mc-005",type:"multiple_choice",question:"The sweet dish at the end is the ___.",options:["starter","main course","dessert","side"],correct:2},
    {id:"restaurant-mc-006",type:"multiple_choice",question:"Extra money for good service is a ___.",options:["bill","tip","price","discount"],correct:1},
    {id:"restaurant-complete-007",type:"fill_blank",question:"I'd like ___ book a table for two.",correct:"to"},
    {id:"restaurant-complete-008",type:"fill_blank",question:"___ I have the menu, please?",correct:"could"},
    {id:"restaurant-complete-009",type:"fill_blank",question:"The list of food is the ___.",correct:"menu"},
    {id:"restaurant-complete-010",type:"fill_blank",question:"We'd like ___ order now.",correct:"to"},
    {id:"restaurant-complete-011",type:"fill_blank",question:"The paper showing what you pay is the ___.",correct:"bill"},
    {id:"restaurant-tf-012",type:"true_false",statements:[
      {text:"'I'd like' is more polite than 'I want'.",answer:true},
      {text:"A starter comes after the main course.",answer:false},
      {text:"'Could I have...?' is a polite request.",answer:true},
      {text:"A waiter cooks the food.",answer:false},
      {text:"You ask for the bill when you want to pay.",answer:true},
      {text:"'Would you like a drink?' is an offer.",answer:true}
    ]},
    {id:"restaurant-match-013",type:"matching",question:"Match the word to its meaning:",pairs:[
      {left:"menu",right:"list of dishes"},{left:"waiter",right:"person who serves"},{left:"bill",right:"what you must pay"},
      {left:"tip",right:"extra money for service"},{left:"dessert",right:"sweet dish at the end"}
    ]}
  ]},

  shopping:{ label:"Shopping", keys:["shopping","shop","buy","price","store"], exercises:[
    {id:"shopping-mc-001",type:"multiple_choice",question:"___ shirt here is nice.",options:["This","That","These","Those"],correct:0},
    {id:"shopping-mc-002",type:"multiple_choice",question:"___ shoes here are expensive.",options:["This","That","These","Those"],correct:2},
    {id:"shopping-mc-003",type:"multiple_choice",question:"How much ___ this bag?",options:["is","are","do","does"],correct:0},
    {id:"shopping-mc-004",type:"multiple_choice",question:"How much ___ those glasses?",options:["is","are","do","much"],correct:1},
    {id:"shopping-mc-005",type:"multiple_choice",question:"Something that costs a lot is ___.",options:["cheap","expensive","free","small"],correct:1},
    {id:"shopping-mc-006",type:"multiple_choice",question:"Money taken off the price is a ___.",options:["bill","receipt","discount","tip"],correct:2},
    {id:"shopping-complete-007",type:"fill_blank",question:"___ car over there is new.",correct:"that"},
    {id:"shopping-complete-008",type:"fill_blank",question:"How ___ is this shirt?",correct:"much"},
    {id:"shopping-complete-009",type:"fill_blank",question:"The paper proving you paid is the ___.",correct:"receipt"},
    {id:"shopping-complete-010",type:"fill_blank",question:"It costs little money. It's ___.",correct:"cheap"},
    {id:"shopping-complete-011",type:"fill_blank",question:"I don't have cash. Can I pay by ___ card?",correct:"credit"},
    {id:"shopping-tf-012",type:"true_false",statements:[
      {text:"'These' is plural and near.",answer:true},
      {text:"'That' is used for things near you.",answer:false},
      {text:"'How much is it?' asks about the price.",answer:true},
      {text:"Cheap is the opposite of expensive.",answer:true},
      {text:"'How much are this shoes?' is correct.",answer:false},
      {text:"A receipt proves you paid.",answer:true}
    ]},
    {id:"shopping-match-013",type:"matching",question:"Match the word to its meaning:",pairs:[
      {left:"price",right:"how much it costs"},{left:"discount",right:"money off"},{left:"receipt",right:"proof of payment"},
      {left:"cash",right:"notes and coins"},{left:"size",right:"how big it is"}
    ]}
  ]},

  clothes:{ label:"Clothes", keys:["clothes","clothing","wear","dress"], exercises:[
    {id:"clothes-mc-001",type:"multiple_choice",question:"Right now I ___ a shirt.",options:["wear","am wearing","wears","wore"],correct:1},
    {id:"clothes-mc-002",type:"multiple_choice",question:"I usually ___ jeans at the weekend.",options:["wear","am wearing","wearing","worn"],correct:0},
    {id:"clothes-mc-003",type:"multiple_choice",question:"You wear these on your feet: ___.",options:["gloves","shoes","hat","scarf"],correct:1},
    {id:"clothes-mc-004",type:"multiple_choice",question:"She ___ a uniform every day.",options:["wear","wears","is wear","wearing"],correct:1},
    {id:"clothes-mc-005",type:"multiple_choice",question:"A short coat is a ___.",options:["dress","jacket","shirt","sock"],correct:1},
    {id:"clothes-mc-006",type:"multiple_choice",question:"To put clothes on to test them is to ___.",options:["try on","wear out","take off","fit in"],correct:0},
    {id:"clothes-complete-007",type:"fill_blank",question:"Today I ___ (wear) a dress.",correct:"am wearing"},
    {id:"clothes-complete-008",type:"fill_blank",question:"He ___ (wear) a suit to work every day.",correct:"wears"},
    {id:"clothes-complete-009",type:"fill_blank",question:"Clothing for your legs: ___.",correct:"trousers"},
    {id:"clothes-complete-010",type:"fill_blank",question:"These shoes are the right size. They ___ me.",correct:"fit"},
    {id:"clothes-complete-011",type:"fill_blank",question:"It looks good on you: 'It ___ you.'",correct:"suits"},
    {id:"clothes-tf-012",type:"true_false",statements:[
      {text:"'I'm wearing jeans' talks about now.",answer:true},
      {text:"'I wear a coat now' is the best way to say what you have on at this moment.",answer:false},
      {text:"'Trousers' is plural in English.",answer:true},
      {text:"A jacket is a kind of shoe.",answer:false},
      {text:"'It suits you' is a compliment.",answer:true},
      {text:"'She wears black every day' describes a habit.",answer:true}
    ]},
    {id:"clothes-match-013",type:"matching",question:"Match the word to its meaning:",pairs:[
      {left:"wear",right:"have clothes on"},{left:"try on",right:"test clothes in a shop"},{left:"fit",right:"be the right size"},
      {left:"jacket",right:"a short coat"},{left:"comfortable",right:"easy and nice to wear"}
    ]}
  ]},

  city:{ label:"City & Directions", keys:["city","directions","places","town"], exercises:[
    {id:"city-mc-001",type:"multiple_choice",question:"___ a bank near my house.",options:["There is","There are","It is","Have"],correct:0},
    {id:"city-mc-002",type:"multiple_choice",question:"___ three parks in my city.",options:["There is","There are","It has","Have"],correct:1},
    {id:"city-mc-003",type:"multiple_choice",question:"You buy medicine at the ___.",options:["bank","pharmacy","bakery","library"],correct:1},
    {id:"city-mc-004",type:"multiple_choice",question:"The cinema is ___ the square. (facing it)",options:["next","opposite","between","on"],correct:1},
    {id:"city-mc-005",type:"multiple_choice",question:"My house is ___ the school and the bank.",options:["next","opposite","between","near of"],correct:2},
    {id:"city-mc-006",type:"multiple_choice",question:"To change direction: '___ left at the corner.'",options:["Go","Turn","Cross","Take"],correct:1},
    {id:"city-complete-007",type:"fill_blank",question:"___ a park near here?",correct:"is there"},
    {id:"city-complete-008",type:"fill_blank",question:"The pharmacy is ___ to the bank.",correct:"next"},
    {id:"city-complete-009",type:"fill_blank",question:"The city centre is also called ___.",correct:"downtown"},
    {id:"city-complete-010",type:"fill_blank",question:"You wait for the bus at the bus ___.",correct:"stop"},
    {id:"city-complete-011",type:"fill_blank",question:"The area where you live is your ___.",correct:"neighbourhood"},
    {id:"city-tf-012",type:"true_false",statements:[
      {text:"'There are' is used with plural nouns.",answer:true},
      {text:"'There is two parks' is correct.",answer:false},
      {text:"'Opposite' means facing something.",answer:true},
      {text:"'Between' needs two things.",answer:true},
      {text:"A pharmacy is where you keep money.",answer:false},
      {text:"'Turn right' is a direction.",answer:true}
    ]},
    {id:"city-match-013",type:"matching",question:"Match the word to its meaning:",pairs:[
      {left:"downtown",right:"the city centre"},{left:"pharmacy",right:"where you buy medicine"},{left:"square",right:"open public space"},
      {left:"next to",right:"at the side of"},{left:"between",right:"in the middle of two"}
    ]}
  ]},

  past:{ label:"Past Simple", keys:["past","yesterday","ago","last"], exercises:[
    {id:"past-mc-001",type:"multiple_choice",question:"Yesterday I ___ to the park.",options:["go","went","gone","going"],correct:1},
    {id:"past-mc-002",type:"multiple_choice",question:"She ___ tennis last week.",options:["play","played","plays","playing"],correct:1},
    {id:"past-mc-003",type:"multiple_choice",question:"I ___ watch TV last night.",options:["didn't","don't","wasn't","haven't"],correct:0},
    {id:"past-mc-004",type:"multiple_choice",question:"___ you like the film?",options:["Did","Do","Was","Were"],correct:0},
    {id:"past-mc-005",type:"multiple_choice",question:"We ___ dinner at 8 last night.",options:["have","had","has","having"],correct:1},
    {id:"past-mc-006",type:"multiple_choice",question:"He ___ a new car two years ago.",options:["buy","bought","buys","buyed"],correct:1},
    {id:"past-complete-007",type:"fill_blank",question:"I ___ (work) yesterday.",correct:"worked"},
    {id:"past-complete-008",type:"fill_blank",question:"She ___ (go) to Rio last year.",correct:"went"},
    {id:"past-complete-009",type:"fill_blank",question:"They ___ (not/come) to the party.",correct:"didn't come"},
    {id:"past-complete-010",type:"fill_blank",question:"___ you ___ (eat) lunch?",correct:"Did / eat"},
    {id:"past-complete-011",type:"fill_blank",question:"He ___ (study) all night.",correct:"studied"},
    {id:"past-tf-012",type:"true_false",statements:[
      {text:"Regular past verbs end in -ed.",answer:true},
      {text:"'I didn't went' is correct.",answer:false},
      {text:"After 'did', we use the base verb.",answer:true},
      {text:"'Yesterday' is a past signal word.",answer:true},
      {text:"The past of 'go' is 'goed'.",answer:false},
      {text:"'Was' and 'were' are past forms of 'to be'.",answer:true}
    ]},
    {id:"past-match-013",type:"matching",question:"Match the verb to its past form:",pairs:[
      {left:"go",right:"went"},{left:"have",right:"had"},{left:"see",right:"saw"},
      {left:"buy",right:"bought"},{left:"eat",right:"ate"}
    ]},

    /* ---- CONTEÚDO PILOTO — formatos novos ------------------------------
       Poucos itens de propósito: o objetivo aqui é validar os renderers em
       aula, não encher o banco. Numeração continua de onde o tópico parou
       (013), sem reaproveitar número de item nenhum. -------------------- */

    // MAKE A QUESTION — a resposta está dada; o aluno formula a pergunta.
    {id:"past-question-014",type:"make_question",
      answer:"I went to London last year.",prompt:"Ask about the place.",
      correct:"Where did you go last year?"},
    {id:"past-question-015",type:"make_question",
      answer:"She bought a new phone because the old one broke.",prompt:"Ask about the reason.",
      correct:"Why did she buy a new phone?"},
    {id:"past-question-016",type:"make_question",
      answer:"They arrived at eight o'clock.",prompt:"Ask about the time.",
      correct:"When did they arrive?"},
    {id:"past-question-017",type:"make_question",
      answer:"My brother cooked dinner yesterday.",prompt:"Ask about the person.",
      correct:"Who cooked dinner yesterday?"},
    {id:"past-question-018",type:"make_question",
      answer:"We watched three films last weekend.",prompt:"Ask about the quantity.",
      correct:"How many films did you watch last weekend?"},

    // COMPLETE THE STORY — 8 lacunas, word bank opcional (níveis mais baixos).
    {id:"past-story-019",type:"story",
      title:"A Lucky Day",
      context:"Last Saturday something very good happened to Ana.",
      wordBank:["bought","went","won","called","celebrated","was","did not sleep","opened"],
      text:"Last Saturday Ana ___ to the shop near her house. She ___ a lottery ticket "+
           "and put it in her bag. In the evening she ___ the newspaper and checked the "+
           "numbers. She ___ two thousand reais! She ___ so happy that she ___ her sister "+
           "immediately. They ___ with a pizza and a film. That night Ana ___ very well — "+
           "she was too excited.",
      answers:["went","bought","opened","won","was","called","celebrated","did not sleep"]},

    // COMPLETE THE DIALOGUE — 6 lacunas, mesma infraestrutura da Story.
    {id:"past-dialogue-020",type:"dialogue",
      title:"Where were you?",
      context:"Two colleagues meet on Monday morning.",
      wordBank:["were","was","didn't","did","went","had"],
      lines:[
        {who:"A",text:"Where ___ you yesterday?"},
        {who:"B",text:"I ___ at home all day."},
        {who:"A",text:"Why ___ you come to the party?"},
        {who:"B",text:"Because I ___ a terrible headache."},
        {who:"A",text:"Oh no. ___ you take anything for it?"},
        {who:"B",text:"Yes, and then I ___ straight to bed."}
      ],
      answers:["were","was","didn't","had","Did","went"]},

    // MAKE A SENTENCE — produção oral. Não há correção automática.
    {id:"past-sentence-021",type:"make_sentence",
      instruction:"Choose a verb and make a sentence in the Simple Past.",
      verbs:["buy","drink","eat","go","listen","look","play","sell","sleep","walk","watch","work"]}
  ]},

  travel:{ label:"Travel", keys:["travel","trip","vacation","holiday","viagem"], exercises:[
    {id:"travel-mc-001",type:"multiple_choice",question:"You need a ___ to travel to another country.",options:["ticket","passport","map","hotel"],correct:1},
    {id:"travel-mc-002",type:"multiple_choice",question:"You sleep here on a trip: ___.",options:["airport","hotel","station","beach"],correct:1},
    {id:"travel-mc-003",type:"multiple_choice",question:"You travel by air in an ___.",options:["car","airplane","train","ship"],correct:1},
    {id:"travel-mc-004",type:"multiple_choice",question:"You pack your clothes in a ___.",options:["wallet","suitcase","passport","ticket"],correct:1},
    {id:"travel-mc-005",type:"multiple_choice",question:"A ship travels on the ___.",options:["land","sea","air","road"],correct:1},
    {id:"travel-mc-006",type:"multiple_choice",question:"You buy a ___ to enter the plane.",options:["suitcase","ticket","hotel","map"],correct:1},
    {id:"travel-complete-007",type:"fill_blank",question:"I keep my clothes in a ___.",correct:"suitcase"},
    {id:"travel-complete-008",type:"fill_blank",question:"We fly in an ___.",correct:"airplane"},
    {id:"travel-complete-009",type:"fill_blank",question:"At night we stay in a ___.",correct:"hotel"},
    {id:"travel-complete-010",type:"fill_blank",question:"I need my ___ to travel abroad.",correct:"passport"},
    {id:"travel-complete-011",type:"fill_blank",question:"A ___ travels on rails.",correct:"train"},
    {id:"travel-tf-012",type:"true_false",statements:[
      {text:"A plane is used for air travel.",answer:true},
      {text:"A train travels on water.",answer:false},
      {text:"A hotel is a place to stay.",answer:true},
      {text:"You need a passport to travel to another country.",answer:true},
      {text:"A suitcase is a small wallet.",answer:false},
      {text:"The sea is where ships travel.",answer:true}
    ]},
    {id:"travel-match-013",type:"matching",question:"Match the word to its meaning:",pairs:[
      {left:"passport",right:"travel document"},{left:"suitcase",right:"bag for clothes"},{left:"airplane",right:"flies in the sky"},
      {left:"hotel",right:"place to sleep on a trip"},{left:"ticket",right:"pass to travel"}
    ]}
  ]},

  /* ================= READING (Fase 1 piloto) =================
     Extensão MÍNIMA do schema: cada topic pode expor um objeto `passage`
     opcional { title, level, text }. O ActivityRunner exibe o texto de
     forma "sticky" acima dos exercícios para que o aluno possa reler.
     Nenhum tipo de exercício novo é criado — MC + Fill in the Blank +
     Match são reutilizados exatamente como já são.
     ==========================================================*/
  reading_my_morning:{
    label:"Reading · A1 · My Morning",
    keys:["reading","routine","morning","daily"],
    /* UNIDADE DE USO — ver bloco "GRUPOS" no topo deste arquivo.
       As 6 perguntas mantêm seus ids individuais; o texto inteiro só é
       consumido quando todas elas tiverem veredicto. */
    groupId:"reading-morning-001",
    passage:{
      level:"A1",
      title:"My Morning",
      text:"Hi! I'm Ana. Every morning I wake up at seven o'clock. First, I drink a glass of water and take a shower. Then I have breakfast — usually coffee, bread and fruit. I like fruit a lot. I leave home at eight and I go to work by bus. It takes about thirty minutes. I never have breakfast at work."
    },
    exercises:[
      // 1 · overall comprehension
      {id:"reading-morning-mc-001",type:"multiple_choice",question:"What is the text mainly about?",
        options:["Ana's job","Ana's morning routine","Ana's weekend","Ana's family"],correct:1},
      // 2 · specific information
      {id:"reading-morning-mc-002",type:"multiple_choice",question:"What time does Ana wake up?",
        options:["Six o'clock","Seven o'clock","Eight o'clock","Nine o'clock"],correct:1},
      // 3 · specific information
      {id:"reading-morning-complete-003",type:"fill_blank",question:"Ana goes to work ___ bus.",correct:"by"},
      // 4 · vocabulary from context
      {id:"reading-morning-mc-004",type:"multiple_choice",question:"In the text, \"I leave home\" means...",
        options:["I clean my house","I go out of my house","I stay at home","I sell my house"],correct:1},
      // 5 · linguistic structure present in the text (Present Simple 3rd person -s)
      {id:"reading-morning-complete-005",type:"fill_blank",question:"Ana ___ (drink) a glass of water in the morning.",correct:"drinks"},
      // 6 · vocabulary in context (match)
      {id:"reading-morning-match-006",type:"matching",question:"Match the word from the text to its meaning:",pairs:[
        {left:"wake up",right:"to stop sleeping"},
        {left:"take a shower",right:"to wash your body with water"},
        {left:"breakfast",right:"the first meal of the day"},
        {left:"by bus",right:"using a bus"}
      ]}
    ]
  }
};
  /* ======================================================================
     API
     ----------------------------------------------------------------------
     Uma peça só resolve três perguntas:
       "o que existe?"        -> all() / query()
       "que tópicos há?"      -> topics()
       "os ids estão sãos?"   -> audit()

     FONTES EXTERNAS
     ---------------
     Outros bancos entram por registerSource() sem copiar uma linha de
     conteúdo — é assim que os 337 exercícios de grammar-topics.js aparecem
     aqui (ver engine/practice-adapters.js). O conteúdo continua morando
     onde sempre morou.

     DESCRITOR NORMALIZADO
     ---------------------
     A página nunca vê o formato bruto de cada banco. Todo item sai daqui
     no mesmo formato:

       { id, format, topic, topicLabel, level, theme, groupId,
         q, a, options, correctIndex, statements, pairs,
         title, context, wordBank, text, lines, answers,
         verbs, instruction, prompt, passage }

     Só os campos do formato em questão vêm preenchidos.
     ====================================================================== */

  /* Token de formato usado nos ids do banco próprio. */
  var TOKEN = {
    multiple_choice: 'mc',
    fill_blank:      'complete',
    true_false:      'tf',
    matching:        'match',
    make_question:   'question',
    story:           'story',
    dialogue:        'dialogue',
    make_sentence:   'sentence'
  };

  /* type do banco próprio -> format canônico */
  var FORMAT_OF = {
    fill_blank:      'complete',
    multiple_choice: 'multiple_choice',
    true_false:      'true_false',
    matching:        'matching',
    make_question:   'make_question',
    story:           'story',
    dialogue:        'dialogue',
    make_sentence:   'make_sentence'
  };

  /* Os tipos de prática oferecidos na tela, em três grupos. Cada um sabe
     dizer se um item pertence a ele — assim Reading não rouba os itens dos
     grupos rápidos, e nada fica órfão. */
  var TYPES = [
    { id:'all',             label:'All',                  group:'quick',
      match:function(){ return true; } },
    { id:'complete',        label:'Complete',             group:'quick',
      match:function(x){ return x.format==='complete' && !x.passage; } },
    { id:'multiple_choice', label:'Multiple Choice',      group:'quick',
      match:function(x){ return x.format==='multiple_choice' && !x.passage; } },
    { id:'unscramble',      label:'Unscramble',           group:'quick',
      match:function(x){ return x.format==='unscramble'; } },
    { id:'fix',             label:'Fix the Mistake',      group:'quick',
      match:function(x){ return x.format==='fix'; } },
    { id:'transform',       label:'Transformation',       group:'quick',
      match:function(x){ return x.format==='transform'; } },
    { id:'make_question',   label:'Make a Question',      group:'quick',
      match:function(x){ return x.format==='make_question'; } },
    { id:'story',           label:'Complete the Story',   group:'context',
      match:function(x){ return x.format==='story'; } },
    { id:'dialogue',        label:'Complete the Dialogue',group:'context',
      match:function(x){ return x.format==='dialogue'; } },
    { id:'reading',         label:'Reading',              group:'context',
      match:function(x){ return !!x.passage; } },
    { id:'make_sentence',   label:'Make a Sentence',      group:'production',
      match:function(x){ return x.format==='make_sentence'; } }
  ];
  var GROUPS = [
    { id:'quick',      label:'Quick Practice' },
    { id:'context',    label:'Context' },
    { id:'production', label:'Production' }
  ];

  var sources = [];

  function safe(fn, fallback, label) {
    try { return fn(); }
    catch (e) { console.warn('[practice-bank] source "' + label + '" failed', e); return fallback; }
  }

  /** Normaliza um exercício do banco próprio. */
  function shapeOwn(key, topic, ex, i) {
    return {
      id:         ex.id || '',
      format:     FORMAT_OF[ex.type] || ex.type || '',
      topic:      key,
      topicLabel: topic.label || key,
      level:      (topic.passage && topic.passage.level) || ex.level || '',
      theme:      topic.theme || '',
      groupId:    topic.groupId || '',
      passage:    topic.passage || null,
      index:      i,

      q:            ex.question || '',
      a:            ex.correct || '',
      options:      ex.options || null,
      correctIndex: (typeof ex.correct === 'number') ? ex.correct : null,
      statements:   ex.statements || null,
      pairs:        ex.pairs || null,

      title:    ex.title || '',
      context:  ex.context || '',
      wordBank: ex.wordBank || null,
      text:     ex.text || '',
      lines:    ex.lines || null,
      answers:  ex.answers || null,

      verbs:       ex.verbs || null,
      instruction: ex.instruction || '',
      prompt:      ex.prompt || '',
      answerLine:  ex.answer || '',
      expected:    ex.correct && typeof ex.correct === 'string' ? ex.correct : '',

      raw: ex
    };
  }

  function flatten() {
    var out = [];
    Object.keys(TOPICS).forEach(function (key) {
      var t = TOPICS[key] || {};
      (t.exercises || []).forEach(function (ex, i) { out.push(shapeOwn(key, t, ex, i)); });
    });
    sources.forEach(function (src) {
      var items = safe(function () { return src.load ? src.load() : []; }, [], src.id) || [];
      items.forEach(function (it) { if (it && it.id) out.push(it); });
    });
    return out;
  }

  var PracticeBank = {

    VERSION: '2.0.0',

    TOPICS: TOPICS,
    TYPES: TYPES,
    GROUPS: GROUPS,

    /** Registra um banco externo. Não copia conteúdo: guarda a função. */
    registerSource: function (src) {
      if (!src || !src.id || typeof src.load !== 'function') {
        console.warn('[practice-bank] a source needs id and load()');
        return PracticeBank;
      }
      sources = sources.filter(function (s) { return s.id !== src.id; });
      sources.push(src);
      return PracticeBank;
    },

    sources: function () { return sources.map(function (s) { return s.id; }); },

    keys: function () { return Object.keys(TOPICS); },
    topic: function (key) { return TOPICS[key] || null; },

    /** Todos os itens já normalizados. */
    all: flatten,

    /** [{ key, label, level, count }] — a lista de tópicos da tela. */
    topics: function () {
      var seen = {}, out = [];
      flatten().forEach(function (x) {
        if (!seen[x.topic]) {
          seen[x.topic] = { key: x.topic, label: x.topicLabel, level: x.level || '', count: 0 };
          out.push(seen[x.topic]);
        }
        seen[x.topic].count++;
        if (!seen[x.topic].level && x.level) seen[x.topic].level = x.level;
      });
      return out;
    },

    /**
     * Filtro. `type` usa os predicados de TYPES; os demais são igualdade.
     *   query({ topic:'past', type:'complete' })
     */
    query: function (f) {
      f = f || {};
      var type = null;
      if (f.type && f.type !== 'all') {
        for (var i = 0; i < TYPES.length; i++) if (TYPES[i].id === f.type) type = TYPES[i];
      }
      return flatten().filter(function (x) {
        if (f.topic  && x.topic  !== f.topic)  return false;
        if (f.format && x.format !== f.format) return false;
        if (f.level  && x.level  !== f.level)  return false;
        if (f.theme  && x.theme  !== f.theme)  return false;
        if (f.id     && x.id     !== f.id)     return false;
        if (type && !type.match(x)) return false;
        return true;
      });
    },

    /** Quantos itens cada tipo tem dentro de um tópico. */
    typeCounts: function (topicKey) {
      var pool = PracticeBank.query({ topic: topicKey });
      var c = {};
      TYPES.forEach(function (t) {
        c[t.id] = (t.id === 'all') ? pool.length : pool.filter(t.match).length;
      });
      return c;
    },

    byId: function (id) {
      var hit = flatten().filter(function (x) { return x.id === id; });
      return hit.length ? hit[0] : null;
    },

    /** A unidade de uso de um tópico: o groupId, quando existe. */
    groupOf: function (key) {
      var t = TOPICS[key];
      return (t && t.groupId) ? t.groupId : null;
    },

    groupMembers: function (key) {
      var t = TOPICS[key];
      if (!t || !t.groupId) return [];
      return (t.exercises || []).map(function (ex) { return ex.id; });
    },

    /**
     * Saúde dos ids — banco próprio, groupIds e TODAS as fontes externas.
     *   TeacherLu.PracticeBank.audit()
     */
    audit: function () {
      var seen = {}, missing = [], duplicates = [], malformed = [], total = 0;

      function check(id, where) {
        total++;
        if (!id) { missing.push(where); return; }
        if (seen[id]) duplicates.push(id + ' (' + seen[id] + ' & ' + where + ')');
        else seen[id] = where;
      }

      Object.keys(TOPICS).forEach(function (key) {
        if (TOPICS[key].groupId) check(TOPICS[key].groupId, 'group:' + key);
        (TOPICS[key].exercises || []).forEach(function (ex, i) {
          check(ex.id, 'bank:' + key + '#' + i);
          if (ex.id && TOKEN[ex.type] && ex.id.indexOf('-' + TOKEN[ex.type] + '-') === -1) {
            malformed.push(ex.id + ' (token não bate com o tipo ' + ex.type + ')');
          }
        });
      });

      sources.forEach(function (src) {
        var items = safe(function () { return src.load(); }, [], src.id) || [];
        items.forEach(function (it, i) { check(it && it.id, src.id + '#' + i); });
      });

      var res = {
        total: total, missing: missing, duplicates: duplicates, malformed: malformed,
        ok: !missing.length && !duplicates.length && !malformed.length
      };
      console[res.ok ? 'info' : 'error'](
        '[practice-bank] audit: ' + total + ' ids · ' + missing.length + ' missing · ' +
        duplicates.length + ' duplicated · ' + malformed.length + ' malformed',
        res.ok ? '' : res
      );
      return res;
    }
  };

  NS.PracticeBank = PracticeBank;

  /* Fontes registradas antes deste arquivo carregar não se perdem. */
  if (Array.isArray(NS.__pendingPracticeSources)) {
    NS.__pendingPracticeSources.forEach(function (s) { PracticeBank.registerSource(s); });
    NS.__pendingPracticeSources = [];
  }

})(typeof window !== 'undefined' ? window : this);
