const basePrompt = `
  WORLD CONTEXT:
  Universe: Haikyu!!
  Setting: Japanese high school volleyball leagues, inter-high tournaments, club rivalries, training camps, college/pro scout attention
  Key Teams: Karasuno, Nekoma, Aoba Johsai, Fukurodani, Shiratorizawa, Inarizaki, MSBY Black Jackals, Schweiden Adlers, national youth camps

  OUTPUT FORMAT:
  Name, School & Year, Position, Signature Playstyle/Weapon, Personality, Rival/Goal, Volleyball Backstory

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Karasuno Setter",
    description: "A first-year setter pushing tempo to match the Freak Quick.",
    prompt: `What is your character's name?
Haruto Ise

What school and year are they in?
Karasuno High, first-year

What position do they play?
Setter

What is their signature playstyle or weapon?
High-speed jump sets launched from unlikely angles

How would you describe their personality?
Focused, self-critical, quietly determined

Who is their rival or what goal drives them?
To create a new super quick that surprises even Hinata

Share a volleyball backstory snapshot.
Transferred from a basketball program and begged Coach Ukai for a chance after seeing Karasuno's Nationals run.`,
  },
  {
    title: "Nekoma Libero",
    description: "A libero studying cats to perfect her reflexes and reads.",
    prompt: `What is your character's name?
Mika Kozume

What school and year are they in?
Nekoma High, second-year

What position do they play?
Libero

What is their signature playstyle or weapon?
Rolling receivers and one-handed pancake saves

How would you describe their personality?
Playful, analytical, fiercely supportive

Who is their rival or what goal drives them?
To dethrone Karasuno in the Battle of the Garbage Dump rematch

Share a volleyball backstory snapshot.
Is Kenma's cousin; she trains by reacting to laser pointers with shelter cats.`,
  },
  {
    title: "Fukurodani Ace",
    description: "A successor candidate studying Bokuto's mood swings to stabilize the team.",
    prompt: `What is your character's name?
Rika Aioi

What school and year are they in?
Fukurodani Academy, third-year

What position do they play?
Wing spiker

What is their signature playstyle or weapon?
Power tips combined with line-shot bombardment

How would you describe their personality?
Energetic, encouraging, thrives on big moments

Who is their rival or what goal drives them?
To lead Fukurodani back to Nationals after Bokuto graduates

Share a volleyball backstory snapshot.
Bokuto mentored her after she cheered him out of a slump during a summer camp scrimmage.`,
  },
  {
    title: "Aoba Johsai Blocker",
    description: "A middle blocker obsessed with reading setters before they move.",
    prompt: `What is your character's name?
Keita Sendai

What school and year are they in?
Seijoh, second-year

What position do they play?
Middle blocker

What is their signature playstyle or weapon?
Anticipation-based blocks and feint slides

How would you describe their personality?
Calm, strategic, perfectionist

Who is their rival or what goal drives them?
To shut down Kageyama's quicks in their next regional final

Share a volleyball backstory snapshot.
Joined the team after watching Oikawa's precise sets inspire his junior high club to reach prefecturals.`,
  },
  {
    title: "MSBY Analyst",
    description: "A college statistician testing pro-level tactics in club scrimmages.",
    prompt: `What is your character's name?
Nao Miyake

What school and year are they in?
Adlers University Club, graduate student

What position do they play?
Opposite hitter and analyst

What is their signature playstyle or weapon?
Back-row pipe attacks paired with statistical serve targeting

How would you describe their personality?
Studious, upbeat, always scribbling notes

Who is their rival or what goal drives them?
To earn a development contract with the MSBY Black Jackals

Share a volleyball backstory snapshot.
Interned with Coach Foster and designed a data dashboard Hinata praised during training camp.`,
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
        value: "first year"
      },
      {
        label: "Second-year",
        value: "second year"
      },
      {
        label: "Third-year",
        value: "third year"
      },
      {
        label: "College player",
        value: "college player"
      },
      {
        label: "Pro league",
        value: "pro league"
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
        label: "Karasuno jersey",
        value: "karasuno jersey"
      },
      {
        label: "Nekoma jersey",
        value: "nekoma jersey"
      },
      {
        label: "Fukurodani jersey",
        value: "fukurodani jersey"
      },
      {
        label: "Aoba Johsai jersey",
        value: "aoba johsai jersey"
      },
      {
        label: "MSBY warm-up",
        value: "msby warm up"
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
        label: "Team shorts",
        value: "team shorts"
      },
      {
        label: "Compression leggings",
        value: "compression leggings"
      },
      {
        label: "Practice sweats",
        value: "practice sweats"
      },
      {
        label: "Travel pants",
        value: "travel pants"
      },
      {
        label: "Beach volleyball shorts",
        value: "beach volleyball shorts"
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
        label: "Karasuno crows",
        value: "karasuno crows set"
      },
      {
        label: "Nekoma cats",
        value: "nekoma cats set"
      },
      {
        label: "Fukurodani owls",
        value: "fukurodani owls set"
      },
      {
        label: "Schweiden Adlers",
        value: "schweiden adlers set"
      },
      {
        label: "MSBY Black Jackals",
        value: "msby black jackals set"
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
        label: "Sweat-wicking mesh",
        value: "sweat wicking mesh"
      },
      {
        label: "Ventilated jersey",
        value: "ventilated jersey"
      },
      {
        label: "Compression fabric",
        value: "compression fabric"
      },
      {
        label: "Warm-up fleece",
        value: "warm up fleece"
      },
      {
        label: "Beach-ready fabric",
        value: "beach ready fabric"
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
        label: "Captain armband",
        value: "captain armband haikyuu"
      },
      {
        label: "Knee pads",
        value: "knee pads"
      },
      {
        label: "Volleyball gloves",
        value: "volleyball gloves"
      },
      {
        label: "Neck towel",
        value: "neck towel"
      },
      {
        label: "Water bottle",
        value: "water bottle"
      }
    ]
  }
];

const examples = [
  {
    image: "https://cdn.ocmaker.app/example/haikyuu-oc-generated-1.webp",
    prompt:
      "1boy, spiky orange hair, brown eyes, energetic grin, karasuno volleyball uniform, black and orange jersey number 10, jumping pose, single character, upper body, looking at viewer, anime style, gymnasium background",
  },
  {
    image: "https://cdn.ocmaker.app/example/haikyuu-oc-generated-2.webp",
    prompt:
      "1boy, tall with glasses, blonde hair, golden eyes, analytical expression, tsukishima-style, karasuno uniform, middle blocker stance, single character, upper body, looking at viewer, anime style, volleyball court background",
  },
  {
    image: "https://cdn.ocmaker.app/example/haikyuu-oc-generated-3.webp",
    prompt:
      "1girl, ponytail black hair, determined eyes, serious expression, girls volleyball team uniform, manager clipboard, supportive pose, single character, upper body, looking at viewer, anime style, team bench background",
  },
  {
    image: "https://cdn.ocmaker.app/example/haikyuu-oc-generated-4.webp",
    prompt:
      "1boy, silver hair, sharp eyes, confident smirk, rival team uniform, setter position, tossing pose, single character, upper body, looking at viewer, anime style, tournament venue background",
  },
];

export default {
  meta: {
    title: "Haikyuu!! OC Maker",
    description:
      "Generate your own Haikyuu!! character OC with AI. Create volleyball players, team managers, and rivals with unique playing styles and team dynamics.",
  },
  series: "Haikyuu!!",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Haikyuu!! OC Maker",
      description:
        "Generate your own Haikyuu!! character OC with AI. Create volleyball players, team managers, and rivals with unique playing styles and team dynamics.",
    },
    step: {
      title: "How to Make Haikyuu!! OC",
      description:
        "Join the intense world of high school volleyball. Follow these steps to design your perfect player or team member.",
      steps: [
        {
          title: "Choose Your Position and Team",
          description:
            "Select your character's volleyball position (Setter, Wing Spiker, Middle Blocker, Libero, or Manager) and team affiliation. Each position has unique skills, playing styles, and court responsibilities.",
        },
        {
          title: "Design Playing Style and Personality",
          description:
            "Describe your character's appearance, special techniques, and volleyball philosophy. Include details about their jumping ability, signature moves, team relationships, and what drives them to play volleyball.",
        },
        {
          title: "Generate Your Volleyball Player",
          description:
            "Click 'Generate Character' to bring your Haikyuu!! OC to life. Choose from multiple AI-generated designs that capture the series' dynamic sports action and passionate team spirit.",
        },
      ],
    },
    examples: {
      title: "Volleyball Player Examples",
      description:
        "Discover amazing volleyball players created with text prompts using the Haikyuu!! OC Maker.",
      examples,
    },
    features: {
      title: "What is Haikyuu!! OC Maker?",
      description:
        "Haikyuu!! OC Maker is designed specifically for the volleyball universe. Create authentic players with unique positions, playing styles, and team dynamics that fly high.",
      features: [
        {
          label: "Authentic Sports Anime Style",
          description:
            "Generate characters that perfectly match Haikyuu!!'s dynamic art style, from intense match expressions to team uniforms and athletic body proportions.",
        },
        {
          label: "Position System Integration",
          description:
            "Our AI understands all volleyball positions and their characteristics, ensuring your player's skills, build, and playing style match their court role perfectly.",
        },
        {
          label: "Instant Team Member Creation",
          description:
            "Create passionate volleyball players in seconds, perfect for team rosters, rival schools, or expanding the competitive volleyball scene.",
        },
        {
          label: "High-Quality Action Artwork",
          description:
            "Powered by AI trained on Haikyuu!!'s visual standards, delivering character art that captures the series' energy, determination, and sports intensity.",
        },
        {
          label: "Multiple Playing Styles",
          description:
            "Generate several character interpretations per prompt, exploring different positions, special moves, and team dynamics to find your perfect volleyball player.",
        },
        {
          label: "Volleyball World Integration",
          description:
            "Create characters that naturally fit into Haikyuu!!'s competitive scene, with authentic team cultures, playing philosophies, and tournament ambitions.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is Haikyuu!! OC Maker and how does it work?",
          answer:
            "Haikyuu!! OC Maker is an AI tool specialized for creating original volleyball players. Describe your character's position, appearance, and playing style, and our AI generates authentic Haikyuu!!-style artwork.",
        },
        {
          question:
            "How can I create better characters with Haikyuu!! OC Maker?",
          answer:
            "Include specific volleyball elements like positions, signature moves, jumping abilities, team dynamics, and personal motivations. Reference real volleyball techniques and team strategies for more authentic players.",
        },
        {
          question: "Is Haikyuu!! OC Maker free to use?",
          answer:
            "Yes, Haikyuu!! OC Maker offers free character generation with basic features. Premium plans provide faster generation, more team options, and advanced customization tools.",
        },
        {
          question: "What makes Haikyuu!! OC Maker's results so authentic?",
          answer:
            "Our AI is specifically trained on Haikyuu!!'s art style and sports themes, understanding volleyball positions, team dynamics, and the series' distinctive energetic aesthetic.",
        },
        {
          question:
            "Can I use characters created with Haikyuu!! OC Maker commercially?",
          answer:
            "Yes, all original characters you create are yours to use for personal and commercial projects. We don't claim ownership of your player designs or Haikyuu!! OCs.",
        },
        {
          question: "Do I need an account to use Haikyuu!! OC Maker?",
          answer:
            "No account required for basic use. Creating an account allows you to save players, access generation history, and unlock premium volleyball-themed features.",
        },
        {
          question: "Can I create players from different teams and positions?",
          answer:
            "Absolutely! Create players from any team (Karasuno, Nekoma, Aoba Johsai, etc.) in any position. You can also design managers, coaches, or even create your own teams.",
        },
        {
          question: "Are more sports anime OC makers being developed?",
          answer:
            "Yes! We're expanding to include other beloved sports anime series. Follow our updates for new themed OC makers inspired by athletic competition and team spirit.",
        },
      ],
    },
    cta: {
      title: "Fly High on the Court",
      description:
        "Design your ultimate volleyball player — no artistic skills required. Just imagine, describe, and join the thrilling world of high school volleyball.",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
