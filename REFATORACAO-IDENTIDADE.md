# Refatoração — identidade por id e fonte única de alunos

**Data:** 21/07/2026
**Motivo:** eliminar os dois riscos arquiteturais A-1 e A-3 da auditoria
**Resultado:** ambos resolvidos, 12 páginas sem erro de runtime, nenhum dado perdido

---

## 1. O que foi resolvido

### A-1 · Aulas indexadas por nome (risco alto)

**Antes:** `sched|Isa|2026-07-06` — renomear a aluna orfanava todo o histórico e zerava a cobrança por aula no Finance, silenciosamente.

**Agora:** `sched|isa|2026-07-06`. O `student.id` é a identidade; o nome só aparece na tela.

Comprovação no teste automatizado:

```
                          ANTES da refatoração   DEPOIS
aulas antes do rename            3                 3
aulas após "Isa"→"Isabela"       0  ← perdia       3  ← preservado
cobrança Finance (3×R$80)     R$ 0,00           R$ 240,00
```

### A-3 · `DEFAULT_STUDENTS` duplicado em seis páginas

**Antes:** a mesma lista de 7 alunos escrita seis vezes. Se uma cópia divergisse, páginas diferentes mostrariam alunos diferentes.

**Agora:** existe em **um** arquivo. Verificado: `id:'natali'` aparece uma única vez em todo o projeto, dentro de `platform-students.js`.

---

## 2. Arquivos alterados

### Criado

| Arquivo | Papel |
|---|---|
| `platform-students.js` | Fonte única da lista de alunos + rotina de migração das chaves do calendário |

API: `DEFAULTS`, `load()`, `save()`, `byId()`, `byName()`, `nameOf()`, `idOf()`, `resolveId()`, `slug()`, `migrateScheduleKeys()`.

### Modificados

| Arquivo | Mudança |
|---|---|
| `schedule.html` | `student` passa a guardar o **id**; `keyFor()` indexa por id; nova `displayName()` para toda exibição (título, modal, exports PDF); `lpStudentId()` simplificada; bloco duplicado → delegação |
| `platform-calendar.js` | `resolveName()` → `resolveKey()`, resolve id com fallback por nome; comparações passam a usar `studentKey`; v1.0.0 → v1.1.0 |
| `students.html` | Bloco duplicado → delegação; `saveStudents()` e `slug()` delegam |
| `annual-plan.html` | Bloco duplicado → delegação |
| `lessons.html` | Bloco duplicado → delegação |
| `grammar.html` | Bloco duplicado → delegação |
| `speaking.html` | Bloco duplicado → delegação |

Em cada página o bloco de ~10 linhas virou:

```js
const STU_KEY = TeacherLu.Students.KEY;
const DEFAULT_STUDENTS = TeacherLu.Students.DEFAULTS;
function loadStudents(){ return TeacherLu.Students.load(); }
```

Os identificadores foram **mantidos de propósito** — assim nenhuma outra linha das seis páginas precisou mudar. Menos superfície, menos risco de regressão.

---

## 3. Migração executada

`TeacherLu.Students.migrateScheduleKeys()` roda ao carregar `platform-students.js`, em qualquer página.

**Regras:**

1. Percorre as chaves `sched|*` num snapshot antes de escrever
2. Segmento que já é um id conhecido → intacto
3. Segmento que casa com o nome de um aluno → reescrito para `sched|<id>|<data>`
4. Segmento não reconhecível → **preservado onde está** (nada é apagado)
5. Nunca sobrescreve um registro por id já existente
6. Marca `sabatovicz_sched_id_migrated = '1'` e não roda de novo

**Resultado no cenário de teste (6 registros):**

| | |
|---|---|
| Convertidos | 5 (`Isa` → `isa`, `Heitor` → `heitor`) |
| Preservados sob nome desconhecido | 1 (`Fulano` — aluno já removido) |
| Perdidos | **0** |
| Notas e status | preservados integralmente |

O aluno não reconhecido gera um aviso no console e **continua visível** através do fallback por nome do `platform-calendar.js` — nenhum histórico fica invisível.

---

## 4. Retrocompatibilidade

| Cenário | Comportamento |
|---|---|
| Storage já com dados por nome | Migrado na primeira abertura de qualquer página |
| Storage já migrado | Flag impede reexecução — 2ª carga não altera um byte |
| Storage vazio (instalação nova) | Semeia os 7 alunos padrão; migração não quebra |
| Registro sob nome órfão | Mantido e ainda legível pelo fallback |
| `Progress`, `errq|`, chaves do Finance | Já usavam id — intocados |

---

## 5. Testes executados

**Migração e integridade** — 24 asserções, todas verdes: contagem de chaves antes/depois, conversão por aluno, preservação de notas, idempotência, aluno órfão, storage vazio.

**O bug original** — reproduzido e confirmado corrigido: renomear "Isa" para "Isabela" mantém as 3 aulas e a cobrança de R$ 240,00.

**Ausência de regressão** — 12 páginas carregadas em DOM headless com scripts na ordem real: **todas sem erro**.

**Learning Progress** — verificado que continua íntegro (sempre usou id).

**Falso positivo recorrente:** o harness acusa `SPEAKING_FOLLOWUP_BANKS is not defined` em `speaking.html`. Testado nas duas versões do arquivo, com e sem as linhas adicionadas: ambas passam limpas. É limitação do `eval()` isolado, que não reproduz o escopo compartilhado entre `<script>` do navegador. Não é regressão.

---

## 6. O que continua pendente da auditoria

| Item | Situação |
|---|---|
| A-2 · `lesson-generator.html` fora da navegação | Decisão de produto sua |
| A-3 · `printDoc()` repetido em 6 arquivos | Não tocado — mesmo padrão, menor risco |
| A-4 · Títulos inconsistentes | Cosmético |

---

## 7. Recomendação de validação manual

1. **Students** — renomear um aluno e confirmar que nada some
2. **Lesson Calendar** — abrir esse mesmo aluno e conferir que as aulas continuam lá
3. **Finance** — plano "Per lesson" ligado ao calendário, conferir que o valor bate
4. **Annual Plan** — trocar de aluno, marcar conteúdo, abrir "52-week themes"
5. **Grammar / Speaking / Lessons** — abrir e confirmar que o seletor de alunos aparece normal

O passo 1 seguido do 2 é o teste decisivo: era exatamente ele que falhava antes.
