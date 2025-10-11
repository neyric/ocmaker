const examples = [
  {
    image:
      "https://cdn.ocmaker.app/example/honkai-star-rail-oc-generated-1.webp",
    prompt:
      "1girl, silver hair, purple eyes, elegant expression, astral express member uniform, space-themed outfit, star motifs, constellation accessories, confident pose, single character, upper body, looking at viewer, anime style, cosmic background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/honkai-star-rail-oc-generated-2.webp",
    prompt:
      "1boy, dark blue hair, golden eyes, mysterious smile, stellaron hunter outfit, futuristic coat, technology accessories, path of destruction symbols, dramatic pose, single character, upper body, looking at viewer, anime style, starry background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/honkai-star-rail-oc-generated-3.webp",
    prompt:
      "1girl, pink hair with blue highlights, emerald eyes, gentle expression, silvermane guard uniform, belobog military style, ice crystals effects, path of preservation emblem, protective stance, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/honkai-star-rail-oc-generated-4.webp",
    prompt:
      "1boy, white hair, red eyes, scholarly appearance, genius society robes, path of erudition symbols, ancient scrolls, intellectual pose, single character, upper body, looking at viewer, anime style, library background",
  },
];

export default {
  style: "honkai-star-rail",
  resultBackground: examples[0].image,

  hero: {
    title: "Honkai Star Rail OC Maker",
    description:
      "Generate your own Honkai: Star Rail character OC with AI. Create trailblazers, stellaron hunters, and faction members with unique paths and cosmic adventures.",
  },

  howToUse: {
    title: "How to Make Honkai Star Rail OC",
    description:
      "Embark on your own trailblazing journey by creating the perfect Star Rail character. Follow these steps to design your cosmic adventurer.",
    steps: [
      {
        title: "Choose Your Path and Faction",
        description:
          "Select your character's Path (Destruction, Preservation, Hunt, Erudition, Harmony, Nihility, Abundance) and faction affiliation (Astral Express, Stellaron Hunters, IPC, Silvermane Guards, etc.). Each path has distinct visual themes and abilities.",
      },
      {
        title: "Design Appearance and Origin",
        description:
          "Describe your character's appearance, outfit style, and planetary origin. Include details like elemental affinities, weapon preferences, and cosmic abilities. Consider their role in the larger universe and connection to the Stellaron crisis.",
      },
      {
        title: "Generate Your Trailblazer",
        description:
          "Click 'Generate Character' to bring your Star Rail OC to life. Choose from multiple AI-generated designs that capture the game's distinctive sci-fi aesthetic and cosmic grandeur.",
      },
    ],
  },

  example: {
    title: "Honkai Star Rail Examples",
    description:
      "Discover amazing cosmic characters created with text prompts using the Honkai: Star Rail OC Maker.",
    examples,
  },

  features: {
    title: "What is Honkai Star Rail OC Maker?",
    description:
      "Honkai: Star Rail OC Maker is designed specifically for miHoYo's cosmic RPG universe. Create authentic characters with distinct paths, factions, and interstellar themes.",
    features: [
      {
        label: "Authentic Star Rail Art Style",
        description:
          "Generate characters that perfectly match Honkai: Star Rail's distinctive 3D-inspired anime aesthetic, from character proportions to cosmic outfits and sci-fi elements.",
      },
      {
        label: "Path System Integration",
        description:
          "Our AI understands all seven Paths and their visual representations, ensuring your character's cosmic powers and philosophical alignment are accurately depicted in their design.",
      },
      {
        label: "Rapid Character Creation",
        description:
          "Create stunning Star Rail characters in seconds, perfect for exploring the universe, developing faction stories, or expanding your cosmic roster.",
      },
      {
        label: "High-Quality Cosmic Artwork",
        description:
          "Powered by AI trained on Star Rail's visual standards, delivering character art that matches the game's sophisticated sci-fi aesthetic and quality.",
      },
      {
        label: "Multiple Design Variations",
        description:
          "Generate several character interpretations per prompt, exploring different paths, factions, and cosmic themes to find your perfect trailblazer design.",
      },
      {
        label: "Universe Lore Integration",
        description:
          "Create characters that naturally fit into Star Rail's rich cosmic lore, with authentic faction influences, path philosophies, and interstellar adventure themes.",
      },
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    description: "Have another question? Contact us at",
    contactEmail: "support@ocmaker.app",
    faqs: [
      {
        question: "What is Honkai Star Rail OC Maker and how does it work?",
        answer:
          "Honkai: Star Rail OC Maker is an AI tool specialized for creating original Star Rail characters. Describe your character's path, faction, and cosmic abilities, and our AI generates authentic Star Rail-style artwork.",
      },
      {
        question:
          "How can I create better characters with Honkai Star Rail OC Maker?",
        answer:
          "Include specific Star Rail elements like Path affiliations, faction memberships, planetary origins, elemental abilities, and cosmic themes. The more lore-accurate details you include, the more authentic your character will be.",
      },
      {
        question: "Is Honkai Star Rail OC Maker free to use?",
        answer:
          "Yes, Honkai: Star Rail OC Maker offers free character generation with core features. Premium plans provide faster generation, more path options, and advanced cosmic customization tools.",
      },
      {
        question: "What makes Star Rail OC Maker's results so authentic?",
        answer:
          "Our AI is specifically trained on Star Rail's art style and universe lore, understanding path philosophies, faction aesthetics, and the game's distinctive sci-fi character design principles.",
      },
      {
        question:
          "Can I use characters created with Star Rail OC Maker commercially?",
        answer:
          "Yes, all original characters you create are yours to use for personal and commercial projects. We don't claim ownership of your trailblazer designs or Star Rail OCs.",
      },
      {
        question: "Do I need an account to use Honkai Star Rail OC Maker?",
        answer:
          "No account required for basic use. Creating an account allows you to save characters, access generation history, and unlock premium Star Rail-themed features.",
      },
      {
        question: "Can I create characters from different factions and paths?",
        answer:
          "Absolutely! Create characters from any faction (Astral Express, Stellaron Hunters, IPC, etc.) following any of the seven Paths. Mix and match cosmic abilities and affiliations freely.",
      },
      {
        question: "Are more miHoYo game OC makers being developed?",
        answer:
          "Yes! We're expanding to include other miHoYo universes and similar sci-fi RPGs. Follow our updates for new themed OC makers inspired by popular cosmic adventures.",
      },
    ],
  },

  cta: {
    title: "Begin Your Cosmic Journey",
    description:
      "Design your ultimate Star Rail trailblazer — no artistic skills required. Just imagine, describe, and explore the infinite cosmos of Honkai: Star Rail.",
    primaryButtonText: "Start Creating",
    primaryButtonLink: "#workbench",
    secondaryButtonText: "Explore Characters",
    secondaryButtonLink: "/oc-arts",
  },
};
