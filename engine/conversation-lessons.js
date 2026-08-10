/* ============================================================
   CONVERSATION LESSONS — CONTEÚDO (só dados; a página nunca muda)
   ------------------------------------------------------------
   As 52 semanas temáticas do módulo Conversation Lessons.
   Extraído de lessons.html para que QUALQUER página possa ler
   este catálogo sem depender de o professor ter aberto aquela
   página antes — mesmo padrão de grammar-topics.js e
   structures-content.js.

   `window.CONV_LESSONS` (não const): const no topo de um <script>
   NÃO vira propriedade de window.
   ============================================================ */

window.CONV_LESSONS = [
{
  week:1, theme:"I Am — Who I Am", level:"A1", grammar:"Verb to be (am/is/are)",
  warmup:["Hello! How are you today?","Are you ready to speak English?","Say your name in English: \"My name is...\""],
  review:["(First lesson — no review. Go straight to the Lead-in.)"],
  leadin:{text:"When you meet a new person, what do you say first? In English, we introduce ourselves.",q:"When you meet a new person, what do you say?"},
  vocab:[
    {en:"name",ipa:"/neɪm/",pt:"what people call you"},
    {en:"age",ipa:"/eɪdʒ/",pt:"how old you are"},
    {en:"from",ipa:"/frɒm/",pt:"shows where you come from"},
    {en:"country",ipa:"/ˈkʌntri/",pt:"a nation"},
    {en:"city",ipa:"/ˈsɪti/",pt:"a town"},
    {en:"married",ipa:"/ˈmærɪd/",pt:"having a husband or wife"},
    {en:"single",ipa:"/ˈsɪŋɡl/",pt:"not married"},
    {en:"happy",ipa:"/ˈhæpi/",pt:"feeling good"},
    {en:"tired",ipa:"/ˈtaɪəd/",pt:"needing rest"},
    {en:"Nice to meet you",ipa:"/naɪs tə miːt juː/",pt:"polite greeting when you meet someone"}
  ],
  grammar:{exp:"TO BE changes with the subject: I <b>am</b> / you-we-they <b>are</b> / he-she-it <b>is</b>. In speech we use the short form: I'm, you're, she's.",
    ex:["I am Luana. (I'm Luana)","You are a student. (You're a student)","She is happy. (She's happy)","We are from Brazil. (We're from Brazil)"]},
  practice:[
    {q:"My name ___ Ana.",a:"is"},
    {q:"I ___ from Brazil.",a:"am"},
    {q:"They ___ students.",a:"are"},
    {q:"He ___ 40 years old.",a:"is"},
    {q:"We ___ happy today.",a:"are"}
  ],
  speaking:[
    "What's your name?",
    "How old are you?",
    "Where are you from?",
    "Are you married or single?",
    "How are you today? Why?",
    "Are you a happy person?",
    "What city are you from? Is it big or small?",
    "Are you tired now?",
    "Tell me three things about you."
  ],
  roleplay:{title:"Role-play: At a party",scenario:"You meet at a party. One starts, the other answers and asks back.",lines:["A: Hi! I'm ___. What's your name?","B: Nice to meet you! I'm ___.","A: Where are you from?","B: I'm from ___. And you?"]},
  homework:{tasks:["Write 5 sentences about yourself using \"I am...\"","Record a 30-second audio introducing yourself"],link:"https://test-english.com/grammar-points/a1/to-be/"}
},
{
  week:2, theme:"Nationality & Jobs — Where I Am From and What I Do", level:"A1", grammar:"To be (negatives and questions)",
  warmup:["Hi! How are you?","Are you busy today?","What's your name again? Where are you from?"],
  review:["Recap week 1: What's your name? / How old are you? / Where are you from?"],
  leadin:{text:"Everyone comes from somewhere and (almost always) has a job. Today we learn to talk about work and nationality.",q:"What's your job? What do you do?"},
  vocab:[
    {en:"job",ipa:"/dʒɒb/",pt:"work you do for money"},
    {en:"teacher",ipa:"/ˈtiːtʃə/",pt:"someone who teaches"},
    {en:"doctor",ipa:"/ˈdɒktə/",pt:"someone who treats sick people"},
    {en:"engineer",ipa:"/ˌendʒɪˈnɪə/",pt:"someone who designs machines or buildings"},
    {en:"nurse",ipa:"/nɜːs/",pt:"someone who cares for patients"},
    {en:"student",ipa:"/ˈstjuːdnt/",pt:"someone who studies"},
    {en:"retired",ipa:"/rɪˈtaɪəd/",pt:"no longer working"},
    {en:"Brazilian",ipa:"/brəˈzɪliən/",pt:"from Brazil"},
    {en:"work",ipa:"/wɜːk/",pt:"to work"},
    {en:"busy",ipa:"/ˈbɪzi/",pt:"having a lot to do"}
  ],
  grammar:{exp:"Negative: put NOT after the verb to be → I'm not, he isn't, they aren't. Question: invert → Are you...? Is he...? Short answer: Yes, I am / No, I'm not.",
    ex:["I'm not a doctor.","She isn't Brazilian.","Are you a teacher? — Yes, I am.","Is he a student? — No, he isn't."]},
  practice:[
    {q:"___ you a teacher?",a:"Are"},
    {q:"He ___ (not) from the USA.",a:"isn't / is not"},
    {q:"___ she a nurse?",a:"Is"},
    {q:"I ___ (not) tired today.",a:"am not / 'm not"}
  ],
  speaking:[
    "What's your job?",
    "Are you happy with your job?",
    "Are you a student now?",
    "What's your nationality?",
    "Is your job difficult?",
    "Are you busy at work these days?",
    "What's your dream job?",
    "Are your colleagues nice?"
  ],
  roleplay:{title:"Role-play: Quick interview",scenario:"One is the interviewer, the other answers. Then swap.",lines:["A: What's your name?","B: ___","A: What do you do?","B: I'm a ___.","A: Are you Brazilian?","B: Yes, I am. / No, I'm not — I'm ___."]},
  homework:{tasks:["Write 5 sentences about your job (or a friend's)","Describe the nationality of 3 famous people"],link:"https://test-english.com/grammar-points/a1/to-be-2/"}
},
{
  week:3, theme:"Family — My Family", level:"A1", grammar:"Possessive adjectives (my, your, his...)",
  warmup:["Hi! How's your day?","How are you feeling today?","Are you tired or full of energy?"],
  review:["Recap: What's your job? Are you married or single?"],
  leadin:{text:"Family is a topic every adult loves talking about. Show a photo or talk about the people closest to you.",q:"How many people are in your family?"},
  vocab:[
    {en:"mother",ipa:"/ˈmʌðə/",pt:"female parent"},
    {en:"father",ipa:"/ˈfɑːðə/",pt:"male parent"},
    {en:"brother",ipa:"/ˈbrʌðə/",pt:"male sibling"},
    {en:"sister",ipa:"/ˈsɪstə/",pt:"female sibling"},
    {en:"son",ipa:"/sʌn/",pt:"male child"},
    {en:"daughter",ipa:"/ˈdɔːtə/",pt:"female child"},
    {en:"husband",ipa:"/ˈhʌzbənd/",pt:"a woman's husband"},
    {en:"wife",ipa:"/waɪf/",pt:"a man's wife"},
    {en:"children",ipa:"/ˈtʃɪldrən/",pt:"your sons and daughters"},
    {en:"parents",ipa:"/ˈpeərənts/",pt:"mother and father"}
  ],
  grammar:{exp:"Possessives show who something belongs to: my, your, his, her, our, their. They come before the noun: This is <b>my</b> sister. <b>Her</b> name is Ana.",
    ex:["This is my mother.","His father is a doctor.","Her name is Maria.","Our children are students."]},
  practice:[
    {q:"This is ___ (I) brother.",a:"my"},
    {q:"Ana is a nurse. ___ (she) job is hard.",a:"Her"},
    {q:"Tom and I have a house. ___ (nosso) house is small.",a:"Our"},
    {q:"They love ___ (deles) parents.",a:"their"}
  ],
  speaking:[
    "How many people are in your family?",
    "Do you have brothers or sisters? How many?",
    "What's your mother's name?",
    "Are you close to your family?",
    "Do you have children? Tell me about them.",
    "Who is your favorite person in the family? Why?",
    "Tell me about your family in 4 sentences."
  ],
  roleplay:{title:"Role-play: Showing photos",scenario:"One shows photos (real or imaginary) and describes them; the other asks questions.",lines:["A: This is my ___. Her/His name is ___.","B: Nice! How old is she/he?","A: She/He is ___.","B: What does she/he do?"]},
  homework:{tasks:["Describe your family in 5 sentences using possessives","Draw a simple family tree with the names in English"],link:"https://test-english.com/grammar-points/a1/possessive-adjectives-pronouns/"}
},
{
  week:4, theme:"Daily Routine — My Routine", level:"A1", grammar:"Simple Present",
  warmup:["Good morning! How are you?","What time did you wake up today?","Did you have coffee already?"],
  review:["Recap: Tell me about your family. How many brothers/sisters?"],
  leadin:{text:"What do you do every day? Routine is great because it is concrete and the student has a lot to say.",q:"What do you do every morning?"},
  vocab:[
    {en:"wake up",ipa:"/weɪk ʌp/",pt:"to stop sleeping"},
    {en:"get up",ipa:"/ɡet ʌp/",pt:"to get out of bed"},
    {en:"take a shower",ipa:"/teɪk ə ˈʃaʊə/",pt:"to wash your body"},
    {en:"have breakfast",ipa:"/hæv ˈbrekfəst/",pt:"to eat the morning meal"},
    {en:"go to work",ipa:"/ɡəʊ tə wɜːk/",pt:"to go to your job"},
    {en:"have lunch",ipa:"/hæv lʌntʃ/",pt:"to eat the midday meal"},
    {en:"cook",ipa:"/kʊk/",pt:"to prepare food"},
    {en:"have dinner",ipa:"/hæv ˈdɪnə/",pt:"to eat the evening meal"},
    {en:"go to bed",ipa:"/ɡəʊ tə bed/",pt:"to go to sleep"},
    {en:"sleep",ipa:"/sliːp/",pt:"to rest at night"}
  ],
  grammar:{exp:"Simple Present = routine and habit. I/you/we/they + verb. He/she/it + verb with <b>-s</b>. Times: at 7 o'clock, at 8 AM.",
    ex:["I wake up at 7 o'clock.","She goes to work at 8 AM.","He has lunch at noon.","We go to bed late."]},
  practice:[
    {q:"I ___ at 6.",a:"wake up"},
    {q:"She ___ (go) to work by car.",a:"goes"},
    {q:"He ___ (have) breakfast at 8.",a:"has"},
    {q:"They ___ 8 hours.",a:"sleep"}
  ],
  speaking:[
    "What time do you wake up?",
    "What do you have for breakfast?",
    "What time do you start work?",
    "When do you have lunch?",
    "What do you do after work?",
    "What time do you go to bed?",
    "Describe your typical day, morning to night."
  ],
  roleplay:{title:"Role-play: Same routines?",scenario:"Each one describes their morning. Find ONE thing you both do the same.",lines:["A: I wake up at ___ and I ___.","B: I wake up at ___ too! Then I ___.","A: We both ___!"]},
  homework:{tasks:["Write your full routine (morning, afternoon, night)","Record an audio describing your day"],link:"https://test-english.com/grammar-points/a1/present-simple/"}
},
{
  week:5, theme:"Frequency — How Often", level:"A1", grammar:"Frequency adverbs",
  warmup:["Hi! How often do we meet? :)","How are you today?","What did you do this morning?"],
  review:["Recap the routine: What time do you wake up? What do you do after work?"],
  leadin:{text:"Not everything happens every day. Today we learn to say HOW OFTEN we do things.",q:"How often do you exercise?"},
  vocab:[
    {en:"always",ipa:"/ˈɔːlweɪz/",pt:"100% of the time"},
    {en:"usually",ipa:"/ˈjuːʒuəli/",pt:"most of the time"},
    {en:"often",ipa:"/ˈɒfn/",pt:"many times"},
    {en:"sometimes",ipa:"/ˈsʌmtaɪmz/",pt:"now and then"},
    {en:"rarely",ipa:"/ˈreəli/",pt:"almost never"},
    {en:"never",ipa:"/ˈnevə/",pt:"0% of the time"},
    {en:"every day",ipa:"/ˈevri deɪ/",pt:"each day"},
    {en:"once a week",ipa:"/wʌns ə wiːk/",pt:"one time each week"}
  ],
  grammar:{exp:"The adverb goes <b>before</b> the main verb, but <b>after</b> the verb to be. Expressions like \"every day / once a week\" go at the end of the sentence.",
    ex:["I always drink coffee.","She usually works from home.","He is never late.","We travel twice a year."]},
  practice:[
    {q:"I ___ eat breakfast.",a:"always"},
    {q:"She is ___ tired (raramente).",a:"rarely"},
    {q:"They ___ go out.",a:"sometimes"},
    {q:"He ___ smokes.",a:"never"}
  ],
  speaking:[
    "How often do you exercise?",
    "Do you always eat breakfast?",
    "What do you usually do on weekends?",
    "How often do you see your friends?",
    "How often do you cook at home?",
    "What do you never do?",
    "How often do you travel?"
  ],
  roleplay:{title:"Role-play: \"How often\" survey",scenario:"Ask your partner 3 \"How often...?\" questions. Then they ask you.",lines:["A: How often do you ___?","B: I ___ ___. And you?","A: I ___ ___."]},
  homework:{tasks:["Write 5 sentences about yourself with frequency adverbs","Make a list: things you always/never do"],link:"https://test-english.com/grammar-points/a1/adverbs-of-frequency/"}
},
{
  week:6, theme:"Free Time", level:"A1", grammar:"like / love / hate + -ing",
  warmup:["Hi! How was your weekend?","Are you relaxed or stressed today?","What did you do for fun recently?"],
  review:["Recap frequency: How often do you exercise? What do you usually do on weekends?"],
  leadin:{text:"Everyone has something they love doing in their free time. This topic gets adults talking.",q:"What do you like doing in your free time?"},
  vocab:[
    {en:"read",ipa:"/riːd/",pt:"to look at a book"},
    {en:"watch TV",ipa:"/wɒtʃ ˌtiːˈviː/",pt:"to watch television"},
    {en:"listen to music",ipa:"/ˈlɪsn tə ˈmjuːzɪk/",pt:"to listen to songs"},
    {en:"travel",ipa:"/ˈtrævl/",pt:"to go to other places"},
    {en:"dance",ipa:"/dɑːns/",pt:"to move to music"},
    {en:"go out",ipa:"/ɡəʊ aʊt/",pt:"to go out"},
    {en:"relax",ipa:"/rɪˈlæks/",pt:"to rest and calm down"},
    {en:"paint",ipa:"/peɪnt/",pt:"to make a picture with colors"},
    {en:"garden",ipa:"/ˈɡɑːdn/",pt:"to take care of a garden"},
    {en:"hobby",ipa:"/ˈhɒbi/",pt:"a free-time activity"}
  ],
  grammar:{exp:"After like / love / enjoy / hate, the verb takes <b>-ing</b>: I like read<b>ing</b>. Negative: I don't like cooking. He doesn't like running.",
    ex:["I love reading.","She enjoys dancing.","I don't like cooking.","He hates waking up early."]},
  practice:[
    {q:"I like ___ (read) books.",a:"reading"},
    {q:"She loves ___ (dance).",a:"dancing"},
    {q:"They don't like ___ (cook).",a:"cooking"},
    {q:"He enjoys ___ (travel).",a:"traveling"}
  ],
  speaking:[
    "What do you like doing in your free time?",
    "Do you like reading? What kind of books?",
    "What music do you love?",
    "Do you enjoy cooking?",
    "What don't you like doing at all?",
    "How do you relax after a hard day?",
    "What's your favorite hobby? Why?"
  ],
  roleplay:{title:"Role-play: Find a hobby in common",scenario:"Talk about your likes until you find something you both enjoy doing.",lines:["A: I really like ___. Do you like it too?","B: Not really. But I love ___.","A: Me too! We both like ___."]},
  homework:{tasks:["Write 5 sentences about what you like and don't like doing","Make a list of your 3 favorite hobbies"],link:"https://test-english.com/grammar-points/a1/verbs-ing-infinitive/"}
},
{
  week:7, theme:"Sports & Now", level:"A1", grammar:"Present Continuous (now) vs Simple Present (habit)",
  warmup:["Hi! What are you doing right now? (You're speaking English!)","How are you today?","Are you doing any sport these days?"],
  review:["Recap free time: What's your favorite hobby? What do you like doing?"],
  leadin:{text:"An important and fun difference: what you always do (habit) vs what you are doing NOW.",q:"What are you doing right now?"},
  vocab:[
    {en:"football",ipa:"/ˈfʊtbɔːl/",pt:"a game with feet and a ball"},
    {en:"running",ipa:"/ˈrʌnɪŋ/",pt:"the sport of running"},
    {en:"swimming",ipa:"/ˈswɪmɪŋ/",pt:"the sport of swimming"},
    {en:"gym",ipa:"/dʒɪm/",pt:"a place to exercise"},
    {en:"walking",ipa:"/ˈwɔːkɪŋ/",pt:"the activity of walking"},
    {en:"cycling",ipa:"/ˈsaɪklɪŋ/",pt:"the sport of cycling"},
    {en:"yoga",ipa:"/ˈjəʊɡə/",pt:"gentle stretching exercise"},
    {en:"team",ipa:"/tiːm/",pt:"a group of players"},
    {en:"win",ipa:"/wɪn/",pt:"to be the winner"},
    {en:"right now",ipa:"/raɪt naʊ/",pt:"at this moment"}
  ],
  grammar:{exp:"Present Continuous = now: am/is/are + verb-<b>ing</b>. Compare: I usually play football (habit), but right now I <b>am studying</b> English (now).",
    ex:["I'm studying English right now.","She is running in the park.","We are talking on the phone.","They are watching a game now."]},
  practice:[
    {q:"Right now I ___ (speak) English.",a:"am speaking / 'm speaking"},
    {q:"She ___ (run) at the moment.",a:"is running"},
    {q:"Usually he ___ (play) football on Sundays.",a:"plays"},
    {q:"Look! They ___ (swim).",a:"are swimming"}
  ],
  speaking:[
    "Do you play any sport?",
    "What sport do you like watching?",
    "Do you go to the gym? How often?",
    "What are you doing right now?",
    "Are you doing any exercise these days?",
    "What do you usually do on Sundays? And what are you doing this Sunday?",
    "What's your favorite team?"
  ],
  roleplay:{title:"Role-play: What are they doing?",scenario:"Imagine 3 people in different places. Describe what each one is doing now.",lines:["A: The man in the park is ___ing.","B: The woman at home is ___ing.","A: The children are ___ing."]},
  homework:{tasks:["Write 3 habit sentences + 2 \"right now\" sentences","Record an audio: \"Right now I am...\""],link:"https://test-english.com/grammar-points/a1/present-continuous/"}
},
{
  week:8, theme:"Review — Big Conversation (recap 1-7)", level:"A1", grammar:"Everything: to be, present simple, frequency, -ing, continuous",
  warmup:["Hi! Ready for a big conversation today?","How are you feeling about your English?","Can you say 3 sentences about yourself? Go!"],
  review:["Today there is NO new content — it is a day to SPEAK and review everything with confidence."],
  leadin:{text:"Consolidation week. The goal is for the student to speak a lot, combining identity + routine + likes + sports. Pure speaking.",q:"Tell me everything about you — who you are, your routine, and what you love."},
  vocab:[
    {en:"(review)",ipa:"—",pt:"Quickly review the vocabulary from weeks 1 to 7 before speaking."}
  ],
  grammar:{exp:"No new grammar. Notice whether the student uses these well: to be, verb with -s (he/she), frequency adverbs and the difference habit × now.",
    ex:["I'm ___ and I'm from ___.","I usually ___, but right now I'm ___.","I love ___ing.","I never ___."]},
  practice:[
    {q:"Self-check: Can you introduce yourself? (name, age, from)",a:"✓ if you can do it without help"},
    {q:"Can you describe your daily routine?",a:"✓ if you can do it without help"},
    {q:"Can you say what you like and don't like doing?",a:"✓ if you can do it without help"},
    {q:"Can you say what you're doing right now?",a:"✓ if you can do it without help"}
  ],
  speaking:[
    "Introduce yourself completely (name, age, city, job).",
    "Tell me about your family.",
    "Describe your daily routine.",
    "What do you usually do on weekends?",
    "What do you love doing? What do you hate doing?",
    "Do you play any sport?",
    "What are you doing today after this class?",
    "How often do you speak English?",
    "What's your dream for this year?",
    "What was the most useful thing you learned in these weeks?"
  ],
  roleplay:{title:"Role-play: New friend (put it all together)",scenario:"One plays someone who has just met you and wants to know EVERYTHING. The other answers in full sentences. Then swap.",lines:["A: Hi! Nice to meet you. Tell me about yourself.","B: (name, age, city, job)","A: What do you do every day?","B: (routine + frequency)","A: And what do you love doing?","B: (likes + sport)"]},
  homework:{tasks:["Record a 1-minute audio talking about yourself (put it all together)","Take the A1 review test on Test-English"],link:"https://test-english.com/grammar-points/a1/"}
},
{
  week:9, theme:"Food & Drinks — What I Eat", level:"A2", grammar:"Countable & uncountable (some/any, much/many)",
  warmup:["Hello! How are you today?","What did you have for breakfast?","Are you hungry now?"],
  review:["What do you like doing in your free time?","I like cook___ / She is play___ tennis now."],
  leadin:{text:"Food is the easiest topic in the world. Everyone eats, everyone has an opinion.",q:"What is your favourite food?"},
  vocab:[
    {en:"breakfast",ipa:"/ˈbrekfəst/",pt:"the first meal of the day"},
    {en:"lunch",ipa:"/lʌntʃ/",pt:"the midday meal"},
    {en:"dinner",ipa:"/ˈdɪnə/",pt:"the evening meal"},
    {en:"meat",ipa:"/miːt/",pt:"food from animals"},
    {en:"vegetables",ipa:"/ˈvedʒtəblz/",pt:"plants you eat, like carrots"},
    {en:"fruit",ipa:"/fruːt/",pt:"sweet food from plants, like apples"},
    {en:"rice",ipa:"/raɪs/",pt:"small white grains you cook"},
    {en:"cheese",ipa:"/tʃiːz/",pt:"food made from milk"},
    {en:"delicious",ipa:"/dɪˈlɪʃəs/",pt:"very tasty"},
    {en:"I'm starving",ipa:"/aɪm ˈstɑːvɪŋ/",pt:"I am very hungry"}
  ],
  grammar:{exp:"Countable nouns can be counted (one apple, two apples). Uncountable nouns cannot (rice, water, milk). Use <b>some</b> in positives, <b>any</b> in negatives and questions. Use <b>many</b> with countable and <b>much</b> with uncountable.",
    ex:["I eat some fruit every day.","There isn't any milk in the fridge.","How many eggs do you want?","How much coffee do you drink?"]},
  practice:[
    {q:"I don't have ___ money.",a:"any"},
    {q:"How ___ apples do you eat?",a:"many"},
    {q:"How ___ water do you drink?",a:"much"},
    {q:"Would you like ___ tea?",a:"some"},
    {q:"There are ___ vegetables in the soup.",a:"some"}
  ],
  speaking:[
    "What do you usually have for breakfast?",
    "What's your favourite food? Why?",
    "Is there any food you don't like?",
    "How much coffee do you drink a day?",
    "Who cooks in your house?",
    "Do you prefer meat or vegetables?",
    "What food is typical in your city?",
    "Tell me everything you ate yesterday.",
    "Are you a good cook? What can you make?"
  ],
  roleplay:{title:"Role-play: Talking about meals",scenario:"A asks B about their eating habits. B answers in full sentences. Then swap.",lines:["A: What do you usually eat for lunch?","B: (meal + some/any)","A: How much water do you drink?","B: (much/many + amount)","A: Is there any food you never eat?","B: (negative + any)"]},
  homework:{tasks:["Write your food diary for one day in English","List 5 countable and 5 uncountable foods"],link:"https://test-english.com/grammar-points/a1/countable-uncountable-nouns/"}
},
{
  week:10, theme:"At the Restaurant — Ordering Food", level:"A2", grammar:"Would like / polite requests",
  warmup:["Hello! How are you?","Do you like eating out?","What was the last restaurant you went to?"],
  review:["Quick check: How ___ sugar? / How ___ apples? (much/many)","Ask: Is there any food you don't like?"],
  leadin:{text:"Ordering food is one of the first real conversations you have in another country.",q:"How often do you eat in restaurants?"},
  vocab:[
    {en:"menu",ipa:"/ˈmenjuː/",pt:"the list of food in a restaurant"},
    {en:"waiter",ipa:"/ˈweɪtə/",pt:"the person who serves you"},
    {en:"order",ipa:"/ˈɔːdə/",pt:"to ask for food"},
    {en:"starter",ipa:"/ˈstɑːtə/",pt:"the small first dish"},
    {en:"main course",ipa:"/meɪn kɔːs/",pt:"the biggest dish"},
    {en:"dessert",ipa:"/dɪˈzɜːt/",pt:"the sweet dish at the end"},
    {en:"bill",ipa:"/bɪl/",pt:"the paper showing what you must pay"},
    {en:"tip",ipa:"/tɪp/",pt:"extra money for good service"},
    {en:"book a table",ipa:"/bʊk ə ˈteɪbl/",pt:"to reserve a table"},
    {en:"Enjoy your meal",ipa:"/ɪnˈdʒɔɪ jɔː miːl/",pt:"what a waiter says before you eat"}
  ],
  grammar:{exp:"<b>Would like</b> ('d like) is the polite way to say 'want'. Structure: would like + noun / would like + to + verb. For requests use <b>Could I...?</b> or <b>Can I...?</b>",
    ex:["I would like a coffee, please. (I'd like)","Would you like a dessert?","I'd like to book a table.","Could I have the bill, please?"]},
  practice:[
    {q:"I ___ like a salad, please.",a:"would / 'd"},
    {q:"___ you like some water?",a:"Would"},
    {q:"I'd like ___ book a table.",a:"to"},
    {q:"___ I have the menu, please?",a:"Could / Can"},
    {q:"We'd like ___ order now. ",a:"to"}
  ],
  speaking:[
    "How often do you eat out?",
    "What's your favourite restaurant? Why?",
    "Do you prefer eating at home or in a restaurant?",
    "What do you usually order?",
    "Do people tip in your country?",
    "Have you ever had bad service? What happened?",
    "What would you like to eat right now?",
    "Do you book a table or just arrive?",
    "Describe the best meal you've had."
  ],
  roleplay:{title:"Role-play: At the restaurant",scenario:"One is the waiter, the other is the customer. Order a full meal, then swap roles.",lines:["A: Good evening! Are you ready to order?","B: (I'd like + starter)","A: And for the main course?","B: (I'd like + main + drink)","A: Would you like a dessert?","B: (accept or refuse politely)","B: (ask for the bill)"]},
  homework:{tasks:["Write a full restaurant dialogue (waiter + customer)","Learn 5 dishes you like in English"],link:"https://test-english.com/grammar-points/a1/would-like/"}
},
{
  week:11, theme:"Shopping — Buying Things", level:"A2", grammar:"This/that/these/those · How much",
  warmup:["Hi! How are you today?","Do you like shopping?","What was the last thing you bought?"],
  review:["Quick check: I ___ like a coffee. (polite)","Ask: Could I have...? — practise one polite request."],
  leadin:{text:"Shopping is a real-life conversation: you ask, you compare, you decide.",q:"Do you prefer shopping online or in shops?"},
  vocab:[
    {en:"shop",ipa:"/ʃɒp/",pt:"a place where you buy things"},
    {en:"price",ipa:"/praɪs/",pt:"how much something costs"},
    {en:"expensive",ipa:"/ɪkˈspensɪv/",pt:"costing a lot of money"},
    {en:"cheap",ipa:"/tʃiːp/",pt:"costing little money"},
    {en:"discount",ipa:"/ˈdɪskaʊnt/",pt:"money taken off the price"},
    {en:"receipt",ipa:"/rɪˈsiːt/",pt:"the paper proving you paid"},
    {en:"cash",ipa:"/kæʃ/",pt:"paper money and coins"},
    {en:"credit card",ipa:"/ˈkredɪt kɑːd/",pt:"a card you pay with"},
    {en:"size",ipa:"/saɪz/",pt:"how big or small something is"},
    {en:"How much is it?",ipa:"/haʊ mʌtʃ ɪz ɪt/",pt:"asking the price"}
  ],
  grammar:{exp:"<b>This</b> (singular, near) · <b>These</b> (plural, near) · <b>That</b> (singular, far) · <b>Those</b> (plural, far). To ask prices: <b>How much is</b> + singular / <b>How much are</b> + plural.",
    ex:["This shirt is nice. (here)","These shoes are expensive. (here)","That bag is cheap. (over there)","How much are those glasses?"]},
  practice:[
    {q:"___ shirt here is nice.",a:"This"},
    {q:"___ shoes here are expensive.",a:"These"},
    {q:"___ car over there is new.",a:"That"},
    {q:"How much ___ this bag?",a:"is"},
    {q:"How much ___ those trousers?",a:"are"}
  ],
  speaking:[
    "Do you like shopping? Why or why not?",
    "Do you prefer online or in a shop?",
    "What's the last thing you bought?",
    "Do you usually pay by card or cash?",
    "What's the most expensive thing you own?",
    "Do you look for discounts?",
    "Is shopping expensive in your city?",
    "What would you buy if you had 1000 reais?",
    "Who spends more, you or your family?"
  ],
  roleplay:{title:"Role-play: In a shop",scenario:"One is the shop assistant, the other is the customer. Ask prices, sizes, and decide. Then swap.",lines:["A: Hello, can I help you?","B: (ask about an item using this/that)","A: It's ___ reais.","B: (ask for a different size)","A: Here you are.","B: (decide and ask how to pay)"]},
  homework:{tasks:["Write a shop dialogue asking about 3 items and prices","Photograph 5 things at home and write their price in English"],link:"https://test-english.com/grammar-points/a1/this-that-these-those/"}
},
{
  week:12, theme:"Clothes — What I Wear", level:"A2", grammar:"Present continuous vs present simple (wear)",
  warmup:["Hi! How are you?","What are you wearing today?","Is it hot or cold today?"],
  review:["Quick check: ___ shoes are nice. (near, plural)","Ask: How much is that jacket?"],
  leadin:{text:"Clothes let us describe people and talk about weather, work and style — all at once.",q:"What are you wearing right now?"},
  vocab:[
    {en:"shirt",ipa:"/ʃɜːt/",pt:"clothing for the top of your body"},
    {en:"trousers",ipa:"/ˈtraʊzəz/",pt:"clothing for your legs"},
    {en:"dress",ipa:"/dres/",pt:"a one-piece garment"},
    {en:"jacket",ipa:"/ˈdʒækɪt/",pt:"a short coat"},
    {en:"shoes",ipa:"/ʃuːz/",pt:"what you wear on your feet"},
    {en:"wear",ipa:"/weə/",pt:"to have clothes on your body"},
    {en:"try on",ipa:"/traɪ ɒn/",pt:"to put clothes on to test them"},
    {en:"fit",ipa:"/fɪt/",pt:"to be the right size"},
    {en:"comfortable",ipa:"/ˈkʌmftəbl/",pt:"nice and easy to wear"},
    {en:"It suits you",ipa:"/ɪt suːts juː/",pt:"it looks good on you"}
  ],
  grammar:{exp:"Use <b>present simple</b> for what you usually wear: I wear a suit to work. Use <b>present continuous</b> for what you are wearing now: I am wearing jeans.",
    ex:["I usually wear jeans. (habit)","Today I'm wearing a dress. (now)","She wears black every day.","Look! He's wearing your jacket!"]},
  practice:[
    {q:"I usually ___ jeans.",a:"wear"},
    {q:"Right now I ___ (wear) a shirt.",a:"am wearing"},
    {q:"She ___ (wear) a uniform at work every day.",a:"wears"},
    {q:"What ___ you ___ (wear) today?",a:"are / wearing"},
    {q:"He ___ (not/wear) a tie today.",a:"isn't wearing"}
  ],
  speaking:[
    "What are you wearing right now?",
    "What do you usually wear to work?",
    "What do you wear at the weekend?",
    "Do you like shopping for clothes?",
    "What's your favourite piece of clothing? Why?",
    "Do you wear different clothes in winter?",
    "Describe what your best friend usually wears.",
    "Do clothes say something about a person?",
    "What would you never wear?"
  ],
  roleplay:{title:"Role-play: Trying clothes on",scenario:"One is the shop assistant, the other is trying clothes. Use 'try on', size and 'It suits you'. Then swap.",lines:["A: Can I help you?","B: (ask to try something on)","A: What size are you?","B: (answer + ask where the fitting room is)","A: How is it?","B: (say it fits / doesn't fit and why)"]},
  homework:{tasks:["Describe what 3 people in your family usually wear","Write 5 sentences: what you wear vs what you're wearing now"],link:"https://test-english.com/grammar-points/a1/present-simple-continuous/"}
},
{
  week:13, theme:"My City — Places & Directions", level:"A2", grammar:"There is/are · Prepositions of place",
  warmup:["Hello! How are you today?","Do you like the city where you live?","How do you get to work?"],
  review:["Quick check: I ___ (wear) a jacket right now.","Ask: What do you usually wear at the weekend?"],
  leadin:{text:"Talking about your city means describing places, giving directions and having an opinion.",q:"What city do you live in? Do you like it?"},
  vocab:[
    {en:"downtown",ipa:"/ˌdaʊnˈtaʊn/",pt:"the city centre"},
    {en:"neighbourhood",ipa:"/ˈneɪbəhʊd/",pt:"the area where you live"},
    {en:"square",ipa:"/skweə/",pt:"an open public space in a city"},
    {en:"bank",ipa:"/bæŋk/",pt:"where you keep your money"},
    {en:"pharmacy",ipa:"/ˈfɑːməsi/",pt:"where you buy medicine"},
    {en:"bus stop",ipa:"/bʌs stɒp/",pt:"where you wait for the bus"},
    {en:"next to",ipa:"/nekst tuː/",pt:"at the side of"},
    {en:"opposite",ipa:"/ˈɒpəzɪt/",pt:"on the other side, facing"},
    {en:"between",ipa:"/bɪˈtwiːn/",pt:"in the middle of two things"},
    {en:"Turn left / right",ipa:"/tɜːn left raɪt/",pt:"directions to change your way"}
  ],
  grammar:{exp:"<b>There is</b> + singular, <b>There are</b> + plural to say what exists in a place. Prepositions locate things: <b>in / on / next to / opposite / between / near</b>.",
    ex:["There is a bank next to the pharmacy.","There are two parks in my city.","The bus stop is opposite the square.","My house is between the school and the bank."]},
  practice:[
    {q:"___ a park near my house.",a:"There is"},
    {q:"___ three banks downtown.",a:"There are"},
    {q:"The pharmacy is ___ to the bank. (at the side)",a:"next"},
    {q:"The cinema is ___ the square. (facing it)",a:"opposite"},
    {q:"My house is ___ the school and the park.",a:"between"}
  ],
  speaking:[
    "What city do you live in?",
    "What is there in your neighbourhood?",
    "Is there a park near your house?",
    "What's the best place in your city? Why?",
    "How do you go downtown?",
    "Is your city safe? Is it expensive?",
    "What would you show a tourist in your city?",
    "What is your city missing?",
    "Would you like to live in another city? Where?"
  ],
  roleplay:{title:"Role-play: Asking for directions",scenario:"One is a tourist who is lost, the other is a local. Give directions using prepositions. Then swap.",lines:["A: Excuse me, is there a pharmacy near here?","B: (There is/are + preposition)","A: How do I get there?","B: (Turn left / right + go straight)","A: Is it far?","B: (answer + say what is next to it)"]},
  homework:{tasks:["Describe your neighbourhood in 8 sentences using There is/are","Draw a simple map and write directions from your house to a shop"],link:"https://test-english.com/grammar-points/a1/there-is-there-are/"}
},

/* ============================================================
   THEMATIC LIBRARY (weeks 14+)
   Adiciona 30 lessons temáticas em A1/A2/B1/B2, seguindo o
   mesmo schema. Perguntas do bloco `speaking` já embutem, quando
   pertinente: Real-life situation, Complete-the-sentence,
   Quick choice / Would you rather, e Challenge.
   ============================================================ */

/* ---------- 14. TRAVELING (A1) ---------- */
{week:14, theme:"Traveling — The Basics", level:"A1", grammar:"like / love / hate + noun",
 warmup:["Do you like travelling?","Where was your last trip?","Beach or city?"],
 review:["Quick check: I ___ (love) the sea. She ___ (not/like) long flights."],
 leadin:{text:"Everyone has a favourite place. Travel is the easiest topic to open a real conversation.",q:"Where do you want to go next?"},
 vocab:[
  {en:"trip",ipa:"/trɪp/",pt:"a short journey"},
  {en:"suitcase",ipa:"/ˈsuːtkeɪs/",pt:"a bag for clothes when you travel"},
  {en:"beach",ipa:"/biːtʃ/",pt:"sand next to the sea"},
  {en:"mountain",ipa:"/ˈmaʊntɪn/",pt:"very high land"},
  {en:"passport",ipa:"/ˈpɑːspɔːt/",pt:"the little book you need to travel abroad"},
  {en:"ticket",ipa:"/ˈtɪkɪt/",pt:"the paper that lets you travel"},
  {en:"map",ipa:"/mæp/",pt:"a picture of a place"},
  {en:"souvenir",ipa:"/ˌsuːvəˈnɪə/",pt:"a small object to remember a place"},
  {en:"pack",ipa:"/pæk/",pt:"to put things in a bag"},
  {en:"abroad",ipa:"/əˈbrɔːd/",pt:"in another country"}
 ],
 grammar:{exp:"Talk about preferences with <b>like / love / hate + noun or -ing</b>: I love the beach. I don't like flying. Ask: Do you like ___?",
  ex:["I love travelling.","I don't like long flights.","She loves the mountains.","Do you like the beach?"]},
 practice:[
  {q:"I ___ travelling by plane. (love)",a:"love"},
  {q:"___ you like the beach?",a:"Do"},
  {q:"She ___ (not/like) hot weather.",a:"doesn't like"},
  {q:"We ___ small hotels.",a:"like / love"}
 ],
 speaking:[
  "Do you like travelling? Why?",
  "Where do you want to go next?",
  "QUICK CHOICE: Beach or mountains?",
  "QUICK CHOICE: Hotel or Airbnb?",
  "QUICK CHOICE: Plan everything or improvise?",
  "What do you always take in your suitcase?",
  "What do you NEVER take?",
  "COMPLETE: The best trip I have taken was ___.",
  "COMPLETE: One place I really want to visit is ___.",
  "COMPLETE: When I travel, I always ___.",
  "SITUATION: You are packing tonight for a 3-day trip. What do you take?",
  "CHALLENGE: You have $200 and one weekend. Where do you go and why?"
 ],
 roleplay:{title:"Role-play: Planning a small trip",scenario:"Two friends plan a weekend trip together. Decide: where, how, hotel or not, budget.",
  lines:["A: Where do you want to go this weekend?","B: I'd like to go to ___.","A: Beach or mountain?","B: ___. And you?","A: How do we go — car or bus?","B: ___."]},
 homework:{tasks:["Write 5 sentences about places you love and don't like","List 8 things you always pack"],link:"https://test-english.com/grammar-points/a1/verb-to-like/"}
},

/* ---------- 15. TRAVELING (B1) ---------- */
{week:15, theme:"Traveling — Memorable Trips", level:"B1", grammar:"Past simple + ever / never / for storytelling",
 warmup:["What was the last trip you took?","Do you prefer planning everything or being spontaneous?","Have you ever travelled alone?"],
 review:["Quick check: Have you ever ___ (be) to Europe? I ___ (visit) Peru last year."],
 leadin:{text:"At B1 the goal is to TELL stories: what happened, what was surprising, what you would do differently.",q:"Tell me about your most memorable trip."},
 vocab:[
  {en:"jet lag",ipa:"/ˈdʒet læɡ/",pt:"tiredness after a long flight"},
  {en:"itinerary",ipa:"/aɪˈtɪnərəri/",pt:"the plan of what you do each day"},
  {en:"local",ipa:"/ˈləʊkl/",pt:"typical of the place / someone who lives there"},
  {en:"off the beaten track",ipa:"/ɒf ðə ˈbiːtn træk/",pt:"far from touristy places"},
  {en:"get lost",ipa:"/ɡet lɒst/",pt:"to not know where you are"},
  {en:"budget",ipa:"/ˈbʌdʒɪt/",pt:"the money you plan to spend"},
  {en:"delayed",ipa:"/dɪˈleɪd/",pt:"late"},
  {en:"stunning",ipa:"/ˈstʌnɪŋ/",pt:"very beautiful"},
  {en:"crowded",ipa:"/ˈkraʊdɪd/",pt:"full of people"},
  {en:"worth (the money / it)",ipa:"/wɜːθ/",pt:"good value for what you paid"},
  {en:"backpack",ipa:"/ˈbækpæk/",pt:"a bag you carry on your back"},
  {en:"end up (+ -ing)",ipa:"/end ʌp/",pt:"to finally do / be somewhere without planning"}
 ],
 grammar:{exp:"For memories mix <b>past simple</b> (concrete events) with <b>ever/never</b> (life experience): I <b>went</b> to Japan in 2019 — one of the best trips I <b>have ever taken</b>.",
  ex:["The flight was delayed for six hours.","We ended up staying an extra day.","I've never done anything like that before.","It was worth every penny."]},
 practice:[
  {q:"We ___ (get) lost twice, but it ___ (be) fun.",a:"got / was"},
  {q:"Have you ever ___ (be) to Asia?",a:"been"},
  {q:"It ___ (be) the most beautiful place I have ever seen.",a:"was"},
  {q:"The hotel wasn't ___ the price. (value)",a:"worth"}
 ],
 speaking:[
  "Tell me about the most memorable trip you've taken.",
  "What went wrong on a trip? How did you handle it?",
  "Do you prefer to plan everything or improvise?",
  "Have you ever travelled alone? What was it like?",
  "What's a place tourists love but you found overrated?",
  "What place surprised you the most?",
  "QUICK CHOICE: One long trip or three short ones a year?",
  "QUICK CHOICE: Familiar country or somewhere you've never been?",
  "COMPLETE: The best money I've spent on a trip was on ___.",
  "COMPLETE: If I could travel anywhere tomorrow, I would ___ because ___.",
  "SITUATION: Your flight is delayed 8 hours and you have an important meeting tomorrow. What do you say to the airline?",
  "CHALLENGE: Convince me to visit your country in one minute.",
  "FOLLOW-UP: Why do you think that trip stayed with you?",
  "FOLLOW-UP: Would you go back — or would you rather see somewhere new?"
 ],
 roleplay:{title:"Role-play: Telling a travel story",scenario:"A tells B about a trip that didn't go as planned. B reacts, asks 3 follow-up questions and then compares with their own story. Swap.",
  lines:["A: Something crazy happened when I went to ___.","B: Really? What happened?","A: (2-3 sentences)","B: (react + ask a follow-up)","A: (answer + close the story)","B: That reminds me of..."]},
 homework:{tasks:["Write a 150-word account of a memorable trip using past simple + present perfect","Record a 90-second audio: 'The best trip I've ever taken'"],link:"https://test-english.com/grammar-points/b1/past-simple-past-continuous/"}
},

/* ---------- 16. TRAVELING (B2) ---------- */
{week:16, theme:"Traveling — Tourism & Its Impact", level:"B2", grammar:"Discourse markers · cause & effect language",
 warmup:["Do you think tourism has become too much of a good thing?","How has social media changed the way we travel?","When you're abroad, are you a traveller or a tourist?"],
 review:["Quick check: paraphrase — 'Tourism damages the environment' with therefore / consequently."],
 leadin:{text:"Travel today is a big industry with big consequences. B2 goal: argue, compare and hedge with real nuance.",q:"Is tourism helping or hurting the places we love?"},
 vocab:[
  {en:"overtourism",ipa:"/ˌəʊvəˈtʊərɪzəm/",pt:"too many tourists in one place"},
  {en:"sustainable",ipa:"/səˈsteɪnəbl/",pt:"can continue without damaging the environment"},
  {en:"authentic",ipa:"/ɔːˈθentɪk/",pt:"real, not made for tourists"},
  {en:"gentrification",ipa:"/ˌdʒentrɪfɪˈkeɪʃn/",pt:"when an area becomes expensive and locals are pushed out"},
  {en:"footprint",ipa:"/ˈfʊtprɪnt/",pt:"the impact you leave"},
  {en:"commodify",ipa:"/kəˈmɒdɪfaɪ/",pt:"to turn something into a product to sell"},
  {en:"cultural exchange",ipa:"/ˈkʌltʃərəl ɪksˈtʃeɪndʒ/",pt:"people from different cultures learning from each other"},
  {en:"revenue",ipa:"/ˈrevənjuː/",pt:"income, money coming in"},
  {en:"curated",ipa:"/kjʊəˈreɪtɪd/",pt:"carefully selected to look a certain way"},
  {en:"perform (for a camera)",ipa:"/pəˈfɔːm/",pt:"to act, especially for others to watch"},
  {en:"on the surface / deep down",ipa:"—",pt:"at first appearance / really"},
  {en:"a double-edged sword",ipa:"—",pt:"something with both good and bad sides"}
 ],
 grammar:{exp:"To argue clearly use discourse markers: <b>on the one hand / on the other hand · however · nevertheless · that said · granted · to be fair · arguably</b>. To hedge: <b>tends to · it could be argued that · to some extent</b>.",
  ex:["Tourism brings revenue; however, it often prices locals out.","That said, banning tourists is not realistic.","Arguably, social media has turned travel into performance.","To some extent, we all do this."]},
 practice:[
  {q:"Rephrase: 'Tourism is good for jobs, but it damages neighbourhoods.' Use <b>on the one hand / on the other</b>.",a:"On the one hand, tourism creates jobs; on the other, it damages neighbourhoods."},
  {q:"Soften: 'This is destroying the city.' (hedge)",a:"Arguably / To some extent, this is damaging the city."},
  {q:"Link: 'Rents went up. Locals moved out.' (cause & effect)",a:"Rents went up; as a result / consequently, locals moved out."},
  {q:"Concede then push back: 'Tourism creates income, ___ it also...'",a:"granted / admittedly, ... but"}
 ],
 speaking:[
  "How does tourism affect local communities — for better or worse?",
  "Has social media changed HOW people travel, or WHY?",
  "Is travelling becoming more about content than experience?",
  "Should popular cities limit the number of tourists?",
  "Is 'authentic travel' still possible in 2026?",
  "Who's responsible for overtourism — travellers, governments, or platforms like Airbnb?",
  "COMPARE: Backpacking in your 20s vs travelling with a family — which forms you more?",
  "COMPLETE: The most overrated destination I've been to is ___ because ___.",
  "COMPLETE: If I ran a small tourist town, the first rule I'd set would be ___.",
  "SITUATION: A friend wants to visit a place suffering from overtourism. Convince them to go elsewhere — without being preachy.",
  "CHALLENGE: Defend the position 'Cruise tourism should be banned in historic cities'. Then attack the same position.",
  "FOLLOW-UP: What would change your mind on this?",
  "FOLLOW-UP: Where's the line between visitor and burden?"
 ],
 roleplay:{title:"Debate: Should Instagram-famous places charge much higher entry fees?",scenario:"A defends the fees (protecting the site, funding conservation). B opposes (elitism, access). Speak 2 turns each, then swap positions and argue the other side.",
  lines:["A: (open — take a position)","B: (challenge with a concrete counter-example)","A: (concede one point, then push back)","B: (hedge, then propose an alternative)"]},
 homework:{tasks:["Write a 200-word opinion piece: 'Is social media ruining travel?'","Find one news article on overtourism and summarize the two strongest arguments"],link:"https://test-english.com/grammar-points/b2/linkers-however-nevertheless-still/"}
},

/* ---------- 17. AT THE AIRPORT (A2) ---------- */
{week:17, theme:"At the Airport", level:"A2", grammar:"Going to · polite requests",
 warmup:["Do you like airports?","How do you feel before a flight?","Do you sleep on planes?"],
 review:["Quick check: I'm ___ (go) to travel next month."],
 leadin:{text:"An airport is a whole conversation: check-in, security, gate, boarding. The vocabulary is highly useful.",q:"What's the last airport you were in?"},
 vocab:[
  {en:"check-in",ipa:"/tʃek ɪn/",pt:"to register at the airport before flying"},
  {en:"boarding pass",ipa:"/ˈbɔːdɪŋ pɑːs/",pt:"the paper/QR code that lets you board"},
  {en:"gate",ipa:"/ɡeɪt/",pt:"the door where you board the plane"},
  {en:"security",ipa:"/sɪˈkjʊərəti/",pt:"where they check bags and passengers"},
  {en:"luggage / baggage",ipa:"/ˈlʌɡɪdʒ/",pt:"the bags you travel with"},
  {en:"carry-on",ipa:"/ˈkæri ɒn/",pt:"the small bag you take on the plane"},
  {en:"aisle / window seat",ipa:"/aɪl/",pt:"seat by the corridor / by the window"},
  {en:"delay",ipa:"/dɪˈleɪ/",pt:"when the flight is late"},
  {en:"departure / arrival",ipa:"/dɪˈpɑːtʃə/",pt:"leaving / getting there"},
  {en:"flight attendant",ipa:"/flaɪt əˈtendənt/",pt:"the person who works on the plane"},
  {en:"Could I have...?",ipa:"—",pt:"polite request"}
 ],
 grammar:{exp:"<b>Going to</b> for plans: I'm going to check in online. For polite requests use <b>Could I have...? / Could you...?</b>",
  ex:["I'm going to travel next Tuesday.","Could I have a window seat, please?","Could you help me with this bag?","Is my flight going to be delayed?"]},
 practice:[
  {q:"I ___ (go) to fly to Lisbon tomorrow.",a:"am going to fly"},
  {q:"___ I have an aisle seat, please?",a:"Could"},
  {q:"The flight is going to ___ (be) late.",a:"be"},
  {q:"Where is the ___ for gate 12?",a:"boarding"}
 ],
 speaking:[
  "Do you like flying? What do you like or hate about it?",
  "Aisle, window or middle?",
  "Do you sleep on planes?",
  "What do you take in your carry-on?",
  "Have you ever missed a flight?",
  "What was your worst flight experience?",
  "COMPLETE: The first thing I do at the airport is ___.",
  "COMPLETE: Before a flight I always ___.",
  "SITUATION: You arrive at check-in and your suitcase is 3 kg over the limit. What do you say?",
  "SITUATION: You are at the gate and they announce a 4-hour delay. What do you do first?",
  "CHALLENGE: Give me directions from check-in to boarding in 5 short steps."
 ],
 roleplay:{title:"Role-play: Check-in and requests",scenario:"A is the passenger, B is the check-in agent. A checks in a bag, asks about seat, asks about the gate. Swap.",
  lines:["A: Hi, I'd like to check in for the flight to ___.","B: Passport, please. Any luggage?","A: (answer + ask about seat)","B: (offer options)","A: (choose + ask about the gate)"]},
 homework:{tasks:["Write your full airport routine in English","Learn 10 airport signs in English (e.g. baggage claim, departures)"],link:"https://test-english.com/grammar-points/a2/be-going-to/"}
},

/* ---------- 18. AT THE AIRPORT (B1) ---------- */
{week:18, theme:"At the Airport — When Things Go Wrong", level:"B1", grammar:"Present perfect · reported requests · negotiating",
 warmup:["Has anything ever gone wrong for you at an airport?","How do you deal with delays?","Do you get anxious at airports?"],
 review:["Quick check: The airline has ___ (cancel) my flight."],
 leadin:{text:"At B1 the airport isn't only vocab — it's problem-solving in English. Explain, ask, negotiate.",q:"What was the last airport problem you had?"},
 vocab:[
  {en:"cancelled",ipa:"/ˈkænsəld/",pt:"stopped, not happening"},
  {en:"rebook",ipa:"/riːˈbʊk/",pt:"to book again on a different flight"},
  {en:"connection",ipa:"/kəˈnekʃn/",pt:"a second flight after the first one"},
  {en:"missed connection",ipa:"—",pt:"when you don't make your next flight"},
  {en:"stopover / layover",ipa:"/ˈleɪəʊvə/",pt:"a stop between flights"},
  {en:"compensation",ipa:"/ˌkɒmpenˈseɪʃn/",pt:"money the airline gives you for problems"},
  {en:"voucher",ipa:"/ˈvaʊtʃə/",pt:"a paper you exchange for food, a hotel, etc."},
  {en:"go missing",ipa:"—",pt:"to be lost"},
  {en:"overbooked",ipa:"/ˌəʊvəˈbʊkt/",pt:"more passengers than seats sold"},
  {en:"file a claim",ipa:"/faɪl ə kleɪm/",pt:"to officially ask for compensation"},
  {en:"I understand, but...",ipa:"—",pt:"polite pushback"},
  {en:"What are my options?",ipa:"—",pt:"key phrase to negotiate"}
 ],
 grammar:{exp:"Use <b>present perfect</b> to report problems (result now): My bag <b>has gone missing</b>. My flight <b>has been cancelled</b>. Ask & negotiate: <b>What are my options? / Is there any way you can...?</b>",
  ex:["My flight has been cancelled.","My luggage hasn't arrived.","I've been waiting for two hours.","Is there any way you can put me on the next flight?"]},
 practice:[
  {q:"My flight ___ (be, cancel).",a:"has been cancelled"},
  {q:"My bag ___ (not arrive) yet.",a:"hasn't arrived"},
  {q:"I ___ (wait) here for three hours.",a:"have been waiting"},
  {q:"Rephrase politely: 'Give me a hotel.'",a:"Could you arrange a hotel for me, please?"}
 ],
 speaking:[
  "Have you ever had a flight cancelled? What did you do?",
  "Has an airline ever lost your bag? How did they handle it?",
  "Do you buy travel insurance? Why or why not?",
  "How do you keep calm when things go wrong on a trip?",
  "Are people in your country good at complaining politely?",
  "COMPLETE: The most stressful airport moment I've had was ___.",
  "COMPLETE: If an airline cancels my flight, the first thing I do is ___.",
  "SITUATION: Your flight is cancelled and you have an important interview tomorrow morning in another country. Speak to the airline employee and find a solution.",
  "SITUATION: Your suitcase hasn't arrived after a long flight. It contains your medication. What do you say at the baggage office?",
  "SITUATION: You've been waiting 40 minutes and the person ahead of you is finishing. What do you say to be next efficiently and politely?",
  "CHALLENGE: In 60 seconds, teach me how to complain without being rude.",
  "FOLLOW-UP: What tone works — friendly, formal, or firm?"
 ],
 roleplay:{title:"Role-play: Rebooking a cancelled flight",scenario:"A is the passenger with a cancelled flight and a hard deadline. B is the airline employee with limited options. A must negotiate a solution WITHOUT losing their temper.",
  lines:["A: (explain the problem + why it matters)","B: (apologise + offer option 1)","A: (that doesn't work — why + counter-offer)","B: (offer option 2 + limits)","A: (accept, and ask for compensation)"]},
 homework:{tasks:["Write a 100-word polite complaint email to an airline","List 5 phrases you can use to push back politely"],link:"https://test-english.com/grammar-points/b1/present-perfect-simple-continuous/"}
},

/* ---------- 19. AT THE HOTEL (A2) ---------- */
{week:19, theme:"At the Hotel", level:"A2", grammar:"There is/are · Could I...?",
 warmup:["Do you like hotels?","Cheap and simple or fancy and comfortable?","Do you eat hotel breakfast?"],
 review:["Quick check: ___ there a pool? ___ there any towels?"],
 leadin:{text:"Check-in, small requests, small problems. This is a real-life conversation.",q:"What was the last hotel you stayed at?"},
 vocab:[
  {en:"reservation",ipa:"/ˌrezəˈveɪʃn/",pt:"a booking"},
  {en:"single / double room",ipa:"—",pt:"room for one / two people"},
  {en:"key card",ipa:"—",pt:"the small card that opens your room"},
  {en:"towel",ipa:"/ˈtaʊəl/",pt:"cloth to dry yourself"},
  {en:"pillow",ipa:"/ˈpɪləʊ/",pt:"soft thing for your head"},
  {en:"check-in / check-out",ipa:"—",pt:"arrival / leaving time"},
  {en:"breakfast included",ipa:"—",pt:"breakfast is in the price"},
  {en:"Wi-Fi password",ipa:"—",pt:"the code for the internet"},
  {en:"reception",ipa:"/rɪˈsepʃn/",pt:"the front desk of the hotel"},
  {en:"noisy / quiet",ipa:"—",pt:"a lot of sound / no sound"}
 ],
 grammar:{exp:"Ask about facilities with <b>Is there / Are there</b>. Make polite requests with <b>Could I have...? / Could you...?</b>",
  ex:["Is there a pool?","Are there any towels in the bathroom?","Could I have an extra pillow, please?","Could you tell me the Wi-Fi password?"]},
 practice:[
  {q:"___ there a lift in this hotel?",a:"Is"},
  {q:"___ there any towels in my room?",a:"Are"},
  {q:"___ I have a quieter room, please?",a:"Could"},
  {q:"What time ___ breakfast start?",a:"does"}
 ],
 speaking:[
  "Do you prefer big or small hotels?",
  "What do you always check before booking?",
  "What do you look for on hotel reviews?",
  "Do you use hotel breakfast?",
  "Have you ever had a bad hotel experience?",
  "COMPLETE: The best hotel I've stayed in was ___.",
  "COMPLETE: The one thing a hotel room must have for me is ___.",
  "SITUATION: You arrive at reception, tired, and the room is not what you booked.",
  "SITUATION: The Wi-Fi doesn't work and you have a meeting in 20 minutes.",
  "CHALLENGE: You checked out but you left your charger in the room. Call reception."
 ],
 roleplay:{title:"Role-play: Check-in and small requests",scenario:"A is the guest, B is the receptionist. A checks in, asks about breakfast and Wi-Fi, and requests an extra pillow. Swap.",
  lines:["A: Hello, I have a reservation under ___.","B: (confirm + ask ID)","A: (hand ID + ask about breakfast)","B: (answer)","A: (ask for a small extra)","B: (deliver it politely)"]},
 homework:{tasks:["Write 8 sentences describing your ideal hotel using There is/are","Learn 10 hotel review adjectives (clean, quiet, spacious, cosy...)"],link:"https://test-english.com/grammar-points/a1/there-is-there-are/"}
},

/* ---------- 20. AT THE HOTEL (B1) ---------- */
{week:20, theme:"At the Hotel — Complaints & Requests", level:"B1", grammar:"Polite complaints · would · past continuous",
 warmup:["Have you ever complained at a hotel?","Are you more likely to complain in person or online?","What annoys you most in a bad hotel?"],
 review:["Quick check: 'The room is dirty' — make it more polite."],
 leadin:{text:"When something's wrong you can't just say 'bad'. You have to describe, request and — sometimes — insist. Politely.",q:"What's the worst hotel problem you've ever dealt with?"},
 vocab:[
  {en:"a bit disappointing",ipa:"—",pt:"softer than 'bad'"},
  {en:"broken",ipa:"/ˈbrəʊkən/",pt:"not working"},
  {en:"leaking",ipa:"/ˈliːkɪŋ/",pt:"water coming out (tap, roof)"},
  {en:"stain / stained",ipa:"/steɪn/",pt:"a dirty mark on fabric"},
  {en:"filthy",ipa:"/ˈfɪlθi/",pt:"very dirty (strong)"},
  {en:"sort out",ipa:"—",pt:"to solve, arrange"},
  {en:"refund",ipa:"/ˈriːfʌnd/",pt:"money given back"},
  {en:"upgrade",ipa:"/ˈʌpɡreɪd/",pt:"a better category, usually free"},
  {en:"as soon as possible",ipa:"—",pt:"asap"},
  {en:"as advertised",ipa:"—",pt:"as described in the ad/website"},
  {en:"I don't want to make a fuss, but...",ipa:"—",pt:"softener before a complaint"},
  {en:"I'd appreciate it if...",ipa:"—",pt:"polite request"}
 ],
 grammar:{exp:"Complain politely: soften first (<b>I'm afraid / I don't want to make a fuss, but</b>), state the problem in past continuous or present (<b>was leaking / isn't working</b>), then ask (<b>Could you...? / Would it be possible to...?</b>).",
  ex:["I'm afraid the shower isn't working properly.","The air conditioning was making a loud noise all night.","Would it be possible to move to another room?","I'd appreciate it if you could sort this out."]},
 practice:[
  {q:"Soften: 'The room is dirty.'",a:"I'm afraid the room isn't very clean."},
  {q:"Rephrase: 'The tap is broken.' (past continuous — last night)",a:"The tap was leaking all night."},
  {q:"Make it polite: 'Move me.'",a:"Would it be possible to move me to another room?"},
  {q:"Ask for compensation without demanding.",a:"I was wondering if there's anything you could do to make this right."}
 ],
 speaking:[
  "Have you ever asked for a refund? What happened?",
  "Do you read hotel reviews before writing your own?",
  "What complaint from a guest would you find fair — and which would seem too much?",
  "Is it easier to complain in your own language or in English?",
  "Do you tip in hotels? Why or why not?",
  "COMPLETE: One time I complained and it worked was ___.",
  "COMPLETE: The most important thing when complaining is to ___.",
  "SITUATION: You come back to your room at 11pm and it hasn't been cleaned. What do you say?",
  "SITUATION: The room next to yours is having a loud party. Call reception.",
  "SITUATION: The photos online showed a sea view. You have a view of a wall. Confront reception.",
  "CHALLENGE: Complain in 3 sentences without using the words 'bad' or 'awful'.",
  "FOLLOW-UP: Where's the line between fair complaint and being difficult?"
 ],
 roleplay:{title:"Role-play: The room is not as advertised",scenario:"A is a guest who booked a 'sea view' room and got a wall. B is the receptionist who has NO better rooms tonight. A must get some form of compensation without shouting.",
  lines:["A: (open with a softener + state the problem)","B: (apologise + say there's no other room)","A: (push politely for an alternative)","B: (offer something smaller: breakfast, upgrade tomorrow)","A: (accept, get it in writing)"]},
 homework:{tasks:["Write a 3-star hotel review that is critical but fair","Learn 6 softeners (I'm afraid / I was wondering / Would it be possible...)"],link:"https://test-english.com/grammar-points/b1/past-simple-past-continuous/"}
},

/* ---------- 21. ORDERING FOOD (A1) ---------- */
{week:21, theme:"Ordering Food", level:"A1", grammar:"I'd like · Can I have...?",
 warmup:["Do you eat out often?","What's your favourite food?","Coffee or tea?"],
 review:["Quick check: ___ I have a coffee, please?"],
 leadin:{text:"Ordering food is one of the first REAL conversations in another language.",q:"When did you last order food in English?"},
 vocab:[
  {en:"menu",ipa:"/ˈmenjuː/",pt:"list of food"},
  {en:"coffee",ipa:"/ˈkɒfi/",pt:"hot dark drink"},
  {en:"tea",ipa:"/tiː/",pt:"hot drink with leaves"},
  {en:"water — still / sparkling",ipa:"—",pt:"water — no gas / with gas"},
  {en:"sandwich",ipa:"/ˈsænwɪdʒ/",pt:"bread with something inside"},
  {en:"pizza",ipa:"/ˈpiːtsə/",pt:"round Italian food"},
  {en:"salad",ipa:"/ˈsæləd/",pt:"vegetables cold"},
  {en:"to go / to eat in",ipa:"—",pt:"take away / eat here"},
  {en:"That's all, thanks",ipa:"—",pt:"nothing more"},
  {en:"How much is it?",ipa:"—",pt:"asking the price"}
 ],
 grammar:{exp:"Polite ways to order: <b>I'd like...</b> / <b>Can I have...?</b> / <b>I'll have...</b> — all much softer than 'I want'.",
  ex:["I'd like a coffee, please.","Can I have a sandwich?","I'll have the salad.","Could I get a glass of water?"]},
 practice:[
  {q:"Order politely: (I want) a coffee.",a:"I'd like / Can I have a coffee, please?"},
  {q:"I'll ___ the pizza.",a:"have"},
  {q:"Is that ___ or ___? (here / take away)",a:"to eat in / to go"},
  {q:"How ___ is it?",a:"much"}
 ],
 speaking:[
  "How often do you order food in a café or fast-food place?",
  "What do you usually order?",
  "QUICK CHOICE: Coffee or tea?",
  "QUICK CHOICE: Sandwich or salad?",
  "QUICK CHOICE: Eat in or take away?",
  "Do you tip in cafés?",
  "COMPLETE: My favourite quick lunch is ___.",
  "COMPLETE: I never order ___ because ___.",
  "SITUATION: You want a coffee, a sandwich and water. You have 15 minutes. Order.",
  "SITUATION: They give you the wrong sandwich. What do you say?"
 ],
 roleplay:{title:"Role-play: At the café counter",scenario:"A is customer, B is barista. A orders drink + food, asks price, pays. Swap.",
  lines:["B: Hi! What can I get you?","A: (order drink + food politely)","B: To eat in or take away?","A: (answer)","B: Anything else?","A: (no + ask price)","B: (say price)","A: (pay + thank)"]},
 homework:{tasks:["Write a 6-line café dialogue","Practise saying 5 orders out loud"],link:"https://test-english.com/grammar-points/a1/would-like/"}
},

/* ---------- 22. AT A RESTAURANT (B1) — extends week 10 ---------- */
{week:22, theme:"At a Restaurant — Reviews & Preferences", level:"B1", grammar:"Comparatives · past for describing meals",
 warmup:["What was the last really good meal you had?","Do you read restaurant reviews?","Do you like trying new food?"],
 review:["Quick check: The pizza was ___ (good) than I expected."],
 leadin:{text:"B1: not just ORDERING — talking ABOUT food, recommending, comparing.",q:"Recommend me a restaurant you love."},
 vocab:[
  {en:"recommend",ipa:"/ˌrekəˈmend/",pt:"to say something is good"},
  {en:"the atmosphere",ipa:"/ˈætməsfɪə/",pt:"the feeling of a place"},
  {en:"the service",ipa:"—",pt:"how they treat you"},
  {en:"the portion",ipa:"/ˈpɔːʃn/",pt:"the size of the food"},
  {en:"overpriced",ipa:"—",pt:"more expensive than it deserves"},
  {en:"underrated",ipa:"—",pt:"better than people think"},
  {en:"cosy",ipa:"/ˈkəʊzi/",pt:"warm and comfortable"},
  {en:"a hidden gem",ipa:"—",pt:"a great place few people know"},
  {en:"a tourist trap",ipa:"—",pt:"expensive place for tourists, low quality"},
  {en:"comfort food",ipa:"—",pt:"food that makes you feel good"},
  {en:"picky eater",ipa:"—",pt:"someone who doesn't eat many things"},
  {en:"I could eat it every day",ipa:"—",pt:"very tasty"}
 ],
 grammar:{exp:"Compare with <b>more/less ___ than · not as ___ as · one of the best...</b>. Describe past meals with past simple + adjectives.",
  ex:["The service was better than last time.","It's not as good as people say.","One of the best pizzas I've had.","Cosy, cheap and full of locals — a hidden gem."]},
 practice:[
  {q:"The food was ___ (good) than I expected.",a:"better"},
  {q:"It's not ___ ___ its reviews.",a:"as good as"},
  {q:"Recommend a place in one sentence:",a:"(open — student answers)"},
  {q:"Rephrase 'It costs too much for what it is.'",a:"It's overpriced."}
 ],
 speaking:[
  "Tell me about a restaurant you love and one you regret going to.",
  "How important is atmosphere vs food?",
  "Do you order the same thing or always try something new?",
  "Are you a picky eater? About what?",
  "Is your city good for eating out?",
  "Would you eat alone in a restaurant? Why?",
  "COMPLETE: My comfort food is ___.",
  "COMPLETE: The most overrated restaurant type is ___.",
  "SITUATION: Recommend one restaurant in your city to me — sell it in 4 sentences.",
  "SITUATION: The waiter recommends the most expensive dish. Politely ask for something cheaper.",
  "CHALLENGE: You have one dinner in a city you're visiting for 24 hours. Where do you eat and why?",
  "FOLLOW-UP: What ruins a restaurant for you faster — bad food or bad service?"
 ],
 roleplay:{title:"Role-play: Recommending",scenario:"A is a visitor asking B, a local, for a restaurant recommendation. B asks about budget, cuisine, dietary needs — and then convinces A.",
  lines:["A: I'm here for two nights — where should I eat?","B: (ask 2 clarifying questions)","A: (answer)","B: (recommend one place + why)","A: (push back — is it touristy?)","B: (defend or offer a second option)"]},
 homework:{tasks:["Write a 100-word review of a restaurant you know","Learn 8 restaurant-review adjectives"],link:"https://test-english.com/grammar-points/b1/comparatives-superlatives/"}
},

/* ---------- 23. SHOPPING (B1) — extends week 11 ---------- */
{week:23, theme:"Shopping — Online vs In Store", level:"B1", grammar:"Present perfect · comparatives",
 warmup:["When did you last buy something online?","Do you enjoy shopping or just tolerate it?","Do you return things you don't like?"],
 review:["Quick check: I ___ (buy) three things this week. Which is ___ (convenient) — online or in the shop?"],
 leadin:{text:"How we shop says a lot about us. B1 goal: compare, describe, and take a real position.",q:"When would you rather go to a shop — and when do you prefer online?"},
 vocab:[
  {en:"a bargain",ipa:"/ˈbɑːɡɪn/",pt:"very cheap for its value"},
  {en:"impulse buy",ipa:"—",pt:"something you buy without thinking"},
  {en:"return / refund",ipa:"—",pt:"to give it back / get money back"},
  {en:"free shipping",ipa:"—",pt:"delivery costs nothing"},
  {en:"reviews",ipa:"/rɪˈvjuːz/",pt:"what other buyers say"},
  {en:"out of stock",ipa:"—",pt:"they don't have any"},
  {en:"try on",ipa:"—",pt:"to test clothes before buying"},
  {en:"secondhand",ipa:"/ˌsekndˈhænd/",pt:"used, not new"},
  {en:"fast fashion",ipa:"—",pt:"cheap clothes made quickly"},
  {en:"sustainable",ipa:"/səˈsteɪnəbl/",pt:"not damaging the environment"},
  {en:"I regret buying...",ipa:"—",pt:"I bought it and I wish I hadn't"},
  {en:"worth every penny",ipa:"—",pt:"very good value"}
 ],
 grammar:{exp:"Combine <b>present perfect</b> (what you've bought / tried) with <b>comparatives</b> (which is better).",
  ex:["I've bought more secondhand things this year.","Online is faster, but the shop is more fun.","Free shipping is more important to me than reviews.","I've never returned anything."]},
 practice:[
  {q:"I ___ (never / return) anything.",a:"have never returned"},
  {q:"Online shopping is ___ (convenient) than going to the mall.",a:"more convenient"},
  {q:"It was cheap AND good — a real ___.",a:"bargain"},
  {q:"Rephrase 'I bought it but I shouldn't have.'",a:"I regret buying it."}
 ],
 speaking:[
  "Are you a planner or an impulse buyer?",
  "What's the last thing you bought that you regret?",
  "What's the last thing that was worth every penny?",
  "Do you read reviews before buying?",
  "QUICK CHOICE: Online or in-store — for clothes?",
  "QUICK CHOICE: Cheap and disposable, or expensive and lasting?",
  "QUICK CHOICE: Secondhand or new?",
  "COMPLETE: The last impulse buy I made was ___.",
  "COMPLETE: I would never buy ___ online because ___.",
  "SITUATION: You bought something online. It arrived damaged. Write the first line of your message to customer support.",
  "SITUATION: A shop assistant won't leave you alone. What do you say politely?",
  "CHALLENGE: Convince me to buy secondhand clothes.",
  "FOLLOW-UP: Do you think online shopping is killing local shops? Does it matter?"
 ],
 roleplay:{title:"Role-play: Returning something in a shop",scenario:"A wants to return an item without a receipt. B is the shop assistant applying policy but with some flexibility.",
  lines:["A: Hi, I'd like to return this. It ___.","B: Do you have the receipt?","A: (I paid by card / no)","B: (offer store credit only)","A: (push politely for a refund)","B: (compromise)"]},
 homework:{tasks:["Write 5 sentences comparing online vs shop shopping","Learn 10 review vocabulary items (cheap / bargain / overpriced...)"],link:"https://test-english.com/grammar-points/b1/present-perfect/"}
},

/* ---------- 24. JOB INTERVIEW (B1) ---------- */
{week:24, theme:"Job Interview", level:"B1", grammar:"Present perfect · past simple for experience",
 warmup:["Have you ever had a job interview in English?","How do you prepare for interviews?","How do you feel before one?"],
 review:["Quick check: I ___ (work) at ABC for three years, then I ___ (leave)."],
 leadin:{text:"An interview is a specific conversation with a clear pattern. Learning the pattern makes it manageable.",q:"What was your last interview like?"},
 vocab:[
  {en:"CV / resume",ipa:"—",pt:"the document with your career"},
  {en:"cover letter",ipa:"—",pt:"the letter you send with your CV"},
  {en:"position / role",ipa:"—",pt:"the job you want"},
  {en:"responsibilities",ipa:"/rɪˌspɒnsəˈbɪlətiz/",pt:"your duties in a job"},
  {en:"strengths / weaknesses",ipa:"—",pt:"what you're good / less good at"},
  {en:"achievement",ipa:"/əˈtʃiːvmənt/",pt:"something you did well"},
  {en:"deal with (a challenge)",ipa:"—",pt:"to handle it"},
  {en:"team player",ipa:"—",pt:"someone who works well with others"},
  {en:"self-motivated",ipa:"—",pt:"you push yourself"},
  {en:"salary expectations",ipa:"—",pt:"how much you want to earn"},
  {en:"notice period",ipa:"—",pt:"how long before you can leave your current job"},
  {en:"Do you have any questions for us?",ipa:"—",pt:"the last question — you MUST have some"}
 ],
 grammar:{exp:"Talk about your background with <b>present perfect</b> (things still relevant) + <b>past simple</b> (concrete moments): I've worked in marketing <b>for</b> 5 years. In 2023 I <b>led</b> a project that...",
  ex:["I've been a designer for 4 years.","In my last role I managed a team of 5.","I've worked on similar projects before.","One of my strengths is problem-solving."]},
 practice:[
  {q:"I ___ (work) here since 2022.",a:"have worked / have been working"},
  {q:"In my last job I ___ (be) responsible for ___.",a:"was"},
  {q:"Rephrase 'I like working alone': (interview version)",a:"I'm quite self-motivated and comfortable working independently."},
  {q:"What is your ___ ___? (money)",a:"salary expectation"}
 ],
 speaking:[
  "Tell me about yourself in 60 seconds.",
  "Why do you want this job?",
  "What's your greatest strength — with an example?",
  "What's a weakness you're working on?",
  "Tell me about a time you dealt with a difficult person.",
  "Where do you see yourself in 3 years?",
  "Why should we hire you?",
  "Do you prefer working alone or in a team? Why?",
  "COMPLETE: The role I really want next is ___ because ___.",
  "COMPLETE: A time I failed and learned from it was ___.",
  "SITUATION: You've been asked 'Why are you leaving your current job?' — and it's because of a bad boss. Answer honestly but professionally.",
  "SITUATION: They ask your salary expectation. You have no idea. What do you say?",
  "CHALLENGE: End of the interview — 'Do you have any questions for us?' Ask 3 sharp questions."
 ],
 roleplay:{title:"Role-play: 10-minute interview",scenario:"B is the interviewer. A is the candidate. Go through: introduction → why this role → strengths → a difficulty they overcame → their question at the end.",
  lines:["B: Tell me a bit about yourself.","A: (60 sec)","B: Why this role?","A: (answer)","B: A challenge you overcame?","A: (STAR: situation-task-action-result)","B: Any questions for us?","A: (2 real questions)"]},
 homework:{tasks:["Write a 60-second self-introduction script","Prepare 3 STAR stories (Situation-Task-Action-Result)"],link:"https://test-english.com/grammar-points/b1/present-perfect-simple-continuous/"}
},

/* ---------- 25. JOB INTERVIEW (B2) ---------- */
{week:25, theme:"Job Interview — Behavioural Questions", level:"B2", grammar:"Hypotheticals · nuanced self-presentation",
 warmup:["What's the hardest interview question you've ever been asked?","How do you talk about weaknesses without sounding fake?","Have you ever walked out of a bad interview?"],
 review:["Quick check: If they had offered less money, I ___ (accept)?"],
 leadin:{text:"B2 candidates are hired on how they THINK, not what they've done. Behavioural + hypothetical questions are the real test.",q:"What answer of yours would you cut from your interview repertoire?"},
 vocab:[
  {en:"walk me through...",ipa:"—",pt:"explain step by step"},
  {en:"a stretch assignment",ipa:"—",pt:"a task slightly beyond your level"},
  {en:"push back",ipa:"—",pt:"disagree with someone politely"},
  {en:"take ownership",ipa:"—",pt:"take responsibility"},
  {en:"blind spot",ipa:"—",pt:"a weakness you can't see"},
  {en:"unpack",ipa:"/ʌnˈpæk/",pt:"break down and analyse"},
  {en:"trade-off",ipa:"—",pt:"choosing one thing means losing another"},
  {en:"navigate a conflict",ipa:"—",pt:"handle a disagreement"},
  {en:"stakeholder",ipa:"—",pt:"anyone with a real interest in the decision"},
  {en:"align with",ipa:"—",pt:"agree / be on the same page"},
  {en:"in hindsight",ipa:"—",pt:"looking back"},
  {en:"I'd approach it by...",ipa:"—",pt:"phrase for hypothetical answers"}
 ],
 grammar:{exp:"Behavioural: <b>past simple + result</b> (I did X, which led to Y). Hypothetical: <b>2nd/3rd conditional</b> (If I were in that situation, I would... / If I had known, I would have...).",
  ex:["I pushed back — respectfully — and we ended up with a better solution.","If I were leading that team today, I'd start by listening.","In hindsight, I would have raised the issue sooner.","There's always a trade-off between speed and quality."]},
 practice:[
  {q:"Rephrase 'I did the work': (take ownership)",a:"I took full ownership of that piece of the project."},
  {q:"Hypothetical: 'If a client asked for the impossible tomorrow, I ___ (handle) it by...'",a:"would handle"},
  {q:"Nuance: 'I never fail.' (better answer)",a:"I've made mistakes; the important thing is what I do with them."},
  {q:"Reflective: 'What would you do differently?' — model answer starter",a:"In hindsight, I would have..."}
 ],
 speaking:[
  "Walk me through a project that failed — and what you took from it.",
  "Describe a time you had to give hard feedback.",
  "Tell me about a decision you made without all the information.",
  "How do you handle a boss who is wrong?",
  "How would you approach the first 30 days in a new role?",
  "What's a blind spot you're aware of in yourself?",
  "How do you balance ambition and patience?",
  "How do you decide when to push back and when to align?",
  "COMPLETE: A career mistake I'm glad I made was ___.",
  "COMPLETE: The kind of manager I try NOT to be is ___.",
  "SITUATION: 'Why should we hire YOU over someone with more experience?' Answer without sounding arrogant.",
  "SITUATION: The interviewer asks a question you didn't prepare for. What do you say to buy time?",
  "CHALLENGE: Turn a real weakness into a legitimate answer without the cliché 'perfectionism'.",
  "FOLLOW-UP: What separates a great interview answer from a good one?"
 ],
 roleplay:{title:"Role-play: Panel behavioural interview",scenario:"B asks 3 behavioural questions (conflict / failure / leadership). A answers using the STAR method. After each, B pushes with 'tell me more about X'. A must not collapse into rehearsed script.",
  lines:["B: Tell me about a time you disagreed with your manager.","A: (STAR, ~90 sec)","B: What would you do differently now?","A: (reflective)","B: And how do you know it worked?","A: (evidence)"]},
 homework:{tasks:["Write 3 STAR stories with visible results","List 5 hedging phrases you can drop into answers"],link:"https://test-english.com/grammar-points/b2/mixed-conditionals/"}
},

/* ---------- 26. WORK & CAREER (A2) ---------- */
{week:26, theme:"Work & Career", level:"A2", grammar:"Present simple + adverbs of frequency",
 warmup:["What's your job?","Do you like it?","How many hours do you work a week?"],
 review:["Quick check: I ___ (usually / start) work at 9."],
 leadin:{text:"Work is a huge conversation topic for adults. A2: describe what you do, when, how you feel about it.",q:"Tell me about your job in 3 sentences."},
 vocab:[
  {en:"job",ipa:"/dʒɒb/",pt:"work you do for money"},
  {en:"boss",ipa:"/bɒs/",pt:"your manager"},
  {en:"colleague",ipa:"/ˈkɒliːɡ/",pt:"someone you work with"},
  {en:"office",ipa:"/ˈɒfɪs/",pt:"a place where people work"},
  {en:"remote / from home",ipa:"—",pt:"work from home"},
  {en:"salary",ipa:"/ˈsæləri/",pt:"the money you earn"},
  {en:"meeting",ipa:"/ˈmiːtɪŋ/",pt:"when people meet to talk about work"},
  {en:"deadline",ipa:"/ˈdedlaɪn/",pt:"the last day to finish something"},
  {en:"day off",ipa:"—",pt:"a day you don't work"},
  {en:"stressful",ipa:"/ˈstresfl/",pt:"causing stress"}
 ],
 grammar:{exp:"Describe routine work with present simple. Place <b>always / usually / often / sometimes / rarely / never</b> before the main verb.",
  ex:["I always start at 9.","She often works from home.","We rarely have long meetings.","I never work on Sundays."]},
 practice:[
  {q:"I ___ (usually / finish) work at 6.",a:"usually finish"},
  {q:"She ___ (never / be) late.",a:"is never"},
  {q:"How many hours a week ___ you ___?",a:"do / work"},
  {q:"My boss is ___ (nice / stressful).",a:"(open)"}
 ],
 speaking:[
  "What's your job? Describe it in 3 sentences.",
  "How did you get into this job?",
  "What time do you start and finish?",
  "Do you work from home?",
  "Do you like your colleagues?",
  "Is your job stressful? Why?",
  "COMPLETE: The best part of my job is ___.",
  "COMPLETE: The worst part is ___.",
  "SITUATION: Tell someone what you do so they actually understand.",
  "CHALLENGE: Describe your typical Monday in 5 sentences."
 ],
 roleplay:{title:"Role-play: Small talk about work",scenario:"Two colleagues meet for the first time. Introduce yourselves, ask about roles, hours and what you like.",
  lines:["A: What do you do here?","B: (role + team)","A: How long have you been here?","B: (answer + ask back)","A: What do you like most about it?"]},
 homework:{tasks:["Write 8 sentences about your typical work day","Learn 10 workplace nouns (colleague, deadline, meeting...)"],link:"https://test-english.com/grammar-points/a1/adverbs-of-frequency/"}
},

/* ---------- 27. WORK & CAREER (B2) ---------- */
{week:27, theme:"Work & Career — Meaning & Balance", level:"B2", grammar:"Modals of speculation · discourse markers",
 warmup:["Is a good career mainly about money, meaning, or freedom?","Has your definition of success changed?","Would you take a pay cut for a job you love?"],
 review:["Quick check: 'Working from home makes people lazy.' — respond nuancedly."],
 leadin:{text:"B2 conversation about work isn't 'What do you do' — it's 'What is it FOR'. Values, trade-offs, worldview.",q:"What is work FOR, in your view?"},
 vocab:[
  {en:"burnout",ipa:"/ˈbɜːnaʊt/",pt:"total exhaustion from work"},
  {en:"work-life balance",ipa:"—",pt:"balance between work and rest"},
  {en:"purpose",ipa:"/ˈpɜːpəs/",pt:"reason for doing something"},
  {en:"golden handcuffs",ipa:"—",pt:"salary so good you can't leave"},
  {en:"quiet quitting",ipa:"—",pt:"doing only the minimum required"},
  {en:"pivot",ipa:"/ˈpɪvət/",pt:"to change career direction"},
  {en:"ceiling",ipa:"/ˈsiːlɪŋ/",pt:"the highest point you can reach"},
  {en:"fulfilling",ipa:"/fʊlˈfɪlɪŋ/",pt:"giving deep satisfaction"},
  {en:"showing up",ipa:"—",pt:"consistently doing the work"},
  {en:"trade-off",ipa:"—",pt:"you gain X but lose Y"},
  {en:"generational shift",ipa:"—",pt:"change between generations"},
  {en:"to make it work",ipa:"—",pt:"to manage the situation"}
 ],
 grammar:{exp:"Speculate with <b>modals</b>: it must be, might be, could be, can't be. Argue with connectors: <b>having said that · to be fair · in principle · in practice</b>.",
  ex:["Remote work might be great for some but toxic for others.","To be fair, my parents' generation had it harder in different ways.","In principle I agree; in practice it's more complicated.","There has to be a trade-off somewhere."]},
 practice:[
  {q:"Speculate: 'My colleague isn't in — she ___ (be) sick.'",a:"must be"},
  {q:"Concede: 'You're right, ___ ___, it's not that simple.'",a:"having said that"},
  {q:"Rephrase 'I have too much work': (B2)",a:"I'm stretched pretty thin at the moment."},
  {q:"Distinguish: 'in principle' vs 'in practice' — one-liner example.",a:"(open)"}
 ],
 speaking:[
  "Is a career about money, meaning, or freedom — pick one and defend it.",
  "Would you take a pay cut for more purpose? How much?",
  "Is 'quiet quitting' the workers' fault or the system's?",
  "How do you know when it's time to leave a job?",
  "Is 4-day work-week a fantasy or the future?",
  "Are managers necessary?",
  "COMPARE: Loyalty to one employer vs jumping every 2 years — which pays off?",
  "COMPLETE: The moment I realised what I wanted my career to be was ___.",
  "COMPLETE: The advice I would give my 25-year-old self about work is ___.",
  "SITUATION: A close friend hates their job but earns great money. What do you tell them?",
  "CHALLENGE: Argue that ambition is overrated — for 60 seconds.",
  "CHALLENGE: Argue the opposite — for 60 seconds.",
  "FOLLOW-UP: Where does your definition of success come from?",
  "FOLLOW-UP: What would you have to see to change your mind?"
 ],
 roleplay:{title:"Debate: 'Working from home is bad for careers'",scenario:"A takes 'agree', B takes 'disagree'. Two turns each with evidence. Then SWAP and defend the other side sincerely.",
  lines:["A: (open — one clear claim + one example)","B: (concede briefly, then counter)","A: (push back with a hedge)","B: (reframe)"]},
 homework:{tasks:["Write 200 words: 'What work is for'","Prepare 3 hedged opinions (in principle... / to be fair... / arguably...)"],link:"https://test-english.com/grammar-points/b2/modal-verbs-deduction-present/"}
},

/* ---------- 28. FAMILY (B1) — extends week 3 ---------- */
{week:28, theme:"Family — Roles & Traditions", level:"B1", grammar:"used to · would (past habits)",
 warmup:["Are you close to your family?","Do you have family traditions?","Who did you grow up closer to — mother's or father's side?"],
 review:["Quick check: When I was a child I ___ (spend) every Sunday at my grandmother's."],
 leadin:{text:"B1 family conversation goes beyond names — it's about roles, memories, how families change over time.",q:"How is family life different now compared to when you were a child?"},
 vocab:[
  {en:"upbringing",ipa:"/ˈʌpbrɪŋɪŋ/",pt:"how you were raised"},
  {en:"strict / lenient",ipa:"—",pt:"very firm / not firm"},
  {en:"take after (someone)",ipa:"—",pt:"to look/behave like a family member"},
  {en:"a big age gap",ipa:"—",pt:"big difference in age"},
  {en:"nuclear / extended family",ipa:"—",pt:"parents+kids / with cousins, aunts..."},
  {en:"in-laws",ipa:"—",pt:"family of your husband/wife"},
  {en:"black sheep",ipa:"—",pt:"the different one in the family"},
  {en:"family tree",ipa:"—",pt:"diagram of relatives"},
  {en:"tradition",ipa:"/trəˈdɪʃn/",pt:"something you always do"},
  {en:"get together",ipa:"—",pt:"to meet as a group"},
  {en:"pass down (a value)",ipa:"—",pt:"to give across generations"},
  {en:"cut ties",ipa:"—",pt:"to end contact"}
 ],
 grammar:{exp:"Talk about past routines with <b>used to + verb</b> and (formal, storytelling) <b>would + verb</b>. Not for one-off events.",
  ex:["We used to spend every summer at the beach.","My grandmother would make bread every Sunday.","I didn't use to eat vegetables — now I love them.","Did you use to argue a lot with your siblings?"]},
 practice:[
  {q:"When I was a kid I ___ (use to / play) outside every day.",a:"used to play"},
  {q:"He didn't ___ (use to / like) sports.",a:"use to like"},
  {q:"Storytelling: 'Every Christmas we ___ (open) presents at midnight.'",a:"would open / used to open"},
  {q:"Rephrase 'I always look like my dad': (family word)",a:"I take after my dad."}
 ],
 speaking:[
  "Who do you take after — physically and personality-wise?",
  "Were your parents strict or lenient? Are you glad?",
  "What family tradition would you like to pass down?",
  "How has family life changed in one generation in your country?",
  "Do you think adult children owe their parents anything?",
  "Is there a black sheep in your family?",
  "How do you handle difficult in-laws?",
  "COMPLETE: The most important thing my family gave me is ___.",
  "COMPLETE: One thing I want to do differently from my parents is ___.",
  "SITUATION: A family member wants to borrow a large amount of money. How do you respond?",
  "SITUATION: Your parents disapprove of a life choice. Explain your position without breaking the relationship.",
  "CHALLENGE: In 90 seconds, describe a family gathering that says who your family is.",
  "FOLLOW-UP: Do we choose our values or inherit them?"
 ],
 roleplay:{title:"Role-play: Family story to a friend",scenario:"A tells B (a close friend) a real family story — a tradition, a conflict, a memory. B asks 3 questions that push A deeper. Swap.",
  lines:["A: (open with 'When I was ___, we used to...')","B: (ask 'What was that like for you?')","A: (feeling + detail)","B: (compare gently)","A: (reflect)"]},
 homework:{tasks:["Write 8 sentences with 'used to' about your childhood","Record a 60-second family memory"],link:"https://test-english.com/grammar-points/b1/used-to-would/"}
},

/* ---------- 29. FRIENDS & RELATIONSHIPS (A2) ---------- */
{week:29, theme:"Friends & Relationships", level:"A2", grammar:"Present simple · adverbs of frequency",
 warmup:["How many close friends do you have?","How often do you see them?","Do you make friends easily?"],
 review:["Quick check: I ___ (usually / meet) my friends on weekends."],
 leadin:{text:"Everyone has something to say about friends. A2 goal: describe them, describe what you do together.",q:"Tell me about your best friend."},
 vocab:[
  {en:"best friend",ipa:"—",pt:"the closest one"},
  {en:"close friend",ipa:"—",pt:"very good friend"},
  {en:"a colleague / a classmate",ipa:"—",pt:"friend from work / school"},
  {en:"a neighbour",ipa:"/ˈneɪbə/",pt:"person who lives next to you"},
  {en:"hang out",ipa:"—",pt:"spend time together informally"},
  {en:"grab a coffee",ipa:"—",pt:"have a quick coffee together"},
  {en:"get along with",ipa:"—",pt:"to have a good relationship with"},
  {en:"have things in common",ipa:"—",pt:"share interests"},
  {en:"be there for someone",ipa:"—",pt:"support them"},
  {en:"lose touch",ipa:"—",pt:"stop keeping in contact"}
 ],
 grammar:{exp:"Describe friendships with present simple: how often you meet, what you do together, what you talk about.",
  ex:["I usually meet my friends on Fridays.","We often go out for dinner.","She always listens to me.","We rarely argue."]},
 practice:[
  {q:"I ___ (get along) really well with my sister.",a:"get along"},
  {q:"We have a lot ___ common.",a:"in"},
  {q:"How often ___ you ___ your best friend?",a:"do / see"},
  {q:"We ___ (hang out) every Saturday.",a:"hang out"}
 ],
 speaking:[
  "Who's your best friend? How did you meet?",
  "What do you usually do together?",
  "Are your friends similar to you or different?",
  "Is it easier to make friends as a child or as an adult?",
  "Do you have friends from school still?",
  "Would you rather have a few close friends or many acquaintances?",
  "COMPLETE: A good friend is someone who ___.",
  "COMPLETE: The last time I laughed a lot with a friend was ___.",
  "SITUATION: A friend cancels your plans at the last minute — again. What do you say?",
  "CHALLENGE: Describe your best friend so I could recognise them at a party."
 ],
 roleplay:{title:"Role-play: Catching up",scenario:"Two friends haven't seen each other in months. Ask about family, work, life. Say what's changed.",
  lines:["A: Hey! How have you been?","B: (answer + ask back)","A: What's new with work / family?","B: (share + ask)","A: We should meet more often!"]},
 homework:{tasks:["Write 8 sentences describing your best friend","List 5 questions to ask an old friend"],link:"https://test-english.com/grammar-points/a1/adverbs-of-frequency/"}
},

/* ---------- 30. FRIENDS & RELATIONSHIPS (B1) ---------- */
{week:30, theme:"Friends & Relationships — Trust & Distance", level:"B1", grammar:"Present perfect · reflection language",
 warmup:["Have you ever lost a friendship? What happened?","Do you keep friends over long distances?","What quality matters most in a friend?"],
 review:["Quick check: I ___ (know) her since I ___ (be) 15."],
 leadin:{text:"B1: talking about friendships as living things — they change, need care, sometimes end.",q:"How have your friendships changed with time?"},
 vocab:[
  {en:"drift apart",ipa:"—",pt:"to slowly stop being close"},
  {en:"grow apart",ipa:"—",pt:"same idea — different lives"},
  {en:"fall out (with)",ipa:"—",pt:"to argue and stop being friends"},
  {en:"make up",ipa:"—",pt:"to become friends again"},
  {en:"toxic friendship",ipa:"—",pt:"friendship that hurts you"},
  {en:"reliable",ipa:"/rɪˈlaɪəbl/",pt:"you can count on them"},
  {en:"trustworthy",ipa:"/ˈtrʌstwɜːði/",pt:"you can trust them"},
  {en:"a shoulder to cry on",ipa:"—",pt:"someone who comforts you"},
  {en:"long-distance",ipa:"—",pt:"far away geographically"},
  {en:"reach out",ipa:"—",pt:"to contact / try to reconnect"},
  {en:"take someone for granted",ipa:"—",pt:"not appreciate them"},
  {en:"set boundaries",ipa:"—",pt:"set limits"}
 ],
 grammar:{exp:"Reflect with <b>present perfect</b> (life so far) + narrative past. Use <b>tend to</b> to describe patterns.",
  ex:["We've known each other since school.","She's always been there for me.","I tend to drift apart from people who don't reach out.","We fell out years ago, and it took time to make up."]},
 practice:[
  {q:"We ___ (know) each other for 10 years.",a:"have known"},
  {q:"They ___ (drift) apart after university.",a:"drifted"},
  {q:"Rephrase 'She never returns my messages'.",a:"She never reaches out / She isn't very reliable."},
  {q:"Pattern: 'I usually let people go quietly' → I ___ ___ ___ let people go quietly.",a:"tend to"}
 ],
 speaking:[
  "What quality matters most in a friend — for you?",
  "Do you find it hard to make new friends as an adult?",
  "Have you ever ended a friendship on purpose? Was it right?",
  "How do you keep long-distance friendships alive?",
  "Do you prefer friends who agree with you or challenge you?",
  "Is social media good or bad for friendship?",
  "COMPARE: Old friends vs new friends — what does each give you?",
  "COMPLETE: A friendship I regret losing is ___.",
  "COMPLETE: The kind of friend I try to be is ___.",
  "SITUATION: A close friend never asks how YOU are. What do you say?",
  "SITUATION: A friend keeps bringing up an ex you're over. How do you handle it?",
  "CHALLENGE: Argue that some friendships SHOULD end.",
  "FOLLOW-UP: Where's the line between forgiving and being a doormat?"
 ],
 roleplay:{title:"Role-play: A hard conversation",scenario:"A tells B, a good friend, that something B does has been bothering them (repeated cancellations, silences, insensitive jokes). B reacts honestly. Repair, don't destroy.",
  lines:["A: Can I say something that's been on my mind?","B: Sure.","A: (name the behaviour + how you feel)","B: (react honestly — could push back)","A: (listen + clarify)","B: (agree on one small change)"]},
 homework:{tasks:["Write 100 words: 'What friendship means to me now'","Send one message reconnecting with someone you've lost touch with"],link:"https://test-english.com/grammar-points/b1/present-perfect/"}
},

/* ---------- 31. HOBBIES (B1) — extends week 6 ---------- */
{week:31, theme:"Hobbies — Why We Do What We Do", level:"B1", grammar:"Gerunds & infinitives · reasons",
 warmup:["What do you actually DO for fun?","Do you have a hobby you've kept for years?","Is a hobby that makes money still a hobby?"],
 review:["Quick check: I love ___ (paint). I want ___ (learn) a new language."],
 leadin:{text:"B1: not just naming hobbies — explaining WHY we do them, and what they say about us.",q:"What does your favourite hobby say about you?"},
 vocab:[
  {en:"unwind",ipa:"/ʌnˈwaɪnd/",pt:"to relax after stress"},
  {en:"a creative outlet",ipa:"—",pt:"a way to express yourself"},
  {en:"pick up (a hobby)",ipa:"—",pt:"to start doing"},
  {en:"drop (a hobby)",ipa:"—",pt:"to stop doing"},
  {en:"get into (something)",ipa:"—",pt:"start liking it"},
  {en:"be into",ipa:"—",pt:"to be interested in"},
  {en:"kill time",ipa:"—",pt:"to fill empty time"},
  {en:"time-consuming",ipa:"—",pt:"takes a lot of time"},
  {en:"addictive",ipa:"/əˈdɪktɪv/",pt:"you can't stop"},
  {en:"a passion",ipa:"—",pt:"strong love for something"},
  {en:"pointless",ipa:"—",pt:"no purpose"},
  {en:"guilty pleasure",ipa:"—",pt:"something you love but shouldn't admit"}
 ],
 grammar:{exp:"Explain reasons with <b>gerunds after prepositions</b> (I'm into <b>painting</b>) and <b>infinitives of purpose</b> (I do it <b>to unwind</b>).",
  ex:["I got into running to lose weight; I kept going for the calm.","I'm into cooking mainly for the process, not the food.","I picked up chess during the pandemic and never dropped it.","It's addictive without being productive — pure guilty pleasure."]},
 practice:[
  {q:"I'm really into ___ (paint) these days.",a:"painting"},
  {q:"I do it ___ (relax).",a:"to relax"},
  {q:"Rephrase 'I started liking yoga': (phrasal)",a:"I got into yoga."},
  {q:"'It has no purpose but I love it.' → It's my ___ ___.",a:"guilty pleasure"}
 ],
 speaking:[
  "What's a hobby you've stuck with — and why?",
  "What's a hobby you dropped and don't miss?",
  "Would you rather have one deep hobby or several small ones?",
  "Should hobbies be productive?",
  "Is scrolling social media a hobby? Be honest.",
  "What hobby would you love to have but haven't tried?",
  "COMPLETE: My current guilty pleasure is ___.",
  "COMPLETE: A hobby I recommend to anyone is ___ because ___.",
  "SITUATION: A partner complains your hobby takes too much time. How do you respond?",
  "SITUATION: Recommend a hobby to someone who is stressed and has 30 minutes a day.",
  "CHALLENGE: Defend your most 'pointless' hobby.",
  "FOLLOW-UP: What does what we do for fun say about who we are?"
 ],
 roleplay:{title:"Role-play: Selling a hobby",scenario:"A tries to convince B, a sceptic, to try their hobby. B pushes back with real objections (time, money, boredom). A must adapt, not lecture.",
  lines:["A: You should try ___.","B: (objection 1)","A: (address it + benefit)","B: (objection 2)","A: (concede one point + reframe)","B: (say if convinced or not, honestly)"]},
 homework:{tasks:["Write 100 words: 'A hobby that changed me'","List 5 hobbies with the reason (to + verb)"],link:"https://test-english.com/grammar-points/b1/gerunds-infinitives/"}
},

/* ---------- 32. HEALTH & WELL-BEING (A2) ---------- */
{week:32, theme:"Health & Well-being", level:"A2", grammar:"Should / shouldn't · body vocab",
 warmup:["How are you feeling today?","How often do you exercise?","Do you sleep well?"],
 review:["Quick check: You ___ (drink) more water. You ___ (not / eat) so much sugar."],
 leadin:{text:"A2: basic health talk, giving simple advice.",q:"When did you last feel really well?"},
 vocab:[
  {en:"headache",ipa:"/ˈhedeɪk/",pt:"pain in your head"},
  {en:"stomach ache",ipa:"—",pt:"pain in your belly"},
  {en:"a cold",ipa:"—",pt:"illness with runny nose"},
  {en:"the flu",ipa:"—",pt:"stronger than a cold"},
  {en:"tired / exhausted",ipa:"—",pt:"needing rest / very tired"},
  {en:"exercise",ipa:"/ˈeksəsaɪz/",pt:"physical activity"},
  {en:"stress",ipa:"/stres/",pt:"mental pressure"},
  {en:"take a break",ipa:"—",pt:"stop and rest"},
  {en:"go for a walk",ipa:"—",pt:"walk for exercise"},
  {en:"see a doctor",ipa:"—",pt:"visit a doctor"}
 ],
 grammar:{exp:"Give simple advice with <b>should / shouldn't</b>: You should sleep more. You shouldn't skip breakfast.",
  ex:["You should drink more water.","You shouldn't work so much.","She should see a doctor.","We shouldn't stay up so late."]},
 practice:[
  {q:"You look tired. You ___ (rest).",a:"should rest"},
  {q:"He has a cold. He ___ (not / go) to the gym.",a:"shouldn't go"},
  {q:"I have a ___. My head hurts.",a:"headache"},
  {q:"I'm very tired — actually I'm ___.",a:"exhausted"}
 ],
 speaking:[
  "How do you take care of yourself?",
  "Do you exercise? What kind?",
  "How much do you sleep?",
  "How do you handle stress?",
  "Do you eat healthy? Be honest.",
  "When you feel sick, what do you do first?",
  "COMPLETE: I feel best when I ___.",
  "COMPLETE: The one thing I should do more is ___.",
  "SITUATION: A friend has a bad cold and is going to work anyway. What do you tell them?",
  "CHALLENGE: Give three pieces of health advice to a very stressed friend."
 ],
 roleplay:{title:"Role-play: At the pharmacy",scenario:"A doesn't feel well. B is the pharmacist. Describe symptoms, ask for medicine.",
  lines:["A: I don't feel well.","B: What's wrong?","A: (symptoms)","B: (recommend something + advice)","A: (ask price + how to take it)"]},
 homework:{tasks:["Write 6 pieces of advice using 'should/shouldn't'","Learn 10 illness/symptom words"],link:"https://test-english.com/grammar-points/a2/modal-verbs-should-must-have-to/"}
},

/* ---------- 33. HEALTH & WELL-BEING (B1) ---------- */
{week:33, theme:"Health & Well-being — Habits", level:"B1", grammar:"Present perfect + since/for · giving reasoned advice",
 warmup:["Have you built any healthy habits this year?","Have you dropped any bad ones?","Do you believe in small changes or big ones?"],
 review:["Quick check: I ___ (not / smoke) for two years."],
 leadin:{text:"B1: real health conversation — habits, obstacles, mental health, sleep, energy.",q:"What's one habit you're proud of building?"},
 vocab:[
  {en:"stick to (a habit)",ipa:"—",pt:"to maintain it"},
  {en:"fall off (a habit)",ipa:"—",pt:"to stop maintaining it"},
  {en:"willpower",ipa:"/ˈwɪlpaʊə/",pt:"mental strength"},
  {en:"burn out",ipa:"—",pt:"to become exhausted from stress"},
  {en:"mental health",ipa:"—",pt:"psychological well-being"},
  {en:"cut back on",ipa:"—",pt:"to reduce"},
  {en:"give up (something)",ipa:"—",pt:"to stop completely"},
  {en:"screen time",ipa:"—",pt:"time on phone/computer"},
  {en:"burnout / recharge",ipa:"—",pt:"exhaustion / recover energy"},
  {en:"listen to your body",ipa:"—",pt:"pay attention to what it needs"},
  {en:"anxiety",ipa:"/æŋˈzaɪəti/",pt:"strong worry"},
  {en:"balance",ipa:"/ˈbæləns/",pt:"equilibrium"}
 ],
 grammar:{exp:"Talk about ongoing habits with <b>present perfect + since/for</b>. Give reasoned advice with <b>have you tried ___ing? / it might help to...</b>",
  ex:["I've been running three times a week for six months.","I haven't smoked since 2023.","Have you tried cutting back on caffeine?","It might help to leave your phone in another room."]},
 practice:[
  {q:"I ___ (do) yoga ___ March.",a:"have been doing / since"},
  {q:"He ___ (not / drink) coffee ___ 3 months.",a:"hasn't drunk / for"},
  {q:"Advice: 'Have you ___ (leave) your phone outside the bedroom?'",a:"tried leaving"},
  {q:"Phrasal: reduce alcohol → ___ ___ on alcohol.",a:"cut back"}
 ],
 speaking:[
  "What's one habit you've stuck with — and how?",
  "What's one you've fallen off?",
  "Do you think willpower is real or a myth?",
  "How much screen time is too much?",
  "How do you know when you need to rest vs push through?",
  "Is 'self-care' meaningful or just marketing?",
  "How comfortable are people in your country talking about mental health?",
  "COMPLETE: The habit I'd most like to build is ___.",
  "COMPLETE: When I feel burnt out I ___.",
  "SITUATION: A friend keeps saying they'll start exercising 'Monday'. It's been a year. What do you say?",
  "SITUATION: You know someone who might be struggling with anxiety. How do you open the conversation?",
  "CHALLENGE: In 60 seconds, describe your ideal 'reset' day.",
  "FOLLOW-UP: What's the difference between advice that helps and advice that annoys?"
 ],
 roleplay:{title:"Role-play: Advice conversation",scenario:"A is struggling to sleep well. B listens, asks 2 questions, then offers 2 pieces of realistic advice. NO lecturing.",
  lines:["A: I've been sleeping badly for weeks.","B: (empathise + ask 'what does your evening look like?')","A: (answer honestly)","B: (offer one practical suggestion + reasoning)","A: (react — will you try it?)"]},
 homework:{tasks:["Write 100 words about a habit you've built (or want to)","Track your sleep for 5 nights and note the pattern"],link:"https://test-english.com/grammar-points/b1/present-perfect-simple-continuous/"}
},

/* ---------- 34. MAKING PLANS (A2) ---------- */
{week:34, theme:"Making Plans", level:"A2", grammar:"Present continuous for future · suggestions",
 warmup:["What are you doing this weekend?","Do you plan a lot or improvise?","When did you last cancel a plan?"],
 review:["Quick check: I ___ (meet) Ana on Saturday."],
 leadin:{text:"A2: making, accepting and refusing plans politely.",q:"Any plans this evening?"},
 vocab:[
  {en:"free / busy",ipa:"—",pt:"available / not available"},
  {en:"catch up",ipa:"—",pt:"meet after a while / share news"},
  {en:"grab a drink",ipa:"—",pt:"go for a drink"},
  {en:"reschedule",ipa:"/ˌriːˈʃedjuːl/",pt:"move to another day"},
  {en:"cancel",ipa:"/ˈkænsl/",pt:"not do it"},
  {en:"How about...?",ipa:"—",pt:"suggestion"},
  {en:"Are you free on...?",ipa:"—",pt:"ask availability"},
  {en:"Sounds good / sounds great",ipa:"—",pt:"accept"},
  {en:"I'm afraid I can't",ipa:"—",pt:"polite refusal"},
  {en:"tied up",ipa:"—",pt:"very busy"}
 ],
 grammar:{exp:"For fixed future plans use <b>present continuous</b>: I'm meeting Ana at 7. Suggest with <b>How about + -ing / Why don't we...?</b>",
  ex:["I'm having dinner with my family on Sunday.","We're not going out tonight.","How about meeting for coffee?","Why don't we grab a drink after work?"]},
 practice:[
  {q:"I ___ (meet) Ana at 8 tonight.",a:"am meeting"},
  {q:"How ___ (go) to the cinema?",a:"about going"},
  {q:"Sorry, I'm ___ ___ this weekend.",a:"tied up"},
  {q:"Polite refusal: 'I'm ___ I can't.'",a:"afraid"}
 ],
 speaking:[
  "What are you doing this weekend?",
  "Are you a last-minute planner or way-in-advance?",
  "How do you feel when someone cancels on you?",
  "Have you ever double-booked yourself?",
  "COMPLETE: The last time I said yes to plans when I wanted to say no was ___.",
  "SITUATION: A colleague invites you to dinner but you don't want to go. Refuse politely.",
  "SITUATION: Suggest three different plans for this Saturday to a friend.",
  "CHALLENGE: Reschedule with a friend without giving a fake reason."
 ],
 roleplay:{title:"Role-play: Making plans",scenario:"A wants to meet B this week. Find a day and time that works — negotiate.",
  lines:["A: Are you free this week?","B: (answer + suggest)","A: (agree or counter)","B: (confirm day and time)","A: Great — see you then!"]},
 homework:{tasks:["Write 5 lines: making a plan by message with a friend","Learn 6 ways to refuse politely"],link:"https://test-english.com/grammar-points/a2/present-continuous-future-going-to/"}
},

/* ---------- 35. WEEKEND (A1) ---------- */
{week:35, theme:"Weekend", level:"A1", grammar:"Past simple regular · at/on with time",
 warmup:["What did you do last weekend?","Do you rest or go out on weekends?","Sunday: fun day or slow day?"],
 review:["Quick check: I ___ (watch) a movie on Saturday."],
 leadin:{text:"A1: simple past + free-time vocab. Everyone has an opinion on weekends.",q:"What's your ideal weekend?"},
 vocab:[
  {en:"watch a film",ipa:"—",pt:"see a movie"},
  {en:"go out",ipa:"—",pt:"leave the house for fun"},
  {en:"stay in",ipa:"—",pt:"stay at home"},
  {en:"visit family",ipa:"—",pt:"go to see family"},
  {en:"clean the house",ipa:"—",pt:"tidy up"},
  {en:"go for a walk",ipa:"—",pt:"walk outside"},
  {en:"sleep in",ipa:"—",pt:"wake up late"},
  {en:"relax",ipa:"—",pt:"rest and calm down"},
  {en:"have a barbecue",ipa:"—",pt:"cook meat outside with friends"},
  {en:"work overtime",ipa:"—",pt:"work extra hours"}
 ],
 grammar:{exp:"Talk about last weekend with <b>past simple</b>: watched, cleaned, cooked. Times: <b>on</b> Saturday, <b>at</b> the weekend, <b>on</b> Sunday morning.",
  ex:["I watched a film on Saturday night.","We visited my parents on Sunday.","She stayed in on Friday.","I didn't work last weekend."]},
 practice:[
  {q:"I ___ (watch) TV on Saturday.",a:"watched"},
  {q:"We ___ (not / go) out on Friday.",a:"didn't go"},
  {q:"What ___ you ___ (do) last weekend?",a:"did / do"},
  {q:"I love to ___ ___ on Sunday morning.",a:"sleep in"}
 ],
 speaking:[
  "What did you do last weekend?",
  "Do you prefer to go out or stay in?",
  "What's your perfect Saturday?",
  "What's your perfect Sunday?",
  "QUICK CHOICE: Sleep in or wake up early?",
  "QUICK CHOICE: Party Saturday or quiet Saturday?",
  "COMPLETE: Every Sunday I ___.",
  "COMPLETE: The best weekend I've had recently was ___.",
  "SITUATION: A friend suggests a busy weekend. You want to rest. What do you say?",
  "CHALLENGE: Describe your ideal weekend in 5 sentences."
 ],
 roleplay:{title:"Role-play: Monday morning catch-up",scenario:"Two colleagues on Monday. Ask about the weekend. Give details.",
  lines:["A: Hey, how was your weekend?","B: (2-3 sentences)","B: What about you?","A: (2-3 sentences)","B: Sounds ___!"]},
 homework:{tasks:["Write 6 sentences about your last weekend","Prepare 3 questions to ask about someone's weekend"],link:"https://test-english.com/grammar-points/a1/past-simple/"}
},

/* ---------- 36. MOVIES & SERIES (B1) ---------- */
{week:36, theme:"Movies & Series", level:"B1", grammar:"Reviews · superlatives · would recommend",
 warmup:["What was the last film or series you finished?","Do you binge or one episode at a time?","Do you finish things you don't love?"],
 review:["Quick check: It's the ___ (good) film I've seen this year."],
 leadin:{text:"B1: describing, comparing and recommending. Also complaining tastefully.",q:"Recommend me something in 60 seconds."},
 vocab:[
  {en:"binge-watch",ipa:"—",pt:"watch many episodes in a row"},
  {en:"a plot twist",ipa:"—",pt:"a surprise in the story"},
  {en:"a cliffhanger",ipa:"—",pt:"an unresolved ending"},
  {en:"gripping",ipa:"/ˈɡrɪpɪŋ/",pt:"you can't stop watching"},
  {en:"predictable",ipa:"—",pt:"easy to guess"},
  {en:"underrated / overrated",ipa:"—",pt:"better / worse than people think"},
  {en:"a slow burn",ipa:"—",pt:"slow at first, gets great"},
  {en:"a tear-jerker",ipa:"—",pt:"makes you cry"},
  {en:"cheesy",ipa:"—",pt:"embarrassingly emotional"},
  {en:"the acting",ipa:"—",pt:"how the actors play"},
  {en:"the soundtrack",ipa:"—",pt:"the music"},
  {en:"the pacing",ipa:"—",pt:"how fast/slow the story moves"}
 ],
 grammar:{exp:"Recommend with <b>would recommend / it's worth watching</b>. Compare with superlatives: <b>the best I've seen this year</b>.",
  ex:["I'd definitely recommend it if you like slow burns.","It's the most gripping thing I've watched all year.","The pacing was a bit slow at the start.","The soundtrack alone is worth it."]},
 practice:[
  {q:"It's ___ (good) series I've watched.",a:"the best"},
  {q:"I ___ (would/recommend) it to anyone.",a:"would recommend"},
  {q:"Rephrase 'I couldn't stop watching': (adjective)",a:"It was gripping."},
  {q:"Rephrase 'It's better than people say': (adjective)",a:"It's underrated."}
 ],
 speaking:[
  "What was the last thing you finished — and why?",
  "What's a film everyone loves that you find overrated?",
  "Comedy, drama, documentary or thriller — pick one and defend it.",
  "Would you rather watch a bad film in the cinema or a good one at home?",
  "Have you ever cried at a film? (No shame.)",
  "Are TV series today better than 10 years ago?",
  "COMPLETE: A guilty-pleasure film for me is ___.",
  "COMPLETE: I could never rewatch ___ because ___.",
  "SITUATION: Recommend me one series and one film in 60 seconds total.",
  "SITUATION: A friend hates a film you love. Don't get defensive — defend it well.",
  "CHALLENGE: Describe a film in 3 sentences without saying its name — I'll guess.",
  "FOLLOW-UP: Do films need to entertain, provoke, or move you?"
 ],
 roleplay:{title:"Role-play: What to watch tonight",scenario:"Two friends can't agree what to watch. Each proposes one, defends it, they negotiate.",
  lines:["A: How about ___?","B: I'm not really in the mood for that. What about ___?","A: (push back)","B: (compromise)","A: (agree)"]},
 homework:{tasks:["Write a 100-word review of the last thing you watched","Prepare 3 recommendations for different moods"],link:"https://test-english.com/grammar-points/b1/comparatives-superlatives/"}
},

/* ---------- 37. MUSIC (B1) ---------- */
{week:37, theme:"Music — Taste & Identity", level:"B1", grammar:"Used to · describing preferences",
 warmup:["What have you been listening to lately?","Has your music taste changed over time?","Do you sing when nobody's listening?"],
 review:["Quick check: I ___ (use to / listen) to rock. Now I ___ (prefer) jazz."],
 leadin:{text:"B1: music says a lot about who we are. Talk about it with detail.",q:"What's the soundtrack of your life right now?"},
 vocab:[
  {en:"catchy",ipa:"—",pt:"stays in your head"},
  {en:"an earworm",ipa:"—",pt:"a song stuck in your head"},
  {en:"the lyrics",ipa:"/ˈlɪrɪks/",pt:"the words"},
  {en:"the beat",ipa:"—",pt:"the rhythm"},
  {en:"live music",ipa:"—",pt:"performed in front of you"},
  {en:"a gig",ipa:"—",pt:"a small concert"},
  {en:"tone-deaf",ipa:"—",pt:"can't sing in tune"},
  {en:"be into (a genre)",ipa:"—",pt:"to like it a lot"},
  {en:"discover an artist",ipa:"—",pt:"find a new one"},
  {en:"a playlist",ipa:"—",pt:"a list of songs"},
  {en:"grow on you",ipa:"—",pt:"you start liking it over time"},
  {en:"cheesy song",ipa:"—",pt:"embarrassingly sweet"}
 ],
 grammar:{exp:"Compare taste over time with <b>used to</b>: I used to listen to ___, now I'm into ___. Describe with sensory adjectives.",
  ex:["I used to hate country music; now it's growing on me.","I'm really into indie folk these days.","The lyrics are simple but the beat is amazing.","It's incredibly catchy."]},
 practice:[
  {q:"I ___ (use to / love) pop; now I ___ (prefer) classical.",a:"used to love / prefer"},
  {q:"That chorus is so ___.",a:"catchy"},
  {q:"Rephrase 'I'm starting to like it': (phrasal)",a:"It's growing on me."},
  {q:"'A song stuck in your head' = ___",a:"earworm"}
 ],
 speaking:[
  "What music do you have on repeat right now?",
  "Has your taste changed in the last 5 years? How?",
  "Live music or studio version?",
  "Can you enjoy a song in a language you don't understand?",
  "What song reminds you of a specific person or time?",
  "Do lyrics matter more than the beat, for you?",
  "What music do you play when you need energy? When you're sad?",
  "COMPLETE: The best concert I've been to was ___.",
  "COMPLETE: A song I'm embarrassed to love is ___.",
  "SITUATION: Make a 3-song playlist for someone visiting your country for the first time.",
  "CHALLENGE: Convince me to try a genre I don't listen to.",
  "FOLLOW-UP: Does the music we grew up with stay the best forever?"
 ],
 roleplay:{title:"Role-play: Building a shared playlist",scenario:"Two friends make a road-trip playlist. Each proposes 2 songs, defends them. Must AGREE on a final 5.",
  lines:["A: I nominate ___ because ___.","B: (accept or reject with reason)","B: My turn — ___.","A: (react)","(alternate, negotiate)"]},
 homework:{tasks:["Write 8 sentences about how your music taste has changed","Make a 5-song playlist and write one line about each"],link:"https://test-english.com/grammar-points/b1/used-to-would/"}
},

/* ---------- 38. TECHNOLOGY (B2) ---------- */
{week:38, theme:"Technology — Attention & Focus", level:"B2", grammar:"Impact language · abstract nouns",
 warmup:["How much screen time did your phone report yesterday?","Have you noticed changes in your attention span?","Do you sleep with your phone in the room?"],
 review:["Quick check: Rephrase 'Phones are bad' with a hedge."],
 leadin:{text:"B2: technology isn't good or bad — it's a set of trade-offs. Argue with specifics.",q:"Is your phone a tool you control, or the other way around?"},
 vocab:[
  {en:"attention span",ipa:"—",pt:"how long you can focus"},
  {en:"doomscrolling",ipa:"—",pt:"endless scrolling of bad news"},
  {en:"a rabbit hole",ipa:"—",pt:"getting deeply lost in content"},
  {en:"a notification",ipa:"—",pt:"an app alert"},
  {en:"deep work",ipa:"—",pt:"long focused work"},
  {en:"multitasking",ipa:"—",pt:"doing many things at once"},
  {en:"digital detox",ipa:"—",pt:"time away from screens"},
  {en:"a filter bubble",ipa:"—",pt:"only seeing things that agree with you"},
  {en:"algorithm",ipa:"/ˈælɡərɪðəm/",pt:"the code that decides what you see"},
  {en:"AI-generated",ipa:"—",pt:"made by AI"},
  {en:"muscle memory",ipa:"—",pt:"automatic physical habit"},
  {en:"drift",ipa:"/drɪft/",pt:"slowly move in a direction"}
 ],
 grammar:{exp:"Talk impact with <b>abstract nouns</b> + verbs of change: <b>erode, undermine, reshape, amplify</b>. Nuance: <b>it's less that X, more that Y</b>.",
  ex:["The phone doesn't destroy focus; it just erodes it slowly.","Algorithms don't create opinions — they amplify existing ones.","It's less that we're addicted, more that we're understimulated.","In principle it's a tool. In practice it's a habit."]},
 practice:[
  {q:"Rephrase 'Phones ruin our focus': (verb of change)",a:"Phones erode our focus."},
  {q:"Reframe 'It's dangerous' → 'It's less ___ than ___'",a:"It's less dangerous than distracting."},
  {q:"Concede then push back: 'Yes, ___ ___, algorithms feed us what we already want.'",a:"to be fair"},
  {q:"'Getting lost in videos for 2 hours' = going down a ___ ___",a:"rabbit hole"}
 ],
 speaking:[
  "Do you think your attention span has changed in the last 5 years?",
  "Are you addicted to any app? Which one?",
  "Would you accept a monthly payment to not use social media?",
  "Is 'deep work' still possible for most jobs?",
  "Is AI more like electricity, or more like nuclear?",
  "Should we regulate algorithms the way we regulate food?",
  "What tech decision do you think our generation will regret most?",
  "COMPARE: Life with your phone vs one week without.",
  "COMPLETE: The best change I made to my digital habits was ___.",
  "COMPLETE: The one thing I don't do on my phone anymore is ___.",
  "SITUATION: Convince a friend to try a 24-hour phone break — without being preachy.",
  "CHALLENGE: Argue that smartphones have made life better. Then argue they've made it worse.",
  "FOLLOW-UP: Where's the line between tool and dependency?",
  "FOLLOW-UP: What would you need to see to change your mind?"
 ],
 roleplay:{title:"Debate: 'Phones should be banned in schools until age 16.'",scenario:"A defends the ban, B opposes. Two turns each. Then swap. Real arguments only — no clichés.",
  lines:["A: (open with strongest single argument)","B: (concede one point, counter)","A: (evidence or example)","B: (reframe)"]},
 homework:{tasks:["Track your screen time for 3 days and note what surprised you","Write 200 words: 'One thing technology got right and one it got wrong'"],link:"https://test-english.com/grammar-points/b2/linkers-however-nevertheless-still/"}
},

/* ---------- 39. SOCIAL MEDIA (B2) ---------- */
{week:39, theme:"Social Media — Real Life vs Curated Life", level:"B2", grammar:"Present perfect + trends · nuance",
 warmup:["Which platform do you use most? Which have you deleted?","Do you post anything about your life?","Have you ever felt worse after scrolling?"],
 review:["Quick check: Rephrase 'Social media is fake' with nuance."],
 leadin:{text:"B2: no clichés. Distinguish the tools, the incentives, the users, the effects.",q:"Is the problem the platform, the algorithm, or us?"},
 vocab:[
  {en:"curated feed",ipa:"—",pt:"selected and shaped content"},
  {en:"highlight reel",ipa:"—",pt:"only the best moments"},
  {en:"comparison trap",ipa:"—",pt:"constantly comparing yourself"},
  {en:"performative",ipa:"—",pt:"done to be seen"},
  {en:"echo chamber",ipa:"—",pt:"only your own views amplified"},
  {en:"go viral",ipa:"—",pt:"spread very quickly"},
  {en:"cancel culture",ipa:"—",pt:"public criticism to punish"},
  {en:"a follower",ipa:"—",pt:"someone who follows an account"},
  {en:"engagement",ipa:"/ɪnˈɡeɪdʒmənt/",pt:"likes, comments, shares"},
  {en:"unfollow / mute",ipa:"—",pt:"stop seeing / silence"},
  {en:"parasocial",ipa:"—",pt:"one-sided relationship with a public figure"},
  {en:"content overload",ipa:"—",pt:"too much content"}
 ],
 grammar:{exp:"Discuss trends with <b>present perfect</b> (has changed / has led to). Nuance with <b>it depends on / not so much X as Y / to varying degrees</b>.",
  ex:["Social media has reshaped how we compare ourselves.","It's not so much lying as curating.","This affects people to varying degrees.","Cancel culture has become a scarecrow more than a real thing — depending on who you ask."]},
 practice:[
  {q:"Nuance 'It's fake': (using X as Y)",a:"It's not so much fake as curated."},
  {q:"Rephrase 'Everyone is lying online': (hedge)",a:"There's a lot of curation online, to varying degrees."},
  {q:"'Only your views amplified' = an ___ ___",a:"echo chamber"},
  {q:"'One-sided emotional connection to a celebrity' = ___ relationship",a:"parasocial"}
 ],
 speaking:[
  "Which platform makes you feel worst — and which makes you feel best?",
  "Have you ever curated your life online? Be honest about how.",
  "Is being famous online more or less real than being famous on TV was?",
  "Is 'authenticity' online possible or is that just a better performance?",
  "Should kids under 16 be allowed on social media?",
  "Would social media exist without the algorithm? What would it look like?",
  "Is 'cancel culture' overstated?",
  "COMPARE: Instagram vs LinkedIn — same behaviour in different clothes?",
  "COMPLETE: The last time I unfollowed someone was because ___.",
  "COMPLETE: If I had teenagers, my rule would be ___.",
  "SITUATION: A close friend posts constantly and seems to live for likes. Do you say anything?",
  "SITUATION: You go viral for one thing. What's the good and what's the bad in the next 48 hours?",
  "CHALLENGE: Defend social media in 90 seconds. Then criticise it in 90.",
  "FOLLOW-UP: Whose responsibility is our attention — ours or the platform's?"
 ],
 roleplay:{title:"Debate: 'Social media is more harmful than helpful for teenagers'",scenario:"A defends, B opposes. Two rounds. Then swap. Use hedges, evidence, personal experience.",
  lines:["A: (strongest single claim)","B: (concede a nuance, counter)","A: (specific example)","B: (reframe)"]},
 homework:{tasks:["Write 200 words on your relationship with one platform","List 5 things you would ban if you designed a new platform"],link:"https://test-english.com/grammar-points/b2/present-perfect-simple-continuous/"}
},

/* ---------- 40. ASKING FOR DIRECTIONS (B1) — extends week 13 ---------- */
{week:40, theme:"Asking for Directions — Complex", level:"B1", grammar:"Prepositions of movement · imperatives",
 warmup:["Are you good with directions?","Do you use maps or ask people?","Have you ever been really lost?"],
 review:["Quick check: Go ___ the bridge. Turn left ___ the traffic lights."],
 leadin:{text:"B1: giving directions clearly to someone who is confused. Handling 'I don't understand'.",q:"When did you last help a lost tourist?"},
 vocab:[
  {en:"go straight (on)",ipa:"—",pt:"continue forward"},
  {en:"turn left / right",ipa:"—",pt:"change direction"},
  {en:"take the second right",ipa:"—",pt:"turn on the second street on the right"},
  {en:"cross the road",ipa:"—",pt:"go to the other side"},
  {en:"go past",ipa:"—",pt:"pass by"},
  {en:"opposite / next to / between",ipa:"—",pt:"facing / at the side / in the middle"},
  {en:"on the corner",ipa:"—",pt:"at the corner of the street"},
  {en:"a landmark",ipa:"—",pt:"a well-known place used as a reference"},
  {en:"a shortcut",ipa:"—",pt:"a shorter way"},
  {en:"take a wrong turn",ipa:"—",pt:"turn the wrong way"},
  {en:"You can't miss it",ipa:"—",pt:"it's very visible"},
  {en:"Sorry, I'm not from around here",ipa:"—",pt:"polite 'I don't know'"}
 ],
 grammar:{exp:"Use imperatives for directions (Go, Turn, Take) + prepositions of movement (across, along, past, into). Add a landmark for confirmation.",
  ex:["Go along this street until you see a church.","Take the second right, then it's on your left.","Go past the pharmacy — it's opposite the bank.","You can't miss it — big blue sign."]},
 practice:[
  {q:"Go ___ the bridge and turn right.",a:"across / over"},
  {q:"Take the ___ right after the traffic lights.",a:"second / next"},
  {q:"Go ___ the pharmacy — it's on the next corner.",a:"past"},
  {q:"Rephrase 'I don't live here': (polite phrase)",a:"Sorry, I'm not from around here."}
 ],
 speaking:[
  "How is your sense of direction — really?",
  "Do you follow GPS blindly or check the road?",
  "When was the last time you got lost? What happened?",
  "In your city, is it easy to find your way? Why?",
  "COMPLETE: The most confusing place I've ever tried to navigate was ___.",
  "SITUATION: Give me directions from your house to the nearest supermarket in 6 clear steps.",
  "SITUATION: A tourist asks for directions to a place that's actually 40 minutes away. What do you say?",
  "SITUATION: You're asked directions to a place you don't know. Handle it politely.",
  "CHALLENGE: Explain the shape of your city to me in 3 sentences.",
  "FOLLOW-UP: What makes directions confusing — the person, the place, or the language?"
 ],
 roleplay:{title:"Role-play: Complex directions",scenario:"A is a tourist trying to reach a landmark that requires 3 turns and a metro. B is a local. A must confirm each step because they don't understand the first time.",
  lines:["A: Excuse me, how do I get to ___?","B: (3 clear steps)","A: (I didn't catch the second part — repeat?)","B: (repeat + landmark)","A: How long will it take?","B: (answer + wish luck)"]},
 homework:{tasks:["Write step-by-step directions from your home to a famous place","Learn 10 prepositions of movement"],link:"https://test-english.com/grammar-points/a2/prepositions-place-in-on-at/"}
},

/* ---------- 41. TRANSPORTATION (A2) ---------- */
{week:41, theme:"Transportation", level:"A2", grammar:"By + transport · How long does it take?",
 warmup:["How do you get to work?","Do you drive?","Do you like public transport?"],
 review:["Quick check: I go to work ___ bus. It takes ___ 40 minutes."],
 leadin:{text:"A2: describe how you travel, compare, complain.",q:"What's transport like in your city?"},
 vocab:[
  {en:"bus / train / metro / tram",ipa:"—",pt:"public transport"},
  {en:"traffic",ipa:"/ˈtræfɪk/",pt:"cars on the road"},
  {en:"rush hour",ipa:"—",pt:"the busiest time"},
  {en:"a station / a stop",ipa:"—",pt:"where you get on / off"},
  {en:"a ticket",ipa:"—",pt:"paper for the trip"},
  {en:"a fare",ipa:"/feə/",pt:"price of a ticket"},
  {en:"crowded",ipa:"/ˈkraʊdɪd/",pt:"full of people"},
  {en:"a taxi / a ride",ipa:"—",pt:"car service"},
  {en:"walk / cycle",ipa:"—",pt:"go on foot / by bike"},
  {en:"How long does it take?",ipa:"—",pt:"how much time"}
 ],
 grammar:{exp:"Use <b>by + transport</b> (by bus, by car, by train — but ON foot). Ask time with <b>How long does it take?</b>",
  ex:["I go to work by train.","It takes about 40 minutes.","We usually go on foot.","She goes to school by bike."]},
 practice:[
  {q:"I go to work ___ metro.",a:"by"},
  {q:"How long ___ it take?",a:"does"},
  {q:"It ___ 25 minutes.",a:"takes"},
  {q:"There's a lot of ___ in the morning.",a:"traffic"}
 ],
 speaking:[
  "How do you usually get to work?",
  "Is traffic bad in your city?",
  "Public transport in your city — good or bad?",
  "Have you ever missed a bus/train?",
  "QUICK CHOICE: Drive or take the metro?",
  "QUICK CHOICE: Own a car or share/uber?",
  "COMPLETE: The worst thing about my commute is ___.",
  "COMPLETE: If I could change one thing about transport in my city it would be ___.",
  "SITUATION: You're late and there's traffic. Call your boss.",
  "CHALLENGE: Describe the fastest route from your house to the airport."
 ],
 roleplay:{title:"Role-play: Buying a ticket",scenario:"A is a visitor at a station. B sells tickets. A asks about times, prices and the platform.",
  lines:["A: Hi, I'd like a ticket to ___.","B: One way or return?","A: (answer + ask price)","B: (price + platform)","A: (thanks + ask how long)"]},
 homework:{tasks:["Write about your daily commute in 8 sentences","Learn 10 transport verbs (catch, miss, board, get off...)"],link:"https://test-english.com/grammar-points/a2/prepositions-transport-in-on-by/"}
},

/* ---------- 42. SMALL TALK (B1) ---------- */
{week:42, theme:"Small Talk — Beyond the Weather", level:"B1", grammar:"Open questions · reactions",
 warmup:["Are you good at small talk?","What's your go-to opener at an event?","What's the worst small-talk topic?"],
 review:["Quick check: Turn 'Do you like your job?' into an open question."],
 leadin:{text:"Small talk isn't small — it opens or closes every conversation. B1: get past the weather.",q:"What makes small talk actually enjoyable?"},
 vocab:[
  {en:"an opener",ipa:"—",pt:"the first line to start a conversation"},
  {en:"awkward silence",ipa:"—",pt:"uncomfortable quiet"},
  {en:"break the ice",ipa:"—",pt:"start a conversation"},
  {en:"steer the conversation",ipa:"—",pt:"guide it"},
  {en:"an open-ended question",ipa:"—",pt:"question with long answer"},
  {en:"chit-chat",ipa:"—",pt:"light conversation"},
  {en:"active listening",ipa:"—",pt:"really paying attention"},
  {en:"common ground",ipa:"—",pt:"shared interest"},
  {en:"come across as",ipa:"—",pt:"appear to be"},
  {en:"read the room",ipa:"—",pt:"understand the mood"},
  {en:"exit the conversation",ipa:"—",pt:"politely end it"},
  {en:"a conversation starter",ipa:"—",pt:"topic that opens talk"}
 ],
 grammar:{exp:"Prefer <b>open questions</b> (What / How / Why) over yes/no. Show interest by <b>reflecting</b> and asking a follow-up.",
  ex:["What brought you to this event?","How did you get into that?","What's been the best part of your week?","That's interesting — tell me more."]},
 practice:[
  {q:"Change 'Do you like your job?' to open.",a:"What do you like most about your job?"},
  {q:"Change 'Was your weekend good?' to open.",a:"What did you get up to at the weekend?"},
  {q:"Rephrase 'How can I end this politely?': (verb)",a:"How do I exit the conversation politely?"},
  {q:"'Understand the mood' = ___ ___ ___",a:"read the room"}
 ],
 speaking:[
  "What's your favourite opener when meeting someone new?",
  "What's the worst small-talk question?",
  "How do you handle an awkward silence?",
  "How do you exit a conversation without being rude?",
  "Do you prefer small talk in your own language or in English?",
  "Do you think small talk is fake, or a real form of respect?",
  "COMPLETE: The best small-talk conversation I ever had was about ___.",
  "COMPLETE: A topic I always try to steer AWAY from is ___.",
  "SITUATION: You're at a work event and know nobody. Start a conversation with a stranger.",
  "SITUATION: Someone is talking too much. Politely end the conversation.",
  "SITUATION: The conversation is dying. Rescue it with one question.",
  "CHALLENGE: In 60 seconds, give me your 3 best small-talk openers.",
  "FOLLOW-UP: What separates good small talk from painful small talk?"
 ],
 roleplay:{title:"Role-play: Cocktail event",scenario:"A and B don't know each other. A opens, they talk for ~2 minutes, then A politely exits to talk to someone else. Swap: B opens, A exits.",
  lines:["A: (opener + genuine curiosity)","B: (answer + reflect back)","A: (follow-up)","B: (share + ask)","A: (natural exit)"]},
 homework:{tasks:["Write 10 open questions you can use at any event","Practise 3 polite exit lines"],link:"https://test-english.com/grammar-points/b1/questions-in-english/"}
},

/* ---------- 43. MEETING NEW PEOPLE (B1) ---------- */
{week:43, theme:"Meeting New People", level:"B1", grammar:"Present perfect for experience · asking follow-ups",
 warmup:["Do you make new friends easily as an adult?","Where do you meet new people now?","Have you kept anyone from a random encounter?"],
 review:["Quick check: I've ___ (know) her for two weeks."],
 leadin:{text:"B1: not just introducing yourself — creating a real second conversation.",q:"What makes you WANT to see someone again after meeting once?"},
 vocab:[
  {en:"hit it off",ipa:"—",pt:"click immediately"},
  {en:"chemistry",ipa:"—",pt:"natural connection"},
  {en:"common interests",ipa:"—",pt:"shared things you like"},
  {en:"exchange contacts",ipa:"—",pt:"share numbers/socials"},
  {en:"keep in touch",ipa:"—",pt:"maintain contact"},
  {en:"a mutual friend",ipa:"—",pt:"someone you both know"},
  {en:"introduce yourself",ipa:"—",pt:"say who you are"},
  {en:"an ice-breaker",ipa:"—",pt:"activity that opens things"},
  {en:"outgoing",ipa:"—",pt:"very social"},
  {en:"reserved",ipa:"/rɪˈzɜːvd/",pt:"quiet, less social"},
  {en:"come across as",ipa:"—",pt:"appear to be"},
  {en:"warm up to",ipa:"—",pt:"start liking gradually"}
 ],
 grammar:{exp:"Ask about experience with <b>have you ever + past participle</b>. Show you're listening with <b>follow-up + emotion tag</b> (Oh really? / That sounds...).",
  ex:["Have you always lived here?","Have you ever done that before?","Oh really — how did that go?","That sounds challenging."]},
 practice:[
  {q:"Have you ever ___ (live) abroad?",a:"lived"},
  {q:"'We connected immediately' = We ___ ___ ___",a:"hit it off"},
  {q:"Reflect: 'I moved 3 times last year' → 'That sounds ___.'",a:"(open — e.g. exhausting)"},
  {q:"Rephrase 'a person we both know': ___ ___",a:"a mutual friend"}
 ],
 speaking:[
  "Where do you meet new people at this stage of life?",
  "Do you keep contact with people you meet by chance?",
  "Have you kept a friendship from a work event or a trip?",
  "How do you know within 5 minutes if you want to see someone again?",
  "Are you outgoing or reserved?",
  "How do you feel about being introduced by a mutual friend?",
  "COMPLETE: The best 'stranger encounter' I've had was ___.",
  "COMPLETE: A question that always leads to a great conversation is ___.",
  "SITUATION: You've just met someone interesting at a dinner. How do you exchange contacts without it being awkward?",
  "SITUATION: You've hit it off with someone but you're clearly at a different life stage. Do you follow up?",
  "CHALLENGE: In 60 seconds, describe how you 'become friends with an adult' now.",
  "FOLLOW-UP: What makes the difference between a nice conversation and a real connection?"
 ],
 roleplay:{title:"Role-play: New colleague",scenario:"B has just joined A's company. A shows B around and starts building rapport. Ask real questions, find common ground.",
  lines:["A: Welcome! How was your first morning?","B: (answer honestly)","A: Where were you before?","B: (share + ask)","A: (find one common interest and dig)","B: (extend it — suggest coffee)"]},
 homework:{tasks:["Write 8 open questions to ask someone you just met","Prepare a 30-second personal intro"],link:"https://test-english.com/grammar-points/b1/present-perfect/"}
},

/* ---------- 44. PHONE CALLS (B1) ---------- */
{week:44, theme:"Phone Calls — Business", level:"B1", grammar:"Reported speech basics · polite formulas",
 warmup:["Do you prefer to call, text or email?","What was the last professional call you made?","What makes a phone call awkward?"],
 review:["Quick check: He said he ___ (call) me back."],
 leadin:{text:"Business calls have a script. B1: learn it and sound natural using it.",q:"How comfortable are you calling in English?"},
 vocab:[
  {en:"speak up / slow down",ipa:"—",pt:"louder / slower"},
  {en:"put through",ipa:"—",pt:"transfer the call"},
  {en:"on hold",ipa:"—",pt:"waiting on the call"},
  {en:"leave a message",ipa:"—",pt:"leave a voice note"},
  {en:"call back",ipa:"—",pt:"return the call"},
  {en:"hang up",ipa:"—",pt:"end the call"},
  {en:"break up (bad signal)",ipa:"—",pt:"connection issue"},
  {en:"reception",ipa:"/rɪˈsepʃn/",pt:"phone signal"},
  {en:"speaking (to answer 'is X there?')",ipa:"—",pt:"'this is X'"},
  {en:"could you repeat that?",ipa:"—",pt:"can you say again"},
  {en:"sorry, I missed that",ipa:"—",pt:"I didn't hear"},
  {en:"just to confirm",ipa:"—",pt:"repeat to be sure"}
 ],
 grammar:{exp:"Report simple sentences: 'I'll call tomorrow' → He said he <b>would call</b> the next day. Use polite phone formulas from the vocab list.",
  ex:["Could I speak to Mr Silva, please?","May I ask who's calling?","Speaking. How can I help?","Could you repeat that, please? The line is breaking up."]},
 practice:[
  {q:"'I'll call you back.' — He said he ___.",a:"would call me back"},
  {q:"Answer 'Is Ana there?' — This is Ana. ___.",a:"Speaking"},
  {q:"Ask politely: 'What's your name?' on a business call.",a:"May I ask who's calling?"},
  {q:"Confirm politely at the end.",a:"Just to confirm, we said ___, right?"}
 ],
 speaking:[
  "Do you prefer calls or messages? Why?",
  "Are business calls easier or harder in English for you?",
  "What's the most awkward call you've had?",
  "Are voicemails still a thing where you are?",
  "How do you handle a call when you can barely hear?",
  "COMPLETE: The trick to sounding professional on the phone is ___.",
  "COMPLETE: My biggest fear on English calls is ___.",
  "SITUATION: You call a client. They're not there. Leave a professional voice message.",
  "SITUATION: The line is very bad and you keep missing what the other person says. Handle it politely.",
  "SITUATION: You have to say 'no' to a client's request on the call. How do you frame it?",
  "CHALLENGE: In 60 seconds, act out both sides of a call scheduling a meeting.",
  "FOLLOW-UP: Does phone-anxiety go away with practice?"
 ],
 roleplay:{title:"Role-play: Scheduling a meeting",scenario:"A calls B's office. B answers. A wants to schedule a 30-minute meeting next week with a specific person. Handle: transfer, times, confirming, exit.",
  lines:["A: Good morning, this is ___ from ___. May I speak to ___?","B: (put through / take message)","A: (state purpose + suggest 2 times)","B: (offer alternative)","A: (confirm details + thank + exit)"]},
 homework:{tasks:["Write a phone script: leaving a professional voicemail","Practise 5 polite call formulas out loud"],link:"https://test-english.com/grammar-points/b1/reported-speech-statements/"}
},

/* ---------- 45. PROBLEMS & SOLUTIONS (B2) ---------- */
{week:45, theme:"Problems & Solutions — Diplomacy", level:"B2", grammar:"Diplomatic hedges · conditionals for solutions",
 warmup:["Are you a problem-namer or a problem-fixer?","When was the last time you had to give bad news at work?","Do you say hard things directly or wrap them?"],
 review:["Quick check: Soften 'You're wrong'."],
 leadin:{text:"At B2 the interesting question isn't the problem — it's HOW you talk about it without breaking relationships.",q:"How do you raise a hard issue without shutting down the room?"},
 vocab:[
  {en:"raise an issue",ipa:"—",pt:"bring up a problem"},
  {en:"the elephant in the room",ipa:"—",pt:"obvious problem no one names"},
  {en:"a workaround",ipa:"—",pt:"partial solution"},
  {en:"a root cause",ipa:"—",pt:"the real underlying reason"},
  {en:"the fallout",ipa:"—",pt:"the consequences after a problem"},
  {en:"stakeholder",ipa:"—",pt:"anyone with interest in the outcome"},
  {en:"escalate",ipa:"/ˈeskəleɪt/",pt:"take to a higher level"},
  {en:"push back",ipa:"—",pt:"resist / disagree politely"},
  {en:"be on the same page",ipa:"—",pt:"share understanding"},
  {en:"tension / friction",ipa:"—",pt:"conflict, disagreement"},
  {en:"call it out",ipa:"—",pt:"name it publicly"},
  {en:"tread carefully",ipa:"—",pt:"be careful"}
 ],
 grammar:{exp:"Diplomatic language: <b>past continuous</b> to soften ('I was wondering...'), <b>would</b> for hypothetical suggestions, <b>seems / might / perhaps</b> for hedging.",
  ex:["I was wondering if there's another angle we haven't considered.","Would it be worth revisiting the deadline?","It might just be me, but the numbers don't seem to add up.","Perhaps we could look at this differently."]},
 practice:[
  {q:"Soften 'You're wrong.'",a:"I might be missing something, but I see it differently."},
  {q:"Soften 'This won't work.'",a:"I have some concerns about how this would work in practice."},
  {q:"Suggest without pushing: 'Change the deadline.'",a:"Would it be worth revisiting the deadline?"},
  {q:"'The real reason underneath' = the ___ ___",a:"root cause"}
 ],
 speaking:[
  "Are you good at naming the 'elephant in the room'? Cost?",
  "Do people in your country tend to be direct or indirect?",
  "When is directness a virtue and when a liability?",
  "Have you ever escalated something and regretted it?",
  "Have you ever NOT escalated and regretted it?",
  "How do you push back on a manager without damage?",
  "COMPARE: 'Nice-and-vague' vs 'blunt-and-clear' feedback.",
  "COMPLETE: A time I raised a hard issue well was ___.",
  "COMPLETE: A time I stayed silent and shouldn't have was ___.",
  "SITUATION: A colleague repeatedly takes credit for your ideas. Raise it with them directly, diplomatically.",
  "SITUATION: A client wants something you can't deliver on time. Say no without saying 'no'.",
  "CHALLENGE: Deliver the same bad news three ways: direct, diplomatic, evasive.",
  "FOLLOW-UP: Where does diplomacy end and cowardice begin?"
 ],
 roleplay:{title:"Role-play: The uncomfortable meeting",scenario:"A has to tell B that B's work quality has dropped and it's affecting the team. B is defensive. A must be direct enough to be useful and diplomatic enough not to burn bridges.",
  lines:["A: (open honestly + no accusation)","B: (defend)","A: (acknowledge + specific example)","B: (push back)","A: (agree on one concrete next step)"]},
 homework:{tasks:["Rewrite 3 direct sentences into diplomatic ones","Prepare a 60-second script for raising a hard issue"],link:"https://test-english.com/grammar-points/b2/mixed-conditionals/"}
},

/* ---------- 46. COMPLAINTS (B2) ---------- */
{week:46, theme:"Complaints — Diplomatic Language", level:"B2", grammar:"Passive voice · hedging",
 warmup:["Do you complain when service is bad or let it go?","Do you tip after bad service?","Are people who complain 'difficult'?"],
 review:["Quick check: Turn 'You gave me the wrong food' into passive + polite."],
 leadin:{text:"At B2 complaining becomes a rhetorical art: get what you want without being disliked.",q:"What's a complaint of yours that got a great outcome?"},
 vocab:[
  {en:"there seems to be an issue with...",ipa:"—",pt:"softener"},
  {en:"a misunderstanding",ipa:"—",pt:"confusion, not accusation"},
  {en:"as far as I understood",ipa:"—",pt:"hedge before challenging"},
  {en:"below the standard I expected",ipa:"—",pt:"polite 'bad'"},
  {en:"to resolve / to sort out",ipa:"—",pt:"to fix"},
  {en:"reasonable / unreasonable",ipa:"—",pt:"fair / unfair"},
  {en:"goodwill gesture",ipa:"—",pt:"free thing to compensate"},
  {en:"formal complaint",ipa:"—",pt:"written / official"},
  {en:"take it further",ipa:"—",pt:"escalate"},
  {en:"disproportionate",ipa:"—",pt:"much bigger than needed"},
  {en:"stand my ground",ipa:"—",pt:"insist without moving"},
  {en:"make a scene",ipa:"—",pt:"cause a public fuss"}
 ],
 grammar:{exp:"Passive to remove blame: 'The order <b>was mixed up</b>' instead of 'YOU mixed up my order'. Hedge with 'seems to / appears to / as far as I understood'.",
  ex:["There seems to be a small issue with the bill.","The room appears to have been double-booked.","As far as I understood, delivery was included.","I'd appreciate it if this could be sorted out today."]},
 practice:[
  {q:"Passive: 'You gave me the wrong bill.'",a:"There seems to be an issue — I've been given the wrong bill."},
  {q:"Soften 'This food is cold.'",a:"I'm afraid the food isn't quite as warm as it should be."},
  {q:"Escalate politely: 'I want a refund.'",a:"I think the fairest solution here would be a refund."},
  {q:"'Free thing to make up for it' = a ___ ___",a:"goodwill gesture"}
 ],
 speaking:[
  "Are you more likely to complain in person or in writing?",
  "When have you got great service by complaining well?",
  "When has complaining backfired?",
  "Do you leave bad reviews online? Are they useful or petty?",
  "Where's the line between assertive and rude?",
  "Do you think tipping culture teaches people to accept bad service?",
  "COMPARE: Silent walkout vs firm complaint — which achieves more?",
  "COMPLETE: The most satisfying complaint I've ever made was ___.",
  "COMPLETE: I would never complain about ___ because ___.",
  "SITUATION: You've eaten a meal that made you sick. You're at the restaurant the next day. What do you say?",
  "SITUATION: A hotel charged you for something you didn't use. Handle it at check-out.",
  "SITUATION: You're on a call with a company that refuses your reasonable request. Escalate without shouting.",
  "CHALLENGE: Complain about the same problem in three registers: friendly, firm, formal.",
  "FOLLOW-UP: What separates effective complaining from being 'that person'?"
 ],
 roleplay:{title:"Role-play: Formal escalation",scenario:"A calls a company about a repeated billing error. The rep (B) offers only credit, not a refund. A must escalate politely and firmly, without hanging up.",
  lines:["A: (state the issue + timeline of contacts)","B: (offer partial fix)","A: (thank + insist on the specific outcome)","B: (offer alternative)","A: (name what 'taking it further' would look like)","B: (agree)"]},
 homework:{tasks:["Write a 150-word formal complaint email","Rewrite 5 rude complaints into diplomatic ones"],link:"https://test-english.com/grammar-points/b2/passive-voice/"}
},

/* ---------- 47. GIVING OPINIONS (B2) ---------- */
{week:47, theme:"Giving Opinions — Nuance & Hedging", level:"B2", grammar:"Modals of possibility · discourse markers",
 warmup:["Are you comfortable sharing controversial opinions?","Do you soften your opinions to keep the peace?","Have you changed your mind on something big recently?"],
 review:["Quick check: Rephrase 'This is obvious' more nuancedly."],
 leadin:{text:"At B2 a strong opinion isn't a loud opinion — it's a nuanced one. Say what you think without closing the room.",q:"What's an opinion you hold with confidence, and one you hold with humility?"},
 vocab:[
  {en:"in my view / as I see it",ipa:"—",pt:"opinion openers"},
  {en:"I take the view that...",ipa:"—",pt:"formal 'I think'"},
  {en:"strictly speaking",ipa:"—",pt:"technically"},
  {en:"broadly speaking",ipa:"—",pt:"generally"},
  {en:"to a large / small extent",ipa:"—",pt:"mostly / a bit"},
  {en:"there's an argument that...",ipa:"—",pt:"'some would say'"},
  {en:"I'm inclined to think",ipa:"—",pt:"leaning towards"},
  {en:"I could be persuaded",ipa:"—",pt:"open to change"},
  {en:"a nuanced take",ipa:"—",pt:"balanced position"},
  {en:"black and white",ipa:"—",pt:"simple, no grey area"},
  {en:"steelman (a position)",ipa:"—",pt:"argue the strongest version"},
  {en:"strawman",ipa:"—",pt:"weakest / distorted version"}
 ],
 grammar:{exp:"Hedge with <b>modals of possibility</b>: might / could / may. Signal your process: <b>I'm inclined to think · I'd argue · there's a case for · to be clear · to be fair</b>.",
  ex:["I'm inclined to think the risks are overstated.","There's a case for the opposite too.","To be fair, I could be persuaded by good evidence.","This isn't black and white."]},
 practice:[
  {q:"Soften 'This is stupid.'",a:"I struggle to see the logic here — could you walk me through it?"},
  {q:"Reframe 'I'm right and you're wrong.'",a:"We might just be starting from different assumptions."},
  {q:"Concede + push back: 'You're right about X. ___ ___, Y still stands.'",a:"That said / Having said that"},
  {q:"'Argue the strongest version of the other side' = ___ it",a:"steelman"}
 ],
 speaking:[
  "What's an opinion you used to hold and dropped?",
  "How do you disagree with someone you respect?",
  "Is it possible to have strong opinions AND be humble?",
  "Do you find social media rewards nuance or punishes it?",
  "Is the honest opinion always the useful one?",
  "How do you know when to speak and when to stay silent?",
  "COMPARE: 'Diplomacy' vs 'not saying what you think' — same thing?",
  "COMPLETE: An opinion I hold with real confidence is ___.",
  "COMPLETE: An opinion I hold with genuine humility is ___.",
  "SITUATION: A friend states an opinion you strongly disagree with, over dinner. What do you do?",
  "SITUATION: You're on a work call and a senior says something you know is wrong. Correct them without embarrassing them.",
  "CHALLENGE: Steelman a position you disagree with, for 90 seconds.",
  "FOLLOW-UP: What makes a good opinion — strength, evidence, or willingness to be wrong?"
 ],
 roleplay:{title:"Role-play: Nuanced disagreement",scenario:"A and B disagree on a real topic (chosen at start). Each states position, then must SUMMARISE the other's view before responding. No wins — only clarity.",
  lines:["A: (position + one reason)","B: (steelman A + state own view)","A: (steelman B + push back)","B: (concede one point + refine)"]},
 homework:{tasks:["Write 100 words: an opinion you hold, with 3 hedges built in","Practise steelmanning 3 views you disagree with"],link:"https://test-english.com/grammar-points/b2/modal-verbs-deduction-present/"}
},

/* ---------- 48. AGREEING & DISAGREEING (B2) ---------- */
{week:48, theme:"Agreeing & Disagreeing — Debate", level:"B2", grammar:"Concession · counter-argument",
 warmup:["Do you enjoy a good disagreement?","Have you ever changed someone's mind? How?","Have you ever been persuaded on the spot?"],
 review:["Quick check: Concede then push back: 'You're right that X, but Y ___.'"],
 leadin:{text:"B2: not saying 'I agree / I disagree' — building a real move-by-move exchange.",q:"What's a disagreement you had recently that went WELL?"},
 vocab:[
  {en:"I take your point",ipa:"—",pt:"I understand your argument"},
  {en:"fair enough",ipa:"—",pt:"reasonable"},
  {en:"I couldn't agree more",ipa:"—",pt:"strong agreement"},
  {en:"I see it differently",ipa:"—",pt:"polite disagree"},
  {en:"with respect,",ipa:"—",pt:"polite before disagreeing strongly"},
  {en:"that's a fair point, but",ipa:"—",pt:"concede + counter"},
  {en:"I'm not convinced that...",ipa:"—",pt:"soft disagree"},
  {en:"beg to differ",ipa:"—",pt:"disagree formally"},
  {en:"middle ground",ipa:"—",pt:"compromise position"},
  {en:"talk past each other",ipa:"—",pt:"disagree because you're not on the same topic"},
  {en:"agree to disagree",ipa:"—",pt:"stop, respectfully"},
  {en:"the crux of it",ipa:"—",pt:"the essential point"}
 ],
 grammar:{exp:"Structure: <b>concede → pivot → counter</b>. 'That's a fair point, <b>however</b>...' 'I take your point, <b>that said</b>...'",
  ex:["I take your point about cost — that said, quality has to come first.","Fair enough, but the crux of it is different.","With respect, I'm not convinced that follows.","There's probably some middle ground here."]},
 practice:[
  {q:"Concede + counter: 'You're right this is fast. ___ ___, it's not sustainable.'",a:"That said / Having said that"},
  {q:"Soft disagree: 'I'm not ___ that ___.'",a:"convinced that ___"},
  {q:"Strong polite disagree opener: 'With ___, I ___.'",a:"respect / disagree"},
  {q:"'The main point' = the ___ of it",a:"crux"}
 ],
 speaking:[
  "Is your culture comfortable with disagreement or does it avoid it?",
  "Who's the best 'disagreer' you know — what do they do differently?",
  "Have you ever won an argument by being calm?",
  "Have you ever lost one by being loud?",
  "What's a topic you refuse to argue about? Why?",
  "Is 'agree to disagree' cowardice or wisdom?",
  "COMPARE: Debate vs discussion — same thing?",
  "COMPLETE: The most productive disagreement I've had recently was about ___.",
  "COMPLETE: I never change my mind on ___ because ___.",
  "SITUATION: A friend makes a claim you know is false. Correct them without embarrassing them.",
  "SITUATION: A boss dismisses your idea publicly. Push back without escalation.",
  "CHALLENGE: Argue for something you don't believe — persuasively, for 90 seconds.",
  "FOLLOW-UP: What's the difference between changing your mind and losing?"
 ],
 roleplay:{title:"Debate: Real topic in structured form",scenario:"Pick a real topic. A opens (2 min). B: (1) summarise A, (2) concede one point, (3) counter. A responds same structure. Then swap positions and repeat.",
  lines:["A: (open — one strong claim + one example)","B: (summarise A + concede + counter)","A: (respond to counter, not the summary)","B: (refine or move to middle ground)"]},
 homework:{tasks:["Practise the concede-pivot-counter structure with 3 fake examples","Write 150 words: 'A position I steelman even though I disagree'"],link:"https://test-english.com/grammar-points/b2/linkers-however-nevertheless-still/"}
},

/* ---------- 49. FUTURE PLANS (B1) ---------- */
{week:49, theme:"Future Plans — Long-term Ambitions", level:"B1", grammar:"Future forms review · hope / plan / would like",
 warmup:["What are your plans for the next year?","Do you have a 5-year plan?","Do you believe in long plans?"],
 review:["Quick check: I ___ (plan) to move next year. She ___ (hope) to travel more."],
 leadin:{text:"B1: distinguish plan / hope / intention / dream in real conversation.",q:"What are you actually working towards right now?"},
 vocab:[
  {en:"an ambition",ipa:"—",pt:"a big goal"},
  {en:"a goal / a target",ipa:"—",pt:"something to reach"},
  {en:"a milestone",ipa:"—",pt:"an important step"},
  {en:"in the pipeline",ipa:"—",pt:"planned but not started"},
  {en:"on hold",ipa:"—",pt:"paused"},
  {en:"long-term / short-term",ipa:"—",pt:"far / close in time"},
  {en:"a plan B",ipa:"—",pt:"backup plan"},
  {en:"open-ended",ipa:"—",pt:"no fixed end date"},
  {en:"life stage",ipa:"—",pt:"phase of life"},
  {en:"take a leap",ipa:"—",pt:"make a big risky decision"},
  {en:"take stock",ipa:"—",pt:"reflect on where you are"},
  {en:"looking back",ipa:"—",pt:"reflecting on the past"}
 ],
 grammar:{exp:"Levels of certainty: <b>I'm going to</b> (decided) > <b>I'm planning to</b> > <b>I hope to</b> > <b>I'd like to / I might</b>.",
  ex:["I'm going to change jobs next month.","I'm planning to move within a year.","I hope to learn a new language this year.","I'd like to live abroad at some point."]},
 practice:[
  {q:"'Decided': I ___ ___ (start) a course.",a:"am going to start"},
  {q:"'Wish': I ___ ___ (visit) Japan one day.",a:"'d like to visit"},
  {q:"'Paused': The project is ___ ___.",a:"on hold"},
  {q:"'Backup plan' = ___ ___",a:"plan B"}
 ],
 speaking:[
  "What are your plans for the next 12 months?",
  "Do you have a 5-year plan? Should we all?",
  "What's an ambition you're afraid to say out loud?",
  "What's a plan you dropped and don't regret?",
  "Do you believe in long-term planning, or in showing up daily?",
  "COMPLETE: A big change I'd like to make is ___.",
  "COMPLETE: A goal I've been avoiding is ___.",
  "SITUATION: A friend has a bold plan you find unrealistic. What do you say?",
  "SITUATION: You realise your 3-year plan doesn't excite you anymore. How do you rewrite it?",
  "CHALLENGE: In 60 seconds, describe where you want to be in 3 years — with one concrete milestone.",
  "FOLLOW-UP: Do plans give freedom or take it away?"
 ],
 roleplay:{title:"Role-play: Life planning conversation",scenario:"A shares a real 12-month plan with B. B asks 3 pointed questions (What could go wrong? Why now? What's your plan B?). A must NOT get defensive.",
  lines:["A: I'm planning to ___.","B: What's the timeline?","A: (answer)","B: What's your plan B?","A: (answer honestly)","B: Why now?","A: (real reason)"]},
 homework:{tasks:["Write 150 words: '3 things I'll have done in 12 months'","Break one big ambition into 3 milestones"],link:"https://test-english.com/grammar-points/b1/future-tenses/"}
},

/* ---------- 50. FOOD & COOKING (B1) — extends week 9 ---------- */
{week:50, theme:"Food & Cooking", level:"B1", grammar:"Passive for recipes · comparatives",
 warmup:["Do you enjoy cooking or just tolerate it?","What's a dish you can actually cook well?","Fresh food or convenience?"],
 review:["Quick check: The onions ___ (add) after 5 minutes. Home food is ___ (healthy) than takeaway."],
 leadin:{text:"B1: describe dishes, cooking processes, food habits and preferences with real detail.",q:"What's the one dish that says 'home' for you?"},
 vocab:[
  {en:"chop / slice / dice",ipa:"—",pt:"different ways to cut"},
  {en:"boil / fry / roast / bake / grill",ipa:"—",pt:"cooking methods"},
  {en:"seasoning",ipa:"/ˈsiːzənɪŋ/",pt:"salt, pepper, herbs"},
  {en:"a pinch of / a dash of",ipa:"—",pt:"small amount"},
  {en:"marinate",ipa:"—",pt:"soak in flavour"},
  {en:"leftovers",ipa:"—",pt:"food from a previous meal"},
  {en:"comfort food",ipa:"—",pt:"food that feels like home"},
  {en:"an acquired taste",ipa:"—",pt:"you have to learn to like it"},
  {en:"picky eater",ipa:"—",pt:"eats few things"},
  {en:"batch cook",ipa:"—",pt:"cook a lot at once"},
  {en:"a signature dish",ipa:"—",pt:"the one YOU're known for"},
  {en:"from scratch",ipa:"—",pt:"from raw ingredients"}
 ],
 grammar:{exp:"Recipes use <b>passive voice</b>: The onions <b>are added</b> at the end. Compare cooking styles with <b>more / less than / as ___ as</b>.",
  ex:["The garlic is chopped and added first.","Baking is healthier than frying, generally.","This dish isn't as difficult as it looks.","Everything is made from scratch."]},
 practice:[
  {q:"Passive: You bake the cake for 40 min.",a:"The cake is baked for 40 minutes."},
  {q:"Compare: Cooking at home is ___ (healthy) than eating out.",a:"healthier"},
  {q:"'Small amount of salt' = a ___ ___ salt.",a:"pinch of"},
  {q:"'Cook a big amount to freeze' = ___ ___",a:"batch cook"}
 ],
 speaking:[
  "Are you a good cook? Honestly.",
  "What's your signature dish?",
  "Do you follow recipes or improvise?",
  "Would you rather cook or clean up?",
  "How much does your culture care about food?",
  "Is home cooking a lost skill? Or thriving?",
  "COMPARE: Eating alone vs eating with people — same food, same experience?",
  "COMPLETE: A dish I could eat every day is ___.",
  "COMPLETE: I finally learned how to cook ___ and I'm proud of it.",
  "SITUATION: Explain your favourite recipe to me in 6 steps.",
  "SITUATION: A dinner guest has a strict diet you didn't expect. What do you cook?",
  "CHALLENGE: Sell me a food I've probably never tried, in 60 seconds.",
  "FOLLOW-UP: Does what we cook say something about who we are?"
 ],
 roleplay:{title:"Role-play: Teach the recipe",scenario:"A teaches B (a beginner) how to cook their signature dish in 6 clear steps. B interrupts twice with realistic questions.",
  lines:["A: First, ___.","B: How much?","A: (answer)","B: What if I don't have ___?","A: (substitute)","(continue to step 6)"]},
 homework:{tasks:["Write a 6-step recipe in passive voice","List 8 cooking verbs and describe each in one line"],link:"https://test-english.com/grammar-points/b1/passive-voice/"}
}
];

/* ============================================================
   AUTO-REGISTRO NO LEARNING PROGRESS
   ------------------------------------------------------------
   Substitui a publicação via localStorage que existia em
   lessons.html. O catálogo passa a estar disponível assim que
   este arquivo é carregado, em qualquer página.
   ============================================================ */
(function registerVocabulary(){
  try{
    var NS = window.TeacherLu = window.TeacherLu || {};
    var provider = {
      id: 'conversation',
      skill: 'vocabulary',
      label: 'Conversation Lessons',
      load: function(){ return window.CONV_LESSONS || []; },
      map: function(l, i){
        return {
          key:      'w' + l.week,
          title:    'Week ' + l.week + ' — ' + String(l.theme || '').split('\u2014')[0].trim(),
          subtitle: (l.vocab && l.vocab.length ? l.vocab.length + ' words' : ''),
          level:    l.level || '',
          order:    typeof l.week === 'number' ? l.week : i
        };
      }
    };
    /* Se o registro ainda nao carregou, enfileira: platform-content.js drena.
       Assim a ordem dos <script> deixa de importar. */
    if (NS.Content) NS.Content.register(provider);
    else (NS.__pendingProviders = NS.__pendingProviders || []).push(provider);
  }catch(e){ console.warn('[conversation-lessons] could not register', e); }
})();
