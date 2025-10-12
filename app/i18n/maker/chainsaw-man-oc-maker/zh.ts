const basePrompt = `
  WORLD CONTEXT:
  故事：《链锯人》
  背景概述：1990 年代末的日本被恶魔侵蚀，公安对魔特异课、地下组织与混合体在血腥黑色幽默中碰撞
  关键阵营：公安对魔特异课、特异课四处、民间恶魔猎人公司、残余黑社会、国际刺客团队、武器混合体、魔人

  OUTPUT FORMAT:
  姓名、所属阵营、契约恶魔或混合能力、标志性武器／形态、性格、终极欲望、悲剧背景

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "公安老兵",
    description: "为了仍仰赖她的新人，挣扎续战的四处幸存者。",
    prompt: `角色名称？
汐见怜奈

她的所属阵营？
公安对魔特异课东京四处

她与何种恶魔订下契约或具备何种混合能力？
与电磁炮恶魔订约，以听觉换取子弹轨迹

她的标志性武器或形态？
能发射恶魔弹的金属轨道护臂

她的性格？
嘴毒、疲惫，却极力保护鲁莽新人

驱动她的终极欲望？
想退休后履行对搭档的承诺，吃遍所有说好的拉面摊

分享她的悲剧背景。
曾为了歼灭僵尸群而启用电磁炮恶魔，耳朵炸裂后仍夜夜听见惨叫。`,
  },
  {
    title: "混合实验体",
    description: "非法制造的人类武器混合体，在寻找归属。",
    prompt: `角色名称？
原田隼

他的所属阵营？
独立行动的混合体，正被暗中监视

他与何种恶魔订下契约或具备何种混合能力？
与镜面恶魔混合，可复制反射中的存在

他的标志性武器或形态？
自前臂迸出的镜面链锯

他的性格？
疏离、好奇，总执着盯着他人的倒影

驱动他的终极欲望？
只想再看一次未被扭曲的自己

分享他的悲剧背景。
父母将他卖给黑帮，直到玛奇玛扫荡行动炸裂容器，他才逃出生天。`,
  },
  {
    title: "民间恶魔猎人",
    description: "靠诅咒直播赚钱的自由猎人。",
    prompt: `角色名称？
黑江美香

她的所属阵营？
独立恶魔猎人兼地下实况主

她与何种恶魔订下契约或具备何种混合能力？
与聚光灯恶魔订约，以匿名换取上镜时的无敌

她的标志性武器或形态？
直播每记挥击的刀锋无人机

她的性格？
浮夸、算计，却害怕被遗忘

驱动她的终极欲望？
成为全网最受欢迎的恶魔清除者

分享她的悲剧背景。
家人被注意力恶魔吞噬，她只能透过直播相信他们仍在看着自己。`,
  },
  {
    title: "国际刺客",
    description: "跨国接单、代价不问的冷血杀手。",
    prompt: `角色名称？
谢尔盖·科兹洛夫

他的所属阵营？
受雇至日本的俄罗斯国家刺客

他与何种恶魔订下契约或具备何种混合能力？
与雪原恶魔订约，以体温换取冰封之触

他的标志性武器或形态？
冰丝钢琴线与折叠冰斧

他的性格？
冷淡、专业，被幻痛寒意折磨

驱动他的终极欲望？
赚够钱赎回被国家控制的家人

分享他的悲剧背景。
家乡被冻成筹码后被迫服役，每执行一次任务，身躯就更冰冷。`,
  },
  {
    title: "恶魔权倡议者",
    description: "一边诉讼、暗中护送善良恶魔的辩护律师。",
    prompt: `角色名称？
七濑绫

她的所属阵营？
公设辩护人，暗中资助恶魔庇护所

她与何种恶魔订下契约或具备何种混合能力？
与赎罪恶魔订约，能吸收他人罪孽

她的标志性武器或形态？
从手腕伸出的赎罪锁链

她的性格？
富同理心、固执，对情感承受过量负担

驱动她的终极欲望？
建立保护和平恶魔的法律体系

分享她的悲剧背景。
为了合同而顶替妹妹服刑，如今夜夜重温几十起罪行噩梦。`,
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
      { label: "公安新人", value: "public safety recruit" },
      { label: "猎魔菜鸟", value: "devil hunter rookie" },
      { label: "特异课老将", value: "division veteran" },
      { label: "国际刺客", value: "international assassin" },
      { label: "混合体永生者", value: "demon hybrid timeless" },
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
      { label: "猎人瘦肌", value: "lean hunter build" },
      { label: "满身伤痕", value: "scarred enforcer build" },
      { label: "混合体体格", value: "hybrid physique" },
      { label: "游侠型", value: "athletic rogue build" },
      { label: "改造身躯", value: "augmented body" },
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
      { label: "狂放笑容", value: "playful grin" },
      { label: "咆哮怒容", value: "fierce snarl" },
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
      { label: "公安制服衬衫", value: "public safety shirt" },
      { label: "皮质猎魔夹克", value: "leather devil hunter jacket" },
      { label: "街头 T 恤", value: "casual street tee" },
      { label: "国际刺客西装", value: "international assassin suit" },
      { label: "链锯混合束带", value: "chainsaw hybrid harness" },
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
      { label: "血迹西裤", value: "bloodstained slacks" },
      { label: "战斗工装裤", value: "combat cargo pants" },
      { label: "破洞牛仔裤", value: "ripped jeans" },
      { label: "混合体护腿", value: "hybrid armor greaves" },
      { label: "刺客正装裤", value: "formal assassin trousers" },
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
      { label: "公安制服套装", value: "public safety uniform" },
      { label: "民间猎人套装", value: "private devil hunter set" },
      { label: "特异课四处套装", value: "special division 4 set" },
      { label: "国际刺客套装", value: "international assassin set" },
      { label: "链锯混合暴走", value: "chainsaw hybrid rampage" },
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
      { label: "防血布料", value: "bloodproof fabric" },
      { label: "恶魔皮革", value: "devil skin leather" },
      { label: "凯夫拉织材", value: "kevlar weave" },
      { label: "链锯护板", value: "chainsaw plating" },
      { label: "晨曦套装布", value: "sunrise suit cloth" },
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
      { label: "契约卷轴", value: "magic tome accessory" },
      { label: "链锯拉柄", value: "chainsaw pull cord" },
      { label: "恶魔契约护符", value: "devil contract charm" },
      { label: "血袋挎包", value: "blood bag satchel" },
      { label: "混合体口枷", value: "hybrid jaw muzzle" },
      { label: "公安徽章", value: "public safety badge" },
    ],
  },
  {
    title: "阵营倾向",
    key: "csm_alignment",
    data: [
      { label: "公安对魔", value: "public safety" },
      { label: "民间猎人", value: "private hunter" },
      { label: "恶魔", value: "devil" },
      { label: "混合体", value: "hybrid" },
      { label: "国际刺客", value: "international assassin" },
    ],
  },
];

const examples = [
  {
    image:
      "https://cdn.ocmaker.app/example/chainsaw-man-oc-maker-generated-1.webp",
    prompt:
      "1boy, messy black hair, sharp teeth grin, wild red eyes, chainsaw man style devil hunter uniform, blood splatter effects, chainsaw arms transformation hint, dark urban background, anime style, looking at viewer, simple background, upper body",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/chainsaw-man-oc-maker-generated-2.webp",
    prompt:
      "1girl, long dark hair, cold yellow eyes, stoic expression, chainsaw man style public safety suit, cigarette, devil contract markings, professional stance, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/chainsaw-man-oc-maker-generated-3.webp",
    prompt:
      "1girl, short pink hair, spiral eyes, unhinged smile, chainsaw man style casual outfit, devil features, blood on face, chaotic energy, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/chainsaw-man-oc-maker-generated-4.webp",
    prompt:
      "1boy, white hair, heterochromia eyes, mysterious expression, chainsaw man style hybrid form hints, torn clothing, devil hunter rookie, battle-ready pose, single character, upper body, looking at viewer, anime style, simple background",
  },
];

export default {
  meta: {
    title: "链锯人 OC 角色生成器",
    description:
      "借助 AI 打造你的《链锯人》原创角色，重现恶魔契约、混合体与血腥荒诞的世界观。",
  },
  series: "链锯人",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Chainsaw Man OC Maker",
      description:
        "输入角色设定，即刻生成贴合《链锯人》风格的猎魔人或恶魔形象。",
    },
    step: {
      title: "如何打造链锯人 OC",
      description:
        "只要依照下列步骤，就能让你的角色在血与火的链锯世界中存活。",
      steps: [
        {
          title: "描述角色与外观",
          description:
            "填写外貌与性格，加入公安制服、恶魔特征或失控笑容等元素，可更贴近链锯人的阴暗美学。",
        },
        {
          title: "补充恶魔／混合设定",
          description:
            "写出角色的阵营、契约恶魔、能力与代价，或是混合体形态与终极欲望，加深故事张力。",
        },
        {
          title: "生成并挑选设计",
          description:
            "点击“生成角色”，获得多组 AI 图像，从中挑选最能代表你猎魔人或恶魔的版本。",
        },
      ],
    },
    examples: {
      title: "链锯人角色示例",
      description:
        "浏览使用 Chainsaw Man OC Maker 文本提示生成的恶魔猎人样张。",
      examples,
    },
    features: {
      title: "Chainsaw Man OC Maker 的亮点",
      description:
        "此工具针对《链锯人》宇宙调校，助你迅速构建黑暗荒诞的角色设定。",
      features: [
        {
          label: "原汁原味的暗黑风格",
          description:
            "生成的角色带有链锯人特有的粗粝、血腥与黑色幽默氛围。",
        },
        {
          label: "契约与混合体系统",
          description:
            "支持公安、恶魔、混合体等多种阵营设定，让角色自然融入剧情。",
        },
        {
          label: "极速角色生成",
          description:
            "几秒内获得高品质图像，把时间留给编写残酷欲望与悲剧背景。",
        },
        {
          label: "细节丰富的视觉输出",
          description:
            "AI 会呈现血迹、链锯、诡异笑容等画面细节，满足同人创作需求。",
        },
        {
          label: "多样化形态选择",
          description:
            "每次生成提供多种姿态与造型，方便你探索不同的疯狂面貌。",
        },
        {
          label: "深度故事整合",
          description:
            "不仅生成图像，还能沿着悲剧往事、契约代价与终极欲望深化角色。",
        },
      ],
    },
    faqs: {
      title: "常见问题",
      description: "还有疑问？欢迎寄信至 support@ocmaker.app",
      faqs: [
        {
          question: "什么是 Chainsaw Man OC Maker？如何使用？",
          answer:
            "Chainsaw Man OC Maker 是针对《链锯人》世界打造的 AI 工具。描述角色、能力与欲望后，系统会生成暗黑风格的角色图像。",
        },
        {
          question: "怎样让角色更贴近《链锯人》？",
          answer:
            "描述中加入公安职位、恶魔契约代价、混合体特征或失控人格等细节，可让成品更具原作味道。",
        },
        {
          question: "可以免费使用吗？",
          answer:
            "可以。基础模式免费提供；若想更快生成或获得更多自定义，可升级方案。",
        },
        {
          question: "为何生成效果如此逼真？",
          answer:
            "我们针对链锯人的画风与世界观专门调校，让角色的服装、血迹与氛围都高度还原。",
        },
        {
          question: "生成的角色能用于商业企划吗？",
          answer:
            "当然可以！你使用 Chainsaw Man OC Maker 创作的原创角色归你所有，可自由运用于个人或商业项目。",
        },
        {
          question: "需要注册账户才能生成吗？",
          answer:
            "基本功能无需注册；注册后可保存角色、查看生成历史并解锁更多选项。",
        },
        {
          question: "可以重复微调同一角色吗？",
          answer:
            "可以。你可重复生成或调整提示，直到角色完全符合你的想象。",
        },
        {
          question: "未来还会推出其他暗黑题材的 OC Maker 吗？",
          answer:
            "会的！我们持续扩展动漫与暗黑世界主题，欢迎关注 ocmaker.app 的最新消息。",
        },
      ],
    },
    cta: {
      title: "打造你的猎魔人",
      description:
        "无需绘画技能，只要描述即可让原创角色在恶魔横行的世界中挥舞链锯。",
      btns: {
        start: "开始创作",
        explore: "探索角色示例",
      },
    },
  },
};
