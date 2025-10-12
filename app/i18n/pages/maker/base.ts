const basePrompt = `
  WORLD CONTEXT:
  Universe: Original multiverse of heroes, explorers, inventors, mages, and everyday legends
  Setting: Flexible — from neon megacities and floating kingdoms to small towns or distant galaxies
  Key Themes: Found-family teams, rival schools, cosmic mysteries, everyday slice-of-life adventures

  OUTPUT FORMAT:
  Name, Archetype & Background, Appearance Highlights, Signature Ability, Personality, Motivation, Backstory Snapshot

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Starlight Courier",
    description:
      "A cosmic runner delivering encrypted messages between star systems.",
    prompt: `Character name?
Kira Halley

What is their archetype and background?
Interstellar courier raised on orbital stations

Describe their appearance highlights.
Holographic jacket, bright cyan hair, constellation tattoos that glow in low light

What is their signature ability?
Photon-step boots that let her dash between points of light

How would you summarize their personality?
Optimistic, quick-witted, secretly sentimental

What motivates them?
Keeping the galaxy connected for families separated by distance

Share a backstory snapshot.
Smuggled a encrypted memory shard that reunited twin scientists and prevented a rogue AI cascade.`,
  },
  {
    title: "Cityscape Synth",
    description:
      "An urban inventor remixing music and machinery to fight crime.",
    prompt: `Character name?
Nova Reyes

What is their archetype and background?
Street engineer-musician from a vertical megacity

Describe their appearance highlights.
Copper curls, augmented reality visor, jacket covered in reactive LED panels

What is their signature ability?
Soundwave gauntlets that turn rhythm into kinetic shields and blasts

How would you summarize their personality?
Playful, fiercely loyal, improvisational genius

What motivates them?
Keeping harmony in a city that never sleeps

Share a backstory snapshot.
Built a portable studio that doubles as a rescue beacon after friends were trapped during a blackout.`,
  },
  {
    title: "Arcane Archivist",
    description:
      "A wandering mage cataloging lost spells for future generations.",
    prompt: `Character name?
Eira Linden

What is their archetype and background?
Nomadic historian trained by an interrealm library

Describe their appearance highlights.
Silver braids, floating rune rings, patchwork cloak stitched with map fragments

What is their signature ability?
Memory sigils that let her replay moments from ancient tomes

How would you summarize their personality?
Curious, patient, quietly brave

What motivates them?
Ensuring magic stays accessible and responsible

Share a backstory snapshot.
Recovered a forbidden ritual and rewrote it into a healing charm to save a village.`,
  },
  {
    title: "Skyline Sentinel",
    description: "A guardian gliding through skyscrapers with adaptive armor.",
    prompt: `Character name?
Atlas Quill

What is their archetype and background?
Guardian from the floating ward of a climate-protected metropolis

Describe their appearance highlights.
Winged exo-suit with modular feathers, warm brown skin, gold lattice tattoos

What is their signature ability?
Atmospheric resonance field that redirects storms and debris

How would you summarize their personality?
Calm, strategic, protective big-sibling energy

What motivates them?
Keeping his community safe while inspiring young flyers

Share a backstory snapshot.
Saved a midair tram by channeling lightning into his suit and guiding it to safety.`,
  },
  {
    title: "Dream Diver",
    description: "A storyteller who explores shared dreams to solve mysteries.",
    prompt: `Character name?
Saffi Mire

What is their archetype and background?
Community dreamwalker who maps subconscious realms

Describe their appearance highlights.
Galaxy freckles, layered scarves that shimmer like auroras, ever-changing eye color

What is their signature ability?
Dream threads that weave memories into clues

How would you summarize their personality?
Empathetic, whimsical, quietly determined

What motivates them?
Helping people heal by resolving the stories they hide

Share a backstory snapshot.
Guided neighbors through a shared nightmare and uncovered a real-world conspiracy.`,
  },
];

const ocOptions = [
  {
    title: "Gender",
    key: "gender",
    unique: true,
    data: [
      { label: "Woman", value: "1girl" },
      { label: "Man", value: "1boy" },
      { label: "Non-binary", value: "androgynous" },
    ],
  },
  {
    title: "Age",
    key: "age",
    data: [
      { label: "Child", value: "child" },
      { label: "Teen", value: "teen" },
      { label: "Adult", value: "young adult" },
    ],
  },
  {
    title: "Genre",
    key: "genre",
    data: [
      { label: "Fantasy", value: "fantasy" },
      { label: "Sci-fi", value: "science fiction" },
      { label: "Modern", value: "modern" },
      { label: "Cyberpunk", value: "cyberpunk" },
      { label: "Slice of Life", value: "slice of life" },
    ],
  },
  {
    title: "Personality",
    key: "personality",
    data: [
      { label: "Cheerful", value: "cheerful expression" },
      { label: "Stoic", value: "stoic" },
      { label: "Mysterious", value: "mysterious aura" },
      { label: "Intense", value: "intense gaze" },
    ],
  },
  {
    title: "Signature Element",
    key: "element",
    data: [
      { label: "Elemental Magic", value: "elemental magic" },
      { label: "Tech Gadgets", value: "futuristic tech" },
      { label: "Nature Power", value: "nature magic" },
      { label: "Shadow Energy", value: "shadow energy" },
    ],
  },
  {
    title: "Visual Style",
    key: "style",
    data: [
      { label: "Anime", value: "anime style" },
      { label: "Painterly", value: "digital painting" },
      { label: "Comic", value: "comic art" },
      { label: "Illustrative", value: "illustration" },
    ],
  },
];

export default {
  meta: {
    title: "OC Maker – All-in-One OC Generator & Character Creator",
    description:
      "Use OC Maker as your OC Generator, Character Creator, and OC Creator to build original characters with stories and avatars in minutes.",
  },
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "OC Maker",
      description:
        "Craft a complete original character using OC Maker alongside our OC Generator, Character Creator, and OC Creator workflow for story and visuals.",
    },
    step: {
      title: "How the Workflow Works",
      description:
        "Follow this guide to capture narrative depth and visual flair for every original character.",
      steps: [
        {
          title: "Describe the Character",
          description:
            "Outline appearance, personality, and goals so the toolkit understands the vibe of your Character Creator session.",
        },
        {
          title: "Add Flavorful Details",
          description:
            "Pick optional tags like genre, temperament, or signature elements to guide the generator toward your vision.",
        },
        {
          title: "Generate Story & Avatar",
          description:
            "Use the Profile and Avatar tools to finish your pass and export a cohesive character package.",
        },
      ],
    },
    examples: {
      title: "OC Examples",
      description:
        "Preview AI-made characters generated with our character creator combo.",
      examples: [
        {
          image:
            "https://cdn.ocmaker.app/example/frieren-oc-maker-generated-4.webp",
          prompt:
            "1girl, long white hair, green eyes, elf ears, serene expression, frieren style mage robes, wooden staff, magical aura, fantasy medieval setting, anime style, looking at viewer, simple background, upper body",
        },
        {
          image:
            "https://cdn.ocmaker.app/example/honkai-star-rail-oc-generated-3.webp",
          prompt:
            "1girl, pink hair with blue highlights, emerald eyes, gentle expression, silvermane guard uniform, belobog military style, ice crystals effects, path of preservation emblem, protective stance, single character, upper body, looking at viewer, anime style, simple background",
        },
        {
          image: "https://cdn.ocmaker.app/example/mlp-oc-generateds-1.webp",
          prompt:
            "1girl, pastel rainbow mane, sky blue coat, cutie mark with lightning bolt, unicorn horn, magical sparkles, cheerful expression, My Little Pony style, looking at viewer, simple background, upper body",
        },
        {
          image:
            "https://cdn.ocmaker.app/example/sailor-moon-oc-generated-2.webp",
          prompt:
            "1girl, short purple hair, violet eyes, mysterious smile, dark kingdom uniform, black and purple villain outfit, dark crystal accessories, elegant pose, single character, upper body, looking at viewer, anime style, dark palace background",
        },
      ],
    },
    features: {
      title: "Why Choose This Character Creator?",
      description:
        "From tabletop campaigns to webcomics, this OC generator helps you explore fresh character ideas fast and consistently.",
      features: [
        {
          label: "Story + Visual Workflow",
          description:
            "Develop narrative profiles and character art in one workspace, keeping every detail aligned.",
        },
        {
          label: "Customizable Prompt Controls",
          description:
            "Fine-tune personality, tone, and aesthetics with flexible options.",
        },
        {
          label: "Multiple Examples Included",
          description:
            "Jump-start creativity with curated example prompts tailored for quick iteration.",
        },
        {
          label: "High-Quality Outputs",
          description:
            "Powered by leading AI models to deliver crisp, shareable visuals and vivid story hooks for every OC.",
        },
        {
          label: "Save & Iterate",
          description:
            "Store profiles, generate alt outfits, and tweak details without starting from scratch.",
        },
        {
          label: "Community Ready",
          description:
            "Perfect for roleplay sheets, pitch decks, or collaborative worldbuilding projects that need a flexible toolkit.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What can I create with this OC generator?",
          answer:
            "Use OC Maker and the supporting toolkit to craft original characters for novels, tabletop games, roleplay, or concept art. Mix story prompts with avatar options to capture both personality and appearance.",
        },
        {
          question: "How do I get better results?",
          answer:
            "Add concrete descriptors like setting, emotional tone, powers, and style references. Selecting tags from the Avatar options helps guide the character artwork.",
        },
        {
          question: "Can I use these characters commercially?",
          answer:
            "Yes, everything you create belongs to you and can be used commercially however you like.",
        },
        {
          question: "Do I need art skills?",
          answer:
            "No. Focus on describing the character in words and the generator handles the visuals. You can iterate until it feels right.",
        },
        {
          question: "Is the OC generator free?",
          answer:
            "Backstory generation is free and works without logging in. For OC images, start with the included credits and upgrade anytime for faster queues, more outputs, and exclusive styles.",
        },
        {
          question: "Do you have templates or tips for beginners?",
          answer:
            "Yes! We include templates and example characters to help beginners get started. Feel free to use them directly or remix them to suit your story.",
        },
        {
          question: "How detailed can my character description be?",
          answer:
            "Describe as many details as you like! The more specific you are, the better the AI captures your ideas. Include appearance, personality, outfits, accessories, and setting elements—OC Maker can handle complex, nuanced prompts.",
        },
        {
          question: "How can I get free credits?",
          answer:
            "Invite friends and complete daily check-ins to earn bonus credits. These bonuses are limited, so consider credit packs or a subscription when you need larger amounts.",
        },
      ],
    },
    cta: {
      title: "Ready to create your next OC?",
      description:
        "Switch between story and visuals inside the OC Maker toolkit to bring ideas to life instantly.",
      btns: {
        start: "Start Generating",
      },
    },
  },
};
