const basePrompt = `
  WORLD CONTEXT:
  故事：《葬送的芙莉莲》
  背景概述：魔王时代落幕后的旅途，重建的王国、长寿的精灵、遗留的魔物威胁与古老魔法
  关键元素：勇者传说、一级魔法使考试、北境之旅、教会审查、策略派恶魔、满载遗物的废墟

  OUTPUT FORMAT:
  姓名、种族与寿命、魔法专长、旅伴或所属队伍、性格、核心遗憾／目标、旅途剪影

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "千年记录者",
    description: "为留住法术而与时间赛跑的精灵编史者。",
    prompt: `角色名称？
阿尔西娅·莉希尔

种族与寿命？
精灵魔法使，尚有七百年寿命

擅长的魔法？
以记忆锚定法将法术寄存于水晶典籍

旅伴或所属队伍？
与矮人地理师和年轻的人类档案员同行

她的性格？
温柔、常恍神、饱含怀旧情绪

核心遗憾或目标？
记录勇者小队所施展过的每一道法

旅途剪影。
当年为抄写法术错过希梅尔的最后庆祝，如今重访旧废墟，向他致敬。`,
  },
  {
    title: "悔恨的勇士",
    description: "在人生暮年追逐与导师失落时光的人类剑士。",
    prompt: `角色名称？
基甸·哈特

种族与寿命？
人类老兵，寿命将至

擅长的魔法？
由芙莉莲习得的剑气强化术

旅伴或所属队伍？
与被收养的恶魔先知和一名祭司同行

他的性格？
沉稳内敛，偶尔幽默

核心遗憾或目标？
重走与芙莉莲并肩作战的战场，为当年的离开道歉

旅途剪影。
曾为守护故乡离开勇者队伍，几十年后归来，只剩老去或离世的伙伴。`,
  },
  {
    title: "恶魔史学家",
    description: "记述人类善意、试图动摇旧教条的恶魔学者。",
    prompt: `角色名称？
塞莉卡

种族与寿命？
恶魔，寿命与吸收魔力相关

擅长的魔法？
破解幻术与映照情感的魔法

旅伴或所属队伍？
独行，但与芙莉莲以魔法信件往来

她的性格？
轻柔谨慎，对未来抱有小心翼翼的希望

核心遗憾或目标？
记录人类展现仁慈的瞬间，证明恶魔亦能共存

旅途剪影。
一次冲突中被菲伦饶恕，从此立誓以文字回报这份仁德。`,
  },
  {
    title: "流浪弟子",
    description: "沿着芙莉莲考试足迹试炼自己的魔法徒弟。",
    prompt: `角色名称？
米菈·菲尔德

种族与寿命？
人类魔法使，靠停滞咒延长寿命

擅长的魔法？
融入自然精灵的结界术

旅伴或所属队伍？
带着附魔狐精灵与一名沉默战士同行

她的性格？
坚决勤学，却有点笨拙可爱

核心遗憾或目标？
仅凭旅途学来的法术通过一级魔法使考试

旅途剪影。
曾在考试中受芙莉莲鼓励，如今以教授陌生人法术回报善意。`,
  },
  {
    title: "远古司祭",
    description: "通过新友重拾信仰的百年圣职者。",
    prompt: `角色名称？
卡勒姆修士

种族与寿命？
受女神祝福而缓慢老化的人类

擅长的魔法？
以吟唱符文放大神迹

旅伴或所属队伍？
常与旅诗人与孤儿院照护者同行

他的性格？
温厚宽恕，却背负沉重往事

核心遗憾或目标？
重建被魔王之战摧毁的神殿

旅途剪影。
当年教团只剩他一人，芙莉莲曾造访残破修道院，唤醒他再度上路的勇气。`,
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
      { label: "年轻学徒", value: "young apprentice" },
      { label: "流浪魔法使", value: "wandering mage" },
      { label: "长寿精灵", value: "longevous elf" },
      { label: "历战勇士", value: "seasoned warrior" },
      { label: "远古贤者", value: "ancient sage" },
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
      { label: "精灵斗篷", value: "elven cloak" },
      { label: "魔法师束腰", value: "mage tunic" },
      { label: "圣职外衣", value: "holy order surcoat" },
      { label: "旅者披肩", value: "traveler shawl" },
      { label: "北境毛皮大衣", value: "northern fur coat" },
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
      { label: "层叠袍裙", value: "layered robes" },
      { label: "寻迹者裙摆", value: "seeker skirts" },
      { label: "远行打底裤", value: "trekker leggings" },
      { label: "圣职长裤", value: "holy order pants" },
      { label: "雪境长裤", value: "snowbound trousers" },
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
      { label: "节庆服饰", value: "festival outfit" },
      { label: "皇家礼服", value: "royal regalia" },
      { label: "游牧装束", value: "nomad attire" },
      { label: "勇者余响套装", value: "hero party echo set" },
      { label: "一级魔法使套装", value: "first class mage set" },
      { label: "恶魔学者套装", value: "demon scholar set" },
      { label: "旅者说书套装", value: "traveling storyteller set" },
      { label: "巡礼司祭装", value: "cleric pilgrim set" },
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
      { label: "风化亚麻", value: "weathered linen" },
      { label: "精灵丝绸", value: "elven silk" },
      { label: "符纹刺绣", value: "rune embroidery" },
      { label: "毛皮内衬", value: "fur lined" },
      { label: "抗魔织物", value: "magic resistant cloth" },
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
      { label: "魔法书", value: "magic tome accessory" },
      { label: "魔导书", value: "spell grimoire" },
      { label: "魔法杖", value: "mage staff" },
      { label: "灵魂背包", value: "soul knapsack" },
      { label: "精灵耳饰", value: "elf ear cuffs" },
      { label: "勇者挂饰", value: "hero pendant" },
    ],
  },
];

const examples = [
  {
    image: "https://cdn.ocmaker.app/example/frieren-oc-maker-generated-1.webp",
    prompt:
      "1boy, silver hair, golden eyes, dwarf warrior, beard, serious expression, frieren style heavy armor, battle axe, defensive stance, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/frieren-oc-maker-generated-2.webp",
    prompt:
      "1girl, pink hair in twin tails, purple eyes, young mage apprentice, cheerful smile, frieren style academy uniform, spell book, magical sparkles, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/frieren-oc-maker-generated-3.webp",
    prompt:
      "1boy, short brown hair, blue eyes, human warrior, determined expression, frieren style armor, sword and shield, adventurer outfit, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/frieren-oc-maker-generated-4.webp",
    prompt:
      "1girl, long white hair, green eyes, elf ears, serene expression, frieren style mage robes, wooden staff, magical aura, fantasy medieval setting, anime style, looking at viewer, simple background, upper body",
  },
];

export default {
  meta: {
    title: "葬送的芙莉莲 OC 角色生成器",
    description:
      "借助 AI 打造你的《葬送的芙莉莲》原创角色，书写跨越岁月的魔法旅程。",
  },
  series: "葬送的芙莉莲",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "葬送的芙莉莲 OC 生成器",
      description: "输入角色设定，即刻生成带有永恒旅途氛围的奇幻图像与故事。",
    },
    step: {
      title: "如何打造 Frieren OC",
      description: "打造芙莉莲风格角色很简单，跟随以下步骤，让时间的故事苏醒。",
      steps: [
        {
          title: "描绘角色轮廓",
          description:
            "填写外貌与性格，加入精灵特征、年代感织物或静谧气质，更贴近芙莉莲的世界。",
        },
        {
          title: "补充魔法与羁绊",
          description:
            "描述魔法专长、种族寿命、旅伴与与时间相关的遗憾或目标，使角色更具深度。",
        },
        {
          title: "生成旅途伙伴",
          description:
            "点击“生成角色”，多张 AI 设计会呈现角色在旅途中的剪影，挑选最触动你的版本。",
        },
      ],
    },
    examples: {
      title: "芙莉莲 OC 示例",
      description: "浏览由 葬送的芙莉莲 OC 生成器 文字提示生成的旅者与魔法使。",
      examples,
    },
    features: {
      title: "葬送的芙莉莲 OC 生成器 的特色",
      description:
        "此版本针对《葬送的芙莉莲》细致调校，让角色兼具温柔与岁月沉淀。",
      features: [
        {
          label: "正统奇幻画风",
          description: "角色神态与服饰贴近原作的静谧幻想美学。",
        },
        {
          label: "时间主题融合",
          description:
            "AI 理解寿命差距、遗憾与记忆等核心主题，让角色自然带出时光感。",
        },
        {
          label: "快速灵感实现",
          description: "数秒便能看到角色成形，将心力留给故事与旅程的描写。",
        },
        {
          label: "高解析温柔视觉",
          description: "产出细腻的奇幻图像，适合用在小说、剧本或角色手册。",
        },
        {
          label: "多样旅途造型",
          description:
            "每次生成提供不同服饰与年龄感，探索角色生命中的各段时光。",
        },
        {
          label: "深度故事整合",
          description:
            "延展出与勇者传说、一级考试或恶魔共存的联系，丰富角色背景。",
        },
      ],
    },
    faqs: {
      title: "常见问题",
      description: "还有疑问？欢迎写信至 support@ocmaker.app",
      faqs: [
        {
          question: "什么是 葬送的芙莉莲 OC 生成器？如何运作？",
          answer:
            "葬送的芙莉莲 OC 生成器 是为《葬送的芙莉莲》世界打造的 AI 工具。描述角色后，即可生成贴近原作风格的奇幻图像。",
        },
        {
          question: "如何让角色更像芙莉莲的世界？",
          answer: "可加入长寿设定、魔法专长、旅行伙伴与时间主题的情感细节。",
        },
        {
          question: "可以免费使用吗？",
          answer: "可以。基础功能免费；升级方案可加速生成并解锁更多自订选项。",
        },
        {
          question: "为何生成效果如此细腻？",
          answer:
            "系统针对芙莉莲的画面质感与情绪氛围进行训练，确保角色兼具静谧与深情。",
        },
        {
          question: "生成的角色能商用吗？",
          answer:
            "可以！你通过 葬送的芙莉莲 OC 生成器 创作的原创角色归你所有，可用于个人或商业用途。",
        },
        {
          question: "需要注册账户才能使用吗？",
          answer: "不必。注册后可保存角色、查看生成历史，并解锁更多功能。",
        },
        {
          question: "能反覆调整同一角色吗？",
          answer: "可以。可重复生成或调整描述，直到角色完美呈现你的想法。",
        },
        {
          question: "未来还会推出其他奇幻主题的 OC 生成器 吗？",
          answer: "会的！我们持续拓展奇幻与冒险题材，欢迎关注 ocmaker.app。",
        },
      ],
    },
    cta: {
      title: "启程你的魔法旅伴",
      description: "无需绘画技能，只要描述，就能让原创角色踏上横跨百年的旅途。",
      btns: {
        start: "开始创作",
        explore: "探索 OC 示例",
      },
    },
  },
};
