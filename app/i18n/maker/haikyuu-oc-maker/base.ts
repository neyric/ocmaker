const basePrompt = `
  WORLD CONTEXT:
  Universe: Haikyu!!
  Setting: Japanese high school volleyball leagues, inter-high tournaments, club rivalries, training camps, college/pro scout attention
  Key Teams: Karasuno, Nekoma, Aoba Johsai, Fukurodani, Shiratorizawa, Inarizaki, MSBY Black Jackals, Schweiden Adlers, national youth camps

  OUTPUT FORMAT:
  Name, School & Year, Position, Signature Playstyle/Weapon, Personality, Rival/Goal, Volleyball Backstory

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Hero",
    description:
      "A determined protagonist representing the heart of Haikyuu!!.",
    prompt:
      "What is your character's name?\nKei Arashi\n\nWhat is their role in Haikyuu!!?\nFrontline hero standing beside the main cast of Haikyuu!!\n\nWhat unique ability or skill do they have?\nMastery over a signature power style that defines Haikyuu!!\n\nWhat is their ultimate goal?\nTo protect their allies and push the story forward\n\nDescribe their personality.\nFearless, hopeful, and fiercely loyal",
  },
  {
    title: "Rival",
    description: "A formidable rival who challenges the heroes of Haikyuu!!.",
    prompt:
      "What is your character's name?\nMira Lynx\n\nHow do they relate to the heroes of Haikyuu!!?\nAn ambitious rival whose ideals clash with the protagonists\n\nWhat powers or techniques set them apart?\nRefined skills reflecting the darker edge of Haikyuu!!\n\nWhat drives them?\nA burning need to prove their philosophy is right\n\nDescribe their personality.\nSharp, proud, and secretly compassionate",
  },
  {
    title: "Mentor",
    description:
      "A seasoned mentor guiding the next generation within Haikyuu!!.",
    prompt:
      "What is your character's name?\nProfessor Daelin Voss\n\nWhat is their role in Haikyuu!!?\nVeteran mentor who prepares new heroes for the trials ahead\n\nWhat knowledge or abilities do they offer?\nDeep expertise in the history and power systems of Haikyuu!!\n\nWhat is their guiding lesson?\nStrength must be balanced with empathy and foresight\n\nDescribe their personality.\nPatient, witty, and unshakeable even in crisis",
  },
];

const ocOptions = [
  {
    title: "Gender",
    key: "gender",
    unique: true,
    data: [
      {
        label: "Boy",
        value: "1boy",
      },
      {
        label: "Girl",
        value: "1girl",
      },
      {
        label: "Non-binary",
        value: "1person",
      },
    ],
  },
  {
    title: "Archetype",
    key: "archetype",
    unique: true,
    data: [
      {
        label: "Hero",
        value: "heroic leader",
      },
      {
        label: "Antihero",
        value: "antihero vigilante",
      },
      {
        label: "Mentor",
        value: "mysterious mentor",
      },
      {
        label: "Strategist",
        value: "brilliant strategist",
      },
      {
        label: "Rival",
        value: "rebellious rival",
      },
      {
        label: "Guardian",
        value: "stoic guardian",
      },
    ],
  },
  {
    title: "Power Theme",
    key: "power_theme",
    data: [
      {
        label: "Elemental magic",
        value: "elemental magic",
      },
      {
        label: "Advanced technology",
        value: "advanced technology",
      },
      {
        label: "Martial arts",
        value: "martial arts",
      },
      {
        label: "Spiritual powers",
        value: "spiritual powers",
      },
      {
        label: "Summoner",
        value: "summoner",
      },
      {
        label: "Tactical genius",
        value: "tactical genius",
      },
    ],
  },
  {
    title: "Outfit Style",
    key: "outfit",
    data: [
      {
        label: "Battle armor",
        value: "battle armor",
      },
      {
        label: "Sleek uniform",
        value: "sleek uniform",
      },
      {
        label: "Casual streetwear",
        value: "casual streetwear",
      },
      {
        label: "Formal attire",
        value: "formal attire",
      },
      {
        label: "Mystic robes",
        value: "mystic robes",
      },
      {
        label: "Futuristic suit",
        value: "futuristic suit",
      },
    ],
  },
  {
    title: "Personality",
    key: "personality",
    data: [
      {
        label: "Optimistic",
        value: "optimistic",
      },
      {
        label: "Stoic",
        value: "stoic",
      },
      {
        label: "Rebellious",
        value: "rebellious",
      },
      {
        label: "Compassionate",
        value: "compassionate",
      },
      {
        label: "Calculating",
        value: "calculating",
      },
      {
        label: "Chaotic good",
        value: "chaotic good",
      },
    ],
  },
  {
    title: "Expression",
    key: "expression",
    unique: true,
    data: [
      {
        label: "Smiling confidence",
        value: "smiling confidence",
      },
      {
        label: "Determined gaze",
        value: "determined gaze",
      },
      {
        label: "Brooding intensity",
        value: "brooding intensity",
      },
      {
        label: "Playful grin",
        value: "playful grin",
      },
      {
        label: "Calm focus",
        value: "calm focus",
      },
      {
        label: "Mysterious smirk",
        value: "mysterious smirk",
      },
    ],
  },
];

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
  meta: {
    title: "Haikyuu!! OC Maker",
    description:
      "Generate your own Haikyuu!! character OC with AI. Create volleyball players, team managers, and rivals with unique playing styles and team dynamics.",
  },
  series: "Haikyuu!!",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Haikyuu!! OC Maker",
      description:
        "Generate your own Haikyuu!! character OC with AI. Create volleyball players, team managers, and rivals with unique playing styles and team dynamics.",
    },
    step: {
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
    examples: {
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
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is Haikyuu!! OC Maker and how does it work?",
          answer:
            "Haikyuu!! OC Maker is an AI tool specialized for creating original volleyball players. Describe your character's position, appearance, and playing style, and our AI generates authentic Haikyuu!!-style artwork.",
        },
        {
          question:
            "How can I create better characters with Haikyuu!! OC Maker?",
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
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
