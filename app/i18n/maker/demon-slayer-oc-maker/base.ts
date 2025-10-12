const basePrompt = `
  WORLD CONTEXT:
  Universe: Demon Slayer
  Tone: Stay faithful to Demon Slayer's worldbuilding, factions, abilities, and storytelling style.

  OUTPUT FORMAT:
  Name, Role, Appearance, Abilities, Personality, Backstory

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Hero",
    description:
      "A determined protagonist representing the heart of Demon Slayer.",
    prompt:
      "What is your character's name?\nKei Arashi\n\nWhat is their role in Demon Slayer?\nFrontline hero standing beside the main cast of Demon Slayer\n\nWhat unique ability or skill do they have?\nMastery over a signature power style that defines Demon Slayer\n\nWhat is their ultimate goal?\nTo protect their allies and push the story forward\n\nDescribe their personality.\nFearless, hopeful, and fiercely loyal",
  },
  {
    title: "Rival",
    description:
      "A formidable rival who challenges the heroes of Demon Slayer.",
    prompt:
      "What is your character's name?\nMira Lynx\n\nHow do they relate to the heroes of Demon Slayer?\nAn ambitious rival whose ideals clash with the protagonists\n\nWhat powers or techniques set them apart?\nRefined skills reflecting the darker edge of Demon Slayer\n\nWhat drives them?\nA burning need to prove their philosophy is right\n\nDescribe their personality.\nSharp, proud, and secretly compassionate",
  },
  {
    title: "Mentor",
    description:
      "A seasoned mentor guiding the next generation within Demon Slayer.",
    prompt:
      "What is your character's name?\nProfessor Daelin Voss\n\nWhat is their role in Demon Slayer?\nVeteran mentor who prepares new heroes for the trials ahead\n\nWhat knowledge or abilities do they offer?\nDeep expertise in the history and power systems of Demon Slayer\n\nWhat is their guiding lesson?\nStrength must be balanced with empathy and foresight\n\nDescribe their personality.\nPatient, witty, and unshakeable even in crisis",
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
    image: "https://cdn.ocmaker.app/example/demon-slayer-oc-generateds-1.webp",
    prompt:
      "1girl, black hair with red tips, violet eyes, demon slayer uniform, haori jacket, katana sword, determined expression, breathing technique effects, looking at viewer, simple background, upper body",
  },
  {
    image: "https://cdn.ocmaker.app/example/demon-slayer-oc-generateds-2.webp",
    prompt:
      "1boy, silver hair, blue eyes, demon slayer corps uniform, water breathing effects, katana, focused stance, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/demon-slayer-oc-generateds-3.webp",
    prompt:
      "1girl, auburn hair in ponytail, golden eyes, demon slayer outfit, flame breathing pattern, nichirin blade, fierce expression, combat pose, looking at viewer, simple background, upper body",
  },
  {
    image: "https://cdn.ocmaker.app/example/demon-slayer-oc-generateds-4.webp",
    prompt:
      "1boy, dark green hair, brown eyes, demon slayer uniform, stone breathing technique, heavy sword, stoic expression, defensive stance, looking at viewer, anime style, simple background, upper body",
  },
];

export default {
  meta: {
    title: "Demon Slayer OC Maker",
    description:
      "Create your own Demon Slayer OC with AI. Design powerful swordsmen, breathing techniques, and epic battles in the world of demon hunters.",
  },
  series: "Demon Slayer",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Demon Slayer OC Maker",
      description:
        "Create your own Demon Slayer OC with AI. Design powerful swordsmen, breathing techniques, and epic battles in the world of demon hunters.",
    },
    step: {
      title: "How to Make Demon Slayer OC",
      description:
        "Creating a Demon Slayer character is as intense as the battles they fight. Follow these steps to forge your demon hunter.",
      steps: [
        {
          title: "Choose Your Breathing Style",
          description:
            "Select your character's breathing technique - Water, Flame, Thunder, Stone, Wind, or create your own. Each breathing style influences combat abilities and visual effects.",
        },
        {
          title: "Design Appearance and Gear",
          description:
            "Describe your character's appearance, demon slayer uniform, and nichirin blade color. Include details like haori patterns, scars from battles, and personal accessories.",
        },
        {
          title: "Generate Your Demon Hunter",
          description:
            "Click 'Generate Character' to bring your Demon Slayer OC to life. Choose from multiple AI-generated designs that capture the intense spirit of the Demon Slayer Corps.",
        },
      ],
    },
    examples: {
      title: "Demon Slayer Examples",
      description:
        "Discover powerful demon hunters created with text prompts using the Demon Slayer OC Maker.",
      examples,
    },
    features: {
      title: "What is Demon Slayer OC Maker?",
      description:
        "Demon Slayer OC Maker is designed for the intense world of demon hunting. Create authentic characters with breathing techniques, nichirin blades, and unwavering determination.",
      features: [
        {
          label: "Authentic Demon Slayer Art Style",
          description:
            "Generate characters that perfectly match Demon Slayer's distinctive anime aesthetic, from detailed uniforms to dynamic breathing technique effects.",
        },
        {
          label: "Breathing Technique Mastery",
          description:
            "Our AI understands the various breathing styles and their visual representations, ensuring your character's abilities are authentically depicted.",
        },
        {
          label: "Rapid Character Creation",
          description:
            "Create powerful demon hunters in seconds, allowing you to focus on developing their backstories, training, and battles against demons.",
        },
        {
          label: "High-Quality Battle-Ready Art",
          description:
            "Powered by AI trained on Demon Slayer's visual standards, delivering character art that captures the intensity and beauty of the series.",
        },
        {
          label: "Multiple Combat Variations",
          description:
            "Generate several character interpretations per prompt, exploring different breathing styles, weapon designs, and battle poses.",
        },
        {
          label: "Taisho Era Integration",
          description:
            "Create characters that naturally fit into the Demon Slayer universe, with authentic period clothing, demon slayer corps elements, and combat aesthetics.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is Demon Slayer OC Maker and how does it work?",
          answer:
            "Demon Slayer OC Maker is an AI tool specialized for creating original demon hunter characters. Describe your character's breathing style, appearance, and background, and our AI generates authentic Demon Slayer-style artwork.",
        },
        {
          question:
            "How can I create better characters with Demon Slayer OC Maker?",
          answer:
            "Include specific breathing techniques, weapon details, uniform designs, and battle scars. The more Demon Slayer-specific elements like nichirin blade colors and haori patterns you include, the better the results.",
        },
        {
          question: "Is Demon Slayer OC Maker free to use?",
          answer:
            "Yes, Demon Slayer OC Maker offers free character generation with core features. Premium plans provide faster generation, advanced breathing effects, and more customization options.",
        },
        {
          question: "What makes Demon Slayer OC Maker's results so authentic?",
          answer:
            "Our AI is specifically trained on Demon Slayer's art style and universe, understanding character design principles, breathing technique effects, and Taisho era aesthetics.",
        },
        {
          question:
            "Can I use characters created with Demon Slayer OC Maker commercially?",
          answer:
            "Yes, all original characters you create are yours to use for personal and commercial projects. We don't claim ownership of your demon hunter designs.",
        },
        {
          question: "Do I need an account to use Demon Slayer OC Maker?",
          answer:
            "No account required for basic use. Creating an account allows you to save characters, access generation history, and unlock premium breathing techniques.",
        },
        {
          question:
            "Can I regenerate or modify my Demon Slayer character designs?",
          answer:
            "Absolutely! You can regenerate with the same prompt for variations or adjust your description to fine-tune your character until it perfectly matches your vision.",
        },
        {
          question: "Will you add more action anime OC Makers?",
          answer:
            "Yes! We're expanding to include other popular action and supernatural anime universes. Follow our updates for new themed OC Makers.",
        },
      ],
    },
    cta: {
      title: "Create Your Demon Hunter",
      description:
        "Forge your ultimate demon slayer warrior — no artistic skills required. Just imagine, describe, and join the fight against darkness.",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
