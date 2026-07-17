# SPEAKING-LAB.md — Especificação Oficial da Speaking Engine
**Documento de engenharia. Fonte única de verdade da Speaking Engine.**
**Obedece: FILOSOFIA.md · SLF.md (regras G1–G10) · VALIDACAO.md. Complementa: GRAMMAR-ENGINE.md.**
**Status: v1.0 — CONGELADO. Especificação oficial. Alterações exigem nova versão deste documento.**

---

## 1. Manifesto da Speaking Engine

1. A plataforma não armazena perguntas; armazena **experiências comunicativas**.
2. A unidade fundamental da Speaking Engine é a **competência comunicativa** — não a atividade, não o tema, não a pergunta.
3. Nenhuma atividade existe por ser "interessante". Toda atividade existe porque desenvolve uma competência declarada, com evidência observável. Sem justificativa pedagógica, a atividade não existe.
4. O tema contextualiza; nunca define. Toda atividade é reutilizável por construção.
5. A Speaking Engine não mede quantas perguntas foram respondidas. Mede quantas **interações significativas** aconteceram.
6. O objetivo não é fazer o aluno falar mais vezes. É sustentar conversas **cada vez mais longas, naturais e intencionais**.
7. O motor é invariante; só o conteúdo muda. Se uma experiência "não cabe" no motor, o defeito está na modelagem da experiência, nunca se resolve deformando o motor.

## 2. Filosofia

A Speaking Engine é a resposta da plataforma à pergunta: *"o que acontece quando não há um ponto gramatical a ensinar — só um aluno que precisa falar?"*

O Grammar Engine ensina **forma** e mede **precisão**. A Speaking Engine desenvolve **comunicação** e mede **interação**. As duas engines compartilham a mesma filosofia (aula 1:1 online, professora controla a tela, aluno só fala), o mesmo cadastro de alunos, a mesma fila de erros e o mesmo compromisso: nada avança sem evidência. Divergem no objeto: lá, a evidência é a forma correta; aqui, a evidência é a comunicação que aconteceu — o propósito cumprido, a conversa sustentada, o problema resolvido em inglês.

A consequência prática da filosofia: numa sessão de speaking, a professora não é avaliadora de respostas — é **interlocutora com um plano**. O plano (missão, complicações, follow-ups, evidência) vem pronto do motor; a conversa é dela e do aluno.

## 3. Princípios Pedagógicos

- **P1 — Justificativa ou exclusão.** Cada atividade declara explicitamente qual competência desenvolve, qual descritor CEFR trabalha e por que existe na plataforma. Sem os três, não entra na documentação.
- **P2 — Evidência observável.** Toda atividade termina com uma evidência binária (✓/✗) que a professora marca em 1 clique. "Foi bem" não é evidência; "sustentou 60 segundos com no máximo 3 pausas longas" é.
- **P3 — Interação sobre resposta.** Um turno de 3 frases conectadas vale mais que dez respostas monossilábicas. O motor é desenhado para alongar turnos, nunca para multiplicá-los.
- **P4 — Correção adiada, com dignidade (G10).** Durante a missão, a professora anota e não interrompe. O feedback fecha a sessão: 1 conquista celebrada, erros tratados como "try again". Erros estruturais entram na fila de erros do aluno (G4) e retornam no warm-up da aula de gramática ou na próxima sessão de speaking.
- **P5 — Personalização obrigatória (G7).** Nome, idade, nível, interesses e histórico do aluno entram em toda missão. Conteúdo genérico é defeito.
- **P6 — Dependência gramatical explícita.** Nenhuma atividade exige estrutura que o aluno ainda não encontrou no currículo de gramática. A ficha de cada atividade declara suas dependências; o motor só oferece o que está destravado.
- **P7 — Herança integral do SLF.** As regras G1–G10 valem sem exceção: aluno nunca clica nem escreve, tela minimalista, um clique por ação da professora, follow-up embutido, inglês da vida real.

## 4. Arquitetura Conceitual

Quatro entidades, em hierarquia estrita:

| Entidade | Papel | Cardinalidade | Estabilidade |
|---|---|---|---|
| **Competência comunicativa** | O que se desenvolve. Unidade fundamental. | 15 + 1 meta, fixas | Muda só com nova versão do documento |
| **Atividade** | O veículo — a experiência que treina a competência | 20, curadas | Estável; nova atividade exige contrato completo |
| **Tema** | O contexto lexical — comida, viagem, família... | Dezenas, abertas | Livre; criar tema não exige revisão de atividades |
| **Missão** | A instância executável: atividade × tema × aluno | Ilimitadas, geradas | Descartável; existe só na sessão |

Relações: uma competência é servida por uma ou mais atividades; uma atividade serve exatamente **uma** competência primária; um tema contextualiza qualquer atividade cujos requisitos satisfaça; uma missão instancia uma atividade com um tema para um aluno.

A ortogonalidade atividade × tema é o gerador de escala do sistema: 20 atividades × 30 temas ≥ 600 missões distintas, com apenas 20 estruturas a validar pedagogicamente. O portão de qualidade fica na **atividade**; as missões herdam a validade. Temas exigem apenas curadoria lexical por nível.

## 5. Contrato de Duas Camadas

Toda atividade é descrita por exatamente duas camadas:

**Camada pedagógica — o porquê. Imutável após o congelamento.**
Alterá-la significa que a atividade virou outra atividade (nova ficha, nova validação).

**Camada operacional — o como. Ajustável por calibração.**
Valores podem ser corrigidos com dados reais de aula (ex.: STT estimado, dificuldade) sem tocar na identidade pedagógica.

A separação existe para proteger a essência: nenhuma calibração operacional pode redefinir competência, objetivo ou evidência.

## 6. Contrato Obrigatório da Atividade

**Camada pedagógica (6 campos, todos obrigatórios):**

1. **Competência comunicativa** — exatamente uma, do catálogo da seção 11.
2. **Descritor CEFR** — descritor específico e verificável por nível suportado, no estilo CEFR ("A2 — consegue descrever rotinas em frases simples conectadas"), nunca apenas a sigla do nível.
3. **Objetivo pedagógico** — o que a atividade desenvolve, em termos de comportamento comunicativo.
4. **Justificativa de não-duplicação** — o que esta atividade desenvolve que nenhuma outra do catálogo desenvolve. Se a justificativa cabe em outra atividade, é duplicata e não entra.
5. **Evidência observável** — critério binário (✓/✗), marcável em 1 clique, verificável durante a própria sessão.
6. **Requisitos de tema** — o que um tema precisa oferecer para contextualizar esta atividade, em termos abstratos ("objetos concretos nomeáveis", "dilema com dois lados defensáveis"). **Nunca** uma lista de temas.

**Camada operacional (Parâmetros de Fusão — seção 12):** faixa CEFR, goals, perfis, STT estimado, fala da professora, dificuldade, IMAGE SLOT, bancos de follow-up, variantes.

Uma atividade com qualquer campo pedagógico ausente é **inválida por definição** — não importa a qualidade do resto (espelho da regra do SLF para conteúdo que viola G1–G10).

## 7. Axiomas da Speaking Engine

Os axiomas formalizam o manifesto em regras testáveis — o manifesto declara, o axioma reprova. Correspondência: M2→AX8 · M3→AX3/AX4 · M4→AX1/AX2 · M5→AX5 · M7→AX6. Em auditoria, cita-se sempre o axioma, nunca o manifesto.

- **AX1 — Reutilização por construção.** Toda atividade funciona com pelo menos 3 temas distintos sem alterar uma linha da sua estrutura, papéis ou evidência. Se trocar o tema exige mexer na atividade, a atividade está acoplada: reprovada.
- **AX2 — Tema nunca é essência.** Se remover o tema quebra a atividade, a atividade estava mal desenhada. "Situação de viagem" não é uma atividade; é um tema aplicado a uma atividade.
- **AX3 — Sem justificativa, não existe.** Atividade sem os 6 campos pedagógicos não entra na documentação, no motor, nem em aula.
- **AX4 — Sem evidência, é passatempo.** Atividade cuja conclusão não pode ser marcada ✓/✗ não é atividade desta plataforma.
- **AX5 — Interações, não respostas.** Nenhuma métrica do motor conta respostas isoladas como sucesso. O que se conta: cadeias de interação, sustentação, iniciativa, reparo.
- **AX6 — Motor invariante.** A estrutura da missão, as métricas e as regras de progressão são idênticas para um Kid A1 descrevendo uma foto e um Adult B2 defendendo uma posição. Só conteúdo, tema e adaptação mudam.
- **AX7 — Nada avança sem evidência (G3).** Competência só progride com evidências registradas; impressão da professora não substitui registro.
- **AX8 — Uma competência primária por atividade.** Atividades "que treinam tudo" não treinam nada mensurável. Competências secundárias podem ser tocadas, mas só a primária gera evidência e progressão.

## 8. Follow-up Engine

O Follow-up Engine é o componente que transforma respostas encerradas em conversa — a materialização do G8 como módulo reutilizável. Nenhuma atividade escreve seus próprios follow-ups genéricos; ela **referencia bancos** e recebe follow-ups prontos, contextualizados pela missão.

**Bancos de follow-up (catálogo):**

| Banco | Função | Exemplos-tipo |
|---|---|---|
| **Opinion** | puxar posicionamento | "Do you like it? Why?" · "Good idea or bad idea?" |
| **Description** | puxar detalhe sensorial/factual | "What color/size?" · "What else do you see?" |
| **Comparison** | puxar contraste | "Which one is better? Why?" · "And in Brazil?" |
| **Narration** | puxar continuação temporal | "And then?" · "What happened after that?" |
| **Justification** | puxar o porquê | "Why?" · "Why not the other one?" |
| **Expansion** | alongar turno curto | "Tell me more." · "Give me one more example." |
| **Personalization** | trazer para a vida do aluno | "And you?" · "Does this happen in YOUR house?" |
| **Clarification/Repair** | provocar reformulação | "What do you mean?" · "Explain it another way." |

**Regras de runtime:**
1. Todo item fechado (resposta curta, escolha, sim/não) chega à professora com pelo menos 1 follow-up do banco compatível — pronto, não improvisado.
2. **Escada de expansão:** resposta monossilábica → Expansion; resposta sem porquê → Justification; resposta impessoal → Personalization; quebra de comunicação → Clarification/Repair.
3. Follow-ups são conteúdo da **faixa da professora** (Camada 2 na terminologia do Grammar Engine): nunca aparecem para o aluno.
4. Cada ficha de atividade declara seus bancos compatíveis (Parâmetros de Fusão). O motor sorteia/rotaciona dentro deles para evitar repetição na mesma sessão.

## 9. Sistema de Missões Comunicativas

A **missão** é a instância executável de uma atividade: o que a professora efetivamente conduz na sessão.

**Anatomia da missão (invariante — AX6):**

1. **Propósito comunicativo** — o que precisa acontecer para a missão existir ("descobrir as 5 diferenças", "convencer o interlocutor", "eu conseguir executar a receita dele"). Sempre um resultado concreto, nunca "conversar sobre X".
2. **Papéis** — 1 linha para o aluno, 1 linha para a professora.
3. **Complicação injetável** — pelo menos 1 reviravolta pronta na faixa da professora, usada se a missão ficar fácil demais. A complicação é propriedade da missão, não uma atividade separada.
4. **Evidência** — herdada da atividade, contextualizada pelo tema.
5. **Socorro** — pistas por palavra/imagem (nunca frase pronta) para destravar sem entregar.

**Ciclo de vida:** seleção → contextualização → execução → registro.

- **Seleção:** o motor propõe a atividade a partir do objetivo da semana, do Speaking Footprint (seção 18 — competências com menos evidências têm prioridade) e da fila de erros (estruturas a reciclar sob pressão comunicativa).
- **Contextualização:** um tema compatível (requisitos satisfeitos + interesses do aluno) veste a atividade. O mesmo aluno nunca recebe a mesma combinação atividade × tema duas vezes seguidas.
- **Execução:** a professora conduz; o aluno fala ≥80% do bloco; correção adiada (P4).
- **Registro:** evidência ✓/✗ + métricas da sessão (seção 16) + erros anotados → fila de erros.

Uma sessão de speaking comporta de 1 a 3 missões, conforme duração e fôlego — mas **nenhuma missão é interrompida antes da evidência**: melhor 1 missão concluída que 3 pela metade (G3).

## 10. Speaking Functions

Speaking Functions são os **atos de fala** que as missões exigem — o inventário funcional que conecta a Speaking Engine ao currículo de gramática. Cada função tem expoentes por nível e dependências gramaticais explícitas (P6).

| Função | Expoentes-tipo (por nível) | Dependência gramatical |
|---|---|---|
| Describing | A1: "It is...", "I see..." · B1: "It looks like..." | verb to be, present continuous |
| Comparing | A2: "-er than", "more... than" · B1: "while / whereas" | comparatives |
| Narrating | A2: "First... then... after that" · B1: "suddenly", "in the end" | past simple |
| Sequencing/Instructing | A1: "First... next... finish!" | imperativo (léxico A1) |
| Expressing opinion | A2: "I think... because..." · B1: "In my opinion..." | present simple |
| Agreeing/Disagreeing | A2: "Me too / I don't think so" · B1: "I see your point, but..." | present simple |
| Justifying | A1: "because..." · B1: "that's why..." | conectores básicos |
| Suggesting/Negotiating | A2: "What about...?" · B1: "We could...", "Let's... instead" | modais básicos |
| Predicting | A2: "going to" · B1: "will probably" | going to / will |
| Speculating | B1: "maybe", "it might be..." | modais de possibilidade |
| Clarifying/Repairing | A1: "Sorry?", "Again, please" · B1: "What I mean is..." | fórmulas fixas (sem dependência) |
| Circumlocuting | A2: "It's a thing for...", "You use it when..." | present simple, relative básico |

**Regras:**
1. Uma função só entra em missão quando sua dependência gramatical já foi ensinada (ou quando é fórmula fixa).
2. As fichas de atividade declaram funções primárias; o motor verifica o destravamento antes de propor a missão.
3. Expoentes de socorro (as fórmulas da tabela) podem aparecer como pista por palavra — nunca como frase completa para repetir (P4/G10: reformular é do aluno).

## 11. Competências Comunicativas

Catálogo oficial — 15 competências + 1 meta-competência. Cada atividade da seção 14 serve exatamente uma competência primária (AX8).

| # | Competência | Definição operacional | Faixa CEFR típica | Atividades que a servem |
|---|---|---|---|---|
| C1 | **Description** | organizar informação observável em fala contínua | A1–B2 | Picture Description |
| C2 | **Comparison** | identificar e verbalizar semelhanças/diferenças | A1–B2 | Spot the Difference |
| C3 | **Narration** | sequenciar eventos com coerência e coesão temporal | A2–B2 | Story Builder, Picture Sequence, Continue the Story |
| C4 | **Interaction** | manter e conduzir diálogo (responder E iniciar) | A1–C1 | Role Play, Interview |
| C5 | **Negotiation** | propor, ceder, decidir com outro falante | A2–C1 | Problem Solving |
| C6 | **Opinion** | expressar posição com justificativa | A2–B2 | Opinion Builder |
| C7 | **Argumentation** | sustentar posição sob contra-argumento | B1–C1 | Debate |
| C8 | **Persuasion** | mudar a posição do interlocutor | B1–C1 | Convince Me |
| C9 | **Explanation** | tornar algo compreensível para quem não sabe | A2–B2 | Explain It |
| C10 | **Instruction** | fazer alguém executar um procedimento | A2–B2 | Teach Me |
| C11 | **Circumlocution** | comunicar apesar de lacuna lexical | A2–B2 | Guess the Object |
| C12 | **Prediction** | projetar o futuro com justificativa | A2–B2 | Predict the Future |
| C13 | **Evaluation** | julgar alternativas por critérios | A2–B2 | Compare and Choose, Ranking Challenge |
| C14 | **Fluency** | sustentar produção contínua sob tempo | A2–C1 | One Minute Talk |
| C15 | **Question Formation** | obter informação por perguntas eficientes | A2–B2 | Detective |
| — | **Task Completion** | *meta-competência:* cumprir propósito real integrando as demais | A2–C1 | Real-Life Mission |

Notas: **Speculation** (hipóteses sobre o desconhecido) está reconhecida como competência futura, pendente de piso gramatical — ver seção 19. **Task Completion** é deliberadamente integradora: é a única exceção documentada ao "uma competência isolada", por ser o ponto de convergência do sistema (equivalente ao §9 Task do Grammar Engine).

## 12. Parâmetros de Fusão

Os Parâmetros de Fusão são a camada operacional da ficha: os dados que o motor usa para **fundir** atividade × tema × aluno numa missão válida.

| Parâmetro | Valores | Função na fusão |
|---|---|---|
| **Compatible CEFR** | faixa (ex.: A1–A2) | corta atividades fora do nível do aluno |
| **Compatible Goals** | Fluency, Vocabulary, Accuracy, Confidence, Exam | alinha ao objetivo da semana/contrato do aluno |
| **Theme Requirements** | requisitos abstratos (contrato, campo 6) | seleciona temas elegíveis — derivado, nunca lista |
| **Student Types** | Kids, Teens, Adults | aplica a variante de adaptação correta |
| **Estimated STT** | minutos (ex.: 3–5) | soma o STT planejado da sessão |
| **Teacher Talking** | Low / Medium | alerta de desenho: Medium exige justificativa na ficha |
| **Difficulty** | 1–5 | calibra progressão dentro do nível |
| **Image Slot** | tipo exigido ou "—" (seção 13) | dispara a seleção de asset do tema |
| **Follow-up Banks** | referências ao catálogo da seção 8 | abastece a faixa da professora |
| **Variantes** | parâmetros próprios da atividade | ex.: modo de estímulo, classe de cenário |

Regra de coerência: parâmetros operacionais podem ser recalibrados com dados de aula real **sem nova versão do documento**; campos pedagógicos, nunca (seção 5).

## 13. IMAGE SLOT

Atividades visuais não referenciam imagens específicas — declaram um **IMAGE SLOT**: o tipo abstrato de material visual que exigem. O tema preenche o slot com assets próprios. É a mesma ortogonalidade do resto do sistema aplicada a imagens.

**Tipos de slot:**

| Slot | Conteúdo exigido | Exemplo de preenchimento (tema Food) |
|---|---|---|
| `scene` | cena com pessoas/ações em andamento | cozinha movimentada em hora de almoço |
| `object-set` | 4–8 objetos nomeáveis da mesma família | frutas e utensílios sobre a mesa |
| `pair-diff` | 2 versões da mesma cena com 5–8 diferenças | duas mesas de café da manhã quase iguais |
| `sequence` | 3–5 quadros de um processo com ordem clara | preparo de um sanduíche, do pão ao pronto |
| `mystery` | imagem parcial/ambígua (recorte, sombra, zoom) | close extremo de um alimento |
| `options` | 2–4 alternativas visuais comparáveis | quatro pratos diferentes |

**Regras:**
1. Um slot é especificação, não arquivo. A política de origem dos assets (curadoria, geração, descrição pela professora) é pendência declarada — seção 19.
2. Todo asset tem nível máximo de complexidade visual por CEFR (A1: poucos elementos, alto contraste; B2: cenas densas).
3. Um tema sem assets para um slot simplesmente não é elegível para as atividades que o exigem — sem erro, sem improviso.

## 14. As 20 Atividades

Formato de ficha: camada pedagógica (imutável) + camada operacional (calibrável). Adaptação por perfil é resumida; o detalhamento fino acontece na geração da missão (P5).

---

### 14.1 Picture Description
**Pedagógica**
- Competência: C1 Description
- Descritor CEFR: A1 — descreve com frases simples o que vê ("There is...", "He is running"). A2 — descrição conectada (lugar + pessoas + ações). B1 — descrição organizada com impressões ("It looks like...").
- Objetivo: organizar informação observável em produção contínua, saindo do rótulo ("a dog") para a cena ("a big dog is sleeping under the table").
- Justificativa: é a única atividade cujo objeto é a própria organização da descrição; todas as outras usam descrição como meio, nunca como fim.
- Evidência (✓/✗): turno descritivo contínuo com ≥5 informações relevantes distintas, sem cair em resposta monossilábica mesmo após pausas.
- Requisitos de tema: cena com elementos nomeáveis no nível do aluno.

**Operacional**
- CEFR A1–B2 · Goals: Fluency, Vocabulary · Perfis: Kids, Teens, Adults · STT 3–5 min · TT Low · Dificuldade 2/5
- Image Slot: `scene` · Follow-up Banks: Description, Expansion, Personalization
- Variantes: descrição livre · descrição guiada por zonas (A1) · "describe for me to draw" (a professora desenha o que ouve — checagem natural de precisão)
- Adaptação: Kids — a cena tem um absurdo escondido para achar; Adults — cena do universo profissional/cotidiano deles.

---

### 14.2 Spot the Difference
**Pedagógica**
- Competência: C2 Comparison
- Descritor CEFR: A1 — aponta diferenças com frases simples ("Here is a cat; here, no cat"). A2 — compara com estruturas comparativas básicas. B1 — verbaliza semelhança E diferença de forma organizada.
- Objetivo: transformar observação em linguagem comparativa precisa.
- Justificativa: única atividade cuja evidência é a verbalização da diferença/semelhança em si; Compare and Choose (14.15) usa comparação para decidir — aqui não há decisão, há precisão comparativa. Absorve a candidata Photo Comparison (duplicata).
- Evidência (✓/✗): encontra e **explica** ≥5 diferenças usando estrutura comparativa adequada ao nível (não apenas apontando).
- Requisitos de tema: cena duplicável com variações claras no nível lexical do aluno.

**Operacional**
- CEFR A1–B1 · Goals: Vocabulary, Accuracy · Perfis: Kids, Teens, Adults · STT 3–5 min · TT Low · Dificuldade 2/5
- Image Slot: `pair-diff` · Follow-up Banks: Comparison, Justification, Personalization
- Variantes: contagem fechada ("são 6 — ache todas") · aberta (B1: inclua semelhanças)
- Adaptação: Kids — cronômetro lúdico; Adults — versão "duas propostas/dois apartamentos" com a mesma mecânica.

---

### 14.3 Story Builder
**Pedagógica**
- Competência: C3 Narration
- Descritor CEFR: A2 — narra como lista simples de eventos. B1 — narrativa com início/desenvolvimento/conclusão e conectores. B2 — narrativa com tensão e desfecho intencional.
- Objetivo: construir narrativa original com arco completo.
- Justificativa: é a criação narrativa do zero — Picture Sequence (14.4) narra o que está dado; Continue the Story (14.5) narra sob restrição alheia. Aqui o aluno é o autor. Absorve a candidata Story Cubes como modo de estímulo.
- Evidência (✓/✗): história original com início, desenvolvimento e conclusão identificáveis (as três partes presentes e conectadas).
- Requisitos de tema: repertório de personagens/lugares/objetos do universo temático.

**Operacional**
- CEFR A2–B2 · Goals: Fluency, Vocabulary · Perfis: Kids, Teens, Adults · STT 4–6 min · TT Low · Dificuldade 3/5
- Image Slot: `object-set` (modo elementos) ou — (modo livre) · Follow-up Banks: Narration, Expansion, Justification
- Variantes: **modo livre** (só o tema) · **modo elementos** (3–5 elementos obrigatórios, herdado de Story Cubes) · **modo título** (a professora dá só o título)
- Adaptação: Kids — os elementos são personagens deles; Adults — "conte como se fosse um episódio que aconteceu com você".

---

### 14.4 Picture Sequence
**Pedagógica**
- Competência: C3 Narration
- Descritor CEFR: A2 — conecta quadros com "first, then, after that". B1 — narra a sequência com tempo verbal consistente e conectores variados.
- Objetivo: dominar coesão temporal — a ordem dos eventos verbalizada com marcadores.
- Justificativa: isola a **sequenciação**, que o Story Builder não isola (lá o aluno inventa; aqui a ordem já existe e o trabalho é conectá-la). É a ponte de entrada da narração para A2.
- Evidência (✓/✗): narra a sequência completa usando ≥3 marcadores temporais distintos adequados ao nível.
- Requisitos de tema: processos com ordem visual inequívoca.

**Operacional**
- CEFR A2–B1 · Goals: Accuracy, Fluency · Perfis: Kids, Teens, Adults · STT 3–4 min · TT Low · Dificuldade 2/5
- Image Slot: `sequence` · Follow-up Banks: Narration, Personalization ("você já fez isso? conta.")
- Variantes: quadros em ordem · quadros embaralhados (o aluno ordena falando — a professora arrasta)
- Adaptação: Kids — sequência de história/desenho; Adults — processo real (receita, rotina, trâmite).

---

### 14.5 Continue the Story
**Pedagógica**
- Competência: C3 Narration
- Descritor CEFR: B1 — continua narrativa mantendo personagens, tempo e lógica. B2 — continua incorporando o tom e amarrando pontas.
- Objetivo: coerência narrativa sob restrição — criar dentro de regras que outro estabeleceu.
- Justificativa: única atividade de narração que exige **escuta ativa como pré-condição da fala** (não há como continuar o que não se entendeu). Story Builder e Picture Sequence não testam isso.
- Evidência (✓/✗): a continuação preserva personagens, contexto e tempo narrativo do trecho dado, sem contradições.
- Requisitos de tema: situações iniciais com gancho aberto no universo do tema.

**Operacional**
- CEFR B1–B2 · Goals: Fluency · Perfis: Teens, Adults (Kids na variante fantasia) · STT 4–6 min · TT Medium (a professora narra o início — justificado: o input é a restrição que define a atividade) · Dificuldade 3/5
- Image Slot: — · Follow-up Banks: Narration, Justification ("por que ele fez isso?")
- Variantes: revezamento (cada um continua um pedaço) · final imposto ("termine com: ...e por isso ela nunca mais voltou lá")
- Adaptação: Kids — a professora começa com o personagem favorito deles; Adults — dilema realista (trabalho, viagem).

---

### 14.6 Role Play
**Pedagógica**
- Competência: C4 Interaction
- Descritor CEFR: A1 — troca transacional simples com apoio. A2 — sustenta diálogo funcional completo (pedir, responder, agradecer, resolver). B1 — lida com o inesperado dentro do diálogo. B2 — ajusta registro ao interlocutor.
- Objetivo: sustentar um diálogo com papéis e propósito, respondendo E iniciando turnos.
- Justificativa: é a atividade-mãe da interação simulada. Absorve as candidatas Survival Situation e Daily Life Simulation: "cotidiano" e "imprevisto" são classe de cenário e complicação — contexto, não essência (AX2).
- Evidência (✓/✗): mantém o diálogo até o propósito cumprido, com ≥2 turnos de iniciativa própria (perguntou, pediu, propôs sem ser solicitado).
- Requisitos de tema: situações com dois papéis naturais e um objetivo transacional ou social claro.

**Operacional**
- CEFR A1–C1 · Goals: Fluency, Confidence · Perfis: Kids, Teens, Adults · STT 4–6 min · TT Medium (a professora é o outro papel — justificado: sem interlocutor não há interação) · Dificuldade 2–4/5 conforme classe
- Image Slot: — (opcional `scene` como cenário) · Follow-up Banks: Clarification/Repair, Expansion
- Variantes: **classe transacional** (loja, restaurante, aeroporto) · **classe social** (convite, desculpa, small talk) · **complicação obrigatória** (herdada de Survival: algo dá errado — perdeu, quebrou, não tem) · troca de papéis
- Adaptação: Kids — faz-de-conta com missão e personagens; Adults — situações da vida real deles (P5).

---

### 14.7 Problem Solving
**Pedagógica**
- Competência: C5 Negotiation
- Descritor CEFR: A2 — propõe solução simples e reage a "and if...?". B1 — compara soluções, cede e ajusta. B2 — negocia sob critérios conflitantes.
- Objetivo: chegar a uma decisão conjunta defendendo e cedendo — o raciocínio virando fala.
- Justificativa: única atividade em que a evidência exige **resposta a objeção** (a professora sempre contrapropõe). Absorve a candidata Decision Maker, cuja evidência era subconjunto desta. Difere de Compare and Choose (14.15): lá o aluno julga sozinho; aqui negocia com outro.
- Evidência (✓/✗): apresenta ≥2 soluções, justifica a preferida e responde a ≥1 objeção sem abandonar a interação.
- Requisitos de tema: problemas com múltiplas soluções defensáveis no universo do tema.

**Operacional**
- CEFR A2–C1 · Goals: Fluency, Confidence · Perfis: Teens, Adults (Kids na variante missão) · STT 4–6 min · TT Medium (contrapropor é o mecanismo — justificado) · Dificuldade 3/5
- Image Slot: — · Follow-up Banks: Justification, Opinion, Comparison
- Variantes: recursos limitados ("só podem levar 3 itens") · prazo ("decidam em 2 minutos") · papéis com interesses opostos
- Adaptação: Kids — missão lúdica ("o dragão bloqueou a estrada — e agora?"); Adults — dilema realista com consequência.

---

### 14.8 Opinion Builder
**Pedagógica**
- Competência: C6 Opinion
- Descritor CEFR: A2 — "I think... because..." com 1 razão. B1 — opinião com 2+ razões e exemplo próprio. B2 — opinião com concessão ("it depends...").
- Objetivo: transformar preferência em posição justificada.
- Justificativa: primeiro degrau da escada opinativa (Opinion → Debate → Convince Me). Aqui **não há oposição**: o trabalho é construir a própria posição. Debate acrescenta o contra-argumento; Convince Me acrescenta o objetivo de mudar o outro. As três são fases distintas com evidências distintas.
- Evidência (✓/✗): opinião declarada + ≥2 justificativas + ≥1 exemplo pessoal, no mesmo turno estendido.
- Requisitos de tema: questões opináveis sem resposta certa, adequadas à idade.

**Operacional**
- CEFR A2–B2 · Goals: Fluency, Confidence · Perfis: Kids, Teens, Adults · STT 3–5 min · TT Low · Dificuldade 2/5
- Image Slot: — (opcional `options` como gatilho) · Follow-up Banks: Justification, Personalization, Expansion
- Variantes: escolha binária (A1/A2: "cats or dogs?") · afirmação polêmica leve (B1+)
- Adaptação: Kids — opiniões sobre o universo deles (desenhos, comidas); Adults — temas do cotidiano adulto, nunca política/religião sem pedido explícito.

---

### 14.9 Debate
**Pedagógica**
- Competência: C7 Argumentation
- Descritor CEFR: B1 — sustenta posição simples contra 1 contra-argumento. B2 — refuta, concede parcialmente e mantém a linha. C1 — constrói argumentação com estratégia.
- Objetivo: manter uma posição de pé sob pressão argumentativa.
- Justificativa: degrau 2 da escada opinativa. A evidência exige o que Opinion Builder não tem: **sobreviver ao contra-argumento**. Difere de Convince Me: no Debate, vencer não é o objetivo — sustentar é.
- Evidência (✓/✗): responde a ≥2 contra-argumentos da professora mantendo (ou revisando explicitamente) a posição, sem abandonar a defesa.
- Requisitos de tema: questões com dois lados genuinamente defensáveis.

**Operacional**
- CEFR B1–C1 · Goals: Fluency, Exam · Perfis: Teens, Adults · STT 5–7 min · TT Medium (advogado do diabo — justificado) · Dificuldade 4/5
- Image Slot: — · Follow-up Banks: Justification, Comparison, Clarification/Repair
- Variantes: posição sorteada (defender o que não acredita — B2+) · troca de lados no meio
- Adaptação: Teens — cultura pop, escola; Adults — dilemas de trabalho/vida. Kids: fora do piso (B1).

---

### 14.10 Convince Me
**Pedagógica**
- Competência: C8 Persuasion
- Descritor CEFR: B1 — argumenta para um objetivo com apelos simples. B2 — adapta o argumento ao interlocutor e responde a resistência.
- Objetivo: linguagem persuasiva orientada a resultado — argumentar **para alguém**, não sobre algo.
- Justificativa: degrau 3 da escada. Única atividade cuja evidência depende da **reação do interlocutor** (a professora "cede" segundo critérios): argumentar bem não basta, é preciso calibrar para o outro. Debate sustenta; aqui se conquista.
- Evidência (✓/✗): usa ≥3 argumentos distintos adaptando-os às recusas da professora até obter o "sim" (ou o "sim parcial" negociado).
- Requisitos de tema: algo a ser vendido/proposto/defendido com beneficiário claro.

**Operacional**
- CEFR B1–C1 · Goals: Fluency, Confidence · Perfis: Teens, Adults · STT 4–6 min · TT Medium (resistir é o mecanismo — justificado) · Dificuldade 4/5
- Image Slot: — (opcional `options`: o produto) · Follow-up Banks: Justification, Opinion
- Variantes: pitch de 60s + perguntas · "convença-me a NÃO fazer"
- Adaptação: Teens — convencer os pais/amigos (simulado); Adults — pitch profissional, upgrade, orçamento.

---

### 14.11 Explain It
**Pedagógica**
- Competência: C9 Explanation
- Descritor CEFR: A2 — explica algo simples com frases conectadas. B1 — explica um conceito/processo de forma que um leigo acompanhe. B2 — explica com exemplos e reformulação espontânea.
- Objetivo: discurso expositivo — tornar compreensível o que o interlocutor não conhece.
- Justificativa: difere de Teach Me (14.12) pelo gênero do discurso: aqui é **expositivo** (o quê/por quê — "o que é pão de queijo?"), lá é **procedural** (como fazer, passo a passo, imperativo). Evidências incompatíveis entre si.
- Evidência (✓/✗): a professora (no papel de leigo) consegue reformular corretamente o que foi explicado — "então é um/uma...?" confirmado pelo aluno.
- Requisitos de tema: conceitos/objetos/costumes que comportem um "o que é / por que existe".

**Operacional**
- CEFR A2–B2 · Goals: Fluency, Vocabulary · Perfis: Kids, Teens, Adults · STT 3–5 min · TT Low · Dificuldade 3/5
- Image Slot: — · Follow-up Banks: Clarification/Repair, Expansion, Personalization
- Variantes: "explique para um alienígena" (zero pressupostos) · explique em 3 níveis (criança → adulto → especialista, B2)
- Adaptação: Kids — explicar o jogo/desenho favorito; Adults — explicar algo do trabalho/hobby deles.

---

### 14.12 Teach Me
**Pedagógica**
- Competência: C10 Instruction
- Descritor CEFR: A2 — instrui com imperativos e sequência simples. B1 — instrui com condições ("if it's hot, wait").
- Objetivo: discurso procedural — fazer o outro executar corretamente uma tarefa.
- Justificativa: única atividade cuja evidência é **executável**: a professora segue as instruções ao pé da letra (inclusive os erros). O sucesso não está no que o aluno disse, mas no que o ouvinte conseguiu fazer — accountability comunicativa que nenhuma outra atividade oferece.
- Evidência (✓/✗): a professora executa a tarefa com sucesso seguindo apenas as instruções do aluno (execução simulada ou real).
- Requisitos de tema: procedimentos de 3–8 passos executáveis/simuláveis.

**Operacional**
- CEFR A2–B2 · Goals: Accuracy, Vocabulary · Perfis: Kids, Teens, Adults · STT 3–5 min · TT Low · Dificuldade 3/5
- Image Slot: — (opcional `sequence` como apoio A2) · Follow-up Banks: Clarification/Repair ("wait — where exactly?")
- Variantes: professora "obediente literal" (executa erros ao pé da letra — o aluno corrige a instrução) · instrução às cegas (a professora não vê o resultado esperado)
- Adaptação: Kids — ensinar um jogo/desenho; Adults — receita, ferramenta, processo do trabalho.

---

### 14.13 Guess the Object
**Pedagógica**
- Competência: C11 Circumlocution
- Descritor CEFR: A2 — descreve função e aparência com estruturas simples ("you use it for..."). B1 — define por categoria + função + diferenciação ("it's a thing like X, but...").
- Objetivo: estratégia de compensação — comunicar exatamente quando falta a palavra, a habilidade que destrava fala real fora da aula.
- Justificativa: única atividade que treina a **lacuna lexical como situação-alvo** (a palavra é proibida por regra). Em todas as outras, a lacuna é acidente; aqui é o exercício.
- Evidência (✓/✗): a professora adivinha ≥3 de 4 itens só pelas descrições, sem que o aluno use a palavra-alvo (nem em português).
- Requisitos de tema: itens concretos nomeáveis com função/categoria claras.

**Operacional**
- CEFR A2–B2 · Goals: Vocabulary, Confidence · Perfis: Kids, Teens, Adults · STT 3–5 min · TT Low · Dificuldade 2/5
- Image Slot: `object-set` (itens sorteados) · Follow-up Banks: Description, Clarification/Repair
- Variantes: papéis invertidos (a professora descreve, o aluno adivinha — vira input) · palavras proibidas extras (B1+: "descreva 'cachorro' sem 'animal' nem 'pet'")
- Adaptação: Kids — objetos do universo deles + mímica liberada como último socorro; Adults — itens do cotidiano/trabalho.

---

### 14.14 Predict the Future
**Pedagógica**
- Competência: C12 Prediction
- Descritor CEFR: A2 — previsões com "going to" a partir de evidência visível. B1 — previsões com "will" + justificativa e graus de certeza ("probably").
- Objetivo: projetar consequências e justificar a projeção.
- Justificativa: única atividade cujo objeto é o **futuro justificado**. Difere de Opinion Builder: opinião julga o presente; previsão compromete-se com o que ainda não aconteceu e exige base ("porque estou vendo X").
- Evidência (✓/✗): ≥3 previsões com estrutura de futuro adequada ao nível, cada uma com justificativa.
- Requisitos de tema: situações com desdobramento incerto (cenas em andamento, planos, tendências do universo do tema).
- Dependência gramatical (P6): going to (piso A2) · will (B1).

**Operacional**
- CEFR A2–B2 · Goals: Accuracy, Fluency · Perfis: Kids, Teens, Adults · STT 3–4 min · TT Low · Dificuldade 3/5
- Image Slot: `scene` (algo prestes a acontecer) · Follow-up Banks: Justification, Narration ("e depois disso?")
- Variantes: previsão imediata (a cena) · previsão pessoal ("sua semana") · previsão de longo prazo (B1+)
- Adaptação: Kids — "o que vai acontecer com o personagem?"; Adults — planos reais, tendências da área deles.

---

### 14.15 Compare and Choose
**Pedagógica**
- Competência: C13 Evaluation
- Descritor CEFR: A2 — compara 2 opções e escolhe com 1 critério. B1 — avalia com 2+ critérios explícitos e aceita trade-offs.
- Objetivo: julgamento verbalizado — comparar **para** decidir, tornando o critério visível.
- Justificativa: difere de Spot the Difference (comparação sem julgamento) e de Problem Solving (decisão negociada com outro). Aqui o aluno decide sozinho e o trabalho é expor o critério. Par com Ranking Challenge: 2 opções × N opções são demandas discursivas distintas (escolha vs ordenação).
- Evidência (✓/✗): compara as opções em ≥2 critérios e declara a escolha justificada pelos critérios usados (não "porque sim").
- Requisitos de tema: pares/trios de alternativas comparáveis com trade-offs reais.

**Operacional**
- CEFR A2–B2 · Goals: Fluency, Vocabulary · Perfis: Kids, Teens, Adults · STT 3–5 min · TT Low · Dificuldade 2/5
- Image Slot: `options` · Follow-up Banks: Comparison, Justification, Opinion
- Variantes: escolha com orçamento/restrição · "escolha para outra pessoa" (B1: critério alheio)
- Adaptação: Kids — escolhas do universo deles; Adults — decisões de consumo/viagem/trabalho.

---

### 14.16 Ranking Challenge
**Pedagógica**
- Competência: C13 Evaluation
- Descritor CEFR: A2 — ordena itens com critério simples ("mais importante primeiro"). B1 — defende a ordenação completa e reordena sob desafio.
- Objetivo: avaliação em série — manter critérios consistentes ao longo de uma ordenação inteira.
- Justificativa: o que isola em relação a Compare and Choose: a **consistência do critério** através de N julgamentos encadeados (posição 3 precisa ser coerente com a 1 e a 5). É avaliação sustentada, não pontual.
- Evidência (✓/✗): ordena ≥4 itens justificando cada posição, e defende (ou revisa explicitamente) a ordem quando a professora desafia uma posição.
- Requisitos de tema: conjuntos de 4–6 itens ordenáveis por critérios pessoais.

**Operacional**
- CEFR A2–B2 · Goals: Fluency, Confidence · Perfis: Kids, Teens, Adults · STT 4–6 min · TT Low · Dificuldade 3/5
- Image Slot: `object-set` (opcional) · Follow-up Banks: Justification, Comparison, Personalization
- Variantes: critério dado ("por preço") vs critério próprio (B1: declare seu critério primeiro) · top-3 de N
- Adaptação: Kids — ranking do universo deles (personagens, lanches); Adults — prioridades reais (o que levar, o que cortar).

---

### 14.17 One Minute Talk
**Pedagógica**
- Competência: C14 Fluency
- Descritor CEFR: A2 — sustenta 40–60s sobre tema conhecido com pausas naturais. B1 — sustenta 60–90s com autocontinuação ("another thing is..."). B2 — sustenta 2 min com organização espontânea.
- Objetivo: produção contínua sob tempo — reduzir a dependência de pergunta externa para continuar falando.
- Justificativa: única atividade cuja variável-alvo é o **tempo de produção ininterrupta**. Todas as outras toleram pausas e trocas de turno; aqui a pausa é exatamente o que se treina eliminar.
- Evidência (✓/✗): sustenta o tempo-alvo do nível com no máximo 3 pausas longas (>5s) e sem trocar para o português.
- Requisitos de tema: tópicos pessoais/familiares ao aluno dentro do tema (fala-se do que se conhece).

**Operacional**
- CEFR A2–C1 · Goals: Fluency · Perfis: Kids (30s), Teens, Adults · STT 2–4 min · TT Low (a professora só cronometra e reage) · Dificuldade 3/5
- Image Slot: — (opcional `scene` como gatilho) · Follow-up Banks: Expansion (usados APÓS o tempo, para estender em conversa)
- Variantes: tema sorteado na hora (B1+) · com 3 palavras obrigatórias · repetição 4-3-2 (mesmo tema, tempo menor, fluência maior)
- Adaptação: Kids — 30s + tema muito concreto; Adults — temas do repertório deles, tempo progressivo.

---

### 14.18 Interview
**Pedagógica**
- Competência: C4 Interaction
- Descritor CEFR: A1 — faz e responde perguntas pessoais básicas. A2 — conduz sequência de perguntas com reações ("really?"). B1 — improvisa follow-ups a partir das respostas.
- Objetivo: conduzir interação social aberta — perguntar, escutar, **reagir ao conteúdo** e emendar a próxima pergunta no que foi dito.
- Justificativa: difere de Role Play (cenário e papéis fictícios; aqui a conversa é real, sobre pessoas reais) e de Detective (14.19: alvo fechado de informação; aqui o objetivo é a própria conversa). A evidência exige o que nenhuma outra pede: pergunta **derivada da resposta anterior**.
- Evidência (✓/✗): conduz ≥6 perguntas onde ≥2 são follow-ups genuínos derivados das respostas (não da lista mental prévia).
- Requisitos de tema: ângulos de entrevista dentro do tema (hábitos, memórias, preferências, experiências).

**Operacional**
- CEFR A1–B2 · Goals: Fluency, Confidence · Perfis: Kids, Teens, Adults · STT 4–6 min · TT Medium (responder é o input — justificado) · Dificuldade 2/5
- Image Slot: — · Follow-up Banks: Expansion, Personalization — exceção documentada: nesta atividade os bancos servem de repertório-modelo que a professora usa para provocar o follow-up DO aluno (a regra 3 da seção 8 permanece: nada aparece na tela dele)
- Variantes: entrevista à professora · entrevista a personagem (a professora atua) · entrevista invertida no fim (2 min: ela pergunta, ele responde)
- Adaptação: Kids — entrevistar um personagem/bicho (professora atua); Adults — formato podcast/primeiro encontro profissional.

---

### 14.19 Detective
**Pedagógica**
- Competência: C15 Question Formation
- Descritor CEFR: A2 — perguntas sim/não e WH- básicas em sequência com propósito. B1 — estreita hipóteses com perguntas cada vez mais específicas.
- Objetivo: eficiência interrogativa — formular a pergunta certa para fechar uma lacuna de informação.
- Justificativa: única atividade com **lacuna de informação fechada** (a professora sabe algo que o aluno precisa descobrir): a pergunta é o instrumento, e a evidência mede a qualidade do instrumento. Interview conversa; Detective investiga.
- Evidência (✓/✗): descobre a informação-alvo com perguntas gramaticalmente viáveis, usando ≤N perguntas (padrão: N=8 em A2, N=6 em B1+; N é parâmetro operacional calibrável), sem pergunta "atirada" repetida.
- Requisitos de tema: segredos descobríveis dentro do tema (um item, uma pessoa, um lugar, um hábito).

**Operacional**
- CEFR A2–B2 · Goals: Accuracy, Fluency · Perfis: Kids, Teens, Adults · STT 3–5 min · TT Low (respostas curtas por regra: "só respondo o que a pergunta pedir") · Dificuldade 3/5
- Image Slot: `object-set` ou `mystery` (o universo de possibilidades) · Follow-up Banks: Clarification/Repair
- Variantes: 20 perguntas (sim/não) · interrogatório aberto (WH-) · "a professora mente 1 vez" (B2: detectar a contradição)
- Adaptação: Kids — adivinhar o personagem/bicho; Adults — descobrir o problema do "cliente".

---

### 14.20 Real-Life Mission
**Pedagógica**
- Competência: Task Completion (meta-competência integradora — seção 11)
- Descritor CEFR: A2 — cumpre tarefa transacional com apoio. B1 — cumpre tarefa de múltiplas etapas resolvendo imprevistos. B2 — cumpre tarefa com restrições e negociação.
- Objetivo: integrar competências sob um propósito autêntico com resultado verificável — o análogo speaking do §9 Task do Grammar Engine.
- Justificativa: única atividade cuja evidência é o **resultado externo à conversa** (a reserva feita, o problema resolvido, a informação obtida e confirmada). Role Play simula uma situação; a missão exige um desfecho — o diálogo pode ser impecável e a missão falhar, e isso é informação pedagógica que nenhuma outra atividade captura.
- Evidência (✓/✗): o objetivo concreto da missão foi atingido e o aluno confirma o resultado em inglês (recapitula o que ficou combinado).
- Requisitos de tema: tarefas autênticas com desfecho verificável e ≥2 etapas.

**Operacional**
- CEFR A2–C1 · Goals: Fluency, Confidence, Exam · Perfis: Teens, Adults (Kids em missão fantasiada) · STT 5–8 min · TT Medium (o mundo responde pela professora — justificado) · Dificuldade 4/5
- Image Slot: — (opcional conforme a tarefa) · Follow-up Banks: Clarification/Repair, Justification
- Variantes: com restrição (orçamento, prazo) · com complicação obrigatória · em cadeia (o resultado desta é o início da próxima)
- Adaptação: Kids — missão dentro de história ("consiga o mapa com o pirata"); Adults — espelho de necessidades reais declaradas no perfil (P5).

---

## 15. Auditoria e Regras de Validação

**Auditoria estrutural (executável — reprova automaticamente):**
- V1 — Contrato completo: os 6 campos pedagógicos + parâmetros operacionais presentes em toda ficha.
- V2 — Competência única: exatamente 1 competência primária, existente no catálogo da seção 11 (exceção documentada: Real-Life Mission).
- V3 — Evidência binária: a evidência é decidível ✓/✗ ao fim da própria sessão, sem julgamento diferido.
- V4 — Teste de reutilização (AX1): aplicado no protocolo de validação — a atividade é instanciada com 3 temas distintos e as 3 missões devem nascer sem alteração de estrutura, papéis ou evidência. (A ficha não lista temas — AX2; a prova é feita, não escrita.)
- V5 — Não-duplicação: a justificativa nomeia as atividades vizinhas e o que as separa; se duas fichas separam-se apenas por tema ou estímulo, funde-se.
- V6 — Dependência gramatical declarada quando existir (P6); piso CEFR coerente com a dependência.
- V7 — Teacher Talking Medium acompanhado de justificativa na ficha; High é proibido.
- V8 — Conformidade G1–G10 (herdada do SLF): oral-first, 1 clique, tela mínima, follow-up embutido, correção com dignidade.

**Auditoria pedagógica (protocolo VALIDACAO.md):**
- Cada atividade nova (ou alterada na camada pedagógica) é validada em aula real nos 3 perfis — Kid, Teen, Adult — dentro da sua faixa CEFR, com o checklist de 25 itens. Aprovação: os critérios do VALIDACAO.md, com atenção a D1 (aluno falou mais) e à evidência ter sido marcável sem hesitação.
- Atividade reprovada em 1 perfil dentro da faixa: ajusta-se a **adaptação** do perfil e retesta-se só ele. Reprovada em 2+: o defeito é da atividade — volta ao contrato.

**Política de congelamento:** após o congelamento deste documento, alterações na camada pedagógica de qualquer ficha, no catálogo de competências, nos axiomas ou nas métricas exigem nova versão do documento. Calibrações operacionais (seção 12) e novos temas não exigem.

## 16. Métricas da Sessão

O que o motor registra por sessão de speaking — todas marcáveis pela professora em 1 clique ou derivadas automaticamente:

| Métrica | Definição operacional | Origem |
|---|---|---|
| **STT / TTT** | proporção de tempo de fala aluno/professora no bloco | toggle de turno (1 clique) |
| **Interaction Chain** | sequência ininterrupta de turnos em que o aluno mantém ou expande o tópico sem pergunta-muleta da professora | contagem por cadeia |
| **Longest Conversation** | duração da maior Interaction Chain da sessão | derivada |
| **Sustentação** | nº de turnos do aluno com 3+ frases conectadas | ✓ por ocorrência |
| **Iniciativa** | nº de vezes que o aluno iniciou troca (perguntou de volta, adicionou não-pedido, reagiu ao conteúdo) | ✓ por ocorrência |
| **Reparo** | nº de quebras de comunicação resolvidas em inglês (reformulou, circumlocução, pediu esclarecimento) | ✓ por ocorrência |
| **Evidência da missão** | o critério da ficha, ✓/✗ | 1 clique ao fim |
| **Erros anotados** | estruturas/palavras falhadas durante a correção adiada | → fila de erros (G4) |

Regras: nenhuma métrica conta respostas isoladas como sucesso (AX5). O placar da sessão para o aluno é qualitativo ("sua maior conversa hoje: 2min40 — recorde"); os números alimentam o Speaking Footprint e os relatórios, não um ranking.

## 17. Progressão Baseada em Evidências

A progressão é por **competência**, não por atividade nem por sessão.

- **Consolidação:** uma competência consolida no nível quando acumula **3 evidências ✓ em missões distintas, com ≥2 temas diferentes** (prova de que a competência transfere — não foi o tema que carregou o aluno).
- **Avanço:** competência consolidada → o motor passa a propor a dificuldade seguinte (dentro do nível) ou o descritor do nível seguinte (se o currículo gramatical já destravou as dependências — P6).
- **Evidência ✗:** registra-se a causa dominante (lexical, estrutural ou estratégica). Causa estrutural → item na fila de erros, retorna no warm-up de gramática. Causa lexical → alimenta o Vocab Engine (VOCAB-ENGINE.md). Causa estratégica (travou, desistiu, PT) → a próxima missão da mesma competência desce 1 grau de dificuldade, nunca dois.
- **Regressão aparente:** 2 ✗ seguidos numa competência já consolidada não desconsolidam — disparam revisão do contexto (tema inadequado? dependência esquecida?) antes de qualquer rebaixamento.
- **Teto:** nenhuma competência progride além do que o currículo gramatical sustenta (P6). O Speaking Footprint mostra o bloqueio e sua causa ("Prediction B1 aguarda: will").

## 18. Speaking Footprint

O Speaking Footprint é o registro longitudinal por aluno: a pegada comunicativa que responde "o que a Isa já consegue fazer falando — e qual a próxima fronteira?".

**Por competência:** nível atual · nº de missões · taxa de evidência ✓ · data da consolidação · bloqueios ativos (dependências gramaticais).
**Curvas temporais:** Longest Conversation por sessão · média de Sustentação · razão STT/TTT · Iniciativas por sessão.
**Visão agregada:** radar das 15 competências (consolidada / em treino / bloqueada / não iniciada).

**Usos (em ordem de prioridade):**
1. **Seleção de missão** (seção 9): competências com menos evidências e destravadas têm prioridade.
2. **Preparação da professora:** o card da aula mostra a fronteira atual ("Narration A2 consolidada; próxima: Continue the Story B1").
3. **Relatórios:** a evolução visível para o aluno ("sua maior conversa: de 40s em março para 3min hoje") e para pais de alunos crianças — sempre progresso, nunca déficit.

O Footprint é derivado exclusivamente das métricas da seção 16 — não existe entrada manual de "impressão" (AX7).

## 19. Runtime Pipeline

O pipeline é o caminho invariante (AX6) de toda missão, da seleção ao registro. Sete estágios, sempre nesta ordem:

**Entradas do pipeline:** perfil do aluno (nome, idade, nível, interesses) · Speaking Footprint · fila de erros · objetivo da semana · catálogo de temas disponíveis (com assets).

1. **Elegibilidade** — filtra o catálogo de atividades: faixa CEFR do aluno ∩ dependências gramaticais destravadas (P6) ∩ IMAGE SLOT satisfazível pelos temas disponíveis. O que sobra é o conjunto elegível. Atividade sem asset não gera erro: fica inelegível em silêncio (seção 13, regra 3).
2. **Seleção** — dentro do conjunto elegível, prioriza por: (a) objetivo da semana; (b) competência com menos evidências no Footprint; (c) estruturas da fila de erros que a atividade recicla sob pressão comunicativa. Anti-repetição: nunca a mesma combinação atividade × tema duas vezes seguidas para o mesmo aluno.
3. **Fusão** — os Parâmetros de Fusão (seção 12) vestem a atividade com tema + aluno e produzem a missão completa: propósito contextualizado, papéis, complicação, socorro, follow-ups sorteados dos bancos, evidência herdada, variante de adaptação do perfil.
4. **Briefing** — a missão pronta é apresentada à professora antes da aula (seção 20). Nada é gerado durante a aula.
5. **Execução** — a professora conduz; o motor apenas recebe marcações de 1 clique (métricas da seção 16). Nenhuma decisão de conteúdo acontece neste estágio — tudo já veio pronto do estágio 3.
6. **Fechamento** — evidência ✓/✗ + ritual de feedback (P4): 1 conquista celebrada, erros como "try again".
7. **Registro** — métricas → Footprint · erros anotados → fila de erros · combinação usada → histórico anti-repetição. Um clique grava tudo (G2); não existe registro parcial.

**Invariantes do pipeline:** os estágios 1–3 acontecem **antes** da aula, nunca durante · o estágio 5 não gera conteúdo novo (exceção única: Recovery Engine, seção 21) · o estágio 7 é atômico — ou grava tudo, ou a missão não conta.

## 20. Teacher Workflow

O contrato de experiência da professora — o que ela vê e faz, e o que jamais precisa fazer.

**Pré-aula (< 60 segundos):**
- W1 — A missão chega montada: card com atividade, tema, propósito, evidência a observar e "por que esta missão" (a fronteira do Footprint que ela ataca).
- W2 — Uma troca em 1 clique: o card oferece 1 missão alternativa pré-montada. Trocar é exceção, não fluxo.
- W3 — Zero configuração. Se a professora precisou digitar algo antes da aula, o pipeline falhou (G2).

**Durante a missão:**
- W4 — Duas superfícies: a **tela do aluno** (mínima — propósito, imagem do slot se houver, nada mais; G6) e a **faixa da professora** (follow-ups, complicação injetável, socorro, marcadores de 1 clique, relógio). A faixa nunca é visível ao aluno.
- W5 — Toda ação da professora é 1 clique: marcar Sustentação/Iniciativa/Reparo, alternar o toggle STT, injetar complicação, revelar socorro, encerrar com ✓/✗.
- W6 — Regras de condução embutidas na faixa (não na cabeça dela): *injete a complicação quando a missão ficar confortável · socorra só após o protocolo de silêncio (seção 21) · reaja ao conteúdo antes de qualquer forma ("Really? Me too!") · anote, não interrompa.*
- W7 — A professora nunca improvisa material. Se sentiu falta de algo durante a missão, isso é defeito de ficha ou de fusão — registra-se na observação pós-aula e corrige-se na origem.

**Pós-missão (< 30 segundos):**
- W8 — Encerrar = 1 clique na evidência (✓/✗) → o motor grava métricas, fila, Footprint e histórico de uma vez. Não existe "marcar depois".
- W9 — O ritual de fechamento vem pronto na tela: a conquista do dia formulada ("hoje você sustentou 2min40 — seu recorde") + os try-agains.
- W10 — Campo opcional de observação livre (1 linha) — única digitação permitida em todo o workflow, e é opcional.

## 21. Recovery Engine

O que acontece quando a comunicação quebra no meio da missão — o único componente autorizado a intervir durante o estágio 5 do pipeline.

**Taxonomia de quebras e resposta graduada:**

| Quebra | Sinal | Resposta (nesta ordem, um degrau por vez) |
|---|---|---|
| **Lexical** | falta a palavra, aponta, "how do you say...?" | 1. esperar (protocolo de silêncio) → 2. provocar circumlocução ("explain it another way") → 3. socorro por palavra/imagem — nunca a frase pronta |
| **Estrutural** | a estrutura-alvo sai errada e trava a missão | não corrigir (P4); reformulação-eco da professora no turno seguinte (recast), 1 vez; se travar de novo → anotar e seguir |
| **Estratégica** | silêncio longo, "I don't know", troca para o português | 1. reformular a pergunta mais simples → 2. oferecer escolha binária → 3. degrau abaixo da variante (a missão continua, menor) |
| **Colapso da missão** | o propósito ficou inalcançável (nível, tema ou ânimo errados) | encerrar com dignidade: evidência ✗ com causa registrada + transição imediata para 1 interação de competência já consolidada |
| **Afetiva** | frustração visível, recusa (típico Kids) | abandonar a missão sem cerimônia (✗, causa afetiva) → micro-atividade de confiança (algo que o aluno domina) → encerrar no ✓ |

**Protocolo de silêncio:** 5 segundos de espera genuína antes de qualquer intervenção. Silêncio é processamento, não falha — a intervenção precoce rouba a fala que estava vindo.

**Regras do Recovery:**
- R1 — Um degrau por vez, nunca dois. O socorro escala; não despenca.
- R2 — A frase pronta nunca é dada. O teto do socorro é palavra ou imagem (G10: reformular é do aluno).
- R3 — Downgrade é registrado, não escondido: missão que desceu de variante conta a evidência da variante executada, com a causa anotada (alimenta a seção 17).
- R4 — **A sessão sempre termina num ✓.** Nenhum aluno sai da aula com o fracasso como última memória: após qualquer colapso, a última interação é de uma competência consolidada.
- R5 — Recovery repetido é diagnóstico: a mesma quebra 2 sessões seguidas na mesma competência não pede mais socorro — pede revisão da seleção (estágio 2) ou da dependência gramatical (P6).

## 22. Pendências (Assets e Futuras Expansões)

| # | Pendência | Decisão necessária | Bloqueia |
|---|---|---|---|
| 1 | **Política de assets visuais** | origem das imagens dos IMAGE SLOTs: curadoria manual, geração por IA, ou banco descritivo (professora descreve) — e licenciamento | Atividades com slot obrigatório (14.1, 14.2, 14.4, 14.13) em escala; funcionam com curadoria manual mínima |
| 0 | **Validação da experiência da professora** | protótipo interativo (Artifact) do Teacher Workflow (seção 20) antes de qualquer implementação definitiva | Início da implementação |
| 2 | **Mystery Picture / competência Speculation** | definir piso (B1 com modais? A2 com andaime "I think it is..."?) e distinção operacional vs Picture Description | Entrada da 21ª atividade e da 16ª competência |
| 3 | **Placeholders de personalização além de {name}** | cadastro do aluno ganhar `city`, `interests` estruturados (dívida compartilhada com o Grammar Engine) | Personalização plena P5 |
| 4 | **Catálogo inicial de temas** | primeiros ~10 temas com curadoria lexical por nível + assets mínimos | Primeira rodada de missões reais |
| 5 | **Protocolo de validação em campo** | agendar as aulas-teste dos 3 perfis (VALIDACAO.md) para o primeiro subconjunto de atividades | Congelamento da camada operacional calibrada |
| 6 | **Pacote Nederlands (Hendrik)** | verificar quais atividades funcionam sem alteração estrutural em outro idioma (hipótese: todas — teste do AX6) | Expansão futura, não bloqueia o inglês |

---

*SPEAKING-LAB.md v1.0 — especificação oficial congelada da Speaking Engine, no mesmo regime dos demais documentos oficiais da plataforma. Toda geração de conteúdo e toda implementação de speaking obedecem a este documento.*
