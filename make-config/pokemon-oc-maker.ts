const examples = [
  {
    image: "https://cdn.ocmaker.app/example/pokemon-oc-generated-1.webp",
    prompt:
      "1girl, brown hair, hazel eyes, confident smile, pokemon trainer outfit, pokemon league cap, pokeball belt, trainer gloves, pikachu on shoulder, adventure pose, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/pokemon-oc-generated-2.webp",
    prompt:
      "1boy, silver hair, blue eyes, serious expression, team rocket uniform, black and red outfit with 'R' logo, pokemon capture device, sneaky pose, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/pokemon-oc-generated-3.webp",
    prompt:
      "1girl, long green hair, emerald eyes, gentle smile, pokemon coordinator dress, contest ribbon accessories, graceful pose, pokemon contest stage background, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/pokemon-oc-generated-4.webp",
    prompt:
      "1boy, spiky red hair, orange eyes, determined grin, gym leader outfit, fire-type themed clothing, gym badge on jacket, confident stance, single character, upper body, looking at viewer, anime style, simple background",
  },
];

export default {
  style: "pokemon",
  resultBackground: examples[0].image,

  hero: {
    title: "Pokemon OC Maker",
    description:
      "Generate your own Pokemon character OC with AI. Create trainers, gym leaders, team members, and coordinators in the iconic Pokemon universe style.",
  },

  howToUse: {
    title: "How to Make Pokemon OC",
    description:
      "Creating your Pokemon trainer is an exciting journey. Follow these steps to design your perfect character for exploring the Pokemon world.",
    steps: [
      {
        title: "Choose Your Trainer Type",
        description:
          "Decide what kind of Pokemon character you want to create: Pokemon Trainer, Gym Leader, Elite Four member, Team Rocket agent, Pokemon Coordinator, or Pokemon Breeder. Each role has distinct visual characteristics and outfit styles.",
      },
      {
        title: "Design Appearance and Pokemon Team",
        description:
          "Describe your character's appearance, clothing style, and favorite Pokemon types. Include details like preferred Pokemon partners, specialty badges, contest ribbons, or team affiliations to make your trainer more authentic.",
      },
      {
        title: "Generate Your Pokemon Character",
        description:
          "Click 'Generate Character' to bring your Pokemon OC to life. Choose from multiple AI-generated designs that capture the classic Pokemon anime art style and adventure spirit.",
      },
    ],
  },

  example: {
    title: "Pokemon Trainer Examples",
    description:
      "Discover amazing Pokemon characters created with text prompts using the Pokemon OC Maker.",
    examples,
  },

  features: {
    title: "What is Pokemon OC Maker?",
    description:
      "Pokemon OC Maker is designed specifically for the Pokemon universe. Create authentic characters with distinct trainer classes, regional styles, and Pokemon partnership themes.",
    features: [
      {
        label: "Authentic Pokemon Art Style",
        description:
          "Generate characters that perfectly match Pokemon's beloved anime aesthetic, from character proportions to iconic trainer outfits and Pokemon world elements.",
      },
      {
        label: "Diverse Trainer Classes",
        description:
          "Our AI understands various trainer roles - from gym leaders and elite four members to coordinators and team members - ensuring accurate role-specific designs.",
      },
      {
        label: "Instant Character Creation",
        description:
          "Create stunning Pokemon-style trainers in seconds, allowing you to focus on developing their teams, backstories, and adventures in the Pokemon world.",
      },
      {
        label: "High-Quality Anime Artwork",
        description:
          "Powered by AI trained on Pokemon's visual standards, delivering character art that matches the franchise's iconic anime style and quality.",
      },
      {
        label: "Multiple Design Options",
        description:
          "Generate several character interpretations per prompt, exploring different outfits, poses, and trainer specializations to find your perfect Pokemon OC.",
      },
      {
        label: "Pokemon World Integration",
        description:
          "Create characters that naturally fit into Pokemon's rich universe, with authentic regional influences, trainer gear, and Pokemon partnership themes.",
      },
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    description: "Have another question? Contact us at",
    contactEmail: "support@ocmaker.app",
    faqs: [
      {
        question: "What is Pokemon OC Maker and how does it work?",
        answer:
          "Pokemon OC Maker is an AI tool specialized for creating original Pokemon characters. Describe your trainer's appearance, role, and Pokemon specialties, and our AI generates authentic Pokemon-style artwork.",
      },
      {
        question: "How can I create better characters with Pokemon OC Maker?",
        answer:
          "Include specific Pokemon elements like trainer class (Gym Leader, Elite Four, etc.), favorite Pokemon types, regional origins, contest achievements, or team affiliations. The more Pokemon-specific details you include, the better the results.",
      },
      {
        question: "Is Pokemon OC Maker free to use?",
        answer:
          "Yes, Pokemon OC Maker offers free character generation with core features. Premium plans provide faster generation, more trainer class options, and advanced customization tools.",
      },
      {
        question: "What makes Pokemon OC Maker's results so authentic?",
        answer:
          "Our AI is specifically trained on Pokemon's art style and world-building, understanding trainer archetypes, regional aesthetics, and the franchise's distinctive character design principles.",
      },
      {
        question:
          "Can I use characters created with Pokemon OC Maker commercially?",
        answer:
          "Yes, all original characters you create are yours to use for personal and commercial projects. We don't claim ownership of your trainer designs or Pokemon OCs.",
      },
      {
        question: "Do I need an account to use Pokemon OC Maker?",
        answer:
          "No account required for basic use. Creating an account allows you to save trainers, access generation history, and unlock premium Pokemon-themed features.",
      },
      {
        question: "Can I create different types of Pokemon trainers?",
        answer:
          "Absolutely! Create any trainer type including Gym Leaders, Elite Four members, Pokemon Coordinators, Team Rocket agents, Pokemon Breeders, Professors, and regular Pokemon Trainers.",
      },
      {
        question: "Will you add more anime franchise OC Makers?",
        answer:
          "Yes! We're expanding to include other beloved anime universes and gaming franchises. Follow our updates for new themed OC Makers inspired by popular series.",
      },
    ],
  },

  cta: {
    title: "Start Your Pokemon Journey",
    description:
      "Design your ultimate Pokemon trainer — no artistic skills required. Just imagine, describe, and explore the wonderful world of Pokemon.",
    primaryButtonText: "Start Creating",
    primaryButtonLink: "#workbench",
    secondaryButtonText: "Explore Characters",
    secondaryButtonLink: "/oc-arts",
  },
};
