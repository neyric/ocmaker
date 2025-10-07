import { Link } from "~/components/common";
import { GridSection } from "~/components/ui/grid-section";

interface Button {
  text: string;
  href: string;
  variant: "default" | "accent";
}

interface FooterCTASectionProps {
  title: string;
  description: string;
  buttons: Button[];
}

export function FooterCTASection({
  title,
  description,
  buttons,
}: FooterCTASectionProps) {
  return (
    <GridSection
      borderX={false}
      borderY={false}
      withPadding={false}
      className="bg-neutral text-neutral-content"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 sm:border-x border-grid-border-neutral [mask-image:linear-gradient(white,transparent)]"></div>
        <div className="pointer-events-none absolute inset-x-px inset-y-0 overflow-hidden opacity-100">
          <GridSVG
            // className="pointer-events-none absolute inset-[unset] bottom-0 left-1/2 h-[600px] w-[1800px] -translate-x-1/2 text-grid-border-neutral"
            className="pointer-events-none absolute inset-0 text-grid-border-neutral [mask-composite:intersect] [mask-image:linear-gradient(black,transparent),radial-gradient(black,transparent)]"
          />
        </div>
      </div>
      <div className="relative top-0 z-0 mx-auto mt-0 flex h-12 max-w-[min(800px,calc(100vw-2rem))] -translate-y-px items-start justify-center text-base-100">
        <svg
          viewBox="0 0 85 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-auto shrink-0 translate-x-px translate-y-px overflow-visible"
        >
          <rect
            x="0"
            y="0"
            width="85"
            height="1"
            fill="currentColor"
            transform="translate(0, -1)"
          ></rect>
          <path
            d="M50 45C57.3095 56.6952 71.2084 63.9997 85 64V0H0C13.7915 0 26.6905 7.30481 34 19L50 45Z"
            fill="currentColor"
          ></path>
        </svg>
        <div className="border-t-1 relative z-10 h-[calc(100%+1px)] min-w-0 grow border-current bg-current"></div>
        <svg
          viewBox="0 0 85 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-auto shrink-0 -translate-x-px translate-y-px -scale-x-100 overflow-visible"
        >
          <rect
            x="0"
            y="0"
            width="85"
            height="1"
            fill="currentColor"
            transform="translate(0, -1)"
          ></rect>
          <path
            d="M50 45C57.3095 56.6952 71.2084 63.9997 85 64V0H0C13.7915 0 26.6905 7.30481 34 19L50 45Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
      <div className="relative flex flex-col items-center px-4 pb-32 pt-24 text-center">
        <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center text-center space-y-2 mb-8 last-of-type:mb-0">
          <h1 className="text-center font-display text-3xl font-medium sm:text-4xl sm:leading-[1.15] animate-slide-up-fade [--offset:20px] [animation-duration:1s] [animation-fill-mode:both] motion-reduce:animate-fade-in text-pretty [animation-delay:100ms]">
            {title}
          </h1>
          <p className="text-pretty text-base opacity-70 sm:text-xl animate-slide-up-fade [--offset:10px] [animation-delay:200ms] [animation-duration:1s] [animation-fill-mode:both] motion-reduce:animate-fade-in">
            {description}
          </p>
        </div>
        <div className="flex gap-3">
          {buttons.map((button, index) => (
            <Link
              key={index}
              to={button.href}
              className={`btn btn-${button.variant}`}
            >
              {button.text}
            </Link>
          ))}
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
