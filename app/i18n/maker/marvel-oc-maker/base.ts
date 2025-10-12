const basePrompt = `
  WORLD CONTEXT:
  Universe: Marvel Universe (Earth-616 tone)
  Setting: Avengers-level threats, street heroes, cosmic adventures, S.H.I.E.L.D. missions, mutant politics, multiverse branches
  Key Factions: Avengers, X-Men/Krakoa, Guardians of the Galaxy, S.H.I.E.L.D., Hydra/A.I.M., Defenders, Fantastic Four, Thunderbolts, villain syndicates

  OUTPUT FORMAT:
  Name, Alter Ego & Alignment, Powers or Tech, Team Affiliations, Personality, Core Motivation, Origin Story Snapshot

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Brooklyn Web Guardian",
    description: "A street-level hero swinging between boroughs with energy webs.",
    prompt: `What is your character's name?
Naomi Ruiz

What is their alter ego and alignment?
Hero name: Silkstrike, alignment: Vigilante hero

What powers or technology do they wield?
Bio-electric webs and wall-crawling from experimental spider DNA

Which teams or organizations are they affiliated with?
Young Avengers reserve, works with Spider-Man

How would you describe their personality?
Snarky, empathetic, relentless

What core motivation drives them?
To protect neighborhoods ignored by bigger heroes

Share an origin story snapshot.
Bitten by a spider during a Roxxon break-in, she stole the antidote to save her mother and now repurposes Roxxon tech to keep streets safe.`,
  },
  {
    title: "Stark Industries Designer",
    description: "A genius engineer crafting modular suits for global crises.",
    prompt: `What is your character's name?
Dr. Rhea Patel

What is their alter ego and alignment?
Hero name: Photon Forge, alignment: Avengers consultant

What powers or technology do they wield?
Photon-forged armor able to manipulate light constructs

Which teams or organizations are they affiliated with?
Avengers support division, S.W.O.R.D. tech collaborator

How would you describe their personality?
Brilliant, composed, sly sense of humor

What core motivation drives them?
To ensure Earth stays ahead of interstellar threats

Share an origin story snapshot.
Developed a photon-reactor prototype that foiled a Skrull infiltration and now leads Stark's deep-space defense lab.`,
  },
  {
    title: "Klyntar Diplomat",
    description: "A reformed symbiote host mediating peace between species.",
    prompt: `What is your character's name?
Eli Vargas

What is their alter ego and alignment?
Hero name: Accord, alignment: Neutral protector

What powers or technology do they wield?
Symbiote armor with empathic resonance abilities

Which teams or organizations are they affiliated with?
Guardians of the Galaxy liaison, works with Venom

How would you describe their personality?
Calm, stoic, empathetic

What core motivation drives them?
To prove symbiotes can choose harmony over domination

Share an origin story snapshot.
Bonded with a rogue symbiote during a Nova Corps mission and brokered a truce that saved Xandar from a hive uprising.`,
  },
  {
    title: "Wakandan Anthropologist",
    description: "A Wakandan scholar wielding vibranium constructs to protect culture.",
    prompt: `What is your character's name?
Imani N'dare

What is their alter ego and alignment?
Hero name: Kinetic Scribe, alignment: Hero

What powers or technology do they wield?
Vibranium tattoo tech projecting hard-light glyph shields

Which teams or organizations are they affiliated with?
Dora Milaje research unit, World Outreach Center

How would you describe their personality?
Wise, passionate, fiercely loyal

What core motivation drives them?
To preserve Wakanda's heritage while sharing knowledge responsibly

Share an origin story snapshot.
Used experimental tattoos to defend artifacts from a Hydra heist, earning Shuri's sponsorship for global outreach missions.`,
  },
  {
    title: "Latverian Rebel",
    description: "A rogue sorcerer challenging Doom's rule while treading moral gray lines.",
    prompt: `What is your character's name?
Viktor Danescu

What is their alter ego and alignment?
Code name: Revolt, alignment: Anti-hero

What powers or technology do they wield?
Mystic gunblade channeling chaos magic

Which teams or organizations are they affiliated with?
Secret alliance with Doctor Strange, Midnight Sons contact

How would you describe their personality?
Brooding, charismatic, vengeful

What core motivation drives them?
To liberate his village from Doom's iron grip

Share an origin story snapshot.
Discovered ancient spellbooks hidden beneath Latveria's ruins and now leads a magical resistance cell.`,
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
        label: "Young hero",
        value: "young hero"
      },
      {
        label: "Seasoned avenger",
        value: "seasoned avenger"
      },
      {
        label: "Street vigilante",
        value: "street vigilante"
      },
      {
        label: "Cosmic adventurer",
        value: "cosmic adventurer"
      },
      {
        label: "Timeless immortal",
        value: "timeless marvel immortal"
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
      }
    ]
  },
  {
    title: "Top",
    key: "top",
    data: [
      {
        label: "Super suit",
        value: "super suit"
      },
      {
        label: "Shield tactical jacket",
        value: "shield tactical jacket"
      },
      {
        label: "Friendly neighborhood hoodie",
        value: "friendly neighborhood hoodie"
      },
      {
        label: "Cosmic armor",
        value: "cosmic armor"
      },
      {
        label: "Mystic cloak",
        value: "mystic cloak"
      }
    ]
  },
  {
    title: "Bottom",
    key: "bottom",
    data: [
      {
        label: "Hero leggings",
        value: "hero leggings"
      },
      {
        label: "Stealth pants",
        value: "stealth pants"
      },
      {
        label: "Armor greaves",
        value: "armor greaves"
      },
      {
        label: "Casual jeans",
        value: "marvel casual jeans"
      },
      {
        label: "Cosmic plating",
        value: "cosmic plating"
      }
    ]
  },
  {
    title: "Set",
    key: "set",
    data: [
      {
        label: "Avengers uniform",
        value: "avengers uniform"
      },
      {
        label: "X-Men suit",
        value: "xmen suit"
      },
      {
        label: "Guardians space gear",
        value: "guardians space gear"
      },
      {
        label: "Street-level vigilante",
        value: "street level vigilante"
      },
      {
        label: "Mystic arts robes",
        value: "mystic arts robes"
      }
    ]
  },
  {
    title: "Material",
    key: "material",
    data: [
      {
        label: "Vibranium weave",
        value: "vibranium weave"
      },
      {
        label: "Stark tech mesh",
        value: "stark tech mesh"
      },
      {
        label: "Symbiote bio-suit",
        value: "symbiote bio suit"
      },
      {
        label: "Nano armor",
        value: "nano armor"
      },
      {
        label: "Mystic runes",
        value: "mystic runes"
      }
    ]
  },
  {
    title: "Accessory",
    key: "accessory",
    data: [
      {
        label: "Web shooters",
        value: "web shooters"
      },
      {
        label: "Shield emblem",
        value: "shield emblem"
      },
      {
        label: "Infinity shard",
        value: "infinity shard"
      },
      {
        label: "Arc reactor",
        value: "arc reactor"
      },
      {
        label: "Cape of levitation",
        value: "cape of levitation"
      }
    ]
  },
  {
    title: "Alignment",
    key: "marvel_alignment",
    data: [
      {
        label: "Hero",
        value: "hero"
      },
      {
        label: "Anti-hero",
        value: "anti hero"
      },
      {
        label: "Villain",
        value: "villain"
      },
      {
        label: "S.H.I.E.L.D.",
        value: "shield"
      },
      {
        label: "Mutant",
        value: "mutant"
      }
    ]
  }
];

const examples = [
  {
    image: "https://cdn.ocmaker.app/example/marvel-oc-generated-1.webp",
    prompt:
      "1girl, red hair, green eyes, confident expression, tactical bodysuit, fingerless gloves, utility belt, determined stance, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
  {
    image: "https://cdn.ocmaker.app/example/marvel-oc-generated-2.webp",
    prompt:
      "1boy, black hair, brown eyes, smug expression, high-tech armor suit, glowing arc reactor, metallic shoulder pads, raised eyebrow, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
  {
    image: "https://cdn.ocmaker.app/example/marvel-oc-generated-3.webp",
    prompt:
      "1man, black hair, blue eyes, calm expression, mystic cloak, glowing magic sigil, goatee, spellcasting gesture, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
  {
    image: "https://cdn.ocmaker.app/example/marvel-oc-generated-4.webp",
    prompt:
      "1man, short black hair, dark brown skin, red goggles, confident expression, futuristic tactical armor, folded wings, strong stance, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
];

export default {
  meta: {
    title: "Marvel OC Maker",
    description:
      "Create your own Marvel-style superhero OC with AI. Design unique superpowers, iconic costumes, and heroic backstories in the legendary Marvel universe.",
  },
  series: "Marvel",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Marvel OC Maker",
      description:
        "Create your own Marvel-style superhero OC with AI. Design unique superpowers, iconic costumes, and heroic backstories in the legendary Marvel universe.",
    },
    step: {
      title: "How to Make Marvel OC",
      description:
        "Bringing your Marvel superhero to life is simple. Follow these steps to create your ultimate superhero character.",
      steps: [
        {
          title: "Design Your Superhero Identity",
          description:
            "Start with your character's basic appearance, powers, and costume design. Think about classic Marvel elements like colorful suits, distinctive emblems, and signature accessories.",
        },
        {
          title: "Add Powers and Backstory",
          description:
            "Define your character's unique superpowers, origin story, and role in the Marvel universe. Whether they're a mutant, enhanced human, or cosmic being, make their abilities memorable.",
        },
        {
          title: "Generate Your Hero",
          description:
            "Click 'Generate Character' to bring your Marvel OC to life. Choose from multiple AI-generated designs to find the perfect look for your superhero.",
        },
      ],
    },
    examples: {
      title: "Marvel Examples",
      description:
        "Discover amazing Marvel-style characters created with text prompts using the Marvel OC Maker.",
      examples,
    },
    features: {
      title: "What is Marvel OC Maker?",
      description:
        "Marvel OC Maker is specifically designed for the Marvel universe. Create authentic superhero characters with iconic costumes, superpowers, and heroic aesthetics.",
      features: [
        {
          label: "Authentic Marvel Superhero Design",
          description:
            "Generate characters that capture the classic Marvel aesthetic, from iconic costume designs to heroic poses that feel right at home in the Marvel universe.",
        },
        {
          label: "Superpower-Focused Creation",
          description:
            "Our AI understands Marvel's diverse range of superpowers, from mutant abilities to cosmic forces, ensuring your character's powers are visually represented.",
        },
        {
          label: "Instant Hero Generation",
          description:
            "Create professional-quality superhero designs in seconds, letting you focus on developing your character's story and abilities.",
        },
        {
          label: "Comic Book Quality Visuals",
          description:
            "Powered by advanced AI trained on Marvel's visual style, delivering high-resolution character art suitable for comics, stories, or fan art.",
        },
        {
          label: "Multiple Design Variations",
          description:
            "Generate several character options per prompt, allowing you to explore different costume designs, poses, and visual interpretations of your hero.",
        },
        {
          label: "Rich Universe Integration",
          description:
            "Create characters that seamlessly fit into the Marvel multiverse, with authentic costumes, powers, and backstories that feel genuinely heroic.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is Marvel OC Maker and how does it work?",
          answer:
            "Marvel OC Maker is a specialized AI tool for creating original Marvel-style superhero characters. Simply describe your hero's appearance, powers, and costume, and our AI generates authentic Marvel-style artwork.",
        },
        {
          question: "How can I create better superheroes with Marvel OC Maker?",
          answer:
            "Include specific Marvel elements like iconic costume colors, emblems, superpowers, and heroic poses. The more detailed your description of powers and costume design, the better the results.",
        },
        {
          question: "Is Marvel OC Maker free to use?",
          answer:
            "Yes, Marvel OC Maker offers free character generation with core features. Premium plans provide faster generation, more options, and additional customization tools.",
        },
        {
          question: "What makes Marvel OC Maker's results so authentic?",
          answer:
            "Our AI is fine-tuned specifically for Marvel's visual style, understanding the aesthetic principles, color schemes, and design elements that make Marvel characters iconic.",
        },
        {
          question:
            "Can I use characters created with Marvel OC Maker commercially?",
          answer:
            "Yes, all characters you create are yours to use for personal and commercial projects. We don't claim ownership of your original character designs.",
        },
        {
          question: "Do I need an account to use Marvel OC Maker?",
          answer:
            "No account required for basic use. However, creating an account lets you save characters, access generation history, and unlock additional features.",
        },
        {
          question: "Can I modify or regenerate my Marvel character designs?",
          answer:
            "Absolutely! You can regenerate with the same prompt for variations or modify your description to fine-tune your character until it matches your vision perfectly.",
        },
        {
          question: "Will you add more superhero universe OC Makers?",
          answer:
            "Yes! We're expanding to include more superhero universes and comic book styles. Follow us for updates on new themed OC Makers.",
        },
      ],
    },
    cta: {
      title: "Create Your Marvel Superhero",
      description:
        "Unleash your creativity and design the ultimate Marvel hero — no artistic skills required. Just imagine, describe, and generate.",
      btns: {
        start: "Start Creating",
        explore: "Explore Heroes",
      },
    },
  },
};
