const basePrompt = `
  WORLD CONTEXT:
  Universe: Hunter x Hunter
  Setting: Hunter Association expeditions, Nen battles, art islands, Mafia underworld, Dark Continent hints, Chimera Ant aftermath
  Key Factions: Hunter Association, Zodiacs, Phantom Troupe, Mafia families, NGL, Kakin succession war princes, Chimera Ant remnants, Greed Island survivors

  OUTPUT FORMAT:
  Name, Hunter Status/Affiliation, Nen Category, Hatsu Ability Description, Personality, Goal, Backstory Snapshot

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Beast Hunter",
    description: "A licensed hunter cataloging undiscovered species in the Dark Continent.",
    prompt: `What is your character's name?
Nyala Veld

What is their Hunter status or affiliation?
Single-Star Beast Hunter affiliated with the Association

What Nen category do they belong to?
Conjurer

Describe their Hatsu ability.
Creates Aura Pods that store scents, letting her track any creature later

How would you describe their personality?
Curious, fearless, protective of ecosystems

What goal motivates them?
To prove coexistence between humans and Dark Continent fauna is possible

Share a backstory snapshot.
Barely survived a Chimera Ant raid thanks to help from a mysterious beast; vowed to safeguard hybrids thereafter.`,
  },
  {
    title: "Mafia Negotiator",
    description: "A contract Hunter balancing mafia politics in Meteor City.",
    prompt: `What is your character's name?
Rex Law

What is their Hunter status or affiliation?
Contract Hunter employed by the Five Families

What Nen category do they belong to?
Manipulator

Describe their Hatsu ability.
Puppet Strings of Justice that force criminals to confess when bound

How would you describe their personality?
Suave, methodical, morally flexible

What goal motivates them?
To dismantle the black market arms route fueling Phantom Troupe raids

Share a backstory snapshot.
Grew up in Meteor City and lost his brother to a smuggling deal gone wrong; now he negotiates to protect locals.`,
  },
  {
    title: "Greed Island Speedrunner",
    description: "An avid gamer using Nen combos to clear Greed Island dungeons first.",
    prompt: `What is your character's name?
Lina Byte

What is their Hunter status or affiliation?
Double-Star Treasure Hunter and pro streamer

What Nen category do they belong to?
Emitter

Describe their Hatsu ability.
Pixel Burst lets her convert cards into temporary energy constructs

How would you describe their personality?
Energetic, competitive, loves showing off

What goal motivates them?
To unlock Greed Island's rumored sequel and archive every card

Share a backstory snapshot.
Won her license by broadcasting a live infiltration of a mafia vault without casualties.`,
  },
  {
    title: "Kurta Archivist",
    description: "A survivor chronicling Kurta history while hunting down scarlet eye collectors.",
    prompt: `What is your character's name?
Thane Kurta

What is their Hunter status or affiliation?
Unlicensed Hunter traveling with Kurapika's network

What Nen category do they belong to?
Specialist

Describe their Hatsu ability.
Scarlet Ledger conjures chains that record every stolen eye

How would you describe their personality?
Solemn, driven, quietly compassionate

What goal motivates them?
To recover the last scarlet eyes held by underground auctioneers

Share a backstory snapshot.
Escaped the massacre by hiding in a hidden shrine; now trades intel with Kurapika to bring closure to his clan.`,
  },
  {
    title: "NGL Healer",
    description: "A reformed NGL citizen using Nen to detoxify Chimera Ant residues.",
    prompt: `What is your character's name?
Juniper Rae

What is their Hunter status or affiliation?
Apprentice Hunter sponsored by Kite's followers

What Nen category do they belong to?
Transmuter

Describe their Hatsu ability.
Purity Bloom converts toxins into harmless spores

How would you describe their personality?
Patient, empathetic, quietly resilient

What goal motivates them?
To help rebuild NGL without repeating its isolationist mistakes

Share a backstory snapshot.
Lost her parents to drug overdoses; after the Ant invasion she studied Nen to cleanse the land.`,
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
    title: "Archetype",
    key: "archetype",
    unique: true,
    data: [
      {
        label: "Hero",
        value: "heroic leader",
      },
      {
        label: "Antihero",
        value: "antihero vigilante",
      },
      {
        label: "Mentor",
        value: "mysterious mentor",
      },
      {
        label: "Strategist",
        value: "brilliant strategist",
      },
      {
        label: "Rival",
        value: "rebellious rival",
      },
      {
        label: "Guardian",
        value: "stoic guardian",
      },
    ],
  },
  {
    title: "Power Theme",
    key: "power_theme",
    data: [
      {
        label: "Elemental magic",
        value: "elemental magic",
      },
      {
        label: "Advanced technology",
        value: "advanced technology",
      },
      {
        label: "Martial arts",
        value: "martial arts",
      },
      {
        label: "Spiritual powers",
        value: "spiritual powers",
      },
      {
        label: "Summoner",
        value: "summoner",
      },
      {
        label: "Tactical genius",
        value: "tactical genius",
      },
    ],
  },
  {
    title: "Outfit Style",
    key: "outfit",
    data: [
      {
        label: "Battle armor",
        value: "battle armor",
      },
      {
        label: "Sleek uniform",
        value: "sleek uniform",
      },
      {
        label: "Casual streetwear",
        value: "casual streetwear",
      },
      {
        label: "Formal attire",
        value: "formal attire",
      },
      {
        label: "Mystic robes",
        value: "mystic robes",
      },
      {
        label: "Futuristic suit",
        value: "futuristic suit",
      },
    ],
  },
  {
    title: "Personality",
    key: "personality",
    data: [
      {
        label: "Optimistic",
        value: "optimistic",
      },
      {
        label: "Stoic",
        value: "stoic",
      },
      {
        label: "Rebellious",
        value: "rebellious",
      },
      {
        label: "Compassionate",
        value: "compassionate",
      },
      {
        label: "Calculating",
        value: "calculating",
      },
      {
        label: "Chaotic good",
        value: "chaotic good",
      },
    ],
  },
  {
    title: "Expression",
    key: "expression",
    unique: true,
    data: [
      {
        label: "Smiling confidence",
        value: "smiling confidence",
      },
      {
        label: "Determined gaze",
        value: "determined gaze",
      },
      {
        label: "Brooding intensity",
        value: "brooding intensity",
      },
      {
        label: "Playful grin",
        value: "playful grin",
      },
      {
        label: "Calm focus",
        value: "calm focus",
      },
      {
        label: "Mysterious smirk",
        value: "mysterious smirk",
      },
    ],
  },
];

const examples = [
  {
    image:
      "https://cdn.ocmaker.app/example/hunter-x-hunter-oc-generated-1.webp",
    prompt:
      "1boy, spiky black hair with green tips, amber eyes, hunter exam participant, confident smirk, green jacket with shorts, backpack, enhancer aura visible, nen energy flowing, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/hunter-x-hunter-oc-generated-2.webp",
    prompt:
      "1girl, long silver hair in braid, purple eyes, blacklist hunter, serious expression, dark suit with hunter license visible, dual daggers, manipulator nen type, shadow aura, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/hunter-x-hunter-oc-generated-3.webp",
    prompt:
      "1boy, messy red hair, golden eyes with cat pupils, transmuter type, playful grin, casual streetwear, electricity nen ability, sparks around hands, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/hunter-x-hunter-oc-generated-4.webp",
    prompt:
      "1girl, short blue hair with headband, green eyes, beast hunter, cheerful expression, safari outfit with khaki vest, conjurer nen type, summoned creature beside, single character, upper body, looking at viewer, anime style, simple background",
  },
];

export default {
  meta: {
    title: "Hunter x Hunter OC Maker",
    description:
      "Generate your own Hunter x Hunter OC with AI. Create unique Hunters with Nen abilities, specializations, and backstories for the HxH universe.",
  },
  series: "Hunter x Hunter",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Hunter x Hunter OC Maker",
      description:
        "Generate your own Hunter x Hunter OC with AI. Create unique Hunters with Nen abilities, specializations, and backstories for the HxH universe.",
    },
    step: {
      title: "How to Make Hunter x Hunter OC",
      description:
        "Creating a Hunter x Hunter character with OC Maker is easy. Follow these steps to design your own Hunter with unique Nen abilities.",
      steps: [
        {
          title: "Describe Your Hunter Character",
          description:
            "Fill in the form with your character's appearance and personality. For best results, include HxH-specific elements like Hunter type, clothing style, and physical traits that fit the Hunter x Hunter aesthetic.",
        },
        {
          title: "Define Nen Type and Abilities",
          description:
            "Specify your character's Nen type (Enhancer, Transmuter, Conjurer, Emitter, Manipulator, or Specialist) and describe their unique Hatsu ability. Include limitations and conditions for more authentic results.",
        },
        {
          title: "Generate and Choose Your Hunter",
          description:
            "Click 'Generate Character' to create your Hunter x Hunter OC. You'll get multiple AI-generated designs — select your favorite to finalize your Hunter for the Association.",
        },
      ],
    },
    examples: {
      title: "Hunter x Hunter Examples",
      description:
        "Explore Hunter characters created from text prompts using the Hunter x Hunter OC Maker.",
      examples,
    },
    features: {
      title: "What is Hunter x Hunter OC Maker?",
      description:
        "Hunter x Hunter OC Maker is a specialized version of OC Maker designed for the HxH universe. Describe your Hunter and instantly transform them into authentic Togashi-style artwork.",
      features: [
        {
          label: "Authentic HxH Art Style",
          description:
            "Create characters that perfectly capture Yoshihiro Togashi's distinctive art style, designed to fit seamlessly into the Hunter x Hunter world.",
        },
        {
          label: "Nen System Integration",
          description:
            "Prompts are optimized for the complex Nen system — from aura types to Hatsu abilities — helping you create believable and balanced Hunter characters.",
        },
        {
          label: "Rapid Character Creation",
          description:
            "Generate professional-quality Hunter characters in seconds, perfect for roleplaying, fan fiction, or creative projects.",
        },
        {
          label: "Detailed Character Designs",
          description:
            "Our AI produces high-resolution character artwork with intricate details, from Hunter licenses to unique Nen manifestations.",
        },
        {
          label: "Multiple Design Variations",
          description:
            "Generate several character options per prompt, allowing you to explore different interpretations and select your ideal Hunter design.",
        },
        {
          label: "Complete Hunter Profile",
          description:
            "Create not just appearances but complete Hunter profiles including specializations, Nen abilities, and backstories that fit the HxH universe.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is Hunter x Hunter OC Maker and how does it work?",
          answer:
            "Hunter x Hunter OC Maker is an AI-powered tool for creating original HxH characters. Describe your Hunter's appearance, Nen type, and abilities, and our AI generates authentic artwork matching Togashi's style.",
        },
        {
          question: "How can I create better Hunter x Hunter characters?",
          answer:
            "Include specific HxH elements like Nen categories, Hunter specializations, ability restrictions, and vows. The more you incorporate the series' power system and world-building, the more authentic your character will be.",
        },
        {
          question: "Is Hunter x Hunter OC Maker free to use?",
          answer:
            "Yes, Hunter x Hunter OC Maker offers free character generation with basic features. Premium plans provide faster generation, additional options, and more customization capabilities.",
        },
        {
          question: "What makes the Nen abilities look realistic?",
          answer:
            "Our AI understands the six Nen types and their typical manifestations, helping create abilities that feel balanced and consistent with the Hunter x Hunter power system.",
        },
        {
          question: "Can I use my Hunter OC for stories or roleplay?",
          answer:
            "Absolutely! Characters created with Hunter x Hunter OC Maker are yours to use in fan fiction, roleplay, artwork, or any creative project you have in mind.",
        },
        {
          question: "Do I need an account to create characters?",
          answer:
            "No account required for basic use. However, signing up lets you save your Hunters, track generation history, and access premium features.",
        },
        {
          question: "Can I create different types of Hunters and Nen users?",
          answer:
            "Yes! Create any type of Hunter (Blacklist, Beast, Treasure, etc.) with any Nen type. You can even design Chimera Ants or other HxH universe characters.",
        },
        {
          question: "Are more anime OC makers being developed?",
          answer:
            "Yes! We're constantly adding new anime-specific OC makers. Visit ocmaker.app regularly to discover new additions to our growing collection.",
        },
      ],
    },
    cta: {
      title: "Create Your Own Hunter",
      description:
        "Design your original Hunter with unique Nen abilities — no drawing skills needed. Just describe, generate, and join the Hunter Association.",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
