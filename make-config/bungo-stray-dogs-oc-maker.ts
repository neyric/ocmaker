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
  style: "bungo-stray-dogs",
  resultBackground: examples[0].image,

  hero: {
    title: "Bungo Stray Dogs OC Maker",
    description:
      "Generate your own Bungo Stray Dogs character OC with AI. Create ability users inspired by literary figures with unique supernatural powers and organization affiliations.",
  },

  howToUse: {
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

  example: {
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

  faq: {
    title: "Frequently Asked Questions",
    description: "Have another question? Contact us at",
    contactEmail: "support@ocmaker.app",
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
    primaryButtonText: "Start Creating",
    primaryButtonLink: "#workbench",
    secondaryButtonText: "Explore Characters",
    secondaryButtonLink: "/oc-arts",
  },
};
