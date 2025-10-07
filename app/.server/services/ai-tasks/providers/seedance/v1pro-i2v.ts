import currency from "currency.js";
import { KieError, type SeeDanceI2VGenerateOptions } from "kieai-sdk";
import { getKieAI } from "~/.server/aisdk/kie-ai";
import { BaseProvider, type ProviderConfig } from "../../core/base-provider";

const config: ProviderConfig<"seedance/v1pro-i2v", SeeDanceI2VGenerateOptions> =
  {
    type: "seedance/v1pro-i2v",
    transformParams(values) {
      if (values.model !== this.type) {
        throw Error("Unvalid model type");
      }

      if (!values.image) throw Error("Image url is required");
      if (!values.prompt) throw Error("Prompt is required");

      const params: SeeDanceI2VGenerateOptions = {
        prompt: values.prompt,
        image_url: values.image,
        duration: String(
          values.duration,
        ) as keyof SeeDanceI2VGenerateOptions["duration"],
        resolution: values.resolution,
        seed: values.seeds ? Number(values.seeds) : -1,
        camera_fixed: values.cameraFixed,
        enable_safety_checker: values.enableSafetyChecker,
        end_image_url: values.endImage ?? undefined,
      };

      return params;
    },
    createTask(values) {
      const params = this.transformParams(values);

      return {
        taskType: "video",
        provider: this.type,
        aspectRatio: values.aspectRatio,
        posterUrl: values.image,
        requestParam: params,
      };
    },
    calculateCredits(values) {
      if (values.model !== this.type) {
        throw Error("Unvalid model type");
      }
      const { duration, resolution } = values;

      let secondCredits: number;
      if (resolution === "480p") secondCredits = 3;
      else if (resolution === "720p") secondCredits = 6;
      else if (resolution === "1080p") secondCredits = 15;
      else secondCredits = 20;

      return currency(duration).multiply(secondCredits).value;
    },
    async startTask(task) {
      const { provider, request_param } = task;
      if (!request_param || provider !== this.type) {
        throw Error("Unvalid parameters");
      }

      try {
        const kie = getKieAI();
        const result = await kie.seeDance.v1ProI2V.createTask({
          input: request_param as SeeDanceI2VGenerateOptions,
        });

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
        const response = await kie.seeDance.v1ProI2V.getTaskRecord(task_id);

        let status = task.status;
        let completedAt = task.completed_at;
        let resultUrl = task.result_url;
        let failReason = task.fail_reason;

        if (status === "running") {
          const { result, failMsg, state, completeTime } = response;

          switch (state) {
            case "fail": {
              status = "failed";
              failReason = failMsg || "Generate Failed";
              completedAt = completeTime ? new Date(completeTime) : null;
              break;
            }
            case "success": {
              completedAt = completeTime ? new Date(completeTime) : null;

              if (!result || !result.resultUrls[0]) {
                status = "failed";
                failReason = failMsg || "Generate Failed, No result found";
              } else {
                status = "succeeded";
                resultUrl = result.resultUrls[0];
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
      } catch (e) {
        if (e instanceof KieError) {
          throw Error(e.message);
        }
        throw e;
      }
    },
  };

/**
 * Seedance Provider 实现
 * 用于处理 Seedance AI 服务的图像转视频任务
 */
export const seeDanceV1ProI2VProvider = new BaseProvider(config);
