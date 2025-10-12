const basePrompt = `
  WORLD CONTEXT:
  Universe: Bungo Stray Dogs
  Tone: Stay faithful to Bungo Stray Dogs's worldbuilding, factions, abilities, and storytelling style.

  OUTPUT FORMAT:
  Name, Role, Appearance, Abilities, Personality, Backstory

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Hero",
    description:
      "A determined protagonist representing the heart of Bungo Stray Dogs.",
    prompt:
      "What is your character's name?\nKei Arashi\n\nWhat is their role in Bungo Stray Dogs?\nFrontline hero standing beside the main cast of Bungo Stray Dogs\n\nWhat unique ability or skill do they have?\nMastery over a signature power style that defines Bungo Stray Dogs\n\nWhat is their ultimate goal?\nTo protect their allies and push the story forward\n\nDescribe their personality.\nFearless, hopeful, and fiercely loyal",
  },
  {
    title: "Rival",
    description:
      "A formidable rival who challenges the heroes of Bungo Stray Dogs.",
    prompt:
      "What is your character's name?\nMira Lynx\n\nHow do they relate to the heroes of Bungo Stray Dogs?\nAn ambitious rival whose ideals clash with the protagonists\n\nWhat powers or techniques set them apart?\nRefined skills reflecting the darker edge of Bungo Stray Dogs\n\nWhat drives them?\nA burning need to prove their philosophy is right\n\nDescribe their personality.\nSharp, proud, and secretly compassionate",
  },
  {
    title: "Mentor",
    description:
      "A seasoned mentor guiding the next generation within Bungo Stray Dogs.",
    prompt:
      "What is your character's name?\nProfessor Daelin Voss\n\nWhat is their role in Bungo Stray Dogs?\nVeteran mentor who prepares new heroes for the trials ahead\n\nWhat knowledge or abilities do they offer?\nDeep expertise in the history and power systems of Bungo Stray Dogs\n\nWhat is their guiding lesson?\nStrength must be balanced with empathy and foresight\n\nDescribe their personality.\nPatient, witty, and unshakeable even in crisis",
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
      "https://cdn.ocmaker.app/example/bungo-stray-dogs-oc-generated-1.webp",
    prompt:
      "1boy, messy black hair, heterochromia eyes, mysterious smile, armed detective agency outfit, brown coat, literary book accessory, ability activation pose, single character, upper body, looking at viewer, anime style, yokohama background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/bungo-stray-dogs-oc-generated-2.webp",
    prompt:
      "1girl, long silver hair, purple eyes, elegant expression, port mafia executive suit, black formal outfit with red accents, ability aura effects, confident stance, single character, upper body, looking at viewer, anime style, noir atmosphere",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/bungo-stray-dogs-oc-generated-3.webp",
    prompt:
      "1boy, short blonde hair, green eyes, gentle smile, guild member uniform, victorian-style outfit, pocket watch accessory, scholarly pose with book, single character, upper body, looking at viewer, anime style, library background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/bungo-stray-dogs-oc-generated-4.webp",
    prompt:
      "1girl, twin braids red hair, golden eyes, mischievous grin, decay of angels outfit, gothic lolita dress, supernatural ability effects, playful pose, single character, upper body, looking at viewer, anime style, mysterious background",
  },
];

export default {
  meta: {
    title: "Bungo Stray Dogs OC Maker",
    description:
      "Generate your own Bungo Stray Dogs character OC with AI. Create ability users inspired by literary figures with unique supernatural powers and organization affiliations.",
  },
  series: "Bungo Stray Dogs",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Bungo Stray Dogs OC Maker",
      description:
        "Generate your own Bungo Stray Dogs character OC with AI. Create ability users inspired by literary figures with unique supernatural powers and organization affiliations.",
    },
    step: {
      title: "How to Make Bungo Stray Dogs OC",
      description:
        "Join the world of literary ability users in Yokohama. Follow these steps to design your supernatural detective or mafia executive.",
      steps: [
        {
          title: "Choose Your Organization",
          description:
            "Select your character's affiliation: Armed Detective Agency, Port Mafia, The Guild, Decay of Angels, or Government Special Division. Each organization has distinct uniforms, philosophies, and operational styles.",
        },
        {
          title: "Design Ability and Literary Inspiration",
          description:
            "Create your character's supernatural ability based on a literary work or author. Describe their appearance, personality, and how their ability manifests. Include their literary inspiration and ability name for authenticity.",
        },
        {
          title: "Generate Your Ability User",
          description:
            "Click 'Generate Character' to bring your Bungo Stray Dogs OC to life. Select from multiple AI-generated designs that capture the series' noir aesthetic and supernatural action style.",
        },
      ],
    },
    examples: {
      title: "Ability User Examples",
      description:
        "Explore amazing literary-inspired characters created with text prompts using the Bungo Stray Dogs OC Maker.",
      examples,
    },
    features: {
      title: "What is Bungo Stray Dogs OC Maker?",
      description:
        "Bungo Stray Dogs OC Maker is designed specifically for the literary supernatural universe. Create authentic ability users with organization ties, unique powers, and literary themes.",
      features: [
        {
          label: "Authentic BSD Art Style",
          description:
            "Generate characters that perfectly match Bungo Stray Dogs' distinctive art style, from dramatic ability effects to stylish organization uniforms and noir aesthetics.",
        },
        {
          label: "Organization System Integration",
          description:
            "Our AI understands all major organizations and their characteristics, ensuring your character's outfit, demeanor, and style match their chosen affiliation perfectly.",
        },
        {
          label: "Literary Ability Creation",
          description:
            "Create ability users in seconds with powers inspired by literature, perfect for detective missions, mafia operations, or supernatural conflicts in Yokohama.",
        },
        {
          label: "High-Quality Action Artwork",
          description:
            "Powered by AI trained on BSD's visual standards, delivering character art that captures the series' blend of action, mystery, and literary sophistication.",
        },
        {
          label: "Multiple Ability Variations",
          description:
            "Generate several character interpretations per prompt, exploring different abilities, organization roles, and combat styles to find your perfect ability user design.",
        },
        {
          label: "Yokohama World Integration",
          description:
            "Create characters that naturally fit into BSD's supernatural Yokohama, with authentic organization cultures, ability manifestations, and literary references.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is Bungo Stray Dogs OC Maker and how does it work?",
          answer:
            "Bungo Stray Dogs OC Maker is an AI tool specialized for creating original BSD characters. Describe your character's ability, organization, and literary inspiration, and our AI generates authentic BSD-style artwork.",
        },
        {
          question:
            "How can I create better characters with Bungo Stray Dogs OC Maker?",
          answer:
            "Include specific BSD elements like organization affiliations, ability names based on literary works, combat styles, and character relationships. Reference real authors or literature for more authentic ability users.",
        },
        {
          question: "Is Bungo Stray Dogs OC Maker free to use?",
          answer:
            "Yes, Bungo Stray Dogs OC Maker offers free character generation with basic features. Premium plans provide faster generation, more organization options, and advanced ability customization tools.",
        },
        {
          question:
            "What makes Bungo Stray Dogs OC Maker's results so authentic?",
          answer:
            "Our AI is specifically trained on BSD's art style and supernatural themes, understanding organization aesthetics, ability manifestations, and the series' distinctive noir atmosphere.",
        },
        {
          question:
            "Can I use characters created with BSD OC Maker commercially?",
          answer:
            "Yes, all original characters you create are yours to use for personal and commercial projects. We don't claim ownership of your ability user designs or BSD OCs.",
        },
        {
          question: "Do I need an account to use Bungo Stray Dogs OC Maker?",
          answer:
            "No account required for basic use. Creating an account allows you to save characters, access generation history, and unlock premium BSD-themed features.",
        },
        {
          question: "Can I create characters from different organizations?",
          answer:
            "Absolutely! Create members of the Armed Detective Agency, Port Mafia executives, Guild operatives, government agents, or even rogue ability users. Mix literary inspirations and abilities freely.",
        },
        {
          question: "Are more supernatural anime OC makers being developed?",
          answer:
            "Yes! We're expanding to include other supernatural action series with unique power systems. Follow our updates for new themed OC makers inspired by ability-based stories.",
        },
      ],
    },
    cta: {
      title: "Awaken Your Literary Ability",
      description:
        "Design your ultimate ability user — no artistic skills required. Just imagine, describe, and join the supernatural conflicts of Yokohama.",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
