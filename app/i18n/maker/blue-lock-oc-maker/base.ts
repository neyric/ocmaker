const basePrompt = `
  WORLD CONTEXT:
  Universe: Blue Lock
  Setting: Japan Football Union's Blue Lock facility, Ego Jinpachi's striker training program, high-stakes ego battles for national team selection
  Key Elements: Isolated training blocks, rival strikers, wildcard invitations, Neo Egoist League clubs (Bastard München, Paris X Gen, Manshine City), adaptability tests

  OUTPUT FORMAT:
  Name, Preferred Position, Signature Weapon (Skill), Supporting Abilities, Ego/Personality, Rival Motivations, Soccer Backstory

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Egoist Striker",
    description: "A striker whose swordplay footwork turns volleys into highlight reels.",
    prompt: `What is your character's name?
Kaito Arashi

What is their preferred position?
Central striker leading the attack

What signature weapon or skill do they showcase?
Katana-kick volley slicing through defenses with precise angles

What supporting abilities bolster their play?
Lightning feints and aerial control born from kendo drills

How would you describe their ego and personality?
Dramatic, self-styled hero who thrives under spotlight pressure

What rival motivation keeps them hungry?
To outshine Isagi and become Japan's definitive sword on the pitch

Share a soccer backstory snapshot.
Former youth kendo champion who abandoned the dojo after a Blue Lock invitation appeared in his locker.`,
  },
  {
    title: "Tactical Playmaker",
    description: "A midfielder who treats every Blue Lock match like a grand chess problem.",
    prompt: `What is your character's name?
Rei Tsukishima

What is their preferred position?
Attacking midfielder orchestrating the offense

What signature weapon or skill do they showcase?
Force Check vision passes that exploit micro-gaps

What supporting abilities bolster their play?
Game reading, set-piece deception, tireless analysis drills

How would you describe their ego and personality?
Composed, strategic, slightly condescending toward improvisers

What rival motivation keeps them hungry?
To prove intellect can rival instinct by dethroning Rin Itoshi

Share a soccer backstory snapshot.
Maps every Blue Lock trial on notebook grids, beating larger strikers by predicting their movement three steps ahead.`,
  },
  {
    title: "Aerial Ace",
    description: "A winger whose vertical leap makes every cross a Meteor Crash.",
    prompt: `What is your character's name?
Noa Fujimori

What is their preferred position?
Left winger attacking the far post

What signature weapon or skill do they showcase?
Gravity-defying headers dubbed the Meteor Crash

What supporting abilities bolster their play?
Sprint bursts, double-touch control, fearless collisions

How would you describe their ego and personality?
Outgoing, thrill-seeking, addicted to crowd reactions

What rival motivation keeps them hungry?
To challenge Bachira's creativity while chasing Neo Egoist spots

Share a soccer backstory snapshot.
Trained on abandoned rollercoasters to conquer a childhood fear of heights after a devastating fall.`,
  },
  {
    title: "Set-Piece Sorcerer",
    description: "A dead-ball artist whose knuckle shots bend reality itself.",
    prompt: `What is your character's name?
Hikari Mizuno

What is their preferred position?
Right midfielder and free-kick specialist

What signature weapon or skill do they showcase?
Mirage Knuckle free kick that dips unpredictably

What supporting abilities bolster their play?
Weather reading, spin control, adaptive positioning

How would you describe their ego and personality?
Calm, mystical, speaks in poetic metaphors

What rival motivation keeps them hungry?
To score against Noel Noa in a legitimate match and earn praise

Share a soccer backstory snapshot.
Mastered ball physics by launching paper cranes with elastic bands, then mirrored those curves on the field.`,
  },
  {
    title: "Guardian Libero",
    description: "A defender reinventing ego to demand the spotlight from the back line.",
    prompt: `What is your character's name?
Ayato Koga

What is their preferred position?
Sweeper-libero anchoring the defense

What signature weapon or skill do they showcase?
Aegis Break tackles converting steals into counterattacks

What supporting abilities bolster their play?
Laser-guided long passes, relentless marking, aerial authority

How would you describe their ego and personality?
Protective, quietly intense, obsessed with control

What rival motivation keeps them hungry?
To prove defenders deserve ego glory alongside strikers

Share a soccer backstory snapshot.
Once benched for being too supportive, he joined Blue Lock to redefine what a Japanese ace can be.`,
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
        label: "U-18 striker",
        value: "u18 striker"
      },
      {
        label: "Neo Egoist trainee",
        value: "neo egoist trainee"
      },
      {
        label: "International rookie",
        value: "international rookie"
      },
      {
        label: "Pro league forward",
        value: "pro league forward"
      },
      {
        label: "Veteran ace",
        value: "veteran ace"
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
        label: "Blue Lock jersey",
        value: "blue lock jersey"
      },
      {
        label: "Training bib",
        value: "training bib"
      },
      {
        label: "Neo Egoist kit",
        value: "neo egoist kit"
      },
      {
        label: "International club uniform",
        value: "international club uniform"
      },
      {
        label: "Street practice tee",
        value: "street practice tee"
      }
    ]
  },
  {
    title: "Bottom",
    key: "bottom",
    data: [
      {
        label: "Compression shorts",
        value: "compression shorts"
      },
      {
        label: "Match shorts",
        value: "match shorts"
      },
      {
        label: "Track pants",
        value: "track pants"
      },
      {
        label: "Street joggers",
        value: "street joggers"
      },
      {
        label: "Warm-up sweats",
        value: "warm up sweats"
      }
    ]
  },
  {
    title: "Set",
    key: "set",
    data: [
      {
        label: "Blue Lock standard",
        value: "blue lock standard set"
      },
      {
        label: "Team Z nostalgia",
        value: "team z nostalgia set"
      },
      {
        label: "Noel Noa pro kit",
        value: "noel noa pro kit"
      },
      {
        label: "World Cup challenger",
        value: "world cup challenger set"
      },
      {
        label: "Street futsal",
        value: "street futsal gear"
      }
    ]
  },
  {
    title: "Material",
    key: "material",
    data: [
      {
        label: "Sweat-wicking mesh",
        value: "sweat wicking mesh"
      },
      {
        label: "Lightweight jersey",
        value: "lightweight jersey"
      },
      {
        label: "Compression weave",
        value: "compression weave"
      },
      {
        label: "Thermal training fabric",
        value: "thermal training fabric"
      },
      {
        label: "Rain-ready nylon",
        value: "rain ready nylon"
      }
    ]
  },
  {
    title: "Accessory",
    key: "accessory",
    data: [
      {
        label: "Performance cleats",
        value: "performance cleats"
      },
      {
        label: "Captain armband",
        value: "captain armband"
      },
      {
        label: "Kinesio tape",
        value: "kinesio tape"
      },
      {
        label: "Goal tracker wristband",
        value: "goal tracker wristband"
      },
      {
        label: "Headband",
        value: "headband"
      }
    ]
  },
  {
    title: "Position",
    key: "position",
    data: [
      {
        label: "Striker",
        value: "striker"
      },
      {
        label: "Second striker",
        value: "second striker"
      },
      {
        label: "Winger",
        value: "winger"
      },
      {
        label: "Playmaker",
        value: "playmaker"
      },
      {
        label: "Libero",
        value: "libero"
      }
    ]
  }
];

const examples = [
  {
    image:
      "https://cdn.ocmaker.app/example/blue-lock-oc-maker-generated-1.webp",
    prompt:
      "1boy, spiky blue hair, intense yellow eyes, competitive expression, blue lock style soccer uniform number 11, muscular build, dynamic pose, soccer field background, anime style, looking at viewer, simple background, upper body",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/blue-lock-oc-maker-generated-2.webp",
    prompt:
      "1boy, white hair with black streaks, sharp red eyes, confident smirk, blue lock training gear, athletic physique, holding soccer ball, striker pose, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/blue-lock-oc-maker-generated-3.webp",
    prompt:
      "1boy, long green hair tied back, calculating purple eyes, analytical expression, blue lock goalkeeper uniform, gloves, defensive stance, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/blue-lock-oc-maker-generated-4.webp",
    prompt:
      "1boy, short orange hair, fierce blue eyes, determined expression, blue lock midfielder jersey number 7, speed-focused build, ready to sprint pose, single character, upper body, looking at viewer, anime style, simple background",
  },
];

export default {
  meta: {
    title: "Blue Lock OC Maker",
    description:
      "Generate your own Blue Lock OC with AI. Create characters, backstories, and visuals in the intense world of competitive soccer and ego-driven strikers.",
  },
  series: "Blue Lock",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Blue Lock OC Maker",
      description:
        "Generate your own Blue Lock OC with AI. Create characters, backstories, and visuals in the intense world of competitive soccer and ego-driven strikers.",
    },
    step: {
      title: "How to Make Blue Lock OC",
      description:
        "Creating a Blue Lock-style character with OC Maker is easy. Just follow these steps to bring your ultimate striker to life.",
      steps: [
        {
          title: "Describe Your Blue Lock OC",
          description:
            "Fill in the form with your character's basic appearance and personality. For best results, include Blue Lock-style features like athletic builds, soccer gear, intense expressions, and the ego-driven mindset of a striker.",
        },
        {
          title: "Add Details and Soccer Elements",
          description:
            "Include extra details like playing position, special techniques, weapon (unique skill), or their personal ego philosophy. The more your character embodies the Blue Lock mentality, the more authentic the result will be.",
        },
        {
          title: "Generate and Finalize Design",
          description:
            "Click the 'Generate Character' button to create your Blue Lock OC. You'll get several AI-generated designs — pick your favorite to complete your character.",
        },
      ],
    },
    examples: {
      title: "Blue Lock Examples",
      description:
        "Explore Blue Lock characters made from text prompts, created using the Blue Lock OC Maker.",
      examples,
    },
    features: {
      title: "What is Blue Lock OC Maker?",
      description:
        "Blue Lock OC Maker is a version of OC Maker fine-tuned for the world of Blue Lock. Describe your character, and instantly turn it into competitive soccer-style artwork.",
      features: [
        {
          label: "Authentic Soccer Player Design",
          description:
            "Create characters that truly capture the intense competitive spirit of Blue Lock, designed to seamlessly fit into the world of ego-driven strikers and revolutionary soccer.",
        },
        {
          label: "Tailored Prompt Tuning",
          description:
            "Prompts are fine-tuned for Blue Lock aesthetics — from athletic builds to soccer gear — helping you build more convincing characters.",
        },
        {
          label: "Fast Character Generation",
          description:
            "Generate high-quality characters in just seconds, allowing you to focus more on refining ideas and less on waiting.",
        },
        {
          label: "High-Quality Visual Output",
          description:
            "Powered by advanced AI models, Blue Lock OC Maker delivers detailed, high-resolution character images suitable for storytelling, design, or sharing.",
        },
        {
          label: "Choose from Multiple Results",
          description:
            "Generate multiple character options per prompt and select your favorites to finalize as your official Blue Lock OC.",
        },
        {
          label: "Deep Story Integration",
          description:
            "Bring your OC to life with not just visuals, but also compelling backstories, unique weapons (skills), ego philosophies, and rich connections to the competitive world of Blue Lock.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is Blue Lock OC Maker and how does it work?",
          answer:
            "Blue Lock OC Maker is a specialized version of OC Maker, fine-tuned for the Blue Lock universe. Simply describe your character, and our AI will generate soccer player-style visuals in seconds based on your prompt.",
        },
        {
          question:
            "How can I create better characters with Blue Lock OC Maker?",
          answer:
            "For best results, include Blue Lock-specific traits in your description, such as playing positions, unique techniques, ego philosophies, or physical attributes suited for soccer. The more vivid and detailed your input, the more accurate and compelling the output.",
        },
        {
          question: "Is Blue Lock OC Maker free to use?",
          answer:
            "Yes, Blue Lock OC Maker offers free character generation with basic features. For faster results, premium options, and additional control, you can upgrade your plan anytime.",
        },
        {
          question: "What makes Blue Lock OC Maker's results so impressive?",
          answer:
            "Blue Lock OC Maker uses cutting-edge AI models fine-tuned for the competitive soccer setting, ensuring characters match the distinctive art style and intense atmosphere of the series.",
        },
        {
          question:
            "Can I use characters made with Blue Lock OC Maker for commercial projects?",
          answer:
            "Yes, any characters you create using Blue Lock OC Maker are yours to use freely for both personal and commercial purposes. We do not claim ownership over your creations.",
        },
        {
          question: "Do I need an account to use Blue Lock OC Maker?",
          answer:
            "No account is required for basic use. However, creating an account lets you save your characters, track generation history, and access more features.",
        },
        {
          question:
            "Can I regenerate or fine-tune the same character in Blue Lock OC Maker?",
          answer:
            "Yes, you can regenerate results from the same prompt or adjust your inputs to refine your character until it fits your vision perfectly.",
        },
        {
          question:
            "Will there be more anime-style OC Makers like Blue Lock OC Maker?",
          answer:
            "Yes! We plan to release more specialized OC Makers tailored for different anime universes. Stay tuned for future updates on ocmaker.app.",
        },
      ],
    },
    cta: {
      title: "Create Your Ultimate Striker",
      description:
        "Bring your original Blue Lock character to life — no drawing skills needed. Just describe, generate, and dominate the field.",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
