import type { Area } from "react-easy-crop";
import { getClosestAspectRatio } from "~/lib/utils";

export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

export const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: Area,
  fileName: string,
  fileType: string,
): Promise<File> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not get canvas context");
  }

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        throw new Error("Canvas is empty");
      }
      const file = new File([blob], fileName, {
        type: fileType,
        lastModified: Date.now(),
      });
      resolve(file);
    }, fileType);
  });
};

export const getAspectRatioValue = (ratio: string): number => {
  const [width, height] = ratio.split(":").map(Number);
  return width / height;
};

export const calculateDefaultAspectRatio = async (
  inputFile: File,
  inputAspectRatios?: string[],
  defaultAspect?: string,
  fallbackAspectRatios: string[] = ["16:9", "4:3", "1:1", "3:4", "9:16"],
): Promise<string> => {
  let defAspect: string | undefined;

  if (inputAspectRatios) {
    const ratio = await getClosestAspectRatio(inputFile, inputAspectRatios);
    defAspect = ratio;
  } else {
    defAspect = defaultAspect;
  }

  return defAspect || inputAspectRatios?.[0] || fallbackAspectRatios[0];
};
