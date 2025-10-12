const basePrompt = `
  WORLD CONTEXT:
  故事：《航海王》
  背景概述：伟大航路与新世界、草帽团时代、恶魔果实与霸气、气候多变的奇想岛屿和独特文化
  关键阵营：四海海贼、草帽一伙与对手船团、海军／世界政府、王下七武海、革命军、四皇势力、CP 机关、天龙人

  OUTPUT FORMAT:
  姓名、所属船团／势力、职务与战斗风格、恶魔果实或霸气、鲜明特征、个人梦想、背景片段

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "笑潮航海士",
    description: "用笑声测流的航海士，比记录指针更懂洋流。",
    prompt: `角色名称？
玛琳潮韵

所属船团或阵营？
草帽大船团盟友，潮韵海贼团船长

职务与战斗风格？
兼任航海士与剑士，踩潮板御浪决斗

掌握的恶魔果实或霸气？
见闻色霸气与能改写漩涡方向的旋旋果实

具有什么鲜明特征？
总爱哼海员小调，手臂纹着航海图纹身

驱动他们的梦想？
想把通往拉夫德尔的洋流公开给所有自由水手

背景片段。
果实觉醒当天，她用旋旋果实驾驭大漩涡逃离世界政府研究船。`,
  },
  {
    title: "谍报叛逃者",
    description: "从 CP0 转投革命军的拳术间谍。",
    prompt: `角色名称？
凯托赛弗

所属船团或阵营？
革命军情报班

职务与战斗风格？
融合六式与鱼人空手道的武斗间谍

掌握的恶魔果实或霸气？
以岚脚磨砺手爪，再覆以武装色霸气

具有什么鲜明特征？
常戴狐面，话里藏满暗号谚语

驱动他们的梦想？
拆毁塑造他的 CP 机关体系

背景片段。
因拒绝屠灭援助萨博的村庄而叛逃，如今为龙传递天龙人情报。`,
  },
  {
    title: "海底主厨",
    description: "在漂浮餐厅舰队烹饪的鱼人厨师。",
    prompt: `角色名称？
珊瑚尚

所属船团或阵营？
巴拉蒂蔚蓝舰队

职务与战斗风格？
水下挥舞双菜刀的厨师剑舞者

掌握的恶魔果实或霸气？
鱼人空手道，辅以基础武装色

具有什么鲜明特征？
收藏贝壳香料，战斗时一边唱菜谱

驱动他们的梦想？
以和平宴会促成鱼人岛与地面签订盟约

背景片段。
曾任海神军炊事兵，为教人类尊重海底料理而踏上外交巡航。`,
  },
  {
    title: "空岛制图师",
    description: "探勘新世界气流的空岛制图师。",
    prompt: `角色名称？
云岚莲

所属船团或阵营？
草帽大船团合作测绘师

职务与战斗风格？
搭载贝壳机翼的空中射手

掌握的恶魔果实或霸气？
见闻色霸气与冲击贝强化射击

具有什么鲜明特征？
随身携带云瓶，记录旅途中听到的每首歌

驱动他们的梦想？
打造串联所有空岛的云轨道网

背景片段。
艾尼路败北后，她协助娜美绘制雷云航线，离开阿帕扬德拉追寻冒险。`,
  },
  {
    title: "和之国浪人",
    description: "游历和之国历史的浪人剑士。",
    prompt: `角色名称？
光月恭次

所属船团或阵营？
与赤鞘九侠并肩作战

职务与战斗风格？
操双大太刀的剑士史官

掌握的恶魔果实或霸气？
高阶武装色与霸王色火花

具有什么鲜明特征？
半件焦黑和服，常哼光月古谣

驱动他们的梦想？
把和之国复国史编写成外海流传的巨著

背景片段。
大蛇清洗时躲入歌舞伎团，如今回乡护送旅人并记录口述历史。`,
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
      { label: "老练角色", value: "veteran" },
      { label: "资深长者", value: "seasoned elder" },
      { label: "永恒传奇", value: "timeless legend" },
      { label: "实习船员", value: "cabin crew teen" },
      { label: "新晋海贼", value: "young pirate" },
      { label: "资深船员", value: "seasoned crew" },
      { label: "资深船长", value: "veteran captain" },
      { label: "传奇海贼", value: "legendary pirate" },
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
      { label: "黑色短发", value: "short black hair" },
      { label: "棕色长发", value: "long brown hair" },
      { label: "金发", value: "blonde hair" },
      { label: "红发", value: "red hair" },
      { label: "银发", value: "silver hair" },
      { label: "蓝发", value: "blue hair" },
      { label: "白发", value: "white hair" },
      { label: "编发", value: "braided hair" },
      { label: "薰衣草波浪发", value: "wavy lavender hair" },
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
      { label: "紫罗兰瞳", value: "violet eyes" },
      { label: "金色瞳", value: "golden eyes" },
    ],
  },
  {
    title: "表情",
    key: "face",
    data: [
      { label: "坚定神情", value: "determined expression" },
      { label: "微笑表情", value: "smiling expression" },
      { label: "严肃神情", value: "serious expression" },
      { label: "冷静面容", value: "stoic expression" },
      { label: "调皮笑容", value: "playful grin" },
      { label: "凌厉咆哮", value: "fierce snarl" },
      { label: "温暖微笑", value: "warm smile" },
    ],
  },
  {
    title: "肤色",
    key: "skin",
    data: [
      { label: "白皙肤色", value: "fair skin" },
      { label: "暖棕肤色", value: "tan skin" },
      { label: "橄榄肤色", value: "olive skin" },
      { label: "深棕肤色", value: "deep brown skin" },
      { label: "雀斑肤色", value: "freckled skin" },
      { label: "瓷白肤色", value: "porcelain skin" },
      { label: "日晒肤色", value: "sunburned skin" },
    ],
  },
  {
    title: "上装",
    key: "top",
    data: [
      { label: "机能夹克", value: "utility jacket" },
      { label: "多层外套", value: "layered coat" },
      { label: "休闲长衫", value: "casual tunic" },
      { label: "装甲马甲", value: "armored vest" },
      { label: "宽松衬衫", value: "loose shirt" },
      { label: "兜帽斗篷", value: "hooded cloak" },
      { label: "仪式长袍", value: "ceremonial robe" },
      { label: "海贼长外套", value: "pirate coat" },
      { label: "海军制服上衣", value: "marine uniform top" },
      { label: "革命军夹克", value: "revolutionary jacket" },
      { label: "鱼人和服", value: "fishman kimono" },
      { label: "空岛束衣", value: "sky island tunic" },
    ],
  },
  {
    title: "下装",
    key: "bottom",
    data: [
      { label: "工装长裤", value: "cargo trousers" },
      { label: "合身长裤", value: "fitted pants" },
      { label: "百褶裙", value: "pleated skirt" },
      { label: "战斗短裤", value: "battle shorts" },
      { label: "飘逸长袍", value: "flowing robes" },
      { label: "装甲护腿", value: "armored greaves" },
      { label: "层叠束带", value: "layered wraps" },
      { label: "条纹长裤", value: "striped trousers" },
      { label: "水手短裤", value: "sailor shorts" },
      { label: "远洋长裙", value: "high seas skirt" },
      { label: "粗犷牛仔裤", value: "rough denim" },
      { label: "海军长裤", value: "marine slacks" },
    ],
  },
  {
    title: "套装",
    key: "set",
    data: [
      { label: "战斗制服", value: "combat uniform" },
      { label: "旅人便装", value: "casual traveler outfit" },
      { label: "正式礼服", value: "formal attire" },
      { label: "潜行装备", value: "stealth gear" },
      { label: "庆典服饰", value: "festival outfit" },
      { label: "王族礼袍", value: "royal regalia" },
      { label: "浪人衣装", value: "nomad attire" },
      { label: "草帽风套装", value: "straw hat style" },
      { label: "海军军官套装", value: "marine officer set" },
      { label: "革命军套装", value: "revolutionary army set" },
      { label: "和之国武士套装", value: "wano samurai set" },
      { label: "空岛探险套装", value: "skypiea explorer" },
    ],
  },
  {
    title: "材质",
    key: "material",
    data: [
      { label: "织纹布料", value: "woven fabric" },
      { label: "抛光皮革", value: "polished leather" },
      { label: "强化装甲", value: "reinforced armor" },
      { label: "高科技纤维", value: "high-tech fiber" },
      { label: "有机织物", value: "organic weave" },
      { label: "龙皮", value: "dragonhide" },
      { label: "秘法布", value: "mystic cloth" },
      { label: "风蚀帆布", value: "weather worn canvas" },
      { label: "海军抛光布", value: "marine polished cloth" },
      { label: "和之国绸缎", value: "wano silk" },
      { label: "鱼人鳞片织料", value: "fishman scales" },
      { label: "空云纤维", value: "sky cloud fiber" },
    ],
  },
  {
    title: "配饰",
    key: "accessory",
    data: [
      { label: "机能腰带", value: "utility belt" },
      { label: "手套", value: "gloves" },
      { label: "围巾", value: "scarf" },
      { label: "头饰", value: "headgear" },
      { label: "饰品", value: "jewelry" },
      { label: "肩带弹匣", value: "bandolier" },
      { label: "航海典籍", value: "magic tome accessory" },
      { label: "草帽", value: "straw hat" },
      { label: "海军正义披风", value: "marine justice cape" },
      { label: "电传虫", value: "den den mushi" },
      { label: "记录指针", value: "log pose" },
      { label: "悬赏海报", value: "wanted poster" },
    ],
  },
  {
    title: "阵营",
    key: "op_faction",
    data: [
      { label: "海贼", value: "pirate" },
      { label: "海军", value: "marine" },
      { label: "革命军", value: "revolutionary" },
      { label: "赏金猎人", value: "bounty hunter" },
      { label: "天龙人", value: "world noble" },
    ],
  },
];

const examples = [
  {
    image:
      "https://cdn.ocmaker.app/example/one-piece-oc-maker-generated-1.webp",
    prompt:
      "1girl, long wavy blue hair, purple eyes, serious expression, customized navy uniform, torn cape, short shorts, thigh-high boots, seashell accessory, belt pouch, wind aura, dual blade pose, wind effect, pirate style, one piece style, fantasy outfit, looking at viewer, simple background, upper body",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/one-piece-oc-maker-generated-2.webp",
    prompt:
      "1boy, medium length dark red hair, sharp eyes, confident smile, young pirate captain, white open shirt, black coat, long pants, katana at waist, standing on ship deck, wind-blown cloak, battle-ready pose, one piece style, looking at viewer, simple background, upper body",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/one-piece-oc-maker-generated-3.webp",
    prompt:
      "1boy, muscular male, long black hair, red eyes, horns, mustache, angry expression, shirtless, open long coat, dragon tattoo, holding kanabo, one piece style, kaido (one piece), looking at viewer, simple background, upper body",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/one-piece-oc-maker-generated-4.webp",
    prompt:
      "1boy, muscular male, tall male, white mustache, slicked back white hair, stern expression, shirtless, open coat, captain's coat, white coat with red interior, holding bisento, attack pose, scars on chest, gold epaulettes, pirate hat (removed), one piece style, looking at viewer, simple background, upper body",
  },
];

export default {
  meta: {
    title: "航海王 OC 角色生成器",
    description:
      "借助 AI 打造你的《航海王》原创角色，设定船团、霸气与冒险梦想。",
  },
  series: "航海王",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "航海王 OC 生成器",
      description: "输入角色设定，几秒内生成热血海贼或海军形象。",
    },
    step: {
      title: "如何打造 One Piece OC",
      description:
        "使用 OC 生成器 创作航海王角色非常简单，依照以下步骤让冒险伙伴扬帆起航。",
      steps: [
        {
          title: "描述你的航海王 OC",
          description:
            "先写角色外貌与性格，加入夸张发型、海贼装束与寻宝心志，让气质贴近航海王世界。",
        },
        {
          title: "补充航海元素",
          description:
            "进一步说明恶魔果实能力、所属船团或特制武器。细节越接近伟大航路的冒险，生成越精准。",
        },
        {
          title: "生成并挑选设计",
          description:
            "点击“生成角色”，即可获得多张 AI 设计，选出最符合梦想航海的伙伴。",
        },
      ],
    },
    examples: {
      title: "One Piece  OC 示例",
      description: "浏览使用 航海王 OC 生成器 文本提示生成的海贼角色。",
      examples,
    },
    features: {
      title: "航海王 OC 生成器 的特色",
      description:
        "为航海王世界量身打造，助你快速创建拥有霸气与梦想的原创冒险者。",
      features: [
        {
          label: "正统航海王画风",
          description:
            "人物比例、服装细节与表情张力皆贴近原作的热血感与夸张表现。",
        },
        {
          label: "海贼主题调参",
          description:
            "提示词针对恶魔果实、船团风格与岛屿文化优化，轻松产出可信设定。",
        },
        {
          label: "高速角色生成",
          description: "数秒内完成图像，专注在补完角色故事与航海伙伴关系。",
        },
        {
          label: "高品质视觉效果",
          description:
            "AI 提供高解析度插画，可直接用于同人创作、剧情策划或分享。",
        },
        {
          label: "多版本选择",
          description: "每次生成都有不同造型，挑出符合你船团定位的最佳人选。",
        },
        {
          label: "深度世界连结",
          description:
            "结合背景故事、船员互动与势力冲突，让角色自然融入伟大航路。",
        },
      ],
    },
    faqs: {
      title: "常见问题",
      description: "还有疑问？欢迎写信至 support@ocmaker.app",
      faqs: [
        {
          question: "什么是 航海王 OC 生成器？它如何运作？",
          answer:
            "航海王 OC 生成器 是为航海王世界调校的 OC 生成器。描述角色设定，AI 会在数秒内生成航海王风格的动漫图像。",
        },
        {
          question: "如何让 航海王 OC 生成器 生成更出色的角色？",
          answer:
            "建议写明恶魔果实能力、海贼船团或特制武器等细节。越生动具体，成果就越贴近你的想像。",
        },
        {
          question: "航海王 OC 生成器 是否免费？",
          answer:
            "是的，核心功能免费。若需要更快速度、更多控制或进阶功能，可随时升级方案。",
        },
        {
          question: "为什么 航海王 OC 生成器 的成果如此精彩？",
          answer:
            "我们使用针对航海王画风与冒险氛围训练的模型，确保角色外观与气质都符合作品特色。",
        },
        {
          question: "我能商业使用 航海王 OC 生成器 生成的角色吗？",
          answer:
            "可以，你创作的原创角色完全归你所有，可用于个人或商业计划，我们不会主张所有权。",
        },
        {
          question: "使用 航海王 OC 生成器 需要帐号吗？",
          answer:
            "基础体验无需帐号。注册后可以保存角色、查看历史纪录，并解锁更多功能。",
        },
        {
          question: "可以重新生成或微调同一个角色吗？",
          answer:
            "当然！你能用相同提示重新生成，或微调描述直到角色完全符合你的愿景。",
        },
        {
          question: "未来还会推出其他动漫主题的 OC 生成器 吗？",
          answer:
            "会的！我们计划扩充更多动漫与冒险世界的生成器，敬请关注 ocmaker.app 的最新消息。",
        },
      ],
    },
    cta: {
      title: "创造你的航海王原创角色",
      description: "无需绘画技巧，只要描绘梦想，就能让冒险伙伴现身。",
      btns: {
        start: "开始创作",
        explore: "浏览角色",
      },
    },
  },
};
