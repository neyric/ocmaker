const basePrompt = `
  WORLD CONTEXT:
  故事：《我推的孩子》
  背景概述：日本演艺产业、偶像文化、经纪公司、真人实境节目、社群丑闻与复仇暗流
  关键圈层：B 小町、草莓制作、拉拉莱剧团、竞争偶像团体、电视剧导演、网路影响者、八卦记者

  OUTPUT FORMAT:
  姓名、演艺身份、所属经纪／单位、招牌舞台才能、性格、公众人设与真实自我、背景片段

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "冉升偶像",
    description: "一边直播一边排练的 Center 偶像。",
    prompt: `角色名称？
白须爱子

演艺身份？
偶像团体 StarDazzle 的 Center

所属经纪或单位？
草莓制作

招牌舞台才能？
把芭蕾底子与 J-pop 元素融合的双线编舞

性格？
勤奋真诚，却总被完美主义追着跑

公众人设与真实自我？
台上永远活力满分又无懈可击；私下担心粉丝会识破自己的冒名者心态

背景片段。
当年临危顶替演唱被露比相中，如今靠偶像收入支撑家计并维持学业。`,
  },
  {
    title: "方法派演员",
    description: "以沉浸式演技和直率访谈闻名的演员。",
    prompt: `角色名称？
黑泽莲

演艺身份？
电视与舞台剧演员

所属经纪或单位？
拉拉莱剧团

招牌舞台才能？
融合即兴与情绪记忆的方法演技

性格？
富有魅力、强烈，却意外温柔

公众人设与真实自我？
大众眼中是疏离的明星；私底下是收藏怀旧游戏的宅男

背景片段。
在 Aqua 指导下完成复仇惊悚片试镜，从童星丑闻中翻身为实力派。`,
  },
  {
    title: "爆红影响者",
    description: "把偶像纪律导入直播的网红。",
    prompt: `角色名称？
美香流音

演艺身份？
多平台实况主与兼职偶像合作人

所属经纪或单位？
由 MEM-cho 统筹的独立网红团队

招牌舞台才能？
互动式即时剪辑与搞笑短剧

性格？
混乱又机智，其实观察入微

公众人设与真实自我？
对外是无忧的迷因女王；私底下担心过劳与创作耗尽

背景片段。
在慈善直播中被 MEM-cho 发掘，随即加入草莓制作的联动节目。`,
  },
  {
    title: "匿名词人",
    description: "为对手偶像创作匿名神曲的作词人。",
    prompt: `角色名称？
夜凪枫

演艺身份？
幽灵词曲作者兼伴唱

所属经纪或单位？
与 B 小町制作人合作的自由接案者

招牌舞台才能？
写出映照粉丝隐秘不安的歌词

性格？
内向敏锐，被逼急时言语尖锐

公众人设与真实自我？
对外声明是多位作家团队；私下把创伤倾注在每段歌词里

背景片段。
因网暴离开业界，因爱老师的遗产而改笔名重返创作。`,
  },
  {
    title: "偶像编舞师",
    description: "用严厉与温柔培育后辈的退休偶像。",
    prompt: `角色名称？
南樱

演艺身份？
编舞与训练导师

所属经纪或单位？
草莓制作训练部

招牌舞台才能？
把武术节奏融合进偶像舞蹈的混合编排

性格？
自律、支持他人、如同妈妈

公众人设与真实自我？
外界眼中是严格教官；私下会为每位练习生写鼓励信

背景片段。
膝伤退役后，为延续爱老师的精神重返练习室指导新人。`,
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
      { label: "见习偶像", value: "junior idol" },
      { label: "校园明星", value: "high school star" },
      { label: "成人舞台人", value: "adult performer" },
      { label: "资深前辈", value: "industry veteran" },
      { label: "传奇偶像", value: "legendary icon" },
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
      { label: "宽松上衣", value: "loose shirt" },
      { label: "兜帽斗篷", value: "hooded cloak" },
      { label: "仪式长袍", value: "ceremonial robe" },
      { label: "舞台偶像上装", value: "idol stage blouse" },
      { label: "戏剧演员夹克", value: "drama actor jacket" },
      { label: "主播连帽衫", value: "streamer hoodie" },
      { label: "经纪人西装外套", value: "manager blazer" },
      { label: "高级定制上衣", value: "designer couture" },
    ],
  },
  {
    title: "下装",
    key: "bottom",
    data: [
      { label: "工装长裤", value: "cargo trousers" },
      { label: "合身长裤", value: "fitted pants" },
      { label: "百褶裙", value: "pleated skirt" },
      { label: "表演短裤", value: "battle shorts" },
      { label: "飘逸长裙", value: "flowing robes" },
      { label: "装甲护腿", value: "armored greaves" },
      { label: "层叠束带", value: "layered wraps" },
      { label: "舞台短裙", value: "stage skirt" },
      { label: "演出短裤", value: "performance shorts" },
      { label: "时髦长裤", value: "stylish slacks" },
      { label: "休闲牛仔裤", value: "casual jeans idol" },
      { label: "礼服裙摆", value: "elegant gown hem" },
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
      { label: "祭典服饰", value: "festival outfit" },
      { label: "王族礼袍", value: "royal regalia" },
      { label: "浪人衣装", value: "nomad attire" },
      { label: "B 小町舞台装", value: "b komachi stage set" },
      { label: "演员红毯装", value: "actor red carpet set" },
      { label: "综艺节目造型", value: "variety show set" },
      { label: "地下偶像装", value: "underground idol set" },
      { label: "经纪人套装", value: "agency manager set" },
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
      { label: "亮片布料", value: "sequined fabric" },
      { label: "舞台闪光网纱", value: "stage sparkle mesh" },
      { label: "棚内牛仔布", value: "studio denim" },
      { label: "真丝高级定制", value: "silk couture" },
      { label: "LED 纤维", value: "led fiber" },
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
      { label: "肩带", value: "bandolier" },
      { label: "练习手册", value: "magic tome accessory" },
      { label: "舞台麦克风", value: "stage microphone" },
      { label: "耳返", value: "in ear monitor" },
      { label: "演员台本", value: "actor script" },
      { label: "应援灯棒", value: "fan lightstick" },
      { label: "社群直播手机", value: "social media phone" },
    ],
  },
];

const examples = [
  {
    image:
      "https://cdn.ocmaker.app/example/oshi-no-ko-oc-maker-generated-1.webp",
    prompt:
      "1girl, long blonde hair, star-shaped pupils, confident smile, oshi no ko style idol outfit, microphone, stage lights, sparkling effects, anime style, looking at viewer, simple background, upper body",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/oshi-no-ko-oc-maker-generated-2.webp",
    prompt:
      "1boy, dark purple hair, star eyes, serious expression, oshi no ko style actor outfit, script in hand, entertainment industry setting, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/oshi-no-ko-oc-maker-generated-3.webp",
    prompt:
      "1girl, pink hair with side ponytail, aqua star eyes, cheerful expression, oshi no ko style school uniform with idol accessories, phone in hand, social media influencer vibe, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/oshi-no-ko-oc-maker-generated-4.webp",
    prompt:
      "1girl, silver hair, ruby star eyes, mysterious smile, oshi no ko style producer outfit, tablet and headset, behind-the-scenes professional, single character, upper body, looking at viewer, anime style, simple background",
  },
];

export default {
  meta: {
    title: "我推的孩子 OC 角色生成器",
    description:
      "借助 AI 打造你的《我推的孩子》原创角色，谱写偶像、演员与幕后人员的闪耀与暗流。",
  },
  series: "我推的孩子",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Oshi no Ko OC Maker",
      description: "输入角色设定，瞬间生成演艺圈风格的华丽人设与造型。",
    },
    step: {
      title: "如何打造 Oshi no Ko OC",
      description:
        "打造演艺圈角色很简单，依照以下步骤让你的明星或幕后推手登场。",
      steps: [
        {
          title: "描述你的 Oshi no Ko OC",
          description:
            "填写外貌与性格细节，记得加入星形瞳孔、潮流穿搭与怀抱舞台野心的设定，更贴近作品风格。",
        },
        {
          title: "补上行业细节",
          description:
            "说明他们是偶像、演员、制作人或经纪人，以及独特才华与演艺连结。越贴合演艺生态，成果越真实。",
        },
        {
          title: "生成并定稿造型",
          description:
            "点击“生成角色”，即可获得多款 AI 设计，挑出最能闪耀舞台与银幕的那位。",
        },
      ],
    },
    examples: {
      title: "Oshi no Ko 角色示例",
      description: "浏览使用 Oshi no Ko OC Maker 文本提示生成的演艺圈角色。",
      examples,
    },
    features: {
      title: "Oshi no Ko OC Maker 的特色",
      description:
        "为演艺圈题材量身打造，助你快速塑造兼具光芒与阴影的原创角色。",
      features: [
        {
          label: "真实演艺设计感",
          description:
            "角色造型捕捉偶像与演员的华丽与复杂，兼顾舞台光芒与私下现实。",
        },
        {
          label: "专属提示调校",
          description:
            "针对星形瞳孔、舞台服装与剧组细节优化提示，更容易生成可信角色。",
        },
        {
          label: "快速角色产出",
          description: "数秒内看到角色全貌，把时间留给剧情与人际纠葛。",
        },
        {
          label: "高品质视觉输出",
          description:
            "AI 带来细腻的动漫风图像，适合用在剧本设定、同人创作或宣传。",
        },
        {
          label: "多结果筛选",
          description: "每次生成提供多种版本，挑选最符合人设的样貌与风格。",
        },
        {
          label: "深度故事整合",
          description:
            "结合背景故事、事业发展与演艺圈关系网，让角色自然融入闪耀舞台。",
        },
      ],
    },
    faqs: {
      title: "常见问题",
      description: "还有疑问？欢迎写信至 support@ocmaker.app",
      faqs: [
        {
          question: "什么是 Oshi no Ko OC Maker？它如何运作？",
          answer:
            "Oshi no Ko OC Maker 是为《我推的孩子》世界调校的 OC Maker。描述角色设定，AI 会在数秒内生成演艺圈风格的图像。",
        },
        {
          question: "要如何让 Oshi no Ko OC Maker 生成更精彩的角色？",
          answer:
            "在描述中加入星形瞳孔、演艺职务、舞台技能或适合演艺圈的性格。提示越具体，成果越贴近你的构想。",
        },
        {
          question: "Oshi no Ko OC Maker 是否免费？",
          answer:
            "是的，基础角色生成免费提供。若需更快产出或更高控制力，可升级进阶方案。",
        },
        {
          question: "为什么 Oshi no Ko OC Maker 的成果如此惊艳？",
          answer:
            "我们采用针对演艺题材与作品氛围训练的模型，确保角色造型与戏剧张力符合原作调性。",
        },
        {
          question: "我能商业使用 Oshi no Ko OC Maker 生成的角色吗？",
          answer:
            "可以，你创造的原创角色完全归你所有，可用于个人或商业计划，我们不会主张所有权。",
        },
        {
          question: "使用 Oshi no Ko OC Maker 需要帐号吗？",
          answer:
            "基础体验无需帐号。注册后可保存角色、查看生成纪录，并解锁更多功能。",
        },
        {
          question: "可以重新生成或微调同一个角色吗？",
          answer:
            "当然！你能用相同提示再次生成，或微调描述直到角色与人设完全吻合。",
        },
        {
          question: "未来还会推出其他动漫主题的 OC Maker 吗？",
          answer:
            "会的！我们计划扩增更多动漫世界的主题生成器，敬请关注 ocmaker.app。",
        },
      ],
    },
    cta: {
      title: "创造你的演艺之星",
      description: "不需绘画基础，只要写下梦想与人设，角色就能在聚光灯下闪耀。",
      btns: {
        start: "开始创作",
        explore: "浏览角色",
      },
    },
  },
};
