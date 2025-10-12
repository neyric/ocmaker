const basePrompt = `
  WORLD CONTEXT:
  故事：《我的英雄学院》
  背景概述：个性驱动的英雄社会、雄英高校英雄科、职业英雄排名、敌联合阴谋、国际英雄机构
  关键阵营：雄英学生、Big Three、职业英雄事务所、公安安全委员会、敌联合／异能解放军、支援科工程师、义勇英雄

  OUTPUT FORMAT:
  姓名、英雄／反派阵营、个性描述与限制、战斗服／支援装备、性格、理想、起源故事片段

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "雄英支援科王牌",
    description: "把装备与反射个性融合的技术奇才。",
    prompt: `角色名称？
中本雾里

她是英雄、学生还是反派？所在阵营？
雄英高校支援科，梦想成为支援英雄

她的个性与限制？
个性「棱镜脉冲」——能将来袭能量转化为聚焦光束，但连续射出三次后就会过热

她使用何种战斗服或支援装备？
与动力装甲老师合作打造的反射护臂与冷却线圈

她的性格？
创意十足、热情洋溢、偶尔粗心

驱动她的理想？
设计让任何见习英雄都能安全战斗的支援装备

起源故事掠影。
在无个性家庭长大，用废料拼出第一副护臂击退街头恶徒。`,
  },
  {
    title: "雄英实习生",
    description: "在米尔寇门下磨练近战的英雄科学生。",
    prompt: `角色名称？
大悟空良

他是英雄、学生还是反派？所在阵营？
雄英英雄科 2-A 班

他的个性与限制？
个性「音速跃」——爆发性的腿力会掀起音爆，但长时间使用会拉伤肌肉

他使用何种战斗服或支援装备？
强化护膝与减震战靴

他的性格？
好胜火热，对同伴极度忠诚

驱动他的理想？
成为前五名英雄，鼓舞乡镇孩子相信英雄梦想

起源故事掠影。
曾以赤手空拳的腿力救出被山崩困住的同学，从而获得米尔寇青眼相看。`,
  },
  {
    title: "地下义勇者",
    description: "在穆斯塔夫暗处协助英雄的影子伙伴。",
    prompt: `角色名称？
夜栅

他是英雄、学生还是反派？所在阵营？
与抹消英雄合作的独行动义勇者

他的个性与限制？
个性「格构」——投射格状屏障，但必须以精准手势编织

他使用何种战斗服或支援装备？
抓钩索与预判轨迹护目镜

他的性格？
冷静缜密、分析力强、甘于牺牲

驱动他的理想？
让弥补盲区的义勇者获得合法地位

起源故事掠影。
因采用义勇战术而落选英雄执照，如今证明地下势力也能与职业英雄协作。`,
  },
  {
    title: "敌联合招募者",
    description: "以影幕掩护同伴的反派新人。",
    prompt: `角色名称？
影辉

她是英雄、学生还是反派？所在阵营？
敌联合

她的个性与限制？
个性「日蚀幕」——能融入阴影开启传送门，但强光下会虚弱

她使用何种战斗服或支援装备？
吸光披风与荼毘提供的闪光干扰器

她的性格？
阴郁戏剧化，却对流浪者出奇温柔

驱动她的理想？
瓦解曾因个性失控而放弃她的英雄社会

起源故事掠影。
被英雄学校退学后，被渡我邀请，专职保护逃家的孩子。`,
  },
  {
    title: "事务所会计英雄",
    description: "以数据屏障守护财务与前线的支援英雄。",
    prompt: `角色名称？
账册护盾

他是英雄、学生还是反派？所在阵营？
安德瓦事务所的副英雄

他的个性与限制？
个性「硬光账本」——生成数据表格形护盾，但每片仅能维持十秒

他使用何种战斗服或支援装备？
全息投影护臂与强化护目镜

他的性格？
严谨沉稳，带着干涩幽默

驱动他的理想？
在保护市民的同时，让事务所运作保持透明

起源故事掠影。
厌倦企业会计生活，在一次袭击中保护实习生后加入安德瓦团队。`,
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
      { label: "雄英一年级", value: "ua first year" },
      { label: "雄英高年级", value: "ua upperclassman" },
      { label: "职业英雄", value: "pro hero" },
      { label: "地下义勇者", value: "underground vigilante" },
      { label: "老练反派", value: "veteran villain" },
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
      { label: "雄英训练夹克", value: "ua training jacket" },
      { label: "英雄战斗服护甲", value: "hero costume armor" },
      { label: "支援科实验外套", value: "support course coat" },
      { label: "反派风衣", value: "villain trench" },
      { label: "事务所制服", value: "agency uniform" },
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
      { label: "英雄紧身裤", value: "hero costume tights" },
      { label: "训练长裤", value: "training pants" },
      { label: "支援工具短裤", value: "support utility shorts" },
      { label: "反派皮裤", value: "villain leather pants" },
      { label: "事务所正装裤", value: "agency formal slacks" },
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
      { label: "雄英英雄套组", value: "ua hero course set" },
      { label: "支援工程造型", value: "support engineer set" },
      { label: "职业英雄套装", value: "pro hero set" },
      { label: "敌联合套组", value: "league of villains set" },
      { label: "地下义勇套组", value: "underground vigilante set" },
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
      { label: "抗个性纤维", value: "quirk resistant fabric" },
      { label: "碳纤维护甲", value: "carbon fiber armor" },
      { label: "支援科技网层", value: "support tech mesh" },
      { label: "防火战衣", value: "fireproof suit" },
      { label: "潜行面料", value: "stealth fabric" },
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
      { label: "多功能护臂", value: "utility gauntlets" },
      { label: "支援工具箱", value: "support gear toolkit" },
      { label: "英雄执照卡", value: "hero license" },
      { label: "反派面具", value: "villain mask" },
      { label: "事务所通讯器", value: "agency communicator" },
    ],
  },
  {
    title: "所属阵营",
    key: "mha_affiliation",
    data: [
      { label: "雄英英雄科", value: "ua hero course" },
      { label: "支援科", value: "support course" },
      { label: "职业英雄", value: "pro hero" },
      { label: "义勇者", value: "vigilante" },
      { label: "敌联合", value: "league of villains" },
    ],
  },
];

const examples = [
  {
    image: "https://cdn.ocmaker.app/example/mha-oc-generateds-1.webp",
    prompt:
      "1girl, green hair with yellow streaks, emerald eyes, UA high school uniform, hero costume with nature theme, confident smile, My Hero Academia style, looking at viewer, simple background, upper body",
  },
  {
    image: "https://cdn.ocmaker.app/example/mha-oc-generateds-2.webp",
    prompt:
      "1boy, spiky red hair, orange eyes, hero costume with fire elements, determined expression, My Hero Academia style, hero pose, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/mha-oc-generateds-3.webp",
    prompt:
      "1girl, silver hair in twin buns, purple eyes, high-tech hero suit, support gear, excited expression, My Hero Academia style, inventor pose, looking at viewer, simple background, upper body",
  },
  {
    image: "https://cdn.ocmaker.app/example/mha-oc-generateds-4.webp",
    prompt:
      "1boy, black hair with blue highlights, steel gray eyes, hero costume with metal accents, serious expression, defensive stance, My Hero Academia style, looking at viewer, anime style, simple background, upper body",
  },
];

export default {
  meta: {
    title: "我的英雄学院 OC 角色生成器",
    description:
      "借助 AI 打造你的《我的英雄学院》原创英雄或反派，设定独特个性、战斗服与成长旅程。",
  },
  series: "我的英雄学院",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "My Hero Academia OC Maker",
      description: "输入角色设定，瞬间生成拥有英雄梦想的 MHA 原创角色。",
    },
    step: {
      title: "如何打造 My Hero Academia OC",
      description: "像觉醒个性一样刺激，按照步骤塑造你的英雄或反派。",
      steps: [
        {
          title: "设计独特个性",
          description:
            "选择角色的个性，从元素能力到变身系都可以，并思考它如何影响造型、性格与战斗风格。",
        },
        {
          title: "打造战斗服与身份",
          description:
            "为角色配置英雄战斗服、校服或反派装束，补充支援装备、配色与与个性相辅相成的细节。",
        },
        {
          title: "生成你的英雄角色",
          description:
            "点击“生成角色”，从多张 AI 设计中挑选最能体现英雄气息的造型。",
        },
      ],
    },
    examples: {
      title: "英雄学院示例",
      description:
        "浏览使用 My Hero Academia OC Maker 文字提示生成的原创英雄与反派。",
      examples,
    },
    features: {
      title: "My Hero Academia OC Maker 的特色",
      description:
        "专注英雄社会设定，帮助你量身打造具备个性、服装与梦想的原创角色。",
      features: [
        {
          label: "正统 MHA 画风",
          description:
            "重现动画的动感线条与英雄姿态，从校服到战斗服都高度还原。",
        },
        {
          label: "以个性驱动设计",
          description:
            "AI 理解个性如何影响外观与装备，让能力在造型上自然呈现。",
        },
        {
          label: "闪电般的角色生成",
          description:
            "几秒内完成英雄或反派形象，把时间留给故事、关系与成长线。",
        },
        {
          label: "专业级英雄插画",
          description: "依据 MHA 的视觉标准调校，呈现充满能量感的角色作品。",
        },
        {
          label: "多套战斗服变体",
          description:
            "同一提示可获得多种服装与个性效应组合，探索角色最佳造型。",
        },
        {
          label: "融入英雄社会",
          description:
            "角色设定自然带出执照、校内生活与个性社会背景，轻松衔接原作世界观。",
        },
      ],
    },
    faqs: {
      title: "常见问题",
      description: "还有疑问？欢迎留言至 support@ocmaker.app",
      faqs: [
        {
          question: "My Hero Academia OC Maker 是什么？如何运作？",
          answer:
            "My Hero Academia OC Maker 是专注《我的英雄学院》的 AI 角色生成器。描述角色的个性、外观与战斗服后，即可获得动画风的原创插画。",
        },
        {
          question: "如何让角色更具英雄学院风格？",
          answer:
            "请加入个性细节、战斗服元素、所属学校或事务所、性格目标等资讯，越贴合原作设定越出彩。",
        },
        {
          question: "My Hero Academia OC Maker 可以免费用吗？",
          answer:
            "可以。基础功能免费；升级方案能加速生成、强化个性特效并解锁更多服装选项。",
        },
        {
          question: "为什么生成结果这么有英雄气？",
          answer:
            "系统依照 MHA 的美术风格与英雄社会美学调校，准确呈现角色设计与个性特效。",
        },
        {
          question: "用 My Hero Academia OC Maker 创造的角色能商用吗？",
          answer: "当然可以！你生成的原创角色归你所有，可用于个人或商业计划。",
        },
        {
          question: "使用 My Hero Academia OC Maker 需要账号吗？",
          answer:
            "基础体验无需登入；注册后可保存角色、查看生成历史，并解锁更多英雄主题功能。",
        },
        {
          question: "可以重新生成或微调角色吗？",
          answer:
            "可以！可重复生成取得变体，或调整描述持续优化，直到符合你的理想英雄形象。",
        },
        {
          question: "未来会新增其他超级英雄动画主题吗？",
          answer:
            "会的！我们将扩展更多英雄与动作类作品，敬请关注最新上线的 OC Maker。",
        },
      ],
    },
    cta: {
      title: "创造你的终极英雄",
      description: "无需绘画技能，只要想像并描述，就能踏入职业英雄的行列。",
      btns: {
        start: "开始创作",
        explore: "探索角色示例",
      },
    },
  },
};
