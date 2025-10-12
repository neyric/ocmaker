const basePrompt = `
  WORLD CONTEXT:
  Universe: Attack on Titan
  Setting: Walled human civilization facing man-eating Titans, post-apocalyptic technology, ODM gear warfare
  Key Factions: Survey Corps, Garrison, Military Police, Warrior Unit of Marley, Yeagerists, underground resistance cells

  OUTPUT FORMAT:
  Name, Regiment/Faction, Role & Specialty, Combat Gear or Titan Power, Personality, Motivation, Backstory Snapshot

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Scout Pathfinder",
    description: "A Survey Corps veteran who charts Titan territory others fear to enter.",
    prompt: `What is your character's name?
Ilia Brauer

Which regiment or faction are they part of?
Survey Corps Special Operations Squad

What is their role and specialty?
Long-range reconnaissance using experimental mapping flares

What combat gear or Titan power do they rely on?
Dual blades, modified ODM gear, and Thunder Spear support

How would you describe their personality?
Stoic, analytical, unwaveringly loyal to her squad

What motivation drives them forward?
To discover a safe route for civilians beyond the Walls

Share a brief backstory snapshot.
Raised in Trost, Ilia swore to never let another breach catch humanity unprepared and now maps every Titan nest for Hange's team.`,
  },
  {
    title: "Wall Garrison Captain",
    description: "An engineer-soldier balancing defense work with titan-slaying duty.",
    prompt: `What is your character's name?
Marius Feldt

Which regiment or faction are they part of?
Wall Garrison 3rd Engineering Brigade

What is their role and specialty?
Coordinating wall repairs while leading an artillery fireteam

What combat gear or Titan power do they rely on?
Cannon batteries, anti-personnel ODM gear, and signal rockets

How would you describe their personality?
Pragmatic, protective, prone to dry humor under stress

What motivation drives them forward?
To keep the Walls standing long enough for civilians to rebuild

Share a brief backstory snapshot.
He lost his parents during the Trost breach and now commands the very cannons he once hid beneath as a child.`,
  },
  {
    title: "Warrior Candidate",
    description: "A Marleyan trainee torn between duty and empathy for Eldians.",
    prompt: `What is your character's name?
Greta Braun

Which regiment or faction are they part of?
Marley Warrior Unit candidate squad

What is their role and specialty?
Tactical planning and anti-ODM countermeasures

What combat gear or Titan power do they rely on?
Reinforced shotguns and thunder spear intercept launchers

How would you describe their personality?
Disciplined, conflicted, fiercely loyal to her fellow candidates

What motivation drives them forward?
To inherit the Armored Titan and redefine Marley's treatment of Eldians

Share a brief backstory snapshot.
Greta secretly trades letters with an Eldian pen pal, questioning the propaganda she is sworn to uphold.`,
  },
  {
    title: "Yeagerist Agitator",
    description: "A radicalized youth pushing for Eldian freedom at any cost.",
    prompt: `What is your character's name?
Tomas Kirsch

Which regiment or faction are they part of?
Yeagerist underground cells inside Paradis

What is their role and specialty?
Propaganda broadcasts and organizing civilian militias

What combat gear or Titan power do they rely on?
Standard ODM gear, smuggled firearms, and stolen Thunder Spears

How would you describe their personality?
Charismatic, impatient, fervently devoted to Eren's vision

What motivation drives them forward?
To force the world to respect Eldian sovereignty through the Rumbling threat

Share a brief backstory snapshot.
Formerly a refugee in Shiganshina, Tomas uses rooftop radio relays to rally supporters while dodging Military Police surveillance.`,
  },
  {
    title: "Underground Healer",
    description: "A civilian medic caring for refugees and deserters beneath the capital.",
    prompt: `What is your character's name?
Elise Moreau

Which regiment or faction are they part of?
Independent support network below Mitras

What is their role and specialty?
Medical treatment for ODM injuries and Titan trauma survivors

What combat gear or Titan power do they rely on?
Hidden clinics, anesthesia syringes, and salvaged medical blades

How would you describe their personality?
Compassionate, weary, resolute against injustice

What motivation drives them forward?
To prove that humanity survives through mercy as much as strength

Share a brief backstory snapshot.
Elise deserted the Interior MPs after witnessing their cruelty and now patches up scouts and civilians in secret catacombs.`,
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
