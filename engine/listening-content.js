/* ============================================================
   LISTENING LAB — CONTEÚDO (só dados; a página nunca muda)
   ------------------------------------------------------------
   Micro listenings (30–45s) de compreensão oral. A professora
   escolhe QUALQUER imagem externa do mesmo tema (Google, Canva,
   Pinterest, foto...) e seleciona um listening do mesmo contexto.
   O listening NÃO conhece a imagem — trabalha só o contexto, por
   isso é reutilizável com dezenas de fotos do mesmo assunto.

   `window.LISTENING_CONTENT` (não const): const no topo de um
   <script> NÃO vira propriedade de window — mesma armadilha
   documentada em grammar-topics.js.

   MÓDULO ISOLADO: ao contrário de Grammar/Structures/Conversation,
   este engine NÃO se registra no Learning Progress. É uma decisão
   deliberada — o Listening Lab é independente e não alimenta o
   Content registry, o Lesson Builder nem o Calendar.

   SCHEMA DE CADA LISTENING (exatamente como especificado):
     id            identificador estável
     level         'A1' | 'A2'
     theme         'Animals' | 'Food' | 'Daily Routine' | 'Travel'
     title         título curto
     audio         nome do arquivo em audio/ (ex.: 'animals-a1-01.mp3')
     transcript    o texto lido no áudio (30–45s)
     vocabulary[]  { word, meaning }
     comprehension[] { q, a }         perguntas de compreensão
     complete[]    { q, a }           complete a frase (a partir do áudio)
     trueFalse[]   { s, a }           s = afirmação, a = true|false
     speaking[]    perguntas de follow-up oral

   Todos os textos são originais.
   ============================================================ */

window.LISTENING_LEVELS = ['A1', 'A2'];
window.LISTENING_THEMES = ['Animals', 'Food', 'Daily Routine', 'Travel'];

window.LISTENING_CONTENT = [

/* ══════════════ A1 · ANIMALS ══════════════ */
{
  id: 'animals-a1-01', level: 'A1', theme: 'Animals',
  title: 'The Lion',
  audio: 'animals-a1-01.mp3',
  transcript: 'This is a lion. The lion is a big animal. It is brown and yellow. ' +
    'The lion lives in Africa. It has four legs and a long tail. ' +
    'The lion eats meat. It sleeps a lot in the day and hunts at night. ' +
    'The lion is very strong. People call the lion the king of the animals.',
  vocabulary: [
    { word: 'lion', meaning: 'a big wild cat' },
    { word: 'strong', meaning: 'having a lot of power' },
    { word: 'meat', meaning: 'food that comes from animals' },
    { word: 'tail', meaning: 'the long part at the back of an animal' }
  ],
  comprehension: [
    { q: 'Where does the lion live?', a: 'In Africa.' },
    { q: 'What does the lion eat?', a: 'Meat.' },
    { q: 'When does the lion hunt?', a: 'At night.' }
  ],
  complete: [
    { q: 'The lion is a ___ animal.', a: 'big' },
    { q: 'The lion has four ___.', a: 'legs' },
    { q: 'People call the lion the ___ of the animals.', a: 'king' }
  ],
  trueFalse: [
    { s: 'The lion is a small animal.', a: false },
    { s: 'The lion eats meat.', a: true },
    { s: 'The lion sleeps at night.', a: false }
  ],
  speaking: [
    'What is your favourite wild animal? Why?',
    'Are there lions in your country?',
    'Do you prefer big animals or small animals?'
  ]
},

/* ══════════════ A1 · FOOD ══════════════ */
{
  id: 'food-a1-01', level: 'A1', theme: 'Food',
  title: 'My Breakfast',
  audio: 'food-a1-01.mp3',
  transcript: 'Every morning I have breakfast at seven o\'clock. I eat bread with butter and cheese. ' +
    'I drink a cup of coffee with milk. Sometimes I eat an apple or a banana. ' +
    'I like my breakfast. It is simple and good. On Sunday I eat eggs too. ' +
    'Breakfast is my favourite meal of the day.',
  vocabulary: [
    { word: 'breakfast', meaning: 'the first meal of the day' },
    { word: 'bread', meaning: 'a common food made from flour' },
    { word: 'meal', meaning: 'the food you eat at one time' },
    { word: 'cup', meaning: 'a small container for drinks' }
  ],
  comprehension: [
    { q: 'What time is breakfast?', a: 'At seven o\'clock.' },
    { q: 'What does the person drink?', a: 'Coffee with milk.' },
    { q: 'What does the person eat on Sunday?', a: 'Eggs.' }
  ],
  complete: [
    { q: 'I eat bread with butter and ___.', a: 'cheese' },
    { q: 'Sometimes I eat an apple or a ___.', a: 'banana' },
    { q: 'Breakfast is my favourite ___ of the day.', a: 'meal' }
  ],
  trueFalse: [
    { s: 'The person has breakfast at eight o\'clock.', a: false },
    { s: 'The person drinks coffee with milk.', a: true },
    { s: 'The person eats eggs every day.', a: false }
  ],
  speaking: [
    'What do you eat for breakfast?',
    'What is your favourite meal of the day?',
    'Do you drink coffee or tea in the morning?'
  ]
},

/* ══════════════ A1 · DAILY ROUTINE ══════════════ */
{
  id: 'daily-routine-a1-01', level: 'A1', theme: 'Daily Routine',
  title: 'My Morning',
  audio: 'daily-routine-a1-01.mp3',
  transcript: 'I wake up at six thirty every day. First, I take a shower and get dressed. ' +
    'Then I have breakfast with my family. I leave home at eight o\'clock. ' +
    'I go to work by bus. I start work at nine. At night, I read a book and go to bed at ten. ' +
    'I like my routine because it is calm.',
  vocabulary: [
    { word: 'wake up', meaning: 'stop sleeping' },
    { word: 'shower', meaning: 'washing your body with water' },
    { word: 'routine', meaning: 'the things you do every day' },
    { word: 'leave', meaning: 'go away from a place' }
  ],
  comprehension: [
    { q: 'What time does the person wake up?', a: 'At six thirty.' },
    { q: 'How does the person go to work?', a: 'By bus.' },
    { q: 'What does the person do at night?', a: 'Reads a book.' }
  ],
  complete: [
    { q: 'First, I take a shower and get ___.', a: 'dressed' },
    { q: 'I go to work by ___.', a: 'bus' },
    { q: 'I go to bed at ___.', a: 'ten' }
  ],
  trueFalse: [
    { s: 'The person wakes up at seven.', a: false },
    { s: 'The person has breakfast with the family.', a: true },
    { s: 'The person starts work at nine.', a: true }
  ],
  speaking: [
    'What time do you wake up?',
    'How do you go to work or school?',
    'What do you do before you go to bed?'
  ]
},

/* ══════════════ A1 · TRAVEL ══════════════ */
{
  id: 'travel-a1-01', level: 'A1', theme: 'Travel',
  title: 'At the Beach',
  audio: 'travel-a1-01.mp3',
  transcript: 'In summer, my family goes to the beach. We take the car and drive for two hours. ' +
    'The beach is beautiful. The sand is warm and the water is blue. ' +
    'I swim in the sea and play with a ball. My mother reads a book under an umbrella. ' +
    'We eat sandwiches for lunch. I love the beach in summer.',
  vocabulary: [
    { word: 'beach', meaning: 'land next to the sea with sand' },
    { word: 'sand', meaning: 'the small soft stones on a beach' },
    { word: 'swim', meaning: 'move in the water with your body' },
    { word: 'umbrella', meaning: 'a thing that protects you from sun or rain' }
  ],
  comprehension: [
    { q: 'Where does the family go in summer?', a: 'To the beach.' },
    { q: 'How long is the drive?', a: 'Two hours.' },
    { q: 'What does the mother do?', a: 'Reads a book.' }
  ],
  complete: [
    { q: 'The sand is warm and the water is ___.', a: 'blue' },
    { q: 'I swim in the sea and play with a ___.', a: 'ball' },
    { q: 'We eat ___ for lunch.', a: 'sandwiches' }
  ],
  trueFalse: [
    { s: 'The family goes to the beach in winter.', a: false },
    { s: 'The water is blue.', a: true },
    { s: 'They eat pizza for lunch.', a: false }
  ],
  speaking: [
    'Do you like the beach? Why or why not?',
    'Where do you go on holiday?',
    'Do you prefer the beach or the mountains?'
  ]
},

/* ══════════════ A2 · ANIMALS ══════════════ */
{
  id: 'animals-a2-01', level: 'A2', theme: 'Animals',
  title: 'The Life of a Lion',
  audio: 'animals-a2-01.mp3',
  transcript: 'Lions are wild cats that live in the African savanna, a large area of grass and few trees. ' +
    'They live in groups called prides. A pride usually has several females, their cubs, and a few males. ' +
    'The female lions do most of the hunting, while the males protect the territory. ' +
    'During the hot day, lions rest in the shade, and they become active in the cooler evening. ' +
    'Although lions are powerful, their numbers are falling, so many people are working to protect them.',
  vocabulary: [
    { word: 'savanna', meaning: 'a wide area of grass with few trees' },
    { word: 'pride', meaning: 'a group of lions that live together' },
    { word: 'cub', meaning: 'a baby lion' },
    { word: 'territory', meaning: 'the area an animal lives in and defends' },
    { word: 'shade', meaning: 'a dark, cooler place away from the sun' }
  ],
  comprehension: [
    { q: 'What is a group of lions called?', a: 'A pride.' },
    { q: 'Which lions do most of the hunting?', a: 'The females.' },
    { q: 'When are lions more active?', a: 'In the cooler evening.' },
    { q: 'Why are people working to protect lions?', a: 'Because their numbers are falling.' }
  ],
  complete: [
    { q: 'Lions live in the African ___.', a: 'savanna' },
    { q: 'The males protect the ___.', a: 'territory' },
    { q: 'During the hot day, lions rest in the ___.', a: 'shade' }
  ],
  trueFalse: [
    { s: 'A pride has only one lion.', a: false },
    { s: 'The male lions do most of the hunting.', a: false },
    { s: 'The number of lions is falling.', a: true }
  ],
  speaking: [
    'Why do you think some animals live in groups?',
    'Should governments spend money to protect wild animals? Why?',
    'What can ordinary people do to help endangered animals?'
  ]
},

/* ══════════════ A2 · FOOD ══════════════ */
{
  id: 'food-a2-01', level: 'A2', theme: 'Food',
  title: 'Cooking on Sundays',
  audio: 'food-a2-01.mp3',
  transcript: 'On Sundays, my whole family cooks lunch together, and it is my favourite part of the week. ' +
    'My father prepares the meat while my sister and I chop the vegetables for a fresh salad. ' +
    'My grandmother makes her special tomato sauce, which smells amazing all over the house. ' +
    'We usually eat at around two o\'clock, and lunch can last for two hours because we talk so much. ' +
    'Cooking together is not only about the food; it is a time to enjoy being a family.',
  vocabulary: [
    { word: 'chop', meaning: 'cut something into small pieces' },
    { word: 'vegetables', meaning: 'plants such as carrots or onions that we eat' },
    { word: 'sauce', meaning: 'a thick liquid served with food' },
    { word: 'last', meaning: 'continue for a period of time' },
    { word: 'fresh', meaning: 'recently made or picked, not old' }
  ],
  comprehension: [
    { q: 'When does the family cook together?', a: 'On Sundays.' },
    { q: 'What does the father prepare?', a: 'The meat.' },
    { q: 'Who makes the tomato sauce?', a: 'The grandmother.' },
    { q: 'Why does lunch last two hours?', a: 'Because they talk so much.' }
  ],
  complete: [
    { q: 'My sister and I chop the ___ for a salad.', a: 'vegetables' },
    { q: 'My grandmother makes her special tomato ___.', a: 'sauce' },
    { q: 'We usually eat at around ___ o\'clock.', a: 'two' }
  ],
  trueFalse: [
    { s: 'The family cooks lunch together on Sundays.', a: true },
    { s: 'The father chops the vegetables.', a: false },
    { s: 'Lunch is very quick.', a: false }
  ],
  speaking: [
    'Do you cook with your family? What do you make?',
    'What is a typical Sunday meal in your home?',
    'Do you prefer cooking or eating out? Why?'
  ]
},

/* ══════════════ A2 · DAILY ROUTINE ══════════════ */
{
  id: 'daily-routine-a2-01', level: 'A2', theme: 'Daily Routine',
  title: 'A Busy Working Day',
  audio: 'daily-routine-a2-01.mp3',
  transcript: 'My working days are quite busy, but I have a routine that keeps me organised. ' +
    'I wake up at half past six and go for a short run before breakfast. ' +
    'After I get to the office at nine, I check my emails and plan the most important tasks first. ' +
    'I usually have lunch with my colleagues at one, and in the afternoon I have meetings. ' +
    'When I get home, I try to relax, cook dinner, and spend some time reading before I sleep.',
  vocabulary: [
    { word: 'organised', meaning: 'arranged in a good, tidy way' },
    { word: 'task', meaning: 'a piece of work you have to do' },
    { word: 'colleague', meaning: 'a person you work with' },
    { word: 'meeting', meaning: 'when people come together to talk about work' },
    { word: 'relax', meaning: 'rest and become calm' }
  ],
  comprehension: [
    { q: 'What does the person do before breakfast?', a: 'Goes for a short run.' },
    { q: 'What does the person do first at the office?', a: 'Checks emails and plans tasks.' },
    { q: 'Who does the person have lunch with?', a: 'Colleagues.' },
    { q: 'What does the person do before sleeping?', a: 'Reads for a while.' }
  ],
  complete: [
    { q: 'I plan the most important ___ first.', a: 'tasks' },
    { q: 'In the afternoon I have ___.', a: 'meetings' },
    { q: 'When I get home, I try to ___.', a: 'relax' }
  ],
  trueFalse: [
    { s: 'The person runs before breakfast.', a: true },
    { s: 'The person gets to the office at ten.', a: false },
    { s: 'The person has meetings in the afternoon.', a: true }
  ],
  speaking: [
    'Is your daily routine busy or calm? Describe it.',
    'How do you organise your tasks at work or school?',
    'What do you do to relax after a busy day?'
  ]
},

/* ══════════════ A2 · TRAVEL ══════════════ */
{
  id: 'travel-a2-01', level: 'A2', theme: 'Travel',
  title: 'A Trip to the Mountains',
  audio: 'travel-a2-01.mp3',
  transcript: 'Last year, my friends and I decided to spend a weekend in the mountains. ' +
    'We took a train early on Saturday morning and arrived at a small village by lunchtime. ' +
    'The air was cold and fresh, and the views of the green valleys were incredible. ' +
    'On the first day we walked for four hours along a river, and in the evening we stayed in a cosy wooden house. ' +
    'It was a short trip, but it was exactly the break we needed from the noise of the city.',
  vocabulary: [
    { word: 'village', meaning: 'a very small town in the countryside' },
    { word: 'valley', meaning: 'low land between hills or mountains' },
    { word: 'view', meaning: 'what you can see from a place' },
    { word: 'cosy', meaning: 'warm and comfortable' },
    { word: 'break', meaning: 'a short period of rest' }
  ],
  comprehension: [
    { q: 'How did they travel to the mountains?', a: 'By train.' },
    { q: 'When did they arrive at the village?', a: 'By lunchtime.' },
    { q: 'What did they do on the first day?', a: 'Walked for four hours along a river.' },
    { q: 'Why was the trip good for them?', a: 'It was a break from the noise of the city.' }
  ],
  complete: [
    { q: 'The air was cold and ___.', a: 'fresh' },
    { q: 'We walked for four hours along a ___.', a: 'river' },
    { q: 'In the evening we stayed in a cosy wooden ___.', a: 'house' }
  ],
  trueFalse: [
    { s: 'They travelled by plane.', a: false },
    { s: 'The views of the valleys were incredible.', a: true },
    { s: 'They stayed in the mountains for two weeks.', a: false }
  ],
  speaking: [
    'Do you prefer the mountains or the sea? Why?',
    'Tell me about a short trip you enjoyed.',
    'What do you like to do on a weekend away?'
  ]
}

];
