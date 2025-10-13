import { type GenerateDTO } from "~/schema/generator/generate";
import { TaskManager } from "./core/task-manager";

import { TaskUtils } from "./core/task-utils";

/** 创建任务数据（仅创建记录，不启动） */
export async function createTask(params: GenerateDTO, userId?: string) {
  const taskManager = TaskManager.getInstance();
  const result = await taskManager.createTask(params, userId);
  return TaskUtils.hiddenTaskData(result);
}

export async function calculatorCredits(params: GenerateDTO) {
  const taskManager = TaskManager.getInstance();
  return await taskManager.calculatorCredits(params);
}

/** 启动任务 */
export async function startTask(taskNo: string) {
  const taskManager = TaskManager.getInstance();
  const result = await taskManager.startTask(taskNo);
  return TaskUtils.hiddenTaskData(result);
}

/** 更新任务状态 */
export async function updateTask(taskNo: string) {
  const taskManager = TaskManager.getInstance();
  const result = await taskManager.updateTask(taskNo);
  return TaskUtils.hiddenTaskData(result);
}

/** 查询任务状态 */
export async function queryTask(taskNo: string) {
  const taskManager = TaskManager.getInstance();
  const result = await taskManager.queryTask(taskNo);
  return TaskUtils.hiddenTaskData(result);
}
