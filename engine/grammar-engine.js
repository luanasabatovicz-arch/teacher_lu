/* ============================================================
   GRAMMAR ENGINE v1 — runtime genérico (GRAMMAR-ENGINE.md)
   A arquitetura nunca muda; só o conteúdo (grammar-topics.js).
   Obedece SLF G1–G10 · 10 seções · portões · camadas C2/C3/C4.
   ============================================================ */
(function(){
'use strict';

/* ---------- constantes da arquitetura (invariantes) ---------- */
const SECTIONS=[
  {id:'goal',    n:'§1', t:'Goal',          time:0.5, color:'#7c3aed'},
  {id:'warmup',  n:'§2', t:'Warm-up',       time:4,   color:'#22c55e'},
  {id:'notice',  n:'§3', t:'Notice',        time:5,   color:'#10b981'},
  {id:'ccq',     n:'§4', t:'CCQs',          time:4,   color:'#f59e0b'},
  {id:'rule',    n:'§5', t:'Rule',          time:3,   color:'#3b82f6'},
  {id:'watchout',n:'§6', t:'Watch out',     time:1.5, color:'#ef4444'},
  {id:'practice',n:'§7', t:'Practice',      time:12,  color:'#ec4899'},
  {id:'makeit',  n:'§8', t:'Make it yours', time:6,   color:'#06b6d4'},
  {id:'task',    n:'§9', t:'Task',          time:10,  color:'#a855f7'},
  {id:'exit',    n:'§10',t:'Exit ticket',   time:5,   color:'#7c3aed'}
];
const GATE_CCQ=4;        // 4/5
const GATE_PRACTICE=10;  // 10/12 (≥80%)
const GATE_EXIT=5;       // 5/6 (≥80%)
const PRACTICE_TYPES={fill:'Fill in',mc:'Choose A/B/C',us:'Unscramble',ec:'Fix the mistake',tr:'Transform'};
// Ordem de corte quando o tempo aperta (§ runtime): C4 → C3 → §7 12→8 → §8 6→4 → §2 3→1.
const CUTS=[
  {k:'c4',   msg:'C4 (extensão da task) cortada.'},
  {k:'c3',   msg:'C3 (prática extra) cortada — se o portão falhar, revisite a Rule e siga.'},
  {k:'p8',   msg:'§7 encolhida: 12 → 8 itens.'},
  {k:'m4',   msg:'§8 encolhida: 6 → 4 stems.'},
  {k:'w1',   msg:'§2 encolhida: 3 → 1 pergunta.'}
];

/* ---------- estado da aula ---------- */
let T=null;       // tópico ativo (dados)
let S=null;       // estado runtime
function freshState(){
  return {
    sec:0, maxSec:0,
    judged:{},           // judged[secId] = {idx:bool}
    ccqRound:1, ccqReserveOn:false, noticeRetry:false, abortAdvised:false,
    c3On:false, c3Items:[], c3Judged:{}, practiceRound:1, conceptGap:false,
    cuts:{}, cutIdx:0,
    secStart:Date.now(), clockTimer:null,
    ruleRevealed:false, weekComplete:null, finished:false
  };
}

/* ---------- pontes com a página (aluno, fila de erros) ---------- */
const env={
  stuName:()=> (typeof window.stuName==='function'?window.stuName():'the student'),
  student:()=>{
    try{
      const id=window.curStu, list=window.STUDENTS_DATA||[];
      return list.find(s=>s.id===id)||null;
    }catch(e){return null;}
  },
  isKid:()=>{const s=env.student();return !!(s&&s.age&&+s.age<=12);},
  queue:()=> (typeof window.getQueue==='function'?window.getQueue():[]),
  logError:(kind,q,a)=>{ if(typeof window.logError==='function')window.logError(kind,q,a); },
  markQueue:(item,ok)=>{
    try{
      const k='errq|'+window.curStu;
      const arr=JSON.parse(localStorage.getItem(k)||'[]');
      const it=arr[item._i];
      if(it){ if(ok)it.rv=1; else it.d=new Date().toISOString().slice(0,10); }
      localStorage.setItem(k,JSON.stringify(arr));
    }catch(e){}
  }
};
function P(s){ return String(s==null?'':s).replace(/\{name\}/g,env.stuName()); }
function esc(s){ return String(s).replace(/'/g,"\\'").replace(/"/g,'&quot;'); }

/* ---------- auditoria de invariância (teste do motor) ---------- */
function audit(t){
  const errs=[];
  const need=(cond,msg)=>{ if(!cond)errs.push(msg); };
  need(t.slots&&t.slots.form&&t.slots.meaning&&t.slots.use&&t.slots.contrast&&t.slots.ptTrap&&t.slots.visual,'6 slots incompletos');
  need(t.notice&&t.notice.examples&&t.notice.examples.length===4,'§3 exige 4 frases-exemplo');
  need(t.notice&&t.notice.hints&&t.notice.hints.length===3,'§3 exige 3 hints em escada');
  need(t.ccqs&&t.ccqs.main&&t.ccqs.main.length===5,'§4 exige 5 CCQs');
  need(t.ccqs&&t.ccqs.reserve&&t.ccqs.reserve.length===3,'§4 exige 3 CCQs reserva');
  need(t.watchout&&t.watchout.length===4,'§6 exige exatamente 4 erros');
  need(t.practice&&t.practice.length===12,'§7 exige 12 itens');
  if(t.practice){
    const c={};t.practice.forEach(p=>c[p.t]=(c[p.t]||0)+1);
    need(c.fill===3&&c.mc===3&&c.us===2&&c.ec===2&&c.tr===2,'§7 ordem fixa: 3 fill · 3 mc · 2 us · 2 ec · 2 tr (encontrado: '+JSON.stringify(c)+')');
    need(t.practice.every(p=>p.hint&&p.fu),'§7: todo item exige hint + follow-up (C2)');
  }
  need(t.makeit&&t.makeit.length===6,'§8 exige 6 stems');
  need(t.task&&t.task.mission&&t.task.roles&&t.task.complication,'§9 exige missão + papéis + complicação');
  need(t.task&&t.task.extras&&t.task.extras.length===2,'§9 exige 2 complicações injetáveis (C2)');
  need(t.exit&&t.exit.length===6,'§10 exige 6 itens');
  if(errs.length)console.warn('[Grammar Engine] Auditoria falhou para "'+t.short+'":\n - '+errs.join('\n - '));
  return errs;
}

/* ---------- UI helpers ---------- */
function bigCard(inner,extra){
  return '<div class="stage" style="border-left-color:'+SECTIONS[S.sec].color+';'+(extra||'')+'">'+inner+'</div>';
}
function judgeBtns(sec,i){
  return '<span style="display:flex;gap:6px;flex-shrink:0">'+
    '<button onclick="GE.judge(\''+sec+'\','+i+',true)" id="ge-y-'+sec+'-'+i+'" class="text-xs px-3 py-1 rounded" style="background:#dcfce7;color:#166534;font-weight:700;border:1px solid #86efac">✓</button>'+
    '<button onclick="GE.judge(\''+sec+'\','+i+',false)" id="ge-n-'+sec+'-'+i+'" class="text-xs px-3 py-1 rounded" style="background:#fee2e2;color:#991b1b;font-weight:700;border:1px solid #fecaca">✗</button></span>';
}
function ansBlock(id,a,extraHtml){
  if(!a)return extraHtml||'';
  return '<button onclick="GE.tg(\''+id+'\')" class="text-xs bg-slate-700 text-white px-3 py-1 rounded" style="margin-left:6px">answer</button>'+
    '<div id="'+id+'" class="answer">✓ '+P(a)+(extraHtml||'')+'</div>';
}
function score(sec){
  const j=S.judged[sec]||{};
  const n=Object.keys(j).length, c=Object.values(j).filter(Boolean).length;
  return {n,c};
}

/* ---------- visual por família ---------- */
function visual(type){
  const line='<div style="position:relative;height:70px;margin:10px 0">'+
    '<div style="position:absolute;top:34px;left:0;right:0;height:4px;background:#e2ddf5;border-radius:2px"></div>'+
    '<div style="position:absolute;top:22px;left:50%;width:2px;height:28px;background:#7c3aed"></div>'+
    '<div style="position:absolute;top:52px;left:50%;transform:translateX(-50%);font-size:11px;font-weight:800;color:#7c3aed">NOW</div>';
  const dot=(l,c,lab,ly)=>'<div style="position:absolute;top:28px;left:'+l+'%;width:16px;height:16px;border-radius:50%;background:'+c+'"></div>'+
    (lab?'<div style="position:absolute;top:'+(ly||6)+'px;left:'+l+'%;transform:translateX(-40%);font-size:11px;font-weight:700;color:'+c+'">'+lab+'</div>':'');
  if(type==='now')            return line+dot(50,'#16a34a','is / am / are')+'</div>';
  if(type==='routine'){       let d='';[10,24,38,52,66,80].forEach(x=>d+=dot(x,'#16a34a'));return line+d+'<div style="position:absolute;top:6px;left:38%;font-size:11px;font-weight:700;color:#16a34a">every day · always ↻</div></div>';}
  if(type==='now-progress')   return line+'<div style="position:absolute;top:26px;left:38%;width:24%;height:20px;border-radius:12px;background:linear-gradient(90deg,#34d39955,#16a34a);"></div><div style="position:absolute;top:6px;left:42%;font-size:11px;font-weight:700;color:#16a34a">happening now →</div></div>';
  if(type==='past-point')     return line+dot(20,'#dc2626','yesterday ✔ finished')+'</div>';
  if(type==='table')          return '';
  return '';
}

/* ---------- renderizadores por seção ---------- */
const R={};

R.goal=function(){
  const kid=env.isKid();
  const g=kid&&T.goal.kid?T.goal.kid:T.goal.can;
  return bigCard(
    '<div style="text-align:center;padding:18px 6px">'+
    '<div class="chip" style="margin-bottom:10px">'+ (kid?'🎯 Today\'s mission':'🎯 Today\'s goal') +'</div>'+
    '<p style="font-size:22px;font-weight:700;line-height:1.5;color:#1e293b">By the end of this lesson, <span style="color:#7c3aed">'+env.stuName()+'</span> can '+P(g)+'.</p>'+
    (T.goal.teaser?'<p class="text-slate-400" style="margin-top:8px;font-size:14px">'+P(T.goal.teaser)+'</p>':'')+
    '</div>');
};

R.warmup=function(){
  const q=env.queue().slice(0,3);
  let h='';
  if(q.length){
    h+='<p class="text-slate-400 text-sm mb-2">Retrieval — coisas que '+env.stuName()+' errou antes. Pergunte num <b>formato novo</b> (nunca o original). ✓ limpa o item da fila.</p>';
    h+=q.map(function(it,i){
      return '<div class="ex-line" style="display:block"><div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap">'+
        '<span><span class="chip" style="margin:0 6px 0 0">'+(it.topic||'review')+'</span>'+it.q+'</span>'+
        '<span style="display:flex;gap:6px;align-items:center">'+ansBlock('ge-wua-'+i,it.a)+judgeBtns('warmup',i)+'</span></div></div>';
    }).join('');
  }else{
    const n=S.cuts.w1?1:3;
    h+='<p class="text-slate-400 text-sm mb-2">Sem pendências na fila — crie a lacuna: '+env.stuName()+' vai tentar responder e <b>sentir a falta</b> do tópico de hoje.</p>';
    h+=T.warmup.gap.slice(0,n).map(function(g,i){
      return '<div class="ex-line"><span>'+P(g)+'</span>'+judgeBtns('warmup',i)+'</div>';
    }).join('');
  }
  if(env.isKid()&&T.warmup.kidGame)h+='<div class="chip" style="margin-top:8px">🎲 Kids: '+P(T.warmup.kidGame)+'</div>';
  return bigCard(h)+teacherStrip('Se travar na 1ª pergunta, reformule mais simples: “'+P(T.warmup.hint||'ask with gestures, one word at a time')+'”. Encerrar após 3 respostas OU 4 min — o que vier primeiro.');
};

R.notice=function(){
  const ex=(S.noticeRetry&&T.notice.altExamples)?T.notice.altExamples:T.notice.examples;
  let h='<p class="text-slate-400 text-sm mb-2">'+(S.noticeRetry?'Exemplos novos — segunda chance de descobrir.':'Leia com '+env.stuName()+'. Ele(a) descobre o padrão <b>falando</b> — a regra vem depois.')+'</p>';
  h+=ex.map(function(e){
    const plain=P(e).replace(/<[^>]*>/g,'');
    return '<div class="ex-line"><span style="font-size:17px">'+P(e)+'</span><button class="speak-btn" onclick="GE.say(\''+esc(plain)+'\')">►</button></div>';
  }).join('');
  h+='<div style="margin-top:12px"><span class="chip">🔍 '+P(T.notice.qs.form)+'</span><span class="chip">🕐 '+P(T.notice.qs.meaning)+'</span><span class="chip">🗣️ Say the rule in YOUR words</span></div>';
  return bigCard(h)+teacherStrip('Escada de hints (se não achar o padrão em 2 tentativas):<br>1️⃣ '+P(T.notice.hints[0])+'<br>2️⃣ '+P(T.notice.hints[1])+'<br>3️⃣ '+P(T.notice.hints[2])+'<br>Encerra quando ele(a) verbalizar o padrão (mesmo em português).');
};

R.ccq=function(){
  const items=S.ccqReserveOn?T.ccqs.main.concat(T.ccqs.reserve):T.ccqs.main;
  const sc=score('ccq');
  let h='<p class="text-slate-400 text-sm mb-2">Zero terminologia — só sentido. Respostas de 1–3 palavras. <b>Portão: '+GATE_CCQ+'/5</b>.</p>';
  h+='<div id="ge-ccq-score" class="text-sm font-bold mb-2" style="color:#7c3aed">'+sc.c+' ✓ de '+sc.n+' respondidas</div>';
  h+=items.map(function(c,i){
    const res=i>=5?'<span class="chip" style="margin:0 6px 0 0">reserva</span>':'';
    return '<div class="ex-line" style="display:block"><div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap">'+
      '<span>'+res+(i+1)+'. '+P(c.q)+'</span>'+
      '<span style="display:flex;gap:6px;align-items:center">'+ansBlock('ge-ccqa-'+i,c.a)+judgeBtns('ccq',i)+'</span></div></div>';
  }).join('');
  h+='<div id="ge-ccq-verdict" style="margin-top:10px"></div>';
  return bigCard(h)+teacherStrip('Falhou o portão → 3 reservas aparecem sozinhas. Falhou de novo → volta ao Notice com exemplos novos. Falhou a 3ª → o tópico está acima do nível: registre e encerre produzindo o que '+env.stuName()+' JÁ sabe — nunca empurre.');
};

R.rule=function(){
  const kid=env.isKid();
  const txt=kid&&T.rule.kid?T.rule.kid:T.rule.text;
  let h='';
  if(!S.ruleRevealed){
    h+='<div style="text-align:center;padding:20px">'+
       '<p class="text-slate-400 mb-3">'+env.stuName()+' já disse a versão dele(a)?</p>'+
       '<button onclick="GE.revealRule()" class="theme-btn font-bold py-3 px-6 rounded-lg" style="font-size:15px">👁 Confirmar a descoberta</button></div>';
    return bigCard(h);
  }
  h+='<p style="font-size:16px;line-height:1.7;color:#334155"><b style="color:#16a34a">Exatamente o que você percebeu:</b> '+P(txt)+'</p>';
  h+=visual(T.slots.visual);
  h+='<div class="form-box"><div class="label" style="color:#16a34a">When YES</div>'+T.slots.use.yes.map(u=>'<span class="chip">'+P(u)+'</span>').join('')+'</div>';
  h+='<div class="form-box"><div class="label" style="color:#dc2626">When NO</div>'+T.slots.use.no.map(u=>'<span class="chip" style="color:#dc2626 !important">'+P(u)+'</span>').join('')+'</div>';
  h+='<div class="form-box"><div class="label" style="color:#db2777">🔊 Pronunciation</div><p class="text-sm" style="color:#334155">'+P(T.rule.pron)+'</p></div>';
  if(!kid&&T.rule.pt)h+='<div class="form-box"><div class="label" style="color:#7c3aed">🇧🇷 Contraste com o português</div><p class="text-sm" style="color:#334155">'+P(T.rule.pt)+'</p></div>';
  return bigCard(h)+teacherStrip('Se perguntar "por quê?" além da regra: '+P(T.rule.why||'explique com UM exemplo a mais, não com teoria')+'. Encerra quando '+env.stuName()+' reformular a regra em 1 frase própria.');
};

R.watchout=function(){
  const kid=env.isKid();
  const list=kid?T.watchout.slice(0,2):T.watchout;
  let h='<p class="text-slate-400 text-sm mb-2">Vacina de 90 segundos — os erros mais prováveis ANTES que aconteçam.'+(kid?' (Kids: encene a voz de um personagem errando!)':'')+'</p>';
  h+=list.map(function(w,i){
    return '<div class="mistake text-sm"><span style="color:#dc2626">❌ '+P(w.bad)+'</span> → <span style="color:#16a34a;font-weight:700">✅ '+P(w.good)+'</span><span class="text-slate-400" style="margin-left:8px">('+P(w.why)+')</span>'+(i===0?' <span class="chip" style="margin-left:6px">PT-trap</span>':'')+'</div>';
  }).join('');
  h+='<div class="chip" style="margin-top:8px">😏 "Qual desses EU vou tentar te fazer errar hoje?"</div>';
  return bigCard(h);
};

R.practice=function(){
  const kid=env.isKid();
  const items=S.cuts.p8?T.practice.slice(0,8):T.practice;
  const sc=score('practice');
  let h='<p class="text-slate-400 text-sm mb-2">100% oral: '+env.stuName()+' fala, você revela e marca. <b>Portão: ≥80%</b>.'+(kid?' (Kids: cada ✓ = pontos!)':'')+'</p>';
  h+='<div id="ge-pr-score" class="text-sm font-bold mb-2" style="color:#ec4899">'+sc.c+' ✓ / '+sc.n+' marcadas de '+items.length+'</div>';
  let lastType='';
  h+=items.map(function(p,i){
    let head='';
    if(p.t!==lastType){lastType=p.t;head='<div class="label" style="color:#ec4899;margin:14px 0 4px;font-size:11px;font-weight:800;text-transform:uppercase">'+PRACTICE_TYPES[p.t]+'</div>';}
    return head+prItem('practice',p,i);
  }).join('');
  h+='<div id="ge-pr-verdict" style="margin-top:10px"></div>';
  // C3 — só dos tipos falhados, 1 degrau mais fácil, máx. 1x por aula
  if(S.c3On){
    h+='<div class="label" style="color:#a855f7;margin:16px 0 4px;font-weight:800">C3 · SEGUNDA CHANCE — só os tipos que falharam, 1 degrau mais fácil</div>';
    h+=S.c3Items.map(function(p,i){return prItem('c3',p,i);}).join('');
    h+='<div id="ge-c3-verdict" style="margin-top:10px"></div>';
  }
  return bigCard(h)+teacherStrip('G10 — correção com dignidade: 1º "try again" → 2º hint → só então a resposta. Acertou os 3 primeiros com fluência? Pule fill-in/MC e vá direto ao Unscramble. Plano de tempo: ~1 min/item.');
};
function prItem(sec,p,i){
  let q='';
  if(p.t==='mc'){
    q=P(p.q)+'<div style="margin-top:6px">'+p.opts.map(function(o,k){return '<span class="chip">'+String.fromCharCode(65+k)+' · '+P(o)+'</span>';}).join('')+'</div>';
  }else if(p.t==='us'){
    q='Put in order: <b>'+P(p.q)+'</b>';
  }else if(p.t==='ec'){
    q='Find the mistake: <span style="color:#dc2626">“'+P(p.q)+'”</span>';
  }else if(p.t==='tr'){
    q=P(p.q);
  }else{ q=P(p.q); }
  const aid='ge-a-'+sec+'-'+i, hid='ge-h-'+sec+'-'+i;
  return '<div class="ex-line" style="display:block"><div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;flex-wrap:wrap">'+
    '<span style="flex:1">'+(i+1)+'. '+q+'</span>'+
    '<span style="display:flex;gap:6px;flex-shrink:0">'+
    '<button onclick="GE.tg(\''+hid+'\')" class="text-xs bg-slate-700 text-white px-3 py-1 rounded">💡 hint</button>'+
    '<button onclick="GE.tg(\''+aid+'\')" class="text-xs bg-slate-700 text-white px-3 py-1 rounded">answer</button>'+
    judgeBtns(sec,i)+'</span></div>'+
    '<div id="'+hid+'" class="answer" style="color:#d97706 !important">💡 '+P(p.hint)+'</div>'+
    '<div id="'+aid+'" class="answer">✓ '+P(p.a)+'<div class="text-xs" style="color:#7c3aed;margin-top:4px">↳ follow-up: '+P(p.fu)+'</div></div></div>';
}

R.makeit=function(){
  const n=S.cuts.m4?4:6;
  const sc=score('makeit');
  let h='<p class="text-slate-400 text-sm mb-2">Primeira produção com a vida de '+env.stuName()+'. Reaja ao CONTEÚDO ("Really? Me too!") antes de corrigir. <b>Meta: ≥4 stems com a forma correta</b> (autocorreção conta).</p>';
  h+='<div class="text-sm font-bold mb-2" style="color:#06b6d4">'+sc.c+' ✓ de '+sc.n+'</div>';
  h+=T.makeit.slice(0,n).map(function(m,i){
    return '<div class="ex-line"><span style="font-size:17px">'+(i+1)+'. '+P(m)+'</span>'+judgeBtns('makeit',i)+'</div>';
  }).join('');
  return bigCard(h)+teacherStrip('Resposta monossilábica → expanda: "Why? Give me one more." · "And on weekends?" · Um dos stems pode virar pergunta sobre VOCÊ — deixe '+env.stuName()+' perguntar.');
};

R.task=function(){
  const kid=env.isKid();
  const t=T.task;
  let h='<div class="chip" style="margin-bottom:8px">🎬 '+P(t.title)+'</div>';
  h+='<p style="font-size:18px;font-weight:700;color:#1e293b;line-height:1.6">'+P(kid&&t.kid?t.kid:t.mission)+'</p>';
  h+='<div class="form-box" style="margin-top:10px"><div class="label" style="color:#a855f7">Roles</div>'+
     '<p class="text-sm" style="color:#334155">🧑‍🎓 <b>'+env.stuName()+':</b> '+P(t.roles.student)+'</p>'+
     '<p class="text-sm" style="color:#334155">👩‍🏫 <b>You:</b> '+P(t.roles.teacher)+'</p></div>';
  h+='<div class="form-box"><div class="label" style="color:#f59e0b">⚡ Complication</div><p class="text-sm" style="color:#334155">'+P(t.complication)+'</p></div>';
  h+='<p class="text-slate-400 text-sm" style="margin-top:8px">Correção ADIADA: anote, não interrompa. '+env.stuName()+' fala ≥80% do bloco. Feche com 1 acerto celebrado + 2 erros como "try again".</p>';
  if(!S.cuts.c4){
    h+='<div style="margin-top:10px"><button onclick="GE.tg(\'ge-c4\')" class="theme-btn text-xs font-bold py-2 px-4 rounded-lg">🚀 C4 — terminou com folga? (só com todos os portões passados + ≥8 min sobrando)</button>'+
       '<div id="ge-c4" class="answer" style="color:#7c3aed !important">'+P(t.c4)+'</div></div>';
  }
  return bigCard(h)+teacherStrip('Complicações injetáveis se ficar fácil:<br>⚡ '+P(t.extras[0])+'<br>⚡ '+P(t.extras[1])+'<br>Se travar, socorro por palavra/imagem (nunca frase pronta): '+t.rescue.map(r=>'<span class="chip">'+P(r)+'</span>').join(' '));
};

R.exit=function(){
  const kid=env.isKid();
  const sc=score('exit');
  let h='<p class="text-slate-400 text-sm mb-2">Itens novos — evidência objetiva. <b>Portão: ≥'+GATE_EXIT+'/6 = semana concluída.</b>'+(kid?' 👾 Boss final!':'')+'</p>';
  h+='<div class="text-sm font-bold mb-2" style="color:#7c3aed">Antes: "Quantas você acha que acerta?" (calibragem) — depois compare.</div>';
  h+=T.exit.map(function(it,i){
    return '<div class="ex-line" style="display:block"><div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap">'+
      '<span><span class="chip" style="margin:0 6px 0 0">'+it.tag+'</span>'+P(it.q)+'</span>'+
      '<span style="display:flex;gap:6px;align-items:center">'+ansBlock('ge-eta-'+i,it.a)+judgeBtns('exit',i)+'</span></div></div>';
  }).join('');
  h+='<div id="ge-exit-verdict" style="margin-top:10px"></div>';
  return bigCard(h)+teacherStrip('Correção por nível: em A1, aceite a forma-alvo correta mesmo com outros errinhos. Feche SEMPRE dizendo 1 coisa que '+env.stuName()+' consegue fazer hoje que não conseguia antes.');
};

/* ---------- faixa da professora (C2 — nunca na "tela do aluno") ---------- */
function teacherStrip(html){
  return '<div class="card" style="padding:10px 14px;margin-top:-8px;margin-bottom:18px;border-left:4px solid #94a3b8 !important">'+
    '<button onclick="GE.tg(\'ge-c2\')" class="text-xs font-bold" style="color:#64748b;background:none;border:none;cursor:pointer">👩‍🏫 Teacher help (C2) ▾</button>'+
    '<div id="ge-c2" class="answer" style="color:#475569 !important;font-weight:400;font-size:13px;line-height:1.6">'+html+'</div></div>';
}

/* ---------- shell: progresso + timer + navegação ---------- */
function shell(){
  const dots=SECTIONS.map(function(s,i){
    const st=i<S.sec?'background:#16a34a;color:#fff':(i===S.sec?'background:linear-gradient(135deg,#7c3aed,#db2777);color:#fff':'background:#ede9fe;color:#7c3aed');
    return '<div title="'+s.t+'" style="width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;'+st+'">'+s.n+'</div>';
  }).join('');
  const cur=SECTIONS[S.sec];
  return '<div class="card" style="padding:14px 16px;margin-bottom:14px">'+
    '<div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap">'+
    '<div style="display:flex;gap:5px;flex-wrap:wrap">'+dots+'</div>'+
    '<div style="display:flex;gap:8px;align-items:center">'+
      '<span id="ge-clock" class="text-sm font-bold" style="color:#7c3aed">0:00</span>'+
      '<span class="text-xs" style="color:#94a3b8">/ ~'+cur.time+' min</span>'+
      '<button onclick="GE.cut()" class="text-xs font-bold px-3 py-2 rounded-lg" style="background:#fef3c7;color:#92400e" title="Aplica o próximo corte da ordem oficial">⏱ tempo apertado</button>'+
    '</div></div>'+
    '<div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px">'+
    '<h3 class="text-lg font-bold" style="color:'+cur.color+'">'+cur.n+' · '+cur.t+'</h3>'+
    '<div style="display:flex;gap:8px">'+
      (S.sec>0?'<button onclick="GE.back()" class="theme-btn text-sm font-bold py-2 px-4 rounded-lg">← Back</button>':'')+
      '<button onclick="GE.next()" id="ge-next" class="text-sm font-bold py-2 px-5 rounded-lg" style="background:linear-gradient(135deg,#7c3aed,#db2777);color:#fff">'+(S.sec===SECTIONS.length-1?'Finish class ✔':'Next →')+'</button>'+
    '</div></div>'+
    '<div id="ge-gatemsg" style="margin-top:6px"></div></div>';
}

/* ---------- portões ---------- */
function gateCheck(){
  const id=SECTIONS[S.sec].id;
  if(id==='ccq'){
    const sc=score('ccq');
    const need=S.ccqReserveOn?8:5;
    if(sc.n<need)return 'Marque as '+need+' CCQs (✓/✗) antes de avançar — nada avança sem evidência (G3).';
    if(sc.c>=GATE_CCQ)return null;
    if(!S.ccqReserveOn){S.ccqReserveOn=true;render();return 'Portão falhou (<'+GATE_CCQ+'/5) → 3 CCQs reserva adicionadas, mais concretas. Tente com elas.';}
    if(!S.noticeRetry){S.noticeRetry=true;S.ccqReserveOn=false;S.judged.ccq={};S.sec=2;render();return 'Falhou de novo → voltando ao §3 Notice com exemplos novos.';}
    S.conceptGap=true;
    return 'FALHOU 3x — o tópico está acima do nível de '+env.stuName()+'. Registre, e encerre com produção do que ele(a) JÁ sabe. Pule para a §9 Task com um tópico dominado (clique em Next para prosseguir mesmo assim). ';
  }
  if(id==='practice'){
    const total=S.cuts.p8?8:12;
    const gate=Math.ceil(total*0.8);
    const sc=score('practice');
    if(S.c3On){
      const c3n=Object.keys(S.judged.c3||{}).length, c3c=Object.values(S.judged.c3||{}).filter(Boolean).length;
      if(c3n<S.c3Items.length)return 'Marque os 6 itens da C3 antes de avançar.';
      if(c3c/S.c3Items.length>=0.8)return null;
      return 'C3 também falhou → o problema é conceito, não treino. Volte ao §5 Rule (botão Back) e reveja juntos; depois avance sem mais prática. Clique Next para prosseguir.';
    }
    if(sc.n<total)return 'Marque os '+total+' itens (✓/✗) antes de avançar.';
    if(sc.c>=gate)return null;
    if(!S.cuts.c3){
      const failedTypes={};
      (S.cuts.p8?T.practice.slice(0,8):T.practice).forEach(function(p,i){ if(S.judged.practice[i]===false)failedTypes[p.t]=1; });
      S.c3Items=[];
      Object.keys(failedTypes).forEach(function(t){ (T.c3[t]||[]).slice(0,2).forEach(function(p){p.t=t;S.c3Items.push(p);}); });
      S.c3Items=S.c3Items.slice(0,6);
      if(S.c3Items.length){S.c3On=true;render();return 'Portão falhou (<80%) → C3 gerada: '+S.c3Items.length+' itens SÓ dos tipos errados, 1 degrau mais fácil.';}
    }
    return 'Portão falhou e C3 indisponível — reveja a Rule juntos e avance (Next de novo).';
  }
  if(id==='makeit'){
    const sc=score('makeit');
    if(sc.c<4&&sc.n<(S.cuts.m4?4:6))return 'Meta: ≥4 stems com a forma correta antes da Task.';
    return null;
  }
  if(id==='exit'){
    const sc=score('exit');
    if(sc.n<6)return 'Marque os 6 itens do Exit Ticket — sem evidência a semana não existe.';
    return null;
  }
  return null;
}
let gateOverride=false;

/* ---------- fim da aula ---------- */
function finishScreen(){
  const ex=score('exit'), pr=score('practice');
  const pass=ex.c>=GATE_EXIT;
  S.weekComplete=pass;
  // registra
  try{
    const k='gev1|'+(window.curStu||'?');
    const log=JSON.parse(localStorage.getItem(k)||'[]');
    log.push({topic:T.id,d:new Date().toISOString().slice(0,10),exit:ex.c,practice:pr.c,week:pass?1:0});
    localStorage.setItem(k,JSON.stringify(log));
  }catch(e){}
  const misses=[];
  T.exit.forEach(function(it,i){ if(S.judged.exit[i]===false)misses.push({q:P(it.q),a:it.a?P(it.a):''}); });
  (S.cuts.p8?T.practice.slice(0,8):T.practice).forEach(function(p,i){ if(S.judged.practice[i]===false)misses.push({q:P(p.q),a:P(p.a)}); });
  let h='<div class="stage" style="border-left-color:'+(pass?'#16a34a':'#f59e0b')+';text-align:center;padding:30px">';
  h+=pass?'<h3 class="text-2xl font-bold" style="color:#16a34a">🏆 '+ex.c+'/6 — semana concluída!</h3>'
        :'<h3 class="text-2xl font-bold" style="color:#b45309">↩ '+ex.c+'/6 — a semana NÃO avança</h3><p class="text-slate-400 text-sm">O que falhou volta na próxima aula (já está na fila).</p>';
  h+='<p style="margin-top:10px;color:#334155">Diga a '+env.stuName()+' <b>uma coisa que ele(a) faz hoje que não fazia antes</b>.</p>';
  if(misses.length)h+='<p class="text-slate-400 text-sm" style="margin-top:6px">'+misses.length+' erro(s) de hoje salvos na fila de revisão → viram o warm-up da próxima aula.</p>';
  h+='<div style="margin-top:16px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap">';
  if(misses.length)h+='<button onclick="GE.homework()" class="gradient-emerald text-white font-bold py-3 px-6 rounded-lg">📄 Dever de casa (PDF dos ✗ de hoje)</button>';
  h+='<button onclick="GE.restart()" class="theme-btn font-bold py-3 px-6 rounded-lg">↺ Reabrir a aula</button></div></div>';
  document.getElementById('lessonBody').innerHTML=h;
  S._misses=misses;
}

/* ---------- render principal ---------- */
function render(){
  if(S.finished){finishScreen();return;}
  const id=SECTIONS[S.sec].id;
  document.getElementById('lessonBody').innerHTML=shell()+R[id]();
  gateOverride=false;
  clearInterval(S.clockTimer);
  S.clockTimer=setInterval(function(){
    const el=document.getElementById('ge-clock');if(!el){clearInterval(S.clockTimer);return;}
    const s=Math.floor((Date.now()-S.secStart)/1000);
    el.textContent=Math.floor(s/60)+':'+('0'+s%60).slice(-2);
    if(s>SECTIONS[S.sec].time*60)el.style.color='#dc2626';
  },1000);
  window.scrollTo({top:0,behavior:'smooth'});
}

/* ---------- API pública ---------- */
window.GE={
  start:function(topic){
    T=topic;S=freshState();audit(T);render();
  },
  next:function(){
    const msg=gateOverride?null:gateCheck();
    const el=document.getElementById('ge-gatemsg');
    if(msg){
      if(el)el.innerHTML='<div class="mistake" style="font-weight:600;font-size:13px">'+msg+'</div>';
      // G3: itens não marcados NUNCA são puláveis; veredictos pedagógicos a professora pode atravessar no 2º clique.
      gateOverride=msg.indexOf('Marque')!==0;
      return;
    }
    if(S.sec===SECTIONS.length-1){S.finished=true;clearInterval(S.clockTimer);finishScreen();return;}
    S.sec++;S.maxSec=Math.max(S.maxSec,S.sec);S.secStart=Date.now();
    // §5 pulável: se §3 foi limpo e §4 deu 5/5, Rule vira confirmação (mantém visual)
    render();
  },
  back:function(){ if(S.sec>0){S.sec--;S.secStart=Date.now();render();} },
  judge:function(sec,i,ok){
    S.judged[sec]=S.judged[sec]||{};
    if(sec==='c3'){ if(S.judged.c3&&S.judged.c3[i]!==undefined)return; S.judged.c3=S.judged.c3||{}; S.judged.c3[i]=ok;
      if(!ok&&S.c3Items[i])env.logError('practice-c3',S.c3Items[i].q,S.c3Items[i].a);
    }else{
      if(S.judged[sec][i]!==undefined)return;
      S.judged[sec][i]=ok;
      if(sec==='warmup'){ const q=env.queue().slice(0,3); if(q[i])env.markQueue(q[i],ok); }
      if(sec==='practice'&&!ok){const p=T.practice[i];env.logError('practice',P(p.q),P(p.a));}
      if(sec==='ccq'&&!ok){const c=(S.ccqReserveOn?T.ccqs.main.concat(T.ccqs.reserve):T.ccqs.main)[i];env.logError('ccq',P(c.q),c.a?P(c.a):'');}
      if(sec==='exit'&&!ok){const e2=T.exit[i];env.logError('exit',P(e2.q),e2.a?P(e2.a):'');}
    }
    const y=document.getElementById('ge-y-'+sec+'-'+i),n=document.getElementById('ge-n-'+sec+'-'+i);
    if(y)y.style.opacity=ok?'1':'.35'; if(n)n.style.opacity=ok?'.35':'1';
    // placares vivos
    if(sec==='ccq'){const sc=score('ccq');const e3=document.getElementById('ge-ccq-score');if(e3)e3.textContent=sc.c+' ✓ de '+sc.n+' respondidas';}
    if(sec==='practice'||sec==='c3'){const sc=score('practice');const e4=document.getElementById('ge-pr-score');if(e4)e4.textContent=sc.c+' ✓ / '+sc.n+' marcadas';}
  },
  revealRule:function(){S.ruleRevealed=true;render();},
  cut:function(){
    while(S.cutIdx<CUTS.length&&S.cuts[CUTS[S.cutIdx].k])S.cutIdx++;
    if(S.cutIdx>=CUTS.length)return;
    const c=CUTS[S.cutIdx];S.cuts[c.k]=true;S.cutIdx++;
    const el=document.getElementById('ge-gatemsg');
    if(el)el.innerHTML='<div class="mistake" style="background:#fef3c7 !important;border-color:#fcd34d !important;color:#92400e !important;font-weight:600;font-size:13px">✂ '+c.msg+' Intocáveis: §3, §4, §9, §10.</div>';
    if(['p8','m4','w1'].indexOf(c.k)>=0)render();
  },
  tg:function(id){const el=document.getElementById(id);if(el)el.classList.toggle('show');},
  say:function(txt){
    if(!('speechSynthesis' in window))return;
    const u=new SpeechSynthesisUtterance(txt);u.lang='en-US';u.rate=0.9;
    speechSynthesis.cancel();speechSynthesis.speak(u);
  },
  homework:function(){
    if(!S._misses||!S._misses.length)return;
    let h='<h1 style="border-bottom:3px solid #7c3aed;padding-bottom:10px">Homework — '+env.stuName()+' · '+T.name+'</h1>'+
      '<p>Practice these — we\'ll check them next class:</p>'+
      S._misses.map(function(m,i){return '<p style="margin-left:14px">'+(i+1)+'. '+m.q.replace(/<[^>]*>/g,'')+'</p>';}).join('')+
      '<p style="color:#888;margin-top:18px">Answers on the last line — no peeking! 😉</p><hr>'+
      '<p style="font-size:11px;color:#aaa">'+S._misses.map(function(m,i){return (i+1)+') '+String(m.a).replace(/<[^>]*>/g,'');}).join(' · ')+'</p>';
    if(typeof window.printDoc==='function')window.printDoc(h,'Homework — '+env.stuName());
  },
  restart:function(){S.finished=false;S.sec=0;render();},
  audit:audit
};
})();
