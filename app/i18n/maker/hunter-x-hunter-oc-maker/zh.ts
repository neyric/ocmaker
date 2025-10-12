const basePrompt = `
  WORLD CONTEXT:
  故事：《全职猎人》
  背景概述：猎人协会任务、念能力战斗、艺术群岛、黑道地下、暗黑大陆传闻、嵌合蚁事变余波
  关键阵营：猎人协会、十二支、幻影旅团、黑道五大家族、NGL、加金王位继承战王子、嵌合蚁残存者、贪婪之岛玩家

  OUTPUT FORMAT:
  姓名、猎人身份／隶属、念能力系别、发（念能力）说明、性格、目标、经历片段

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "兽类猎人",
    description: "记录暗黑大陆新物种、倡导共存的正式猎人。",
    prompt: `角色名称？
妮娅拉·费尔德

猎人身份或隶属？
协会单星兽类猎人

念系别？
具现化系

发能力？
「猎香胶囊」能封存气味，随后定位任何生物

性格？
好奇无畏，极度重视生态平衡

目标？
证明人类与暗黑大陆生物可以共生

经历片段。
曾在嵌合蚁袭击中被神秘巨兽救下，因此立誓守护混血种。`,
  },
  {
    title: "黑道交涉猎人",
    description: "在流星街调停黑道势力的契约猎人。",
    prompt: `角色名称？
雷克斯·洛

猎人身份或隶属？
受黑道五大家族雇用的契约猎人

念系别？
操作系

发能力？
「正义操线」束缚目标迫使其供述事实

性格？
风度翩翩、策略周密、道德弹性大

目标？
摧毁供给旅团的黑市军火链

经历片段。
成长于流星街，因走私交易失手失去弟弟，如今以谈判保护居民。`,
  },
  {
    title: "贪婪之岛速通玩家",
    description: "靠念与游戏直播攻略遗迹的宝藏猎人。",
    prompt: `角色名称？
莉娜·字节

猎人身份或隶属？
双星宝藏猎人与职业实况主

念系别？
放出系

发能力？
「像素爆裂」可将卡片转化为能量构造

性格？
活力十足、好胜心强、喜欢炫技

目标？
开启传说中的贪婪之岛续作并搜集全部卡片

经历片段。
以直播潜入黑道金库且零伤亡获得猎人执照。`,
  },
  {
    title: "库尔塔档案员",
    description: "在追讨红眼间记录族史的幸存者。",
    prompt: `角色名称？
塞恩·库尔塔

猎人身份或隶属？
未取得执照，与酷拉皮卡情报网合作

念系别？
特质系

发能力？
「绯红账本」具现化锁链记录被窃红眼下落

性格？
沉静执着却富同情心

目标？
夺回拍卖会散落的最后几颗红眼

经历片段。
当年藏身密室才逃过屠杀，如今与酷拉皮卡交换情报替族人收尸。`,
  },
  {
    title: "NGL 疗愈者",
    description: "用念净化嵌合蚁残毒的改造医生。",
    prompt: `角色名称？
杜松·芮

猎人身份或隶属？
由凯特追随者资助的猎人见习生

念系别？
变化系

发能力？
「净化花雾」将毒素转化为无害孢子

性格？
耐心、共情力强、性格韧性高

目标？
重建 NGL，避免重蹈封闭极端的覆辙

经历片段。
父母死于毒品，她在蚁灾后研习念能力净化土地。`,
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
      { label: "猎人考试考生", value: "hunter exam applicant" },
      { label: "新晋猎人", value: "newly licensed hunter" },
      { label: "旅团年龄层", value: "phantom troupe age" },
      { label: "十二支资深", value: "zodiac veteran" },
      { label: "暗黑大陆探勘者", value: "dark continent explorer" },
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
      { label: "狡黠笑容", value: "playful grin" },
      { label: "怒吼神态", value: "fierce snarl" },
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
      { label: "护甲马甲", value: "armored vest" },
      { label: "宽松衬衫", value: "loose shirt" },
      { label: "连帽斗篷", value: "hooded cloak" },
      { label: "典礼长袍", value: "ceremonial robe" },
      { label: "猎人夹克", value: "hunter jacket" },
      { label: "旅团斗篷", value: "phantom cloak" },
      { label: "念修行服", value: "nen training tunic" },
      { label: "协会正装", value: "association suit" },
      { label: "加金考察大衣", value: "kakin expedition coat" },
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
      { label: "飘逸长袍", value: "flowing robes" },
      { label: "护甲护腿", value: "armored greaves" },
      { label: "层叠裹裙", value: "layered wraps" },
      { label: "战斗长裤", value: "combat slacks" },
      { label: "敏捷短裤", value: "agile shorts" },
      { label: "念专注长裤", value: "nen trousers" },
      { label: "探险打底裤", value: "explorer leggings" },
      { label: "理事会正装裤", value: "formal council pants" },
    ],
  },
  {
    title: "整套风格",
    key: "set",
    data: [
      { label: "战斗制服", value: "combat uniform" },
      { label: "旅途便装", value: "casual traveler outfit" },
      { label: "正式礼装", value: "formal attire" },
      { label: "潜行装备", value: "stealth gear" },
      { label: "节庆服饰", value: "festival outfit" },
      { label: "皇家礼服", value: "royal regalia" },
      { label: "游牧装束", value: "nomad attire" },
      { label: "猎人考试套装", value: "hunter exam set" },
      { label: "幻影旅团套装", value: "phantom troupe set" },
      { label: "协会十二支套装", value: "association zodiac set" },
      { label: "贪婪之岛套装", value: "greed island set" },
      { label: "暗黑大陆探险装", value: "dark continent expedition" },
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
      { label: "念反应布", value: "nen reactive cloth" },
      { label: "兽皮", value: "beast hide" },
      { label: "幻影丝", value: "phantom silk" },
      { label: "猎人徽章金属", value: "hunter badge metal" },
      { label: "贪婪之岛纤维", value: "greed island fiber" },
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
      { label: "念术手册", value: "magic tome accessory" },
      { label: "猎人执照", value: "hunter license" },
      { label: "念聚焦戒指", value: "nen focus ring" },
      { label: "锁链武器", value: "chain weapon" },
      { label: "兽笛", value: "beast whistle" },
      { label: "贪婪之岛卡组", value: "greed island cards" },
    ],
  },
  {
    title: "念系别",
    key: "nen_category",
    data: [
      { label: "强化系", value: "enhancer" },
      { label: "变化系", value: "transmuter" },
      { label: "放出系", value: "emitter" },
      { label: "具现化系", value: "conjurer" },
      { label: "操作系", value: "manipulator" },
      { label: "特质系", value: "specialist" },
    ],
  },
];

const examples = [
  {
    image:
      "https://cdn.ocmaker.app/example/hunter-x-hunter-oc-generated-1.webp",
    prompt:
      "1boy, spiky black hair with green tips, amber eyes, hunter exam participant, confident smirk, green jacket with shorts, backpack, enhancer aura visible, nen energy flowing, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/hunter-x-hunter-oc-generated-2.webp",
    prompt:
      "1girl, long silver hair in braid, purple eyes, blacklist hunter, serious expression, dark suit with hunter license visible, dual daggers, manipulator nen type, shadow aura, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/hunter-x-hunter-oc-generated-3.webp",
    prompt:
      "1boy, messy red hair, golden eyes with cat pupils, transmuter type, playful grin, casual streetwear, electricity nen ability, sparks around hands, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/hunter-x-hunter-oc-generated-4.webp",
    prompt:
      "1girl, short blue hair with headband, green eyes, beast hunter, cheerful expression, safari outfit with khaki vest, conjurer nen type, summoned creature beside, single character, upper body, looking at viewer, anime style, simple background",
  },
];

export default {
  meta: {
    title: "全职猎人 OC 角色生成器",
    description:
      "借助 AI 打造你的《全职猎人》原创角色，设定念能力、猎人身份与冒险目标。",
  },
  series: "全职猎人",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Hunter x Hunter OC Maker",
      description:
        "输入角色设定，即刻生成冨樫风格的猎人角色与资料。",
    },
    step: {
      title: "如何打造猎人 OC",
      description:
        "三个步骤，创造专属念能力者。",
      steps: [
        {
          title: "描述外貌与猎人身份",
          description:
            "填写外观、服装与所属组织，例如猎人协会、旅团或黑道家族，让角色融入原作世界。",
        },
        {
          title: "设定念系与发能力",
          description:
            "说明角色的念能力系别、发的能力与限制条件，越具体越贴近原作的能力逻辑。",
        },
        {
          title: "生成你的猎人",
          description:
            "点击“生成角色”即可得到多种冨樫风格图像，挑选最符合念能力设定的版本。",
        },
      ],
    },
    examples: {
      title: "猎人角色示例",
      description:
        "浏览使用 Hunter x Hunter OC Maker 生成的原创猎人。",
      examples,
    },
    features: {
      title: "Hunter x Hunter OC Maker 的特色",
     	description:
        "专注念能力系统，帮助你快速塑造平衡又独特的猎人角色。",
      features: [
        {
          label: "还原冨樫画风",
          description:
            "角色线条、穿着与气场贴合原作的硬派漫画风格。",
        },
        {
          label: "念能力体系整合",
          description:
            "AI 理解六大念系与制约誓约机制，协助打造合理的发能力。",
        },
        {
          label: "极速角色生成",
          description:
            "数秒即可取得高品质角色图像，留出时间撰写任务与战斗剧情。",
        },
        {
          label: "细致角色档案",
          description:
            "除了外观还可延伸猎人执照、目标与组织关系，组成完整档案。",
        },
        {
          label: "多样化设计",
          description:
            "每次生成提供不同服装、光圈与气场，帮助你演绎更多念能力构想。",
        },
        {
          label: "世界观融合",
          description:
            "角色自然融入猎人协会、黑道五大家族、旅团或暗黑大陆探险等剧情线。",
        },
      ],
    },
    faqs: {
      title: "常见问题",
      description: "还有疑问？欢迎写信至 support@ocmaker.app",
      faqs: [
        {
          question: "什么是 Hunter x Hunter OC Maker？如何运作？",
          answer:
            "这是专为《全职猎人》打造的 AI 工具。描述角色的外貌、念系与发能力后，即可生成贴近冨樫画风的图像。",
        },
        {
          question: "如何让念能力更贴近原作逻辑？",
          answer:
            "请设置系别、能力效果与制约誓约，并说明使用条件与代价。",
        },
        {
          question: "可以免费使用吗？",
          answer:
            "可以。基础功能免费；升级方案可加速生成并解锁更多造型选项。",
        },
        {
          question: "为什么生成结果这么像冨樫老师的风格？",
          answer:
            "系统针对《全职猎人》的线条、阴影与服装细节进行训练，呈现真实漫画质感。",
        },
        {
          question: "生成的角色可以用于同人或商业吗？",
          answer:
            "当然可以！你用 Hunter x Hunter OC Maker 创作的角色归你所有，可用于同人、RPG 或商业企划。",
        },
        {
          question: "需要注册账户才能保存角色吗？",
          answer:
            "基础使用无需账号；注册后可保存角色、查看历史生成并解锁更多功能。",
        },
        {
          question: "能创建不同阵营或特殊种族吗？",
          answer:
            "可以！可自由设计猎人协会、旅团、暗黑大陆探险者，甚至嵌合蚁混血等设定。",
        },
        {
          question: "未来会推出更多战斗系动漫的 OC Maker 吗？",
          answer:
            "会的！我们持续扩展战斗与冒险类题材，欢迎关注未来更新。",
        },
      ],
    },
    cta: {
      title: "成为猎人协会的一员",
      description:
        "无需绘画技能，只要描述，即可让原创猎人与念能力跃然纸上。",
      btns: {
        start: "开始创作",
        explore: "探索角色示例",
      },
    },
  },
};
