/* =========================================================================
   Hendrik — Nederlands · banco de conteúdo
   -------------------------------------------------------------------------
   Este arquivo contém APENAS conteúdo (vocabulário, frases e exercícios).
   Nenhuma lógica de renderização, jogo ou estado mora aqui.
   hendrik.html continua sendo o renderer/engine.

   Estrutura de cada tema:
     id, name, icon      -> iguais aos cards aprovados de "Kies een les!"
     frame               -> frase-molde do jogo "Zinnen" (fallback)
     words[]             -> vocabulário com emoji (usado nos jogos e cards)
                            {w: palavra NL, e: emoji, pt: tradução}
     vocab[]             -> vocabulário extra sem emoji (usado nas frases)
                            {w, pt}
     say[]               -> frases para repetir em voz alta {nl, pt}
     items[]             -> banco de exercícios

   Tipos de item (renderizados pelo Oefenboek):
     mc        escolher a palavra certa            {ask, e?, correct, opts}
     cloze     completar a frase                   {ask com ___, correct, opts, audio?}
     fill      escrever a palavra                  {ask, e?, correct}
     tf        waar of niet waar                   {ask, correct:true|false}
     scramble  ordenar as palavras                 {bag[], correct}
     odd       qual não pertence                   {ask?, opts, correct}
     sent      qual frase está certa               {opts, correct}
     qa        pergunta + resposta curta           {ask, opts, correct, audio?}
     make      produção livre (a juf confere)      {ask, example}
     guess     adivinhar a palavra                 {ask, correct}

   Camadas pedagógicas (implícitas, nunca exibidas na interface):
     1 reconhecimento · 2 frase mínima · 3 frase simples
     4 combinação     · 5 pergunta e resposta
   ========================================================================= */

(function (root) {
  'use strict';

  var THEMES = [];

  /* ======================================================================
     1 · MENSEN 👦
     ====================================================================== */
  THEMES.push({
    id: 'people', name: 'Mensen', icon: '👦', frame: 'Dit is mijn ___',
    words: [
      { w: 'mama', e: '👩', pt: 'mãe' },
      { w: 'papa', e: '👨', pt: 'pai' },
      { w: 'oma', e: '👵', pt: 'vovó' },
      { w: 'opa', e: '👴', pt: 'vovô' },
      { w: 'broer', e: '👦', pt: 'irmão' },
      { w: 'zus', e: '👧', pt: 'irmã' },
      { w: 'jongen', e: '🧒', pt: 'menino' },
      { w: 'meisje', e: '👱‍♀️', pt: 'menina' },
      { w: 'man', e: '🧔', pt: 'homem' },
      { w: 'vrouw', e: '👩‍🦰', pt: 'mulher' },
      { w: 'baby', e: '👶', pt: 'bebê' },
      { w: 'familie', e: '👨‍👩‍👧‍👦', pt: 'família' },
      { w: 'vriend', e: '🤝', pt: 'amigo' },
      { w: 'vriendin', e: '👭', pt: 'amiga' },
      { w: 'juf', e: '👩‍🏫', pt: 'professora' },
      { w: 'meester', e: '👨‍🏫', pt: 'professor' }
    ],
    vocab: [
      { w: 'moeder', pt: 'mãe (formal)' },
      { w: 'vader', pt: 'pai (formal)' },
      { w: 'kind', pt: 'criança' },
      { w: 'lief', pt: 'querido, meigo' },
      { w: 'oud', pt: 'velho' },
      { w: 'jong', pt: 'jovem' },
      { w: 'heten', pt: 'chamar-se' }
    ],
    say: [
      { nl: 'Hallo! Ik ben Hendrik.', pt: 'Olá! Eu sou o Hendrik.' },
      { nl: 'Dit is mijn mama.', pt: 'Esta é a minha mãe.' },
      { nl: 'Dit is mijn papa.', pt: 'Este é o meu pai.' },
      { nl: 'Dit is mijn oma.', pt: 'Esta é a minha avó.' },
      { nl: 'Dit is mijn familie.', pt: 'Esta é a minha família.' },
      { nl: 'Ik heb een broer.', pt: 'Eu tenho um irmão.' },
      { nl: 'Ik heb een zus.', pt: 'Eu tenho uma irmã.' },
      { nl: 'Mijn oma is lief.', pt: 'A minha avó é querida.' },
      { nl: 'Mijn opa is oud.', pt: 'O meu avô é velho.' },
      { nl: 'Mijn vriend heet Tom.', pt: 'O meu amigo se chama Tom.' },
      { nl: 'Mijn moeder heet Anna.', pt: 'A minha mãe se chama Anna.' },
      { nl: 'Ik hou van mijn familie.', pt: 'Eu amo a minha família.' }
    ],
    items: [
      { t: 'cloze', ask: 'Dit is mijn ___. 👩', correct: 'mama', opts: ['mama', 'hond', 'rood'], audio: 'Dit is mijn mama.' },
      { t: 'cloze', ask: 'Dit is mijn ___. 👴', correct: 'opa', opts: ['opa', 'oma', 'baby'], audio: 'Dit is mijn opa.' },
      { t: 'cloze', ask: 'Mijn ___ is lief.', correct: 'oma', opts: ['oma', 'bal', 'zon'], audio: 'Mijn oma is lief.' },
      { t: 'cloze', ask: 'Ik heb een ___. 👦', correct: 'broer', opts: ['broer', 'zus', 'juf'], audio: 'Ik heb een broer.' },
      { t: 'cloze', ask: 'Mijn broer is een ___.', correct: 'jongen', opts: ['jongen', 'meisje', 'vrouw'], audio: 'Mijn broer is een jongen.' },
      { t: 'cloze', ask: 'Mijn zus is een ___.', correct: 'meisje', opts: ['meisje', 'jongen', 'man'], audio: 'Mijn zus is een meisje.' },
      { t: 'cloze', ask: 'Dit is mijn ___. 👨‍👩‍👧‍👦', correct: 'familie', opts: ['familie', 'huis', 'kat'], audio: 'Dit is mijn familie.' },
      { t: 'cloze', ask: 'Mijn ___ heet Tom.', correct: 'vriend', opts: ['vriend', 'oma', 'baby'], audio: 'Mijn vriend heet Tom.' },
      { t: 'cloze', ask: 'De moeder van mijn mama is mijn ___.', correct: 'oma', opts: ['oma', 'zus', 'juf'], audio: 'De moeder van mijn mama is mijn oma.' },
      { t: 'cloze', ask: 'De vader van mijn papa is mijn ___.', correct: 'opa', opts: ['opa', 'broer', 'man'], audio: 'De vader van mijn papa is mijn opa.' },
      { t: 'cloze', ask: 'Mijn ___ is heel klein. 👶', correct: 'baby', opts: ['baby', 'opa', 'meester'], audio: 'Mijn baby is heel klein.' },
      { t: 'cloze', ask: 'Op school heb ik een ___. 👩‍🏫', correct: 'juf', opts: ['juf', 'oma', 'vriendin'], audio: 'Op school heb ik een juf.' },

      { t: 'tf', ask: 'Een jongen is een kind.', correct: true },
      { t: 'tf', ask: 'Oma is jong.', correct: false },
      { t: 'tf', ask: 'Mama is een vrouw.', correct: true },
      { t: 'tf', ask: 'Papa is een meisje.', correct: false },
      { t: 'tf', ask: 'Een baby is klein.', correct: true },
      { t: 'tf', ask: 'Mijn broer is een dier.', correct: false },
      { t: 'tf', ask: 'Opa is de vader van papa.', correct: true },
      { t: 'tf', ask: 'Een juf werkt op school.', correct: true },

      { t: 'qa', ask: 'Wie is dit? 👵', correct: 'Dit is mijn oma.', opts: ['Dit is mijn oma.', 'Dit is mijn hond.', 'Het is blauw.'], audio: 'Dit is mijn oma.' },
      { t: 'qa', ask: 'Heb jij een broer?', correct: 'Ja, ik heb een broer.', opts: ['Ja, ik heb een broer.', 'Ja, ik ben een broer.', 'Ja, ik eet een broer.'], audio: 'Ja, ik heb een broer.' },
      { t: 'qa', ask: 'Heb jij een zus?', correct: 'Nee, ik heb geen zus.', opts: ['Nee, ik heb geen zus.', 'Nee, ik ben geen zus.', 'Nee, ik zus niet.'], audio: 'Nee, ik heb geen zus.' },
      { t: 'qa', ask: 'Hoe heet je moeder?', correct: 'Mijn moeder heet Anna.', opts: ['Mijn moeder heet Anna.', 'Mijn moeder is Anna jaar.', 'Ik heet mijn moeder.'], audio: 'Mijn moeder heet Anna.' },
      { t: 'qa', ask: 'Wie is je vriend?', correct: 'Mijn vriend heet Tom.', opts: ['Mijn vriend heet Tom.', 'Mijn vriend is een appel.', 'Ik vriend Tom.'], audio: 'Mijn vriend heet Tom.' },

      { t: 'scramble', bag: ['Dit', 'is', 'mijn', 'moeder'], correct: 'Dit is mijn moeder.' },
      { t: 'scramble', bag: ['Ik', 'heb', 'een', 'broer'], correct: 'Ik heb een broer.' },
      { t: 'scramble', bag: ['Mijn', 'oma', 'is', 'lief'], correct: 'Mijn oma is lief.' },
      { t: 'scramble', bag: ['Dit', 'is', 'mijn', 'familie'], correct: 'Dit is mijn familie.' },
      { t: 'scramble', bag: ['Mijn', 'vriend', 'heet', 'Tom'], correct: 'Mijn vriend heet Tom.' },

      { t: 'sent', correct: 'Dit is mijn moeder.', opts: ['Dit is mijn moeder.', 'Dit zijn mijn moeder.', 'Dit is mijn moeders.'] },
      { t: 'sent', correct: 'Ik heb een zus.', opts: ['Ik heb een zus.', 'Ik hebt een zus.', 'Ik heb een zussen.'] },
      { t: 'sent', correct: 'Mijn opa is oud.', opts: ['Mijn opa is oud.', 'Mijn opa zijn oud.', 'Mijn opa is oude.'] },

      { t: 'odd', ask: 'Welk woord hoort er niet bij?', correct: 'hond', opts: ['mama', 'papa', 'oma', 'hond'] },
      { t: 'odd', ask: 'Welk woord hoort er niet bij?', correct: 'appel', opts: ['broer', 'zus', 'baby', 'appel'] },
      { t: 'odd', ask: 'Welk woord hoort er niet bij?', correct: 'blauw', opts: ['jongen', 'meisje', 'vriend', 'blauw'] },

      { t: 'guess', ask: 'Zij is de moeder van mijn mama. Wie is het?', correct: 'oma' },
      { t: 'guess', ask: 'Hij is de vader van mijn papa. Wie is het?', correct: 'opa' },
      { t: 'guess', ask: 'Ik speel met hem op school. Hij is mijn ...', correct: 'vriend' },
      { t: 'guess', ask: 'Zij werkt op school en zij helpt de kinderen.', correct: 'juf' },

      { t: 'make', ask: 'Maak een zin met "broer".', example: 'Ik heb een broer.' },
      { t: 'make', ask: 'Maak een zin met "oma".', example: 'Mijn oma is lief.' },
      { t: 'make', ask: 'Vertel over je familie.', example: 'Dit is mijn familie. Ik heb een mama, een papa en een zus.' },

      { t: 'cloze', ask: 'Mijn zus is ___ jaar.', correct: 'acht', opts: ['acht', 'blauw', 'brood'], audio: 'Mijn zus is acht jaar.' },
      { t: 'cloze', ask: 'Mijn broer heeft een ___. 🐶', correct: 'hond', opts: ['hond', 'oma', 'raam'], audio: 'Mijn broer heeft een hond.' },
      { t: 'tf', ask: 'Mijn mama heeft twee ogen.', correct: true }
    ]
  });

  /* ======================================================================
     2 · KLEUREN 🎨
     ====================================================================== */
  THEMES.push({
    id: 'colors', name: 'Kleuren', icon: '🎨', frame: 'Het is ___',
    words: [
      { w: 'rood', e: '🔴', pt: 'vermelho' },
      { w: 'blauw', e: '🔵', pt: 'azul' },
      { w: 'groen', e: '🟢', pt: 'verde' },
      { w: 'geel', e: '🟡', pt: 'amarelo' },
      { w: 'oranje', e: '🟠', pt: 'laranja' },
      { w: 'paars', e: '🟣', pt: 'roxo' },
      { w: 'zwart', e: '⚫', pt: 'preto' },
      { w: 'wit', e: '⚪', pt: 'branco' },
      { w: 'bruin', e: '🟤', pt: 'marrom' },
      { w: 'roze', e: '🌸', pt: 'rosa' },
      { w: 'grijs', e: '🩶', pt: 'cinza' },
      { w: 'regenboog', e: '🌈', pt: 'arco-íris' }
    ],
    vocab: [
      { w: 'kleur', pt: 'cor' },
      { w: 'welke kleur', pt: 'qual cor' },
      { w: 'favoriet', pt: 'favorito' },
      { w: 'mooi', pt: 'bonito' },
      { w: 'trui', pt: 'blusa' },
      { w: 'broek', pt: 'calça' },
      { w: 'schoenen', pt: 'sapatos' },
      { w: 'donker', pt: 'escuro' },
      { w: 'licht', pt: 'claro' }
    ],
    say: [
      { nl: 'Het is rood.', pt: 'É vermelho.' },
      { nl: 'Ik hou van blauw.', pt: 'Eu gosto de azul.' },
      { nl: 'De zon is geel.', pt: 'O sol é amarelo.' },
      { nl: 'Groen is mooi.', pt: 'Verde é bonito.' },
      { nl: 'De appel is rood.', pt: 'A maçã é vermelha.' },
      { nl: 'De banaan is geel.', pt: 'A banana é amarela.' },
      { nl: 'Mijn trui is groen.', pt: 'A minha blusa é verde.' },
      { nl: 'De auto is blauw.', pt: 'O carro é azul.' },
      { nl: 'Mijn favoriete kleur is blauw.', pt: 'A minha cor favorita é azul.' },
      { nl: 'De hond is bruin.', pt: 'O cachorro é marrom.' },
      { nl: 'Ik zie een regenboog.', pt: 'Eu vejo um arco-íris.' },
      { nl: 'Welke kleur is het?', pt: 'Que cor é?' }
    ],
    items: [
      { t: 'cloze', ask: 'De appel is ___. 🍎', correct: 'rood', opts: ['rood', 'blauw', 'zwart'], audio: 'De appel is rood.' },
      { t: 'cloze', ask: 'De banaan is ___. 🍌', correct: 'geel', opts: ['geel', 'groen', 'paars'], audio: 'De banaan is geel.' },
      { t: 'cloze', ask: 'Het gras is ___. 🌱', correct: 'groen', opts: ['groen', 'roze', 'wit'], audio: 'Het gras is groen.' },
      { t: 'cloze', ask: 'De lucht is ___. 🌤️', correct: 'blauw', opts: ['blauw', 'bruin', 'zwart'], audio: 'De lucht is blauw.' },
      { t: 'cloze', ask: 'De sneeuw is ___. ❄️', correct: 'wit', opts: ['wit', 'oranje', 'grijs'], audio: 'De sneeuw is wit.' },
      { t: 'cloze', ask: 'De hond is ___. 🐶', correct: 'bruin', opts: ['bruin', 'geel', 'paars'], audio: 'De hond is bruin.' },
      { t: 'cloze', ask: 'Mijn trui is ___. 🟢', correct: 'groen', opts: ['groen', 'rood', 'wit'], audio: 'Mijn trui is groen.' },
      { t: 'cloze', ask: 'Mijn bal is ___. 🔴', correct: 'rood', opts: ['rood', 'zwart', 'grijs'], audio: 'Mijn bal is rood.' },
      { t: 'cloze', ask: 'De auto is ___. 🔵', correct: 'blauw', opts: ['blauw', 'geel', 'roze'], audio: 'De auto is blauw.' },
      { t: 'cloze', ask: 'Mijn kamer is ___. 🟡', correct: 'geel', opts: ['geel', 'bruin', 'zwart'], audio: 'Mijn kamer is geel.' },
      { t: 'cloze', ask: 'Ik heb een ___ broek. ⚫', correct: 'zwarte', opts: ['zwarte', 'zwart', 'zwarten'], audio: 'Ik heb een zwarte broek.' },
      { t: 'cloze', ask: 'Mijn favoriete ___ is blauw.', correct: 'kleur', opts: ['kleur', 'kat', 'huis'], audio: 'Mijn favoriete kleur is blauw.' },

      { t: 'tf', ask: 'Een appel is blauw.', correct: false },
      { t: 'tf', ask: 'De zon is geel.', correct: true },
      { t: 'tf', ask: 'Sneeuw is wit.', correct: true },
      { t: 'tf', ask: 'Gras is roze.', correct: false },
      { t: 'tf', ask: 'Een banaan is geel.', correct: true },
      { t: 'tf', ask: 'Melk is zwart.', correct: false },
      { t: 'tf', ask: 'Een regenboog heeft veel kleuren.', correct: true },
      { t: 'tf', ask: 'Een muis is vaak grijs.', correct: true },

      { t: 'qa', ask: 'Welke kleur is het? 🟢', correct: 'Het is groen.', opts: ['Het is groen.', 'Het is een groen.', 'Ik ben groen.'], audio: 'Het is groen.' },
      { t: 'qa', ask: 'Welke kleur is de appel? 🍎', correct: 'De appel is rood.', opts: ['De appel is rood.', 'De appel heeft rood.', 'De rood is appel.'], audio: 'De appel is rood.' },
      { t: 'qa', ask: 'Wat is je favoriete kleur?', correct: 'Mijn favoriete kleur is blauw.', opts: ['Mijn favoriete kleur is blauw.', 'Ik favoriete blauw.', 'Blauw heeft mijn kleur.'], audio: 'Mijn favoriete kleur is blauw.' },
      { t: 'qa', ask: 'Welke kleur is je fiets?', correct: 'Mijn fiets is rood.', opts: ['Mijn fiets is rood.', 'Mijn fiets heeft rood.', 'Rood is mijn fietsen.'], audio: 'Mijn fiets is rood.' },
      { t: 'qa', ask: 'Hou je van roze?', correct: 'Ja, ik hou van roze.', opts: ['Ja, ik hou van roze.', 'Ja, ik ben roze.', 'Ja, ik roze van hou.'], audio: 'Ja, ik hou van roze.' },

      { t: 'scramble', bag: ['De', 'appel', 'is', 'rood'], correct: 'De appel is rood.' },
      { t: 'scramble', bag: ['Mijn', 'trui', 'is', 'blauw'], correct: 'Mijn trui is blauw.' },
      { t: 'scramble', bag: ['Ik', 'hou', 'van', 'groen'], correct: 'Ik hou van groen.' },
      { t: 'scramble', bag: ['De', 'hond', 'is', 'bruin'], correct: 'De hond is bruin.' },
      { t: 'scramble', bag: ['Welke', 'kleur', 'is', 'het'], correct: 'Welke kleur is het?' },

      { t: 'sent', correct: 'De auto is blauw.', opts: ['De auto is blauw.', 'De auto zijn blauw.', 'De blauw is auto.'] },
      { t: 'sent', correct: 'Mijn favoriete kleur is groen.', opts: ['Mijn favoriete kleur is groen.', 'Mijn favoriet kleur zijn groen.', 'Mijn kleur favoriete is groen.'] },
      { t: 'sent', correct: 'Ik heb een rode bal.', opts: ['Ik heb een rode bal.', 'Ik heb een rood bal.', 'Ik heb een bal rode.'] },

      { t: 'odd', ask: 'Welk woord hoort er niet bij?', correct: 'hond', opts: ['rood', 'blauw', 'geel', 'hond'] },
      { t: 'odd', ask: 'Welk woord hoort er niet bij?', correct: 'drie', opts: ['zwart', 'wit', 'grijs', 'drie'] },
      { t: 'odd', ask: 'Welk woord hoort er niet bij?', correct: 'lopen', opts: ['paars', 'roze', 'oranje', 'lopen'] },

      { t: 'guess', ask: 'De sneeuw heeft deze kleur. Welke kleur?', correct: 'wit' },
      { t: 'guess', ask: 'Het gras heeft deze kleur. Welke kleur?', correct: 'groen' },
      { t: 'guess', ask: 'De zon heeft deze kleur. Welke kleur?', correct: 'geel' },
      { t: 'guess', ask: 'Chocolade heeft deze kleur. Welke kleur?', correct: 'bruin' },

      { t: 'make', ask: 'Maak een zin met "rood".', example: 'Mijn bal is rood.' },
      { t: 'make', ask: 'Maak een zin met "blauw".', example: 'De auto is blauw.' },
      { t: 'make', ask: 'Vertel welke kleur je kamer is.', example: 'Mijn kamer is blauw en wit.' },

      { t: 'cloze', ask: 'Ik zie drie ___ ballen. 🔴', correct: 'rode', opts: ['rode', 'rood', 'roden'], audio: 'Ik zie drie rode ballen.' },
      { t: 'tf', ask: 'Mijn kamer kan blauw zijn.', correct: true }
    ]
  });

  /* ======================================================================
     3 · GETALLEN 🔢
     ====================================================================== */
  THEMES.push({
    id: 'numbers', name: 'Getallen', icon: '🔢', frame: 'Ik ben ___ jaar',
    words: [
      { w: 'nul', e: '0️⃣', pt: 'zero' },
      { w: 'een', e: '1️⃣', pt: 'um' },
      { w: 'twee', e: '2️⃣', pt: 'dois' },
      { w: 'drie', e: '3️⃣', pt: 'três' },
      { w: 'vier', e: '4️⃣', pt: 'quatro' },
      { w: 'vijf', e: '5️⃣', pt: 'cinco' },
      { w: 'zes', e: '6️⃣', pt: 'seis' },
      { w: 'zeven', e: '7️⃣', pt: 'sete' },
      { w: 'acht', e: '8️⃣', pt: 'oito' },
      { w: 'negen', e: '9️⃣', pt: 'nove' },
      { w: 'tien', e: '🔟', pt: 'dez' }
    ],
    vocab: [
      { w: 'elf', pt: 'onze' }, { w: 'twaalf', pt: 'doze' },
      { w: 'dertien', pt: 'treze' }, { w: 'veertien', pt: 'catorze' },
      { w: 'vijftien', pt: 'quinze' }, { w: 'zestien', pt: 'dezesseis' },
      { w: 'zeventien', pt: 'dezessete' }, { w: 'achttien', pt: 'dezoito' },
      { w: 'negentien', pt: 'dezenove' }, { w: 'twintig', pt: 'vinte' },
      { w: 'dertig', pt: 'trinta' }, { w: 'veertig', pt: 'quarenta' },
      { w: 'vijftig', pt: 'cinquenta' }, { w: 'honderd', pt: 'cem' },
      { w: 'hoeveel', pt: 'quantos' }, { w: 'hoe oud', pt: 'que idade' },
      { w: 'jaar', pt: 'ano(s)' }, { w: 'tellen', pt: 'contar' },
      { w: 'er zijn', pt: 'há / existem' }
    ],
    say: [
      { nl: 'Een, twee, drie!', pt: 'Um, dois, três!' },
      { nl: 'Ik ben acht jaar.', pt: 'Eu tenho oito anos.' },
      { nl: 'Ik heb twee handen.', pt: 'Eu tenho duas mãos.' },
      { nl: 'Tel tot vijf!', pt: 'Conte até cinco!' },
      { nl: 'Ik heb tien vingers.', pt: 'Eu tenho dez dedos.' },
      { nl: 'Ik zie drie katten.', pt: 'Eu vejo três gatos.' },
      { nl: 'Er zijn vijf appels.', pt: 'Há cinco maçãs.' },
      { nl: 'Ik heb twee honden.', pt: 'Eu tenho dois cachorros.' },
      { nl: 'Tel met mij mee: een, twee, drie, vier!', pt: 'Conte comigo: um, dois, três, quatro!' },
      { nl: 'Hoeveel appels zijn er?', pt: 'Quantas maçãs há?' },
      { nl: 'Mijn zus is twaalf jaar.', pt: 'A minha irmã tem doze anos.' },
      { nl: 'Ik heb twintig blokken.', pt: 'Eu tenho vinte blocos.' }
    ],
    items: [
      { t: 'cloze', ask: 'Ik ben ___ jaar. 8️⃣', correct: 'acht', opts: ['acht', 'blauw', 'brood'], audio: 'Ik ben acht jaar.' },
      { t: 'cloze', ask: 'Ik heb ___ handen. ✋✋', correct: 'twee', opts: ['twee', 'tien', 'zes'], audio: 'Ik heb twee handen.' },
      { t: 'cloze', ask: 'Ik heb ___ vingers. 🖐️🖐️', correct: 'tien', opts: ['tien', 'drie', 'een'], audio: 'Ik heb tien vingers.' },
      { t: 'cloze', ask: 'Ik zie ___ katten. 🐱🐱🐱', correct: 'drie', opts: ['drie', 'zeven', 'negen'], audio: 'Ik zie drie katten.' },
      { t: 'cloze', ask: 'Er zijn ___ appels. 🍎🍎🍎🍎🍎', correct: 'vijf', opts: ['vijf', 'twee', 'acht'], audio: 'Er zijn vijf appels.' },
      { t: 'cloze', ask: 'Ik heb ___ ogen. 👁️👁️', correct: 'twee', opts: ['twee', 'vier', 'tien'], audio: 'Ik heb twee ogen.' },
      { t: 'cloze', ask: 'Na tien komt ___.', correct: 'elf', opts: ['elf', 'negen', 'twintig'], audio: 'Na tien komt elf.' },
      { t: 'cloze', ask: 'Na negentien komt ___.', correct: 'twintig', opts: ['twintig', 'twaalf', 'dertig'], audio: 'Na negentien komt twintig.' },
      { t: 'cloze', ask: 'Twee plus twee is ___.', correct: 'vier', opts: ['vier', 'drie', 'zes'], audio: 'Twee plus twee is vier.' },
      { t: 'cloze', ask: 'Vijf plus vijf is ___.', correct: 'tien', opts: ['tien', 'acht', 'twaalf'], audio: 'Vijf plus vijf is tien.' },
      { t: 'cloze', ask: 'Een hond heeft ___ poten. 🐶', correct: 'vier', opts: ['vier', 'twee', 'zes'], audio: 'Een hond heeft vier poten.' },
      { t: 'cloze', ask: 'Mijn zus is ___ jaar. 1️⃣2️⃣', correct: 'twaalf', opts: ['twaalf', 'twee', 'twintig'], audio: 'Mijn zus is twaalf jaar.' },

      { t: 'tf', ask: 'Na drie komt vier.', correct: true },
      { t: 'tf', ask: 'Na zes komt tien.', correct: false },
      { t: 'tf', ask: 'Ik heb twee ogen.', correct: true },
      { t: 'tf', ask: 'Ik heb vijf handen.', correct: false },
      { t: 'tf', ask: 'Een kat heeft vier poten.', correct: true },
      { t: 'tf', ask: 'Twee plus drie is zes.', correct: false },
      { t: 'tf', ask: 'Tien is meer dan vijf.', correct: true },
      { t: 'tf', ask: 'Een vogel heeft twee vleugels.', correct: true },

      { t: 'qa', ask: 'Hoe oud ben je?', correct: 'Ik ben acht jaar.', opts: ['Ik ben acht jaar.', 'Ik heb acht jaar.', 'Ik ben acht jaren.'], audio: 'Ik ben acht jaar.' },
      { t: 'qa', ask: 'Hoeveel katten zie je? 🐱🐱', correct: 'Ik zie twee katten.', opts: ['Ik zie twee katten.', 'Ik zie twee kat.', 'Ik ben twee katten.'], audio: 'Ik zie twee katten.' },
      { t: 'qa', ask: 'Hoeveel appels zijn er? 🍎🍎🍎', correct: 'Er zijn drie appels.', opts: ['Er zijn drie appels.', 'Er is drie appels.', 'Er zijn drie appel.'], audio: 'Er zijn drie appels.' },
      { t: 'qa', ask: 'Hoeveel vingers heb je?', correct: 'Ik heb tien vingers.', opts: ['Ik heb tien vingers.', 'Ik ben tien vingers.', 'Ik heb tien vinger.'], audio: 'Ik heb tien vingers.' },
      { t: 'qa', ask: 'Hoeveel honden heb je? 🐶', correct: 'Ik heb een hond.', opts: ['Ik heb een hond.', 'Ik heb een honden.', 'Ik ben een hond.'], audio: 'Ik heb een hond.' },

      { t: 'scramble', bag: ['Ik', 'ben', 'acht', 'jaar'], correct: 'Ik ben acht jaar.' },
      { t: 'scramble', bag: ['Ik', 'zie', 'drie', 'katten'], correct: 'Ik zie drie katten.' },
      { t: 'scramble', bag: ['Er', 'zijn', 'vijf', 'appels'], correct: 'Er zijn vijf appels.' },
      { t: 'scramble', bag: ['Ik', 'heb', 'tien', 'vingers'], correct: 'Ik heb tien vingers.' },
      { t: 'scramble', bag: ['Hoe', 'oud', 'ben', 'je'], correct: 'Hoe oud ben je?' },

      { t: 'sent', correct: 'Ik ben negen jaar.', opts: ['Ik ben negen jaar.', 'Ik heb negen jaar.', 'Ik ben negen jaren.'] },
      { t: 'sent', correct: 'Ik heb twee honden.', opts: ['Ik heb twee honden.', 'Ik heb twee hond.', 'Ik ben twee honden.'] },
      { t: 'sent', correct: 'Er zijn vier stoelen.', opts: ['Er zijn vier stoelen.', 'Er is vier stoelen.', 'Er zijn vier stoel.'] },

      { t: 'odd', ask: 'Welk woord hoort er niet bij?', correct: 'groen', opts: ['een', 'twee', 'drie', 'groen'] },
      { t: 'odd', ask: 'Welk woord hoort er niet bij?', correct: 'hond', opts: ['acht', 'negen', 'tien', 'hond'] },
      { t: 'odd', ask: 'Welk woord hoort er niet bij?', correct: 'slapen', opts: ['twaalf', 'twintig', 'dertig', 'slapen'] },

      { t: 'guess', ask: 'Het komt na twee en voor vier. Welk getal?', correct: 'drie' },
      { t: 'guess', ask: 'Het komt na negen. Welk getal?', correct: 'tien' },
      { t: 'guess', ask: 'Zoveel ogen heb je. Welk getal?', correct: 'twee' },
      { t: 'guess', ask: 'Zoveel vingers heb je. Welk getal?', correct: 'tien' },

      { t: 'make', ask: 'Maak een zin met "drie".', example: 'Ik zie drie vogels.' },
      { t: 'make', ask: 'Maak een zin met "jaar".', example: 'Ik ben acht jaar.' },
      { t: 'make', ask: 'Tel van een tot tien.', example: 'Een, twee, drie, vier, vijf, zes, zeven, acht, negen, tien.' },

      { t: 'cloze', ask: 'Ik zie ___ blauwe auto’s. 🚗🚗', correct: 'twee', opts: ['twee', 'zeven', 'nul'], audio: 'Ik zie twee blauwe auto’s.' },
      { t: 'tf', ask: 'Er zijn zeven dagen in een week.', correct: true }
    ]
  });

  /* ======================================================================
     4 · DIEREN 🐶
     ====================================================================== */
  THEMES.push({
    id: 'animals', name: 'Dieren', icon: '🐶', frame: 'Ik zie een ___',
    words: [
      { w: 'hond', e: '🐶', pt: 'cachorro' },
      { w: 'kat', e: '🐱', pt: 'gato' },
      { w: 'vogel', e: '🐦', pt: 'pássaro' },
      { w: 'vis', e: '🐟', pt: 'peixe' },
      { w: 'paard', e: '🐴', pt: 'cavalo' },
      { w: 'koe', e: '🐮', pt: 'vaca' },
      { w: 'schaap', e: '🐑', pt: 'ovelha' },
      { w: 'konijn', e: '🐰', pt: 'coelho' },
      { w: 'muis', e: '🐭', pt: 'rato' },
      { w: 'eend', e: '🦆', pt: 'pato' },
      { w: 'kip', e: '🐔', pt: 'galinha' },
      { w: 'varken', e: '🐷', pt: 'porco' },
      { w: 'leeuw', e: '🦁', pt: 'leão' },
      { w: 'olifant', e: '🐘', pt: 'elefante' },
      { w: 'aap', e: '🐵', pt: 'macaco' },
      { w: 'beer', e: '🐻', pt: 'urso' }
    ],
    vocab: [
      { w: 'dier', pt: 'animal' }, { w: 'huisdier', pt: 'animal de estimação' },
      { w: 'groot', pt: 'grande' }, { w: 'klein', pt: 'pequeno' },
      { w: 'vliegen', pt: 'voar' }, { w: 'zwemmen', pt: 'nadar' },
      { w: 'rennen', pt: 'correr' }, { w: 'slapen', pt: 'dormir' },
      { w: 'heten', pt: 'chamar-se' }, { w: 'lief', pt: 'meigo' }
    ],
    say: [
      { nl: 'Ik zie een hond.', pt: 'Eu vejo um cachorro.' },
      { nl: 'De kat is klein.', pt: 'O gato é pequeno.' },
      { nl: 'Ik hou van dieren.', pt: 'Eu gosto de animais.' },
      { nl: 'Een eend zegt kwak!', pt: 'O pato faz quá!' },
      { nl: 'Dit is een hond.', pt: 'Isto é um cachorro.' },
      { nl: 'De hond is bruin en groot.', pt: 'O cachorro é marrom e grande.' },
      { nl: 'Ik heb een hond.', pt: 'Eu tenho um cachorro.' },
      { nl: 'Mijn hond heet Max.', pt: 'O meu cachorro se chama Max.' },
      { nl: 'De kat slaapt.', pt: 'O gato dorme.' },
      { nl: 'De vogel kan vliegen.', pt: 'O pássaro sabe voar.' },
      { nl: 'De vis zwemt.', pt: 'O peixe nada.' },
      { nl: 'Het paard kan rennen.', pt: 'O cavalo sabe correr.' },
      { nl: 'Ik zie twee katten.', pt: 'Eu vejo dois gatos.' },
      { nl: 'Mijn favoriete dier is een hond.', pt: 'O meu animal favorito é um cachorro.' }
    ],
    items: [
      { t: 'cloze', ask: 'Dit is een ___. 🐶', correct: 'hond', opts: ['hond', 'kat', 'vis'], audio: 'Dit is een hond.' },
      { t: 'cloze', ask: 'De ___ is klein. 🐭', correct: 'muis', opts: ['muis', 'olifant', 'koe'], audio: 'De muis is klein.' },
      { t: 'cloze', ask: 'De ___ is groot. 🐘', correct: 'olifant', opts: ['olifant', 'muis', 'vogel'], audio: 'De olifant is groot.' },
      { t: 'cloze', ask: 'De hond is ___ en bruin.', correct: 'groot', opts: ['groot', 'geel', 'drie'], audio: 'De hond is groot en bruin.' },
      { t: 'cloze', ask: 'Ik heb een ___. 🐱', correct: 'kat', opts: ['kat', 'stoel', 'appel'], audio: 'Ik heb een kat.' },
      { t: 'cloze', ask: 'Mijn hond ___ Max.', correct: 'heet', opts: ['heet', 'heb', 'ben'], audio: 'Mijn hond heet Max.' },
      { t: 'cloze', ask: 'De vogel kan ___. 🐦', correct: 'vliegen', opts: ['vliegen', 'zwemmen', 'lezen'], audio: 'De vogel kan vliegen.' },
      { t: 'cloze', ask: 'De vis kan ___. 🐟', correct: 'zwemmen', opts: ['zwemmen', 'vliegen', 'zingen'], audio: 'De vis kan zwemmen.' },
      { t: 'cloze', ask: 'Het paard kan ___. 🐴', correct: 'rennen', opts: ['rennen', 'vliegen', 'lezen'], audio: 'Het paard kan rennen.' },
      { t: 'cloze', ask: 'De kat ___ op mijn bed. 😴', correct: 'slaapt', opts: ['slaapt', 'eet', 'vliegt'], audio: 'De kat slaapt op mijn bed.' },
      { t: 'cloze', ask: 'De ___ geeft melk. 🐮', correct: 'koe', opts: ['koe', 'kip', 'leeuw'], audio: 'De koe geeft melk.' },
      { t: 'cloze', ask: 'De ___ legt eieren. 🐔', correct: 'kip', opts: ['kip', 'aap', 'beer'], audio: 'De kip legt eieren.' },

      { t: 'tf', ask: 'Een vis kan vliegen.', correct: false },
      { t: 'tf', ask: 'Een vogel kan vliegen.', correct: true },
      { t: 'tf', ask: 'Een olifant is klein.', correct: false },
      { t: 'tf', ask: 'Een muis is klein.', correct: true },
      { t: 'tf', ask: 'Een hond zegt woef.', correct: true },
      { t: 'tf', ask: 'Een kat zegt kwak.', correct: false },
      { t: 'tf', ask: 'Een koe is een dier.', correct: true },
      { t: 'tf', ask: 'Een leeuw is roze.', correct: false },

      { t: 'qa', ask: 'Heb jij een huisdier?', correct: 'Ja, ik heb een hond.', opts: ['Ja, ik heb een hond.', 'Ja, ik ben een hond.', 'Ja, ik hond heb.'], audio: 'Ja, ik heb een hond.' },
      { t: 'qa', ask: 'Welk dier vind jij leuk?', correct: 'Ik vind katten leuk.', opts: ['Ik vind katten leuk.', 'Ik ben katten leuk.', 'Katten vind leuk ik.'], audio: 'Ik vind katten leuk.' },
      { t: 'qa', ask: 'Wat kan een vogel doen?', correct: 'Een vogel kan vliegen.', opts: ['Een vogel kan vliegen.', 'Een vogel kan vliegt.', 'Een vogel vliegen kan.'], audio: 'Een vogel kan vliegen.' },
      { t: 'qa', ask: 'Kan een vis vliegen?', correct: 'Nee, een vis kan zwemmen.', opts: ['Nee, een vis kan zwemmen.', 'Ja, een vis kan vliegen.', 'Nee, een vis is zwemmen.'], audio: 'Nee, een vis kan zwemmen.' },
      { t: 'qa', ask: 'Hoe heet je hond?', correct: 'Mijn hond heet Max.', opts: ['Mijn hond heet Max.', 'Mijn hond is Max jaar.', 'Ik heet mijn hond.'], audio: 'Mijn hond heet Max.' },

      { t: 'scramble', bag: ['Dit', 'is', 'een', 'hond'], correct: 'Dit is een hond.' },
      { t: 'scramble', bag: ['De', 'kat', 'is', 'klein'], correct: 'De kat is klein.' },
      { t: 'scramble', bag: ['Ik', 'zie', 'twee', 'katten'], correct: 'Ik zie twee katten.' },
      { t: 'scramble', bag: ['De', 'vogel', 'kan', 'vliegen'], correct: 'De vogel kan vliegen.' },
      { t: 'scramble', bag: ['Mijn', 'hond', 'heet', 'Max'], correct: 'Mijn hond heet Max.' },
      { t: 'scramble', bag: ['Ik', 'hou', 'van', 'dieren'], correct: 'Ik hou van dieren.' },

      { t: 'sent', correct: 'De hond is groot.', opts: ['De hond is groot.', 'De hond zijn groot.', 'De hond is grote.'] },
      { t: 'sent', correct: 'Ik heb twee katten.', opts: ['Ik heb twee katten.', 'Ik heb twee kat.', 'Ik ben twee katten.'] },
      { t: 'sent', correct: 'De vis zwemt in het water.', opts: ['De vis zwemt in het water.', 'De vis zwemmen in het water.', 'De vis is zwemt water.'] },

      { t: 'odd', ask: 'Welk woord hoort er niet bij?', correct: 'stoel', opts: ['hond', 'kat', 'vogel', 'stoel'] },
      { t: 'odd', ask: 'Welk dier woont niet op de boerderij?', correct: 'leeuw', opts: ['koe', 'kip', 'schaap', 'leeuw'] },
      { t: 'odd', ask: 'Welk woord hoort er niet bij?', correct: 'blauw', opts: ['muis', 'konijn', 'beer', 'blauw'] },

      { t: 'guess', ask: 'Het is klein, het zegt miauw en het slaapt veel.', correct: 'kat' },
      { t: 'guess', ask: 'Het zegt woef en het is de vriend van de mens.', correct: 'hond' },
      { t: 'guess', ask: 'Het is groot, grijs en het heeft een lange neus.', correct: 'olifant' },
      { t: 'guess', ask: 'Het zwemt in het water en het heeft geen poten.', correct: 'vis' },

      { t: 'make', ask: 'Maak een zin met "hond".', example: 'Ik heb een grote hond.' },
      { t: 'make', ask: 'Maak een zin met "kat".', example: 'De kat is klein en wit.' },
      { t: 'make', ask: 'Vertel over je favoriete dier.', example: 'Mijn favoriete dier is een hond. Hij is groot en bruin.' },

      { t: 'cloze', ask: 'Ik zie ___ eenden in het water. 🦆🦆🦆🦆', correct: 'vier', opts: ['vier', 'tien', 'een'], audio: 'Ik zie vier eenden in het water.' },
      { t: 'cloze', ask: 'De ___ is wit en zwart. 🐮', correct: 'koe', opts: ['koe', 'leeuw', 'aap'], audio: 'De koe is wit en zwart.' }
    ]
  });

  /* ======================================================================
     5 · ETEN 🍎
     ====================================================================== */
  THEMES.push({
    id: 'food', name: 'Eten', icon: '🍎', frame: 'Ik hou van ___',
    words: [
      { w: 'appel', e: '🍎', pt: 'maçã' },
      { w: 'banaan', e: '🍌', pt: 'banana' },
      { w: 'brood', e: '🍞', pt: 'pão' },
      { w: 'melk', e: '🥛', pt: 'leite' },
      { w: 'ei', e: '🥚', pt: 'ovo' },
      { w: 'kaas', e: '🧀', pt: 'queijo' },
      { w: 'taart', e: '🍰', pt: 'bolo' },
      { w: 'water', e: '💧', pt: 'água' },
      { w: 'pizza', e: '🍕', pt: 'pizza' },
      { w: 'rijst', e: '🍚', pt: 'arroz' },
      { w: 'soep', e: '🍲', pt: 'sopa' },
      { w: 'kip', e: '🍗', pt: 'frango' },
      { w: 'sap', e: '🧃', pt: 'suco' },
      { w: 'thee', e: '🍵', pt: 'chá' },
      { w: 'koekje', e: '🍪', pt: 'biscoito' },
      { w: 'ijs', e: '🍦', pt: 'sorvete' }
    ],
    vocab: [
      { w: 'eten', pt: 'comer' }, { w: 'drinken', pt: 'beber' },
      { w: 'lekker', pt: 'gostoso' }, { w: 'honger', pt: 'fome' },
      { w: 'dorst', pt: 'sede' }, { w: 'ontbijt', pt: 'café da manhã' },
      { w: 'lusten', pt: 'gostar de (comida)' }, { w: 'vies', pt: 'ruim, nojento' }
    ],
    say: [
      { nl: 'Ik hou van appels.', pt: 'Eu gosto de maçãs.' },
      { nl: 'Ik drink melk.', pt: 'Eu bebo leite.' },
      { nl: 'Ik eet brood.', pt: 'Eu como pão.' },
      { nl: 'Taart is lekker!', pt: 'Bolo é gostoso!' },
      { nl: 'Ik eet een appel.', pt: 'Eu como uma maçã.' },
      { nl: 'Ik lust pizza.', pt: 'Eu gosto de pizza.' },
      { nl: 'Ik heb honger.', pt: 'Estou com fome.' },
      { nl: 'Ik heb dorst.', pt: 'Estou com sede.' },
      { nl: 'Ik drink water.', pt: 'Eu bebo água.' },
      { nl: 'Ik eet brood en ik drink melk.', pt: 'Eu como pão e bebo leite.' },
      { nl: 'Kaas is lekker.', pt: 'Queijo é gostoso.' },
      { nl: 'Als ontbijt eet ik brood met kaas.', pt: 'No café da manhã eu como pão com queijo.' }
    ],
    items: [
      { t: 'cloze', ask: 'Ik eet een ___. 🍎', correct: 'appel', opts: ['appel', 'melk', 'stoel'], audio: 'Ik eet een appel.' },
      { t: 'cloze', ask: 'Ik drink ___. 🥛', correct: 'melk', opts: ['melk', 'brood', 'kaas'], audio: 'Ik drink melk.' },
      { t: 'cloze', ask: 'Ik eet ___ met kaas. 🍞', correct: 'brood', opts: ['brood', 'water', 'sap'], audio: 'Ik eet brood met kaas.' },
      { t: 'cloze', ask: 'De ___ is geel. 🍌', correct: 'banaan', opts: ['banaan', 'soep', 'ei'], audio: 'De banaan is geel.' },
      { t: 'cloze', ask: 'Ik heb ___. Ik wil eten.', correct: 'honger', opts: ['honger', 'dorst', 'water'], audio: 'Ik heb honger. Ik wil eten.' },
      { t: 'cloze', ask: 'Ik heb ___. Ik wil drinken.', correct: 'dorst', opts: ['dorst', 'honger', 'brood'], audio: 'Ik heb dorst. Ik wil drinken.' },
      { t: 'cloze', ask: 'De taart is heel ___. 🍰', correct: 'lekker', opts: ['lekker', 'groot', 'blauw'], audio: 'De taart is heel lekker.' },
      { t: 'cloze', ask: 'Ik ___ een koekje. 🍪', correct: 'eet', opts: ['eet', 'drink', 'slaap'], audio: 'Ik eet een koekje.' },
      { t: 'cloze', ask: 'Ik ___ sap. 🧃', correct: 'drink', opts: ['drink', 'eet', 'lees'], audio: 'Ik drink sap.' },
      { t: 'cloze', ask: 'Als ___ eet ik brood.', correct: 'ontbijt', opts: ['ontbijt', 'honger', 'kaas'], audio: 'Als ontbijt eet ik brood.' },
      { t: 'cloze', ask: 'Ik eet ___ met kip. 🍚', correct: 'rijst', opts: ['rijst', 'thee', 'ijs'], audio: 'Ik eet rijst met kip.' },
      { t: 'cloze', ask: 'De ___ is warm. 🍲', correct: 'soep', opts: ['soep', 'melk', 'appel'], audio: 'De soep is warm.' },

      { t: 'tf', ask: 'Een appel is blauw.', correct: false },
      { t: 'tf', ask: 'Melk is wit.', correct: true },
      { t: 'tf', ask: 'Ik drink brood.', correct: false },
      { t: 'tf', ask: 'Ik eet een banaan.', correct: true },
      { t: 'tf', ask: 'IJs is koud.', correct: true },
      { t: 'tf', ask: 'Soep is koud.', correct: false },
      { t: 'tf', ask: 'Kaas komt van melk.', correct: true },
      { t: 'tf', ask: 'Water is lekker als je dorst hebt.', correct: true },

      { t: 'qa', ask: 'Wat eet je? 🍎', correct: 'Ik eet een appel.', opts: ['Ik eet een appel.', 'Ik drink een appel.', 'Ik ben een appel.'], audio: 'Ik eet een appel.' },
      { t: 'qa', ask: 'Wat drink je? 🥛', correct: 'Ik drink melk.', opts: ['Ik drink melk.', 'Ik eet melk.', 'Ik ben melk.'], audio: 'Ik drink melk.' },
      { t: 'qa', ask: 'Vind je kaas lekker?', correct: 'Ja, kaas is lekker.', opts: ['Ja, kaas is lekker.', 'Ja, kaas ben lekker.', 'Ja, ik kaas lekker.'], audio: 'Ja, kaas is lekker.' },
      { t: 'qa', ask: 'Wat eet je als ontbijt?', correct: 'Ik eet brood met kaas.', opts: ['Ik eet brood met kaas.', 'Ik ontbijt brood kaas.', 'Ik eet brood en kaas is.'], audio: 'Ik eet brood met kaas.' },
      { t: 'qa', ask: 'Heb je honger?', correct: 'Ja, ik heb honger.', opts: ['Ja, ik heb honger.', 'Ja, ik ben honger.', 'Ja, ik honger heb niet.'], audio: 'Ja, ik heb honger.' },

      { t: 'scramble', bag: ['Ik', 'eet', 'een', 'appel'], correct: 'Ik eet een appel.' },
      { t: 'scramble', bag: ['Ik', 'drink', 'melk'], correct: 'Ik drink melk.' },
      { t: 'scramble', bag: ['Ik', 'hou', 'van', 'pizza'], correct: 'Ik hou van pizza.' },
      { t: 'scramble', bag: ['Ik', 'heb', 'honger'], correct: 'Ik heb honger.' },
      { t: 'scramble', bag: ['Ik', 'eet', 'brood', 'en', 'ik', 'drink', 'melk'], correct: 'Ik eet brood en ik drink melk.' },

      { t: 'sent', correct: 'Ik eet een appel.', opts: ['Ik eet een appel.', 'Ik eet een appels.', 'Ik ben een appel.'] },
      { t: 'sent', correct: 'Ik hou van kaas.', opts: ['Ik hou van kaas.', 'Ik hou kaas van.', 'Ik houd van kazen veel.'] },
      { t: 'sent', correct: 'De soep is warm.', opts: ['De soep is warm.', 'De soep zijn warm.', 'De warm is soep.'] },

      { t: 'odd', ask: 'Wat kun je niet drinken?', correct: 'brood', opts: ['melk', 'water', 'sap', 'brood'] },
      { t: 'odd', ask: 'Welk woord hoort er niet bij?', correct: 'stoel', opts: ['appel', 'banaan', 'kaas', 'stoel'] },
      { t: 'odd', ask: 'Welk woord hoort er niet bij?', correct: 'rennen', opts: ['soep', 'rijst', 'pizza', 'rennen'] },

      { t: 'guess', ask: 'Het is rood of groen, het is fruit en het is rond.', correct: 'appel' },
      { t: 'guess', ask: 'Het is geel, lang en een aap eet het graag.', correct: 'banaan' },
      { t: 'guess', ask: 'Het is wit en je drinkt het. Het komt van de koe.', correct: 'melk' },
      { t: 'guess', ask: 'Het is koud, zoet en je eet het in de zomer.', correct: 'ijs' },

      { t: 'make', ask: 'Maak een zin met "appel".', example: 'Ik eet een appel.' },
      { t: 'make', ask: 'Maak een zin met "drinken".', example: 'Ik drink water.' },
      { t: 'make', ask: 'Vertel wat je vandaag eet.', example: 'Vandaag eet ik brood, kaas en een appel.' },

      { t: 'cloze', ask: 'Ik eet ___ appels. 🍎🍎', correct: 'twee', opts: ['twee', 'rood', 'groot'], audio: 'Ik eet twee appels.' },
      { t: 'cloze', ask: 'De appel is ___ en de banaan is geel.', correct: 'rood', opts: ['rood', 'koud', 'klein'], audio: 'De appel is rood en de banaan is geel.' }
    ]
  });

  /* ======================================================================
     6 · MIJN LICHAAM 👀
     ====================================================================== */
  THEMES.push({
    id: 'body', name: 'Mijn lichaam', icon: '👀', frame: 'Dit is mijn ___',
    words: [
      { w: 'hoofd', e: '🧠', pt: 'cabeça' },
      { w: 'haar', e: '💇', pt: 'cabelo' },
      { w: 'oog', e: '👁️', pt: 'olho' },
      { w: 'oor', e: '👂', pt: 'orelha' },
      { w: 'neus', e: '👃', pt: 'nariz' },
      { w: 'mond', e: '👄', pt: 'boca' },
      { w: 'tand', e: '🦷', pt: 'dente' },
      { w: 'tong', e: '👅', pt: 'língua' },
      { w: 'arm', e: '💪', pt: 'braço' },
      { w: 'hand', e: '✋', pt: 'mão' },
      { w: 'vinger', e: '👆', pt: 'dedo' },
      { w: 'been', e: '🦵', pt: 'perna' },
      { w: 'voet', e: '🦶', pt: 'pé' },
      { w: 'buik', e: '🫃', pt: 'barriga' },
      { w: 'hart', e: '❤️', pt: 'coração' }
    ],
    vocab: [
      { w: 'ogen', pt: 'olhos' }, { w: 'oren', pt: 'orelhas' },
      { w: 'handen', pt: 'mãos' }, { w: 'benen', pt: 'pernas' },
      { w: 'vingers', pt: 'dedos' }, { w: 'zien', pt: 'ver' },
      { w: 'horen', pt: 'ouvir' }, { w: 'ruiken', pt: 'cheirar' },
      { w: 'lopen', pt: 'andar' }, { w: 'aanraken', pt: 'tocar' },
      { w: 'wassen', pt: 'lavar' }
    ],
    say: [
      { nl: 'Dit is mijn neus.', pt: 'Este é o meu nariz.' },
      { nl: 'Dit is mijn hand.', pt: 'Esta é a minha mão.' },
      { nl: 'Ik heb twee ogen.', pt: 'Eu tenho dois olhos.' },
      { nl: 'Ik heb twee oren.', pt: 'Eu tenho duas orelhas.' },
      { nl: 'Ik heb tien vingers.', pt: 'Eu tenho dez dedos.' },
      { nl: 'Mijn haar is bruin.', pt: 'O meu cabelo é castanho.' },
      { nl: 'Ik zie met mijn ogen.', pt: 'Eu vejo com os meus olhos.' },
      { nl: 'Ik hoor met mijn oren.', pt: 'Eu ouço com as minhas orelhas.' },
      { nl: 'Ik loop met mijn benen.', pt: 'Eu ando com as minhas pernas.' },
      { nl: 'Ik was mijn handen.', pt: 'Eu lavo as minhas mãos.' },
      { nl: 'Waar is je neus?', pt: 'Onde está o teu nariz?' },
      { nl: 'Raak je hoofd aan!', pt: 'Toca na tua cabeça!' }
    ],
    items: [
      { t: 'cloze', ask: 'Dit is mijn ___. ✋', correct: 'hand', opts: ['hand', 'neus', 'oor'], audio: 'Dit is mijn hand.' },
      { t: 'cloze', ask: 'Ik heb twee ___. 👁️👁️', correct: 'ogen', opts: ['ogen', 'oog', 'neus'], audio: 'Ik heb twee ogen.' },
      { t: 'cloze', ask: 'Ik heb twee ___. 👂👂', correct: 'oren', opts: ['oren', 'oor', 'monden'], audio: 'Ik heb twee oren.' },
      { t: 'cloze', ask: 'Ik heb tien ___. 👆', correct: 'vingers', opts: ['vingers', 'vinger', 'voeten'], audio: 'Ik heb tien vingers.' },
      { t: 'cloze', ask: 'Ik zie met mijn ___.', correct: 'ogen', opts: ['ogen', 'oren', 'benen'], audio: 'Ik zie met mijn ogen.' },
      { t: 'cloze', ask: 'Ik hoor met mijn ___.', correct: 'oren', opts: ['oren', 'ogen', 'handen'], audio: 'Ik hoor met mijn oren.' },
      { t: 'cloze', ask: 'Ik loop met mijn ___.', correct: 'benen', opts: ['benen', 'oren', 'tanden'], audio: 'Ik loop met mijn benen.' },
      { t: 'cloze', ask: 'Ik ruik met mijn ___.', correct: 'neus', opts: ['neus', 'mond', 'voet'], audio: 'Ik ruik met mijn neus.' },
      { t: 'cloze', ask: 'Ik eet met mijn ___.', correct: 'mond', opts: ['mond', 'oor', 'arm'], audio: 'Ik eet met mijn mond.' },
      { t: 'cloze', ask: 'Mijn ___ is bruin. 💇', correct: 'haar', opts: ['haar', 'hart', 'hand'], audio: 'Mijn haar is bruin.' },
      { t: 'cloze', ask: 'Ik was mijn ___ met water. ✋✋', correct: 'handen', opts: ['handen', 'hand', 'hoofd'], audio: 'Ik was mijn handen met water.' },
      { t: 'cloze', ask: 'Mijn ___ doet pijn. Ik eet te veel. 🫃', correct: 'buik', opts: ['buik', 'tong', 'oor'], audio: 'Mijn buik doet pijn.' },

      { t: 'tf', ask: 'Ik heb twee ogen.', correct: true },
      { t: 'tf', ask: 'Ik heb drie oren.', correct: false },
      { t: 'tf', ask: 'Ik zie met mijn oren.', correct: false },
      { t: 'tf', ask: 'Ik loop met mijn benen.', correct: true },
      { t: 'tf', ask: 'Ik heb tien vingers.', correct: true },
      { t: 'tf', ask: 'Mijn neus is op mijn voet.', correct: false },
      { t: 'tf', ask: 'Ik hoor met mijn oren.', correct: true },
      { t: 'tf', ask: 'Een hand heeft vijf vingers.', correct: true },

      { t: 'qa', ask: 'Waar is je neus?', correct: 'Hier is mijn neus.', opts: ['Hier is mijn neus.', 'Hier ben mijn neus.', 'Mijn neus hier is niet.'], audio: 'Hier is mijn neus.' },
      { t: 'qa', ask: 'Hoeveel ogen heb je?', correct: 'Ik heb twee ogen.', opts: ['Ik heb twee ogen.', 'Ik ben twee ogen.', 'Ik heb twee oog.'], audio: 'Ik heb twee ogen.' },
      { t: 'qa', ask: 'Waarmee zie je?', correct: 'Ik zie met mijn ogen.', opts: ['Ik zie met mijn ogen.', 'Ik zie met mijn oren.', 'Ik zie mijn ogen met.'], audio: 'Ik zie met mijn ogen.' },
      { t: 'qa', ask: 'Welke kleur is je haar?', correct: 'Mijn haar is bruin.', opts: ['Mijn haar is bruin.', 'Mijn haar heeft bruin.', 'Bruin is mijn haren.'], audio: 'Mijn haar is bruin.' },
      { t: 'qa', ask: 'Raak je hoofd aan. Wat is dit? 🧠', correct: 'Dit is mijn hoofd.', opts: ['Dit is mijn hoofd.', 'Dit is mijn voet.', 'Dit ben mijn hoofd.'], audio: 'Dit is mijn hoofd.' },

      { t: 'scramble', bag: ['Dit', 'is', 'mijn', 'hand'], correct: 'Dit is mijn hand.' },
      { t: 'scramble', bag: ['Ik', 'heb', 'twee', 'ogen'], correct: 'Ik heb twee ogen.' },
      { t: 'scramble', bag: ['Ik', 'zie', 'met', 'mijn', 'ogen'], correct: 'Ik zie met mijn ogen.' },
      { t: 'scramble', bag: ['Mijn', 'haar', 'is', 'bruin'], correct: 'Mijn haar is bruin.' },
      { t: 'scramble', bag: ['Waar', 'is', 'je', 'neus'], correct: 'Waar is je neus?' },

      { t: 'sent', correct: 'Ik heb twee handen.', opts: ['Ik heb twee handen.', 'Ik heb twee hand.', 'Ik ben twee handen.'] },
      { t: 'sent', correct: 'Dit is mijn oor.', opts: ['Dit is mijn oor.', 'Dit zijn mijn oor.', 'Dit is mijn oren.'] },
      { t: 'sent', correct: 'Ik loop met mijn benen.', opts: ['Ik loop met mijn benen.', 'Ik loop met mijn been twee.', 'Ik lopen met mijn benen.'] },

      { t: 'odd', ask: 'Welk woord hoort er niet bij?', correct: 'auto', opts: ['oog', 'oor', 'neus', 'auto'] },
      { t: 'odd', ask: 'Welk woord hoort er niet bij?', correct: 'melk', opts: ['hand', 'arm', 'vinger', 'melk'] },
      { t: 'odd', ask: 'Wat zit niet op je hoofd?', correct: 'voet', opts: ['haar', 'oog', 'mond', 'voet'] },

      { t: 'guess', ask: 'Je hebt er twee en je ziet ermee.', correct: 'ogen' },
      { t: 'guess', ask: 'Je hebt er twee en je hoort ermee.', correct: 'oren' },
      { t: 'guess', ask: 'Je ruikt ermee en het zit in je gezicht.', correct: 'neus' },
      { t: 'guess', ask: 'Je hebt er tien: vijf op elke hand.', correct: 'vingers' },

      { t: 'make', ask: 'Maak een zin met "hand".', example: 'Dit is mijn hand.' },
      { t: 'make', ask: 'Maak een zin met "ogen".', example: 'Ik heb twee blauwe ogen.' },
      { t: 'make', ask: 'Vertel wat je met je lichaam kan doen.', example: 'Ik zie met mijn ogen en ik loop met mijn benen.' },

      { t: 'cloze', ask: 'Mijn ogen zijn ___. 🔵', correct: 'blauw', opts: ['blauw', 'acht', 'lekker'], audio: 'Mijn ogen zijn blauw.' },
      { t: 'tf', ask: 'Een hond heeft ook twee oren.', correct: true }
    ]
  });

  /* ======================================================================
     7 · SPEELGOED 🧸
     ====================================================================== */
  THEMES.push({
    id: 'toys', name: 'Speelgoed', icon: '🧸', frame: 'Ik speel met mijn ___',
    words: [
      { w: 'bal', e: '⚽', pt: 'bola' },
      { w: 'teddybeer', e: '🧸', pt: 'ursinho' },
      { w: 'auto', e: '🚗', pt: 'carro' },
      { w: 'pop', e: '🪆', pt: 'boneca' },
      { w: 'trein', e: '🚂', pt: 'trem' },
      { w: 'fiets', e: '🚲', pt: 'bicicleta' },
      { w: 'blokken', e: '🧱', pt: 'blocos' },
      { w: 'puzzel', e: '🧩', pt: 'quebra-cabeça' },
      { w: 'spel', e: '🎲', pt: 'jogo' },
      { w: 'vlieger', e: '🪁', pt: 'pipa' },
      { w: 'ballon', e: '🎈', pt: 'balão' },
      { w: 'boek', e: '📖', pt: 'livro' },
      { w: 'robot', e: '🤖', pt: 'robô' },
      { w: 'vliegtuig', e: '✈️', pt: 'avião' },
      { w: 'boot', e: '⛵', pt: 'barco' }
    ],
    vocab: [
      { w: 'Lego', pt: 'Lego' }, { w: 'spelen', pt: 'brincar' },
      { w: 'speelgoed', pt: 'brinquedo(s)' }, { w: 'leuk', pt: 'legal, divertido' },
      { w: 'favoriet', pt: 'favorito' }, { w: 'samen', pt: 'juntos' },
      { w: 'nieuw', pt: 'novo' }, { w: 'kapot', pt: 'quebrado' }
    ],
    say: [
      { nl: 'Ik speel met mijn bal.', pt: 'Eu brinco com a minha bola.' },
      { nl: 'Dit is mijn teddybeer.', pt: 'Este é o meu ursinho.' },
      { nl: 'Ik hou van mijn fiets.', pt: 'Eu gosto da minha bicicleta.' },
      { nl: 'Kom, we gaan spelen!', pt: 'Vem, vamos brincar!' },
      { nl: 'Dit is mijn bal.', pt: 'Esta é a minha bola.' },
      { nl: 'Mijn bal is groot en rood.', pt: 'A minha bola é grande e vermelha.' },
      { nl: 'Ik speel met Lego.', pt: 'Eu brinco com Lego.' },
      { nl: 'Ik speel met mijn auto.', pt: 'Eu brinco com o meu carro.' },
      { nl: 'De auto is rood.', pt: 'O carro é vermelho.' },
      { nl: 'Ik speel samen met mijn vriend.', pt: 'Eu brinco junto com o meu amigo.' },
      { nl: 'Mijn favoriete speelgoed is mijn trein.', pt: 'O meu brinquedo favorito é o meu trem.' },
      { nl: 'Ik lees een boek.', pt: 'Eu leio um livro.' }
    ],
    items: [
      { t: 'cloze', ask: 'Dit is mijn ___. ⚽', correct: 'bal', opts: ['bal', 'pop', 'boek'], audio: 'Dit is mijn bal.' },
      { t: 'cloze', ask: 'Ik heb een ___. 🧸', correct: 'teddybeer', opts: ['teddybeer', 'trein', 'ballon'], audio: 'Ik heb een teddybeer.' },
      { t: 'cloze', ask: 'De ___ is rood. 🚗', correct: 'auto', opts: ['auto', 'puzzel', 'boot'], audio: 'De auto is rood.' },
      { t: 'cloze', ask: 'Mijn bal is ___. ⚽', correct: 'groot', opts: ['groot', 'lekker', 'acht'], audio: 'Mijn bal is groot.' },
      { t: 'cloze', ask: 'Ik ___ met Lego. 🧱', correct: 'speel', opts: ['speel', 'eet', 'drink'], audio: 'Ik speel met Lego.' },
      { t: 'cloze', ask: 'Ik speel met mijn ___. 🚗', correct: 'auto', opts: ['auto', 'melk', 'oma'], audio: 'Ik speel met mijn auto.' },
      { t: 'cloze', ask: 'De ___ rijdt op het spoor. 🚂', correct: 'trein', opts: ['trein', 'ballon', 'pop'], audio: 'De trein rijdt op het spoor.' },
      { t: 'cloze', ask: 'De ___ vliegt in de lucht. 🪁', correct: 'vlieger', opts: ['vlieger', 'boot', 'blokken'], audio: 'De vlieger vliegt in de lucht.' },
      { t: 'cloze', ask: 'Ik maak een ___ met veel stukjes. 🧩', correct: 'puzzel', opts: ['puzzel', 'bal', 'fiets'], audio: 'Ik maak een puzzel.' },
      { t: 'cloze', ask: 'Ik lees een ___. 📖', correct: 'boek', opts: ['boek', 'robot', 'auto'], audio: 'Ik lees een boek.' },
      { t: 'cloze', ask: 'Mijn ___ speelgoed is mijn trein.', correct: 'favoriete', opts: ['favoriete', 'favoriet', 'favorieten'], audio: 'Mijn favoriete speelgoed is mijn trein.' },
      { t: 'cloze', ask: 'Ik speel ___ met mijn vriend.', correct: 'samen', opts: ['samen', 'groot', 'koud'], audio: 'Ik speel samen met mijn vriend.' },

      { t: 'tf', ask: 'Een bal is rond.', correct: true },
      { t: 'tf', ask: 'Een teddybeer is een dier.', correct: false },
      { t: 'tf', ask: 'Ik speel met mijn speelgoed.', correct: true },
      { t: 'tf', ask: 'Ik eet mijn bal.', correct: false },
      { t: 'tf', ask: 'Een fiets heeft twee wielen.', correct: true },
      { t: 'tf', ask: 'Een trein is klein en je eet het.', correct: false },
      { t: 'tf', ask: 'Een boot gaat op het water.', correct: true },
      { t: 'tf', ask: 'Een vliegtuig kan vliegen.', correct: true },

      { t: 'qa', ask: 'Wat is je favoriete speelgoed?', correct: 'Mijn favoriete speelgoed is mijn bal.', opts: ['Mijn favoriete speelgoed is mijn bal.', 'Ik favoriete speelgoed bal.', 'Mijn bal is favoriete speelgoed heeft.'], audio: 'Mijn favoriete speelgoed is mijn bal.' },
      { t: 'qa', ask: 'Waar is de bal? ⚽', correct: 'De bal is hier.', opts: ['De bal is hier.', 'De bal ben hier.', 'Hier de bal zijn.'], audio: 'De bal is hier.' },
      { t: 'qa', ask: 'Heb jij Lego?', correct: 'Ja, ik heb Lego.', opts: ['Ja, ik heb Lego.', 'Ja, ik ben Lego.', 'Ja, ik Lego heb niet.'], audio: 'Ja, ik heb Lego.' },
      { t: 'qa', ask: 'Welke kleur is de auto? 🚗', correct: 'De auto is rood.', opts: ['De auto is rood.', 'De auto heeft rood.', 'Rood is de auto’s.'], audio: 'De auto is rood.' },
      { t: 'qa', ask: 'Met wie speel je?', correct: 'Ik speel met mijn vriend.', opts: ['Ik speel met mijn vriend.', 'Ik speel mijn vriend met is.', 'Ik ben met mijn vriend speel.'], audio: 'Ik speel met mijn vriend.' },

      { t: 'scramble', bag: ['Dit', 'is', 'mijn', 'bal'], correct: 'Dit is mijn bal.' },
      { t: 'scramble', bag: ['Ik', 'speel', 'met', 'Lego'], correct: 'Ik speel met Lego.' },
      { t: 'scramble', bag: ['Mijn', 'bal', 'is', 'rood'], correct: 'Mijn bal is rood.' },
      { t: 'scramble', bag: ['Ik', 'heb', 'een', 'teddybeer'], correct: 'Ik heb een teddybeer.' },
      { t: 'scramble', bag: ['Waar', 'is', 'de', 'bal'], correct: 'Waar is de bal?' },

      { t: 'sent', correct: 'Ik speel met mijn auto.', opts: ['Ik speel met mijn auto.', 'Ik speel mijn auto met.', 'Ik spelen met mijn auto.'] },
      { t: 'sent', correct: 'De bal is groot.', opts: ['De bal is groot.', 'De bal zijn groot.', 'De groot is bal.'] },
      { t: 'sent', correct: 'Ik heb een rode auto.', opts: ['Ik heb een rode auto.', 'Ik heb een rood auto.', 'Ik heb een auto rode.'] },

      { t: 'odd', ask: 'Welk woord hoort er niet bij?', correct: 'melk', opts: ['bal', 'pop', 'trein', 'melk'] },
      { t: 'odd', ask: 'Waarmee speel je niet?', correct: 'soep', opts: ['puzzel', 'blokken', 'ballon', 'soep'] },
      { t: 'odd', ask: 'Welk woord hoort er niet bij?', correct: 'oma', opts: ['fiets', 'auto', 'boot', 'oma'] },

      { t: 'guess', ask: 'Het is rond en je kan ermee voetballen.', correct: 'bal' },
      { t: 'guess', ask: 'Het is zacht, het is bruin en je slaapt ermee.', correct: 'teddybeer' },
      { t: 'guess', ask: 'Het heeft twee wielen en je fietst ermee.', correct: 'fiets' },
      { t: 'guess', ask: 'Het heeft veel kleine stukjes en je maakt er een plaatje mee.', correct: 'puzzel' },

      { t: 'make', ask: 'Maak een zin met "bal".', example: 'Ik speel met mijn bal.' },
      { t: 'make', ask: 'Maak een zin met "spelen".', example: 'Ik speel met mijn vriend.' },
      { t: 'make', ask: 'Vertel over je favoriete speelgoed.', example: 'Mijn favoriete speelgoed is mijn rode auto. Hij is klein en snel.' },

      { t: 'cloze', ask: 'Ik heb ___ ballen. ⚽⚽⚽', correct: 'drie', opts: ['drie', 'blauw', 'groot'], audio: 'Ik heb drie ballen.' },
      { t: 'cloze', ask: 'Mijn teddybeer is ___ en zacht. 🟤', correct: 'bruin', opts: ['bruin', 'koud', 'acht'], audio: 'Mijn teddybeer is bruin en zacht.' }
    ]
  });

  /* ======================================================================
     8 · HET WEER ☀️
     ====================================================================== */
  THEMES.push({
    id: 'weather', name: 'Het weer', icon: '☀️', frame: 'Ik zie de ___',
    words: [
      { w: 'zon', e: '☀️', pt: 'sol' },
      { w: 'regen', e: '🌧️', pt: 'chuva' },
      { w: 'sneeuw', e: '❄️', pt: 'neve' },
      { w: 'wind', e: '💨', pt: 'vento' },
      { w: 'wolk', e: '☁️', pt: 'nuvem' },
      { w: 'regenboog', e: '🌈', pt: 'arco-íris' },
      { w: 'ster', e: '⭐', pt: 'estrela' },
      { w: 'maan', e: '🌙', pt: 'lua' },
      { w: 'onweer', e: '⛈️', pt: 'tempestade' },
      { w: 'bliksem', e: '⚡', pt: 'raio' },
      { w: 'paraplu', e: '☂️', pt: 'guarda-chuva' },
      { w: 'sneeuwpop', e: '⛄', pt: 'boneco de neve' }
    ],
    vocab: [
      { w: 'warm', pt: 'quente' }, { w: 'koud', pt: 'frio' },
      { w: 'zonnig', pt: 'ensolarado' }, { w: 'bewolkt', pt: 'nublado' },
      { w: 'het regent', pt: 'está chovendo' }, { w: 'het sneeuwt', pt: 'está nevando' },
      { w: 'het waait', pt: 'está ventando' }, { w: 'vandaag', pt: 'hoje' },
      { w: 'buiten', pt: 'lá fora' }, { w: 'jas', pt: 'casaco' },
      { w: 'weer', pt: 'tempo (clima)' }
    ],
    say: [
      { nl: 'Ik zie de zon.', pt: 'Eu vejo o sol.' },
      { nl: 'Het regent vandaag.', pt: 'Está chovendo hoje.' },
      { nl: 'Ik hou van sneeuw.', pt: 'Eu gosto de neve.' },
      { nl: 'Kijk! Een regenboog!', pt: 'Olha! Um arco-íris!' },
      { nl: 'Het is warm.', pt: 'Está quente.' },
      { nl: 'Het is koud.', pt: 'Está frio.' },
      { nl: 'De zon schijnt.', pt: 'O sol está brilhando.' },
      { nl: 'Het sneeuwt.', pt: 'Está nevando.' },
      { nl: 'Het is bewolkt.', pt: 'Está nublado.' },
      { nl: 'Vandaag is het warm.', pt: 'Hoje está quente.' },
      { nl: 'Ik doe mijn jas aan. Het is koud.', pt: 'Eu visto o meu casaco. Está frio.' },
      { nl: 'Wat voor weer is het?', pt: 'Como está o tempo?' }
    ],
    items: [
      { t: 'cloze', ask: 'Het is ___. ☀️', correct: 'warm', opts: ['warm', 'koud', 'blauw'], audio: 'Het is warm.' },
      { t: 'cloze', ask: 'Het is ___. ❄️', correct: 'koud', opts: ['koud', 'warm', 'lekker'], audio: 'Het is koud.' },
      { t: 'cloze', ask: 'De ___ schijnt. ☀️', correct: 'zon', opts: ['zon', 'maan', 'wind'], audio: 'De zon schijnt.' },
      { t: 'cloze', ask: 'Het ___ vandaag. 🌧️', correct: 'regent', opts: ['regent', 'sneeuwt', 'schijnt'], audio: 'Het regent vandaag.' },
      { t: 'cloze', ask: 'Het ___ in de winter. ❄️', correct: 'sneeuwt', opts: ['sneeuwt', 'regent', 'eet'], audio: 'Het sneeuwt in de winter.' },
      { t: 'cloze', ask: 'Het is ___. ☁️', correct: 'bewolkt', opts: ['bewolkt', 'zonnig', 'groen'], audio: 'Het is bewolkt.' },
      { t: 'cloze', ask: 'Ik zie een ___ na de regen. 🌈', correct: 'regenboog', opts: ['regenboog', 'sneeuwpop', 'ster'], audio: 'Ik zie een regenboog na de regen.' },
      { t: 'cloze', ask: 'Ik heb een ___ nodig als het regent. ☂️', correct: 'paraplu', opts: ['paraplu', 'bal', 'stoel'], audio: 'Ik heb een paraplu nodig als het regent.' },
      { t: 'cloze', ask: 'In de nacht zie ik de ___ en de sterren. 🌙', correct: 'maan', opts: ['maan', 'zon', 'wolk'], audio: 'In de nacht zie ik de maan en de sterren.' },
      { t: 'cloze', ask: 'Ik maak een ___ in de sneeuw. ⛄', correct: 'sneeuwpop', opts: ['sneeuwpop', 'paraplu', 'regen'], audio: 'Ik maak een sneeuwpop in de sneeuw.' },
      { t: 'cloze', ask: 'Ik doe mijn ___ aan. Het is koud.', correct: 'jas', opts: ['jas', 'zon', 'melk'], audio: 'Ik doe mijn jas aan.' },
      { t: 'cloze', ask: '___ is het zonnig.', correct: 'Vandaag', opts: ['Vandaag', 'Warm', 'Buiten'], audio: 'Vandaag is het zonnig.' },

      { t: 'tf', ask: 'De zon is warm.', correct: true },
      { t: 'tf', ask: 'Sneeuw is warm.', correct: false },
      { t: 'tf', ask: 'Sneeuw is wit.', correct: true },
      { t: 'tf', ask: 'Als het regent, is het nat.', correct: true },
      { t: 'tf', ask: 'De maan schijnt in de nacht.', correct: true },
      { t: 'tf', ask: 'Een regenboog heeft één kleur.', correct: false },
      { t: 'tf', ask: 'Bij regen neem ik een paraplu.', correct: true },
      { t: 'tf', ask: 'In de winter is het vaak koud.', correct: true },

      { t: 'qa', ask: 'Wat voor weer is het? ☀️', correct: 'Het is zonnig.', opts: ['Het is zonnig.', 'Het ben zonnig.', 'Ik ben zonnig.'], audio: 'Het is zonnig.' },
      { t: 'qa', ask: 'Is het koud?', correct: 'Ja, het is koud.', opts: ['Ja, het is koud.', 'Ja, ik ben koud weer.', 'Ja, het koud is niet.'], audio: 'Ja, het is koud.' },
      { t: 'qa', ask: 'Hou je van de zon?', correct: 'Ja, ik hou van de zon.', opts: ['Ja, ik hou van de zon.', 'Ja, ik ben de zon.', 'Ja, ik zon hou van.'], audio: 'Ja, ik hou van de zon.' },
      { t: 'qa', ask: 'Wat voor weer vind je leuk?', correct: 'Ik vind sneeuw leuk.', opts: ['Ik vind sneeuw leuk.', 'Ik ben sneeuw leuk.', 'Sneeuw vind leuk ik.'], audio: 'Ik vind sneeuw leuk.' },
      { t: 'qa', ask: 'Regent het vandaag?', correct: 'Nee, het regent niet.', opts: ['Nee, het regent niet.', 'Nee, het is regent niet.', 'Nee, ik regen niet.'], audio: 'Nee, het regent niet.' },

      { t: 'scramble', bag: ['Het', 'is', 'warm'], correct: 'Het is warm.' },
      { t: 'scramble', bag: ['De', 'zon', 'schijnt'], correct: 'De zon schijnt.' },
      { t: 'scramble', bag: ['Vandaag', 'regent', 'het'], correct: 'Vandaag regent het.' },
      { t: 'scramble', bag: ['Ik', 'hou', 'van', 'sneeuw'], correct: 'Ik hou van sneeuw.' },
      { t: 'scramble', bag: ['Wat', 'voor', 'weer', 'is', 'het'], correct: 'Wat voor weer is het?' },

      { t: 'sent', correct: 'Het is bewolkt.', opts: ['Het is bewolkt.', 'Het zijn bewolkt.', 'Het is bewolkte.'] },
      { t: 'sent', correct: 'Vandaag regent het.', opts: ['Vandaag regent het.', 'Vandaag het regent.', 'Vandaag regenen het.'] },
      { t: 'sent', correct: 'De zon is geel en warm.', opts: ['De zon is geel en warm.', 'De zon zijn geel en warm.', 'De zon is geel en warme.'] },

      { t: 'odd', ask: 'Welk woord hoort er niet bij?', correct: 'brood', opts: ['zon', 'regen', 'wind', 'brood'] },
      { t: 'odd', ask: 'Welk woord hoort er niet bij?', correct: 'hond', opts: ['wolk', 'sneeuw', 'bliksem', 'hond'] },
      { t: 'odd', ask: 'Wat is geen weer?', correct: 'stoel', opts: ['zonnig', 'bewolkt', 'koud', 'stoel'] },

      { t: 'guess', ask: 'Het is wit, het is koud en het valt uit de lucht in de winter.', correct: 'sneeuw' },
      { t: 'guess', ask: 'Het is geel, het is warm en het staat aan de hemel overdag.', correct: 'zon' },
      { t: 'guess', ask: 'Het heeft veel kleuren en je ziet het na de regen.', correct: 'regenboog' },
      { t: 'guess', ask: 'Je gebruikt het als het regent, zodat je niet nat wordt.', correct: 'paraplu' },

      { t: 'make', ask: 'Maak een zin met "regen".', example: 'Het regent vandaag.' },
      { t: 'make', ask: 'Maak een zin met "warm".', example: 'Vandaag is het warm.' },
      { t: 'make', ask: 'Vertel wat voor weer het vandaag is.', example: 'Vandaag is het bewolkt en koud. Ik doe mijn jas aan.' },

      { t: 'cloze', ask: 'Ik zie ___ wolken aan de hemel. ☁️☁️', correct: 'twee', opts: ['twee', 'wit', 'warm'], audio: 'Ik zie twee wolken aan de hemel.' },
      { t: 'cloze', ask: 'De wolk is ___ en de zon is geel. ⚪', correct: 'wit', opts: ['wit', 'acht', 'lekker'], audio: 'De wolk is wit en de zon is geel.' }
    ]
  });

  /* ======================================================================
     9 · DOEN 🏃
     ====================================================================== */
  THEMES.push({
    id: 'actions', name: 'Doen', icon: '🏃', frame: 'Ik kan ___',
    words: [
      { w: 'lopen', e: '🚶', pt: 'andar' },
      { w: 'rennen', e: '🏃', pt: 'correr' },
      { w: 'springen', e: '🤸', pt: 'pular' },
      { w: 'eten', e: '🍽️', pt: 'comer' },
      { w: 'drinken', e: '🥤', pt: 'beber' },
      { w: 'slapen', e: '😴', pt: 'dormir' },
      { w: 'lezen', e: '📖', pt: 'ler' },
      { w: 'schrijven', e: '✍️', pt: 'escrever' },
      { w: 'spelen', e: '🪀', pt: 'brincar' },
      { w: 'kijken', e: '👀', pt: 'olhar' },
      { w: 'luisteren', e: '🎧', pt: 'escutar' },
      { w: 'zwemmen', e: '🏊', pt: 'nadar' },
      { w: 'fietsen', e: '🚴', pt: 'andar de bicicleta' },
      { w: 'zingen', e: '🎤', pt: 'cantar' },
      { w: 'dansen', e: '💃', pt: 'dançar' },
      { w: 'tekenen', e: '🎨', pt: 'desenhar' },
      { w: 'werken', e: '💼', pt: 'trabalhar' },
      { w: 'zitten', e: '🪑', pt: 'sentar' },
      { w: 'staan', e: '🧍', pt: 'ficar em pé' }
    ],
    vocab: [
      { w: 'ik kan', pt: 'eu consigo / sei' }, { w: 'ik kan niet', pt: 'eu não consigo' },
      { w: 'wat doe je?', pt: 'o que você faz?' }, { w: 'graag', pt: 'com prazer' },
      { w: 'muziek', pt: 'música' }, { w: 'school', pt: 'escola' },
      { w: 'voetbal', pt: 'futebol' }, { w: 'boek', pt: 'livro' },
      { w: 'hij', pt: 'ele' }, { w: 'zij', pt: 'ela' }
    ],
    say: [
      { nl: 'Ik kan rennen.', pt: 'Eu sei correr.' },
      { nl: 'Ik kan springen!', pt: 'Eu sei pular!' },
      { nl: 'Ik kan zwemmen.', pt: 'Eu sei nadar.' },
      { nl: 'Ik hou van zingen.', pt: 'Eu gosto de cantar.' },
      { nl: 'Ik ren.', pt: 'Eu corro.' },
      { nl: 'Ik lees een boek.', pt: 'Eu leio um livro.' },
      { nl: 'Hij leest een boek.', pt: 'Ele lê um livro.' },
      { nl: 'Zij speelt.', pt: 'Ela brinca.' },
      { nl: 'Ik speel voetbal.', pt: 'Eu jogo futebol.' },
      { nl: 'Ik luister naar muziek.', pt: 'Eu escuto música.' },
      { nl: 'Ik fiets naar school.', pt: 'Eu vou de bicicleta para a escola.' },
      { nl: 'Ja, ik kan fietsen.', pt: 'Sim, eu sei andar de bicicleta.' },
      { nl: 'Nee, ik kan niet zwemmen.', pt: 'Não, eu não sei nadar.' },
      { nl: 'Ik eet een appel en ik drink melk.', pt: 'Eu como uma maçã e bebo leite.' }
    ],
    items: [
      { t: 'cloze', ask: 'Ik ___ een boek. 📖', correct: 'lees', opts: ['lees', 'eet', 'zwem'], audio: 'Ik lees een boek.' },
      { t: 'cloze', ask: 'Ik ___ naar muziek. 🎧', correct: 'luister', opts: ['luister', 'kijk', 'slaap'], audio: 'Ik luister naar muziek.' },
      { t: 'cloze', ask: 'Ik ___ naar school. 🚴', correct: 'fiets', opts: ['fiets', 'eet', 'zing'], audio: 'Ik fiets naar school.' },
      { t: 'cloze', ask: 'Ik ___ in het water. 🏊', correct: 'zwem', opts: ['zwem', 'lees', 'schrijf'], audio: 'Ik zwem in het water.' },
      { t: 'cloze', ask: 'Ik ___ voetbal. ⚽', correct: 'speel', opts: ['speel', 'drink', 'sta'], audio: 'Ik speel voetbal.' },
      { t: 'cloze', ask: 'Ik ___ in mijn bed. 😴', correct: 'slaap', opts: ['slaap', 'ren', 'teken'], audio: 'Ik slaap in mijn bed.' },
      { t: 'cloze', ask: 'Hij ___ een boek. 📖', correct: 'leest', opts: ['leest', 'lees', 'lezen'], audio: 'Hij leest een boek.' },
      { t: 'cloze', ask: 'Zij ___ met de bal. ⚽', correct: 'speelt', opts: ['speelt', 'speel', 'spelen'], audio: 'Zij speelt met de bal.' },
      { t: 'cloze', ask: 'Ik ___ zwemmen. Het is leuk!', correct: 'kan', opts: ['kan', 'ben', 'heb'], audio: 'Ik kan zwemmen.' },
      { t: 'cloze', ask: 'Ik ___ een mooi huis. 🎨', correct: 'teken', opts: ['teken', 'eet', 'loop'], audio: 'Ik teken een mooi huis.' },
      { t: 'cloze', ask: 'Ik ___ een brief aan mijn oma. ✍️', correct: 'schrijf', opts: ['schrijf', 'drink', 'ren'], audio: 'Ik schrijf een brief aan mijn oma.' },
      { t: 'cloze', ask: 'Ik ___ op mijn stoel. 🪑', correct: 'zit', opts: ['zit', 'sta', 'spring'], audio: 'Ik zit op mijn stoel.' },

      { t: 'tf', ask: 'Ik lees met mijn ogen.', correct: true },
      { t: 'tf', ask: 'Ik zwem in mijn bed.', correct: false },
      { t: 'tf', ask: 'Een vis kan zwemmen.', correct: true },
      { t: 'tf', ask: 'Ik slaap in de nacht.', correct: true },
      { t: 'tf', ask: 'Ik eet met mijn oren.', correct: false },
      { t: 'tf', ask: 'Ik luister naar muziek met mijn oren.', correct: true },
      { t: 'tf', ask: 'Een baby kan fietsen.', correct: false },
      { t: 'tf', ask: 'Ik kan lopen met mijn benen.', correct: true },

      { t: 'qa', ask: 'Wat doe je? 📖', correct: 'Ik lees een boek.', opts: ['Ik lees een boek.', 'Ik ben een boek.', 'Ik boek lees een.'], audio: 'Ik lees een boek.' },
      { t: 'qa', ask: 'Kun jij fietsen?', correct: 'Ja, ik kan fietsen.', opts: ['Ja, ik kan fietsen.', 'Ja, ik kan fiets.', 'Ja, ik ben fietsen.'], audio: 'Ja, ik kan fietsen.' },
      { t: 'qa', ask: 'Kun jij zwemmen?', correct: 'Nee, ik kan niet zwemmen.', opts: ['Nee, ik kan niet zwemmen.', 'Nee, ik zwem kan niet.', 'Nee, ik ben niet zwemmen.'], audio: 'Nee, ik kan niet zwemmen.' },
      { t: 'qa', ask: 'Wat speel je?', correct: 'Ik speel voetbal.', opts: ['Ik speel voetbal.', 'Ik ben voetbal.', 'Ik voetbal speel een.'], audio: 'Ik speel voetbal.' },
      { t: 'qa', ask: 'Wat doet je broer?', correct: 'Hij speelt met Lego.', opts: ['Hij speelt met Lego.', 'Hij speel met Lego.', 'Hij is speelt Lego.'], audio: 'Hij speelt met Lego.' },

      { t: 'scramble', bag: ['Ik', 'lees', 'een', 'boek'], correct: 'Ik lees een boek.' },
      { t: 'scramble', bag: ['Ik', 'kan', 'zwemmen'], correct: 'Ik kan zwemmen.' },
      { t: 'scramble', bag: ['Ik', 'fiets', 'naar', 'school'], correct: 'Ik fiets naar school.' },
      { t: 'scramble', bag: ['Zij', 'speelt', 'met', 'de', 'bal'], correct: 'Zij speelt met de bal.' },
      { t: 'scramble', bag: ['Ik', 'luister', 'naar', 'muziek'], correct: 'Ik luister naar muziek.' },
      { t: 'scramble', bag: ['Wat', 'doe', 'je'], correct: 'Wat doe je?' },

      { t: 'sent', correct: 'Ik kan zwemmen.', opts: ['Ik kan zwemmen.', 'Ik kan zwem.', 'Ik ben zwemmen kan.'] },
      { t: 'sent', correct: 'Hij leest een boek.', opts: ['Hij leest een boek.', 'Hij lees een boek.', 'Hij lezen een boek.'] },
      { t: 'sent', correct: 'Ik speel graag buiten.', opts: ['Ik speel graag buiten.', 'Ik graag speel buiten.', 'Ik spelen graag buiten.'] },

      { t: 'odd', ask: 'Welk woord hoort er niet bij?', correct: 'rood', opts: ['rennen', 'springen', 'lopen', 'rood'] },
      { t: 'odd', ask: 'Welk woord hoort er niet bij?', correct: 'tafel', opts: ['lezen', 'schrijven', 'tekenen', 'tafel'] },
      { t: 'odd', ask: 'Wat doe je niet met muziek?', correct: 'eten', opts: ['zingen', 'dansen', 'luisteren', 'eten'] },

      { t: 'guess', ask: 'Je doet dit in het water. Je gebruikt je armen en je benen.', correct: 'zwemmen' },
      { t: 'guess', ask: 'Je doet dit in je bed, in de nacht.', correct: 'slapen' },
      { t: 'guess', ask: 'Je doet dit met een boek en met je ogen.', correct: 'lezen' },
      { t: 'guess', ask: 'Je doet dit heel snel met je benen.', correct: 'rennen' },

      { t: 'make', ask: 'Maak een zin met "spelen".', example: 'Ik speel met mijn vriend.' },
      { t: 'make', ask: 'Maak een zin met "kan".', example: 'Ik kan fietsen.' },
      { t: 'make', ask: 'Vertel wat je vandaag doet.', example: 'Vandaag speel ik voetbal en daarna lees ik een boek.' },

      { t: 'cloze', ask: 'Ik ___ een appel en ik drink melk. 🍎', correct: 'eet', opts: ['eet', 'lees', 'zing'], audio: 'Ik eet een appel en ik drink melk.' },
      { t: 'cloze', ask: 'De vogel ___ in de lucht. 🐦', correct: 'vliegt', opts: ['vliegt', 'zwemt', 'leest'], audio: 'De vogel vliegt in de lucht.' }
    ]
  });

  /* ======================================================================
     10 · MIJN HUIS 🏠
     ====================================================================== */
  THEMES.push({
    id: 'house', name: 'Mijn huis', icon: '🏠', frame: 'Ik zie een ___',
    words: [
      { w: 'huis', e: '🏠', pt: 'casa' },
      { w: 'deur', e: '🚪', pt: 'porta' },
      { w: 'raam', e: '🪟', pt: 'janela' },
      { w: 'bed', e: '🛏️', pt: 'cama' },
      { w: 'tafel', e: '🍽️', pt: 'mesa' },
      { w: 'stoel', e: '🪑', pt: 'cadeira' },
      { w: 'bank', e: '🛋️', pt: 'sofá' },
      { w: 'lamp', e: '💡', pt: 'lâmpada' },
      { w: 'kast', e: '🗄️', pt: 'armário' },
      { w: 'keuken', e: '🍳', pt: 'cozinha' },
      { w: 'badkamer', e: '🛁', pt: 'banheiro' },
      { w: 'slaapkamer', e: '🛌', pt: 'quarto' },
      { w: 'woonkamer', e: '📺', pt: 'sala' },
      { w: 'tuin', e: '🌳', pt: 'jardim' },
      { w: 'trap', e: '🪜', pt: 'escada' },
      { w: 'sleutel', e: '🔑', pt: 'chave' },
      { w: 'klok', e: '🕐', pt: 'relógio' }
    ],
    vocab: [
      { w: 'kamer', pt: 'quarto, cômodo' }, { w: 'staan', pt: 'estar (em pé)' },
      { w: 'liggen', pt: 'estar deitado' }, { w: 'waar', pt: 'onde' },
      { w: 'in', pt: 'em, dentro' }, { w: 'op', pt: 'sobre' },
      { w: 'naast', pt: 'ao lado de' }, { w: 'open', pt: 'aberto' },
      { w: 'dicht', pt: 'fechado' }, { w: 'groot', pt: 'grande' },
      { w: 'klein', pt: 'pequeno' }, { w: 'wonen', pt: 'morar' }
    ],
    say: [
      { nl: 'Dit is mijn huis.', pt: 'Esta é a minha casa.' },
      { nl: 'Ik slaap in mijn bed.', pt: 'Eu durmo na minha cama.' },
      { nl: 'Doe de deur open!', pt: 'Abre a porta!' },
      { nl: 'Dit is mijn kamer.', pt: 'Este é o meu quarto.' },
      { nl: 'Mijn huis is groot.', pt: 'A minha casa é grande.' },
      { nl: 'Mijn bed staat in mijn kamer.', pt: 'A minha cama fica no meu quarto.' },
      { nl: 'De tafel staat in de keuken.', pt: 'A mesa fica na cozinha.' },
      { nl: 'De bank staat in de woonkamer.', pt: 'O sofá fica na sala.' },
      { nl: 'Het raam is open.', pt: 'A janela está aberta.' },
      { nl: 'Ik woon in een groot huis.', pt: 'Eu moro numa casa grande.' },
      { nl: 'Mijn kamer is blauw.', pt: 'O meu quarto é azul.' },
      { nl: 'Ik speel in de tuin.', pt: 'Eu brinco no jardim.' }
    ],
    items: [
      { t: 'cloze', ask: 'Dit is mijn ___. 🏠', correct: 'huis', opts: ['huis', 'bed', 'klok'], audio: 'Dit is mijn huis.' },
      { t: 'cloze', ask: 'Ik slaap in mijn ___. 🛏️', correct: 'bed', opts: ['bed', 'stoel', 'tuin'], audio: 'Ik slaap in mijn bed.' },
      { t: 'cloze', ask: 'De tafel staat in de ___. 🍳', correct: 'keuken', opts: ['keuken', 'badkamer', 'trap'], audio: 'De tafel staat in de keuken.' },
      { t: 'cloze', ask: 'De bank staat in de ___. 📺', correct: 'woonkamer', opts: ['woonkamer', 'keuken', 'tuin'], audio: 'De bank staat in de woonkamer.' },
      { t: 'cloze', ask: 'Ik was mijn handen in de ___. 🛁', correct: 'badkamer', opts: ['badkamer', 'slaapkamer', 'kast'], audio: 'Ik was mijn handen in de badkamer.' },
      { t: 'cloze', ask: 'Mijn bed staat in mijn ___. 🛌', correct: 'slaapkamer', opts: ['slaapkamer', 'keuken', 'deur'], audio: 'Mijn bed staat in mijn slaapkamer.' },
      { t: 'cloze', ask: 'Het ___ is open. 🪟', correct: 'raam', opts: ['raam', 'bed', 'lamp'], audio: 'Het raam is open.' },
      { t: 'cloze', ask: 'Ik doe de ___ open met mijn sleutel. 🚪', correct: 'deur', opts: ['deur', 'klok', 'bank'], audio: 'Ik doe de deur open met mijn sleutel.' },
      { t: 'cloze', ask: 'Ik zit op een ___. 🪑', correct: 'stoel', opts: ['stoel', 'trap', 'raam'], audio: 'Ik zit op een stoel.' },
      { t: 'cloze', ask: 'Mijn kleren liggen in de ___. 🗄️', correct: 'kast', opts: ['kast', 'tuin', 'lamp'], audio: 'Mijn kleren liggen in de kast.' },
      { t: 'cloze', ask: 'Ik speel in de ___. 🌳', correct: 'tuin', opts: ['tuin', 'kast', 'klok'], audio: 'Ik speel in de tuin.' },
      { t: 'cloze', ask: 'Mijn huis is ___ en mooi.', correct: 'groot', opts: ['groot', 'lekker', 'acht'], audio: 'Mijn huis is groot en mooi.' },

      { t: 'tf', ask: 'Ik slaap in de slaapkamer.', correct: true },
      { t: 'tf', ask: 'Ik kook in de badkamer.', correct: false },
      { t: 'tf', ask: 'Een huis heeft een deur.', correct: true },
      { t: 'tf', ask: 'De bank staat in de woonkamer.', correct: true },
      { t: 'tf', ask: 'Ik eet in mijn bed op een stoel.', correct: false },
      { t: 'tf', ask: 'De lamp geeft licht.', correct: true },
      { t: 'tf', ask: 'De tuin is binnen in het huis.', correct: false },
      { t: 'tf', ask: 'Ik kook in de keuken.', correct: true },

      { t: 'qa', ask: 'Waar is de stoel? 🪑', correct: 'De stoel staat in de keuken.', opts: ['De stoel staat in de keuken.', 'De stoel is staan keuken.', 'De keuken staat in de stoel.'], audio: 'De stoel staat in de keuken.' },
      { t: 'qa', ask: 'Waar is je bed?', correct: 'Mijn bed staat in mijn kamer.', opts: ['Mijn bed staat in mijn kamer.', 'Mijn bed is in mijn kamer staan.', 'Mijn kamer staat in mijn bed.'], audio: 'Mijn bed staat in mijn kamer.' },
      { t: 'qa', ask: 'Heb jij een grote kamer?', correct: 'Ja, mijn kamer is groot.', opts: ['Ja, mijn kamer is groot.', 'Ja, ik ben een grote kamer.', 'Ja, mijn kamer heeft groot.'], audio: 'Ja, mijn kamer is groot.' },
      { t: 'qa', ask: 'Welke kleur is je kamer?', correct: 'Mijn kamer is blauw.', opts: ['Mijn kamer is blauw.', 'Mijn kamer heeft blauw.', 'Blauw is mijn kamers.'], audio: 'Mijn kamer is blauw.' },
      { t: 'qa', ask: 'Waar slaap je?', correct: 'Ik slaap in mijn bed.', opts: ['Ik slaap in mijn bed.', 'Ik ben in mijn bed slaap.', 'Ik slaap mijn bed in is.'], audio: 'Ik slaap in mijn bed.' },

      { t: 'scramble', bag: ['Dit', 'is', 'mijn', 'huis'], correct: 'Dit is mijn huis.' },
      { t: 'scramble', bag: ['Mijn', 'huis', 'is', 'groot'], correct: 'Mijn huis is groot.' },
      { t: 'scramble', bag: ['Het', 'raam', 'is', 'open'], correct: 'Het raam is open.' },
      { t: 'scramble', bag: ['De', 'tafel', 'staat', 'in', 'de', 'keuken'], correct: 'De tafel staat in de keuken.' },
      { t: 'scramble', bag: ['Waar', 'is', 'je', 'bed'], correct: 'Waar is je bed?' },

      { t: 'sent', correct: 'Mijn bed staat in mijn kamer.', opts: ['Mijn bed staat in mijn kamer.', 'Mijn bed staan in mijn kamer.', 'Mijn kamer staat in mijn bed.'] },
      { t: 'sent', correct: 'Ik woon in een groot huis.', opts: ['Ik woon in een groot huis.', 'Ik woon in een grote huis.', 'Ik wonen in een groot huis.'] },
      { t: 'sent', correct: 'De deur is dicht.', opts: ['De deur is dicht.', 'De deur zijn dicht.', 'De dicht is deur.'] },

      { t: 'odd', ask: 'Welk woord hoort er niet bij?', correct: 'appel', opts: ['bed', 'tafel', 'stoel', 'appel'] },
      { t: 'odd', ask: 'Wat is geen kamer?', correct: 'lamp', opts: ['keuken', 'badkamer', 'woonkamer', 'lamp'] },
      { t: 'odd', ask: 'Welk woord hoort er niet bij?', correct: 'hond', opts: ['deur', 'raam', 'trap', 'hond'] },

      { t: 'guess', ask: 'Je slaapt erin en het staat in je slaapkamer.', correct: 'bed' },
      { t: 'guess', ask: 'Je doet het open en je gaat naar binnen.', correct: 'deur' },
      { t: 'guess', ask: 'Je kookt hier en je eet hier.', correct: 'keuken' },
      { t: 'guess', ask: 'Het geeft licht in de kamer.', correct: 'lamp' },

      { t: 'make', ask: 'Maak een zin met "huis".', example: 'Mijn huis is groot.' },
      { t: 'make', ask: 'Maak een zin met "kamer".', example: 'Mijn kamer is blauw.' },
      { t: 'make', ask: 'Vertel over je huis.', example: 'Mijn huis is groot. Ik heb een kamer met een bed en een kast.' },

      { t: 'cloze', ask: 'Mijn kamer is ___. 🔵', correct: 'blauw', opts: ['blauw', 'acht', 'lekker'], audio: 'Mijn kamer is blauw.' },
      { t: 'cloze', ask: 'Er zijn ___ stoelen in de keuken. 🪑🪑🪑🪑', correct: 'vier', opts: ['vier', 'blauw', 'groot'], audio: 'Er zijn vier stoelen in de keuken.' }
    ]
  });

  root.HENDRIK_CONTENT = { version: '2.0', themes: THEMES };
})(window);
