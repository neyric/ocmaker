import type { RenderableTreeNode } from "@markdoc/markdoc";
import clsx from "clsx";
import { MarkdownArticle } from "~/components/markdown";

interface ProfileGeneratorPreviewProps extends React.ComponentProps<"div"> {
  result?: RenderableTreeNode;
  isError?: boolean;
  isLoading?: boolean;
  errorMessage?: string;
}

export function ProfileGeneratorPreview({
  result,
  isLoading = false,
  isError = false,
  errorMessage,
  className,
  ...props
}: ProfileGeneratorPreviewProps) {
  return (
    <div
      className={clsx(
        "rounded-xl border border-grid-border bg-base-100 p-3 sm:p-4",
        className,
      )}
      {...props}
    >
      {isLoading ? (
        <div className="flex min-h-[160px] flex-col items-center justify-center gap-2 text-sm text-base-content/70">
          <span className="loading loading-spinner loading-md" aria-hidden />
          <span>Creating profile copy…</span>
        </div>
      ) : result ? (
        <MarkdownArticle node={result} />
      ) : (
        <div className="min-h-[120px] text-sm text-base-content/60">
          {isError ? errorMessage : ""}
        </div>
      )}
    </div>
  );
}
