const basePrompt = `
  WORLD CONTEXT:
  Universe: Sonic the Hedgehog
  Setting: Mobius/Gaia landscapes, high-speed adventures, Chaos Emerald energy, Eggman's mechanized threats, Freedom Fighters
  Key Factions: Team Sonic, Team Dark, Chaotix Detective Agency, Babylon Rogues, Eggman Empire, ancient echidna clans, G.U.N., resistance cells

  OUTPUT FORMAT:
  Name, Species & Alignment, Signature Ability/Speed Trick, Gear or Wispon, Personality, Rival/Goal, Backstory Snapshot

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Velocity Vixen",
    description: "A fox pilot surfing wind tunnels with aerial stunts.",
    prompt: `What is your character's name?
Skye

What species are they and what is their alignment?
Two-tailed fox, heroic alignment

What signature ability or speed trick do they use?
Spiral Jet Dash using twin tails as turbo boosters

What gear or Wispon do they carry?
Customized hoverboard and cube Wispon

How would you describe their personality?
Adventurous, witty, always upbeat

Who is their rival or what goal drives them?
To outpace Jet the Hawk in a world Grand Prix rematch

Share a backstory snapshot.
Invented her first hoverboard after salvaging Tornado parts from Tails, now maps aerial shortcuts for the Resistance.`,
  },
  {
    title: "Guardian Armadillo",
    description: "An armored armadillo guarding Mobius ruins from Eggman bots.",
    prompt: `What is your character's name?
Brick

What species are they and what is their alignment?
Armadillo, Chaotix ally

What signature ability or speed trick do they use?
Rolling Quake slam that creates shockwaves

What gear or Wispon do they carry?
Drill Wispon and reinforced gauntlets

How would you describe their personality?
Stoic, dependable, quietly humorous

Who is their rival or what goal drives them?
To protect ancient Mobian archives hidden beneath the Mystic Ruins

Share a backstory snapshot.
Joined Knuckles after Eggman raided his ancestral archive, now sets traps to defend the Master Emerald's lore.`,
  },
  {
    title: "Cyber Hedgehog",
    description: "A tech-savvy hedgehog hacking Eggman's systems mid-race.",
    prompt: `What is your character's name?
Byte

What species are they and what is their alignment?
Hedgehog, neutral alignment

What signature ability or speed trick do they use?
Hyper Jump dash that converts data streams into speed boosts

What gear or Wispon do they carry?
Homing Wispon and wrist console

How would you describe their personality?
Sarcastic, clever, slightly aloof

Who is their rival or what goal drives them?
To free captured AI companions trapped in Eggman's databanks

Share a backstory snapshot.
Helped Tails decrypt Metal Sonic's fail-safes and now races alongside Team Sonic to sabotage EggNet nodes.`,
  },
  {
    title: "Emerald Plains Racer",
    description: "A rabbit martial artist sprinting through emerald plains with rhythmic kicks.",
    prompt: `What is your character's name?
Raia

What species are they and what is their alignment?
Rabbit, hero

What signature ability or speed trick do they use?
Rhythm Kick combo amplifying speed with percussion beats

What gear or Wispon do they carry?
Drumstick batons and burst Wispon

How would you describe their personality?
Energetic, musical, fiercely loyal

Who is their rival or what goal drives them?
To prove she can outpace Amy in a friendly spar

Share a backstory snapshot.
Grew up attending Vector's music lessons and built her rhythm combat style to liberate her village from Egg Pawns.`,
  },
  {
    title: "Rogue Treasure Hunter",
    description: "A feline treasure hunter juggling alliances for rare relics.",
    prompt: `What is your character's name?
Sable

What species are they and what is their alignment?
Cat, treasure-hunting anti-hero

What signature ability or speed trick do they use?
Shadow Blink dash through dimensional seams

What gear or Wispon do they carry?
Laser claw gauntlets and drill Wispon

How would you describe their personality?
Cunning, flirtatious, thrill-seeking

Who is their rival or what goal drives them?
To steal Eggman's Chaos Drive stash before Rouge

Share a backstory snapshot.
Former partner of Rouge who split after a heist disagreement; now plays both sides to keep relics away from Eggman.`,
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
        label: "Teen speedster",
        value: "teen speedster"
      },
      {
        label: "Young hero",
        value: "young hero mobius"
      },
      {
        label: "Seasoned adventurer",
        value: "seasoned adventurer mobius"
      },
      {
        label: "Resistance veteran",
        value: "resistance veteran"
      },
      {
        label: "Timeless entity",
        value: "timeless entity"
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
      }
    ]
  },
  {
    title: "Top",
    key: "top",
    data: [
      {
        label: "Speed suit",
        value: "speed suit"
      },
      {
        label: "Resistance jacket",
        value: "resistance jacket"
      },
      {
        label: "Tech vest",
        value: "tech vest"
      },
      {
        label: "Rider gear",
        value: "rider gear"
      },
      {
        label: "Stealth cloak",
        value: "stealth cloak"
      }
    ]
  },
  {
    title: "Bottom",
    key: "bottom",
    data: [
      {
        label: "Trail shorts",
        value: "trail shorts"
      },
      {
        label: "Kinetic leggings",
        value: "kinetic leggings"
      },
      {
        label: "Rider pants",
        value: "rider pants"
      },
      {
        label: "Utility trousers",
        value: "utility trousers mobius"
      },
      {
        label: "Adventure belts",
        value: "adventure belts"
      }
    ]
  },
  {
    title: "Set",
    key: "set",
    data: [
      {
        label: "Team Sonic",
        value: "team sonic set"
      },
      {
        label: "Chaotix detective",
        value: "chaotix detective set"
      },
      {
        label: "Freedom Fighter",
        value: "freedom fighter set"
      },
      {
        label: "Riders racing",
        value: "riders racing set"
      },
      {
        label: "Eggman infiltration",
        value: "eggman infiltration set"
      }
    ]
  },
  {
    title: "Material",
    key: "material",
    data: [
      {
        label: "Speed mesh",
        value: "speed mesh"
      },
      {
        label: "Resistant leather",
        value: "resistant leather"
      },
      {
        label: "Tech polymer",
        value: "tech polymer"
      },
      {
        label: "Chaos energy thread",
        value: "chaos energy thread"
      },
      {
        label: "Stealth fabric",
        value: "stealth fabric sonic"
      }
    ]
  },
  {
    title: "Accessory",
    key: "accessory",
    data: [
      {
        label: "Power sneakers",
        value: "power sneakers"
      },
      {
        label: "Goggles",
        value: "goggles"
      },
      {
        label: "Communicator wrist",
        value: "communicator wrist"
      },
      {
        label: "Wispon",
        value: "wispon"
      },
      {
        label: "Chaos emerald shard",
        value: "chaos emerald shard"
      }
    ]
  }
];

const examples = [
  {
    image: "https://cdn.ocmaker.app/example/sonic-oc-generated-1.webp",
    prompt:
      "1girl, silver hair, yellow eyes, spiky hair, fox ears, electric aura, futuristic bodysuit, confident expression, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
  {
    image: "https://cdn.ocmaker.app/example/sonic-oc-generated-2.webp",
    prompt:
      "1boy, cobalt blue hair, red eyes, upward spiky hair, hedgehog ears, speed goggles, tight racing suit, energetic smile, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
  {
    image: "https://cdn.ocmaker.app/example/sonic-oc-generated-3.webp",
    prompt:
      "1girl, hot pink hair, green eyes, messy ponytail, cat ears, graffiti hoodie, rebellious expression, claw gloves, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
  {
    image: "https://cdn.ocmaker.app/example/sonic-oc-generated-4.webp",
    prompt:
      "1boy, red hair, blue eyes, confident smirk, Sonic the Hedgehog style racing suit, helmet, high-speed pose, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
];

export default {
  meta: {
    title: "Sonic OC Maker",
    description:
      "Create your own Sonic character OC with AI. Design speedsters, unique abilities, and colorful adventures in the fast-paced world of Sonic the Hedgehog.",
  },
  series: "Sonic",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Sonic OC Maker",
      description:
        "Create your own Sonic character OC with AI. Design speedsters, unique abilities, and colorful adventures in the fast-paced world of Sonic the Hedgehog.",
    },
    step: {
      title: "How to Make Sonic OC",
      description:
        "Creating your Sonic character is fast and fun. Follow these steps to design your perfect speedster for the Sonic universe.",
      steps: [
        {
          title: "Choose Your Animal and Style",
          description:
            "Start by selecting your character's animal type and color scheme. Classic Sonic characters are vibrant and distinctive, with unique species traits and personality-matching colors.",
        },
        {
          title: "Design Powers and Personality",
          description:
            "Describe your character's special abilities, speed type, and personality traits. Consider their role in adventures and how they interact with the Sonic universe.",
        },
        {
          title: "Generate Your Speedster",
          description:
            "Click 'Generate Character' to bring your Sonic OC to life. Choose from multiple AI-generated designs that capture Sonic's signature cartoon style.",
        },
      ],
    },
    examples: {
      title: "Sonic Examples",
      description:
        "Explore amazing speedsters created with text prompts using the Sonic OC Maker.",
      examples,
    },
    features: {
      title: "What is Sonic OC Maker?",
      description:
        "Sonic OC Maker is designed specifically for the Sonic universe. Create authentic characters with unique abilities, animal traits, and the classic Sonic cartoon aesthetic.",
      features: [
        {
          label: "Authentic Sonic Art Style",
          description:
            "Generate characters that perfectly match Sonic's distinctive cartoon aesthetic, from character proportions to vibrant colors and dynamic expressions.",
        },
        {
          label: "Animal Character Specialization",
          description:
            "Our AI understands Sonic's diverse animal cast, creating authentic anthropomorphic characters with species-specific traits and characteristics.",
        },
        {
          label: "Lightning-Fast Generation",
          description:
            "Create colorful Sonic characters in seconds, letting you focus on developing their backstories, abilities, and place in the Sonic world.",
        },
        {
          label: "High-Quality Cartoon Art",
          description:
            "Powered by AI trained on Sonic's visual style, delivering character art that matches the series' vibrant, energetic cartoon aesthetic.",
        },
        {
          label: "Multiple Design Options",
          description:
            "Generate various character interpretations per prompt, exploring different color schemes, poses, and ability visualizations.",
        },
        {
          label: "Sonic Universe Integration",
          description:
            "Create characters that naturally fit into Sonic's world, with authentic speed abilities, adventure themes, and friendship-focused storylines.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is Sonic OC Maker and how does it work?",
          answer:
            "Sonic OC Maker is an AI tool specialized for creating original Sonic characters. Describe your character's animal type, abilities, and appearance, and our AI generates authentic Sonic-style artwork.",
        },
        {
          question: "How can I create better characters with Sonic OC Maker?",
          answer:
            "Include specific Sonic elements like animal species, speed abilities, color schemes, and personality traits. The more Sonic-universe details you provide, the more authentic your character will look.",
        },
        {
          question: "Is Sonic OC Maker free to use?",
          answer:
            "Yes, Sonic OC Maker offers free character generation with core features. Premium plans provide faster generation, more customization options, and additional design variations.",
        },
        {
          question: "What makes Sonic OC Maker's results so authentic?",
          answer:
            "Our AI is specifically trained on Sonic's cartoon art style, understanding character design principles, color palettes, and the series' distinctive anthropomorphic aesthetic.",
        },
        {
          question:
            "Can I use characters created with Sonic OC Maker commercially?",
          answer:
            "Yes, all original characters you create are yours to use for personal and commercial projects. We don't claim ownership of your character designs.",
        },
        {
          question: "Do I need an account to use Sonic OC Maker?",
          answer:
            "No account required for basic use. Creating an account allows you to save characters, access generation history, and unlock premium features.",
        },
        {
          question: "Can I regenerate or modify my Sonic character designs?",
          answer:
            "Absolutely! You can regenerate with the same prompt for variations or adjust your description to perfect your character's appearance and abilities.",
        },
        {
          question: "Will you add more cartoon-style OC Makers?",
          answer:
            "Yes! We're expanding to include other popular cartoon and game universes. Stay updated on new animated-style OC Makers.",
        },
      ],
    },
    cta: {
      title: "Create Your Sonic Speedster",
      description:
        "Design your ultimate Sonic character — no artistic skills needed. Just imagine, describe, and race into the world of Sonic.",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
