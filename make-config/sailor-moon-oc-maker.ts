const examples = [
  {
    image: "https://cdn.ocmaker.app/example/sailor-moon-oc-generated-1.webp",
    prompt:
      "1girl, long blonde hair with twin tails, blue eyes, determined expression, sailor guardian uniform, blue and white sailor outfit, tiara with gem, transformation brooch, action pose, single character, upper body, looking at viewer, anime style, starry background",
  },
  {
    image: "https://cdn.ocmaker.app/example/sailor-moon-oc-generated-2.webp",
    prompt:
      "1girl, short purple hair, violet eyes, mysterious smile, dark kingdom uniform, black and purple villain outfit, dark crystal accessories, elegant pose, single character, upper body, looking at viewer, anime style, dark palace background",
  },
  {
    image: "https://cdn.ocmaker.app/example/sailor-moon-oc-generated-3.webp",
    prompt:
      "1girl, medium pink hair, green eyes, gentle expression, princess dress, silver millennium gown, moon kingdom jewelry, crystal staff, graceful pose, single character, upper body, looking at viewer, anime style, moon palace background",
  },
  {
    image: "https://cdn.ocmaker.app/example/sailor-moon-oc-generated-4.webp",
    prompt:
      "1girl, wavy red hair, amber eyes, confident wink, outer senshi uniform, unique sailor outfit design, planet symbols, transformation wand, heroic stance, single character, upper body, looking at viewer, anime style, cosmic background",
  },
];

export default {
  style: "sailor-moon",
  resultBackground: examples[0].image,

  hero: {
    title: "Sailor Moon OC Maker",
    description:
      "Generate your own Sailor Moon character OC with AI. Create magical guardians, princesses, and villains in the iconic magical girl universe style.",
  },

  howToUse: {
    title: "How to Make Sailor Moon OC",
    description:
      "Transform into your own Sailor Guardian and protect the world with love and justice. Follow these steps to design your magical warrior.",
    steps: [
      {
        title: "Choose Your Guardian Type",
        description:
          "Decide your character's role: Sailor Guardian (inner or outer senshi), Moon Kingdom princess, Dark Kingdom villain, or civilian ally. Each role has distinct transformation sequences, attack styles, and costume designs.",
      },
      {
        title: "Design Appearance and Powers",
        description:
          "Describe your character's appearance, sailor uniform colors, planetary affiliation, and magical abilities. Include details like transformation items, attack names, and guardian symbols to make your character authentically magical.",
      },
      {
        title: "Generate Your Sailor Guardian",
        description:
          "Click 'Generate Character' to bring your Sailor Moon OC to life. Choose from multiple AI-generated designs that capture the classic magical girl aesthetic and sparkly transformation magic.",
      },
    ],
  },

  example: {
    title: "Sailor Guardian Examples",
    description:
      "Discover amazing magical warriors created with text prompts using the Sailor Moon OC Maker.",
    examples,
  },

  features: {
    title: "What is Sailor Moon OC Maker?",
    description:
      "Sailor Moon OC Maker is designed specifically for the magical girl universe. Create authentic characters with transformation powers, celestial themes, and the power of love and friendship.",
    features: [
      {
        label: "Authentic Magical Girl Style",
        description:
          "Generate characters that perfectly match Sailor Moon's iconic shoujo aesthetic, from sparkly transformations to elegant sailor uniforms and celestial accessories.",
      },
      {
        label: "Guardian System Integration",
        description:
          "Our AI understands the Sailor Guardian hierarchy, planetary associations, and transformation mechanics, ensuring your character fits seamlessly into the magical universe.",
      },
      {
        label: "Instant Magical Creation",
        description:
          "Create stunning Sailor Moon characters in seconds, perfect for magical adventures, protecting Earth, or expanding the Moon Kingdom's guardian roster.",
      },
      {
        label: "High-Quality Shoujo Artwork",
        description:
          "Powered by AI trained on magical girl aesthetics, delivering character art that matches Sailor Moon's distinctive sparkly style and romantic designs.",
      },
      {
        label: "Multiple Transformation Options",
        description:
          "Generate several character interpretations per prompt, exploring different guardian forms, attack poses, and magical transformations to find your perfect design.",
      },
      {
        label: "Moon Kingdom Integration",
        description:
          "Create characters that naturally fit into Sailor Moon's rich mythology, with authentic Silver Millennium influences, planetary powers, and magical themes.",
      },
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    description: "Have another question? Contact us at",
    contactEmail: "support@ocmaker.app",
    faqs: [
      {
        question: "What is Sailor Moon OC Maker and how does it work?",
        answer:
          "Sailor Moon OC Maker is an AI tool specialized for creating original Sailor Moon characters. Describe your guardian's appearance, powers, and planetary affiliation, and our AI generates authentic magical girl artwork.",
      },
      {
        question:
          "How can I create better characters with Sailor Moon OC Maker?",
        answer:
          "Include specific Sailor Moon elements like planetary guardians, transformation items, attack names, Silver Millennium connections, or Dark Kingdom affiliations. The more magical details you include, the better the results.",
      },
      {
        question: "Is Sailor Moon OC Maker free to use?",
        answer:
          "Yes, Sailor Moon OC Maker offers free character generation with core features. Premium plans provide faster generation, more transformation options, and advanced magical customization tools.",
      },
      {
        question: "What makes Sailor Moon OC Maker's results so authentic?",
        answer:
          "Our AI is specifically trained on Sailor Moon's art style and magical girl conventions, understanding transformation sequences, sailor uniform designs, and the series' distinctive shoujo aesthetic.",
      },
      {
        question:
          "Can I use characters created with Sailor Moon OC Maker commercially?",
        answer:
          "Yes, all original characters you create are yours to use for personal and commercial projects. We don't claim ownership of your guardian designs or Sailor Moon OCs.",
      },
      {
        question: "Do I need an account to use Sailor Moon OC Maker?",
        answer:
          "No account required for basic use. Creating an account allows you to save guardians, access generation history, and unlock premium magical girl features.",
      },
      {
        question: "Can I create different types of Sailor Guardians?",
        answer:
          "Absolutely! Create inner senshi, outer senshi, Sailor Starlights, asteroid senshi, or entirely new planetary guardians. You can also design Moon Kingdom royalty, Dark Kingdom villains, or civilian characters.",
      },
      {
        question: "Will you add more magical girl anime OC Makers?",
        answer:
          "Yes! We're expanding to include other beloved magical girl series and shoujo anime. Follow our updates for new themed OC Makers inspired by transformation sequences and friendship power.",
      },
    ],
  },

  cta: {
    title: "Transform Into Your Guardian",
    description:
      "Design your ultimate Sailor Guardian — no artistic skills required. Just imagine, describe, and fight for love and justice in the name of the moon.",
    primaryButtonText: "Start Creating",
    primaryButtonLink: "#workbench",
    secondaryButtonText: "Explore Characters",
    secondaryButtonLink: "/oc-arts",
  },
};
