const basePrompt = `
  WORLD CONTEXT:
  故事：迪士尼动画世界
  背景概述：从童话王国到现代冒险，动物国度与魔法森林齐聚，洋溢奇趣与温暖主题
  关键元素：皇家宫廷、勇敢冒险者、经典反派、深受喜爱的搭档、音乐叙事、会说话的动物、寓意深刻的教训

  OUTPUT FORMAT:
  姓名、家乡／王国、角色定位（英雄／反派／搭档等）、标志性伙伴或魔法、性格、愿望或领悟、背景片段

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "极光的新守护者",
    description: "以歌声守护魔法生灵的森林巡护员。",
    prompt: `角色名称？
艾洛雯·光芒

她的家乡或王国？
毗邻阿多尔王国的魔魅荒原

她的角色定位？
英勇守护者

她的标志性伙伴或魔法？
会发光的云雀伙伴，与她合声施展守护咒

她的性格？
温柔、热爱冒险，永远充满惊奇

她的愿望或领悟？
证明善意能驯服任何黑暗森林

分享一段背景片段。
风暴中与商队失散，被精灵抚养长大；如今引导旅人穿越闪耀林海。`,
  },
  {
    title: "变身搭档",
    description: "调皮的浣熊少年，以街头智慧助人。",
    prompt: `角色名称？
罗瑞·斯威夫特

他的家乡或王国？
璨光王国的繁华王都「皇冠城」

他的角色定位？
爱搞怪的英雄搭档兼小偷侠

他的标志性伙伴或魔法？
幸运硬币，可与任何小动物互换位置

他的性格？
机智、爱玩，对朋友绝对忠诚

他的愿望或领悟？
归还当初偷来的硬币，获得真正的原谅

分享一段背景片段。
盗走王室宝物后被诅咒成浣熊，直到公主教他诚实并给予第二次机会。`,
  },
  {
    title: "海上女反派",
    description: "向水手兜售捷径梦想的海巫企业家。",
    prompt: `角色名称？
米雷拉·潮音船长

她的家乡或王国？
迷雾暗礁上的漂浮市集

她的角色定位？
魅力反派

她的标志性伙伴或魔法？
「潮汐账本」实现愿望，却以记忆为代价

她的性格？
迷人、心思缜密，内心暗藏孤独

她的愿望或领悟？
重建被风暴吞噬的家族船只

分享一段背景片段。
亲眼目睹渔村被漩涡吞没后投身契约魔法，如今在海上贩售改命契约。`,
  },
  {
    title: "皇家发明家",
    description: "设计音乐机关为庆典带来欢乐的公主。",
    prompt: `角色名称？
公主杜松

她的家乡或王国？
钟鸣之国·贝萝莉亚

她的角色定位？
发明家公主兼英雄

她的标志性伙伴或魔法？
为发明提供动能的发条小龙伙伴

她的性格？
乐观、创意十足、坚定不移

她的愿望或领悟？
证明创意与血统同样高贵

分享一段背景片段。
发明了调和乐曲的机关，让交战公国的战歌融为一体，从而终止战争。`,
  },
  {
    title: "沙漠说书人",
    description: "在沙漠月光下让故事跃然成真的吟游诗人。",
    prompt: `角色名称？
萨希尔·艾法耶

他的家乡或王国？
毗邻阿格拉巴的绿洲城邦

他的角色定位？
乐观英雄说书人

他的标志性伙伴或魔法？
投射立体故事的奇幻灯笼

他的性格？
暖心、共情力强、想象力无限

他的愿望或领悟？
让传奇永存，让英雄永远被记住

分享一段背景片段。
从旅商学得故事，如今乘飞毯巡游，为偏远村落带来希望。`,
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
      { label: "年轻冒险者", value: "young adventurer" },
      { label: "皇家少年", value: "royal teen" },
      { label: "勇敢成年人", value: "brave adult" },
      { label: "睿智导师", value: "wise mentor" },
      { label: "永恒魔法生灵", value: "timeless magical being" },
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
      { label: "皇家紧身上衣", value: "royal bodice" },
      { label: "英雄束腰上衣", value: "heroic tunic" },
      { label: "探险衬衫", value: "explorer blouse" },
      { label: "反派斗篷", value: "villain cape" },
      { label: "动物搭档马甲", value: "animal sidekick vest" },
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
      { label: "舞会裙摆", value: "ballgown skirts" },
      { label: "冒险长裤", value: "adventure trousers" },
      { label: "飘逸礼裙", value: "flowing dress" },
      { label: "水手短裤", value: "sailor shorts" },
      { label: "魔法鱼尾光辉", value: "magical tail shimmer" },
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
      { label: "魔法皇室套装", value: "enchanted royal set" },
      { label: "英雄冒险装", value: "hero quest outfit" },
      { label: "反派套组", value: "villainous ensemble" },
      { label: "森林探险装", value: "forest explorer set" },
      { label: "童话庆典服", value: "fairy tale festival" },
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
      { label: "闪耀缎面", value: "sparkling satin" },
      { label: "皇家锦缎", value: "royal brocade" },
      { label: "冒险皮革", value: "adventure leather" },
      { label: "精灵粉末光辉", value: "pixie dust shimmer" },
      { label: "雪花蕾丝", value: "snowflake lace" },
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
      { label: "魔法手册", value: "magic tome accessory" },
      { label: "魔法皇冠", value: "magic tiara" },
      { label: "冒险挎包", value: "quest satchel" },
      { label: "搭档伙伴", value: "sidekick companion" },
      { label: "许愿灯笼", value: "wishing lantern" },
      { label: "反派魔法书", value: "villain spellbook" },
    ],
  },
];

const examples = [
  {
    image: "https://cdn.ocmaker.app/example/disney-oc-generateds-1.webp",
    prompt:
      "1girl, flowing auburn hair, bright blue eyes, enchanted forest dress, magical sparkles, kind smile, Disney princess style, woodland animals nearby, looking at viewer, simple background, upper body",
  },
  {
    image: "https://cdn.ocmaker.app/example/disney-oc-generateds-2.webp",
    prompt:
      "1boy, golden blonde hair, charming smile, royal prince outfit, cape, confident pose, Disney prince style, single character, upper body, looking at viewer, castle background, animated style",
  },
  {
    image: "https://cdn.ocmaker.app/example/disney-oc-generateds-3.webp",
    prompt:
      "1girl, curly dark hair with flowers, warm brown eyes, tropical island dress, seashell accessories, adventurous expression, Disney style, ocean background, looking at viewer, upper body",
  },
  {
    image: "https://cdn.ocmaker.app/example/disney-oc-generateds-4.webp",
    prompt:
      "1girl, silver hair in elegant updo, ice blue eyes, winter gown with snowflake patterns, ice magic effects, serene expression, Disney frozen style, looking at viewer, simple background, upper body",
  },
];

export default {
  meta: {
    title: "迪士尼 OC 角色生成器",
    description: "借助 AI 打造你的迪士尼原创角色，编织魔法故事与永恒冒险。",
  },
  series: "迪士尼",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "迪士尼 OC 生成器",
      description: "输入角色设定，即刻生成迪士尼动画风格的魔法角色与故事。",
    },
    step: {
      title: "如何打造 Disney OC",
      description: "创造迪士尼角色如同童话般奇妙，依照以下步骤点亮你的灵感。",
      steps: [
        {
          title: "确定角色类型",
          description:
            "他们是公主、王子、反派、搭档还是魔法生物？思考角色在迪士尼世界中的位置与独特之处。",
        },
        {
          title: "刻画魔法外观",
          description:
            "描述外貌、魔法能力与标志服饰，加入流动长发、明亮双眼或魔法饰品等经典元素。",
        },
        {
          title: "生成你的迪士尼魔法",
          description:
            "点击“生成角色”，从多张 AI 设计中挑选最具魅力的一幅，完成属于你的迪士尼角色。",
        },
      ],
    },
    examples: {
      title: "迪士尼 OC 示例",
      description: "看看使用 迪士尼 OC 生成器 文本提示生成的魔法角色。",
      examples,
    },
    features: {
      title: "迪士尼 OC 生成器 的亮点",
      description:
        "专注迪士尼经典美学，帮助你打造拥有魔法与温暖故事的原创角色。",
      features: [
        {
          label: "正统迪士尼画风",
          description: "角色神情、线条与光彩贴近迪士尼动画的标志魅力。",
        },
        {
          label: "魔法元素理解",
          description:
            "AI 熟悉童话主题、动物伙伴与魔法设定，让角色自然融入迪士尼宇宙。",
        },
        {
          label: "闪电般的灵感实现",
          description:
            "数秒即可看到动人的角色图像，专心发展他们的冒险与成长吧。",
        },
        {
          label: "高品质动画视觉",
          description:
            "输出的图像承袭迪士尼的温暖色调与细腻光影，适合创作与分享。",
        },
        {
          label: "多重造型尝试",
          description: "每次生成提供不同服饰与魔法特效，轻松探索角色的另一面。",
        },
        {
          label: "迪士尼世界整合",
          description:
            "角色自然而然地融入童话王国、森林之心或海洋篇章中，故事潜力十足。",
        },
      ],
    },
    faqs: {
      title: "常见问题",
      description: "还有疑问？欢迎来信 support@ocmaker.app",
      faqs: [
        {
          question: "什么是 迪士尼 OC 生成器？如何运作？",
          answer:
            "迪士尼 OC 生成器 是专为迪士尼风格打造的 AI 工具。描述角色外貌、角色定位与魔法要素后，即可生成动画感十足的图像。",
        },
        {
          question: "如何让角色更具迪士尼魅力？",
          answer:
            "加入魔法能力、童话主题、角色定位（公主、反派等）与经典视觉元素，细节越丰富越好。",
        },
        {
          question: "可以免费使用吗？",
          answer:
            "可以。基础功能免费；升级方案可获得更快速度、进阶特效与更多自订选项。",
        },
        {
          question: "为何生成结果如此梦幻？",
          answer:
            "我们针对迪士尼的美术与叙事语汇进行训练，确保角色满足经典动画的光彩与情绪。",
        },
        {
          question: "生成的角色能否用于商业用途？",
          answer:
            "可以！通过 迪士尼 OC 生成器 创作的原创角色归你所有，可用于个人或商业项目。",
        },
        {
          question: "需要注册账号才能使用吗？",
          answer:
            "基础模式无需账号；注册后可保存角色、调阅历史，并解锁更多魔法特效。",
        },
        {
          question: "可以重复调整同一角色吗？",
          answer: "当然可以。可重复生成或调整提示，直到角色完美呈现你的想像。",
        },
        {
          question: "未来会推出其它动画风格的 OC 生成器 吗？",
          answer:
            "会的！我们正扩展更多经典动画与卡通主题，欢迎关注 ocmaker.app 的最新发布。",
        },
      ],
    },
    cta: {
      title: "创造你的迪士尼魔法",
      description: "无需绘画技能，只要描绘梦想，就能感受迪士尼故事的魅力。",
      btns: {
        start: "开始创作",
        explore: "探索 OC 示例",
      },
    },
  },
};
