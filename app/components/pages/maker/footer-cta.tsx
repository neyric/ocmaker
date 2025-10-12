import clsx from "clsx";
import { Link } from "~/components/common";
import { GridSection } from "~/components/ui/grid-section";

interface Button {
  text: string;
  href: string;
  variant: "default" | "accent" | "outline";
  className?: string;
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
      className="mt-8"
    >
      <div className="relative flex flex-col items-center px-4 py-16 lg:py-20 xl:py-24 text-center bg-primary text-primary-content sm:rounded-lg">
        <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center text-center space-y-2 mb-8 last-of-type:mb-0">
          <h1 className="text-center font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight animate-slide-up-fade [--offset:20px] [animation-duration:1s] [animation-fill-mode:both] motion-reduce:animate-fade-in text-pretty [animation-delay:100ms]">
            {title}
          </h1>
          <p className="text-pretty text-primary-content/80 md:text-xl animate-slide-up-fade [--offset:10px] [animation-delay:200ms] [animation-duration:1s] [animation-fill-mode:both] motion-reduce:animate-fade-in">
            {description}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {buttons.map((button, index) => (
            <Link
              key={index}
              to={button.href}
              className={clsx(`btn btn-${button.variant}`, button.className)}
              autoLang
            >
              {button.text}
            </Link>
          ))}
        </div>
      </div>
    </GridSection>
  );
}
