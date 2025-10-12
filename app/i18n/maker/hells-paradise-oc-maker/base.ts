const basePrompt = `
  WORLD CONTEXT:
  Universe: Hell's Paradise: Jigokuraku
  Setting: Edo-period Japan, execution convicts, shinobi clans, Yamada Asaemon executioners, forbidden island Shinsenkyo filled with Tensen immortals and grotesque flora
  Key Factions: Iwagakure shinobi, Yamada Asaemon corps, Tensen/Junshi, criminal vagrants, shogunate envoys, Tao masters

  OUTPUT FORMAT:
  Name, Origin & Role (Convict/Executioner), Fighting Style & Weapon, Tao Aptitude or Shinobi Techniques, Personality, Treasure/Goal, Backstory Snapshot

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Hero",
    description:
      "A determined protagonist representing the heart of Hell's Paradise.",
    prompt:
      "What is your character's name?\nKei Arashi\n\nWhat is their role in Hell's Paradise?\nFrontline hero standing beside the main cast of Hell's Paradise\n\nWhat unique ability or skill do they have?\nMastery over a signature power style that defines Hell's Paradise\n\nWhat is their ultimate goal?\nTo protect their allies and push the story forward\n\nDescribe their personality.\nFearless, hopeful, and fiercely loyal",
  },
  {
    title: "Rival",
    description:
      "A formidable rival who challenges the heroes of Hell's Paradise.",
    prompt:
      "What is your character's name?\nMira Lynx\n\nHow do they relate to the heroes of Hell's Paradise?\nAn ambitious rival whose ideals clash with the protagonists\n\nWhat powers or techniques set them apart?\nRefined skills reflecting the darker edge of Hell's Paradise\n\nWhat drives them?\nA burning need to prove their philosophy is right\n\nDescribe their personality.\nSharp, proud, and secretly compassionate",
  },
  {
    title: "Mentor",
    description:
      "A seasoned mentor guiding the next generation within Hell's Paradise.",
    prompt:
      "What is your character's name?\nProfessor Daelin Voss\n\nWhat is their role in Hell's Paradise?\nVeteran mentor who prepares new heroes for the trials ahead\n\nWhat knowledge or abilities do they offer?\nDeep expertise in the history and power systems of Hell's Paradise\n\nWhat is their guiding lesson?\nStrength must be balanced with empathy and foresight\n\nDescribe their personality.\nPatient, witty, and unshakeable even in crisis",
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
      "https://cdn.ocmaker.app/example/hells-paradise-oc-maker-generated-1.webp",
    prompt:
      "1boy, long black hair tied up, intense golden eyes, stoic expression, hells paradise style ninja outfit, katana and kunai, execution ground survivor, mysterious island setting, anime style, looking at viewer, simple background, upper body",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/hells-paradise-oc-maker-generated-2.webp",
    prompt:
      "1girl, white hair with red tips, crimson eyes, dangerous smile, hells paradise style kunoichi attire, dual wielding blades, criminal tattoos, battle scars, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/hells-paradise-oc-maker-generated-3.webp",
    prompt:
      "1boy, short silver hair, blue eyes, calm expression, hells paradise style asaemon samurai uniform, executioner sword, noble bearing, island expedition gear, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/hells-paradise-oc-maker-generated-4.webp",
    prompt:
      "1girl, green hair with flowers, heterochromia eyes, ethereal expression, hells paradise style tensen robes, plant manipulation hints, immortal aura, mystical island native, single character, upper body, looking at viewer, anime style, simple background",
  },
];

export default {
  meta: {
    title: "Hell's Paradise OC Maker",
    description:
      "Generate your own Hell's Paradise OC with AI. Create characters, backstories, and visuals in the deadly world of ninja, samurai, and the mysterious island of immortals.",
  },
  series: "Hell's Paradise",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Hell's Paradise OC Maker",
      description:
        "Generate your own Hell's Paradise OC with AI. Create characters, backstories, and visuals in the deadly world of ninja, samurai, and the mysterious island of immortals.",
    },
    step: {
      title: "How to Make Hell's Paradise OC",
      description:
        "Creating a Hell's Paradise-style character with OC Maker is easy. Just follow these steps to bring your warrior or immortal to life.",
      steps: [
        {
          title: "Describe Your Hell's Paradise OC",
          description:
            "Fill in the form with your character's basic appearance and personality. For best results, include Hell's Paradise-style features like ninja/samurai attire, criminal backgrounds, Asaemon uniforms, or mystical island elements.",
        },
        {
          title: "Add Details and Combat Elements",
          description:
            "Include extra details like their role (criminal, Asaemon, Tensen), fighting techniques, special abilities, or connections to the island's mysteries. The more your character fits into the deadly expedition setting, the more authentic the result will be.",
        },
        {
          title: "Generate and Finalize Design",
          description:
            "Click the 'Generate Character' button to create your Hell's Paradise OC. You'll get several AI-generated designs — pick your favorite to complete your character.",
        },
      ],
    },
    examples: {
      title: "Hell's Paradise Examples",
      description:
        "Explore Hell's Paradise characters made from text prompts, created using the Hell's Paradise OC Maker.",
      examples,
    },
    features: {
      title: "What is Hell's Paradise OC Maker?",
      description:
        "Hell's Paradise OC Maker is a version of OC Maker fine-tuned for the world of Hell's Paradise: Jigokuraku. Describe your character, and instantly turn it into Edo period action-style artwork.",
      features: [
        {
          label: "Authentic Historical Fantasy Design",
          description:
            "Create characters that truly capture the brutal beauty of Hell's Paradise, designed to seamlessly fit into the world of ninja, samurai, and mystical immortals.",
        },
        {
          label: "Tailored Prompt Tuning",
          description:
            "Prompts are fine-tuned for Hell's Paradise aesthetics — from traditional Japanese clothing to supernatural abilities — helping you build more convincing characters.",
        },
        {
          label: "Fast Character Generation",
          description:
            "Generate high-quality characters in just seconds, allowing you to focus more on refining ideas and less on waiting.",
        },
        {
          label: "High-Quality Visual Output",
          description:
            "Powered by advanced AI models, Hell's Paradise OC Maker delivers detailed, high-resolution character images suitable for storytelling, design, or sharing.",
        },
        {
          label: "Choose from Multiple Results",
          description:
            "Generate multiple character options per prompt and select your favorites to finalize as your official Hell's Paradise OC.",
        },
        {
          label: "Deep Story Integration",
          description:
            "Bring your OC to life with not just visuals, but also compelling backstories, combat techniques, criminal pasts, and rich connections to the mysterious island of Hell's Paradise.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is Hell's Paradise OC Maker and how does it work?",
          answer:
            "Hell's Paradise OC Maker is a specialized version of OC Maker, fine-tuned for the Hell's Paradise universe. Simply describe your character, and our AI will generate Edo period action-style visuals in seconds based on your prompt.",
        },
        {
          question:
            "How can I create better characters with Hell's Paradise OC Maker?",
          answer:
            "For best results, include Hell's Paradise-specific traits in your description, such as ninja techniques, samurai codes, criminal backgrounds, or mystical island powers. The more vivid and detailed your input, the more accurate and compelling the output.",
        },
        {
          question: "Is Hell's Paradise OC Maker free to use?",
          answer:
            "Yes, Hell's Paradise OC Maker offers free character generation with basic features. For faster results, premium options, and additional control, you can upgrade your plan anytime.",
        },
        {
          question:
            "What makes Hell's Paradise OC Maker's results so impressive?",
          answer:
            "Hell's Paradise OC Maker uses cutting-edge AI models fine-tuned for the historical fantasy setting, ensuring characters match the distinctive art style and intense atmosphere of the series.",
        },
        {
          question:
            "Can I use characters made with Hell's Paradise OC Maker for commercial projects?",
          answer:
            "Yes, any characters you create using Hell's Paradise OC Maker are yours to use freely for both personal and commercial purposes. We do not claim ownership over your creations.",
        },
        {
          question: "Do I need an account to use Hell's Paradise OC Maker?",
          answer:
            "No account is required for basic use. However, creating an account lets you save your characters, track generation history, and access more features.",
        },
        {
          question:
            "Can I regenerate or fine-tune the same character in Hell's Paradise OC Maker?",
          answer:
            "Yes, you can regenerate results from the same prompt or adjust your inputs to refine your character until it fits your vision perfectly.",
        },
        {
          question:
            "Will there be more anime-style OC Makers like Hell's Paradise OC Maker?",
          answer:
            "Yes! We plan to release more specialized OC Makers tailored for different anime universes. Stay tuned for future updates on ocmaker.app.",
        },
      ],
    },
    cta: {
      title: "Create Your Island Survivor",
      description:
        "Bring your original Hell's Paradise character to life — no drawing skills needed. Just describe, generate, and survive the island of immortals.",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
