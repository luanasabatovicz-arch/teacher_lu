/* ============================================================
   SPEAKING ENGINE v1 — runtime (SPEAKING-LAB.md v1.0)
   Lógica pura, desacoplada da interface: nenhuma referência a
   DOM. A página consome a API pública SpeakingEngine.
   Implementa: pipeline §19 (elegibilidade → seleção → fusão →
   registro atômico), progressão §17, footprint §18.
   Entradas externas (injetáveis — a engine não decide origem):
   - student: {id, name, level, age}
   - opts.unlocked: estruturas gramaticais ensinadas (P6).
     Ausente → fallback: só o piso CEFR filtra (TODO: integrar
     ao currículo de gramática — pendência declarada).
   - opts.goal: objetivo da semana (§19.2a — TODO-2).
   - opts.errorQueue: fila de erros (§19.2c).
   ============================================================ */
(function(){
'use strict';

const LV={A1:1,A2:2,B1:3,B2:4,C1:5};
const CONSOLIDATE_N=3;      // §17: 3 evidências ✓...
const CONSOLIDATE_THEMES=2; // ...em ≥2 temas distintos

/* ---------- storage adapter (injetável; default: localStorage slab_*) ---------- */
let store={
  get(k,d){try{const v=(typeof localStorage!=='undefined')?localStorage.getItem(k):null;return v?JSON.parse(v):d;}catch(e){return d;}},
  set(k,v){try{if(typeof localStorage!=='undefined')localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
};

/* ---------- helpers ---------- */
function P(s,ctx){return String(s==null?'':s).replace(/\{name\}/g,ctx.name||'the student').replace(/\{theme\}/g,ctx.theme||'');}
function isKid(st){return !!(st&&st.age&&+st.age<=12);}
function lvl(st){return LV[st&&st.level]||1;}
function sessions(){return store.get('slab_sessions',[]);}
function ofStudent(id){return sessions().filter(x=>x.stu===id);}

/* ---------- §19.1 ELEGIBILIDADE ---------- */
function eligible(student,opts){
  opts=opts||{};
  const L=lvl(student);
  const themes=SPEAKING_THEMES;
  return SPEAKING_ACTIVITIES.filter(a=>{
    if(L<a.lo||L>a.hi)return false;                                 // faixa CEFR
    if(opts.unlocked&&a.deps&&!a.deps.every(d=>opts.unlocked.indexOf(d)>=0))return false; // P6
    if(a.req&&a.req.length&&!themes.some(t=>a.req.every(r=>t.offers.indexOf(r)>=0)))return false; // §13.3
    return true;
  });
}

/* ---------- §17/§18 consolidação e evidências ---------- */
function compStats(studentId){
  const st={};
  ofStudent(studentId).forEach(s=>{
    const c=st[s.comp]=st[s.comp]||{v:0,t:0,themes:{}};
    c.t++;
    if(s.ok){c.v++;c.themes[s.theme]=1;}
  });
  Object.keys(st).forEach(k=>{
    const c=st[k];
    c.consolidated=c.v>=CONSOLIDATE_N&&Object.keys(c.themes).length>=CONSOLIDATE_THEMES;
  });
  return st;
}

/* ---------- §19.2 SELEÇÃO ---------- */
function select(student,opts,exclude){
  opts=opts||{};
  let pool=eligible(student,opts).filter(a=>!exclude||a.id!==exclude);
  if(!pool.length)return null;
  // (a) objetivo da semana — quando fornecido (TODO-2: fonte ainda não existe)
  if(opts.goal){
    const g=pool.filter(a=>a.goals.indexOf(opts.goal)>=0);
    if(g.length)pool=g;
  }
  // (b) competência com menos evidências no footprint
  const st=compStats(student.id);
  pool.sort((a,b)=>((st[a.comp]||{v:0}).v)-((st[b.comp]||{v:0}).v));
  const minV=(st[pool[0].comp]||{v:0}).v;
  let top=pool.filter(a=>((st[a.comp]||{v:0}).v)===minV);
  // (c) fila de erros — atividade cuja competência recicla estruturas pendentes
  if(opts.errorQueue&&opts.errorQueue.length&&top.length>1){
    const topics=opts.errorQueue.map(e=>String(e.topic||'').toLowerCase());
    const rec=top.filter(a=>(a.deps||[]).some(d=>topics.some(t=>t.indexOf(d.split(' ')[0])>=0)));
    if(rec.length)top=rec;
  }
  const act=top[Math.floor(Math.random()*top.length)];
  // tema: requisitos satisfeitos + anti-repetição (§19.2)
  const last=store.get('slab_last',{})[student.id]||'';
  let themes=SPEAKING_THEMES.filter(t=>(!act.req||!act.req.length||act.req.every(r=>t.offers.indexOf(r)>=0)));
  const fresh=themes.filter(t=>act.id+'|'+t.n!==last);
  if(fresh.length)themes=fresh;
  const theme=themes[Math.floor(Math.random()*themes.length)];
  return {act,theme};
}

/* ---------- §19.3 FUSÃO — produz a missão completa ---------- */
function fuse(student,pick){
  if(!pick)return null;
  const a=pick.act,ctx={name:student.name,theme:pick.theme.n};
  const kid=isKid(student);
  const fus=[];
  (a.banks||[]).forEach(b=>{(SPEAKING_FOLLOWUP_BANKS[b]||[]).forEach(f=>fus.push(f));});
  return {
    actId:a.id, actName:a.n, comp:a.comp, theme:pick.theme.n, themeId:pick.theme.id,
    purpose:P(a.purpose,ctx), evid:a.evid, check:a.check.slice(),
    brief:P(a.brief,ctx)+(kid&&a.kid?' · 🧒 '+P(a.kid,ctx):(!kid&&a.adult?' · '+P(a.adult,ctx):'')),
    followups:fus.slice(0,6), rescue:a.rescue.slice(), compl:P(a.compl,ctx),
    simple:P(a.simple,ctx), reform:a.reform,
    slot:a.slot, stt:a.stt, tt:a.tt, diff:a.diff, kid
  };
}

/* ---------- porquê da seleção (W1) ---------- */
function why(student,mission){
  const st=compStats(student.id)[mission.comp]||{v:0};
  if(st.consolidated)return mission.comp+' consolidada — agora é manutenção em tema novo.';
  if(st.v===0)return mission.comp+' ainda não tem evidências — é a fronteira de '+student.name+'.';
  return mission.comp+' tem '+st.v+' de '+CONSOLIDATE_N+' evidências para consolidar — falta pouco.';
}

/* ---------- §19.7 REGISTRO — atômico: ou grava tudo, ou nada ---------- */
function record(student,mission,metrics){
  const entry={
    d:new Date().toISOString().slice(0,10), stu:student.id,
    act:mission.actName, comp:mission.comp, theme:mission.theme,
    ok:!!metrics.ok, longest:Math.round(metrics.longest||0),
    stt:+(metrics.sttPct||0), sus:metrics.sus|0, ini:metrics.ini|0, rep:metrics.rep|0,
    err:metrics.err||{}, obs:String(metrics.obs||'')
  };
  const ses=sessions();ses.push(entry);
  store.set('slab_sessions',ses);                                   // sessão + footprint derivam da mesma fonte
  const last=store.get('slab_last',{});last[student.id]=mission.actId+'|'+mission.theme;
  store.set('slab_last',last);
  return entry;
}
function setObs(student,obs){
  const ses=sessions();
  for(let i=ses.length-1;i>=0;i--)if(ses[i].stu===student.id){ses[i].obs=String(obs||'');break;}
  store.set('slab_sessions',ses);
}

/* ---------- §18 FOOTPRINT ---------- */
function footprint(student){
  const L=lvl(student),st=compStats(student.id);
  const ses=ofStudent(student.id);
  const open=SPEAKING_COMPETENCES.filter(c=>L>=c.lo);
  const blocked=SPEAKING_COMPETENCES.filter(c=>L<c.lo);
  return {
    bars:open.map(c=>({c:c.c,v:(st[c.c]||{v:0}).v,consolidated:!!(st[c.c]&&st[c.c].consolidated)})),
    blocked:blocked.map(c=>({c:c.c,dep:c.dep||('nível '+Object.keys(LV)[c.lo-1])})),
    journey:ses.map(s=>s.longest),
    sttAvg:ses.length?ses.reduce((s,x)=>s+x.stt,0)/ses.length:0,
    chainsAvg:ses.length?Math.round(ses.reduce((s,x)=>s+x.sus+x.ini,0)/ses.length):0,
    consolidated:open.filter(c=>st[c.c]&&st[c.c].consolidated).map(c=>c.c),
    developing:open.filter(c=>st[c.c]&&st[c.c].v>0&&!st[c.c].consolidated).map(c=>c.c),
    total:ses.length,
    last:ses.length?ses[ses.length-1]:null
  };
}
function nextFrontier(student,opts){
  const st=compStats(student.id);
  const pool=eligible(student,opts);
  if(!pool.length)return null;
  const comps={};pool.forEach(a=>{comps[a.comp]=comps[a.comp]||[];comps[a.comp].push(a.n);});
  const ordered=Object.keys(comps).sort((a,b)=>((st[a]||{v:0}).v)-((st[b]||{v:0}).v));
  const c=ordered[0];
  return {comp:c,v:(st[c]||{v:0}).v,need:CONSOLIDATE_N,suggest:comps[c][0]};
}

/* ---------- Auditoria do catálogo (§15 V1–V8, executável) ---------- */
function audit(){
  const errs=[];
  const need=(cond,msg)=>{if(!cond)errs.push(msg);};
  SPEAKING_ACTIVITIES.forEach(a=>{
    const w=m=>need(false,a.id+': '+m);
    ['comp','purpose','evid','check','brief','banks','compl','rescue','simple','reform','stt','tt','diff','goals','profiles','deps'].forEach(f=>{
      if(a[f]==null)w('campo obrigatório ausente: '+f);                          // V1
    });
    need(SPEAKING_COMPETENCES.some(c=>c.c===a.comp),a.id+': competência fora do catálogo §11'); // V2
    (a.banks||[]).forEach(b=>need(SPEAKING_FOLLOWUP_BANKS[b],a.id+': banco inexistente §8: '+b));
    if(a.tt==='Medium')need(!!a.ttWhy,a.id+': TT Medium sem justificativa (V7)');
    need(a.tt!=='High',a.id+': TT High é proibido (V7)');
    if(a.req&&a.req.length)need(SPEAKING_THEMES.filter(t=>a.req.every(r=>t.offers.indexOf(r)>=0)).length>=3,
      a.id+': <3 temas satisfazem os requisitos — teste de reutilização AX1/V4 em risco');
  });
  return errs;
}

/* ---------- API pública ---------- */
const api={
  propose:function(student,opts){
    const p1=select(student,opts);
    if(!p1)return null;
    const m1=fuse(student,p1);
    const p2=select(student,opts,p1.act.id);
    return {mission:m1,why:why(student,m1),alt:p2?fuse(student,p2):null};
  },
  record:record, setObs:setObs, footprint:footprint, nextFrontier:nextFrontier,
  audit:audit, eligible:eligible,
  _setStore:function(s){store=s;} // testes/injeção — a UI não usa
};
if(typeof window!=='undefined')window.SpeakingEngine=api;
if(typeof module!=='undefined'&&module.exports)module.exports=api;
})();
