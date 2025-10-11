const examples = [
  {
    image: "https://cdn.ocmaker.app/example/uma-musume-oc-generated-1.webp",
    prompt:
      "1girl, long brown hair with horse ears, golden eyes, uma musume racing uniform, determined expression, racing number bib, starting position pose, competitive spirit, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/uma-musume-oc-generated-2.webp",
    prompt:
      "1girl, twin-tail silver hair, blue eyes with star pupils, horse ears and tail, uma musume school uniform, cheerful smile, victory pose, racing trophy, sparkle effects, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/uma-musume-oc-generated-3.webp",
    prompt:
      "1girl, long black hair in ponytail, red eyes, thoroughbred horse ears, elegant racing silks, serious expression, jockey gear, speed lines effect, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/uma-musume-oc-generated-4.webp",
    prompt:
      "1girl, short pink hair with side braid, green eyes, adorable horse ears, uma musume casual outfit, energetic pose, training gear, sweat effects, determination aura, single character, upper body, looking at viewer, anime style, simple background",
  },
];

export default {
  style: "uma-musume",
  resultBackground: examples[0].image,
  hero: {
    title: "Uma Musume OC Maker",
    description:
      "Generate your own Uma Musume OC with AI. Create unique horse girl characters with racing abilities, idol performances, and competitive spirit.",
  },
  howToUse: {
    title: "How to Make Uma Musume OC",
    description:
      "Creating an Uma Musume character with OC Maker is as exciting as a race. Follow these steps to design your own horse girl champion.",
    steps: [
      {
        title: "Describe Your Horse Girl",
        description:
          "Fill in the form with your character's appearance and personality. For authentic results, include Uma Musume-specific features like horse ears and tail, racing uniforms, school outfits, or idol costumes.",
      },
      {
        title: "Add Racing and Performance Details",
        description:
          "Include details about your character's racing specialty (sprinter, miler, stayer), personality traits, special skills, and whether they excel in racing, idol activities, or both. The more specific to Uma Musume's world, the better.",
      },
      {
        title: "Generate and Cross the Finish Line",
        description:
          "Click 'Generate Character' to create your Uma Musume OC. You'll receive multiple AI-generated designs — choose your favorite to complete your champion horse girl!",
      },
    ],
  },
  example: {
    title: "Uma Musume Character Examples",
    description:
      "Explore Uma Musume characters created from text prompts using the Uma Musume OC Maker.",
    examples,
  },
  features: {
    title: "What is Uma Musume OC Maker?",
    description:
      "Uma Musume OC Maker is a specialized version of OC Maker designed for the Uma Musume universe. Describe your horse girl and instantly transform her into authentic anime-style racing champion artwork.",
    features: [
      {
        label: "Authentic Uma Musume Design",
        description:
          "Create characters that perfectly capture the distinctive Uma Musume art style, from horse ears and tails to racing uniforms, designed to fit seamlessly into the horse racing world.",
      },
      {
        label: "Racing and Idol Integration",
        description:
          "Prompts are optimized for both racing and idol elements — from competitive gear to performance costumes — helping you create well-rounded Uma Musume characters.",
      },
      {
        label: "Fast Character Creation",
        description:
          "Generate high-quality Uma Musume characters in seconds, perfect for capturing the energy and spirit of competitive horse racing and idol performances.",
      },
      {
        label: "Detailed Horse Girl Artwork",
        description:
          "Our AI produces intricate character designs with authentic Uma Musume features, racing gear, and the distinctive charm of the series' art style.",
      },
      {
        label: "Multiple Design Options",
        description:
          "Generate several character variations per prompt, allowing you to explore different racing specialties and select your champion design.",
      },
      {
        label: "Complete Racing Profile",
        description:
          "Create comprehensive characters including racing abilities, personality traits, and backstories that embody the competitive spirit of Uma Musume.",
      },
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    description: "Have another question? Contact us at",
    contactEmail: "support@ocmaker.app",
    faqs: [
      {
        question: "What is Uma Musume OC Maker and how does it work?",
        answer:
          "Uma Musume OC Maker is an AI tool specialized for creating Uma Musume Pretty Derby characters. Describe your horse girl's appearance and abilities, and our AI generates artwork in the series' distinctive style.",
      },
      {
        question: "How can I create better Uma Musume characters?",
        answer:
          "Include specific Uma Musume elements like racing distance preferences, training routines, idol performance skills, and personality traits. Also mention horse breeds, racing strategies, and special abilities for more authentic results.",
      },
      {
        question: "Is Uma Musume OC Maker free to use?",
        answer:
          "Yes, Uma Musume OC Maker offers free character generation with basic features. Premium plans provide faster generation, more customization options, and additional features.",
      },
      {
        question: "What makes the horse girl designs look authentic?",
        answer:
          "Our AI understands Uma Musume's unique blend of horse features and human characteristics, creating characters that maintain the series' distinctive art style and racing theme.",
      },
      {
        question: "Can I use my Uma Musume OC for fan projects?",
        answer:
          "Absolutely! Characters created with Uma Musume OC Maker are yours to use in fan fiction, artwork, roleplay, or any creative project you have in mind.",
      },
      {
        question: "Do I need an account to create characters?",
        answer:
          "No registration required for basic use. However, creating an account allows you to save your horse girls, track generation history, and access premium features.",
      },
      {
        question: "Can I create different types of Uma Musume characters?",
        answer:
          "Yes! Create sprinters, milers, stayers, or long-distance runners. You can also focus on racing champions, idol performers, or characters who excel in both areas.",
      },
      {
        question: "Will there be more game-based OC makers like this?",
        answer:
          "Yes! We're continuously expanding our collection of game-specific OC makers. Check ocmaker.app regularly for new additions to our gaming library.",
      },
    ],
  },
  cta: {
    title: "Create Your Own Uma Musume",
    description:
      "Design your original Uma Musume racing champion — no drawing skills needed. Just describe, generate, and race to victory!",
    primaryButtonText: "Start Creating",
    primaryButtonLink: "#workbench",
    secondaryButtonText: "Explore Characters",
    secondaryButtonLink: "/oc-arts",
  },
};
