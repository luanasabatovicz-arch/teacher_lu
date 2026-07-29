# Aulas consecutivas — referência técnica oficial

**Documento canônico.** Este arquivo é a fonte de verdade sobre como a Teacher Lu Studio modela, persiste, calcula e apresenta aulas consecutivas (dois horários seguidos com o mesmo aluno). Se algum código divergir deste documento, o código está errado.

**Aplicável a:** Teacher Lu Studio v2.x em diante · Teacher Lu Practice (herda tudo).
**Versão do modelo:** `students@1.1.0` · `calendar@1.2.0`.

---

## 1. Visão geral

Alguns alunos da professora Luana fazem **dois horários consecutivos** na mesma noite (ex: 19:00–19:50 e 20:00–20:50, com 10 minutos de intervalo). A plataforma trata essa situação como **um bloco unificado com sessões distintas**:

- O aluno é dono de uma **configuração de agenda** (`schedule`) que define o modo (single/double), horário inicial, duração e intervalo.
- Cada dia de aula persiste um **registro** que — para alunos double — carrega uma lista `sessions[]` com o status individual de cada uma das duas aulas.
- Um **rollup automático** resume os dois status em um só, para compatibilidade com todo código antigo.

Alunos com aula única continuam funcionando **exatamente como antes**. O suporte a duplas é aditivo e opcional.

---

## 2. Modelo de dados

### 2.1 Aluno — campo `schedule`

O aluno é armazenado em `localStorage` sob a chave `sabatovicz_students` como um array JSON. Cada aluno pode carregar um campo opcional `schedule`:

```json
{
  "id": "maria",
  "name": "Maria Silva",
  "emoji": "🌸",
  "level": "A2",
  "age": 28,
  "schedule": {
    "mode": "double",
    "startTime": "19:00",
    "duration": 50,
    "breakMinutes": 10
  }
}
```

**Campos de `schedule`:**

| Campo | Tipo | Obrigatório | Default | Regra |
|-------|------|-------------|---------|-------|
| `mode` | `"single" \| "double"` | não | `"single"` | Só `"double"` habilita a segunda sessão |
| `startTime` | `"HH:MM"` (24h) | não | `""` | Vazio → aluno "sem horário fixo"; não aparece no dashboard do dia, mas todo resto funciona |
| `duration` | `number` (minutos) | não | `50` | Minutos por aula |
| `breakMinutes` | `number` (minutos) | não | `10` | Intervalo entre as sessões — ignorado quando `mode === "single"` |

**Exemplo — aluno single com horário definido:**

```json
{
  "id": "ana",
  "name": "Ana",
  "emoji": "🌟",
  "level": "A1",
  "schedule": { "mode": "single", "startTime": "18:00", "duration": 50 }
}
```

**Exemplo — aluno legado (sem `schedule`):**

```json
{ "id": "regis", "name": "Régis", "emoji": "🎸", "level": "A1", "age": 42 }
```

Este aluno é tratado como single, sem horário fixo. Zero migração necessária.

### 2.2 Registro do dia — campo `sessions`

Cada aula persiste em `localStorage` sob a chave `sched|<studentId>|<YYYY-MM-DD>`. Dois formatos coexistem:

#### Formato legado (aluno single, ou double sem detalhamento)

```json
{ "status": "done", "note": "past simple review" }
```

Campos aceitos:
- `status`: `"done" | "scheduled" | "cancelled" | ""`
- `note`: string livre

#### Formato novo (aluno double com registro por sessão)

```json
{
  "status": "done",
  "note": "aluna adorou o debate final",
  "sessions": [
    { "status": "done",      "note": "grammar review", "homework": "p24" },
    { "status": "scheduled", "note": "",               "homework": ""    }
  ]
}
```

**Campos de `sessions[i]`:**

| Campo | Tipo | Uso |
|-------|------|-----|
| `status` | `"done" \| "scheduled" \| "cancelled" \| ""` | Status desta sessão específica |
| `note` | string | Anotação da sessão (o que foi dado, absentismo, incidentes) |
| `homework` | string | Tarefa passada nesta sessão |

**Semântica de `note` no registro:**

- `record.note` — observação **geral do bloco** (vale para as duas aulas).
- `record.sessions[i].note` — observação **individual da sessão i**.
- `record.status` — rollup automático (ver §5). Deve estar sempre sincronizado com `sessions[]`.

Exemplo canônico completo:

```json
{
  "status": "done",
  "note": "Chegou 5 min atrasada, mas rendeu.",
  "sessions": [
    { "status": "cancelled", "note": "aluna atrasou",              "homework": "" },
    { "status": "done",      "note": "só sessão 2: past continuous", "homework": "3 frases usando past continuous negativas" }
  ]
}
```

### 2.3 Onde os dados vivem

| Chave localStorage | Conteúdo | Origem |
|--------------------|----------|--------|
| `sabatovicz_students` | Array de alunos (com ou sem `schedule`) | students.html |
| `sched\|<id>\|<YYYY-MM-DD>` | Registro do dia (single ou double) | schedule.html |
| `sabatovicz_progress_<id>` | Learning Progress (não muda) | platform-progress.js |
| `sabatovicz_finance_billing` | Planos de cobrança | finance.html |
| `sabatovicz_sched_id_migrated` | Flag da migração name→id | platform-students.js |

---

## 3. Retrocompatibilidade

Regras **rígidas** — a plataforma nunca as viola:

**R1.** Um aluno **sem** campo `schedule` deve ser tratado como se tivesse `schedule: {mode:"single", startTime:"", duration:50, breakMinutes:10}`. Nenhum código pode assumir que o campo existe.

**R2.** Um registro do dia **sem** campo `sessions` deve ser tratado como um dia com uma única sessão, cujo status é o próprio `record.status`. Nenhum código pode assumir que `sessions[]` existe.

**R3.** Um registro do dia **com** `sessions[]` **precisa** ter `record.status` sincronizado com o rollup (ver §5). A escrita é responsabilidade de quem grava; a leitura pode confiar.

**R4.** `TeacherLu.Students.scheduleOf(x)` sempre retorna um objeto completo — nunca `null`, nunca `undefined`. Preenche defaults.

**R5.** `TeacherLu.Calendar.lessons(...)` sempre retorna `sessions` como `null` (aluno legado) OU como array de tamanho ≥ 1 (aluno novo). Nunca `undefined`.

**R6.** Nenhuma migração de dados é obrigatória. Registros antigos permanecem intactos e são lidos com o formato antigo — para sempre.

**R7.** `Students.SCHEDULE_DEFAULT` é fonte única dos defaults; se mudar aqui, muda em toda plataforma.

---

## 4. API pública oficial

Toda leitura/escrita de aulas duplas passa por dois módulos.

### 4.1 `TeacherLu.Students` (platform-students.js v1.1.0)

```js
Students.scheduleOf(studentOrId)
  // → { mode, startTime, duration, breakMinutes } — nunca null

Students.isDouble(studentOrId)
  // → boolean

Students.sessionsOf(studentOrId)
  // → [{ label, start, end, startMin, endMin }]
  //   1 item para single, 2 para double.
  //   Retorna [] quando startTime vazio.

Students.blockRange(studentOrId)
  // → "19:00–20:50" (single ou double) ou "" se sem startTime

Students.blockMinutes(studentOrId)
  // → minutos totais do bloco (2×duration + break para double; duration para single)

Students.SCHEDULE_DEFAULT
  // → { mode:'single', startTime:'', duration:50, breakMinutes:10 }
```

### 4.2 `TeacherLu.Calendar` (platform-calendar.js v1.2.0)

**Leitura genérica — não mudou:**

```js
Calendar.lessons({ student, month, from, to, status })
  // → [{ studentKey, studentName, date, status, note, sessions }]
  //   sessions é null (legado) ou array normalizado.

Calendar.countDone(student, month)
  // → nº de DIAS com rollup 'done' (não conta sessões individuais!)

Calendar.summary(student, month)
  // → { done, scheduled, cancelled, total } por rollup
```

**Novo helper — leitura por sessão:**

```js
Calendar.sessionsDoneOn(student, date)
  // → 0, 1 ou 2
  // Aluno single com dia 'done'      → 1
  // Aluno single sem registro         → 0
  // Aluno double com ambas done       → 2
  // Aluno double com só 1 done        → 1
  // Aluno double com ambas cancelled  → 0
```

---

## 5. Regras de rollup do status do bloco

Quando um registro tem `sessions[]`, o campo `.status` é **derivado** com esta precedência (aplicada em ordem):

| Regra | Condição | Rollup |
|-------|----------|--------|
| **R.1** | Qualquer sessão tem `status === 'done'` | `'done'` |
| **R.2** | Nenhuma done, mas ao menos uma `'scheduled'` | `'scheduled'` |
| **R.3** | Nenhuma done/scheduled, mas ao menos uma `'cancelled'` | `'cancelled'` |
| **R.4** | Todas as sessões com `status === ''` | `''` |

**Justificativa da R.1:** uma sessão que aconteceu é fato consumado; o dia inteiro conta como "aula ministrada". Isso é o que Finance/Annual Plan esperam ver.

**Implementação canônica** (schedule.html e platform-calendar.js já usam esta mesma função):

```js
function rollupStatus(rec) {
  if (!rec) return '';
  if (rec.sessions && rec.sessions.length) {
    if (rec.sessions.some(s => s.status === 'done'))      return 'done';
    if (rec.sessions.some(s => s.status === 'scheduled')) return 'scheduled';
    if (rec.sessions.some(s => s.status === 'cancelled')) return 'cancelled';
    return '';
  }
  return rec.status || '';
}
```

**Regra de escrita:** ao gravar um registro com `sessions[]`, quem grava **deve** atualizar `record.status = rollupStatus(record)` antes de persistir. `schedule.html` já faz isso; qualquer módulo novo que escreva registros deve seguir.

---

## 6. Cobrança por aula — comportamento oficial

O plano de cobrança `per_lesson` da Finance é o único módulo cuja semântica muda para alunos double. **O contrato:**

> **Uma sessão feita = uma cobrança.**

| Cenário | Sessões done | Charges gerados |
|---------|-------------|-----------------|
| Aluno single, dia com `status='done'` | 1 | 1 charge no dia |
| Aluno single, dia com `status='cancelled'` | 0 | 0 charges |
| Aluno double, ambas `done` no mesmo dia | 2 | **2 charges** no dia |
| Aluno double, só S1 `done` | 1 | 1 charge no dia |
| Aluno double, só S2 `done`, S1 `cancelled` | 1 | 1 charge no dia |
| Aluno double, ambas `cancelled` | 0 | 0 charges |
| Aluno double, ambas `scheduled` (futuro) | 0 (não feitas ainda) | 0 charges (só o passado gera cobrança) |

**Implementação:** para cada `date` retornada por `Calendar.lessonsDone(student, month)`, iterar de `0` até `Calendar.sessionsDoneOn(student, date)-1` (com `Math.max(1, ...)`) e emitir um charge por iteração. Aluno single sempre gera 1 charge por date, sem regressão.

**Planos que NÃO dependem de sessões** (não mudam):
- `monthly` — 1 charge fixo no dia definido
- `weekly` — 1 charge por semana no dia da semana definido
- `biweekly` — 1 charge a cada 14 dias
- `package` — 1 charge único quando comprado
- `custom` — 1 charge no dia definido, ou manual

---

## 7. Comportamento esperado por módulo

### 7.1 Calendar (`schedule.html`)

- Célula do dia: pinta cor do rollup + pill `×2` para alunos double.
- Modal do dia:
  - Aluno single → visão idêntica à v1 (uma tela, um status, um note).
  - Aluno double → 3 abas (Aula 1, Aula 2, Bloco). Cada aba tem seu status, note e homework. Aba "Bloco" só edita `record.note`.
- Dashboard do dia (topo da página): mostra todos os alunos com horário para hoje. Aluno double é card colapsável com as duas sessões listadas.

### 7.2 Learning Progress (`platform-progress.js`)

**Decisão arquitetural:** granularidade por **dia**, não por sessão.

- `Progress.record(id, itemIds, date)` grava tudo sob a data (YYYY-MM-DD). Se o teacher marcou "grammar review" na sessão 1 e "conditionals" na sessão 2 no mesmo dia, ambos aparecem sob esse dia.
- `Progress.ofLesson(id, date)` retorna todos os conteúdos daquela data — sem distinção de sessão.

**Justificativa:** a pergunta que Progress responde é *"quando o aluno estudou X?"*. A resposta é uma data. Qual das duas sessões consecutivas cobriu X é detalhe operacional que não muda a resposta.

**Consequência:** módulos que dependem de Progress (Annual Plan, Lesson Builder, Grammar, Structures, Lessons) **não precisam saber** de sessions[]. Continuam funcionando idênticos.

### 7.3 Lesson Builder (`platform-lesson-builder.js`)

- `context.lessonsDone` — número de DIAS com aula (via rollup).
- `context.sessionsDone` — quando disponível, número de SESSÕES realmente feitas (double conta 2 por dia).
- `resolveLessonDate()` — retorna 1 data. Não distingue sessão.
- `recordLesson(plan)` — grava conteúdos sob 1 data em Progress. Consistente com §7.2.

**Notas:**
- Se o teacher usar o Builder duas vezes no mesmo dia para o mesmo aluno double, ambos os planos gravam sob a mesma data — os conteúdos se acumulam.
- Se quiser plano DIFERENTE por sessão, o teacher deve criar dois planos separados e nomear mentalmente qual é qual. A plataforma não distingue.

### 7.4 Finance (`finance.js`)

- `per_lesson` — segue §6 acima.
- `monthly`, `weekly`, `biweekly`, `package`, `custom` — inalterados.
- Dashboard financeiro / KPIs — cada charge que Finance emite é 1 linha. Aluno double per_lesson com ambas done gera 2 linhas no mesmo dia.

### 7.5 Annual Plan (`annual-plan.html`)

Não afetado. Usa só `Progress`, que é indexado por dia.

### 7.6 Módulos de conteúdo (grammar, lessons, structures, speaking-games, games, listening, hendrik, exercise-generator, lesson-generator, placement-test)

**Nenhum** conhece `schedule` ou `sessions[]`. **Nenhum** deve conhecer. O modelo de sessões não vaza para o domínio pedagógico.

---

## 8. Diretrizes para módulos futuros

Se você (ou uma IA) está escrevendo um módulo novo — na Studio ou na Practice — que precisa saber sobre aulas:

### 8.1 Checklist rápido

- [ ] Leio o campo `schedule` do aluno? **Não escreva `if (student.schedule)` direto.** Use `Students.scheduleOf(student)`.
- [ ] Preciso do horário? Use `Students.sessionsOf(student)` (retorna array com 1 ou 2 itens). Nunca calcule "start + duration" à mão.
- [ ] Preciso saber quantas aulas foram feitas? Escolha entre:
  - **DIAS com aula** → `Calendar.countDone(student, month)`.
  - **SESSÕES feitas** → `Calendar.sessionsDoneOn(student, date)` somado por dia.
- [ ] Preciso gravar um dia com sessões? Escreva o registro completo com `sessions[]` + `note` + `status` (rollup calculado). Nunca escreva só `sessions[]` sem atualizar `.status`.
- [ ] Preciso derivar status? Use a função de rollup canônica de §5. Não invente outra.
- [ ] Meu módulo é de conteúdo pedagógico (grammar, speaking, etc.)? Então você **não deve** olhar `schedule` nem `sessions[]`. Se está tentando, provavelmente há um design melhor.

### 8.2 Perguntas a fazer antes de escrever código

1. *"Faz diferença para o meu módulo se o dia tem 1 ou 2 sessões?"*
   - **Não:** ignore sessões, use rollup. Módulo funciona igual para single e double.
   - **Sim:** use `sessionsDoneOn(student, date)` — nunca inspecione `sessions[]` cru.

2. *"Estou contando aulas dadas para cobrar por elas?"*
   - Use §6. Uma sessão = uma cobrança.

3. *"Estou contando conteúdos aprendidos?"*
   - Use Progress (data-level). Não olhe sessions.

4. *"Estou mostrando horário na UI?"*
   - Use `Students.blockRange()` para o intervalo total + `Students.sessionsOf()` se precisar dos horários individuais.

### 8.3 Padrões visuais oficiais para aulas duplas

Todos catalogados na Component Library (`design-system.html`, seção "Aulas duplas"):

- `.time-range` / `.time-range.double` — badge de horário
- `.day.dual` + `.day-x2` — indicador na célula do calendário
- `.day-block` + `.day-block.dual` — card do dashboard do dia
- `.day-block-session` — linha de sessão dentro do card
- `.session-tabs` + `.session-tab` — abas Aula 1 / Aula 2 / Bloco

Use estes. Não invente novos.

---

## 9. Fluxos de uso canônicos

### 9.1 Cadastro de aluno com aulas duplas

```
students.html
   │
   ├─ Abre modal "Add student"
   ├─ Preenche name, level, age, emoji
   ├─ No bloco "Schedule":
   │    · Seleciona aba "Duas aulas consecutivas"
   │    · Horário início: 19:00
   │    · Duração: 50 min
   │    · Intervalo: 10 min
   │  Preview mostra: "19:00–19:50 · intervalo 10 min · 20:00–20:50 (bloco total: 110 min)"
   │
   └─ Save →
      Students.save() persiste com schedule: {mode:'double', startTime:'19:00', duration:50, breakMinutes:10}
```

### 9.2 Marcar sessão 1 done, sessão 2 done, no mesmo dia

```
schedule.html
   │
   ├─ Aluno double selecionado (Maria)
   ├─ Clica no dia 20/jul
   │
   ├─ Modal abre na aba "Aula 1"
   │    · Botão "✓ Lesson done" → session 0 marcada, rollup='done'
   │    · Nota: "past simple review"
   │    · Homework: "página 24"
   │    · localStorage: sched|maria|2026-07-20 =
   │       { status:'done', sessions:[{status:'done',note:'...',homework:'...'},{}] }
   │
   ├─ Clica aba "Aula 2"
   │    · Botão "✓ Lesson done" → session 1 marcada
   │    · Nota: "speaking activity"
   │    · localStorage: sched|maria|2026-07-20 =
   │       { status:'done', sessions:[
   │         {status:'done',...},
   │         {status:'done',note:'speaking activity'}
   │       ] }
   │
   └─ Fecha modal, calendário re-renderiza:
      · Célula 20/jul verde com ✓, badge ×2 no canto, traço duplo no rodapé
      · Dashboard do dia: bloco de Maria mostra ambas as sessões done
```

### 9.3 Finance cobra Diana (double, per_lesson R$50) por 3 sessões

```
Calendar tem para diana em julho:
  2026-07-20 → sessions:[done, done]   (rollup: done, 2 sessões done)
  2026-07-23 → sessions:[cancelled, done] (rollup: done, 1 sessão done)

Finance per_lesson:
   │
   ├─ lessonProvider retorna: ['2026-07-20', '2026-07-23']
   │
   ├─ Para cada data:
   │    · sessionsDoneOn('diana', '2026-07-20') → 2 → emite 2 charges de R$50 em 20/jul
   │    · sessionsDoneOn('diana', '2026-07-23') → 1 → emite 1 charge de R$50 em 23/jul
   │
   └─ Total mês: R$150 (3 charges × R$50)
      · KPI "Received": R$150
      · Dashboard mostra 3 linhas de charge, 2 delas com sessionIndex diferente
```

### 9.4 Retrocompatibilidade — aluno legado sem `schedule`

```
Aluno Régis, cadastrado antes do modelo novo, não tem campo schedule.

students.html abre modal de Régis:
   · Students.scheduleOf(regis) → { mode:'single', startTime:'', duration:50, breakMinutes:10 }
   · Aba "Aula única" ativa por default
   · Horário vazio (sem horário definido)
   · Preview do horário oculto (nenhum startTime)

schedule.html com Régis selecionado:
   · Students.isDouble(regis) → false
   · Célula do dia: sem ×2, sem traço duplo
   · Modal do dia: sem abas de sessão, layout idêntico à v1
   · Dashboard do dia: Régis NÃO aparece (não tem startTime)

Se Régis foi editado e Luana adicionar apenas o startTime "16:00" sem mudar mode:
   · schedule: { mode:'single', startTime:'16:00', duration:50, breakMinutes:10 }
   · Passa a aparecer no dashboard do dia como single com horário 16:00–16:50
```

---

## 10. Decisões arquiteturais registradas

**D1.** Sessões vivem **dentro** do registro do dia (`sessions[]`), não como chaves separadas (`sched|<id>|<date>|s1`). Motivos:
- Um dia é uma unidade natural do calendário.
- Backup por chave `sched|*` continua capturando tudo automaticamente.
- Rollup fica trivial de calcular.

**D2.** Progress é indexado por dia, não por sessão. Ver §7.2.

**D3.** Rollup usa "qualquer done → done" (não "todas done → done"). Motivo: se uma sessão aconteceu, o dia inteiro conta como aula dada — é o que Finance/reports esperam.

**D4.** Aluno pode ter `mode: 'double'` sem `startTime`. Nesse caso, é double para fins de UI (modal com abas, célula com pill ×2 quando houver registros com sessions), mas não aparece no dashboard do dia. Motivo: permite o teacher configurar o modo antes de decidir o horário.

**D5.** Não existe `mode: 'triple'` nem N. O modelo `sessions[]` já é um array de tamanho variável, mas a UI atual só cobre 1 ou 2. Extensão para 3+ é possível sem migração — só requer expansão da UI.

---

## 11. FAQ

**Q1. Preciso migrar meus alunos antigos?**
Não. Alunos sem `schedule` funcionam como sempre funcionaram.

**Q2. E se eu importar um backup antigo?**
Funciona. O import restaura os registros como estavam; nada é reinterpretado.

**Q3. E se eu quiser dar aula dupla numa data específica para um aluno single?**
Hoje não é suportado. O `mode` está no aluno, não no dia. Se precisar, mude o mode do aluno, marque as sessões, depois volte para single (se for algo pontual — desde que as duas sessões daquele dia já estejam gravadas). O ideal futuro seria permitir override por dia.

**Q4. E se um aluno double faltar em uma sessão, mas fizer a outra?**
Aba "Aula 1" com status `cancelled`, aba "Aula 2" com status `done`. Rollup = `done`. Finance per_lesson cobra 1 sessão.

**Q5. E se cancelar as duas sessões?**
Rollup = `cancelled`. Nada é cobrado. `Calendar.sessionsDoneOn = 0`.

**Q6. Como faço uma observação que vale para o bloco todo?**
Aba "Bloco" do modal do dia — grava em `record.note`. Aparece nos exports do calendário como observação geral.

**Q7. E se o aluno chegar tarde e a S1 for perdida — cobra?**
S1 = `cancelled`, S2 = `done`. Finance cobra 1 sessão. É o comportamento esperado — a S1 não aconteceu.

**Q8. Posso planejar dois planos de aula diferentes (Grammar na S1, Speaking na S2) no Lesson Builder?**
Hoje não. O Builder gera 1 plano por data. Ambos os planos gravariam sob a mesma data em Progress. Recomendação: gere um plano para o bloco inteiro (110 min) e execute em duas metades.

**Q9. Quando esse modelo se torna a ordem oficial da plataforma?**
Já é. Este documento é canônico a partir de agora.

---

## 12. Roadmap conhecido (não implementado)

| Item | Prioridade | Nota |
|------|-----------|------|
| **`finance.js` per_lesson × double** — expandir por `sessionsDoneOn` | **P0** | Bug real, subfatura Diana em ~50%. Correção prescrita em 5 linhas na §6 do relatório `AUDITORIA-AULAS-DUPLAS.md`. |
| **`ctx.sessionsDone` no Lesson Builder** | P1 | Adicionar campo sem quebrar `lessonsDone` |
| **Banner "este aluno tem 2 aulas hoje" no builder.html** | P1 | UX; usa `Students.isDouble()` |
| **DURATIONS adaptáveis (90/100/110)** | P2 | Comodidade |
| **Vista semanal no calendário** | P2 | Calendário estilo Google Cal |
| **Detecção de conflito de horário** | P2 | Requer campo `weekdays[]` no schedule |
| **Suporte a 3+ aulas consecutivas** | P3 | Modelo `sessions[]` já aceita, só UI que assume ≤ 2 |
| **Override "hoje é dupla" para aluno single** | P3 | Campo `schedule` na chave `sched|*` |
| **Progress por sessão** | P3 | Estender `lessons: [{date,session}]`. Nenhum caso de uso hoje. |

---

## Assinatura oficial

Este arquivo (`docs/CONSECUTIVE-LESSONS.md`) é o **documento canônico** de suporte a aulas consecutivas na Teacher Lu Studio. Qualquer módulo, presente ou futuro, que lide com aulas deve seguir estas definições.

Documentos complementares:
- `AGENDA-AULAS-DUPLAS.md` — histórico da implementação inicial
- `AUDITORIA-AULAS-DUPLAS.md` — mapa dos módulos que precisam adaptar-se
- `SIMULACAO-SEMANA.md` — validação por simulação com 4 alunos

Última atualização: 28 jul 2026. Autor: equipe de plataforma Teacher Lu.
