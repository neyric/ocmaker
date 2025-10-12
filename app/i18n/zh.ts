export default {
  common: {
    dashboard: "仪表盘",
    login: "登录",
    cancel: "取消",
    confirm: "确认",
    loading: "加载中...",
    error: "错误",
    success: "成功",
    close: "关闭",
    save: "保存",
    delete: "删除",
    edit: "编辑",
    view: "查看",
    download: "下载",
    upload: "上传",
    search: "搜索",
    filter: "筛选",
    sort: "排序",
    back: "返回",
    next: "下一步",
    previous: "上一步",
    yes: "是",
    no: "否",
    ok: "好的",
    credits: "点数",
    free: "免费",
  },
  maker: {
    generator: {
      backstory: "背景故事生成器",
      oc: "OC 角色生成器",
      describe: "描述你的 OC",
      placeholder: "请输入简要描述...",
      exampleTitle: "快速示例",
      exampleDescription: "点击加载示例提示词并在生成前进行调整。",
      exampleClear: "清空内容",
      exampleButton: "使用此示例",
      exampleGenerator: "生成背景故事",
      exampleGenerating: "生成中...",
      ocTitle: "角色外观",
      ocPlaceholder: "描述你的 OC 细节 (例如: \"猫系少女，蓝色头发，戴眼镜，害羞\")",
      ocRandomize: "随机生成",
      ocAiOptimize: "AI 优化",
      ocPreviewTitle: "你的角色将显示在这里",
      ocPreviewDescription:
        '描述你的角色外观并点击 "生成角色" 来创建你的原创角色。',
      ocGenerator: "生成角色",
      ocGenerating: "生成中...",
    },
  },
  pricing: {
    common: {
      month: "月",
      month1st: "首月",
      monthPer: "每月",
      oneTime: "一次性",
      mostPopular: "最受欢迎",
      couponFirstMonth: "首月享 {rate}% 折扣",
      billedAnnually: "按年计费",
      save: "节省 {rate}%",
      upgrade: "升级",
      buyNow: "立即购买",
      subscription: "订阅",
      creditPack: "点数包",
    },

    starter: {
      title: "入门版",
      description: "适合娱乐和 AI 爱好者",
      details: [
        "每月赠送 12,000 点数",
        "最多生成 400 张图像",
        "无限次角色保存",
        "下载无水印图像",
        "私有图像生成器和私有 OC",
      ],
    },
    plus: {
      title: "进阶版",
      description: "适合娱乐和 AI 爱好者",
      details: [
        "每月赠送 36,000 点数",
        "最多生成 1,200 张图像",
        "无限次角色保存",
        "下载无水印图像",
        "私有图像生成器和私有 OC",
        "抢先体验新功能",
      ],
    },
    premium: {
      title: "尊享版",
      description: "适合娱乐和 AI 爱好者",
      details: [
        "每月赠送 120,000 点数",
        "最多生成 4,000 张图像",
        "无限次角色保存",
        "下载无水印图像",
        "私有图像生成器和私有 OC",
        "抢先体验新功能",
      ],
    },
    smallCredit: {
      title: "小额点数包",
      description: "一次性购买",
      details: [
        "入门版: 额外 +2,000 点数",
        "进阶版: 额外 +8,000 点数",
        "尊享版: 额外 +20,000 点数",
      ],
    },
    largeCredit: {
      title: "大额点数包",
      description: "一次性购买",
      details: [
        "入门版: 额外 +4,000 点数",
        "进阶版: 额外 +16,000 点数",
        "尊享版: 额外 +40,000 点数",
      ],
    },
  },
  profile: {
    edit: {
      title: "编辑资料",
      description: "更新你的个人信息",
      avatarDesc: "点击上传新的头像",
      nickname: "昵称",
      nicknameDesc: "你的展示名称 (2-50 个字符)",
      nicknamePlaceholder: "输入你的展示名称",
      username: "用户名",
      usernamePlaceholder: "输入你的唯一用户名",
      bio: "简介",
      bioPlaceholder: "简单介绍一下自己...",
      confirm: "保存更改",
      cancel: "取消",
    },
  },

  header: {
    navigation: {
      home: "首页",
      maker: "创建角色",
      pricing: "定价",
      myCreations: "我的作品",
      dashboard: "仪表盘",
      login: "登录",
    },
    theme: {
      light: "浅色",
      dark: "深色",
    },
  },

  footer: {
    brandDescription:
      "为你提供新颖的发型灵感和 AI 发型试戴，找到最适合你的风格！",
    copyright: "© {year} OC Maker 保留所有权利。",
    popular: {
      title: "热门 OC 生成器",
    },
    more: {
      title: "更多 OC 生成器",
    },
    legal: {
      title: "法律信息",
      terms: "服务条款",
      privacy: "隐私政策",
      refund: "退款政策",
      cookie: "Cookie 政策",
    },
  },

  dialogs: {
    login: {
      title: "注册",
      titleBeforeCreate: "注册以继续",
      description: "在 OC Maker 上以 {credits} 点数起步",
      googleButton: "使用 Google 继续",
      termsText: "注册即表示你同意",
      termsLink: "服务条款",
      saveNote: "你的生成结果将被保存",
    },
    checkin: {
      title: "每日签到",
      streak: {
        title: "连续签到 7 天即可获得 {bonus} 点额外点数",
        description:
          "你已签到 {days} 天，每日可获 {minCredits}-{maxCredits} 点奖励",
      },
      button: {
        checkin: "签到",
        checking: "签到中",
        done: "已签到",
      },
      status: {
        loading: "加载中...",
        day: "第 {day} 天",
      },
    },
    invite: {
      title: "邀请好友",
      description:
        "使用你的邀请链接邀请好友，你们双方都将获得 {credits} 点数！",
      copyButton: "复制链接",
      copiedButton: "已复制",
      history: {
        title: "邀请记录",
        empty: "你还没有邀请任何好友！",
        reward: "+{credits}",
      },
    },
    upgrade: {
      title: "升级",
      description: "升级以获得更多点数",
      billing: {
        monthly: "每月",
        annually: "按年计费",
        oneTime: "一次性付款",
        save: "节省 20%",
      },
      button: {
        upgrade: "升级",
      },
      popular: "最受欢迎",
    },
    taskbox: {
      title: "GhostFace AI",
      description: "跟踪你正在生成的作品",
      empty: "暂无进行中的任务",
      status: {
        creating: "正在生成你的照片",
        error: "未找到结果链接",
        failed: "未知错误",
      },
    },
  },

  creditsMenu: {
    title: "点数菜单",
    planTypes: {
      free: "免费",
      starter: "入门版",
      pro: "专业版",
      premium: "尊享版",
    },
    expired: "到期日: {date}",
    balance: {
      title: "点数",
      label: "点数余额",
    },
    buttons: {
      addMore: "购买点数",
      invite: "邀请",
      checkin: "签到",
      checkedIn: "已签到",
    },
  },

  generator: {
    fotoProfissional: {
      form: {
        title: "选择风格",
        description: "选择你想要的效果并继续",
        button: {
          cancel: "取消",
          confirm: "确认选择",
        },
      },
    },
  },
};
