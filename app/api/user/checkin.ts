import type { CheckinResult, CheckinStats } from "~/routes/_api/basic/checkin";

/**
 * 获取签到状态
 */
export async function getCheckinStatus(): Promise<CheckinStats> {
  const response = await fetch("/api/checkin", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

/**
 * 执行签到
 */
export async function performCheckin(): Promise<CheckinResult> {
  const response = await fetch("/api/checkin", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}
