const basePrompt = `
  WORLD CONTEXT:
  Universe: Sailor Moon
  Setting: Tokyo and Moon Kingdom legacy, Sailor Guardians, magical transformations, reincarnated royals, cosmic villains
  Key Factions: Sailor Senshi, Outer Guardians, Shitennou, Dark Kingdom, Black Moon Clan, Dead Moon Circus, Starlights, Guardian Cats

  OUTPUT FORMAT:
  Name, Guardian Title & Planet/Domain, Transformation Items & Attacks, Personality, Mission/Protective Duty, Past Life Backstory

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Sailor Starflower",
    description: "A guardian of cosmic gardens nurturing life between planets.",
    prompt: `What is your character's name?
Amara Hanazono

What is their Guardian title and planet or domain?
Sailor Starflower of the Asteroid Belt sanctuaries

What transformation items and attacks do they wield?
Starflower Brooch and Blooming Scepter unleashing Petal Nebula Storm

How would you describe their personality?
Kind, optimistic, steadfast

What mission or protective duty guides them?
To heal ruined celestial gardens and defend new life

Share their past life backstory.
In the Silver Millennium she tended the Moon Kingdom's outer gardens and now remembers fragments whenever meteors bloom.`,
  },
  {
    title: "Sailor Tempest",
    description: "A storm guardian balancing tempests across Neptune's moons.",
    prompt: `What is your character's name?
Cassia Mare

What is their Guardian title and planet or domain?
Sailor Tempest of Triton's oceans

What transformation items and attacks do they wield?
Tempest Mirror and Gale Harp summoning Siren Cyclone

How would you describe their personality?
Calm, introspective, fiercely protective

What mission or protective duty guides them?
To keep spacefaring sailors safe from cosmic storms

Share their past life backstory.
She once guided ancient voyagers through storms alongside Sailor Neptune; reincarnated, she senses tides before they swell.`,
  },
  {
    title: "Sailor Aurora",
    description: "A guardian painting auroras to shield dreams from darkness.",
    prompt: `What is your character's name?
Lina Skye

What is their Guardian title and planet or domain?
Sailor Aurora of Earth's polar lights

What transformation items and attacks do they wield?
Aurora Prism Pen and Radiant Crown unleashing Borealis Rhapsody

How would you describe their personality?
Artistic, empathetic, playful

What mission or protective duty guides them?
To guard sleeping hearts from Nightmare forces

Share their past life backstory.
Her past life tended to dreamscapes alongside Queen Serenity; she now draws aurora murals that ward off nightmares.`,
  },
  {
    title: "Sailor Solaris",
    description: "A solar guardian channeling sunrise energy into brilliant shields.",
    prompt: `What is your character's name?
Helia Dawn

What is their Guardian title and planet or domain?
Sailor Solaris of the Dawn Court

What transformation items and attacks do they wield?
Solaris Locket and Sunflare Blade with attack Daybreak Crescendo

How would you describe their personality?
Confident, radiant, a natural leader

What mission or protective duty guides them?
To protect the legacy of Princess Serenity and inspire future guardians

Share their past life backstory.
Served as a sentinel at Queen Serenity's palace; reincarnated, she rallies new guardians at Crystal Tokyo.`,
  },
  {
    title: "Sailor Nocturne",
    description: "A twilight guardian harmonizing darkness and starlight.",
    prompt: `What is your character's name?
Noemi Vale

What is their Guardian title and planet or domain?
Sailor Nocturne of the Shadow Muse

What transformation items and attacks do they wield?
Nocturne Pendant and Lullaby Bow summoning Eclipse Sonata

How would you describe their personality?
Mysterious, poetic, compassionate

What mission or protective duty guides them?
To guide lost souls through twilight and shield them from chaos

Share their past life backstory.
Served as Luna's confidante during the fall of the Moon Kingdom; now runs a music lounge that awakens starseeds.`,
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
    title: "Archetype",
    key: "archetype",
    unique: true,
    data: [
      {
        label: "Hero",
        value: "heroic leader",
      },
      {
        label: "Antihero",
        value: "antihero vigilante",
      },
      {
        label: "Mentor",
        value: "mysterious mentor",
      },
      {
        label: "Strategist",
        value: "brilliant strategist",
      },
      {
        label: "Rival",
        value: "rebellious rival",
      },
      {
        label: "Guardian",
        value: "stoic guardian",
      },
    ],
  },
  {
    title: "Power Theme",
    key: "power_theme",
    data: [
      {
        label: "Elemental magic",
        value: "elemental magic",
      },
      {
        label: "Advanced technology",
        value: "advanced technology",
      },
      {
        label: "Martial arts",
        value: "martial arts",
      },
      {
        label: "Spiritual powers",
        value: "spiritual powers",
      },
      {
        label: "Summoner",
        value: "summoner",
      },
      {
        label: "Tactical genius",
        value: "tactical genius",
      },
    ],
  },
  {
    title: "Outfit Style",
    key: "outfit",
    data: [
      {
        label: "Battle armor",
        value: "battle armor",
      },
      {
        label: "Sleek uniform",
        value: "sleek uniform",
      },
      {
        label: "Casual streetwear",
        value: "casual streetwear",
      },
      {
        label: "Formal attire",
        value: "formal attire",
      },
      {
        label: "Mystic robes",
        value: "mystic robes",
      },
      {
        label: "Futuristic suit",
        value: "futuristic suit",
      },
    ],
  },
  {
    title: "Personality",
    key: "personality",
    data: [
      {
        label: "Optimistic",
        value: "optimistic",
      },
      {
        label: "Stoic",
        value: "stoic",
      },
      {
        label: "Rebellious",
        value: "rebellious",
      },
      {
        label: "Compassionate",
        value: "compassionate",
      },
      {
        label: "Calculating",
        value: "calculating",
      },
      {
        label: "Chaotic good",
        value: "chaotic good",
      },
    ],
  },
  {
    title: "Expression",
    key: "expression",
    unique: true,
    data: [
      {
        label: "Smiling confidence",
        value: "smiling confidence",
      },
      {
        label: "Determined gaze",
        value: "determined gaze",
      },
      {
        label: "Brooding intensity",
        value: "brooding intensity",
      },
      {
        label: "Playful grin",
        value: "playful grin",
      },
      {
        label: "Calm focus",
        value: "calm focus",
      },
      {
        label: "Mysterious smirk",
        value: "mysterious smirk",
      },
    ],
  },
];

const examples = [
  {
    image: "https://cdn.ocmaker.app/example/sailor-moon-oc-generated-1.webp",
    prompt:
      "1girl, long blonde hair with twin tails, blue eyes, determined expression, sailor guardian uniform, blue and white sailor outfit, tiara with gem, transformation brooch, action pose, single character, upper body, looking at viewer, anime style, starry background",
  },
  {
    image: "https://cdn.ocmaker.app/example/sailor-moon-oc-generated-2.webp",
    prompt:
      "1girl, short purple hair, violet eyes, mysterious smile, dark kingdom uniform, black and purple villain outfit, dark crystal accessories, elegant pose, single character, upper body, looking at viewer, anime style, dark palace background",
  },
  {
    image: "https://cdn.ocmaker.app/example/sailor-moon-oc-generated-3.webp",
    prompt:
      "1girl, medium pink hair, green eyes, gentle expression, princess dress, silver millennium gown, moon kingdom jewelry, crystal staff, graceful pose, single character, upper body, looking at viewer, anime style, moon palace background",
  },
  {
    image: "https://cdn.ocmaker.app/example/sailor-moon-oc-generated-4.webp",
    prompt:
      "1girl, wavy red hair, amber eyes, confident wink, outer senshi uniform, unique sailor outfit design, planet symbols, transformation wand, heroic stance, single character, upper body, looking at viewer, anime style, cosmic background",
  },
];

export default {
  meta: {
    title: "Sailor Moon OC Maker",
    description:
      "Generate your own Sailor Moon character OC with AI. Create magical guardians, princesses, and villains in the iconic magical girl universe style.",
  },
  series: "Sailor Moon",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Sailor Moon OC Maker",
      description:
        "Generate your own Sailor Moon character OC with AI. Create magical guardians, princesses, and villains in the iconic magical girl universe style.",
    },
    step: {
      title: "How to Make Sailor Moon OC",
      description:
        "Transform into your own Sailor Guardian and protect the world with love and justice. Follow these steps to design your magical warrior.",
      steps: [
        {
          title: "Choose Your Guardian Type",
          description:
            "Decide your character's role: Sailor Guardian (inner or outer senshi), Moon Kingdom princess, Dark Kingdom villain, or civilian ally. Each role has distinct transformation sequences, attack styles, and costume designs.",
        },
        {
          title: "Design Appearance and Powers",
          description:
            "Describe your character's appearance, sailor uniform colors, planetary affiliation, and magical abilities. Include details like transformation items, attack names, and guardian symbols to make your character authentically magical.",
        },
        {
          title: "Generate Your Sailor Guardian",
          description:
            "Click 'Generate Character' to bring your Sailor Moon OC to life. Choose from multiple AI-generated designs that capture the classic magical girl aesthetic and sparkly transformation magic.",
        },
      ],
    },
    examples: {
      title: "Sailor Guardian Examples",
      description:
        "Discover amazing magical warriors created with text prompts using the Sailor Moon OC Maker.",
      examples,
    },
    features: {
      title: "What is Sailor Moon OC Maker?",
      description:
        "Sailor Moon OC Maker is designed specifically for the magical girl universe. Create authentic characters with transformation powers, celestial themes, and the power of love and friendship.",
      features: [
        {
          label: "Authentic Magical Girl Style",
          description:
            "Generate characters that perfectly match Sailor Moon's iconic shoujo aesthetic, from sparkly transformations to elegant sailor uniforms and celestial accessories.",
        },
        {
          label: "Guardian System Integration",
          description:
            "Our AI understands the Sailor Guardian hierarchy, planetary associations, and transformation mechanics, ensuring your character fits seamlessly into the magical universe.",
        },
        {
          label: "Instant Magical Creation",
          description:
            "Create stunning Sailor Moon characters in seconds, perfect for magical adventures, protecting Earth, or expanding the Moon Kingdom's guardian roster.",
        },
        {
          label: "High-Quality Shoujo Artwork",
          description:
            "Powered by AI trained on magical girl aesthetics, delivering character art that matches Sailor Moon's distinctive sparkly style and romantic designs.",
        },
        {
          label: "Multiple Transformation Options",
          description:
            "Generate several character interpretations per prompt, exploring different guardian forms, attack poses, and magical transformations to find your perfect design.",
        },
        {
          label: "Moon Kingdom Integration",
          description:
            "Create characters that naturally fit into Sailor Moon's rich mythology, with authentic Silver Millennium influences, planetary powers, and magical themes.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      faqs: [
        {
          question: "What is Sailor Moon OC Maker and how does it work?",
          answer:
            "Sailor Moon OC Maker is an AI tool specialized for creating original Sailor Moon characters. Describe your guardian's appearance, powers, and planetary affiliation, and our AI generates authentic magical girl artwork.",
        },
        {
          question:
            "How can I create better characters with Sailor Moon OC Maker?",
          answer:
            "Include specific Sailor Moon elements like planetary guardians, transformation items, attack names, Silver Millennium connections, or Dark Kingdom affiliations. The more magical details you include, the better the results.",
        },
        {
          question: "Is Sailor Moon OC Maker free to use?",
          answer:
            "Yes, Sailor Moon OC Maker offers free character generation with core features. Premium plans provide faster generation, more transformation options, and advanced magical customization tools.",
        },
        {
          question: "What makes Sailor Moon OC Maker's results so authentic?",
          answer:
            "Our AI is specifically trained on Sailor Moon's art style and magical girl conventions, understanding transformation sequences, sailor uniform designs, and the series' distinctive shoujo aesthetic.",
        },
        {
          question:
            "Can I use characters created with Sailor Moon OC Maker commercially?",
          answer:
            "Yes, all original characters you create are yours to use for personal and commercial projects. We don't claim ownership of your guardian designs or Sailor Moon OCs.",
        },
        {
          question: "Do I need an account to use Sailor Moon OC Maker?",
          answer:
            "No account required for basic use. Creating an account allows you to save guardians, access generation history, and unlock premium magical girl features.",
        },
        {
          question: "Can I create different types of Sailor Guardians?",
          answer:
            "Absolutely! Create inner senshi, outer senshi, Sailor Starlights, asteroid senshi, or entirely new planetary guardians. You can also design Moon Kingdom royalty, Dark Kingdom villains, or civilian characters.",
        },
        {
          question: "Will you add more magical girl anime OC Makers?",
          answer:
            "Yes! We're expanding to include other beloved magical girl series and shoujo anime. Follow our updates for new themed OC Makers inspired by transformation sequences and friendship power.",
        },
      ],
    },
    cta: {
      title: "Transform Into Your Guardian",
      description:
        "Design your ultimate Sailor Guardian — no artistic skills required. Just imagine, describe, and fight for love and justice in the name of the moon.",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
