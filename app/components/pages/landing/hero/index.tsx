import type { PropsWithChildren } from "react";
import { Link } from "~/components/common";
import { GridSection } from "~/components/ui/grid-section";
import { EmblaCarousel } from "./carousel";

interface HeroSectionProps {
  title: string;
  description: string;
  createButtonText: string;
}

export function HeroSection({
  title,
  description,
  createButtonText,
  children,
}: PropsWithChildren<HeroSectionProps>) {
  return (
    <GridSection
      borderX={false}
      borderY={false}
      withPadding={false}
      className="pt-16"
    >
      <div className="relative grid grid-cols-1 lg:grid-cols-2 lg:items-center gap-x-8 gap-y-6 py-6 sm:py-8 md:py-10 lg:py-12 sm:px-4">
        <div className="lg:order-2">
          <EmblaCarousel
            options={{
              align: "center",
              loop: true,
            }}
            slides={[
              "https://cdn.ocmaker.app/example/honkai-star-rail-oc-generated-3.webp",
              "https://cdn.ocmaker.app/example/mlp-oc-generateds-1.webp",
              "https://cdn.ocmaker.app/example/aot-oc-generated-1.webp",
              "https://cdn.ocmaker.app/example/oshi-no-ko-oc-maker-generated-4.webp",
              "https://cdn.ocmaker.app/example/uma-musume-oc-generated-2.webp",
              "https://cdn.ocmaker.app/example/demon-slayer-oc-generateds-1.webp",
            ]}
          />
        </div>
        <div className="lg:order-1 max-sm:px-4">
          <div className="text-center lg:text-left mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl font-bold mb-4 whitespace-pre-line max-w-108 sm:max-w-md md:max-w-lg lg:max-w-full mx-auto">
              {title}
            </h1>
            <p className="text-base sm:text-lg whitespace-pre-line mx-auto max-w-xl lg:max-w-full">
              {description}
            </p>
          </div>
          <div className="flex items-center gap-4 max-lg:justify-center">
            <Link to="/maker" className="btn btn-primary">
              {createButtonText}
            </Link>
          </div>

          {children}
        </div>
      </div>
    </GridSection>
  );
}
