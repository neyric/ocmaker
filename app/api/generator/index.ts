import { type AiTask } from "~/drizzle/schema";
import type { CalculatorCreditsResult } from "~/routes/_api/basic/_ai.generate.calcredits/route";
import type { GenerateDTO } from "~/schema/generator/generate";

export * from "./generate";
export * from "./prompt";
export * from "./task";

export type Task = AiTask;

export const calculatorCredits = async (
  payload?: GenerateDTO
): Promise<CalculatorCreditsResult> => {
  const response = await fetch("/api/generate/calcredits", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload ? JSON.stringify(payload) : undefined,
  });

  if (!response.ok) {
    const error = await response
      .json<{ error: string }>()
      .catch(() => ({ error: "Request failed" }));

    throw new Error(error.error ?? `Request failed: ${response.statusText}`);
  }

  return response.json();
};
