/* ==========================================================================
   Teacher Lu Practice — Navegação (esqueleto)
   --------------------------------------------------------------------------
   Contrato pronto para receber rotas quando os módulos pedagógicos existirem.
   Hoje: apenas a entrada Home e o retorno para a Studio.

   USO
   ---
     var items = TeacherLu.Practice.Nav.items();
     // → [{id, label, icon, href, group}, ...]

     TeacherLu.Practice.Nav.register({
       id: 'flashcards', label: 'Flashcards',
       icon: 'layers', href: 'flashcards.html', group: 'Prática'
     });

   NUNCA LANÇA. Rotas duplicadas por id são substituídas.
   ========================================================================== */

(function (global) {
  'use strict';

  var NS = global.TeacherLu = global.TeacherLu || {};
  var Practice = NS.Practice = NS.Practice || {};

  /* Rotas padrão — só o mínimo para F1. Não há módulos pedagógicos. */
  var routes = [
    {
      id: 'home',
      label: 'Home',
      icon: 'home',
      href: 'index.html',
      group: 'Practice',
      description: 'Painel de status dos módulos compartilhados'
    },
    {
      id: 'studio-menu',
      label: 'Voltar ao Menu Studio',
      icon: 'arrow-left-circle',
      href: '../index.html',
      group: 'Studio',
      description: 'Retorna ao menu principal da Teacher Lu Studio'
    }
  ];

  Practice.Nav = {
    /** Rotas registradas — ordenadas por grupo e ordem de inserção. */
    items: function () { return routes.slice(); },

    register: function (route) {
      if (!route || !route.id || !route.href) {
        console.warn('[practice-nav] rota precisa de id + href');
        return Practice.Nav;
      }
      routes = routes.filter(function (r) { return r.id !== route.id; });
      routes.push({
        id: route.id,
        label: route.label || route.id,
        icon: route.icon || 'square',
        href: route.href,
        group: route.group || 'Practice',
        description: route.description || ''
      });
      return Practice.Nav;
    }
  };

})(typeof window !== 'undefined' ? window : this);
