interface ProfileGeneratorPreviewProps {
  result?: string | null;
  original?: string | null;
  isLoading?: boolean;
}

export function ProfileGeneratorPreview({
  result,
  original,
  isLoading = false,
}: ProfileGeneratorPreviewProps) {
  return (
    <div className="rounded-xl border border-base-300 bg-base-100 p-4 sm:p-6">
      <div className="mb-3 space-y-1">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-base-content/70">
          Preview
        </h3>
        <p className="text-sm text-base-content/70">
          Generated copy updates after each successful run.
        </p>
      </div>

      {isLoading ? (
        <div className="flex min-h-[160px] flex-col items-center justify-center gap-2 text-sm text-base-content/70">
          <span className="loading loading-spinner loading-md" aria-hidden />
          <span>Creating profile copy…</span>
        </div>
      ) : result ? (
        <div className="space-y-3">
          <div className="rounded-lg bg-base-200/70 p-4 text-sm text-base-content">
            <pre className="whitespace-pre-wrap break-words">
              {result}
            </pre>
          </div>
          {original && (
            <div className="rounded-lg border border-base-200 bg-base-100/70 p-3 text-xs text-base-content/70">
              <span className="font-medium text-base-content">Input:</span> {" "}
              <span>{original}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="min-h-[120px] text-sm text-base-content/60">
          Provide a description in the form and click Generator to see the results here.
        </div>
      )}
    </div>
  );
}
