import { CreemApiClient } from "./client";

export const createCreem = () => {
  let client: CreemApiClient = new CreemApiClient();

  return client;
};
