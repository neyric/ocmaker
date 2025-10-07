import * as z from "zod";

export const generatePromptSchema = z.object({
  type: z.enum(["text"]), // 输入的内容类型，依据输入的内容来生成 Prompt
  input: z.string().min(1).max(5000).trim(),
});

export type GeneratePromptDTO = z.infer<typeof generatePromptSchema>;
