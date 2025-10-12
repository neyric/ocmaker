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
      { label: "Girl", value: "1girl" },
      { label: "Boy", value: "1boy" },
      { label: "None", value: "" },
    ],
  },
  {
    title: "Age",
    key: "age",
    data: [
      { label: "Child", value: "child" },
      { label: "Preteen", value: "preteen" },
      { label: "Young Teen", value: "young teen" },
      { label: "Mid Teen", value: "mid teen" },
      { label: "Late Teen", value: "late teen" },
      { label: "Young Adult", value: "young adult" },
      { label: "Adult", value: "adult" },
      { label: "Mature Adult", value: "mature adult" },
      { label: "Middle-aged", value: "middle aged" },
      { label: "Older Adult", value: "older adult" },
      { label: "Elder", value: "elderly" },
      { label: "Ageless", value: "ageless being" },
      { label: "Ancient", value: "ancient entity" },
      { label: "Synthetic", value: "synthetic adult" },
    ],
  },
  {
    title: "Body",
    key: "body",
    data: [
      { label: "Petite", value: "petite build" },
      { label: "Slim", value: "slim build" },
      { label: "Lithe", value: "lithe frame" },
      { label: "Athletic", value: "athletic build" },
      { label: "Curvy", value: "curvy figure" },
      { label: "Muscular", value: "muscular build" },
      { label: "Broad", value: "broad shouldered" },
      { label: "Stocky", value: "stocky physique" },
      { label: "Tall", value: "tall stature" },
      { label: "Compact", value: "compact build" },
      { label: "Plus Size", value: "plus size" },
      { label: "Ethereal", value: "ethereal silhouette" },
      { label: "Augmented", value: "augmented body" },
      { label: "Cyborg", value: "cybernetic enhancements" },
    ],
  },
  {
    title: "Hair",
    key: "hair",
    data: [
      { label: "Short Black", value: "short black hair" },
      { label: "Long Brown", value: "long brown hair" },
      { label: "Blonde", value: "blonde hair" },
      { label: "Red", value: "red hair" },
      { label: "White", value: "white hair" },
      { label: "Silver", value: "silver hair" },
      { label: "Pastel", value: "pastel hair" },
      { label: "Rainbow", value: "rainbow hair" },
      { label: "Shaved", value: "shaved head" },
      { label: "Braided", value: "braided hair" },
      { label: "Curly", value: "curly hair" },
      { label: "Wavy", value: "wavy hair" },
      { label: "Afro", value: "afro hairstyle" },
      { label: "Ponytail", value: "high ponytail" },
      { label: "Buns", value: "space buns" },
      { label: "Mohawk", value: "mohawk" },
      { label: "Glowing", value: "glowing hair" },
    ],
  },
  {
    title: "Eyes",
    key: "eyes",
    data: [
      { label: "Brown", value: "brown eyes" },
      { label: "Blue", value: "blue eyes" },
      { label: "Green", value: "green eyes" },
      { label: "Hazel", value: "hazel eyes" },
      { label: "Amber", value: "amber eyes" },
      { label: "Gray", value: "gray eyes" },
      { label: "Violet", value: "violet eyes" },
      { label: "Gold", value: "golden eyes" },
      { label: "Silver", value: "silver eyes" },
      { label: "Heterochromia", value: "heterochromia" },
      { label: "Glowing", value: "glowing eyes" },
      { label: "Mechanical", value: "mechanical eyes" },
      { label: "Animal", value: "animal-like eyes" },
      { label: "Starry", value: "starry eyes" },
    ],
  },
  {
    title: "Face",
    key: "face",
    data: [
      { label: "Cheerful", value: "cheerful expression" },
      { label: "Stoic", value: "stoic expression" },
      { label: "Serious", value: "serious expression" },
      { label: "Mysterious", value: "mysterious aura" },
      { label: "Playful", value: "playful grin" },
      { label: "Intense", value: "intense gaze" },
      { label: "Warm Smile", value: "warm smile" },
      { label: "Soft Gaze", value: "soft gaze" },
      { label: "Determined", value: "determined look" },
      { label: "Fierce", value: "fierce expression" },
      { label: "Melancholic", value: "melancholic expression" },
      { label: "Confident", value: "confident smirk" },
      { label: "Surprised", value: "surprised expression" },
      { label: "Dreamy", value: "dreamy expression" },
    ],
  },
  {
    title: "Skin",
    key: "skin",
    data: [
      { label: "Porcelain", value: "porcelain skin" },
      { label: "Fair", value: "fair skin" },
      { label: "Light Tan", value: "light tan skin" },
      { label: "Warm Tan", value: "tan skin" },
      { label: "Olive", value: "olive skin" },
      { label: "Golden", value: "golden brown skin" },
      { label: "Deep Brown", value: "deep brown skin" },
      { label: "Ebony", value: "ebony skin" },
      { label: "Freckled", value: "freckled skin" },
      { label: "Rosy", value: "rosy skin" },
      { label: "Pale Blue", value: "pale blue skin" },
      { label: "Emerald", value: "emerald skin" },
      { label: "Metallic", value: "metallic skin" },
      { label: "Iridescent", value: "iridescent skin" },
      { label: "Translucent", value: "translucent skin" },
    ],
  },
  {
    title: "Top",
    key: "top",
    data: [
      { label: "Hoodie", value: "casual hoodie" },
      { label: "Blazer", value: "tailored blazer" },
      { label: "Turtleneck", value: "cozy turtleneck" },
      { label: "Graphic Tee", value: "graphic t-shirt" },
      { label: "Leather Jacket", value: "leather jacket" },
      { label: "Denim Jacket", value: "denim jacket" },
      { label: "Cropped Top", value: "cropped top" },
      { label: "Battle Armor", value: "armored chestplate" },
      { label: "Mage Robe", value: "flowing mage robe" },
      { label: "Kimono", value: "traditional kimono" },
      { label: "Suit Jacket", value: "formal suit jacket" },
      { label: "Pilot Jacket", value: "flight jacket" },
      { label: "Techwear", value: "techwear jacket" },
      { label: "Sports Jersey", value: "sports jersey" },
      { label: "Apron", value: "work apron" },
      { label: "Armor Cloak", value: "armored cloak" },
    ],
  },
  {
    title: "Bottom",
    key: "bottom",
    data: [
      { label: "Jeans", value: "slim jeans" },
      { label: "Tailored Trousers", value: "tailored trousers" },
      { label: "Cargo Pants", value: "cargo pants" },
      { label: "Joggers", value: "athleisure joggers" },
      { label: "Shorts", value: "casual shorts" },
      { label: "Pleated Skirt", value: "pleated skirt" },
      { label: "Long Skirt", value: "flowing long skirt" },
      { label: "Leather Pants", value: "leather pants" },
      { label: "Battle Greaves", value: "armored greaves" },
      { label: "Utility Skirt", value: "utility skirt" },
      { label: "Suit Pants", value: "formal suit pants" },
      { label: "Leggings", value: "fitted leggings" },
      { label: "Draped Wrap", value: "draped wrap pants" },
      { label: "Tech Harness", value: "tech harness bottoms" },
      { label: "Overalls", value: "denim overalls" },
      { label: "Armor Skirt", value: "armored skirt" },
    ],
  },
  {
    title: "Set",
    key: "set",
    data: [
      { label: "Casual Streetwear", value: "casual streetwear outfit" },
      { label: "School Uniform", value: "school uniform" },
      { label: "Hero Suit", value: "hero suit" },
      { label: "Battle Armor", value: "battle ready armor" },
      { label: "Fantasy Adventurer", value: "fantasy adventurer outfit" },
      { label: "Space Explorer", value: "space explorer gear" },
      { label: "Cyberpunk Rig", value: "cyberpunk outfit" },
      { label: "Stealth Ops", value: "stealth ops suit" },
      { label: "Formal Gala", value: "formal evening attire" },
      { label: "Royal Regalia", value: "royal regalia" },
      { label: "Traditional Ceremonial", value: "traditional ceremonial wear" },
      { label: "Magical Scholar", value: "arcane scholar robes" },
      { label: "Sports Uniform", value: "sports uniform" },
      { label: "Post-apocalyptic", value: "post-apocalyptic survival gear" },
      { label: "Desert Nomad", value: "desert nomad attire" },
      { label: "Oceanic Diver", value: "oceanic diver suit" },
    ],
  },
  {
    title: "Material",
    key: "material",
    data: [
      { label: "Cotton", value: "soft cotton" },
      { label: "Denim", value: "denim fabric" },
      { label: "Leather", value: "polished leather" },
      { label: "Suede", value: "soft suede" },
      { label: "Silk", value: "luxurious silk" },
      { label: "Linen", value: "light linen" },
      { label: "Wool", value: "cozy wool" },
      { label: "Velvet", value: "velvet fabric" },
      { label: "Metallic", value: "metallic plating" },
      { label: "Carbon Fiber", value: "carbon fiber panels" },
      { label: "Nano-fiber", value: "nano-fiber weave" },
      { label: "Holographic", value: "holographic fabric" },
      { label: "Bioluminescent", value: "bioluminescent mesh" },
      { label: "Enchanted Cloth", value: "enchanted cloth" },
      { label: "Crystal Weave", value: "crystal weave" },
      { label: "Organic Armor", value: "organic armor" },
    ],
  },
  {
    title: "Accessory",
    key: "accessory",
    data: [
      { label: "Glasses", value: "stylish glasses" },
      { label: "Goggles", value: "protective goggles" },
      { label: "Headphones", value: "over-ear headphones" },
      { label: "Scarf", value: "layered scarf" },
      { label: "Necklace", value: "statement necklace" },
      { label: "Earrings", value: "ornate earrings" },
      { label: "Gloves", value: "fingerless gloves" },
      { label: "Bracelets", value: "stacked bracelets" },
      { label: "Utility Belt", value: "utility belt" },
      { label: "Holster", value: "weapon holster" },
      { label: "Backpack", value: "compact backpack" },
      { label: "Cape", value: "dramatic cape" },
      { label: "Tech Implants", value: "visible cybernetic implants" },
      { label: "Magic Tome", value: "floating magic tome" },
      { label: "Pet Companion", value: "floating companion creature" },
      { label: "Energy Weapon", value: "glowing energy weapon" },
    ],
  },
  {
    title: "Genre",
    key: "genre",
    data: [
      { label: "Fantasy", value: "high fantasy" },
      { label: "Urban Fantasy", value: "urban fantasy" },
      { label: "Sci-fi", value: "science fiction" },
      { label: "Cyberpunk", value: "cyberpunk" },
      { label: "Steampunk", value: "steampunk" },
      { label: "Historical", value: "historical" },
      { label: "Modern", value: "modern slice of life" },
      { label: "Post-apocalyptic", value: "post-apocalyptic" },
      { label: "Mystery", value: "mystery" },
      { label: "Space Opera", value: "space opera" },
      { label: "Mythic", value: "mythic adventure" },
      { label: "Magical School", value: "magical academy" },
      { label: "Sports", value: "sports drama" },
      { label: "Romance", value: "romantic storyline" },
      { label: "Horror", value: "supernatural horror" },
      { label: "Comedy", value: "lighthearted comedy" },
    ],
  },
  {
    title: "Personality",
    key: "personality",
    data: [
      { label: "Cheerful", value: "cheerful" },
      { label: "Stoic", value: "stoic" },
      { label: "Mysterious", value: "mysterious" },
      { label: "Intense", value: "intense" },
      { label: "Gentle", value: "gentle" },
      { label: "Sarcastic", value: "sarcastic" },
      { label: "Optimistic", value: "optimistic" },
      { label: "Brooding", value: "brooding" },
      { label: "Playful", value: "playful" },
      { label: "Strategist", value: "strategic thinker" },
      { label: "Rebellious", value: "rebellious" },
      { label: "Protective", value: "protective" },
      { label: "Curious", value: "curious" },
      { label: "Empath", value: "empathetic" },
      { label: "Chaotic", value: "chaotic good" },
      { label: "Calculated", value: "calculating demeanor" },
    ],
  },
  {
    title: "Signature Element",
    key: "element",
    data: [
      { label: "Fire", value: "fire magic" },
      { label: "Water", value: "water manipulation" },
      { label: "Earth", value: "earth control" },
      { label: "Air", value: "wind manipulation" },
      { label: "Lightning", value: "lightning energy" },
      { label: "Light", value: "radiant light" },
      { label: "Shadow", value: "shadow energy" },
      { label: "Nature", value: "nature magic" },
      { label: "Ice", value: "ice powers" },
      { label: "Sound", value: "sonic resonance" },
      { label: "Tech", value: "advanced technology" },
      { label: "Life Force", value: "life force aura" },
      { label: "Time", value: "time manipulation" },
      { label: "Psychic", value: "psychic abilities" },
      { label: "Alchemy", value: "alchemy arts" },
      { label: "Void", value: "void energy" },
    ],
  },
  {
    title: "Visual Style",
    key: "style",
    data: [
      { label: "Anime", value: "anime style" },
      { label: "Manga", value: "manga illustration" },
      { label: "Comic", value: "comic art" },
      { label: "Painterly", value: "digital painting" },
      { label: "Semi-realistic", value: "semi realistic" },
      { label: "Realistic", value: "realistic illustration" },
      { label: "Cel-shaded", value: "cel shaded" },
      { label: "Watercolor", value: "watercolor" },
      { label: "Sketch", value: "sketch style" },
      { label: "Pixel", value: "pixel art" },
      { label: "Low Poly", value: "low poly render" },
      { label: "3D Render", value: "3d render" },
      { label: "Chibi", value: "chibi style" },
      { label: "Minimalist", value: "minimalist illustration" },
      { label: "Neo-noir", value: "neo noir lighting" },
      { label: "Retro", value: "retro anime" },
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
