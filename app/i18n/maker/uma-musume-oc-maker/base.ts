const basePrompt = `
  WORLD CONTEXT:
  Universe: Uma Musume Pretty Derby
  Setting: Tracen Academy, reincarnated racehorse girls, idol performances, G1 tournaments, training camps, fanfare-laden races
  Key Elements: Trainers, support cards, classic Japanese & international race motifs, Twinkle Series races, dorm rivalries, idol stages after victories

  OUTPUT FORMAT:
  Name, Pedigree Inspiration, Preferred Distance & Running Style, Trainer/Team, Personality, Rivalry/Goal Race, Backstory Snapshot

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Twilight Sprinter",
    description: "A sprinter inspired by the legendary El Condor Pasa's daring flair.",
    prompt: `What is your character's name?
Twilight Condor

What famous pedigree or inspiration do they carry?
Descendant of a foreign champion who dazzled Japan

What is their preferred distance and running style?
Prefers 1200m-1600m, front-runner

Who is their trainer or team?
Tracen Academy team Gold Star

How would you describe their personality?
Bold, flashy, loves showy finishes

What rivalry or goal race drives them?
To win the Sprinters Stakes in record time

Share a backstory snapshot.
Grew up in America watching videos of El Condor Pasa and moved to Tracen to chase that legacy.`,
  },
  {
    title: "Marathon Muse",
    description: "A distance runner channeling the stamina of Deep Impact.",
    prompt: `What is your character's name?
Deep Serenade

What famous pedigree or inspiration do they carry?
Inspired by Deep Impact's unyielding drive

What is their preferred distance and running style?
Prefers 2400m-3200m, closing runner

Who is their trainer or team?
Team Sakura Bridge under Trainer Riko

How would you describe their personality?
Calm, poetic, quietly competitive

What rivalry or goal race drives them?
To conquer the Tenno Sho (Spring) with a dramatic late surge

Share a backstory snapshot.
Writes haiku about every race and trains at dawn to honor Deep Impact's legendary workouts.`,
  },
  {
    title: "Dirt Track Dynamo",
    description: "A dirt-track racer bringing American grit to Japanese circuits.",
    prompt: `What is your character's name?
Desert Blaze

What famous pedigree or inspiration do they carry?
Inspired by Secretariat's raw power

What is their preferred distance and running style?
Prefers 1600m dirt, pace chaser

Who is their trainer or team?
Joint Tracen and overseas exchange program

How would you describe their personality?
Energetic, stubborn, thrives in mud

What rivalry or goal race drives them?
To dominate the February Stakes and prove dirt can shine

Share a backstory snapshot.
Raised on desert ranch tracks, she joined Tracen's exchange program to broaden dirt racing prestige.`,
  },
  {
    title: "Classic Crown",
    description: "A tactician aiming for the elusive Triple Crown.",
    prompt: `What is your character's name?
Crown Sonata

What famous pedigree or inspiration do they carry?
Modeled after Symboli Rudolf's regal presence

What is their preferred distance and running style?
Prefers 2000m-2400m, tactical stalker

Who is their trainer or team?
Symboli Dormitory elite team

How would you describe their personality?
Disciplined, regal, encouraging to juniors

What rivalry or goal race drives them?
To sweep the Satsuki Sho, Tokyo Yushun, and Kikuka Sho

Share a backstory snapshot.
Mentored by Symboli Rudolf herself, she balances harsh training with tutoring younger Uma Musume.`,
  },
  {
    title: "Night Racetrack Idol",
    description: "A night racing specialist captivating fans under stadium lights.",
    prompt: `What is your character's name?
Moonlit Diva

What famous pedigree or inspiration do they carry?
Inspired by Agnes Digital's versatility

What is their preferred distance and running style?
Prefers 1400m night races, adaptable runner

Who is their trainer or team?
Twilight Stage idol-racing unit

How would you describe their personality?
Glamorous, fun-loving, hardworking

What rivalry or goal race drives them?
To headline the NHK Mile Cup Night Special and become top idol

Share a backstory snapshot.
Balanced idol lessons with racetrack drills after being scouted during a fan-favorite half-time show.`,
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
        label: "Debut runner",
        value: "debut runner"
      },
      {
        label: "Main series competitor",
        value: "main series competitor"
      },
      {
        label: "G1 champion",
        value: "g1 champion"
      },
      {
        label: "Retired idol",
        value: "retired idol"
      },
      {
        label: "Legendary muse",
        value: "legendary muse"
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
        label: "Tracen academy uniform",
        value: "tracen academy uniform"
      },
      {
        label: "Racing singlet",
        value: "racing singlet"
      },
      {
        label: "Gala idol dress",
        value: "gala idol dress"
      },
      {
        label: "Training jacket",
        value: "training jacket"
      },
      {
        label: "Casual cardigan",
        value: "casual cardigan uma"
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
        label: "Racing skirt",
        value: "racing skirt"
      },
      {
        label: "Training shorts",
        value: "training shorts uma"
      },
      {
        label: "Formal dress hem",
        value: "formal dress hem"
      },
      {
        label: "Jockey leggings",
        value: "jockey leggings"
      },
      {
        label: "Stage tutu",
        value: "stage tutu"
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
        label: "Tracen academy",
        value: "tracen academy set"
      },
      {
        label: "Classic G1",
        value: "classic g1 set"
      },
      {
        label: "Dirt track idol",
        value: "dirt track idol set"
      },
      {
        label: "Midnight stage",
        value: "midnight stage set"
      },
      {
        label: "Legendary derby",
        value: "legendary derby set"
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
        label: "Lightweight racing fabric",
        value: "lightweight racing fabric"
      },
      {
        label: "Moisture-wick mesh",
        value: "moisture wick mesh"
      },
      {
        label: "Glitter satin",
        value: "glitter satin"
      },
      {
        label: "Thermal fleece",
        value: "thermal fleece"
      },
      {
        label: "Stage shimmer",
        value: "stage shimmer"
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
        label: "Race number bib",
        value: "race number bib"
      },
      {
        label: "Victory wreath",
        value: "victory wreath"
      },
      {
        label: "Training whistle",
        value: "training whistle"
      },
      {
        label: "Horse tail ribbon",
        value: "horse tail ribbon"
      },
      {
        label: "Stage microphone",
        value: "uma stage microphone"
      }
    ]
  }
];

const examples = [
  {
    image: "https://cdn.ocmaker.app/example/uma-musume-oc-generated-1.webp",
    prompt:
      "1girl, long brown hair with horse ears, golden eyes, uma musume racing uniform, determined expression, racing number bib, starting position pose, competitive spirit, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/uma-musume-oc-generated-2.webp",
    prompt:
      "1girl, twin-tail silver hair, blue eyes with star pupils, horse ears and tail, uma musume school uniform, cheerful smile, victory pose, racing trophy, sparkle effects, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/uma-musume-oc-generated-3.webp",
    prompt:
      "1girl, long black hair in ponytail, red eyes, thoroughbred horse ears, elegant racing silks, serious expression, jockey gear, speed lines effect, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/uma-musume-oc-generated-4.webp",
    prompt:
      "1girl, short pink hair with side braid, green eyes, adorable horse ears, uma musume casual outfit, energetic pose, training gear, sweat effects, determination aura, single character, upper body, looking at viewer, anime style, simple background",
  },
];

export default {
  meta: {
    title: "Uma Musume OC Maker",
    description:
      "Generate your own Uma Musume OC with AI. Create unique horse girl characters with racing abilities, idol performances, and competitive spirit.",
  },
  series: "Uma Musume",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Uma Musume OC Maker",
      description:
        "Generate your own Uma Musume OC with AI. Create unique horse girl characters with racing abilities, idol performances, and competitive spirit.",
    },
    step: {
      title: "How to Make Uma Musume OC",
      description:
        "Creating an Uma Musume character with OC Maker is as exciting as a race. Follow these steps to design your own horse girl champion.",
      steps: [
        {
          title: "Describe Your Horse Girl",
          description:
            "Fill in the form with your character's appearance and personality. For authentic results, include Uma Musume-specific features like horse ears and tail, racing uniforms, school outfits, or idol costumes.",
        },
        {
          title: "Add Racing and Performance Details",
          description:
            "Include details about your character's racing specialty (sprinter, miler, stayer), personality traits, special skills, and whether they excel in racing, idol activities, or both. The more specific to Uma Musume's world, the better.",
        },
        {
          title: "Generate and Cross the Finish Line",
          description:
            "Click 'Generate Character' to create your Uma Musume OC. You'll receive multiple AI-generated designs — choose your favorite to complete your champion horse girl!",
        },
      ],
    },
    examples: {
      title: "Uma Musume Character Examples",
      description:
        "Explore Uma Musume characters created from text prompts using the Uma Musume OC Maker.",
      examples,
    },
    features: {
      title: "What is Uma Musume OC Maker?",
      description:
        "Uma Musume OC Maker is a specialized version of OC Maker designed for the Uma Musume universe. Describe your horse girl and instantly transform her into authentic anime-style racing champion artwork.",
      features: [
        {
          label: "Authentic Uma Musume Design",
          description:
            "Create characters that perfectly capture the distinctive Uma Musume art style, from horse ears and tails to racing uniforms, designed to fit seamlessly into the horse racing world.",
        },
        {
          label: "Racing and Idol Integration",
          description:
            "Prompts are optimized for both racing and idol elements — from competitive gear to performance costumes — helping you create well-rounded Uma Musume characters.",
        },
        {
          label: "Fast Character Creation",
          description:
            "Generate high-quality Uma Musume characters in seconds, perfect for capturing the energy and spirit of competitive horse racing and idol performances.",
        },
        {
          label: "Detailed Horse Girl Artwork",
          description:
            "Our AI produces intricate character designs with authentic Uma Musume features, racing gear, and the distinctive charm of the series' art style.",
        },
        {
          label: "Multiple Design Options",
          description:
            "Generate several character variations per prompt, allowing you to explore different racing specialties and select your champion design.",
        },
        {
          label: "Complete Racing Profile",
          description:
            "Create comprehensive characters including racing abilities, personality traits, and backstories that embody the competitive spirit of Uma Musume.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is Uma Musume OC Maker and how does it work?",
          answer:
            "Uma Musume OC Maker is an AI tool specialized for creating Uma Musume Pretty Derby characters. Describe your horse girl's appearance and abilities, and our AI generates artwork in the series' distinctive style.",
        },
        {
          question: "How can I create better Uma Musume characters?",
          answer:
            "Include specific Uma Musume elements like racing distance preferences, training routines, idol performance skills, and personality traits. Also mention horse breeds, racing strategies, and special abilities for more authentic results.",
        },
        {
          question: "Is Uma Musume OC Maker free to use?",
          answer:
            "Yes, Uma Musume OC Maker offers free character generation with basic features. Premium plans provide faster generation, more customization options, and additional features.",
        },
        {
          question: "What makes the horse girl designs look authentic?",
          answer:
            "Our AI understands Uma Musume's unique blend of horse features and human characteristics, creating characters that maintain the series' distinctive art style and racing theme.",
        },
        {
          question: "Can I use my Uma Musume OC for fan projects?",
          answer:
            "Absolutely! Characters created with Uma Musume OC Maker are yours to use in fan fiction, artwork, roleplay, or any creative project you have in mind.",
        },
        {
          question: "Do I need an account to create characters?",
          answer:
            "No registration required for basic use. However, creating an account allows you to save your horse girls, track generation history, and access premium features.",
        },
        {
          question: "Can I create different types of Uma Musume characters?",
          answer:
            "Yes! Create sprinters, milers, stayers, or long-distance runners. You can also focus on racing champions, idol performers, or characters who excel in both areas.",
        },
        {
          question: "Will there be more game-based OC makers like this?",
          answer:
            "Yes! We're continuously expanding our collection of game-specific OC makers. Check ocmaker.app regularly for new additions to our gaming library.",
        },
      ],
    },
    cta: {
      title: "Create Your Own Uma Musume",
      description:
        "Design your original Uma Musume racing champion — no drawing skills needed. Just describe, generate, and race to victory!",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
