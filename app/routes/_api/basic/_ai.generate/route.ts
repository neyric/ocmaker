import { data } from "react-router";
import { getSessionHandler } from "~/.server/libs/session";
import { createTask } from "~/.server/services/ai-tasks";
import { TaskError } from "~/.server/services/ai-tasks/core/errors";
import { generateSchema } from "~/schema/generator/generate";
import type { Route } from "./+types/route";

export const action = async ({ request, context }: Route.ActionArgs) => {
  if (request.method.toLowerCase() !== "post") {
    throw new Response("Method Not Allowed", { status: 405 });
  }

  const [session] = await getSessionHandler(request);
  const user = session.get("user");

  try {
    // Parse request data
    const raw = await request.json();
    const parsed = generateSchema.safeParse(raw);

    if (!parsed.success) throw new Error("Invalid Data");

    const validatedData = parsed.data;

    // Create and start AI task
    const taskResult = await createTask(validatedData, user?.id);

    return data(taskResult);
  } catch (error) {
    if (error instanceof Response) throw error;

    console.error("Error in Generate API:", error);

    // Handle TaskError
    if (error instanceof TaskError) {
      throw Response.json(error.toJSON(), { status: error.statusCode });
    }

    throw Response.json(
      { error: error instanceof Error ? error.message : "Request Failed" },
      { status: 500 },
    );
  }
};

export type GenerateResult = Awaited<ReturnType<typeof action>>["data"];
