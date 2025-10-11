const examples = [
  {
    image:
      "https://cdn.ocmaker.app/example/chainsaw-man-oc-maker-generated-1.webp",
    prompt:
      "1boy, messy black hair, sharp teeth grin, wild red eyes, chainsaw man style devil hunter uniform, blood splatter effects, chainsaw arms transformation hint, dark urban background, anime style, looking at viewer, simple background, upper body",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/chainsaw-man-oc-maker-generated-2.webp",
    prompt:
      "1girl, long dark hair, cold yellow eyes, stoic expression, chainsaw man style public safety suit, cigarette, devil contract markings, professional stance, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/chainsaw-man-oc-maker-generated-3.webp",
    prompt:
      "1girl, short pink hair, spiral eyes, unhinged smile, chainsaw man style casual outfit, devil features, blood on face, chaotic energy, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/chainsaw-man-oc-maker-generated-4.webp",
    prompt:
      "1boy, white hair, heterochromia eyes, mysterious expression, chainsaw man style hybrid form hints, torn clothing, devil hunter rookie, battle-ready pose, single character, upper body, looking at viewer, anime style, simple background",
  },
];

export default {
  style: "chainsaw-man",
  resultBackground: examples[0].image,
  hero: {
    title: "Chainsaw Man OC Maker",
    description:
      "Generate your own Chainsaw Man OC with AI. Create characters, backstories, and visuals in the dark and chaotic world of devils, contracts, and devil hunters.",
  },
  howToUse: {
    title: "How to Make Chainsaw Man OC",
    description:
      "Creating a Chainsaw Man-style character with OC Maker is easy. Just follow these steps to bring your devil hunter or devil to life.",
    steps: [
      {
        title: "Describe Your Chainsaw Man OC",
        description:
          "Fill in the form with your character's basic appearance and personality. For best results, include Chainsaw Man-style features like devil hunter uniforms, devil traits, unhinged expressions, and the dark atmosphere of the series.",
      },
      {
        title: "Add Details and Devil Elements",
        description:
          "Include extra details like their role (devil hunter, devil, hybrid), devil contracts, special abilities, or connections to Public Safety. The more your character fits into the chaotic world of devils, the more authentic the result will be.",
      },
      {
        title: "Generate and Finalize Design",
        description:
          "Click the 'Generate Character' button to create your Chainsaw Man OC. You'll get several AI-generated designs — pick your favorite to complete your character.",
      },
    ],
  },
  example: {
    title: "Chainsaw Man Examples",
    description:
      "Explore Chainsaw Man characters made from text prompts, created using the Chainsaw Man OC Maker.",
    examples,
  },
  features: {
    title: "What is Chainsaw Man OC Maker?",
    description:
      "Chainsaw Man OC Maker is a version of OC Maker fine-tuned for the world of Chainsaw Man. Describe your character, and instantly turn it into dark fantasy-style artwork.",
    features: [
      {
        label: "Authentic Dark Fantasy Design",
        description:
          "Create characters that truly capture the gritty, chaotic atmosphere of Chainsaw Man, designed to seamlessly fit into the world of devils, contracts, and desperate survival.",
      },
      {
        label: "Tailored Prompt Tuning",
        description:
          "Prompts are fine-tuned for Chainsaw Man aesthetics — from devil features to Public Safety uniforms — helping you build more convincing characters.",
      },
      {
        label: "Fast Character Generation",
        description:
          "Generate high-quality characters in just seconds, allowing you to focus more on refining ideas and less on waiting.",
      },
      {
        label: "High-Quality Visual Output",
        description:
          "Powered by advanced AI models, Chainsaw Man OC Maker delivers detailed, high-resolution character images suitable for storytelling, design, or sharing.",
      },
      {
        label: "Choose from Multiple Results",
        description:
          "Generate multiple character options per prompt and select your favorites to finalize as your official Chainsaw Man OC.",
      },
      {
        label: "Deep Story Integration",
        description:
          "Bring your OC to life with not just visuals, but also compelling backstories, devil contracts, fears and desires, and rich connections to the brutal world of Chainsaw Man.",
      },
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    description: "Have another question? Contact us at",
    contactEmail: "support@ocmaker.app",
    faqs: [
      {
        question: "What is Chainsaw Man OC Maker and how does it work?",
        answer:
          "Chainsaw Man OC Maker is a specialized version of OC Maker, fine-tuned for the Chainsaw Man universe. Simply describe your character, and our AI will generate dark fantasy-style visuals in seconds based on your prompt.",
      },
      {
        question:
          "How can I create better characters with Chainsaw Man OC Maker?",
        answer:
          "For best results, include Chainsaw Man-specific traits in your description, such as devil features, Public Safety roles, devil contracts, or personality traits suited for the chaotic world. The more vivid and detailed your input, the more accurate and compelling the output.",
      },
      {
        question: "Is Chainsaw Man OC Maker free to use?",
        answer:
          "Yes, Chainsaw Man OC Maker offers free character generation with basic features. For faster results, premium options, and additional control, you can upgrade your plan anytime.",
      },
      {
        question: "What makes Chainsaw Man OC Maker's results so impressive?",
        answer:
          "Chainsaw Man OC Maker uses cutting-edge AI models fine-tuned for the dark fantasy setting, ensuring characters match the distinctive art style and brutal atmosphere of the series.",
      },
      {
        question:
          "Can I use characters made with Chainsaw Man OC Maker for commercial projects?",
        answer:
          "Yes, any characters you create using Chainsaw Man OC Maker are yours to use freely for both personal and commercial purposes. We do not claim ownership over your creations.",
      },
      {
        question: "Do I need an account to use Chainsaw Man OC Maker?",
        answer:
          "No account is required for basic use. However, creating an account lets you save your characters, track generation history, and access more features.",
      },
      {
        question:
          "Can I regenerate or fine-tune the same character in Chainsaw Man OC Maker?",
        answer:
          "Yes, you can regenerate results from the same prompt or adjust your inputs to refine your character until it fits your vision perfectly.",
      },
      {
        question:
          "Will there be more anime-style OC Makers like Chainsaw Man OC Maker?",
        answer:
          "Yes! We plan to release more specialized OC Makers tailored for different anime universes. Stay tuned for future updates on ocmaker.app.",
      },
    ],
  },
  cta: {
    title: "Create Your Devil Hunter",
    description:
      "Bring your original Chainsaw Man character to life — no drawing skills needed. Just describe, generate, and survive in the world of devils.",
    primaryButtonText: "Start Creating",
    primaryButtonLink: "#workbench",
    secondaryButtonText: "Explore Characters",
    secondaryButtonLink: "/oc-arts",
  },
};
