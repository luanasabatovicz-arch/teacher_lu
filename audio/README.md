# audio/ — Listening Lab MP3s

Os micro listenings do Listening Lab tocam arquivos MP3 desta pasta.
O código já está pronto: basta soltar o arquivo aqui com o nome exato
que o listening espera — nenhuma alteração de código é necessária.

## Convenção de nome

    <theme>-<level>-<nn>.mp3

Exemplos (os 8 do banco inicial):

    animals-a1-01.mp3
    food-a1-01.mp3
    daily-routine-a1-01.mp3
    travel-a1-01.mp3
    animals-a2-01.mp3
    food-a2-01.mp3
    daily-routine-a2-01.mp3
    travel-a2-01.mp3

O nome esperado por cada listening é o campo `audio` em
`engine/listening-content.js`.

## Enquanto o MP3 não existe

O player aparece normalmente e as atividades funcionam (transcript,
vocabulário, compreensão, complete, true/false, speaking). Se o arquivo
não estiver presente, a página mostra um aviso discreto dizendo qual nome
usar. Assim que o MP3 for adicionado com o nome correto, ele toca.
