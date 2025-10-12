const basePrompt = `
  WORLD CONTEXT:
  故事：《原神》
  背景概述：提瓦特七国、元素神之眼、众神庇佑、愚人众暗谋、远古遗迹与浮空群岛
  关键阵营：西风骑士团、璃月七星、稻妻幕府、须弥教令院、枫丹审判体系、纳塔部族、愚人众执行官、冒险家协会

  OUTPUT FORMAT:
  姓名、所属国家与阵营、元素神之眼／武器、战斗定位、性格、个人传说任务、背景片段

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "蒙德风吟诗人",
    description: "以歌声摧破风障、疗愈心灵的酒馆歌手。",
    prompt: `角色名称？
莉赛特

她所属的国家与阵营？
蒙德，自由接案的西风骑士团友好诗人

她持有的神之眼与武器？
风元素神之眼，使用法器

战斗定位？
可削减敌人抗性的爆发型辅助

她的性格？
自由浪漫、爱调侃、内心细腻

她的传说任务？
以巡回音乐会弥合失和兄妹的裂痕

背景片段。
曾以摇篮曲平息龙卷而获得神之眼，如今驻守高崖护送往来旅商。`,
  },
  {
    title: "璃月港监理官",
    description: "文案与岩构武艺两不误的港务监察员。",
    prompt: `角色名称？
乔容

他所属的国家与阵营？
璃月七星后勤司

他持有的神之眼与武器？
岩元素神之眼，手持长柄武器

战斗定位？
兼具护盾与控制的爆发坦

性格？
严谨、责任心强、外冷内暖

传说任务？
调查扰乱港口交易的伪造仙家印玺

背景片段。
曾在愚人众袭击中撑起岩盾救下整支码头班组。`,
  },
  {
    title: "稻妻温泉主人",
    description: "以雷元素浸疗守护传统的温泉老板娘。",
    prompt: `角色名称？
萤火

她所属的国家与阵营？
稻妻，与幕府合作的民间温泉守护者

她持有的神之眼与武器？
雷元素神之眼，搭配法器羽扇

战斗定位？
净化减益、提升队友能量的治疗辅助

性格？
沉稳机智，对传统充满自豪

传说任务？
净化受祟神残渊污染的圣泉

背景片段。
继承祖母温泉，并在狩眼令期间保卫家业而被授予神之眼。`,
  },
  {
    title: "须弥学者",
    description: "以草元素构造解决生态危机的沙漠研究者。",
    prompt: `角色名称？
法里德·哈基姆

他所属的国家与阵营？
须弥教令院·因论派

他持有的神之眼与武器？
草元素神之眼，使用弓

战斗定位？
场外挂草触发反应的辅助

性格？
求知若渴、热诚，偶尔冒失

传说任务？
协助旅行者修复枯萎的绿洲

背景片段。
沙尘暴席卷营地时爆发草元素神力，绽放植被守护研究团队。`,
  },
  {
    title: "枫丹辩护人",
    description: "以水元素幻象在战斗中当庭辩论的法律奇才。",
    prompt: `角色名称？
塞莱斯特·博蒙

她所属的国家与阵营？
枫丹最高法院

她持有的神之眼与武器？
水元素神之眼，使用单手剑

战斗定位？
以水元素连段输出的主 C

性格？
魅力十足、原则明确、戏剧感十足

传说任务？
为遭诬陷的钟表机关人辩护，揭露真正的破坏者

背景片段。
在法庭对决中以水幻象揭穿伪证，当场获得神之眼。`,
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
      { label: "年轻冒险者", value: "young adventurer" },
      { label: "西风骑士团成员", value: "knights favonius member" },
      { label: "老练旅行者", value: "experienced traveler" },
      { label: "愚人众叛逃者", value: "fatui defector" },
      { label: "古老仙人", value: "ancient adeptus" },
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
      { label: "凌厉神情", value: "fierce snarl" },
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
      { label: "层叠大衣", value: "layered coat" },
      { label: "休闲束腰上衣", value: "casual tunic" },
      { label: "防护马甲", value: "armored vest" },
      { label: "宽松衬衫", value: "loose shirt" },
      { label: "连帽斗篷", value: "hooded cloak" },
      { label: "典礼长袍", value: "ceremonial robe" },
      { label: "蒙德斗篷", value: "mondstadt cloak" },
      { label: "璃月旗袍", value: "liyue qipao" },
      { label: "稻妻和服", value: "inazuma kimono" },
      { label: "须弥学者袍", value: "sumeru scholar robe" },
      { label: "枫丹法袍", value: "fontaine court jacket" },
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
      { label: "护甲护腿", value: "armored greaves" },
      { label: "层叠裹裙", value: "layered wraps" },
      { label: "元素紧身裤", value: "elemental tights" },
      { label: "沙域裹腿", value: "desert wraps" },
      { label: "旅者短裤", value: "traveler shorts" },
      { label: "宫廷长裙", value: "formal court skirt" },
      { label: "仙家长裤", value: "adeptus trousers" },
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
      { label: "西风骑士制服", value: "favonius knight set" },
      { label: "璃港达人套装", value: "liyue harbor adept" },
      { label: "稻妻神社守护装", value: "inazuma shrine guardian" },
      { label: "须弥教令院制式", value: "sumeru akademiya set" },
      { label: "愚人众执行套", value: "fatui harbinger set" },
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
      { label: "神之眼纹织", value: "vision infused fabric" },
      { label: "琉璃花丝", value: "glaze lily silk" },
      { label: "雷霆纤维", value: "electrocharged weave" },
      { label: "草蔓织带", value: "dendro vines" },
      { label: "水晶虹纹", value: "hydro prisms" },
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
      { label: "魔法手册", value: "magic tome accessory" },
      { label: "神之眼挂座", value: "vision holder" },
      { label: "寻宝罗盘", value: "treasure compass" },
      { label: "风之翼束带", value: "glider harness" },
      { label: "元素催化器", value: "elemental catalyst" },
      { label: "仙家护符", value: "adeptus talisman" },
    ],
  },
  {
    title: "元素神之眼",
    key: "vision",
    data: [
      { label: "火元素", value: "pyro" },
      { label: "水元素", value: "hydro" },
      { label: "雷元素", value: "electro" },
      { label: "风元素", value: "anemo" },
      { label: "岩元素", value: "geo" },
      { label: "冰元素", value: "cryo" },
      { label: "草元素", value: "dendro" },
    ],
  },
];

const examples = [
  {
    image: "https://cdn.ocmaker.app/example/genshin-oc-generated-1.webp",
    prompt:
      "1girl, blonde hair, hazel eyes, playful wink, Genshin Impact bard outfit, musical instrument, cheerful pose, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
  {
    image: "https://cdn.ocmaker.app/example/genshin-oc-generated-2.webp",
    prompt:
      "1girl, turquoise hair, brown eyes, mischievous smile, Genshin Impact thief outfit, treasure map, sneaky pose, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
  {
    image: "https://cdn.ocmaker.app/example/genshin-oc-generated-3.webp",
    prompt:
      "1girl, fiery red hair, yellow eyes, fierce glare, Genshin Impact warrior outfit, dual daggers, aggressive pose, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
  {
    image: "https://cdn.ocmaker.app/example/genshin-oc-generated-4.webp",
    prompt:
      "1boy, silver hair, green eyes, calm expression, Genshin Impact adventurer clothing, bow and quiver, poised stance, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
];

export default {
  meta: {
    title: "原神 OC 角色生成器",
    description: "借助 AI 打造你的提瓦特原创角色，设计专属元素能力与冒险故事。",
  },
  series: "原神",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "原神 OC 生成器",
      description: "输入角色设定，即刻生成原神风格的元素冒险者。",
    },
    step: {
      title: "如何打造 Genshin OC",
      description: "只需三个步骤，就能让你的角色踏足七国大陆。",
      steps: [
        {
          title: "选择元素与神之眼",
          description:
            "决定角色使用的七系元素与武器种类，并思考其战斗方式与定位。",
        },
        {
          title: "描绘外观与出身",
          description:
            "描述角色的服饰、风格与所属国家，结合各国文化细节，营造提瓦特在地感。",
        },
        {
          title: "生成冒险者",
          description:
            "点击“生成角色”，即可获得多张 AI 设计，挑选最符合你想像的形象。",
        },
      ],
    },
    examples: {
      title: "原神 OC 示例",
      description: "浏览使用 原神 OC 生成器 文字提示生成的冒险者。",
      examples,
    },
    features: {
      title: "原神 OC 生成器 的特色",
      description: "专为提瓦特世界调校，助你快速打造元素华丽的原创角色。",
      features: [
        {
          label: "原神级美术风格",
          description: "角色比例、服装细节与元素特效皆贴近游戏视觉语言。",
        },
        {
          label: "元素系统整合",
          description:
            "AI 理解七种元素的视觉呈现与反应机制，确保能力设定可信。",
        },
        {
          label: "极速角色生成",
          description: "数秒内即可看到角色成品，把时间留给世界观与剧情创作。",
        },
        {
          label: "高品质动漫绘制",
          description: "输出图像符合原神的精致动漫风格，适合展示或二次创作。",
        },
        {
          label: "多样化造型选择",
          description:
            "每次生成提供不同服装、姿势与元素效果，轻松尝试多种构想。",
        },
        {
          label: "提瓦特世界融合",
          description: "角色自然融入七国文化与冒险故事，具备完整的元素背景。",
        },
      ],
    },
    faqs: {
      title: "常见问题",
      description: "还有疑问？欢迎写信至 support@ocmaker.app",
      faqs: [
        {
          question: "什么是 原神 OC 生成器？如何运作？",
          answer:
            "原神 OC 生成器 是专为《原神》设计的 AI 工具。描述你的角色后，即可生成具有原神风格的图像。",
        },
        {
          question: "如何让角色更像提瓦特居民？",
          answer:
            "请加入元素设定、武器偏好、所属国家与当地文化等细节，越具体越好。",
        },
        {
          question: "可以免费使用吗？",
          answer: "可以。基础功能免费；升级方案提供更快生成与更多自定义选项。",
        },
        {
          question: "为何生成效果如此接近原作？",
          answer:
            "系统针对原神的画风与元素表现训练，确保角色视觉与设定高度贴合。",
        },
        {
          question: "生成的角色可用于商用吗？",
          answer:
            "可以！你用 原神 OC 生成器 创作的原创角色归你所有，可用于个人或商业用途。",
        },
        {
          question: "需要注册账号才能生成吗？",
          answer:
            "基础功能无需注册；注册后可保存角色、查看生成记录并解锁更多功能。",
        },
        {
          question: "可以反覆调教同一个角色吗？",
          answer: "当然可以。可重复生成或修改提示，直到角色完全符合你的构想。",
        },
        {
          question: "未来会推出其他开放世界题材的 OC 生成器 吗？",
          answer:
            "会的！我们持续扩充其他 RPG 世界的 OC 生成器，欢迎关注 ocmaker.app 的最新动态。",
        },
      ],
    },
    cta: {
      title: "展开你的提瓦特冒险",
      description: "无需绘画技能，只要描绘，就能让原创冒险者踏遍七国。",
      btns: {
        start: "开始创作",
        explore: "探索 OC 示例",
      },
    },
  },
};
