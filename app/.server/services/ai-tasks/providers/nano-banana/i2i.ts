import { KieError, type NanoBananaEditGenerateOptions } from "kieai-sdk";
import { getKieAI } from "~/.server/aisdk/kie-ai";

import { BaseProvider, type ProviderConfig } from "../../core/base-provider";

const config: ProviderConfig<
  "google/nano-banana-i2i",
  NanoBananaEditGenerateOptions
> = {
  type: "google/nano-banana-i2i",
  transformParams(values) {
    if (values.model !== this.type) {
      throw Error("Invalid model type");
    }

    if (!values.image) throw Error("Image URL is required");
    if (!values.prompt) throw Error("Prompt is required");

    const params: NanoBananaEditGenerateOptions = {
      prompt: values.prompt,
      image_urls: [values.image],
      image_size: "auto",
    };

    return params;
  },
  createTask(values) {
    const params = this.transformParams(values);

    return {
      taskType: "image",
      provider: this.type,
      aspectRatio: values.aspectRatio,
      requestParam: params,
    };
  },
  calculateCredits(values) {
    // TODO: Calculate credit consumption based on specific parameters, currently returning fixed value
    return 1;
  },
  async startTask(task) {
    const { provider, request_param } = task;
    if (!request_param || provider !== this.type) {
      throw Error("Invalid parameters");
    }

    try {
      const kie = getKieAI();
      const result = await kie.nanoBanana.edit.createTask({
        input: request_param as NanoBananaEditGenerateOptions,
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
      const response = await kie.nanoBanana.edit.getTaskRecord(task_id);

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

export const nanoBananaI2IProvider = new BaseProvider(config);
