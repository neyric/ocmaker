import type { AuthResult } from "~/routes/_api/basic/auth/route";
import type { AuthGoogleDTO } from "~/schema/auth";

export { type AuthResult };

export async function auth(): Promise<AuthResult> {
  const response = await fetch("/api/auth");

  if (!response.ok) throw Error(response.statusText);

  return response.json();
}

export async function googleOAuth(payload: AuthGoogleDTO): Promise<AuthResult> {
  // Get invite_code from localStorage
  const inviteCode = localStorage.getItem("invite_code");

  const requestPayload = {
    ...payload,
    invite_code: inviteCode || undefined,
  };

  const response = await fetch("/api/auth", {
    method: "post",
    body: JSON.stringify(requestPayload),
  });

  if (!response.ok) throw Error(response.statusText);

  // Clear invite_code from localStorage after successful login
  if (inviteCode) {
    localStorage.removeItem("invite_code");
  }

  return response.json();
}
