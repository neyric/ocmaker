const examples = [
  {
    image: "https://cdn.ocmaker.app/example/haikyuu-oc-generated-1.webp",
    prompt:
      "1boy, spiky orange hair, brown eyes, energetic grin, karasuno volleyball uniform, black and orange jersey number 10, jumping pose, single character, upper body, looking at viewer, anime style, gymnasium background",
  },
  {
    image: "https://cdn.ocmaker.app/example/haikyuu-oc-generated-2.webp",
    prompt:
      "1boy, tall with glasses, blonde hair, golden eyes, analytical expression, tsukishima-style, karasuno uniform, middle blocker stance, single character, upper body, looking at viewer, anime style, volleyball court background",
  },
  {
    image: "https://cdn.ocmaker.app/example/haikyuu-oc-generated-3.webp",
    prompt:
      "1girl, ponytail black hair, determined eyes, serious expression, girls volleyball team uniform, manager clipboard, supportive pose, single character, upper body, looking at viewer, anime style, team bench background",
  },
  {
    image: "https://cdn.ocmaker.app/example/haikyuu-oc-generated-4.webp",
    prompt:
      "1boy, silver hair, sharp eyes, confident smirk, rival team uniform, setter position, tossing pose, single character, upper body, looking at viewer, anime style, tournament venue background",
  },
];

export default {
  style: "haikyuu",
  resultBackground: examples[0].image,

  hero: {
    title: "Haikyuu!! OC Maker",
    description:
      "Generate your own Haikyuu!! character OC with AI. Create volleyball players, team managers, and rivals with unique playing styles and team dynamics.",
  },

  howToUse: {
    title: "How to Make Haikyuu!! OC",
    description:
      "Join the intense world of high school volleyball. Follow these steps to design your perfect player or team member.",
    steps: [
      {
        title: "Choose Your Position and Team",
        description:
          "Select your character's volleyball position (Setter, Wing Spiker, Middle Blocker, Libero, or Manager) and team affiliation. Each position has unique skills, playing styles, and court responsibilities.",
      },
      {
        title: "Design Playing Style and Personality",
        description:
          "Describe your character's appearance, special techniques, and volleyball philosophy. Include details about their jumping ability, signature moves, team relationships, and what drives them to play volleyball.",
      },
      {
        title: "Generate Your Volleyball Player",
        description:
          "Click 'Generate Character' to bring your Haikyuu!! OC to life. Choose from multiple AI-generated designs that capture the series' dynamic sports action and passionate team spirit.",
      },
    ],
  },

  example: {
    title: "Volleyball Player Examples",
    description:
      "Discover amazing volleyball players created with text prompts using the Haikyuu!! OC Maker.",
    examples,
  },

  features: {
    title: "What is Haikyuu!! OC Maker?",
    description:
      "Haikyuu!! OC Maker is designed specifically for the volleyball universe. Create authentic players with unique positions, playing styles, and team dynamics that fly high.",
    features: [
      {
        label: "Authentic Sports Anime Style",
        description:
          "Generate characters that perfectly match Haikyuu!!'s dynamic art style, from intense match expressions to team uniforms and athletic body proportions.",
      },
      {
        label: "Position System Integration",
        description:
          "Our AI understands all volleyball positions and their characteristics, ensuring your player's skills, build, and playing style match their court role perfectly.",
      },
      {
        label: "Instant Team Member Creation",
        description:
          "Create passionate volleyball players in seconds, perfect for team rosters, rival schools, or expanding the competitive volleyball scene.",
      },
      {
        label: "High-Quality Action Artwork",
        description:
          "Powered by AI trained on Haikyuu!!'s visual standards, delivering character art that captures the series' energy, determination, and sports intensity.",
      },
      {
        label: "Multiple Playing Styles",
        description:
          "Generate several character interpretations per prompt, exploring different positions, special moves, and team dynamics to find your perfect volleyball player.",
      },
      {
        label: "Volleyball World Integration",
        description:
          "Create characters that naturally fit into Haikyuu!!'s competitive scene, with authentic team cultures, playing philosophies, and tournament ambitions.",
      },
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    description: "Have another question? Contact us at",
    contactEmail: "support@ocmaker.app",
    faqs: [
      {
        question: "What is Haikyuu!! OC Maker and how does it work?",
        answer:
          "Haikyuu!! OC Maker is an AI tool specialized for creating original volleyball players. Describe your character's position, appearance, and playing style, and our AI generates authentic Haikyuu!!-style artwork.",
      },
      {
        question: "How can I create better characters with Haikyuu!! OC Maker?",
        answer:
          "Include specific volleyball elements like positions, signature moves, jumping abilities, team dynamics, and personal motivations. Reference real volleyball techniques and team strategies for more authentic players.",
      },
      {
        question: "Is Haikyuu!! OC Maker free to use?",
        answer:
          "Yes, Haikyuu!! OC Maker offers free character generation with basic features. Premium plans provide faster generation, more team options, and advanced customization tools.",
      },
      {
        question: "What makes Haikyuu!! OC Maker's results so authentic?",
        answer:
          "Our AI is specifically trained on Haikyuu!!'s art style and sports themes, understanding volleyball positions, team dynamics, and the series' distinctive energetic aesthetic.",
      },
      {
        question:
          "Can I use characters created with Haikyuu!! OC Maker commercially?",
        answer:
          "Yes, all original characters you create are yours to use for personal and commercial projects. We don't claim ownership of your player designs or Haikyuu!! OCs.",
      },
      {
        question: "Do I need an account to use Haikyuu!! OC Maker?",
        answer:
          "No account required for basic use. Creating an account allows you to save players, access generation history, and unlock premium volleyball-themed features.",
      },
      {
        question: "Can I create players from different teams and positions?",
        answer:
          "Absolutely! Create players from any team (Karasuno, Nekoma, Aoba Johsai, etc.) in any position. You can also design managers, coaches, or even create your own teams.",
      },
      {
        question: "Are more sports anime OC makers being developed?",
        answer:
          "Yes! We're expanding to include other beloved sports anime series. Follow our updates for new themed OC makers inspired by athletic competition and team spirit.",
      },
    ],
  },

  cta: {
    title: "Fly High on the Court",
    description:
      "Design your ultimate volleyball player — no artistic skills required. Just imagine, describe, and join the thrilling world of high school volleyball.",
    primaryButtonText: "Start Creating",
    primaryButtonLink: "#workbench",
    secondaryButtonText: "Explore Characters",
    secondaryButtonLink: "/oc-arts",
  },
};
