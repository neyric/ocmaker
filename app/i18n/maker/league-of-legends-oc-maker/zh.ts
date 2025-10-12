const basePrompt = `
  WORLD CONTEXT:
  故事：英雄联盟／符文之地
  背景概述：德玛西亚、诺克萨斯、皮尔特沃夫与祖安、艾欧尼亚、巨神峰、恕瑞玛、弗雷尔卓德、比尔吉沃特、暗影岛；英雄、升华者、符文魔法
  关键势力：英雄联盟冠军、铁秩序、诺克萨斯军团、皮城发明家、祖安化工男爵、艾欧尼亚寺院、虚空入侵、班德尔城约德尔

  OUTPUT FORMAT:
  姓名、所属地区／阵营、职业或战斗定位、技能组主题、性格、终极目标、背景片段

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "德玛西亚光耀游侠",
    description: "以棱镜光芒护卫难民的游侠骑士。",
    prompt: `角色名称？
赛伦·凯卢姆

他们来自的地区或阵营？
德玛西亚

战斗职业或定位？
支援型射手

技能组主题为何？
构筑护盾光廊的棱镜箭矢

性格？
正直慈悲、保护欲强

终极目标是什么？
证明德玛西亚能够负责任地拥抱魔法

传说背景剪影。
曾暗中护送遭迫害的法师，与拉克丝联手推动法律改革。`,
  },
  {
    title: "诺克萨斯链刃风暴",
    description: "用链钩割裂战场的流亡刺客。",
    prompt: `角色名称？
瓦洛克斯

他们来自的地区或阵营？
诺克萨斯

战斗职业或定位？
战士／刺客

技能组主题为何？
汲取敌人斗志的链钩

性格？
冷静算计，暗藏荣誉感

终极目标是什么？
推翻屠戮他战团的军阀

传说背景剪影。
在艾欧尼亚战役中遭背叛，如今率领流亡军团展开暗中反击。`,
  },
  {
    title: "皮城机巧师",
    description: "驾驶控场机甲的约德尔发明家。",
    prompt: `角色名称？
廷克斯

他们来自的地区或阵营？
皮尔特沃夫与祖安

战斗职业或定位？
坦克型辅助

技能组主题为何？
蒸汽机甲释放磁力护盾脉冲

性格？
开朗机灵，容易分心

终极目标是什么？
打造比海克斯传送门更安全的跨城运输系统

传说背景剪影。
目睹化工男爵剥削工人后辞职，如今在抗议游行期间守护队伍。`,
  },
  {
    title: "艾欧尼亚灵舞守护者",
    description: "将灵花织成锋芒丝带的守护灵者。",
    prompt: `角色名称？
冬织花奈

他们来自的地区或阵营？
艾欧尼亚

战斗职业或定位？
增幅型法师

技能组主题为何？
灵花丝带疗愈友军、束缚敌人

性格？
沉静、共情力强且坚定

终极目标是什么？
疗愈战争留下的纳沃利创痕

传说背景剪影。
灵花祭期间引导亚索护送的难民，最终得到灵花精灵的祝福。`,
  },
  {
    title: "恕瑞玛升华守卫",
    description: "驱策沙暴构造的古老守护者。",
    prompt: `角色名称？
阿扎雷斯

他们来自的地区或阵营？
恕瑞玛

战斗职业或定位？
法系斗士

技能组主题为何？
随意切换攻守的沙暴构造体

性格？
端庄稳重、耐心不屈

终极目标是什么？
重建日轮盘下埋藏的知识殿堂

传说背景剪影。
作为档案管理员被阿兹尔升华，发誓守护恕瑞玛史册免遭叛徒篡改。`,
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
      { label: "年轻天才", value: "young prodigy" },
      { label: "久经沙场", value: "battle hardened" },
      { label: "冠军老将", value: "seasoned champion" },
    ],
  },
  {
    title: "体态",
    key: "body",
    data: [
      { label: "纤细", value: "slender" },
      { label: "运动型", value: "athletic" },
      { label: "肌肉型", value: "muscular" },
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
      { label: "黑色短发", value: "short black hair" },
      { label: "棕色长发", value: "long brown hair" },
      { label: "金发", value: "blonde hair" },
      { label: "红发", value: "red hair" },
      { label: "银发", value: "silver hair" },
      { label: "蓝发", value: "blue hair" },
      { label: "白发", value: "white hair" },
      { label: "编发", value: "braided hair" },
      { label: "波浪淡紫发", value: "wavy lavender hair" },
    ],
  },
  {
    title: "眼神",
    key: "eyes",
    data: [
      { label: "棕色眼睛", value: "brown eyes" },
      { label: "蓝色眼睛", value: "blue eyes" },
      { label: "绿色眼睛", value: "green eyes" },
      { label: "琥珀色眼睛", value: "amber eyes" },
      { label: "灰色眼睛", value: "gray eyes" },
      { label: "紫罗兰眼睛", value: "violet eyes" },
      { label: "金色眼睛", value: "golden eyes" },
    ],
  },
  {
    title: "神态",
    key: "face",
    data: [
      { label: "坚定神情", value: "determined expression" },
      { label: "微笑面庞", value: "smiling expression" },
      { label: "严肃表情", value: "serious expression" },
      { label: "冷峻神色", value: "stoic expression" },
      { label: "顽皮笑容", value: "playful grin" },
      { label: "凌厉怒吼", value: "fierce snarl" },
      { label: "温暖笑意", value: "warm smile" },
    ],
  },
  {
    title: "肤色",
    key: "skin",
    data: [
      { label: "白皙肌肤", value: "fair skin" },
      { label: "健康小麦肤色", value: "tan skin" },
      { label: "橄榄肤色", value: "olive skin" },
      { label: "深棕肤色", value: "deep brown skin" },
      { label: "雀斑肌肤", value: "freckled skin" },
      { label: "瓷白肌肤", value: "porcelain skin" },
      { label: "日晒红晕", value: "sunburned skin" },
    ],
  },
  {
    title: "上装",
    key: "top",
    data: [
      { label: "实用外套", value: "utility jacket" },
      { label: "层搭大衣", value: "layered coat" },
      { label: "休闲罩衫", value: "casual tunic" },
      { label: "装甲背心", value: "armored vest" },
      { label: "宽松衬衫", value: "loose shirt" },
      { label: "连帽斗篷", value: "hooded cloak" },
      { label: "礼仪长袍", value: "ceremonial robe" },
      { label: "德玛西亚铠甲", value: "demacian armor" },
      { label: "诺克萨斯战铠", value: "noxian warplate" },
      { label: "艾欧尼亚法袍", value: "ionian robes" },
      { label: "皮城机匠夹克", value: "piltover jacket" },
      { label: "暗影岛斗篷", value: "shadow isles cloak" },
    ],
  },
  {
    title: "下装",
    key: "bottom",
    data: [
      { label: "多口袋长裤", value: "cargo trousers" },
      { label: "修身长裤", value: "fitted pants" },
      { label: "百褶裙", value: "pleated skirt" },
      { label: "战斗短裤", value: "battle shorts" },
      { label: "飘逸袍摆", value: "flowing robes" },
      { label: "装甲护胫", value: "armored greaves" },
      { label: "层叠缠裹", value: "layered wraps" },
      { label: "装甲裙甲", value: "armored tassets" },
      { label: "符文护腿", value: "runic leggings" },
      { label: "海克斯长裤", value: "hextech pants" },
      { label: "弗雷尔卓德毛皮", value: "freljord furs" },
      { label: "比尔吉沃特长裤", value: "bilgewater trousers" },
    ],
  },
  {
    title: "整套造型",
    key: "set",
    data: [
      { label: "战斗套装", value: "combat uniform" },
      { label: "旅行者便装", value: "casual traveler outfit" },
      { label: "正式礼服", value: "formal attire" },
      { label: "潜行装备", value: "stealth gear" },
      { label: "祭典服饰", value: "festival outfit" },
      { label: "皇家礼装", value: "royal regalia" },
      { label: "游牧装束", value: "nomad attire" },
      { label: "德玛先锋套组", value: "demacia vanguard set" },
      { label: "诺克萨斯行刑队", value: "noxus executioner set" },
      { label: "皮城发明家套装", value: "piltover inventor set" },
      { label: "艾欧尼亚灵守", value: "ionia spirit guardian" },
      { label: "虚空侵染造型", value: "void touched set" },
    ],
  },
  {
    title: "材质",
    key: "material",
    data: [
      { label: "织布材质", value: "woven fabric" },
      { label: "抛光皮革", value: "polished leather" },
      { label: "强化护甲材", value: "reinforced armor" },
      { label: "高科技纤维", value: "high-tech fiber" },
      { label: "有机织料", value: "organic weave" },
      { label: "龙皮材质", value: "dragonhide" },
      { label: "神秘织布", value: "mystic cloth" },
      { label: "海克斯合金", value: "hextech alloy" },
      { label: "符文石", value: "runed stone" },
      { label: "灵花绸", value: "spirit blossom silk" },
      { label: "弗雷尔卓德冰织", value: "freljord ice weave" },
      { label: "虚空甲壳", value: "void chitin" },
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
      { label: "首饰", value: "jewelry" },
      { label: "交叉弹带", value: "bandolier" },
      { label: "魔导书", value: "magic tome accessory" },
      { label: "冠军纹章", value: "champion sigil" },
      { label: "海克斯护臂", value: "hextech gauntlet" },
      { label: "符文之刃", value: "runic blade" },
      { label: "巨神峰星纹吊坠", value: "targon star pendant" },
      { label: "比尔吉沃特手枪", value: "bilgewater pistol" },
    ],
  },
  {
    title: "地区",
    key: "lol_region",
    data: [
      { label: "德玛西亚", value: "demacia" },
      { label: "诺克萨斯", value: "noxus" },
      { label: "皮尔特沃夫", value: "piltover" },
      { label: "艾欧尼亚", value: "ionia" },
      { label: "弗雷尔卓德", value: "freljord" },
      { label: "恕瑞玛", value: "shurima" },
      { label: "暗影岛", value: "shadow isles" },
      { label: "比尔吉沃特", value: "bilgewater" },
      { label: "巨神峰", value: "targon" },
      { label: "虚空", value: "void" },
    ],
  },
];

const examples = [
  {
    image: "https://cdn.ocmaker.app/example/lol-oc-generated-1.webp",
    prompt:
      "1boy, bright orange hair, navy eyes, enthusiastic grin, League of Legends explorer outfit, compass, adventurous pose, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
  {
    image: "https://cdn.ocmaker.app/example/lol-oc-generated-2.webp",
    prompt:
      "1man, short black hair, red eyes, fierce expression, heavy armor, massive battle axe, imposing stance, muscular build, single character, upper body, looking down, anime style, dark background, dramatic lighting",
  },
  {
    image: "https://cdn.ocmaker.app/example/lol-oc-generated-3.webp",
    prompt:
      "1girl, blonde hair, blue eyes, cheerful expression, silver and blue mage armor, glowing staff, light magic, radiant aura, dynamic pose, single character, upper body, looking at viewer, anime style, magical background, sparkles",
  },
  {
    image: "https://cdn.ocmaker.app/example/lol-oc-generated-4.webp",
    prompt:
      "1man, brown hair, ponytail, sharp eyes, serious expression, blue samurai armor, katana on back, wind motif, loose scarf, single character, upper body, looking to the side, anime style, dramatic lighting, simple background",
  },
];

export default {
  meta: {
    title: "英雄联盟 OC 角色生成器",
    description:
      "借助 AI 打造你的符文之地原创英雄，设定独特技能、定位与传奇背景。",
  },
  series: "英雄联盟",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "League of Legends OC Maker",
      description: "输入设定，即可生成英雄联盟风格的原创冠军形象。",
    },
    step: {
      title: "如何打造 League of Legends OC",
      description: "跟随步骤，迅速塑造属于你的峡谷英雄。",
      steps: [
        {
          title: "选择英雄定位",
          description:
            "先决定角色是法师、刺客、射手、坦克、辅助或战士，思考他们活跃的线路与打法风格。",
        },
        {
          title: "设计技能与外观",
          description:
            "描述独特的技能组、武器与视觉造型，并说明来自符文之地哪个地区，如何影响力量与美学。",
        },
        {
          title: "生成你的冠军",
          description:
            "点击“生成角色”，挑选多张 AI 设计，打磨最符合你想像的英雄外观。",
        },
      ],
    },
    examples: {
      title: "英雄联盟示例",
      description:
        "浏览使用 League of Legends OC Maker 文字提示生成的多样英雄造型。",
      examples,
    },
    features: {
      title: "League of Legends OC Maker 有何特色？",
      description:
        "针对符文之地量身打造，助你创造兼具视觉冲击与背景深度的原创冠军。",
      features: [
        {
          label: "正统英雄设计",
          description: "角色画风贴近英雄联盟，从魔法特效到地区装备都完整呈现。",
        },
        {
          label: "定位驱动创作",
          description:
            "AI 理解五大定位与玩法差异，确保外观与技能主题契合对局体验。",
        },
        {
          label: "极速生成冠军",
          description:
            "数秒内完成专业水准的英雄立绘，专注于打造技能与背景传说。",
        },
        {
          label: "高质量游戏美术",
          description:
            "依照英雄联盟的视觉标准调校，生成符合游戏质感的角色作品。",
        },
        {
          label: "多样造型选项",
          description:
            "一次提示即可获得不同风格变体，探索武器、装备与元素表现。",
        },
        {
          label: "符文之地融入感",
          description:
            "角色自然带出地区文化、魔法体系与阵营冲突，轻松延展故事线。",
        },
      ],
    },
    faqs: {
      title: "常见问题",
      description: "还有疑问？欢迎留言至 support@ocmaker.app",
      faqs: [
        {
          question: "League of Legends OC Maker 是什么？如何运作？",
          answer:
            "League of Legends OC Maker 是专为英雄联盟设计的 AI 生成器。描述角色的定位、技能组与外观后，即可获得英雄联盟风格的原创插画。",
        },
        {
          question: "如何用 League of Legends OC Maker 创造更好的英雄？",
          answer:
            "加入定位细节（法师、ADC、辅助等）、出身地区（德玛西亚、诺克萨斯、艾欧尼亚等）和技能主题，越具体越能强化原味。",
        },
        {
          question: "League of Legends OC Maker 可以免费使用吗？",
          answer:
            "可以。基础功能免费；订阅方案可加速生成、增加变体数量并开放进阶自订选项。",
        },
        {
          question: "为什么生成结果这么贴近英雄联盟？",
          answer:
            "系统针对英雄联盟的画面风格、定位差异与地区美学调校，确保角色视觉准确度。",
        },
        {
          question: "利用 League of Legends OC Maker 创造的角色能商用吗？",
          answer:
            "当然可以！你创作的原创英雄归你所有，可放心用于个人或商业项目。",
        },
        {
          question: "使用 League of Legends OC Maker 需要账号吗？",
          answer:
            "基础体验无需注册；登录账号可保存角色、查看历史记录，并解锁更多符文之地主题功能。",
        },
        {
          question: "可以重新生成或调整我的英雄设计吗？",
          answer:
            "当然能！可用同一提示再生成不同版本，或微调描述持续迭代，直到完全符合构想。",
        },
        {
          question: "未来会加入更多 MOBA 主题的 OC Maker 吗？",
          answer:
            "会的！我们正拓展至更多 MOBA 与游戏宇宙，欢迎留意新主题上线。",
        },
      ],
    },
    cta: {
      title: "创建你的峡谷英雄",
      description: "无需绘图经验，只要想像并描述，就能让原创冠军立刻成形。",
      btns: {
        start: "开始创作",
        explore: "探索英雄示例",
      },
    },
  },
};
