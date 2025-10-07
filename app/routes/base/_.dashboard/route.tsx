import { Fragment, useRef } from "react";
import { useNavigate } from "react-router";
import { getSessionHandler } from "~/.server/libs/session";
import { getUserInfoAndCredits } from "~/.server/services/basic";
import {
  FAQsSection,
  HelpSupportSection,
  HeroSection,
  UserInfoSection,
} from "~/components/pages/dashboard";
import { createCanonical } from "~/utils/meta";
import type { Route } from "./+types/route";
import { dashboardFaqs } from "./content";
import {
  EditProfileDialog,
  type EditProfileDialogRef,
} from "./edit-profile-dialog";

export function meta({ matches }: Route.MetaArgs) {
  const canonical = createCanonical("/dashboard", matches[0].data.DOMAIN);

  return [
    { title: "Dashboard - Manage Your Account" },
    {
      name: "description",
      content:
        "Manage your account, subscription, and explore help resources in your personal dashboard.",
    },
    canonical,
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const [session] = await getSessionHandler(request);
  const user = session.get("user");

  const result = await getUserInfoAndCredits(user);

  // Redirect to login if not authenticated
  if (!result || !result.user_info) {
    throw new Response("Unauthorized", { status: 401 });
  }
  return {
    userInfo: result.user_info,
    credits: result.credits,
    subscription: result.subscription,
  };
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  const { userInfo, credits, subscription } = loaderData;
  const navigate = useNavigate();

  const editRef = useRef<EditProfileDialogRef>(null);

  const handleEdit = () => {
    editRef.current?.open(userInfo);
  };

  const handleReloadProfile = () => {
    navigate("./", { replace: true });
  };

  return (
    <Fragment>
      <HeroSection
        title="Dashboard"
        description="Manage your account, track usage, and explore all the features GhostFace AI has to offer."
      />
      <UserInfoSection
        user={userInfo}
        credits={credits}
        subscription={subscription}
        onEditInfo={handleEdit}
      />

      <HelpSupportSection
        title="Help & Support"
        description="Get the assistance you need with our comprehensive resources and support channels."
        supportEmail="support@ghostfaceai.app"
      />

      <FAQsSection
        title="Frequently Asked Questions"
        description="Find answers to common questions about using GhostFace AI. Need more help? Contact us at"
        supportEmail="support@ghostfaceai.app"
        faqs={dashboardFaqs}
      />
      <EditProfileDialog ref={editRef} onSuccess={handleReloadProfile} />
    </Fragment>
  );
}
