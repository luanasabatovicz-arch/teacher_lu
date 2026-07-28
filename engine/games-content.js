/* ============================================================
   CLASS GAMES — content engine (banco + sorteio), separado da UI.
   games.html é apenas consumidor: window.GAMES_CONTENT.
   Vocabulário A1–A2, inglês americano, palavras úteis (sem raras).
   Um único VOCAB categorizado alimenta os jogos por derivação
   (sem duplicar listas). Sorteio = "saco embaralhado": nunca
   repete uma palavra enquanto houver inéditas na categoria;
   ao esgotar, reembaralha (sem repetir a última do ciclo).
   ============================================================ */
(function(){
'use strict';

/* ============================================================
   VOCAB — banco categorizado (minúsculas). Base de tudo.
   ============================================================ */
var VOCAB={

/* ---------- ANIMALS (domésticos, fazenda, selvagens, insetos, marinhos, aves, répteis) ---------- */
Animals:['dog','cat','puppy','kitten','rabbit','hamster','guinea pig','goldfish','parrot','turtle',
'cow','horse','pig','sheep','goat','donkey','chicken','rooster','duck','goose','turkey','llama',
'lion','tiger','elephant','giraffe','zebra','monkey','gorilla','bear','panda','wolf','fox','deer',
'kangaroo','koala','hippo','rhino','leopard','cheetah','camel','crocodile','alligator','buffalo',
'raccoon','squirrel','bat','hedgehog','mole','otter','beaver','skunk','moose','reindeer',
'ant','bee','butterfly','spider','fly','mosquito','beetle','ladybug','grasshopper','caterpillar','worm','snail','dragonfly','cockroach','cricket',
'fish','shark','whale','dolphin','octopus','crab','lobster','shrimp','jellyfish','seahorse','starfish','seal','walrus','stingray','eel',
'bird','eagle','owl','penguin','sparrow','pigeon','robin','crow','swan','flamingo','peacock','ostrich','hawk','woodpecker','hummingbird','seagull',
'snake','lizard','frog','toad','gecko','iguana','chameleon','tortoise','cobra','python'],

/* ---------- FOOD (frutas, vegetais, bebidas, sobremesas, refeições, fast food, ingredientes, comuns) ---------- */
Food:['apple','banana','orange','grape','strawberry','watermelon','pineapple','mango','peach','pear','cherry','lemon','lime','kiwi','melon','coconut','plum','blueberry','raspberry','avocado',
'carrot','potato','tomato','onion','garlic','pepper','cucumber','lettuce','broccoli','corn','pea','bean','mushroom','spinach','cabbage','celery','pumpkin','eggplant','cauliflower','beet',
'water','milk','juice','coffee','tea','soda','lemonade','smoothie','hot chocolate','iced tea','soup',
'cake','cookie','ice cream','chocolate','candy','pie','donut','brownie','pudding','muffin','cupcake','jelly','honey',
'breakfast','lunch','dinner','snack','dessert','meal',
'hamburger','hot dog','pizza','fries','sandwich','taco','burrito','nachos','popcorn','chips',
'bread','rice','pasta','noodle','cheese','butter','egg','flour','sugar','salt','oil','sauce','ketchup','mustard','mayonnaise',
'chicken','beef','pork','fish','bacon','ham','sausage','steak','shrimp','turkey',
'yogurt','cereal','pancake','waffle','toast','jam','salad','omelet'],

/* ---------- JOBS (conhecidas por A1/A2) ---------- */
Jobs:['teacher','doctor','nurse','dentist','engineer','lawyer','police officer','firefighter','waiter','waitress',
'cook','chef','farmer','artist','singer','actor','actress','dancer','writer','painter','musician','photographer',
'pilot','driver','taxi driver','bus driver','mechanic','electrician','plumber','carpenter','builder','cleaner',
'baker','butcher','barber','hairdresser','tailor','cashier','salesperson','shopkeeper','manager','boss',
'scientist','vet','pharmacist','librarian','journalist','reporter','soldier','sailor','astronaut','judge',
'accountant','banker','secretary','receptionist','babysitter','gardener','fisherman','miner','postman','mailman',
'president','king','queen','coach','athlete','player','flight attendant','tour guide','translator','architect',
'programmer','designer','model','clown','magician','director','professor','student','pilot','guard'],

/* ---------- HOME (cômodos, móveis, eletrodomésticos, objetos, utensílios) ---------- */
Home:['kitchen','bedroom','bathroom','living room','dining room','garage','garden','yard','hall','office','basement','attic','balcony','stairs','roof','wall','floor','ceiling','door','window',
'bed','table','chair','sofa','couch','desk','shelf','bookshelf','wardrobe','closet','drawer','cabinet','mirror','lamp','clock','rug','carpet','curtain','pillow','blanket','mattress','bench','stool',
'fridge','refrigerator','oven','stove','microwave','dishwasher','washing machine','dryer','vacuum','toaster','blender','freezer','fan','heater','iron','television','radio','computer',
'plate','bowl','cup','mug','glass','fork','knife','spoon','pot','pan','kettle','teapot','jar','bottle','napkin','tray',
'towel','soap','toothbrush','toothpaste','shampoo','sink','toilet','shower','bathtub','faucet',
'key','remote','candle','vase','frame','basket','bucket','broom','trash can','doormat','light','switch','plug','outlet'],

/* ---------- SCHOOL ---------- */
School:['teacher','student','classroom','desk','chair','board','whiteboard','chalkboard','chalk','marker','eraser','pen','pencil','pencil case','crayon','ruler','book','notebook','textbook','dictionary',
'backpack','bag','folder','paper','glue','scissors','stapler','tape','clip','highlighter','calculator','globe','map','poster','flag','bell','clock','calendar','locker','uniform',
'homework','test','exam','quiz','grade','lesson','subject','class','recess','break','library','gym','cafeteria','playground','hallway','office','principal','math','science','history','geography','english','art','music','reading','writing','spelling','project','pencil sharpener','notebook','schoolbus','worksheet','assignment','exercise','question','answer','sharpener','field trip','report card','semester','lunchbox','water bottle','sticker','locker room','detention','presentation','group work','pen pal','flashcard','graph','chart','experiment'],

/* ---------- CLOTHES ---------- */
Clothes:['shirt','t-shirt','blouse','sweater','sweatshirt','hoodie','jacket','coat','raincoat','vest','dress','skirt','pants','jeans','shorts','leggings','suit','tie','uniform',
'shoes','sneakers','boots','sandals','slippers','socks','stockings','tights','flip-flops','heels',
'hat','cap','scarf','gloves','mittens','belt','glasses','sunglasses','watch','ring','necklace','bracelet','earrings','backpack','purse','wallet','umbrella',
'pajamas','underwear','swimsuit','bikini','apron','robe','helmet','earmuffs','bowtie','button','pocket','zipper','collar','sleeve','hood','jersey','sweatpants','overalls','cardigan','poncho','nightgown','tracksuit','windbreaker','turtleneck','tank top','jumpsuit','blazer','trench coat','swim trunks','goggles','headband','shoelace','buckle','outfit','sneaker','sandal','glove','mitten','beanie','bandana','necktie','suspenders'],

/* ---------- TRANSPORTATION ---------- */
Transportation:['car','bus','taxi','truck','van','motorcycle','bicycle','bike','scooter','skateboard','train','subway','tram','trolley','plane','airplane','jet','helicopter','boat','ship','ferry','canoe','kayak','sailboat','submarine','yacht',
'wheel','tire','engine','brake','horn','seat','seatbelt','mirror','steering wheel','license','ticket','ambulance','fire truck','police car','tractor','forklift','bulldozer','crane','wagon','carriage','sled','balloon','rocket','spaceship',
'road','street','highway','bridge','tunnel','traffic light','stop sign','crosswalk','sidewalk','parking lot','gas station','airport','station','bus stop','harbor','runway','railway','pilot','driver','passenger','conductor','captain','jeep','minivan','pickup truck','garbage truck','tow truck','cable car','hot air balloon','glider','speedboat','moped','tricycle','wheelchair','stroller','trailer','carpool','cargo ship','rowboat','jet ski','snowmobile','segway'],

/* ---------- SPORTS ---------- */
Sports:['soccer','football','basketball','baseball','volleyball','tennis','table tennis','ping pong','badminton','golf','hockey','rugby','cricket','handball','bowling',
'swimming','diving','surfing','skiing','snowboarding','ice skating','skating','skateboarding','running','jogging','cycling','biking','hiking','climbing','boxing','wrestling','karate','judo','fencing',
'gymnastics','yoga','dancing','fishing','sailing','rowing','archery','horse riding','weightlifting','marathon','race',
'ball','goal','net','racket','bat','glove','helmet','whistle','medal','trophy','team','player','coach','referee','score','win','lose','tie','field','court','stadium','pool','track','gym','jersey','sneakers','darts','billiards','snooker','sledding','curling','polo','lacrosse','softball','dodgeball','frisbee','jump rope','hula hoop','trampoline','martial arts','taekwondo','triathlon','sprint','goalkeeper','skateboard','ping-pong','cheerleading','rollerblading','windsurfing'],

/* ---------- HOBBIES ---------- */
Hobbies:['reading','writing','drawing','painting','coloring','singing','dancing','acting','photography','cooking','baking','gardening','fishing','camping','hiking','traveling',
'knitting','sewing','crafts','origami','pottery','sculpting','collecting','stamps','coins','puzzles','crossword','sudoku','chess','checkers','cards','board games','video games','gaming',
'music','guitar','piano','violin','drums','flute','ukulele','listening to music','watching movies','watching tv','reading comics','blogging','vlogging','coding','programming','biking','skateboarding','rollerblading','birdwatching','stargazing','yoga','meditation','shopping','dancing','juggling','magic','drawing cartoons','scrapbooking','calligraphy','sketching','journaling','karaoke','cosplay','kite flying','woodworking','embroidery','crochet','quilting','beading','volunteering','papercraft','model building','geocaching','podcasting','streaming','scuba diving','rock climbing'],

/* ---------- DAILY ROUTINE ---------- */
DailyRoutine:['wake up','get up','stretch','yawn','make the bed','take a shower','brush teeth','brush hair','wash face','get dressed','put on clothes','comb hair','shave','put on makeup',
'eat breakfast','have breakfast','drink coffee','pack the bag','go to school','go to work','catch the bus','drive to work','walk to school',
'study','read','write','listen','work','take a break','have lunch','eat lunch','play','exercise','do homework','clean the room','wash the dishes','do the laundry','cook dinner','have dinner','eat dinner',
'watch tv','watch a movie','play games','call a friend','check the phone','take out the trash','feed the dog','walk the dog','water the plants',
'take a bath','put on pajamas','set the alarm','turn off the lights','go to bed','sleep','dream','rest','relax','nap','get ready','tidy up','make coffee','iron clothes','fold clothes','lock the door',
'early','late','morning','afternoon','evening','night','today','tomorrow','always','usually','sometimes','never','every day','snooze','open the curtains','pour cereal','check email','tie shoes','grab keys','wait for the bus','ride the bus','arrive at school','greet friends','raise your hand','take notes','have a snack','go home','change clothes','do chores','set the table','clear the table','take medicine','say goodnight','turn on the lamp','count sheep','make lunch'],

/* ---------- WEATHER ---------- */
Weather:['sunny','sun','cloudy','cloud','rainy','rain','stormy','storm','windy','wind','snowy','snow','foggy','fog','icy','ice','hot','warm','cold','cool','freezing','wet','dry','humid',
'thunder','lightning','rainbow','hail','drizzle','shower','breeze','gale','frost','sleet','temperature','degrees','forecast','umbrella','raincoat','sunglasses','thermometer',
'spring','summer','fall','autumn','winter','season','sky','clear','overcast','mild','chilly','boiling','melting','puddle','snowman','snowflake','cloudy sky','heat wave','cold front','climate'],

/* ---------- FAMILY ---------- */
Family:['mother','mom','father','dad','parents','sister','brother','baby','son','daughter','child','children','kid',
'grandmother','grandma','grandfather','grandpa','grandparents','grandson','granddaughter',
'aunt','uncle','cousin','nephew','niece','wife','husband','partner',
'family','twins','stepmother','stepfather','stepsister','stepbrother','mother-in-law','father-in-law','relative','godmother','godfather',
'friend','best friend','neighbor','boy','girl','man','woman','adult','teenager','elderly','pet','engaged','married','single','couple','sibling','brother-in-law','sister-in-law','half-sister','half-brother','great-grandmother','great-grandfather','only child','oldest','youngest','middle child','newborn','toddler','widow','fiance','fiancee','ex-husband','ex-wife','guardian','host family','in-laws'],

/* ---------- BODY ---------- */
Body:['head','hair','face','forehead','eye','eyebrow','eyelash','ear','nose','cheek','mouth','lip','tooth','teeth','tongue','chin','jaw','neck','throat',
'shoulder','arm','elbow','wrist','hand','finger','thumb','nail','palm','fist',
'chest','back','stomach','belly','waist','hip','leg','knee','ankle','foot','feet','toe','heel',
'skin','bone','muscle','brain','heart','lung','blood','rib','spine','skull',
'body','tall','short','thin','fat','strong','weak','beard','mustache','freckles','dimple','smile','fingerprint','knuckle','shin','thigh','calf','scalp','pupil','temple','earlobe','nostril','gum','molar','collarbone','armpit','navel','belly button','kneecap','arch','tendon','vein','artery','nerve','joint','organ','kidney','liver','lap','fingertip','wrinkle','pore','eyelid'],

/* ---------- PLACES ---------- */
Places:['home','house','apartment','school','hospital','clinic','bank','post office','library','museum','zoo','park','playground','beach','pool','gym','stadium','theater','cinema','mall','store','shop','supermarket','market','bakery','pharmacy','restaurant','cafe','hotel','motel',
'church','temple','mosque','police station','fire station','airport','station','bus stop','harbor','port','farm','factory','office','garage','gas station','parking lot',
'city','town','village','country','street','road','square','bridge','castle','palace','tower','lighthouse','bridge','island','mountain','forest','lake','river','desert','cave','waterfall','jungle','field','garden','campground','university','college','kindergarten','courthouse','embassy'],

/* ---------- NATURE ---------- */
Nature:['tree','flower','grass','leaf','plant','bush','forest','jungle','wood','root','branch','trunk','seed','petal','rose','sunflower','tulip','daisy','cactus',
'mountain','hill','valley','cliff','rock','stone','cave','volcano','desert','sand','dune',
'river','lake','sea','ocean','pond','stream','waterfall','beach','wave','island','coast','shore',
'sun','moon','star','sky','cloud','rainbow','planet','space','earth','world',
'fire','water','air','wind','snow','rain','ice','soil','mud','dust',
'field','meadow','garden','park','swamp','coral','shell','feather','nest','honeycomb','mushroom','moss','vine','fog','dew'],

/* ---------- COLORS (comuns + variações) ---------- */
Colors:['red','blue','green','yellow','orange','purple','pink','brown','black','white','gray','grey',
'light blue','dark blue','navy','sky blue','turquoise','teal','light green','dark green','lime','olive',
'light pink','hot pink','dark red','crimson','maroon','scarlet','burgundy',
'gold','silver','bronze','beige','cream','ivory','tan','peach','coral','salmon',
'violet','indigo','lavender','magenta','lilac','mint','aqua','emerald','charcoal','rainbow'],

/* ---------- NUMBERS (por extenso) ---------- */
Numbers:['zero','one','two','three','four','five','six','seven','eight','nine','ten',
'eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty',
'thirty','forty','fifty','sixty','seventy','eighty','ninety','hundred','thousand','million',
'first','second','third','fourth','fifth','tenth','half','quarter','double','dozen'],

/* ---------- MONTHS (completo) ---------- */
Months:['january','february','march','april','may','june','july','august','september','october','november','december'],

/* ---------- DAYS (completo) ---------- */
Days:['monday','tuesday','wednesday','thursday','friday','saturday','sunday'],

/* ---------- HOLIDAYS ---------- */
Holidays:['christmas','new year','easter','halloween','thanksgiving','valentines day','birthday','mothers day','fathers day','independence day','new years eve','christmas eve',
'santa claus','carnival','fireworks','holiday','vacation','party','parade','costume','pumpkin','turkey','gift','present','decoration','celebration','festival','anniversary','graduation','labor day','memorial day','veterans day','black friday','earth day','new years day','boxing day','hanukkah','diwali','ramadan','chinese new year','mardi gras','harvest festival','flag day','cinco de mayo','april fools day','earth hour','world cup','olympics'],

/* ---------- VERBS (200, mistura de rotina, movimento, estudo, cotidiano) ---------- */
Verbs:['be','have','do','go','get','make','take','come','see','look','watch','hear','listen','say','tell','talk','speak','ask','answer','call',
'eat','drink','cook','bake','taste','buy','sell','pay','shop','give','take','bring','carry','hold','put','open','close','push','pull','pick',
'walk','run','jump','hop','skip','climb','crawl','swim','fly','drive','ride','sit','stand','lie','fall','turn','stop','move','dance','kick','throw','catch','hit','win','lose','play',
'read','write','draw','paint','color','count','spell','learn','study','teach','think','know','understand','remember','forget','repeat','practice','copy','check',
'wake','sleep','dream','rest','relax','wash','clean','brush','comb','dress','wear','cut','fix','build','break','use','need','want','like','love','hate',
'work','help','try','start','finish','begin','end','wait','stay','leave','arrive','enter','exit','visit','travel','pack','carry','send','share','show',
'smile','laugh','cry','shout','whisper','sing','hug','kiss','wave','clap','point','nod','shake','touch','feel','smell','breathe',
'live','grow','change','choose','decide','plan','hope','wish','believe','agree','follow','lead','join','meet','marry','invite','thank','apologize','promise','forgive',
'open','close','lock','unlock','fill','empty','pour','mix','stir','cut','peel','slice','fry','boil','freeze','heat','light','burn',
'ring','knock','press','type','click','save','delete','print','draw','erase','fold','tie','cut','glue','paste','measure','weigh','plant','water','feed','pet','walk','ride','park','wave','borrow','lend','rent','keep','lose','find','look for','clean up','turn on','turn off','put on','take off','get up','sit down','stand up','wake up','go out','come back','set up'],

/* ---------- COUNTRIES ---------- */
Countries:['united states','canada','mexico','brazil','argentina','chile','peru','colombia','venezuela','cuba',
'england','ireland','scotland','france','spain','portugal','italy','germany','netherlands','belgium','switzerland','austria','greece','poland','sweden','norway','denmark','finland','russia','ukraine',
'china','japan','korea','india','thailand','vietnam','indonesia','philippines','malaysia','singapore','turkey','israel','egypt','morocco',
'nigeria','kenya','south africa','ghana','ethiopia',
'australia','new zealand','iceland','iran','iraq','saudi arabia','pakistan','bangladesh','cambodia','nepal','hungary','romania','croatia','czech republic','uruguay','ecuador','bolivia','paraguay','costa rica','panama','jamaica','honduras','guatemala','qatar','kuwait','lebanon','jordan','cyprus','luxembourg','monaco'],

/* ---------- NATIONALITIES ---------- */
Nationalities:['american','canadian','mexican','brazilian','argentine','chilean','peruvian','colombian','cuban',
'english','british','irish','scottish','french','spanish','portuguese','italian','german','dutch','belgian','swiss','austrian','greek','polish','swedish','norwegian','danish','finnish','russian','ukrainian',
'chinese','japanese','korean','indian','thai','vietnamese','indonesian','filipino','malaysian','turkish','israeli','egyptian','moroccan',
'nigerian','kenyan','australian','icelandic','iranian','iraqi','pakistani','uruguayan','ecuadorian','bolivian','jamaican','costa rican','panamanian'],

/* ---------- FEELINGS / EMOTIONS ---------- */
Feelings:['happy','sad','angry','mad','scared','afraid','worried','nervous','excited','bored','tired','sleepy','hungry','thirsty','sick','hurt','surprised','shocked','confused','curious',
'proud','shy','embarrassed','jealous','lonely','love','glad','cheerful','calm','relaxed','comfortable','uncomfortable','annoyed','frustrated','upset','disappointed','grumpy','cranky',
'brave','confident','friendly','kind','mean','nice','polite','rude','funny','silly','serious','crazy','lazy','busy','free','safe','worried','hopeful','grateful','thankful','amazed','delighted','miserable','anxious','peaceful','joyful','fantastic','terrible','wonderful','awful','great'],

/* ---------- TECHNOLOGY ---------- */
Technology:['computer','laptop','tablet','phone','smartphone','cellphone','keyboard','mouse','monitor','screen','printer','scanner','speaker','headphones','earphones','microphone','webcam','camera','charger','battery',
'internet','wifi','website','email','password','username','app','software','game','video','photo','file','folder','download','upload','click','type','search','browser','robot','drone',
'television','remote','radio','clock','calculator','usb','cable','router','memory','power','button','screenshot','emoji','message','text','call','online','offline','update','virus','network','cloud','signal','gadget','device'],

/* ---------- MUSIC ---------- */
Music:['music','song','singer','band','concert','guitar','piano','keyboard','violin','cello','drums','flute','trumpet','saxophone','trombone','clarinet','harp','ukulele','microphone','speaker','headphones',
'note','melody','rhythm','beat','lyrics','album','radio','pop','rock','jazz','classical','hip hop','rap','country','dance','choir','orchestra','stage','dancer','musician','conductor','tune','volume','loud','quiet','play','sing','listen'],

/* ---------- MOVIES ---------- */
Movies:['movie','film','cinema','theater','ticket','popcorn','screen','actor','actress','director','star','hero','villain','cartoon','comedy','action','horror','drama','romance','adventure','fantasy','science fiction',
'superhero','princess','monster','robot','alien','dinosaur','ghost','pirate','wizard','trailer','scene','character','story','ending','sequel','animation','documentary','remote','streaming','subtitle'],

/* ---------- SHOPPING ---------- */
Shopping:['shop','store','mall','market','supermarket','price','money','cash','coin','bill','card','credit card','wallet','purse','bag','basket','cart','receipt','sale','discount','cheap','expensive','free',
'buy','sell','pay','spend','save','cost','customer','cashier','clerk','change','refund','size','small','medium','large','try on','fitting room','shelf','aisle','checkout','list','clothes','shoes','groceries','gift','bargain','coupon','tax','dollar','cent'],

/* ---------- HEALTH ---------- */
Health:['doctor','nurse','dentist','hospital','clinic','pharmacy','medicine','pill','vitamin','bandage','thermometer','stethoscope','wheelchair','crutches','appointment','checkup',
'sick','ill','healthy','fever','cold','cough','sneeze','headache','stomachache','toothache','sore throat','pain','ache','cut','bruise','burn','broken','allergy','flu','virus','germ','injury',
'rest','sleep','exercise','diet','water','healthy food','doctor','emergency','ambulance','first aid','mask','shot','bandaid','tissue','soap','hand','wash','clean','strong','weak','tired','well','recover'],

/* ---------- TRAVEL ---------- */
Travel:['trip','vacation','holiday','tour','tourist','traveler','passport','ticket','luggage','suitcase','backpack','map','guide','hotel','reservation','flight','airport','airplane','train','bus','taxi','car','ship','cruise',
'beach','mountain','city','country','abroad','souvenir','camera','sightseeing','adventure','journey','destination','border','visa','currency','exchange','check-in','check-out','departure','arrival','gate','platform','station','harbor','tent','camping','landmark','postcard','itinerary'],

/* ---------- KITCHEN ---------- */
Kitchen:['stove','oven','microwave','fridge','refrigerator','freezer','sink','faucet','dishwasher','toaster','blender','mixer','kettle','coffee maker','cutting board','counter','cabinet','drawer',
'plate','bowl','cup','mug','glass','fork','knife','spoon','pot','pan','frying pan','kettle','teapot','jar','bottle','jug','tray','ladle','spatula','whisk','peeler','grater','strainer','colander','rolling pin',
'napkin','apron','towel','sponge','dish soap','trash can','recipe','ingredient','oven mitt','measuring cup','can opener','bottle opener','timer','salt shaker','pepper','cutting knife','wooden spoon'],

/* ---------- BATHROOM ---------- */
Bathroom:['toilet','sink','bathtub','shower','faucet','mirror','towel','washcloth','soap','shampoo','conditioner','toothbrush','toothpaste','floss','comb','brush','razor','shaving cream','deodorant','lotion','perfume',
'toilet paper','tissue','trash can','bath mat','shower curtain','drain','plug','sponge','bucket','scale','hairdryer','cotton','bandage','medicine cabinet','faucet','bubble bath','rubber duck','slippers','robe','nail clipper','cotton swab'],

/* ---------- LIVING ROOM ---------- */
LivingRoom:['sofa','couch','armchair','chair','coffee table','side table','television','tv','remote','bookshelf','shelf','lamp','floor lamp','rug','carpet','curtain','pillow','cushion','blanket','clock','picture','painting','frame',
'fireplace','plant','vase','fan','speaker','radio','game console','magazine','newspaper','photo album','candle','window','ceiling','wall','door','light','switch','ottoman','recliner'],

/* ---------- BEDROOM ---------- */
Bedroom:['bed','pillow','blanket','sheet','mattress','headboard','nightstand','alarm clock','lamp','wardrobe','closet','dresser','drawer','mirror','desk','chair','bookshelf','rug','carpet','curtain','blind',
'teddy bear','toy','poster','picture','photo','diary','slippers','pajamas','hanger','laundry basket','fan','heater','window','door','light','ceiling','wall','floor','shelf'],

/* ---------- OFFICE ---------- */
Office:['desk','chair','computer','laptop','monitor','keyboard','mouse','printer','scanner','phone','telephone','stapler','paper','pen','pencil','marker','folder','file','binder','notebook','notepad','calendar','clock',
'tape','glue','scissors','ruler','eraser','paperclip','envelope','stamp','calculator','whiteboard','board','projector','meeting','report','email','document','coffee','mug','trash can','shelf','cabinet','sticky note','highlighter','clipboard'],

/* ---------- FARM ---------- */
Farm:['cow','horse','pig','sheep','goat','chicken','rooster','duck','goose','turkey','donkey','rabbit','dog','cat','bull','calf','lamb','chick','piglet',
'barn','field','fence','gate','tractor','hay','straw','wheat','corn','crop','farmer','farm','stable','pond','well','scarecrow','wheelbarrow','bucket','shovel','rake','seed','harvest','egg','milk','wool','mud','grass','plow'],

/* ---------- ZOO ---------- */
Zoo:['lion','tiger','elephant','giraffe','zebra','monkey','gorilla','bear','panda','kangaroo','koala','hippo','rhino','leopard','cheetah','camel','crocodile','snake','penguin','ostrich','peacock','flamingo','parrot','owl','eagle',
'zookeeper','cage','fence','ticket','map','animal','wild','feeding','habitat','reptile','mammal','bird','fish','sea lion','seal','turtle','lizard','iguana','meerkat','sloth','otter','wolf','fox','deer'],

/* ---------- CITY ---------- */
City:['building','skyscraper','apartment','house','street','road','avenue','corner','crosswalk','sidewalk','traffic light','stop sign','bridge','tunnel','square','park','fountain','statue','bench',
'store','shop','mall','market','bank','post office','library','museum','hospital','school','hotel','restaurant','cafe','cinema','theater','stadium','church','police station','fire station',
'bus stop','subway','station','taxi','bus','car','parking lot','garage','traffic','crowd','downtown','neighborhood','streetlight','billboard','elevator','escalator','crosswalk','mailbox','trash can','sign'],

/* ---------- BEACH ---------- */
Beach:['sand','sea','ocean','wave','water','shell','starfish','crab','seagull','fish','sun','sky','cloud','beach','shore','coast','tide','rock','island',
'towel','umbrella','sunglasses','sunscreen','swimsuit','flip-flops','bucket','shovel','sandcastle','ball','surfboard','boat','sailboat','lifeguard','swimmer','snorkel','goggles','float','raft','picnic','ice cream','palm tree','hammock','beach chair'],

/* ---------- AIRPORT ---------- */
Airport:['airplane','plane','jet','runway','gate','terminal','ticket','boarding pass','passport','luggage','suitcase','backpack','carry-on','check-in','security','passenger','pilot','flight attendant','crew','captain',
'flight','departure','arrival','delay','takeoff','landing','seat','window seat','aisle','baggage claim','customs','duty free','control tower','map','sign','escalator','elevator','trolley','announcement','boarding','airline','tag'],

/* ---------- HOTEL ---------- */
Hotel:['hotel','room','reception','lobby','key','key card','elevator','stairs','hallway','bed','pillow','blanket','towel','bathroom','shower','minibar','television','remote','air conditioner','phone',
'reservation','check-in','check-out','guest','receptionist','manager','bellboy','maid','housekeeping','room service','breakfast','buffet','pool','gym','spa','restaurant','bar','luggage','suitcase','wifi','sign','floor','balcony','view'],

/* ---------- RESTAURANT ---------- */
Restaurant:['restaurant','table','chair','menu','waiter','waitress','chef','cook','customer','order','bill','check','tip','plate','bowl','cup','glass','fork','knife','spoon','napkin','tray',
'appetizer','starter','main course','dessert','drink','soup','salad','steak','pasta','pizza','burger','fries','rice','chicken','fish','sandwich','coffee','tea','juice','water','wine','soda',
'reservation','kitchen','counter','buffet','takeout','delivery','fast food','breakfast','lunch','dinner','special','recipe','spicy','delicious','tasty'],

/* ---------- CHRISTMAS ---------- */
Christmas:['christmas','santa claus','santa','reindeer','sleigh','elf','snowman','snow','snowflake','tree','christmas tree','star','ornament','light','candle','stocking','gift','present','ribbon','bow',
'bell','holly','wreath','candy cane','gingerbread','cookie','hot chocolate','carol','angel','nativity','chimney','fireplace','mistletoe','north pole','winter','holiday','family','dinner','turkey','garland','tinsel','snowball','icicle','sleigh bells','poinsettia','nutcracker','eggnog','fruitcake','snow globe','carols','manger','frost','sled','cocoa','warm socks'],

/* ---------- HALLOWEEN ---------- */
Halloween:['halloween','pumpkin','jack-o-lantern','ghost','witch','vampire','zombie','skeleton','monster','mummy','werewolf','bat','spider','spider web','black cat','owl','moon','graveyard','tombstone',
'costume','mask','candy','treat','trick','trick or treat','scary','spooky','haunted house','cauldron','broom','magic','potion','cape','fangs','skull','bones','dark','night','creepy','goblin','ogre','cobweb','lantern','candy corn','scarecrow','raven','coffin','curse','spell','wand','broomstick','full moon','howl','creaky','shadow','fright'],

/* ---------- EASTER ---------- */
Easter:['easter','easter egg','egg','easter bunny','bunny','rabbit','chick','chocolate','basket','grass','spring','flower','tulip','daffodil','lamb','carrot','hunt','egg hunt','decoration','ribbon','bow','pastel','paint','hide','candy','family','breakfast','church','sunrise','celebrate','bonnet','marshmallow','jelly bean','duckling','nest','sunshine','egg roll','bunny ears','springtime','resurrection','tradition','joy','dye','hop','field','flowers','holiday']

};

/* ============================================================
   Derivações (evita duplicação): hangman/q20/spelling/chains
   saem do próprio VOCAB, filtrando palavras adequadas a cada jogo.
   ============================================================ */
function onlyLetters(w){ return /^[a-z]+$/.test(w); }
function uniq(arr){ var s={},o=[]; arr.forEach(function(w){ if(!s[w]){s[w]=1;o.push(w);} }); return o; }

/* Hangman: uma palavra só, letras A–Z, 3–11 letras, em MAIÚSCULAS.
   Toda categoria do VOCAB com ≥6 palavras spellables vira categoria de Hangman. */
var HANGMAN={};
Object.keys(VOCAB).forEach(function(cat){
  var words=uniq(VOCAB[cat].filter(function(w){ return onlyLetters(w) && w.length>=3 && w.length<=11; }))
              .map(function(w){ return w.toUpperCase(); });
  if(words.length>=6) HANGMAN[cat]=words;
});

/* 20 Questions: substantivos concretos e adivinháveis (várias categorias). */
var Q20_CATS=['Animals','Food','Home','School','Clothes','Transportation','Sports','Body','Places','Nature','Jobs','Kitchen','Zoo','Beach','City','Technology'];
var Q20=uniq([].concat.apply([], Q20_CATS.map(function(c){ return VOCAB[c]||[]; }))
            .filter(function(w){ return onlyLetters(w) && w.length>=3 && w.length<=12; }));

/* Word Chains: palavras 3–9 letras, boas para encadear. */
var CHAINS=uniq([].concat.apply([], ['Animals','Food','Home','Nature','Places','School','Sports','Body','Jobs','City'].map(function(c){ return VOCAB[c]||[]; }))
             .filter(function(w){ return onlyLetters(w) && w.length>=3 && w.length<=9; }));

/* Spelling Bee: buckets por dificuldade, tirados de TODO o VOCAB. */
var ALLWORDS=uniq([].concat.apply([], Object.keys(VOCAB).map(function(c){ return VOCAB[c]; }))
              .filter(onlyLetters));
var SPELLING={
  Easy:   ALLWORDS.filter(function(w){ return w.length>=3 && w.length<=4; }),
  Medium: ALLWORDS.filter(function(w){ return w.length>=5 && w.length<=6; }),
  Hard:   ALLWORDS.filter(function(w){ return w.length>=7 && w.length<=11; })
};

/* ============================================================
   Bancos próprios (estruturados) — expandidos.
   ============================================================ */
var EMOJI=[
  {e:'🐱',a:['cat']},{e:'🐶',a:['dog']},{e:'🐘',a:['elephant']},{e:'🦁',a:['lion']},{e:'🐯',a:['tiger']},{e:'🐒',a:['monkey']},{e:'🐰',a:['rabbit','bunny']},{e:'🐴',a:['horse']},{e:'🐷',a:['pig']},{e:'🐮',a:['cow']},
  {e:'🐔',a:['chicken']},{e:'🐧',a:['penguin']},{e:'🦉',a:['owl']},{e:'🐢',a:['turtle']},{e:'🐍',a:['snake']},{e:'🐸',a:['frog']},{e:'🐟',a:['fish']},{e:'🐬',a:['dolphin']},{e:'🦈',a:['shark']},{e:'🐝',a:['bee']},{e:'🦋',a:['butterfly']},{e:'🕷️',a:['spider']},
  {e:'🍎',a:['apple']},{e:'🍌',a:['banana']},{e:'🍊',a:['orange']},{e:'🍓',a:['strawberry']},{e:'🍉',a:['watermelon']},{e:'🍇',a:['grapes','grape']},{e:'🍕',a:['pizza']},{e:'🍔',a:['hamburger','burger']},{e:'🌭',a:['hot dog']},{e:'🍟',a:['fries']},
  {e:'🍦',a:['ice cream']},{e:'🎂',a:['cake','birthday']},{e:'🍪',a:['cookie']},{e:'☕',a:['coffee']},{e:'🥛',a:['milk']},{e:'🍞',a:['bread']},{e:'🧀',a:['cheese']},{e:'🥚',a:['egg']},
  {e:'🏠',a:['house','home']},{e:'🛏️',a:['bed']},{e:'🚪',a:['door']},{e:'🪑',a:['chair']},{e:'🚗',a:['car']},{e:'🚌',a:['bus']},{e:'✈️',a:['airplane','plane']},{e:'🚲',a:['bicycle','bike']},{e:'🚂',a:['train']},{e:'🚀',a:['rocket']},{e:'⛵',a:['boat','sailboat']},
  {e:'⚽',a:['soccer','football','ball']},{e:'🏀',a:['basketball']},{e:'🎾',a:['tennis']},{e:'⚾',a:['baseball']},{e:'🏊',a:['swimming']},{e:'🚴',a:['cycling','biking']},
  {e:'☀️',a:['sun','sunny']},{e:'🌧️',a:['rain','rainy']},{e:'⛄',a:['snowman']},{e:'❄️',a:['snow','snowflake']},{e:'🌈',a:['rainbow']},{e:'🌙',a:['moon']},{e:'⭐',a:['star']},{e:'💧',a:['water']},{e:'🔥',a:['fire']},{e:'🌳',a:['tree']},{e:'🌸',a:['flower']},
  {e:'👕',a:['shirt','t-shirt']},{e:'👖',a:['pants','jeans']},{e:'👗',a:['dress']},{e:'👟',a:['shoes','sneakers']},{e:'🧢',a:['hat','cap']},{e:'🧤',a:['gloves']},{e:'🕶️',a:['sunglasses']},{e:'⌚',a:['watch']},
  {e:'📚',a:['book','books']},{e:'✏️',a:['pencil']},{e:'🎒',a:['backpack','bag']},{e:'⏰',a:['clock','alarm']},{e:'📱',a:['phone','smartphone']},{e:'💻',a:['laptop','computer']},{e:'🎵',a:['music','song']},{e:'🎸',a:['guitar']},{e:'🎹',a:['piano']},{e:'📷',a:['camera']},
  {e:'👨‍👩‍👧',a:['family']},{e:'👶',a:['baby']},{e:'👩‍🏫',a:['teacher']},{e:'👨‍⚕️',a:['doctor']},{e:'👮',a:['police officer','police']},{e:'👨‍🚒',a:['firefighter']},{e:'👨‍🍳',a:['cook','chef']},{e:'🧑‍🌾',a:['farmer']},
  {e:'🎃',a:['pumpkin']},{e:'🎅',a:['santa','santa claus']},{e:'🎄',a:['christmas tree','tree']},{e:'🎁',a:['gift','present']},{e:'👻',a:['ghost']},{e:'🍫',a:['chocolate']},{e:'🌍',a:['earth','world']},{e:'🏥',a:['hospital']},{e:'🏫',a:['school']}
];

var ODD=[
  {w:['apple','banana','carrot','orange'],odd:2,reason:'carrot is a vegetable, the others are fruits'},
  {w:['dog','cat','horse','table'],odd:3,reason:'table is not an animal'},
  {w:['red','blue','happy','green'],odd:2,reason:'happy is a feeling, the others are colors'},
  {w:['run','swim','book','dance'],odd:2,reason:'book is not a verb'},
  {w:['mother','father','teacher','sister'],odd:2,reason:'teacher is a job, the others are family'},
  {w:['monday','friday','summer','sunday'],odd:2,reason:'summer is a season, the others are days'},
  {w:['coffee','tea','water','bread'],odd:3,reason:'bread is food, the others are drinks'},
  {w:['car','bus','train','kitchen'],odd:3,reason:'kitchen is not transport'},
  {w:['big','small','tall','chair'],odd:3,reason:'chair is not an adjective'},
  {w:['eye','nose','shoe','mouth'],odd:2,reason:'shoe is not part of the face'},
  {w:['lion','tiger','cow','leopard'],odd:2,reason:'cow is a farm animal, the others are wild cats'},
  {w:['shirt','shoes','banana','hat'],odd:2,reason:'banana is food, the others are clothes'},
  {w:['soccer','tennis','pizza','golf'],odd:2,reason:'pizza is food, the others are sports'},
  {w:['doctor','nurse','apple','dentist'],odd:2,reason:'apple is food, the others are jobs'},
  {w:['january','march','monday','july'],odd:2,reason:'monday is a day, the others are months'},
  {w:['spider','ant','bee','snake'],odd:3,reason:'snake is a reptile, the others are insects'},
  {w:['spoon','fork','knife','pillow'],odd:3,reason:'pillow is not cutlery'},
  {w:['guitar','piano','drums','soccer'],odd:3,reason:'soccer is a sport, the others are instruments'},
  {w:['dog','fish','cat','rabbit'],odd:1,reason:'fish lives in water, the others are furry pets'},
  {w:['rain','snow','sun','table'],odd:3,reason:'table is furniture, the others are weather'},
  {w:['red','green','dog','yellow'],odd:2,reason:'dog is an animal, the others are colors'},
  {w:['sofa','bed','chair','banana'],odd:3,reason:'banana is food, the others are furniture'},
  {w:['bus','car','bike','shoe'],odd:3,reason:'shoe is not transport'},
  {w:['happy','sad','angry','apple'],odd:3,reason:'apple is food, the others are feelings'},
  {w:['brazil','france','pizza','japan'],odd:2,reason:'pizza is food, the others are countries'}
];

var SORT=[
  {title:'Fruits or Vegetables?',a:'Fruit',b:'Vegetable',items:[['apple','Fruit'],['carrot','Vegetable'],['banana','Fruit'],['potato','Vegetable'],['orange','Fruit'],['onion','Vegetable']]},
  {title:'Past or Present?',a:'Past',b:'Present',items:[['went','Past'],['go','Present'],['ate','Past'],['eat','Present'],['saw','Past'],['see','Present']]},
  {title:'Countable or Uncountable?',a:'Countable',b:'Uncountable',items:[['apple','Countable'],['water','Uncountable'],['book','Countable'],['rice','Uncountable'],['car','Countable'],['milk','Uncountable']]},
  {title:'Drink or Food?',a:'Drink',b:'Food',items:[['coffee','Drink'],['bread','Food'],['juice','Drink'],['cheese','Food'],['tea','Drink'],['rice','Food']]},
  {title:'Animal or Object?',a:'Animal',b:'Object',items:[['dog','Animal'],['chair','Object'],['cat','Animal'],['table','Object'],['horse','Animal'],['lamp','Object']]},
  {title:'Hot or Cold?',a:'Hot',b:'Cold',items:[['sun','Hot'],['snow','Cold'],['fire','Hot'],['ice','Cold'],['summer','Hot'],['winter','Cold']]},
  {title:'Big or Small?',a:'Big',b:'Small',items:[['elephant','Big'],['ant','Small'],['whale','Big'],['mouse','Small'],['bus','Big'],['coin','Small']]},
  {title:'Indoor or Outdoor?',a:'Indoor',b:'Outdoor',items:[['bed','Indoor'],['tree','Outdoor'],['sofa','Indoor'],['beach','Outdoor'],['tv','Indoor'],['mountain','Outdoor']]},
  {title:'Day or Night?',a:'Day',b:'Night',items:[['sun','Day'],['moon','Night'],['breakfast','Day'],['stars','Night'],['morning','Day'],['sleep','Night']]},
  {title:'Job or Place?',a:'Job',b:'Place',items:[['doctor','Job'],['hospital','Place'],['teacher','Job'],['school','Place'],['chef','Job'],['restaurant','Place']]},
  {title:'Clothes or Food?',a:'Clothes',b:'Food',items:[['shirt','Clothes'],['pizza','Food'],['hat','Clothes'],['apple','Food'],['shoes','Clothes'],['bread','Food']]},
  {title:'Land or Water?',a:'Land',b:'Water',items:[['lion','Land'],['fish','Water'],['horse','Land'],['dolphin','Water'],['dog','Land'],['shark','Water']]}
];

/* Categorias do jogo "Categories (Stop)" — ampliadas */
var STOP=['name','animal','food','drink','country','city','color','object','verb','adjective','job','sport','clothes','body part','fruit','vegetable','place'];

/* ============================================================
   SORTEIO — "saco embaralhado" por chave.
   Nunca repete até esgotar; ao esgotar, reembaralha sem repetir
   a última do ciclo anterior. Dá sensação de banco infinito.
   ============================================================ */
var bags={};
function shuffleIdx(n){ var a=[],i,j,t; for(i=0;i<n;i++)a.push(i); for(i=n-1;i>0;i--){ j=Math.floor(Math.random()*(i+1)); t=a[i];a[i]=a[j];a[j]=t; } return a; }
function next(key, arr){
  if(!arr||!arr.length) return null;
  if(arr.length===1) return arr[0];
  var b=bags[key];
  if(!b || b.n!==arr.length || b.i>=b.order.length){
    var order=shuffleIdx(arr.length);
    if(b && order[0]===b.last){ var s=1+Math.floor(Math.random()*(order.length-1)); var t=order[0];order[0]=order[s];order[s]=t; }
    b={order:order,i:0,n:arr.length,last:(b?b.last:-1)};
    bags[key]=b;
  }
  var idx=b.order[b.i++];
  b.last=idx;
  return arr[idx];
}
function resetBag(key){ delete bags[key]; }

/* ============================================================
   API pública
   ============================================================ */
window.GAMES_CONTENT={
  vocab:VOCAB,
  hangman:HANGMAN,
  q20:Q20,
  spelling:SPELLING,
  chains:CHAINS,
  emoji:EMOJI,
  odd:ODD,
  sort:SORT,
  stop:STOP,
  next:next,
  resetBag:resetBag,
  /* utilitário de contagem (usado na validação) */
  counts:function(){
    var c={vocab:{},derived:{}};
    Object.keys(VOCAB).forEach(function(k){ c.vocab[k]=VOCAB[k].length; });
    c.derived={hangmanCategories:Object.keys(HANGMAN).length, q20:Q20.length, chains:CHAINS.length,
      spellingEasy:SPELLING.Easy.length, spellingMedium:SPELLING.Medium.length, spellingHard:SPELLING.Hard.length,
      emoji:EMOJI.length, odd:ODD.length, sort:SORT.length, totalWords:ALLWORDS.length};
    return c;
  }
};
})();
