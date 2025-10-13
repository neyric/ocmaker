import { env } from "cloudflare:workers";
import { useEffect } from "react";
import {
  data,
  Outlet,
  useLoaderData,
  useRouteLoaderData,
  useSearchParams,
} from "react-router";
import type { Pricing } from "~/.server/constants/pricing";
import { PRODUCT_ITEMS } from "~/.server/constants/product";
import { getUserInfoAndCredits } from "~/.server/services/basic";
import stylesUrl from "~/app.css?url";
import { ErrorPage } from "~/components/pages/error-page";
import { Document } from "~/features/document";
import { getTranslate } from "~/i18n";
import { createOrganizationSchema } from "~/utils/structured-data";
import {
  getI18nConetxt,
  i18nMiddleware,
} from "./.server/middleware/i18n-middleware";
import {
  getSessionContext,
  sessionMiddleware,
} from "./.server/middleware/session-middleware";
import type { Route } from "./+types/root";

export const middleware = [sessionMiddleware, i18nMiddleware];

export const links: Route.LinksFunction = () => [
  {
    rel: "preload",
    href: stylesUrl,
    as: "style",
  },
  { rel: "stylesheet", href: stylesUrl },
];

export const loader = async ({ request, context }: Route.LoaderArgs) => {
  const i18n = getI18nConetxt(context);
  const t = getTranslate(i18n.locale);

  const authContext = getSessionContext(context);
  const theme = authContext?.theme ?? "light";
  const user = authContext?.user ?? null;

  const detail = await getUserInfoAndCredits(user);
  const { user_info, credits, subscription } = detail;

  const pricing: Record<"subscription" | "credits", Pricing[]> = {
    subscription: [
      {
        id: "starter",
        productId: PRODUCT_ITEMS.STARTER_PLAN_MONTHLY.product_id,
        annuallyProductId: PRODUCT_ITEMS.STARTER_PLAN_ANNUAL.product_id,
        title: t("pricing.starter.title"),
        description: t("pricing.starter.description"),
        price: PRODUCT_ITEMS.STARTER_PLAN_MONTHLY.price,
        annually: PRODUCT_ITEMS.STARTER_PLAN_ANNUAL.price,
        credits: PRODUCT_ITEMS.STARTER_PLAN_MONTHLY.credits,
        type: "subscription",
        benefits: i18n.locale.pricing.starter.details,
      },
      {
        popular: true,
        id: "plus",
        productId: PRODUCT_ITEMS.PLUS_PLAN_MONTHLY.product_id,
        annuallyProductId: PRODUCT_ITEMS.PLUS_PLAN_ANNUAL.product_id,
        title: t("pricing.plus.title"),
        description: t("pricing.plus.description"),
        price: PRODUCT_ITEMS.PLUS_PLAN_MONTHLY.price,
        annually: PRODUCT_ITEMS.PLUS_PLAN_ANNUAL.price,
        credits: PRODUCT_ITEMS.PLUS_PLAN_MONTHLY.credits,
        type: "subscription",
        benefits: i18n.locale.pricing.plus.details,
      },
      {
        id: "premium",
        productId: PRODUCT_ITEMS.PREMIUM_PLAN_MONTHLY.product_id,
        annuallyProductId: PRODUCT_ITEMS.PREMIUM_PLAN_ANNUAL.product_id,
        title: t("pricing.premium.title"),
        description: t("pricing.premium.description"),
        price: PRODUCT_ITEMS.PREMIUM_PLAN_MONTHLY.price,
        annually: PRODUCT_ITEMS.PREMIUM_PLAN_ANNUAL.price,
        credits: PRODUCT_ITEMS.PREMIUM_PLAN_MONTHLY.credits,
        type: "subscription",
        benefits: i18n.locale.pricing.premium.details,
      },
    ],
    credits: [
      {
        id: "small_credits",
        productId: PRODUCT_ITEMS.SMALL_CREDITS_BUNDLE.product_id,
        title: t("pricing.smallCredit.title"),
        description: t("pricing.smallCredit.description"),
        type: "credits",
        price: PRODUCT_ITEMS.SMALL_CREDITS_BUNDLE.price,
        credits: PRODUCT_ITEMS.SMALL_CREDITS_BUNDLE.credits,
        benefits: i18n.locale.pricing.smallCredit.details,
      },
      {
        id: "large_credits",
        productId: PRODUCT_ITEMS.LARGE_CREDITS_BUNDLE.product_id,
        title: t("pricing.largeCredit.title"),
        description: t("pricing.largeCredit.description"),
        type: "credits",
        price: PRODUCT_ITEMS.LARGE_CREDITS_BUNDLE.price,
        credits: PRODUCT_ITEMS.LARGE_CREDITS_BUNDLE.credits,
        benefits: i18n.locale.pricing.largeCredit.details,
      },
    ],
  };

  return data({
    i18n,
    pricing,
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
