# Auditoria — módulos que assumem 1 aula por dia

**Data:** 28 jul 2026
**Escopo:** varredura de todos os módulos da Teacher Lu Studio para identificar assumptions "1 lesson per day per student" e apontar o que precisa ser adaptado para o novo modelo `schedule.mode='double'` + `sessions[]`.
**Modo:** somente leitura — nenhum arquivo foi modificado nesta rodada.

---

## Resumo executivo

Módulos analisados: **20**. Estado:

| Status | Quantidade | Módulos |
|--------|-----------|---------|
| ✅ **Já adaptados** | 4 | `platform-students.js`, `platform-calendar.js`, `students.html`, `schedule.html` |
| ⚠ **Precisam adaptação** | 4 | `finance.js`, `platform-lesson-builder.js`, `builder.html`, `platform-progress.js` (decisão) |
| ✅ **Não afetados** | 12 | annual-plan, grammar, lessons, structures, speaking-games, games, listening, hendrik, exercise-generator, lesson-generator, placement-test, verificacao, index, e todo o conteúdo em `engine/` |

**Bug funcional real (P0):** só um — Finance no plano `per_lesson` para alunos duplos.
**Melhorias de UX (P1):** Lesson Builder + builder.html não sabem que o aluno é duplo.
**Decisão arquitetural pendente (P2):** Progress por sessão × Progress por dia.

Nenhum arquivo de conteúdo (`engine/*.js`) foi afetado — o modelo de sessões não vaza para o domínio pedagógico.

---

## 1. Módulos já adaptados (não requerem trabalho)

### 1.1 `platform-students.js` v1.1.0 ✅

Ganhou `scheduleOf()`, `isDouble()`, `sessionsOf()`, `blockRange()`, `blockMinutes()`. Compatível com aluno legado sem campo `schedule`.

### 1.2 `platform-calendar.js` v1.2.0 ✅

`toLesson()` agora normaliza `sessions[]` quando presente e computa rollup automático. Novo método `sessionsDoneOn(student, date)` retorna 0/1/2 para módulos que precisam contar por sessão.

### 1.3 `students.html` ✅

Modal com abas single/double, campos horário/duração/intervalo, preview do horário final calculado. Lista renderiza time-range badge.

### 1.4 `schedule.html` ✅

Dashboard do dia com bloco duplo colapsável, célula com indicador `.dual` + pill `×2`, modal com abas de sessão (Aula 1 · Aula 2 · Bloco geral), campo homework por sessão. Exports (`exportMonth`, `exportAll`) já concatenam notas das duas sessões na coluna Note.

---

## 2. Módulos que precisam adaptação

### 2.1 ⚠ **`finance.js`** — bug funcional P0

**Localização:** linhas 468–493 (`BillingEngine.scheduleForMonth`, case `per_lesson`), linha 1820–1829 (`connectCalendar`).

**Assumption quebrada:**
```js
// linha 1827
dates: cal.lessonsDone(student, month).map(function (l) { return l.date; })
```

`Calendar.lessonsDone()` retorna **um registro por dia** com rollup `status === 'done'`. Para aluno duplo com as duas sessões `done` no mesmo dia, retorna **1** — não 2.

Depois, no schedule generator, cada `date` vira uma cobrança `net`:
```js
real.dates.forEach(function (date) {
  out.push({ date: date, amount: net, perLesson: true, fromCalendar: true });
});
```

**Impacto:** aluno com plano "por aula" e schedule dupla é **subcobrado** — recebe metade do valor devido. Se a professora dá 2 aulas por dia e cobra R$ 50 cada, deveria faturar R$ 100/dia; hoje fatura R$ 50/dia.

**Correção sugerida:**
- Substituir `dates` por uma lista que respeite quantas sessões foram feitas em cada data:
  ```js
  // Pseudo:
  var lessons = cal.lessonsDone(student, month);
  var charges = [];
  lessons.forEach(function (l) {
    var n = cal.sessionsDoneOn(student, l.date);  // 1 ou 2
    for (var i = 0; i < Math.max(1, n); i++) {
      charges.push({ date: l.date, sessionIndex: i });
    }
  });
  ```
- Ajustar o contrato do `lessonProvider` para retornar `charges` (com sessionIndex) em vez de só `dates`, OU acrescentar um campo `dateCharges: { '2026-07-20': 2, '2026-07-15': 1 }` que o `scheduleForMonth` interpreta.

**Efeitos colaterais a testar:**
- Dashboard financeiro (KPIs): "Received", "Expected", "Pending" precisam refletir a nova conta.
- Reports mensais: linha por aluno mostra "N aulas × R$ x" — precisa mostrar N correto.
- Exports CSV/PDF: mesma coisa.
- Tooltip "Calendar connected" na dashboard — atualizar para deixar claro que aluno double gera 2 cobranças/dia.

### 2.2 ⚠ **`platform-lesson-builder.js`** — UX/completude P1

**Localização:** linhas 143, 173–231, 245–268, 538–542.

**Assumptions quebradas ou lacunas:**

1. **`LB.DURATIONS = [15, 30, 45, 60]`** — não contempla blocos de 90–110 min típicos de aluno duplo (2×50 + 10). Se o teacher tem aluno com bloco de 110 min e quer plano único para ambas sessões, os presets não atendem.

2. **`context.lessonsDone`** (linha 194):
   ```js
   var done = Calendar.lessons({ student: stu, status: 'done' });
   ctx.lessonsDone = done.length;
   ```
   Conta **1 por dia** (não por sessão). Para aluno duplo com muitos dias com 2 sessões feitas, subestima a experiência real do aluno.

3. **`resolveLessonDate()`** (linhas 248–268) — retorna 1 data única. Sem noção de sessão. Se o teacher quiser gerar planos **diferentes** para sessão 1 e sessão 2 no mesmo dia, não há como.

4. **`recordLesson(plan, lessonDate)`** (linha 538) — grava conteúdos em Progress sob 1 data. Se o teacher gerar 2 planos diferentes no mesmo dia (sessão 1 = grammar, sessão 2 = speaking), o segundo `recordLesson` mistura tudo sob a mesma data.

**Correção sugerida (por prioridade):**

- **Baixo esforço (P1a):** Adicionar `LB.DURATIONS` sensíveis ao aluno — se `Students.isDouble(id)`, expor também `[45, 60, 90, 100, 110]` no seletor.
- **Médio esforço (P1b):** Aceitar parâmetro opcional `sessionIndex` em `build(studentId, duration, sessionIndex)`. Quando fornecido, o plano é rotulado como "Sessão 1 de 2 · Maria Silva". Não muda o Progress; apenas o front-end mostra qual sessão está planejando.
- **Correção da métrica (P1c):** Trocar `ctx.lessonsDone` por `ctx.sessionsDone`:
   ```js
   var totalSessions = 0;
   done.forEach(function (l) {
     totalSessions += l.sessions ? l.sessions.filter(s => s.status==='done').length : 1;
   });
   ctx.sessionsDone = totalSessions;
   ```
   Ou expor os dois campos: `lessonsDone` (dias com aula) e `sessionsDone` (contagem real).

### 2.3 ⚠ **`builder.html`** — depende do LessonBuilder, P1

**Localização:** linhas 406–412 (`renderDurations`), 439 (`LB.build`), 550 (`LB.recordLesson`).

**Assumptions/lacunas:**

1. O seletor de duração mostra 15/30/45/60 do `LB.DURATIONS`. Se for adicionar 90/110 no LB, esta tela reflete automaticamente. Nenhuma mudança específica na tela.

2. Não mostra ao teacher que o aluno é duplo. Não informa "este aluno tem 2 aulas hoje — quer planejar sessão 1 ou 2?".

3. Ao clicar "Finish & record" para aluno duplo, grava tudo sob a data única. Sem opção de dizer "gravei conteúdos da sessão 1 apenas".

**Correção sugerida:**

- Se `TeacherLu.Students.isDouble(student)`:
  - Mostrar banner no topo: "**Maria Silva** — 19:00–20:50 (2 aulas consecutivas). Você está planejando: [ Sessão 1 · Sessão 2 · Ambas em conjunto ]" (tabs).
  - Passar `sessionIndex` para `LB.build()`.
  - Ao registrar, mostrar aviso "conteúdos gravados na sessão 1 do dia YYYY-MM-DD" se o LessonBuilder passar a suportar sessões.
- Alternativamente (esforço menor): manter tudo como está e apenas informar "este aluno tem 2 aulas hoje; use o plano como referência para o bloco completo".

### 2.4 ⚠ **`platform-progress.js`** — decisão arquitetural P2

**Estado atual:** grava tudo sob `lessonDate` (YYYY-MM-DD). Não distingue sessão 1 de sessão 2.

**Duas opções:**

- **A) Manter granularidade por dia (recomendado)**
  - Prós: modelo simples, mantém retrocompatibilidade absoluta, "quando ele estudou este conteúdo?" continua respondendo com data.
  - Contras: se o teacher usa sessão 1 para grammar e sessão 2 para speaking no mesmo dia, ambos aparecem "estudados em 20/jul" sem distinguir.
  - **Ação:** documentar isso como comportamento intencional. Nenhuma mudança de código.

- **B) Estender para granularidade por sessão**
  - Novo shape: `lessons: [{date:'2026-07-20', session:0}, {date:'2026-07-20', session:1}]` em vez de `lessons: ['2026-07-20']`.
  - Requer migração de dados (todos os records antigos ganham `session: null` → tratados como "sessão única").
  - Muda API pública (`ofLesson`, `record`, `unrecord`, `toggle` ganham parâmetro opcional).
  - **Ação:** implementar apenas se surgir um caso de uso real que justifique — hoje não há.

**Decisão sugerida:** **A**. Manter como está. Adicionar 1 parágrafo no header do arquivo documentando: *"Progress é indexado por data de aula, não por sessão. Para alunos com aulas consecutivas, os conteúdos das duas sessões ficam consolidados sob a mesma data — deliberadamente, para simplicidade."*

---

## 3. Módulos não afetados (12)

Todos foram verificados por grep de `Calendar.`, `sched|`, `schedule.`, `sessions`, `sessionIndex` e leitura pontual de fluxo.

| Módulo | Razão |
|--------|-------|
| **`annual-plan.html`** | Só usa `Progress` (data-level), não Calendar. `Progress.stats/overall/suggestions/isCovered` são agnósticos a sessões. |
| **`grammar.html`** | Só usa `Progress.toggle` para marcar conteúdo. Data-level. |
| **`lessons.html`** | Idem grammar. |
| **`structures.html`** | Idem — usa `TeacherLu.Progress.toggle`. |
| **`speaking-games.html`** | Conteúdo puro. Não toca Calendar/Progress. |
| **`games.html`** | Conteúdo puro. |
| **`listening.html`** | Conteúdo puro. |
| **`hendrik.html`** | Módulo Dutch/kids, storage próprio. Não usa Calendar/Progress. |
| **`exercise-generator.html`** | Gerador de exercícios standalone. |
| **`lesson-generator.html`** | Idem. |
| **`placement-test.html`** | Teste standalone, storage próprio. |
| **`verificacao.html`** | Só verifica presença de engines. Não toca schedule. |
| **`index.html`** | Só links. |
| **`engine/*.js`** (grammar-engine, grammar-topics, structures-content, speaking-activities, speaking-games, conversation-lessons, listening-content, games-content, curriculum-map, teacher-mode já removido) | Conteúdo pedagógico. Zero acoplamento com schedule/sessions. |
| **`platform-content.js`** | Registry de conteúdo. Não toca calendar. |

---

## 4. Prioridade recomendada de execução

| Ordem | Alvo | Esforço | Impacto |
|-------|------|---------|---------|
| **1** | `finance.js` — corrigir cobrança per_lesson para aluno duplo | Médio (2–3h) | **Alto** — bug financeiro real; hoje aluno com 2 aulas paga por 1 |
| **2** | `platform-progress.js` — documentar decisão A (nada muda no código) | Trivial (15 min) | Zero código, mas fecha uma pergunta aberta |
| **3** | `platform-lesson-builder.js` — trocar `ctx.lessonsDone` por método que respeite sessões OU adicionar `ctx.sessionsDone` | Baixo (30 min) | Baixo — o número no contexto do Builder fica correto |
| **4** | `platform-lesson-builder.js` + `builder.html` — banner "este aluno tem 2 aulas hoje" e opcional escolha de sessão | Médio (2h) | Médio — UX melhora, não é bug |
| **5** | `LB.DURATIONS` adaptável ao aluno duplo (offer 90/110) | Baixo (30 min) | Baixo — comodidade |

---

## 5. Sanity checks executados nesta auditoria

- `grep` global por `Calendar.`, `sched|`, `sessionsDoneOn`, `schedule.`, `Progress.record`, `Progress.toggle`, `LB.recordLesson` em `*.html`, `*.js`, `engine/*.js`, `platform-*.js`.
- Leitura pontual de `platform-progress.js`, `platform-lesson-builder.js`, `finance.js`, `annual-plan.html`, `builder.html`.
- Confirmação de que módulos de conteúdo (`engine/*.js`) não conhecem `schedule.mode` nem `sessions[]` — o modelo de sessões não vaza para o domínio pedagógico.

---

## 6. Conclusão

Só existe **um bug funcional real** (Finance per_lesson para aluno duplo). Todo o resto são **melhorias de UX** ou **decisões arquiteturais opcionais**. A boa notícia: o modelo escolhido para aulas duplas (`sessions[]` opcional dentro do mesmo registro por data) mantém 100% da compatibilidade com Progress, Annual Plan, Content Registry e todos os módulos pedagógicos, sem forçar migração.

Recomendação: começar pelo Finance (P0), depois documentar a decisão do Progress (P2), depois refinar UX do Lesson Builder (P1) — nesta ordem — quando a Luana confirmar que quer implementar.
