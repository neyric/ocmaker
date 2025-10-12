const basePrompt = `
  WORLD CONTEXT:
  Universe: One Piece
  Setting: Grand Line seas, Straw Hat era, Devil Fruits, Haki, whimsical islands with unique cultures and climates
  Key Factions: Pirates across the Four Seas, Straw Hats and rival crews, Marines/World Government, Shichibukai, Revolutionary Army, Yonko territories, Cipher Pol units, Celestial Dragons

  OUTPUT FORMAT:
  Name, Crew or Allegiance, Role & Combat Style, Devil Fruit or Haki, Signature Traits, Personal Dream, Backstory Snapshot

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Laughing Navigator",
    description:
      "A navigator whose laughter charts currents no log pose can track.",
    prompt: `What is your character's name?
Marin Tidewell

Which crew or allegiance do they claim?
Straw Hat Grand Fleet ally captaining the Tidewell Pirates

What is their role and combat style?
Navigator-fencer balancing on a tideboard

What Devil Fruit or Haki do they wield?
Observation Haki and the Swirl Swirl Fruit that redirects whirlpools

What signature traits define them?
Always humming sea shanties, tattoos of sea charts on her arms

What personal dream drives them?
To chart the Laugh Tale current for every free sailor

Share a backstory snapshot.
Escaped a World Government research ship by surfing a Maelstrom using her newly awakened Swirl Swirl Fruit.`,
  },
  {
    title: "Cipher Pol Defector",
    description:
      "A former CP0 agent using Rokushiki in service of the Revolutionary Army.",
    prompt: `What is your character's name?
Cato Cipher

Which crew or allegiance do they claim?
Revolutionary Army intelligence unit

What is their role and combat style?
Martial arts spy blending Rokushiki and Fishman Karate

What Devil Fruit or Haki do they wield?
Armament Haki coating claws sharpened by Rankyaku

What signature traits define them?
Wears a fox mask, speaks in coded proverbs

What personal dream drives them?
To dismantle the Cipher Pol system that trained him

Share a backstory snapshot.
Defected after refusing to eliminate a village aiding Sabo; now feeds Dragon information on World Nobles.`,
  },
  {
    title: "Undersea Chef",
    description:
      "A fishman chef serving gourmet feasts aboard a floating restaurant fleet.",
    prompt: `What is your character's name?
Chef Coral

Which crew or allegiance do they claim?
Baratie Blue Fleet

What is their role and combat style?
Chef-blade dancer wielding twin cleavers underwater

What Devil Fruit or Haki do they wield?
Fishman Karate with limited Armament Haki

What signature traits define them?
Collects shell spices, sings recipes mid-fight

What personal dream drives them?
To create a peace treaty banquet between Fishman Island and the surface

Share a backstory snapshot.
Once a Neptune Army cook, he left to teach humans to respect underwater cuisine through diplomacy.`,
  },
  {
    title: "Sky Island Cartographer",
    description: "A Skypiean cartographer exploring New World sky currents.",
    prompt: `What is your character's name?
Nimbus Lian

Which crew or allegiance do they claim?
Allied with the Straw Hat Fleet as a freelance cartographer

What is their role and combat style?
Aerial marksman using dial-powered wings

What Devil Fruit or Haki do they wield?
Observation Haki and Impact Dial shot enhancements

What signature traits define them?
Carries cloud jars, keeps a journal of every song she hears

What personal dream drives them?
To connect Skypiea islands with a network of cloud railways

Share a backstory snapshot.
Helped Nami map lightning routes after Enel's defeat, choosing adventure over staying in Aphelandra.`,
  },
  {
    title: "Wano Ronin",
    description:
      "A wandering samurai chronicling Kozuki history while dueling Beast Pirates remnants.",
    prompt: `What is your character's name?
Kyoji Kozuki

Which crew or allegiance do they claim?
Allied with the Nine Red Scabbards

What is their role and combat style?
Swordsman-historian wielding twin odachi

What Devil Fruit or Haki do they wield?
Advanced Armament Haki and Conqueror's Haki sparks

What signature traits define them?
Wears a half-burned kimono, hums old Kozuki lullabies

What personal dream drives them?
To publish a book recounting Wano's liberation for the Grand Line

Share a backstory snapshot.
Survived Orochi's purge by hiding in a theatre troupe; now records oral histories while protecting travelers.`,
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
        label: "Cabin boy/girl",
        value: "cabin crew teen",
      },
      {
        label: "Young pirate",
        value: "young pirate",
      },
      {
        label: "Seasoned crew",
        value: "seasoned crew",
      },
      {
        label: "Veteran captain",
        value: "veteran captain",
      },
      {
        label: "Legendary pirate",
        value: "legendary pirate",
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
        label: "Pirate coat",
        value: "pirate coat",
      },
      {
        label: "Marine uniform",
        value: "marine uniform top",
      },
      {
        label: "Revolutionary jacket",
        value: "revolutionary jacket",
      },
      {
        label: "Fishman kimono",
        value: "fishman kimono",
      },
      {
        label: "Sky island tunic",
        value: "sky island tunic",
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
        label: "Striped trousers",
        value: "striped trousers",
      },
      {
        label: "Sailor shorts",
        value: "sailor shorts",
      },
      {
        label: "High seas skirt",
        value: "high seas skirt",
      },
      {
        label: "Rough denim",
        value: "rough denim",
      },
      {
        label: "Marine slacks",
        value: "marine slacks",
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
        label: "Straw Hat style",
        value: "straw hat style",
      },
      {
        label: "Marine officer",
        value: "marine officer set",
      },
      {
        label: "Revolutionary army",
        value: "revolutionary army set",
      },
      {
        label: "Wano samurai",
        value: "wano samurai set",
      },
      {
        label: "Skypiea explorer",
        value: "skypiea explorer",
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
        label: "Weather-worn canvas",
        value: "weather worn canvas",
      },
      {
        label: "Marine polished cloth",
        value: "marine polished cloth",
      },
      {
        label: "Wano silk",
        value: "wano silk",
      },
      {
        label: "Fishman scales",
        value: "fishman scales",
      },
      {
        label: "Sky cloud fiber",
        value: "sky cloud fiber",
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
        label: "Straw hat",
        value: "straw hat",
      },
      {
        label: "Marine justice cape",
        value: "marine justice cape",
      },
      {
        label: "Den den mushi",
        value: "den den mushi",
      },
      {
        label: "Log pose",
        value: "log pose",
      },
      {
        label: "Wanted poster",
        value: "wanted poster",
      },
    ],
  },
  {
    title: "Faction",
    key: "op_faction",
    data: [
      {
        label: "Pirate",
        value: "pirate",
      },
      {
        label: "Marine",
        value: "marine",
      },
      {
        label: "Revolutionary",
        value: "revolutionary",
      },
      {
        label: "Bounty hunter",
        value: "bounty hunter",
      },
      {
        label: "World Noble",
        value: "world noble",
      },
    ],
  },
];

const examples = [
  {
    image:
      "https://cdn.ocmaker.app/example/one-piece-oc-maker-generated-1.webp",
    prompt:
      "1girl, long wavy blue hair, purple eyes, serious expression, customized navy uniform, torn cape, short shorts, thigh-high boots, seashell accessory, belt pouch, wind aura, dual blade pose, wind effect, pirate style, one piece style, fantasy outfit, looking at viewer, simple background, upper body",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/one-piece-oc-maker-generated-2.webp",
    prompt:
      "1boy, medium length dark red hair, sharp eyes, confident smile, young pirate captain, white open shirt, black coat, long pants, katana at waist, standing on ship deck, wind-blown cloak, battle-ready pose, one piece style, looking at viewer, simple background, upper body",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/one-piece-oc-maker-generated-3.webp",
    prompt:
      "1boy, muscular male, long black hair, red eyes, horns, mustache, angry expression, shirtless, open long coat, dragon tattoo, holding kanabo, one piece style, kaido (one piece), looking at viewer, simple background, upper body",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/one-piece-oc-maker-generated-4.webp",
    prompt:
      "1boy, muscular male, tall male, white mustache, slicked back white hair, stern expression, shirtless, open coat, captain's coat, white coat with red interior, holding bisento, attack pose, scars on chest, gold epaulettes, pirate hat (removed), one piece style, looking at viewer, simple background, upper body",
  },
];

export default {
  meta: {
    title: "One Piece OC Maker",
    description:
      "Generate your own One Piece OC with AI. Create characters, backstories, and visuals in the adventurous pirate style.",
  },
  series: "One Piece",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "One Piece OC Maker",
      description:
        "Generate your own One Piece OC with AI. Create characters, backstories, and visuals in the adventurous pirate style.",
    },
    step: {
      title: "How to Make One Piece OC",
      description:
        "Creating a One Piece-style character with OC Maker is easy. Just follow these two steps to bring your idea to life.",
      steps: [
        {
          title: "Describe Your One Piece OC",
          description:
            "Fill in the form with your character's basic appearance and personality. For best results, include One Piece-style features like colorful pirate outfits, unique hairstyles, and the adventurous spirit of a pirate seeking treasure.",
        },
        {
          title: "Add Details and Pirate Elements",
          description:
            "Include extra details like Devil Fruit powers, pirate crew affiliations, or unique weapons. The more your character fits into the One Piece universe of pirates, marines, and grand adventures, the more accurate and impressive the result will be.",
        },
        {
          title: "Generate and Finalize Design",
          description:
            "Click the 'Generate Character' button to create your One Piece OC. You'll get several AI-generated designs — pick your favorite to complete your character.",
        },
      ],
    },
    examples: {
      title: "One Piece Examples",
      description:
        "Explore One Piece characters made from text prompts, created using the One Piece OC Maker.",
      examples,
    },
    features: {
      title: "What is One Piece OC Maker?",
      description:
        "One Piece OC Maker is a version of OC Maker fine-tuned for the world of One Piece. Describe your character, and instantly turn it into One Piece-style artwork.",
      features: [
        {
          label: "Authentic One Piece Character Design",
          description:
            "Create characters that truly capture the adventurous pirate spirit of One Piece, designed to seamlessly fit into the world of Devil Fruits, pirate crews, and grand adventures.",
        },
        {
          label: "Tailored Prompt Tuning",
          description:
            "Prompts are fine-tuned for One Piece aesthetics — from colorful pirate outfits to unique Devil Fruit abilities — helping you build more convincing characters.",
        },
        {
          label: "Fast Character Generation",
          description:
            "Generate high-quality characters in just seconds, allowing you to focus more on refining ideas and less on waiting.",
        },
        {
          label: "High-Quality Visual Output",
          description:
            "Powered by advanced AI models, One Piece OC Maker delivers detailed, high-resolution character images suitable for storytelling, design, or sharing.",
        },
        {
          label: "Choose from Multiple Results",
          description:
            "Generate multiple character options per prompt and select your favorites to finalize as your official One Piece OC.",
        },
        {
          label: "Deep Story Integration",
          description:
            "Bring your OC to life with not just visuals, but also compelling backstories, crew dynamics, and rich connections to the One Piece universe.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is One Piece OC Maker and how does it work?",
          answer:
            "One Piece OC Maker is a specialized version of OC Maker, fine-tuned for the One Piece universe. Simply describe your character, and our AI will generate anime-style One Piece visuals in seconds based on your prompt.",
        },
        {
          question:
            "How can I create better characters with One Piece OC Maker?",
          answer:
            "For best results, include One Piece-specific traits in your description, such as Devil Fruit powers, pirate outfits, or crew affiliations. The more vivid and detailed your input, the more accurate and compelling the output.",
        },
        {
          question: "Is One Piece OC Maker free to use?",
          answer:
            "Yes, One Piece OC Maker offers free character generation with basic features. For faster results, premium options, and additional control, you can upgrade your plan anytime.",
        },
        {
          question: "What makes One Piece OC Maker's results so impressive?",
          answer:
            "One Piece OC Maker uses cutting-edge AI models fine-tuned for the One Piece setting, ensuring characters match the vibrant art style and adventurous spirit of the series.",
        },
        {
          question:
            "Can I use characters made with One Piece OC Maker for commercial projects?",
          answer:
            "Yes, any characters you create using One Piece OC Maker are yours to use freely for both personal and commercial purposes. We do not claim ownership over your creations.",
        },
        {
          question: "Do I need an account to use One Piece OC Maker?",
          answer:
            "No account is required for basic use. However, creating an account lets you save your characters, track generation history, and access more features.",
        },
        {
          question:
            "Can I regenerate or fine-tune the same character in One Piece OC Maker?",
          answer:
            "Yes, you can regenerate results from the same prompt or adjust your inputs to refine your character until it fits your vision perfectly.",
        },
        {
          question:
            "Will there be more anime-style OC Makers like One Piece OC Maker?",
          answer:
            "Yes! We plan to release more specialized OC Makers tailored for different anime universes. Stay tuned for future updates on ocmaker.app.",
        },
      ],
    },
    cta: {
      title: "Create Your Own One Piece Character",
      description:
        "Bring your original One Piece character to life — no drawing skills needed. Just describe, generate, and explore.",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
