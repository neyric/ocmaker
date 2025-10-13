import type { CommunityResult } from "~/routes/_api/basic/_pub.community.($id)/route";

export type CommunityItem = CommunityResult["items"][number];
export type { CommunityResult };

interface CommunityFetchOptions {
  cursor?: string | null;
  signal?: AbortSignal;
}

export async function community(
  options: CommunityFetchOptions = {},
): Promise<CommunityResult> {
  const cursor = options.cursor ?? null;
  const endpoint = cursor
    ? `/api/community/${encodeURIComponent(cursor)}`
    : "/api/community";

  const response = await fetch(endpoint, {
    signal: options.signal,
  });

  if (!response.ok) {
    const errorText = await response
      .text()
      .catch(() => "Failed to fetch characters");
    throw new Error(errorText || "Failed to fetch characters");
  }

  return response.json() as Promise<CommunityResult>;
}
