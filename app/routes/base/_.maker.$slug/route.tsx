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
import { getPageLocale, getTranslate, useTranslate } from "~/i18n";
import { createCanonical, createNormalAlternatives } from "~/utils/meta";
import { createSocialTags } from "~/utils/og";
import type { Route } from "./+types/route";

export function meta({ matches, loaderData }: Route.MetaArgs) {
  const canonical = createCanonical("/", matches[0].loaderData.DOMAIN);
  const alternatives = createNormalAlternatives(
    "/",
    matches[0].loaderData.DOMAIN
  );
  const og = createSocialTags(
    {
      title: loaderData.meta.title,
      description: loaderData.meta.description,
      url: "/",
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
  const page = await getPageLocale(i18n.lang, "home");
  const t = getTranslate(page);

  const meta = {
    title: t("meta.title"),
    description: t("meta.description"),
  };

  return { meta, page };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const ct = useTranslate(loaderData.page);
  const [state, setState] = useState("backstory");

  const steps = [
    {
      image: "/assets/img-how-1.webp",
      title: ct("contents.step.steps.0.title"),
      description: ct("contents.step.steps.0.content"),
    },
    {
      image: "/assets/img-how-2.webp",
      title: ct("contents.step.steps.1.title"),
      description: ct("contents.step.steps.1.content"),
    },
    {
      image: "/assets/img-how-3.webp",
      title: ct("contents.step.steps.2.title"),
      description: ct("contents.step.steps.2.content"),
    },
  ];

  const features = [
    {
      icon: <Bot />,
      title: ct("contents.features.features.0.title"),
      content: ct("contents.features.features.0.content"),
    },
    {
      icon: <PencilRuler />,
      title: ct("contents.features.features.1.title"),
      content: ct("contents.features.features.1.content"),
    },
    {
      icon: <Smile />,
      title: ct("contents.features.features.2.title"),
      content: ct("contents.features.features.2.content"),
    },
    {
      icon: <Contact />,
      title: ct("contents.features.features.3.title"),
      content: ct("contents.features.features.3.content"),
    },
    {
      icon: <SwatchBook />,
      title: ct("contents.features.features.4.title"),
      content: ct("contents.features.features.4.content"),
    },
    {
      icon: <Bird />,
      title: ct("contents.features.features.5.title"),
      content: ct("contents.features.features.5.content"),
    },
  ];

  const examples = loaderData.page.contents.examples.examples;

  const faqs = loaderData.page.contents.faqs.list;

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

  // Note: FotoProfissionalGenerator handles its own task generation internally
  return (
    <Fragment>
      <HeroSection
        title="AOT OC Maker"
        description="Generate your own Attack on Titan OC with AI. Create characters, backstories, and visuals in the iconic AOT style"
      >
        <div className="flex items-center justify-center mb-8">
          <SegmentedControl
            value={state}
            onChange={setState}
            options={[
              { label: "Backstory Generator", value: "backstory" },
              { label: "OC Avatar Maker", value: "avatar" },
            ]}
          />
        </div>
        <ProfileGenerator
          className="aria-hidden:hidden"
          aria-hidden={state !== "backstory"}
        />
        <AvatarGenerator
          className="aria-hidden:hidden"
          aria-hidden={state !== "avatar"}
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
