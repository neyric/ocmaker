const basePrompt = `
  WORLD CONTEXT:
  Universe: Disney Animated Worlds
  Setting: Fairy-tale kingdoms, modern adventures, animal realms, enchanted forests, whimsical magic with heartfelt themes
  Key Elements: Royal courts, daring adventurers, beloved sidekicks, classic villains, musical storytelling, talking animals, moral lessons

  OUTPUT FORMAT:
  Name, Homeland/Kingdom, Role (Hero/Villain/Sidekick), Signature Companion or Magic, Personality, Wish or Lesson, Backstory Snapshot

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Aurora's New Guardian",
    description: "A forest ranger protecting enchanted creatures with song magic.",
    prompt: `What is your character's name?
Elowen Bright

What is their homeland or kingdom?
Enchanted Moors neighboring the Kingdom of Aldore

What role do they play (hero, villain, sidekick, etc.)?
Heroic guardian

What is their signature companion or magic?
Luminous lark companion that harmonizes protective spells

How would you describe their personality?
Gentle, adventurous, brimming with wonder

What wish or lesson defines them?
To prove kindness can tame any dark forest

Share a backstory snapshot.
Raised by pixies after a storm separated her from her caravan, she now guides travelers through the glowing woods.`,
  },
  {
    title: "Switcheroo Sidekick",
    description: "A mischievous raccoon-turned-boy navigating city streets with flair.",
    prompt: `What is your character's name?
Rory Swift

What is their homeland or kingdom?
Crown City, the bustling capital of Luminara

What role do they play (hero, villain, sidekick, etc.)?
Sidekick with a flair for pickpocket heroics

What is their signature companion or magic?
Charm coin that lets him swap places with any small animal

How would you describe their personality?
Playful, quick-witted, loyal to a fault

What wish or lesson defines them?
To finally return the coin he once stole and earn forgiveness

Share a backstory snapshot.
After pocketing a royal treasure, a curse made him a raccoon until a princess taught him honesty and gave him a second chance.`,
  },
  {
    title: "Seafaring Villainess",
    description: "A sea witch entrepreneur selling shortcut dreams to sailors.",
    prompt: `What is your character's name?
Captain Mirella Tide

What is their homeland or kingdom?
Floating bazaar of the Misty Reefs

What role do they play (hero, villain, sidekick, etc.)?
Charismatic villainess

What is their signature companion or magic?
Ledger of Tides that grants wishes at the cost of memories

How would you describe their personality?
Charming, calculating, secretly lonely

What wish or lesson defines them?
To rebuild the ship her family lost in a storm

Share a backstory snapshot.
Turned to bargained magic after seeing her fisherfolk village swallowed by whirlpools; now she sells fate-changing contracts at sea.`,
  },
  {
    title: "Royal Inventor",
    description: "An inventor princess who designs musical machines for festivals.",
    prompt: `What is your character's name?
Princess Juniper

What is their homeland or kingdom?
Clockwork Kingdom of Belloria

What role do they play (hero, villain, sidekick, etc.)?
Heroic princess inventor

What is their signature companion or magic?
Wind-up dragon companion that powers her inventions

How would you describe their personality?
Optimistic, inventive, steadfast

What wish or lesson defines them?
To prove creativity is as noble as bloodline

Share a backstory snapshot.
Built a music machine that stopped a war between rival dukes by harmonizing their anthems into one melody.`,
  },
  {
    title: "Desert Storyteller",
    description: "A bard weaving tales that come alive under the desert moon.",
    prompt: `What is your character's name?
Sahir Al-Faye

What is their homeland or kingdom?
Sands of Agrabah's neighboring oasis city

What role do they play (hero, villain, sidekick, etc.)?
Heroic storyteller

What is their signature companion or magic?
Story lantern that projects living illustrations

How would you describe their personality?
Warm, empathetic, endlessly imaginative

What wish or lesson defines them?
To keep legends alive so heroes are never forgotten

Share a backstory snapshot.
Learned tales from traveling merchants and now travels with a flying carpet to bring hope to remote villages.`,
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
        label: "Young adventurer",
        value: "young adventurer"
      },
      {
        label: "Royal teen",
        value: "royal teen"
      },
      {
        label: "Brave adult",
        value: "brave adult"
      },
      {
        label: "Wise mentor",
        value: "wise mentor"
      },
      {
        label: "Timeless magical being",
        value: "timeless magical being"
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
        label: "Royal bodice",
        value: "royal bodice"
      },
      {
        label: "Heroic tunic",
        value: "heroic tunic"
      },
      {
        label: "Explorer blouse",
        value: "explorer blouse"
      },
      {
        label: "Villain cape",
        value: "villain cape"
      },
      {
        label: "Animal sidekick vest",
        value: "animal sidekick vest"
      }
    ]
  },
  {
    title: "Bottom",
    key: "bottom",
    data: [
      {
        label: "Ballgown skirts",
        value: "ballgown skirts"
      },
      {
        label: "Adventure trousers",
        value: "adventure trousers"
      },
      {
        label: "Flowing dress",
        value: "flowing dress"
      },
      {
        label: "Sailor shorts",
        value: "sailor shorts"
      },
      {
        label: "Magical tail shimmer",
        value: "magical tail shimmer"
      }
    ]
  },
  {
    title: "Set",
    key: "set",
    data: [
      {
        label: "Enchanted royal",
        value: "enchanted royal set"
      },
      {
        label: "Hero quest outfit",
        value: "hero quest outfit"
      },
      {
        label: "Villainous ensemble",
        value: "villainous ensemble"
      },
      {
        label: "Forest explorer",
        value: "forest explorer set"
      },
      {
        label: "Fairy tale festival",
        value: "fairy tale festival"
      }
    ]
  },
  {
    title: "Material",
    key: "material",
    data: [
      {
        label: "Sparkling satin",
        value: "sparkling satin"
      },
      {
        label: "Royal brocade",
        value: "royal brocade"
      },
      {
        label: "Adventure leather",
        value: "adventure leather"
      },
      {
        label: "Pixie dust shimmer",
        value: "pixie dust shimmer"
      },
      {
        label: "Snowflake lace",
        value: "snowflake lace"
      }
    ]
  },
  {
    title: "Accessory",
    key: "accessory",
    data: [
      {
        label: "Magic tiara",
        value: "magic tiara"
      },
      {
        label: "Quest satchel",
        value: "quest satchel"
      },
      {
        label: "Sidekick companion",
        value: "sidekick companion"
      },
      {
        label: "Wishing lantern",
        value: "wishing lantern"
      },
      {
        label: "Villain spellbook",
        value: "villain spellbook"
      }
    ]
  }
];

const examples = [
  {
    image: "https://cdn.ocmaker.app/example/disney-oc-generateds-1.webp",
    prompt:
      "1girl, flowing auburn hair, bright blue eyes, enchanted forest dress, magical sparkles, kind smile, Disney princess style, woodland animals nearby, looking at viewer, simple background, upper body",
  },
  {
    image: "https://cdn.ocmaker.app/example/disney-oc-generateds-2.webp",
    prompt:
      "1boy, golden blonde hair, charming smile, royal prince outfit, cape, confident pose, Disney prince style, single character, upper body, looking at viewer, castle background, animated style",
  },
  {
    image: "https://cdn.ocmaker.app/example/disney-oc-generateds-3.webp",
    prompt:
      "1girl, curly dark hair with flowers, warm brown eyes, tropical island dress, seashell accessories, adventurous expression, Disney style, ocean background, looking at viewer, upper body",
  },
  {
    image: "https://cdn.ocmaker.app/example/disney-oc-generateds-4.webp",
    prompt:
      "1girl, silver hair in elegant updo, ice blue eyes, winter gown with snowflake patterns, ice magic effects, serene expression, Disney frozen style, looking at viewer, simple background, upper body",
  },
];

export default {
  meta: {
    title: "Disney OC Maker",
    description:
      "Create your own Disney OC with AI. Design magical characters, enchanting stories, and timeless adventures in the beloved world of Disney animation.",
  },
  series: "Disney",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Disney OC Maker",
      description:
        "Create your own Disney OC with AI. Design magical characters, enchanting stories, and timeless adventures in the beloved world of Disney animation.",
    },
    step: {
      title: "How to Make Disney OC",
      description:
        "Creating your Disney character is as magical as a fairy tale. Follow these steps to bring your enchanting character to life.",
      steps: [
        {
          title: "Choose Your Character Type",
          description:
            "Decide if your character is a princess, prince, villain, sidekick, or magical creature. Consider their role in the Disney universe and what makes them special.",
        },
        {
          title: "Design Magical Appearance",
          description:
            "Describe your character's appearance, magical abilities, and signature outfit. Include Disney-style elements like flowing hair, expressive eyes, and enchanted accessories.",
        },
        {
          title: "Generate Your Disney Magic",
          description:
            "Click 'Generate Character' to create your Disney OC. Choose from multiple AI-generated designs that capture the timeless charm and magic of Disney animation.",
        },
      ],
    },
    examples: {
      title: "Disney Examples",
      description:
        "Discover enchanting Disney characters created with text prompts using the Disney OC Maker.",
      examples,
    },
    features: {
      title: "What is Disney OC Maker?",
      description:
        "Disney OC Maker specializes in creating characters with the timeless magic of Disney. Design authentic characters with enchanting stories, magical powers, and heartwarming adventures.",
      features: [
        {
          label: "Authentic Disney Animation Style",
          description:
            "Generate characters that perfectly capture Disney's iconic animation aesthetic, from expressive features to magical elements and enchanting designs.",
        },
        {
          label: "Magical Character Elements",
          description:
            "Our AI understands Disney's magical elements including fairy tale themes, animal companions, magical powers, and the distinctive Disney character charm.",
        },
        {
          label: "Instant Magic Creation",
          description:
            "Create beautiful Disney-style characters in seconds, allowing you to focus on developing their magical stories, adventures, and relationships.",
        },
        {
          label: "High-Quality Animation Art",
          description:
            "Powered by AI trained on Disney's visual standards, delivering character art that captures the warmth, magic, and timeless appeal of Disney animation.",
        },
        {
          label: "Multiple Character Variations",
          description:
            "Generate several character interpretations per prompt, exploring different outfits, magical effects, and classic Disney character expressions.",
        },
        {
          label: "Disney Universe Integration",
          description:
            "Create characters that naturally belong in the Disney universe, with authentic fairy tale elements, magical kingdoms, and heartwarming story potential.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is Disney OC Maker and how does it work?",
          answer:
            "Disney OC Maker is an AI tool specialized for creating original Disney-style characters. Describe your character's appearance, role, and magical elements, and our AI generates authentic Disney animation-style artwork.",
        },
        {
          question: "How can I create better characters with Disney OC Maker?",
          answer:
            "Include specific Disney elements like magical powers, fairy tale themes, character roles (princess, villain, etc.), and classic Disney aesthetics. The more Disney-specific details you include, the better the results.",
        },
        {
          question: "Is Disney OC Maker free to use?",
          answer:
            "Yes, Disney OC Maker offers free character generation with core features. Premium plans provide faster generation, advanced magical effects, and more customization options.",
        },
        {
          question: "What makes Disney OC Maker's results so magical?",
          answer:
            "Our AI is specifically trained on Disney's animation style and storytelling elements, understanding character design principles, magical aesthetics, and the timeless Disney charm.",
        },
        {
          question:
            "Can I use characters created with Disney OC Maker commercially?",
          answer:
            "Yes, all original characters you create are yours to use for personal and commercial projects. We don't claim ownership of your magical character designs.",
        },
        {
          question: "Do I need an account to use Disney OC Maker?",
          answer:
            "No account required for basic use. Creating an account allows you to save characters, access creation history, and unlock premium magical features.",
        },
        {
          question: "Can I regenerate or modify my Disney character designs?",
          answer:
            "Absolutely! You can regenerate with the same prompt for variations or adjust your description to fine-tune your character until it perfectly captures your magical vision.",
        },
        {
          question: "Will you add more animation-style OC Makers?",
          answer:
            "Yes! We're expanding to include other beloved animation studios and cartoon styles. Follow our updates for new themed OC Makers.",
        },
      ],
    },
    cta: {
      title: "Create Your Disney Magic",
      description:
        "Design your perfect Disney character — no artistic skills required. Just dream, describe, and experience the magic of Disney storytelling.",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
