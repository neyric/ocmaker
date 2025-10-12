import type { GenerateOCProfileResult } from "~/routes/_api/basic/_ai.generate.oc-profile/route";
import type { ProfileGeneratorDTO } from "~/schema/generator";

export async function generateOCProfile(
  payload: ProfileGeneratorDTO,
): Promise<GenerateOCProfileResult> {
  const response = await fetch("/api/generate/oc-profile", {
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

    throw new Error(error.error ?? `Request failed: ${response.statusText}`);
  }

  return response.json();
}
