const basePrompt = `
  WORLD CONTEXT:
  Universe: Total Drama Island
  Setting: Camp Wawanakwa reality show with brutal challenges, elimination ceremonies, confessionals, and over-the-top drama
  Key Elements: Host Chris and Chef Hatchet, Screaming Gophers, Killer Bass, surprise twists, alliances, sabotage, reality TV tropes

  OUTPUT FORMAT:
  Name, Team & Archetype, Signature Talent, Wardrobe & Props, Personality, Strategy, Backstory Snapshot

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "Hyper-Competitive Lifeguard",
    description:
      "A waterfront pro determined to prove reality TV elites can be kind and still win.",
    prompt: `What is your character's name?
Skylar Finn

Which team or season faction are they on?
Screaming Gophers

What is their reality show archetype?
Athletic guardian with a soft spot for underdogs

What is their signature talent or skill?
Swimming endurance and improvised lifesaving knots

What outfit or props define their look?
Camp tank top layered over a lifeguard rashguard and a whistle lanyard

How would you describe their personality?
Competitive, upbeat, allergic to bullies

What is their strategy on the show?
Win challenges for safety while quietly building a loyal alliance trio

Share a brief backstory snapshot.
Skylar was voted “Most Dependable” at Lake Ontario Camp but never gold-medaled; their Total Drama run is about finally stepping out from everyone else’s emergencies.`,
  },
  {
    title: "Viral Prank Streamer",
    description:
      "A prank-channel star who wants the million but also the most watchable confessionals.",
    prompt: `What is your character's name?
Dash Baxter

Which team or season faction are they on?
Killer Bass

What is their reality show archetype?
Class clown prankster with a secret strategic mind

What is their signature talent or skill?
Rigging harmless booby traps and editing viral recaps

What outfit or props define their look?
Oversized hoodie, neon beanie, action camera strapped to their shoulder

How would you describe their personality?
Chaotic good, chronically online, thrives on reactions

What is their strategy on the show?
Stay mid-pack, never threaten the alphas, and weaponize confessionals

Share a brief backstory snapshot.
Dash turned detention sketches into a prank channel with two million subs—the show is their next big collab, provided Chris signs the release forms.`,
  },
  {
    title: "Preppy Debate Captain",
    description:
      "A debate star who treats every challenge like a courtroom showdown.",
    prompt: `What is your character's name?
Renee Whitfield

Which team or season faction are they on?
Heroic Hamsters

What is their reality show archetype?
Academic overachiever with hidden competitive grit

What is their signature talent or skill?
Rapid-fire persuasion and ironclad negotiation tactics

What outfit or props define their look?
Layered polo over a camp tee, pleated skirt, color-coded cue cards

How would you describe their personality?
Poised, calculated, surprisingly snarky

What is their strategy on the show?
Broker alliances like contracts and keep confessionals spotless

Share a brief backstory snapshot.
Renee has a trophy wall for debate titles but zero outdoor badges, so Total Drama is her chance to prove brains can beat mud-trenching athletes.`,
  },
  {
    title: "Mellow Nature Warden",
    description:
      "A wilderness counselor who bonds with everyone from squirrels to Chef’s pet gator.",
    prompt: `What is your character's name?
Pine Aubrey

Which team or season faction are they on?
Villainous Vultures

What is their reality show archetype?
Zen outdoorsy artist with unexpected grit

What is their signature talent or skill?
Tracking animal paths and crafting rope bridges from vines

What outfit or props define their look?
Camp hoodie splattered with paint, hemp bracelets, travel sketchbook

How would you describe their personality?
Laid-back, reflective, relentlessly kind

What is their strategy on the show?
Float under the radar, heal team morale, and surprise everyone in finale challenges

Share a brief backstory snapshot.
Pine organizes eco-art retreats and only auditioned to fund a wildlife sanctuary; the real twist is how competitive they get when marshmallows are on the line.`,
  },
];

const ocOptions = [
  {
    title: "Gender",
    key: "gender",
    unique: true,
    data: [
      { label: "Boy", value: "1boy" },
      { label: "Girl", value: "1girl" },
      { label: "Non-binary", value: "1person" },
    ],
  },
  {
    title: "Archetype",
    key: "archetype",
    data: [
      { label: "Athlete", value: "athletic camper" },
      { label: "Goth musician", value: "goth musician camper" },
      { label: "Prankster", value: "prankster camper" },
      { label: "Brainiac", value: "brainy strategist camper" },
      { label: "Social butterfly", value: "social butterfly camper" },
      { label: "Outdoors expert", value: "outdoors expert camper" },
      { label: "Theater kid", value: "theater kid camper" },
      { label: "Rich kid diva", value: "rich kid diva camper" },
    ],
  },
  {
    title: "Team",
    key: "team",
    data: [
      { label: "Screaming Gophers", value: "screaming gophers team" },
      { label: "Killer Bass", value: "killer bass team" },
      { label: "Heroic Hamsters", value: "heroic hamsters team" },
      { label: "Villainous Vultures", value: "villainous vultures team" },
      { label: "Team Victory", value: "team victory" },
      { label: "Team Amazon", value: "team amazon" },
      { label: "Team Maggot", value: "team maggot" },
      { label: "Freelance Intern", value: "freelance intern competitor" },
    ],
  },
  {
    title: "Top",
    key: "top",
    data: [
      { label: "Camp tee shirt", value: "camp t shirt" },
      { label: "Layered tank + hoodie", value: "tank top with hoodie" },
      { label: "Preppy polo", value: "preppy polo shirt" },
      { label: "Goth band tee", value: "goth band shirt" },
      { label: "Athletic crop top", value: "athletic crop top" },
      { label: "Life jacket", value: "camp life jacket" },
      { label: "Plaid overshirt", value: "plaid overshirt" },
      { label: "Designer jacket", value: "designer camp jacket" },
    ],
  },
  {
    title: "Bottom",
    key: "bottom",
    data: [
      { label: "Cargo shorts", value: "cargo shorts" },
      { label: "Knee-length skirt", value: "knee length skirt" },
      { label: "Skinny jeans", value: "skinny jeans" },
      { label: "Jogger pants", value: "jogger pants" },
      { label: "Board shorts", value: "board shorts" },
      { label: "Overalls", value: "paint splattered overalls" },
      { label: "Tartan shorts", value: "tartan shorts" },
      { label: "Capri pants", value: "capri pants" },
    ],
  },
  {
    title: "Footwear",
    key: "footwear",
    data: [
      { label: "High-top sneakers", value: "high top sneakers" },
      { label: "Flip-flops", value: "flip flops" },
      { label: "Hiking boots", value: "hiking boots" },
      { label: "Canvas slip-ons", value: "canvas slip on shoes" },
      { label: "Rain boots", value: "camp rain boots" },
      { label: "Roller skates", value: "retro roller skates" },
      { label: "Barefoot", value: "barefoot camper" },
      { label: "Designer loafers", value: "designer loafers" },
    ],
  },
  {
    title: "Hair",
    key: "hair",
    data: [
      { label: "Messy ponytail", value: "messy ponytail" },
      { label: "Spiky hair", value: "spiky hair" },
      { label: "Emo fringe", value: "emo fringe hair" },
      { label: "Curly afro", value: "curly afro" },
      { label: "Braided pigtails", value: "braided pigtails" },
      { label: "Buzz cut", value: "buzz cut" },
      { label: "Wavy bob", value: "wavy bob" },
      { label: "Luxurious curls", value: "luxurious curls" },
    ],
  },
  {
    title: "Eyes",
    key: "eyes",
    data: [
      { label: "Brown eyes", value: "brown eyes" },
      { label: "Blue eyes", value: "blue eyes" },
      { label: "Green eyes", value: "green eyes" },
      { label: "Hazel eyes", value: "hazel eyes" },
      { label: "Gray eyes", value: "gray eyes" },
      { label: "Purple eyes", value: "purple eyes" },
      { label: "Freckled cheeks", value: "freckled cheeks" },
      { label: "Eye bags", value: "tired eye bags" },
    ],
  },
  {
    title: "Expression",
    key: "face",
    data: [
      { label: "Smug grin", value: "smug grin expression" },
      { label: "Confessional panic", value: "confessional panic face" },
      { label: "Deadpan stare", value: "deadpan stare" },
      { label: "Eye-roll", value: "massive eye roll" },
      { label: "Triumphant cheer", value: "triumphant cheer expression" },
      { label: "Plotting smirk", value: "plotting smirk" },
      { label: "Nervous smile", value: "nervous smile" },
      { label: "Focused glare", value: "focused glare" },
    ],
  },
  {
    title: "Skin",
    key: "skin",
    data: [
      { label: "Pale skin", value: "pale skin" },
      { label: "Light tan skin", value: "light tan skin" },
      { label: "Deep brown skin", value: "deep brown skin" },
      { label: "Warm bronze skin", value: "warm bronze skin" },
      { label: "Freckled skin", value: "freckled skin" },
      { label: "Sunburnt nose", value: "sunburnt nose" },
      { label: "Olive skin", value: "olive skin" },
      { label: "Cool beige skin", value: "cool beige skin" },
    ],
  },
  {
    title: "Props",
    key: "accessory",
    data: [
      { label: "Marshmallow trophy", value: "camp marshmallow trophy" },
      { label: "Strategy notebook", value: "strategy notebook accessory" },
      { label: "Guitar", value: "acoustic guitar prop" },
      { label: "Action camera", value: "action camera accessory" },
      { label: "Bug spray can", value: "bug spray accessory" },
      { label: "Makeup kit", value: "portable makeup kit" },
      { label: "Survival rope", value: "survival rope accessory" },
      { label: "Microphone", value: "portable microphone" },
    ],
  },
  {
    title: "Setting",
    key: "tdi_setting",
    data: [
      { label: "Campfire ceremony", value: "campfire ceremony at night" },
      { label: "Dock of Shame", value: "dock of shame sunset" },
      { label: "Confessional booth", value: "confessional booth interior" },
      { label: "Mess hall", value: "camp mess hall" },
      { label: "Challenge course", value: "obstacle course challenge" },
      { label: "Wawanakwa woods", value: "wawanakwa pine forest" },
      { label: "Chris's stage", value: "reality show stage lights" },
      { label: "Tiki lounge set", value: "camp tiki lounge set" },
    ],
  },
];

const examples = [
  {
    image: "https://cdn.ocmaker.app/results/WZqC0w9T1_HLcX2-u6ZgS.png",
    prompt:
      "1girl, athletic camper, tan skin, messy ponytail, camp tank top layered over rashguard, cargo shorts, whistle accessory, confident grin, obstacle course background, total drama cartoon style, single character, full body, looking at viewer",
  },
  {
    image: "https://cdn.ocmaker.app/results/tAPM9iMaCxcOus75ETY4g.png",
    prompt:
      "1boy, prankster archetype, light brown skin, neon beanie, oversized hoodie, board shorts, action camera, smug grin, confessional booth background, total drama cartoon style, single character, upper body, looking at viewer",
  },
  {
    image: "https://cdn.ocmaker.app/results/ttKDE92Ey3wS1w633kRC7.png",
    prompt:
      "1girl, preppy strategist, pale skin, wavy bob, layered polo and camp tee, pleated skirt, cue cards accessory, composed smile, campfire ceremony background, total drama cartoon style, single character, full body, looking at viewer",
  },
  {
    image: "https://cdn.ocmaker.app/results/1hWZyVd__sJaR5jG4EZ4F.png",
    prompt:
      "1person, outdoors artist, freckles, curly afro, paint-splattered hoodie, overalls, sketchbook accessory, gentle smile, wawanakwa woods background, total drama cartoon style, single character, full body, looking at viewer",
  },
];

export default {
  meta: {
    title: "TDI OC Maker",
    description:
      "Create your own Total Drama Island contestant with AI. Generate reality show campers, schemers, and underdogs in seconds.",
  },
  series: "Total Drama Island",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "TDI OC Maker",
      description:
        "Design a brand-new Total Drama contestant. Describe their archetype, outfit, and conniving strategy to watch them pop off the screen.",
    },
    step: {
      title: "How to Make a Total Drama OC",
      description:
        "You write the confessional script, we deliver the animated camper. Follow these steps to survive Camp Wawanakwa.",
      steps: [
        {
          title: "Pitch Your Camper",
          description:
            "Share their team, archetype, fashion sense, and signature prop. Call out rivalries and friendships to set up classic drama.",
        },
        {
          title: "Add Reality TV Flavor",
          description:
            "Mention catchphrases, confession booth secrets, and how they react when Chef’s challenge goes wild. The AI uses those details in the art.",
        },
        {
          title: "Generate and Roast Marshmallows",
          description:
            "Hit “Generate Character” to get instant cartoon art and a backstory that makes your OC feel ready for elimination night.",
        },
      ],
    },
    examples: {
      title: "Total Drama Character Examples",
      description:
        "Preview campers created from text prompts using the TDI OC Maker, covering every archetype from hero to villain.",
      examples,
    },
    features: {
      title: "Why Fans Love TDI OC Maker",
      description:
        "All the confessionals, none of the mosquito bites. Build a cast ready to rival the originals.",
      features: [
        {
          label: "Reality Show Savvy",
          description:
            "Prompt templates understand alliances, sabotage, and confessionals so your camper reads like canon.",
        },
        {
          label: "Cartoon-Accurate Rendering",
          description:
            "Get art in the bold Total Drama style with snappy poses, thick outlines, and that signature color palette.",
        },
        {
          label: "Strategy-Driven Bios",
          description:
            "Receive ready-to-use motivations, challenge strengths, and elimination tactics for instant storytelling.",
        },
        {
          label: "Outfit & Prop Controls",
          description:
            "Choose hoodies, life jackets, guitars, or marshmallow trophies to match the camp persona you imagine.",
        },
        {
          label: "Quick Iterations",
          description:
            "Regenerate different poses or vibes until you find the perfect confessional star.",
        },
        {
          label: "Perfect for Roleplays",
          description:
            "Download character sheets to fuel forum RPs, fan seasons, or animated edits without starting from scratch.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Still curious? Email support@ocmaker.app",
      faqs: [
        {
          question: "What does TDI OC Maker do?",
          answer:
            "It turns your text description into Total Drama-style artwork and bios so you can draft whole fan seasons fast.",
        },
        {
          question: "Do I need art skills?",
          answer:
            "Nope. Type out your contestant idea and the AI handles the cartoon rendering, outfit, and attitude.",
        },
        {
          question: "Can I script alliances and rivalries?",
          answer:
            "Yes. Include names of allies or enemies, and the generated bio will weave those relationships into the drama.",
        },
        {
          question: "Is there support for later seasons?",
          answer:
            "You can mention any Total Drama season or team name—our prompt set recognizes them all.",
        },
        {
          question: "Can I reuse characters in my projects?",
          answer:
            "Absolutely. You own the characters you generate and can feature them in fan videos, stories, or RPGs.",
        },
        {
          question: "What if I want multiple outfits?",
          answer:
            "Regenerate with new clothing notes or tweak the prompt to give them alternate wardrobes for different episodes.",
        },
      ],
    },
    cta: {
      title: "Lights, Camera, Confessional",
      description:
        "Write their intro monologue and let TDI OC Maker deliver the art, bio, and drama in one click.",
      btns: {
        start: "Start Creating",
        explore: "Explore Characters",
      },
    },
  },
};
