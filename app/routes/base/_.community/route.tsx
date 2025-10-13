import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useEffect, useMemo } from "react";
import { getI18nConetxt } from "~/.server/middleware/i18n-middleware";
import type { CommunityResult } from "~/api/public/community";
import { community } from "~/api/public/community";
import { CommunityGallery } from "~/components/pages/community";
import { HeroSection } from "~/components/pages/my-creations";
import { getPageLocale, getTranslate, useTranslate } from "~/i18n";
import { createCanonical, createNormalAlternatives } from "~/utils/meta";
import { createSocialTags } from "~/utils/og";
import type { Route } from "./+types/route";

const PAGE_URL = "/community";
const COMMUNITY_QUERY_KEY = ["community"] as const;

export function meta({ matches, params, loaderData }: Route.MetaArgs) {
  const canonicalUrl = params.lang ? `/${params.lang}${PAGE_URL}` : PAGE_URL;

  const canonical = createCanonical(canonicalUrl, matches[0].loaderData.DOMAIN);
  const alternatives = createNormalAlternatives(
    PAGE_URL,
    matches[0].loaderData.DOMAIN,
  );
  const og = createSocialTags(
    {
      title: loaderData.meta.title,
      description: loaderData.meta.description,
      url: PAGE_URL,
      siteName: matches[0].loaderData.SITE_NAME,
    },
    matches[0].loaderData.DOMAIN,
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

export async function loader({ context }: Route.LoaderArgs) {
  const i18n = getI18nConetxt(context);
  const page = await getPageLocale(i18n.lang, "community");
  const t = getTranslate(page);

  const meta = {
    title: t("meta.title"),
    description: t("meta.description"),
  };

  return { meta, page };
}

export default function CommunityPage({ loaderData }: Route.ComponentProps) {
  const { page } = loaderData;
  const ct = useTranslate(page);
  const t = useTranslate();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery<CommunityResult, Error>({
    queryKey: COMMUNITY_QUERY_KEY,
    queryFn: ({ pageParam, signal }) =>
      community({ cursor: (pageParam as string | null) ?? null, signal }),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const [loadMoreRef, entry] = useIntersectionObserver<HTMLDivElement>({
    root: null,
    rootMargin: "200px",
    threshold: 0,
  });

  useEffect(() => {
    if (!entry?.isIntersecting) return;
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }, [entry, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const items = useMemo(
    () => data?.pages.flatMap((page) => page.items ?? []) ?? [],
    [data],
  );

  const errorMessage = isError
    ? error instanceof Error
      ? error.message
      : t("common.error")
    : null;

  return (
    <div className="relative pb-16">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] bg-gradient-to-b from-primary/10 to-transparent"
        aria-hidden="true"
      />
      <HeroSection
        title={ct("contents.hero.title")}
        description={ct("contents.hero.description")}
      />
      <CommunityGallery
        items={items}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        hasMore={Boolean(hasNextPage)}
        loadMoreRef={loadMoreRef}
        loadingMoreLabel={ct("contents.gallery.loadingMore")}
        emptyLabel={ct("contents.gallery.empty")}
        errorMessage={errorMessage}
        anonymousLabel={ct("contents.card.anonymous")}
      />
    </div>
  );
}
