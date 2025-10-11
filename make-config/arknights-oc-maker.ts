const examples = [
  {
    image:
      "https://cdn.ocmaker.app/example/arknights-oc-maker-generated-1.webp",
    prompt:
      "1boy, white hair with black streaks, red eyes, wolf ears and tail, rhodes island guard operator, tactical gear, sword weapon, serious expression, originium crystals visible, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/arknights-oc-maker-generated-2.webp",
    prompt:
      "1girl, long silver hair, blue eyes, cat ears, medic operator uniform, white coat with rhodes island logo, medical equipment, gentle smile, healing arts effects, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/arknights-oc-maker-generated-3.webp",
    prompt:
      "1girl, short pink hair, golden eyes, rabbit ears, sniper operator, tactical scope, rifle weapon, focused expression, camouflage gear, crosshair targeting effect, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/arknights-oc-maker-generated-4.webp",
    prompt:
      "1boy, dark blue hair, green eyes, dragon horns, defender operator, heavy armor, shield and hammer, protective stance, originium infection scars, single character, upper body, looking at viewer, anime style, simple background",
  },
];

export default {
  style: "arknights",
  resultBackground: examples[0].image,
  hero: {
    title: "Arknights OC Maker",
    description:
      "Generate your own Arknights OC with AI. Create unique Operators with diverse races, classes, and Arts abilities for Rhodes Island.",
  },
  howToUse: {
    title: "How to Make Arknights OC",
    description:
      "Creating an Arknights Operator with OC Maker is a tactical mission. Follow these steps to design your own Rhodes Island recruit.",
    steps: [
      {
        title: "Describe Your Operator",
        description:
          "Fill in the form with your character's appearance and traits. For authentic results, include Arknights-specific features like animal ears/horns/tails, operator class uniform, tactical gear, and originium infection signs.",
      },
      {
        title: "Define Class and Arts Abilities",
        description:
          "Specify your Operator's class (Guard, Sniper, Caster, Medic, Defender, Vanguard, etc.), weapon type, Arts specialization, and racial background. Include deployment cost and tactical role for more authentic results.",
      },
      {
        title: "Deploy Your Operator",
        description:
          "Click 'Generate Character' to create your Arknights OC. You'll receive multiple AI-generated designs — select your favorite to complete your Rhodes Island Operator recruitment!",
      },
    ],
  },
  example: {
    title: "Arknights Operator Examples",
    description:
      "Explore Arknights characters created from text prompts using the Arknights OC Maker.",
    examples,
  },
  features: {
    title: "What is Arknights OC Maker?",
    description:
      "Arknights OC Maker is a specialized version of OC Maker designed for the Arknights universe. Describe your Operator and instantly transform them into authentic Rhodes Island tactical artwork.",
    features: [
      {
        label: "Authentic Terra Design",
        description:
          "Create characters that perfectly capture Arknights' distinctive art style and world-building, from diverse races to tactical gear, designed to fit seamlessly into Terra's dystopian setting.",
      },
      {
        label: "Class System Integration",
        description:
          "Prompts are optimized for all Operator classes and Arts abilities — from Guard combat skills to Medic healing arts — helping you create balanced and authentic Operators.",
      },
      {
        label: "Rapid Operator Creation",
        description:
          "Generate professional-quality Arknights characters in seconds, perfect for tactical planning, fan projects, or expanding your Rhodes Island roster.",
      },
      {
        label: "Detailed Character Artwork",
        description:
          "Our AI produces high-resolution Operator designs with intricate details, from originium crystals to tactical equipment and racial features.",
      },
      {
        label: "Multiple Deployment Options",
        description:
          "Generate several character variations per prompt, allowing you to explore different classes and tactical roles before finalizing your Operator.",
      },
      {
        label: "Complete Operator Profile",
        description:
          "Create comprehensive characters including backstories, Arts abilities, infection status, and tactical specializations that fit Arknights' complex world.",
      },
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    description: "Have another question? Contact us at",
    contactEmail: "support@ocmaker.app",
    faqs: [
      {
        question: "What is Arknights OC Maker and how does it work?",
        answer:
          "Arknights OC Maker is an AI tool specialized for creating Arknights Operators. Describe your character's appearance, class, and abilities, and our AI generates artwork matching the game's distinctive tactical aesthetic.",
      },
      {
        question: "How can I create better Arknights Operators?",
        answer:
          "Include specific Arknights elements like Operator classes, racial features, Arts abilities, infection status, and tactical gear. The more you incorporate the game's lore and mechanics, the more authentic your Operator will be.",
      },
      {
        question: "Is Arknights OC Maker free to use?",
        answer:
          "Yes, Arknights OC Maker offers free character generation with basic features. Premium plans provide faster generation, additional classes, and more customization options.",
      },
      {
        question: "What makes the Operator designs look authentic?",
        answer:
          "Our AI understands Arknights' complex world-building, from the diverse races of Terra to the tactical nature of Rhodes Island operations, ensuring characters fit the game's aesthetic and lore.",
      },
      {
        question: "Can I use my Arknights OC for fan content?",
        answer:
          "Absolutely! Characters created with Arknights OC Maker are yours to use in fan fiction, artwork, roleplay, or any creative project related to the Arknights universe.",
      },
      {
        question: "Do I need an account to create Operators?",
        answer:
          "No registration required for basic use. However, creating an account lets you save your Operators, track generation history, and access premium tactical features.",
      },
      {
        question: "Can I create different types of Operators and races?",
        answer:
          "Yes! Create any Operator class with any Terra race (Sankta, Sarkaz, Liberi, etc.). You can also design Infected or non-Infected characters with various Arts specializations.",
      },
      {
        question: "Are more tactical game OC makers being developed?",
        answer:
          "Yes! We're continuously expanding our collection of game-specific OC makers. Visit ocmaker.app regularly for new additions to our tactical gaming library.",
      },
    ],
  },
  cta: {
    title: "Deploy Your Own Operator",
    description:
      "Design your original Rhodes Island Operator — no drawing skills needed. Just describe, generate, and join the fight against the Catastrophe!",
    primaryButtonText: "Start Creating",
    primaryButtonLink: "#workbench",
    secondaryButtonText: "Explore Characters",
    secondaryButtonLink: "/oc-arts",
  },
};
