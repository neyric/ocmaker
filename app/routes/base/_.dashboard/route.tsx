import { BookOpen, HelpCircle } from "lucide-react";
import { Fragment, useRef } from "react";
import { useNavigate } from "react-router";
import { getSessionHandler } from "~/.server/libs/session";
import { getI18nConetxt } from "~/.server/middleware/i18n-middleware";
import { getUserInfoAndCredits } from "~/.server/services/basic";
import {
  FAQsSection,
  HelpSupportSection,
  HeroSection,
  UserInfoSection,
} from "~/components/pages/dashboard";
import { getPageLocale, getTranslate, useTranslate } from "~/i18n";
import { createCanonical, createNormalAlternatives } from "~/utils/meta";
import { createSocialTags } from "~/utils/og";
import type { Route } from "./+types/route";
import { dashboardFaqs } from "./content";
import {
  EditProfileDialog,
  type EditProfileDialogRef,
} from "./edit-profile-dialog";

export function meta({ matches, loaderData }: Route.MetaArgs) {
  const canonical = createCanonical("/dashboard", matches[0].data.DOMAIN);
  const alternatives = createNormalAlternatives(
    "/dashboard",
    matches[0].loaderData.DOMAIN
  );
  const og = createSocialTags(
    {
      title: loaderData.meta.title,
      description: loaderData.meta.description,
      url: "/",
      siteName: matches[0].loaderData.SITE_NAME,
    },
    matches[0].loaderData.DOMAIN
  );

  return [
    { title: loaderData.meta.title },
    {
      name: "description",
      content: loaderData.meta.description,
    },
    canonical,
    ...alternatives,
    ...og,
  ];
}

export async function loader({ request, context }: Route.LoaderArgs) {
  const i18n = getI18nConetxt(context);
  const page = await getPageLocale(i18n.lang, "dashboard");
  const t = getTranslate(page);

  const [session] = await getSessionHandler(request);
  const user = session.get("user");

  const result = await getUserInfoAndCredits(user);

  // Redirect to login if not authenticated
  if (!result || !result.user_info) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const meta = {
    title: t("meta.title"),
    description: t("meta.description"),
  };

  return {
    meta,
    page,
    userInfo: result.user_info,
    credits: result.credits,
    subscription: result.subscription,
  };
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  const { userInfo, credits, subscription, page } = loaderData;
  console.log("page", page);
  const ct = useTranslate(page);

  const navigate = useNavigate();

  const editRef = useRef<EditProfileDialogRef>(null);

  const handleEdit = () => {
    editRef.current?.open(userInfo);
  };

  const handleReloadProfile = () => {
    navigate("./", { replace: true });
  };

  const supportOptions = [
    {
      icon: (
        <div className="p-3 rounded-lg bg-orange-500/10">
          <BookOpen className="size-6 text-orange-500" />
        </div>
      ),
      title: ct("contents.help.contents.emailSupport.title"),
      description: ct("contents.help.contents.emailSupport.description"),
      action: ct("contents.help.contents.emailSupport.button"),
      href: "mailto:support@ocmaker.app",
    },
    {
      icon: (
        <div className="p-3 rounded-lg bg-purple-500/10">
          <HelpCircle className="size-6 text-purple-500" />
        </div>
      ),
      title: ct("contents.help.contents.helpCenter.title"),
      description: ct("contents.help.contents.helpCenter.description"),
      action: ct("contents.help.contents.helpCenter.button"),
      href: "#faqs",
    },
  ];

  const faqs = page.contents.faqs.list;

  return (
    <Fragment>
      <HeroSection
        title={ct("contents.hero.title")}
        description={ct("contents.hero.description")}
      />
      <UserInfoSection
        user={userInfo}
        credits={credits}
        subscription={subscription}
        onEditInfo={handleEdit}
      />

      <HelpSupportSection
        title={ct("contents.help.title")}
        description={ct("contents.help.description")}
        supportOptions={supportOptions}
      />

      <FAQsSection
        title={ct("contents.faqs.title")}
        description={ct("contents.faqs.description")}
        faqs={faqs}
      />
      <EditProfileDialog ref={editRef} onSuccess={handleReloadProfile} />
    </Fragment>
  );
}
