# Teacher Lu Design System

Identidade visual oficial do ecossistema Teacher Lu.
Usada pela **Teacher Lu Studio** e será usada pela futura **Teacher Lu Practice**.

## Uso

Em qualquer página HTML, importe apenas o entry-point:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="design-system/theme.css">
```

Nada mais. Nenhum `<style>` inline com cores fixas. Nenhum `--var` local.

## Arquivos

```
design-system/
├── theme.css        ← entry-point (importa os outros na ordem correta)
├── tokens.css       ← cores, tipografia, espaçamento, raio, sombra, animação
├── base.css         ← reset, tipografia global, utilitários
├── layout.css       ← topbar, wrap, row, grid, footer
├── components.css   ← btn, inp, card, modal, table, badge, tab, toast, ...
└── patterns.css     ← composições reutilizadas (calendário, kpi, stu-row, ...)
```

## Referência viva

Abra `design-system.html` para ver todos os componentes em uso. Use essa página como referência sempre que for criar uma tela nova ou migrar uma antiga.

## Filosofia

1. **Um único visual em todo o ecossistema.** Se algo precisa parecer diferente numa tela, o problema é a tela, não o Design System.
2. **Sem hex direto.** Toda cor vem de `--tl-*`.
3. **Sem valores arbitrários de espaçamento.** Toda medida vem da escala `--tl-space-*`.
4. **Compatibilidade com o legado.** Classes antigas (`.btn.purple`, `.btn.pink`, `.b1..b8`, `.c1..c8`, `.e1..e8`) continuam funcionando e apontam para o novo padrão — não é preciso mexer no HTML de páginas antigas para migrar.

## Paleta

| Token | Hex | Uso |
|-------|-----|-----|
| `--tl-primary` | #0B3B46 | Deep Teal — CTAs, headers, topbar |
| `--tl-secondary` | #16B1A9 | Turquoise — links, foco, destaques |
| `--tl-accent` | #FF6B6B | Coral — chamadas, badges de destaque |
| `--tl-bg` | #F8F9FA | Fundo da página |
| `--tl-surface` | #FFFFFF | Superfície de cards, modais |
| `--tl-text` | #1F2937 | Texto principal |
| `--tl-text-secondary` | #6B7280 | Texto secundário |
| `--tl-border` | #E5E7EB | Bordas |
| `--tl-success` | #22C55E | Sucesso |
| `--tl-warning` | #F59E0B | Aviso |
| `--tl-danger` | #EF4444 | Erro |
| `--tl-info` | #0EA5E9 | Informação |

## Tipografia

- **Uma família:** Inter, via Google Fonts.
- **Escala:** display 40 · h1 32 · h2 24 · h3 20 · h4 16 · body 15 · small 14 · caption 12.
- **Pesos:** 400, 500, 600, 700.

## Espaçamento

Escala oficial: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96` px, expostas como `--tl-space-1` até `--tl-space-9`.

## Como migrar uma página antiga

1. Apague o bloco `<style>` inline da página.
2. Adicione `<link rel="stylesheet" href="design-system/theme.css">` no `<head>`.
3. Adicione a fonte Inter (se ainda não estiver): `<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">`.
4. Se a página tem componentes muito específicos (que não existem no DS), mantenha só esses seletores em um `<style>` reduzido no head, usando `--tl-*` para todas as cores.
5. Não mude nomes de classe. Não mude IDs. Não toque em JS.

## Regras para futuras telas (Teacher Lu Practice inclusive)

- Cada tela deve usar apenas os componentes do DS.
- Se algo não existir, primeiro adicione ao DS, depois use na tela.
- Nunca hardcode cor, fonte, espaçamento ou raio dentro de uma página específica.
