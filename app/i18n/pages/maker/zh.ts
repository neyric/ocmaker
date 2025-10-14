const basePrompt = `
  WORLD CONTEXT:
  宇宙：一个汇聚英雄、探索者、发明家、法师与日常传奇的原创多元宇宙
  场景：高度灵活——从霓虹巨城、浮空王国，到小镇或遥远星系
  核心主题：义气相投的伙伴团队、竞争学院、宇宙谜团、日常生活冒险

  OUTPUT FORMAT:
  姓名、原型与背景、外观亮点、标志性能力、性格、动机、背景速写

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "星光信使",
    description: "在星系之间传递加密讯息的宇宙奔跑者。",
    prompt: `角色名称？
韩星黎

他们的原型与背景是什么？
在轨道站长大的星际快递员

描述他们的外观亮点。
全息夹克、明亮的青绿色长发、昏暗环境下会发光的星座纹身

他们的标志性能力是什么？
能让她在光点之间疾行的光子步行靴

如何概括他们的性格？
乐观、机智、内心柔软

是什么驱动着他们？
让被距离分隔的家庭仍能保持联系

分享一个背景片段。
她曾偷运一枚加密记忆晶片，让失散的双胞胎科学家重聚，并阻止了一场失控的人工智能级联。`,
  },
  {
    title: "都市合成师",
    description: "用音乐与机械混音打击犯罪的城市发明家。",
    prompt: `角色名称？
凌若弦

他们的原型与背景是什么？
来自垂直巨城的街头工程师兼音乐人

描述他们的外观亮点。
铜色卷发、增强现实护目镜、夹克外层覆有响应式发光面板

他们的标志性能力是什么？
能将节奏转化为防护与冲击的声波护臂

如何概括他们的性格？
顽皮、极度忠诚、即兴天才

是什么驱动着他们？
让永不眠的城市持续保持和谐

分享一个背景片段。
在朋友被困于全城停电时，她打造了一间可携式录音室，同时充当救援信标。`,
  },
  {
    title: "奥术档案官",
    description: "为后世整理遗失咒语的流浪法师。",
    prompt: `角色名称？
林艾若

他们的原型与背景是什么？
由跨界图书馆培育的游历历史学家

描述他们的外观亮点。
银色辫发、漂浮的符文指环、缀有地图碎片的拼接披风

他们的标志性能力是什么？
能让她重现古籍片段的记忆符印

如何概括他们的性格？
好奇、耐心、静静的勇敢

是什么驱动着他们？
确保魔法既可获取又被负责任地使用

分享一个背景片段。
她曾改写一项被禁的仪式，将其重塑为治愈咒文拯救了一个村庄。`,
  },
  {
    title: "天际守望者",
    description: "驾驶自适应装甲穿梭摩天楼之间的守护者。",
    prompt: `角色名称？
顾衡羽

他们的原型与背景是什么？
来自气候防护巨城浮空区的守护者

描述他们的外观亮点。
可调节羽翼的外骨骼、温暖的棕色肌肤、金色格纹纹身

他们的标志性能力是什么？
能引导风暴与碎片的气场共振护盾

如何概括他们的性格？
沉着、战略型，满满的大哥哥气场

是什么驱动着他们？
守护社区安全，同时激励年轻飞行者

分享一个背景片段。
他曾将闪电导入战甲，引导一辆悬空电车安全降落，拯救乘客。`,
  },
  {
    title: "梦境潜行者",
    description: "在共享梦境中解开谜团的讲故事者。",
    prompt: `角色名称？
夏菲梦

他们的原型与背景是什么？
绘制潜意识领域的社区梦行者

描述他们的外观亮点。
星河般的雀斑、如极光般闪烁的层叠围巾、不断变化的瞳色

他们的标志性能力是什么？
能将记忆纺成线索的梦境丝线

如何概括他们的性格？
共情、古灵精怪、内心坚定

是什么驱动着他们？
通过解开隐藏故事帮助人们痊愈

分享一个背景片段。
她曾引导邻居们穿越集体噩梦，揭露了现实世界中的阴谋。`,
  },
];

const ocOptions = [
  {
    title: "性别",
    key: "gender",
    unique: true,
    data: [
      { label: "女孩", value: "1girl" },
      { label: "男孩", value: "1boy" },
      { label: "非二元性别", value: "none" },
    ],
  },
  {
    title: "年龄",
    key: "age",
    data: [
      { label: "儿童", value: "child" },
      { label: "青春期前", value: "preteen" },
      { label: "早期青少年", value: "young teen" },
      { label: "中期青少年", value: "mid teen" },
      { label: "晚期青少年", value: "late teen" },
      { label: "青年", value: "young adult" },
      { label: "成人", value: "adult" },
      { label: "成熟成人", value: "mature adult" },
      { label: "中年", value: "middle aged" },
      { label: "年长成人", value: "older adult" },
      { label: "长者", value: "elderly" },
      { label: "无龄感", value: "ageless being" },
      { label: "远古存在", value: "ancient entity" },
      { label: "合成体", value: "synthetic adult" },
    ],
  },
  {
    title: "体型",
    key: "body",
    data: [
      { label: "娇小", value: "petite build" },
      { label: "纤细", value: "slim build" },
      { label: "轻盈", value: "lithe frame" },
      { label: "运动型", value: "athletic build" },
      { label: "曲线", value: "curvy figure" },
      { label: "肌肉型", value: "muscular build" },
      { label: "宽肩", value: "broad shouldered" },
      { label: "结实", value: "stocky physique" },
      { label: "高挑", value: "tall stature" },
      { label: "紧凑", value: "compact build" },
      { label: "大码", value: "plus size" },
      { label: "飘渺", value: "ethereal silhouette" },
      { label: "强化改造", value: "augmented body" },
      { label: "半机械", value: "cybernetic enhancements" },
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
      { label: "白发", value: "white hair" },
      { label: "银发", value: "silver hair" },
      { label: "马卡龙色", value: "pastel hair" },
      { label: "彩虹色", value: "rainbow hair" },
      { label: "光头", value: "shaved head" },
      { label: "编辫", value: "braided hair" },
      { label: "卷发", value: "curly hair" },
      { label: "波浪卷", value: "wavy hair" },
      { label: "爆炸头", value: "afro hairstyle" },
      { label: "高马尾", value: "high ponytail" },
      { label: "丸子头", value: "space buns" },
      { label: "莫西干", value: "mohawk" },
      { label: "发光发丝", value: "glowing hair" },
    ],
  },
  {
    title: "眼睛",
    key: "eyes",
    data: [
      { label: "棕色眼睛", value: "brown eyes" },
      { label: "蓝色眼睛", value: "blue eyes" },
      { label: "绿色眼睛", value: "green eyes" },
      { label: "榛色眼睛", value: "hazel eyes" },
      { label: "琥珀眼睛", value: "amber eyes" },
      { label: "灰色眼睛", value: "gray eyes" },
      { label: "紫色眼睛", value: "violet eyes" },
      { label: "金色眼睛", value: "golden eyes" },
      { label: "银色眼睛", value: "silver eyes" },
      { label: "异色瞳", value: "heterochromia" },
      { label: "发光眼睛", value: "glowing eyes" },
      { label: "机械眼", value: "mechanical eyes" },
      { label: "兽类眼", value: "animal-like eyes" },
      { label: "星辰眼", value: "starry eyes" },
    ],
  },
  {
    title: "表情",
    key: "face",
    data: [
      { label: "开朗微笑", value: "cheerful expression" },
      { label: "面无表情", value: "stoic expression" },
      { label: "严肃神情", value: "serious expression" },
      { label: "神秘气场", value: "mysterious aura" },
      { label: "调皮笑容", value: "playful grin" },
      { label: "凌厉目光", value: "intense gaze" },
      { label: "温暖微笑", value: "warm smile" },
      { label: "柔和目光", value: "soft gaze" },
      { label: "坚定神情", value: "determined look" },
      { label: "凌厉表情", value: "fierce expression" },
      { label: "淡淡忧郁", value: "melancholic expression" },
      { label: "自信浅笑", value: "confident smirk" },
      { label: "惊讶神情", value: "surprised expression" },
      { label: "梦幻神色", value: "dreamy expression" },
    ],
  },
  {
    title: "肤色",
    key: "skin",
    data: [
      { label: "瓷白肤色", value: "porcelain skin" },
      { label: "白皙肤色", value: "fair skin" },
      { label: "浅古铜", value: "light tan skin" },
      { label: "暖古铜", value: "tan skin" },
      { label: "橄榄肤色", value: "olive skin" },
      { label: "金棕肤色", value: "golden brown skin" },
      { label: "深棕肤色", value: "deep brown skin" },
      { label: "乌木肤色", value: "ebony skin" },
      { label: "雀斑肤色", value: "freckled skin" },
      { label: "红润肤色", value: "rosy skin" },
      { label: "浅蓝肤色", value: "pale blue skin" },
      { label: "祖母绿肤色", value: "emerald skin" },
      { label: "金属质感", value: "metallic skin" },
      { label: "虹彩肤色", value: "iridescent skin" },
      { label: "半透明肤色", value: "translucent skin" },
    ],
  },
  {
    title: "上装",
    key: "top",
    data: [
      { label: "休闲连帽衫", value: "casual hoodie" },
      { label: "剪裁西装外套", value: "tailored blazer" },
      { label: "高领毛衣", value: "cozy turtleneck" },
      { label: "图案 T 恤", value: "graphic t-shirt" },
      { label: "皮夹克", value: "leather jacket" },
      { label: "牛仔外套", value: "denim jacket" },
      { label: "短款上衣", value: "cropped top" },
      { label: "战斗护甲", value: "armored chestplate" },
      { label: "法师长袍", value: "flowing mage robe" },
      { label: "传统和服", value: "traditional kimono" },
      { label: "正式西装外套", value: "formal suit jacket" },
      { label: "飞行夹克", value: "flight jacket" },
      { label: "机能外套", value: "techwear jacket" },
      { label: "运动球衣", value: "sports jersey" },
      { label: "工作围裙", value: "work apron" },
      { label: "披甲斗篷", value: "armored cloak" },
    ],
  },
  {
    title: "下装",
    key: "bottom",
    data: [
      { label: "修身牛仔裤", value: "slim jeans" },
      { label: "剪裁长裤", value: "tailored trousers" },
      { label: "工装裤", value: "cargo pants" },
      { label: "运动束脚裤", value: "athleisure joggers" },
      { label: "休闲短裤", value: "casual shorts" },
      { label: "百褶裙", value: "pleated skirt" },
      { label: "飘逸长裙", value: "flowing long skirt" },
      { label: "皮裤", value: "leather pants" },
      { label: "战斗护腿", value: "armored greaves" },
      { label: "机能短裙", value: "utility skirt" },
      { label: "正式西裤", value: "formal suit pants" },
      { label: "紧身裤", value: "fitted leggings" },
      { label: "垂坠裹裤", value: "draped wrap pants" },
      { label: "科技吊带裤", value: "tech harness bottoms" },
      { label: "背带裤", value: "denim overalls" },
      { label: "装甲裙", value: "armored skirt" },
    ],
  },
  {
    title: "整套造型",
    key: "set",
    data: [
      { label: "休闲街头风", value: "casual streetwear outfit" },
      { label: "校园制服", value: "school uniform" },
      { label: "英雄战衣", value: "hero suit" },
      { label: "战斗装甲", value: "battle ready armor" },
      { label: "幻想冒险者", value: "fantasy adventurer outfit" },
      { label: "太空探索者", value: "space explorer gear" },
      { label: "赛博朋克装备", value: "cyberpunk outfit" },
      { label: "隐身行动套装", value: "stealth ops suit" },
      { label: "正式晚宴装", value: "formal evening attire" },
      { label: "皇室礼服", value: "royal regalia" },
      { label: "传统礼仪装", value: "traditional ceremonial wear" },
      { label: "魔法学者袍", value: "arcane scholar robes" },
      { label: "运动制服", value: "sports uniform" },
      { label: "末日求生装", value: "post-apocalyptic survival gear" },
      { label: "沙漠游侠", value: "desert nomad attire" },
      { label: "深海潜航服", value: "oceanic diver suit" },
    ],
  },
  {
    title: "材质",
    key: "material",
    data: [
      { label: "棉质", value: "soft cotton" },
      { label: "牛仔布", value: "denim fabric" },
      { label: "抛光皮革", value: "polished leather" },
      { label: "磨砂麂皮", value: "soft suede" },
      { label: "丝绸", value: "luxurious silk" },
      { label: "亚麻", value: "light linen" },
      { label: "羊毛", value: "cozy wool" },
      { label: "天鹅绒", value: "velvet fabric" },
      { label: "金属质感", value: "metallic plating" },
      { label: "碳纤维", value: "carbon fiber panels" },
      { label: "纳米纤维", value: "nano-fiber weave" },
      { label: "全息面料", value: "holographic fabric" },
      { label: "生物发光网", value: "bioluminescent mesh" },
      { label: "附魔布料", value: "enchanted cloth" },
      { label: "晶体织物", value: "crystal weave" },
      { label: "有机装甲", value: "organic armor" },
    ],
  },
  {
    title: "配饰",
    key: "accessory",
    data: [
      { label: "眼镜", value: "stylish glasses" },
      { label: "护目镜", value: "protective goggles" },
      { label: "耳机", value: "over-ear headphones" },
      { label: "围巾", value: "layered scarf" },
      { label: "项链", value: "statement necklace" },
      { label: "耳环", value: "ornate earrings" },
      { label: "手套", value: "fingerless gloves" },
      { label: "手镯", value: "stacked bracelets" },
      { label: "多功能腰带", value: "utility belt" },
      { label: "武器枪套", value: "weapon holster" },
      { label: "背包", value: "compact backpack" },
      { label: "斗篷", value: "dramatic cape" },
      { label: "科技植入", value: "visible cybernetic implants" },
      { label: "魔法书", value: "floating magic tome" },
      { label: "宠物伙伴", value: "floating companion creature" },
      { label: "能量武器", value: "glowing energy weapon" },
    ],
  },
  {
    title: "题材",
    key: "genre",
    data: [
      { label: "奇幻", value: "high fantasy" },
      { label: "都市奇幻", value: "urban fantasy" },
      { label: "科幻", value: "science fiction" },
      { label: "赛博朋克", value: "cyberpunk" },
      { label: "蒸汽朋克", value: "steampunk" },
      { label: "历史题材", value: "historical" },
      { label: "现代生活", value: "modern slice of life" },
      { label: "末日题材", value: "post-apocalyptic" },
      { label: "悬疑", value: "mystery" },
      { label: "太空歌剧", value: "space opera" },
      { label: "神话冒险", value: "mythic adventure" },
      { label: "魔法学院", value: "magical academy" },
      { label: "体育热血", value: "sports drama" },
      { label: "浪漫剧情", value: "romantic storyline" },
      { label: "恐怖惊悚", value: "supernatural horror" },
      { label: "喜剧", value: "lighthearted comedy" },
    ],
  },
  {
    title: "性格",
    key: "personality",
    data: [
      { label: "活泼开朗", value: "cheerful" },
      { label: "沉着冷静", value: "stoic" },
      { label: "神秘莫测", value: "mysterious" },
      { label: "气场强烈", value: "intense" },
      { label: "温柔体贴", value: "gentle" },
      { label: "挖苦幽默", value: "sarcastic" },
      { label: "乐观向上", value: "optimistic" },
      { label: "郁郁寡欢", value: "brooding" },
      { label: "爱玩调皮", value: "playful" },
      { label: "战术大师", value: "strategic thinker" },
      { label: "叛逆不羁", value: "rebellious" },
      { label: "守护型", value: "protective" },
      { label: "好奇探索", value: "curious" },
      { label: "共情者", value: "empathetic" },
      { label: "混沌善良", value: "chaotic good" },
      { label: "深谋远虑", value: "calculating demeanor" },
    ],
  },
  {
    title: "标志元素",
    key: "element",
    data: [
      { label: "火焰", value: "fire magic" },
      { label: "水流", value: "water manipulation" },
      { label: "大地", value: "earth control" },
      { label: "气流", value: "wind manipulation" },
      { label: "雷电", value: "lightning energy" },
      { label: "光芒", value: "radiant light" },
      { label: "暗影", value: "shadow energy" },
      { label: "自然", value: "nature magic" },
      { label: "寒冰", value: "ice powers" },
      { label: "声波", value: "sonic resonance" },
      { label: "科技", value: "advanced technology" },
      { label: "生命力", value: "life force aura" },
      { label: "时间", value: "time manipulation" },
      { label: "精神力", value: "psychic abilities" },
      { label: "炼金术", value: "alchemy arts" },
      { label: "虚空能量", value: "void energy" },
    ],
  },
  {
    title: "视觉风格",
    key: "style",
    data: [
      { label: "二次元风格", value: "anime style" },
      { label: "漫画插画", value: "manga illustration" },
      { label: "美式漫画", value: "comic art" },
      { label: "数字绘画", value: "digital painting" },
      { label: "半写实", value: "semi realistic" },
      { label: "写实插画", value: "realistic illustration" },
      { label: "赛璐璐上色", value: "cel shaded" },
      { label: "水彩风", value: "watercolor" },
      { label: "素描风", value: "sketch style" },
      { label: "像素风", value: "pixel art" },
      { label: "低多边形", value: "low poly render" },
      { label: "3D 渲染", value: "3d render" },
      { label: "Q 版风", value: "chibi style" },
      { label: "极简风", value: "minimalist illustration" },
      { label: "新黑色光影", value: "neo noir lighting" },
      { label: "复古动画", value: "retro anime" },
    ],
  },
];

export default {
  meta: {
    title: "AI 驱动的 OC 生成器 角色生成器，激发无限 OC 灵感",
    description:
      "借助自适应 AI 个性化原创角色，在数分钟内混合故事、外观与风格，创造无穷组合。",
  },
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "AI 驱动的 OC 生成器",
      description:
        "通过自适应 AI 助手，将 OC 生成器、角色创作与故事工具整合为适配你的创作流程。",
    },
    makerList: {
      title: "探索主题 OC Maker",
      description:
        "浏览为动漫、游戏与原创世界打造的专属生成器，为你的下一个角色寻找灵感。",
    },
    step: {
      title: "借助自适应 AI 进行设计",
      description: "结合引导式提示与精细控制，把灵感碎片打磨为完整 OC。",
      steps: [
        {
          title: "分享你的设想",
          description:
            "告诉 AI 角色的氛围、定位、世界观与小癖好，让它在生成前理解你的意图。",
        },
        {
          title: "自定义每个特征",
          description:
            "为体态、服装、能力和情绪自由配对标签，让每次迭代都朝你的标志风格靠近。",
        },
        {
          title: "故事与视觉同步生成",
          description:
            "让人物档案与头像并行生成，保存预设或不同版本，持续迭代不停歇。",
        },
      ],
    },
    examples: {
      title: "OC 示例",
      description: "预览 AI 如何将简单提示塑造为独特且个性化的角色。",
      examples: [
        {
          image:
            "https://cdn.ocmaker.app/example/frieren-oc-maker-generated-4.webp",
          prompt:
            "1girl, long white hair, green eyes, elf ears, serene expression, frieren style mage robes, wooden staff, magical aura, fantasy medieval setting, anime style, looking at viewer, simple background, upper body",
        },
        {
          image:
            "https://cdn.ocmaker.app/example/honkai-star-rail-oc-generated-3.webp",
          prompt:
            "1girl, pink hair with blue highlights, emerald eyes, gentle expression, silvermane guard uniform, belobog military style, ice crystals effects, path of preservation emblem, protective stance, single character, upper body, looking at viewer, anime style, simple background",
        },
        {
          image: "https://cdn.ocmaker.app/example/mlp-oc-generateds-1.webp",
          prompt:
            "1girl, pastel rainbow mane, sky blue coat, cutie mark with lightning bolt, unicorn horn, magical sparkles, cheerful expression, My Little Pony style, looking at viewer, simple background, upper body",
        },
        {
          image:
            "https://cdn.ocmaker.app/example/sailor-moon-oc-generated-2.webp",
          prompt:
            "1girl, short purple hair, violet eyes, mysterious smile, dark kingdom uniform, black and purple villain outfit, dark crystal accessories, elegant pose, single character, upper body, looking at viewer, anime style, dark palace background",
        },
      ],
    },
    features: {
      title: "AI 加持，细节尽在掌握",
      description:
        "我们以 AI 为核心的流程，让你保持主导，同时激发任何宇宙的角色灵感。",
      features: [
        {
          label: "AI 共创引擎",
          description: "模型会响应你的每次微调，确保每个 OC 都符合你的设定。",
        },
        {
          label: "引导式自定义控件",
          description:
            "叠加题材、能力、服装与情绪，使 AI 输出聚焦且匹配品牌调性。",
        },
        {
          label: "无限重混",
          description: "保存、复制并重混角色，秒开平行时间线与假设剧情。",
        },
        {
          label: "故事与视觉同步",
          description:
            "从同一上下文生成档案、卖点与肖像，让风格和语调保持一致。",
        },
        {
          label: "高质量输出",
          description: "接入领先 AI 模型，呈现清晰画面与动人叙事，随时分享。",
        },
        {
          label: "创作者友好导出",
          description:
            "打包提示、档案与美术，用于桌游卡、提案或团队世界观文档。",
        },
      ],
    },
    faqs: {
      title: "常见问题",
      description: "还有其他问题？请发送邮件至 support@ocmaker.app",
      faqs: [
        {
          question: "这个 OC 生成器可以做什么？",
          answer:
            "结合自适应 AI 提示与视觉控件，为小说、桌游、角色扮演、概念设计等打造量身定制的角色。整个过程中故事与外观始终保持一致。",
        },
        {
          question: "如何获得更好的生成效果？",
          answer:
            "清晰描述场景、情绪、能力与风格，并搭配我们的头像标签，AI 就能根据你的需求定制视觉与设定。",
        },
        {
          question: "这些角色可以商用吗？",
          answer: "可以。你创造的一切都归你所有，可按任何方式用于商业用途。",
        },
        {
          question: "需要绘画功底吗？",
          answer:
            "不需要。只要用文字描述角色，AI 就能渲染头像，你也可以同时完善故事。",
        },
        {
          question: "这个 OC 生成器是免费的吗？",
          answer:
            "背景故事生成免费且无需登录。你可以使用赠送点数体验 AI 肖像，若想获得更快的生成速度、更多输出与独家风格，可选择升级。",
        },
        {
          question: "有提供给新手的模板或提示吗？",
          answer:
            "当然！试试我们的模板与示例 OC，了解如何向 AI 传达需求。你可以重混它们或从零开始创建。",
        },
        {
          question: "角色描述可以写多详细？",
          answer:
            "写得越详细越好——AI 喜欢细节。包含外貌、性格、服装、配件或世界观背景，系统都会帮你保持连贯。",
        },
        {
          question: "怎样获取免费点数？",
          answer:
            "邀请好友并完成每日签到即可获得额外点数。需要更多生成次数时，可购买点数包或升级享受无限创作势能。",
        },
      ],
    },
    cta: {
      title: "准备好用 AI 创造下一个 OC 了吗？",
      description:
        "让自适应 OC Maker 在数分钟内把你的提示转化为无限个性化的角色。",
      btns: {
        start: "开始生成",
      },
    },
  },
};
