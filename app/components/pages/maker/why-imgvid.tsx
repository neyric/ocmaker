import { GridSection } from "~/components/ui/grid-section";

interface Feature {
  title: string;
  content: string;
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
    <GridSection borderX={false} borderY={false} compact>
      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center text-center">
        <h2 className="text-center font-bold text-2xl text-base-content sm:text-3xl sm:leading-[1.15] animate-slide-up-fade [--offset:20px] [animation-duration:1s] [animation-fill-mode:both] motion-reduce:animate-fade-in text-pretty [animation-delay:100ms]">
          {title}
        </h2>
        <p className="text-pretty max-w-3xl text-sm text-base-content/70 sm:text-lg animate-slide-up-fade [--offset:10px] [animation-delay:200ms] [animation-duration:1s] [animation-fill-mode:both] motion-reduce:animate-fade-in">
          {description}
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 gap-8 w-full">
          {features.map((item, i) => (
            <div key={i} className="flex flex-col text-left">
              <h3 className="font-semibold text-xl">{item.title}</h3>
              <p className="text-md text-base-content/70 leading-relaxed">
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </GridSection>
  );
}
