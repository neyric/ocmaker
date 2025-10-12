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
    title: "Hero",
    description:
      "A determined protagonist representing the heart of Arknights.",
    prompt:
      "What is your character's name?\nKei Arashi\n\nWhat is their role in Arknights?\nFrontline hero standing beside the main cast of Arknights\n\nWhat unique ability or skill do they have?\nMastery over a signature power style that defines Arknights\n\nWhat is their ultimate goal?\nTo protect their allies and push the story forward\n\nDescribe their personality.\nFearless, hopeful, and fiercely loyal",
  },
  {
    title: "Rival",
    description: "A formidable rival who challenges the heroes of Arknights.",
    prompt:
      "What is your character's name?\nMira Lynx\n\nHow do they relate to the heroes of Arknights?\nAn ambitious rival whose ideals clash with the protagonists\n\nWhat powers or techniques set them apart?\nRefined skills reflecting the darker edge of Arknights\n\nWhat drives them?\nA burning need to prove their philosophy is right\n\nDescribe their personality.\nSharp, proud, and secretly compassionate",
  },
  {
    title: "Mentor",
    description:
      "A seasoned mentor guiding the next generation within Arknights.",
    prompt:
      "What is your character's name?\nProfessor Daelin Voss\n\nWhat is their role in Arknights?\nVeteran mentor who prepares new heroes for the trials ahead\n\nWhat knowledge or abilities do they offer?\nDeep expertise in the history and power systems of Arknights\n\nWhat is their guiding lesson?\nStrength must be balanced with empathy and foresight\n\nDescribe their personality.\nPatient, witty, and unshakeable even in crisis",
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
