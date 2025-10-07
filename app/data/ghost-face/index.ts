
import ghostFace1 from "./prompts/ghost-face-1.md?raw";
import ghostFace2 from "./prompts/ghost-face-2.md?raw";
import ghostFace3 from "./prompts/ghost-face-3.md?raw";
import ghostFace4 from "./prompts/ghost-face-4.md?raw";
import ghostFace5 from "./prompts/ghost-face-5.md?raw";
import ghostFace6 from "./prompts/ghost-face-6.md?raw";
import ghostFace7 from "./prompts/ghost-face-7.md?raw";
import ghostFace8 from "./prompts/ghost-face-8.md?raw";
import ghostFace9 from "./prompts/ghost-face-9.md?raw";

export interface GhostFaceItem {
  id: string;
  image: string;
  prompt: string;
  type: "women" | "men";
}

export const ghostFaceList: GhostFaceItem[] = [
  { id: "ghost-face-10", prompt: ghostFace1, image: "/assets/ghost-face.webp", type: "women" },
  { id: "ghost-face-1", prompt: ghostFace1, image: "https://cdn.ghostfaceai.app/results/72hMjgNIhkgryldeharoR.png", type: "women" },
  { id: "ghost-face-2", prompt: ghostFace2, image: "https://cdn.ghostfaceai.app/results/ckpPNtstQwjCWQZrbY05D.png", type: "women" },
  { id: "ghost-face-3", prompt: ghostFace3, image: "https://cdn.ghostfaceai.app/results/EUaHngXslCHgxJ-Q69Lsy.png", type: "women" },
  { id: "ghost-face-4", prompt: ghostFace4, image: "https://cdn.ghostfaceai.app/results/tfCpSIyjR6Wdw8cgdHT1q.png", type: "women" },
  { id: "ghost-face-5", prompt: ghostFace5, image: "https://cdn.ghostfaceai.app/results/j7eRGCUAHvm3k1iH2iG4H.png", type: "women" },
  { id: "ghost-face-6", prompt: ghostFace6, image: "https://cdn.ghostfaceai.app/results/eaRq4gh3JXz6VdiRn-N9O.png", type: "women" },
  { id: "ghost-face-7", prompt: ghostFace7, image: "https://cdn.ghostfaceai.app/results/kKUgnxkh5pT0DUsSzo9xX.png", type: "women" },
  { id: "ghost-face-8", prompt: ghostFace8, image: "https://cdn.ghostfaceai.app/results/-4XnZ5F-3DWtmG2McgqQv.png", type: "women" },
  { id: "ghost-face-9", prompt: ghostFace9, image: "https://cdn.ghostfaceai.app/results/L02R0uhKS31EAbG6_W4MD.png", type: "women" },
];
