const basePrompt = `
  WORLD CONTEXT:
  故事：《排球少年!!》
  背景概述：日本高中排球联赛、全国大赛、社团宿敌、集训营、大学与职业球探关注
  关键球队：乌野、音驹、青叶城西、梟谷、白鸟泽、稻荷崎、MSBY 黑狼、白色传说、国家青年训练营

  OUTPUT FORMAT:
  姓名、学校与年级、场上位置、招牌打法／武器、性格、宿敌／目标、排球经历

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "乌野二传手",
    description: "为追上怪人快攻而改变节奏的一年级二传。",
    prompt: `角色名称？
伊势春人

就读学校与年级？
乌野高中，一年级

场上位置？
二传手

招牌打法或武器？
从意想不到角度高速跳传

性格？
专注自律、对自己要求严苛

宿敌或目标？
创造连日向都预料不到的新型怪人快攻

排球经历掠影。
原为篮球选手，看到乌野晋级全国后主动请求乌养教练让他参与训练。`,
  },
  {
    title: "音驹自由人",
    description: "研究猫科反射的自由人，擅长临场救球。",
    prompt: `角色名称？
小爪美香

就读学校与年级？
音驹高中，二年级

场上位置？
自由人

招牌打法或武器？
滚翻式接发与单手救球

性格？
活泼善解人意，场上头脑冷静

宿敌或目标？
在垃圾场之战复赛中击败乌野

排球经历掠影。
是研磨的堂妹，常用激光笔陪庇护猫练反应来强化接球。`,
  },
  {
    title: "梟谷王牌候补",
    description: "观察木兔情绪波动，努力稳定球队的王牌候补。",
    prompt: `角色名称？
相生莉香

就读学校与年级？
梟谷学园，三年级

场上位置？
主攻手

招牌打法或武器？
力量吊球搭配直线轰炸

性格？
精力充沛、善于鼓舞士气，越关键越兴奋

宿敌或目标？
在木兔毕业后再度率队打进全国

排球经历掠影。
在夏令营帮木兔走出低潮后，木兔亲自指导她进攻节奏。`,
  },
  {
    title: "青城副攻",
    description: "痴迷于抢先看穿二传意图的副攻手。",
    prompt: `角色名称？
仙台启太

就读学校与年级？
青叶城西，高二

场上位置？
副攻手

招牌打法或武器？
预判型拦网与虚实滑步

性格？
沉着战术派、追求完美

宿敌或目标？
在下一次地区决赛封锁影山的快攻

排球经历掠影。
初中时看见及川的精巧传球，立志加入青城并紧盯每位二传的习惯。`,
  },
  {
    title: "MSBY 战术分析员",
    description: "把职业战术带入社团实战的大学对角与分析师。",
    prompt: `角色名称？
宫家奈央

就读学校与年级？
阿德勒斯大学排球社，研究生

场上位置？
接应／分析师

招牌打法或武器？
后排 pipe 攻击结合数据化发球策略

性格？
好学乐观，随时记录笔记

宿敌或目标？
争取 MSBY 黑狼的培养合约

排球经历掠影。
曾在福斯特教练手下实习，打造的分析面板获得日向的称赞。`,
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
      { label: "一年级", value: "first year" },
      { label: "二年级", value: "second year" },
      { label: "三年级", value: "third year" },
      { label: "大学球员", value: "college player" },
      { label: "职业联赛", value: "pro league" },
    ],
  },
  {
    title: "体态",
    key: "body",
    data: [
      { label: "修长", value: "slender" },
      { label: "运动型", value: "athletic" },
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
      { label: "俏皮笑容", value: "playful grin" },
      { label: "怒吼斗志", value: "fierce snarl" },
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
      { label: "训练背心", value: "armored vest" },
      { label: "宽松 T 恤", value: "loose shirt" },
      { label: "连帽外套", value: "hooded cloak" },
      { label: "典礼长袍", value: "ceremonial robe" },
      { label: "乌野球衣", value: "karasuno jersey" },
      { label: "音驹球衣", value: "nekoma jersey" },
      { label: "梟谷球衣", value: "fukurodani jersey" },
      { label: "青城球衣", value: "aoba johsai jersey" },
      { label: "MSBY 热身服", value: "msby warm up" },
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
      { label: "飘逸下摆", value: "flowing robes" },
      { label: "护具护腿", value: "armored greaves" },
      { label: "层叠裹裙", value: "layered wraps" },
      { label: "球队短裤", value: "team shorts" },
      { label: "紧身护腿", value: "compression leggings" },
      { label: "训练长裤", value: "practice sweats" },
      { label: "外出长裤", value: "travel pants" },
      { label: "沙滩排球短裤", value: "beach volleyball shorts" },
    ],
  },
  {
    title: "整套风格",
    key: "set",
    data: [
      { label: "战斗制服", value: "combat uniform" },
      { label: "旅途休闲装", value: "casual traveler outfit" },
      { label: "正式礼装", value: "formal attire" },
      { label: "潜行装备", value: "stealth gear" },
      { label: "节庆服饰", value: "festival outfit" },
      { label: "皇家礼服", value: "royal regalia" },
      { label: "游牧装束", value: "nomad attire" },
      { label: "乌野群鸦套装", value: "karasuno crows set" },
      { label: "音驹小野猫套装", value: "nekoma cats set" },
      { label: "梟谷枭队套装", value: "fukurodani owls set" },
      { label: "白鸟泽鹰队套装", value: "schweiden adlers set" },
      { label: "MSBY 黑狼套装", value: "msby black jackals set" },
    ],
  },
  {
    title: "材质",
    key: "material",
    data: [
      { label: "编织布料", value: "woven fabric" },
      { label: "抛光皮革", value: "polished leather" },
      { label: "强化护具", value: "reinforced armor" },
      { label: "高科技纤维", value: "high-tech fiber" },
      { label: "有机织纹", value: "organic weave" },
      { label: "龙皮", value: "dragonhide" },
      { label: "秘术布料", value: "mystic cloth" },
      { label: "吸汗网布", value: "sweat wicking mesh" },
      { label: "透气球衣布", value: "ventilated jersey" },
      { label: "压缩布料", value: "compression fabric" },
      { label: "热身摇粒绒", value: "warm up fleece" },
      { label: "沙滩速干料", value: "beach ready fabric" },
    ],
  },
  {
    title: "配件",
    key: "accessory",
    data: [
      { label: "多功能腰带", value: "utility belt" },
      { label: "手套", value: "gloves" },
      { label: "围巾", value: "scarf" },
      { label: "头带／发箍", value: "headgear" },
      { label: "饰品", value: "jewelry" },
      { label: "弹药带", value: "bandolier" },
      { label: "战术手册", value: "magic tome accessory" },
      { label: "队长袖标", value: "captain armband haikyuu" },
      { label: "护膝", value: "knee pads" },
      { label: "排球手套", value: "volleyball gloves" },
      { label: "颈巾毛巾", value: "neck towel" },
      { label: "运动水壶", value: "water bottle" },
    ],
  },
];

const examples = [
  {
    image: "https://cdn.ocmaker.app/example/haikyuu-oc-generated-1.webp",
    prompt:
      "1boy, spiky orange hair, brown eyes, energetic grin, karasuno volleyball uniform, black and orange jersey number 10, jumping pose, single character, upper body, looking at viewer, anime style, gymnasium background",
  },
  {
    image: "https://cdn.ocmaker.app/example/haikyuu-oc-generated-2.webp",
    prompt:
      "1boy, tall with glasses, blonde hair, golden eyes, analytical expression, tsukishima-style, karasuno uniform, middle blocker stance, single character, upper body, looking at viewer, anime style, volleyball court background",
  },
  {
    image: "https://cdn.ocmaker.app/example/haikyuu-oc-generated-3.webp",
    prompt:
      "1girl, ponytail black hair, determined eyes, serious expression, girls volleyball team uniform, manager clipboard, supportive pose, single character, upper body, looking at viewer, anime style, team bench background",
  },
  {
    image: "https://cdn.ocmaker.app/example/haikyuu-oc-generated-4.webp",
    prompt:
      "1boy, silver hair, sharp eyes, confident smirk, rival team uniform, setter position, tossing pose, single character, upper body, looking at viewer, anime style, tournament venue background",
  },
];

export default {
  meta: {
    title: "排球少年 OC 角色生成器",
    description:
      "借助 AI 打造你的《排球少年!!》原创球员、经理与劲敌，设定专属打法与球队羁绊。",
  },
  series: "排球少年!!",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Haikyuu!! OC Maker",
      description:
        "输入角色设定，几秒内生成拥有飞跃梦想的排球角色形象。",
    },
    step: {
      title: "如何打造 Haikyuu!! OC",
      description:
        "踏入热血排球世界，按照以下步骤设计专属球员或团队成员。",
      steps: [
        {
          title: "决定位置与队伍",
          description:
            "选择角色是二传、主攻、副攻、自由人、接应或经理，再决定所属学校或原创球队，思考他们的职责与特色。",
        },
        {
          title: "描绘打法与个性",
          description:
            "说明身形、招牌球路、弹跳或接发特长，并写出与队友、对手的关系以及驱动他们奋战的动力。",
        },
        {
          title: "生成你的球员",
          description:
            "点击“生成角色”，即可获得多张比赛风格图像，挑选最适合球场的那一位。",
        },
      ],
    },
    examples: {
      title: "排球角色示例",
      description:
        "浏览使用 Haikyuu!! OC Maker 文字提示生成的热血球员。",
      examples,
    },
    features: {
      title: "Haikyuu!! OC Maker 的特色",
      description:
        "专注排球竞技风格，帮助你快速扩充球队阵容与宿敌名单。",
      features: [
        {
          label: "正统运动番画风",
          description:
            "角色线条与球衣细节贴近原作的紧张节奏与跃动感。",
        },
        {
          label: "位置系统理解",
          description:
            "AI 理解不同位置的动作特点，确保体型、气质与打法契合角色定位。",
        },
        {
          label: "快速生成队员",
          description:
            "数秒即可完成球队名单，适合描绘训练、赛事与宿舍生活。",
        },
        {
          label: "高质量比赛视觉",
          description:
            "图像呈现比赛张力、汗水与团队合作，可用于战术讨论或故事创作。",
        },
        {
          label: "多样化打法",
          description:
            "每次生成提供不同姿势与球技，帮助你探索角色的极限。",
        },
        {
          label: "排球世界融合",
          description:
            "角色自然融入各校文化、集训营与职业发展线，故事空间辽阔。",
        },
      ],
    },
    faqs: {
      title: "常见问题",
      description: "还有问题？欢迎留言至 support@ocmaker.app",
      faqs: [
        {
          question: "Haikyuu!! OC Maker 是什么？如何运作？",
          answer:
            "Haikyuu!! OC Maker 是专为《排球少年!!》打造的 AI 工具。描述角色的外貌、位置与打法后，即可生成动画风的排球角色图像。",
        },
        {
          question: "如何让角色更具原作感？",
          answer:
            "请补充专属绝招、跳跃能力、团队关系或励志目标，让角色更立体真实。",
        },
        {
          question: "可以免费使用吗？",
          answer:
            "可以。基础功能免费；升级方案能加速生成或解锁更多队伍与造型。",
        },
        {
          question: "为什么生成效果这么贴近动画？",
          answer:
            "系统针对 Haikyuu!! 的作画风格与比赛氛围调优，保留运动番的张力。",
        },
        {
          question: "生成的角色能否商用？",
          answer:
            "当然可以！你用 Haikyuu!! OC Maker 创作的原创角色归你所有，适用于个人或商业计划。",
        },
        {
          question: "需要注册账号才能使用吗？",
          answer:
            "基础模式无需账号；注册后可保存角色、查看生成历史，并解锁更多运动主题功能。",
        },
        {
          question: "能创建不同球队与职位吗？",
          answer:
            "绝对可以！可自由设计来自各校或原创球队的球员、经理乃至教练。",
        },
        {
          question: "未来会有其他运动番主题的 OC Maker 吗？",
          answer:
            "会的！我们正扩展更多运动题材，欢迎关注 ocmaker.app 的更新。",
        },
      ],
    },
    cta: {
      title: "在球场上飞翔",
      description:
        "无需绘画技能，只要描述，就能让原创球员高高跃起、热血扣杀。",
      btns: {
        start: "开始创作",
        explore: "探索角色示例",
      },
    },
  },
};
