# Diagnóstico da Plataforma Sabatovicz
**Data:** 15/07/2026 · **Escopo:** análise completa, sem implementação
**Premissa central:** aulas online 1:1 com tela compartilhada — a professora controla tudo, o aluno só observa e responde oralmente.

---

## 1. Estrutura atual

### 1.1 Páginas (11 arquivos HTML, ~4.660 linhas)

| Página | Linhas | Função | Estado |
|---|---|---|---|
| index.html | 157 | Menu principal (9 cards) | OK |
| students.html | 197 | Cadastro de alunos (emoji, nome, nível, idade) | OK — fonte de dados dos alunos |
| annual-plan.html | 511 | Plano anual de 52 semanas por aluno, progresso | OK — lê o cadastro |
| schedule.html | 315 | Calendário de aulas por aluno (feita/agendada/cancelada + nota) | OK — lê o cadastro |
| placement-test.html | 188 | Teste de nivelamento 30 questões (A1–B2) | OK — modo aula ao vivo |
| lessons.html | 764 | 13 aulas de conversação (semanas 1–13) com role-plays | OK — modo aula ao vivo |
| grammar.html | 522 | 18 pontos gramaticais com prática e "show answer" | OK — modo aula ao vivo |
| exercise-generator.html | 710 | Banco de exercícios (14 temas, 4 tipos) com placar | OK — modo aula ao vivo |
| games.html | 299 | 8 jogos de aula | OK — modo aula ao vivo |
| hendrik.html | 638 | Módulo de holandês para o Hendrik (7 anos), XP e estrelas | OK — 100% em holandês |
| **lesson-generator.html** | 358 | Gerador de plano de aula antigo ("Lesson Generator Pro") | **Órfão — nenhuma página linka para ele** |

### 1.2 Componentes (todos duplicados dentro de cada página — não há arquivos compartilhados)

| Componente | Onde aparece | Situação |
|---|---|---|
| Barra superior + botão "← Menu" | 10 páginas | 2 variantes visuais (Tailwind vs CSS próprio) |
| `printDoc()` — exportar PDF via janela de impressão | 6 páginas | 6 cópias idênticas |
| `speak()` — áudio (TTS en-US / nl-NL) | 4 páginas | 4 cópias quase idênticas |
| Cadastro de alunos (`loadStudents` + lista padrão) | 3 páginas (students, annual-plan, schedule) | 3 cópias — risco de dessincronizar |
| Bloco CSS "LIGHT VIVID THEME (Sabatovicz)" | 4 páginas | ~60 linhas repetidas em cada uma |
| Fontes Poppins + Inter (Google Fonts) | 10 páginas | OK, identidade consistente |

### 1.3 Prompts
O único "prompt" do projeto vive fora do código: a skill **esl-grammar-lesson** (framework de 17 seções) instalada no Claude. O lesson-generator.html tem um template interno de plano de aula que ficou obsoleto em relação a essa skill.

### 1.4 Fluxo entre as páginas

```
index.html (menu)
 ├─ placement-test ──→ define o nível → (manual) cadastrar nível em students
 ├─ students ⇄ annual-plan ⇄ schedule   (integrados via cadastro de alunos)
 ├─ lessons (semanas 1–13)  ─┐
 ├─ grammar (18 tópicos)     ├─ conteúdo de aula — SEM ligação com o plano anual
 ├─ exercise-generator       ┘
 ├─ games
 └─ hendrik (módulo isolado, aluno próprio fora do cadastro)

lesson-generator.html → inacessível (sem link)
```

### 1.5 Dados (tudo em localStorage do navegador)

| Chave | Usada por | Formato |
|---|---|---|
| `sabatovicz_students` | students, annual-plan, schedule | lista de alunos |
| `{id}-week{n}` | annual-plan | progresso por **id** do aluno |
| `sched\|{Nome}\|{data}` | schedule | aulas por **nome** do aluno |
| `hendrik` | hendrik | XP, estrelas, progresso |

---

## 2. Problemas encontrados

**P1 — Dados frágeis (risco real de perda).** Tudo vive no localStorage de UM navegador. Trocar de computador, limpar o cache ou usar janela anônima = perder todo o progresso, calendário e cadastro. Não existe exportar/importar backup.

**P2 — Inconsistência de chave: id vs nome.** O plano anual grava progresso pelo `id` do aluno; o calendário grava pelo `nome`. Renomear um aluno no cadastro preserva o plano anual mas **quebra o histórico do calendário**.

**P3 — Cadastro de alunos triplicado.** A lista padrão de alunos está copiada em 3 arquivos. Qualquer mudança na lógica exige editar os 3 — foi exatamente assim que a Ieda ficou "presa" no sistema antes.

**P4 — Código morto.** (a) lesson-generator.html: 358 linhas inacessíveis, design antigo (dark), substituído pela skill de aulas. (b) Biblioteca html2pdf carregada em 5 páginas mas **nunca usada** (a exportação real usa `printDoc`/window.print). (c) Tema dark antigo ainda presente em 4 páginas, "coberto" pelo tema claro com dezenas de `!important` — dois CSS empilhados.

**P5 — Conteúdo desconectado do plano.** O plano anual tem 52 semanas, mas lessons.html cobre só as semanas 1–13, e grammar/exercises não sabem que semana o aluno está. Na aula, a professora precisa navegar manualmente e lembrar de cabeça o que corresponde a quê.

**P6 — Sem "aluno atual" global.** Cada página começa do zero: selecionar a Isa no plano anual não a seleciona no calendário nem filtra exercícios pelo nível dela.

**P7 — Hendrik fora do sistema.** Ele não está no cadastro de alunos, então não aparece no calendário nem no plano — o controle de aulas dele é só mental.

**P8 — Duas bases visuais.** 5 páginas usam Tailwind via CDN (dependência externa, carregamento mais lento) e 6 usam CSS próprio. O visual final é consistente, mas o código por trás é dobrado.

---

## 3. Melhorias sugeridas (proposta de arquitetura — nada implementado)

### Nova estrutura de arquivos
```
teacher_lu/
├── index.html
├── students.html · annual-plan.html · schedule.html · placement-test.html
├── lessons.html · grammar.html · exercises.html · games.html · hendrik.html
└── assets/
    ├── theme.css      ← tema Sabatovicz único (visual atual, sem mudanças)
    ├── core.js        ← printDoc, speak, topbar, goHome
    ├── students.js    ← cadastro único + aluno atual + backup
    └── curriculum.js  ← as 52 semanas como fonte única
```

### Melhorias, prioridade e impacto

| # | Melhoria | Prioridade | Esforço | Impacto esperado |
|---|---|---|---|---|
| M1 | **Backup dos dados**: botões "Exportar/Importar tudo" (JSON) no students.html | 🔴 P0 | Baixo | Elimina o risco de perder anos de registros; permite trocar de computador |
| M2 | **Unificar chave por `id`** no calendário (com migração automática dos dados atuais) | 🔴 P0 | Baixo | Renomear aluno deixa de quebrar histórico |
| M3 | **students.js único** substituindo as 3 cópias | 🔴 P1 | Baixo | Uma fonte de verdade; futuras mudanças em 1 lugar só |
| M4 | **Remover código morto**: lesson-generator.html, html2pdf, CSS dark sobreposto | 🟠 P1 | Baixo | −~15% de código, páginas mais rápidas, manutenção mais simples |
| M5 | **Aluno atual global**: selecionar o aluno uma vez (no topo de qualquer página) e todas as abas seguem | 🟠 P2 | Médio | Fluxo de aula sem repetição; sensação "premium" de sistema integrado |
| M6 | **curriculum.js compartilhado + links por semana**: no plano anual, "Week 5" ganha botões → aula, gramática e exercícios daquela semana | 🟠 P2 | Médio | O plano vira o painel de controle da aula: 1 clique da semana ao conteúdo |
| M7 | **core.js + theme.css** (extrair printDoc, speak, topbar, tema) | 🟡 P3 | Médio | Manutenção única; identidade visual garantida em páginas novas |
| M8 | **Hendrik no cadastro** (marcado como "holandês") para aparecer no calendário | 🟡 P3 | Baixo | Controle de todas as aulas num lugar só |
| M9 | **Remover Tailwind CDN** substituindo pelas classes já existentes no theme.css | 🟢 P4 | Alto | Carregamento mais rápido, zero dependência externa; visual idêntico |
| M10 | **Completar lessons 14–52** gradualmente via skill esl-grammar-lesson | 🟢 P4 | Contínuo | Cobertura total do plano anual |

### Ordem de execução recomendada
1. **Fase 1 (segurança de dados):** M1 → M2 → M3 — pouco código, protege tudo que já existe.
2. **Fase 2 (limpeza):** M4 — remove peso morto antes de construir por cima.
3. **Fase 3 (experiência premium):** M5 → M6 — é aqui que a plataforma vira "sistema de aula", não um conjunto de páginas.
4. **Fase 4 (base técnica):** M7 → M8 → M9 → M10 — consolidação contínua.

### O que NÃO muda
Design e identidade visual (gradientes roxo/rosa/âmbar, Poppins/Inter, cards), o modelo "aluno fala, professora clica" já aplicado em todas as atividades, e nenhuma biblioteca nova é necessária — a refatoração **remove** dependências (html2pdf, Tailwind CDN) em vez de adicionar.

---

*Relatório de diagnóstico — nenhuma alteração de código foi feita.*
