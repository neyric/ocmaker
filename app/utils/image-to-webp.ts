/**
 * Convert an image (File or URL) to WebP format
 * @param input - The input image as File or URL string
 * @param quality - WebP quality (0.0 to 1.0), default 1
 * @param fileName - Optional output file name
 * @returns Promise<File> - The converted WebP file
 */
export async function imageToWebP(
  input: File | string,
  quality: number = 1,
  fileName?: string,
): Promise<File> {
  // Create canvas and context
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Failed to get canvas context");
  }

  // Load image
  const img = new Image();

  // Set CORS if input is URL
  if (typeof input === "string") {
    img.crossOrigin = "anonymous";
  }

  return new Promise((resolve, reject) => {
    img.onload = () => {
      // Set canvas dimensions to match image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw image on canvas
      ctx.drawImage(img, 0, 0);

      // Convert canvas to blob
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Failed to convert image to WebP"));
            return;
          }

          // Create File from blob
          const webpFileName =
            fileName ||
            (typeof input === "string"
              ? "image.webp"
              : input.name.replace(/\.[^/.]+$/, ".webp"));

          const webpFile = new File([blob], webpFileName, {
            type: "image/webp",
            lastModified: Date.now(),
          });

          resolve(webpFile);
        },
        "image/webp",
        quality,
      );
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };

    // Load image from source
    if (typeof input === "string") {
      // Input is URL
      img.src = input;
    } else {
      // Input is File, create object URL
      const url = URL.createObjectURL(input);
      img.src = url;

      // Clean up object URL after image loads
      img.onload = () => {
        URL.revokeObjectURL(url);

        // Set canvas dimensions to match image
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw image on canvas
        ctx.drawImage(img, 0, 0);

        // Convert canvas to blob
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Failed to convert image to WebP"));
              return;
            }

            // Create File from blob
            const webpFileName =
              fileName || input.name.replace(/\.[^/.]+$/, ".webp");

            const webpFile = new File([blob], webpFileName, {
              type: "image/webp",
              lastModified: Date.now(),
            });

            resolve(webpFile);
          },
          "image/webp",
          quality,
        );
      };
    }
  });
}
