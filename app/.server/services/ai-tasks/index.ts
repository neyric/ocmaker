import { type GenerateDTO } from "~/schema/generator/generate";
import { TaskManager } from "./core/task-manager";

/** 创建任务数据（仅创建记录，不启动） */
export async function createTask(params: GenerateDTO, userId?: string) {
  const taskManager = TaskManager.getInstance();
  return await taskManager.createTask(params, userId);
}

export async function calculatorCredits(params: GenerateDTO) {
  const taskManager = TaskManager.getInstance();
  return await taskManager.calculatorCredits(params);
}

/** 启动任务 */
export async function startTask(taskNo: string) {
  const taskManager = TaskManager.getInstance();
  return await taskManager.startTask(taskNo);
}

/** 更新任务状态 */
export async function updateTask(taskNo: string) {
  const taskManager = TaskManager.getInstance();
  return await taskManager.updateTask(taskNo);
}

/** 查询任务状态 */
export async function queryTask(taskNo: string) {
  const taskManager = TaskManager.getInstance();
  return await taskManager.queryTask(taskNo);
}
