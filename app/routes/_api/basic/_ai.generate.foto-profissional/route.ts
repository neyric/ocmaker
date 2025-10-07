import { env } from "cloudflare:workers";
import { nanoid } from "nanoid";
import { data } from "react-router";
import { z } from "zod";
import { uploadFiles } from "~/.server/libs/cloudflare/r2-bucket";
import { getSessionContext } from "~/.server/middleware/session-middleware";
import { createTask } from "~/.server/services/ai-tasks";
import { fotoProfissionalList } from "~/data/foto-profissional";
import { fotoProfissionalSchema } from "~/schema/generator/foto-profissional";
import type { Route } from "./+types/route";

// Export type
export type FotoProfissionalDTO = z.infer<typeof fotoProfissionalSchema>;

export async function action({ request, context }: Route.ActionArgs) {
  const session = getSessionContext(context);
  const user = session?.user;

  // Get form data from request
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const rest = (formData.get("rest") as string) ?? "{}";

  try {
    if (!user) throw new Response(null, { status: 401 });

    const parsed = fotoProfissionalSchema.safeParse({
      image: file,
      ...JSON.parse(rest),
    });

    if (!parsed.success) throw new Response(null, { status: 400 });

    const { effectIds, image, aspect } = parsed.data;

    const effects = effectIds
      .map((id) => {
        return fotoProfissionalList.find((item) => item.id === id);
      })
      .filter((item) => !!item);

    if (!effects.length) {
      throw Error("Unknow foto profissional got!");
    }

    const key = nanoid();
    const ext = image.name.split(".").pop()!;
    const newFile = new File([image], `${key}.${ext}`);

    const [r2Obj] = await uploadFiles(newFile);
    const imageUrl = new URL(r2Obj.key, env.CDN_URL).toString();

    const results = [] as Awaited<ReturnType<typeof createTask>>[];
    for await (const item of effects) {
      try {
        const res = await createTask(
          {
            model: "google/nano-banana-i2i",
            image: imageUrl,
            prompt: item.prompt,
            aspectRatio: aspect as any,
          },
          user.id,
        );

        results.push(res);
      } catch {
        continue;
      }
    }

    // Return success response
    return data(results);
  } catch (error) {
    if (error instanceof Response) throw error;

    // Throw any other errors
    throw Response.json(
      {
        error: error instanceof Error ? error.message : "Unknow error",
      },
      { status: 500 },
    );
  }
}

export type FotoProfissionalActionData = Awaited<
  ReturnType<typeof action>
>["data"];
