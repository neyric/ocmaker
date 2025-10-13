import { Heart, Loader } from "lucide-react";
import { useMemo } from "react";
import type { CommunityItem } from "~/api/public/community";
import { Image } from "~/components/common";
import { GridSection } from "~/components/ui/grid-section";
import { useBreakpoint } from "~/hooks/dom";

export interface CommunityGalleryProps {
  items: CommunityItem[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasMore: boolean;
  loadMoreRef: React.RefCallback<HTMLDivElement>;
  loadingMoreLabel: string;
  emptyLabel: string;
  errorMessage?: string | null;
  anonymousLabel: string;
}

export function CommunityGallery({
  items,
  isLoading,
  isFetchingNextPage,
  hasMore,
  loadMoreRef,
  loadingMoreLabel,
  emptyLabel,
  errorMessage,
  anonymousLabel,
}: CommunityGalleryProps) {
  const showInitialLoading = isLoading && items.length === 0;
  const showEmptyState = !isLoading && items.length === 0 && !errorMessage;

  if (showInitialLoading) {
    return (
      <GridSection borderX={false} borderY={false} compact>
        <div className="flex w-full justify-center py-16">
          <div className="flex items-center gap-2 text-base-content/60">
            <Loader className="h-5 w-5 animate-spin" aria-hidden="true" />
          </div>
        </div>
      </GridSection>
    );
  }

  if (showEmptyState) {
    return (
      <GridSection borderX={false} borderY={false} compact>
        <div className="flex w-full flex-col items-center gap-2 py-16 text-center text-base-content/60">
          <span>{emptyLabel}</span>
        </div>
      </GridSection>
    );
  }

  return (
    <GridSection borderX={false} borderY={false} compact>
      <WaterfallLayout items={items} anonymousLabel={anonymousLabel} />

      {errorMessage ? (
        <div className="flex justify-center py-6">
          <p className="text-sm text-error">{errorMessage}</p>
        </div>
      ) : null}

      {hasMore ? (
        <div
          ref={loadMoreRef}
          className="mt-6 flex items-center justify-center py-6"
          aria-live="polite"
        >
          {isFetchingNextPage ? (
            <div className="flex items-center gap-2 text-base-content/60">
              <Loader className="h-4 w-4 animate-spin" aria-hidden="true" />
            </div>
          ) : (
            <span className="sr-only">{loadingMoreLabel}</span>
          )}
        </div>
      ) : null}
    </GridSection>
  );
}

function WaterfallLayout({
  items,
  anonymousLabel,
}: {
  items: CommunityItem[];
  anonymousLabel: string;
}) {
  const columnCount = useColumnCount();

  const columns = useMemo(() => {
    if (columnCount <= 0) return [];

    const byColumns: CommunityItem[][] = Array.from(
      { length: columnCount },
      () => []
    );
    const heights = Array.from({ length: columnCount }, () => 0);

    items.forEach((item) => {
      const ratio = item.aspect ?? "1:1";
      const [w, h] = ratio.split(":").map(Number);
      const height = !Number.isNaN(w) && !Number.isNaN(h) && w > 0 ? h / w : 1;

      const minHeight = Math.min(...heights);
      const targetColumn = heights.indexOf(minHeight);

      byColumns[targetColumn].push(item);
      heights[targetColumn] += height;
    });

    return byColumns;
  }, [items, columnCount]);

  return (
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
      }}
    >
      {columns.map((column, index) => (
        <div key={`column-${index}`} className="space-y-4">
          {column.map((item) => (
            <CommunityCard
              key={item.id}
              item={item}
              anonymousLabel={anonymousLabel}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function CommunityCard({
  item,
  anonymousLabel,
}: {
  item: CommunityItem;
  anonymousLabel: string;
}) {
  const aspectRatio = item.aspect?.replace(":", "/") ?? "1/1";
  const name = item.name ?? "";
  const description = item.description ?? "";
  const displayName =
    item.user?.nickname?.trim() !== "" ? item.user.nickname! : anonymousLabel;
  const avatarUrl = item.user?.avatar_url ?? null;
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <article className="overflow-hidden">
      <div
        className="relative w-full rounded-md overflow-hidden bg-base-100 border border-grid-border"
        style={{ aspectRatio }}
      >
        <Image
          src={item.image_url}
          alt={description || name}
          className="h-full w-full object-cover"
          loading="lazy"
          wsrv={{ w: 600, output: "webp" }}
        />
      </div>
      <div className="flex items-center justify-between mt-2.5">
        <div className="flex items-center gap-2">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={displayName}
              className="size-6 rounded-full object-cover"
              loading="lazy"
              wsrv={{ w: 48 }}
            />
          ) : (
            <div className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
              {initial}
            </div>
          )}
          <span className="text-sm text-base-content/70">{displayName}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-base-content/60">
          <Heart className="h-4 w-4" aria-hidden="true" />
          <span>{item.likes_count ?? 0}</span>
        </div>
      </div>
    </article>
  );
}

function useColumnCount() {
  const [breakpoint] = useBreakpoint();

  return useMemo(() => {
    switch (breakpoint) {
      case "xs":
        return 1;
      case "sm":
        return 2;
      case "md":
        return 3;
      case "lg":
        return 3;
      case "xl":
        return 4;
      default:
        return 1;
    }
  }, [breakpoint]);
}
