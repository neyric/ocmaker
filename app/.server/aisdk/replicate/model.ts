import { env } from "cloudflare:workers";
import Replicate from "replicate";

export const getReplicate = () => {
  const replicate = new Replicate({
    auth: env.REPLICATE_API_KEY,
  });

  return replicate;
};
