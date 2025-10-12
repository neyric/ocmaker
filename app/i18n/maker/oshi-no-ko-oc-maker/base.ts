const basePrompt = `
  WORLD CONTEXT:
  Universe: Oshi no Ko
  Setting: Japanese entertainment industry, idol culture, acting agencies, reality shows, social media scandals, revenge intrigue
  Key Circles: B-Komachi, Strawberry Productions, Lala Lai Theatre Company, rival idol units, drama directors, online influencers, tabloid reporters

  OUTPUT FORMAT:
  Name, Entertainment Role, Agency/Affiliation, Signature Performance Talent, Personality, Public Persona vs True Self, Backstory Snapshot

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Hero",
    description:
      "A determined protagonist representing the heart of Oshi no Ko.",
    prompt:
      "What is your character's name?\nKei Arashi\n\nWhat is their role in Oshi no Ko?\nFrontline hero standing beside the main cast of Oshi no Ko\n\nWhat unique ability or skill do they have?\nMastery over a signature power style that defines Oshi no Ko\n\nWhat is their ultimate goal?\nTo protect their allies and push the story forward\n\nDescribe their personality.\nFearless, hopeful, and fiercely loyal",
  },
  {
    title: "Rival",
    description: "A formidable rival who challenges the heroes of Oshi no Ko.",
    prompt:
      "What is your character's name?\nMira Lynx\n\nHow do they relate to the heroes of Oshi no Ko?\nAn ambitious rival whose ideals clash with the protagonists\n\nWhat powers or techniques set them apart?\nRefined skills reflecting the darker edge of Oshi no Ko\n\nWhat drives them?\nA burning need to prove their philosophy is right\n\nDescribe their personality.\nSharp, proud, and secretly compassionate",
  },
  {
    title: "Mentor",
    description:
      "A seasoned mentor guiding the next generation within Oshi no Ko.",
    prompt:
      "What is your character's name?\nProfessor Daelin Voss\n\nWhat is their role in Oshi no Ko?\nVeteran mentor who prepares new heroes for the trials ahead\n\nWhat knowledge or abilities do they offer?\nDeep expertise in the history and power systems of Oshi no Ko\n\nWhat is their guiding lesson?\nStrength must be balanced with empathy and foresight\n\nDescribe their personality.\nPatient, witty, and unshakeable even in crisis",
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
      "https://cdn.ocmaker.app/example/oshi-no-ko-oc-maker-generated-1.webp",
    prompt:
      "1girl, long blonde hair, star-shaped pupils, confident smile, oshi no ko style idol outfit, microphone, stage lights, sparkling effects, anime style, looking at viewer, simple background, upper body",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/oshi-no-ko-oc-maker-generated-2.webp",
    prompt:
      "1boy, dark purple hair, star eyes, serious expression, oshi no ko style actor outfit, script in hand, entertainment industry setting, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/oshi-no-ko-oc-maker-generated-3.webp",
    prompt:
      "1girl, pink hair with side ponytail, aqua star eyes, cheerful expression, oshi no ko style school uniform with idol accessories, phone in hand, social media influencer vibe, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/oshi-no-ko-oc-maker-generated-4.webp",
    prompt:
      "1girl, silver hair, ruby star eyes, mysterious smile, oshi no ko style producer outfit, tablet and headset, behind-the-scenes professional, single character, upper body, looking at viewer, anime style, simple background",
  },
];

export default {
  meta: {
    title: "Oshi no Ko OC Maker",
    description:
      "Generate your own Oshi no Ko OC with AI. Create characters, backstories, and visuals in the dazzling world of idols, actors, and entertainment industry.",
  },
  series: "Oshi no Ko",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Oshi no Ko OC Maker",
      description:
        "Generate your own Oshi no Ko OC with AI. Create characters, backstories, and visuals in the dazzling world of idols, actors, and entertainment industry.",
    },
    step: {
      title: "How to Make Oshi no Ko OC",
      description:
        "Creating an Oshi no Ko-style character with OC Maker is easy. Just follow these steps to bring your entertainment industry character to life.",
      steps: [
        {
          title: "Describe Your Oshi no Ko OC",
          description:
            "Fill in the form with your character's basic appearance and personality. For best results, include Oshi no Ko-style features like star-shaped pupils, modern fashion, entertainment industry roles, and the ambitious spirit of showbiz.",
        },
        {
          title: "Add Details and Industry Elements",
          description:
            "Include extra details like their role (idol, actor, producer, manager), special talents, or connections to the entertainment world. The more your character fits into the showbiz setting, the more authentic the result will be.",
        },
        {
          title: "Generate and Finalize Design",
          description:
            "Click the 'Generate Character' button to create your Oshi no Ko OC. You'll get several AI-generated designs — pick your favorite to complete your character.",
        },
      ],
    },
    examples: {
      title: "Oshi no Ko Examples",
      description:
        "Explore Oshi no Ko characters made from text prompts, created using the Oshi no Ko OC Maker.",
      examples,
    },
    features: {
      title: "What is Oshi no Ko OC Maker?",
      description:
        "Oshi no Ko OC Maker is a version of OC Maker fine-tuned for the world of Oshi no Ko. Describe your character, and instantly turn it into entertainment industry-style artwork.",
      features: [
        {
          label: "Authentic Entertainment Industry Design",
          description:
            "Create characters that truly capture the glamorous yet complex world of Oshi no Ko, designed to seamlessly fit into the entertainment industry setting with all its lights and shadows.",
        },
        {
          label: "Tailored Prompt Tuning",
          description:
            "Prompts are fine-tuned for Oshi no Ko aesthetics — from star eyes to idol outfits — helping you build more convincing characters.",
        },
        {
          label: "Fast Character Generation",
          description:
            "Generate high-quality characters in just seconds, allowing you to focus more on refining ideas and less on waiting.",
        },
        {
          label: "High-Quality Visual Output",
          description:
            "Powered by advanced AI models, Oshi no Ko OC Maker delivers detailed, high-resolution character images suitable for storytelling, design, or sharing.",
        },
        {
          label: "Choose from Multiple Results",
          description:
            "Generate multiple character options per prompt and select your favorites to finalize as your official Oshi no Ko OC.",
        },
        {
          label: "Deep Story Integration",
          description:
            "Bring your OC to life with not just visuals, but also compelling backstories, entertainment careers, and rich connections to the complex world of showbiz in Oshi no Ko.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is Oshi no Ko OC Maker and how does it work?",
          answer:
            "Oshi no Ko OC Maker is a specialized version of OC Maker, fine-tuned for the Oshi no Ko universe. Simply describe your character, and our AI will generate entertainment industry-style visuals in seconds based on your prompt.",
        },
        {
          question:
            "How can I create better characters with Oshi no Ko OC Maker?",
          answer:
            "For best results, include Oshi no Ko-specific traits in your description, such as star-shaped eyes, entertainment industry roles, modern fashion, or personality traits suited for showbiz. The more vivid and detailed your input, the more accurate and compelling the output.",
        },
        {
          question: "Is Oshi no Ko OC Maker free to use?",
          answer:
            "Yes, Oshi no Ko OC Maker offers free character generation with basic features. For faster results, premium options, and additional control, you can upgrade your plan anytime.",
        },
        {
          question: "What makes Oshi no Ko OC Maker's results so impressive?",
          answer:
            "Oshi no Ko OC Maker uses cutting-edge AI models fine-tuned for the entertainment industry setting, ensuring characters match the distinctive art style and dramatic atmosphere of the series.",
        },
        {
          question:
            "Can I use characters made with Oshi no Ko OC Maker for commercial projects?",
          answer:
            "Yes, any characters you create using Oshi no Ko OC Maker are yours to use freely for both personal and commercial purposes. We do not claim ownership over your creations.",
        },
        {
          question: "Do I need an account to use Oshi no Ko OC Maker?",
          answer:
            "No account is required for basic use. However, creating an account lets you save your characters, track generation history, and access more features.",
        },
        {
          question:
            "Can I regenerate or fine-tune the same character in Oshi no Ko OC Maker?",
          answer:
            "Yes, you can regenerate results from the same prompt or adjust your inputs to refine your character until it fits your vision perfectly.",
        },
        {
          question:
            "Will there be more anime-style OC Makers like Oshi no Ko OC Maker?",
          answer:
            "Yes! We plan to release more specialized OC Makers tailored for different anime universes. Stay tuned for future updates on ocmaker.app.",
        },
      ],
    },
    cta: {
      title: "Create Your Own Entertainment Star",
      description:
        "Bring your original Oshi no Ko character to life — no drawing skills needed. Just describe, generate, and shine in the world of entertainment.",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
