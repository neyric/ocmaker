import type { GenerateResult } from "~/routes/_api/basic/_ai.generate/route";
import type {
  TaskQueryResult,
  TaskStartResult,
} from "~/routes/_api/basic/_ai.task.$task_no/route";
import type { GenerateDTO } from "~/schema/generator/generate";

export type CreateGenerateTaskResult = Awaited<
  ReturnType<typeof createGenerateTask>
>;
export type CreateI2VTaskResult = CreateGenerateTaskResult;

// Custom error class for insufficient credits
export class InsufficientCreditsError extends Error {
  code = "INSUFFICIENT_CREDITS";
  constructor(message: string) {
    super(message);
    this.name = "InsufficientCreditsError";
  }
}

export async function createGenerateTask(
  payload: GenerateDTO,
): Promise<GenerateResult> {
  const response = await fetch("/api/generate", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response
      .json<{ error: string; code?: string; details?: any }>()
      .catch(() => ({ error: "Request failed" }));

    // Check if it's an insufficient credits error
    if (response.status === 402) {
      throw new InsufficientCreditsError(error.error);
    }

    throw new Error(error.error ?? `Request failed: ${response.statusText}`);
  }

  return response.json();
}

// Backward compatibility
export const createImageToVideoTask = createGenerateTask;

export async function startTask(payload: {
  taskNo: string;
}): Promise<TaskStartResult> {
  const response = await fetch("/api/task/" + payload.taskNo, {
    method: "POST",
  });

  if (!response.ok) {
    const error = await response
      .json<{ error: string; details?: any }>()
      .catch(() => ({ error: "Request failed" }));

    throw new Error(error.error ?? `Request failed: ${response.statusText}`);
  }

  return response.json();
}

export async function queryTask(payload: {
  taskNo: string;
}): Promise<TaskQueryResult> {
  const response = await fetch("/api/task/" + payload.taskNo, {
    method: "GET",
  });

  if (!response.ok) {
    const error = await response
      .json<{ error: string; details?: any }>()
      .catch(() => ({ error: "Request failed" }));

    throw new Error(error.error ?? `Request failed: ${response.statusText}`);
  }

  return response.json();
}
