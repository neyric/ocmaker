export default {
  meta: {
    title: "Dashboard - Manage Your Account",
    description:
      "Manage your account, subscription, and explore help resources in your personal dashboard.",
  },
  contents: {
    hero: {
      title: "Dashboard",
      description:
        "Manage your account, track usage, and explore all the features GhostFace AI has to offer",
    },
    userInfo: {
      title: "User Information",
      editProfile: "Edit Profile",
      email: "Email",
      memberSince: "Member Since",
      memberSinceDesc: "Member since {date}",
      usage: {
        remaining: "Credits Remaining",
        created: "Image Created",
      },
    },
    subscription: {
      title: "Subscription",
      upgtade: "Upgrade",
      cancel: "Cancel",
      refund: "Refund",
      current: "Current Plan",
      status: {},
      upgradeTitle: "Upgrade to Premium",
      upgradeDescription:
        "Get unlimited access to all features and create amazing videos without limitations.",
      viewPlans: "View Plans",
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Have another question? Contact us at support@ocmaker.app",
      list: [
        {
          question: "How can I upgrade my subscription plan?",
          answer:
            "You can upgrade your subscription plan by going to the Subscription section in your dashboard and clicking 'Upgrade Plan'. This will take you to our pricing page where you can select a higher tier.",
        },
        {
          question: "How do I check my current usage and credits?",
          answer:
            "Your current usage and remaining credits are displayed in the User Information section of your dashboard. This information is updated in real-time as you use GhostFace AI services.",
        },
        {
          question: "Can I cancel my subscription at any time?",
          answer:
            "Yes, you can cancel your subscription at any time in the Subscription section of your dashboard. Your subscription will remain active until the end of your current billing period.",
        },
        {
          question: "How do I change my account settings?",
          answer:
            "You can update your account information including email, password, and profile settings by clicking 'Edit Profile' in the User Information section of your dashboard.",
        },
        {
          question: "What happens if I run out of credits?",
          answer:
            "If you run out of credits, you can purchase additional credit packs or upgrade to a higher subscription plan. Your account will remain active, but you won't be able to generate new content until you add more credits.",
        },
        {
          question: "How can I get support for technical issues?",
          answer:
            "For technical support, you can use the Help & Support section in your dashboard to access our knowledge base, submit a support ticket, or contact us directly via email at support@ghostfaceai.app.",
        },
      ],
    },
  },
};
