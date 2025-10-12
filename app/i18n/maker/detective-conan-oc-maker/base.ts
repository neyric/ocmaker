const basePrompt = `
  WORLD CONTEXT:
  Universe: Detective Conan
  Setting: Metropolitan Tokyo investigations, junior detectives, international agents, clandestine poison plots
  Key Circles: Kudo/Shinichi allies, Mouri Detective Agency, Police task forces (Takagi, Sato), Black Organization, FBI/CIA, school friends, Phantom Thief Kid encounters

  OUTPUT FORMAT:
  Name, Cover Identity & Occupation, Core Detective Skills, Support Gadgets/Allies, Personality, Target Case or Nemesis, Backstory Snapshot

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Phantom Pianist",
    description: "An undercover music teacher feeding intel to Conan's allies.",
    prompt: `What is your character's name?
Asahi Kisaragi

What is their cover identity and occupation?
Concert pianist posing as a substitute music teacher at Teitan Elementary

What core detective skills do they rely on?
Perfect pitch for identifying sonic clues and Morse-coded signals

Which support gadgets or allies assist them?
Professor Agasa's tuning fork tracker and Ayumi's Detective Boys updates

How would you describe their personality?
Gentle, observant, hides nerves behind melodic humor

What target case or nemesis drives them?
Unmasking the Black Organization agent embedded in a symphony orchestra

Share a backstory snapshot.
Lost his sister to a poisoned metronome rigged by the Organization; now he watches over students while gathering proof.`,
  },
  {
    title: "CIA Silent Runner",
    description: "A CIA courier infiltrating the Organization through errands and whispers.",
    prompt: `What is your character's name?
Leah Morgan

What is their cover identity and occupation?
Bilingual barista delivering coded drinks to Organization safe houses

What core detective skills do they rely on?
Counter-surveillance, lip-reading, quick disguises

Which support gadgets or allies assist them?
FBI handler Camel and a watch communicator tuned to Conan

How would you describe their personality?
Efficient, cautious, prone to dry sarcasm

What target case or nemesis drives them?
Tracking the codename Vermouth to expose their newest double agent

Share a backstory snapshot.
Joined the CIA after her mentor vanished while tailing a Black Organization courier in New York.`,
  },
  {
    title: "Eden Academy Plant",
    description: "A teenager posing as a prodigy to spy on elite families for evidence.",
    prompt: `What is your character's name?
Junpei Sato

What is their cover identity and occupation?
Scholarship student at Tohto Academy's honors division

What core detective skills do they rely on?
Photographic memory and speed-solving logic puzzles

Which support gadgets or allies assist them?
Miniature camera tie from Agasa and Sonoko's society invitations

How would you describe their personality?
Polite, calculating, hides righteous anger

What target case or nemesis drives them?
A blackmailer targeting politicians through their children

Share a backstory snapshot.
His mother was wrongfully imprisoned due to fabricated evidence; Junpei infiltrates elite circles to destroy the forger.`,
  },
  {
    title: "Osaka Gadgeteer",
    description: "A Kansai inventor crafting gadgets for Heiji's investigations.",
    prompt: `What is your character's name?
Tsubasa Yagami

What is their cover identity and occupation?
Electronics club president and part-time shrine caretaker

What core detective skills do they rely on?
Evidence preservation and radio triangulation

Which support gadgets or allies assist them?
Custom drone crow, Kazuha's martial backup, Heiji's trust

How would you describe their personality?
Boisterous, loyal, loves dramatic reveals

What target case or nemesis drives them?
A phantom thief stealing national treasures under moonless skies

Share a backstory snapshot.
Built his first gadget to protect the family shrine bells from vandals hired by land developers.`,
  },
  {
    title: "Undercover Idol",
    description: "An idol using her fame to lure out stalkers tied to secret experiments.",
    prompt: `What is your character's name?
Miko Aihara

What is their cover identity and occupation?
Chart-topping idol touring nationwide

What core detective skills do they rely on?
Crowd pattern analysis and subliminal clue planting during shows

Which support gadgets or allies assist them?
Bodyguard from the Metropolitan Police and Haibara's chemical scanners

How would you describe their personality?
Outgoing on stage, introspective in private, fearless for fans

What target case or nemesis drives them?
A pharmaceutical conglomerate testing drugs on obsessive fans

Share a backstory snapshot.
Her childhood friend disappeared after attending a secret fan event; she rebuilt her career to infiltrate the sponsors behind it.`,
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
        value: "1boy"
      },
      {
        label: "Girl",
        value: "1girl"
      },
      {
        label: "Non-binary",
        value: "1person"
      }
    ]
  },
  {
    title: "Age",
    key: "age",
    data: [
      {
        label: "Young teen",
        value: "teen"
      },
      {
        label: "Late teen",
        value: "late teen"
      },
      {
        label: "Young adult",
        value: "young adult"
      },
      {
        label: "Experienced adult",
        value: "adult"
      },
      {
        label: "Veteran",
        value: "veteran"
      },
      {
        label: "Seasoned elder",
        value: "seasoned elder"
      },
      {
        label: "Timeless legend",
        value: "timeless legend"
      },
      {
        label: "Elementary prodigy",
        value: "elementary prodigy"
      },
      {
        label: "High school sleuth",
        value: "high school sleuth"
      },
      {
        label: "University detective",
        value: "university detective"
      },
      {
        label: "Young inspector",
        value: "young inspector"
      },
      {
        label: "Veteran agent",
        value: "veteran agent"
      }
    ]
  },
  {
    title: "Body",
    key: "body",
    data: [
      {
        label: "Slender",
        value: "slender"
      },
      {
        label: "Athletic",
        value: "athletic"
      },
      {
        label: "Muscular",
        value: "muscular"
      },
      {
        label: "Tall",
        value: "tall"
      },
      {
        label: "Petite",
        value: "petite"
      },
      {
        label: "Burly",
        value: "burly"
      },
      {
        label: "Graceful",
        value: "graceful"
      }
    ]
  },
  {
    title: "Hair",
    key: "hair",
    data: [
      {
        label: "Short black hair",
        value: "short black hair"
      },
      {
        label: "Long brown hair",
        value: "long brown hair"
      },
      {
        label: "Blonde hair",
        value: "blonde hair"
      },
      {
        label: "Red hair",
        value: "red hair"
      },
      {
        label: "Silver hair",
        value: "silver hair"
      },
      {
        label: "Blue hair",
        value: "blue hair"
      },
      {
        label: "White hair",
        value: "white hair"
      },
      {
        label: "Braided hair",
        value: "braided hair"
      },
      {
        label: "Wavy lavender hair",
        value: "wavy lavender hair"
      }
    ]
  },
  {
    title: "Eyes",
    key: "eyes",
    data: [
      {
        label: "Brown eyes",
        value: "brown eyes"
      },
      {
        label: "Blue eyes",
        value: "blue eyes"
      },
      {
        label: "Green eyes",
        value: "green eyes"
      },
      {
        label: "Amber eyes",
        value: "amber eyes"
      },
      {
        label: "Gray eyes",
        value: "gray eyes"
      },
      {
        label: "Violet eyes",
        value: "violet eyes"
      },
      {
        label: "Golden eyes",
        value: "golden eyes"
      }
    ]
  },
  {
    title: "Face",
    key: "face",
    data: [
      {
        label: "Determined expression",
        value: "determined expression"
      },
      {
        label: "Smiling",
        value: "smiling expression"
      },
      {
        label: "Serious look",
        value: "serious expression"
      },
      {
        label: "Stoic face",
        value: "stoic expression"
      },
      {
        label: "Playful grin",
        value: "playful grin"
      },
      {
        label: "Fierce snarl",
        value: "fierce snarl"
      },
      {
        label: "Warm smile",
        value: "warm smile"
      }
    ]
  },
  {
    title: "Skin",
    key: "skin",
    data: [
      {
        label: "Fair skin",
        value: "fair skin"
      },
      {
        label: "Warm tan skin",
        value: "tan skin"
      },
      {
        label: "Olive skin",
        value: "olive skin"
      },
      {
        label: "Deep brown skin",
        value: "deep brown skin"
      },
      {
        label: "Freckled skin",
        value: "freckled skin"
      },
      {
        label: "Porcelain skin",
        value: "porcelain skin"
      },
      {
        label: "Sunburned skin",
        value: "sunburned skin"
      }
    ]
  },
  {
    title: "Top",
    key: "top",
    data: [
      {
        label: "Utility jacket",
        value: "utility jacket"
      },
      {
        label: "Layered coat",
        value: "layered coat"
      },
      {
        label: "Casual tunic",
        value: "casual tunic"
      },
      {
        label: "Armored vest",
        value: "armored vest"
      },
      {
        label: "Loose shirt",
        value: "loose shirt"
      },
      {
        label: "Hooded cloak",
        value: "hooded cloak"
      },
      {
        label: "Ceremonial robe",
        value: "ceremonial robe"
      },
      {
        label: "Teitan school blazer",
        value: "teitan blazer"
      },
      {
        label: "Mouri detective coat",
        value: "mouri detective coat"
      },
      {
        label: "FBI field jacket",
        value: "fbi field jacket"
      },
      {
        label: "Black Organization suit",
        value: "black organization suit"
      },
      {
        label: "Osaka casual cardigan",
        value: "osaka casual cardigan"
      }
    ]
  },
  {
    title: "Bottom",
    key: "bottom",
    data: [
      {
        label: "Cargo trousers",
        value: "cargo trousers"
      },
      {
        label: "Fitted pants",
        value: "fitted pants"
      },
      {
        label: "Pleated skirt",
        value: "pleated skirt"
      },
      {
        label: "Battle-ready shorts",
        value: "battle shorts"
      },
      {
        label: "Flowing robes",
        value: "flowing robes"
      },
      {
        label: "Armored greaves",
        value: "armored greaves"
      },
      {
        label: "Layered wraps",
        value: "layered wraps"
      },
      {
        label: "School shorts",
        value: "school shorts"
      },
      {
        label: "Pleated uniform skirt",
        value: "pleated uniform skirt"
      },
      {
        label: "Detective slacks",
        value: "detective slacks"
      },
      {
        label: "Undercover jeans",
        value: "undercover jeans"
      },
      {
        label: "Tactical trousers",
        value: "tactical trousers"
      }
    ]
  },
  {
    title: "Set",
    key: "set",
    data: [
      {
        label: "Combat uniform",
        value: "combat uniform"
      },
      {
        label: "Casual traveler",
        value: "casual traveler outfit"
      },
      {
        label: "Formal attire",
        value: "formal attire"
      },
      {
        label: "Stealth gear",
        value: "stealth gear"
      },
      {
        label: "Festival outfit",
        value: "festival outfit"
      },
      {
        label: "Royal regalia",
        value: "royal regalia"
      },
      {
        label: "Nomad attire",
        value: "nomad attire"
      },
      {
        label: "Teitan student",
        value: "teitan student set"
      },
      {
        label: "Detective Boys field trip",
        value: "detective boys field trip"
      },
      {
        label: "Metropolitan Police",
        value: "metropolitan police uniform"
      },
      {
        label: "Black Organization",
        value: "black organization set"
      },
      {
        label: "CIA undercover",
        value: "cia undercover set"
      }
    ]
  },
  {
    title: "Material",
    key: "material",
    data: [
      {
        label: "Woven fabric",
        value: "woven fabric"
      },
      {
        label: "Polished leather",
        value: "polished leather"
      },
      {
        label: "Reinforced armor",
        value: "reinforced armor"
      },
      {
        label: "High-tech fiber",
        value: "high-tech fiber"
      },
      {
        label: "Organic weave",
        value: "organic weave"
      },
      {
        label: "Dragonhide",
        value: "dragonhide"
      },
      {
        label: "Mystic cloth",
        value: "mystic cloth"
      },
      {
        label: "Uniform twill",
        value: "uniform twill"
      },
      {
        label: "Waterproof trench",
        value: "waterproof trench"
      },
      {
        label: "Disguise layering",
        value: "disguise layering"
      },
      {
        label: "Kevlar weave",
        value: "kevlar weave"
      },
      {
        label: "Silk tie",
        value: "silk tie"
      }
    ]
  },
  {
    title: "Accessory",
    key: "accessory",
    data: [
      {
        label: "Utility belt",
        value: "utility belt"
      },
      {
        label: "Gloves",
        value: "gloves"
      },
      {
        label: "Scarf",
        value: "scarf"
      },
      {
        label: "Headgear",
        value: "headgear"
      },
      {
        label: "Jewelry",
        value: "jewelry"
      },
      {
        label: "Bandolier",
        value: "bandolier"
      },
      {
        label: "Magic tome",
        value: "magic tome accessory"
      },
      {
        label: "Bowtie voice changer",
        value: "bowtie voice changer"
      },
      {
        label: "Wristwatch tranquilizer",
        value: "wristwatch tranquilizer"
      },
      {
        label: "Detective badge",
        value: "detective badge accessory"
      },
      {
        label: "Goggles headset",
        value: "goggles headset"
      },
      {
        label: "Espionage earpiece",
        value: "espionage earpiece"
      }
    ]
  },
  {
    title: "Allegiance",
    key: "dc_allegiance",
    data: [
      {
        label: "Detective Boys",
        value: "detective boys"
      },
      {
        label: "Metropolitan Police",
        value: "metropolitan police"
      },
      {
        label: "Black Organization",
        value: "black organization"
      },
      {
        label: "FBI/CIA",
        value: "fbi cia"
      },
      {
        label: "Freelance detective",
        value: "freelance detective"
      }
    ]
  }
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
    title: "Detective Conan OC Maker",
    description:
      "Generate your own Detective Conan OC with AI. Create characters, backstories, and visuals in the classic detective style.",
  },
  series: "Detective Conan",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Detective Conan OC Maker",
      description:
        "Generate your own Detective Conan OC with AI. Create characters, backstories, and visuals in the classic detective style.",
    },
    step: {
      title: "How to Make Detective Conan OC",
      description:
        "Creating a Detective Conan-style character with OC Maker is easy. Just follow these two steps to bring your idea to life.",
      steps: [
        {
          title: "Describe Your Detective Conan OC",
          description:
            "Fill in the form with your character's basic appearance and personality. For best results, include Detective Conan-style features like formal detective attire, school uniforms, and the sharp intellect of a mystery solver.",
        },
        {
          title: "Add Details and Detective Elements",
          description:
            "Include extra details like detective gadgets, investigative skills, or connections to the Black Organization. The more your character fits into the Detective Conan universe of mysteries and crime-solving, the more accurate and impressive the result will be.",
        },
        {
          title: "Generate and Finalize Design",
          description:
            "Click the 'Generate Character' button to create your Detective Conan OC. You'll get several AI-generated designs — pick your favorite to complete your character.",
        },
      ],
    },
    examples: {
      title: "Detective Conan Examples",
      description:
        "Explore Detective Conan characters made from text prompts, created using the Detective Conan OC Maker.",
      examples,
    },
    features: {
      title: "What is Detective Conan OC Maker?",
      description:
        "Detective Conan OC Maker is a version of OC Maker fine-tuned for the world of Detective Conan. Describe your character, and instantly turn it into Detective Conan-style artwork.",
      features: [
        {
          label: "Authentic Detective Conan Character Design",
          description:
            "Create characters that truly capture the mystery-solving spirit of Detective Conan, designed to seamlessly fit into the world of crime, deduction, and clever investigations.",
        },
        {
          label: "Tailored Prompt Tuning",
          description:
            "Prompts are fine-tuned for Detective Conan aesthetics — from detective gear to school uniforms — helping you build more convincing characters.",
        },
        {
          label: "Fast Character Generation",
          description:
            "Generate high-quality characters in just seconds, allowing you to focus more on refining ideas and less on waiting.",
        },
        {
          label: "High-Quality Visual Output",
          description:
            "Powered by advanced AI models, Detective Conan OC Maker delivers detailed, high-resolution character images suitable for storytelling, design, or sharing.",
        },
        {
          label: "Choose from Multiple Results",
          description:
            "Generate multiple character options per prompt and select your favorites to finalize as your official Detective Conan OC.",
        },
        {
          label: "Deep Story Integration",
          description:
            "Bring your OC to life with not just visuals, but also compelling backstories, detective cases, and rich connections to the Detective Conan universe.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is Detective Conan OC Maker and how does it work?",
          answer:
            "Detective Conan OC Maker is a specialized version of OC Maker, fine-tuned for the Detective Conan universe. Simply describe your character, and our AI will generate anime-style Detective Conan visuals in seconds based on your prompt.",
        },
        {
          question:
            "How can I create better characters with Detective Conan OC Maker?",
          answer:
            "For best results, include Detective Conan-specific traits in your description, such as detective skills, formal attire, or connections to ongoing mysteries. The more vivid and detailed your input, the more accurate and compelling the output.",
        },
        {
          question: "Is Detective Conan OC Maker free to use?",
          answer:
            "Yes, Detective Conan OC Maker offers free character generation with basic features. For faster results, premium options, and additional control, you can upgrade your plan anytime.",
        },
        {
          question:
            "What makes Detective Conan OC Maker's results so impressive?",
          answer:
            "Detective Conan OC Maker uses cutting-edge AI models fine-tuned for the Detective Conan setting, ensuring characters match the classic art style and investigative atmosphere of the series.",
        },
        {
          question:
            "Can I use characters made with Detective Conan OC Maker for commercial projects?",
          answer:
            "Yes, any characters you create using Detective Conan OC Maker are yours to use freely for both personal and commercial purposes. We do not claim ownership over your creations.",
        },
        {
          question: "Do I need an account to use Detective Conan OC Maker?",
          answer:
            "No account is required for basic use. However, creating an account lets you save your characters, track generation history, and access more features.",
        },
        {
          question:
            "Can I regenerate or fine-tune the same character in Detective Conan OC Maker?",
          answer:
            "Yes, you can regenerate results from the same prompt or adjust your inputs to refine your character until it fits your vision perfectly.",
        },
        {
          question:
            "Will there be more anime-style OC Makers like Detective Conan OC Maker?",
          answer:
            "Yes! We plan to release more specialized OC Makers tailored for different anime universes. Stay tuned for future updates on ocmaker.app.",
        },
      ],
    },
    cta: {
      title: "Create Your Own Detective Conan Character",
      description:
        "Bring your original Detective Conan character to life — no drawing skills needed. Just describe, generate, and explore.",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
