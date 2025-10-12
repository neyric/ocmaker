const basePrompt = `
  WORLD CONTEXT:
  故事：《赛马娘 Pretty Derby》
  背景概述：特雷森学园、转生的赛马娘、偶像舞台、G1 大赛、集训营与万众瞩目的赛事
  关键要素：训练员、支援卡、经典日系与国际赛马意象、Twinkle Series 赛事、宿舍竞争、胜利后的偶像舞台

  OUTPUT FORMAT:
  姓名、血统灵感、擅长距离与跑法、训练员／团队、性格、宿敌／目标赛事、背景片段

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "暮光短途女杰",
    description: "以无畏飞翔著称的传说马“神鹰”精神为灵感的短途选手。",
    prompt: `角色名称？
暮光神鹰

血统或灵感来源？
继承曾在日本掀起风潮的海外冠军血脉

擅长距离与跑法？
偏好 1200～1600 公尺的领放战术

训练员或团队？
特雷森学园 Gold Star 队

性格？
张扬自信，热爱华丽终点冲线

宿敌或目标赛事？
要以破纪录成绩夺下短途锦标

背景片段。
在美国反覆观看神鹰的比赛影片，后来远赴特雷森追逐那份荣耀。`,
  },
  {
    title: "马拉松缪斯",
    description: "承袭“深蓝帝王”坚韧斗志的长距离选手。",
    prompt: `角色名称？
深海小夜曲

血统或灵感来源？
受到深蓝帝王不屈意志的启发

擅长距离与跑法？
偏好 2400～3200 公尺的后追脚质

训练员或团队？
由理子训练员率领的樱桥队

性格？
沉静诗意，却暗藏好胜心

宿敌或目标赛事？
要在春季天皇赏以惊人的尾段追击称霸

背景片段。
每场比赛都写下俳句，并在黎明训练向深蓝帝王的晨练致敬。`,
  },
  {
    title: "泥地旋风",
    description: "把美国泥地精神带进日本赛场的泥地女王。",
    prompt: `角色名称？
沙漠烈焰

血统或灵感来源？
受到秘书处原始爆发力的鼓舞

擅长距离与跑法？
偏好 1600 公尺泥地赛，擅长跟追

训练员或团队？
特雷森与海外交流计划的联合阵容

性格？
精力旺盛、固执，越泥泞越兴奋

宿敌或目标赛事？
要统治二月锦标，证明泥地也能闪耀

背景片段。
生长于沙漠牧场赛道，为拓展泥地声望而加入特雷森交流计划。`,
  },
  {
    title: "经典桂冠",
    description: "瞄准三冠荣誉的战术大师。",
    prompt: `角色名称？
冠冕奏鸣

血统或灵感来源？
以皇帝“鲁道夫象征”沉稳气场为榜样

擅长距离与跑法？
偏好 2000～2400 公尺的跟踪战术

训练员或团队？
象征宿舍精英小组

性格？
自律端庄，对后辈极具激励作用

宿敌或目标赛事？
誓言横扫皋月赏、日本德比与菊花赏

背景片段。
受鲁道夫亲自指导，严格训练之余也担任学妹们的课业辅导。`,
  },
  {
    title: "夜幕赛场偶像",
    description: "在灯光下迷倒观众的夜间赛专家。",
    prompt: `角色名称？
月色歌姬

血统或灵感来源？
承袭“数码矩阵”多面发挥的实力

擅长距离与跑法？
偏好 1400 公尺夜间赛事，跑法百变

训练员或团队？
Twilight Stage 偶像竞赛团

性格？
华丽爱玩，却十分努力

宿敌或目标赛事？
想在 NHK 里程盃夜间特别赛压轴登场称霸偶像舞台

背景片段。
在半场演出被星探发掘后，同时兼顾偶像课程与赛场训练。`,
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
      { label: "一年级赛马娘", value: "freshman uma" },
      { label: "在学选手", value: "academy runner" },
      { label: "成熟骑手", value: "seasoned racer" },
      { label: "传奇赛马娘", value: "legendary uma" },
      { label: "神话血统", value: "mythic bloodline" },
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
      { label: "赛马娘制服上衣", value: "tradition uniform top" },
      { label: "训练背心", value: "training vest" },
      { label: "偶像舞台上装", value: "idol stage top" },
      { label: "冬季斗篷", value: "winter mantle" },
      { label: "贵族礼装", value: "regal jacket" },
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
      { label: "赛马娘裙摆", value: "uniform skirt" },
      { label: "训练短裙", value: "training skirt" },
      { label: "舞台裙摆", value: "stage hem" },
      { label: "晨练紧身裤", value: "morning leggings" },
      { label: "胜利披帛", value: "victory drape" },
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
      { label: "特雷森制服套装", value: "tracen uniform set" },
      { label: "宿舍休闲套装", value: "dorm casual set" },
      { label: "胜利偶像套装", value: "victory idol set" },
      { label: "远征训练套装", value: "training camp set" },
      { label: "海外交流套装", value: "international exchange set" },
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
      { label: "赛衣弹性布", value: "stretch suit fabric" },
      { label: "闪耀舞台纱", value: "sparkle tulle" },
      { label: "冠军缎带", value: "champion ribbon" },
      { label: "晨雾织物", value: "morning mist weave" },
      { label: "荣耀披肩料", value: "glory mantle cloth" },
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
      { label: "训练笔记", value: "magic tome accessory" },
      { label: "胜利花冠", value: "victory laurel" },
      { label: "耳饰缎带", value: "ear ribbon charm" },
      { label: "终点旗披肩", value: "finishing flag stole" },
      { label: "麦克风手柄", value: "idol mic" },
      { label: "冠军奖杯", value: "trophy prop" },
    ],
  },
];

const examples = [
  {
    image: "https://cdn.ocmaker.app/example/uma-musume-oc-generated-1.webp",
    prompt:
      "1girl, long brown hair, bright green eyes, horse ears, horse tail, tracen academy uniform, confident smile, idol pose, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/uma-musume-oc-generated-2.webp",
    prompt:
      "1girl, short blue hair, golden eyes, horse ears, horse tail, racing suit, dynamic running pose, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/uma-musume-oc-generated-3.webp",
    prompt:
      "1girl, pink twin tails, purple eyes, horse ears, horse tail, idol stage outfit, holding microphone, cheerful expression, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/uma-musume-oc-generated-4.webp",
    prompt:
      "1girl, silver hair, red eyes, horse ears, horse tail, elegant formal dress, racing ribbon accessory, confident look, upper body, looking at viewer, anime style, simple background",
  },
];

export default {
  meta: {
    title: "赛马娘 OC 角色生成器",
    description:
      "借助 AI 打造你的赛马娘原创角色，设定血统传奇、比赛策略与胜利舞台。",
  },
  series: "赛马娘 Pretty Derby",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Uma Musume OC Maker",
      description: "输入设定，几秒内生成闪耀的赛马娘形象与偶像气场。",
    },
    step: {
      title: "如何打造 Uma Musume OC",
      description:
        "想让专属赛马娘在 Twinkle Series 冲线？按照以下步骤完成设定。",
      steps: [
        {
          title: "确定血统与跑法",
          description:
            "选择灵感来源的名马或传说，再设定擅长距离、跑法与训练团队。",
        },
        {
          title: "描绘性格与宿敌",
          description:
            "写出她的个性、目标赛事与宿敌，并为胜利后的偶像舞台预留亮点。",
        },
        {
          title: "生成你的赛马娘",
          description:
            "点击“生成角色”，从多种 AI 设计中挑选最能代表她的赛场与舞台姿态。",
        },
      ],
    },
    examples: {
      title: "赛马娘示例",
      description: "浏览使用 Uma Musume OC Maker 文本提示生成的闪耀角色。",
      examples,
    },
    features: {
      title: "Uma Musume OC Maker 的特色",
      description:
        "专为赛马娘世界打造，结合赛场紧张与偶像舞台的双重魅力。",
      features: [
        {
          label: "正统动画风格",
          description:
            "角色设计贴近官方角色的活力与可爱，兼具赛场张力与偶像魅力。",
        },
        {
          label: "血统与赛事支持",
          description:
            "AI 理解经典名马与 Twinkle Series 赛事，轻松建构可信背景。",
        },
        {
          label: "快速角色生成",
          description:
            "几秒内获得高品质插画，把时间留给剧情、训练与演出规划。",
        },
        {
          label: "自订舞台造型",
          description:
            "提供训练服、制服与偶像套装等多种风格，满足角色成长路线。",
        },
        {
          label: "多版本挑选",
          description:
            "每次生成都会给出不同姿态与光效，轻松找到最佳冲线瞬间。",
        },
        {
          label: "完美融入世界观",
          description:
            "角色自然衔接特雷森学园、宿舍日常与赛后舞台，为故事增色。",
        },
      ],
    },
    faqs: {
      title: "常见问题",
      description: "还有疑问？欢迎写信至 support@ocmaker.app",
      faqs: [
        {
          question: "什么是 Uma Musume OC Maker？它如何运作？",
          answer:
            "Uma Musume OC Maker 是专为赛马娘世界打造的 AI 工具。描述血统灵感、跑法与性格后，AI 会生成正统动画风格的角色图像。",
        },
        {
          question: "如何让 Uma Musume OC Maker 生成更精彩的角色？",
          answer:
            "提供具体的距离、跑法、目标赛事、训练员与偶像舞台细节，越完整越能呈现角色魅力。",
        },
        {
          question: "Uma Musume OC Maker 是否免费？",
          answer:
            "是的，基础功能免费使用。升级方案提供更快生成速度与更多造型套装。",
        },
        {
          question: "为什么 Uma Musume OC Maker 的成果如此贴切？",
          answer:
            "模型针对赛马娘的画风与赛场氛围训练，掌握制服细节与偶像演出光感。",
        },
        {
          question: "我能商业使用 Uma Musume OC Maker 生成的角色吗？",
          answer:
            "可以，你的原创赛马娘完全归你所有，可用于个人或商业企划，我们不会主张所有权。",
        },
        {
          question: "使用 Uma Musume OC Maker 需要帐号吗？",
          answer:
            "基础使用不需帐号。注册后可保存角色、查看历史纪录，并解锁更多训练主题。",
        },
        {
          question: "能否打造不同距离或舞台取向的赛马娘？",
          answer:
            "当然！无论是短途爆发、长距离耐力或偶像专长，都能透过提示轻松生成。",
        },
        {
          question: "未来会新增其他偶像或运动题材的 OC Maker 吗？",
          answer:
            "会的！我们计划扩展更多结合运动与舞台的原创角色生成器，敬请期待。",
        },
      ],
    },
    cta: {
      title: "让赛马娘冲向终点线",
      description: "无需绘画技巧，只要想像与热情，就能打造属于你的闪耀赛马娘。",
      btns: {
        start: "开始创作",
        explore: "浏览角色",
      },
    },
  },
};

