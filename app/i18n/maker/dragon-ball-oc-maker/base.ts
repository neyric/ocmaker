const basePrompt = `
  WORLD CONTEXT:
  Universe: Dragon Ball
  Setting: Earth and Universe 7, Capsule Corp tech, intergalactic tournaments, ki battles, Saiyan transformations, divine mentors
  Key Factions: Z Fighters, Red Ribbon remnants, Galactic Patrol, Frieza Force, Gods of Destruction/Kai, Tournament universes, Time Patrol

  OUTPUT FORMAT:
  Name, Race & Power Level Context, Fighting Style/School, Signature Techniques & Transformations, Personality, Rival/Goal, Backstory Snapshot

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Saiyan Scholar",
    description: "A half-Saiyan balancing research with gravity chamber sparring.",
    prompt: `What is your character's name?
Lyra Son

What is their race and power level context?
Half-Saiyan, latent potential equal to Super Saiyan Blue

What fighting style or school do they follow?
Hybrid style combining Turtle School fundamentals and Galactic Patrol tactics

What signature techniques or transformations do they wield?
Stellar Burst Kamehameha, Super Saiyan God form

How would you describe their personality?
Curious, compassionate, fiercely determined

Who is their rival or what goal do they chase?
To surpass Gohan in both intellect and power levels

Share a backstory snapshot.
Studied alien biology on Yardrat and returned to Earth to protect capsule research from Frieza Force remnants.`,
  },
  {
    title: "Namekian Guardian",
    description: "A Namekian warrior-priest safeguarding the Dragon Clan's secrets.",
    prompt: `What is your character's name?
Korinma

What is their race and power level context?
Namekian Dragon Clan warrior with high power suppression

What fighting style or school do they follow?
Spirit-style combat focused on ki barriers and staff forms

What signature techniques or transformations do they wield?
Dragon Halo Shield, Giant Form, Healing Wave

How would you describe their personality?
Stoic, wise, protective of the innocent

Who is their rival or what goal do they chase?
To defend the new Dragon Balls from space pirates

Share a backstory snapshot.
Merged with two elder Namekians to gain their knowledge after their village was raided by Moro's henchmen.`,
  },
  {
    title: "Galactic Patrol Ace",
    description: "An elite patrol officer specializing in pursuit of interstellar criminals.",
    prompt: `What is your character's name?
Tarin Jax

What is their race and power level context?
Tuffle survivor armed with cutting-edge scouters

What fighting style or school do they follow?
Galactic Patrol aerial combat and joint locks

What signature techniques or transformations do they wield?
Photon Lariat, Ultra Instinct Sign (partial mastery)

How would you describe their personality?
Confident, law-abiding, jokes under pressure

Who is their rival or what goal do they chase?
To capture a rogue Heeter who stole Tuffle tech

Share a backstory snapshot.
Grew up in a refugee colony orbiting Planet Vegeta's ruins and swore to stop cosmic war profiteers.`,
  },
  {
    title: "Earthling Martial Artist",
    description: "A human champion blending Crane School precision with modern MMA.",
    prompt: `What is your character's name?
Mika Ishido

What is their race and power level context?
Earthling with power level rivaling Super Saiyan 2

What fighting style or school do they follow?
Crane School strikes fused with Capsule Corp kinetic gear

What signature techniques or transformations do they wield?
Tri-Beam Nova, Gravity Burst Step, Ki Barrier Fist

How would you describe their personality?
Disciplined, humble, hungry for challenge

Who is their rival or what goal do they chase?
To defeat Vegeta in a sanctioned friendly tournament

Share a backstory snapshot.
Won the Tenkaichi Budokai by debuting gravity training suits co-developed with Bulma.`,
  },
  {
    title: "Time Patroller",
    description: "A chronal guardian fixing distortions across multiple timelines.",
    prompt: `What is your character's name?
Chrona Vega

What is their race and power level context?
Saiyan-Earthling hybrid recruited by the Time Patrol

What fighting style or school do they follow?
Time Patrol Swordsmanship with Instant Transmission mix

What signature techniques or transformations do they wield?
Chrono Slash, Super Saiyan 4 Limit Breaker, Warp Kiai

How would you describe their personality?
Resolute, analytical, rarely surprised

Who is their rival or what goal do they chase?
To prevent Demon God Demigra from rewriting Bardock's sacrifice

Share a backstory snapshot.
Witnessed her own timeline collapse and now travels with Trunks to safeguard pivotal battles.`,
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
        label: "Young martial artist",
        value: "young martial artist"
      },
      {
        label: "Saiyan teen",
        value: "saiyan teen"
      },
      {
        label: "Galactic patrol recruit",
        value: "galactic patrol recruit"
      },
      {
        label: "Seasoned fighter",
        value: "seasoned fighter"
      },
      {
        label: "Ancient warrior",
        value: "ancient warrior"
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
      },
      {
        label: "Lean fighter",
        value: "lean fighter build"
      },
      {
        label: "Saiyan muscular",
        value: "saiyan muscular build"
      },
      {
        label: "Agile martial artist",
        value: "agile martial artist"
      },
      {
        label: "Bulking tank",
        value: "bulking tank"
      },
      {
        label: "Divine aura physique",
        value: "divine aura physique"
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
        label: "Gi top",
        value: "gi top"
      },
      {
        label: "Saiyan armor",
        value: "saiyan armor"
      },
      {
        label: "Galactic patrol jacket",
        value: "galactic patrol jacket"
      },
      {
        label: "Capsule Corp hoodie",
        value: "capsule corp hoodie"
      },
      {
        label: "Angel robe",
        value: "angel robe"
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
        label: "Gi pants",
        value: "gi pants"
      },
      {
        label: "Battle leggings",
        value: "battle leggings db"
      },
      {
        label: "Saiyan armor greaves",
        value: "saiyan armor greaves"
      },
      {
        label: "Casual training shorts",
        value: "training shorts"
      },
      {
        label: "Godly sashes",
        value: "godly sashes"
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
        label: "Z-Fighter uniform",
        value: "z fighter uniform"
      },
      {
        label: "Saiyan elite",
        value: "saiyan elite set"
      },
      {
        label: "Galactic patrol",
        value: "galactic patrol set"
      },
      {
        label: "Capsule corp casual",
        value: "capsule corp casual"
      },
      {
        label: "Divine tournament",
        value: "divine tournament set"
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
        label: "Weighted fabric",
        value: "weighted fabric"
      },
      {
        label: "Saiyan armor plates",
        value: "saiyan armor plates"
      },
      {
        label: "Training gi cotton",
        value: "training gi cotton"
      },
      {
        label: "God ki weave",
        value: "god ki weave"
      },
      {
        label: "Ultra instinct glow",
        value: "ultra instinct glow"
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
        label: "Scouter",
        value: "scouter"
      },
      {
        label: "Weighted wristbands",
        value: "weighted wristbands"
      },
      {
        label: "Tail wrap",
        value: "tail wrap"
      },
      {
        label: "Senzu pouch",
        value: "senzu pouch"
      },
      {
        label: "Halo aura",
        value: "halo aura"
      }
    ]
  }
];

const examples = [
  {
    image: "https://cdn.ocmaker.app/example/dragon-ball-oc-generated-1.webp",
    prompt:
      "1boy, spiky red hair, brown eyes, confident grin, Dragon Ball style fighter clothing, power level scouter, heroic stance, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
  {
    image: "https://cdn.ocmaker.app/example/dragon-ball-oc-generated-2.webp",
    prompt:
      "1boy, silver hair, blue eyes, mischievous look, Dragon Ball style training gear, weighted clothing, fighting stance, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
  {
    image: "https://cdn.ocmaker.app/example/dragon-ball-oc-generated-3.webp",
    prompt:
      "1boy, blonde hair, orange eyes, joyful smile, Dragon Ball style gi, dragon emblem, relaxed pose, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
  {
    image: "https://cdn.ocmaker.app/example/dragon-ball-oc-generated-4.webp",
    prompt:
      "1girl, purple hair, yellow eyes, playful smile, Dragon Ball style casual outfit, energy blast, energetic pose, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
];

export default {
  meta: {
    title: "Dragon Ball OC Maker",
    description:
      "Create your own Dragon Ball warrior OC with AI. Design powerful fighters, epic transformations, and legendary techniques in the world of Dragon Ball.",
  },
  series: "Dragon Ball",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Dragon Ball OC Maker",
      description:
        "Create your own Dragon Ball warrior OC with AI. Design powerful fighters, epic transformations, and legendary techniques in the world of Dragon Ball.",
    },
    step: {
      title: "How to Make Dragon Ball OC",
      description:
        "Creating your Dragon Ball fighter is straightforward. Follow these steps to design your ultimate warrior for the Dragon Ball universe.",
      steps: [
        {
          title: "Choose Your Fighter Type",
          description:
            "Start by deciding your character's race and fighting style: Saiyan, Human, Namekian, Android, or other alien races. Consider their unique abilities and transformation potential.",
        },
        {
          title: "Design Powers and Appearance",
          description:
            "Describe your fighter's signature techniques, ki abilities, and physical appearance. Include details about their training background and martial arts style.",
        },
        {
          title: "Generate Your Warrior",
          description:
            "Click 'Generate Character' to bring your Dragon Ball fighter to life. Choose from multiple AI-generated designs that capture the iconic Dragon Ball art style.",
        },
      ],
    },
    examples: {
      title: "Dragon Ball Examples",
      description:
        "Explore powerful warriors created with text prompts using the Dragon Ball OC Maker.",
      examples,
    },
    features: {
      title: "What is Dragon Ball OC Maker?",
      description:
        "Dragon Ball OC Maker is designed specifically for the Dragon Ball universe. Create authentic fighters with signature techniques, transformations, and martial arts mastery.",
      features: [
        {
          label: "Authentic Dragon Ball Art Style",
          description:
            "Generate characters that perfectly capture Dragon Ball's iconic manga and anime aesthetic, from muscular physiques to dynamic fighting poses.",
        },
        {
          label: "Transformation System Focus",
          description:
            "Our AI understands Dragon Ball's transformation mechanics, from Super Saiyan forms to unique power-ups, ensuring authentic power progression visuals.",
        },
        {
          label: "Instant Fighter Creation",
          description:
            "Create professional-quality Dragon Ball characters in seconds, allowing you to focus on developing their techniques, backstories, and power levels.",
        },
        {
          label: "Battle-Ready Artwork",
          description:
            "Powered by AI trained on Dragon Ball's visual standards, delivering character art perfect for martial arts scenarios and epic battles.",
        },
        {
          label: "Multiple Power States",
          description:
            "Generate various forms and power levels for your character, exploring different transformations, auras, and fighting stances.",
        },
        {
          label: "Universe Integration",
          description:
            "Create fighters that seamlessly fit into Dragon Ball's rich mythology, with authentic martial arts backgrounds, alien origins, and power scaling.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is Dragon Ball OC Maker and how does it work?",
          answer:
            "Dragon Ball OC Maker is an AI tool specialized for creating original Dragon Ball fighters. Describe your character's race, fighting style, and powers, and our AI generates authentic Dragon Ball-style artwork.",
        },
        {
          question:
            "How can I create better fighters with Dragon Ball OC Maker?",
          answer:
            "Include specific Dragon Ball elements like ki techniques, transformation states, martial arts training, and race characteristics. The more detailed your fighter's abilities and background, the better the results.",
        },
        {
          question: "Is Dragon Ball OC Maker free to use?",
          answer:
            "Yes, Dragon Ball OC Maker offers free character generation with essential features. Premium plans provide faster generation, more transformation options, and advanced customization.",
        },
        {
          question: "What makes Dragon Ball OC Maker's results so authentic?",
          answer:
            "Our AI is specifically trained on Dragon Ball's distinctive art style, understanding character proportions, energy effects, and the series' unique martial arts aesthetic.",
        },
        {
          question:
            "Can I use fighters created with Dragon Ball OC Maker commercially?",
          answer:
            "Yes, all original fighters you create are yours to use for personal and commercial projects. We don't claim ownership of your character designs.",
        },
        {
          question: "Do I need an account to use Dragon Ball OC Maker?",
          answer:
            "No account required for basic use. Creating an account allows you to save fighters, access generation history, and unlock premium transformation features.",
        },
        {
          question:
            "Can I regenerate or modify my Dragon Ball character designs?",
          answer:
            "Absolutely! You can regenerate with the same prompt for variations or adjust your description to perfect your fighter's appearance and power level.",
        },
        {
          question: "Will you add more battle manga OC Makers?",
          answer:
            "Yes! We're expanding to include other popular battle manga and anime universes. Stay tuned for new fighting-focused OC Makers.",
        },
      ],
    },
    cta: {
      title: "Create Your Dragon Ball Fighter",
      description:
        "Design the ultimate Dragon Ball warrior — no artistic skills required. Just envision, describe, and unleash your fighter's power.",
      btns: {
        start: "Start Creating",
        explore: "Explore Fighters",
      },
    },
  },
};
