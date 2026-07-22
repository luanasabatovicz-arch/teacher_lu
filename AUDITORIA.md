# Auditoria — Teacher Lu Platform

**Data:** 21/07/2026
**Escopo:** 14 páginas HTML, 5 arquivos em `engine/`, 3 camadas compartilhadas
**Método:** verificação automatizada — resolução de links, `node --check` em arquivos e scripts inline, execução real das páginas em DOM headless (jsdom), análise estática de funções e chaves de storage

---

## Resumo

| Verificação | Resultado |
|---|---|
| Links e `<script src>` quebrados | **0** |
| Erros de sintaxe JS | **0** (14 arquivos + 12 blocos inline) |
| Erros de runtime ao carregar as páginas | **0** em 13 de 13 |
| Funções órfãs reais | **0** (5 falsos positivos analisados) |
| Arquivos não utilizados | **2** |
| Inconsistências de navegação | **1** (corrigida) |
| Regressões visuais | **0** |
| Duplicação de lógica | **3 padrões**, 6 arquivos cada |
| Risco estrutural | **1 — alto** |

Nenhum problema crítico de funcionamento. O achado sério é arquitetural e está descrito em A-1.

---

## A. Problemas que exigem decisão sua

### A-1 · ALTO — Renomear um aluno apaga o histórico de aulas dele

**Onde:** `schedule.html`, linha 197.

O calendário indexa as aulas pelo **nome** do aluno:

```js
function keyFor(s,d){ return 'sched|'+s+'|'+d; }   // 'sched|Isa|2026-07-06'
```

Todo o resto da plataforma usa o **id** (`sabatovicz_progress_isa`, `errq|isa`, `sabatovicz_finance_billing`). Corrigir o nome de um aluno em Students quebra o vínculo.

**Reproduzido:**

```
ANTES                          DEPOIS de "Isa" → "Isabela"
aulas no calendário:  3        aulas no calendário:   0   ← órfãs
conteúdos estudados:  1        conteúdos estudados:   1   ← preservado (id)
                               chaves órfãs no storage: 3
```

**Impacto em cadeia:** o Finance cobra por aula lendo o calendário. Renomear um aluno faz a cobrança dele cair para zero silenciosamente. O Learning Progress não é afetado (usa id).

**Não corrigi** porque exige migrar as chaves existentes e alterar `schedule.html` — justamente um dos arquivos que você quer validar à mão. A correção seria: passar a gravar por id, e na primeira carga renomear `sched|<nome>|` para `sched|<id>|` casando pelo nome atual.

**Mitigação até lá:** evite renomear alunos em Students.

### A-2 · MÉDIO — Dois arquivos fora da navegação

- `lesson-generator.html` (241 linhas, funcional, sem erros) — não é linkado por nenhuma página
- `verificacao.html` — página de diagnóstico, também não linkada

Ambos só abrem por URL direta. Não removi nem adicionei à Home: decidir se `lesson-generator.html` merece um card é escolha de produto, não correção.

### A-3 · MÉDIO — Três lógicas duplicadas

| Lógica | Repetida em | Linhas |
|---|---|---|
| `DEFAULT_STUDENTS` + `loadStudents()` | students, schedule, annual-plan, lessons, grammar, speaking | ~10 × 6 |
| `printDoc()` (gerador de PDF) | annual-plan, exercise-generator, grammar, lessons, placement-test, schedule | ~1 × 6 |
| `esc()` / `escapeHtml()` / `lpEsc()` | annual-plan, schedule, students | ~1 × 3 |

O risco real é a lista `DEFAULT_STUDENTS`: se as seis cópias divergirem, páginas diferentes passam a mostrar alunos diferentes.

**Proposta (não aplicada):** um `platform-students.js` no mesmo padrão de `platform-calendar.js` e `platform-content.js`, e as seis páginas passam a consumi-lo. É seguro, mas toca seis módulos — deixei para depois da sua validação manual.

### A-4 · BAIXO — Títulos inconsistentes

Convivem `Sabatovicz - Annual Plan` (hífen), `Sabatovicz — Finance` (travessão), `Hendriks Nederlands` e `⭐ Teacher Lu - Lesson Generator Pro`. Cosmético.

---

## B. Corrigido nesta auditoria

### B-1 · `verificacao.html` não tinha volta ao Menu
Era a única página da plataforma sem retorno para a Home. Adicionado um link `← Menu`, no mesmo estilo das demais. Uma linha, sem efeito sobre a lógica da página.

---

## C. Verificado e correto

**Links.** Todo `href` e `src` local resolve para um arquivo existente. As três suspeitas apontadas pelo scanner são falsos positivos: `${l.homework.link}` é template literal em `lessons.html`, e as duas de `verificacao.html` são strings de regex.

**Runtime.** As 13 páginas foram carregadas em DOM headless, com os scripts na ordem real. Nenhuma lançou erro. `annual-plan.html` registrou a migração esperada do Learning Progress.

**Funções órfãs.** As 5 suspeitas foram analisadas e todas são chamadas dinamicamente:

| Suspeita | Realidade |
|---|---|
| `renderHangman` e mais 7 em `games.html` | tabela de despacho, `games.html:307` |
| `gSay`, `gWords` em `hendrik.html` | tabela de despacho, `hendrik.html:479` |
| `record`, `audit`, `footprint`… em `speaking-engine.js` | exportadas em `window.SpeakingEngine` |
| `byDate` em `platform-calendar.js` | passada como comparador em `.sort(byDate)` |
| `publishVocabularyCatalogue` em `lessons.html` | IIFE, executa na definição |

**Handlers.** Todo `onclick`/`onchange` inline tem função correspondente. As duas ocorrências de `if()` são o padrão `onclick="if(event.target===this)closeModal()"`.

**Regressão visual.** Todas as classes `lp-*` introduzidas no Learning Progress têm CSS definido em `annual-plan.html` e `schedule.html`. Nenhuma classe usada sem regra.

**Navegação.** 12 de 13 páginas já tinham retorno ao Menu; a 13ª foi corrigida (B-1).

**Um falso alarme investigado a fundo.** O harness acusou `SPEAKING_FOLLOWUP_BANKS is not defined` em `speaking.html`. Rodei a página nas duas versões — com e sem as três linhas que adicionei em `engine/speaking-activities.js` — e ambas passam limpas. O erro era artefato do `eval()` isolado do harness, que não reproduz o escopo compartilhado entre `<script>` do navegador. **Não é regressão.**

---

## D. Para sua validação manual

Alterações do Learning Progress, todas aditivas:

| Arquivo | O que mudou | Como conferir |
|---|---|---|
| `engine/speaking-activities.js` | +3 linhas no fim, expondo `SPEAKING_ACTIVITIES`/`COMPETENCES`/`THEMES` em `window`. Nenhum dado alterado. | Abrir Speaking Lab e rodar uma missão |
| `lessons.html` | +1 `<script src>` e um IIFE no fim que publica o catálogo de vocabulário | Abrir as Conversation Lessons e navegar entre semanas |
| `schedule.html` | +4 `<script src>`, bloco "Contents covered" no modal do dia, `renderLessonProgress()` | Clicar num dia, marcar aula e nota, conferir que o calendário pinta igual |
| `annual-plan.html` | +4 `<script src>`, seção Learning Progress, checklist por conteúdo, migração das semanas | Trocar de aluno, marcar conteúdos, conferir as 52 semanas em "Show" |

**As 52 semanas foram preservadas**, como você pediu — recolhidas sob "52-week themes", como roteiro pedagógico do ano. O Learning Progress registra o que foi de fato ensinado. Cada um tem sua função e nenhum sobrescreve o outro.

---

## E. Sugestão de ordem para as próximas correções

1. **A-1** — chave do calendário por id (com migração). É o único achado que causa perda de dado.
2. **A-3** — `platform-students.js` eliminando a lista repetida seis vezes.
3. **A-2** — decidir o destino do `lesson-generator.html`.
4. **A-4** — padronizar títulos.
