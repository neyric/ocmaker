const examples = [
  {
    image: "https://cdn.ocmaker.app/example/lol-oc-generated-1.webp",
    prompt:
      "1boy, bright orange hair, navy eyes, enthusiastic grin, League of Legends explorer outfit, compass, adventurous pose, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
  {
    image: "https://cdn.ocmaker.app/example/lol-oc-generated-2.webp",
    prompt:
      "1man, short black hair, red eyes, fierce expression, heavy armor, massive battle axe, imposing stance, muscular build, single character, upper body, looking down, anime style, dark background, dramatic lighting",
  },
  {
    image: "https://cdn.ocmaker.app/example/lol-oc-generated-3.webp",
    prompt:
      "1girl, blonde hair, blue eyes, cheerful expression, silver and blue mage armor, glowing staff, light magic, radiant aura, dynamic pose, single character, upper body, looking at viewer, anime style, magical background, sparkles",
  },
  {
    image: "https://cdn.ocmaker.app/example/lol-oc-generated-4.webp",
    prompt:
      "1man, brown hair, ponytail, sharp eyes, serious expression, blue samurai armor, katana on back, wind motif, loose scarf, single character, upper body, looking to the side, anime style, dramatic lighting, simple background",
  },
];

export default {
  style: "league-of-legends",
  resultBackground: examples[0].image,
  hero: {
    title: "League of Legends OC Maker",
    description:
      "Create your own League of Legends champion OC with AI. Design unique abilities, champion roles, and legendary backstories in the world of Runeterra.",
  },
  howToUse: {
    title: "How to Make League of Legends OC",
    description:
      "Creating your League champion is straightforward. Follow these steps to design your perfect champion for the Rift.",
    steps: [
      {
        title: "Choose Your Champion Role",
        description:
          "Start by defining your champion's role: mage, assassin, marksman, tank, support, or fighter. Consider their position on the Rift and playstyle that fits your vision.",
      },
      {
        title: "Design Abilities and Appearance",
        description:
          "Describe your champion's unique abilities, weapon choice, and visual design. Think about their region of origin in Runeterra and how it influences their powers and aesthetics.",
      },
      {
        title: "Generate Your Champion",
        description:
          "Click 'Generate Character' to bring your League champion to life. Select from multiple AI-generated designs to perfect your champion's appearance and style.",
      },
    ],
  },
  example: {
    title: "League of Legends Examples",
    description:
      "Explore diverse champion designs created with text prompts using the League of Legends OC Maker.",
    examples,
  },
  features: {
    title: "What is League of Legends OC Maker?",
    description:
      "League of Legends OC Maker is tailored specifically for Runeterra's universe. Create authentic champions with distinct roles, abilities, and regional aesthetics.",
    features: [
      {
        label: "Authentic Champion Design",
        description:
          "Generate characters that capture League's distinctive art style, from magical abilities to champion-specific equipment and regional influences.",
      },
      {
        label: "Role-Based Character Creation",
        description:
          "Our AI understands the five champion roles and their visual distinctions, ensuring your character fits perfectly into League's gameplay framework.",
      },
      {
        label: "Instant Champion Generation",
        description:
          "Create professional-quality champion designs in seconds, allowing you to focus on developing abilities, lore, and strategic gameplay concepts.",
      },
      {
        label: "High-Quality Game Art",
        description:
          "Powered by AI trained on League's visual standards, delivering champion art that matches the game's iconic style and quality expectations.",
      },
      {
        label: "Multiple Design Options",
        description:
          "Generate various champion interpretations per prompt, exploring different visual approaches, equipment choices, and ability representations.",
      },
      {
        label: "Runeterra Lore Integration",
        description:
          "Create champions that seamlessly fit into League's rich world, with authentic regional influences, magical systems, and cultural aesthetics.",
      },
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    description: "Have another question? Contact us at",
    contactEmail: "support@ocmaker.app",
    faqs: [
      {
        question: "What is League of Legends OC Maker and how does it work?",
        answer:
          "League of Legends OC Maker is an AI tool specialized for creating original League champions. Describe your champion's role, abilities, and appearance, and our AI generates authentic League-style artwork.",
      },
      {
        question:
          "How can I create better champions with League of Legends OC Maker?",
        answer:
          "Include specific role details (mage, ADC, support, etc.), regional origins (Demacia, Noxus, Ionia), and ability types. The more League-specific details you provide, the more authentic your champion will look.",
      },
      {
        question: "Is League of Legends OC Maker free to use?",
        answer:
          "Yes, League of Legends OC Maker offers free champion generation with essential features. Premium plans provide faster generation, more variations, and advanced customization options.",
      },
      {
        question:
          "What makes League of Legends OC Maker's results so accurate?",
        answer:
          "Our AI is specifically trained on League's visual style, understanding champion design principles, role distinctions, and Runeterra's aesthetic conventions.",
      },
      {
        question:
          "Can I use champions created with League of Legends OC Maker commercially?",
        answer:
          "Yes, all original champions you create are yours to use for personal and commercial projects. We don't claim ownership of your character designs.",
      },
      {
        question: "Do I need an account to use League of Legends OC Maker?",
        answer:
          "No account required for basic use. Creating an account allows you to save champions, track generation history, and access premium features.",
      },
      {
        question: "Can I regenerate or modify my League champion designs?",
        answer:
          "Absolutely! You can regenerate with the same prompt for variations or adjust your description to refine your champion until it perfectly matches your gameplay vision.",
      },
      {
        question: "Will you add more MOBA-style OC Makers?",
        answer:
          "Yes! We're expanding to include other MOBA and gaming universes. Stay updated on new themed OC Makers through our announcements.",
      },
    ],
  },
  cta: {
    title: "Create Your League Champion",
    description:
      "Design the ultimate League of Legends champion — no artistic experience needed. Just envision, describe, and generate your champion.",
    primaryButtonText: "Start Creating",
    primaryButtonLink: "#workbench",
    secondaryButtonText: "Explore Champions",
    secondaryButtonLink: "/oc-arts",
  },
};
