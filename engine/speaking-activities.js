/* ============================================================
   SPEAKING ENGINE — DADOS (SPEAKING-LAB.md v1.0)
   Só conteúdo; a lógica vive em speaking-engine.js.
   6 atividades migradas (fichas §14: 14.1, 14.6, 14.8, 14.13,
   14.17, 14.18). As demais 14 migram gradualmente, como no
   Grammar Engine. {name} = aluno · {theme} = tema (G7).
   ============================================================ */

/* ---- Bancos de follow-up (§8) — referenciados, nunca duplicados ---- */
const SPEAKING_FOLLOWUP_BANKS={
  Opinion:['Do you like it? Why?','Good idea or bad idea?','Which one would YOU choose?'],
  Description:['What else do you see?','What color / how big?','Who is there? Where?'],
  Comparison:['Which one is better? Why?','And in Brazil?','Same or different at your house?'],
  Narration:['And then?','What happened after that?','How did it end?'],
  Justification:['Why?','Why not the other one?','Give me one more reason.'],
  Expansion:['Tell me more.','Give me one more example.','Keep going — one more sentence.'],
  Personalization:['And you?','Does this happen in YOUR house?','When did YOU last do this?'],
  Repair:['What do you mean?','Explain it another way.','Say it again — slower.']
};

/* ---- Catálogo de competências (§11) — floors e dependências (P6) ---- */
const SPEAKING_COMPETENCES=[
  {c:'Description',lo:1},{c:'Comparison',lo:1},{c:'Interaction',lo:1},
  {c:'Narration',lo:2,dep:'past simple'},{c:'Negotiation',lo:2,dep:'present simple'},
  {c:'Opinion',lo:2,dep:'present simple'},{c:'Explanation',lo:2,dep:'present simple'},
  {c:'Instruction',lo:2,dep:'imperativo'},{c:'Circumlocution',lo:2,dep:'present simple'},
  {c:'Prediction',lo:2,dep:'going to / will'},{c:'Evaluation',lo:2,dep:'comparatives'},
  {c:'Fluency',lo:2,dep:'present simple'},{c:'Question Formation',lo:2,dep:'do/does questions'},
  {c:'Argumentation',lo:3,dep:'nível B1'},{c:'Persuasion',lo:3,dep:'nível B1'},
  {c:'Task Completion',lo:2,dep:'present simple',meta:true}
];

/* ---- Temas (§13): oferecem slots; nunca carregam lógica (AX2) ----
   assets: pendência oficial nº1 do SPEAKING-LAB.md §22 — placeholders. */
const SPEAKING_THEMES=[
  {id:'food',   n:'Comida',  offers:['scene','object-set','options','pair-diff','sequence']},
  {id:'travel', n:'Viagem',  offers:['scene','object-set','options','pair-diff']},
  {id:'family', n:'Família', offers:['scene','options']},
  {id:'routine',n:'Rotina',  offers:['scene','sequence','options']},
  {id:'animals',n:'Animais', offers:['scene','object-set','pair-diff','options']},
  {id:'work',   n:'Trabalho',offers:['scene','object-set','options']}
];

/* ---- Atividades (fichas §14 — camada pedagógica + operacional) ---- */
const SPEAKING_ACTIVITIES=[
{ id:'picture-description', n:'Picture Description', comp:'Description',
  lo:1, hi:4, slot:'scene', req:['scene'], stt:'3–5 min', tt:'Low', diff:2,
  goals:['Fluency','Vocabulary'], profiles:['Kids','Teens','Adults'],
  deps:['verb to be'],
  purpose:'Descrever a cena de {theme} até cobrir 5 informações diferentes.',
  evid:'Descrição contínua com ≥5 informações distintas',
  check:['pessoas/animais','lugar','2+ ações','1 detalhe (cor/tamanho)','sem monossílabos'],
  brief:'Deixe explorar sozinho(a) primeiro. Você só reage: "Really? What else?"',
  banks:['Description','Expansion','Personalization'],
  compl:'Você "não entendeu" 2 informações — {name} reformula sem repetir igual.',
  rescue:['point...','colors?','who? where?'],
  simple:'Reduza para 3 informações — a missão continua, menor (R3).',
  reform:'"Look here — who is this? What is he doing?"',
  kid:'A cena tem um absurdo escondido para achar!', adult:'Cena do cotidiano/trabalho.'},

{ id:'role-play', n:'Role Play', comp:'Interaction',
  lo:1, hi:5, slot:null, req:[], stt:'4–6 min', tt:'Medium', diff:3,
  ttWhy:'a professora é o outro papel — sem interlocutor não há interação (ficha 14.6)',
  goals:['Fluency','Confidence'], profiles:['Kids','Teens','Adults'],
  deps:['verb to be'],
  purpose:'Cenário de {theme}: resolver a situação com a professora no outro papel, até o objetivo cumprido.',
  evid:'Diálogo até o propósito + 2 iniciativas próprias',
  check:['entrou no papel','respondeu tudo','1ª iniciativa','2ª iniciativa','objetivo cumprido'],
  brief:'Você é o outro papel. Não facilite: peça esclarecimento 1x.',
  banks:['Repair','Expansion'],
  compl:'Algo dá errado no meio (perdeu, quebrou, acabou) — classe Survival.',
  rescue:['ask for...','how much...?','can I...?'],
  simple:'Reduza o cenário a 1 etapa única (pedir e receber).',
  reform:'"OK — you want... what? Tell me one thing."',
  kid:'Faz-de-conta com missão e personagens.', adult:'Situação real da vida de {name} (P5).'},

{ id:'opinion-builder', n:'Opinion Builder', comp:'Opinion',
  lo:2, hi:4, slot:null, req:[], stt:'3–5 min', tt:'Low', diff:2,
  goals:['Fluency','Confidence'], profiles:['Kids','Teens','Adults'],
  deps:['present simple'],
  purpose:'Sua opinião sobre {theme}: posição + 2 razões + 1 exemplo seu.',
  evid:'Opinião + 2 justificativas + 1 exemplo pessoal',
  check:['posição clara','razão 1','razão 2','exemplo pessoal'],
  brief:'Reaja ao conteúdo antes da forma. Discorde só no fim, 1x.',
  banks:['Justification','Personalization','Expansion'],
  compl:'Você discorda de UMA razão — {name} reforça ou troca a razão.',
  rescue:['I think...','because...','for example...'],
  simple:'Aceite 1 razão + 1 exemplo.',
  reform:'"Simple: good or bad? ... Why?"',
  kid:'Opiniões do universo dele(a) — desenhos, comidas.', adult:'Temas do cotidiano adulto.'},

{ id:'one-minute-talk', n:'One Minute Talk', comp:'Fluency',
  lo:2, hi:5, slot:null, req:[], stt:'2–4 min', tt:'Low', diff:3,
  goals:['Fluency'], profiles:['Kids','Teens','Adults'],
  deps:['present simple'],
  purpose:'Falar de {theme} sem parar pelo tempo-alvo (A2 ~45s · B1 ~75s — TODO-4: calibração).',
  evid:'Tempo-alvo com ≤3 pausas longas, sem PT',
  check:['começou sem ajuda','passou da metade','≤3 pausas longas','zero português'],
  brief:'Você só cronometra e reage com o rosto. Follow-ups SÓ depois do tempo.',
  banks:['Expansion'],
  compl:'3 palavras do tema sorteadas para encaixar na fala.',
  rescue:['another thing is...','also...','I remember...'],
  simple:'Corte o tempo-alvo pela metade.',
  reform:'"Start with: Every day, I..."',
  kid:'30 segundos + tema muito concreto.', adult:'Tema do repertório dele(a), tempo progressivo.'},

{ id:'guess-the-object', n:'Guess the Object', comp:'Circumlocution',
  lo:2, hi:4, slot:'object-set', req:['object-set'], stt:'3–5 min', tt:'Low', diff:2,
  goals:['Vocabulary','Confidence'], profiles:['Kids','Teens','Adults'],
  deps:['present simple'],
  purpose:'Descrever 4 itens de {theme} SEM dizer a palavra — até a professora adivinhar 3.',
  evid:'3 de 4 adivinhados sem a palavra-alvo',
  check:['item 1','item 2','item 3','item 4 (bônus)'],
  brief:'Adivinhe devagar de propósito — o esforço dele(a) é o exercício.',
  banks:['Description','Repair'],
  compl:'Palavra proibida extra no item 4.',
  rescue:['it’s a thing for...','you use it when...','it looks like...'],
  simple:'Libere gestos como apoio (Kids).',
  reform:'"Is it big? Do you eat it? Where is it?"',
  kid:'Objetos do universo dele(a) + mímica como último socorro.', adult:'Itens do cotidiano/trabalho.'},

{ id:'interview', n:'Interview', comp:'Interaction',
  lo:1, hi:4, slot:null, req:[], stt:'4–6 min', tt:'Medium', diff:2,
  ttWhy:'responder é o input da entrevista (ficha 14.18)',
  goals:['Fluency','Confidence'], profiles:['Kids','Teens','Adults'],
  deps:['verb to be'],
  purpose:'Entrevistar a professora sobre {theme}: 6 perguntas — 2 nascidas das respostas dela.',
  evid:'6 perguntas com 2 follow-ups genuínos',
  check:['perguntas 1–3','perguntas 4–6','follow-up genuíno 1','follow-up genuíno 2'],
  brief:'Dê respostas com ganchos ("...but that\'s a secret") e espere {name} morder.',
  banks:['Expansion','Personalization'],
  compl:'Dê uma resposta absurda — a entrevista precisa investigá-la.',
  rescue:['What...?','Do you...?','When...?'],
  simple:'Aceite 4 perguntas + 1 follow-up.',
  reform:'"Ask me: what? where? when?"',
  kid:'Entrevistar um personagem (a professora atua).', adult:'Formato podcast/entrevista profissional.'}
];
