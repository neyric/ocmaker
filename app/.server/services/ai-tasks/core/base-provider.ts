import type { AiTask, InsertAiTask } from "~/.server/libs/db";
import type { GenerateDTO } from "~/schema/generator/generate";

/**
 * AI 提供商的依赖注入配置
 * 通过构造函数注入实现依赖反转
 */
export interface ProviderConfig<M = "", TParams = unknown> {
  /**
   * 提供商类型标识
   */
  type: M;

  /**
   * 1. 将用户输入的 schema 参数转换为 API 调用的特定参数格式
   * @param inputParams - 用户提供的标准化参数 (来自 image-to-video schema)
   * @returns API 调用所需的特定格式参数
   */
  transformParams: (inputParams: GenerateDTO) => TParams;

  /**
   * 创建任务（用于生成数据库记录）
   * @param inputParams - 用户提供的标准化参数
   * @param userId - 用户ID
   * @returns 数据库任务记录
   */
  createTask: (inputParams: GenerateDTO) => {
    taskType: InsertAiTask["task_type"];
    provider: InsertAiTask["provider"];
    aspectRatio: InsertAiTask["aspect"];
    posterUrl?: string | null;
    requestParam: TParams;
    ext?: Record<string, unknown>;
  };

  /**
   * 计算任务所需的 credits 数量
   * @param inputParams - 用户提供的标准化参数
   * @returns 所需的 credits 数量
   */
  calculateCredits: (inputParams: GenerateDTO) => number;

  /**
   * 2. 发起 API 调用
   * @param task - 数据库中的任务记录
   * @returns API 返回的任务 ID
   */
  startTask: (
    task: AiTask,
  ) => Promise<{ taskId: AiTask["task_id"]; startedAt: Date }>;

  /**
   * 3. 发起 API 调用
   * - 查询当前任务状态
   * - 查询当前任务进度
   * @param task - 数据库中的任务记录
   * @returns API 调用结果
   */
  queryTask: (task: AiTask) => Promise<{
    taskId: Exclude<AiTask["task_id"], null>;
    status: AiTask["status"];
    resultUrl: AiTask["result_url"];
    resultData: AiTask["result_data"];
    failReason: AiTask["fail_reason"];
    completedAt: AiTask["completed_at"];
  }>;
}

/**
 * AI 提供商基类
 * 使用依赖注入模式，通过构造函数接收具体实现
 */
export class BaseProvider<Model = "", TParams = unknown> {
  readonly type: Model;

  // 直接从 ProviderConfig 中推导方法类型
  readonly transformParams: ProviderConfig<Model, TParams>["transformParams"];
  readonly calculateCredits: ProviderConfig<Model, TParams>["calculateCredits"];
  readonly createTask: ProviderConfig<Model, TParams>["createTask"];
  readonly startTask: ProviderConfig<Model, TParams>["startTask"];
  readonly queryTask: ProviderConfig<Model, TParams>["queryTask"];

  constructor(config: ProviderConfig<Model, TParams>) {
    this.type = config.type;

    this.transformParams = config.transformParams.bind(this);
    this.calculateCredits = config.calculateCredits.bind(this);
    this.createTask = config.createTask.bind(this);
    this.startTask = config.startTask.bind(this);
    this.queryTask = config.queryTask.bind(this);
  }
}
