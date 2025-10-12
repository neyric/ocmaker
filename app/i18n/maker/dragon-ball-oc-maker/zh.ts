const basePrompt = `
  WORLD CONTEXT:
  故事：《龙珠》
  背景概述：地球与第七宇宙，胶囊公司科技、宇宙武道大会、气功战斗、赛亚人变身与神明导师
  关键阵营：Z 战士、红缎带残党、银河巡警、弗利萨军、破坏神与界王神、各宇宙参赛者、时空巡逻队

  OUTPUT FORMAT:
  姓名、种族与战力背景、战斗流派／师承、标志性技能与变身、性格、宿敌／目标、背景片段

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "赛亚学者",
    description: "在重力室里边研究边修炼的半血赛亚人。",
    prompt: `角色名称？
孙莱菈

种族与战力背景？
半赛亚人，潜力可匹敌超蓝

师承或战斗流派？
龟派基础与银河巡警战术融合

标志性技能或变身？
星辉龟派气功、超级赛亚人之神形态

性格？
好奇、富同理心，意志坚定

宿敌或追求的目标？
在学识与战力上同时超越悟饭

分享背景片段。
曾赴亚德拉特研究外星生物，回地球守护胶囊科技免遭弗利萨残党觊觎。`,
  },
  {
    title: "那美克守护者",
    description: "守护龙族秘辛的战士祭司。",
    prompt: `角色名称？
科林马

种族与战力背景？
那美克龙族战士，可大幅抑制战力

师承或战斗流派？
以气墙与杖法为主的灵式战斗

标志性技能或变身？
龙环护盾、巨大化、治愈波

性格？
沉稳睿智，护弱如己

宿敌或追求的目标？
守护新龙珠不被太空海盗掠走

分享背景片段。
村落遭莫洛手下突袭后，与两位长老融合继承知识。`,
  },
  {
    title: "银河巡警王牌",
    description: "追缉星际罪犯的精英巡警。",
    prompt: `角色名称？
塔林·贾克斯

种族与战力背景？
图福尔族幸存者，配备顶尖探测器

师承或战斗流派？
银河巡警空战术与关节锁组合

标志性技能或变身？
光子套索、未臻完全的自在极意兆

性格？
自信守法，压力下仍能玩笑

宿敌或追求的目标？
缉捕盗取图福尔科技的希特族人

分享背景片段。
成长于环绕贝吉塔废墟的难民殖民地，发誓终结星际战争商人。`,
  },
  {
    title: "地球武术家",
    description: "将鹤仙派精确度与现代格斗融合的人类冠军。",
    prompt: `角色名称？
石堂美香

种族与战力背景？
地球人，战力足以匹敌超赛二

师承或战斗流派？
鹤仙派重击结合胶囊公司的动能装甲

标志性技能或变身？
新星气功炮、重力爆裂步、气障铁拳

性格？
自律谦逊，渴望挑战

宿敌或追求的目标？
在正式友谊赛中击败贝吉塔

分享背景片段。
与布尔玛共研重力训练服并赢得天下第一武道会。`,
  },
  {
    title: "时空巡逻者",
    description: "修复多重时间线扭曲的时空守护者。",
    prompt: `角色名称？
克罗娜·维嘉

种族与战力背景？
赛亚人与地球人混血，被时空巡逻队招募

师承或战斗流派？
时空剑术结合瞬间移动

标志性技能或变身？
时空裂斩、超级赛亚人4 极限突破、跃迁气吼

性格？
沉着分析，鲜少惊讶

宿敌或追求的目标？
阻止魔神德米格拉改写巴达克的牺牲

分享背景片段。
亲眼目睹故乡时间线崩坏，现与特兰克斯穿梭守护关键战役。`,
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
      { label: "老练战士", value: "veteran" },
      { label: "资深长者", value: "seasoned elder" },
      { label: "不朽传奇", value: "timeless legend" },
      { label: "年轻武斗家", value: "young martial artist" },
      { label: "赛亚少年", value: "saiyan teen" },
      { label: "银河巡警新人", value: "galactic patrol recruit" },
      { label: "久经沙场者", value: "seasoned fighter" },
      { label: "远古战士", value: "ancient warrior" },
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
      { label: "轻量战士", value: "lean fighter build" },
      { label: "赛亚劲肌", value: "saiyan muscular build" },
      { label: "敏捷武术家", value: "agile martial artist" },
      { label: "重装坦克", value: "bulking tank" },
      { label: "神性气场", value: "divine aura physique" },
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
      { label: "自信笑容", value: "smiling expression" },
      { label: "严肃神情", value: "serious expression" },
      { label: "冷静面容", value: "stoic expression" },
      { label: "挑衅笑容", value: "playful grin" },
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
      { label: "层叠大衣", value: "layered coat" },
      { label: "休闲束腰上衣", value: "casual tunic" },
      { label: "防护马甲", value: "armored vest" },
      { label: "宽松上衣", value: "loose shirt" },
      { label: "连帽斗篷", value: "hooded cloak" },
      { label: "典礼长袍", value: "ceremonial robe" },
      { label: "道服上衣", value: "gi top" },
      { label: "赛亚装甲", value: "saiyan armor" },
      { label: "银河巡警夹克", value: "galactic patrol jacket" },
      { label: "胶囊公司连帽衣", value: "capsule corp hoodie" },
      { label: "天使袍", value: "angel robe" },
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
      { label: "道服长裤", value: "gi pants" },
      { label: "战斗紧身裤", value: "battle leggings db" },
      { label: "赛亚装甲护腿", value: "saiyan armor greaves" },
      { label: "训练短裤", value: "training shorts" },
      { label: "神袍飘带", value: "godly sashes" },
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
      { label: "祭典服饰", value: "festival outfit" },
      { label: "皇家礼服", value: "royal regalia" },
      { label: "游牧装束", value: "nomad attire" },
      { label: "Z 战士制服", value: "z fighter uniform" },
      { label: "赛亚精英套装", value: "saiyan elite set" },
      { label: "银河巡警制服", value: "galactic patrol set" },
      { label: "胶囊公司休闲装", value: "capsule corp casual" },
      { label: "神之武道会装", value: "divine tournament set" },
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
      { label: "负重织物", value: "weighted fabric" },
      { label: "赛亚装甲板", value: "saiyan armor plates" },
      { label: "道服棉料", value: "training gi cotton" },
      { label: "神之气织纹", value: "god ki weave" },
      { label: "自在极意光辉", value: "ultra instinct glow" },
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
      { label: "秘传卷轴", value: "magic tome accessory" },
      { label: "探测器", value: "scouter" },
      { label: "负重护腕", value: "weighted wristbands" },
      { label: "赛亚尾套", value: "tail wrap" },
      { label: "仙豆袋", value: "senzu pouch" },
      { label: "神环气场", value: "halo aura" },
    ],
  },
];

const examples = [
  {
    image: "https://cdn.ocmaker.app/example/dragon-ball-oc-generated-1.webp",
    prompt:
      "1boy, spiky red hair, brown eyes, confident grin, Dragon Ball style fighter clothing, power level scouter, heroic stance, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
  {
    image: "https://cdn.ocmaker.app/example/dragon-ball-oc-generated-2.webp",
    prompt:
      "1boy, silver hair, blue eyes, mischievous look, Dragon Ball style training gear, weighted clothing, fighting stance, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
  {
    image: "https://cdn.ocmaker.app/example/dragon-ball-oc-generated-3.webp",
    prompt:
      "1boy, blonde hair, orange eyes, joyful smile, Dragon Ball style gi, dragon emblem, relaxed pose, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
  {
    image: "https://cdn.ocmaker.app/example/dragon-ball-oc-generated-4.webp",
    prompt:
      "1girl, purple hair, yellow eyes, playful smile, Dragon Ball style casual outfit, energy blast, energetic pose, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
];

export default {
  meta: {
    title: "龙珠 OC 角色生成器",
    description:
      "借助 AI 打造你的《龙珠》战士，设计专属技能、变身与传奇战斗。",
  },
  series: "龙珠",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Dragon Ball OC Maker",
      description:
        "输入角色设定，即刻生成龙珠风格的武道家与战斗档案。",
    },
    step: {
      title: "如何打造 Dragon Ball OC",
      description:
        "锻造你的龙珠战士并不复杂，依照下列步骤完成终极战力。",
      steps: [
        {
          title: "决定战士类型",
          description:
            "先选种族与路线：赛亚人、地球人、那美克星人、人造人或其他宇宙种族，并思考他们的专属能力与变身潜力。",
        },
        {
          title: "描绘力量与外观",
          description:
            "说明招牌技能、气功绝招与体态装束，补充训练背景与武术流派，让角色更具层次。",
        },
        {
          title: "生成你的战士",
          description:
            "点击“生成角色”，从多张 AI 设计中挑选最贴合龙珠画风的战士形象。",
        },
      ],
    },
    examples: {
      title: "龙珠角色示例",
      description:
        "浏览使用 Dragon Ball OC Maker 文字提示生成的强大战士。",
      examples,
    },
    features: {
      title: "Dragon Ball OC Maker 的特色",
      description:
        "专为《龙珠》打造，让你的原创战士拥有正统的气功战斗感。",
      features: [
        {
          label: "原作级画风",
          description:
            "角色体态、战斗姿势与线条展现龙珠经典漫画／动画风格。",
        },
        {
          label: "变身系统理解",
          description:
            "AI 熟悉超级赛亚人等变身机制，能呈现多层次的战斗形态。",
        },
        {
          label: "极速战士生成",
          description:
            "数秒内即可获得专业级战斗立绘，专注设计剧情与战力成长。",
        },
        {
          label: "战斗就绪视觉",
          description:
            "输出图像适合武道场景，无论是天下第一武道会或宇宙对决。",
        },
        {
          label: "多重战力形态",
          description:
            "可尝试不同形态、气场与战斗姿势，探索角色突破极限的样貌。",
        },
        {
          label: "宇宙观融合",
          description:
            "角色自然融入龙珠宇宙，拥有可信的武术背景、外星血统与战力层级。",
        },
      ],
    },
    faqs: {
      title: "常见问题",
      description: "还有疑问？欢迎寄信至 support@ocmaker.app",
      faqs: [
        {
          question: "什么是 Dragon Ball OC Maker？如何运作？",
          answer:
            "Dragon Ball OC Maker 是专为《龙珠》世界打造的 AI 工具。描述角色的种族、流派与技能后，即可生成龙珠风的角色图像。",
        },
        {
          question: "如何让角色更具龙珠味？",
          answer:
            "请加入气功技巧、变身形态、武术背景与种族特征等细节，越具体越好。",
        },
        {
          question: "可以免费使用吗？",
          answer:
            "可以。基础功能免费；升级方案可获得更快的生成速度与更多变身自订选项。",
        },
        {
          question: "为何生成效果如此正统？",
          answer:
            "系统针对龙珠的线条比例、气场特效与战斗美学进行训练，确保风格贴合原作。",
        },
        {
          question: "生成的角色能用于商业用途吗？",
          answer:
            "可以！你在 Dragon Ball OC Maker 创作的原创战士归你所有，可用于个人或商业计划。",
        },
        {
          question: "需要注册账户才能使用吗？",
          answer:
            "基础模式不需注册；注册后可保存角色、查看生成历史并解锁更多变身功能。",
        },
        {
          question: "能重复微调同一角色吗？",
          answer:
            "当然可以。可重复生成或调整描述，直到战士的外观与战力契合你的想像。",
        },
        {
          question: "未来还会推出其他热血漫画主题的 OC Maker 吗？",
          answer:
            "会的！我们持续扩充热血战斗题材，敬请关注 ocmaker.app 的最新发布。",
        },
      ],
    },
    cta: {
      title: "打造你的龙珠战士",
      description:
        "无需绘画技能，只要描述，即可释放原创角色的极限战力。",
      btns: {
        start: "开始创作",
        explore: "探索战士",
      },
    },
  },
};
