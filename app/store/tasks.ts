import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { Task } from "~/api/generator";
import { queryTask, startTask } from "~/api/generator";

interface TaskData {
  id: string;
  data: Task;
  intervalId?: NodeJS.Timeout;
}

interface TasksState {
  tasks: TaskData[];

  // 添加任务
  addTask: (task: Task) => void;

  // 移除任务
  removeTask: (taskNo: string) => void;

  // 更新任务状态（内部使用）
  updateTaskData: (taskNo: string, data: Task) => void;

  // 开始轮询任务
  startPolling: (taskNo: string) => void;

  // 停止轮询任务
  stopPolling: (taskNo: string) => void;
}

export const useTasksStore = create<TasksState>()(
  immer((set, get) => ({
    tasks: [],

    addTask: (task) => {
      const { tasks, startPolling } = get();
      const existingTask = tasks.find((t) => t.id === task.task_no);

      set((state) => {
        const existingIndex = state.tasks.findIndex(
          (t) => t.id === task.task_no,
        );

        if (existingIndex >= 0) {
          // 更新已存在的任务
          state.tasks[existingIndex].data = task;
        } else {
          // 添加新任务到列表开头
          state.tasks.unshift({
            id: task.task_no,
            data: task,
          });
        }
      });

      // 如果任务需要轮询且没有在轮询中，开始轮询
      const needsPolling =
        task.status === "pending" || task.status === "running";
      if (needsPolling && !existingTask?.intervalId) {
        startPolling(task.task_no);
      }
    },

    removeTask: (taskNo) => {
      get().stopPolling(taskNo);

      set((state) => {
        state.tasks = state.tasks.filter((t) => t.id !== taskNo);
      });
    },

    updateTaskData: (taskNo, data) => {
      set((state) => {
        const taskIndex = state.tasks.findIndex((t) => t.id === taskNo);
        if (taskIndex >= 0) {
          state.tasks[taskIndex].data = data;
        }
      });
    },

    startPolling: (taskNo) => {
      const { tasks, stopPolling, updateTaskData } = get();
      const task = tasks.find((t) => t.id === taskNo);

      if (!task) return;

      // 如果已经在轮询，先停止
      if (task.intervalId) {
        clearInterval(task.intervalId);
      }

      // 立即执行一次查询
      const pollOnce = async () => {
        const currentTask = get().tasks.find((t) => t.id === taskNo);
        if (!currentTask) return;

        try {
          // 根据当前状态决定调用哪个API
          const result =
            currentTask.data.status === "pending"
              ? await startTask({ taskNo })
              : await queryTask({ taskNo });

          updateTaskData(taskNo, result);

          // 如果任务完成，停止轮询
          if (result.status === "succeeded" || result.status === "failed") {
            stopPolling(taskNo);
          }
        } catch (error) {
          console.error(`Failed to update task ${taskNo}:`, error);
        }
      };

      // 立即执行一次
      pollOnce();

      // 设置定时轮询（每8秒）
      const intervalId = setInterval(pollOnce, 8000);

      // 保存定时器ID
      set((state) => {
        const taskIndex = state.tasks.findIndex((t) => t.id === taskNo);
        if (taskIndex >= 0) {
          state.tasks[taskIndex].intervalId = intervalId;
        }
      });
    },

    stopPolling: (taskNo) => {
      const task = get().tasks.find((t) => t.id === taskNo);

      if (task?.intervalId) {
        clearInterval(task.intervalId);

        set((state) => {
          const taskIndex = state.tasks.findIndex((t) => t.id === taskNo);
          if (taskIndex >= 0) {
            delete state.tasks[taskIndex].intervalId;
          }
        });
      }
    },
  })),
);

// 导出便捷 hooks
export const useTasks = () => {
  const tasks = useTasksStore((state) => state.tasks);
  const addTask = useTasksStore((state) => state.addTask);
  const removeTask = useTasksStore((state) => state.removeTask);

  return {
    tasks,
    addTask,
    removeTask,
  };
};
