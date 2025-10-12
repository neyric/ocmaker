const fs = require("fs/promises");
const path = require("path");

const dataset = {
  "aot-oc-maker": {
    fields: [
      { key: "name", question: "What is your character's name?" },
      {
        key: "faction",
        question: "Which regiment or faction are they part of?",
      },
      {
        key: "role",
        question: "What is their role and specialty?",
      },
      {
        key: "gear",
        question: "What combat gear or Titan power do they rely on?",
      },
      {
        key: "personality",
        question: "How would you describe their personality?",
      },
      {
        key: "motivation",
        question: "What motivation drives them forward?",
      },
      {
        key: "backstory",
        question: "Share a brief backstory snapshot.",
      },
    ],
    examples: [
      {
        title: "Scout Pathfinder",
        description:
          "A Survey Corps veteran who charts Titan territory others fear to enter.",
        values: {
          name: "Ilia Brauer",
          faction: "Survey Corps Special Operations Squad",
          role: "Long-range reconnaissance using experimental mapping flares",
          gear: "Dual blades, modified ODM gear, and Thunder Spear support",
          personality: "Stoic, analytical, unwaveringly loyal to her squad",
          motivation: "To discover a safe route for civilians beyond the Walls",
          backstory:
            "Raised in Trost, Ilia swore to never let another breach catch humanity unprepared and now maps every Titan nest for Hange's team.",
        },
      },
      {
        title: "Wall Garrison Captain",
        description: "An engineer-soldier balancing defense work with titan-slaying duty.",
        values: {
          name: "Marius Feldt",
          faction: "Wall Garrison 3rd Engineering Brigade",
          role: "Coordinating wall repairs while leading an artillery fireteam",
          gear: "Cannon batteries, anti-personnel ODM gear, and signal rockets",
          personality: "Pragmatic, protective, prone to dry humor under stress",
          motivation:
            "To keep the Walls standing long enough for civilians to rebuild",
          backstory:
            "He lost his parents during the Trost breach and now commands the very cannons he once hid beneath as a child.",
        },
      },
      {
        title: "Warrior Candidate",
        description: "A Marleyan trainee torn between duty and empathy for Eldians.",
        values: {
          name: "Greta Braun",
          faction: "Marley Warrior Unit candidate squad",
          role: "Tactical planning and anti-ODM countermeasures",
          gear: "Reinforced shotguns and thunder spear intercept launchers",
          personality: "Disciplined, conflicted, fiercely loyal to her fellow candidates",
          motivation:
            "To inherit the Armored Titan and redefine Marley's treatment of Eldians",
          backstory:
            "Greta secretly trades letters with an Eldian pen pal, questioning the propaganda she is sworn to uphold.",
        },
      },
      {
        title: "Yeagerist Agitator",
        description: "A radicalized youth pushing for Eldian freedom at any cost.",
        values: {
          name: "Tomas Kirsch",
          faction: "Yeagerist underground cells inside Paradis",
          role: "Propaganda broadcasts and organizing civilian militias",
          gear: "Standard ODM gear, smuggled firearms, and stolen Thunder Spears",
          personality: "Charismatic, impatient, fervently devoted to Eren's vision",
          motivation:
            "To force the world to respect Eldian sovereignty through the Rumbling threat",
          backstory:
            "Formerly a refugee in Shiganshina, Tomas uses rooftop radio relays to rally supporters while dodging Military Police surveillance.",
        },
      },
      {
        title: "Underground Healer",
        description:
          "A civilian medic caring for refugees and deserters beneath the capital.",
        values: {
          name: "Elise Moreau",
          faction: "Independent support network below Mitras",
          role: "Medical treatment for ODM injuries and Titan trauma survivors",
          gear: "Hidden clinics, anesthesia syringes, and salvaged medical blades",
          personality: "Compassionate, weary, resolute against injustice",
          motivation:
            "To prove that humanity survives through mercy as much as strength",
          backstory:
            "Elise deserted the Interior MPs after witnessing their cruelty and now patches up scouts and civilians in secret catacombs.",
        },
      },
    ],
  },
  "apothecary-diaries-oc-maker": {
    fields: [
      { key: "name", question: "What is your character's name?" },
      {
        key: "status",
        question: "What is their social status and workplace?",
      },
      {
        key: "specialty",
        question: "What is their medical or investigative specialty?",
      },
      { key: "allies", question: "Who are their key allies or patrons?" },
      {
        key: "personality",
        question: "How would you describe their personality?",
      },
      {
        key: "case",
        question: "What signature case made them notable?",
      },
      {
        key: "backstory",
        question: "Share a brief backstory snapshot.",
      },
    ],
    examples: [
      {
        title: "Inner Palace Herbalist",
        description:
          "A clever maid who solves poisonings while brewing cures in secret.",
        values: {
          name: "Ruolan Mei",
          status: "Low-born maid assigned to the Jade Pavilion of the Inner Palace",
          specialty:
            "Diagnosing exotic poisons through taste tests and herbal counteragents",
          allies: "The Imperial Physician and a sympathetic favored concubine",
          personality: "Wry, fearless, insatiably curious about court gossip",
          case:
            "Unraveled a slow-acting arsenic plot by decoding tea stains on porcelain cups",
          backstory:
            "Sold into service as a child, she smuggled her father's herb scrolls into the palace and now saves lives between chores.",
        },
      },
      {
        title: "Pleasure District Apothecary",
        description:
          "A streetwise healer balancing clientele between courtesans and criminals.",
        values: {
          name: "Han Suyin",
          status: "Registered apothecary in the Honglan pleasure quarter",
          specialty:
            "Formulating antidotes for counterfeit cosmetics and hidden venoms",
          allies: "A brothel madam, a wandering monk, and a retired assassin",
          personality: "Bold, sarcastic, fiercely protective of her patients",
          case:
            "Identified mercury-laced rouge before it disfigured a visiting royal",
          backstory:
            "Once a runaway concubine trainee, she learned trade secrets from traveling medicinal caravans to win her freedom.",
        },
      },
      {
        title: "Imperial Court Scrivener",
        description:
          "A junior scribe who exposes corruption by combing through case records.",
        values: {
          name: "Xu Wenyan",
          status: "Scholar-official in the Imperial Medical Bureau archives",
          specialty:
            "Cross-referencing ledgers to spot tampered remedies and embezzled supplies",
          allies: "A reform-minded minister and a reclusive archivist librarian",
          personality: "Meticulous, soft-spoken, driven by quiet moral outrage",
          case:
            "Proved tonic shipments were replaced with sawdust before reaching the nursery",
          backstory:
            "Choosing medicine over politics after the provincial exams, Wenyan believes accurate ledgers save more lives than swords.",
        },
      },
      {
        title: "Traveling Tea Doctor",
        description:
          "An itinerant healer who collects gossip with every brew of medicinal tea.",
        values: {
          name: "Lan Jiayi",
          status:
            "Freeborn tea seller roaming between noble estates and rural temples",
          specialty:
            "Diagnosing ailments through tea pairings and pulse readings on the road",
          allies: "Temple monks, farmers' guilds, and a masked opera performer",
          personality: "Cheerful, persuasive, perfectly at ease among any class",
          case:
            "Unmasked a counterfeit tax collector by spotting arsenic in his jasmine blend",
          backstory:
            "Lan apprenticed under her grandmother, hiding remedies in tea leaves while evading corrupt officials and bandits alike.",
        },
      },
      {
        title: "Royal Forensics Scholar",
        description:
          "A forensic innovator bringing new deduction techniques to the emperor's court.",
        values: {
          name: "Shen Qihong",
          status: "First-rank scholar serving as adjunct examiner in the high court",
          specialty:
            "Applying ink powder, fingerprint rubbings, and botanical tracings to crime scenes",
          allies: "The Crown Prince and a skeptical yet intrigued imperial judge",
          personality: "Methodical, unflappable, quietly ambitious for reform",
          case:
            "Matched rare pollen to a rival's greenhouse, clearing an innocent noble",
          backstory:
            "After witnessing a wrongful conviction in their prefecture, Qihong vowed to fuse scholarship with forensic science.",
        },
      },
    ],
  },
  "arknights-oc-maker": {
    fields: [
      { key: "name", question: "What is your character's name?" },
      {
        key: "affiliation",
        question: "What is their affiliation and operator class?",
      },
      {
        key: "specialty",
        question: "What weapon or Arts specialty do they rely on?",
      },
      {
        key: "infection",
        question: "What is their infection status?",
      },
      {
        key: "traits",
        question: "Which talents or traits define their combat style?",
      },
      {
        key: "personality",
        question: "How would you describe their personality?",
      },
      {
        key: "history",
        question: "What mission history stands out to them?",
      },
    ],
    examples: [
      {
        title: "Rhodes Island Vanguard",
        description:
          "A forward-deployed rescuer who shields civilians while deploying drones.",
        values: {
          name: "Mina Talwar",
          affiliation: "Rhodes Island Vanguard Operator",
          specialty:
            "Deployable barrier drones paired with Originium shock batons",
          infection: "Infected; requires scheduled crystallization treatments",
          traits: "Rapid redeployment, cost refund support, protective barrier fields",
          personality: "Level-headed, nurturing toward rookies, subtly sarcastic",
          history:
            "Evacuated an entire mining crew during the Chernobog incident while holding back Reunion snipers.",
        },
      },
      {
        title: "Reunion Defector",
        description:
          "A repentant engineer now using his knowledge to dismantle enemy explosives.",
        values: {
          name: "Darius Vogt",
          affiliation:
            "Rhodes Island Supporter, formerly Reunion bomb technician",
          specialty:
            "Remote EMP glaives and Originium shrapnel suppression grids",
          infection: "Non-Infected but carries radiation scarring from old tests",
          traits:
            "Disarms enemy charges, boosts allied resistance to Arts damage",
          personality:
            "Remorseful, methodical, determined to repair what he once ruined",
          history:
            "Defused a Reunion demolition charge beneath Lungmen's residential district before surrendering to Rhodes Island.",
        },
      },
      {
        title: "Kazimierz Lancer",
        description:
          "A corporate knight moonlighting with Rhodes Island to protect migrant workers.",
        values: {
          name: "Veronika Krol",
          affiliation:
            "Independent Defender contracted to Rhodes Island and the Kazimierz Knights Association",
          specialty: "Reactive Originite lance paired with kinetic shields",
          infection: "Stage-one Infected stabilized by Rhodes Island care",
          traits: "Counters that heal allies, crowd control with lance sweeps",
          personality: "Chivalrous, media-savvy, unyielding against exploitation",
          history:
            "Guarded a caravan through Ursus territory while bounty hunters tried to claim the workers as property.",
        },
      },
      {
        title: "Laterano Executor",
        description:
          "A gun-toting cleric balancing doctrine with pragmatic mercy on missions.",
        values: {
          name: "Canon Ferri",
          affiliation:
            "Laterano Notarial Hall Executor on loan to Rhodes Island",
          specialty:
            "Twin Liberi casters firing sanctified buckshot infused with light",
          infection: "Uninfected; carries a relic that reacts to Originium",
          traits:
            "Alternates lethal judgments with crowd-control blessings",
          personality: "Solemn, ritualistic, surprisingly compassionate",
          history:
            "Brokered a ceasefire between zealots and infected refugees before enforcing Laterano law on the real instigators.",
        },
      },
      {
        title: "Ursus Survivor",
        description:
          "A student survivor turned shield guard for Rhodes Island mobile clinics.",
        values: {
          name: "Katya Zelenko",
          affiliation: "Rhodes Island Guard assigned to Ursus relief teams",
          specialty: "Heated chainsaw glaive channeling thermal Originium bursts",
          infection: "Recovered Infected with stabilized Originium density",
          traits:
            "Protective counters, shielding casters, morale boosts under fear",
          personality:
            "Tenacious, quietly haunted, fiercely protective of students",
          history:
            "Escorted a mobile clinic through Winterwisp campus, rescuing classmates still trapped in lockdown.",
        },
      },
    ],
  },
  "black-butler-oc-maker": {
    fields: [
      { key: "name", question: "What is your character's name?" },
      {
        key: "cover",
        question: "What social cover and title do they maintain?",
      },
      {
        key: "alignment",
        question: "What alignment best describes them?",
      },
      {
        key: "powers",
        question: "What talents or powers assist their work?",
      },
      {
        key: "personality",
        question: "How would you describe their personality?",
      },
      {
        key: "motive",
        question: "What secret motive pushes them forward?",
      },
      {
        key: "backstory",
        question: "Share a brief backstory snapshot.",
      },
    ],
    examples: [
      {
        title: "Queen's Watchdog Apprentice",
        description:
          "An aristocratic investigator with a polite smile and ruthless instincts.",
        values: {
          name: "Lady Eveline Ashcroft",
          cover: "Duchess's niece serving as a charity organizer for London's orphans",
          alignment: "Human agent under the Queen's Watchdog office",
          powers:
            "Code-breaking, fencing, and a demon hound bound to a silver whistle",
          personality: "Refined, calculating, delivers barbed wit with grace",
          motive: "To uncover who ordered her parents' staged carriage accident",
          backstory:
            "Rescued by Phantomhive servants after kidnappers targeted her inheritance, she now assists in the underworld investigations.",
        },
      },
      {
        title: "Rehabilitated Reaper",
        description:
          "A Grim Reaper assigned to shepherd troublesome souls through the theatre district.",
        values: {
          name: "Cedric Greyleaf",
          cover: "Stage manager at the Royal Albion Theatre Company",
          alignment: "Shinigami on earthly probation",
          powers:
            "Death scythe disguised as a spotlight rig, cinematic record manipulation",
          personality: "Melancholic, artistic, wry about mortal frailty",
          motive:
            "To atone for censoring souls without review during the Jack the Ripper case",
          backstory:
            "Cedric disobeyed dispatch orders and now ensures every theatre \"accident\" follows the proper ledger of souls.",
        },
      },
      {
        title: "Demon Valet",
        description:
          "A junior demon mastering etiquette while bound to a disgraced viscountess.",
        values: {
          name: "Silas",
          cover: "Personal valet to a viscountess seeking redemption",
          alignment: "Demon bound by an ancestral contract",
          powers:
            "Mirror-step travel, impeccable cuisine, truth-binding tea rituals",
          personality: "Suave, patient, faintly amused by human folly",
          motive: "To collect his lady's soul only after she clears her family's name",
          backstory:
            "Once serving a pirate lord, Silas now studies noble etiquette to fulfill the contract's clause of \"impeccable service\".",
        },
      },
      {
        title: "Circus Illusionist",
        description:
          "A Noah's Ark Circus performer balancing loyalty with covert justice.",
        values: {
          name: "Marion \"Lark\" Blythe",
          cover: "Illusionist and tightrope artist in the revived Noah's Ark Circus",
          alignment: "Human informant secretly allied with the Phantomhive estate",
          powers:
            "Illusion props, concealed throwing blades, network of street urchins",
          personality: "Playful, defiant, fiercely protective of found family",
          motive: "To keep orphan performers safe from predatory nobles",
          backstory:
            "Saved by Joker as a child, Marion now steers the circus toward honest shows while feeding intel to Ciel.",
        },
      },
      {
        title: "Underground Alchemist",
        description:
          "A chemist dabbling in forbidden arts to reunite with the dead.",
        values: {
          name: "Professor Adelaide Crane",
          cover: "Reclusive academic publishing tonic recipes",
          alignment: "Human occultist flirting with demonic bargains",
          powers:
            "Transmutation circles, soul-preserving elixirs, mechanical prosthetics",
          personality: "Obsessive, brilliant, undeterred by moral gray",
          motive: "To revive her fiance who died in a sabotaged culinary duel",
          backstory:
            "Collaborates with Undertaker for anatomical samples, risking everything to perfect a humane resurrection method.",
        },
      },
    ],
  },
  "bleach-oc-maker": {
    fields: [
      { key: "name", question: "What is your character's name?" },
      { key: "race", question: "What race and affiliation do they claim?" },
      {
        key: "division",
        question: "Which combat division or squad do they serve?",
      },
      {
        key: "theme",
        question: "What is the theme of their Zanpakuto or ability?",
      },
      {
        key: "release",
        question: "What release states have they achieved?",
      },
      {
        key: "personality",
        question: "How would you describe their personality?",
      },
      {
        key: "backstory",
        question: "Share a past life or backstory snapshot.",
      },
    ],
    examples: [
      {
        title: "Gotei Tracker",
        description:
          "A Shin'o Academy graduate specializing in wilderness recon missions.",
        values: {
          name: "Hayate Murasame",
          race: "Shinigami of the Gotei 13",
          division:
            "10th Division reconnaissance unit patrolling Rukongai borders",
          theme: "Wind manipulation through the blade Kazekiri",
          release:
            "Shikai unlocked; Bankai forms a storm dragon he struggles to control",
          personality: "Relaxed, observant, fiercely protective of civilians",
          backstory:
            "In life he was a mountain rescue guide, a memory that now helps him track Hollows through the forests of Rukongai.",
        },
      },
      {
        title: "Visored Drifter",
        description:
          "A Hollow-masked exile who still aids Soul Society from the shadows.",
        values: {
          name: "Kana Ibaragi",
          race: "Visored operating near Karakura Town",
          division: "Former 5th Division seated officer allied with Urahara's network",
          theme: "Illusionary soundwaves channelled through Oto-no-Kage",
          release:
            "Shikai mastery with partial Hollow mask granting echolocation",
          personality: "Laid-back, sly, burdened by survivor's guilt",
          backstory:
            "Fled after Aizen's betrayal and built underground safehouses for spiritually aware humans.",
        },
      },
      {
        title: "Arrancar Strategist",
        description:
          "A former Espada adjutant seeking a purpose beyond Las Noches.",
        values: {
          name: "Verde Quinto",
          race: "Arrancar aligned with Nelliel's neutral faction",
          division: "Advisory council mediating Hueco Mundo city disputes",
          theme: "Emerald crystal shards that grow into defensive barriers",
          release: "Resurrección Cristaliza forming mirrored armor blades",
          personality: "Stoic, philosophical, secretly envious of human warmth",
          backstory:
            "Once a Hollow librarian, Verde now negotiates truces between clans yearning for peace.",
        },
      },
      {
        title: "Quincy Archivist",
        description:
          "A Wandenreich survivor cataloging forbidden techniques for the future.",
        values: {
          name: "Astrid Vogel",
          race: "Pureblood Quincy hiding within the Ishida network",
          division: "Former Schrift researcher now discreetly aiding Ichigo's allies",
          theme:
            "Spirit bow Archivbogen that records enemy reiatsu patterns",
          release:
            "Vollständig Bibliotheca manifests tomes copying techniques temporarily",
          personality: "Reserved, scholarly, remorseful for past atrocities",
          backstory:
            "She preserved forbidden volumes during Yhwach's campaign and teaches Quincy history to prevent another war.",
        },
      },
      {
        title: "Fullbringer Courier",
        description:
          "A human courier whose Fullbring turns deliveries into lightning raids.",
        values: {
          name: "Riku Tanabe",
          race: "Human Fullbringer allied with Xcution's reformed members",
          division: "Acts as a courier for Kisuke and the Substitute Shinigami",
          theme: "Fullbring Deadline empowering backpacks for teleport dashes",
          release:
            "Enhanced Fullbring creating temporal bubbles that slow opponents",
          personality: "Energetic, reliable, always racing against the clock",
          backstory:
            "He awakened his Fullbring after refusing to abandon a life-saving package during a deadly delivery crash.",
        },
      },
    ],
  },
  "blue-archive-oc-maker": {
    fields: [
      { key: "name", question: "What is your character's name?" },
      {
        key: "academy",
        question: "Which academy and club do they belong to?",
      },
      {
        key: "role",
        question: "What position or specialty do they hold?",
      },
      {
        key: "weapon",
        question: "What is their preferred weapon and EX Skill?",
      },
      {
        key: "personality",
        question: "How would you describe their personality?",
      },
      {
        key: "quirks",
        question: "What quirks define them?",
      },
      {
        key: "backstory",
        question: "Share a mission backstory.",
      },
    ],
    examples: [
      {
        title: "Trinity Marksman",
        description:
          "An honors student sniper who protects allies with radiant barriers.",
        values: {
          name: "Celeste Marigold",
          academy: "Trinity General School, Justice Realization Committee",
          role: "Long-range overwatch and battlefield analysis",
          weapon: "Anti-material rifle Gabriel with an EX Skill summoning holy barriers",
          personality: "Serene, perfectionist, secretly obsessed with sweets",
          quirks: "Collects stained-glass charms and quotes scripture mid-battle",
          backstory:
            "Coordinated encrypted hymn signals with Sensei to halt a runaway tank during the Rabulya riot.",
        },
      },
      {
        title: "Gehenna Pyrotechnician",
        description:
          "An explosive enthusiast who keeps the discipline committee guessing.",
        values: {
          name: "Ibuki Blaze",
          academy: "Gehenna Academy, Engineering Research Club",
          role: "Demolitions expert and gadget tinkerer",
          weapon: "Grenade launcher Inferno with an EX Skill deploying flame turrets",
          personality: "Chaotic, inventive, fiercely loyal to friends",
          quirks: "Names every device after desserts and sells blast-proof sweets",
          backstory:
            "Repurposed festival firework rigs to divert Problem Solver 68, saving Abydos civilians during a citywide chase.",
        },
      },
      {
        title: "Millennium Hacker",
        description:
          "A tech prodigy safeguarding Sensei's comms from rogue AIs.",
        values: {
          name: "Nakamori Patch",
          academy: "Millennium Science School, Veritas Cybersecurity Society",
          role: "Network infiltration and drone defense coordination",
          weapon: "Dual SMGs with an EX Skill launching a firewall drone swarm",
          personality: "Sleep-deprived, quirky, endlessly curious about glitches",
          quirks: "Talks to servers like pets and collects rare error codes",
          backstory:
            "Shut down an AI uprising in the Ruins by rewriting malicious code mid-battle while Sensei held the line.",
        },
      },
      {
        title: "Abydos Strategist",
        description:
          "A tactician keeping the desert school afloat with careful planning.",
        values: {
          name: "Rana Sol",
          academy: "Abydos High School, Countermeasure Council",
          role: "Logistics planner and sniper spotter",
          weapon: "Lever-action rifle with an EX Skill that conjures sandstorm cover",
          personality: "Resourceful, stubborn, quietly optimistic about Abydos",
          quirks: "Scrapbooks every reclaimed block of the desert campus",
          backstory:
            "Orchestrated a supply heist on Kaiser Corporation, redistributing resources to every starving club unnoticed.",
        },
      },
      {
        title: "SRT Field Medic",
        description:
          "A stoic combat medic ensuring strike teams return home alive.",
        values: {
          name: "Miyu Aegis",
          academy: "SRT Special Academy, Shield Team",
          role: "Frontline medic and shield bearer",
          weapon: "Shielded SMG with an EX Skill forming a protective bastion dome",
          personality: "Calm, steadfast, sparing with words",
          quirks: "Keeps a pocket notebook of every student saved",
          backstory:
            "Carried Sensei through crossfire during the Nasu Metropolis incident, holding the shield wall alone until reinforcements arrived.",
        },
      },
    ],
  },
  "blue-lock-oc-maker": {
    fields: [
      { key: "name", question: "What is your character's name?" },
      {
        key: "position",
        question: "What is their preferred position?",
      },
      {
        key: "weapon",
        question: "What signature weapon or skill do they showcase?",
      },
      {
        key: "support",
        question: "What supporting abilities bolster their play?",
      },
      {
        key: "personality",
        question: "How would you describe their ego and personality?",
      },
      {
        key: "rival",
        question: "What rival motivation keeps them hungry?",
      },
      {
        key: "backstory",
        question: "Share a soccer backstory snapshot.",
      },
    ],
    examples: [
      {
        title: "Egoist Striker",
        description:
          "A striker whose swordplay footwork turns volleys into highlight reels.",
        values: {
          name: "Kaito Arashi",
          position: "Central striker leading the attack",
          weapon: "Katana-kick volley slicing through defenses with precise angles",
          support: "Lightning feints and aerial control born from kendo drills",
          personality: "Dramatic, self-styled hero who thrives under spotlight pressure",
          rival: "To outshine Isagi and become Japan's definitive sword on the pitch",
          backstory:
            "Former youth kendo champion who abandoned the dojo after a Blue Lock invitation appeared in his locker.",
        },
      },
      {
        title: "Tactical Playmaker",
        description:
          "A midfielder who treats every Blue Lock match like a grand chess problem.",
        values: {
          name: "Rei Tsukishima",
          position: "Attacking midfielder orchestrating the offense",
          weapon: "Force Check vision passes that exploit micro-gaps",
          support: "Game reading, set-piece deception, tireless analysis drills",
          personality: "Composed, strategic, slightly condescending toward improvisers",
          rival: "To prove intellect can rival instinct by dethroning Rin Itoshi",
          backstory:
            "Maps every Blue Lock trial on notebook grids, beating larger strikers by predicting their movement three steps ahead.",
        },
      },
      {
        title: "Aerial Ace",
        description:
          "A winger whose vertical leap makes every cross a Meteor Crash.",
        values: {
          name: "Noa Fujimori",
          position: "Left winger attacking the far post",
          weapon: "Gravity-defying headers dubbed the Meteor Crash",
          support: "Sprint bursts, double-touch control, fearless collisions",
          personality: "Outgoing, thrill-seeking, addicted to crowd reactions",
          rival: "To challenge Bachira's creativity while chasing Neo Egoist spots",
          backstory:
            "Trained on abandoned rollercoasters to conquer a childhood fear of heights after a devastating fall.",
        },
      },
      {
        title: "Set-Piece Sorcerer",
        description:
          "A dead-ball artist whose knuckle shots bend reality itself.",
        values: {
          name: "Hikari Mizuno",
          position: "Right midfielder and free-kick specialist",
          weapon: "Mirage Knuckle free kick that dips unpredictably",
          support: "Weather reading, spin control, adaptive positioning",
          personality: "Calm, mystical, speaks in poetic metaphors",
          rival: "To score against Noel Noa in a legitimate match and earn praise",
          backstory:
            "Mastered ball physics by launching paper cranes with elastic bands, then mirrored those curves on the field.",
        },
      },
      {
        title: "Guardian Libero",
        description:
          "A defender reinventing ego to demand the spotlight from the back line.",
        values: {
          name: "Ayato Koga",
          position: "Sweeper-libero anchoring the defense",
          weapon: "Aegis Break tackles converting steals into counterattacks",
          support: "Laser-guided long passes, relentless marking, aerial authority",
          personality: "Protective, quietly intense, obsessed with control",
          rival: "To prove defenders deserve ego glory alongside strikers",
          backstory:
            "Once benched for being too supportive, he joined Blue Lock to redefine what a Japanese ace can be.",
        },
      },
    ],
  },
  "bungo-stray-dogs-oc-maker": {
    fields: [
      { key: "name", question: "What is your character's name?" },
      {
        key: "ability",
        question: "What is their Ability title and function?",
      },
      { key: "affiliation", question: "Which affiliation do they belong to?" },
      {
        key: "role",
        question: "What combat or support role do they fill?",
      },
      {
        key: "conditions",
        question: "What conditions or weaknesses come with their Ability?",
      },
      {
        key: "personality",
        question: "How would you describe their personality?",
      },
      {
        key: "backstory",
        question: "Share a notable past incident.",
      },
    ],
    examples: [
      {
        title: "Detective Illusionist",
        description:
          "An Agency sleuth who weaponizes stagecraft to disorient foes.",
        values: {
          name: "Hanae Sazanami",
          ability: "Ability: Theatre of Mist — conjures tactile illusions within spotlighted zones",
          affiliation: "Armed Detective Agency",
          role: "Field investigator providing deception and misdirection",
          conditions: "Requires a physical prop to anchor each illusion; bright noon light weakens it",
          personality: "Cheerful, empathetic, always quoting classic plays",
          backstory:
            "Exposed a Port Mafia smuggling ring by staging a fake hostage production inside an abandoned warehouse.",
        },
      },
      {
        title: "Port Mafia Courier",
        description:
          "A courier whose ability lets him fuse with graffiti to travel unseen.",
        values: {
          name: "Kazuo Graff",
          ability: "Ability: Fresco Passage — enters murals and exits any connected painting",
          affiliation: "Port Mafia logistics arm",
          role: "Smuggler and rapid-response scout",
          conditions: "Only works on painted surfaces created within the last seven days",
          personality: "Cynical, loyal to friends, fond of street art",
          backstory:
            "Saved Akutagawa from an ambush by dragging him into a graffiti tunnel moments before bullets struck.",
        },
      },
      {
        title: "Special Division Archivist",
        description:
          "A government agent who weaponizes literature to freeze criminals in their tracks.",
        values: {
          name: "Mariko Verse",
          ability: "Ability: Stanza Arrest — recites poetry that manifests binding chains",
          affiliation: "Special Division for Unusual Powers",
          role: "Arrest specialist and intelligence officer",
          conditions: "Chains break if she misquotes a line or loses rhythm",
          personality: "Disciplined, polite, hides dry humor behind etiquette",
          backstory:
            "Captured a rogue Ability user by quoting their own unpublished manuscript back at them word for word.",
        },
      },
      {
        title: "Guild Negotiator",
        description:
          "An American expatriate balancing profit and conscience in Yokohama.",
        values: {
          name: "Elias Monroe",
          ability: "Ability: Golden Contract — seals deals with energy barriers",
          affiliation: "The Guild (independent consultant)",
          role: "Negotiator and battlefield shield support",
          conditions: "Barrier collapses if either party breaks their spoken promise",
          personality: "Suave, opportunistic, surprisingly sentimental",
          backstory:
            "Brokered a truce between the Agency and Guild by wagering his ability on the safe return of civilian hostages.",
        },
      },
      {
        title: "Decay Insider",
        description:
          "A spy who infiltrated the Decay of the Angel at great personal cost.",
        values: {
          name: "Chiyo Fable",
          ability: "Ability: Paper Labyrinth — folds any document into reality-bending mazes",
          affiliation: "Double agent for the Hunting Dogs",
          role: "Intel courier weaving escape routes for allies",
          conditions: "Labyrinth collapses if someone burns or tears the paper",
          personality: "Grim, resolute, strangely hopeful about humanity",
          backstory:
            "Guided trapped civilians out of the Sky Casino by folding evacuation maps into a tangible escape corridor.",
        },
      },
    ],
  },
  "case-closed-oc-maker": {
    fields: [
      { key: "name", question: "What is your character's name?" },
      {
        key: "role",
        question: "What is their occupation or detective role?",
      },
      {
        key: "skills",
        question: "What signature investigation skills do they rely on?",
      },
      {
        key: "tools",
        question: "What tools or gadgets support them?",
      },
      {
        key: "personality",
        question: "How would you describe their personality?",
      },
      {
        key: "mystery",
        question: "What ongoing mystery drives them?",
      },
      {
        key: "backstory",
        question: "Share a backstory snapshot.",
      },
    ],
    examples: [
      {
        title: "High School Sleuth",
        description:
          "A prodigy detective balancing exams with murder investigations.",
        values: {
          name: "Kazuha Morioka",
          role: "High school detective assisting the Tokyo Metropolitan Police",
          skills: "Keen observation, deductive logic, disguise work",
          tools: "Solar-powered glasses with AR overlays and voice recorder",
          personality: "Earnest, punctual, occasionally overconfident",
          mystery: "Determined to unmask a serial bomber targeting cram schools",
          backstory:
            "Solved her first poisoning case at thirteen after noticing mismatched tea leaves in the victim's cup.",
        },
      },
      {
        title: "Forensic Blogger",
        description:
          "A true-crime blogger who turns internet fame into justice for victims.",
        values: {
          name: "Mina Tachibana",
          role: "Freelance forensic consultant and crime blogger",
          skills: "Digital footprint tracing and chemical residue analysis",
          tools: "Portable spectrometer disguised as a smartphone battery",
          personality: "Snarky, savvy, fiercely protective of sources",
          mystery: "Investigating a cold case involving her late journalist father",
          backstory:
            "Built a following by live-streaming evidence breakdowns that embarrassed corrupt investigators.",
        },
      },
      {
        title: "Osaka Interpol Liaison",
        description:
          "A liaison bridging Interpol resources with local detectives.",
        values: {
          name: "Daichi Kuroda",
          role: "Interpol liaison attached to the Osaka police",
          skills: "International suspect profiling and multilingual interrogation",
          tools: "Encrypted cufflinks that sync to Interpol databases",
          personality: "Cool-headed, dryly humorous, rarely rattled",
          mystery: "Tracking a jewel thief syndicate believed to link Osaka and Milan",
          backstory:
            "Grew up between Japan and Italy, learning to read criminal networks from both cultures.",
        },
      },
      {
        title: "Elementary Sleuth",
        description:
          "A Detective Boys member who shines with gadget mastery.",
        values: {
          name: "Rika Kobayashi",
          role: "Elementary detective club gadget specialist",
          skills: "Mini-drone reconnaissance and rapid clue cataloging",
          tools: "Professor-inspired backpack containing collapsible drone trio",
          personality: "Inquisitive, bubbly, fearless around crime scenes",
          mystery: "Searching for her missing brother who vanished during a magic show",
          backstory:
            "Joined the Detective Boys after hacking a magician's prop to reveal the culprit's hiding spot.",
        },
      },
      {
        title: "Undercover Butler",
        description:
          "A disguised detective embedded in a wealthy family estate.",
        values: {
          name: "Masato Shinonome",
          role: "Private detective posing as a live-in butler",
          skills: "Fingerprint recovery, etiquette infiltration, silent combat",
          tools: "Monocle camera linked to a homebrew AI case assistant",
          personality: "Polite, meticulous, harbors a sardonic streak",
          mystery: "Probing a string of disappearances tied to the family's shipping company",
          backstory:
            "Once part of the police riot squad, he left to pursue justice for overlooked victims inside high society.",
        },
      },
    ],
  },
  "chainsaw-man-oc-maker": {
    fields: [
      { key: "name", question: "What is your character's name?" },
      { key: "affiliation", question: "What is their affiliation?" },
      {
        key: "power",
        question: "What devil contract or hybrid power do they wield?",
      },
      {
        key: "weapon",
        question: "What is their signature weapon or form?",
      },
      {
        key: "personality",
        question: "How would you describe their personality?",
      },
      {
        key: "desire",
        question: "What ultimate desire drives them?",
      },
      {
        key: "backstory",
        question: "Share their tragic backstory.",
      },
    ],
    examples: [
      {
        title: "Public Safety Veteran",
        description:
          "A Division 4 survivor who keeps going for the rookies depending on her.",
        values: {
          name: "Reina Shiomi",
          affiliation: "Public Safety Devil Hunters, Tokyo Division 4",
          power: "Contract with the Railgun Devil trading hearing for bullet trajectories",
          weapon: "Metal rail gauntlet that fires devil-charged slugs",
          personality: "Dry, battle-weary, protective of reckless recruits",
          desire: "To retire long enough to visit every ramen stand she promised her partner",
          backstory:
            "Lost her hearing after firing the Railgun Devil to vaporize a zombie horde, yet still hears the screams in her dreams.",
        },
      },
      {
        title: "Hybridity Experiment",
        description:
          "An illegal human-weapons hybrid searching for a place to belong.",
        values: {
          name: "Jun Harada",
          affiliation: "Independent hybrid under covert observation",
          power: "Hybridity with the Mirror Devil allowing reflection duplication",
          weapon: "Mirrored chainsaws erupting from forearms",
          personality: "Detached, curious, fixates on reflections of others",
          desire: "To see an unaltered version of himself one last time",
          backstory:
            "Was sold to the Yakuza by his parents; only escaped when Makima's purge shattered his containment chamber.",
        },
      },
      {
        title: "Private Devil Hunter",
        description:
          "A freelance hunter monetizing cursed livestreams for devil knowledge.",
        values: {
          name: "Mika Kuroe",
          affiliation: "Independent devil hunter and underground streamer",
          power: "Contract with the Spotlight Devil trading anonymity for invulnerability on camera",
          weapon: "Camera drone blades broadcasting every strike",
          personality: "Flashy, cunning, terrified of being forgotten",
          desire: "To become the internet's most beloved devil exterminator",
          backstory:
            "Her family was devoured by the Attention Devil; going live is the only way she feels they can still see her.",
        },
      },
      {
        title: "International Assassin",
        description:
          "A foreign assassin chasing contracts across the world at any cost.",
        values: {
          name: "Sergei Kozlov",
          affiliation: "Russian state assassin freelancing in Japan",
          power: "Contract with the Tundra Devil granting cryogenic touch in exchange for warmth",
          weapon: "Frozen wire garrote and collapsible ice axe",
          personality: "Detached, professional, haunted by phantom chills",
          desire: "To earn enough to buy his family's freedom from the state",
          backstory:
            "Forced into service after his village was turned to ice as leverage; each mission steals more of his body heat.",
        },
      },
      {
        title: "Devil Rights Advocate",
        description:
          "A civilian lawyer championing devil-human coexistence while hiding a pact.",
        values: {
          name: "Aya Nanase",
          affiliation: "Public defender secretly funding devil sanctuaries",
          power: "Contract with the Penance Devil allowing her to absorb others' sins",
          weapon: "Chains of guilt that manifest from her wrists",
          personality: "Compassionate, stubborn, overwhelmed by empathy",
          desire: "To create legal protections for peaceful devils",
          backstory:
            "Took on her sister's sentence in exchange for the contract, now relives dozens of crimes in nightmares.",
        },
      },
    ],
  },
  "demon-slayer-oc-maker": {
    fields: [
      { key: "name", question: "What is your character's name?" },
      {
        key: "alignment",
        question: "What is their Corps rank or demon alignment?",
      },
      {
        key: "style",
        question: "What Breathing Style or Blood Demon Art do they wield?",
      },
      {
        key: "weapon",
        question: "What weapon or fighting style do they favor?",
      },
      {
        key: "personality",
        question: "How would you describe their personality?",
      },
      { key: "goal", question: "What goal drives them onward?" },
      {
        key: "backstory",
        question: "Share their tragic backstory.",
      },
    ],
    examples: [
      {
        title: "Thunder Hashira Successor",
        description:
          "A prodigy trained under Zenitsu's lineage to master storm-borne blades.",
        values: {
          name: "Sayo Hinata",
          alignment: "Hashira-in-training within the Demon Slayer Corps",
          style: "Thunder Breathing: Seventh Form — Horizon Break",
          weapon: "Twin nichirin kodachi that spark with crackling arcs",
          personality: "Soft-spoken, lightning-fast when provoked, fiercely dutiful",
          goal: "To earn the title of Thunder Hashira before her mentor retires",
          backstory:
            "Her mountain village was erased by a demon storm; only thunder in the distance answered her cries for help.",
        },
      },
      {
        title: "Mist Corps Medic",
        description:
          "A support slayer weaving mist to shield allies while treating wounds.",
        values: {
          name: "Akari Fujimoto",
          alignment: "Kanoe-ranked slayer assigned to the medical corps",
          style: "Mist Breathing derivatives infused with healing herbs",
          weapon: "Collapsible spear that atomizes restorative mist",
          personality: "Calm, nurturing, hides anxiety behind gentle smiles",
          goal: "To reduce battlefield casualties to zero on her watch",
          backstory:
            "She survived a demon ambush that wiped out her entire squad, saved only by a stranger's medicine pouch.",
        },
      },
      {
        title: "Rogue Demon Scholar",
        description:
          "A former scholar turned demon who preserves human texts in secret.",
        values: {
          name: "Kuro Tsukuda",
          alignment: "Upper-rank demon deserter seeking redemption",
          style: "Blood Demon Art: Ink Labyrinth — entraps foes in script threads",
          weapon: "Brush-bladed claws that write binding kanji mid-air",
          personality: "Guilt-ridden, measured, desperate to avoid killing",
          goal: "To catalog demon weaknesses and deliver them to the Corps",
          backstory:
            "He was forced to consume his own research party; now he hides in libraries leaving coded warnings for slayers.",
        },
      },
      {
        title: "Beast Breath Warrior",
        description:
          "A wild fighter wielding serrated blades blessed by the mountains.",
        values: {
          name: "Raiju Aomori",
          alignment: "Tsuguko under Inosuke's guidance",
          style: "Beast Breathing: Sixth Fang — Ridge Reaver",
          weapon: "Dual jagged nichirin blades fashioned from boar tusk steel",
          personality: "Rowdy, loyal, surprisingly perceptive about nature",
          goal: "To defend the mountains that once sheltered him from demons",
          backstory:
            "Raised by boars after demons slaughtered his parents, he learned language by mimicking traveling merchants.",
        },
      },
      {
        title: "Sun Breathing Archivist",
        description:
          "A historian tracing Sun Breathing fragments across forgotten shrines.",
        values: {
          name: "Emi Kyojuro",
          alignment: "Civilian ally entrusted with Corps secrets",
          style: "Sun Breathing kata transcribed into ceremonial dances",
          weapon: "Bladed fan inscribed with ancestral runes",
          personality: "Scholarly, steadfast, fueled by righteous fire",
          goal: "To restore every Sun Breathing form before Muzan's influence returns",
          backstory:
            "She is a distant descendant of the Rengoku line who lost her family archives when a demon torched their estate.",
        },
      },
    ],
  },
  "detective-conan-oc-maker": {
    fields: [
      { key: "name", question: "What is your character's name?" },
      {
        key: "cover",
        question: "What is their cover identity and occupation?",
      },
      {
        key: "skills",
        question: "What core detective skills do they rely on?",
      },
      {
        key: "support",
        question: "Which support gadgets or allies assist them?",
      },
      {
        key: "personality",
        question: "How would you describe their personality?",
      },
      {
        key: "nemesis",
        question: "What target case or nemesis drives them?",
      },
      {
        key: "backstory",
        question: "Share a backstory snapshot.",
      },
    ],
    examples: [
      {
        title: "Phantom Pianist",
        description:
          "An undercover music teacher feeding intel to Conan's allies.",
        values: {
          name: "Asahi Kisaragi",
          cover: "Concert pianist posing as a substitute music teacher at Teitan Elementary",
          skills: "Perfect pitch for identifying sonic clues and Morse-coded signals",
          support: "Professor Agasa's tuning fork tracker and Ayumi's Detective Boys updates",
          personality: "Gentle, observant, hides nerves behind melodic humor",
          nemesis: "Unmasking the Black Organization agent embedded in a symphony orchestra",
          backstory:
            "Lost his sister to a poisoned metronome rigged by the Organization; now he watches over students while gathering proof.",
        },
      },
      {
        title: "CIA Silent Runner",
        description:
          "A CIA courier infiltrating the Organization through errands and whispers.",
        values: {
          name: "Leah Morgan",
          cover: "Bilingual barista delivering coded drinks to Organization safe houses",
          skills: "Counter-surveillance, lip-reading, quick disguises",
          support: "FBI handler Camel and a watch communicator tuned to Conan",
          personality: "Efficient, cautious, prone to dry sarcasm",
          nemesis: "Tracking the codename Vermouth to expose their newest double agent",
          backstory:
            "Joined the CIA after her mentor vanished while tailing a Black Organization courier in New York.",
        },
      },
      {
        title: "Eden Academy Plant",
        description:
          "A teenager posing as a prodigy to spy on elite families for evidence.",
        values: {
          name: "Junpei Sato",
          cover: "Scholarship student at Tohto Academy's honors division",
          skills: "Photographic memory and speed-solving logic puzzles",
          support: "Miniature camera tie from Agasa and Sonoko's society invitations",
          personality: "Polite, calculating, hides righteous anger",
          nemesis: "A blackmailer targeting politicians through their children",
          backstory:
            "His mother was wrongfully imprisoned due to fabricated evidence; Junpei infiltrates elite circles to destroy the forger.",
        },
      },
      {
        title: "Osaka Gadgeteer",
        description:
          "A Kansai inventor crafting gadgets for Heiji's investigations.",
        values: {
          name: "Tsubasa Yagami",
          cover: "Electronics club president and part-time shrine caretaker",
          skills: "Evidence preservation and radio triangulation",
          support: "Custom drone crow, Kazuha's martial backup, Heiji's trust",
          personality: "Boisterous, loyal, loves dramatic reveals",
          nemesis: "A phantom thief stealing national treasures under moonless skies",
          backstory:
            "Built his first gadget to protect the family shrine bells from vandals hired by land developers.",
        },
      },
      {
        title: "Undercover Idol",
        description:
          "An idol using her fame to lure out stalkers tied to secret experiments.",
        values: {
          name: "Miko Aihara",
          cover: "Chart-topping idol touring nationwide",
          skills: "Crowd pattern analysis and subliminal clue planting during shows",
          support: "Bodyguard from the Metropolitan Police and Haibara's chemical scanners",
          personality: "Outgoing on stage, introspective in private, fearless for fans",
          nemesis: "A pharmaceutical conglomerate testing drugs on obsessive fans",
          backstory:
            "Her childhood friend disappeared after attending a secret fan event; she rebuilt her career to infiltrate the sponsors behind it.",
        },
      },
    ],
  },
  "disney-oc-maker": {
    fields: [
      { key: "name", question: "What is your character's name?" },
      { key: "homeland", question: "What is their homeland or kingdom?" },
      {
        key: "role",
        question: "What role do they play (hero, villain, sidekick, etc.)?",
      },
      {
        key: "magic",
        question: "What is their signature companion or magic?",
      },
      {
        key: "personality",
        question: "How would you describe their personality?",
      },
      {
        key: "wish",
        question: "What wish or lesson defines them?",
      },
      {
        key: "backstory",
        question: "Share a backstory snapshot.",
      },
    ],
    examples: [
      {
        title: "Aurora's New Guardian",
        description:
          "A forest ranger protecting enchanted creatures with song magic.",
        values: {
          name: "Elowen Bright",
          homeland: "Enchanted Moors neighboring the Kingdom of Aldore",
          role: "Heroic guardian",
          magic: "Luminous lark companion that harmonizes protective spells",
          personality: "Gentle, adventurous, brimming with wonder",
          wish: "To prove kindness can tame any dark forest",
          backstory:
            "Raised by pixies after a storm separated her from her caravan, she now guides travelers through the glowing woods.",
        },
      },
      {
        title: "Switcheroo Sidekick",
        description:
          "A mischievous raccoon-turned-boy navigating city streets with flair.",
        values: {
          name: "Rory Swift",
          homeland: "Crown City, the bustling capital of Luminara",
          role: "Sidekick with a flair for pickpocket heroics",
          magic: "Charm coin that lets him swap places with any small animal",
          personality: "Playful, quick-witted, loyal to a fault",
          wish: "To finally return the coin he once stole and earn forgiveness",
          backstory:
            "After pocketing a royal treasure, a curse made him a raccoon until a princess taught him honesty and gave him a second chance.",
        },
      },
      {
        title: "Seafaring Villainess",
        description:
          "A sea witch entrepreneur selling shortcut dreams to sailors.",
        values: {
          name: "Captain Mirella Tide",
          homeland: "Floating bazaar of the Misty Reefs",
          role: "Charismatic villainess",
          magic: "Ledger of Tides that grants wishes at the cost of memories",
          personality: "Charming, calculating, secretly lonely",
          wish: "To rebuild the ship her family lost in a storm",
          backstory:
            "Turned to bargained magic after seeing her fisherfolk village swallowed by whirlpools; now she sells fate-changing contracts at sea.",
        },
      },
      {
        title: "Royal Inventor",
        description:
          "An inventor princess who designs musical machines for festivals.",
        values: {
          name: "Princess Juniper",
          homeland: "Clockwork Kingdom of Belloria",
          role: "Heroic princess inventor",
          magic: "Wind-up dragon companion that powers her inventions",
          personality: "Optimistic, inventive, steadfast",
          wish: "To prove creativity is as noble as bloodline",
          backstory:
            "Built a music machine that stopped a war between rival dukes by harmonizing their anthems into one melody.",
        },
      },
      {
        title: "Desert Storyteller",
        description:
          "A bard weaving tales that come alive under the desert moon.",
        values: {
          name: "Sahir Al-Faye",
          homeland: "Sands of Agrabah's neighboring oasis city",
          role: "Heroic storyteller",
          magic: "Story lantern that projects living illustrations",
          personality: "Warm, empathetic, endlessly imaginative",
          wish: "To keep legends alive so heroes are never forgotten",
          backstory:
            "Learned tales from traveling merchants and now travels with a flying carpet to bring hope to remote villages.",
        },
      },
    ],
  },
  "dragon-ball-oc-maker": {
    fields: [
      { key: "name", question: "What is your character's name?" },
      {
        key: "race",
        question: "What is their race and power level context?",
      },
      {
        key: "style",
        question: "What fighting style or school do they follow?",
      },
      {
        key: "techniques",
        question: "What signature techniques or transformations do they wield?",
      },
      {
        key: "personality",
        question: "How would you describe their personality?",
      },
      {
        key: "goal",
        question: "Who is their rival or what goal do they chase?",
      },
      {
        key: "backstory",
        question: "Share a backstory snapshot.",
      },
    ],
    examples: [
      {
        title: "Saiyan Scholar",
        description:
          "A half-Saiyan balancing research with gravity chamber sparring.",
        values: {
          name: "Lyra Son",
          race: "Half-Saiyan, latent potential equal to Super Saiyan Blue",
          style: "Hybrid style combining Turtle School fundamentals and Galactic Patrol tactics",
          techniques: "Stellar Burst Kamehameha, Super Saiyan God form",
          personality: "Curious, compassionate, fiercely determined",
          goal: "To surpass Gohan in both intellect and power levels",
          backstory:
            "Studied alien biology on Yardrat and returned to Earth to protect capsule research from Frieza Force remnants.",
        },
      },
      {
        title: "Namekian Guardian",
        description:
          "A Namekian warrior-priest safeguarding the Dragon Clan's secrets.",
        values: {
          name: "Korinma",
          race: "Namekian Dragon Clan warrior with high power suppression",
          style: "Spirit-style combat focused on ki barriers and staff forms",
          techniques: "Dragon Halo Shield, Giant Form, Healing Wave",
          personality: "Stoic, wise, protective of the innocent",
          goal: "To defend the new Dragon Balls from space pirates",
          backstory:
            "Merged with two elder Namekians to gain their knowledge after their village was raided by Moro's henchmen.",
        },
      },
      {
        title: "Galactic Patrol Ace",
        description:
          "An elite patrol officer specializing in pursuit of interstellar criminals.",
        values: {
          name: "Tarin Jax",
          race: "Tuffle survivor armed with cutting-edge scouters",
          style: "Galactic Patrol aerial combat and joint locks",
          techniques: "Photon Lariat, Ultra Instinct Sign (partial mastery)",
          personality: "Confident, law-abiding, jokes under pressure",
          goal: "To capture a rogue Heeter who stole Tuffle tech",
          backstory:
            "Grew up in a refugee colony orbiting Planet Vegeta's ruins and swore to stop cosmic war profiteers.",
        },
      },
      {
        title: "Earthling Martial Artist",
        description:
          "A human champion blending Crane School precision with modern MMA.",
        values: {
          name: "Mika Ishido",
          race: "Earthling with power level rivaling Super Saiyan 2",
          style: "Crane School strikes fused with Capsule Corp kinetic gear",
          techniques: "Tri-Beam Nova, Gravity Burst Step, Ki Barrier Fist",
          personality: "Disciplined, humble, hungry for challenge",
          goal: "To defeat Vegeta in a sanctioned friendly tournament",
          backstory:
            "Won the Tenkaichi Budokai by debuting gravity training suits co-developed with Bulma.",
        },
      },
      {
        title: "Time Patroller",
        description:
          "A chronal guardian fixing distortions across multiple timelines.",
        values: {
          name: "Chrona Vega",
          race: "Saiyan-Earthling hybrid recruited by the Time Patrol",
          style: "Time Patrol Swordsmanship with Instant Transmission mix",
          techniques:
            "Chrono Slash, Super Saiyan 4 Limit Breaker, Warp Kiai",
          personality: "Resolute, analytical, rarely surprised",
          goal: "To prevent Demon God Demigra from rewriting Bardock's sacrifice",
          backstory:
            "Witnessed her own timeline collapse and now travels with Trunks to safeguard pivotal battles.",
        },
      },
    ],
  },
  "frieren-oc-maker": {
    fields: [
      { key: "name", question: "What is your character's name?" },
      {
        key: "race",
        question: "What is their race and expected lifespan?",
      },
      {
        key: "specialty",
        question: "What magical specialty do they excel in?",
      },
      {
        key: "companions",
        question: "Who are their traveling companions or guild?",
      },
      {
        key: "personality",
        question: "How would you describe their personality?",
      },
      {
        key: "goal",
        question: "What core regret or goal shapes their journey?",
      },
      {
        key: "backstory",
        question: "Share a journey backstory snapshot.",
      },
    ],
    examples: [
      {
        title: "Millennia Archivist",
        description:
          "An elf chronicler preserving spells before time erases them.",
        values: {
          name: "Althea Lysiel",
          race: "Elf mage expected to live another 700 years",
          specialty: "Memory-anchoring magic that stores spells in crystal tomes",
          companions: "Travels with a dwarf cartographer and a young human archivist",
          personality: "Gentle, absentminded, nostalgic",
          goal: "To record every spell she witnessed the Hero Party cast",
          backstory:
            "Missed Himmel's final celebration while copying spells; now retraces old ruins to honor his legacy.",
        },
      },
      {
        title: "Regretful Hero",
        description:
          "A human swordsman ageing quickly while chasing lost time with his mentor.",
        values: {
          name: "Gideon Hart",
          race: "Human veteran nearing the end of his lifespan",
          specialty: "Sword-enhancing magic learned from Frieren",
          companions: "Journeys with an orphaned demon seer and a priestess",
          personality: "Stoic, reflective, quietly humorous",
          goal: "To revisit the battlefields where he fought beside Frieren and apologize for parting abruptly",
          backstory:
            "Abandoned the Hero Party to protect his village, only to return decades later and find everyone older or gone.",
        },
      },
      {
        title: "Demon Historian",
        description:
          "A demon scholar cataloging human kindness to challenge old dogma.",
        values: {
          name: "Selica",
          race: "Demon with a lifespan tied to absorbed mana",
          specialty: "Illusion dispelling and empathy mirroring magic",
          companions: "Travels alone but corresponds with Frieren via enchanted letters",
          personality: "Soft-spoken, curious, cautiously hopeful",
          goal: "To prove demons can coexist by documenting acts of mercy",
          backstory:
            "Spared by Fern during a skirmish, Selica vowed to repay the grace by chronicling peaceful encounters.",
        },
      },
      {
        title: "Wandering Disciple",
        description:
          "A mage apprentice retracing Frieren's exam routes to test herself.",
        values: {
          name: "Mira Feld",
          race: "Human mage with extended life thanks to stasis charms",
          specialty: "Barrier magic infused with nature spirits",
          companions: "Travels with an enchanted fox familiar and a stoic warrior",
          personality: "Determined, studious, endearingly awkward",
          goal: "To pass the first-class mage exam using only spells she learned from strangers",
          backstory:
            "Inspired by Frieren's kindness during the exam, she now repays strangers by teaching the spells she collects.",
        },
      },
      {
        title: "Ancient Priest",
        description:
          "A centuries-old cleric rediscovering faith through new friendships.",
        values: {
          name: "Brother Caelum",
          race: "Human blessed with slowed aging by the Goddess",
          specialty: "Miracle amplification through chanted runes",
          companions: "Keeps company with traveling bards and orphan caretakers",
          personality: "Warm, forgiving, quietly burdened",
          goal: "To rebuild a shrine destroyed during the Demon King's reign",
          backstory:
            "Was the last survivor of his order; Frieren once visited his ruined abbey, inspiring him to travel again.",
        },
      },
    ],
  },
  "genshin-impact-oc-maker": {
    fields: [
      { key: "name", question: "What is your character's name?" },
      {
        key: "nation",
        question: "Which nation and affiliation do they belong to?",
      },
      {
        key: "vision",
        question: "What Vision/element and weapon do they wield?",
      },
      {
        key: "role",
        question: "What combat role do they fill?",
      },
      {
        key: "personality",
        question: "How would you describe their personality?",
      },
      {
        key: "quest",
        question: "What is their signature Story Quest about?",
      },
      {
        key: "backstory",
        question: "Share a backstory snapshot.",
      },
    ],
    examples: [
      {
        title: "Mondstadt Wind Bard",
        description:
          "A tavern bard whose songs shatter Anemo barriers and hearts alike.",
        values: {
          name: "Lysette",
          nation: "Mondstadt, Favonius-affiliated freelance bard",
          vision: "Anemo Vision wielding a catalyst",
          role: "Supportive burst DPS who shreds enemy resistances",
          personality: "Free-spirited, teasing, quietly empathetic",
          quest: "Helps reconnect estranged siblings through a windborne concert tour",
          backstory:
            "Granted a Vision after calming a dragonstorm with her lullaby, she now protects wandering merchants along the high cliffs.",
        },
      },
      {
        title: "Liyue Harbor Inspector",
        description:
          "A civil inspector balancing paperwork with geo-construct martial arts.",
        values: {
          name: "Qiao Rong",
          nation: "Liyue Qixing logistics division",
          vision: "Geo Vision paired with a polearm",
          role: "Burst tank providing shields and control",
          personality: "Methodical, dutiful, caring beneath a stern exterior",
          quest: "Investigates counterfeit adepti sigils disrupting harbor trade",
          backstory:
            "Survived a Fatui sabotage attempt by raising a geo barrier that saved an entire dockyard crew.",
        },
      },
      {
        title: "Inazuma Onsen Owner",
        description:
          "A hot spring owner channeling Electro energy through spa rituals.",
        values: {
          name: "Hotaru",
          nation: "Inazuma, civilian allied with the Shogunate",
          vision: "Electro Vision embedded in a catalyst fan",
          role: "Healer-buffer cleansing debuffs and boosting energy",
          personality: "Serene, witty, fiercely proud of tradition",
          quest: "Restores sacred springs corrupted by Tatarigami remnants",
          backstory:
            "Inherited the onsen from her grandmother and earned her Vision when defending it against Vision Hunt Decree agents.",
        },
      },
      {
        title: "Sumeru Scholar",
        description:
          "A desert scholar wielding Dendro constructs to solve ecological crises.",
        values: {
          name: "Farid al-Hakim",
          nation: "Sumeru Akademiya, Rtawahist Darshan",
          vision: "Dendro Vision with a bow",
          role: "Off-field enabler spreading Dendro reactions",
          personality: "Inquisitive, earnest, occasionally scatterbrained",
          quest: "Assists the Traveler in restoring withering oases",
          backstory:
            "Discovered his Vision when a sandstorm threatened his research camp; the Dendro energy sprouted protective flora.",
        },
      },
      {
        title: "Fontaine Advocate",
        description:
          "A legal prodigy whose Hydro constructs cross-examine criminals mid-battle.",
        values: {
          name: "Celeste Beaumont",
          nation: "Fontaine Court of Justice",
          vision: "Hydro Vision wielding a sword",
          role: "Main DPS performing Hydro-infused combos",
          personality: "Charismatic, principled, delightfully dramatic",
          quest: "Defends an innocent clockwork automaton accused of sabotage",
          backstory:
            "Received her Vision during a courtroom duel when she proved a false witness guilty using Hydro illusions.",
        },
      },
    ],
  },
  "haikyuu-oc-maker": {
    fields: [
      { key: "name", question: "What is your character's name?" },
      {
        key: "school",
        question: "What school and year are they in?",
      },
      { key: "position", question: "What position do they play?" },
      {
        key: "style",
        question: "What is their signature playstyle or weapon?",
      },
      {
        key: "personality",
        question: "How would you describe their personality?",
      },
      {
        key: "goal",
        question: "Who is their rival or what goal drives them?",
      },
      {
        key: "backstory",
        question: "Share a volleyball backstory snapshot.",
      },
    ],
    examples: [
      {
        title: "Karasuno Setter",
        description:
          "A first-year setter pushing tempo to match the Freak Quick.",
        values: {
          name: "Haruto Ise",
          school: "Karasuno High, first-year",
          position: "Setter",
          style: "High-speed jump sets launched from unlikely angles",
          personality: "Focused, self-critical, quietly determined",
          goal: "To create a new super quick that surprises even Hinata",
          backstory:
            "Transferred from a basketball program and begged Coach Ukai for a chance after seeing Karasuno's Nationals run.",
        },
      },
      {
        title: "Nekoma Libero",
        description:
          "A libero studying cats to perfect her reflexes and reads.",
        values: {
          name: "Mika Kozume",
          school: "Nekoma High, second-year",
          position: "Libero",
          style: "Rolling receivers and one-handed pancake saves",
          personality: "Playful, analytical, fiercely supportive",
          goal: "To dethrone Karasuno in the Battle of the Garbage Dump rematch",
          backstory:
            "Is Kenma's cousin; she trains by reacting to laser pointers with shelter cats.",
        },
      },
      {
        title: "Fukurodani Ace",
        description:
          "A successor candidate studying Bokuto's mood swings to stabilize the team.",
        values: {
          name: "Rika Aioi",
          school: "Fukurodani Academy, third-year",
          position: "Wing spiker",
          style: "Power tips combined with line-shot bombardment",
          personality: "Energetic, encouraging, thrives on big moments",
          goal: "To lead Fukurodani back to Nationals after Bokuto graduates",
          backstory:
            "Bokuto mentored her after she cheered him out of a slump during a summer camp scrimmage.",
        },
      },
      {
        title: "Aoba Johsai Blocker",
        description:
          "A middle blocker obsessed with reading setters before they move.",
        values: {
          name: "Keita Sendai",
          school: "Seijoh, second-year",
          position: "Middle blocker",
          style: "Anticipation-based blocks and feint slides",
          personality: "Calm, strategic, perfectionist",
          goal: "To shut down Kageyama's quicks in their next regional final",
          backstory:
            "Joined the team after watching Oikawa's precise sets inspire his junior high club to reach prefecturals.",
        },
      },
      {
        title: "MSBY Analyst",
        description:
          "A college statistician testing pro-level tactics in club scrimmages.",
        values: {
          name: "Nao Miyake",
          school: "Adlers University Club, graduate student",
          position: "Opposite hitter and analyst",
          style: "Back-row pipe attacks paired with statistical serve targeting",
          personality: "Studious, upbeat, always scribbling notes",
          goal: "To earn a development contract with the MSBY Black Jackals",
          backstory:
            "Interned with Coach Foster and designed a data dashboard Hinata praised during training camp.",
        },
      },
    ],
  },
  "hells-paradise-oc-maker": {
    fields: [
      { key: "name", question: "What is your character's name?" },
      {
        key: "origin",
        question: "What is their origin and role (convict or executioner)?",
      },
      {
        key: "style",
        question: "What fighting style and weapon do they use?",
      },
      {
        key: "tao",
        question: "What Tao aptitude or shinobi techniques do they possess?",
      },
      {
        key: "personality",
        question: "How would you describe their personality?",
      },
      { key: "goal", question: "What treasure or goal do they seek?" },
      {
        key: "backstory",
        question: "Share a backstory snapshot.",
      },
    ],
    examples: [
      {
        title: "Iwagakure Survivor",
        description:
          "A shinobi convict wielding chained sickles in hopes of pardon.",
        values: {
          name: "Hana Suiren",
          origin: "Former Iwagakure assassin sentenced to Shinsenkyo",
          style: "Dual kusarigama strikes combined with acrobatic flips",
          tao: "Balanced Tao flow allowing her to counter Tensen petals",
          personality: "Calm, calculating, fiercely loyal once trust is earned",
          goal: "To secure a pardon and rescue her sibling sold into slavery",
          backstory:
            "Refused to kill a child target, resulting in her imprisonment; now fights to redeem that choice.",
        },
      },
      {
        title: "Yamada Asaemon Disciple",
        description:
          "A novice executioner documenting every battle with scholarly care.",
        values: {
          name: "Asaemon Retsu",
          origin: "Yamada Asaemon probationary executioner",
          style: "Iaido-style katana draws infused with precise anatomy strikes",
          tao: "Limited Tao perception focused on sensing fear tremors",
          personality: "Stoic, dutiful, quietly empathetic toward convicts",
          goal: "To return with accurate records that prevent future doomed missions",
          backstory:
            "Retsu volunteered to document Shinsenkyo after losing a mentor to rumors of immortality.",
        },
      },
      {
        title: "Deserted Pirate",
        description:
          "A pirate convict whose cannon expertise now fuels explosive traps.",
        values: {
          name: "Bora Umigami",
          origin: "Convicted pirate captain sent to the island",
          style: "Weighted chain-cannon repurposed as a portable mortar",
          tao: "Harnesses Tao through rhythmic sea shanties that stabilize breathing",
          personality: "Boisterous, reckless, fiercely protective of allies",
          goal: "To obtain the Elixir and rebuild his lost crew as a legitimate fleet",
          backstory:
            "His crew was slaughtered by shogunate soldiers; he seeks amnesty so the survivors can live openly.",
        },
      },
      {
        title: "Junshi Defector",
        description:
          "A Tensen experiment who turned on their creators to regain humanity.",
        values: {
          name: "Kagura",
          origin: "Former Junshi guardian now aiding the intruders",
          style: "Petal-blade fans and morphing Tao-flower whips",
          tao: "High-level Tao manipulation granting rapid regeneration",
          personality: "Elegant, hauntingly serene, burdened by guilt",
          goal: "To destroy the Tensen root to free other captured humans",
          backstory:
            "Once human, she was molded into a Junshi but broke free after remembering her brother's lullaby.",
        },
      },
      {
        title: "Temple Monk",
        description:
          "A monk executioner mastering meditation to stave off the island's madness.",
        values: {
          name: "Shuzen",
          origin: "Monk recruited by the shogunate as an executioner",
          style: "Staff techniques using prayer beads tipped with blades",
          tao: "Aligns Tao through chanting sutras that calm allies",
          personality: "Serene, resolute, prone to philosophical musings",
          goal: "To obtain the Elixir and cure a plague ravaging his temple",
          backstory:
            "He agreed to the mission after watching his abbey fall to a mysterious illness the Elixir might heal.",
        },
      },
    ],
  },
  "honkai-star-rail-oc-maker": {
    fields: [
      { key: "name", question: "What is your character's name?" },
      {
        key: "path",
        question: "Which Path are they aligned with?",
      },
      {
        key: "role",
        question: "What combat role and element do they wield?",
      },
      {
        key: "technique",
        question: "What is their signature Technique or Ultimate?",
      },
      {
        key: "companion",
        question: "Who is their key companion or connection?",
      },
      {
        key: "personality",
        question: "How would you describe their personality?",
      },
      {
        key: "backstory",
        question: "Share their journey backstory.",
      },
    ],
    examples: [
      {
        title: "Xianzhou Cloudpiercer",
        description:
          "A daring archer patrolling the Luofu's trade routes from sky barges.",
        values: {
          name: "Yue Ling",
          path: "The Hunt",
          role: "Single-target DPS wielding Wind element",
          technique: "Technique \"Azure Gale Volley\" rains bolts across flying marauders",
          companion: "Travels with an alchemical foxian engineer",
          personality: "Daring, humorous, treats danger as a dance",
          backstory:
            "Joined the Cloud Knights after pirates attacked her family's merchant ship; now escorts caravans through star-skies.",
        },
      },
      {
        title: "Belobog Mediator",
        description:
          "A Harmony follower bringing warmth to Belobog's undercity.",
        values: {
          name: "Anya Volkova",
          path: "The Harmony",
          role: "Support buffer with Fire element",
          technique: "Ultimate \"Ember Resonance\" grants shields and attack boosts",
          companion: "Close allies with Serval, shares music sessions",
          personality: "Optimistic, empathetic, refuses to give up on unity",
          backstory:
            "Orchestrated peace talks between the surface and underworld after the Eternal Freeze by fusing their hymns into a single melody.",
        },
      },
      {
        title: "Stellaron Hunter Analyst",
        description:
          "A knowledgeable analyst tracking Stellaron phenomena for Kafka.",
        values: {
          name: "Cypher",
          path: "The Nihility",
          role: "Debuff specialist wielding Lightning element",
          technique: "Technique \"Entropy Surge\" lowers enemy resistance and spreads shock",
          companion: "Corresponds with Silver Wolf via encrypted games",
          personality: "Mischievous, elusive, obsessed with data",
          backstory:
            "Once a corporate data miner on Jarilo-VI, they defected after discovering the Stellaron Hunters' true mission.",
        },
      },
      {
        title: "Astral Express Herbalist",
        description:
          "A traveling healer cultivating Gardens of Recollection cuttings on the train.",
        values: {
          name: "Lira",
          path: "The Abundance",
          role: "Healer using Quantum element",
          technique: "Ultimate \"Blooming Reprieve\" restores HP and cleanses debuffs",
          companion: "Tends to a sentient bonsai gifted by Yukong",
          personality: "Kind, serene, quietly teasing",
          backstory:
            "Boarded the Express to gather rare herbs after a Stellaron outbreak decimated her home garden on Xianzhou.",
        },
      },
      {
        title: "Penacony Dreamshaper",
        description:
          "A performer turning dreamscapes into weapons against Nightmare gangsters.",
        values: {
          name: "Marlow",
          path: "The Erudition",
          role: "AoE caster wielding Imaginary element",
          technique: "Technique \"Curtain Call\" traps foes in looping illusions",
          companion: "Partnered with a talking microphone tied to the Family",
          personality: "Flamboyant, compassionate, loves applause",
          backstory:
            "Escaped the Family's control by rewriting their scripts mid-performance and now helps the Express free dreamers.",
        },
      },
    ],
  },
  "hunter-x-hunter-oc-maker": {
    fields: [
      { key: "name", question: "What is your character's name?" },
      {
        key: "status",
        question: "What is their Hunter status or affiliation?",
      },
      { key: "nen", question: "What Nen category do they belong to?" },
      {
        key: "hatsu",
        question: "Describe their Hatsu ability.",
      },
      {
        key: "personality",
        question: "How would you describe their personality?",
      },
      { key: "goal", question: "What goal motivates them?" },
      {
        key: "backstory",
        question: "Share a backstory snapshot.",
      },
    ],
    examples: [
      {
        title: "Beast Hunter",
        description:
          "A licensed hunter cataloging undiscovered species in the Dark Continent.",
        values: {
          name: "Nyala Veld",
          status: "Single-Star Beast Hunter affiliated with the Association",
          nen: "Conjurer",
          hatsu: "Creates Aura Pods that store scents, letting her track any creature later",
          personality: "Curious, fearless, protective of ecosystems",
          goal: "To prove coexistence between humans and Dark Continent fauna is possible",
          backstory:
            "Barely survived a Chimera Ant raid thanks to help from a mysterious beast; vowed to safeguard hybrids thereafter.",
        },
      },
      {
        title: "Mafia Negotiator",
        description:
          "A contract Hunter balancing mafia politics in Meteor City.",
        values: {
          name: "Rex Law",
          status: "Contract Hunter employed by the Five Families",
          nen: "Manipulator",
          hatsu: "Puppet Strings of Justice that force criminals to confess when bound",
          personality: "Suave, methodical, morally flexible",
          goal: "To dismantle the black market arms route fueling Phantom Troupe raids",
          backstory:
            "Grew up in Meteor City and lost his brother to a smuggling deal gone wrong; now he negotiates to protect locals.",
        },
      },
      {
        title: "Greed Island Speedrunner",
        description:
          "An avid gamer using Nen combos to clear Greed Island dungeons first.",
        values: {
          name: "Lina Byte",
          status: "Double-Star Treasure Hunter and pro streamer",
          nen: "Emitter",
          hatsu: "Pixel Burst lets her convert cards into temporary energy constructs",
          personality: "Energetic, competitive, loves showing off",
          goal: "To unlock Greed Island's rumored sequel and archive every card",
          backstory:
            "Won her license by broadcasting a live infiltration of a mafia vault without casualties.",
        },
      },
      {
        title: "Kurta Archivist",
        description:
          "A survivor chronicling Kurta history while hunting down scarlet eye collectors.",
        values: {
          name: "Thane Kurta",
          status: "Unlicensed Hunter traveling with Kurapika's network",
          nen: "Specialist",
          hatsu: "Scarlet Ledger conjures chains that record every stolen eye",
          personality: "Solemn, driven, quietly compassionate",
          goal: "To recover the last scarlet eyes held by underground auctioneers",
          backstory:
            "Escaped the massacre by hiding in a hidden shrine; now trades intel with Kurapika to bring closure to his clan.",
        },
      },
      {
        title: "NGL Healer",
        description:
          "A reformed NGL citizen using Nen to detoxify Chimera Ant residues.",
        values: {
          name: "Juniper Rae",
          status: "Apprentice Hunter sponsored by Kite's followers",
          nen: "Transmuter",
          hatsu: "Purity Bloom converts toxins into harmless spores",
          personality: "Patient, empathetic, quietly resilient",
          goal: "To help rebuild NGL without repeating its isolationist mistakes",
          backstory:
            "Lost her parents to drug overdoses; after the Ant invasion she studied Nen to cleanse the land.",
        },
      },
    ],
  },
  "jojo-oc-maker": {
    fields: [
      { key: "name", question: "What is your character's name?" },
      {
        key: "stand",
        question: "What is their Stand or power name and ability?",
      },
      {
        key: "era",
        question: "Which era or part are they aligned with?",
      },
      {
        key: "style",
        question: "What is their combat style?",
      },
      {
        key: "personality",
        question: "How would you describe their personality?",
      },
      {
        key: "weakness",
        question: "What weakness or condition limits their Stand?",
      },
      {
        key: "backstory",
        question: "Share a backstory snapshot.",
      },
    ],
    examples: [
      {
        title: "Steel Ball Run Racer",
        description:
          "A desert racer channeling sandstorms through a melodic Stand.",
        values: {
          name: "Amelia Creed",
          stand: "Stand: Sand Sonata — manipulates sonic sand waves that cut with rhythm",
          era: "Steel Ball Run era, allied with Johnny Joestar",
          style: "Horseback spin techniques blending harmonica cues",
          personality: "Determined, soulful, loyal to fellow racers",
          weakness: "Stand loses cohesion if the music stops mid-phrase",
          backstory:
            "Joined the race to fund her family's struggling ranch and quickly became an ally in the battle for the Corpse Parts.",
        },
      },
      {
        title: "Passione Accountant",
        description:
          "A Passione member balancing ledgers while eliminating traitors.",
        values: {
          name: "Riccardo Ventresca",
          stand: "Stand: Tax Audit — freezes targets by calculating their life debt",
          era: "Part 5, Passione reform faction",
          style: "Close-range grappling mixed with precise Stand strikes",
          personality: "Calm, dryly sarcastic, obsessed with order",
          weakness: "Requires knowing the target's real name and financial record",
          backstory:
            "Bucciarati recruited him after he exposed a capo laundering funds for Diavolo.",
        },
      },
      {
        title: "Morioh Artisan",
        description:
          "A local artist whose Stand turns sketches into temporary allies.",
        values: {
          name: "Aki Higashikata",
          stand: "Stand: Ink Heart — animates drawings for exactly 77 seconds",
          era: "Diamond is Unbreakable era",
          style: "Mid-range tactics using animated graffiti to surround foes",
          personality: "Creative, compassionate, lightly mischievous",
          weakness: "If the drawing is smudged, the Stand collapses instantly",
          backstory:
            "A childhood friend of Koichi, she discovered her Stand while sketching a guardian to protect Morioh's shopping district.",
        },
      },
      {
        title: "Stardust Explorer",
        description:
          "An archaeologist aiding the Crusaders across Egypt.",
        values: {
          name: "Dr. Samir Rashid",
          stand: "Stand: Pharaonic Echo — summons spectral guardians from artifacts",
          era: "Stardust Crusaders journey",
          style: "Support combat, providing barriers and historical insight",
          personality: "Scholarly, witty, unflappable in crises",
          weakness: "Needs a relic with personal history to manifest guardians",
          backstory:
            "Rescued by Joseph Joestar from a curse, he repaid the favor by guiding the Crusaders through ancient tombs.",
        },
      },
      {
        title: "Stone Ocean Inmate",
        description:
          "A Green Dolphin Street prisoner using origami-based offense.",
        values: {
          name: "Marina Fold",
          stand: "Stand: Paper Chains — folds paper into razor-thin constructs that obey commands",
          era: "Stone Ocean",
          style: "Trap-based close combat and prison corridor ambushes",
          personality: "Resilient, resourceful, harboring quiet rage",
          weakness: "Paper disintegrates if soaked, nullifying the Stand",
          backstory:
            "Framed for embezzlement by Whitesnake loyalists, she allies with Jolyne while seeking proof of her innocence.",
        },
      },
    ],
  },
  "jujutsu-kaisen-oc-maker": {
    fields: [
      { key: "name", question: "What is your character's name?" },
      {
        key: "grade",
        question: "What is their Jujutsu grade and affiliation?",
      },
      {
        key: "technique",
        question: "What is their Innate Technique?",
      },
      {
        key: "domain",
        question: "Describe their Domain Expansion or barrier ability.",
      },
      {
        key: "personality",
        question: "How would you describe their personality?",
      },
      {
        key: "vows",
        question: "What binding vows or weaknesses define them?",
      },
      {
        key: "backstory",
        question: "Share a backstory snapshot.",
      },
    ],
    examples: [
      {
        title: "Tokyo Second-Year",
        description:
          "A Tokyo student whose ink-based sorcery paints battlefields in sigils.",
        values: {
          name: "Hikari Sumi",
          grade: "Grade 2 sorcerer, Tokyo Jujutsu High second-year",
          technique: "Ink Current Technique—controls cursed sumi-ink to form moving glyphs",
          domain: "Domain Expansion: Black Tide Gallery traps foes in a rotating ink museum",
          personality: "Artistic, enthusiastic, fiercely loyal to classmates",
          vows: "Power doubles if she recites a haiku mid-fight, but she loses control if any syllable is off",
          backstory:
            "Inherited ancient calligraphy brushes from her grandmother, awakening her technique when a curse attacked their gallery.",
        },
      },
      {
        title: "Zen'in Outcast",
        description:
          "A Zen'in clan defectee specializing in improvised cursed weapons.",
        values: {
          name: "Zen'in Chika",
          grade: "Semi-Grade 1 sorcerer turned freelancer",
          technique: "Shard Arsenal—manifest cursed glass daggers that redirect projectiles",
          domain: "Simple Domain: Mirror Pavilion reflecting attacks threefold",
          personality: "Reserved, strategic, quietly furious at clan politics",
          vows: "Cannot attack first; damage doubles if struck before retaliating",
          backstory:
            "Fled the clan after refusing to betray Maki; now works with Megumi to dismantle the Zen'in power structure.",
        },
      },
      {
        title: "Kyoto Instructor",
        description:
          "A Kyoto faculty member mentoring rookies while shielding civilians.",
        values: {
          name: "Shun Aoba",
          grade: "First-grade instructor at Kyoto school",
          technique: "Aegis Chant—projects musical notes that negate cursed techniques",
          domain: "Barrier: Hymn Basilica amplifies allies' techniques inside",
          personality: "Calm, paternal, prone to bad puns",
          vows: "If he protects civilians first, his barriers triple in strength; otherwise they shatter",
          backstory:
            "Former choir prodigy whose entire ensemble was cursed; he dedicated his voice to protecting other performers.",
        },
      },
      {
        title: "Culling Game Nomad",
        description:
          "A participant leveraging weather manipulation to survive deadly colonies.",
        values: {
          name: "Rei Hayashida",
          grade: "Grade 1 sorcerer roaming Culling Game colonies",
          technique: "Storm Needle—summons localized lightning spears",
          domain: "Domain: Tempest Cage swirling winds and electrified rain",
          personality: "Restless, daring, fiercely protective of civilians trapped inside",
          vows: "Each lightning strike drains her stamina unless she shouts the target's full name",
          backstory:
            "Entered the Culling Game voluntarily to rescue her younger brother, earning points by disarming lethal sorcerers.",
        },
      },
      {
        title: "Curse Researcher",
        description:
          "A sorcerer-scientist partnering with Mei Mei to monetize curse hunts.",
        values: {
          name: "Dr. Koga",
          grade: "Grade 2 analyst working with Mei Mei's agency",
          technique: "Dissection Eyes—identifies curse weak points in a glance",
          domain: "Barrier Technique: Surgical Theatre slows time within a scalpel radius",
          personality: "Analytical, pragmatic, dry sense of humor",
          vows: "Must donate 10% of earnings to orphaned students or lose access to the barrier",
          backstory:
            "Was a medical student until a curse took over the anatomy lab; saved by Mei Mei, he now dissects curses for profit and justice.",
        },
      },
    ],
  },
  "kaguya-sama-oc-maker": {
    fields: [
      { key: "name", question: "What is your character's name?" },
      {
        key: "role",
        question: "What is their year and role at Shuchiin?",
      },
      {
        key: "standing",
        question: "What social standing or family influence do they have?",
      },
      {
        key: "strategy",
        question: "What signature strategy or talent do they wield?",
      },
      {
        key: "personality",
        question: "How would you describe their personality?",
      },
      {
        key: "challenge",
        question: "What romantic challenge are they facing?",
      },
      {
        key: "backstory",
        question: "Share a backstory snapshot.",
      },
    ],
    examples: [
      {
        title: "Student Council Treasurer",
        description:
          "A numbers genius balancing budgets and secret admirers.",
        values: {
          name: "Airi Kanzaki",
          role: "Second-year, student council treasurer",
          standing: "Heiress of a Tokyo tech conglomerate",
          strategy: "Uses algorithmic love charts to predict confession timing",
          personality: "Composed, polite, secretly competitive",
          challenge: "Wants Miyuki's advice to confess to Ishigami without losing face",
          backstory:
            "Transferred from an overseas academy and immediately caught Fujiwara's eye for her beatboxing abilities during orientation.",
        },
      },
      {
        title: "Public Morals Enforcer",
        description:
          "A stern committee member hiding a love of shojo manga.",
        values: {
          name: "Yume Saionji",
          role: "Third-year, public morals chair",
          standing: "Old-money family with ties to the Shinomiya conglomerate",
          strategy: "Writes rule amendments that corner her crush into private study sessions",
          personality: "Disciplined, tsundere, secretly romantic",
          challenge: "Terrified her shojo stash will be exposed before she confesses to Hayasaka's cousin",
          backstory:
            "Was childhood rivals with Kaguya in etiquette classes until they formed a mutual respect pact.",
        },
      },
      {
        title: "Drama Club Lead",
        description:
          "A charismatic actor planning a confession through the school play.",
        values: {
          name: "Itsuki Arata",
          role: "First-year, drama club lead actor",
          standing: "Scholarship student from a modest family",
          strategy: "Directs a romantic comedy play with improvised confession cues",
          personality: "Energetic, theatrical, earnest",
          challenge: "Fears Kaguya will outmaneuver his improvised confession scene",
          backstory:
            "Saved the drama club from disbanding by convincing Kaguya to sponsor their festival production.",
        },
      },
      {
        title: "Cheer Club Strategist",
        description:
          "A cheer strategist creating viral support videos for the council.",
        values: {
          name: "Mina Tachikawa",
          role: "Second-year, cheer club strategist",
          standing: "New money influencer family expanding into entertainment",
          strategy: "Edits social media campaigns to sway student council elections",
          personality: "Trendy, sharp-tongued, secretly soft-hearted",
          challenge: "Falling for a shy photography club member who avoids the spotlight",
          backstory:
            "Became Fujiwara's video partner after a dance challenge collaboration went viral.",
        },
      },
      {
        title: "Library Prefect",
        description:
          "A library prefect orchestrating matchmaking through book recommendations.",
        values: {
          name: "Haruka Minase",
          role: "Third-year, library committee head",
          standing: "Descendant of a literary dynasty",
          strategy: "Curates reading lists that mirror students' hidden feelings",
          personality: "Soft-spoken, insightful, quietly mischievous",
          challenge: "Designs a book trail hoping Kaguya notices Shirogane's hidden poem",
          backstory:
            "Inspired by Shinomiya's public relations work, she aims to revive the school's neglected literary salon.",
        },
      },
    ],
  },
  "league-of-legends-oc-maker": {
    fields: [
      { key: "name", question: "What is your character's name?" },
      {
        key: "region",
        question: "Which region or faction do they hail from?",
      },
      {
        key: "class",
        question: "What is their class or combat role?",
      },
      {
        key: "theme",
        question: "What is the theme of their ability kit?",
      },
      {
        key: "personality",
        question: "How would you describe their personality?",
      },
      {
        key: "goal",
        question: "What ultimate goal drives them?",
      },
      {
        key: "backstory",
        question: "Share a lore backstory snapshot.",
      },
    ],
    examples: [
      {
        title: "Demacian Lightbearer",
        description:
          "A ranger-knight channeling prism magic to protect refugees.",
        values: {
          name: "Seren Caelum",
          region: "Demacia",
          class: "Support marksman",
          theme: "Prismatic arrows creating shielded light corridors",
          personality: "Honorable, compassionate, protective",
          goal: "To prove Demacia can embrace magic responsibly",
          backstory:
            "Smuggled persecuted mages to safety and formed a coalition with Lux to reform Demacian law.",
        },
      },
      {
        title: "Noxian Bladestorm",
        description:
          "An exile assassin weaving chain blades through warzones.",
        values: {
          name: "Varrox",
          region: "Noxus",
          class: "Fighter-assassin",
          theme: "Chain hooks that siphon resolve from enemies",
          personality: "Cold, tactical, secretly honorable",
          goal: "To dethrone the warlord who massacred his warband",
          backstory:
            "Betrayed during the Ionian campaign, he now leads a covert rebellion of exiled legionnaires.",
        },
      },
      {
        title: "Piltover Artificer",
        description:
          "A Yordle inventor piloting a mech tuned for crowd control.",
        values: {
          name: "Tinks",
          region: "Piltover & Zaun",
          class: "Tank support",
          theme: "Steam-powered mech with magnetic shield pulses",
          personality: "Playful, ingenious, easily distracted",
          goal: "To build a cross-city transit system safer than Hextech portals",
          backstory:
            "Quit working for the Chem-Barons after witnessing Zaunite workers exploited, now protects protest marches.",
        },
      },
      {
        title: "Ionia Spirit Dancer",
        description:
          "A guardian weaving spirit blossoms into razor-sharp ribbons.",
        values: {
          name: "Hana Fuyori",
          region: "Ionia",
          class: "Enchanter mage",
          theme: "Spirit blossom ribbons that heal allies and bind foes",
          personality: "Serene, empathetic, resolute",
          goal: "To heal the Navori forests scarred by war",
          backstory:
            "Guided Yasuo's refugees through the Spirit Blossom festival, earning the favor of the spirits.",
        },
      },
      {
        title: "Shuriman Ascendant",
        description:
          "An ascended guardian commanding sandstorm constructs.",
        values: {
          name: "Azareth",
          region: "Shurima",
          class: "Mage bruiser",
          theme: "Sandstorm constructs that shift between offense and defense",
          personality: "Regal, patient, unwavering",
          goal: "To restore the buried libraries beneath the Sun Disc",
          backstory:
            "Was an archivist chosen by Azir's magic to awaken and protect Shurima's lost history from the Ascended betrayers.",
        },
      },
    ],
  },
  "marvel-oc-maker": {
    fields: [
      { key: "name", question: "What is your character's name?" },
      {
        key: "alterego",
        question: "What is their alter ego and alignment?",
      },
      {
        key: "powers",
        question: "What powers or technology do they wield?",
      },
      {
        key: "teams",
        question: "Which teams or organizations are they affiliated with?",
      },
      {
        key: "personality",
        question: "How would you describe their personality?",
      },
      {
        key: "motivation",
        question: "What core motivation drives them?",
      },
      {
        key: "backstory",
        question: "Share an origin story snapshot.",
      },
    ],
    examples: [
      {
        title: "Brooklyn Web Guardian",
        description:
          "A street-level hero swinging between boroughs with energy webs.",
        values: {
          name: "Naomi Ruiz",
          alterego: "Hero name: Silkstrike, alignment: Vigilante hero",
          powers: "Bio-electric webs and wall-crawling from experimental spider DNA",
          teams: "Young Avengers reserve, works with Spider-Man",
          personality: "Snarky, empathetic, relentless",
          motivation: "To protect neighborhoods ignored by bigger heroes",
          backstory:
            "Bitten by a spider during a Roxxon break-in, she stole the antidote to save her mother and now repurposes Roxxon tech to keep streets safe.",
        },
      },
      {
        title: "Stark Industries Designer",
        description:
          "A genius engineer crafting modular suits for global crises.",
        values: {
          name: "Dr. Rhea Patel",
          alterego: "Hero name: Photon Forge, alignment: Avengers consultant",
          powers: "Photon-forged armor able to manipulate light constructs",
          teams: "Avengers support division, S.W.O.R.D. tech collaborator",
          personality: "Brilliant, composed, sly sense of humor",
          motivation: "To ensure Earth stays ahead of interstellar threats",
          backstory:
            "Developed a photon-reactor prototype that foiled a Skrull infiltration and now leads Stark's deep-space defense lab.",
        },
      },
      {
        title: "Klyntar Diplomat",
        description:
          "A reformed symbiote host mediating peace between species.",
        values: {
          name: "Eli Vargas",
          alterego: "Hero name: Accord, alignment: Neutral protector",
          powers: "Symbiote armor with empathic resonance abilities",
          teams: "Guardians of the Galaxy liaison, works with Venom",
          personality: "Calm, stoic, empathetic",
          motivation: "To prove symbiotes can choose harmony over domination",
          backstory:
            "Bonded with a rogue symbiote during a Nova Corps mission and brokered a truce that saved Xandar from a hive uprising.",
        },
      },
      {
        title: "Wakandan Anthropologist",
        description:
          "A Wakandan scholar wielding vibranium constructs to protect culture.",
        values: {
          name: "Imani N'dare",
          alterego: "Hero name: Kinetic Scribe, alignment: Hero",
          powers: "Vibranium tattoo tech projecting hard-light glyph shields",
          teams: "Dora Milaje research unit, World Outreach Center",
          personality: "Wise, passionate, fiercely loyal",
          motivation: "To preserve Wakanda's heritage while sharing knowledge responsibly",
          backstory:
            "Used experimental tattoos to defend artifacts from a Hydra heist, earning Shuri's sponsorship for global outreach missions.",
        },
      },
      {
        title: "Latverian Rebel",
        description:
          "A rogue sorcerer challenging Doom's rule while treading moral gray lines.",
        values: {
          name: "Viktor Danescu",
          alterego: "Code name: Revolt, alignment: Anti-hero",
          powers: "Mystic gunblade channeling chaos magic",
          teams: "Secret alliance with Doctor Strange, Midnight Sons contact",
          personality: "Brooding, charismatic, vengeful",
          motivation: "To liberate his village from Doom's iron grip",
          backstory:
            "Discovered ancient spellbooks hidden beneath Latveria's ruins and now leads a magical resistance cell.",
        },
      },
    ],
  },
  "my-hero-academia-oc-maker": {
    fields: [
      { key: "name", question: "What is your character's name?" },
      {
        key: "affiliation",
        question: "Are they a hero, student, or villain and with which group?",
      },
      {
        key: "quirk",
        question: "Describe their Quirk and its limitations.",
      },
      {
        key: "gear",
        question: "What costume or support gear do they use?",
      },
      {
        key: "personality",
        question: "How would you describe their personality?",
      },
      {
        key: "aspiration",
        question: "What aspiration drives them?",
      },
      {
        key: "backstory",
        question: "Share an origin backstory snapshot.",
      },
    ],
    examples: [
      {
        title: "U.A. Support Course Ace",
        description:
          "A tech whiz combining gadgets with her energy-reflecting Quirk.",
        values: {
          name: "Kiri Nakamoto",
          affiliation: "U.A. High Support Course, hero hopeful",
          quirk: "Quirk: Prism Pulse — converts incoming energy into focused beams but overheats after three shots",
          gear: "Reflective gauntlets and cooling coils built with Power Loader",
          personality: "Inventive, enthusiastic, occasionally scatterbrained",
          aspiration: "To design support gear that lets any aspiring hero fight safely",
          backstory:
            "Grew up in a powerless family and built her first gauntlet from junkyard metal to stop a local villain.",
        },
      },
      {
        title: "Work-Study Intern",
        description:
          "A hero course student interning under Mirko for close-combat training.",
        values: {
          name: "Daigo Sora",
          affiliation: "U.A. Hero Course Class 2-A",
          quirk: "Quirk: Sonic Vault — explosive leg strength with sonic booms but causes muscle strain",
          gear: "Reinforced knee braces and vibration-dampening boots",
          personality: "Competitive, fiery, fiercely loyal",
          aspiration: "To become a top 5 hero who inspires kids in rural towns",
          backstory:
            "Saved classmates from a landslide using raw leg power, catching Mirko's attention for an internship.",
        },
      },
      {
        title: "Underground Vigilante",
        description:
          "A vigilante assisting heroes in shadowy corners of Musutafu.",
        values: {
          name: "Night Lattice",
          affiliation: "Independent vigilante collaborating with Eraser Head",
          quirk: "Quirk: Lattice — projects barrier grids but requires precise hand choreography",
          gear: "Grapple lines and a visor with predictive trajectory display",
          personality: "Calm, analytical, self-sacrificing",
          aspiration: "To earn legal recognition for vigilantes who cover blind spots",
          backstory:
            "Once failed the Hero License Exam for using vigilante tactics; now works to prove the underground can cooperate with pros.",
        },
      },
      {
        title: "League Recruit",
        description:
          "A villain recruit who manipulates shadows to conceal allies.",
        values: {
          name: "Shadeglow",
          affiliation: "League of Villains",
          quirk: "Quirk: Eclipse Veil — merges into shadows to create portals but weakens under bright light",
          gear: "Photon-absorbing cloak and Dabi-supplied flare disruptors",
          personality: "Brooding, theatrical, surprisingly compassionate to outcasts",
          aspiration: "To dismantle hero society that rejected her quirk control struggles",
          backstory:
            "Expelled from hero school after an uncontrolled incident, she was recruited by Toga to protect runaway kids.",
        },
      },
      {
        title: "Hero Agency Accountant",
        description:
          "An agency support hero balancing finance with defensive quirk use.",
        values: {
          name: "Ledger Guard",
          affiliation: "Sidekick at Endeavor's Agency",
          quirk: "Quirk: Hardlight Ledger — manifests barrier shields shaped like spreadsheets, but each shield lasts only 10 seconds",
          gear: "Holographic projector gauntlets and reinforced visor",
          personality: "Meticulous, level-headed, dry sense of humor",
          aspiration: "To keep agencies transparent while saving civilians",
          backstory:
            "Grew tired of corporate accounting and joined Endeavor's office after protecting interns during a villain raid.",
        },
      },
    ],
  },
  "my-little-pony-oc-maker": {
    fields: [
      { key: "name", question: "What is your character's name?" },
      {
        key: "species",
        question: "What species and tribe are they?",
      },
      {
        key: "home",
        question: "Where is their home location?",
      },
      {
        key: "talent",
        question: "What is their cutie mark and talent?",
      },
      {
        key: "personality",
        question: "How would you describe their personality?",
      },
      {
        key: "lesson",
        question: "What friendship lesson or goal guides them?",
      },
      {
        key: "backstory",
        question: "Share a backstory snapshot.",
      },
    ],
    examples: [
      {
        title: "Crystal Empire Historian",
        description:
          "A crystal pony preserving ancient songs with enchanted quills.",
        values: {
          name: "Twinkle Archive",
          species: "Crystal pony",
          home: "Crystal Empire",
          talent: "Cutie mark of a quill over a snowflake, records memories into music boxes",
          personality: "Gentle, studious, quietly adventurous",
          lesson: "Teaching foals that history shines brighter when shared",
          backstory:
            "Freed from King Sombra's control, she vowed to preserve stories by touring Equestria's libraries.",
        },
      },
      {
        title: "Cloudsdale Weather Captain",
        description:
          "A pegasus choreographing rainbow light shows in the sky.",
        values: {
          name: "Gale Prism",
          species: "Pegasus",
          home: "Cloudsdale",
          talent: "Cutie mark of crossed feathers with a prismatic arc, masters weather artistry",
          personality: "Energetic, charismatic, a bit of a show-off",
          lesson: "Learning that teamwork matters more than applause",
          backstory:
            "Rainbow Dash mentored her after a failed show to teach coordinating with weather teams.",
        },
      },
      {
        title: "Everfree Herbalist",
        description:
          "An earth pony herbalist crafting lanterns that ward off timberwolves.",
        values: {
          name: "Fern Glow",
          species: "Earth pony",
          home: "Edge of the Everfree Forest",
          talent: "Cutie mark of a glowing leaf, excels at brewing protective salves",
          personality: "Warm, brave, a little absentminded",
          lesson: "Showing Ponyville that the Everfree can be a friend, not a foe",
          backstory:
            "Zecora helped her conquer her fear of the forest, inspiring her to help others explore safely.",
        },
      },
      {
        title: "Canterlot Etiquette Tutor",
        description:
          "A unicorn tutor helping nobles discover their authentic selves.",
        values: {
          name: "Lumière Grace",
          species: "Unicorn",
          home: "Canterlot",
          talent: "Cutie mark of a mirror and quill, guides ponies to honest manners",
          personality: "Refined, kind-hearted, witty",
          lesson: "Teaching that true grace comes from empathy, not titles",
          backstory:
            "Once pressured to fit strict noble standards, she befriended Rarity and learned to celebrate individuality.",
        },
      },
      {
        title: "Yakyakistan Ambassador",
        description:
          "A yak ambassador blending cultures through music and pastries.",
        values: {
          name: "Yakima Beat",
          species: "Yak",
          home: "Yakyakistan",
          talent: "Cutie mark substitute: ceremonial drum, unites communities with rhythm",
          personality: "Boisterous, sincere, devoted",
          lesson: "Showing every kingdom that differences make harmony stronger",
          backstory:
            "Pinkie Pie inspired Yakima to share yak culture; now she tours Equestria with friendship festivals.",
        },
      },
    ],
  },
  "naruto-oc-maker": {
    fields: [
      { key: "name", question: "What is your character's name?" },
      {
        key: "village",
        question: "What is their village and rank?",
      },
      {
        key: "clan",
        question: "Do they belong to a clan or possess a Kekkei Genkai?",
      },
      {
        key: "chakra",
        question: "What chakra nature and signature jutsu do they use?",
      },
      {
        key: "personality",
        question: "How would you describe their personality?",
      },
      { key: "nindo", question: "What is their nindo (ninja way)?" },
      {
        key: "backstory",
        question: "Share a backstory snapshot.",
      },
    ],
    examples: [
      {
        title: "Leaf ANBU Tracker",
        description:
          "A Hidden Leaf tracker decoding enemy codes with sensory ninjutsu.",
        values: {
          name: "Shin Kurogane",
          village: "Konohagakure, ANBU operative",
          clan: "Adopted into the Nara clan, no Kekkei Genkai",
          chakra: "Shadow-infused Lightning Release creating chain-binding bolts",
          personality: "Calm, thoughtful, secretly sentimental",
          nindo: "Even in the shadows, I protect those basking in the sun",
          backstory:
            "Rescued by Shikamaru's father during the Fourth War, he now scouts rogue shinobi routes for the Hokage.",
        },
      },
      {
        title: "Sand Puppet Captain",
        description:
          "A Sunagakure captain commanding chakra-thread puppets with precision.",
        values: {
          name: "Kaya Sabaku",
          village: "Sunagakure, jonin puppeteer",
          clan: "Sabaku clan artisan branch",
          chakra: "Wind Release combined with chakra-thread puppet artillery",
          personality: "Strategic, protective, spirited",
          nindo: "Every desert storm can be tamed with preparation",
          backstory:
            "Designs healing puppets for Kankuro while leading missions to secure Sand's trade routes.",
        },
      },
      {
        title: "Mist Swordswoman",
        description:
          "A Hidden Mist swordswoman mastering silent assassination.",
        values: {
          name: "Rei Hozuki",
          village: "Kirigakure, Seven Ninja Swordsmen trainee",
          clan: "Hozuki clan, water body manipulation",
          chakra: "Water Release mist clones paired with electrified blade",
          personality: "Stoic, disciplined, quietly caring",
          nindo: "A blade without purpose rusts; I fight to carve peace",
          backstory:
            "Rebuilt one of the lost swords using liquefaction techniques taught by Suigetsu.",
        },
      },
      {
        title: "Cloud Sensor",
        description:
          "A Hidden Cloud sensory ninja coordinating lightning strikes from afar.",
        values: {
          name: "Denki Raiju",
          village: "Kumogakure, chunin strategist",
          clan: "No clan; trained under Darui",
          chakra: "Lightning Release radar pulses and thunderbolt sealing tags",
          personality: "Confident, witty, fiercely loyal",
          nindo: "Strike fast, protect faster",
          backstory:
            "Saved a whole platoon by intercepting a Jashinist ritual, earning praise from the Raikage.",
        },
      },
      {
        title: "Rogue Scholar",
        description:
          "A wandering Uzumaki historian gathering lost sealing scrolls.",
        values: {
          name: "Akiko Uzumaki",
          village: "Independent wanderer, formerly Uzushiogakure",
          clan: "Uzumaki clan sealing prodigy",
          chakra: "Sealing chains infused with Fire Release talismans",
          personality: "Kind, inquisitive, quietly rebellious",
          nindo: "Knowledge belongs to everyone willing to protect it",
          backstory:
            "Survived the fall of Uzushio and now assists Naruto's era by cataloging scrolls hidden across shinobi nations.",
        },
      },
    ],
  },
  "one-piece-oc-maker": {
    fields: [
      { key: "name", question: "What is your character's name?" },
      {
        key: "crew",
        question: "Which crew or allegiance do they claim?",
      },
      {
        key: "role",
        question: "What is their role and combat style?",
      },
      {
        key: "power",
        question: "What Devil Fruit or Haki do they wield?",
      },
      {
        key: "traits",
        question: "What signature traits define them?",
      },
      {
        key: "dream",
        question: "What personal dream drives them?",
      },
      {
        key: "backstory",
        question: "Share a backstory snapshot.",
      },
    ],
    examples: [
      {
        title: "Laughing Navigator",
        description:
          "A navigator whose laughter charts currents no log pose can track.",
        values: {
          name: "Marin Tidewell",
          crew: "Straw Hat Grand Fleet ally captaining the Tidewell Pirates",
          role: "Navigator-fencer balancing on a tideboard",
          power: "Observation Haki and the Swirl Swirl Fruit that redirects whirlpools",
          traits: "Always humming sea shanties, tattoos of sea charts on her arms",
          dream: "To chart the Laugh Tale current for every free sailor",
          backstory:
            "Escaped a World Government research ship by surfing a Maelstrom using her newly awakened Swirl Swirl Fruit.",
        },
      },
      {
        title: "Cipher Pol Defector",
        description:
          "A former CP0 agent using Rokushiki in service of the Revolutionary Army.",
        values: {
          name: "Cato Cipher",
          crew: "Revolutionary Army intelligence unit",
          role: "Martial arts spy blending Rokushiki and Fishman Karate",
          power: "Armament Haki coating claws sharpened by Rankyaku",
          traits: "Wears a fox mask, speaks in coded proverbs",
          dream: "To dismantle the Cipher Pol system that trained him",
          backstory:
            "Defected after refusing to eliminate a village aiding Sabo; now feeds Dragon information on World Nobles.",
        },
      },
      {
        title: "Undersea Chef",
        description:
          "A fishman chef serving gourmet feasts aboard a floating restaurant fleet.",
        values: {
          name: "Chef Coral",
          crew: "Baratie Blue Fleet",
          role: "Chef-blade dancer wielding twin cleavers underwater",
          power: "Fishman Karate with limited Armament Haki",
          traits: "Collects shell spices, sings recipes mid-fight",
          dream: "To create a peace treaty banquet between Fishman Island and the surface",
          backstory:
            "Once a Neptune Army cook, he left to teach humans to respect underwater cuisine through diplomacy.",
        },
      },
      {
        title: "Sky Island Cartographer",
        description:
          "A Skypiean cartographer exploring New World sky currents.",
        values: {
          name: "Nimbus Lian",
          crew: "Allied with the Straw Hat Fleet as a freelance cartographer",
          role: "Aerial marksman using dial-powered wings",
          power: "Observation Haki and Impact Dial shot enhancements",
          traits: "Carries cloud jars, keeps a journal of every song she hears",
          dream: "To connect Skypiea islands with a network of cloud railways",
          backstory:
            "Helped Nami map lightning routes after Enel's defeat, choosing adventure over staying in Aphelandra.",
        },
      },
      {
        title: "Wano Ronin",
        description:
          "A wandering samurai chronicling Kozuki history while dueling Beast Pirates remnants.",
        values: {
          name: "Kyoji Kozuki",
          crew: "Allied with the Nine Red Scabbards",
          role: "Swordsman-historian wielding twin odachi",
          power: "Advanced Armament Haki and Conqueror's Haki sparks",
          traits: "Wears a half-burned kimono, hums old Kozuki lullabies",
          dream: "To publish a book recounting Wano's liberation for the Grand Line",
          backstory:
            "Survived Orochi's purge by hiding in a theatre troupe; now records oral histories while protecting travelers.",
        },
      },
    ],
  },
  "oshi-no-ko-oc-maker": {
    fields: [
      { key: "name", question: "What is your character's name?" },
      {
        key: "role",
        question: "What is their entertainment role?",
      },
      {
        key: "agency",
        question: "Which agency or affiliation represents them?",
      },
      {
        key: "talent",
        question: "What is their signature performance talent?",
      },
      {
        key: "personality",
        question: "How would you describe their personality?",
      },
      {
        key: "persona",
        question: "What is their public persona versus true self?",
      },
      {
        key: "backstory",
        question: "Share a backstory snapshot.",
      },
    ],
    examples: [
      {
        title: "Rising Idol",
        description:
          "A center idol juggling nightly livestreams and dance rehearsals.",
        values: {
          name: "Aiko Shirasu",
          role: "Idol center for the unit StarDazzle",
          agency: "Strawberry Productions",
          talent: "Dual choreography mixing ballet and J-pop flair",
          personality: "Hardworking, sincere, anxious about perfection",
          persona: "Publicly bubbly and flawless; privately worries fans will notice her imposter syndrome",
          backstory:
            "Discovered by Ruby while covering emergency vocals, she now supports her family with idol income while keeping grades up.",
        },
      },
      {
        title: "Method Actor",
        description:
          "An actor famed for immersive roles and unfiltered interviews.",
        values: {
          name: "Ren Kurosawa",
          role: "Television and stage actor",
          agency: "Lala Lai Theatre Company",
          talent: "Method acting that blends improv with emotional recall",
          personality: "Charismatic, intense, unexpectedly gentle",
          persona: "Publicly aloof superstar; privately a dork who collects retro games",
          backstory:
            "Rose from child star scandals to acclaimed actor after Aqua coached him through a revenge-thriller audition.",
        },
      },
      {
        title: "Viral Influencer",
        description:
          "A streamer stabilizing her fame by learning idol discipline.",
        values: {
          name: "Mika Stream",
          role: "Variety streamer and part-time idol collaborator",
          agency: "Independent influencer managed by MEM-cho",
          talent: "Interactive live-editing and comedic skits",
          personality: "Chaotic, witty, surprisingly observant",
          persona: "Publicly carefree meme queen; privately stressed about burnout",
          backstory:
            "Joined Strawberry Productions collabs after MEM-cho recognized her potential during a charity stream.",
        },
      },
      {
        title: "Songwriter Ghost",
        description:
          "A songwriter crafting anonymous hits for rival idol groups.",
        values: {
          name: "Kaede Night",
          role: "Ghost songwriter and backup vocalist",
          agency: "Freelancer contracting with B-Komachi producers",
          talent: "Penning lyrics that mirror fans' hidden insecurities",
          personality: "Introverted, empathetic, sharp-tongued when pressured",
          persona: "Publicly credited as a team of writers; privately pours her trauma into every lyric",
          backstory:
            "Walked away from the industry after cyberbullying; Ai's legacy inspired her return under a pen name.",
        },
      },
      {
        title: "Idol Choreographer",
        description:
          "A retired idol teaching the next generation with strict kindness.",
        values: {
          name: "Sakura Minami",
          role: "Choreographer and talent coach",
          agency: "Strawberry Productions training division",
          talent: "Hybrid choreography that fuses martial arts with idol dance",
          personality: "Disciplined, supportive, motherly",
          persona: "Publicly stern instructor; privately writes encouragement letters to every trainee",
          backstory:
            "Retired after a knee injury but returned to keep the flame of Ai's teachings alive through the trainees.",
        },
      },
    ],
  },
  "pokemon-oc-maker": {
    fields: [
      { key: "name", question: "What is your character's name?" },
      {
        key: "role",
        question: "What type of trainer or role do they have?",
      },
      {
        key: "region",
        question: "Which region do they call home and what key locations define them?",
      },
      {
        key: "team",
        question: "What is their team specialty and signature partner Pokémon?",
      },
      {
        key: "personality",
        question: "How would you describe their personality?",
      },
      { key: "goal", question: "What goal drives their journey?" },
      {
        key: "backstory",
        question: "Share a journey backstory snapshot.",
      },
    ],
    examples: [
      {
        title: "Kalos Sky Ace",
        description:
          "A sky trainer dancing through aerial battles with grace.",
        values: {
          name: "Elise Montclair",
          role: "Kalos Sky Trainer and performing competitor",
          region: "Kalos, primarily Lumiose City and Azure Bay",
          team: "Flying-type specialists led by partner Hawlucha",
          personality: "Elegant, brave, thrill-seeking",
          goal: "To choreograph the ultimate aerial performance for the Prism Tower festival",
          backstory:
            "Survived a storm thanks to her Hawlucha; now teaches children aerial safety through contests.",
        },
      },
      {
        title: "Sinnoh Myth Researcher",
        description:
          "A Sinnoh scholar mapping ancient ruins alongside fossil Pokémon.",
        values: {
          name: "Darius Flint",
          role: "Archaeologist and Fossil Pokémon trainer",
          region: "Sinnoh, based in Canalave Library and Spear Pillar",
          team: "Rock/Steel team led by partner Bastiodon",
          personality: "Methodical, bookish, quietly heroic",
          goal: "To uncover proof linking Arceus myths with modern evolution",
          backstory:
            "Encountered Cynthia while restoring Solaceon's ruins; now documents mythic sightings with his fossil partners.",
        },
      },
      {
        title: "Galar Gym Challenger",
        description:
          "A punk rocker challenging gyms with rhythm-infused battles.",
        values: {
          name: "Roxy Riot",
          role: "Galar Gym Challenger and musician",
          region: "Galar, Spikemuth hometown and Wyndon Stadium",
          team: "Electric/Poison blend led by partner Toxtricity",
          personality: "Rebellious, charismatic, fiercely loyal",
          goal: "To dethrone Leon and revitalize Spikemuth's music scene",
          backstory:
            "Was mentored by Piers and Marnie, turning her garage band into gym challenge battles.",
        },
      },
      {
        title: "Alola Trial Captain",
        description:
          "An Alolan trial captain guiding challengers through lush jungles.",
        values: {
          name: "Keani",
          role: "Trial Captain in Alola's Lush Jungle",
          region: "Alola, Lush Jungle and Iki Town",
          team: "Grass-type bonds led by partner Tsareena",
          personality: "Warm, playful, fiercely protective of nature",
          goal: "To cultivate restorative herbs that heal Ultra Beast damage",
          backstory:
            "Discovered her Tsareena while replanting the jungle after an Ultra Beast incursion.",
        },
      },
      {
        title: "Paldea Streamer",
        description:
          "A Paldean influencer mixing treasure hunts with gym raids.",
        values: {
          name: "Nova Stream",
          role: "Paldea treasure hunter and battle streamer",
          region: "Paldea, exploring Area Zero and Levincia",
          team: "Dragon/Normal team led by partner Cyclizar",
          personality: "Energetic, curious, always camera-ready",
          goal: "To broadcast a live discovery of the next Great Treasure of Paldea",
          backstory:
            "Found her Cyclizar as a child during a treasure hunt; now travels with Nemona to showcase Paldea's wonders.",
        },
      },
    ],
  },
  "sailor-moon-oc-maker": {
    fields: [
      { key: "name", question: "What is your character's name?" },
      {
        key: "title",
        question: "What is their Guardian title and planet or domain?",
      },
      {
        key: "items",
        question: "What transformation items and attacks do they wield?",
      },
      {
        key: "personality",
        question: "How would you describe their personality?",
      },
      {
        key: "mission",
        question: "What mission or protective duty guides them?",
      },
      {
        key: "backstory",
        question: "Share their past life backstory.",
      },
    ],
    examples: [
      {
        title: "Sailor Starflower",
        description:
          "A guardian of cosmic gardens nurturing life between planets.",
        values: {
          name: "Amara Hanazono",
          title: "Sailor Starflower of the Asteroid Belt sanctuaries",
          items: "Starflower Brooch and Blooming Scepter unleashing Petal Nebula Storm",
          personality: "Kind, optimistic, steadfast",
          mission: "To heal ruined celestial gardens and defend new life",
          backstory:
            "In the Silver Millennium she tended the Moon Kingdom's outer gardens and now remembers fragments whenever meteors bloom.",
        },
      },
      {
        title: "Sailor Tempest",
        description:
          "A storm guardian balancing tempests across Neptune's moons.",
        values: {
          name: "Cassia Mare",
          title: "Sailor Tempest of Triton's oceans",
          items: "Tempest Mirror and Gale Harp summoning Siren Cyclone",
          personality: "Calm, introspective, fiercely protective",
          mission: "To keep spacefaring sailors safe from cosmic storms",
          backstory:
            "She once guided ancient voyagers through storms alongside Sailor Neptune; reincarnated, she senses tides before they swell.",
        },
      },
      {
        title: "Sailor Aurora",
        description:
          "A guardian painting auroras to shield dreams from darkness.",
        values: {
          name: "Lina Skye",
          title: "Sailor Aurora of Earth's polar lights",
          items: "Aurora Prism Pen and Radiant Crown unleashing Borealis Rhapsody",
          personality: "Artistic, empathetic, playful",
          mission: "To guard sleeping hearts from Nightmare forces",
          backstory:
            "Her past life tended to dreamscapes alongside Queen Serenity; she now draws aurora murals that ward off nightmares.",
        },
      },
      {
        title: "Sailor Solaris",
        description:
          "A solar guardian channeling sunrise energy into brilliant shields.",
        values: {
          name: "Helia Dawn",
          title: "Sailor Solaris of the Dawn Court",
          items: "Solaris Locket and Sunflare Blade with attack Daybreak Crescendo",
          personality: "Confident, radiant, a natural leader",
          mission: "To protect the legacy of Princess Serenity and inspire future guardians",
          backstory:
            "Served as a sentinel at Queen Serenity's palace; reincarnated, she rallies new guardians at Crystal Tokyo.",
        },
      },
      {
        title: "Sailor Nocturne",
        description:
          "A twilight guardian harmonizing darkness and starlight.",
        values: {
          name: "Noemi Vale",
          title: "Sailor Nocturne of the Shadow Muse",
          items: "Nocturne Pendant and Lullaby Bow summoning Eclipse Sonata",
          personality: "Mysterious, poetic, compassionate",
          mission: "To guide lost souls through twilight and shield them from chaos",
          backstory:
            "Served as Luna's confidante during the fall of the Moon Kingdom; now runs a music lounge that awakens starseeds.",
        },
      },
    ],
  },
  "sonic-oc-maker": {
    fields: [
      { key: "name", question: "What is your character's name?" },
      {
        key: "species",
        question: "What species are they and what is their alignment?",
      },
      {
        key: "ability",
        question: "What signature ability or speed trick do they use?",
      },
      {
        key: "gear",
        question: "What gear or Wispon do they carry?",
      },
      {
        key: "personality",
        question: "How would you describe their personality?",
      },
      {
        key: "goal",
        question: "Who is their rival or what goal drives them?",
      },
      {
        key: "backstory",
        question: "Share a backstory snapshot.",
      },
    ],
    examples: [
      {
        title: "Velocity Vixen",
        description:
          "A fox pilot surfing wind tunnels with aerial stunts.",
        values: {
          name: "Skye",
          species: "Two-tailed fox, heroic alignment",
          ability: "Spiral Jet Dash using twin tails as turbo boosters",
          gear: "Customized hoverboard and cube Wispon",
          personality: "Adventurous, witty, always upbeat",
          goal: "To outpace Jet the Hawk in a world Grand Prix rematch",
          backstory:
            "Invented her first hoverboard after salvaging Tornado parts from Tails, now maps aerial shortcuts for the Resistance.",
        },
      },
      {
        title: "Guardian Armadillo",
        description:
          "An armored armadillo guarding Mobius ruins from Eggman bots.",
        values: {
          name: "Brick",
          species: "Armadillo, Chaotix ally",
          ability: "Rolling Quake slam that creates shockwaves",
          gear: "Drill Wispon and reinforced gauntlets",
          personality: "Stoic, dependable, quietly humorous",
          goal: "To protect ancient Mobian archives hidden beneath the Mystic Ruins",
          backstory:
            "Joined Knuckles after Eggman raided his ancestral archive, now sets traps to defend the Master Emerald's lore.",
        },
      },
      {
        title: "Cyber Hedgehog",
        description:
          "A tech-savvy hedgehog hacking Eggman's systems mid-race.",
        values: {
          name: "Byte",
          species: "Hedgehog, neutral alignment",
          ability: "Hyper Jump dash that converts data streams into speed boosts",
          gear: "Homing Wispon and wrist console",
          personality: "Sarcastic, clever, slightly aloof",
          goal: "To free captured AI companions trapped in Eggman's databanks",
          backstory:
            "Helped Tails decrypt Metal Sonic's fail-safes and now races alongside Team Sonic to sabotage EggNet nodes.",
        },
      },
      {
        title: "Emerald Plains Racer",
        description:
          "A rabbit martial artist sprinting through emerald plains with rhythmic kicks.",
        values: {
          name: "Raia",
          species: "Rabbit, hero",
          ability: "Rhythm Kick combo amplifying speed with percussion beats",
          gear: "Drumstick batons and burst Wispon",
          personality: "Energetic, musical, fiercely loyal",
          goal: "To prove she can outpace Amy in a friendly spar",
          backstory:
            "Grew up attending Vector's music lessons and built her rhythm combat style to liberate her village from Egg Pawns.",
        },
      },
      {
        title: "Rogue Treasure Hunter",
        description:
          "A feline treasure hunter juggling alliances for rare relics.",
        values: {
          name: "Sable",
          species: "Cat, treasure-hunting anti-hero",
          ability: "Shadow Blink dash through dimensional seams",
          gear: "Laser claw gauntlets and drill Wispon",
          personality: "Cunning, flirtatious, thrill-seeking",
          goal: "To steal Eggman's Chaos Drive stash before Rouge",
          backstory:
            "Former partner of Rouge who split after a heist disagreement; now plays both sides to keep relics away from Eggman.",
        },
      },
    ],
  },
  "spy-x-family-oc-maker": {
    fields: [
      { key: "name", question: "What is your character's name?" },
      {
        key: "cover",
        question: "What cover identity and true role do they hold?",
      },
      {
        key: "agency",
        question: "Which agency or allegiance do they serve?",
      },
      {
        key: "skills",
        question: "What signature skills or powers do they possess?",
      },
      {
        key: "personality",
        question: "How would you describe their personality?",
      },
      {
        key: "mission",
        question: "What mission objective drives them?",
      },
      {
        key: "backstory",
        question: "Share a backstory snapshot.",
      },
    ],
    examples: [
      {
        title: "WISE Handler",
        description:
          "A WISE handler embedded as Eden Academy's etiquette teacher.",
        values: {
          name: "Lena Hartmann",
          cover: "Cover identity: Eden Academy etiquette instructor; true role: WISE handler",
          agency: "WISE",
          skills: "Expert lip reader, miniature camera pens, self-defense",
          personality: "Composed, resourceful, dry sense of humor",
          mission: "To gather intel on the Desmond family through faculty meetings",
          backstory:
            "Recruited after exposing counterfeit bonds; she now coordinates Operation Strix field agents from within Eden.",
        },
      },
      {
        title: "Garden Cleaner",
        description:
          "A Garden assassin passing as a florist in Berlint's upscale district.",
        values: {
          name: "Iris Nacht",
          cover: "Cover identity: boutique florist; true role: Garden Cleaner",
          agency: "Garden",
          skills: "Poisoned thorns, close-quarters aikido, hidden garrote",
          personality: "Graceful, warm-hearted to friends, merciless on missions",
          mission: "Eliminate a coup leader targeting the Westalis-Ostania peace talks",
          backstory:
            "Taken in by the Director after avenging her family, she now delivers bouquets hiding blades.",
        },
      },
      {
        title: "SSS Analyst",
        description:
          "An SSS officer pretending to be a gossip columnist to sniff out spies.",
        values: {
          name: "Markus Weiss",
          cover: "Cover identity: society magazine columnist; true role: SSS analyst",
          agency: "State Security Service (SSS)",
          skills: "Audio surveillance, disguise kits, martial training",
          personality: "Suspicious, proud, surprisingly lonely",
          mission: "To expose WISE sleeper agents infiltrating Eden Academy",
          backstory:
            "Lost his brother to foreign espionage, fueling his obsession with rooting out spies in Ostania.",
        },
      },
      {
        title: "Twilight's Apprentice",
        description:
          "A prodigy spy mentored by Loid while acting as a daycare worker.",
        values: {
          name: "Nina Frost",
          cover: "Cover identity: daycare caretaker; true role: WISE field operative",
          agency: "WISE",
          skills: "Instant recall, micro-drone deployment, empath training",
          personality: "Cheerful, clever, quietly determined",
          mission: "To monitor Eden student playgroups for potential threats",
          backstory:
            "Saved by Twilight during a refugee crisis, she insisted on training to help protect other children.",
        },
      },
      {
        title: "Underworld Informant",
        description:
          "A black-market broker feeding intel to both WISE and Garden for a price.",
        values: {
          name: "Felix Noir",
          cover: "Cover identity: jazz club owner; true role: underworld informant",
          agency: "Neutral fixer linked to both WISE and Garden",
          skills: "Information brokerage, safehouse networks, hidden weapon cane",
          personality: "Charming, pragmatic, morally gray",
          mission: "To keep Berlint's underworld balanced while protecting adopted street kids",
          backstory:
            "Once a street orphan, he now trades secrets to keep violence away from his neighborhood.",
        },
      },
    ],
  },
  "uma-musume-oc-maker": {
    fields: [
      { key: "name", question: "What is your character's name?" },
      {
        key: "pedigree",
        question: "What famous pedigree or inspiration do they carry?",
      },
      {
        key: "distance",
        question: "What is their preferred distance and running style?",
      },
      {
        key: "trainer",
        question: "Who is their trainer or team?",
      },
      {
        key: "personality",
        question: "How would you describe their personality?",
      },
      {
        key: "goal",
        question: "What rivalry or goal race drives them?",
      },
      {
        key: "backstory",
        question: "Share a backstory snapshot.",
      },
    ],
    examples: [
      {
        title: "Twilight Sprinter",
        description:
          "A sprinter inspired by the legendary El Condor Pasa's daring flair.",
        values: {
          name: "Twilight Condor",
          pedigree: "Descendant of a foreign champion who dazzled Japan",
          distance: "Prefers 1200m-1600m, front-runner",
          trainer: "Tracen Academy team Gold Star",
          personality: "Bold, flashy, loves showy finishes",
          goal: "To win the Sprinters Stakes in record time",
          backstory:
            "Grew up in America watching videos of El Condor Pasa and moved to Tracen to chase that legacy.",
        },
      },
      {
        title: "Marathon Muse",
        description:
          "A distance runner channeling the stamina of Deep Impact.",
        values: {
          name: "Deep Serenade",
          pedigree: "Inspired by Deep Impact's unyielding drive",
          distance: "Prefers 2400m-3200m, closing runner",
          trainer: "Team Sakura Bridge under Trainer Riko",
          personality: "Calm, poetic, quietly competitive",
          goal: "To conquer the Tenno Sho (Spring) with a dramatic late surge",
          backstory:
            "Writes haiku about every race and trains at dawn to honor Deep Impact's legendary workouts.",
        },
      },
      {
        title: "Dirt Track Dynamo",
        description:
          "A dirt-track racer bringing American grit to Japanese circuits.",
        values: {
          name: "Desert Blaze",
          pedigree: "Inspired by Secretariat's raw power",
          distance: "Prefers 1600m dirt, pace chaser",
          trainer: "Joint Tracen and overseas exchange program",
          personality: "Energetic, stubborn, thrives in mud",
          goal: "To dominate the February Stakes and prove dirt can shine",
          backstory:
            "Raised on desert ranch tracks, she joined Tracen's exchange program to broaden dirt racing prestige.",
        },
      },
      {
        title: "Classic Crown",
        description:
          "A tactician aiming for the elusive Triple Crown.",
        values: {
          name: "Crown Sonata",
          pedigree: "Modeled after Symboli Rudolf's regal presence",
          distance: "Prefers 2000m-2400m, tactical stalker",
          trainer: "Symboli Dormitory elite team",
          personality: "Disciplined, regal, encouraging to juniors",
          goal: "To sweep the Satsuki Sho, Tokyo Yushun, and Kikuka Sho",
          backstory:
            "Mentored by Symboli Rudolf herself, she balances harsh training with tutoring younger Uma Musume.",
        },
      },
      {
        title: "Night Racetrack Idol",
        description:
          "A night racing specialist captivating fans under stadium lights.",
        values: {
          name: "Moonlit Diva",
          pedigree: "Inspired by Agnes Digital's versatility",
          distance: "Prefers 1400m night races, adaptable runner",
          trainer: "Twilight Stage idol-racing unit",
          personality: "Glamorous, fun-loving, hardworking",
          goal: "To headline the NHK Mile Cup Night Special and become top idol",
          backstory:
            "Balanced idol lessons with racetrack drills after being scouted during a fan-favorite half-time show.",
        },
      },
    ],
  },
  // Additional datasets will be appended here.
};

function escapeText(value) {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function escapeBackticks(value) {
  return value.replace(/`/g, "\\`");
}

function formatExamples({ fields, examples }) {
  const formattedItems = examples
    .map((example) => {
      const lines = ["  {"];
      lines.push(`    title: "${escapeText(example.title)}",`);
      lines.push(`    description: "${escapeText(example.description)}",`);
      const promptLines = fields
        .map((field) => {
          const answer = example.values[field.key] ?? "";
          return `${field.question}\n${escapeBackticks(answer)}`;
        })
        .join("\n\n");
      lines.push(`    prompt: \`${escapeBackticks(promptLines)}\`,`);
      lines.push("  },");
      return lines.join("\n");
    })
    .join("\n");

  return `[
${formattedItems}
]`;
}

async function updateFile(slug, data) {
  const filePath = path.join(
    process.cwd(),
    "app/i18n/maker",
    slug,
    "base.ts"
  );

  const content = await fs.readFile(filePath, "utf8");
  const formatted = formatExamples(data);
  const regex = /const backstoryExamples = \[[\s\S]*?\];/;

  if (!regex.test(content)) {
    console.error(`Could not find backstoryExamples in ${filePath}`);
    return;
  }

  const updated = content.replace(
    regex,
    `const backstoryExamples = ${formatted};`
  );

  await fs.writeFile(filePath, updated, "utf8");
  console.log(`Updated ${slug}`);
}

async function main() {
  for (const [slug, data] of Object.entries(dataset)) {
    if (data.examples.length !== 5) {
      throw new Error(
        `${slug} does not have exactly 5 examples (found ${data.examples.length})`
      );
    }
    await updateFile(slug, data);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
