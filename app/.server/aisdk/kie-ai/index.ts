import { env } from "cloudflare:workers";
import { KieAISDK } from "kieai-sdk";

export function getKieAI() {
  return new KieAISDK({
    apiKey: env.KIEAI_APIKEY,
  });
}
