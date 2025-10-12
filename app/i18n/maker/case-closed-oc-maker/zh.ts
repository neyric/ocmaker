const basePrompt = `
  WORLD CONTEXT:
  故事：《名侦探柯南》
  背景概述：现代日本的犯罪现场，高中生侦探、潜伏组织与法证调查交织
  关键圈层：少年侦探团、大阪搭档、东都警视厅、黑衣组织、FBI/CIA 协作团队、阿笠博士的道具支援

  OUTPUT FORMAT:
  姓名、职业／侦探身份、标志性调查技能、使用的工具或装置、性格、正在追查的谜题、背景片段

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "高中名侦探",
    description: "在学业与命案之间来回奔走的天才侦探。",
    prompt: `角色名称？
森冈和叶

职业或侦探身份？
协助东都警视厅的高中侦探

她依赖的标志性调查技能？
敏锐观察、演绎推理与易容技巧

有哪些工具或装置辅佐她？
搭载太阳能与录音功能的 AR 眼镜

她的性格？
认真、守时，偶尔自信过头

推动她的持续谜题？
誓言揪出针对补习班连环爆炸案的幕后主谋

分享一段背景片段。
十三岁时透过茶叶颜色差异破解首宗毒杀案。`,
  },
  {
    title: "法证博主",
    description: "将网络声量化为受害者正义的实况主。",
    prompt: `角色名称？
立花美奈

职业或侦探身份？
自由法证顾问兼犯罪实况博主

她依赖的标志性调查技能？
数位足迹追踪与化学残留分析

有哪些工具或装置辅佐她？
伪装成行动电池的便携式光谱仪

她的性格？
毒舌、精明，对消息来源极度保护

推动她的持续谜题？
调查殉职记者父亲遗留下的悬案

分享一段背景片段。
借直播拆解证据打脸腐败调查官，因而声名大噪。`,
  },
  {
    title: "大阪国际联络员",
    description: "在国际情报与地方刑警之间架起桥梁。",
    prompt: `角色名称？
黑田大地

职业或侦探身份？
派驻大阪府警的国际刑警联络官

他依赖的标志性调查技能？
跨国嫌犯侧写与多语审讯

有哪些工具或装置辅佐他？
可连线国际刑警数据库的加密袖扣

他的性格？
沉着，笑点极低，鲜少动怒

推动他的持续谜题？
追缉横跨大阪与米兰的珠宝盗团

分享一段背景片段。
自幼往返日义两地，学会读懂不同文化的犯罪网络。`,
  },
  {
    title: "小学侦探",
    description: "少年侦探团负责 Gadgets 的小天才。",
    prompt: `角色名称？
小林莉香

职业或侦探身份？
少年侦探团的道具担当

她依赖的标志性调查技能？
微型无人机侦查与飞速整理线索

有哪些工具或装置辅佐她？
仿造博士灵感的背包，内藏三台可折叠无人机

她的性格？
好奇、活泼，对犯罪现场毫不胆怯

推动她的持续谜题？
寻找在魔术表演中失踪的哥哥

分享一段背景片段。
加入少年侦探团前，她曾入侵魔术道具系统找出犯人藏身处。`,
  },
  {
    title: "卧底管家",
    description: "潜入豪门庄园的伪装侦探。",
    prompt: `角色名称？
东雾雅人

职业或侦探身份？
伪装成驻家管家的私家侦探

他依赖的标志性调查技能？
指纹采集、贵族礼仪渗透与无声格斗

有哪些工具或装置辅佐他？
连接自制 AI 助手的单片眼镜相机

他的性格？
彬彬有礼、事无巨细，暗藏冷冽讽刺

推动他的持续谜题？
调查家族航运公司连环失踪案

分享一段背景片段。
曾任警视厅机动队，为被忽视的上流受害者寻求真相而转行。`,
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
      { label: "小学侦探", value: "elementary detective" },
      { label: "国中侦探", value: "junior high sleuth" },
      { label: "高中名侦探", value: "high school detective" },
      { label: "青年搜查官", value: "young inspector" },
      { label: "老练搜查官", value: "seasoned investigator" },
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
      { label: "校服西装外套", value: "school uniform blazer" },
      { label: "侦探风衣", value: "detective trench coat" },
      { label: "休闲针织背心", value: "casual sweater vest" },
      { label: "警用风衣", value: "police windbreaker" },
      { label: "伪装连帽衫", value: "disguise hoodie" },
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
      { label: "剪裁西裤", value: "tailored slacks" },
      { label: "侦探百褶裙", value: "pleated detective skirt" },
      { label: "休闲牛仔裤", value: "casual jeans" },
      { label: "侦探短裤", value: "detective shorts" },
      { label: "正式长裤", value: "formal trousers" },
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
      { label: "少年侦探团探险装", value: "detective boys explorer set" },
      { label: "大阪侦探制服", value: "osaka detective set" },
      { label: "警视厅套装", value: "metropolitan police set" },
      { label: "私家侦探事务所装", value: "private detective office set" },
      { label: "卧底伪装套", value: "undercover disguise set" },
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
      { label: "舒适棉", value: "comfort cotton" },
      { label: "防水尼龙", value: "waterproof nylon" },
      { label: "皮质枪套", value: "leather holster" },
      { label: "格纹羊毛", value: "plaid wool" },
      { label: "防闪里料", value: "flashproof lining" },
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
      { label: "侦探笔记", value: "magic tome accessory" },
      { label: "变声领结", value: "voice changing bowtie" },
      { label: "侦探徽章", value: "detective badge" },
      { label: "麻醉手表", value: "watch stun gadget" },
      { label: "放大镜", value: "magnifying lens" },
      { label: "伪装眼镜", value: "disguise glasses" },
    ],
  },
];

const examples = [
  {
    image: "https://cdn.ocmaker.app/example/aot-oc-generated-1.webp",
    prompt:
      "1boy, long gold hair, silver eyes, attack on titan style survey corps uniform, cape, dual swords, battle pose, determined expression, looking at viewer, simple background, upper body",
  },
  {
    image: "https://cdn.ocmaker.app/example/aot-oc-generated-2.webp",
    prompt:
      "1girl, long silver hair, red eyes, attack on titan style survey corps uniform, cape, dual swords, battle pose, determined expression, looking at viewer, simple background, upper body, masterpiece, best quality, very aesthetic, absurdres",
  },
  {
    image: "https://cdn.ocmaker.app/example/aot-oc-generated-3.webp",
    prompt:
      "1boy, long gold hair, silver eyes, attack on titan style survey corps uniform, cape, dual swords, battle pose, determined expression, looking at viewer, simple background, upper body",
  },
  {
    image: "https://cdn.ocmaker.app/example/aot-oc-generated-4.webp",
    prompt:
      "1boy, long gold hair, silver eyes, attack on titan style survey corps uniform, cape, dual swords, battle pose, determined expression, looking at viewer, simple background, upper body",
  },
  {
    image: "https://cdn.ocmaker.app/example/aot-oc-generated-5.webp",
    prompt:
      "1girl, medium length black hair, sharp amber eyes, serious expression, attack on titan style uniform, tactical harness, dark brown jacket, white pants, leather boots, standing in wind, looking at viewer, simple background, upper body",
  },
  {
    image: "https://cdn.ocmaker.app/example/aot-oc-generated-6.webp",
    prompt:
      "1girl, long red hair, brown eyes, attack on titan style survey corps uniform, cape, dual swords, standing pose, determined expression, looking at viewer, simple background, upper body",
  },
  {
    image: "https://cdn.ocmaker.app/example/aot-oc-generated-7.webp",
    prompt:
      "1boy, messy silver hair, gray eyes, brooding expression, Attack on Titan style elite uniform, long coat, standing confidently, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/aot-oc-generated-8.webp",
    prompt:
      "1girl, silver white twin braids, violet eyes, cat ears, melancholic and sharp expression, attack on titan style black and red skintight battle suit, survey corps emblem, glowing dual chakrams, magical weapon, standing pose, simple background, upper body",
  },
];

export default {
  meta: {
    title: "柯南 OC 角色生成器",
    description:
      "借助 AI 打造你的《名侦探柯南》原创角色，结合推理背景、道具与经典侦探氛围。",
  },
  series: "名侦探柯南",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Case Closed OC Maker",
      description:
        "输入角色设定，立刻生成柯南风格的原创侦探与故事档案。",
    },
    step: {
      title: "如何打造柯南 OC",
      description:
        "只需两步，即能让你的角色自然融入充满悬疑的柯南世界。",
      steps: [
        {
          title: "描述角色基本资料",
          description:
            "填写外貌、性格与身份。若能提及校服、侦探风衣或推理头脑等柯南元素，将更贴近原作氛围。",
        },
        {
          title: "补充侦探细节",
          description:
            "加入专属道具、调查技能或关联案件。越贴近柯南的推理节奏，生成结果越精准动人。",
        },
        {
          title: "生成并挑选造型",
          description:
            "点击“生成角色”，即可获得多张 AI 设定图，挑选最符合你想法的版本完成角色。",
        },
      ],
    },
    examples: {
      title: "柯南风角色示例",
      description:
        "浏览由 Case Closed OC Maker 生成的推理角色样张。",
      examples,
    },
    features: {
      title: "Case Closed OC Maker 有何特色？",
      description:
        "此版本针对《名侦探柯南》调校，让你的角色瞬间拥有经典推理作品的味道。",
      features: [
        {
          label: "正统柯南角色设计",
          description:
            "生成的角色忠实再现柯南世界的推理精神，可自然嵌入犯罪、侦查与校园生活。",
        },
        {
          label: "专属提示调优",
          description:
            "提示词针对侦探装备、校服与推理场景微调，帮助你打造更可信的角色。",
        },
        {
          label: "高速角色生成",
          description:
            "几秒内即可得到高品质设定图，将精力留给案件构思与角色塑造。",
        },
        {
          label: "高解析视觉输出",
          description:
            "依托先进 AI 模型，生成的角色细致呈现，适合故事创作或分享。",
        },
        {
          label: "一次多种选择",
          description:
            "每次生成都会提供多张方案，让你挑选最合心意的风格。",
        },
        {
          label: "深度剧情整合",
          description:
            "不只图像，还能延伸案件线索、侦探背景与人际关系，让角色更鲜活。",
        },
      ],
    },
    faqs: {
      title: "常见问题",
      description: "还有疑问？欢迎来信 support@ocmaker.app",
      faqs: [
        {
          question: "什么是 Case Closed OC Maker？如何运作？",
          answer:
            "Case Closed OC Maker 是专为柯南世界打造的 AI 工具。描述角色后，系统会依据提示生成柯南风的动漫角色图像。",
        },
        {
          question: "如何让角色更像柯南角色？",
          answer:
            "请描述侦探技能、正式服装或案件关联。细节越鲜明，输出越精准。",
        },
        {
          question: "可以免费使用吗？",
          answer:
            "可以。基础功能免费；若想更快生成或解锁更多自定义选项，可升级方案。",
        },
        {
          question: "为何生成结果如此出色？",
          answer:
            "我们针对柯南的画风与侦探题材进行调优，确保角色与原作氛围一致。",
        },
        {
          question: "生成的角色能用于商用吗？",
          answer:
            "当然可以！你用 Case Closed OC Maker 创作的角色归你所有，可用于个人或商业项目。",
        },
        {
          question: "需要注册账户才能使用吗？",
          answer:
            "基础使用不需注册；注册后可保存角色、查看生成纪录并解锁更多功能。",
        },
        {
          question: "能反覆微调同一角色吗？",
          answer:
            "可以。可重复使用同一提示或调整输入，直到角色符合你的愿景。",
        },
        {
          question: "未来还会有其他动漫主题的 OC Maker 吗？",
          answer:
            "会的！我们持续扩充动漫主题的 OC Maker，欢迎关注 ocmaker.app。",
        },
      ],
    },
    cta: {
      title: "创造你的柯南角色",
      description:
        "无需绘画技能，只要描述即可让原创侦探现身推理舞台。",
      btns: {
        start: "开始创作",
        explore: "探索角色示例",
      },
    },
  },
};
