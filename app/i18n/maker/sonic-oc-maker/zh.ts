const basePrompt = `
  WORLD CONTEXT:
  故事：《音速小子》
  背景概述：莫比乌斯／盖亚大地、高速冒险、混沌翡翠能量、蛋头博士的机械威胁、自由战士斗争
  关键阵营：索尼克小队、暗影小队、凯欧迪客侦探社、巴比伦飞贼、蛋头帝国、古老针鼹部族、G.U.N. 特勤队、抵抗军

  OUTPUT FORMAT:
  姓名、种族与阵营、招牌能力／极速技巧、装备或 Wispon、性格、宿敌／目标、背景片段

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "疾风狐影",
    description: "以空中特技穿梭风洞的双尾狐飞行员。",
    prompt: `角色名称？
天岚

种族与阵营？
双尾狐，正义阵营

招牌能力或极速技巧？
用双尾当涡轮的“螺旋喷射冲刺”

携带的装备或 Wispon？
自制悬浮滑板与方块型 Wispon

性格？
爱冒险、机灵、永远正向

宿敌或目标？
在世界大奖赛复赛中超越喷射小隼

背景片段。
曾用从尾巴收集的龙卷号零件打造首块滑板，如今为抵抗军绘制空中捷径地图。`,
  },
  {
    title: "守护犰狳",
    description: "披甲护卫莫比乌斯遗迹的犰狳战士。",
    prompt: `角色名称？
铠石

种族与阵营？
犰狳，凯欧迪客盟友

招牌能力或极速技巧？
制造冲击波的“滚地震击”

携带的装备或 Wispon？
钻头型 Wispon 与强化护臂

性格？
沉稳可靠，幽默藏在心底

宿敌或目标？
守护神秘遗迹下隐藏的莫比乌斯文献

背景片段。
蛋头突袭祖辈档案后加入指节，现今布置陷阱守护大师翡翠机密。`,
  },
  {
    title: "赛博刺猬",
    description: "在竞速中入侵蛋头网络的科技刺猬。",
    prompt: `角色名称？
字节

种族与阵营？
刺猬，中立阵营

招牌能力或极速技巧？
将数据流转化速度的“超频跃冲”

携带的装备或 Wispon？
追踪型 Wispon 与腕上控制台

性格？
嘴毒聪明、略带疏离

宿敌或目标？
解救被蛋头困在资料库中的 AI 同伴

背景片段。
曾协助尾巴破解金属索尼克的安全阀，现与索尼克小队并肩破坏 EggNet 节点。`,
  },
  {
    title: "翡翠平原跑者",
    description: "以节奏踢击纵横草原的兔子武斗家。",
    prompt: `角色名称？
莱娅

种族与阵营？
兔子，英雄

招牌能力或极速技巧？
伴随打击节奏的“律动连击”强化速度

携带的装备或 Wispon？
鼓槌型武棍与爆裂 Wispon

性格？
活力四射、热爱音乐、对伙伴忠诚

宿敌或目标？
想在友谊对练中超越艾咪的速度

背景片段。
自幼参加威克多的音乐课，发展出节奏战斗法以解放村庄免受蛋头士兵。`,
  },
  {
    title: "叛逆宝藏猎人",
    description: "游走多方势力抢先夺宝的猫族猎人。",
    prompt: `角色名称？
赛布尔

种族与阵营？
猫族，寻宝系反英雄

招牌能力或极速技巧？
穿梭次元缝隙的“影闪突进”

携带的装备或 Wispon？
镭射爪护甲与钻头型 Wispon

性格？
狡黠风趣、追求刺激

宿敌或目标？
想在蝙蝠茜露之前夺走蛋头的混沌驱动器藏库

背景片段。
曾与茜露搭档，因一次盗宝意见不合分道扬镳，如今两面游走阻止蛋头得手。`,
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
      { label: "老练角色", value: "veteran" },
      { label: "资深长者", value: "seasoned elder" },
      { label: "永恒传奇", value: "timeless legend" },
      { label: "极速少年", value: "teen speedster" },
      { label: "年轻英雄", value: "young hero mobius" },
      { label: "资深冒险家", value: "seasoned adventurer mobius" },
      { label: "抵抗军老兵", value: "resistance veteran" },
      { label: "永恒实体", value: "timeless entity" },
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
      { label: "黑色短发", value: "short black hair" },
      { label: "棕色长发", value: "long brown hair" },
      { label: "金发", value: "blonde hair" },
      { label: "红发", value: "red hair" },
      { label: "银发", value: "silver hair" },
      { label: "蓝发", value: "blue hair" },
      { label: "白发", value: "white hair" },
      { label: "编发", value: "braided hair" },
      { label: "薰衣草波浪发", value: "wavy lavender hair" },
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
      { label: "紫罗兰瞳", value: "violet eyes" },
      { label: "金色瞳", value: "golden eyes" },
    ],
  },
  {
    title: "表情",
    key: "face",
    data: [
      { label: "坚定神情", value: "determined expression" },
      { label: "微笑表情", value: "smiling expression" },
      { label: "严肃神情", value: "serious expression" },
      { label: "冷静面容", value: "stoic expression" },
      { label: "调皮笑容", value: "playful grin" },
      { label: "凌厉咆哮", value: "fierce snarl" },
      { label: "温暖微笑", value: "warm smile" },
    ],
  },
  {
    title: "肤色",
    key: "skin",
    data: [
      { label: "白皙肤色", value: "fair skin" },
      { label: "暖棕肤色", value: "tan skin" },
      { label: "橄榄肤色", value: "olive skin" },
      { label: "深棕肤色", value: "deep brown skin" },
      { label: "雀斑肤色", value: "freckled skin" },
      { label: "瓷白肤色", value: "porcelain skin" },
      { label: "日晒肤色", value: "sunburned skin" },
    ],
  },
  {
    title: "上装",
    key: "top",
    data: [
      { label: "机能夹克", value: "utility jacket" },
      { label: "多层外套", value: "layered coat" },
      { label: "休闲长衫", value: "casual tunic" },
      { label: "装甲马甲", value: "armored vest" },
      { label: "宽松上衣", value: "loose shirt" },
      { label: "兜帽斗篷", value: "hooded cloak" },
      { label: "仪式长袍", value: "ceremonial robe" },
      { label: "极速战斗服", value: "speed suit" },
      { label: "抵抗军夹克", value: "resistance jacket" },
      { label: "科技背心", value: "tech vest" },
      { label: "骑士装备", value: "rider gear" },
      { label: "潜行斗篷", value: "stealth cloak" },
    ],
  },
  {
    title: "下装",
    key: "bottom",
    data: [
      { label: "工装长裤", value: "cargo trousers" },
      { label: "合身长裤", value: "fitted pants" },
      { label: "百褶裙", value: "pleated skirt" },
      { label: "战斗短裤", value: "battle shorts" },
      { label: "飘逸长袍", value: "flowing robes" },
      { label: "装甲护腿", value: "armored greaves" },
      { label: "层叠束带", value: "layered wraps" },
      { label: "疾跑短裤", value: "trail shorts" },
      { label: "动能紧身裤", value: "kinetic leggings" },
      { label: "骑士长裤", value: "rider pants" },
      { label: "机能长裤", value: "utility trousers mobius" },
      { label: "冒险多带", value: "adventure belts" },
    ],
  },
  {
    title: "套装",
    key: "set",
    data: [
      { label: "战斗制服", value: "combat uniform" },
      { label: "旅人便装", value: "casual traveler outfit" },
      { label: "正式礼服", value: "formal attire" },
      { label: "潜行装备", value: "stealth gear" },
      { label: "祭典服饰", value: "festival outfit" },
      { label: "王族礼袍", value: "royal regalia" },
      { label: "浪人衣装", value: "nomad attire" },
      { label: "索尼克小队套装", value: "team sonic set" },
      { label: "凯欧迪客侦探套装", value: "chaotix detective set" },
      { label: "自由战士套装", value: "freedom fighter set" },
      { label: "极限竞速套装", value: "riders racing set" },
      { label: "蛋头潜入套装", value: "eggman infiltration set" },
    ],
  },
  {
    title: "材质",
    key: "material",
    data: [
      { label: "织纹布料", value: "woven fabric" },
      { label: "抛光皮革", value: "polished leather" },
      { label: "强化装甲", value: "reinforced armor" },
      { label: "高科技纤维", value: "high-tech fiber" },
      { label: "有机织物", value: "organic weave" },
      { label: "龙皮", value: "dragonhide" },
      { label: "秘法布", value: "mystic cloth" },
      { label: "极速网布", value: "speed mesh" },
      { label: "耐冲皮革", value: "resistant leather" },
      { label: "科技聚合材", value: "tech polymer" },
      { label: "混沌能量丝", value: "chaos energy thread" },
      { label: "潜行面料", value: "stealth fabric sonic" },
    ],
  },
  {
    title: "配饰",
    key: "accessory",
    data: [
      { label: "机能腰带", value: "utility belt" },
      { label: "手套", value: "gloves" },
      { label: "围巾", value: "scarf" },
      { label: "头饰", value: "headgear" },
      { label: "饰品", value: "jewelry" },
      { label: "肩带", value: "bandolier" },
      { label: "战术手册", value: "magic tome accessory" },
      { label: "动力跑鞋", value: "power sneakers" },
      { label: "护目镜", value: "goggles" },
      { label: "通讯腕表", value: "communicator wrist" },
      { label: "Wispon 工具", value: "wispon" },
      { label: "混沌翡翠碎片", value: "chaos emerald shard" },
    ],
  },
];

const examples = [
  {
    image: "https://cdn.ocmaker.app/example/sonic-oc-generated-1.webp",
    prompt:
      "1girl, silver hair, yellow eyes, spiky hair, fox ears, electric aura, futuristic bodysuit, confident expression, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
  {
    image: "https://cdn.ocmaker.app/example/sonic-oc-generated-2.webp",
    prompt:
      "1boy, cobalt blue hair, red eyes, upward spiky hair, hedgehog ears, speed goggles, tight racing suit, energetic smile, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
  {
    image: "https://cdn.ocmaker.app/example/sonic-oc-generated-3.webp",
    prompt:
      "1girl, hot pink hair, green eyes, messy ponytail, cat ears, graffiti hoodie, rebellious expression, claw gloves, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
  {
    image: "https://cdn.ocmaker.app/example/sonic-oc-generated-4.webp",
    prompt:
      "1boy, red hair, blue eyes, confident smirk, Sonic the Hedgehog style racing suit, helmet, high-speed pose, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
];

export default {
  meta: {
    title: "音速小子 OC 角色生成器",
    description:
      "借助 AI 打造你的索尼克原创角色，设计极速能力、酷炫装备与缤纷冒险。",
  },
  series: "音速小子",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Sonic OC Maker",
      description: "输入设定，几秒内生成索尼克风格的高速伙伴。",
    },
    step: {
      title: "如何打造 Sonic OC",
      description:
        "创造索尼克世界的角色既迅速又有趣，按照以下步骤即可完成。",
      steps: [
        {
          title: "挑选物种与风格",
          description:
            "先决定角色的动物种族与配色。经典索尼克角色拥有鲜明色彩与种族特征，展现与众不同的个性。",
        },
        {
          title: "设计能力与性格",
          description:
            "描述特殊能力、极速技巧与性格，思考他们在冒险中的定位以及与索尼克世界的互动方式。",
        },
        {
          title: "生成你的极速伙伴",
          description:
            "点击“生成角色”，从多款 AI 设计中挑选最符合索尼克动画风格的极速角色。",
        },
      ],
    },
    examples: {
      title: "索尼克角色示例",
      description: "浏览使用 Sonic OC Maker 文本提示生成的高速英雄。",
      examples,
    },
    features: {
      title: "Sonic OC Maker 的特色",
      description:
        "专注索尼克宇宙，打造拥有极速技能与义勇精神的原创角色。",
      features: [
        {
          label: "正统卡通画风",
          description:
            "角色造型、线条与能量特效贴近索尼克系列的快节奏美学。",
        },
        {
          label: "阵营体系理解",
          description:
            "AI 了解索尼克小队、暗影小队到蛋头帝国等势力，让角色轻松融入世界观。",
        },
        {
          label: "极速图像生成",
          description:
            "在几秒内完成角色绘制，把时间留给冒险剧情与速度竞技。",
        },
        {
          label: "高品质卡通呈现",
          description:
            "模型针对索尼克视觉训练，提供充满动感与色彩的角色插画。",
        },
        {
          label: "多造型选择",
          description:
            "每次生成提供不同姿态与装备，找到最能代表你速度哲学的伙伴。",
        },
        {
          label: "深入世界连结",
          description:
            "角色自然带出混沌翡翠、抵抗军或蛋头帝国等叙事元素，拓展更多冒险可能。",
        },
      ],
    },
    faqs: {
      title: "常见问题",
      description: "还有疑问？欢迎写信至 support@ocmaker.app",
      faqs: [
        {
          question: "什么是 Sonic OC Maker？它如何运作？",
          answer:
            "Sonic OC Maker 是专为索尼克宇宙打造的 AI 工具。描述角色外观、能力与阵营，AI 会生成经典索尼克风格的图像。",
        },
        {
          question: "如何让 Sonic OC Maker 生成更棒的角色？",
          answer:
            "请加入动物种族、极速技巧、装备或 Wispon、竞争目标等索尼克元素。细节越多结果越贴近动画氛围。",
        },
        {
          question: "Sonic OC Maker 是否免费？",
          answer:
            "是的，基础功能免费。升级方案提供更快生成速度、额外装备选项与进阶自订功能。",
        },
        {
          question: "为什么 Sonic OC Maker 的成果如此到位？",
          answer:
            "模型针对索尼克画风与世界观训练，理解角色 archetype、速度特效与色彩表现。",
        },
        {
          question: "我能商业使用 Sonic OC Maker 生成的角色吗？",
          answer:
            "可以，你的原创极速角色完全归你所有，可用于个人或商业计划，我们不会主张所有权。",
        },
        {
          question: "使用 Sonic OC Maker 需要帐号吗？",
          answer:
            "基础体验无需帐号。注册后可保存角色、查看历史记录，并解锁高级选项。",
        },
        {
          question: "能创造不同阵营或风格的角色吗？",
          answer:
            "当然！你可以设计索尼克小队、暗影小队、巴比伦飞贼、蛋头帝国乃至全新抵抗军成员。",
        },
        {
          question: "未来会新增其他游戏宇宙的 OC Maker 吗？",
          answer:
            "会的！我们持续扩充更多经典游戏与动画主题，敬请关注最新动态。",
        },
      ],
    },
    cta: {
      title: "化身极速英雄",
      description: "无需绘图技能，只要写下速度传奇，就能与索尼克并肩疾驰。",
      btns: {
        start: "开始创作",
        explore: "浏览角色",
      },
    },
  },
};

