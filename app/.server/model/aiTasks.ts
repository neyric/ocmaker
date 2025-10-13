import { and, desc, eq } from "drizzle-orm";
import { connectDB, type InsertAiTask, schema } from "~/.server/libs/db";

export const findByTaskNo = (taskNo: string) => {
  const db = connectDB();
  return db.query.ai_tasks.findFirst({
    where: eq(schema.ai_tasks.task_no, taskNo),
  });
};

export const findByTaskId = (taskId: string) => {
  const db = connectDB();
  return db.query.ai_tasks.findFirst({
    where: eq(schema.ai_tasks.task_id, taskId),
  });
};

export const insertTask = async (values: InsertAiTask) => {
  const db = connectDB();
  const [result] = await db.insert(schema.ai_tasks).values(values).returning();

  return result;
};

export const findSucceededTasksByUserId = (userId: string) => {
  const db = connectDB();
  return db.query.ai_tasks.findMany({
    where: and(
      eq(schema.ai_tasks.user_id, userId),
      eq(schema.ai_tasks.status, "succeeded"),
    ),
    orderBy: [desc(schema.ai_tasks.created_at)],
  });
};

export const updateByTaskNo = async (
  taskNo: string,
  values: Partial<InsertAiTask>,
) => {
  const db = connectDB();
  const [result] = await db
    .update(schema.ai_tasks)
    .set(values)
    .where(eq(schema.ai_tasks.task_no, taskNo))
    .returning();

  return result;
};
