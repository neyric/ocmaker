import { data } from "react-router";
import { startTask, updateTask } from "~/.server/services/ai-tasks";
import type { Route } from "./+types/route";

export const loader = async ({ params }: Route.LoaderArgs) => {
  const taskNo = params.task_no;
  try {
    const result = await updateTask(taskNo);

    return data(result);
  } catch (error) {
    if (error instanceof Response) throw error;

    console.error("Error in Task Query API:", error);

    throw Response.json(
      { error: error instanceof Error ? error.message : "Request failed" },
      { status: 500 },
    );
  }
};
export type TaskQueryResult = Awaited<ReturnType<typeof loader>>["data"];

export const action = async ({ params }: Route.ActionArgs) => {
  const taskNo = params.task_no;
  try {
    const result = await startTask(taskNo);

    return data(result);
  } catch (error) {
    if (error instanceof Response) throw error;

    console.error("Error in Task Start API:", error);

    throw Response.json(
      { error: error instanceof Error ? error.message : "Request failed" },
      { status: 500 },
    );
  }
};
export type TaskStartResult = Awaited<ReturnType<typeof action>>["data"];
