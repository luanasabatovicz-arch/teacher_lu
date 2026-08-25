/* ==========================================================================
   Teacher Lu Studio — configuração da nuvem
   --------------------------------------------------------------------------
   Os DOIS únicos valores que você precisa preencher. Estão em
   Supabase → seu projeto → Project Settings → API.

   Passo a passo com telas: supabase/SETUP.md

   POR QUE A ANON KEY PODE FICAR AQUI, NO CÓDIGO PÚBLICO
   -----------------------------------------------------
   A anon key é PÚBLICA POR DESIGN. Ela identifica o projeto, não a pessoa.
   Sozinha ela não lê nem escreve nada: toda tabela tem Row Level Security
   ligada, e toda policy exige um usuário autenticado cujo `auth.uid()`
   bata com o `owner_id` da linha. Sem login, a API devolve lista vazia na
   leitura e erro na escrita.

   O que NUNCA pode entrar neste arquivo — nem em nenhum outro do repositório:
     • a service_role key (essa ignora RLS e daria acesso total);
     • sua senha;
     • qualquer token administrativo.

   Se algum dia a service_role vazar para cá, o repositório inteiro vira
   chave-mestra do banco. A anon key, não.
   ========================================================================== */

(function (global) {
  'use strict';

  var NS = global.TeacherLu = global.TeacherLu || {};

  NS.CloudConfig = {

    /* Project URL — algo como 'https://abcdefghijklm.supabase.co' */
    SUPABASE_URL: '',

    /* anon / public key — o JWT longo que começa com 'eyJ...' */
    SUPABASE_ANON_KEY: '',

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
      return !!(c.SUPABASE_URL && c.SUPABASE_ANON_KEY &&
                c.SUPABASE_URL.indexOf('http') === 0);
    }
  };

})(typeof window !== 'undefined' ? window : this);
