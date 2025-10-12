import { useMutation } from "@tanstack/react-query";
import { Fragment, useState } from "react";
import type { PricingType } from "~/.server/constants/pricing";
import { getI18nConetxt } from "~/.server/middleware/i18n-middleware";
import { createOrder } from "~/api/order";
import {
  HeroSection,
  PricingFAQsSection,
  PricingSection,
} from "~/components/pages/pricing";
import { useUserProfile } from "~/contexts/user-profile";
import { getPageLocale, getTranslate, useTranslate } from "~/i18n";
import { useDialogStore } from "~/store/dialog";
import { createCanonical, createNormalAlternatives } from "~/utils/meta";
import { createSocialTags } from "~/utils/og";
import type { Route } from "./+types/route";

export function meta({ matches, params, loaderData }: Route.MetaArgs) {
  const url = "/pricing";
  const canonicalUrl = params.lang ? `/${params.lang}${url}` : url;

  const canonical = createCanonical(canonicalUrl, matches[0].loaderData.DOMAIN);
  const alternative = createNormalAlternatives(
    url,
    matches[0].loaderData.DOMAIN,
  );
  const og = createSocialTags(
    {
      title: loaderData.meta.title,
      description: loaderData.meta.description,
      url: url,
      siteName: matches[0].loaderData.SITE_NAME,
    },
    matches[0].loaderData.DOMAIN
  );


  return [
    { title: loaderData.meta.title },
    {
      name: "description",
      content: loaderData.meta.description,
    },
    canonical,
    ...alternative,
    ...og,
  ];
}

export async function loader({ context }: Route.LoaderArgs) {
  const i18n = getI18nConetxt(context);
  const page = await getPageLocale(i18n.lang, "pricing");
  const t = getTranslate(page);

  const meta = {
    title: t("meta.title"),
    description: t("meta.description"),
  };

  return { meta, page };
}

export default function Page({ matches, loaderData }: Route.ComponentProps) {
  const ct = useTranslate(loaderData.page);

  const products = matches[0].loaderData.pricing;
  const { user } = useUserProfile();
  const setVisibleLoginDialog = useDialogStore(
    (state) => state.setVisibleLoginDialog,
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

  const faqs = loaderData.page.contents.faqs.list;
  return (
    <Fragment>
      <HeroSection
        title={ct("contents.hero.title")}
        description={ct("contents.hero.description")}
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
        title={ct("contents.faqs.title")}
        description={ct("contents.faqs.description")}
        faqs={faqs}
      />
    </Fragment>
  );
}
