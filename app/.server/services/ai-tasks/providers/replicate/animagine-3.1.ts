import type { GenerateAnimagineImagePayload } from "~/.server/aisdk/replicate/animagine";
import {
  createBackgroundTask,
  getBackgroundTaskResult,
} from "~/.server/aisdk/replicate/animagine";
import { BaseProvider, type ProviderConfig } from "../../core/base-provider";

const config: ProviderConfig<
  "replicate/animagine-3.1",
  GenerateAnimagineImagePayload
> = {
  type: "replicate/animagine-3.1",
  transformParams(values) {
    if (values.model !== this.type) {
      throw Error("Invalid model type");
    }

    if (!values.prompt) throw Error("Prompt is required");

    const params: GenerateAnimagineImagePayload = {
      prompt: values.prompt,
      negative_prompt: values.negativePrompt ?? undefined,
      aspectRatio: values.aspectRatio,
      num_inference_steps: values.numInferenceSteps ?? undefined,
      guidance_scale: values.guidanceScale ?? undefined,
      quality_selector: values.qualitySelector ?? undefined,
      style_selector: values.styleSelector ?? undefined,
      seed: values.seed ?? undefined,
      webhook: values.webhook ?? undefined,
    };

    return params;
  },
  createTask(values) {
    const params = this.transformParams(values);
    const ext =
      values.model === "replicate/animagine-3.1" ? values.ext : undefined;

    return {
      taskType: "image",
      provider: this.type,
      aspectRatio: values.aspectRatio,
      requestParam: params,
      ext: ext,
    };
  },
  calculateCredits() {
    return 30;
  },
  async startTask(task) {
    const { provider, request_param } = task;
    if (!request_param || provider !== this.type) {
      throw Error("Invalid parameters");
    }

    const result = await createBackgroundTask(
      request_param as GenerateAnimagineImagePayload
    );

    return { taskId: result.id, startedAt: new Date() };
  },
  async queryTask(task) {
    const { task_id, provider } = task;
    if (!task_id || provider !== this.type) {
      throw Error("Unvalid TaskID");
    }

    const response = await getBackgroundTaskResult(task_id);

    let status = task.status;
    let completedAt = task.completed_at;
    let resultUrl = task.result_url;
    let failReason = task.fail_reason;

    if (status === "running") {
      switch (response.status) {
        case "failed": {
          status = "failed";
          failReason = response.error ? `${response.error}` : "Generate Failed";
          completedAt = response.completed_at
            ? new Date(response.completed_at)
            : null;
          break;
        }
        case "succeeded": {
          completedAt = response.completed_at
            ? new Date(response.completed_at)
            : null;

          if (!response.output || typeof response.output !== "string") {
            status = "failed";
            failReason = "Generate Failed, No result found";
          } else {
            status = "succeeded";
            resultUrl = response.output;
          }

          break;
        }
        default:
          break;
      }
    }

    return {
      taskId: task_id,
      resultData: response,
      status,
      completedAt,
      resultUrl,
      failReason,
    };
  },
};

export const animagine3xProvider = new BaseProvider(config);
