-- ==========================================================================
-- Teacher Lu Studio — Private Web App v1
-- Supabase schema: tabelas, constraints, RLS e policies
-- --------------------------------------------------------------------------
-- COMO USAR
--   Supabase → seu projeto → SQL Editor → New query → cole este arquivo
--   inteiro → Run. É idempotente: pode rodar de novo sem quebrar nada.
--
-- PRINCÍPIOS
--   1. UMA conta administrativa. Não há tabela de perfis, roles ou planos.
--      A identidade vem de auth.users; `owner_id` é sempre auth.uid().
--   2. NADA de blob gigante, e NENHUM contador como fonte da verdade.
--      Cada aluno, cada aula, cada ocorrência de conteúdo numa data e cada
--      DIA de uso de exercício é UMA LINHA, com a data dentro da chave
--      primária. Dois computadores editando coisas diferentes nunca se
--      sobrescrevem, e nenhum evento se perde na ordem da sincronização.
--   3. IDs preservados. `students.id`, `custom_content.content_key`,
--      `practice_usage_days.exercise_id` e `lesson_content.content_id` guardam
--      exatamente as strings que já existem no localStorage ('isa',
--      'grammar:past-simple', 'custom-mf3k2a', 'past-complete-001').
--      Nenhum id novo é gerado para dado existente.
--   4. Progress não é duplicado. A verdade histórica é
--      (student_id, content_id, lesson_date) em `lesson_content`.
--      firstAt / lastAt / times / lessons são DERIVADOS no cliente, como
--      já são hoje em Progress.learningHistory().
-- ==========================================================================

-- --------------------------------------------------------------------------
-- updated_at automático
-- --------------------------------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;


-- ==========================================================================
-- students
-- --------------------------------------------------------------------------
-- `id` é o studentId que já existe ('isa', 'joao', 'natali'). A chave
-- primária é composta com owner_id para o id continuar sendo o mesmo texto
-- curto de sempre, sem UUID novo e sem risco de colisão entre contas.
-- ==========================================================================
create table if not exists public.students (
  owner_id    uuid        not null default auth.uid()
                          references auth.users (id) on delete cascade,
  id          text        not null,
  name        text        not null,
  emoji       text        not null default '',
  level       text        not null default '',
  age         text        not null default '',
  -- { mode, startTime, duration, breakMinutes } — docs/CONSECUTIVE-LESSONS.md
  schedule    jsonb,
  -- qualquer campo futuro do registro do aluno, sem precisar de migração
  extra       jsonb       not null default '{}'::jsonb,
  sort_order  integer     not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  primary key (owner_id, id)
);

drop trigger if exists students_touch on public.students;
create trigger students_touch before update on public.students
  for each row execute function public.touch_updated_at();


-- ==========================================================================
-- lesson_records  —  o que aconteceu na aula daquele dia
-- --------------------------------------------------------------------------
-- Equivale à chave 'sched|<studentId>|<YYYY-MM-DD>' de schedule.html.
-- `sessions` guarda o array de aulas duplas quando existir.
-- ==========================================================================
create table if not exists public.lesson_records (
  owner_id    uuid        not null default auth.uid()
                          references auth.users (id) on delete cascade,
  student_id  text        not null,
  lesson_date date        not null,
  status      text        not null default '',   -- done | scheduled | cancelled | ''
  note        text        not null default '',
  sessions    jsonb,                             -- [{status,note,homework}, ...]
  extra       jsonb       not null default '{}'::jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  primary key (owner_id, student_id, lesson_date)
);

create index if not exists lesson_records_by_student
  on public.lesson_records (owner_id, student_id, lesson_date desc);
create index if not exists lesson_records_by_date
  on public.lesson_records (owner_id, lesson_date desc);

drop trigger if exists lesson_records_touch on public.lesson_records;
create trigger lesson_records_touch before update on public.lesson_records
  for each row execute function public.touch_updated_at();


-- ==========================================================================
-- lesson_content  —  A VERDADE HISTÓRICA do Progress
-- --------------------------------------------------------------------------
-- Uma linha por ocorrência: "este aluno estudou este conteúdo nesta data".
-- É a única fonte. O cliente deriva daqui:
--   firstAt  = min(lesson_date)
--   lastAt   = max(lesson_date)
--   times    = count(*)
--   lessons  = array das datas
-- A PK já torna o registro idempotente: marcar duas vezes o mesmo conteúdo
-- na mesma data não duplica nada, em nenhum computador.
-- ==========================================================================
create table if not exists public.lesson_content (
  owner_id    uuid        not null default auth.uid()
                          references auth.users (id) on delete cascade,
  student_id  text        not null,
  content_id  text        not null,   -- 'grammar:past-simple', 'reading:custom-mf3k2a'
  lesson_date date        not null,   -- '1970-01-01' = cobertura pré-Progress (legado)
  created_at  timestamptz not null default now(),
  primary key (owner_id, student_id, content_id, lesson_date)
);

create index if not exists lesson_content_by_student
  on public.lesson_content (owner_id, student_id, lesson_date desc);
create index if not exists lesson_content_by_date
  on public.lesson_content (owner_id, student_id, lesson_date);


-- ==========================================================================
-- content_notes  —  a anotação livre por (aluno, conteúdo)
-- --------------------------------------------------------------------------
-- Separada de lesson_content porque a nota é do CONTEÚDO para aquele aluno,
-- não de uma data específica. Guardá-la em cada ocorrência criaria três
-- versões contraditórias da mesma informação (§11 do briefing).
-- ==========================================================================
create table if not exists public.content_notes (
  owner_id    uuid        not null default auth.uid()
                          references auth.users (id) on delete cascade,
  student_id  text        not null,
  content_id  text        not null,
  note        text        not null default '',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  primary key (owner_id, student_id, content_id)
);

drop trigger if exists content_notes_touch on public.content_notes;
create trigger content_notes_touch before update on public.content_notes
  for each row execute function public.touch_updated_at();


-- ==========================================================================
-- custom_content  —  conteúdo adicionado pela professora
-- --------------------------------------------------------------------------
-- `content_key` é a chave que já existe ('custom-mf3k2a'), preservada.
-- ==========================================================================
create table if not exists public.custom_content (
  owner_id    uuid        not null default auth.uid()
                          references auth.users (id) on delete cascade,
  content_key text        not null,
  skill       text        not null,
  title       text        not null,
  level       text        not null default '',
  source      text        not null default '',   -- procedência: Cool English, Canva…
  sort_order  integer     not null default 1000,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  primary key (owner_id, content_key)
);

create index if not exists custom_content_by_skill
  on public.custom_content (owner_id, skill, sort_order);

drop trigger if exists custom_content_touch on public.custom_content;
create trigger custom_content_touch before update on public.custom_content
  for each row execute function public.touch_updated_at();


-- ==========================================================================
-- practice_usage_days  —  UM DIA DE USO = UMA LINHA
-- --------------------------------------------------------------------------
-- POR QUE NÃO UM CONTADOR
-- -----------------------
-- A primeira versão deste schema guardava `usage_count` e resolvia conflito
-- com greatest(). Isso PERDE evento:
--
--   nuvem: 2 usos
--   Notebook A offline usa em 24/08  -> local 3
--   Notebook B offline usa em 25/08  -> local 3
--   A sincroniza, B sincroniza -> greatest(3,3) = 3
--   Resposta correta: 4.
--
-- Contador não é comutativo; conjunto de datas é. Com a data DENTRO da chave
-- primária, A grava 24/08, B grava 25/08, e a contagem sai de
-- COUNT(DISTINCT usage_date). Nenhuma ordem de sincronização erra.
--
-- E dois notebooks marcando o MESMO dia colidem na PK e viram uma linha só —
-- que é exatamente a semântica de markDone (idempotente por dia).
--
-- O cliente deriva daqui o formato que platform-practice-log.js já espera:
--   at      = MIN(usage_date)
--   lastAt  = MAX(usage_date), só quando houve repetição
--   n       = COUNT(DISTINCT usage_date) + extra_count (ver tabela abaixo)
-- ==========================================================================
create table if not exists public.practice_usage_days (
  owner_id    uuid        not null default auth.uid()
                          references auth.users (id) on delete cascade,
  student_id  text        not null,
  exercise_id text        not null,
  usage_date  date        not null,
  created_at  timestamptz not null default now(),
  primary key (owner_id, student_id, exercise_id, usage_date)
);

create index if not exists practice_usage_days_by_student
  on public.practice_usage_days (owner_id, student_id, exercise_id);


-- ==========================================================================
-- practice_usage_legacy  —  as utilizações antigas SEM data conhecida
-- --------------------------------------------------------------------------
-- O localStorage guardava `{ at, n, lastAt }`: sabe QUANTOS dias o exercício
-- foi usado, mas só conhece duas datas — a primeira e a última. Para um
-- registro com n = 5, três dias nunca foram gravados em lugar nenhum.
--
-- A migração põe `at` e `lastAt` em practice_usage_days (datas reais) e o que
-- sobra de `n` aqui. Este número CONTA para o total, mas não vira data:
-- fabricar dias só para bater o contador criaria histórico que a professora
-- nunca registrou — e ele apareceria como fato no Learning History.
--
-- LIMITAÇÃO HISTÓRICA, EXPLÍCITA: para registros antigos com n > 2 as datas
-- intermediárias são irrecuperáveis. O contador fica certo; as datas, não.
-- Daqui para a frente todo uso novo é evento real com data real, e esta
-- tabela nunca mais cresce.
-- ==========================================================================
create table if not exists public.practice_usage_legacy (
  owner_id    uuid        not null default auth.uid()
                          references auth.users (id) on delete cascade,
  student_id  text        not null,
  exercise_id text        not null,
  extra_count integer     not null default 0 check (extra_count >= 0),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  primary key (owner_id, student_id, exercise_id)
);

drop trigger if exists practice_usage_legacy_touch on public.practice_usage_legacy;
create trigger practice_usage_legacy_touch before update on public.practice_usage_legacy
  for each row execute function public.touch_updated_at();

-- Só a migração chama isto. greatest() para que rodar a migração duas vezes
-- por engano não reduza nem duplique o resto legado.
create or replace function public.merge_practice_legacy(
  p_student_id  text,
  p_exercise_id text,
  p_extra_count integer
)
returns void
language plpgsql
security invoker            -- roda como o usuário: a RLS continua valendo
set search_path = public
as $$
begin
  insert into public.practice_usage_legacy
    (owner_id, student_id, exercise_id, extra_count)
  values
    (auth.uid(), p_student_id, p_exercise_id, greatest(coalesce(p_extra_count, 0), 0))
  on conflict (owner_id, student_id, exercise_id) do update set
    extra_count = greatest(public.practice_usage_legacy.extra_count, excluded.extra_count),
    updated_at  = now();
end;
$$;


-- ==========================================================================
-- LIMPEZA DA v1 DO SCHEMA
-- --------------------------------------------------------------------------
-- Se você já tinha rodado a primeira versão deste arquivo, a tabela
-- practice_usage e a função merge_practice_usage() existem e não são mais
-- usadas por nada. Como a migração real ainda não foi executada, elas estão
-- vazias — e por isso saem sem perda.
--
-- Se por qualquer motivo houver linha lá, o DROP abaixo NÃO roda e você vê
-- um aviso: nesse caso, fale comigo antes de apagar.
-- ==========================================================================
do $$
declare
  n bigint := 0;
begin
  if to_regclass('public.practice_usage') is not null then
    execute 'select count(*) from public.practice_usage' into n;
    if n = 0 then
      drop function if exists public.merge_practice_usage(text, text, date, date, integer);
      drop table public.practice_usage;
      raise notice 'practice_usage (v1, vazia) removida.';
    else
      raise warning 'practice_usage tem % linha(s) — NAO removida. Confira antes de apagar.', n;
    end if;
  end if;
end;
$$;


-- ==========================================================================
-- ROW LEVEL SECURITY
-- --------------------------------------------------------------------------
-- Sem isto, a publishable key que vive no frontend daria leitura ao mundo
-- inteiro. Com isto, ela sozinha não lê UMA linha sequer: toda policy exige
-- `to authenticated` E `owner_id = auth.uid()`.
--
-- Não existe nenhuma policy pública, nem para select. Um visitante anônimo
-- que chame a API recebe uma lista vazia (leitura) ou erro (escrita).
-- ==========================================================================
do $$
declare
  t text;
begin
  foreach t in array array[
    'students', 'lesson_records', 'lesson_content', 'content_notes',
    'custom_content', 'practice_usage_days', 'practice_usage_legacy'
  ]
  loop
    execute format('alter table public.%I enable row level security', t);
    -- Blindagem extra: nem o dono da tabela escapa da RLS.
    execute format('alter table public.%I force row level security', t);

    execute format('drop policy if exists %I on public.%I', t || '_select', t);
    execute format('drop policy if exists %I on public.%I', t || '_insert', t);
    execute format('drop policy if exists %I on public.%I', t || '_update', t);
    execute format('drop policy if exists %I on public.%I', t || '_delete', t);

    -- (select auth.uid()) em vez de auth.uid() puro: o planejador trata a
    -- subquery como InitPlan e avalia UMA vez por consulta, não uma vez por
    -- linha. Mesma semântica, mesma autorização — só não recalcula a função
    -- milhares de vezes num Monthly Report.
    execute format(
      'create policy %I on public.%I for select to authenticated
         using (owner_id = (select auth.uid()))', t || '_select', t);

    execute format(
      'create policy %I on public.%I for insert to authenticated
         with check (owner_id = (select auth.uid()))', t || '_insert', t);

    execute format(
      'create policy %I on public.%I for update to authenticated
         using (owner_id = (select auth.uid()))
         with check (owner_id = (select auth.uid()))', t || '_update', t);

    execute format(
      'create policy %I on public.%I for delete to authenticated
         using (owner_id = (select auth.uid()))', t || '_delete', t);
  end loop;
end;
$$;


-- ==========================================================================
-- GRANTS — a camada que vem ANTES da RLS
-- --------------------------------------------------------------------------
-- RLS decide QUAIS LINHAS um papel enxerga. GRANT decide se o papel pode
-- tocar na tabela. São coisas diferentes, e o Supabase concede privilégio de
-- tabela a `anon` e `authenticated` por default nas tabelas novas do schema
-- public — ou seja, sem o bloco abaixo, `anon` teria permissão de tabela e
-- estaria sendo barrada só pela RLS.
--
-- Uma camada só é o suficiente até o dia em que não é: uma policy criada
-- errada no futuro, um `alter table ... disable row level security` por
-- engano, e a permissão de tabela vira a única coisa entre a Studio e o
-- mundo. Aqui `anon` simplesmente não tem privilégio nenhum: o erro passa a
-- ser "permission denied for table", antes de a RLS entrar na conversa.
--
-- Divisão final:
--   anon           nada. Nem select. (só precisa de auth para fazer login)
--   authenticated  SELECT, INSERT, UPDATE, DELETE — e a RLS diz quais linhas
--   service_role   tudo — é o papel administrativo do Supabase, usado por
--                  dashboard/Edge Functions e NUNCA pelo frontend
-- ==========================================================================
do $$
declare
  t text;
begin
  foreach t in array array[
    'students', 'lesson_records', 'lesson_content', 'content_notes',
    'custom_content', 'practice_usage_days', 'practice_usage_legacy'
  ]
  loop
    -- PUBLIC é o pseudo-papel que todo mundo herda; anon é o visitante
    -- sem login. Nenhum dos dois tem o que fazer nestas tabelas.
    execute format('revoke all on table public.%I from public', t);
    execute format('revoke all on table public.%I from anon', t);

    execute format(
      'grant select, insert, update, delete on table public.%I to authenticated', t);

    -- service_role é o papel administrativo padrão do Supabase.
    execute format('grant all on table public.%I to service_role', t);
  end loop;
end;
$$;

-- --------------------------------------------------------------------------
-- Funções
-- --------------------------------------------------------------------------
-- No PostgreSQL toda função nasce com EXECUTE para PUBLIC. Sem revogar,
-- `anon` poderia CHAMAR merge_practice_legacy(). Ela não conseguiria gravar
-- nada útil — é `security invoker`, então a RLS continuaria valendo e o
-- insert falharia por auth.uid() nulo — mas função administrativa exposta a
-- visitante anônimo é superfície que não precisa existir.
revoke all on function public.merge_practice_legacy(text, text, integer) from public;
revoke all on function public.merge_practice_legacy(text, text, integer) from anon;
grant execute on function public.merge_practice_legacy(text, text, integer)
  to authenticated, service_role;

-- touch_updated_at() só é chamada por trigger, nunca pela API. O PostgreSQL
-- não exige EXECUTE do usuário para disparar um trigger, então revogar de
-- PUBLIC não quebra nada — só tira a função da superfície pública.
revoke all on function public.touch_updated_at() from public;
revoke all on function public.touch_updated_at() from anon;
grant execute on function public.touch_updated_at() to authenticated, service_role;


-- ==========================================================================
-- VERIFICAÇÃO RÁPIDA
-- --------------------------------------------------------------------------
-- Rode depois do schema. Todas as 7 tabelas devem aparecer com rls = true
-- e policies = 4.
-- ==========================================================================
-- select c.relname as tabela,
--        c.relrowsecurity as rls,
--        (select count(*) from pg_policies p
--          where p.schemaname = 'public' and p.tablename = c.relname) as policies
--   from pg_class c
--   join pg_namespace n on n.oid = c.relnamespace
--  where n.nspname = 'public'
--    and c.relname in ('students','lesson_records','lesson_content',
--                      'content_notes','custom_content',
--                      'practice_usage_days','practice_usage_legacy')
--  order by 1;
