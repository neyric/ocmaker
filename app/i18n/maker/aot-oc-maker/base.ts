const basePrompt = `
  WORLD CONTEXT:
  Universe: One Piece
  Major Factions: Pirates (various crews across East Blue, Grand Line, and New World), Marines/World Government, Revolutionary Army, Celestial Dragons, Shichibukai/Warlords, Cipher Pol organizations, Independent forces (bounty hunters, merchants, kingdoms)

  OUTPUT FORMAT:
  Name, Faction, Haki Types, Devil Fruit, Origin, Personality, Backstory

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Pirate",
    description: "A free-spirited adventurer who laughs in the face of danger.",
    prompt: `What is your character's name?
Rion D. Crest

What is your affiliation?
Pirate – captain of the Laughing Tide Crew

Has your character eaten a Devil Fruit?
No – relies purely on Haki and instinct

What is your goal?
To find the island said to echo with eternal laughter

What is your personality?
Reckless, cheerful, and unbreakably free`,
  },
  {
    title: "Marine",
    description: "A young officer torn between justice and blind obedience.",
    prompt: `What is your character's name?
Lira Frost

What is your affiliation?
Marine Headquarters, North Blue Division

Has your character eaten a Devil Fruit?
Yes – the Hie Hie no Mi (Ice-Ice Fruit)

What is your goal?
To redefine what justice truly means within the Marines

What is your personality?
Calm, loyal, but quietly defiant toward authority`,
  },
  {
    title: "Revolutionary",
    description:
      "A rebel scholar who fights oppression through knowledge and strategy.",
    prompt: `What is your character's name?
Dr. Evan Creed

What is your affiliation?
Revolutionary Army intelligence branch

Has your character eaten a Devil Fruit?
No – uses advanced technology and tactics instead

What is your goal?
To expose the World Government’s historical cover-ups

What is your personality?
Analytical, idealistic, and quietly fearless`,
  },
  {
    title: "Celestial Dragon",
    description:
      "A spoiled noble who begins to question their divine privilege.",
    prompt: `What is your character's name?
Saint Aurelia Donquixote

What is your affiliation?
World Nobles – Holy Land of Mariejois

Has your character eaten a Devil Fruit?
Yes – the Mira Mira no Mi (Mirror-Mirror Fruit)

What is your goal?
To escape the Holy Land and live as an ordinary human

What is your personality?
Proud yet curious; torn between guilt and desire for freedom`,
  },
  {
    title: "Bounty Hunter",
    description:
      "A lone tracker who hunts pirates for both justice and revenge.",
    prompt: `What is your character's name?
Taro Steeljaw

What is your affiliation?
Independent bounty hunter from Fishman Island

Has your character eaten a Devil Fruit?
No – relies on Fishman strength and Armament Haki

What is your goal?
To capture the pirate who destroyed his hometown

What is your personality?
Stoic, relentless, but compassionate toward the innocent`,
  },
];

const ocOptions = [
  {
    title: "Gender",
    key: "gender",
    unique: true,
    data: [
      { label: "Boy", value: "1boy" },
      { label: "Girl", value: "1girl" },
      { label: "Other", value: "" },
    ],
  },
  {
    title: "Faction",
    key: "faction",
    data: [
      { label: "Pirate", value: "pirate" },
      { label: "Marine", value: "marine" },
      { label: "Revolutionary Army", value: "revolutionary army" },
      { label: "Bounty Hunter", value: "bounty hunter" },
      { label: "Civilian", value: "civilian" },
    ],
  },
  {
    title: "Role",
    key: "role",
    data: [
      { label: "Captain", value: "captain" },
      { label: "First Mate", value: "first mate" },
      { label: "Navigator", value: "navigator" },
      { label: "Swordsman", value: "swordsman" },
      { label: "Sniper", value: "sniper" },
      { label: "Cook", value: "cook" },
      { label: "Doctor", value: "doctor" },
      { label: "Shipwright", value: "shipwright" },
    ],
  },
  {
    title: "Clothing Style",
    key: "clothing",
    data: [
      { label: "Pirate outfit", value: "pirate outfit" },
      { label: "Marine uniform", value: "marine uniform" },
      { label: "Noble attire", value: "noble attire" },
      { label: "Revolutionary uniform", value: "revolutionary uniform" },
      { label: "Casual island wear", value: "casual island wear" },
      { label: "Battle outfit", value: "battle outfit" },
      { label: "Cloak or coat", value: "cloak" },
    ],
  },
  {
    title: "Weapon",
    key: "weapon",
    data: [
      { label: "Katana", value: "katana" },
      { label: "Dual swords", value: "dual swords" },
      { label: "Gun", value: "gun" },
      { label: "Rifle", value: "rifle" },
      { label: "Spear", value: "spear" },
      { label: "Staff", value: "staff" },
      { label: "No weapon", value: "unarmed" },
    ],
  },
  {
    title: "Fighting Style",
    key: "fighting_style",
    data: [
      { label: "Swordsmanship", value: "swordsmanship" },
      { label: "Martial arts", value: "martial arts" },
      { label: "Sniping", value: "sniping" },
      { label: "Kicking combat", value: "kicking combat" },
      { label: "Fishman karate", value: "fishman karate" },
      { label: "Devil fruit ability", value: "devil fruit ability" },
      { label: "Haki user", value: "haki user" },
    ],
  },
  {
    title: "Devil Fruit Type",
    key: "devil_fruit",
    data: [
      { label: "Paramecia type", value: "paramecia type" },
      { label: "Logia type", value: "logia type" },
      { label: "Zoan type", value: "zoan type" },
      { label: "Mythical zoan type", value: "mythical zoan type" },
      { label: "No devil fruit", value: "no devil fruit" },
    ],
  },
  {
    title: "Haki Type",
    key: "haki",
    data: [
      { label: "Observation haki", value: "observation haki" },
      { label: "Armament haki", value: "armament haki" },
      { label: "Conqueror's haki", value: "conqueror haki" },
      { label: "No haki", value: "no haki" },
    ],
  },
  {
    title: "Body Type",
    key: "body_type",
    data: [
      { label: "Slim", value: "slim" },
      { label: "Athletic", value: "athletic" },
      { label: "Muscular", value: "muscular" },
      { label: "Tall", value: "tall" },
      { label: "Short", value: "short" },
    ],
  },
  {
    title: "Hair Color",
    key: "hair_color",
    data: [
      { label: "Black hair", value: "black hair" },
      { label: "Blonde hair", value: "blonde hair" },
      { label: "Red hair", value: "red hair" },
      { label: "Blue hair", value: "blue hair" },
      { label: "Green hair", value: "green hair" },
      { label: "White hair", value: "white hair" },
      { label: "Pink hair", value: "pink hair" },
      { label: "Silver hair", value: "silver hair" },
    ],
  },
  {
    title: "Accessories",
    key: "accessories",
    data: [
      { label: "Bandana", value: "bandana" },
      { label: "Hat", value: "hat" },
      { label: "Earrings", value: "earrings" },
      { label: "Scarf", value: "scarf" },
      { label: "Sunglasses", value: "sunglasses" },
      { label: "Cape", value: "cape" },
    ],
  },
  {
    title: "Personality",
    key: "personality",
    data: [
      { label: "Brave", value: "brave" },
      { label: "Calm", value: "calm" },
      { label: "Hot-blooded", value: "hot-blooded" },
      { label: "Cheerful", value: "cheerful" },
      { label: "Serious", value: "serious" },
      { label: "Loyal", value: "loyal" },
      { label: "Reckless", value: "reckless" },
    ],
  },
  {
    title: "Expression",
    key: "expression",
    data: [
      { label: "Smiling", value: "smiling" },
      { label: "Serious", value: "serious" },
      { label: "Angry", value: "angry" },
      { label: "Confident", value: "confident" },
      { label: "Determined", value: "determined" },
      { label: "Calm", value: "calm" },
    ],
  },
];

const examples = [
  {
    image: "https://cdn.ocmaker.app/example/aot-oc-generated-1.webp",
    prompt:
      "1boy, long gold hair, silver eyes, attack on titan style survey corps uniform, cape, dual swords, battle pose, determined expression, looking at viewer, simple background, upper body",
  },
  {
    image: "https://cdn.ocmaker.app/example/aot-oc-generated-2.webp",
    prompt:
      "1girl, long silver hair, red eyes, attack on titan style survey corps uniform, cape, dual swords, battle pose, determined expression, looking at viewer, simple background, upper body, masterpiece, best quality, very aesthetic, absurdres",
  },
  {
    image: "https://cdn.ocmaker.app/example/aot-oc-generated-3.webp",
    prompt:
      "1boy, long gold hair, silver eyes, attack on titan style survey corps uniform, cape, dual swords, battle pose, determined expression, looking at viewer, simple background, upper body",
  },
  {
    image: "https://cdn.ocmaker.app/example/aot-oc-generated-4.webp",
    prompt:
      "1boy, long gold hair, silver eyes, attack on titan style survey corps uniform, cape, dual swords, battle pose, determined expression, looking at viewer, simple background, upper body",
  },
  {
    image: "https://cdn.ocmaker.app/example/aot-oc-generated-5.webp",
    prompt:
      "1girl, medium length black hair, sharp amber eyes, serious expression, attack on titan style uniform, tactical harness, dark brown jacket, white pants, leather boots, standing in wind, looking at viewer, simple background, upper body",
  },
  {
    image: "https://cdn.ocmaker.app/example/aot-oc-generated-6.webp",
    prompt:
      "1girl, long red hair, brown eyes, attack on titan style survey corps uniform, cape, dual swords, standing pose, determined expression, looking at viewer, simple background, upper body",
  },
  {
    image: "https://cdn.ocmaker.app/example/aot-oc-generated-7.webp",
    prompt:
      "1boy, messy silver hair, gray eyes, brooding expression, Attack on Titan style elite uniform, long coat, standing confidently, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/aot-oc-generated-8.webp",
    prompt:
      "1girl, silver white twin braids, violet eyes, cat ears, melancholic and sharp expression, attack on titan style black and red skintight battle suit, survey corps emblem, glowing dual chakrams, magical weapon, standing pose, simple background, upper body",
  },
];

export default {
  meta: {
    title: "AOT OC Maker",
    description:
      "Generate your own Attack on Titan OC with AI. Create characters, backstories, and visuals in the iconic AOT style.",
  },
  series: "One Piece",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions: ocOptions,
  contents: {
    hero: {
      title: "AOT OC Maker",
      description:
        "Generate your own Attack on Titan OC with AI. Create characters, backstories, and visuals in the iconic AOT style.",
    },
    step: {
      title: "How to Make AOT OC",
      description:
        "Creating an AOT-style character with OC Maker is easy. Just follow these two steps to bring your idea to life.",
      steps: [
        {
          title: "Describe Your AOT OC",
          description:
            "Fill in the form with your character’s basic appearance and personality. For best results, include AOT-style features like short black hair, rugged military uniforms, and the determined mindset of a soldier.",
        },
        {
          title: "Add Details and World Elements",
          description:
            "Include extra details like Survey Corps gear, Titan shifting abilities, or unique weapons. The more your character fits into the AOT universe, the more accurate and impressive the result will be.",
        },
        {
          title: "Generate and Finalize Design",
          description:
            "Click the 'Generate Character' button to create your AOT OC. You'll get several AI-generated designs — pick your favorite to complete your character.",
        },
      ],
    },
    examples: {
      title: "AOT Examples",
      description:
        "Explore AOT characters made from text prompts, created using the AOT OC Maker.",
      examples,
    },
    features: {
      title: "What is AOT OC Maker?",
      description:
        "AOT OC Maker is a version of OC Maker fine-tuned for the world of Attack on Titan. Describe your character, and instantly turn it into AOT-style artwork.",
      features: [
        {
          label: "Authentic AOT Character Design",
          description:
            "Create characters that truly capture the intense spirit of Attack on Titan, designed to seamlessly fit into the world of Titans, soldiers, and survival.",
        },
        {
          label: "Tailored Prompt Tuning",
          description:
            "Prompts are fine-tuned for AOT aesthetics — from rugged military uniforms to bold personality traits — helping you build more convincing characters.",
        },
        {
          label: "Fast Character Generation",
          description:
            "Generate high-quality characters in just seconds, allowing you to focus more on refining ideas and less on waiting.",
        },
        {
          label: "High-Quality Visual Output",
          description:
            "Powered by advanced AI models, AOT OC Maker delivers detailed, high-resolution character images suitable for storytelling, design, or sharing.",
        },
        {
          label: "Choose from Multiple Results",
          description:
            "Generate multiple character options per prompt and select your favorites to finalize as your official AOT OC.",
        },
        {
          label: "Deep Story Integration",
          description:
            "Bring your OC to life with not just visuals, but also compelling backstories, motivations, and rich connections to the AOT universe.",
        },
      ],
    },

    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is AOT OC Maker and how does it work?",
          answer:
            "AOT OC Maker is a specialized version of OC Maker, fine-tuned for the Attack on Titan universe. Simply describe your character, and our AI will generate anime-style AOT visuals in seconds based on your prompt.",
        },
        {
          question: "How can I create better characters with AOT OC Maker?",
          answer:
            "For best results, include AOT-specific traits in your description, such as military gear, Titan powers, or a tragic backstory. The more vivid and detailed your input, the more accurate and compelling the output.",
        },
        {
          question: "Is AOT OC Maker free to use?",
          answer:
            "Yes, AOT OC Maker offers free character generation with basic features. For faster results, premium options, and additional control, you can upgrade your plan anytime.",
        },
        {
          question: "What makes AOT OC Maker’s results so impressive?",
          answer:
            "AOT OC Maker uses cutting-edge AI models fine-tuned for the Attack on Titan setting, ensuring characters match the iconic style and emotional intensity of the series.",
        },
        {
          question:
            "Can I use characters made with AOT OC Maker for commercial projects?",
          answer:
            "Yes, any characters you create using AOT OC Maker are yours to use freely for both personal and commercial purposes. We do not claim ownership over your creations.",
        },
        {
          question: "Do I need an account to use AOT OC Maker?",
          answer:
            "No account is required for basic use. However, creating an account lets you save your characters, track generation history, and access more features.",
        },
        {
          question:
            "Can I regenerate or fine-tune the same character in AOT OC Maker?",
          answer:
            "Yes, you can regenerate results from the same prompt or adjust your inputs to refine your character until it fits your vision perfectly.",
        },
        {
          question:
            "Will there be more anime-style OC Makers like AOT OC Maker?",
          answer:
            "Yes! We plan to release more specialized OC Makers tailored for different anime universes. Stay tuned for future updates on ocmaker.app.",
        },
      ],
    },
    cta: {
      title: "Create Your Own AOT Character",
      description:
        "Bring your original Attack on Titan character to life — no drawing skills needed. Just describe, generate, and explore",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
