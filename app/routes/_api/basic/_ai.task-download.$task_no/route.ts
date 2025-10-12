import { getFile } from "~/.server/libs/cloudflare/r2-bucket";
import { queryTask } from "~/.server/services/ai-tasks";
import type { Route } from "./+types/route";

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { task_no } = params;
  const task = await queryTask(task_no);

  if (!task || task.status !== "succeeded" || !task.result_url) {
    return new Response("Task not found", { status: 404 });
  }

  // Extract key from result_url
  const url = new URL(task.result_url);
  const key = url.pathname.substring(1); // Remove leading slash

  // Get file from R2
  const file = await getFile(key);

  if (!file) {
    return new Response("File not found", { status: 404 });
  }

  // Set appropriate headers for download
  const headers = new Headers();
  headers.set("Content-Type", file.type || "application/octet-stream");
  headers.set(
    "Content-Disposition",
    `attachment; filename="ocmaker-${task_no}.png"`,
  );
  headers.set("Cache-Control", "public, max-age=3600");

  return new Response(file, {
    status: 200,
    headers,
  });
};
