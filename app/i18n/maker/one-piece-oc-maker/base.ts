const basePrompt = `
  WORLD CONTEXT:
  Universe: One Piece
  Tone: Stay faithful to One Piece's worldbuilding, factions, abilities, and storytelling style.

  OUTPUT FORMAT:
  Name, Role, Appearance, Abilities, Personality, Backstory

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Hero",
    description:
      "A determined protagonist representing the heart of One Piece.",
    prompt:
      "What is your character's name?\nKei Arashi\n\nWhat is their role in One Piece?\nFrontline hero standing beside the main cast of One Piece\n\nWhat unique ability or skill do they have?\nMastery over a signature power style that defines One Piece\n\nWhat is their ultimate goal?\nTo protect their allies and push the story forward\n\nDescribe their personality.\nFearless, hopeful, and fiercely loyal",
  },
  {
    title: "Rival",
    description: "A formidable rival who challenges the heroes of One Piece.",
    prompt:
      "What is your character's name?\nMira Lynx\n\nHow do they relate to the heroes of One Piece?\nAn ambitious rival whose ideals clash with the protagonists\n\nWhat powers or techniques set them apart?\nRefined skills reflecting the darker edge of One Piece\n\nWhat drives them?\nA burning need to prove their philosophy is right\n\nDescribe their personality.\nSharp, proud, and secretly compassionate",
  },
  {
    title: "Mentor",
    description:
      "A seasoned mentor guiding the next generation within One Piece.",
    prompt:
      "What is your character's name?\nProfessor Daelin Voss\n\nWhat is their role in One Piece?\nVeteran mentor who prepares new heroes for the trials ahead\n\nWhat knowledge or abilities do they offer?\nDeep expertise in the history and power systems of One Piece\n\nWhat is their guiding lesson?\nStrength must be balanced with empathy and foresight\n\nDescribe their personality.\nPatient, witty, and unshakeable even in crisis",
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
      "https://cdn.ocmaker.app/example/one-piece-oc-maker-generated-1.webp",
    prompt:
      "1girl, long wavy blue hair, purple eyes, serious expression, customized navy uniform, torn cape, short shorts, thigh-high boots, seashell accessory, belt pouch, wind aura, dual blade pose, wind effect, pirate style, one piece style, fantasy outfit, looking at viewer, simple background, upper body",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/one-piece-oc-maker-generated-2.webp",
    prompt:
      "1boy, medium length dark red hair, sharp eyes, confident smile, young pirate captain, white open shirt, black coat, long pants, katana at waist, standing on ship deck, wind-blown cloak, battle-ready pose, one piece style, looking at viewer, simple background, upper body",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/one-piece-oc-maker-generated-3.webp",
    prompt:
      "1boy, muscular male, long black hair, red eyes, horns, mustache, angry expression, shirtless, open long coat, dragon tattoo, holding kanabo, one piece style, kaido (one piece), looking at viewer, simple background, upper body",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/one-piece-oc-maker-generated-4.webp",
    prompt:
      "1boy, muscular male, tall male, white mustache, slicked back white hair, stern expression, shirtless, open coat, captain's coat, white coat with red interior, holding bisento, attack pose, scars on chest, gold epaulettes, pirate hat (removed), one piece style, looking at viewer, simple background, upper body",
  },
];

export default {
  meta: {
    title: "One Piece OC Maker",
    description:
      "Generate your own One Piece OC with AI. Create characters, backstories, and visuals in the adventurous pirate style.",
  },
  series: "One Piece",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "One Piece OC Maker",
      description:
        "Generate your own One Piece OC with AI. Create characters, backstories, and visuals in the adventurous pirate style.",
    },
    step: {
      title: "How to Make One Piece OC",
      description:
        "Creating a One Piece-style character with OC Maker is easy. Just follow these two steps to bring your idea to life.",
      steps: [
        {
          title: "Describe Your One Piece OC",
          description:
            "Fill in the form with your character's basic appearance and personality. For best results, include One Piece-style features like colorful pirate outfits, unique hairstyles, and the adventurous spirit of a pirate seeking treasure.",
        },
        {
          title: "Add Details and Pirate Elements",
          description:
            "Include extra details like Devil Fruit powers, pirate crew affiliations, or unique weapons. The more your character fits into the One Piece universe of pirates, marines, and grand adventures, the more accurate and impressive the result will be.",
        },
        {
          title: "Generate and Finalize Design",
          description:
            "Click the 'Generate Character' button to create your One Piece OC. You'll get several AI-generated designs — pick your favorite to complete your character.",
        },
      ],
    },
    examples: {
      title: "One Piece Examples",
      description:
        "Explore One Piece characters made from text prompts, created using the One Piece OC Maker.",
      examples,
    },
    features: {
      title: "What is One Piece OC Maker?",
      description:
        "One Piece OC Maker is a version of OC Maker fine-tuned for the world of One Piece. Describe your character, and instantly turn it into One Piece-style artwork.",
      features: [
        {
          label: "Authentic One Piece Character Design",
          description:
            "Create characters that truly capture the adventurous pirate spirit of One Piece, designed to seamlessly fit into the world of Devil Fruits, pirate crews, and grand adventures.",
        },
        {
          label: "Tailored Prompt Tuning",
          description:
            "Prompts are fine-tuned for One Piece aesthetics — from colorful pirate outfits to unique Devil Fruit abilities — helping you build more convincing characters.",
        },
        {
          label: "Fast Character Generation",
          description:
            "Generate high-quality characters in just seconds, allowing you to focus more on refining ideas and less on waiting.",
        },
        {
          label: "High-Quality Visual Output",
          description:
            "Powered by advanced AI models, One Piece OC Maker delivers detailed, high-resolution character images suitable for storytelling, design, or sharing.",
        },
        {
          label: "Choose from Multiple Results",
          description:
            "Generate multiple character options per prompt and select your favorites to finalize as your official One Piece OC.",
        },
        {
          label: "Deep Story Integration",
          description:
            "Bring your OC to life with not just visuals, but also compelling backstories, crew dynamics, and rich connections to the One Piece universe.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is One Piece OC Maker and how does it work?",
          answer:
            "One Piece OC Maker is a specialized version of OC Maker, fine-tuned for the One Piece universe. Simply describe your character, and our AI will generate anime-style One Piece visuals in seconds based on your prompt.",
        },
        {
          question:
            "How can I create better characters with One Piece OC Maker?",
          answer:
            "For best results, include One Piece-specific traits in your description, such as Devil Fruit powers, pirate outfits, or crew affiliations. The more vivid and detailed your input, the more accurate and compelling the output.",
        },
        {
          question: "Is One Piece OC Maker free to use?",
          answer:
            "Yes, One Piece OC Maker offers free character generation with basic features. For faster results, premium options, and additional control, you can upgrade your plan anytime.",
        },
        {
          question: "What makes One Piece OC Maker's results so impressive?",
          answer:
            "One Piece OC Maker uses cutting-edge AI models fine-tuned for the One Piece setting, ensuring characters match the vibrant art style and adventurous spirit of the series.",
        },
        {
          question:
            "Can I use characters made with One Piece OC Maker for commercial projects?",
          answer:
            "Yes, any characters you create using One Piece OC Maker are yours to use freely for both personal and commercial purposes. We do not claim ownership over your creations.",
        },
        {
          question: "Do I need an account to use One Piece OC Maker?",
          answer:
            "No account is required for basic use. However, creating an account lets you save your characters, track generation history, and access more features.",
        },
        {
          question:
            "Can I regenerate or fine-tune the same character in One Piece OC Maker?",
          answer:
            "Yes, you can regenerate results from the same prompt or adjust your inputs to refine your character until it fits your vision perfectly.",
        },
        {
          question:
            "Will there be more anime-style OC Makers like One Piece OC Maker?",
          answer:
            "Yes! We plan to release more specialized OC Makers tailored for different anime universes. Stay tuned for future updates on ocmaker.app.",
        },
      ],
    },
    cta: {
      title: "Create Your Own One Piece Character",
      description:
        "Bring your original One Piece character to life — no drawing skills needed. Just describe, generate, and explore.",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
