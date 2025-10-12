const basePrompt = `
  WORLD CONTEXT:
  故事：《进击的巨人》
  背景概述：人类残存于三重城墙之内，一边对抗吞噬者巨人，一边被马莱帝国的战争机器所逼迫
  关键阵营：调查兵团、驻屯兵团、宪兵团、马莱战士单位、耶格尔派、地下抵抗组织

  OUTPUT FORMAT:
  姓名、所属兵团/阵营、职责与特长、战斗装备或巨人之力、性格、动机、背景速写

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "侦察开路者",
    description: "一位调查兵团老兵，持续绘制他人不敢涉足的巨人领地。",
    prompt: `角色名称？
伊莉娅·布劳尔

所属兵团或阵营？
调查兵团特战班

职责与特长？
运用试验型标记照明弹进行远距侦察与制图

主要依赖的战斗装备或巨人之力？
双刃、改装立体机动装置与雷枪火力支援

性格特质？
沉着、善于分析，对所属小队绝对忠诚

行动动机？
为城墙外的平民找出安全撤离路线

请分享一个背景片段。
在托罗斯特长大的她立誓不再让任何一次破城让人类措手不及，如今为韩吉的团队绘制每一处巨人巢穴。`,
  },
  {
    title: "驻屯兵团炮火队长",
    description: "一名兼具工程与讨伐职责的驻屯兵团军官。",
    prompt: `角色名称？
马留斯·费尔特

所属兵团或阵营？
驻屯兵团第三工程旅

职责与特长？
统筹城墙修复，同时带领一支炮击小队

主要依赖的战斗装备或巨人之力？
固定火炮、反人员立体机动装置以及信号火箭

性格特质？
务实、护短，在压力下善用冷幽默

行动动机？
让城墙在重建完成前始终屹立

请分享一个背景片段。
托罗斯特失守时他失去了双亲，如今指挥着当年他躲在其下方的同一座炮台。`,
  },
  {
    title: "战士候补生",
    description: "一名在职责与对艾尔迪亚人共鸣之间挣扎的马莱训练生。",
    prompt: `角色名称？
格蕾塔·布劳恩

所属兵团或阵营？
马莱战士单位候补班

职责与特长？
战术筹划与反立体机动战术

主要依赖的战斗装备或巨人之力？
强化霰弹枪与雷枪拦截发射器

性格特质？
自律、内心矛盾，却对同伴忠诚到底

行动动机？
继承铠之巨人的力量，并重新定义马莱对艾尔迪亚人的态度

请分享一个背景片段。
她暗中与一位艾尔迪亚笔友通信，开始质疑自己誓言捍卫的宣传。`,
  },
  {
    title: "耶格尔派鼓动者",
    description: "一位激进的青年，愿以任何代价争取艾尔迪亚自由。",
    prompt: `角色名称？
托马斯·基尔施

所属兵团或阵营？
帕拉迪岛内部的耶格尔派地下组织

职责与特长？
播送宣传并组织民兵

主要依赖的战斗装备或巨人之力？
标准立体机动装备、走私火器与偷来的雷枪

性格特质？
富有号召力、性急，对艾伦的愿景狂热奉献

行动动机？
用地鸣的威慑迫使世界尊重艾尔迪亚主权

请分享一个背景片段。
曾是希甘希纳的难民，托马斯利用屋顶电台串联支持者，同时躲避宪兵团的监视。`,
  },
  {
    title: "地下医者",
    description: "一名在首都地下照料难民与逃兵的平民医疗者。",
    prompt: `角色名称？
伊莉丝·莫罗

所属兵团或阵营？
米特拉斯地下的独立支援网络

职责与特长？
治疗立体机动伤势与巨人创伤幸存者

主要依赖的战斗装备或巨人之力？
隐蔽诊所、麻醉注射器与回收医疗手术刀

性格特质？
富有同理心、疲惫却坚定地反抗不义

行动动机？
证明人类的生存既靠力量也靠怜悯

请分享一个背景片段。
她目睹宪兵团的残酷后离职出逃，如今在秘道中为侦察兵与平民包扎伤口。`,
  },
];
const ocOptions = [
  {
    title: "性别",
    key: "gender",
    unique: true,
    data: [
      {
        label: "男生",
        value: "1boy",
      },
      {
        label: "女生",
        value: "1girl",
      },
      {
        label: "非二元",
        value: "1person",
      },
    ],
  },
  {
    title: "年龄",
    key: "age",
    data: [
      {
        label: "少年期",
        value: "teen",
      },
      {
        label: "高中后期",
        value: "late teen",
      },
      {
        label: "青年",
        value: "young adult",
      },
      {
        label: "资深成年人",
        value: "adult",
      },
      {
        label: "老练战士",
        value: "veteran",
      },
      {
        label: "资深长者",
        value: "seasoned elder",
      },
      {
        label: "传奇不朽",
        value: "timeless legend",
      },
      {
        label: "训练兵团学员",
        value: "cadet teen",
      },
      {
        label: "前线侦察兵（高中后期）",
        value: "frontline late teen",
      },
      {
        label: "调查兵团老兵",
        value: "survey veteran",
      },
      {
        label: "驻屯兵团军官",
        value: "garrison adult",
      },
      {
        label: "资深指挥官",
        value: "seasoned commander",
      },
    ],
  },
  {
    title: "体态",
    key: "body",
    data: [
      {
        label: "修长",
        value: "slender",
      },
      {
        label: "健壮",
        value: "athletic",
      },
      {
        label: "肌肉发达",
        value: "muscular",
      },
      {
        label: "高挑",
        value: "tall",
      },
      {
        label: "娇小",
        value: "petite",
      },
      {
        label: "魁梧",
        value: "burly",
      },
      {
        label: "优雅",
        value: "graceful",
      },
      {
        label: "敏捷信使体型",
        value: "lean build",
      },
      {
        label: "立体机动敏捷体态",
        value: "agile frame",
      },
      {
        label: "重甲讨伐者",
        value: "armored muscular",
      },
      {
        label: "高塔侦察身形",
        value: "tall scout",
      },
      {
        label: "紧凑炮兵体格",
        value: "compact gunner",
      },
    ],
  },
  {
    title: "发型",
    key: "hair",
    data: [
      {
        label: "短黑发",
        value: "short black hair",
      },
      {
        label: "长棕发",
        value: "long brown hair",
      },
      {
        label: "金发",
        value: "blonde hair",
      },
      {
        label: "红发",
        value: "red hair",
      },
      {
        label: "银发",
        value: "silver hair",
      },
      {
        label: "蓝发",
        value: "blue hair",
      },
      {
        label: "白发",
        value: "white hair",
      },
      {
        label: "辫发",
        value: "braided hair",
      },
      {
        label: "薰衣草波浪长发",
        value: "wavy lavender hair",
      },
      {
        label: "短款削边",
        value: "short undercut hair",
      },
      {
        label: "及肩赤褐发",
        value: "shoulder auburn hair",
      },
      {
        label: "束起的黑色马尾",
        value: "tied black ponytail",
      },
      {
        label: "风吹乱的金发",
        value: "windblown blonde hair",
      },
      {
        label: "剃短两侧配刘海",
        value: "shaved sides fringe",
      },
    ],
  },
  {
    title: "眼神",
    key: "eyes",
    data: [
      {
        label: "棕色瞳",
        value: "brown eyes",
      },
      {
        label: "蓝色瞳",
        value: "blue eyes",
      },
      {
        label: "绿色瞳",
        value: "green eyes",
      },
      {
        label: "琥珀瞳",
        value: "amber eyes",
      },
      {
        label: "灰色瞳",
        value: "gray eyes",
      },
      {
        label: "紫色瞳",
        value: "violet eyes",
      },
      {
        label: "金色瞳",
        value: "golden eyes",
      },
      {
        label: "钢灰目光",
        value: "steel gray eyes",
      },
      {
        label: "锐利绿瞳",
        value: "sharp green eyes",
      },
      {
        label: "坚定琥珀眼",
        value: "amber determined eyes",
      },
      {
        label: "冰蓝聚焦",
        value: "ice blue eyes",
      },
      {
        label: "榛色暖眸",
        value: "hazel eyes",
      },
    ],
  },
  {
    title: "表情",
    key: "face",
    data: [
      {
        label: "坚毅神情",
        value: "determined expression",
      },
      {
        label: "微笑",
        value: "smiling expression",
      },
      {
        label: "严肃目光",
        value: "serious expression",
      },
      {
        label: "冷峻表情",
        value: "stoic expression",
      },
      {
        label: "调皮笑意",
        value: "playful grin",
      },
      {
        label: "凶猛咆哮",
        value: "fierce snarl",
      },
      {
        label: "温暖的笑容",
        value: "warm smile",
      },
      {
        label: "历战凝视",
        value: "battle hardened face",
      },
      {
        label: "带疤的决意",
        value: "scarred stoic face",
      },
      {
        label: "坚定怒视",
        value: "determined glare",
      },
      {
        label: "柔和却戒备",
        value: "soft wary expression",
      },
      {
        label: "莽撞笑容",
        value: "reckless grin",
      },
    ],
  },
  {
    title: "肤色",
    key: "skin",
    data: [
      {
        label: "白皙肤色",
        value: "fair skin",
      },
      {
        label: "暖棕肤色",
        value: "tan skin",
      },
      {
        label: "橄榄肤色",
        value: "olive skin",
      },
      {
        label: "深棕肤色",
        value: "deep brown skin",
      },
      {
        label: "雀斑肤色",
        value: "freckled skin",
      },
      {
        label: "瓷白肤色",
        value: "porcelain skin",
      },
      {
        label: "日晒肤色",
        value: "sunburned skin",
      },
      {
        label: "立体机动风灼",
        value: "fair windburned skin",
      },
      {
        label: "驻屯晒痕",
        value: "sun kissed skin",
      },
      {
        label: "老兵疤痕",
        value: "scar laced skin",
      },
      {
        label: "托罗斯特幸存者",
        value: "olive survivor skin",
      },
      {
        label: "学员雀斑",
        value: "freckled cadet skin",
      },
    ],
  },
  {
    title: "上装",
    key: "top",
    data: [
      {
        label: "多功能夹克",
        value: "utility jacket",
      },
      {
        label: "层叠长外套",
        value: "layered coat",
      },
      {
        label: "休闲束腰上衣",
        value: "casual tunic",
      },
      {
        label: "装甲背心",
        value: "armored vest",
      },
      {
        label: "宽松衬衫",
        value: "loose shirt",
      },
      {
        label: "连帽斗篷",
        value: "hooded cloak",
      },
      {
        label: "仪式长袍",
        value: "ceremonial robe",
      },
      {
        label: "调查兵团夹克",
        value: "survey corps jacket",
      },
      {
        label: "驻屯兵团披风",
        value: "garrison cloak",
      },
      {
        label: "宪兵团短外套",
        value: "military police blazer",
      },
      {
        label: "耶格尔派臂章背心",
        value: "yeagerist vest",
      },
      {
        label: "地下医师外套",
        value: "underground medic coat",
      },
    ],
  },
  {
    title: "下装",
    key: "bottom",
    data: [
      {
        label: "多口袋战术裤",
        value: "cargo trousers",
      },
      {
        label: "合身长裤",
        value: "fitted pants",
      },
      {
        label: "百褶裙",
        value: "pleated skirt",
      },
      {
        label: "战斗短裤",
        value: "battle shorts",
      },
      {
        label: "飘逸长袍",
        value: "flowing robes",
      },
      {
        label: "装甲护胫",
        value: "armored greaves",
      },
      {
        label: "层叠裹布",
        value: "layered wraps",
      },
      {
        label: "立体机动吊带裤",
        value: "odm harness trousers",
      },
      {
        label: "骑兵巡逻裤",
        value: "mounted patrol pants",
      },
      {
        label: "强化皮裤",
        value: "reinforced leather pants",
      },
      {
        label: "侦察束带裙",
        value: "scout skirt belts",
      },
      {
        label: "避难民叠穿",
        value: "civilian layered bottoms",
      },
    ],
  },
  {
    title: "套装",
    key: "set",
    data: [
      {
        label: "战斗制服",
        value: "combat uniform",
      },
      {
        label: "旅人休闲装",
        value: "casual traveler outfit",
      },
      {
        label: "正式礼服",
        value: "formal attire",
      },
      {
        label: "潜行装备",
        value: "stealth gear",
      },
      {
        label: "节庆服饰",
        value: "festival outfit",
      },
      {
        label: "王室礼装",
        value: "royal regalia",
      },
      {
        label: "游牧装束",
        value: "nomad attire",
      },
      {
        label: "调查兵团全套装备",
        value: "survey corps full gear",
      },
      {
        label: "城墙修复工程装",
        value: "wall repair engineer set",
      },
      {
        label: "马莱潜入伪装",
        value: "marley disguise set",
      },
      {
        label: "地下情报员装束",
        value: "underground informant outfit",
      },
      {
        label: "驻屯炮兵制服",
        value: "garrison artillery uniform",
      },
    ],
  },
  {
    title: "材质",
    key: "material",
    data: [
      {
        label: "编织布料",
        value: "woven fabric",
      },
      {
        label: "抛光皮革",
        value: "polished leather",
      },
      {
        label: "强化装甲",
        value: "reinforced armor",
      },
      {
        label: "高科技纤维",
        value: "high-tech fiber",
      },
      {
        label: "有机织物",
        value: "organic weave",
      },
      {
        label: "龙皮",
        value: "dragonhide",
      },
      {
        label: "秘术布料",
        value: "mystic cloth",
      },
      {
        label: "风化皮革",
        value: "weathered leather",
      },
      {
        label: "披风羊毛",
        value: "cloak wool",
      },
      {
        label: "立体机动钢板",
        value: "odm steel plating",
      },
      {
        label: "马莱细麻",
        value: "marley linen",
      },
      {
        label: "地下拼布",
        value: "underground patchwork",
      },
    ],
  },
  {
    title: "配件",
    key: "accessory",
    data: [
      {
        label: "多功能腰带",
        value: "utility belt",
      },
      {
        label: "手套",
        value: "gloves",
      },
      {
        label: "围巾",
        value: "scarf",
      },
      {
        label: "头部装备",
        value: "headgear",
      },
      {
        label: "饰品",
        value: "jewelry",
      },
      {
        label: "弹药带",
        value: "bandolier",
      },
      {
        label: "魔导书",
        value: "magic tome accessory",
      },
      {
        label: "自由之翼斗篷",
        value: "wings of freedom cloak",
      },
      {
        label: "立体机动双刃组",
        value: "odm blades",
      },
      {
        label: "信号枪",
        value: "signal flare pistol",
      },
      {
        label: "耶格尔派臂章",
        value: "yeagerist armband",
      },
      {
        label: "医疗挎包",
        value: "medical satchel",
      },
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
    title: "AOT OC 角色生成器",
    description:
      "借助 AI 打造你的《进击的巨人》原创角色，完整呈现人物设定、背景故事与标志性视觉。",
  },
  series: "进击的巨人",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "AOT OC 生成器",
      description:
        "输入角色想法，立刻生成沉浸于《进击的巨人》世界观的原创角色图像与设定。",
    },
    step: {
      title: "如何打造 AOT OC",
      description:
        "只需两个步骤，就能让你的角色自然融入《进击的巨人》的残酷世界。",
      steps: [
        {
          title: "描述你的 AOT 角色",
          description:
            "在表单中填写角色的外貌与性格。若能加入短发黑发、粗粝军装或士兵的坚毅心境等 AOT 特色，将更贴合世界观。",
        },
        {
          title: "补充世界观细节",
          description:
            "加入调查兵团装备、巨人化能力或独特武器等细节。设定越贴近 AOT 世界，生成结果就越精准耀眼。",
        },
        {
          title: "生成并挑选设计",
          description:
            "点击“生成角色”即可获得多张 AI 作品，挑选最符合你想象的版本完成角色。",
        },
      ],
    },
    examples: {
      title: "AOT 示例",
      description: "范例展示由文字提示生成的《进击的巨人》风格原创角色。",
      examples,
    },
    features: {
      title: "AOT OC 生成器 是什么？",
      description:
        "AOT OC 生成器 是专为《进击的巨人》调校的 OC 生成器 版本。描述角色后，系统会即时转换为 AOT 风格的角色插画。",
      features: [
        {
          label: "地道的 AOT 角色设计",
          description:
            "生成的角色忠实还原《进击的巨人》的紧张氛围，能够无缝融入巨人与士兵共存的残酷战场。",
        },
        {
          label: "针对 AOT 的提示调优",
          description:
            "预设提示专为 AOT 美学调校——从粗犷军装到坚毅个性，帮助你打造更可信的角色。",
        },
        {
          label: "高速生成",
          description:
            "数秒内即可得到高质量角色图像，把时间留给构思与打磨设定。",
        },
        {
          label: "高解析视觉输出",
          description:
            "依托先进 AI 模型，AOT OC 生成器 能输出细腻且高分辨率的角色插画，适用于剧情创作或分享。",
        },
        {
          label: "一次多种选择",
          description:
            "每次生成可获得多种方案，自由挑选最符合你心中角色的版本。",
        },
        {
          label: "深度故事整合",
          description:
            "不仅提供图像，还能延伸出动机、背景与世界联系，让角色真正鲜活。",
        },
      ],
    },
    faqs: {
      title: "常见问题",
      description: "还有疑问？欢迎寄信至 support@ocmaker.app",
      faqs: [
        {
          question: "什么是 AOT OC 生成器？运作方式如何？",
          answer:
            "AOT OC 生成器 是 OC 生成器 的专属改版，针对《进击的巨人》世界观调校。描述角色后，AI 会依照提示在几秒内生成 AOT 风格的动漫图像。",
        },
        {
          question: "如何让 AOT OC 生成器 生成更好的角色？",
          answer:
            "在描述中加入 AOT 专属特征：例如军用装备、巨人之力或悲壮背景。细节越鲜明，输出越精准动人。",
        },
        {
          question: "AOT OC 生成器 可以免费使用吗？",
          answer:
            "可以。基础功能免费开放，若需要更快速度、进阶控制或高级选项，可随时升级方案。",
        },
        {
          question: "AOT OC 生成器 的成果为何如此出色？",
          answer:
            "我们使用针对《进击的巨人》微调的尖端 AI 模型，确保角色的风格与情绪张力都符合原作氛围。",
        },
        {
          question: "我能将 AOT OC 生成器 生成的角色用于商业项目吗？",
          answer:
            "当然可以。你用 AOT OC 生成器 创作的角色完全归你所有，无论个人或商业用途都可自由运用。",
        },
        {
          question: "使用 AOT OC 生成器 需要注册账户吗？",
          answer:
            "基本功能无需注册，但登入后可以保存角色、查看生成纪录，并解锁更多功能。",
        },
        {
          question: "AOT OC 生成器 是否能重新生成或微调同一角色？",
          answer:
            "可以。你可以针对同一提示反复生成，或调整输入内容直到角色完全符合你的想像。",
        },
        {
          question: "未来还会推出更多类似的动漫 OC 生成器 吗？",
          answer:
            "会的！我们正计划针对更多动漫世界推出专属 OC 生成器，敬请在 ocmaker.app 关注后续更新。",
        },
      ],
    },
    cta: {
      title: "立即创建你的 AOT 角色",
      description: "无需绘画技能，也能把《进击的巨人》原创角色带到眼前。",
      btns: {
        start: "开始创作",
        explore: "探索更多角色",
      },
    },
  },
};
