const basePrompt = `
  WORLD CONTEXT:
  Universe: Voltron: Legendary Defender
  Setting: Intergalactic conflict between the Voltron Coalition and the Galra Empire, Altean technology, quintessence-powered lions, cosmic diplomacy
  Key Elements: Paladins of Voltron, Blade of Marmora, Castle of Lions crew, Altean survivors, Coalition allies, Galra resistance cells, cosmic fauna and anomalies

  OUTPUT FORMAT:
  Name, Species/Affiliation, Lion or Platform, Combat Specialty, Gear or Quintessence Ability, Personality, Motivation, Backstory Snapshot

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Marmora Shadow Operative",
    description:
      "A Galra-Altean hybrid infiltrator who relays intel to Voltron from inside the empire.",
    prompt: `What is your character's name?
Seryn Kaon

What species or affiliation do they belong to?
Blade of Marmora hybrid operative

Which lion, vehicle, or combat platform do they pilot?
Personal Marmora stealth interceptor

What is their combat specialty?
Silent extraction and shadow-step sabotage

What gear or quintessence ability defines them?
Adaptive Marmora blade with quintessence dampeners

How would you describe their personality?
Patient, observant, fiercely loyal to liberated worlds

What motivates them during the war?
To dismantle the empire that erased their clan and prove hybridity is strength

Share a brief backstory snapshot.
Seryn grew up hidden in Weblum tunnels until the Blade found them; now they ghost through high-command cruisers feeding intel to Pidge and Kolivan.`,
  },
  {
    title: "Coalition Star Diplomat",
    description:
      "A former Garrison cadet who now negotiates alliances for Allura across liberated systems.",
    prompt: `What is your character's name?
Maya Chen

What species or affiliation do they belong to?
Earth-born officer within the Voltron Coalition

Which lion, vehicle, or combat platform do they pilot?
Castle of Lions shuttle refit for diplomatic missions

What is their combat specialty?
Defensive quintessence barriers and crisis mediation

What gear or quintessence ability defines them?
Light-field projector gauntlets that weave instant shields

How would you describe their personality?
Warm, strategic, always cataloging cultural nuances

What motivates them during the war?
To rebuild trust between liberated planets and organize a united front

Share a brief backstory snapshot.
When the Kerberos mission vanished, Maya left flight school to join the rescue effort; now she brokers fragile ceasefires while Coran keeps the engines humming.`,
  },
  {
    title: "Altean Quintessence Healer",
    description:
      "A descendant of Altean engineers who channels quintessence to restore armor and pilots alike.",
    prompt: `What is your character's name?
Eryth Velora

What species or affiliation do they belong to?
Altean healer stationed aboard the Castle of Lions

Which lion, vehicle, or combat platform do they pilot?
Occasionally co-pilots the Red Lion for rescue insertions

What is their combat specialty?
Field restoration and energy stabilizing support

What gear or quintessence ability defines them?
Living circuitry tattoos that redirect quintessence flow

How would you describe their personality?
Empathetic, methodical, quietly stubborn when lives are on the line

What motivates them during the war?
To ensure no paladin or ally is lost for lack of healing arts

Share a brief backstory snapshot.
Raised on Oriande’s hidden moon, Eryth fled with the last of the Altean scholars and now keeps Voltron battle-ready between engagements.`,
  },
  {
    title: "Galra Defector Ace",
    description:
      "A former commander who turned against Zarkon's regime after witnessing colony purges.",
    prompt: `What is your character's name?
Tharex Zayar

What species or affiliation do they belong to?
Galra defector aligned with the Voltron Coalition

Which lion, vehicle, or combat platform do they pilot?
Heavily modified Galra strike-class fighter nicknamed Ember Fang

What is their combat specialty?
Long-range artillery solutions and command disruption

What gear or quintessence ability defines them?
Twin graviton cannons synced with salvaged bayard focus

How would you describe their personality?
Disciplined, dry-humored, haunted by former orders

What motivates them during the war?
To liberate subjugated sectors and protect their crew from the empire they once served

Share a brief backstory snapshot.
Tharex sabotaged his own cruiser during the Olkarion siege, faked his death, and now trains rebel squadrons under Shiro’s guidance.`,
  },
];

const ocOptions = [
  {
    title: "Gender",
    key: "gender",
    unique: true,
    data: [
      { label: "Boy", value: "1boy" },
      { label: "Girl", value: "1girl" },
      { label: "Non-binary", value: "1person" },
      { label: "Altean shapeshifter", value: "altean shapeshifter" },
    ],
  },
  {
    title: "Species",
    key: "species",
    data: [
      { label: "Human paladin", value: "earth human paladin" },
      { label: "Altean", value: "altean" },
      { label: "Galra", value: "galra" },
      { label: "Half-Galra hybrid", value: "half galra" },
      { label: "Olkari", value: "olkari" },
      { label: "Balmeran", value: "balmeran" },
      { label: "Merfolk of Nalheve", value: "merfolk nalheve" },
      { label: "Rebel druid", value: "quintessence druid" },
    ],
  },
  {
    title: "Role",
    key: "role",
    data: [
      { label: "Black Lion paladin", value: "black lion paladin" },
      { label: "Red Lion paladin", value: "red lion paladin" },
      { label: "Blue Lion paladin", value: "blue lion paladin" },
      { label: "Green Lion paladin", value: "green lion paladin" },
      { label: "Yellow Lion paladin", value: "yellow lion paladin" },
      { label: "MFE pilot", value: "mfe pilot" },
      { label: "Blade of Marmora agent", value: "blade of marmora agent" },
      { label: "Coalition diplomat", value: "coalition diplomat" },
      { label: "Castle crew engineer", value: "castle of lions engineer" },
      { label: "Galra rebel captain", value: "galra rebel captain" },
    ],
  },
  {
    title: "Armor",
    key: "top",
    data: [
      { label: "Legendary paladin armor", value: "paladin armor" },
      { label: "Marmora stealth suit", value: "marmora stealth suit" },
      { label: "Altean royal robes", value: "altean royal robes" },
      { label: "Coalition officer jacket", value: "coalition officer jacket" },
      { label: "Earth Garrison flight suit", value: "garrison flight suit" },
      { label: "Galra commander armor", value: "galra commander armor" },
      { label: "Olkari exo-harness", value: "olkari exo harness" },
      { label: "Balmeran miner gear", value: "balmeran miner gear" },
    ],
  },
  {
    title: "Lower Gear",
    key: "bottom",
    data: [
      { label: "Paladin armor greaves", value: "paladin greaves" },
      { label: "Stealth suit leggings", value: "stealth leggings" },
      { label: "Altean ceremonial panels", value: "altean ceremonial panels" },
      { label: "Coalition utility pants", value: "coalition utility pants" },
      { label: "Garrison cargo pants", value: "garrison cargo pants" },
      { label: "Galra armored tassets", value: "galra armored tassets" },
      { label: "Olkari tech wraps", value: "olkari tech wraps" },
      { label: "Balmeran work trousers", value: "balmeran work trousers" },
    ],
  },
  {
    title: "Footwear",
    key: "footwear",
    data: [
      { label: "Paladin boots", value: "paladin boots" },
      { label: "Mag-lock combat boots", value: "mag lock combat boots" },
      { label: "Lightweight flight boots", value: "lightweight flight boots" },
      { label: "Stealth tread soles", value: "stealth tread soles" },
      { label: "Altean glide sandals", value: "altean glide sandals" },
      { label: "Galra grav boots", value: "galra grav boots" },
      { label: "Olkari vine braces", value: "olkari vine braces" },
      { label: "Balmeran stone boots", value: "balmeran stone boots" },
    ],
  },
  {
    title: "Hair",
    key: "hair",
    data: [
      { label: "Short black hair", value: "short black hair" },
      { label: "White Altean hair", value: "white Altean hair" },
      { label: "Purple Galra mane", value: "purple galra hair" },
      {
        label: "Teal quintessence streaks",
        value: "teal quintessence streak hair",
      },
      { label: "Buzz cut", value: "buzz cut hair" },
      { label: "Long braided hair", value: "long braided hair" },
      { label: "Curly brown hair", value: "curly brown hair" },
      { label: "Shaved sides with runes", value: "shaved sides rune hair" },
    ],
  },
  {
    title: "Eyes",
    key: "eyes",
    data: [
      { label: "Blue eyes", value: "blue eyes" },
      { label: "Green eyes", value: "green eyes" },
      { label: "Gold eyes", value: "gold eyes" },
      { label: "Violet glow", value: "violet glowing eyes" },
      { label: "Amber eyes", value: "amber eyes" },
      { label: "Silver eyes", value: "silver eyes" },
      { label: "Brown eyes", value: "brown eyes" },
      { label: "Holographic irises", value: "holographic eyes" },
    ],
  },
  {
    title: "Expression",
    key: "face",
    data: [
      { label: "Confident smile", value: "confident smile" },
      { label: "Determined glare", value: "determined glare" },
      { label: "Warm expression", value: "warm expression" },
      { label: "Tactical focus", value: "tactical focus expression" },
      { label: "Calm strategist", value: "calm strategist expression" },
      { label: "Battle cry", value: "battle cry expression" },
      { label: "Playful smirk", value: "playful smirk" },
      { label: "Stoic guard", value: "stoic guard expression" },
    ],
  },
  {
    title: "Skin",
    key: "skin",
    data: [
      { label: "Fair skin", value: "fair skin" },
      { label: "Warm tan skin", value: "warm tan skin" },
      { label: "Deep brown skin", value: "deep brown skin" },
      { label: "Freckled skin", value: "freckled skin" },
      { label: "Violet Galra tone", value: "violet galra skin" },
      { label: "Luminescent Altean", value: "luminescent altean skin" },
      { label: "Olkari green hue", value: "olkari green skin" },
      { label: "Balmeran stony pattern", value: "balmeran stone skin" },
    ],
  },
  {
    title: "Accessory",
    key: "accessory",
    data: [
      { label: "Bayard", value: "bayard weapon" },
      { label: "Marmora blade", value: "marmora blade accessory" },
      { label: "Altean circlet", value: "altean circlet" },
      { label: "Garrison data visor", value: "garrison data visor" },
      { label: "Quintessence gauntlet", value: "quintessence gauntlet" },
      { label: "Galra shoulder cape", value: "galra shoulder cape" },
      { label: "Olkari drone companion", value: "olkari drone companion" },
      { label: "Coalition mission tablet", value: "coalition mission tablet" },
    ],
  },
  {
    title: "Setting",
    key: "voltron_setting",
    data: [
      { label: "Castle of Lions bridge", value: "castle of lions bridge" },
      { label: "Galra flagship hangar", value: "galra flagship hangar" },
      { label: "Olkari forest", value: "olkari luminous forest" },
      { label: "Balmera crystal cavern", value: "balmera crystal cavern" },
      { label: "Space battle backdrop", value: "space battle backdrop" },
      { label: "Alien marketplace", value: "alien marketplace" },
      { label: "Desert rebel base", value: "desert rebel base" },
      { label: "Quintessence storm", value: "quintessence storm sky" },
    ],
  },
];

const examples = [
  {
    image: "https://cdn.ocmaker.app/results/um7x7B3BtXothPwyJKnio.png",
    prompt:
      "1girl, altean healer, teal glowing markings, white hair in braids, paladin armor with gold trim, bayard staff, warm expression, castle of lions bridge, sci-fi anime style, single character, upper body, looking at viewer",
  },
  {
    image: "https://cdn.ocmaker.app/results/4WeBAxlUGVVt1eTQdwmSf.png",
    prompt:
      "1boy, blade of marmora agent, purple galra skin, stealth suit, dual marmora blades, determined glare, neon blue backlighting, galra flagship hangar, sci-fi anime style, single character, upper body, looking at viewer",
  },
  {
    image: "https://cdn.ocmaker.app/results/209soG8lPRbIdh1nNQ8zS.png",
    prompt:
      "1person, coalition diplomat, brown skin, curly hair with teal streak, officer jacket, holographic tablet accessory, confident smile, alien marketplace, sci-fi anime style, single character, upper body, looking at viewer",
  },
  {
    image: "https://cdn.ocmaker.app/results/75IuA3yHcBI6E1WVkaRUG.png",
    prompt:
      "1boy, galra defector pilot, magenta armor, gold eyes, grav boots, tactical cape, blaster cannon, space battle backdrop, sci-fi anime style, single character, upper body, looking at viewer",
  },
];

export default {
  meta: {
    title: "Voltron OC Maker",
    description:
      "Create original Voltron paladins, Marmora agents, and intergalactic allies with AI-powered character art and backstories.",
  },
  series: "Voltron",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Voltron OC Maker",
      description:
        "Design your own Paladin, Altean healer, or Galra rebel with AI. Describe their gear, lion, and quintessence gifts to see them come to life instantly.",
    },
    step: {
      title: "How to Make a Voltron OC",
      description:
        "Follow these steps to forge a hero worthy of piloting a Voltron lion or defending the coalition.",
      steps: [
        {
          title: "Outline Your Character",
          description:
            "Describe species, role, and signature gear. Mention which lion, vehicle, or team they serve with plus the relationships that guide them.",
        },
        {
          title: "Add Quintessence Details",
          description:
            "Highlight unique abilities, tech, or rituals that set them apart. Include armor colors, runes, or hybrid features to guide the art style.",
        },
        {
          title: "Generate the Hero",
          description:
            "Click “Generate Character” and the AI will craft polished Voltron-style artwork and a story hook you can develop further.",
        },
      ],
    },
    examples: {
      title: "Voltron Character Examples",
      description:
        "Check out AI-generated Voltron OCs created from text prompts, spanning paladins, diplomats, and rebel aces.",
      examples,
    },
    features: {
      title: "Why Use Voltron OC Maker?",
      description:
        "Everything you need to visualize new defenders of the universe—without drawing skills or animation software.",
      features: [
        {
          label: "Lore-Aware Prompts",
          description:
            "Prompts are tuned for Paladins, Marmora operatives, and Coalition allies so your character feels authentic to the show.",
        },
        {
          label: "Armor and Lion Focused Styling",
          description:
            "Guide the AI with lion colors, armor trims, and quintessence effects to get accurate Voltron aesthetics.",
        },
        {
          label: "Instant Backstory Hooks",
          description:
            "Get ready-to-use motivations, rivalries, and mission summaries to drop directly into RPGs or fanfiction.",
        },
        {
          label: "Multiple Variations per Prompt",
          description:
            "Receive several visual interpretations so you can pick the perfect paladin or hybrid design.",
        },
        {
          label: "Support for Hybrids and Allies",
          description:
            "Easily mix Altean, Galra, and human traits, or craft allies from Olkarion, Balmeran, and beyond.",
        },
        {
          label: "Ready for Storyboarding",
          description:
            "High-quality renders are ideal for animatics, pitch decks, cosplay plans, and roleplay sheets.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Need more help? Write to support@ocmaker.app",
      faqs: [
        {
          question: "What is Voltron OC Maker?",
          answer:
            "It’s an AI tool that generates Voltron-inspired character art and bios from text prompts so you can instantly visualize new paladins and allies.",
        },
        {
          question: "How detailed should my prompt be?",
          answer:
            "Include species, faction, armor colors, weapons, and personality notes. Mention lions, quintessence abilities, or allies for more accurate results.",
        },
        {
          question: "Can I make non-paladin characters?",
          answer:
            "Absolutely—create Blade of Marmora spies, Coalition diplomats, Galra defectors, or even new lion pilots.",
        },
        {
          question: "Are the generated characters mine to use?",
          answer:
            "Yes. You own the characters you generate and can use them for fan stories, RPGs, cosplay design, or personal projects.",
        },
        {
          question: "Does it support hybrid traits?",
          answer:
            "Yes. The prompt system embraces Altean-Galra hybrids, cyborg upgrades, and experimental quintessence tech.",
        },
        {
          question: "Can I regenerate until I like the design?",
          answer:
            "You can re-run or tweak prompts as much as you like. Save your favorites inside OC Maker for future reference.",
        },
      ],
    },
    cta: {
      title: "Build Your Defender of the Universe",
      description:
        "Describe their lion, mission, and gear—Voltron OC Maker will handle the rest and deliver stunning concept art.",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};

