# Auditoria de dívida técnica — código morto e redundância

**Data:** 21/07/2026
**Escopo:** só remoção de redundância. Nenhuma funcionalidade nova, nenhuma mudança de comportamento.
**Resultado:** 4 remoções seguras aplicadas, comportamento preservado byte a byte, suíte completa verde.

---

## 1. O que foi removido

| # | Achado | Ação | Verificação |
|---|---|---|---|
| A | `printDoc()` idêntica em 6 páginas (3 variantes de CSS) | Unificada em `platform-print.js` | **saída byte a byte idêntica** nas 6 |
| B | `schedule.html` carregava `engine/curriculum-map.js` sem usar | `<script>` removido | schedule não referencia `CURRICULUM_*` |
| C | `.btn.purple` e `.btn.pink` em `finance.css`, sem uso | Removidas | ausentes em `finance.html` e `finance.js` |
| D | `Content.publish()` sem nenhum chamador | Removida | `published()` (leitura) preservado |

### A · A unificação de `printDoc`

As 6 páginas tinham a mesma função copiada, diferindo apenas no `<style>`:

- **Padrão** — annual-plan, exercise-generator, grammar, lessons
- **Compacto** (tabelas menores) — placement-test
- **Calendário** (borda roxa) — schedule

Agora existe uma função em `platform-print.js` e cada página passa seu CSS:

```js
function printDoc(html,title){ TeacherLu.printDoc(html, title); }                        // padrão
function printDoc(html,title){ TeacherLu.printDoc(html, title, TeacherLu.PRINT_CSS.COMPACT); }
function printDoc(html,title){ TeacherLu.printDoc(html, title, TeacherLu.PRINT_CSS.CALENDAR); }
```

**Prova de equivalência:** capturei o HTML exato que cada `printDoc` gera, antes e depois. Comparação caractere a caractere: **as 6 saídas são idênticas** (455/455/455/455/470/524 chars).

`hendrik.html` tem `printDoc` próprio (módulo de holandês, corpo diferente) — **deixado intacto de propósito**.

---

## 2. Um bug que a verificação byte a byte pegou

A primeira versão de `platform-print.js` **omitia o `</title>`** — a saída ficava `<title>Xyz<style>` em vez de `<title>Xyz</title><style>`. Os navegadores toleram, mas não é o mesmo HTML.

A comparação caractere a caractere acusou a divergência exata (char 68) nas 6 páginas. Corrigido e reconfirmado idêntico. **Sem a comparação, teria passado como "funciona".**

---

## 3. Achados que investiguei e decidi NÃO remover

Nem toda duplicação é dívida. Estes foram deixados de propósito:

| Achado | Por que ficou |
|---|---|
| `pickStu()`, `stuName()` iguais em grammar/lessons | Locais, ~4 linhas. Centralizar acopla duas páginas por ganho quase nulo |
| `shuffle()` em exercise-generator e hendrik | Idem — utilitário trivial |
| Métodos "não chamados" nas camadas (`Progress.history`, `Calendar.summary`, `Content.all`…) | **API pública deliberada.** São os pontos de extensão que um módulo futuro usará. Remover hoje obrigaria a reescrever amanhã — o oposto de reduzir dívida |
| `lesson-generator.html`, `verificacao.html` fora da navegação | Decisão de produto sua, não redundância. Funcionam; só não têm card |
| `tenses`, `LESSONS`, `QUESTIONS` dentro de HTML | Já auditado em R-1: cada um é consumido só pela própria página |
| Chave `gev1|` | Viva — escrita pelo `grammar-engine.js`, lida pelo `speaking.html` |
| CSS "órfão" em structures/builder | Falso positivo: as classes são montadas em JS (`t-${id}`, `classList.add`) |

O princípio: **duplicação só é dívida quando divergir causa bug.** `printDoc` era — seis cópias que poderiam desandar. Um `shuffle` de 3 linhas não é.

---

## 4. Chaves de `localStorage` — todas vivas

Auditei as 14 chaves. Nenhuma órfã:

```
sabatovicz_students            sabatovicz_progress_<id>       sched|<id>|<data>
sabatovicz_finance_billing     sabatovicz_custom_content      errq|<id>
sabatovicz_finance_income      sabatovicz_lp_migrated         gev1|<id>
sabatovicz_finance_expenses    sabatovicz_sched_id_migrated   sabatovicz_current_student
sabatovicz_catalog_*           sabatovicz_curriculum_map (fallback do Builder)
```

`sabatovicz_catalog_*` e `sabatovicz_curriculum_map` não são mais **escritas** (o conteúdo virou `engine/*.js` em R-1), mas continuam sendo **lidas** como fallback retrocompatível para instalações que já as tenham. Remover a leitura quebraria navegadores com dados antigos — mantidas.

---

## 5. Listeners duplicados

**Nenhum.** A varredura de `addEventListener` repetido no mesmo evento/página não encontrou ocorrências.

---

## 6. Suíte de testes — depois da limpeza

| Suíte | Resultado |
|---|---|
| `printDoc` byte a byte (6 páginas) | **6/6 idênticas** |
| Fluxo real (10 cenários) | ✅ |
| Navegador virgem | ✅ |
| Motor do Lesson Builder | ✅ |
| Language Structures | ✅ |
| Learning Progress | ✅ |
| Migração de identidade | ✅ |
| Finance × Calendar | ✅ |
| Remover/readicionar aluno | ✅ |
| Ordem de scripts (4 permutações) | ✅ |
| Runtime das 16 páginas | 15/16 (falso positivo conhecido) |

**Duas suítes precisaram de ajuste** — usavam `Content.publish()` para semear dados de teste. Como a função foi removida (ninguém a chamava em produção), reescrevi os testes para carregar o `engine/conversation-lessons.js` real. Ficaram mais fiéis: agora testam com as 13 semanas verdadeiras, não com 2 falsas.

---

## 7. Arquivos alterados

**Criado**
- `platform-print.js` — 35 linhas, substitui 6 cópias de ~19 linhas

**Modificados**
- `annual-plan.html`, `exercise-generator.html`, `grammar.html`, `lessons.html`, `placement-test.html`, `schedule.html` — `printDoc` delegado; carregam `platform-print.js`
- `schedule.html` — include morto removido
- `finance.css` — 2 classes sem uso removidas
- `platform-content.js` — `publish()` removido; documentação atualizada

**Saldo:** o corpo de `printDoc` deixou de existir em 6 lugares e passou a existir em 1. Nenhum comportamento observável mudou.

---

## 8. O falso positivo de sempre

`speaking.html` acusa `SPEAKING_FOLLOWUP_BANKS is not defined` na varredura de runtime. Testado nas duas versões do arquivo — passa limpo. É limitação do `eval()` isolado do harness, que não reproduz o escopo compartilhado entre `<script>` do navegador. Não é regressão.
