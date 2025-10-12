const basePrompt = `
  WORLD CONTEXT:
  故事：《黑执事》
  背景概述：维多利亚时代伦敦的上流与黑市交织，恶魔契约、女王密探与死神调派共织秘密
  关键圈层：女王的看门犬、贵族府邸、马戏团团体、邪教社团、死神派遣课、缔结浮士德契约的恶魔

  OUTPUT FORMAT:
  姓名、表面身份与称谓、阵营（人类／恶魔／死神）、才能或能力、性格、隐秘动机、背景速写

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "女王看门犬学徒",
    description: "带着礼貌微笑、内心冷冽的贵族调查员。",
    prompt: `角色名称？
伊芙琳·阿什克罗夫特小姐

她维持的表面身份与称谓？
身为公爵遗族，以慈善会名义照顾伦敦孤儿

她的阵营为何？
效忠女王看门犬办公室的人类特务

哪些才能或能力协助她？
破译密码、击剑术，以及受银哨指引的恶魔猎犬

你会如何形容她的性格？
优雅、周全，言行中夹杂精致的讥讽

推动她前行的隐秘动机？
查出是谁策划了父母遭遇的马车“意外”

请分享一段背景速写。
在继承遗产遭绑架时被凡多海夫家的仆人救回，自此协助地下调查。`,
  },
  {
    title: "赎罪的死神",
    description: "被派往剧院区维持秩序、调和顽劣灵魂的死神。",
    prompt: `角色名称？
塞德里克·格雷利夫

他维持的表面身份与称谓？
皇家阿尔比恩剧团的舞台监督

他的阵营为何？
受限期留在人间的死神

哪些才能或能力协助他？
伪装成聚光灯架的死神镰、能剪辑人生底片的记录改写

你会如何形容他的性格？
忧郁、富艺术气质，对凡人脆弱抱持冷峻幽默

推动他前行的隐秘动机？
为在开膛手事件中擅自删改灵魂记录赎罪

请分享一段背景速写。
塞德里克曾违抗派遣课命令，如今确保每一场剧院“事故”都依据灵魂台账执行。`,
  },
  {
    title: "恶魔贴身管家",
    description: "与失势女爵订立契约，同时苦学礼仪的年轻恶魔。",
    prompt: `角色名称？
赛拉斯

他维持的表面身份与称谓？
侍奉求赎的女爵的专属贴身管家

他的阵营为何？
遵守祖传契约的恶魔

哪些才能或能力协助他？
镜面步伐、无可挑剔的料理、会束缚真相的品茶仪式

你会如何形容他的性格？
沉着风雅，对人类愚行抱持淡淡玩味

推动他前行的隐秘动机？
仅在女爵洗清家族罪名后才取走她的灵魂

请分享一段背景速写。
昔日侍奉海盗首领，如今为了履行“完美侍奉”的契约条款潜心钻研贵族礼法。`,
  },
  {
    title: "马戏幻术师",
    description: "在诺亚方舟马戏团与情报之间维持平衡的表演者。",
    prompt: `角色名称？
玛丽安“云雀”·布莱斯

她维持的表面身份与称谓？
重建后的诺亚方舟马戏团幻术与空中飞人演员

她的阵营为何？
暗中与凡多海夫家合作的人类线人

哪些才能或能力协助她？
幻术道具、暗藏的飞刃、遍布伦敦街童的联络网

你会如何形容她的性格？
俏皮、倔强，对拾来的家人极力保护

推动她前行的隐秘动机？
守护孤儿团员免受贵族觊觎

请分享一段背景速写。
小时候被小丑长救下，如今让马戏团重归正途，同时向夏尔递送情报。`,
  },
  {
    title: "地下炼金术师",
    description: "执迷禁忌炼金术，只为与亡者再会的学者。",
    prompt: `角色名称？
阿德莱德·克莱因教授

她维持的表面身份与称谓？
隐居的学者，以发表灵药配方为生

她的阵营为何？
在恶魔契约边缘试探的人类秘术师

哪些才能或能力协助她？
炼成阵、保存灵魂的秘药、机械义肢制造

你会如何形容她的性格？
执着、才华横溢，不惧涉足灰色界线

推动她前行的隐秘动机？
复活在料理决斗阴谋中丧命的未婚夫

请分享一段背景速写。
她与葬仪屋合作获取解剖材料，冒着一切风险只为寻求温柔的复生之道。`,
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
      { label: "老练从业者", value: "veteran" },
      { label: "经验长者", value: "seasoned elder" },
      { label: "不朽传奇", value: "timeless legend" },
      { label: "年轻男仆", value: "young footman" },
      { label: "社交界初登场", value: "society debutante" },
      { label: "资深执事", value: "seasoned butler" },
      { label: "老练死神", value: "grim reaper veteran" },
      { label: "永生恶魔", value: "immortal demon" },
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
    title: "眼神",
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
      { label: "凌厉嘶笑", value: "fierce snarl" },
      { label: "温暖微笑", value: "warm smile" },
    ],
  },
  {
    title: "肤色",
    key: "skin",
    data: [
      { label: "白皙肤色", value: "fair skin" },
      { label: "温暖小麦色", value: "tan skin" },
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
      { label: "多功能外套", value: "utility jacket" },
      { label: "层叠大衣", value: "layered coat" },
      { label: "休闲束腰上衣", value: "casual tunic" },
      { label: "防护马甲", value: "armored vest" },
      { label: "宽松衬衫", value: "loose shirt" },
      { label: "连帽斗篷", value: "hooded cloak" },
      { label: "典礼长袍", value: "ceremonial robe" },
      { label: "维多利亚燕尾服", value: "victorian tailcoat" },
      { label: "凡多海夫侍从制服", value: "phantomhive livery" },
      { label: "马戏团表演衬衫", value: "circus performer blouse" },
      { label: "上流社交礼裙", value: "high society gown" },
      { label: "葬仪师罩袍", value: "undertaker shroud" },
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
      { label: "飘逸长袍下摆", value: "flowing robes" },
      { label: "护甲护腿", value: "armored greaves" },
      { label: "层叠裹裙", value: "layered wraps" },
      { label: "烫线西裤", value: "pressed trousers" },
      { label: "层叠裙撑", value: "layered bustle skirt" },
      { label: "马戏团条纹裤", value: "circus striped pants" },
      { label: "侍女围裙层", value: "servant apron layers" },
      { label: "暗影斗篷下摆", value: "shadowed cloak hem" },
    ],
  },
  {
    title: "整套风格",
    key: "set",
    data: [
      { label: "战斗制服", value: "combat uniform" },
      { label: "旅行装束", value: "casual traveler outfit" },
      { label: "正式礼装", value: "formal attire" },
      { label: "潜行装备", value: "stealth gear" },
      { label: "节庆服饰", value: "festival outfit" },
      { label: "王室礼服", value: "royal regalia" },
      { label: "游牧装束", value: "nomad attire" },
      { label: "女王看门犬服饰", value: "queens watchdog attire" },
      { label: "诺亚方舟马戏团套装", value: "noahs ark circus outfit" },
      { label: "死神派遣制服", value: "reaper dispatch uniform" },
      { label: "伦敦上流舞会装", value: "london high society ball outfit" },
      { label: "恶魔执事礼服", value: "demon butler regalia" },
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
      { label: "天鹅绒", value: "velvet" },
      { label: "细羊毛", value: "fine wool" },
      { label: "蕾丝与缎面", value: "lace satin" },
      { label: "影丝", value: "shadow silk" },
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
      { label: "珠宝饰品", value: "jewelry" },
      { label: "弹药带", value: "bandolier" },
      { label: "魔导书", value: "magic tome accessory" },
      { label: "银质怀表", value: "silver pocket watch" },
      { label: "恶魔契约戒指", value: "demon contract ring" },
      { label: "死神眼镜", value: "reaper glasses" },
      { label: "王印手杖", value: "royal seal cane" },
      { label: "羽饰高顶帽", value: "feathered top hat" },
    ],
  },
  {
    title: "阵营身份",
    key: "alignment",
    data: [
      { label: "人类", value: "human" },
      { label: "恶魔", value: "demon" },
      { label: "死神", value: "shinigami" },
      { label: "狼人", value: "werewolf" },
      { label: "契约束缚者", value: "contract bound" },
    ],
  },
];

const examples = [
  {
    image: "https://cdn.ocmaker.app/example/black-butler-oc-generated-1.webp",
    prompt:
      "1boy, silver hair, crimson eyes, mysterious smile, demon butler outfit, black tailcoat with white gloves, contract seal visible, elegant pose, single character, upper body, looking at viewer, anime style, victorian mansion background",
  },
  {
    image: "https://cdn.ocmaker.app/example/black-butler-oc-generated-2.webp",
    prompt:
      "1girl, long purple hair, blue eyes, noble expression, victorian lady dress, elaborate ballgown with lace, jewelry accessories, fan in hand, aristocratic pose, single character, upper body, looking at viewer, anime style, gothic atmosphere",
  },
  {
    image: "https://cdn.ocmaker.app/example/black-butler-oc-generated-3.webp",
    prompt:
      "1boy, blonde hair, green eyes, cheerful grin, phantomhive servant uniform, gardener outfit with straw hat, pruning shears, friendly stance, single character, upper body, looking at viewer, anime style, english garden background",
  },
  {
    image: "https://cdn.ocmaker.app/example/black-butler-oc-generated-4.webp",
    prompt:
      "1girl, red hair in bun, amber eyes, serious expression, maid uniform, victorian maid dress with apron, cleaning supplies, dutiful pose, single character, upper body, looking at viewer, anime style, manor interior background",
  },
];

export default {
  meta: {
    title: "黑执事 OC 角色生成器",
    description:
      "借助 AI 打造你的《黑执事》原创角色，塑造恶魔执事、贵族、仆从与死神等维多利亚哥特风人物。",
  },
  series: "黑执事",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Black Butler OC Maker",
      description:
        "输入角色构想，数秒内生成维多利亚风格的《黑执事》原创人物与视觉设定。",
    },
    step: {
      title: "如何打造 Black Butler OC",
      description:
        "在 OC Maker 中创建《黑执事》角色就像策划一次秘密调查，依照以下步骤完成你的契约。",
      steps: [
        {
          title: "描述你的身份伪装",
          description:
            "填写角色的外貌、举止与社会身份。为了更贴近原作，可加入燕尾服、女仆装、马戏团服饰、死神制服或恶魔契约印记等细节。",
        },
        {
          title: "设定阵营与能力",
          description:
            "指出角色是人类、恶魔或死神，再补充他们擅长的武技、秘术、契约或灵魂记录能力。若加上隐藏动机与调查目标，角色会更鲜明。",
        },
        {
          title: "生成你的契约伙伴",
          description:
            "点击“生成角色”，即可获得多张 AI 设计图，挑选最符合你期望的版本，让角色走入伦敦夜幕。",
        },
      ],
    },
    examples: {
      title: "黑执事角色示例",
      description: "浏览由 Black Butler OC Maker 文字提示生成的原创角色造型。",
      examples,
    },
    features: {
      title: "Black Butler OC Maker 有何特色？",
      description:
        "Black Butler OC Maker 是针对《黑执事》打造的专属版本，只要提供描述即可生成维多利亚哥特风的角色艺术。",
      features: [
        {
          label: "还原维多利亚氛围",
          description:
            "从雾都街道到豪华庄园，AI 会呈现带有哥特气息的细节，让角色完美融入伦敦暗面。",
        },
        {
          label: "契约与灵魂设定",
          description:
            "支持恶魔契约、死神记录、人类密探等多种阵营，让角色的能力与动机皆符合原作逻辑。",
        },
        {
          label: "快速生成高雅立绘",
          description:
            "数秒内获得高质量角色立绘，适合用在同人剧情、文字冒险或角色扮演。",
        },
        {
          label: "精致服装细节",
          description:
            "AI 能呈现蕾丝、燕尾服、马戏团服饰等复杂材质，强化角色的时代质感。",
        },
        {
          label: "多重身份变体",
          description:
            "一次生成多种造型，帮助你在贵族、仆役、马戏团或死神身份之间自由切换。",
        },
        {
          label: "完整角色档案",
          description:
            "除图像外，还能延伸出背景动机、契约条款与隐藏秘密，构成完整的故事骨架。",
        },
      ],
    },
    faqs: {
      title: "常见问题",
      description: "还有疑问？欢迎来信 support@ocmaker.app",
      faqs: [
        {
          question: "什么是 Black Butler OC Maker？如何运作？",
          answer:
            "Black Butler OC Maker 是一款专为《黑执事》世界观打造的 AI 工具。描述角色的外貌、身份与阵营后，系统会生成符合维多利亚哥特美学的立绘。",
        },
        {
          question: "如何让角色更像《黑执事》的风格？",
          answer:
            "请加入上流社会礼仪、黑暗契约、葬仪屋风格物件或死神差遣细节。越贴近剧情设定，成品越真实。",
        },
        {
          question: "Black Butler OC Maker 可以免费使用吗？",
          answer:
            "可以。基本功能免费，若需要更快的生成速度或更多自定义选项，可升级进阶方案。",
        },
        {
          question: "为什么生成的服饰与气氛这么准确？",
          answer:
            "系统理解《黑执事》的时代背景与视觉符号，从哥特风纹饰到契约符号都能精准呈现。",
        },
        {
          question: "我能把生成的角色用于同人或 cosplay 规划吗？",
          answer:
            "当然可以！你使用 Black Butler OC Maker 创作的角色属于你，可用于同人故事、插画或角色扮演。",
        },
        {
          question: "需要注册账号才能生成角色吗？",
          answer:
            "基础使用不需注册；注册后可保存角色、查看生成历史并解锁更多功能。",
        },
        {
          question: "能生成不同阵营或族群的组合吗？",
          answer:
            "可以！无论是恶魔执事、女王特务、马戏团艺人或死神，都能自由搭配服饰与能力。",
        },
        {
          question: "未来会推出更多类似的 OC Maker 吗？",
          answer:
            "会的！我们持续拓展主题 OC Maker，欢迎定期访问 ocmaker.app 获取最新消息。",
        },
      ],
    },
    cta: {
      title: "签下你的伦敦契约",
      description:
        "无需绘画技能，只要描述即可生成《黑执事》风的原创角色，陪你步入雾都夜色。",
      btns: {
        start: "开始创作",
        explore: "探索角色示例",
      },
    },
  },
};
