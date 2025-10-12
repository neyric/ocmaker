const basePrompt = `
  WORLD CONTEXT:
  故事：《辉夜大小姐想让我告白～天才们的恋爱头脑战～》
  背景概述：秀知院学园顶尖学府、恋爱心理战、学生会暗流、名门家族角力、校园祭与秘密约会
  关键圈层：学生会、应援团、戏剧部、风纪委员、四宫集团、白银家族、藤原人脉

  OUTPUT FORMAT:
  姓名、秀知院年级与身份、家庭背景／社会地位、恋爱战术或特长、性格、恋爱难题、背景片段

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "学生会财务",
    description: "把恋爱公式化的转学生财务官。",
    prompt: `角色名称？
神崎爱理

她在秀知院的年级与职务？
二年级，学生会财务

家庭背景或社会地位？
东京高科技集团的继承人

她的恋爱战术或特长？
用算法恋爱图预测告白时机

性格？
端庄礼貌，暗地里求胜心旺盛

正在面对的恋爱难题？
想请教白银，如何对石上告白又不失颜面

背景片段。
转学当天在迎新会上以节奏口技惊艳藤原，被邀请加入学生会。`,
  },
  {
    title: "风纪委员长",
    description: "自律严苛却藏着少女心的风纪委员。",
    prompt: `角色名称？
西园寺梦

她在秀知院的年级与职务？
三年级，风纪委员长

家庭背景或社会地位？
与四宫集团往来的老牌家族

她的恋爱战术或特长？
撰写规章修订，把心上人逼进补习室

性格？
自律严厉、外冷内热的傲娇

正在面对的恋爱难题？
担心收藏的少女漫画被曝光，来不及向早坂的堂兄告白

背景片段。
幼年在礼仪课与辉夜针锋相对，后来结成互相尊重的盟约。`,
  },
  {
    title: "戏剧部主演",
    description: "把告白写进舞台剧的新人演员。",
    prompt: `角色名称？
新田一树

他在秀知院的年级与职务？
一年级，戏剧部主演

家庭背景或社会地位？
来自普通家庭的奖学金生

他的恋爱战术或特长？
自导浪漫喜剧，在演出中安排即兴告白

性格？
活力四射、戏剧化却真诚

正在面对的恋爱难题？
担心辉夜会抢先破解他的即兴告白桥段

背景片段。
曾说服辉夜赞助文化祭公演，救回濒临被解散的戏剧部。`,
  },
  {
    title: "应援社策略师",
    description: "以短影音左右声势的校内策划。",
    prompt: `角色名称？
立川美奈

她在秀知院的年级与职务？
二年级，应援社策略师

家庭背景或社会地位？
崛起中的网红家族，扩展娱乐事业版图

她的恋爱战术或特长？
以社群企划左右学生会选举的热度

性格？
走在潮流前端、嘴毒却心软

正在面对的恋爱难题？
暗恋害羞的摄影社同学，却担心镜头曝光对方

背景片段。
与藤原合作舞蹈挑战一夕爆红，从此成为学生会官方影像搭档。`,
  },
  {
    title: "图书委员长",
    description: "用书单牵线情缘的文库掌舵者。",
    prompt: `角色名称？
水濑遥

她在秀知院的年级与职务？
三年级，图书委员会长

家庭背景或社会地位？
出身传承悠久的文学世家

她的恋爱战术或特长？
策划书单映照学生暗恋心思

性格？
温柔内敛、洞察敏锐又喜欢玩心机

正在面对的恋爱难题？
设计书籍寻宝，希望辉夜看见白银暗藏的情诗

背景片段。
受辉夜公关手腕启发，立志复兴学校沉寂的文学沙龙。`,
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
      { label: "秀知院一年级生", value: "first year shuchiin" },
      { label: "秀知院二年级生", value: "second year shuchiin" },
      { label: "秀知院三年级生", value: "third year shuchiin" },
      { label: "毕业导师", value: "graduate mentor" },
      { label: "教师顾问", value: "faculty advisor" },
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
      { label: "学生会制服外套", value: "student council uniform" },
      { label: "风纪委员制服", value: "disciplinary blazer" },
      { label: "戏剧部开衫", value: "drama club cardigan" },
      { label: "应援社夹克", value: "cheer club jacket" },
      { label: "名门针织衫", value: "prestige sweater" },
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
      { label: "秀知院百褶裙", value: "pleated skirt shuchiin" },
      { label: "秀知院西装裤", value: "tailored slacks shuchiin" },
      { label: "秀知院休闲牛仔裤", value: "casual jeans shuchiin" },
      { label: "秀知院运动裤", value: "exercise pants shuchiin" },
      { label: "祭典浴衣下摆", value: "festival yukata hem" },
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
      { label: "学生会会议套组", value: "student council meeting set" },
      { label: "风纪巡逻套组", value: "public morals patrol set" },
      { label: "文化祭造型", value: "cultural festival set" },
      { label: "运动祭应援套组", value: "sports festival set" },
      { label: "秘密约会装", value: "secret confession date set" },
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
      { label: "校制服呢料", value: "school uniform wool" },
      { label: "奢华羊绒", value: "luxury cashmere" },
      { label: "社团球衣布料", value: "club jersey fabric" },
      { label: "祭典真丝", value: "festival silk" },
      { label: "设计师蕾丝", value: "designer lace" },
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
      { label: "学生会徽章", value: "student council badge" },
      { label: "告白情书", value: "love confession letter" },
      { label: "企划夹板", value: "planning clipboard" },
      { label: "应援彩球", value: "cheer pom" },
      { label: "伪装眼镜", value: "disguise glasses kaguya" },
    ],
  },
];

const examples = [
  {
    image: "https://cdn.ocmaker.app/example/kaguya-sama-oc-generated-1.webp",
    prompt:
      "1girl, long black hair with red ribbon, red eyes, confident smirk, shuchiin academy uniform, student council president badge, elegant pose, single character, upper body, looking at viewer, anime style, student council room background",
  },
  {
    image: "https://cdn.ocmaker.app/example/kaguya-sama-oc-generated-2.webp",
    prompt:
      "1boy, blonde hair, blue eyes, friendly smile, shuchiin academy uniform, student council treasurer badge, notebook in hand, cheerful pose, single character, upper body, looking at viewer, anime style, school hallway background",
  },
  {
    image: "https://cdn.ocmaker.app/example/kaguya-sama-oc-generated-3.webp",
    prompt:
      "1girl, short pink hair, pink eyes, energetic expression, shuchiin academy uniform with cute accessories, detective band on arm, playful wink, single character, upper body, looking at viewer, anime style, classroom background",
  },
  {
    image: "https://cdn.ocmaker.app/example/kaguya-sama-oc-generated-4.webp",
    prompt:
      "1boy, dark hair with glasses, brown eyes, serious expression, shuchiin academy uniform, student council secretary badge, tablet computer, analytical pose, single character, upper body, looking at viewer, anime style, library background",
  },
];

export default {
  meta: {
    title: "辉夜大小姐 OC 角色生成器",
    description:
      "借助 AI 打造你的《辉夜大小姐想让我告白》原创学生会成员、名门子弟与恋爱对手。",
  },
  series: "辉夜大小姐想让我告白",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Kaguya-sama OC Maker",
      description: "输入角色设定，几秒内生成秀知院学园的恋爱头脑战选手。",
    },
    step: {
      title: "如何打造 Kaguya-sama OC",
      description: "踏入秀知院的恋爱心理战，按照以下步骤塑造你的天才学生。",
      steps: [
        {
          title: "选定学园身份",
          description:
            "决定角色是学生会成员、名门继承人、社团干部或普通学生，并思考其地位、责任与恋爱策略。",
        },
        {
          title: "描绘性格与战术",
          description:
            "描述角色的外表、家庭背景与恋爱情报战的拿手好戏，补充智商、特长以及对告白博弈的态度。",
        },
        {
          title: "生成你的天才学生",
          description:
            "点击“生成角色”，即可获取多组 AI 设计，挑出最符合秀知院气质与故事氛围的造型。",
        },
      ],
    },
    examples: {
      title: "秀知院角色示例",
      description: "浏览使用 Kaguya-sama OC Maker 文字提示生成的名校学生。",
      examples,
    },
    features: {
      title: "Kaguya-sama OC Maker 有何特色？",
      description:
        "专为秀知院的上流校园打造，生成兼具智斗与恋爱戏剧张力的原创角色。",
      features: [
        {
          label: "正统名校风格",
          description:
            "重现辉夜大小姐的精致画风，从制服、表情到礼仪细节都贴近原作氛围。",
        },
        {
          label: "学生会生态理解",
          description:
            "AI 熟悉秀知院的社交阶层、学生会运作与各社团文化，让角色自然融入学园生态。",
        },
        {
          label: "极速恋爱对手生成",
          description:
            "数秒完成角色外观设计，适合构思恋爱战术、学生会会议或文化祭剧情。",
        },
        {
          label: "高质量校园美术",
          description:
            "依托辉夜大小姐的视觉标准调校，呈现兼顾优雅与搞笑表情的角色图像。",
        },
        {
          label: "多样性格路线",
          description:
            "同一提示可生成不同性格与策略的变体，探索各种恋爱头脑战的可能性。",
        },
        {
          label: "秀知院沉浸感",
          description:
            "角色设定自然带出名门背景、学业成就与恋爱战术，故事拓展空间充足。",
        },
      ],
    },
    faqs: {
      title: "常见问题",
      description: "还有疑问？欢迎留言至 support@ocmaker.app",
      faqs: [
        {
          question: "Kaguya-sama OC Maker 是什么？如何运作？",
          answer:
            "Kaguya-sama OC Maker 是专为秀知院学园打造的 AI 角色生成器。描述角色的外貌、背景与恋爱策略后，系统会生成辉夜大小姐风格的插画。",
        },
        {
          question: "如何用 Kaguya-sama OC Maker 打造更贴近原作的角色？",
          answer:
            "加入学生会职务、名门背景、学术特长、社团身份与恋爱情报战招式等细节，越具体越能体现秀知院的智斗氛围。",
        },
        {
          question: "Kaguya-sama OC Maker 可以免费使用吗？",
          answer:
            "可以。基础功能免费；升级方案可加速生成、解锁更多角色变体与自定义选项。",
        },
        {
          question: "为什么生成效果如此贴近辉夜大小姐？",
          answer:
            "系统针对辉夜大小姐的美术风格与校园设定调优，理解作品兼具优雅与爆笑的氛围。",
        },
        {
          question: "用 Kaguya-sama OC Maker 创造的角色可以商用吗？",
          answer:
            "可以！你创作的原创角色完全归你所有，可用于个人或商业项目，我们不会主张所有权。",
        },
        {
          question: "使用 Kaguya-sama OC Maker 需要注册账号吗？",
          answer:
            "基础体验无需账号；注册后可储存角色、查看生成记录，并解锁秀知院主题的进阶功能。",
        },
        {
          question: "能否创建不同类型的秀知院学生？",
          answer:
            "当然可以！可设计学生会干部、各社团领导、转学生、奖学金生或普通同学，任意扩展角色谱系。",
        },
        {
          question: "未来会推出更多恋爱喜剧主题的 OC Maker 吗？",
          answer:
            "会的！我们正在拓展更多恋爱喜剧与校园作品，欢迎关注最新上线的主题生成器。",
        },
      ],
    },
    cta: {
      title: "加入恋爱头脑战",
      description:
        "无需绘画功底，只要描述即可让原创天才学生踏入秀知院的恋爱战场。",
      btns: {
        start: "开始创作",
        explore: "探索角色示例",
      },
    },
  },
};
