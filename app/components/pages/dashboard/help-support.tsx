import { BookOpen, HelpCircle, Mail, MessageCircle } from "lucide-react";
import { Link } from "~/components/common";
import { GridSection } from "~/components/ui/grid-section";

interface HelpSupportSectionProps {
  title: string;
  description: string;
  supportEmail: string;
}

export function HelpSupportSection({
  title,
  description,
  supportEmail,
}: HelpSupportSectionProps) {
  const supportOptions = [
    {
      icon: BookOpen,
      title: "Documentation",
      description: "Comprehensive guides and tutorials to help you get started",
      action: "Browse Docs",
      href: "/docs",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: MessageCircle,
      title: "Community Forum",
      description: "Connect with other users and share tips and tricks",
      action: "Join Community",
      href: "/community",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Get direct help from our support team",
      action: "Contact Support",
      href: `mailto:${supportEmail}`,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      icon: HelpCircle,
      title: "Help Center",
      description: "Find answers to frequently asked questions",
      action: "Get Help",
      href: "#faqs",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ];

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
            const Icon = option.icon;
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
                  <div className={`p-3 rounded-lg ${option.bgColor}`}>
                    <Icon className={`h-6 w-6 ${option.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-base-content mb-2">
                      {option.title}
                    </h3>
                    <p className="text-sm text-base-content/70 mb-4">
                      {option.description}
                    </p>
                    {option.href.startsWith("mailto:") ? (
                      <Link to={option.href}>
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
                      <Link to={option.href}>
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
