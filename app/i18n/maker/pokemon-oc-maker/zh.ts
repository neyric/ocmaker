const basePrompt = `
  WORLD CONTEXT:
  故事：《宝可梦》
  背景概述：从关都到帕底亚的各大地区、训练家旅程、道馆挑战、研究所、反派组织与联盟大会
  关键要素：训练家、博士、道馆馆主、冠军、反派团队（火箭队、熔岩队／海洋队、银河队、等离子队、闪焰队、骷髅队、星辰队）、探险家、华丽大赛偶像

  OUTPUT FORMAT:
  姓名、训练家／角色类型、故乡地区与关键地点、队伍擅长与王牌宝可梦、性格、目标（联盟／研究等）、旅程背景

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "卡洛斯天空王牌",
    description: "以优雅空战闻名的空中训练家。",
    prompt: `角色名称？
伊莉丝蒙克莱

训练家或角色类型？
卡洛斯空中训练家兼表演选手

故乡地区与关键地点？
卡洛斯，活跃于密阿雷市与青金湾

队伍擅长与王牌宝可梦？
擅长飞行属性，王牌是摔角鹰人

性格？
优雅勇敢，热衷刺激

目标？
为密阿雷塔庆典编排终极天空舞台

旅程背景片段。
曾在狂风暴雨中被摔角鹰人救下，如今透过华丽大赛教孩子们空战安全。`,
  },
  {
    title: "神奥神话研究员",
    description: "携化石宝可梦探索遗迹的学者。",
    prompt: `角色名称？
达里乌斯弗林特

训练家或角色类型？
考古学者与化石宝可梦训练家

故乡地区与关键地点？
神奥，常驻水脉市图书馆与枪之柱

队伍擅长与王牌宝可梦？
岩石／钢属性队伍，王牌护城龙

性格？
谨慎、博学、沉稳的英雄

目标？
证明阿尔宙斯传说与现代进化之间的联系

旅程背景片段。
曾在随意遗迹修复时与竹兰相遇，如今用化石伙伴记录神话影踪。`,
  },
  {
    title: "伽勒尔道馆挑战者",
    description: "把摇滚节奏带进道馆赛的音乐人。",
    prompt: `角色名称？
洛曦暴音

训练家或角色类型？
伽勒尔道馆挑战者兼乐手

故乡地区与关键地点？
伽勒尔，尖钉镇家乡与机擎市竞技场

队伍擅长与王牌宝可梦？
电／毒属性混合，王牌颤弦蝾螈

性格？
叛逆有魅力，对伙伴极度忠诚

目标？
击败丹帝并重振尖钉镇的音乐现场

旅程背景片段。
在彼尔斯与玛俐指导下，将车库乐团打造成道馆挑战的节奏战队。`,
  },
  {
    title: "阿罗拉试炼队长",
    description: "引导挑战者穿越丛林的试炼队长。",
    prompt: `角色名称？
琪亚妮

训练家或角色类型？
阿罗拉茂密丛林的试炼队长

故乡地区与关键地点？
阿罗拉，茂密丛林与宜野市

队伍擅长与王牌宝可梦？
草属性羁绊，王牌甜冷美后

性格？
热情开朗，极度守护自然

目标？
培育能疗愈究极异兽伤痕的药草

旅程背景片段。
在究极异兽入侵后重植丛林时，与甜冷美后结下伙伴缘分。`,
  },
  {
    title: "帕底亚实况主",
    description: "把寻宝与团战直播结合的网红。",
    prompt: `角色名称？
诺娃流光

训练家或角色类型？
帕底亚寻宝者兼对战直播主

故乡地区与关键地点？
帕底亚，穿梭第零区与雷文市

队伍擅长与王牌宝可梦？
龙／一般属性队伍，王牌摩托蜥

性格？
活力十足、好奇心旺盛，随时准备开播

目标？
直播见证下一件帕底亚至宝的诞生

旅程背景片段。
童年寻宝时遇见摩托蜥，如今与奈梅欧同行，向观众展示帕底亚的奇景。`,
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
      { label: "新手训练家", value: "young trainer" },
      { label: "道馆挑战者", value: "gym challenger" },
      { label: "资深训练家", value: "seasoned trainer" },
      { label: "四天王", value: "elite four" },
      { label: "宝可梦博士", value: "pokemon professor" },
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
      { label: "训练家外套", value: "trainer jacket" },
      { label: "道馆制服", value: "gym uniform" },
      { label: "华丽大赛礼服", value: "contest dress" },
      { label: "巡护员背心", value: "ranger vest" },
      { label: "研究员白袍", value: "research lab coat" },
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
      { label: "训练家短裤", value: "trainer shorts" },
      { label: "冒险长裤", value: "adventure trousers" },
      { label: "华丽大赛裙装", value: "contest skirt" },
      { label: "巡护员长裤", value: "ranger pants" },
      { label: "野外紧身裤", value: "field leggings" },
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
      { label: "道馆挑战装", value: "gym challenger outfit" },
      { label: "冠军装束", value: "champion attire" },
      { label: "华丽大赛偶像装", value: "contest idol set" },
      { label: "巡护员装备", value: "ranger gear" },
      { label: "博士探险装", value: "professor explorer set" },
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
      { label: "全天候面料", value: "weatherproof fabric" },
      { label: "华丽闪光布", value: "contest sparkle" },
      { label: "巡护员皮革", value: "ranger leather" },
      { label: "科技网布", value: "tech mesh" },
      { label: "精灵球钢材", value: "pokeball steel" },
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
      { label: "训练日志", value: "magic tome accessory" },
      { label: "精灵球腰带", value: "pokeball belt" },
      { label: "洛托姆手机", value: "rotom phone" },
      { label: "Z 水晶吊坠", value: "z crystal pendant" },
      { label: "徽章盒", value: "badge case" },
      { label: "图鉴", value: "pokedex" },
    ],
  },
  {
    title: "训练家风格",
    key: "trainer_type",
    data: [
      { label: "王牌训练家", value: "ace trainer" },
      { label: "华丽大赛协调员", value: "coordinator" },
      { label: "巡护员", value: "ranger" },
      { label: "研究员", value: "researcher" },
      { label: "道馆馆主", value: "gym leader" },
    ],
  },
];

const examples = [
  {
    image: "https://cdn.ocmaker.app/example/pokemon-oc-generated-1.webp",
    prompt:
      "1girl, brown hair, hazel eyes, confident smile, pokemon trainer outfit, pokemon league cap, pokeball belt, trainer gloves, pikachu on shoulder, adventure pose, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/pokemon-oc-generated-2.webp",
    prompt:
      "1boy, silver hair, blue eyes, serious expression, team rocket uniform, black and red outfit with 'R' logo, pokemon capture device, sneaky pose, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/pokemon-oc-generated-3.webp",
    prompt:
      "1girl, long green hair, emerald eyes, gentle smile, pokemon coordinator dress, contest ribbon accessories, graceful pose, pokemon contest stage background, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/pokemon-oc-generated-4.webp",
    prompt:
      "1boy, spiky red hair, orange eyes, determined grin, gym leader outfit, fire-type themed clothing, gym badge on jacket, confident stance, single character, upper body, looking at viewer, anime style, simple background",
  },
];

export default {
  meta: {
    title: "宝可梦 OC 角色生成器",
    description:
      "利用 AI 打造你的宝可梦原创角色，塑造训练家、馆主、队伍成员与协调者的冒险形象。",
  },
  series: "宝可梦",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Pokemon OC Maker",
      description: "输入设定，瞬间生成宝可梦世界风格的训练家与伙伴造型。",
    },
    step: {
      title: "如何打造 Pokemon OC",
      description:
        "踏上训练家旅程前，按照以下步骤设计理想的宝可梦角色。",
      steps: [
        {
          title: "选择训练家类型",
          description:
            "决定角色是训练家、道馆馆主、四天王、反派成员、协调员或培育家等，不同定位会影响服装与气质。",
        },
        {
          title: "设定外观与队伍",
          description:
            "描述角色的造型、服饰与擅长属性，记得写上王牌宝可梦、徽章、缎带或组织背景，让设定更真实。",
        },
        {
          title: "生成你的宝可梦伙伴",
          description:
            "点击“生成角色”，从多张 AI 图像中挑选最能展现冒险精神的训练家。",
        },
      ],
    },
    examples: {
      title: "宝可梦训练家示例",
      description: "浏览使用 Pokemon OC Maker 文本提示生成的精彩角色。",
      examples,
    },
    features: {
      title: "Pokemon OC Maker 的特色",
      description:
        "专注宝可梦世界观，打造拥有专属队伍与地区风格的原创训练家。",
      features: [
        {
          label: "正统宝可梦画风",
          description:
            "角色比例、服装与道具贴近宝可梦动画的经典视觉。",
        },
        {
          label: "多样训练家职业",
          description:
            "AI 理解馆主、四天王、协调员与反派成员等角色特征，呈现精准设定。",
        },
        {
          label: "快速角色生成",
          description:
            "几秒内完成设计，把时间留给队伍配置与旅程构思。",
        },
        {
          label: "高品质动漫绘制",
          description:
            "模型针对宝可梦美学训练，呈现高水准的动画风插画。",
        },
        {
          label: "多款方案挑选",
          description:
            "每次生成提供多种造型，可尝试不同服装、姿势与擅长属性。",
        },
        {
          label: "融入宝可梦世界",
          description:
            "角色自然呼应各地区文化、训练家装备与宝可梦伙伴主题。",
        },
      ],
    },
    faqs: {
      title: "常见问题",
      description: "还有疑问？欢迎写信至 support@ocmaker.app",
      faqs: [
        {
          question: "什么是 Pokemon OC Maker？它如何运作？",
          answer:
            "Pokemon OC Maker 是专门创造宝可梦原创角色的 AI 工具。描述角色外观、身份与擅长属性，AI 会生成经典宝可梦风格图像。",
        },
        {
          question: "如何让 Pokemon OC Maker 生成更贴切的角色？",
          answer:
            "请写入训练家等级（馆主、四天王等）、擅长属性、故乡地区、华丽大赛成就或所属组织，细节越多结果越好。",
        },
        {
          question: "Pokemon OC Maker 是否免费？",
          answer:
            "是的，核心功能免费。进阶方案提供更快生成、多种职业选项与高级自订工具。",
        },
        {
          question: "为什么 Pokemon OC Maker 的成果如此真实？",
          answer:
            "我们的模型针对宝可梦画风与世界观训练，理解训练家 archetype、地区美学与角色设计原则。",
        },
        {
          question: "我能商业使用 Pokemon OC Maker 生成的角色吗？",
          answer:
            "可以，你的原创训练家完全归你所有，可用于个人或商业计划，我们不会主张所有权。",
        },
        {
          question: "使用 Pokemon OC Maker 需要帐号吗？",
          answer:
            "基础体验无需帐号。注册后可保存角色、查看历史记录，并解锁宝可梦主题进阶功能。",
        },
        {
          question: "能否创建不同类型的训练家？",
          answer:
            "当然！无论是道馆馆主、四天王、协调员、火箭队成员或培育家，都能透过提示轻松生成。",
        },
        {
          question: "未来会新增其他动漫主题的 OC Maker 吗？",
          answer:
            "会的！我们持续扩展更多动漫与游戏世界的专属生成器，敬请关注最新更新。",
        },
      ],
    },
    cta: {
      title: "踏上你的宝可梦旅程",
      description: "无需绘画技巧，只要想像与描述，就能开启专属冒险伙伴。",
      btns: {
        start: "开始创作",
        explore: "浏览角色",
      },
    },
  },
};

