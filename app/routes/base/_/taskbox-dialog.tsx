import clsx from "clsx";
import dayjs from "dayjs";
import { Ring2 } from "ldrs/react";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  FileVideo,
  XCircle,
} from "lucide-react";
import { useMemo } from "react";
import type { Task } from "~/api/generator";
import { Image } from "~/components/common";
import { Dialog, DialogContent } from "~/components/ui/dialog";
import { Drawer, DrawerContent } from "~/components/ui/drawer";
import { useBreakpoint } from "~/hooks/dom";
import { useTranslate } from "~/i18n";
import { useDialogStore, useTasks } from "~/store";

export function TaskBoxDialog() {
  const t = useTranslate();
  const [_, { isMobile }] = useBreakpoint();

  const visible = useDialogStore((state) => state.visibleTaskBoxDialog);
  const setVisible = useDialogStore((state) => state.setVisibleTaskBoxDialog);

  const { tasks, removeTask } = useTasks();

  const handleClose = () => setVisible(false);

  if (isMobile) {
    return (
      <Drawer open={visible} onOpenChange={handleClose}>
        <DrawerContent
          className="md:hidden border-none bg-transparent max-h-[80vh]"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <TaskBoxContent tasks={tasks} onRemoveTask={removeTask} />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={visible} onOpenChange={handleClose}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="max-mdhidden !max-w-3xl p-0 border-none bg-base-100 max-h-[80vh]"
      >
        <TaskBoxContent tasks={tasks} onRemoveTask={removeTask} />
      </DialogContent>
    </Dialog>
  );
}

interface TaskBoxContentProps {
  tasks: Array<{ id: string; data: Task; intervalId?: NodeJS.Timeout }>;
  onRemoveTask: (taskNo: string) => void;
}

function TaskBoxContent({ tasks, onRemoveTask }: TaskBoxContentProps) {
  const t = useTranslate();
  const renderTasks = useMemo(() => {
    const runningTasks = tasks.filter(
      (task) => task.data.status === "pending" || task.data.status === "running"
    );
    const completedTasks = tasks.filter(
      (task) =>
        task.data.status === "succeeded" || task.data.status === "failed"
    );

    return runningTasks.concat(completedTasks);
  }, [tasks]);

  const handleTaskClick = (task: Task) => {
    console.log(task);
  };

  return (
    <div className="flex flex-col h-full bg-base-100 rounded-t-xl md:rounded-xl max-h-[80vh]">
      {/* Header */}
      <div className="p-4">
        <h2 className="text-xl font-bold">{t("dialogs.taskbox.title")}</h2>
        <p className="text-sm text-base-content/70">
          {t("dialogs.taskbox.description")}
        </p>
      </div>

      {/* Content */}
      <div className="overflow-y-auto flex-1 min-h-0 px-4 pb-4">
        {renderTasks.length === 0 ? (
          <div className="text-center py-12">
            <FileVideo className="size-12 mx-auto text-base-content/30 mb-4" />
            <p className="text-base-content/70">{t("dialogs.taskbox.empty")}</p>
          </div>
        ) : (
          <WaterfallLayout
            items={renderTasks.map((item) => item.data)}
            onItemClick={handleTaskClick}
          />
        )}
      </div>
    </div>
  );
}

export function WaterfallLayout({
  items,
  onItemClick,
}: {
  items: Task[];
  onItemClick?: (item: Task) => void;
}) {
  const columnCount = useColumnCount();

  // 根据列数分配项目
  const columns = useMemo(() => {
    const columns: Task[][] = Array.from({ length: columnCount }, () => []);
    const columnHeights = Array.from({ length: columnCount }, () => 0);

    items.forEach((item) => {
      const aspectRatio = item.aspect || "1:1";
      const [w, h] = aspectRatio.split(":").map(Number);
      const itemHeight = h / w;

      const min = Math.min(...columnHeights);
      const bestColumn = columnHeights.indexOf(min);

      columns[bestColumn].push(item);
      columnHeights[bestColumn] += itemHeight;
    });

    return columns;
  }, [items, columnCount]);

  return (
    <div className="w-full">
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
        }}
      >
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="space-y-4">
            {column.map((item) => (
              <WaterfallItem
                key={item.task_no}
                item={item}
                onClick={onItemClick}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function WaterfallItem({
  item,
  onClick,
}: {
  item: Task;
  onClick?: (item: Task) => void;
}) {
  const t = useTranslate();
  // 解析 aspect 比例，格式如 "1:1", "2:3", "3:4", "4:3"
  const aspectRatio = useMemo(() => {
    if (!item.aspect || item.status !== "succeeded") return "1/1";
    return item.aspect.replace(":", "/");
  }, [item.aspect, item.status]);

  const handleClick = () => {
    onClick?.(item);
  };

  const handleDownload = (item: Task) => {
    const url = `/api/task-download/${item.task_no}`;
    const a = document.createElement("a");
    a.target = "_blank";
    a.href = url;
    
    a.click();
  };

  return (
    <div
      className="break-inside-avoid cursor-pointer hover:scale-103 transition-transform"
      onClick={handleClick}
    >
      <div
        className="bg-base-200 rounded-lg overflow-hidden"
        style={{ aspectRatio }}
      >
        {item.result_url ? (
          <Image
            src={item.result_url}
            alt={`Criação ${item.task_no}`}
            className="size-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="size-full flex flex-col items-center justify-center p-2">
            {["pending", "running"].includes(item.status) && (
              <>
                <div className="loading loading-infinity loading-xl text-primary mb-1" />
                <p className="text-base-content/50 text-sm text-center">
                  {t("dialogs.taskbox.status.creating")}
                </p>
              </>
            )}
            {item.status === "succeeded" && (
              <>
                <AlertCircle className="text-error mb-2 size-8" />
                <p className="text-base-content/50 text-sm text-center">
                  {t("dialogs.taskbox.status.error")}
                </p>
              </>
            )}
            {item.status === "failed" && (
              <>
                <AlertCircle className="text-error mb-2 size-8" />
                <p className="text-base-content/50 text-xs text-center">
                  {item.fail_reason ?? t("dialogs.taskbox.status.failed")}
                </p>
              </>
            )}
          </div>
        )}
      </div>
      <div className="mt-2 px-0.5 text-sm flex items-center justify-between">
        <div className="text-base-content/50">{dayjs(item.created_at).format("YYYY-MM-DD HH:mm:ss")}</div>
        <div>
          {item.status === "failed" ? (
            <span className="text-error">Failed</span>
          ) : item.status === "succeeded" ? (
            <button
              className="btn btn-xs btn-primary"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleDownload(item);
              }}
            >
              Download
            </button>
          ) : (
            <span>Generating</span>
          )}
        </div>
      </div>
    </div>
  );
}

function useColumnCount() {
  const [breakpoint] = useBreakpoint();

  const columnCount = useMemo(() => {
    switch (breakpoint) {
      case "xs":
        return 1;
      case "sm":
        return 2;
      case "md":
        return 2;
      case "lg":
        return 2;
      case "xl":
        return 2;
      default:
        return 1;
    }
  }, [breakpoint]);

  return columnCount;
}
