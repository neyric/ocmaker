const examples = [
  {
    image: "https://cdn.ocmaker.app/example/sonic-oc-generated-1.webp",
    prompt:
      "1girl, silver hair, yellow eyes, spiky hair, fox ears, electric aura, futuristic bodysuit, confident expression, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
  {
    image: "https://cdn.ocmaker.app/example/sonic-oc-generated-2.webp",
    prompt:
      "1boy, cobalt blue hair, red eyes, upward spiky hair, hedgehog ears, speed goggles, tight racing suit, energetic smile, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
  {
    image: "https://cdn.ocmaker.app/example/sonic-oc-generated-3.webp",
    prompt:
      "1girl, hot pink hair, green eyes, messy ponytail, cat ears, graffiti hoodie, rebellious expression, claw gloves, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
  {
    image: "https://cdn.ocmaker.app/example/sonic-oc-generated-4.webp",
    prompt:
      "1boy, red hair, blue eyes, confident smirk, Sonic the Hedgehog style racing suit, helmet, high-speed pose, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
];

export default {
  style: "sonic",
  resultBackground: examples[0].image,
  hero: {
    title: "Sonic OC Maker",
    description:
      "Create your own Sonic character OC with AI. Design speedsters, unique abilities, and colorful adventures in the fast-paced world of Sonic the Hedgehog.",
  },
  howToUse: {
    title: "How to Make Sonic OC",
    description:
      "Creating your Sonic character is fast and fun. Follow these steps to design your perfect speedster for the Sonic universe.",
    steps: [
      {
        title: "Choose Your Animal and Style",
        description:
          "Start by selecting your character's animal type and color scheme. Classic Sonic characters are vibrant and distinctive, with unique species traits and personality-matching colors.",
      },
      {
        title: "Design Powers and Personality",
        description:
          "Describe your character's special abilities, speed type, and personality traits. Consider their role in adventures and how they interact with the Sonic universe.",
      },
      {
        title: "Generate Your Speedster",
        description:
          "Click 'Generate Character' to bring your Sonic OC to life. Choose from multiple AI-generated designs that capture Sonic's signature cartoon style.",
      },
    ],
  },
  example: {
    title: "Sonic Examples",
    description:
      "Explore amazing speedsters created with text prompts using the Sonic OC Maker.",
    examples,
  },
  features: {
    title: "What is Sonic OC Maker?",
    description:
      "Sonic OC Maker is designed specifically for the Sonic universe. Create authentic characters with unique abilities, animal traits, and the classic Sonic cartoon aesthetic.",
    features: [
      {
        label: "Authentic Sonic Art Style",
        description:
          "Generate characters that perfectly match Sonic's distinctive cartoon aesthetic, from character proportions to vibrant colors and dynamic expressions.",
      },
      {
        label: "Animal Character Specialization",
        description:
          "Our AI understands Sonic's diverse animal cast, creating authentic anthropomorphic characters with species-specific traits and characteristics.",
      },
      {
        label: "Lightning-Fast Generation",
        description:
          "Create colorful Sonic characters in seconds, letting you focus on developing their backstories, abilities, and place in the Sonic world.",
      },
      {
        label: "High-Quality Cartoon Art",
        description:
          "Powered by AI trained on Sonic's visual style, delivering character art that matches the series' vibrant, energetic cartoon aesthetic.",
      },
      {
        label: "Multiple Design Options",
        description:
          "Generate various character interpretations per prompt, exploring different color schemes, poses, and ability visualizations.",
      },
      {
        label: "Sonic Universe Integration",
        description:
          "Create characters that naturally fit into Sonic's world, with authentic speed abilities, adventure themes, and friendship-focused storylines.",
      },
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    description: "Have another question? Contact us at",
    contactEmail: "support@ocmaker.app",
    faqs: [
      {
        question: "What is Sonic OC Maker and how does it work?",
        answer:
          "Sonic OC Maker is an AI tool specialized for creating original Sonic characters. Describe your character's animal type, abilities, and appearance, and our AI generates authentic Sonic-style artwork.",
      },
      {
        question: "How can I create better characters with Sonic OC Maker?",
        answer:
          "Include specific Sonic elements like animal species, speed abilities, color schemes, and personality traits. The more Sonic-universe details you provide, the more authentic your character will look.",
      },
      {
        question: "Is Sonic OC Maker free to use?",
        answer:
          "Yes, Sonic OC Maker offers free character generation with core features. Premium plans provide faster generation, more customization options, and additional design variations.",
      },
      {
        question: "What makes Sonic OC Maker's results so authentic?",
        answer:
          "Our AI is specifically trained on Sonic's cartoon art style, understanding character design principles, color palettes, and the series' distinctive anthropomorphic aesthetic.",
      },
      {
        question:
          "Can I use characters created with Sonic OC Maker commercially?",
        answer:
          "Yes, all original characters you create are yours to use for personal and commercial projects. We don't claim ownership of your character designs.",
      },
      {
        question: "Do I need an account to use Sonic OC Maker?",
        answer:
          "No account required for basic use. Creating an account allows you to save characters, access generation history, and unlock premium features.",
      },
      {
        question: "Can I regenerate or modify my Sonic character designs?",
        answer:
          "Absolutely! You can regenerate with the same prompt for variations or adjust your description to perfect your character's appearance and abilities.",
      },
      {
        question: "Will you add more cartoon-style OC Makers?",
        answer:
          "Yes! We're expanding to include other popular cartoon and game universes. Stay updated on new animated-style OC Makers.",
      },
    ],
  },
  cta: {
    title: "Create Your Sonic Speedster",
    description:
      "Design your ultimate Sonic character — no artistic skills needed. Just imagine, describe, and race into the world of Sonic.",
    primaryButtonText: "Start Creating",
    primaryButtonLink: "#workbench",
    secondaryButtonText: "Explore Characters",
    secondaryButtonLink: "/oc-arts",
  },
};
