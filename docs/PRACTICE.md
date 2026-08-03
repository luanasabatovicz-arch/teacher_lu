# Teacher Lu Practice — Fase 1 entregue

**Data:** 29 jul 2026
**Fase:** 1 · Bootstrap (infraestrutura pura, sem funcionalidades pedagógicas)
**Status:** ✅ Fase 1 concluída · 10/10 módulos compartilhados verificados · zero duplicação

---

## 1. Arquivos criados

3 arquivos novos, ~680 linhas:

| Arquivo | Linhas | Papel |
|---------|--------|-------|
| `practice/practice-bootstrap.js` | 272 | Publica `TeacherLu.Practice` · verifica 10 módulos compartilhados · registra chaves localStorage reservadas · abre pontos de extensão (`registerModule`) |
| `practice/practice-nav.js` | 69 | Registro pluggable de rotas · começa com 2 rotas (Home, Voltar ao Studio) · aceita novos módulos via `Practice.Nav.register()` |
| `practice/index.html` | 338 | Dashboard de saúde: hero, resumo geral, 10 cards de status, navegação, área reservada para módulos futuros |
| `docs/PRACTICE.md` | este arquivo | Registro oficial da Fase 1 |

**Total: 4 arquivos, ~750 linhas.**

## 2. Arquivos reutilizados (compartilhados com Studio · zero cópia)

**19 dependências** carregadas via `../` no `<head>` do dashboard — nenhuma linha duplicada.

| Categoria | Arquivos | Como usados |
|-----------|----------|-------------|
| **Design System** | `../design-system/theme.css` · `../design-system/icons.js` | `<link>` + `<script>` |
| **Fonte** | Inter via Google Fonts | única fonte oficial do ecossistema |
| **Content Engines** | `../engine/grammar-topics.js` · `speaking-activities.js` · `structures-content.js` · `conversation-lessons.js` · `listening-content.js` · `games-content.js` · `speaking-games.js` · `curriculum-map.js` · `competencies.js` | populam `TeacherLu.Content` + `Competencies` + `CURRICULUM_WEEKS` |
| **Platform Services** | `../platform-students.js` · `platform-content.js` · `platform-progress.js` · `platform-calendar.js` · `platform-lesson-builder.js` · `platform-report-engine.js` · `platform-print.js` | serviços canônicos, mesmas chaves localStorage |

**Confirmação:** varredura automática por assinaturas (`VERSION: '1.1.0'`, etc.) em `practice/*.js` retornou **zero ocorrências** — nenhum código dos módulos compartilhados foi replicado.

## 3. Arquivos modificados

| Arquivo | Mudança |
|---------|---------|
| `index.html` (Studio) | Novo card "Teacher Lu Practice" com barra secondary, apontando para `practice/index.html` — sinaliza que é o mesmo ecossistema |

## 4. Arquitetura final

### 4.1 Estrutura de pastas

```
teacher_lu/                     ← raiz do ecossistema
├── design-system/              ← DS compartilhado (2.320+ linhas)
│   ├── tokens.css   base.css   layout.css
│   ├── components.css  patterns.css  theme.css
│   ├── icons.js
│   └── (docs do DS)
├── docs/                       ← documentação canônica
│   ├── CONSECUTIVE-LESSONS.md
│   ├── MONTHLY-REPORT.md
│   ├── AUDITORIA-STUDIO-vs-PRACTICE.md
│   ├── PRACTICE.md             ← este arquivo
│   └── README.md
├── engine/                     ← conteúdo pedagógico compartilhado
│   ├── grammar-topics.js
│   ├── speaking-activities.js
│   ├── structures-content.js
│   ├── conversation-lessons.js
│   ├── listening-content.js
│   ├── games-content.js
│   ├── speaking-games.js
│   ├── curriculum-map.js
│   └── competencies.js
├── platform-*.js               ← services compartilhados (7 arquivos)
├── (18 HTMLs da Studio)        ← inalterados
│
└── practice/                   ← ***NOVO***
    ├── index.html              ← dashboard de saúde
    ├── practice-bootstrap.js   ← publica TeacherLu.Practice
    └── practice-nav.js         ← rotas pluggáveis
```

### 4.2 Camada compartilhada (Shared Layer)

Toda a Fase 1 respeitou o princípio: **Practice NUNCA copia código**.
Ela consome via `<script src="../platform-*.js">` os mesmos arquivos que a Studio.

| Namespace publicado | Publicador | Consumidor Practice |
|--------------------|------------|---------------------|
| `TeacherLu.Students` | `../platform-students.js` | health-check + módulos futuros |
| `TeacherLu.Calendar` | `../platform-calendar.js` | health-check + leitura |
| `TeacherLu.Progress` | `../platform-progress.js` | health-check + escrita/leitura |
| `TeacherLu.Content` | `../platform-content.js` | health-check + `.register()` |
| `TeacherLu.Competencies` | `../engine/competencies.js` | health-check |
| `TeacherLu.LessonBuilder` | `../platform-lesson-builder.js` | opcional para módulos futuros |
| `TeacherLu.ReportEngine` | `../platform-report-engine.js` | contribuir seções via `.registerSection()` |
| `TeacherLu.printDoc` | `../platform-print.js` | export PDF quando necessário |
| `window.CURRICULUM_WEEKS` | `../engine/curriculum-map.js` | rota anual |
| `window.ENGINE_TOPICS`, `SPEAKING_ACTIVITIES`, etc. | engines de conteúdo | ler catálogo |
| **`TeacherLu.Practice`** | **`practice-bootstrap.js`** (novo) | **ponto de extensão da Practice** |

### 4.3 Chaves localStorage reservadas para Practice

Todas com prefixo `sabatovicz_practice_*` — garantem que o botão "Backup" em `students.html` captura tudo automaticamente e não colidem com chaves da Studio:

```js
STORAGE_KEYS = {
  settings: 'sabatovicz_practice_settings',
  sessions: 'sabatovicz_practice_sessions',   // reservado para F3
  streaks:  'sabatovicz_practice_streaks',    // reservado para F3
  prefs:    'sabatovicz_practice_prefs'       // reservado para F3
}
```

### 4.4 Pontos de extensão prontos

Módulos futuros (Fase 3) usam esta API pública, **sem tocar em `practice-bootstrap.js`**:

```js
// Adicionar um módulo pedagógico
TeacherLu.Practice.registerModule({
  id: 'flashcards',
  label: 'Flashcards',
  icon: 'layers',
  route: 'flashcards.html',
  description: 'Revisão espaçada de vocabulário'
});

// Adicionar uma rota de navegação
TeacherLu.Practice.Nav.register({
  id: 'flashcards',
  label: 'Flashcards',
  icon: 'layers',
  href: 'flashcards.html',
  group: 'Prática'
});

// Contribuir com seção no Monthly Learning Report (mesmo relatório da Studio)
TeacherLu.ReportEngine.registerSection({
  id: 'practice-stats',
  order: 12,
  collect: function (ctx) {
    return { flashcardsReviewed: 45, streakDays: 7 };
  }
});

// Adicionar novo conteúdo ao Content Registry
TeacherLu.Content.register({
  id: 'flashcard-deck',
  skill: 'vocabulary',
  label: 'Flashcards',
  load: function () { return DECKS; },
  map: function (d, i) { return { key: d.id, title: d.name, order: i }; }
});
```

## 5. Diagrama do fluxo da aplicação

```
                    ┌─────────────────────────────────────────┐
                    │       localStorage (browser único)       │
                    │  sabatovicz_students · sched|*           │
                    │  sabatovicz_progress_<id>                │
                    │  sabatovicz_finance_billing              │
                    │  sabatovicz_practice_*  ← reservados F3  │
                    └────────────────────┬────────────────────┘
                                         │
              ┌──────────────────────────┼──────────────────────────┐
              │                          │                          │
              ▼                          ▼                          ▼
    ┌───────────────────┐   ┌────────────────────────┐   ┌─────────────────┐
    │ Studio HTMLs      │   │ Shared Platform+DS+Eng │   │ Practice HTMLs  │
    │ students.html     │   │                        │   │ index.html      │
    │ schedule.html     │   │  design-system/*       │   │ (F1: só o dash) │
    │ builder.html      │──►│  platform-*.js         │◄──│                 │
    │ finance.html      │   │  engine/*.js           │   │                 │
    │ report.html       │   │                        │   │                 │
    │ grammar.html      │   │  publica em            │   │                 │
    │ ... (18 telas)    │   │  window.TeacherLu.*    │   │                 │
    └───────────────────┘   └────────────┬───────────┘   └─────────────────┘
                                         │
                                         ▼
                             ┌───────────────────────┐
                             │ practice-bootstrap.js │
                             │ publica               │
                             │ TeacherLu.Practice    │
                             │  · healthCheck()      │
                             │  · isReady()          │
                             │  · registerModule()   │
                             │  · Nav.register()     │
                             └───────────────────────┘
```

**Características:**

- **Zero duplicação** — Practice não replica nada da Studio
- **Um localStorage** — dados unificados, backup captura tudo
- **Um Design System** — mudanças de token refletem em ambos os produtos
- **Sem dependências circulares** — bootstrap não importa `practice-nav.js`; nav usa apenas `NS.Practice`
- **Sem breaks na Studio** — 100% aditivo

## 6. Validação executada

| Verificação | Resultado |
|-------------|-----------|
| Sintaxe JS de `practice-bootstrap.js` | ✅ OK (node --check) |
| Sintaxe JS de `practice-nav.js` | ✅ OK |
| Sintaxe do inline script de `index.html` | ✅ OK |
| Imports quebrados | ✅ zero — 19 deps compartilhadas via `../`, 4 locais |
| Dependências circulares | ✅ nenhuma — bootstrap não importa nav; nav só lê `TeacherLu.Practice` |
| Código duplicado com Studio | ✅ zero — busca por assinaturas `VERSION:` não achou cópias |
| Convenção "nunca lança" | ✅ zero `throw` em `practice-bootstrap.js` |
| Prefixo `sabatovicz_practice_*` | ✅ 4 chaves reservadas, todas com prefixo |
| `TeacherLu.Practice` publicado | ✅ com VERSION, STAGE, STORAGE_KEYS, healthCheck, isReady, registerModule, Nav |
| Teste headless (Node) do bootstrap com todos os módulos carregados | ✅ **10/10 checks passing** — Design System, Icons, Students (7 alunos), Calendar v1.2.0, Progress v1.0.0, Content (63 itens · 7 skills · 11 providers), Competencies (31 mapeados), Curriculum (52 semanas), Report Engine v1.0.0, Lesson Builder v1.0.0 |

## 7. Próximos passos recomendados

**Fase 1 concluída — a Fase 2 NÃO deve ser iniciada automaticamente** (regra explícita do briefing).

Quando a Fase 2 for aprovada, os itens naturais são:

### Fase 2 — Melhorias arquiteturais recomendadas

Do roadmap em `docs/AUDITORIA-STUDIO-vs-PRACTICE.md §8`:

- **F2.1** Corrigir `finance.js` per_lesson × sessions[] — bug P0 identificado, vale para Studio E Practice, esperando ordem para executar
- **F2.2** Adicionar `ctx.sessionsDone` ao `LessonBuilder.context`
- **F2.3** Practice contribui **seções ao Report Engine** — não cria PDF separado
- **F2.4** Novos padrões visuais primeiro no `design-system.html` — só depois nas telas
- **F2.5** Ampliar `docs/README.md` com mapa Studio × Practice
- **F2.6** Prefixar convenções de código em `docs/CONVENTIONS.md`

### Fase 3 — Módulos pedagógicos (só após F2)

Nesta fase começam os módulos que a Luana precisa para o aluno praticar entre aulas — flashcards, ditados, mini-quizzes, streaks, etc. Cada um:

1. Nasce como registro em `TeacherLu.Practice.registerModule()`
2. Ganha rota via `TeacherLu.Practice.Nav.register()`
3. Consome os mesmos services (Students, Progress, Content, Competencies)
4. Persiste em chave `sabatovicz_practice_<nomedomodulo>`
5. Contribui com seção no Monthly Learning Report

## Resumo final

- ✅ 4 arquivos novos, ~750 linhas
- ✅ 19 dependências compartilhadas via `../`, zero cópia
- ✅ 1 arquivo modificado (Studio index.html ganha card da Practice)
- ✅ 10/10 checks passando no teste headless
- ✅ Zero funcionalidade pedagógica implementada — como especificado
- ✅ Aguardando aprovação para Fase 2

A Teacher Lu Practice nasceu 100% alinhada com o Teacher Lu Studio.
