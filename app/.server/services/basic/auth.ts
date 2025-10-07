import { env } from "cloudflare:workers";
import type { InsertUser, InsertUserAuth, User } from "~/.server/libs/db";
import { insertCreditRecord } from "~/.server/model/credit_record";
import { createInvitation } from "~/.server/model/invitations";
import { insertSigninLog } from "~/.server/model/signin_log";
import {
  getUserByEmail,
  getUserByInviteCode,
  insertUser,
} from "~/.server/model/user";
import {
  getUserAuthByProvider,
  insertUserAuth,
} from "~/.server/model/user_auth";

export const createUser = async (newUser: InsertUser) => {
  const [createdUser] = await insertUser(newUser);
  const initlizeCredits = env.INITLIZE_CREDITS;
  if (initlizeCredits) {
    await insertCreditRecord({
      user_id: createdUser.id,
      credits: initlizeCredits,
      remaining_credits: initlizeCredits,
      record_type: "initialize",
    });
  }

  return createdUser;
};
/**
 * Google OAuth login process
 * @param profile User profile obtained from Google OAuth
 * @param invite_code Invite code (optional)
 */
export const googleOAuthLogin = async (params: {
  profile: GoogleUserInfo;
  request: Request;
  session: string;
  invite_code?: string;
}) => {
  const { session, profile, request, invite_code } = params;

  const provider = "google";
  const { sub: openid, email, name, picture: avatar } = profile;

  // 1. Query if user with same email exists, assign if exists, insert if not
  let user: User | null = null;
  let isNewUser = false;
  const result = await getUserByEmail(email);
  if (!result) {
    isNewUser = true;
    const newUser: InsertUser = {
      email,
      nickname: name,
      avatar_url: avatar,
    };
    user = await createUser(newUser);
  } else {
    user = result;
  }

  // 2. Handle invite code logic (for new users only)
  if (isNewUser && invite_code) {
    // Validate invite code
    const inviter = await getUserByInviteCode(invite_code);

    if (inviter && inviter.id !== user.id) {
      const rewardCredits = env.INVITE_REWARD_CREDITS;

      // Create invitation record
      await createInvitation({
        inviter_user_id: inviter.id,
        invitee_user_id: user.id,
        invite_code: invite_code,
        reward_credits: rewardCredits,
        status: "completed",
      });

      // Add credits to inviter
      await insertCreditRecord({
        user_id: inviter.id,
        credits: rewardCredits,
        remaining_credits: rewardCredits,
        record_type: "invite_reward",
        note: `Invite reward from user ${user.email}`,
      });

      // Add credits to invitee (new user)
      await insertCreditRecord({
        user_id: user.id,
        credits: rewardCredits,
        remaining_credits: rewardCredits,
        record_type: "invite_reward",
        note: `Signup bonus with invite code ${invite_code}`,
      });
    }
  }

  // 3. Query if provider is bound, create binding record if not
  const userAuth = await getUserAuthByProvider(provider, openid);
  if (!userAuth) {
    const newAuth: InsertUserAuth = {
      user_id: user.id,
      provider,
      openid,
    };
    await insertUserAuth(newAuth);
  }

  // 4. Record login log
  const ip = request.headers.get("x-real-ip");
  const ua = request.headers.get("user-agent");
  const headers = Object.fromEntries(request.headers.entries());
  await insertSigninLog({
    session: session,
    user_id: user.id,
    type: provider,
    ip,
    user_agent: ua,
    headers,
  });

  return user;
};
