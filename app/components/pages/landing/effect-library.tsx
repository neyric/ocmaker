import { Image } from "~/components/common";
import { GridSection } from "~/components/ui/grid-section";

interface Step {
  title: string;
  subtitle: string;
  description: string;
}

interface EffectItem {
  id: string;
  image: string;
}

interface EffectLibrarySectionProps {
  title: string;
  description: string;
  effectList: EffectItem[];
  howItWorkTitle: string;
  howItWorkDescription: string;
  steps: Step[];
}

export function EffectLibrarySection({
  title,
  description,
  effectList,
  howItWorkTitle,
  howItWorkDescription,
  steps,
}: EffectLibrarySectionProps) {
  const sectionItem = [
    {
      image: "/assets/img-how-1.webp",
      title: "Upload Your Photo",
      description:
        "Upload just 1 photo of yourself. A normal selfie is all we need to start your professional transformation.",
    },
    {
      image: "/assets/img-how-2.webp",
      title: "Choose Your Style",
      description:
        "In the new window, browse and select your desired photo style. We offer options suitable for various professions and sectors.",
    },
    {
      image: "/assets/img-how-3.webp",
      title: "Create and Download",
      description:
        "After clicking start task, relax and wait. In just 10-30 seconds, you'll receive photos tailored just for you.",
    },
  ];

  return (
    <GridSection withPadding={false}>
      <div className="relative border-b border-grid-border px-4 py-8 sm:px-8">
        <div className="relative">
          <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center text-center">
            <h2 className="text-center font-bold text-2xl text-base-content sm:text-3xl sm:leading-[1.15] animate-slide-up-fade [--offset:20px] [animation-duration:1s] [animation-fill-mode:both] motion-reduce:animate-fade-in text-pretty [animation-delay:100ms]">
              {title}
            </h2>
            <p className="text-pretty text-sm text-base-content/70 sm:text-lg animate-slide-up-fade [--offset:10px] [animation-delay:200ms] [animation-duration:1s] [animation-fill-mode:both] motion-reduce:animate-fade-in mb-8">
              {description}
            </p>

            {/* Effect Showcase Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-6 w-full">
              {effectList.map((item, i) => (
                <div key={i} className="flex flex-col space-y-3">
                  <div className="w-full aspect-[3/4] overflow-hidden bg-base-300 rounded-lg">
                    <Image
                      className="size-full object-cover"
                      src={item.image}
                      alt={`Trending scream photo generate by gemini, support at Ghost Face AI, result ${i + 1}`}
                      wsrv={{ output: "webp", h: 500 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative px-4 py-8 sm:px-8">
        <div className="absolute inset-0">
          <DotSVG className="pointer-events-none absolute inset-0 text-grid-border/50" />
        </div>
        <div className="relative">
          <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center text-center">
            <h2 className="text-center font-bold text-2xl text-base-content sm:text-3xl sm:leading-[1.15] animate-slide-up-fade [--offset:20px] [animation-duration:1s] [animation-fill-mode:both] motion-reduce:animate-fade-in text-pretty [animation-delay:100ms]">
              {howItWorkTitle}
            </h2>
            <p className="text-pretty text-sm text-base-content/70 sm:text-lg animate-slide-up-fade [--offset:10px] [animation-delay:200ms] [animation-duration:1s] [animation-fill-mode:both] motion-reduce:animate-fade-in">
              {howItWorkDescription}
            </p>

            {/* How It Work Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-6 w-full">
              {sectionItem.map((item, i) => (
                <div key={i} className="flex gap-x-4 gap-y-2 flex-col">
                  <div className="w-full md:max-w-60 md:items-center lg:items-start lg:max-w-full md:aspect-[4/3] bg-base-300 border border-grid-border rounded-lg overflow-hidden">
                    <Image
                      className="size-full object-cover"
                      src={item.image}
                    />
                  </div>
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
