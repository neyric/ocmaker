import type { InsertInvitation } from "~/.server/libs/db";
import { connectDB, schema } from "~/.server/libs/db";

// 创建邀请记录
export const createInvitation = async (invitation: InsertInvitation) => {
  const db = connectDB();
  return await db.insert(schema.invitations).values(invitation).returning();
};
