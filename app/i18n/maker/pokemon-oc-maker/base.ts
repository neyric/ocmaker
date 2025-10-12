const basePrompt = `
  WORLD CONTEXT:
  Universe: Pokémon
  Setting: Regions like Kanto through Paldea, Pokémon journeys, gym challenges, research labs, villainous teams, league tournaments
  Key Elements: Trainers, Professors, Gym Leaders, Champions, villain teams (Rocket, Magma/Aqua, Galactic, Plasma, Flare, Skull, Star), explorers, contest idols

  OUTPUT FORMAT:
  Name, Trainer/Role Type, Home Region & Key Locations, Team Specialty & Signature Partner Pokémon, Personality, Goal (League/Research/etc.), Journey Backstory

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Kalos Sky Ace",
    description: "A sky trainer dancing through aerial battles with grace.",
    prompt: `What is your character's name?
Elise Montclair

What type of trainer or role do they have?
Kalos Sky Trainer and performing competitor

Which region do they call home and what key locations define them?
Kalos, primarily Lumiose City and Azure Bay

What is their team specialty and signature partner Pokémon?
Flying-type specialists led by partner Hawlucha

How would you describe their personality?
Elegant, brave, thrill-seeking

What goal drives their journey?
To choreograph the ultimate aerial performance for the Prism Tower festival

Share a journey backstory snapshot.
Survived a storm thanks to her Hawlucha; now teaches children aerial safety through contests.`,
  },
  {
    title: "Sinnoh Myth Researcher",
    description:
      "A Sinnoh scholar mapping ancient ruins alongside fossil Pokémon.",
    prompt: `What is your character's name?
Darius Flint

What type of trainer or role do they have?
Archaeologist and Fossil Pokémon trainer

Which region do they call home and what key locations define them?
Sinnoh, based in Canalave Library and Spear Pillar

What is their team specialty and signature partner Pokémon?
Rock/Steel team led by partner Bastiodon

How would you describe their personality?
Methodical, bookish, quietly heroic

What goal drives their journey?
To uncover proof linking Arceus myths with modern evolution

Share a journey backstory snapshot.
Encountered Cynthia while restoring Solaceon's ruins; now documents mythic sightings with his fossil partners.`,
  },
  {
    title: "Galar Gym Challenger",
    description: "A punk rocker challenging gyms with rhythm-infused battles.",
    prompt: `What is your character's name?
Roxy Riot

What type of trainer or role do they have?
Galar Gym Challenger and musician

Which region do they call home and what key locations define them?
Galar, Spikemuth hometown and Wyndon Stadium

What is their team specialty and signature partner Pokémon?
Electric/Poison blend led by partner Toxtricity

How would you describe their personality?
Rebellious, charismatic, fiercely loyal

What goal drives their journey?
To dethrone Leon and revitalize Spikemuth's music scene

Share a journey backstory snapshot.
Was mentored by Piers and Marnie, turning her garage band into gym challenge battles.`,
  },
  {
    title: "Alola Trial Captain",
    description:
      "An Alolan trial captain guiding challengers through lush jungles.",
    prompt: `What is your character's name?
Keani

What type of trainer or role do they have?
Trial Captain in Alola's Lush Jungle

Which region do they call home and what key locations define them?
Alola, Lush Jungle and Iki Town

What is their team specialty and signature partner Pokémon?
Grass-type bonds led by partner Tsareena

How would you describe their personality?
Warm, playful, fiercely protective of nature

What goal drives their journey?
To cultivate restorative herbs that heal Ultra Beast damage

Share a journey backstory snapshot.
Discovered her Tsareena while replanting the jungle after an Ultra Beast incursion.`,
  },
  {
    title: "Paldea Streamer",
    description: "A Paldean influencer mixing treasure hunts with gym raids.",
    prompt: `What is your character's name?
Nova Stream

What type of trainer or role do they have?
Paldea treasure hunter and battle streamer

Which region do they call home and what key locations define them?
Paldea, exploring Area Zero and Levincia

What is their team specialty and signature partner Pokémon?
Dragon/Normal team led by partner Cyclizar

How would you describe their personality?
Energetic, curious, always camera-ready

What goal drives their journey?
To broadcast a live discovery of the next Great Treasure of Paldea

Share a journey backstory snapshot.
Found her Cyclizar as a child during a treasure hunt; now travels with Nemona to showcase Paldea's wonders.`,
  },
];

const ocOptions = [
  {
    title: "Gender",
    key: "gender",
    unique: true,
    data: [
      {
        label: "Boy",
        value: "1boy",
      },
      {
        label: "Girl",
        value: "1girl",
      },
      {
        label: "Non-binary",
        value: "1person",
      },
    ],
  },
  {
    title: "Age",
    key: "age",
    data: [
      {
        label: "Young teen",
        value: "teen",
      },
      {
        label: "Late teen",
        value: "late teen",
      },
      {
        label: "Young adult",
        value: "young adult",
      },
      {
        label: "Experienced adult",
        value: "adult",
      },
      {
        label: "Veteran",
        value: "veteran",
      },
      {
        label: "Seasoned elder",
        value: "seasoned elder",
      },
      {
        label: "Timeless legend",
        value: "timeless legend",
      },
      {
        label: "Young trainer",
        value: "young trainer",
      },
      {
        label: "Gym challenger",
        value: "gym challenger",
      },
      {
        label: "Seasoned trainer",
        value: "seasoned trainer",
      },
      {
        label: "Elite four",
        value: "elite four",
      },
      {
        label: "Professor",
        value: "pokemon professor",
      },
    ],
  },
  {
    title: "Body",
    key: "body",
    data: [
      {
        label: "Slender",
        value: "slender",
      },
      {
        label: "Athletic",
        value: "athletic",
      },
      {
        label: "Muscular",
        value: "muscular",
      },
      {
        label: "Tall",
        value: "tall",
      },
      {
        label: "Petite",
        value: "petite",
      },
      {
        label: "Burly",
        value: "burly",
      },
      {
        label: "Graceful",
        value: "graceful",
      },
    ],
  },
  {
    title: "Hair",
    key: "hair",
    data: [
      {
        label: "Short black hair",
        value: "short black hair",
      },
      {
        label: "Long brown hair",
        value: "long brown hair",
      },
      {
        label: "Blonde hair",
        value: "blonde hair",
      },
      {
        label: "Red hair",
        value: "red hair",
      },
      {
        label: "Silver hair",
        value: "silver hair",
      },
      {
        label: "Blue hair",
        value: "blue hair",
      },
      {
        label: "White hair",
        value: "white hair",
      },
      {
        label: "Braided hair",
        value: "braided hair",
      },
      {
        label: "Wavy lavender hair",
        value: "wavy lavender hair",
      },
    ],
  },
  {
    title: "Eyes",
    key: "eyes",
    data: [
      {
        label: "Brown eyes",
        value: "brown eyes",
      },
      {
        label: "Blue eyes",
        value: "blue eyes",
      },
      {
        label: "Green eyes",
        value: "green eyes",
      },
      {
        label: "Amber eyes",
        value: "amber eyes",
      },
      {
        label: "Gray eyes",
        value: "gray eyes",
      },
      {
        label: "Violet eyes",
        value: "violet eyes",
      },
      {
        label: "Golden eyes",
        value: "golden eyes",
      },
    ],
  },
  {
    title: "Face",
    key: "face",
    data: [
      {
        label: "Determined expression",
        value: "determined expression",
      },
      {
        label: "Smiling",
        value: "smiling expression",
      },
      {
        label: "Serious look",
        value: "serious expression",
      },
      {
        label: "Stoic face",
        value: "stoic expression",
      },
      {
        label: "Playful grin",
        value: "playful grin",
      },
      {
        label: "Fierce snarl",
        value: "fierce snarl",
      },
      {
        label: "Warm smile",
        value: "warm smile",
      },
    ],
  },
  {
    title: "Skin",
    key: "skin",
    data: [
      {
        label: "Fair skin",
        value: "fair skin",
      },
      {
        label: "Warm tan skin",
        value: "tan skin",
      },
      {
        label: "Olive skin",
        value: "olive skin",
      },
      {
        label: "Deep brown skin",
        value: "deep brown skin",
      },
      {
        label: "Freckled skin",
        value: "freckled skin",
      },
      {
        label: "Porcelain skin",
        value: "porcelain skin",
      },
      {
        label: "Sunburned skin",
        value: "sunburned skin",
      },
    ],
  },
  {
    title: "Top",
    key: "top",
    data: [
      {
        label: "Utility jacket",
        value: "utility jacket",
      },
      {
        label: "Layered coat",
        value: "layered coat",
      },
      {
        label: "Casual tunic",
        value: "casual tunic",
      },
      {
        label: "Armored vest",
        value: "armored vest",
      },
      {
        label: "Loose shirt",
        value: "loose shirt",
      },
      {
        label: "Hooded cloak",
        value: "hooded cloak",
      },
      {
        label: "Ceremonial robe",
        value: "ceremonial robe",
      },
      {
        label: "Trainer jacket",
        value: "trainer jacket",
      },
      {
        label: "Gym uniform",
        value: "gym uniform",
      },
      {
        label: "Contest dress",
        value: "contest dress",
      },
      {
        label: "Ranger vest",
        value: "ranger vest",
      },
      {
        label: "Research lab coat",
        value: "research lab coat",
      },
    ],
  },
  {
    title: "Bottom",
    key: "bottom",
    data: [
      {
        label: "Cargo trousers",
        value: "cargo trousers",
      },
      {
        label: "Fitted pants",
        value: "fitted pants",
      },
      {
        label: "Pleated skirt",
        value: "pleated skirt",
      },
      {
        label: "Battle-ready shorts",
        value: "battle shorts",
      },
      {
        label: "Flowing robes",
        value: "flowing robes",
      },
      {
        label: "Armored greaves",
        value: "armored greaves",
      },
      {
        label: "Layered wraps",
        value: "layered wraps",
      },
      {
        label: "Trainer shorts",
        value: "trainer shorts",
      },
      {
        label: "Adventure trousers",
        value: "adventure trousers",
      },
      {
        label: "Contest skirt",
        value: "contest skirt",
      },
      {
        label: "Ranger pants",
        value: "ranger pants",
      },
      {
        label: "Field leggings",
        value: "field leggings",
      },
    ],
  },
  {
    title: "Set",
    key: "set",
    data: [
      {
        label: "Combat uniform",
        value: "combat uniform",
      },
      {
        label: "Casual traveler",
        value: "casual traveler outfit",
      },
      {
        label: "Formal attire",
        value: "formal attire",
      },
      {
        label: "Stealth gear",
        value: "stealth gear",
      },
      {
        label: "Festival outfit",
        value: "festival outfit",
      },
      {
        label: "Royal regalia",
        value: "royal regalia",
      },
      {
        label: "Nomad attire",
        value: "nomad attire",
      },
      {
        label: "Gym challenger outfit",
        value: "gym challenger outfit",
      },
      {
        label: "Champion attire",
        value: "champion attire",
      },
      {
        label: "Contest idol",
        value: "contest idol set",
      },
      {
        label: "Ranger gear",
        value: "ranger gear",
      },
      {
        label: "Professor explorer",
        value: "professor explorer set",
      },
    ],
  },
  {
    title: "Material",
    key: "material",
    data: [
      {
        label: "Woven fabric",
        value: "woven fabric",
      },
      {
        label: "Polished leather",
        value: "polished leather",
      },
      {
        label: "Reinforced armor",
        value: "reinforced armor",
      },
      {
        label: "High-tech fiber",
        value: "high-tech fiber",
      },
      {
        label: "Organic weave",
        value: "organic weave",
      },
      {
        label: "Dragonhide",
        value: "dragonhide",
      },
      {
        label: "Mystic cloth",
        value: "mystic cloth",
      },
      {
        label: "Weatherproof fabric",
        value: "weatherproof fabric",
      },
      {
        label: "Contest sparkle",
        value: "contest sparkle",
      },
      {
        label: "Ranger leather",
        value: "ranger leather",
      },
      {
        label: "Tech mesh",
        value: "tech mesh",
      },
      {
        label: "Pokéball steel",
        value: "pokeball steel",
      },
    ],
  },
  {
    title: "Accessory",
    key: "accessory",
    data: [
      {
        label: "Utility belt",
        value: "utility belt",
      },
      {
        label: "Gloves",
        value: "gloves",
      },
      {
        label: "Scarf",
        value: "scarf",
      },
      {
        label: "Headgear",
        value: "headgear",
      },
      {
        label: "Jewelry",
        value: "jewelry",
      },
      {
        label: "Bandolier",
        value: "bandolier",
      },
      {
        label: "Magic tome",
        value: "magic tome accessory",
      },
      {
        label: "Pokéball belt",
        value: "pokeball belt",
      },
      {
        label: "Rotom phone",
        value: "rotom phone",
      },
      {
        label: "Z-crystal pendant",
        value: "z crystal pendant",
      },
      {
        label: "Badge case",
        value: "badge case",
      },
      {
        label: "Pokedex",
        value: "pokedex",
      },
    ],
  },
  {
    title: "Trainer Type",
    key: "trainer_type",
    data: [
      {
        label: "Ace trainer",
        value: "ace trainer",
      },
      {
        label: "Coordinator",
        value: "coordinator",
      },
      {
        label: "Ranger",
        value: "ranger",
      },
      {
        label: "Researcher",
        value: "researcher",
      },
      {
        label: "Gym leader",
        value: "gym leader",
      },
    ],
  },
];

const examples = [
  {
    image: "https://cdn.ocmaker.app/example/pokemon-oc-generated-1.webp",
    prompt:
      "1girl, brown hair, hazel eyes, confident smile, pokemon trainer outfit, pokemon league cap, pokeball belt, trainer gloves, pikachu on shoulder, adventure pose, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/pokemon-oc-generated-2.webp",
    prompt:
      "1boy, silver hair, blue eyes, serious expression, team rocket uniform, black and red outfit with 'R' logo, pokemon capture device, sneaky pose, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/pokemon-oc-generated-3.webp",
    prompt:
      "1girl, long green hair, emerald eyes, gentle smile, pokemon coordinator dress, contest ribbon accessories, graceful pose, pokemon contest stage background, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/pokemon-oc-generated-4.webp",
    prompt:
      "1boy, spiky red hair, orange eyes, determined grin, gym leader outfit, fire-type themed clothing, gym badge on jacket, confident stance, single character, upper body, looking at viewer, anime style, simple background",
  },
];

export default {
  meta: {
    title: "Pokemon OC Maker",
    description:
      "Generate your own Pokemon character OC with AI. Create trainers, gym leaders, team members, and coordinators in the iconic Pokemon universe style.",
  },
  series: "Pokemon",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Pokemon OC Maker",
      description:
        "Generate your own Pokemon character OC with AI. Create trainers, gym leaders, team members, and coordinators in the iconic Pokemon universe style.",
    },
    step: {
      title: "How to Make Pokemon OC",
      description:
        "Creating your Pokemon trainer is an exciting journey. Follow these steps to design your perfect character for exploring the Pokemon world.",
      steps: [
        {
          title: "Choose Your Trainer Type",
          description:
            "Decide what kind of Pokemon character you want to create: Pokemon Trainer, Gym Leader, Elite Four member, Team Rocket agent, Pokemon Coordinator, or Pokemon Breeder. Each role has distinct visual characteristics and outfit styles.",
        },
        {
          title: "Design Appearance and Pokemon Team",
          description:
            "Describe your character's appearance, clothing style, and favorite Pokemon types. Include details like preferred Pokemon partners, specialty badges, contest ribbons, or team affiliations to make your trainer more authentic.",
        },
        {
          title: "Generate Your Pokemon Character",
          description:
            "Click 'Generate Character' to bring your Pokemon OC to life. Choose from multiple AI-generated designs that capture the classic Pokemon anime art style and adventure spirit.",
        },
      ],
    },
    examples: {
      title: "Pokemon Trainer Examples",
      description:
        "Discover amazing Pokemon characters created with text prompts using the Pokemon OC Maker.",
      examples,
    },
    features: {
      title: "What is Pokemon OC Maker?",
      description:
        "Pokemon OC Maker is designed specifically for the Pokemon universe. Create authentic characters with distinct trainer classes, regional styles, and Pokemon partnership themes.",
      features: [
        {
          label: "Authentic Pokemon Art Style",
          description:
            "Generate characters that perfectly match Pokemon's beloved anime aesthetic, from character proportions to iconic trainer outfits and Pokemon world elements.",
        },
        {
          label: "Diverse Trainer Classes",
          description:
            "Our AI understands various trainer roles - from gym leaders and elite four members to coordinators and team members - ensuring accurate role-specific designs.",
        },
        {
          label: "Instant Character Creation",
          description:
            "Create stunning Pokemon-style trainers in seconds, allowing you to focus on developing their teams, backstories, and adventures in the Pokemon world.",
        },
        {
          label: "High-Quality Anime Artwork",
          description:
            "Powered by AI trained on Pokemon's visual standards, delivering character art that matches the franchise's iconic anime style and quality.",
        },
        {
          label: "Multiple Design Options",
          description:
            "Generate several character interpretations per prompt, exploring different outfits, poses, and trainer specializations to find your perfect Pokemon OC.",
        },
        {
          label: "Pokemon World Integration",
          description:
            "Create characters that naturally fit into Pokemon's rich universe, with authentic regional influences, trainer gear, and Pokemon partnership themes.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is Pokemon OC Maker and how does it work?",
          answer:
            "Pokemon OC Maker is an AI tool specialized for creating original Pokemon characters. Describe your trainer's appearance, role, and Pokemon specialties, and our AI generates authentic Pokemon-style artwork.",
        },
        {
          question: "How can I create better characters with Pokemon OC Maker?",
          answer:
            "Include specific Pokemon elements like trainer class (Gym Leader, Elite Four, etc.), favorite Pokemon types, regional origins, contest achievements, or team affiliations. The more Pokemon-specific details you include, the better the results.",
        },
        {
          question: "Is Pokemon OC Maker free to use?",
          answer:
            "Yes, Pokemon OC Maker offers free character generation with core features. Premium plans provide faster generation, more trainer class options, and advanced customization tools.",
        },
        {
          question: "What makes Pokemon OC Maker's results so authentic?",
          answer:
            "Our AI is specifically trained on Pokemon's art style and world-building, understanding trainer archetypes, regional aesthetics, and the franchise's distinctive character design principles.",
        },
        {
          question:
            "Can I use characters created with Pokemon OC Maker commercially?",
          answer:
            "Yes, all original characters you create are yours to use for personal and commercial projects. We don't claim ownership of your trainer designs or Pokemon OCs.",
        },
        {
          question: "Do I need an account to use Pokemon OC Maker?",
          answer:
            "No account required for basic use. Creating an account allows you to save trainers, access generation history, and unlock premium Pokemon-themed features.",
        },
        {
          question: "Can I create different types of Pokemon trainers?",
          answer:
            "Absolutely! Create any trainer type including Gym Leaders, Elite Four members, Pokemon Coordinators, Team Rocket agents, Pokemon Breeders, Professors, and regular Pokemon Trainers.",
        },
        {
          question: "Will you add more anime franchise OC Makers?",
          answer:
            "Yes! We're expanding to include other beloved anime universes and gaming franchises. Follow our updates for new themed OC Makers inspired by popular series.",
        },
      ],
    },
    cta: {
      title: "Start Your Pokemon Journey",
      description:
        "Design your ultimate Pokemon trainer — no artistic skills required. Just imagine, describe, and explore the wonderful world of Pokemon.",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
