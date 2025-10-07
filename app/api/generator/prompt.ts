import type { GeneratePromptResult } from "~/routes/_api/basic/_ai.generate.prompt/route";
import type { GeneratePromptDTO } from "~/schema/generator/prompt";

export async function generatePrompt(
  payload: GeneratePromptDTO,
): Promise<GeneratePromptResult> {
  const response = await fetch("/api/generate/prompt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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
