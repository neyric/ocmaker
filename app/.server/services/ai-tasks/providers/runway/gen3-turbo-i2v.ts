import { KieError, type RunwayImageToVideoOptions } from "kieai-sdk";
import { getKieAI } from "~/.server/aisdk/kie-ai";

import { BaseProvider, type ProviderConfig } from "../../core/base-provider";

const config: ProviderConfig<
  "runway/gen3-turbo-i2v",
  RunwayImageToVideoOptions
> = {
  type: "runway/gen3-turbo-i2v",
  transformParams(values) {
    if (values.model !== this.type) {
      throw Error("Unvalid model type");
    }

    if (!values.image) throw Error("Image url is required");
    if (!values.prompt) throw Error("Prompt is required");

    const params: RunwayImageToVideoOptions = {
      prompt: values.prompt,
      imageUrl: values.image,
      duration: (values.duration || 5) as 5 | 10,
      quality: (values.resolution || "720p") as "720p" | "1080p",
      aspectRatio: (values.aspectRatio || "16:9") as
        | "16:9"
        | "9:16"
        | "1:1"
        | "4:3"
        | "3:4",
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
    // TODO: 根据具体参数计算积分消耗，暂时返回固定值
    return 1;
  },
  async startTask(task) {
    const { provider, request_param } = task;
    if (!request_param || provider !== this.type) {
      throw Error("Unvalid parameters");
    }

    try {
      const kie = getKieAI();
      const result = await kie.runway.generateImageToVideo(
        request_param as RunwayImageToVideoOptions,
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
      const response = await kie.runway.getTaskDetails(task_id);

      let status = task.status;
      let completedAt = task.completed_at;
      let resultUrl = task.result_url;
      let failReason = task.fail_reason;

      if (status === "running") {
        const { state, videoInfo, failMsg, generateTime } = response;

        switch (state) {
          case "fail":
            status = "failed";
            failReason = failMsg || "Generate Failed";
            completedAt = generateTime ? new Date(generateTime) : null;
            break;
          case "success":
            completedAt = generateTime ? new Date(generateTime) : null;

            if (!videoInfo || !videoInfo.video_url) {
              status = "failed";
              failReason = failMsg || "Generate Failed, No result found";
            } else {
              status = "succeeded";
              resultUrl = videoInfo.video_url;
            }
            break;
          case "wait":
          case "queueing":
          case "generating":
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
 * Runway Gen-3 Turbo Image to Video Provider 实现
 * 用于处理 Runway Gen-3 Turbo AI 服务的图像转视频任务（快速版本）
 */
export const runwayGen3TurboI2VProvider = new BaseProvider(config);
