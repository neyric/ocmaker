const basePrompt = `
  WORLD CONTEXT:
  Universe: Chainsaw Man
  Setting: Late 1990s Japan, Devil-infested society, Public Safety bureaus, clandestine organizations, brutal dark humor tone
  Key Factions: Public Safety Devil Hunters, Special Division 4, Private Devil Hunter companies, Yakuza remnants, international assassin teams, Weapon Hybrids, Fiends

  OUTPUT FORMAT:
  Name, Affiliation, Devil Contract or Hybrid Power, Signature Weapon/Form, Personality, Ultimate Desire, Tragic Backstory

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Public Safety Veteran",
    description: "A Division 4 survivor who keeps going for the rookies depending on her.",
    prompt: `What is your character's name?
Reina Shiomi

What is their affiliation?
Public Safety Devil Hunters, Tokyo Division 4

What devil contract or hybrid power do they wield?
Contract with the Railgun Devil trading hearing for bullet trajectories

What is their signature weapon or form?
Metal rail gauntlet that fires devil-charged slugs

How would you describe their personality?
Dry, battle-weary, protective of reckless recruits

What ultimate desire drives them?
To retire long enough to visit every ramen stand she promised her partner

Share their tragic backstory.
Lost her hearing after firing the Railgun Devil to vaporize a zombie horde, yet still hears the screams in her dreams.`,
  },
  {
    title: "Hybridity Experiment",
    description: "An illegal human-weapons hybrid searching for a place to belong.",
    prompt: `What is your character's name?
Jun Harada

What is their affiliation?
Independent hybrid under covert observation

What devil contract or hybrid power do they wield?
Hybridity with the Mirror Devil allowing reflection duplication

What is their signature weapon or form?
Mirrored chainsaws erupting from forearms

How would you describe their personality?
Detached, curious, fixates on reflections of others

What ultimate desire drives them?
To see an unaltered version of himself one last time

Share their tragic backstory.
Was sold to the Yakuza by his parents; only escaped when Makima's purge shattered his containment chamber.`,
  },
  {
    title: "Private Devil Hunter",
    description: "A freelance hunter monetizing cursed livestreams for devil knowledge.",
    prompt: `What is your character's name?
Mika Kuroe

What is their affiliation?
Independent devil hunter and underground streamer

What devil contract or hybrid power do they wield?
Contract with the Spotlight Devil trading anonymity for invulnerability on camera

What is their signature weapon or form?
Camera drone blades broadcasting every strike

How would you describe their personality?
Flashy, cunning, terrified of being forgotten

What ultimate desire drives them?
To become the internet's most beloved devil exterminator

Share their tragic backstory.
Her family was devoured by the Attention Devil; going live is the only way she feels they can still see her.`,
  },
  {
    title: "International Assassin",
    description: "A foreign assassin chasing contracts across the world at any cost.",
    prompt: `What is your character's name?
Sergei Kozlov

What is their affiliation?
Russian state assassin freelancing in Japan

What devil contract or hybrid power do they wield?
Contract with the Tundra Devil granting cryogenic touch in exchange for warmth

What is their signature weapon or form?
Frozen wire garrote and collapsible ice axe

How would you describe their personality?
Detached, professional, haunted by phantom chills

What ultimate desire drives them?
To earn enough to buy his family's freedom from the state

Share their tragic backstory.
Forced into service after his village was turned to ice as leverage; each mission steals more of his body heat.`,
  },
  {
    title: "Devil Rights Advocate",
    description: "A civilian lawyer championing devil-human coexistence while hiding a pact.",
    prompt: `What is your character's name?
Aya Nanase

What is their affiliation?
Public defender secretly funding devil sanctuaries

What devil contract or hybrid power do they wield?
Contract with the Penance Devil allowing her to absorb others' sins

What is their signature weapon or form?
Chains of guilt that manifest from her wrists

How would you describe their personality?
Compassionate, stubborn, overwhelmed by empathy

What ultimate desire drives them?
To create legal protections for peaceful devils

Share their tragic backstory.
Took on her sister's sentence in exchange for the contract, now relives dozens of crimes in nightmares.`,
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
        label: "Public Safety recruit",
        value: "public safety recruit"
      },
      {
        label: "Devil hunter rookie",
        value: "devil hunter rookie"
      },
      {
        label: "Division veteran",
        value: "division veteran"
      },
      {
        label: "International assassin",
        value: "international assassin"
      },
      {
        label: "Demon hybrid timeless",
        value: "demon hybrid timeless"
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
      },
      {
        label: "Lean hunter",
        value: "lean hunter build"
      },
      {
        label: "Scarred enforcer",
        value: "scarred enforcer build"
      },
      {
        label: "Hybrid physique",
        value: "hybrid physique"
      },
      {
        label: "Athletic rogue",
        value: "athletic rogue build"
      },
      {
        label: "Augmented body",
        value: "augmented body"
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
        label: "Public Safety shirt",
        value: "public safety shirt"
      },
      {
        label: "Leather devil hunter jacket",
        value: "leather devil hunter jacket"
      },
      {
        label: "Casual street tee",
        value: "casual street tee"
      },
      {
        label: "International assassin suit",
        value: "international assassin suit"
      },
      {
        label: "Chainsaw hybrid harness",
        value: "chainsaw hybrid harness"
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
        label: "Bloodstained slacks",
        value: "bloodstained slacks"
      },
      {
        label: "Combat cargo pants",
        value: "combat cargo pants"
      },
      {
        label: "Ripped jeans",
        value: "ripped jeans"
      },
      {
        label: "Hybrid armor greaves",
        value: "hybrid armor greaves"
      },
      {
        label: "Formal assassin trousers",
        value: "formal assassin trousers"
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
        label: "Public Safety uniform",
        value: "public safety uniform"
      },
      {
        label: "Private devil hunter",
        value: "private devil hunter set"
      },
      {
        label: "Special Division 4",
        value: "special division 4 set"
      },
      {
        label: "International assassin",
        value: "international assassin set"
      },
      {
        label: "Chainsaw hybrid rampage",
        value: "chainsaw hybrid rampage"
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
        label: "Bloodproof fabric",
        value: "bloodproof fabric"
      },
      {
        label: "Devil skin leather",
        value: "devil skin leather"
      },
      {
        label: "Kevlar weave",
        value: "kevlar weave"
      },
      {
        label: "Chainsaw plating",
        value: "chainsaw plating"
      },
      {
        label: "Sunrise suit cloth",
        value: "sunrise suit cloth"
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
        label: "Chainsaw pull cord",
        value: "chainsaw pull cord"
      },
      {
        label: "Devil contract charm",
        value: "devil contract charm"
      },
      {
        label: "Blood bag satchel",
        value: "blood bag satchel"
      },
      {
        label: "Hybrid jaw muzzle",
        value: "hybrid jaw muzzle"
      },
      {
        label: "Public Safety badge",
        value: "public safety badge"
      }
    ]
  },
  {
    title: "Alignment",
    key: "csm_alignment",
    data: [
      {
        label: "Public Safety",
        value: "public safety"
      },
      {
        label: "Private hunter",
        value: "private hunter"
      },
      {
        label: "Devil",
        value: "devil"
      },
      {
        label: "Hybrid",
        value: "hybrid"
      },
      {
        label: "International assassin",
        value: "international assassin"
      }
    ]
  }
];

const examples = [
  {
    image:
      "https://cdn.ocmaker.app/example/chainsaw-man-oc-maker-generated-1.webp",
    prompt:
      "1boy, messy black hair, sharp teeth grin, wild red eyes, chainsaw man style devil hunter uniform, blood splatter effects, chainsaw arms transformation hint, dark urban background, anime style, looking at viewer, simple background, upper body",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/chainsaw-man-oc-maker-generated-2.webp",
    prompt:
      "1girl, long dark hair, cold yellow eyes, stoic expression, chainsaw man style public safety suit, cigarette, devil contract markings, professional stance, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/chainsaw-man-oc-maker-generated-3.webp",
    prompt:
      "1girl, short pink hair, spiral eyes, unhinged smile, chainsaw man style casual outfit, devil features, blood on face, chaotic energy, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/chainsaw-man-oc-maker-generated-4.webp",
    prompt:
      "1boy, white hair, heterochromia eyes, mysterious expression, chainsaw man style hybrid form hints, torn clothing, devil hunter rookie, battle-ready pose, single character, upper body, looking at viewer, anime style, simple background",
  },
];

export default {
  meta: {
    title: "Chainsaw Man OC Maker",
    description:
      "Generate your own Chainsaw Man OC with AI. Create characters, backstories, and visuals in the dark and chaotic world of devils, contracts, and devil hunters.",
  },
  series: "Chainsaw Man",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Chainsaw Man OC Maker",
      description:
        "Generate your own Chainsaw Man OC with AI. Create characters, backstories, and visuals in the dark and chaotic world of devils, contracts, and devil hunters.",
    },
    step: {
      title: "How to Make Chainsaw Man OC",
      description:
        "Creating a Chainsaw Man-style character with OC Maker is easy. Just follow these steps to bring your devil hunter or devil to life.",
      steps: [
        {
          title: "Describe Your Chainsaw Man OC",
          description:
            "Fill in the form with your character's basic appearance and personality. For best results, include Chainsaw Man-style features like devil hunter uniforms, devil traits, unhinged expressions, and the dark atmosphere of the series.",
        },
        {
          title: "Add Details and Devil Elements",
          description:
            "Include extra details like their role (devil hunter, devil, hybrid), devil contracts, special abilities, or connections to Public Safety. The more your character fits into the chaotic world of devils, the more authentic the result will be.",
        },
        {
          title: "Generate and Finalize Design",
          description:
            "Click the 'Generate Character' button to create your Chainsaw Man OC. You'll get several AI-generated designs — pick your favorite to complete your character.",
        },
      ],
    },
    examples: {
      title: "Chainsaw Man Examples",
      description:
        "Explore Chainsaw Man characters made from text prompts, created using the Chainsaw Man OC Maker.",
      examples,
    },
    features: {
      title: "What is Chainsaw Man OC Maker?",
      description:
        "Chainsaw Man OC Maker is a version of OC Maker fine-tuned for the world of Chainsaw Man. Describe your character, and instantly turn it into dark fantasy-style artwork.",
      features: [
        {
          label: "Authentic Dark Fantasy Design",
          description:
            "Create characters that truly capture the gritty, chaotic atmosphere of Chainsaw Man, designed to seamlessly fit into the world of devils, contracts, and desperate survival.",
        },
        {
          label: "Tailored Prompt Tuning",
          description:
            "Prompts are fine-tuned for Chainsaw Man aesthetics — from devil features to Public Safety uniforms — helping you build more convincing characters.",
        },
        {
          label: "Fast Character Generation",
          description:
            "Generate high-quality characters in just seconds, allowing you to focus more on refining ideas and less on waiting.",
        },
        {
          label: "High-Quality Visual Output",
          description:
            "Powered by advanced AI models, Chainsaw Man OC Maker delivers detailed, high-resolution character images suitable for storytelling, design, or sharing.",
        },
        {
          label: "Choose from Multiple Results",
          description:
            "Generate multiple character options per prompt and select your favorites to finalize as your official Chainsaw Man OC.",
        },
        {
          label: "Deep Story Integration",
          description:
            "Bring your OC to life with not just visuals, but also compelling backstories, devil contracts, fears and desires, and rich connections to the brutal world of Chainsaw Man.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is Chainsaw Man OC Maker and how does it work?",
          answer:
            "Chainsaw Man OC Maker is a specialized version of OC Maker, fine-tuned for the Chainsaw Man universe. Simply describe your character, and our AI will generate dark fantasy-style visuals in seconds based on your prompt.",
        },
        {
          question:
            "How can I create better characters with Chainsaw Man OC Maker?",
          answer:
            "For best results, include Chainsaw Man-specific traits in your description, such as devil features, Public Safety roles, devil contracts, or personality traits suited for the chaotic world. The more vivid and detailed your input, the more accurate and compelling the output.",
        },
        {
          question: "Is Chainsaw Man OC Maker free to use?",
          answer:
            "Yes, Chainsaw Man OC Maker offers free character generation with basic features. For faster results, premium options, and additional control, you can upgrade your plan anytime.",
        },
        {
          question: "What makes Chainsaw Man OC Maker's results so impressive?",
          answer:
            "Chainsaw Man OC Maker uses cutting-edge AI models fine-tuned for the dark fantasy setting, ensuring characters match the distinctive art style and brutal atmosphere of the series.",
        },
        {
          question:
            "Can I use characters made with Chainsaw Man OC Maker for commercial projects?",
          answer:
            "Yes, any characters you create using Chainsaw Man OC Maker are yours to use freely for both personal and commercial purposes. We do not claim ownership over your creations.",
        },
        {
          question: "Do I need an account to use Chainsaw Man OC Maker?",
          answer:
            "No account is required for basic use. However, creating an account lets you save your characters, track generation history, and access more features.",
        },
        {
          question:
            "Can I regenerate or fine-tune the same character in Chainsaw Man OC Maker?",
          answer:
            "Yes, you can regenerate results from the same prompt or adjust your inputs to refine your character until it fits your vision perfectly.",
        },
        {
          question:
            "Will there be more anime-style OC Makers like Chainsaw Man OC Maker?",
          answer:
            "Yes! We plan to release more specialized OC Makers tailored for different anime universes. Stay tuned for future updates on ocmaker.app.",
        },
      ],
    },
    cta: {
      title: "Create Your Devil Hunter",
      description:
        "Bring your original Chainsaw Man character to life — no drawing skills needed. Just describe, generate, and survive in the world of devils.",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
