const examples = [
  {
    image: "https://cdn.ocmaker.app/example/disney-oc-generateds-1.webp",
    prompt:
      "1girl, flowing auburn hair, bright blue eyes, enchanted forest dress, magical sparkles, kind smile, Disney princess style, woodland animals nearby, looking at viewer, simple background, upper body",
  },
  {
    image: "https://cdn.ocmaker.app/example/disney-oc-generateds-2.webp",
    prompt:
      "1boy, golden blonde hair, charming smile, royal prince outfit, cape, confident pose, Disney prince style, single character, upper body, looking at viewer, castle background, animated style",
  },
  {
    image: "https://cdn.ocmaker.app/example/disney-oc-generateds-3.webp",
    prompt:
      "1girl, curly dark hair with flowers, warm brown eyes, tropical island dress, seashell accessories, adventurous expression, Disney style, ocean background, looking at viewer, upper body",
  },
  {
    image: "https://cdn.ocmaker.app/example/disney-oc-generateds-4.webp",
    prompt:
      "1girl, silver hair in elegant updo, ice blue eyes, winter gown with snowflake patterns, ice magic effects, serene expression, Disney frozen style, looking at viewer, simple background, upper body",
  },
];

export default {
  style: "disney",
  resultBackground: examples[0].image,
  hero: {
    title: "Disney OC Maker",
    description:
      "Create your own Disney OC with AI. Design magical characters, enchanting stories, and timeless adventures in the beloved world of Disney animation.",
  },
  howToUse: {
    title: "How to Make Disney OC",
    description:
      "Creating your Disney character is as magical as a fairy tale. Follow these steps to bring your enchanting character to life.",
    steps: [
      {
        title: "Choose Your Character Type",
        description:
          "Decide if your character is a princess, prince, villain, sidekick, or magical creature. Consider their role in the Disney universe and what makes them special.",
      },
      {
        title: "Design Magical Appearance",
        description:
          "Describe your character's appearance, magical abilities, and signature outfit. Include Disney-style elements like flowing hair, expressive eyes, and enchanted accessories.",
      },
      {
        title: "Generate Your Disney Magic",
        description:
          "Click 'Generate Character' to create your Disney OC. Choose from multiple AI-generated designs that capture the timeless charm and magic of Disney animation.",
      },
    ],
  },
  example: {
    title: "Disney Examples",
    description:
      "Discover enchanting Disney characters created with text prompts using the Disney OC Maker.",
    examples,
  },
  features: {
    title: "What is Disney OC Maker?",
    description:
      "Disney OC Maker specializes in creating characters with the timeless magic of Disney. Design authentic characters with enchanting stories, magical powers, and heartwarming adventures.",
    features: [
      {
        label: "Authentic Disney Animation Style",
        description:
          "Generate characters that perfectly capture Disney's iconic animation aesthetic, from expressive features to magical elements and enchanting designs.",
      },
      {
        label: "Magical Character Elements",
        description:
          "Our AI understands Disney's magical elements including fairy tale themes, animal companions, magical powers, and the distinctive Disney character charm.",
      },
      {
        label: "Instant Magic Creation",
        description:
          "Create beautiful Disney-style characters in seconds, allowing you to focus on developing their magical stories, adventures, and relationships.",
      },
      {
        label: "High-Quality Animation Art",
        description:
          "Powered by AI trained on Disney's visual standards, delivering character art that captures the warmth, magic, and timeless appeal of Disney animation.",
      },
      {
        label: "Multiple Character Variations",
        description:
          "Generate several character interpretations per prompt, exploring different outfits, magical effects, and classic Disney character expressions.",
      },
      {
        label: "Disney Universe Integration",
        description:
          "Create characters that naturally belong in the Disney universe, with authentic fairy tale elements, magical kingdoms, and heartwarming story potential.",
      },
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    description: "Have another question? Contact us at",
    contactEmail: "support@ocmaker.app",
    faqs: [
      {
        question: "What is Disney OC Maker and how does it work?",
        answer:
          "Disney OC Maker is an AI tool specialized for creating original Disney-style characters. Describe your character's appearance, role, and magical elements, and our AI generates authentic Disney animation-style artwork.",
      },
      {
        question: "How can I create better characters with Disney OC Maker?",
        answer:
          "Include specific Disney elements like magical powers, fairy tale themes, character roles (princess, villain, etc.), and classic Disney aesthetics. The more Disney-specific details you include, the better the results.",
      },
      {
        question: "Is Disney OC Maker free to use?",
        answer:
          "Yes, Disney OC Maker offers free character generation with core features. Premium plans provide faster generation, advanced magical effects, and more customization options.",
      },
      {
        question: "What makes Disney OC Maker's results so magical?",
        answer:
          "Our AI is specifically trained on Disney's animation style and storytelling elements, understanding character design principles, magical aesthetics, and the timeless Disney charm.",
      },
      {
        question:
          "Can I use characters created with Disney OC Maker commercially?",
        answer:
          "Yes, all original characters you create are yours to use for personal and commercial projects. We don't claim ownership of your magical character designs.",
      },
      {
        question: "Do I need an account to use Disney OC Maker?",
        answer:
          "No account required for basic use. Creating an account allows you to save characters, access creation history, and unlock premium magical features.",
      },
      {
        question: "Can I regenerate or modify my Disney character designs?",
        answer:
          "Absolutely! You can regenerate with the same prompt for variations or adjust your description to fine-tune your character until it perfectly captures your magical vision.",
      },
      {
        question: "Will you add more animation-style OC Makers?",
        answer:
          "Yes! We're expanding to include other beloved animation studios and cartoon styles. Follow our updates for new themed OC Makers.",
      },
    ],
  },
  cta: {
    title: "Create Your Disney Magic",
    description:
      "Design your perfect Disney character — no artistic skills required. Just dream, describe, and experience the magic of Disney storytelling.",
    primaryButtonText: "Start Creating",
    primaryButtonLink: "#workbench",
    secondaryButtonText: "Explore Characters",
    secondaryButtonLink: "/oc-arts",
  },
};
