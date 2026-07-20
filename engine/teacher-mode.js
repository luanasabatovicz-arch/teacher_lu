/* ============================================================
   MODO PROFESSOR — separação das interfaces (aluno × professor)
   Padrão: visão do ALUNO. Tudo que for orientação metodológica,
   estratégia de condução, tempo, critério de avaliação ou dica
   de professora recebe a classe .teacher-only e fica OCULTO.
   O botão flutuante alterna e a escolha persiste entre páginas.
   ============================================================ */
(function(){
'use strict';
var KEY='slf_teacher_mode';

function isOn(){ try{ return localStorage.getItem(KEY)==='1'; }catch(e){ return false; } }

function paint(){
  if(!document.body)return;
  document.body.classList.toggle('teacher-mode', isOn());
  var b=document.getElementById('tmBtn');
  if(b){
    b.innerHTML = isOn() ? '👩‍🏫 Modo Professor: ON' : '👩‍🏫 Modo Professor';
    b.title = isOn() ? 'Ocultar orientações — voltar à visão do aluno' : 'Mostrar orientações de condução (só para você)';
  }
}

window.toggleTeacherMode=function(){
  try{ localStorage.setItem(KEY, isOn()?'0':'1'); }catch(e){}
  paint();
  if(typeof window.onTeacherModeChange==='function'){ try{ window.onTeacherModeChange(isOn()); }catch(e){} }
};
window.isTeacherMode=isOn;

function init(){
  var css=document.createElement('style');
  css.textContent=
    /* oculto por padrão = visão do aluno */
    '.teacher-only{display:none !important}'+
    'body.teacher-mode .teacher-only{display:block !important}'+
    'body.teacher-mode .teacher-only.inline{display:inline !important}'+
    'body.teacher-mode .teacher-only.flexrow{display:flex !important}'+
    /* faixa discreta indicando que o professor está vendo extras */
    'body.teacher-mode .teacher-only{outline:1px dashed #c4b5fd;outline-offset:2px;border-radius:8px}'+
    /* botão flutuante */
    '#tmBtn{position:fixed;right:14px;bottom:14px;z-index:99999;background:#fff;border:1px solid #ddd6fe;'+
      'color:#6d28d9;font-family:Inter,system-ui,sans-serif;font-weight:700;font-size:12px;padding:9px 14px;'+
      'border-radius:22px;cursor:pointer;box-shadow:0 4px 14px rgba(124,58,237,.18);opacity:.55;transition:opacity .2s}'+
    '#tmBtn:hover{opacity:1}'+
    'body.teacher-mode #tmBtn{background:linear-gradient(135deg,#7c3aed,#db2777);color:#fff;border-color:transparent;opacity:1}'+
    '@media print{#tmBtn{display:none}}';
  document.head.appendChild(css);

  var b=document.createElement('button');
  b.id='tmBtn'; b.type='button';
  b.addEventListener('click', window.toggleTeacherMode);
  document.body.appendChild(b);
  paint();
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
else init();
})();
