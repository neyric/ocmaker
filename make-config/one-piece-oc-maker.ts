const examples = [
  {
    image:
      "https://cdn.ocmaker.app/example/one-piece-oc-maker-generated-1.webp",
    prompt:
      "1girl, long wavy blue hair, purple eyes, serious expression, customized navy uniform, torn cape, short shorts, thigh-high boots, seashell accessory, belt pouch, wind aura, dual blade pose, wind effect, pirate style, one piece style, fantasy outfit, looking at viewer, simple background, upper body",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/one-piece-oc-maker-generated-2.webp",
    prompt:
      "1boy, medium length dark red hair, sharp eyes, confident smile, young pirate captain, white open shirt, black coat, long pants, katana at waist, standing on ship deck, wind-blown cloak, battle-ready pose, one piece style, looking at viewer, simple background, upper body",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/one-piece-oc-maker-generated-3.webp",
    prompt:
      "1boy, muscular male, long black hair, red eyes, horns, mustache, angry expression, shirtless, open long coat, dragon tattoo, holding kanabo, one piece style, kaido (one piece), looking at viewer, simple background, upper body",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/one-piece-oc-maker-generated-4.webp",
    prompt:
      "1boy, muscular male, tall male, white mustache, slicked back white hair, stern expression, shirtless, open coat, captain's coat, white coat with red interior, holding bisento, attack pose, scars on chest, gold epaulettes, pirate hat (removed), one piece style, looking at viewer, simple background, upper body",
  },
];

export default {
  style: "one-piece",
  resultBackground: examples[0].image,
  hero: {
    title: "One Piece OC Maker",
    description:
      "Generate your own One Piece OC with AI. Create characters, backstories, and visuals in the adventurous pirate style.",
  },
  howToUse: {
    title: "How to Make One Piece OC",
    description:
      "Creating a One Piece-style character with OC Maker is easy. Just follow these two steps to bring your idea to life.",
    steps: [
      {
        title: "Describe Your One Piece OC",
        description:
          "Fill in the form with your character's basic appearance and personality. For best results, include One Piece-style features like colorful pirate outfits, unique hairstyles, and the adventurous spirit of a pirate seeking treasure.",
      },
      {
        title: "Add Details and Pirate Elements",
        description:
          "Include extra details like Devil Fruit powers, pirate crew affiliations, or unique weapons. The more your character fits into the One Piece universe of pirates, marines, and grand adventures, the more accurate and impressive the result will be.",
      },
      {
        title: "Generate and Finalize Design",
        description:
          "Click the 'Generate Character' button to create your One Piece OC. You'll get several AI-generated designs — pick your favorite to complete your character.",
      },
    ],
  },
  example: {
    title: "One Piece Examples",
    description:
      "Explore One Piece characters made from text prompts, created using the One Piece OC Maker.",
    examples,
  },
  features: {
    title: "What is One Piece OC Maker?",
    description:
      "One Piece OC Maker is a version of OC Maker fine-tuned for the world of One Piece. Describe your character, and instantly turn it into One Piece-style artwork.",
    features: [
      {
        label: "Authentic One Piece Character Design",
        description:
          "Create characters that truly capture the adventurous pirate spirit of One Piece, designed to seamlessly fit into the world of Devil Fruits, pirate crews, and grand adventures.",
      },
      {
        label: "Tailored Prompt Tuning",
        description:
          "Prompts are fine-tuned for One Piece aesthetics — from colorful pirate outfits to unique Devil Fruit abilities — helping you build more convincing characters.",
      },
      {
        label: "Fast Character Generation",
        description:
          "Generate high-quality characters in just seconds, allowing you to focus more on refining ideas and less on waiting.",
      },
      {
        label: "High-Quality Visual Output",
        description:
          "Powered by advanced AI models, One Piece OC Maker delivers detailed, high-resolution character images suitable for storytelling, design, or sharing.",
      },
      {
        label: "Choose from Multiple Results",
        description:
          "Generate multiple character options per prompt and select your favorites to finalize as your official One Piece OC.",
      },
      {
        label: "Deep Story Integration",
        description:
          "Bring your OC to life with not just visuals, but also compelling backstories, crew dynamics, and rich connections to the One Piece universe.",
      },
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    description: "Have another question? Contact us at",
    contactEmail: "support@ocmaker.app",
    faqs: [
      {
        question: "What is One Piece OC Maker and how does it work?",
        answer:
          "One Piece OC Maker is a specialized version of OC Maker, fine-tuned for the One Piece universe. Simply describe your character, and our AI will generate anime-style One Piece visuals in seconds based on your prompt.",
      },
      {
        question: "How can I create better characters with One Piece OC Maker?",
        answer:
          "For best results, include One Piece-specific traits in your description, such as Devil Fruit powers, pirate outfits, or crew affiliations. The more vivid and detailed your input, the more accurate and compelling the output.",
      },
      {
        question: "Is One Piece OC Maker free to use?",
        answer:
          "Yes, One Piece OC Maker offers free character generation with basic features. For faster results, premium options, and additional control, you can upgrade your plan anytime.",
      },
      {
        question: "What makes One Piece OC Maker's results so impressive?",
        answer:
          "One Piece OC Maker uses cutting-edge AI models fine-tuned for the One Piece setting, ensuring characters match the vibrant art style and adventurous spirit of the series.",
      },
      {
        question:
          "Can I use characters made with One Piece OC Maker for commercial projects?",
        answer:
          "Yes, any characters you create using One Piece OC Maker are yours to use freely for both personal and commercial purposes. We do not claim ownership over your creations.",
      },
      {
        question: "Do I need an account to use One Piece OC Maker?",
        answer:
          "No account is required for basic use. However, creating an account lets you save your characters, track generation history, and access more features.",
      },
      {
        question:
          "Can I regenerate or fine-tune the same character in One Piece OC Maker?",
        answer:
          "Yes, you can regenerate results from the same prompt or adjust your inputs to refine your character until it fits your vision perfectly.",
      },
      {
        question:
          "Will there be more anime-style OC Makers like One Piece OC Maker?",
        answer:
          "Yes! We plan to release more specialized OC Makers tailored for different anime universes. Stay tuned for future updates on ocmaker.app.",
      },
    ],
  },
  cta: {
    title: "Create Your Own One Piece Character",
    description:
      "Bring your original One Piece character to life — no drawing skills needed. Just describe, generate, and explore.",
    primaryButtonText: "Start Creating",
    primaryButtonLink: "#workbench",
    secondaryButtonText: "Explore Characters",
    secondaryButtonLink: "/oc-arts",
  },
};
