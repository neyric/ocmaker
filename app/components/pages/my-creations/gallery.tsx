import { useEffect, useMemo, useState } from "react";
import { Image } from "~/components/common";
import { GridSection } from "~/components/ui/grid-section";
import { useBreakpoint } from "~/hooks/dom";

export interface GalleryTask {
  id: string;
  aspect?: string | null;
  imageUrl?: string | null;
  downloadHref?: string;
  createdAt: string;
  credits: string;
}

interface GallerySectionProps {
  tasks: GalleryTask[];
  downloadLabel: string;
  errorLabel: string;
}

export function GallerySection({
  tasks,
  downloadLabel,
  errorLabel,
}: GallerySectionProps) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const columnCount = useColumnCount();

  const columns = useMemo(() => {
    if (!hydrated) return [];

    const byColumns: GalleryTask[][] = Array.from(
      { length: columnCount },
      () => []
    );
    const columnHeights = Array.from({ length: columnCount }, () => 0);

    tasks.forEach((task) => {
      const ratio = task.aspect ?? "1:1";
      const [w, h] = ratio.split(":").map(Number);
      const height = w && h ? h / w : 1;

      const minHeight = Math.min(...columnHeights);
      const targetColumn = columnHeights.indexOf(minHeight);

      byColumns[targetColumn].push(task);
      columnHeights[targetColumn] += height;
    });

    return byColumns;
  }, [tasks, columnCount, hydrated]);

  if (!hydrated) {
    return (
      <GridSection borderX={false} borderY={false}>
        <div className="flex w-full justify-center py-16">
          <span
            className="loading loading-ring loading-lg text-primary"
            role="status"
            aria-label="loading"
          />
        </div>
      </GridSection>
    );
  }

  return (
    <GridSection borderX={false} borderY={false}>
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
        }}
      >
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="space-y-4">
            {column.map((task) => (
              <WaterfallItem
                key={task.id}
                task={task}
                downloadLabel={downloadLabel}
                errorLabel={errorLabel}
              />
            ))}
          </div>
        ))}
      </div>
    </GridSection>
  );
}

function WaterfallItem({
  task,
  downloadLabel,
  errorLabel,
}: {
  task: GalleryTask;
  downloadLabel: string;
  errorLabel: string;
}) {
  const aspectRatioStyle = task.aspect?.replace(":", "/") || "1/1";

  return (
    <article className="break-inside-avoid">
      <div
        className="relative w-full rounded-md overflow-hidden border border-grid-border"
        style={{ aspectRatio: aspectRatioStyle }}
      >
        {task.imageUrl ? (
          <>
            <Image
              src={task.imageUrl}
              className="w-full object-cover"
              alt={task.createdAt}
              loading="lazy"
            />
            {task.downloadHref && (
              <a
                href={task.downloadHref}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary btn-sm sm:btn-xs absolute right-3 top-3"
              >
                {downloadLabel}
              </a>
            )}
          </>
        ) : (
          <div
            className="flex w-full items-center justify-center bg-base-200 text-base-content/60"
            style={{ aspectRatio: aspectRatioStyle }}
          >
            {errorLabel}
          </div>
        )}
      </div>
      <div className="space-y-1 py-1 text-sm text-base-content/50">
        <p className="text-center">{task.createdAt}</p>
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
        return 2;
      case "lg":
        return 3;
      case "xl":
        return 4;
      default:
        return 1;
    }
  }, [breakpoint]);
}
