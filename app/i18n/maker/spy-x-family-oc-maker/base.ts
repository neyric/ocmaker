const basePrompt = `
  WORLD CONTEXT:
  Universe: SPY×FAMILY
  Setting: Cold War tension between Westalis and Ostania, clandestine operations, elite schools, double lives, comedic spy drama
  Key Factions: WISE agency, SSS State Security, Garden assassins, Eden Academy elites, Desmond political network, informant underworld, Westalis diplomacy

  OUTPUT FORMAT:
  Name, Cover Identity & True Role, Agency/Allegiance, Signature Skills or Powers, Personality, Mission Objective, Backstory Snapshot

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "WISE Handler",
    description: "A WISE handler embedded as Eden Academy's etiquette teacher.",
    prompt: `What is your character's name?
Lena Hartmann

What cover identity and true role do they hold?
Cover identity: Eden Academy etiquette instructor; true role: WISE handler

Which agency or allegiance do they serve?
WISE

What signature skills or powers do they possess?
Expert lip reader, miniature camera pens, self-defense

How would you describe their personality?
Composed, resourceful, dry sense of humor

What mission objective drives them?
To gather intel on the Desmond family through faculty meetings

Share a backstory snapshot.
Recruited after exposing counterfeit bonds; she now coordinates Operation Strix field agents from within Eden.`,
  },
  {
    title: "Garden Cleaner",
    description: "A Garden assassin passing as a florist in Berlint's upscale district.",
    prompt: `What is your character's name?
Iris Nacht

What cover identity and true role do they hold?
Cover identity: boutique florist; true role: Garden Cleaner

Which agency or allegiance do they serve?
Garden

What signature skills or powers do they possess?
Poisoned thorns, close-quarters aikido, hidden garrote

How would you describe their personality?
Graceful, warm-hearted to friends, merciless on missions

What mission objective drives them?
Eliminate a coup leader targeting the Westalis-Ostania peace talks

Share a backstory snapshot.
Taken in by the Director after avenging her family, she now delivers bouquets hiding blades.`,
  },
  {
    title: "SSS Analyst",
    description: "An SSS officer pretending to be a gossip columnist to sniff out spies.",
    prompt: `What is your character's name?
Markus Weiss

What cover identity and true role do they hold?
Cover identity: society magazine columnist; true role: SSS analyst

Which agency or allegiance do they serve?
State Security Service (SSS)

What signature skills or powers do they possess?
Audio surveillance, disguise kits, martial training

How would you describe their personality?
Suspicious, proud, surprisingly lonely

What mission objective drives them?
To expose WISE sleeper agents infiltrating Eden Academy

Share a backstory snapshot.
Lost his brother to foreign espionage, fueling his obsession with rooting out spies in Ostania.`,
  },
  {
    title: "Twilight's Apprentice",
    description: "A prodigy spy mentored by Loid while acting as a daycare worker.",
    prompt: `What is your character's name?
Nina Frost

What cover identity and true role do they hold?
Cover identity: daycare caretaker; true role: WISE field operative

Which agency or allegiance do they serve?
WISE

What signature skills or powers do they possess?
Instant recall, micro-drone deployment, empath training

How would you describe their personality?
Cheerful, clever, quietly determined

What mission objective drives them?
To monitor Eden student playgroups for potential threats

Share a backstory snapshot.
Saved by Twilight during a refugee crisis, she insisted on training to help protect other children.`,
  },
  {
    title: "Underworld Informant",
    description: "A black-market broker feeding intel to both WISE and Garden for a price.",
    prompt: `What is your character's name?
Felix Noir

What cover identity and true role do they hold?
Cover identity: jazz club owner; true role: underworld informant

Which agency or allegiance do they serve?
Neutral fixer linked to both WISE and Garden

What signature skills or powers do they possess?
Information brokerage, safehouse networks, hidden weapon cane

How would you describe their personality?
Charming, pragmatic, morally gray

What mission objective drives them?
To keep Berlint's underworld balanced while protecting adopted street kids

Share a backstory snapshot.
Once a street orphan, he now trades secrets to keep violence away from his neighborhood.`,
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
        label: "Young agent",
        value: "young agent"
      },
      {
        label: "Field operative",
        value: "field operative"
      },
      {
        label: "Agency veteran",
        value: "agency veteran"
      },
      {
        label: "Underworld broker",
        value: "underworld broker"
      },
      {
        label: "Intelligence director",
        value: "intelligence director"
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
        label: "WISE suit",
        value: "wise suit"
      },
      {
        label: "SSS trench",
        value: "sss trench"
      },
      {
        label: "Garden disguise",
        value: "garden disguise"
      },
      {
        label: "Eden faculty blazer",
        value: "eden faculty blazer"
      },
      {
        label: "Underworld casual",
        value: "underworld casual"
      }
    ]
  },
  {
    title: "Bottom",
    key: "bottom",
    data: [
      {
        label: "Tailored slacks",
        value: "tailored slacks spy"
      },
      {
        label: "Pencil skirt",
        value: "pencil skirt spy"
      },
      {
        label: "Undercover jeans",
        value: "undercover jeans spy"
      },
      {
        label: "Combat trousers",
        value: "combat trousers spy"
      },
      {
        label: "Formal suit pants",
        value: "formal suit pants spy"
      }
    ]
  },
  {
    title: "Set",
    key: "set",
    data: [
      {
        label: "WISE operative",
        value: "wise operative set"
      },
      {
        label: "Garden cleaner",
        value: "garden cleaner set"
      },
      {
        label: "SSS agent",
        value: "sss agent set"
      },
      {
        label: "Undercover Eden",
        value: "undercover eden set"
      },
      {
        label: "Informant broker",
        value: "informant broker set"
      }
    ]
  },
  {
    title: "Material",
    key: "material",
    data: [
      {
        label: "Bulletproof lining",
        value: "bulletproof lining"
      },
      {
        label: "Spy mesh",
        value: "spy mesh"
      },
      {
        label: "Silk disguise",
        value: "silk disguise"
      },
      {
        label: "Encrypted fabric",
        value: "encrypted fabric"
      },
      {
        label: "Shadow velvet",
        value: "shadow velvet"
      }
    ]
  },
  {
    title: "Accessory",
    key: "accessory",
    data: [
      {
        label: "Hidden pistol",
        value: "hidden pistol"
      },
      {
        label: "Codebook",
        value: "codebook"
      },
      {
        label: "Spy glasses",
        value: "spy glasses"
      },
      {
        label: "Microphone brooch",
        value: "microphone brooch"
      },
      {
        label: "Cipher briefcase",
        value: "cipher briefcase"
      }
    ]
  }
];

const examples = [
  {
    image:
      "https://cdn.ocmaker.app/example/spy-x-family-oc-maker-generated-1.webp",
    prompt:
      "1girl, anya forger, spy x family, pink hair, short hair, green eyes, small stature, child, school uniform, eden academy uniform, white shirt, red sweater vest, black skirt, white socks, black shoes, innocent expression, curious look, antenna hair, hair ornaments, looking at viewer, simple background, upper body",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/spy-x-family-oc-maker-generated-2.webp",
    prompt:
      "1boy, damian desmond, spy x family, blonde hair, short hair, green eyes, child, school uniform, eden academy uniform, white shirt, red tie, dark blue blazer, proud expression, arrogant smile, crossed arms, looking at viewer, simple background, upper body, masterpiece, best quality, very aesthetic, absurdres",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/spy-x-family-oc-maker-generated-3.webp",
    prompt:
      "1girl, yor forger, spy x family, long black hair, red eyes, black sleeveless dress, gold hairband, earrings, gentle expression, assassin, elegant pose, anime style, looking at viewer, simple background, upper body",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/spy-x-family-oc-maker-generated-4.webp",
    prompt:
      "1boy, loid forger, spy x family, blonde hair, short hair, green eyes, serious expression, black suit, white dress shirt, black tie, spy, professional appearance, mature male, looking at viewer, simple background, upper body",
  },
];

export default {
  meta: {
    title: "Spy x Family OC Maker",
    description:
      "Generate your own Spy x Family OC with AI. Create characters, backstories, and visuals in the charming spy comedy style.",
  },
  series: "Spy x Family",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Spy x Family OC Maker",
      description:
        "Generate your own Spy x Family OC with AI. Create characters, backstories, and visuals in the charming spy comedy style.",
    },
    step: {
      title: "How to Make Spy x Family OC",
      description:
        "Creating a Spy x Family-style character with OC Maker is easy. Just follow these two steps to bring your idea to life.",
      steps: [
        {
          title: "Describe Your Spy x Family OC",
          description:
            "Fill in the form with your character's basic appearance and personality. For best results, include Spy x Family-style features like elegant formal wear, spy gadgets, and the sophisticated yet charming demeanor of a secret agent.",
        },
        {
          title: "Add Details and Spy Elements",
          description:
            "Include extra details like spy equipment, assassination skills, or telepathic abilities. The more your character fits into the Spy x Family universe of espionage and family comedy, the more accurate and impressive the result will be.",
        },
        {
          title: "Generate and Finalize Design",
          description:
            "Click the 'Generate Character' button to create your Spy x Family OC. You'll get several AI-generated designs — pick your favorite to complete your character.",
        },
      ],
    },
    examples: {
      title: "Spy x Family Examples",
      description:
        "Explore Spy x Family characters made from text prompts, created using the Spy x Family OC Maker.",
      examples,
    },
    features: {
      title: "What is Spy x Family OC Maker?",
      description:
        "Spy x Family OC Maker is a version of OC Maker fine-tuned for the world of Spy x Family. Describe your character, and instantly turn it into Spy x Family-style artwork.",
      features: [
        {
          label: "Authentic Spy x Family Character Design",
          description:
            "Create characters that truly capture the sophisticated spy comedy spirit of Spy x Family, designed to seamlessly fit into the world of espionage, family dynamics, and heartwarming moments.",
        },
        {
          label: "Tailored Prompt Tuning",
          description:
            "Prompts are fine-tuned for Spy x Family aesthetics — from elegant spy outfits to charming family interactions — helping you build more convincing characters.",
        },
        {
          label: "Fast Character Generation",
          description:
            "Generate high-quality characters in just seconds, allowing you to focus more on refining ideas and less on waiting.",
        },
        {
          label: "High-Quality Visual Output",
          description:
            "Powered by advanced AI models, Spy x Family OC Maker delivers detailed, high-resolution character images suitable for storytelling, design, or sharing.",
        },
        {
          label: "Choose from Multiple Results",
          description:
            "Generate multiple character options per prompt and select your favorites to finalize as your official Spy x Family OC.",
        },
        {
          label: "Deep Story Integration",
          description:
            "Bring your OC to life with not just visuals, but also compelling backstories, spy missions, and rich connections to the Spy x Family universe.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is Spy x Family OC Maker and how does it work?",
          answer:
            "Spy x Family OC Maker is a specialized version of OC Maker, fine-tuned for the Spy x Family universe. Simply describe your character, and our AI will generate anime-style Spy x Family visuals in seconds based on your prompt.",
        },
        {
          question:
            "How can I create better characters with Spy x Family OC Maker?",
          answer:
            "For best results, include Spy x Family-specific traits in your description, such as spy gadgets, elegant clothing, or family dynamics. The more vivid and detailed your input, the more accurate and compelling the output.",
        },
        {
          question: "Is Spy x Family OC Maker free to use?",
          answer:
            "Yes, Spy x Family OC Maker offers free character generation with basic features. For faster results, premium options, and additional control, you can upgrade your plan anytime.",
        },
        {
          question: "What makes Spy x Family OC Maker's results so impressive?",
          answer:
            "Spy x Family OC Maker uses cutting-edge AI models fine-tuned for the Spy x Family setting, ensuring characters match the sophisticated spy comedy style and charming family dynamics of the series.",
        },
        {
          question:
            "Can I use characters made with Spy x Family OC Maker for commercial projects?",
          answer:
            "Yes, any characters you create using Spy x Family OC Maker are yours to use freely for both personal and commercial purposes. We do not claim ownership over your creations.",
        },
        {
          question: "Do I need an account to use Spy x Family OC Maker?",
          answer:
            "No account is required for basic use. However, creating an account lets you save your characters, track generation history, and access more features.",
        },
        {
          question:
            "Can I regenerate or fine-tune the same character in Spy x Family OC Maker?",
          answer:
            "Yes, you can regenerate results from the same prompt or adjust your inputs to refine your character until it fits your vision perfectly.",
        },
        {
          question:
            "Will there be more anime-style OC Makers like Spy x Family OC Maker?",
          answer:
            "Yes! We plan to release more specialized OC Makers tailored for different anime universes. Stay tuned for future updates on ocmaker.app.",
        },
      ],
    },
    cta: {
      title: "Create Your Own Spy x Family Character",
      description:
        "Bring your original Spy x Family character to life — no drawing skills needed. Just describe, generate, and explore.",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
