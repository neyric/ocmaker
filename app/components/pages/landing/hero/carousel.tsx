import type {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Image } from "~/components/common";

const TWEEN_FACTOR_BASE = 0.84;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

type PropType = {
  slides: string[];
  options?: EmblaOptionsType;
  height?: string;
};

export const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "center",
      containScroll: "trimSnaps",
      slidesToScroll: 1,
      ...options,
    },
    [Autoplay({ delay: 3000 })],
  );

  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(".slider-img") as HTMLElement;
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenScale = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === "scroll";

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
          const scale = numberWithinRange(tweenValue, 0.98, 1.02).toString();
          const opacity = numberWithinRange(tweenValue, 0.5, 1).toString();
          const tweenNode = tweenNodes.current[slideIndex];
          tweenNode.style.transform = `scale(${scale})`;
          tweenNode.style.opacity = opacity;
        });
      });
    },
    [],
  );

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenScale(emblaApi);

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenScale)
      .on("scroll", tweenScale)
      .on("slideFocus", tweenScale);
  }, [emblaApi, setTweenNodes, setTweenFactor, tweenScale]);

  return (
    <div
      className="w-full opacity-0 data-[ready=true]:opacity-100 relative"
      data-ready={isReady}
      style={
        {
          "--slide-spacing": "0.5rem",
        } as React.CSSProperties
      }
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom items-center">
          {slides.map((url, index) => (
            <div
              className="flex-shrink-0 px-1 h-96 sm:h-108 aspect-[3/4] sm:aspect-[2/3] lg:aspect-square md:h-120 lg:h-96 xl:h-112"
              key={index}
            >
              <Image
                className="slider-img size-full object-cover rounded-lg overflow-hidden"
                src={url}
                fetchPriority="high"
                wsrv={{ output: "webp", w: 400 }}
                alt={`OC Maker Generate ${index + 1}`}
                enableSrcSet
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
