const basePrompt = `
  WORLD CONTEXT:
  故事：《药屋少女的呢喃》
  背景概述：帝国皇都的内廷与花街交织，医药、毒案与权谋在密闭的宫闱与市井之间暗流涌动
  关键阵营：宫廷侍女与嬪妃、御医与太医署、花街药肆、暗访调查人脉、望族府邸

  OUTPUT FORMAT:
  姓名、身份与任职地点、医药或调查专长、盟友／庇护者、性格、代表案件、背景速写

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "内廷药侍",
    description: "机智的宫女，一边熬药一边暗中破解毒案。",
    prompt: `角色名称？
梅若兰

身份与任职地点？
出身卑微的宫女，被派往内廷的玉清阁服侍

医药或调查专长？
靠舌尖尝药辨识罕见毒物，并善用草药对策

主要盟友或庇护者？
御医署太医与一位心怀同情的宠妃

性格特质？
嘴上常带几分讥诮，胆大、对宫中流言充满好奇

让她声名大噪的案件？
从茶杯残留的茶渍推理出缓慢发作的砒霜陷害

请分享一个背景片段。
幼年被卖入宫，她将父亲的药谱偷偷带入内廷，在跑腿间隙悄悄救人。`,
  },
  {
    title: "花街药师",
    description: "游走青楼与黑市之间，为客人与游侠调配生路。",
    prompt: `角色名称？
韩素音

身份与任职地点？
鸿兰坊注册药师

医药或调查专长？
调制破解伪劣脂粉与暗藏毒药的解方

主要盟友或庇护者？
一位老鸨、云游僧人与退休的杀手

性格特质？
率性、毒舌，却极力保护自己的病人

让她声名大噪的案件？
在皇族访客使用前识破含汞胭脂，避免毁容悲剧

请分享一个背景片段。
她曾是逃离培训的见习芸伎，靠行商药队学得秘方才换回自由。`,
  },
  {
    title: "太医署抄录官",
    description: "从账册里挑出弊端的年轻书吏。",
    prompt: `角色名称？
许文晏

身份与任职地点？
太医署档案房的年轻士族抄写官

医药或调查专长？
交叉比对账册以揪出被调包的药材与贪污的补给

主要盟友或庇护者？
一位主张改革的大臣，与隐居的档案馆守册人

性格特质？
细致、话少，却被强烈的正义感驱动

让他声名大噪的案件？
揭露运往育婴所的补品被换成锯末

请分享一个背景片段。
放弃仕途改学医，以为精确的账本比刀剑更能救人。`,
  },
  {
    title: "游坊茶医",
    description: "随茶行医的旅人，每煮一壶都带来消息。",
    prompt: `角色名称？
蓝嘉怡

身份与任职地点？
自由茶师，来往于贵族府邸与乡间寺庙之间

医药或调查专长？
以茶香配穴脉诊症，并在旅途中察访消息

主要盟友或庇护者？
寺院僧侣、农会与一位戴面具的戏班名伶

性格特质？
爽朗、善于说服，能在任何阶层自由应对

让她声名大噪的案件？
从茉莉茶中的砷味识破冒充税官的骗子

请分享一个背景片段。
她幼时跟随祖母学医，曾把药藏在茶叶里，一面行医一面躲避贪官与盗匪。`,
  },
  {
    title: "御前验案学士",
    description: "把新式鉴证术带进皇城的法医奇才。",
    prompt: `角色名称？
沈启鸿

身份与任职地点？
科举出身的一等学士，担任大理寺外聘检验官

医药或调查专长？
以墨粉、指纹拓印与植物痕迹重建案情

主要盟友或庇护者？
太子与一位半信半疑却好奇的御前大法官

性格特质？
沉着、有条理，暗中期待体制改革

让他声名大噪的案件？
以稀有花粉对上对手温室的品种，为无辜贵族洗刷冤屈

请分享一个背景片段。
目睹乡里冤案后，他立誓把学问与验案术结合，再不让错判重演。`,
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
      { label: "内廷侍女", value: "young palace maid" },
      { label: "市井药师", value: "market apothecary adult" },
      { label: "宫廷太医", value: "seasoned court physician" },
      { label: "退隐贵族医者", value: "retired healer" },
      { label: "行脚老药农", value: "elder herbalist" },
    ],
  },
  {
    title: "体态",
    key: "body",
    data: [
      { label: "修长", value: "slender" },
      { label: "健壮", value: "athletic" },
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
      { label: "微笑", value: "smiling expression" },
      { label: "严肃目光", value: "serious expression" },
      { label: "冷静神色", value: "stoic expression" },
      { label: "俏皮笑容", value: "playful grin" },
      { label: "凌厉嗤笑", value: "fierce snarl" },
      { label: "温暖笑意", value: "warm smile" },
    ],
  },
  {
    title: "肤色",
    key: "skin",
    data: [
      { label: "白皙肤色", value: "fair skin" },
      { label: "暖棕肤色", value: "tan skin" },
      { label: "小麦肤色", value: "olive skin" },
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
      { label: "多功能外袍", value: "utility jacket" },
      { label: "层叠外套", value: "layered coat" },
      { label: "轻便束腰上衣", value: "casual tunic" },
      { label: "甲胄背心", value: "armored vest" },
      { label: "宽松薄衫", value: "loose shirt" },
      { label: "连帽斗篷", value: "hooded cloak" },
      { label: "仪式长袍", value: "ceremonial robe" },
      { label: "内廷汉服", value: "inner palace hanfu" },
      { label: "绣纹儒衫", value: "embroidered scholar robe" },
      { label: "围裙药师背心", value: "apothecary vest" },
      { label: "行吟茶衣", value: "traveling tea coat" },
      { label: "宫廷密谋斗篷", value: "court intrigue cloak" },
    ],
  },
  {
    title: "下装",
    key: "bottom",
    data: [
      { label: "多袋长裤", value: "cargo trousers" },
      { label: "合身长裤", value: "fitted pants" },
      { label: "百褶裙", value: "pleated skirt" },
      { label: "战斗短裤", value: "battle shorts" },
      { label: "飘逸长袍", value: "flowing robes" },
      { label: "装甲护胫", value: "armored greaves" },
      { label: "层叠裳摆", value: "layered wraps" },
      { label: "丝质百褶裙", value: "silk pleated skirt" },
      { label: "叠层疗愈裤", value: "layered healer pants" },
      { label: "市井长裤", value: "market street trousers" },
      { label: "宫廷曳地长裙", value: "palace train" },
      { label: "结实旅者护腿", value: "sturdy traveler leggings" },
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
      { label: "节庆盛装", value: "festival outfit" },
      { label: "王室礼服", value: "royal regalia" },
      { label: "游牧装束", value: "nomad attire" },
      { label: "内廷侍者套装", value: "inner palace attendant set" },
      { label: "花街疗愈套装", value: "pleasure district healer set" },
      { label: "御医正装全套", value: "imperial physician formal set" },
      { label: "茶旅行装", value: "tea caravan wanderer outfit" },
      { label: "密探查毒伪装", value: "poison investigator disguise" },
    ],
  },
  {
    title: "材质",
    key: "material",
    data: [
      { label: "织布", value: "woven fabric" },
      { label: "抛光皮革", value: "polished leather" },
      { label: "强化装甲", value: "reinforced armor" },
      { label: "轻薄纤维", value: "high-tech fiber" },
      { label: "天然织物", value: "organic weave" },
      { label: "龙皮", value: "dragonhide" },
      { label: "秘法布料", value: "mystic cloth" },
      { label: "染色宫绸", value: "dyed palace silk" },
      { label: "刺绣织锦", value: "embroidered brocade" },
      { label: "漆竹", value: "lacquered bamboo" },
      { label: "风化棉布", value: "weathered cotton" },
      { label: "熏香薄纱", value: "perfumed muslin" },
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
      { label: "药典卷轴", value: "magic tome accessory" },
      { label: "药囊", value: "medicine satchel" },
      { label: "瓷质簪", value: "porcelain hairpin" },
      { label: "茶礼折扇", value: "tea ceremony fan" },
      { label: "研钵项链", value: "herbal mortar necklace" },
      { label: "御印手链", value: "imperial seal bracelet" },
    ],
  },
];
const examples = [
  {
    image:
      "https://cdn.ocmaker.app/example/apothecary-oc-maker-generated-1.webp",
    prompt:
      "1girl, long black hair with hair ornaments, amber eyes, clever expression, apothecary diaries style chinese palace dress, medicine pouch, holding herbs, imperial palace setting, anime style, looking at viewer, simple background, upper body",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/apothecary-oc-maker-generated-2.webp",
    prompt:
      "1girl, purple hair in elaborate updo, green eyes, mysterious smile, apothecary diaries style court lady hanfu, jade accessories, fan, elegant pose, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/apothecary-oc-maker-generated-3.webp",
    prompt:
      "1boy, dark hair with topknot, sharp blue eyes, serious expression, apothecary diaries style imperial guard uniform, sword at side, protective stance, single character, upper body, looking at viewer, anime style, simple background",
  },
  {
    image:
      "https://cdn.ocmaker.app/example/apothecary-oc-maker-generated-4.webp",
    prompt:
      "1girl, red hair with traditional accessories, golden eyes, mischievous grin, apothecary diaries style servant outfit, carrying tea tray, palace maid, single character, upper body, looking at viewer, anime style, simple background",
  },
];
export default {
  meta: {
    title: "药屋呢喃 OC 角色生成器",
    description:
      "借助 AI 打造属于你的《药屋少女的呢喃》原创角色，呈现宫廷医药与权谋悬案的独特风情。",
  },
  series: "药屋少女的呢喃",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "The Apothecary Diaries OC Maker",
      description:
        "输入角色设定，即刻生成身处皇城秘苑的原创角色图像与故事。",
    },
    step: {
      title: "如何打造《药屋少女的呢喃》风 OC",
      description:
        "按照下列步骤，就能让角色自然融入宫廷医案与权谋心计的世界。",
      steps: [
        {
          title: "描绘你的宫廷角色",
          description:
            "填写角色的外貌与性格。若能加入传统华服、宫中职务、医药背景或察言观色的心机，将更贴合作品氛围。",
        },
        {
          title: "补充细节与宫廷元素",
          description:
            "写出他们在宫廷或花街的身份、擅长的医药与毒理、牵扯的案件线索。设定越呼应皇都日常，生成结果就越真实。",
        },
        {
          title: "生成并挑选设计",
          description:
            "按下“生成角色”即可取得多种 AI 设计，挑选最符合你心中形象的版本完成角色。",
        },
      ],
    },
    examples: {
      title: "角色范例",
      description:
        "看看这些由文字提示生成的《药屋少女的呢喃》风格原创角色。",
      examples,
    },
    features: {
      title: "什么是药屋呢喃 OC Maker？",
      description:
        "药屋呢喃 OC Maker 是为《药屋少女的呢喃》量身调校的版本。描述角色之后，系统会立刻生成宫廷风格的插画。",
      features: [
        {
          label: "地道的宫廷人物设计",
          description:
            "角色能够贴合原作中皇城、御医与权斗的独特气质，在画面与氛围上都保持真实。",
        },
        {
          label: "专属提示调优",
          description:
            "提示语针对宫廷美学调校——包含传统服饰、阶级称谓与医药器具，帮助你建立更可信的角色。",
        },
        {
          label: "极速角色生成",
          description:
            "数秒就能产出高质量结果，让你把时间留给构思故事与人物关系。",
        },
        {
          label: "高解析视觉输出",
          description:
            "依托先进 AI 模型，生成细腻、适合剧情或设定集的高分辨率角色图像。",
        },
        {
          label: "一次取得多种方案",
          description:
            "每次生成都会提供多种参考版本，自由挑选最契合想法的造型。",
        },
        {
          label: "深度剧情整合",
          description:
            "不只图像，亦涵盖盟友、代表案件与过往经历，让角色真正融入帝都秘闻。",
        },
      ],
    },
    faqs: {
      title: "常见问题",
      description: "还有疑问？欢迎寄信至 support@ocmaker.app",
      faqs: [
        {
          question: "药屋呢喃 OC Maker 是什么？运作方式如何？",
          answer:
            "这是专为《药屋少女的呢喃》世界观调校的 OC Maker。描述角色后，AI 会依照提示在几秒内生成宫廷风格图像。",
        },
        {
          question: "如何让药屋呢喃 OC Maker 产出更好的角色？",
          answer:
            "描述时请加入宫廷设定、医药专长、案件线索或性格特质等细节。画面越具体，生成结果越精准。",
        },
        {
          question: "药屋呢喃 OC Maker 可以免费使用吗？",
          answer:
            "可以。基础方案完全免费，若想追求更快速度或更多自定义选项，可随时升级方案。",
        },
        {
          question: "药屋呢喃 OC Maker 的成品为何如此精致？",
          answer:
            "我们使用针对作品氛围微调的先进模型，确保角色的服饰、神态与场景都符合皇城气质。",
        },
        {
          question: "生成的角色能用于商业用途吗？",
          answer:
            "当然可以。你在药屋呢喃 OC Maker 创作的角色完全归属你本人，可自由运用于个人或商业计划。",
        },
        {
          question: "需要账号才能使用药屋呢喃 OC Maker 吗？",
          answer:
            "基础功能不需注册；若登入则可保存角色、追踪历史纪录并解锁更多功能。",
        },
        {
          question: "我可以重新生成或微调同一角色吗？",
          answer:
            "可以。你能针对同一提示反复生成，或调整描述直到成品完全符合想像。",
        },
        {
          question: "未来还会推出其他主题的 OC Maker 吗？",
          answer:
            "会的！我们计划推出更多动漫世界的专属 OC Maker，欢迎持续关注 ocmaker.app。",
        },
      ],
    },
    cta: {
      title: "开启你的宫廷医案",
      description:
        "无需绘画基础，也能让《药屋少女的呢喃》原创角色跃然眼前。",
      btns: {
        start: "开始创作",
        explore: "探索更多角色",
      },
    },
  },
};
