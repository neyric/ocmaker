const examples = [
  {
    image: "https://cdn.ocmaker.app/example/naruto-oc-generated-1.webp",
    prompt:
      "1girl, white hair, bright red eyes, brave expression, naruto style combat ensemble, forehead protector, kunai, ready stance, anime style, looking at viewer, simple background, upper body",
  },
  {
    image: "https://cdn.ocmaker.app/example/naruto-oc-generated-2.webp",
    prompt:
      "1girl, orange hair, teal eyes, playful smile, Naruto style ninja clothing, headband, scroll, energetic pose, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
  {
    image: "https://cdn.ocmaker.app/example/naruto-oc-generated-3.webp",
    prompt:
      "1girl, long purple hair, blue eyes, mysterious aura, Naruto style healing ninja outfit, headband, medicinal herbs, serene stance, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
  {
    image: "https://cdn.ocmaker.app/example/naruto-oc-generated-4.webp",
    prompt:
      "1boy, dark blue hair, gray eyes, serious expression, Naruto style shinobi attire, katana, defensive stance, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
];

export default {
  style: "naruto",
  resultBackground: examples[0].image,
  hero: {
    title: "Naruto OC Maker",
    description:
      "Generate your own Naruto OC with AI. Create characters, backstories, and visuals in the iconic ninja style.",
  },
  howToUse: {
    title: "How to Make Naruto OC",
    description:
      "Creating a Naruto-style character with OC Maker is easy. Just follow these two steps to bring your idea to life.",
    steps: [
      {
        title: "Describe Your Naruto OC",
        description:
          "Fill in the form with your character's basic appearance and personality. For best results, include Naruto-style features like ninja attire, headbands, and the determined spirit of a shinobi.",
      },
      {
        title: "Add Details and Ninja Elements",
        description:
          "Include extra details like chakra abilities, clan affiliations, or unique jutsu. The more your character fits into the Naruto universe of ninjas, villages, and powerful techniques, the more accurate and impressive the result will be.",
      },
      {
        title: "Generate and Finalize Design",
        description:
          "Click the 'Generate Character' button to create your Naruto OC. You'll get several AI-generated designs — pick your favorite to complete your character.",
      },
    ],
  },
  example: {
    title: "Naruto Examples",
    description:
      "Explore Naruto characters made from text prompts, created using the Naruto OC Maker.",
    examples,
  },
  features: {
    title: "What is Naruto OC Maker?",
    description:
      "Naruto OC Maker is a version of OC Maker fine-tuned for the world of Naruto. Describe your character, and instantly turn it into Naruto-style artwork.",
    features: [
      {
        label: "Authentic Naruto Character Design",
        description:
          "Create characters that truly capture the ninja spirit of Naruto, designed to seamlessly fit into the world of shinobi, jutsu, and village politics.",
      },
      {
        label: "Tailored Prompt Tuning",
        description:
          "Prompts are fine-tuned for Naruto aesthetics — from ninja gear to chakra abilities — helping you build more convincing characters.",
      },
      {
        label: "Fast Character Generation",
        description:
          "Generate high-quality characters in just seconds, allowing you to focus more on refining ideas and less on waiting.",
      },
      {
        label: "High-Quality Visual Output",
        description:
          "Powered by advanced AI models, Naruto OC Maker delivers detailed, high-resolution character images suitable for storytelling, design, or sharing.",
      },
      {
        label: "Choose from Multiple Results",
        description:
          "Generate multiple character options per prompt and select your favorites to finalize as your official Naruto OC.",
      },
      {
        label: "Deep Story Integration",
        description:
          "Bring your OC to life with not just visuals, but also compelling backstories, ninja techniques, and rich connections to the Naruto universe.",
      },
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    description: "Have another question? Contact us at",
    contactEmail: "support@ocmaker.app",
    faqs: [
      {
        question: "What is Naruto OC Maker and how does it work?",
        answer:
          "Naruto OC Maker is a specialized version of OC Maker, fine-tuned for the Naruto universe. Simply describe your character, and our AI will generate anime-style Naruto visuals in seconds based on your prompt.",
      },
      {
        question: "How can I create better characters with Naruto OC Maker?",
        answer:
          "For best results, include Naruto-specific traits in your description, such as ninja techniques, clan backgrounds, or village affiliations. The more vivid and detailed your input, the more accurate and compelling the output.",
      },
      {
        question: "Is Naruto OC Maker free to use?",
        answer:
          "Yes, Naruto OC Maker offers free character generation with basic features. For faster results, premium options, and additional control, you can upgrade your plan anytime.",
      },
      {
        question: "What makes Naruto OC Maker's results so impressive?",
        answer:
          "Naruto OC Maker uses cutting-edge AI models fine-tuned for the Naruto setting, ensuring characters match the distinctive art style and ninja atmosphere of the series.",
      },
      {
        question:
          "Can I use characters made with Naruto OC Maker for commercial projects?",
        answer:
          "Yes, any characters you create using Naruto OC Maker are yours to use freely for both personal and commercial purposes. We do not claim ownership over your creations.",
      },
      {
        question: "Do I need an account to use Naruto OC Maker?",
        answer:
          "No account is required for basic use. However, creating an account lets you save your characters, track generation history, and access more features.",
      },
      {
        question:
          "Can I regenerate or fine-tune the same character in Naruto OC Maker?",
        answer:
          "Yes, you can regenerate results from the same prompt or adjust your inputs to refine your character until it fits your vision perfectly.",
      },
      {
        question:
          "Will there be more anime-style OC Makers like Naruto OC Maker?",
        answer:
          "Yes! We plan to release more specialized OC Makers tailored for different anime universes. Stay tuned for future updates on ocmaker.app.",
      },
    ],
  },
  cta: {
    title: "Create Your Own Naruto Character",
    description:
      "Bring your original Naruto character to life — no drawing skills needed. Just describe, generate, and explore.",
    primaryButtonText: "Start Creating",
    primaryButtonLink: "#workbench",
    secondaryButtonText: "Explore Characters",
    secondaryButtonLink: "/oc-arts",
  },
};
