import { Link } from "~/components/common";
import {
  GoogleSolid,
  LinktreeLogoFill,
  Pinterest,
  TwitterSolid,
  UserDetail,
} from "~/components/icons";

const socialLinks = [
  {
    icon: UserDetail,
    to: "https://neyric.dev",
    title: "Neyric Dev",
  },
  {
    icon: UserDetail,
    to: "https://solo.to/zissy",
    title: "Neyric Solo TO",
  },
  {
    icon: GoogleSolid,
    to: "https://google.com",
    title: "Google",
  },
  {
    icon: LinktreeLogoFill,
    to: "https://linktree.com/neyric",
    title: "Linktree",
  },
  {
    icon: Pinterest,
    to: "https://pinterest.com/neyric",
    title: "Pinterest",
  },
  {
    icon: TwitterSolid,
    to: "https://twitter.com/zissy_w",
    title: "Twitter",
  },
];

export const Social = () => {
  return (
    <div className="flex items-center gap-3">
      {socialLinks.map(({ icon: Icon, ...social }, i) => (
        <Link
          key={i}
          to={social.to}
          target="_blank"
          title={social.title}
          className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:text-primary"
        >
          <Icon className="size-6" />
        </Link>
      ))}
    </div>
  );
};
