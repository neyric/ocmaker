import type { PropsWithChildren } from "react";
import { GridSection } from "~/components/ui/grid-section";

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
      <div className="relative py-6 sm:py-8 md:py-8 lg:py-8 sm:px-4">
        <div className="max-sm:px-4">
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 whitespace-pre-line max-w-108 sm:max-w-md md:max-w-lg lg:max-w-full mx-auto">
              {title}
            </h1>
            <p className="text-base whitespace-pre-line mx-auto max-w-2xl">
              {description}
            </p>
          </div>
          {children}
        </div>
      </div>
    </GridSection>
  );
}
