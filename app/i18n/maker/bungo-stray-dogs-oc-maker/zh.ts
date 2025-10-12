const basePrompt = `
  WORLD CONTEXT:
  故事：《文豪野犬》
  背景概述：横滨暗巷与港口之间，文豪能力者在侦探社任务、黑手党争斗与政府监察中交织博弈
  关键阵营：武装侦探社、港口黑手党、异能特务科、噬灵者公会、天人五衰、死屋之鼠

  OUTPUT FORMAT:
  姓名、异能名称与效果、所属阵营、战斗／支援职责、异能限制与弱点、性格、过往事件

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "幻术侦探",
    description: "以舞台技法扰乱敌手的侦探社搜查员。",
    prompt: `角色名称？
漣見花绘

异能名称与作用？
异能「雾幻剧场」——在聚光范围内构筑可触摸的幻象

所属阵营？
武装侦探社

承担的战斗／支援角色？
外勤调查员，擅长欺敌与误导

异能的条件或弱点？
每个幻象都需借助实物道具锚定；正午阳光会削弱效果

他的性格？
开朗、有同理心，喜爱引用经典戏剧台词

分享一段过去的事件。
曾在废弃仓库里布置假人质舞台，一举揭开港口黑手党的走私线路。`,
  },
  {
    title: "黑手党快递员",
    description: "能融入街头涂鸦穿梭无形的走私员。",
    prompt: `角色名称？
葛拉夫一雄

异能名称与作用？
异能「壁画通行」——进入壁画后可从任意相连绘画中现身

所属阵营？
港口黑手党物流部门

承担的战斗／支援角色？
走私者与紧急侦察员

异能的条件或弱点？
仅能使用上周内完成的涂绘作品

他的性格？
玩世不恭，对同伴却极度忠诚，热爱街头艺术

分享一段过去的事件。
曾在千钧一发时把芥川拖入涂鸦通道，躲避了迎面而来的子弹雨。`,
  },
  {
    title: "特务科档案官",
    description: "以诗章拘束罪犯的政府能力者。",
    prompt: `角色名称？
诗织真理子

异能名称与作用？
异能「诗节拘留」——吟诵诗句即可化作束缚锁链

所属阵营？
异能特务科

承担的战斗／支援角色？
逮捕专员兼情报官

异能的条件或弱点？
若诗句念错或节奏紊乱，锁链会立即断裂

她的性格？
自律、礼貌，将冷幽默藏于礼仪背后

分享一段过去的事件。
曾逐字背诵嫌犯未发表的小说，将其束缚并迫使其投降。`,
  },
  {
    title: "公会谈判家",
    description: "在利润与良知间摇摆的美国籍能力者。",
    prompt: `角色名称？
艾利亚斯·梦露

异能名称与作用？
异能「黄金契约」——以能量屏障封印条约

所属阵营？
公会（独立顾问）

承担的战斗／支援角色？
谈判代表与战场护盾支援

异能的条件或弱点？
只要任一方违背承诺，屏障便会崩解

他的性格？
温文尔雅、投机取巧，却出乎意料地重情

分享一段过去的事件。
曾以自身异能为赌注，促成侦探社与公会归还人质的停火协约。`,
  },
  {
    title: "天人潜伏者",
    description: "渗透天人五衰、付出惨痛代价的双面间谍。",
    prompt: `角色名称？
纸谷千代

异能名称与作用？
异能「纸折迷宫」——将文件折叠成可行走的空间迷宫

所属阵营？
狩猎犬部队的双重间谍

承担的战斗／支援角色？
情报运输员，为同伴织出逃生通道

异能的条件或弱点？
只要纸张被烧毁或撕裂，迷宫会立刻瓦解

她的性格？
沉毅、冷峻，却仍对人性怀抱希望

分享一段过去的事件。
曾把疏散图折成实体通道，引导被困的群众逃离天空赌场。`,
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
      { label: "经验长者", value: "seasoned elder" },
      { label: "不朽传奇", value: "timeless legend" },
      { label: "少年能力者", value: "teen ability user" },
      { label: "青年侦探", value: "young detective" },
      { label: "黑手党干部", value: "mafia officer" },
      { label: "侦探社老将", value: "armed detective veteran" },
      { label: "文豪耆宿", value: "novelist elder" },
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
      { label: "多功能外套", value: "utility jacket" },
      { label: "层叠大衣", value: "layered coat" },
      { label: "休闲束腰上衣", value: "casual tunic" },
      { label: "防护马甲", value: "armored vest" },
      { label: "宽松衬衫", value: "loose shirt" },
      { label: "连帽斗篷", value: "hooded cloak" },
      { label: "典礼长袍", value: "ceremonial robe" },
      { label: "侦探社风衣", value: "armed detective trench" },
      { label: "港口黑手党大衣", value: "port mafia coat" },
      { label: "日常异能夹克", value: "casual ability jacket" },
      { label: "公会礼服", value: "guild suit" },
      { label: "天人祭服", value: "decay of angel robes" },
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
      { label: "剪裁西裤", value: "tailored slacks" },
      { label: "吊带长裤", value: "suspenders trousers" },
      { label: "高腰裙", value: "high waist skirt" },
      { label: "街头牛仔裤", value: "street jeans" },
      { label: "战斗长裤", value: "battle ready pants" },
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
      { label: "武装侦探社套装", value: "armed detective set" },
      { label: "港口黑手党执行套", value: "port mafia enforcer set" },
      { label: "特务科督察服", value: "special division inspector set" },
      { label: "公会使节服", value: "guild envoy set" },
      { label: "天人五衰暗影套", value: "decay of angel conspirator" },
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
      { label: "羊毛风衣布", value: "wool trench fabric" },
      { label: "皮质枪套带", value: "leather holster straps" },
      { label: "丝绸内衬", value: "silk lined coat" },
      { label: "都市帆布", value: "urban canvas" },
      { label: "暗影织物", value: "shadow weave" },
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
      { label: "异能手册", value: "magic tome accessory" },
      { label: "能力手套", value: "ability gloves" },
      { label: "黑手党纹身", value: "mafia tattoo" },
      { label: "侦探笔记本", value: "detective notebook" },
      { label: "抑能手铐", value: "ability suppressor cuffs" },
      { label: "公会徽章别针", value: "guild crest pin" },
    ],
  },
  {
    title: "阵营",
    key: "bsd_affiliation",
    data: [
      { label: "武装侦探社", value: "armed detective agency" },
      { label: "港口黑手党", value: "port mafia" },
      { label: "异能特务科", value: "special division" },
      { label: "公会", value: "the guild" },
      { label: "天人五衰", value: "decay of angel" },
    ],
  },
];

const examples = [
  {
    image:
      "https://cdn.ocmaker.app/example/bungo-stray-dogs-oc-generated-1.webp",
    prompt:
      "1boy, messy black hair, heterochromia eyes, mysterious smile, armed detective agency outfit, brown coat, literary book accessory, ability activation pose, single character, upper body, looking at viewer, anime style, yokohama background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/bungo-stray-dogs-oc-generated-2.webp",
    prompt:
      "1girl, long silver hair, purple eyes, elegant expression, port mafia executive suit, black formal outfit with red accents, ability aura effects, confident stance, single character, upper body, looking at viewer, anime style, noir atmosphere",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/bungo-stray-dogs-oc-generated-3.webp",
    prompt:
      "1boy, short blonde hair, green eyes, gentle smile, guild member uniform, victorian-style outfit, pocket watch accessory, scholarly pose with book, single character, upper body, looking at viewer, anime style, library background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/bungo-stray-dogs-oc-generated-4.webp",
    prompt:
      "1girl, twin braids red hair, golden eyes, mischievous grin, decay of angels outfit, gothic lolita dress, supernatural ability effects, playful pose, single character, upper body, looking at viewer, anime style, mysterious background",
  },
];

export default {
  meta: {
    title: "文豪野犬 OC 角色生成器",
    description:
      "借助 AI 打造你的《文豪野犬》原创能力者，编织文学灵感、异能行动与阵营背景。",
  },
  series: "文豪野犬",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "文豪野犬 OC 生成器",
      description: "输入角色设定，即刻生成拥有文豪异能的横滨人物与视觉档案。",
    },
    step: {
      title: "如何打造文豪野犬 OC",
      description:
        "想加入横滨的异能战场？依照以下步骤设计你的侦探社英雄或黑手党王牌。",
      steps: [
        {
          title: "选择所属阵营",
          description:
            "先决定角色效力的组织：武装侦探社、港口黑手党、公会、天人五衰或政府异能特务科。不同阵营代表着截然不同的制服、信条与行动方式。",
        },
        {
          title: "设计异能与文学灵感",
          description:
            "构思基于文学作品或作者的异能名称与表现形式，同时描述外貌、性格与异能发动条件。加入引用或书名可让角色更具原著质感。",
        },
        {
          title: "生成你的异能者",
          description:
            "点击“生成角色”，即可获得多组 AI 设计，呈现 noir 氛围与超自然战斗风格，从中挑选最契合的版本。",
        },
      ],
    },
    examples: {
      title: "异能者示例",
      description:
        "浏览由 文豪野犬 OC 生成器 文字提示生成的文学能力者。",
      examples,
    },
    features: {
      title: "文豪野犬 OC 生成器 有何特别之处？",
      description:
        "此 OC 生成器 针对《文豪野犬》世界精调，帮助你打造具备阵营背景与文学主题的原创异能者。",
      features: [
        {
          label: "正统 BSD 画风",
          description:
            "从异能特效到阵营制服，生成的角色与原作 noir 气质与动作场景完美契合。",
        },
        {
          label: "阵营系统整合",
          description:
            "AI 理解各大阵营的服装与气质，确保角色仪态、细节与所属组织一致。",
        },
        {
          label: "文学异能构筑",
          description:
            "快速塑造以文学作品为灵感的能力者，适用于侦探任务、黑手党行动或政府作战。",
        },
        {
          label: "高质量动作视觉",
          description:
            "输出兼具悬疑与动作氛围的角色立绘，细腻表现异能释放的动态。",
        },
        {
          label: "多样能力变体",
          description: "每次生成提供多种风格，助你尝试不同阵营职责与战斗姿态。",
        },
        {
          label: "横滨世界观融入",
          description:
            "角色自然融入横滨的异能生态，具备真实的组织文化与文学引用。",
        },
      ],
    },
    faqs: {
      title: "常见问题",
      description: "还有疑问？欢迎来信 support@ocmaker.app",
      faqs: [
        {
          question: "什么是 文豪野犬 OC 生成器？如何运作？",
          answer:
            "文豪野犬 OC 生成器 是专为《文豪野犬》打造的 AI 工具。描述角色的异能、阵营与文学灵感后，系统会生成贴合原作风格的角色图像。",
        },
        {
          question: "如何让角色更像原作中的能力者？",
          answer:
            "请加入阵营制服、异能名称、文学出处与人际关系等细节。引用真实作者或作品能让设定更具说服力。",
        },
        {
          question: "可以免费使用吗？",
          answer:
            "可以。基础功能免费；若想要更快的生成速度或更多阵营与异能自定义选项，可升级方案。",
        },
        {
          question: "为何生成结果如此贴近原作？",
          answer:
            "系统针对《文豪野犬》的美术风格、阵营文化与异能表现进行调优，确保服装与氛围高度一致。",
        },
        {
          question: "生成的角色可以用于商用或同人吗？",
          answer:
            "可以！你在 文豪野犬 OC 生成器 中创建的原创角色归你所有，可用于小说、漫画或周边企划。",
        },
        {
          question: "需要账户才能使用吗？",
          answer:
            "基础模式无需注册；注册后可保存角色、查看生成记录并解锁更多 BSD 主题功能。",
        },
        {
          question: "能否创建不同阵营的角色？",
          answer:
            "当然！你可以设计侦探社成员、黑手党高层、公会特使或独行异能者，自由混搭文学灵感。",
        },
        {
          question: "未来会推出更多异能题材的 OC 生成器 吗？",
          answer:
            "会的！我们持续扩展以异能与文学为核心的主题，欢迎关注 ocmaker.app 的后续更新。",
        },
      ],
    },
    cta: {
      title: "唤醒你的文学异能",
      description:
        "无需绘画技能，只要描述即可加入横滨的超自然角力，创造独一无二的《文豪野犬》角色。",
      btns: {
        start: "开始创作",
        explore: "探索 OC 示例",
      },
    },
  },
};
