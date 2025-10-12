import { data } from "react-router";
import { parseMarkdown } from "~/.server/libs/markdown";
import { generateOCProfile } from "~/.server/services/gpt";
import { baseLanguage, getMakerLocale } from "~/i18n";
import { profileSchema } from "~/schema/generator";
import type { Route } from "./+types/route";

export const action = async ({ request, context }: Route.ActionArgs) => {
  if (request.method.toLowerCase() !== "post") {
    throw new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const raw = await request.json();
    const parsed = profileSchema.safeParse(raw);

    if (!parsed.success) {
      throw new Error("Invalid data");
    }

    const { lang, id, prompt } = parsed.data;
    const locale: any = lang ?? baseLanguage;

    const page = await getMakerLocale(locale, id);
    const input = page.backstoryPreset.replace("{PREFERENCES}", prompt);

    // Call GPT service to generate optimized prompt
    const generateResult = await generateOCProfile({
      type: "text",
      input: input,
    });

    if (!generateResult.success) {
      throw new Error(generateResult.error || "Failed to generate prompt");
    }

    const { node } = parseMarkdown(generateResult.prompt!);

    const result = {
      type: id,
      node,
    };

    return data(result);
  } catch (error) {
    if (error instanceof Response) throw error;

    console.error("Error in Prompt Generation API:", error);

    throw Response.json(
      { error: error instanceof Error ? error.message : "Request failed" },
      { status: 500 },
    );
  }
};

export type GenerateOCProfileResult = Awaited<
  ReturnType<typeof action>
>["data"];
