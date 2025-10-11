const examples = [
  {
    image: "https://cdn.ocmaker.app/example/mha-oc-generateds-1.webp",
    prompt:
      "1girl, green hair with yellow streaks, emerald eyes, UA high school uniform, hero costume with nature theme, confident smile, My Hero Academia style, looking at viewer, simple background, upper body",
  },
  {
    image: "https://cdn.ocmaker.app/example/mha-oc-generateds-2.webp",
    prompt:
      "1boy, spiky red hair, orange eyes, hero costume with fire elements, determined expression, My Hero Academia style, hero pose, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/mha-oc-generateds-3.webp",
    prompt:
      "1girl, silver hair in twin buns, purple eyes, high-tech hero suit, support gear, excited expression, My Hero Academia style, inventor pose, looking at viewer, simple background, upper body",
  },
  {
    image: "https://cdn.ocmaker.app/example/mha-oc-generateds-4.webp",
    prompt:
      "1boy, black hair with blue highlights, steel gray eyes, hero costume with metal accents, serious expression, defensive stance, My Hero Academia style, looking at viewer, anime style, simple background, upper body",
  },
];

export default {
  style: "my-hero-academia",
  resultBackground: examples[0].image,
  hero: {
    title: "My Hero Academia OC Maker",
    description:
      "Create your own My Hero Academia OC with AI. Design unique quirks, hero costumes, and epic adventures in a world where superpowers are the norm.",
  },
  howToUse: {
    title: "How to Make My Hero Academia OC",
    description:
      "Creating your hero character is as exciting as discovering your quirk. Follow these steps to design your ultimate hero or villain.",
    steps: [
      {
        title: "Design Your Unique Quirk",
        description:
          "Choose your character's superpower - from elemental abilities to transformation quirks. Consider how their quirk affects their appearance, personality, and fighting style.",
      },
      {
        title: "Create Hero Costume and Identity",
        description:
          "Design your character's hero costume, school uniform, or villain outfit. Include support items, color schemes, and design elements that complement their quirk abilities.",
      },
      {
        title: "Generate Your Hero Character",
        description:
          "Click 'Generate Character' to bring your My Hero Academia OC to life. Choose from multiple AI-generated designs that capture the heroic spirit of the MHA universe.",
      },
    ],
  },
  example: {
    title: "My Hero Academia Examples",
    description:
      "Discover amazing heroes and villains created with text prompts using the My Hero Academia OC Maker.",
    examples,
  },
  features: {
    title: "What is My Hero Academia OC Maker?",
    description:
      "My Hero Academia OC Maker specializes in creating characters for the world of heroes and villains. Design authentic characters with unique quirks, costumes, and heroic aspirations.",
    features: [
      {
        label: "Authentic MHA Art Style",
        description:
          "Generate characters that perfectly match My Hero Academia's distinctive anime aesthetic, from dynamic hero poses to detailed costume designs.",
      },
      {
        label: "Quirk-Based Character Design",
        description:
          "Our AI understands how quirks influence character appearance and design, ensuring your hero's powers are visually represented in their look and costume.",
      },
      {
        label: "Lightning-Fast Hero Creation",
        description:
          "Design powerful heroes and villains in seconds, letting you focus on developing their backstories, relationships, and heroic journeys.",
      },
      {
        label: "Professional Hero Artwork",
        description:
          "Powered by AI trained on MHA's visual standards, delivering character art that captures the heroic energy and detailed designs of the series.",
      },
      {
        label: "Multiple Costume Variations",
        description:
          "Generate several character interpretations per prompt, exploring different costume designs, quirk effects, and heroic expressions.",
      },
      {
        label: "Hero Society Integration",
        description:
          "Create characters that naturally fit into the My Hero Academia universe, with authentic hero licenses, school elements, and quirk society details.",
      },
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    description: "Have another question? Contact us at",
    contactEmail: "support@ocmaker.app",
    faqs: [
      {
        question: "What is My Hero Academia OC Maker and how does it work?",
        answer:
          "My Hero Academia OC Maker is an AI tool specialized for creating original hero characters. Describe your character's quirk, appearance, and costume, and our AI generates authentic MHA-style artwork.",
      },
      {
        question:
          "How can I create better characters with My Hero Academia OC Maker?",
        answer:
          "Include specific quirk details, hero costume elements, school affiliations (UA, Shiketsu, etc.), and personality traits. The more MHA-specific elements you include, the better the results.",
      },
      {
        question: "Is My Hero Academia OC Maker free to use?",
        answer:
          "Yes, My Hero Academia OC Maker offers free character generation with core features. Premium plans provide faster generation, advanced quirk effects, and more costume options.",
      },
      {
        question: "What makes My Hero Academia OC Maker's results so heroic?",
        answer:
          "Our AI is specifically trained on MHA's art style and universe, understanding character design principles, quirk visual effects, and hero society aesthetics.",
      },
      {
        question:
          "Can I use characters created with My Hero Academia OC Maker commercially?",
        answer:
          "Yes, all original characters you create are yours to use for personal and commercial projects. We don't claim ownership of your hero designs.",
      },
      {
        question: "Do I need an account to use My Hero Academia OC Maker?",
        answer:
          "No account required for basic use. Creating an account allows you to save characters, access generation history, and unlock premium hero features.",
      },
      {
        question: "Can I regenerate or modify my MHA character designs?",
        answer:
          "Absolutely! You can regenerate with the same prompt for variations or adjust your description to fine-tune your character until it perfectly matches your heroic vision.",
      },
      {
        question: "Will you add more superhero anime OC Makers?",
        answer:
          "Yes! We're expanding to include other popular superhero and action anime universes. Follow our updates for new themed OC Makers.",
      },
    ],
  },
  cta: {
    title: "Create Your Ultimate Hero",
    description:
      "Design your perfect hero or villain — no artistic skills required. Just imagine, describe, and join the ranks of professional heroes.",
    primaryButtonText: "Start Creating",
    primaryButtonLink: "#workbench",
    secondaryButtonText: "Explore Characters",
    secondaryButtonLink: "/oc-arts",
  },
};
