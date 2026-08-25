/* ==========================================================================
   Teacher Lu Studio — configuração da nuvem
   --------------------------------------------------------------------------
   Os DOIS únicos valores que você precisa preencher. Estão em
   Supabase → seu projeto → Project Settings → API Keys.

   Passo a passo com telas: supabase/SETUP.md

   POR QUE A PUBLISHABLE KEY PODE FICAR AQUI, NO CÓDIGO PÚBLICO
   -----------------------------------------------------------
   A publishable key (`sb_publishable_...`) foi feita exatamente para isto:
   viver no frontend, à vista de todo mundo. Ela identifica o PROJETO, não a
   pessoa — é o endereço da porta, não a chave dela.

   Sozinha, ela não lê nem escreve nada nas tabelas da Studio. São três
   camadas antes do dado:

     1. Autenticação — sem login não existe `auth.uid()`;
     2. GRANTs       — o papel `anon` (quem chega sem login) não tem
                       privilégio NENHUM nas 7 tabelas. Nem SELECT;
     3. RLS          — para quem está autenticado, cada policy exige
                       `owner_id = auth.uid()`.

   Um visitante com esta chave na mão bate na camada 2 e recebe
   "permission denied" antes mesmo de a RLS entrar na conversa.

   Esta é uma aplicação nova, então usa a publishable key moderna e não a
   legacy `anon` key (o JWT longo começado em `eyJ...`). As duas funcionam,
   mas a legacy está em caminho de descontinuação no Supabase.

   O que NUNCA pode entrar neste arquivo — nem em nenhum outro do repositório:
     • a secret key (`sb_secret_...`) ou a legacy `service_role`
       — essas ignoram a RLS e dariam acesso total ao banco;
     • a senha do banco de dados;
     • a sua senha de login;
     • qualquer token administrativo.

   Se uma secret key vazar para cá, o repositório inteiro vira chave-mestra.
   A publishable key, não.
   ========================================================================== */

(function (global) {
  'use strict';

  var NS = global.TeacherLu = global.TeacherLu || {};

  NS.CloudConfig = {

    /* Project URL — algo como 'https://abcdefghijklm.supabase.co' */
    SUPABASE_URL: '',

    /* Publishable key — começa com 'sb_publishable_' */
    SUPABASE_PUBLISHABLE_KEY: '',

    /* Página de login. Trocar só se você renomear o arquivo. */
    LOGIN_PAGE: 'login.html',

    /* Para onde ir depois do login. */
    HOME_PAGE: 'index.html',

    /**
     * Páginas que NÃO exigem sessão. Tudo que não estiver aqui é protegido
     * por platform-auth.js.
     */
    PUBLIC_PAGES: ['login.html'],

    /** Config preenchida? Usado pelas telas para dar um aviso honesto. */
    isConfigured: function () {
      var c = NS.CloudConfig;
      return !!(c.SUPABASE_URL && c.SUPABASE_PUBLISHABLE_KEY &&
                c.SUPABASE_URL.indexOf('http') === 0);
    },

    /**
     * Guarda-costas contra o erro mais caro possível: colar aqui uma chave
     * que NÃO pode ser pública. Não impede nada sozinho — só grita bem alto
     * no console em vez de deixar passar em silêncio.
     */
    looksLikeSecret: function (key) {
      var k = String(key || '');
      return /^sb_secret_/i.test(k) || /service_role/i.test(k);
    }
  };

})(typeof window !== 'undefined' ? window : this);
