const basePrompt = `
  WORLD CONTEXT:
  Universe: Pokemon
  Tone: Stay faithful to Pokemon's worldbuilding, factions, abilities, and storytelling style.

  OUTPUT FORMAT:
  Name, Role, Appearance, Abilities, Personality, Backstory

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Hero",
    description: "A determined protagonist representing the heart of Pokemon.",
    prompt:
      "What is your character's name?\nKei Arashi\n\nWhat is their role in Pokemon?\nFrontline hero standing beside the main cast of Pokemon\n\nWhat unique ability or skill do they have?\nMastery over a signature power style that defines Pokemon\n\nWhat is their ultimate goal?\nTo protect their allies and push the story forward\n\nDescribe their personality.\nFearless, hopeful, and fiercely loyal",
  },
  {
    title: "Rival",
    description: "A formidable rival who challenges the heroes of Pokemon.",
    prompt:
      "What is your character's name?\nMira Lynx\n\nHow do they relate to the heroes of Pokemon?\nAn ambitious rival whose ideals clash with the protagonists\n\nWhat powers or techniques set them apart?\nRefined skills reflecting the darker edge of Pokemon\n\nWhat drives them?\nA burning need to prove their philosophy is right\n\nDescribe their personality.\nSharp, proud, and secretly compassionate",
  },
  {
    title: "Mentor",
    description:
      "A seasoned mentor guiding the next generation within Pokemon.",
    prompt:
      "What is your character's name?\nProfessor Daelin Voss\n\nWhat is their role in Pokemon?\nVeteran mentor who prepares new heroes for the trials ahead\n\nWhat knowledge or abilities do they offer?\nDeep expertise in the history and power systems of Pokemon\n\nWhat is their guiding lesson?\nStrength must be balanced with empathy and foresight\n\nDescribe their personality.\nPatient, witty, and unshakeable even in crisis",
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
    image: "https://cdn.ocmaker.app/example/pokemon-oc-generated-1.webp",
    prompt:
      "1girl, brown hair, hazel eyes, confident smile, pokemon trainer outfit, pokemon league cap, pokeball belt, trainer gloves, pikachu on shoulder, adventure pose, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/pokemon-oc-generated-2.webp",
    prompt:
      "1boy, silver hair, blue eyes, serious expression, team rocket uniform, black and red outfit with 'R' logo, pokemon capture device, sneaky pose, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/pokemon-oc-generated-3.webp",
    prompt:
      "1girl, long green hair, emerald eyes, gentle smile, pokemon coordinator dress, contest ribbon accessories, graceful pose, pokemon contest stage background, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/pokemon-oc-generated-4.webp",
    prompt:
      "1boy, spiky red hair, orange eyes, determined grin, gym leader outfit, fire-type themed clothing, gym badge on jacket, confident stance, single character, upper body, looking at viewer, anime style, simple background",
  },
];

export default {
  meta: {
    title: "Pokemon OC Maker",
    description:
      "Generate your own Pokemon character OC with AI. Create trainers, gym leaders, team members, and coordinators in the iconic Pokemon universe style.",
  },
  series: "Pokemon",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Pokemon OC Maker",
      description:
        "Generate your own Pokemon character OC with AI. Create trainers, gym leaders, team members, and coordinators in the iconic Pokemon universe style.",
    },
    step: {
      title: "How to Make Pokemon OC",
      description:
        "Creating your Pokemon trainer is an exciting journey. Follow these steps to design your perfect character for exploring the Pokemon world.",
      steps: [
        {
          title: "Choose Your Trainer Type",
          description:
            "Decide what kind of Pokemon character you want to create: Pokemon Trainer, Gym Leader, Elite Four member, Team Rocket agent, Pokemon Coordinator, or Pokemon Breeder. Each role has distinct visual characteristics and outfit styles.",
        },
        {
          title: "Design Appearance and Pokemon Team",
          description:
            "Describe your character's appearance, clothing style, and favorite Pokemon types. Include details like preferred Pokemon partners, specialty badges, contest ribbons, or team affiliations to make your trainer more authentic.",
        },
        {
          title: "Generate Your Pokemon Character",
          description:
            "Click 'Generate Character' to bring your Pokemon OC to life. Choose from multiple AI-generated designs that capture the classic Pokemon anime art style and adventure spirit.",
        },
      ],
    },
    examples: {
      title: "Pokemon Trainer Examples",
      description:
        "Discover amazing Pokemon characters created with text prompts using the Pokemon OC Maker.",
      examples,
    },
    features: {
      title: "What is Pokemon OC Maker?",
      description:
        "Pokemon OC Maker is designed specifically for the Pokemon universe. Create authentic characters with distinct trainer classes, regional styles, and Pokemon partnership themes.",
      features: [
        {
          label: "Authentic Pokemon Art Style",
          description:
            "Generate characters that perfectly match Pokemon's beloved anime aesthetic, from character proportions to iconic trainer outfits and Pokemon world elements.",
        },
        {
          label: "Diverse Trainer Classes",
          description:
            "Our AI understands various trainer roles - from gym leaders and elite four members to coordinators and team members - ensuring accurate role-specific designs.",
        },
        {
          label: "Instant Character Creation",
          description:
            "Create stunning Pokemon-style trainers in seconds, allowing you to focus on developing their teams, backstories, and adventures in the Pokemon world.",
        },
        {
          label: "High-Quality Anime Artwork",
          description:
            "Powered by AI trained on Pokemon's visual standards, delivering character art that matches the franchise's iconic anime style and quality.",
        },
        {
          label: "Multiple Design Options",
          description:
            "Generate several character interpretations per prompt, exploring different outfits, poses, and trainer specializations to find your perfect Pokemon OC.",
        },
        {
          label: "Pokemon World Integration",
          description:
            "Create characters that naturally fit into Pokemon's rich universe, with authentic regional influences, trainer gear, and Pokemon partnership themes.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is Pokemon OC Maker and how does it work?",
          answer:
            "Pokemon OC Maker is an AI tool specialized for creating original Pokemon characters. Describe your trainer's appearance, role, and Pokemon specialties, and our AI generates authentic Pokemon-style artwork.",
        },
        {
          question: "How can I create better characters with Pokemon OC Maker?",
          answer:
            "Include specific Pokemon elements like trainer class (Gym Leader, Elite Four, etc.), favorite Pokemon types, regional origins, contest achievements, or team affiliations. The more Pokemon-specific details you include, the better the results.",
        },
        {
          question: "Is Pokemon OC Maker free to use?",
          answer:
            "Yes, Pokemon OC Maker offers free character generation with core features. Premium plans provide faster generation, more trainer class options, and advanced customization tools.",
        },
        {
          question: "What makes Pokemon OC Maker's results so authentic?",
          answer:
            "Our AI is specifically trained on Pokemon's art style and world-building, understanding trainer archetypes, regional aesthetics, and the franchise's distinctive character design principles.",
        },
        {
          question:
            "Can I use characters created with Pokemon OC Maker commercially?",
          answer:
            "Yes, all original characters you create are yours to use for personal and commercial projects. We don't claim ownership of your trainer designs or Pokemon OCs.",
        },
        {
          question: "Do I need an account to use Pokemon OC Maker?",
          answer:
            "No account required for basic use. Creating an account allows you to save trainers, access generation history, and unlock premium Pokemon-themed features.",
        },
        {
          question: "Can I create different types of Pokemon trainers?",
          answer:
            "Absolutely! Create any trainer type including Gym Leaders, Elite Four members, Pokemon Coordinators, Team Rocket agents, Pokemon Breeders, Professors, and regular Pokemon Trainers.",
        },
        {
          question: "Will you add more anime franchise OC Makers?",
          answer:
            "Yes! We're expanding to include other beloved anime universes and gaming franchises. Follow our updates for new themed OC Makers inspired by popular series.",
        },
      ],
    },
    cta: {
      title: "Start Your Pokemon Journey",
      description:
        "Design your ultimate Pokemon trainer — no artistic skills required. Just imagine, describe, and explore the wonderful world of Pokemon.",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
