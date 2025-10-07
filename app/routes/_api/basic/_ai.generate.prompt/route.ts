import { data } from "react-router";
import { generatePrompt } from "~/.server/services/gpt";
import {
  type GeneratePromptDTO,
  generatePromptSchema,
} from "~/schema/generator/prompt";
import type { Route } from "./+types/route";

export const action = async ({ request, context }: Route.ActionArgs) => {
  if (request.method.toLowerCase() !== "post") {
    throw new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const raw = await request.json();
    const parsed = generatePromptSchema.safeParse(raw);

    if (!parsed.success) {
      throw new Error("Invalid data");
    }

    const validatedData: GeneratePromptDTO = parsed.data;

    // Call GPT service to generate optimized prompt
    const generateResult = await generatePrompt(validatedData);

    if (!generateResult.success) {
      throw new Error(generateResult.error || "Failed to generate prompt");
    }

    const result = {
      prompt: generateResult.prompt,
      type: validatedData.type,
      original: validatedData.input,
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

export type GeneratePromptResult = Awaited<ReturnType<typeof action>>["data"];
