import { createContext, type RouterContextProvider } from "react-router";
import { checkHasSession, getSessionHandler } from "~/.server/libs/session";
import type { Route } from "../../+types/root";

const createSessionData = async (request: Request) => {
  const sessionHandler = await getSessionHandler(request);
  const [session] = sessionHandler;

  let userProfile: UserInfo | null = null;

  const theme = session.get("theme") ?? "light";
  const user = session.get("user");

  if (user) {
    // Transform the user data to UserInfo format
    userProfile = {
      email: user.email,
      user_name: user.username,
      name: user.nickname,
      bio: user.bio,
      avatar: user.avatar_url,
      invite_code: user.invite_code,
      created_at: new Date(user.created_at).valueOf(),
    };
  }

  const authData = {
    sessionHandler: sessionHandler,
    theme,
    user,
    userProfile,
  };

  return authData;
};

// Auth context data interface
type SessionContext = Awaited<ReturnType<typeof createSessionData>>;

// Create the auth context
export const sessionContext = createContext<SessionContext | null>();

// Auth middleware function
export const sessionMiddleware: Route.MiddlewareFunction = async ({
  request,
  context,
}) => {
  if (await checkHasSession(request)) {
    const data = await createSessionData(request);

    context.set(sessionContext, data);
  } else {
    context.set(sessionContext, null);
  }
};

// Helper function to get auth context
export const getSessionContext = (context: Readonly<RouterContextProvider>) => {
  const auth = context.get(sessionContext);

  if (!auth) return null;
  return auth;
};

export const createSessionContext = async (
  request: Request,
  context: Readonly<RouterContextProvider>,
) => {
  const auth = context.get(sessionContext);
  if (auth) return auth;

  const data = await createSessionData(request);

  context.set(sessionContext, data);

  return data;
};
