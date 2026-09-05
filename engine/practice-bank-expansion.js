/* ==========================================================================
   Teacher Lu Platform — Practice Bank · EXPANSÃO DE TEMAS (data only)
   --------------------------------------------------------------------------
   O QUE ESTE ARQUIVO É
   --------------------
   Crescimento do banco de prática: temas novos, exercícios novos. Nada mais.
   Nenhum formato novo foi inventado, nenhum renderer foi tocado, nenhum
   exercício antigo foi reescrito e nenhum id existente mudou.

   POR QUE É UM ARQUIVO SEPARADO
   -----------------------------
   engine/practice-bank.js continua sendo o banco original, do jeito que foi
   aprovado. A expansão mora ao lado e se junta ao mesmo objeto TOPICS em
   tempo de carga, então tudo o que já existia continua valendo sem exceção:

     · o mesmo shapeOwn() normaliza estes exercícios;
     · o mesmo PracticeLog registra studentId + exerciseId;
     · o mesmo filtro "completed" por aluno esconde o que já foi feito;
     · o mesmo audit() confere ausência, duplicidade e forma dos ids;
     · o mesmo topic selector lista os temas novos.

   Um tema novo NUNCA sobrescreve um tema que já existe: a fusão só escreve
   em chaves livres e avisa no console se alguém colidir.

   FORMATOS USADOS (todos já existiam)
   -----------------------------------
     Quick Practice ... fill_blank · multiple_choice · unscramble · fix ·
                        transform · make_question · true_false · matching
     Context ......... story · dialogue · (passage => Reading)
     Production ...... make_sentence

   IDS
   ---
       <chave-do-tema>-<token>-<NNN>      a1-family-complete-004
                                          b2-ai-transform-009

   A chave do tema já carrega o nível, então o id é único por construção. A
   numeração é contínua dentro do tema (não reinicia por formato) e segue a
   regra do banco original: número de exercício apagado nunca é reusado.

   Sub-unidades do Make a Sentence (um id por verbo) e o groupId dos textos
   de Reading vivem no mesmo espaço de nomes e entram na mesma auditoria.

   READING
   -------
   Um `passage` pertence ao TEMA, não ao exercício — quem tem passage vira
   Reading para a tela inteira. Por isso cada texto de leitura é um tema
   próprio ("... · Reading"), exatamente como reading_my_morning já fazia,
   com o seu groupId: o texto só é consumido quando todas as perguntas dele
   tiverem veredicto.
   ========================================================================== */

(function (global) {
  'use strict';

  var NS = global.TeacherLu = global.TeacherLu || {};
  if (!NS.PracticeBank || !NS.PracticeBank.TOPICS) {
    console.warn('[practice-bank-expansion] PracticeBank não carregou antes desta expansão.');
    return;
  }

  var NEW_TOPICS = {
  /* ==================== A1 ==================== */

  "a1-family":{ label:"Family", level:"A1", keys:["family","familia","relatives","parents"], exercises:[
    {id:"a1-family-complete-001",type:"fill_blank",question:"My mother's mother is my ___.",correct:"grandmother"},
    {id:"a1-family-complete-002",type:"fill_blank",question:"I have two sisters. ___ names are Ana and Bia.",correct:"Their"},
    {id:"a1-family-complete-003",type:"fill_blank",question:"My father ___ (work) in a bank.",correct:"works"},
    {id:"a1-family-complete-004",type:"fill_blank",question:"We live ___ my grandparents.",correct:"with"},
    {id:"a1-family-mc-005",type:"multiple_choice",question:"My uncle's daughter is my ___.",options:["cousin","niece","aunt","sister"],correct:0},
    {id:"a1-family-mc-006",type:"multiple_choice",question:"___ your brother live in São Paulo?",options:["Do","Does","Is","Are"],correct:1},
    {id:"a1-family-mc-007",type:"multiple_choice",question:"This is my sister. ___ is a nurse.",options:["He","It","She","They"],correct:2},
    {id:"a1-family-unscramble-008",type:"unscramble",question:"have / I / brothers / two",correct:"I have two brothers."},
    {id:"a1-family-unscramble-009",type:"unscramble",question:"family / how / in / people / are / your / many / ?",correct:"How many people are in your family?"},
    {id:"a1-family-unscramble-010",type:"unscramble",question:"lives / near / my / grandmother / us",correct:"My grandmother lives near us."},
    {id:"a1-family-fix-011",type:"fix",question:"My parents is very kind.",correct:"My parents are very kind."},
    {id:"a1-family-fix-012",type:"fix",question:"She have three children.",correct:"She has three children."},
    {id:"a1-family-question-013",type:"make_question",answer:"I have one brother.",prompt:"Ask about the number of brothers.",correct:"How many brothers do you have?"},
    {id:"a1-family-question-014",type:"make_question",answer:"My sister works in a hospital.",prompt:"Ask about the place.",correct:"Where does your sister work?"},
    {id:"a1-family-match-015",type:"matching",question:"Match the word to its meaning:",pairs:[
      {left:"aunt",right:"your mother's or father's sister"},
      {left:"nephew",right:"your brother's or sister's son"},
      {left:"only child",right:"a person with no brothers or sisters"},
      {left:"twins",right:"two children born on the same day"},
      {left:"in-laws",right:"the family of your husband or wife"}
    ]},
    {id:"a1-family-dialogue-016",type:"dialogue",
      title:"Tell me about your family",
      context:"Two classmates talk before class.",
      wordBank:["do","have","is","does","are","live"],
      lines:[
        {who:"A",text:"___ you have a big family?"},
        {who:"B",text:"Not really. I ___ one sister."},
        {who:"A",text:"___ she older than you?"},
        {who:"B",text:"Yes, and she ___ in Portugal now."},
        {who:"A",text:"What ___ she do there?"},
        {who:"B",text:"She's a designer. My parents ___ very proud of her."}
      ],
      answers:["Do","have","Is","lives","does","are"]},
    {id:"a1-family-sentence-017",type:"make_sentence",
      instruction:"Choose a verb and say something true about your family.",
      verbs:[
        {v:"have",   id:"a1-family-sentence-have-001"},
        {v:"live",   id:"a1-family-sentence-live-001"},
        {v:"work",   id:"a1-family-sentence-work-001"},
        {v:"cook",   id:"a1-family-sentence-cook-001"},
        {v:"visit",  id:"a1-family-sentence-visit-001"},
        {v:"call",   id:"a1-family-sentence-call-001"},
        {v:"help",   id:"a1-family-sentence-help-001"},
        {v:"look like", id:"a1-family-sentence-looklike-001"}
      ]}
  ]},

  "a1-home":{ label:"Home", level:"A1", keys:["home","house","rooms","furniture","casa"], exercises:[
    {id:"a1-home-complete-001",type:"fill_blank",question:"We cook in the ___.",correct:"kitchen"},
    {id:"a1-home-complete-002",type:"fill_blank",question:"There ___ two bathrooms in my house.",correct:"are"},
    {id:"a1-home-complete-003",type:"fill_blank",question:"The lamp is ___ the table.",correct:"on"},
    {id:"a1-home-complete-004",type:"fill_blank",question:"I live ___ a small apartment.",correct:"in"},
    {id:"a1-home-mc-005",type:"multiple_choice",question:"___ a sofa in the living room.",options:["They are","There are","It is","There is"],correct:3},
    {id:"a1-home-mc-006",type:"multiple_choice",question:"Where do you sleep? In the ___.",options:["bedroom","kitchen","garage","garden"],correct:0},
    {id:"a1-home-mc-007",type:"multiple_choice",question:"My keys are ___ my bag.",options:["on","in","under","at"],correct:1},
    {id:"a1-home-unscramble-008",type:"unscramble",question:"is / bedroom / my / small / very",correct:"My bedroom is very small."},
    {id:"a1-home-unscramble-009",type:"unscramble",question:"there / a / in / garden / is / house / your / ? /",correct:"Is there a garden in your house?"},
    {id:"a1-home-unscramble-010",type:"unscramble",question:"between / the / is / table / the / chairs",correct:"The table is between the chairs."},
    {id:"a1-home-fix-011",type:"fix",question:"There is three windows in the kitchen.",correct:"There are three windows in the kitchen."},
    {id:"a1-home-fix-012",type:"fix",question:"My house is near of the park.",correct:"My house is near the park."},
    {id:"a1-home-question-013",type:"make_question",answer:"I live on the fourth floor.",prompt:"Ask about the floor.",correct:"Which floor do you live on?"},
    {id:"a1-home-question-014",type:"make_question",answer:"There are five rooms in my flat.",prompt:"Ask about the number of rooms.",correct:"How many rooms are there in your flat?"},
    {id:"a1-home-tf-015",type:"true_false",statements:[
      {text:"We use 'there is' with a singular noun.",answer:true},
      {text:"A wardrobe is a place to keep clothes.",answer:true},
      {text:"'There are a table' is correct.",answer:false},
      {text:"You usually take a shower in the kitchen.",answer:false},
      {text:"'Upstairs' means on a higher floor.",answer:true},
      {text:"A flat and an apartment mean the same thing.",answer:true}
    ]},
    {id:"a1-home-dialogue-016",type:"dialogue",
      title:"The new apartment",
      context:"Bruno is describing the place he has just moved to.",
      wordBank:["is","are","There","have","on","isn't"],
      lines:[
        {who:"A",text:"How ___ your new apartment?"},
        {who:"B",text:"It's nice. ___ are two bedrooms and a big kitchen."},
        {who:"A",text:"___ there a balcony?"},
        {who:"B",text:"No, there ___, but the windows are huge."},
        {who:"A",text:"Which floor is it ___?"},
        {who:"B",text:"The third. We ___ a lift, luckily."}
      ],
      answers:["is","There","Are","isn't","on","have"]},
    {id:"a1-home-sentence-017",type:"make_sentence",
      instruction:"Choose a verb and describe your home.",
      verbs:[
        {v:"live",  id:"a1-home-sentence-live-001"},
        {v:"clean", id:"a1-home-sentence-clean-001"},
        {v:"cook",  id:"a1-home-sentence-cook-001"},
        {v:"share", id:"a1-home-sentence-share-001"},
        {v:"keep",  id:"a1-home-sentence-keep-001"},
        {v:"open",  id:"a1-home-sentence-open-001"},
        {v:"paint", id:"a1-home-sentence-paint-001"},
        {v:"rent",  id:"a1-home-sentence-rent-001"}
      ]}
  ]},

  "a1-routine":{ label:"Daily Routine", level:"A1", keys:["routine","daily","morning","rotina"], exercises:[
    {id:"a1-routine-complete-001",type:"fill_blank",question:"I wake up at six and I ___ up at ten past six.",correct:"get"},
    {id:"a1-routine-complete-002",type:"fill_blank",question:"She ___ (have) breakfast at seven.",correct:"has"},
    {id:"a1-routine-complete-003",type:"fill_blank",question:"He goes to bed ___ eleven o'clock.",correct:"at"},
    {id:"a1-routine-complete-004",type:"fill_blank",question:"They don't ___ (work) on Sundays.",correct:"work"},
    {id:"a1-routine-mc-005",type:"multiple_choice",question:"My father ___ the newspaper every morning.",options:["read","reading","reads","is read"],correct:2},
    {id:"a1-routine-mc-006",type:"multiple_choice",question:"What time ___ you start work?",options:["does","is","are","do"],correct:3},
    {id:"a1-routine-mc-007",type:"multiple_choice",question:"I brush my ___ after every meal.",options:["teeth","hair","face","hands"],correct:0},
    {id:"a1-routine-unscramble-008",type:"unscramble",question:"work / bus / by / I / to / go",correct:"I go to work by bus."},
    {id:"a1-routine-unscramble-009",type:"unscramble",question:"finish / when / do / you / ? / classes / your",correct:"When do you finish your classes?"},
    {id:"a1-routine-unscramble-010",type:"unscramble",question:"never / lunch / she / at / home / has",correct:"She never has lunch at home."},
    {id:"a1-routine-fix-011",type:"fix",question:"He get up at seven every day.",correct:"He gets up at seven every day."},
    {id:"a1-routine-fix-012",type:"fix",question:"I don't goes to the gym on Mondays.",correct:"I don't go to the gym on Mondays."},
    {id:"a1-routine-question-013",type:"make_question",answer:"I usually wake up at half past six.",prompt:"Ask about the time.",correct:"What time do you usually wake up?"},
    {id:"a1-routine-question-014",type:"make_question",answer:"He has lunch with his colleagues.",prompt:"Ask about the people.",correct:"Who does he have lunch with?"},
    {id:"a1-routine-story-015",type:"story",
      title:"Marta's Tuesday",
      context:"A normal working day for Marta.",
      wordBank:["gets","takes","has","leaves","starts","finishes","cooks","watches"],
      text:"Marta ___ up at six o'clock. She ___ a quick shower and ___ coffee and toast in the kitchen. "+
           "She ___ home at seven and her first class ___ at eight. She ___ work at five in the afternoon. "+
           "In the evening she ___ dinner for her son and then she ___ a series before bed.",
      answers:["gets","takes","has","leaves","starts","finishes","cooks","watches"]},
    {id:"a1-routine-dialogue-016",type:"dialogue",
      title:"Morning people",
      context:"Two colleagues compare their mornings.",
      wordBank:["do","get","don't","does","never","before"],
      lines:[
        {who:"A",text:"What time ___ you get up?"},
        {who:"B",text:"I ___ up at five. I like the quiet."},
        {who:"A",text:"Five! I ___ open my eyes before seven."},
        {who:"B",text:"And your husband? What time ___ he leave?"},
        {who:"A",text:"He ___ leaves before eight."},
        {who:"B",text:"So you have breakfast together ___ work."}
      ],
      answers:["do","get","don't","does","never","before"]},
    {id:"a1-routine-sentence-017",type:"make_sentence",
      instruction:"Choose a verb and describe your own day.",
      verbs:[
        {v:"wake up",  id:"a1-routine-sentence-wakeup-001"},
        {v:"have",     id:"a1-routine-sentence-have-001"},
        {v:"start",    id:"a1-routine-sentence-start-001"},
        {v:"finish",   id:"a1-routine-sentence-finish-001"},
        {v:"go",       id:"a1-routine-sentence-go-001"},
        {v:"study",    id:"a1-routine-sentence-study-001"},
        {v:"relax",    id:"a1-routine-sentence-relax-001"},
        {v:"sleep",    id:"a1-routine-sentence-sleep-001"}
      ]}
  ]},

  "a1-food":{ label:"Food & Drinks", level:"A1", keys:["food","drink","meal","comida","eat"], exercises:[
    {id:"a1-food-complete-001",type:"fill_blank",question:"I'd like ___ glass of water, please.",correct:"a"},
    {id:"a1-food-complete-002",type:"fill_blank",question:"There isn't ___ milk in the fridge.",correct:"any"},
    {id:"a1-food-complete-003",type:"fill_blank",question:"How ___ sugar do you take in your coffee?",correct:"much"},
    {id:"a1-food-complete-004",type:"fill_blank",question:"We usually have rice ___ beans for lunch.",correct:"and"},
    {id:"a1-food-mc-005",type:"multiple_choice",question:"How ___ eggs do we need?",options:["much","many","some","any"],correct:1},
    {id:"a1-food-mc-006",type:"multiple_choice",question:"I don't like fish, and my wife doesn't ___.",options:["too","also","either","neither"],correct:2},
    {id:"a1-food-mc-007",type:"multiple_choice",question:"An orange is a kind of ___.",options:["vegetable","drink","meat","fruit"],correct:3},
    {id:"a1-food-unscramble-008",type:"unscramble",question:"like / chocolate / I / very / much",correct:"I like chocolate very much."},
    {id:"a1-food-unscramble-009",type:"unscramble",question:"you / breakfast / what / for / do / eat / ?",correct:"What do you eat for breakfast?"},
    {id:"a1-food-unscramble-010",type:"unscramble",question:"any / there / bread / is / n't / table / the / on",correct:"There isn't any bread on the table."},
    {id:"a1-food-fix-011",type:"fix",question:"How much apples do you want?",correct:"How many apples do you want?"},
    {id:"a1-food-fix-012",type:"fix",question:"I like very much pizza.",correct:"I like pizza very much."},
    {id:"a1-food-question-013",type:"make_question",answer:"I have dinner at eight.",prompt:"Ask about the time.",correct:"What time do you have dinner?"},
    {id:"a1-food-question-014",type:"make_question",answer:"My favourite fruit is mango.",prompt:"Ask about the favourite fruit.",correct:"What is your favourite fruit?"},
    {id:"a1-food-match-015",type:"matching",question:"Match the food to its group:",pairs:[
      {left:"carrot",right:"vegetable"},
      {left:"chicken",right:"meat"},
      {left:"cheese",right:"dairy"},
      {left:"strawberry",right:"fruit"},
      {left:"orange juice",right:"drink"}
    ]},
    {id:"a1-food-dialogue-016",type:"dialogue",
      title:"At the supermarket",
      context:"A couple checks the shopping list.",
      wordBank:["any","some","much","many","need","don't"],
      lines:[
        {who:"A",text:"Do we have ___ eggs at home?"},
        {who:"B",text:"We have ___, but only three."},
        {who:"A",text:"How ___ do you want to buy?"},
        {who:"B",text:"A dozen. And we ___ rice too."},
        {who:"A",text:"How ___ rice? One kilo?"},
        {who:"B",text:"Two. We ___ come here every week."}
      ],
      answers:["any","some","many","need","much","don't"]},
    {id:"a1-food-sentence-017",type:"make_sentence",
      instruction:"Choose a verb and say something about food.",
      verbs:[
        {v:"eat",    id:"a1-food-sentence-eat-001"},
        {v:"drink",  id:"a1-food-sentence-drink-001"},
        {v:"cook",   id:"a1-food-sentence-cook-001"},
        {v:"try",    id:"a1-food-sentence-try-001"},
        {v:"order",  id:"a1-food-sentence-order-001"},
        {v:"buy",    id:"a1-food-sentence-buy-001"},
        {v:"share",  id:"a1-food-sentence-share-001"},
        {v:"prefer", id:"a1-food-sentence-prefer-001"}
      ]}
  ]},

  "a1-clothes":{ label:"Clothes", level:"A1", keys:["clothes","wear","roupa","fashion"], exercises:[
    {id:"a1-clothes-complete-001",type:"fill_blank",question:"It's cold. Put ___ your coat.",correct:"on"},
    {id:"a1-clothes-complete-002",type:"fill_blank",question:"She ___ (wear) a red dress today.",correct:"is wearing"},
    {id:"a1-clothes-complete-003",type:"fill_blank",question:"I need a new ___ of shoes.",correct:"pair"},
    {id:"a1-clothes-complete-004",type:"fill_blank",question:"These trousers are too big. Can I try ___ smaller size?",correct:"a"},
    {id:"a1-clothes-mc-005",type:"multiple_choice",question:"You wear these on your feet: ___.",options:["socks","gloves","scarves","hats"],correct:0},
    {id:"a1-clothes-mc-006",type:"multiple_choice",question:"Look! Pedro ___ a suit today.",options:["wear","is wearing","wears","worn"],correct:1},
    {id:"a1-clothes-mc-007",type:"multiple_choice",question:"This shirt ___ me. It's my size.",options:["fitting","fit","fits","is fit"],correct:2},
    {id:"a1-clothes-unscramble-008",type:"unscramble",question:"jeans / I / blue / always / wear",correct:"I always wear blue jeans."},
    {id:"a1-clothes-unscramble-009",type:"unscramble",question:"jacket / how / is / this / much / ?",correct:"How much is this jacket?"},
    {id:"a1-clothes-unscramble-010",type:"unscramble",question:"a / she / hat / wearing / n't / is",correct:"She isn't wearing a hat."},
    {id:"a1-clothes-fix-011",type:"fix",question:"I am wearing a black trousers.",correct:"I am wearing black trousers."},
    {id:"a1-clothes-fix-012",type:"fix",question:"He wear a uniform at work.",correct:"He wears a uniform at work."},
    {id:"a1-clothes-question-013",type:"make_question",answer:"It costs forty reais.",prompt:"Ask about the price.",correct:"How much does it cost?"},
    {id:"a1-clothes-question-014",type:"make_question",answer:"I usually wear a T-shirt and shorts at home.",prompt:"Ask about clothes at home.",correct:"What do you usually wear at home?"},
    {id:"a1-clothes-match-015",type:"matching",question:"Match the clothes to the part of the body:",pairs:[
      {left:"gloves",right:"hands"},
      {left:"cap",right:"head"},
      {left:"boots",right:"feet"},
      {left:"belt",right:"waist"},
      {left:"scarf",right:"neck"}
    ]},
    {id:"a1-clothes-dialogue-016",type:"dialogue",
      title:"In the shop",
      context:"A customer is trying on a jacket.",
      wordBank:["can","size","too","looks","have","take"],
      lines:[
        {who:"A",text:"___ I try this jacket on?"},
        {who:"B",text:"Of course. What ___ are you?"},
        {who:"A",text:"Medium, I think. Hmm, it's ___ small."},
        {who:"B",text:"We ___ a large one in blue."},
        {who:"A",text:"Perfect. It ___ great."},
        {who:"B",text:"So you'll ___ it?"}
      ],
      answers:["Can","size","too","have","looks","take"]},
    {id:"a1-clothes-sentence-017",type:"make_sentence",
      instruction:"Choose a verb and talk about clothes.",
      verbs:[
        {v:"wear",   id:"a1-clothes-sentence-wear-001"},
        {v:"buy",    id:"a1-clothes-sentence-buy-001"},
        {v:"try on", id:"a1-clothes-sentence-tryon-001"},
        {v:"wash",   id:"a1-clothes-sentence-wash-001"},
        {v:"choose", id:"a1-clothes-sentence-choose-001"},
        {v:"need",   id:"a1-clothes-sentence-need-001"},
        {v:"like",   id:"a1-clothes-sentence-like-001"},
        {v:"change", id:"a1-clothes-sentence-change-001"}
      ]}
  ]},

  "a1-weather":{ label:"Weather", level:"A1", keys:["weather","rain","sun","tempo","clima"], exercises:[
    {id:"a1-weather-complete-001",type:"fill_blank",question:"It ___ raining. Take an umbrella.",correct:"is"},
    {id:"a1-weather-complete-002",type:"fill_blank",question:"In winter it is very ___ here.",correct:"cold"},
    {id:"a1-weather-complete-003",type:"fill_blank",question:"What's the weather ___ today?",correct:"like"},
    {id:"a1-weather-complete-004",type:"fill_blank",question:"It ___ (snow) in the south every year.",correct:"snows"},
    {id:"a1-weather-mc-005",type:"multiple_choice",question:"The sky is grey and the sun isn't out. It's ___.",options:["sunny","dry","hot","cloudy"],correct:3},
    {id:"a1-weather-mc-006",type:"multiple_choice",question:"___ is the temperature today?",options:["What","How much","How many","Which"],correct:0},
    {id:"a1-weather-mc-007",type:"multiple_choice",question:"It's thirty-five degrees. It's really ___.",options:["cool","hot","warm","freezing"],correct:1},
    {id:"a1-weather-unscramble-008",type:"unscramble",question:"today / windy / very / it / is",correct:"It is very windy today."},
    {id:"a1-weather-unscramble-009",type:"unscramble",question:"often / does / here / it / rain / ?",correct:"Does it often rain here?"},
    {id:"a1-weather-unscramble-010",type:"unscramble",question:"summer / like / I / because / warm / is / it",correct:"I like summer because it is warm."},
    {id:"a1-weather-fix-011",type:"fix",question:"Today is raining a lot.",correct:"Today it is raining a lot."},
    {id:"a1-weather-fix-012",type:"fix",question:"In July make very cold in Curitiba.",correct:"In July it is very cold in Curitiba."},
    {id:"a1-weather-question-013",type:"make_question",answer:"It's sunny and hot.",prompt:"Ask about the weather now.",correct:"What's the weather like today?"},
    {id:"a1-weather-question-014",type:"make_question",answer:"My favourite season is spring.",prompt:"Ask about the favourite season.",correct:"What is your favourite season?"},
    {id:"a1-weather-tf-015",type:"true_false",statements:[
      {text:"We say 'It is raining', not 'Is raining'.",answer:true},
      {text:"'Cloudy' means there is no sun in the sky.",answer:true},
      {text:"Snow falls when the weather is very hot.",answer:false},
      {text:"'Cool' is colder than 'warm'.",answer:true},
      {text:"'What is the weather like?' asks for a description.",answer:true},
      {text:"'Windy' describes the temperature.",answer:false}
    ]},
    {id:"a1-weather-dialogue-016",type:"dialogue",
      title:"Sunday plans",
      context:"Two friends check the forecast.",
      wordBank:["like","going","is","if","doesn't","cold"],
      lines:[
        {who:"A",text:"What's the weather ___ on Sunday?"},
        {who:"B",text:"The app says it ___ going to rain in the morning."},
        {who:"A",text:"And in the afternoon?"},
        {who:"B",text:"Sunny, but ___ — about twelve degrees."},
        {who:"A",text:"OK. ___ it rains, we stay at home."},
        {who:"B",text:"And if it ___ rain, we're ___ to the park."}
      ],
      answers:["like","is","cold","If","doesn't","going"]},
    {id:"a1-weather-sentence-017",type:"make_sentence",
      instruction:"Choose a verb and talk about the weather where you live.",
      verbs:[
        {v:"rain",  id:"a1-weather-sentence-rain-001"},
        {v:"snow",  id:"a1-weather-sentence-snow-001"},
        {v:"like",  id:"a1-weather-sentence-like-001"},
        {v:"wear",  id:"a1-weather-sentence-wear-001"},
        {v:"stay",  id:"a1-weather-sentence-stay-001"},
        {v:"go out",id:"a1-weather-sentence-goout-001"},
        {v:"take",  id:"a1-weather-sentence-take-001"},
        {v:"feel",  id:"a1-weather-sentence-feel-001"}
      ]}
  ]},

  "a1-hobbies":{ label:"Hobbies", level:"A1", keys:["hobby","hobbies","interests","gosto"], exercises:[
    {id:"a1-hobbies-complete-001",type:"fill_blank",question:"I like ___ (read) before bed.",correct:"reading"},
    {id:"a1-hobbies-complete-002",type:"fill_blank",question:"My son is good ___ chess.",correct:"at"},
    {id:"a1-hobbies-complete-003",type:"fill_blank",question:"She ___ (not/like) running.",correct:"doesn't like"},
    {id:"a1-hobbies-complete-004",type:"fill_blank",question:"We play ___ guitar on Saturdays.",correct:"the"},
    {id:"a1-hobbies-mc-005",type:"multiple_choice",question:"He hates ___ up early on Sundays.",options:["get","gets","getting","to getting"],correct:2},
    {id:"a1-hobbies-mc-006",type:"multiple_choice",question:"___ you like painting?",options:["Does","Is","Are","Do"],correct:3},
    {id:"a1-hobbies-mc-007",type:"multiple_choice",question:"A person who takes photos has a hobby called ___.",options:["photography","photograph","photographer","photo"],correct:0},
    {id:"a1-hobbies-unscramble-008",type:"unscramble",question:"love / puzzles / doing / I",correct:"I love doing puzzles."},
    {id:"a1-hobbies-unscramble-009",type:"unscramble",question:"free / do / what / in / your / you / time / do / ?",correct:"What do you do in your free time?"},
    {id:"a1-hobbies-unscramble-010",type:"unscramble",question:"very / dancing / my / is / sister / at / good",correct:"My sister is very good at dancing."},
    {id:"a1-hobbies-fix-011",type:"fix",question:"I enjoy to cook on weekends.",correct:"I enjoy cooking on weekends."},
    {id:"a1-hobbies-fix-012",type:"fix",question:"She don't like swimming.",correct:"She doesn't like swimming."},
    {id:"a1-hobbies-question-013",type:"make_question",answer:"I collect old coins.",prompt:"Ask about the collection.",correct:"What do you collect?"},
    {id:"a1-hobbies-question-014",type:"make_question",answer:"He plays the piano twice a week.",prompt:"Ask about how often.",correct:"How often does he play the piano?"},
    {id:"a1-hobbies-match-015",type:"matching",question:"Match the hobby to the place:",pairs:[
      {left:"swimming",right:"a pool"},
      {left:"gardening",right:"a garden"},
      {left:"cycling",right:"a bike path"},
      {left:"cooking",right:"a kitchen"},
      {left:"singing",right:"a choir"}
    ]},
    {id:"a1-hobbies-dialogue-016",type:"dialogue",
      title:"Something new",
      context:"Two neighbours talk in the lift.",
      wordBank:["do","learning","how","don't","love","at"],
      lines:[
        {who:"A",text:"What ___ you do at the weekend?"},
        {who:"B",text:"I'm ___ to play the drums."},
        {who:"A",text:"Really? ___ long have you had them?"},
        {who:"B",text:"Two months. I'm not very good ___ it yet."},
        {who:"A",text:"But you ___ it, right?"},
        {who:"B",text:"I do. My neighbours ___, though."}
      ],
      answers:["do","learning","How","at","love","don't"]},
    {id:"a1-hobbies-sentence-017",type:"make_sentence",
      instruction:"Choose a verb and talk about a hobby.",
      verbs:[
        {v:"play",    id:"a1-hobbies-sentence-play-001"},
        {v:"collect", id:"a1-hobbies-sentence-collect-001"},
        {v:"draw",    id:"a1-hobbies-sentence-draw-001"},
        {v:"read",    id:"a1-hobbies-sentence-read-001"},
        {v:"dance",   id:"a1-hobbies-sentence-dance-001"},
        {v:"learn",   id:"a1-hobbies-sentence-learn-001"},
        {v:"enjoy",   id:"a1-hobbies-sentence-enjoy-001"},
        {v:"practise",id:"a1-hobbies-sentence-practise-001"}
      ]}
  ]},

  "a1-school":{ label:"School", level:"A1", keys:["school","class","study","escola","subjects"], exercises:[
    {id:"a1-school-complete-001",type:"fill_blank",question:"My favourite ___ is history.",correct:"subject"},
    {id:"a1-school-complete-002",type:"fill_blank",question:"Classes start ___ Monday.",correct:"on"},
    {id:"a1-school-complete-003",type:"fill_blank",question:"We ___ (study) English twice a week.",correct:"study"},
    {id:"a1-school-complete-004",type:"fill_blank",question:"Can I borrow ___ pen, please?",correct:"a"},
    {id:"a1-school-mc-005",type:"multiple_choice",question:"The person who teaches you is a ___.",options:["student","teacher","director","classmate"],correct:1},
    {id:"a1-school-mc-006",type:"multiple_choice",question:"___ homework do we have today?",options:["How many","How often","How much","How long"],correct:2},
    {id:"a1-school-mc-007",type:"multiple_choice",question:"In this subject you study numbers: ___.",options:["geography","music","art","maths"],correct:3},
    {id:"a1-school-unscramble-008",type:"unscramble",question:"school / walk / to / I / every / day",correct:"I walk to school every day."},
    {id:"a1-school-unscramble-009",type:"unscramble",question:"class / does / what / start / time / ? /",correct:"What time does class start?"},
    {id:"a1-school-unscramble-010",type:"unscramble",question:"my / in / I / notebook / write / notes",correct:"I write notes in my notebook."},
    {id:"a1-school-fix-011",type:"fix",question:"I have much homework today.",correct:"I have a lot of homework today."},
    {id:"a1-school-fix-012",type:"fix",question:"My classmates is very friendly.",correct:"My classmates are very friendly."},
    {id:"a1-school-question-013",type:"make_question",answer:"I study at a language school near my house.",prompt:"Ask about the place.",correct:"Where do you study?"},
    {id:"a1-school-question-014",type:"make_question",answer:"There are twenty students in my class.",prompt:"Ask about the number of students.",correct:"How many students are there in your class?"},
    {id:"a1-school-tf-015",type:"true_false",statements:[
      {text:"'Homework' is uncountable in English.",answer:true},
      {text:"A classmate is a person who studies with you.",answer:true},
      {text:"'How many homeworks' is correct English.",answer:false},
      {text:"We say 'on Monday', not 'in Monday'.",answer:true},
      {text:"A subject is the same as a classroom.",answer:false},
      {text:"'Break' is the time between classes.",answer:true}
    ]},
    {id:"a1-school-dialogue-016",type:"dialogue",
      title:"First day",
      context:"A new student asks about the timetable.",
      wordBank:["does","At","many","have","is","there"],
      lines:[
        {who:"A",text:"What time ___ the first class start?"},
        {who:"B",text:"___ eight o'clock."},
        {who:"A",text:"How ___ classes do we have today?"},
        {who:"B",text:"Four. We ___ a break at ten."},
        {who:"A",text:"Is ___ a canteen here?"},
        {who:"B",text:"Yes, it ___ next to the library."}
      ],
      answers:["does","At","many","have","there","is"]},
    {id:"a1-school-sentence-017",type:"make_sentence",
      instruction:"Choose a verb and talk about studying.",
      verbs:[
        {v:"study",    id:"a1-school-sentence-study-001"},
        {v:"learn",    id:"a1-school-sentence-learn-001"},
        {v:"write",    id:"a1-school-sentence-write-001"},
        {v:"read",     id:"a1-school-sentence-read-001"},
        {v:"ask",      id:"a1-school-sentence-ask-001"},
        {v:"remember", id:"a1-school-sentence-remember-001"},
        {v:"practise", id:"a1-school-sentence-practise-001"},
        {v:"forget",   id:"a1-school-sentence-forget-001"}
      ]}
  ]},

  "a1-transport":{ label:"Transportation", level:"A1", keys:["transport","bus","car","train","transporte"], exercises:[
    {id:"a1-transport-complete-001",type:"fill_blank",question:"I go to work ___ bus.",correct:"by"},
    {id:"a1-transport-complete-002",type:"fill_blank",question:"She goes to school ___ foot.",correct:"on"},
    {id:"a1-transport-complete-003",type:"fill_blank",question:"The train ___ (leave) at ten past six.",correct:"leaves"},
    {id:"a1-transport-complete-004",type:"fill_blank",question:"How long ___ it take to get there?",correct:"does"},
    {id:"a1-transport-mc-005",type:"multiple_choice",question:"You wait for the bus at a bus ___.",options:["stop","station","park","line"],correct:0},
    {id:"a1-transport-mc-006",type:"multiple_choice",question:"I usually ___ the metro in the morning.",options:["make","take","do","go"],correct:1},
    {id:"a1-transport-mc-007",type:"multiple_choice",question:"The trip ___ about forty minutes.",options:["spends","makes","takes","gets"],correct:2},
    {id:"a1-transport-unscramble-008",type:"unscramble",question:"drive / I / to / work / never",correct:"I never drive to work."},
    {id:"a1-transport-unscramble-009",type:"unscramble",question:"the / does / where / stop / bus / ? /",correct:"Where does the bus stop?"},
    {id:"a1-transport-unscramble-010",type:"unscramble",question:"train / is / the / than / faster / bus / the",correct:"The train is faster than the bus."},
    {id:"a1-transport-fix-011",type:"fix",question:"I go to school by foot.",correct:"I go to school on foot."},
    {id:"a1-transport-fix-012",type:"fix",question:"The bus take twenty minutes.",correct:"The bus takes twenty minutes."},
    {id:"a1-transport-question-013",type:"make_question",answer:"I come to class by car.",prompt:"Ask about the transport.",correct:"How do you come to class?"},
    {id:"a1-transport-question-014",type:"make_question",answer:"It takes half an hour.",prompt:"Ask about the duration.",correct:"How long does it take?"},
    {id:"a1-transport-match-015",type:"matching",question:"Match the transport to the place you find it:",pairs:[
      {left:"plane",right:"airport"},
      {left:"train",right:"station"},
      {left:"boat",right:"port"},
      {left:"bus",right:"bus stop"},
      {left:"bike",right:"cycle lane"}
    ]},
    {id:"a1-transport-dialogue-016",type:"dialogue",
      title:"Getting to the centre",
      context:"A tourist asks a local for help.",
      wordBank:["get","take","long","by","much","every"],
      lines:[
        {who:"A",text:"How do I ___ to the city centre?"},
        {who:"B",text:"You can ___ the number 40 bus."},
        {who:"A",text:"How ___ does it take?"},
        {who:"B",text:"About twenty minutes ___ bus."},
        {who:"A",text:"How ___ is the ticket?"},
        {who:"B",text:"Six reais. They come ___ ten minutes."}
      ],
      answers:["get","take","long","by","much","every"]},
    {id:"a1-transport-sentence-017",type:"make_sentence",
      instruction:"Choose a verb and talk about how you travel in your city.",
      verbs:[
        {v:"take",  id:"a1-transport-sentence-take-001"},
        {v:"drive", id:"a1-transport-sentence-drive-001"},
        {v:"walk",  id:"a1-transport-sentence-walk-001"},
        {v:"ride",  id:"a1-transport-sentence-ride-001"},
        {v:"wait",  id:"a1-transport-sentence-wait-001"},
        {v:"arrive",id:"a1-transport-sentence-arrive-001"},
        {v:"leave", id:"a1-transport-sentence-leave-001"},
        {v:"park",  id:"a1-transport-sentence-park-001"}
      ]}
  ]},

  "a1-places":{ label:"Places in Town", level:"A1", keys:["places","town","city","lugares","buildings"], exercises:[
    {id:"a1-places-complete-001",type:"fill_blank",question:"You buy medicine at the ___.",correct:"pharmacy"},
    {id:"a1-places-complete-002",type:"fill_blank",question:"There ___ a bank next to the post office.",correct:"is"},
    {id:"a1-places-complete-003",type:"fill_blank",question:"The bakery is ___ the corner.",correct:"on"},
    {id:"a1-places-complete-004",type:"fill_blank",question:"My office is ___ from the park.",correct:"across"},
    {id:"a1-places-mc-005",type:"multiple_choice",question:"You borrow books here: the ___.",options:["bookshop","cinema","museum","library"],correct:3},
    {id:"a1-places-mc-006",type:"multiple_choice",question:"The supermarket is ___ the bank and the café.",options:["between","among","next","in front"],correct:0},
    {id:"a1-places-mc-007",type:"multiple_choice",question:"___ any restaurants near here?",options:["Is there","Are there","There are","Have there"],correct:1},
    {id:"a1-places-unscramble-008",type:"unscramble",question:"the / is / near / cinema / station / the",correct:"The cinema is near the station."},
    {id:"a1-places-unscramble-009",type:"unscramble",question:"a / is / there / hospital / here / near / ? /",correct:"Is there a hospital near here?"},
    {id:"a1-places-unscramble-010",type:"unscramble",question:"my / opposite / house / a / is / there / school",correct:"There is a school opposite my house."},
    {id:"a1-places-fix-011",type:"fix",question:"There are a museum in my city.",correct:"There is a museum in my city."},
    {id:"a1-places-fix-012",type:"fix",question:"The café is in front the bank.",correct:"The café is in front of the bank."},
    {id:"a1-places-question-013",type:"make_question",answer:"The market is open until six.",prompt:"Ask about the closing time.",correct:"What time does the market close?"},
    {id:"a1-places-question-014",type:"make_question",answer:"There are three cinemas in my town.",prompt:"Ask about the number of cinemas.",correct:"How many cinemas are there in your town?"},
    {id:"a1-places-tf-015",type:"true_false",statements:[
      {text:"You send letters at a post office.",answer:true},
      {text:"'Are there' is used with plural nouns.",answer:true},
      {text:"A chemist and a pharmacy sell the same things.",answer:true},
      {text:"You watch films at a library.",answer:false},
      {text:"'Opposite' means on the other side of the street.",answer:true},
      {text:"'In front the shop' is correct English.",answer:false}
    ]},
    {id:"a1-places-dialogue-016",type:"dialogue",
      title:"Is there one near here?",
      context:"Someone new in the neighbourhood asks a question.",
      wordBank:["there","Is","next","far","open","on"],
      lines:[
        {who:"A",text:"___ there a bakery near here?"},
        {who:"B",text:"Yes, ___ is one on Rua das Flores."},
        {who:"A",text:"Is it ___?"},
        {who:"B",text:"No, five minutes ___ foot."},
        {who:"A",text:"Is it ___ on Sundays?"},
        {who:"B",text:"Until noon. It's ___ to the pharmacy."}
      ],
      answers:["Is","there","far","on","open","next"]},
    {id:"a1-places-sentence-017",type:"make_sentence",
      instruction:"Choose a verb and talk about places in your town.",
      verbs:[
        {v:"live",  id:"a1-places-sentence-live-001"},
        {v:"work",  id:"a1-places-sentence-work-001"},
        {v:"meet",  id:"a1-places-sentence-meet-001"},
        {v:"visit", id:"a1-places-sentence-visit-001"},
        {v:"go",    id:"a1-places-sentence-go-001"},
        {v:"buy",   id:"a1-places-sentence-buy-001"},
        {v:"cross", id:"a1-places-sentence-cross-001"},
        {v:"turn",  id:"a1-places-sentence-turn-001"}
      ]}
  ]},

  "a1-jobs":{ label:"Jobs", level:"A1", keys:["job","work","profession","emprego","carreira"], exercises:[
    {id:"a1-jobs-complete-001",type:"fill_blank",question:"She works ___ a hospital.",correct:"in"},
    {id:"a1-jobs-complete-002",type:"fill_blank",question:"I'm ___ engineer.",correct:"an"},
    {id:"a1-jobs-complete-003",type:"fill_blank",question:"He ___ (start) work at eight every morning.",correct:"starts"},
    {id:"a1-jobs-complete-004",type:"fill_blank",question:"What ___ your mother do?",correct:"does"},
    {id:"a1-jobs-mc-005",type:"multiple_choice",question:"A person who cuts hair is a ___.",options:["waiter","dentist","hairdresser","driver"],correct:2},
    {id:"a1-jobs-mc-006",type:"multiple_choice",question:"My brother works ___ a big company.",options:["in","on","to","at"],correct:3},
    {id:"a1-jobs-mc-007",type:"multiple_choice",question:"She ___ with children every day.",options:["works","work","working","is work"],correct:0},
    {id:"a1-jobs-unscramble-008",type:"unscramble",question:"a / is / brother / my / driver / taxi",correct:"My brother is a taxi driver."},
    {id:"a1-jobs-unscramble-009",type:"unscramble",question:"do / where / work / you / ? /",correct:"Where do you work?"},
    {id:"a1-jobs-unscramble-010",type:"unscramble",question:"job / like / I / because / people / my / meet / I",correct:"I like my job because I meet people."},
    {id:"a1-jobs-fix-011",type:"fix",question:"I am teacher.",correct:"I am a teacher."},
    {id:"a1-jobs-fix-012",type:"fix",question:"What does your father does?",correct:"What does your father do?"},
    {id:"a1-jobs-question-013",type:"make_question",answer:"I work in a small office in the centre.",prompt:"Ask about the workplace.",correct:"Where do you work?"},
    {id:"a1-jobs-question-014",type:"make_question",answer:"She works from nine to six.",prompt:"Ask about working hours.",correct:"What hours does she work?"},
    {id:"a1-jobs-match-015",type:"matching",question:"Match the job to what the person does:",pairs:[
      {left:"accountant",right:"works with numbers and taxes"},
      {left:"mechanic",right:"repairs cars"},
      {left:"receptionist",right:"welcomes visitors"},
      {left:"vet",right:"takes care of animals"},
      {left:"baker",right:"makes bread"}
    ]},
    {id:"a1-jobs-dialogue-016",type:"dialogue",
      title:"What do you do?",
      context:"Two people meet at a party.",
      wordBank:["do","work","for","does","like","hours"],
      lines:[
        {who:"A",text:"What ___ you do?"},
        {who:"B",text:"I ___ in a laboratory."},
        {who:"A",text:"Nice. Do you ___ it?"},
        {who:"B",text:"Yes, but the ___ are long."},
        {who:"A",text:"Who do you work ___?"},
        {who:"B",text:"A small company. And what ___ your wife do?"}
      ],
      answers:["do","work","like","hours","for","does"]},
    {id:"a1-jobs-sentence-017",type:"make_sentence",
      instruction:"Choose a verb and talk about work.",
      verbs:[
        {v:"work",   id:"a1-jobs-sentence-work-001"},
        {v:"start",  id:"a1-jobs-sentence-start-001"},
        {v:"finish", id:"a1-jobs-sentence-finish-001"},
        {v:"earn",   id:"a1-jobs-sentence-earn-001"},
        {v:"help",   id:"a1-jobs-sentence-help-001"},
        {v:"answer", id:"a1-jobs-sentence-answer-001"},
        {v:"travel", id:"a1-jobs-sentence-travel-001"},
        {v:"wear",   id:"a1-jobs-sentence-wear-001"}
      ]}
  ]},

  "a1-body":{ label:"Body & Health", level:"A1", keys:["body","health","doctor","corpo","saude"], exercises:[
    {id:"a1-body-complete-001",type:"fill_blank",question:"I have a ___ ache. I need an aspirin.",correct:"head"},
    {id:"a1-body-complete-002",type:"fill_blank",question:"You see with your ___.",correct:"eyes"},
    {id:"a1-body-complete-003",type:"fill_blank",question:"My throat hurts. I ___ (feel) terrible.",correct:"feel"},
    {id:"a1-body-complete-004",type:"fill_blank",question:"You should stay ___ bed today.",correct:"in"},
    {id:"a1-body-mc-005",type:"multiple_choice",question:"When you are ill, you go to the ___.",options:["dentist","doctor","teacher","waiter"],correct:1},
    {id:"a1-body-mc-006",type:"multiple_choice",question:"My back ___. I can't sit down.",options:["hurt","is hurt","hurts","hurting"],correct:2},
    {id:"a1-body-mc-007",type:"multiple_choice",question:"You have ten of these on your hands: ___.",options:["toes","ears","knees","fingers"],correct:3},
    {id:"a1-body-unscramble-008",type:"unscramble",question:"a / have / I / cold / bad",correct:"I have a bad cold."},
    {id:"a1-body-unscramble-009",type:"unscramble",question:"matter / what's / the / ? /",correct:"What's the matter?"},
    {id:"a1-body-unscramble-010",type:"unscramble",question:"water / drink / should / of / you / lots",correct:"You should drink lots of water."},
    {id:"a1-body-fix-011",type:"fix",question:"I have pain in my head.",correct:"I have a headache."},
    {id:"a1-body-fix-012",type:"fix",question:"My legs hurts a lot today.",correct:"My legs hurt a lot today."},
    {id:"a1-body-question-013",type:"make_question",answer:"I feel much better, thanks.",prompt:"Ask about how the person feels.",correct:"How do you feel?"},
    {id:"a1-body-question-014",type:"make_question",answer:"My stomach hurts.",prompt:"Ask about the problem.",correct:"What's wrong?"},
    {id:"a1-body-match-015",type:"matching",question:"Match the problem to the advice:",pairs:[
      {left:"a headache",right:"take a painkiller and rest"},
      {left:"a sore throat",right:"drink warm tea with honey"},
      {left:"a temperature",right:"stay in bed and see a doctor"},
      {left:"a cough",right:"avoid cold drinks"},
      {left:"tired eyes",right:"look away from the screen"}
    ]},
    {id:"a1-body-dialogue-016",type:"dialogue",
      title:"At the pharmacy",
      context:"A customer asks for help.",
      wordBank:["matter","have","should","take","How","hurts"],
      lines:[
        {who:"A",text:"What's the ___?"},
        {who:"B",text:"My throat ___ and I have a cough."},
        {who:"A",text:"___ long have you had it?"},
        {who:"B",text:"Three days. I also ___ a temperature."},
        {who:"A",text:"You ___ see a doctor."},
        {who:"B",text:"OK. Can I ___ something for the pain now?"}
      ],
      answers:["matter","hurts","How","have","should","take"]},
    {id:"a1-body-sentence-017",type:"make_sentence",
      instruction:"Choose a verb and talk about health.",
      verbs:[
        {v:"feel",   id:"a1-body-sentence-feel-001"},
        {v:"hurt",   id:"a1-body-sentence-hurt-001"},
        {v:"rest",   id:"a1-body-sentence-rest-001"},
        {v:"sleep",  id:"a1-body-sentence-sleep-001"},
        {v:"drink",  id:"a1-body-sentence-drink-001"},
        {v:"walk",   id:"a1-body-sentence-walk-001"},
        {v:"breathe",id:"a1-body-sentence-breathe-001"},
        {v:"take",   id:"a1-body-sentence-take-001"}
      ]}
  ]},

  "a1-freetime":{ label:"Free Time", level:"A1", keys:["free time","weekend","tempo livre","leisure"], exercises:[
    {id:"a1-freetime-complete-001",type:"fill_blank",question:"On Saturdays I ___ (go) to the cinema.",correct:"go"},
    {id:"a1-freetime-complete-002",type:"fill_blank",question:"I can't come. I'm ___ tonight.",correct:"busy"},
    {id:"a1-freetime-complete-003",type:"fill_blank",question:"We meet ___ friends at the weekend.",correct:"with"},
    {id:"a1-freetime-complete-004",type:"fill_blank",question:"He ___ (watch) football on Sunday afternoons.",correct:"watches"},
    {id:"a1-freetime-mc-005",type:"multiple_choice",question:"___ do you do on Sundays?",options:["What","Where","When","Who"],correct:0},
    {id:"a1-freetime-mc-006",type:"multiple_choice",question:"I ___ swim, but I can't ride a bike.",options:["can't","can","am","do"],correct:1},
    {id:"a1-freetime-mc-007",type:"multiple_choice",question:"We stay ___ home when it rains.",options:["in","on","at","to"],correct:2},
    {id:"a1-freetime-unscramble-008",type:"unscramble",question:"friends / meet / I / Fridays / on / my",correct:"I meet my friends on Fridays."},
    {id:"a1-freetime-unscramble-009",type:"unscramble",question:"do / weekend / what / at / you / the / do / ? /",correct:"What do you do at the weekend?"},
    {id:"a1-freetime-unscramble-010",type:"unscramble",question:"early / never / up / Sundays / I / get / on",correct:"I never get up early on Sundays."},
    {id:"a1-freetime-fix-011",type:"fix",question:"I go to the beach in the weekend.",correct:"I go to the beach at the weekend."},
    {id:"a1-freetime-fix-012",type:"fix",question:"She can to play tennis.",correct:"She can play tennis."},
    {id:"a1-freetime-question-013",type:"make_question",answer:"I go out with my cousins.",prompt:"Ask about the people.",correct:"Who do you go out with?"},
    {id:"a1-freetime-question-014",type:"make_question",answer:"We usually go to the park on Sunday.",prompt:"Ask about the place.",correct:"Where do you usually go on Sunday?"},
    {id:"a1-freetime-story-015",type:"story",
      title:"A quiet Saturday",
      context:"Paulo describes his usual Saturday.",
      wordBank:["sleeps","goes","meets","play","cooks","calls","watches","stays"],
      text:"Paulo ___ until nine on Saturdays. Then he ___ to the market and buys fruit. "+
           "At eleven he ___ his friend Rui and they ___ football in the park. "+
           "In the afternoon he ___ lunch for his mother and ___ his sister in Lisbon. "+
           "In the evening he ___ at home and ___ an old film.",
      answers:["sleeps","goes","meets","play","cooks","calls","stays","watches"]},
    {id:"a1-freetime-dialogue-016",type:"dialogue",
      title:"Any plans?",
      context:"Two colleagues on Friday afternoon.",
      wordBank:["doing","free","do","Would","can","together"],
      lines:[
        {who:"A",text:"What are you ___ this weekend?"},
        {who:"B",text:"Nothing special. Are you ___ on Saturday?"},
        {who:"A",text:"In the morning, yes. What ___ you want to do?"},
        {who:"B",text:"___ you like to go to the market?"},
        {who:"A",text:"Sure. We ___ have breakfast there ___."},
        {who:"B",text:"Perfect."}
      ],
      answers:["doing","free","do","Would","can","together"]},
    {id:"a1-freetime-sentence-017",type:"make_sentence",
      instruction:"Choose a verb and talk about your free time.",
      verbs:[
        {v:"go out", id:"a1-freetime-sentence-goout-001"},
        {v:"meet",   id:"a1-freetime-sentence-meet-001"},
        {v:"watch",  id:"a1-freetime-sentence-watch-001"},
        {v:"play",   id:"a1-freetime-sentence-play-001"},
        {v:"rest",   id:"a1-freetime-sentence-rest-001"},
        {v:"travel", id:"a1-freetime-sentence-travel-001"},
        {v:"listen", id:"a1-freetime-sentence-listen-001"},
        {v:"stay",   id:"a1-freetime-sentence-stay-001"}
      ]}
  ]},

  "a1-shopping":{ label:"Shopping", level:"A1", keys:["shopping","buy","price","loja","compras"], exercises:[
    {id:"a1-shopping-complete-001",type:"fill_blank",question:"How ___ is this bag?",correct:"much"},
    {id:"a1-shopping-complete-002",type:"fill_blank",question:"Can I pay ___ card?",correct:"by"},
    {id:"a1-shopping-complete-003",type:"fill_blank",question:"I'm ___ for a birthday present.",correct:"looking"},
    {id:"a1-shopping-complete-004",type:"fill_blank",question:"These shoes are cheap, but ___ ones are expensive.",correct:"those"},
    {id:"a1-shopping-mc-005",type:"multiple_choice",question:"The person who serves you in a shop is a shop ___.",options:["owner","client","manager","assistant"],correct:3},
    {id:"a1-shopping-mc-006",type:"multiple_choice",question:"How much ___ these glasses?",options:["are","is","does","do"],correct:0},
    {id:"a1-shopping-mc-007",type:"multiple_choice",question:"It's only ten reais. It's very ___.",options:["expensive","cheap","big","heavy"],correct:1},
    {id:"a1-shopping-unscramble-008",type:"unscramble",question:"help / can / you / I / ? /",correct:"Can I help you?"},
    {id:"a1-shopping-unscramble-009",type:"unscramble",question:"take / I'll / please / this / one",correct:"I'll take this one, please."},
    {id:"a1-shopping-unscramble-010",type:"unscramble",question:"than / that / is / cheaper / this / shirt / one",correct:"This shirt is cheaper than that one."},
    {id:"a1-shopping-fix-011",type:"fix",question:"How much cost this jacket?",correct:"How much does this jacket cost?"},
    {id:"a1-shopping-fix-012",type:"fix",question:"I want to buy a new shoes.",correct:"I want to buy new shoes."},
    {id:"a1-shopping-question-013",type:"make_question",answer:"It's twenty-nine reais.",prompt:"Ask about the price.",correct:"How much is it?"},
    {id:"a1-shopping-question-014",type:"make_question",answer:"I pay in cash.",prompt:"Ask about the payment.",correct:"How do you pay?"},
    {id:"a1-shopping-tf-015",type:"true_false",statements:[
      {text:"'How much is it?' asks about price.",answer:true},
      {text:"'Cheap' is the opposite of 'expensive'.",answer:true},
      {text:"'Shoes' takes a singular verb: 'this shoes is'.",answer:false},
      {text:"A receipt is the paper that shows what you paid.",answer:true},
      {text:"'Can I help you?' is what a customer says first.",answer:false},
      {text:"'A discount' means you pay less.",answer:true}
    ]},
    {id:"a1-shopping-dialogue-016",type:"dialogue",
      title:"Paying at the till",
      context:"A short conversation at the checkout.",
      wordBank:["much","card","bag","receipt","all","else"],
      lines:[
        {who:"A",text:"Is that ___?"},
        {who:"B",text:"Yes. How ___ is it?"},
        {who:"A",text:"Fifty-two reais. Cash or ___?"},
        {who:"B",text:"Card, please. Do you have a ___?"},
        {who:"A",text:"Here you are. Anything ___?"},
        {who:"B",text:"No, thanks. Can I have the ___?"}
      ],
      answers:["all","much","card","bag","else","receipt"]},
    {id:"a1-shopping-sentence-017",type:"make_sentence",
      instruction:"Choose a verb and talk about shopping.",
      verbs:[
        {v:"buy",     id:"a1-shopping-sentence-buy-001"},
        {v:"pay",     id:"a1-shopping-sentence-pay-001"},
        {v:"look for",id:"a1-shopping-sentence-lookfor-001"},
        {v:"choose",  id:"a1-shopping-sentence-choose-001"},
        {v:"spend",   id:"a1-shopping-sentence-spend-001"},
        {v:"cost",    id:"a1-shopping-sentence-cost-001"},
        {v:"return",  id:"a1-shopping-sentence-return-001"},
        {v:"compare", id:"a1-shopping-sentence-compare-001"}
      ]}
  ]},

  "a1-time":{ label:"Dates & Time", level:"A1", keys:["time","date","clock","hora","calendar","months"], exercises:[
    {id:"a1-time-complete-001",type:"fill_blank",question:"My birthday is ___ March.",correct:"in"},
    {id:"a1-time-complete-002",type:"fill_blank",question:"The meeting is ___ Friday at ten.",correct:"on"},
    {id:"a1-time-complete-003",type:"fill_blank",question:"It's half ___ seven.",correct:"past"},
    {id:"a1-time-complete-004",type:"fill_blank",question:"The film starts ___ eight o'clock.",correct:"at"},
    {id:"a1-time-mc-005",type:"multiple_choice",question:"7:45 is ___.",options:["quarter past seven","half past seven","quarter to eight","seven fifteen"],correct:2},
    {id:"a1-time-mc-006",type:"multiple_choice",question:"The month after August is ___.",options:["July","October","November","September"],correct:3},
    {id:"a1-time-mc-007",type:"multiple_choice",question:"The course started ___ 2024.",options:["in","at","on","to"],correct:0},
    {id:"a1-time-unscramble-008",type:"unscramble",question:"is / it / time / what / ? /",correct:"What time is it?"},
    {id:"a1-time-unscramble-009",type:"unscramble",question:"birthday / when / your / is / ? /",correct:"When is your birthday?"},
    {id:"a1-time-unscramble-010",type:"unscramble",question:"the / on / class / is / of / second / month / the / day",correct:"The class is on the second day of the month."},
    {id:"a1-time-fix-011",type:"fix",question:"I was born in 12 May.",correct:"I was born on 12 May."},
    {id:"a1-time-fix-012",type:"fix",question:"The class starts in nine o'clock.",correct:"The class starts at nine o'clock."},
    {id:"a1-time-question-013",type:"make_question",answer:"It's twenty past four.",prompt:"Ask about the time now.",correct:"What time is it?"},
    {id:"a1-time-question-014",type:"make_question",answer:"My course finishes in November.",prompt:"Ask about the month.",correct:"When does your course finish?"},
    {id:"a1-time-match-015",type:"matching",question:"Match the clock time to the words:",pairs:[
      {left:"6:15",right:"quarter past six"},
      {left:"9:30",right:"half past nine"},
      {left:"10:50",right:"ten to eleven"},
      {left:"12:00",right:"midday"},
      {left:"00:00",right:"midnight"}
    ]},
    {id:"a1-time-dialogue-016",type:"dialogue",
      title:"Making an appointment",
      context:"Booking a class time on the phone.",
      wordBank:["at","on","about","time","in","see"],
      lines:[
        {who:"A",text:"What ___ is good for you?"},
        {who:"B",text:"Tuesday ___ six, maybe?"},
        {who:"A",text:"Sorry, I'm busy ___ Tuesdays."},
        {who:"B",text:"How ___ Wednesday, then?"},
        {who:"A",text:"Wednesday works. And ___ July we can change the day."},
        {who:"B",text:"Great. ___ you on Wednesday."}
      ],
      answers:["time","at","on","about","in","See"]},
    {id:"a1-time-sentence-017",type:"make_sentence",
      instruction:"Choose a verb and say something with a time or a date.",
      verbs:[
        {v:"start",  id:"a1-time-sentence-start-001"},
        {v:"finish", id:"a1-time-sentence-finish-001"},
        {v:"arrive", id:"a1-time-sentence-arrive-001"},
        {v:"open",   id:"a1-time-sentence-open-001"},
        {v:"close",  id:"a1-time-sentence-close-001"},
        {v:"meet",   id:"a1-time-sentence-meet-001"},
        {v:"wake up",id:"a1-time-sentence-wakeup-001"},
        {v:"leave",  id:"a1-time-sentence-leave-001"}
      ]}
  ]},

  /* ---- A1 · Reading (um texto = um tema, com groupId) ---- */

  "a1-family-reading":{ label:"↳ Family · Reading", level:"A1", keys:["reading","family"],
    groupId:"a1-family-reading-group-001",
    passage:{ level:"A1", title:"My Small Family",
      text:"My name is Rita and I live in Porto Alegre with my husband and our daughter. Her name is Cecília and she is six years old. She starts school this year. My husband works in a bank and he leaves home very early. I work from home, so I take Cecília to school every morning. On Sundays my parents come for lunch. My mother always brings a cake. We are not a big family, but we see each other a lot."},
    exercises:[
      {id:"a1-family-reading-mc-001",type:"multiple_choice",question:"Who lives with Rita?",
        options:["Her parents","Her husband and daughter","Her sister","Nobody"],correct:1},
      {id:"a1-family-reading-mc-002",type:"multiple_choice",question:"Why does Rita take Cecília to school?",
        options:["Because the school is far","Because her husband has no car","Because she works at home","Because Cecília is ill"],correct:2},
      {id:"a1-family-reading-complete-003",type:"fill_blank",question:"Rita's husband works in a ___.",correct:"bank"},
      {id:"a1-family-reading-mc-004",type:"multiple_choice",question:"In the text, \"she is six years old\" tells us Cecília's ___.",
        options:["name","address","school","age"],correct:3},
      {id:"a1-family-reading-complete-005",type:"fill_blank",question:"Rita's mother always ___ (bring) a cake on Sundays.",correct:"brings"},
      {id:"a1-family-reading-match-006",type:"matching",question:"Match the word from the text to its meaning:",pairs:[
        {left:"husband",right:"the man a woman is married to"},
        {left:"daughter",right:"a female child"},
        {left:"early",right:"before the usual time"},
        {left:"lunch",right:"the meal in the middle of the day"}
      ]}
    ]
  },

  "a1-food-reading":{ label:"↳ Food & Drinks · Reading", level:"A1", keys:["reading","food"],
    groupId:"a1-food-reading-group-001",
    passage:{ level:"A1", title:"Breakfast in Two Countries",
      text:"In Brazil, many people have a small breakfast. They drink coffee with milk and eat bread with butter or cheese. Some people eat fruit, like papaya or banana. In England, breakfast is often bigger. People eat eggs, beans and toast, and they drink tea. Of course, not everybody has time in the morning. My friend Tom lives in London and he only drinks a coffee before work. He says he is never hungry at seven o'clock."},
    exercises:[
      {id:"a1-food-reading-mc-001",type:"multiple_choice",question:"What is the text about?",
        options:["Breakfast in two countries","Restaurants in London","How to make bread","Fruit in Brazil"],correct:0},
      {id:"a1-food-reading-mc-002",type:"multiple_choice",question:"What do people often drink with breakfast in England?",
        options:["Coffee","Tea","Juice","Milk"],correct:1},
      {id:"a1-food-reading-complete-003",type:"fill_blank",question:"Tom only drinks a coffee ___ work.",correct:"before"},
      {id:"a1-food-reading-mc-004",type:"multiple_choice",question:"In the text, \"hungry\" means...",
        options:["you are tired","you want to sleep","you want to eat","you are late"],correct:2},
      {id:"a1-food-reading-complete-005",type:"fill_blank",question:"Some Brazilians ___ (eat) fruit for breakfast.",correct:"eat"},
      {id:"a1-food-reading-mc-006",type:"multiple_choice",question:"Which sentence is TRUE according to the text?",
        options:["Everybody has a big breakfast.","Tom has eggs every morning.","Nobody drinks coffee in England.","Some people have no time in the morning."],correct:3}
    ]
  },

  "a1-school-reading":{ label:"↳ School · Reading", level:"A1", keys:["reading","school"],
    groupId:"a1-school-reading-group-001",
    passage:{ level:"A1", title:"My English Class",
      text:"I study English on Tuesdays and Thursdays. My class is at seven in the evening, after work. There are only four students in the group, so we talk a lot. Our teacher is called Marina. She never speaks Portuguese in class, but she speaks slowly and we understand her. We have homework every week — usually a short text to read. I don't like grammar exercises, but I love the conversation part."},
    exercises:[
      {id:"a1-school-reading-mc-001",type:"multiple_choice",question:"When does the writer have class?",
        options:["Tuesdays and Thursdays","Every day","Only on Thursdays","At the weekend"],correct:0},
      {id:"a1-school-reading-mc-002",type:"multiple_choice",question:"Why do the students talk a lot?",
        options:["The class is long","The group is small","The teacher is Brazilian","There is no homework"],correct:1},
      {id:"a1-school-reading-complete-003",type:"fill_blank",question:"The class is ___ seven in the evening.",correct:"at"},
      {id:"a1-school-reading-complete-004",type:"fill_blank",question:"Marina never ___ (speak) Portuguese in class.",correct:"speaks"},
      {id:"a1-school-reading-mc-005",type:"multiple_choice",question:"In the text, \"slowly\" describes...",
        options:["where the class is","when the class starts","how the teacher speaks","how many students there are"],correct:2},
      {id:"a1-school-reading-mc-006",type:"multiple_choice",question:"What does the writer NOT like?",
        options:["The teacher","The conversation part","The evening class","Grammar exercises"],correct:3}
    ]
  },

  "a1-weather-reading":{ label:"↳ Weather · Reading", level:"A1", keys:["reading","weather"],
    groupId:"a1-weather-reading-group-001",
    passage:{ level:"A1", title:"Winter in the South",
      text:"People often think Brazil is always hot, but that is not true. In the south, winter is cold. In Curitiba, mornings in July are grey and wet, and the temperature can be five degrees. It doesn't usually snow, but it is very cold for us. My grandmother lives in the mountains and there it snows one or two days a year. Everybody takes photos when it happens. In summer, of course, it is a different city."},
    exercises:[
      {id:"a1-weather-reading-mc-001",type:"multiple_choice",question:"What is the main idea of the text?",
        options:["The south of Brazil has cold winters","Brazil is always hot","It snows every day in Curitiba","Summer is the best season"],correct:0},
      {id:"a1-weather-reading-complete-002",type:"fill_blank",question:"In July, mornings in Curitiba are grey and ___.",correct:"wet"},
      {id:"a1-weather-reading-mc-003",type:"multiple_choice",question:"How often does it snow in the mountains?",
        options:["Every week","One or two days a year","Never","Every winter morning"],correct:1},
      {id:"a1-weather-reading-complete-004",type:"fill_blank",question:"It ___ (not/usually/snow) in Curitiba.",correct:"doesn't usually snow"},
      {id:"a1-weather-reading-mc-005",type:"multiple_choice",question:"In the text, \"a different city\" in summer means the city...",
        options:["changes its name","moves to the mountains","feels very different","is closed"],correct:2},
      {id:"a1-weather-reading-match-006",type:"matching",question:"Match the word from the text to its meaning:",pairs:[
        {left:"cold",right:"low temperature"},
        {left:"wet",right:"with water or rain"},
        {left:"degrees",right:"how we measure temperature"},
        {left:"mountains",right:"very high land"}
      ]}
    ]
  },

  "a1-places-reading":{ label:"↳ Places in Town · Reading", level:"A1", keys:["reading","places","town"],
    groupId:"a1-places-reading-group-001",
    passage:{ level:"A1", title:"My Street",
      text:"I live on a small street near the centre. There is a bakery on the corner and it opens at six in the morning. Next to the bakery there is a pharmacy, and opposite my building there is a little square with three benches. On Saturdays there is a market in the square. It's noisy, but I like it. There isn't a supermarket on my street, so I take the bus to the big one on Avenida Brasil."},
    exercises:[
      {id:"a1-places-reading-mc-001",type:"multiple_choice",question:"What is next to the bakery?",
        options:["A bus stop","A supermarket","A square","A pharmacy"],correct:3},
      {id:"a1-places-reading-complete-002",type:"fill_blank",question:"There ___ a supermarket on the writer's street.",correct:"isn't"},
      {id:"a1-places-reading-mc-003",type:"multiple_choice",question:"What happens in the square on Saturdays?",
        options:["There is a market","The bakery closes","The buses stop","Nothing happens"],correct:0},
      {id:"a1-places-reading-complete-004",type:"fill_blank",question:"The bakery ___ (open) at six in the morning.",correct:"opens"},
      {id:"a1-places-reading-mc-005",type:"multiple_choice",question:"In the text, \"opposite my building\" means...",
        options:["inside my building","on the other side of the street","behind the bakery","far from the centre"],correct:1},
      {id:"a1-places-reading-mc-006",type:"multiple_choice",question:"Why does the writer take the bus?",
        options:["To go to the bakery","To go to the square","To go to a big supermarket","To go to the pharmacy"],correct:2}
    ]
  },

  /* ==================== A2 ==================== */

  "a2-travel":{ label:"Travel", level:"A2", keys:["travel","trip","viagem","journey"], exercises:[
    {id:"a2-travel-complete-001",type:"fill_blank",question:"Have you ___ been to Argentina?",correct:"ever"},
    {id:"a2-travel-complete-002",type:"fill_blank",question:"We ___ (spend) two weeks in Chile last year.",correct:"spent"},
    {id:"a2-travel-complete-003",type:"fill_blank",question:"I'm going ___ book the tickets tonight.",correct:"to"},
    {id:"a2-travel-complete-004",type:"fill_blank",question:"Don't forget to take your ___ — you can't cross the border without it.",correct:"passport"},
    {id:"a2-travel-mc-005",type:"multiple_choice",question:"I've never ___ by boat.",options:["travel","to travel","travelling","travelled"],correct:3},
    {id:"a2-travel-mc-006",type:"multiple_choice",question:"This trip was ___ than the one to Bahia.",options:["more expensive","expensive","most expensive","expensiver"],correct:0},
    {id:"a2-travel-mc-007",type:"multiple_choice",question:"We stayed ___ a small hotel near the beach.",options:["on","in","to","by"],correct:1},
    {id:"a2-travel-unscramble-008",type:"unscramble",question:"abroad / been / never / I've",correct:"I've never been abroad."},
    {id:"a2-travel-unscramble-009",type:"unscramble",question:"were / long / how / there / you / ? /",correct:"How long were you there?"},
    {id:"a2-travel-fix-010",type:"fix",question:"I have went to Peru last year.",correct:"I went to Peru last year."},
    {id:"a2-travel-fix-011",type:"fix",question:"We are going to travel in next month.",correct:"We are going to travel next month."},
    {id:"a2-travel-transform-012",type:"transform",question:"Rewrite with the present perfect: I visited Bogotá. (in my life, no date)",correct:"I have visited Bogotá."},
    {id:"a2-travel-question-013",type:"make_question",answer:"We stayed for ten days.",prompt:"Ask about the length of the stay.",correct:"How long did you stay?"},
    {id:"a2-travel-question-014",type:"make_question",answer:"I travelled with two friends from work.",prompt:"Ask about the people.",correct:"Who did you travel with?"},
    {id:"a2-travel-dialogue-015",type:"dialogue",
      title:"Back from holiday",
      context:"Two colleagues on Monday morning.",
      wordBank:["was","did","were","have","going","stayed"],
      lines:[
        {who:"A",text:"How ___ your trip?"},
        {who:"B",text:"Amazing. We ___ in a small village by the sea."},
        {who:"A",text:"___ you go by car?"},
        {who:"B",text:"No, by bus. The roads ___ terrible."},
        {who:"A",text:"I ___ never been there."},
        {who:"B",text:"You should. We're ___ back in December."}
      ],
      answers:["was","stayed","Did","were","have","going"]},
    {id:"a2-travel-sentence-016",type:"make_sentence",
      instruction:"Choose a verb and talk about a trip you took.",
      verbs:[
        {v:"travel", id:"a2-travel-sentence-travel-001"},
        {v:"visit",  id:"a2-travel-sentence-visit-001"},
        {v:"stay",   id:"a2-travel-sentence-stay-001"},
        {v:"book",   id:"a2-travel-sentence-book-001"},
        {v:"arrive", id:"a2-travel-sentence-arrive-001"},
        {v:"pack",   id:"a2-travel-sentence-pack-001"},
        {v:"lose",   id:"a2-travel-sentence-lose-001"},
        {v:"discover",id:"a2-travel-sentence-discover-001"}
      ]}
  ]},

  "a2-holidays":{ label:"Holidays", level:"A2", keys:["holiday","vacation","feriado","festas"], exercises:[
    {id:"a2-holidays-complete-001",type:"fill_blank",question:"We usually ___ (spend) Christmas at my aunt's house.",correct:"spend"},
    {id:"a2-holidays-complete-002",type:"fill_blank",question:"Last New Year's Eve we ___ (watch) the fireworks on the beach.",correct:"watched"},
    {id:"a2-holidays-complete-003",type:"fill_blank",question:"I'm taking two weeks ___ in January.",correct:"off"},
    {id:"a2-holidays-complete-004",type:"fill_blank",question:"There ___ (be) a lot of people in the street during Carnival.",correct:"were"},
    {id:"a2-holidays-mc-005",type:"multiple_choice",question:"What ___ you do last Easter?",options:["do","have","did","were"],correct:2},
    {id:"a2-holidays-mc-006",type:"multiple_choice",question:"We were tired, ___ we stayed at home.",options:["because","although","but","so"],correct:3},
    {id:"a2-holidays-mc-007",type:"multiple_choice",question:"It's the ___ holiday of the year for my family.",options:["most important","more important","important","importantest"],correct:0},
    {id:"a2-holidays-unscramble-008",type:"unscramble",question:"holiday / favourite / is / my / June / in",correct:"My favourite holiday is in June."},
    {id:"a2-holidays-unscramble-009",type:"unscramble",question:"do / usually / what / on / your / do / birthday / you / ? /",correct:"What do you usually do on your birthday?"},
    {id:"a2-holidays-fix-010",type:"fix",question:"Last year we didn't travelled at Christmas.",correct:"Last year we didn't travel at Christmas."},
    {id:"a2-holidays-fix-011",type:"fix",question:"In my country we celebrate the independence in September.",correct:"In my country we celebrate independence in September."},
    {id:"a2-holidays-transform-012",type:"transform",question:"Make it negative: They stayed at home last weekend.",correct:"They didn't stay at home last weekend."},
    {id:"a2-holidays-question-013",type:"make_question",answer:"We celebrated at my grandmother's house.",prompt:"Ask about the place.",correct:"Where did you celebrate?"},
    {id:"a2-holidays-question-014",type:"make_question",answer:"Because the whole family gets together.",prompt:"Ask about the reason.",correct:"Why do you like it?"},
    {id:"a2-holidays-story-015",type:"story",
      title:"A June party",
      context:"Talking about a Festa Junina last year.",
      wordBank:["was","went","danced","cooked","rained","stayed","brought","forgot"],
      text:"Last June my cousins and I ___ to a party in a small town. The weather ___ perfect at first — "+
           "warm and dry. My aunt ___ pamonha for everybody and my uncle ___ his guitar. "+
           "We ___ until midnight. Then it ___ heavily and we ___ inside the school hall. "+
           "Nobody ___ that night — everyone still talks about it.",
      answers:["went","was","cooked","brought","danced","rained","stayed","forgot"]},
    {id:"a2-holidays-sentence-016",type:"make_sentence",
      instruction:"Choose a verb and talk about a holiday you celebrate.",
      verbs:[
        {v:"celebrate", id:"a2-holidays-sentence-celebrate-001"},
        {v:"invite",    id:"a2-holidays-sentence-invite-001"},
        {v:"cook",      id:"a2-holidays-sentence-cook-001"},
        {v:"decorate",  id:"a2-holidays-sentence-decorate-001"},
        {v:"give",      id:"a2-holidays-sentence-give-001"},
        {v:"travel",    id:"a2-holidays-sentence-travel-001"},
        {v:"rest",      id:"a2-holidays-sentence-rest-001"},
        {v:"remember",  id:"a2-holidays-sentence-remember-001"}
      ]}
  ]},

  "a2-restaurants":{ label:"Restaurants", level:"A2", keys:["restaurant","menu","order","garcom","food"], exercises:[
    {id:"a2-restaurants-complete-001",type:"fill_blank",question:"Could I ___ the menu, please?",correct:"see"},
    {id:"a2-restaurants-complete-002",type:"fill_blank",question:"I'd like the fish, ___ chips.",correct:"with"},
    {id:"a2-restaurants-complete-003",type:"fill_blank",question:"We'd like to book a table ___ four.",correct:"for"},
    {id:"a2-restaurants-complete-004",type:"fill_blank",question:"Excuse me, could we have the ___, please? We need to pay.",correct:"bill"},
    {id:"a2-restaurants-mc-005",type:"multiple_choice",question:"___ I take your order?",options:["Do","May","Am","Will"],correct:1},
    {id:"a2-restaurants-mc-006",type:"multiple_choice",question:"The steak was ___ than I expected.",options:["good","best","better","more good"],correct:2},
    {id:"a2-restaurants-mc-007",type:"multiple_choice",question:"Is the service charge ___ in the price?",options:["inclusive","including","include","included"],correct:3},
    {id:"a2-restaurants-unscramble-008",type:"unscramble",question:"recommend / what / you / do / ? /",correct:"What do you recommend?"},
    {id:"a2-restaurants-unscramble-009",type:"unscramble",question:"a / I'd / water / like / of / bottle / sparkling",correct:"I'd like a bottle of sparkling water."},
    {id:"a2-restaurants-fix-010",type:"fix",question:"I want that you bring the bill.",correct:"Could you bring the bill, please?"},
    {id:"a2-restaurants-fix-011",type:"fix",question:"The waiter asked what did we want.",correct:"The waiter asked what we wanted."},
    {id:"a2-restaurants-transform-012",type:"transform",question:"Make it more polite: Give me a coffee.",correct:"Could I have a coffee, please?"},
    {id:"a2-restaurants-question-013",type:"make_question",answer:"I'll have the chicken salad.",prompt:"Ask the customer about the order.",correct:"What would you like to order?"},
    {id:"a2-restaurants-question-014",type:"make_question",answer:"No, I'm allergic to nuts.",prompt:"Ask about food restrictions.",correct:"Can you eat everything on the menu?"},
    {id:"a2-restaurants-dialogue-015",type:"dialogue",
      title:"Ordering dinner",
      context:"A waiter takes an order for two people.",
      wordBank:["ready","have","comes","Would","without","bill"],
      lines:[
        {who:"Waiter",text:"Are you ___ to order?"},
        {who:"Customer",text:"Yes. I'll ___ the grilled fish."},
        {who:"Waiter",text:"It ___ with rice or potatoes."},
        {who:"Customer",text:"Rice, please — and ___ salt."},
        {who:"Waiter",text:"___ you like something to drink?"},
        {who:"Customer",text:"Just water. And could we get the ___ later together?"}
      ],
      answers:["ready","have","comes","without","Would","bill"]},
    {id:"a2-restaurants-sentence-016",type:"make_sentence",
      instruction:"Choose a verb and say something you would say in a restaurant.",
      verbs:[
        {v:"order",     id:"a2-restaurants-sentence-order-001"},
        {v:"book",      id:"a2-restaurants-sentence-book-001"},
        {v:"recommend", id:"a2-restaurants-sentence-recommend-001"},
        {v:"pay",       id:"a2-restaurants-sentence-pay-001"},
        {v:"share",     id:"a2-restaurants-sentence-share-001"},
        {v:"complain",  id:"a2-restaurants-sentence-complain-001"},
        {v:"taste",     id:"a2-restaurants-sentence-taste-001"},
        {v:"tip",       id:"a2-restaurants-sentence-tip-001"}
      ]}
  ]},

  "a2-hotel":{ label:"Hotel", level:"A2", keys:["hotel","room","check in","reserva","booking"], exercises:[
    {id:"a2-hotel-complete-001",type:"fill_blank",question:"I have a reservation ___ the name of Sabatovicz.",correct:"in"},
    {id:"a2-hotel-complete-002",type:"fill_blank",question:"What time do we have to check ___?",correct:"out"},
    {id:"a2-hotel-complete-003",type:"fill_blank",question:"Is breakfast ___ in the price?",correct:"included"},
    {id:"a2-hotel-complete-004",type:"fill_blank",question:"The room ___ (not/be) ready when we arrived.",correct:"wasn't"},
    {id:"a2-hotel-mc-005",type:"multiple_choice",question:"We'd like a room ___ a view of the sea.",options:["with","of","in","by"],correct:0},
    {id:"a2-hotel-mc-006",type:"multiple_choice",question:"You ___ leave your key at reception.",options:["have","have to","must to","musts"],correct:1},
    {id:"a2-hotel-mc-007",type:"multiple_choice",question:"A room for one person is a ___ room.",options:["double","twin","single","family"],correct:2},
    {id:"a2-hotel-unscramble-008",type:"unscramble",question:"nights / staying / three / we're / for",correct:"We're staying for three nights."},
    {id:"a2-hotel-unscramble-009",type:"unscramble",question:"is / what / breakfast / time / ? /",correct:"What time is breakfast?"},
    {id:"a2-hotel-fix-010",type:"fix",question:"The wifi don't work in my room.",correct:"The wifi doesn't work in my room."},
    {id:"a2-hotel-fix-011",type:"fix",question:"We must to pay before check-out.",correct:"We must pay before check-out."},
    {id:"a2-hotel-transform-012",type:"transform",question:"Make it a polite request: I need extra towels.",correct:"Could I have extra towels, please?"},
    {id:"a2-hotel-question-013",type:"make_question",answer:"Check-in is from two o'clock.",prompt:"Ask about check-in time.",correct:"What time is check-in?"},
    {id:"a2-hotel-question-014",type:"make_question",answer:"It's on the fifth floor, room 512.",prompt:"Ask where the room is.",correct:"Where is my room?"},
    {id:"a2-hotel-dialogue-015",type:"dialogue",
      title:"At reception",
      context:"A guest arrives late in the evening.",
      wordBank:["reservation","nights","included","until","key","sign"],
      lines:[
        {who:"A",text:"Good evening. I have a ___."},
        {who:"B",text:"Your name, please? Ah, yes — three ___."},
        {who:"A",text:"Is breakfast ___?"},
        {who:"B",text:"Yes, from seven ___ ten. Could you ___ here?"},
        {who:"A",text:"Of course. And the ___?"},
        {who:"B",text:"Room 210. The lift is on your right."}
      ],
      answers:["reservation","nights","included","until","sign","key"]},
    {id:"a2-hotel-sentence-016",type:"make_sentence",
      instruction:"Choose a verb and say something you would say at a hotel.",
      verbs:[
        {v:"book",     id:"a2-hotel-sentence-book-001"},
        {v:"check in", id:"a2-hotel-sentence-checkin-001"},
        {v:"ask for",  id:"a2-hotel-sentence-askfor-001"},
        {v:"cancel",   id:"a2-hotel-sentence-cancel-001"},
        {v:"complain", id:"a2-hotel-sentence-complain-001"},
        {v:"pay",      id:"a2-hotel-sentence-pay-001"},
        {v:"leave",    id:"a2-hotel-sentence-leave-001"},
        {v:"recommend",id:"a2-hotel-sentence-recommend-001"}
      ]}
  ]},

  "a2-airport":{ label:"At the Airport", level:"A2", keys:["airport","flight","gate","aeroporto","check in"], exercises:[
    {id:"a2-airport-complete-001",type:"fill_blank",question:"Our flight is ___ — it now leaves at eleven instead of nine.",correct:"delayed"},
    {id:"a2-airport-complete-002",type:"fill_blank",question:"You have to check ___ your luggage two hours before.",correct:"in"},
    {id:"a2-airport-complete-003",type:"fill_blank",question:"We ___ (wait) at the gate when they announced the change.",correct:"were waiting"},
    {id:"a2-airport-complete-004",type:"fill_blank",question:"I've ___ boarded — I'm in my seat now.",correct:"already"},
    {id:"a2-airport-mc-005",type:"multiple_choice",question:"Where do you show your passport?",options:["At the gate","At the café","At the baggage belt","At passport control"],correct:3},
    {id:"a2-airport-mc-006",type:"multiple_choice",question:"If we don't hurry, we ___ the flight.",options:["will miss","miss","missed","are missing"],correct:0},
    {id:"a2-airport-mc-007",type:"multiple_choice",question:"You take this small bag on the plane with you: ___ luggage.",options:["checked","hand","lost","heavy"],correct:1},
    {id:"a2-airport-unscramble-008",type:"unscramble",question:"gate / which / from / does / leave / it / ? /",correct:"Which gate does it leave from?"},
    {id:"a2-airport-unscramble-009",type:"unscramble",question:"missed / because / we / the / traffic / of / flight / the",correct:"We missed the flight because of the traffic."},
    {id:"a2-airport-fix-010",type:"fix",question:"I lost my flight yesterday.",correct:"I missed my flight yesterday."},
    {id:"a2-airport-fix-011",type:"fix",question:"We was waiting at the gate for two hours.",correct:"We were waiting at the gate for two hours."},
    {id:"a2-airport-transform-012",type:"transform",question:"Use 'going to': My plane lands at six. (plan, near future)",correct:"My plane is going to land at six."},
    {id:"a2-airport-question-013",type:"make_question",answer:"It takes off at 7:40.",prompt:"Ask about the departure time.",correct:"What time does it take off?"},
    {id:"a2-airport-question-014",type:"make_question",answer:"Because there was a storm in São Paulo.",prompt:"Ask about the reason for the delay.",correct:"Why was the flight delayed?"},
    {id:"a2-airport-dialogue-015",type:"dialogue",
      title:"Checking in",
      context:"A passenger at the check-in desk.",
      wordBank:["window","boarding","bags","delayed","gate","passport"],
      lines:[
        {who:"A",text:"Good morning. Your ___, please."},
        {who:"B",text:"Here you are. Any ___ to check in?"},
        {who:"A",text:"Just one. Would you like an aisle or a ___ seat?"},
        {who:"B",text:"Window, please. Is the flight ___?"},
        {who:"A",text:"Twenty minutes only. Here's your ___ pass."},
        {who:"B",text:"Thanks. Which ___ is it?"}
      ],
      answers:["passport","bags","window","delayed","boarding","gate"]},
    {id:"a2-airport-sentence-016",type:"make_sentence",
      instruction:"Choose a verb and say something about an airport experience.",
      verbs:[
        {v:"check in", id:"a2-airport-sentence-checkin-001"},
        {v:"board",    id:"a2-airport-sentence-board-001"},
        {v:"land",     id:"a2-airport-sentence-land-001"},
        {v:"take off", id:"a2-airport-sentence-takeoff-001"},
        {v:"miss",     id:"a2-airport-sentence-miss-001"},
        {v:"wait",     id:"a2-airport-sentence-wait-001"},
        {v:"lose",     id:"a2-airport-sentence-lose-001"},
        {v:"pack",     id:"a2-airport-sentence-pack-001"}
      ]}
  ]},

  "a2-weekend":{ label:"Weekend Activities", level:"A2", keys:["weekend","saturday","sunday","fim de semana"], exercises:[
    {id:"a2-weekend-complete-001",type:"fill_blank",question:"What ___ you doing on Saturday night?",correct:"are"},
    {id:"a2-weekend-complete-002",type:"fill_blank",question:"We ___ (go) hiking last Sunday.",correct:"went"},
    {id:"a2-weekend-complete-003",type:"fill_blank",question:"I usually sleep ___ on Sundays.",correct:"in"},
    {id:"a2-weekend-complete-004",type:"fill_blank",question:"I'd rather stay in ___ go to a club.",correct:"than"},
    {id:"a2-weekend-mc-005",type:"multiple_choice",question:"We ___ dinner when the lights went out.",options:["had","have had","were having","are having"],correct:2},
    {id:"a2-weekend-mc-006",type:"multiple_choice",question:"I'm meeting Ana ___ Saturday morning.",options:["in","at","by","on"],correct:3},
    {id:"a2-weekend-mc-007",type:"multiple_choice",question:"It was ___ boring film I've seen this year.",options:["the most","the more","most","more"],correct:0},
    {id:"a2-weekend-unscramble-008",type:"unscramble",question:"anything / doing / are / you / Sunday / on / ? /",correct:"Are you doing anything on Sunday?"},
    {id:"a2-weekend-unscramble-009",type:"unscramble",question:"stayed / because / home / we / tired / were / at / we",correct:"We stayed at home because we were tired."},
    {id:"a2-weekend-fix-010",type:"fix",question:"In the last weekend I went to the beach.",correct:"Last weekend I went to the beach."},
    {id:"a2-weekend-fix-011",type:"fix",question:"What you did on Saturday?",correct:"What did you do on Saturday?"},
    {id:"a2-weekend-transform-012",type:"transform",question:"Use the past continuous: It started to rain. I ran in the park at that moment.",correct:"I was running in the park when it started to rain."},
    {id:"a2-weekend-question-013",type:"make_question",answer:"I went to a concert with my brother.",prompt:"Ask about the activity.",correct:"What did you do at the weekend?"},
    {id:"a2-weekend-question-014",type:"make_question",answer:"We're having lunch at my mother's.",prompt:"Ask about Sunday plans.",correct:"What are you doing on Sunday?"},
    {id:"a2-weekend-dialogue-015",type:"dialogue",
      title:"Making plans",
      context:"Thursday evening, two friends on the phone.",
      wordBank:["doing","free","was","going","rather","meet"],
      lines:[
        {who:"A",text:"What are you ___ this weekend?"},
        {who:"B",text:"Nothing yet. Are you ___ on Saturday?"},
        {who:"A",text:"In the afternoon. There's a market — I'm ___ with Clara."},
        {who:"B",text:"I'd ___ do something outside, to be honest."},
        {who:"A",text:"Then let's ___ at the park at four."},
        {who:"B",text:"Perfect. Last Saturday ___ so rainy."}
      ],
      answers:["doing","free","going","rather","meet","was"]},
    {id:"a2-weekend-sentence-016",type:"make_sentence",
      instruction:"Choose a verb and talk about your last weekend.",
      verbs:[
        {v:"go out",  id:"a2-weekend-sentence-goout-001"},
        {v:"visit",   id:"a2-weekend-sentence-visit-001"},
        {v:"cook",    id:"a2-weekend-sentence-cook-001"},
        {v:"watch",   id:"a2-weekend-sentence-watch-001"},
        {v:"sleep in",id:"a2-weekend-sentence-sleepin-001"},
        {v:"clean",   id:"a2-weekend-sentence-clean-001"},
        {v:"walk",    id:"a2-weekend-sentence-walk-001"},
        {v:"meet",    id:"a2-weekend-sentence-meet-001"}
      ]}
  ]},

  "a2-childhood":{ label:"Childhood", level:"A2", keys:["childhood","when I was a child","infancia","used to"], exercises:[
    {id:"a2-childhood-complete-001",type:"fill_blank",question:"I ___ to play in the street every afternoon.",correct:"used"},
    {id:"a2-childhood-complete-002",type:"fill_blank",question:"When I ___ (be) eight, we moved to another city.",correct:"was"},
    {id:"a2-childhood-complete-003",type:"fill_blank",question:"I didn't use ___ like vegetables.",correct:"to"},
    {id:"a2-childhood-complete-004",type:"fill_blank",question:"My grandmother ___ (tell) us stories every night.",correct:"told"},
    {id:"a2-childhood-mc-005",type:"multiple_choice",question:"We ___ have a computer at home in the nineties.",options:["didn't used to","didn't use to","don't use to","weren't use to"],correct:1},
    {id:"a2-childhood-mc-006",type:"multiple_choice",question:"I ___ scared of dogs when I was little.",options:["have been","were","was","am"],correct:2},
    {id:"a2-childhood-mc-007",type:"multiple_choice",question:"While my mother ___, I did my homework.",options:["cooked","cooks","has cooked","was cooking"],correct:3},
    {id:"a2-childhood-unscramble-008",type:"unscramble",question:"live / did / where / you / a / as / child / ? /",correct:"Where did you live as a child?"},
    {id:"a2-childhood-unscramble-009",type:"unscramble",question:"used / cousins / summer / my / with / to / I / spend / every",correct:"I used to spend every summer with my cousins."},
    {id:"a2-childhood-fix-010",type:"fix",question:"When I was child I lived in a farm.",correct:"When I was a child I lived on a farm."},
    {id:"a2-childhood-fix-011",type:"fix",question:"I use to play football every day.",correct:"I used to play football every day."},
    {id:"a2-childhood-transform-012",type:"transform",question:"Use 'used to': I played the piano when I was young, but not now.",correct:"I used to play the piano."},
    {id:"a2-childhood-question-013",type:"make_question",answer:"My favourite toy was a wooden car.",prompt:"Ask about the favourite toy.",correct:"What was your favourite toy?"},
    {id:"a2-childhood-question-014",type:"make_question",answer:"I went to a school two streets from my house.",prompt:"Ask about the school.",correct:"Which school did you go to?"},
    {id:"a2-childhood-story-015",type:"story",
      title:"Summers at my grandparents'",
      context:"Remembering childhood holidays.",
      wordBank:["used","spent","was","woke","helped","played","didn't","remember"],
      text:"Every January I ___ two weeks at my grandparents' house. My grandfather ___ to get up at five "+
           "and I always ___ up with him. The house ___ small and there was no television, so my cousins and I "+
           "___ outside all day. We ___ my grandmother with the animals in the morning. "+
           "We ___ have much, but I still ___ those summers perfectly.",
      answers:["spent","used","woke","was","played","helped","didn't","remember"]},
    {id:"a2-childhood-sentence-016",type:"make_sentence",
      instruction:"Choose a verb and talk about your childhood with 'used to' or the past simple.",
      verbs:[
        {v:"live",   id:"a2-childhood-sentence-live-001"},
        {v:"play",   id:"a2-childhood-sentence-play-001"},
        {v:"study",  id:"a2-childhood-sentence-study-001"},
        {v:"eat",    id:"a2-childhood-sentence-eat-001"},
        {v:"watch",  id:"a2-childhood-sentence-watch-001"},
        {v:"be afraid of", id:"a2-childhood-sentence-beafraidof-001"},
        {v:"collect",id:"a2-childhood-sentence-collect-001"},
        {v:"visit",  id:"a2-childhood-sentence-visit-001"}
      ]}
  ]},

  "a2-lifeevents":{ label:"Life Events", level:"A2", keys:["life events","born","married","graduate","vida"], exercises:[
    {id:"a2-lifeevents-complete-001",type:"fill_blank",question:"She ___ (be) born in Recife in 1990.",correct:"was"},
    {id:"a2-lifeevents-complete-002",type:"fill_blank",question:"They got ___ two years ago.",correct:"married"},
    {id:"a2-lifeevents-complete-003",type:"fill_blank",question:"I've lived here ___ 2019.",correct:"since"},
    {id:"a2-lifeevents-complete-004",type:"fill_blank",question:"He ___ (graduate) from university last December.",correct:"graduated"},
    {id:"a2-lifeevents-mc-005",type:"multiple_choice",question:"I've worked in this company ___ six years.",options:["for","since","ago","during"],correct:0},
    {id:"a2-lifeevents-mc-006",type:"multiple_choice",question:"My parents ___ to Curitiba before I was born.",options:["move","moved","have moved","are moving"],correct:1},
    {id:"a2-lifeevents-mc-007",type:"multiple_choice",question:"She ___ her first job when she was nineteen.",options:["has got","get","got","was getting"],correct:2},
    {id:"a2-lifeevents-unscramble-008",type:"unscramble",question:"born / where / you / were / ? /",correct:"Where were you born?"},
    {id:"a2-lifeevents-unscramble-009",type:"unscramble",question:"here / lived / has / she / 2015 / since",correct:"She has lived here since 2015."},
    {id:"a2-lifeevents-fix-010",type:"fix",question:"I am born in São Paulo.",correct:"I was born in São Paulo."},
    {id:"a2-lifeevents-fix-011",type:"fix",question:"I live in this house since ten years.",correct:"I have lived in this house for ten years."},
    {id:"a2-lifeevents-transform-012",type:"transform",question:"Use 'for' or 'since': I started this job in 2021. (say it with the present perfect)",correct:"I have had this job since 2021."},
    {id:"a2-lifeevents-question-013",type:"make_question",answer:"They met at a friend's wedding.",prompt:"Ask about the place they met.",correct:"Where did they meet?"},
    {id:"a2-lifeevents-question-014",type:"make_question",answer:"I've been a teacher for fifteen years.",prompt:"Ask about the length of time.",correct:"How long have you been a teacher?"},
    {id:"a2-lifeevents-dialogue-015",type:"dialogue",
      title:"How long have you known each other?",
      context:"At a birthday party, two guests talk.",
      wordBank:["since","How","known","met","for","moved"],
      lines:[
        {who:"A",text:"___ long have you two known each other?"},
        {who:"B",text:"We've ___ each other since school."},
        {who:"A",text:"Really? So ___ you were children."},
        {who:"B",text:"Yes. We ___ in the first year and never lost contact."},
        {who:"A",text:"And you've lived in the same city all this time?"},
        {who:"B",text:"Almost. I ___ to Recife ___ three years."}
      ],
      answers:["How","known","since","met","moved","for"]},
    {id:"a2-lifeevents-sentence-016",type:"make_sentence",
      instruction:"Choose a verb and talk about an important moment in your life.",
      verbs:[
        {v:"be born",  id:"a2-lifeevents-sentence-beborn-001"},
        {v:"grow up",  id:"a2-lifeevents-sentence-growup-001"},
        {v:"move",     id:"a2-lifeevents-sentence-move-001"},
        {v:"start",    id:"a2-lifeevents-sentence-start-001"},
        {v:"meet",     id:"a2-lifeevents-sentence-meet-001"},
        {v:"graduate", id:"a2-lifeevents-sentence-graduate-001"},
        {v:"change",   id:"a2-lifeevents-sentence-change-001"},
        {v:"decide",   id:"a2-lifeevents-sentence-decide-001"}
      ]}
  ]},

  "a2-technology":{ label:"Technology", level:"A2", keys:["technology","phone","computer","app","tecnologia"], exercises:[
    {id:"a2-technology-complete-001",type:"fill_blank",question:"My phone battery ___ (die) in the middle of the call.",correct:"died"},
    {id:"a2-technology-complete-002",type:"fill_blank",question:"Could you ___ the file to me by email?",correct:"send"},
    {id:"a2-technology-complete-003",type:"fill_blank",question:"I've just ___ (download) the app.",correct:"downloaded"},
    {id:"a2-technology-complete-004",type:"fill_blank",question:"Turn it ___ and on again — that usually works.",correct:"off"},
    {id:"a2-technology-mc-005",type:"multiple_choice",question:"The wifi ___ working since this morning.",options:["isn't","won't be","doesn't","hasn't been"],correct:3},
    {id:"a2-technology-mc-006",type:"multiple_choice",question:"I need to ___ my password. I forgot it.",options:["reset","restart","return","repeat"],correct:0},
    {id:"a2-technology-mc-007",type:"multiple_choice",question:"This laptop is ___ than my old one.",options:["fast","faster","fastest","more fast"],correct:1},
    {id:"a2-technology-unscramble-008",type:"unscramble",question:"charger / borrow / can / your / I / ? /",correct:"Can I borrow your charger?"},
    {id:"a2-technology-unscramble-009",type:"unscramble",question:"screen / because / the / broke / it / fell / phone / the",correct:"The phone screen broke because it fell."},
    {id:"a2-technology-fix-010",type:"fix",question:"I have download the app yesterday.",correct:"I downloaded the app yesterday."},
    {id:"a2-technology-fix-011",type:"fix",question:"My computer is not working since Monday.",correct:"My computer hasn't been working since Monday."},
    {id:"a2-technology-transform-012",type:"transform",question:"Make it a suggestion with 'should': Your laptop is very slow.",correct:"You should clean up your laptop."},
    {id:"a2-technology-question-013",type:"make_question",answer:"About four hours a day, unfortunately.",prompt:"Ask about screen time.",correct:"How long do you use your phone every day?"},
    {id:"a2-technology-question-014",type:"make_question",answer:"I use it mostly for work messages.",prompt:"Ask about the purpose.",correct:"What do you use it for?"},
    {id:"a2-technology-dialogue-015",type:"dialogue",
      title:"It's not working",
      context:"Trying to fix a laptop before a class.",
      wordBank:["working","tried","restart","since","connect","should"],
      lines:[
        {who:"A",text:"My laptop isn't ___."},
        {who:"B",text:"Have you ___ turning it off?"},
        {who:"A",text:"Twice. It's been like this ___ this morning."},
        {who:"B",text:"Maybe you ___ update the system."},
        {who:"A",text:"I can't even ___ to the wifi."},
        {who:"B",text:"Then ___ the router first."}
      ],
      answers:["working","tried","since","should","connect","restart"]},
    {id:"a2-technology-sentence-016",type:"make_sentence",
      instruction:"Choose a verb and talk about technology in your life.",
      verbs:[
        {v:"download", id:"a2-technology-sentence-download-001"},
        {v:"send",     id:"a2-technology-sentence-send-001"},
        {v:"install",  id:"a2-technology-sentence-install-001"},
        {v:"charge",   id:"a2-technology-sentence-charge-001"},
        {v:"break",    id:"a2-technology-sentence-break-001"},
        {v:"save",     id:"a2-technology-sentence-save-001"},
        {v:"share",    id:"a2-technology-sentence-share-001"},
        {v:"turn off", id:"a2-technology-sentence-turnoff-001"}
      ]}
  ]},

  "a2-social":{ label:"Social Media", level:"A2", keys:["social media","instagram","post","redes sociais"], exercises:[
    {id:"a2-social-complete-001",type:"fill_blank",question:"She ___ (post) three photos this week.",correct:"has posted"},
    {id:"a2-social-complete-002",type:"fill_blank",question:"I don't ___ many people — only friends.",correct:"follow"},
    {id:"a2-social-complete-003",type:"fill_blank",question:"He spends too much time ___ his phone.",correct:"on"},
    {id:"a2-social-complete-004",type:"fill_blank",question:"I ___ (delete) the app last month and I feel better.",correct:"deleted"},
    {id:"a2-social-mc-005",type:"multiple_choice",question:"How many people ___ you on Instagram?",options:["following","follows","follow","are follow"],correct:2},
    {id:"a2-social-mc-006",type:"multiple_choice",question:"I've ___ seen that video — you sent it yesterday.",options:["yet","still","never","already"],correct:3},
    {id:"a2-social-mc-007",type:"multiple_choice",question:"A message under a photo is a ___.",options:["comment","content","contact","count"],correct:0},
    {id:"a2-social-unscramble-008",type:"unscramble",question:"do / which / use / you / apps / most / ? /",correct:"Which apps do you use most?"},
    {id:"a2-social-unscramble-009",type:"unscramble",question:"posted / photo / yet / haven't / the / I",correct:"I haven't posted the photo yet."},
    {id:"a2-social-fix-010",type:"fix",question:"I have posted it yesterday.",correct:"I posted it yesterday."},
    {id:"a2-social-fix-011",type:"fix",question:"She spends much time in social media.",correct:"She spends a lot of time on social media."},
    {id:"a2-social-transform-012",type:"transform",question:"Use the present perfect with 'yet': I didn't answer his message.",correct:"I haven't answered his message yet."},
    {id:"a2-social-question-013",type:"make_question",answer:"About twenty minutes a day.",prompt:"Ask about time on social media.",correct:"How much time do you spend on social media?"},
    {id:"a2-social-question-014",type:"make_question",answer:"Because it was full of arguments.",prompt:"Ask about the reason for leaving an app.",correct:"Why did you leave it?"},
    {id:"a2-social-dialogue-015",type:"dialogue",
      title:"Did you see it?",
      context:"Two friends talk about a post.",
      wordBank:["seen","posted","yet","follow","commented","think"],
      lines:[
        {who:"A",text:"Have you ___ Bruna's video?"},
        {who:"B",text:"Not ___. When did she post it?"},
        {who:"A",text:"She ___ it last night. Everyone has ___ on it."},
        {who:"B",text:"I don't ___ her any more, actually."},
        {who:"A",text:"Really? Why?"},
        {who:"B",text:"I ___ she posts too much."}
      ],
      answers:["seen","yet","posted","commented","follow","think"]},
    {id:"a2-social-sentence-016",type:"make_sentence",
      instruction:"Choose a verb and say something about social media.",
      verbs:[
        {v:"post",    id:"a2-social-sentence-post-001"},
        {v:"follow",  id:"a2-social-sentence-follow-001"},
        {v:"share",   id:"a2-social-sentence-share-001"},
        {v:"comment", id:"a2-social-sentence-comment-001"},
        {v:"delete",  id:"a2-social-sentence-delete-001"},
        {v:"scroll",  id:"a2-social-sentence-scroll-001"},
        {v:"block",   id:"a2-social-sentence-block-001"},
        {v:"upload",  id:"a2-social-sentence-upload-001"}
      ]}
  ]},

  "a2-housework":{ label:"Housework", level:"A2", keys:["housework","chores","cleaning","tarefas","casa"], exercises:[
    {id:"a2-housework-complete-001",type:"fill_blank",question:"It's your turn to ___ the washing-up.",correct:"do"},
    {id:"a2-housework-complete-002",type:"fill_blank",question:"I have to ___ the bed every morning.",correct:"make"},
    {id:"a2-housework-complete-003",type:"fill_blank",question:"Who ___ (take) the rubbish out yesterday?",correct:"took"},
    {id:"a2-housework-complete-004",type:"fill_blank",question:"You don't ___ to clean the windows today.",correct:"have"},
    {id:"a2-housework-mc-005",type:"multiple_choice",question:"We ___ share the chores at home.",options:["should to","should","shoulds","are should"],correct:1},
    {id:"a2-housework-mc-006",type:"multiple_choice",question:"I hate ___ the floor.",options:["sweep","swept","sweeping","to sweeping"],correct:2},
    {id:"a2-housework-mc-007",type:"multiple_choice",question:"Have you ___ the laundry?",options:["do","did","doing","done"],correct:3},
    {id:"a2-housework-unscramble-008",type:"unscramble",question:"the / who / cooks / your / in / house / ? /",correct:"Who cooks in your house?"},
    {id:"a2-housework-unscramble-009",type:"unscramble",question:"to / I / iron / hate / shirts / having",correct:"I hate having to iron shirts."},
    {id:"a2-housework-fix-010",type:"fix",question:"I must to clean the kitchen tonight.",correct:"I must clean the kitchen tonight."},
    {id:"a2-housework-fix-011",type:"fix",question:"He make the dishes every evening.",correct:"He does the dishes every evening."},
    {id:"a2-housework-transform-012",type:"transform",question:"Use 'have to': It is necessary for me to clean the bathroom today.",correct:"I have to clean the bathroom today."},
    {id:"a2-housework-question-013",type:"make_question",answer:"My husband does most of the cooking.",prompt:"Ask who does the cooking.",correct:"Who does the cooking in your house?"},
    {id:"a2-housework-question-014",type:"make_question",answer:"Once a week, usually on Saturdays.",prompt:"Ask how often.",correct:"How often do you clean the house?"},
    {id:"a2-housework-story-015",type:"story",
      title:"Saturday morning at home",
      context:"How one family divides the chores.",
      wordBank:["cleans","does","takes","hate","have","washes","tidy","help"],
      text:"In our house Saturday morning is for chores. My father ___ the bathroom and my mother ___ "+
           "the laundry. My brother ___ the rubbish out and ___ the car. I ___ ironing, so I ___ the bedrooms instead. "+
           "We all ___ to finish before lunch, because in the afternoon nobody wants to ___.",
      answers:["cleans","does","takes","washes","hate","tidy","have","help"]},
    {id:"a2-housework-sentence-016",type:"make_sentence",
      instruction:"Choose a verb and talk about chores in your home.",
      verbs:[
        {v:"clean",  id:"a2-housework-sentence-clean-001"},
        {v:"wash",   id:"a2-housework-sentence-wash-001"},
        {v:"iron",   id:"a2-housework-sentence-iron-001"},
        {v:"tidy",   id:"a2-housework-sentence-tidy-001"},
        {v:"cook",   id:"a2-housework-sentence-cook-001"},
        {v:"sweep",  id:"a2-housework-sentence-sweep-001"},
        {v:"take out",id:"a2-housework-sentence-takeout-001"},
        {v:"share",  id:"a2-housework-sentence-share-001"}
      ]}
  ]},

  "a2-feelings":{ label:"Feelings", level:"A2", keys:["feelings","emotions","sentimentos","mood"], exercises:[
    {id:"a2-feelings-complete-001",type:"fill_blank",question:"I'm really ___ about the trip next week.",correct:"excited"},
    {id:"a2-feelings-complete-002",type:"fill_blank",question:"The film was ___ — I almost fell asleep.",correct:"boring"},
    {id:"a2-feelings-complete-003",type:"fill_blank",question:"She was ___ of speaking in public.",correct:"afraid"},
    {id:"a2-feelings-complete-004",type:"fill_blank",question:"He looked ___ when he heard the news.",correct:"surprised"},
    {id:"a2-feelings-mc-005",type:"multiple_choice",question:"I was ___ because the class was so ___.",options:["bored / boring","boring / bored","bored / bored","boring / boring"],correct:0},
    {id:"a2-feelings-mc-006",type:"multiple_choice",question:"She's worried ___ the exam.",options:["with","about","for","of"],correct:1},
    {id:"a2-feelings-mc-007",type:"multiple_choice",question:"When I got the message, I ___ really happy.",options:["feeled","fell","felt","feel"],correct:2},
    {id:"a2-feelings-unscramble-008",type:"unscramble",question:"nervous / feel / I / interviews / before",correct:"I feel nervous before interviews."},
    {id:"a2-feelings-unscramble-009",type:"unscramble",question:"you / does / make / what / angry / ? /",correct:"What makes you angry?"},
    {id:"a2-feelings-fix-010",type:"fix",question:"I am agree with you.",correct:"I agree with you."},
    {id:"a2-feelings-fix-011",type:"fix",question:"The news made me very surprise.",correct:"The news made me very surprised."},
    {id:"a2-feelings-transform-012",type:"transform",question:"Change to the -ing adjective: I was bored by the talk. (describe the talk)",correct:"The talk was boring."},
    {id:"a2-feelings-question-013",type:"make_question",answer:"Because my flight was cancelled.",prompt:"Ask about the reason for being upset.",correct:"Why were you upset?"},
    {id:"a2-feelings-question-014",type:"make_question",answer:"I usually go for a walk.",prompt:"Ask what the person does when stressed.",correct:"What do you do when you feel stressed?"},
    {id:"a2-feelings-match-015",type:"matching",question:"Match the situation to the feeling:",pairs:[
      {left:"You are waiting for exam results",right:"anxious"},
      {left:"A friend forgot your birthday",right:"disappointed"},
      {left:"You finished a hard project",right:"proud"},
      {left:"You have nothing to do for hours",right:"bored"},
      {left:"Someone helped you a lot",right:"grateful"}
    ]},
    {id:"a2-feelings-sentence-016",type:"make_sentence",
      instruction:"Choose a verb and say how you feel in a real situation.",
      verbs:[
        {v:"feel",   id:"a2-feelings-sentence-feel-001"},
        {v:"worry",  id:"a2-feelings-sentence-worry-001"},
        {v:"enjoy",  id:"a2-feelings-sentence-enjoy-001"},
        {v:"miss",   id:"a2-feelings-sentence-miss-001"},
        {v:"hope",   id:"a2-feelings-sentence-hope-001"},
        {v:"laugh",  id:"a2-feelings-sentence-laugh-001"},
        {v:"relax",  id:"a2-feelings-sentence-relax-001"},
        {v:"complain",id:"a2-feelings-sentence-complain-001"}
      ]}
  ]},

  "a2-personality":{ label:"Personality", level:"A2", keys:["personality","character","personalidade","adjectives"], exercises:[
    {id:"a2-personality-complete-001",type:"fill_blank",question:"My sister is very ___ — she always helps people.",correct:"kind"},
    {id:"a2-personality-complete-002",type:"fill_blank",question:"He never talks in a group. He's quite ___.",correct:"shy"},
    {id:"a2-personality-complete-003",type:"fill_blank",question:"She's good ___ listening to other people.",correct:"at"},
    {id:"a2-personality-complete-004",type:"fill_blank",question:"My boss is more patient ___ me.",correct:"than"},
    {id:"a2-personality-mc-005",type:"multiple_choice",question:"A person who always arrives on time is ___.",options:["lazy","generous","funny","punctual"],correct:3},
    {id:"a2-personality-mc-006",type:"multiple_choice",question:"He's the ___ person in the team.",options:["funniest","funnier","most funny","funny"],correct:0},
    {id:"a2-personality-mc-007",type:"multiple_choice",question:"She's hard-working, ___ she's not very organised.",options:["so","but","because","although"],correct:1},
    {id:"a2-personality-unscramble-008",type:"unscramble",question:"like / what / your / is / brother / ? /",correct:"What is your brother like?"},
    {id:"a2-personality-unscramble-009",type:"unscramble",question:"than / is / he / more / brother / his / talkative",correct:"He is more talkative than his brother."},
    {id:"a2-personality-fix-010",type:"fix",question:"She is more nicer than her cousin.",correct:"She is nicer than her cousin."},
    {id:"a2-personality-fix-011",type:"fix",question:"How is your new colleague like?",correct:"What is your new colleague like?"},
    {id:"a2-personality-transform-012",type:"transform",question:"Use a superlative: He is more organised than everybody in the office.",correct:"He is the most organised person in the office."},
    {id:"a2-personality-question-013",type:"make_question",answer:"She's quiet but very funny when you know her.",prompt:"Ask for a description of a person.",correct:"What is she like?"},
    {id:"a2-personality-question-014",type:"make_question",answer:"Patience, I think.",prompt:"Ask about the most important quality.",correct:"What is the most important quality for you?"},
    {id:"a2-personality-match-015",type:"matching",question:"Match the adjective to the behaviour:",pairs:[
      {left:"generous",right:"gives time and things to others"},
      {left:"stubborn",right:"never changes their mind"},
      {left:"reliable",right:"always does what they promise"},
      {left:"outgoing",right:"enjoys meeting new people"},
      {left:"impatient",right:"hates waiting"}
    ]},
    {id:"a2-personality-sentence-016",type:"make_sentence",
      instruction:"Choose a verb and describe someone's personality.",
      verbs:[
        {v:"seem",     id:"a2-personality-sentence-seem-001"},
        {v:"get on with",id:"a2-personality-sentence-getonwith-001"},
        {v:"trust",    id:"a2-personality-sentence-trust-001"},
        {v:"admire",   id:"a2-personality-sentence-admire-001"},
        {v:"remind",   id:"a2-personality-sentence-remind-001"},
        {v:"annoy",    id:"a2-personality-sentence-annoy-001"},
        {v:"describe", id:"a2-personality-sentence-describe-001"},
        {v:"change",   id:"a2-personality-sentence-change-001"}
      ]}
  ]},

  "a2-sports":{ label:"Sports", level:"A2", keys:["sport","game","team","esporte","exercise"], exercises:[
    {id:"a2-sports-complete-001",type:"fill_blank",question:"I ___ (play) volleyball twice a week.",correct:"play"},
    {id:"a2-sports-complete-002",type:"fill_blank",question:"Our team ___ (win) the match on Sunday.",correct:"won"},
    {id:"a2-sports-complete-003",type:"fill_blank",question:"He's been running ___ he was fifteen.",correct:"since"},
    {id:"a2-sports-complete-004",type:"fill_blank",question:"I go ___ the gym three times a week.",correct:"to"},
    {id:"a2-sports-mc-005",type:"multiple_choice",question:"We say 'play' with football, but ___ with swimming.",options:["play","do","go","make"],correct:2},
    {id:"a2-sports-mc-006",type:"multiple_choice",question:"They ___ the final last year.",options:["were losing","losed","have lost","lost"],correct:3},
    {id:"a2-sports-mc-007",type:"multiple_choice",question:"He's the ___ player in the team.",options:["best","better","goodest","most good"],correct:0},
    {id:"a2-sports-unscramble-008",type:"unscramble",question:"sport / do / what / you / play / ? /",correct:"What sport do you play?"},
    {id:"a2-sports-unscramble-009",type:"unscramble",question:"training / been / months / has / for / she / six",correct:"She has been training for six months."},
    {id:"a2-sports-fix-010",type:"fix",question:"I do football on Saturdays.",correct:"I play football on Saturdays."},
    {id:"a2-sports-fix-011",type:"fix",question:"My team win the game yesterday.",correct:"My team won the game yesterday."},
    {id:"a2-sports-transform-012",type:"transform",question:"Use the present perfect: I started swimming in January and I still swim.",correct:"I have been swimming since January."},
    {id:"a2-sports-question-013",type:"make_question",answer:"Three times a week, usually early.",prompt:"Ask about frequency of training.",correct:"How often do you train?"},
    {id:"a2-sports-question-014",type:"make_question",answer:"Two to one for us.",prompt:"Ask about the score.",correct:"What was the score?"},
    {id:"a2-sports-dialogue-015",type:"dialogue",
      title:"After the match",
      context:"Two friends leave the stadium.",
      wordBank:["score","won","been","played","should","think"],
      lines:[
        {who:"A",text:"What was the final ___?"},
        {who:"B",text:"Three-one. We ___, luckily."},
        {who:"A",text:"The first half wasn't good. They ___ better than us."},
        {who:"B",text:"True. The coach ___ change something."},
        {who:"A",text:"He's ___ saying that for months."},
        {who:"B",text:"I ___ next week will be harder."}
      ],
      answers:["score","won","played","should","been","think"]},
    {id:"a2-sports-sentence-016",type:"make_sentence",
      instruction:"Choose a verb and talk about sport in your life.",
      verbs:[
        {v:"play",  id:"a2-sports-sentence-play-001"},
        {v:"train", id:"a2-sports-sentence-train-001"},
        {v:"win",   id:"a2-sports-sentence-win-001"},
        {v:"lose",  id:"a2-sports-sentence-lose-001"},
        {v:"run",   id:"a2-sports-sentence-run-001"},
        {v:"swim",  id:"a2-sports-sentence-swim-001"},
        {v:"support",id:"a2-sports-sentence-support-001"},
        {v:"give up",id:"a2-sports-sentence-giveup-001"}
      ]}
  ]},

  "a2-invitations":{ label:"Invitations & Plans", level:"A2", keys:["invitation","plans","convite","planos","arrangements"], exercises:[
    {id:"a2-invitations-complete-001",type:"fill_blank",question:"Would you ___ to come to dinner on Friday?",correct:"like"},
    {id:"a2-invitations-complete-002",type:"fill_blank",question:"I'm sorry, I ___ — I have another commitment.",correct:"can't"},
    {id:"a2-invitations-complete-003",type:"fill_blank",question:"We ___ (meet) Carla at seven — it's arranged.",correct:"are meeting"},
    {id:"a2-invitations-complete-004",type:"fill_blank",question:"How ___ going to the cinema instead?",correct:"about"},
    {id:"a2-invitations-mc-005",type:"multiple_choice",question:"___ we meet at eight?",options:["Will","Shall","Do","Are"],correct:1},
    {id:"a2-invitations-mc-006",type:"multiple_choice",question:"I can't come. I ___ my sister that evening.",options:["see","will see","am seeing","have seen"],correct:2},
    {id:"a2-invitations-mc-007",type:"multiple_choice",question:"That ___ great, thanks!",options:["sounded","sound","is sounding","sounds"],correct:3},
    {id:"a2-invitations-unscramble-008",type:"unscramble",question:"like / coffee / a / you / would / ? /",correct:"Would you like a coffee?"},
    {id:"a2-invitations-unscramble-009",type:"unscramble",question:"can't / afraid / I / come / I'm",correct:"I'm afraid I can't come."},
    {id:"a2-invitations-fix-010",type:"fix",question:"Do you like to go to the beach on Sunday?",correct:"Would you like to go to the beach on Sunday?"},
    {id:"a2-invitations-fix-011",type:"fix",question:"I will meet my dentist tomorrow at four.",correct:"I am meeting my dentist tomorrow at four."},
    {id:"a2-invitations-transform-012",type:"transform",question:"Refuse politely with a reason: Come to my party on Saturday.",correct:"I'd love to, but I'm working on Saturday."},
    {id:"a2-invitations-question-013",type:"make_question",answer:"Let's say half past seven.",prompt:"Ask about the meeting time.",correct:"What time shall we meet?"},
    {id:"a2-invitations-question-014",type:"make_question",answer:"At the Italian place near the station.",prompt:"Ask about the meeting place.",correct:"Where shall we meet?"},
    {id:"a2-invitations-dialogue-015",type:"dialogue",
      title:"Are you free on Friday?",
      context:"An invitation by message.",
      wordBank:["doing","love","Shall","working","about","sounds"],
      lines:[
        {who:"A",text:"What are you ___ on Friday?"},
        {who:"B",text:"I'm ___ until six. Why?"},
        {who:"A",text:"There's a concert. Would you like to come?"},
        {who:"B",text:"I'd ___ to. What time does it start?"},
        {who:"A",text:"Nine. ___ we have dinner before?"},
        {who:"B",text:"That ___ great. How ___ the place near the park?"}
      ],
      answers:["doing","working","love","Shall","sounds","about"]},
    {id:"a2-invitations-sentence-016",type:"make_sentence",
      instruction:"Choose a verb and invite someone or talk about a plan.",
      verbs:[
        {v:"invite",  id:"a2-invitations-sentence-invite-001"},
        {v:"meet",    id:"a2-invitations-sentence-meet-001"},
        {v:"accept",  id:"a2-invitations-sentence-accept-001"},
        {v:"refuse",  id:"a2-invitations-sentence-refuse-001"},
        {v:"arrange", id:"a2-invitations-sentence-arrange-001"},
        {v:"cancel",  id:"a2-invitations-sentence-cancel-001"},
        {v:"suggest", id:"a2-invitations-sentence-suggest-001"},
        {v:"join",    id:"a2-invitations-sentence-join-001"}
      ]}
  ]},

  "a2-problems":{ label:"Problems & Solutions", level:"A2", keys:["problem","solution","help","problema","fix"], exercises:[
    {id:"a2-problems-complete-001",type:"fill_blank",question:"I've lost my keys. What ___ I do?",correct:"should"},
    {id:"a2-problems-complete-002",type:"fill_blank",question:"If you call them now, they ___ (help) you.",correct:"will help"},
    {id:"a2-problems-complete-003",type:"fill_blank",question:"Why don't you ___ the manager?",correct:"ask"},
    {id:"a2-problems-complete-004",type:"fill_blank",question:"The washing machine is broken, so we'll have to ___ it repaired.",correct:"get"},
    {id:"a2-problems-mc-005",type:"multiple_choice",question:"If it rains tomorrow, we ___ the picnic.",options:["will cancel","cancel","cancelled","would cancel"],correct:0},
    {id:"a2-problems-mc-006",type:"multiple_choice",question:"You ___ leave your bag there — someone might take it.",options:["should","shouldn't","must to","don't should"],correct:1},
    {id:"a2-problems-mc-007",type:"multiple_choice",question:"Let's try ___ a different route.",options:["take","to taking","taking","took"],correct:2},
    {id:"a2-problems-unscramble-008",type:"unscramble",question:"do / what / suggest / you / ? /",correct:"What do you suggest?"},
    {id:"a2-problems-unscramble-009",type:"unscramble",question:"time / if / we / miss / leave / we'll / now / the / don't / bus",correct:"If we don't leave now, we'll miss the bus."},
    {id:"a2-problems-fix-010",type:"fix",question:"If it will rain, we stay at home.",correct:"If it rains, we will stay at home."},
    {id:"a2-problems-fix-011",type:"fix",question:"You should to talk with your boss.",correct:"You should talk to your boss."},
    {id:"a2-problems-transform-012",type:"transform",question:"Give advice with 'should': My laptop is too slow for work.",correct:"You should buy a new one."},
    {id:"a2-problems-question-013",type:"make_question",answer:"Because the address on the form was wrong.",prompt:"Ask about the cause of the problem.",correct:"Why did the problem happen?"},
    {id:"a2-problems-question-014",type:"make_question",answer:"We can send it again tomorrow.",prompt:"Ask about the solution.",correct:"What can we do about it?"},
    {id:"a2-problems-dialogue-015",type:"dialogue",
      title:"The delivery never arrived",
      context:"Solving a problem by phone.",
      wordBank:["problem","should","If","try","sorry","send"],
      lines:[
        {who:"A",text:"There's a ___ with my order — it never arrived."},
        {who:"B",text:"I'm ___ about that. When did you order it?"},
        {who:"A",text:"Ten days ago. What ___ I do?"},
        {who:"B",text:"___ it doesn't arrive tomorrow, we'll ___ another one."},
        {who:"A",text:"And if that one is late too?"},
        {who:"B",text:"Then we ___ a different courier."}
      ],
      answers:["problem","sorry","should","If","send","try"]},
    {id:"a2-problems-sentence-016",type:"make_sentence",
      instruction:"Choose a verb and describe a problem or a solution.",
      verbs:[
        {v:"solve",   id:"a2-problems-sentence-solve-001"},
        {v:"explain", id:"a2-problems-sentence-explain-001"},
        {v:"fix",     id:"a2-problems-sentence-fix-001"},
        {v:"suggest", id:"a2-problems-sentence-suggest-001"},
        {v:"complain",id:"a2-problems-sentence-complain-001"},
        {v:"ask for", id:"a2-problems-sentence-askfor-001"},
        {v:"forget",  id:"a2-problems-sentence-forget-001"},
        {v:"apologise",id:"a2-problems-sentence-apologise-001"}
      ]}
  ]},

  "a2-directions":{ label:"Directions", level:"A2", keys:["directions","way","map","direcoes","street"], exercises:[
    {id:"a2-directions-complete-001",type:"fill_blank",question:"Go straight ___ for two blocks.",correct:"on"},
    {id:"a2-directions-complete-002",type:"fill_blank",question:"Turn ___ at the traffic lights.",correct:"left"},
    {id:"a2-directions-complete-003",type:"fill_blank",question:"Excuse me, could you tell me ___ to get to the station?",correct:"how"},
    {id:"a2-directions-complete-004",type:"fill_blank",question:"It's ___ the second and the third street.",correct:"between"},
    {id:"a2-directions-mc-005",type:"multiple_choice",question:"Take the ___ turning on the right.",options:["two","twice","secondly","second"],correct:3},
    {id:"a2-directions-mc-006",type:"multiple_choice",question:"You ___ cross the square — it's quicker.",options:["can","can to","are can","cans"],correct:0},
    {id:"a2-directions-mc-007",type:"multiple_choice",question:"The bank is ___ the pharmacy and the school.",options:["opposite","between","next","in front"],correct:1},
    {id:"a2-directions-unscramble-008",type:"unscramble",question:"is / far / how / it / ? /",correct:"How far is it?"},
    {id:"a2-directions-unscramble-009",type:"unscramble",question:"the / left / take / turn / and / first / street",correct:"Take the first street and turn left."},
    {id:"a2-directions-fix-010",type:"fix",question:"Turn on the left in the corner.",correct:"Turn left at the corner."},
    {id:"a2-directions-fix-011",type:"fix",question:"Can you say me where is the museum?",correct:"Can you tell me where the museum is?"},
    {id:"a2-directions-transform-012",type:"transform",question:"Make it an indirect question: Where is the bus stop?",correct:"Could you tell me where the bus stop is?"},
    {id:"a2-directions-question-013",type:"make_question",answer:"About ten minutes on foot.",prompt:"Ask about the distance in time.",correct:"How long does it take to walk there?"},
    {id:"a2-directions-question-014",type:"make_question",answer:"It's on Rua XV, next to the theatre.",prompt:"Ask about the location.",correct:"Where exactly is it?"},
    {id:"a2-directions-dialogue-015",type:"dialogue",
      title:"Lost in the centre",
      context:"Asking a stranger for directions.",
      wordBank:["tell","straight","far","past","left","miss"],
      lines:[
        {who:"A",text:"Excuse me, could you ___ me how to get to the market?"},
        {who:"B",text:"Of course. Go ___ on to the end of this street."},
        {who:"A",text:"And then?"},
        {who:"B",text:"Turn ___ and walk ___ the church."},
        {who:"A",text:"Is it ___?"},
        {who:"B",text:"Five minutes. You can't ___ it — it's very big."}
      ],
      answers:["tell","straight","left","past","far","miss"]},
    {id:"a2-directions-sentence-016",type:"make_sentence",
      instruction:"Choose a verb and give a direction in your city.",
      verbs:[
        {v:"turn",   id:"a2-directions-sentence-turn-001"},
        {v:"cross",  id:"a2-directions-sentence-cross-001"},
        {v:"go past",id:"a2-directions-sentence-gopast-001"},
        {v:"follow", id:"a2-directions-sentence-follow-001"},
        {v:"take",   id:"a2-directions-sentence-take-001"},
        {v:"stop",   id:"a2-directions-sentence-stop-001"},
        {v:"walk",   id:"a2-directions-sentence-walk-001"},
        {v:"find",   id:"a2-directions-sentence-find-001"}
      ]}
  ]},

  /* ---- A2 · Reading ---- */

  "a2-airport-reading":{ label:"↳ At the Airport · Reading", level:"A2", keys:["reading","airport"],
    groupId:"a2-airport-reading-group-001",
    passage:{ level:"A2", title:"Four Hours in Guarulhos",
      text:"Our flight to Lisbon was at eleven at night, so we arrived at the airport at eight. Check-in was quick, but at security they opened my bag because of a bottle of water I had forgotten. After that we waited at the gate. At half past ten the screen changed: the flight was delayed until two in the morning. Nobody explained why. Some passengers complained loudly, but the staff had no information either. In the end we took off at half past two and landed in Lisbon in the afternoon, tired but happy."},
    exercises:[
      {id:"a2-airport-reading-mc-001",type:"multiple_choice",question:"Why did security open the writer's bag?",
        options:["Because of a laptop","Because the bag was too big","Because of a bottle of water","Because of the passport"],correct:2},
      {id:"a2-airport-reading-mc-002",type:"multiple_choice",question:"How long was the delay?",
        options:["Half an hour","One day","Four hours","About three hours"],correct:3},
      {id:"a2-airport-reading-complete-003",type:"fill_blank",question:"The passengers ___ (complain) because nobody explained the delay.",correct:"complained"},
      {id:"a2-airport-reading-mc-004",type:"multiple_choice",question:"In the text, \"the staff had no information either\" means the staff...",
        options:["also did not know","knew the reason but said nothing","were not at the airport","gave the wrong gate"],correct:0},
      {id:"a2-airport-reading-complete-005",type:"fill_blank",question:"They finally ___ off at half past two.",correct:"took"},
      {id:"a2-airport-reading-mc-006",type:"multiple_choice",question:"How did the writer feel at the end?",
        options:["Angry with the airline","Tired but happy","Afraid of flying","Sorry about the trip"],correct:1}
    ]
  },

  "a2-technology-reading":{ label:"↳ Technology · Reading", level:"A2", keys:["reading","technology"],
    groupId:"a2-technology-reading-group-001",
    passage:{ level:"A2", title:"One Week Without a Phone",
      text:"Last month my phone broke and I couldn't repair it for a week. The first two days were terrible. I didn't know the time, I couldn't listen to music on the bus and I felt strange in queues, with nothing in my hands. But then something changed. I started reading again on the way to work. I talked to my neighbour for twenty minutes — we had never done that before. When I got the phone back, I kept the notifications off. I don't want to go back to how it was."},
    exercises:[
      {id:"a2-technology-reading-mc-001",type:"multiple_choice",question:"What is the text mainly about?",
        options:["How to repair a phone","The best apps for the bus","A week without a phone and what changed","Why phones are expensive"],correct:2},
      {id:"a2-technology-reading-complete-002",type:"fill_blank",question:"The first two days ___ (be) terrible.",correct:"were"},
      {id:"a2-technology-reading-mc-003",type:"multiple_choice",question:"What did the writer start doing again?",
        options:["Listening to music","Playing games","Taking photos","Reading"],correct:3},
      {id:"a2-technology-reading-mc-004",type:"multiple_choice",question:"In the text, \"we had never done that before\" refers to...",
        options:["talking to the neighbour","repairing a phone","taking the bus","reading on the way to work"],correct:0},
      {id:"a2-technology-reading-complete-005",type:"fill_blank",question:"After getting the phone back, the writer kept the notifications ___.",correct:"off"},
      {id:"a2-technology-reading-mc-006",type:"multiple_choice",question:"What does the writer think now?",
        options:["Phones are useless","She prefers the new way","The old habits were better","She wants a bigger phone"],correct:1}
    ]
  },

  "a2-childhood-reading":{ label:"↳ Childhood · Reading", level:"A2", keys:["reading","childhood"],
    groupId:"a2-childhood-reading-group-001",
    passage:{ level:"A2", title:"The House with the Blue Gate",
      text:"When I was a child, we lived in a small house with a blue gate. My mother used to work in the mornings, so my grandmother looked after us. She didn't speak much, but she taught me how to make bread. Every Friday we walked to the market together and she let me carry the smallest bag. I didn't like it then — I wanted to play football with the other children. Now I would give anything for one more Friday like that."},
    exercises:[
      {id:"a2-childhood-reading-mc-001",type:"multiple_choice",question:"Who looked after the children in the mornings?",
        options:["The mother","A neighbour","The grandmother","Nobody"],correct:2},
      {id:"a2-childhood-reading-complete-002",type:"fill_blank",question:"The grandmother ___ the writer how to make bread.",correct:"taught"},
      {id:"a2-childhood-reading-mc-003",type:"multiple_choice",question:"How did the writer feel about the market trips at the time?",
        options:["Excited","Proud","Frightened","Not very interested"],correct:3},
      {id:"a2-childhood-reading-complete-004",type:"fill_blank",question:"My mother ___ to work in the mornings.",correct:"used"},
      {id:"a2-childhood-reading-mc-005",type:"multiple_choice",question:"In the text, \"I would give anything for one more Friday\" shows that the writer...",
        options:["misses those days","hated the market","wants to sell the house","prefers football"],correct:0},
      {id:"a2-childhood-reading-mc-006",type:"multiple_choice",question:"Which sentence is TRUE?",
        options:["The grandmother talked a lot.","The writer carried the smallest bag.","The family lived in a big house.","They went to the market on Sundays."],correct:1}
    ]
  },

  "a2-problems-reading":{ label:"↳ Problems & Solutions · Reading", level:"A2", keys:["reading","problems"],
    groupId:"a2-problems-reading-group-001",
    passage:{ level:"A2", title:"The Wrong Address",
      text:"I ordered a birthday present for my sister three weeks before her party. The website said it would arrive in five days. After ten days nothing had arrived, so I wrote to the company. They answered quickly and told me the address was incomplete — the number of my flat was missing. It was my mistake, not theirs. They sent the parcel again the next morning and it arrived two days later, one day before the party. Now I always check the address twice before I pay."},
    exercises:[
      {id:"a2-problems-reading-mc-001",type:"multiple_choice",question:"What was the cause of the problem?",
        options:["The company forgot the order","The parcel was lost by the courier","The address was incomplete","The website was down"],correct:2},
      {id:"a2-problems-reading-complete-002",type:"fill_blank",question:"The writer wrote to the company ___ ten days.",correct:"after"},
      {id:"a2-problems-reading-mc-003",type:"multiple_choice",question:"When did the present arrive?",
        options:["After the party","On the day of the party","Three weeks later","One day before the party"],correct:3},
      {id:"a2-problems-reading-complete-004",type:"fill_blank",question:"They ___ (send) the parcel again the next morning.",correct:"sent"},
      {id:"a2-problems-reading-mc-005",type:"multiple_choice",question:"What did the writer learn?",
        options:["To check the address before paying","Never to buy online","To order one year before","To call instead of writing"],correct:0},
      {id:"a2-problems-reading-mc-006",type:"multiple_choice",question:"In the text, \"It was my mistake, not theirs\" means the writer...",
        options:["blames the company","takes responsibility","wants money back","did not order anything"],correct:1}
    ]
  },

  "a2-feelings-reading":{ label:"↳ Feelings · Reading", level:"A2", keys:["reading","feelings"],
    groupId:"a2-feelings-reading-group-001",
    passage:{ level:"A2", title:"The First Presentation",
      text:"My first presentation at work was six months ago. I prepared for two weeks and I still felt nervous. Ten minutes before, my hands were cold and I wanted to leave the room. Then a colleague said something simple: 'Nobody here wants you to fail.' I remembered that when I started speaking. The presentation wasn't perfect — I forgot two slides — but people asked good questions at the end. I was proud of myself, and a little surprised."},
    exercises:[
      {id:"a2-feelings-reading-mc-001",type:"multiple_choice",question:"How did the writer feel before the presentation?",
        options:["Bored","Angry","Nervous","Relaxed"],correct:2},
      {id:"a2-feelings-reading-complete-002",type:"fill_blank",question:"The writer ___ (prepare) for two weeks.",correct:"prepared"},
      {id:"a2-feelings-reading-mc-003",type:"multiple_choice",question:"What did the colleague do?",
        options:["Presented instead of her","Left the room","Corrected the slides","Said something encouraging"],correct:3},
      {id:"a2-feelings-reading-complete-004",type:"fill_blank",question:"She was ___ of herself at the end.",correct:"proud"},
      {id:"a2-feelings-reading-mc-005",type:"multiple_choice",question:"What went wrong during the presentation?",
        options:["She forgot two slides","The computer stopped","Nobody came","She arrived late"],correct:0},
      {id:"a2-feelings-reading-mc-006",type:"multiple_choice",question:"In the text, \"a little surprised\" suggests she...",
        options:["knew it would be perfect","expected to do worse","did not care","was disappointed"],correct:1}
    ]
  },

  /* ==================== B1 ==================== */

  "b1-work":{ label:"Work Life", level:"B1", keys:["work","office","job","carreira","meeting"], exercises:[
    {id:"b1-work-complete-001",type:"fill_blank",question:"I've been working here ___ almost four years.",correct:"for"},
    {id:"b1-work-complete-002",type:"fill_blank",question:"The report ___ (send) to the client yesterday afternoon.",correct:"was sent"},
    {id:"b1-work-complete-003",type:"fill_blank",question:"She said she ___ (finish) the presentation by Friday.",correct:"would finish"},
    {id:"b1-work-mc-004",type:"multiple_choice",question:"If I ___ more time, I'd redo the whole slide deck.",options:["have","would have","had","will have"],correct:2},
    {id:"b1-work-mc-005",type:"multiple_choice",question:"The colleague ___ desk is next to mine has just resigned.",options:["who","which","that","whose"],correct:3},
    {id:"b1-work-mc-006",type:"multiple_choice",question:"I'm not used to ___ in open offices.",options:["working","work","worked","to work"],correct:0},
    {id:"b1-work-unscramble-007",type:"unscramble",question:"deadline / the / moved / been / has / forward",correct:"The deadline has been moved forward."},
    {id:"b1-work-fix-008",type:"fix",question:"I work here since 2020.",correct:"I have worked here since 2020."},
    {id:"b1-work-fix-009",type:"fix",question:"My manager told me that I should to apply for the position.",correct:"My manager told me that I should apply for the position."},
    {id:"b1-work-transform-010",type:"transform",question:"Put into the passive: They cancelled the meeting at the last minute.",correct:"The meeting was cancelled at the last minute."},
    {id:"b1-work-transform-011",type:"transform",question:"Report the sentence: 'I'll call you tomorrow,' she said.",correct:"She said she would call me the next day."},
    {id:"b1-work-question-012",type:"make_question",answer:"Because the team grew from four to eleven people.",prompt:"Ask about the reason for the change.",correct:"Why did the work change?"},
    {id:"b1-work-dialogue-013",type:"dialogue",
      title:"A difficult conversation",
      context:"An employee asks the manager for a change in the workload.",
      wordBank:["been","would","if","managed","instead","raise"],
      lines:[
        {who:"A",text:"Do you have five minutes? I've ___ meaning to talk to you."},
        {who:"B",text:"Of course. Is it about the new project?"},
        {who:"A",text:"Partly. ___ I took it on, I'd have to drop something else."},
        {who:"B",text:"What ___ you prefer to drop?"},
        {who:"A",text:"The weekly report. Marina has ___ it before."},
        {who:"B",text:"That works. And we can ___ the topic of your role next month ___."}
      ],
      answers:["been","If","would","managed","raise","instead"]},
    {id:"b1-work-sentence-014",type:"make_sentence",
      instruction:"Choose a verb and say something real about your working life.",
      verbs:[
        {v:"manage",   id:"b1-work-sentence-manage-001"},
        {v:"deal with",id:"b1-work-sentence-dealwith-001"},
        {v:"apply for",id:"b1-work-sentence-applyfor-001"},
        {v:"resign",   id:"b1-work-sentence-resign-001"},
        {v:"delegate", id:"b1-work-sentence-delegate-001"},
        {v:"report",   id:"b1-work-sentence-report-001"},
        {v:"meet",     id:"b1-work-sentence-meet-001"},
        {v:"train",    id:"b1-work-sentence-train-001"}
      ]}
  ]},

  "b1-education":{ label:"Education", level:"B1", keys:["education","study","university","curso","learning"], exercises:[
    {id:"b1-education-complete-001",type:"fill_blank",question:"He failed the exam because he ___ (not/study) enough.",correct:"hadn't studied"},
    {id:"b1-education-complete-002",type:"fill_blank",question:"I'm seriously considering ___ (do) a postgraduate course.",correct:"doing"},
    {id:"b1-education-complete-003",type:"fill_blank",question:"English ___ (teach) in most schools from the age of six.",correct:"is taught"},
    {id:"b1-education-mc-004",type:"multiple_choice",question:"By the time the course finished, I ___ over forty books.",options:["read","had read","have read","was reading"],correct:1},
    {id:"b1-education-mc-005",type:"multiple_choice",question:"She's the teacher ___ changed the way I study.",options:["which","whose","who","what"],correct:2},
    {id:"b1-education-mc-006",type:"multiple_choice",question:"I regret ___ languages more seriously at school.",options:["not take","don't take","to not take","not taking"],correct:3},
    {id:"b1-education-unscramble-007",type:"unscramble",question:"worth / is / it / a / language / learning / second",correct:"It is worth learning a second language."},
    {id:"b1-education-fix-008",type:"fix",question:"I have finished the university in 2018.",correct:"I finished university in 2018."},
    {id:"b1-education-fix-009",type:"fix",question:"He suggested me to take an online course.",correct:"He suggested that I take an online course."},
    {id:"b1-education-transform-010",type:"transform",question:"Use the passive: Somebody teaches this subject online now.",correct:"This subject is taught online now."},
    {id:"b1-education-transform-011",type:"transform",question:"Second conditional: I don't have time, so I don't do a master's.",correct:"If I had time, I would do a master's."},
    {id:"b1-education-question-012",type:"make_question",answer:"Mostly because the timetable was impossible with my job.",prompt:"Ask about the reason for dropping out.",correct:"Why did you leave the course?"},
    {id:"b1-education-story-013",type:"story",
      title:"Going back to studying",
      context:"An adult student describes returning to a classroom after fifteen years.",
      wordBank:["had","realised","was","decided","found","been","kept","started"],
      text:"Fifteen years after leaving school, I ___ to go back and study. On the first day I ___ terrified: "+
           "everyone else ___ come straight from secondary school. But after two weeks I ___ that experience helped more than I expected. "+
           "I ___ it easier to organise my time, because I had ___ working since I was eighteen. "+
           "The hardest part was grammar — I ___ making the same mistakes. Then I ___ recording myself, and things changed.",
      answers:["decided","was","had","realised","found","been","kept","started"]},
    {id:"b1-education-sentence-014",type:"make_sentence",
      instruction:"Choose a verb and talk about your own education.",
      verbs:[
        {v:"graduate",  id:"b1-education-sentence-graduate-001"},
        {v:"drop out",  id:"b1-education-sentence-dropout-001"},
        {v:"revise",    id:"b1-education-sentence-revise-001"},
        {v:"take",      id:"b1-education-sentence-take-001"},
        {v:"struggle",  id:"b1-education-sentence-struggle-001"},
        {v:"improve",   id:"b1-education-sentence-improve-001"},
        {v:"specialise",id:"b1-education-sentence-specialise-001"},
        {v:"teach",     id:"b1-education-sentence-teach-001"}
      ]}
  ]},

  "b1-relationships":{ label:"Relationships", level:"B1", keys:["relationships","friends","couple","relacionamento"], exercises:[
    {id:"b1-relationships-complete-001",type:"fill_blank",question:"We've known each other ___ we were at school.",correct:"since"},
    {id:"b1-relationships-complete-002",type:"fill_blank",question:"They fell ___ love in their first year at university.",correct:"in"},
    {id:"b1-relationships-complete-003",type:"fill_blank",question:"He apologised ___ forgetting the date.",correct:"for"},
    {id:"b1-relationships-mc-004",type:"multiple_choice",question:"If she ___ me the truth, I wouldn't be so angry now.",options:["had told","told","tells","would tell"],correct:0},
    {id:"b1-relationships-mc-005",type:"multiple_choice",question:"That's the friend ___ helped me move house.",options:["what","who","which","whose"],correct:1},
    {id:"b1-relationships-mc-006",type:"multiple_choice",question:"They ___ arguing for twenty minutes when I arrived.",options:["were","have been","had been","are"],correct:2},
    {id:"b1-relationships-unscramble-007",type:"unscramble",question:"touch / we / lost / after / university / of / each / other",correct:"We lost touch with each other after university."},
    {id:"b1-relationships-fix-008",type:"fix",question:"I know him since ten years.",correct:"I have known him for ten years."},
    {id:"b1-relationships-fix-009",type:"fix",question:"She married with a colleague from work.",correct:"She married a colleague from work."},
    {id:"b1-relationships-transform-010",type:"transform",question:"Report it: 'I'm sorry I didn't call you,' he said.",correct:"He apologised for not calling me."},
    {id:"b1-relationships-transform-011",type:"transform",question:"Use a relative clause to join: I met a woman. She works with my sister.",correct:"I met a woman who works with my sister."},
    {id:"b1-relationships-question-012",type:"make_question",answer:"We met at a wedding, actually.",prompt:"Ask how the two people met.",correct:"How did you meet?"},
    {id:"b1-relationships-dialogue-013",type:"dialogue",
      title:"Clearing the air",
      context:"Two friends talk after a misunderstanding.",
      wordBank:["meant","had","should","understood","would","been"],
      lines:[
        {who:"A",text:"I think we've ___ avoiding each other for a week."},
        {who:"B",text:"Probably. I ___ have said something earlier."},
        {who:"A",text:"What did you think I ___?"},
        {who:"B",text:"That you ___ decided without asking me."},
        {who:"A",text:"If I ___ known you felt like that, I ___ have called you."},
        {who:"B",text:"I know. I misunderstood."}
      ],
      answers:["been","should","meant","had","had","would"]},
    {id:"b1-relationships-sentence-014",type:"make_sentence",
      instruction:"Choose a verb and say something about a relationship in your life.",
      verbs:[
        {v:"get on with",id:"b1-relationships-sentence-getonwith-001"},
        {v:"argue",      id:"b1-relationships-sentence-argue-001"},
        {v:"apologise",  id:"b1-relationships-sentence-apologise-001"},
        {v:"trust",      id:"b1-relationships-sentence-trust-001"},
        {v:"support",    id:"b1-relationships-sentence-support-001"},
        {v:"lose touch", id:"b1-relationships-sentence-losetouch-001"},
        {v:"forgive",    id:"b1-relationships-sentence-forgive-001"},
        {v:"introduce",  id:"b1-relationships-sentence-introduce-001"}
      ]}
  ]},

  "b1-money":{ label:"Money", level:"B1", keys:["money","budget","save","dinheiro","spend"], exercises:[
    {id:"b1-money-complete-001",type:"fill_blank",question:"I'm trying to cut ___ on takeaways this month.",correct:"down"},
    {id:"b1-money-complete-002",type:"fill_blank",question:"If I ___ (be) more organised, I would waste less.",correct:"were"},
    {id:"b1-money-complete-003",type:"fill_blank",question:"The rent ___ (pay) on the fifth of every month.",correct:"is paid"},
    {id:"b1-money-mc-004",type:"multiple_choice",question:"I can't afford ___ a car right now.",options:["buy","buying","bought","to buy"],correct:3},
    {id:"b1-money-mc-005",type:"multiple_choice",question:"By the end of the year we ___ the loan completely.",options:["will have paid off","will pay off","have paid off","pay off"],correct:0},
    {id:"b1-money-mc-006",type:"multiple_choice",question:"He spends money ___ if he had twice the salary.",options:["like","as though","as","so"],correct:1},
    {id:"b1-money-unscramble-007",type:"unscramble",question:"worth / it / the / isn't / price",correct:"It isn't worth the price."},
    {id:"b1-money-fix-008",type:"fix",question:"I don't have enough money for buy it.",correct:"I don't have enough money to buy it."},
    {id:"b1-money-fix-009",type:"fix",question:"He borrowed me fifty reais last week.",correct:"He lent me fifty reais last week."},
    {id:"b1-money-transform-010",type:"transform",question:"Second conditional: I don't earn much, so I don't travel often.",correct:"If I earned more, I would travel more often."},
    {id:"b1-money-transform-011",type:"transform",question:"Make it passive: The bank charged us a fee.",correct:"We were charged a fee by the bank."},
    {id:"b1-money-question-012",type:"make_question",answer:"About a third of what I earn, unfortunately.",prompt:"Ask about the proportion spent on rent.",correct:"How much of your income goes on rent?"},
    {id:"b1-money-dialogue-013",type:"dialogue",
      title:"Splitting the bill",
      context:"Three friends after dinner.",
      wordBank:["afford","split","owe","fair","would","paid"],
      lines:[
        {who:"A",text:"Shall we just ___ it three ways?"},
        {who:"B",text:"That's not really ___ — I only had a salad."},
        {who:"A",text:"True. So you ___ about thirty."},
        {who:"C",text:"I ___ for the drinks earlier, remember?"},
        {who:"A",text:"Right. Then I ___ say we're even."},
        {who:"B",text:"Good, because I can't ___ another round."}
      ],
      answers:["split","fair","owe","paid","would","afford"]},
    {id:"b1-money-sentence-014",type:"make_sentence",
      instruction:"Choose a verb and say something about how you handle money.",
      verbs:[
        {v:"save",     id:"b1-money-sentence-save-001"},
        {v:"spend",    id:"b1-money-sentence-spend-001"},
        {v:"lend",     id:"b1-money-sentence-lend-001"},
        {v:"borrow",   id:"b1-money-sentence-borrow-001"},
        {v:"afford",   id:"b1-money-sentence-afford-001"},
        {v:"invest",   id:"b1-money-sentence-invest-001"},
        {v:"waste",    id:"b1-money-sentence-waste-001"},
        {v:"negotiate",id:"b1-money-sentence-negotiate-001"}
      ]}
  ]},

  "b1-health":{ label:"Health & Lifestyle", level:"B1", keys:["health","lifestyle","habits","saude","sleep"], exercises:[
    {id:"b1-health-complete-001",type:"fill_blank",question:"I've been trying to cut ___ on sugar since January.",correct:"down"},
    {id:"b1-health-complete-002",type:"fill_blank",question:"You ___ (should/not) skip breakfast before a long day.",correct:"shouldn't"},
    {id:"b1-health-complete-003",type:"fill_blank",question:"Sleep ___ (consider) the most underrated habit.",correct:"is considered"},
    {id:"b1-health-mc-004",type:"multiple_choice",question:"If I went to bed earlier, I ___ better in the mornings.",options:["feel","will feel","would feel","felt"],correct:2},
    {id:"b1-health-mc-005",type:"multiple_choice",question:"I used ___ coffee after six, but I stopped.",options:["to drinking","drinking","drink","to drink"],correct:3},
    {id:"b1-health-mc-006",type:"multiple_choice",question:"He looks exhausted — he ___ been sleeping badly.",options:["must","must have","can","should"],correct:0},
    {id:"b1-health-unscramble-007",type:"unscramble",question:"habit / to / hardest / the / change / is / one / this",correct:"This is the hardest habit to change."},
    {id:"b1-health-fix-008",type:"fix",question:"I am doing exercise since three months.",correct:"I have been exercising for three months."},
    {id:"b1-health-fix-009",type:"fix",question:"Is very important to drink water.",correct:"It is very important to drink water."},
    {id:"b1-health-transform-010",type:"transform",question:"Use 'used to': I ate out every day in my twenties, but not now.",correct:"I used to eat out every day."},
    {id:"b1-health-transform-011",type:"transform",question:"Give advice with 'if I were you': I sit at a desk for ten hours a day.",correct:"If I were you, I would take short breaks."},
    {id:"b1-health-question-012",type:"make_question",answer:"Walking, mostly — I gave up the gym years ago.",prompt:"Ask about the kind of exercise.",correct:"What kind of exercise do you do?"},
    {id:"b1-health-dialogue-013",type:"dialogue",
      title:"Small changes",
      context:"Two colleagues talk about routines that stuck.",
      wordBank:["been","managed","would","gave","used","since"],
      lines:[
        {who:"A",text:"How long have you ___ walking to work?"},
        {who:"B",text:"___ March. It started as an experiment."},
        {who:"A",text:"And you've ___ to keep it up?"},
        {who:"B",text:"Most days. I ___ up the bus completely."},
        {who:"A",text:"I ___ to do that too, years ago."},
        {who:"B",text:"You ___ probably enjoy it again."}
      ],
      answers:["been","Since","managed","gave","used","would"]},
    {id:"b1-health-sentence-014",type:"make_sentence",
      instruction:"Choose a verb and talk about a habit you have or want to change.",
      verbs:[
        {v:"give up",  id:"b1-health-sentence-giveup-001"},
        {v:"cut down", id:"b1-health-sentence-cutdown-001"},
        {v:"keep up",  id:"b1-health-sentence-keepup-001"},
        {v:"avoid",    id:"b1-health-sentence-avoid-001"},
        {v:"manage",   id:"b1-health-sentence-manage-001"},
        {v:"rest",     id:"b1-health-sentence-rest-001"},
        {v:"exercise", id:"b1-health-sentence-exercise-001"},
        {v:"balance",  id:"b1-health-sentence-balance-001"}
      ]}
  ]},

  "b1-environment":{ label:"Environment", level:"B1", keys:["environment","climate","recycle","meio ambiente","waste"], exercises:[
    {id:"b1-environment-complete-001",type:"fill_blank",question:"Plastic bottles ___ (collect) once a week in my street.",correct:"are collected"},
    {id:"b1-environment-complete-002",type:"fill_blank",question:"If everyone recycled, we ___ (produce) far less waste.",correct:"would produce"},
    {id:"b1-environment-complete-003",type:"fill_blank",question:"We should cut ___ on single-use packaging.",correct:"down"},
    {id:"b1-environment-mc-004",type:"multiple_choice",question:"Something you can use again is ___.",options:["refusable","reusable","reused","usable again"],correct:1},
    {id:"b1-environment-mc-005",type:"multiple_choice",question:"The river ___ by the factory for years before anyone noticed.",options:["polluted","was polluting","had been polluted","has polluted"],correct:2},
    {id:"b1-environment-mc-006",type:"multiple_choice",question:"There's no point ___ about it if nothing changes.",options:["to complain","complain","complained","complaining"],correct:3},
    {id:"b1-environment-unscramble-007",type:"unscramble",question:"depends / everything / on / small / habits / daily",correct:"Everything depends on small daily habits."},
    {id:"b1-environment-fix-008",type:"fix",question:"The people should to separate the rubbish.",correct:"People should separate the rubbish."},
    {id:"b1-environment-fix-009",type:"fix",question:"Every year is produced more plastic.",correct:"Every year more plastic is produced."},
    {id:"b1-environment-transform-010",type:"transform",question:"Make it passive: Local councils collect the recycling on Tuesdays.",correct:"The recycling is collected on Tuesdays."},
    {id:"b1-environment-transform-011",type:"transform",question:"Second conditional: We don't have good public transport, so people drive.",correct:"If we had good public transport, fewer people would drive."},
    {id:"b1-environment-question-012",type:"make_question",answer:"Mainly food waste, I think.",prompt:"Ask what the biggest problem at home is.",correct:"What is the biggest problem at home?"},
    {id:"b1-environment-story-013",type:"story",
      title:"The bin that changed the flat",
      context:"A small experiment in one household.",
      wordBank:["decided","was","had","started","realised","became","threw","kept"],
      text:"Two years ago we ___ to weigh our rubbish for a month. The first week ___ embarrassing: eleven kilos. "+
           "Most of it ___ come from packaging and food we never ate. So we ___ buying vegetables loose "+
           "and cooking on Sundays. After three months we ___ that the bin was half empty. "+
           "It ___ a kind of game. We ___ a note on the fridge and ___ away far less.",
      answers:["decided","was","had","started","realised","became","kept","threw"]},
    {id:"b1-environment-sentence-014",type:"make_sentence",
      instruction:"Choose a verb and say something you do (or don't do) for the environment.",
      verbs:[
        {v:"recycle", id:"b1-environment-sentence-recycle-001"},
        {v:"reuse",   id:"b1-environment-sentence-reuse-001"},
        {v:"waste",   id:"b1-environment-sentence-waste-001"},
        {v:"pollute", id:"b1-environment-sentence-pollute-001"},
        {v:"save",    id:"b1-environment-sentence-save-001"},
        {v:"protect", id:"b1-environment-sentence-protect-001"},
        {v:"reduce",  id:"b1-environment-sentence-reduce-001"},
        {v:"replace", id:"b1-environment-sentence-replace-001"}
      ]}
  ]},

  "b1-news":{ label:"News", level:"B1", keys:["news","media","headline","noticias","report"], exercises:[
    {id:"b1-news-complete-001",type:"fill_blank",question:"The story ___ (report) by three different channels last night.",correct:"was reported"},
    {id:"b1-news-complete-002",type:"fill_blank",question:"They announced that the law ___ (change) in June.",correct:"would change"},
    {id:"b1-news-complete-003",type:"fill_blank",question:"I don't believe everything I read ___ the internet.",correct:"on"},
    {id:"b1-news-mc-004",type:"multiple_choice",question:"According ___ the article, prices will rise again.",options:["to","with","on","for"],correct:0},
    {id:"b1-news-mc-005",type:"multiple_choice",question:"The minister ___ have known about the report.",options:["must to","must","should to","can"],correct:1},
    {id:"b1-news-mc-006",type:"multiple_choice",question:"It's the kind of headline ___ makes you click without thinking.",options:["who","what","that","whose"],correct:2},
    {id:"b1-news-unscramble-007",type:"unscramble",question:"source / check / always / the / should / you",correct:"You should always check the source."},
    {id:"b1-news-fix-008",type:"fix",question:"The news are very worrying today.",correct:"The news is very worrying today."},
    {id:"b1-news-fix-009",type:"fix",question:"He said me that the article was false.",correct:"He told me that the article was false."},
    {id:"b1-news-transform-010",type:"transform",question:"Report it: 'The company has closed two factories,' the journalist said.",correct:"The journalist said the company had closed two factories."},
    {id:"b1-news-transform-011",type:"transform",question:"Make it passive: Millions of people watched the interview.",correct:"The interview was watched by millions of people."},
    {id:"b1-news-question-012",type:"make_question",answer:"Mostly on my phone, in the morning.",prompt:"Ask how and when the person follows the news.",correct:"How do you follow the news?"},
    {id:"b1-news-dialogue-013",type:"dialogue",
      title:"Did you see that?",
      context:"Two friends discuss a story going around online.",
      wordBank:["according","turned","was","source","must","shared"],
      lines:[
        {who:"A",text:"Everyone ___ that video yesterday."},
        {who:"B",text:"I saw it. ___ to whom, though?"},
        {who:"A",text:"That's the thing — there's no clear ___."},
        {who:"B",text:"It ___ out to be two years old."},
        {who:"A",text:"So it ___ have been reposted on purpose."},
        {who:"B",text:"Probably. It ___ shared eight thousand times before anyone checked."}
      ],
      answers:["shared","According","source","turned","must","was"]},
    {id:"b1-news-sentence-014",type:"make_sentence",
      instruction:"Choose a verb and say something about news and information.",
      verbs:[
        {v:"report",  id:"b1-news-sentence-report-001"},
        {v:"share",   id:"b1-news-sentence-share-001"},
        {v:"check",   id:"b1-news-sentence-check-001"},
        {v:"believe", id:"b1-news-sentence-believe-001"},
        {v:"announce",id:"b1-news-sentence-announce-001"},
        {v:"ignore",  id:"b1-news-sentence-ignore-001"},
        {v:"discuss", id:"b1-news-sentence-discuss-001"},
        {v:"follow",  id:"b1-news-sentence-follow-001"}
      ]}
  ]},

  "b1-entertainment":{ label:"Entertainment", level:"B1", keys:["entertainment","film","series","music","cinema"], exercises:[
    {id:"b1-entertainment-complete-001",type:"fill_blank",question:"The film ___ (direct) by a woman from Recife.",correct:"was directed"},
    {id:"b1-entertainment-complete-002",type:"fill_blank",question:"I'd rather ___ a series than go out tonight.",correct:"watch"},
    {id:"b1-entertainment-complete-003",type:"fill_blank",question:"It's the best concert I've ___ been to.",correct:"ever"},
    {id:"b1-entertainment-mc-004",type:"multiple_choice",question:"The ending was so predictable ___ I stopped watching.",options:["as","which","than","that"],correct:3},
    {id:"b1-entertainment-mc-005",type:"multiple_choice",question:"I can't stand ___ films with subtitles turned off.",options:["watching","to watch","watch","watched"],correct:0},
    {id:"b1-entertainment-mc-006",type:"multiple_choice",question:"That's the actor ___ voice you hear in the documentary.",options:["who","whose","which","that"],correct:1},
    {id:"b1-entertainment-unscramble-007",type:"unscramble",question:"worth / definitely / it's / watching",correct:"It's definitely worth watching."},
    {id:"b1-entertainment-fix-008",type:"fix",question:"I watched this film since two years.",correct:"I watched this film two years ago."},
    {id:"b1-entertainment-fix-009",type:"fix",question:"The book is more better than the film.",correct:"The book is much better than the film."},
    {id:"b1-entertainment-transform-010",type:"transform",question:"Make it passive: A Brazilian studio produced the series.",correct:"The series was produced by a Brazilian studio."},
    {id:"b1-entertainment-transform-011",type:"transform",question:"Use 'so ... that': The plot was very confusing. I gave up.",correct:"The plot was so confusing that I gave up."},
    {id:"b1-entertainment-question-012",type:"make_question",answer:"Because the characters felt real to me.",prompt:"Ask why the person recommends it.",correct:"Why do you recommend it?"},
    {id:"b1-entertainment-dialogue-013",type:"dialogue",
      title:"Worth watching?",
      context:"Deciding what to watch on a Friday night.",
      wordBank:["heard","rather","worth","seen","ending","stand"],
      lines:[
        {who:"A",text:"Have you ___ the new Brazilian series?"},
        {who:"B",text:"No, but I've ___ good things about it."},
        {who:"A",text:"Is it ___ three hours of my life?"},
        {who:"B",text:"The ___ divides people, apparently."},
        {who:"A",text:"I can't ___ open endings."},
        {who:"B",text:"Then I'd ___ pick something else."}
      ],
      answers:["seen","heard","worth","ending","stand","rather"]},
    {id:"b1-entertainment-sentence-014",type:"make_sentence",
      instruction:"Choose a verb and talk about something you watched, read or listened to.",
      verbs:[
        {v:"recommend",id:"b1-entertainment-sentence-recommend-001"},
        {v:"watch",    id:"b1-entertainment-sentence-watch-001"},
        {v:"enjoy",    id:"b1-entertainment-sentence-enjoy-001"},
        {v:"give up",  id:"b1-entertainment-sentence-giveup-001"},
        {v:"prefer",   id:"b1-entertainment-sentence-prefer-001"},
        {v:"review",   id:"b1-entertainment-sentence-review-001"},
        {v:"discover", id:"b1-entertainment-sentence-discover-001"},
        {v:"binge",    id:"b1-entertainment-sentence-binge-001"}
      ]}
  ]},

  "b1-culture":{ label:"Cultural Differences", level:"B1", keys:["culture","customs","abroad","cultura","habits"], exercises:[
    {id:"b1-culture-complete-001",type:"fill_blank",question:"In Brazil people tend ___ arrive a little late to a party.",correct:"to"},
    {id:"b1-culture-complete-002",type:"fill_blank",question:"It's considered rude ___ start eating before everyone is served.",correct:"to"},
    {id:"b1-culture-complete-003",type:"fill_blank",question:"When I moved abroad, I had to get used ___ eating dinner at six.",correct:"to"},
    {id:"b1-culture-mc-004",type:"multiple_choice",question:"You ___ take your shoes off — it depends on the house.",options:["must","mustn't","don't have to","should to"],correct:2},
    {id:"b1-culture-mc-005",type:"multiple_choice",question:"In some countries tipping ___ as an insult.",options:["sees","has seen","is seeing","is seen"],correct:3},
    {id:"b1-culture-mc-006",type:"multiple_choice",question:"I'm still not used ___ small talk about the weather.",options:["to making","making","to make","make"],correct:0},
    {id:"b1-culture-unscramble-007",type:"unscramble",question:"differences / the / surprised / most / what / me / were / small",correct:"What surprised me most were the small differences."},
    {id:"b1-culture-fix-008",type:"fix",question:"I'm not used to eat so early.",correct:"I'm not used to eating so early."},
    {id:"b1-culture-fix-009",type:"fix",question:"In my country the people greet with two kisses.",correct:"In my country people greet each other with two kisses."},
    {id:"b1-culture-transform-010",type:"transform",question:"Use 'it is considered': People think it is impolite to be late there.",correct:"It is considered impolite to be late there."},
    {id:"b1-culture-transform-011",type:"transform",question:"Use 'have to' / 'don't have to': A tip is optional in this country.",correct:"You don't have to leave a tip in this country."},
    {id:"b1-culture-question-012",type:"make_question",answer:"The silence on public transport, definitely.",prompt:"Ask what surprised the person most abroad.",correct:"What surprised you most there?"},
    {id:"b1-culture-dialogue-013",type:"dialogue",
      title:"The first month abroad",
      context:"Someone describes adapting to a new country.",
      wordBank:["used","supposed","rude","took","expected","would"],
      lines:[
        {who:"A",text:"What ___ you the longest to get used to?"},
        {who:"B",text:"Dinner at six. I wasn't ___ to that at all."},
        {who:"A",text:"Did anyone tell you what you were ___ to do?"},
        {who:"B",text:"Not really. I ___ people to explain, but they didn't."},
        {who:"A",text:"Did you ever do something ___ by accident?"},
        {who:"B",text:"Constantly. Nobody ___ say anything, though."}
      ],
      answers:["took","used","supposed","expected","rude","would"]},
    {id:"b1-culture-sentence-014",type:"make_sentence",
      instruction:"Choose a verb and compare a habit in two cultures.",
      verbs:[
        {v:"greet",    id:"b1-culture-sentence-greet-001"},
        {v:"expect",   id:"b1-culture-sentence-expect-001"},
        {v:"adapt",    id:"b1-culture-sentence-adapt-001"},
        {v:"avoid",    id:"b1-culture-sentence-avoid-001"},
        {v:"celebrate",id:"b1-culture-sentence-celebrate-001"},
        {v:"offend",   id:"b1-culture-sentence-offend-001"},
        {v:"compare",  id:"b1-culture-sentence-compare-001"},
        {v:"assume",   id:"b1-culture-sentence-assume-001"}
      ]}
  ]},

  "b1-experiences":{ label:"Experiences", level:"B1", keys:["experiences","ever","never","experiencias","first time"], exercises:[
    {id:"b1-experiences-complete-001",type:"fill_blank",question:"It was the first time I ___ (travel) alone.",correct:"had travelled"},
    {id:"b1-experiences-complete-002",type:"fill_blank",question:"I've never ___ anything like it before.",correct:"seen"},
    {id:"b1-experiences-complete-003",type:"fill_blank",question:"We had already left ___ the storm started.",correct:"when"},
    {id:"b1-experiences-mc-004",type:"multiple_choice",question:"Have you ___ tried surfing?",options:["yet","ever","already","still"],correct:1},
    {id:"b1-experiences-mc-005",type:"multiple_choice",question:"I ___ never been so nervous in my life.",options:["was","had","have","did"],correct:2},
    {id:"b1-experiences-mc-006",type:"multiple_choice",question:"When we arrived, the concert ___ already started.",options:["has","did","was","had"],correct:3},
    {id:"b1-experiences-unscramble-007",type:"unscramble",question:"experience / been / it / had / an / I'd / never",correct:"It had been an experience I'd never had."},
    {id:"b1-experiences-fix-008",type:"fix",question:"I have never ate sushi before I moved here.",correct:"I had never eaten sushi before I moved here."},
    {id:"b1-experiences-fix-009",type:"fix",question:"Did you ever go to Japan in your life?",correct:"Have you ever been to Japan?"},
    {id:"b1-experiences-transform-010",type:"transform",question:"Use the past perfect: I finished the report. Then the client called.",correct:"I had finished the report when the client called."},
    {id:"b1-experiences-transform-011",type:"transform",question:"Use the present perfect: This is my first time on a plane.",correct:"I have never flown before."},
    {id:"b1-experiences-question-012",type:"make_question",answer:"Skydiving, three years ago.",prompt:"Ask about the most frightening thing the person has done.",correct:"What is the most frightening thing you have ever done?"},
    {id:"b1-experiences-story-013",type:"story",
      title:"The night the lights went out",
      context:"An experience nobody in the group forgot.",
      wordBank:["found","had","had","realised","started","was","went","were"],
      text:"We ___ been walking for six hours when the sun ___ down. Nobody ___ brought a torch. "+
           "At first it ___ funny — we ___ singing to keep going. Then one of us ___ we had left the path. "+
           "For twenty minutes we ___ completely silent. In the end we ___ a farm and the owner drove us back.",
      answers:["had","went","had","was","started","realised","were","found"]},
    {id:"b1-experiences-sentence-014",type:"make_sentence",
      instruction:"Choose a verb and describe a real experience.",
      verbs:[
        {v:"try",     id:"b1-experiences-sentence-try-001"},
        {v:"survive", id:"b1-experiences-sentence-survive-001"},
        {v:"realise", id:"b1-experiences-sentence-realise-001"},
        {v:"regret",  id:"b1-experiences-sentence-regret-001"},
        {v:"manage",  id:"b1-experiences-sentence-manage-001"},
        {v:"discover",id:"b1-experiences-sentence-discover-001"},
        {v:"get lost", id:"b1-experiences-sentence-getlost-001"},
        {v:"learn",   id:"b1-experiences-sentence-learn-001"}
      ]}
  ]},

  "b1-goals":{ label:"Goals", level:"B1", keys:["goals","plans","future","metas","objetivos"], exercises:[
    {id:"b1-goals-complete-001",type:"fill_blank",question:"By this time next year I ___ (finish) the course.",correct:"will have finished"},
    {id:"b1-goals-complete-002",type:"fill_blank",question:"I'm hoping ___ move abroad within two years.",correct:"to"},
    {id:"b1-goals-complete-003",type:"fill_blank",question:"I keep putting ___ the decision.",correct:"off"},
    {id:"b1-goals-mc-004",type:"multiple_choice",question:"I'd like ___ fluent enough to work in English.",options:["to become","becoming","become","became"],correct:0},
    {id:"b1-goals-mc-005",type:"multiple_choice",question:"If I don't set a deadline, I ___ never start.",options:["would","will","was","had"],correct:1},
    {id:"b1-goals-mc-006",type:"multiple_choice",question:"I'm looking forward ___ the first real conversation.",options:["to have","have","to having","having"],correct:2},
    {id:"b1-goals-unscramble-007",type:"unscramble",question:"realistic / a / setting / goal / is / step / first / the",correct:"Setting a realistic goal is the first step."},
    {id:"b1-goals-fix-008",type:"fix",question:"I pretend to finish the course next year.",correct:"I intend to finish the course next year."},
    {id:"b1-goals-fix-009",type:"fix",question:"I'm looking forward to meet you.",correct:"I'm looking forward to meeting you."},
    {id:"b1-goals-transform-010",type:"transform",question:"Use the future perfect: I will finish the report before Friday.",correct:"I will have finished the report by Friday."},
    {id:"b1-goals-transform-011",type:"transform",question:"Use 'plan to': My intention is to change jobs in June.",correct:"I plan to change jobs in June."},
    {id:"b1-goals-question-012",type:"make_question",answer:"To hold a thirty-minute meeting in English without freezing.",prompt:"Ask about the main goal.",correct:"What is your main goal?"},
    {id:"b1-goals-dialogue-013",type:"dialogue",
      title:"One year from now",
      context:"A student and teacher set a target together.",
      wordBank:["forward","have","realistic","aiming","by","keep"],
      lines:[
        {who:"A",text:"What are you ___ for this year?"},
        {who:"B",text:"To speak without translating in my head."},
        {who:"A",text:"Is that ___ in twelve months?"},
        {who:"B",text:"Maybe not completely. But ___ December I'd like to manage meetings."},
        {who:"A",text:"Then we'll ___ a plan and ___ track of it every month."},
        {who:"B",text:"I'm looking ___ to that."}
      ],
      answers:["aiming","realistic","by","have","keep","forward"]},
    {id:"b1-goals-sentence-014",type:"make_sentence",
      instruction:"Choose a verb and talk about a goal of yours.",
      verbs:[
        {v:"plan",     id:"b1-goals-sentence-plan-001"},
        {v:"aim",      id:"b1-goals-sentence-aim-001"},
        {v:"achieve",  id:"b1-goals-sentence-achieve-001"},
        {v:"postpone", id:"b1-goals-sentence-postpone-001"},
        {v:"commit",   id:"b1-goals-sentence-commit-001"},
        {v:"give up",  id:"b1-goals-sentence-giveup-001"},
        {v:"track",    id:"b1-goals-sentence-track-001"},
        {v:"start",    id:"b1-goals-sentence-start-001"}
      ]}
  ]},

  "b1-decisions":{ label:"Decisions", level:"B1", keys:["decisions","choose","escolha","decidir","options"], exercises:[
    {id:"b1-decisions-complete-001",type:"fill_blank",question:"In the end I decided ___ take the job.",correct:"to"},
    {id:"b1-decisions-complete-002",type:"fill_blank",question:"If I hadn't moved, I ___ (never/meet) her.",correct:"would never have met"},
    {id:"b1-decisions-complete-003",type:"fill_blank",question:"It took me a month to make ___ my mind.",correct:"up"},
    {id:"b1-decisions-mc-004",type:"multiple_choice",question:"I wish I ___ asked more questions at the interview.",options:["have","did","would","had"],correct:3},
    {id:"b1-decisions-mc-005",type:"multiple_choice",question:"He ended up ___ the offer.",options:["accepting","to accept","accept","accepted"],correct:0},
    {id:"b1-decisions-mc-006",type:"multiple_choice",question:"I'd rather you ___ me before deciding.",options:["ask","asked","will ask","would ask"],correct:1},
    {id:"b1-decisions-unscramble-007",type:"unscramble",question:"between / had / two / choose / to / I / bad / options",correct:"I had to choose between two bad options."},
    {id:"b1-decisions-fix-008",type:"fix",question:"I decided of change my career.",correct:"I decided to change my career."},
    {id:"b1-decisions-fix-009",type:"fix",question:"If I would know, I wouldn't have accepted.",correct:"If I had known, I wouldn't have accepted."},
    {id:"b1-decisions-transform-010",type:"transform",question:"Third conditional: I didn't read the contract, so I lost money.",correct:"If I had read the contract, I wouldn't have lost money."},
    {id:"b1-decisions-transform-011",type:"transform",question:"Use 'wish': I regret not studying abroad.",correct:"I wish I had studied abroad."},
    {id:"b1-decisions-question-012",type:"make_question",answer:"The salary, honestly — everything else was similar.",prompt:"Ask what decided it.",correct:"What made you decide?"},
    {id:"b1-decisions-dialogue-013",type:"dialogue",
      title:"Two offers",
      context:"Weighing up a difficult choice.",
      wordBank:["up","wish","would","If","back","end"],
      lines:[
        {who:"A",text:"Have you made ___ your mind yet?"},
        {who:"B",text:"Almost. I ___ I had more time."},
        {who:"B",text:"What ___ you do in my place?"},
        {who:"A",text:"___ I were you, I'd take the smaller company."},
        {who:"B",text:"That's what I keep coming ___ to."},
        {who:"A",text:"Then in the ___ you've already decided."}
      ],
      answers:["up","wish","would","If","back","end"]},
    {id:"b1-decisions-sentence-014",type:"make_sentence",
      instruction:"Choose a verb and talk about a decision you made.",
      verbs:[
        {v:"decide",   id:"b1-decisions-sentence-decide-001"},
        {v:"choose",   id:"b1-decisions-sentence-choose-001"},
        {v:"hesitate", id:"b1-decisions-sentence-hesitate-001"},
        {v:"regret",   id:"b1-decisions-sentence-regret-001"},
        {v:"refuse",   id:"b1-decisions-sentence-refuse-001"},
        {v:"accept",   id:"b1-decisions-sentence-accept-001"},
        {v:"consider", id:"b1-decisions-sentence-consider-001"},
        {v:"change",   id:"b1-decisions-sentence-change-001"}
      ]}
  ]},

  "b1-complaints":{ label:"Complaints", level:"B1", keys:["complaint","refund","reclamacao","problem","return"], exercises:[
    {id:"b1-complaints-complete-001",type:"fill_blank",question:"I'd like to complain ___ the service I received.",correct:"about"},
    {id:"b1-complaints-complete-002",type:"fill_blank",question:"The order ___ (deliver) to the wrong address twice.",correct:"was delivered"},
    {id:"b1-complaints-complete-003",type:"fill_blank",question:"I'm afraid this isn't ___ I ordered.",correct:"what"},
    {id:"b1-complaints-mc-004",type:"multiple_choice",question:"I'd appreciate ___ if you could look into it today.",options:["that","this","it","which"],correct:2},
    {id:"b1-complaints-mc-005",type:"multiple_choice",question:"Nobody ___ me about the delay.",options:["informed to","was informed","has informed to","informed"],correct:3},
    {id:"b1-complaints-mc-006",type:"multiple_choice",question:"This is the third time this ___ this month.",options:["has happened","happens","happened","is happening"],correct:0},
    {id:"b1-complaints-unscramble-007",type:"unscramble",question:"refund / full / would / a / like / I",correct:"I would like a full refund."},
    {id:"b1-complaints-fix-008",type:"fix",question:"I want that you solve this today.",correct:"I would like you to solve this today."},
    {id:"b1-complaints-fix-009",type:"fix",question:"I'm complaining for the noise.",correct:"I'm complaining about the noise."},
    {id:"b1-complaints-transform-010",type:"transform",question:"Make it more formal: You sent me the wrong size.",correct:"I'm afraid the wrong size was sent."},
    {id:"b1-complaints-transform-011",type:"transform",question:"Soften the complaint: This is unacceptable.",correct:"I'm afraid this isn't really acceptable."},
    {id:"b1-complaints-question-012",type:"make_question",answer:"Twice, and both times nobody replied.",prompt:"Ask how many times the person has contacted them.",correct:"How many times have you contacted them?"},
    {id:"b1-complaints-dialogue-013",type:"dialogue",
      title:"The wrong order, again",
      context:"A customer calls a shop for the second time.",
      wordBank:["afraid","happened","appreciate","supposed","assure","refund"],
      lines:[
        {who:"A",text:"I'm ___ there's a problem with my order."},
        {who:"B",text:"I'm sorry. What exactly ___?"},
        {who:"A",text:"It was ___ to arrive on Tuesday and it's still not here."},
        {who:"B",text:"I can ___ you it left our warehouse."},
        {who:"A",text:"I'd ___ it if you could check today."},
        {who:"B",text:"Of course. If it's lost, we'll issue a full ___."}
      ],
      answers:["afraid","happened","supposed","assure","appreciate","refund"]},
    {id:"b1-complaints-sentence-014",type:"make_sentence",
      instruction:"Choose a verb and make a polite complaint.",
      verbs:[
        {v:"complain", id:"b1-complaints-sentence-complain-001"},
        {v:"return",   id:"b1-complaints-sentence-return-001"},
        {v:"refund",   id:"b1-complaints-sentence-refund-001"},
        {v:"replace",  id:"b1-complaints-sentence-replace-001"},
        {v:"apologise",id:"b1-complaints-sentence-apologise-001"},
        {v:"promise",  id:"b1-complaints-sentence-promise-001"},
        {v:"insist",   id:"b1-complaints-sentence-insist-001"},
        {v:"cancel",   id:"b1-complaints-sentence-cancel-001"}
      ]}
  ]},

  "b1-service":{ label:"Customer Service", level:"B1", keys:["customer service","support","atendimento","client"], exercises:[
    {id:"b1-service-complete-001",type:"fill_blank",question:"Could you hold ___ a moment while I check?",correct:"on"},
    {id:"b1-service-complete-002",type:"fill_blank",question:"Your request ___ (process) within 48 hours.",correct:"will be processed"},
    {id:"b1-service-complete-003",type:"fill_blank",question:"I'll put you ___ to my colleague.",correct:"through"},
    {id:"b1-service-mc-004",type:"multiple_choice",question:"Would you mind ___ me your order number?",options:["give","giving","to give","gave"],correct:1},
    {id:"b1-service-mc-005",type:"multiple_choice",question:"Let me ___ what I can do for you.",options:["to see","seeing","see","seen"],correct:2},
    {id:"b1-service-mc-006",type:"multiple_choice",question:"I'm sorry, but the system ___ down since this morning.",options:["is","was","had been","has been"],correct:3},
    {id:"b1-service-unscramble-007",type:"unscramble",question:"help / how / you / today / I / can / ? /",correct:"How can I help you today?"},
    {id:"b1-service-fix-008",type:"fix",question:"Wait a moment, please, I verify.",correct:"One moment, please — let me check."},
    {id:"b1-service-fix-009",type:"fix",question:"Would you mind to wait five minutes?",correct:"Would you mind waiting five minutes?"},
    {id:"b1-service-transform-010",type:"transform",question:"Make it polite: Tell me your email.",correct:"Could you give me your email, please?"},
    {id:"b1-service-transform-011",type:"transform",question:"Use the passive: We will send you a confirmation.",correct:"A confirmation will be sent to you."},
    {id:"b1-service-question-012",type:"make_question",answer:"It's usually two to three working days.",prompt:"Ask about the processing time.",correct:"How long does it take?"},
    {id:"b1-service-dialogue-013",type:"dialogue",
      title:"Calling support",
      context:"A support agent handles a request.",
      wordBank:["help","mind","through","check","confirm","sorted"],
      lines:[
        {who:"A",text:"Good morning, how can I ___ you?"},
        {who:"B",text:"My account is blocked."},
        {who:"A",text:"Would you ___ confirming your full name?"},
        {who:"B",text:"Of course. Can you ___ what happened?"},
        {who:"A",text:"Let me ___ the details. I'll put you ___ to security."},
        {who:"B",text:"Thanks. I hope it gets ___ today."}
      ],
      answers:["help","mind","confirm","check","through","sorted"]},
    {id:"b1-service-sentence-014",type:"make_sentence",
      instruction:"Choose a verb and say something an agent or a customer would say.",
      verbs:[
        {v:"assist",  id:"b1-service-sentence-assist-001"},
        {v:"confirm", id:"b1-service-sentence-confirm-001"},
        {v:"transfer",id:"b1-service-sentence-transfer-001"},
        {v:"resolve", id:"b1-service-sentence-resolve-001"},
        {v:"follow up",id:"b1-service-sentence-followup-001"},
        {v:"escalate",id:"b1-service-sentence-escalate-001"},
        {v:"explain", id:"b1-service-sentence-explain-001"},
        {v:"reassure",id:"b1-service-sentence-reassure-001"}
      ]}
  ]},

  "b1-advice":{ label:"Giving Advice", level:"B1", keys:["advice","suggest","conselho","recommend","tips"], exercises:[
    {id:"b1-advice-complete-001",type:"fill_blank",question:"If I ___ you, I'd talk to her directly.",correct:"were"},
    {id:"b1-advice-complete-002",type:"fill_blank",question:"You'd ___ leave now if you want to catch the train.",correct:"better"},
    {id:"b1-advice-complete-003",type:"fill_blank",question:"Why don't you ___ (try) a shorter version first?",correct:"try"},
    {id:"b1-advice-mc-004",type:"multiple_choice",question:"I suggest ___ the whole thing in writing.",options:["putting","to put","put","you to put"],correct:0},
    {id:"b1-advice-mc-005",type:"multiple_choice",question:"You ___ have told me earlier.",options:["should to","should","would","must"],correct:1},
    {id:"b1-advice-mc-006",type:"multiple_choice",question:"It might be worth ___ a second opinion.",options:["get","to get","getting","got"],correct:2},
    {id:"b1-advice-unscramble-007",type:"unscramble",question:"you / I / were / if / wait / I'd",correct:"If I were you, I'd wait."},
    {id:"b1-advice-fix-008",type:"fix",question:"I advise you to not accept it.",correct:"I advise you not to accept it."},
    {id:"b1-advice-fix-009",type:"fix",question:"You had better to speak with him.",correct:"You had better speak with him."},
    {id:"b1-advice-transform-010",type:"transform",question:"Give advice with 'should': He never checks his emails.",correct:"He should check his emails more often."},
    {id:"b1-advice-transform-011",type:"transform",question:"Use 'if I were you': Don't sign that contract yet.",correct:"If I were you, I wouldn't sign that contract yet."},
    {id:"b1-advice-question-012",type:"make_question",answer:"Ask for it in writing first.",prompt:"Ask for advice about a situation.",correct:"What would you do in my situation?"},
    {id:"b1-advice-dialogue-013",type:"dialogue",
      title:"What would you do?",
      context:"A friend asks for advice about a job offer.",
      wordBank:["were","worth","should","better","suggest","try"],
      lines:[
        {who:"A",text:"What ___ I do? They want an answer by Friday."},
        {who:"B",text:"If I ___ you, I'd ask for another week."},
        {who:"A",text:"Do you think that's possible?"},
        {who:"B",text:"It's ___ asking. I ___ sending a short email."},
        {who:"A",text:"And if they say no?"},
        {who:"B",text:"Then you'd ___ decide fast. But ___ first."}
      ],
      answers:["should","were","worth","suggest","better","try"]},
    {id:"b1-advice-sentence-014",type:"make_sentence",
      instruction:"Choose a verb and give someone real advice.",
      verbs:[
        {v:"advise",   id:"b1-advice-sentence-advise-001"},
        {v:"suggest",  id:"b1-advice-sentence-suggest-001"},
        {v:"recommend",id:"b1-advice-sentence-recommend-001"},
        {v:"warn",     id:"b1-advice-sentence-warn-001"},
        {v:"encourage",id:"b1-advice-sentence-encourage-001"},
        {v:"remind",   id:"b1-advice-sentence-remind-001"},
        {v:"consider", id:"b1-advice-sentence-consider-001"},
        {v:"avoid",    id:"b1-advice-sentence-avoid-001"}
      ]}
  ]},

  "b1-opinions":{ label:"Opinions & Arguments", level:"B1", keys:["opinion","argument","agree","opiniao","debate"], exercises:[
    {id:"b1-opinions-complete-001",type:"fill_blank",question:"___ my opinion, the rule makes no sense.",correct:"In"},
    {id:"b1-opinions-complete-002",type:"fill_blank",question:"I don't agree ___ that at all.",correct:"with"},
    {id:"b1-opinions-complete-003",type:"fill_blank",question:"That's a fair point, ___ I still disagree.",correct:"but"},
    {id:"b1-opinions-mc-004",type:"multiple_choice",question:"___ speaking, people prefer shorter meetings.",options:["General","As general","In general way","Generally"],correct:3},
    {id:"b1-opinions-mc-005",type:"multiple_choice",question:"I see your point, ___ I'm not convinced.",options:["although","so","because","however"],correct:0},
    {id:"b1-opinions-mc-006",type:"multiple_choice",question:"It's often argued ___ homework has little effect.",options:["what","that","which","whether"],correct:1},
    {id:"b1-opinions-unscramble-007",type:"unscramble",question:"depends / think / it / I / situation / on / the",correct:"I think it depends on the situation."},
    {id:"b1-opinions-fix-008",type:"fix",question:"I am agree with your first argument.",correct:"I agree with your first argument."},
    {id:"b1-opinions-fix-009",type:"fix",question:"In my point of view this is wrong.",correct:"In my view this is wrong."},
    {id:"b1-opinions-transform-010",type:"transform",question:"Disagree politely: Working from home makes people lazy.",correct:"I see what you mean, but I don't think that's always true."},
    {id:"b1-opinions-transform-011",type:"transform",question:"Use the passive: People often say that reading improves writing.",correct:"It is often said that reading improves writing."},
    {id:"b1-opinions-question-012",type:"make_question",answer:"Because the data only covers one city.",prompt:"Ask for the reason behind the disagreement.",correct:"Why don't you agree?"},
    {id:"b1-opinions-dialogue-013",type:"dialogue",
      title:"Not quite convinced",
      context:"A polite disagreement between colleagues.",
      wordBank:["point","depends","view","although","evidence","true"],
      lines:[
        {who:"A",text:"In my ___, we should stop the Friday meeting."},
        {who:"B",text:"I take your ___, but some people rely on it."},
        {who:"A",text:"Is that ___ for the whole team?"},
        {who:"B",text:"It ___ on the project, honestly."},
        {who:"A",text:"So we have no real ___ either way."},
        {who:"B",text:"Exactly — ___ I'd still try one month without it."}
      ],
      answers:["view","point","true","depends","evidence","although"]},
    {id:"b1-opinions-sentence-014",type:"make_sentence",
      instruction:"Choose a verb and express an opinion about something real.",
      verbs:[
        {v:"argue",    id:"b1-opinions-sentence-argue-001"},
        {v:"agree",    id:"b1-opinions-sentence-agree-001"},
        {v:"disagree", id:"b1-opinions-sentence-disagree-001"},
        {v:"admit",    id:"b1-opinions-sentence-admit-001"},
        {v:"point out",id:"b1-opinions-sentence-pointout-001"},
        {v:"doubt",    id:"b1-opinions-sentence-doubt-001"},
        {v:"support",  id:"b1-opinions-sentence-support-001"},
        {v:"question", id:"b1-opinions-sentence-question-001"}
      ]}
  ]},

  /* ---- B1 · Reading ---- */

  "b1-work-reading":{ label:"↳ Work Life · Reading", level:"B1", keys:["reading","work"],
    groupId:"b1-work-reading-group-001",
    passage:{ level:"B1", title:"The Four-Day Week Experiment",
      text:"Three years ago a small design studio in Porto decided to test a four-day week. Salaries stayed the same and the team agreed to protect Fridays completely: no meetings, no emails, no exceptions. The first two months were difficult. Projects that used to take five days had to be reorganised, and two clients complained about slower replies. Then something unexpected happened. Meetings became shorter because nobody had time for them, and the studio started refusing work that didn't fit the schedule. Revenue fell by four per cent in the first year, but nobody left the company — in an industry where people usually change jobs every eighteen months, that was worth more than the difference."},
    exercises:[
      {id:"b1-work-reading-mc-001",type:"multiple_choice",question:"What was the studio's main rule about Fridays?",
        options:["Half-days only","Meetings only in the morning","No work contact at all","Optional attendance"],correct:2},
      {id:"b1-work-reading-mc-002",type:"multiple_choice",question:"Why did meetings become shorter?",
        options:["The manager banned them","They moved online","Clients asked for it","There was simply no time"],correct:3},
      {id:"b1-work-reading-complete-003",type:"fill_blank",question:"Revenue ___ (fall) by four per cent in the first year.",correct:"fell"},
      {id:"b1-work-reading-mc-004",type:"multiple_choice",question:"Why does the writer mention 'eighteen months'?",
        options:["To show how often people usually change jobs","It is how long the test lasted","It is the length of a contract","It is when revenue recovered"],correct:0},
      {id:"b1-work-reading-transform-005",type:"transform",question:"Rewrite in the passive: The team reorganised the projects.",correct:"The projects were reorganised by the team."},
      {id:"b1-work-reading-mc-006",type:"multiple_choice",question:"What is the writer's overall attitude to the experiment?",
        options:["Clearly negative","Cautiously positive","Completely neutral","Amused"],correct:1}
    ]
  },

  "b1-environment-reading":{ label:"↳ Environment · Reading", level:"B1", keys:["reading","environment"],
    groupId:"b1-environment-reading-group-001",
    passage:{ level:"B1", title:"What Happens to the Bottle",
      text:"Most people put a plastic bottle in the recycling bin and stop thinking about it. In reality, the journey is complicated. The bottle is sorted by machines and by hand, washed, cut into flakes and sold. Whether it becomes another bottle depends almost entirely on price: if new plastic is cheaper than recycled plastic, factories buy new plastic. That is why recycling rates rise and fall with the oil market rather than with public opinion. Campaigns that ask people to separate their rubbish are useful, but they cannot change that basic equation. Some countries have started charging producers for the packaging they put on the market, which shifts the cost to the people who design it."},
    exercises:[
      {id:"b1-environment-reading-mc-001",type:"multiple_choice",question:"According to the text, what decides whether a bottle is recycled?",
        options:["Public opinion","The colour of the plastic","The price of new plastic","The size of the bin"],correct:2},
      {id:"b1-environment-reading-complete-002",type:"fill_blank",question:"The bottle ___ (sort) by machines and by hand.",correct:"is sorted"},
      {id:"b1-environment-reading-mc-003",type:"multiple_choice",question:"What does the writer say about separation campaigns?",
        options:["They are useless","They only work in rich countries","They increase pollution","They help but don't solve the main problem"],correct:3},
      {id:"b1-environment-reading-mc-004",type:"multiple_choice",question:"In the text, \"shifts the cost to the people who design it\" means...",
        options:["producers become responsible","consumers pay more","governments pay","recycling becomes free"],correct:0},
      {id:"b1-environment-reading-transform-005",type:"transform",question:"Rewrite with 'if': Factories buy new plastic because it is cheaper.",correct:"If new plastic is cheaper, factories buy it."},
      {id:"b1-environment-reading-mc-006",type:"multiple_choice",question:"Which title fits the text best?",
        options:["How to Clean a Bottle","Why Recycling Depends on Money","The History of Plastic","Bins Around the World"],correct:1}
    ]
  },

  "b1-culture-reading":{ label:"↳ Cultural Differences · Reading", level:"B1", keys:["reading","culture"],
    groupId:"b1-culture-reading-group-001",
    passage:{ level:"B1", title:"The Meeting That Went Wrong",
      text:"When Sofia moved from São Paulo to Helsinki, she thought the hardest part would be the winter. It wasn't. In her first team meeting she did what she had always done: she filled the silences, agreed enthusiastically and made a joke about the coffee. Nobody responded. Afterwards a colleague explained, kindly, that in that office a pause did not mean the conversation was dead — it meant people were still thinking. Sofia had been reading silence as rejection. Six months later she noticed she had started pausing too, and that her Brazilian friends found her strangely quiet on video calls."},
    exercises:[
      {id:"b1-culture-reading-mc-001",type:"multiple_choice",question:"What did Sofia expect to be the hardest part?",
        options:["The language","The food","The winter","The meetings"],correct:2},
      {id:"b1-culture-reading-mc-002",type:"multiple_choice",question:"Why did nobody respond in the meeting?",
        options:["They disliked her","The meeting had ended","They hadn't heard her","Silence meant they were thinking"],correct:3},
      {id:"b1-culture-reading-complete-003",type:"fill_blank",question:"Sofia ___ (read) silence as rejection.",correct:"had been reading"},
      {id:"b1-culture-reading-mc-004",type:"multiple_choice",question:"What happened to Sofia after six months?",
        options:["She adopted the new habit","She moved back","She stopped attending meetings","She changed teams"],correct:0},
      {id:"b1-culture-reading-transform-005",type:"transform",question:"Use 'get used to': Pauses in conversation were new for Sofia at first.",correct:"Sofia had to get used to pauses in conversation."},
      {id:"b1-culture-reading-mc-006",type:"multiple_choice",question:"What is the main point of the text?",
        options:["Finnish offices are unfriendly","Cultural habits change the meaning of behaviour","Brazilians talk too much","Video calls are difficult"],correct:1}
    ]
  },

  "b1-money-reading":{ label:"↳ Money · Reading", level:"B1", keys:["reading","money"],
    groupId:"b1-money-reading-group-001",
    passage:{ level:"B1", title:"The Spreadsheet That Lasted",
      text:"I have tried at least six budgeting apps and abandoned all of them. What finally worked was embarrassingly simple: one spreadsheet with three columns and one rule — I write down anything I spend over twenty reais on the same day. Small purchases don't go in, which sounds wrong, but it is precisely why I have kept it for two years. Every other system failed because it asked for perfect data, and perfect data takes fifteen minutes a day that nobody has. The point of the spreadsheet is not accuracy. It is that once a month I sit down and look at it, and I always find one subscription I had forgotten about."},
    exercises:[
      {id:"b1-money-reading-mc-001",type:"multiple_choice",question:"Why did the other systems fail for the writer?",
        options:["They cost too much","They were in English","They required perfect data","They had no charts"],correct:2},
      {id:"b1-money-reading-complete-002",type:"fill_blank",question:"The writer ___ (keep) the spreadsheet for two years.",correct:"has kept"},
      {id:"b1-money-reading-mc-003",type:"multiple_choice",question:"What is deliberately left out of the spreadsheet?",
        options:["Rent","Salary","Subscriptions","Small purchases"],correct:3},
      {id:"b1-money-reading-mc-004",type:"multiple_choice",question:"In the text, \"which sounds wrong\" refers to...",
        options:["ignoring small purchases","writing things down late","checking once a month","using a spreadsheet"],correct:0},
      {id:"b1-money-reading-transform-005",type:"transform",question:"Second conditional: The writer doesn't have fifteen minutes a day, so she keeps it simple.",correct:"If she had fifteen minutes a day, she would keep more detail."},
      {id:"b1-money-reading-mc-006",type:"multiple_choice",question:"What does the writer value most about the system?",
        options:["Its accuracy","That she actually uses it","Its design","That it is free"],correct:1}
    ]
  },

  "b1-education-reading":{ label:"↳ Education · Reading", level:"B1", keys:["reading","education"],
    groupId:"b1-education-reading-group-001",
    passage:{ level:"B1", title:"Why the Second Language Is Easier",
      text:"Teachers often notice that students who already speak a second language learn a third one faster. The reason is not intelligence. People who have learned one foreign language have already discovered something important: that being confused is a normal stage, not evidence of failure. Beginners who have never done it before tend to interpret confusion as proof that they are 'not good at languages', and many stop within the first six months. Studies of adult learners suggest that the students who continue are rarely the most talented ones — they are the ones who expected the difficulty."},
    exercises:[
      {id:"b1-education-reading-mc-001",type:"multiple_choice",question:"According to the text, why is a third language often easier?",
        options:["Because the languages are similar","Because of better teachers","Because learners know confusion is normal","Because of intelligence"],correct:2},
      {id:"b1-education-reading-complete-002",type:"fill_blank",question:"Many beginners stop ___ the first six months.",correct:"within"},
      {id:"b1-education-reading-mc-003",type:"multiple_choice",question:"What do the studies suggest about students who continue?",
        options:["They are the most talented","They start younger","They study more hours","They expected the difficulty"],correct:3},
      {id:"b1-education-reading-mc-004",type:"multiple_choice",question:"In the text, \"not evidence of failure\" describes...",
        options:["confusion","talent","teaching","grammar"],correct:0},
      {id:"b1-education-reading-transform-005",type:"transform",question:"Rewrite with 'tend to': Beginners usually think confusion means they are bad at languages.",correct:"Beginners tend to think confusion means they are bad at languages."},
      {id:"b1-education-reading-mc-006",type:"multiple_choice",question:"What would be the best advice based on this text?",
        options:["Choose an easy language","Expect to feel lost at the start","Study only with a teacher","Learn three languages at once"],correct:1}
    ]
  },

  /* ==================== B2 ==================== */

  "b2-career":{ label:"Career Development", level:"B2", keys:["career","promotion","carreira","progression"], exercises:[
    {id:"b2-career-complete-001",type:"fill_blank",question:"Not only ___ she manage the team, she also redesigned the process.",correct:"did"},
    {id:"b2-career-complete-002",type:"fill_blank",question:"Having ___ (work) in three sectors, she reads companies quickly.",correct:"worked"},
    {id:"b2-career-complete-003",type:"fill_blank",question:"He's widely regarded ___ the strongest candidate.",correct:"as"},
    {id:"b2-career-mc-004",type:"multiple_choice",question:"___ I known the role involved so much travel, I'd have thought twice.",options:["If","Should","Had","Were"],correct:2},
    {id:"b2-career-mc-005",type:"multiple_choice",question:"It was the lack of feedback ___ made her leave, not the salary.",options:["what","which","who","that"],correct:3},
    {id:"b2-career-mc-006",type:"multiple_choice",question:"She's unlikely ___ the offer at that salary.",options:["to accept","accepting","accept","to accepting"],correct:0},
    {id:"b2-career-fix-007",type:"fix",question:"Despite of his experience, he wasn't shortlisted.",correct:"Despite his experience, he wasn't shortlisted."},
    {id:"b2-career-fix-008",type:"fix",question:"I have been promoted last March.",correct:"I was promoted last March."},
    {id:"b2-career-transform-009",type:"transform",question:"Use inversion: She had never been offered a role like that before.",correct:"Never before had she been offered a role like that."},
    {id:"b2-career-transform-010",type:"transform",question:"Use a cleft sentence to emphasise the reason: The commute made him resign.",correct:"It was the commute that made him resign."},
    {id:"b2-career-transform-011",type:"transform",question:"Use a participle clause: Because she had finished the certification, she applied immediately.",correct:"Having finished the certification, she applied immediately."},
    {id:"b2-career-question-012",type:"make_question",answer:"Mostly the possibility of managing a team, rather than the title.",prompt:"Ask what attracted the person to the role.",correct:"What attracted you to the role?"},
    {id:"b2-career-dialogue-013",type:"dialogue",
      title:"The conversation before the promotion",
      context:"A manager and a senior team member talk candidly.",
      wordBank:["assuming","reservations","were","regarded","case","willing"],
      lines:[
        {who:"A",text:"I'd like to make the ___ for you internally."},
        {who:"B",text:"I appreciate that. I do have some ___, though."},
        {who:"A",text:"Go on — I'd rather hear them now."},
        {who:"B",text:"If I ___ to take it, I'd be managing former peers."},
        {who:"A",text:"You're already ___ as the person they ask."},
        {who:"B",text:"___ that's true, I'd be ___ to try it for six months."}
      ],
      answers:["case","reservations","were","regarded","Assuming","willing"]},
    {id:"b2-career-sentence-014",type:"make_sentence",
      instruction:"Choose a verb and say something substantial about career progression.",
      verbs:[
        {v:"pursue",     id:"b2-career-sentence-pursue-001"},
        {v:"turn down",  id:"b2-career-sentence-turndown-001"},
        {v:"negotiate",  id:"b2-career-sentence-negotiate-001"},
        {v:"outgrow",    id:"b2-career-sentence-outgrow-001"},
        {v:"take on",    id:"b2-career-sentence-takeon-001"},
        {v:"step down",  id:"b2-career-sentence-stepdown-001"},
        {v:"mentor",     id:"b2-career-sentence-mentor-001"},
        {v:"reposition", id:"b2-career-sentence-reposition-001"}
      ]}
  ]},

  "b2-consumerism":{ label:"Consumerism", level:"B2", keys:["consumerism","shopping","consumo","advertising","buying"], exercises:[
    {id:"b2-consumerism-complete-001",type:"fill_blank",question:"We are constantly encouraged ___ replace things that still work.",correct:"to"},
    {id:"b2-consumerism-complete-002",type:"fill_blank",question:"Rarely ___ we ask who paid the real price of a cheap product.",correct:"do"},
    {id:"b2-consumerism-complete-003",type:"fill_blank",question:"The campaign was designed to make the purchase feel ___ an identity choice.",correct:"like"},
    {id:"b2-consumerism-mc-004",type:"multiple_choice",question:"Products ___ deliberately so that they fail after two years.",options:["design","are designed","are designing","have designed"],correct:1},
    {id:"b2-consumerism-mc-005",type:"multiple_choice",question:"___ people buy is increasingly shaped by what they see online.",options:["That","Which","What","Whose"],correct:2},
    {id:"b2-consumerism-mc-006",type:"multiple_choice",question:"He can't help ___ things he doesn't need.",options:["to buy","buy","bought","buying"],correct:3},
    {id:"b2-consumerism-fix-007",type:"fix",question:"Nowadays the people consume much more than before.",correct:"Nowadays people consume much more than they used to."},
    {id:"b2-consumerism-fix-008",type:"fix",question:"This phenomenon is happening since the nineties.",correct:"This phenomenon has been happening since the nineties."},
    {id:"b2-consumerism-transform-009",type:"transform",question:"Use inversion: We seldom question where our clothes come from.",correct:"Seldom do we question where our clothes come from."},
    {id:"b2-consumerism-transform-010",type:"transform",question:"Nominalise the verb: Companies advertise aggressively, and this shapes demand.",correct:"Aggressive advertising shapes demand."},
    {id:"b2-consumerism-transform-011",type:"transform",question:"Use the causative: A tailor repaired my coat instead of my buying a new one.",correct:"I had my coat repaired instead of buying a new one."},
    {id:"b2-consumerism-question-012",type:"make_question",answer:"Probably the last phone — I replaced one that worked perfectly.",prompt:"Ask about an unnecessary purchase.",correct:"What was your least necessary purchase?"},
    {id:"b2-consumerism-story-013",type:"story",
      title:"The year of buying nothing new",
      context:"A personal experiment with consumption.",
      wordBank:["allowed","was","had","realised","turned","stopped","faded","found"],
      text:"For twelve months I ___ myself to buy only food, medicine and things that broke beyond repair. "+
           "The first month ___ easy, mostly because I ___ already bought everything I wanted in December. "+
           "By March I ___ how much of my shopping ___ out to be boredom rather than need. "+
           "I ___ opening the apps at night, and after a while the habit simply ___ . "+
           "What I ___ hardest was not the objects — it was explaining the decision at family dinners.",
      answers:["allowed","was","had","realised","turned","stopped","faded","found"]},
    {id:"b2-consumerism-sentence-014",type:"make_sentence",
      instruction:"Choose a verb and make a point about consumption.",
      verbs:[
        {v:"consume",   id:"b2-consumerism-sentence-consume-001"},
        {v:"resist",    id:"b2-consumerism-sentence-resist-001"},
        {v:"replace",   id:"b2-consumerism-sentence-replace-001"},
        {v:"advertise", id:"b2-consumerism-sentence-advertise-001"},
        {v:"justify",   id:"b2-consumerism-sentence-justify-001"},
        {v:"repair",    id:"b2-consumerism-sentence-repair-001"},
        {v:"accumulate",id:"b2-consumerism-sentence-accumulate-001"},
        {v:"regret",    id:"b2-consumerism-sentence-regret-001"}
      ]}
  ]},

  "b2-ai":{ label:"Artificial Intelligence", level:"B2", keys:["ai","artificial intelligence","ia","automation","technology"], exercises:[
    {id:"b2-ai-complete-001",type:"fill_blank",question:"These systems are trained ___ enormous quantities of text.",correct:"on"},
    {id:"b2-ai-complete-002",type:"fill_blank",question:"Were the model ___ (train) on biased data, its outputs would reflect that bias.",correct:"trained"},
    {id:"b2-ai-complete-003",type:"fill_blank",question:"It remains ___ be seen whether regulation can keep up.",correct:"to"},
    {id:"b2-ai-mc-004",type:"multiple_choice",question:"The tool is useful ___ you check what it produces.",options:["provided that","unless","in case","despite"],correct:0},
    {id:"b2-ai-mc-005",type:"multiple_choice",question:"___ it not been for open-source models, the field would be far more closed.",options:["If","Had","Should","Were"],correct:1},
    {id:"b2-ai-mc-006",type:"multiple_choice",question:"Many jobs are likely ___ rather than eliminated.",options:["to redefine","redefining","to be redefined","be redefined"],correct:2},
    {id:"b2-ai-fix-007",type:"fix",question:"The AI can to write the first draft, but it invents references.",correct:"AI can write the first draft, but it invents references."},
    {id:"b2-ai-fix-008",type:"fix",question:"Is undeniable that these tools changed the way we work.",correct:"It is undeniable that these tools have changed the way we work."},
    {id:"b2-ai-transform-009",type:"transform",question:"Use a cleft sentence: The lack of transparency worries researchers most.",correct:"What worries researchers most is the lack of transparency."},
    {id:"b2-ai-transform-010",type:"transform",question:"Hedge the claim: AI will replace translators.",correct:"AI may well replace some translation work."},
    {id:"b2-ai-transform-011",type:"transform",question:"Use the passive with 'it is argued': People argue that these models memorise their training data.",correct:"It is argued that these models memorise their training data."},
    {id:"b2-ai-question-012",type:"make_question",answer:"Not really — it saves me time on drafts, but I rewrite most of it.",prompt:"Ask whether the tool has changed how the person works.",correct:"Has it changed the way you work?"},
    {id:"b2-ai-dialogue-013",type:"dialogue",
      title:"Useful or overrated?",
      context:"Two professionals disagree, politely.",
      wordBank:["provided","tends","overstated","whether","grant","point"],
      lines:[
        {who:"A",text:"I think the impact is genuinely ___."},
        {who:"B",text:"I'd ___ you that the marketing is. The tools aren't."},
        {who:"A",text:"But it ___ to produce confident nonsense."},
        {who:"B",text:"Only if you use it without checking. ___ you verify, it's a real gain."},
        {who:"A",text:"That's fair. The question is ___ people actually verify."},
        {who:"B",text:"Now that's a good ___."}
      ],
      answers:["overstated","grant","tends","Provided","whether","point"]},
    {id:"b2-ai-sentence-014",type:"make_sentence",
      instruction:"Choose a verb and make a nuanced statement about AI.",
      verbs:[
        {v:"automate",  id:"b2-ai-sentence-automate-001"},
        {v:"replace",   id:"b2-ai-sentence-replace-001"},
        {v:"assist",    id:"b2-ai-sentence-assist-001"},
        {v:"regulate",  id:"b2-ai-sentence-regulate-001"},
        {v:"verify",    id:"b2-ai-sentence-verify-001"},
        {v:"overestimate",id:"b2-ai-sentence-overestimate-001"},
        {v:"depend on", id:"b2-ai-sentence-dependon-001"},
        {v:"train",     id:"b2-ai-sentence-train-001"}
      ]}
  ]},

  "b2-remote":{ label:"Remote Work", level:"B2", keys:["remote","home office","hybrid","trabalho remoto"], exercises:[
    {id:"b2-remote-complete-001",type:"fill_blank",question:"The policy was rolled ___ across all offices in June.",correct:"out"},
    {id:"b2-remote-complete-002",type:"fill_blank",question:"Working from home suits some people; ___ suits everyone.",correct:"nothing"},
    {id:"b2-remote-complete-003",type:"fill_blank",question:"Little ___ managers realise how much informal knowledge was lost.",correct:"did"},
    {id:"b2-remote-mc-004",type:"multiple_choice",question:"___ the pandemic, few companies would have tried it at scale.",options:["Despite","Unless","Provided","Had it not been for"],correct:3},
    {id:"b2-remote-mc-005",type:"multiple_choice",question:"Teams ___ members are in five time zones need different rules.",options:["whose","who","which","that"],correct:0},
    {id:"b2-remote-mc-006",type:"multiple_choice",question:"He objects ___ asked to justify his hours.",options:["to be","to being","being","be"],correct:1},
    {id:"b2-remote-fix-007",type:"fix",question:"I'm working from home since three years.",correct:"I've been working from home for three years."},
    {id:"b2-remote-fix-008",type:"fix",question:"The most people prefer a hybrid model.",correct:"Most people prefer a hybrid model."},
    {id:"b2-remote-transform-009",type:"transform",question:"Use inversion: The company rarely allows fully remote contracts.",correct:"Rarely does the company allow fully remote contracts."},
    {id:"b2-remote-transform-010",type:"transform",question:"Use a concessive clause: Productivity rose. Collaboration suffered.",correct:"Although productivity rose, collaboration suffered."},
    {id:"b2-remote-transform-011",type:"transform",question:"Use a mixed conditional: We didn't invest in documentation, so onboarding is chaotic now.",correct:"If we had invested in documentation, onboarding wouldn't be so chaotic now."},
    {id:"b2-remote-question-012",type:"make_question",answer:"The unplanned conversations, definitely — not the desk.",prompt:"Ask what the person misses about the office.",correct:"What do you miss about the office?"},
    {id:"b2-remote-dialogue-013",type:"dialogue",
      title:"Three days in, two days out",
      context:"Negotiating a hybrid arrangement.",
      wordBank:["boils","trust","whereas","exception","committing","matter"],
      lines:[
        {who:"A",text:"For me it ___ down to focus time."},
        {who:"B",text:"I understand, ___ the team needs overlap."},
        {who:"A",text:"Would two fixed days ___?"},
        {who:"B",text:"It would, as long as they're the same two."},
        {who:"A",text:"I'd rather avoid ___ to Mondays."},
        {who:"B",text:"Then make Monday the ___ — this is about ___, not attendance."}
      ],
      answers:["boils","whereas","matter","committing","exception","trust"]},
    {id:"b2-remote-sentence-014",type:"make_sentence",
      instruction:"Choose a verb and make an argument about remote work.",
      verbs:[
        {v:"commute",   id:"b2-remote-sentence-commute-001"},
        {v:"collaborate",id:"b2-remote-sentence-collaborate-001"},
        {v:"monitor",   id:"b2-remote-sentence-monitor-001"},
        {v:"document",  id:"b2-remote-sentence-document-001"},
        {v:"disconnect",id:"b2-remote-sentence-disconnect-001"},
        {v:"relocate",  id:"b2-remote-sentence-relocate-001"},
        {v:"overlap",   id:"b2-remote-sentence-overlap-001"},
        {v:"blur",      id:"b2-remote-sentence-blur-001"}
      ]}
  ]},

  "b2-sustainability":{ label:"Sustainability", level:"B2", keys:["sustainability","climate","sustentabilidade","carbon"], exercises:[
    {id:"b2-sustainability-complete-001",type:"fill_blank",question:"Emissions must be cut ___ half within a decade, according to the report.",correct:"by"},
    {id:"b2-sustainability-complete-002",type:"fill_blank",question:"Only by changing infrastructure ___ we reduce demand significantly.",correct:"can"},
    {id:"b2-sustainability-complete-003",type:"fill_blank",question:"The targets are unlikely to be met ___ policy changes quickly.",correct:"unless"},
    {id:"b2-sustainability-mc-004",type:"multiple_choice",question:"The scheme, ___ funding was cut last year, has now been revived.",options:["which","that","whose","who"],correct:2},
    {id:"b2-sustainability-mc-005",type:"multiple_choice",question:"Individual action matters, ___ it is not a substitute for regulation.",options:["therefore","albeit","despite","though"],correct:3},
    {id:"b2-sustainability-mc-006",type:"multiple_choice",question:"Far too much attention ___ paid to plastic straws.",options:["has been","have been","has","is being paid to"],correct:0},
    {id:"b2-sustainability-fix-007",type:"fix",question:"We must to reduce our carbon footprint.",correct:"We must reduce our carbon footprint."},
    {id:"b2-sustainability-fix-008",type:"fix",question:"Informations about emissions are hard to compare.",correct:"Information about emissions is hard to compare."},
    {id:"b2-sustainability-transform-009",type:"transform",question:"Use inversion with 'only': We can only solve this by changing how cities are built.",correct:"Only by changing how cities are built can we solve this."},
    {id:"b2-sustainability-transform-010",type:"transform",question:"Nominalise: Cities are being built more densely, and this reduces car use.",correct:"Denser urban development reduces car use."},
    {id:"b2-sustainability-transform-011",type:"transform",question:"Hedge the claim: Recycling solves the plastic problem.",correct:"Recycling can only be part of the solution to the plastic problem."},
    {id:"b2-sustainability-question-012",type:"make_question",answer:"Transport, by a wide margin — I fly for work four times a year.",prompt:"Ask about the biggest part of the person's footprint.",correct:"What is the biggest part of your footprint?"},
    {id:"b2-sustainability-dialogue-013",type:"dialogue",
      title:"Individual vs systemic",
      context:"A discussion that both people have had before.",
      wordBank:["shifts","argue","extent","substitute","let","point"],
      lines:[
        {who:"A",text:"To what ___ does personal behaviour actually matter?"},
        {who:"B",text:"Some ___ it's marginal, and they have a ___."},
        {who:"A",text:"But framing it as personal ___ the blame away from producers."},
        {who:"B",text:"Agreed. It's not a ___ for regulation."},
        {who:"A",text:"Though that shouldn't ___ anyone off the hook either."},
        {who:"B",text:"No. Both, then."}
      ],
      answers:["extent","argue","point","shifts","substitute","let"]},
    {id:"b2-sustainability-sentence-014",type:"make_sentence",
      instruction:"Choose a verb and make an argument about sustainability.",
      verbs:[
        {v:"offset",   id:"b2-sustainability-sentence-offset-001"},
        {v:"regulate", id:"b2-sustainability-sentence-regulate-001"},
        {v:"reduce",   id:"b2-sustainability-sentence-reduce-001"},
        {v:"invest",   id:"b2-sustainability-sentence-invest-001"},
        {v:"prioritise",id:"b2-sustainability-sentence-prioritise-001"},
        {v:"undermine",id:"b2-sustainability-sentence-undermine-001"},
        {v:"adapt",    id:"b2-sustainability-sentence-adapt-001"},
        {v:"phase out",id:"b2-sustainability-sentence-phaseout-001"}
      ]}
  ]},

  "b2-social":{ label:"Social Issues", level:"B2", keys:["social issues","inequality","society","questoes sociais"], exercises:[
    {id:"b2-social-complete-001",type:"fill_blank",question:"The gap between the two groups has widened ___ the last decade.",correct:"over"},
    {id:"b2-social-complete-002",type:"fill_blank",question:"Access to housing ___ (treat) as a market question rather than a right.",correct:"is treated"},
    {id:"b2-social-complete-003",type:"fill_blank",question:"It is often assumed ___ mobility depends only on effort.",correct:"that"},
    {id:"b2-social-mc-004",type:"multiple_choice",question:"The policy benefited those ___ needed it least.",options:["which","who","whose","what"],correct:1},
    {id:"b2-social-mc-005",type:"multiple_choice",question:"___ the reforms, inequality has continued to grow.",options:["Although","However","Despite","Whereas"],correct:2},
    {id:"b2-social-mc-006",type:"multiple_choice",question:"Something ___ to be done about waiting times.",options:["needed","need","is needing","needs"],correct:3},
    {id:"b2-social-fix-007",type:"fix",question:"The society must to protect the most vulnerable.",correct:"Society must protect the most vulnerable."},
    {id:"b2-social-fix-008",type:"fix",question:"There is many people affected by this problem.",correct:"There are many people affected by this problem."},
    {id:"b2-social-transform-009",type:"transform",question:"Use the impersonal passive: People believe the system favours the wealthy.",correct:"The system is believed to favour the wealthy."},
    {id:"b2-social-transform-010",type:"transform",question:"Use a concessive clause: The budget increased. Outcomes did not improve.",correct:"Even though the budget increased, outcomes did not improve."},
    {id:"b2-social-transform-011",type:"transform",question:"Nominalise: Fewer people can afford housing, and this drives migration.",correct:"Declining housing affordability drives migration."},
    {id:"b2-social-question-012",type:"make_question",answer:"Transport, probably — it decides who can reach which jobs.",prompt:"Ask which issue is most underestimated.",correct:"Which issue do you think is most underestimated?"},
    {id:"b2-social-dialogue-013",type:"dialogue",
      title:"Where the money goes",
      context:"Two people discuss a local budget decision.",
      wordBank:["framed","Whereas","tackle","assumption","evidence","stand"],
      lines:[
        {who:"A",text:"The debate is being ___ as spending versus saving."},
        {who:"B",text:"___ the real question is what we ___ first."},
        {who:"A",text:"Exactly. And the ___ is that transport can wait."},
        {who:"B",text:"Is there any ___ for that?"},
        {who:"A",text:"None that I've seen."},
        {who:"B",text:"Then the argument doesn't ___ up."}
      ],
      answers:["framed","Whereas","tackle","assumption","evidence","stand"]},
    {id:"b2-social-sentence-014",type:"make_sentence",
      instruction:"Choose a verb and make a claim about a social issue.",
      verbs:[
        {v:"address",   id:"b2-social-sentence-address-001"},
        {v:"exclude",   id:"b2-social-sentence-exclude-001"},
        {v:"fund",      id:"b2-social-sentence-fund-001"},
        {v:"widen",     id:"b2-social-sentence-widen-001"},
        {v:"protect",   id:"b2-social-sentence-protect-001"},
        {v:"overlook",  id:"b2-social-sentence-overlook-001"},
        {v:"campaign",  id:"b2-social-sentence-campaign-001"},
        {v:"reform",    id:"b2-social-sentence-reform-001"}
      ]}
  ]},

  "b2-media":{ label:"Media Influence", level:"B2", keys:["media","influence","press","midia","narrative"], exercises:[
    {id:"b2-media-complete-001",type:"fill_blank",question:"The story was framed ___ a crisis rather than a policy choice.",correct:"as"},
    {id:"b2-media-complete-002",type:"fill_blank",question:"What ___ (leave) out of a headline often matters more than what is in it.",correct:"is left"},
    {id:"b2-media-complete-003",type:"fill_blank",question:"Not until the third paragraph ___ the correction appear.",correct:"did"},
    {id:"b2-media-mc-004",type:"multiple_choice",question:"Coverage tends to focus on conflict, ___ makes nuance hard to sell.",options:["which","what","that","who"],correct:0},
    {id:"b2-media-mc-005",type:"multiple_choice",question:"The claim ___ have been checked before publication.",options:["should to","should","would","might to"],correct:1},
    {id:"b2-media-mc-006",type:"multiple_choice",question:"He denied ___ the source.",options:["to reveal","reveal","revealing","revealed"],correct:2},
    {id:"b2-media-fix-007",type:"fix",question:"The medias have a big influence in public opinion.",correct:"The media have a big influence on public opinion."},
    {id:"b2-media-fix-008",type:"fix",question:"Is important to check who financed the study.",correct:"It is important to check who financed the study."},
    {id:"b2-media-transform-009",type:"transform",question:"Use a cleft sentence: The framing, not the facts, changed people's minds.",correct:"It was the framing, not the facts, that changed people's minds."},
    {id:"b2-media-transform-010",type:"transform",question:"Use the impersonal passive: People say the coverage was one-sided.",correct:"The coverage is said to have been one-sided."},
    {id:"b2-media-transform-011",type:"transform",question:"Use inversion: The paper published a correction only after two weeks.",correct:"Only after two weeks did the paper publish a correction."},
    {id:"b2-media-question-012",type:"make_question",answer:"Two or three, and I deliberately pick ones that disagree.",prompt:"Ask how many sources the person follows.",correct:"How many sources do you follow?"},
    {id:"b2-media-dialogue-013",type:"dialogue",
      title:"Same event, two headlines",
      context:"Comparing how two outlets covered one story.",
      wordBank:["angle","omitted","strictly","buried","implies","identical"],
      lines:[
        {who:"A",text:"The facts are almost ___ in both pieces."},
        {who:"B",text:"It's the ___ that differs."},
        {who:"A",text:"One of them ___ the number of people affected."},
        {who:"B",text:"And the other ___ it in the last paragraph."},
        {who:"A",text:"___ speaking, neither is false."},
        {who:"B",text:"No — but one clearly ___ blame."}
      ],
      answers:["identical","angle","omitted","buried","Strictly","implies"]},
    {id:"b2-media-sentence-014",type:"make_sentence",
      instruction:"Choose a verb and say something about how media shapes opinion.",
      verbs:[
        {v:"frame",       id:"b2-media-sentence-frame-001"},
        {v:"exaggerate",  id:"b2-media-sentence-exaggerate-001"},
        {v:"verify",      id:"b2-media-sentence-verify-001"},
        {v:"amplify",     id:"b2-media-sentence-amplify-001"},
        {v:"omit",        id:"b2-media-sentence-omit-001"},
        {v:"influence",   id:"b2-media-sentence-influence-001"},
        {v:"retract",     id:"b2-media-sentence-retract-001"},
        {v:"sensationalise",id:"b2-media-sentence-sensationalise-001"}
      ]}
  ]},

  "b2-privacy":{ label:"Privacy", level:"B2", keys:["privacy","data","surveillance","privacidade"], exercises:[
    {id:"b2-privacy-complete-001",type:"fill_blank",question:"Users rarely read what they are consenting ___.",correct:"to"},
    {id:"b2-privacy-complete-002",type:"fill_blank",question:"Your data ___ (sell) long before you notice.",correct:"has been sold"},
    {id:"b2-privacy-complete-003",type:"fill_blank",question:"Under no circumstances ___ the recordings be shared.",correct:"should"},
    {id:"b2-privacy-mc-004",type:"multiple_choice",question:"The argument that you have nothing to hide ___ the point.",options:["missed to","miss","is missing to","misses"],correct:3},
    {id:"b2-privacy-mc-005",type:"multiple_choice",question:"___ the leak, the company had denied storing the addresses.",options:["Prior to","Until","Since","By"],correct:0},
    {id:"b2-privacy-mc-006",type:"multiple_choice",question:"He insisted ___ the data being deleted.",options:["in","on","for","to"],correct:1},
    {id:"b2-privacy-fix-007",type:"fix",question:"They are collecting our datas without permission.",correct:"They are collecting our data without permission."},
    {id:"b2-privacy-fix-008",type:"fix",question:"I don't agree that companies can to track everything.",correct:"I don't agree that companies can track everything."},
    {id:"b2-privacy-transform-009",type:"transform",question:"Use inversion: The recordings should never be shared under any circumstances.",correct:"Under no circumstances should the recordings be shared."},
    {id:"b2-privacy-transform-010",type:"transform",question:"Use the causative: A specialist checked my phone for tracking apps.",correct:"I had my phone checked for tracking apps."},
    {id:"b2-privacy-transform-011",type:"transform",question:"Hedge: Companies read your private messages.",correct:"Some companies may analyse message metadata."},
    {id:"b2-privacy-question-012",type:"make_question",answer:"Location, without a doubt — it reveals everything else.",prompt:"Ask which data the person is most careful with.",correct:"Which data are you most careful with?"},
    {id:"b2-privacy-dialogue-013",type:"dialogue",
      title:"Nothing to hide",
      context:"An argument that keeps coming back.",
      wordBank:["consent","aggregated","trade","assumes","point","harmless"],
      lines:[
        {who:"A",text:"I've got nothing to hide, so I don't see the ___."},
        {who:"B",text:"That argument ___ the data stays with one company."},
        {who:"A",text:"Most of it looks ___ on its own."},
        {who:"B",text:"Until it's ___ with everything else about you."},
        {who:"A",text:"So it's a ___, then — convenience for exposure."},
        {who:"B",text:"Yes, and one we never really ___ to."}
      ],
      answers:["point","assumes","harmless","aggregated","trade","consent"]},
    {id:"b2-privacy-sentence-014",type:"make_sentence",
      instruction:"Choose a verb and make a point about privacy.",
      verbs:[
        {v:"track",     id:"b2-privacy-sentence-track-001"},
        {v:"consent",   id:"b2-privacy-sentence-consent-001"},
        {v:"encrypt",   id:"b2-privacy-sentence-encrypt-001"},
        {v:"leak",      id:"b2-privacy-sentence-leak-001"},
        {v:"anonymise", id:"b2-privacy-sentence-anonymise-001"},
        {v:"monitor",   id:"b2-privacy-sentence-monitor-001"},
        {v:"opt out",   id:"b2-privacy-sentence-optout-001"},
        {v:"safeguard", id:"b2-privacy-sentence-safeguard-001"}
      ]}
  ]},

  "b2-techsociety":{ label:"Technology & Society", level:"B2", keys:["technology","society","impact","tecnologia e sociedade"], exercises:[
    {id:"b2-techsociety-complete-001",type:"fill_blank",question:"Every technology carries assumptions about how people ___ (suppose) to behave.",correct:"are supposed"},
    {id:"b2-techsociety-complete-002",type:"fill_blank",question:"Rarely do we ask who actually benefits ___ a new platform.",correct:"from"},
    {id:"b2-techsociety-complete-003",type:"fill_blank",question:"The benefits are real; ___ are the costs.",correct:"so"},
    {id:"b2-techsociety-mc-004",type:"multiple_choice",question:"Technologies are rarely neutral, ___ their designers claim.",options:["however","whichever","whatever","whenever"],correct:2},
    {id:"b2-techsociety-mc-005",type:"multiple_choice",question:"___ we adopt a tool, we adopt its defaults.",options:["Whereas","However","Whoever","Whenever"],correct:3},
    {id:"b2-techsociety-mc-006",type:"multiple_choice",question:"The change is best described ___ gradual rather than sudden.",options:["as","like","how","such"],correct:0},
    {id:"b2-techsociety-fix-007",type:"fix",question:"The technology have changed our lives in the last twenty years.",correct:"Technology has changed our lives over the last twenty years."},
    {id:"b2-techsociety-fix-008",type:"fix",question:"Nowadays is difficult to live without a smartphone.",correct:"Nowadays it is difficult to live without a smartphone."},
    {id:"b2-techsociety-transform-009",type:"transform",question:"Use inversion with 'so': We have become so dependent on these systems that an outage stops a city.",correct:"So dependent have we become on these systems that an outage stops a city."},
    {id:"b2-techsociety-transform-010",type:"transform",question:"Use a participle clause: Because it was designed for engagement, the feed rewards outrage.",correct:"Designed for engagement, the feed rewards outrage."},
    {id:"b2-techsociety-transform-011",type:"transform",question:"Nominalise: People adopt tools quickly, and this leaves regulation behind.",correct:"Rapid adoption leaves regulation behind."},
    {id:"b2-techsociety-question-012",type:"make_question",answer:"The way it changed what counts as 'urgent', I think.",prompt:"Ask about the deepest change a technology caused.",correct:"What has it changed most deeply?"},
    {id:"b2-techsociety-story-013",type:"story",
      title:"The town that lost its signal",
      context:"A three-day network failure and what it revealed.",
      wordBank:["went","would","were","became","turned","knew","had","worked"],
      text:"When the network ___ down on a Friday afternoon, most people assumed it ___ be back within an hour. "+
           "By Saturday the shops ___ accepting cash only, and the queues ___ longer than anyone remembered. "+
           "What ___ out to be hardest was not payment but coordination: nobody ___ where their colleagues were. "+
           "The bakery, which still ___ a landline, ___ perfectly well. Afterwards several businesses installed one again.",
      answers:["went","would","were","became","turned","knew","had","worked"]},
    {id:"b2-techsociety-sentence-014",type:"make_sentence",
      instruction:"Choose a verb and make a claim about technology and society.",
      verbs:[
        {v:"disrupt",   id:"b2-techsociety-sentence-disrupt-001"},
        {v:"depend on", id:"b2-techsociety-sentence-dependon-001"},
        {v:"reshape",   id:"b2-techsociety-sentence-reshape-001"},
        {v:"exclude",   id:"b2-techsociety-sentence-exclude-001"},
        {v:"accelerate",id:"b2-techsociety-sentence-accelerate-001"},
        {v:"resist",    id:"b2-techsociety-sentence-resist-001"},
        {v:"regulate",  id:"b2-techsociety-sentence-regulate-001"},
        {v:"adopt",     id:"b2-techsociety-sentence-adopt-001"}
      ]}
  ]},

  "b2-edusystems":{ label:"Education Systems", level:"B2", keys:["education systems","school policy","curriculum","sistema educacional"], exercises:[
    {id:"b2-edusystems-complete-001",type:"fill_blank",question:"Students ___ (stream) by ability from the age of eleven in some systems.",correct:"are streamed"},
    {id:"b2-edusystems-complete-002",type:"fill_blank",question:"The curriculum places too much emphasis ___ memorisation.",correct:"on"},
    {id:"b2-edusystems-complete-003",type:"fill_blank",question:"Were funding ___ (distribute) differently, the gap would narrow.",correct:"distributed"},
    {id:"b2-edusystems-mc-004",type:"multiple_choice",question:"Exams measure what is easy to measure, ___ is not the same as what matters.",options:["that","which","what","who"],correct:1},
    {id:"b2-edusystems-mc-005",type:"multiple_choice",question:"Teachers ___ to teach to the test end up narrowing the subject.",options:["forcing","who forces","forced","are forced"],correct:2},
    {id:"b2-edusystems-mc-006",type:"multiple_choice",question:"There is little point ___ reforms without training teachers.",options:["to introduce","introduce","introduced","in introducing"],correct:3},
    {id:"b2-edusystems-fix-007",type:"fix",question:"The students are obligated to choose at 15 years old.",correct:"Students are required to choose at the age of fifteen."},
    {id:"b2-edusystems-fix-008",type:"fix",question:"In my opinion I think the system should change.",correct:"In my opinion the system should change."},
    {id:"b2-edusystems-transform-009",type:"transform",question:"Use the impersonal passive: People consider early specialisation risky.",correct:"Early specialisation is considered risky."},
    {id:"b2-edusystems-transform-010",type:"transform",question:"Use a concessive clause: Results improved. Inequality between schools grew.",correct:"While results improved, inequality between schools grew."},
    {id:"b2-edusystems-transform-011",type:"transform",question:"Use a cleft sentence: Teacher training, not technology, changes outcomes.",correct:"It is teacher training, not technology, that changes outcomes."},
    {id:"b2-edusystems-question-012",type:"make_question",answer:"Class size, though everyone talks about tablets instead.",prompt:"Ask which factor is most underrated.",correct:"Which factor do you think is most underrated?"},
    {id:"b2-edusystems-dialogue-013",type:"dialogue",
      title:"Reform, again",
      context:"Two teachers read a new policy document.",
      wordBank:["rolled","consulted","measurable","sceptical","were","implementation"],
      lines:[
        {who:"A",text:"Another reform to be ___ out in September."},
        {who:"B",text:"Was anyone actually ___ this time?"},
        {who:"A",text:"Two head teachers, apparently. That's why I'm ___."},
        {who:"B",text:"The goals are fine. It's the ___ that worries me."},
        {who:"A",text:"And everything has to be ___ within a year."},
        {who:"B",text:"If the timeline ___ realistic, I'd support it."}
      ],
      answers:["rolled","consulted","sceptical","implementation","measurable","were"]},
    {id:"b2-edusystems-sentence-014",type:"make_sentence",
      instruction:"Choose a verb and make an argument about education policy.",
      verbs:[
        {v:"assess",     id:"b2-edusystems-sentence-assess-001"},
        {v:"fund",       id:"b2-edusystems-sentence-fund-001"},
        {v:"streamline", id:"b2-edusystems-sentence-streamline-001"},
        {v:"train",      id:"b2-edusystems-sentence-train-001"},
        {v:"select",     id:"b2-edusystems-sentence-select-001"},
        {v:"broaden",    id:"b2-edusystems-sentence-broaden-001"},
        {v:"implement",  id:"b2-edusystems-sentence-implement-001"},
        {v:"evaluate",   id:"b2-edusystems-sentence-evaluate-001"}
      ]}
  ]},

  "b2-success":{ label:"Success & Failure", level:"B2", keys:["success","failure","sucesso","fracasso","achievement"], exercises:[
    {id:"b2-success-complete-001",type:"fill_blank",question:"Success is usually attributed ___ talent and failure to circumstances.",correct:"to"},
    {id:"b2-success-complete-002",type:"fill_blank",question:"Had the project succeeded, nobody ___ (question) the method.",correct:"would have questioned"},
    {id:"b2-success-complete-003",type:"fill_blank",question:"It took three attempts before it finally paid ___.",correct:"off"},
    {id:"b2-success-mc-004",type:"multiple_choice",question:"We only hear about the survivors, ___ distorts the statistics.",options:["which","what","that","who"],correct:0},
    {id:"b2-success-mc-005",type:"multiple_choice",question:"He blamed the failure ___ bad timing.",options:["for","on","to","of"],correct:1},
    {id:"b2-success-mc-006",type:"multiple_choice",question:"She's not one ___ give up easily.",options:["for","who","to","that to"],correct:2},
    {id:"b2-success-fix-007",type:"fix",question:"I had success in the exam.",correct:"I did well in the exam."},
    {id:"b2-success-fix-008",type:"fix",question:"He didn't succeed to convince the board.",correct:"He didn't succeed in convincing the board."},
    {id:"b2-success-transform-009",type:"transform",question:"Third conditional with inversion: If we had tested it earlier, we would have seen the problem.",correct:"Had we tested it earlier, we would have seen the problem."},
    {id:"b2-success-transform-010",type:"transform",question:"Use a cleft sentence: Persistence, not luck, explains most of it.",correct:"What explains most of it is persistence, not luck."},
    {id:"b2-success-transform-011",type:"transform",question:"Hedge: Failure always teaches you something.",correct:"Failure can teach you something, though not automatically."},
    {id:"b2-success-question-012",type:"make_question",answer:"That I confused being busy with making progress.",prompt:"Ask what the person learned from a failure.",correct:"What did you learn from it?"},
    {id:"b2-success-dialogue-013",type:"dialogue",
      title:"Post-mortem",
      context:"Reviewing a project that did not work.",
      wordBank:["hindsight","attributed","warned","pretend","salvage","obvious"],
      lines:[
        {who:"A",text:"In ___, the signals were there in month two."},
        {who:"B",text:"They weren't ___ at the time, though."},
        {who:"A",text:"Two people ___ us and we reframed it as risk."},
        {who:"B",text:"Fair. But let's not ___ it was one decision."},
        {who:"A",text:"Agreed. Failure gets ___ to whoever spoke last."},
        {who:"B",text:"So what can we ___ from it?"}
      ],
      answers:["hindsight","obvious","warned","pretend","attributed","salvage"]},
    {id:"b2-success-sentence-014",type:"make_sentence",
      instruction:"Choose a verb and say something honest about success or failure.",
      verbs:[
        {v:"achieve",   id:"b2-success-sentence-achieve-001"},
        {v:"fail",      id:"b2-success-sentence-fail-001"},
        {v:"persist",   id:"b2-success-sentence-persist-001"},
        {v:"attribute", id:"b2-success-sentence-attribute-001"},
        {v:"underestimate",id:"b2-success-sentence-underestimate-001"},
        {v:"recover",   id:"b2-success-sentence-recover-001"},
        {v:"measure",   id:"b2-success-sentence-measure-001"},
        {v:"redefine",  id:"b2-success-sentence-redefine-001"}
      ]}
  ]},

  "b2-risk":{ label:"Risk Taking", level:"B2", keys:["risk","uncertainty","risco","gamble","decision"], exercises:[
    {id:"b2-risk-complete-001",type:"fill_blank",question:"The downside was limited, ___ the upside was not.",correct:"whereas"},
    {id:"b2-risk-complete-002",type:"fill_blank",question:"They went ahead ___ the warnings.",correct:"despite"},
    {id:"b2-risk-complete-003",type:"fill_blank",question:"Should the deal fall ___, we still keep the contract.",correct:"through"},
    {id:"b2-risk-mc-004",type:"multiple_choice",question:"___ anything go wrong, we can revert within a day.",options:["If","Had","Were","Should"],correct:3},
    {id:"b2-risk-mc-005",type:"multiple_choice",question:"People consistently overestimate rare risks ___ underestimating common ones.",options:["while","during","despite","however"],correct:0},
    {id:"b2-risk-mc-006",type:"multiple_choice",question:"It's worth ___ the smallest possible version first.",options:["to try","trying","try","tried"],correct:1},
    {id:"b2-risk-fix-007",type:"fix",question:"I prefer to not take risks in my career.",correct:"I prefer not to take risks in my career."},
    {id:"b2-risk-fix-008",type:"fix",question:"Is more risky than it looks.",correct:"It is riskier than it looks."},
    {id:"b2-risk-transform-009",type:"transform",question:"Use inversion with 'should': If anything goes wrong, call me.",correct:"Should anything go wrong, call me."},
    {id:"b2-risk-transform-010",type:"transform",question:"Mixed conditional: We took the safe option, so we're stuck now.",correct:"If we hadn't taken the safe option, we wouldn't be stuck now."},
    {id:"b2-risk-transform-011",type:"transform",question:"Hedge the prediction: The market will collapse.",correct:"There is a real possibility that the market will fall sharply."},
    {id:"b2-risk-question-012",type:"make_question",answer:"Leaving a stable job with no client lined up.",prompt:"Ask about the biggest risk the person has taken.",correct:"What is the biggest risk you have taken?"},
    {id:"b2-risk-dialogue-013",type:"dialogue",
      title:"How much are we willing to lose?",
      context:"Two partners assess a decision.",
      wordBank:["exposure","reversible","worst","assume","cap","gut"],
      lines:[
        {who:"A",text:"What's the ___ case here?"},
        {who:"B",text:"We lose four months and the deposit."},
        {who:"A",text:"Is that ___?"},
        {who:"B",text:"The time isn't. The money we can ___."},
        {who:"A",text:"Then our real ___ is the calendar."},
        {who:"B",text:"My ___ says go, but let's not ___ demand."}
      ],
      answers:["worst","reversible","cap","exposure","gut","assume"]},
    {id:"b2-risk-sentence-014",type:"make_sentence",
      instruction:"Choose a verb and talk about risk in a real situation.",
      verbs:[
        {v:"gamble",    id:"b2-risk-sentence-gamble-001"},
        {v:"hedge",     id:"b2-risk-sentence-hedge-001"},
        {v:"anticipate",id:"b2-risk-sentence-anticipate-001"},
        {v:"expose",    id:"b2-risk-sentence-expose-001"},
        {v:"weigh up",  id:"b2-risk-sentence-weighup-001"},
        {v:"back out",  id:"b2-risk-sentence-backout-001"},
        {v:"commit",    id:"b2-risk-sentence-commit-001"},
        {v:"mitigate",  id:"b2-risk-sentence-mitigate-001"}
      ]}
  ]},

  "b2-ethics":{ label:"Ethics", level:"B2", keys:["ethics","moral","etica","dilemma","right and wrong"], exercises:[
    {id:"b2-ethics-complete-001",type:"fill_blank",question:"He was faced ___ a genuine dilemma.",correct:"with"},
    {id:"b2-ethics-complete-002",type:"fill_blank",question:"Whether the outcome justifies the method ___ (remain) open to debate.",correct:"remains"},
    {id:"b2-ethics-complete-003",type:"fill_blank",question:"Nowhere ___ the policy mention who is accountable.",correct:"does"},
    {id:"b2-ethics-mc-004",type:"multiple_choice",question:"He should ___ told them before signing.",options:["to have","of","have","had"],correct:2},
    {id:"b2-ethics-mc-005",type:"multiple_choice",question:"___ his intentions were good, the effect was harmful.",options:["Despite","However","In spite","Although"],correct:3},
    {id:"b2-ethics-mc-006",type:"multiple_choice",question:"She was accused ___ withholding information.",options:["of","for","with","to"],correct:0},
    {id:"b2-ethics-fix-007",type:"fix",question:"Is not ethic to use this data.",correct:"It is not ethical to use this data."},
    {id:"b2-ethics-fix-008",type:"fix",question:"He should of asked permission first.",correct:"He should have asked permission first."},
    {id:"b2-ethics-transform-009",type:"transform",question:"Use inversion with 'nowhere': The policy mentions accountability nowhere.",correct:"Nowhere does the policy mention accountability."},
    {id:"b2-ethics-transform-010",type:"transform",question:"Use a past modal of criticism: He signed without reading it.",correct:"He shouldn't have signed it without reading it."},
    {id:"b2-ethics-transform-011",type:"transform",question:"Use the impersonal passive: Many people think the rule is unfair.",correct:"The rule is widely thought to be unfair."},
    {id:"b2-ethics-question-012",type:"make_question",answer:"Because refusing would have cost someone else their job.",prompt:"Ask why the decision was difficult.",correct:"Why was the decision so difficult?"},
    {id:"b2-ethics-dialogue-013",type:"dialogue",
      title:"The uncomfortable email",
      context:"Deciding whether to report something.",
      wordBank:["obliged","technically","spirit","conflict","raise","harm"],
      lines:[
        {who:"A",text:"___, nothing was broken."},
        {who:"B",text:"Technically, no. But not in the ___ of the rule."},
        {who:"A",text:"Are we ___ to report it?"},
        {who:"B",text:"There's a clear ___ of interest."},
        {who:"A",text:"Reporting it would ___ someone who did nothing wrong."},
        {who:"B",text:"Then let's ___ it privately first."}
      ],
      answers:["Technically","spirit","obliged","conflict","harm","raise"]},
    {id:"b2-ethics-sentence-014",type:"make_sentence",
      instruction:"Choose a verb and describe an ethical situation.",
      verbs:[
        {v:"disclose",  id:"b2-ethics-sentence-disclose-001"},
        {v:"justify",   id:"b2-ethics-sentence-justify-001"},
        {v:"withhold",  id:"b2-ethics-sentence-withhold-001"},
        {v:"compromise",id:"b2-ethics-sentence-compromise-001"},
        {v:"report",    id:"b2-ethics-sentence-report-001"},
        {v:"weigh",     id:"b2-ethics-sentence-weigh-001"},
        {v:"refuse",    id:"b2-ethics-sentence-refuse-001"},
        {v:"hold accountable",id:"b2-ethics-sentence-holdaccountable-001"}
      ]}
  ]},

  "b2-communication":{ label:"Communication", level:"B2", keys:["communication","message","comunicacao","tone","clarity"], exercises:[
    {id:"b2-communication-complete-001",type:"fill_blank",question:"What she meant was clear; how she said it ___ not.",correct:"was"},
    {id:"b2-communication-complete-002",type:"fill_blank",question:"He came ___ as dismissive, though he didn't intend to.",correct:"across"},
    {id:"b2-communication-complete-003",type:"fill_blank",question:"Only when I rewrote it ___ the point become obvious.",correct:"did"},
    {id:"b2-communication-mc-004",type:"multiple_choice",question:"The message was open to interpretation, ___ caused the problem.",options:["that","which","what","who"],correct:1},
    {id:"b2-communication-mc-005",type:"multiple_choice",question:"I'd rather you ___ that in writing.",options:["put","would put","had put","putting"],correct:2},
    {id:"b2-communication-mc-006",type:"multiple_choice",question:"She apologised for ___ interrupted him.",options:["have","had","has","having"],correct:3},
    {id:"b2-communication-fix-007",type:"fix",question:"He explained me the whole situation.",correct:"He explained the whole situation to me."},
    {id:"b2-communication-fix-008",type:"fix",question:"I want to say that maybe possibly we could think about changing a small thing.",correct:"I think we should change one thing."},
    {id:"b2-communication-transform-009",type:"transform",question:"Use inversion with 'only when': The point became obvious only when I rewrote it.",correct:"Only when I rewrote it did the point become obvious."},
    {id:"b2-communication-transform-010",type:"transform",question:"Soften without losing the message: Your report is confusing.",correct:"I found parts of the report hard to follow."},
    {id:"b2-communication-transform-011",type:"transform",question:"Use a cleft sentence: The tone, not the content, upset them.",correct:"It was the tone, not the content, that upset them."},
    {id:"b2-communication-question-012",type:"make_question",answer:"That I say 'just' too often and it weakens everything.",prompt:"Ask about feedback the person received on their communication.",correct:"What feedback have you had about the way you communicate?"},
    {id:"b2-communication-dialogue-013",type:"dialogue",
      title:"That's not what I meant",
      context:"Repairing a misunderstanding after a message.",
      wordBank:["across","landed","intended","phrase","assume","reading"],
      lines:[
        {who:"A",text:"I think my message ___ badly."},
        {who:"B",text:"It came ___ as an order, yes."},
        {who:"A",text:"That's not how I ___ it."},
        {who:"B",text:"I know you well enough not to ___ the worst."},
        {who:"A",text:"Others were ___ it without that context, though."},
        {who:"B",text:"Next time, ___ it as a question."}
      ],
      answers:["landed","across","intended","assume","reading","phrase"]},
    {id:"b2-communication-sentence-014",type:"make_sentence",
      instruction:"Choose a verb and say something about communicating well.",
      verbs:[
        {v:"clarify",     id:"b2-communication-sentence-clarify-001"},
        {v:"rephrase",    id:"b2-communication-sentence-rephrase-001"},
        {v:"interrupt",   id:"b2-communication-sentence-interrupt-001"},
        {v:"misinterpret",id:"b2-communication-sentence-misinterpret-001"},
        {v:"acknowledge", id:"b2-communication-sentence-acknowledge-001"},
        {v:"summarise",   id:"b2-communication-sentence-summarise-001"},
        {v:"push back",   id:"b2-communication-sentence-pushback-001"},
        {v:"listen",      id:"b2-communication-sentence-listen-001"}
      ]}
  ]},

  "b2-leadership":{ label:"Leadership", level:"B2", keys:["leadership","manager","lideranca","team","authority"], exercises:[
    {id:"b2-leadership-complete-001",type:"fill_blank",question:"A good manager knows when to step ___ and let the team decide.",correct:"back"},
    {id:"b2-leadership-complete-002",type:"fill_blank",question:"Authority ___ (grant); trust is earned.",correct:"is granted"},
    {id:"b2-leadership-complete-003",type:"fill_blank",question:"Not once ___ she take credit for the team's work.",correct:"did"},
    {id:"b2-leadership-mc-004",type:"multiple_choice",question:"The person ___ decisions affect everyone should hear the objections.",options:["whose","which","who","that"],correct:0},
    {id:"b2-leadership-mc-005",type:"multiple_choice",question:"He got the team ___ the deadline by removing two meetings.",options:["meet","to meet","meeting","met"],correct:1},
    {id:"b2-leadership-mc-006",type:"multiple_choice",question:"Leaders are expected ___ decisions with incomplete information.",options:["make","making","to make","to making"],correct:2},
    {id:"b2-leadership-fix-007",type:"fix",question:"He made me to work on Saturday.",correct:"He made me work on Saturday."},
    {id:"b2-leadership-fix-008",type:"fix",question:"A leader must to listen before deciding.",correct:"A leader must listen before deciding."},
    {id:"b2-leadership-transform-009",type:"transform",question:"Use the causative: She arranged for someone to review the process.",correct:"She had the process reviewed."},
    {id:"b2-leadership-transform-010",type:"transform",question:"Use inversion: She never took credit for the team's work.",correct:"Never did she take credit for the team's work."},
    {id:"b2-leadership-transform-011",type:"transform",question:"Nominalise: The manager delegates clearly, and this reduces bottlenecks.",correct:"Clear delegation reduces bottlenecks."},
    {id:"b2-leadership-question-012",type:"make_question",answer:"That saying 'I don't know' in front of the team costs nothing.",prompt:"Ask what the person learned as a manager.",correct:"What have you learned as a manager?"},
    {id:"b2-leadership-dialogue-013",type:"dialogue",
      title:"Stepping back",
      context:"A new manager and a mentor.",
      wordBank:["delegate","credit","resist","undermines","own","instinct"],
      lines:[
        {who:"A",text:"My ___ is to fix it myself — it's faster."},
        {who:"B",text:"Faster once. It ___ them every time after that."},
        {who:"A",text:"So I ___ and accept a worse first version?"},
        {who:"B",text:"You accept a different one, and let them ___ it."},
        {who:"A",text:"And when it works?"},
        {who:"B",text:"You ___ the urge to take the ___."}
      ],
      answers:["instinct","undermines","delegate","own","resist","credit"]},
    {id:"b2-leadership-sentence-014",type:"make_sentence",
      instruction:"Choose a verb and say something about leading people.",
      verbs:[
        {v:"delegate",  id:"b2-leadership-sentence-delegate-001"},
        {v:"empower",   id:"b2-leadership-sentence-empower-001"},
        {v:"hold",      id:"b2-leadership-sentence-hold-001"},
        {v:"admit",     id:"b2-leadership-sentence-admit-001"},
        {v:"prioritise",id:"b2-leadership-sentence-prioritise-001"},
        {v:"shield",    id:"b2-leadership-sentence-shield-001"},
        {v:"confront",  id:"b2-leadership-sentence-confront-001"},
        {v:"step back", id:"b2-leadership-sentence-stepback-001"}
      ]}
  ]},

  /* ---- B2 · Reading ---- */

  "b2-ai-reading":{ label:"↳ Artificial Intelligence · Reading", level:"B2", keys:["reading","ai"],
    groupId:"b2-ai-reading-group-001",
    passage:{ level:"B2", title:"The Confidence Problem",
      text:"The most discussed weakness of current language models is that they produce fluent text about things that never happened. What makes this dangerous is not the error itself — humans are wrong constantly — but the absence of any signal that an error has occurred. A person who is unsure hesitates, hedges, or asks a question. A model produces the same confident rhythm whether it is quoting a real study or inventing one. Several teams are now working on calibration: making the system express uncertainty in a way that matches how often it is actually right. Until that works reliably, the practical advice is unglamorous. Treat the output as a first draft written by someone who has read everything and remembers nothing precisely."},
    exercises:[
      {id:"b2-ai-reading-mc-001",type:"multiple_choice",question:"According to the text, what is the real problem?",
        options:["The models are often wrong","They refuse to answer","They are too slow","There is no signal that they are wrong"],correct:3},
      {id:"b2-ai-reading-mc-002",type:"multiple_choice",question:"What does 'calibration' mean here?",
        options:["Matching expressed confidence to actual accuracy","Making the model faster","Training on more data","Reducing the cost"],correct:0},
      {id:"b2-ai-reading-complete-003",type:"fill_blank",question:"A person who is unsure hesitates, ___, or asks a question.",correct:"hedges"},
      {id:"b2-ai-reading-transform-004",type:"transform",question:"Use a cleft sentence: The absence of a signal is dangerous, not the error.",correct:"What is dangerous is the absence of a signal, not the error."},
      {id:"b2-ai-reading-mc-005",type:"multiple_choice",question:"The final comparison suggests the output should be treated as...",
        options:["a finished source","a starting point to be checked","a personal opinion","a translation"],correct:1},
      {id:"b2-ai-reading-mc-006",type:"multiple_choice",question:"The writer's tone is best described as...",
        options:["alarmed","dismissive","measured and practical","enthusiastic"],correct:2}
    ]
  },

  "b2-remote-reading":{ label:"↳ Remote Work · Reading", level:"B2", keys:["reading","remote"],
    groupId:"b2-remote-reading-group-001",
    passage:{ level:"B2", title:"What the Office Was Actually For",
      text:"When companies sent everyone home, they measured what was easy to measure: tickets closed, calls made, documents delivered. By those numbers, almost nothing changed. What the numbers could not capture was the slower loss — the junior developer who no longer overheard how a senior colleague talked to a difficult client, the half-formed idea that used to survive because someone repeated it in a corridor. Two years later, several of those companies rebuilt parts of the office not as a place to work but as a place to be seen working alongside others. Whether that justifies the rent is a separate argument, and one that finance departments are increasingly unwilling to lose."},
    exercises:[
      {id:"b2-remote-reading-mc-001",type:"multiple_choice",question:"What does the writer say about the early measurements?",
        options:["They were falsified","They were never taken","They showed a sharp drop","They missed what was hard to measure"],correct:3},
      {id:"b2-remote-reading-complete-002",type:"fill_blank",question:"The junior developer no longer ___ how a senior colleague talked to clients.",correct:"overheard"},
      {id:"b2-remote-reading-mc-003",type:"multiple_choice",question:"Why did some companies rebuild parts of the office?",
        options:["As a place to work alongside others","To reduce costs","To store equipment","Because of regulation"],correct:0},
      {id:"b2-remote-reading-transform-004",type:"transform",question:"Use a concessive clause: Output stayed the same. Something was still lost.",correct:"Although output stayed the same, something was still lost."},
      {id:"b2-remote-reading-mc-005",type:"multiple_choice",question:"In the text, \"unwilling to lose\" refers to finance departments and...",
        options:["the hiring process","the rent argument","the office design","the software budget"],correct:1},
      {id:"b2-remote-reading-mc-006",type:"multiple_choice",question:"What is the writer's position?",
        options:["Remote work failed","Offices should be abolished","The trade-offs are real and unresolved","Productivity is the only measure"],correct:2}
    ]
  },

  "b2-privacy-reading":{ label:"↳ Privacy · Reading", level:"B2", keys:["reading","privacy"],
    groupId:"b2-privacy-reading-group-001",
    passage:{ level:"B2", title:"Consent, in Theory",
      text:"Consent is the legal foundation of most data protection, and it is close to fictional. A study of the terms attached to a single mid-range phone found that reading them all at normal speed would take longer than a working week. Nobody does this, and the law does not really expect them to. What consent achieves in practice is a transfer of responsibility: once you have clicked, any harm becomes a consequence of your choice. Some regulators have started to treat certain uses as impermissible regardless of consent — the reasoning being that a right you can be asked to sign away every morning is not much of a right."},
    exercises:[
      {id:"b2-privacy-reading-mc-001",type:"multiple_choice",question:"Why does the writer call consent 'close to fictional'?",
        options:["The forms are illegal","Consent is not required","Companies never ask","Nobody can realistically read the terms"],correct:3},
      {id:"b2-privacy-reading-complete-002",type:"fill_blank",question:"Consent in practice achieves a transfer ___ responsibility.",correct:"of"},
      {id:"b2-privacy-reading-mc-003",type:"multiple_choice",question:"What have some regulators started doing?",
        options:["Banning certain uses whatever the user agreed","Shortening the terms","Fining users","Removing consent forms"],correct:0},
      {id:"b2-privacy-reading-transform-004",type:"transform",question:"Use the impersonal passive: People argue that consent shifts blame to the user.",correct:"It is argued that consent shifts blame to the user."},
      {id:"b2-privacy-reading-mc-005",type:"multiple_choice",question:"The final sentence suggests that a right which can be signed away daily is...",
        options:["well protected","not really a right","easy to enforce","unnecessary"],correct:1},
      {id:"b2-privacy-reading-mc-006",type:"multiple_choice",question:"Which title fits the argument best?",
        options:["How to Read Terms Quickly","Why Phones Are Expensive","The Limits of Clicking 'I Agree'","A History of Data Law"],correct:2}
    ]
  },

  "b2-success-reading":{ label:"↳ Success & Failure · Reading", level:"B2", keys:["reading","success"],
    groupId:"b2-success-reading-group-001",
    passage:{ level:"B2", title:"The Ones Who Are Not Interviewed",
      text:"Business advice has a structural problem: it is written about companies that survived. Ten founders take the same risk; one becomes a case study and the other nine are not asked what they did. The surviving founder describes decisions that felt bold at the time, and readers conclude that boldness works. Had the coin landed differently, the same decisions would be quoted as recklessness. This does not mean judgement is irrelevant — some choices really are better than others — but it does mean that a single success is weak evidence for the method behind it. The uncomfortable version is that the most useful interviews would be with the nine, and nobody wants to read them."},
    exercises:[
      {id:"b2-success-reading-mc-001",type:"multiple_choice",question:"What is the 'structural problem' the writer identifies?",
        options:["Advice is too long","Readers are lazy","Founders lie","Only survivors are studied"],correct:3},
      {id:"b2-success-reading-complete-002",type:"fill_blank",question:"___ the coin landed differently, the same decisions would be called recklessness.",correct:"Had"},
      {id:"b2-success-reading-mc-003",type:"multiple_choice",question:"Does the writer think judgement is irrelevant?",
        options:["No, but a single success proves little","Yes, entirely","Yes, only luck matters","The text does not say"],correct:0},
      {id:"b2-success-reading-transform-004",type:"transform",question:"Rewrite with inversion: If we had asked the other nine, we would understand more.",correct:"Had we asked the other nine, we would understand more."},
      {id:"b2-success-reading-mc-005",type:"multiple_choice",question:"Why does nobody read interviews with the nine?",
        options:["They are not written","They are less appealing than success stories","They are confidential","They are too technical"],correct:1},
      {id:"b2-success-reading-mc-006",type:"multiple_choice",question:"The phrase \"weak evidence for the method behind it\" means a success...",
        options:["proves the method works","was planned","doesn't prove the method caused it","was inevitable"],correct:2}
    ]
  },

  };

  /* ORDEM DE ENTRADA — o Reading entra logo abaixo do seu tema.
     -----------------------------------------------------------------------
     O seletor lista os temas na ordem em que eles existem no objeto TOPICS.
     Um texto de leitura é um tema próprio por uma razão técnica (o `passage`
     pertence ao tema, não ao exercício), mas pedagogicamente ele é uma parte
     do tema — não um tema paralelo. Então "a1-family-reading" é inserido
     imediatamente depois de "a1-family", e o label leva "↳":

         Family · A1
         ↳ Family · Reading · A1
         Home · A1

     Isto é ordem de inserção, não lógica: nenhuma função do engine muda. */
  function insertionOrder(map) {
    var keys = Object.keys(map), seen = {}, out = [];
    function push(k) { if (!seen[k] && map[k]) { seen[k] = 1; out.push(k); } }
    keys.forEach(function (k) {
      if (/-reading$/.test(k)) return;      // entra junto do seu tema
      push(k);
      push(k + '-reading');
    });
    keys.forEach(push);                     // órfão (tema removido) não se perde
    return out;
  }

  /* Fusão. Só escreve em chave livre — um tema antigo nunca é sobrescrito. */
  var TOPICS = NS.PracticeBank.TOPICS;
  var added = 0, clashes = [];
  insertionOrder(NEW_TOPICS).forEach(function (k) {
    if (Object.prototype.hasOwnProperty.call(TOPICS, k)) { clashes.push(k); return; }
    TOPICS[k] = NEW_TOPICS[k];
    added++;
  });
  if (clashes.length) {
    console.error('[practice-bank-expansion] chaves já existentes, NÃO sobrescritas:', clashes);
  }
  NS.PracticeBank.EXPANSION = { version: '1.0.0', topicsAdded: added, clashes: clashes };

})(typeof window !== 'undefined' ? window : this);
