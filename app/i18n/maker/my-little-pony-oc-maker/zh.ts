const basePrompt = `
  WORLD CONTEXT:
  故事：《我的小马驹：友情就是魔法》
  背景概述：小马国的魔法小镇与和谐元素、友谊任务交织，多族小马与奇幻生物共谱音乐般的奇想
  关键地点：小马镇、坎特洛特、水晶帝国、无序森林、友谊学院、牦牛斯坦、幻形灵巢穴、巨龙之地

  OUTPUT FORMAT:
  姓名、种族与族群、居住地、可爱标记与天赋、性格、友谊课题／目标、背景片段

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "水晶帝国史学者",
    description: "使用附魔羽笔保存古老歌谣的水晶小马。",
    prompt: `角色名称？
星辉典藏

种族与族群？
水晶小马

居住地？
水晶帝国

可爱标记与天赋？
雪花上书写羽毛的可爱标记，能把记忆转录进音乐盒

性格？
温柔、好学、暗地里又向往冒险

友谊课题或目标？
让小马们明白分享故事能让历史更加闪耀

背景片段。
摆脱索姆布拉王的控制后，她巡游小马国各地图书馆，立誓守护每一段传说。`,
  },
  {
    title: "云中城气象队长",
    description: "在天空编排彩虹光秀的飞马队长。",
    prompt: `角色名称？
疾风虹影

种族与族群？
飞马

居住地？
云中城

可爱标记与天赋？
交叉羽翼包裹棱光的可爱标记，擅长以天气打造光影演出

性格？
精力旺盛、富有魅力、偶尔有些爱出风头

友谊课题或目标？
学会团队默契比掌声更重要

背景片段。
在一次灯光秀失利后，云宝黛茜亲自指导她如何与气象小队协调合作。`,
  },
  {
    title: "无序森林草药师",
    description: "一位打造驱狼灯笼的陆马药师。",
    prompt: `角色名称？
蕨光

种族与族群？
陆马

居住地？
无序森林边缘

可爱标记与天赋？
发光树叶的可爱标记，擅长熬制防护药膏

性格？
温暖、勇敢、偶尔有点心不在焉

友谊课题或目标？
向小马镇证明无序森林也能成为朋友

背景片段。
斑马泽科拉帮助她克服恐惧，自此她带领他人安心探索森林。`,
  },
  {
    title: "坎特洛特礼仪导师",
    description: "协助贵族找回真我风采的独角兽导师。",
    prompt: `角色名称？
露雅映文

种族与族群？
独角兽

居住地？
坎特洛特

可爱标记与天赋？
镜子与羽毛笔的可爱标记，引导他人展现真实礼仪

性格？
优雅、善良、妙语如珠

友谊课题或目标？
传递真正的优雅来自共情而非头衔

背景片段。
曾被迫迎合严苛礼节，与瑞瑞成为挚友后，她学会庆祝独特自我。`,
  },
  {
    title: "牦牛斯坦大使",
    description: "以音乐与糕点融合文化的牦牛大使。",
    prompt: `角色名称？
雅琪玛鼓律

种族与族群？
牦牛

居住地？
牦牛斯坦

可爱标记与天赋？
以仪式战鼓取代可爱标记，用节奏团结各族伙伴

性格？
豪爽、真诚、全心投入

友谊课题或目标？
向各王国证明差异让和谐更坚固

背景片段。
萍琪派启发她分享牦牛文化，如今她带着友谊庆典巡游小马国。`,
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
      { label: "幼驹", value: "young foal" },
      { label: "可爱标记童子军", value: "cutie mark crusader" },
      { label: "成年小马", value: "adult pony" },
      { label: "皇家顾问", value: "royal advisor" },
      { label: "远古生灵", value: "ancient creature" },
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
    title: "鬃毛",
    key: "hair",
    data: [
      { label: "黑色短鬃", value: "short black hair" },
      { label: "棕色长鬃", value: "long brown hair" },
      { label: "金色鬃毛", value: "blonde hair" },
      { label: "红色鬃毛", value: "red hair" },
      { label: "银色鬃毛", value: "silver hair" },
      { label: "蓝色鬃毛", value: "blue hair" },
      { label: "白色鬃毛", value: "white hair" },
      { label: "编织鬃毛", value: "braided hair" },
      { label: "薰衣草波浪鬃毛", value: "wavy lavender hair" },
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
      { label: "宽松衬衫", value: "loose shirt" },
      { label: "兜帽斗篷", value: "hooded cloak" },
      { label: "典礼长袍", value: "ceremonial robe" },
      { label: "友谊学院背心", value: "friendship school vest" },
      { label: "皇家礼袍", value: "royal regalia" },
      { label: "冒险围巾", value: "adventure scarf" },
      { label: "飞行队夹克", value: "wonderbolt jacket" },
      { label: "水晶帝国披肩", value: "crystal empire shawl" },
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
      { label: "飘逸长裙", value: "flowing robes" },
      { label: "装甲护腿", value: "armored greaves" },
      { label: "层叠束带", value: "layered wraps" },
      { label: "飘带尾饰", value: "tail ribbons" },
      { label: "鞍裙", value: "saddle skirts" },
      { label: "冒险鞍袋", value: "adventure saddlebags" },
      { label: "正装垂饰", value: "formal drape" },
      { label: "牦牛斯坦流苏", value: "yakyakistan tassels" },
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
      { label: "庆典服饰", value: "festival outfit" },
      { label: "皇家礼袍", value: "royal regalia" },
      { label: "游牧套装", value: "nomad attire" },
      { label: "小马镇休闲装", value: "ponyville casual" },
      { label: "坎特洛特舞会礼服", value: "canterlot gala" },
      { label: "飞行队飞行装", value: "wonderbolt flight" },
      { label: "水晶帝国礼装", value: "crystal empire formal" },
      { label: "友谊学院制服", value: "friendship school uniform" },
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
      { label: "星丝绸", value: "star thread silk" },
      { label: "云织布", value: "cloud weave" },
      { label: "晶耀材质", value: "crystal shimmer" },
      { label: "无序森林树皮", value: "everfree bark" },
      { label: "和谐缎", value: "harmony satin" },
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
      { label: "魔法典籍", value: "magic tome accessory" },
      { label: "可爱标记胸针", value: "cutie mark pin" },
      { label: "友谊手链", value: "friendship bracelet" },
      { label: "魔角指环", value: "magic horn ring" },
      { label: "飞行队护目镜", value: "wonderbolt goggles" },
      { label: "龙鳞护符", value: "dragon scale charm" },
    ],
  },
];

const examples = [
  {
    image: "https://cdn.ocmaker.app/example/mlp-oc-generateds-1.webp",
    prompt:
      "1girl, pastel rainbow mane, sky blue coat, cutie mark with lightning bolt, unicorn horn, magical sparkles, cheerful expression, My Little Pony style, looking at viewer, simple background, upper body",
  },
  {
    image: "https://cdn.ocmaker.app/example/mlp-oc-generateds-2.webp",
    prompt:
      "1girl, lavender mane with silver streaks, white coat, pegasus wings, star cutie mark, gentle smile, My Little Pony style, flying pose, looking at viewer, clouds background, upper body",
  },
  {
    image: "https://cdn.ocmaker.app/example/mlp-oc-generateds-3.webp",
    prompt:
      "1girl, emerald green mane, orange coat, earth pony, apple cutie mark, determined expression, My Little Pony style, farming pose, looking at viewer, simple background, upper body",
  },
  {
    image: "https://cdn.ocmaker.app/example/mlp-oc-generateds-4.webp",
    prompt:
      "1girl, cotton candy pink mane, mint green coat, unicorn horn, cupcake cutie mark, baker's hat, joyful expression, My Little Pony style, looking at viewer, simple background, upper body",
  },
];

export default {
  meta: {
    title: "我的小马驹 OC 角色生成器",
    description:
      "借助 AI 打造你的《我的小马驹》原创角色，设计魔法小马、独特可爱标记与友谊冒险。",
  },
  series: "我的小马驹",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "My Little Pony OC Maker",
      description:
        "输入角色设定，几秒内生成专属的友谊与魔法小马角色。",
    },
    step: {
      title: "如何打造 My Little Pony OC",
      description:
        "创造你的梦幻小马朋友既神奇又简单，按照以下步骤让角色在小马国诞生。",
      steps: [
        {
          title: "决定小马类型与配色",
          description:
            "选择是独角兽、飞马还是陆马，再搭配毛色、鬃毛造型与瞳色。柔和的粉彩或鲜明的对比都能呈现正统 MLP 风格。",
        },
        {
          title: "设计专长与可爱标记",
          description:
            "描述小马的独特天赋与象征图案，可以是魔法、天气、音乐或手作。让可爱标记展现他们不可取代的才能。",
        },
        {
          title: "生成你的魔法小马",
          description:
            "点击“生成角色”，即可获得多张 AI 创作的设计，挑选最符合友谊与和谐精神的伙伴。",
        },
      ],
    },
    examples: {
      title: "My Little Pony 角色示例",
      description: "浏览使用 My Little Pony OC Maker 文字提示生成的魔法小马。",
      examples,
    },
    features: {
      title: "My Little Pony OC Maker 的特色",
      description:
        "专为小马国世界观打造，快速生成拥有可爱标记与友谊羁绊的原创角色。",
      features: [
        {
          label: "正统 MLP 画风",
          description:
            "角色表情、鬃毛与可爱标记贴合原作的明亮线条与温暖色调。",
        },
        {
          label: "多元小马族群",
          description:
            "可自订独角兽魔法、飞马天气技巧或陆马自然感知，让每个族群展现独特魅力。",
        },
        {
          label: "快速角色生成",
          description:
            "几秒内完成设定，立即看到适合冒险、课堂或舞会的多种造型方案。",
        },
        {
          label: "高品质卡通呈现",
          description:
            "AI 针对 MLP 视觉训练，呈现饱含友谊精神的柔和光影与可爱姿态。",
        },
        {
          label: "丰富选择探索",
          description:
            "每次提示可得到多张图像，尝试不同毛色、鬃毛与可爱标记组合，找到理想搭配。",
        },
        {
          label: "小马国世界契合",
          description:
            "生成的角色天生属于小马国，拥有和谐元素、友谊课程与跨族连结。",
        },
      ],
    },
    faqs: {
      title: "常见问题",
      description: "还有疑问？欢迎写信至 support@ocmaker.app",
      faqs: [
        {
          question: "什么是 My Little Pony OC Maker？它如何运作？",
          answer:
            "My Little Pony OC Maker 是专门用于创作原创小马角色的 AI 工具。描述小马的类型、配色与特长，AI 会生成贴近 MLP 风格的图像。",
        },
        {
          question: "要如何提升 My Little Pony 角色的生成品质？",
          answer:
            "请在提示中写明小马类型（独角兽、飞马、陆马）、毛色与鬃毛颜色、可爱标记设计以及性格特色，越具体越能呈现理想效果。",
        },
        {
          question: "My Little Pony OC Maker 是否免费？",
          answer:
            "是的，核心功能可免费使用。升级方案提供更快生成速度、更多自订选项与进阶魔法特效。",
        },
        {
          question: "为什么 My Little Pony OC Maker 的成果如此神奇？",
          answer:
            "我们的 AI 针对小马国的艺术风格与世界观训练，理解小马体态、可爱标记象征以及友谊主题。",
        },
        {
          question: "我能商业使用在 My Little Pony OC Maker 中生成的角色吗？",
          answer:
            "可以，所有你创作的原创小马都属于你，可用在个人或商业计划，我们不会主张所有权。",
        },
        {
          question: "使用 My Little Pony OC Maker 需要帐号吗？",
          answer:
            "基础体验无需帐号。注册帐号后可保存角色、查看历史记录，并解锁更多魔法功能。",
        },
        {
          question: "可以重新生成或微调小马设计吗？",
          answer:
            "当然！你可以用相同提示重新生成不同变化，或修改描述直到角色完全符合你的心意。",
        },
        {
          question: "未来会新增其他卡通风格的 OC Maker 吗？",
          answer:
            "会的！我们持续扩充更多动画与卡通世界的专题，欢迎关注最新更新。",
        },
      ],
    },
    cta: {
      title: "创造你的魔法小马伙伴",
      description: "无需绘画技巧，只要想像与描述，就能拥抱友谊与魔法的力量。",
      btns: {
        start: "开始创作",
        explore: "浏览角色",
      },
    },
  },
};

