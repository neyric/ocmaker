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
    <GridSection borderX={false} borderY={false} className="pt-16" withPadding={false}>
      <div className="flex flex-col space-y-2 p-4">
        <h1 className="font-display text-3xl font-bold tracking-tight">
          {title}
        </h1>
        <p className="text-pretty text-base text-base-content/70 sm:text-lg max-w-3xl">
          {description}
        </p>
        {children}
      </div>
    </GridSection>
  );
}
