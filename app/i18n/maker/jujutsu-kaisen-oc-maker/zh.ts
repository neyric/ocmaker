const basePrompt = `
  WORLD CONTEXT:
  故事：《咒术回战》
  背景概述：现代日本的咒灵事件、东京／京都咒术高专、名门师族、死灭回游、特级灾咒
  关键阵营：五条班学生、禅院家、加茂家、狗卷家系、咒灵师团体、夏油杰派系、咒术总监部、转生古咒术师

  OUTPUT FORMAT:
  姓名、咒术等阶／所属、术式名称、领域展开／简单领域、性格、契约缚或弱点、经历片段

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "东京二年级生",
    description: "用墨流描绘战场的东京学生。",
    prompt: `角色名称？
墨井光

咒术等阶与所属？
东京咒术高专二年级，二级术师

术式名称？
「墨流术式」操控咒墨形成移动式结印

领域展开或结界？
领域展开「黑潮画廊」让敌人困于轮转墨海

性格？
热情活泼，对同学忠诚

契约缚或弱点？
战斗中吟出俳句可倍增威力，但音节错误即失控

经历片段。
在祖母画廊遭咒袭时继承古墨笔而觉醒。`,
  },
  {
    title: "禅院离反者",
    description: "以玻璃碎刃反击宗家的自由术师。",
    prompt: `角色名称？
禅院千香

咒术等阶与所属？
半一级术师，脱离禅院家独行动

术式名称？
「碎镜军械」具现玻璃短刃并偏转弹道

领域展开或结界？
简单领域「镜面座敷」三倍反射攻势

性格？
冷静谋略家，对家族政争心怀怒火

契约缚或弱点？
禁止先手攻击，被击中后反击威力加倍

经历片段。
拒绝背叛真希而逃离，现协助惠拆解禅院权力。`,
  },
  {
    title: "京都导师",
    description: "以歌声守护学生的京都讲师。",
    prompt: `角色名称？
青叶旬

咒术等阶与所属？
京都校一级术师兼讲师

术式名称？
「护唱」以音律中和敌方术式

领域展开或结界？
结界「圣歌穹顶」增幅结界内友军术式

性格？
沉稳慈父型，喜欢冷笑话

契约缚或弱点？
先护住平民时结界强度增倍，否则易碎

经历片段。
合唱团遭咒灵屠杀后，将歌声献给守护他人的工作。`,
  },
  {
    title: "死灭回游浪人",
    description: "操控天气在结界中生存的参与者。",
    prompt: `角色名称？
林田伶

咒术等阶与所属？
流浪于各殖民地的一级术师

术式名称？
「雷针」召唤局部雷霆

领域展开或结界？
领域「风暴牢笼」以风雨电流束缚敌人

性格？
躁动、勇敢，守护被困民众

契约缚或弱点？
若不喊出对方全名，雷击会消耗自身体力

经历片段。
为救弟弟主动进入死灭回游，以解除术师之战换取积分。`,
  },
  {
    title: "咒骸研究者",
    description: "与冥冥合作、将咒灵化为标本的术师科学家。",
    prompt: `角色名称？
古贺博士

咒术等阶与所属？
与冥冥合作的二级分析术师

术式名称？
「解剖之瞳」瞬间看穿咒灵弱点

领域展开或结界？
结界术「手术剧场」在刃影范围内拖慢时间

性格？
理性务实，带点冷幽默

契约缚或弱点？
须将收入一成捐给孤儿术师，违约即失去结界

经历片段。
医学院实习时遭咒灵侵袭，被冥冥救下后专精解体咒灵。`,
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
      { label: "东京一年级", value: "tokyo first year" },
      { label: "京都二年级", value: "kyoto second year" },
      { label: "咒术准一级", value: "semi grade one sorcerer" },
      { label: "特级门槛", value: "special grade threshold" },
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
      { label: "辫发", value: "braided hair" },
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
      { label: "挑衅笑容", value: "playful grin" },
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
      { label: "结界羽织", value: "ceremonial robe" },
      { label: "东京校制服", value: "tokyo uniform" },
      { label: "京都校制服", value: "kyoto uniform" },
      { label: "咒术战斗服", value: "battle tunic" },
      { label: "咒灵师披风", value: "curse user cloak" },
      { label: "死灭回游斗篷", value: "culling game coat" },
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
      { label: "飘逸袍裙", value: "flowing robes" },
      { label: "护甲护腿", value: "armored greaves" },
      { label: "层叠裹裙", value: "layered wraps" },
      { label: "制服裤", value: "uniform slacks" },
      { label: "咒灵师长裤", value: "curse user pants" },
      { label: "死灭护腿", value: "culling leggings" },
      { label: "战术束脚裤", value: "tactical joggers" },
      { label: "祭祀袴裤", value: "ritual hakama" },
    ],
  },
  {
    title: "整套风格",
    key: "set",
    data: [
      { label: "战斗制服", value: "combat uniform" },
      { label: "巡逻便装", value: "casual traveler outfit" },
      { label: "正式礼装", value: "formal attire" },
      { label: "潜行装备", value: "stealth gear" },
      { label: "节庆服饰", value: "festival outfit" },
      { label: "王室礼服", value: "royal regalia" },
      { label: "游牧装束", value: "nomad attire" },
      { label: "东京高专套装", value: "tokyo jujutsu set" },
      { label: "京都高专套装", value: "kyoto jujutsu set" },
      { label: "咒灵师套装", value: "curse user set" },
      { label: "死灭回游套装", value: "culling game set" },
      { label: "特级术师套装", value: "special grade set" },
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
      { label: "咒纹布", value: "curse embroidery" },
      { label: "咒钢网", value: "sorcery mesh" },
      { label: "灵膜纤维", value: "spirit membrane fiber" },
      { label: "防诅咒皮革", value: "anti curse leather" },
      { label: "死灭织物", value: "culling weave" },
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
      { label: "术式卷轴", value: "magic tome accessory" },
      { label: "高专徽章", value: "jujutsu badge" },
      { label: "术式手套", value: "technique glove" },
      { label: "咒符护身", value: "charm talisman" },
      { label: "术师通信器", value: "sorcerer comms" },
      { label: "死灭计分器", value: "culling counter" },
    ],
  },
];

const examples = [
  {
    image: "https://cdn.ocmaker.app/example/jujutsu-kaisen-oc-generated-1.webp",
    prompt:
      "1boy, short black hair, intense brown eyes, tokyo jujutsu high uniform, cursed energy aura, confident pose, modern tokyo background, anime style, single character, upper body, looking at viewer",
  },
  {
    image: "https://cdn.ocmaker.app/example/jujutsu-kaisen-oc-generated-2.webp",
    prompt:
      "1girl, pink hair tied in bun, green eyes, kyoto uniform, cursed fan weapons, barrier technique effect, single character, upper body, looking at viewer, anime style, traditional temple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/jujutsu-kaisen-oc-generated-3.webp",
    prompt:
      "1boy, silver hair, red eyes, casual combat outfit, curse user vibe, dark alley setting, cursed energy sparks, single character, upper body, looking at viewer, anime style",
  },
  {
    image: "https://cdn.ocmaker.app/example/jujutsu-kaisen-oc-generated-4.webp",
    prompt:
      "1girl, blue hair, yellow eyes, culling game attire, lightning cursed energy, dynamic pose, battle damaged buildings, single character, upper body, looking at viewer, anime style",
  },
];

export default {
  meta: {
    title: "咒术回战 OC 角色生成器",
    description:
      "借助 AI 打造你的《咒术回战》原创术师，设定术式、领域与契约缚。",
  },
  series: "咒术回战",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "咒术回战 OC 生成器",
      description: "输入角色设定，即刻生成充满咒力的原创术师形象。",
    },
    step: {
      title: "如何打造 JJK OC",
      description: "按照以下步骤，让你的角色踏入咒术世界的诡谲战场。",
      steps: [
        {
          title: "描绘术师身份",
          description:
            "写出角色的外貌、所属学派与等级。可加入东京／京都高专制服、禅院家纹等细节。",
        },
        {
          title: "设定术式与领域",
          description:
            "为角色规划术式、领域展开或简易领域，并明确契约缚与弱点，让能力更贴近原作规则。",
        },
        {
          title: "生成你的术式战斗",
          description:
            "点击“生成角色”后，即可得到多种 AI 设计，挑选最具咒力感的版本记录进角色档案。",
        },
      ],
    },
    examples: {
      title: "术师示例",
      description: "浏览由 咒术回战 OC 生成器 生成的原创术师与咒灵猎人。",
      examples,
    },
    features: {
      title: "咒术回战 OC 生成器 有何特色？",
      description: "本工具专为《咒术回战》打造，强调术式逻辑与暗黑现代感。",
      features: [
        {
          label: "咒力视觉还原",
          description: "角色在构图、服饰与能量特效上都贴合原作的现代阴郁风。",
        },
        {
          label: "术式系统整合",
          description:
            "提示词针对术式、领域、契约缚与弱点做优化，帮助你构筑平衡的能力组合。",
        },
        {
          label: "快速生成",
          description: "几秒即可看到角色成品，立即投入剧情创作或战斗规划。",
        },
        {
          label: "高解析角色图",
          description: "输出的立绘细节丰富，可用作人设图、战斗卡或同人绘参考。",
        },
        {
          label: "多种时代与阵营",
          description:
            "无论是高专学生、咒灵师抑或死灭回游参赛者，都能轻松呈现。",
        },
        {
          label: "完整档案延伸",
          description:
            "除了图像，可同步撰写背景、誓约限制与咒具，建立完整术师档案。",
        },
      ],
    },
    faqs: {
      title: "常见问题",
      description: "还有疑问？欢迎寄信至 support@ocmaker.app",
      faqs: [
        {
          question: "咒术回战 OC 生成器 是什么？",
          answer:
            "这是专为《咒术回战》世界打造的 AI 工具。描述角色即可生成符合原作调性的术师插画。",
        },
        {
          question: "如何让术式更贴合原作？",
          answer:
            "请设置术式来源、使用条件与契约缚，并说明领域展开或简易领域的限制。",
        },
        {
          question: "可以免费使用吗？",
          answer:
            "可以。基础模式免费开放；升级方案可加快生成并提供更多造型选项。",
        },
        {
          question: "生成的成品能用于同人创作吗？",
          answer:
            "当然可以！你创作的角色完全归你所有，可用于同人漫画、文字或角色扮演。",
        },
        {
          question: "需要注册账号才能保存角色吗？",
          answer:
            "基础使用无需注册；注册后可保存角色、查看生成历史并解锁更多功能。",
        },
        {
          question: "能否创造不同阵营的角色？",
          answer:
            "可以！无论是高专术师、咒灵师、死灭回游参赛者或古代转生术师，都可自由组合。",
        },
        {
          question: "未来还会推出其他黑暗奇幻题材的 OC 生成器 吗？",
          answer:
            "会的！我们持续扩充咒术、超自然与都市奇幻题材，敬请关注更新。",
        },
      ],
    },
    cta: {
      title: "展开你的咒术战斗",
      description:
        "无需绘画技能，只要描述，即可看见原创术师挥洒咒力、守护或摧毁现代都市。",
      btns: {
        start: "开始创作",
        explore: "探索角色",
      },
    },
  },
};
