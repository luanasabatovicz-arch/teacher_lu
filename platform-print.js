/* ==========================================================================
   Teacher Lu Platform — Print helper
   --------------------------------------------------------------------------
   A mesma funcao printDoc() estava copiada em 6 paginas, em 3 variantes que
   diferiam apenas no CSS. Aqui ela existe uma vez; cada pagina passa o seu
   CSS quando precisa de um diferente do padrao.

   Comportamento identico ao anterior, byte a byte.

     TeacherLu.printDoc(html, title)        -> CSS padrao
     TeacherLu.printDoc(html, title, css)   -> CSS proprio da pagina
   ========================================================================== */

(function (global) {
  'use strict';
  var NS = global.TeacherLu = global.TeacherLu || {};

  /* CSS padrao — usado por annual-plan, exercise-generator, grammar e lessons */
  var DEFAULT_CSS = 'body{font-family:Arial,Helvetica,sans-serif;padding:28px;color:#111;line-height:1.6;}h1,h2{margin:16px 0 8px;}table{width:100%;border-collapse:collapse;margin:10px 0;}td,th{border:1px solid #ccc;padding:8px;text-align:left;}';

  NS.PRINT_CSS = {
    DEFAULT: DEFAULT_CSS,
    COMPACT: 'body{font-family:Arial,Helvetica,sans-serif;padding:28px;color:#111;line-height:1.6;}h1,h2{margin:16px 0 8px;}table{width:100%;border-collapse:collapse;margin:10px 0;font-size:13px;}td,th{border:1px solid #ccc;padding:6px;text-align:left;}',
    CALENDAR: 'body{font-family:Arial,Helvetica,sans-serif;padding:28px;color:#111;line-height:1.6;}h1{border-bottom:3px solid #7c3aed;padding-bottom:10px;}table{width:100%;border-collapse:collapse;margin:12px 0;font-size:13px;}td,th{border:1px solid #ccc;padding:7px;text-align:left;}th{background:#f3f0fd;}'
  };

  NS.printDoc = function (html, title, css) {
    var w = window.open('', '_blank');
    if (!w) { alert('Allow pop-ups to generate the PDF.'); return; }
    w.document.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title>' + title + '</title>' +
      '<style>' + (css || DEFAULT_CSS) + '</style></head><body>' + html +
      '<scr' + 'ipt>window.onload=function(){setTimeout(function(){window.print();},250);};<\/scr' + 'ipt></body></html>');
    w.document.close();
  };
})(typeof window !== 'undefined' ? window : this);
