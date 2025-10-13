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
    <GridSection borderX={false} borderY={false} className="pt-16" compact>
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center space-y-2 md:pt-8">
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          {title}
        </h1>
        <p className="text-pretty text-base text-base-content/70 sm:text-lg">
          {description}
        </p>
        {children}
      </div>
    </GridSection>
  );
}
