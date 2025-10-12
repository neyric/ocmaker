const basePrompt = `
  WORLD CONTEXT:
  Universe: Honkai: Star Rail
  Setting: Astral Express journeys, Aeons' philosophies, Stellaron crises across worlds like Jarilo-VI, Xianzhou Luofu, Penacony
  Key Factions: Astral Express, Stellaron Hunters, Xianzhou Alliance, IPC, Belobog factions, Interastral Peace Corporation, garden of Recollections

  OUTPUT FORMAT:
  Name, Path Alignment, Combat Role & Element, Signature Technique/Ultimate, Companion/Connection, Personality, Journey Backstory

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Xianzhou Cloudpiercer",
    description: "A daring archer patrolling the Luofu's trade routes from sky barges.",
    prompt: `What is your character's name?
Yue Ling

Which Path are they aligned with?
The Hunt

What combat role and element do they wield?
Single-target DPS wielding Wind element

What is their signature Technique or Ultimate?
Technique "Azure Gale Volley" rains bolts across flying marauders

Who is their key companion or connection?
Travels with an alchemical foxian engineer

How would you describe their personality?
Daring, humorous, treats danger as a dance

Share their journey backstory.
Joined the Cloud Knights after pirates attacked her family's merchant ship; now escorts caravans through star-skies.`,
  },
  {
    title: "Belobog Mediator",
    description: "A Harmony follower bringing warmth to Belobog's undercity.",
    prompt: `What is your character's name?
Anya Volkova

Which Path are they aligned with?
The Harmony

What combat role and element do they wield?
Support buffer with Fire element

What is their signature Technique or Ultimate?
Ultimate "Ember Resonance" grants shields and attack boosts

Who is their key companion or connection?
Close allies with Serval, shares music sessions

How would you describe their personality?
Optimistic, empathetic, refuses to give up on unity

Share their journey backstory.
Orchestrated peace talks between the surface and underworld after the Eternal Freeze by fusing their hymns into a single melody.`,
  },
  {
    title: "Stellaron Hunter Analyst",
    description: "A knowledgeable analyst tracking Stellaron phenomena for Kafka.",
    prompt: `What is your character's name?
Cypher

Which Path are they aligned with?
The Nihility

What combat role and element do they wield?
Debuff specialist wielding Lightning element

What is their signature Technique or Ultimate?
Technique "Entropy Surge" lowers enemy resistance and spreads shock

Who is their key companion or connection?
Corresponds with Silver Wolf via encrypted games

How would you describe their personality?
Mischievous, elusive, obsessed with data

Share their journey backstory.
Once a corporate data miner on Jarilo-VI, they defected after discovering the Stellaron Hunters' true mission.`,
  },
  {
    title: "Astral Express Herbalist",
    description: "A traveling healer cultivating Gardens of Recollection cuttings on the train.",
    prompt: `What is your character's name?
Lira

Which Path are they aligned with?
The Abundance

What combat role and element do they wield?
Healer using Quantum element

What is their signature Technique or Ultimate?
Ultimate "Blooming Reprieve" restores HP and cleanses debuffs

Who is their key companion or connection?
Tends to a sentient bonsai gifted by Yukong

How would you describe their personality?
Kind, serene, quietly teasing

Share their journey backstory.
Boarded the Express to gather rare herbs after a Stellaron outbreak decimated her home garden on Xianzhou.`,
  },
  {
    title: "Penacony Dreamshaper",
    description: "A performer turning dreamscapes into weapons against Nightmare gangsters.",
    prompt: `What is your character's name?
Marlow

Which Path are they aligned with?
The Erudition

What combat role and element do they wield?
AoE caster wielding Imaginary element

What is their signature Technique or Ultimate?
Technique "Curtain Call" traps foes in looping illusions

Who is their key companion or connection?
Partnered with a talking microphone tied to the Family

How would you describe their personality?
Flamboyant, compassionate, loves applause

Share their journey backstory.
Escaped the Family's control by rewriting their scripts mid-performance and now helps the Express free dreamers.`,
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
      "https://cdn.ocmaker.app/example/honkai-star-rail-oc-generated-1.webp",
    prompt:
      "1girl, silver hair, purple eyes, elegant expression, astral express member uniform, space-themed outfit, star motifs, constellation accessories, confident pose, single character, upper body, looking at viewer, anime style, cosmic background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/honkai-star-rail-oc-generated-2.webp",
    prompt:
      "1boy, dark blue hair, golden eyes, mysterious smile, stellaron hunter outfit, futuristic coat, technology accessories, path of destruction symbols, dramatic pose, single character, upper body, looking at viewer, anime style, starry background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/honkai-star-rail-oc-generated-3.webp",
    prompt:
      "1girl, pink hair with blue highlights, emerald eyes, gentle expression, silvermane guard uniform, belobog military style, ice crystals effects, path of preservation emblem, protective stance, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/honkai-star-rail-oc-generated-4.webp",
    prompt:
      "1boy, white hair, red eyes, scholarly appearance, genius society robes, path of erudition symbols, ancient scrolls, intellectual pose, single character, upper body, looking at viewer, anime style, library background",
  },
];

export default {
  meta: {
    title: "Honkai Star Rail OC Maker",
    description:
      "Generate your own Honkai: Star Rail character OC with AI. Create trailblazers, stellaron hunters, and faction members with unique paths and cosmic adventures.",
  },
  series: "Honkai Star Rail",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Honkai Star Rail OC Maker",
      description:
        "Generate your own Honkai: Star Rail character OC with AI. Create trailblazers, stellaron hunters, and faction members with unique paths and cosmic adventures.",
    },
    step: {
      title: "How to Make Honkai Star Rail OC",
      description:
        "Embark on your own trailblazing journey by creating the perfect Star Rail character. Follow these steps to design your cosmic adventurer.",
      steps: [
        {
          title: "Choose Your Path and Faction",
          description:
            "Select your character's Path (Destruction, Preservation, Hunt, Erudition, Harmony, Nihility, Abundance) and faction affiliation (Astral Express, Stellaron Hunters, IPC, Silvermane Guards, etc.). Each path has distinct visual themes and abilities.",
        },
        {
          title: "Design Appearance and Origin",
          description:
            "Describe your character's appearance, outfit style, and planetary origin. Include details like elemental affinities, weapon preferences, and cosmic abilities. Consider their role in the larger universe and connection to the Stellaron crisis.",
        },
        {
          title: "Generate Your Trailblazer",
          description:
            "Click 'Generate Character' to bring your Star Rail OC to life. Choose from multiple AI-generated designs that capture the game's distinctive sci-fi aesthetic and cosmic grandeur.",
        },
      ],
    },
    examples: {
      title: "Honkai Star Rail Examples",
      description:
        "Discover amazing cosmic characters created with text prompts using the Honkai: Star Rail OC Maker.",
      examples,
    },
    features: {
      title: "What is Honkai Star Rail OC Maker?",
      description:
        "Honkai: Star Rail OC Maker is designed specifically for miHoYo's cosmic RPG universe. Create authentic characters with distinct paths, factions, and interstellar themes.",
      features: [
        {
          label: "Authentic Star Rail Art Style",
          description:
            "Generate characters that perfectly match Honkai: Star Rail's distinctive 3D-inspired anime aesthetic, from character proportions to cosmic outfits and sci-fi elements.",
        },
        {
          label: "Path System Integration",
          description:
            "Our AI understands all seven Paths and their visual representations, ensuring your character's cosmic powers and philosophical alignment are accurately depicted in their design.",
        },
        {
          label: "Rapid Character Creation",
          description:
            "Create stunning Star Rail characters in seconds, perfect for exploring the universe, developing faction stories, or expanding your cosmic roster.",
        },
        {
          label: "High-Quality Cosmic Artwork",
          description:
            "Powered by AI trained on Star Rail's visual standards, delivering character art that matches the game's sophisticated sci-fi aesthetic and quality.",
        },
        {
          label: "Multiple Design Variations",
          description:
            "Generate several character interpretations per prompt, exploring different paths, factions, and cosmic themes to find your perfect trailblazer design.",
        },
        {
          label: "Universe Lore Integration",
          description:
            "Create characters that naturally fit into Star Rail's rich cosmic lore, with authentic faction influences, path philosophies, and interstellar adventure themes.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is Honkai Star Rail OC Maker and how does it work?",
          answer:
            "Honkai: Star Rail OC Maker is an AI tool specialized for creating original Star Rail characters. Describe your character's path, faction, and cosmic abilities, and our AI generates authentic Star Rail-style artwork.",
        },
        {
          question:
            "How can I create better characters with Honkai Star Rail OC Maker?",
          answer:
            "Include specific Star Rail elements like Path affiliations, faction memberships, planetary origins, elemental abilities, and cosmic themes. The more lore-accurate details you include, the more authentic your character will be.",
        },
        {
          question: "Is Honkai Star Rail OC Maker free to use?",
          answer:
            "Yes, Honkai: Star Rail OC Maker offers free character generation with core features. Premium plans provide faster generation, more path options, and advanced cosmic customization tools.",
        },
        {
          question: "What makes Star Rail OC Maker's results so authentic?",
          answer:
            "Our AI is specifically trained on Star Rail's art style and universe lore, understanding path philosophies, faction aesthetics, and the game's distinctive sci-fi character design principles.",
        },
        {
          question:
            "Can I use characters created with Star Rail OC Maker commercially?",
          answer:
            "Yes, all original characters you create are yours to use for personal and commercial projects. We don't claim ownership of your trailblazer designs or Star Rail OCs.",
        },
        {
          question: "Do I need an account to use Honkai Star Rail OC Maker?",
          answer:
            "No account required for basic use. Creating an account allows you to save characters, access generation history, and unlock premium Star Rail-themed features.",
        },
        {
          question:
            "Can I create characters from different factions and paths?",
          answer:
            "Absolutely! Create characters from any faction (Astral Express, Stellaron Hunters, IPC, etc.) following any of the seven Paths. Mix and match cosmic abilities and affiliations freely.",
        },
        {
          question: "Are more miHoYo game OC makers being developed?",
          answer:
            "Yes! We're expanding to include other miHoYo universes and similar sci-fi RPGs. Follow our updates for new themed OC makers inspired by popular cosmic adventures.",
        },
      ],
    },
    cta: {
      title: "Begin Your Cosmic Journey",
      description:
        "Design your ultimate Star Rail trailblazer — no artistic skills required. Just imagine, describe, and explore the infinite cosmos of Honkai: Star Rail.",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
