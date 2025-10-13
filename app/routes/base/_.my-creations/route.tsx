import { useMemo } from "react";
import { Link, redirect } from "react-router";
import { getSessionHandler } from "~/.server/libs/session";
import { getI18nConetxt } from "~/.server/middleware/i18n-middleware";
import { getTaskByUserId } from "~/.server/services/ai-tasks";
import { Image } from "~/components/common";
import { getPageLocale, getTranslate, useTranslate } from "~/i18n";
import { useRootLoader } from "~/root";
import { createCanonical, createNormalAlternatives } from "~/utils/meta";
import { createSocialTags } from "~/utils/og";
import type { Route } from "./+types/route";

const PAGE_URL = "/my-creations";

export function meta({ matches, params, loaderData }: Route.MetaArgs) {
  const canonicalUrl = params.lang ? `/${params.lang}${PAGE_URL}` : PAGE_URL;

  const canonical = createCanonical(canonicalUrl, matches[0].loaderData.DOMAIN);
  const alternatives = createNormalAlternatives(
    PAGE_URL,
    matches[0].loaderData.DOMAIN
  );
  const og = createSocialTags(
    {
      title: loaderData.meta.title,
      description: loaderData.meta.description,
      url: PAGE_URL,
      siteName: matches[0].loaderData.SITE_NAME,
    },
    matches[0].loaderData.DOMAIN
  );

  return [
    { title: loaderData.meta.title },
    {
      name: "description",
      content: loaderData.meta.description,
    },
    canonical,
    ...alternatives,
    ...og,
  ];
}

export async function loader({ request, context }: Route.LoaderArgs) {
  const i18n = getI18nConetxt(context);
  const page = await getPageLocale(i18n.lang, "my-creations");
  const t = getTranslate(page);

  const [session] = await getSessionHandler(request);
  const user = session.get("user");

  if (!user) {
    throw new Response(null, { status: 401 });
  }

  const tasks = await getTaskByUserId(user.id);

  const meta = {
    title: t("meta.title"),
    description: t("meta.description"),
  };

  return { meta, page, tasks };
}

export default function MyCreations({ loaderData }: Route.ComponentProps) {
  const { page } = loaderData;
  const tasks = loaderData.tasks ?? [];
  const ct = useTranslate(page);
  const t = useTranslate();
  const rootData = useRootLoader();

  const locale = rootData?.i18n.langCode ?? "en-US";
  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    [locale]
  );

  const formatDate = (value: Date | string | null | undefined) => {
    if (!value) return "--";
    const dateValue = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(dateValue.getTime())) return "--";
    return dateFormatter.format(dateValue);
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {ct("contents.hero.title")}
        </h1>
        <p className="mt-4 text-base text-base-content/70">
          {ct("contents.hero.description")}
        </p>
      </div>

      {tasks.length === 0 ? (
        <div className="mt-16 rounded-2xl border border-dashed border-base-content/20 bg-base-200/40 p-12 text-center">
          <h2 className="text-2xl font-semibold">
            {ct("contents.empty.title")}
          </h2>
          <p className="mt-3 text-base text-base-content/70">
            {ct("contents.empty.description")}
          </p>
          <Link className="btn btn-primary mt-6" to="/maker">
            {ct("contents.empty.action")}
          </Link>
        </div>
      ) : (
        <div className="mt-12 columns-2 gap-4 space-y-4 md:columns-3 lg:columns-4">
          {tasks.map((task) => {
            const createdAt = formatDate(task.created_at);
            const creditsLabel = ct("contents.list.credits", {
              credits: task.credits ?? 0,
            });
            const createdAtLabel = ct("contents.list.createdAt", {
              date: createdAt,
            });

            return (
              <article
                key={task.task_no}
                className="break-inside-avoid overflow-hidden rounded-xl border border-grid-border bg-base-100 shadow-sm"
              >
                <div
                  className="relative w-full bg-base-200"
                  style={{
                    aspectRatio: task.aspect
                      ? task.aspect.replace(":", "/")
                      : "1 / 1",
                  }}
                >
                  {task.result_url ? (
                    <Image
                      src={task.result_url}
                      className="size-full object-cover"
                      alt={createdAtLabel}
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center text-base-content/60">
                      {t("common.error")}
                    </div>
                  )}
                  {task.result_url && (
                    <a
                      href={`/api/task-download/${task.task_no}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary btn-sm sm:btn-xs absolute right-3 top-3"
                    >
                      {t("common.download")}
                    </a>
                  )}
                </div>
                <div className="space-y-1 p-4 text-sm text-base-content/80">
                  <p className="font-medium text-base-content">
                    {createdAtLabel}
                  </p>
                  <p>{creditsLabel}</p>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
