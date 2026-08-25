# Ligar a Teacher Lu Studio ao Supabase

Sete passos. Leva uns 15 minutos, e você só precisa fazer **uma vez**.

Nenhum passo aqui pede senha no código. Nenhum passo pede a Secret key (`sb_secret_` / `service_role`).

---

## 1. Criar o projeto

1. Abra **https://supabase.com** e entre com sua conta (pode ser com o Google).
2. **New project**.
3. Preencha:
   - **Name**: `teacher-lu-studio`
   - **Database Password**: clique em **Generate a password** e **guarde no seu gerenciador de senhas**. Essa senha é do banco de dados, não é a sua senha de login na Studio — você provavelmente nunca vai usá-la, mas se perder não dá para recuperar.
   - **Region**: `South America (São Paulo)` — é o servidor mais perto, e isso aparece na velocidade durante a aula.
   - **Plan**: Free.
4. **Create new project** e espere uns 2 minutos até o projeto ficar verde.

---

## 2. Rodar o `schema.sql`

1. No menu lateral do projeto, clique em **SQL Editor**.
2. **New query**.
3. Abra o arquivo `supabase/schema.sql` deste repositório, copie **o conteúdo inteiro** e cole na janela.
4. **Run** (ou `Ctrl+Enter`).

Deve terminar com *Success. No rows returned*.

Se quiser conferir, cole e rode isto:

```sql
select c.relname as tabela,
       c.relrowsecurity as rls,
       (select count(*) from pg_policies p
         where p.schemaname = 'public' and p.tablename = c.relname) as policies
  from pg_class c
  join pg_namespace n on n.oid = c.relnamespace
 where n.nspname = 'public'
   and c.relname in ('students','lesson_records','lesson_content',
                     'content_notes','custom_content',
                     'practice_usage_days','practice_usage_legacy')
 order by 1;
```

As 7 tabelas precisam aparecer com **rls = true** e **policies = 4**. Se alguma vier com `rls = false`, rode o `schema.sql` de novo — sem RLS, os dados ficariam abertos.

O `schema.sql` pode ser rodado quantas vezes você quiser: ele não apaga dado nenhum.

> **Se você já rodou uma versão anterior deste arquivo:** rode de novo. A tabela `practice_usage` (que guardava um contador) foi substituída por `practice_usage_days`, com uma linha por dia de uso — um contador perdia utilização quando dois computadores ficavam offline em dias diferentes. O script remove a tabela antiga **só se ela estiver vazia**; se tiver qualquer linha, ele avisa e não apaga nada.

---

## 3. Criar a sua conta — a única

A Studio não tem cadastro público, nem tela de Sign up. A sua conta é criada aqui dentro, à mão:

1. Menu lateral → **Authentication** → **Users**.
2. **Add user** → **Create new user**.
3. Preencha o **e-mail** e a **senha** que você vai usar para entrar na Studio.
4. Marque **Auto Confirm User** (senão o Supabase espera você clicar num e-mail de confirmação).
5. **Create user**.

Essa senha é sua e não aparece em lugar nenhum do código. Guarde no gerenciador de senhas.

### Fechar a porta do cadastro público

Ainda em **Authentication** → **Sign In / Providers** (ou **Settings**, dependendo da versão da tela):

- desligue **Allow new users to sign up**.

Com isso, mesmo alguém que descubra a URL do projeto não consegue criar conta. A sua continua funcionando normalmente.

---

## 4. Pegar os dois valores

Menu lateral → **Project Settings** (a engrenagem) → **API Keys**.

Copie:

| Onde está na tela | O que é |
|---|---|
| **Project Settings → API** (ou **Data API**) → **Project URL** | algo como `https://abcdefghijklm.supabase.co` |
| **Project Settings → API Keys → Publishable key** | um texto começando com `sb_publishable_...` |

A **Publishable key** é a chave moderna, feita para viver no frontend. Se a tela também mostrar uma aba de **Legacy API keys** com uma `anon` `public` (aquele JWT longo começando em `eyJ...`), **ignore** — ela ainda funciona, mas está em caminho de descontinuação, e esta é uma aplicação nova.

Na mesma tela existe uma **Secret key** (`sb_secret_...`, a antiga `service_role`), escondida atrás de um **Reveal**. **Não copie.** Ela ignora todas as regras de segurança e daria acesso total ao banco — nunca pode entrar em nenhum arquivo deste repositório. Se você colar uma secret key por engano, a Studio se recusa a criar o cliente e grita no console.

---

## 5. Colar na Studio

Abra o arquivo **`platform-cloud-config.js`** na raiz do projeto e preencha as duas linhas:

```js
SUPABASE_URL:             'https://abcdefghijklm.supabase.co',
SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_...',
```

Salve, faça commit e publique como você já publica a Studio.

### "Mas a chave não fica pública no GitHub?"

Fica — **e tudo bem, é exatamente para isso que ela existe.**

A publishable key identifica o *projeto*, não *você*. É o endereço da porta, não a chave dela. Entre ela e os seus dados há três camadas:

1. **Autenticação** — sem login não existe `auth.uid()`;
2. **GRANTs** — o papel `anon` (quem chega sem login) **não tem privilégio nenhum** nas 7 tabelas, nem `SELECT`;
3. **RLS** — para quem está autenticado, toda policy exige `owner_id = auth.uid()`.

Quem pegar essa chave no GitHub e tentar ler a tabela de alunos recebe `permission denied` na camada 2, antes mesmo de a RLS entrar na conversa. Isso é testável em `verificacao-cloud.html`.

O que **nunca** pode ficar público é a **Secret key**, porque ela passa por cima de tudo isso.

A segurança dos seus dados está em Auth + GRANTs + RLS, não em esconder a URL.

---

## 6. Entrar

1. Abra `login.html`.
2. E-mail e senha do passo 3 → **Sign in**.

Qualquer página que você abrir sem sessão manda você para cá automaticamente — inclusive o **Finance**. Os dados do Finance continuam no armazenamento local de sempre; o que mudou é só que a página passou a exigir sessão.

---

## 7. Migrar os seus dados

Só depois de conseguir entrar:

1. Abra **`migracao.html`** no computador **que tem os dados reais**.
2. Siga os 6 passos da tela, em ordem: backup → analisar → conferir a nuvem → importar → verificar → ligar a sincronização.

A migração **não apaga nada** do computador, e rodá-la duas vezes por engano não duplica nada.

Depois disso, no **segundo computador** é só fazer login: os dados descem sozinhos, porque lá não há nada local para conflitar.

---

## Conferir se ficou tudo certo

Abra **`verificacao-cloud.html`** e clique em **Run**. A página testa sozinha:

- a sessão é válida e sobrevive ao refresh;
- um visitante **sem login** não lê nem escreve **uma linha** — barrado já nos GRANTs;
- `merge_practice_legacy` não é chamável sem login;
- Progress, PracticeLog e Calendar chegam ao banco como linhas independentes;
- o outro computador reconstrói o Learning History corretamente;
- reenviar a mesma operação não duplica;
- **dois computadores offline em dias diferentes somam** (o caso que o contador errava);
- dois computadores no mesmo dia não duplicam a utilização;
- `firstAt`, `lastAt` e `n` do PracticeLog saem certos;
- a hidratação não gera laço de sincronização;
- ficar offline não perde alteração, e voltar a internet sincroniza.

Ela usa um aluno de teste (`__qa_cloud__`) e apaga tudo que criou no fim.

---

## Se der problema

| Sintoma | Causa provável |
|---|---|
| A tela de login diz que não está conectada | `platform-cloud-config.js` ainda está vazio |
| Console diz "parece ser uma SECRET key" | você colou `sb_secret_` no lugar da Publishable key |
| `permission denied for table ...` já logada | os GRANTs não rodaram — rode o `schema.sql` de novo |
| "E-mail ou senha incorretos" com a senha certa | usuário criado sem **Auto Confirm** |
| O chip mostra `Local — migração pendente` | falta rodar `migracao.html` neste computador |
| O chip fica em `Offline` com internet boa | a `SUPABASE_URL` está errada, ou o `schema.sql` não foi executado |
| `verificacao-cloud.html` acusa leitura anônima | o bloco de RLS do `schema.sql` não rodou — rode de novo |
| `finance.html` abre sem pedir login | os `<script>` da camada de nuvem não estão no `<head>` dessa página |

O `Export Backup` em `migracao.html` continua funcionando em qualquer um desses casos. Ele não depende da nuvem.
