const basePrompt = `
  WORLD CONTEXT:
  故事：漫威宇宙（Earth-616 风格基调）
  背景概述：复仇者级威胁、街头英雄、宇宙冒险、神盾局任务、变种人政治、多元宇宙分支
  关键阵营：复仇者联盟、X 战警／克拉科亚、银河护卫队、神盾局、九头蛇／A.I.M.、捍卫者联盟、神奇四侠、雷霆特攻队、反派联盟

  OUTPUT FORMAT:
  姓名、英雄身份与阵营、能力或科技、团队关联、性格、核心动机、起源故事片段

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "布鲁克林能量织网者",
    description: "以能量蛛网守护街区的街头英雄。",
    prompt: `角色名称？
娜奥米·鲁伊斯

她的英雄身份与阵营？
英雄名：丝击，阵营：义警英雄

她拥有哪些能力或科技？
实验蜘蛛 DNA 带来的生物电能蛛网与攀墙技巧

她与哪些团队或组织有联系？
复仇者青年预备队，偶尔与蜘蛛侠协作

她的性格？
毒舌、共情力强、绝不放弃

推动她的核心动机？
守护那些被大英雄忽视的街区居民

起源故事掠影。
在潜入洛克森期间被蜘蛛咬伤，偷走解药救回母亲，如今回收洛克森科技守护街道。`,
  },
  {
    title: "斯塔克工业设计师",
    description: "为全球危机打造模组战甲的天才工程师。",
    prompt: `角色名称？
蕾雅·帕特尔博士

她的英雄身份与阵营？
英雄名：光子熔炉，阵营：复仇者顾问

她拥有哪些能力或科技？
可操控光能构造的光子锻造装甲

她与哪些团队或组织有联系？
复仇者支援部门、S.W.O.R.D. 科技合作人

她的性格？
聪慧沉着，暗藏冷幽默

推动她的核心动机？
让地球在星际威胁前保持科技领先

起源故事掠影。
研发光子反应堆原型时挫败斯克鲁渗透，如今统筹斯塔克深空防卫实验室。`,
  },
  {
    title: "克林塔外交官",
    description: "调停共生体与各族关系的改革宿主。",
    prompt: `角色名称？
伊莱·瓦加斯

他的英雄身份与阵营？
英雄名：协约者，阵营：中立守护者

他拥有哪些能力或科技？
具同理共鸣能力的共生体战甲

他与哪些团队或组织有联系？
银河护卫队联络官，并与毒液合作

他的性格？
冷静寡言，却极具同理心

推动他的核心动机？
证明共生体可以主动选择共存而非征服

起源故事掠影。
在新星军团任务中与叛离共生体结合，成功斡旋拯救尚达免于群巢暴走。`,
  },
  {
    title: "瓦坎达文化学者",
    description: "以振金符纹守护文化遗产的学者战士。",
    prompt: `角色名称？
伊玛尼·恩达雷

她的英雄身份与阵营？
英雄名：动能抄写者，阵营：正义英雄

她拥有哪些能力或科技？
可投射硬光符文盾的振金纹身科技

她与哪些团队或组织有联系？
朵拉亲卫研究分队、全球外展中心

她的性格？
睿智热情、忠诚坚定

推动她的核心动机？
在守护瓦坎达遗产的同时，负责任地分享知识

起源故事掠影。
以实验纹身击退九头蛇文物劫案，获舒莉赞助参与全球外展任务。`,
  },
  {
    title: "拉脱维尼亚叛客",
    description: "用混沌魔法对抗毁灭博士的游击法师。",
    prompt: `角色名称？
维克托·达内斯库

他的英雄身份与阵营？
代号：反抗，阵营：反英雄

他拥有哪些能力或科技？
能导引混沌魔法的秘术枪刃

他与哪些团队或组织有联系？
暗中向奇异博士求援，与午夜之子保持联络

他的性格？
沉郁魅力、复仇心切

推动他的核心动机？
解放家乡，摆脱毁灭博士的铁腕统治

起源故事掠影。
在拉脱维尼亚废墟下找到远古法典，如今率领魔法抵抗军持续反击。`,
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
      { label: "新晋英雄", value: "young hero" },
      { label: "资深复仇者", value: "seasoned avenger" },
      { label: "街头义警", value: "street vigilante" },
      { label: "宇宙冒险者", value: "cosmic adventurer" },
      { label: "不朽守护者", value: "timeless marvel immortal" },
    ],
  },
  {
    title: "体态",
    key: "body",
    data: [
      { label: "纤细", value: "slender" },
      { label: "运动型", value: "athletic" },
      { label: "肌肉型", value: "muscular" },
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
      { label: "黑色短发", value: "short black hair" },
      { label: "棕色长发", value: "long brown hair" },
      { label: "金发", value: "blonde hair" },
      { label: "红发", value: "red hair" },
      { label: "银发", value: "silver hair" },
      { label: "蓝发", value: "blue hair" },
      { label: "白发", value: "white hair" },
      { label: "编发", value: "braided hair" },
      { label: "波浪淡紫发", value: "wavy lavender hair" },
    ],
  },
  {
    title: "眼神",
    key: "eyes",
    data: [
      { label: "棕色眼睛", value: "brown eyes" },
      { label: "蓝色眼睛", value: "blue eyes" },
      { label: "绿色眼睛", value: "green eyes" },
      { label: "琥珀色眼睛", value: "amber eyes" },
      { label: "灰色眼睛", value: "gray eyes" },
      { label: "紫罗兰眼睛", value: "violet eyes" },
      { label: "金色眼睛", value: "golden eyes" },
    ],
  },
  {
    title: "神态",
    key: "face",
    data: [
      { label: "坚定神情", value: "determined expression" },
      { label: "微笑面庞", value: "smiling expression" },
      { label: "严肃表情", value: "serious expression" },
      { label: "冷峻神色", value: "stoic expression" },
      { label: "顽皮笑容", value: "playful grin" },
      { label: "凌厉怒吼", value: "fierce snarl" },
      { label: "温暖笑意", value: "warm smile" },
    ],
  },
  {
    title: "肤色",
    key: "skin",
    data: [
      { label: "白皙肌肤", value: "fair skin" },
      { label: "健康小麦肤色", value: "tan skin" },
      { label: "橄榄肤色", value: "olive skin" },
      { label: "深棕肤色", value: "deep brown skin" },
      { label: "雀斑肌肤", value: "freckled skin" },
      { label: "瓷白肌肤", value: "porcelain skin" },
      { label: "日晒红晕", value: "sunburned skin" },
    ],
  },
  {
    title: "上装",
    key: "top",
    data: [
      { label: "实用外套", value: "utility jacket" },
      { label: "层搭大衣", value: "layered coat" },
      { label: "休闲罩衫", value: "casual tunic" },
      { label: "装甲背心", value: "armored vest" },
      { label: "宽松衬衫", value: "loose shirt" },
      { label: "连帽斗篷", value: "hooded cloak" },
      { label: "礼仪长袍", value: "ceremonial robe" },
      { label: "超级战服", value: "super suit" },
      { label: "神盾战术夹克", value: "shield tactical jacket" },
      { label: "邻里守护连帽衫", value: "friendly neighborhood hoodie" },
      { label: "宇宙装甲", value: "cosmic armor" },
      { label: "魔法斗篷", value: "mystic cloak" },
    ],
  },
  {
    title: "下装",
    key: "bottom",
    data: [
      { label: "多口袋长裤", value: "cargo trousers" },
      { label: "修身长裤", value: "fitted pants" },
      { label: "百褶裙", value: "pleated skirt" },
      { label: "战斗短裤", value: "battle shorts" },
      { label: "飘逸袍摆", value: "flowing robes" },
      { label: "装甲护胫", value: "armored greaves" },
      { label: "层叠缠裹", value: "layered wraps" },
      { label: "英雄紧身裤", value: "hero leggings" },
      { label: "潜行长裤", value: "stealth pants" },
      { label: "护甲护腿板", value: "armor greaves" },
      { label: "休闲牛仔裤", value: "marvel casual jeans" },
      { label: "宇宙护板", value: "cosmic plating" },
    ],
  },
  {
    title: "整套造型",
    key: "set",
    data: [
      { label: "战斗套装", value: "combat uniform" },
      { label: "旅行者便装", value: "casual traveler outfit" },
      { label: "正式礼服", value: "formal attire" },
      { label: "潜行装备", value: "stealth gear" },
      { label: "祭典服饰", value: "festival outfit" },
      { label: "皇家礼装", value: "royal regalia" },
      { label: "游牧装束", value: "nomad attire" },
      { label: "复仇者制服", value: "avengers uniform" },
      { label: "X 战警战服", value: "xmen suit" },
      { label: "银河护卫太空服", value: "guardians space gear" },
      { label: "街头义警套组", value: "street level vigilante" },
      { label: "魔法秘艺长袍", value: "mystic arts robes" },
    ],
  },
  {
    title: "材质",
    key: "material",
    data: [
      { label: "织布材质", value: "woven fabric" },
      { label: "抛光皮革", value: "polished leather" },
      { label: "强化护甲材", value: "reinforced armor" },
      { label: "高科技纤维", value: "high-tech fiber" },
      { label: "有机织料", value: "organic weave" },
      { label: "龙皮材质", value: "dragonhide" },
      { label: "神秘织布", value: "mystic cloth" },
      { label: "振金织料", value: "vibranium weave" },
      { label: "斯塔克科技网层", value: "stark tech mesh" },
      { label: "共生体生物战衣", value: "symbiote bio suit" },
      { label: "纳米装甲", value: "nano armor" },
      { label: "魔法符印", value: "mystic runes" },
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
      { label: "首饰", value: "jewelry" },
      { label: "交叉弹带", value: "bandolier" },
      { label: "魔导书", value: "magic tome accessory" },
      { label: "蛛丝发射器", value: "web shooters" },
      { label: "神盾局徽章", value: "shield emblem" },
      { label: "无限碎片", value: "infinity shard" },
      { label: "方舟反应炉", value: "arc reactor" },
      { label: "悬浮斗篷", value: "cape of levitation" },
    ],
  },
  {
    title: "阵营",
    key: "marvel_alignment",
    data: [
      { label: "英雄", value: "hero" },
      { label: "反英雄", value: "anti hero" },
      { label: "反派", value: "villain" },
      { label: "神盾局", value: "shield" },
      { label: "变种人", value: "mutant" },
    ],
  },
];

const examples = [
  {
    image: "https://cdn.ocmaker.app/example/marvel-oc-generated-1.webp",
    prompt:
      "1girl, red hair, green eyes, confident expression, tactical bodysuit, fingerless gloves, utility belt, determined stance, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
  {
    image: "https://cdn.ocmaker.app/example/marvel-oc-generated-2.webp",
    prompt:
      "1boy, black hair, brown eyes, smug expression, high-tech armor suit, glowing arc reactor, metallic shoulder pads, raised eyebrow, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
  {
    image: "https://cdn.ocmaker.app/example/marvel-oc-generated-3.webp",
    prompt:
      "1man, black hair, blue eyes, calm expression, mystic cloak, glowing magic sigil, goatee, spellcasting gesture, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
  {
    image: "https://cdn.ocmaker.app/example/marvel-oc-generated-4.webp",
    prompt:
      "1man, short black hair, dark brown skin, red goggles, confident expression, futuristic tactical armor, folded wings, strong stance, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
];

export default {
  meta: {
    title: "漫威 OC 角色生成器",
    description:
      "借助 AI 打造你的漫威风格超级英雄，设计独特能力、标志战衣与传奇起源。",
  },
  series: "漫威",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "漫威 OC 生成器",
      description: "输入设定，几秒内生成漫威宇宙气息的原创超级英雄造型。",
    },
    step: {
      title: "如何打造 Marvel OC",
      description: "跟随三个步骤，迅速组建你的超级英雄身份。",
      steps: [
        {
          title: "设计英雄身份",
          description:
            "决定角色的英雄代号、阵营与日常伪装身份，思考他们守护的城市或宇宙角落。",
        },
        {
          title: "补完能力与背景",
          description:
            "描述能力来源、科技装备与关键团队联系，并勾勒改变命运的起源事件。",
        },
        {
          title: "生成你的英雄",
          description:
            "点击“生成角色”，挑选多张 AI 设计，完成专属的漫威风插画。",
        },
      ],
    },
    examples: {
      title: "漫威 OC 示例",
      description: "浏览使用 漫威 OC 生成器 文字提示生成的英雄范例。",
      examples,
    },
    features: {
      title: "漫威 OC 生成器 的特色",
      description: "专注漫威宇宙语汇，帮助你塑造具备电影感与漫画感的原创英雄。",
      features: [
        {
          label: "经典漫威画风",
          description: "角色造型精准捕捉漫威的色彩、线条与科技细节。",
        },
        {
          label: "身份阵营整合",
          description:
            "AI 理解复仇者、变种人、街头义警等生态，让角色自然融入官方编制。",
        },
        {
          label: "极速英雄生成",
          description: "数秒完成英雄立绘，专注构思战队编制与剧情走向。",
        },
        {
          label: "高质量漫画质感",
          description: "输出效果贴近漫画封面与影视海报，适合做设定集或推介图。",
        },
        {
          label: "多元宇宙延展",
          description: "同一提示可生成地球街头、宇宙冒险或魔法支线的不同变体。",
        },
        {
          label: "故事深度强化",
          description:
            "角色设定会引出团队关系、核心动机与反派冲突，助你扩写长篇故事。",
        },
      ],
    },
    faqs: {
      title: "常见问题",
      description: "还有疑问？欢迎留言至 support@ocmaker.app",
      faqs: [
        {
          question: "漫威 OC 生成器 是什么？如何运作？",
          answer:
            "漫威 OC 生成器 是专为漫威宇宙打造的 AI 工具。描述角色的身份、能力与背景后，系统会生成漫威风格的原创插画。",
        },
        {
          question: "如何利用 漫威 OC 生成器 打造更有漫威味的角色？",
          answer:
            "请补充团队隶属、科技来源、反派宿敌或多元宇宙分支等细节，越具体越能展现漫威气质。",
        },
        {
          question: "漫威 OC 生成器 可以免费使用吗？",
          answer:
            "可以。基础功能免费；升级方案能解锁更快速度、更多变体与进阶自订。",
        },
        {
          question: "为什么生成效果如此贴近漫威？",
          answer:
            "系统针对漫威的美术语言、电影调色与角色设定进行调校，确保输出风格统一。",
        },
        {
          question: "通过 漫威 OC 生成器 创造的角色可以商用吗？",
          answer:
            "当然可以！你生成的原创角色完全归你所有，可用于个人或商业计划。",
        },
        {
          question: "使用 漫威 OC 生成器 需要注册账号吗？",
          answer:
            "基础体验无需账号；注册后可保存角色、同步生成历史，并解锁更多漫威主题模板。",
        },
        {
          question: "可以重新生成或调整角色设计吗？",
          answer:
            "可以！可重复使用相同提示获取不同版本，或微调描述持续迭代角色形象。",
        },
        {
          question: "未来还会新增哪些超级英雄主题？",
          answer:
            "我们将持续扩展更多超级英雄与跨媒体宇宙，欢迎关注最新上线的 OC 生成器。",
        },
      ],
    },
    cta: {
      title: "打造你的超级英雄",
      description: "无需绘画基础，只要描述，就能让原创漫威英雄立即登场。",
      btns: {
        start: "开始创作",
        explore: "探索英雄示例",
      },
    },
  },
};
