import { Link, Logo } from "~/components/common";
import { cn } from "~/lib/utils";

interface FooterNavLink {
  label: string;
  list: Array<{
    to: string;
    label: string;
    target?: React.HTMLAttributeAnchorTarget;
  }>;
}

interface SocialItem {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  to: string;
  title?: string;
  target?: React.HTMLAttributeAnchorTarget;
}

interface FriendlyLink {
  to: string;
  label: string;
  target?: React.HTMLAttributeAnchorTarget;
}

export interface FooterProps {
  navLinks?: FooterNavLink[];
  socials?: SocialItem[];
  friendlyLinks?: FriendlyLink[];
  brandDescription: string;
  copyright: string;
}

export const Footer = ({
  navLinks = [],
  socials = [],
  friendlyLinks = [],
  brandDescription,
  copyright,
}: FooterProps) => {
  return (
    <footer>
      <div className="container px-4 py-12 md:py-16">
        <div className="grid grid-flow-row md:grid-flow-col gap-x-8 gap-y-4">
          {/* Brand Section */}
          <div className="md:max-w-sm">
            <Link className="inline-block focus-visible:outline-none" to="/">
              <Logo />
            </Link>
            <p className="text-sm text-base-content leading-relaxed">
              {brandDescription}
            </p>
            {!!socials.length && (
              <div className="flex items-center gap-3 mt-4">
                {socials.map(({ icon: Icon, ...social }, i) => (
                  <Link
                    key={i}
                    to={social.to}
                    target={social.target}
                    title={social.title}
                    className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:text-primary"
                  >
                    <Icon className="size-6" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Links */}
          {navLinks.map((navLink, i) => (
            <div key={i} className="space-y-2 md:space-y-4">
              <label className="block font-bold text-base-content text-lg">
                {navLink.label}
              </label>
              <nav className="flex flex-row md:flex-col gap-y-2 gap-x-4 flex-wrap">
                {navLink.list.map((link, j) => (
                  <Link
                    key={`${navLink.label}_${j}`}
                    className={cn(
                      "text-sm text-base-content/70 transition-colors",
                      "hover:text-base-content focus-visible:outline-none",
                      "focus-visible:text-base-content shrink-0",
                    )}
                    target={link.target}
                    to={link.to}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="bg-base-content/5 h-px"></div> */}
      <div className="container px-4 py-4 border-t border-grid-border/35">
        {/* Friendly Links Section */}
        {friendlyLinks.length > 0 && (
          <div className="text-center mb-3">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-2">
              {friendlyLinks.map((link, i) => (
                <Link
                  key={i}
                  to={link.to}
                  target={link.target || "_blank"}
                  className="text-sm text-base-content/70 hover:text-base-content transition-colors focus-visible:outline-none focus-visible:text-base-content"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Copyright */}
        <div className="text-center text-sm text-base-content">{copyright}</div>
      </div>
    </footer>
  );
};
