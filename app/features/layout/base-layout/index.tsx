import { Fragment } from "react";
import {
  Github,
  LinktreeLogo,
  Pinterest,
  ProductHunt,
  SquareXTwitter,
  UserDetail,
} from "~/components/icons";
import { Footer, type FooterProps } from "./footer";
import { Header, type HeaderProps } from "./header";

export interface BaseLayoutProps {
  header: HeaderProps;
  footer: Omit<FooterProps, "socials">;
}

const socials: FooterProps["socials"] = [
  {
    to: "https://www.producthunt.com/products/oc-maker-ai-powered-oc-generator",
    target: "_blank",
    title: "Product Hunt",
    icon: ProductHunt,
  },
  {
    icon: UserDetail,
    to: "https://neyric.dev",
    target: "_blank",
    title: "Neyric",
  },
  {
    to: "https://github.com/neyric",
    target: "_blank",
    title: "Github",
    icon: Github,
  },
  {
    icon: Pinterest,
    to: "https://www.pinterest.com/ocmakerapp/",
    target: "_blank",
    title: "Pinterest",
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
