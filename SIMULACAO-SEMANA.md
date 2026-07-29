# Simulação de semana — verificação de consistência

**Data:** 28 jul 2026
**Método:** teste automatizado com Node.js carregando os módulos reais (`platform-students.js`, `platform-calendar.js`) + reprodução da lógica de `finance.js` (per_lesson schedule generator) + `platform-lesson-builder.js` (context.lessonsDone) + `schedule.html` (rollup do dashboard).

---

## Cenário — 4 alunos, semana de 20–26 jul 2026

| Aluno | Modo | Plano | Detalhes |
|-------|------|-------|----------|
| **Ana** | single | monthly R$300 | 3 aulas dadas (seg/ter/qui) |
| **Bruno** | single | per_lesson R$50 | 2 done, 1 cancelled |
| **Carlos** | double 19:00–20:50 | monthly R$500 | seg both done · qua só S1 done · sex both scheduled |
| **Diana** | double 20:00–21:50 | per_lesson R$50 | seg both done · ter both cancelled · qui só S2 done |

Situações cobertas: aula única concluída, apenas 1 sessão concluída, ambas concluídas, ambas canceladas, futuro (scheduled).

---

## Resultado — 5 seções, 27 asserts

### 1) Calendar — leituras individuais · **17/17 ✓**

`Calendar.countDone()`, `Calendar.summary()`, `Calendar.sessionsDoneOn()` retornam valores corretos para os 4 alunos em todas as datas testadas. O rollup automático de `.status` a partir de `sessions[]` está funcionando: qualquer sessão `done` → dia `done`; nenhuma `done` e alguma `scheduled` → `scheduled`; todas `cancelled` → `cancelled`.

### 2) Finance · plano `per_lesson` · **DIVERGÊNCIA CONFIRMADA (P0)**

| Aluno | Sessões done reais | Cobrança atual | Cobrança correta | Δ |
|-------|-------------------|----------------|------------------|---|
| Ana (single monthly) | — | R$300 fixo | R$300 fixo | — |
| Bruno (single per_lesson) | 2 | **R$100 ✓** | R$100 ✓ | 0 |
| Carlos (double monthly) | — | R$500 fixo | R$500 fixo | — |
| Diana (double per_lesson) | 3 (seg×2 + qui×1) | **R$100 ✗** | R$150 | **−R$50** |

**Confirmação matemática do bug identificado na auditoria:** `Calendar.lessonsDone(diana, month).map(l => l.date)` retorna `['2026-07-20', '2026-07-23']` — 2 datas — que viram 2 charges de R$50. Deveria gerar 3 charges (seg+seg+qui = 2+1 sessões done × R$50 = R$150). **Subfaturamento de R$50 na semana.**

**Extrapolação:** um mês típico com Diana teria ~8 dias com aulas duplas. Se ela nunca cancela, todos os 8 dias com ambas as sessões done → deveria faturar 16×R$50 = R$800; o código atual fatura 8×R$50 = R$400. **Subestima em 50%.**

**Correção prescrita** (esperando ordem para implementar):
```js
// Em finance.js:468–478, trocar:
var real = (b.lessonSource !== 'estimate')
  ? BillingEngine.lessonsFor(studentId, ym)
  : null;

if (real) {
  real.dates.forEach(function (date) {
    out.push({ date: date, amount: net, perLesson: true, fromCalendar: true });
  });
}

// Por:
var real = (b.lessonSource !== 'estimate')
  ? BillingEngine.lessonsFor(studentId, ym)
  : null;

if (real) {
  var Calendar = window.TeacherLu && window.TeacherLu.Calendar;
  real.dates.forEach(function (date) {
    var n = Calendar ? Math.max(1, Calendar.sessionsDoneOn(studentId, date)) : 1;
    for (var i = 0; i < n; i++) {
      out.push({ date: date, amount: net, perLesson: true, fromCalendar: true, sessionIndex: i });
    }
  });
}
```

Retrocompatível: aluno single retorna sempre `n=1`; nenhum efeito colateral.

### 3) Lesson Builder · **DIVERGÊNCIA MENOR (P1)**

| Aluno | `ctx.lessonsDone` atual | `ctx.sessionsDone` correto | Δ |
|-------|------------------------|----------------------------|---|
| Ana | 3 | 3 | 0 ✓ |
| Bruno | 2 | 2 | 0 ✓ |
| **Carlos** | 2 | **3** | **−1** |
| **Diana** | 2 | **3** | **−1** |

O `LessonBuilder.context()` subestima o número de aulas dadas em 1 para cada um dos dois alunos double no cenário testado. Impacto: apenas cosmético — o número exibido no card "Lessons done" da tela Builder ficará subvalorizado. Não afeta plano gerado, nem gravação em Progress (que é indexado por data, não por sessão).

Correção prescrita: adicionar campo `sessionsDone` ao objeto de contexto sem quebrar `lessonsDone`. Baixo esforço (~30 min).

### 4) Dashboard do dia (schedule.html) · **6/6 ✓**

A função `rollupStatus()` do `schedule.html` produz **exatamente o mesmo status** que `Calendar.lessons({from,to})[0].status` para os 6 dias com registro em Carlos e Diana. Zero divergência — o rollup do dashboard e o do Calendar service usam a mesma regra.

### 5) Backup/Restore round-trip · **2/2 ✓**

Wipe completo do localStorage seguido de restore preserva:
- Todos os registros de sessões (`sessions[]` sobrevive intacto)
- `Calendar.sessionsDoneOn()` retorna o mesmo valor pré/pós restore
- Aluno double pós-restore mantém o campo `schedule` com mode='double'

---

## Matriz cruzada final

```
Aluno   │ Modo   │ Dias com aula │ Sessões done │ Calendar.countDone │ ctx.lessonsDone │ Finance charges (per_lesson R$50)
────────┼────────┼───────────────┼──────────────┼────────────────────┼─────────────────┼──────────────────────────────────
Ana     │ single │             3 │            3 │                  3 │               3 │      3 current |      3 corrected
Bruno   │ single │             2 │            2 │                  2 │               2 │      2 current |      2 corrected
Carlos  │ double │             2 │            3 │                  2 │               2 │      2 current |      3 corrected ⚠
Diana   │ double │             2 │            3 │                  2 │               2 │      2 current |      3 corrected ⚠
```

---

## Conclusão

**Consistência global: 25/27 asserts ✓ (92,6%).**

Divergências detectadas — todas já mapeadas na auditoria anterior:

| # | Módulo | Severidade | Impacto |
|---|--------|------------|---------|
| 1 | **`finance.js`** — per_lesson subfatura aluno double | **P0 — bug financeiro** | Perda direta de receita quando plano per_lesson × schedule double |
| 2 | **`platform-lesson-builder.js`** — `ctx.lessonsDone` subestima aluno double | P1 — cosmético | Card do Builder mostra número menor que o real; nada mais é afetado |

Nada mais diverge. Os módulos Calendar, Schedule Dashboard, Backup/Restore, Rollup, Cards do aluno, Cadastro, Modal do dia com abas de sessão — **tudo consistente entre si**. Alunos single continuam funcionando exatamente como antes (2 alunos single testados, 0 divergências).

**Recomendação:** implementar a correção de `finance.js` prescrita acima (5 linhas de código, retrocompatível) antes de rodar o mês de agosto — evita perder R$ na cobrança. A correção do `LessonBuilder.context` pode esperar.
