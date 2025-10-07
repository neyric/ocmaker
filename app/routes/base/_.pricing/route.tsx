import { useMutation } from "@tanstack/react-query";
import { Fragment, useState } from "react";
import { createOrder } from "~/api/order";
import {
  HeroSection,
  PricingFAQsSection,
  PricingSection,
} from "~/components/pages/pricing";
import { useUserProfile } from "~/contexts/user-profile";
import { useDialogStore } from "~/store/dialog";
import { createCanonical, createNormalAlternatives } from "~/utils/meta";
import type { Route } from "./+types/route";
import { type PricingType, products } from "./config";
import { faqs } from "./content";

export function meta({ matches }: Route.MetaArgs) {
  const canonical = createCanonical("/pricing", matches[0].loaderData.DOMAIN);
  const alternative = createNormalAlternatives(
    "/pricing",
    matches[0].loaderData.DOMAIN
  );

  return [
    { title: "Pricing - Choose Your Plan for GhostFace AI" },
    {
      name: "description",
      content:
        "Select from the best plans, ensuring a perfect fit. Need more or less? Customize your subscription for the perfect match!",
    },
    canonical,
    ...alternative,
  ];
}

export async function loader(_: Route.LoaderArgs) {
  return { products };
}

export default function Pricing({ loaderData }: Route.ComponentProps) {
  const { products } = loaderData;
  const { user } = useUserProfile();
  const setVisibleLoginDialog = useDialogStore(
    (state) => state.setVisibleLoginDialog
  );

  const [loadingProductId, setLoadingProductId] = useState<string>();
  const [pricingType, setPricingType] = useState<PricingType>("subscription");
  const productList = products[pricingType];

  const { mutateAsync } = useMutation({
    mutationFn: createOrder,
    onSuccess(data) {
      if (!window) return;
      location.href = data.checkout_url;
    },
  });

  const handleBuy = (id: string, pricingId: string) => {
    if (!user) {
      setVisibleLoginDialog(true);
      return;
    }
    if (loadingProductId) return;

    setLoadingProductId(id);
    mutateAsync(pricingId).finally(() => setLoadingProductId(""));
  };

  const segmentedOptions = [
    { value: "subscription", label: "Subscription" },
    { value: "credits", label: "Credit Pack" },
  ];

  return (
    <Fragment>
      <HeroSection
        title="Flexible Plans That Grow With You"
        description="Start for free, no credit card required. Upgrade when you need a plan that fits your needs."
        productType={pricingType}
        onProductTypeChange={(value) =>
          setPricingType(value as typeof pricingType)
        }
        segmentedOptions={segmentedOptions}
      />

      <PricingSection
        pricingType={pricingType}
        pricings={productList}
        loadingPricingId={loadingProductId}
        onBuy={handleBuy}
      />

      <PricingFAQsSection
        title="Frequently Asked Questions"
        description="Have another question? Contact us at"
        supportEmail="support@ghostfaceai.app"
        faqs={faqs}
      />
    </Fragment>
  );
}
