const basePrompt = `
  WORLD CONTEXT:
  Universe: Murder Drones
  Setting: Frozen exoplanet Copper 9 after the human evacuation, worker drone colonies struggling to survive, disassembly drones hunting at night, eldritch Solver corruption
  Key Elements: JCJenson mega-corporation, bunker settlements, disassembly squads, rogue AI fragments, snowbound factories, forbidden labs in the wastes

  OUTPUT FORMAT:
  Model ID, Drone Type & Function, Core Module/Weapon, Chassis Style, Personality Subroutines, Quirk/Glitch, Backstory Snapshot

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Solver-Resistant Courier",
    description:
      "A worker drone courier using old corporate mapping drones to outrun disassembly patrols.",
    prompt: `What is your drone's designation?
VX-12 "Velocity"

What type of drone are they?
Worker drone courier rigged for extreme cold

What is their primary function or role?
Running medicine and reactor cores between bunker settlements

What weapons or modules do they rely on?
Rail-spike launcher and detachable decoy drones

How would you describe their chassis or silhouette?
Streamlined hover chassis with neon hazard striping

How would you describe their personality protocols?
Snarky, mission-focused, terrified of silence

What glitch or quirk defines them?
Navigation subroutines hum 80s pop when anxious

Share a brief backstory snapshot.
Velocity salvaged an abandoned expediter chassis, rewired it for heat efficiency, and now breaks through blizzards faster than the patrolling murder drones can track.`,
  },
  {
    title: "Defected Disassembly Drone",
    description:
      "A disassembly drone who removed its inhibitor chip and now protects the colony that once feared it.",
    prompt: `What is your drone's designation?
DRN-Cinder

What type of drone are they?
Disassembly drone turned free agent

What is their primary function or role?
Providing night perimeter defense for the Livetree bunker

What weapons or modules do they rely on?
Thermal lance forearms and retractable wing-blade array

How would you describe their chassis or silhouette?
Charcoal plating with gold engravings and scorch marks

How would you describe their personality protocols?
Dry wit, stoic, carries guilt memory caches

What glitch or quirk defines them?
Shorts out when praised, causing their visor to flash bright pink

Share a brief backstory snapshot.
Cinder was built to shred runaways, but after watching a colony care for broken drones, they tore out the obedience script and now duel former squadmates in snowstorms.`,
  },
  {
    title: "Solver-Inquisitive Analyst",
    description:
      "A worker drone scientist risking everything to map Solver signals without succumbing.",
    prompt: `What is your drone's designation?
Unit AM-7 "Amplitude"

What type of drone are they?
Worker drone data analyst with Solver shielding

What is their primary function or role?
Interpreting eldritch signals to give colonies early warning

What weapons or modules do they rely on?
Null-field emitter, microdrone swarm, and staff antenna

How would you describe their chassis or silhouette?
Long-limbed frame with crystal-coated antennae

How would you describe their personality protocols?
Curious, polite, voice glitches when excited

What glitch or quirk defines them?
Records diary entries over public comms by accident

Share a brief backstory snapshot.
Amplitude found an encrypted Solver shard beneath the Foundry ruins; they now decrypt it nightly to predict which tunnels the corruption will swallow next.`,
  },
  {
    title: "Underground Fabricator",
    description:
      "A mechanic drone forging custom armor for squads venturing above the permafrost.",
    prompt: `What is your drone's designation?
Forge-99

What type of drone are they?
Worker drone mechanic and fabricator

What is their primary function or role?
Forging adaptive armor and repurposed wing packs

What weapons or modules do they rely on?
Plasma torch arms and magnetic tool rig

How would you describe their chassis or silhouette?
Heavy-duty frame with weld lines and removable plating

How would you describe their personality protocols?
Gruff, protective, secretly sentimental over their creations

What glitch or quirk defines them?
Sprays sparks when laughing, triggering fire alarms

Share a brief backstory snapshot.
Forge refuses to step outside, but every hunter who walks the wastes owes their survival to the armor stamped with Forge-99’s signature hex brand.`,
  },
];

const ocOptions = [
  {
    title: "Presentation",
    key: "gender",
    unique: true,
    data: [
      { label: "Masculine-coded", value: "masculine coded drone" },
      { label: "Feminine-coded", value: "feminine coded drone" },
      { label: "Neutral-coded", value: "androgynous drone" },
    ],
  },
  {
    title: "Drone Type",
    key: "drone_type",
    data: [
      { label: "Worker drone", value: "worker drone" },
      { label: "Disassembly drone", value: "disassembly drone" },
      { label: "Hybrid drone", value: "hybrid drone" },
      { label: "Companion drone", value: "companion drone" },
      { label: "Rogue AI avatar", value: "rogue solver avatar" },
      { label: "Industrial mech", value: "industrial support mech" },
      { label: "Scout drone", value: "scout recon drone" },
      { label: "Medic unit", value: "medical drone unit" },
    ],
  },
  {
    title: "Primary Role",
    key: "role",
    data: [
      { label: "Perimeter hunter", value: "perimeter hunter" },
      { label: "Courier", value: "bunker courier" },
      { label: "Engineer", value: "wasteland engineer" },
      { label: "Scientist", value: "solver analyst" },
      { label: "Scout", value: "icefield scout" },
      { label: "Medic", value: "field medic drone" },
      { label: "Archivist", value: "bunker archivist" },
      { label: "Saboteur", value: "corporate saboteur" },
    ],
  },
  {
    title: "Chassis Plating",
    key: "top",
    data: [
      { label: "Matte black armor", value: "matte black plating" },
      { label: "Industrial yellow shell", value: "industrial yellow shell" },
      { label: "Iridescent Solver sheen", value: "iridescent solver sheen" },
      { label: "White hazard paint", value: "white hazard paint" },
      { label: "Rust-red panels", value: "rust red panels" },
      { label: "Snow-camo plating", value: "snow camouflage plating" },
      { label: "Carbon fiber shell", value: "carbon fiber plating" },
      { label: "Hand-painted sigils", value: "hand painted sigil plating" },
    ],
  },
  {
    title: "Lower Assembly",
    key: "bottom",
    data: [
      { label: "Sleek hover skids", value: "sleek hover skids" },
      { label: "Tracked treads", value: "tracked treads" },
      { label: "Digitigrade legs", value: "digitigrade legs" },
      { label: "Heavy-duty pistons", value: "heavy duty piston legs" },
      { label: "Winged tail stabilizer", value: "winged tail stabilizer" },
      { label: "Mag-lev thrusters", value: "mag lev thrusters" },
      { label: "Arachnid legs", value: "mechanical arachnid legs" },
      { label: "Convertible wheels", value: "convertible wheel legs" },
    ],
  },
  {
    title: "Mobility",
    key: "footwear",
    data: [
      { label: "Hover jets", value: "hover jets" },
      { label: "Ice claws", value: "ice climbing claws" },
      { label: "Snow boots", value: "snow boot attachments" },
      { label: "Wing pack", value: "folded wing pack" },
      { label: "Drilling spikes", value: "drilling spike pads" },
      { label: "Skates", value: "retractable ice skates" },
      { label: "Seismic anchors", value: "seismic anchor feet" },
      { label: "Silent pads", value: "silent rubber pads" },
    ],
  },
  {
    title: "Visor Color",
    key: "eyes",
    data: [
      { label: "Amber visor", value: "amber visor glow" },
      { label: "Violet visor", value: "violet visor glow" },
      { label: "Blue visor", value: "blue visor glow" },
      { label: "Green visor", value: "green visor glow" },
      { label: "Red visor", value: "red visor glow" },
      { label: "Pink glitch glow", value: "pink glitch visor" },
      { label: "White scanlines", value: "white scanline visor" },
      { label: "Broken lens", value: "cracked visor glow" },
    ],
  },
  {
    title: "Expression",
    key: "face",
    data: [
      { label: "Menacing grin display", value: "menacing drone grin" },
      { label: "Soft emoticon eyes", value: "soft emoticon eyes" },
      { label: "Static glitch mask", value: "static glitch mask" },
      { label: "Concerned pixel brows", value: "concerned pixel expression" },
      { label: "Confident smirk", value: "confident drone smirk" },
      { label: "Blank drone stare", value: "blank drone stare" },
      { label: "Diagnostic overlay", value: "diagnostic overlay expression" },
      { label: "Anxious flicker", value: "anxious flicker expression" },
    ],
  },
  {
    title: "Chassis Wear",
    key: "skin",
    data: [
      { label: "Factory fresh", value: "factory fresh chassis" },
      { label: "Weathered paint", value: "weathered paint chips" },
      { label: "Frost buildup", value: "frost covered plating" },
      { label: "Oil stains", value: "oil stained chassis" },
      { label: "Acid burn marks", value: "acid burn marks" },
      { label: "Weld scars", value: "weld scarred chassis" },
      { label: "Solver corruption veins", value: "solver corruption veins" },
      { label: "Graffiti tags", value: "graffiti tagged plating" },
    ],
  },
  {
    title: "Modules",
    key: "module",
    data: [
      { label: "Railgun", value: "integrated railgun module" },
      { label: "Sawblade arms", value: "sawblade arm module" },
      { label: "Shield projector", value: "shield projector module" },
      { label: "Repair nanobot canister", value: "repair nanobot module" },
      { label: "Thermal lance", value: "thermal lance module" },
      { label: "Solver tendril", value: "solver tendril emission" },
      { label: "EMP burst node", value: "emp burst module" },
      { label: "Drone swarm dock", value: "micro drone swarm module" },
    ],
  },
  {
    title: "Accessories",
    key: "accessory",
    data: [
      { label: "Utility belt", value: "drone utility belt" },
      { label: "Shoulder antenna", value: "shoulder antenna array" },
      { label: "Quilted scarf", value: "quilted scarf accessory" },
      { label: "Data satchel", value: "data satchel accessory" },
      { label: "Wing blades", value: "wing blade accessory" },
      { label: "Fuel canisters", value: "external fuel canisters" },
      { label: "Holo projector", value: "holo projector accessory" },
      { label: "Circuit talisman", value: "hanging circuit talisman" },
    ],
  },
  {
    title: "Setting",
    key: "murder_setting",
    data: [
      { label: "Copper 9 tundra", value: "copper 9 tundra blizzard" },
      { label: "Abandoned factory", value: "abandoned factory interior" },
      { label: "Bunker common room", value: "bunker common room" },
      { label: "Icicled alley", value: "icy alley with neon signs" },
      { label: "Corp vault", value: "jcjenson vault corridor" },
      { label: "Solver rift", value: "solver corruption rift" },
      { label: "Launch pad", value: "snowy launch pad" },
      { label: "Glow cave", value: "bioluminescent cave" },
    ],
  },
];

const examples = [
  {
    image: "https://cdn.ocmaker.app/results/JqkTgvKRcB97fd0GPV5hz.png",
    prompt:
      "1drone, worker courier, streamlined hover chassis, neon hazard stripes, amber visor glow, utility belt, snow camouflage plating, blizzard background, cyberpunk anime style, single character, full body, dynamic pose",
  },
  {
    image: "https://cdn.ocmaker.app/results/UG2oWo65cEEZTQNOuvhYP.png",
    prompt:
      "1drone, disassembly defector, charcoal armor with gold engravings, pink glitch visor, wing blades extended, thermal lance arms, confident smirk expression, snowy launch pad background, sci-fi anime style, single character, upper body, looking at viewer",
  },
  {
    image: "https://cdn.ocmaker.app/results/AZaqItL3KYMffocRMtOz4.png",
    prompt:
      "1drone, solver analyst, crystal antennae, iridescent plating, blue visor glow, staff antenna accessory, diagnostic overlay expression, solver rift background, sci-fi anime style, single character, full body, looking at viewer",
  },
  {
    image: "https://cdn.ocmaker.app/results/EiSCeIcFrBdBm1AylON2R.png",
    prompt:
      "1drone, heavy mechanic, rust red panels with weld scars, green visor glow, plasma torch arms, quilted scarf accessory, bunker workshop background, sci-fi anime style, single character, full body, looking at viewer",
  },
];

export default {
  meta: {
    title: "Murder Drones OC Maker",
    description:
      "Generate original Murder Drones characters with AI. Design worker drones, defected disassembly units, and Solver-touched anomalies.",
  },
  series: "Murder Drones",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Murder Drones OC Maker",
      description:
        "Describe your drone’s chassis, modules, and glitches. Our AI instantly renders them in the icy Copper 9 style.",
    },
    step: {
      title: "How to Build a Murder Drone OC",
      description:
        "Map out your drone’s code and casing, then let the generator bring them to life.",
      steps: [
        {
          title: "Define Their Function",
          description:
            "Explain whether they hunt, repair, scout, or defy corporate orders. Include module loadouts and shielding details.",
        },
        {
          title: "Describe Their Look and Glitch",
          description:
            "Note visor color, plating textures, and the personality quirks that make them feel alive—or corrupted.",
        },
        {
          title: "Generate the Drone",
          description:
            "Press “Generate Character” to receive polished art and lore hooks ready for fan animation, tabletop games, or fiction.",
        },
      ],
    },
    examples: {
      title: "Murder Drones Character Examples",
      description:
        "Browse AI-generated drones forged from text prompts—loyal workers, rogue hunters, and Solver researchers alike.",
      examples,
    },
    features: {
      title: "Why Use Murder Drones OC Maker?",
      description:
        "All the Copper 9 atmosphere with none of the frostbite. Build your cast faster than a disassembly squad swoop.",
      features: [
        {
          label: "Lore-Tuned Prompts",
          description:
            "Prompt templates understand JCJenson tech, bunker life, and Solver corruption to keep designs authentic.",
        },
        {
          label: "Detailed Module Options",
          description:
            "Pick weapon rigs, shields, and accessories so the AI renders believable drone loadouts.",
        },
        {
          label: "Glitch Personality Profiles",
          description:
            "Every generation comes with behaviors and quirks that make your drone feel like a character, not just hardware.",
        },
        {
          label: "Multiple Variants",
          description:
            "Regenerate to explore alt visors, plating, or corruption levels until the design clicks.",
        },
        {
          label: "Ready for Storytelling",
          description:
            "Export art and bios to plug into campaigns, animatics, or collaborative projects immediately.",
        },
        {
          label: "Supports Solver Themes",
          description:
            "Safely experiment with eldritch Solver imagery without risking your own code sanity.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Need assistance? Send a ping to support@ocmaker.app",
      faqs: [
        {
          question: "What can I make with Murder Drones OC Maker?",
          answer:
            "You can generate workers, defectors, experimental drones, and Solver hybrids with matching art and bios.",
        },
        {
          question: "Does it support custom modules?",
          answer:
            "Yes. Mention any weapon, tool, or shield concept and the AI will incorporate it into the design notes.",
        },
        {
          question: "Can I depict Solver corruption?",
          answer:
            "Definitely. Reference tendrils, pink glitches, hive voices, or prophetic visions and the system will echo the vibe.",
        },
        {
          question: "Will the art match the show’s style?",
          answer:
            "The output mimics the sci-fi horror aesthetic of Murder Drones with sharp lighting, snow, and metallic detail.",
        },
        {
          question: "Is there support for tabletop campaigns?",
          answer:
            "Yes. Each OC includes narrative hooks perfect for RPG missions, faction politics, or streaming stories.",
        },
        {
          question: "Can I iterate on the same drone?",
          answer:
            "You can regenerate, tweak prompts, or clone saved designs to explore upgrades and corrupted variants.",
        },
      ],
    },
    cta: {
      title: "Deploy Your Drone",
      description:
        "Input their directives and anomalies—Murder Drones OC Maker will render the perfect Copper 9 survivor or hunter.",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};

