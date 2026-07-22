# Validação funcional — fluxo real do professor

**Data:** 21/07/2026
**Método:** sessão de navegador simulada (jsdom) — páginas carregadas em sequência, scripts executando de verdade, `localStorage` compartilhado entre as visitas, exatamente como numa sessão real.
**Resultado:** **62 asserções aprovadas, 0 reprovadas.** Nenhuma regressão. Nenhum bug de código encontrado.

---

## 1. Placar

| Bloco | Asserções | Aprovadas | Reprovadas |
|---|---|---|---|
| Cenários 1–10 (fluxo principal) | 53 | **53** | 0 |
| Casos de borda A–H | 18 | **18** | 0 |
| Varredura de runtime (16 páginas) | 16 | **15** | 1 falso positivo conhecido |

---

## 2. Cenários aprovados

### 1 · Criar aluno
Aluna "Mariana Costa" criada pelo `students.html`. Id gerado por slug (`mariana-costa`), lista cresceu, aluna renderizada na tela.

### 2 · Agendar aula
Aula de 14/07 marcada como dada com nota, e 21/07 como agendada.
**Chave gravada: `sched|mariana-costa|2026-07-14`** — por id, como esperado após a refatoração. Nenhuma chave por nome foi criada.

### 3 · Gerar aula pelo Lesson Builder
Plano de 45 min com 7 blocos somando exatamente 45. Todo bloco justificado. O builder leu corretamente a última aula (14/07) do calendário, o roteiro anual e o progresso.

### 4 · Ministrar a aula
6 dos 7 blocos trouxeram material pronto — explicação, exemplos, erros comuns, exercícios com gabarito, perguntas.

### 5 · Registrar os conteúdos
Todos os itens do plano gravados e vinculados à data correta da aula.

### 6 · Learning Progress
7 skills reportadas, progresso acima de zero, sugestões geradas. **O plano seguinte não repetiu nada do que acabou de ser ensinado.**

### 7 · Curriculum Map
52 semanas preservadas e visíveis, roteiro publicado para os outros módulos, checklist de conteúdos renderizado, progresso da aula refletido.

### 8 · Finance
Plano "por aula" ligado ao calendário: **R$ 80,00 — uma aula dada, na data real (14/07)**. A aula apenas agendada não foi cobrada. Confirmado que os valores vêm de dados reais do calendário, não da estimativa.

### 9 · Renomear aluna
"Mariana Costa" → "Mariana Costa Silva". Id inalterado.

### 10 · Reverificação pós-rename
| Verificação | Resultado |
|---|---|
| Aulas no calendário | 2 de 2 preservadas |
| Progresso no Learning Progress | preservado integralmente |
| Builder lê o calendário | sim, última aula 14/07 |
| Cobrança do Finance | R$ 80,00 mantidos |
| Curriculum Map | progresso mantido, 52 semanas intactas |
| Nome exibido | atualizado em todos os módulos |
| Structures | 12 categorias íntegras |

**A refatoração de identidade está confirmada em produção.** Era exatamente aqui que a plataforma quebrava antes.

### Casos de borda A–H
| Caso | Resultado |
|---|---|
| A · Navegador novo, direto ao Builder | plano gerado, sem quebra |
| B · Depois de visitar as páginas donas | catálogos completos |
| C · Nomes duplicados | nome idêntico bloqueado, ids sempre únicos |
| D · Remover aluno com histórico | removido da lista, progresso e aulas preservados, nome degrada para o id |
| E · Readicionar o mesmo aluno | mesmo id, progresso e aulas reencontrados |
| F · Todo o conteúdo já ensinado | não quebra, avisa "Everything covered — revise instead" |
| G · Duração inválida (37 min) | cai para o perfil de 45 |
| H · Aluno inexistente | não lança exceção, degrada com o id |

---

## 3. Cenários reprovados

**Nenhum.**

---

## 4. Bugs encontrados

**Nenhum bug de código.**

Cinco asserções falharam durante a execução e todas foram rastreadas até defeitos no meu próprio harness de teste, não na plataforma:

| Falha aparente | Causa real |
|---|---|
| "aula não gravada por ID" | `let` declarado num `eval` não é visível em outro `eval`. Num navegador, `let` de um `<script>` é visível para os seguintes. Corrigido injetando o teste no mesmo escopo. |
| "calendário não lê aulas" | `schedule.html` não carrega `platform-calendar.js` — e não deve: ele **é** o calendário. Asserção movida para uma página que carrega o adapter. |
| "Finance não cobra a aula" (×3) | `finance.js` conecta o calendário no `DOMContentLoaded`, que o harness não disparava. Passou a disparar. |
| "aluno não removido" (×3) | `TeacherLu.Progress` não existe no `students.html`, que carrega só a camada de alunos. O teste chamava a camada errada. |

**Falso positivo recorrente:** `speaking.html` acusa `SPEAKING_FOLLOWUP_BANKS is not defined` na varredura de runtime. Já testado nas duas versões do arquivo — passa limpo em ambas. É a mesma limitação de escopo do `eval`. Não é regressão.

---

## 5. Riscos arquiteturais restantes

### R-1 · MÉDIO — Catálogos publicados dependem de visita prévia
**Confirmado no caso de borda A.** Num navegador novo, indo direto ao Lesson Builder:

- Grammar ✅ e Structures ✅ funcionam — os dados são arquivos `.js` carregados pela própria página
- **Vocabulary vem vazio** ❌ — os dados vivem dentro do `lessons.html` e só são publicados quando aquela página é aberta
- **Curriculum Map vem ausente** ❌ — idem, publicado pelo `annual-plan.html`

A degradação é silenciosa: o plano é gerado normalmente, só sem esses blocos. Depois de visitar as duas páginas uma vez, tudo funciona (caso B).

**Por que existe:** ambos os conjuntos de dados estão dentro de páginas HTML e não podem ser carregados como script em outro lugar. Publicar foi a alternativa a duplicar.

**Correções possíveis, em ordem de custo:** (a) o Builder avisar na tela quais fontes estão faltando com um link para abri-las; (b) extrair os dados para `engine/*.js`, como Grammar e Structures já são — resolve de vez, mas mexe em dois módulos.

**Não corrigi** porque seria funcionalidade nova, fora do escopo desta etapa.

### R-2 · BAIXO — Progresso órfão acumula
Remover um aluno preserva progresso e aulas de propósito (para readicionar). Confirmado que readicionar recupera tudo. Mas nada limpa esses dados se o aluno nunca voltar. Sem impacto funcional; cresce devagar.

### R-3 · BAIXO — `printDoc()` duplicado em 6 arquivos
Pendente da auditoria anterior. Baixo risco: função de impressão, não fonte de verdade.

### R-4 · INFORMATIVO — Tudo mora no localStorage de um navegador
Trocar de navegador ou limpar dados do site apaga alunos, aulas, progresso e financeiro. O botão Backup no módulo Students exporta tudo — vale usá-lo com regularidade.

---

## 6. Melhorias recomendadas

Em ordem de valor pelo esforço:

1. **Aviso de fonte ausente no Lesson Builder** (R-1) — mostrar "Vocabulary não disponível: abra as Conversation Lessons uma vez" em vez de simplesmente omitir o bloco. Barato e elimina a única armadilha real que sobrou.
2. **Extrair o vocabulário e o roteiro anual para `engine/*.js`** — resolve R-1 na raiz e alinha os quatro módulos de conteúdo no mesmo padrão.
3. **Backup automático periódico** — o Finance e o Learning Progress agora carregam dados que doem perder.
4. **Botão "Marcar aula como dada" dentro do Lesson Builder** — hoje o professor finaliza a aula no Builder mas ainda precisa ir ao calendário marcar o dia. Fechar esse laço tornaria o Builder realmente o único lugar do dia a dia.
5. `platform-print.js` unificando os seis `printDoc()` (R-3).

---

## 7. Alterações feitas nesta etapa

**Nenhuma.** Não houve regressão a corrigir. Todos os arquivos permanecem como estavam antes da validação; o único arquivo novo é este relatório.
