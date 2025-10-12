import type { GenerateOCImageResult } from "~/routes/_api/basic/_ai.generate.oc-image/route";
import type { AvatarGeneratorDTO } from "~/schema/generator";

export async function generateOCImage(
  payload: AvatarGeneratorDTO,
): Promise<GenerateOCImageResult> {
  const response = await fetch("/api/generate/oc-image", {
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
