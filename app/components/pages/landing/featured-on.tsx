import { Image, Link } from "~/components/common";
import { GridSection } from "~/components/ui/grid-section";

interface Badge {
  href: string;
  img: string;
  title: string;
}

interface FeaturedOnProps {
  title: string;
  description: string;
  badges: Badge[];
}

export function FeaturedOn({ title, description, badges }: FeaturedOnProps) {
  return (
    <GridSection
      borderX={false}
      borderY={false}
      compact
      className="py-4 md:py-8"
    >
      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center text-center">
        <h2 className="text-center font-bold text-2xl text-base-content sm:text-3xl sm:leading-[1.15] animate-slide-up-fade [--offset:20px] [animation-duration:1s] [animation-fill-mode:both] motion-reduce:animate-fade-in text-pretty [animation-delay:100ms]">
          {title}
        </h2>
        <p className="text-pretty max-w-3xl text-sm text-base-content/70 sm:text-lg animate-slide-up-fade [--offset:10px] [animation-delay:200ms] [animation-duration:1s] [animation-fill-mode:both] motion-reduce:animate-fade-in">
          {description}
        </p>

        {/* Features Grid */}
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 max-w-4xl mx-auto mt-8">
          {badges.map((badge, index) => (
            <Link
              key={index}
              to={badge.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transition-transform hover:scale-105 hover:opacity-90"
              title={badge.title}
            >
              <Image
                src={badge.img}
                alt={badge.title}
                className="max-h-11 w-auto"
                proxy={false}
                loading="lazy"
              />
            </Link>
          ))}
        </div>
      </div>
    </GridSection>
  );
}
