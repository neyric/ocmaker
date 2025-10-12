import { env } from "cloudflare:workers";
import { nanoid } from "nanoid";
import type { InsertAiTask } from "~/.server/libs/db";
import { connectDB } from "~/.server/libs/db";
import {
  findByTaskNo,
  insertTask,
  updateByTaskNo,
} from "~/.server/model/aiTasks";
import { getUserCredits } from "~/.server/services/basic/credits";
import { type GenerateDTO } from "~/schema/generator/generate";
import { ProviderRegistry } from "../providers/registry";
import { TaskError } from "./errors";
import { TaskUtils } from "./task-utils";

/** Task Manager - handles task operations for different AI models */
export class TaskManager {
  private static instance: TaskManager;
  private registry: ProviderRegistry;

  constructor() {
    this.registry = ProviderRegistry.getInstance();
  }

  static getInstance() {
    if (!TaskManager.instance) {
      TaskManager.instance = new TaskManager();
    }
    return TaskManager.instance;
  }

  /** Get Provider */
  getProvider(providerType: string) {
    const provider = this.registry.getProvider(providerType);
    if (!provider) throw TaskError.providerNotFound(providerType);
    return provider;
  }

  async calculatorCredits(values: GenerateDTO) {
    const provider = this.getProvider(values.model);
    const credits = provider.calculateCredits(values);

    return credits;
  }

  async createTask(values: GenerateDTO, userId?: string) {
    const db = connectDB();

    const provider = this.getProvider(values.model);
    const taskPreCreate = provider.createTask(values);

    const taskNo = nanoid();
    const credits = provider.calculateCredits(values);
    let creditsDeducted = false;

    if (userId) {
      const user = await db.query.users.findFirst({
        where: (user, { eq }) => eq(user.id, userId),
      });
      if (!user) throw TaskError.invalidUser();

      if (credits) {
        try {
          await TaskUtils.deductCredits(user, credits, taskNo);
          creditsDeducted = true;
        } catch {
          // Credit deduction failed, get current user credits and throw clear error message
          const { balance } = await getUserCredits(user);
          throw TaskError.insufficientCredits(credits, balance);
        }
      }
    }

    const insertValue: InsertAiTask = {
      task_no: taskNo,
      user_id: userId ?? null,
      created_at: new Date(),
      credits,
      task_type: taskPreCreate.taskType,
      status: "pending",
      input_params: values,
      estimated_start_at: new Date(),
      ext: {},
      poster_url: taskPreCreate.posterUrl,
      aspect: taskPreCreate.aspectRatio,
      provider: taskPreCreate.provider,
      request_param: taskPreCreate.requestParam,
      credits_deducted: creditsDeducted,
    };

    const result = await insertTask(insertValue);
    return result;
  }

  /**
   * Start task - call corresponding Provider's startTask
   */
  async startTask(taskNo: string) {
    const task = await findByTaskNo(taskNo);
    if (!task) throw TaskError.taskNotFound(taskNo);
    if (!task.provider) throw TaskError.providerNotFound("not specified");

    TaskUtils.canStartTask(task);

    const provider = this.getProvider(task.provider);

    try {
      const { taskId, startedAt } = await provider.startTask(task);

      const result = await updateByTaskNo(taskNo, {
        task_id: taskId,
        started_at: startedAt,
        status: "running",
      });

      return result;
    } catch (error) {
      // Update task status to failed and record error message
      const failedTask = await updateByTaskNo(taskNo, {
        status: "failed",
        fail_reason: error instanceof Error ? error.message : "Unknown error",
      });

      // Attempt to refund credits for failed task
      try {
        const refundedTask = await this.refundTask(taskNo);
        return refundedTask;
      } catch (refundError) {
        // If refund fails, return the failed task data
        console.error(
          `Failed to refund credits for task ${taskNo}:`,
          refundError,
        );
        return failedTask;
      }
    }
  }

  /**
   * Update task - call corresponding Provider's updateTask
   */
  async updateTask(taskNo: string) {
    const task = await findByTaskNo(taskNo);
    if (!task) throw TaskError.taskNotFound(taskNo);

    if (!task.provider) throw TaskError.providerNotFound("not specified");
    const provider = this.getProvider(task.provider);
    const providerResult = await provider.queryTask(task);

    let resultUrl = providerResult.resultUrl;
    if (resultUrl && !task.result_url && import.meta.env.PROD) {
      try {
        const result = await TaskUtils.saveResultToR2(task, resultUrl);
        resultUrl = new URL(result.key, env.CDN_URL).toString();
      } catch (error) {
        console.error("Failed to save result to R2, task: " + task.task_no);
        console.error("Original error", error);
      }
    }

    const result = await updateByTaskNo(task.task_no, {
      status: providerResult.status,
      result_url: resultUrl,
      result_data: providerResult.resultData,
      fail_reason: providerResult.failReason,
      completed_at: providerResult.completedAt,
    });

    if (
      result.status === "failed" &&
      result.credits_deducted &&
      !result.credits_refund
    ) {
      try {
        const refundedTask = await this.refundTask(taskNo);
        return refundedTask;
      } catch (refundError) {
        console.error(
          `Failed to refund credits for task ${taskNo}:`,
          refundError,
        );
        return result;
      }
    }

    return result;
  }

  /**
   * Query task - call corresponding Provider's queryTask
   */
  async queryTask(taskNo: string) {
    const task = await findByTaskNo(taskNo);
    if (!task) throw TaskError.taskNotFound(taskNo);

    return task;
  }

  /**
   * Handle task refund - check status, check if already refunded, update table data and return latest data
   */
  async refundTask(taskNo: string) {
    const task = await findByTaskNo(taskNo);
    if (!task) throw TaskError.taskNotFound(taskNo);

    // Check if task is eligible for refund
    if (task.status !== "failed") {
      throw new Error("Only failed tasks are eligible for refund");
    }

    // Check if credits were deducted
    if (!task.credits_deducted) {
      throw new Error("No credits were deducted for this task");
    }

    // Check if already refunded
    if (task.credits_refund) {
      throw new Error("Credits have already been refunded for this task");
    }

    // Perform credits refund
    await TaskUtils.refundTaskCredits(task.task_no);

    // Update task to mark as refunded
    const updatedTask = await updateByTaskNo(taskNo, {
      credits_refund: true,
    });

    return updatedTask;
  }
}
