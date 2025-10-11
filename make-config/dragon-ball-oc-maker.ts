const examples = [
  {
    image: "https://cdn.ocmaker.app/example/dragon-ball-oc-generated-1.webp",
    prompt:
      "1boy, spiky red hair, brown eyes, confident grin, Dragon Ball style fighter clothing, power level scouter, heroic stance, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
  {
    image: "https://cdn.ocmaker.app/example/dragon-ball-oc-generated-2.webp",
    prompt:
      "1boy, silver hair, blue eyes, mischievous look, Dragon Ball style training gear, weighted clothing, fighting stance, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
  {
    image: "https://cdn.ocmaker.app/example/dragon-ball-oc-generated-3.webp",
    prompt:
      "1boy, blonde hair, orange eyes, joyful smile, Dragon Ball style gi, dragon emblem, relaxed pose, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
  {
    image: "https://cdn.ocmaker.app/example/dragon-ball-oc-generated-4.webp",
    prompt:
      "1girl, purple hair, yellow eyes, playful smile, Dragon Ball style casual outfit, energy blast, energetic pose, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
];

export default {
  style: "dragon-ball",
  resultBackground: examples[0].image,
  hero: {
    title: "Dragon Ball OC Maker",
    description:
      "Create your own Dragon Ball warrior OC with AI. Design powerful fighters, epic transformations, and legendary techniques in the world of Dragon Ball.",
  },
  howToUse: {
    title: "How to Make Dragon Ball OC",
    description:
      "Creating your Dragon Ball fighter is straightforward. Follow these steps to design your ultimate warrior for the Dragon Ball universe.",
    steps: [
      {
        title: "Choose Your Fighter Type",
        description:
          "Start by deciding your character's race and fighting style: Saiyan, Human, Namekian, Android, or other alien races. Consider their unique abilities and transformation potential.",
      },
      {
        title: "Design Powers and Appearance",
        description:
          "Describe your fighter's signature techniques, ki abilities, and physical appearance. Include details about their training background and martial arts style.",
      },
      {
        title: "Generate Your Warrior",
        description:
          "Click 'Generate Character' to bring your Dragon Ball fighter to life. Choose from multiple AI-generated designs that capture the iconic Dragon Ball art style.",
      },
    ],
  },
  example: {
    title: "Dragon Ball Examples",
    description:
      "Explore powerful warriors created with text prompts using the Dragon Ball OC Maker.",
    examples,
  },
  features: {
    title: "What is Dragon Ball OC Maker?",
    description:
      "Dragon Ball OC Maker is designed specifically for the Dragon Ball universe. Create authentic fighters with signature techniques, transformations, and martial arts mastery.",
    features: [
      {
        label: "Authentic Dragon Ball Art Style",
        description:
          "Generate characters that perfectly capture Dragon Ball's iconic manga and anime aesthetic, from muscular physiques to dynamic fighting poses.",
      },
      {
        label: "Transformation System Focus",
        description:
          "Our AI understands Dragon Ball's transformation mechanics, from Super Saiyan forms to unique power-ups, ensuring authentic power progression visuals.",
      },
      {
        label: "Instant Fighter Creation",
        description:
          "Create professional-quality Dragon Ball characters in seconds, allowing you to focus on developing their techniques, backstories, and power levels.",
      },
      {
        label: "Battle-Ready Artwork",
        description:
          "Powered by AI trained on Dragon Ball's visual standards, delivering character art perfect for martial arts scenarios and epic battles.",
      },
      {
        label: "Multiple Power States",
        description:
          "Generate various forms and power levels for your character, exploring different transformations, auras, and fighting stances.",
      },
      {
        label: "Universe Integration",
        description:
          "Create fighters that seamlessly fit into Dragon Ball's rich mythology, with authentic martial arts backgrounds, alien origins, and power scaling.",
      },
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    description: "Have another question? Contact us at",
    contactEmail: "support@ocmaker.app",
    faqs: [
      {
        question: "What is Dragon Ball OC Maker and how does it work?",
        answer:
          "Dragon Ball OC Maker is an AI tool specialized for creating original Dragon Ball fighters. Describe your character's race, fighting style, and powers, and our AI generates authentic Dragon Ball-style artwork.",
      },
      {
        question: "How can I create better fighters with Dragon Ball OC Maker?",
        answer:
          "Include specific Dragon Ball elements like ki techniques, transformation states, martial arts training, and race characteristics. The more detailed your fighter's abilities and background, the better the results.",
      },
      {
        question: "Is Dragon Ball OC Maker free to use?",
        answer:
          "Yes, Dragon Ball OC Maker offers free character generation with essential features. Premium plans provide faster generation, more transformation options, and advanced customization.",
      },
      {
        question: "What makes Dragon Ball OC Maker's results so authentic?",
        answer:
          "Our AI is specifically trained on Dragon Ball's distinctive art style, understanding character proportions, energy effects, and the series' unique martial arts aesthetic.",
      },
      {
        question:
          "Can I use fighters created with Dragon Ball OC Maker commercially?",
        answer:
          "Yes, all original fighters you create are yours to use for personal and commercial projects. We don't claim ownership of your character designs.",
      },
      {
        question: "Do I need an account to use Dragon Ball OC Maker?",
        answer:
          "No account required for basic use. Creating an account allows you to save fighters, access generation history, and unlock premium transformation features.",
      },
      {
        question:
          "Can I regenerate or modify my Dragon Ball character designs?",
        answer:
          "Absolutely! You can regenerate with the same prompt for variations or adjust your description to perfect your fighter's appearance and power level.",
      },
      {
        question: "Will you add more battle manga OC Makers?",
        answer:
          "Yes! We're expanding to include other popular battle manga and anime universes. Stay tuned for new fighting-focused OC Makers.",
      },
    ],
  },
  cta: {
    title: "Create Your Dragon Ball Fighter",
    description:
      "Design the ultimate Dragon Ball warrior — no artistic skills required. Just envision, describe, and unleash your fighter's power.",
    primaryButtonText: "Start Creating",
    primaryButtonLink: "#workbench",
    secondaryButtonText: "Explore Fighters",
    secondaryButtonLink: "/oc-arts",
  },
};
