import { data } from "react-router";
import { calculatorCredits } from "~/.server/services/ai-tasks";
import { generateSchema } from "~/schema/generator/generate";
import type { Route } from "./+types/route";

export const action = async ({ request, context }: Route.ActionArgs) => {
  if (request.method.toLowerCase() !== "post") {
    throw new Response("Method Not Allowed", { status: 405 });
  }

  try {
    // Parse request data
    const raw = await request.json().catch(() => null);
    if (raw) {
      const parsed = generateSchema.safeParse(raw);

      if (!parsed.success) throw new Error("Invalid data");

      const validatedData = parsed.data;

      // Calculate credits for AI task
      const credits = await calculatorCredits(validatedData);

      return data({ credits });
    } else {
      const credits = await calculatorCredits({
        model: "replicate/animagine-3.1",
        aspectRatio: "1:1",
        prompt: "",
      });

      return data({ credits });
    }
  } catch (error) {
    if (error instanceof Response) throw error;

    console.error("Error in Credits Calculator API:", error);

    throw Response.json(
      { error: error instanceof Error ? error.message : "Request failed" },
      { status: 500 },
    );
  }
};

export type CalculatorCreditsResult = Awaited<
  ReturnType<typeof action>
>["data"];
