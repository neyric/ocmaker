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
  product_id: "prod_ogqbL1o3dGt2Z9LXRz4I8",
  product_name: "Starter",
  plan: "starter",
  interval: "monthly",
  price: 6.9,
  credits: 12000,
};

const PLUS_PLAN_MONTHLY: SubscriptionProduct = {
  type: "subscription",
  product_id: "prod_1vdXnldZGnmLbK2Ro6REek",
  product_name: "Plus",
  plan: "plus",
  interval: "monthly",
  price: 12.9,
  credits: 36000,
};

const PREMIUM_PLAN_MONTHLY: SubscriptionProduct = {
  type: "subscription",
  product_id: "prod_3eoNiTVIR0ZjSoCQ4X95DL",
  product_name: "Premium",
  plan: "premium",
  interval: "monthly",
  price: 24.9,
  credits: 120000,
};

// Annual Subscription Plans
const STARTER_PLAN_ANNUAL: SubscriptionProduct = {
  type: "subscription",
  product_id: "prod_7PIgwKagn9BoY0VpKNtNI2",
  product_name: "Starter",
  plan: "starter",
  interval: "yearly",
  price: 5.45,
  credits: 12000,
};

const PLUS_PLAN_ANNUAL: SubscriptionProduct = {
  type: "subscription",
  product_id: "prod_4e4ezBEplBLhvphQIR78Ro",
  product_name: "Plus",
  plan: "plus",
  interval: "yearly",
  price: 10.33,
  credits: 360000,
};

const PREMIUM_PLAN_ANNUAL: SubscriptionProduct = {
  type: "subscription",
  product_id: "prod_25UpXDEtj7n7WwlGWGBZ85",
  product_name: "Premium",
  plan: "premium",
  interval: "yearly",
  price: 19.9,
  credits: 120000,
};

// Credits Products
const SMALL_CREDITS_BUNDLE: CreditsProduct = {
  type: "credits",
  product_id: "prod_4fHZatbUbQ5fgdusPsQjBh",
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
  product_id: "prod_38PRTcwpHRdl4ElOnMUevk",
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
