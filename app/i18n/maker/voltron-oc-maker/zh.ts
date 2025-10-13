const basePrompt = `
  WORLD CONTEXT:
  故事：《战神金刚：传奇的保护神》
  背景概述：战神金刚联盟与加拉王国之间的星际战争，奥泰安科技， quintessence 能量狮，跨星系外交与抵抗组织
  关键元素：战神金刚骑士、马莫拉之刃、城堡号船员、奥泰安幸存者、联盟外交官、加拉反抗军、宇宙奇 fauna 与异象

  OUTPUT FORMAT:
  姓名、种族／阵营、驾驶的狮子或载具、战斗特长、代表装备或 quintessence 能力、性格、动机、背景速写

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "马莫拉暗影特工",
    description: "一位加拉与奥泰安混血的潜伏者，在帝国内部向战神金刚传递情报。",
    prompt: `角色名称？
塞琳·凯昂

所属种族或阵营？
马莫拉之刃的混血潜伏者

驾驶的狮子或载具？
个人改装的马莫拉隐形拦截机

战斗特长？
无声救援与影遁破坏行动

代表装备或 quintessence 能力？
带有能量抑制器的自适应马莫拉之刃

性格？
耐心、洞察力强，对解放星球极度忠诚

战争中的行动动机？
摧毁抹去他们族群的帝国，证明混血亦是力量

背景速写。
塞琳在吞噬兽的洞穴中长大，被马莫拉之刃救起，如今穿梭于帝国旗舰为皮吉与科利文传输机密。`,
  },
  {
    title: "联盟星际外交官",
    description: "曾经的地球飞行学员，如今为艾露拉在解放星系之间斡旋。",
    prompt: `角色名称？
陈麦雅

所属种族或阵营？
战神金刚联盟中的地球出生军官

驾驶的狮子或载具？
改装为外交用途的城堡号穿梭机

战斗特长？
防御性 quintessence 护罩与危机调解

代表装备或 quintessence 能力？
能够编织瞬时护盾的光场投影护臂

性格？
温暖、谋略周全，总是记录各族文化细节

战争中的行动动机？
重建星际信任并促成统一战线

背景速写。
科博洛斯任务失踪后，她离开飞行学院加入营救行动；如今在科兰的引擎支援下斡旋脆弱停火。`,
  },
  {
    title: "奥泰安 quintessence 治愈师",
    description: "继承奥泰安工程血脉，以能量治愈铠甲与骑士。",
    prompt: `角色名称？
艾瑞丝·维洛拉

所属种族或阵营？
驻留城堡号的奥泰安治疗师

驾驶的狮子或载具？
救援任务时偶尔与红狮共同出击

战斗特长？
前线修复与能量稳定支援

代表装备或 quintessence 能力？
能够重新分配能量的活体电路纹饰

性格？
共情力强、条理分明，在救人时格外固执

战争中的行动动机？
确保没有骑士或盟友因缺乏治愈而倒下

背景速写。
成长于欧瑞安德隐秘月球，随最后的奥泰安学者逃离，如今让战神金刚在战斗间隙迅速恢复。`,
  },
  {
    title: "加拉叛逃王牌",
    description: "目睹星球遭屠戮后背叛帝国的前指挥官。",
    prompt: `角色名称？
萨瑞克斯·扎亚尔

所属种族或阵营？
投向战神金刚联盟的加拉叛逃者

驾驶的狮子或载具？
重改装的加拉强袭战机“余烬之牙”

战斗特长？
远程火炮支援与指挥链破坏

代表装备或 quintessence 能力？
与回收 bayard 核心同步的双重引力炮

性格？
自律、冷幽默，被旧日命令折磨

战争中的行动动机？
解放被征服的星系，守护新船员免受旧帝国迫害

背景速写。
萨瑞克斯在奥卡里翁战役中自毁旗舰伪装阵亡，如今在希罗的指导下训练反抗舰队。`,
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
      { label: "奥泰安变形", value: "altean shapeshifter" },
    ],
  },
  {
    title: "种族",
    key: "species",
    data: [
      { label: "地球骑士", value: "earth human paladin" },
      { label: "奥泰安", value: "altean" },
      { label: "加拉人", value: "galra" },
      { label: "加拉混血", value: "half galra" },
      { label: "奥卡里人", value: "olkari" },
      { label: "巴尔梅兰人", value: "balmeran" },
      { label: "纳尔赫夫海民", value: "merfolk nalheve" },
      { label: "能量祭司", value: "quintessence druid" },
    ],
  },
  {
    title: "职责",
    key: "role",
    data: [
      { label: "黑狮骑士", value: "black lion paladin" },
      { label: "红狮骑士", value: "red lion paladin" },
      { label: "蓝狮骑士", value: "blue lion paladin" },
      { label: "绿狮骑士", value: "green lion paladin" },
      { label: "黄狮骑士", value: "yellow lion paladin" },
      { label: "MFE 飞行员", value: "mfe pilot" },
      { label: "马莫拉之刃特工", value: "blade of marmora agent" },
      { label: "联盟外交官", value: "coalition diplomat" },
      { label: "城堡号工程师", value: "castle of lions engineer" },
      { label: "加拉反抗指挥", value: "galra rebel captain" },
    ],
  },
  {
    title: "铠甲",
    key: "top",
    data: [
      { label: "传奇骑士铠甲", value: "paladin armor" },
      { label: "马莫拉潜行服", value: "marmora stealth suit" },
      { label: "奥泰安王室长袍", value: "altean royal robes" },
      { label: "联盟军官夹克", value: "coalition officer jacket" },
      { label: "地球加里森飞行服", value: "garrison flight suit" },
      { label: "加拉指挥铠", value: "galra commander armor" },
      { label: "奥卡里外骨骼", value: "olkari exo harness" },
      { label: "巴尔梅兰矿工装", value: "balmeran miner gear" },
    ],
  },
  {
    title: "下装",
    key: "bottom",
    data: [
      { label: "骑士护腿", value: "paladin greaves" },
      { label: "潜行紧身裤", value: "stealth leggings" },
      { label: "奥泰安礼饰板", value: "altean ceremonial panels" },
      { label: "联盟多功能裤", value: "coalition utility pants" },
      { label: "加里森工装裤", value: "garrison cargo pants" },
      { label: "加拉护裙", value: "galra armored tassets" },
      { label: "奥卡里科技缠带", value: "olkari tech wraps" },
      { label: "巴尔梅兰工作裤", value: "balmeran work trousers" },
    ],
  },
  {
    title: "鞋履",
    key: "footwear",
    data: [
      { label: "骑士战靴", value: "paladin boots" },
      { label: "磁锁战靴", value: "mag lock combat boots" },
      { label: "轻量飞行靴", value: "lightweight flight boots" },
      { label: "潜踪静音靴", value: "stealth tread soles" },
      { label: "奥泰安滑行凉鞋", value: "altean glide sandals" },
      { label: "加拉重力靴", value: "galra grav boots" },
      { label: "奥卡里藤蔓护具", value: "olkari vine braces" },
      { label: "巴尔梅兰岩靴", value: "balmeran stone boots" },
    ],
  },
  {
    title: "发型",
    key: "hair",
    data: [
      { label: "黑色短发", value: "short black hair" },
      { label: "白色奥泰安长发", value: "white Altean hair" },
      { label: "紫色加拉鬃", value: "purple galra hair" },
      { label: "青色能量挑染", value: "teal quintessence streak hair" },
      { label: "寸头", value: "buzz cut hair" },
      { label: "长辫发", value: "long braided hair" },
      { label: "卷曲棕发", value: "curly brown hair" },
      { label: "符纹削边", value: "shaved sides rune hair" },
    ],
  },
  {
    title: "眼睛",
    key: "eyes",
    data: [
      { label: "蓝眼", value: "blue eyes" },
      { label: "绿眼", value: "green eyes" },
      { label: "金眼", value: "gold eyes" },
      { label: "紫色光辉", value: "violet glowing eyes" },
      { label: "琥珀色", value: "amber eyes" },
      { label: "银色瞳", value: "silver eyes" },
      { label: "棕色瞳", value: "brown eyes" },
      { label: "全息虹膜", value: "holographic eyes" },
    ],
  },
  {
    title: "表情",
    key: "face",
    data: [
      { label: "自信微笑", value: "confident smile" },
      { label: "坚定目光", value: "determined glare" },
      { label: "温柔神情", value: "warm expression" },
      { label: "战术专注", value: "tactical focus expression" },
      { label: "沉稳谋士", value: "calm strategist expression" },
      { label: "战吼气势", value: "battle cry expression" },
      { label: "玩笑坏笑", value: "playful smirk" },
      { label: "守卫冷峻", value: "stoic guard expression" },
    ],
  },
  {
    title: "肤色",
    key: "skin",
    data: [
      { label: "白皙肤色", value: "fair skin" },
      { label: "暖棕肤色", value: "warm tan skin" },
      { label: "深棕肤色", value: "deep brown skin" },
      { label: "雀斑肤色", value: "freckled skin" },
      { label: "紫色加拉肤", value: "violet galra skin" },
      { label: "发光奥泰安肤", value: "luminescent altean skin" },
      { label: "奥卡里绿色", value: "olkari green skin" },
      { label: "巴尔梅兰纹理", value: "balmeran stone skin" },
    ],
  },
  {
    title: "配件",
    key: "accessory",
    data: [
      { label: "Bayard 武器", value: "bayard weapon" },
      { label: "马莫拉之刃", value: "marmora blade accessory" },
      { label: "奥泰安头环", value: "altean circlet" },
      { label: "加里森数据目镜", value: "garrison data visor" },
      { label: "quintessence 手甲", value: "quintessence gauntlet" },
      { label: "加拉披肩", value: "galra shoulder cape" },
      { label: "奥卡里无人机", value: "olkari drone companion" },
      { label: "联盟任务终端", value: "coalition mission tablet" },
    ],
  },
  {
    title: "场景",
    key: "voltron_setting",
    data: [
      { label: "城堡号舰桥", value: "castle of lions bridge" },
      { label: "加拉旗舰机库", value: "galra flagship hangar" },
      { label: "奥卡里光林", value: "olkari luminous forest" },
      { label: "巴尔梅兰水晶洞", value: "balmera crystal cavern" },
      { label: "外太空战斗", value: "space battle backdrop" },
      { label: "异星市集", value: "alien marketplace" },
      { label: "沙漠基地", value: "desert rebel base" },
      { label: "quintessence 风暴", value: "quintessence storm sky" },
    ],
  },
];

const examples = [
  {
    image: "https://cdn.ocmaker.app/results/um7x7B3BtXothPwyJKnio.png",
    prompt:
      "1girl, altean healer, teal glowing markings, white hair in braids, paladin armor with gold trim, bayard staff, warm expression, castle of lions bridge, sci-fi anime style, single character, upper body, looking at viewer",
  },
  {
    image: "https://cdn.ocmaker.app/results/4WeBAxlUGVVt1eTQdwmSf.png",
    prompt:
      "1boy, blade of marmora agent, purple galra skin, stealth suit, dual marmora blades, determined glare, neon blue backlighting, galra flagship hangar, sci-fi anime style, single character, upper body, looking at viewer",
  },
  {
    image: "https://cdn.ocmaker.app/results/209soG8lPRbIdh1nNQ8zS.png",
    prompt:
      "1person, coalition diplomat, brown skin, curly hair with teal streak, officer jacket, holographic tablet accessory, confident smile, alien marketplace, sci-fi anime style, single character, upper body, looking at viewer",
  },
  {
    image: "https://cdn.ocmaker.app/results/75IuA3yHcBI6E1WVkaRUG.png",
    prompt:
      "1boy, galra defector pilot, magenta armor, gold eyes, grav boots, tactical cape, blaster cannon, space battle backdrop, sci-fi anime style, single character, upper body, looking at viewer",
  },
];

export default {
  meta: {
    title: "战神金刚 OC 生成器",
    description:
      "借助 AI 即刻生成原创战神金刚骑士、马莫拉特工与星际盟友的形象与故事。",
  },
  series: "Voltron",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "战神金刚 OC 生成器",
      description:
        "描述角色的装备、狮子与能量天赋，AI 会瞬间呈现你的战神金刚骑士、治疗师或加拉叛军。",
    },
    step: {
      title: "如何打造战神金刚 OC",
      description: "按照这些步骤，塑造足以守护宇宙的全新角色。",
      steps: [
        {
          title: "勾勒角色设定",
          description:
            "说明种族、职责和标志性装备。写出他们驾驶的狮子或团队，以及左右他们的羁绊。",
        },
        {
          title: "加入 quintessence 细节",
          description:
            "突出独特能力、科技或仪式。提及铠甲配色、符纹或混血特征，引导图像风格。",
        },
        {
          title: "生成守护者",
          description:
            "点击“生成角色”，AI 会绘制战神金刚风格的精致立绘，并附上可延展的故事钩子。",
        },
      ],
    },
    examples: {
      title: "战神金刚角色示例",
      description:
        "浏览以文字提示生成的战神金刚角色，从骑士到外交官与王牌飞行员。",
      examples,
    },
    features: {
      title: "战神金刚 OC 生成器的优势",
      description: "无需绘画软件，即可快速构思守护宇宙的新英雄。",
      features: [
        {
          label: "贴合世界观的提示词",
          description:
            "预设适配骑士、马莫拉特工与联盟盟友，让角色自然融入剧情。",
        },
        {
          label: "聚焦铠甲与狮子配色",
          description:
            "通过狮子颜色、铠甲纹饰与能量特效，引导 AI 呈现地道的战神金刚视觉。",
        },
        {
          label: "即得故事灵感",
          description: "生成动机、宿敌与任务概述，直接用于桌游或同人创作。",
        },
        {
          label: "多版本候选图",
          description: "每次提示可获得多张设计，挑选最符合想象的那一位守护者。",
        },
        {
          label: "支持混血与盟友设定",
          description:
            "轻松组合奥泰安、加拉与地球特征，或创造来自奥卡里、巴尔梅兰的新伙伴。",
        },
        {
          label: "适合分镜与角色卡",
          description:
            "高质量图像可直接用于动画分镜、展示文档、cos 计划或角色档案。",
        },
      ],
    },
    faqs: {
      title: "常见问题",
      description: "需要更多协助？请联系 support@ocmaker.app",
      faqs: [
        {
          question: "战神金刚 OC 生成器是什么？",
          answer:
            "这是一个针对战神金刚世界观的 AI 工具，只需文字即可生成原创骑士与盟友的插画与背景。",
        },
        {
          question: "提示词需要多详细？",
          answer:
            "建议包含种族、阵营、铠甲颜色、武器与性格。提及狮子、能量能力或盟友，效果会更准确。",
        },
        {
          question: "能否制作非骑士角色？",
          answer:
            "当然可以！你可以创造马莫拉间谍、联盟外交官、加拉叛逃者，甚至新的狮子驾驶员。",
        },
        {
          question: "生成的角色归我所有吗？",
          answer:
            "是的。你拥有生成角色的使用权，可用于同人、桌游、cos 设计或个人企划。",
        },
        {
          question: "支持混血或改造设定吗？",
          answer: "支持。系统鼓励奥泰安-加拉混血、赛博改造与实验型能量科技。",
        },
        {
          question: "可以反复微调直到满意吗？",
          answer:
            "可以随意重新生成或调整提示词，并在 OC Maker 中收藏心仪设计。",
        },
      ],
    },
    cta: {
      title: "打造你的宇宙守护者",
      description:
        "写下他们的狮子、任务与装备——战神金刚 OC 生成器会完成剩下的视觉化工作。",
      btns: {
        start: "开始创作",
        explore: "探索角色",
      },
    },
  },
};
