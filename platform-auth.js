/* ==========================================================================
   Teacher Lu Studio — Auth guard
   --------------------------------------------------------------------------
   A camada de sessão. Uma única conta administrativa: a da professora.

   ORDEM DE CARREGAMENTO (no <head>, antes de qualquer outra coisa)
   ----------------------------------------------------------------
     <script src="platform-cloud-config.js"></script>
     <script src="vendor/supabase.js"></script>
     <script src="platform-auth.js"></script>
     <script src="platform-cloud.js"></script>

   POR QUE NO <head> E SÍNCRONO
   ----------------------------
   Se o guard rodasse no fim do <body>, a página inteira já teria pintado
   nomes de alunos e notas antes de descobrir que não há sessão. Aqui ele
   roda antes do primeiro pixel: esconde o documento, decide, e só então
   libera. Sem flash de conteúdo privado.

   A DECISÃO É SÍNCRONA — E POR QUE ISSO NÃO É INSEGURO
   ----------------------------------------------------
   O guard olha a sessão que o Supabase já guardou no localStorage deste
   navegador. É uma decisão local, instantânea, e serve só para NAVEGAÇÃO:
   mandar para o login quem não tem sessão.

   Ela não protege dado nenhum — e não precisa. A proteção real está no
   banco: RLS exige `owner_id = auth.uid()` em toda linha. Quem forjar o
   localStorage do próprio navegador para enganar este guard entra numa
   Studio vazia, porque o Postgres não devolve uma linha sequer sem um JWT
   válido. Esconder a tela é conveniência; a RLS é a segurança.

   Logo depois, de forma assíncrona, o cliente valida a sessão contra o
   servidor. Se ela tiver sido revogada, a sessão é encerrada e a página
   vai para o login.

   CONTRATO
   --------
   • Nunca lança.
   • Nunca guarda senha em lugar nenhum. O que fica no navegador é o token
     que o próprio Supabase gerencia.
   ========================================================================== */

(function (global) {
  'use strict';

  var NS = global.TeacherLu = global.TeacherLu || {};
  var CFG = NS.CloudConfig || {};

  var HIDE_STYLE_ID = 'tl-auth-veil';
  var FAILSAFE_MS = 6000;

  /* ----------------------------------------------------------------------
     Véu anti-flash
     ---------------------------------------------------------------------- */

  function veilOn() {
    try {
      if (document.getElementById(HIDE_STYLE_ID)) return;
      var s = document.createElement('style');
      s.id = HIDE_STYLE_ID;
      s.textContent = 'body{visibility:hidden!important}';
      (document.head || document.documentElement).appendChild(s);
      // Se algo der errado no meio do caminho, a página não fica branca
      // para sempre — o conteúdo aparece e a professora não perde a aula.
      global.setTimeout(veilOff, FAILSAFE_MS);
    } catch (e) { /* nunca lança */ }
  }

  function veilOff() {
    try {
      var s = document.getElementById(HIDE_STYLE_ID);
      if (s && s.parentNode) s.parentNode.removeChild(s);
    } catch (e) { /* nunca lança */ }
  }

  /* ----------------------------------------------------------------------
     Sessão em cache (decisão síncrona)
     ---------------------------------------------------------------------- */

  /** 'https://abcdef.supabase.co' -> 'abcdef' */
  function projectRef() {
    try {
      var m = String(CFG.SUPABASE_URL || '').match(/^https?:\/\/([a-z0-9-]+)\./i);
      return m ? m[1] : '';
    } catch (e) { return ''; }
  }

  function storageKey() {
    var ref = projectRef();
    return ref ? ('sb-' + ref + '-auth-token') : '';
  }

  /**
   * Existe sessão guardada neste navegador?
   * Um access_token vencido AINDA conta, desde que haja refresh_token: o
   * cliente renova sozinho. Tratar isso como "sem sessão" jogaria a
   * professora no login toda manhã.
   */
  function cachedSession() {
    try {
      var k = storageKey();
      if (!k) return null;
      var raw = localStorage.getItem(k);
      if (!raw) return null;
      var v = JSON.parse(raw);
      // O formato do supabase-js v2 já é o objeto de sessão; versões
      // antigas embrulhavam em { currentSession }.
      var sess = v && (v.currentSession || v);
      if (!sess || typeof sess !== 'object') return null;
      if (!sess.access_token && !sess.refresh_token) return null;
      return sess;
    } catch (e) { return null; }
  }

  function currentPage() {
    try {
      var p = location.pathname.split('/').pop() || 'index.html';
      return p.toLowerCase();
    } catch (e) { return 'index.html'; }
  }

  function isPublicPage() {
    var page = currentPage();
    var list = CFG.PUBLIC_PAGES || [];
    for (var i = 0; i < list.length; i++) {
      if (String(list[i]).toLowerCase() === page) return true;
    }
    return false;
  }

  /* ----------------------------------------------------------------------
     Cliente Supabase — um só por página
     ---------------------------------------------------------------------- */

  var _client = null;

  function client() {
    if (_client) return _client;
    try {
      if (!CFG.isConfigured || !CFG.isConfigured()) return null;
      var lib = global.supabase;
      if (!lib || !lib.createClient) return null;
      _client = lib.createClient(CFG.SUPABASE_URL, CFG.SUPABASE_ANON_KEY, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: false
        }
      });
    } catch (e) {
      console.error('[auth] não foi possível criar o cliente Supabase', e);
      _client = null;
    }
    return _client;
  }

  /* ----------------------------------------------------------------------
     API pública
     ---------------------------------------------------------------------- */

  var Auth = {

    VERSION: '1.0.0',

    client: client,
    veilOff: veilOff,
    cachedSession: cachedSession,

    /** Decisão síncrona: há sessão neste navegador? */
    isSignedIn: function () { return !!cachedSession(); },

    /** O e-mail da conta logada, para exibir no menu. */
    email: function () {
      var s = cachedSession();
      return (s && s.user && s.user.email) || '';
    },

    /** O id do usuário — é o `owner_id` de toda linha no banco. */
    userId: function () {
      var s = cachedSession();
      return (s && s.user && s.user.id) || '';
    },

    /**
     * Login. Só é chamado por login.html.
     * A senha NUNCA é guardada: vai direto para o Supabase e some.
     */
    signIn: function (email, password) {
      var c = client();
      if (!c) {
        return Promise.resolve({
          ok: false,
          message: 'A Studio ainda não está conectada ao Supabase. ' +
                   'Preencha platform-cloud-config.js — instruções em supabase/SETUP.md.'
        });
      }
      return c.auth.signInWithPassword({
        email: String(email || '').trim(),
        password: String(password || '')
      }).then(function (res) {
        if (res.error) {
          return { ok: false, message: friendlyError(res.error) };
        }
        return { ok: true, session: res.data && res.data.session };
      }).catch(function (e) {
        return { ok: false, message: friendlyError(e) };
      });
    },

    /** Logout: encerra a sessão e volta para o login. */
    signOut: function () {
      var c = client();
      var done = function () {
        try { location.replace(CFG.LOGIN_PAGE || 'login.html'); } catch (e) {}
      };
      if (!c) { done(); return Promise.resolve(); }
      return c.auth.signOut().then(done).catch(done);
    },

    /**
     * Confirma com o SERVIDOR que a sessão ainda vale.
     * Chamada em segundo plano depois que a página já apareceu — uma
     * sessão revogada em outro computador derruba esta aqui também.
     * Offline não derruba ninguém: sem rede, a sessão em cache continua.
     */
    verify: function () {
      var c = client();
      if (!c) return Promise.resolve(true);
      return c.auth.getUser().then(function (res) {
        if (res && res.error) {
          var msg = String((res.error && res.error.message) || '');
          // Falha de rede não é sessão inválida.
          if (/fetch|network|failed to fetch/i.test(msg)) return true;
          return false;
        }
        return !!(res && res.data && res.data.user);
      }).catch(function () { return true; });   // offline → mantém
    },

    /** Redireciona para o login preservando de onde a pessoa veio. */
    toLogin: function () {
      try {
        var back = encodeURIComponent(currentPage() + location.search);
        location.replace((CFG.LOGIN_PAGE || 'login.html') + '?next=' + back);
      } catch (e) {
        location.replace(CFG.LOGIN_PAGE || 'login.html');
      }
    },

    /**
     * Botão de Logout discreto, canto inferior direito, ao lado do
     * indicador de sync. Injetado uma vez por página protegida — nenhuma
     * página precisa de HTML novo para isso.
     */
    mountLogout: function () {
      try {
        if (document.getElementById('tl-auth-chip')) return;
        if (isPublicPage()) return;

        var wrap = document.createElement('div');
        wrap.id = 'tl-auth-chip';
        wrap.setAttribute('role', 'status');
        wrap.innerHTML =
          '<button type="button" id="tl-logout" title="' +
          (Auth.email() || 'Sair') + '">Logout</button>';

        var css = document.createElement('style');
        css.textContent =
          '#tl-auth-chip{position:fixed;right:14px;bottom:14px;z-index:9999;' +
          'display:flex;align-items:center;gap:8px;font:500 12px/1 system-ui,' +
          '-apple-system,Segoe UI,Roboto,sans-serif}' +
          '#tl-auth-chip button{border:1px solid rgba(15,76,92,.18);' +
          'background:rgba(255,255,255,.92);color:#0f4c5c;border-radius:999px;' +
          'padding:7px 12px;cursor:pointer;backdrop-filter:blur(6px);' +
          'box-shadow:0 1px 3px rgba(15,76,92,.10)}' +
          '#tl-auth-chip button:hover{background:#fff;border-color:rgba(15,76,92,.32)}' +
          '@media print{#tl-auth-chip{display:none}}';

        document.head.appendChild(css);
        document.body.appendChild(wrap);
        document.getElementById('tl-logout').addEventListener('click', function () {
          Auth.signOut();
        });
      } catch (e) { /* nunca lança */ }
    }
  };

  function friendlyError(err) {
    var msg = String((err && err.message) || err || '');
    if (/invalid login credentials/i.test(msg)) return 'E-mail ou senha incorretos.';
    if (/email not confirmed/i.test(msg))      return 'Confirme o e-mail da conta no Supabase antes de entrar.';
    if (/failed to fetch|network/i.test(msg))  return 'Sem conexão com o servidor. Verifique a internet.';
    if (/rate limit/i.test(msg))               return 'Muitas tentativas seguidas. Espere um instante.';
    return msg || 'Não foi possível entrar.';
  }

  NS.Auth = Auth;

  /* ======================================================================
     GUARD — roda agora, no parse do <head>
     ====================================================================== */
  (function guard() {
    if (isPublicPage()) return;

    veilOn();

    // Sem config, não dá para autenticar ninguém. Em vez de mandar para um
    // login que também não funciona, deixa a página abrir e avisa no console:
    // é exatamente o estado do repositório antes de você criar o projeto.
    if (!CFG.isConfigured || !CFG.isConfigured()) {
      console.warn('[auth] Supabase não configurado — a Studio está rodando ' +
                   'somente com dados locais. Veja supabase/SETUP.md.');
      veilOff();
      return;
    }

    if (!cachedSession()) {
      Auth.toLogin();
      return;
    }

    // Há sessão: libera a página assim que o body existir.
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        veilOff();
        Auth.mountLogout();
      });
    } else {
      veilOff();
      Auth.mountLogout();
    }

    // Confirmação com o servidor, sem travar a tela.
    global.setTimeout(function () {
      Auth.verify().then(function (ok) {
        if (!ok) {
          console.warn('[auth] sessão inválida ou revogada — encerrando');
          Auth.signOut();
        }
      });
    }, 0);
  })();

})(typeof window !== 'undefined' ? window : this);
