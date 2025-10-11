const examples = [
  {
    image:
      "https://cdn.ocmaker.app/example/blue-lock-oc-maker-generated-1.webp",
    prompt:
      "1boy, spiky blue hair, intense yellow eyes, competitive expression, blue lock style soccer uniform number 11, muscular build, dynamic pose, soccer field background, anime style, looking at viewer, simple background, upper body",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/blue-lock-oc-maker-generated-2.webp",
    prompt:
      "1boy, white hair with black streaks, sharp red eyes, confident smirk, blue lock training gear, athletic physique, holding soccer ball, striker pose, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/blue-lock-oc-maker-generated-3.webp",
    prompt:
      "1boy, long green hair tied back, calculating purple eyes, analytical expression, blue lock goalkeeper uniform, gloves, defensive stance, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/blue-lock-oc-maker-generated-4.webp",
    prompt:
      "1boy, short orange hair, fierce blue eyes, determined expression, blue lock midfielder jersey number 7, speed-focused build, ready to sprint pose, single character, upper body, looking at viewer, anime style, simple background",
  },
];

export default {
  style: "blue-lock",
  resultBackground: examples[0].image,
  hero: {
    title: "Blue Lock OC Maker",
    description:
      "Generate your own Blue Lock OC with AI. Create characters, backstories, and visuals in the intense world of competitive soccer and ego-driven strikers.",
  },
  howToUse: {
    title: "How to Make Blue Lock OC",
    description:
      "Creating a Blue Lock-style character with OC Maker is easy. Just follow these steps to bring your ultimate striker to life.",
    steps: [
      {
        title: "Describe Your Blue Lock OC",
        description:
          "Fill in the form with your character's basic appearance and personality. For best results, include Blue Lock-style features like athletic builds, soccer gear, intense expressions, and the ego-driven mindset of a striker.",
      },
      {
        title: "Add Details and Soccer Elements",
        description:
          "Include extra details like playing position, special techniques, weapon (unique skill), or their personal ego philosophy. The more your character embodies the Blue Lock mentality, the more authentic the result will be.",
      },
      {
        title: "Generate and Finalize Design",
        description:
          "Click the 'Generate Character' button to create your Blue Lock OC. You'll get several AI-generated designs — pick your favorite to complete your character.",
      },
    ],
  },
  example: {
    title: "Blue Lock Examples",
    description:
      "Explore Blue Lock characters made from text prompts, created using the Blue Lock OC Maker.",
    examples,
  },
  features: {
    title: "What is Blue Lock OC Maker?",
    description:
      "Blue Lock OC Maker is a version of OC Maker fine-tuned for the world of Blue Lock. Describe your character, and instantly turn it into competitive soccer-style artwork.",
    features: [
      {
        label: "Authentic Soccer Player Design",
        description:
          "Create characters that truly capture the intense competitive spirit of Blue Lock, designed to seamlessly fit into the world of ego-driven strikers and revolutionary soccer.",
      },
      {
        label: "Tailored Prompt Tuning",
        description:
          "Prompts are fine-tuned for Blue Lock aesthetics — from athletic builds to soccer gear — helping you build more convincing characters.",
      },
      {
        label: "Fast Character Generation",
        description:
          "Generate high-quality characters in just seconds, allowing you to focus more on refining ideas and less on waiting.",
      },
      {
        label: "High-Quality Visual Output",
        description:
          "Powered by advanced AI models, Blue Lock OC Maker delivers detailed, high-resolution character images suitable for storytelling, design, or sharing.",
      },
      {
        label: "Choose from Multiple Results",
        description:
          "Generate multiple character options per prompt and select your favorites to finalize as your official Blue Lock OC.",
      },
      {
        label: "Deep Story Integration",
        description:
          "Bring your OC to life with not just visuals, but also compelling backstories, unique weapons (skills), ego philosophies, and rich connections to the competitive world of Blue Lock.",
      },
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    description: "Have another question? Contact us at",
    contactEmail: "support@ocmaker.app",
    faqs: [
      {
        question: "What is Blue Lock OC Maker and how does it work?",
        answer:
          "Blue Lock OC Maker is a specialized version of OC Maker, fine-tuned for the Blue Lock universe. Simply describe your character, and our AI will generate soccer player-style visuals in seconds based on your prompt.",
      },
      {
        question: "How can I create better characters with Blue Lock OC Maker?",
        answer:
          "For best results, include Blue Lock-specific traits in your description, such as playing positions, unique techniques, ego philosophies, or physical attributes suited for soccer. The more vivid and detailed your input, the more accurate and compelling the output.",
      },
      {
        question: "Is Blue Lock OC Maker free to use?",
        answer:
          "Yes, Blue Lock OC Maker offers free character generation with basic features. For faster results, premium options, and additional control, you can upgrade your plan anytime.",
      },
      {
        question: "What makes Blue Lock OC Maker's results so impressive?",
        answer:
          "Blue Lock OC Maker uses cutting-edge AI models fine-tuned for the competitive soccer setting, ensuring characters match the distinctive art style and intense atmosphere of the series.",
      },
      {
        question:
          "Can I use characters made with Blue Lock OC Maker for commercial projects?",
        answer:
          "Yes, any characters you create using Blue Lock OC Maker are yours to use freely for both personal and commercial purposes. We do not claim ownership over your creations.",
      },
      {
        question: "Do I need an account to use Blue Lock OC Maker?",
        answer:
          "No account is required for basic use. However, creating an account lets you save your characters, track generation history, and access more features.",
      },
      {
        question:
          "Can I regenerate or fine-tune the same character in Blue Lock OC Maker?",
        answer:
          "Yes, you can regenerate results from the same prompt or adjust your inputs to refine your character until it fits your vision perfectly.",
      },
      {
        question:
          "Will there be more anime-style OC Makers like Blue Lock OC Maker?",
        answer:
          "Yes! We plan to release more specialized OC Makers tailored for different anime universes. Stay tuned for future updates on ocmaker.app.",
      },
    ],
  },
  cta: {
    title: "Create Your Ultimate Striker",
    description:
      "Bring your original Blue Lock character to life — no drawing skills needed. Just describe, generate, and dominate the field.",
    primaryButtonText: "Start Creating",
    primaryButtonLink: "#workbench",
    secondaryButtonText: "Explore Characters",
    secondaryButtonLink: "/oc-arts",
  },
};
