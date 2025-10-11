const examples = [
  {
    image: "https://cdn.ocmaker.app/example/kaguya-sama-oc-generated-1.webp",
    prompt:
      "1girl, long black hair with red ribbon, red eyes, confident smirk, shuchiin academy uniform, student council president badge, elegant pose, single character, upper body, looking at viewer, anime style, student council room background",
  },
  {
    image: "https://cdn.ocmaker.app/example/kaguya-sama-oc-generated-2.webp",
    prompt:
      "1boy, blonde hair, blue eyes, friendly smile, shuchiin academy uniform, student council treasurer badge, notebook in hand, cheerful pose, single character, upper body, looking at viewer, anime style, school hallway background",
  },
  {
    image: "https://cdn.ocmaker.app/example/kaguya-sama-oc-generated-3.webp",
    prompt:
      "1girl, short pink hair, pink eyes, energetic expression, shuchiin academy uniform with cute accessories, detective band on arm, playful wink, single character, upper body, looking at viewer, anime style, classroom background",
  },
  {
    image: "https://cdn.ocmaker.app/example/kaguya-sama-oc-generated-4.webp",
    prompt:
      "1boy, dark hair with glasses, brown eyes, serious expression, shuchiin academy uniform, student council secretary badge, tablet computer, analytical pose, single character, upper body, looking at viewer, anime style, library background",
  },
];

export default {
  style: "kaguya-sama",
  resultBackground: examples[0].image,

  hero: {
    title: "Kaguya-sama OC Maker",
    description:
      "Generate your own Kaguya-sama: Love is War character OC with AI. Create elite students, student council members, and romantic rivals in the prestigious Shuchiin Academy.",
  },

  howToUse: {
    title: "How to Make Kaguya-sama OC",
    description:
      "Join the psychological battles of love at Shuchiin Academy. Follow these steps to design your elite student character.",
    steps: [
      {
        title: "Choose Your Student Role",
        description:
          "Select your character's position at Shuchiin Academy: Student Council member, Elite family heir, Club president, or Regular student. Each role comes with different social standings, responsibilities, and romantic battle tactics.",
      },
      {
        title: "Design Personality and Strategy",
        description:
          "Describe your character's appearance, family background, and romantic warfare style. Include their intelligence level, special skills, and how they approach the complex game of love and confession battles.",
      },
      {
        title: "Generate Your Elite Student",
        description:
          "Click 'Generate Character' to bring your Kaguya-sama OC to life. Select from multiple AI-generated designs that capture the series' sophisticated school life and comedic romantic tension.",
      },
    ],
  },

  example: {
    title: "Shuchiin Academy Examples",
    description:
      "Explore brilliant elite students created with text prompts using the Kaguya-sama OC Maker.",
    examples,
  },

  features: {
    title: "What is Kaguya-sama OC Maker?",
    description:
      "Kaguya-sama OC Maker is designed specifically for the elite academic world of Shuchiin. Create authentic characters with sophisticated backgrounds, romantic strategies, and intellectual battles.",
    features: [
      {
        label: "Authentic Elite School Style",
        description:
          "Generate characters that perfectly match Kaguya-sama's refined art style, from prestigious uniforms to expressive reactions and sophisticated character designs.",
      },
      {
        label: "Student Council Integration",
        description:
          "Our AI understands Shuchiin's social hierarchy, student council dynamics, and club systems, ensuring your character fits seamlessly into the elite academic environment.",
      },
      {
        label: "Instant Elite Creation",
        description:
          "Create brilliant Shuchiin students in seconds, perfect for romantic mind games, student council activities, or expanding the academy's roster of geniuses.",
      },
      {
        label: "High-Quality School Artwork",
        description:
          "Powered by AI trained on Kaguya-sama's visual standards, delivering character art that captures the series' blend of sophistication and comedic expressions.",
      },
      {
        label: "Multiple Personality Types",
        description:
          "Generate several character interpretations per prompt, exploring different intelligence types, romantic strategies, and social positions to find your perfect elite student.",
      },
      {
        label: "Shuchiin Academy Integration",
        description:
          "Create characters that naturally fit into Kaguya-sama's prestigious school setting, with authentic elite backgrounds, academic achievements, and romantic warfare tactics.",
      },
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    description: "Have another question? Contact us at",
    contactEmail: "support@ocmaker.app",
    faqs: [
      {
        question: "What is Kaguya-sama OC Maker and how does it work?",
        answer:
          "Kaguya-sama OC Maker is an AI tool specialized for creating original Shuchiin Academy students. Describe your character's appearance, background, and romantic strategy, and our AI generates authentic Kaguya-sama style artwork.",
      },
      {
        question:
          "How can I create better characters with Kaguya-sama OC Maker?",
        answer:
          "Include specific Kaguya-sama elements like student council positions, elite family backgrounds, academic specialties, club memberships, and unique romantic battle tactics. The more details about their genius traits, the better.",
      },
      {
        question: "Is Kaguya-sama OC Maker free to use?",
        answer:
          "Yes, Kaguya-sama OC Maker offers free character generation with basic features. Premium plans provide faster generation, more student roles, and advanced customization tools.",
      },
      {
        question: "What makes Kaguya-sama OC Maker's results so authentic?",
        answer:
          "Our AI is specifically trained on Kaguya-sama's art style and elite school setting, understanding the series' unique blend of sophistication, comedy, and romantic psychological warfare.",
      },
      {
        question:
          "Can I use characters created with Kaguya-sama OC Maker commercially?",
        answer:
          "Yes, all original characters you create are yours to use for personal and commercial projects. We don't claim ownership of your student designs or Kaguya-sama OCs.",
      },
      {
        question: "Do I need an account to use Kaguya-sama OC Maker?",
        answer:
          "No account required for basic use. Creating an account allows you to save characters, access generation history, and unlock premium Shuchiin Academy features.",
      },
      {
        question: "Can I create different types of Shuchiin students?",
        answer:
          "Absolutely! Create student council members, club presidents, elite heirs, scholarship students, or transfer students. Design characters with various intelligence types and romantic approaches.",
      },
      {
        question: "Are more romantic comedy anime OC makers coming?",
        answer:
          "Yes! We're expanding to include other beloved romantic comedy and school life series. Follow our updates for new themed OC makers inspired by love battles and school comedies.",
      },
    ],
  },

  cta: {
    title: "Enter the Battle of Love and Brains",
    description:
      "Design your ultimate Shuchiin Academy student — no artistic skills required. Just imagine, describe, and join the genius-level romantic warfare.",
    primaryButtonText: "Start Creating",
    primaryButtonLink: "#workbench",
    secondaryButtonText: "Explore Characters",
    secondaryButtonLink: "/oc-arts",
  },
};
