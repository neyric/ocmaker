import { Outlet } from "react-router";
import { useUserProfile } from "~/contexts/user-profile";
import { BaseLayout, type BaseLayoutProps } from "~/features/layout";
import type { Route } from "./+types/route";
import { CheckinDialog } from "./checkin-dialog";
import { InviteDialog } from "./invite-dialog";
import { LoginDialog } from "./login-dialog";
import { TaskBoxDialog } from "./taskbox-dialog";
import { UpgradeDialog } from "./upgrade-dialog";
import { getI18nConetxt } from "~/.server/middleware/i18n-middleware";
import { getTranslate } from "~/i18n";

export const loader = async ({ context }: Route.LoaderArgs) => {
  const { locale } = getI18nConetxt(context);
  const t = getTranslate(locale);
  
  const header: BaseLayoutProps["header"] = {
    navLinks: [
      { to: "/", label: t("header.navigation.home") },
      { to: "/pricing", label: t("header.navigation.pricing") },
    ],
  };

  const footer: BaseLayoutProps["footer"] = {
    navLinks: [
      {
        label: t("footer.tools.title"),
        list: [{ to: "/", label: t("footer.tools.ghostface") }],
      },
      {
        label: t("footer.contact.title"),
        list: [
          {
            to: "mailto:support@ghostfaceai.app",
            label: "support@ghostfaceai.app",
            target: "_blank",
          },
        ],
      },
      {
        label: t("footer.legal.title"),
        list: [
          { to: "/legal/terms", label: t("footer.legal.terms"), target: "_blank" },
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
        ],
      },
    ],
    friendlyLinks: [
      { to: "https://ghiblistyleai.app", label: "Ghibli Style AI" },
      { to: "https://ocmaker.app", label: "OC Maker" },
      { to: "https://fotoprofissional.app", label: "Foto Profissional" },
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
      <TaskBoxDialog />
    </>
  );
}
