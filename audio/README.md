# audio/ — Listening Lab MP3s

Os micro listenings do Listening Lab tocam arquivos MP3 desta pasta.

## Gerar os 8 áudios (um comando)

Num computador com internet:

    pip install edge-tts
    python3 audio/generate-audio.py

O script `generate-audio.py`:
- lê os textos **direto** de `engine/listening-content.js` (o áudio corresponde
  exatamente ao transcript — sempre);
- usa a voz **en-US-AriaNeural** (feminina, americana, neutra, velocidade
  natural), do Microsoft Edge Neural TTS — gratuita, sem chave de API;
- grava os 8 arquivos com os nomes exatos nesta pasta.

Precisa de Python 3, Node.js (já usado pelo projeto) e o pacote `edge-tts`.
Rode da raiz do projeto ou de dentro de `audio/`.

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

## Trocar de voz (opcional)

Edite `VOICE` no topo de `generate-audio.py`. Outras vozes femininas
americanas: `en-US-JennyNeural`, `en-US-AvaNeural`, `en-US-EmmaNeural`.
Liste todas com: `edge-tts --list-voices`.

## Enquanto o MP3 não existe

O player aparece normalmente e todas as atividades funcionam (transcript,
vocabulário, compreensão, complete, true/false, speaking). Se o arquivo não
estiver presente, a página mostra um aviso discreto com o nome a usar. Assim
que o MP3 for adicionado com o nome correto, ele toca — sem alterar código.
