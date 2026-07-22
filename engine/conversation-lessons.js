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
    {q:"___ you a teacher? (question)",a:"Are"},
    {q:"He ___ (not) from the USA.",a:"isn't / is not"},
    {q:"___ she a nurse? (question)",a:"Is"},
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
    {q:"I ___ (wake up) at 6.",a:"wake up"},
    {q:"She ___ (go) to work by car.",a:"goes"},
    {q:"He ___ (have) breakfast at 8.",a:"has"},
    {q:"They ___ (sleep) 8 hours.",a:"sleep"}
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
    {q:"I ___ eat breakfast (100%).",a:"always"},
    {q:"She is ___ tired (raramente).",a:"rarely"},
    {q:"They ___ go out (sometimes).",a:"sometimes"},
    {q:"He ___ smokes (0%).",a:"never"}
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
  review:["Ask the student: What do you like doing in your free time? (weeks 6-8 review)","Quick check: I like cook___ / She is play___ tennis now."],
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
    {q:"I don't have ___ money. (some/any)",a:"any"},
    {q:"How ___ apples do you eat?",a:"many"},
    {q:"How ___ water do you drink?",a:"much"},
    {q:"Would you like ___ tea? (offer)",a:"some"},
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
    {q:"___ I have the menu, please? (polite)",a:"Could / Can"},
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
    {q:"___ shirt here is nice. (singular, near)",a:"This"},
    {q:"___ shoes here are expensive. (plural, near)",a:"These"},
    {q:"___ car over there is new. (singular, far)",a:"That"},
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
    {q:"I usually ___ (wear) jeans.",a:"wear"},
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
