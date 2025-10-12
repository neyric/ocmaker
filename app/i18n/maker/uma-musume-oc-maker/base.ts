const basePrompt = `
  WORLD CONTEXT:
  Universe: Uma Musume
  Tone: Stay faithful to Uma Musume's worldbuilding, factions, abilities, and storytelling style.

  OUTPUT FORMAT:
  Name, Role, Appearance, Abilities, Personality, Backstory

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Hero",
    description:
      "A determined protagonist representing the heart of Uma Musume.",
    prompt:
      "What is your character's name?\nKei Arashi\n\nWhat is their role in Uma Musume?\nFrontline hero standing beside the main cast of Uma Musume\n\nWhat unique ability or skill do they have?\nMastery over a signature power style that defines Uma Musume\n\nWhat is their ultimate goal?\nTo protect their allies and push the story forward\n\nDescribe their personality.\nFearless, hopeful, and fiercely loyal",
  },
  {
    title: "Rival",
    description: "A formidable rival who challenges the heroes of Uma Musume.",
    prompt:
      "What is your character's name?\nMira Lynx\n\nHow do they relate to the heroes of Uma Musume?\nAn ambitious rival whose ideals clash with the protagonists\n\nWhat powers or techniques set them apart?\nRefined skills reflecting the darker edge of Uma Musume\n\nWhat drives them?\nA burning need to prove their philosophy is right\n\nDescribe their personality.\nSharp, proud, and secretly compassionate",
  },
  {
    title: "Mentor",
    description:
      "A seasoned mentor guiding the next generation within Uma Musume.",
    prompt:
      "What is your character's name?\nProfessor Daelin Voss\n\nWhat is their role in Uma Musume?\nVeteran mentor who prepares new heroes for the trials ahead\n\nWhat knowledge or abilities do they offer?\nDeep expertise in the history and power systems of Uma Musume\n\nWhat is their guiding lesson?\nStrength must be balanced with empathy and foresight\n\nDescribe their personality.\nPatient, witty, and unshakeable even in crisis",
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
    image: "https://cdn.ocmaker.app/example/uma-musume-oc-generated-1.webp",
    prompt:
      "1girl, long brown hair with horse ears, golden eyes, uma musume racing uniform, determined expression, racing number bib, starting position pose, competitive spirit, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/uma-musume-oc-generated-2.webp",
    prompt:
      "1girl, twin-tail silver hair, blue eyes with star pupils, horse ears and tail, uma musume school uniform, cheerful smile, victory pose, racing trophy, sparkle effects, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/uma-musume-oc-generated-3.webp",
    prompt:
      "1girl, long black hair in ponytail, red eyes, thoroughbred horse ears, elegant racing silks, serious expression, jockey gear, speed lines effect, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/uma-musume-oc-generated-4.webp",
    prompt:
      "1girl, short pink hair with side braid, green eyes, adorable horse ears, uma musume casual outfit, energetic pose, training gear, sweat effects, determination aura, single character, upper body, looking at viewer, anime style, simple background",
  },
];

export default {
  meta: {
    title: "Uma Musume OC Maker",
    description:
      "Generate your own Uma Musume OC with AI. Create unique horse girl characters with racing abilities, idol performances, and competitive spirit.",
  },
  series: "Uma Musume",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Uma Musume OC Maker",
      description:
        "Generate your own Uma Musume OC with AI. Create unique horse girl characters with racing abilities, idol performances, and competitive spirit.",
    },
    step: {
      title: "How to Make Uma Musume OC",
      description:
        "Creating an Uma Musume character with OC Maker is as exciting as a race. Follow these steps to design your own horse girl champion.",
      steps: [
        {
          title: "Describe Your Horse Girl",
          description:
            "Fill in the form with your character's appearance and personality. For authentic results, include Uma Musume-specific features like horse ears and tail, racing uniforms, school outfits, or idol costumes.",
        },
        {
          title: "Add Racing and Performance Details",
          description:
            "Include details about your character's racing specialty (sprinter, miler, stayer), personality traits, special skills, and whether they excel in racing, idol activities, or both. The more specific to Uma Musume's world, the better.",
        },
        {
          title: "Generate and Cross the Finish Line",
          description:
            "Click 'Generate Character' to create your Uma Musume OC. You'll receive multiple AI-generated designs — choose your favorite to complete your champion horse girl!",
        },
      ],
    },
    examples: {
      title: "Uma Musume Character Examples",
      description:
        "Explore Uma Musume characters created from text prompts using the Uma Musume OC Maker.",
      examples,
    },
    features: {
      title: "What is Uma Musume OC Maker?",
      description:
        "Uma Musume OC Maker is a specialized version of OC Maker designed for the Uma Musume universe. Describe your horse girl and instantly transform her into authentic anime-style racing champion artwork.",
      features: [
        {
          label: "Authentic Uma Musume Design",
          description:
            "Create characters that perfectly capture the distinctive Uma Musume art style, from horse ears and tails to racing uniforms, designed to fit seamlessly into the horse racing world.",
        },
        {
          label: "Racing and Idol Integration",
          description:
            "Prompts are optimized for both racing and idol elements — from competitive gear to performance costumes — helping you create well-rounded Uma Musume characters.",
        },
        {
          label: "Fast Character Creation",
          description:
            "Generate high-quality Uma Musume characters in seconds, perfect for capturing the energy and spirit of competitive horse racing and idol performances.",
        },
        {
          label: "Detailed Horse Girl Artwork",
          description:
            "Our AI produces intricate character designs with authentic Uma Musume features, racing gear, and the distinctive charm of the series' art style.",
        },
        {
          label: "Multiple Design Options",
          description:
            "Generate several character variations per prompt, allowing you to explore different racing specialties and select your champion design.",
        },
        {
          label: "Complete Racing Profile",
          description:
            "Create comprehensive characters including racing abilities, personality traits, and backstories that embody the competitive spirit of Uma Musume.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is Uma Musume OC Maker and how does it work?",
          answer:
            "Uma Musume OC Maker is an AI tool specialized for creating Uma Musume Pretty Derby characters. Describe your horse girl's appearance and abilities, and our AI generates artwork in the series' distinctive style.",
        },
        {
          question: "How can I create better Uma Musume characters?",
          answer:
            "Include specific Uma Musume elements like racing distance preferences, training routines, idol performance skills, and personality traits. Also mention horse breeds, racing strategies, and special abilities for more authentic results.",
        },
        {
          question: "Is Uma Musume OC Maker free to use?",
          answer:
            "Yes, Uma Musume OC Maker offers free character generation with basic features. Premium plans provide faster generation, more customization options, and additional features.",
        },
        {
          question: "What makes the horse girl designs look authentic?",
          answer:
            "Our AI understands Uma Musume's unique blend of horse features and human characteristics, creating characters that maintain the series' distinctive art style and racing theme.",
        },
        {
          question: "Can I use my Uma Musume OC for fan projects?",
          answer:
            "Absolutely! Characters created with Uma Musume OC Maker are yours to use in fan fiction, artwork, roleplay, or any creative project you have in mind.",
        },
        {
          question: "Do I need an account to create characters?",
          answer:
            "No registration required for basic use. However, creating an account allows you to save your horse girls, track generation history, and access premium features.",
        },
        {
          question: "Can I create different types of Uma Musume characters?",
          answer:
            "Yes! Create sprinters, milers, stayers, or long-distance runners. You can also focus on racing champions, idol performers, or characters who excel in both areas.",
        },
        {
          question: "Will there be more game-based OC makers like this?",
          answer:
            "Yes! We're continuously expanding our collection of game-specific OC makers. Check ocmaker.app regularly for new additions to our gaming library.",
        },
      ],
    },
    cta: {
      title: "Create Your Own Uma Musume",
      description:
        "Design your original Uma Musume racing champion — no drawing skills needed. Just describe, generate, and race to victory!",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
