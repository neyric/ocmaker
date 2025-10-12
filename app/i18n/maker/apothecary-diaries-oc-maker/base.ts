const basePrompt = `
  WORLD CONTEXT:
  Universe: The Apothecary Diaries
  Setting: Feudal-inspired imperial capital, Inner Palace intrigue, herbal medicine, poison cases, court politics
  Key Circles: Inner Palace maids and concubines, Imperial Court physicians, apothecaries of the Pleasure District, covert investigators, noble households

  OUTPUT FORMAT:
  Name, Social Status & Workplace, Medical or Investigative Specialty, Allies/Patrons, Personality, Signature Case, Backstory Snapshot

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Inner Palace Herbalist",
    description: "A clever maid who solves poisonings while brewing cures in secret.",
    prompt: `What is your character's name?
Ruolan Mei

What is their social status and workplace?
Low-born maid assigned to the Jade Pavilion of the Inner Palace

What is their medical or investigative specialty?
Diagnosing exotic poisons through taste tests and herbal counteragents

Who are their key allies or patrons?
The Imperial Physician and a sympathetic favored concubine

How would you describe their personality?
Wry, fearless, insatiably curious about court gossip

What signature case made them notable?
Unraveled a slow-acting arsenic plot by decoding tea stains on porcelain cups

Share a brief backstory snapshot.
Sold into service as a child, she smuggled her father's herb scrolls into the palace and now saves lives between chores.`,
  },
  {
    title: "Pleasure District Apothecary",
    description: "A streetwise healer balancing clientele between courtesans and criminals.",
    prompt: `What is your character's name?
Han Suyin

What is their social status and workplace?
Registered apothecary in the Honglan pleasure quarter

What is their medical or investigative specialty?
Formulating antidotes for counterfeit cosmetics and hidden venoms

Who are their key allies or patrons?
A brothel madam, a wandering monk, and a retired assassin

How would you describe their personality?
Bold, sarcastic, fiercely protective of her patients

What signature case made them notable?
Identified mercury-laced rouge before it disfigured a visiting royal

Share a brief backstory snapshot.
Once a runaway concubine trainee, she learned trade secrets from traveling medicinal caravans to win her freedom.`,
  },
  {
    title: "Imperial Court Scrivener",
    description: "A junior scribe who exposes corruption by combing through case records.",
    prompt: `What is your character's name?
Xu Wenyan

What is their social status and workplace?
Scholar-official in the Imperial Medical Bureau archives

What is their medical or investigative specialty?
Cross-referencing ledgers to spot tampered remedies and embezzled supplies

Who are their key allies or patrons?
A reform-minded minister and a reclusive archivist librarian

How would you describe their personality?
Meticulous, soft-spoken, driven by quiet moral outrage

What signature case made them notable?
Proved tonic shipments were replaced with sawdust before reaching the nursery

Share a brief backstory snapshot.
Choosing medicine over politics after the provincial exams, Wenyan believes accurate ledgers save more lives than swords.`,
  },
  {
    title: "Traveling Tea Doctor",
    description: "An itinerant healer who collects gossip with every brew of medicinal tea.",
    prompt: `What is your character's name?
Lan Jiayi

What is their social status and workplace?
Freeborn tea seller roaming between noble estates and rural temples

What is their medical or investigative specialty?
Diagnosing ailments through tea pairings and pulse readings on the road

Who are their key allies or patrons?
Temple monks, farmers' guilds, and a masked opera performer

How would you describe their personality?
Cheerful, persuasive, perfectly at ease among any class

What signature case made them notable?
Unmasked a counterfeit tax collector by spotting arsenic in his jasmine blend

Share a brief backstory snapshot.
Lan apprenticed under her grandmother, hiding remedies in tea leaves while evading corrupt officials and bandits alike.`,
  },
  {
    title: "Royal Forensics Scholar",
    description: "A forensic innovator bringing new deduction techniques to the emperor's court.",
    prompt: `What is your character's name?
Shen Qihong

What is their social status and workplace?
First-rank scholar serving as adjunct examiner in the high court

What is their medical or investigative specialty?
Applying ink powder, fingerprint rubbings, and botanical tracings to crime scenes

Who are their key allies or patrons?
The Crown Prince and a skeptical yet intrigued imperial judge

How would you describe their personality?
Methodical, unflappable, quietly ambitious for reform

What signature case made them notable?
Matched rare pollen to a rival's greenhouse, clearing an innocent noble

Share a brief backstory snapshot.
After witnessing a wrongful conviction in their prefecture, Qihong vowed to fuse scholarship with forensic science.`,
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
    image:
      "https://cdn.ocmaker.app/example/apothecary-oc-maker-generated-1.webp",
    prompt:
      "1girl, long black hair with hair ornaments, amber eyes, clever expression, apothecary diaries style chinese palace dress, medicine pouch, holding herbs, imperial palace setting, anime style, looking at viewer, simple background, upper body",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/apothecary-oc-maker-generated-2.webp",
    prompt:
      "1girl, purple hair in elaborate updo, green eyes, mysterious smile, apothecary diaries style court lady hanfu, jade accessories, fan, elegant pose, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/apothecary-oc-maker-generated-3.webp",
    prompt:
      "1boy, dark hair with topknot, sharp blue eyes, serious expression, apothecary diaries style imperial guard uniform, sword at side, protective stance, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/apothecary-oc-maker-generated-4.webp",
    prompt:
      "1girl, red hair with traditional accessories, golden eyes, mischievous grin, apothecary diaries style servant outfit, carrying tea tray, palace maid, single character, upper body, looking at viewer, anime style, simple background",
  },
];

export default {
  meta: {
    title: "The Apothecary Diaries OC Maker",
    description:
      "Generate your own Apothecary Diaries OC with AI. Create characters, backstories, and visuals in the elegant world of imperial palace intrigue and medicine.",
  },
  series: "The Apothecary Diaries",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "The Apothecary Diaries OC Maker",
      description:
        "Generate your own Apothecary Diaries OC with AI. Create characters, backstories, and visuals in the elegant world of imperial palace intrigue and medicine.",
    },
    step: {
      title: "How to Make Apothecary Diaries OC",
      description:
        "Creating an Apothecary Diaries-style character with OC Maker is easy. Just follow these steps to bring your palace character to life.",
      steps: [
        {
          title: "Describe Your Apothecary Diaries OC",
          description:
            "Fill in the form with your character's basic appearance and personality. For best results, include Apothecary Diaries-style features like traditional Chinese clothing, palace roles, medical knowledge, and the cunning spirit of court intrigue.",
        },
        {
          title: "Add Details and Palace Elements",
          description:
            "Include extra details like their role in the palace (pharmacist, concubine, guard, servant), medical specialties, or connections to palace mysteries. The more your character fits into the imperial court setting, the more authentic the result will be.",
        },
        {
          title: "Generate and Finalize Design",
          description:
            "Click the 'Generate Character' button to create your Apothecary Diaries OC. You'll get several AI-generated designs — pick your favorite to complete your character.",
        },
      ],
    },
    examples: {
      title: "Apothecary Diaries Examples",
      description:
        "Explore Apothecary Diaries characters made from text prompts, created using the Apothecary Diaries OC Maker.",
      examples,
    },
    features: {
      title: "What is Apothecary Diaries OC Maker?",
      description:
        "Apothecary Diaries OC Maker is a version of OC Maker fine-tuned for the world of The Apothecary Diaries. Describe your character, and instantly turn it into imperial palace-style artwork.",
      features: [
        {
          label: "Authentic Palace Character Design",
          description:
            "Create characters that truly capture the elegant atmosphere of The Apothecary Diaries, designed to seamlessly fit into the world of imperial courts, medicine, and palace intrigue.",
        },
        {
          label: "Tailored Prompt Tuning",
          description:
            "Prompts are fine-tuned for Apothecary Diaries aesthetics — from traditional Chinese garments to palace hierarchy — helping you build more convincing characters.",
        },
        {
          label: "Fast Character Generation",
          description:
            "Generate high-quality characters in just seconds, allowing you to focus more on refining ideas and less on waiting.",
        },
        {
          label: "High-Quality Visual Output",
          description:
            "Powered by advanced AI models, Apothecary Diaries OC Maker delivers detailed, high-resolution character images suitable for storytelling, design, or sharing.",
        },
        {
          label: "Choose from Multiple Results",
          description:
            "Generate multiple character options per prompt and select your favorites to finalize as your official Apothecary Diaries OC.",
        },
        {
          label: "Deep Story Integration",
          description:
            "Bring your OC to life with not just visuals, but also compelling backstories, medical knowledge, palace positions, and rich connections to the mystery-solving world of The Apothecary Diaries.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is Apothecary Diaries OC Maker and how does it work?",
          answer:
            "Apothecary Diaries OC Maker is a specialized version of OC Maker, fine-tuned for The Apothecary Diaries universe. Simply describe your character, and our AI will generate palace-style visuals in seconds based on your prompt.",
        },
        {
          question:
            "How can I create better characters with Apothecary Diaries OC Maker?",
          answer:
            "For best results, include Apothecary Diaries-specific traits in your description, such as traditional Chinese clothing details, palace roles, medical tools, or personality traits suited for court life. The more vivid and detailed your input, the more accurate and compelling the output.",
        },
        {
          question: "Is Apothecary Diaries OC Maker free to use?",
          answer:
            "Yes, Apothecary Diaries OC Maker offers free character generation with basic features. For faster results, premium options, and additional control, you can upgrade your plan anytime.",
        },
        {
          question:
            "What makes Apothecary Diaries OC Maker's results so impressive?",
          answer:
            "Apothecary Diaries OC Maker uses cutting-edge AI models fine-tuned for the palace setting, ensuring characters match the distinctive art style and elegant atmosphere of the series.",
        },
        {
          question:
            "Can I use characters made with Apothecary Diaries OC Maker for commercial projects?",
          answer:
            "Yes, any characters you create using Apothecary Diaries OC Maker are yours to use freely for both personal and commercial purposes. We do not claim ownership over your creations.",
        },
        {
          question: "Do I need an account to use Apothecary Diaries OC Maker?",
          answer:
            "No account is required for basic use. However, creating an account lets you save your characters, track generation history, and access more features.",
        },
        {
          question:
            "Can I regenerate or fine-tune the same character in Apothecary Diaries OC Maker?",
          answer:
            "Yes, you can regenerate results from the same prompt or adjust your inputs to refine your character until it fits your vision perfectly.",
        },
        {
          question:
            "Will there be more anime-style OC Makers like Apothecary Diaries OC Maker?",
          answer:
            "Yes! We plan to release more specialized OC Makers tailored for different anime universes. Stay tuned for future updates on ocmaker.app.",
        },
      ],
    },
    cta: {
      title: "Create Your Own Palace Character",
      description:
        "Bring your original Apothecary Diaries character to life — no drawing skills needed. Just describe, generate, and explore the world of palace mysteries.",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
