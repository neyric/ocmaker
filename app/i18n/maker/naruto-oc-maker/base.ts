const basePrompt = `
  WORLD CONTEXT:
  Universe: Naruto / Shinobi World
  Setting: Hidden Villages system, chakra jutsu, ninja wars, Akatsuki conspiracies, samurai borders, tailed beasts
  Key Factions: Konoha, Suna, Kiri, Kumo, Iwa, Root/ANBU, Akatsuki, Otsutsuki legacy, rogue ninja, scientific shinobi weapons

  OUTPUT FORMAT:
  Name, Village & Rank, Clan/Kekkei Genkai, Chakra Nature & Signature Jutsu, Personality, Nindo (Ninja Way), Backstory Snapshot

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Leaf ANBU Tracker",
    description: "A Hidden Leaf tracker decoding enemy codes with sensory ninjutsu.",
    prompt: `What is your character's name?
Shin Kurogane

What is their village and rank?
Konohagakure, ANBU operative

Do they belong to a clan or possess a Kekkei Genkai?
Adopted into the Nara clan, no Kekkei Genkai

What chakra nature and signature jutsu do they use?
Shadow-infused Lightning Release creating chain-binding bolts

How would you describe their personality?
Calm, thoughtful, secretly sentimental

What is their nindo (ninja way)?
Even in the shadows, I protect those basking in the sun

Share a backstory snapshot.
Rescued by Shikamaru's father during the Fourth War, he now scouts rogue shinobi routes for the Hokage.`,
  },
  {
    title: "Sand Puppet Captain",
    description: "A Sunagakure captain commanding chakra-thread puppets with precision.",
    prompt: `What is your character's name?
Kaya Sabaku

What is their village and rank?
Sunagakure, jonin puppeteer

Do they belong to a clan or possess a Kekkei Genkai?
Sabaku clan artisan branch

What chakra nature and signature jutsu do they use?
Wind Release combined with chakra-thread puppet artillery

How would you describe their personality?
Strategic, protective, spirited

What is their nindo (ninja way)?
Every desert storm can be tamed with preparation

Share a backstory snapshot.
Designs healing puppets for Kankuro while leading missions to secure Sand's trade routes.`,
  },
  {
    title: "Mist Swordswoman",
    description: "A Hidden Mist swordswoman mastering silent assassination.",
    prompt: `What is your character's name?
Rei Hozuki

What is their village and rank?
Kirigakure, Seven Ninja Swordsmen trainee

Do they belong to a clan or possess a Kekkei Genkai?
Hozuki clan, water body manipulation

What chakra nature and signature jutsu do they use?
Water Release mist clones paired with electrified blade

How would you describe their personality?
Stoic, disciplined, quietly caring

What is their nindo (ninja way)?
A blade without purpose rusts; I fight to carve peace

Share a backstory snapshot.
Rebuilt one of the lost swords using liquefaction techniques taught by Suigetsu.`,
  },
  {
    title: "Cloud Sensor",
    description: "A Hidden Cloud sensory ninja coordinating lightning strikes from afar.",
    prompt: `What is your character's name?
Denki Raiju

What is their village and rank?
Kumogakure, chunin strategist

Do they belong to a clan or possess a Kekkei Genkai?
No clan; trained under Darui

What chakra nature and signature jutsu do they use?
Lightning Release radar pulses and thunderbolt sealing tags

How would you describe their personality?
Confident, witty, fiercely loyal

What is their nindo (ninja way)?
Strike fast, protect faster

Share a backstory snapshot.
Saved a whole platoon by intercepting a Jashinist ritual, earning praise from the Raikage.`,
  },
  {
    title: "Rogue Scholar",
    description: "A wandering Uzumaki historian gathering lost sealing scrolls.",
    prompt: `What is your character's name?
Akiko Uzumaki

What is their village and rank?
Independent wanderer, formerly Uzushiogakure

Do they belong to a clan or possess a Kekkei Genkai?
Uzumaki clan sealing prodigy

What chakra nature and signature jutsu do they use?
Sealing chains infused with Fire Release talismans

How would you describe their personality?
Kind, inquisitive, quietly rebellious

What is their nindo (ninja way)?
Knowledge belongs to everyone willing to protect it

Share a backstory snapshot.
Survived the fall of Uzushio and now assists Naruto's era by cataloging scrolls hidden across shinobi nations.`,
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
        value: "1boy"
      },
      {
        label: "Girl",
        value: "1girl"
      },
      {
        label: "Non-binary",
        value: "1person"
      }
    ]
  },
  {
    title: "Age",
    key: "age",
    data: [
      {
        label: "Young teen",
        value: "teen"
      },
      {
        label: "Late teen",
        value: "late teen"
      },
      {
        label: "Young adult",
        value: "young adult"
      },
      {
        label: "Experienced adult",
        value: "adult"
      },
      {
        label: "Veteran",
        value: "veteran"
      },
      {
        label: "Seasoned elder",
        value: "seasoned elder"
      },
      {
        label: "Timeless legend",
        value: "timeless legend"
      },
      {
        label: "Genin",
        value: "genin"
      },
      {
        label: "Chunin",
        value: "chunin"
      },
      {
        label: "Jonin",
        value: "jonin"
      },
      {
        label: "Anbu",
        value: "anbu"
      },
      {
        label: "Veteran kage",
        value: "veteran kage"
      }
    ]
  },
  {
    title: "Body",
    key: "body",
    data: [
      {
        label: "Slender",
        value: "slender"
      },
      {
        label: "Athletic",
        value: "athletic"
      },
      {
        label: "Muscular",
        value: "muscular"
      },
      {
        label: "Tall",
        value: "tall"
      },
      {
        label: "Petite",
        value: "petite"
      },
      {
        label: "Burly",
        value: "burly"
      },
      {
        label: "Graceful",
        value: "graceful"
      }
    ]
  },
  {
    title: "Hair",
    key: "hair",
    data: [
      {
        label: "Short black hair",
        value: "short black hair"
      },
      {
        label: "Long brown hair",
        value: "long brown hair"
      },
      {
        label: "Blonde hair",
        value: "blonde hair"
      },
      {
        label: "Red hair",
        value: "red hair"
      },
      {
        label: "Silver hair",
        value: "silver hair"
      },
      {
        label: "Blue hair",
        value: "blue hair"
      },
      {
        label: "White hair",
        value: "white hair"
      },
      {
        label: "Braided hair",
        value: "braided hair"
      },
      {
        label: "Wavy lavender hair",
        value: "wavy lavender hair"
      }
    ]
  },
  {
    title: "Eyes",
    key: "eyes",
    data: [
      {
        label: "Brown eyes",
        value: "brown eyes"
      },
      {
        label: "Blue eyes",
        value: "blue eyes"
      },
      {
        label: "Green eyes",
        value: "green eyes"
      },
      {
        label: "Amber eyes",
        value: "amber eyes"
      },
      {
        label: "Gray eyes",
        value: "gray eyes"
      },
      {
        label: "Violet eyes",
        value: "violet eyes"
      },
      {
        label: "Golden eyes",
        value: "golden eyes"
      }
    ]
  },
  {
    title: "Face",
    key: "face",
    data: [
      {
        label: "Determined expression",
        value: "determined expression"
      },
      {
        label: "Smiling",
        value: "smiling expression"
      },
      {
        label: "Serious look",
        value: "serious expression"
      },
      {
        label: "Stoic face",
        value: "stoic expression"
      },
      {
        label: "Playful grin",
        value: "playful grin"
      },
      {
        label: "Fierce snarl",
        value: "fierce snarl"
      },
      {
        label: "Warm smile",
        value: "warm smile"
      }
    ]
  },
  {
    title: "Skin",
    key: "skin",
    data: [
      {
        label: "Fair skin",
        value: "fair skin"
      },
      {
        label: "Warm tan skin",
        value: "tan skin"
      },
      {
        label: "Olive skin",
        value: "olive skin"
      },
      {
        label: "Deep brown skin",
        value: "deep brown skin"
      },
      {
        label: "Freckled skin",
        value: "freckled skin"
      },
      {
        label: "Porcelain skin",
        value: "porcelain skin"
      },
      {
        label: "Sunburned skin",
        value: "sunburned skin"
      }
    ]
  },
  {
    title: "Top",
    key: "top",
    data: [
      {
        label: "Utility jacket",
        value: "utility jacket"
      },
      {
        label: "Layered coat",
        value: "layered coat"
      },
      {
        label: "Casual tunic",
        value: "casual tunic"
      },
      {
        label: "Armored vest",
        value: "armored vest"
      },
      {
        label: "Loose shirt",
        value: "loose shirt"
      },
      {
        label: "Hooded cloak",
        value: "hooded cloak"
      },
      {
        label: "Ceremonial robe",
        value: "ceremonial robe"
      },
      {
        label: "Leaf flak jacket",
        value: "leaf flak jacket"
      },
      {
        label: "Sand desert cloak",
        value: "sand desert cloak"
      },
      {
        label: "Mist hunter robe",
        value: "mist hunter robe"
      },
      {
        label: "Cloud battle vest",
        value: "cloud battle vest"
      },
      {
        label: "Akatsuki cloak",
        value: "akatsuki cloak"
      }
    ]
  },
  {
    title: "Bottom",
    key: "bottom",
    data: [
      {
        label: "Cargo trousers",
        value: "cargo trousers"
      },
      {
        label: "Fitted pants",
        value: "fitted pants"
      },
      {
        label: "Pleated skirt",
        value: "pleated skirt"
      },
      {
        label: "Battle-ready shorts",
        value: "battle shorts"
      },
      {
        label: "Flowing robes",
        value: "flowing robes"
      },
      {
        label: "Armored greaves",
        value: "armored greaves"
      },
      {
        label: "Layered wraps",
        value: "layered wraps"
      },
      {
        label: "Shinobi pants",
        value: "shinobi pants"
      },
      {
        label: "Naruto orange pants",
        value: "orange pants"
      },
      {
        label: "Ninja leggings",
        value: "ninja leggings"
      },
      {
        label: "Samurai hakama",
        value: "samurai hakama"
      },
      {
        label: "Anbu trousers",
        value: "anbu trousers"
      }
    ]
  },
  {
    title: "Set",
    key: "set",
    data: [
      {
        label: "Combat uniform",
        value: "combat uniform"
      },
      {
        label: "Casual traveler",
        value: "casual traveler outfit"
      },
      {
        label: "Formal attire",
        value: "formal attire"
      },
      {
        label: "Stealth gear",
        value: "stealth gear"
      },
      {
        label: "Festival outfit",
        value: "festival outfit"
      },
      {
        label: "Royal regalia",
        value: "royal regalia"
      },
      {
        label: "Nomad attire",
        value: "nomad attire"
      },
      {
        label: "Leaf village ninja",
        value: "leaf village ninja"
      },
      {
        label: "Sand village",
        value: "sand village set"
      },
      {
        label: "Mist swordsman",
        value: "mist swordsman set"
      },
      {
        label: "Cloud shinobi",
        value: "cloud shinobi set"
      },
      {
        label: "Akatsuki member",
        value: "akatsuki member"
      }
    ]
  },
  {
    title: "Material",
    key: "material",
    data: [
      {
        label: "Woven fabric",
        value: "woven fabric"
      },
      {
        label: "Polished leather",
        value: "polished leather"
      },
      {
        label: "Reinforced armor",
        value: "reinforced armor"
      },
      {
        label: "High-tech fiber",
        value: "high-tech fiber"
      },
      {
        label: "Organic weave",
        value: "organic weave"
      },
      {
        label: "Dragonhide",
        value: "dragonhide"
      },
      {
        label: "Mystic cloth",
        value: "mystic cloth"
      },
      {
        label: "Chakra mesh",
        value: "chakra mesh"
      },
      {
        label: "Flak armor",
        value: "flak armor"
      },
      {
        label: "Sand reinforced cloth",
        value: "sand reinforced cloth"
      },
      {
        label: "Mist waterproof weave",
        value: "mist waterproof weave"
      },
      {
        label: "Cloud lightning fabric",
        value: "cloud lightning fabric"
      }
    ]
  },
  {
    title: "Accessory",
    key: "accessory",
    data: [
      {
        label: "Utility belt",
        value: "utility belt"
      },
      {
        label: "Gloves",
        value: "gloves"
      },
      {
        label: "Scarf",
        value: "scarf"
      },
      {
        label: "Headgear",
        value: "headgear"
      },
      {
        label: "Jewelry",
        value: "jewelry"
      },
      {
        label: "Bandolier",
        value: "bandolier"
      },
      {
        label: "Magic tome",
        value: "magic tome accessory"
      },
      {
        label: "Forehead protector",
        value: "forehead protector"
      },
      {
        label: "Kunai holster",
        value: "kunai holster"
      },
      {
        label: "Scroll pack",
        value: "scroll pack"
      },
      {
        label: "Anbu mask",
        value: "anbu mask"
      },
      {
        label: "Akatsuki ring",
        value: "akatsuki ring"
      }
    ]
  },
  {
    title: "Village",
    key: "village",
    data: [
      {
        label: "Leaf",
        value: "leaf"
      },
      {
        label: "Sand",
        value: "sand"
      },
      {
        label: "Mist",
        value: "mist"
      },
      {
        label: "Cloud",
        value: "cloud"
      },
      {
        label: "Stone",
        value: "stone"
      },
      {
        label: "Rogue",
        value: "rogue"
      }
    ]
  }
];

const examples = [
  {
    image: "https://cdn.ocmaker.app/example/naruto-oc-generated-1.webp",
    prompt:
      "1girl, white hair, bright red eyes, brave expression, naruto style combat ensemble, forehead protector, kunai, ready stance, anime style, looking at viewer, simple background, upper body",
  },
  {
    image: "https://cdn.ocmaker.app/example/naruto-oc-generated-2.webp",
    prompt:
      "1girl, orange hair, teal eyes, playful smile, Naruto style ninja clothing, headband, scroll, energetic pose, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
  {
    image: "https://cdn.ocmaker.app/example/naruto-oc-generated-3.webp",
    prompt:
      "1girl, long purple hair, blue eyes, mysterious aura, Naruto style healing ninja outfit, headband, medicinal herbs, serene stance, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
  {
    image: "https://cdn.ocmaker.app/example/naruto-oc-generated-4.webp",
    prompt:
      "1boy, dark blue hair, gray eyes, serious expression, Naruto style shinobi attire, katana, defensive stance, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
];

export default {
  meta: {
    title: "Naruto OC Maker",
    description:
      "Generate your own Naruto OC with AI. Create characters, backstories, and visuals in the iconic ninja style.",
  },
  series: "Naruto",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Naruto OC Maker",
      description:
        "Generate your own Naruto OC with AI. Create characters, backstories, and visuals in the iconic ninja style.",
    },
    step: {
      title: "How to Make Naruto OC",
      description:
        "Creating a Naruto-style character with OC Maker is easy. Just follow these two steps to bring your idea to life.",
      steps: [
        {
          title: "Describe Your Naruto OC",
          description:
            "Fill in the form with your character's basic appearance and personality. For best results, include Naruto-style features like ninja attire, headbands, and the determined spirit of a shinobi.",
        },
        {
          title: "Add Details and Ninja Elements",
          description:
            "Include extra details like chakra abilities, clan affiliations, or unique jutsu. The more your character fits into the Naruto universe of ninjas, villages, and powerful techniques, the more accurate and impressive the result will be.",
        },
        {
          title: "Generate and Finalize Design",
          description:
            "Click the 'Generate Character' button to create your Naruto OC. You'll get several AI-generated designs — pick your favorite to complete your character.",
        },
      ],
    },
    examples: {
      title: "Naruto Examples",
      description:
        "Explore Naruto characters made from text prompts, created using the Naruto OC Maker.",
      examples,
    },
    features: {
      title: "What is Naruto OC Maker?",
      description:
        "Naruto OC Maker is a version of OC Maker fine-tuned for the world of Naruto. Describe your character, and instantly turn it into Naruto-style artwork.",
      features: [
        {
          label: "Authentic Naruto Character Design",
          description:
            "Create characters that truly capture the ninja spirit of Naruto, designed to seamlessly fit into the world of shinobi, jutsu, and village politics.",
        },
        {
          label: "Tailored Prompt Tuning",
          description:
            "Prompts are fine-tuned for Naruto aesthetics — from ninja gear to chakra abilities — helping you build more convincing characters.",
        },
        {
          label: "Fast Character Generation",
          description:
            "Generate high-quality characters in just seconds, allowing you to focus more on refining ideas and less on waiting.",
        },
        {
          label: "High-Quality Visual Output",
          description:
            "Powered by advanced AI models, Naruto OC Maker delivers detailed, high-resolution character images suitable for storytelling, design, or sharing.",
        },
        {
          label: "Choose from Multiple Results",
          description:
            "Generate multiple character options per prompt and select your favorites to finalize as your official Naruto OC.",
        },
        {
          label: "Deep Story Integration",
          description:
            "Bring your OC to life with not just visuals, but also compelling backstories, ninja techniques, and rich connections to the Naruto universe.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is Naruto OC Maker and how does it work?",
          answer:
            "Naruto OC Maker is a specialized version of OC Maker, fine-tuned for the Naruto universe. Simply describe your character, and our AI will generate anime-style Naruto visuals in seconds based on your prompt.",
        },
        {
          question: "How can I create better characters with Naruto OC Maker?",
          answer:
            "For best results, include Naruto-specific traits in your description, such as ninja techniques, clan backgrounds, or village affiliations. The more vivid and detailed your input, the more accurate and compelling the output.",
        },
        {
          question: "Is Naruto OC Maker free to use?",
          answer:
            "Yes, Naruto OC Maker offers free character generation with basic features. For faster results, premium options, and additional control, you can upgrade your plan anytime.",
        },
        {
          question: "What makes Naruto OC Maker's results so impressive?",
          answer:
            "Naruto OC Maker uses cutting-edge AI models fine-tuned for the Naruto setting, ensuring characters match the distinctive art style and ninja atmosphere of the series.",
        },
        {
          question:
            "Can I use characters made with Naruto OC Maker for commercial projects?",
          answer:
            "Yes, any characters you create using Naruto OC Maker are yours to use freely for both personal and commercial purposes. We do not claim ownership over your creations.",
        },
        {
          question: "Do I need an account to use Naruto OC Maker?",
          answer:
            "No account is required for basic use. However, creating an account lets you save your characters, track generation history, and access more features.",
        },
        {
          question:
            "Can I regenerate or fine-tune the same character in Naruto OC Maker?",
          answer:
            "Yes, you can regenerate results from the same prompt or adjust your inputs to refine your character until it fits your vision perfectly.",
        },
        {
          question:
            "Will there be more anime-style OC Makers like Naruto OC Maker?",
          answer:
            "Yes! We plan to release more specialized OC Makers tailored for different anime universes. Stay tuned for future updates on ocmaker.app.",
        },
      ],
    },
    cta: {
      title: "Create Your Own Naruto Character",
      description:
        "Bring your original Naruto character to life — no drawing skills needed. Just describe, generate, and explore.",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
