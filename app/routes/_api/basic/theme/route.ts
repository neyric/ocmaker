import { z } from "zod";
import { getSessionHandler } from "~/.server/libs/session";
import type { Route } from "./+types/route";

const themeSchema = z.object({ theme: z.enum(["light", "dark"]) });

export async function action({ request }: Route.ActionArgs) {
  if (request.method !== "POST") {
    throw new Response("Method Not Allowed", { status: 405 });
  }

  const raw = await request.json();
  const parsed = themeSchema.safeParse(raw);

  if (!parsed.success) {
    throw Response.json({ error: "Invalid theme" }, { status: 400 });
  }

  const [session, { commitSession }] = await getSessionHandler(request);
  session.set("theme", parsed.data.theme);

  return Response.json(
    {},
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    },
  );
}
