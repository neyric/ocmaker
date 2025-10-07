import type { Pricing, PricingType } from "~/.server/constants/pricing";

const products: Record<PricingType, Pricing[]> = {
  subscription: [
    {
      id: "starter",
      productId: "prod_5Xon38mqo83U5MvvIeApjX",
      annuallyProductId: "prod_5Xon38mqo83U5MvvIeApjX",
      title: "Starter",
      description: "For fun and AI enthusiasts",
      price: 6.9,
      annually: 5.9,
      credits: 120,
      type: "subscription",
      benefits: [
        "120 Credits provided monthly",
        "Up to 120 Scream photo generations/month",
        "Generate photos without watermark",
        "Basic horror effects",
      ],
    },
    {
      id: "plus",
      productId: "prod_60PrqkiaGh0yJwFyn90b72",
      annuallyProductId: "prod_60PrqkiaGh0yJwFyn90b72",
      title: "Plus",
      popular: true,
      description: "For content creators",
      price: 12.9,
      annually: 9.9,
      credits: 240,
      type: "subscription",
      benefits: [
        "240 Credits provided monthly",
        "Up to 240 Scream photo generations/month",
        "Generate photos without watermark",
        "Advanced horror effects",
        "Early access to new features",
      ],
    },
    {
      id: "premium",
      productId: "prod_5SvJRd6dSNlW3kAGjlR2LP",
      annuallyProductId: "prod_5SvJRd6dSNlW3kAGjlR2LP",
      title: "Premium",
      description: "For power users",
      type: "subscription",
      price: 19.9,
      annually: 14.9,
      credits: 500,
      benefits: [
        "500 Credits provided monthly",
        "Up to 500 Scream photo generations/month",
        "Generate photos without watermark",
        "All premium horror effects",
        "Early access to new features",
        "Priority support",
      ],
    },
  ],
  credits: [
    {
      id: "small_credits",
      productId: "prod_3m9MiZkXUkdW6dTjLC0MOa",
      title: "Small Credit Pack",
      description: "One-time purchase",
      type: "credits",
      price: 7.9,
      credits: 100,
      benefits: [
        "Starter: +80 bonus credits",
        "Plus: +100 bonus credits",
        "Premium: +120 bonus credits",
      ],
    },
    {
      id: "large_credits",
      productId: "prod_41zqnavi1VHBKXYpDljbFS",
      title: "Large Credit Pack",
      description: "One-time purchase",
      type: "credits",
      price: 14.9,
      credits: 200,
      benefits: [
        "Starter: +160 bonus credits",
        "Plus: +200 bonus credits",
        "Premium: +240 bonus credits",
      ],
    },
  ],
};

export { products, type Pricing, type PricingType };
