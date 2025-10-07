import { data } from "react-router";
import { getSessionHandler } from "~/.server/libs/session";
import { CheckinService } from "~/.server/services/basic";
import type { Route } from "./+types/checkin";

/**
 * GET /api/checkin - Get user check-in status
 */
export async function loader({ request, context }: Route.LoaderArgs) {
  const [session] = await getSessionHandler(request);
  const user = session.get("user");

  if (!user) {
    throw Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const checkinService = new CheckinService();

  try {
    const result = await checkinService.getCheckinStats(user.id);
    return data(result);
  } catch (error) {
    console.error("Failed to get check-in status:", error);
    throw Response.json(
      { error: "Failed to get check-in status" },
      { status: 500 },
    );
  }
}

export type CheckinStats = Awaited<ReturnType<typeof loader>>["data"];

/**
 * POST /api/checkin - Perform check-in
 */
export async function action({ request, context }: Route.ActionArgs) {
  const [session] = await getSessionHandler(request);
  const user = session.get("user");

  if (!user) {
    throw Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (request.method !== "POST") {
    throw Response.json({ error: "Method Not Allowed" }, { status: 405 });
  }

  const checkinService = new CheckinService();

  try {
    const result = await checkinService.checkIn(user.id);

    return data(result);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Check-in failed";

    // Check if error is "already checked in today"
    const statusCode = errorMessage === "Already checked in today" ? 400 : 500;

    throw Response.json({ error: errorMessage }, { status: statusCode });
  }
}
export type CheckinResult = Awaited<ReturnType<typeof action>>["data"];
