const basePrompt = `
  WORLD CONTEXT:
  故事：《Total Drama Island》
  背景概述：瓦瓦那夸营地的真人秀，被淘汰仪式、告解室独白、荒诞挑战与满满戏剧包围
  关键元素：主持人克里斯与厨师哈奇特、尖叫地鼠队、杀手鲈鱼队、突发反转、联盟、背刺、真人秀套路

  OUTPUT FORMAT:
  姓名、所属队伍与角色标签、拿手才艺、招牌造型与道具、性格、策略、背景速写

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "超拼护滩员",
    description: "一位决心证明善良也能赢真人秀的水域高手。",
    prompt: `角色名称？
斯凯拉·芬恩

所属队伍？
尖叫地鼠队

在节目中的人设？
运动型守护者，偏爱照顾弱势选手

拿手才艺？
长距离游泳与临场救援绳结

招牌造型或道具？
营地背心搭配救生衣防磨衫与哨子挂绳

性格？
好胜又阳光，最看不惯霸凌

节目中的策略？
靠挑战赛保安全，同时组织一个可靠的小联盟

背景速写。
斯凯拉在安大略湖营地总被票选“最值得信赖”，却从未摘金；Total Drama 是她走出救援台、为自己而战的机会。`,
  },
  {
    title: "恶作剧网红",
    description: "想赢奖金，也想刷爆弹幕的整蛊频道明星。",
    prompt: `角色名称？
达什·巴克斯特

所属队伍？
杀手鲈鱼队

在节目中的人设？
看似活宝实则暗藏算计的整蛊王

拿手才艺？
布置无伤机关并剪辑爆红集锦

招牌造型或道具？
超大连帽衫、霓虹毛帽、肩挂运动相机

性格？
混乱但善良，网络成瘾，最爱捕捉反应

节目中的策略？
维持中游存在感、不威胁强者、善用告解室

背景速写。
达什把留堂素描变成两百万订阅的整蛊频道；只要克里斯肯签合同，节目就是他的下一支爆款合作。`,
  },
  {
    title: "名门辩论队长",
    description: "把每场挑战都当作法庭攻防的辩论冠军。",
    prompt: `角色名称？
蕾妮·惠特菲尔德

所属队伍？
英雄仓鼠队

在节目中的人设？
学霸型完美主义者，暗藏好胜心

拿手才艺？
高速说服与无懈可击的谈判技巧

招牌造型或道具？
营地 T 恤外搭条纹 Polo、百褶裙、彩色分类提示卡

性格？
沉着、有条不紊，毒舌指数意外偏高

节目中的策略？
把联盟当合约谈，保持告解室零负评

背景速写。
蕾妮拥有一面辩论奖杯墙，却没有任何户外勋章；她上节目就是想证明脑力足以击败泥巴冠军。`,
  },
  {
    title: "森林系守护者",
    description: "能和松鼠聊心事、也能和厨师的鳄鱼打交道的自然导师。",
    prompt: `角色名称？
派恩·奥布里

所属队伍？
邪恶秃鹫队

在节目中的人设？
禅系户外艺术家，关键时刻爆发力惊人

拿手才艺？
追踪动物足迹、用藤蔓搭绳桥

招牌造型或道具？
泼彩营地帽衫、麻绳手环、旅行速写本

性格？
随和、内省，对任何人都温柔

节目中的策略？
保持低调、修补士气、在决赛中惊艳众人

背景速写。
派恩组织生态艺术营，只为募资野生动物保护才来参赛；真正的惊喜是他们为了棉花糖竟然如此好胜。`,
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
    title: "节目标签",
    key: "archetype",
    data: [
      { label: "运动健将", value: "athletic camper" },
      { label: "哥特乐手", value: "goth musician camper" },
      { label: "整蛊达人", value: "prankster camper" },
      { label: "智谋担当", value: "brainy strategist camper" },
      { label: "社交花蝴蝶", value: "social butterfly camper" },
      { label: "野营专家", value: "outdoors expert camper" },
      { label: "戏剧社明星", value: "theater kid camper" },
      { label: "富家大小姐", value: "rich kid diva camper" },
    ],
  },
  {
    title: "队伍",
    key: "team",
    data: [
      { label: "尖叫地鼠队", value: "screaming gophers team" },
      { label: "杀手鲈鱼队", value: "killer bass team" },
      { label: "英雄仓鼠队", value: "heroic hamsters team" },
      { label: "邪恶秃鹫队", value: "villainous vultures team" },
      { label: "胜利队", value: "team victory" },
      { label: "亚马逊队", value: "team amazon" },
      { label: "蛆虫队", value: "team maggot" },
      { label: "自由实习生", value: "freelance intern competitor" },
    ],
  },
  {
    title: "上装",
    key: "top",
    data: [
      { label: "营地 T 恤", value: "camp t shirt" },
      { label: "背心+帽衫", value: "tank top with hoodie" },
      { label: "名校 Polo", value: "preppy polo shirt" },
      { label: "哥特乐队衫", value: "goth band shirt" },
      { label: "运动短上衣", value: "athletic crop top" },
      { label: "救生衣造型", value: "camp life jacket" },
      { label: "格纹开衫", value: "plaid overshirt" },
      { label: "设计师外套", value: "designer camp jacket" },
    ],
  },
  {
    title: "下装",
    key: "bottom",
    data: [
      { label: "多口袋短裤", value: "cargo shorts" },
      { label: "及膝裙", value: "knee length skirt" },
      { label: "紧身牛仔裤", value: "skinny jeans" },
      { label: "休闲束脚裤", value: "jogger pants" },
      { label: "冲浪短裤", value: "board shorts" },
      { label: "泼漆背带裤", value: "paint splattered overalls" },
      { label: "苏格兰短裤", value: "tartan shorts" },
      { label: "七分裤", value: "capri pants" },
    ],
  },
  {
    title: "鞋履",
    key: "footwear",
    data: [
      { label: "高帮球鞋", value: "high top sneakers" },
      { label: "人字拖", value: "flip flops" },
      { label: "登山靴", value: "hiking boots" },
      { label: "帆布懒人鞋", value: "canvas slip on shoes" },
      { label: "雨靴", value: "camp rain boots" },
      { label: "复古溜冰鞋", value: "retro roller skates" },
      { label: "赤脚造型", value: "barefoot camper" },
      { label: "名牌乐福鞋", value: "designer loafers" },
    ],
  },
  {
    title: "发型",
    key: "hair",
    data: [
      { label: "凌乱马尾", value: "messy ponytail" },
      { label: "竖立短发", value: "spiky hair" },
      { label: "颓废刘海", value: "emo fringe hair" },
      { label: "卷曲爆炸头", value: "curly afro" },
      { label: "双辫", value: "braided pigtails" },
      { label: "寸头", value: "buzz cut" },
      { label: "波浪短发", value: "wavy bob" },
      { label: "奢华大卷", value: "luxurious curls" },
    ],
  },
  {
    title: "眼睛与特征",
    key: "eyes",
    data: [
      { label: "棕色眼睛", value: "brown eyes" },
      { label: "蓝色眼睛", value: "blue eyes" },
      { label: "绿色眼睛", value: "green eyes" },
      { label: "榛色眼睛", value: "hazel eyes" },
      { label: "灰色眼睛", value: "gray eyes" },
      { label: "紫色眼睛", value: "purple eyes" },
      { label: "雀斑脸颊", value: "freckled cheeks" },
      { label: "黑眼圈", value: "tired eye bags" },
    ],
  },
  {
    title: "表情",
    key: "face",
    data: [
      { label: "得意笑", value: "smug grin expression" },
      { label: "告解室慌张", value: "confessional panic face" },
      { label: "面无表情", value: "deadpan stare" },
      { label: "夸张白眼", value: "massive eye roll" },
      { label: "胜利欢呼", value: "triumphant cheer expression" },
      { label: "策划坏笑", value: "plotting smirk" },
      { label: "紧张微笑", value: "nervous smile" },
      { label: "专注目光", value: "focused glare" },
    ],
  },
  {
    title: "肤色",
    key: "skin",
    data: [
      { label: "白皙肤色", value: "pale skin" },
      { label: "浅棕肤色", value: "light tan skin" },
      { label: "深棕肤色", value: "deep brown skin" },
      { label: "古铜肤色", value: "warm bronze skin" },
      { label: "雀斑肤色", value: "freckled skin" },
      { label: "晒伤鼻尖", value: "sunburnt nose" },
      { label: "橄榄肌", value: "olive skin" },
      { label: "冷米色", value: "cool beige skin" },
    ],
  },
  {
    title: "道具",
    key: "accessory",
    data: [
      { label: "棉花糖奖杯", value: "camp marshmallow trophy" },
      { label: "策略笔记本", value: "strategy notebook accessory" },
      { label: "木吉他", value: "acoustic guitar prop" },
      { label: "运动相机", value: "action camera accessory" },
      { label: "防蚊喷雾", value: "bug spray accessory" },
      { label: "化妆包", value: "portable makeup kit" },
      { label: "求生绳索", value: "survival rope accessory" },
      { label: "话筒", value: "portable microphone" },
    ],
  },
  {
    title: "场景",
    key: "tdi_setting",
    data: [
      { label: "营火淘汰仪式", value: "campfire ceremony at night" },
      { label: "耻辱码头", value: "dock of shame sunset" },
      { label: "告解室", value: "confessional booth interior" },
      { label: "食堂", value: "camp mess hall" },
      { label: "障碍赛场", value: "obstacle course challenge" },
      { label: "瓦瓦那夸森林", value: "wawanakwa pine forest" },
      { label: "克里斯舞台", value: "reality show stage lights" },
      { label: "热带休憩区", value: "camp tiki lounge set" },
    ],
  },
];

const examples = [
  {
    image: "https://cdn.ocmaker.app/results/WZqC0w9T1_HLcX2-u6ZgS.png",
    prompt:
      "1girl, athletic camper, tan skin, messy ponytail, camp tank top layered over rashguard, cargo shorts, whistle accessory, confident grin, obstacle course background, total drama cartoon style, single character, full body, looking at viewer",
  },
  {
    image: "https://cdn.ocmaker.app/results/tAPM9iMaCxcOus75ETY4g.png",
    prompt:
      "1boy, prankster archetype, light brown skin, neon beanie, oversized hoodie, board shorts, action camera, smug grin, confessional booth background, total drama cartoon style, single character, upper body, looking at viewer",
  },
  {
    image: "https://cdn.ocmaker.app/results/ttKDE92Ey3wS1w633kRC7.png",
    prompt:
      "1girl, preppy strategist, pale skin, wavy bob, layered polo and camp tee, pleated skirt, cue cards accessory, composed smile, campfire ceremony background, total drama cartoon style, single character, full body, looking at viewer",
  },
  {
    image: "https://cdn.ocmaker.app/results/1hWZyVd__sJaR5jG4EZ4F.png",
    prompt:
      "1person, outdoors artist, freckles, curly afro, paint-splattered hoodie, overalls, sketchbook accessory, gentle smile, wawanakwa woods background, total drama cartoon style, single character, full body, looking at viewer",
  },
];

export default {
  meta: {
    title: "孤岛生存大乱斗 OC 生成器",
    description:
      "用 AI 打造专属《Total Drama Island》选手，秒生动、秒带戏精能量。",
  },
  series: "Total Drama Island",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "孤岛生存大乱斗 OC 生成器",
      description:
        "设定全新的真人秀选手：人设、穿搭与阴谋一应俱全，让你的角色立刻跳出屏幕。",
    },
    step: {
      title: "如何创建 Total Drama 角色",
      description: "你写告解室独白，我们负责动画像。跟着步骤走，就能活到最后一集。",
      steps: [
        {
          title: "介绍你的选手",
          description:
            "写出队伍、节目标签、穿搭风格与标志道具，再点明宿敌或盟友，为戏剧冲突铺路。",
        },
        {
          title: "加点真人秀味道",
          description:
            "提到口头禅、告解室秘密，以及他们在厨师整蛊时的反应，AI 会把这些细节融进画面。",
        },
        {
          title: "生成并端起棉花糖",
          description:
            "点击“生成角色”，即可获得原版卡通风格的插画与背景故事，仿佛马上要被投票。",
        },
      ],
    },
    examples: {
      title: "Total Drama 角色示例",
      description: "看看文字提示如何生成各类选手，从英雄到反派统统到齐。",
      examples,
    },
    features: {
      title: "大家都爱 孤岛生存大乱斗 OC 生成器的原因",
      description: "拥有人设爆点，不再被蚊子叮。打造不输原作的全新阵容。",
      features: [
        {
          label: "熟悉真人秀套路",
          description:
            "提示词理解联盟、背叛与告解室，角色设定自然贴合剧情逻辑。",
        },
        {
          label: "高度还原的卡通画风",
          description:
            "粗线条与夸张动作齐备，完美复刻 Total Drama 的视觉语言。",
        },
        {
          label: "策略驱动的背景故事",
          description:
            "直接生成动机、挑战强项与淘汰策略，让剧情瞬间成形。",
        },
        {
          label: "自定造型与道具",
          description:
            "从连帽衫到棉花糖奖杯，任意组合营地造型，角色性格一眼可见。",
        },
        {
          label: "快速迭代",
          description:
            "不断再生不同姿态与氛围，直到选出最佳告解室明星。",
        },
        {
          label: "适合角色扮演与二创",
          description:
            "下载角色卡即可投入论坛 RP、粉丝季或剪辑，不必从零开始。",
        },
      ],
    },
    faqs: {
      title: "常见问题",
      description: "还有疑问？欢迎写信到 support@ocmaker.app",
      faqs: [
        {
          question: "孤岛生存大乱斗 OC 生成器能做什么？",
          answer:
            "它能把你的文字设想转成 Total Drama 风格的插画与资料，让粉丝季一键成军。",
        },
        {
          question: "需要会画画吗？",
          answer:
            "不需要。输入选手构想，AI 会处理卡通线条、穿搭与表情。",
        },
        {
          question: "可以设定联盟与对手吗？",
          answer:
            "可以。把盟友或敌人的名字写进提示，生成的背景故事会自动提及这些关系。",
        },
        {
          question: "支持后续季节的设定吗？",
          answer:
            "支持。你可以写任何 Total Drama 队名或主题，系统都能识别。",
        },
        {
          question: "生成角色能用于个人企划吗？",
          answer:
            "当然。你拥有这些角色，可用于粉丝影片、小说或桌面 RPG。",
        },
        {
          question: "想换造型怎么办？",
          answer:
            "重新生成时调整穿搭描述，就能解锁不同的服装版本。",
        },
      ],
    },
    cta: {
      title: "灯光、镜头、告解室",
      description:
        "写下他们的开场独白，孤岛生存大乱斗 OC 生成器会负责画面、背景和戏剧冲突。",
      btns: {
        start: "开始创作",
        explore: "探索角色",
      },
    },
  },
};

