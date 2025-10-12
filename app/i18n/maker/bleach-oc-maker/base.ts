const basePrompt = `
  WORLD CONTEXT:
  Universe: Bleach
  Setting: Human World, Soul Society, Hueco Mundo, Wandenreich conflicts, spiritual battles between Shinigami, Quincy, and Hollows
  Key Factions: Gotei 13 divisions, Visored, Arrancar/Las Noches, Quincy Wandenreich, Xcution Fullbringers, Substitute Shinigami, Royal Guard

  OUTPUT FORMAT:
  Name, Race & Affiliation, Combat Division or Squad, Zanpakutō/Ability Theme, Release States (Shikai/Bankai etc.), Personality, Past Life/Backstory

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Gotei Tracker",
    description: "A Shin'o Academy graduate specializing in wilderness recon missions.",
    prompt: `What is your character's name?
Hayate Murasame

What race and affiliation do they claim?
Shinigami of the Gotei 13

Which combat division or squad do they serve?
10th Division reconnaissance unit patrolling Rukongai borders

What is the theme of their Zanpakuto or ability?
Wind manipulation through the blade Kazekiri

What release states have they achieved?
Shikai unlocked; Bankai forms a storm dragon he struggles to control

How would you describe their personality?
Relaxed, observant, fiercely protective of civilians

Share a past life or backstory snapshot.
In life he was a mountain rescue guide, a memory that now helps him track Hollows through the forests of Rukongai.`,
  },
  {
    title: "Visored Drifter",
    description: "A Hollow-masked exile who still aids Soul Society from the shadows.",
    prompt: `What is your character's name?
Kana Ibaragi

What race and affiliation do they claim?
Visored operating near Karakura Town

Which combat division or squad do they serve?
Former 5th Division seated officer allied with Urahara's network

What is the theme of their Zanpakuto or ability?
Illusionary soundwaves channelled through Oto-no-Kage

What release states have they achieved?
Shikai mastery with partial Hollow mask granting echolocation

How would you describe their personality?
Laid-back, sly, burdened by survivor's guilt

Share a past life or backstory snapshot.
Fled after Aizen's betrayal and built underground safehouses for spiritually aware humans.`,
  },
  {
    title: "Arrancar Strategist",
    description: "A former Espada adjutant seeking a purpose beyond Las Noches.",
    prompt: `What is your character's name?
Verde Quinto

What race and affiliation do they claim?
Arrancar aligned with Nelliel's neutral faction

Which combat division or squad do they serve?
Advisory council mediating Hueco Mundo city disputes

What is the theme of their Zanpakuto or ability?
Emerald crystal shards that grow into defensive barriers

What release states have they achieved?
Resurrección Cristaliza forming mirrored armor blades

How would you describe their personality?
Stoic, philosophical, secretly envious of human warmth

Share a past life or backstory snapshot.
Once a Hollow librarian, Verde now negotiates truces between clans yearning for peace.`,
  },
  {
    title: "Quincy Archivist",
    description: "A Wandenreich survivor cataloging forbidden techniques for the future.",
    prompt: `What is your character's name?
Astrid Vogel

What race and affiliation do they claim?
Pureblood Quincy hiding within the Ishida network

Which combat division or squad do they serve?
Former Schrift researcher now discreetly aiding Ichigo's allies

What is the theme of their Zanpakuto or ability?
Spirit bow Archivbogen that records enemy reiatsu patterns

What release states have they achieved?
Vollständig Bibliotheca manifests tomes copying techniques temporarily

How would you describe their personality?
Reserved, scholarly, remorseful for past atrocities

Share a past life or backstory snapshot.
She preserved forbidden volumes during Yhwach's campaign and teaches Quincy history to prevent another war.`,
  },
  {
    title: "Fullbringer Courier",
    description: "A human courier whose Fullbring turns deliveries into lightning raids.",
    prompt: `What is your character's name?
Riku Tanabe

What race and affiliation do they claim?
Human Fullbringer allied with Xcution's reformed members

Which combat division or squad do they serve?
Acts as a courier for Kisuke and the Substitute Shinigami

What is the theme of their Zanpakuto or ability?
Fullbring Deadline empowering backpacks for teleport dashes

What release states have they achieved?
Enhanced Fullbring creating temporal bubbles that slow opponents

How would you describe their personality?
Energetic, reliable, always racing against the clock

Share a past life or backstory snapshot.
He awakened his Fullbring after refusing to abandon a life-saving package during a deadly delivery crash.`,
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
        label: "Young academy student",
        value: "young academy student"
      },
      {
        label: "Seated officer",
        value: "seated officer"
      },
      {
        label: "Veteran soul reaper",
        value: "veteran soul reaper"
      },
      {
        label: "Arrancar adjuchas",
        value: "arrancar adjuchas"
      },
      {
        label: "Ancient Quincy",
        value: "ancient quincy"
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
        label: "Gotei 13 shihakusho",
        value: "gotei 13 shihakusho"
      },
      {
        label: "Visored hoodie",
        value: "visored hoodie"
      },
      {
        label: "Arrancar jacket",
        value: "arrancar jacket"
      },
      {
        label: "Quincy mantle",
        value: "quincy mantle"
      },
      {
        label: "Fullbringer streetwear",
        value: "fullbringer streetwear"
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
        label: "Shinigami hakama",
        value: "shinigami hakama"
      },
      {
        label: "White arrancar trousers",
        value: "white arrancar trousers"
      },
      {
        label: "Quincy formal pants",
        value: "quincy formal pants"
      },
      {
        label: "Human casual jeans",
        value: "human casual jeans"
      },
      {
        label: "Royal guard robes",
        value: "royal guard robes"
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
        label: "Squad division uniform",
        value: "squad division uniform"
      },
      {
        label: "Visored street fighter",
        value: "visored street fighter"
      },
      {
        label: "Arrancar fracción",
        value: "arrancar fraccion set"
      },
      {
        label: "Quincy wandenreich",
        value: "quincy wandenreich set"
      },
      {
        label: "Human fullbringer",
        value: "human fullbringer set"
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
        label: "Reishi weave",
        value: "reishi weave"
      },
      {
        label: "Soul-silk",
        value: "soul silk"
      },
      {
        label: "Hierro plating",
        value: "hierro plating"
      },
      {
        label: "Reiatsu mesh",
        value: "reiatsu mesh"
      },
      {
        label: "Kido seals",
        value: "kido seals"
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
        label: "Division haori",
        value: "division haori"
      },
      {
        label: "Sealed zanpakuto",
        value: "sealed zanpakuto"
      },
      {
        label: "Visored mask",
        value: "visored mask"
      },
      {
        label: "Quincy cross",
        value: "quincy cross"
      },
      {
        label: "Fullbring emblem",
        value: "fullbring emblem"
      }
    ]
  },
  {
    title: "Affiliation",
    key: "affiliation",
    data: [
      {
        label: "Gotei 13",
        value: "gotei 13"
      },
      {
        label: "Visored",
        value: "visored"
      },
      {
        label: "Arrancar",
        value: "arrancar"
      },
      {
        label: "Quincy",
        value: "quincy"
      },
      {
        label: "Human fullbringer",
        value: "human fullbringer"
      }
    ]
  }
];

const examples = [
  {
    image: "https://cdn.ocmaker.app/example/bleach-oc-maker-generated-1.webp",
    prompt:
      "1boy, white hair with dark tips, silver eyes, shinigami captain, serious expression, black shihakusho with white haori, captain's badge, zanpakuto at waist, spiritual pressure aura, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/bleach-oc-maker-generated-2.webp",
    prompt:
      "1girl, long purple hair, golden eyes, hollow mask fragment on head, arrancar outfit, mischievous smile, white uniform with black trim, katana zanpakuto, cero energy gathering, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/bleach-oc-maker-generated-3.webp",
    prompt:
      "1boy, spiky orange hair, blue eyes, substitute shinigami, determined expression, modified shihakusho, oversized zanpakuto on back, spiritual energy flowing, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/bleach-oc-maker-generated-4.webp",
    prompt:
      "1girl, short black hair with side bangs, violet eyes, soul reaper lieutenant, calm expression, shihakusho with lieutenant badge, dual zanpakuto, kido spell effects, single character, upper body, looking at viewer, anime style, simple background",
  },
];

export default {
  meta: {
    title: "Bleach OC Maker",
    description:
      "Generate your own Bleach OC with AI. Create unique Soul Reapers, Arrancars, Vizards, and other characters for the Soul Society universe.",
  },
  series: "Bleach",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Bleach OC Maker",
      description:
        "Generate your own Bleach OC with AI. Create unique Soul Reapers, Arrancars, Vizards, and other characters for the Soul Society universe.",
    },
    step: {
      title: "How to Make Bleach OC",
      description:
        "Creating a Bleach-style character with OC Maker is simple. Follow these steps to design your own Soul Reaper or Hollow.",
      steps: [
        {
          title: "Describe Your Bleach Character",
          description:
            "Fill in the form with your character's appearance and traits. For authentic results, include Bleach-specific elements like shihakusho robes, zanpakuto weapons, spiritual pressure effects, or hollow masks.",
        },
        {
          title: "Add Spiritual Powers and Division",
          description:
            "Include details about your character's role (Soul Reaper, Arrancar, Quincy, etc.), their division or rank, zanpakuto type, and special abilities like Bankai or Resurrección. The more specific to Bleach's universe, the better the result.",
        },
        {
          title: "Generate and Select Your Design",
          description:
            "Click 'Generate Character' to create your Bleach OC. You'll receive multiple AI-generated designs — choose your favorite to finalize your character for the Soul Society.",
        },
      ],
    },
    examples: {
      title: "Bleach Character Examples",
      description:
        "Explore Bleach characters created from text prompts using the Bleach OC Maker.",
      examples,
    },
    features: {
      title: "What is Bleach OC Maker?",
      description:
        "Bleach OC Maker is a specialized version of OC Maker designed for the Bleach universe. Describe your character and instantly transform it into authentic Bleach-style artwork.",
      features: [
        {
          label: "Authentic Soul Society Design",
          description:
            "Create characters that perfectly capture the distinctive art style of Bleach, from Soul Reapers to Arrancars, designed to fit seamlessly into Tite Kubo's universe.",
        },
        {
          label: "Specialized Bleach Prompts",
          description:
            "Prompts are optimized for Bleach aesthetics — from shihakusho uniforms to zanpakuto designs — helping you create more convincing Soul Society characters.",
        },
        {
          label: "Instant Character Generation",
          description:
            "Generate high-quality Bleach characters in seconds, allowing you to quickly iterate and perfect your original character design.",
        },
        {
          label: "High-Resolution Artwork",
          description:
            "Powered by advanced AI technology, Bleach OC Maker produces detailed, high-quality character images perfect for fanart, roleplay, or creative projects.",
        },
        {
          label: "Multiple Design Options",
          description:
            "Generate several character variations per prompt and select your favorites to establish your official Bleach OC design.",
        },
        {
          label: "Complete Character Creation",
          description:
            "Design not just the appearance but also the spiritual powers, zanpakuto abilities, and backstory elements that make your Bleach OC unique and memorable.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is Bleach OC Maker and how does it work?",
          answer:
            "Bleach OC Maker is a specialized AI tool for creating original Bleach characters. Simply describe your character's appearance and abilities, and our AI will generate authentic Bleach-style artwork based on your description.",
        },
        {
          question: "How can I create better Bleach characters?",
          answer:
            "Include specific Bleach elements like division numbers, zanpakuto names, spiritual pressure colors, or hollow mask designs. The more detailed and universe-specific your description, the more authentic your character will look.",
        },
        {
          question: "Is Bleach OC Maker free to use?",
          answer:
            "Yes, Bleach OC Maker offers free character generation with basic features. Premium plans provide faster generation, more options, and additional customization features.",
        },
        {
          question: "What makes Bleach OC Maker's results so accurate?",
          answer:
            "Our AI models are fine-tuned to understand Bleach's unique art style, from the distinctive character designs to the spiritual effects, ensuring your OC fits perfectly into the Soul Society.",
        },
        {
          question: "Can I use my Bleach OC for fan fiction or art projects?",
          answer:
            "Absolutely! Characters you create with Bleach OC Maker are yours to use freely for personal projects, fan fiction, artwork, or any creative endeavor you have in mind.",
        },
        {
          question: "Do I need to sign up to use Bleach OC Maker?",
          answer:
            "No registration required for basic use. However, creating an account allows you to save characters, access generation history, and unlock additional features.",
        },
        {
          question:
            "Can I create different types of Bleach characters (Soul Reapers, Arrancars, etc.)?",
          answer:
            "Yes! Bleach OC Maker can generate all types of Bleach characters including Soul Reapers, Arrancars, Vizards, Fullbringers, and Quincy. Just specify the type in your description.",
        },
        {
          question: "Will you add more anime OC makers like this?",
          answer:
            "Yes! We're continuously expanding our collection of anime-specific OC makers. Check ocmaker.app regularly for new additions to our growing library.",
        },
      ],
    },
    cta: {
      title: "Create Your Own Bleach Character",
      description:
        "Design your original Soul Reaper or Arrancar — no drawing skills required. Just describe, generate, and join the Soul Society.",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
