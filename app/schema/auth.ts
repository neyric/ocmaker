import { z } from "zod";

const googleSchema = z.object({
  type: z.enum(["google"]),
  data: z.object({
    access_token: z.string().optional(),
    credential: z.string().optional(),
  }),
  invite_code: z.string().optional(),
});

const passwordSchema = z.object({
  type: z.enum(["email"]),
  data: z.object({
    email: z.string(),
    password: z.string(),
  }),
});

export const authSchema = z.discriminatedUnion("type", [
  googleSchema,
  passwordSchema,
]);

export type AuthDTO = z.infer<typeof authSchema>;
export type AuthGoogleDTO = Extract<AuthDTO, { type: "google" }>;
export type AuthEmailDTO = Extract<AuthDTO, { type: "email" }>;
