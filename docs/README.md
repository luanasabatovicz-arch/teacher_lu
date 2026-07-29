# Teacher Lu Studio — Documentação técnica

Este diretório reúne a documentação canônica e viva da plataforma. Documentos daqui têm precedência sobre qualquer nota espalhada no repositório.

## Documentos oficiais

| Documento | Escopo | Status |
|-----------|--------|--------|
| **[`CONSECUTIVE-LESSONS.md`](CONSECUTIVE-LESSONS.md)** | Modelo de dados, regras e comportamento oficial de aulas consecutivas (single/double) — modelo `schedule` + `sessions[]`, rollup, cobrança per_lesson, retrocompatibilidade, diretrizes para módulos futuros | **Canônico** |

## Documentos históricos (raiz do repo)

Estes descrevem etapas específicas do desenvolvimento; não são canônicos, mas registram decisões:

| Arquivo | Assunto |
|---------|---------|
| `AGENDA-AULAS-DUPLAS.md` | Histórico da implementação inicial de aulas consecutivas |
| `AUDITORIA-AULAS-DUPLAS.md` | Auditoria dos módulos que precisam se adaptar |
| `SIMULACAO-SEMANA.md` | Validação por simulação Node.js |
| `REMOCAO-MODO-PROFESSOR.md` | Relatório da remoção do Modo Professor |
| `design-system/DS-FINALIZADO.md` | Design System oficialmente finalizado |
| `design-system/AUDITORIA-VISUAL.md` | Auditoria de consistência visual |
| `design-system/README.md` | Guia de uso do Design System |
| `PRODUTO.md`, `FILOSOFIA.md`, `SLF.md`, `SPEAKING-LAB.md`, `GRAMMAR-ENGINE.md`, `VOCAB-ENGINE.md`, `DIAGNOSTICO.md` | Documentos pedagógicos / de arquitetura |

## Regra de ouro

> Quando o código diverge da documentação em `docs/`, o código está errado.

Se você (ou uma IA) escreve um módulo novo, siga a documentação canônica. Se a documentação estiver incompleta para o seu caso, atualize-a antes de escrever o código.
