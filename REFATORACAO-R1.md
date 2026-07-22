# Refatoração R-1 — independência entre páginas

**Data:** 21/07/2026
**Objetivo:** qualquer página abre num navegador novo e funciona por inteiro, sem depender de outra ter sido aberta antes.
**Resultado:** princípio cumprido e verificado. **18/18 no teste de navegador virgem.** Nenhuma funcionalidade nova, nenhuma mudança de interface ou de fluxo pedagógico.

---

## 1. O problema

Dois conjuntos de dados viviam dentro de páginas HTML e só ficavam disponíveis quando a professora abria aquelas páginas:

| Dado | Vivia em | Como era distribuído |
|---|---|---|
| 13 semanas de Conversation Lessons | `lessons.html` (`const lessons`) | publicado em localStorage ao abrir a página |
| 52 semanas do roteiro anual + 4 etapas | `annual-plan.html` (`curriculum`, `STAGES`) | idem |

**Consequência medida antes da refatoração:** num navegador novo, abrindo o Lesson Builder direto, Grammar e Structures funcionavam, mas **Vocabulary vinha vazio e o roteiro anual ausente** — sem aviso.

---

## 2. O que foi feito

### Dois módulos de dados novos

Mesmo padrão de `grammar-topics.js` e `structures-content.js`: só dados, expostos em `window`, auto-registro no Learning Progress.

| Arquivo | Conteúdo | Verificação |
|---|---|---|
| `engine/conversation-lessons.js` | `window.CONV_LESSONS` — 13 semanas, 119 palavras | todos os campos preservados |
| `engine/curriculum-map.js` | `window.CURRICULUM_WEEKS` (52) e `window.CURRICULUM_STAGES` (4) | íntegros |

### As páginas donas viraram consumidoras

Nenhuma outra linha dessas páginas mudou — o alias preserva o identificador que o resto do código usa:

```js
// lessons.html
const lessons = window.CONV_LESSONS;

// annual-plan.html
const curriculum = window.CURRICULUM_WEEKS;
const STAGES     = window.CURRICULUM_STAGES;
```

A publicação por localStorage foi removida: virou desnecessária.

### O Lesson Builder lê o módulo

```js
curriculum: function () {
  if (global.CURRICULUM_WEEKS && global.CURRICULUM_WEEKS.length) { ... }  // preferido
  return safe(... localStorage ...);                                       // fallback
}
```

O fallback permanece para instalações que ainda tenham a publicação antiga gravada — retrocompatibilidade sem custo.

---

## 3. Bug encontrado durante a refatoração

**O teste de navegador virgem revelou um problema que já existia e passava despercebido.**

Ao abrir o Lesson Calendar num navegador novo, o catálogo trazia **51 itens em vez de 63** — as 12 lições de Language Structures sumiam.

**Causa:** `structures-content.js` carregava *antes* de `platform-content.js` naquela página. O arquivo tentava se registrar num registro que ainda não existia e **desistia em silêncio**:

```js
if(!(window.TeacherLu && window.TeacherLu.Content)) return;   // falha muda
```

Não era um bug desta refatoração — estava lá desde que Structures foi criado, escondido porque os testes anteriores carregavam os arquivos na ordem certa.

**Correção — a ordem dos `<script>` deixou de importar:**

```js
// nos arquivos de conteúdo
if (NS.Content) NS.Content.register(provider);
else (NS.__pendingProviders = NS.__pendingProviders || []).push(provider);

// em platform-content.js, ao carregar
if (Array.isArray(NS.__pendingProviders)) {
  NS.__pendingProviders.forEach(function (p) { Content.register(p); });
}
```

Verificado nas **4 permutações possíveis** de carregamento: sempre 13 vocabulário + 12 structures.

---

## 4. Dados que ainda vivem em HTML — e por que ficaram

| Página | Bloco | Linhas | Consumido por outra página? |
|---|---|---|---|
| `grammar.html` | `tenses` | 303 | **Não** — é o renderizador legado; o Learning Progress usa `ENGINE_TOPICS` |
| `hendrik.html` | `LESSONS` | 50 | **Não** — módulo de holandês, fora do Learning Progress |
| `placement-test.html` | `QUESTIONS` | 31 | **Não** — teste autocontido |

Confirmei por busca cruzada que nenhum é lido por outra página. **Dado dentro de HTML só é dívida quando outra página precisa dele** — extrair estes três seria mexer em código sem ganho, e a instrução era não fazer trabalho desnecessário.

---

## 5. Suíte de testes — resultado

| Suíte | Resultado |
|---|---|
| Fluxo real do professor (10 cenários) | **53/53** |
| **Navegador virgem (o princípio)** | **18/18** |
| Ordem de scripts (4 permutações) | **4/4** |
| Motor do Lesson Builder | ✅ |
| Language Structures (12 lições, 8 seções) | ✅ |
| Learning Progress | ✅ |
| Migração de identidade por id | ✅ |
| Finance × Calendar | ✅ |
| Remover e readicionar aluno | ✅ |
| Runtime das 16 páginas | 15/16 (1 falso positivo conhecido) |

### Navegador virgem, página por página

```
Lesson Builder    ✓ Vocabulary  ✓ Grammar  ✓ Structures  ✓ Speaking
                  ✓ roteiro anual  ✓ 52 semanas  ✓ plano completo
Curriculum Map    ✓ 52 semanas  ✓ 4 etapas  ✓ vocabulário no checklist
Lesson Calendar   ✓ catálogo completo (63 itens)
Conversation      ✓ 13 semanas  ✓ conteúdo íntegro
```

### Duas suítes acusaram falha — ambas eram testes desatualizados

| Falha | Causa |
|---|---|
| "as 6 skills existem" | A suíte foi escrita antes de Structures virar a 7ª skill. Expectativa corrigida. |
| Cenário 7 inteiro | O teste lia o roteiro do localStorage, que deixou de ser gravado. Passou a ler do módulo. |

Nenhuma das duas era regressão de código.

**Falso positivo conhecido:** `speaking.html` acusa `SPEAKING_FOLLOWUP_BANKS is not defined` na varredura. Testado nas duas versões do arquivo — passa limpo em ambas. É limitação do `eval()` isolado do harness, que não reproduz o escopo compartilhado entre `<script>` do navegador.

---

## 6. Um deslize meu, corrigido

Ao reescrever o registro de vocabulário, troquei o travessão do título por dois hífens (`Week 1 -- I Am` em vez de `Week 1 — I Am`). Isso mudaria o **id** do conteúdo e desconectaria o progresso já gravado. Detectado na conferência e revertido antes de qualquer teste rodar. Título atual confirmado: `Week 1 — I Am`.

---

## 7. Arquivos alterados

**Criados**
- `engine/conversation-lessons.js`
- `engine/curriculum-map.js`

**Modificados**
- `lessons.html` — array → alias; publicação removida; carrega o módulo
- `annual-plan.html` — `curriculum`/`STAGES` → alias; publicação removida; carrega o módulo
- `platform-lesson-builder.js` — lê o módulo, localStorage como fallback
- `platform-content.js` — drena registros pendentes
- `engine/structures-content.js` — registro tolerante à ordem
- `builder.html`, `schedule.html` — carregam os dois módulos novos

**Não alterados:** interface, CSS, fluxo pedagógico, conteúdo das lições, as 52 semanas, nenhum comportamento observável.
