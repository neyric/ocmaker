import { type GenerateDTO } from "~/schema/generator/generate";

export type ModelType = "t2v" | "i2v" | "t2i" | "i2i";

export interface BaseModelItem {
  name: string;
  type: ModelType;
  label: string;
  description: string;
  icon: string;
  minCost: number;
  maxCost: number;
  aspectRatio: string[]; // 视频可选的比例
  duration?: number[]; // 视频时长参数
  resolution?: string[]; // 可选分辨率参数
  ext?: string[]; // Model 提供的额外功能，
  initialValues: GenerateDTO;
}

export const i2vModels: BaseModelItem[] = [
  {
    name: "seedance/v1pro-i2v",
    type: "i2v",
    label: "Seedance V1.0 Pro",
    description: "Fluid, cohesive multi-shot video outpus",
    icon: "/assets/logo/bytedance.svg",
    minCost: 15,
    maxCost: 180,
    duration: [5, 8, 12],
    aspectRatio: ["16:9", "4:3", "1:1", "3:4", "9:16"],
    resolution: ["480p", "720p", "1080p"],
    ext: ["seeds", "camera_fixed", "end_image_url"],
    initialValues: {
      image: null,
      model: "seedance/v1pro-i2v",
      aspectRatio: "16:9",
      prompt: "",
      duration: 5,
      resolution: "720p",
      cameraFixed: false,
      enableSafetyChecker: true,
    },
  },
  {
    name: "seedance/v1lite-i2v",
    type: "i2v",
    label: "Seedance V1.0 Lite",
    description: "Accurate motion and camera control",
    icon: "/assets/logo/bytedance.svg",
    minCost: 10,
    maxCost: 120,
    duration: [5, 8, 12],
    aspectRatio: ["16:9", "4:3", "1:1", "3:4", "9:16"],
    resolution: ["480p", "720p", "1080p"],
    ext: ["seeds", "camera_fixed", "end_image_url"],
    initialValues: {
      image: null,
      model: "seedance/v1lite-i2v",
      aspectRatio: "16:9",
      prompt: "",
      duration: 5,
      resolution: "720p",
      cameraFixed: false,
      enableSafetyChecker: true,
    },
  },
  {
    name: "google/veo3",
    type: "i2v",
    label: "Google Veo 3",
    description: "Realistic outputs with natural audio",
    icon: "/assets/logo/google.svg",
    minCost: 150,
    maxCost: 150,
    aspectRatio: ["16:9", "9:16"],
    duration: [8],
    ext: ["seeds", "aspectRatio"],
    initialValues: {
      image: null,
      model: "google/veo3",
      prompt: "",
      duration: 8,
      aspectRatio: "16:9",
      resolution: "720p",
      seeds: "",
    },
  },
  {
    name: "google/veo3-fast",
    type: "i2v",
    label: "Google Veo 3 Fast",
    description: "30% Faster than standard Veo 3 model",
    icon: "/assets/logo/google.svg",
    minCost: 20,
    maxCost: 30,
    aspectRatio: ["16:9", "9:16"],
    duration: [8],
    ext: ["seeds", "aspectRatio"],
    initialValues: {
      image: null,
      model: "google/veo3-fast",
      prompt: "",
      duration: 8,
      aspectRatio: "16:9",
      resolution: "720p",
      seeds: "",
    },
  },
  // {
  //   name: "runway/gen3-i2v",
  //   type: "i2v",
  //   label: "Runway Gen-3 Alpha",
  //   description: "High-fidelity, controllable video generation",
  //   icon: "/assets/logo/runway.svg",
  //   minCost: 20,
  //   maxCost: 200,
  //   aspectRatio: ["16:9", "9:16", "1:1", "4:3", "3:4"],
  //   duration: [5, 10],
  //   resolution: ["720p", "1080p"],
  //   initialValues: {
  //     image: null,
  //     model: "runway/gen3-i2v",
  //     prompt: "",
  //     duration: 5,
  //     aspectRatio: "16:9",
  //     resolution: "720p",
  //   },
  // },
  // {
  //   name: "runway/gen3-turbo-i2v",
  //   type: "i2v",
  //   label: "Runway Gen-3 Alpha Turbo",
  //   description: "7x faster than Gen-3 Alpha with optimized performance",
  //   icon: "/assets/logo/runway.svg",
  //   minCost: 15,
  //   maxCost: 150,
  //   aspectRatio: ["16:9", "9:16", "1:1", "4:3", "3:4"],
  //   duration: [5, 10],
  //   resolution: ["720p", "1080p"],
  //   initialValues: {
  //     image: null,
  //     model: "runway/gen3-turbo-i2v",
  //     prompt: "",
  //     duration: 5,
  //     aspectRatio: "16:9",
  //     resolution: "720p",
  //   },
  // },
];
