import { getReplicate } from "../model";

export interface GenerateAnimagineImagePayload {
  prompt: string;
  aspectRatio?: keyof typeof aspectRatioMap;
  negative_prompt?: string;
  width?: number;
  height?: number;
  num_inference_steps?: number;
  guidance_scale?: number;
  quality_selector?:
    | "(None)"
    | "Standard v3.0"
    | "Standard v3.1"
    | "Light v3.1"
    | "Heavy v3.1";
  style_selector?:
    | "(None)"
    | "Cinematic"
    | "Photographic"
    | "Anime"
    | "Manga"
    | "Digital Art"
    | "Pixel art"
    | "Fantasy art"
    | "Neonpunk"
    | "3D Model";
  seed?: number;
  webhook?: string;
}

const aspectRatioMap = {
  "16:9": { width: 1408, height: 792 }, // (1152 * 16 / 9)
  "4:3": { width: 1152, height: 864 }, // 互为倒置
  "1:1": { width: 1024, height: 1024 }, // 正方形
  "3:4": { width: 864, height: 1152 }, // 基准尺寸
  "9:16": { width: 792, height: 1408 }, // (1152 * 9 / 16)
};

export const createBackgroundTask = async ({
  prompt,
  seed,
  aspectRatio,
  width: _width = 896,
  height: _height = 1152,
  webhook,
  ...rest
}: GenerateAnimagineImagePayload) => {
  const replicate = getReplicate();

  let width = _width;
  let height = _height;
  if (aspectRatio) {
    const aspect = aspectRatioMap[aspectRatio];
    width = aspect.width;
    height = aspect.height;
  }

  const result = await replicate.predictions.create({
    version: "6afe2e6b27dad2d6f480b59195c221884b6acc589ff4d05ff0e5fc058690fbb9",
    input: {
      prompt,
      seed,
      width,
      height,
      ...rest,
    },
    webhook,
  });

  return result;
};

export const getBackgroundTaskResult = async (id: string) => {
  const replicate = getReplicate();
  const result = await replicate.predictions.get(id);
  return result;
};
