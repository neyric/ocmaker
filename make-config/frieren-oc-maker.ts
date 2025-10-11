const examples = [
  {
    image: "https://cdn.ocmaker.app/example/frieren-oc-maker-generated-1.webp",
    prompt:
      "1boy, silver hair, golden eyes, dwarf warrior, beard, serious expression, frieren style heavy armor, battle axe, defensive stance, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/frieren-oc-maker-generated-2.webp",
    prompt:
      "1girl, pink hair in twin tails, purple eyes, young mage apprentice, cheerful smile, frieren style academy uniform, spell book, magical sparkles, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/frieren-oc-maker-generated-3.webp",
    prompt:
      "1boy, short brown hair, blue eyes, human warrior, determined expression, frieren style armor, sword and shield, adventurer outfit, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/frieren-oc-maker-generated-4.webp",
    prompt:
      "1girl, long white hair, green eyes, elf ears, serene expression, frieren style mage robes, wooden staff, magical aura, fantasy medieval setting, anime style, looking at viewer, simple background, upper body",
  },
];

export default {
  style: "frieren",
  resultBackground: examples[0].image,
  hero: {
    title: "Frieren OC Maker",
    description:
      "Generate your own Frieren OC with AI. Create characters, backstories, and visuals in the timeless fantasy world of elves, magic, and adventure.",
  },
  howToUse: {
    title: "How to Make Frieren OC",
    description:
      "Creating a Frieren-style character with OC Maker is easy. Just follow these steps to bring your fantasy character to life.",
    steps: [
      {
        title: "Describe Your Frieren OC",
        description:
          "Fill in the form with your character's basic appearance and personality. For best results, include Frieren-style features like elven traits, medieval clothing, magical elements, and the contemplative spirit of long-lived beings.",
      },
      {
        title: "Add Details and Magical Elements",
        description:
          "Include extra details like magical specialties, race (elf, human, dwarf), adventurer class, or connections to the passage of time. The more your character fits into Frieren's world of magic and memories, the more authentic the result will be.",
      },
      {
        title: "Generate and Finalize Design",
        description:
          "Click the 'Generate Character' button to create your Frieren OC. You'll get several AI-generated designs — pick your favorite to complete your character.",
      },
    ],
  },
  example: {
    title: "Frieren Examples",
    description:
      "Explore Frieren characters made from text prompts, created using the Frieren OC Maker.",
    examples,
  },
  features: {
    title: "What is Frieren OC Maker?",
    description:
      "Frieren OC Maker is a version of OC Maker fine-tuned for the world of Frieren: Beyond Journey's End. Describe your character, and instantly turn it into Frieren-style fantasy artwork.",
    features: [
      {
        label: "Authentic Fantasy Character Design",
        description:
          "Create characters that truly capture the timeless fantasy aesthetic of Frieren, designed to seamlessly fit into the world of elves, magic, and the passage of millennia.",
      },
      {
        label: "Tailored Prompt Tuning",
        description:
          "Prompts are fine-tuned for Frieren aesthetics — from medieval fantasy attire to magical abilities — helping you build more convincing characters.",
      },
      {
        label: "Fast Character Generation",
        description:
          "Generate high-quality characters in just seconds, allowing you to focus more on refining ideas and less on waiting.",
      },
      {
        label: "High-Quality Visual Output",
        description:
          "Powered by advanced AI models, Frieren OC Maker delivers detailed, high-resolution character images suitable for storytelling, design, or sharing.",
      },
      {
        label: "Choose from Multiple Results",
        description:
          "Generate multiple character options per prompt and select your favorites to finalize as your official Frieren OC.",
      },
      {
        label: "Deep Story Integration",
        description:
          "Bring your OC to life with not just visuals, but also compelling backstories, magical abilities, and rich connections to the themes of time and memory in Frieren's universe.",
      },
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    description: "Have another question? Contact us at",
    contactEmail: "support@ocmaker.app",
    faqs: [
      {
        question: "What is Frieren OC Maker and how does it work?",
        answer:
          "Frieren OC Maker is a specialized version of OC Maker, fine-tuned for the Frieren universe. Simply describe your character, and our AI will generate fantasy-style Frieren visuals in seconds based on your prompt.",
      },
      {
        question: "How can I create better characters with Frieren OC Maker?",
        answer:
          "For best results, include Frieren-specific traits in your description, such as elven features, magical specializations, medieval fantasy clothing, or themes related to the passage of time. The more vivid and detailed your input, the more accurate and compelling the output.",
      },
      {
        question: "Is Frieren OC Maker free to use?",
        answer:
          "Yes, Frieren OC Maker offers free character generation with basic features. For faster results, premium options, and additional control, you can upgrade your plan anytime.",
      },
      {
        question: "What makes Frieren OC Maker's results so impressive?",
        answer:
          "Frieren OC Maker uses cutting-edge AI models fine-tuned for the Frieren setting, ensuring characters match the distinctive art style and contemplative fantasy atmosphere of the series.",
      },
      {
        question:
          "Can I use characters made with Frieren OC Maker for commercial projects?",
        answer:
          "Yes, any characters you create using Frieren OC Maker are yours to use freely for both personal and commercial purposes. We do not claim ownership over your creations.",
      },
      {
        question: "Do I need an account to use Frieren OC Maker?",
        answer:
          "No account is required for basic use. However, creating an account lets you save your characters, track generation history, and access more features.",
      },
      {
        question:
          "Can I regenerate or fine-tune the same character in Frieren OC Maker?",
        answer:
          "Yes, you can regenerate results from the same prompt or adjust your inputs to refine your character until it fits your vision perfectly.",
      },
      {
        question:
          "Will there be more anime-style OC Makers like Frieren OC Maker?",
        answer:
          "Yes! We plan to release more specialized OC Makers tailored for different anime universes. Stay tuned for future updates on ocmaker.app.",
      },
    ],
  },
  cta: {
    title: "Create Your Own Frieren Character",
    description:
      "Bring your original Frieren character to life — no drawing skills needed. Just describe, generate, and explore the timeless world of magic.",
    primaryButtonText: "Start Creating",
    primaryButtonLink: "#workbench",
    secondaryButtonText: "Explore Characters",
    secondaryButtonLink: "/oc-arts",
  },
};
