const basePrompt = `
  WORLD CONTEXT:
  Universe: Genshin Impact
  Setting: Teyvat's seven nations, elemental Visions, Archon patronage, Fatui schemes, ancient ruins, floating islands
  Key Factions: Knights of Favonius, Liyue Qixing, Inazuma Shogunate, Sumeru Akademiya, Fontaine justice system, Natlan tribes, Fatui Harbingers, Adventurers' Guild

  OUTPUT FORMAT:
  Name, Nation & Affiliation, Vision/Element & Weapon, Combat Role, Personality, Signature Story Quest, Backstory Snapshot

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Mondstadt Wind Bard",
    description: "A tavern bard whose songs shatter Anemo barriers and hearts alike.",
    prompt: `What is your character's name?
Lysette

Which nation and affiliation do they belong to?
Mondstadt, Favonius-affiliated freelance bard

What Vision/element and weapon do they wield?
Anemo Vision wielding a catalyst

What combat role do they fill?
Supportive burst DPS who shreds enemy resistances

How would you describe their personality?
Free-spirited, teasing, quietly empathetic

What is their signature Story Quest about?
Helps reconnect estranged siblings through a windborne concert tour

Share a backstory snapshot.
Granted a Vision after calming a dragonstorm with her lullaby, she now protects wandering merchants along the high cliffs.`,
  },
  {
    title: "Liyue Harbor Inspector",
    description: "A civil inspector balancing paperwork with geo-construct martial arts.",
    prompt: `What is your character's name?
Qiao Rong

Which nation and affiliation do they belong to?
Liyue Qixing logistics division

What Vision/element and weapon do they wield?
Geo Vision paired with a polearm

What combat role do they fill?
Burst tank providing shields and control

How would you describe their personality?
Methodical, dutiful, caring beneath a stern exterior

What is their signature Story Quest about?
Investigates counterfeit adepti sigils disrupting harbor trade

Share a backstory snapshot.
Survived a Fatui sabotage attempt by raising a geo barrier that saved an entire dockyard crew.`,
  },
  {
    title: "Inazuma Onsen Owner",
    description: "A hot spring owner channeling Electro energy through spa rituals.",
    prompt: `What is your character's name?
Hotaru

Which nation and affiliation do they belong to?
Inazuma, civilian allied with the Shogunate

What Vision/element and weapon do they wield?
Electro Vision embedded in a catalyst fan

What combat role do they fill?
Healer-buffer cleansing debuffs and boosting energy

How would you describe their personality?
Serene, witty, fiercely proud of tradition

What is their signature Story Quest about?
Restores sacred springs corrupted by Tatarigami remnants

Share a backstory snapshot.
Inherited the onsen from her grandmother and earned her Vision when defending it against Vision Hunt Decree agents.`,
  },
  {
    title: "Sumeru Scholar",
    description: "A desert scholar wielding Dendro constructs to solve ecological crises.",
    prompt: `What is your character's name?
Farid al-Hakim

Which nation and affiliation do they belong to?
Sumeru Akademiya, Rtawahist Darshan

What Vision/element and weapon do they wield?
Dendro Vision with a bow

What combat role do they fill?
Off-field enabler spreading Dendro reactions

How would you describe their personality?
Inquisitive, earnest, occasionally scatterbrained

What is their signature Story Quest about?
Assists the Traveler in restoring withering oases

Share a backstory snapshot.
Discovered his Vision when a sandstorm threatened his research camp; the Dendro energy sprouted protective flora.`,
  },
  {
    title: "Fontaine Advocate",
    description: "A legal prodigy whose Hydro constructs cross-examine criminals mid-battle.",
    prompt: `What is your character's name?
Celeste Beaumont

Which nation and affiliation do they belong to?
Fontaine Court of Justice

What Vision/element and weapon do they wield?
Hydro Vision wielding a sword

What combat role do they fill?
Main DPS performing Hydro-infused combos

How would you describe their personality?
Charismatic, principled, delightfully dramatic

What is their signature Story Quest about?
Defends an innocent clockwork automaton accused of sabotage

Share a backstory snapshot.
Received her Vision during a courtroom duel when she proved a false witness guilty using Hydro illusions.`,
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
    image: "https://cdn.ocmaker.app/example/genshin-oc-generated-1.webp",
    prompt:
      "1girl, blonde hair, hazel eyes, playful wink, Genshin Impact bard outfit, musical instrument, cheerful pose, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
  {
    image: "https://cdn.ocmaker.app/example/genshin-oc-generated-2.webp",
    prompt:
      "1girl, turquoise hair, brown eyes, mischievous smile, Genshin Impact thief outfit, treasure map, sneaky pose, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
  {
    image: "https://cdn.ocmaker.app/example/genshin-oc-generated-3.webp",
    prompt:
      "1girl, fiery red hair, yellow eyes, fierce glare, Genshin Impact warrior outfit, dual daggers, aggressive pose, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
  {
    image: "https://cdn.ocmaker.app/example/genshin-oc-generated-4.webp",
    prompt:
      "1boy, silver hair, green eyes, calm expression, Genshin Impact adventurer clothing, bow and quiver, poised stance, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
];

export default {
  meta: {
    title: "Genshin Impact OC Maker",
    description:
      "Create your own Genshin Impact character OC with AI. Design unique elemental abilities, vision powers, and epic adventures in the world of Teyvat.",
  },
  series: "Genshin Impact",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Genshin Impact OC Maker",
      description:
        "Create your own Genshin Impact character OC with AI. Design unique elemental abilities, vision powers, and epic adventures in the world of Teyvat.",
    },
    step: {
      title: "How to Make Genshin Impact OC",
      description:
        "Creating your Teyvat adventurer is simple. Follow these steps to design your perfect character for exploring the seven nations.",
      steps: [
        {
          title: "Choose Your Element and Vision",
          description:
            "Select your character's elemental affinity from the seven elements: Anemo, Geo, Electro, Dendro, Hydro, Pyro, or Cryo. Consider their weapon type and combat style.",
        },
        {
          title: "Design Appearance and Origin",
          description:
            "Describe your character's appearance, clothing, and which nation they're from. Each region has distinct cultural aesthetics that influence character design.",
        },
        {
          title: "Generate Your Adventurer",
          description:
            "Click 'Generate Character' to bring your Genshin OC to life. Choose from multiple AI-generated designs that capture Genshin's signature anime art style.",
        },
      ],
    },
    examples: {
      title: "Genshin Impact Examples",
      description:
        "Discover amazing Teyvat characters created with text prompts using the Genshin Impact OC Maker.",
      examples,
    },
    features: {
      title: "What is Genshin Impact OC Maker?",
      description:
        "Genshin Impact OC Maker is designed specifically for Teyvat's universe. Create authentic characters with elemental powers, regional aesthetics, and adventure-ready designs.",
      features: [
        {
          label: "Authentic Genshin Art Style",
          description:
            "Generate characters that perfectly match Genshin's distinctive anime aesthetic, from character proportions to clothing details and elemental effects.",
        },
        {
          label: "Elemental Vision System",
          description:
            "Our AI understands the seven elements and their visual representations, ensuring your character's elemental powers are accurately depicted.",
        },
        {
          label: "Rapid Character Creation",
          description:
            "Create beautiful Genshin-style characters in seconds, allowing you to focus on developing their backstories, abilities, and role in Teyvat.",
        },
        {
          label: "High-Quality Anime Artwork",
          description:
            "Powered by AI trained on Genshin's visual standards, delivering character art that matches the game's stunning anime aesthetic and quality.",
        },
        {
          label: "Multiple Design Variations",
          description:
            "Generate several character interpretations per prompt, exploring different outfits, poses, and elemental effect visualizations.",
        },
        {
          label: "Teyvat World Integration",
          description:
            "Create characters that naturally fit into Genshin's rich world, with authentic regional influences, elemental lore, and adventure-themed designs.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is Genshin Impact OC Maker and how does it work?",
          answer:
            "Genshin Impact OC Maker is an AI tool specialized for creating original Genshin characters. Describe your character's element, appearance, and origin, and our AI generates authentic Genshin-style artwork.",
        },
        {
          question:
            "How can I create better characters with Genshin Impact OC Maker?",
          answer:
            "Include specific elemental details (Vision type, abilities), regional origins (Mondstadt, Liyue, Inazuma, etc.), and weapon preferences. The more Genshin-specific lore you include, the better the results.",
        },
        {
          question: "Is Genshin Impact OC Maker free to use?",
          answer:
            "Yes, Genshin Impact OC Maker offers free character generation with core features. Premium plans provide faster generation, more options, and advanced customization tools.",
        },
        {
          question:
            "What makes Genshin Impact OC Maker's results so authentic?",
          answer:
            "Our AI is specifically trained on Genshin's art style, understanding character design principles, elemental systems, and Teyvat's cultural aesthetics.",
        },
        {
          question:
            "Can I use characters created with Genshin Impact OC Maker commercially?",
          answer:
            "Yes, all original characters you create are yours to use for personal and commercial projects. We don't claim ownership of your character designs.",
        },
        {
          question: "Do I need an account to use Genshin Impact OC Maker?",
          answer:
            "No account required for basic use. Creating an account allows you to save characters, access generation history, and unlock premium features.",
        },
        {
          question: "Can I regenerate or modify my Genshin character designs?",
          answer:
            "Absolutely! You can regenerate with the same prompt for variations or adjust your description to fine-tune your character until it perfectly fits your vision.",
        },
        {
          question: "Will you add more open-world RPG OC Makers?",
          answer:
            "Yes! We're expanding to include other popular RPG universes and game styles. Follow our updates for new themed OC Makers.",
        },
      ],
    },
    cta: {
      title: "Create Your Genshin Adventure",
      description:
        "Design your ultimate Teyvat adventurer — no artistic skills required. Just imagine, describe, and explore the world of Genshin Impact.",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
