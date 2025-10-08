import { z } from "zod";

export const avatarSchema = z.object({
  id: z.string(),
  prompt: z.string(),
  aiOptimize: z.boolean(),
  aspect: z.string().nullish(),
  options: z.record(z.string(), z.string()),
});

export type AvatarGeneratorDTO = z.infer<typeof avatarSchema>;

export const profileSchema = z.object({
  id: z.string(),
  prompt: z.string(),
});

export type ProfileGeneratorDTO = z.infer<typeof profileSchema>;