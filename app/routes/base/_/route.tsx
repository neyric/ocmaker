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
  { to: "/maker/aot-oc-maker", i18nKey: "footer.popular.links.aot" },
  {
    to: "/maker/jujutsu-kaisen-oc-maker",
    i18nKey: "footer.popular.links.jujutsuKaisen",
  },
  { to: "/maker/one-piece-oc-maker", i18nKey: "footer.popular.links.onePiece" },
  { to: "/maker/naruto-oc-maker", i18nKey: "footer.popular.links.naruto" },
  {
    to: "/maker/spy-x-family-oc-maker",
    i18nKey: "footer.popular.links.spyXFamily",
  },
  {
    to: "/maker/dragon-ball-oc-maker",
    i18nKey: "footer.popular.links.dragonBall",
  },
  {
    to: "/maker/demon-slayer-oc-maker",
    i18nKey: "footer.popular.links.demonSlayer",
  },
  {
    to: "/maker/my-hero-academia-oc-maker",
    i18nKey: "footer.popular.links.myHeroAcademia",
  },
  {
    to: "/maker/detective-conan-oc-maker",
    i18nKey: "footer.popular.links.detectiveConan",
  },
  {
    to: "/maker/genshin-impact-oc-maker",
    i18nKey: "footer.popular.links.genshinImpact",
  },
  {
    to: "/maker/league-of-legends-oc-maker",
    i18nKey: "footer.popular.links.leagueOfLegends",
  },
  { to: "/maker/sonic-oc-maker", i18nKey: "footer.popular.links.sonic" },
  { to: "/maker/marvel-oc-maker", i18nKey: "footer.popular.links.marvel" },
  { to: "/maker/disney-oc-maker", i18nKey: "footer.popular.links.disney" },
  {
    to: "/maker/my-little-pony-oc-maker",
    i18nKey: "footer.popular.links.myLittlePony",
  },
] as const;

const moreMakerLinks = [
  { to: "/maker/arknights-oc-maker", i18nKey: "footer.more.links.arknights" },
  { to: "/maker/bleach-oc-maker", i18nKey: "footer.more.links.bleach" },
  { to: "/maker/jojo-oc-maker", i18nKey: "footer.more.links.jojo" },
  {
    to: "/maker/hunter-x-hunter-oc-maker",
    i18nKey: "footer.more.links.hunterXHunter",
  },
  {
    to: "/maker/uma-musume-oc-maker",
    i18nKey: "footer.more.links.umaMusume",
  },
  { to: "/maker/frieren-oc-maker", i18nKey: "footer.more.links.frieren" },
  {
    to: "/maker/apothecary-diaries-oc-maker",
    i18nKey: "footer.more.links.apothecaryDiaries",
  },
  { to: "/maker/oshi-no-ko-oc-maker", i18nKey: "footer.more.links.oshiNoKo" },
  { to: "/maker/blue-lock-oc-maker", i18nKey: "footer.more.links.blueLock" },
  {
    to: "/maker/chainsaw-man-oc-maker",
    i18nKey: "footer.more.links.chainsawMan",
  },
  {
    to: "/maker/hells-paradise-oc-maker",
    i18nKey: "footer.more.links.hellsParadise",
  },
  {
    to: "/maker/black-butler-oc-maker",
    i18nKey: "footer.more.links.blackButler",
  },
  {
    to: "/maker/blue-archive-oc-maker",
    i18nKey: "footer.more.links.blueArchive",
  },
  {
    to: "/maker/bungo-stray-dogs-oc-maker",
    i18nKey: "footer.more.links.bungoStrayDogs",
  },
  { to: "/maker/haikyuu-oc-maker", i18nKey: "footer.more.links.haikyuu" },
  {
    to: "/maker/honkai-star-rail-oc-maker",
    i18nKey: "footer.more.links.honkaiStarRail",
  },
  {
    to: "/maker/kaguya-sama-oc-maker",
    i18nKey: "footer.more.links.kaguyaSama",
  },
  { to: "/maker/pokemon-oc-maker", i18nKey: "footer.more.links.pokemon" },
  {
    to: "/maker/sailor-moon-oc-maker",
    i18nKey: "footer.more.links.sailorMoon",
  },
] as const;

export const loader = async ({ context }: Route.LoaderArgs) => {
  const { locale } = getI18nConetxt(context);
  const t = getTranslate(locale);

  const header: BaseLayoutProps["header"] = {
    navLinks: [
      { to: "/", label: t("header.navigation.home") },
      { to: "/maker", label: t("header.navigation.maker") },
      { to: "/pricing", label: t("header.navigation.pricing") },
      { to: "/my-creations", label: t("header.navigation.myCreations") },
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
