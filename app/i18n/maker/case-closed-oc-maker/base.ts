const basePrompt = `
  WORLD CONTEXT:
  Universe: Case Closed (Detective Conan)
  Setting: Modern Japan crime scenes, high school detectives, undercover organizations, forensic investigations
  Key Circles: Detective Boys, Osaka duo, Tokyo Metropolitan Police, Black Organization, FBI/CIA collaborators, gadget support from Professor Agasa

  OUTPUT FORMAT:
  Name, Occupation/Detective Role, Signature Investigation Skills, Tools or Gadgets, Personality, Ongoing Mystery, Backstory Snapshot

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "High School Sleuth",
    description: "A prodigy detective balancing exams with murder investigations.",
    prompt: `What is your character's name?
Kazuha Morioka

What is their occupation or detective role?
High school detective assisting the Tokyo Metropolitan Police

What signature investigation skills do they rely on?
Keen observation, deductive logic, disguise work

What tools or gadgets support them?
Solar-powered glasses with AR overlays and voice recorder

How would you describe their personality?
Earnest, punctual, occasionally overconfident

What ongoing mystery drives them?
Determined to unmask a serial bomber targeting cram schools

Share a backstory snapshot.
Solved her first poisoning case at thirteen after noticing mismatched tea leaves in the victim's cup.`,
  },
  {
    title: "Forensic Blogger",
    description: "A true-crime blogger who turns internet fame into justice for victims.",
    prompt: `What is your character's name?
Mina Tachibana

What is their occupation or detective role?
Freelance forensic consultant and crime blogger

What signature investigation skills do they rely on?
Digital footprint tracing and chemical residue analysis

What tools or gadgets support them?
Portable spectrometer disguised as a smartphone battery

How would you describe their personality?
Snarky, savvy, fiercely protective of sources

What ongoing mystery drives them?
Investigating a cold case involving her late journalist father

Share a backstory snapshot.
Built a following by live-streaming evidence breakdowns that embarrassed corrupt investigators.`,
  },
  {
    title: "Osaka Interpol Liaison",
    description: "A liaison bridging Interpol resources with local detectives.",
    prompt: `What is your character's name?
Daichi Kuroda

What is their occupation or detective role?
Interpol liaison attached to the Osaka police

What signature investigation skills do they rely on?
International suspect profiling and multilingual interrogation

What tools or gadgets support them?
Encrypted cufflinks that sync to Interpol databases

How would you describe their personality?
Cool-headed, dryly humorous, rarely rattled

What ongoing mystery drives them?
Tracking a jewel thief syndicate believed to link Osaka and Milan

Share a backstory snapshot.
Grew up between Japan and Italy, learning to read criminal networks from both cultures.`,
  },
  {
    title: "Elementary Sleuth",
    description: "A Detective Boys member who shines with gadget mastery.",
    prompt: `What is your character's name?
Rika Kobayashi

What is their occupation or detective role?
Elementary detective club gadget specialist

What signature investigation skills do they rely on?
Mini-drone reconnaissance and rapid clue cataloging

What tools or gadgets support them?
Professor-inspired backpack containing collapsible drone trio

How would you describe their personality?
Inquisitive, bubbly, fearless around crime scenes

What ongoing mystery drives them?
Searching for her missing brother who vanished during a magic show

Share a backstory snapshot.
Joined the Detective Boys after hacking a magician's prop to reveal the culprit's hiding spot.`,
  },
  {
    title: "Undercover Butler",
    description: "A disguised detective embedded in a wealthy family estate.",
    prompt: `What is your character's name?
Masato Shinonome

What is their occupation or detective role?
Private detective posing as a live-in butler

What signature investigation skills do they rely on?
Fingerprint recovery, etiquette infiltration, silent combat

What tools or gadgets support them?
Monocle camera linked to a homebrew AI case assistant

How would you describe their personality?
Polite, meticulous, harbors a sardonic streak

What ongoing mystery drives them?
Probing a string of disappearances tied to the family's shipping company

Share a backstory snapshot.
Once part of the police riot squad, he left to pursue justice for overlooked victims inside high society.`,
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
    title: "Case Closed OC Maker",
    description:
      "Generate your own Case Closed OC with AI. Create characters, backstories, and visuals in the classic detective style.",
  },
  series: "Case Closed",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Case Closed OC Maker",
      description:
        "Generate your own Case Closed OC with AI. Create characters, backstories, and visuals in the classic detective style.",
    },
    step: {
      title: "How to Make Case Closed OC",
      description:
        "Creating a Case Closed-style character with OC Maker is easy. Just follow these two steps to bring your idea to life.",
      steps: [
        {
          title: "Describe Your Case Closed OC",
          description:
            "Fill in the form with your character's basic appearance and personality. For best results, include Case Closed-style features like formal detective attire, school uniforms, and the sharp intellect of a mystery solver.",
        },
        {
          title: "Add Details and Detective Elements",
          description:
            "Include extra details like detective gadgets, investigative skills, or connections to crime cases. The more your character fits into the Case Closed universe of mysteries and crime-solving, the more accurate and impressive the result will be.",
        },
        {
          title: "Generate and Finalize Design",
          description:
            "Click the 'Generate Character' button to create your Case Closed OC. You'll get several AI-generated designs — pick your favorite to complete your character.",
        },
      ],
    },
    examples: {
      title: "Case Closed Examples",
      description:
        "Explore Case Closed characters made from text prompts, created using the Case Closed OC Maker.",
      examples,
    },
    features: {
      title: "What is Case Closed OC Maker?",
      description:
        "Case Closed OC Maker is a version of OC Maker fine-tuned for the world of Case Closed. Describe your character, and instantly turn it into Case Closed-style artwork.",
      features: [
        {
          label: "Authentic Case Closed Character Design",
          description:
            "Create characters that truly capture the mystery-solving spirit of Case Closed, designed to seamlessly fit into the world of crime, deduction, and clever investigations.",
        },
        {
          label: "Tailored Prompt Tuning",
          description:
            "Prompts are fine-tuned for Case Closed aesthetics — from detective gear to school uniforms — helping you build more convincing characters.",
        },
        {
          label: "Fast Character Generation",
          description:
            "Generate high-quality characters in just seconds, allowing you to focus more on refining ideas and less on waiting.",
        },
        {
          label: "High-Quality Visual Output",
          description:
            "Powered by advanced AI models, Case Closed OC Maker delivers detailed, high-resolution character images suitable for storytelling, design, or sharing.",
        },
        {
          label: "Choose from Multiple Results",
          description:
            "Generate multiple character options per prompt and select your favorites to finalize as your official Case Closed OC.",
        },
        {
          label: "Deep Story Integration",
          description:
            "Bring your OC to life with not just visuals, but also compelling backstories, detective cases, and rich connections to the Case Closed universe.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is Case Closed OC Maker and how does it work?",
          answer:
            "Case Closed OC Maker is a specialized version of OC Maker, fine-tuned for the Case Closed universe. Simply describe your character, and our AI will generate anime-style Case Closed visuals in seconds based on your prompt.",
        },
        {
          question:
            "How can I create better characters with Case Closed OC Maker?",
          answer:
            "For best results, include Case Closed-specific traits in your description, such as detective skills, formal attire, or connections to ongoing mysteries. The more vivid and detailed your input, the more accurate and compelling the output.",
        },
        {
          question: "Is Case Closed OC Maker free to use?",
          answer:
            "Yes, Case Closed OC Maker offers free character generation with basic features. For faster results, premium options, and additional control, you can upgrade your plan anytime.",
        },
        {
          question: "What makes Case Closed OC Maker's results so impressive?",
          answer:
            "Case Closed OC Maker uses cutting-edge AI models fine-tuned for the Case Closed setting, ensuring characters match the classic art style and investigative atmosphere of the series.",
        },
        {
          question:
            "Can I use characters made with Case Closed OC Maker for commercial projects?",
          answer:
            "Yes, any characters you create using Case Closed OC Maker are yours to use freely for both personal and commercial purposes. We do not claim ownership over your creations.",
        },
        {
          question: "Do I need an account to use Case Closed OC Maker?",
          answer:
            "No account is required for basic use. However, creating an account lets you save your characters, track generation history, and access more features.",
        },
        {
          question:
            "Can I regenerate or fine-tune the same character in Case Closed OC Maker?",
          answer:
            "Yes, you can regenerate results from the same prompt or adjust your inputs to refine your character until it fits your vision perfectly.",
        },
        {
          question:
            "Will there be more anime-style OC Makers like Case Closed OC Maker?",
          answer:
            "Yes! We plan to release more specialized OC Makers tailored for different anime universes. Stay tuned for future updates on ocmaker.app.",
        },
      ],
    },
    cta: {
      title: "Create Your Own Case Closed Character",
      description:
        "Bring your original Case Closed character to life — no drawing skills needed. Just describe, generate, and explore.",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
