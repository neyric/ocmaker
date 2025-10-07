import type { ReactNode } from "react";
import { GridSection } from "~/components/ui/grid-section";

interface Feature {
  icon: ReactNode;
  title: string;
  subtitle: string;
  description: string;
}

interface WhyImgVidSectionProps {
  title: string;
  description: string;
  features: Feature[];
}

export function WhyImgVidSection({
  title,
  description,
  features,
}: WhyImgVidSectionProps) {
  return (
    <GridSection>
      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center text-center">
        <h2 className="text-center font-bold text-2xl text-base-content sm:text-3xl sm:leading-[1.15] animate-slide-up-fade [--offset:20px] [animation-duration:1s] [animation-fill-mode:both] motion-reduce:animate-fade-in text-pretty [animation-delay:100ms]">
          {title}
        </h2>
        <p className="text-pretty text-sm text-base-content/70 sm:text-lg animate-slide-up-fade [--offset:10px] [animation-delay:200ms] [animation-duration:1s] [animation-fill-mode:both] motion-reduce:animate-fade-in">
          {description}
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 gap-8 w-full">
          {features.map((item, i) => (
            <div key={i} className="flex flex-col text-left">
              <div className="mb-4 flex md:flex-col gap-y-2 gap-x-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-sm border border-grid-border bg-base-100 text-base-content">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-xl">{item.title}</h3>
                  <p className="text-sm font-medium opacity-70">
                    {item.subtitle}
                  </p>
                </div>
              </div>
              <p className="text-sm text-base-content/70 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </GridSection>
  );
}
