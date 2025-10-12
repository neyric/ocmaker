const basePrompt = `
  WORLD CONTEXT:
  故事：《火影忍者》
  背景概述：隐村体制、查克拉忍术、忍界大战、晓组织阴谋、武士疆域与尾兽纷争
  关键阵营：木叶、砂隐、雾隐、云隐、岩隐、根部／暗部、晓、大筒木遗脉、叛忍、忍者科学武器派

  OUTPUT FORMAT:
  姓名、所属村与阶级、家族／血继限界、查克拉属性与招牌忍术、性格、忍道、背景片段

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "木叶暗部追踪者",
    description: "以感知忍术破译敌方密语的木叶暗部。",
    prompt: `角色名称？
黑钢真

所属村与等级？
木叶隐村，暗部执行官

所属家族或血继限界？
被奈良一族收养，无血继限界

查克拉属性与招牌忍术？
融合影子操控的雷遁链锁术

性格？
沉稳寡言，却暗藏柔软情感

忍道？
即便藏身阴影，也要守护沐浴阳光的人

背景片段。
第四次忍界大战中被鹿久所救，如今替火影侦测叛忍路线。`,
  },
  {
    title: "砂隐傀儡队长",
    description: "精确操控查克拉线的砂隐傀儡使队长。",
    prompt: `角色名称？
砂瀑茜弥

所属村与等级？
砂隐村，上忍傀儡师

所属家族或血继限界？
砂瀑家工匠支系

查克拉属性与招牌忍术？
风遁结合查克拉线的傀儡炮击术

性格？
谋略周密、守护队友、干劲十足

忍道？
准备越充分，就能驯服越狂暴的沙暴

背景片段。
为勘九郎打造治疗傀儡，同时护卫砂隐的商贸干线。`,
  },
  {
    title: "雾隐女刀忍",
    description: "精通无声暗杀的雾隐刀忍候补。",
    prompt: `角色名称？
鬼灯玲

所属村与等级？
雾隐村，七人众见习

所属家族或血继限界？
鬼灯一族，水化之术

查克拉属性与招牌忍术？
水遁雾分身配合带电刀锋

性格？
冷静自律，又悄悄关照同伴

忍道？
没有目标的刀会生锈，我挥刀是为开辟和平

背景片段。
在水月指导下，用液化技巧重铸失落的名刀。`,
  },
  {
    title: "云隐雷感忍",
    description: "远程调度雷击的云隐感知忍者。",
    prompt: `角色名称？
雷兽电希

所属村与等级？
云隐村，中忍参谋

所属家族或血继限界？
无家族背景，师从达鲁伊

查克拉属性与招牌忍术？
雷遁雷达波与雷击封印符

性格？
自信机敏，对伙伴极度忠诚

忍道？
先以雷霆出击，更要迅速守护

背景片段。
曾拦下邪神教仪式救下一整支小队，获雷影嘉奖。`,
  },
  {
    title: "浪人学者",
    description: "追寻失落封印卷的漩涡历史学者。",
    prompt: `角色名称？
漩涡秋子

所属村与等级？
独行忍者，前涡潮隐村

所属家族或血继限界？
漩涡一族封印天才

查克拉属性与招牌忍术？
融入火遁符札的封锁锁链

性格？
温柔求知，却坚持己见

忍道？
愿守护知识者，皆有资格共享

背景片段。
幸存于涡潮灭亡后，她协助鸣人时代整理散落各国的封印卷。`,
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
      { label: "下忍", value: "genin" },
      { label: "中忍", value: "chunin" },
      { label: "上忍", value: "jonin" },
      { label: "暗部", value: "anbu" },
      { label: "资深影", value: "veteran kage" },
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
      { label: "木叶防护背心", value: "leaf flak jacket" },
      { label: "砂隐沙漠斗篷", value: "sand desert cloak" },
      { label: "雾隐猎人外袍", value: "mist hunter robe" },
      { label: "云隐战斗背心", value: "cloud battle vest" },
      { label: "晓组织黑袍", value: "akatsuki cloak" },
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
      { label: "层叠绑带", value: "layered wraps" },
      { label: "忍者裤装", value: "shinobi pants" },
      { label: "鸣人橙裤", value: "orange pants" },
      { label: "忍者紧身裤", value: "ninja leggings" },
      { label: "武士袴裤", value: "samurai hakama" },
      { label: "暗部裤装", value: "anbu trousers" },
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
      { label: "王侯礼袍", value: "royal regalia" },
      { label: "行脚装束", value: "nomad attire" },
      { label: "木叶忍装", value: "leaf village ninja" },
      { label: "砂隐套组", value: "sand village set" },
      { label: "雾隐刀忍套组", value: "mist swordsman set" },
      { label: "云隐忍者套组", value: "cloud shinobi set" },
      { label: "晓组织套组", value: "akatsuki member" },
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
      { label: "秘术布", value: "mystic cloth" },
      { label: "查克拉网甲", value: "chakra mesh" },
      { label: "防护甲片", value: "flak armor" },
      { label: "砂隐强化布", value: "sand reinforced cloth" },
      { label: "雾隐防水织物", value: "mist waterproof weave" },
      { label: "云隐雷纹布", value: "cloud lightning fabric" },
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
      { label: "斜肩弹袋", value: "bandolier" },
      { label: "忍术典籍", value: "magic tome accessory" },
      { label: "护额", value: "forehead protector" },
      { label: "苦无腰包", value: "kunai holster" },
      { label: "卷轴包", value: "scroll pack" },
      { label: "暗部面具", value: "anbu mask" },
      { label: "晓组织戒指", value: "akatsuki ring" },
    ],
  },
  {
    title: "村落",
    key: "village",
    data: [
      { label: "木叶", value: "leaf" },
      { label: "砂隐", value: "sand" },
      { label: "雾隐", value: "mist" },
      { label: "云隐", value: "cloud" },
      { label: "岩隐", value: "stone" },
      { label: "叛忍", value: "rogue" },
    ],
  },
];

const examples = [
  {
    image: "https://cdn.ocmaker.app/example/naruto-oc-generated-1.webp",
    prompt:
      "1girl, white hair, bright red eyes, brave expression, naruto style combat ensemble, forehead protector, kunai, ready stance, anime style, looking at viewer, simple background, upper body",
  },
  {
    image: "https://cdn.ocmaker.app/example/naruto-oc-generated-2.webp",
    prompt:
      "1girl, orange hair, teal eyes, playful smile, Naruto style ninja clothing, headband, scroll, energetic pose, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
  {
    image: "https://cdn.ocmaker.app/example/naruto-oc-generated-3.webp",
    prompt:
      "1girl, long purple hair, blue eyes, mysterious aura, Naruto style healing ninja outfit, headband, medicinal herbs, serene stance, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
  {
    image: "https://cdn.ocmaker.app/example/naruto-oc-generated-4.webp",
    prompt:
      "1boy, dark blue hair, gray eyes, serious expression, Naruto style shinobi attire, katana, defensive stance, single character, upper body, looking at viewer, anime style, simple background, white background",
  },
];

export default {
  meta: {
    title: "火影忍者 OC 角色生成器",
    description:
      "借助 AI 打造你的《火影忍者》原创忍者，设定人物背景、忍术与视觉造型。",
  },
  series: "火影忍者",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Naruto OC Maker",
      description: "输入角色设定，几秒内生成专属于你的忍界角色形象。",
    },
    step: {
      title: "如何打造 Naruto OC",
      description:
        "利用 OC Maker 创作火影风角色非常简单，按照以下步骤让忍者灵感成真。",
      steps: [
        {
          title: "描述你的火影 OC",
          description:
            "填写角色的外形与性格，记得加入忍者风格的服装、护额与坚毅精神，才能贴合火影世界。",
        },
        {
          title: "补充忍术细节",
          description:
            "写上查克拉属性、家族背景或独门忍术。越贴近忍界村落、忍具与战术，生成的角色越真实。",
        },
        {
          title: "生成并定稿设计",
          description:
            "点击“生成角色”，即可得到多张 AI 作品，挑选最符合你忍道的那位忍者。",
        },
      ],
    },
    examples: {
      title: "Naruto 角色示例",
      description: "浏览使用 Naruto OC Maker 文本提示生成的忍者角色。",
      examples,
    },
    features: {
      title: "Naruto OC Maker 的特色",
      description:
        "专为忍界量身调校，帮助你快速打造拥有忍术、羁绊与使命的原创角色。",
      features: [
        {
          label: "正统火影画风",
          description: "角色造型与线条贴近原作，融入忍者服、护额与战斗姿态。",
        },
        {
          label: "忍界专属调参",
          description:
            "提示词针对忍术、查克拉与村落风格优化，更容易产出可信的设定。",
        },
        {
          label: "高速生成流程",
          description: "数秒内获得高品质角色，让你把时间留给剧情与人物关系。",
        },
        {
          label: "高解析度图像",
          description: "AI 提供细致的动漫风角色，可直接用于故事创作或展示。",
        },
        {
          label: "多版本挑选",
          description:
            "每次生成都会给出多种方案，挑出最合意的造型作为正式 OC。",
        },
        {
          label: "深度故事整合",
          description:
            "不只看得到外观，还能结合背景、忍术与忍界人脉，丰富角色层次。",
        },
      ],
    },
    faqs: {
      title: "常见问题",
      description: "还有疑问？欢迎写信至 support@ocmaker.app",
      faqs: [
        {
          question: "什么是 Naruto OC Maker？它如何运作？",
          answer:
            "Naruto OC Maker 是专为火影忍者世界调校的 OC Maker。描述你的角色，AI 会根据提示在数秒内生成火影风动漫图像。",
        },
        {
          question: "如何让 Naruto OC Maker 生成更精彩的角色？",
          answer:
            "在描述中写入忍术、家族、所属村或特制忍具等细节。提示越具体，成果就越贴近你心中的忍者。",
        },
        {
          question: "Naruto OC Maker 可以免费使用吗？",
          answer:
            "可以，基础功能免费。若想享受更快速度、更多控制选项或高级功能，可以升级方案。",
        },
        {
          question: "为什么 Naruto OC Maker 的成果如此逼真？",
          answer:
            "我们使用针对火影画风与忍界氛围训练的模型，确保角色外观与忍术都符合原作特色。",
        },
        {
          question: "我能商业使用 Naruto OC Maker 生成的角色吗？",
          answer:
            "可以，你创作的原创忍者完全归你所有，可用在个人或商业计划，我们不会主张所有权。",
        },
        {
          question: "使用 Naruto OC Maker 需要帐号吗？",
          answer:
            "基本体验无需帐号。注册后可保存角色、查看生成记录，并解锁更多功能。",
        },
        {
          question: "可以重新生成或微调同一个角色吗？",
          answer:
            "当然可以！你能用相同提示再次生成或调整描述，直到角色完全符合你的愿景。",
        },
        {
          question: "未来还会推出其他动漫主题的 OC Maker 吗？",
          answer:
            "会的！我们计划扩展更多动漫世界的专属生成器，欢迎持续关注 ocmaker.app。",
        },
      ],
    },
    cta: {
      title: "创造你的火影原创忍者",
      description: "无需绘画基础，写下忍道，就能让角色跃上画面。",
      btns: {
        start: "开始创作",
        explore: "浏览角色",
      },
    },
  },
};
