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

export const loader = async ({ context }: Route.LoaderArgs) => {
  const { locale } = getI18nConetxt(context);
  const t = getTranslate(locale);

  const header: BaseLayoutProps["header"] = {
    navLinks: [
      { to: "/", label: t("header.navigation.home") },
      // { to: "/oc-arts", label: t("header.navigation.community") },
      { to: "/pricing", label: t("header.navigation.pricing") },
      { to: "/my-creations", label: t("header.navigation.myCreations") },
    ],
  };

  const footer: BaseLayoutProps["footer"] = {
    navLinks: [
      {
        label: t("footer.popular.title"),
        list: [
          { to: "/", label: "OC Maker" },
          // Classic Popular
          { to: "/maker/aot-oc-maker", label: "AOT OC Maker" },
          {
            to: "/maker/jujutsu-kaisen-oc-maker",
            label: "Jujutsu Kaisen OC Maker",
          },
          { to: "/maker/one-piece-oc-maker", label: "One Piece OC Maker" },
          { to: "/maker/naruto-oc-maker", label: "Naruto OC Maker" },
          {
            to: "/maker/spy-x-family-oc-maker",
            label: "Spy x Family OC Maker",
          },
          { to: "/maker/dragon-ball-oc-maker", label: "Dragon Ball OC Maker" },
          {
            to: "/maker/demon-slayer-oc-maker",
            label: "Demon Slayer OC Maker",
          },
          {
            to: "/maker/my-hero-academia-oc-maker",
            label: "My Hero Academia OC Maker",
          },
          {
            to: "/maker/detective-conan-oc-maker",
            label: "Detective Conan OC Maker",
          },
          // Game Related
          {
            to: "/maker/genshin-impact-oc-maker",
            label: "Genshin Impact OC Maker",
          },
          {
            to: "/maker/league-of-legends-oc-maker",
            label: "League of Legends OC Maker",
          },
          { to: "/maker/sonic-oc-maker", label: "Sonic OC Maker" },
          // Western Animation
          { to: "/maker/marvel-oc-maker", label: "Marvel OC Maker" },
          { to: "/maker/disney-oc-maker", label: "Disney OC Maker" },
          {
            to: "/maker/my-little-pony-oc-maker",
            label: "My Little Pony OC Maker",
          },
        ],
      },
      {
        label: t("footer.more.title"),
        list: [
          { to: "/maker/arknights-oc-maker", label: "Arknights OC Maker" },
          { to: "/maker/bleach-oc-maker", label: "Bleach OC Maker" },
          { to: "/maker/jojo-oc-maker", label: "JoJo OC Maker" },
          {
            to: "/maker/hunter-x-hunter-oc-maker",
            label: "Hunter X Hunter OC Maker",
          },
          { to: "/maker/uma-musume-oc-maker", label: "Uma Musume OC Maker" },
          // 2024 Popular New Series
          { to: "/maker/frieren-oc-maker", label: "Frieren OC Maker" },
          {
            to: "/maker/apothecary-diaries-oc-maker",
            label: "Apothecary Diaries OC Maker",
          },
          { to: "/maker/oshi-no-ko-oc-maker", label: "Oshi no Ko OC Maker" },
          { to: "/maker/blue-lock-oc-maker", label: "Blue Lock OC Maker" },
          {
            to: "/maker/chainsaw-man-oc-maker",
            label: "Chainsaw Man OC Maker",
          },
          {
            to: "/maker/hells-paradise-oc-maker",
            label: "Hell's Paradise OC Maker",
          },
          {
            to: "/maker/black-butler-oc-maker",
            label: "Black Butler OC Maker",
          },
          {
            to: "/maker/blue-archive-oc-maker",
            label: "Blue Archive OC Maker",
          },
          {
            to: "/maker/bungo-stray-dogs-oc-maker",
            label: "Bungo Stray Dogs OC Maker",
          },
          { to: "/maker/haikyuu-oc-maker", label: "Haikyuu OC Maker" },
          {
            to: "/maker/honkai-star-rail-oc-maker",
            label: "Honkai Star Rail OC Maker",
          },
          { to: "/maker/kaguya-sama-oc-maker", label: "Kaguya Sama OC Maker" },
          { to: "/maker/pokemon-oc-maker", label: "Pokemon OC Maker" },
          { to: "/maker/sailor-moon-oc-maker", label: "Sailor Moon OC Maker" },
        ],
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
