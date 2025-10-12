const basePrompt = `
  WORLD CONTEXT:
  Universe: Arknights
  Setting: Terra's industrial wastelands, Originium outbreaks, Catastrophe response missions, city-states with unique cultures
  Key Factions: Rhodes Island, Reunion Movement, Lungmen Guard Department, Kazimierz Knights, Laterano, Ursus Empire, Victoria's nobility, independent mercenary groups

  OUTPUT FORMAT:
  Name, Affiliation & Operator Class, Weapon/Arts Specialty, Infection Status, Talents/Traits, Personality, Mission History

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Rhodes Island Vanguard",
    description: "A forward-deployed rescuer who shields civilians while deploying drones.",
    prompt: `What is your character's name?
Mina Talwar

What is their affiliation and operator class?
Rhodes Island Vanguard Operator

What weapon or Arts specialty do they rely on?
Deployable barrier drones paired with Originium shock batons

What is their infection status?
Infected; requires scheduled crystallization treatments

Which talents or traits define their combat style?
Rapid redeployment, cost refund support, protective barrier fields

How would you describe their personality?
Level-headed, nurturing toward rookies, subtly sarcastic

What mission history stands out to them?
Evacuated an entire mining crew during the Chernobog incident while holding back Reunion snipers.`,
  },
  {
    title: "Reunion Defector",
    description: "A repentant engineer now using his knowledge to dismantle enemy explosives.",
    prompt: `What is your character's name?
Darius Vogt

What is their affiliation and operator class?
Rhodes Island Supporter, formerly Reunion bomb technician

What weapon or Arts specialty do they rely on?
Remote EMP glaives and Originium shrapnel suppression grids

What is their infection status?
Non-Infected but carries radiation scarring from old tests

Which talents or traits define their combat style?
Disarms enemy charges, boosts allied resistance to Arts damage

How would you describe their personality?
Remorseful, methodical, determined to repair what he once ruined

What mission history stands out to them?
Defused a Reunion demolition charge beneath Lungmen's residential district before surrendering to Rhodes Island.`,
  },
  {
    title: "Kazimierz Lancer",
    description: "A corporate knight moonlighting with Rhodes Island to protect migrant workers.",
    prompt: `What is your character's name?
Veronika Krol

What is their affiliation and operator class?
Independent Defender contracted to Rhodes Island and the Kazimierz Knights Association

What weapon or Arts specialty do they rely on?
Reactive Originite lance paired with kinetic shields

What is their infection status?
Stage-one Infected stabilized by Rhodes Island care

Which talents or traits define their combat style?
Counters that heal allies, crowd control with lance sweeps

How would you describe their personality?
Chivalrous, media-savvy, unyielding against exploitation

What mission history stands out to them?
Guarded a caravan through Ursus territory while bounty hunters tried to claim the workers as property.`,
  },
  {
    title: "Laterano Executor",
    description: "A gun-toting cleric balancing doctrine with pragmatic mercy on missions.",
    prompt: `What is your character's name?
Canon Ferri

What is their affiliation and operator class?
Laterano Notarial Hall Executor on loan to Rhodes Island

What weapon or Arts specialty do they rely on?
Twin Liberi casters firing sanctified buckshot infused with light

What is their infection status?
Uninfected; carries a relic that reacts to Originium

Which talents or traits define their combat style?
Alternates lethal judgments with crowd-control blessings

How would you describe their personality?
Solemn, ritualistic, surprisingly compassionate

What mission history stands out to them?
Brokered a ceasefire between zealots and infected refugees before enforcing Laterano law on the real instigators.`,
  },
  {
    title: "Ursus Survivor",
    description: "A student survivor turned shield guard for Rhodes Island mobile clinics.",
    prompt: `What is your character's name?
Katya Zelenko

What is their affiliation and operator class?
Rhodes Island Guard assigned to Ursus relief teams

What weapon or Arts specialty do they rely on?
Heated chainsaw glaive channeling thermal Originium bursts

What is their infection status?
Recovered Infected with stabilized Originium density

Which talents or traits define their combat style?
Protective counters, shielding casters, morale boosts under fear

How would you describe their personality?
Tenacious, quietly haunted, fiercely protective of students

What mission history stands out to them?
Escorted a mobile clinic through Winterwisp campus, rescuing classmates still trapped in lockdown.`,
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
        label: "Rookie operator",
        value: "rookie operator"
      },
      {
        label: "Field medic (20s)",
        value: "field medic adult"
      },
      {
        label: "Rhodes veteran",
        value: "rhodes veteran"
      },
      {
        label: "Laterano executor",
        value: "laterano executor"
      },
      {
        label: "Old guard pioneer",
        value: "old guard pioneer"
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
        label: "Rhodes Island jacket",
        value: "rhodes island jacket"
      },
      {
        label: "Reunion defector coat",
        value: "reunion defector coat"
      },
      {
        label: "Kazimierz armor cape",
        value: "kazimierz armor cape"
      },
      {
        label: "Laterano cleric vestments",
        value: "laterano cleric vestments"
      },
      {
        label: "Ursus survival parka",
        value: "ursus survival parka"
      }
    ]
  },
  {
    title: "Bottom",
    key: "bottom",
    data: [
      {
        label: "Tactical operator pants",
        value: "tactical operator pants"
      },
      {
        label: "Armored leggings",
        value: "armored leggings"
      },
      {
        label: "City-running shorts",
        value: "city runner shorts"
      },
      {
        label: "Ceremonial long skirt",
        value: "ceremonial long skirt"
      },
      {
        label: "Cold weather trousers",
        value: "cold weather trousers"
      }
    ]
  },
  {
    title: "Set",
    key: "set",
    data: [
      {
        label: "Rhodes Island field kit",
        value: "rhodes island field kit"
      },
      {
        label: "Reunion repentant",
        value: "reunion repentant set"
      },
      {
        label: "Kazimierz tourney armor",
        value: "kazimierz tourney armor"
      },
      {
        label: "Sankta executor regalia",
        value: "sankta executor regalia"
      },
      {
        label: "Ursus evac guardian",
        value: "ursus evac guardian set"
      }
    ]
  },
  {
    title: "Material",
    key: "material",
    data: [
      {
        label: "Originium composite",
        value: "originium composite"
      },
      {
        label: "Radiation-shield mesh",
        value: "radiation shield mesh"
      },
      {
        label: "Military synth-leather",
        value: "military synth leather"
      },
      {
        label: "Nomadic furs",
        value: "nomadic furs"
      },
      {
        label: "Laterano silksteel",
        value: "laterano silksteel"
      }
    ]
  },
  {
    title: "Accessory",
    key: "accessory",
    data: [
      {
        label: "Operator ID badge",
        value: "operator id badge"
      },
      {
        label: "Strategic headset",
        value: "strategic headset"
      },
      {
        label: "Kazimierz lance",
        value: "kazimierz lance"
      },
      {
        label: "Executor tome",
        value: "executor tome"
      },
      {
        label: "Ursus survival pack",
        value: "ursus survival pack"
      }
    ]
  },
  {
    title: "Originum Status",
    key: "originium_status",
    unique: true,
    data: [
      {
        label: "Non-infected",
        value: "non infected"
      },
      {
        label: "Stage I infected",
        value: "stage i infected"
      },
      {
        label: "Stabilized infected",
        value: "stabilized infected"
      },
      {
        label: "Outbreak survivor",
        value: "outbreak survivor"
      },
      {
        label: "Dormant carrier",
        value: "dormant carrier"
      }
    ]
  },
  {
    title: "Operator Class",
    key: "operator_class",
    data: [
      {
        label: "Vanguard",
        value: "vanguard"
      },
      {
        label: "Guard",
        value: "guard"
      },
      {
        label: "Sniper",
        value: "sniper"
      },
      {
        label: "Caster",
        value: "caster"
      },
      {
        label: "Defender",
        value: "defender"
      },
      {
        label: "Medic",
        value: "medic"
      }
    ]
  }
];

const examples = [
  {
    image:
      "https://cdn.ocmaker.app/example/arknights-oc-maker-generated-1.webp",
    prompt:
      "1boy, white hair with black streaks, red eyes, wolf ears and tail, rhodes island guard operator, tactical gear, sword weapon, serious expression, originium crystals visible, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/arknights-oc-maker-generated-2.webp",
    prompt:
      "1girl, long silver hair, blue eyes, cat ears, medic operator uniform, white coat with rhodes island logo, medical equipment, gentle smile, healing arts effects, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/arknights-oc-maker-generated-3.webp",
    prompt:
      "1girl, short pink hair, golden eyes, rabbit ears, sniper operator, tactical scope, rifle weapon, focused expression, camouflage gear, crosshair targeting effect, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/arknights-oc-maker-generated-4.webp",
    prompt:
      "1boy, dark blue hair, green eyes, dragon horns, defender operator, heavy armor, shield and hammer, protective stance, originium infection scars, single character, upper body, looking at viewer, anime style, simple background",
  },
];

export default {
  meta: {
    title: "Arknights OC Maker",
    description:
      "Generate your own Arknights OC with AI. Create unique Operators with diverse races, classes, and Arts abilities for Rhodes Island.",
  },
  series: "Arknights",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Arknights OC Maker",
      description:
        "Generate your own Arknights OC with AI. Create unique Operators with diverse races, classes, and Arts abilities for Rhodes Island.",
    },
    step: {
      title: "How to Make Arknights OC",
      description:
        "Creating an Arknights Operator with OC Maker is a tactical mission. Follow these steps to design your own Rhodes Island recruit.",
      steps: [
        {
          title: "Describe Your Operator",
          description:
            "Fill in the form with your character's appearance and traits. For authentic results, include Arknights-specific features like animal ears/horns/tails, operator class uniform, tactical gear, and originium infection signs.",
        },
        {
          title: "Define Class and Arts Abilities",
          description:
            "Specify your Operator's class (Guard, Sniper, Caster, Medic, Defender, Vanguard, etc.), weapon type, Arts specialization, and racial background. Include deployment cost and tactical role for more authentic results.",
        },
        {
          title: "Deploy Your Operator",
          description:
            "Click 'Generate Character' to create your Arknights OC. You'll receive multiple AI-generated designs — select your favorite to complete your Rhodes Island Operator recruitment!",
        },
      ],
    },
    examples: {
      title: "Arknights Operator Examples",
      description:
        "Explore Arknights characters created from text prompts using the Arknights OC Maker.",
      examples,
    },
    features: {
      title: "What is Arknights OC Maker?",
      description:
        "Arknights OC Maker is a specialized version of OC Maker designed for the Arknights universe. Describe your Operator and instantly transform them into authentic Rhodes Island tactical artwork.",
      features: [
        {
          label: "Authentic Terra Design",
          description:
            "Create characters that perfectly capture Arknights' distinctive art style and world-building, from diverse races to tactical gear, designed to fit seamlessly into Terra's dystopian setting.",
        },
        {
          label: "Class System Integration",
          description:
            "Prompts are optimized for all Operator classes and Arts abilities — from Guard combat skills to Medic healing arts — helping you create balanced and authentic Operators.",
        },
        {
          label: "Rapid Operator Creation",
          description:
            "Generate professional-quality Arknights characters in seconds, perfect for tactical planning, fan projects, or expanding your Rhodes Island roster.",
        },
        {
          label: "Detailed Character Artwork",
          description:
            "Our AI produces high-resolution Operator designs with intricate details, from originium crystals to tactical equipment and racial features.",
        },
        {
          label: "Multiple Deployment Options",
          description:
            "Generate several character variations per prompt, allowing you to explore different classes and tactical roles before finalizing your Operator.",
        },
        {
          label: "Complete Operator Profile",
          description:
            "Create comprehensive characters including backstories, Arts abilities, infection status, and tactical specializations that fit Arknights' complex world.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is Arknights OC Maker and how does it work?",
          answer:
            "Arknights OC Maker is an AI tool specialized for creating Arknights Operators. Describe your character's appearance, class, and abilities, and our AI generates artwork matching the game's distinctive tactical aesthetic.",
        },
        {
          question: "How can I create better Arknights Operators?",
          answer:
            "Include specific Arknights elements like Operator classes, racial features, Arts abilities, infection status, and tactical gear. The more you incorporate the game's lore and mechanics, the more authentic your Operator will be.",
        },
        {
          question: "Is Arknights OC Maker free to use?",
          answer:
            "Yes, Arknights OC Maker offers free character generation with basic features. Premium plans provide faster generation, additional classes, and more customization options.",
        },
        {
          question: "What makes the Operator designs look authentic?",
          answer:
            "Our AI understands Arknights' complex world-building, from the diverse races of Terra to the tactical nature of Rhodes Island operations, ensuring characters fit the game's aesthetic and lore.",
        },
        {
          question: "Can I use my Arknights OC for fan content?",
          answer:
            "Absolutely! Characters created with Arknights OC Maker are yours to use in fan fiction, artwork, roleplay, or any creative project related to the Arknights universe.",
        },
        {
          question: "Do I need an account to create Operators?",
          answer:
            "No registration required for basic use. However, creating an account lets you save your Operators, track generation history, and access premium tactical features.",
        },
        {
          question: "Can I create different types of Operators and races?",
          answer:
            "Yes! Create any Operator class with any Terra race (Sankta, Sarkaz, Liberi, etc.). You can also design Infected or non-Infected characters with various Arts specializations.",
        },
        {
          question: "Are more tactical game OC makers being developed?",
          answer:
            "Yes! We're continuously expanding our collection of game-specific OC makers. Visit ocmaker.app regularly for new additions to our tactical gaming library.",
        },
      ],
    },
    cta: {
      title: "Deploy Your Own Operator",
      description:
        "Design your original Rhodes Island Operator — no drawing skills needed. Just describe, generate, and join the fight against the Catastrophe!",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
