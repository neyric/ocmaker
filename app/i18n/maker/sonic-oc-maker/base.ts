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
    title: "Hero",
    description: "A determined protagonist representing the heart of Sonic.",
    prompt:
      "What is your character's name?\nKei Arashi\n\nWhat is their role in Sonic?\nFrontline hero standing beside the main cast of Sonic\n\nWhat unique ability or skill do they have?\nMastery over a signature power style that defines Sonic\n\nWhat is their ultimate goal?\nTo protect their allies and push the story forward\n\nDescribe their personality.\nFearless, hopeful, and fiercely loyal",
  },
  {
    title: "Rival",
    description: "A formidable rival who challenges the heroes of Sonic.",
    prompt:
      "What is your character's name?\nMira Lynx\n\nHow do they relate to the heroes of Sonic?\nAn ambitious rival whose ideals clash with the protagonists\n\nWhat powers or techniques set them apart?\nRefined skills reflecting the darker edge of Sonic\n\nWhat drives them?\nA burning need to prove their philosophy is right\n\nDescribe their personality.\nSharp, proud, and secretly compassionate",
  },
  {
    title: "Mentor",
    description: "A seasoned mentor guiding the next generation within Sonic.",
    prompt:
      "What is your character's name?\nProfessor Daelin Voss\n\nWhat is their role in Sonic?\nVeteran mentor who prepares new heroes for the trials ahead\n\nWhat knowledge or abilities do they offer?\nDeep expertise in the history and power systems of Sonic\n\nWhat is their guiding lesson?\nStrength must be balanced with empathy and foresight\n\nDescribe their personality.\nPatient, witty, and unshakeable even in crisis",
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
