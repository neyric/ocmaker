const basePrompt = `
  WORLD CONTEXT:
  Universe: Blue Archive
  Setting: Kivotos city of academies, student councils, after-school task forces, Sensei-led missions, stylized firearms and EX skills
  Key Groups: Federal Student Council (Shittim Chest), Trinity, Gehenna, Millennium, Arius, Valkyrie Police, Abydos resistance clubs, Problem Solver 68, gourmet societies

  OUTPUT FORMAT:
  Name, Academy & Club, Position/Specialty, Preferred Weapon & EX Skill, Personality, Quirks, Mission Backstory

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Trinity Marksman",
    description:
      "An honors student sniper who protects allies with radiant barriers.",
    prompt: `What is your character's name?
Celeste Marigold

Which academy and club do they belong to?
Trinity General School, Justice Realization Committee

What position or specialty do they hold?
Long-range overwatch and battlefield analysis

What is their preferred weapon and EX Skill?
Anti-material rifle Gabriel with an EX Skill summoning holy barriers

How would you describe their personality?
Serene, perfectionist, secretly obsessed with sweets

What quirks define them?
Collects stained-glass charms and quotes scripture mid-battle

Share a mission backstory.
Coordinated encrypted hymn signals with Sensei to halt a runaway tank during the Rabulya riot.`,
  },
  {
    title: "Gehenna Pyrotechnician",
    description:
      "An explosive enthusiast who keeps the discipline committee guessing.",
    prompt: `What is your character's name?
Ibuki Blaze

Which academy and club do they belong to?
Gehenna Academy, Engineering Research Club

What position or specialty do they hold?
Demolitions expert and gadget tinkerer

What is their preferred weapon and EX Skill?
Grenade launcher Inferno with an EX Skill deploying flame turrets

How would you describe their personality?
Chaotic, inventive, fiercely loyal to friends

What quirks define them?
Names every device after desserts and sells blast-proof sweets

Share a mission backstory.
Repurposed festival firework rigs to divert Problem Solver 68, saving Abydos civilians during a citywide chase.`,
  },
  {
    title: "Millennium Hacker",
    description: "A tech prodigy safeguarding Sensei's comms from rogue AIs.",
    prompt: `What is your character's name?
Nakamori Patch

Which academy and club do they belong to?
Millennium Science School, Veritas Cybersecurity Society

What position or specialty do they hold?
Network infiltration and drone defense coordination

What is their preferred weapon and EX Skill?
Dual SMGs with an EX Skill launching a firewall drone swarm

How would you describe their personality?
Sleep-deprived, quirky, endlessly curious about glitches

What quirks define them?
Talks to servers like pets and collects rare error codes

Share a mission backstory.
Shut down an AI uprising in the Ruins by rewriting malicious code mid-battle while Sensei held the line.`,
  },
  {
    title: "Abydos Strategist",
    description:
      "A tactician keeping the desert school afloat with careful planning.",
    prompt: `What is your character's name?
Rana Sol

Which academy and club do they belong to?
Abydos High School, Countermeasure Council

What position or specialty do they hold?
Logistics planner and sniper spotter

What is their preferred weapon and EX Skill?
Lever-action rifle with an EX Skill that conjures sandstorm cover

How would you describe their personality?
Resourceful, stubborn, quietly optimistic about Abydos

What quirks define them?
Scrapbooks every reclaimed block of the desert campus

Share a mission backstory.
Orchestrated a supply heist on Kaiser Corporation, redistributing resources to every starving club unnoticed.`,
  },
  {
    title: "SRT Field Medic",
    description:
      "A stoic combat medic ensuring strike teams return home alive.",
    prompt: `What is your character's name?
Miyu Aegis

Which academy and club do they belong to?
SRT Special Academy, Shield Team

What position or specialty do they hold?
Frontline medic and shield bearer

What is their preferred weapon and EX Skill?
Shielded SMG with an EX Skill forming a protective bastion dome

How would you describe their personality?
Calm, steadfast, sparing with words

What quirks define them?
Keeps a pocket notebook of every student saved

Share a mission backstory.
Carried Sensei through crossfire during the Nasu Metropolis incident, holding the shield wall alone until reinforcements arrived.`,
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
        value: "1boy",
      },
      {
        label: "Girl",
        value: "1girl",
      },
      {
        label: "Non-binary",
        value: "1person",
      },
    ],
  },
  {
    title: "Age",
    key: "age",
    data: [
      {
        label: "Young teen",
        value: "teen",
      },
      {
        label: "Late teen",
        value: "late teen",
      },
      {
        label: "Young adult",
        value: "young adult",
      },
      {
        label: "Experienced adult",
        value: "adult",
      },
      {
        label: "Veteran",
        value: "veteran",
      },
      {
        label: "Seasoned elder",
        value: "seasoned elder",
      },
      {
        label: "Timeless legend",
        value: "timeless legend",
      },
      {
        label: "First-year student",
        value: "first year student",
      },
      {
        label: "Second-year strategist",
        value: "second year strategist",
      },
      {
        label: "Third-year senior",
        value: "third year senior",
      },
      {
        label: "Transfer sensei ally",
        value: "transfer sensei ally",
      },
      {
        label: "Graduated alum",
        value: "graduated alum",
      },
    ],
  },
  {
    title: "Body",
    key: "body",
    data: [
      {
        label: "Slender",
        value: "slender",
      },
      {
        label: "Athletic",
        value: "athletic",
      },
      {
        label: "Muscular",
        value: "muscular",
      },
      {
        label: "Tall",
        value: "tall",
      },
      {
        label: "Petite",
        value: "petite",
      },
      {
        label: "Burly",
        value: "burly",
      },
      {
        label: "Graceful",
        value: "graceful",
      },
    ],
  },
  {
    title: "Hair",
    key: "hair",
    data: [
      {
        label: "Short black hair",
        value: "short black hair",
      },
      {
        label: "Long brown hair",
        value: "long brown hair",
      },
      {
        label: "Blonde hair",
        value: "blonde hair",
      },
      {
        label: "Red hair",
        value: "red hair",
      },
      {
        label: "Silver hair",
        value: "silver hair",
      },
      {
        label: "Blue hair",
        value: "blue hair",
      },
      {
        label: "White hair",
        value: "white hair",
      },
      {
        label: "Braided hair",
        value: "braided hair",
      },
      {
        label: "Wavy lavender hair",
        value: "wavy lavender hair",
      },
    ],
  },
  {
    title: "Eyes",
    key: "eyes",
    data: [
      {
        label: "Brown eyes",
        value: "brown eyes",
      },
      {
        label: "Blue eyes",
        value: "blue eyes",
      },
      {
        label: "Green eyes",
        value: "green eyes",
      },
      {
        label: "Amber eyes",
        value: "amber eyes",
      },
      {
        label: "Gray eyes",
        value: "gray eyes",
      },
      {
        label: "Violet eyes",
        value: "violet eyes",
      },
      {
        label: "Golden eyes",
        value: "golden eyes",
      },
    ],
  },
  {
    title: "Face",
    key: "face",
    data: [
      {
        label: "Determined expression",
        value: "determined expression",
      },
      {
        label: "Smiling",
        value: "smiling expression",
      },
      {
        label: "Serious look",
        value: "serious expression",
      },
      {
        label: "Stoic face",
        value: "stoic expression",
      },
      {
        label: "Playful grin",
        value: "playful grin",
      },
      {
        label: "Fierce snarl",
        value: "fierce snarl",
      },
      {
        label: "Warm smile",
        value: "warm smile",
      },
    ],
  },
  {
    title: "Skin",
    key: "skin",
    data: [
      {
        label: "Fair skin",
        value: "fair skin",
      },
      {
        label: "Warm tan skin",
        value: "tan skin",
      },
      {
        label: "Olive skin",
        value: "olive skin",
      },
      {
        label: "Deep brown skin",
        value: "deep brown skin",
      },
      {
        label: "Freckled skin",
        value: "freckled skin",
      },
      {
        label: "Porcelain skin",
        value: "porcelain skin",
      },
      {
        label: "Sunburned skin",
        value: "sunburned skin",
      },
    ],
  },
  {
    title: "Top",
    key: "top",
    data: [
      {
        label: "Utility jacket",
        value: "utility jacket",
      },
      {
        label: "Layered coat",
        value: "layered coat",
      },
      {
        label: "Casual tunic",
        value: "casual tunic",
      },
      {
        label: "Armored vest",
        value: "armored vest",
      },
      {
        label: "Loose shirt",
        value: "loose shirt",
      },
      {
        label: "Hooded cloak",
        value: "hooded cloak",
      },
      {
        label: "Ceremonial robe",
        value: "ceremonial robe",
      },
      {
        label: "Trinity blazer",
        value: "trinity blazer",
      },
      {
        label: "Gehenna bomber jacket",
        value: "gehenna bomber jacket",
      },
      {
        label: "Millennium tech coat",
        value: "millennium tech coat",
      },
      {
        label: "Abydos desert parka",
        value: "abydos desert parka",
      },
      {
        label: "SRT tactical hoodie",
        value: "srt tactical hoodie",
      },
    ],
  },
  {
    title: "Bottom",
    key: "bottom",
    data: [
      {
        label: "Cargo trousers",
        value: "cargo trousers",
      },
      {
        label: "Fitted pants",
        value: "fitted pants",
      },
      {
        label: "Pleated skirt",
        value: "pleated skirt",
      },
      {
        label: "Battle-ready shorts",
        value: "battle shorts",
      },
      {
        label: "Flowing robes",
        value: "flowing robes",
      },
      {
        label: "Armored greaves",
        value: "armored greaves",
      },
      {
        label: "Layered wraps",
        value: "layered wraps",
      },
      {
        label: "Pleated academy skirt",
        value: "academy pleated skirt",
      },
      {
        label: "Combat tights",
        value: "combat tights",
      },
      {
        label: "Utility shorts",
        value: "utility shorts",
      },
      {
        label: "Desert leggings",
        value: "desert leggings",
      },
      {
        label: "Tech cargo pants",
        value: "tech cargo pants",
      },
    ],
  },
  {
    title: "Set",
    key: "set",
    data: [
      {
        label: "Combat uniform",
        value: "combat uniform",
      },
      {
        label: "Casual traveler",
        value: "casual traveler outfit",
      },
      {
        label: "Formal attire",
        value: "formal attire",
      },
      {
        label: "Stealth gear",
        value: "stealth gear",
      },
      {
        label: "Festival outfit",
        value: "festival outfit",
      },
      {
        label: "Royal regalia",
        value: "royal regalia",
      },
      {
        label: "Nomad attire",
        value: "nomad attire",
      },
      {
        label: "Justice Committee uniform",
        value: "justice committee uniform",
      },
      {
        label: "Problem Solver 68 gear",
        value: "problem solver gear",
      },
      {
        label: "Millennium lab attire",
        value: "millennium lab attire",
      },
      {
        label: "Abydos survival kit",
        value: "abydos survival kit",
      },
      {
        label: "SRT strike team",
        value: "srt strike team set",
      },
    ],
  },
  {
    title: "Material",
    key: "material",
    data: [
      {
        label: "Woven fabric",
        value: "woven fabric",
      },
      {
        label: "Polished leather",
        value: "polished leather",
      },
      {
        label: "Reinforced armor",
        value: "reinforced armor",
      },
      {
        label: "High-tech fiber",
        value: "high-tech fiber",
      },
      {
        label: "Organic weave",
        value: "organic weave",
      },
      {
        label: "Dragonhide",
        value: "dragonhide",
      },
      {
        label: "Mystic cloth",
        value: "mystic cloth",
      },
      {
        label: "School issue fabric",
        value: "school fabric",
      },
      {
        label: "Fireproof weave",
        value: "fireproof weave",
      },
      {
        label: "Kevlar padding",
        value: "kevlar padding",
      },
      {
        label: "Smart fiber",
        value: "smart fiber",
      },
      {
        label: "Desert mesh",
        value: "desert mesh",
      },
    ],
  },
  {
    title: "Accessory",
    key: "accessory",
    data: [
      {
        label: "Utility belt",
        value: "utility belt",
      },
      {
        label: "Gloves",
        value: "gloves",
      },
      {
        label: "Scarf",
        value: "scarf",
      },
      {
        label: "Headgear",
        value: "headgear",
      },
      {
        label: "Jewelry",
        value: "jewelry",
      },
      {
        label: "Bandolier",
        value: "bandolier",
      },
      {
        label: "Magic tome",
        value: "magic tome accessory",
      },
      {
        label: "Student council armband",
        value: "student council armband",
      },
      {
        label: "Academy ID lanyard",
        value: "academy id lanyard",
      },
      {
        label: "Sensei headset",
        value: "sensei headset",
      },
      {
        label: "Holosight visor",
        value: "holosight visor",
      },
      {
        label: "Club insignia charm",
        value: "club insignia charm",
      },
    ],
  },
  {
    title: "Academy",
    key: "academy",
    data: [
      {
        label: "Trinity",
        value: "trinity",
      },
      {
        label: "Gehenna",
        value: "gehenna",
      },
      {
        label: "Millennium",
        value: "millennium",
      },
      {
        label: "Abydos",
        value: "abydos",
      },
      {
        label: "SRT",
        value: "srt",
      },
      {
        label: "Arius",
        value: "arius",
      },
    ],
  },
];

const examples = [
  {
    image: "https://cdn.ocmaker.app/example/blue-archive-oc-generated-1.webp",
    prompt:
      "1girl, short black hair with blue highlights, bright blue eyes, cheerful smile, trinity academy uniform, white and blue school outfit, student council armband, school bag, youthful pose, single character, upper body, looking at viewer, anime style, school background",
  },
  {
    image: "https://cdn.ocmaker.app/example/blue-archive-oc-generated-2.webp",
    prompt:
      "1girl, long pink hair, purple eyes, gentle expression, gehenna academy uniform, black and red school outfit, tactical gear accessories, rifle weapon, confident stance, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/blue-archive-oc-generated-3.webp",
    prompt:
      "1girl, twin tails blonde hair, green eyes, energetic smile, millennium academy uniform, high-tech school outfit, tablet computer, futuristic accessories, study pose, single character, upper body, looking at viewer, anime style, classroom background",
  },
  {
    image: "https://cdn.ocmaker.app/example/blue-archive-oc-generated-4.webp",
    prompt:
      "1girl, white hair with cat ears, golden eyes, playful wink, abydos academy uniform, sandy colored school outfit, desert survival gear, determined expression, single character, upper body, looking at viewer, anime style, simple background",
  },
];

export default {
  meta: {
    title: "Blue Archive OC Maker",
    description:
      "Generate your own Blue Archive character OC with AI. Create academy students with unique school uniforms, club activities, and youthful adventures in Kivotos.",
  },
  series: "Blue Archive",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Blue Archive OC Maker",
      description:
        "Generate your own Blue Archive character OC with AI. Create academy students with unique school uniforms, club activities, and youthful adventures in Kivotos.",
    },
    step: {
      title: "How to Make Blue Archive OC",
      description:
        "Creating your Blue Archive student is like enrolling in a new academy. Follow these steps to design your perfect school character.",
      steps: [
        {
          title: "Choose Your Academy and Club",
          description:
            "Select your character's academy (Trinity, Gehenna, Millennium, Abydos, etc.) and club affiliation. Each academy has distinct uniform styles, colors, and cultural characteristics that define your student's appearance.",
        },
        {
          title: "Design Student Profile",
          description:
            "Describe your character's appearance, personality, and school life details. Include information about their hobbies, academic specialties, weapon preferences, and role within their club or student council.",
        },
        {
          title: "Generate Your Student",
          description:
            "Click 'Generate Character' to create your Blue Archive OC. Select from multiple AI-generated designs that capture the game's distinctive school life aesthetic and youthful charm.",
        },
      ],
    },
    examples: {
      title: "Blue Archive Student Examples",
      description:
        "Explore amazing academy students created with text prompts using the Blue Archive OC Maker.",
      examples,
    },
    features: {
      title: "What is Blue Archive OC Maker?",
      description:
        "Blue Archive OC Maker is designed specifically for the academic world of Kivotos. Create authentic students with academy affiliations, school uniforms, and youthful adventure themes.",
      features: [
        {
          label: "Authentic Academy Aesthetics",
          description:
            "Generate characters that perfectly capture Blue Archive's school life atmosphere, from distinctive academy uniforms to youthful expressions and academic accessories.",
        },
        {
          label: "Academy System Integration",
          description:
            "Our AI understands all major academies and their unique characteristics, ensuring your student fits their chosen school's culture, uniform style, and thematic elements.",
        },
        {
          label: "Instant Student Creation",
          description:
            "Create charming Blue Archive students in seconds, perfect for school scenarios, club activities, or expanding your Kivotos academy roster.",
        },
        {
          label: "High-Quality School Artwork",
          description:
            "Powered by AI trained on Blue Archive's distinctive art style, delivering character designs that match the game's youthful aesthetic and school life atmosphere.",
        },
        {
          label: "Multiple Academy Options",
          description:
            "Generate several character interpretations per prompt, exploring different academies, clubs, and student roles to find your perfect Blue Archive OC design.",
        },
        {
          label: "Kivotos World Integration",
          description:
            "Create characters that naturally fit into Blue Archive's rich academic world, with authentic school cultures, club activities, and student life themes.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is Blue Archive OC Maker and how does it work?",
          answer:
            "Blue Archive OC Maker is an AI tool specialized for creating original Blue Archive students. Describe your character's academy, appearance, and school activities, and our AI generates authentic Blue Archive-style artwork.",
        },
        {
          question:
            "How can I create better characters with Blue Archive OC Maker?",
          answer:
            "Include specific Blue Archive elements like academy affiliations, uniform details, club memberships, weapon preferences, and personality traits. The more school life details you include, the more authentic your student will be.",
        },
        {
          question: "Is Blue Archive OC Maker free to use?",
          answer:
            "Yes, Blue Archive OC Maker offers free character generation with basic features. Premium plans provide faster generation, more academy options, and advanced customization tools.",
        },
        {
          question: "What makes Blue Archive OC Maker's results so authentic?",
          answer:
            "Our AI is specifically trained on Blue Archive's art style and school setting, understanding academy cultures, uniform designs, and the game's distinctive youthful character aesthetics.",
        },
        {
          question:
            "Can I use characters created with Blue Archive OC Maker commercially?",
          answer:
            "Yes, all original characters you create are yours to use for personal and commercial projects. We don't claim ownership of your student designs or Blue Archive OCs.",
        },
        {
          question: "Do I need an account to use Blue Archive OC Maker?",
          answer:
            "No account required for basic use. Creating an account allows you to save students, access generation history, and unlock premium Blue Archive-themed features.",
        },
        {
          question: "Can I create students from different academies and clubs?",
          answer:
            "Absolutely! Create students from any academy (Trinity, Gehenna, Millennium, Abydos, etc.) with various club affiliations and roles. Mix and match academic specialties and activities freely.",
        },
        {
          question: "Are more school-themed game OC makers being developed?",
          answer:
            "Yes! We're expanding to include other school life games and academic-themed series. Follow our updates for new themed OC makers inspired by educational and youthful settings.",
        },
      ],
    },
    cta: {
      title: "Enroll in Your Academy Adventure",
      description:
        "Design your ultimate Blue Archive student — no artistic skills required. Just imagine, describe, and explore the vibrant school life of Kivotos.",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
