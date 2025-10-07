import type { PropsWithChildren } from "react";
import { SegmentedControl } from "~/components/common";
import { GridSection } from "~/components/ui/grid-section";

interface PricingHeroSectionProps {
  title: string;
  description: string;
  productType: string;
  onProductTypeChange: (value: string) => void;
  segmentedOptions: Array<{ value: string; label: React.ReactNode }>;
}

export function HeroSection({
  title,
  description,
  productType,
  onProductTypeChange,
  segmentedOptions,
  children,
}: PropsWithChildren<PricingHeroSectionProps>) {
  return (
    <GridSection borderX={false} borderY={false} className="border-b pt-12">
      <div className="pointer-events-none absolute inset-0 sm:border-x border-grid-border [mask-image:linear-gradient(transparent,black)]"></div>
      <div className="pointer-events-none absolute inset-y-0 left-1/2 w-[1800px] -translate-x-1/2 [mask-composite:intersect] [mask-image:linear-gradient(transparent,black)] opacity-100">
        <div className="absolute inset-x-[300px] inset-y-0">
          <GridSVG className="pointer-events-none absolute inset-[unset] bottom-0 right-full h-[600px] w-[360px] text-grid-border/50 [mask-image:linear-gradient(90deg,transparent,black)]" />
          <GridSVG className="pointer-events-none absolute inset-[unset] bottom-0 left-full h-[600px] w-[360px] text-grid-border/50 [mask-image:linear-gradient(270deg,transparent,black)]" />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-px inset-y-0 overflow-hidden opacity-100 [mask-composite:intersect] [mask-image:linear-gradient(transparent,black),radial-gradient(130%_50%_at_50%_100%,transparent,black)]">
        <GridSVG className="pointer-events-none absolute inset-[unset] bottom-0 left-1/2 h-[600px] w-[1800px] -translate-x-1/2 text-grid-border/50" />
      </div>
      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center text-center space-y-2 mb-8">
        <h1 className="text-center font-display text-3xl sm:text-4xl md:text-5xl font-bold sm:leading-[1.15] whitespace-pre-line max-w-lg mx-auto">
          {title}
        </h1>
        <p className="text-pretty text-lg text-base-content/70 max-w-xl mx-auto">
          {description}
        </p>
      </div>

      {/* Segmented Control */}
      <div className="flex justify-center items-center">
        <SegmentedControl
          value={productType}
          onChange={onProductTypeChange}
          options={segmentedOptions}
        />
      </div>
      {children}
    </GridSection>
  );
}

interface GridSVGProps extends React.SVGProps<SVGSVGElement> {}
function GridSVG(props: GridSVGProps) {
  return (
    <svg width="100%" height="100%" {...props}>
      <defs>
        <pattern
          id="grid-«rc»"
          x="0"
          y="0"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 60 0 L 0 0 0 60"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="2"
          ></path>
        </pattern>
      </defs>
      <rect fill="url(#grid-«rc»)" width="100%" height="100%"></rect>
    </svg>
  );
}
