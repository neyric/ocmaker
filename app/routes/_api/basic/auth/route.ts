import { env } from "cloudflare:workers";
import { pick } from "lodash-es";
import type { Subscription } from "~/.server/libs/db";
import { getSessionHandler } from "~/.server/libs/session";
import {
  getUserInfoAndCredits,
  googleOAuthLogin,
} from "~/.server/services/basic";
import type { AuthGoogleDTO } from "~/schema/auth";
import { authSchema } from "~/schema/auth";
import type { Route } from "./+types/route";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const [session, { commitSession }] = await getSessionHandler(request);
  const user = session.get("user");

  const { user_info, credits, subscription } =
    await getUserInfoAndCredits(user);

  return Response.json(
    { profile: user_info, credits, subscription },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    },
  );
};

type UserInfoAndCredits = Awaited<ReturnType<typeof getUserInfoAndCredits>>;
export type AuthResult = {
  profile: UserInfoAndCredits["user_info"];
  credits: number;
  subscription: Subscription | null | undefined;
};

export const action = async ({ request, context }: Route.ActionArgs) => {
  if (request.method.toLowerCase() !== "post") {
    throw new Response("Not Found", { status: 404 });
  }

  const raw = await request.json();
  const json = authSchema.parse(raw);

  if (json.type !== "google") throw Error("Invalid login type");

  const [session, { commitSession }] = await getSessionHandler(request);

  const userInfo = await handleGoogleOAuth(json.data, env.GOOGLE_CLIENT_ID);

  const user = await googleOAuthLogin({
    profile: userInfo,
    request,
    session: session.id,
    invite_code: json.invite_code,
  });
  session.set("user", user);

  const { user_info, credits } = await getUserInfoAndCredits(user);

  return Response.json(
    {
      profile: user_info,
      credits,
    },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    },
  );
};

interface GoogleTokenInfo extends GoogleUserInfo {
  iss: string;
  azp: string;
  aud: string;
  nbf: string;
  iat: string;
  exp: string;
  jti: string;
  alg: string;
  kid: string;
  typ: string;
}

const handleGoogleOAuth = async (
  data: AuthGoogleDTO["data"],
  client_id: string,
) => {
  const { access_token, credential } = data;

  if (!access_token && !credential) {
    throw Error("access_token or credential must be provided");
  }
  let userInfo: GoogleUserInfo | null = null;
  if (access_token) userInfo = await getUserInfo(access_token);
  if (!userInfo && credential) {
    const token = await getTokenInfo(credential);
    if (token.aud !== client_id) {
      throw Error("Invalid client");
    }
    userInfo = pick(token, [
      "sub",
      "name",
      "given_name",
      "picture",
      "email",
      "email_verified",
    ]);
  }

  if (!userInfo) throw Error("Login failed");
  return userInfo;
};

const getTokenInfo = async (token: string) => {
  const res = await fetch(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`,
  );
  if (!res.ok) throw new Error("Invalid ID token");
  const payload = await res.json<GoogleTokenInfo>();

  return payload;
};

const getUserInfo = async (access_token: string) => {
  const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch Google user information");

  const user = await res.json<GoogleUserInfo>();
  return user;
};
