const basePrompt = `
  WORLD CONTEXT:
  Universe: Bleach
  Tone: Stay faithful to Bleach's worldbuilding, factions, abilities, and storytelling style.

  OUTPUT FORMAT:
  Name, Role, Appearance, Abilities, Personality, Backstory

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Hero",
    description: "A determined protagonist representing the heart of Bleach.",
    prompt:
      "What is your character's name?\nKei Arashi\n\nWhat is their role in Bleach?\nFrontline hero standing beside the main cast of Bleach\n\nWhat unique ability or skill do they have?\nMastery over a signature power style that defines Bleach\n\nWhat is their ultimate goal?\nTo protect their allies and push the story forward\n\nDescribe their personality.\nFearless, hopeful, and fiercely loyal",
  },
  {
    title: "Rival",
    description: "A formidable rival who challenges the heroes of Bleach.",
    prompt:
      "What is your character's name?\nMira Lynx\n\nHow do they relate to the heroes of Bleach?\nAn ambitious rival whose ideals clash with the protagonists\n\nWhat powers or techniques set them apart?\nRefined skills reflecting the darker edge of Bleach\n\nWhat drives them?\nA burning need to prove their philosophy is right\n\nDescribe their personality.\nSharp, proud, and secretly compassionate",
  },
  {
    title: "Mentor",
    description: "A seasoned mentor guiding the next generation within Bleach.",
    prompt:
      "What is your character's name?\nProfessor Daelin Voss\n\nWhat is their role in Bleach?\nVeteran mentor who prepares new heroes for the trials ahead\n\nWhat knowledge or abilities do they offer?\nDeep expertise in the history and power systems of Bleach\n\nWhat is their guiding lesson?\nStrength must be balanced with empathy and foresight\n\nDescribe their personality.\nPatient, witty, and unshakeable even in crisis",
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
    image: "https://cdn.ocmaker.app/example/bleach-oc-maker-generated-1.webp",
    prompt:
      "1boy, white hair with dark tips, silver eyes, shinigami captain, serious expression, black shihakusho with white haori, captain's badge, zanpakuto at waist, spiritual pressure aura, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/bleach-oc-maker-generated-2.webp",
    prompt:
      "1girl, long purple hair, golden eyes, hollow mask fragment on head, arrancar outfit, mischievous smile, white uniform with black trim, katana zanpakuto, cero energy gathering, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/bleach-oc-maker-generated-3.webp",
    prompt:
      "1boy, spiky orange hair, blue eyes, substitute shinigami, determined expression, modified shihakusho, oversized zanpakuto on back, spiritual energy flowing, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/bleach-oc-maker-generated-4.webp",
    prompt:
      "1girl, short black hair with side bangs, violet eyes, soul reaper lieutenant, calm expression, shihakusho with lieutenant badge, dual zanpakuto, kido spell effects, single character, upper body, looking at viewer, anime style, simple background",
  },
];

export default {
  meta: {
    title: "Bleach OC Maker",
    description:
      "Generate your own Bleach OC with AI. Create unique Soul Reapers, Arrancars, Vizards, and other characters for the Soul Society universe.",
  },
  series: "Bleach",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Bleach OC Maker",
      description:
        "Generate your own Bleach OC with AI. Create unique Soul Reapers, Arrancars, Vizards, and other characters for the Soul Society universe.",
    },
    step: {
      title: "How to Make Bleach OC",
      description:
        "Creating a Bleach-style character with OC Maker is simple. Follow these steps to design your own Soul Reaper or Hollow.",
      steps: [
        {
          title: "Describe Your Bleach Character",
          description:
            "Fill in the form with your character's appearance and traits. For authentic results, include Bleach-specific elements like shihakusho robes, zanpakuto weapons, spiritual pressure effects, or hollow masks.",
        },
        {
          title: "Add Spiritual Powers and Division",
          description:
            "Include details about your character's role (Soul Reaper, Arrancar, Quincy, etc.), their division or rank, zanpakuto type, and special abilities like Bankai or Resurrección. The more specific to Bleach's universe, the better the result.",
        },
        {
          title: "Generate and Select Your Design",
          description:
            "Click 'Generate Character' to create your Bleach OC. You'll receive multiple AI-generated designs — choose your favorite to finalize your character for the Soul Society.",
        },
      ],
    },
    examples: {
      title: "Bleach Character Examples",
      description:
        "Explore Bleach characters created from text prompts using the Bleach OC Maker.",
      examples,
    },
    features: {
      title: "What is Bleach OC Maker?",
      description:
        "Bleach OC Maker is a specialized version of OC Maker designed for the Bleach universe. Describe your character and instantly transform it into authentic Bleach-style artwork.",
      features: [
        {
          label: "Authentic Soul Society Design",
          description:
            "Create characters that perfectly capture the distinctive art style of Bleach, from Soul Reapers to Arrancars, designed to fit seamlessly into Tite Kubo's universe.",
        },
        {
          label: "Specialized Bleach Prompts",
          description:
            "Prompts are optimized for Bleach aesthetics — from shihakusho uniforms to zanpakuto designs — helping you create more convincing Soul Society characters.",
        },
        {
          label: "Instant Character Generation",
          description:
            "Generate high-quality Bleach characters in seconds, allowing you to quickly iterate and perfect your original character design.",
        },
        {
          label: "High-Resolution Artwork",
          description:
            "Powered by advanced AI technology, Bleach OC Maker produces detailed, high-quality character images perfect for fanart, roleplay, or creative projects.",
        },
        {
          label: "Multiple Design Options",
          description:
            "Generate several character variations per prompt and select your favorites to establish your official Bleach OC design.",
        },
        {
          label: "Complete Character Creation",
          description:
            "Design not just the appearance but also the spiritual powers, zanpakuto abilities, and backstory elements that make your Bleach OC unique and memorable.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is Bleach OC Maker and how does it work?",
          answer:
            "Bleach OC Maker is a specialized AI tool for creating original Bleach characters. Simply describe your character's appearance and abilities, and our AI will generate authentic Bleach-style artwork based on your description.",
        },
        {
          question: "How can I create better Bleach characters?",
          answer:
            "Include specific Bleach elements like division numbers, zanpakuto names, spiritual pressure colors, or hollow mask designs. The more detailed and universe-specific your description, the more authentic your character will look.",
        },
        {
          question: "Is Bleach OC Maker free to use?",
          answer:
            "Yes, Bleach OC Maker offers free character generation with basic features. Premium plans provide faster generation, more options, and additional customization features.",
        },
        {
          question: "What makes Bleach OC Maker's results so accurate?",
          answer:
            "Our AI models are fine-tuned to understand Bleach's unique art style, from the distinctive character designs to the spiritual effects, ensuring your OC fits perfectly into the Soul Society.",
        },
        {
          question: "Can I use my Bleach OC for fan fiction or art projects?",
          answer:
            "Absolutely! Characters you create with Bleach OC Maker are yours to use freely for personal projects, fan fiction, artwork, or any creative endeavor you have in mind.",
        },
        {
          question: "Do I need to sign up to use Bleach OC Maker?",
          answer:
            "No registration required for basic use. However, creating an account allows you to save characters, access generation history, and unlock additional features.",
        },
        {
          question:
            "Can I create different types of Bleach characters (Soul Reapers, Arrancars, etc.)?",
          answer:
            "Yes! Bleach OC Maker can generate all types of Bleach characters including Soul Reapers, Arrancars, Vizards, Fullbringers, and Quincy. Just specify the type in your description.",
        },
        {
          question: "Will you add more anime OC makers like this?",
          answer:
            "Yes! We're continuously expanding our collection of anime-specific OC makers. Check ocmaker.app regularly for new additions to our growing library.",
        },
      ],
    },
    cta: {
      title: "Create Your Own Bleach Character",
      description:
        "Design your original Soul Reaper or Arrancar — no drawing skills required. Just describe, generate, and join the Soul Society.",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
