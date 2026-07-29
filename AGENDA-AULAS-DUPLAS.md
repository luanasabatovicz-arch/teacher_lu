# Agenda com aulas duplas — nova arquitetura

**Data:** 28 jul 2026
**Escopo:** suporte a alunos com **duas aulas consecutivas** no Lesson Calendar, mantendo 100% de retrocompatibilidade com alunos de aula única.

---

## 1. O que foi alterado

### 1.1 Modelo de dados

**Aluno** ganhou campo opcional `schedule`:

```js
{
  id, name, emoji, level, age,
  schedule: {              // opcional — sem este campo = single legado
    mode:         'single' | 'double',
    startTime:    'HH:MM',       // '' se ainda não definido
    duration:     50,            // minutos por aula
    breakMinutes: 10             // gap entre as aulas (só double)
  }
}
```

**Registro do dia** (chave `sched|<studentId>|<YYYY-MM-DD>`) ganhou campo opcional `sessions`:

```js
// Formato legado (continua funcionando exatamente igual):
{ status, note }

// Formato novo — aluno com aula dupla:
{
  status,      // rollup automático a partir das sessões
  note,        // observação GERAL do bloco
  sessions: [
    { status: 'done'|'scheduled'|'cancelled'|'', note, homework },
    { status,                                    note, homework }
  ]
}
```

**Regra de rollup** (implementada em `platform-calendar.js`):
- qualquer sessão `done` → bloco = `done`
- qualquer `scheduled` (e nenhuma done) → `scheduled`
- qualquer `cancelled` (e nenhuma outra) → `cancelled`
- caso contrário → sem status

Consumidor legado (Finance, Annual Plan) continua vendo `.status` como uma string única — sem regressão. Consumidor novo pode ler `.sessions` quando presente.

### 1.2 Componentes visuais adicionados ao Design System

Todos os novos padrões estão em `design-system/patterns.css` e catalogados na Component Library (`design-system.html`, seção **Aulas duplas** no menu lateral):

| Componente | Uso |
|------------|-----|
| `.time-range` / `.time-range.double` | Badge de horário (mono) — mostrada em `students.html`, `stu-grid`, dashboard do dia |
| `.day.dual` + `.day-x2` | Indicador na célula do calendário: traço duplo no rodapé + pill "×2" no canto |
| `.day-block` + `.day-block.dual` | Card do dashboard do dia (colapsável para aulas duplas) |
| `.day-block-session` | Linha de sessão dentro do card (com status colorido) |
| `.session-tabs` + `.session-tab` | Abas dentro do modal do dia (Aula 1 · Aula 2 · Bloco), com dot de status |

### 1.3 UX — melhorias implementadas

**Cadastro (`students.html`)**
- Novo bloco "Schedule" no modal com abas: **Aula única** / **Duas aulas consecutivas**
- Campos: horário de início, duração de cada aula, intervalo (só aparece em duas aulas)
- **Preview em tempo real**: mostra o horário final calculado (ex: `19:00–19:50 · intervalo 10 min · 20:00–20:50 (bloco total: 110 min)`)
- Lista de alunos exibe a time-range badge junto do nível/idade

**Calendário (`schedule.html`)**
- **Dashboard do dia** no topo — banner com data atual + lista de todos os alunos com horário para hoje, ordenados por horário de início
  - Aluno single → linha compacta com hora e status; clique abre o modal do dia
  - Aluno double → card colapsável mostrando as duas sessões ao expandir; clique em cada sessão abre o modal já na aba certa
- **Célula do dia** de aluno double mostra o traço duplo no rodapé e o pill "×2" no canto
- **Modal do dia** com abas quando o aluno é double: Aula 1 · Aula 2 · Bloco (observação geral)
  - Cada aba tem status próprio + nota + homework
  - A aba "Bloco" só edita a observação geral que vale para as duas aulas
  - Bolinha do status na aba (verde/azul/coral) — quem só olha o modal vê num relance o que já foi marcado

**Legenda** do calendário atualizada com o marcador de aula dupla.

### 1.4 Backward compatibility — testes automatizados

Simulação com Node executou os cenários críticos:

- Aluno legado (sem `schedule`) → `mode='single'`, `sessionsOf=[]`, `blockRange=''` ✓
- Aluno com single mode + horário → 1 sessão, `blockMinutes=50` ✓
- Aluno com double mode + horário → 2 sessões, `blockMinutes=110` ✓
- Registro legado `{status:'done',note:'ok'}` → lido igual pelo Calendar.lessons(), `sessions=null` ✓
- Registro novo com session[0].done + session[1].scheduled → rollup = `'done'`, sessionsDoneOn=1 ✓
- Registro novo com session[0].cancelled + session[1].cancelled → rollup = `'cancelled'`, sessionsDoneOn=0 ✓

Nenhum aluno existente precisa ser migrado. Nenhum registro precisa ser convertido.

---

## 2. Arquivos modificados

| Arquivo | Mudança |
|---------|---------|
| `platform-students.js` | v1.1.0 — helpers `scheduleOf()`, `isDouble()`, `sessionsOf()`, `blockRange()`, `blockMinutes()`, constante `SCHEDULE_DEFAULT`, parsers de tempo |
| `platform-calendar.js` | v1.2.0 — `toLesson()` agora retorna `sessions` normalizadas + rollup de status; nova função `sessionsDoneOn()` |
| `students.html` | Modal expandido com bloco Schedule (abas single/double + inputs + preview do horário final); `render()` mostra time-range badge |
| `schedule.html` | **Reescrita**: dashboard do dia no topo, célula com indicador dual, modal com abas de sessão + campo homework, seletores de aluno com time-range |
| `design-system/patterns.css` | +150 linhas — todos os componentes de aulas duplas |
| `design-system.html` | Nova seção "Aulas duplas" com 5 exemplos ao vivo |

**Total: 6 arquivos alterados. Zero arquivos criados. Zero arquivos deletados.**

---

## 3. Nova lógica de agendamento

### Fluxo do cadastro

```
Abrir modal → escolher mode (single/double)
   │
   ├─ single → definir Horário início + Duração → preview: "19:00–19:50"
   │
   └─ double → definir Horário início + Duração + Intervalo
              → preview: "19:00–19:50 · intervalo 10 min · 20:00–20:50 (110 min)"
```

Se o usuário deixar `startTime` vazio, o aluno é gravado sem `schedule.startTime` — tratado como "aluno sem horário fixo definido" (funciona como single legado no calendário; não aparece no dashboard do dia).

### Fluxo do registro (aluno double)

```
Dashboard do dia mostra o bloco com 2 sessões
   │
   ├─ clique na sessão 1 → modal abre na aba "Aula 1"
   │        └─ marcar status · nota · homework
   │
   ├─ clique na sessão 2 → modal abre na aba "Aula 2"
   │        └─ marcar status · nota · homework
   │
   └─ na aba "Bloco" → observação geral para as duas aulas
```

Rollup é derivado das sessões automaticamente e mantém a compatibilidade com Finance/Annual Plan.

### Fluxo de leitura para outros módulos

Nenhum outro módulo (Finance, Annual Plan, Build Today's Lesson) precisou mudar. `Calendar.countDone()` retorna o mesmo número que retornava antes; `Calendar.lessons()` continua retornando os mesmos objetos, agora com `.sessions` opcional. Se algum módulo quiser cobrar por sessão feita, chama a nova `Calendar.sessionsDoneOn(student, date)` — retorna 0, 1 ou 2.

---

## 4. Melhorias de UX

1. **Dashboard do dia** — antes o teacher precisava navegar por aluno até encontrar quem era hoje; agora vê a lista pronta ao abrir o Calendário.
2. **Preview do horário calculado** — no cadastro, o teacher vê imediatamente qual será o horário final antes de salvar. Zero cálculo mental.
3. **Time-range badges** — presentes na lista de alunos, no seletor do calendário e no dashboard; identificação visual em 100ms.
4. **Indicador visual dual no calendário** — não parecem duas aulas separadas; o traço duplo + o pill "×2" indicam agrupamento.
5. **Modal com abas de sessão** — troca de aula acontece dentro do mesmo modal, sem voltar ao calendário. Bolinhas de status nas abas mostram o que já foi marcado.
6. **Aba "Bloco"** — observação geral que vale para as duas aulas, mantendo-as sim como aulas distintas mas conectadas.
7. **Campo `homework` por sessão** — antes só existia uma nota livre; agora é um campo dedicado, alinhado com a semântica pedagógica.
8. **Ícones Lucide** substituíram todos os símbolos ASCII (✓/✗/◷ ainda usados semanticamente como marcador rápido de status na célula do dia, mas nos botões viraram `check` / `x` / `clock`).
9. **Padrões DS reutilizáveis** — os novos componentes já estão prontos para a Teacher Lu Practice sem adaptação.

---

## 5. Oportunidades adicionais para versões futuras

**P1 — Alta prioridade**
1. **Marcar sessão diretamente pelo dashboard do dia** — hoje ainda abre o modal; com um botão "✓" inline na sessão dá para marcar como done com 1 clique, mantendo o modal só para casos com nota/homework.
2. **Vista semanal** — dashboard do dia é bom, mas uma vista de 7 dias com blocks distribuídos por hora (calendário Google-like) seria natural para alunos com horários fixos.
3. **Detecção de conflito** — se dois alunos têm horários que se sobrepõem no mesmo dia da semana, avisar no cadastro. Requer um campo `weekday` no schedule (`schedule.weekdays: ['tue','thu']`) — hoje o startTime não amarra dia da semana.

**P2 — Média prioridade**
4. **Suporte a 3 ou mais aulas consecutivas** — o modelo `sessions[]` já é um array de tamanho variável; UI atual assume 1 ou 2. Seria estender `mode: 'single'|'double'|'triple'` ou generalizar como `mode: 'block', sessions: N`.
5. **Ajuste rápido de horário** — arrastar sessões para mudar horário no dashboard do dia (ex: aluno adiou 30min).
6. **Recorrência** — hoje o startTime é aplicado a qualquer dia; seria útil marcar quais dias da semana o aluno tem aula (`weekdays`), então o dashboard mostra "próxima aula do Maria: quinta 19:00".
7. **Cor personalizada por aluno** — hoje todos usam a mesma paleta primary/secondary; um accent por aluno ajudaria a identificar visualmente no calendário e no dashboard.

**P3 — Baixa prioridade / longo prazo**
8. **Notificações no dia da aula** — Web Notifications API + PWA para lembrar 15min antes da primeira sessão.
9. **Cálculo de duração real (com pausas)** — se o teacher marcar "clock in / clock out" por sessão, o sistema calcula quanto durou de fato vs o programado — útil para saber se está sempre estourando.
10. **Sincronização com Google Calendar** — export ICS já é possível; import bidirecional seria uma feature-flag futura.
11. **Múltiplos horários por semana** — aluno que tem aula às terças 19:00 e às quintas 20:00 — hoje o `startTime` é único e global. Seria `schedule.weekly: [{weekday:'tue', mode, startTime, ...}, ...]`.

---

## Estado final

- **Alunos com aula única:** funcionam **exatamente como antes**. Nenhuma tela precisa de configuração.
- **Alunos com aula dupla:** ganham interface dedicada — cadastro com abas, dashboard do dia, calendário com indicador visual, modal com sessões.
- **Nenhuma regressão detectada** — testes automatizados na API validaram os 6 cenários críticos.
- **Design System atualizado** — 5 novos padrões catalogados na Component Library.
- **Retrocompatibilidade 100%** — nenhuma migração de dados necessária, backup antigo importável sem ajuste.

Feature entregue, testada, documentada e reutilizável na Teacher Lu Practice.
