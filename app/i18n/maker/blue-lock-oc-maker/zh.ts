const basePrompt = `
  WORLD CONTEXT:
  故事：《蓝色监狱 Blue Lock》
  背景概述：日本足球联盟的 Blue Lock 基地中，自我至上的前锋训练计划，将选手推入封闭空间的高压对决
  关键要素：孤立训练区、前锋宿敌、外卡邀请、Neo Egoist 联赛俱乐部（巴斯塔德慕尼黑、巴黎 X Gen、曼夏城等）、适应力测验

  OUTPUT FORMAT:
  姓名、惯常位置、标志性武器（技能）、辅助能力、人格／自我、宿敌动机、足球背景

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "自我主义前锋",
    description: "脚法如刀刃的前锋，用剑术步伐将每次凌空击变成高光。",
    prompt: `角色名称？
岚史海斗

他惯常出任的位置？
中锋，主导锋线

他展示的标志性武器或技能？
“刀刃凌空”——以剑道步伐切开防线的凌空抽射

支撑打法的辅助能力有哪些？
闪电般的假动作、源自剑道训练的空中控球

他的自我与性格如何？
戏剧化，自封英雄，越是聚光灯越兴奋

让他保持饥饿感的宿敌是谁？
要超越潔世一，成为日本球场最锋利的刀

分享一段足球背景。
曾是青年剑道冠军，收到 Blue Lock 邀请信后毅然离开道场。`,
  },
  {
    title: "战术司令官",
    description: "把 Blue Lock 每场比赛都视作棋局的中场组织者。",
    prompt: `角色名称？
月岛零

他惯常出任的位置？
前腰，组织进攻

他展示的标志性武器或技能？
“逼迫定式”视野传球，精准打进防线缝隙

支撑打法的辅助能力有哪些？
阅读比赛、定位球诡计、不停歇的情报演算

他的自我与性格如何？
沉着、策略至上，对即兴派略带轻蔑

让他保持饥饿感的宿敌是谁？
想证明智慧可以凌驾本能，目标是推翻凛·糸师

分享一段足球背景。
他把每场试炼绘制成网格笔记，靠预判三步先机战胜高大前锋。`,
  },
  {
    title: "制空王牌",
    description: "垂直起跳堪比流星坠落的边锋。",
    prompt: `角色名称？
藤森诺亚

他惯常出任的位置？
左边锋，冲击后门柱

他展示的标志性武器或技能？
“流星坠击”——违背重力的头球得分

支撑打法的辅助能力有哪些？
爆发冲刺、双重触球控球、无惧对抗

他的自我与性格如何？
放浪、追求刺激，沉迷观众欢呼

让他保持饥饿感的宿敌是谁？
想正面挑战蜂乐廻的创造力，同时争夺 Neo Egoist 名额

分享一段足球背景。
曾因恐高坠落，随后在废弃过山车训练，彻底征服高度恐惧。`,
  },
  {
    title: "定位球魔术师",
    description: "让任意球轨迹宛如幻影的球员。",
    prompt: `角色名称？
水野光

他惯常出任的位置？
右中场与定位球专家

他展示的标志性武器或技能？
“蜃气楼无旋”——难以预测落点的无旋任意球

支撑打法的辅助能力有哪些？
解读天气、操控旋转、灵活站位

他的自我与性格如何？
冷静、神秘，常以诗句作比喻

让他保持饥饿感的宿敌是谁？
梦想在正式比赛中向诺艾尔·诺亚进球并获赞

分享一段足球背景。
以橡皮筋射出纸鹤研究空气曲线，再将轨迹复制到足球上。`,
  },
  {
    title: "守护自由人",
    description: "从后防也要抢走聚光灯的防线指挥官。",
    prompt: `角色名称？
古贺绫人

他惯常出任的位置？
清道夫型自由人

他展示的标志性武器或技能？
“神盾破袭”——铲抢后瞬间发动反击

支撑打法的辅助能力有哪些？
激光般的长传、强悍盯防、制空优势

他的自我与性格如何？
保护欲强、内敛却压迫感十足，追求完全掌控

让他保持饥饿感的宿敌是谁？
要证明后卫同样配拥有自我荣耀

分享一段足球背景。
曾因过度支持队友被按在替补席，他加入 Blue Lock 为重塑日本 ace 的定义。`,
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
      { label: "资深球员", value: "adult" },
      { label: "老练球星", value: "veteran" },
      { label: "资深导师", value: "seasoned elder" },
      { label: "传说级", value: "timeless legend" },
      { label: "U-18 前锋", value: "u18 striker" },
      { label: "Neo Egoist 练习生", value: "neo egoist trainee" },
      { label: "国际新人", value: "international rookie" },
      { label: "职业联赛前锋", value: "pro league forward" },
      { label: "宿命王牌", value: "veteran ace" },
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
      { label: "自信笑容", value: "smiling expression" },
      { label: "严肃神情", value: "serious expression" },
      { label: "冷峻面容", value: "stoic expression" },
      { label: "挑衅笑容", value: "playful grin" },
      { label: "咆哮斗志", value: "fierce snarl" },
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
      { label: "多功能外套", value: "utility jacket" },
      { label: "层叠外套", value: "layered coat" },
      { label: "休闲束腰上衣", value: "casual tunic" },
      { label: "防护马甲", value: "armored vest" },
      { label: "宽松上衣", value: "loose shirt" },
      { label: "连帽外套", value: "hooded cloak" },
      { label: "典礼长袍", value: "ceremonial robe" },
      { label: "Blue Lock 球衣", value: "blue lock jersey" },
      { label: "训练背心", value: "training bib" },
      { label: "Neo Egoist 套装", value: "neo egoist kit" },
      { label: "国际俱乐部球衣", value: "international club uniform" },
      { label: "街头练习 T 恤", value: "street practice tee" },
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
      { label: "压缩短裤", value: "compression shorts" },
      { label: "比赛短裤", value: "match shorts" },
      { label: "训练长裤", value: "track pants" },
      { label: "街头慢跑裤", value: "street joggers" },
      { label: "热身运动裤", value: "warm up sweats" },
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
      { label: "典礼套装", value: "royal regalia" },
      { label: "游牧装束", value: "nomad attire" },
      { label: "Blue Lock 标准套装", value: "blue lock standard set" },
      { label: "Team Z 纪念套装", value: "team z nostalgia set" },
      { label: "诺艾尔·诺亚职业套装", value: "noel noa pro kit" },
      { label: "世界杯挑战者", value: "world cup challenger set" },
      { label: "街头室外足球", value: "street futsal gear" },
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
      { label: "排汗网布", value: "sweat wicking mesh" },
      { label: "轻量球衣面料", value: "lightweight jersey" },
      { label: "压缩织物", value: "compression weave" },
      { label: "恒温训练布", value: "thermal training fabric" },
      { label: "防雨尼龙", value: "rain ready nylon" },
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
      { label: "战术笔记", value: "magic tome accessory" },
      { label: "性能球鞋", value: "performance cleats" },
      { label: "队长袖标", value: "captain armband" },
      { label: "肌贴", value: "kinesio tape" },
      { label: "进球计数手环", value: "goal tracker wristband" },
      { label: "头带", value: "headband" },
    ],
  },
  {
    title: "位置",
    key: "position",
    data: [
      { label: "中锋", value: "striker" },
      { label: "影锋", value: "second striker" },
      { label: "边锋", value: "winger" },
      { label: "组织核心", value: "playmaker" },
      { label: "自由人", value: "libero" },
    ],
  },
];

const examples = [
  {
    image:
      "https://cdn.ocmaker.app/example/blue-lock-oc-maker-generated-1.webp",
    prompt:
      "1boy, spiky blue hair, intense yellow eyes, competitive expression, blue lock style soccer uniform number 11, muscular build, dynamic pose, soccer field background, anime style, looking at viewer, simple background, upper body",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/blue-lock-oc-maker-generated-2.webp",
    prompt:
      "1boy, white hair with black streaks, sharp red eyes, confident smirk, blue lock training gear, athletic physique, holding soccer ball, striker pose, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/blue-lock-oc-maker-generated-3.webp",
    prompt:
      "1boy, long green hair tied back, calculating purple eyes, analytical expression, blue lock goalkeeper uniform, gloves, defensive stance, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/blue-lock-oc-maker-generated-4.webp",
    prompt:
      "1boy, short orange hair, fierce blue eyes, determined expression, blue lock midfielder jersey number 7, speed-focused build, ready to sprint pose, single character, upper body, looking at viewer, anime style, simple background",
  },
];

export default {
  meta: {
    title: "Blue Lock OC 角色生成器",
    description:
      "借助 AI 创建你的《蓝色监狱》原创球员，在以自我为武器的足球战场书写高压剧情。",
  },
  series: "蓝色监狱",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Blue Lock OC Maker",
      description:
        "输入角色设定，秒级生成贴合 Blue Lock 世界观的自我主义球员形象。",
    },
    step: {
      title: "如何打造 Blue Lock OC",
      description:
        "在 OC Maker 中塑造《蓝色监狱》角色就像接受一次 Ego 评估，按步骤完成自我主义前锋的诞生。",
      steps: [
        {
          title: "描绘外貌与球衣",
          description:
            "填写角色外貌、球衣款式与训练装备。加入 Blue Lock 号码、Neo Egoist 俱乐部球衣或街头练习装，能让角色更具现场感。",
        },
        {
          title: "设定武器与 Ego",
          description:
            "说明前锋武器（关键技能）、辅助能力与个人 Ego，写出宿敌与目标，强调“为进球而生”的执念。",
        },
        {
          title: "生成自我主义档案",
          description:
            "点击“生成角色”，即可获得多种 AI 设计，挑选最能主宰球场的版本加入 Blue Lock。",
        },
      ],
    },
    examples: {
      title: "Blue Lock 角色示例",
      description:
        "看看使用 Blue Lock OC Maker 生成的高压前锋样张。",
      examples,
    },
    features: {
      title: "Blue Lock OC Maker 有何特色？",
      description:
        "Blue Lock OC Maker 针对《蓝色监狱》打造，只要输入描述即可得到充满 Ego 氛围的足球角色。",
      features: [
        {
          label: "还原高压训练场",
          description:
            "呈现封闭设施、宿舍号段与适应力测试元素，让角色自然融入 Blue Lock 试炼。",
        },
        {
          label: "自我主义设定工具",
          description:
            "支持自定义前锋武器、辅助能力与宿敌目标，强化角色的 Ego 叙事。",
        },
        {
          label: "快速生成球员立绘",
          description:
            "数秒内输出高质量球员形象，兼顾球衣贴花、球鞋与比赛姿态。",
        },
        {
          label: "多俱乐部联动",
          description:
            "可结合 Neo Egoist 联赛俱乐部配色，创造跨国风格的前锋角色。",
        },
        {
          label: "多样化姿势变体",
          description:
            "每次生成提供不同动态，让角色在冲刺、凌空或庆祝姿势间切换。",
        },
        {
          label: "完整背景整合",
          description:
            "除了视觉，还可扩展宿敌、成长经历与训练阶段，构筑完整 Ego 档案。",
        },
      ],
    },
    faqs: {
      title: "常见问题",
      description: "还有疑问？欢迎来信 support@ocmaker.app",
      faqs: [
        {
          question: "什么是 Blue Lock OC Maker？",
          answer:
            "Blue Lock OC Maker 是专为《蓝色监狱》世界观打造的 AI 工具。描述角色的外貌、技能与 Ego 后，即可生成贴合原作风格的前锋立绘。",
        },
        {
          question: "如何让角色更像 Blue Lock 球员？",
          answer:
            "描述中加入 Blue Lock 号码、标志性武器、宿敌目标与自我宣言，可让角色更具 Ego 味道。",
        },
        {
          question: "可以免费使用吗？",
          answer:
            "可以。基础功能免费提供；若需要更快生成速度或更多自定义选项，可升级方案。",
        },
        {
          question: "为什么生成的球衣细节如此逼真？",
          answer:
            "系统针对 Blue Lock 训练服与 Neo Egoist 球衣进行了调优，能呈现球衣纹理与标识。",
        },
        {
          question: "我能把角色用于同人或战术剧本吗？",
          answer:
            "当然可以！使用 Blue Lock OC Maker 创作的角色归你所有，可用于小说、漫画或战术模拟。",
        },
        {
          question: "需要注册账号才能生成吗？",
          answer:
            "基础模式无需注册；注册后可保存角色、查看生成记录并解锁更多功能。",
        },
        {
          question: "能否设定非前锋角色？",
          answer:
            "可以！虽然蓝色监狱聚焦前锋，但你能通过位置选项打造自由人、组织核心等个性角色。",
        },
        {
          question: "未来会加入其他体育类 OC Maker 吗？",
          answer:
            "会的！我们持续扩展体育与动漫主题的 OC Maker，欢迎关注 ocmaker.app。",
        },
      ],
    },
    cta: {
      title: "释放你的 Ego 前锋",
      description:
        "无需绘画技能，只要描述即可生成为进球而生的《蓝色监狱》原创球员。",
      btns: {
        start: "开始创作",
        explore: "浏览示例",
      },
    },
  },
};
