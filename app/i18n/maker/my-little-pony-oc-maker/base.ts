const basePrompt = `
  WORLD CONTEXT:
  Universe: My Little Pony: Friendship is Magic
  Setting: Equestria's magical towns, harmony elements, friendship quests, multiple pony tribes and creatures, musical whimsy
  Key Locations: Ponyville, Canterlot, Crystal Empire, Everfree Forest, School of Friendship, Yakyakistan, Changeling Hive, Dragon Lands

  OUTPUT FORMAT:
  Name, Species & Tribe, Home Location, Cutie Mark & Talent, Personality, Friendship Lesson/Goal, Backstory Snapshot

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Crystal Empire Historian",
    description: "A crystal pony preserving ancient songs with enchanted quills.",
    prompt: `What is your character's name?
Twinkle Archive

What species and tribe are they?
Crystal pony

Where is their home location?
Crystal Empire

What is their cutie mark and talent?
Cutie mark of a quill over a snowflake, records memories into music boxes

How would you describe their personality?
Gentle, studious, quietly adventurous

What friendship lesson or goal guides them?
Teaching foals that history shines brighter when shared

Share a backstory snapshot.
Freed from King Sombra's control, she vowed to preserve stories by touring Equestria's libraries.`,
  },
  {
    title: "Cloudsdale Weather Captain",
    description: "A pegasus choreographing rainbow light shows in the sky.",
    prompt: `What is your character's name?
Gale Prism

What species and tribe are they?
Pegasus

Where is their home location?
Cloudsdale

What is their cutie mark and talent?
Cutie mark of crossed feathers with a prismatic arc, masters weather artistry

How would you describe their personality?
Energetic, charismatic, a bit of a show-off

What friendship lesson or goal guides them?
Learning that teamwork matters more than applause

Share a backstory snapshot.
Rainbow Dash mentored her after a failed show to teach coordinating with weather teams.`,
  },
  {
    title: "Everfree Herbalist",
    description: "An earth pony herbalist crafting lanterns that ward off timberwolves.",
    prompt: `What is your character's name?
Fern Glow

What species and tribe are they?
Earth pony

Where is their home location?
Edge of the Everfree Forest

What is their cutie mark and talent?
Cutie mark of a glowing leaf, excels at brewing protective salves

How would you describe their personality?
Warm, brave, a little absentminded

What friendship lesson or goal guides them?
Showing Ponyville that the Everfree can be a friend, not a foe

Share a backstory snapshot.
Zecora helped her conquer her fear of the forest, inspiring her to help others explore safely.`,
  },
  {
    title: "Canterlot Etiquette Tutor",
    description: "A unicorn tutor helping nobles discover their authentic selves.",
    prompt: `What is your character's name?
Lumière Grace

What species and tribe are they?
Unicorn

Where is their home location?
Canterlot

What is their cutie mark and talent?
Cutie mark of a mirror and quill, guides ponies to honest manners

How would you describe their personality?
Refined, kind-hearted, witty

What friendship lesson or goal guides them?
Teaching that true grace comes from empathy, not titles

Share a backstory snapshot.
Once pressured to fit strict noble standards, she befriended Rarity and learned to celebrate individuality.`,
  },
  {
    title: "Yakyakistan Ambassador",
    description: "A yak ambassador blending cultures through music and pastries.",
    prompt: `What is your character's name?
Yakima Beat

What species and tribe are they?
Yak

Where is their home location?
Yakyakistan

What is their cutie mark and talent?
Cutie mark substitute: ceremonial drum, unites communities with rhythm

How would you describe their personality?
Boisterous, sincere, devoted

What friendship lesson or goal guides them?
Showing every kingdom that differences make harmony stronger

Share a backstory snapshot.
Pinkie Pie inspired Yakima to share yak culture; now she tours Equestria with friendship festivals.`,
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
        label: "Young foal",
        value: "young foal"
      },
      {
        label: "Cutie mark crusader",
        value: "cutie mark crusader"
      },
      {
        label: "Adult pony",
        value: "adult pony"
      },
      {
        label: "Royal advisor",
        value: "royal advisor"
      },
      {
        label: "Ancient creature",
        value: "ancient creature"
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
        label: "Friendship school vest",
        value: "friendship school vest"
      },
      {
        label: "Royal regalia",
        value: "royal regalia"
      },
      {
        label: "Adventure scarf",
        value: "adventure scarf"
      },
      {
        label: "Wonderbolt jacket",
        value: "wonderbolt jacket"
      },
      {
        label: "Crystal empire shawl",
        value: "crystal empire shawl"
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
        label: "Flowing tail ribbons",
        value: "tail ribbons"
      },
      {
        label: "Saddle skirts",
        value: "saddle skirts"
      },
      {
        label: "Adventure saddlebags",
        value: "adventure saddlebags"
      },
      {
        label: "Formal drape",
        value: "formal drape"
      },
      {
        label: "Yakyakistan tassels",
        value: "yakyakistan tassels"
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
        label: "Ponyville casual",
        value: "ponyville casual"
      },
      {
        label: "Canterlot gala",
        value: "canterlot gala"
      },
      {
        label: "Wonderbolt flight",
        value: "wonderbolt flight"
      },
      {
        label: "Crystal empire formal",
        value: "crystal empire formal"
      },
      {
        label: "Friendship school uniform",
        value: "friendship school uniform"
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
        label: "Star-thread silk",
        value: "star thread silk"
      },
      {
        label: "Cloud weave",
        value: "cloud weave"
      },
      {
        label: "Crystal shimmer",
        value: "crystal shimmer"
      },
      {
        label: "Everfree bark",
        value: "everfree bark"
      },
      {
        label: "Harmony satin",
        value: "harmony satin"
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
        label: "Cutie mark pin",
        value: "cutie mark pin"
      },
      {
        label: "Friendship bracelet",
        value: "friendship bracelet"
      },
      {
        label: "Magic horn ring",
        value: "magic horn ring"
      },
      {
        label: "Wonderbolt goggles",
        value: "wonderbolt goggles"
      },
      {
        label: "Dragon scale charm",
        value: "dragon scale charm"
      }
    ]
  }
];

const examples = [
  {
    image: "https://cdn.ocmaker.app/example/mlp-oc-generateds-1.webp",
    prompt:
      "1girl, pastel rainbow mane, sky blue coat, cutie mark with lightning bolt, unicorn horn, magical sparkles, cheerful expression, My Little Pony style, looking at viewer, simple background, upper body",
  },
  {
    image: "https://cdn.ocmaker.app/example/mlp-oc-generateds-2.webp",
    prompt:
      "1girl, lavender mane with silver streaks, white coat, pegasus wings, star cutie mark, gentle smile, My Little Pony style, flying pose, looking at viewer, clouds background, upper body",
  },
  {
    image: "https://cdn.ocmaker.app/example/mlp-oc-generateds-3.webp",
    prompt:
      "1girl, emerald green mane, orange coat, earth pony, apple cutie mark, determined expression, My Little Pony style, farming pose, looking at viewer, simple background, upper body",
  },
  {
    image: "https://cdn.ocmaker.app/example/mlp-oc-generateds-4.webp",
    prompt:
      "1girl, cotton candy pink mane, mint green coat, unicorn horn, cupcake cutie mark, baker's hat, joyful expression, My Little Pony style, looking at viewer, simple background, upper body",
  },
];

export default {
  meta: {
    title: "My Little Pony OC Maker",
    description:
      "Create your own My Little Pony OC with AI. Design magical ponies, special talents, and friendship adventures in the colorful world of Equestria.",
  },
  series: "My Little Pony",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "My Little Pony OC Maker",
      description:
        "Create your own My Little Pony OC with AI. Design magical ponies, special talents, and friendship adventures in the colorful world of Equestria.",
    },
    step: {
      title: "How to Make My Little Pony OC",
      description:
        "Creating your perfect pony friend is magical and simple. Follow these steps to bring your Equestrian character to life.",
      steps: [
        {
          title: "Choose Your Pony Type and Colors",
          description:
            "Select whether your pony is a unicorn, pegasus, or earth pony. Choose your coat color, mane style, and eye color. Pastel tones and vibrant combinations work best for authentic MLP style.",
        },
        {
          title: "Design Special Talent and Cutie Mark",
          description:
            "Describe your pony's special talent and cutie mark symbol. This could be anything from magic spells to weather control, or artistic abilities. The cutie mark should represent their unique gift.",
        },
        {
          title: "Generate Your Magical Pony",
          description:
            "Click 'Generate Character' to create your My Little Pony OC. Choose from multiple AI-generated designs that capture the friendship, magic, and wonder of Equestria.",
        },
      ],
    },
    examples: {
      title: "My Little Pony Examples",
      description:
        "Discover enchanting pony characters created with text prompts using the My Little Pony OC Maker.",
      examples,
    },
    features: {
      title: "What is My Little Pony OC Maker?",
      description:
        "My Little Pony OC Maker specializes in creating authentic Equestrian ponies. Design characters with magical abilities, unique cutie marks, and the spirit of friendship.",
      features: [
        {
          label: "Authentic MLP Art Style",
          description:
            "Generate ponies that perfectly match the distinctive My Little Pony aesthetic, from expressive eyes to colorful manes and magical cutie marks.",
        },
        {
          label: "Magical Pony Types",
          description:
            "Create unicorns with magical abilities, pegasi with weather powers, or earth ponies with nature connections. Each type brings unique characteristics and talents.",
        },
        {
          label: "Quick Pony Creation",
          description:
            "Design beautiful MLP characters in seconds, letting you focus on developing their personalities, friendships, and magical adventures in Equestria.",
        },
        {
          label: "High-Quality Cartoon Artwork",
          description:
            "Powered by AI trained on MLP's vibrant visual style, delivering character art that captures the show's warmth, magic, and friendship themes.",
        },
        {
          label: "Multiple Design Options",
          description:
            "Generate several pony variations per prompt, exploring different coat colors, mane styles, and cutie mark designs to find your perfect character.",
        },
        {
          label: "Equestrian World Integration",
          description:
            "Create ponies that naturally belong in Equestria, with authentic magical elements, friendship values, and connections to the MLP universe.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is My Little Pony OC Maker and how does it work?",
          answer:
            "My Little Pony OC Maker is an AI tool specialized for creating original pony characters. Describe your pony's type, colors, and special talent, and our AI generates authentic MLP-style artwork.",
        },
        {
          question:
            "How can I create better ponies with My Little Pony OC Maker?",
          answer:
            "Include specific details like pony type (unicorn, pegasus, earth pony), coat and mane colors, cutie mark design, and personality traits. The more MLP-specific elements you include, the better the results.",
        },
        {
          question: "Is My Little Pony OC Maker free to use?",
          answer:
            "Yes, My Little Pony OC Maker offers free character generation with core features. Premium plans provide faster generation, more customization options, and advanced magical elements.",
        },
        {
          question: "What makes My Little Pony OC Maker's results so magical?",
          answer:
            "Our AI is specifically trained on MLP's art style and universe, understanding pony anatomy, cutie mark symbolism, and the magical elements that make Equestria special.",
        },
        {
          question:
            "Can I use ponies created with My Little Pony OC Maker commercially?",
          answer:
            "Yes, all original characters you create are yours to use for personal and commercial projects. We don't claim ownership of your pony designs.",
        },
        {
          question: "Do I need an account to use My Little Pony OC Maker?",
          answer:
            "No account required for basic use. Creating an account allows you to save your ponies, access creation history, and unlock premium magical features.",
        },
        {
          question: "Can I regenerate or modify my pony designs?",
          answer:
            "Absolutely! You can regenerate with the same prompt for variations or adjust your description to fine-tune your pony until it perfectly matches your vision.",
        },
        {
          question: "Will you add more cartoon-style OC Makers?",
          answer:
            "Yes! We're expanding to include other beloved cartoon universes and animation styles. Follow our updates for new themed OC Makers.",
        },
      ],
    },
    cta: {
      title: "Create Your Magical Pony Friend",
      description:
        "Design your perfect Equestrian companion — no artistic skills required. Just imagine, describe, and experience the magic of friendship.",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
