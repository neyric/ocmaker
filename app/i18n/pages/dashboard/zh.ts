export default {
  meta: {
    title: "仪表盘 - 管理你的账户",
    description: "在个人仪表盘中管理账户、订阅并浏览帮助资源。",
  },
  contents: {
    hero: {
      title: "仪表盘",
      description: "管理你的账户、追踪使用情况，并探索 OC Maker 提供的全部功能。",
    },
    userInfo: {
      title: "用户信息",
      editProfile: "编辑资料",
      avatarAlt: "用户头像",
      defaultName: "用户",
      email: "邮箱",
      memberSince: "加入时间",
      memberSinceDesc: "自 {date} 起成为会员",
      usage: {
        title: "使用统计",
        remaining: "剩余点数",
        created: "已生成图像",
      },
    },
    subscription: {
      title: "订阅",
      cancel: "取消",
      refund: "退款",
      manage: "管理",
      upgrade: "升级",
      current: "当前套餐",
      defaultPlan: "免费",
      statusLabel: "状态",
      status: {
        none: "暂无有效订阅",
        cancelledActive: "已取消（有效期内仍可使用）",
        active: "已生效",
        cancelled: "已取消",
        expired: "已到期",
        unknown: "未知",
      },
      expiration: {
        activeUntil: "有效期至",
        expiresOn: "到期日",
      },
      benefitsTitle: "当前套餐权益",
      benefits: [
        "无限次视频生成",
        "优先处理队列",
        "高级自定义选项",
        "邮件支持",
      ],
      upgradeTitle: "升级至尊享版",
      upgradeDescription:
        "解锁全部功能，无限制地创作令人惊叹的视频内容。",
      viewPlans: "查看套餐",
    },
    general: {
      notAvailable: "暂无",
    },
    help: {
      title: "帮助与支持",
      description: "通过全面的资源与支持渠道，获取你所需的帮助。",
      contents: {
        emailSupport: {
          title: "邮件支持",
          description: "获得我们支持团队的直接协助",
          button: "联系支持",
        },
        helpCenter: {
          title: "帮助中心",
          description: "查阅常见问题的答案",
          button: "获取帮助",
        },
      },
    },
    faqs: {
      title: "常见问题",
      description: "还有其他问题？请发送邮件至 support@ocmaker.app",
      list: [
        {
          question: "如何升级我的订阅计划？",
          answer:
            "你可以在仪表盘的“订阅”部分点击“升级套餐”，系统会跳转至定价页面，让你选择更高等级的订阅计划。",
        },
        {
          question: "如何查看当前的使用情况和点数？",
          answer:
            "在仪表盘的“用户信息”区域会显示你的当前使用量和剩余点数，并会随着你使用 OC Maker 服务实时更新。",
        },
        {
          question: "我可以随时取消订阅吗？",
          answer:
            "可以。你可以在仪表盘的“订阅”部分随时取消订阅，取消后你的订阅会在当前计费周期结束前继续有效。",
        },
        {
          question: "如何修改我的账户设置？",
          answer:
            "点击“编辑资料”即可更新账户信息，包括邮箱、密码和个人资料等内容。",
        },
        {
          question: "如果点数用完了怎么办？",
          answer:
            "当点数用尽时，你可以购买额外的点数包或升级至更高的订阅计划。账户仍然保持有效，但需要补充点数后才能继续生成内容。",
        },
        {
          question: "出现技术问题时我要如何获得支持？",
          answer:
            "在仪表盘的“帮助与支持”部分，你可以访问知识库、提交支持工单，或直接发送邮件至 support@ocmaker.app 与我们联系。",
        },
      ],
    },
  },
};
