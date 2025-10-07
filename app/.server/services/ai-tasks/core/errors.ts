/**
 * AI task related error classes
 */

export enum TaskErrorCode {
  INSUFFICIENT_CREDITS = "INSUFFICIENT_CREDITS",
  INVALID_USER = "INVALID_USER",
  TASK_NOT_FOUND = "TASK_NOT_FOUND",
  PROVIDER_NOT_FOUND = "PROVIDER_NOT_FOUND",
  INVALID_TASK_STATUS = "INVALID_TASK_STATUS",
  TASK_EXECUTION_FAILED = "TASK_EXECUTION_FAILED",
}

export class TaskError extends Error {
  code: TaskErrorCode;
  statusCode: number;
  details?: Record<string, any>;

  constructor(
    code: TaskErrorCode,
    message: string,
    statusCode = 500,
    details?: Record<string, any>,
  ) {
    super(message);
    this.name = "TaskError";
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
  }

  /**
   * Create insufficient credits error
   */
  static insufficientCredits(required: number, current: number): TaskError {
    return new TaskError(
      TaskErrorCode.INSUFFICIENT_CREDITS,
      `Insufficient credits: Task requires ${required} credits, but currently only has ${current}.`,
      402, // Payment Required
      { required, current },
    );
  }

  /**
   * Create invalid user error
   */
  static invalidUser(): TaskError {
    return new TaskError(
      TaskErrorCode.INVALID_USER,
      "Invalid user information",
      401, // Unauthorized
    );
  }

  /**
   * Create task not found error
   */
  static taskNotFound(taskNo: string): TaskError {
    return new TaskError(
      TaskErrorCode.TASK_NOT_FOUND,
      `Task ${taskNo} not found`,
      404,
      { taskNo },
    );
  }

  /**
   * Create provider not found error
   */
  static providerNotFound(provider: string): TaskError {
    return new TaskError(
      TaskErrorCode.PROVIDER_NOT_FOUND,
      `Provider ${provider} not found`,
      400,
      { provider },
    );
  }

  /**
   * Create invalid task status error
   */
  static invalidTaskStatus(status: string, expected?: string): TaskError {
    const message = expected
      ? `Invalid task status: ${status}, expected ${expected}`
      : `Invalid task status: ${status}`;

    return new TaskError(TaskErrorCode.INVALID_TASK_STATUS, message, 400, {
      status,
      expected,
    });
  }

  /**
   * Create task execution failed error
   */
  static executionFailed(reason: string): TaskError {
    return new TaskError(
      TaskErrorCode.TASK_EXECUTION_FAILED,
      `Task execution failed: ${reason}`,
      500,
      { reason },
    );
  }

  /**
   * Convert to JSON response format
   */
  toJSON() {
    return {
      code: this.code,
      error: this.message,
      details: this.details,
    };
  }
}
