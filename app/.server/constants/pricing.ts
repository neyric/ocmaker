interface BasePricing {
  id: string;
  popular?: boolean;
  title: string;
  description: string;
  benefits: string[];
}

interface SubscriptionPricing extends BasePricing {
  type: "subscription";
  productId: string;
  annuallyProductId: string;
  price: number;
  annually: number;
  credits: number;
}
interface CreditsPricing extends BasePricing {
  type: "credits";
  productId: string;
  price: number;
  credits: number;
}

export type Pricing = SubscriptionPricing | CreditsPricing;

export type PricingType = Pricing["type"];
