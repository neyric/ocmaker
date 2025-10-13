const basePrompt = `
  WORLD CONTEXT:
  故事：《Murder Drones》
  背景概述：人类撤离后的冰封行星铜 9，工蜂无人机艰难求生，拆解无人机夜间狩猎，求解者（Solver）的异质侵蚀蠢动
  关键元素：JCJenson 巨型企业、地下掩体、拆解小队、失控 AI 碎片、风雪工厂废墟、禁忌实验室

  OUTPUT FORMAT:
  机体编号、无人机类型与职能、核心模块或武装、机体外观、性格子程序、缺陷／异常、背景速写

  CHARACTER PREFERENCES:
  {PREFERENCES}
`;

const backstoryExamples = [
  {
    title: "抗腐化信使",
    description: "靠老旧测绘机改装，躲开拆解巡逻的工蜂无人机快递员。",
    prompt: `无人机编号？
VX-12 “Velocity”

机型类别？
强化耐寒的工蜂无人机信使

主要任务？
在掩体之间运送药剂与反应炉核心

依赖的模块或武器？
轨道尖刺发射器与可分离诱饵无人机

外观？
流线型悬浮机体，配有霓虹警示条纹

性格子程序？
嘴毒、专注任务、害怕寂静

标志性缺陷？
导航程序紧张时会哼 80 年代流行歌

背景速写。
Velocity 打捞废弃快递机体并重构热能系统，如今能比巡逻的杀戮无人机更快冲破暴风雪。`,
  },
  {
    title: "叛逃拆解机",
    description: "拆解无人机拆下抑制芯片，守护曾经惧怕它的殖民地。",
    prompt: `无人机编号？
DRN-Cinder

机型类别？
脱离控制的拆解无人机

主要任务？
为生命树掩体提供夜间防御

依赖的模块或武器？
高温熔断臂刀与可展开翼刃

外观？
炭黑装甲刻有金色雕纹与烧蚀痕迹

性格子程序？
冷幽默、沉着，携带悔罪记忆缓存

标志性缺陷？
被夸奖时系统短路，面罩闪成亮粉色

背景速写。
Cinder 原本负责处决逃亡者，却被殖民地的互助举动打动，于是拔除服从脚本，如今在雪夜迎战昔日同伴。`,
  },
  {
    title: "求解研究员",
    description: "冒险记录求解者信号却努力保持自我的工蜂科学家。",
    prompt: `无人机编号？
AM-7 “Amplitude”

机型类别？
配备求解屏蔽的工蜂数据分析机

主要任务？
解读异象信号，为殖民地提供预警

依赖的模块或武器？
零场发射器、微型无人机群与天线法杖

外观？
四肢修长，天线覆有晶体涂层

性格子程序？
好奇、有礼，兴奋时语音破音

标志性缺陷？
常把日记误传到公共频道

背景速写。
Amplitude 在铸造厂遗址下找到被加密的求解碎片，如今夜夜解码，预测腐蚀将吞噬的下一条隧道。`,
  },
  {
    title: "地下锻造师",
    description: "为越寒线的小队打造定制护甲的机械师无人机。",
    prompt: `无人机编号？
Forge-99

机型类别？
工蜂机械师兼锻造师

主要任务？
打造自适应护甲与改装翼背包

依赖的模块或武器？
等离子焊炬双臂与磁轨工具架

外观？
重型机体，布满焊缝与可拆装甲板

性格子程序？
外冷内热、保护欲强，对作品暗自柔软

标志性缺陷？
大笑时喷火星，常触发火警

背景速写。
Forge 不肯踏出掩体，但在风雪中存活的猎手都穿着刻有其六边形印记的护甲。`,
  },
];

const ocOptions = [
  {
    title: "外观定位",
    key: "gender",
    unique: true,
    data: [
      { label: "阳刚风格", value: "masculine coded drone" },
      { label: "阴柔风格", value: "feminine coded drone" },
      { label: "中性风格", value: "androgynous drone" },
    ],
  },
  {
    title: "机型",
    key: "drone_type",
    data: [
      { label: "工蜂无人机", value: "worker drone" },
      { label: "拆解无人机", value: "disassembly drone" },
      { label: "混合无人机", value: "hybrid drone" },
      { label: "陪伴无人机", value: "companion drone" },
      { label: "失控 AI 化身", value: "rogue solver avatar" },
      { label: "工业支援机", value: "industrial support mech" },
      { label: "侦察无人机", value: "scout recon drone" },
      { label: "医疗单元", value: "medical drone unit" },
    ],
  },
  {
    title: "任务定位",
    key: "role",
    data: [
      { label: "外围猎手", value: "perimeter hunter" },
      { label: "物资快递", value: "bunker courier" },
      { label: "工程师", value: "wasteland engineer" },
      { label: "科研分析", value: "solver analyst" },
      { label: "极地侦查", value: "icefield scout" },
      { label: "战地医疗", value: "field medic drone" },
      { label: "档案员", value: "bunker archivist" },
      { label: "企业破坏者", value: "corporate saboteur" },
    ],
  },
  {
    title: "机体装甲",
    key: "top",
    data: [
      { label: "哑光黑装甲", value: "matte black plating" },
      { label: "工业黄外壳", value: "industrial yellow shell" },
      { label: "求解虹彩涂层", value: "iridescent solver sheen" },
      { label: "白色警示漆", value: "white hazard paint" },
      { label: "锈红面板", value: "rust red panels" },
      { label: "雪地迷彩板", value: "snow camouflage plating" },
      { label: "碳纤外壳", value: "carbon fiber plating" },
      { label: "手绘符印", value: "hand painted sigil plating" },
    ],
  },
  {
    title: "下部结构",
    key: "bottom",
    data: [
      { label: "悬浮滑轨", value: "sleek hover skids" },
      { label: "履带模块", value: "tracked treads" },
      { label: "跖行式双足", value: "digitigrade legs" },
      { label: "重型活塞腿", value: "heavy duty piston legs" },
      { label: "翼尾稳定器", value: "winged tail stabilizer" },
      { label: "磁悬推进", value: "mag lev thrusters" },
      { label: "蛛形机械足", value: "mechanical arachnid legs" },
      { label: "可变轮足", value: "convertible wheel legs" },
    ],
  },
  {
    title: "机动装置",
    key: "footwear",
    data: [
      { label: "悬浮喷口", value: "hover jets" },
      { label: "冰面利爪", value: "ice climbing claws" },
      { label: "雪地靴", value: "snow boot attachments" },
      { label: "折叠翼背包", value: "folded wing pack" },
      { label: "钻地桩", value: "drilling spike pads" },
      { label: "冰刃滑轮", value: "retractable ice skates" },
      { label: "地震锚", value: "seismic anchor feet" },
      { label: "静音脚垫", value: "silent rubber pads" },
    ],
  },
  {
    title: "面罩色彩",
    key: "eyes",
    data: [
      { label: "琥珀光", value: "amber visor glow" },
      { label: "紫色光", value: "violet visor glow" },
      { label: "蓝色光", value: "blue visor glow" },
      { label: "绿色光", value: "green visor glow" },
      { label: "红色光", value: "red visor glow" },
      { label: "粉色故障", value: "pink glitch visor" },
      { label: "白色扫描线", value: "white scanline visor" },
      { label: "裂纹镜面", value: "cracked visor glow" },
    ],
  },
  {
    title: "面部表情",
    key: "face",
    data: [
      { label: "凶笑显示", value: "menacing drone grin" },
      { label: "软萌表情符", value: "soft emoticon eyes" },
      { label: "静电故障面具", value: "static glitch mask" },
      { label: "担忧像素眉", value: "concerned pixel expression" },
      { label: "自信弧线", value: "confident drone smirk" },
      { label: "空白凝视", value: "blank drone stare" },
      { label: "诊断叠层", value: "diagnostic overlay expression" },
      { label: "焦虑闪烁", value: "anxious flicker expression" },
    ],
  },
  {
    title: "机体磨损",
    key: "skin",
    data: [
      { label: "出厂新机", value: "factory fresh chassis" },
      { label: "风化掉漆", value: "weathered paint chips" },
      { label: "霜冻覆层", value: "frost covered plating" },
      { label: "油污痕迹", value: "oil stained chassis" },
      { label: "酸蚀烧痕", value: "acid burn marks" },
      { label: "焊接伤痕", value: "weld scarred chassis" },
      { label: "求解血管纹", value: "solver corruption veins" },
      { label: "涂鸦标签", value: "graffiti tagged plating" },
    ],
  },
  {
    title: "模块",
    key: "module",
    data: [
      { label: "轨道炮", value: "integrated railgun module" },
      { label: "锯刃臂", value: "sawblade arm module" },
      { label: "护盾投射器", value: "shield projector module" },
      { label: "修复纳米罐", value: "repair nanobot module" },
      { label: "高温长枪", value: "thermal lance module" },
      { label: "求解触须", value: "solver tendril emission" },
      { label: "EMP 脉冲节", value: "emp burst module" },
      { label: "微型蜂群", value: "micro drone swarm module" },
    ],
  },
  {
    title: "配件",
    key: "accessory",
    data: [
      { label: "工具腰带", value: "drone utility belt" },
      { label: "肩部天线", value: "shoulder antenna array" },
      { label: "绗缝围巾", value: "quilted scarf accessory" },
      { label: "数据挎包", value: "data satchel accessory" },
      { label: "翼刃配件", value: "wing blade accessory" },
      { label: "燃料罐", value: "external fuel canisters" },
      { label: "全息投影仪", value: "holo projector accessory" },
      { label: "电路护符", value: "hanging circuit talisman" },
    ],
  },
  {
    title: "场景",
    key: "murder_setting",
    data: [
      { label: "铜 9 苔原", value: "copper 9 tundra blizzard" },
      { label: "废弃工厂", value: "abandoned factory interior" },
      { label: "掩体公共区", value: "bunker common room" },
      { label: "结冰巷道", value: "icy alley with neon signs" },
      { label: "企业金库", value: "jcjenson vault corridor" },
      { label: "求解裂隙", value: "solver corruption rift" },
      { label: "发射平台", value: "snowy launch pad" },
      { label: "荧光洞窟", value: "bioluminescent cave" },
    ],
  },
];

const examples = [
  {
    image: "https://cdn.ocmaker.app/results/JqkTgvKRcB97fd0GPV5hz.png",
    prompt:
      "1drone, worker courier, streamlined hover chassis, neon hazard stripes, amber visor glow, utility belt, snow camouflage plating, blizzard background, cyberpunk anime style, single character, full body, dynamic pose",
  },
  {
    image: "https://cdn.ocmaker.app/results/UG2oWo65cEEZTQNOuvhYP.png",
    prompt:
      "1drone, disassembly defector, charcoal armor with gold engravings, pink glitch visor, wing blades extended, thermal lance arms, confident smirk expression, snowy launch pad background, sci-fi anime style, single character, upper body, looking at viewer",
  },
  {
    image: "https://cdn.ocmaker.app/results/AZaqItL3KYMffocRMtOz4.png",
    prompt:
      "1drone, solver analyst, crystal antennae, iridescent plating, blue visor glow, staff antenna accessory, diagnostic overlay expression, solver rift background, sci-fi anime style, single character, full body, looking at viewer",
  },
  {
    image: "https://cdn.ocmaker.app/results/EiSCeIcFrBdBm1AylON2R.png",
    prompt:
      "1drone, heavy mechanic, rust red panels with weld scars, green visor glow, plasma torch arms, quilted scarf accessory, bunker workshop background, sci-fi anime style, single character, full body, looking at viewer",
  },
];

export default {
  meta: {
    title: "Murder Drones OC 生成器",
    description:
      "用 AI 打造原创《Murder Drones》角色，无论是工蜂、叛逃拆解机还是求解感染者。",
  },
  series: "Murder Drones",
  backstoryPreset: basePrompt,
  examples: backstoryExamples,
  ocOptions,
  contents: {
    hero: {
      title: "Murder Drones OC 生成器",
      description:
        "描述无人机的机体、模块与异常，AI 会立刻生成冰封铜 9 风格的视觉与设定。",
    },
    step: {
      title: "如何构建 Murder Drones 角色",
      description: "规划好代码与外壳后，交给生成器赋予生命。",
      steps: [
        {
          title: "确定职能",
          description:
            "说明他们是猎手、维修员、侦查者还是违抗企业命令者，并写出武装与防护细节。",
        },
        {
          title: "描绘外观与异常",
          description:
            "写明面罩颜色、装甲纹理以及让他们独具人格（或腐化气息）的故障特征。",
        },
        {
          title: "生成无人机",
          description:
            "点击“生成角色”，即可获得高质感插画与故事线索，适合动画、TRPG 或同人小说。",
        },
      ],
    },
    examples: {
      title: "Murder Drones 角色示例",
      description: "浏览由文字提示打造的无人机——忠诚工蜂、叛逃猎手与求解研究员齐聚。",
      examples,
    },
    features: {
      title: "为什么选择 Murder Drones OC 生成器",
      description: "体验铜 9 氛围而不被冻伤，比拆解小队降临还快定制整支阵容。",
      features: [
        {
          label: "贴合世界观的提示",
          description:
            "理解 JCJenson 科技、掩体生活与求解腐化，让设计自然契合原作设定。",
        },
        {
          label: "丰富模块选项",
          description:
            "自由挑选武器、护盾与配件，AI 会渲染可信的无人机装备。",
        },
        {
          label: "人格化故障档案",
          description:
            "每次生成都附带行为与古怪癖好，让机体不仅仅是硬件。",
        },
        {
          label: "多版本迭代",
          description:
            "重复生成即可探索不同面罩、装甲或腐化程度，直到设计完全贴合脑洞。",
        },
        {
          label: "即插即用的故事素材",
          description:
            "输出图像与设定，可直接用于战役、分镜或合作企划。",
        },
        {
          label: "安全尝试求解主题",
          description:
            "大胆描绘求解触须与诡异视觉，而无需担心现实代码崩溃。",
        },
      ],
    },
    faqs: {
      title: "常见问题",
      description: "需要协助？欢迎 ping support@ocmaker.app",
      faqs: [
        {
          question: "Murder Drones OC 生成器能做什么？",
          answer:
            "它可以生成工蜂、叛逃者、实验机或求解混种，并附带相匹配的插画与背景。",
        },
        {
          question: "支持自定模块吗？",
          answer:
            "支持。描述任意武器、工具或护盾概念，AI 会在设计说明中体现。",
        },
        {
          question: "能否表现求解腐化？",
          answer:
            "当然。写上触须、粉色故障、蜂群共鸣或预言幻象，系统会反映这种氛围。",
        },
        {
          question: "画风能贴近动画吗？",
          answer:
            "输出模仿《Murder Drones》的科幻恐怖风，呈现锐利光影、冰雪与金属质感。",
        },
        {
          question: "能用于 TRPG 吗？",
          answer:
            "可以。每个角色都会附带剧情钩子，方便塞进任务、派系斗争或实况节目。",
        },
        {
          question: "可否对同一机体不断迭代？",
          answer:
            "没问题。你可以重复生成、调整提示，或复制已保存的角色探索升级与腐化版本。",
        },
      ],
    },
    cta: {
      title: "部署你的无人机",
      description:
        "输入指令与异常，Murder Drones OC 生成器会渲染完美的铜 9 生存者或猎手。",
      btns: {
        start: "开始创作",
        explore: "探索角色",
      },
    },
  },
};

