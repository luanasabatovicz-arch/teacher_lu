/* ==========================================================================
   Teacher Lu Design System — Lucide Icons Bootstrap
   Carrega Lucide via CDN e mantém os ícones renderizados mesmo quando o HTML
   é gerado dinamicamente por outros scripts (template literals, innerHTML).
   Uso em qualquer página:
     <script src="design-system/icons.js" defer></script>
   Uso em HTML:
     <i data-lucide="download" class="tl-icon"></i>
     <i data-lucide="pencil" class="tl-icon tl-icon-sm"></i>
   ========================================================================== */
(function () {
  'use strict';

  const CDN = 'https://unpkg.com/lucide@latest/dist/umd/lucide.min.js';
  let mo = null;
  let scheduled = false;

  function paint() {
    if (!window.lucide || typeof window.lucide.createIcons !== 'function') return;
    try { window.lucide.createIcons(); } catch (e) { /* silêncio proposital */ }
  }

  /* Debounce: se JS de outra tela chamar innerHTML várias vezes seguidas,
     não repaint 60x — pintar uma só vez ao fim do frame. */
  function schedulePaint() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(function () {
      scheduled = false;
      paint();
    });
  }

  function boot() {
    paint();
    // Observa qualquer conteúdo novo em qualquer lugar do body — renderiza ícones
    // de HTML gerado depois por platform-*.js, engine/*.js, template literals, etc.
    if ('MutationObserver' in window) {
      mo = new MutationObserver(function (mutations) {
        for (let i = 0; i < mutations.length; i++) {
          if (mutations[i].addedNodes && mutations[i].addedNodes.length) {
            schedulePaint();
            return;
          }
        }
      });
      mo.observe(document.body, { childList: true, subtree: true });
    }
  }

  function loadCDN() {
    return new Promise(function (resolve, reject) {
      if (window.lucide) return resolve();
      const s = document.createElement('script');
      s.src = CDN;
      s.defer = true;
      s.onload = resolve;
      s.onerror = function () { reject(new Error('Lucide CDN failed to load')); };
      document.head.appendChild(s);
    });
  }

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  }

  ready(function () {
    loadCDN().then(boot).catch(function () {
      /* offline / sem rede: emojis originais continuam visíveis, nada quebra */
    });
  });
})();
