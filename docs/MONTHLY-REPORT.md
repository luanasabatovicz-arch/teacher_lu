# Monthly Learning Report — arquitetura e reuso

**Data:** 29 jul 2026
**Módulo:** relatório pedagógico mensal por aluno, exportável em PDF
**Estado:** validado em 5 cenários, integrado à Home, pronto para uso

---

## 1. Arquitetura criada

```
┌──────────────────────────────────────────────────────────────────┐
│                        report.html (UI)                          │
│   Seletor aluno + mês · Preview em tempo real · Campos editáveis │
│   Botão "Gerar PDF"                                              │
└─────────────────┬────────────────────────────────────────────────┘
                  │  buildModel(studentId, month, overrides)
                  ▼
┌──────────────────────────────────────────────────────────────────┐
│              platform-report-engine.js (motor)                   │
│                                                                  │
│   ▸ SECTIONS registráveis (pluggable)                            │
│   ▸ COLLECTORS internos (attendance, lessons, contents, homework)│
│   ▸ GENERATORS de texto (substituíveis por IA)                   │
│                                                                  │
│   Produz o REPORT MODEL — objeto plano, serializável, sem DOM    │
└─────┬────────────────────────────────────────────────────────────┘
      │
      │ consome (via TeacherLu.*)
      ▼
┌──────────────┬──────────────┬──────────────┬──────────────────┐
│  Students    │   Calendar   │   Progress   │    Content       │
│  scheduleOf  │   lessons    │   ofLesson   │    byId, SKILLS  │
│  isDouble    │ sessionsDone │   stats      │    items         │
└──────────────┴──────────────┴──────────────┴──────────────────┘
      │
      ▼
┌──────────────────────────────────────────────────────────────────┐
│             engine/competencies.js (tradutor semântico)          │
│   Mapa itemId → array de competências comunicativas em português │
│   Fallback por keyword + fallback por skill                      │
└──────────────────────────────────────────────────────────────────┘
```

---

## 2. Arquivos novos

| Arquivo | Linhas | Papel |
|---------|--------|-------|
| `platform-report-engine.js` | 534 | Motor pluggable. `buildModel(studentId, month)` → Report Model. Suporta `registerSection()` e `generators.*` substituíveis. |
| `engine/competencies.js` | 451 | Base de competências: 30+ conteúdos mapeados para 4 competências comunicativas cada. Fallbacks por keyword + por skill. |
| `report.html` | 505 | Interface completa: seleção, preview idêntico ao PDF, edição de comments/recommendations/goals, exportação. |
| `docs/MONTHLY-REPORT.md` | este arquivo | Documentação técnica |

**Total: 4 arquivos, ~1.500 linhas.**

---

## 3. Arquivos modificados

| Arquivo | Mudança |
|---------|---------|
| `index.html` | Novo card "Monthly Learning Report" apontando para `report.html` |
| `design-system/patterns.css` | +200 linhas de padrões do relatório (`.rp-cover`, `.rp-sec`, `.rp-can-list`, `.rp-progress-list`, `.rp-attendance`, `.rp-editable`) + regras `@media print` |

---

## 4. Fluxo completo de geração

### Passo 1 — Usuário abre `report.html`

```
1. Carrega dependências (Students, Calendar, Progress, Content, Competencies,
   engines de conteúdo, ReportEngine, print)
2. Popula seletor de aluno
3. Define mês corrente por default
4. Dispara buildModel() automaticamente
```

### Passo 2 — Engine constrói o Model

`ReportEngine.buildModel('maria', '2026-07')` executa em rodadas:

```
Rodada 0 — Context
  ctx = { studentId, month, from, to, Students, Calendar, Progress, Content }
  ctx.lessonsInMonth = Calendar.lessons({student, month})

Rodada 1 — Collectors internos (ordem determinística)
  collectLessons(ctx)         → tabela com data/dia/status/homework/observações
  collectContents(ctx)        → agrupamento por skill (via Progress.ofLesson)
  collectCompetencies(ctx)    → itemId → phrases[] (via Competencies.of)
  collectVocabulary(ctx)      → agrupado por categoria
  collectStructures(ctx)      → linguagem amigável ("frases afirmativas", etc.)
  collectSpeaking(ctx)        → atividades + temas
  collectHomework(ctx)        → varrido de sessions[].homework
  collectAttendance(ctx)      → planned/done/cancelled/missed/pct
  collectProgressIndicators() → 7 skills × 0-100 (via Progress.stats)
  collectNextContents(ctx)    → 4 próximas semanas do Curriculum Map
  collectCover(ctx)           → totalLessons, totalSessions, totalHours

Rodada 2 — Generators de texto
  summary        = generators.summary(model)         → uma frase
  learnedThings  = generators.learnedThings(model)   → 12 competências dedupe
  recommendations = generators.recommendations(model) → 3 sugestões

Rodada 3 — Sections registradas via API pública (extension points)
  _extraSections = { <id>: { order, data } }

Rodada 4 — Overrides
  Aplica campos editáveis vindos da UI
```

### Passo 3 — UI renderiza o preview

- 16 seções renderizadas usando padrões DS (`.rp-*`)
- Campos editáveis (`teacherComments`, `recommendations`, `nextGoals`) salvos automaticamente em `localStorage` sob chave `report_edit|<studentId>|<month>` a cada tecla → persistem entre visitas

### Passo 4 — Botão "Gerar PDF"

```
1. Sincroniza últimos valores dos campos editáveis
2. Rebuild model com overrides atualizados
3. Re-render preview
4. Extrai HTML do preview
5. TeacherLu.printDoc(html, title, printCSS)
   → abre janela de impressão do navegador com CSS otimizado A4
6. Usuário salva como PDF
```

O CSS de impressão (`buildPrintCSS()` em `report.html`) é standalone — o PDF sai bonito mesmo sem o Design System carregado, com margens A4, page-break-avoid nas seções, cover com page-break-after, editáveis sem borda de textarea.

---

## 5. Como novos módulos fornecem dados ao Report Engine

### 5.1 Registrando uma seção nova

Basta o módulo chamar `ReportEngine.registerSection()` — nenhum outro arquivo muda.

**Exemplo — módulo de Reading futuro:**

```js
// engine/reading-content.js (arquivo novo, hipotético)
TeacherLu.ReportEngine.registerSection({
  id: 'reading',
  order: 15,   // posição entre as seções
  collect: function (ctx, model) {
    // ctx contém: studentId, month, from, to, lessonsInMonth,
    // contentsBySkill, Students, Calendar, Progress, Content
    var readingItems = ctx.contentsBySkill.reading || [];
    if (!readingItems.length) return null;   // omite a seção

    return {
      titles: readingItems.map(function (i) { return i.title; }),
      totalMinutes: readingItems.length * 15,   // estimativa
      wpm: 120                                  // meta pedagógica
    };
  }
});
```

A UI de `report.html` decide como mostrar cada seção extra — ou você acrescenta uma função de render também na section (`render(data, model)`) e o report.html chama automaticamente.

### 5.2 Fornecendo dados via canais já existentes

Módulos que já publicam no **Content Registry** ganham suporte de graça:

```js
// Se um Reading module chama Content.register(...), suas items já aparecem:
//   - No collectContents() → seção "Conteúdos estudados", skill=reading
//   - No collectCompetencies() → seção "O que você aprendeu"
//   - No collectProgressIndicators() → barra "Reading" na Evolução
```

Nada precisa ser tocado no report engine se você seguir o Content Registry.

### 5.3 Extensão da tabela de competências

Novos conteúdos que não estão no mapa `engine/competencies.js` recebem fallback genérico. Para conteúdo específico:

```js
// Só adicione a entrada:
TeacherLu.Competencies.BY_KEY['third-conditional'] = {
  theme: 'condicionais',
  do: [
    'falar sobre situações hipotéticas do passado',
    'expressar arrependimentos e "e se..."',
    'combinar had + past participle com would have + past participle'
  ]
};
```

Effeito: qualquer aluno que estudar `grammar:third-conditional` em qualquer mês passa a ver essas competências no relatório.

---

## 6. Como a IA plugará no futuro sem mudar arquitetura

O motor separa **coleta de dados** (determinística) de **geração de texto** (substituível). Toda narrativa que aparece no relatório sai de `ReportEngine.generators.*`:

```js
// ESTADO ATUAL (rule-based, síncrono):
ReportEngine.generators.summary = function (model) {
  return 'Este mês você participou de ' + model.cover.totalSessions + ' aulas...';
};

// FUTURO (IA, async):
ReportEngine.generators.summary = async function (model) {
  const response = await fetch('/api/llm/summarize', {
    method: 'POST',
    body: JSON.stringify({
      lessons: model.lessons,
      contents: model.contentsBySkill,
      attendance: model.attendance,
      studentLevel: model.student.level
    })
  });
  return (await response.json()).text;
};
```

**Pontos de extensão prontos para IA:**

| Generator | Uso | Prompt esperado (futuro) |
|-----------|-----|--------------------------|
| `summary` | Resumo do mês (§2) | "Escreva 1 parágrafo caloroso resumindo o mês do aluno X" |
| `learnedThings` | Lista "Agora você consegue" (§6) | "Dado esses conteúdos, liste 8 competências práticas em PT" |
| `vocabularyCategory` | Categorização de palavras (§7) | "Para a palavra X, qual categoria semântica?" |
| `recommendations` | Recomendações padrão (§13) | "Dado o desempenho do aluno, sugira 3 práticas de casa" |

Para adicionar um novo generator, apenas atribuir uma função a `ReportEngine.generators.<novoNome>`. O engine não precisa saber que é IA.

**A `buildModel()` está preparada para ser async:** hoje é síncrona (rule-based), mas se qualquer generator virar async, basta trocar a assinatura interna para `await`. Nenhuma outra camada precisa mudar — o UI já espera pelo model antes de renderizar.

**Fluxo com IA:**

```
report.html
   │
   ├─ buildModel(sid, month)               [sync ou async — mesma API]
   │      │
   │      ├─ collectors (dados brutos)     [sempre síncrono]
   │      ├─ await generators.summary(m)   [pode ser IA]
   │      ├─ await generators.learnedThings(m)  [pode ser IA]
   │      └─ overrides
   │
   ├─ render(model)                        [mesmo código]
   └─ TeacherLu.printDoc(html)             [sem mudança]
```

Nenhum outro módulo da plataforma precisa saber que a IA existe.

---

## 7. Validação — 5 cenários testados

Simulação Node.js com fixture (Ana single/mensalista, Maria double/per_lesson, Novo Aluno sem schedule, Régis legado sem age, Ana em mês vazio):

| Cenário | Resultado |
|---------|-----------|
| Ana single 3 aulas mês julho | Cover 3/3/2.5h, 4 temas, 12 competências, presença 75%, contents by skill correto |
| Maria double sessões parciais | Cover 2/3/2.5h, homework por sessão preservado, rollup de status correto, sessionsDone=3 |
| Ana em agosto (mês vazio) | Cover zerado, summary "vamos retomar", learnedThings vazio, attendance planned=5 |
| Novo aluno sem schedule | Fallback schedule aplicado, cover zerado, summary de mês vazio |
| Régis legado sem age | Sem erros, cover normal, summary de mês vazio |
| Section custom registrada | Reading section apareceu em `_extraSections.reading` com dados coletados |

Zero regressões. Compatível com single/double, alunos legados e novos, meses vazios.

---

## 8. Compatibilidade validada

- ✅ **Sistema de aulas duplas** — collect Homework/Sessions/Attendance leem `sessions[]` quando presente; Cover mostra "3 sessões / 2 aulas" corretamente
- ✅ **Annual Plan** — próximos conteúdos usam `CURRICULUM_WEEKS` do curriculum-map.js
- ✅ **Lesson Builder** — Progress lê os mesmos itemIds gravados por `LB.recordLesson()`
- ✅ **Content Registry** — módulos que se registram aparecem no relatório automaticamente
- ✅ **Design System** — todo CSS via variáveis `--tl-*`; padrões catalogáveis no showcase
- ✅ **Aluno legado sem schedule** — retrocompatível via `Students.scheduleOf()` fallback

---

## 9. Estrutura do Report Model (referência)

```js
{
  _version: 1,
  student: {
    id, name, emoji, level, age,
    schedule: { mode, startTime, duration, breakMinutes }
  },
  period: { month, monthLabel, year, from, to },
  generatedAt: 'YYYY-MM-DD',

  cover: {
    studentName, monthLabel, brandName,
    totalLessons,     // dias com rollup 'done'
    totalSessions,    // sessões realmente feitas
    totalHours        // sessions × duration ÷ 60
  },

  themes: ['rotina', 'comparação', ...],     // extraídos de Competencies

  lessons: [
    { date, dayOfWeek, contents:[], status, homework, note, sessions? }
  ],

  contentsBySkill: {
    vocabulary: [items], grammar: [items], structures: [items],
    speaking: [items], reading: [items], writing: [items], listening: [items]
  },

  competencies: {                            // por itemId
    'grammar:present-simple': ['falar sobre rotina', ...]
  },

  vocabulary: { total, byCategory: { food:[], time:[], ... } },
  structures: { practiced: ['frases afirmativas', ...] },
  speaking:   { activities, count, themes },
  homework:   [{ date, description, source, status }],

  attendance: { planned, done, scheduled, cancelled, missed, sessionsDone, pct },
  progressIndicators: {
    speaking, listening, grammar, vocabulary, pronunciation, reading, writing
  },
  nextMonth: { hasPlan, items: [{ week, theme, stage }] },

  /* Textos gerados — trocáveis por IA */
  summary,
  learnedThings: [phrase, ...],
  recommendations: [phrase, ...],

  /* Editáveis pelo teacher, persistidos em localStorage */
  editable: {
    teacherComments,
    recommendations,
    nextGoals
  },

  /* Extensão pluggable */
  _extraSections: { <id>: { order, data } }
}
```

---

## 10. Boas práticas para quem estender

1. **Nunca modifique** `platform-report-engine.js` para adicionar seções — use `registerSection()`.
2. **Nunca modifique** `generators.summary` para mudar o tom — atribua uma nova função (facilita migrar para IA depois).
3. **Sempre passe pelo Content Registry** ao adicionar conteúdos — a seção "Conteúdos estudados" e a Evolução se atualizam sozinhas.
4. **Adicione competências** ao mapa em `engine/competencies.js` — não crie um mapa paralelo.
5. **Reutilize os padrões DS** (`.rp-sec`, `.rp-can-list`, `.rp-card`, `.rp-progress-list`) — o PDF sai consistente.

---

## Estado final

- **4 arquivos novos** (~1.500 linhas)
- **2 arquivos modificados** (index, patterns.css)
- **5 cenários validados** — zero regressão
- **Arquitetura pluggable + IA-ready** — pontos de extensão claros e documentados
- **Retrocompatibilidade** — alunos legados sem `schedule`, meses vazios, alunos novos: tudo funciona
- **Integração completa** — Home, Calendar, Progress, Content, Curriculum Map, Design System, Print engine

O módulo está pronto para uso. Aumentar a cobertura de competências (§competencies.js) e conectar IA aos generators são as próximas evoluções naturais — sem mudar arquitetura.
