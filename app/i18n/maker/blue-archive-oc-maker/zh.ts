const basePrompt = `
  WORLD CONTEXT:
  故事：《蔚蓝档案》
  背景概述：学生都市基沃托斯中，各大学园、学生会与课后事务部在老师的带领下执行任务，伴随夸张火力与 EX 技能
  关键势力：联邦学生会（契巴柜）、圣三一、格黑娜、千年、阿里乌斯、瓦尔基里警队、阿拜多斯自救会、问题解决者 68、美食社团等

  OUTPUT FORMAT:
  姓名、所属学园与社团、职位／专长、常用武器与 EX 技能、性格、独特癖好、任务背景

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "圣三一狙击手",
    description: "以光辉护盾守护伙伴的优秀狙击生。",
    prompt: `角色名称？
塞莱斯特·玛丽戈德

所属学园与社团？
圣三一综合学园，正义实现委员会

担任的职位或专长？
远距离火力掩护与战场分析

常用武器与 EX 技能？
反器材狙击枪“加百列”，EX 技能可召唤圣光屏障

她的性格？
沉静、追求完美，暗地里是甜点控

她的怪癖？
收藏彩绘玻璃吊饰，战斗中会引用经文

分享一段任务背景。
在拉布利亚暴动期间，和老师以加密圣歌同步狙击，成功让失控坦克停摆。`,
  },
  {
    title: "格黑娜爆破手",
    description: "爱放烟火的爆破狂热者，让风纪委员伤透脑筋。",
    prompt: `角色名称？
伊吹·布雷兹

所属学园与社团？
格黑娜学园，工程研究社

担任的职位或专长？
爆破专家与机关改造师

常用武器与 EX 技能？
榴弹发射器“地狱火”，EX 技能部署烈焰炮台

她的性格？
混乱、创意十足，对朋友极其忠诚

她的怪癖？
给每个装置取甜点名字，还贩售防爆甜品

分享一段任务背景。
改造祭典烟火架，诱导问题解决者 68 偏离路线，拯救阿拜多斯平民。`,
  },
  {
    title: "千年黑客",
    description: "守护老师通讯、不畏失控 AI 的科技奇才。",
    prompt: `角色名称？
中森帕奇

所属学园与社团？
千年科学学院，真理社网络安全组

担任的职位或专长？
网络渗透与无人机防御调度

常用武器与 EX 技能？
双持冲锋枪，EX 技能召唤防火墙无人机群

他的性格？
长期熬夜、有点怪，永远好奇各种 BUG

他的怪癖？
把服务器当宠物聊天，收藏稀有错误代码

分享一段任务背景。
于废墟战场改写恶意程序，及时终止 AI 暴走，老师则在前线拖住敌人。`,
  },
  {
    title: "阿拜多斯策士",
    description: "靠精密规划让沙漠学园得以维持运作。",
    prompt: `角色名称？
拉娜·索尔

所属学园与社团？
阿拜多斯高中，对策委员会

担任的职位或专长？
后勤筹划与狙击手观察员

常用武器与 EX 技能？
杠杆式步枪，EX 技能能召唤沙尘掩护

她的性格？
机智、固执，却对阿拜多斯始终怀抱希望

她的怪癖？
把夺回的每一栋沙漠校舍都做成剪贴簿

分享一段任务背景。
策划对凯撒集团的物资劫持，将补给悄悄送到每一个濒临断粮的社团。`,
  },
  {
    title: "SRT 战场医疗兵",
    description: "沉着的战地医护，让突击队平安归队。",
    prompt: `角色名称？
美游·艾吉斯

所属学园与社团？
SRT 特别学园，盾队

担任的职位或专长？
前线医疗兵兼持盾手

常用武器与 EX 技能？
带盾冲锋枪，EX 技能展开防护穹顶

她的性格？
冷静、坚定、言简意赅

她的怪癖？
随身携带记录本，写下每位获救学生的名字

分享一段任务背景。
在那须都市事件中背着老师穿越火线，独自撑起盾墙直到援军抵达。`,
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
      { label: "一年级", value: "teen" },
      { label: "二年级", value: "late teen" },
      { label: "三年级", value: "young adult" },
      { label: "老师级", value: "adult" },
      { label: "战斗老手", value: "veteran" },
      { label: "资深导师", value: "seasoned elder" },
      { label: "传说级", value: "timeless legend" },
      { label: "一年级新生", value: "first year student" },
      { label: "二年级策士", value: "second year strategist" },
      { label: "三年级前辈", value: "third year senior" },
      { label: "转校老师伙伴", value: "transfer sensei ally" },
      { label: "毕业校友", value: "graduated alum" },
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
      { label: "爽朗笑容", value: "smiling expression" },
      { label: "认真神情", value: "serious expression" },
      { label: "沉着面容", value: "stoic expression" },
      { label: "调皮微笑", value: "playful grin" },
      { label: "高燃斗志", value: "fierce snarl" },
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
      { label: "战术马甲", value: "armored vest" },
      { label: "宽松衬衫", value: "loose shirt" },
      { label: "连帽斗篷", value: "hooded cloak" },
      { label: "典礼长袍", value: "ceremonial robe" },
      { label: "圣三一西装外套", value: "trinity blazer" },
      { label: "格黑娜飞行夹克", value: "gehenna bomber jacket" },
      { label: "千年科技外套", value: "millennium tech coat" },
      { label: "阿拜多斯沙漠外套", value: "abydos desert parka" },
      { label: "SRT 战术连帽衣", value: "srt tactical hoodie" },
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
      { label: "飘逸长裙", value: "flowing robes" },
      { label: "护甲护腿", value: "armored greaves" },
      { label: "层叠裹裙", value: "layered wraps" },
      { label: "学院百褶裙", value: "academy pleated skirt" },
      { label: "战斗紧身裤", value: "combat tights" },
      { label: "战术短裤", value: "utility shorts" },
      { label: "沙漠打底裤", value: "desert leggings" },
      { label: "科技工装裤", value: "tech cargo pants" },
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
      { label: "正义实现制服", value: "justice committee uniform" },
      { label: "问题解决者装备", value: "problem solver gear" },
      { label: "千年实验服", value: "millennium lab attire" },
      { label: "阿拜多斯求生套", value: "abydos survival kit" },
      { label: "SRT 突击套装", value: "srt strike team set" },
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
      { label: "校用制服布", value: "school fabric" },
      { label: "耐火织物", value: "fireproof weave" },
      { label: "凯夫拉填充", value: "kevlar padding" },
      { label: "智能纤维", value: "smart fiber" },
      { label: "沙漠透气网", value: "desert mesh" },
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
      { label: "战术终端", value: "magic tome accessory" },
      { label: "学生会臂章", value: "student council armband" },
      { label: "学园识别挂绳", value: "academy id lanyard" },
      { label: "老师通信耳机", value: "sensei headset" },
      { label: "全息瞄准镜", value: "holosight visor" },
      { label: "社团徽章吊饰", value: "club insignia charm" },
    ],
  },
  {
    title: "学园归属",
    key: "academy",
    data: [
      { label: "圣三一", value: "trinity" },
      { label: "格黑娜", value: "gehenna" },
      { label: "千年", value: "millennium" },
      { label: "阿拜多斯", value: "abydos" },
      { label: "SRT 学园", value: "srt" },
      { label: "阿里乌斯", value: "arius" },
    ],
  },
];

const examples = [
  {
    image: "https://cdn.ocmaker.app/example/blue-archive-oc-generated-1.webp",
    prompt:
      "1girl, short black hair with blue highlights, bright blue eyes, cheerful smile, trinity academy uniform, white and blue school outfit, student council armband, school bag, youthful pose, single character, upper body, looking at viewer, anime style, school background",
  },
  {
    image: "https://cdn.ocmaker.app/example/blue-archive-oc-generated-2.webp",
    prompt:
      "1girl, long pink hair, purple eyes, gentle expression, gehenna academy uniform, black and red school outfit, tactical gear accessories, rifle weapon, confident stance, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/blue-archive-oc-generated-3.webp",
    prompt:
      "1girl, twin tails blonde hair, green eyes, energetic smile, millennium academy uniform, high-tech school outfit, tablet computer, futuristic accessories, study pose, single character, upper body, looking at viewer, anime style, classroom background",
  },
  {
    image: "https://cdn.ocmaker.app/example/blue-archive-oc-generated-4.webp",
    prompt:
      "1girl, white hair with cat ears, golden eyes, playful wink, abydos academy uniform, sandy colored school outfit, desert survival gear, determined expression, single character, upper body, looking at viewer, anime style, simple background",
  },
];

export default {
  meta: {
    title: "蔚蓝档案 OC 角色生成器",
    description:
      "借助 AI 打造你的《蔚蓝档案》原创学生，重现基沃托斯各学园的制服、社团与青春冒险。",
  },
  series: "蔚蓝档案",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Blue Archive OC Maker",
      description: "输入角色设定，即刻获得基沃托斯风格的学生立绘与任务档案。",
    },
    step: {
      title: "如何打造 Blue Archive OC",
      description:
        "创建蔚蓝档案角色就像排班一次课后任务，按步骤完成你的学生档案。",
      steps: [
        {
          title: "描述学园与造型",
          description:
            "填写角色外貌、所属学园与社团。可加入圣三一制服、格黑娜装备、千年科技饰品或阿拜多斯防沙服等细节。",
        },
        {
          title: "设定武器与 EX 技能",
          description:
            "说明常用的枪械、战术装备与 EX 技能效果，并写出在老师指挥下的战斗定位与特长。",
        },
        {
          title: "生成你的任务报告",
          description:
            "点击“生成角色”，即可获得多种 AI 设计，挑选最适合加入老师班级的版本。",
        },
      ],
    },
    examples: {
      title: "蔚蓝档案学生示例",
      description: "浏览由 Blue Archive OC Maker 生成的学生角色造型。",
      examples,
    },
    features: {
      title: "Blue Archive OC Maker 有何特别之处？",
      description:
        "Blue Archive OC Maker 针对基沃托斯世界调校，只要描述即可生成带有枪械与 EX 技能的学生形象。",
      features: [
        {
          label: "学园氛围还原",
          description:
            "呈现圣三一、格黑娜、千年等校风差异，保持轻松又热血的校园调性。",
        },
        {
          label: "武器与技能整合",
          description:
            "支持狙击、爆破、黑客、防御等多样战斗定位，以及具象化的 EX 技能效果。",
        },
        {
          label: "快速生成青春立绘",
          description:
            "数秒内获得高质量角色立绘，适合同人漫画、剧本或社团活动策划。",
        },
        {
          label: "双色制服与装备细节",
          description:
            "AI 能展现校服分层、社团配件与独特涂装，完整还原学园时尚。",
        },
        {
          label: "多角色变体",
          description:
            "每次生成提供多种方案，让你自由挑选不同社团或学园的造型组合。",
        },
        {
          label: "任务叙事拓展",
          description:
            "结合老师与学生的羁绊，扩展任务背景、社团目标与青春日常。",
        },
      ],
    },
    faqs: {
      title: "常见问题",
      description: "还有疑问？欢迎来信 support@ocmaker.app",
      faqs: [
        {
          question: "Blue Archive OC Maker 是什么？",
          answer:
            "Blue Archive OC Maker 是为《蔚蓝档案》打造的 AI 工具。描述学生外貌、社团与技能后，系统会生成对应风格的角色图像。",
        },
        {
          question: "如何让角色更像基沃托斯学生？",
          answer:
            "请加入学园制服配色、社团器材、EX 技能名称或老师的任务指令等细节，结果会更贴近原作。",
        },
        {
          question: "可以免费使用吗？",
          answer:
            "可以。基础功能免费，若想快速生成或获得更多自定义选项，可升级方案。",
        },
        {
          question: "为什么生成出的服装细节这么丰富？",
          answer:
            "系统研究了《蔚蓝档案》的美术风格，对制服层次、枪械与社团配件都有优化。",
        },
        {
          question: "我能把角色用在同人企划或 TRPG 吗？",
          answer:
            "当然可以！你用 Blue Archive OC Maker 创作的角色归你所有，可用于同人活动与剧本演出。",
        },
        {
          question: "需要注册账号才能生成吗？",
          answer:
            "基础模式无需注册；注册后可保存学生档案、查看生成历史并解锁更多功能。",
        },
        {
          question: "能组合不同学园或社团的设定吗？",
          answer: "可以！尽情混搭学园与社团背景，打造跨校合作或转校生剧情。",
        },
        {
          question: "还会推出其他校园主题的 OC Maker 吗？",
          answer:
            "会的！我们会持续扩充 OC Maker 列表，欢迎关注 ocmaker.app 的最新消息。",
        },
      ],
    },
    cta: {
      title: "加入老师的班级",
      description:
        "无需绘画技能，只要输入描述就能把原创学生带入《蔚蓝档案》的世界。",
      btns: {
        start: "开始创作",
        explore: "浏览示例",
      },
    },
  },
};
