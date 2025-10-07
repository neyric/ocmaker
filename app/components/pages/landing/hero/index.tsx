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
      className="border-b pt-12"
    >
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
      <div className="relative grid grid-cols-1 lg:grid-cols-2 lg:items-center gap-x-8 gap-y-8 py-4 sm:py-8 md:py-12 sm:px-4">
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
          <div className="text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl font-bold mb-4 whitespace-pre-line max-w-108 sm:max-w-md md:max-w-lg lg:max-w-full mx-auto">
              {title}
            </h1>
            <p className="text-base sm:text-lg whitespace-pre-line mx-auto max-w-xl lg:max-w-full">
              {description}
            </p>
          </div>

          {children}
        </div>
      </div>
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
