import { env } from "cloudflare:workers";
import { createWorkersKVSessionStorage } from "@react-router/cloudflare";
import { createCookie } from "react-router";

import type { User } from "~/.server/libs/db";

type SessionData = {
  user: User;
  theme?: "light" | "dark";
};

export function cookieWrapper() {
  return createCookie("__session", {
    secrets: [env.SESSION_SECRET],
    path: "/",
    sameSite: "strict",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
  });
}

export function sessionWrapper() {
  const sessionCookie = cookieWrapper();
  const sessionStorage = createWorkersKVSessionStorage<SessionData>({
    kv: env.KV,
    cookie: sessionCookie,
  });

  return sessionStorage;
}

export const getSessionHandler = async (request: Request) => {
  const action = sessionWrapper();
  const session = await action.getSession(request.headers.get("Cookie"));

  return [session, action] as const;
};

export const checkHasSession = async (request: Request) => {
  const sessionCookie = cookieWrapper();
  const cookie = request.headers.get("Cookie");
  const parsed = await sessionCookie.parse(cookie);

  return !!parsed;
};
