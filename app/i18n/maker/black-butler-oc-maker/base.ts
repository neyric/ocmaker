const basePrompt = `
  WORLD CONTEXT:
  Universe: Black Butler (Kuroshitsuji)
  Setting: Victorian-era London, aristocratic underworld, supernatural contracts, Phantomhive investigations, Grim Reapers
  Key Circles: Queen's Watchdogs, nobility houses, circus troupes, cult societies, Shinigami Dispatch, demons with Faustian bargains

  OUTPUT FORMAT:
  Name, Social Cover & Title, Alignment (Human/Demon/Reaper), Talents or Powers, Personality, Secret Motive, Backstory Snapshot

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Queen's Watchdog Apprentice",
    description: "An aristocratic investigator with a polite smile and ruthless instincts.",
    prompt: `What is your character's name?
Lady Eveline Ashcroft

What social cover and title do they maintain?
Duchess's niece serving as a charity organizer for London's orphans

What alignment best describes them?
Human agent under the Queen's Watchdog office

What talents or powers assist their work?
Code-breaking, fencing, and a demon hound bound to a silver whistle

How would you describe their personality?
Refined, calculating, delivers barbed wit with grace

What secret motive pushes them forward?
To uncover who ordered her parents' staged carriage accident

Share a brief backstory snapshot.
Rescued by Phantomhive servants after kidnappers targeted her inheritance, she now assists in the underworld investigations.`,
  },
  {
    title: "Rehabilitated Reaper",
    description: "A Grim Reaper assigned to shepherd troublesome souls through the theatre district.",
    prompt: `What is your character's name?
Cedric Greyleaf

What social cover and title do they maintain?
Stage manager at the Royal Albion Theatre Company

What alignment best describes them?
Shinigami on earthly probation

What talents or powers assist their work?
Death scythe disguised as a spotlight rig, cinematic record manipulation

How would you describe their personality?
Melancholic, artistic, wry about mortal frailty

What secret motive pushes them forward?
To atone for censoring souls without review during the Jack the Ripper case

Share a brief backstory snapshot.
Cedric disobeyed dispatch orders and now ensures every theatre "accident" follows the proper ledger of souls.`,
  },
  {
    title: "Demon Valet",
    description: "A junior demon mastering etiquette while bound to a disgraced viscountess.",
    prompt: `What is your character's name?
Silas

What social cover and title do they maintain?
Personal valet to a viscountess seeking redemption

What alignment best describes them?
Demon bound by an ancestral contract

What talents or powers assist their work?
Mirror-step travel, impeccable cuisine, truth-binding tea rituals

How would you describe their personality?
Suave, patient, faintly amused by human folly

What secret motive pushes them forward?
To collect his lady's soul only after she clears her family's name

Share a brief backstory snapshot.
Once serving a pirate lord, Silas now studies noble etiquette to fulfill the contract's clause of "impeccable service".`,
  },
  {
    title: "Circus Illusionist",
    description: "A Noah's Ark Circus performer balancing loyalty with covert justice.",
    prompt: `What is your character's name?
Marion "Lark" Blythe

What social cover and title do they maintain?
Illusionist and tightrope artist in the revived Noah's Ark Circus

What alignment best describes them?
Human informant secretly allied with the Phantomhive estate

What talents or powers assist their work?
Illusion props, concealed throwing blades, network of street urchins

How would you describe their personality?
Playful, defiant, fiercely protective of found family

What secret motive pushes them forward?
To keep orphan performers safe from predatory nobles

Share a brief backstory snapshot.
Saved by Joker as a child, Marion now steers the circus toward honest shows while feeding intel to Ciel.`,
  },
  {
    title: "Underground Alchemist",
    description: "A chemist dabbling in forbidden arts to reunite with the dead.",
    prompt: `What is your character's name?
Professor Adelaide Crane

What social cover and title do they maintain?
Reclusive academic publishing tonic recipes

What alignment best describes them?
Human occultist flirting with demonic bargains

What talents or powers assist their work?
Transmutation circles, soul-preserving elixirs, mechanical prosthetics

How would you describe their personality?
Obsessive, brilliant, undeterred by moral gray

What secret motive pushes them forward?
To revive her fiance who died in a sabotaged culinary duel

Share a brief backstory snapshot.
Collaborates with Undertaker for anatomical samples, risking everything to perfect a humane resurrection method.`,
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
        label: "Young footman",
        value: "young footman"
      },
      {
        label: "Society debutante",
        value: "society debutante"
      },
      {
        label: "Seasoned butler",
        value: "seasoned butler"
      },
      {
        label: "Grim Reaper veteran",
        value: "grim reaper veteran"
      },
      {
        label: "Immortal demon",
        value: "immortal demon"
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
        label: "Victorian tailcoat",
        value: "victorian tailcoat"
      },
      {
        label: "Phantomhive livery",
        value: "phantomhive livery"
      },
      {
        label: "Circus performer blouse",
        value: "circus performer blouse"
      },
      {
        label: "High-society gown",
        value: "high society gown"
      },
      {
        label: "Undertaker shroud",
        value: "undertaker shroud"
      }
    ]
  },
  {
    title: "Bottom",
    key: "bottom",
    data: [
      {
        label: "Pressed trousers",
        value: "pressed trousers"
      },
      {
        label: "Layered bustle skirt",
        value: "layered bustle skirt"
      },
      {
        label: "Circus striped pants",
        value: "circus striped pants"
      },
      {
        label: "Servant apron layers",
        value: "servant apron layers"
      },
      {
        label: "Shadowed cloak hem",
        value: "shadowed cloak hem"
      }
    ]
  },
  {
    title: "Set",
    key: "set",
    data: [
      {
        label: "Queen's Watchdog attire",
        value: "queens watchdog attire"
      },
      {
        label: "Noah's Ark Circus",
        value: "noahs ark circus outfit"
      },
      {
        label: "Reaper dispatch uniform",
        value: "reaper dispatch uniform"
      },
      {
        label: "London high-society ball",
        value: "london high society ball outfit"
      },
      {
        label: "Demon butler regalia",
        value: "demon butler regalia"
      }
    ]
  },
  {
    title: "Material",
    key: "material",
    data: [
      {
        label: "Velvet",
        value: "velvet"
      },
      {
        label: "Fine wool",
        value: "fine wool"
      },
      {
        label: "Lace and satin",
        value: "lace satin"
      },
      {
        label: "Polished leather",
        value: "polished leather"
      },
      {
        label: "Shadow silk",
        value: "shadow silk"
      }
    ]
  },
  {
    title: "Accessory",
    key: "accessory",
    data: [
      {
        label: "Silver pocket watch",
        value: "silver pocket watch"
      },
      {
        label: "Demon contract ring",
        value: "demon contract ring"
      },
      {
        label: "Reaper glasses",
        value: "reaper glasses"
      },
      {
        label: "Royal seal cane",
        value: "royal seal cane"
      },
      {
        label: "Feathered top hat",
        value: "feathered top hat"
      }
    ]
  },
  {
    title: "Alignment",
    key: "alignment",
    data: [
      {
        label: "Human",
        value: "human"
      },
      {
        label: "Demon",
        value: "demon"
      },
      {
        label: "Shinigami",
        value: "shinigami"
      },
      {
        label: "Werewolf",
        value: "werewolf"
      },
      {
        label: "Contract-bound",
        value: "contract bound"
      }
    ]
  }
];

const examples = [
  {
    image: "https://cdn.ocmaker.app/example/black-butler-oc-generated-1.webp",
    prompt:
      "1boy, silver hair, crimson eyes, mysterious smile, demon butler outfit, black tailcoat with white gloves, contract seal visible, elegant pose, single character, upper body, looking at viewer, anime style, victorian mansion background",
  },
  {
    image: "https://cdn.ocmaker.app/example/black-butler-oc-generated-2.webp",
    prompt:
      "1girl, long purple hair, blue eyes, noble expression, victorian lady dress, elaborate ballgown with lace, jewelry accessories, fan in hand, aristocratic pose, single character, upper body, looking at viewer, anime style, gothic atmosphere",
  },
  {
    image: "https://cdn.ocmaker.app/example/black-butler-oc-generated-3.webp",
    prompt:
      "1boy, blonde hair, green eyes, cheerful grin, phantomhive servant uniform, gardener outfit with straw hat, pruning shears, friendly stance, single character, upper body, looking at viewer, anime style, english garden background",
  },
  {
    image: "https://cdn.ocmaker.app/example/black-butler-oc-generated-4.webp",
    prompt:
      "1girl, red hair in bun, amber eyes, serious expression, maid uniform, victorian maid dress with apron, cleaning supplies, dutiful pose, single character, upper body, looking at viewer, anime style, manor interior background",
  },
];

export default {
  meta: {
    title: "Black Butler OC Maker",
    description:
      "Generate your own Black Butler character OC with AI. Create demon butlers, noble aristocrats, servants, and reapers in the Victorian Gothic universe style.",
  },
  series: "Black Butler",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Black Butler OC Maker",
      description:
        "Generate your own Black Butler character OC with AI. Create demon butlers, noble aristocrats, servants, and reapers in the Victorian Gothic universe style.",
    },
    step: {
      title: "How to Make Black Butler OC",
      description:
        "Enter the dark elegance of Victorian England with supernatural secrets. Follow these steps to design your Gothic character.",
      steps: [
        {
          title: "Choose Your Character Role",
          description:
            "Select your character's position: Demon butler, Noble aristocrat, Phantomhive servant, Grim Reaper, or Circus performer. Each role has distinct Victorian fashion, supernatural abilities, and social standings.",
        },
        {
          title: "Design Appearance and Background",
          description:
            "Describe your character's Gothic Victorian appearance, including their attire, supernatural traits, and dark secrets. Add details about contracts, noble titles, or supernatural origins for authenticity.",
        },
        {
          title: "Generate Your Victorian Character",
          description:
            "Click 'Generate Character' to bring your Black Butler OC to life. Choose from multiple AI-generated designs that capture the series' dark elegance and Gothic Victorian aesthetic.",
        },
      ],
    },
    examples: {
      title: "Black Butler Character Examples",
      description:
        "Discover elegant Gothic characters created with text prompts using the Black Butler OC Maker.",
      examples,
    },
    features: {
      title: "What is Black Butler OC Maker?",
      description:
        "Black Butler OC Maker is designed specifically for the Victorian Gothic universe. Create authentic characters with dark elegance, supernatural elements, and aristocratic themes.",
      features: [
        {
          label: "Authentic Gothic Victorian Style",
          description:
            "Generate characters that perfectly match Black Butler's distinctive Gothic aesthetic, from elaborate Victorian fashion to supernatural demon features and dark atmospheric elements.",
        },
        {
          label: "Social Hierarchy Integration",
          description:
            "Our AI understands Victorian social structures, servant roles, noble rankings, and supernatural hierarchies, ensuring your character fits authentically into the dark Victorian world.",
        },
        {
          label: "Instant Gothic Creation",
          description:
            "Create stunning Black Butler characters in seconds, perfect for manor mysteries, demon contracts, or expanding the Victorian supernatural society.",
        },
        {
          label: "High-Quality Dark Artwork",
          description:
            "Powered by AI trained on Black Butler's visual standards, delivering character art that captures the series' blend of elegance, darkness, and Victorian refinement.",
        },
        {
          label: "Multiple Role Variations",
          description:
            "Generate several character interpretations per prompt, exploring different social positions, supernatural abilities, and Victorian fashion styles to find your perfect design.",
        },
        {
          label: "Victorian London Integration",
          description:
            "Create characters that naturally fit into Black Butler's supernatural Victorian England, with authentic period fashion, dark secrets, and Gothic themes.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is Black Butler OC Maker and how does it work?",
          answer:
            "Black Butler OC Maker is an AI tool specialized for creating original Black Butler characters. Describe your character's role, Victorian appearance, and supernatural traits, and our AI generates authentic Gothic artwork.",
        },
        {
          question:
            "How can I create better characters with Black Butler OC Maker?",
          answer:
            "Include specific Black Butler elements like demon contracts, Victorian fashion details, servant positions, noble titles, or Grim Reaper duties. The more Gothic Victorian details you include, the more authentic your character will be.",
        },
        {
          question: "Is Black Butler OC Maker free to use?",
          answer:
            "Yes, Black Butler OC Maker offers free character generation with basic features. Premium plans provide faster generation, more role options, and advanced Gothic customization tools.",
        },
        {
          question: "What makes Black Butler OC Maker's results so authentic?",
          answer:
            "Our AI is specifically trained on Black Butler's art style and Victorian Gothic themes, understanding period fashion, supernatural elements, and the series' distinctive dark elegance.",
        },
        {
          question:
            "Can I use characters created with Black Butler OC Maker commercially?",
          answer:
            "Yes, all original characters you create are yours to use for personal and commercial projects. We don't claim ownership of your Victorian character designs or Black Butler OCs.",
        },
        {
          question: "Do I need an account to use Black Butler OC Maker?",
          answer:
            "No account required for basic use. Creating an account allows you to save characters, access generation history, and unlock premium Victorian Gothic features.",
        },
        {
          question: "Can I create different types of Black Butler characters?",
          answer:
            "Absolutely! Create demon butlers, noble lords and ladies, Phantomhive servants, Grim Reapers, circus performers, or members of the underworld. Mix Victorian roles and supernatural elements freely.",
        },
        {
          question: "Are more Gothic anime OC makers being developed?",
          answer:
            "Yes! We're expanding to include other Gothic and Victorian-themed anime series. Follow our updates for new themed OC makers inspired by dark elegance and supernatural mysteries.",
        },
      ],
    },
    cta: {
      title: "Seal Your Dark Contract",
      description:
        "Design your ultimate Black Butler character — no artistic skills required. Just imagine, describe, and enter the Gothic elegance of Victorian England.",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
