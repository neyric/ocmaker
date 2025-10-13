import { useMemo } from "react";
import { Link, redirect } from "react-router";
import { getSessionHandler } from "~/.server/libs/session";
import { getI18nConetxt } from "~/.server/middleware/i18n-middleware";
import { getTaskByUserId } from "~/.server/services/ai-tasks";
import {
  EmptyState,
  GallerySection,
  HeroSection,
} from "~/components/pages/my-creations";
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
    return redirect("/401");
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

  const galleryTasks = useMemo(
    () =>
      tasks.map((task) => ({
        id: task.task_no,
        aspect: task.aspect,
        imageUrl: task.result_url ?? undefined,
        downloadHref: task.result_url
          ? `/api/task-download/${task.task_no}`
          : undefined,
        createdAt: ct("contents.list.createdAt", {
          date: formatDate(task.created_at),
        }),
        credits: ct("contents.list.credits", {
          credits: task.credits ?? 0,
        }),
      })),
    [tasks, ct, dateFormatter],
  );

  return (
    <div className="pb-16">
      <div className="h-screen bg-gradient-to-b from-primary/10 to-transparent absolute top-0 inset-x-0" />
      <HeroSection
        title={ct("contents.hero.title")}
        description={ct("contents.hero.description")}
      />

      {galleryTasks.length === 0 ? (
        <EmptyState
          title={ct("contents.empty.title")}
          description={ct("contents.empty.description")}
          action={
            <Link className="btn btn-primary" to="/maker">
              {ct("contents.empty.action")}
            </Link>
          }
        />
      ) : (
        <GallerySection
          tasks={galleryTasks}
          errorLabel={t("common.error")}
          downloadLabel={t("common.download")}
        />
      )}
    </div>
  );
}
