type Plan = "starter" | "plus" | "premium";

interface SubscriptionProduct {
  type: "subscription";
  product_id: string;
  product_name: string;
  plan: Plan;
  interval: "yearly" | "monthly";
  price: number;
  credits: number;
}

interface CreditsProduct {
  type: "credits";
  product_id: string;
  product_name: string;
  price: number;
  credits: number;
  bonus: Record<Plan, number>;
}

export type Product = SubscriptionProduct | CreditsProduct;

// Monthly Subscription Plans
const STARTER_PLAN_MONTHLY: SubscriptionProduct = {
  type: "subscription",
  product_id: "prod_5Xon38mqo83U5MvvIeApjX",
  product_name: "Starter",
  plan: "starter",
  interval: "monthly",
  price: 6.9,
  credits: 120,
};

const PLUS_PLAN_MONTHLY: SubscriptionProduct = {
  type: "subscription",
  product_id: "prod_60PrqkiaGh0yJwFyn90b72",
  product_name: "Plus",
  plan: "plus",
  interval: "monthly",
  price: 12.9,
  credits: 240,
};

const PREMIUM_PLAN_MONTHLY: SubscriptionProduct = {
  type: "subscription",
  product_id: "prod_5SvJRd6dSNlW3kAGjlR2LP",
  product_name: "Premium",
  plan: "premium",
  interval: "monthly",
  price: 19.9,
  credits: 500,
};

// Annual Subscription Plans
const STARTER_PLAN_ANNUAL: SubscriptionProduct = {
  type: "subscription",
  product_id: "prod_5Xon38mqo83U5MvvIeApjX",
  product_name: "Starter",
  plan: "starter",
  interval: "monthly",
  price: 6.9,
  credits: 120,
};

const PLUS_PLAN_ANNUAL: SubscriptionProduct = {
  type: "subscription",
  product_id: "prod_60PrqkiaGh0yJwFyn90b72",
  product_name: "Plus",
  plan: "plus",
  interval: "monthly",
  price: 12.9,
  credits: 240,
};

const PREMIUM_PLAN_ANNUAL: SubscriptionProduct = {
  type: "subscription",
  product_id: "prod_5SvJRd6dSNlW3kAGjlR2LP",
  product_name: "Premium",
  plan: "premium",
  interval: "monthly",
  price: 19.9,
  credits: 500,
};

// Credits Products
const SMALL_CREDITS_BUNDLE: CreditsProduct = {
  type: "credits",
  product_id: "prod_3m9MiZkXUkdW6dTjLC0MOa",
  product_name: "Small Credits Pack",
  price: 7.9,
  credits: 100,
  bonus: {
    starter: 80,
    plus: 100,
    premium: 120,
  },
};

const LARGE_CREDITS_BUNDLE: CreditsProduct = {
  type: "credits",
  product_id: "prod_41zqnavi1VHBKXYpDljbFS",
  product_name: "Large Credits Bundle",
  price: 14.9,
  credits: 200,
  bonus: {
    starter: 160,
    plus: 200,
    premium: 240,
  },
};

// Export all products
export const PRODUCTS: Product[] = [
  // Monthly subscriptions
  STARTER_PLAN_MONTHLY,
  PLUS_PLAN_MONTHLY,
  PREMIUM_PLAN_MONTHLY,

  // Annual subscriptions
  STARTER_PLAN_ANNUAL,
  PLUS_PLAN_ANNUAL,
  PREMIUM_PLAN_ANNUAL,

  // Credits bundles
  SMALL_CREDITS_BUNDLE,
  LARGE_CREDITS_BUNDLE,
];
