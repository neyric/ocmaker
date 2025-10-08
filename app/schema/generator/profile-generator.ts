import { z } from "zod";

export const profileGeneratorSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(10, "Please provide at least 10 characters about the persona.")
    .max(1500, "Keep the description under 1,500 characters."),
});

export type ProfileGeneratorFormValues = z.infer<typeof profileGeneratorSchema>;
