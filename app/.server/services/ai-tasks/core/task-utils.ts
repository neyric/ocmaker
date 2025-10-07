import { downloadFilesToBucket } from "~/.server/libs/cloudflare/r2-bucket";
import type { AiTask, User } from "~/.server/libs/db";
import {
  consumptionsCredits,
  refundAiTaskCredits,
} from "~/.server/services/basic/credits";

/**
 * Task utility class - only keeps necessary common functions
 */
export class TaskUtils {
  /** Check if Task meets the conditions to call Provider's createTask */
  static canStartTask(task: AiTask): true {
    if (task.status !== "pending") {
      throw Error(`Task is not in pending status, current: ${task.status}`);
    }

    if (!task.credits_deducted) {
      throw Error("Credits were not deducted, failed to start task.");
    }

    const startAt = task.estimated_start_at.valueOf();
    if (startAt > new Date().valueOf()) {
      throw Error("Task start time has not been reached");
    }

    return true;
  }

  /** Deduct user credits */
  static async deductCredits(
    user: User,
    credits: number,
    taskNo: string,
  ): Promise<void> {
    await consumptionsCredits(user, {
      credits,
      source_type: "ai_task",
      source_id: taskNo,
      reason: "AI Task Execution",
    });
  }

  /** Save file URL queried by Provider to R2 bucket */
  static async saveResultToR2(task: AiTask, resultUrl: string) {
    const taskNo = task.task_no;
    const ext = resultUrl.split(".").pop()!;

    const files = [
      {
        src: resultUrl,
        fileName: taskNo,
        ext: ext,
      },
    ];

    const results = await downloadFilesToBucket(files, "results");

    if (!results || results.length === 0) {
      throw new Error("Failed to save result to R2");
    }

    return results[0];
  }

  /** Refund task credits */
  static async refundTaskCredits(taskNo: string): Promise<void> {
    await refundAiTaskCredits(taskNo);
  }
}
