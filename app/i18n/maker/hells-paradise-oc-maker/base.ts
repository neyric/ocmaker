const basePrompt = `
  WORLD CONTEXT:
  Universe: Hell's Paradise: Jigokuraku
  Setting: Edo-period Japan, execution convicts, shinobi clans, Yamada Asaemon executioners, forbidden island Shinsenkyo filled with Tensen immortals and grotesque flora
  Key Factions: Iwagakure shinobi, Yamada Asaemon corps, Tensen/Junshi, criminal vagrants, shogunate envoys, Tao masters

  OUTPUT FORMAT:
  Name, Origin & Role (Convict/Executioner), Fighting Style & Weapon, Tao Aptitude or Shinobi Techniques, Personality, Treasure/Goal, Backstory Snapshot

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Iwagakure Survivor",
    description: "A shinobi convict wielding chained sickles in hopes of pardon.",
    prompt: `What is your character's name?
Hana Suiren

What is their origin and role (convict or executioner)?
Former Iwagakure assassin sentenced to Shinsenkyo

What fighting style and weapon do they use?
Dual kusarigama strikes combined with acrobatic flips

What Tao aptitude or shinobi techniques do they possess?
Balanced Tao flow allowing her to counter Tensen petals

How would you describe their personality?
Calm, calculating, fiercely loyal once trust is earned

What treasure or goal do they seek?
To secure a pardon and rescue her sibling sold into slavery

Share a backstory snapshot.
Refused to kill a child target, resulting in her imprisonment; now fights to redeem that choice.`,
  },
  {
    title: "Yamada Asaemon Disciple",
    description: "A novice executioner documenting every battle with scholarly care.",
    prompt: `What is your character's name?
Asaemon Retsu

What is their origin and role (convict or executioner)?
Yamada Asaemon probationary executioner

What fighting style and weapon do they use?
Iaido-style katana draws infused with precise anatomy strikes

What Tao aptitude or shinobi techniques do they possess?
Limited Tao perception focused on sensing fear tremors

How would you describe their personality?
Stoic, dutiful, quietly empathetic toward convicts

What treasure or goal do they seek?
To return with accurate records that prevent future doomed missions

Share a backstory snapshot.
Retsu volunteered to document Shinsenkyo after losing a mentor to rumors of immortality.`,
  },
  {
    title: "Deserted Pirate",
    description: "A pirate convict whose cannon expertise now fuels explosive traps.",
    prompt: `What is your character's name?
Bora Umigami

What is their origin and role (convict or executioner)?
Convicted pirate captain sent to the island

What fighting style and weapon do they use?
Weighted chain-cannon repurposed as a portable mortar

What Tao aptitude or shinobi techniques do they possess?
Harnesses Tao through rhythmic sea shanties that stabilize breathing

How would you describe their personality?
Boisterous, reckless, fiercely protective of allies

What treasure or goal do they seek?
To obtain the Elixir and rebuild his lost crew as a legitimate fleet

Share a backstory snapshot.
His crew was slaughtered by shogunate soldiers; he seeks amnesty so the survivors can live openly.`,
  },
  {
    title: "Junshi Defector",
    description: "A Tensen experiment who turned on their creators to regain humanity.",
    prompt: `What is your character's name?
Kagura

What is their origin and role (convict or executioner)?
Former Junshi guardian now aiding the intruders

What fighting style and weapon do they use?
Petal-blade fans and morphing Tao-flower whips

What Tao aptitude or shinobi techniques do they possess?
High-level Tao manipulation granting rapid regeneration

How would you describe their personality?
Elegant, hauntingly serene, burdened by guilt

What treasure or goal do they seek?
To destroy the Tensen root to free other captured humans

Share a backstory snapshot.
Once human, she was molded into a Junshi but broke free after remembering her brother's lullaby.`,
  },
  {
    title: "Temple Monk",
    description: "A monk executioner mastering meditation to stave off the island's madness.",
    prompt: `What is your character's name?
Shuzen

What is their origin and role (convict or executioner)?
Monk recruited by the shogunate as an executioner

What fighting style and weapon do they use?
Staff techniques using prayer beads tipped with blades

What Tao aptitude or shinobi techniques do they possess?
Aligns Tao through chanting sutras that calm allies

How would you describe their personality?
Serene, resolute, prone to philosophical musings

What treasure or goal do they seek?
To obtain the Elixir and cure a plague ravaging his temple

Share a backstory snapshot.
He agreed to the mission after watching his abbey fall to a mysterious illness the Elixir might heal.`,
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
        label: "Young shinobi",
        value: "young shinobi"
      },
      {
        label: "Convict execution",
        value: "convict execution"
      },
      {
        label: "Yamada Asaemon",
        value: "yamada asaemon"
      },
      {
        label: "Tao master",
        value: "tao master"
      },
      {
        label: "Immortal experiment",
        value: "immortal experiment"
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
        label: "Shinobi gi",
        value: "shinobi gi"
      },
      {
        label: "Executioner robe",
        value: "executioner robe"
      },
      {
        label: "Pirate convict coat",
        value: "pirate convict coat"
      },
      {
        label: "Junshi silk",
        value: "junshi silk"
      },
      {
        label: "Tao monk wrap",
        value: "tao monk wrap"
      }
    ]
  },
  {
    title: "Bottom",
    key: "bottom",
    data: [
      {
        label: "Binding trousers",
        value: "binding trousers"
      },
      {
        label: "Executioner hakama",
        value: "executioner hakama"
      },
      {
        label: "Tattered convict pants",
        value: "tattered convict pants"
      },
      {
        label: "Junshi petal skirts",
        value: "junshi petal skirts"
      },
      {
        label: "Temple sandals wraps",
        value: "temple sandals wraps"
      }
    ]
  },
  {
    title: "Set",
    key: "set",
    data: [
      {
        label: "Shinsenkyo survey team",
        value: "shinsenkyo survey team"
      },
      {
        label: "Yamada Asaemon execution",
        value: "yamada asaemon execution set"
      },
      {
        label: "Tao monk pilgrim",
        value: "tao monk pilgrim"
      },
      {
        label: "Junshi guardian",
        value: "junshi guardian set"
      },
      {
        label: "Pirate adventurer",
        value: "pirate adventurer set"
      }
    ]
  },
  {
    title: "Material",
    key: "material",
    data: [
      {
        label: "Blood-stained linen",
        value: "blood stained linen"
      },
      {
        label: "Flesh armor petals",
        value: "flesh armor petals"
      },
      {
        label: "Tao-infused silk",
        value: "tao infused silk"
      },
      {
        label: "Rope bindings",
        value: "rope bindings"
      },
      {
        label: "Bamboo fiber",
        value: "bamboo fiber"
      }
    ]
  },
  {
    title: "Accessory",
    key: "accessory",
    data: [
      {
        label: "Executioner blade",
        value: "executioner blade"
      },
      {
        label: "Shinobi chain",
        value: "shinobi chain"
      },
      {
        label: "Tao prayer beads",
        value: "tao prayer beads"
      },
      {
        label: "Convict shackles",
        value: "convict shackles"
      },
      {
        label: "Junshi mask",
        value: "junshi mask"
      }
    ]
  }
];

const examples = [
  {
    image:
      "https://cdn.ocmaker.app/example/hells-paradise-oc-maker-generated-1.webp",
    prompt:
      "1boy, long black hair tied up, intense golden eyes, stoic expression, hells paradise style ninja outfit, katana and kunai, execution ground survivor, mysterious island setting, anime style, looking at viewer, simple background, upper body",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/hells-paradise-oc-maker-generated-2.webp",
    prompt:
      "1girl, white hair with red tips, crimson eyes, dangerous smile, hells paradise style kunoichi attire, dual wielding blades, criminal tattoos, battle scars, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/hells-paradise-oc-maker-generated-3.webp",
    prompt:
      "1boy, short silver hair, blue eyes, calm expression, hells paradise style asaemon samurai uniform, executioner sword, noble bearing, island expedition gear, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/hells-paradise-oc-maker-generated-4.webp",
    prompt:
      "1girl, green hair with flowers, heterochromia eyes, ethereal expression, hells paradise style tensen robes, plant manipulation hints, immortal aura, mystical island native, single character, upper body, looking at viewer, anime style, simple background",
  },
];

export default {
  meta: {
    title: "Hell's Paradise OC Maker",
    description:
      "Generate your own Hell's Paradise OC with AI. Create characters, backstories, and visuals in the deadly world of ninja, samurai, and the mysterious island of immortals.",
  },
  series: "Hell's Paradise",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Hell's Paradise OC Maker",
      description:
        "Generate your own Hell's Paradise OC with AI. Create characters, backstories, and visuals in the deadly world of ninja, samurai, and the mysterious island of immortals.",
    },
    step: {
      title: "How to Make Hell's Paradise OC",
      description:
        "Creating a Hell's Paradise-style character with OC Maker is easy. Just follow these steps to bring your warrior or immortal to life.",
      steps: [
        {
          title: "Describe Your Hell's Paradise OC",
          description:
            "Fill in the form with your character's basic appearance and personality. For best results, include Hell's Paradise-style features like ninja/samurai attire, criminal backgrounds, Asaemon uniforms, or mystical island elements.",
        },
        {
          title: "Add Details and Combat Elements",
          description:
            "Include extra details like their role (criminal, Asaemon, Tensen), fighting techniques, special abilities, or connections to the island's mysteries. The more your character fits into the deadly expedition setting, the more authentic the result will be.",
        },
        {
          title: "Generate and Finalize Design",
          description:
            "Click the 'Generate Character' button to create your Hell's Paradise OC. You'll get several AI-generated designs — pick your favorite to complete your character.",
        },
      ],
    },
    examples: {
      title: "Hell's Paradise Examples",
      description:
        "Explore Hell's Paradise characters made from text prompts, created using the Hell's Paradise OC Maker.",
      examples,
    },
    features: {
      title: "What is Hell's Paradise OC Maker?",
      description:
        "Hell's Paradise OC Maker is a version of OC Maker fine-tuned for the world of Hell's Paradise: Jigokuraku. Describe your character, and instantly turn it into Edo period action-style artwork.",
      features: [
        {
          label: "Authentic Historical Fantasy Design",
          description:
            "Create characters that truly capture the brutal beauty of Hell's Paradise, designed to seamlessly fit into the world of ninja, samurai, and mystical immortals.",
        },
        {
          label: "Tailored Prompt Tuning",
          description:
            "Prompts are fine-tuned for Hell's Paradise aesthetics — from traditional Japanese clothing to supernatural abilities — helping you build more convincing characters.",
        },
        {
          label: "Fast Character Generation",
          description:
            "Generate high-quality characters in just seconds, allowing you to focus more on refining ideas and less on waiting.",
        },
        {
          label: "High-Quality Visual Output",
          description:
            "Powered by advanced AI models, Hell's Paradise OC Maker delivers detailed, high-resolution character images suitable for storytelling, design, or sharing.",
        },
        {
          label: "Choose from Multiple Results",
          description:
            "Generate multiple character options per prompt and select your favorites to finalize as your official Hell's Paradise OC.",
        },
        {
          label: "Deep Story Integration",
          description:
            "Bring your OC to life with not just visuals, but also compelling backstories, combat techniques, criminal pasts, and rich connections to the mysterious island of Hell's Paradise.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is Hell's Paradise OC Maker and how does it work?",
          answer:
            "Hell's Paradise OC Maker is a specialized version of OC Maker, fine-tuned for the Hell's Paradise universe. Simply describe your character, and our AI will generate Edo period action-style visuals in seconds based on your prompt.",
        },
        {
          question:
            "How can I create better characters with Hell's Paradise OC Maker?",
          answer:
            "For best results, include Hell's Paradise-specific traits in your description, such as ninja techniques, samurai codes, criminal backgrounds, or mystical island powers. The more vivid and detailed your input, the more accurate and compelling the output.",
        },
        {
          question: "Is Hell's Paradise OC Maker free to use?",
          answer:
            "Yes, Hell's Paradise OC Maker offers free character generation with basic features. For faster results, premium options, and additional control, you can upgrade your plan anytime.",
        },
        {
          question:
            "What makes Hell's Paradise OC Maker's results so impressive?",
          answer:
            "Hell's Paradise OC Maker uses cutting-edge AI models fine-tuned for the historical fantasy setting, ensuring characters match the distinctive art style and intense atmosphere of the series.",
        },
        {
          question:
            "Can I use characters made with Hell's Paradise OC Maker for commercial projects?",
          answer:
            "Yes, any characters you create using Hell's Paradise OC Maker are yours to use freely for both personal and commercial purposes. We do not claim ownership over your creations.",
        },
        {
          question: "Do I need an account to use Hell's Paradise OC Maker?",
          answer:
            "No account is required for basic use. However, creating an account lets you save your characters, track generation history, and access more features.",
        },
        {
          question:
            "Can I regenerate or fine-tune the same character in Hell's Paradise OC Maker?",
          answer:
            "Yes, you can regenerate results from the same prompt or adjust your inputs to refine your character until it fits your vision perfectly.",
        },
        {
          question:
            "Will there be more anime-style OC Makers like Hell's Paradise OC Maker?",
          answer:
            "Yes! We plan to release more specialized OC Makers tailored for different anime universes. Stay tuned for future updates on ocmaker.app.",
        },
      ],
    },
    cta: {
      title: "Create Your Island Survivor",
      description:
        "Bring your original Hell's Paradise character to life — no drawing skills needed. Just describe, generate, and survive the island of immortals.",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
