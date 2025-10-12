const basePrompt = `
  WORLD CONTEXT:
  故事：《美少女战士》
  背景概述：东京与月之王国的传承、守护战士、魔法变身、转生王族与宇宙宿敌
  关键阵营：水手战士、外部守护者、四天王、黑暗王国、黑月一族、死亡月马戏团、星光战士、守护猫

  OUTPUT FORMAT:
  姓名、守护称号与星球／领域、变身道具与必杀技、性格、使命／守护职责、前世背景

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "水手星花",
    description: "守护行星间花园生命的宇宙园丁。",
    prompt: `角色名称？
花园天爱

守护称号与星球／领域？
小行星带圣域的水手星花

变身道具与必杀技？
星花胸针与绽放权杖，发动“花瓣星云风暴”

性格？
温柔乐观、坚定不移

使命或守护职责？
疗愈被破坏的星际花园，守护新生生命

前世背景。
银千年时期她照料月之王国外苑花园，每当流星怒放便唤醒零碎记忆。`,
  },
  {
    title: "水手风暴",
    description: "调和海王星卫星风暴的守护者。",
    prompt: `角色名称？
海月香砂

守护称号与星球／领域？
海卫一深海的水手风暴

变身道具与必杀技？
风暴之镜与风吟竖琴，召唤“塞壬旋潮”

性格？
沉着内省、保护欲强

使命或守护职责？
护送宇航旅人远离宇宙暴风

前世背景。
前世与水手海王星并肩引导古代航海者，如今在风暴来临前便能感知潮汐。`,
  },
  {
    title: "水手极光",
    description: "以极光守护梦境的艺术守护者。",
    prompt: `角色名称？
天见璃奈

守护称号与星球／领域？
地球极光的水手极光

变身道具与必杀技？
极光棱光笔与辉耀王冠，释放“北极光狂想曲”

性格？
艺术气质、善感、爱恶作剧

使命或守护职责？
守护沉睡的心灵免受梦魇侵蚀

前世背景。
前世与女王瑟蕾妮缇一同守护梦境，如今绘制的极光壁画能驱散噩梦。`,
  },
  {
    title: "水手日耀",
    description: "操控黎明光芒的太阳守护者。",
    prompt: `角色名称？
朝阳赫莉

守护称号与星球／领域？
黎明廷的水手日耀

变身道具与必杀技？
日耀怀表与日炽之刃，发动“破晓协奏”

性格？
自信耀眼，天生领袖

使命或守护职责？
守护小小兔的王家传承，激励新世代守护者

前世背景。
曾是女王瑟蕾妮缇宫廷的哨兵，今生于水晶东京召集新守护者。`,
  },
  {
    title: "水手夜曲",
    description: "调和星光与黑夜的黄昏守护者。",
    prompt: `角色名称？
野江美夜

守护称号与星球／领域？
影之缪斯的水手夜曲

变身道具与必杀技？
夜曲吊坠与摇篮弓，召唤“蚀影夜奏”

性格？
神秘诗意、富有同情心

使命或守护职责？
引导迷失灵魂穿越黄昏，守护他们免受混沌侵袭

前世背景。
月之王国陨落时曾是露娜的心腹，如今经营音乐沙龙唤醒星之种子。`,
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
      { label: "在学守护者", value: "student guardian" },
      { label: "年轻战士", value: "young senshi" },
      { label: "成熟女性守护者", value: "adult guardian" },
      { label: "外部战士", value: "outer senshi" },
      { label: "远古月之王族", value: "ancient moon royal" },
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
      { label: "水手制服上装", value: "sailor bodice" },
      { label: "公主礼服", value: "princess gown" },
      { label: "外部战士外套", value: "outer senshi coat" },
      { label: "守护者束衣", value: "guardian tunic" },
      { label: "王冠廷礼袍", value: "crown court robe" },
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
      { label: "水手百褶裙", value: "sailor pleated skirt" },
      { label: "飘逸裙摆层", value: "flowing dress layers" },
      { label: "外部战士长裤", value: "outer senshi trousers" },
      { label: "水晶王国裙摆", value: "crystal empire hem" },
      { label: "守护者紧身裤", value: "guardian leggings" },
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
      { label: "内部战士套装", value: "inner senshi set" },
      { label: "外部战士套装", value: "outer senshi set" },
      { label: "月之公主套装", value: "moon princess set" },
      { label: "星光守护套装", value: "starlight guardian set" },
      { label: "黑暗王国套装", value: "dark kingdom set" },
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
      { label: "月光丝绸", value: "moonlight silk" },
      { label: "星晶材质", value: "star crystal" },
      { label: "守护缎带", value: "guardian ribbon" },
      { label: "银千年织料", value: "silver millennium fabric" },
      { label: "黑暗能量织物", value: "dark energy weave" },
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
      { label: "魔法手札", value: "magic tome accessory" },
      { label: "王冠", value: "tiara" },
      { label: "变身胸针", value: "transformation brooch" },
      { label: "月光权杖", value: "moon wand" },
      { label: "水晶耳饰", value: "crystal earrings" },
      { label: "守护项圈", value: "guardian choker" },
    ],
  },
];

const examples = [
  {
    image: "https://cdn.ocmaker.app/example/sailor-moon-oc-generated-1.webp",
    prompt:
      "1girl, long blonde hair with twin tails, blue eyes, determined expression, sailor guardian uniform, blue and white sailor outfit, tiara with gem, transformation brooch, action pose, single character, upper body, looking at viewer, anime style, starry background",
  },
  {
    image: "https://cdn.ocmaker.app/example/sailor-moon-oc-generated-2.webp",
    prompt:
      "1girl, short purple hair, violet eyes, mysterious smile, dark kingdom uniform, black and purple villain outfit, dark crystal accessories, elegant pose, single character, upper body, looking at viewer, anime style, dark palace background",
  },
  {
    image: "https://cdn.ocmaker.app/example/sailor-moon-oc-generated-3.webp",
    prompt:
      "1girl, medium pink hair, green eyes, gentle expression, princess dress, silver millennium gown, moon kingdom jewelry, crystal staff, graceful pose, single character, upper body, looking at viewer, anime style, moon palace background",
  },
  {
    image: "https://cdn.ocmaker.app/example/sailor-moon-oc-generated-4.webp",
    prompt:
      "1girl, wavy red hair, amber eyes, confident wink, outer senshi uniform, unique sailor outfit design, planet symbols, transformation wand, heroic stance, single character, upper body, looking at viewer, anime style, cosmic background",
  },
];

export default {
  meta: {
    title: "美少女战士 OC 角色生成器",
    description:
      "借助 AI 打造你的美少女战士原创角色，设计守护者、公主与宿敌的魔法变身。",
  },
  series: "美少女战士",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Sailor Moon OC Maker",
      description: "输入设定，几秒内化身守护战士、王族或暗黑使徒。",
    },
    step: {
      title: "如何打造 Sailor Moon OC",
      description: "想要以爱与正义守护世界？按照以下步骤设计你的魔法守护者。",
      steps: [
        {
          title: "选择守护者类型",
          description:
            "决定角色是内部或外部水手战士、月之王国公主、黑暗王国反派或平民盟友，不同定位拥有专属变身、必杀技与服装。",
        },
        {
          title: "描绘外观与力量",
          description:
            "写出制服配色、星球象征、魔法能力与变身道具，连同技能名称与徽记，让设定更具魔法感。",
        },
        {
          title: "生成守护战士",
          description:
            "点击“生成角色”，从多款闪耀的 AI 设计中挑选最契合的守护者形象。",
        },
      ],
    },
    examples: {
      title: "水手战士示例",
      description: "浏览使用 Sailor Moon OC Maker 文本提示生成的魔法战士。",
      examples,
    },
    features: {
      title: "Sailor Moon OC Maker 的特色",
      description:
        "专注魔法少女世界观，打造拥有星象主题与友情力量的原创守护者。",
      features: [
        {
          label: "正统魔法少女画风",
          description:
            "从闪耀的变身姿势到优雅水手服，完整还原经典少女漫画美学。",
        },
        {
          label: "守护体系整合",
          description:
            "AI 理解守护战士的层级、星球对应与变身机制，让角色自然融入设定。",
        },
        {
          label: "极速魔法生成",
          description:
            "数秒内完成角色图像，适合拓展水晶东京或全新星域的守护者名册。",
        },
        {
          label: "高品质少女绘风",
          description: "模型针对魔法少女美学训练，呈现闪耀与浪漫兼具的画面。",
        },
        {
          label: "多重变身选择",
          description:
            "每次生成提供不同守护形态、攻击姿势与魔法特效，找到心动版本。",
        },
        {
          label: "月之王国连结",
          description: "角色自然承袭银千年的神话、星象使命与魔法主题。",
        },
      ],
    },
    faqs: {
      title: "常见问题",
      description: "还有疑问？欢迎写信至 support@ocmaker.app",
      faqs: [
        {
          question: "什么是 Sailor Moon OC Maker？它如何运作？",
          answer:
            "Sailor Moon OC Maker 是专为美少女战士宇宙打造的 AI 工具。描述守护者外观、力量与星球关联，AI 会生成正统魔法少女图像。",
        },
        {
          question: "如何让 Sailor Moon OC Maker 生成更好的角色？",
          answer:
            "加入星球守护、变身道具、技能名称、银千年渊源或黑暗阵营等细节，魔法元素越丰富，成果越出色。",
        },
        {
          question: "Sailor Moon OC Maker 是否免费？",
          answer:
            "是的，基础功能免费。进阶方案提供更快生成、更多变身选项与高级自订工具。",
        },
        {
          question: "为什么 Sailor Moon OC Maker 如此贴近原作？",
          answer:
            "模型针对美少女战士的画风与魔法少女惯例训练，理解变身流程与水手服设计。",
        },
        {
          question: "我能商业使用 Sailor Moon OC Maker 生成的角色吗？",
          answer:
            "可以，你创作的原创守护者完全归你所有，可用于个人或商业计划，我们不会主张所有权。",
        },
        {
          question: "使用 Sailor Moon OC Maker 需要帐号吗？",
          answer:
            "基础体验无需帐号。注册后可保存角色、查看历史记录，并解锁更多魔法少女功能。",
        },
        {
          question: "能否打造不同类型的水手战士？",
          answer:
            "当然！你可以创建内部战士、外部战士、星光战士、行星小战士，还能设计月之王国王族、黑暗王国反派或平民角色。",
        },
        {
          question: "未来会加入更多魔法少女题材的 OC Maker 吗？",
          answer:
            "会的！我们计划扩展更多魔法少女与少女漫画主题，欢迎持续关注我们的更新。",
        },
      ],
    },
    cta: {
      title: "化身你的守护战士",
      description: "无需绘画技巧，只要心怀爱与正义，就能在月光下变身守护世界。",
      btns: {
        start: "开始创作",
        explore: "浏览角色",
      },
    },
  },
};
