import { GridSection } from "~/components/ui/grid-section";

interface HeroSectionProps {
  title: string;
  description: string;
}

export function HeroSection({ title, description }: HeroSectionProps) {
  return (
    <GridSection borderX={false} borderY={false} className="border-b pt-20">
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
      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center text-center space-y-2">
        <h1 className="text-center font-display text-4xl sm:text-5xl md:text-6xl font-bold sm:leading-[1.15] animate-slide-up-fade [--offset:20px] [animation-duration:1s] [animation-fill-mode:both] motion-reduce:animate-fade-in text-pretty [animation-delay:100ms]">
          {title}
        </h1>
        <p className="text-pretty text-lg text-base-content/70 max-w-2xl animate-slide-up-fade [--offset:10px] [animation-delay:200ms] [animation-duration:1s] [animation-fill-mode:both] motion-reduce:animate-fade-in">
          {description}
        </p>
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
          id="grid-dashboard-hero"
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
      <rect fill="url(#grid-dashboard-hero)" width="100%" height="100%"></rect>
    </svg>
  );
}
