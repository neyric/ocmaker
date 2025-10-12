import type { UpdateProfileDTO } from "~/schema/profile";

export async function updateProfile(data: UpdateProfileDTO): Promise<UserInfo> {
  const form = new FormData();
  form.set("nickname", data.nickname);
  form.set("username", data.username);
  form.set("bio", data.bio ?? "");
  if (data.avatar) form.set("avatar", data.avatar);

  const response = await fetch("/api/profile/update", {
    method: "POST",
    body: form,
  });

  if (!response.ok) {
    const json = await response
      .json<{ error: string }>()
      .catch(() => ({ error: "Fail to Update" }));
    throw new Error(json.error);
  }

  return response.json();
}
