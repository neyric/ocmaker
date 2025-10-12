const basePrompt = `
  WORLD CONTEXT:
  Universe: Disney Animated Worlds
  Setting: Fairy-tale kingdoms, modern adventures, animal realms, enchanted forests, whimsical magic with heartfelt themes
  Key Elements: Royal courts, daring adventurers, beloved sidekicks, classic villains, musical storytelling, talking animals, moral lessons

  OUTPUT FORMAT:
  Name, Homeland/Kingdom, Role (Hero/Villain/Sidekick), Signature Companion or Magic, Personality, Wish or Lesson, Backstory Snapshot

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Hero",
    description: "A determined protagonist representing the heart of Disney.",
    prompt:
      "What is your character's name?\nKei Arashi\n\nWhat is their role in Disney?\nFrontline hero standing beside the main cast of Disney\n\nWhat unique ability or skill do they have?\nMastery over a signature power style that defines Disney\n\nWhat is their ultimate goal?\nTo protect their allies and push the story forward\n\nDescribe their personality.\nFearless, hopeful, and fiercely loyal",
  },
  {
    title: "Rival",
    description: "A formidable rival who challenges the heroes of Disney.",
    prompt:
      "What is your character's name?\nMira Lynx\n\nHow do they relate to the heroes of Disney?\nAn ambitious rival whose ideals clash with the protagonists\n\nWhat powers or techniques set them apart?\nRefined skills reflecting the darker edge of Disney\n\nWhat drives them?\nA burning need to prove their philosophy is right\n\nDescribe their personality.\nSharp, proud, and secretly compassionate",
  },
  {
    title: "Mentor",
    description: "A seasoned mentor guiding the next generation within Disney.",
    prompt:
      "What is your character's name?\nProfessor Daelin Voss\n\nWhat is their role in Disney?\nVeteran mentor who prepares new heroes for the trials ahead\n\nWhat knowledge or abilities do they offer?\nDeep expertise in the history and power systems of Disney\n\nWhat is their guiding lesson?\nStrength must be balanced with empathy and foresight\n\nDescribe their personality.\nPatient, witty, and unshakeable even in crisis",
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
    image: "https://cdn.ocmaker.app/example/disney-oc-generateds-1.webp",
    prompt:
      "1girl, flowing auburn hair, bright blue eyes, enchanted forest dress, magical sparkles, kind smile, Disney princess style, woodland animals nearby, looking at viewer, simple background, upper body",
  },
  {
    image: "https://cdn.ocmaker.app/example/disney-oc-generateds-2.webp",
    prompt:
      "1boy, golden blonde hair, charming smile, royal prince outfit, cape, confident pose, Disney prince style, single character, upper body, looking at viewer, castle background, animated style",
  },
  {
    image: "https://cdn.ocmaker.app/example/disney-oc-generateds-3.webp",
    prompt:
      "1girl, curly dark hair with flowers, warm brown eyes, tropical island dress, seashell accessories, adventurous expression, Disney style, ocean background, looking at viewer, upper body",
  },
  {
    image: "https://cdn.ocmaker.app/example/disney-oc-generateds-4.webp",
    prompt:
      "1girl, silver hair in elegant updo, ice blue eyes, winter gown with snowflake patterns, ice magic effects, serene expression, Disney frozen style, looking at viewer, simple background, upper body",
  },
];

export default {
  meta: {
    title: "Disney OC Maker",
    description:
      "Create your own Disney OC with AI. Design magical characters, enchanting stories, and timeless adventures in the beloved world of Disney animation.",
  },
  series: "Disney",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Disney OC Maker",
      description:
        "Create your own Disney OC with AI. Design magical characters, enchanting stories, and timeless adventures in the beloved world of Disney animation.",
    },
    step: {
      title: "How to Make Disney OC",
      description:
        "Creating your Disney character is as magical as a fairy tale. Follow these steps to bring your enchanting character to life.",
      steps: [
        {
          title: "Choose Your Character Type",
          description:
            "Decide if your character is a princess, prince, villain, sidekick, or magical creature. Consider their role in the Disney universe and what makes them special.",
        },
        {
          title: "Design Magical Appearance",
          description:
            "Describe your character's appearance, magical abilities, and signature outfit. Include Disney-style elements like flowing hair, expressive eyes, and enchanted accessories.",
        },
        {
          title: "Generate Your Disney Magic",
          description:
            "Click 'Generate Character' to create your Disney OC. Choose from multiple AI-generated designs that capture the timeless charm and magic of Disney animation.",
        },
      ],
    },
    examples: {
      title: "Disney Examples",
      description:
        "Discover enchanting Disney characters created with text prompts using the Disney OC Maker.",
      examples,
    },
    features: {
      title: "What is Disney OC Maker?",
      description:
        "Disney OC Maker specializes in creating characters with the timeless magic of Disney. Design authentic characters with enchanting stories, magical powers, and heartwarming adventures.",
      features: [
        {
          label: "Authentic Disney Animation Style",
          description:
            "Generate characters that perfectly capture Disney's iconic animation aesthetic, from expressive features to magical elements and enchanting designs.",
        },
        {
          label: "Magical Character Elements",
          description:
            "Our AI understands Disney's magical elements including fairy tale themes, animal companions, magical powers, and the distinctive Disney character charm.",
        },
        {
          label: "Instant Magic Creation",
          description:
            "Create beautiful Disney-style characters in seconds, allowing you to focus on developing their magical stories, adventures, and relationships.",
        },
        {
          label: "High-Quality Animation Art",
          description:
            "Powered by AI trained on Disney's visual standards, delivering character art that captures the warmth, magic, and timeless appeal of Disney animation.",
        },
        {
          label: "Multiple Character Variations",
          description:
            "Generate several character interpretations per prompt, exploring different outfits, magical effects, and classic Disney character expressions.",
        },
        {
          label: "Disney Universe Integration",
          description:
            "Create characters that naturally belong in the Disney universe, with authentic fairy tale elements, magical kingdoms, and heartwarming story potential.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is Disney OC Maker and how does it work?",
          answer:
            "Disney OC Maker is an AI tool specialized for creating original Disney-style characters. Describe your character's appearance, role, and magical elements, and our AI generates authentic Disney animation-style artwork.",
        },
        {
          question: "How can I create better characters with Disney OC Maker?",
          answer:
            "Include specific Disney elements like magical powers, fairy tale themes, character roles (princess, villain, etc.), and classic Disney aesthetics. The more Disney-specific details you include, the better the results.",
        },
        {
          question: "Is Disney OC Maker free to use?",
          answer:
            "Yes, Disney OC Maker offers free character generation with core features. Premium plans provide faster generation, advanced magical effects, and more customization options.",
        },
        {
          question: "What makes Disney OC Maker's results so magical?",
          answer:
            "Our AI is specifically trained on Disney's animation style and storytelling elements, understanding character design principles, magical aesthetics, and the timeless Disney charm.",
        },
        {
          question:
            "Can I use characters created with Disney OC Maker commercially?",
          answer:
            "Yes, all original characters you create are yours to use for personal and commercial projects. We don't claim ownership of your magical character designs.",
        },
        {
          question: "Do I need an account to use Disney OC Maker?",
          answer:
            "No account required for basic use. Creating an account allows you to save characters, access creation history, and unlock premium magical features.",
        },
        {
          question: "Can I regenerate or modify my Disney character designs?",
          answer:
            "Absolutely! You can regenerate with the same prompt for variations or adjust your description to fine-tune your character until it perfectly captures your magical vision.",
        },
        {
          question: "Will you add more animation-style OC Makers?",
          answer:
            "Yes! We're expanding to include other beloved animation studios and cartoon styles. Follow our updates for new themed OC Makers.",
        },
      ],
    },
    cta: {
      title: "Create Your Disney Magic",
      description:
        "Design your perfect Disney character — no artistic skills required. Just dream, describe, and experience the magic of Disney storytelling.",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
