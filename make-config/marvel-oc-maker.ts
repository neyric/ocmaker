const examples = [
  {
    image: "https://cdn.ocmaker.app/example/marvel-oc-generated-1.webp",
    prompt:
      "1girl, red hair, green eyes, confident expression, tactical bodysuit, fingerless gloves, utility belt, determined stance, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
  {
    image: "https://cdn.ocmaker.app/example/marvel-oc-generated-2.webp",
    prompt:
      "1boy, black hair, brown eyes, smug expression, high-tech armor suit, glowing arc reactor, metallic shoulder pads, raised eyebrow, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
  {
    image: "https://cdn.ocmaker.app/example/marvel-oc-generated-3.webp",
    prompt:
      "1man, black hair, blue eyes, calm expression, mystic cloak, glowing magic sigil, goatee, spellcasting gesture, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
  {
    image: "https://cdn.ocmaker.app/example/marvel-oc-generated-4.webp",
    prompt:
      "1man, short black hair, dark brown skin, red goggles, confident expression, futuristic tactical armor, folded wings, strong stance, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
];

export default {
  style: "marvel",
  resultBackground: examples[0].image,
  hero: {
    title: "Marvel OC Maker",
    description:
      "Create your own Marvel-style superhero OC with AI. Design unique superpowers, iconic costumes, and heroic backstories in the legendary Marvel universe.",
  },
  howToUse: {
    title: "How to Make Marvel OC",
    description:
      "Bringing your Marvel superhero to life is simple. Follow these steps to create your ultimate superhero character.",
    steps: [
      {
        title: "Design Your Superhero Identity",
        description:
          "Start with your character's basic appearance, powers, and costume design. Think about classic Marvel elements like colorful suits, distinctive emblems, and signature accessories.",
      },
      {
        title: "Add Powers and Backstory",
        description:
          "Define your character's unique superpowers, origin story, and role in the Marvel universe. Whether they're a mutant, enhanced human, or cosmic being, make their abilities memorable.",
      },
      {
        title: "Generate Your Hero",
        description:
          "Click 'Generate Character' to bring your Marvel OC to life. Choose from multiple AI-generated designs to find the perfect look for your superhero.",
      },
    ],
  },
  example: {
    title: "Marvel Examples",
    description:
      "Discover amazing Marvel-style characters created with text prompts using the Marvel OC Maker.",
    examples,
  },
  features: {
    title: "What is Marvel OC Maker?",
    description:
      "Marvel OC Maker is specifically designed for the Marvel universe. Create authentic superhero characters with iconic costumes, superpowers, and heroic aesthetics.",
    features: [
      {
        label: "Authentic Marvel Superhero Design",
        description:
          "Generate characters that capture the classic Marvel aesthetic, from iconic costume designs to heroic poses that feel right at home in the Marvel universe.",
      },
      {
        label: "Superpower-Focused Creation",
        description:
          "Our AI understands Marvel's diverse range of superpowers, from mutant abilities to cosmic forces, ensuring your character's powers are visually represented.",
      },
      {
        label: "Instant Hero Generation",
        description:
          "Create professional-quality superhero designs in seconds, letting you focus on developing your character's story and abilities.",
      },
      {
        label: "Comic Book Quality Visuals",
        description:
          "Powered by advanced AI trained on Marvel's visual style, delivering high-resolution character art suitable for comics, stories, or fan art.",
      },
      {
        label: "Multiple Design Variations",
        description:
          "Generate several character options per prompt, allowing you to explore different costume designs, poses, and visual interpretations of your hero.",
      },
      {
        label: "Rich Universe Integration",
        description:
          "Create characters that seamlessly fit into the Marvel multiverse, with authentic costumes, powers, and backstories that feel genuinely heroic.",
      },
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    description: "Have another question? Contact us at",
    contactEmail: "support@ocmaker.app",
    faqs: [
      {
        question: "What is Marvel OC Maker and how does it work?",
        answer:
          "Marvel OC Maker is a specialized AI tool for creating original Marvel-style superhero characters. Simply describe your hero's appearance, powers, and costume, and our AI generates authentic Marvel-style artwork.",
      },
      {
        question: "How can I create better superheroes with Marvel OC Maker?",
        answer:
          "Include specific Marvel elements like iconic costume colors, emblems, superpowers, and heroic poses. The more detailed your description of powers and costume design, the better the results.",
      },
      {
        question: "Is Marvel OC Maker free to use?",
        answer:
          "Yes, Marvel OC Maker offers free character generation with core features. Premium plans provide faster generation, more options, and additional customization tools.",
      },
      {
        question: "What makes Marvel OC Maker's results so authentic?",
        answer:
          "Our AI is fine-tuned specifically for Marvel's visual style, understanding the aesthetic principles, color schemes, and design elements that make Marvel characters iconic.",
      },
      {
        question:
          "Can I use characters created with Marvel OC Maker commercially?",
        answer:
          "Yes, all characters you create are yours to use for personal and commercial projects. We don't claim ownership of your original character designs.",
      },
      {
        question: "Do I need an account to use Marvel OC Maker?",
        answer:
          "No account required for basic use. However, creating an account lets you save characters, access generation history, and unlock additional features.",
      },
      {
        question: "Can I modify or regenerate my Marvel character designs?",
        answer:
          "Absolutely! You can regenerate with the same prompt for variations or modify your description to fine-tune your character until it matches your vision perfectly.",
      },
      {
        question: "Will you add more superhero universe OC Makers?",
        answer:
          "Yes! We're expanding to include more superhero universes and comic book styles. Follow us for updates on new themed OC Makers.",
      },
    ],
  },
  cta: {
    title: "Create Your Marvel Superhero",
    description:
      "Unleash your creativity and design the ultimate Marvel hero — no artistic skills required. Just imagine, describe, and generate.",
    primaryButtonText: "Start Creating",
    primaryButtonLink: "#workbench",
    secondaryButtonText: "Explore Heroes",
    secondaryButtonLink: "/oc-arts",
  },
};
