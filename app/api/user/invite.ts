import type { InvitesResult } from "~/routes/_api/basic/invites/route";

// 获取邀请数据
export async function getInviteData(): Promise<InvitesResult> {
  const response = await fetch("/api/invites");

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}
