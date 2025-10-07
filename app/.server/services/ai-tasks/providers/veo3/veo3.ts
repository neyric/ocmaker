import currency from "currency.js";
import { KieError, type Veo3ImageToVideoOptions } from "kieai-sdk";
import { getKieAI } from "~/.server/aisdk/kie-ai";
import { BaseProvider, type ProviderConfig } from "../../core/base-provider";

const config: ProviderConfig<"google/veo3", Veo3ImageToVideoOptions> = {
  type: "google/veo3",
  transformParams(values) {
    if (values.model !== this.type) {
      throw Error("Unvalid model type");
    }

    if (!values.image) throw Error("Image url is required");
    if (!values.prompt) throw Error("Prompt is required");

    const params: Veo3ImageToVideoOptions = {
      prompt: values.prompt,
      imageUrl: values.image,
      model: "veo3",
      aspectRatio: values.aspectRatio,
      seeds: values.seeds ? Number(values.seeds) : undefined,
    };

    return params;
  },
  createTask(values) {
    const params = this.transformParams(values);

    return {
      taskType: "video",
      provider: this.type,
      aspectRatio: params.aspectRatio || "16:9",
      posterUrl: values.image,
      requestParam: params,
    };
  },
  calculateCredits(values) {
    if (values.model !== this.type) {
      throw Error("Unvalid model type");
    }
    const { aspectRatio } = values;

    let secondCredits: number;
    if (aspectRatio === "16:9") secondCredits = 150;
    else if (aspectRatio === "9:16") secondCredits = 150;
    else secondCredits = 20;

    return currency(secondCredits).value;
  },
  async startTask(task) {
    const { provider, request_param } = task;
    if (!request_param || provider !== this.type) {
      throw Error("Unvalid parameters");
    }

    try {
      const kie = getKieAI();
      const result = await kie.veo3.generateImageToVideo(
        request_param as Veo3ImageToVideoOptions,
      );

      return { taskId: result.taskId, startedAt: new Date() };
    } catch (e) {
      if (e instanceof KieError) {
        throw Error(e.message);
      }
      throw e;
    }
  },
  async queryTask(task) {
    const { task_id, provider } = task;
    if (!task_id || provider !== this.type) {
      throw Error("Unvalid TaskID");
    }
    try {
      const kie = getKieAI();
      const response = await kie.veo3.getTaskDetails(task_id);

      let status = task.status;
      let completedAt = task.completed_at;
      let resultUrl = task.result_url;
      let failReason = task.fail_reason;

      if (status === "running") {
        const {
          response: taskResponse,
          successFlag,
          errorMessage,
          completeTime,
        } = response;

        switch (successFlag) {
          case 2: // FAIL
          case 3: // GENERATE_FAIL
            status = "failed";
            failReason = errorMessage || "Generate Failed";
            completedAt = completeTime ? new Date(completeTime) : null;
            break;
          case 1: // SUCCESS
            completedAt = completeTime ? new Date(completeTime) : null;

            if (!taskResponse || !taskResponse.resultUrls[0]) {
              status = "failed";
              failReason = errorMessage || "Generate Failed, No result found";
            } else {
              status = "succeeded";
              resultUrl = taskResponse.resultUrls[0];
            }
            break;
          case 0: // GENERATING
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
    } catch (e) {
      if (e instanceof KieError) {
        throw Error(e.message);
      }
      throw e;
    }
  },
};

/**
 * Google Veo3 Provider 实现
 * 用于处理 Google Veo3 AI 服务的图像转视频任务
 */
export const veo3Provider = new BaseProvider(config);
