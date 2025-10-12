import clsx from "clsx";
import { AlertCircle, Download, Save } from "lucide-react";
import type { Task } from "~/api/generator";
import { Image } from "~/components/common";
import { useTranslate } from "~/i18n";
import { useTasks } from "~/store";

interface ProfileGeneratorPreviewProps extends React.ComponentProps<"div"> {
  onSave?: (task: Task) => void;
  previewBg?: string;
}

export function ProfileGeneratorPreview({
  className,
  onSave,
  previewBg,
  ...props
}: ProfileGeneratorPreviewProps) {
  const t = useTranslate();
  const { tasks } = useTasks();

  const handleDownload = (task: Task) => {
    const a = document.createElement("a");
    a.href = `/api/task-download/${task.task_no}`;
    a.target = "_blank";
    a.click();
  };

  return (
    <div
      className={clsx(
        "border border-grid-border rounded-lg overflow-hidden relative lg:aspect-square",
        className,
      )}
      {...props}
    >
      {previewBg && (
        <div className="absolute inset-0 opacity-20 select-none pointer-events-none">
          <Image className="size-full object-cover" src={previewBg} />
        </div>
      )}
      {!tasks.length ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h3 className="text-lg font-bold uppercase tracking-wide text-base-content/80 mb-2">
            {t("maker.generator.ocPreviewTitle")}
          </h3>
          <p className="text-base text-base-content/60 max-w-108">
            {t("maker.generator.ocPreviewDescription")}
          </p>
        </div>
      ) : (
        <div className="h-full overflow-y-auto p-3 sm:p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {tasks.map((task) => (
              <div className="relative" key={task.id}>
                <div
                  className="relative rounded-lg overflow-hidden bg-base-100 border border-grid-border"
                  style={{ aspectRatio: task.data.aspect.replace(":", "/") }}
                >
                  {task.data.status === "failed" ||
                  (task.data.status === "succeeded" &&
                    !task.data.result_url) ? (
                    <div className="size-full flex flex-col items-center justify-center text-error p-4">
                      <AlertCircle size={36} />
                      <p className="text-sm">
                        {task.data.fail_reason ?? "Create Failed"}
                      </p>
                    </div>
                  ) : task.data.status === "succeeded" ? (
                    <Image
                      src={task.data.result_url!}
                      className="size-full object-cover"
                    />
                  ) : (
                    <div className="size-full flex flex-col items-center justify-center text-base-content/70 p-4">
                      <div className="loading loading-ring loading-lg" />
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  className="absolute bottom-2 left-2 btn btn-primary btn-sm sm:btn-xs"
                  onClick={() => handleDownload(task.data)}
                  disabled={task.data.status !== "succeeded"}
                >
                  <Download size={12} />
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
