import { desc, eq } from "drizzle-orm";
import type { Invitation } from "~/.server/libs/db";
import { connectDB, schema } from "~/.server/libs/db";

// 获取用户的邀请列表（我邀请的用户列表）
export const getUserInvitations = async (
  userId: Invitation["inviter_user_id"],
) => {
  const db = connectDB();

  return db.query.invitations.findMany({
    where: eq(schema.invitations.inviter_user_id, userId),
    with: {
      invitee: {
        columns: {
          id: true,
          nickname: true,
          avatar_url: true,
          email: true,
          created_at: true,
        },
      },
    },
    orderBy: [desc(schema.invitations.created_at)],
  });
};
