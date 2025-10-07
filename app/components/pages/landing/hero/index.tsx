import type { PropsWithChildren } from "react";
import { GridSection } from "~/components/ui/grid-section";
import { EmblaCarousel } from "./carousel";

interface HeroSectionProps {
  title: string;
  description: string;
}

export function HeroSection({
  title,
  description,
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
              "https://cdn.ocmaker.app/example/disney-oc-generateds-2.webp",
              "https://cdn.ocmaker.app/example/dragon-ball-oc-generated-1.webp",
              "https://cdn.ocmaker.app/example/dragon-ball-oc-generated-2.webp",
              "https://cdn.ocmaker.app/example/dragon-ball-oc-generated-3.webp",
              "https://cdn.ocmaker.app/example/dragon-ball-oc-generated-4.webp",
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
            <button className="btn btn-primary">Start for Free</button>
            <button className="btn btn-primary btn-outline">Community Gallery</button>
          </div>

          {children}
        </div>
      </div>
    </GridSection>
  );
}