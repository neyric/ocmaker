const examples = [
  {
    image:
      "https://cdn.ocmaker.app/example/spy-x-family-oc-maker-generated-1.webp",
    prompt:
      "1girl, anya forger, spy x family, pink hair, short hair, green eyes, small stature, child, school uniform, eden academy uniform, white shirt, red sweater vest, black skirt, white socks, black shoes, innocent expression, curious look, antenna hair, hair ornaments, looking at viewer, simple background, upper body",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/spy-x-family-oc-maker-generated-2.webp",
    prompt:
      "1boy, damian desmond, spy x family, blonde hair, short hair, green eyes, child, school uniform, eden academy uniform, white shirt, red tie, dark blue blazer, proud expression, arrogant smile, crossed arms, looking at viewer, simple background, upper body, masterpiece, best quality, very aesthetic, absurdres",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/spy-x-family-oc-maker-generated-3.webp",
    prompt:
      "1girl, yor forger, spy x family, long black hair, red eyes, black sleeveless dress, gold hairband, earrings, gentle expression, assassin, elegant pose, anime style, looking at viewer, simple background, upper body",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/spy-x-family-oc-maker-generated-4.webp",
    prompt:
      "1boy, loid forger, spy x family, blonde hair, short hair, green eyes, serious expression, black suit, white dress shirt, black tie, spy, professional appearance, mature male, looking at viewer, simple background, upper body",
  },
];

export default {
  style: "spy-x-family",
  resultBackground: examples[0].image,
  hero: {
    title: "Spy x Family OC Maker",
    description:
      "Generate your own Spy x Family OC with AI. Create characters, backstories, and visuals in the charming spy comedy style.",
  },
  howToUse: {
    title: "How to Make Spy x Family OC",
    description:
      "Creating a Spy x Family-style character with OC Maker is easy. Just follow these two steps to bring your idea to life.",
    steps: [
      {
        title: "Describe Your Spy x Family OC",
        description:
          "Fill in the form with your character's basic appearance and personality. For best results, include Spy x Family-style features like elegant formal wear, spy gadgets, and the sophisticated yet charming demeanor of a secret agent.",
      },
      {
        title: "Add Details and Spy Elements",
        description:
          "Include extra details like spy equipment, assassination skills, or telepathic abilities. The more your character fits into the Spy x Family universe of espionage and family comedy, the more accurate and impressive the result will be.",
      },
      {
        title: "Generate and Finalize Design",
        description:
          "Click the 'Generate Character' button to create your Spy x Family OC. You'll get several AI-generated designs — pick your favorite to complete your character.",
      },
    ],
  },
  example: {
    title: "Spy x Family Examples",
    description:
      "Explore Spy x Family characters made from text prompts, created using the Spy x Family OC Maker.",
    examples,
  },
  features: {
    title: "What is Spy x Family OC Maker?",
    description:
      "Spy x Family OC Maker is a version of OC Maker fine-tuned for the world of Spy x Family. Describe your character, and instantly turn it into Spy x Family-style artwork.",
    features: [
      {
        label: "Authentic Spy x Family Character Design",
        description:
          "Create characters that truly capture the sophisticated spy comedy spirit of Spy x Family, designed to seamlessly fit into the world of espionage, family dynamics, and heartwarming moments.",
      },
      {
        label: "Tailored Prompt Tuning",
        description:
          "Prompts are fine-tuned for Spy x Family aesthetics — from elegant spy outfits to charming family interactions — helping you build more convincing characters.",
      },
      {
        label: "Fast Character Generation",
        description:
          "Generate high-quality characters in just seconds, allowing you to focus more on refining ideas and less on waiting.",
      },
      {
        label: "High-Quality Visual Output",
        description:
          "Powered by advanced AI models, Spy x Family OC Maker delivers detailed, high-resolution character images suitable for storytelling, design, or sharing.",
      },
      {
        label: "Choose from Multiple Results",
        description:
          "Generate multiple character options per prompt and select your favorites to finalize as your official Spy x Family OC.",
      },
      {
        label: "Deep Story Integration",
        description:
          "Bring your OC to life with not just visuals, but also compelling backstories, spy missions, and rich connections to the Spy x Family universe.",
      },
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    description: "Have another question? Contact us at",
    contactEmail: "support@ocmaker.app",
    faqs: [
      {
        question: "What is Spy x Family OC Maker and how does it work?",
        answer:
          "Spy x Family OC Maker is a specialized version of OC Maker, fine-tuned for the Spy x Family universe. Simply describe your character, and our AI will generate anime-style Spy x Family visuals in seconds based on your prompt.",
      },
      {
        question:
          "How can I create better characters with Spy x Family OC Maker?",
        answer:
          "For best results, include Spy x Family-specific traits in your description, such as spy gadgets, elegant clothing, or family dynamics. The more vivid and detailed your input, the more accurate and compelling the output.",
      },
      {
        question: "Is Spy x Family OC Maker free to use?",
        answer:
          "Yes, Spy x Family OC Maker offers free character generation with basic features. For faster results, premium options, and additional control, you can upgrade your plan anytime.",
      },
      {
        question: "What makes Spy x Family OC Maker's results so impressive?",
        answer:
          "Spy x Family OC Maker uses cutting-edge AI models fine-tuned for the Spy x Family setting, ensuring characters match the sophisticated spy comedy style and charming family dynamics of the series.",
      },
      {
        question:
          "Can I use characters made with Spy x Family OC Maker for commercial projects?",
        answer:
          "Yes, any characters you create using Spy x Family OC Maker are yours to use freely for both personal and commercial purposes. We do not claim ownership over your creations.",
      },
      {
        question: "Do I need an account to use Spy x Family OC Maker?",
        answer:
          "No account is required for basic use. However, creating an account lets you save your characters, track generation history, and access more features.",
      },
      {
        question:
          "Can I regenerate or fine-tune the same character in Spy x Family OC Maker?",
        answer:
          "Yes, you can regenerate results from the same prompt or adjust your inputs to refine your character until it fits your vision perfectly.",
      },
      {
        question:
          "Will there be more anime-style OC Makers like Spy x Family OC Maker?",
        answer:
          "Yes! We plan to release more specialized OC Makers tailored for different anime universes. Stay tuned for future updates on ocmaker.app.",
      },
    ],
  },
  cta: {
    title: "Create Your Own Spy x Family Character",
    description:
      "Bring your original Spy x Family character to life — no drawing skills needed. Just describe, generate, and explore.",
    primaryButtonText: "Start Creating",
    primaryButtonLink: "#workbench",
    secondaryButtonText: "Explore Characters",
    secondaryButtonLink: "/oc-arts",
  },
};
