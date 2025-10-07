import type { UploadResult } from "~/routes/_api/basic/upload";

/**
 * Upload file to server
 * @param file File to upload
 * @returns Promise<UploadResponse>
 */
export async function uploadFile(file: File): Promise<UploadResult> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response
      .json<{ error: string }>()
      .catch(() => ({ error: "Upload failed" }));

    throw new Error(error.error ?? `Upload failed: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Upload multiple files to server
 * @param files Array of files to upload
 * @returns Promise<UploadResponse[]>
 */
export async function uploadFiles(files: File[]) {
  const uploadPromises = files.map((file) => uploadFile(file));
  return Promise.all(uploadPromises);
}
