import { Image } from "~/components/common";
import { GridSection } from "~/components/ui/grid-section";

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
  return (
    <GridSection borderX={false} borderY={false} compact>
      <div className="columns-2 gap-4 space-y-4 md:columns-3 lg:columns-4">
        {tasks.map((task) => (
          <article key={task.id} className="break-inside-avoid">
            <div
              className="relative w-full bg-base-200 rounded-md overflow-hidden border border-grid-border"
              style={{
                aspectRatio: task.aspect
                  ? task.aspect.replace(":", "/")
                  : "1 / 1",
              }}
            >
              {task.imageUrl ? (
                <Image
                  src={task.imageUrl}
                  className="size-full object-cover"
                  alt={task.createdAt}
                  loading="lazy"
                />
              ) : (
                <div className="flex size-full items-center justify-center text-base-content/60">
                  {errorLabel}
                </div>
              )}
              {task.imageUrl && task.downloadHref && (
                <a
                  href={task.downloadHref}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary btn-sm sm:btn-xs absolute right-3 top-3"
                >
                  {downloadLabel}
                </a>
              )}
            </div>
            <div className="space-y-1 py-1">
              <p className="text-sm text-base-content/60 text-center">
                {task.createdAt}
              </p>
            </div>
          </article>
        ))}
      </div>
    </GridSection>
  );
}
