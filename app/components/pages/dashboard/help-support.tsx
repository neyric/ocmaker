import { BookOpen, HelpCircle, Mail, MessageCircle } from "lucide-react";
import { Link } from "~/components/common";
import { GridSection } from "~/components/ui/grid-section";

interface Option {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  href: string;
}

interface HelpSupportSectionProps {
  title: string;
  description: string;
  supportOptions: Option[];
}

export function HelpSupportSection({
  title,
  description,
  supportOptions,
}: HelpSupportSectionProps) {
  return (
    <GridSection borderY={false} className="border-b">
      <div className="relative">
        <div className="relative mx-auto flex w-full flex-col items-center text-center mb-8">
          <h2 className="text-center font-bold text-2xl text-base-content sm:text-3xl sm:leading-[1.15] animate-slide-up-fade [--offset:20px] [animation-duration:1s] [animation-fill-mode:both] motion-reduce:animate-fade-in text-pretty [animation-delay:100ms]">
            {title}
          </h2>
          <p className="text-pretty text-sm text-base-content/70 sm:text-base max-w-screen-md animate-slide-up-fade [--offset:10px] [animation-delay:200ms] [animation-duration:1s] [animation-fill-mode:both] motion-reduce:animate-fade-in">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {supportOptions.map((option, index) => {
            return (
              <div
                key={index}
                className="p-6 bg-base-200/30 rounded-lg border border-grid-border/50 hover:border-grid-border transition-colors animate-slide-up-fade [--offset:20px] [animation-fill-mode:both] motion-reduce:animate-fade-in"
                style={{
                  animationDelay: `${300 + index * 100}ms`,
                  animationDuration: "1s",
                }}
              >
                <div className="flex items-start space-x-4">
                  {option.icon}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-base-content mb-2">
                      {option.title}
                    </h3>
                    <p className="text-sm text-base-content/70 mb-4">
                      {option.description}
                    </p>
                    {option.href.startsWith("mailto:") ? (
                      <Link to={option.href} autoLang>
                        <button className="btn btn-outline btn-sm">
                          {option.action}
                        </button>
                      </Link>
                    ) : option.href.startsWith("#") ? (
                      <a href={option.href}>
                        <button className="btn btn-outline btn-sm">
                          {option.action}
                        </button>
                      </a>
                    ) : (
                      <Link to={option.href} autoLang>
                        <button className="btn btn-outline btn-sm">
                          {option.action}
                        </button>
                      </Link>
                    )}
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
