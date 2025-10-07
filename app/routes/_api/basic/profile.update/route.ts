import { data } from "react-router";
import { getSessionHandler } from "~/.server/libs/session";
import { convertUserInfo, updateUserInfo } from "~/.server/services/basic";
import { updateProfileSchema } from "~/schema/profile";
import type { Route } from "./+types/route";

export const action = async ({ request }: Route.ActionArgs) => {
  const [session, { commitSession }] = await getSessionHandler(request);
  const user = session.get("user");

  if (!user) {
    throw Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const raw = Object.fromEntries(formData.entries());
  const json = updateProfileSchema.safeParse(raw);

  if (!json.success) {
    throw Response.json({}, { status: 400 });
  }

  try {
    const newUser = await updateUserInfo(json.data, user.id);
    session.set("user", newUser);
    await commitSession(session);

    return data(convertUserInfo(newUser, false));
  } catch (error) {
    console.error("Error updating profile:", error);
    throw Response.json(
      { error: "Failed to update profile" },
      { status: 500 },
    );
  }
};
