const basePrompt = `
  WORLD CONTEXT:
  故事：《名侦探柯南》
  背景概述：东京都会的刑侦现场，少年侦探、国际特工与暗藏毒药的阴谋交织
  关键圈层：工藤新一与伙伴、毛利侦探事务所、警视厅搜查一课、黑衣组织、FBI/CIA、校园好友、怪盗基德事件

  OUTPUT FORMAT:
  姓名、掩护身份与职业、核心侦探技能、支援道具或盟友、性格、追查案件／宿敌、背景片段

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "幻影钢琴师",
    description: "潜伏为音乐老师、暗中支援柯南阵营的情报源。",
    prompt: `角色名称？
如月朝日

掩护身份与职业？
在帝丹小学代课的演奏会钢琴家

他倚重的核心侦探技能？
绝对音感解析声响线索与摩斯暗号

有哪些支援道具或盟友？
阿笠博士的音叉追踪器与步美传来的少年侦探团情报

他的性格？
温柔细腻，以幽默旋律掩饰紧张

驱动他的目标或宿敌？
揭开潜入交响乐团的黑衣组织成员身份

分享一段背景片段。
妹妹死于组织布下的毒杀节拍器，他借教职守护学生并搜集证据。`,
  },
  {
    title: "CIA 无声信使",
    description: "透过跑腿与耳语渗透组织的情报运送员。",
    prompt: `角色名称？
莉亚·摩根

掩护身份与职业？
双语咖啡师，向组织据点递送暗号饮品

她倚重的核心侦探技能？
反跟踪、唇语读取与快速伪装

有哪些支援道具或盟友？
FBI 的骆驼探员与调至柯南频段的手表通讯器

她的性格？
高效谨慎，口吻常带干涩的讽刺

驱动她的目标或宿敌？
追踪代号贝尔摩德，揭开最新的卧底名单

分享一段背景片段。
导师在纽约跟踪组织信使时失踪，她随即加入 CIA 延续调查。`,
  },
  {
    title: "菁英学院卧底",
    description: "伪装天才学生的少年，暗中搜集豪门罪证。",
    prompt: `角色名称？
佐藤隼平

掩护身份与职业？
都东学院荣誉部的奖学金生

他倚重的核心侦探技能？
过目不忘与极速解题推理

有哪些支援道具或盟友？
阿笠博士的领带微型相机与园子牵线的上流社交圈

他的性格？
彬彬有礼、机敏冷静，将怒火深藏心底

驱动他的目标或宿敌？
铲除利用孩子勒索政客的神秘勒索者

分享一段背景片段。
母亲因伪造证据被误判入狱，他潜入名流学校瓦解幕后伪造者。`,
  },
  {
    title: "大阪发明家",
    description: "为平次打造装备的关西系 gadget 天才。",
    prompt: `角色名称？
八神翼

掩护身份与职业？
电子社社长兼神社兼职巫男

他倚重的核心侦探技能？
证物保存与无线电定位

有哪些支援道具或盟友？
自制「鸦」侦察无人机、和叶的武术协助、平次的信任

他的性格？
豪爽热血，最爱戏剧化揭露犯人

驱动他的目标或宿敌？
月黑之夜现身、盗取国宝的幻影怪盗

分享一段背景片段。
为了守护被开发商盯上的神社钟声，打造第一件防护发明。`,
  },
  {
    title: "卧底偶像",
    description: "以星光吸引跟踪狂，从中揪出秘密实验的线索。",
    prompt: `角色名称？
相原美子

掩护身份与职业？
全国巡演的畅销偶像

她倚重的核心侦探技能？
万人演唱会的群体动线分析与舞台暗示植入

有哪些支援道具或盟友？
警视厅派驻保镖与灰原调校的化学侦测器

她的性格？
舞台上热情外放，私下沉静，为粉丝无所畏惧

驱动她的目标或宿敌？
挖出用粉丝做实验的制药财团

分享一段背景片段。
青梅竹马在神秘粉丝活动后失踪，她以偶像身份重返舞台渗透幕后黑手。`,
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
      { label: "小学神童", value: "elementary prodigy" },
      { label: "高中侦探", value: "high school sleuth" },
      { label: "大学侦探", value: "university detective" },
      { label: "青年搜查官", value: "young inspector" },
      { label: "资深特工", value: "veteran agent" },
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
      { label: "多功能外套", value: "utility jacket" },
      { label: "层叠大衣", value: "layered coat" },
      { label: "休闲束腰上衣", value: "casual tunic" },
      { label: "防护马甲", value: "armored vest" },
      { label: "宽松衬衫", value: "loose shirt" },
      { label: "连帽斗篷", value: "hooded cloak" },
      { label: "典礼长袍", value: "ceremonial robe" },
      { label: "帝丹校服外套", value: "teitan blazer" },
      { label: "毛利侦探风衣", value: "mouri detective coat" },
      { label: "FBI 战术夹克", value: "fbi field jacket" },
      { label: "黑衣组织西装", value: "black organization suit" },
      { label: "大阪休闲针织衫", value: "osaka casual cardigan" },
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
      { label: "校用短裤", value: "school shorts" },
      { label: "制服百褶裙", value: "pleated uniform skirt" },
      { label: "侦探长裤", value: "detective slacks" },
      { label: "卧底牛仔裤", value: "undercover jeans" },
      { label: "战术长裤", value: "tactical trousers" },
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
      { label: "帝丹学生服", value: "teitan student set" },
      { label: "少年侦探团郊游装", value: "detective boys field trip" },
      { label: "警视厅制服", value: "metropolitan police uniform" },
      { label: "黑衣组织套装", value: "black organization set" },
      { label: "CIA 卧底装", value: "cia undercover set" },
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
      { label: "制服斜纹", value: "uniform twill" },
      { label: "防水风衣布", value: "waterproof trench" },
      { label: "伪装层料", value: "disguise layering" },
      { label: "凯夫拉织材", value: "kevlar weave" },
      { label: "丝质领带", value: "silk tie" },
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
      { label: "侦探手册", value: "magic tome accessory" },
      { label: "变声领结", value: "bowtie voice changer" },
      { label: "麻醉手表", value: "wristwatch tranquilizer" },
      { label: "侦探徽章", value: "detective badge accessory" },
      { label: "护目耳机", value: "goggles headset" },
      { label: "情报耳麦", value: "espionage earpiece" },
    ],
  },
  {
    title: "阵营归属",
    key: "dc_allegiance",
    data: [
      { label: "少年侦探团", value: "detective boys" },
      { label: "警视厅", value: "metropolitan police" },
      { label: "黑衣组织", value: "black organization" },
      { label: "FBI／CIA", value: "fbi cia" },
      { label: "自由侦探", value: "freelance detective" },
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
    title: "名侦探柯南 OC 角色生成器",
    description:
      "借助 AI 打造你的《名侦探柯南》原创角色，重现推理氛围、卧底暗线与高智商对决。",
  },
  series: "名侦探柯南",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Detective Conan OC Maker",
      description: "输入角色设定，立即生成柯南风格的原创侦探与谍战档案。",
    },
    step: {
      title: "如何打造 Detective Conan OC",
      description: "两步就能让你的想法化作推理舞台上的关键角色。",
      steps: [
        {
          title: "描述角色基本资料",
          description:
            "填写角色的外貌、个性与掩护身份。若能加入侦探制服、校服或缜密头脑等柯南元素，结果会更贴切。",
        },
        {
          title: "补充侦探细节",
          description:
            "加入专属道具、调查技能，或与黑衣组织的牵连。越贴近柯南世界的谜团与对抗，生成结果越精彩。",
        },
        {
          title: "生成并完成设计",
          description:
            "点击“生成角色”，即可获得多张 AI 设定图，挑选最符合你设想的版本。",
        },
      ],
    },
    examples: {
      title: "柯南角色示例",
      description: "浏览由 Detective Conan OC Maker 生成的推理角色样张。",
      examples,
    },
    features: {
      title: "Detective Conan OC Maker 有何不同？",
      description: "此版本专为柯南宇宙调校，让角色立刻拥有经典推理作品的味道。",
      features: [
        {
          label: "原汁原味的侦探设计",
          description: "生成的角色可无缝融入柯南世界的破案、推理与日常喜剧。",
        },
        {
          label: "提示词精调",
          description: "从侦探装备到校服细节皆经过微调，帮助你构筑可信的角色。",
        },
        {
          label: "高速生成",
          description: "几秒内获得高品质图像，将时间留给案件设定与角色发展。",
        },
        {
          label: "高解析视觉输出",
          description: "依托先进 AI，生成结果细致，适合剧情创作或展示。",
        },
        {
          label: "多重造型选择",
          description: "每次生成提供多种方案，让你挑出最合适的外观与姿态。",
        },
        {
          label: "深度剧情整合",
          description: "延伸出背景事件、对手与同盟关系，让角色不只是一张图。",
        },
      ],
    },
    faqs: {
      title: "常见问题",
      description: "还有疑问？欢迎来信 support@ocmaker.app",
      faqs: [
        {
          question: "什么是 Detective Conan OC Maker？如何运作？",
          answer:
            "Detective Conan OC Maker 是专为柯南世界打造的 AI 工具。描述角色后，即可生成柯南风的动漫角色图像。",
        },
        {
          question: "如何让角色更像柯南角色？",
          answer: "请加入侦探技能、特务背景或黑衣组织线索等细节，越具体越好。",
        },
        {
          question: "可以免费使用吗？",
          answer:
            "可以。基础功能免费；若想加速生成或解锁更多自定义，可升级方案。",
        },
        {
          question: "生成效果为何如此出色？",
          answer: "系统针对柯南的画风与故事调性进行了微调，确保风格一致。",
        },
        {
          question: "生成的角色能用于商业用途吗？",
          answer:
            "可以！你在 Detective Conan OC Maker 创建的原创角色归你所有，可用于个人或商业项目。",
        },
        {
          question: "需要注册账户才可使用吗？",
          answer:
            "基础功能无需注册；注册后可保存角色、查看生成记录并解锁更多功能。",
        },
        {
          question: "能重复微调同一个角色吗？",
          answer: "当然可以。可用同一提示多次生成，或调整描述直到满意为止。",
        },
        {
          question: "还会推出其他动漫主题的 OC Maker 吗？",
          answer:
            "会的！我们持续扩充动漫主题的 OC Maker，敬请关注 ocmaker.app 的更新。",
        },
      ],
    },
    cta: {
      title: "创造你的柯南角色",
      description: "无需绘画技能，只要描述，即可让原创侦探加入推理现场。",
      btns: {
        start: "开始创作",
        explore: "探索角色示例",
      },
    },
  },
};
