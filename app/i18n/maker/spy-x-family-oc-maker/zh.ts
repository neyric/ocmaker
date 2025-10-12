const basePrompt = `
  WORLD CONTEXT:
  故事：《间谍过家家》
  背景概述：西国与东国的冷战角力、暗中行动、贵族学校、双重身份与谍战喜剧
  关键阵营：WISE 情报局、东国国家保安局 SSS、园丁暗杀组织、伊甸学园名流、戴斯蒙政治网络、情报黑市、西国外交渠道

  OUTPUT FORMAT:
  姓名、伪装身份与真实身份、所属机构／阵营、招牌技能或能力、性格、任务目标、背景片段

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "WISE 幕后联络员",
    description: "潜伏在伊甸学园担任礼仪老师的 WISE 协调员。",
    prompt: `角色名称？
莉娜·哈特曼

伪装身份与真实身份？
表面是伊甸学园礼仪教师，真实身份是 WISE 幕后联络员

所属机构或阵营？
WISE

招牌技能或能力？
读唇高手、袖珍相机钢笔、基础防身术

性格？
沉着机智，带点冷幽默

任务目标？
透过教职会议搜集戴斯蒙家族动向

背景片段。
曾揭发伪造债券而被 WISE 看上，如今在伊甸内部统筹“斯翠克斯行动”的一线情报。`,
  },
  {
    title: "园丁清道夫",
    description: "伪装为高档花店老板的园丁杀手。",
    prompt: `角色名称？
伊莉丝·纳赫特

伪装身份与真实身份？
表面是精品花店主理，真实身份是园丁清道夫

所属机构或阵营？
园丁

招牌技能或能力？
毒刺暗器、近身合气道、隐藏钢丝

性格？
对友人温柔，对任务冷酷

任务目标？
暗杀企图破坏西东和平谈判的政变首脑

背景片段。
为了报仇被园丁主任收留，如今以花束为掩护递送暗藏刀刃的礼物。`,
  },
  {
    title: "SSS 分析官",
    description: "装成社会版记者四处嗅探间谍的国家保安官员。",
    prompt: `角色名称？
马库斯·魏斯

伪装身份与真实身份？
表面是社交杂志专栏作家，真实身份是 SSS 分析官

所属机构或阵营？
国家保安局（SSS）

招牌技能或能力？
音频监控、伪装道具、格斗训练

性格？
多疑自负，却难掩孤独

任务目标？
揪出潜伏在伊甸学园的 WISE 卧底

背景片段。
因兄长死于外国间谍而执念爆发，发誓要清除东国境内的敌对探员。`,
  },
  {
    title: "黄昏的学徒",
    description: "在日托所工作的 WISE 天才新人。",
    prompt: `角色名称？
妮娜·霜

伪装身份与真实身份？
表面是托儿所照护员，真实身份是 WISE 外勤探员

所属机构或阵营？
WISE

招牌技能或能力？
瞬间记忆、微型无人机、共情训练

性格？
开朗聪敏、内心坚定

任务目标？
监控伊甸学生社交圈，预防潜在威胁

背景片段。
曾在难民危机中被黄昏救下，坚持受训只为守护更多孩童。`,
  },
  {
    title: "黑市情报贩",
    description: "为 WISE 与园丁同时供货的中立线人。",
    prompt: `角色名称？
菲利克斯·诺瓦

伪装身份与真实身份？
表面是爵士酒馆老板，真实身份是黑市情报中介

所属机构或阵营？
以中立身份与 WISE、园丁皆保持联络

招牌技能或能力？
情报交易、庇护网络、藏匿武器的手杖

性格？
迷人务实、道德灰色地带

任务目标？
维持柏林特地下秩序，保护收养的街童

背景片段。
出身孤儿街头，如今靠买卖情报换取和平，使暴力远离自己的社区。`,
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
      { label: "少年间谍", value: "youth agent" },
      { label: "年轻特工", value: "young operative" },
      { label: "资深情报员", value: "seasoned operative" },
      { label: "地下老练者", value: "underworld veteran" },
      { label: "传说级特工", value: "legendary agent" },
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
      { label: "西装外套", value: "formal blazer" },
      { label: "风衣", value: "trench coat" },
      { label: "战术背心", value: "tactical vest" },
      { label: "酒吧背心", value: "speakeasy vest" },
      { label: "学园制服外套", value: "academy jacket" },
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
      { label: "飘逸长裙", value: "flowing robes" },
      { label: "装甲护腿", value: "armored greaves" },
      { label: "层叠束带", value: "layered wraps" },
      { label: "西装长裤", value: "tailored trousers" },
      { label: "情报腰包", value: "utility slacks" },
      { label: "潜行裤装", value: "stealth leggings" },
      { label: "侦探裤裙", value: "detective skirt" },
      { label: "社交礼裙下摆", value: "soirée hem" },
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
      { label: "WISE 外勤套装", value: "wise operative set" },
      { label: "园丁夜行套装", value: "garden cleaner set" },
      { label: "伊甸教员套装", value: "eden faculty set" },
      { label: "东国官员套装", value: "ostania officer set" },
      { label: "黑市斡旋套装", value: "underworld broker set" },
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
      { label: "防弹纤维", value: "ballistic fiber" },
      { label: "丝绒礼服料", value: "velvet formal" },
      { label: "风衣棉布", value: "trench cotton" },
      { label: "隐藏衬网", value: "concealment mesh" },
      { label: "间谍合成材", value: "spy composite" },
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
      { label: "情报手册", value: "magic tome accessory" },
      { label: "钢笔摄像机", value: "camera pen" },
      { label: "伪装眼镜", value: "disguise glasses" },
      { label: "隐藏匕首", value: "concealed dagger" },
      { label: "密码盒", value: "cipher case" },
      { label: "安全无线电", value: "secure radio" },
    ],
  },
];

const examples = [
  {
    image: "https://cdn.ocmaker.app/example/spyxfamily-oc-generated-1.webp",
    prompt:
      "1girl, brunette hair, hazel eyes, confident smile, spy x family style formal outfit, hidden dagger brooch, elegant pose, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/spyxfamily-oc-generated-2.webp",
    prompt:
      "1boy, ash blonde hair, blue eyes, composed expression, spy x family style trench coat, leather gloves, satchel, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/spyxfamily-oc-generated-3.webp",
    prompt:
      "1girl, black hair in bob cut, red eyes, assassin outfit under floral apron, holding bouquet, spy x family style, graceful pose, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/spyxfamily-oc-generated-4.webp",
    prompt:
      "1boy, wavy brown hair, green eyes, jazz club attire, cane with hidden weapon, charming smirk, spy x family style, upper body, looking at viewer, anime style, simple background",
  },
];

export default {
  meta: {
    title: "间谍过家家 OC 角色生成器",
    description:
      "借助 AI 打造你的《间谍过家家》原创角色，设定双重身份、特工技能与暖心任务。",
  },
  series: "间谍过家家",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "SPY×FAMILY OC Maker",
      description: "输入角色设定，瞬间生成兼具谍战与家庭气息的原创人物。",
    },
    step: {
      title: "如何打造 SPY×FAMILY OC",
      description:
        "想在柏林特的暗处守护和平？按照以下步骤建立你的双面人生。",
      steps: [
        {
          title: "确定身份与伪装",
          description:
            "先决定角色在台面上的伪装职业与真正的特工身分，例如老师、记者、杀手或情报贩子。",
        },
        {
          title: "描绘技能与关系",
          description:
            "描述他们的招牌技能、装备、性格与任务目标，并思考与家庭、同伴或敌人的关系。",
        },
        {
          title: "生成双面角色",
          description:
            "点击“生成角色”，即可获得数张 AI 图像，挑出最符合间谍喜剧氛围的设定。",
        },
      ],
    },
    examples: {
      title: "间谍角色示例",
      description: "浏览使用 SPY×FAMILY OC Maker 文本提示生成的潜伏角色。",
      examples,
    },
    features: {
      title: "SPY×FAMILY OC Maker 的特色",
      description:
        "为冷战谍战与家庭喜剧调性量身打造，呈现多面向的原创角色。",
      features: [
        {
          label: "正统谍战画风",
          description:
            "角色服装、姿态与表情贴近作品中优雅又紧张的氛围。",
        },
        {
          label: "双重身份支持",
          description:
            "AI 理解 WISE、SSS、园丁与黑市等势力，轻松生成双面设定。",
        },
        {
          label: "快速角色生成",
          description:
            "几个瞬间即可看到角色样貌，把时间留给故事与家庭互动。",
        },
        {
          label: "高品质动漫呈现",
          description:
            "模型针对间谍过家家风格训练，提供细腻且富有情绪的画面。",
        },
        {
          label: "多样造型挑选",
          description:
            "每次生成提供不同伪装与外勤姿势，挑选最符合剧情的设定。",
        },
        {
          label: "兼顾暖心与谍战",
          description:
            "角色自然同时具备任务使命与温柔羁绊，维持作品的独特魅力。",
        },
      ],
    },
    faqs: {
      title: "常见问题",
      description: "还有疑问？欢迎写信至 support@ocmaker.app",
      faqs: [
        {
          question: "什么是 SPY×FAMILY OC Maker？它如何运作？",
          answer:
            "SPY×FAMILY OC Maker 是专为《间谍过家家》打造的 AI 工具。描述角色外貌、身份与任务，AI 会在数秒内生成作品风格的图像。",
        },
        {
          question: "要如何让 SPY×FAMILY OC Maker 生成更精彩的角色？",
          answer:
            "提示中加入伪装职业、真实阵营、特工技能与人际关系等细节，越贴近作品的谍战家庭调性越好。",
        },
        {
          question: "SPY×FAMILY OC Maker 是否免费？",
          answer:
            "是的，基础功能免费使用。进阶方案提供更快生成速度与更多自订选项。",
        },
        {
          question: "为什么 SPY×FAMILY OC Maker 的成果如此贴切？",
          answer:
            "模型针对作品的画风与情绪训练，掌握冷战谍报与家庭喜剧的平衡感。",
        },
        {
          question: "我能商业使用 SPY×FAMILY OC Maker 生成的角色吗？",
          answer:
            "可以，你的原创角色完全归你所有，可用于个人或商业计划，我们不会主张所有权。",
        },
        {
          question: "使用 SPY×FAMILY OC Maker 需要帐号吗？",
          answer:
            "基础体验无需帐号。注册后可保存角色、查看历史记录，并解锁更多功能。",
        },
        {
          question: "可以创建不同阵营或职业的角色吗？",
          answer:
            "当然！无论是 WISE 间谍、SSS 特务、园丁刺客还是黑市中人，都能轻松生成。",
        },
        {
          question: "未来会新增其他谍战或家庭题材的 OC Maker 吗？",
          answer:
            "会的！我们计划扩展更多风格的原创角色生成器，敬请持续关注。",
        },
      ],
    },
    cta: {
      title: "开启你的双面任务",
      description: "无需绘画基础，只要设定好伪装与秘密，就能与福杰一家共享精彩行动。",
      btns: {
        start: "开始创作",
        explore: "浏览角色",
      },
    },
  },
};

