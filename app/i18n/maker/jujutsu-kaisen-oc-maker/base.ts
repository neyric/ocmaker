const basePrompt = `
  WORLD CONTEXT:
  Universe: Jujutsu Kaisen
  Tone: Stay faithful to Jujutsu Kaisen's worldbuilding, factions, abilities, and storytelling style.

  OUTPUT FORMAT:
  Name, Role, Appearance, Abilities, Personality, Backstory

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Hero",
    description:
      "A determined protagonist representing the heart of Jujutsu Kaisen.",
    prompt:
      "What is your character's name?\nKei Arashi\n\nWhat is their role in Jujutsu Kaisen?\nFrontline hero standing beside the main cast of Jujutsu Kaisen\n\nWhat unique ability or skill do they have?\nMastery over a signature power style that defines Jujutsu Kaisen\n\nWhat is their ultimate goal?\nTo protect their allies and push the story forward\n\nDescribe their personality.\nFearless, hopeful, and fiercely loyal",
  },
  {
    title: "Rival",
    description:
      "A formidable rival who challenges the heroes of Jujutsu Kaisen.",
    prompt:
      "What is your character's name?\nMira Lynx\n\nHow do they relate to the heroes of Jujutsu Kaisen?\nAn ambitious rival whose ideals clash with the protagonists\n\nWhat powers or techniques set them apart?\nRefined skills reflecting the darker edge of Jujutsu Kaisen\n\nWhat drives them?\nA burning need to prove their philosophy is right\n\nDescribe their personality.\nSharp, proud, and secretly compassionate",
  },
  {
    title: "Mentor",
    description:
      "A seasoned mentor guiding the next generation within Jujutsu Kaisen.",
    prompt:
      "What is your character's name?\nProfessor Daelin Voss\n\nWhat is their role in Jujutsu Kaisen?\nVeteran mentor who prepares new heroes for the trials ahead\n\nWhat knowledge or abilities do they offer?\nDeep expertise in the history and power systems of Jujutsu Kaisen\n\nWhat is their guiding lesson?\nStrength must be balanced with empathy and foresight\n\nDescribe their personality.\nPatient, witty, and unshakeable even in crisis",
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
    image: "https://cdn.ocmaker.app/example/jujutsu-kaisen-oc-generated-1.webp",
    prompt:
      "1boy, messy white hair, teal eyes, playful grin, jujutsu kaisen style student uniform, skateboard, confident stance, anime style, looking at viewer, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/jujutsu-kaisen-oc-generated-2.webp",
    prompt:
      "1boy, tousled silver hair, blue-grey eyes, determined frown, jujutsu kaisen style track suit, headband, athletic pose, anime style, looking at viewer, simple background, upper body, masterpiece, best quality, very aesthetic, absurdres",
  },
  {
    image: "https://cdn.ocmaker.app/example/jujutsu-kaisen-oc-generated-3.webp",
    prompt:
      "1girl, wavy dark purple hair, pink eyes, playful wink, jujutsu kaisen style team uniform, holding snacks, casual pose, anime style, looking at viewer, simple background, upper body, masterpiece, best quality, very aesthetic, absurdres",
  },
  {
    image: "https://cdn.ocmaker.app/example/jujutsu-kaisen-oc-generated-4.webp",
    prompt:
      "girl, messy blue hair, violet eyes, cheerful expression, jujutsu kaisen style combat attire, holding teddy bear plushie, playful pose, anime style, looking at viewer, simple background, upper body, masterpiece, best quality, very aesthetic, absurdre",
  },
];

export default {
  meta: {
    title: "Jujutsu Kaisen OC Maker",
    description:
      "Generate your own Jujutsu Kaisen OC with AI. Create modern sorcerer characters with cursed techniques and the distinctive supernatural style of Jujutsu Kaisen.",
  },
  series: "Jujutsu Kaisen",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Jujutsu Kaisen OC Maker",
      description:
        "Generate your own Jujutsu Kaisen OC with AI. Create modern sorcerer characters with cursed techniques and the distinctive supernatural style of Jujutsu Kaisen.",
    },
    step: {
      title: "How to Make Jujutsu Kaisen OC",
      description:
        "Creating a Jujutsu Kaisen character is easy. Follow these steps to bring your modern sorcerer to life.",
      steps: [
        {
          title: "Describe Your Sorcerer",
          description:
            "Fill in your character's appearance and personality. Include modern elements like school uniforms, sorcerer attire, or casual clothing. Mention hair color, eye color, and features that fit Jujutsu Kaisen's clean, modern aesthetic.",
        },
        {
          title: "Add Cursed Techniques",
          description:
            "Describe your character's unique cursed technique, domain expansion, or special abilities. Include details about cursed energy manifestation, hand gestures, fighting style, and school connections.",
        },
        {
          title: "Generate Your Character",
          description:
            "Click 'Generate Character' to create your Jujutsu Kaisen OC. You'll get several designs featuring clean character art, dynamic poses, cursed energy effects, and modern supernatural elements.",
        },
      ],
    },
    examples: {
      title: "Jujutsu Kaisen Examples",
      description:
        "Explore Jujutsu Kaisen characters showcasing the series' modern sorcerer aesthetic and supernatural battle elements.",
      examples,
    },
    features: {
      title: "What is Jujutsu Kaisen OC Maker?",
      description:
        "Jujutsu Kaisen OC Maker is an AI tool fine-tuned for the unique aesthetic of Jujutsu Kaisen. Create characters that capture the series' modern urban style and supernatural elements.",
      features: [
        {
          label: "Modern Sorcerer Design",
          description:
            "Create characters with Jujutsu Kaisen's distinctive style: clean designs with contemporary clothing, school uniforms, and battle attire.",
        },
        {
          label: "Cursed Energy Effects",
          description:
            "Generate characters with visible cursed energy manifestations, domain expansion backgrounds, and supernatural battle effects.",
        },
        {
          label: "Urban Aesthetic",
          description:
            "Characters designed with Jujutsu Kaisen's contemporary setting - from Tokyo Jujutsu High uniforms to modern street clothes.",
        },
        {
          label: "Clean Art Style",
          description:
            "AI models fine-tuned for Jujutsu Kaisen's distinctive art: sharp lines, expressive faces, and balanced simplicity with detail.",
        },
        {
          label: "Multiple Variations",
          description:
            "Generate multiple character options per prompt with different poses, expressions, and cursed energy effects.",
        },
        {
          label: "Battle-Ready Design",
          description:
            "Create characters ready for supernatural combat with dynamic poses, sorcerer uniforms, and cursed technique hand gestures.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is Jujutsu Kaisen OC Maker and how does it work?",
          answer:
            "Jujutsu Kaisen OC Maker is an AI tool fine-tuned for the Jujutsu Kaisen universe. Simply describe your character's appearance and cursed techniques, and our AI will generate authentic Jujutsu Kaisen-style visuals in seconds.",
        },
        {
          question: "How can I create better characters?",
          answer:
            "Include specific Jujutsu Kaisen elements: cursed techniques, domain expansions, sorcerer uniforms, or school affiliations. Describe modern clothing styles, hair colors, and supernatural abilities for more authentic results.",
        },
        {
          question: "Is Jujutsu Kaisen OC Maker free to use?",
          answer:
            "Yes, basic character generation is free. For faster results, premium options, and additional control over cursed energy effects, you can upgrade your plan anytime.",
        },
        {
          question: "What makes the results so impressive?",
          answer:
            "Our AI models are specifically fine-tuned for Jujutsu Kaisen's distinctive art style: clean modern character designs, authentic cursed energy effects, and contemporary clothing.",
        },
        {
          question: "Can I use characters for commercial projects?",
          answer:
            "Yes, any characters you create are yours to use freely for both personal and commercial purposes. We do not claim ownership over your creations.",
        },
        {
          question: "Do I need an account?",
          answer:
            "No account is required for basic use. However, creating an account lets you save characters, track generation history, and access advanced features like domain expansion backgrounds.",
        },
        {
          question: "Can I regenerate or fine-tune the same character?",
          answer:
            "Yes, you can regenerate results from the same prompt or adjust your inputs to refine your character's cursed techniques, appearance, or battle pose.",
        },
        {
          question: "Will there be more anime-style OC Makers?",
          answer:
            "Yes! We plan to release more specialized OC Makers tailored for different anime universes. Stay tuned for future updates on ocmaker.app.",
        },
      ],
    },
    cta: {
      title: "Create Your Own Jujutsu Kaisen Character",
      description:
        "Bring your original modern sorcerer to life with cursed techniques and contemporary style — no drawing skills needed.",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
