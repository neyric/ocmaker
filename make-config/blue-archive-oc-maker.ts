const examples = [
  {
    image: "https://cdn.ocmaker.app/example/blue-archive-oc-generated-1.webp",
    prompt:
      "1girl, short black hair with blue highlights, bright blue eyes, cheerful smile, trinity academy uniform, white and blue school outfit, student council armband, school bag, youthful pose, single character, upper body, looking at viewer, anime style, school background",
  },
  {
    image: "https://cdn.ocmaker.app/example/blue-archive-oc-generated-2.webp",
    prompt:
      "1girl, long pink hair, purple eyes, gentle expression, gehenna academy uniform, black and red school outfit, tactical gear accessories, rifle weapon, confident stance, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/blue-archive-oc-generated-3.webp",
    prompt:
      "1girl, twin tails blonde hair, green eyes, energetic smile, millennium academy uniform, high-tech school outfit, tablet computer, futuristic accessories, study pose, single character, upper body, looking at viewer, anime style, classroom background",
  },
  {
    image: "https://cdn.ocmaker.app/example/blue-archive-oc-generated-4.webp",
    prompt:
      "1girl, white hair with cat ears, golden eyes, playful wink, abydos academy uniform, sandy colored school outfit, desert survival gear, determined expression, single character, upper body, looking at viewer, anime style, simple background",
  },
];

export default {
  style: "blue-archive",
  resultBackground: examples[0].image,

  hero: {
    title: "Blue Archive OC Maker",
    description:
      "Generate your own Blue Archive character OC with AI. Create academy students with unique school uniforms, club activities, and youthful adventures in Kivotos.",
  },

  howToUse: {
    title: "How to Make Blue Archive OC",
    description:
      "Creating your Blue Archive student is like enrolling in a new academy. Follow these steps to design your perfect school character.",
    steps: [
      {
        title: "Choose Your Academy and Club",
        description:
          "Select your character's academy (Trinity, Gehenna, Millennium, Abydos, etc.) and club affiliation. Each academy has distinct uniform styles, colors, and cultural characteristics that define your student's appearance.",
      },
      {
        title: "Design Student Profile",
        description:
          "Describe your character's appearance, personality, and school life details. Include information about their hobbies, academic specialties, weapon preferences, and role within their club or student council.",
      },
      {
        title: "Generate Your Student",
        description:
          "Click 'Generate Character' to create your Blue Archive OC. Select from multiple AI-generated designs that capture the game's distinctive school life aesthetic and youthful charm.",
      },
    ],
  },

  example: {
    title: "Blue Archive Student Examples",
    description:
      "Explore amazing academy students created with text prompts using the Blue Archive OC Maker.",
    examples,
  },

  features: {
    title: "What is Blue Archive OC Maker?",
    description:
      "Blue Archive OC Maker is designed specifically for the academic world of Kivotos. Create authentic students with academy affiliations, school uniforms, and youthful adventure themes.",
    features: [
      {
        label: "Authentic Academy Aesthetics",
        description:
          "Generate characters that perfectly capture Blue Archive's school life atmosphere, from distinctive academy uniforms to youthful expressions and academic accessories.",
      },
      {
        label: "Academy System Integration",
        description:
          "Our AI understands all major academies and their unique characteristics, ensuring your student fits their chosen school's culture, uniform style, and thematic elements.",
      },
      {
        label: "Instant Student Creation",
        description:
          "Create charming Blue Archive students in seconds, perfect for school scenarios, club activities, or expanding your Kivotos academy roster.",
      },
      {
        label: "High-Quality School Artwork",
        description:
          "Powered by AI trained on Blue Archive's distinctive art style, delivering character designs that match the game's youthful aesthetic and school life atmosphere.",
      },
      {
        label: "Multiple Academy Options",
        description:
          "Generate several character interpretations per prompt, exploring different academies, clubs, and student roles to find your perfect Blue Archive OC design.",
      },
      {
        label: "Kivotos World Integration",
        description:
          "Create characters that naturally fit into Blue Archive's rich academic world, with authentic school cultures, club activities, and student life themes.",
      },
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    description: "Have another question? Contact us at",
    contactEmail: "support@ocmaker.app",
    faqs: [
      {
        question: "What is Blue Archive OC Maker and how does it work?",
        answer:
          "Blue Archive OC Maker is an AI tool specialized for creating original Blue Archive students. Describe your character's academy, appearance, and school activities, and our AI generates authentic Blue Archive-style artwork.",
      },
      {
        question:
          "How can I create better characters with Blue Archive OC Maker?",
        answer:
          "Include specific Blue Archive elements like academy affiliations, uniform details, club memberships, weapon preferences, and personality traits. The more school life details you include, the more authentic your student will be.",
      },
      {
        question: "Is Blue Archive OC Maker free to use?",
        answer:
          "Yes, Blue Archive OC Maker offers free character generation with basic features. Premium plans provide faster generation, more academy options, and advanced customization tools.",
      },
      {
        question: "What makes Blue Archive OC Maker's results so authentic?",
        answer:
          "Our AI is specifically trained on Blue Archive's art style and school setting, understanding academy cultures, uniform designs, and the game's distinctive youthful character aesthetics.",
      },
      {
        question:
          "Can I use characters created with Blue Archive OC Maker commercially?",
        answer:
          "Yes, all original characters you create are yours to use for personal and commercial projects. We don't claim ownership of your student designs or Blue Archive OCs.",
      },
      {
        question: "Do I need an account to use Blue Archive OC Maker?",
        answer:
          "No account required for basic use. Creating an account allows you to save students, access generation history, and unlock premium Blue Archive-themed features.",
      },
      {
        question: "Can I create students from different academies and clubs?",
        answer:
          "Absolutely! Create students from any academy (Trinity, Gehenna, Millennium, Abydos, etc.) with various club affiliations and roles. Mix and match academic specialties and activities freely.",
      },
      {
        question: "Are more school-themed game OC makers being developed?",
        answer:
          "Yes! We're expanding to include other school life games and academic-themed series. Follow our updates for new themed OC makers inspired by educational and youthful settings.",
      },
    ],
  },

  cta: {
    title: "Enroll in Your Academy Adventure",
    description:
      "Design your ultimate Blue Archive student — no artistic skills required. Just imagine, describe, and explore the vibrant school life of Kivotos.",
    primaryButtonText: "Start Creating",
    primaryButtonLink: "#workbench",
    secondaryButtonText: "Explore Characters",
    secondaryButtonLink: "/oc-arts",
  },
};
