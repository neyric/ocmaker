const basePrompt = `
  WORLD CONTEXT:
  Universe: Bungo Stray Dogs
  Setting: Yokohama's underworld, literary ability users, detective agency missions, mafia turf wars, government watchdogs
  Key Factions: Armed Detective Agency, Port Mafia, Special Division for Unusual Powers, Guild, Decay of the Angel, Rats in the House of the Dead

  OUTPUT FORMAT:
  Name, Ability Title & Function, Affiliation, Combat/Support Role, Ability Conditions/Weaknesses, Personality, Past Incident

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Detective Illusionist",
    description:
      "An Agency sleuth who weaponizes stagecraft to disorient foes.",
    prompt: `What is your character's name?
Hanae Sazanami

What is their Ability title and function?
Ability: Theatre of Mist — conjures tactile illusions within spotlighted zones

Which affiliation do they belong to?
Armed Detective Agency

What combat or support role do they fill?
Field investigator providing deception and misdirection

What conditions or weaknesses come with their Ability?
Requires a physical prop to anchor each illusion; bright noon light weakens it

How would you describe their personality?
Cheerful, empathetic, always quoting classic plays

Share a notable past incident.
Exposed a Port Mafia smuggling ring by staging a fake hostage production inside an abandoned warehouse.`,
  },
  {
    title: "Port Mafia Courier",
    description:
      "A courier whose ability lets him fuse with graffiti to travel unseen.",
    prompt: `What is your character's name?
Kazuo Graff

What is their Ability title and function?
Ability: Fresco Passage — enters murals and exits any connected painting

Which affiliation do they belong to?
Port Mafia logistics arm

What combat or support role do they fill?
Smuggler and rapid-response scout

What conditions or weaknesses come with their Ability?
Only works on painted surfaces created within the last seven days

How would you describe their personality?
Cynical, loyal to friends, fond of street art

Share a notable past incident.
Saved Akutagawa from an ambush by dragging him into a graffiti tunnel moments before bullets struck.`,
  },
  {
    title: "Special Division Archivist",
    description:
      "A government agent who weaponizes literature to freeze criminals in their tracks.",
    prompt: `What is your character's name?
Mariko Verse

What is their Ability title and function?
Ability: Stanza Arrest — recites poetry that manifests binding chains

Which affiliation do they belong to?
Special Division for Unusual Powers

What combat or support role do they fill?
Arrest specialist and intelligence officer

What conditions or weaknesses come with their Ability?
Chains break if she misquotes a line or loses rhythm

How would you describe their personality?
Disciplined, polite, hides dry humor behind etiquette

Share a notable past incident.
Captured a rogue Ability user by quoting their own unpublished manuscript back at them word for word.`,
  },
  {
    title: "Guild Negotiator",
    description:
      "An American expatriate balancing profit and conscience in Yokohama.",
    prompt: `What is your character's name?
Elias Monroe

What is their Ability title and function?
Ability: Golden Contract — seals deals with energy barriers

Which affiliation do they belong to?
The Guild (independent consultant)

What combat or support role do they fill?
Negotiator and battlefield shield support

What conditions or weaknesses come with their Ability?
Barrier collapses if either party breaks their spoken promise

How would you describe their personality?
Suave, opportunistic, surprisingly sentimental

Share a notable past incident.
Brokered a truce between the Agency and Guild by wagering his ability on the safe return of civilian hostages.`,
  },
  {
    title: "Decay Insider",
    description:
      "A spy who infiltrated the Decay of the Angel at great personal cost.",
    prompt: `What is your character's name?
Chiyo Fable

What is their Ability title and function?
Ability: Paper Labyrinth — folds any document into reality-bending mazes

Which affiliation do they belong to?
Double agent for the Hunting Dogs

What combat or support role do they fill?
Intel courier weaving escape routes for allies

What conditions or weaknesses come with their Ability?
Labyrinth collapses if someone burns or tears the paper

How would you describe their personality?
Grim, resolute, strangely hopeful about humanity

Share a notable past incident.
Guided trapped civilians out of the Sky Casino by folding evacuation maps into a tangible escape corridor.`,
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
        label: "Teen ability user",
        value: "teen ability user",
      },
      {
        label: "Young detective",
        value: "young detective",
      },
      {
        label: "Mafia officer",
        value: "mafia officer",
      },
      {
        label: "Armed detective veteran",
        value: "armed detective veteran",
      },
      {
        label: "Mystery novelist elder",
        value: "novelist elder",
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
        label: "Armed Detective trench",
        value: "armed detective trench",
      },
      {
        label: "Port Mafia coat",
        value: "port mafia coat",
      },
      {
        label: "Casual ability jacket",
        value: "casual ability jacket",
      },
      {
        label: "Guild suit",
        value: "guild suit",
      },
      {
        label: "Decay of Angel robes",
        value: "decay of angel robes",
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
        label: "Tailored slacks",
        value: "tailored slacks",
      },
      {
        label: "Suspenders trousers",
        value: "suspenders trousers",
      },
      {
        label: "High-waist skirt",
        value: "high waist skirt",
      },
      {
        label: "Street jeans",
        value: "street jeans",
      },
      {
        label: "Battle-ready pants",
        value: "battle ready pants",
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
        label: "Armed Detective Agency",
        value: "armed detective set",
      },
      {
        label: "Port Mafia enforcer",
        value: "port mafia enforcer set",
      },
      {
        label: "Special Division inspector",
        value: "special division inspector set",
      },
      {
        label: "Guild envoy",
        value: "guild envoy set",
      },
      {
        label: "Decay of Angel conspirator",
        value: "decay of angel conspirator",
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
        label: "Wool trench fabric",
        value: "wool trench fabric",
      },
      {
        label: "Leather holster straps",
        value: "leather holster straps",
      },
      {
        label: "Silk-lined coat",
        value: "silk lined coat",
      },
      {
        label: "Urban canvas",
        value: "urban canvas",
      },
      {
        label: "Shadow weave",
        value: "shadow weave",
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
        label: "Ability gloves",
        value: "ability gloves",
      },
      {
        label: "Mafia tattoo",
        value: "mafia tattoo",
      },
      {
        label: "Detective notebook",
        value: "detective notebook",
      },
      {
        label: "Ability suppressor cuffs",
        value: "ability suppressor cuffs",
      },
      {
        label: "Guild crest pin",
        value: "guild crest pin",
      },
    ],
  },
  {
    title: "Affiliation",
    key: "bsd_affiliation",
    data: [
      {
        label: "Armed Detective Agency",
        value: "armed detective agency",
      },
      {
        label: "Port Mafia",
        value: "port mafia",
      },
      {
        label: "Special Division",
        value: "special division",
      },
      {
        label: "The Guild",
        value: "the guild",
      },
      {
        label: "Decay of Angel",
        value: "decay of angel",
      },
    ],
  },
];

const examples = [
  {
    image:
      "https://cdn.ocmaker.app/example/bungo-stray-dogs-oc-generated-1.webp",
    prompt:
      "1boy, messy black hair, heterochromia eyes, mysterious smile, armed detective agency outfit, brown coat, literary book accessory, ability activation pose, single character, upper body, looking at viewer, anime style, yokohama background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/bungo-stray-dogs-oc-generated-2.webp",
    prompt:
      "1girl, long silver hair, purple eyes, elegant expression, port mafia executive suit, black formal outfit with red accents, ability aura effects, confident stance, single character, upper body, looking at viewer, anime style, noir atmosphere",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/bungo-stray-dogs-oc-generated-3.webp",
    prompt:
      "1boy, short blonde hair, green eyes, gentle smile, guild member uniform, victorian-style outfit, pocket watch accessory, scholarly pose with book, single character, upper body, looking at viewer, anime style, library background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/bungo-stray-dogs-oc-generated-4.webp",
    prompt:
      "1girl, twin braids red hair, golden eyes, mischievous grin, decay of angels outfit, gothic lolita dress, supernatural ability effects, playful pose, single character, upper body, looking at viewer, anime style, mysterious background",
  },
];

export default {
  meta: {
    title: "Bungo Stray Dogs OC Maker",
    description:
      "Generate your own Bungo Stray Dogs character OC with AI. Create ability users inspired by literary figures with unique supernatural powers and organization affiliations.",
  },
  series: "Bungo Stray Dogs",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Bungo Stray Dogs OC Maker",
      description:
        "Generate your own Bungo Stray Dogs character OC with AI. Create ability users inspired by literary figures with unique supernatural powers and organization affiliations.",
    },
    step: {
      title: "How to Make Bungo Stray Dogs OC",
      description:
        "Join the world of literary ability users in Yokohama. Follow these steps to design your supernatural detective or mafia executive.",
      steps: [
        {
          title: "Choose Your Organization",
          description:
            "Select your character's affiliation: Armed Detective Agency, Port Mafia, The Guild, Decay of Angels, or Government Special Division. Each organization has distinct uniforms, philosophies, and operational styles.",
        },
        {
          title: "Design Ability and Literary Inspiration",
          description:
            "Create your character's supernatural ability based on a literary work or author. Describe their appearance, personality, and how their ability manifests. Include their literary inspiration and ability name for authenticity.",
        },
        {
          title: "Generate Your Ability User",
          description:
            "Click 'Generate Character' to bring your Bungo Stray Dogs OC to life. Select from multiple AI-generated designs that capture the series' noir aesthetic and supernatural action style.",
        },
      ],
    },
    examples: {
      title: "Ability User Examples",
      description:
        "Explore amazing literary-inspired characters created with text prompts using the Bungo Stray Dogs OC Maker.",
      examples,
    },
    features: {
      title: "What is Bungo Stray Dogs OC Maker?",
      description:
        "Bungo Stray Dogs OC Maker is designed specifically for the literary supernatural universe. Create authentic ability users with organization ties, unique powers, and literary themes.",
      features: [
        {
          label: "Authentic BSD Art Style",
          description:
            "Generate characters that perfectly match Bungo Stray Dogs' distinctive art style, from dramatic ability effects to stylish organization uniforms and noir aesthetics.",
        },
        {
          label: "Organization System Integration",
          description:
            "Our AI understands all major organizations and their characteristics, ensuring your character's outfit, demeanor, and style match their chosen affiliation perfectly.",
        },
        {
          label: "Literary Ability Creation",
          description:
            "Create ability users in seconds with powers inspired by literature, perfect for detective missions, mafia operations, or supernatural conflicts in Yokohama.",
        },
        {
          label: "High-Quality Action Artwork",
          description:
            "Powered by AI trained on BSD's visual standards, delivering character art that captures the series' blend of action, mystery, and literary sophistication.",
        },
        {
          label: "Multiple Ability Variations",
          description:
            "Generate several character interpretations per prompt, exploring different abilities, organization roles, and combat styles to find your perfect ability user design.",
        },
        {
          label: "Yokohama World Integration",
          description:
            "Create characters that naturally fit into BSD's supernatural Yokohama, with authentic organization cultures, ability manifestations, and literary references.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is Bungo Stray Dogs OC Maker and how does it work?",
          answer:
            "Bungo Stray Dogs OC Maker is an AI tool specialized for creating original BSD characters. Describe your character's ability, organization, and literary inspiration, and our AI generates authentic BSD-style artwork.",
        },
        {
          question:
            "How can I create better characters with Bungo Stray Dogs OC Maker?",
          answer:
            "Include specific BSD elements like organization affiliations, ability names based on literary works, combat styles, and character relationships. Reference real authors or literature for more authentic ability users.",
        },
        {
          question: "Is Bungo Stray Dogs OC Maker free to use?",
          answer:
            "Yes, Bungo Stray Dogs OC Maker offers free character generation with basic features. Premium plans provide faster generation, more organization options, and advanced ability customization tools.",
        },
        {
          question:
            "What makes Bungo Stray Dogs OC Maker's results so authentic?",
          answer:
            "Our AI is specifically trained on BSD's art style and supernatural themes, understanding organization aesthetics, ability manifestations, and the series' distinctive noir atmosphere.",
        },
        {
          question:
            "Can I use characters created with BSD OC Maker commercially?",
          answer:
            "Yes, all original characters you create are yours to use for personal and commercial projects. We don't claim ownership of your ability user designs or BSD OCs.",
        },
        {
          question: "Do I need an account to use Bungo Stray Dogs OC Maker?",
          answer:
            "No account required for basic use. Creating an account allows you to save characters, access generation history, and unlock premium BSD-themed features.",
        },
        {
          question: "Can I create characters from different organizations?",
          answer:
            "Absolutely! Create members of the Armed Detective Agency, Port Mafia executives, Guild operatives, government agents, or even rogue ability users. Mix literary inspirations and abilities freely.",
        },
        {
          question: "Are more supernatural anime OC makers being developed?",
          answer:
            "Yes! We're expanding to include other supernatural action series with unique power systems. Follow our updates for new themed OC makers inspired by ability-based stories.",
        },
      ],
    },
    cta: {
      title: "Awaken Your Literary Ability",
      description:
        "Design your ultimate ability user — no artistic skills required. Just imagine, describe, and join the supernatural conflicts of Yokohama.",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
