# Teacher Lu Studio — STABLE

Data: 2026-08-10

A Studio está em estado estável para uso em aulas one-to-one com
compartilhamento de tela. Desenvolvimento ativo encerrado.

## Arquitetura canônica
- Students — cadastro de alunos
- Calendar (schedule.html) — sessões/aulas
- Progress (platform-progress.js) — fonte canônica de progresso
- Builder — preparação e registro da aula
- Report — relatório mensal

## Fluxo validado
Home → Build Today's Lesson → aluno → preparar → ferramentas de aula →
finalizar → Calendar → Monthly Report.

## Módulos verificados
Builder, Conversation Lessons, Grammar Lessons, Language Structures,
Listening Lab, Speaking Games, Class Games, Exercise Bank, Students,
Calendar, Monthly Report, Hendrik.

Sem blockers. Sem vazamento de Teacher Mode / hints internos nas telas
do aluno.

## Future maintenance (não bloqueia STABLE)
- `engine/speaking-engine.js` sem referências em HTML — candidato a remoção.
- `verificacao.html` parece página de teste — considerar mover para `docs/`.
- Validação visual final em screen-share (contraste em Listening / Speaking Games).
