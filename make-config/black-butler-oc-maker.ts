const examples = [
  {
    image: "https://cdn.ocmaker.app/example/black-butler-oc-generated-1.webp",
    prompt:
      "1boy, silver hair, crimson eyes, mysterious smile, demon butler outfit, black tailcoat with white gloves, contract seal visible, elegant pose, single character, upper body, looking at viewer, anime style, victorian mansion background",
  },
  {
    image: "https://cdn.ocmaker.app/example/black-butler-oc-generated-2.webp",
    prompt:
      "1girl, long purple hair, blue eyes, noble expression, victorian lady dress, elaborate ballgown with lace, jewelry accessories, fan in hand, aristocratic pose, single character, upper body, looking at viewer, anime style, gothic atmosphere",
  },
  {
    image: "https://cdn.ocmaker.app/example/black-butler-oc-generated-3.webp",
    prompt:
      "1boy, blonde hair, green eyes, cheerful grin, phantomhive servant uniform, gardener outfit with straw hat, pruning shears, friendly stance, single character, upper body, looking at viewer, anime style, english garden background",
  },
  {
    image: "https://cdn.ocmaker.app/example/black-butler-oc-generated-4.webp",
    prompt:
      "1girl, red hair in bun, amber eyes, serious expression, maid uniform, victorian maid dress with apron, cleaning supplies, dutiful pose, single character, upper body, looking at viewer, anime style, manor interior background",
  },
];

export default {
  style: "black-butler",
  resultBackground: examples[0].image,

  hero: {
    title: "Black Butler OC Maker",
    description:
      "Generate your own Black Butler character OC with AI. Create demon butlers, noble aristocrats, servants, and reapers in the Victorian Gothic universe style.",
  },

  howToUse: {
    title: "How to Make Black Butler OC",
    description:
      "Enter the dark elegance of Victorian England with supernatural secrets. Follow these steps to design your Gothic character.",
    steps: [
      {
        title: "Choose Your Character Role",
        description:
          "Select your character's position: Demon butler, Noble aristocrat, Phantomhive servant, Grim Reaper, or Circus performer. Each role has distinct Victorian fashion, supernatural abilities, and social standings.",
      },
      {
        title: "Design Appearance and Background",
        description:
          "Describe your character's Gothic Victorian appearance, including their attire, supernatural traits, and dark secrets. Add details about contracts, noble titles, or supernatural origins for authenticity.",
      },
      {
        title: "Generate Your Victorian Character",
        description:
          "Click 'Generate Character' to bring your Black Butler OC to life. Choose from multiple AI-generated designs that capture the series' dark elegance and Gothic Victorian aesthetic.",
      },
    ],
  },

  example: {
    title: "Black Butler Character Examples",
    description:
      "Discover elegant Gothic characters created with text prompts using the Black Butler OC Maker.",
    examples,
  },

  features: {
    title: "What is Black Butler OC Maker?",
    description:
      "Black Butler OC Maker is designed specifically for the Victorian Gothic universe. Create authentic characters with dark elegance, supernatural elements, and aristocratic themes.",
    features: [
      {
        label: "Authentic Gothic Victorian Style",
        description:
          "Generate characters that perfectly match Black Butler's distinctive Gothic aesthetic, from elaborate Victorian fashion to supernatural demon features and dark atmospheric elements.",
      },
      {
        label: "Social Hierarchy Integration",
        description:
          "Our AI understands Victorian social structures, servant roles, noble rankings, and supernatural hierarchies, ensuring your character fits authentically into the dark Victorian world.",
      },
      {
        label: "Instant Gothic Creation",
        description:
          "Create stunning Black Butler characters in seconds, perfect for manor mysteries, demon contracts, or expanding the Victorian supernatural society.",
      },
      {
        label: "High-Quality Dark Artwork",
        description:
          "Powered by AI trained on Black Butler's visual standards, delivering character art that captures the series' blend of elegance, darkness, and Victorian refinement.",
      },
      {
        label: "Multiple Role Variations",
        description:
          "Generate several character interpretations per prompt, exploring different social positions, supernatural abilities, and Victorian fashion styles to find your perfect design.",
      },
      {
        label: "Victorian London Integration",
        description:
          "Create characters that naturally fit into Black Butler's supernatural Victorian England, with authentic period fashion, dark secrets, and Gothic themes.",
      },
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    description: "Have another question? Contact us at",
    contactEmail: "support@ocmaker.app",
    faqs: [
      {
        question: "What is Black Butler OC Maker and how does it work?",
        answer:
          "Black Butler OC Maker is an AI tool specialized for creating original Black Butler characters. Describe your character's role, Victorian appearance, and supernatural traits, and our AI generates authentic Gothic artwork.",
      },
      {
        question:
          "How can I create better characters with Black Butler OC Maker?",
        answer:
          "Include specific Black Butler elements like demon contracts, Victorian fashion details, servant positions, noble titles, or Grim Reaper duties. The more Gothic Victorian details you include, the more authentic your character will be.",
      },
      {
        question: "Is Black Butler OC Maker free to use?",
        answer:
          "Yes, Black Butler OC Maker offers free character generation with basic features. Premium plans provide faster generation, more role options, and advanced Gothic customization tools.",
      },
      {
        question: "What makes Black Butler OC Maker's results so authentic?",
        answer:
          "Our AI is specifically trained on Black Butler's art style and Victorian Gothic themes, understanding period fashion, supernatural elements, and the series' distinctive dark elegance.",
      },
      {
        question:
          "Can I use characters created with Black Butler OC Maker commercially?",
        answer:
          "Yes, all original characters you create are yours to use for personal and commercial projects. We don't claim ownership of your Victorian character designs or Black Butler OCs.",
      },
      {
        question: "Do I need an account to use Black Butler OC Maker?",
        answer:
          "No account required for basic use. Creating an account allows you to save characters, access generation history, and unlock premium Victorian Gothic features.",
      },
      {
        question: "Can I create different types of Black Butler characters?",
        answer:
          "Absolutely! Create demon butlers, noble lords and ladies, Phantomhive servants, Grim Reapers, circus performers, or members of the underworld. Mix Victorian roles and supernatural elements freely.",
      },
      {
        question: "Are more Gothic anime OC makers being developed?",
        answer:
          "Yes! We're expanding to include other Gothic and Victorian-themed anime series. Follow our updates for new themed OC makers inspired by dark elegance and supernatural mysteries.",
      },
    ],
  },

  cta: {
    title: "Seal Your Dark Contract",
    description:
      "Design your ultimate Black Butler character — no artistic skills required. Just imagine, describe, and enter the Gothic elegance of Victorian England.",
    primaryButtonText: "Start Creating",
    primaryButtonLink: "#workbench",
    secondaryButtonText: "Explore Characters",
    secondaryButtonLink: "/oc-arts",
  },
};
