# audio/ — Listening Lab MP3s

Os micro listenings do Listening Lab tocam arquivos MP3 desta pasta.

## Como usar

Gere os áudios num serviço externo (ElevenLabs, OpenAI TTS, Microsoft Edge...)
e solte os arquivos aqui com os nomes exatos abaixo. **Nenhuma alteração de
código é necessária** — o player aparece sozinho no próximo carregamento da
página assim que o arquivo existir.

## Nomes esperados (os 8 do banco inicial)

    animals-a1-01.mp3
    food-a1-01.mp3
    daily-routine-a1-01.mp3
    travel-a1-01.mp3
    animals-a2-01.mp3
    food-a2-01.mp3
    daily-routine-a2-01.mp3
    travel-a2-01.mp3

Convenção: `<theme>-<level>-<nn>.mp3`. O nome que cada listening espera é o
campo `audio` em `engine/listening-content.js`.

Voz sugerida: feminina, americana, neutra, velocidade natural.

## Comportamento sem o MP3

Enquanto o arquivo não existir, a página **não cria o player** e mostra um
aviso discreto — *"Audio not available yet."* Todas as atividades continuam
funcionando normalmente (transcript, vocabulário, compreensão, complete,
true/false, speaking). Nenhum erro 404 aparece no console: a página verifica
a existência do arquivo com uma sondagem `fetch` (que não gera erro de
console), em vez de tentar carregar um `<audio>` quebrado.
