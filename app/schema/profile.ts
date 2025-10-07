import { z } from "zod";

// Update user profile schema
export const updateProfileSchema = z.object({
  avatar: z.instanceof(File).nullish(),
  username: z.string().min(4).max(50),
  nickname: z.string().min(1).max(50),
  bio: z.string().max(500, "Bio cannot exceed 500 characters").trim().nullish(),
});

// Type export
export type UpdateProfileDTO = z.infer<typeof updateProfileSchema>;
