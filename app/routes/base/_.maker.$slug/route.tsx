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
  const canonical = createCanonical(
    `/maker/${params.slug}`,
    matches[0].loaderData.DOMAIN
  );
  const alternatives = createNormalAlternatives(
    `/maker/${params.slug}`,
    matches[0].loaderData.DOMAIN
  );
  const og = createSocialTags(
    {
      title: loaderData.meta.title,
      description: loaderData.meta.description,
      url: `/maker/${params.slug}`,
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
    ...alternatives,
    ...og,
  ];
}

export async function loader({ context }: Route.LoaderArgs) {
  const i18n = getI18nConetxt(context);
  const page = await getMakerLocale(i18n.lang, "aot-oc-maker");
  const t = getTranslate(page);

  const meta = {
    title: t("meta.title"),
    description: t("meta.description"),
  };

  const genId = "";
  const examples: Array<{
    title: string;
    description: string;
    prompt: string;
  }> = [
    { title: "Test 1", description: "Test 1 Prompt", prompt: "Test 1 Prompt" },
    { title: "Test 2", description: "Test 2 Prompt", prompt: "Test 2 Prompt" },
    { title: "Test 3", description: "Test 3 Prompt", prompt: "Test 3 Prompt" },
    { title: "Test 4", description: "Test 4 Prompt", prompt: "Test 4 Prompt" },
    { title: "Test 5", description: "Test 5 Prompt", prompt: "Test 5 Prompt" },
  ];

  const options: Array<{
    title: string;
    key: string;
    data: Array<{ label: string; value: string }>;
  }> = [
    {
      title: "Gender",
      key: "gender",
      data: [
        { label: "Boy", value: "1boy" },
        { label: "Girl", value: "1girl" },
        { label: "Other", value: "" },
      ],
    },
  ];

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
      href: "/",
      variant: "default" as const,
      className:
        "rounded-full h-12 px-8 hover:bg-base-100 text-base hover:border-base-100",
    },
    {
      text: ct("contents.cta.btns.explore"),
      href: "/",
      variant: "outline" as const,
      className:
        "rounded-full h-12 px-8 hover:bg-base-100 text-base hover:border-base-100",
    },
  ];

  return (
    <Fragment>
      <HeroSection
        key={loaderData.genId}
        title={ct("contents.hero.title")}
        description={ct("contents.hero.description")}
      >
        <div className="flex items-center justify-center mb-8">
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
        />
      </HeroSection>

      <Steps
        title={ct("contents.step.title")}
        description={ct("contents.step.description")}
        steps={steps}
      />

      <Examples
        title={ct("contents.examples.title")}
        description={ct("contents.examples.description")}
        examples={examples}
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
