import { data } from "react-router";
import { getSessionContext } from "~/.server/middleware/session-middleware";
import { createTask } from "~/.server/services/ai-tasks";
import { convertOCPrompt } from "~/.server/services/gpt";
import { baseLanguage, getMakerLocale } from "~/i18n";
import { avatarSchema } from "~/schema/generator";
import type { Route } from "./+types/route";

export const action = async ({ request, context }: Route.ActionArgs) => {
  if (request.method.toLowerCase() !== "post") {
    throw new Response("Method Not Allowed", { status: 405 });
  }
  const sessionContext = getSessionContext(context);
  try {
    const raw = await request.json();
    const parsed = avatarSchema.safeParse(raw);

    if (!sessionContext?.user) {
      throw new Response(null, { status: 401 });
    }
    if (!parsed.success) {
      throw new Error("Invalid data");
    }

    const { lang, id, prompt, aiOptimize } = parsed.data;
    const locale: any = lang ?? baseLanguage;

    const result = {
      type: id,
      prompt: "",
    };

    if (aiOptimize) {
      const page = await getMakerLocale(locale, id);
      const input = [`Series: ${page.series}`, prompt].join("\n");

      // Call GPT service to generate optimized prompt
      const generateResult = await convertOCPrompt(input);

      if (!generateResult.success) {
        throw new Error(generateResult.error || "Failed to generate prompt");
      }

      const newPrompt = [
        generateResult.prompt!,
        "anime style, masterpiece, sensitive, very aesthetic, absurdres",
      ].join(", ");

      result.prompt = newPrompt;
    } else {
      result.prompt = prompt;
    }

    const task = await createTask(
      {
        model: "replicate/animagine-3.1",
        aspectRatio: "3:4",
        prompt: result.prompt,
        ext: parsed.data,
      },
      sessionContext.user.id,
    );

    return data(task);
  } catch (error) {
    if (error instanceof Response) throw error;

    console.error("Error in Prompt Generation API:", error);

    throw Response.json(
      { error: error instanceof Error ? error.message : "Request failed" },
      { status: 500 },
    );
  }
};

export type GenerateOCImageResult = Awaited<ReturnType<typeof action>>["data"];
