const basePrompt = `
  WORLD CONTEXT:
  Universe: Detective Conan
  Setting: Metropolitan Tokyo investigations, junior detectives, international agents, clandestine poison plots
  Key Circles: Kudo/Shinichi allies, Mouri Detective Agency, Police task forces (Takagi, Sato), Black Organization, FBI/CIA, school friends, Phantom Thief Kid encounters

  OUTPUT FORMAT:
  Name, Cover Identity & Occupation, Core Detective Skills, Support Gadgets/Allies, Personality, Target Case or Nemesis, Backstory Snapshot

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Hero",
    description:
      "A determined protagonist representing the heart of Detective Conan.",
    prompt:
      "What is your character's name?\nKei Arashi\n\nWhat is their role in Detective Conan?\nFrontline hero standing beside the main cast of Detective Conan\n\nWhat unique ability or skill do they have?\nMastery over a signature power style that defines Detective Conan\n\nWhat is their ultimate goal?\nTo protect their allies and push the story forward\n\nDescribe their personality.\nFearless, hopeful, and fiercely loyal",
  },
  {
    title: "Rival",
    description:
      "A formidable rival who challenges the heroes of Detective Conan.",
    prompt:
      "What is your character's name?\nMira Lynx\n\nHow do they relate to the heroes of Detective Conan?\nAn ambitious rival whose ideals clash with the protagonists\n\nWhat powers or techniques set them apart?\nRefined skills reflecting the darker edge of Detective Conan\n\nWhat drives them?\nA burning need to prove their philosophy is right\n\nDescribe their personality.\nSharp, proud, and secretly compassionate",
  },
  {
    title: "Mentor",
    description:
      "A seasoned mentor guiding the next generation within Detective Conan.",
    prompt:
      "What is your character's name?\nProfessor Daelin Voss\n\nWhat is their role in Detective Conan?\nVeteran mentor who prepares new heroes for the trials ahead\n\nWhat knowledge or abilities do they offer?\nDeep expertise in the history and power systems of Detective Conan\n\nWhat is their guiding lesson?\nStrength must be balanced with empathy and foresight\n\nDescribe their personality.\nPatient, witty, and unshakeable even in crisis",
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
    image: "https://cdn.ocmaker.app/example/aot-oc-generated-1.webp",
    prompt:
      "1boy, long gold hair, silver eyes, attack on titan style survey corps uniform, cape, dual swords, battle pose, determined expression, looking at viewer, simple background, upper body",
  },
  {
    image: "https://cdn.ocmaker.app/example/aot-oc-generated-2.webp",
    prompt:
      "1girl, long silver hair, red eyes, attack on titan style survey corps uniform, cape, dual swords, battle pose, determined expression, looking at viewer, simple background, upper body, masterpiece, best quality, very aesthetic, absurdres",
  },
  {
    image: "https://cdn.ocmaker.app/example/aot-oc-generated-3.webp",
    prompt:
      "1boy, long gold hair, silver eyes, attack on titan style survey corps uniform, cape, dual swords, battle pose, determined expression, looking at viewer, simple background, upper body",
  },
  {
    image: "https://cdn.ocmaker.app/example/aot-oc-generated-4.webp",
    prompt:
      "1boy, long gold hair, silver eyes, attack on titan style survey corps uniform, cape, dual swords, battle pose, determined expression, looking at viewer, simple background, upper body",
  },
  {
    image: "https://cdn.ocmaker.app/example/aot-oc-generated-5.webp",
    prompt:
      "1girl, medium length black hair, sharp amber eyes, serious expression, attack on titan style uniform, tactical harness, dark brown jacket, white pants, leather boots, standing in wind, looking at viewer, simple background, upper body",
  },
  {
    image: "https://cdn.ocmaker.app/example/aot-oc-generated-6.webp",
    prompt:
      "1girl, long red hair, brown eyes, attack on titan style survey corps uniform, cape, dual swords, standing pose, determined expression, looking at viewer, simple background, upper body",
  },
  {
    image: "https://cdn.ocmaker.app/example/aot-oc-generated-7.webp",
    prompt:
      "1boy, messy silver hair, gray eyes, brooding expression, Attack on Titan style elite uniform, long coat, standing confidently, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/aot-oc-generated-8.webp",
    prompt:
      "1girl, silver white twin braids, violet eyes, cat ears, melancholic and sharp expression, attack on titan style black and red skintight battle suit, survey corps emblem, glowing dual chakrams, magical weapon, standing pose, simple background, upper body",
  },
];

export default {
  meta: {
    title: "Detective Conan OC Maker",
    description:
      "Generate your own Detective Conan OC with AI. Create characters, backstories, and visuals in the classic detective style.",
  },
  series: "Detective Conan",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Detective Conan OC Maker",
      description:
        "Generate your own Detective Conan OC with AI. Create characters, backstories, and visuals in the classic detective style.",
    },
    step: {
      title: "How to Make Detective Conan OC",
      description:
        "Creating a Detective Conan-style character with OC Maker is easy. Just follow these two steps to bring your idea to life.",
      steps: [
        {
          title: "Describe Your Detective Conan OC",
          description:
            "Fill in the form with your character's basic appearance and personality. For best results, include Detective Conan-style features like formal detective attire, school uniforms, and the sharp intellect of a mystery solver.",
        },
        {
          title: "Add Details and Detective Elements",
          description:
            "Include extra details like detective gadgets, investigative skills, or connections to the Black Organization. The more your character fits into the Detective Conan universe of mysteries and crime-solving, the more accurate and impressive the result will be.",
        },
        {
          title: "Generate and Finalize Design",
          description:
            "Click the 'Generate Character' button to create your Detective Conan OC. You'll get several AI-generated designs — pick your favorite to complete your character.",
        },
      ],
    },
    examples: {
      title: "Detective Conan Examples",
      description:
        "Explore Detective Conan characters made from text prompts, created using the Detective Conan OC Maker.",
      examples,
    },
    features: {
      title: "What is Detective Conan OC Maker?",
      description:
        "Detective Conan OC Maker is a version of OC Maker fine-tuned for the world of Detective Conan. Describe your character, and instantly turn it into Detective Conan-style artwork.",
      features: [
        {
          label: "Authentic Detective Conan Character Design",
          description:
            "Create characters that truly capture the mystery-solving spirit of Detective Conan, designed to seamlessly fit into the world of crime, deduction, and clever investigations.",
        },
        {
          label: "Tailored Prompt Tuning",
          description:
            "Prompts are fine-tuned for Detective Conan aesthetics — from detective gear to school uniforms — helping you build more convincing characters.",
        },
        {
          label: "Fast Character Generation",
          description:
            "Generate high-quality characters in just seconds, allowing you to focus more on refining ideas and less on waiting.",
        },
        {
          label: "High-Quality Visual Output",
          description:
            "Powered by advanced AI models, Detective Conan OC Maker delivers detailed, high-resolution character images suitable for storytelling, design, or sharing.",
        },
        {
          label: "Choose from Multiple Results",
          description:
            "Generate multiple character options per prompt and select your favorites to finalize as your official Detective Conan OC.",
        },
        {
          label: "Deep Story Integration",
          description:
            "Bring your OC to life with not just visuals, but also compelling backstories, detective cases, and rich connections to the Detective Conan universe.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is Detective Conan OC Maker and how does it work?",
          answer:
            "Detective Conan OC Maker is a specialized version of OC Maker, fine-tuned for the Detective Conan universe. Simply describe your character, and our AI will generate anime-style Detective Conan visuals in seconds based on your prompt.",
        },
        {
          question:
            "How can I create better characters with Detective Conan OC Maker?",
          answer:
            "For best results, include Detective Conan-specific traits in your description, such as detective skills, formal attire, or connections to ongoing mysteries. The more vivid and detailed your input, the more accurate and compelling the output.",
        },
        {
          question: "Is Detective Conan OC Maker free to use?",
          answer:
            "Yes, Detective Conan OC Maker offers free character generation with basic features. For faster results, premium options, and additional control, you can upgrade your plan anytime.",
        },
        {
          question:
            "What makes Detective Conan OC Maker's results so impressive?",
          answer:
            "Detective Conan OC Maker uses cutting-edge AI models fine-tuned for the Detective Conan setting, ensuring characters match the classic art style and investigative atmosphere of the series.",
        },
        {
          question:
            "Can I use characters made with Detective Conan OC Maker for commercial projects?",
          answer:
            "Yes, any characters you create using Detective Conan OC Maker are yours to use freely for both personal and commercial purposes. We do not claim ownership over your creations.",
        },
        {
          question: "Do I need an account to use Detective Conan OC Maker?",
          answer:
            "No account is required for basic use. However, creating an account lets you save your characters, track generation history, and access more features.",
        },
        {
          question:
            "Can I regenerate or fine-tune the same character in Detective Conan OC Maker?",
          answer:
            "Yes, you can regenerate results from the same prompt or adjust your inputs to refine your character until it fits your vision perfectly.",
        },
        {
          question:
            "Will there be more anime-style OC Makers like Detective Conan OC Maker?",
          answer:
            "Yes! We plan to release more specialized OC Makers tailored for different anime universes. Stay tuned for future updates on ocmaker.app.",
        },
      ],
    },
    cta: {
      title: "Create Your Own Detective Conan Character",
      description:
        "Bring your original Detective Conan character to life — no drawing skills needed. Just describe, generate, and explore.",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
