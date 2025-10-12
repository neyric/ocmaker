const basePrompt = `
  WORLD CONTEXT:
  故事：《地狱乐》
  背景概述：江户时期的死刑犯、忍者流派、山田浅ェ门处刑人，被派往充满天仙与诡异花兽的禁岛神仙郷
  关键阵营：岩隐衆忍者、山田浅ェ门一门、天仙／人仙、罪犯漂泊者、幕府使团、道之行者

  OUTPUT FORMAT:
  姓名、出身与身份（罪人／处刑人）、战斗流派与武器、道术资质或忍术、性格、追寻的宝藏／目标、旅途剪影

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "岩隐幸存者",
    description: "期望赦免的忍者罪人，操使锁镰重获自由。",
    prompt: `角色名称？
花菖蒲

出身与身份？
岩隐衆刺客，被判入神仙郷的死刑犯

战斗流派与武器？
双锁镰结合腾挪翻跃的暗杀术

道术资质或忍术？
平衡道流，可反制天仙飞花

性格？
冷静精算，一旦信任便忠诚到底

追寻的宝藏或目标？
换取赦免，解救被贩为奴的弟弟

旅途剪影。
因拒绝暗杀孩童而入狱，如今以此战赎回初心。`,
  },
  {
    title: "山田浅ェ门门人",
    description: "将战斗详记于册的见习处刑人。",
    prompt: `角色名称？
浅ェ门列守

出身与身份？
山田浅ェ门见习处刑人

战斗流派与武器？
以解剖学精准度施展拔刀术

道术资质或忍术？
有限的道感，专注捕捉恐惧振动

性格？
沉稳尽责，对罪人怀有隐隐同情

追寻的宝藏或目标？
带回详尽记录，避免后人重蹈覆辙

旅途剪影。
导师因追寻长生传闻而亡，他自愿前往神仙郷亲证真伪。`,
  },
  {
    title: "落魄海盗",
    description: "以炮术闻名的海盗头目，将重炮改造成陷阱武器。",
    prompt: `角色名称？
海神勃罗

出身与身份？
被押往神仙郷的海盗首领

战斗流派与武器？
改造链炮，如随身迫击炮般轰炸

道术资质或忍术？
通过海歌调息稳固道流

性格？
豪放鲁莽，却保护同伴至上

追寻的宝藏或目标？
求得仙药重建船队，改走正途

旅途剪影。
船员遭幕府屠戮，他盼借赦免让生还者得以堂堂正正生活。`,
  },
  {
    title: "人仙叛徒",
    description: "挣脱天仙枷锁的实验体，寻回人性。",
    prompt: `角色名称？
神乐

出身与身份？
前人仙守卫，如今倒戈扶持闯入者

战斗流派与武器？
花瓣扇与可变道花鞭

道术资质或忍术？
高阶道术，再生能力惊人

性格？
优雅静谧，承受沉重的罪责

追寻的宝藏或目标？
摧毁天仙根胎，解救其他囚徒

旅途剪影。
昔日被炼成守卫，兄长摇篮曲唤醒记忆后，她逃离牢笼。`,
  },
  {
    title: "寺院僧兵",
    description: "用禅心抵御妖花侵蚀的僧侣处刑人。",
    prompt: `角色名称？
朱善

出身与身份？
受幕府征召的僧侣处刑人

战斗流派与武器？
携刃念珠的棍术

道术资质或忍术？
持咒导引道气，安定伙伴心神

性格？
沉着坚毅，常以禅理咏叹

追寻的宝藏或目标？
求得仙药拯救寺院中的瘟疫

旅途剪影。
目睹寺院沦陷于怪病，他为求解药而踏上不归之岛。`,
  },
];

const ocOptions = [
  {
    title: "性别",
    key: "gender",
    unique: true,
    data: [
      { label: "男生", value: "1boy" },
      { label: "女生", value: "1girl" },
      { label: "非二元", value: "1person" },
    ],
  },
  {
    title: "年龄",
    key: "age",
    data: [
      { label: "少年期", value: "teen" },
      { label: "晚期少年", value: "late teen" },
      { label: "青年", value: "young adult" },
      { label: "资深成年人", value: "adult" },
      { label: "老练人士", value: "veteran" },
      { label: "资深长者", value: "seasoned elder" },
      { label: "不朽传奇", value: "timeless legend" },
      { label: "年轻忍者", value: "young shinobi" },
      { label: "死刑犯", value: "convict execution" },
      { label: "山田浅ェ门", value: "yamada asaemon" },
      { label: "道术师", value: "tao master" },
      { label: "不死人试作体", value: "immortal experiment" },
    ],
  },
  {
    title: "体态",
    key: "body",
    data: [
      { label: "修长", value: "slender" },
      { label: "健美", value: "athletic" },
      { label: "肌肉匀称", value: "muscular" },
      { label: "高挑", value: "tall" },
      { label: "娇小", value: "petite" },
      { label: "魁梧", value: "burly" },
      { label: "灵巧", value: "graceful" },
    ],
  },
  {
    title: "发型",
    key: "hair",
    data: [
      { label: "短黑发", value: "short black hair" },
      { label: "长棕发", value: "long brown hair" },
      { label: "金发", value: "blonde hair" },
      { label: "红发", value: "red hair" },
      { label: "银发", value: "silver hair" },
      { label: "蓝发", value: "blue hair" },
      { label: "白发", value: "white hair" },
      { label: "编发", value: "braided hair" },
      { label: "薰衣草波浪长发", value: "wavy lavender hair" },
    ],
  },
  {
    title: "瞳色",
    key: "eyes",
    data: [
      { label: "棕色瞳", value: "brown eyes" },
      { label: "蓝色瞳", value: "blue eyes" },
      { label: "绿色瞳", value: "green eyes" },
      { label: "琥珀瞳", value: "amber eyes" },
      { label: "灰色瞳", value: "gray eyes" },
      { label: "紫色瞳", value: "violet eyes" },
      { label: "金色瞳", value: "golden eyes" },
    ],
  },
  {
    title: "表情",
    key: "face",
    data: [
      { label: "坚定神情", value: "determined expression" },
      { label: "浅笑", value: "smiling expression" },
      { label: "严肃神情", value: "serious expression" },
      { label: "冷静面容", value: "stoic expression" },
      { label: "狡黠笑容", value: "playful grin" },
      { label: "怒吼表情", value: "fierce snarl" },
      { label: "温和微笑", value: "warm smile" },
    ],
  },
  {
    title: "肤色",
    key: "skin",
    data: [
      { label: "白皙肤色", value: "fair skin" },
      { label: "健康小麦色", value: "tan skin" },
      { label: "橄榄肤色", value: "olive skin" },
      { label: "深褐肤色", value: "deep brown skin" },
      { label: "雀斑肌肤", value: "freckled skin" },
      { label: "瓷白肤色", value: "porcelain skin" },
      { label: "日晒肤色", value: "sunburned skin" },
    ],
  },
  {
    title: "上装",
    key: "top",
    data: [
      { label: "多功能夹克", value: "utility jacket" },
      { label: "层叠外套", value: "layered coat" },
      { label: "轻便上衣", value: "casual tunic" },
      { label: "护甲背心", value: "armored vest" },
      { label: "宽松衬衣", value: "loose shirt" },
      { label: "连帽斗篷", value: "hooded cloak" },
      { label: "祭典长袍", value: "ceremonial robe" },
      { label: "忍者服", value: "shinobi gi" },
      { label: "处刑人袍", value: "executioner robe" },
      { label: "海盗外套", value: "pirate convict coat" },
      { label: "人仙丝衣", value: "junshi silk" },
      { label: "道人僧披", value: "tao monk wrap" },
    ],
  },
  {
    title: "下装",
    key: "bottom",
    data: [
      { label: "多袋长裤", value: "cargo trousers" },
      { label: "修身长裤", value: "fitted pants" },
      { label: "裙摆裹身", value: "pleated skirt" },
      { label: "战斗短裤", value: "battle shorts" },
      { label: "飘逸袍裳", value: "flowing robes" },
      { label: "护甲护腿", value: "armored greaves" },
      { label: "层叠绑带", value: "layered wraps" },
      { label: "束身战裤", value: "binding trousers" },
      { label: "处刑人袴裤", value: "executioner hakama" },
      { label: "囚服残裤", value: "tattered convict pants" },
      { label: "人仙花瓣裙", value: "junshi petal skirts" },
      { label: "僧侣裹足", value: "temple sandals wraps" },
    ],
  },
  {
    title: "整套风格",
    key: "set",
    data: [
      { label: "战斗制服", value: "combat uniform" },
      { label: "旅者便装", value: "casual traveler outfit" },
      { label: "正式礼服", value: "formal attire" },
      { label: "潜行装备", value: "stealth gear" },
      { label: "祭典服饰", value: "festival outfit" },
      { label: "王室礼装", value: "royal regalia" },
      { label: "漂泊者装束", value: "nomad attire" },
      { label: "神仙郷调查队", value: "shinsenkyo survey team" },
      { label: "山田浅ェ门制服", value: "yamada asaemon execution set" },
      { label: "道僧巡礼装", value: "tao monk pilgrim" },
      { label: "人仙守卫装", value: "junshi guardian set" },
      { label: "海盗冒险装", value: "pirate adventurer set" },
    ],
  },
  {
    title: "材质",
    key: "material",
    data: [
      { label: "编织布料", value: "woven fabric" },
      { label: "抛光皮革", value: "polished leather" },
      { label: "强化护板", value: "reinforced armor" },
      { label: "高科纤维", value: "high-tech fiber" },
      { label: "有机织纹", value: "organic weave" },
      { label: "龙皮", value: "dragonhide" },
      { label: "秘术布料", value: "mystic cloth" },
      { label: "血迹亚麻", value: "blood stained linen" },
      { label: "血肉花瓣甲", value: "flesh armor petals" },
      { label: "道气丝绸", value: "tao infused silk" },
      { label: "麻绳束缚", value: "rope bindings" },
      { label: "竹纤维", value: "bamboo fiber" },
    ],
  },
  {
    title: "配件",
    key: "accessory",
    data: [
      { label: "多功能腰带", value: "utility belt" },
      { label: "手套", value: "gloves" },
      { label: "围巾", value: "scarf" },
      { label: "头饰", value: "headgear" },
      { label: "饰品", value: "jewelry" },
      { label: "弹药带", value: "bandolier" },
      { label: "秘术手卷", value: "magic tome accessory" },
      { label: "处刑刀", value: "executioner blade" },
      { label: "忍者锁链", value: "shinobi chain" },
      { label: "道念念珠", value: "tao prayer beads" },
      { label: "囚犯镣铐", value: "convict shackles" },
      { label: "人仙面具", value: "junshi mask" },
    ],
  },
];

const examples = [
  {
    image:
      "https://cdn.ocmaker.app/example/hells-paradise-oc-maker-generated-1.webp",
    prompt:
      "1boy, long black hair tied up, intense golden eyes, stoic expression, hells paradise style ninja outfit, katana and kunai, execution ground survivor, mysterious island setting, anime style, looking at viewer, simple background, upper body",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/hells-paradise-oc-maker-generated-2.webp",
    prompt:
      "1girl, white hair with red tips, crimson eyes, dangerous smile, hells paradise style kunoichi attire, dual wielding blades, criminal tattoos, battle scars, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/hells-paradise-oc-maker-generated-3.webp",
    prompt:
      "1boy, short silver hair, blue eyes, calm expression, hells paradise style asaemon samurai uniform, executioner sword, noble bearing, island expedition gear, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/hells-paradise-oc-maker-generated-4.webp",
    prompt:
      "1girl, green hair with flowers, heterochromia eyes, ethereal expression, hells paradise style tensen robes, plant manipulation hints, immortal aura, mystical island native, single character, upper body, looking at viewer, anime style, simple background",
  },
];

export default {
  meta: {
    title: "地狱乐 OC 角色生成器",
    description:
      "借助 AI 打造你的《地狱乐》原创角色，描绘忍者、处刑人与天仙岛的血战旅程。",
  },
  series: "地狱乐",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "地狱乐 OC 生成器",
      description: "输入角色设定，即刻生成充满江户暗黑气息的角色图像与故事。",
    },
    step: {
      title: "如何打造地狱乐 OC",
      description: "只需三步，便能让你的角色在神仙郷中求生或成魔。",
      steps: [
        {
          title: "描述外貌与身份",
          description:
            "说明角色是死刑犯、山田浅ェ门，或是天仙与人仙实验体，并补充服装、武器与道痕特色。",
        },
        {
          title: "补充战斗与目标",
          description:
            "写明忍术、刀法、道术或神秘能力，同时阐述他们追寻的赦免、仙药或复仇心愿。",
        },
        {
          title: "生成生死同行者",
          description:
            "点击“生成角色”，从多张 AI 图像中挑选最贴合神仙郷残酷氛围的版本。",
        },
      ],
    },
    examples: {
      title: "地狱乐 OC 示例",
      description:
        "浏览由 地狱乐 OC 生成器 生成的忍者、处刑人与天仙改造体。",
      examples,
    },
    features: {
      title: "地狱乐 OC 生成器 的特色",
      description: "专注江户暗黑幻想，帮助你塑造兼具血腥与哲思的原创角色。",
      features: [
        {
          label: "正统暗黑画风",
          description: "角色线条与花妖细节贴近原作残酷又华美的美术风格。",
        },
        {
          label: "忍术／道术整合",
          description:
            "AI 理解忍者、天仙与山田浅ェ门的战斗语言，确保能力设定合理夺目。",
        },
        {
          label: "快速呈现生死旅人",
          description: "数秒内生成立绘，协助描写岛上追猎、联盟与背叛的剧情。",
        },
        {
          label: "高解析幻想视觉",
          description: "图像呈现岛屿诡花、血溅与神秘气场，适合剧本与同人创作。",
        },
        {
          label: "多路线角色尝试",
          description: "每次生成提供不同身份与战斗姿态，便于探索角色命运岔路。",
        },
        {
          label: "与原作世界观契合",
          description: "角色自然融入幕府、忍村与天仙势力的冲突，故事延展性强。",
        },
      ],
    },
    faqs: {
      title: "常见问题",
      description: "还有疑问？欢迎写信至 support@ocmaker.app",
      faqs: [
        {
          question: "什么是 地狱乐 OC 生成器？如何运作？",
          answer:
            "地狱乐 OC 生成器 是专为《地狱乐》打造的 AI 工具。描述角色后，即可生成江户暗黑风的角色图像。",
        },
        {
          question: "要如何呈现地狱乐的残酷美？",
          answer:
            "请加入忍术、处刑者礼仪、道术或天仙元素等细节，并说明他们的罪行或信念。",
        },
        {
          question: "可以免费使用吗？",
          answer: "可以。基础功能免费；升级方案提供更快生成与更多造型选项。",
        },
        {
          question: "为何生成结果如此贴近原作氛围？",
          answer:
            "系统针对《地狱乐》的画风与氛围调校，保留诡异植物与血战张力。",
        },
        {
          question: "生成的角色能用于商业用途吗？",
          answer:
            "可以！你用 地狱乐 OC 生成器 创作的原创角色归你所有，可用于个人或商业项目。",
        },
        {
          question: "需要注册账号才能使用吗？",
          answer:
            "基础模式无需注册；注册后可保存角色、查看生成记录并解锁更多暗黑主题功能。",
        },
        {
          question: "能重复微调同一角色吗？",
          answer:
            "可以。可重复生成或调整描述，直到角色的外观与故事符合你的构想。",
        },
        {
          question: "未来还会推出其他暗黑奇幻题材的 OC 生成器 吗？",
          answer: "会的！我们持续扩充暗黑、历史与武侠题材，欢迎关注最新更新。",
        },
      ],
    },
    cta: {
      title: "踏上神仙郷的生死斗",
      description:
        "无需绘画技能，只要描述，就能让原创角色降临血花与长生的战场。",
      btns: {
        start: "开始创作",
        explore: "探索 OC 示例",
      },
    },
  },
};
