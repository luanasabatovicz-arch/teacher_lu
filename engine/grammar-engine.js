/* ============================================================
   GRAMMAR PRACTICE — runtime (antigo GRAMMAR ENGINE v1)
   ------------------------------------------------------------
   O QUE MUDOU E POR QUÊ
   ---------------------
   Este arquivo executava uma aula guiada em 10 seções — Goal,
   Warm-up, Notice, CCQs, Rule, Watch out, Practice, Make it
   yours, Task, Exit Ticket — com portões de 80%, relógio por
   seção, mapa de etapas e sessão recuperável.

   Esse fluxo não é usado: a professora dá a explicação, a regra,
   os CCQs e o warm-up fora da plataforma. O que ela abre em aula
   é a PRÁTICA. Então o runtime virou practice-only:

     aluno → tópico → um exercício por vez → veredicto → Next

   O CONTEÚDO NÃO FOI TOCADO. engine/grammar-topics.js continua
   inteiro: notice, ccqs, rule, watchout, makeit, task e goal
   seguem lá, apenas não são renderizados. Se um dia essa aula
   guiada voltar, os dados estão intactos.

   O POOL
   ------
   Três campos alimentam um único pool de prática:

     practice      exercícios principais (fill · mc · us · ec · tr)
     practiceMore  prática livre (cq · md)
     exit          revisão final — aqui são exercícios normais,
                   e a interface NUNCA os chama de "Exit Ticket"

   Cada item mantém o `id` permanente que grammar-topics.js já
   carrega (gr-<topico>-pr-001 / -pm- / -ex-). Nada aqui gera id.

   O QUE ESTE ARQUIVO NÃO FAZ
   --------------------------
   Não filtra por aluno. O PracticeLog não é consultado nem
   escrito daqui — ligar o filtro é uma etapa posterior, e a
   página é quem vai decidir isso.
   ============================================================ */
(function(){
'use strict';

/* ---------- formatos: rótulo neutro, sem vocabulário de aula ---------- */
var FORMATS=[
  {id:'all',  label:'All'},
  {id:'fill', label:'Complete'},
  {id:'mc',   label:'Multiple Choice'},
  {id:'us',   label:'Unscramble'},
  {id:'ec',   label:'Fix the mistake'},
  {id:'tr',   label:'Transform'},
  {id:'open', label:'Open answer'}
];
var FORMAT_LABEL={fill:'Complete',mc:'Multiple Choice',us:'Unscramble',
                  ec:'Fix the mistake',tr:'Transform',cq:'Open answer',
                  md:'Open answer',op:'Open answer'};

/* ---------- estado ---------- */
var T=null;      // tópico ativo (dados, nunca modificados)
var S=null;      // estado runtime
var MOUNT='gePractice';

function freshState(){
  return { pool:[], view:[], i:0, filter:'all', judged:{}, revealed:{} };
}

/* ---------- ponte com a página (aluno, fila de erros) ---------- */
var env={
  stuName:function(){ return (typeof window.stuName==='function') ? window.stuName() : 'the student'; },
  logError:function(kind,q,a){ if(typeof window.logError==='function') window.logError(kind,q,a); }
};

function P(s){ return String(s==null?'':s).replace(/\{name\}/g, env.stuName()); }
function esc(s){ return String(s).replace(/'/g,"\\'").replace(/"/g,'&quot;'); }
function strip(s){ return String(s==null?'':s).replace(/<[^>]*>/g,''); }

/* ---------- randomização (anti-memorização da ordem) ---------- */
function shuffle(a){
  a=(a||[]).slice();
  for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i]; a[i]=a[j]; a[j]=t; }
  return a;
}
/* embaralha as alternativas do MC e RECALCULA a letra da resposta */
function prepMC(p){
  if(!p||p.t!=='mc'||!p.opts||!p.opts.length) return p;
  var txt=String(p.a).replace(/^\s*[A-Z]\s*—\s*/,'').trim();
  var opts=shuffle(p.opts), idx=-1;
  for(var i=0;i<opts.length;i++){
    if(String(opts[i]).trim().toLowerCase()===txt.toLowerCase()){ idx=i; break; }
  }
  if(idx<0) return p;                       // sem correspondência: mantém o original
  var out={}; for(var k in p) out[k]=p[k];
  out.opts=opts; out.a=String.fromCharCode(65+idx)+' — '+opts[idx];
  return out;
}

/* ---------- pool ---------- */
function buildPool(){
  var pool=[];
  function take(list, src, defType){
    shuffle(list||[]).forEach(function(p){
      var it={}; for(var k in p) it[k]=p[k];
      it._src=src;
      it.t=p.t||defType;
      pool.push(prepMC(it));
    });
  }
  take(T.practice,     'practice', 'fill');
  take(T.practiceMore, 'more',     'cq');
  take(T.exit,         'exit',     'op');   // exercício normal; sem rótulo de "exit"
  return pool;
}

function applyFilter(){
  var f=S.filter;
  S.view = (f==='all') ? S.pool.slice()
         : (f==='open') ? S.pool.filter(function(p){ return p.t==='cq'||p.t==='md'||p.t==='op'; })
         : S.pool.filter(function(p){ return p.t===f; });
  S.i=0;
}

/** Quantos itens existem em cada formato — usado só para desabilitar chips vazios. */
function countByFormat(){
  var c={all:S.pool.length};
  FORMATS.forEach(function(f){ if(f.id!=='all') c[f.id]=0; });
  S.pool.forEach(function(p){
    if(p.t==='cq'||p.t==='md'||p.t==='op') c.open++;
    else if(c[p.t]!==undefined) c[p.t]++;
  });
  return c;
}

/* ---------- render de um item ---------- */
function questionHTML(p){
  if(p.t==='mc'){
    return P(p.q)+'<div style="margin-top:14px">'+
      (p.opts||[]).map(function(o,k){
        return '<div class="opt" style="cursor:default">'+
               '<span class="chip" style="margin-right:10px">'+String.fromCharCode(65+k)+'</span>'+P(o)+'</div>';
      }).join('')+'</div>';
  }
  if(p.t==='us') return 'Put in order: <b>'+P(p.q)+'</b>';
  if(p.t==='ec') return 'Find the mistake: <span style="color:var(--tl-danger-text)">“'+P(p.q)+'”</span>';
  if(p.t==='md'){
    return (p.lines
      ? '<div>'+p.lines.map(function(l){ return '<div style="padding:3px 0">'+P(l)+'</div>'; }).join('')+'</div>'
      : P(p.q));
  }
  return P(p.q);
}

function feedbackHTML(p){
  if(!(p.why||p.ruleRef||p.ex)) return '';
  return '<div class="mistake" style="margin-top:10px">'+
    (p.why    ? '<div class="text-sm">❌ '+P(p.why)+'</div>' : '')+
    (p.ruleRef? '<div class="text-sm">📐 '+P(p.ruleRef)+'</div>' : '')+
    (p.ex     ? '<div class="text-sm">➕ '+P(p.ex)+'</div>' : '')+
  '</div>';
}

function render(){
  var el=document.getElementById(MOUNT);
  if(!el) return;

  if(!S.view.length){
    el.innerHTML='<div class="card rounded-xl p-8" style="text-align:center">'+
      '<p class="text-slate-400">No exercises in this filter.</p></div>';
    paintNav();
    return;
  }
  if(S.i>=S.view.length){
    el.innerHTML='<div class="card rounded-xl p-8" style="text-align:center">'+
      '<p class="text-white font-bold" style="font-size:20px;margin-bottom:6px">Finished.</p>'+
      '<p class="text-slate-400 text-sm" style="margin-bottom:16px">'+S.view.length+' exercises in this set.</p>'+
      '<button onclick="GE.restart()" class="theme-btn font-bold py-2 px-5 rounded-lg">↺ Start again</button></div>';
    paintNav();
    return;
  }

  var p=S.view[S.i];
  var key=p.id||('i'+S.i);
  var verdict=S.judged[key];

  el.innerHTML='<div class="card rounded-xl p-6 p-md-8">'+
    '<div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:14px">'+
      '<span class="tag">'+(FORMAT_LABEL[p.t]||'Practice')+'</span>'+
      '<span class="text-slate-400 text-sm font-bold">'+(S.i+1)+' / '+S.view.length+'</span>'+
    '</div>'+

    '<p class="text-white font-semibold" style="font-size:24px;line-height:1.45">'+questionHTML(p)+'</p>'+

    (p.a ? '<div style="margin-top:18px">'+
             (S.revealed[key]
               ? '<div class="answer show" style="font-size:22px;font-weight:700;color:var(--tl-success-text)">✓ '+P(p.a)+'</div>'+feedbackHTML(p)
               : '<button onclick="GE.reveal()" class="theme-btn font-bold py-2 px-5 rounded-lg">👁 Show answer</button>')+
           '</div>'
        : '')+

    '<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:22px;padding-top:18px;border-top:1px solid var(--tl-border)">'+
      '<button onclick="GE.judge(true)" class="font-bold" '+
        'style="cursor:pointer;font-size:17px;padding:9px 22px;border-radius:var(--tl-radius-md);'+
        'background:var(--tl-success-soft);color:var(--tl-success-text);'+
        'border:2px solid '+(verdict===true?'var(--tl-success)':'transparent')+';'+
        'opacity:'+(verdict===false?'.35':'1')+'">✓</button>'+
      '<button onclick="GE.judge(false)" class="font-bold" '+
        'style="cursor:pointer;font-size:17px;padding:9px 22px;border-radius:var(--tl-radius-md);'+
        'background:var(--tl-danger-soft);color:var(--tl-danger-text);'+
        'border:2px solid '+(verdict===false?'var(--tl-danger)':'transparent')+';'+
        'opacity:'+(verdict===true?'.35':'1')+'">✗</button>'+
      '<span style="flex:1"></span>'+
      (S.i>0 ? '<button onclick="GE.prev()" class="theme-btn py-2 px-4 rounded-lg">←</button>' : '')+
      '<button onclick="GE.next()" class="theme-btn active font-bold py-2 px-6 rounded-lg" id="ge-next">Next →</button>'+
    '</div>'+
  '</div>';

  paintNav();
}

/** Avisa a página para repintar cabeçalho/contadores dela. */
function paintNav(){
  if(typeof window.onPracticeRender==='function'){
    try{ window.onPracticeRender(GE.state()); }catch(e){}
  }
}

/* ---------- API pública ---------- */
var GE={
  FORMATS:FORMATS,

  /** Abre um tópico em modo prática. `mountId` é opcional. */
  start:function(topic, mountId){
    if(mountId) MOUNT=mountId;
    T=topic; S=freshState();
    S.pool=buildPool();
    applyFilter();
    render();
  },

  setFilter:function(f){
    if(!S) return;
    S.filter=f||'all';
    applyFilter();
    render();
  },

  next:function(){ if(!S) return; if(S.i<S.view.length){ S.i++; render(); } },
  prev:function(){ if(!S) return; if(S.i>0){ S.i--; render(); } },
  restart:function(){ if(!S) return; S.pool=buildPool(); applyFilter(); S.judged={}; S.revealed={}; render(); },

  reveal:function(){
    if(!S||!S.view[S.i]) return;
    S.revealed[S.view[S.i].id||('i'+S.i)]=true;
    render();
  },

  /**
   * Veredicto do item atual. ✗ alimenta a fila de erros do aluno
   * (errq|<studentId>), que é responsabilidade da página — aqui só
   * avisamos. Não avança sozinho: quem avança é o Next.
   */
  judge:function(ok){
    if(!S) return;
    var p=S.view[S.i];
    if(!p) return;
    var key=p.id||('i'+S.i);
    if(S.judged[key]!==undefined) return;      // um veredicto por item
    S.judged[key]=!!ok;
    if(!ok) env.logError('practice', strip(P(p.q||(p.lines?p.lines.join(' '):''))), strip(P(p.a||'')));
    render();
  },

  say:function(txt){
    if(!('speechSynthesis' in window)) return;
    var u=new SpeechSynthesisUtterance(txt); u.lang='en-US'; u.rate=0.9;
    speechSynthesis.cancel(); speechSynthesis.speak(u);
  },

  /** Estado para a página desenhar o cabeçalho. */
  state:function(){
    if(!S) return {topic:null,total:0,shown:0,index:0,filter:'all',counts:{}};
    return {
      topic:  T ? {id:T.id, name:T.name, level:T.level} : null,
      total:  S.pool.length,
      shown:  S.view.length,
      index:  Math.min(S.i, S.view.length),
      filter: S.filter,
      counts: countByFormat()
    };
  },

  _sess:function(){ return S; }
};

window.GE=GE;

})();
