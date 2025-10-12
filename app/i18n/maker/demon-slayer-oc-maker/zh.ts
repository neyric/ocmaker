const basePrompt = `
  WORLD CONTEXT:
  故事：《鬼灭之刃》
  背景概述：大正时代的日本，鬼杀队与十二鬼月交锋，日轮刀与呼吸法交织，血鬼术暗潮汹涌
  关键阵营：柱、鬼杀队队员、上弦与下弦、鬼舞辻无惨势力、刀匠村、隐部支援、暗中庇护鬼族者

  OUTPUT FORMAT:
  姓名、鬼杀队阶级或鬼阵营、呼吸法／血鬼术、武器或战斗风格、性格、目标、悲剧背景

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "雷之柱继承者",
    description: "出自善逸传承的神童，以雷霆之刃制敌。",
    prompt: `角色名称？
日向小夜

所属阶级或阵营？
鬼杀队雷之柱候补

她掌握的呼吸法或血鬼术？
雷之呼吸·第七型「地平断」

她偏好的武器或战斗方式？
双持日轮短刀，挥舞时伴随霹雳闪光

她的性格？
寡言，却在危机时迅捷如雷，肩负使命

促使她前行的目标？
在师父退休前继承雷之柱之名

分享她的悲剧背景。
故乡山村被魔暴风吞没，只剩远方的雷声回应她的哭喊。`,
  },
  {
    title: "雾之医疗士",
    description: "以雾障守护同伴、同时展开救护的支援队员。",
    prompt: `角色名称？
藤本明里

所属阶级或阵营？
鬼杀队医护编制的庚级队士

她掌握的呼吸法或血鬼术？
在雾之呼吸中融入药草疗法的派生招式

她偏好的武器或战斗方式？
可折叠的长枪，喷洒化作雾气的疗愈药剂

她的性格？
温柔沉稳，以笑容掩饰焦虑

促使她前行的目标？
让战场伤亡在她负责的区域归零

分享她的悲剧背景。
曾在鬼伏击中失去整队，靠陌生人遗留的药包得以存活。`,
  },
  {
    title: "叛逃鬼学者",
    description: "化身鬼族的前学者，暗中保存人类典籍。",
    prompt: `角色名称？
佃田玄黑

所属阶级或阵营？
寻求救赎的上弦叛徒

他掌握的呼吸法或血鬼术？
血鬼术「墨狱迷宫」，以文字编织束缚

他偏好的武器或战斗方式？
爪尖化作毛笔，于空中书写封缚文字

他的性格？
愧疚、冷静，竭力避免杀戮

促使他前行的目标？
整理鬼族弱点，暗中送交鬼杀队

分享他的悲剧背景。
曾被迫吞噬研究伙伴，现潜藏于书库留下暗号提醒队士。`,
  },
  {
    title: "兽之勇士",
    description: "受山灵庇护的野性战士，挥舞獠牙之刃。",
    prompt: `角色名称？
青森雷兽

所属阶级或阵营？
在伊之助指导下修行的继子

他掌握的呼吸法或血鬼术？
兽之呼吸·第六牙「嶺裂」

他偏好的武器或战斗方式？
以野猪獠牙钢锻造的锯齿双刀

他的性格？
粗犷豪放，却对自然有敏锐直觉

促使他前行的目标？
守护曾庇护他免遭鬼害的山林

分享他的悲剧背景。
父母被鬼斩尽后，由野猪抚养长大，靠模仿行商才学会人言。`,
  },
  {
    title: "日之呼吸档案家",
    description: "踏遍神社寻找日之呼吸残篇的历史学者。",
    prompt: `角色名称？
杏寿郎惠美

所属阶级或阵营？
受鬼杀队托付秘闻的文官同盟

她掌握的呼吸法或血鬼术？
以祭祀舞蹈重现记录中的日之呼吸型

她偏好的武器或战斗方式？
刻有祖先符文的扇刃

她的性格？
博学坚定，心怀炽烈信念

促使她前行的目标？
在无惨余影复苏前，复原全部日之呼吸

分享她的悲剧背景。
身为炼狱家远亲，族谱与藏书被鬼火焚毁后立誓重建档案。`,
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
      { label: "见习队士", value: "trainee slayer" },
      { label: "现役队员", value: "active corps member" },
      { label: "柱级实力", value: "hashira level" },
      { label: "幼鬼", value: "demon youth" },
      { label: "古老之鬼", value: "ancient demon" },
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
      { label: "敏捷剑士", value: "agile swordsman build" },
      { label: "鬼化强化", value: "demon enhanced build" },
      { label: "柱级肌肉", value: "hashira muscular build" },
      { label: "舞者体态", value: "elegant dancer build" },
      { label: "轻巧杂技", value: "compact acrobat build" },
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
      { label: "多功能外套", value: "utility jacket" },
      { label: "层叠大衣", value: "layered coat" },
      { label: "休闲束腰上衣", value: "casual tunic" },
      { label: "防护马甲", value: "armored vest" },
      { label: "宽松衬衫", value: "loose shirt" },
      { label: "连帽斗篷", value: "hooded cloak" },
      { label: "典礼长袍", value: "ceremonial robe" },
      { label: "鬼杀队羽织", value: "demon slayer haori" },
      { label: "图纹羽织", value: "patterned haori" },
      { label: "柱级斗篷", value: "hashira cloak" },
      { label: "鬼族和服", value: "demon kimono" },
      { label: "刀匠村袍", value: "swordsmith robe" },
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
      { label: "袴裤", value: "hakama trousers" },
      { label: "鬼族长裙", value: "flowing demon skirt" },
      { label: "战斗打底裤", value: "battle leggings" },
      { label: "藤花纹裤", value: "wisteria pants" },
      { label: "传统足袋裤", value: "traditional tabi pants" },
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
      { label: "鬼杀队标准套", value: "standard demon slayer corps" },
      { label: "柱级礼装", value: "hashira regalia" },
      { label: "上弦鬼造型", value: "upper moon demon set" },
      { label: "刀匠工匠装", value: "swordsmith artisan set" },
      { label: "蝶屋敷医护", value: "butterfly estate healer" },
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
      { label: "藤花内衬", value: "wisteria lined fabric" },
      { label: "呼吸锻织", value: "breath infused weave" },
      { label: "鬼甲鳞片", value: "demon armor scales" },
      { label: "柱级丝料", value: "hashira silk" },
      { label: "耐火羽织布", value: "fireproof haori cloth" },
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
      { label: "日轮刀", value: "nichirin sword" },
      { label: "呼吸法围巾", value: "breathing style scarf" },
      { label: "鎹鸦", value: "kasugai crow" },
      { label: "鬼角饰物", value: "demon horn adornment" },
      { label: "藤花护符", value: "wisteria charm" },
    ],
  },
  {
    title: "阵营归属",
    key: "ds_allegiance",
    data: [
      { label: "鬼杀队", value: "demon slayer corps" },
      { label: "柱", value: "hashira" },
      { label: "刀匠村", value: "swordsmith village" },
      { label: "鬼族", value: "demon" },
      { label: "前鬼族", value: "former demon" },
    ],
  },
];

const examples = [
  {
    image: "https://cdn.ocmaker.app/example/demon-slayer-oc-generateds-1.webp",
    prompt:
      "1girl, black hair with red tips, violet eyes, demon slayer uniform, haori jacket, katana sword, determined expression, breathing technique effects, looking at viewer, simple background, upper body",
  },
  {
    image: "https://cdn.ocmaker.app/example/demon-slayer-oc-generateds-2.webp",
    prompt:
      "1boy, silver hair, blue eyes, demon slayer corps uniform, water breathing effects, katana, focused stance, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/demon-slayer-oc-generateds-3.webp",
    prompt:
      "1girl, auburn hair in ponytail, golden eyes, demon slayer outfit, flame breathing pattern, nichirin blade, fierce expression, combat pose, looking at viewer, simple background, upper body",
  },
  {
    image: "https://cdn.ocmaker.app/example/demon-slayer-oc-generateds-4.webp",
    prompt:
      "1boy, dark green hair, brown eyes, demon slayer uniform, stone breathing technique, heavy sword, stoic expression, defensive stance, looking at viewer, anime style, simple background, upper body",
  },
];

export default {
  meta: {
    title: "鬼灭之刃 OC 角色生成器",
    description:
      "借助 AI 打造你的《鬼灭之刃》原创队士，设计呼吸法、日轮刀与血鬼术战斗。",
  },
  series: "鬼灭之刃",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "鬼灭之刃 OC 生成器",
      description: "输入角色设定，即刻生成鬼杀队风格的剑士与鬼族造型。",
    },
    step: {
      title: "如何打造鬼灭之刃 OC",
      description: "锻造一名鬼杀队士同样艰辛，跟着步骤，为你的角色谱写宿命。",
      steps: [
        {
          title: "选择呼吸法",
          description:
            "设定角色的呼吸流派：水、炎、雷、岩、风或原创派生。呼吸法将影响战斗姿态与特效呈现。",
        },
        {
          title: "描绘外貌与装备",
          description:
            "描述制服、羽织纹样、日轮刀颜色与战斗伤痕，也可以加入专属饰品或标记。",
        },
        {
          title: "生成专属鬼杀队士",
          description:
            "点击“生成角色”，从多张 AI 设计中挑选最契合的一位，正式踏入鬼杀队战场。",
        },
      ],
    },
    examples: {
      title: "鬼杀队示例",
      description: "浏览使用 鬼灭之刃 OC 生成器 文本提示生成的强大战士。",
      examples,
    },
    features: {
      title: "鬼灭之刃 OC 生成器 的特色",
      description: "专为鬼灭世界优化，协助你打造拥有呼吸法与日轮刀的原创角色。",
      features: [
        {
          label: "原作级美术风格",
          description:
            "角色造型与呼吸特效贴合动画质感，从制服细节到战斗动作都真实可信。",
        },
        {
          label: "呼吸法表现力",
          description: "AI 理解各呼吸法的视觉语言，确保能力与气势完整呈现。",
        },
        {
          label: "极速角色生成",
          description: "数秒获取高质量图像，把时间留给撰写训练历程与战斗史。",
        },
        {
          label: "战斗就绪的视觉",
          description: "产出高解析战斗立绘，适合用在同人剧本、小说或角色卡。",
        },
        {
          label: "多重呼吸变体",
          description:
            "每次生成都会提供不同姿势与武器设计，探索更多战斗可能性。",
        },
        {
          label: "大正时代氛围",
          description:
            "角色造型兼顾时代服饰、鬼杀队要素与鬼族美学，轻松融入原作世界。",
        },
      ],
    },
    faqs: {
      title: "常见问题",
      description: "还有疑问？欢迎寄信至 support@ocmaker.app",
      faqs: [
        {
          question: "什么是 鬼灭之刃 OC 生成器？怎么用？",
          answer:
            "鬼灭之刃 OC 生成器 是专为《鬼灭之刃》打造的 AI 工具。描述呼吸法、外貌与背景后，系统会生成对应风格的角色图像。",
        },
        {
          question: "如何让角色更像鬼灭世界的战士？",
          answer:
            "请描述日轮刀颜色、羽织图案、呼吸招式与战斗伤痕，并加入鬼杀队或鬼族的细节。",
        },
        {
          question: "可以免费使用吗？",
          answer:
            "可以。基础功能免费；若想要更快速度、进阶呼吸特效与更多自定义，可升级方案。",
        },
        {
          question: "为什么生成结果这么真实？",
          answer:
            "我们针对鬼灭的美术风格与时代氛围进行调优，确保制服、特效与角色神态都符合原作。",
        },
        {
          question: "生成的角色可以商用吗？",
          answer:
            "可以！你用 鬼灭之刃 OC 生成器 创作的原创角色归你所有，可用于个人或商业计划。",
        },
        {
          question: "需要注册账户才能使用吗？",
          answer:
            "基础功能不必注册；注册后可保存角色、查看生成历史并解锁更多呼吸法效果。",
        },
        {
          question: "能重复调整同一角色吗？",
          answer: "可以。重复生成或修改提示，直到角色完全符合你的设想。",
        },
        {
          question: "未来会推出更多动作动漫的 OC 生成器 吗？",
          answer:
            "会的！我们持续拓展动作与超自然题材，欢迎关注 ocmaker.app 的最新消息。",
        },
      ],
    },
    cta: {
      title: "锻造你的鬼杀队士",
      description:
        "无需绘画技能，只要描述，即可让原创角色挥舞日轮刀加入讨鬼之战。",
      btns: {
        start: "开始创作",
        explore: "探索 OC 示例",
      },
    },
  },
};
