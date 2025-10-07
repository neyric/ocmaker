import { env } from "cloudflare:workers";
import { data } from "react-router";
import { getSessionHandler } from "~/.server/libs/session";
import { getUserInvitations } from "~/.server/services/basic";
import type { Route } from "./+types/route";

export const loader = async ({ request, context }: Route.LoaderArgs) => {
  const [session] = await getSessionHandler(request);
  const user = session.get("user");

  if (!user) throw Response.json({}, { status: 401 });

  try {
    const invitations = await getUserInvitations(user.id);

    const inviteLink = new URL(env.DOMAIN);
    inviteLink.searchParams.set("invite_code", user.invite_code ?? "");
    return data({
      invitations,
      inviteLink: inviteLink.toString(),
    });
  } catch (error) {
    console.error("error:", error);
    if (error instanceof Response) throw error;
    throw Response.json({}, { status: 500 });
  }
};

export type InvitesResult = Awaited<ReturnType<typeof loader>>["data"];
