import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import { GridSection } from "~/components/ui/grid-section";

interface PartnersSectionProps {
  title: string;
  description: string;
}

export function PartnersSection({ title, description }: PartnersSectionProps) {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      watchDrag: false,
      dragFree: false,
      containScroll: false,
    },
    [
      AutoScroll({
        speed: 0.5,
      }),
    ],
  );

  return (
    <GridSection className="bg-base-200" withPadding={false}>
      <div className="relative pt-6">
        <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center text-center px-4">
          <div className="text-center font-bold text-2xl text-base-content sm:text-3xl sm:leading-[1.15] animate-slide-up-fade [--offset:20px] [animation-duration:1s] [animation-fill-mode:both] motion-reduce:animate-fade-in text-pretty [animation-delay:100ms]">
            {title}
          </div>
          <p className="text-pretty text-sm text-base-content/70 sm:text-lg animate-slide-up-fade [--offset:10px] [animation-delay:200ms] [animation-duration:1s] [animation-fill-mode:both] motion-reduce:animate-fade-in">
            {description}
          </p>
        </div>

        <div className="relative overflow-hidden">
          {/* 左右渐变遮罩 */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-base-200 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-base-200 to-transparent z-10" />

          {/* Embla 轮播容器 */}
          <div className="embla" ref={emblaRef}>
            <div className="embla__container flex py-6">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="embla__slide flex-[0_0_auto] flex items-center justify-center h-10 gap-3 px-4 transition-all duration-300 opacity-80 hover:opacity-100 select-none pointer-events-none"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-full aspect-square object-contain"
                  />
                  <div className="text-2xl font-bold text-base-content/80">
                    {partner.name}
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

const partners = [
  {
    name: "Midjourney",
    logo: "/assets/logo/midjourney.png",
  },
  {
    name: "Google Veo 3",
    logo: "/assets/logo/google.svg",
  },
  {
    name: "Runway",
    logo: "/assets/logo/runway.svg",
  },
  {
    name: "Flux Kontext",
    logo: "/assets/logo/flux.svg",
  },
  {
    name: "SeeDance",
    logo: "/assets/logo/bytedance.svg",
  },
  {
    name: "ChatGPT",
    logo: "/assets/logo/gpt.svg",
  },
  {
    name: "Midjourney",
    logo: "/assets/logo/midjourney.png",
  },
  {
    name: "Google Veo 3",
    logo: "/assets/logo/google.svg",
  },
  {
    name: "Runway",
    logo: "/assets/logo/runway.svg",
  },
  {
    name: "Flux Kontext",
    logo: "/assets/logo/flux.svg",
  },
  {
    name: "SeeDance",
    logo: "/assets/logo/bytedance.svg",
  },
  {
    name: "ChatGPT",
    logo: "/assets/logo/gpt.svg",
  },
];
