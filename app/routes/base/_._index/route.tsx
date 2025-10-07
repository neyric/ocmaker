import clsx from "clsx";
import { UploadCloud } from "lucide-react";
import { Fragment, useRef, useState } from "react";
import { Dropzone, Image } from "~/components/common";
import {
  EffectLibrarySection,
  FAQsSection,
  FooterCTASection,
  HeroSection,
  UseCasesSection,
  WhyImgVidSection,
} from "~/components/pages/landing";
import { ghostFaceList } from "~/data/ghost-face";
import {
  FotoProfissional,
  type FotoProfissionalRef,
} from "~/features/generator/ghost-face";
import { createCanonical, createNormalAlternatives } from "~/utils/meta";
import { createSocialTags } from "~/utils/og";
import type { Route } from "./+types/route";
import contents, {
  ctaButtons,
  effectShowcase,
  faqs,
  features,
  howItWorkSteps,
  useCases,
} from "./contents";

export function meta({ matches }: Route.MetaArgs) {
  const canonical = createCanonical("/", matches[0].loaderData.DOMAIN);
  const alternatives = createNormalAlternatives(
    "/",
    matches[0].loaderData.DOMAIN
  );
  const og = createSocialTags(
    {
      title: contents.meta.title,
      description: contents.meta.description,
      url: "/",
      siteName: matches[0].loaderData.SITE_NAME,
    },
    matches[0].loaderData.DOMAIN
  );

  return [
    { title: contents.meta.title },
    {
      name: "description",
      content: contents.meta.description,
    },
    canonical,
    ...alternatives,
    ...og,
  ];
}

export function loader() {
  const list = ghostFaceList.map(({ prompt: _, ...item }) => item);

  return { list };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const [downloading, setDownloading] = useState(false);
  const formRef = useRef<FotoProfissionalRef>(null);

  const content = contents.contents;
  const openRef = useRef(() => console.log("open"));

  const onUpload = (file: File) => {
    formRef.current?.open(file);
  };

  const handleExampleClick = async (url: string) => {
    if (downloading) return;
    setDownloading(true);
    const res = await fetch(url).finally(() => setDownloading(false));
    const blob = await res.blob();
    const fileName = url.split("/").pop() ?? "";
    const file = new File([blob], fileName, { type: blob.type });

    onUpload?.(file);
  };

  // Note: FotoProfissionalGenerator handles its own task generation internally
  return (
    <Fragment>
      <HeroSection
        title={content.hero.title}
        description={content.hero.description}
      >
        <div className="mt-4 sm:mt-6 mb-2">
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
        </p>
      </HeroSection>

      <EffectLibrarySection
        title={content.effectShowcase.title}
        description={content.effectShowcase.description}
        effectList={loaderData.list}
        howItWorkTitle={content.howItWork.title}
        howItWorkDescription={content.howItWork.description}
        steps={howItWorkSteps}
      />
      <WhyImgVidSection
        title={content.why.title}
        description={content.why.description}
        features={features}
      />
      <UseCasesSection
        title={content.useCase.title}
        description={content.useCase.description}
        useCases={useCases}
      />
      <FAQsSection
        title={content.faqs.title}
        description={content.faqs.description}
        faqs={faqs}
      />
      <FooterCTASection
        title={content.cta.title}
        description={content.cta.description}
        buttons={ctaButtons}
      />
      <FotoProfissional ref={formRef} fotoProfissionalList={loaderData.list} />
    </Fragment>
  );
}
