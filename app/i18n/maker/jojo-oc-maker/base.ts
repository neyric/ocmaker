const basePrompt = `
  WORLD CONTEXT:
  Universe: JoJo's Bizarre Adventure
  Setting: Multigenerational Joestar saga, Hamon and Stand powers, globe-trotting fashion-forward battles, supernatural artifacts
  Key Elements: Joestar allies, Dio's legacy, Speedwagon Foundation, Pillar Men, Passione mafia, Morioh community, Steel Ball Run racers, Stone Ocean inmates

  OUTPUT FORMAT:
  Name, Stand or Power Name & Ability, Era/Part Allegiance, Combat Style, Personality, Stand Weakness/Conditions, Backstory Snapshot

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Steel Ball Run Racer",
    description: "A desert racer channeling sandstorms through a melodic Stand.",
    prompt: `What is your character's name?
Amelia Creed

What is their Stand or power name and ability?
Stand: Sand Sonata — manipulates sonic sand waves that cut with rhythm

Which era or part are they aligned with?
Steel Ball Run era, allied with Johnny Joestar

What is their combat style?
Horseback spin techniques blending harmonica cues

How would you describe their personality?
Determined, soulful, loyal to fellow racers

What weakness or condition limits their Stand?
Stand loses cohesion if the music stops mid-phrase

Share a backstory snapshot.
Joined the race to fund her family's struggling ranch and quickly became an ally in the battle for the Corpse Parts.`,
  },
  {
    title: "Passione Accountant",
    description: "A Passione member balancing ledgers while eliminating traitors.",
    prompt: `What is your character's name?
Riccardo Ventresca

What is their Stand or power name and ability?
Stand: Tax Audit — freezes targets by calculating their life debt

Which era or part are they aligned with?
Part 5, Passione reform faction

What is their combat style?
Close-range grappling mixed with precise Stand strikes

How would you describe their personality?
Calm, dryly sarcastic, obsessed with order

What weakness or condition limits their Stand?
Requires knowing the target's real name and financial record

Share a backstory snapshot.
Bucciarati recruited him after he exposed a capo laundering funds for Diavolo.`,
  },
  {
    title: "Morioh Artisan",
    description: "A local artist whose Stand turns sketches into temporary allies.",
    prompt: `What is your character's name?
Aki Higashikata

What is their Stand or power name and ability?
Stand: Ink Heart — animates drawings for exactly 77 seconds

Which era or part are they aligned with?
Diamond is Unbreakable era

What is their combat style?
Mid-range tactics using animated graffiti to surround foes

How would you describe their personality?
Creative, compassionate, lightly mischievous

What weakness or condition limits their Stand?
If the drawing is smudged, the Stand collapses instantly

Share a backstory snapshot.
A childhood friend of Koichi, she discovered her Stand while sketching a guardian to protect Morioh's shopping district.`,
  },
  {
    title: "Stardust Explorer",
    description: "An archaeologist aiding the Crusaders across Egypt.",
    prompt: `What is your character's name?
Dr. Samir Rashid

What is their Stand or power name and ability?
Stand: Pharaonic Echo — summons spectral guardians from artifacts

Which era or part are they aligned with?
Stardust Crusaders journey

What is their combat style?
Support combat, providing barriers and historical insight

How would you describe their personality?
Scholarly, witty, unflappable in crises

What weakness or condition limits their Stand?
Needs a relic with personal history to manifest guardians

Share a backstory snapshot.
Rescued by Joseph Joestar from a curse, he repaid the favor by guiding the Crusaders through ancient tombs.`,
  },
  {
    title: "Stone Ocean Inmate",
    description: "A Green Dolphin Street prisoner using origami-based offense.",
    prompt: `What is your character's name?
Marina Fold

What is their Stand or power name and ability?
Stand: Paper Chains — folds paper into razor-thin constructs that obey commands

Which era or part are they aligned with?
Stone Ocean

What is their combat style?
Trap-based close combat and prison corridor ambushes

How would you describe their personality?
Resilient, resourceful, harboring quiet rage

What weakness or condition limits their Stand?
Paper disintegrates if soaked, nullifying the Stand

Share a backstory snapshot.
Framed for embezzlement by Whitesnake loyalists, she allies with Jolyne while seeking proof of her innocence.`,
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
    image: "https://cdn.ocmaker.app/example/jojo-oc-generated-1.webp",
    prompt:
      "1boy, purple hair with golden highlights, green eyes, dramatic pose, colorful stand user outfit, elaborate accessories, stand manifestation behind, menacing aura, jojo bizarre art style, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/jojo-oc-generated-2.webp",
    prompt:
      "1girl, rainbow hair gradient, heterochromatic eyes, cowboy hat, stone ocean prison uniform, weather manipulation stand, dramatic lighting effects, jojo part 6 style, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/jojo-oc-generated-3.webp",
    prompt:
      "1boy, dark skin with white hair, golden eyes, gangster outfit, stand user, mysterious smile, arrow-shaped accessories, baroque patterns, jojo part 5 style, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/jojo-oc-generated-4.webp",
    prompt:
      "1girl, pink hair in pompadour style, yellow eyes, delinquent school uniform, stand ability visualization, fierce expression, colorful geometric patterns, jojo part 4 style, single character, upper body, looking at viewer, anime style, simple background",
  },
];

export default {
  meta: {
    title: "JOJO OC Maker",
    description:
      "Generate your own JOJO's Bizarre Adventure OC with AI. Create unique Stand users with bizarre abilities and flamboyant fashion for any JoJo part.",
  },
  series: "JOJO",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "JOJO OC Maker",
      description:
        "Generate your own JOJO's Bizarre Adventure OC with AI. Create unique Stand users with bizarre abilities and flamboyant fashion for any JoJo part.",
    },
    step: {
      title: "How to Make JOJO OC",
      description:
        "Creating a JOJO character with OC Maker is a bizarre adventure. Follow these steps to design your own Stand user with unique abilities.",
      steps: [
        {
          title: "Describe Your Stand User",
          description:
            "Fill in the form with your character's appearance and personality. For authentic results, include JOJO-specific elements like flamboyant fashion, dramatic poses, unique hairstyles, and colorful accessories.",
        },
        {
          title: "Design Your Stand Ability",
          description:
            "Create your character's Stand with a unique name, appearance, and bizarre ability. Include Stand stats, special powers, and any limitations. The more creative and unexpected, the more JOJO-like it becomes.",
        },
        {
          title: "Generate and Strike a Pose",
          description:
            "Click 'Generate Character' to create your JOJO OC. You'll receive multiple AI-generated designs — choose your favorite and get ready for a bizarre adventure!",
        },
      ],
    },
    examples: {
      title: "JOJO Character Examples",
      description:
        "Explore JOJO characters created from text prompts using the JOJO OC Maker.",
      examples,
    },
    features: {
      title: "What is JOJO OC Maker?",
      description:
        "JOJO OC Maker is a specialized version of OC Maker designed for JoJo's Bizarre Adventure. Describe your Stand user and instantly transform them into Araki-style bizarre artwork.",
      features: [
        {
          label: "Authentic Araki Art Style",
          description:
            "Create characters that capture Hirohiko Araki's distinctive art style, from dramatic poses to flamboyant fashion, designed to fit into any JoJo part.",
        },
        {
          label: "Stand System Integration",
          description:
            "Prompts are optimized for Stand abilities and manifestations — from humanoid Stands to automatic types — helping you create believable and bizarre powers.",
        },
        {
          label: "Instant Bizarre Creation",
          description:
            "Generate high-quality JOJO characters in seconds, perfect for capturing the series' unique aesthetic and over-the-top style.",
        },
        {
          label: "Detailed Character Artwork",
          description:
            "Our AI produces intricate character designs with elaborate clothing, accessories, and Stand visualizations that match JOJO's iconic visual flair.",
        },
        {
          label: "Multiple Pose Variations",
          description:
            "Generate several character designs per prompt, allowing you to explore different dramatic poses and select your most bizarre creation.",
        },
        {
          label: "Complete Stand User Profile",
          description:
            "Create comprehensive characters including Stand abilities, backstories, and fashion choices that embody the bizarre spirit of JoJo's adventure.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is JOJO OC Maker and how does it work?",
          answer:
            "JOJO OC Maker is an AI tool specialized for creating JoJo's Bizarre Adventure characters. Describe your Stand user's appearance and abilities, and our AI generates artwork in Araki's distinctive style.",
        },
        {
          question:
            "How can I create more bizarre and authentic JOJO characters?",
          answer:
            "Include specific JOJO elements like Stand names (often music references), bizarre fashion choices, dramatic poses, and unique abilities with creative limitations. The more outlandish and creative, the better!",
        },
        {
          question: "Is JOJO OC Maker free to use?",
          answer:
            "Yes, JOJO OC Maker offers free character generation with basic features. Premium plans provide faster generation, more options, and additional customization features.",
        },
        {
          question: "What makes the Stand abilities look authentic?",
          answer:
            "Our AI understands JOJO's power system conventions, from Stand stats to ability types, helping create powers that feel both bizarre and balanced within the series' logic.",
        },
        {
          question: "Can I use my JOJO OC for fan projects?",
          answer:
            "Absolutely! Characters created with JOJO OC Maker are yours to use in fan fiction, artwork, roleplay, or any creative bizarre adventure you can imagine.",
        },
        {
          question: "Do I need to register to create characters?",
          answer:
            "No account required for basic use. However, creating an account lets you save your Stand users, track generation history, and access premium bizarre features.",
        },
        {
          question: "Can I create characters from different JOJO parts?",
          answer:
            "Yes! Create characters that fit any JoJo part, from Phantom Blood's Victorian setting to Stone Ocean's modern prison, each with era-appropriate styling.",
        },
        {
          question: "Will there be more anime OC makers like this bizarre one?",
          answer:
            "Yes! We're continuously expanding our anime OC maker collection. Check ocmaker.app regularly for new additions to our growing bizarre library.",
        },
      ],
    },
    cta: {
      title: "Create Your Own Stand User",
      description:
        "Design your original JOJO character with a bizarre Stand — no drawing skills needed. Just describe, generate, and embrace the bizarre!",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
