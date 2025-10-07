import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get the closest aspect ratio from a list of aspect ratios based on image dimensions
 * @param imageFile - The image file to analyze
 * @param aspectRatios - Array of aspect ratios in format ['16:9', '4:3', '3:4']
 * @returns Promise that resolves to the closest matching aspect ratio string
 */
export async function getClosestAspectRatio(
  imageFile: File,
  aspectRatios = [
    "21:9",
    "16:9",
    "4:3",
    "3:2",
    "1:1",
    "2:3",
    "3:4",
    "9:16",
    "9:21",
  ],
): Promise<string> {
  return new Promise((resolve, reject) => {
    // Validate input
    if (!imageFile.type.startsWith("image/")) {
      reject(new Error("File must be an image"));
      return;
    }

    if (!aspectRatios || aspectRatios.length === 0) {
      reject(new Error("Aspect ratios array cannot be empty"));
      return;
    }

    // Create an image element to load the file
    const img = new Image();
    const url = URL.createObjectURL(imageFile);

    img.onload = () => {
      // Get image dimensions
      const imageWidth = img.naturalWidth;
      const imageHeight = img.naturalHeight;
      const imageRatio = imageWidth / imageHeight;

      // Clean up the object URL
      URL.revokeObjectURL(url);

      // Find the closest aspect ratio
      let closestRatio = aspectRatios[0];
      let minDifference = Infinity;

      for (const ratioStr of aspectRatios) {
        // Parse aspect ratio string (e.g., '16:9' -> 16/9)
        const [width, height] = ratioStr.split(":").map(Number);

        if (isNaN(width) || isNaN(height) || height === 0) {
          console.warn(`Invalid aspect ratio format: ${ratioStr}`);
          continue;
        }

        const targetRatio = width / height;
        const difference = Math.abs(imageRatio - targetRatio);

        if (difference < minDifference) {
          minDifference = difference;
          closestRatio = ratioStr;
        }
      }

      resolve(closestRatio);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };

    // Start loading the image
    img.src = url;
  });
}
