const fs = require("fs/promises");
const path = require("path");

const baseCategories = {
  Gender: [
    { label: "Boy", value: "1boy" },
    { label: "Girl", value: "1girl" },
    { label: "Non-binary", value: "1person" },
  ],
  Age: [
    { label: "Young teen", value: "teen" },
    { label: "Late teen", value: "late teen" },
    { label: "Young adult", value: "young adult" },
    { label: "Experienced adult", value: "adult" },
    { label: "Veteran", value: "veteran" },
  ],
  Body: [
    { label: "Slender", value: "slender" },
    { label: "Athletic", value: "athletic" },
    { label: "Muscular", value: "muscular" },
    { label: "Tall", value: "tall" },
    { label: "Petite", value: "petite" },
  ],
  Hair: [
    { label: "Short black hair", value: "short black hair" },
    { label: "Long brown hair", value: "long brown hair" },
    { label: "Blonde hair", value: "blonde hair" },
    { label: "Red hair", value: "red hair" },
    { label: "Silver hair", value: "silver hair" },
    { label: "Blue hair", value: "blue hair" },
  ],
  Eyes: [
    { label: "Brown eyes", value: "brown eyes" },
    { label: "Blue eyes", value: "blue eyes" },
    { label: "Green eyes", value: "green eyes" },
    { label: "Amber eyes", value: "amber eyes" },
    { label: "Gray eyes", value: "gray eyes" },
  ],
  Face: [
    { label: "Determined expression", value: "determined expression" },
    { label: "Smiling", value: "smiling expression" },
    { label: "Serious look", value: "serious expression" },
    { label: "Stoic face", value: "stoic expression" },
    { label: "Playful grin", value: "playful grin" },
  ],
  Skin: [
    { label: "Fair skin", value: "fair skin" },
    { label: "Warm tan skin", value: "tan skin" },
    { label: "Olive skin", value: "olive skin" },
    { label: "Deep brown skin", value: "deep brown skin" },
    { label: "Freckled skin", value: "freckled skin" },
  ],
  Top: [
    { label: "Utility jacket", value: "utility jacket" },
    { label: "Layered coat", value: "layered coat" },
    { label: "Casual tunic", value: "casual tunic" },
    { label: "Armored vest", value: "armored vest" },
    { label: "Loose shirt", value: "loose shirt" },
  ],
  Bottom: [
    { label: "Cargo trousers", value: "cargo trousers" },
    { label: "Fitted pants", value: "fitted pants" },
    { label: "Pleated skirt", value: "pleated skirt" },
    { label: "Battle-ready shorts", value: "battle shorts" },
    { label: "Flowing robes", value: "flowing robes" },
  ],
  Set: [
    { label: "Combat uniform", value: "combat uniform" },
    { label: "Casual traveler", value: "casual traveler outfit" },
    { label: "Formal attire", value: "formal attire" },
    { label: "Stealth gear", value: "stealth gear" },
    { label: "Festival outfit", value: "festival outfit" },
  ],
  Material: [
    { label: "Woven fabric", value: "woven fabric" },
    { label: "Polished leather", value: "polished leather" },
    { label: "Reinforced armor", value: "reinforced armor" },
    { label: "High-tech fiber", value: "high-tech fiber" },
    { label: "Organic weave", value: "organic weave" },
  ],
  Accessory: [
    { label: "Utility belt", value: "utility belt" },
    { label: "Gloves", value: "gloves" },
    { label: "Scarf", value: "scarf" },
    { label: "Headgear", value: "headgear" },
    { label: "Jewelry", value: "jewelry" },
  ],
};

function cloneBase() {
  const clone = {};
  for (const [key, value] of Object.entries(baseCategories)) {
    clone[key] = value.map((item) => ({ ...item }));
  }
  return clone;
}

function createOptions(overrides = {}, extra = []) {
  const categories = cloneBase();
  for (const [key, value] of Object.entries(overrides)) {
    categories[key] = value;
  }
  if (extra.length) {
    categories.extra = extra;
  }
  return categories;
}

const dataset = {
  "aot-oc-maker": createOptions({
    Age: [
      { label: "Training Corps cadet", value: "cadet teen" },
      { label: "Frontline scout (late teen)", value: "frontline late teen" },
      { label: "Survey veteran", value: "survey veteran" },
      { label: "Garrison officer", value: "garrison adult" },
      { label: "Seasoned commander", value: "seasoned commander" },
    ],
    Body: [
      { label: "Lean courier build", value: "lean build" },
      { label: "ODM agile frame", value: "agile frame" },
      { label: "Armored titan-slayer", value: "armored muscular" },
      { label: "Tall watchtower scout", value: "tall scout" },
      { label: "Compact artillery gunner", value: "compact gunner" },
    ],
    Hair: [
      { label: "Short undercut", value: "short undercut hair" },
      { label: "Shoulder-length auburn", value: "shoulder auburn hair" },
      { label: "Tied black ponytail", value: "tied black ponytail" },
      { label: "Wind-blown blonde", value: "windblown blonde hair" },
      { label: "Shaved sides with fringe", value: "shaved sides fringe" },
    ],
    Eyes: [
      { label: "Steel gray gaze", value: "steel gray eyes" },
      { label: "Sharp green eyes", value: "sharp green eyes" },
      { label: "Amber determination", value: "amber determined eyes" },
      { label: "Ice blue focus", value: "ice blue eyes" },
      { label: "Hazel warmth", value: "hazel eyes" },
    ],
    Face: [
      { label: "Battle-hardened stare", value: "battle hardened face" },
      { label: "Scarred resolve", value: "scarred stoic face" },
      { label: "Determined glare", value: "determined glare" },
      { label: "Soft yet wary", value: "soft wary expression" },
      { label: "Reckless grin", value: "reckless grin" },
    ],
    Skin: [
      { label: "Fair with ODM windburn", value: "fair windburned skin" },
      { label: "Sun-kissed garrison", value: "sun kissed skin" },
      { label: "Scar-laced veteran", value: "scar laced skin" },
      { label: "Olive trost survivor", value: "olive survivor skin" },
      { label: "Freckled cadet", value: "freckled cadet skin" },
    ],
    Top: [
      { label: "Survey Corps jacket", value: "survey corps jacket" },
      { label: "Garrison cloak", value: "garrison cloak" },
      { label: "Military Police blazer", value: "military police blazer" },
      { label: "Yeagerist armband vest", value: "yeagerist vest" },
      { label: "Underground medic coat", value: "underground medic coat" },
    ],
    Bottom: [
      { label: "ODM harness trousers", value: "odm harness trousers" },
      { label: "Mounted patrol pants", value: "mounted patrol pants" },
      { label: "Reinforced leather pants", value: "reinforced leather pants" },
      { label: "Scout skirt with belts", value: "scout skirt belts" },
      { label: "Civilian refugee layers", value: "civilian layered bottoms" },
    ],
    Set: [
      { label: "Full Survey Corps gear", value: "survey corps full gear" },
      { label: "Wall repair engineer", value: "wall repair engineer set" },
      { label: "Marley infiltration disguise", value: "marley disguise set" },
      { label: "Underground informant", value: "underground informant outfit" },
      { label: "Garrison artillery uniform", value: "garrison artillery uniform" },
    ],
    Material: [
      { label: "Weathered leather", value: "weathered leather" },
      { label: "Cured cloak wool", value: "cloak wool" },
      { label: "ODM steel plating", value: "odm steel plating" },
      { label: "Marley linen", value: "marley linen" },
      { label: "Underground patchwork", value: "underground patchwork" },
    ],
    Accessory: [
      { label: "Wings of Freedom cloak", value: "wings of freedom cloak" },
      { label: "ODM blade set", value: "odm blades" },
      { label: "Signal flare pistol", value: "signal flare pistol" },
      { label: "Yeagerist armband", value: "yeagerist armband" },
      { label: "Medical satchel", value: "medical satchel" },
    ],
  }),
  "apothecary-diaries-oc-maker": createOptions({
    Age: [
      { label: "Young palace maid", value: "young palace maid" },
      { label: "Market apothecary", value: "market apothecary adult" },
      { label: "Seasoned court physician", value: "seasoned court physician" },
      { label: "Retired noble healer", value: "retired healer" },
      { label: "Traveling elder herbalist", value: "elder herbalist" },
    ],
    Top: [
      { label: "Inner palace hanfu", value: "inner palace hanfu" },
      { label: "Embroidered scholar robe", value: "embroidered scholar robe" },
      { label: "Aproned apothecary vest", value: "apothecary vest" },
      { label: "Traveling tea coat", value: "traveling tea coat" },
      { label: "Court intrigue cloak", value: "court intrigue cloak" },
    ],
    Bottom: [
      { label: "Silk pleated skirt", value: "silk pleated skirt" },
      { label: "Layered healer pants", value: "layered healer pants" },
      { label: "Market street trousers", value: "market street trousers" },
      { label: "Elegant palace train", value: "palace train" },
      { label: "Sturdy traveler leggings", value: "sturdy traveler leggings" },
    ],
    Set: [
      { label: "Inner Palace attendant", value: "inner palace attendant set" },
      { label: "Pleasure district healer", value: "pleasure district healer set" },
      { label: "Imperial physician formal", value: "imperial physician formal set" },
      { label: "Tea caravan wanderer", value: "tea caravan wanderer outfit" },
      { label: "Discreet poison investigator", value: "poison investigator disguise" },
    ],
    Material: [
      { label: "Dyed palace silk", value: "dyed palace silk" },
      { label: "Embroidered brocade", value: "embroidered brocade" },
      { label: "Lacquered bamboo", value: "lacquered bamboo" },
      { label: "Weathered cotton", value: "weathered cotton" },
      { label: "Perfumed muslin", value: "perfumed muslin" },
    ],
    Accessory: [
      { label: "Medicine satchel", value: "medicine satchel" },
      { label: "Porcelain hairpin", value: "porcelain hairpin" },
      { label: "Tea ceremony fan", value: "tea ceremony fan" },
      { label: "Herbal mortar necklace", value: "herbal mortar necklace" },
      { label: "Imperial seal bracelet", value: "imperial seal bracelet" },
    ],
  }),
  "arknights-oc-maker": createOptions({
    Age: [
      { label: "Rookie operator", value: "rookie operator" },
      { label: "Field medic (20s)", value: "field medic adult" },
      { label: "Rhodes veteran", value: "rhodes veteran" },
      { label: "Laterano executor", value: "laterano executor" },
      { label: "Old guard pioneer", value: "old guard pioneer" },
    ],
    Top: [
      { label: "Rhodes Island jacket", value: "rhodes island jacket" },
      { label: "Reunion defector coat", value: "reunion defector coat" },
      { label: "Kazimierz armor cape", value: "kazimierz armor cape" },
      { label: "Laterano cleric vestments", value: "laterano cleric vestments" },
      { label: "Ursus survival parka", value: "ursus survival parka" },
    ],
    Bottom: [
      { label: "Tactical operator pants", value: "tactical operator pants" },
      { label: "Armored leggings", value: "armored leggings" },
      { label: "City-running shorts", value: "city runner shorts" },
      { label: "Ceremonial long skirt", value: "ceremonial long skirt" },
      { label: "Cold weather trousers", value: "cold weather trousers" },
    ],
    Set: [
      { label: "Rhodes Island field kit", value: "rhodes island field kit" },
      { label: "Reunion repentant", value: "reunion repentant set" },
      { label: "Kazimierz tourney armor", value: "kazimierz tourney armor" },
      { label: "Sankta executor regalia", value: "sankta executor regalia" },
      { label: "Ursus evac guardian", value: "ursus evac guardian set" },
    ],
    Material: [
      { label: "Originium composite", value: "originium composite" },
      { label: "Radiation-shield mesh", value: "radiation shield mesh" },
      { label: "Military synth-leather", value: "military synth leather" },
      { label: "Nomadic furs", value: "nomadic furs" },
      { label: "Laterano silksteel", value: "laterano silksteel" },
    ],
    Accessory: [
      { label: "Operator ID badge", value: "operator id badge" },
      { label: "Strategic headset", value: "strategic headset" },
      { label: "Kazimierz lance", value: "kazimierz lance" },
      { label: "Executor tome", value: "executor tome" },
      { label: "Ursus survival pack", value: "ursus survival pack" },
    ],
    extra: [
      {
        title: "Originum Status",
        key: "originium_status",
        unique: true,
        data: [
          { label: "Non-infected", value: "non infected" },
          { label: "Stage I infected", value: "stage i infected" },
          { label: "Stabilized infected", value: "stabilized infected" },
          { label: "Outbreak survivor", value: "outbreak survivor" },
          { label: "Dormant carrier", value: "dormant carrier" },
        ],
      },
      {
        title: "Operator Class",
        key: "operator_class",
        data: [
          { label: "Vanguard", value: "vanguard" },
          { label: "Guard", value: "guard" },
          { label: "Sniper", value: "sniper" },
          { label: "Caster", value: "caster" },
          { label: "Defender", value: "defender" },
          { label: "Medic", value: "medic" },
        ],
      },
    ],
  }),
  "black-butler-oc-maker": createOptions({
    Age: [
      { label: "Young footman", value: "young footman" },
      { label: "Society debutante", value: "society debutante" },
      { label: "Seasoned butler", value: "seasoned butler" },
      { label: "Grim Reaper veteran", value: "grim reaper veteran" },
      { label: "Immortal demon", value: "immortal demon" },
    ],
    Top: [
      { label: "Victorian tailcoat", value: "victorian tailcoat" },
      { label: "Phantomhive livery", value: "phantomhive livery" },
      { label: "Circus performer blouse", value: "circus performer blouse" },
      { label: "High-society gown", value: "high society gown" },
      { label: "Undertaker shroud", value: "undertaker shroud" },
    ],
    Bottom: [
      { label: "Pressed trousers", value: "pressed trousers" },
      { label: "Layered bustle skirt", value: "layered bustle skirt" },
      { label: "Circus striped pants", value: "circus striped pants" },
      { label: "Servant apron layers", value: "servant apron layers" },
      { label: "Shadowed cloak hem", value: "shadowed cloak hem" },
    ],
    Set: [
      { label: "Queen's Watchdog attire", value: "queens watchdog attire" },
      { label: "Noah's Ark Circus", value: "noahs ark circus outfit" },
      { label: "Reaper dispatch uniform", value: "reaper dispatch uniform" },
      { label: "London high-society ball", value: "london high society ball outfit" },
      { label: "Demon butler regalia", value: "demon butler regalia" },
    ],
    Material: [
      { label: "Velvet", value: "velvet" },
      { label: "Fine wool", value: "fine wool" },
      { label: "Lace and satin", value: "lace satin" },
      { label: "Polished leather", value: "polished leather" },
      { label: "Shadow silk", value: "shadow silk" },
    ],
    Accessory: [
      { label: "Silver pocket watch", value: "silver pocket watch" },
      { label: "Demon contract ring", value: "demon contract ring" },
      { label: "Reaper glasses", value: "reaper glasses" },
      { label: "Royal seal cane", value: "royal seal cane" },
      { label: "Feathered top hat", value: "feathered top hat" },
    ],
    extra: [
      {
        title: "Alignment",
        key: "alignment",
        data: [
          { label: "Human", value: "human" },
          { label: "Demon", value: "demon" },
          { label: "Shinigami", value: "shinigami" },
          { label: "Werewolf", value: "werewolf" },
          { label: "Contract-bound", value: "contract bound" },
        ],
      },
    ],
  }),
  "bleach-oc-maker": createOptions({
    Age: [
      { label: "Young academy student", value: "young academy student" },
      { label: "Seated officer", value: "seated officer" },
      { label: "Veteran soul reaper", value: "veteran soul reaper" },
      { label: "Arrancar adjuchas", value: "arrancar adjuchas" },
      { label: "Ancient Quincy", value: "ancient quincy" },
    ],
    Top: [
      { label: "Gotei 13 shihakusho", value: "gotei 13 shihakusho" },
      { label: "Visored hoodie", value: "visored hoodie" },
      { label: "Arrancar jacket", value: "arrancar jacket" },
      { label: "Quincy mantle", value: "quincy mantle" },
      { label: "Fullbringer streetwear", value: "fullbringer streetwear" },
    ],
    Bottom: [
      { label: "Shinigami hakama", value: "shinigami hakama" },
      { label: "White arrancar trousers", value: "white arrancar trousers" },
      { label: "Quincy formal pants", value: "quincy formal pants" },
      { label: "Human casual jeans", value: "human casual jeans" },
      { label: "Royal guard robes", value: "royal guard robes" },
    ],
    Set: [
      { label: "Squad division uniform", value: "squad division uniform" },
      { label: "Visored street fighter", value: "visored street fighter" },
      { label: "Arrancar fracción", value: "arrancar fraccion set" },
      { label: "Quincy wandenreich", value: "quincy wandenreich set" },
      { label: "Human fullbringer", value: "human fullbringer set" },
    ],
    Material: [
      { label: "Reishi weave", value: "reishi weave" },
      { label: "Soul-silk", value: "soul silk" },
      { label: "Hierro plating", value: "hierro plating" },
      { label: "Reiatsu mesh", value: "reiatsu mesh" },
      { label: "Kido seals", value: "kido seals" },
    ],
    Accessory: [
      { label: "Division haori", value: "division haori" },
      { label: "Sealed zanpakuto", value: "sealed zanpakuto" },
      { label: "Visored mask", value: "visored mask" },
      { label: "Quincy cross", value: "quincy cross" },
      { label: "Fullbring emblem", value: "fullbring emblem" },
    ],
    extra: [
      {
        title: "Affiliation",
        key: "affiliation",
        data: [
          { label: "Gotei 13", value: "gotei 13" },
          { label: "Visored", value: "visored" },
          { label: "Arrancar", value: "arrancar" },
          { label: "Quincy", value: "quincy" },
          { label: "Human fullbringer", value: "human fullbringer" },
        ],
      },
    ],
  }),
  "blue-archive-oc-maker": createOptions({
    Age: [
      { label: "First-year student", value: "first year student" },
      { label: "Second-year strategist", value: "second year strategist" },
      { label: "Third-year senior", value: "third year senior" },
      { label: "Transfer sensei ally", value: "transfer sensei ally" },
      { label: "Graduated alum", value: "graduated alum" },
    ],
    Top: [
      { label: "Trinity blazer", value: "trinity blazer" },
      { label: "Gehenna bomber jacket", value: "gehenna bomber jacket" },
      { label: "Millennium tech coat", value: "millennium tech coat" },
      { label: "Abydos desert parka", value: "abydos desert parka" },
      { label: "SRT tactical hoodie", value: "srt tactical hoodie" },
    ],
    Bottom: [
      { label: "Pleated academy skirt", value: "academy pleated skirt" },
      { label: "Combat tights", value: "combat tights" },
      { label: "Utility shorts", value: "utility shorts" },
      { label: "Desert leggings", value: "desert leggings" },
      { label: "Tech cargo pants", value: "tech cargo pants" },
    ],
    Set: [
      { label: "Justice Committee uniform", value: "justice committee uniform" },
      { label: "Problem Solver 68 gear", value: "problem solver gear" },
      { label: "Millennium lab attire", value: "millennium lab attire" },
      { label: "Abydos survival kit", value: "abydos survival kit" },
      { label: "SRT strike team", value: "srt strike team set" },
    ],
    Material: [
      { label: "School issue fabric", value: "school fabric" },
      { label: "Fireproof weave", value: "fireproof weave" },
      { label: "Kevlar padding", value: "kevlar padding" },
      { label: "Smart fiber", value: "smart fiber" },
      { label: "Desert mesh", value: "desert mesh" },
    ],
    Accessory: [
      { label: "Student council armband", value: "student council armband" },
      { label: "Academy ID lanyard", value: "academy id lanyard" },
      { label: "Sensei headset", value: "sensei headset" },
      { label: "Holosight visor", value: "holosight visor" },
      { label: "Club insignia charm", value: "club insignia charm" },
    ],
    extra: [
      {
        title: "Academy",
        key: "academy",
        data: [
          { label: "Trinity", value: "trinity" },
          { label: "Gehenna", value: "gehenna" },
          { label: "Millennium", value: "millennium" },
          { label: "Abydos", value: "abydos" },
          { label: "SRT", value: "srt" },
          { label: "Arius", value: "arius" },
        ],
      },
    ],
  }),
  "blue-lock-oc-maker": createOptions({
    Age: [
      { label: "U-18 striker", value: "u18 striker" },
      { label: "Neo Egoist trainee", value: "neo egoist trainee" },
      { label: "International rookie", value: "international rookie" },
      { label: "Pro league forward", value: "pro league forward" },
      { label: "Veteran ace", value: "veteran ace" },
    ],
    Top: [
      { label: "Blue Lock jersey", value: "blue lock jersey" },
      { label: "Training bib", value: "training bib" },
      { label: "Neo Egoist kit", value: "neo egoist kit" },
      { label: "International club uniform", value: "international club uniform" },
      { label: "Street practice tee", value: "street practice tee" },
    ],
    Bottom: [
      { label: "Compression shorts", value: "compression shorts" },
      { label: "Match shorts", value: "match shorts" },
      { label: "Track pants", value: "track pants" },
      { label: "Street joggers", value: "street joggers" },
      { label: "Warm-up sweats", value: "warm up sweats" },
    ],
    Set: [
      { label: "Blue Lock standard", value: "blue lock standard set" },
      { label: "Team Z nostalgia", value: "team z nostalgia set" },
      { label: "Noel Noa pro kit", value: "noel noa pro kit" },
      { label: "World Cup challenger", value: "world cup challenger set" },
      { label: "Street futsal", value: "street futsal gear" },
    ],
    Material: [
      { label: "Sweat-wicking mesh", value: "sweat wicking mesh" },
      { label: "Lightweight jersey", value: "lightweight jersey" },
      { label: "Compression weave", value: "compression weave" },
      { label: "Thermal training fabric", value: "thermal training fabric" },
      { label: "Rain-ready nylon", value: "rain ready nylon" },
    ],
    Accessory: [
      { label: "Performance cleats", value: "performance cleats" },
      { label: "Captain armband", value: "captain armband" },
      { label: "Kinesio tape", value: "kinesio tape" },
      { label: "Goal tracker wristband", value: "goal tracker wristband" },
      { label: "Headband", value: "headband" },
    ],
    extra: [
      {
        title: "Position",
        key: "position",
        data: [
          { label: "Striker", value: "striker" },
          { label: "Second striker", value: "second striker" },
          { label: "Winger", value: "winger" },
          { label: "Playmaker", value: "playmaker" },
          { label: "Libero", value: "libero" },
        ],
      },
    ],
  }),
  "bungo-stray-dogs-oc-maker": createOptions({
    Age: [
      { label: "Teen ability user", value: "teen ability user" },
      { label: "Young detective", value: "young detective" },
      { label: "Mafia officer", value: "mafia officer" },
      { label: "Armed detective veteran", value: "armed detective veteran" },
      { label: "Mystery novelist elder", value: "novelist elder" },
    ],
    Top: [
      { label: "Armed Detective trench", value: "armed detective trench" },
      { label: "Port Mafia coat", value: "port mafia coat" },
      { label: "Casual ability jacket", value: "casual ability jacket" },
      { label: "Guild suit", value: "guild suit" },
      { label: "Decay of Angel robes", value: "decay of angel robes" },
    ],
    Bottom: [
      { label: "Tailored slacks", value: "tailored slacks" },
      { label: "Suspenders trousers", value: "suspenders trousers" },
      { label: "High-waist skirt", value: "high waist skirt" },
      { label: "Street jeans", value: "street jeans" },
      { label: "Battle-ready pants", value: "battle ready pants" },
    ],
    Set: [
      { label: "Armed Detective Agency", value: "armed detective set" },
      { label: "Port Mafia enforcer", value: "port mafia enforcer set" },
      { label: "Special Division inspector", value: "special division inspector set" },
      { label: "Guild envoy", value: "guild envoy set" },
      { label: "Decay of Angel conspirator", value: "decay of angel conspirator" },
    ],
    Material: [
      { label: "Wool trench fabric", value: "wool trench fabric" },
      { label: "Leather holster straps", value: "leather holster straps" },
      { label: "Silk-lined coat", value: "silk lined coat" },
      { label: "Urban canvas", value: "urban canvas" },
      { label: "Shadow weave", value: "shadow weave" },
    ],
    Accessory: [
      { label: "Ability gloves", value: "ability gloves" },
      { label: "Mafia tattoo", value: "mafia tattoo" },
      { label: "Detective notebook", value: "detective notebook" },
      { label: "Ability suppressor cuffs", value: "ability suppressor cuffs" },
      { label: "Guild crest pin", value: "guild crest pin" },
    ],
    extra: [
      {
        title: "Affiliation",
        key: "bsd_affiliation",
        data: [
          { label: "Armed Detective Agency", value: "armed detective agency" },
          { label: "Port Mafia", value: "port mafia" },
          { label: "Special Division", value: "special division" },
          { label: "The Guild", value: "the guild" },
          { label: "Decay of Angel", value: "decay of angel" },
        ],
      },
    ],
  }),
  "case-closed-oc-maker": createOptions({
    Age: [
      { label: "Elementary detective", value: "elementary detective" },
      { label: "Junior high sleuth", value: "junior high sleuth" },
      { label: "High school detective", value: "high school detective" },
      { label: "Young inspector", value: "young inspector" },
      { label: "Seasoned investigator", value: "seasoned investigator" },
    ],
    Top: [
      { label: "School uniform blazer", value: "school uniform blazer" },
      { label: "Detective trench coat", value: "detective trench coat" },
      { label: "Casual sweater vest", value: "casual sweater vest" },
      { label: "Police windbreaker", value: "police windbreaker" },
      { label: "Disguise hoodie", value: "disguise hoodie" },
    ],
    Bottom: [
      { label: "Tailored slacks", value: "tailored slacks" },
      { label: "Pleated skirt", value: "pleated detective skirt" },
      { label: "Casual jeans", value: "casual jeans" },
      { label: "Detective shorts", value: "detective shorts" },
      { label: "Formal trousers", value: "formal trousers" },
    ],
    Set: [
      { label: "Detective Boys explorer", value: "detective boys explorer set" },
      { label: "Osaka junior detective", value: "osaka detective set" },
      { label: "Metropolitan police", value: "metropolitan police set" },
      { label: "Private detective office", value: "private detective office set" },
      { label: "Undercover disguise", value: "undercover disguise set" },
    ],
    Material: [
      { label: "Comfort cotton", value: "comfort cotton" },
      { label: "Waterproof nylon", value: "waterproof nylon" },
      { label: "Leather holster", value: "leather holster" },
      { label: "Plaid wool", value: "plaid wool" },
      { label: "Flashproof lining", value: "flashproof lining" },
    ],
    Accessory: [
      { label: "Voice-changing bowtie", value: "voice changing bowtie" },
      { label: "Detective badge", value: "detective badge" },
      { label: "Watch stun gadget", value: "watch stun gadget" },
      { label: "Magnifying lens", value: "magnifying lens" },
      { label: "Disguise glasses", value: "disguise glasses" },
    ],
  }),
  "chainsaw-man-oc-maker": createOptions({
    Age: [
      { label: "Public Safety recruit", value: "public safety recruit" },
      { label: "Devil hunter rookie", value: "devil hunter rookie" },
      { label: "Division veteran", value: "division veteran" },
      { label: "International assassin", value: "international assassin" },
      { label: "Demon hybrid timeless", value: "demon hybrid timeless" },
    ],
    Body: [
      { label: "Lean hunter", value: "lean hunter build" },
      { label: "Scarred enforcer", value: "scarred enforcer build" },
      { label: "Hybrid physique", value: "hybrid physique" },
      { label: "Athletic rogue", value: "athletic rogue build" },
      { label: "Augmented body", value: "augmented body" },
    ],
    Top: [
      { label: "Public Safety shirt", value: "public safety shirt" },
      { label: "Leather devil hunter jacket", value: "leather devil hunter jacket" },
      { label: "Casual street tee", value: "casual street tee" },
      { label: "International assassin suit", value: "international assassin suit" },
      { label: "Chainsaw hybrid harness", value: "chainsaw hybrid harness" },
    ],
    Bottom: [
      { label: "Bloodstained slacks", value: "bloodstained slacks" },
      { label: "Combat cargo pants", value: "combat cargo pants" },
      { label: "Ripped jeans", value: "ripped jeans" },
      { label: "Hybrid armor greaves", value: "hybrid armor greaves" },
      { label: "Formal assassin trousers", value: "formal assassin trousers" },
    ],
    Set: [
      { label: "Public Safety uniform", value: "public safety uniform" },
      { label: "Private devil hunter", value: "private devil hunter set" },
      { label: "Special Division 4", value: "special division 4 set" },
      { label: "International assassin", value: "international assassin set" },
      { label: "Chainsaw hybrid rampage", value: "chainsaw hybrid rampage" },
    ],
    Material: [
      { label: "Bloodproof fabric", value: "bloodproof fabric" },
      { label: "Devil skin leather", value: "devil skin leather" },
      { label: "Kevlar weave", value: "kevlar weave" },
      { label: "Chainsaw plating", value: "chainsaw plating" },
      { label: "Sunrise suit cloth", value: "sunrise suit cloth" },
    ],
    Accessory: [
      { label: "Chainsaw pull cord", value: "chainsaw pull cord" },
      { label: "Devil contract charm", value: "devil contract charm" },
      { label: "Blood bag satchel", value: "blood bag satchel" },
      { label: "Hybrid jaw muzzle", value: "hybrid jaw muzzle" },
      { label: "Public Safety badge", value: "public safety badge" },
    ],
    extra: [
      {
        title: "Alignment",
        key: "csm_alignment",
        data: [
          { label: "Public Safety", value: "public safety" },
          { label: "Private hunter", value: "private hunter" },
          { label: "Devil", value: "devil" },
          { label: "Hybrid", value: "hybrid" },
          { label: "International assassin", value: "international assassin" },
        ],
      },
    ],
  }),
  "demon-slayer-oc-maker": createOptions({
    Age: [
      { label: "Trainee slayer", value: "trainee slayer" },
      { label: "Active corps member", value: "active corps member" },
      { label: "Hashira level", value: "hashira level" },
      { label: "Demon youth", value: "demon youth" },
      { label: "Ancient demon", value: "ancient demon" },
    ],
    Body: [
      { label: "Agile swordsman", value: "agile swordsman build" },
      { label: "Demon enhanced", value: "demon enhanced build" },
      { label: "Hashira muscular", value: "hashira muscular build" },
      { label: "Elegant dancer", value: "elegant dancer build" },
      { label: "Compact acrobat", value: "compact acrobat build" },
    ],
    Top: [
      { label: "Standard corps haori", value: "demon slayer haori" },
      { label: "Customized pattern haori", value: "patterned haori" },
      { label: "Hashira cloak", value: "hashira cloak" },
      { label: "Demon kimono", value: "demon kimono" },
      { label: "Swordsmith village robe", value: "swordsmith robe" },
    ],
    Bottom: [
      { label: "Hakama trousers", value: "hakama trousers" },
      { label: "Flowing demon skirt", value: "flowing demon skirt" },
      { label: "Battle leggings", value: "battle leggings" },
      { label: "Wisteria emblazoned pants", value: "wisteria pants" },
      { label: "Traditional tabi pants", value: "traditional tabi pants" },
    ],
    Set: [
      { label: "Standard Demon Slayer Corps", value: "standard demon slayer corps" },
      { label: "Hashira regalia", value: "hashira regalia" },
      { label: "Upper moon demon", value: "upper moon demon set" },
      { label: "Swordsmith artisan", value: "swordsmith artisan set" },
      { label: "Butterfly estate healer", value: "butterfly estate healer" },
    ],
    Material: [
      { label: "Wisteria-lined fabric", value: "wisteria lined fabric" },
      { label: "Breath-infused weave", value: "breath infused weave" },
      { label: "Demon armor scales", value: "demon armor scales" },
      { label: "Hashira silk", value: "hashira silk" },
      { label: "Fireproof haori cloth", value: "fireproof haori cloth" },
    ],
    Accessory: [
      { label: "Nichirin sword", value: "nichirin sword" },
      { label: "Breathing style scarf", value: "breathing style scarf" },
      { label: "Kasugai crow", value: "kasugai crow" },
      { label: "Demon horn adornment", value: "demon horn adornment" },
      { label: "Wisteria charm", value: "wisteria charm" },
    ],
    extra: [
      {
        title: "Allegiance",
        key: "ds_allegiance",
        data: [
          { label: "Demon Slayer Corps", value: "demon slayer corps" },
          { label: "Hashira", value: "hashira" },
          { label: "Swordsmith village", value: "swordsmith village" },
          { label: "Demon", value: "demon" },
          { label: "Former demon", value: "former demon" },
        ],
      },
    ],
  }),
  "detective-conan-oc-maker": createOptions({
    Age: [
      { label: "Elementary prodigy", value: "elementary prodigy" },
      { label: "High school sleuth", value: "high school sleuth" },
      { label: "University detective", value: "university detective" },
      { label: "Young inspector", value: "young inspector" },
      { label: "Veteran agent", value: "veteran agent" },
    ],
    Top: [
      { label: "Teitan school blazer", value: "teitan blazer" },
      { label: "Mouri detective coat", value: "mouri detective coat" },
      { label: "FBI field jacket", value: "fbi field jacket" },
      { label: "Black Organization suit", value: "black organization suit" },
      { label: "Osaka casual cardigan", value: "osaka casual cardigan" },
    ],
    Bottom: [
      { label: "School shorts", value: "school shorts" },
      { label: "Pleated uniform skirt", value: "pleated uniform skirt" },
      { label: "Detective slacks", value: "detective slacks" },
      { label: "Undercover jeans", value: "undercover jeans" },
      { label: "Tactical trousers", value: "tactical trousers" },
    ],
    Set: [
      { label: "Teitan student", value: "teitan student set" },
      { label: "Detective Boys field trip", value: "detective boys field trip" },
      { label: "Metropolitan Police", value: "metropolitan police uniform" },
      { label: "Black Organization", value: "black organization set" },
      { label: "CIA undercover", value: "cia undercover set" },
    ],
    Material: [
      { label: "Uniform twill", value: "uniform twill" },
      { label: "Waterproof trench", value: "waterproof trench" },
      { label: "Disguise layering", value: "disguise layering" },
      { label: "Kevlar weave", value: "kevlar weave" },
      { label: "Silk tie", value: "silk tie" },
    ],
    Accessory: [
      { label: "Bowtie voice changer", value: "bowtie voice changer" },
      { label: "Wristwatch tranquilizer", value: "wristwatch tranquilizer" },
      { label: "Detective badge", value: "detective badge accessory" },
      { label: "Goggles headset", value: "goggles headset" },
      { label: "Espionage earpiece", value: "espionage earpiece" },
    ],
    extra: [
      {
        title: "Allegiance",
        key: "dc_allegiance",
        data: [
          { label: "Detective Boys", value: "detective boys" },
          { label: "Metropolitan Police", value: "metropolitan police" },
          { label: "Black Organization", value: "black organization" },
          { label: "FBI/CIA", value: "fbi cia" },
          { label: "Freelance detective", value: "freelance detective" },
        ],
      },
    ],
  }),
  "disney-oc-maker": createOptions({
    Age: [
      { label: "Young adventurer", value: "young adventurer" },
      { label: "Royal teen", value: "royal teen" },
      { label: "Brave adult", value: "brave adult" },
      { label: "Wise mentor", value: "wise mentor" },
      { label: "Timeless magical being", value: "timeless magical being" },
    ],
    Top: [
      { label: "Royal bodice", value: "royal bodice" },
      { label: "Heroic tunic", value: "heroic tunic" },
      { label: "Explorer blouse", value: "explorer blouse" },
      { label: "Villain cape", value: "villain cape" },
      { label: "Animal sidekick vest", value: "animal sidekick vest" },
    ],
    Bottom: [
      { label: "Ballgown skirts", value: "ballgown skirts" },
      { label: "Adventure trousers", value: "adventure trousers" },
      { label: "Flowing dress", value: "flowing dress" },
      { label: "Sailor shorts", value: "sailor shorts" },
      { label: "Magical tail shimmer", value: "magical tail shimmer" },
    ],
    Set: [
      { label: "Enchanted royal", value: "enchanted royal set" },
      { label: "Hero quest outfit", value: "hero quest outfit" },
      { label: "Villainous ensemble", value: "villainous ensemble" },
      { label: "Forest explorer", value: "forest explorer set" },
      { label: "Fairy tale festival", value: "fairy tale festival" },
    ],
    Material: [
      { label: "Sparkling satin", value: "sparkling satin" },
      { label: "Royal brocade", value: "royal brocade" },
      { label: "Adventure leather", value: "adventure leather" },
      { label: "Pixie dust shimmer", value: "pixie dust shimmer" },
      { label: "Snowflake lace", value: "snowflake lace" },
    ],
    Accessory: [
      { label: "Magic tiara", value: "magic tiara" },
      { label: "Quest satchel", value: "quest satchel" },
      { label: "Sidekick companion", value: "sidekick companion" },
      { label: "Wishing lantern", value: "wishing lantern" },
      { label: "Villain spellbook", value: "villain spellbook" },
    ],
  }),
  "dragon-ball-oc-maker": createOptions({
    Age: [
      { label: "Young martial artist", value: "young martial artist" },
      { label: "Saiyan teen", value: "saiyan teen" },
      { label: "Galactic patrol recruit", value: "galactic patrol recruit" },
      { label: "Seasoned fighter", value: "seasoned fighter" },
      { label: "Ancient warrior", value: "ancient warrior" },
    ],
    Body: [
      { label: "Lean fighter", value: "lean fighter build" },
      { label: "Saiyan muscular", value: "saiyan muscular build" },
      { label: "Agile martial artist", value: "agile martial artist" },
      { label: "Bulking tank", value: "bulking tank" },
      { label: "Divine aura physique", value: "divine aura physique" },
    ],
    Top: [
      { label: "Gi top", value: "gi top" },
      { label: "Saiyan armor", value: "saiyan armor" },
      { label: "Galactic patrol jacket", value: "galactic patrol jacket" },
      { label: "Capsule Corp hoodie", value: "capsule corp hoodie" },
      { label: "Angel robe", value: "angel robe" },
    ],
    Bottom: [
      { label: "Gi pants", value: "gi pants" },
      { label: "Battle leggings", value: "battle leggings db" },
      { label: "Saiyan armor greaves", value: "saiyan armor greaves" },
      { label: "Casual training shorts", value: "training shorts" },
      { label: "Godly sashes", value: "godly sashes" },
    ],
    Set: [
      { label: "Z-Fighter uniform", value: "z fighter uniform" },
      { label: "Saiyan elite", value: "saiyan elite set" },
      { label: "Galactic patrol", value: "galactic patrol set" },
      { label: "Capsule corp casual", value: "capsule corp casual" },
      { label: "Divine tournament", value: "divine tournament set" },
    ],
    Material: [
      { label: "Weighted fabric", value: "weighted fabric" },
      { label: "Saiyan armor plates", value: "saiyan armor plates" },
      { label: "Training gi cotton", value: "training gi cotton" },
      { label: "God ki weave", value: "god ki weave" },
      { label: "Ultra instinct glow", value: "ultra instinct glow" },
    ],
    Accessory: [
      { label: "Scouter", value: "scouter" },
      { label: "Weighted wristbands", value: "weighted wristbands" },
      { label: "Tail wrap", value: "tail wrap" },
      { label: "Senzu pouch", value: "senzu pouch" },
      { label: "Halo aura", value: "halo aura" },
    ],
  }),
  "frieren-oc-maker": createOptions({
    Age: [
      { label: "Young apprentice", value: "young apprentice" },
      { label: "Wandering mage", value: "wandering mage" },
      { label: "Longevous elf", value: "longevous elf" },
      { label: "Seasoned warrior", value: "seasoned warrior" },
      { label: "Ancient sage", value: "ancient sage" },
    ],
    Top: [
      { label: "Elven cloak", value: "elven cloak" },
      { label: "Mage tunic", value: "mage tunic" },
      { label: "Holy order surcoat", value: "holy order surcoat" },
      { label: "Traveler shawl", value: "traveler shawl" },
      { label: "Northern fur coat", value: "northern fur coat" },
    ],
    Bottom: [
      { label: "Layered robes", value: "layered robes" },
      { label: "Seeker skirts", value: "seeker skirts" },
      { label: "Trekker leggings", value: "trekker leggings" },
      { label: "Holy order pants", value: "holy order pants" },
      { label: "Snowbound trousers", value: "snowbound trousers" },
    ],
    Set: [
      { label: "Hero party echo", value: "hero party echo set" },
      { label: "First-class mage", value: "first class mage set" },
      { label: "Demon scholar", value: "demon scholar set" },
      { label: "Traveling storyteller", value: "traveling storyteller set" },
      { label: "Cleric pilgrim", value: "cleric pilgrim set" },
    ],
    Material: [
      { label: "Weathered linen", value: "weathered linen" },
      { label: "Elven silk", value: "elven silk" },
      { label: "Rune embroidery", value: "rune embroidery" },
      { label: "Fur lined", value: "fur lined" },
      { label: "Magic resistant cloth", value: "magic resistant cloth" },
    ],
    Accessory: [
      { label: "Spell grimoire", value: "spell grimoire" },
      { label: "Mage staff", value: "mage staff" },
      { label: "Soul knapsack", value: "soul knapsack" },
      { label: "Elf ear cuffs", value: "elf ear cuffs" },
      { label: "Hero pendant", value: "hero pendant" },
    ],
  }),
  "genshin-impact-oc-maker": createOptions({
    Age: [
      { label: "Young adventurer", value: "young adventurer" },
      { label: "Knights of Favonius member", value: "knights favonius member" },
      { label: "Experienced traveler", value: "experienced traveler" },
      { label: "Fatui defector", value: "fatui defector" },
      { label: "Ancient adeptus", value: "ancient adeptus" },
    ],
    Top: [
      { label: "Mondstadt cloak", value: "mondstadt cloak" },
      { label: "Liyue qipao", value: "liyue qipao" },
      { label: "Inazuma kimono", value: "inazuma kimono" },
      { label: "Sumeru scholar robe", value: "sumeru scholar robe" },
      { label: "Fontaine court jacket", value: "fontaine court jacket" },
    ],
    Bottom: [
      { label: "Elemental tights", value: "elemental tights" },
      { label: "Flowing desert wraps", value: "desert wraps" },
      { label: "Traveler shorts", value: "traveler shorts" },
      { label: "Formal court skirt", value: "formal court skirt" },
      { label: "Adeptus trousers", value: "adeptus trousers" },
    ],
    Set: [
      { label: "Favonius knight", value: "favonius knight set" },
      { label: "Liyue harbor adept", value: "liyue harbor adept" },
      { label: "Inazuma shrine guardian", value: "inazuma shrine guardian" },
      { label: "Sumeru akademiya", value: "sumeru akademiya set" },
      { label: "Fatui harbinger", value: "fatui harbinger set" },
    ],
    Material: [
      { label: "Vision-infused fabric", value: "vision infused fabric" },
      { label: "Glaze lily silk", value: "glaze lily silk" },
      { label: "Electrocharged weave", value: "electrocharged weave" },
      { label: "Dendro vines", value: "dendro vines" },
      { label: "Hydro prisms", value: "hydro prisms" },
    ],
    Accessory: [
      { label: "Vision holder", value: "vision holder" },
      { label: "Treasure compass", value: "treasure compass" },
      { label: "Glider harness", value: "glider harness" },
      { label: "Elemental catalyst", value: "elemental catalyst" },
      { label: "Adeptus talisman", value: "adeptus talisman" },
    ],
    extra: [
      {
        title: "Vision",
        key: "vision",
        data: [
          { label: "Pyro", value: "pyro" },
          { label: "Hydro", value: "hydro" },
          { label: "Electro", value: "electro" },
          { label: "Anemo", value: "anemo" },
          { label: "Geo", value: "geo" },
          { label: "Cryo", value: "cryo" },
          { label: "Dendro", value: "dendro" },
        ],
      },
    ],
  }),
  "haikyuu-oc-maker": createOptions({
    Age: [
      { label: "First-year", value: "first year" },
      { label: "Second-year", value: "second year" },
      { label: "Third-year", value: "third year" },
      { label: "College player", value: "college player" },
      { label: "Pro league", value: "pro league" },
    ],
    Top: [
      { label: "Karasuno jersey", value: "karasuno jersey" },
      { label: "Nekoma jersey", value: "nekoma jersey" },
      { label: "Fukurodani jersey", value: "fukurodani jersey" },
      { label: "Aoba Johsai jersey", value: "aoba johsai jersey" },
      { label: "MSBY warm-up", value: "msby warm up" },
    ],
    Bottom: [
      { label: "Team shorts", value: "team shorts" },
      { label: "Compression leggings", value: "compression leggings" },
      { label: "Practice sweats", value: "practice sweats" },
      { label: "Travel pants", value: "travel pants" },
      { label: "Beach volleyball shorts", value: "beach volleyball shorts" },
    ],
    Set: [
      { label: "Karasuno crows", value: "karasuno crows set" },
      { label: "Nekoma cats", value: "nekoma cats set" },
      { label: "Fukurodani owls", value: "fukurodani owls set" },
      { label: "Schweiden Adlers", value: "schweiden adlers set" },
      { label: "MSBY Black Jackals", value: "msby black jackals set" },
    ],
    Material: [
      { label: "Sweat-wicking mesh", value: "sweat wicking mesh" },
      { label: "Ventilated jersey", value: "ventilated jersey" },
      { label: "Compression fabric", value: "compression fabric" },
      { label: "Warm-up fleece", value: "warm up fleece" },
      { label: "Beach-ready fabric", value: "beach ready fabric" },
    ],
    Accessory: [
      { label: "Captain armband", value: "captain armband haikyuu" },
      { label: "Knee pads", value: "knee pads" },
      { label: "Volleyball gloves", value: "volleyball gloves" },
      { label: "Neck towel", value: "neck towel" },
      { label: "Water bottle", value: "water bottle" },
    ],
  }),
  "hells-paradise-oc-maker": createOptions({
    Age: [
      { label: "Young shinobi", value: "young shinobi" },
      { label: "Convict execution", value: "convict execution" },
      { label: "Yamada Asaemon", value: "yamada asaemon" },
      { label: "Tao master", value: "tao master" },
      { label: "Immortal experiment", value: "immortal experiment" },
    ],
    Top: [
      { label: "Shinobi gi", value: "shinobi gi" },
      { label: "Executioner robe", value: "executioner robe" },
      { label: "Pirate convict coat", value: "pirate convict coat" },
      { label: "Junshi silk", value: "junshi silk" },
      { label: "Tao monk wrap", value: "tao monk wrap" },
    ],
    Bottom: [
      { label: "Binding trousers", value: "binding trousers" },
      { label: "Executioner hakama", value: "executioner hakama" },
      { label: "Tattered convict pants", value: "tattered convict pants" },
      { label: "Junshi petal skirts", value: "junshi petal skirts" },
      { label: "Temple sandals wraps", value: "temple sandals wraps" },
    ],
    Set: [
      { label: "Shinsenkyo survey team", value: "shinsenkyo survey team" },
      { label: "Yamada Asaemon execution", value: "yamada asaemon execution set" },
      { label: "Tao monk pilgrim", value: "tao monk pilgrim" },
      { label: "Junshi guardian", value: "junshi guardian set" },
      { label: "Pirate adventurer", value: "pirate adventurer set" },
    ],
    Material: [
      { label: "Blood-stained linen", value: "blood stained linen" },
      { label: "Flesh armor petals", value: "flesh armor petals" },
      { label: "Tao-infused silk", value: "tao infused silk" },
      { label: "Rope bindings", value: "rope bindings" },
      { label: "Bamboo fiber", value: "bamboo fiber" },
    ],
    Accessory: [
      { label: "Executioner blade", value: "executioner blade" },
      { label: "Shinobi chain", value: "shinobi chain" },
      { label: "Tao prayer beads", value: "tao prayer beads" },
      { label: "Convict shackles", value: "convict shackles" },
      { label: "Junshi mask", value: "junshi mask" },
    ],
  }),
  "honkai-star-rail-oc-maker": createOptions({
    Age: [
      { label: "Astral Express youth", value: "astral express youth" },
      { label: "Xianzhou warrior", value: "xianzhou warrior" },
      { label: "Belobog mediator", value: "belobog mediator" },
      { label: "Penacony performer", value: "penacony performer" },
      { label: "Aeon touched", value: "aeon touched" },
    ],
    Top: [
      { label: "Astral Express coat", value: "astral express coat" },
      { label: "Xianzhou armor", value: "xianzhou armor" },
      { label: "Belobog sync jacket", value: "belobog sync jacket" },
      { label: "IPC business suit", value: "ipc business suit" },
      { label: "Penacony dream blazer", value: "penacony dream blazer" },
    ],
    Bottom: [
      { label: "Trailblazer trousers", value: "trailblazer trousers" },
      { label: "Xianzhou skirts", value: "xianzhou skirts" },
      { label: "Belobog thermal pants", value: "belobog thermal pants" },
      { label: "IPC pleats", value: "ipc pleats" },
      { label: "Dreamscape leggings", value: "dreamscape leggings" },
    ],
    Set: [
      { label: "Astral Express uniform", value: "astral express uniform" },
      { label: "Xianzhou Alliance", value: "xianzhou alliance set" },
      { label: "Belobog underworld", value: "belobog underworld set" },
      { label: "Stellaron Hunter", value: "stellaron hunter set" },
      { label: "Penacony dreamscape", value: "penacony dreamscape set" },
    ],
    Material: [
      { label: "Aeon-thread fabric", value: "aeon thread fabric" },
      { label: "Xianzhou silksteel", value: "xianzhou silksteel" },
      { label: "Belobog thermal weave", value: "belobog thermal weave" },
      { label: "IPC suit cloth", value: "ipc suit cloth" },
      { label: "Dreamlight satin", value: "dreamlight satin" },
    ],
    Accessory: [
      { label: "Trailblazer badge", value: "trailblazer badge" },
      { label: "Light cone", value: "light cone" },
      { label: "Communicator earpiece", value: "communicator earpiece" },
      { label: "Aeon charm", value: "aeon charm" },
      { label: "Dreamwalker mask", value: "dreamwalker mask" },
    ],
    extra: [
      {
        title: "Path",
        key: "path",
        data: [
          { label: "Destruction", value: "destruction" },
          { label: "Hunt", value: "hunt" },
          { label: "Erudition", value: "erudition" },
          { label: "Harmony", value: "harmony" },
          { label: "Preservation", value: "preservation" },
          { label: "Abundance", value: "abundance" },
          { label: "Nihility", value: "nihility" },
        ],
      },
    ],
  }),
  "hunter-x-hunter-oc-maker": createOptions({
    Age: [
      { label: "Exam applicant", value: "hunter exam applicant" },
      { label: "Newly licensed hunter", value: "newly licensed hunter" },
      { label: "Phantom Troupe age", value: "phantom troupe age" },
      { label: "Zodiac veteran", value: "zodiac veteran" },
      { label: "Dark Continent explorer", value: "dark continent explorer" },
    ],
    Top: [
      { label: "Hunter jacket", value: "hunter jacket" },
      { label: "Phantom cloak", value: "phantom cloak" },
      { label: "Nen training tunic", value: "nen training tunic" },
      { label: "Association suit", value: "association suit" },
      { label: "Kakin expedition coat", value: "kakin expedition coat" },
    ],
    Bottom: [
      { label: "Combat slacks", value: "combat slacks" },
      { label: "Agile shorts", value: "agile shorts" },
      { label: "Nen focused trousers", value: "nen trousers" },
      { label: "Explorer leggings", value: "explorer leggings" },
      { label: "Formal council pants", value: "formal council pants" },
    ],
    Set: [
      { label: "Hunter Exam", value: "hunter exam set" },
      { label: "Phantom Troupe", value: "phantom troupe set" },
      { label: "Association Zodiac", value: "association zodiac set" },
      { label: "Greed Island gamer", value: "greed island set" },
      { label: "Dark Continent expedition", value: "dark continent expedition" },
    ],
    Material: [
      { label: "Nen reactive cloth", value: "nen reactive cloth" },
      { label: "Beast hide", value: "beast hide" },
      { label: "Phantom silk", value: "phantom silk" },
      { label: "Hunter badge metal", value: "hunter badge metal" },
      { label: "Greed Island fiber", value: "greed island fiber" },
    ],
    Accessory: [
      { label: "Hunter license", value: "hunter license" },
      { label: "Nen focus ring", value: "nen focus ring" },
      { label: "Chain weapon", value: "chain weapon" },
      { label: "Beast whistle", value: "beast whistle" },
      { label: "Greed Island card deck", value: "greed island cards" },
    ],
    extra: [
      {
        title: "Nen Category",
        key: "nen_category",
        data: [
          { label: "Enhancer", value: "enhancer" },
          { label: "Transmuter", value: "transmuter" },
          { label: "Emitter", value: "emitter" },
          { label: "Conjurer", value: "conjurer" },
          { label: "Manipulator", value: "manipulator" },
          { label: "Specialist", value: "specialist" },
        ],
      },
    ],
  }),
  "jojo-oc-maker": createOptions({
    Age: [
      { label: "Teen protagonist", value: "teen protagonist" },
      { label: "Young stand user", value: "young stand user" },
      { label: "Mafia enforcer", value: "mafia enforcer age" },
      { label: "Seasoned adventurer", value: "seasoned adventurer" },
      { label: "Timeless immortal", value: "timeless immortal" },
    ],
    Top: [
      { label: "Joestar school uniform", value: "joestar school uniform" },
      { label: "Passione suit", value: "passione suit" },
      { label: "SBR racer jacket", value: "sbr racer jacket" },
      { label: "Morioh street fashion", value: "morioh street fashion" },
      { label: "Stone Ocean prison top", value: "stone ocean prison top" },
    ],
    Bottom: [
      { label: "Stylized slacks", value: "stylized slacks" },
      { label: "Chain embellished pants", value: "chain embellished pants" },
      { label: "Race-ready chaps", value: "race ready chaps" },
      { label: "Prison stripes", value: "prison stripes" },
      { label: "Fitted jeans", value: "fitted jeans" },
    ],
    Set: [
      { label: "Stardust Crusader", value: "stardust crusader set" },
      { label: "Passione capo", value: "passione capo set" },
      { label: "Steel Ball Run racer", value: "steel ball run racer" },
      { label: "Morioh citizen", value: "morioh citizen set" },
      { label: "Stone Ocean inmate", value: "stone ocean inmate" },
    ],
    Material: [
      { label: "Glam leather", value: "glam leather" },
      { label: "SBR denim", value: "sbr denim" },
      { label: "Stand reactive fabric", value: "stand reactive fabric" },
      { label: "Velvet", value: "velvet jojo" },
      { label: "Metallic trim", value: "metallic trim" },
    ],
    Accessory: [
      { label: "Stand arrow charm", value: "stand arrow charm" },
      { label: "Hat with emblem", value: "jojo hat emblem" },
      { label: "Heart-shaped jewelry", value: "heart shaped jewelry" },
      { label: "Steel ball", value: "steel ball" },
      { label: "Stone ocean handcuffs", value: "stone ocean handcuffs" },
    ],
    extra: [
      {
        title: "Era",
        key: "jojo_era",
        data: [
          { label: "Phantom Blood", value: "phantom blood" },
          { label: "Stardust Crusaders", value: "stardust crusaders" },
          { label: "Diamond is Unbreakable", value: "diamond is unbreakable" },
          { label: "Vento Aureo", value: "vento aureo" },
          { label: "Stone Ocean", value: "stone ocean" },
          { label: "Steel Ball Run", value: "steel ball run" },
        ],
      },
    ],
  }),
  "jujutsu-kaisen-oc-maker": createOptions({
    Age: [
      { label: "Tokyo first-year", value: "tokyo first year" },
      { label: "Kyoto second-year", value: "kyoto second year" },
      { label: "Grade 2 sorcerer", value: "grade 2 sorcerer" },
      { label: "Grade 1 veteran", value: "grade 1 veteran" },
      { label: "Special grade", value: "special grade" },
    ],
    Top: [
      { label: "Tokyo uniform", value: "tokyo uniform" },
      { label: "Kyoto uniform", value: "kyoto uniform" },
      { label: "Black battle coat", value: "black battle coat" },
      { label: "Curse user cloak", value: "curse user cloak" },
      { label: "Culling game outfit", value: "culling game outfit" },
    ],
    Bottom: [
      { label: "School uniform slacks", value: "school uniform slacks" },
      { label: "Combat leggings", value: "combat leggings" },
      { label: "Binding hakama", value: "binding hakama" },
      { label: "Casual street pants", value: "casual street pants" },
      { label: "Culling game armor", value: "culling game armor" },
    ],
    Set: [
      { label: "Tokyo Jujutsu High", value: "tokyo jujutsu high set" },
      { label: "Kyoto Jujutsu High", value: "kyoto jujutsu high set" },
      { label: "Curse user rogue", value: "curse user rogue set" },
      { label: "Culling game contestant", value: "culling game contestant" },
      { label: "Special grade mentor", value: "special grade mentor" },
    ],
    Material: [
      { label: "Curse-resistant fabric", value: "curse resistant fabric" },
      { label: "Binding vow silk", value: "binding vow silk" },
      { label: "Barrier mesh", value: "barrier mesh" },
      { label: "Cursed armor plates", value: "cursed armor plates" },
      { label: "Healing charms", value: "healing charms" },
    ],
    Accessory: [
      { label: "Cursed tool", value: "cursed tool" },
      { label: "Blindfold", value: "blindfold" },
      { label: "Megumi-style shadow glove", value: "shadow glove" },
      { label: "Binding vow scroll", value: "binding vow scroll" },
      { label: "Technique talisman", value: "technique talisman" },
    ],
    extra: [
      {
        title: "Affiliation",
        key: "jjk_affiliation",
        data: [
          { label: "Tokyo Jujutsu High", value: "tokyo jujutsu high" },
          { label: "Kyoto Jujutsu High", value: "kyoto jujutsu high" },
          { label: "Curse user", value: "curse user" },
          { label: "Independent sorcerer", value: "independent sorcerer" },
          { label: "Culling game player", value: "culling game player" },
        ],
      },
    ],
  }),
  "kaguya-sama-oc-maker": createOptions({
    Age: [
      { label: "First-year", value: "first year shuchiin" },
      { label: "Second-year", value: "second year shuchiin" },
      { label: "Third-year", value: "third year shuchiin" },
      { label: "Graduate mentor", value: "graduate mentor" },
      { label: "Faculty advisor", value: "faculty advisor" },
    ],
    Top: [
      { label: "Student council uniform", value: "student council uniform" },
      { label: "Disciplinary blazer", value: "disciplinary blazer" },
      { label: "Drama club cardigan", value: "drama club cardigan" },
      { label: "Cheer club jacket", value: "cheer club jacket" },
      { label: "Casual prestige sweater", value: "prestige sweater" },
    ],
    Bottom: [
      { label: "Pleated skirt", value: "pleated skirt shuchiin" },
      { label: "Tailored slacks", value: "tailored slacks shuchiin" },
      { label: "Casual jeans", value: "casual jeans shuchiin" },
      { label: "Exercise pants", value: "exercise pants shuchiin" },
      { label: "Festival yukata hem", value: "festival yukata hem" },
    ],
    Set: [
      { label: "Student council meeting", value: "student council meeting set" },
      { label: "Public morals patrol", value: "public morals patrol set" },
      { label: "Cultural festival", value: "cultural festival set" },
      { label: "Sports festival cheer", value: "sports festival set" },
      { label: "Secret confession date", value: "secret confession date set" },
    ],
    Material: [
      { label: "School uniform wool", value: "school uniform wool" },
      { label: "Luxury cashmere", value: "luxury cashmere" },
      { label: "Club jersey fabric", value: "club jersey fabric" },
      { label: "Festival silk", value: "festival silk" },
      { label: "Designer lace", value: "designer lace" },
    ],
    Accessory: [
      { label: "Student council badge", value: "student council badge" },
      { label: "Love confession letter", value: "love confession letter" },
      { label: "Planning clipboard", value: "planning clipboard" },
      { label: "Cheer pom", value: "cheer pom" },
      { label: "Disguise glasses", value: "disguise glasses kaguya" },
    ],
  }),
  "league-of-legends-oc-maker": createOptions({
    Age: [
      { label: "Young prodigy", value: "young prodigy" },
      { label: "Battle-hardened", value: "battle hardened" },
      { label: "Seasoned champion", value: "seasoned champion" },
      { label: "Ancient immortal", value: "ancient immortal" },
      { label: "Void remnant", value: "void remnant" },
    ],
    Top: [
      { label: "Demacian armor", value: "demacian armor" },
      { label: "Noxian warplate", value: "noxian warplate" },
      { label: "Ionian robes", value: "ionian robes" },
      { label: "Piltover jacket", value: "piltover jacket" },
      { label: "Shadow Isles cloak", value: "shadow isles cloak" },
    ],
    Bottom: [
      { label: "Armored tassets", value: "armored tassets" },
      { label: "Runic leggings", value: "runic leggings" },
      { label: "Hextech pants", value: "hextech pants" },
      { label: "Freljord furs", value: "freljord furs" },
      { label: "Bilgewater trousers", value: "bilgewater trousers" },
    ],
    Set: [
      { label: "Demacia vanguard", value: "demacia vanguard set" },
      { label: "Noxus executioner", value: "noxus executioner set" },
      { label: "Piltover inventor", value: "piltover inventor set" },
      { label: "Ionia spirit guardian", value: "ionia spirit guardian" },
      { label: "Void touched", value: "void touched set" },
    ],
    Material: [
      { label: "Hextech alloy", value: "hextech alloy" },
      { label: "Runed stone", value: "runed stone" },
      { label: "Spirit blossom silk", value: "spirit blossom silk" },
      { label: "Freljord ice weave", value: "freljord ice weave" },
      { label: "Void chitin", value: "void chitin" },
    ],
    Accessory: [
      { label: "Champion sigil", value: "champion sigil" },
      { label: "Hextech gauntlet", value: "hextech gauntlet" },
      { label: "Runic blade", value: "runic blade" },
      { label: "Targon star pendant", value: "targon star pendant" },
      { label: "Bilgewater pistol", value: "bilgewater pistol" },
    ],
    extra: [
      {
        title: "Region",
        key: "lol_region",
        data: [
          { label: "Demacia", value: "demacia" },
          { label: "Noxus", value: "noxus" },
          { label: "Piltover", value: "piltover" },
          { label: "Ionia", value: "ionia" },
          { label: "Freljord", value: "freljord" },
          { label: "Shurima", value: "shurima" },
          { label: "Shadow Isles", value: "shadow isles" },
          { label: "Bilgewater", value: "bilgewater" },
          { label: "Targon", value: "targon" },
          { label: "Void", value: "void" },
        ],
      },
    ],
  }),
  "marvel-oc-maker": createOptions({
    Age: [
      { label: "Young hero", value: "young hero" },
      { label: "Seasoned avenger", value: "seasoned avenger" },
      { label: "Street vigilante", value: "street vigilante" },
      { label: "Cosmic adventurer", value: "cosmic adventurer" },
      { label: "Timeless immortal", value: "timeless marvel immortal" },
    ],
    Top: [
      { label: "Super suit", value: "super suit" },
      { label: "Shield tactical jacket", value: "shield tactical jacket" },
      { label: "Friendly neighborhood hoodie", value: "friendly neighborhood hoodie" },
      { label: "Cosmic armor", value: "cosmic armor" },
      { label: "Mystic cloak", value: "mystic cloak" },
    ],
    Bottom: [
      { label: "Hero leggings", value: "hero leggings" },
      { label: "Stealth pants", value: "stealth pants" },
      { label: "Armor greaves", value: "armor greaves" },
      { label: "Casual jeans", value: "marvel casual jeans" },
      { label: "Cosmic plating", value: "cosmic plating" },
    ],
    Set: [
      { label: "Avengers uniform", value: "avengers uniform" },
      { label: "X-Men suit", value: "xmen suit" },
      { label: "Guardians space gear", value: "guardians space gear" },
      { label: "Street-level vigilante", value: "street level vigilante" },
      { label: "Mystic arts robes", value: "mystic arts robes" },
    ],
    Material: [
      { label: "Vibranium weave", value: "vibranium weave" },
      { label: "Stark tech mesh", value: "stark tech mesh" },
      { label: "Symbiote bio-suit", value: "symbiote bio suit" },
      { label: "Nano armor", value: "nano armor" },
      { label: "Mystic runes", value: "mystic runes" },
    ],
    Accessory: [
      { label: "Web shooters", value: "web shooters" },
      { label: "Shield emblem", value: "shield emblem" },
      { label: "Infinity shard", value: "infinity shard" },
      { label: "Arc reactor", value: "arc reactor" },
      { label: "Cape of levitation", value: "cape of levitation" },
    ],
    extra: [
      {
        title: "Alignment",
        key: "marvel_alignment",
        data: [
          { label: "Hero", value: "hero" },
          { label: "Anti-hero", value: "anti hero" },
          { label: "Villain", value: "villain" },
          { label: "S.H.I.E.L.D.", value: "shield" },
          { label: "Mutant", value: "mutant" },
        ],
      },
    ],
  }),
  "my-hero-academia-oc-maker": createOptions({
    Age: [
      { label: "U.A. first-year", value: "ua first year" },
      { label: "U.A. upperclassman", value: "ua upperclassman" },
      { label: "Pro hero", value: "pro hero" },
      { label: "Underground vigilante", value: "underground vigilante" },
      { label: "Veteran villain", value: "veteran villain" },
    ],
    Top: [
      { label: "U.A. training jacket", value: "ua training jacket" },
      { label: "Hero costume armor", value: "hero costume armor" },
      { label: "Support course coat", value: "support course coat" },
      { label: "Villain trench", value: "villain trench" },
      { label: "Agency uniform", value: "agency uniform" },
    ],
    Bottom: [
      { label: "Hero costume tights", value: "hero costume tights" },
      { label: "Training pants", value: "training pants" },
      { label: "Support utility shorts", value: "support utility shorts" },
      { label: "Villain leather pants", value: "villain leather pants" },
      { label: "Agency formal slacks", value: "agency formal slacks" },
    ],
    Set: [
      { label: "U.A. hero course", value: "ua hero course set" },
      { label: "Support engineer", value: "support engineer set" },
      { label: "Pro hero", value: "pro hero set" },
      { label: "League of Villains", value: "league of villains set" },
      { label: "Underground vigilante", value: "underground vigilante set" },
    ],
    Material: [
      { label: "Quirk-resistant fabric", value: "quirk resistant fabric" },
      { label: "Carbon fiber armor", value: "carbon fiber armor" },
      { label: "Support tech mesh", value: "support tech mesh" },
      { label: "Fireproof suit", value: "fireproof suit" },
      { label: "Stealth fabric", value: "stealth fabric" },
    ],
    Accessory: [
      { label: "Utility gauntlets", value: "utility gauntlets" },
      { label: "Support gear toolkit", value: "support gear toolkit" },
      { label: "Hero license pass", value: "hero license" },
      { label: "Villain mask", value: "villain mask" },
      { label: "Agency communicator", value: "agency communicator" },
    ],
    extra: [
      {
        title: "Affiliation",
        key: "mha_affiliation",
        data: [
          { label: "U.A. Hero Course", value: "ua hero course" },
          { label: "Support Course", value: "support course" },
          { label: "Pro Hero", value: "pro hero" },
          { label: "Vigilante", value: "vigilante" },
          { label: "League of Villains", value: "league of villains" },
        ],
      },
    ],
  }),
  "my-little-pony-oc-maker": createOptions({
    Age: [
      { label: "Young foal", value: "young foal" },
      { label: "Cutie mark crusader", value: "cutie mark crusader" },
      { label: "Adult pony", value: "adult pony" },
      { label: "Royal advisor", value: "royal advisor" },
      { label: "Ancient creature", value: "ancient creature" },
    ],
    Top: [
      { label: "Friendship school vest", value: "friendship school vest" },
      { label: "Royal regalia", value: "royal regalia" },
      { label: "Adventure scarf", value: "adventure scarf" },
      { label: "Wonderbolt jacket", value: "wonderbolt jacket" },
      { label: "Crystal empire shawl", value: "crystal empire shawl" },
    ],
    Bottom: [
      { label: "Flowing tail ribbons", value: "tail ribbons" },
      { label: "Saddle skirts", value: "saddle skirts" },
      { label: "Adventure saddlebags", value: "adventure saddlebags" },
      { label: "Formal drape", value: "formal drape" },
      { label: "Yakyakistan tassels", value: "yakyakistan tassels" },
    ],
    Set: [
      { label: "Ponyville casual", value: "ponyville casual" },
      { label: "Canterlot gala", value: "canterlot gala" },
      { label: "Wonderbolt flight", value: "wonderbolt flight" },
      { label: "Crystal empire formal", value: "crystal empire formal" },
      { label: "Friendship school uniform", value: "friendship school uniform" },
    ],
    Material: [
      { label: "Star-thread silk", value: "star thread silk" },
      { label: "Cloud weave", value: "cloud weave" },
      { label: "Crystal shimmer", value: "crystal shimmer" },
      { label: "Everfree bark", value: "everfree bark" },
      { label: "Harmony satin", value: "harmony satin" },
    ],
    Accessory: [
      { label: "Cutie mark pin", value: "cutie mark pin" },
      { label: "Friendship bracelet", value: "friendship bracelet" },
      { label: "Magic horn ring", value: "magic horn ring" },
      { label: "Wonderbolt goggles", value: "wonderbolt goggles" },
      { label: "Dragon scale charm", value: "dragon scale charm" },
    ],
  }),
  "naruto-oc-maker": createOptions({
    Age: [
      { label: "Genin", value: "genin" },
      { label: "Chunin", value: "chunin" },
      { label: "Jonin", value: "jonin" },
      { label: "Anbu", value: "anbu" },
      { label: "Veteran kage", value: "veteran kage" },
    ],
    Top: [
      { label: "Leaf flak jacket", value: "leaf flak jacket" },
      { label: "Sand desert cloak", value: "sand desert cloak" },
      { label: "Mist hunter robe", value: "mist hunter robe" },
      { label: "Cloud battle vest", value: "cloud battle vest" },
      { label: "Akatsuki cloak", value: "akatsuki cloak" },
    ],
    Bottom: [
      { label: "Shinobi pants", value: "shinobi pants" },
      { label: "Naruto orange pants", value: "orange pants" },
      { label: "Ninja leggings", value: "ninja leggings" },
      { label: "Samurai hakama", value: "samurai hakama" },
      { label: "Anbu trousers", value: "anbu trousers" },
    ],
    Set: [
      { label: "Leaf village ninja", value: "leaf village ninja" },
      { label: "Sand village", value: "sand village set" },
      { label: "Mist swordsman", value: "mist swordsman set" },
      { label: "Cloud shinobi", value: "cloud shinobi set" },
      { label: "Akatsuki member", value: "akatsuki member" },
    ],
    Material: [
      { label: "Chakra mesh", value: "chakra mesh" },
      { label: "Flak armor", value: "flak armor" },
      { label: "Sand reinforced cloth", value: "sand reinforced cloth" },
      { label: "Mist waterproof weave", value: "mist waterproof weave" },
      { label: "Cloud lightning fabric", value: "cloud lightning fabric" },
    ],
    Accessory: [
      { label: "Forehead protector", value: "forehead protector" },
      { label: "Kunai holster", value: "kunai holster" },
      { label: "Scroll pack", value: "scroll pack" },
      { label: "Anbu mask", value: "anbu mask" },
      { label: "Akatsuki ring", value: "akatsuki ring" },
    ],
    extra: [
      {
        title: "Village",
        key: "village",
        data: [
          { label: "Leaf", value: "leaf" },
          { label: "Sand", value: "sand" },
          { label: "Mist", value: "mist" },
          { label: "Cloud", value: "cloud" },
          { label: "Stone", value: "stone" },
          { label: "Rogue", value: "rogue" },
        ],
      },
    ],
  }),
  "one-piece-oc-maker": createOptions({
    Age: [
      { label: "Cabin boy/girl", value: "cabin crew teen" },
      { label: "Young pirate", value: "young pirate" },
      { label: "Seasoned crew", value: "seasoned crew" },
      { label: "Veteran captain", value: "veteran captain" },
      { label: "Legendary pirate", value: "legendary pirate" },
    ],
    Top: [
      { label: "Pirate coat", value: "pirate coat" },
      { label: "Marine uniform", value: "marine uniform top" },
      { label: "Revolutionary jacket", value: "revolutionary jacket" },
      { label: "Fishman kimono", value: "fishman kimono" },
      { label: "Sky island tunic", value: "sky island tunic" },
    ],
    Bottom: [
      { label: "Striped trousers", value: "striped trousers" },
      { label: "Sailor shorts", value: "sailor shorts" },
      { label: "High seas skirt", value: "high seas skirt" },
      { label: "Rough denim", value: "rough denim" },
      { label: "Marine slacks", value: "marine slacks" },
    ],
    Set: [
      { label: "Straw Hat style", value: "straw hat style" },
      { label: "Marine officer", value: "marine officer set" },
      { label: "Revolutionary army", value: "revolutionary army set" },
      { label: "Wano samurai", value: "wano samurai set" },
      { label: "Skypiea explorer", value: "skypiea explorer" },
    ],
    Material: [
      { label: "Weather-worn canvas", value: "weather worn canvas" },
      { label: "Marine polished cloth", value: "marine polished cloth" },
      { label: "Wano silk", value: "wano silk" },
      { label: "Fishman scales", value: "fishman scales" },
      { label: "Sky cloud fiber", value: "sky cloud fiber" },
    ],
    Accessory: [
      { label: "Straw hat", value: "straw hat" },
      { label: "Marine justice cape", value: "marine justice cape" },
      { label: "Den den mushi", value: "den den mushi" },
      { label: "Log pose", value: "log pose" },
      { label: "Wanted poster", value: "wanted poster" },
    ],
    extra: [
      {
        title: "Faction",
        key: "op_faction",
        data: [
          { label: "Pirate", value: "pirate" },
          { label: "Marine", value: "marine" },
          { label: "Revolutionary", value: "revolutionary" },
          { label: "Bounty hunter", value: "bounty hunter" },
          { label: "World Noble", value: "world noble" },
        ],
      },
    ],
  }),
  "oshi-no-ko-oc-maker": createOptions({
    Age: [
      { label: "Junior idol", value: "junior idol" },
      { label: "High school star", value: "high school star" },
      { label: "Adult performer", value: "adult performer" },
      { label: "Industry veteran", value: "industry veteran" },
      { label: "Legendary icon", value: "legendary icon" },
    ],
    Top: [
      { label: "Idol stage blouse", value: "idol stage blouse" },
      { label: "Drama actor jacket", value: "drama actor jacket" },
      { label: "Streamer hoodie", value: "streamer hoodie" },
      { label: "Manager blazer", value: "manager blazer" },
      { label: "Designer couture", value: "designer couture" },
    ],
    Bottom: [
      { label: "Stage skirt", value: "stage skirt" },
      { label: "Performance shorts", value: "performance shorts" },
      { label: "Stylish slacks", value: "stylish slacks" },
      { label: "Casual jeans", value: "casual jeans idol" },
      { label: "Elegant gown hem", value: "elegant gown hem" },
    ],
    Set: [
      { label: "B-Komachi stage", value: "b komachi stage set" },
      { label: "Actor red carpet", value: "actor red carpet set" },
      { label: "Variety show", value: "variety show set" },
      { label: "Underground idol", value: "underground idol set" },
      { label: "Agency manager", value: "agency manager set" },
    ],
    Material: [
      { label: "Sequined fabric", value: "sequined fabric" },
      { label: "Stage sparkle mesh", value: "stage sparkle mesh" },
      { label: "Studio denim", value: "studio denim" },
      { label: "Silk couture", value: "silk couture" },
      { label: "LED fiber", value: "led fiber" },
    ],
    Accessory: [
      { label: "Stage microphone", value: "stage microphone" },
      { label: "In-ear monitor", value: "in ear monitor" },
      { label: "Actor script", value: "actor script" },
      { label: "Fan lightstick", value: "fan lightstick" },
      { label: "Social media phone", value: "social media phone" },
    ],
  }),
  "pokemon-oc-maker": createOptions({
    Age: [
      { label: "Young trainer", value: "young trainer" },
      { label: "Gym challenger", value: "gym challenger" },
      { label: "Seasoned trainer", value: "seasoned trainer" },
      { label: "Elite four", value: "elite four" },
      { label: "Professor", value: "pokemon professor" },
    ],
    Top: [
      { label: "Trainer jacket", value: "trainer jacket" },
      { label: "Gym uniform", value: "gym uniform" },
      { label: "Contest dress", value: "contest dress" },
      { label: "Ranger vest", value: "ranger vest" },
      { label: "Research lab coat", value: "research lab coat" },
    ],
    Bottom: [
      { label: "Trainer shorts", value: "trainer shorts" },
      { label: "Adventure trousers", value: "adventure trousers" },
      { label: "Contest skirt", value: "contest skirt" },
      { label: "Ranger pants", value: "ranger pants" },
      { label: "Field leggings", value: "field leggings" },
    ],
    Set: [
      { label: "Gym challenger outfit", value: "gym challenger outfit" },
      { label: "Champion attire", value: "champion attire" },
      { label: "Contest idol", value: "contest idol set" },
      { label: "Ranger gear", value: "ranger gear" },
      { label: "Professor explorer", value: "professor explorer set" },
    ],
    Material: [
      { label: "Weatherproof fabric", value: "weatherproof fabric" },
      { label: "Contest sparkle", value: "contest sparkle" },
      { label: "Ranger leather", value: "ranger leather" },
      { label: "Tech mesh", value: "tech mesh" },
      { label: "Pokéball steel", value: "pokeball steel" },
    ],
    Accessory: [
      { label: "Pokéball belt", value: "pokeball belt" },
      { label: "Rotom phone", value: "rotom phone" },
      { label: "Z-crystal pendant", value: "z crystal pendant" },
      { label: "Badge case", value: "badge case" },
      { label: "Pokedex", value: "pokedex" },
    ],
    extra: [
      {
        title: "Trainer Type",
        key: "trainer_type",
        data: [
          { label: "Ace trainer", value: "ace trainer" },
          { label: "Coordinator", value: "coordinator" },
          { label: "Ranger", value: "ranger" },
          { label: "Researcher", value: "researcher" },
          { label: "Gym leader", value: "gym leader" },
        ],
      },
    ],
  }),
  "sailor-moon-oc-maker": createOptions({
    Age: [
      { label: "Student guardian", value: "student guardian" },
      { label: "Young senshi", value: "young senshi" },
      { label: "Adult guardian", value: "adult guardian" },
      { label: "Outer senshi", value: "outer senshi" },
      { label: "Ancient moon royal", value: "ancient moon royal" },
    ],
    Top: [
      { label: "Sailor uniform bodice", value: "sailor bodice" },
      { label: "Princess gown", value: "princess gown" },
      { label: "Outer senshi coat", value: "outer senshi coat" },
      { label: "Guardian tunic", value: "guardian tunic" },
      { label: "Crown court robe", value: "crown court robe" },
    ],
    Bottom: [
      { label: "Sailor pleated skirt", value: "sailor pleated skirt" },
      { label: "Flowing dress layers", value: "flowing dress layers" },
      { label: "Outer senshi trousers", value: "outer senshi trousers" },
      { label: "Crystal empire hem", value: "crystal empire hem" },
      { label: "Guardian leggings", value: "guardian leggings" },
    ],
    Set: [
      { label: "Inner senshi", value: "inner senshi set" },
      { label: "Outer senshi", value: "outer senshi set" },
      { label: "Moon princess", value: "moon princess set" },
      { label: "Starlight guardian", value: "starlight guardian set" },
      { label: "Dark kingdom", value: "dark kingdom set" },
    ],
    Material: [
      { label: "Moonlight silk", value: "moonlight silk" },
      { label: "Star crystal", value: "star crystal" },
      { label: "Guardian ribbon", value: "guardian ribbon" },
      { label: "Silver millennium fabric", value: "silver millennium fabric" },
      { label: "Dark energy weave", value: "dark energy weave" },
    ],
    Accessory: [
      { label: "Tiara", value: "tiara" },
      { label: "Transformation brooch", value: "transformation brooch" },
      { label: "Moon wand", value: "moon wand" },
      { label: "Crystal earrings", value: "crystal earrings" },
      { label: "Guardian choker", value: "guardian choker" },
    ],
  }),
  "sonic-oc-maker": createOptions({
    Age: [
      { label: "Teen speedster", value: "teen speedster" },
      { label: "Young hero", value: "young hero mobius" },
      { label: "Seasoned adventurer", value: "seasoned adventurer mobius" },
      { label: "Resistance veteran", value: "resistance veteran" },
      { label: "Timeless entity", value: "timeless entity" },
    ],
    Top: [
      { label: "Speed suit", value: "speed suit" },
      { label: "Resistance jacket", value: "resistance jacket" },
      { label: "Tech vest", value: "tech vest" },
      { label: "Rider gear", value: "rider gear" },
      { label: "Stealth cloak", value: "stealth cloak" },
    ],
    Bottom: [
      { label: "Trail shorts", value: "trail shorts" },
      { label: "Kinetic leggings", value: "kinetic leggings" },
      { label: "Rider pants", value: "rider pants" },
      { label: "Utility trousers", value: "utility trousers mobius" },
      { label: "Adventure belts", value: "adventure belts" },
    ],
    Set: [
      { label: "Team Sonic", value: "team sonic set" },
      { label: "Chaotix detective", value: "chaotix detective set" },
      { label: "Freedom Fighter", value: "freedom fighter set" },
      { label: "Riders racing", value: "riders racing set" },
      { label: "Eggman infiltration", value: "eggman infiltration set" },
    ],
    Material: [
      { label: "Speed mesh", value: "speed mesh" },
      { label: "Resistant leather", value: "resistant leather" },
      { label: "Tech polymer", value: "tech polymer" },
      { label: "Chaos energy thread", value: "chaos energy thread" },
      { label: "Stealth fabric", value: "stealth fabric sonic" },
    ],
    Accessory: [
      { label: "Power sneakers", value: "power sneakers" },
      { label: "Goggles", value: "goggles" },
      { label: "Communicator wrist", value: "communicator wrist" },
      { label: "Wispon", value: "wispon" },
      { label: "Chaos emerald shard", value: "chaos emerald shard" },
    ],
  }),
  "spy-x-family-oc-maker": createOptions({
    Age: [
      { label: "Young agent", value: "young agent" },
      { label: "Field operative", value: "field operative" },
      { label: "Agency veteran", value: "agency veteran" },
      { label: "Underworld broker", value: "underworld broker" },
      { label: "Intelligence director", value: "intelligence director" },
    ],
    Top: [
      { label: "WISE suit", value: "wise suit" },
      { label: "SSS trench", value: "sss trench" },
      { label: "Garden disguise", value: "garden disguise" },
      { label: "Eden faculty blazer", value: "eden faculty blazer" },
      { label: "Underworld casual", value: "underworld casual" },
    ],
    Bottom: [
      { label: "Tailored slacks", value: "tailored slacks spy" },
      { label: "Pencil skirt", value: "pencil skirt spy" },
      { label: "Undercover jeans", value: "undercover jeans spy" },
      { label: "Combat trousers", value: "combat trousers spy" },
      { label: "Formal suit pants", value: "formal suit pants spy" },
    ],
    Set: [
      { label: "WISE operative", value: "wise operative set" },
      { label: "Garden cleaner", value: "garden cleaner set" },
      { label: "SSS agent", value: "sss agent set" },
      { label: "Undercover Eden", value: "undercover eden set" },
      { label: "Informant broker", value: "informant broker set" },
    ],
    Material: [
      { label: "Bulletproof lining", value: "bulletproof lining" },
      { label: "Spy mesh", value: "spy mesh" },
      { label: "Silk disguise", value: "silk disguise" },
      { label: "Encrypted fabric", value: "encrypted fabric" },
      { label: "Shadow velvet", value: "shadow velvet" },
    ],
    Accessory: [
      { label: "Hidden pistol", value: "hidden pistol" },
      { label: "Codebook", value: "codebook" },
      { label: "Spy glasses", value: "spy glasses" },
      { label: "Microphone brooch", value: "microphone brooch" },
      { label: "Cipher briefcase", value: "cipher briefcase" },
    ],
  }),
  "uma-musume-oc-maker": createOptions({
    Age: [
      { label: "Debut runner", value: "debut runner" },
      { label: "Main series competitor", value: "main series competitor" },
      { label: "G1 champion", value: "g1 champion" },
      { label: "Retired idol", value: "retired idol" },
      { label: "Legendary muse", value: "legendary muse" },
    ],
    Top: [
      { label: "Tracen academy uniform", value: "tracen academy uniform" },
      { label: "Racing singlet", value: "racing singlet" },
      { label: "Gala idol dress", value: "gala idol dress" },
      { label: "Training jacket", value: "training jacket" },
      { label: "Casual cardigan", value: "casual cardigan uma" },
    ],
    Bottom: [
      { label: "Racing skirt", value: "racing skirt" },
      { label: "Training shorts", value: "training shorts uma" },
      { label: "Formal dress hem", value: "formal dress hem" },
      { label: "Jockey leggings", value: "jockey leggings" },
      { label: "Stage tutu", value: "stage tutu" },
    ],
    Set: [
      { label: "Tracen academy", value: "tracen academy set" },
      { label: "Classic G1", value: "classic g1 set" },
      { label: "Dirt track idol", value: "dirt track idol set" },
      { label: "Midnight stage", value: "midnight stage set" },
      { label: "Legendary derby", value: "legendary derby set" },
    ],
    Material: [
      { label: "Lightweight racing fabric", value: "lightweight racing fabric" },
      { label: "Moisture-wick mesh", value: "moisture wick mesh" },
      { label: "Glitter satin", value: "glitter satin" },
      { label: "Thermal fleece", value: "thermal fleece" },
      { label: "Stage shimmer", value: "stage shimmer" },
    ],
    Accessory: [
      { label: "Race number bib", value: "race number bib" },
      { label: "Victory wreath", value: "victory wreath" },
      { label: "Training whistle", value: "training whistle" },
      { label: "Horse tail ribbon", value: "horse tail ribbon" },
      { label: "Stage microphone", value: "uma stage microphone" },
    ],
  }),
};

function escape(value) {
  return value.replace(/"/g, '\\"');
}

function formatData(entries, indent) {
  const lines = ["["];
  const inner = " ".repeat(indent + 2);
  const baseIndent = " ".repeat(indent);

  entries.forEach((entry, index) => {
    lines.push(`${inner}{`);
    lines.push(`${inner}  label: "${escape(entry.label)}",`);
    lines.push(`${inner}  value: "${escape(entry.value)}"`);
    lines.push(`${inner}}${index === entries.length - 1 ? "" : ","}`);
  });

  lines.push(`${baseIndent}]`);
  return lines.join("\n");
}

function formatOcOptions(options) {
  const lines = ["const ocOptions = ["]; 
  options.forEach((option, index) => {
    lines.push("  {");
    lines.push(`    title: "${escape(option.title)}",`);
    lines.push(`    key: "${escape(option.key)}",`);
    if (option.unique) {
      lines.push("    unique: true,");
    }
    lines.push("    data: " + formatData(option.data, 4));
    lines.push(`  }${index === options.length - 1 ? "" : ","}`);
  });
  lines.push("];");
  return lines.join("\n");
}

async function updateFile(slug, categories) {
  const requiredKeys = [
    "Gender",
    "Age",
    "Body",
    "Hair",
    "Eyes",
    "Face",
    "Skin",
    "Top",
    "Bottom",
    "Set",
    "Material",
    "Accessory",
  ];

  const filePath = path.join(process.cwd(), "app/i18n/maker", slug, "base.ts");
  let content = await fs.readFile(filePath, "utf8");

  const ocOptions = [];

  for (const key of requiredKeys) {
    const items = categories[key];
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error(`${slug} missing entries for ${key}`);
    }
    ocOptions.push({
      title: key,
      key: key.toLowerCase(),
      unique: key === "Gender",
      data: items,
    });
  }

  if (Array.isArray(categories.extra)) {
    for (const extra of categories.extra) {
      ocOptions.push(extra);
    }
  }

  const formatted = formatOcOptions(ocOptions);

  const regex = /const ocOptions = \[[\s\S]*?\];/;
  if (!regex.test(content)) {
    throw new Error(`Could not find ocOptions in ${filePath}`);
  }

  content = content.replace(regex, formatted);

  await fs.writeFile(filePath, content, "utf8");
  console.log(`Updated ${slug}`);
}

async function main() {
  for (const [slug, categories] of Object.entries(dataset)) {
    await updateFile(slug, categories);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
