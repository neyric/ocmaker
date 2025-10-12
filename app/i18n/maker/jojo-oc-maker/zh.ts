const basePrompt = `
  WORLD CONTEXT:
  故事：《JOJO 的奇妙冒险》
  背景概述：跨越数代的乔斯达家族、波纹与替身能力、环球豪华对决、围绕神秘遗物展开的冒险
  关键要素：乔斯达同盟、DIO 的余波、斯比特瓦根基金会、柱之男、帕肖内黑手党、杜王町社区、钢之炼球大赛选手、石之海囚犯

  OUTPUT FORMAT:
  姓名、替身／能力名称与效果、所属时代／篇章、战斗风格、性格、替身弱点／限制、背景剪影

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "钢球竞速参赛者",
    description: "以沙暴旋律驰骋大漠的骑手替身使者。",
    prompt: `角色名称？
艾米莉亚·克里德

替身或能力名称与效果？
替身「沙之奏鸣」——以节奏驱动的砂浪切割敌人

所属时代或篇章？
钢之炼球篇，与约翰尼·乔斯达并肩

战斗风格？
骑乘利用旋转之力，并以口琴暗号操纵替身

性格？
坚毅、多愁善感，对同伴极度忠诚

替身的弱点或限制？
演奏中断时替身会立刻失衡

背景剪影。
为挽救濒临破产的家族牧场参加大赛，转瞬卷入圣人遗体争夺。`,
  },
  {
    title: "帕肖内会计",
    description: "在账本与暗杀之间游走的黑手党成员。",
    prompt: `角色名称？
里卡多·文特斯卡

替身或能力名称与效果？
替身「税务稽查」——计算目标的人生债务并瞬间冻结其行动

所属时代或篇章？
第五部，布加拉提改革派阵营

战斗风格？
近身摔投结合精准替身打击

性格？
冷静、毒舌、追求绝对秩序

替身的弱点或限制？
必须掌握目标本名与财务记录

背景剪影。
揭穿为迪亚波罗洗钱的干部后，被布加拉提招募，暗中协助改革帕肖内。`,
  },
  {
    title: "杜王町艺术家",
    description: "让涂鸦化身援军的本地创作者。",
    prompt: `角色名称？
东云明纪

替身或能力名称与效果？
替身「墨心」——赋予画作 77 秒的生命力

所属时代或篇章？
第四部・不灭钻石

战斗风格？
中距离包夹战术，以动态涂鸦困敌

性格？
富创意、善良，有点恶作剧精神

替身的弱点或限制？
作品一旦被弄脏，替身即刻崩溃

背景剪影。
作为康一的青梅竹马，在为商店街绘制守护神时觉醒替身，与乔斯达阵营并肩。`,
  },
  {
    title: "星尘旅者",
    description: "协助埃及远征的考古学家。",
    prompt: `角色名称？
萨米尔·拉希德博士

替身或能力名称与效果？
替身「法老回响」——从文物中召唤守护灵形成防护

所属时代或篇章？
第三部・星尘斗士之旅

战斗风格？
支援型，提供屏障并解析敌人情报

性格？
博学、诙谐，危机时沉着冷静

替身的弱点或限制？
必须持有蕴含个人历史的遗物才能发动

背景剪影。
曾被诅咒封印，获约瑟夫解救后踏上远征，用考古知识协助团队。`,
  },
  {
    title: "石之海囚犯",
    description: "以折纸为陷阱的囚犯替身使者。",
    prompt: `角色名称？
玛丽娜·福德

替身或能力名称与效果？
替身「纸之枷锁」——折出锋利纸刃并受命令行动

所属时代或篇章？
第六部・石之海

战斗风格？
布设陷阱、狱道伏击

性格？
坚韧、机智，心中压抑怒火

替身的弱点或限制？
纸张遇水即解体，替身随之失效

背景剪影。
被白蛇派系栽赃入狱，寻求证据证明清白，与空条徐伦结盟。`,
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
      { label: "少年主角感", value: "teen protagonist" },
      { label: "年轻替身使者", value: "young stand user" },
      { label: "漂泊冒险家", value: "roaming adventurer" },
      { label: "Passione 成员", value: "passione member age" },
      { label: "SBR 骑手", value: "sbr racer age" },
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
      { label: "优雅", value: "graceful" },
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
      { label: "辫发", value: "braided hair" },
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
      { label: "挑衅笑容", value: "playful grin" },
      { label: "怒吼神态", value: "fierce snarl" },
      { label: "温暖微笑", value: "warm smile" },
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
      { label: "休闲束腰上衣", value: "casual tunic" },
      { label: "护甲马甲", value: "armored vest" },
      { label: "宽松衬衫", value: "loose shirt" },
      { label: "连帽斗篷", value: "hooded cloak" },
      { label: "典礼长袍", value: "ceremonial robe" },
      { label: "乔斯达学园制服", value: "joestar school uniform" },
      { label: "帕肖内西装", value: "passione suit" },
      { label: "SBR 竞速外套", value: "sbr racer jacket" },
      { label: "杜王町街头风", value: "morioh street fashion" },
      { label: "石之海囚服上衣", value: "stone ocean prison top" },
    ],
  },
  {
    title: "下装",
    key: "bottom",
    data: [
      { label: "多袋长裤", value: "cargo trousers" },
      { label: "修身长裤", value: "fitted pants" },
      { label: "百褶裙", value: "pleated skirt" },
      { label: "战斗短裤", value: "battle shorts" },
      { label: "飘逸袍裙", value: "flowing robes" },
      { label: "护甲护腿", value: "armored greaves" },
      { label: "层叠裹裙", value: "layered wraps" },
      { label: "时尚长裤", value: "stylized slacks" },
      { label: "链饰长裤", value: "chain embellished pants" },
      { label: "竞速护腿", value: "race ready chaps" },
      { label: "囚服条纹裤", value: "prison stripes" },
      { label: "贴身牛仔裤", value: "fitted jeans" },
    ],
  },
  {
    title: "整套风格",
    key: "set",
    data: [
      { label: "战斗制服", value: "combat uniform" },
      { label: "旅途便装", value: "casual traveler outfit" },
      { label: "正式礼装", value: "formal attire" },
      { label: "潜行装备", value: "stealth gear" },
      { label: "节庆服饰", value: "festival outfit" },
      { label: "皇家礼服", value: "royal regalia" },
      { label: "游牧装束", value: "nomad attire" },
      { label: "星尘斗士套装", value: "stardust crusader set" },
      { label: "帕肖内干部套装", value: "passione capo set" },
      { label: "钢球跑者套装", value: "steel ball run set" },
      { label: "杜王町潮流套装", value: "morioh stylish set" },
      { label: "石之海囚犯套装", value: "stone ocean inmate set" },
    ],
  },
  {
    title: "材质",
    key: "material",
    data: [
      { label: "编织布料", value: "woven fabric" },
      { label: "抛光皮革", value: "polished leather" },
      { label: "强化装甲", value: "reinforced armor" },
      { label: "高科纤维", value: "high-tech fiber" },
      { label: "有机织纹", value: "organic weave" },
      { label: "龙皮", value: "dragonhide" },
      { label: "秘术布料", value: "mystic cloth" },
      { label: "金属链饰", value: "metal chains" },
      { label: "替身共鸣布", value: "stand resonance cloth" },
      { label: "骑士竞速皮革", value: "racing leather" },
      { label: "杜王町丝绸", value: "morioh silk" },
      { label: "石海囚布", value: "stone ocean weave" },
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
      { label: "能力手册", value: "magic tome accessory" },
      { label: "星条徽章", value: "joestar emblem" },
      { label: "替身指环", value: "stand focus ring" },
      { label: "铁链护身符", value: "chain charm" },
      { label: "旋转钢球", value: "steel ball accessory" },
      { label: "石海监狱徽记", value: "stone ocean badge" },
    ],
  },
];

const examples = [
  {
    image: "https://cdn.ocmaker.app/example/jojo-oc-generated-1.webp",
    prompt:
      "1boy, purple hair with golden highlights, green eyes, dramatic pose, colorful stand user outfit, elaborate accessories, stand manifestation behind, menacing aura, jojo bizarre art style, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/jojo-oc-generated-2.webp",
    prompt:
      "1girl, rainbow hair gradient, heterochromatic eyes, cowboy hat, stone ocean prison uniform, weather manipulation stand, dramatic lighting effects, jojo part 6 style, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/jojo-oc-generated-3.webp",
    prompt:
      "1boy, dark skin with white hair, golden eyes, gangster outfit, stand user, mysterious smile, arrow-shaped accessories, baroque patterns, jojo part 5 style, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/jojo-oc-generated-4.webp",
    prompt:
      "1girl, pink hair in pompadour style, yellow eyes, delinquent school uniform, stand ability visualization, fierce expression, colorful geometric patterns, jojo part 4 style, single character, upper body, looking at viewer, anime style, simple background",
  },
];

export default {
  meta: {
    title: "JOJO OC 角色生成器",
    description:
      "借助 AI 打造你的《JOJO 的奇妙冒险》原创角色，设计替身能力与跨时代冒险。",
  },
  series: "JOJO 的奇妙冒险",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "JOJO OC 生成器",
      description:
        "输入角色设定，即刻生成荒木风格的原创替身使者，兼具华丽造型与怪奇能力。",
    },
    step: {
      title: "如何打造 JOJO OC",
      description:
        "使用 JOJO OC 生成器 创作角色就像展开一场奇妙冒险，依照以下步骤完成你的替身使者。",
      steps: [
        {
          title: "描述替身使者",
          description:
            "填写角色外貌与性格，融入 JOJO 特有的夸张服饰、姿势与鲜明配色。",
        },
        {
          title: "设计替身能力",
          description:
            "为角色命名替身、设定能力、外形与弱点。加入替身参数、特殊限制，让能力更具 JoJo 味。",
        },
        {
          title: "生成并摆出姿势",
          description:
            "点击“生成角色”后即可得到多组 AI 设计，从中挑选最符合想像的奇妙替身使者。",
        },
      ],
    },
    examples: {
      title: "JOJO 角色示例",
      description: "浏览使用 JOJO OC 生成器 文字提示生成的奇妙角色。",
      examples,
    },
    features: {
      title: "JOJO OC 生成器 是什么？",
      description:
        "JOJO OC 生成器 是专为《JOJO 的奇妙冒险》打造的版本。描述替身使者后，系统会即时生成荒木风格的怪奇插画。",
      features: [
        {
          label: "原汁原味的荒木画风",
          description:
            "角色呈现荒木飞吕彦式的夸张姿态、时尚服装与戏剧打光，完美融入任一部 JOJO。",
        },
        {
          label: "替身系统整合",
          description:
            "提示词针对替身能力、参数与类型做优化，帮助你打造既合理又离奇的替身设定。",
        },
        {
          label: "高速生成奇妙角色",
          description:
            "数秒即可获得高质量角色图像，适用于漫画剧情、CP 练习或角色扮演企划。",
        },
        {
          label: "细致替身视觉",
          description:
            "AI 能输出细腻的替身造型、服装纹饰及象征物，让角色个性一眼可见。",
        },
        {
          label: "多种姿势表现",
          description: "一次生成多种造型，让你自由选择最有气势的“JOJO 立”。",
        },
        {
          label: "完整角色档案",
          description:
            "除了图像，也可延伸替身能力、弱点、世代背景等资料，构成完整冒险档案。",
        },
      ],
    },
    faqs: {
      title: "常见问题",
      description: "还有其他问题？可写信到 support@ocmaker.app",
      faqs: [
        {
          question: "JOJO OC 生成器 是什么？如何运作？",
          answer:
            "这是针对 JOJO 世界观打造的 AI 工具。只要描述角色的外观与替身能力，即可生成荒木风格插画。",
        },
        {
          question: "如何让角色更像 JOJO？",
          answer:
            "描述中加入时代背景、服饰细节、替身命名与弱点限制，就能更贴合原作气质。",
        },
        {
          question: "可以免费使用吗？",
          answer:
            "可以。基础功能免费开放；若想更快生成或获取更多自订选项，可升级方案。",
        },
        {
          question: "为什么替身设计能如此还原？",
          answer:
            "系统针对 JOJO 的画风、替身规则与戏剧性构图进行训练，确保角色符合原作逻辑。",
        },
        {
          question: "生成的角色能用于同人或 cosplay 规划吗？",
          answer:
            "当然可以！你用 JOJO OC 生成器 创作的角色归你所有，可用于同人创作、舞台演出或服装设计。",
        },
        {
          question: "需要注册账号才能使用吗？",
          answer:
            "基础功能不需注册；注册后可保存角色、查看历史记录并解锁更多奇妙功能。",
        },
        {
          question: "能否创建不同部的角色？",
          answer:
            "可以！无论是第一部的波纹战士、第五部的黑手党，或第八部的平行世界，都可自由发挥。",
        },
        {
          question: "未来还会新增其他荒木风 OC 生成器吗？",
          answer:
            "会的！我们持续扩充动漫 OC 生成器，敬请关注 ocmaker.app 的后续更新。",
        },
      ],
    },
    cta: {
      title: "创造你的替身使者",
      description:
        "无需绘画技能，只要描述，即可让原创替身使者摆出奇妙姿势、踏上冒险！",
      btns: {
        start: "开始创作",
        explore: "探索角色",
      },
    },
  },
};
