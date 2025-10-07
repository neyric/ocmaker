import type { CalculatorCreditsResult } from "~/routes/_api/basic/_ai.generate.calcredits/route";
import type { TaskQueryResult } from "~/routes/_api/basic/_ai.task.$task_no/route";
import type { GenerateDTO } from "~/schema/generator/generate";

export async function preCalcTaskCredits(
  payload: Partial<GenerateDTO>,
): Promise<CalculatorCreditsResult> {
  const response = await fetch(`/api/generate/calcredits`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response
      .json<{ error: string }>()
      .catch(() => ({ error: "Request failed" }));

    throw new Error(
      error.error ?? `Request failed: ${response.statusText}`,
    );
  }

  return response.json();
}

export async function getTaskStatus(taskNo: string): Promise<TaskQueryResult> {
  const response = await fetch(`/api/task/${taskNo}`);

  if (!response.ok) {
    const error = await response
      .json<{ error: string }>()
      .catch(() => ({ error: "Request failed" }));

    throw new Error(
      error.error ?? `Request failed: ${response.statusText}`,
    );
  }

  return response.json();
}
