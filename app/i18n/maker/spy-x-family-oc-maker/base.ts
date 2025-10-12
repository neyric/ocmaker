const basePrompt = `
  WORLD CONTEXT:
  Universe: SPY×FAMILY
  Setting: Cold War tension between Westalis and Ostania, clandestine operations, elite schools, double lives, comedic spy drama
  Key Factions: WISE agency, SSS State Security, Garden assassins, Eden Academy elites, Desmond political network, informant underworld, Westalis diplomacy

  OUTPUT FORMAT:
  Name, Cover Identity & True Role, Agency/Allegiance, Signature Skills or Powers, Personality, Mission Objective, Backstory Snapshot

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Hero",
    description:
      "A determined protagonist representing the heart of Spy x Family.",
    prompt:
      "What is your character's name?\nKei Arashi\n\nWhat is their role in Spy x Family?\nFrontline hero standing beside the main cast of Spy x Family\n\nWhat unique ability or skill do they have?\nMastery over a signature power style that defines Spy x Family\n\nWhat is their ultimate goal?\nTo protect their allies and push the story forward\n\nDescribe their personality.\nFearless, hopeful, and fiercely loyal",
  },
  {
    title: "Rival",
    description:
      "A formidable rival who challenges the heroes of Spy x Family.",
    prompt:
      "What is your character's name?\nMira Lynx\n\nHow do they relate to the heroes of Spy x Family?\nAn ambitious rival whose ideals clash with the protagonists\n\nWhat powers or techniques set them apart?\nRefined skills reflecting the darker edge of Spy x Family\n\nWhat drives them?\nA burning need to prove their philosophy is right\n\nDescribe their personality.\nSharp, proud, and secretly compassionate",
  },
  {
    title: "Mentor",
    description:
      "A seasoned mentor guiding the next generation within Spy x Family.",
    prompt:
      "What is your character's name?\nProfessor Daelin Voss\n\nWhat is their role in Spy x Family?\nVeteran mentor who prepares new heroes for the trials ahead\n\nWhat knowledge or abilities do they offer?\nDeep expertise in the history and power systems of Spy x Family\n\nWhat is their guiding lesson?\nStrength must be balanced with empathy and foresight\n\nDescribe their personality.\nPatient, witty, and unshakeable even in crisis",
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
      "https://cdn.ocmaker.app/example/spy-x-family-oc-maker-generated-1.webp",
    prompt:
      "1girl, anya forger, spy x family, pink hair, short hair, green eyes, small stature, child, school uniform, eden academy uniform, white shirt, red sweater vest, black skirt, white socks, black shoes, innocent expression, curious look, antenna hair, hair ornaments, looking at viewer, simple background, upper body",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/spy-x-family-oc-maker-generated-2.webp",
    prompt:
      "1boy, damian desmond, spy x family, blonde hair, short hair, green eyes, child, school uniform, eden academy uniform, white shirt, red tie, dark blue blazer, proud expression, arrogant smile, crossed arms, looking at viewer, simple background, upper body, masterpiece, best quality, very aesthetic, absurdres",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/spy-x-family-oc-maker-generated-3.webp",
    prompt:
      "1girl, yor forger, spy x family, long black hair, red eyes, black sleeveless dress, gold hairband, earrings, gentle expression, assassin, elegant pose, anime style, looking at viewer, simple background, upper body",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/spy-x-family-oc-maker-generated-4.webp",
    prompt:
      "1boy, loid forger, spy x family, blonde hair, short hair, green eyes, serious expression, black suit, white dress shirt, black tie, spy, professional appearance, mature male, looking at viewer, simple background, upper body",
  },
];

export default {
  meta: {
    title: "Spy x Family OC Maker",
    description:
      "Generate your own Spy x Family OC with AI. Create characters, backstories, and visuals in the charming spy comedy style.",
  },
  series: "Spy x Family",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Spy x Family OC Maker",
      description:
        "Generate your own Spy x Family OC with AI. Create characters, backstories, and visuals in the charming spy comedy style.",
    },
    step: {
      title: "How to Make Spy x Family OC",
      description:
        "Creating a Spy x Family-style character with OC Maker is easy. Just follow these two steps to bring your idea to life.",
      steps: [
        {
          title: "Describe Your Spy x Family OC",
          description:
            "Fill in the form with your character's basic appearance and personality. For best results, include Spy x Family-style features like elegant formal wear, spy gadgets, and the sophisticated yet charming demeanor of a secret agent.",
        },
        {
          title: "Add Details and Spy Elements",
          description:
            "Include extra details like spy equipment, assassination skills, or telepathic abilities. The more your character fits into the Spy x Family universe of espionage and family comedy, the more accurate and impressive the result will be.",
        },
        {
          title: "Generate and Finalize Design",
          description:
            "Click the 'Generate Character' button to create your Spy x Family OC. You'll get several AI-generated designs — pick your favorite to complete your character.",
        },
      ],
    },
    examples: {
      title: "Spy x Family Examples",
      description:
        "Explore Spy x Family characters made from text prompts, created using the Spy x Family OC Maker.",
      examples,
    },
    features: {
      title: "What is Spy x Family OC Maker?",
      description:
        "Spy x Family OC Maker is a version of OC Maker fine-tuned for the world of Spy x Family. Describe your character, and instantly turn it into Spy x Family-style artwork.",
      features: [
        {
          label: "Authentic Spy x Family Character Design",
          description:
            "Create characters that truly capture the sophisticated spy comedy spirit of Spy x Family, designed to seamlessly fit into the world of espionage, family dynamics, and heartwarming moments.",
        },
        {
          label: "Tailored Prompt Tuning",
          description:
            "Prompts are fine-tuned for Spy x Family aesthetics — from elegant spy outfits to charming family interactions — helping you build more convincing characters.",
        },
        {
          label: "Fast Character Generation",
          description:
            "Generate high-quality characters in just seconds, allowing you to focus more on refining ideas and less on waiting.",
        },
        {
          label: "High-Quality Visual Output",
          description:
            "Powered by advanced AI models, Spy x Family OC Maker delivers detailed, high-resolution character images suitable for storytelling, design, or sharing.",
        },
        {
          label: "Choose from Multiple Results",
          description:
            "Generate multiple character options per prompt and select your favorites to finalize as your official Spy x Family OC.",
        },
        {
          label: "Deep Story Integration",
          description:
            "Bring your OC to life with not just visuals, but also compelling backstories, spy missions, and rich connections to the Spy x Family universe.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is Spy x Family OC Maker and how does it work?",
          answer:
            "Spy x Family OC Maker is a specialized version of OC Maker, fine-tuned for the Spy x Family universe. Simply describe your character, and our AI will generate anime-style Spy x Family visuals in seconds based on your prompt.",
        },
        {
          question:
            "How can I create better characters with Spy x Family OC Maker?",
          answer:
            "For best results, include Spy x Family-specific traits in your description, such as spy gadgets, elegant clothing, or family dynamics. The more vivid and detailed your input, the more accurate and compelling the output.",
        },
        {
          question: "Is Spy x Family OC Maker free to use?",
          answer:
            "Yes, Spy x Family OC Maker offers free character generation with basic features. For faster results, premium options, and additional control, you can upgrade your plan anytime.",
        },
        {
          question: "What makes Spy x Family OC Maker's results so impressive?",
          answer:
            "Spy x Family OC Maker uses cutting-edge AI models fine-tuned for the Spy x Family setting, ensuring characters match the sophisticated spy comedy style and charming family dynamics of the series.",
        },
        {
          question:
            "Can I use characters made with Spy x Family OC Maker for commercial projects?",
          answer:
            "Yes, any characters you create using Spy x Family OC Maker are yours to use freely for both personal and commercial purposes. We do not claim ownership over your creations.",
        },
        {
          question: "Do I need an account to use Spy x Family OC Maker?",
          answer:
            "No account is required for basic use. However, creating an account lets you save your characters, track generation history, and access more features.",
        },
        {
          question:
            "Can I regenerate or fine-tune the same character in Spy x Family OC Maker?",
          answer:
            "Yes, you can regenerate results from the same prompt or adjust your inputs to refine your character until it fits your vision perfectly.",
        },
        {
          question:
            "Will there be more anime-style OC Makers like Spy x Family OC Maker?",
          answer:
            "Yes! We plan to release more specialized OC Makers tailored for different anime universes. Stay tuned for future updates on ocmaker.app.",
        },
      ],
    },
    cta: {
      title: "Create Your Own Spy x Family Character",
      description:
        "Bring your original Spy x Family character to life — no drawing skills needed. Just describe, generate, and explore.",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
