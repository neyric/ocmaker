import {
  Bird,
  Bot,
  Contact,
  PencilRuler,
  Smile,
  SwatchBook,
} from "lucide-react";
import { Fragment } from "react";
import { getI18nConetxt } from "~/.server/middleware/i18n-middleware";
import {
  About,
  Examples,
  FAQsSection,
  FeaturedOn,
  FooterCTASection,
  HeroSection,
  Steps,
  WhyImgVidSection,
} from "~/components/pages/landing";

import { getPageLocale, getTranslate, useTranslate } from "~/i18n";
import { createCanonical, createNormalAlternatives } from "~/utils/meta";
import { createSocialTags } from "~/utils/og";
import type { Route } from "./+types/route";

export function meta({ matches, loaderData }: Route.MetaArgs) {
  const canonical = createCanonical("/", matches[0].loaderData.DOMAIN);
  const alternatives = createNormalAlternatives(
    "/",
    matches[0].loaderData.DOMAIN,
  );
  const og = createSocialTags(
    {
      title: loaderData.meta.title,
      description: loaderData.meta.description,
      url: "/",
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

  const list = loaderData.page.contents.about.list;

  const faqs = loaderData.page.contents.faqs.list;

  const ctaButtons = [
    {
      text: ct("contents.cta.btns.start"),
      href: "/",
      variant: "default" as const,
      className:
        "rounded-full h-12 px-8 hover:bg-base-100 text-base hover:border-base-100",
    },
    // {
    //   text: ct("contents.cta.btns.explore"),
    //   href: "/",
    //   variant: "outline" as const,
    //   className:
    //     "rounded-full h-12 px-8 hover:bg-base-100 text-base hover:border-base-100",
    // },
  ];

  const badges = [
    {
      href: "https://frogdr.com/ai138.com?utm_source=ai138.com",
      img: "https://frogdr.com/ai138.com/badge-white.svg",
      title: "Monitor your Domain Rating with FrogDR",
    },
    {
      href: "https://dang.ai/",
      img: "https://cdn.prod.website-files.com/63d8afd87da01fb58ea3fbcb/6487e2868c6c8f93b4828827_dang-badge.png",
      title: "Dang.ai",
    },
    {
      href: "https://imglab.dev/en/s/ocmaker_app",
      img: "https://frogdr.com/imglab.dev/badge-white.svg",
      title: "ImgLab Awards",
    },
    {
      href: "https://twelve.tools",
      img: "https://twelve.tools/badge0-white.svg",
      title: "Featured on Twelve Tools",
    },
    {
      href: "https://fazier.com",
      img: "https://frogdr.com/fazier.com/badge-white.svg",
      title: "Fazier badge",
    },
    {
      href: "https://www.agenthunter.io/?utm_source=badge&utm_medium=embed&utm_campaign=OC%20Maker",
      img: "https://frogdr.com/agenthunter.io/badge-white.svg",
      title: "AgentHunter Badge",
    },
    {
      href: "https://launchigniter.com/launch/oc-maker?ref=badge-ai-hairstyle",
      img: "https://frogdr.com/launchigniter.com/badge-white.svg",
      title: "Featured on LaunchIgniter",
    },
    {
      href: "https://turbo0.com/item/oc-maker",
      img: "https://frogdr.com/turbo0.com/badge-white.svg",
      title: "Listed on Turbo0",
    },
    {
      href: "https://aifinder.site",
      img: "https://aifinder.site/light-badge.png",
      title: "Discover more AI tools at aifinder.site",
    },
    {
      href: "https://aitools.inc/tools/oc-maker?utm_source=embed-badge-oc-maker&utm_medium=embed&utm_campaign=embed-badge-featured",
      img: "https://aitools.inc/tools/oc-maker/embeds/v1/featured-badge.svg?theme=light",
      title: "OC Maker | AI Tools",
    },
    {
      href: "https://starterbest.com",
      img: "https://starterbest.com/badages-awards.svg",
      title: "Featured on Starter Best",
    },
  ];

  // Note: FotoProfissionalGenerator handles its own task generation internally
  return (
    <Fragment>
      <div className="h-screen bg-gradient-to-b from-primary/10 to-transparent absolute top-0 inset-x-0" />
      <HeroSection
        title={ct("contents.hero.title")}
        description={ct("contents.hero.description")}
        createButtonText={ct("contents.hero.createButton")}
      >
        {/* <div className="mt-4 sm:mt-6 mb-2">
          <Dropzone
            multiple={false}
            openRef={openRef}
            onFilesAccepted={([file]) => {
              if (file.validSize && file.validType) onUpload?.(file.file);
            }}
          >
            <button type="button" className="btn btn-wide btn-primary">
              <UploadCloud size={20} />
              Upload Your Photo
            </button>
            <p className="text-base max-md:hidden">or drag a file here</p>
            <p className="text-xs">1 Credit per Ghostface photo generated</p>
          </Dropzone>
        </div>
        <div className="flex gap-3 flex-col lg:flex-row my-3">
          <div className="flex items-center max-lg:justify-center lg:text-sm lg:opacity-70">
            Or try with an example
          </div>
          <div
            className={clsx(
              "flex-1 min-w-0 w-full sm:max-w-60 lg:max-w-none",
              "max-lg:grid max-lg:grid-cols-4 max-lg:gap-4 max-lg:mx-auto",
              "lg:flex lg:gap-2 lg:justify-end"
            )}
          >
            {[
              "https://cdn.hairroom.app/assets/images/example-men-1.webp",
              "https://cdn.hairroom.app/assets/images/example-men-2.webp",
              "https://cdn.hairroom.app/assets/images/example-women-1.webp",
              "https://cdn.hairroom.app/assets/images/example-women-2.webp",
            ].map((src, i) => (
              <Image
                key={i}
                loading="lazy"
                className="w-full lg:w-10 aspect-square bg-base-300 rounded-box object-cover cursor-pointer"
                src={src}
                alt="ghostface ai example photo"
                onClick={(e) => handleExampleClick(e.currentTarget.src)}
              />
            ))}
          </div>
        </div>
        <p className="text-sm text-base-content/80">
          Join the viral trend that's taking over Instagram! Transform your
          selfie into a stunning 90s horror portrait with authentic Y2K bedroom
          aesthetics and the iconic Ghostface from Scream. Perfect for
          Halloween, social media, or just for fun with friends.
        </p> */}
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

      <About
        title={ct("contents.about.title")}
        description={ct("contents.about.description")}
        imageSrc={ct("contents.about.imageSrc")}
        imageAlt={ct("contents.about.imageAlt")}
        list={list}
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
      <FeaturedOn
        title={ct("contents.featuredOn.title")}
        description={ct("contents.featuredOn.description")}
        badges={badges}
      />
    </Fragment>
  );
}
