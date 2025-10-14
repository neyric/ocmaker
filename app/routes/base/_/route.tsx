import { Outlet } from "react-router";
import { getI18nConetxt } from "~/.server/middleware/i18n-middleware";
import { useUserProfile } from "~/contexts/user-profile";
import { BaseLayout, type BaseLayoutProps } from "~/features/layout";
import { getTranslate } from "~/i18n";
import type { Route } from "./+types/route";
import { CheckinDialog } from "./checkin-dialog";
import { InviteDialog } from "./invite-dialog";
import { LoginDialog } from "./login-dialog";
import { UpgradeDialog } from "./upgrade-dialog";

const popularMakerLinks = [
  { to: "/maker", i18nKey: "footer.popular.links.ocMaker" },
 
] as const;

const moreMakerLinks = [
  {
    to: "/maker/uma-musume-oc-maker",
    i18nKey: "footer.more.links.umaMusume",
  },
  {
    to: "/maker/blue-archive-oc-maker",
    i18nKey: "footer.more.links.blueArchive",
  },
  {
    to: "/maker/demon-slayer-oc-maker",
    i18nKey: "footer.popular.links.demonSlayer",
  },
  {
    to: "/maker/hunter-x-hunter-oc-maker",
    i18nKey: "footer.more.links.hunterXHunter",
  },
  {
    to: "/maker/genshin-impact-oc-maker",
    i18nKey: "footer.popular.links.genshinImpact",
  },
  { to: "/maker/pokemon-oc-maker", i18nKey: "footer.more.links.pokemon" },
  {
    to: "/maker/sailor-moon-oc-maker",
    i18nKey: "footer.more.links.sailorMoon",
  },
  {
    to: "/maker/voltron-oc-maker",
    i18nKey: "footer.more.links.voltron",
  },
  { to: "/maker/tdi-oc-maker", i18nKey: "footer.more.links.tdi" },
  {
    to: "/maker/murder-drones-oc-maker",
    i18nKey: "footer.more.links.murderDrones",
  },
  {
    to: "/maker#explore-oc-makers",
    i18nKey: "footer.more.links.more",
  },
] as const;

export const loader = async ({ context }: Route.LoaderArgs) => {
  const { locale } = getI18nConetxt(context);
  const t = getTranslate(locale);

  const header: BaseLayoutProps["header"] = {
    navLinks: [
      { to: "/", label: t("header.navigation.home") },
      { to: "/maker", label: t("header.navigation.maker") },
      { to: "/community", label: t("header.navigation.community") },
      { to: "/pricing", label: t("header.navigation.pricing") },
      {
        to: "/my-creations",
        label: t("header.navigation.myCreations"),
        shouldLogin: true,
      },
    ],
  };

  const footer: BaseLayoutProps["footer"] = {
    navLinks: [
      {
        label: t("footer.popular.title"),
        list: popularMakerLinks.map(({ to, i18nKey }) => ({
          to,
          label: t(i18nKey),
        })),
      },
      {
        label: t("footer.more.title"),
        list: moreMakerLinks.map(({ to, i18nKey }) => ({
          to,
          label: t(i18nKey),
        })),
      },
      {
        label: t("footer.legal.title"),
        list: [
          {
            to: "/legal/terms",
            label: t("footer.legal.terms"),
            target: "_blank",
          },
          {
            to: "/legal/privacy",
            label: t("footer.legal.privacy"),
            target: "_blank",
          },
          {
            to: "/legal/refund",
            label: t("footer.legal.refund"),
            target: "_blank",
          },
          {
            to: "/legal/cookie",
            label: t("footer.legal.cookie"),
            target: "_blank",
          },
          {
            to: "mailto:support@ocmaker.app",
            label: "support@ocmaker.app",
            target: "_blank",
          },
        ],
      },
    ],
    friendlyLinks: [
      {
        to: "https://growagarden-calculator.info",
        label: "Grow a Garden Calculator",
      },
      { to: "https://ghiblistyleai.app/", label: "Ghibli Style AI" },
      { to: "https://hairroom.app", label: "AI Hairstyle" },
      { to: "https://dns.fish/lookup/ocmaker.app", label: "DNS Fish" },
      { to: "https://ganfanmao.com", label: "干饭猫" },
      { to: "https://agentwise.dev", label: "Discover AI Agents on AgentWise" },
      { to: "https://allinai.tools", label: "All in AI Tools" },
      { to: "https://fotoprofissional.app/", label: "Foto Profissional" },
      { to: "https://ghostfaceai.app/", label: "Ghost Face AI" },
    ],
    brandDescription: t("footer.brandDescription"),
    copyright: t("footer.copyright", { year: new Date().getFullYear() }),
  };

  return { header, footer };
};

export default function Layout({
  loaderData: { header, footer },
}: Route.ComponentProps) {
  const { user } = useUserProfile();
  return (
    <>
      <BaseLayout header={header} footer={footer}>
        <Outlet />
      </BaseLayout>
      <UpgradeDialog />
      <LoginDialog useOneTap={!user} />
      <CheckinDialog />
      <InviteDialog />
    </>
  );
}
