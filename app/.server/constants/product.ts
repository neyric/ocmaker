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
  credits: 12000,
};

const PLUS_PLAN_MONTHLY: SubscriptionProduct = {
  type: "subscription",
  product_id: "prod_60PrqkiaGh0yJwFyn90b72",
  product_name: "Plus",
  plan: "plus",
  interval: "monthly",
  price: 12.9,
  credits: 36000,
};

const PREMIUM_PLAN_MONTHLY: SubscriptionProduct = {
  type: "subscription",
  product_id: "prod_5SvJRd6dSNlW3kAGjlR2LP",
  product_name: "Premium",
  plan: "premium",
  interval: "monthly",
  price: 19.9,
  credits: 120000,
};

// Annual Subscription Plans
const STARTER_PLAN_ANNUAL: SubscriptionProduct = {
  type: "subscription",
  product_id: "prod_5Xon38mqo83U5MvvIeApjX",
  product_name: "Starter",
  plan: "starter",
  interval: "yearly",
  price: 4.9,
  credits: 120,
};

const PLUS_PLAN_ANNUAL: SubscriptionProduct = {
  type: "subscription",
  product_id: "prod_60PrqkiaGh0yJwFyn90b72",
  product_name: "Plus",
  plan: "plus",
  interval: "yearly",
  price: 9.9,
  credits: 240,
};

const PREMIUM_PLAN_ANNUAL: SubscriptionProduct = {
  type: "subscription",
  product_id: "prod_5SvJRd6dSNlW3kAGjlR2LP",
  product_name: "Premium",
  plan: "premium",
  interval: "yearly",
  price: 14.9,
  credits: 500,
};

// Credits Products
const SMALL_CREDITS_BUNDLE: CreditsProduct = {
  type: "credits",
  product_id: "prod_3m9MiZkXUkdW6dTjLC0MOa",
  product_name: "Small Credits Pack",
  price: 19.9,
  credits: 21000,
  bonus: {
    starter: 2000,
    plus: 4000,
    premium: 8000,
  },
};

const LARGE_CREDITS_BUNDLE: CreditsProduct = {
  type: "credits",
  product_id: "prod_41zqnavi1VHBKXYpDljbFS",
  product_name: "Large Credits Bundle",
  price: 39.9,
  credits: 42000,
  bonus: {
    starter: 4000,
    plus: 8000,
    premium: 16000,
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

export const PRODUCT_ITEMS = {
  STARTER_PLAN_MONTHLY,
  PLUS_PLAN_MONTHLY,
  PREMIUM_PLAN_MONTHLY,
  STARTER_PLAN_ANNUAL,
  PLUS_PLAN_ANNUAL,
  PREMIUM_PLAN_ANNUAL,
  SMALL_CREDITS_BUNDLE,
  LARGE_CREDITS_BUNDLE,
};
