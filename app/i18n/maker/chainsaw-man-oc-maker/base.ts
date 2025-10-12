const basePrompt = `
  WORLD CONTEXT:
  Universe: Chainsaw Man
  Tone: Stay faithful to Chainsaw Man's worldbuilding, factions, abilities, and storytelling style.

  OUTPUT FORMAT:
  Name, Role, Appearance, Abilities, Personality, Backstory

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Hero",
    description:
      "A determined protagonist representing the heart of Chainsaw Man.",
    prompt:
      "What is your character's name?\nKei Arashi\n\nWhat is their role in Chainsaw Man?\nFrontline hero standing beside the main cast of Chainsaw Man\n\nWhat unique ability or skill do they have?\nMastery over a signature power style that defines Chainsaw Man\n\nWhat is their ultimate goal?\nTo protect their allies and push the story forward\n\nDescribe their personality.\nFearless, hopeful, and fiercely loyal",
  },
  {
    title: "Rival",
    description:
      "A formidable rival who challenges the heroes of Chainsaw Man.",
    prompt:
      "What is your character's name?\nMira Lynx\n\nHow do they relate to the heroes of Chainsaw Man?\nAn ambitious rival whose ideals clash with the protagonists\n\nWhat powers or techniques set them apart?\nRefined skills reflecting the darker edge of Chainsaw Man\n\nWhat drives them?\nA burning need to prove their philosophy is right\n\nDescribe their personality.\nSharp, proud, and secretly compassionate",
  },
  {
    title: "Mentor",
    description:
      "A seasoned mentor guiding the next generation within Chainsaw Man.",
    prompt:
      "What is your character's name?\nProfessor Daelin Voss\n\nWhat is their role in Chainsaw Man?\nVeteran mentor who prepares new heroes for the trials ahead\n\nWhat knowledge or abilities do they offer?\nDeep expertise in the history and power systems of Chainsaw Man\n\nWhat is their guiding lesson?\nStrength must be balanced with empathy and foresight\n\nDescribe their personality.\nPatient, witty, and unshakeable even in crisis",
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
      "https://cdn.ocmaker.app/example/chainsaw-man-oc-maker-generated-1.webp",
    prompt:
      "1boy, messy black hair, sharp teeth grin, wild red eyes, chainsaw man style devil hunter uniform, blood splatter effects, chainsaw arms transformation hint, dark urban background, anime style, looking at viewer, simple background, upper body",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/chainsaw-man-oc-maker-generated-2.webp",
    prompt:
      "1girl, long dark hair, cold yellow eyes, stoic expression, chainsaw man style public safety suit, cigarette, devil contract markings, professional stance, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/chainsaw-man-oc-maker-generated-3.webp",
    prompt:
      "1girl, short pink hair, spiral eyes, unhinged smile, chainsaw man style casual outfit, devil features, blood on face, chaotic energy, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/chainsaw-man-oc-maker-generated-4.webp",
    prompt:
      "1boy, white hair, heterochromia eyes, mysterious expression, chainsaw man style hybrid form hints, torn clothing, devil hunter rookie, battle-ready pose, single character, upper body, looking at viewer, anime style, simple background",
  },
];

export default {
  meta: {
    title: "Chainsaw Man OC Maker",
    description:
      "Generate your own Chainsaw Man OC with AI. Create characters, backstories, and visuals in the dark and chaotic world of devils, contracts, and devil hunters.",
  },
  series: "Chainsaw Man",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Chainsaw Man OC Maker",
      description:
        "Generate your own Chainsaw Man OC with AI. Create characters, backstories, and visuals in the dark and chaotic world of devils, contracts, and devil hunters.",
    },
    step: {
      title: "How to Make Chainsaw Man OC",
      description:
        "Creating a Chainsaw Man-style character with OC Maker is easy. Just follow these steps to bring your devil hunter or devil to life.",
      steps: [
        {
          title: "Describe Your Chainsaw Man OC",
          description:
            "Fill in the form with your character's basic appearance and personality. For best results, include Chainsaw Man-style features like devil hunter uniforms, devil traits, unhinged expressions, and the dark atmosphere of the series.",
        },
        {
          title: "Add Details and Devil Elements",
          description:
            "Include extra details like their role (devil hunter, devil, hybrid), devil contracts, special abilities, or connections to Public Safety. The more your character fits into the chaotic world of devils, the more authentic the result will be.",
        },
        {
          title: "Generate and Finalize Design",
          description:
            "Click the 'Generate Character' button to create your Chainsaw Man OC. You'll get several AI-generated designs — pick your favorite to complete your character.",
        },
      ],
    },
    examples: {
      title: "Chainsaw Man Examples",
      description:
        "Explore Chainsaw Man characters made from text prompts, created using the Chainsaw Man OC Maker.",
      examples,
    },
    features: {
      title: "What is Chainsaw Man OC Maker?",
      description:
        "Chainsaw Man OC Maker is a version of OC Maker fine-tuned for the world of Chainsaw Man. Describe your character, and instantly turn it into dark fantasy-style artwork.",
      features: [
        {
          label: "Authentic Dark Fantasy Design",
          description:
            "Create characters that truly capture the gritty, chaotic atmosphere of Chainsaw Man, designed to seamlessly fit into the world of devils, contracts, and desperate survival.",
        },
        {
          label: "Tailored Prompt Tuning",
          description:
            "Prompts are fine-tuned for Chainsaw Man aesthetics — from devil features to Public Safety uniforms — helping you build more convincing characters.",
        },
        {
          label: "Fast Character Generation",
          description:
            "Generate high-quality characters in just seconds, allowing you to focus more on refining ideas and less on waiting.",
        },
        {
          label: "High-Quality Visual Output",
          description:
            "Powered by advanced AI models, Chainsaw Man OC Maker delivers detailed, high-resolution character images suitable for storytelling, design, or sharing.",
        },
        {
          label: "Choose from Multiple Results",
          description:
            "Generate multiple character options per prompt and select your favorites to finalize as your official Chainsaw Man OC.",
        },
        {
          label: "Deep Story Integration",
          description:
            "Bring your OC to life with not just visuals, but also compelling backstories, devil contracts, fears and desires, and rich connections to the brutal world of Chainsaw Man.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is Chainsaw Man OC Maker and how does it work?",
          answer:
            "Chainsaw Man OC Maker is a specialized version of OC Maker, fine-tuned for the Chainsaw Man universe. Simply describe your character, and our AI will generate dark fantasy-style visuals in seconds based on your prompt.",
        },
        {
          question:
            "How can I create better characters with Chainsaw Man OC Maker?",
          answer:
            "For best results, include Chainsaw Man-specific traits in your description, such as devil features, Public Safety roles, devil contracts, or personality traits suited for the chaotic world. The more vivid and detailed your input, the more accurate and compelling the output.",
        },
        {
          question: "Is Chainsaw Man OC Maker free to use?",
          answer:
            "Yes, Chainsaw Man OC Maker offers free character generation with basic features. For faster results, premium options, and additional control, you can upgrade your plan anytime.",
        },
        {
          question: "What makes Chainsaw Man OC Maker's results so impressive?",
          answer:
            "Chainsaw Man OC Maker uses cutting-edge AI models fine-tuned for the dark fantasy setting, ensuring characters match the distinctive art style and brutal atmosphere of the series.",
        },
        {
          question:
            "Can I use characters made with Chainsaw Man OC Maker for commercial projects?",
          answer:
            "Yes, any characters you create using Chainsaw Man OC Maker are yours to use freely for both personal and commercial purposes. We do not claim ownership over your creations.",
        },
        {
          question: "Do I need an account to use Chainsaw Man OC Maker?",
          answer:
            "No account is required for basic use. However, creating an account lets you save your characters, track generation history, and access more features.",
        },
        {
          question:
            "Can I regenerate or fine-tune the same character in Chainsaw Man OC Maker?",
          answer:
            "Yes, you can regenerate results from the same prompt or adjust your inputs to refine your character until it fits your vision perfectly.",
        },
        {
          question:
            "Will there be more anime-style OC Makers like Chainsaw Man OC Maker?",
          answer:
            "Yes! We plan to release more specialized OC Makers tailored for different anime universes. Stay tuned for future updates on ocmaker.app.",
        },
      ],
    },
    cta: {
      title: "Create Your Devil Hunter",
      description:
        "Bring your original Chainsaw Man character to life — no drawing skills needed. Just describe, generate, and survive in the world of devils.",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
