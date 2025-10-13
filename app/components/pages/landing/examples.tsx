import { clsx } from "clsx";
import { Image } from "~/components/common";
import { GridSection } from "~/components/ui/grid-section";

interface Example {
  image: string;
  prompt: string;
}

interface UseCasesSectionProps {
  title: string;
  description: string;
  examples: Example[];
}

export function Examples({
  title,
  description,
  examples,
}: UseCasesSectionProps) {
  return (
    <GridSection
      borderX={false}
      borderY={false}
      withPadding={false}
      className="max-sm:px-4 pt-4 md:pt-8"
    >
      <div className="relative">
        <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center text-center px-4 mb-8">
          <h2 className="text-center font-bold text-2xl text-base-content sm:text-3xl sm:leading-[1.15] animate-slide-up-fade [--offset:20px] [animation-duration:1s] [animation-fill-mode:both] motion-reduce:animate-fade-in text-pretty [animation-delay:100ms]">
            {title}
          </h2>
          <p className="text-pretty text-sm text-base-content/70 sm:text-lg animate-slide-up-fade [--offset:10px] [animation-delay:200ms] [animation-duration:1s] [animation-fill-mode:both] motion-reduce:animate-fade-in">
            {description}
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {examples.map((example, index) => (
            <div key={index}>
              <div className="aspect-[3/4] bg-muted rounded-lg overflow-hidden flex items-center justify-center hover:scale-102 transition-transform cursor-pointer">
                <Image
                  src={example.image}
                  alt={example.prompt}
                  className="w-full h-full object-cover"
                  wsrv={{ w: 486 }}
                  enableSrcSet
                />
              </div>
              <div className="pt-2 px-1 pb-0">
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                  {example.prompt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </GridSection>
  );
}
