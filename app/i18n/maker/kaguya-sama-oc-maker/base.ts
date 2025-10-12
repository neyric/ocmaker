const basePrompt = `
  WORLD CONTEXT:
  Universe: Kaguya-sama: Love Is War
  Setting: Shuchiin Academy's elite halls, rom-com mind games, student council rivalries, influential families, school festivals
  Key Circles: Student Council, cheer club, drama club, disciplinary committee, Shinomiya conglomerate, Shirogane family, Fujiwara connections

  OUTPUT FORMAT:
  Name, Year & Role at Shuchiin, Social Standing/Family Influence, Signature Strategy or Talent, Personality, Romantic Challenge, Backstory Snapshot

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Student Council Treasurer",
    description: "A numbers genius balancing budgets and secret admirers.",
    prompt: `What is your character's name?
Airi Kanzaki

What is their year and role at Shuchiin?
Second-year, student council treasurer

What social standing or family influence do they have?
Heiress of a Tokyo tech conglomerate

What signature strategy or talent do they wield?
Uses algorithmic love charts to predict confession timing

How would you describe their personality?
Composed, polite, secretly competitive

What romantic challenge are they facing?
Wants Miyuki's advice to confess to Ishigami without losing face

Share a backstory snapshot.
Transferred from an overseas academy and immediately caught Fujiwara's eye for her beatboxing abilities during orientation.`,
  },
  {
    title: "Public Morals Enforcer",
    description: "A stern committee member hiding a love of shojo manga.",
    prompt: `What is your character's name?
Yume Saionji

What is their year and role at Shuchiin?
Third-year, public morals chair

What social standing or family influence do they have?
Old-money family with ties to the Shinomiya conglomerate

What signature strategy or talent do they wield?
Writes rule amendments that corner her crush into private study sessions

How would you describe their personality?
Disciplined, tsundere, secretly romantic

What romantic challenge are they facing?
Terrified her shojo stash will be exposed before she confesses to Hayasaka's cousin

Share a backstory snapshot.
Was childhood rivals with Kaguya in etiquette classes until they formed a mutual respect pact.`,
  },
  {
    title: "Drama Club Lead",
    description: "A charismatic actor planning a confession through the school play.",
    prompt: `What is your character's name?
Itsuki Arata

What is their year and role at Shuchiin?
First-year, drama club lead actor

What social standing or family influence do they have?
Scholarship student from a modest family

What signature strategy or talent do they wield?
Directs a romantic comedy play with improvised confession cues

How would you describe their personality?
Energetic, theatrical, earnest

What romantic challenge are they facing?
Fears Kaguya will outmaneuver his improvised confession scene

Share a backstory snapshot.
Saved the drama club from disbanding by convincing Kaguya to sponsor their festival production.`,
  },
  {
    title: "Cheer Club Strategist",
    description: "A cheer strategist creating viral support videos for the council.",
    prompt: `What is your character's name?
Mina Tachikawa

What is their year and role at Shuchiin?
Second-year, cheer club strategist

What social standing or family influence do they have?
New money influencer family expanding into entertainment

What signature strategy or talent do they wield?
Edits social media campaigns to sway student council elections

How would you describe their personality?
Trendy, sharp-tongued, secretly soft-hearted

What romantic challenge are they facing?
Falling for a shy photography club member who avoids the spotlight

Share a backstory snapshot.
Became Fujiwara's video partner after a dance challenge collaboration went viral.`,
  },
  {
    title: "Library Prefect",
    description: "A library prefect orchestrating matchmaking through book recommendations.",
    prompt: `What is your character's name?
Haruka Minase

What is their year and role at Shuchiin?
Third-year, library committee head

What social standing or family influence do they have?
Descendant of a literary dynasty

What signature strategy or talent do they wield?
Curates reading lists that mirror students' hidden feelings

How would you describe their personality?
Soft-spoken, insightful, quietly mischievous

What romantic challenge are they facing?
Designs a book trail hoping Kaguya notices Shirogane's hidden poem

Share a backstory snapshot.
Inspired by Shinomiya's public relations work, she aims to revive the school's neglected literary salon.`,
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
        label: "First-year",
        value: "first year shuchiin"
      },
      {
        label: "Second-year",
        value: "second year shuchiin"
      },
      {
        label: "Third-year",
        value: "third year shuchiin"
      },
      {
        label: "Graduate mentor",
        value: "graduate mentor"
      },
      {
        label: "Faculty advisor",
        value: "faculty advisor"
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
        label: "Student council uniform",
        value: "student council uniform"
      },
      {
        label: "Disciplinary blazer",
        value: "disciplinary blazer"
      },
      {
        label: "Drama club cardigan",
        value: "drama club cardigan"
      },
      {
        label: "Cheer club jacket",
        value: "cheer club jacket"
      },
      {
        label: "Casual prestige sweater",
        value: "prestige sweater"
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
        label: "Pleated skirt",
        value: "pleated skirt shuchiin"
      },
      {
        label: "Tailored slacks",
        value: "tailored slacks shuchiin"
      },
      {
        label: "Casual jeans",
        value: "casual jeans shuchiin"
      },
      {
        label: "Exercise pants",
        value: "exercise pants shuchiin"
      },
      {
        label: "Festival yukata hem",
        value: "festival yukata hem"
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
        label: "Student council meeting",
        value: "student council meeting set"
      },
      {
        label: "Public morals patrol",
        value: "public morals patrol set"
      },
      {
        label: "Cultural festival",
        value: "cultural festival set"
      },
      {
        label: "Sports festival cheer",
        value: "sports festival set"
      },
      {
        label: "Secret confession date",
        value: "secret confession date set"
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
        label: "School uniform wool",
        value: "school uniform wool"
      },
      {
        label: "Luxury cashmere",
        value: "luxury cashmere"
      },
      {
        label: "Club jersey fabric",
        value: "club jersey fabric"
      },
      {
        label: "Festival silk",
        value: "festival silk"
      },
      {
        label: "Designer lace",
        value: "designer lace"
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
        label: "Student council badge",
        value: "student council badge"
      },
      {
        label: "Love confession letter",
        value: "love confession letter"
      },
      {
        label: "Planning clipboard",
        value: "planning clipboard"
      },
      {
        label: "Cheer pom",
        value: "cheer pom"
      },
      {
        label: "Disguise glasses",
        value: "disguise glasses kaguya"
      }
    ]
  }
];

const examples = [
  {
    image: "https://cdn.ocmaker.app/example/kaguya-sama-oc-generated-1.webp",
    prompt:
      "1girl, long black hair with red ribbon, red eyes, confident smirk, shuchiin academy uniform, student council president badge, elegant pose, single character, upper body, looking at viewer, anime style, student council room background",
  },
  {
    image: "https://cdn.ocmaker.app/example/kaguya-sama-oc-generated-2.webp",
    prompt:
      "1boy, blonde hair, blue eyes, friendly smile, shuchiin academy uniform, student council treasurer badge, notebook in hand, cheerful pose, single character, upper body, looking at viewer, anime style, school hallway background",
  },
  {
    image: "https://cdn.ocmaker.app/example/kaguya-sama-oc-generated-3.webp",
    prompt:
      "1girl, short pink hair, pink eyes, energetic expression, shuchiin academy uniform with cute accessories, detective band on arm, playful wink, single character, upper body, looking at viewer, anime style, classroom background",
  },
  {
    image: "https://cdn.ocmaker.app/example/kaguya-sama-oc-generated-4.webp",
    prompt:
      "1boy, dark hair with glasses, brown eyes, serious expression, shuchiin academy uniform, student council secretary badge, tablet computer, analytical pose, single character, upper body, looking at viewer, anime style, library background",
  },
];

export default {
  meta: {
    title: "Kaguya-sama OC Maker",
    description:
      "Generate your own Kaguya-sama: Love is War character OC with AI. Create elite students, student council members, and romantic rivals in the prestigious Shuchiin Academy.",
  },
  series: "Kaguya-sama",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Kaguya-sama OC Maker",
      description:
        "Generate your own Kaguya-sama: Love is War character OC with AI. Create elite students, student council members, and romantic rivals in the prestigious Shuchiin Academy.",
    },
    step: {
      title: "How to Make Kaguya-sama OC",
      description:
        "Join the psychological battles of love at Shuchiin Academy. Follow these steps to design your elite student character.",
      steps: [
        {
          title: "Choose Your Student Role",
          description:
            "Select your character's position at Shuchiin Academy: Student Council member, Elite family heir, Club president, or Regular student. Each role comes with different social standings, responsibilities, and romantic battle tactics.",
        },
        {
          title: "Design Personality and Strategy",
          description:
            "Describe your character's appearance, family background, and romantic warfare style. Include their intelligence level, special skills, and how they approach the complex game of love and confession battles.",
        },
        {
          title: "Generate Your Elite Student",
          description:
            "Click 'Generate Character' to bring your Kaguya-sama OC to life. Select from multiple AI-generated designs that capture the series' sophisticated school life and comedic romantic tension.",
        },
      ],
    },
    examples: {
      title: "Shuchiin Academy Examples",
      description:
        "Explore brilliant elite students created with text prompts using the Kaguya-sama OC Maker.",
      examples,
    },
    features: {
      title: "What is Kaguya-sama OC Maker?",
      description:
        "Kaguya-sama OC Maker is designed specifically for the elite academic world of Shuchiin. Create authentic characters with sophisticated backgrounds, romantic strategies, and intellectual battles.",
      features: [
        {
          label: "Authentic Elite School Style",
          description:
            "Generate characters that perfectly match Kaguya-sama's refined art style, from prestigious uniforms to expressive reactions and sophisticated character designs.",
        },
        {
          label: "Student Council Integration",
          description:
            "Our AI understands Shuchiin's social hierarchy, student council dynamics, and club systems, ensuring your character fits seamlessly into the elite academic environment.",
        },
        {
          label: "Instant Elite Creation",
          description:
            "Create brilliant Shuchiin students in seconds, perfect for romantic mind games, student council activities, or expanding the academy's roster of geniuses.",
        },
        {
          label: "High-Quality School Artwork",
          description:
            "Powered by AI trained on Kaguya-sama's visual standards, delivering character art that captures the series' blend of sophistication and comedic expressions.",
        },
        {
          label: "Multiple Personality Types",
          description:
            "Generate several character interpretations per prompt, exploring different intelligence types, romantic strategies, and social positions to find your perfect elite student.",
        },
        {
          label: "Shuchiin Academy Integration",
          description:
            "Create characters that naturally fit into Kaguya-sama's prestigious school setting, with authentic elite backgrounds, academic achievements, and romantic warfare tactics.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is Kaguya-sama OC Maker and how does it work?",
          answer:
            "Kaguya-sama OC Maker is an AI tool specialized for creating original Shuchiin Academy students. Describe your character's appearance, background, and romantic strategy, and our AI generates authentic Kaguya-sama style artwork.",
        },
        {
          question:
            "How can I create better characters with Kaguya-sama OC Maker?",
          answer:
            "Include specific Kaguya-sama elements like student council positions, elite family backgrounds, academic specialties, club memberships, and unique romantic battle tactics. The more details about their genius traits, the better.",
        },
        {
          question: "Is Kaguya-sama OC Maker free to use?",
          answer:
            "Yes, Kaguya-sama OC Maker offers free character generation with basic features. Premium plans provide faster generation, more student roles, and advanced customization tools.",
        },
        {
          question: "What makes Kaguya-sama OC Maker's results so authentic?",
          answer:
            "Our AI is specifically trained on Kaguya-sama's art style and elite school setting, understanding the series' unique blend of sophistication, comedy, and romantic psychological warfare.",
        },
        {
          question:
            "Can I use characters created with Kaguya-sama OC Maker commercially?",
          answer:
            "Yes, all original characters you create are yours to use for personal and commercial projects. We don't claim ownership of your student designs or Kaguya-sama OCs.",
        },
        {
          question: "Do I need an account to use Kaguya-sama OC Maker?",
          answer:
            "No account required for basic use. Creating an account allows you to save characters, access generation history, and unlock premium Shuchiin Academy features.",
        },
        {
          question: "Can I create different types of Shuchiin students?",
          answer:
            "Absolutely! Create student council members, club presidents, elite heirs, scholarship students, or transfer students. Design characters with various intelligence types and romantic approaches.",
        },
        {
          question: "Are more romantic comedy anime OC makers coming?",
          answer:
            "Yes! We're expanding to include other beloved romantic comedy and school life series. Follow our updates for new themed OC makers inspired by love battles and school comedies.",
        },
      ],
    },
    cta: {
      title: "Enter the Battle of Love and Brains",
      description:
        "Design your ultimate Shuchiin Academy student — no artistic skills required. Just imagine, describe, and join the genius-level romantic warfare.",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
