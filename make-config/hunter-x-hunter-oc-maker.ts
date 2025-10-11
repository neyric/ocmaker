const examples = [
  {
    image:
      "https://cdn.ocmaker.app/example/hunter-x-hunter-oc-generated-1.webp",
    prompt:
      "1boy, spiky black hair with green tips, amber eyes, hunter exam participant, confident smirk, green jacket with shorts, backpack, enhancer aura visible, nen energy flowing, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/hunter-x-hunter-oc-generated-2.webp",
    prompt:
      "1girl, long silver hair in braid, purple eyes, blacklist hunter, serious expression, dark suit with hunter license visible, dual daggers, manipulator nen type, shadow aura, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/hunter-x-hunter-oc-generated-3.webp",
    prompt:
      "1boy, messy red hair, golden eyes with cat pupils, transmuter type, playful grin, casual streetwear, electricity nen ability, sparks around hands, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/hunter-x-hunter-oc-generated-4.webp",
    prompt:
      "1girl, short blue hair with headband, green eyes, beast hunter, cheerful expression, safari outfit with khaki vest, conjurer nen type, summoned creature beside, single character, upper body, looking at viewer, anime style, simple background",
  },
];

export default {
  style: "hunter-x-hunter",
  resultBackground: examples[0].image,
  hero: {
    title: "Hunter x Hunter OC Maker",
    description:
      "Generate your own Hunter x Hunter OC with AI. Create unique Hunters with Nen abilities, specializations, and backstories for the HxH universe.",
  },
  howToUse: {
    title: "How to Make Hunter x Hunter OC",
    description:
      "Creating a Hunter x Hunter character with OC Maker is easy. Follow these steps to design your own Hunter with unique Nen abilities.",
    steps: [
      {
        title: "Describe Your Hunter Character",
        description:
          "Fill in the form with your character's appearance and personality. For best results, include HxH-specific elements like Hunter type, clothing style, and physical traits that fit the Hunter x Hunter aesthetic.",
      },
      {
        title: "Define Nen Type and Abilities",
        description:
          "Specify your character's Nen type (Enhancer, Transmuter, Conjurer, Emitter, Manipulator, or Specialist) and describe their unique Hatsu ability. Include limitations and conditions for more authentic results.",
      },
      {
        title: "Generate and Choose Your Hunter",
        description:
          "Click 'Generate Character' to create your Hunter x Hunter OC. You'll get multiple AI-generated designs — select your favorite to finalize your Hunter for the Association.",
      },
    ],
  },
  example: {
    title: "Hunter x Hunter Examples",
    description:
      "Explore Hunter characters created from text prompts using the Hunter x Hunter OC Maker.",
    examples,
  },
  features: {
    title: "What is Hunter x Hunter OC Maker?",
    description:
      "Hunter x Hunter OC Maker is a specialized version of OC Maker designed for the HxH universe. Describe your Hunter and instantly transform them into authentic Togashi-style artwork.",
    features: [
      {
        label: "Authentic HxH Art Style",
        description:
          "Create characters that perfectly capture Yoshihiro Togashi's distinctive art style, designed to fit seamlessly into the Hunter x Hunter world.",
      },
      {
        label: "Nen System Integration",
        description:
          "Prompts are optimized for the complex Nen system — from aura types to Hatsu abilities — helping you create believable and balanced Hunter characters.",
      },
      {
        label: "Rapid Character Creation",
        description:
          "Generate professional-quality Hunter characters in seconds, perfect for roleplaying, fan fiction, or creative projects.",
      },
      {
        label: "Detailed Character Designs",
        description:
          "Our AI produces high-resolution character artwork with intricate details, from Hunter licenses to unique Nen manifestations.",
      },
      {
        label: "Multiple Design Variations",
        description:
          "Generate several character options per prompt, allowing you to explore different interpretations and select your ideal Hunter design.",
      },
      {
        label: "Complete Hunter Profile",
        description:
          "Create not just appearances but complete Hunter profiles including specializations, Nen abilities, and backstories that fit the HxH universe.",
      },
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    description: "Have another question? Contact us at",
    contactEmail: "support@ocmaker.app",
    faqs: [
      {
        question: "What is Hunter x Hunter OC Maker and how does it work?",
        answer:
          "Hunter x Hunter OC Maker is an AI-powered tool for creating original HxH characters. Describe your Hunter's appearance, Nen type, and abilities, and our AI generates authentic artwork matching Togashi's style.",
      },
      {
        question: "How can I create better Hunter x Hunter characters?",
        answer:
          "Include specific HxH elements like Nen categories, Hunter specializations, ability restrictions, and vows. The more you incorporate the series' power system and world-building, the more authentic your character will be.",
      },
      {
        question: "Is Hunter x Hunter OC Maker free to use?",
        answer:
          "Yes, Hunter x Hunter OC Maker offers free character generation with basic features. Premium plans provide faster generation, additional options, and more customization capabilities.",
      },
      {
        question: "What makes the Nen abilities look realistic?",
        answer:
          "Our AI understands the six Nen types and their typical manifestations, helping create abilities that feel balanced and consistent with the Hunter x Hunter power system.",
      },
      {
        question: "Can I use my Hunter OC for stories or roleplay?",
        answer:
          "Absolutely! Characters created with Hunter x Hunter OC Maker are yours to use in fan fiction, roleplay, artwork, or any creative project you have in mind.",
      },
      {
        question: "Do I need an account to create characters?",
        answer:
          "No account required for basic use. However, signing up lets you save your Hunters, track generation history, and access premium features.",
      },
      {
        question: "Can I create different types of Hunters and Nen users?",
        answer:
          "Yes! Create any type of Hunter (Blacklist, Beast, Treasure, etc.) with any Nen type. You can even design Chimera Ants or other HxH universe characters.",
      },
      {
        question: "Are more anime OC makers being developed?",
        answer:
          "Yes! We're constantly adding new anime-specific OC makers. Visit ocmaker.app regularly to discover new additions to our growing collection.",
      },
    ],
  },
  cta: {
    title: "Create Your Own Hunter",
    description:
      "Design your original Hunter with unique Nen abilities — no drawing skills needed. Just describe, generate, and join the Hunter Association.",
    primaryButtonText: "Start Creating",
    primaryButtonLink: "#workbench",
    secondaryButtonText: "Explore Characters",
    secondaryButtonLink: "/oc-arts",
  },
};
