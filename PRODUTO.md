# Visão de Produto — Sabatovicz como Assistente de Aula
**Perspectiva:** Product Design para EdTech · aula online 1:1 · professora controla a tela, aluno só fala
**Complementa o DIAGNOSTICO.md (técnico). Aqui é só produto.**

---

## 1. O fluxo faz sentido para quem tem 2 minutos de preparação?

Não. A plataforma hoje é organizada **por tipo de ferramenta** (aulas, gramática, exercícios, jogos), mas a professora pensa **por aluno e por aula** ("aula da Isa às 15h"). Para preparar, ela precisa fazer a montagem mental sozinha: lembrar em que semana a Isa está → abrir o plano anual para conferir → deduzir qual aula, qual ponto de gramática e qual tema de exercício correspondem àquela semana → abrir cada um em sequência durante a aula. O sistema tem todas as peças, mas quem monta o quebra-cabeça é a professora — e isso não cabe em 2 minutos.

**O teste do produto:** a pergunta que a plataforma deveria responder com 1 clique é *"o que eu dou hoje para a Isa?"*. Hoje ela não responde.

## 2. Etapas com cliques desnecessários

- **Selecionar o aluno de novo em cada página** (plano anual, calendário — e mentalmente nas demais). O aluno deveria ser escolhido uma vez.
- **Voltar ao menu entre cada módulo** durante a aula (lessons → menu → grammar → menu → exercises). Cada volta ao menu é um "corte" na aula com a tela compartilhada.
- **Registrar a aula em dois lugares**: marcar a semana no plano anual **e** marcar "done" no calendário **e** escrever a nota. São três registros do mesmo fato.
- **Procurar o conteúdo da semana manualmente** dentro de lessons/grammar/exercises (listas longas, sem filtro pela semana do aluno).
- **Transferir o resultado do placement test para o cadastro** na mão.

## 3. Como reduzir a navegação entre páginas

Trocar o modelo "site com abas" pelo modelo **"player de aula"**: uma única tela de condução onde os blocos da aula (warm-up → conteúdo → prática → jogo → fechamento) aparecem em sequência, com um botão **Next** — como slides. A professora navega com um dedo; o aluno vê uma progressão contínua, sem menu aparecendo no meio da tela compartilhada. As páginas atuais viram **blocos** dentro do player, não destinos.

## 4. O que pode ser automatizado

| Hoje (manual) | Automatizável |
|---|---|
| Lembrar a semana de cada aluno | O sistema sabe: próxima semana não concluída |
| Montar a sequência da aula | Agenda auto-montada: revisão + conteúdo da semana + prática + jogo |
| Marcar semana + calendário + nota | **Um** botão "Encerrar aula" grava os três de uma vez |
| Lembrar o que o aluno errou | Erros marcados com ✗ viram a revisão do próximo warm-up (repetição espaçada) |
| Nivelar aluno novo | Placement test grava o nível direto no cadastro |
| Dever de casa | PDF gerado no fim da aula com o que foi visto + erros do dia |
| Controlar o tempo | Timer discreto por bloco (5 min warm-up, 15 min prática...) |

## 5. Módulos que deveriam ser unidos

- **Lessons + Grammar + Exercises + Games → "Aula"** (um só player). São os estágios de uma mesma aula (apresentação → prática → produção), não quatro produtos.
- **Plano anual + Calendário → "Aluno"**. São duas visões do mesmo fato ("dei a aula X no dia Y"). Um registro, duas visualizações.
- **Placement test → onboarding do cadastro**. É o primeiro passo de criar um aluno, não uma ferramenta avulsa.
- **Hendrik → mesmo player, pacote de conteúdo "Nederlands"**. O motor é igual; só muda o idioma e a estética kids.

## 6. Módulos principais se fosse criada do zero hoje

1. **Alunos** — perfil (emoji, nível, idade, interesses), histórico de aulas, erros recorrentes, progresso no currículo. O coração do produto.
2. **Aula de Hoje (player)** — a tela de condução: agenda auto-montada, blocos sequenciais, tudo respondível oralmente, timer, marcação de acertos/erros em 1 clique.
3. **Biblioteca** — o conteúdo (52 semanas, gramática, exercícios, jogos, pacote Hendrik) organizado como blocos reutilizáveis que o player consome. A professora só entra aqui fora da aula.
4. **Registro & Relatórios** — preenchido automaticamente pelo player: calendário, progresso, notas, exportação em PDF (inclusive para pais de alunos crianças).

## 7. De caixa de ferramentas a assistente inteligente de aula

O salto de produto é o sistema passar a **conduzir** em vez de **armazenar**:

- **Antes da aula:** "Isa · hoje · Week 5 — Frequency Adverbs. Na última aula ela errou o negativo do simple present 2 vezes. Sugestão: warm-up de revisão com 3 perguntas. [Iniciar aula]".
- **Durante:** o player mostra ao aluno só o conteúdo; para a professora, uma faixa discreta com CCQs prontas, erros comuns do tópico e o relógio do bloco. Cada resposta marcada (✓/✗) alimenta o perfil.
- **Depois:** "Aula registrada. Isa acertou 8/10. Sugestão para a próxima: repetir frequency adverbs no warm-up. Dever de casa gerado. [Enviar PDF]".
- **Ciclo:** os erros de hoje viram a revisão de amanhã — é isso que transforma dados guardados em inteligência de ensino. A skill esl-grammar-lesson já é o "cérebro" gerador; o player seria o "corpo" que entrega o conteúdo dela em sala.

## 8. Como aumentar o Student Talking Time (STT)

- **Toda tela é um convite a falar**: imagem/pergunta grande, texto mínimo. Se a tela tem um parágrafo, a professora lê — e quem fala é ela.
- **Trocar "explicar" por "descobrir"**: as seções de gramática abrirem pelas frases-exemplo e perguntas de noticing (o aluno formula a regra falando), explicação só depois — o framework das 17 seções já faz isso; a plataforma deve seguir a mesma ordem.
- **Follow-up embutido**: cada exercício com uma pergunta de extensão pronta ("Why?", "Tell me more", "And you?") — o item de 5 segundos vira 40 segundos de fala.
- **Aluno justifica, não só responde**: no multiple choice, depois da letra, "Why not B?".
- **Medidor de fala**: um toggle simples "quem está falando?" (ou timer de turnos) que mostra a proporção STT/TTT no fim — o que é medido melhora.
- **Role-plays e tarefas abertas como bloco fixo** de toda aula, não opcional — é onde o STT explode.

## 9. Como levar a preparação para menos de 60 segundos

A preparação deixa de ser "montar" e vira **"conferir"**:

1. Abrir a plataforma → card "Próximas aulas: Isa 15h" *(0s de decisão)*
2. Clicar no card → agenda pronta: revisão dos erros + Week 5 + exercícios + jogo *(15s para ler)*
3. Opcional: trocar um bloco (ex.: outro jogo) com 1 clique *(20s)*
4. [Iniciar aula] *(pronto, <60s)*

Condições para isso: agenda auto-montada por padrão (mudar é exceção), a nota da última aula visível no card, e defaults inteligentes por idade/nível (Isa 10 anos → jogo mais lúdico; Régis adulto → role-play profissional).

## 10. Mockup textual da arquitetura ideal

```
┌──────────────────────────────────────────────────────────┐
│  SABATOVICZ                                    [Luana ▾] │
├──────────────────────────────────────────────────────────┤
│  HOJE                                                    │
│  ┌─────────────────────────────┐  ┌────────────────────┐ │
│  │ 🦄 Isa · 15h · A1           │  │ 🚀 Heitor · 17h    │ │
│  │ Week 5 — Frequency Adverbs  │  │ Week 12 — Clothes  │ │
│  │ ⚠ revisar: negativo (2x ✗)  │  │ ✓ sem pendências   │ │
│  │ [▶ INICIAR AULA]            │  │ [▶ INICIAR AULA]   │ │
│  └─────────────────────────────┘  └────────────────────┘ │
│                                                          │
│  ALUNOS        BIBLIOTECA        REGISTROS               │
│  (perfis,      (52 semanas,      (calendário, notas,     │
│   progresso,    gramática,        relatórios em PDF)     │
│   erros)        jogos, 🇳🇱)                               │
└──────────────────────────────────────────────────────────┘

── ao clicar [▶ INICIAR AULA] ──────────────────────────────

┌──────────────────────────────────────────────────────────┐
│ Isa · Week 5              ①②③④⑤⑥        ⏱ 07:32 │
│                                                          │
│              [ CONTEÚDO DO BLOCO ATUAL ]                 │
│         grande, visual, feito para o aluno FALAR         │
│                                                          │
│  barra da professora (discreta, some em 3s):             │
│  CCQs prontas · erro comum: "she don't" · [✓][✗] aluno   │
│                                   [← Anterior] [Next →]  │
└──────────────────────────────────────────────────────────┘
   ① Warm-up/revisão  ② Notice  ③ Gramática  ④ Prática
   ⑤ Jogo/Role-play   ⑥ Exit ticket

── ao terminar ─────────────────────────────────────────────

┌──────────────────────────────────────────────────────────┐
│ ✓ Aula registrada (calendário + semana + nota)           │
│ Isa: 8/10 · erro novo: "always" no fim da frase          │
│ → Próxima aula: revisão de frequency no warm-up          │
│ [📄 Dever de casa PDF]              [Fechar]             │
└──────────────────────────────────────────────────────────┘
```

**Resumo da tese de produto:** hoje a plataforma guarda conteúdo e a professora conduz sozinha; o ideal é a plataforma conduzir a aula e a professora só ensinar. Aluno no centro (não a ferramenta), um botão para começar, zero registro manual, e cada erro do aluno tornando a próxima aula melhor.

---

*Documento de produto — nenhuma implementação realizada.*
