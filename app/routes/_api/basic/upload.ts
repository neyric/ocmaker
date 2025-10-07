import { env } from "cloudflare:workers";
import { nanoid } from "nanoid";
import { data } from "react-router";
import { uploadFiles } from "~/.server/libs/cloudflare/r2-bucket";
import type { Route } from "./+types/upload";

export const action = async ({ request, context }: Route.ActionArgs) => {
  if (request.method.toLowerCase() !== "post") {
    throw new Response("Method Not Allowed", { status: 405 });
  }

  try {
    // Parse formData
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) throw Error("Invalid Parameters");

    const extension = file.name.split(".").pop();
    const randomFileName = `${nanoid()}.${extension}`;

    const [result] = await uploadFiles(
      new File([file], randomFileName, {
        type: file.type,
        lastModified: file.lastModified,
      }),
    );

    if (!result) throw Error("Upload Failed");

    // Return upload success info
    return data({
      url: new URL(result.key, env.CDN_URL).toString(),
      fileSize: result.size,
      contentType: file.type,
      fileName: randomFileName,
      originalName: file.name,
      uploadedAt: new Date().toISOString(),
    });
  } catch (error) {
    if (error instanceof Response) throw error;
    console.error("Upload Failed:", error);
    throw Response.json(
      { error: error instanceof Error ? error.message : "Request Failed" },
      { status: 500 },
    );
  }
};

export type UploadResult = Awaited<ReturnType<typeof action>>["data"];
