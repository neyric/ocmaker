import type { FotoProfissionalActionData } from "~/routes/_api/basic/_ai.generate.foto-profissional/route";
import type { FotoProfissionalDTO } from "~/schema/generator/foto-profissional";

/**
 * Submit foto profissional generation request
 *
 * @param formData - FormData containing image file, effectIds, and aspect ratio
 * @returns Promise with the API response
 */
export async function submitFotoProfissional({
  image,
  ...rest
}: FotoProfissionalDTO): Promise<FotoProfissionalActionData> {
  const form = new FormData();
  form.set("file", image);
  form.set("rest", JSON.stringify(rest));

  const response = await fetch("/api/generate/foto-profissional", {
    method: "POST",
    body: form,
  });

  if (!response.ok) {
    const result = await response
      .json<{ error: string }>()
      .catch(() => ({ error: "Failed to generation." }));

    throw new Error(result.error || "Failed Request");
  }

  return response.json();
}
