import { env } from "cloudflare:workers";
import { useEffect } from "react";
import {
  data,
  Outlet,
  useLoaderData,
  useRouteLoaderData,
  useSearchParams,
} from "react-router";

import { getUserInfoAndCredits } from "~/.server/services/basic";
import stylesUrl from "~/app.css?url";
import { ErrorPage } from "~/components/pages/error-page";
import { Document } from "~/features/document";
import { createOrganizationSchema } from "~/utils/structured-data";
import type { Route } from "./+types/root";

import "@fontsource-variable/josefin-sans";
import "@fontsource-variable/inter";
import "ldrs/react/Ring2.css";

import {
  getI18nConetxt,
  i18nMiddleware,
} from "./.server/middleware/i18n-middleware";
import {
  getSessionContext,
  sessionMiddleware,
} from "./.server/middleware/session-middleware";

export const middleware = [sessionMiddleware, i18nMiddleware];

export const links: Route.LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl },
];

export const loader = async ({ request, context }: Route.LoaderArgs) => {
  const i18n = getI18nConetxt(context);

  const authContext = getSessionContext(context);
  const theme = authContext?.theme ?? "light";
  const user = authContext?.user ?? null;

  const detail = await getUserInfoAndCredits(user);
  const { user_info, credits, subscription } = detail;

  return data({
    i18n,
    user: {
      profile: user_info,
      credits,
      subscription,
    },
    theme,
    DOMAIN: env.DOMAIN,
    CDN_URL: env.CDN_URL,
    SITE_NAME: env.SITE_NAME,
    SITE_LOGO: new URL("/assets/logo.webp", env.DOMAIN).toString(),
    GOOGLE_ANALYTICS_ID: env.GOOGLE_ANALYTICS_ID,
    GOOGLE_ADS_ID: env.GOOGLE_ADS_ID,
    GOOGLE_CLIENT_ID: env.GOOGLE_CLIENT_ID,
    CLARITY_ID: env.CLARITY_ID,
    INITLIZE_CREDITS: env.INITLIZE_CREDITS,
    CHECKIN_MIN_CREDITS: env.CHECKIN_MIN_CREDITS,
    CHECKIN_MAX_CREDITS: env.CHECKIN_MAX_CREDITS,
    CHECKIN_STREAK_BONUS: env.CHECKIN_STREAK_BONUS,
    INVITE_REWARD_CREDITS: env.INVITE_REWARD_CREDITS,
  });
};

export const useRootLoader = () => {
  return useRouteLoaderData<typeof loader>("root");
};

export const Layout = ({ children }: React.PropsWithChildren) => {
  const data = useLoaderData<typeof loader>();

  let structure: Record<string, unknown> | undefined = undefined;
  if (data) {
    structure = createOrganizationSchema({
      url: data.DOMAIN,
      name: data.SITE_NAME,
      logo: data.SITE_LOGO,
      email: "support@ocmaker.app",
      sameAs: [
        "https://github.com/neyric",
        "https://linktr.ee/neyric",
        "https://x.com/zissy_w",
        "https://about.me/neyric/",
        "https://gravatar.com/neyricw",
        "https://www.deviantart.com/fine54",
        "https://www.f6s.com/neyric/software",
        "https://devhunt.org/@zissy_W",
      ],
    });
  }

  return (
    <Document
      lang={data.i18n.langCode}
      theme={data?.theme}
      structure={structure}
      DOMAIN={data?.DOMAIN}
      GOOGLE_ADS_ID={data?.GOOGLE_ADS_ID}
      GOOGLE_ANALYTICS_ID={data?.GOOGLE_ANALYTICS_ID}
      CLARITY_ID={data?.CLARITY_ID}
    >
      {children}
    </Document>
  );
};
export default function App(_: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Handle invite code
  useEffect(() => {
    const inviteCode = searchParams.get("invite_code");
    if (inviteCode) {
      localStorage.setItem("invite_code", inviteCode);
      searchParams.delete("invite_code");
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  return <ErrorPage error={error} />;
}
