const basePrompt = `
  WORLD CONTEXT:
  故事：《死神 BLEACH》
  背景概述：现世、尸魂界、虚圈与无形帝国交错，死神、灭却师与虚之间的灵压战斗不断
  关键阵营：护庭十三队、假面军势、十刃／虚圈、星十字骑士团、完现术者 Xcution、代理死神、零番队

  OUTPUT FORMAT:
  姓名、种族与所属、战斗番队或小队、斩魄刀／能力主题、解放形态（始解／卍解等）、性格、前世／背景片段

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "护廷追踪者",
    description: "负责外围侦查的真央灵术院毕业生。",
    prompt: `角色名称？
村雨疾风

他的种族与所属？
护庭十三队的死神

他效力的番队或小队？
十番队的边境侦查班，巡逻流魂街外缘

斩魄刀或能力的主题？
名为“风切”的风压操控刀

他达成的解放形态？
已掌握始解；卍解化作难以驾驭的风暴巨龙

你会如何形容他的性格？
随和、细察入微，对平民有强烈保护欲

分享一段前世或背景片段。
生前是山岳救援向导，如今以记忆追踪流魂街森林中的虚。`,
  },
  {
    title: "假面流浪者",
    description: "戴着虚面，在暗处支援尸魂界的流亡者。",
    prompt: `角色名称？
茨城香奈

她的种族与所属？
活动于空座町附近的假面军势

她效力的番队或小队？
昔日五番队席官，现与浦原的情报网合作

斩魄刀或能力的主题？
“音影”操纵幻象声波

她达成的解放形态？
精通始解，佩戴部分虚面获得回声定位

你会如何形容她的性格？
懒散、狡黠，却背负幸存者罪恶感

分享一段前世或背景片段。
在蓝染叛变后逃离，暗中为有灵力的人类建立安全屋。`,
  },
  {
    title: "破面谋士",
    description: "旧十刃副官，试图在虚圈之外寻找新道路。",
    prompt: `角色名称？
贝尔德·金托

他的种族与所属？
加入妮莉艾露中立阵线的破面

他效力的番队或小队？
担任调停委员会，化解虚圈城邦纷争

斩魄刀或能力的主题？
翡翠结晶碎片，可延展成防御屏障

他达成的解放形态？
归刃“结晶化”令身躯披上镜面刀甲

你会如何形容他的性格？
沉静、哲思，却暗自羡慕人类温度

分享一段前世或背景片段。
曾是收藏知识的虚，如今在部族间斡旋，守护渴望和平的族人。`,
  },
  {
    title: "灭却师档案官",
    description: "无形帝国的幸存者，为未来记录禁术。",
    prompt: `角色名称？
阿斯特丽德·福格尔

她的种族与所属？
隐藏在石田网络中的纯血灭却师

她效力的番队或小队？
前星徽研究员，暗中协助一护阵营

斩魄刀或能力的主题？
名为“档案弓”的灵子弓，能记录敌方灵压

她达成的解放形态？
完圣体“书库”化作卷册，短暂复制对手术式

你会如何形容她的性格？
寡言、学究气，懊悔曾参与的暴行

分享一段前世或背景片段。
在友哈巴赫征战期间保存禁书，如今教授灭却师历史以避免战争重演。`,
  },
  {
    title: "完现术快递员",
    description: "让运送任务化作雷霆突袭的完现术者。",
    prompt: `角色名称？
田边陆

他的种族与所属？
与 Xcution 改革派合作的人类完现术者

他效力的番队或小队？
担任浦原与代理死神的机动快递员

斩魄刀或能力的主题？
完现术“截止线”赋予背包瞬移冲刺

他达成的解放形态？
强化完现术可展开减速时间泡

你会如何形容他的性格？
精力充沛、值得信赖，总与时间赛跑

分享一段前世或背景片段。
在一次致命车祸中仍紧抱救命包裹，被此执念唤醒完现术。`,
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
      { label: "资深战士", value: "adult" },
      { label: "老练守护者", value: "veteran" },
      { label: "经验长者", value: "seasoned elder" },
      { label: "不朽传奇", value: "timeless legend" },
      { label: "真央灵院生", value: "shino rookie" },
      { label: "席官资历", value: "seated officer veteran" },
      { label: "星十字余孽", value: "wandenreich elder" },
      { label: "破面长者", value: "arrancar elder" },
      { label: "完现术前辈", value: "fullbring mentor" },
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
    title: "眼神",
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
      { label: "凌厉表情", value: "fierce snarl" },
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
      { label: "多功能外套", value: "utility jacket" },
      { label: "层叠外套", value: "layered coat" },
      { label: "休闲束腰上衣", value: "casual tunic" },
      { label: "战斗甲衣", value: "armored vest" },
      { label: "宽松上衣", value: "loose shirt" },
      { label: "连帽斗篷", value: "hooded cloak" },
      { label: "典礼长袍", value: "ceremonial robe" },
      { label: "死神队服上衣", value: "shinigami shihakusho top" },
      { label: "虚圈风披风", value: "arrancar coat" },
      { label: "灭却师军服", value: "quincy military coat" },
      { label: "完现术街装", value: "fullbring street jacket" },
      { label: "零番队礼服", value: "royal guard robes" },
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
      { label: "死神 hakama", value: "shinigami hakama" },
      { label: "虚圈长袍下摆", value: "arrancar hem" },
      { label: "灭却师披挂", value: "quincy cloak tails" },
      { label: "完现术机动裤", value: "fullbring active pants" },
      { label: "皇军吊带裤", value: "royal guard set pants" },
    ],
  },
  {
    title: "整套风格",
    key: "set",
    data: [
      { label: "战斗制服", value: "combat uniform" },
      { label: "旅行者套装", value: "casual traveler outfit" },
      { label: "正式礼装", value: "formal attire" },
      { label: "潜行装备", value: "stealth gear" },
      { label: "节庆服饰", value: "festival outfit" },
      { label: "王族礼服", value: "royal regalia" },
      { label: "游牧装束", value: "nomad attire" },
      { label: "护庭十三队整套", value: "gotei uniform" },
      { label: "假面军势装备", value: "visored set" },
      { label: "虚夜宫制服", value: "las noches uniform" },
      { label: "星十字骑士套装", value: "wandenreich uniform" },
      { label: "完现术行动装", value: "fullbring outfit" },
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
      { label: "灵子织物", value: "reishi weave" },
      { label: "虚圈骨质", value: "hollow bone plates" },
      { label: "灭却师羽织", value: "quincy mantle" },
      { label: "灵王宫织锦", value: "royal guard brocade" },
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
      { label: "灵压记录器", value: "magic tome accessory" },
      { label: "死神队花", value: "shinigami badge" },
      { label: "虚面碎片", value: "hollow mask shard" },
      { label: "灭却师十字", value: "quincy cross" },
      { label: "完现术吊坠", value: "fullbring charm" },
      { label: "零番队纹饰", value: "royal insignia" },
    ],
  },
  {
    title: "灵压类型",
    key: "spirit_type",
    data: [
      { label: "死神", value: "shinigami" },
      { label: "虚／破面", value: "arrancar" },
      { label: "灭却师", value: "quincy" },
      { label: "完现术者", value: "fullbringer" },
      { label: "混血／代理", value: "hybrid" },
    ],
  },
];

const examples = [
  {
    image: "https://cdn.ocmaker.app/example/bleach-oc-maker-generated-1.webp",
    prompt:
      "1boy, black hair with white streaks, blue eyes, shinigami uniform, white scarf, zanpakuto sword, serious expression, spiritual aura, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/bleach-oc-maker-generated-2.webp",
    prompt:
      "1girl, silver hair, yellow eyes, arrancar uniform, hollow mask fragment on head, crescent blade weapon, confident stance, spiritual energy, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/bleach-oc-maker-generated-3.webp",
    prompt:
      "1boy, blonde hair, blue eyes, quincy uniform, long coat with cross motif, spirit bow, calm expression, glowing arrows, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image: "https://cdn.ocmaker.app/example/bleach-oc-maker-generated-4.webp",
    prompt:
      "1girl, brown hair, green eyes, casual outfit with spiritual accessories, fullbring aura, gloves glowing, determined expression, single character, upper body, looking at viewer, anime style, simple background",
  },
];

export default {
  meta: {
    title: "BLEACH OC 角色生成器",
    description:
      "借助 AI 创作你的《死神 BLEACH》原创角色，打造死神、灭却师、虚与完现术者的灵压档案。",
  },
  series: "死神 BLEACH",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "死神 OC 生成器",
      description: "输入角色设定，立即生成贴合《死神》世界观的原创灵压战士。",
    },
    step: {
      title: "如何打造死神 OC",
      description:
        "创建《死神》角色就像编排一场灵压战斗，按以下步骤完成你的 OC。",
      steps: [
        {
          title: "描述基础形象",
          description:
            "填写角色的外貌、服装与种族。可加入死神队服、虚面碎片、灭却师军装或完现术者街头风等细节。",
        },
        {
          title: "定义灵压能力",
          description:
            "说明所属阵营、番队或组织，并详细描述斩魄刀主题、完现术媒介、归刃或完圣体等阶段。",
        },
        {
          title: "生成你的战斗档案",
          description:
            "点击“生成角色”，即可获得多种 AI 设计，挑选最贴合的版本加入尸魂界、虚圈或现世战场。",
        },
      ],
    },
    examples: {
      title: "死神  OC 示例",
      description: "查看使用死神 OC 生成器 文字提示生成的灵压角色样板。",
      examples,
    },
    features: {
      title: "死神 OC 生成器 的亮点",
      description:
        "死神 OC 生成器 专为《死神》打造，只要描述角色就能生成兼具灵压与美术风格的设定图。",
      features: [
        {
          label: "灵压世界观还原",
          description:
            "呈现尸魂界、虚圈、无形帝国等场景细节，让角色自然融入剧中世界。",
        },
        {
          label: "多阵营支持",
          description:
            "无论死神、虚、灭却师或完现术者，都能提供对应的能力与装备选项。",
        },
        {
          label: "快速生成高质量立绘",
          description: "数秒内获得专业水准的角色视觉，适合同人创作与战斗档案。",
        },
        {
          label: "能力设定细节",
          description:
            "支持始解、卍解、归刃、完圣体等层级描述，打造层次分明的战力成长。",
        },
        {
          label: "多样化造型变体",
          description:
            "每次生成都提供多个结果，便于挑选最合适的制服、仿生或街头风。",
        },
        {
          label: "完整背景整合",
          description:
            "除了视觉，还能扩展前世记忆、所属组织与战斗动机，形成完善角色档案。",
        },
      ],
    },
    faqs: {
      title: "常见问题",
      description: "还有疑问？欢迎来信 support@ocmaker.app",
      faqs: [
        {
          question: "BLEACH OC 生成器 是什么？",
          answer:
            "BLEACH OC 生成器 是为《死神》世界设计的 AI 工具。描述角色的外貌与灵压能力后，系统会生成对应风格的角色立绘。",
        },
        {
          question: "如何让角色更贴合《死神》？",
          answer:
            "在描述中加入番队编号、斩魄刀解放语、虚面碎片或灭却师武器等细节，让角色更具原著风味。",
        },
        {
          question: "可以免费使用吗？",
          answer:
            "可以。基础功能免费；若想获得更快生成或更多自定义选项，可升级方案。",
        },
        {
          question: "为什么生成的风格这么像原作？",
          answer:
            "系统针对《死神》的美术与世界观调校，能理解各阵营的服饰、灵压表现与战斗语汇。",
        },
        {
          question: "我能把生成的角色用于同人作品吗？",
          answer:
            "当然可以！你用 BLEACH OC 生成器 创作的角色完全归你所有，可用于同人、角色扮演或战斗剧本。",
        },
        {
          question: "需要注册账号吗？",
          answer:
            "基础模式无需注册；注册后可保存角色、查看生成记录并解锁更多功能。",
        },
        {
          question: "能混合不同阵营的能力吗？",
          answer:
            "可以！可自由尝试死神与虚的混血、灭却师与完现术的组合，探索独特的灵压设定。",
        },
        {
          question: "未来还会追加其他动漫 OC 生成器 吗？",
          answer:
            "会的，我们持续扩充 OC 生成器 列表，欢迎持续关注 ocmaker.app。",
        },
      ],
    },
    cta: {
      title: "释放你的灵压",
      description:
        "无需绘画背景，只要输入设定即可生成属于你的《死神》原创角色。",
      btns: {
        start: "开始创作",
        explore: "探索 OC 示例",
      },
    },
  },
};
