import { Fragment } from "react";
import { Footer, type FooterProps } from "./footer";
import { Header, type HeaderProps } from "./header";

import {
  ProductHunt,
  Github,
  LinktreeLogo,
  SquareXTwitter,
} from "~/components/icons";
import { Globe } from "lucide-react";

export interface BaseLayoutProps {
  header: HeaderProps;
  footer: Omit<FooterProps, "socials">;
}

const socials: FooterProps["socials"] = [
  {
    to: "https://www.producthunt.com/products/ghost-face-ai",
    target: "_blank",
    title: "Product Hunt",
    icon: ProductHunt,
  },
  {
    to: "https://github.com/neyric",
    target: "_blank",
    title: "Github",
    icon: Github,
  },
  {
    to: "https://linktr.ee/neyric",
    target: "_blank",
    title: "Linktr",
    icon: LinktreeLogo,
  },
  {
    to: "https://x.com/zissy_w",
    target: "_blank",
    title: "Twitter",
    icon: SquareXTwitter,
  },
  {
    to: "https://www.theailibrary.co/tool/ghost-face-ai",
    target: "_blank",
    title: "TAI Lib",
    icon: Globe,
  },
];

export const BaseLayout = ({
  header,
  footer,
  children,
}: React.PropsWithChildren<BaseLayoutProps>) => {
  return (
    <Fragment>
      <Header {...header} />
      {children}
      <Footer {...footer} socials={socials} />
    </Fragment>
  );
};
