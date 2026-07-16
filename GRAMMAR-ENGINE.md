# Grammar Engine v1 — Especificação Oficial
**O motor que gera TODAS as aulas de gramática da plataforma. A arquitetura nunca muda; só o conteúdo.**
Obedece: FILOSOFIA.md · SLF.md (módulo Grammar + regras G1–G10) · arquitetura em 4 camadas.

---

## 0. Contrato do motor

**Entrada (obrigatória para qualquer geração):**
- `student`: nome, idade, nível CEFR, interesses
- `topic`: tópico gramatical (qualquer um)
- `theme`: tema da semana (contexto lexical)
- `error_queue`: erros recorrentes do aluno (pode ser vazia)

**Parametrização do tópico** — todo tópico gramatical, sem exceção, é descrito pelos mesmos 6 slots antes de gerar:

| Slot | O que é | Exemplo (Past Simple) |
|---|---|---|
| FORM | a forma-alvo | verbo + -ed / irregulares |
| MEANING | o que significa | ação terminada em tempo definido |
| USE | quando usar / quando não | ontem, em 2020 ✓ · com "since" ✗ |
| CONTRAST | com o que o aluno confunde | Present Perfect, Present Simple |
| PT-TRAP | erro típico de brasileiro | "I didn't went" (dupla marcação) |
| VISUAL | o visual da família do tópico | timeline |

**Visual por família:** tempos verbais → timeline · comparativos/superlativos → tabela comparativa · condicionais → árvore de decisão (if→then) · passiva → diagrama de transformação (agente↔objeto) · reported speech → balões de fala (disse → relatou) · modais → escala (proibido→obrigatório) · artigos/quantificadores → agrupamento visual.

**Garantia de invariância:** as 10 seções da Camada 1, seus portões e seus limites de volume são idênticos para Verb To Be e para Reported Speech. Se um tópico "não cabe" na arquitetura, o erro está na parametrização (provavelmente 2 tópicos disfarçados de 1 — dividir em 2 aulas).

---

## As 10 seções da Camada 1

### §1 GOAL
- **Objetivo pedagógico:** contrato da aula — o que o aluno FARÁ (comportamento observável), não o que "verá".
- **Obrigatórios:** 1 frase, começa com "By the end of this lesson, [nome] can..."; verbo de ação comunicativa (describe, tell, ask, compare — nunca "understand/know"); menciona o contexto do tema.
- **Opcionais:** micro-teaser ("...even about the future!").
- **Adaptação:** Kids — meta como missão ("Isa can present 4 animals"); Adults — meta como utilidade real ("can talk about last weekend at work").
- **Camada 2:** nunca (não há ajuda para uma frase).
- **Camada 3:** nunca.
- **Pular:** nunca. É o critério de encerramento da aula.
- **Encerrar seção:** imediato; a professora lê em 5 segundos.

### §2 WARM-UP
- **Objetivo:** aquecer a voz do aluno + recuperar erros anteriores + criar a necessidade do tópico de hoje.
- **Obrigatórios:** 3 perguntas orais; se `error_queue` ≠ vazia, as 3 são retrieval dos erros (formato novo, nunca o formato original); se vazia, 3 perguntas pessoais que o tópico de hoje responderia melhor (criar a lacuna: aluno tenta falar de ontem sem past simple → sente a falta).
- **Opcionais:** 1 imagem-gancho; mini-situação de 2 frases.
- **Adaptação:** Kids — pergunta 3 vira jogo de 30s; Teens — gancho de cultura pop; Adults — gancho da vida real da semana ("How was your Monday?").
- **Camada 2:** se o aluno travar na 1ª pergunta (hint de reformulação mais simples, gerado por padrão).
- **Camada 3:** nunca (warm-up não se estende).
- **Pular:** apenas se a aula anterior foi há <24h (emenda de reposição) — vai direto ao Notice.
- **Encerrar:** após 3 respostas OU 4 min, o que vier primeiro. Warm-up que passa de 4 min está comendo a aula.

### §3 NOTICE
- **Objetivo:** o aluno percebe FORM e MEANING sozinho, falando.
- **Obrigatórios:** 4 frases-exemplo: todas com a forma-alvo destacada (negrito), todas do mundo do aluno, ≥2 delas contrastando o ponto crítico do tópico (is/are · -ed/irregular · will/going to); 2 perguntas de noticing (uma sobre forma: "o que se repete/muda?", uma sobre sentido: "isso é agora ou antes?").
- **Opcionais:** 1 frase-exemplo engraçada; áudio das frases.
- **Adaptação:** A1–A2 — frases de 4–7 palavras; B1+ — exemplos dentro de um mini-texto de 3 linhas; Kids — frases sobre os personagens/bichos deles.
- **Camada 2:** se o aluno não achar o padrão em 2 tentativas → hints em escada (apontar a palavra → cobrir e comparar → escolha entre 2 hipóteses). Gerados por padrão.
- **Camada 3:** nunca.
- **Pular:** nunca. É a seção que define a plataforma (G5: descoberta antes de explicação).
- **Encerrar:** quando o aluno verbaliza o padrão com as palavras dele (mesmo em português) OU após 3ª tentativa com hint — aí a §5 assume a confirmação.

### §4 CCQs
- **Objetivo:** provar que o MEANING foi entendido antes de investir na forma.
- **Obrigatórios:** 5 perguntas; zero terminologia gramatical; cada uma testa uma faceta diferente (tempo? quantidade? quem faz? ainda vale? real ou hipotético?); respondíveis com 1–3 palavras; **portão: 4/5**.
- **Opcionais:** 1 CCQ com humor (resposta absurda para o aluno negar rindo).
- **Adaptação:** Kids — CCQs com gesto/apontar ("isso é hoje? aponta pro relógio"); C1 — CCQs sobre nuance ("qual dos dois soa mais educado?").
- **Camada 2:** portão falhou (<4/5) → 3 CCQs reserva (mais concretas, com exemplo novo), geradas por padrão.
- **Camada 3:** nunca.
- **Pular:** apenas em aula de revisão pura (tópico já adquirido voltando da fila).
- **Encerrar:** 4/5 → segue para §5. Falhou 2x (com as reservas) → volta ao §3 com exemplos novos; se falhar de novo, a aula muda de plano: o tópico está acima do nível — registrar e encerrar com produção do que ele JÁ sabe (nunca empurrar).

### §5 RULE
- **Objetivo:** confirmar em linguagem simples a hipótese que o aluno já construiu.
- **Obrigatórios:** ≤120 palavras; abre confirmando a descoberta ("Exatamente o que você percebeu:"); cobre USE (quando sim/quando não) — não só FORM; inclui O visual da família do tópico; 1 micro-nota de pronúncia da forma-alvo (contração/terminação/ligação).
- **Opcionais (Adults):** 1 linha de contraste com o português (PT-TRAP).
- **Adaptação:** Kids — regra em ≤60 palavras + visual dominante; B2/C1 — inclui a exceção principal e registro (formal/informal).
- **Camada 2:** aluno pede "por quê?" além da regra → explicação estendida (1 parágrafo) fica na C2, nunca na tela.
- **Camada 3:** nunca.
- **Pular:** se no §3 o aluno enunciou a regra completa e o §4 deu 5/5 → a §5 vira 1 frase de confirmação + visual (não se pula o visual).
- **Encerrar:** aluno reformula a regra em 1 frase própria ("então é só botar -ed?") → prática.

### §6 WATCH OUT
- **Objetivo:** vacinar contra os erros mais prováveis ANTES que aconteçam.
- **Obrigatórios:** exatamente 4 erros: nº1 = PT-TRAP do tópico; nº2 = erro da `error_queue` se houver relação (sem rótulo); nº3–4 = erros universais do tópico; formato ❌→✅ + porquê em ≤10 palavras.
- **Opcionais:** mini-desafio "qual desses EU vou tentar te fazer errar hoje?".
- **Adaptação:** Kids — 2 erros só, encenados com voz de personagem errando; C1 — erros de nuance/registro, não de forma.
- **Camada 2:** nunca (a seção já é a ajuda).
- **Camada 3:** nunca.
- **Pular:** em aula de tópico novo, nunca. Em revisão da fila, substituída pelos próprios erros do aluno.
- **Encerrar:** 90 segundos. É vacina, não aula sobre erros.

### §7 PRACTICE
- **Objetivo:** automatizar — do reconhecimento à produção apoiada, tirando um apoio por degrau.
- **Obrigatórios:** 12 itens na ordem fixa: 3 fill-in → 3 múltipla escolha (A/B/C) → 2 unscramble → 2 error correction → 2 transformation; 100% orais; respostas inline ocultáveis; ≥70% das frases do mundo do aluno; itens de error correction reciclam a `error_queue` quando existir; **portão: ≥80% (10/12)**; cada item com hint + follow-up (entregues na C2).
- **Opcionais:** cronômetro lúdico nos 3 últimos; item 12 humorístico.
- **Adaptação:** A1 — distratores óbvios; B1+ — distratores plausíveis (o erro que um B1 cometeria); Kids — itens em formato de jogo de pontos; Adults — frases do trabalho/rotina deles.
- **Camada 2:** SEMPRE gerada junto (hints + follow-ups por item + plano de tempo).
- **Camada 3:** portão falhou (<10/12) → gerar 6 itens SÓ dos tipos errados, começando 1 degrau mais fácil. Falhou de novo → não gerar mais prática: voltar ao §5 (o problema é conceito, não treino).
- **Pular:** os 2 primeiros tipos (fill-in, MC) podem ser pulados se o aluno acertar os 3 primeiros itens em sequência com fluência — vai direto aos tipos de produção (unscramble em diante).
- **Encerrar:** ≥80% → §8. A prática nunca se estende além de 12 itens na Camada 1 (mais treino = C3, não inflação do core).

### §8 MAKE IT YOURS
- **Objetivo:** primeira produção com conteúdo próprio — a estrutura sai do exercício e entra na vida.
- **Obrigatórios:** 6 stems pessoais falados; todos exigem a forma-alvo; do concreto ao aberto (1–2 = quase fechados, 5–6 = quase livres); professora reage ao CONTEÚDO ("Really? Me too!") antes de qualquer correção.
- **Opcionais:** 1 stem sobre a professora (o aluno pergunta).
- **Adaptação:** Kids — stems com moldura visual (emoji no lugar da lacuna); C1 — stems provocativos (opinião impopular).
- **Camada 2:** aluno responde monossilábico → follow-ups de expansão prontos ("Why? Give me one more.").
- **Camada 3:** nunca (mais produção pessoal = §9 e Camada 4).
- **Pular:** nunca — é a ponte obrigatória entre prática e task. Pode encolher para 4 stems se o tempo apertar.
- **Encerrar:** ≥4 stems completados com a forma correta (autocorreção conta como acerto) → Task.

### §9 TASK
- **Objetivo:** comunicação real — a estrutura emergindo sob pressão comunicativa genuína.
- **Obrigatórios:** 1 tarefa de voz com resultado concreto (decidir, convencer, apresentar, resolver); impossível de completar sem a forma-alvo; papéis definidos (1 linha cada); 1 complicação principal no core + 2 injetáveis na C2; correção ADIADA (professora anota, não interrompe); aluno fala ≥80% do bloco.
- **Opcionais:** cenário conectado ao warm-up (fecha o círculo narrativo da aula).
- **Adaptação:** Kids — faz-de-conta com missão e personagens; Teens — situação social real com dilema; Adults — situação profissional/viagem com consequência.
- **Camada 2:** SEMPRE (complicações extras + frases de socorro se o aluno travar — imagem/palavra, nunca frase pronta).
- **Camada 3:** nunca.
- **Camada 4 (única seção que aponta para ela):** task concluída com folga → variante mais difícil (novo interlocutor, registro formal, limite de tempo).
- **Pular:** NUNCA. Aula sem task não é aula desta plataforma (compromisso 5 da filosofia). Se o tempo apertar, corta-se C3/C4 e encolhe-se §7 — jamais a task.
- **Encerrar:** tarefa cumprida (o resultado concreto aconteceu) + feedback adiado entregue: 1 acerto celebrado → 2 erros anotados tratados como "try again".

### §10 EXIT TICKET
- **Objetivo:** evidência objetiva + aluno consciente do que conquistou.
- **Obrigatórios:** 6 itens: 2 speaking + 2 criação de frase + 1 error correction + 1 pergunta de conceito; itens NOVOS (nunca repetidos da aula); **portão: ≥80% (5/6) = semana concluída**; <80% = semana NÃO avança (registrar o que reaparece na próxima aula); fechar dizendo ao aluno 1 coisa que ele conseguiu fazer hoje que não fazia antes.
- **Opcionais:** aluno se autoavalia antes ("quantas você acha que acerta?") — calibragem metacognitiva.
- **Adaptação:** Kids — exit ticket como "boss final" com celebração; Adults — mostrar o placar e o que ele significa.
- **Camada 2:** critérios de correção por item (o que conta como aceitável em cada nível).
- **Camada 3:** nunca. Exit ticket não se treina — se falhou, a resposta é a próxima aula, não mais teste.
- **Pular:** NUNCA. Sem exit ticket não há evidência; sem evidência a semana não existe.
- **Encerrar (a aula):** placar registrado (✓/✗ por item vai para a fila de erros) + frase de conquista + homework gerado dos ✗ de hoje.

---

## Regras de runtime do motor (valem para a aula inteira)

**Quando expandir C2:** hesitação em 2 tentativas, portão falhado, resposta monossilábica, aluno pede "por quê". C2 nunca aparece na tela do aluno — é faixa da professora.

**Quando gerar C3:** somente portão do §7 falhado, somente dos tipos falhados, no máximo 1 vez por aula. C3 duas vezes = problema de nível, não de treino.

**Quando gerar C4:** todos os portões passados + ≥8 min sobrando. Nunca antes do exit ticket estar garantido no relógio.

**Ordem de corte quando o tempo aperta (do primeiro ao último a cair):** C4 → C3 → §7 encolhe (12→8 itens) → §8 encolhe (6→4 stems) → §2 encolhe (3→1 pergunta). **Intocáveis: §3, §4, §9, §10.**

**Quando encerrar a aula:** exit ticket registrado — nunca "quando acabar o conteúdo". Conteúdo que sobrou não é fracasso; é a C1 da próxima aula que já está meio pronta.

**Auditoria de invariância (teste do motor):** gerar a mesma semana para Verb To Be (Kid A1) e Reported Speech (Adult B2) — as 10 seções, os portões e os limites devem ser idênticos; só conteúdo, visual e adaptação mudam. Se algo estrutural precisou mudar, o motor tem um defeito: corrigir aqui, nunca na aula.

*Grammar Engine v1 — toda geração de aula de gramática obedece a esta especificação. Mudanças exigem nova versão deste documento.*
