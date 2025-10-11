const examples = [
  {
    image: "https://cdn.ocmaker.app/example/jojo-oc-generated-1.webp",
    prompt:
      "1boy, purple hair with golden highlights, green eyes, dramatic pose, colorful stand user outfit, elaborate accessories, stand manifestation behind, menacing aura, jojo bizarre art style, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/jojo-oc-generated-2.webp",
    prompt:
      "1girl, rainbow hair gradient, heterochromatic eyes, cowboy hat, stone ocean prison uniform, weather manipulation stand, dramatic lighting effects, jojo part 6 style, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/jojo-oc-generated-3.webp",
    prompt:
      "1boy, dark skin with white hair, golden eyes, gangster outfit, stand user, mysterious smile, arrow-shaped accessories, baroque patterns, jojo part 5 style, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/jojo-oc-generated-4.webp",
    prompt:
      "1girl, pink hair in pompadour style, yellow eyes, delinquent school uniform, stand ability visualization, fierce expression, colorful geometric patterns, jojo part 4 style, single character, upper body, looking at viewer, anime style, simple background",
  },
];

export default {
  style: "jojo",
  resultBackground: examples[0].image,
  hero: {
    title: "JOJO OC Maker",
    description:
      "Generate your own JOJO's Bizarre Adventure OC with AI. Create unique Stand users with bizarre abilities and flamboyant fashion for any JoJo part.",
  },
  howToUse: {
    title: "How to Make JOJO OC",
    description:
      "Creating a JOJO character with OC Maker is a bizarre adventure. Follow these steps to design your own Stand user with unique abilities.",
    steps: [
      {
        title: "Describe Your Stand User",
        description:
          "Fill in the form with your character's appearance and personality. For authentic results, include JOJO-specific elements like flamboyant fashion, dramatic poses, unique hairstyles, and colorful accessories.",
      },
      {
        title: "Design Your Stand Ability",
        description:
          "Create your character's Stand with a unique name, appearance, and bizarre ability. Include Stand stats, special powers, and any limitations. The more creative and unexpected, the more JOJO-like it becomes.",
      },
      {
        title: "Generate and Strike a Pose",
        description:
          "Click 'Generate Character' to create your JOJO OC. You'll receive multiple AI-generated designs — choose your favorite and get ready for a bizarre adventure!",
      },
    ],
  },
  example: {
    title: "JOJO Character Examples",
    description:
      "Explore JOJO characters created from text prompts using the JOJO OC Maker.",
    examples,
  },
  features: {
    title: "What is JOJO OC Maker?",
    description:
      "JOJO OC Maker is a specialized version of OC Maker designed for JoJo's Bizarre Adventure. Describe your Stand user and instantly transform them into Araki-style bizarre artwork.",
    features: [
      {
        label: "Authentic Araki Art Style",
        description:
          "Create characters that capture Hirohiko Araki's distinctive art style, from dramatic poses to flamboyant fashion, designed to fit into any JoJo part.",
      },
      {
        label: "Stand System Integration",
        description:
          "Prompts are optimized for Stand abilities and manifestations — from humanoid Stands to automatic types — helping you create believable and bizarre powers.",
      },
      {
        label: "Instant Bizarre Creation",
        description:
          "Generate high-quality JOJO characters in seconds, perfect for capturing the series' unique aesthetic and over-the-top style.",
      },
      {
        label: "Detailed Character Artwork",
        description:
          "Our AI produces intricate character designs with elaborate clothing, accessories, and Stand visualizations that match JOJO's iconic visual flair.",
      },
      {
        label: "Multiple Pose Variations",
        description:
          "Generate several character designs per prompt, allowing you to explore different dramatic poses and select your most bizarre creation.",
      },
      {
        label: "Complete Stand User Profile",
        description:
          "Create comprehensive characters including Stand abilities, backstories, and fashion choices that embody the bizarre spirit of JoJo's adventure.",
      },
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    description: "Have another question? Contact us at",
    contactEmail: "support@ocmaker.app",
    faqs: [
      {
        question: "What is JOJO OC Maker and how does it work?",
        answer:
          "JOJO OC Maker is an AI tool specialized for creating JoJo's Bizarre Adventure characters. Describe your Stand user's appearance and abilities, and our AI generates artwork in Araki's distinctive style.",
      },
      {
        question:
          "How can I create more bizarre and authentic JOJO characters?",
        answer:
          "Include specific JOJO elements like Stand names (often music references), bizarre fashion choices, dramatic poses, and unique abilities with creative limitations. The more outlandish and creative, the better!",
      },
      {
        question: "Is JOJO OC Maker free to use?",
        answer:
          "Yes, JOJO OC Maker offers free character generation with basic features. Premium plans provide faster generation, more options, and additional customization features.",
      },
      {
        question: "What makes the Stand abilities look authentic?",
        answer:
          "Our AI understands JOJO's power system conventions, from Stand stats to ability types, helping create powers that feel both bizarre and balanced within the series' logic.",
      },
      {
        question: "Can I use my JOJO OC for fan projects?",
        answer:
          "Absolutely! Characters created with JOJO OC Maker are yours to use in fan fiction, artwork, roleplay, or any creative bizarre adventure you can imagine.",
      },
      {
        question: "Do I need to register to create characters?",
        answer:
          "No account required for basic use. However, creating an account lets you save your Stand users, track generation history, and access premium bizarre features.",
      },
      {
        question: "Can I create characters from different JOJO parts?",
        answer:
          "Yes! Create characters that fit any JoJo part, from Phantom Blood's Victorian setting to Stone Ocean's modern prison, each with era-appropriate styling.",
      },
      {
        question: "Will there be more anime OC makers like this bizarre one?",
        answer:
          "Yes! We're continuously expanding our anime OC maker collection. Check ocmaker.app regularly for new additions to our growing bizarre library.",
      },
    ],
  },
  cta: {
    title: "Create Your Own Stand User",
    description:
      "Design your original JOJO character with a bizarre Stand — no drawing skills needed. Just describe, generate, and embrace the bizarre!",
    primaryButtonText: "Start Creating",
    primaryButtonLink: "#workbench",
    secondaryButtonText: "Explore Characters",
    secondaryButtonLink: "/oc-arts",
  },
};
