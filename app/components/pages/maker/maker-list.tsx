import { Image, Link } from "~/components/common";
import { GridSection } from "~/components/ui/grid-section";

interface MakerListItem {
  slug: string;
  title: string;
  cover: string;
}

interface MakerListProps {
  title: string;
  description: string;
  makers: MakerListItem[];
}

export function MakerList({ title, description, makers }: MakerListProps) {
  if (!makers?.length) return null;

  return (
    <GridSection borderX={false} borderY={false} compact>
      <div id="explore-oc-makers" className="absolute -top-20" />
      <div className="relative">
        <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center text-center px-4 mb-8">
          <h2 className="text-center font-bold text-2xl text-base-content sm:text-3xl sm:leading-[1.15] animate-slide-up-fade [--offset:20px] [animation-duration:1s] [animation-fill-mode:both] motion-reduce:animate-fade-in text-pretty [animation-delay:100ms]">
            {title}
          </h2>
          <p className="text-pretty text-sm text-base-content/70 sm:text-lg animate-slide-up-fade [--offset:10px] [animation-delay:200ms] [animation-duration:1s] [animation-fill-mode:both] motion-reduce:animate-fade-in">
            {description}
          </p>
        </div>
        <div className="grid gap-3 grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
          {makers.map((maker) => (
            <Link
              key={maker.slug}
              to={`/maker/${maker.slug}`}
              className="group flex h-full flex-col"
              autoLang
            >
              <Image
                className="w-full aspect-square rounded-lg object-cover"
                src={maker.cover}
                loading="lazy"
                wsrv={{ w: 220 }}
              />
              <h3 className="text-xs text-center text-base-content truncate mt-1">
                {maker.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </GridSection>
  );
}
