import type { PropsWithChildren } from "react";
import { Image } from "~/components/common";
import { GridSection } from "~/components/ui/grid-section";

interface AboutProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  list: Array<{ title: string; content: string }>;
}

export function About({
  title,
  description,
  list,
  imageSrc,
  imageAlt,
}: PropsWithChildren<AboutProps>) {
  return (
    <GridSection
      borderX={false}
      borderY={false}
      withPadding={false}
      className="px-4"
    >
      <div className="relative grid grid-cols-1 lg:grid-cols-2 lg:items-center gap-x-8 gap-y-4 sm:gap-y-8 sm:px-4">
        <div>
          <Image
            className="w-full aspect-square bg-base-300 rounded"
            src={imageSrc}
            alt={imageAlt}
            wsrv={{ w: 720 }}
            enableSrcSet
            loading="lazy"
          />
        </div>
        <div>
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl font-bold mb-4 whitespace-pre-line">
              {title}
            </h2>
            <p className="text-base sm:text-lg whitespace-pre-line mx-auto">
              {description}
            </p>
          </div>
          <div className="space-y-4">
            {list.map((item, i) => (
              <div key={i}>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-base-content opacity-70">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </GridSection>
  );
}
