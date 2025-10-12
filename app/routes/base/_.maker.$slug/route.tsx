import {
  Bird,
  Bot,
  Contact,
  PencilRuler,
  Smile,
  SwatchBook,
} from "lucide-react";
import { Fragment, useState } from "react";
import { getI18nConetxt } from "~/.server/middleware/i18n-middleware";
import { SegmentedControl } from "~/components/common";
import {
  Examples,
  FAQsSection,
  FooterCTASection,
  HeroSection,
  Steps,
  WhyImgVidSection,
} from "~/components/pages/maker";
import { AvatarGenerator } from "~/features/generator/avatar-generator";
import { ProfileGenerator } from "~/features/generator/profile-generator";
import { getMakerLocale, getTranslate, useTranslate } from "~/i18n";
import { createCanonical, createNormalAlternatives } from "~/utils/meta";
import { createSocialTags } from "~/utils/og";
import type { Route } from "./+types/route";

export function meta({ matches, params, loaderData }: Route.MetaArgs) {
  const url = `/maker/${params.slug}`;
  const canonicalUrl = params.lang ? `/${params.lang}${url}` : url;

  const canonical = createCanonical(canonicalUrl, matches[0].loaderData.DOMAIN);
  const alternatives = createNormalAlternatives(
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
    matches[0].loaderData.DOMAIN,
  );

  return [
    { title: loaderData.meta.title },
    {
      name: "description",
      content: loaderData.meta.description,
    },
    canonical,
    ...alternatives,
    ...og,
  ];
}

export async function loader({ context, params }: Route.LoaderArgs) {
  const i18n = getI18nConetxt(context);
  const page = await getMakerLocale(i18n.lang, params.slug);

  if (!page) {
    throw new Response(null, { status: 404 });
  }

  const t = getTranslate(page);

  const meta = {
    title: t("meta.title"),
    description: t("meta.description"),
  };

  const genId = params.slug;
  const examples: Array<{
    title: string;
    description: string;
    prompt: string;
  }> = page.examples;

  const options: Array<{
    title: string;
    key: string;
    data: Array<{ label: string; value: string }>;
  }> = page.ocOptions;

  return { meta, page, genId, examples, options };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const t = useTranslate();
  const ct = useTranslate(loaderData.page);
  const [state, setState] = useState("backstory");

  const steps = [
    {
      image: "/assets/img-how-1.webp",
      title: ct("contents.step.steps.0.title"),
      description: ct("contents.step.steps.0.description"),
    },
    {
      image: "/assets/img-how-2.webp",
      title: ct("contents.step.steps.1.title"),
      description: ct("contents.step.steps.1.description"),
    },
    {
      image: "/assets/img-how-3.webp",
      title: ct("contents.step.steps.2.title"),
      description: ct("contents.step.steps.2.description"),
    },
  ];

  const features = [
    {
      icon: <Bot />,
      title: ct("contents.features.features.0.label"),
      content: ct("contents.features.features.0.description"),
    },
    {
      icon: <PencilRuler />,
      title: ct("contents.features.features.1.label"),
      content: ct("contents.features.features.1.description"),
    },
    {
      icon: <Smile />,
      title: ct("contents.features.features.2.label"),
      content: ct("contents.features.features.2.description"),
    },
    {
      icon: <Contact />,
      title: ct("contents.features.features.3.label"),
      content: ct("contents.features.features.3.description"),
    },
    {
      icon: <SwatchBook />,
      title: ct("contents.features.features.4.label"),
      content: ct("contents.features.features.4.description"),
    },
    {
      icon: <Bird />,
      title: ct("contents.features.features.5.label"),
      content: ct("contents.features.features.5.description"),
    },
  ];

  const examples = loaderData.page.contents.examples.examples;

  const faqs = loaderData.page.contents.faqs.faqs;

  const ctaButtons = [
    {
      text: ct("contents.cta.btns.start"),
      href: "#generator-border",
      variant: "default" as const,
      className:
        "rounded-full h-12 px-8 hover:bg-base-100 text-base hover:border-base-100",
    },
    // {
    //   text: ct("contents.cta.btns.explore"),
    //   href: "/oc-arts",
    //   variant: "outline" as const,
    //   className:
    //     "rounded-full h-12 px-8 hover:bg-base-100 text-base hover:border-base-100",
    // },
  ];

  return (
    <Fragment>
      <HeroSection
        key={loaderData.genId + "hero"}
        title={ct("contents.hero.title")}
        description={ct("contents.hero.description")}
      >
        <div className="flex items-center justify-center mb-8 relative">
          <div id="generator-border" className="absolute -top-20" />
          <SegmentedControl
            value={state}
            onChange={setState}
            options={[
              { label: t("maker.generator.backstory"), value: "backstory" },
              { label: t("maker.generator.oc"), value: "oc" },
            ]}
          />
        </div>
        <ProfileGenerator
          className="aria-hidden:hidden"
          aria-hidden={state !== "backstory"}
          genId={loaderData.genId}
          examples={loaderData.examples}
        />
        <AvatarGenerator
          className="aria-hidden:hidden"
          aria-hidden={state !== "oc"}
          genId={loaderData.genId}
          options={loaderData.options}
          previewBg={examples[0].image}
        />
      </HeroSection>

      <Examples
        key={loaderData.genId + "examples"}
        title={ct("contents.examples.title")}
        description={ct("contents.examples.description")}
        examples={examples}
      />

      <Steps
        title={ct("contents.step.title")}
        description={ct("contents.step.description")}
        steps={steps}
      />

      <WhyImgVidSection
        title={ct("contents.features.title")}
        description={ct("contents.features.description")}
        features={features}
      />

      <FAQsSection
        title={ct("contents.faqs.title")}
        description={ct("contents.faqs.description")}
        faqs={faqs}
      />
      <FooterCTASection
        title={ct("contents.cta.title")}
        description={ct("contents.cta.description")}
        buttons={ctaButtons}
      />
    </Fragment>
  );
}
