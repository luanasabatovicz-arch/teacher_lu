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
--   2. NADA de blob gigante. Cada aluno, cada aula, cada ocorrência de
--      conteúdo e cada exercício é UMA LINHA. Dois computadores editando
--      coisas diferentes nunca se sobrescrevem.
--   3. IDs preservados. `students.id`, `custom_content.content_key`,
--      `practice_usage.exercise_id` e `lesson_content.content_id` guardam
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
-- practice_usage  —  qual exercício este aluno já gastou
-- --------------------------------------------------------------------------
-- Unique exigido pelo briefing: (owner_id, student_id, exercise_id).
-- Semântica preservada de platform-practice-log.js:
--   first_at    = data da PRIMEIRA conclusão, nunca muda
--   last_at     = data da última reutilização (só em repetições)
--   usage_count = em quantos DIAS DIFERENTES o exercício foi usado
-- ==========================================================================
create table if not exists public.practice_usage (
  owner_id    uuid        not null default auth.uid()
                          references auth.users (id) on delete cascade,
  student_id  text        not null,
  exercise_id text        not null,
  first_at    date        not null,
  last_at     date,
  usage_count integer     not null default 1 check (usage_count >= 1),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  primary key (owner_id, student_id, exercise_id)
);

create index if not exists practice_usage_by_student
  on public.practice_usage (owner_id, student_id);

drop trigger if exists practice_usage_touch on public.practice_usage;
create trigger practice_usage_touch before update on public.practice_usage
  for each row execute function public.touch_updated_at();


-- ==========================================================================
-- MERGE ADITIVO DO PRACTICE LOG
-- --------------------------------------------------------------------------
-- Notebook A e Notebook B podem marcar exercícios diferentes para a mesma
-- aluna offline. Um upsert comum faria o último a sincronizar sobrescrever
-- o first_at do outro. Esta função resolve no servidor, de forma atômica:
--   first_at    = a MENOR das duas datas   (a primeira vez é a primeira vez)
--   last_at     = a MAIOR das duas
--   usage_count = o MAIOR dos dois         (nunca regride)
-- Chamada pelo cliente via rpc('merge_practice_usage', ...).
-- ==========================================================================
create or replace function public.merge_practice_usage(
  p_student_id  text,
  p_exercise_id text,
  p_first_at    date,
  p_last_at     date default null,
  p_usage_count integer default 1
)
returns void
language plpgsql
security invoker            -- roda como o usuário: a RLS abaixo continua valendo
set search_path = public
as $$
begin
  insert into public.practice_usage
    (owner_id, student_id, exercise_id, first_at, last_at, usage_count)
  values
    (auth.uid(), p_student_id, p_exercise_id, p_first_at, p_last_at,
     greatest(coalesce(p_usage_count, 1), 1))
  on conflict (owner_id, student_id, exercise_id) do update set
    first_at    = least(public.practice_usage.first_at, excluded.first_at),
    last_at     = greatest(
                    coalesce(public.practice_usage.last_at, excluded.last_at),
                    coalesce(excluded.last_at, public.practice_usage.last_at)),
    usage_count = greatest(public.practice_usage.usage_count, excluded.usage_count),
    updated_at  = now();
end;
$$;


-- ==========================================================================
-- ROW LEVEL SECURITY
-- --------------------------------------------------------------------------
-- Sem isto, a anon key publicada no frontend daria leitura ao mundo inteiro.
-- Com isto, a anon key sozinha não lê UMA linha sequer: toda policy exige
-- `to authenticated` E `owner_id = auth.uid()`.
--
-- Não existe nenhuma policy pública, nem para select. Um visitante anônimo
-- que chame a API recebe uma lista vazia (leitura) ou erro (escrita).
-- ==========================================================================
alter table public.students       enable row level security;
alter table public.lesson_records enable row level security;
alter table public.lesson_content enable row level security;
alter table public.content_notes  enable row level security;
alter table public.custom_content enable row level security;
alter table public.practice_usage enable row level security;

-- Blindagem extra: nem o dono da tabela escapa da RLS.
alter table public.students       force row level security;
alter table public.lesson_records force row level security;
alter table public.lesson_content force row level security;
alter table public.content_notes  force row level security;
alter table public.custom_content force row level security;
alter table public.practice_usage force row level security;

do $$
declare
  t text;
begin
  foreach t in array array[
    'students', 'lesson_records', 'lesson_content',
    'content_notes', 'custom_content', 'practice_usage'
  ]
  loop
    execute format('drop policy if exists %I on public.%I', t || '_select', t);
    execute format('drop policy if exists %I on public.%I', t || '_insert', t);
    execute format('drop policy if exists %I on public.%I', t || '_update', t);
    execute format('drop policy if exists %I on public.%I', t || '_delete', t);

    execute format(
      'create policy %I on public.%I for select to authenticated
         using (owner_id = auth.uid())', t || '_select', t);

    execute format(
      'create policy %I on public.%I for insert to authenticated
         with check (owner_id = auth.uid())', t || '_insert', t);

    execute format(
      'create policy %I on public.%I for update to authenticated
         using (owner_id = auth.uid())
         with check (owner_id = auth.uid())', t || '_update', t);

    execute format(
      'create policy %I on public.%I for delete to authenticated
         using (owner_id = auth.uid())', t || '_delete', t);
  end loop;
end;
$$;


-- ==========================================================================
-- VERIFICAÇÃO RÁPIDA
-- --------------------------------------------------------------------------
-- Rode depois do schema. Todas as 6 tabelas devem aparecer com rls = true
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
--                      'content_notes','custom_content','practice_usage')
--  order by 1;
