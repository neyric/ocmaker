const basePrompt = `
  WORLD CONTEXT:
  Universe: My Hero Academia
  Setting: Quirk-driven hero society, U.A. High hero course, Pro Hero rankings, League of Villains plots, international hero agencies
  Key Factions: U.A. students, Big Three, Pro Hero agencies, Commission, League of Villains/Paranormal Liberation Front, support course engineers, vigilantes

  OUTPUT FORMAT:
  Name, Hero/Villain Affiliation, Quirk Description & Limitations, Costume/Support Gear, Personality, Aspirations, Origin Backstory

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "U.A. Support Course Ace",
    description: "A tech whiz combining gadgets with her energy-reflecting Quirk.",
    prompt: `What is your character's name?
Kiri Nakamoto

Are they a hero, student, or villain and with which group?
U.A. High Support Course, hero hopeful

Describe their Quirk and its limitations.
Quirk: Prism Pulse — converts incoming energy into focused beams but overheats after three shots

What costume or support gear do they use?
Reflective gauntlets and cooling coils built with Power Loader

How would you describe their personality?
Inventive, enthusiastic, occasionally scatterbrained

What aspiration drives them?
To design support gear that lets any aspiring hero fight safely

Share an origin backstory snapshot.
Grew up in a powerless family and built her first gauntlet from junkyard metal to stop a local villain.`,
  },
  {
    title: "Work-Study Intern",
    description: "A hero course student interning under Mirko for close-combat training.",
    prompt: `What is your character's name?
Daigo Sora

Are they a hero, student, or villain and with which group?
U.A. Hero Course Class 2-A

Describe their Quirk and its limitations.
Quirk: Sonic Vault — explosive leg strength with sonic booms but causes muscle strain

What costume or support gear do they use?
Reinforced knee braces and vibration-dampening boots

How would you describe their personality?
Competitive, fiery, fiercely loyal

What aspiration drives them?
To become a top 5 hero who inspires kids in rural towns

Share an origin backstory snapshot.
Saved classmates from a landslide using raw leg power, catching Mirko's attention for an internship.`,
  },
  {
    title: "Underground Vigilante",
    description: "A vigilante assisting heroes in shadowy corners of Musutafu.",
    prompt: `What is your character's name?
Night Lattice

Are they a hero, student, or villain and with which group?
Independent vigilante collaborating with Eraser Head

Describe their Quirk and its limitations.
Quirk: Lattice — projects barrier grids but requires precise hand choreography

What costume or support gear do they use?
Grapple lines and a visor with predictive trajectory display

How would you describe their personality?
Calm, analytical, self-sacrificing

What aspiration drives them?
To earn legal recognition for vigilantes who cover blind spots

Share an origin backstory snapshot.
Once failed the Hero License Exam for using vigilante tactics; now works to prove the underground can cooperate with pros.`,
  },
  {
    title: "League Recruit",
    description: "A villain recruit who manipulates shadows to conceal allies.",
    prompt: `What is your character's name?
Shadeglow

Are they a hero, student, or villain and with which group?
League of Villains

Describe their Quirk and its limitations.
Quirk: Eclipse Veil — merges into shadows to create portals but weakens under bright light

What costume or support gear do they use?
Photon-absorbing cloak and Dabi-supplied flare disruptors

How would you describe their personality?
Brooding, theatrical, surprisingly compassionate to outcasts

What aspiration drives them?
To dismantle hero society that rejected her quirk control struggles

Share an origin backstory snapshot.
Expelled from hero school after an uncontrolled incident, she was recruited by Toga to protect runaway kids.`,
  },
  {
    title: "Hero Agency Accountant",
    description: "An agency support hero balancing finance with defensive quirk use.",
    prompt: `What is your character's name?
Ledger Guard

Are they a hero, student, or villain and with which group?
Sidekick at Endeavor's Agency

Describe their Quirk and its limitations.
Quirk: Hardlight Ledger — manifests barrier shields shaped like spreadsheets, but each shield lasts only 10 seconds

What costume or support gear do they use?
Holographic projector gauntlets and reinforced visor

How would you describe their personality?
Meticulous, level-headed, dry sense of humor

What aspiration drives them?
To keep agencies transparent while saving civilians

Share an origin backstory snapshot.
Grew tired of corporate accounting and joined Endeavor's office after protecting interns during a villain raid.`,
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
    image: "https://cdn.ocmaker.app/example/mha-oc-generateds-1.webp",
    prompt:
      "1girl, green hair with yellow streaks, emerald eyes, UA high school uniform, hero costume with nature theme, confident smile, My Hero Academia style, looking at viewer, simple background, upper body",
  },
  {
    image: "https://cdn.ocmaker.app/example/mha-oc-generateds-2.webp",
    prompt:
      "1boy, spiky red hair, orange eyes, hero costume with fire elements, determined expression, My Hero Academia style, hero pose, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/mha-oc-generateds-3.webp",
    prompt:
      "1girl, silver hair in twin buns, purple eyes, high-tech hero suit, support gear, excited expression, My Hero Academia style, inventor pose, looking at viewer, simple background, upper body",
  },
  {
    image: "https://cdn.ocmaker.app/example/mha-oc-generateds-4.webp",
    prompt:
      "1boy, black hair with blue highlights, steel gray eyes, hero costume with metal accents, serious expression, defensive stance, My Hero Academia style, looking at viewer, anime style, simple background, upper body",
  },
];

export default {
  meta: {
    title: "My Hero Academia OC Maker",
    description:
      "Create your own My Hero Academia OC with AI. Design unique quirks, hero costumes, and epic adventures in a world where superpowers are the norm.",
  },
  series: "My Hero Academia",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "My Hero Academia OC Maker",
      description:
        "Create your own My Hero Academia OC with AI. Design unique quirks, hero costumes, and epic adventures in a world where superpowers are the norm.",
    },
    step: {
      title: "How to Make My Hero Academia OC",
      description:
        "Creating your hero character is as exciting as discovering your quirk. Follow these steps to design your ultimate hero or villain.",
      steps: [
        {
          title: "Design Your Unique Quirk",
          description:
            "Choose your character's superpower - from elemental abilities to transformation quirks. Consider how their quirk affects their appearance, personality, and fighting style.",
        },
        {
          title: "Create Hero Costume and Identity",
          description:
            "Design your character's hero costume, school uniform, or villain outfit. Include support items, color schemes, and design elements that complement their quirk abilities.",
        },
        {
          title: "Generate Your Hero Character",
          description:
            "Click 'Generate Character' to bring your My Hero Academia OC to life. Choose from multiple AI-generated designs that capture the heroic spirit of the MHA universe.",
        },
      ],
    },
    examples: {
      title: "My Hero Academia Examples",
      description:
        "Discover amazing heroes and villains created with text prompts using the My Hero Academia OC Maker.",
      examples,
    },
    features: {
      title: "What is My Hero Academia OC Maker?",
      description:
        "My Hero Academia OC Maker specializes in creating characters for the world of heroes and villains. Design authentic characters with unique quirks, costumes, and heroic aspirations.",
      features: [
        {
          label: "Authentic MHA Art Style",
          description:
            "Generate characters that perfectly match My Hero Academia's distinctive anime aesthetic, from dynamic hero poses to detailed costume designs.",
        },
        {
          label: "Quirk-Based Character Design",
          description:
            "Our AI understands how quirks influence character appearance and design, ensuring your hero's powers are visually represented in their look and costume.",
        },
        {
          label: "Lightning-Fast Hero Creation",
          description:
            "Design powerful heroes and villains in seconds, letting you focus on developing their backstories, relationships, and heroic journeys.",
        },
        {
          label: "Professional Hero Artwork",
          description:
            "Powered by AI trained on MHA's visual standards, delivering character art that captures the heroic energy and detailed designs of the series.",
        },
        {
          label: "Multiple Costume Variations",
          description:
            "Generate several character interpretations per prompt, exploring different costume designs, quirk effects, and heroic expressions.",
        },
        {
          label: "Hero Society Integration",
          description:
            "Create characters that naturally fit into the My Hero Academia universe, with authentic hero licenses, school elements, and quirk society details.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is My Hero Academia OC Maker and how does it work?",
          answer:
            "My Hero Academia OC Maker is an AI tool specialized for creating original hero characters. Describe your character's quirk, appearance, and costume, and our AI generates authentic MHA-style artwork.",
        },
        {
          question:
            "How can I create better characters with My Hero Academia OC Maker?",
          answer:
            "Include specific quirk details, hero costume elements, school affiliations (UA, Shiketsu, etc.), and personality traits. The more MHA-specific elements you include, the better the results.",
        },
        {
          question: "Is My Hero Academia OC Maker free to use?",
          answer:
            "Yes, My Hero Academia OC Maker offers free character generation with core features. Premium plans provide faster generation, advanced quirk effects, and more costume options.",
        },
        {
          question: "What makes My Hero Academia OC Maker's results so heroic?",
          answer:
            "Our AI is specifically trained on MHA's art style and universe, understanding character design principles, quirk visual effects, and hero society aesthetics.",
        },
        {
          question:
            "Can I use characters created with My Hero Academia OC Maker commercially?",
          answer:
            "Yes, all original characters you create are yours to use for personal and commercial projects. We don't claim ownership of your hero designs.",
        },
        {
          question: "Do I need an account to use My Hero Academia OC Maker?",
          answer:
            "No account required for basic use. Creating an account allows you to save characters, access generation history, and unlock premium hero features.",
        },
        {
          question: "Can I regenerate or modify my MHA character designs?",
          answer:
            "Absolutely! You can regenerate with the same prompt for variations or adjust your description to fine-tune your character until it perfectly matches your heroic vision.",
        },
        {
          question: "Will you add more superhero anime OC Makers?",
          answer:
            "Yes! We're expanding to include other popular superhero and action anime universes. Follow our updates for new themed OC Makers.",
        },
      ],
    },
    cta: {
      title: "Create Your Ultimate Hero",
      description:
        "Design your perfect hero or villain — no artistic skills required. Just imagine, describe, and join the ranks of professional heroes.",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
