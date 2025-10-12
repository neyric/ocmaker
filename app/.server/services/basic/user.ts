import { env } from "cloudflare:workers";
import { nanoid } from "nanoid";
import { uploadFiles } from "~/.server/libs/cloudflare/r2-bucket";
import type { InsertUser, User } from "~/.server/libs/db";
import { getActiveSubscriptionsByUserId } from "~/.server/model/subscriptions";
import {
  getUserById,
  getUserByUsername,
  updateUser,
} from "~/.server/model/user";
import { type UpdateProfileDTO } from "~/schema/profile";
import { getUserCredits } from "./credits";

export const convertUserInfo = (user: User, encodeEmail = true) => {
  const [account, domain] = user.email.split("@");
  const mail = account
    .slice(0, 2)
    .concat(
      Array.from({ length: account.slice(2).length }, () => "*").join("")
    );

  const userInfo: UserInfo = {
    name: user.nickname,
    user_name: user.username,
    bio: user.bio,
    email: encodeEmail ? [mail, domain].join("@") : user.email,
    avatar: user.avatar_url,
    invite_code: user.invite_code,
    created_at: user.created_at.valueOf(),
  };

  return userInfo;
};

export const getUserInfoByUsername = async (userId: string) => {
  const user = await getUserByUsername(userId);
  if (!user) return null;

  const userInfo = convertUserInfo(user);

  return userInfo;
};

export const getUserInfoById = async (userId: User["id"]) => {
  const user = await getUserById(userId);
  if (!user) return null;

  const userInfo = convertUserInfo(user);

  return userInfo;
};

export const getUserInfoAndCredits = async (user?: User | null) => {
  let user_info: UserInfo | null = null;
  let credits = 0;
  if (user) {
    const newUser = await getUserById(user.id);
    if (newUser) user = newUser;

    user_info = convertUserInfo(user, false);

    const { balance } = await getUserCredits(user);
    credits = balance;
  }

  const subscription = await getUserSubscription(user);

  return { user_info, credits, subscription };
};

export const getUserSubscription = async (user?: User | null) => {
  if (!user) return null;
  const subscription = await getActiveSubscriptionsByUserId(user.id);
  return subscription;
};

export const updateUserInfo = async (
  values: UpdateProfileDTO,
  userId: User["id"]
) => {
  const value: Partial<InsertUser> = {
    username: values.username,
    nickname: values.nickname,
    bio: values.bio,
  };

  const oldUser = await getUserById(userId);
  if (!oldUser) throw Error("Unvalid User ID");
  if (value.username && oldUser.username !== value.username) {
    const result = await getUserByUsername(value.username);
    if (result) throw Error("Username is already taken");
  }

  if (values.avatar) {
    const extName = values.avatar.name.split(".").pop()!;
    const newFileName = `${nanoid()}.${extName}`;
    const file = new File([values.avatar], newFileName);

    const [avatarFile] = await uploadFiles(file, "users");
    value.avatar_url = new URL(avatarFile.key, env.CDN_URL).toString();
  }

  const [user] = await updateUser(userId, value);
  return user;
};
