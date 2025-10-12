const basePrompt = `
  WORLD CONTEXT:
  Universe: Blue Lock
  Tone: Stay faithful to Blue Lock's worldbuilding, factions, abilities, and storytelling style.

  OUTPUT FORMAT:
  Name, Role, Appearance, Abilities, Personality, Backstory

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Hero",
    description:
      "A determined protagonist representing the heart of Blue Lock.",
    prompt:
      "What is your character's name?\nKei Arashi\n\nWhat is their role in Blue Lock?\nFrontline hero standing beside the main cast of Blue Lock\n\nWhat unique ability or skill do they have?\nMastery over a signature power style that defines Blue Lock\n\nWhat is their ultimate goal?\nTo protect their allies and push the story forward\n\nDescribe their personality.\nFearless, hopeful, and fiercely loyal",
  },
  {
    title: "Rival",
    description: "A formidable rival who challenges the heroes of Blue Lock.",
    prompt:
      "What is your character's name?\nMira Lynx\n\nHow do they relate to the heroes of Blue Lock?\nAn ambitious rival whose ideals clash with the protagonists\n\nWhat powers or techniques set them apart?\nRefined skills reflecting the darker edge of Blue Lock\n\nWhat drives them?\nA burning need to prove their philosophy is right\n\nDescribe their personality.\nSharp, proud, and secretly compassionate",
  },
  {
    title: "Mentor",
    description:
      "A seasoned mentor guiding the next generation within Blue Lock.",
    prompt:
      "What is your character's name?\nProfessor Daelin Voss\n\nWhat is their role in Blue Lock?\nVeteran mentor who prepares new heroes for the trials ahead\n\nWhat knowledge or abilities do they offer?\nDeep expertise in the history and power systems of Blue Lock\n\nWhat is their guiding lesson?\nStrength must be balanced with empathy and foresight\n\nDescribe their personality.\nPatient, witty, and unshakeable even in crisis",
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
      "https://cdn.ocmaker.app/example/blue-lock-oc-maker-generated-1.webp",
    prompt:
      "1boy, spiky blue hair, intense yellow eyes, competitive expression, blue lock style soccer uniform number 11, muscular build, dynamic pose, soccer field background, anime style, looking at viewer, simple background, upper body",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/blue-lock-oc-maker-generated-2.webp",
    prompt:
      "1boy, white hair with black streaks, sharp red eyes, confident smirk, blue lock training gear, athletic physique, holding soccer ball, striker pose, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/blue-lock-oc-maker-generated-3.webp",
    prompt:
      "1boy, long green hair tied back, calculating purple eyes, analytical expression, blue lock goalkeeper uniform, gloves, defensive stance, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/blue-lock-oc-maker-generated-4.webp",
    prompt:
      "1boy, short orange hair, fierce blue eyes, determined expression, blue lock midfielder jersey number 7, speed-focused build, ready to sprint pose, single character, upper body, looking at viewer, anime style, simple background",
  },
];

export default {
  meta: {
    title: "Blue Lock OC Maker",
    description:
      "Generate your own Blue Lock OC with AI. Create characters, backstories, and visuals in the intense world of competitive soccer and ego-driven strikers.",
  },
  series: "Blue Lock",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Blue Lock OC Maker",
      description:
        "Generate your own Blue Lock OC with AI. Create characters, backstories, and visuals in the intense world of competitive soccer and ego-driven strikers.",
    },
    step: {
      title: "How to Make Blue Lock OC",
      description:
        "Creating a Blue Lock-style character with OC Maker is easy. Just follow these steps to bring your ultimate striker to life.",
      steps: [
        {
          title: "Describe Your Blue Lock OC",
          description:
            "Fill in the form with your character's basic appearance and personality. For best results, include Blue Lock-style features like athletic builds, soccer gear, intense expressions, and the ego-driven mindset of a striker.",
        },
        {
          title: "Add Details and Soccer Elements",
          description:
            "Include extra details like playing position, special techniques, weapon (unique skill), or their personal ego philosophy. The more your character embodies the Blue Lock mentality, the more authentic the result will be.",
        },
        {
          title: "Generate and Finalize Design",
          description:
            "Click the 'Generate Character' button to create your Blue Lock OC. You'll get several AI-generated designs — pick your favorite to complete your character.",
        },
      ],
    },
    examples: {
      title: "Blue Lock Examples",
      description:
        "Explore Blue Lock characters made from text prompts, created using the Blue Lock OC Maker.",
      examples,
    },
    features: {
      title: "What is Blue Lock OC Maker?",
      description:
        "Blue Lock OC Maker is a version of OC Maker fine-tuned for the world of Blue Lock. Describe your character, and instantly turn it into competitive soccer-style artwork.",
      features: [
        {
          label: "Authentic Soccer Player Design",
          description:
            "Create characters that truly capture the intense competitive spirit of Blue Lock, designed to seamlessly fit into the world of ego-driven strikers and revolutionary soccer.",
        },
        {
          label: "Tailored Prompt Tuning",
          description:
            "Prompts are fine-tuned for Blue Lock aesthetics — from athletic builds to soccer gear — helping you build more convincing characters.",
        },
        {
          label: "Fast Character Generation",
          description:
            "Generate high-quality characters in just seconds, allowing you to focus more on refining ideas and less on waiting.",
        },
        {
          label: "High-Quality Visual Output",
          description:
            "Powered by advanced AI models, Blue Lock OC Maker delivers detailed, high-resolution character images suitable for storytelling, design, or sharing.",
        },
        {
          label: "Choose from Multiple Results",
          description:
            "Generate multiple character options per prompt and select your favorites to finalize as your official Blue Lock OC.",
        },
        {
          label: "Deep Story Integration",
          description:
            "Bring your OC to life with not just visuals, but also compelling backstories, unique weapons (skills), ego philosophies, and rich connections to the competitive world of Blue Lock.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is Blue Lock OC Maker and how does it work?",
          answer:
            "Blue Lock OC Maker is a specialized version of OC Maker, fine-tuned for the Blue Lock universe. Simply describe your character, and our AI will generate soccer player-style visuals in seconds based on your prompt.",
        },
        {
          question:
            "How can I create better characters with Blue Lock OC Maker?",
          answer:
            "For best results, include Blue Lock-specific traits in your description, such as playing positions, unique techniques, ego philosophies, or physical attributes suited for soccer. The more vivid and detailed your input, the more accurate and compelling the output.",
        },
        {
          question: "Is Blue Lock OC Maker free to use?",
          answer:
            "Yes, Blue Lock OC Maker offers free character generation with basic features. For faster results, premium options, and additional control, you can upgrade your plan anytime.",
        },
        {
          question: "What makes Blue Lock OC Maker's results so impressive?",
          answer:
            "Blue Lock OC Maker uses cutting-edge AI models fine-tuned for the competitive soccer setting, ensuring characters match the distinctive art style and intense atmosphere of the series.",
        },
        {
          question:
            "Can I use characters made with Blue Lock OC Maker for commercial projects?",
          answer:
            "Yes, any characters you create using Blue Lock OC Maker are yours to use freely for both personal and commercial purposes. We do not claim ownership over your creations.",
        },
        {
          question: "Do I need an account to use Blue Lock OC Maker?",
          answer:
            "No account is required for basic use. However, creating an account lets you save your characters, track generation history, and access more features.",
        },
        {
          question:
            "Can I regenerate or fine-tune the same character in Blue Lock OC Maker?",
          answer:
            "Yes, you can regenerate results from the same prompt or adjust your inputs to refine your character until it fits your vision perfectly.",
        },
        {
          question:
            "Will there be more anime-style OC Makers like Blue Lock OC Maker?",
          answer:
            "Yes! We plan to release more specialized OC Makers tailored for different anime universes. Stay tuned for future updates on ocmaker.app.",
        },
      ],
    },
    cta: {
      title: "Create Your Ultimate Striker",
      description:
        "Bring your original Blue Lock character to life — no drawing skills needed. Just describe, generate, and dominate the field.",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
