import { z } from "zod";

/**
 * Base schema for all image-to-video models.
 *
 * @property {File} image - The input image file to be used for video generation.
 * @property {string} prompt - The prompt or description to guide the video generation.
 * @property {number} duration - The duration of the generated video in seconds.
 */
const baseSchema = z.object({
  image: z.string().nullish(),
  prompt: z.string(),
  naturalAspect: z.string().nullish(),
});

// SeeDance V1 Pro/Lite specific schema
const seedanceI2VSchema = baseSchema.extend({
  model: z.enum(["seedance/v1pro-i2v", "seedance/v1lite-i2v"]),
  duration: z.number().min(3).max(12),
  aspectRatio: z.enum(["16:9", "4:3", "1:1", "3:4", "9:16"]),
  resolution: z.enum(["480p", "720p", "1080p"]),
  cameraFixed: z.boolean().optional().default(false),
  enableSafetyChecker: z.boolean().optional().default(true),
  endImage: z.string().nullish(),
  seeds: z.string().or(z.number()).optional(),
});

// Google Veo3 specific schema
const veo3I2VSchema = baseSchema.extend({
  model: z.enum(["google/veo3", "google/veo3-fast"]),
  duration: z.number(),
  aspectRatio: z.enum(["16:9", "9:16"]),
  resolution: z.enum(["480p", "720p", "1080p"]),
  seeds: z.string().or(z.number()),
});

// Runway Gen-3 specific schema
const runwayI2VSchema = baseSchema.extend({
  model: z.enum(["runway/gen3-i2v", "runway/gen3-turbo-i2v"]),
  duration: z.number(),
  aspectRatio: z.enum(["16:9", "9:16", "1:1", "4:3", "3:4"]),
  resolution: z.enum(["720p", "1080p"]),
});

// Nano Banana I2I specific schema
const nanoBananaI2ISchema = baseSchema.extend({
  model: z.enum(["google/nano-banana-i2i"]),
  aspectRatio: z.enum(["16:9", "9:16", "2:3", "3:2", "1:1", "4:3", "3:4"]),
});

const animagineSchema = baseSchema.extend({
  model: z.enum(["replicate/animagine-3.1", "replicate/animagine-4.0"]),
  aspectRatio: z.enum(["16:9", "9:16", "1:1", "4:3", "3:4"]),
  negativePrompt: z.string().nullish(),
  numInferenceSteps: z.number().nullish(),
  guidanceScale: z.number().nullish(),
  qualitySelector: z
    .enum([
      "(None)",
      "Standard v3.0",
      "Standard v3.1",
      "Light v3.1",
      "Heavy v3.1",
    ])
    .nullish(),
  styleSelector: z
    .enum([
      "(None)",
      "Cinematic",
      "Photographic",
      "Anime",
      "Manga",
      "Digital Art",
      "Pixel art",
      "Fantasy art",
      "Neonpunk",
      "3D Model",
    ])
    .nullish(),
  seed: z.number().nullish(),
  webhook: z.string().nullish(),
  ext: z.record(z.string(), z.any()).nullish(),
});

// Aggregate all schemas using discriminatedUnion
export const generateSchema = z.discriminatedUnion("model", [
  seedanceI2VSchema,
  veo3I2VSchema,
  runwayI2VSchema,
  nanoBananaI2ISchema,
  animagineSchema,
]);

// Export type
export type GenerateDTO = z.infer<typeof generateSchema>;
