import { Image } from "~/components/common";
import { GridSection } from "~/components/ui/grid-section";

interface Step {
  title: string;
  description: string;
}

interface EffectLibrarySectionProps {
  title: string;
  description: string;
  steps: Step[];
}

export function Steps({
  title,
  description,
  steps,
}: EffectLibrarySectionProps) {
  return (
    <GridSection
      withPadding={false}
      borderX={false}
      borderY={false}
      className="mb-8 sm:mb-16"
    >
      <div className="relative px-4 py-8 sm:px-8 max-sm:border-y sm:border border-grid-border sm:rounded-lg">
        <div className="absolute inset-0">
          <DotSVG className="pointer-events-none absolute inset-0 text-grid-border/50" />
        </div>
        <div className="relative">
          <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center">
            <h2 className="text-center font-bold text-2xl text-base-content sm:text-3xl sm:leading-[1.15] animate-slide-up-fade [--offset:20px] [animation-duration:1s] [animation-fill-mode:both] motion-reduce:animate-fade-in text-pretty [animation-delay:100ms]">
              {title}
            </h2>
            <p className="text-pretty text-center max-w-3xl text-sm text-base-content/70 sm:text-lg animate-slide-up-fade [--offset:10px] [animation-delay:200ms] [animation-duration:1s] [animation-fill-mode:both] motion-reduce:animate-fade-in">
              {description}
            </p>

            {/* How It Work Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-6 w-full">
              {steps.map((item, i) => (
                <div key={i} className="flex gap-x-4 gap-y-2 flex-col">
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-xl font-bold mb-1 before:content-[attr(data-index)]"
                      data-index={`0${i + 1}.`}
                    >
                      {item.title}
                    </h3>
                    <p className="text-base-content/80 text-base">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </GridSection>
  );
}

function DotSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="100%" height="100%" {...props}>
      <defs>
        <pattern
          id="dots-«rj»"
          x="-1"
          y="-1"
          width="12"
          height="12"
          patternUnits="userSpaceOnUse"
        >
          <rect x="1" y="1" width="2" height="2" fill="currentColor"></rect>
        </pattern>
      </defs>
      <rect fill="url(#dots-«rj»)" width="100%" height="100%"></rect>
    </svg>
  );
}
