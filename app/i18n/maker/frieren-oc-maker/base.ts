const basePrompt = `
  WORLD CONTEXT:
  Universe: Frieren: Beyond Journey's End
  Setting: Post-Demon King era, slow travel across rebuilt kingdoms, elven longevity, ancient magic, lingering demon threats
  Key Elements: Hero party legends, first-class mage exams, northern territories, church inquisitions, demon strategists, relic-filled ruins

  OUTPUT FORMAT:
  Name, Race & Lifespan, Magical Specialty, Traveling Companions or Guild, Personality, Core Regret/Goal, Journey Backstory

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Hero",
    description: "A determined protagonist representing the heart of Frieren.",
    prompt:
      "What is your character's name?\nKei Arashi\n\nWhat is their role in Frieren?\nFrontline hero standing beside the main cast of Frieren\n\nWhat unique ability or skill do they have?\nMastery over a signature power style that defines Frieren\n\nWhat is their ultimate goal?\nTo protect their allies and push the story forward\n\nDescribe their personality.\nFearless, hopeful, and fiercely loyal",
  },
  {
    title: "Rival",
    description: "A formidable rival who challenges the heroes of Frieren.",
    prompt:
      "What is your character's name?\nMira Lynx\n\nHow do they relate to the heroes of Frieren?\nAn ambitious rival whose ideals clash with the protagonists\n\nWhat powers or techniques set them apart?\nRefined skills reflecting the darker edge of Frieren\n\nWhat drives them?\nA burning need to prove their philosophy is right\n\nDescribe their personality.\nSharp, proud, and secretly compassionate",
  },
  {
    title: "Mentor",
    description:
      "A seasoned mentor guiding the next generation within Frieren.",
    prompt:
      "What is your character's name?\nProfessor Daelin Voss\n\nWhat is their role in Frieren?\nVeteran mentor who prepares new heroes for the trials ahead\n\nWhat knowledge or abilities do they offer?\nDeep expertise in the history and power systems of Frieren\n\nWhat is their guiding lesson?\nStrength must be balanced with empathy and foresight\n\nDescribe their personality.\nPatient, witty, and unshakeable even in crisis",
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
    image: "https://cdn.ocmaker.app/example/frieren-oc-maker-generated-1.webp",
    prompt:
      "1boy, silver hair, golden eyes, dwarf warrior, beard, serious expression, frieren style heavy armor, battle axe, defensive stance, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/frieren-oc-maker-generated-2.webp",
    prompt:
      "1girl, pink hair in twin tails, purple eyes, young mage apprentice, cheerful smile, frieren style academy uniform, spell book, magical sparkles, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/frieren-oc-maker-generated-3.webp",
    prompt:
      "1boy, short brown hair, blue eyes, human warrior, determined expression, frieren style armor, sword and shield, adventurer outfit, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/frieren-oc-maker-generated-4.webp",
    prompt:
      "1girl, long white hair, green eyes, elf ears, serene expression, frieren style mage robes, wooden staff, magical aura, fantasy medieval setting, anime style, looking at viewer, simple background, upper body",
  },
];

export default {
  meta: {
    title: "Frieren OC Maker",
    description:
      "Generate your own Frieren OC with AI. Create characters, backstories, and visuals in the timeless fantasy world of elves, magic, and adventure.",
  },
  series: "Frieren",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Frieren OC Maker",
      description:
        "Generate your own Frieren OC with AI. Create characters, backstories, and visuals in the timeless fantasy world of elves, magic, and adventure.",
    },
    step: {
      title: "How to Make Frieren OC",
      description:
        "Creating a Frieren-style character with OC Maker is easy. Just follow these steps to bring your fantasy character to life.",
      steps: [
        {
          title: "Describe Your Frieren OC",
          description:
            "Fill in the form with your character's basic appearance and personality. For best results, include Frieren-style features like elven traits, medieval clothing, magical elements, and the contemplative spirit of long-lived beings.",
        },
        {
          title: "Add Details and Magical Elements",
          description:
            "Include extra details like magical specialties, race (elf, human, dwarf), adventurer class, or connections to the passage of time. The more your character fits into Frieren's world of magic and memories, the more authentic the result will be.",
        },
        {
          title: "Generate and Finalize Design",
          description:
            "Click the 'Generate Character' button to create your Frieren OC. You'll get several AI-generated designs — pick your favorite to complete your character.",
        },
      ],
    },
    examples: {
      title: "Frieren Examples",
      description:
        "Explore Frieren characters made from text prompts, created using the Frieren OC Maker.",
      examples,
    },
    features: {
      title: "What is Frieren OC Maker?",
      description:
        "Frieren OC Maker is a version of OC Maker fine-tuned for the world of Frieren: Beyond Journey's End. Describe your character, and instantly turn it into Frieren-style fantasy artwork.",
      features: [
        {
          label: "Authentic Fantasy Character Design",
          description:
            "Create characters that truly capture the timeless fantasy aesthetic of Frieren, designed to seamlessly fit into the world of elves, magic, and the passage of millennia.",
        },
        {
          label: "Tailored Prompt Tuning",
          description:
            "Prompts are fine-tuned for Frieren aesthetics — from medieval fantasy attire to magical abilities — helping you build more convincing characters.",
        },
        {
          label: "Fast Character Generation",
          description:
            "Generate high-quality characters in just seconds, allowing you to focus more on refining ideas and less on waiting.",
        },
        {
          label: "High-Quality Visual Output",
          description:
            "Powered by advanced AI models, Frieren OC Maker delivers detailed, high-resolution character images suitable for storytelling, design, or sharing.",
        },
        {
          label: "Choose from Multiple Results",
          description:
            "Generate multiple character options per prompt and select your favorites to finalize as your official Frieren OC.",
        },
        {
          label: "Deep Story Integration",
          description:
            "Bring your OC to life with not just visuals, but also compelling backstories, magical abilities, and rich connections to the themes of time and memory in Frieren's universe.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is Frieren OC Maker and how does it work?",
          answer:
            "Frieren OC Maker is a specialized version of OC Maker, fine-tuned for the Frieren universe. Simply describe your character, and our AI will generate fantasy-style Frieren visuals in seconds based on your prompt.",
        },
        {
          question: "How can I create better characters with Frieren OC Maker?",
          answer:
            "For best results, include Frieren-specific traits in your description, such as elven features, magical specializations, medieval fantasy clothing, or themes related to the passage of time. The more vivid and detailed your input, the more accurate and compelling the output.",
        },
        {
          question: "Is Frieren OC Maker free to use?",
          answer:
            "Yes, Frieren OC Maker offers free character generation with basic features. For faster results, premium options, and additional control, you can upgrade your plan anytime.",
        },
        {
          question: "What makes Frieren OC Maker's results so impressive?",
          answer:
            "Frieren OC Maker uses cutting-edge AI models fine-tuned for the Frieren setting, ensuring characters match the distinctive art style and contemplative fantasy atmosphere of the series.",
        },
        {
          question:
            "Can I use characters made with Frieren OC Maker for commercial projects?",
          answer:
            "Yes, any characters you create using Frieren OC Maker are yours to use freely for both personal and commercial purposes. We do not claim ownership over your creations.",
        },
        {
          question: "Do I need an account to use Frieren OC Maker?",
          answer:
            "No account is required for basic use. However, creating an account lets you save your characters, track generation history, and access more features.",
        },
        {
          question:
            "Can I regenerate or fine-tune the same character in Frieren OC Maker?",
          answer:
            "Yes, you can regenerate results from the same prompt or adjust your inputs to refine your character until it fits your vision perfectly.",
        },
        {
          question:
            "Will there be more anime-style OC Makers like Frieren OC Maker?",
          answer:
            "Yes! We plan to release more specialized OC Makers tailored for different anime universes. Stay tuned for future updates on ocmaker.app.",
        },
      ],
    },
    cta: {
      title: "Create Your Own Frieren Character",
      description:
        "Bring your original Frieren character to life — no drawing skills needed. Just describe, generate, and explore the timeless world of magic.",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
