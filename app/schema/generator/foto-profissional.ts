import { z } from "zod";

/**
 * Professional photo generation form validation
 *
 * @property {File} image - User's original photo
 * @property {string[]} effectIds - Selected effects to generate
 * @property {string} aspect - Final image aspect ratio calculated from original
 */
export const fotoProfissionalSchema = z.object({
  effectIds: z.string().array(),
  image: z.file(),
  aspect: z.string(),
});

// Export type
export type FotoProfissionalDTO = z.infer<typeof fotoProfissionalSchema>;
