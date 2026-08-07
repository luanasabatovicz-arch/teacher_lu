/* ============================================================
   SPEAKING GAMES — engine (banco + API), separado da interface.
   Filosofia: velocidade em aula. O aluno olha e já fala.
   Nível: A1–A2. Sem discussão, sem prompts longos.
   Exposto em window.SPEAKING_GAMES; a página speaking-games.html
   é apenas consumidora (mesmo padrão do resto da plataforma).
   ============================================================ */
(function(){
'use strict';

/* ---------- temas comuns das aulas ---------- */
var THEMES=[
  {id:'family',   name:'Family',        emoji:'👪'},
  {id:'food',     name:'Food',          emoji:'🍎'},
  {id:'animals',  name:'Animals',       emoji:'🐶'},
  {id:'school',   name:'School',        emoji:'🎒'},
  {id:'house',    name:'House',         emoji:'🏠'},
  {id:'routine',  name:'Daily Routine', emoji:'⏰'},
  {id:'jobs',     name:'Jobs',          emoji:'👩‍⚕️'},
  {id:'weather',  name:'Weather',       emoji:'⛅'},
  {id:'transport',name:'Transportation',emoji:'🚌'},
  {id:'clothes',  name:'Clothes',       emoji:'👕'},
  {id:'sports',   name:'Sports',        emoji:'⚽'},
  {id:'hobbies',  name:'Hobbies',       emoji:'🎨'}
];

/* ============================================================
   BANCOS DE CONTEÚDO (por jogo). Cada item pode ter:
   lvl:'A1'|'A2'  ·  theme:<id>  ·  campos próprios do jogo.
   ============================================================ */

/* 1) Complete the Sentence — o aluno completa em voz alta com a própria vida */
var COMPLETE=[
  {lvl:'A1',theme:'family',  q:'In my family there is ______.'},
  {lvl:'A1',theme:'family',  q:'My mother is ______.'},
  {lvl:'A2',theme:'family',  q:'My favourite person in my family is ______ because ______.'},
  {lvl:'A1',theme:'food',    q:'My favourite food is ______.'},
  {lvl:'A1',theme:'food',    q:'For breakfast I eat ______.'},
  {lvl:'A2',theme:'food',    q:'I never eat ______ because ______.'},
  {lvl:'A1',theme:'animals', q:'My favourite animal is ______.'},
  {lvl:'A1',theme:'animals', q:'A ______ is a big animal.'},
  {lvl:'A2',theme:'animals', q:'If I had a pet, I would have ______.'},
  {lvl:'A1',theme:'school',  q:'My favourite subject is ______.'},
  {lvl:'A2',theme:'school',  q:'At school I am good at ______ but not at ______.'},
  {lvl:'A1',theme:'house',   q:'In my bedroom there is ______.'},
  {lvl:'A2',theme:'house',   q:'The best room in my house is the ______ because ______.'},
  {lvl:'A1',theme:'routine', q:'Every morning I ______.'},
  {lvl:'A1',theme:'routine', q:'At night, before bed, I ______.'},
  {lvl:'A2',theme:'routine', q:'On weekends I usually ______.'},
  {lvl:'A1',theme:'jobs',    q:'I want to be a ______.'},
  {lvl:'A2',theme:'jobs',    q:'A ______ is a person who ______.'},
  {lvl:'A1',theme:'weather', q:'Today the weather is ______.'},
  {lvl:'A2',theme:'weather', q:'When it rains, I like to ______.'},
  {lvl:'A1',theme:'transport',q:'I go to school by ______.'},
  {lvl:'A2',theme:'transport',q:'My favourite way to travel is ______ because ______.'},
  {lvl:'A1',theme:'clothes', q:'Today I am wearing ______.'},
  {lvl:'A2',theme:'clothes', q:'When it is cold, I wear ______.'},
  {lvl:'A1',theme:'sports',  q:'My favourite sport is ______.'},
  {lvl:'A2',theme:'sports',  q:'I am good at ______, but I can’t play ______.'},
  {lvl:'A1',theme:'hobbies', q:'In my free time I like ______.'},
  {lvl:'A2',theme:'hobbies', q:'On a perfect day off, I would ______.'}
];

/* 2) Unscramble — o aluno diz a frase na ordem certa (mostra a resposta depois) */
var UNSCRAMBLE=[
  {lvl:'A1',theme:'family',  scr:['sister','have','I','a'],            a:'I have a sister.'},
  {lvl:'A1',theme:'family',  scr:['is','my','tall','brother'],         a:'My brother is tall.'},
  {lvl:'A1',theme:'food',    scr:['like','I','pizza'],                 a:'I like pizza.'},
  {lvl:'A2',theme:'food',    scr:['every','I','morning','coffee','drink'], a:'I drink coffee every morning.'},
  {lvl:'A1',theme:'animals', scr:['dog','is','my','big'],              a:'My dog is big.'},
  {lvl:'A2',theme:'animals', scr:['are','cats','sleeping','the'],      a:'The cats are sleeping.'},
  {lvl:'A1',theme:'school',  scr:['a','I','student','am'],             a:'I am a student.'},
  {lvl:'A2',theme:'school',  scr:['at','starts','eight','school'],     a:'School starts at eight.'},
  {lvl:'A1',theme:'house',   scr:['a','there','sofa','is'],            a:'There is a sofa.'},
  {lvl:'A1',theme:'routine', scr:['up','at','I','seven','wake'],       a:'I wake up at seven.'},
  {lvl:'A2',theme:'routine', scr:['breakfast','I','have','then'],      a:'Then I have breakfast.'},
  {lvl:'A1',theme:'jobs',    scr:['a','she','teacher','is'],           a:'She is a teacher.'},
  {lvl:'A1',theme:'weather', scr:['is','it','today','sunny'],          a:'It is sunny today.'},
  {lvl:'A2',theme:'weather', scr:['going','it','rain','to','is'],      a:'It is going to rain.'},
  {lvl:'A1',theme:'transport',scr:['by','go','I','bus'],              a:'I go by bus.'},
  {lvl:'A1',theme:'clothes', scr:['a','wearing','I','am','shirt'],     a:'I am wearing a shirt.'},
  {lvl:'A1',theme:'sports',  scr:['football','play','I'],             a:'I play football.'},
  {lvl:'A2',theme:'sports',  scr:['tennis','she','well','plays'],      a:'She plays tennis well.'},
  {lvl:'A1',theme:'hobbies', scr:['music','I','to','listen'],         a:'I listen to music.'},
  {lvl:'A2',theme:'hobbies', scr:['reading','love','books','I'],       a:'I love reading books.'}
];

/* 3) Quick Questions — pergunta rápida, o aluno responde falando */
var QUESTIONS=[
  {lvl:'A1',theme:'family',  q:'How many people are in your family?'},
  {lvl:'A1',theme:'family',  q:'What is your mother’s name?'},
  {lvl:'A2',theme:'family',  q:'Who do you look like in your family?'},
  {lvl:'A1',theme:'food',    q:'What is your favourite food?'},
  {lvl:'A1',theme:'food',    q:'What did you eat today?'},
  {lvl:'A2',theme:'food',    q:'Can you cook? What can you make?'},
  {lvl:'A1',theme:'animals', q:'Do you have a pet?'},
  {lvl:'A1',theme:'animals', q:'What is your favourite animal?'},
  {lvl:'A2',theme:'animals', q:'Which animal would you never touch? Why?'},
  {lvl:'A1',theme:'school',  q:'What is your favourite subject?'},
  {lvl:'A2',theme:'school',  q:'What time does your school start and finish?'},
  {lvl:'A1',theme:'house',   q:'How many rooms are in your house?'},
  {lvl:'A2',theme:'house',   q:'What is your favourite room? Why?'},
  {lvl:'A1',theme:'routine', q:'What time do you wake up?'},
  {lvl:'A2',theme:'routine', q:'What do you do after school?'},
  {lvl:'A1',theme:'jobs',    q:'What do you want to be?'},
  {lvl:'A2',theme:'jobs',    q:'What job would you never do? Why?'},
  {lvl:'A1',theme:'weather', q:'What is the weather like today?'},
  {lvl:'A2',theme:'weather', q:'What do you do on a rainy day?'},
  {lvl:'A1',theme:'transport',q:'How do you come to your class?'},
  {lvl:'A2',theme:'transport',q:'Do you prefer the bus or a car? Why?'},
  {lvl:'A1',theme:'clothes', q:'What are you wearing today?'},
  {lvl:'A2',theme:'clothes', q:'What do you wear when it is cold?'},
  {lvl:'A1',theme:'sports',  q:'Do you play any sport?'},
  {lvl:'A2',theme:'sports',  q:'Who is your favourite athlete? Why?'},
  {lvl:'A1',theme:'hobbies', q:'What do you like doing in your free time?'},
  {lvl:'A2',theme:'hobbies', q:'What is a hobby you want to try? Why?'}
];

/* 4) Guess the Word — o aluno DESCREVE a palavra (sem dizer!) para o outro adivinhar.
   clues = pistas de apoio (para consulta). */
var GUESS=[
  {lvl:'A1',theme:'family',  w:'brother',  e:'👦', clues:['a boy in your family','not your sister','your parents’ son']},
  {lvl:'A1',theme:'family',  w:'baby',     e:'👶', clues:['very small','it cries','it can’t walk yet']},
  {lvl:'A1',theme:'food',    w:'banana',   e:'🍌', clues:['a fruit','it is yellow','monkeys love it']},
  {lvl:'A2',theme:'food',    w:'breakfast',e:'🥐', clues:['a meal','you eat it in the morning','the first meal of the day']},
  {lvl:'A1',theme:'animals', w:'elephant', e:'🐘', clues:['a big animal','it is grey','it has a long nose']},
  {lvl:'A1',theme:'animals', w:'fish',     e:'🐟', clues:['it lives in water','it can swim','you can eat it']},
  {lvl:'A2',theme:'animals', w:'penguin',  e:'🐧', clues:['a bird','it can’t fly','it lives where it is cold']},
  {lvl:'A1',theme:'school',  w:'pencil',   e:'✏️', clues:['you use it to write','it is small','you can erase it']},
  {lvl:'A2',theme:'school',  w:'teacher',  e:'👩‍🏫', clues:['a person','they work at school','they help you learn']},
  {lvl:'A1',theme:'house',   w:'bed',      e:'🛏️', clues:['furniture','it is in the bedroom','you sleep on it']},
  {lvl:'A1',theme:'house',   w:'door',     e:'🚪', clues:['you open and close it','you use it to enter','every room has one']},
  {lvl:'A1',theme:'jobs',    w:'doctor',   e:'👨‍⚕️', clues:['a job','they help sick people','they work in a hospital']},
  {lvl:'A2',theme:'jobs',    w:'cook',     e:'👨‍🍳', clues:['a job','they make food','they work in a kitchen']},
  {lvl:'A1',theme:'weather', w:'rain',     e:'🌧️', clues:['weather','water from the sky','you need an umbrella']},
  {lvl:'A2',theme:'weather', w:'snow',     e:'❄️', clues:['weather','white and cold','it falls in winter']},
  {lvl:'A1',theme:'transport',w:'bus',     e:'🚌', clues:['transport','many people ride it','it stops at a bus stop']},
  {lvl:'A2',theme:'transport',w:'airplane',e:'✈️', clues:['transport','it flies','it takes you to other countries']},
  {lvl:'A1',theme:'clothes', w:'shoes',    e:'👟', clues:['clothes','you wear them on your feet','you have two']},
  {lvl:'A1',theme:'clothes', w:'hat',      e:'🧢', clues:['clothes','you wear it on your head','good for the sun']},
  {lvl:'A1',theme:'sports',  w:'ball',     e:'⚽', clues:['you use it in games','it is round','you kick or throw it']},
  {lvl:'A2',theme:'sports',  w:'swimming', e:'🏊', clues:['a sport','you do it in water','you move your arms and legs']},
  {lvl:'A1',theme:'hobbies', w:'music',    e:'🎵', clues:['you listen to it','it has a rhythm','you can dance to it']},
  {lvl:'A2',theme:'hobbies', w:'painting', e:'🎨', clues:['a hobby','you use colours and a brush','you make a picture']}
];

/* 5) Categories — o aluno diz vários itens em voz alta */
var CATEGORIES=[
  {lvl:'A1',theme:'family',  q:'Name 4 people in a family.'},
  {lvl:'A1',theme:'food',    q:'Name 5 fruits.'},
  {lvl:'A1',theme:'food',    q:'Name 4 things you drink.'},
  {lvl:'A2',theme:'food',    q:'Name 5 vegetables.'},
  {lvl:'A1',theme:'animals', q:'Name 5 animals.'},
  {lvl:'A2',theme:'animals', q:'Name 3 animals that live in water.'},
  {lvl:'A1',theme:'school',  q:'Name 4 things in your school bag.'},
  {lvl:'A1',theme:'house',   q:'Name 4 rooms in a house.'},
  {lvl:'A2',theme:'house',   q:'Name 5 things in a kitchen.'},
  {lvl:'A1',theme:'routine', q:'Name 3 things you do every morning.'},
  {lvl:'A1',theme:'jobs',    q:'Name 5 jobs.'},
  {lvl:'A1',theme:'weather', q:'Name 4 kinds of weather.'},
  {lvl:'A1',theme:'transport',q:'Name 5 ways to travel.'},
  {lvl:'A1',theme:'clothes', q:'Name 5 clothes.'},
  {lvl:'A2',theme:'clothes', q:'Name 3 things you wear in winter.'},
  {lvl:'A1',theme:'sports',  q:'Name 5 sports.'},
  {lvl:'A1',theme:'hobbies', q:'Name 4 hobbies.'},
  {lvl:'A1',theme:'school',  q:'Name 5 colours.'},
  {lvl:'A1',theme:'routine', q:'Count from 1 to 20.'},
  {lvl:'A2',theme:'routine', q:'Say the days of the week.'}
];

/* 6) This or That — duas opções grandes; o aluno escolhe e diz por quê */
var THISORTHAT=[
  {lvl:'A1',theme:'animals', a:'Dogs',    b:'Cats'},
  {lvl:'A1',theme:'food',    a:'Pizza',   b:'Pasta'},
  {lvl:'A1',theme:'food',    a:'Sweet',   b:'Salty'},
  {lvl:'A1',theme:'weather', a:'Summer',  b:'Winter'},
  {lvl:'A1',theme:'weather', a:'Sun',     b:'Rain'},
  {lvl:'A1',theme:'routine', a:'Morning', b:'Night'},
  {lvl:'A2',theme:'transport',a:'Bus',    b:'Car'},
  {lvl:'A2',theme:'hobbies', a:'Books',   b:'Movies'},
  {lvl:'A1',theme:'sports',  a:'Football',b:'Basketball'},
  {lvl:'A1',theme:'house',   a:'Big house',b:'Small house'},
  {lvl:'A2',theme:'school',  a:'Math',    b:'Art'},
  {lvl:'A1',theme:'food',    a:'Tea',     b:'Coffee'},
  {lvl:'A2',theme:'hobbies', a:'City',    b:'Beach'},
  {lvl:'A1',theme:'clothes', a:'Shoes',   b:'Boots'},
  {lvl:'A2',theme:'transport',a:'Travel by plane',b:'Travel by train'},
  {lvl:'A1',theme:'animals', a:'Big animals',b:'Small animals'}
];

/* 7) Speaking Dice — sortear um comando; o aluno fala sobre o tema */
var DICE=[
  {name:'Talk Dice',   faces:['Name it','Describe it','Do you like it? Why?','Make a sentence','Where do you see it?','Ask me a question']},
  {name:'Story Dice',  faces:['One day...','Then...','Suddenly...','But...','In the end...','And they...']},
  {name:'Grammar Dice',faces:['Say it with I','Say it with She','Make it a question','Make it negative','Add "yesterday"','Add "every day"']}
];

/* 8) Spin and Speak — roda de temas; o aluno fala 20–30s sobre o que sair */
var WHEELS=[
  {name:'My World',   seg:['My family','My best friend','My house','My favourite food','My school','My pet','My weekend','My hobby']},
  {name:'Favourites', seg:['Favourite animal','Favourite sport','Favourite colour','Favourite song','Favourite place','Favourite day','Favourite game','Favourite fruit']},
  {name:'Quick Talk', seg:['My morning','My city','A perfect day','Something I can do','A place I want to visit','My dream job','My last holiday','My favourite season']}
];

/* 9) True or False — o aluno responde e corrige se for falso */
var TRUEFALSE=[
  {lvl:'A1',theme:'animals', q:'A cat has four legs.',           a:true},
  {lvl:'A1',theme:'animals', q:'Fish can fly.',                  a:false},
  {lvl:'A1',theme:'weather', q:'The sun is cold.',               a:false},
  {lvl:'A1',theme:'food',    q:'A banana is a fruit.',           a:true},
  {lvl:'A1',theme:'food',    q:'We drink bread.',                a:false},
  {lvl:'A1',theme:'family',  q:'Your father is a woman.',        a:false},
  {lvl:'A1',theme:'clothes', q:'You wear shoes on your feet.',   a:true},
  {lvl:'A2',theme:'transport',q:'An airplane travels on water.', a:false},
  {lvl:'A2',theme:'school',  q:'A teacher works at a hospital.', a:false},
  {lvl:'A1',theme:'house',   q:'You sleep in the kitchen.',      a:false},
  {lvl:'A1',theme:'sports',  q:'You play football with your hands.',a:false},
  {lvl:'A2',theme:'routine', q:'There are seven days in a week.',a:true},
  {lvl:'A1',theme:'weather', q:'It snows in winter.',            a:true},
  {lvl:'A2',theme:'jobs',    q:'A doctor helps sick people.',    a:true}
];

/* 10) Picture Talk — cena em emoji; o aluno descreve o que vê */
var PICTURE=[
  {lvl:'A1',theme:'house',   e:'🏠🌳☀️🐕'},
  {lvl:'A1',theme:'food',    e:'🍔🍟🥤🍦'},
  {lvl:'A1',theme:'family',  e:'👨👩👧👦'},
  {lvl:'A2',theme:'weather', e:'🌧️☂️🌈🌊'},
  {lvl:'A1',theme:'animals', e:'🐘🦁🐒🐍'},
  {lvl:'A2',theme:'transport',e:'✈️🚗🚌🚲'},
  {lvl:'A1',theme:'school',  e:'🎒✏️📚🍎'},
  {lvl:'A2',theme:'sports',  e:'⚽🏀🎾🏊'},
  {lvl:'A1',theme:'routine', e:'⏰🪥🍳🚌'},
  {lvl:'A2',theme:'hobbies', e:'🎨🎸📷🎮'}
];

/* ============================================================
   METADADOS DOS JOGOS (ordem = ordem na tela)
   t = tipo de render que a interface conhece.
   ============================================================ */
var GAMES=[
  {id:'complete',  name:'Complete the Sentence', emoji:'✍️', tag:'Finish it your way', c1:'#0B3B46',c2:'#0E4B58', t:'prompt',   bank:COMPLETE},
  {id:'questions', name:'Quick Questions',       emoji:'💬', tag:'Answer fast',        c1:'#FF6B6B',c2:'#F45A5A', t:'prompt',   bank:QUESTIONS},
  {id:'unscramble',name:'Unscramble',            emoji:'🔤', tag:'Say it in order',    c1:'#16B1A9',c2:'#12A099', t:'scramble', bank:UNSCRAMBLE},
  {id:'guess',     name:'Guess the Word',        emoji:'🕵️', tag:'Describe it!',       c1:'#F59E0B',c2:'#0B3B46', t:'guess',    bank:GUESS},
  {id:'categories',name:'Categories',            emoji:'📋', tag:'Name them all',      c1:'#22C55E',c2:'#16B1A9', t:'prompt',   bank:CATEGORIES},
  {id:'thisorthat',name:'This or That',          emoji:'⚖️', tag:'Pick & say why',     c1:'#0B3B46',c2:'#16B1A9', t:'duo',      bank:THISORTHAT},
  {id:'dice',      name:'Speaking Dice',         emoji:'🎲', tag:'Roll & speak',       c1:'#FF6B6B',c2:'#0B3B46', t:'dice',     bank:DICE},
  {id:'spin',      name:'Spin and Speak',        emoji:'🎡', tag:'Spin the wheel',     c1:'#0B3B46',c2:'#FF6B6B', t:'wheel',    bank:WHEELS},
  {id:'truefalse', name:'True or False',         emoji:'✅', tag:'True? Correct it!',  c1:'#16B1A9',c2:'#0B3B46', t:'truefalse',bank:TRUEFALSE},
  {id:'picture',   name:'Picture Talk',          emoji:'🖼️', tag:'Describe the scene', c1:'#F59E0B',c2:'#FF6B6B', t:'picture',  bank:PICTURE},
  {id:'random',    name:'Random Challenge',      emoji:'🎁', tag:'Surprise me!',       c1:'#0B3B46',c2:'#16B1A9', t:'random',   bank:null}
];

/* ============================================================
   API
   ============================================================ */
function rnd(n){ return Math.floor(Math.random()*n); }
function filt(bank, level, theme){
  return (bank||[]).filter(function(it){
    return (level==='all'||!it.lvl||it.lvl===level) && (theme==='all'||!it.theme||it.theme===theme);
  });
}
function game(id){ for(var i=0;i<GAMES.length;i++) if(GAMES[i].id===id) return GAMES[i]; return null; }

/* ============================================================
   SORTEIO — "saco embaralhado" por chave (mesmo algoritmo do Class Games).
   Nunca repete até esgotar; ao esgotar, reembaralha sem repetir a última
   do ciclo anterior. Cada combinação (jogo × level × theme) tem seu bag
   independente, então trocar filtro não polui o histórico do filtro anterior.
   ============================================================ */
var bags={};
function shuffleIdx(n){ var a=[],i,j,t; for(i=0;i<n;i++)a.push(i); for(i=n-1;i>0;i--){ j=Math.floor(Math.random()*(i+1)); t=a[i];a[i]=a[j];a[j]=t; } return a; }
function nextFromBag(key, arr){
  if(!arr||!arr.length) return null;
  if(arr.length===1) return arr[0];
  var b=bags[key];
  if(!b || b.n!==arr.length || b.i>=b.order.length){
    var order=shuffleIdx(arr.length);
    if(b && order[0]===b.last){ var s=1+Math.floor(Math.random()*(order.length-1)); var t=order[0];order[0]=order[s];order[s]=t; }
    b={order:order,i:0,n:arr.length,last:(b?b.last:-1)};
    bags[key]=b;
  }
  var idx=b.order[b.i++];
  b.last=idx;
  return arr[idx];
}
function resetBag(key){ delete bags[key]; }

/* draw: retorna {gameId, item} respeitando level/theme; usa shuffle bag
   independente por combinação (jogo, level, theme). */
function draw(id, opts){
  opts=opts||{};
  var level=opts.level||'all', theme=opts.theme||'all';
  var g=game(id); if(!g) return null;
  if(id==='dice'){ return {gameId:id, item:nextFromBag('sg:dice', DICE)}; }
  if(id==='spin'){ return {gameId:id, item:nextFromBag('sg:spin', WHEELS)}; }
  /* Afrouxa filtros quando o cruzamento level+theme retorna um pool
     minúsculo (≤2 itens). Sem esse afrouxamento a professora fica presa
     alternando entre 1 ou 2 frases dentro do mesmo jogo. Só afrouxa se
     o afrouxamento REALMENTE traz variedade — nunca reduz pool. */
  var pool=filt(g.bank, level, theme), keyLvl=level, keyThm=theme;
  if(pool.length<3){
    var r1=filt(g.bank, 'all', theme);                   // afrouxa nível
    if(r1.length>pool.length){ pool=r1; keyLvl='all'; }
  }
  if(pool.length<3){
    var r2=filt(g.bank, keyLvl, 'all');                  // afrouxa tema
    if(r2.length>pool.length){ pool=r2; keyThm='all'; }
  }
  if(pool.length<3){
    var full=g.bank||[];                                 // último recurso: banco inteiro
    if(full.length>pool.length){ pool=full; keyLvl='all'; keyThm='all'; }
  }
  var bagKey='sg:'+id+'|'+keyLvl+'|'+keyThm;
  return {gameId:id, item:nextFromBag(bagKey, pool)};
}

/* random: sorteia um jogo elegível e tira um item dele */
function randomChallenge(opts){
  opts=opts||{};
  var playable=GAMES.filter(function(g){ return g.id!=='random'; });
  // prioriza jogos com itens no filtro atual
  var withItems=playable.filter(function(g){
    if(g.id==='dice'||g.id==='spin') return true;
    return filt(g.bank, opts.level||'all', opts.theme||'all').length>0;
  });
  var listp=withItems.length?withItems:playable;
  var g=listp[rnd(listp.length)];
  return draw(g.id, opts);
}

window.SPEAKING_GAMES={
  themes:THEMES,
  games:GAMES,
  draw:draw,
  random:randomChallenge,
  scramble:function(words){ // embaralha as palavras do Unscramble (nunca na ordem certa)
    if(!words||words.length<2) return (words||[]).slice();
    var a=words.slice(), tries=0, orig=words.join(' ');
    do{ for(var i=a.length-1;i>0;i--){ var j=rnd(i+1); var t=a[i]; a[i]=a[j]; a[j]=t; } tries++; }
    while(a.join(' ')===orig && tries<8);
    return a;
  }
};
})();
