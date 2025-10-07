import { clsx } from "clsx";
import { Image } from "~/components/common";
import { GridSection } from "~/components/ui/grid-section";

interface UseCase {
  previewUrl: string;
  previewType: "video" | "image";
  title: string;
  description: string;
}

interface UseCasesSectionProps {
  title: string;
  description: string;
  useCases: UseCase[];
}

export function UseCasesSection({
  title,
  description,
  useCases,
}: UseCasesSectionProps) {
  return (
    <GridSection className="bg-base-200">
      <div className="relative">
        <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center text-center px-4 mb-8">
          <h2 className="text-center font-bold text-2xl text-base-content sm:text-3xl sm:leading-[1.15] animate-slide-up-fade [--offset:20px] [animation-duration:1s] [animation-fill-mode:both] motion-reduce:animate-fade-in text-pretty [animation-delay:100ms]">
            {title}
          </h2>
          <p className="text-pretty text-sm text-base-content/70 sm:text-lg animate-slide-up-fade [--offset:10px] [animation-delay:200ms] [animation-duration:1s] [animation-fill-mode:both] motion-reduce:animate-fade-in">
            {description}
          </p>
        </div>

        {/* Use Cases List */}
        <div className="space-y-6 lg:space-y-12">
          {useCases.map((useCase, index) => {
            if (!useCase.previewUrl) return null;

            return (
              <div
                key={index}
                className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-center group"
              >
                {/* Preview */}
                <div className="group-odd:lg:order-2">
                  <div className="flex items-center justify-center">
                    {useCase.previewType === "video" ? (
                      <CaseVideo
                        className="size-full object-cover"
                        src={useCase.previewUrl}
                      />
                    ) : (
                      <Image
                        className="size-full object-cover"
                        src={useCase.previewUrl}
                      />
                    )}
                  </div>
                </div>

                {/* Text Content */}
                <div className={clsx("text-left group-odd:lg:order-1")}>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-2xl text-base-content mb-2">
                        {useCase.title}
                      </h3>
                      <p className="text-base-content/70 leading-relaxed whitespace-pre-line">
                        {useCase.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </GridSection>
  );
}

interface TaskVideoProps extends React.ComponentProps<"video"> {}
function CaseVideo({ className, ...props }: TaskVideoProps) {
  return (
    <div className={clsx("size-full relative", className)}>
      <video
        playsInline
        webkit-playsinline="true"
        muted
        loop
        autoPlay
        {...props}
        className="bg-black bg-cover bg-center size-full cursor-pointer object-cover"
      />
    </div>
  );
}
