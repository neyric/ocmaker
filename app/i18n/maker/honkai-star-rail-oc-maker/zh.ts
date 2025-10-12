const basePrompt = `
  WORLD CONTEXT:
  故事：《崩坏：星穹铁道》
  背景概述：星穹列车的旅程、星神的哲理、席卷各星球的星核危机，如雅利洛-VI、仙舟罗浮、匹诺康尼
  关键阵营：星穹列车、星核猎手、仙舟联盟、星际和平公司、贝洛伯格派系、回忆之庭等

  OUTPUT FORMAT:
  姓名、命途属性、战斗定位与元素、标志技能／终结技、旅途同伴／羁绊、性格、旅程剪影

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "罗浮云击手",
    description: "驾驭云骑舰队的弓手，守护贸易航道。",
    prompt: `角色名称？
月铃

她的命途？
巡猎

战斗定位与元素？
风属性单体输出

标志技能或终结技？
战技「苍穹连箭」追射空中盗匪

旅途同伴或羁绊？
与炼金狐人技师搭档

性格？
敢闯敢拼、幽默，将危险视作一场舞蹈

旅程剪影。
家族舰队遭星盗袭击后加入云骑卫，如今护送货船穿梭星海。`,
  },
  {
    title: "贝洛伯格调解者",
    description: "和谐命途的热情传播者，为地底带来温暖。",
    prompt: `角色名称？
安雅·沃尔科娃

她的命途？
同谐

战斗定位与元素？
火属性增益辅保护盾

标志技能或终结技？
终结技「余烬共鸣」赋予护盾与攻击强化

旅途同伴或羁绊？
与希露瓦为挚友，常一同演奏

性格？
乐观共情，从不放弃团结

旅程剪影。
永冬之后，她以合奏曲让上城与地底再度对话，促成停火。`,
  },
  {
    title: "星核猎手分析师",
    description: "替卡芙卡调查星核情报的情报专家。",
    prompt: `角色名称？
赛弗

他的命途？
虚无

战斗定位与元素？
雷属性减抗与扩散

标志技能或终结技？
战技「熵流冲击」降低敌人抗性并扩散感电

旅途同伴或羁绊？
与银狼透过加密游戏互通数据

性格？
调皮神秘，痴迷数据

旅程剪影。
曾是雅利洛-VI 的企业情报员，得知猎手真正使命后叛逃加入。`,
  },
  {
    title: "星穹列车药师",
    description: "在车厢培育回忆之庭植株的治愈者。",
    prompt: `角色名称？
莉菈

她的命途？
丰饶

战斗定位与元素？
量子元素治疗与净化

标志技能或终结技？
终结技「绽放憩苑」回复生命并净化减益

旅途同伴或羁绊？
照料玉衡赠予的有灵盆栽

性格？
温柔淡然，偶尔打趣

旅程剪影。
故乡花园在星核灾变中凋零，她登上列车搜寻稀有药材。`,
  },
  {
    title: "匹诺康尼梦塑者",
    description: "用梦境折磨恶徒的舞台表演者。",
    prompt: `角色名称？
马洛

他的命途？
智识

战斗定位与元素？
虚数属性范围输出

标志技能或终结技？
战技「帷幕落幕」以循环幻景困住敌人

旅途同伴或羁绊？
与会说话的麦克风搭档，曾效命于家族

性格？
张扬、富同情心，热爱掌声

旅程剪影。
在演出中改写剧本摆脱家族控制，现协助列车解救被梦境束缚的人们。`,
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
      { label: "列车新乘客", value: "astral express youth" },
      { label: "仙舟战士", value: "xianzhou warrior" },
      { label: "贝洛中介者", value: "belobog mediator" },
      { label: "匹诺康尼演者", value: "penacony performer" },
      { label: "星神触及者", value: "aeon touched" },
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
      { label: "调皮笑容", value: "playful grin" },
      { label: "凌厉表情", value: "fierce snarl" },
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
      { label: "护甲马甲", value: "armored vest" },
      { label: "宽松衬衫", value: "loose shirt" },
      { label: "连帽披风", value: "hooded cloak" },
      { label: "典礼长袍", value: "ceremonial robe" },
      { label: "列车制服外套", value: "astral express coat" },
      { label: "仙舟铠甲", value: "xianzhou armor" },
      { label: "贝洛保温夹克", value: "belobog sync jacket" },
      { label: "星企商服", value: "ipc business suit" },
      { label: "匹诺梦境西装", value: "penacony dream blazer" },
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
      { label: "飘逸袍摆", value: "flowing robes" },
      { label: "护甲护腿", value: "armored greaves" },
      { label: "层叠裹裙", value: "layered wraps" },
      { label: "开拓者长裤", value: "trailblazer trousers" },
      { label: "仙舟裙甲", value: "xianzhou skirts" },
      { label: "贝洛防寒裤", value: "belobog thermal pants" },
      { label: "星企褶裙", value: "ipc pleats" },
      { label: "梦境打底裤", value: "dreamscape leggings" },
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
      { label: "星海礼服", value: "royal regalia" },
      { label: "星际游牧装", value: "nomad attire" },
      { label: "列车组制服", value: "astral express uniform" },
      { label: "仙舟联盟战装", value: "xianzhou alliance set" },
      { label: "贝洛地下装", value: "belobog underworld set" },
      { label: "星核猎手套装", value: "stellaron hunter set" },
      { label: "匹诺康尼梦装", value: "penacony dreamscape set" },
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
      { label: "星神丝线", value: "aeon thread fabric" },
      { label: "仙舟丝钢", value: "xianzhou silksteel" },
      { label: "贝洛保暖织", value: "belobog thermal weave" },
      { label: "星企西装布", value: "ipc suit cloth" },
      { label: "梦光绸缎", value: "dreamlight satin" },
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
      { label: "秘典", value: "magic tome accessory" },
      { label: "开拓者徽章", value: "trailblazer badge" },
      { label: "光锥投影", value: "light cone" },
      { label: "通讯耳机", value: "communicator earpiece" },
      { label: "星神护符", value: "aeon charm" },
      { label: "梦行者面具", value: "dreamwalker mask" },
    ],
  },
  {
    title: "命途",
    key: "path",
    data: [
      { label: "毁灭", value: "destruction" },
      { label: "巡猎", value: "hunt" },
      { label: "智识", value: "erudition" },
      { label: "同谐", value: "harmony" },
      { label: "存护", value: "preservation" },
      { label: "丰饶", value: "abundance" },
      { label: "虚无", value: "nihility" },
    ],
  },
];

const examples = [
  {
    image:
      "https://cdn.ocmaker.app/example/honkai-star-rail-oc-generated-1.webp",
    prompt:
      "1girl, silver hair, purple eyes, elegant expression, astral express member uniform, space-themed outfit, star motifs, constellation accessories, confident pose, single character, upper body, looking at viewer, anime style, cosmic background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/honkai-star-rail-oc-generated-2.webp",
    prompt:
      "1boy, dark blue hair, golden eyes, mysterious smile, stellaron hunter outfit, futuristic coat, technology accessories, path of destruction symbols, dramatic pose, single character, upper body, looking at viewer, anime style, starry background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/honkai-star-rail-oc-generated-3.webp",
    prompt:
      "1girl, pink hair with blue highlights, emerald eyes, gentle expression, silvermane guard uniform, belobog military style, ice crystals effects, path of preservation emblem, protective stance, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/honkai-star-rail-oc-generated-4.webp",
    prompt:
      "1boy, white hair, red eyes, scholarly appearance, genius society robes, path of erudition symbols, ancient scrolls, intellectual pose, single character, upper body, looking at viewer, anime style, library background",
  },
];

export default {
  meta: {
    title: "星穹铁道 OC 角色生成器",
    description:
      "借助 AI 打造你的《崩坏：星穹铁道》原创角色，谱写命途与星海冒险。",
  },
  series: "崩坏：星穹铁道",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Honkai Star Rail OC Maker",
      description:
        "输入角色设定，即刻生成星穹铁道风格的开拓者与星核猎手。",
    },
    step: {
      title: "如何打造 Star Rail OC",
      description:
        "想踏上星穹列车？遵循以下步骤塑造你的宇宙冒险者。",
      steps: [
        {
          title: "选择命途与阵营",
          description:
            "决定角色追随的命途（毁灭、巡猎、智识、同谐、存护、丰饶、虚无）以及所属阵营，如星穹列车、星核猎手、星企或仙舟等。",
        },
        {
          title: "描绘外观与出身",
          description:
            "描述服饰风格、元素属性、武器偏好与星球背景，构思他们与星核危机的连结。",
        },
        {
          title: "生成你的开拓者",
          description:
            "点击“生成角色”，便能获得多张科幻风格图像，从中挑选最贴合命途哲学的设计。",
        },
      ],
    },
    examples: {
      title: "星穹角色示例",
      description:
        "浏览使用 Honkai Star Rail OC Maker 生成的宇宙角色。",
      examples,
    },
    features: {
      title: "Star Rail OC Maker 的特色",
      description:
        "专为星穹铁道调校，让原创角色在星海旅程与命途哲学之间游刃有余。",
      features: [
        {
          label: "正统科幻画风",
          description:
            "角色比例、服饰与星际特效贴合游戏高质感的 3D 动画风。",
        },
        {
          label: "命途系统整合",
          description:
            "AI 理解七种命途的视觉符号与战斗理念，确保角色设定与哲学统一。",
        },
        {
          label: "极速角色生成",
          description:
            "数秒便能取得宇宙角色立绘，专注打造他们的星际旅程与情感线。",
        },
        {
          label: "高品质宇宙视觉",
          description:
            "图像呈现科幻华丽感，适合世界观扩展与同人故事创作。",
        },
        {
          label: "多元命途迭代",
          description:
            "每次生成提供不同服装、元素与命途象征，探索角色的多重可能。",
        },
        {
          label: "深度世界观融合",
          description:
            "角色自然融入列车、仙舟、贝洛伯格与星核猎手的纷争与羁绊。",
        },
      ],
    },
    faqs: {
      title: "常见问题",
      description: "还有疑问？欢迎写信至 support@ocmaker.app",
      faqs: [
        {
          question: "什么是 Honkai Star Rail OC Maker？如何运作？",
          answer:
            "这是专为《崩坏：星穹铁道》打造的 AI 工具。描述角色后，即可生成符合游戏风格的宇宙图像。",
        },
        {
          question: "如何让角色更贴近星穹铁道世界？",
          answer:
            "加入命途、阵营归属、星球出身、元素属性与星核事件相关细节，能增强故事感。",
        },
        {
          question: "可以免费使用吗？",
          answer:
            "可以。基础功能免费；升级方案提供更快生成与更多命途造型选项。",
        },
        {
          question: "为何生成效果这么接近原作？",
          answer:
            "系统针对星穹铁道的视觉与文化元素调校，保留其科幻与命途哲学的美学。",
        },
        {
          question: "生成的角色能否用于商业企划？",
          answer:
            "可以！你用 Star Rail OC Maker 创作的原创角色归你所有，可用于个人或商业用途。",
        },
        {
          question: "需要注册账号才能生成吗？",
          answer:
            "基础使用无需注册；注册后可保存角色、查看历史并解锁更多星际主题功能。",
        },
        {
          question: "能否创造不同阵营与命途的角色组合？",
          answer:
            "当然！可自由组合星穹列车、星核猎手、星企等阵营与七大命途的设定。",
        },
        {
          question: "未来会推出其他米哈游世界的 OC Maker 吗？",
          answer:
            "会的！我们持续扩展米哈游与其他科幻 RPG 主题，欢迎关注最新更新。",
        },
      ],
    },
    cta: {
      title: "踏上星际旅程",
      description:
        "无需绘画技能，只要描述，就能让原创角色在星穹中开拓未知。",
      btns: {
        start: "开始创作",
        explore: "探索角色示例",
      },
    },
  },
};
