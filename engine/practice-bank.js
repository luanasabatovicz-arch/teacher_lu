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
    ]}
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

  /* ----------------------------------------------------------------------
     Minimal API. Deliberately small: a lookup, a filter and an audit.
     No abstraction that nothing uses yet.
     ---------------------------------------------------------------------- */

  /** Format token used in the ids, derived from the exercise type. */
  var TOKEN = {
    multiple_choice: 'mc',
    fill_blank:      'complete',
    true_false:      'tf',
    matching:        'match'
  };

  function flatten() {
    var out = [];
    Object.keys(TOPICS).forEach(function (key) {
      var t = TOPICS[key] || {};
      var level = (t.passage && t.passage.level) || '';
      (t.exercises || []).forEach(function (ex, i) {
        out.push({
          id:     ex.id || '',
          format: ex.type || '',
          topic:  key,
          level:  level,
          index:  i,
          ex:     ex
        });
      });
    });
    return out;
  }

  var PracticeBank = {

    VERSION: '1.0.0',

    /** The bank itself — the page renders straight from this. */
    TOPICS: TOPICS,

    keys: function () { return Object.keys(TOPICS); },

    topic: function (key) { return TOPICS[key] || null; },

    /** Every exercise as a flat descriptor: { id, format, topic, level, ex }. */
    all: flatten,

    /**
     * Filter the flat list.
     *   PracticeBank.query({ topic: 'past', format: 'fill_blank' })
     * An absent or empty field means "any".
     */
    query: function (f) {
      f = f || {};
      return flatten().filter(function (x) {
        if (f.topic  && x.topic  !== f.topic)  return false;
        if (f.format && x.format !== f.format) return false;
        if (f.level  && x.level  !== f.level)  return false;
        if (f.id     && x.id     !== f.id)     return false;
        return true;
      });
    },

    byId: function (id) {
      var hit = flatten().filter(function (x) { return x.id === id; });
      return hit.length ? hit[0] : null;
    },

    /**
     * Id health check. Also audits the Grammar topics when
     * engine/grammar-topics.js happens to be loaded on the same page.
     *
     *   TeacherLu.PracticeBank.audit()
     *   -> { total, missing: [], duplicates: [], malformed: [], ok: true }
     */
    audit: function (opts) {
      opts = opts || {};
      var seen = {}, missing = [], duplicates = [], malformed = [], total = 0;

      function check(id, where, expectPrefix) {
        total++;
        if (!id) { missing.push(where); return; }
        if (seen[id]) duplicates.push(id + ' (' + seen[id] + ' & ' + where + ')');
        else seen[id] = where;
        if (expectPrefix && id.indexOf(expectPrefix) !== 0) malformed.push(id + ' @ ' + where);
      }

      Object.keys(TOPICS).forEach(function (key) {
        (TOPICS[key].exercises || []).forEach(function (ex, i) {
          check(ex.id, 'bank:' + key + '#' + i);
          if (ex.id && TOKEN[ex.type] && ex.id.indexOf('-' + TOKEN[ex.type] + '-') === -1) {
            malformed.push(ex.id + ' (token does not match type ' + ex.type + ')');
          }
        });
      });

      // Grammar legacy ids — only when that file is loaded.
      var GT = opts.grammar === false ? null : global.ENGINE_TOPICS;
      if (GT) {
        Object.keys(GT).forEach(function (k) {
          var t = GT[k] || {};
          [['practice', 'pr'], ['practiceMore', 'pm'], ['exit', 'ex']].forEach(function (pair) {
            (t[pair[0]] || []).forEach(function (item, i) {
              check(item.id, 'grammar:' + k + '.' + pair[0] + '#' + i, 'gr-' + (t.id || k) + '-' + pair[1] + '-');
            });
          });
        });
      }

      var res = {
        total: total,
        missing: missing,
        duplicates: duplicates,
        malformed: malformed,
        ok: !missing.length && !duplicates.length && !malformed.length
      };
      console[res.ok ? 'info' : 'error'](
        '[practice-bank] audit: ' + total + ' ids · ' +
        missing.length + ' missing · ' + duplicates.length + ' duplicated · ' +
        malformed.length + ' malformed', res.ok ? '' : res
      );
      return res;
    }
  };

  NS.PracticeBank = PracticeBank;

})(typeof window !== 'undefined' ? window : this);
