const basePrompt = `
  WORLD CONTEXT:
  Universe: Demon Slayer: Kimetsu no Yaiba
  Setting: Taisho-era Japan, Demon Slayer Corps, Nichirin blades, breathing styles, Twelve Kizuki hierarchy, Blood Demon Arts
  Key Groups: Hashira, Corps recruits, Demon Moons, Muzan's network, Swordsmith Village artisans, Kakushi support, hidden demon sympathizers

  OUTPUT FORMAT:
  Name, Corps Rank or Demon Alignment, Breathing Style/Blood Demon Art, Weapon or Fighting Style, Personality, Goal, Tragic Backstory

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Thunder Hashira Successor",
    description: "A prodigy trained under Zenitsu's lineage to master storm-borne blades.",
    prompt: `What is your character's name?
Sayo Hinata

What is their Corps rank or demon alignment?
Hashira-in-training within the Demon Slayer Corps

What Breathing Style or Blood Demon Art do they wield?
Thunder Breathing: Seventh Form — Horizon Break

What weapon or fighting style do they favor?
Twin nichirin kodachi that spark with crackling arcs

How would you describe their personality?
Soft-spoken, lightning-fast when provoked, fiercely dutiful

What goal drives them onward?
To earn the title of Thunder Hashira before her mentor retires

Share their tragic backstory.
Her mountain village was erased by a demon storm; only thunder in the distance answered her cries for help.`,
  },
  {
    title: "Mist Corps Medic",
    description: "A support slayer weaving mist to shield allies while treating wounds.",
    prompt: `What is your character's name?
Akari Fujimoto

What is their Corps rank or demon alignment?
Kanoe-ranked slayer assigned to the medical corps

What Breathing Style or Blood Demon Art do they wield?
Mist Breathing derivatives infused with healing herbs

What weapon or fighting style do they favor?
Collapsible spear that atomizes restorative mist

How would you describe their personality?
Calm, nurturing, hides anxiety behind gentle smiles

What goal drives them onward?
To reduce battlefield casualties to zero on her watch

Share their tragic backstory.
She survived a demon ambush that wiped out her entire squad, saved only by a stranger's medicine pouch.`,
  },
  {
    title: "Rogue Demon Scholar",
    description: "A former scholar turned demon who preserves human texts in secret.",
    prompt: `What is your character's name?
Kuro Tsukuda

What is their Corps rank or demon alignment?
Upper-rank demon deserter seeking redemption

What Breathing Style or Blood Demon Art do they wield?
Blood Demon Art: Ink Labyrinth — entraps foes in script threads

What weapon or fighting style do they favor?
Brush-bladed claws that write binding kanji mid-air

How would you describe their personality?
Guilt-ridden, measured, desperate to avoid killing

What goal drives them onward?
To catalog demon weaknesses and deliver them to the Corps

Share their tragic backstory.
He was forced to consume his own research party; now he hides in libraries leaving coded warnings for slayers.`,
  },
  {
    title: "Beast Breath Warrior",
    description: "A wild fighter wielding serrated blades blessed by the mountains.",
    prompt: `What is your character's name?
Raiju Aomori

What is their Corps rank or demon alignment?
Tsuguko under Inosuke's guidance

What Breathing Style or Blood Demon Art do they wield?
Beast Breathing: Sixth Fang — Ridge Reaver

What weapon or fighting style do they favor?
Dual jagged nichirin blades fashioned from boar tusk steel

How would you describe their personality?
Rowdy, loyal, surprisingly perceptive about nature

What goal drives them onward?
To defend the mountains that once sheltered him from demons

Share their tragic backstory.
Raised by boars after demons slaughtered his parents, he learned language by mimicking traveling merchants.`,
  },
  {
    title: "Sun Breathing Archivist",
    description: "A historian tracing Sun Breathing fragments across forgotten shrines.",
    prompt: `What is your character's name?
Emi Kyojuro

What is their Corps rank or demon alignment?
Civilian ally entrusted with Corps secrets

What Breathing Style or Blood Demon Art do they wield?
Sun Breathing kata transcribed into ceremonial dances

What weapon or fighting style do they favor?
Bladed fan inscribed with ancestral runes

How would you describe their personality?
Scholarly, steadfast, fueled by righteous fire

What goal drives them onward?
To restore every Sun Breathing form before Muzan's influence returns

Share their tragic backstory.
She is a distant descendant of the Rengoku line who lost her family archives when a demon torched their estate.`,
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
        label: "Trainee slayer",
        value: "trainee slayer"
      },
      {
        label: "Active corps member",
        value: "active corps member"
      },
      {
        label: "Hashira level",
        value: "hashira level"
      },
      {
        label: "Demon youth",
        value: "demon youth"
      },
      {
        label: "Ancient demon",
        value: "ancient demon"
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
        label: "Agile swordsman",
        value: "agile swordsman build"
      },
      {
        label: "Demon enhanced",
        value: "demon enhanced build"
      },
      {
        label: "Hashira muscular",
        value: "hashira muscular build"
      },
      {
        label: "Elegant dancer",
        value: "elegant dancer build"
      },
      {
        label: "Compact acrobat",
        value: "compact acrobat build"
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
        label: "Standard corps haori",
        value: "demon slayer haori"
      },
      {
        label: "Customized pattern haori",
        value: "patterned haori"
      },
      {
        label: "Hashira cloak",
        value: "hashira cloak"
      },
      {
        label: "Demon kimono",
        value: "demon kimono"
      },
      {
        label: "Swordsmith village robe",
        value: "swordsmith robe"
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
        label: "Hakama trousers",
        value: "hakama trousers"
      },
      {
        label: "Flowing demon skirt",
        value: "flowing demon skirt"
      },
      {
        label: "Battle leggings",
        value: "battle leggings"
      },
      {
        label: "Wisteria emblazoned pants",
        value: "wisteria pants"
      },
      {
        label: "Traditional tabi pants",
        value: "traditional tabi pants"
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
        label: "Standard Demon Slayer Corps",
        value: "standard demon slayer corps"
      },
      {
        label: "Hashira regalia",
        value: "hashira regalia"
      },
      {
        label: "Upper moon demon",
        value: "upper moon demon set"
      },
      {
        label: "Swordsmith artisan",
        value: "swordsmith artisan set"
      },
      {
        label: "Butterfly estate healer",
        value: "butterfly estate healer"
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
        label: "Wisteria-lined fabric",
        value: "wisteria lined fabric"
      },
      {
        label: "Breath-infused weave",
        value: "breath infused weave"
      },
      {
        label: "Demon armor scales",
        value: "demon armor scales"
      },
      {
        label: "Hashira silk",
        value: "hashira silk"
      },
      {
        label: "Fireproof haori cloth",
        value: "fireproof haori cloth"
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
        label: "Nichirin sword",
        value: "nichirin sword"
      },
      {
        label: "Breathing style scarf",
        value: "breathing style scarf"
      },
      {
        label: "Kasugai crow",
        value: "kasugai crow"
      },
      {
        label: "Demon horn adornment",
        value: "demon horn adornment"
      },
      {
        label: "Wisteria charm",
        value: "wisteria charm"
      }
    ]
  },
  {
    title: "Allegiance",
    key: "ds_allegiance",
    data: [
      {
        label: "Demon Slayer Corps",
        value: "demon slayer corps"
      },
      {
        label: "Hashira",
        value: "hashira"
      },
      {
        label: "Swordsmith village",
        value: "swordsmith village"
      },
      {
        label: "Demon",
        value: "demon"
      },
      {
        label: "Former demon",
        value: "former demon"
      }
    ]
  }
];

const examples = [
  {
    image: "https://cdn.ocmaker.app/example/demon-slayer-oc-generateds-1.webp",
    prompt:
      "1girl, black hair with red tips, violet eyes, demon slayer uniform, haori jacket, katana sword, determined expression, breathing technique effects, looking at viewer, simple background, upper body",
  },
  {
    image: "https://cdn.ocmaker.app/example/demon-slayer-oc-generateds-2.webp",
    prompt:
      "1boy, silver hair, blue eyes, demon slayer corps uniform, water breathing effects, katana, focused stance, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/demon-slayer-oc-generateds-3.webp",
    prompt:
      "1girl, auburn hair in ponytail, golden eyes, demon slayer outfit, flame breathing pattern, nichirin blade, fierce expression, combat pose, looking at viewer, simple background, upper body",
  },
  {
    image: "https://cdn.ocmaker.app/example/demon-slayer-oc-generateds-4.webp",
    prompt:
      "1boy, dark green hair, brown eyes, demon slayer uniform, stone breathing technique, heavy sword, stoic expression, defensive stance, looking at viewer, anime style, simple background, upper body",
  },
];

export default {
  meta: {
    title: "Demon Slayer OC Maker",
    description:
      "Create your own Demon Slayer OC with AI. Design powerful swordsmen, breathing techniques, and epic battles in the world of demon hunters.",
  },
  series: "Demon Slayer",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Demon Slayer OC Maker",
      description:
        "Create your own Demon Slayer OC with AI. Design powerful swordsmen, breathing techniques, and epic battles in the world of demon hunters.",
    },
    step: {
      title: "How to Make Demon Slayer OC",
      description:
        "Creating a Demon Slayer character is as intense as the battles they fight. Follow these steps to forge your demon hunter.",
      steps: [
        {
          title: "Choose Your Breathing Style",
          description:
            "Select your character's breathing technique - Water, Flame, Thunder, Stone, Wind, or create your own. Each breathing style influences combat abilities and visual effects.",
        },
        {
          title: "Design Appearance and Gear",
          description:
            "Describe your character's appearance, demon slayer uniform, and nichirin blade color. Include details like haori patterns, scars from battles, and personal accessories.",
        },
        {
          title: "Generate Your Demon Hunter",
          description:
            "Click 'Generate Character' to bring your Demon Slayer OC to life. Choose from multiple AI-generated designs that capture the intense spirit of the Demon Slayer Corps.",
        },
      ],
    },
    examples: {
      title: "Demon Slayer Examples",
      description:
        "Discover powerful demon hunters created with text prompts using the Demon Slayer OC Maker.",
      examples,
    },
    features: {
      title: "What is Demon Slayer OC Maker?",
      description:
        "Demon Slayer OC Maker is designed for the intense world of demon hunting. Create authentic characters with breathing techniques, nichirin blades, and unwavering determination.",
      features: [
        {
          label: "Authentic Demon Slayer Art Style",
          description:
            "Generate characters that perfectly match Demon Slayer's distinctive anime aesthetic, from detailed uniforms to dynamic breathing technique effects.",
        },
        {
          label: "Breathing Technique Mastery",
          description:
            "Our AI understands the various breathing styles and their visual representations, ensuring your character's abilities are authentically depicted.",
        },
        {
          label: "Rapid Character Creation",
          description:
            "Create powerful demon hunters in seconds, allowing you to focus on developing their backstories, training, and battles against demons.",
        },
        {
          label: "High-Quality Battle-Ready Art",
          description:
            "Powered by AI trained on Demon Slayer's visual standards, delivering character art that captures the intensity and beauty of the series.",
        },
        {
          label: "Multiple Combat Variations",
          description:
            "Generate several character interpretations per prompt, exploring different breathing styles, weapon designs, and battle poses.",
        },
        {
          label: "Taisho Era Integration",
          description:
            "Create characters that naturally fit into the Demon Slayer universe, with authentic period clothing, demon slayer corps elements, and combat aesthetics.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is Demon Slayer OC Maker and how does it work?",
          answer:
            "Demon Slayer OC Maker is an AI tool specialized for creating original demon hunter characters. Describe your character's breathing style, appearance, and background, and our AI generates authentic Demon Slayer-style artwork.",
        },
        {
          question:
            "How can I create better characters with Demon Slayer OC Maker?",
          answer:
            "Include specific breathing techniques, weapon details, uniform designs, and battle scars. The more Demon Slayer-specific elements like nichirin blade colors and haori patterns you include, the better the results.",
        },
        {
          question: "Is Demon Slayer OC Maker free to use?",
          answer:
            "Yes, Demon Slayer OC Maker offers free character generation with core features. Premium plans provide faster generation, advanced breathing effects, and more customization options.",
        },
        {
          question: "What makes Demon Slayer OC Maker's results so authentic?",
          answer:
            "Our AI is specifically trained on Demon Slayer's art style and universe, understanding character design principles, breathing technique effects, and Taisho era aesthetics.",
        },
        {
          question:
            "Can I use characters created with Demon Slayer OC Maker commercially?",
          answer:
            "Yes, all original characters you create are yours to use for personal and commercial projects. We don't claim ownership of your demon hunter designs.",
        },
        {
          question: "Do I need an account to use Demon Slayer OC Maker?",
          answer:
            "No account required for basic use. Creating an account allows you to save characters, access generation history, and unlock premium breathing techniques.",
        },
        {
          question:
            "Can I regenerate or modify my Demon Slayer character designs?",
          answer:
            "Absolutely! You can regenerate with the same prompt for variations or adjust your description to fine-tune your character until it perfectly matches your vision.",
        },
        {
          question: "Will you add more action anime OC Makers?",
          answer:
            "Yes! We're expanding to include other popular action and supernatural anime universes. Follow our updates for new themed OC Makers.",
        },
      ],
    },
    cta: {
      title: "Create Your Demon Hunter",
      description:
        "Forge your ultimate demon slayer warrior — no artistic skills required. Just imagine, describe, and join the fight against darkness.",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
