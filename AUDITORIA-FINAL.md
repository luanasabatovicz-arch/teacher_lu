# Auditoria Final — Revisão de arquiteto sênior

**Data:** 21/07/2026
**Objetivo:** revisão antes da entrada em manutenção evolutiva. Só problemas reais — nada de estética, nada de "seria legal ter".
**Veredito:** nenhum problema **Crítico** ou **Alto**. Quatro achados de severidade **Média/Baixa**, todos confirmados por reprodução, nenhum bloqueante.

> **Status de correção (encerramento da estabilização):**
> **F-1 ✅ RESOLVIDO** · **F-2 ✅ RESOLVIDO** · F-3 e F-4 mantidos por decisão (ver seção 4).
> Suíte completa verde após as correções, incluindo os testes dedicados `f1` e `f2`.

---

## Verificações que passaram limpas

Antes dos achados, o que **não** é problema (verificado, não presumido):

| Verificação | Resultado |
|---|---|
| Dependências circulares entre camadas | **Nenhuma.** Grafo é DAG: Students/Content/Calendar isolados; Progress→Content; LessonBuilder→todos |
| `topicOf` — chave do catálogo bate com o objeto | **100%** — 18 grammar, 12 structures, 20 speaking, 0 órfãos |
| Timers vazando (`setInterval`) | grammar-engine `clockTimer` se auto-limpa (clearInterval antes de recriar + guarda de DOM ausente). Sem vazamento |
| Referências quebradas (função chamada sem definição) | Nenhuma nas 16 páginas |
| Registro de providers | Tolerante à ordem (4 permutações testadas) |
| Migração de identidade por id | Íntegra; readicionar recupera histórico |
| APIs públicas (`student` como id/objeto/nome) | Consistentes: Calendar resolve os três, Progress/Builder usam id |
| Suíte completa (9 suítes + 16 páginas runtime) | Verde (1 falso positivo conhecido em speaking.html) |

---

## Achados

### F-1 · MÉDIO — ✅ RESOLVIDO — Builder grava progresso sob `today()`, não sob a data da aula no calendário

**Motivo.** A plataforma integra Calendar e Learning Progress **por data**. Mas os dois pontos de entrada gravam datas diferentes para a mesma aula:
- `schedule.html` marca a aula na data que a professora clica
- `builder.html → finishLesson → recordLesson(plan)` grava sempre sob `today()` — não há como informar outra data

**Impacto.** O warm-up do Builder recicla "o que foi dado na última aula" lendo `Calendar.lastLesson`. Se a professora montar a aula num dia diferente do que marcou no calendário, o progresso fica sob uma data e a aula sob outra — o warm-up não encontra o conteúdo recém-dado. Não há perda de dado; é inconsistência na integração que é o núcleo da plataforma.

**Como reproduzir.**
```
1. Marcar aula da Isa no calendário em 14/07
2. Abrir o Builder noutro dia, montar e clicar "Finish & record"
3. Progress.ofLesson('isa','14/07') → 0 itens
   Progress.ofLesson('isa', hoje)   → 4 itens   ← divergiram
```
Confirmado no teste automatizado.

**Correção sugerida.** Dar ao Builder ciência da data: ou um seletor de data na tela, ou `recordLesson(plan, dataDaProximaAulaAgendada)` lendo do calendário. No fluxo normal "montei e dei hoje, marquei hoje", as datas coincidem — por isso é Médio, não Alto.

**✅ Correção aplicada.** Sem interface nova, sem seletor. O motor infere a data do próprio calendário via `LessonBuilder.resolveLessonDate(studentId)`, com precedência:
1. aula marcada **hoje** (agendada ou dada) → hoje;
2. próxima aula **agendada** (hoje ou futura, a mais próxima) → aquela data;
3. sem aula no calendário → `today()` (comportamento anterior, intacto).
A data resolvida é exposta em `plan.lessonDate` e usada por `recordLesson`. `builder.html` já chamava `recordLesson(plan)` sem data, então adotou a data inferida automaticamente — zero mudança de UI. O valor nunca é inventado: é sempre hoje ou uma data que a professora já pôs no calendário.
**Arquivo modificado:** `platform-lesson-builder.js`.
**Verificação:** suíte `f1` — Calendar, Builder e Progress convergem para a mesma data nos 4 cenários (agendada hoje, agendada no futuro, sem aula = fallback, aula antiga ignorada).

---

### F-2 · BAIXO — ✅ RESOLVIDO — Escrita que falha (quota cheia) é reportada como sucesso

**Motivo.** `write()` (progress) e `Store.write()` (finance) retornam `false` e logam no console quando o `localStorage` estoura, mas os chamadores **ignoram o retorno**:
- `builder.finishLesson` → mostra toast "N conteúdos gravados" independentemente
- `finance` `saveIncome/saveBilling/saveExpenses` → seguem como se tivessem salvo
- `students.saveStudent` → idem

**Impacto.** Numa base cheia, a professora vê confirmação de que salvou, mas o dado não persistiu. Risco de perda silenciosa. Probabilidade baixa (o volume de dados é pequeno perto dos 5–10 MB do localStorage), mas o padrão é sistêmico.

**Como reproduzir.**
```
localStorage cheio → Progress.record(...) retorna false
                   → builder mostra "gravado" mesmo assim
```
Confirmado.

**Correção sugerida.** Os chamadores checarem o retorno e, se `false`, avisar em vez de confirmar. É uma linha por ponto de escrita.

**✅ Correção aplicada.** Todo ponto de escrita passou a propagar o resultado, e toda confirmação de sucesso passou a depender dele:
- **Progress** — `toggle` agora retorna `{on, ok}` (mantém o `on` que os chamadores já usavam; acrescenta `ok`); `addCustomItem` retorna `null` quando a gravação falha; `record/unrecord/reset` já retornavam o booleano.
- **Finance** — `saveBilling/saveIncome/saveExpenses` propagam o retorno; o `alert` foi removido de dentro de `Store.write` para não duplicar mensagem, e os **7** pontos de UI (quickPay, billing save/remove, income save/remove, expense save/remove) só confirmam após checar.
- **Students** — o wrapper `saveStudents` propaga o retorno; `saveStudent` e `removeStudent` avisam e **revertem o estado em memória** ao salvo, para a tela não divergir do disco.
- **Builder / Structures / Annual Plan / Schedule** — os chamadores de `recordLesson`/`toggle`/`addCustomItem` checam o retorno e, na falha, mostram *"Could not save — the browser storage may be full."* em vez de confirmar sucesso.
Único ponto deixado sem checagem: a migração de dados no load do Finance (não faz alegação de sucesso ao usuário).
**Arquivos modificados:** `platform-progress.js`, `finance.js`, `students.html`, `builder.html`, `structures.html`, `annual-plan.html`, `schedule.html`.
**Verificação:** suíte `f2` — com quota cheia, os 7 pontos de escrita retornam falha; com escrita normal, todos retornam sucesso.

---

### F-3 · BAIXO — Reuso de id ao remover e readicionar herda dados do anterior

**Motivo.** O id vem do slug do nome. Remover "Ana" (id `ana`) e cadastrar outra pessoa também chamada "Ana" gera o mesmo id — e o novo aluno herda progresso, fila de erros, cobrança financeira e calendário do anterior, porque tudo é chaveado por id e nada é apagado na remoção.

**Impacto.** É **intencional** para o caso "removi e readicionei a mesma pessoa" (recupera o histórico). Vira risco só para um homônimo genuíno. Uma "Ana" nova poderia aparecer já com cobrança de R$ 500 e progresso que não é dela.

**Como reproduzir.**
```
Ana (progresso + billing R$500) → remover → cadastrar outra "Ana"
nova Ana herda progresso e a cobrança de R$ 500
```
Confirmado.

**Correção sugerida (não implementada).** Ao detectar id reusado com dados órfãos, perguntar "É a mesma pessoa de antes?" antes de reaproveitar. Baixo porque depende de homônimo exato + remoção prévia.

---

### F-4 · BAIXO — Fila de revisão (`errq|`) cresce sem limite

**Motivo.** Cada ✗ marcado durante a aula anexa em `errq|<id>`. A fila só encolhe por resolução manual ou "Clear all". Não há teto nem poda automática.

**Impacto.** Em uso prolongado (anos), a fila de um aluno pode acumular centenas de itens não resolvidos. Sem impacto funcional imediato; degrada a usabilidade da lista muito antes de ser um problema de storage.

**Como reproduzir.** Marcar erros por muitas aulas sem nunca resolver — a lista cresce monotonicamente.

**Correção sugerida (não implementada).** Nenhuma ação necessária agora; se um dia incomodar, limitar a exibição aos N mais recentes. Registro só para constar.

---

## O que deliberadamente NÃO reportei

Seguindo as regras (ignorar estética e otimização sem ganho real):

- **Custo de `Content.items()` recalcular o catálogo a cada chamada.** Em `annual-plan` uma renderização reconstrói o catálogo ~20 vezes. Em números absolutos são 63 itens e algumas dezenas de chaves — milissegundos. Otimizar não traz ganho perceptível nesta escala. **Não é dívida.**
- **`printDoc`, `shuffle`, `pickStu` duplicados triviais** — já avaliados na limpeza anterior; centralizar acopla sem reduzir risco.
- **`finance.html` só escuta mudança de `sabatovicz_students` entre abas**, não das chaves financeiras. Editar receita numa aba não atualiza outra aberta. É limitação conhecida de apps localStorage-only, não bug; recarregar resolve.

---

## Conclusão

Os quatro achados são reais mas de baixa consequência: um toca a consistência da integração Calendar↔Progress (F-1, Médio), os outros três são bordas de baixa probabilidade. **Nenhum causa crash, corrupção ou perda de dados no fluxo normal de uso.** A arquitetura em camadas (Students → Content → Progress/Calendar → LessonBuilder) é um DAG limpo, sem ciclos, com fronteiras bem definidas e APIs consistentes.

**A plataforma está arquiteturalmente consistente e pronta para entrar em fase de evolução funcional.**

**Encerramento da estabilização (21/07/2026):** F-1 e F-2 foram corrigidos e verificados por suíte dedicada — sem interface nova, sem refatoração estrutural, sem mudança de comportamento pedagógico. F-3 (reuso de id ao readicionar) e F-4 (fila de erros sem poda) permanecem **por decisão consciente**: o reuso de id é o comportamento desejado numa plataforma de uso pessoal, e a fila de erros só precisará de limite de exibição — não de poda — se algum dia crescer demais. Não recomendo nenhuma refatoração estrutural neste momento.
