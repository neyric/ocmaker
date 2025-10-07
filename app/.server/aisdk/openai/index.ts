import { env } from "cloudflare:workers";
import OpenAI from "openai";

export const getOpenAIModel = () => {
  const openai = new OpenAI({
    apiKey: env.OPENAI_KEY,
    baseURL: env.OPENAI_BASE_URL,
  });

  return openai;
};
