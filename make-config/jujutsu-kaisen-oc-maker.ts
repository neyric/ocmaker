const examples = [
  {
    image: "https://cdn.ocmaker.app/example/jujutsu-kaisen-oc-generated-1.webp",
    prompt:
      "1boy, messy white hair, teal eyes, playful grin, jujutsu kaisen style student uniform, skateboard, confident stance, anime style, looking at viewer, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/jujutsu-kaisen-oc-generated-2.webp",
    prompt:
      "1boy, tousled silver hair, blue-grey eyes, determined frown, jujutsu kaisen style track suit, headband, athletic pose, anime style, looking at viewer, simple background, upper body, masterpiece, best quality, very aesthetic, absurdres",
  },
  {
    image: "https://cdn.ocmaker.app/example/jujutsu-kaisen-oc-generated-3.webp",
    prompt:
      "1girl, wavy dark purple hair, pink eyes, playful wink, jujutsu kaisen style team uniform, holding snacks, casual pose, anime style, looking at viewer, simple background, upper body, masterpiece, best quality, very aesthetic, absurdres",
  },
  {
    image: "https://cdn.ocmaker.app/example/jujutsu-kaisen-oc-generated-4.webp",
    prompt:
      "girl, messy blue hair, violet eyes, cheerful expression, jujutsu kaisen style combat attire, holding teddy bear plushie, playful pose, anime style, looking at viewer, simple background, upper body, masterpiece, best quality, very aesthetic, absurdre",
  },
];

export default {
  style: "jujutsu-kaisen",
  resultBackground: examples[0].image,
  hero: {
    title: "Jujutsu Kaisen OC Maker",
    description:
      "Generate your own Jujutsu Kaisen OC with AI. Create modern sorcerer characters with cursed techniques and the distinctive supernatural style of Jujutsu Kaisen.",
  },
  howToUse: {
    title: "How to Make Jujutsu Kaisen OC",
    description:
      "Creating a Jujutsu Kaisen character is easy. Follow these steps to bring your modern sorcerer to life.",
    steps: [
      {
        title: "Describe Your Sorcerer",
        description:
          "Fill in your character's appearance and personality. Include modern elements like school uniforms, sorcerer attire, or casual clothing. Mention hair color, eye color, and features that fit Jujutsu Kaisen's clean, modern aesthetic.",
      },
      {
        title: "Add Cursed Techniques",
        description:
          "Describe your character's unique cursed technique, domain expansion, or special abilities. Include details about cursed energy manifestation, hand gestures, fighting style, and school connections.",
      },
      {
        title: "Generate Your Character",
        description:
          "Click 'Generate Character' to create your Jujutsu Kaisen OC. You'll get several designs featuring clean character art, dynamic poses, cursed energy effects, and modern supernatural elements.",
      },
    ],
  },
  example: {
    title: "Jujutsu Kaisen Examples",
    description:
      "Explore Jujutsu Kaisen characters showcasing the series' modern sorcerer aesthetic and supernatural battle elements.",
    examples,
  },
  features: {
    title: "What is Jujutsu Kaisen OC Maker?",
    description:
      "Jujutsu Kaisen OC Maker is an AI tool fine-tuned for the unique aesthetic of Jujutsu Kaisen. Create characters that capture the series' modern urban style and supernatural elements.",
    features: [
      {
        label: "Modern Sorcerer Design",
        description:
          "Create characters with Jujutsu Kaisen's distinctive style: clean designs with contemporary clothing, school uniforms, and battle attire.",
      },
      {
        label: "Cursed Energy Effects",
        description:
          "Generate characters with visible cursed energy manifestations, domain expansion backgrounds, and supernatural battle effects.",
      },
      {
        label: "Urban Aesthetic",
        description:
          "Characters designed with Jujutsu Kaisen's contemporary setting - from Tokyo Jujutsu High uniforms to modern street clothes.",
      },
      {
        label: "Clean Art Style",
        description:
          "AI models fine-tuned for Jujutsu Kaisen's distinctive art: sharp lines, expressive faces, and balanced simplicity with detail.",
      },
      {
        label: "Multiple Variations",
        description:
          "Generate multiple character options per prompt with different poses, expressions, and cursed energy effects.",
      },
      {
        label: "Battle-Ready Design",
        description:
          "Create characters ready for supernatural combat with dynamic poses, sorcerer uniforms, and cursed technique hand gestures.",
      },
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    description: "Have another question? Contact us at",
    contactEmail: "support@ocmaker.app",
    faqs: [
      {
        question: "What is Jujutsu Kaisen OC Maker and how does it work?",
        answer:
          "Jujutsu Kaisen OC Maker is an AI tool fine-tuned for the Jujutsu Kaisen universe. Simply describe your character's appearance and cursed techniques, and our AI will generate authentic Jujutsu Kaisen-style visuals in seconds.",
      },
      {
        question: "How can I create better characters?",
        answer:
          "Include specific Jujutsu Kaisen elements: cursed techniques, domain expansions, sorcerer uniforms, or school affiliations. Describe modern clothing styles, hair colors, and supernatural abilities for more authentic results.",
      },
      {
        question: "Is Jujutsu Kaisen OC Maker free to use?",
        answer:
          "Yes, basic character generation is free. For faster results, premium options, and additional control over cursed energy effects, you can upgrade your plan anytime.",
      },
      {
        question: "What makes the results so impressive?",
        answer:
          "Our AI models are specifically fine-tuned for Jujutsu Kaisen's distinctive art style: clean modern character designs, authentic cursed energy effects, and contemporary clothing.",
      },
      {
        question: "Can I use characters for commercial projects?",
        answer:
          "Yes, any characters you create are yours to use freely for both personal and commercial purposes. We do not claim ownership over your creations.",
      },
      {
        question: "Do I need an account?",
        answer:
          "No account is required for basic use. However, creating an account lets you save characters, track generation history, and access advanced features like domain expansion backgrounds.",
      },
      {
        question: "Can I regenerate or fine-tune the same character?",
        answer:
          "Yes, you can regenerate results from the same prompt or adjust your inputs to refine your character's cursed techniques, appearance, or battle pose.",
      },
      {
        question: "Will there be more anime-style OC Makers?",
        answer:
          "Yes! We plan to release more specialized OC Makers tailored for different anime universes. Stay tuned for future updates on ocmaker.app.",
      },
    ],
  },
  cta: {
    title: "Create Your Own Jujutsu Kaisen Character",
    description:
      "Bring your original modern sorcerer to life with cursed techniques and contemporary style — no drawing skills needed.",
    primaryButtonText: "Start Creating",
    primaryButtonLink: "#workbench",
    secondaryButtonText: "Explore Characters",
    secondaryButtonLink: "/oc-arts",
  },
};
