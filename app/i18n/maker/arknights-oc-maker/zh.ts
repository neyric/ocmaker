const basePrompt = `
  WORLD CONTEXT:
  故事：《明日方舟》
  背景概述：泰拉大陆的工业荒原、源石灾难与应急行动交织，各具文化的城邦与企业在天灾阴影下求生
  关键阵营：罗德岛、整合运动、龙门近卫局、卡西米尔骑士、拉特兰、乌萨斯帝国、维多利亚贵族、独立雇佣兵组织

  OUTPUT FORMAT:
  姓名、所属阵营与干员职阶、武装／源石技艺专长、感染状况、天赋／特质、性格、任务履历

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "罗德岛先锋干员",
    description: "一位冲在最前线的救援者，用无人机护送平民撤离。",
    prompt: `角色名称？
米娜·塔尔瓦

她的所属与干员职阶？
罗德岛先锋干员

她主要依赖的武装或源石技艺？
可部署屏障无人机搭配源石震荡警棍

她的感染状况？
感染者；需定期接受结晶治疗

哪些天赋或特质定义她的战斗风格？
快速再部署、费用返还支援、防护屏障领域

你会如何形容她的性格？
沉稳，对新人充满母性关怀，偶尔带点冷幽默

让她铭记的任务经历？
在切尔诺伯格事件中疏散整支矿工队伍，同时阻挡整合运动狙击手。`,
  },
  {
    title: "整合运动叛逃者",
    description: "悔悟的工程师，用过往的爆破知识来拆解敌方炸弹。",
    prompt: `角色名称？
达里乌斯·沃格特

他的所属与干员职阶？
罗德岛支援干员，前整合运动爆破技师

他主要依赖的武装或源石技艺？
远程 EMP 标枪与源石碎片抑制网

他的感染状况？
未感染，但身上留有旧实验造成的辐射疤痕

哪些天赋或特质定义他的战斗风格？
拆除敌方炸药、强化友方对源石技艺的抵抗力

你会如何形容他的性格？
愧疚、沉着、立志修补过去犯下的错误

让他铭记的任务经历？
在龙门住宅区下方拆除整合运动安放的爆破装置后，主动向罗德岛投诚。`,
  },
  {
    title: "卡西米尔枪骑士",
    description: "从商业骑士团抽身兼职罗德岛，只为守住移民的安全。",
    prompt: `角色名称？
维罗妮卡·克罗尔

她的所属与干员职阶？
受雇于罗德岛与卡西米尔骑士协会的独立重装干员

她主要依赖的武装或源石技艺？
反应式源石长枪与动能护盾

她的感染状况？
第一阶段感染者，由罗德岛医疗团队稳定控制

哪些天赋或特质定义她的战斗风格？
反击时治疗友军，长枪横扫制造群体控制

你会如何形容她的性格？
恪守骑士道、擅长媒体应对、绝不容忍剥削

让她铭记的任务经历？
护送一支移民车队穿越乌萨斯领土，击退企图夺取劳工的赏金猎人。`,
  },
  {
    title: "拉特兰执行官",
    description: "手持双枪的神职者，在律法与怜悯之间寻求平衡。",
    prompt: `角色名称？
卡农·费里

他的所属与干员职阶？
借调至罗德岛的拉特兰公证厅执行官

他主要依赖的武装或源石技艺？
双持拉特兰圣光霰弹铳，附着净化之光

他的感染状况？
未感染；携带会对源石反应的圣物

哪些天赋或特质定义他的战斗风格？
在致命裁决与群控祝福之间切换

你会如何形容他的性格？
肃穆、讲究仪式，却怀抱罕见的慈悲

让他铭记的任务经历？
在狂热教徒与感染者难民间斡旋停火，并依据拉特兰律法拘捕真正的挑衅者。`,
  },
  {
    title: "乌萨斯幸存者",
    description: "逃出学院灾难的学生，化身移动诊所的盾牌。",
    prompt: `角色名称？
卡佳·泽连科

她的所属与干员职阶？
罗德岛乌萨斯救援小队的近卫干员

她主要依赖的武装或源石技艺？
注入热能源石的加热链锯长戟

她的感染状况？
康复的感染者，体内源石密度已被稳定

哪些天赋或特质定义她的战斗风格？
保护性反击、为术师提供护盾、在恐惧下鼓舞士气

你会如何形容她的性格？
坚韧、被旧日阴影缠绕，却极力守护学生

让她铭记的任务经历？
护送移动诊所穿越冬灵校园，救出仍被封锁的同学。`,
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
      { label: "新人干员", value: "rookie operator" },
      { label: "二十多岁的医疗干员", value: "field medic adult" },
      { label: "罗德岛老手", value: "rhodes veteran" },
      { label: "拉特兰执行官", value: "laterano executor" },
      { label: "老牌前辈", value: "old guard pioneer" },
    ],
  },
  {
    title: "体态",
    key: "body",
    data: [
      { label: "修长", value: "slender" },
      { label: "健壮", value: "athletic" },
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
      { label: "坚毅神情", value: "determined expression" },
      { label: "浅笑", value: "smiling expression" },
      { label: "严肃神情", value: "serious expression" },
      { label: "冷静面孔", value: "stoic expression" },
      { label: "俏皮笑容", value: "playful grin" },
      { label: "凌厉咆哮", value: "fierce snarl" },
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
      { label: "装甲背心", value: "armored vest" },
      { label: "宽松衬衫", value: "loose shirt" },
      { label: "连帽斗篷", value: "hooded cloak" },
      { label: "典仪礼袍", value: "ceremonial robe" },
      { label: "罗德岛制服夹克", value: "rhodes island jacket" },
      { label: "整合运动叛离者大衣", value: "reunion defector coat" },
      { label: "卡西米尔镶甲斗篷", value: "kazimierz armor cape" },
      { label: "拉特兰神职法袍", value: "laterano cleric vestments" },
      { label: "乌萨斯御寒外套", value: "ursus survival parka" },
    ],
  },
  {
    title: "下装",
    key: "bottom",
    data: [
      { label: "多袋工装裤", value: "cargo trousers" },
      { label: "修身长裤", value: "fitted pants" },
      { label: "百褶裙", value: "pleated skirt" },
      { label: "战斗短裤", value: "battle shorts" },
      { label: "飘逸长袍", value: "flowing robes" },
      { label: "装甲护腿", value: "armored greaves" },
      { label: "层叠裹裙", value: "layered wraps" },
      { label: "战术干员裤", value: "tactical operator pants" },
      { label: "装甲打底裤", value: "armored leggings" },
      { label: "都市疾跑短裤", value: "city runner shorts" },
      { label: "典礼长裙", value: "ceremonial long skirt" },
      { label: "寒地长裤", value: "cold weather trousers" },
    ],
  },
  {
    title: "整套风格",
    key: "set",
    data: [
      { label: "战斗制服", value: "combat uniform" },
      { label: "旅行者休闲套", value: "casual traveler outfit" },
      { label: "正式礼装", value: "formal attire" },
      { label: "潜行装备", value: "stealth gear" },
      { label: "节庆装束", value: "festival outfit" },
      { label: "王族典礼装", value: "royal regalia" },
      { label: "游牧装束", value: "nomad attire" },
      { label: "罗德岛野战套装", value: "rhodes island field kit" },
      { label: "整合运动悔改套", value: "reunion repentant set" },
      { label: "卡西米尔锦标甲", value: "kazimierz tourney armor" },
      { label: "桑卡塔执行官礼服", value: "sankta executor regalia" },
      { label: "乌萨斯撤离护卫套", value: "ursus evac guardian set" },
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
      { label: "源石复合材", value: "originium composite" },
      { label: "抗辐射网料", value: "radiation shield mesh" },
      { label: "军用合成皮", value: "military synth leather" },
      { label: "游牧毛皮", value: "nomadic furs" },
      { label: "拉特兰丝钢", value: "laterano silksteel" },
    ],
  },
  {
    title: "配件",
    key: "accessory",
    data: [
      { label: "多功能腰带", value: "utility belt" },
      { label: "手套", value: "gloves" },
      { label: "围巾", value: "scarf" },
      { label: "头部装备", value: "headgear" },
      { label: "饰品", value: "jewelry" },
      { label: "弹药带", value: "bandolier" },
      { label: "源石技艺典籍", value: "magic tome accessory" },
      { label: "干员识别徽章", value: "operator id badge" },
      { label: "战术耳机", value: "strategic headset" },
      { label: "卡西米尔骑枪", value: "kazimierz lance" },
      { label: "执行官方册", value: "executor tome" },
      { label: "乌萨斯求生包", value: "ursus survival pack" },
    ],
  },
  {
    title: "源石状态",
    key: "originium_status",
    unique: true,
    data: [
      { label: "未感染", value: "non infected" },
      { label: "第一阶段感染者", value: "stage i infected" },
      { label: "已稳定感染者", value: "stabilized infected" },
      { label: "灾后幸存感染者", value: "outbreak survivor" },
      { label: "潜伏携带者", value: "dormant carrier" },
    ],
  },
];

const examples = [
  {
    image:
      "https://cdn.ocmaker.app/example/arknights-oc-maker-generated-1.webp",
    prompt:
      "1boy, white hair with black streaks, red eyes, wolf ears and tail, rhodes island guard operator, tactical gear, sword weapon, serious expression, originium crystals visible, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/arknights-oc-maker-generated-2.webp",
    prompt:
      "1girl, long silver hair, blue eyes, cat ears, medic operator uniform, white coat with rhodes island logo, medical equipment, gentle smile, healing arts effects, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/arknights-oc-maker-generated-3.webp",
    prompt:
      "1girl, short pink hair, golden eyes, rabbit ears, sniper operator, tactical scope, rifle weapon, focused expression, camouflage gear, crosshair targeting effect, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/arknights-oc-maker-generated-4.webp",
    prompt:
      "1boy, dark blue hair, green eyes, dragon horns, defender operator, heavy armor, shield and hammer, protective stance, originium infection scars, single character, upper body, looking at viewer, anime style, simple background",
  },
];

export default {
  meta: {
    title: "明日方舟 OC 角色生成器",
    description:
      "借助 AI 打造你的《明日方舟》原创干员，塑造多族裔、多职阶与源石技艺的罗德岛成员。",
  },
  series: "明日方舟",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "明日方舟 OC 生成器",
      description:
        "输入角色构想，几秒内生成贴合《明日方舟》世界观的原创干员设定与视觉。",
    },
    step: {
      title: "如何打造明日方舟 OC",
      description:
        "使用 OC 生成器创建明日方舟干员就像执行战术任务，按下列步骤轻松部署你的罗德岛新人。",
      steps: [
        {
          title: "描述你的干员",
          description:
            "填写角色的外貌与性格。若能加入兽耳、角、尾巴等种族特征，干员职阶制服、战术装具或源石感染痕迹，结果将更加逼真。",
        },
        {
          title: "补充职阶与技艺",
          description:
            "说明干员的职阶（先锋、狙击、术师、医疗、重装、特种、辅助等）、武器类型、源石技艺专长与出身种族。若再补充部署费用与战术定位，形象会更贴合设定。",
        },
        {
          title: "部署干员",
          description:
            "点击“生成角色”即可获得多种 AI 设计，挑选最适合的版本，让你的罗德岛干员正式入列。",
        },
      ],
    },
    examples: {
      title: "明日方舟 OC 示例",
      description: "浏览使用明日方舟 OC 生成器文字提示生成的干员示例。",
      examples,
    },
    features: {
      title: "明日方舟 OC 生成器 有何不同？",
      description:
        "明日方舟 OC 生成器 是针对《明日方舟》世界观打造的 OC 生成器 版本，只要描述干员即可瞬间获得罗德岛风格的战术立绘。",
      features: [
        {
          label: "地道的泰拉设计",
          description:
            "从多元种族到战术装备，完整还原《明日方舟》工业美学与旷野氛围，让角色无缝融入泰拉。",
        },
        {
          label: "职阶系统整合",
          description:
            "提示词针对各类干员职阶与源石技艺调优——无论先锋机动力量或医疗术式，都能生成平衡又真实的干员。",
        },
        {
          label: "快速构建干员",
          description:
            "数秒内便能得到专业水准的干员设定，适合作战计划、同人创作或扩充你的罗德岛名册。",
        },
        {
          label: "细腻角色视觉",
          description:
            "AI 输出高解析度的干员形象，细致描绘源石结晶、战术器材与种族特征。",
        },
        {
          label: "多路部署选择",
          description:
            "每次生成都会提供多种变体，让你在确认职阶与战术定位前尽情尝试。",
        },
        {
          label: "完整干员档案",
          description:
            "除图像外，还能延展出背景、源石状态与战术专长，全面符合《明日方舟》的世界逻辑。",
        },
      ],
    },
    faqs: {
      title: "常见问题",
      description: "还有其他疑问？欢迎来信 support@ocmaker.app",
      faqs: [
        {
          question: "什么是 明日方舟 OC 生成器？它如何运作？",
          answer:
            "明日方舟 OC 生成器 是专为打造《明日方舟》干员的 AI 工具。描述角色的外貌、职阶与源石技艺，系统便会生成符合游戏战术美学的立绘。",
        },
        {
          question: "如何让生成的干员更贴合原作？",
          answer:
            "在描述中加入干员职阶、种族特征、源石感染状况与战术装备。结合世界观与设定细节，角色就会更加真实。",
        },
        {
          question: "明日方舟 OC 生成器 可以免费使用吗？",
          answer:
            "可以。基础功能免费开放；若想享受更快生成、更多职阶与自定义选项，可升级至进阶方案。",
        },
        {
          question: "为什么生成结果看起来如此正统？",
          answer:
            "我们的 AI 深入理解泰拉的世界观与罗德岛的战术美学，能在角色视觉与背景上保持与游戏一致的质感。",
        },
        {
          question: "我可以把生成的干员用于同人创作吗？",
          answer:
            "当然可以！使用 明日方舟 OC 生成器 创作的角色归你所有，可用于同人小说、插画、角色扮演等任何相关项目。",
        },
        {
          question: "需要注册账号才能创建干员吗？",
          answer:
            "基本功能无需注册；注册后可保存干员、查看生成记录并解锁更多战术功能。",
        },
        {
          question: "能否建立不同种族与职阶的组合？",
          answer:
            "可以！无论是桑卡塔、萨卡兹或利刃族，也能搭配任何干员职阶，并自定义感染情况与源石技艺。",
        },
        {
          question: "未来会新增更多游戏主题的 OC 生成器 吗？",
          answer:
            "会的！我们持续扩充游戏主题的 OC 生成器，欢迎常回 ocmaker.app 浏览最新更新。",
        },
      ],
    },
    cta: {
      title: "部署你的罗德岛干员",
      description:
        "无需绘画功力，只要描述、生成，就能让原创干员加入对抗天灾的行列。",
      btns: {
        start: "开始创作",
        explore: "探索 OC 示例",
      },
    },
  },
};
