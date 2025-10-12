const basePrompt = `
  WORLD CONTEXT:
  Universe: League of Legends / Runeterra
  Setting: Regions like Demacia, Noxus, Piltover & Zaun, Ionia, Targon, Shurima, Freljord, Bilgewater, Shadow Isles; champions, ascended beings, rune magic
  Key Factions: League champions, Iron Order, Noxian military, Piltover inventors, Zaun chem-barons, Ionian monasteries, Void incursions, Bandle City yordles

  OUTPUT FORMAT:
  Name, Region/Faction, Class or Combat Role, Ability Kit Theme, Personality, Ultimate Goal, Lore Backstory

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Demacian Lightbearer",
    description: "A ranger-knight channeling prism magic to protect refugees.",
    prompt: `What is your character's name?
Seren Caelum

Which region or faction do they hail from?
Demacia

What is their class or combat role?
Support marksman

What is the theme of their ability kit?
Prismatic arrows creating shielded light corridors

How would you describe their personality?
Honorable, compassionate, protective

What ultimate goal drives them?
To prove Demacia can embrace magic responsibly

Share a lore backstory snapshot.
Smuggled persecuted mages to safety and formed a coalition with Lux to reform Demacian law.`,
  },
  {
    title: "Noxian Bladestorm",
    description: "An exile assassin weaving chain blades through warzones.",
    prompt: `What is your character's name?
Varrox

Which region or faction do they hail from?
Noxus

What is their class or combat role?
Fighter-assassin

What is the theme of their ability kit?
Chain hooks that siphon resolve from enemies

How would you describe their personality?
Cold, tactical, secretly honorable

What ultimate goal drives them?
To dethrone the warlord who massacred his warband

Share a lore backstory snapshot.
Betrayed during the Ionian campaign, he now leads a covert rebellion of exiled legionnaires.`,
  },
  {
    title: "Piltover Artificer",
    description: "A Yordle inventor piloting a mech tuned for crowd control.",
    prompt: `What is your character's name?
Tinks

Which region or faction do they hail from?
Piltover & Zaun

What is their class or combat role?
Tank support

What is the theme of their ability kit?
Steam-powered mech with magnetic shield pulses

How would you describe their personality?
Playful, ingenious, easily distracted

What ultimate goal drives them?
To build a cross-city transit system safer than Hextech portals

Share a lore backstory snapshot.
Quit working for the Chem-Barons after witnessing Zaunite workers exploited, now protects protest marches.`,
  },
  {
    title: "Ionia Spirit Dancer",
    description: "A guardian weaving spirit blossoms into razor-sharp ribbons.",
    prompt: `What is your character's name?
Hana Fuyori

Which region or faction do they hail from?
Ionia

What is their class or combat role?
Enchanter mage

What is the theme of their ability kit?
Spirit blossom ribbons that heal allies and bind foes

How would you describe their personality?
Serene, empathetic, resolute

What ultimate goal drives them?
To heal the Navori forests scarred by war

Share a lore backstory snapshot.
Guided Yasuo's refugees through the Spirit Blossom festival, earning the favor of the spirits.`,
  },
  {
    title: "Shuriman Ascendant",
    description: "An ascended guardian commanding sandstorm constructs.",
    prompt: `What is your character's name?
Azareth

Which region or faction do they hail from?
Shurima

What is their class or combat role?
Mage bruiser

What is the theme of their ability kit?
Sandstorm constructs that shift between offense and defense

How would you describe their personality?
Regal, patient, unwavering

What ultimate goal drives them?
To restore the buried libraries beneath the Sun Disc

Share a lore backstory snapshot.
Was an archivist chosen by Azir's magic to awaken and protect Shurima's lost history from the Ascended betrayers.`,
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
    image: "https://cdn.ocmaker.app/example/lol-oc-generated-1.webp",
    prompt:
      "1boy, bright orange hair, navy eyes, enthusiastic grin, League of Legends explorer outfit, compass, adventurous pose, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
  {
    image: "https://cdn.ocmaker.app/example/lol-oc-generated-2.webp",
    prompt:
      "1man, short black hair, red eyes, fierce expression, heavy armor, massive battle axe, imposing stance, muscular build, single character, upper body, looking down, anime style, dark background, dramatic lighting",
  },
  {
    image: "https://cdn.ocmaker.app/example/lol-oc-generated-3.webp",
    prompt:
      "1girl, blonde hair, blue eyes, cheerful expression, silver and blue mage armor, glowing staff, light magic, radiant aura, dynamic pose, single character, upper body, looking at viewer, anime style, magical background, sparkles",
  },
  {
    image: "https://cdn.ocmaker.app/example/lol-oc-generated-4.webp",
    prompt:
      "1man, brown hair, ponytail, sharp eyes, serious expression, blue samurai armor, katana on back, wind motif, loose scarf, single character, upper body, looking to the side, anime style, dramatic lighting, simple background",
  },
];

export default {
  meta: {
    title: "League of Legends OC Maker",
    description:
      "Create your own League of Legends champion OC with AI. Design unique abilities, champion roles, and legendary backstories in the world of Runeterra.",
  },
  series: "League of Legends",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "League of Legends OC Maker",
      description:
        "Create your own League of Legends champion OC with AI. Design unique abilities, champion roles, and legendary backstories in the world of Runeterra.",
    },
    step: {
      title: "How to Make League of Legends OC",
      description:
        "Creating your League champion is straightforward. Follow these steps to design your perfect champion for the Rift.",
      steps: [
        {
          title: "Choose Your Champion Role",
          description:
            "Start by defining your champion's role: mage, assassin, marksman, tank, support, or fighter. Consider their position on the Rift and playstyle that fits your vision.",
        },
        {
          title: "Design Abilities and Appearance",
          description:
            "Describe your champion's unique abilities, weapon choice, and visual design. Think about their region of origin in Runeterra and how it influences their powers and aesthetics.",
        },
        {
          title: "Generate Your Champion",
          description:
            "Click 'Generate Character' to bring your League champion to life. Select from multiple AI-generated designs to perfect your champion's appearance and style.",
        },
      ],
    },
    examples: {
      title: "League of Legends Examples",
      description:
        "Explore diverse champion designs created with text prompts using the League of Legends OC Maker.",
      examples,
    },
    features: {
      title: "What is League of Legends OC Maker?",
      description:
        "League of Legends OC Maker is tailored specifically for Runeterra's universe. Create authentic champions with distinct roles, abilities, and regional aesthetics.",
      features: [
        {
          label: "Authentic Champion Design",
          description:
            "Generate characters that capture League's distinctive art style, from magical abilities to champion-specific equipment and regional influences.",
        },
        {
          label: "Role-Based Character Creation",
          description:
            "Our AI understands the five champion roles and their visual distinctions, ensuring your character fits perfectly into League's gameplay framework.",
        },
        {
          label: "Instant Champion Generation",
          description:
            "Create professional-quality champion designs in seconds, allowing you to focus on developing abilities, lore, and strategic gameplay concepts.",
        },
        {
          label: "High-Quality Game Art",
          description:
            "Powered by AI trained on League's visual standards, delivering champion art that matches the game's iconic style and quality expectations.",
        },
        {
          label: "Multiple Design Options",
          description:
            "Generate various champion interpretations per prompt, exploring different visual approaches, equipment choices, and ability representations.",
        },
        {
          label: "Runeterra Lore Integration",
          description:
            "Create champions that seamlessly fit into League's rich world, with authentic regional influences, magical systems, and cultural aesthetics.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is League of Legends OC Maker and how does it work?",
          answer:
            "League of Legends OC Maker is an AI tool specialized for creating original League champions. Describe your champion's role, abilities, and appearance, and our AI generates authentic League-style artwork.",
        },
        {
          question:
            "How can I create better champions with League of Legends OC Maker?",
          answer:
            "Include specific role details (mage, ADC, support, etc.), regional origins (Demacia, Noxus, Ionia), and ability types. The more League-specific details you provide, the more authentic your champion will look.",
        },
        {
          question: "Is League of Legends OC Maker free to use?",
          answer:
            "Yes, League of Legends OC Maker offers free champion generation with essential features. Premium plans provide faster generation, more variations, and advanced customization options.",
        },
        {
          question:
            "What makes League of Legends OC Maker's results so accurate?",
          answer:
            "Our AI is specifically trained on League's visual style, understanding champion design principles, role distinctions, and Runeterra's aesthetic conventions.",
        },
        {
          question:
            "Can I use champions created with League of Legends OC Maker commercially?",
          answer:
            "Yes, all original champions you create are yours to use for personal and commercial projects. We don't claim ownership of your character designs.",
        },
        {
          question: "Do I need an account to use League of Legends OC Maker?",
          answer:
            "No account required for basic use. Creating an account allows you to save champions, track generation history, and access premium features.",
        },
        {
          question: "Can I regenerate or modify my League champion designs?",
          answer:
            "Absolutely! You can regenerate with the same prompt for variations or adjust your description to refine your champion until it perfectly matches your gameplay vision.",
        },
        {
          question: "Will you add more MOBA-style OC Makers?",
          answer:
            "Yes! We're expanding to include other MOBA and gaming universes. Stay updated on new themed OC Makers through our announcements.",
        },
      ],
    },
    cta: {
      title: "Create Your League Champion",
      description:
        "Design the ultimate League of Legends champion — no artistic experience needed. Just envision, describe, and generate your champion.",
      btns: {
        start: "Start Creating",
        explore: "Explore Champions",
      },
    },
  },
};
