const basePrompt = `
  WORLD CONTEXT:
  Universe: The Apothecary Diaries
  Setting: Feudal-inspired imperial capital, Inner Palace intrigue, herbal medicine, poison cases, court politics
  Key Circles: Inner Palace maids and concubines, Imperial Court physicians, apothecaries of the Pleasure District, covert investigators, noble households

  OUTPUT FORMAT:
  Name, Social Status & Workplace, Medical or Investigative Specialty, Allies/Patrons, Personality, Signature Case, Backstory Snapshot

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Inner Palace Herbalist",
    description:
      "A clever maid who solves poisonings while brewing cures in secret.",
    prompt: `What is your character's name?
Ruolan Mei

What is their social status and workplace?
Low-born maid assigned to the Jade Pavilion of the Inner Palace

What is their medical or investigative specialty?
Diagnosing exotic poisons through taste tests and herbal counteragents

Who are their key allies or patrons?
The Imperial Physician and a sympathetic favored concubine

How would you describe their personality?
Wry, fearless, insatiably curious about court gossip

What signature case made them notable?
Unraveled a slow-acting arsenic plot by decoding tea stains on porcelain cups

Share a brief backstory snapshot.
Sold into service as a child, she smuggled her father's herb scrolls into the palace and now saves lives between chores.`,
  },
  {
    title: "Pleasure District Apothecary",
    description:
      "A streetwise healer balancing clientele between courtesans and criminals.",
    prompt: `What is your character's name?
Han Suyin

What is their social status and workplace?
Registered apothecary in the Honglan pleasure quarter

What is their medical or investigative specialty?
Formulating antidotes for counterfeit cosmetics and hidden venoms

Who are their key allies or patrons?
A brothel madam, a wandering monk, and a retired assassin

How would you describe their personality?
Bold, sarcastic, fiercely protective of her patients

What signature case made them notable?
Identified mercury-laced rouge before it disfigured a visiting royal

Share a brief backstory snapshot.
Once a runaway concubine trainee, she learned trade secrets from traveling medicinal caravans to win her freedom.`,
  },
  {
    title: "Imperial Court Scrivener",
    description:
      "A junior scribe who exposes corruption by combing through case records.",
    prompt: `What is your character's name?
Xu Wenyan

What is their social status and workplace?
Scholar-official in the Imperial Medical Bureau archives

What is their medical or investigative specialty?
Cross-referencing ledgers to spot tampered remedies and embezzled supplies

Who are their key allies or patrons?
A reform-minded minister and a reclusive archivist librarian

How would you describe their personality?
Meticulous, soft-spoken, driven by quiet moral outrage

What signature case made them notable?
Proved tonic shipments were replaced with sawdust before reaching the nursery

Share a brief backstory snapshot.
Choosing medicine over politics after the provincial exams, Wenyan believes accurate ledgers save more lives than swords.`,
  },
  {
    title: "Traveling Tea Doctor",
    description:
      "An itinerant healer who collects gossip with every brew of medicinal tea.",
    prompt: `What is your character's name?
Lan Jiayi

What is their social status and workplace?
Freeborn tea seller roaming between noble estates and rural temples

What is their medical or investigative specialty?
Diagnosing ailments through tea pairings and pulse readings on the road

Who are their key allies or patrons?
Temple monks, farmers' guilds, and a masked opera performer

How would you describe their personality?
Cheerful, persuasive, perfectly at ease among any class

What signature case made them notable?
Unmasked a counterfeit tax collector by spotting arsenic in his jasmine blend

Share a brief backstory snapshot.
Lan apprenticed under her grandmother, hiding remedies in tea leaves while evading corrupt officials and bandits alike.`,
  },
  {
    title: "Royal Forensics Scholar",
    description:
      "A forensic innovator bringing new deduction techniques to the emperor's court.",
    prompt: `What is your character's name?
Shen Qihong

What is their social status and workplace?
First-rank scholar serving as adjunct examiner in the high court

What is their medical or investigative specialty?
Applying ink powder, fingerprint rubbings, and botanical tracings to crime scenes

Who are their key allies or patrons?
The Crown Prince and a skeptical yet intrigued imperial judge

How would you describe their personality?
Methodical, unflappable, quietly ambitious for reform

What signature case made them notable?
Matched rare pollen to a rival's greenhouse, clearing an innocent noble

Share a brief backstory snapshot.
After witnessing a wrongful conviction in their prefecture, Qihong vowed to fuse scholarship with forensic science.`,
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
        label: "Young palace maid",
        value: "young palace maid",
      },
      {
        label: "Market apothecary",
        value: "market apothecary adult",
      },
      {
        label: "Seasoned court physician",
        value: "seasoned court physician",
      },
      {
        label: "Retired noble healer",
        value: "retired healer",
      },
      {
        label: "Traveling elder herbalist",
        value: "elder herbalist",
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
        label: "Inner palace hanfu",
        value: "inner palace hanfu",
      },
      {
        label: "Embroidered scholar robe",
        value: "embroidered scholar robe",
      },
      {
        label: "Aproned apothecary vest",
        value: "apothecary vest",
      },
      {
        label: "Traveling tea coat",
        value: "traveling tea coat",
      },
      {
        label: "Court intrigue cloak",
        value: "court intrigue cloak",
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
        label: "Silk pleated skirt",
        value: "silk pleated skirt",
      },
      {
        label: "Layered healer pants",
        value: "layered healer pants",
      },
      {
        label: "Market street trousers",
        value: "market street trousers",
      },
      {
        label: "Elegant palace train",
        value: "palace train",
      },
      {
        label: "Sturdy traveler leggings",
        value: "sturdy traveler leggings",
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
        label: "Inner Palace attendant",
        value: "inner palace attendant set",
      },
      {
        label: "Pleasure district healer",
        value: "pleasure district healer set",
      },
      {
        label: "Imperial physician formal",
        value: "imperial physician formal set",
      },
      {
        label: "Tea caravan wanderer",
        value: "tea caravan wanderer outfit",
      },
      {
        label: "Discreet poison investigator",
        value: "poison investigator disguise",
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
        label: "Dyed palace silk",
        value: "dyed palace silk",
      },
      {
        label: "Embroidered brocade",
        value: "embroidered brocade",
      },
      {
        label: "Lacquered bamboo",
        value: "lacquered bamboo",
      },
      {
        label: "Weathered cotton",
        value: "weathered cotton",
      },
      {
        label: "Perfumed muslin",
        value: "perfumed muslin",
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
        label: "Medicine satchel",
        value: "medicine satchel",
      },
      {
        label: "Porcelain hairpin",
        value: "porcelain hairpin",
      },
      {
        label: "Tea ceremony fan",
        value: "tea ceremony fan",
      },
      {
        label: "Herbal mortar necklace",
        value: "herbal mortar necklace",
      },
      {
        label: "Imperial seal bracelet",
        value: "imperial seal bracelet",
      },
    ],
  },
];

const examples = [
  {
    image:
      "https://cdn.ocmaker.app/example/apothecary-oc-maker-generated-1.webp",
    prompt:
      "1girl, long black hair with hair ornaments, amber eyes, clever expression, apothecary diaries style chinese palace dress, medicine pouch, holding herbs, imperial palace setting, anime style, looking at viewer, simple background, upper body",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/apothecary-oc-maker-generated-2.webp",
    prompt:
      "1girl, purple hair in elaborate updo, green eyes, mysterious smile, apothecary diaries style court lady hanfu, jade accessories, fan, elegant pose, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/apothecary-oc-maker-generated-3.webp",
    prompt:
      "1boy, dark hair with topknot, sharp blue eyes, serious expression, apothecary diaries style imperial guard uniform, sword at side, protective stance, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/apothecary-oc-maker-generated-4.webp",
    prompt:
      "1girl, red hair with traditional accessories, golden eyes, mischievous grin, apothecary diaries style servant outfit, carrying tea tray, palace maid, single character, upper body, looking at viewer, anime style, simple background",
  },
];

export default {
  meta: {
    title: "The Apothecary Diaries OC Maker",
    description:
      "Generate your own Apothecary Diaries OC with AI. Create characters, backstories, and visuals in the elegant world of imperial palace intrigue and medicine.",
  },
  series: "The Apothecary Diaries",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "The Apothecary Diaries OC Maker",
      description:
        "Generate your own Apothecary Diaries OC with AI. Create characters, backstories, and visuals in the elegant world of imperial palace intrigue and medicine.",
    },
    step: {
      title: "How to Make Apothecary Diaries OC",
      description:
        "Creating an Apothecary Diaries-style character with OC Maker is easy. Just follow these steps to bring your palace character to life.",
      steps: [
        {
          title: "Describe Your Apothecary Diaries OC",
          description:
            "Fill in the form with your character's basic appearance and personality. For best results, include Apothecary Diaries-style features like traditional Chinese clothing, palace roles, medical knowledge, and the cunning spirit of court intrigue.",
        },
        {
          title: "Add Details and Palace Elements",
          description:
            "Include extra details like their role in the palace (pharmacist, concubine, guard, servant), medical specialties, or connections to palace mysteries. The more your character fits into the imperial court setting, the more authentic the result will be.",
        },
        {
          title: "Generate and Finalize Design",
          description:
            "Click the 'Generate Character' button to create your Apothecary Diaries OC. You'll get several AI-generated designs — pick your favorite to complete your character.",
        },
      ],
    },
    examples: {
      title: "Apothecary Diaries Examples",
      description:
        "Explore Apothecary Diaries characters made from text prompts, created using the Apothecary Diaries OC Maker.",
      examples,
    },
    features: {
      title: "What is Apothecary Diaries OC Maker?",
      description:
        "Apothecary Diaries OC Maker is a version of OC Maker fine-tuned for the world of The Apothecary Diaries. Describe your character, and instantly turn it into imperial palace-style artwork.",
      features: [
        {
          label: "Authentic Palace Character Design",
          description:
            "Create characters that truly capture the elegant atmosphere of The Apothecary Diaries, designed to seamlessly fit into the world of imperial courts, medicine, and palace intrigue.",
        },
        {
          label: "Tailored Prompt Tuning",
          description:
            "Prompts are fine-tuned for Apothecary Diaries aesthetics — from traditional Chinese garments to palace hierarchy — helping you build more convincing characters.",
        },
        {
          label: "Fast Character Generation",
          description:
            "Generate high-quality characters in just seconds, allowing you to focus more on refining ideas and less on waiting.",
        },
        {
          label: "High-Quality Visual Output",
          description:
            "Powered by advanced AI models, Apothecary Diaries OC Maker delivers detailed, high-resolution character images suitable for storytelling, design, or sharing.",
        },
        {
          label: "Choose from Multiple Results",
          description:
            "Generate multiple character options per prompt and select your favorites to finalize as your official Apothecary Diaries OC.",
        },
        {
          label: "Deep Story Integration",
          description:
            "Bring your OC to life with not just visuals, but also compelling backstories, medical knowledge, palace positions, and rich connections to the mystery-solving world of The Apothecary Diaries.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is Apothecary Diaries OC Maker and how does it work?",
          answer:
            "Apothecary Diaries OC Maker is a specialized version of OC Maker, fine-tuned for The Apothecary Diaries universe. Simply describe your character, and our AI will generate palace-style visuals in seconds based on your prompt.",
        },
        {
          question:
            "How can I create better characters with Apothecary Diaries OC Maker?",
          answer:
            "For best results, include Apothecary Diaries-specific traits in your description, such as traditional Chinese clothing details, palace roles, medical tools, or personality traits suited for court life. The more vivid and detailed your input, the more accurate and compelling the output.",
        },
        {
          question: "Is Apothecary Diaries OC Maker free to use?",
          answer:
            "Yes, Apothecary Diaries OC Maker offers free character generation with basic features. For faster results, premium options, and additional control, you can upgrade your plan anytime.",
        },
        {
          question:
            "What makes Apothecary Diaries OC Maker's results so impressive?",
          answer:
            "Apothecary Diaries OC Maker uses cutting-edge AI models fine-tuned for the palace setting, ensuring characters match the distinctive art style and elegant atmosphere of the series.",
        },
        {
          question:
            "Can I use characters made with Apothecary Diaries OC Maker for commercial projects?",
          answer:
            "Yes, any characters you create using Apothecary Diaries OC Maker are yours to use freely for both personal and commercial purposes. We do not claim ownership over your creations.",
        },
        {
          question: "Do I need an account to use Apothecary Diaries OC Maker?",
          answer:
            "No account is required for basic use. However, creating an account lets you save your characters, track generation history, and access more features.",
        },
        {
          question:
            "Can I regenerate or fine-tune the same character in Apothecary Diaries OC Maker?",
          answer:
            "Yes, you can regenerate results from the same prompt or adjust your inputs to refine your character until it fits your vision perfectly.",
        },
        {
          question:
            "Will there be more anime-style OC Makers like Apothecary Diaries OC Maker?",
          answer:
            "Yes! We plan to release more specialized OC Makers tailored for different anime universes. Stay tuned for future updates on ocmaker.app.",
        },
      ],
    },
    cta: {
      title: "Create Your Own Palace Character",
      description:
        "Bring your original Apothecary Diaries character to life — no drawing skills needed. Just describe, generate, and explore the world of palace mysteries.",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
