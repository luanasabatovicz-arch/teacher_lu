# Auditoria de consistência — Teacher Lu Studio × Teacher Lu Practice

**Data:** 29 jul 2026
**Solicitante:** Luana Sabatovicz
**Executor:** camada de auditoria arquitetural
**Modo:** somente leitura — nenhum arquivo do repositório foi modificado nesta rodada

---

## Constatação inicial — a Practice ainda não existe

Varredura completa do repositório confirma:

- **Nenhum arquivo** `practice*`, `Practice*` ou `teacher-lu-practice*`
- **Nenhum diretório** dedicado (`practice/`, `apps/practice/` etc.)
- **8 arquivos `.md`** mencionam "Practice" — todas referências futuras ("herdará", "reutilizará este pacote", "quando iniciarmos") em `AGENDA-AULAS-DUPLAS.md`, `REMOCAO-MODO-PROFESSOR.md`, `docs/CONSECUTIVE-LESSONS.md`, `design-system/README.md`, `design-system/DS-FINALIZADO.md`, `design-system/AUDITORIA-VISUAL.md`, `design-system/tokens.css`, `design-system.html`

**Consequência para esta auditoria:** não há "duas árvores para comparar". O relatório abaixo tem duas leituras válidas:

1. **Leitura literal** — Studio está 100% consolidada; Practice está 0% construída. Nada a sincronizar hoje. Alinhamento: N/A.
2. **Leitura útil (adotada aqui)** — este relatório é o **manifesto oficial de nascimento da Practice**: define exatamente o que ela herda no dia 1 para nascer 100% alinhada, e o que precisa ser evitado para não divergir com o tempo.

Se a segunda leitura for aceita, o valor de alinhamento faz sentido: **Practice pode nascer com 100% de alinhamento se seguir o roadmap abaixo — e apenas se seguir**.

---

## 1. Módulos compartilhados

Inventário completo da Studio (código executável). Para cada linha, decisão sobre reuso na Practice.

### 1.1 Camada Platform (7 arquivos, 2.382 linhas)

| Arquivo | Linhas | Papel | Decisão | Motivo |
|---------|--------|-------|---------|--------|
| `platform-students.js` | 315 | Store de alunos + schedule + helpers de sessão | **COMPARTILHAR** (mesmo arquivo, mesma chave localStorage) | Aluno é a mesma entidade nos dois produtos. Se Practice tiver seu próprio store, aluno cadastrado na Studio desaparece na Practice. |
| `platform-calendar.js` | 301 | Leitor read-only do calendário + `sessionsDoneOn` | **COMPARTILHAR** | Practice precisa saber quando aluno teve aula (para saber quando exigir prática). Duplicar quebra rollup e sessões. |
| `platform-progress.js` | 357 | Learning Progress por aluno | **COMPARTILHAR** | Progress é a memória pedagógica. Se Practice guardar em separado, aluno estuda Present Simple na Studio mas Practice não sabe. |
| `platform-content.js` | 286 | Content Registry pluggable | **COMPARTILHAR** | Registry aceita novos providers em runtime. Practice registra seus provedores sem conflito. |
| `platform-lesson-builder.js` | 555 | Orquestrador que assembla aula | **REUSAR OU EVOLUIR** | Practice pode ter seu próprio "session builder" para exercícios curtos. Mas deve ler a mesma Content + Progress + Calendar. |
| `platform-report-engine.js` | 533 | Motor de Monthly Learning Report | **COMPARTILHAR** | Se Practice gera relatório próprio, o teacher tem 2 versões conflitantes por mês. |
| `platform-print.js` | 35 | Wrapper de janela de impressão | **COMPARTILHAR** | Trivial. Nenhum motivo para duplicar. |
| **Total** | **2.382** | | | |

### 1.2 Camada Engine — conteúdo pedagógico (11 arquivos, 5.764 linhas)

| Arquivo | Linhas | Papel | Decisão | Motivo |
|---------|--------|-------|---------|--------|
| `engine/grammar-topics.js` | 1.692 | Tópicos gramaticais (Grammar Engine) | **COMPARTILHAR** | Currículo gramatical é o mesmo. |
| `engine/grammar-engine.js` | 693 | Renderer + lógica da tela Grammar | **STUDIO ONLY** | UI e template literals — Practice terá suas próprias telas. Mas o **conteúdo** (grammar-topics) é compartilhado. |
| `engine/structures-content.js` | 847 | Language Structures | **COMPARTILHAR** | Conteúdo. |
| `engine/conversation-lessons.js` | 539 | Conversation Lessons | **COMPARTILHAR** | Conteúdo. |
| `engine/speaking-activities.js` | 386 | Speaking Lab activities | **COMPARTILHAR** | Conteúdo. |
| `engine/speaking-games.js` | 314 | Speaking Games | **COMPARTILHAR** | Practice provavelmente terá versões "solo" desses jogos. |
| `engine/games-content.js` | 413 | Class Games | **COMPARTILHAR** | Idem. |
| `engine/listening-content.js` | 348 | Listening Lab content | **COMPARTILHAR** | Idem. |
| `engine/curriculum-map.js` | 74 | 52-week route | **COMPARTILHAR** | Rota anual é única. |
| `engine/competencies.js` | 450 | Mapa conteúdo→competências (usado no Report) | **COMPARTILHAR** | Tabela semântica única. |
| `engine/speaking-engine.js` | 8 | (arquivo quase vazio / legado) | **DESCARTAR** | Não vale copiar. |
| **Total** | **5.764** | | | |

### 1.3 Design System (7 arquivos + 1 showcase HTML, 3.842 linhas)

| Arquivo | Linhas | Decisão |
|---------|--------|---------|
| `design-system/tokens.css` | 147 | **COMPARTILHAR — literal** |
| `design-system/base.css` | 124 | **COMPARTILHAR — literal** |
| `design-system/layout.css` | 159 | **COMPARTILHAR — literal** |
| `design-system/components.css` | 986 | **COMPARTILHAR — literal** |
| `design-system/patterns.css` | 799 | **COMPARTILHAR — literal** |
| `design-system/theme.css` | 14 | **COMPARTILHAR — literal** |
| `design-system/icons.js` | 76 | **COMPARTILHAR — literal** |
| `design-system.html` (showcase) | 1.015 | **COMPARTILHAR — como referência viva única** |
| **Total DS** | **3.320** | |

O DS é a peça mais crítica desta auditoria. **Ele já foi projetado desde a v1 para ser único no ecossistema Teacher Lu**. Duplicar o DS = duplicar toda a identidade visual = próxima mudança de paleta vai divergir.

### 1.4 Documentação (docs/ + raiz, ~15 arquivos `.md`)

| Documento | Decisão |
|-----------|---------|
| `docs/CONSECUTIVE-LESSONS.md` | **CANÔNICO PARA AMBOS** — vale para Studio e Practice sem alteração |
| `docs/MONTHLY-REPORT.md` | **CANÔNICO PARA AMBOS** |
| `docs/README.md` | **AMPLIAR** para listar módulos Practice (quando existir) |
| `AGENDA-AULAS-DUPLAS.md`, `SIMULACAO-SEMANA.md`, `REMOCAO-MODO-PROFESSOR.md`, `AUDITORIA-*.md` | **HISTÓRICOS** — permanecem, mas Practice não os cita |
| `design-system/DS-FINALIZADO.md`, `AUDITORIA-VISUAL.md`, `README.md` | **CANÔNICOS PARA AMBOS** |
| `PRODUTO.md`, `FILOSOFIA.md`, `SLF.md`, `SPEAKING-LAB.md`, `GRAMMAR-ENGINE.md`, `VOCAB-ENGINE.md` | **CANÔNICOS PARA AMBOS** — descrevem metodologia pedagógica que vale para o produto todo |

### 1.5 Utilitários e convenções

| Item | Estado atual | Decisão |
|------|-------------|---------|
| **Convenção de chave localStorage** — prefixo `sabatovicz_*` e `sched|<id>|<date>` | Padronizada | **COMPARTILHAR** (senão backup do students.html não pega dados da Practice) |
| **Convenção de nomes** — `platform-*` para services, `engine/*` para content | Padronizada | **COMPARTILHAR** |
| **Convenção de ES5 IIFE** — todos os `platform-*.js` seguem `(function(global){...})(window)` | Padronizada | **COMPARTILHAR** |
| **Convenção "nunca lança"** — todos os services retornam fallback silencioso + `console.warn` | Padronizada | **COMPARTILHAR** |
| **Convenção "identity by id, name for display"** | Padronizada (§`platform-students.js`) | **COMPARTILHAR** |
| **Font stack** — Inter única | Padronizada | **COMPARTILHAR** |
| **Ícones** — Lucide via `data-lucide` | Padronizada | **COMPARTILHAR** |

### 1.6 Tabela consolidada

| Categoria | Studio (existe) | Practice (herda) | Modo recomendado |
|-----------|-----------------|-------------------|--------------------|
| Platform services (7) | 2.382 linhas | 100% herdadas | Mesmo arquivo servido pelos dois |
| Engine content (10) | 5.756 linhas | 100% herdadas | Mesmo arquivo servido pelos dois |
| Design System (7 + showcase) | 3.320 linhas | 100% herdado | Mesmo diretório |
| Documentação canônica | 3 docs `docs/*` + 3 DS | 100% referenciadas | Mesmo `docs/` |
| Convenções (7) | Consolidadas na Studio | 100% aplicadas | Documentadas neste arquivo |
| **Herança potencial total** | **~11.500 linhas** | **~11.500 linhas** | **Zero duplicação se Practice for irmã, não filha** |

---

## 2. Inconsistências detectadas

Como Practice não existe, **não há inconsistências reais**. As "inconsistências" abaixo são **riscos futuros** — problemas que aparecerão SE Practice for criada errado.

### 2.1 Riscos categorizados

| # | Risco | Arquivo(s) potencialmente afetado(s) | Impacto | Severidade |
|---|-------|--------------------------------------|---------|------------|
| **R1** | Practice cria **cópia local** do DS em vez de linkar o mesmo diretório | `design-system/*` | Próxima mudança de token diverge; visual perde consistência progressivamente | **Crítico** |
| **R2** | Practice cria **próprio store de alunos** com chave localStorage diferente | `platform-students.js` (duplicado) | Aluno cadastrado num produto some no outro; backup não integra | **Crítico** |
| **R3** | Practice **duplica Content Registry** | `platform-content.js` (duplicado) | Conteúdos publicados via `.register()` na Studio não visíveis na Practice | **Crítico** |
| **R4** | Practice cria **próprio Progress store** | `platform-progress.js` (duplicado) | Aluno estuda Present Simple na Studio, Practice desconhece → duplicação de esforço | **Crítico** |
| **R5** | Practice cria **próprio Calendar** ou lê `sched|*` de forma diferente | `platform-calendar.js` (duplicado) | Rollup de sessions[] desalinhado; Finance da Studio diverge | **Crítico** |
| **R6** | Practice implementa **seu próprio Report Engine** | `platform-report-engine.js` (duplicado) | Duas versões do relatório mensal por aluno; teacher precisa gerar 2 PDFs | **Importante** |
| **R7** | Practice cria **próprio mapa de competências** | `engine/competencies.js` (duplicado) | Divergência semântica: "Present Simple" gera competências diferentes nos dois produtos | **Importante** |
| **R8** | Practice usa **outra biblioteca de ícones** (Feather, Heroicons) em vez de Lucide | `design-system/icons.js` (ignorado) | Inconsistência visual óbvia; retreinar hábito do usuário | **Importante** |
| **R9** | Practice adota **framework diferente** (React, Vue) e reimplementa components CSS em JSX/SFC | `design-system/components.css` (adaptado) | Duas implementações divergem; alterações não sincronizam | **Importante** |
| **R10** | Practice usa **prefixo de storage diferente** (ex: `tlpractice_*`) | Convenção quebrada | Backup do students.html não captura dados da Practice → risco de perda | **Importante** |
| **R11** | Practice adota **fonte diferente** (ex: Poppins de volta) | `design-system/tokens.css` (parcialmente ignorado) | Regressão visual — problema resolvido no DS v2.0 | **Importante** |
| **R12** | Practice reinventa `sessions[]` para bloco duplo | `docs/CONSECUTIVE-LESSONS.md` (ignorado) | Contrato canônico violado; Finance quebra | **Crítico** |
| **R13** | Practice quebra convenção "identity by id, name for display" | `platform-students.js` (contrato ignorado) | Renomear aluno na Studio faz Practice perder histórico | **Crítico** |
| **R14** | Practice cria pasta `engine/` própria com competências divergentes | Divergência semântica | Relatórios inconsistentes; teacher confusa | **Importante** |
| **R15** | Practice não linka `design-system.html` como referência | Perda de disciplina | Novos componentes nascem sem serem catalogados | **Opcional** |
| **R16** | Practice não segue "nunca lança" em seus services | Padrão de erro divergente | Console.error na Practice, silêncio na Studio | **Opcional** |

**Distribuição por severidade:**
- **Crítico:** 6 riscos (R1, R2, R3, R4, R5, R12, R13)
- **Importante:** 7 riscos (R6, R7, R8, R9, R10, R11, R14)
- **Opcional:** 2 riscos (R15, R16)

---

## 3. Código potencialmente duplicado

Hoje: **zero duplicação** (Practice não existe). Mas se Practice nascer sem a arquitetura irmã abaixo, **~11.500 linhas** correm risco de ser duplicadas.

### 3.1 Camadas que NUNCA devem ser duplicadas

| Camada | Motivo |
|--------|--------|
| **Design System** (3.320 linhas) | Fonte única de verdade visual — decisão explícita da DS v2.0 |
| **Content Registry + engines de conteúdo** (5.756 linhas) | Conteúdo pedagógico é o produto; duplicar quebra Learning Progress |
| **Store de alunos** (`platform-students.js`) | Aluno é único no ecossistema |
| **Calendar service** (`platform-calendar.js`) | Uma agenda por aluno |
| **Progress store** (`platform-progress.js`) | Uma memória pedagógica por aluno |
| **Report Engine** (`platform-report-engine.js`) | Um relatório mensal por aluno |
| **Curriculum Map** (`engine/curriculum-map.js`) | Uma rota anual por aluno |
| **Competencies** (`engine/competencies.js`) | Uma semântica de "o que o aluno consegue fazer" |

### 3.2 Camadas onde faz sentido a Practice ter suas próprias implementações

| Camada | Motivo |
|--------|--------|
| **HTMLs de tela** | Cada produto tem sua UX diferente. Practice terá suas telas próprias — nunca uma cópia de `builder.html`. |
| **`platform-lesson-builder.js`** | Este é uma AULA. Practice provavelmente terá um "session builder" para sessões curtas de exercício. Pode ser um arquivo separado (`platform-practice-builder.js`) — mas ambos leem os MESMOS services. |
| **`engine/grammar-engine.js`** | Este é o renderer da tela Grammar da Studio. Practice não usa. |
| **Print CSS específico do módulo** | Cada tela tem seu print CSS. |

### 3.3 Padrão recomendado

```
Repositório único (monorepo funcional):

teacher_lu/
├── design-system/               ← compartilhado 100%
├── docs/                        ← canônico compartilhado
├── engine/                      ← conteúdo compartilhado 100%
├── platform-*.js                ← services compartilhados 100%
├── (arquivos HTML da Studio)    ← só Studio
└── practice/                    ← novo diretório
    ├── (arquivos HTML da Practice)
    ├── platform-practice-*.js   ← se Practice tiver services próprios,
    │                             ficam aqui com prefixo "practice-"
    └── engine/practice-*.js     ← se Practice tiver conteúdo próprio
```

**Regra de ouro:** qualquer arquivo dentro de `practice/` **importa** de `../design-system/` e `../platform-*.js` — nunca copia.

---

## 4. Design System — verificação

### 4.1 Estado atual (Studio)

Consolidado após a auditoria visual (§`design-system/AUDITORIA-VISUAL.md`) com **98,2/100 de consistência**. Fechado oficialmente (§`design-system/DS-FINALIZADO.md`).

### 4.2 Componentes catalogados na Component Library

25 categorias organizadas em 5 grupos (Fundação, Formulários, Conteúdo, Feedback, Overlays + Studio). Todos os componentes acessíveis via `design-system.html`.

### 4.3 Cores

Paleta oficial 103 tokens — **imutável**. Qualquer novo hex introduzido na Practice é violação do DS.

### 4.4 Tipografia

Uma família: **Inter**. Uma escala. Confirmado zero uso de Poppins/serif no repositório.

### 4.5 Spacing

Escala oficial 4/8/12/16/24/32/48/64/96 — `--tl-space-1` até `--tl-space-9`. Sem exceções.

### 4.6 Tokens

103 definidos, 92 em uso. Os 11 reservados (`--tl-border-1/2`, `--tl-dur-instant`, `--tl-ease-in-out`, `--tl-ease-out`, `--tl-fw-medium`, `--tl-secondary-tint`, `--tl-space-0/9`, `--tl-text-on-primary`, `--tl-tracking-normal`) já existem no arquivo — Practice pode usá-los sem novos aliases.

### 4.7 Utilitários

`.tl-icon-*`, `.tl-hide`, `.tl-eyebrow`, `.tl-display`, `.tl-caption`, `.tl-muted`, `.tl-subtle`, `.tl-kbd`, `.tl-divider-label`, `.tl-empty`, `.tl-sr-only` — todos disponíveis. Sem necessidade de novos utilitários hoje.

### 4.8 Padrões CSS

Padrões específicos catalogados em `patterns.css`:
- Home banner
- Lista de alunos (`stu-row`, `stu-emoji`)
- Calendário (day, day-x2, dual, notedot)
- KPI + stats grids
- Dual-lesson (time-range, day-block, session-tabs)
- Report (rp-cover, rp-sec, rp-can-list, rp-progress-list, rp-attendance, rp-editable)

Practice provavelmente adicionará seus próprios padrões (ex: `.exercise-card`, `.streak-badge`, `.session-timer`). Regra: **primeiro no showcase, depois na tela**.

### 4.9 Divergências detectáveis hoje

**Zero.** Practice não existe.

**Risco futuro:** se Practice reimplementar em React sem plugar o CSS do DS, todo o `components.css` (986 linhas) e `patterns.css` (799 linhas) viram legado silenciosamente.

---

## 5. Motores (Engines)

### 5.1 Progress Engine (`platform-progress.js`)

Estado: **canônico**. Contrato documentado em `docs/CONSECUTIVE-LESSONS.md §7.2` (data-level, não por sessão).

**Decisão:** reutilizar. Practice deve gravar no MESMO store. Motivo: se Practice tem exercício "past simple", isso vira uma sessão de Progress no mesmo aluno que estuda past simple na Studio. Duplicar = criar duas memórias que a professora tem que consolidar mentalmente.

### 5.2 Competencies (`engine/competencies.js`)

Estado: **canônico** — 30 tópicos mapeados + fallback por keyword + fallback por skill. Usado hoje pelo Report Engine.

**Decisão:** reutilizar. Practice pode adicionar entradas em `Competencies.BY_KEY['nova-key']` sem tocar no arquivo compartilhado. Se Practice quiser competências diferentes para o mesmo tópico, é sinal de que a definição no arquivo compartilhado está incompleta — a correção deve ser lá.

### 5.3 Content Registry (`platform-content.js`)

Estado: **canônico** — pluggable via `.register({id, skill, load, map})`.

**Decisão:** reutilizar. Módulos da Practice se registram no mesmo registry. Ex: Practice tem "reading passages" → registra em skill=reading. A Studio automaticamente enxerga esses conteúdos (na tela Annual Plan, no Report).

### 5.4 Report Engine (`platform-report-engine.js`)

Estado: **canônico** — pluggable via `.registerSection()` + generators substituíveis por IA. Documentado em `docs/MONTHLY-REPORT.md`.

**Decisão:** reutilizar. Practice **não gera relatório próprio**. Se Practice quer contribuir com dados, registra uma seção:

```js
TeacherLu.ReportEngine.registerSection({
  id: 'practice-stats',
  order: 12,
  collect: function(ctx) {
    var doneExercises = TeacherLu.Practice.doneInMonth(ctx.studentId, ctx.month);
    return { total: doneExercises.length, avgScore: ... };
  }
});
```

Essa seção aparece automaticamente no PDF do relatório.

### 5.5 Calendar (`platform-calendar.js`)

Estado: **canônico** — read-only sobre `sched|*`. Contrato em `docs/CONSECUTIVE-LESSONS.md`.

**Decisão:** reutilizar como leitor. Practice provavelmente não escreve no calendário (isso é da Studio via `schedule.html`) — apenas consulta "quando o aluno tem aula" para agendar sessões de prática.

### 5.6 Curriculum Map (`engine/curriculum-map.js`)

Estado: **canônico** — 52 semanas com temas.

**Decisão:** reutilizar. Practice mostra "esta semana o aluno vai estudar 'travel' — vamos praticar vocabulário de viagem" — lendo do mesmo currículo.

### 5.7 Grammar Engine (`engine/grammar-engine.js`)

Este é diferente dos outros — é o RENDERER da tela `grammar.html` da Studio. É código de UI, não engine puro.

**Decisão:** **NÃO** reutilizar como está. Practice tem sua própria tela de gramática (formato de exercício, não formato de aula). Mas o **conteúdo** vem do mesmo `engine/grammar-topics.js`. Se Practice quiser lógica de renderização compartilhada, extrair para `engine/grammar-view-helpers.js`.

---

## 6. Fluxo de dados

### 6.1 Fluxo atual da Studio (consolidado)

```
                    ┌─────────────────────────────────────┐
                    │        localStorage (browser)        │
                    │  sabatovicz_students · sched|*       │
                    │  sabatovicz_progress_<id> · finance  │
                    │  report_edit|<id>|<month>            │
                    └─────────────────┬───────────────────┘
                                      │
              ┌───────────────────────┼───────────────────────┐
              │                       │                       │
              ▼                       ▼                       ▼
       ┌──────────────┐        ┌──────────────┐        ┌──────────────┐
       │  Students    │        │  Calendar    │        │  Progress    │
       │ .load/save   │        │ .lessons     │        │ .record      │
       │ .scheduleOf  │        │ .sessionsDone│        │ .toggle      │
       │ .sessionsOf  │        │  On          │        │ .stats       │
       └──────┬───────┘        └──────┬───────┘        └──────┬───────┘
              │                       │                        │
              │  ┌────────────────────┼────────────────────────┤
              │  │                    │                        │
              ▼  ▼                    ▼                        ▼
       ┌──────────────┐        ┌──────────────┐        ┌──────────────┐
       │   Content    │◄──────►│LessonBuilder │        │ReportEngine  │
       │ .items       │        │ .build       │        │ .buildModel  │
       │ .byId        │        │ .recordLesson│        │ .generators  │
       └──────┬───────┘        └──────────────┘        └──────┬───────┘
              │                                                │
              ▼                                                ▼
       ┌──────────────┐                                ┌──────────────┐
       │ Engines      │                                │ Competencies │
       │ (content)    │                                └──────────────┘
       └──────────────┘

    Camada UI: students.html, schedule.html, builder.html, report.html,
               grammar.html, lessons.html, ..., finance.html

    Design System: theme.css (todos os HTMLs) + icons.js
```

**Características-chave:**
- **1 fonte por conceito** (1 store de alunos, 1 store de progress, 1 registry de conteúdo)
- **Serviços read-only** derivam de writeables (Calendar read-only sobre `sched|*` que só o schedule.html escreve)
- **Pluggable** onde faz sentido (Content, ReportEngine sections)
- **Nunca lança** — degradação silenciosa em toda camada de service

### 6.2 Fluxo esperado da Practice (nasce alinhado)

```
                    ┌─────────────────────────────────────┐
                    │  MESMO localStorage — MESMO browser  │
                    │  ← ← ← ← mesmas chaves ← ← ← ← ← ←  │
                    └─────────────────┬───────────────────┘
                                      │
              ┌───────────────────────┴───────────────────────┐
              │                                               │
              ▼                                               ▼
    ┌─────────────────────┐                       ┌────────────────────┐
    │  Studio (todas as   │                       │  Practice (novas   │
    │  telas de aula:     │                       │  telas de prática, │
    │  build, schedule,   │                       │  streaks, exerc.)  │
    │  finance, report,   │                       │                    │
    │  grammar,...)       │                       │                    │
    └──────────┬──────────┘                       └──────────┬─────────┘
               │                                             │
               └─────────────────┬───────────────────────────┘
                                 │
                                 ▼
                      Consomem os MESMOS services:
                      Students · Calendar · Progress · Content ·
                      ReportEngine · Competencies · LessonBuilder
                                 │
                                 ▼
                      Renderizam com o MESMO Design System
```

**Divergências esperadas do fluxo (aceitáveis):**
- Practice pode adicionar novo tipo de "prática registrada" — grava numa nova chave `sabatovicz_practice_<id>` (segue prefixo convencionado).
- Practice pode ter sua própria orquestração de sessão — arquivo `platform-practice-builder.js` **novo**, mas lê os mesmos services.

**Divergências inaceitáveis:**
- Practice criar `practice_students`, `practice_progress`, `practice_calendar`. Isso é o que este documento existe para prevenir.

---

## 7. Estrutura de pastas

### 7.1 Atual (Studio)

```
teacher_lu/
├── design-system/       (compartilhável integralmente)
├── docs/                (canônico compartilhável)
├── engine/              (conteúdo compartilhável)
├── assets/              (banners, ícones da Studio)
├── audio/               (áudios pedagógicos)
├── platform-*.js        (7 services, raiz)
├── *.html               (18 telas da Studio, raiz)
├── finance.css, finance.js
└── *.md                 (docs históricos)
```

### 7.2 Duas opções para acomodar Practice

**Opção A — mesma raiz (recomendada para dupla-tela)**

```
teacher_lu/
├── design-system/       ← compartilhado
├── docs/                ← compartilhado
├── engine/              ← compartilhado
├── platform-*.js        ← compartilhados
├── assets/, audio/      ← podem ficar comuns
│
├── (Studio HTMLs)       ← convivem na raiz
│   index.html, students.html, schedule.html,
│   grammar.html, builder.html, report.html, ...
│
└── practice/            ← Practice num subdir
    ├── index.html       ← home da Practice
    ├── practice-*.html  ← telas da Practice
    ├── platform-practice-builder.js
    ├── platform-practice-*.js   ← se necessários
    └── engine/practice-*.js     ← se necessários
```

**Prós:** Practice consome DS e platform-services sem `..` acrobacia. Um único deploy. Backup captura tudo. Convenção `sabatovicz_*` mantida.

**Contras:** ninho de HTMLs na raiz (só cosmético).

**Opção B — apps/ separados (padrão SaaS multi-produto)**

```
teacher_lu/
├── design-system/       ← compartilhado (raiz)
├── docs/                ← compartilhado
├── engine/              ← compartilhado
├── platform-*.js        ← compartilhados
└── apps/
    ├── studio/
    │   ├── index.html, students.html, ...
    │   └── finance.css, finance.js
    └── practice/
        ├── index.html
        └── practice-*.html
```

**Prós:** Separação limpa. Bom se um dia houver `apps/parents/` ou `apps/manager/`.

**Contras:** Todas as URLs mudam (`/students.html` → `/apps/studio/students.html`). Requer atualização de todos os `<link>`, `<a href>` e `<script src>` para usar `../` corretamente. **Grande refactor** só cosmético.

**Recomendação:** Opção A. A separação por prefixo de arquivo (`platform-practice-*`, `practice-*.html`) já é suficiente. Guarda a migração para `apps/` se um terceiro produto aparecer.

### 7.3 Reorganizações recomendadas SÓ com ganho real

Nenhuma. A estrutura atual é adequada. Não sugiro reorganização sem drive.

---

## 8. Roadmap de sincronização — 3 fases

Cada item marca a criação da Practice de forma consistente. Nada é retroativo à Studio (que já está alinhada consigo mesma).

### Fase 1 — Correções obrigatórias (dia 1 da Practice)

| # | Item | Motivo | Arquivos envolvidos | Impacto | Dificuldade | Prioridade |
|---|------|--------|---------------------|---------|-------------|------------|
| F1.1 | Practice **linka** `design-system/theme.css` — nunca copia | R1 · consistência visual | `practice/*.html` | **Alto** | **Baixa** | **P0** |
| F1.2 | Practice **linka** `design-system/icons.js` — Lucide único | R8 | `practice/*.html` | Alto | Baixa | **P0** |
| F1.3 | Practice usa Inter única — sem Poppins | R11 | `practice/*.html` | Médio | Trivial | **P0** |
| F1.4 | Practice **importa** `platform-students.js` da raiz — mesma chave `sabatovicz_students` | R2, R13 | `practice/*.html` | **Crítico** | **Baixa** | **P0** |
| F1.5 | Practice **importa** `platform-progress.js` — mesmo store por aluno | R4 | `practice/*.html` | **Crítico** | Baixa | **P0** |
| F1.6 | Practice **importa** `platform-content.js` + engines de conteúdo | R3 | `practice/*.html` | **Crítico** | Baixa | **P0** |
| F1.7 | Practice **importa** `platform-calendar.js` como leitura | R5 | `practice/*.html` | Crítico | Baixa | **P0** |
| F1.8 | Practice **respeita `sessions[]`** conforme `docs/CONSECUTIVE-LESSONS.md` | R12 | Toda camada da Practice | **Crítico** | Média | **P0** |
| F1.9 | Practice **importa** `platform-report-engine.js` e registra suas seções via `.registerSection()` | R6 | `practice/*.js` | Alto | Média | **P0** |
| F1.10 | Practice **importa** `engine/competencies.js` — se precisar de novas entradas, adiciona ao arquivo compartilhado, não a um paralelo | R7, R14 | `engine/competencies.js` (edit compartilhado) | Alto | Baixa | **P0** |
| F1.11 | Practice usa prefixo `sabatovicz_practice_*` para chaves próprias | R10 | Convenção | Alto | Trivial | **P0** |
| F1.12 | Practice segue "nunca lança" nos seus services | R16 | Todo `practice/platform-*.js` | Médio | Baixa | **P1** |

**Ao final da Fase 1:** Practice nasce 100% alinhada.

### Fase 2 — Melhorias recomendadas (semanas 1–4 da Practice)

| # | Item | Motivo | Arquivos envolvidos | Impacto | Dificuldade | Prioridade |
|---|------|--------|---------------------|---------|-------------|------------|
| F2.1 | Corrigir `finance.js` per_lesson × sessions[] (bug P0 identificado na `AUDITORIA-AULAS-DUPLAS.md`) | Sem isso, aluno double subfaturado — vale para Studio E Practice | `finance.js` | **Crítico financeiro** | Baixa | **P0** |
| F2.2 | Adicionar `ctx.sessionsDone` ao `LessonBuilder.context` | AUDITORIA §2.2 | `platform-lesson-builder.js` | Baixo | Baixa | **P1** |
| F2.3 | Practice contribui **seções ao Report Engine** — não cria PDF separado | Consolidação do relatório mensal | `platform/practice-report-sections.js` (novo) | Alto | Média | **P1** |
| F2.4 | Practice adiciona padrões novos à Component Library `design-system.html` — só depois usa nas telas | Disciplina do DS | `design-system.html` (edit compartilhado) | Médio | Baixa | **P1** |
| F2.5 | Ampliar `docs/README.md` com mapa Studio × Practice | Documentação canônica | `docs/README.md` | Baixo | Trivial | **P2** |
| F2.6 | Criar `docs/PRACTICE.md` documentando os módulos exclusivos da Practice | Rastreabilidade | `docs/PRACTICE.md` (novo) | Médio | Média | **P2** |
| F2.7 | Practice registra provedores no Content Registry (`.register()`) — não cria registry paralelo | R3 | `practice/engine/*.js` | Médio | Média | **P1** |

### Fase 3 — Melhorias futuras (mês 2+ da Practice)

| # | Item | Motivo | Arquivos envolvidos | Impacto | Dificuldade | Prioridade |
|---|------|--------|---------------------|---------|-------------|------------|
| F3.1 | Extrair helpers comuns de renderização (usados hoje só em `grammar.html`/`lessons.html`) para `engine/render-helpers.js` — reutilizáveis pela Practice | Menos duplicação | Engine novo | Médio | Alta | P2 |
| F3.2 | Substituir `Poppins`/legado remanescente em `hendrik.html` — hoje mantido intencionalmente para tom infantil. Rever se Practice quer manter esse mesmo trato para crianças. | Consistência DS | `hendrik.html` | Baixo | Baixa | P3 |
| F3.3 | Ligar generators do Report Engine a IA — arquitetura já preparada | `platform-report-engine.js` `.generators.*` | Servidor externo | Alto | Alta | P2 |
| F3.4 | Vista semanal do Calendar (identificada como P2 futuro em AGENDA-AULAS-DUPLAS.md) | UX | `schedule.html` novo layout | Alto | Alta | P3 |
| F3.5 | Detecção de conflito de horário entre alunos (P2 futuro) | Requer `schedule.weekdays` | `platform-students.js` + `schedule.html` | Médio | Média | P3 |
| F3.6 | Practice contribui para o mesmo showcase `design-system.html` — nunca uma versão própria | Disciplina | `design-system.html` | Baixo | Trivial | P2 |
| F3.7 | Migração para `apps/studio/` + `apps/practice/` — só se um 3º produto aparecer | Organização | Toda a raiz | Baixo | Alta | P4 |
| F3.8 | Documentar convenções em `docs/CONVENTIONS.md` (nunca-lança, prefixo storage, id-por-nome, IIFE ES5, pluggable-not-hardcoded) | Onboarding futuro | `docs/CONVENTIONS.md` (novo) | Médio | Baixa | P2 |

---

## 9. Checklist final de sincronização

Marque cada item ANTES de dar merge na primeira PR de Practice.

### Design System

- [ ] `practice/*.html` importa `../design-system/theme.css` (nunca copia)
- [ ] `practice/*.html` importa `../design-system/icons.js` (Lucide via CDN)
- [ ] Nenhum hex hardcoded fora de tokens — sempre `var(--tl-*)`
- [ ] Nenhuma escala de espaçamento arbitrária — sempre `var(--tl-space-N)`
- [ ] Nenhuma tipografia além de Inter
- [ ] Todo componente novo primeiro entra em `design-system.html` (Component Library)

### Platform services

- [ ] `platform-students.js` importado — mesma chave `sabatovicz_students`
- [ ] `platform-calendar.js` importado — leitura-somente sobre `sched|*`
- [ ] `platform-progress.js` importado — mesma chave `sabatovicz_progress_<id>`
- [ ] `platform-content.js` importado — Practice registra seus provedores
- [ ] `platform-lesson-builder.js` importado quando aplicável
- [ ] `platform-report-engine.js` importado — Practice registra seções via `.registerSection()`
- [ ] `platform-print.js` importado quando gerar PDF

### Content

- [ ] `engine/grammar-topics.js`, `structures-content.js`, `conversation-lessons.js`, `speaking-activities.js`, `curriculum-map.js`, `listening-content.js`, `games-content.js`, `speaking-games.js`, `competencies.js` — importados
- [ ] Novo conteúdo pedagógico da Practice → registrado via `Content.register()`
- [ ] Nova competência → adicionada em `engine/competencies.js` (compartilhado), nunca em paralelo

### Convenções

- [ ] Chaves localStorage sempre com prefixo `sabatovicz_practice_*` (ou reutilizando chaves existentes)
- [ ] Identity by student.id — nome apenas para display
- [ ] Services em IIFE ES5 `(function(global){...})(window)`
- [ ] "Nunca lança" — todos os services degradam silenciosamente + `console.warn`
- [ ] Sessões `[]` respeitando `docs/CONSECUTIVE-LESSONS.md`

### Documentação

- [ ] Practice cita `docs/CONSECUTIVE-LESSONS.md` como contrato canônico
- [ ] Practice cita `docs/MONTHLY-REPORT.md` para integração de relatório
- [ ] `docs/README.md` atualizado com o novo produto

### Design System — Component Library

- [ ] Cada padrão específico da Practice (`.exercise-card`, `.streak-badge`, etc) primeiro entra em `design-system.html` na seção correspondente
- [ ] Nenhum `<style>` inline com CSS de componente — só variáveis token

---

## 10. Métrica de alinhamento

Dado que a Practice **não existe**, aplicar a métrica com honestidade requer duas leituras:

### Leitura A — o que está construído hoje

**Teacher Lu Practice está 0% construída** — nenhum arquivo, nenhuma linha, nenhuma tela.
Portanto, o denominador da consistência é indefinido.

### Leitura B — o que pode ser garantido pelo nascimento

Se a Fase 1 do roadmap acima for seguida integralmente:

> **Teacher Lu Practice pode nascer 100% alinhada com o Teacher Lu Studio.**

Se a Fase 1 for parcialmente aplicada, o alinhamento cai proporcionalmente aos itens ignorados:

| Cenário | Alinhamento estimado |
|---------|----------------------|
| Fase 1 completa | **100%** |
| Fase 1 sem F1.4/F1.5/F1.6 (Practice usa próprio store de alunos/progress/content) | 40% — a maior fonte de valor é a integração de dados; sem isso, são dois produtos que apenas parecem iguais |
| Fase 1 sem F1.1/F1.2 (Practice tem próprio DS) | 60% — dados integrados, mas visual diverge no primeiro mês |
| Fase 1 sem F1.8 (Practice ignora sessions[]) | 70% — Studio quebra silenciosamente em alunos double |
| Fase 1 completamente ignorada | 15% — apenas os `.md` de metodologia continuam válidos |

---

## Conclusão

A Teacher Lu Studio está **oficialmente consolidada**. O Design System foi finalizado, o modelo de sessões documentado, o relatório mensal implementado, o Modo Professor removido. O trabalho de arquitetura sobre a Studio está feito.

**O risco arquitetural agora é 100% futuro** — reside na decisão de como a Teacher Lu Practice vai nascer.

Este relatório existe para transformar essa decisão em disciplina executável. A checklist de §9 e o roadmap de §8 são o suficiente — se seguidos — para garantir que Practice nasça 100% alinhada e assim permaneça.

**Nenhum código foi alterado. Aguardando decisão sobre iniciar Fase 1.**
