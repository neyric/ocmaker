/**
 * Finds the closest aspect ratio from a list of ratios based on image dimensions
 * @param file - The image file to analyze
 * @param aspectRatios - Array of aspect ratios in format "width:height"
 * @returns Promise with the closest aspect ratio string
 */
export async function findClosestAspectRatio(
  file: File,
  aspectRatios = ["16:9", "4:3", "3:2", "1:1", "2:3", "3:4", "9:16"],
) {
  // Check if the file is an image
  if (!file.type.startsWith("image/")) {
    throw new Error(`File is not an image. Received type: ${file.type}`);
  }

  // Get image dimensions
  const dimensions = await getImageDimensions(file);
  const imageRatio = dimensions.width / dimensions.height;

  // Find the closest aspect ratio
  let closestRatio = aspectRatios[0];
  let minDifference = Number.POSITIVE_INFINITY;

  for (const ratio of aspectRatios) {
    const [width, height] = ratio.split(":").map(Number);
    const targetRatio = width / height;
    const difference = Math.abs(imageRatio - targetRatio);

    if (difference < minDifference) {
      minDifference = difference;
      closestRatio = ratio;
    }
  }

  return closestRatio;
}

/**
 * Gets the dimensions of an image file
 * @param file - The image file to analyze
 * @returns Promise with width and height
 */
function getImageDimensions(
  file: File,
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };

    img.src = url;
  });
}

/**
 * Validates if a file is an image
 * @param file - The file to validate
 * @returns boolean indicating if the file is an image
 */
export function isImageFile(file: File): boolean {
  return file.type.startsWith("image/");
}

/**
 * Formats aspect ratio to a normalized string
 * @param width - Image width
 * @param height - Image height
 * @returns Formatted aspect ratio string
 */
export function formatAspectRatio(
  width: number,
  height: number,
): `${number}:${number}` {
  const gcd = greatestCommonDivisor(width, height);
  return `${width / gcd}:${height / gcd}` as `${number}:${number}`;
}

/**
 * Calculates the greatest common divisor of two numbers
 * @param a - First number
 * @param b - Second number
 * @returns The greatest common divisor
 */
function greatestCommonDivisor(a: number, b: number): number {
  return b === 0 ? a : greatestCommonDivisor(b, a % b);
}
