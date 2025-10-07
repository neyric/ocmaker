import type { GeneratePromptDTO } from "~/schema/generator/prompt";
import { getOpenAIModel } from "../../aisdk/openai";
import generatePromptTemplate from "./prompts/generate-prompt.md?raw";

export interface GeneratePromptResult {
  success: boolean;
  prompt?: string;
  error?: string;
}

export async function generatePrompt(
  params: GeneratePromptDTO,
): Promise<GeneratePromptResult> {
  try {
    const openai = getOpenAIModel();

    // 调用 OpenAI API 生成文本
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: generatePromptTemplate,
        },
        {
          role: "user",
          content: params.input,
        },
      ],
      temperature: 0.7,
      max_tokens: 100,
    });

    const generatedPrompt = completion.choices[0]?.message?.content;

    if (!generatedPrompt) {
      return {
        success: false,
        error: "Failed to generate prompt: No content returned",
      };
    }

    return {
      success: true,
      prompt: generatedPrompt.trim(),
    };
  } catch (error) {
    console.error("Error generating prompt:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
