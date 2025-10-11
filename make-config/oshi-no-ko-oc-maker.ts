const examples = [
  {
    image:
      "https://cdn.ocmaker.app/example/oshi-no-ko-oc-maker-generated-1.webp",
    prompt:
      "1girl, long blonde hair, star-shaped pupils, confident smile, oshi no ko style idol outfit, microphone, stage lights, sparkling effects, anime style, looking at viewer, simple background, upper body",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/oshi-no-ko-oc-maker-generated-2.webp",
    prompt:
      "1boy, dark purple hair, star eyes, serious expression, oshi no ko style actor outfit, script in hand, entertainment industry setting, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/oshi-no-ko-oc-maker-generated-3.webp",
    prompt:
      "1girl, pink hair with side ponytail, aqua star eyes, cheerful expression, oshi no ko style school uniform with idol accessories, phone in hand, social media influencer vibe, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/oshi-no-ko-oc-maker-generated-4.webp",
    prompt:
      "1girl, silver hair, ruby star eyes, mysterious smile, oshi no ko style producer outfit, tablet and headset, behind-the-scenes professional, single character, upper body, looking at viewer, anime style, simple background",
  },
];

export default {
  style: "oshi-no-ko",
  resultBackground: examples[0].image,
  hero: {
    title: "Oshi no Ko OC Maker",
    description:
      "Generate your own Oshi no Ko OC with AI. Create characters, backstories, and visuals in the dazzling world of idols, actors, and entertainment industry.",
  },
  howToUse: {
    title: "How to Make Oshi no Ko OC",
    description:
      "Creating an Oshi no Ko-style character with OC Maker is easy. Just follow these steps to bring your entertainment industry character to life.",
    steps: [
      {
        title: "Describe Your Oshi no Ko OC",
        description:
          "Fill in the form with your character's basic appearance and personality. For best results, include Oshi no Ko-style features like star-shaped pupils, modern fashion, entertainment industry roles, and the ambitious spirit of showbiz.",
      },
      {
        title: "Add Details and Industry Elements",
        description:
          "Include extra details like their role (idol, actor, producer, manager), special talents, or connections to the entertainment world. The more your character fits into the showbiz setting, the more authentic the result will be.",
      },
      {
        title: "Generate and Finalize Design",
        description:
          "Click the 'Generate Character' button to create your Oshi no Ko OC. You'll get several AI-generated designs — pick your favorite to complete your character.",
      },
    ],
  },
  example: {
    title: "Oshi no Ko Examples",
    description:
      "Explore Oshi no Ko characters made from text prompts, created using the Oshi no Ko OC Maker.",
    examples,
  },
  features: {
    title: "What is Oshi no Ko OC Maker?",
    description:
      "Oshi no Ko OC Maker is a version of OC Maker fine-tuned for the world of Oshi no Ko. Describe your character, and instantly turn it into entertainment industry-style artwork.",
    features: [
      {
        label: "Authentic Entertainment Industry Design",
        description:
          "Create characters that truly capture the glamorous yet complex world of Oshi no Ko, designed to seamlessly fit into the entertainment industry setting with all its lights and shadows.",
      },
      {
        label: "Tailored Prompt Tuning",
        description:
          "Prompts are fine-tuned for Oshi no Ko aesthetics — from star eyes to idol outfits — helping you build more convincing characters.",
      },
      {
        label: "Fast Character Generation",
        description:
          "Generate high-quality characters in just seconds, allowing you to focus more on refining ideas and less on waiting.",
      },
      {
        label: "High-Quality Visual Output",
        description:
          "Powered by advanced AI models, Oshi no Ko OC Maker delivers detailed, high-resolution character images suitable for storytelling, design, or sharing.",
      },
      {
        label: "Choose from Multiple Results",
        description:
          "Generate multiple character options per prompt and select your favorites to finalize as your official Oshi no Ko OC.",
      },
      {
        label: "Deep Story Integration",
        description:
          "Bring your OC to life with not just visuals, but also compelling backstories, entertainment careers, and rich connections to the complex world of showbiz in Oshi no Ko.",
      },
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    description: "Have another question? Contact us at",
    contactEmail: "support@ocmaker.app",
    faqs: [
      {
        question: "What is Oshi no Ko OC Maker and how does it work?",
        answer:
          "Oshi no Ko OC Maker is a specialized version of OC Maker, fine-tuned for the Oshi no Ko universe. Simply describe your character, and our AI will generate entertainment industry-style visuals in seconds based on your prompt.",
      },
      {
        question:
          "How can I create better characters with Oshi no Ko OC Maker?",
        answer:
          "For best results, include Oshi no Ko-specific traits in your description, such as star-shaped eyes, entertainment industry roles, modern fashion, or personality traits suited for showbiz. The more vivid and detailed your input, the more accurate and compelling the output.",
      },
      {
        question: "Is Oshi no Ko OC Maker free to use?",
        answer:
          "Yes, Oshi no Ko OC Maker offers free character generation with basic features. For faster results, premium options, and additional control, you can upgrade your plan anytime.",
      },
      {
        question: "What makes Oshi no Ko OC Maker's results so impressive?",
        answer:
          "Oshi no Ko OC Maker uses cutting-edge AI models fine-tuned for the entertainment industry setting, ensuring characters match the distinctive art style and dramatic atmosphere of the series.",
      },
      {
        question:
          "Can I use characters made with Oshi no Ko OC Maker for commercial projects?",
        answer:
          "Yes, any characters you create using Oshi no Ko OC Maker are yours to use freely for both personal and commercial purposes. We do not claim ownership over your creations.",
      },
      {
        question: "Do I need an account to use Oshi no Ko OC Maker?",
        answer:
          "No account is required for basic use. However, creating an account lets you save your characters, track generation history, and access more features.",
      },
      {
        question:
          "Can I regenerate or fine-tune the same character in Oshi no Ko OC Maker?",
        answer:
          "Yes, you can regenerate results from the same prompt or adjust your inputs to refine your character until it fits your vision perfectly.",
      },
      {
        question:
          "Will there be more anime-style OC Makers like Oshi no Ko OC Maker?",
        answer:
          "Yes! We plan to release more specialized OC Makers tailored for different anime universes. Stay tuned for future updates on ocmaker.app.",
      },
    ],
  },
  cta: {
    title: "Create Your Own Entertainment Star",
    description:
      "Bring your original Oshi no Ko character to life — no drawing skills needed. Just describe, generate, and shine in the world of entertainment.",
    primaryButtonText: "Start Creating",
    primaryButtonLink: "#workbench",
    secondaryButtonText: "Explore Characters",
    secondaryButtonLink: "/oc-arts",
  },
};
