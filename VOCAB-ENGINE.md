# Vocabulary Engine v1 — Especificação Oficial
**O motor de aquisição de vocabulário. Não é o Grammar Engine com outro nome: gramática se aprende aprofundando UMA estrutura; vocabulário se aprende fazendo CADA item de um conjunto sobreviver a vários reencontros.**
Obedece: FILOSOFIA.md · SLF.md (módulo Vocabulary + G1–G10) · arquitetura em 4 camadas.

---

## 0. Contrato do motor

**Entrada:** `student` (nome, idade, nível, interesses) · `theme` (tema da semana) · `error_queue` lexical (palavras que falharam antes) · `known_set` (o que o aluno provavelmente já sabe, se houver registro).

**Princípio estrutural — o item é a unidade, não a seção.** A aula de gramática é um funil (uma estrutura desce até a produção). A aula de vocabulário é um **carrossel**: 6–8 itens giram por rodadas de reencontro, e cada item individualmente passa por 4 estados:

```
ENCONTRAR → RECONHECER → RECUPERAR → USAR
(vê/ouve)   (distingue)   (puxa da      (frase própria
                           memória)      na comunicação)
```

**Regra de ouro do motor:** nenhum item avança de estado sem passar pelo anterior, e **nenhum item termina a aula sem chegar a USAR — ou vai para a fila de erros.** O placar da aula é por item, não por exercício.

**Parametrização do item** — todo item lexical, antes de gerar, é descrito por 6 slots:

| Slot | O que é | Exemplo ("have breakfast") |
|---|---|---|
| CHUNK | a unidade real de uso (nunca palavra solta se ela vive acompanhada) | *have breakfast* (não *breakfast*) |
| ANCHOR | a âncora de sentido sem tradução | imagem: mesa de café da manhã |
| SOUND | sílaba forte + armadilha de pronúncia | HAVE BREAKfast · /brek/, não /briːk/ |
| FRAME | a moldura de frase típica | "I have breakfast at ___" |
| FRIENDS | com quem anda (colocações, família) | have lunch/dinner · skip breakfast |
| TRAP | interferência do português / falso amigo | ✗"take breakfast" (tomar café) |

**Seleção do conjunto:** gerar 10 candidatos do tema → a §1 (Activate) elicia o que o aluno já sabe → **ensina-se apenas o que faltou** (alvo: 6–8 itens; conhecido não se ensina, se usa como base). Itens da `error_queue` do tema entram automaticamente como candidatos prioritários.

---

## As 6 rodadas da Camada 1

### §1 ACTIVATE (eliciar antes de ensinar)
- **Objetivo:** descobrir o que o aluno já tem — e fazer o conhecido receber o novo.
- **Obrigatórios:** 1 pergunta-disparo do tema ("What do you eat in the morning?") + brainstorm oral de 60–90s (professora anota na tela o que o aluno disser); os 10 candidatos ficam invisíveis ao aluno; ao final, o motor define o conjunto-alvo = candidatos que o aluno NÃO produziu.
- **Opcionais:** imagem do tema como disparo; contagem lúdica ("quantas você consegue em 1 minuto?").
- **Adaptação:** Kids — brainstorm apontando em imagem ("o que você vê?"); Adults — disparo da rotina real deles.
- **Camada 2:** se o brainstorm travar em <3 palavras → 2 perguntas-escada mais concretas.
- **Camada 3:** nunca.
- **Pular:** nunca — é o que impede a aula de ensinar o já sabido (o desperdício nº1 em vocabulário).
- **Encerrar:** conjunto-alvo definido (6–8 itens) OU 3 min.

### §2 MEET (apresentação âncora)
- **Objetivo:** primeiro encontro de cada item: sentido pela âncora, som pelo ouvido, forma pela boca — nessa ordem.
- **Obrigatórios:** por item: ANCHOR (imagem/contexto) → aluno tenta adivinhar o sentido ANTES de receber → ouve 2x → repete 2x (sílaba forte marcada) → FRAME dito pela professora com a vida do aluno ("You have breakfast at 7, right?"); tradução: só se a âncora falhar, e dita pelo aluno, não oferecida; máx. 8 itens; ritmo: ~45s por item.
- **Opcionais:** gesto por item (Kids: obrigatório); mini-história ligando 3 itens.
- **Adaptação:** A1 — itens concretos, âncora 100% visual; B1+ — âncora por contexto verbal (frase com lacuna óbvia); C1 — âncora por sinônimo + diferença ("like *stroll*, but...").
- **Camada 2:** item cuja âncora falhou → 2ª âncora alternativa pronta (outra imagem/contexto).
- **Camada 3:** nunca.
- **Pular:** itens que o aluno reconheceu na hora ("ah, breakfast!") pulam direto para o estado RECONHECER — o motor não repete o óbvio.
- **Encerrar:** todos os itens apresentados e repetidos 2x pelo aluno.

### §3 SORT (reconhecimento rápido)
- **Objetivo:** o aluno distingue os itens entre si e de vizinhos — sem ainda produzi-los do zero.
- **Obrigatórios:** 2 atividades curtas de discriminação oral cobrindo TODOS os itens: escolher entre A/B ("Morning meal: (A) breakfast (B) dinner?"), odd one out com justificativa, "aponte/diga qual é" pela âncora, verdadeiro/falso com TRAP embutida ("We say 'take breakfast' — true?"); ritmo de jogo: ≤15s por decisão.
- **Opcionais:** placar; cronômetro lúdico.
- **Adaptação:** Kids — formato 100% jogo com pontos; Adults — decisões com dignidade ("qual soa natural?").
- **Camada 2:** item confundido 2x → contraste mínimo dedicado (só ele vs. o vizinho que confunde).
- **Camada 3:** nunca (reconhecimento fraco se resolve na hora com a C2, não com mais itens).
- **Pular:** se TODOS os itens vieram do estado "reconhecido" na §2 (aluno semi-conhecia o conjunto) → direto à §4.
- **Encerrar:** cada item decidido corretamente ≥1x → estado RECUPERAR.

### §4 PULL (recuperação da memória)
- **Objetivo:** o aluno puxa o item da memória sem vê-lo — o momento em que a aprendizagem de fato acontece.
- **Obrigatórios:** âncoras voltam SEM as palavras ("What's this?" · "What do I do at 7 a.m.?"); todos os itens recuperados ≥1x; item recuperado com esforço = ✓ forte (celebrar); item não recuperado → dica em escada (som inicial → sílaba forte → escolha entre 2) e volta ao fim da rodada para 2ª tentativa; **portão: ≥80% dos itens recuperados sem escolha entre 2**.
- **Opcionais:** "describe and I guess" invertido (aluno descreve, professora adivinha — recuperação disfarçada).
- **Adaptação:** Kids — memória com cartas virtuais viradas (professora vira, aluno diz); B2/C1 — recuperar pelo uso ("como eu digo isso de forma mais formal?").
- **Camada 2:** SEMPRE (a escada de dicas por item é gerada junto).
- **Camada 3:** portão falhou → mais 1 rodada de PULL apenas dos itens falhados, com âncoras novas. 1x por aula no máximo; falhou de novo → itens vão à fila de erros e o conjunto-alvo da aula encolhe (melhor 5 adquiridos que 8 vistos).
- **Pular:** nunca. Sem recuperação não há aquisição — é o coração do motor.
- **Encerrar:** portão passado → estado USAR.

### §5 OWN (uso pessoal — portão de verificação)
- **Objetivo:** cada item entra numa frase verdadeira da vida do aluno.
- **Obrigatórios:** 1 frase própria POR ITEM, falada (FRAME disponível como apoio apenas se travar); professora reage ao conteúdo antes de corrigir; follow-up em ≥metade ("Really? At 6?!"); **portão por item: frase correta e verdadeira = item ADQUIRIDO HOJE; item sem frase = fila de erros** (sem exceção — G3).
- **Opcionais:** encadear frases numa mini-história pessoal.
- **Adaptação:** Kids — frase sobre a família/bicho vale; frame visual com emoji; C1 — frase com nuance ("use it about work, ironically").
- **Camada 2:** frames de socorro por item + follow-ups.
- **Camada 3:** nunca (item que não chegou aqui volta amanhã via fila — não se força hoje).
- **Pular:** nunca. É o critério de verificação oficial do módulo.
- **Encerrar:** todos os itens tentados (adquirido ou enfileirado).

### §6 MIX (uso comunicativo + fechamento)
- **Objetivo:** os itens sobrevivem juntos numa troca real — e o aluno sai sabendo o que ganhou.
- **Obrigatórios:** 1 mini-tarefa de voz (2–4 min) que force ≥5 dos itens juntos (planejar, descrever, comparar, entrevistar: "Plan your perfect Saturday meals"); itens usados espontaneamente = confirmação de aquisição (registrar); fechamento: recontagem com o aluno ("Quantas palavras novas você levou hoje? Diga suas 3 favoritas") — a recontagem é em si a 4ª recuperação.
- **Opcionais:** conectar a tarefa ao tema da task de gramática da semana (os motores se alimentam).
- **Adaptação:** Kids — missão ("feed the monster: it only eats words it hears in sentences!"); Adults — situação real (pedido, planejamento, descrição de rotina).
- **Camada 2:** 2 reviravoltas injetáveis na tarefa.
- **Camada 3:** nunca.
- **Camada 4 (única seção que aponta para ela):** conjunto adquirido com folga → FRIENDS dos itens (colocações irmãs: have lunch/dinner/a snack) + 1 rodada de uso.
- **Pular:** nunca — vocabulário sem uso comunicativo é lista decorada.
- **Encerrar (a aula):** placar por item registrado (adquirido / enfileirado) + itens adquiridos entram na fila de REVISÃO espaçada (1→3→8) + homework gerado: áudio usando os itens de hoje.

---

## Regras de runtime do motor

**Contagem de encontros (auditável):** ao fim da aula, cada item adquirido passou por ≥4 produções faladas (repetir na §2, decidir na §3, recuperar na §4, frase na §5 — a §6 é bônus). Item com <3 produções não pode ser marcado adquirido, mesmo que "pareça".

**Tamanho do conjunto por perfil:** Kids 5–6 · A1 6 · A2–B1 7–8 · B2+ 8 (com FRIENDS na C4). Encolher o conjunto no meio da aula é permitido e encorajado; inflar, nunca.

**Ordem de corte quando o tempo aperta:** C4 → §6 encolhe (tarefa de 2 min) → §3 encolhe (1 atividade) → conjunto encolhe (8→6 itens). **Intocáveis: §1, §4, §5** (eliciar, recuperar, usar — sem eles não é aquisição).

**Interação com os outros motores:** os itens adquiridos hoje são o léxico preferencial dos exemplos do Grammar Engine da mesma semana; os enfileirados voltam no warm-up (Review) e no Homework. O tema é sempre compartilhado entre os motores da semana.

**Auditoria de invariância:** gerar "Food" (Kid A1) e "Work idioms" (Adult B2) — as 6 rodadas, os estados por item, os portões e a contagem de encontros devem ser idênticos; mudam só itens, âncoras e adaptação.

*Vocabulary Engine v1 — toda geração de vocabulário obedece a esta especificação. Mudanças exigem nova versão.*
