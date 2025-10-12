const fs = require("fs/promises");
const path = require("path");
const vm = require("vm");

const makeConfigDir = path.join(process.cwd(), "make-config");
const targetRoot = path.join(process.cwd(), "app/i18n/maker");

const universalOcOptions = [
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
    unique: true,
    data: [
      { label: "Hero", value: "heroic leader" },
      { label: "Antihero", value: "antihero vigilante" },
      { label: "Mentor", value: "mysterious mentor" },
      { label: "Strategist", value: "brilliant strategist" },
      { label: "Rival", value: "rebellious rival" },
      { label: "Guardian", value: "stoic guardian" },
    ],
  },
  {
    title: "Power Theme",
    key: "power_theme",
    data: [
      { label: "Elemental magic", value: "elemental magic" },
      { label: "Advanced technology", value: "advanced technology" },
      { label: "Martial arts", value: "martial arts" },
      { label: "Spiritual powers", value: "spiritual powers" },
      { label: "Summoner", value: "summoner" },
      { label: "Tactical genius", value: "tactical genius" },
    ],
  },
  {
    title: "Outfit Style",
    key: "outfit",
    data: [
      { label: "Battle armor", value: "battle armor" },
      { label: "Sleek uniform", value: "sleek uniform" },
      { label: "Casual streetwear", value: "casual streetwear" },
      { label: "Formal attire", value: "formal attire" },
      { label: "Mystic robes", value: "mystic robes" },
      { label: "Futuristic suit", value: "futuristic suit" },
    ],
  },
  {
    title: "Personality",
    key: "personality",
    data: [
      { label: "Optimistic", value: "optimistic" },
      { label: "Stoic", value: "stoic" },
      { label: "Rebellious", value: "rebellious" },
      { label: "Compassionate", value: "compassionate" },
      { label: "Calculating", value: "calculating" },
      { label: "Chaotic good", value: "chaotic good" },
    ],
  },
  {
    title: "Expression",
    key: "expression",
    unique: true,
    data: [
      { label: "Smiling confidence", value: "smiling confidence" },
      { label: "Determined gaze", value: "determined gaze" },
      { label: "Brooding intensity", value: "brooding intensity" },
      { label: "Playful grin", value: "playful grin" },
      { label: "Calm focus", value: "calm focus" },
      { label: "Mysterious smirk", value: "mysterious smirk" },
    ],
  },
];

function capitalize(value) {
  return value.replace(/\b\w/g, (match) => match.toUpperCase());
}

function deriveSeries(heroTitle, slug) {
  if (heroTitle) {
    const cleaned = heroTitle
      .replace(/\s*OC Maker$/i, "")
      .replace(/\s*Character Maker$/i, "")
      .replace(/\s*Creator$/i, "")
      .trim();
    if (cleaned) return cleaned;
  }

  const withoutSuffix = slug.replace(/-oc-maker$/, "");
  return capitalize(withoutSuffix.replace(/-/g, " "));
}

function buildBackstoryExamples(series) {
  return [
    {
      title: "Hero",
      description: `A determined protagonist representing the heart of ${series}.`,
      prompt: `What is your character's name?\nKei Arashi\n\nWhat is their role in ${series}?\nFrontline hero standing beside the main cast of ${series}\n\nWhat unique ability or skill do they have?\nMastery over a signature power style that defines ${series}\n\nWhat is their ultimate goal?\nTo protect their allies and push the story forward\n\nDescribe their personality.\nFearless, hopeful, and fiercely loyal`,
    },
    {
      title: "Rival",
      description: `A formidable rival who challenges the heroes of ${series}.`,
      prompt: `What is your character's name?\nMira Lynx\n\nHow do they relate to the heroes of ${series}?\nAn ambitious rival whose ideals clash with the protagonists\n\nWhat powers or techniques set them apart?\nRefined skills reflecting the darker edge of ${series}\n\nWhat drives them?\nA burning need to prove their philosophy is right\n\nDescribe their personality.\nSharp, proud, and secretly compassionate`,
    },
    {
      title: "Mentor",
      description: `A seasoned mentor guiding the next generation within ${series}.`,
      prompt: `What is your character's name?\nProfessor Daelin Voss\n\nWhat is their role in ${series}?\nVeteran mentor who prepares new heroes for the trials ahead\n\nWhat knowledge or abilities do they offer?\nDeep expertise in the history and power systems of ${series}\n\nWhat is their guiding lesson?\nStrength must be balanced with empathy and foresight\n\nDescribe their personality.\nPatient, witty, and unshakeable even in crisis`,
    },
  ];
}

function escapeTemplate(value) {
  return value.replace(/`/g, "\\`");
}

function formatString(value) {
  if (value === undefined || value === null) return '""';
  return `"${value
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\r?\n/g, "\\n")}"`;
}

function formatValue(value, indent = 0) {
  const padding = "  ".repeat(indent);

  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    const items = value
      .map(
        (item) => `${"  ".repeat(indent + 1)}${formatValue(item, indent + 1)}`,
      )
      .join(",\n");
    return `[\n${items}\n${padding}]`;
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value);
    if (!entries.length) return "{}";
    const parts = entries.map(
      ([key, val]) =>
        `${"  ".repeat(indent + 1)}${key}: ${formatValue(val, indent + 1)}`,
    );
    return `{\n${parts.join(",\n")}\n${padding}}`;
  }

  if (typeof value === "string") return formatString(value);
  if (typeof value === "number" || typeof value === "boolean")
    return String(value);
  if (value === null) return "null";
  return "undefined";
}

async function main() {
  const files = (await fs.readdir(makeConfigDir)).filter((name) =>
    name.endsWith(".ts"),
  );

  for (const file of files) {
    const slug = file.replace(/\.ts$/, "");
    const filePath = path.join(makeConfigDir, file);
    const content = await fs.readFile(filePath, "utf8");
    const scriptContent = content.replace(/export default/, "module.exports =");

    const context = {
      module: { exports: {} },
      exports: {},
    };

    vm.runInNewContext(scriptContent, context, { filename: filePath });

    const data = context.module.exports || {};

    const hero = data.hero || { title: "", description: "" };
    const howTo = data.howToUse || { title: "", description: "", steps: [] };
    const example = data.example || {
      title: "",
      description: "",
      examples: [],
    };
    const features = data.features || {
      title: "",
      description: "",
      features: [],
    };
    const faq = data.faq || {
      title: "",
      description: "",
      contactEmail: "",
      faqs: [],
    };
    const cta = data.cta || {
      title: "",
      description: "",
      primaryButtonText: "",
      secondaryButtonText: "",
    };

    const series = deriveSeries(hero.title, slug);
    const basePrompt = `\n  WORLD CONTEXT:\n  Universe: ${series}\n  Tone: Stay faithful to ${series}'s worldbuilding, factions, abilities, and storytelling style.\n\n  OUTPUT FORMAT:\n  Name, Role, Appearance, Abilities, Personality, Backstory\n\n  CHARACTER PREFERENCES:\n  {PREFERENCES}\n`;

    const backstoryExamples = buildBackstoryExamples(series);

    const faqDescription = [faq.description?.trim(), faq.contactEmail?.trim()]
      .filter(Boolean)
      .join(" ");

    const targetDir = path.join(targetRoot, slug);
    await fs.mkdir(targetDir, { recursive: true });

    const fileLines = [];
    fileLines.push(`const basePrompt = \`${escapeTemplate(basePrompt)}\`;`);
    fileLines.push("");
    fileLines.push(
      `const backstoryExamples = ${formatValue(backstoryExamples)};`,
    );
    fileLines.push("");
    fileLines.push(`const ocOptions = ${formatValue(universalOcOptions)};`);
    fileLines.push("");
    fileLines.push(`const examples = ${formatValue(example.examples || [])};`);
    fileLines.push("");
    fileLines.push("export default {");
    fileLines.push("  meta: {");
    fileLines.push(`    title: ${formatString(hero.title)},`);
    fileLines.push(`    description: ${formatString(hero.description)},`);
    fileLines.push("  },");
    fileLines.push(`  series: ${formatString(series)},`);
    fileLines.push("  backstoryPreset: basePrompt,");
    fileLines.push("  examples: backstoryExamples,");
    fileLines.push("  ocOptions,");
    fileLines.push("  contents: {");
    fileLines.push(`    hero: ${formatValue(hero, 2)},`);
    fileLines.push("    step: {");
    fileLines.push(`      title: ${formatString(howTo.title)},`);
    fileLines.push(`      description: ${formatString(howTo.description)},`);
    fileLines.push(`      steps: ${formatValue(howTo.steps || [], 3)},`);
    fileLines.push("    },");
    fileLines.push("    examples: {");
    fileLines.push(`      title: ${formatString(example.title)},`);
    fileLines.push(`      description: ${formatString(example.description)},`);
    fileLines.push("      examples,");
    fileLines.push("    },");
    fileLines.push("    features: {");
    fileLines.push(`      title: ${formatString(features.title)},`);
    fileLines.push(`      description: ${formatString(features.description)},`);
    fileLines.push(
      `      features: ${formatValue(features.features || [], 3)},`,
    );
    fileLines.push("    },");
    fileLines.push("    faqs: {");
    fileLines.push(`      title: ${formatString(faq.title)},`);
    fileLines.push(`      description: ${formatString(faqDescription)},`);
    fileLines.push(`      faqs: ${formatValue(faq.faqs || [], 3)},`);
    fileLines.push("    },");
    fileLines.push("    cta: {");
    fileLines.push(`      title: ${formatString(cta.title)},`);
    fileLines.push(`      description: ${formatString(cta.description)},`);
    fileLines.push("      btns: {");
    fileLines.push(
      `        start: ${formatString(cta.primaryButtonText || "Start Creating")},`,
    );
    fileLines.push(
      `        explore: ${formatString(cta.secondaryButtonText || "Explore Characters")},`,
    );
    fileLines.push("      },");
    fileLines.push("    },");
    fileLines.push("  },");
    fileLines.push("};\n");

    const targetFile = path.join(targetDir, "base.ts");
    await fs.writeFile(targetFile, fileLines.join("\n"), "utf8");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
