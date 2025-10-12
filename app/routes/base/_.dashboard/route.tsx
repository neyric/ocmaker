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
  type UserInfoSectionCopy,
} from "~/components/pages/dashboard";
import { getPageLocale, getTranslate, useTranslate } from "~/i18n";
import { createCanonical, createNormalAlternatives } from "~/utils/meta";
import { createSocialTags } from "~/utils/og";
import type { Route } from "./+types/route";
import {
  EditProfileDialog,
  type EditProfileDialogRef,
} from "./edit-profile-dialog";

export function meta({ matches, params, loaderData }: Route.MetaArgs) {
  const url = "/dashboard";
  const canonicalUrl = params.lang ? `/${params.lang}${url}` : url;

  const canonical = createCanonical(canonicalUrl, matches[0].loaderData.DOMAIN);
  const alternatives = createNormalAlternatives(
    url,
    matches[0].loaderData.DOMAIN,
  );
  const og = createSocialTags(
    {
      title: loaderData.meta.title,
      description: loaderData.meta.description,
      url: url,
      siteName: matches[0].loaderData.SITE_NAME,
    },
    matches[0].loaderData.DOMAIN,
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

export default function Dashboard({
  matches,
  loaderData,
}: Route.ComponentProps) {
  const pricing = matches[0].loaderData.pricing;

  const { userInfo, credits, subscription, page } = loaderData;
  const ct = useTranslate(page);

  const navigate = useNavigate();

  const editRef = useRef<EditProfileDialogRef>(null);

  const handleEdit = () => {
    editRef.current?.open(userInfo);
  };

  const handleReloadProfile = () => {
    navigate("./", { replace: true });
  };

  const activeSubscription = subscription
    ? pricing.subscription.find((item) => item.id === subscription.plan_type)
    : null;

  const subscriptionBenefits = activeSubscription?.benefits ?? [];

  const userInfoCopy: UserInfoSectionCopy = {
    info: {
      title: ct("contents.userInfo.title"),
      editProfile: ct("contents.userInfo.editProfile"),
      avatarAlt: ct("contents.userInfo.avatarAlt"),
      defaultName: ct("contents.userInfo.defaultName"),
      memberSinceDescription: ct("contents.userInfo.memberSinceDesc"),
      emailLabel: ct("contents.userInfo.email"),
      memberSinceLabel: ct("contents.userInfo.memberSince"),
    },
    usage: {
      title: ct("contents.userInfo.usage.title"),
      creditsRemaining: ct("contents.userInfo.usage.remaining"),
      imageCreated: ct("contents.userInfo.usage.created"),
    },
    subscription: {
      title: ct("contents.subscription.title"),
      cancel: ct("contents.subscription.cancel"),
      refund: ct("contents.subscription.refund"),
      manage: ct("contents.subscription.manage"),
      upgrade: ct("contents.subscription.upgrade"),
      currentPlanLabel: ct("contents.subscription.current"),
      defaultPlanName: activeSubscription
        ? activeSubscription.title
        : ct("contents.subscription.defaultPlan"),
      statusLabel: ct("contents.subscription.statusLabel"),
      statuses: {
        noActive: ct("contents.subscription.status.none"),
        cancelledActive: ct("contents.subscription.status.cancelledActive"),
        active: ct("contents.subscription.status.active"),
        cancelled: ct("contents.subscription.status.cancelled"),
        expired: ct("contents.subscription.status.expired"),
        unknown: ct("contents.subscription.status.unknown"),
      },
      expirationLabels: {
        activeUntil: ct("contents.subscription.expiration.activeUntil"),
        expiresOn: ct("contents.subscription.expiration.expiresOn"),
      },
      benefitsTitle:
        activeSubscription?.title ?? ct("contents.subscription.benefitsTitle"),
      benefits: subscriptionBenefits,
      upgradeTitle: ct("contents.subscription.upgradeTitle"),
      upgradeDescription: ct("contents.subscription.upgradeDescription"),
      viewPlans: ct("contents.subscription.viewPlans"),
    },
    general: {
      notAvailable: ct("contents.general.notAvailable"),
    },
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

  const handleCancelSubs = () => {
    console.log("cancel");
  };

  return (
    <Fragment>
      <HeroSection
        title={ct("contents.hero.title")}
        description={ct("contents.hero.description")}
      />
      <UserInfoSection
        user={userInfo}
        credits={credits}
        createdCount={0}
        subscription={subscription}
        onEditInfo={handleEdit}
        onSubscriptionCancel={handleCancelSubs}
        copy={userInfoCopy}
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
