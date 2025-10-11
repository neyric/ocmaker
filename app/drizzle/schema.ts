import { relations, sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

// ======================= 表定义 =======================

export const users = sqliteTable(
  "users",
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()), // 主键，UUID
    username: text()
      .unique()
      .$defaultFn(() => nanoid(8)),
    email: text().notNull().unique(), // 用户邮箱，唯一
    password: text(), // 用户密码（可为空，适配第三方登录）
    nickname: text().notNull(), // 昵称
    avatar_url: text(), // 头像地址
    bio: text(), // 个人简介
    invite_code: text()
      .unique()
      .notNull()
      .$defaultFn(() => nanoid(8)), // 用户邀请码，8位唯一标识
    created_at: integer({ mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => [
    index("email_unique_idx").on(table.email), // 创建email索引以确保唯一性
    index("invite_code_unique_idx").on(table.invite_code), // 创建邀请码索引以确保唯一性
  ],
);

export const user_auth = sqliteTable("user_auth", {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()), // 主键
  user_id: text()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }), // 外键：关联users
  provider: text().notNull(), // 第三方平台名称
  openid: text().notNull(), // 第三方平台唯一标识
  created_at: integer({ mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()), // 创建时间
});

export const signin_logs = sqliteTable("signin_logs", {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  session: text(), // 该登录使用的 session id
  user_id: text()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }), // 外键：关联用户
  type: text().notNull(), // 登录方式，如 email、google
  ip: text(), // 登录时的 IP 地址
  user_agent: text(), // 用户 UA
  headers: text({ mode: "json" }), // 请求头（JSON）
  created_at: integer({ mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()), // 登录时间
});

export const orders = sqliteTable("orders", {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()), // 主键
  order_no: text({ length: 64 }).unique().notNull(), // 订单编号（唯一）
  order_detail: text({ mode: "json" }), // 商品的明细数据，即创建 order 时提供的参数，支付完成后依据该参数进行逻辑
  created_at: integer({ mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()), // 创建时间
  user_id: text()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }), // 外键：用户ID
  product_id: text({ length: 64 }).notNull(), // 商品ID，对应后 Provider 后台的商品 ID
  product_name: text({ length: 255 }).notNull(), // 商品名称
  amount: integer().notNull(), // 支付金额（单位：分）
  status: text({
    length: 20,
    enum: [
      "pending", // 等待支付（订单已创建但尚未支付）
      "paid", // 已支付（支付成功）
      "processing", // 支付后正在处理（可选，适用于需异步处理场景）
      "completed", // 已完成（服务或商品交付完毕）
      "refunding", // 退款中（用户申请退款或系统发起）
      "refunded", // 已退款
      "cancelled", // 已取消（未支付前用户主动取消）
      "expired", // 已过期（如未支付并超过有效期）
    ],
  })
    .notNull()
    .default("pending"), // 订单状态
  pay_session_id: text().unique(), // 支付会话ID
  pay_provider: text({ enum: ["creem"] }).default("creem"), // 支付服务提供商（如 Creem）
  session_detail: text({ mode: "json" }), // 订单详情，创建 session 获取到的 JSON 数据
  paid_at: integer({ mode: "timestamp" }), // 实际支付时间
  paid_email: text(), // 支付时填写的邮箱
  paid_detail: text({ mode: "json" }), // 支付明细，支付完成后最终获取到的支付明细数据
  is_error: integer({ mode: "boolean" }),
  error_msg: text(),
  sub_id: text(), // 第三方订阅ID（如 Creem subscription ID）
  subscription_id: text().references(() => subscriptions.id, {
    onDelete: "restrict",
  }), // 关联的订阅记录（可为空）
});

export const credit_records = sqliteTable("credit_records", {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()), // 积分记录编码
  user_id: text()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }), // 对应的用户
  credits: integer().notNull(), // 本次获得积分数量
  remaining_credits: integer().notNull(), // 当前剩余未消耗积分（默认为 credits 值）
  record_type: text({
    enum: [
      "initialize", // 初始积分
      "purchase", // 购买的积分
      "subscription", // 订阅赠送的积分
      "adjustment", // 手动赠送的积分
      "invite_reward", // 邀请赠送的积分
      "checkin", // 签到赠送的积分
    ],
  }).notNull(),
  note: text(), // 该 credit 的备注信息
  source_type: text({
    enum: ["order", "subscription", "checkin", "invite"],
  }), // 关联的实体类型，即购买获得，订阅获得，签到获得，邀请获得
  source_id: text(), // 可选的关联实体ID（如 order_no / subscription_id）
  expired_at: integer({ mode: "timestamp" }), // 有效期字段（可为空表示永久）
  created_at: integer({ mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updated_at: integer({ mode: "timestamp" })
    .notNull()
    .$onUpdateFn(() => new Date()),
});

export const credit_consumptions = sqliteTable("credit_consumptions", {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  user_id: text()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  credits: integer().notNull(), // 本次消耗的积分数量
  credit_record_id: text()
    .notNull()
    .references(() => credit_records.id, {
      onDelete: "restrict",
    }), // 消耗关联的是自哪一笔积分记录
  source_type: text({ enum: ["ai_task", "consumption"] }), // 消耗的实体类型
  source_id: text(), // 消耗的实体 ID 例如（task_no）
  reason: text(), // 消耗的理由
  created_at: integer({ mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const subscriptions = sqliteTable("subscriptions", {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()), // 主键
  user_id: text()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }), // 外键：用户ID
  plan_type: text({
    enum: ["starter", "plus", "premium"],
  }).notNull(), // 订阅计划类型
  status: text({
    enum: [
      "active", // 订阅激活中（用户已订阅，正在使用中）
      "cancelled", // 订阅已取消（用户主动取消，或平台取消）
      "expired", // 订阅已过期（即到期未支付）
    ],
  }).notNull(), // 当前订阅状态
  interval: text({ enum: ["month", "year"] })
    .notNull()
    .default("month"), // 周期
  interval_count: integer().default(1), // 周期间隔数量（例如每 1 月 / 每 1 年）
  platform_sub_id: text(), // 第三方平台订阅ID（即 Creem 的 Subscribe ID）
  start_at: integer({ mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()), // 启用时间
  expired_at: integer({ mode: "timestamp" }).notNull(), // 截止日期（到这个时间，就需要检查订阅是否还在）
  last_payment_at: integer({ mode: "timestamp" }).notNull(), // 最后一次支付时间
  cancel_at: integer({ mode: "timestamp" }), // 取消时间（主动取消时间）
  created_at: integer({ mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()), // 创建时间
});

export const ai_tasks = sqliteTable("ai_tasks", {
  task_no: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()), // Primary KEY
  user_id: text().references(() => users.id, { onDelete: "cascade" }),
  created_at: integer({ mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  credits: integer().notNull().default(0),
  task_type: text({
    enum: ["image", "video", "audio"],
  }).notNull(), // 任务类型
  status: text({
    enum: ["pending", "running", "succeeded", "failed"],
  }).notNull(), // 当前任务状态
  input_params: text({ mode: "json" }).notNull(), // 用户发起任务时的参数（JSON）
  estimated_start_at: integer({ mode: "timestamp" }).notNull(), // 预计开始时间（程序内计算得出，创建 task 时计算）
  ext: text({ mode: "json" }).$type<Record<string, unknown>>(), // 额外的附加信息
  // 系统内结果数据
  started_at: integer({ mode: "timestamp" }), // 实际任务开始时间
  completed_at: integer({ mode: "timestamp" }), // 任务完成时间
  aspect: text().default("1:1").notNull(),
  poster_url: text(), // 视频 Task 的封面图，仅 Video 类型需要
  result_url: text(), // 返回的结果图片地址
  fail_reason: text(), // 失败原因（从外部系统的返回结果中获取）
  // 外部接口提供方数据
  provider: text().notNull(), // 外部系统的提供方，用来判断外部接口调用
  task_id: text(), // 外部系统的任务编号，任务未开始时可以为 null
  request_param: text({ mode: "json" }), // 调用外部系统提供的参数
  result_data: text({ mode: "json" }), // 执行完成后结果（JSON，可为空）
  credits_deducted: integer({ mode: "boolean" }).notNull().default(false), // 是否已经扣除了积分
  credits_refund: integer({ mode: "boolean" }).notNull().default(false), // 是否已经退回了积分（针对失败的 task 判断）
});

export const characters = sqliteTable("characters", {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  user_id: text()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text().notNull(),
  description: text(),
  image_url: text().notNull(),
  aspect: text().default("1:1"),
  source_task_no: text().references(() => ai_tasks.task_no, {
    onDelete: "set null",
  }),
  source_params: text({ mode: "json" }),
  is_public: integer({ mode: "boolean" }).notNull().default(false),
  category: text().default("general"),
  tags: text({ mode: "json" }).$type<string[]>().default([]),
  likes_count: integer().notNull().default(0),
  comments_count: integer().notNull().default(0),
  views_count: integer().notNull().default(0),
  created_at: integer({ mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  updated_at: integer({ mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`)
    .$onUpdateFn(() => new Date()),
});

// Daily check-in 表 - 用户每日签到记录
export const daily_checkins = sqliteTable(
  "daily_checkins",
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()), // 主键
    user_id: text()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }), // 外键：用户ID
    checkin_date: text().notNull(), // 签到日期（格式：YYYY-MM-DD）
    credits_earned: integer().notNull(), // 获得的积分数量（60-100随机）
    consecutive_days: integer().notNull().default(1), // 连续签到天数
    created_at: integer({ mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()), // 签到时间
  },
  (table) => [
    // 确保每个用户每天只能签到一次
    index("user_date_unique_idx").on(table.user_id, table.checkin_date),
  ],
);

// Invitations 表 - 邀请关系记录
export const invitations = sqliteTable(
  "invitations",
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()), // 主键
    inviter_user_id: text()
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }), // 邀请人用户ID
    invitee_user_id: text()
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }), // 被邀请人用户ID
    invite_code: text().notNull(), // 使用的邀请码
    reward_credits: integer().notNull().default(500), // 奖励积分数量
    status: text({ enum: ["pending", "completed", "cancelled"] })
      .notNull()
      .default("pending"), // 邀请状态
    created_at: integer({ mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()), // 邀请关系建立时间
    completed_at: integer({ mode: "timestamp" }), // 奖励发放完成时间
  },
  (table) => [
    index("invitee_unique_idx").on(table.invitee_user_id), // 每个用户只能被邀请一次
    index("inviter_idx").on(table.inviter_user_id), // 邀请人索引，用于查询邀请列表
  ],
);

// ======================= 关系定义 =======================

export const users_relations = relations(users, ({ many }) => ({
  auths: many(user_auth), // 一对多：用户拥有多个第三方认证
  signin_logs: many(signin_logs), // 登录记录
  credits: many(credit_records), // 一对多：用户的积分记录
  credits_consumptions: many(credit_consumptions),
  orders: many(orders), // 一对多：订单
  subscriptions: many(subscriptions), // 一对多：订阅
  ai_tasks: many(ai_tasks),
  characters: many(characters),
  daily_checkins: many(daily_checkins), // 一对多：用户的签到记录
  sent_invitations: many(invitations, {
    relationName: "inviter", // 用户发出的邀请
  }),
  received_invitations: many(invitations, {
    relationName: "invitee", // 用户收到的邀请（被邀请记录）
  }),
}));

export const user_auth_relations = relations(user_auth, ({ one }) => ({
  user: one(users, {
    fields: [user_auth.user_id],
    references: [users.id],
  }),
}));

export const signin_logs_relations = relations(signin_logs, ({ one }) => ({
  user: one(users, {
    fields: [signin_logs.user_id],
    references: [users.id],
  }),
}));

export const orders_relations = relations(orders, ({ one }) => ({
  user: one(users, {
    fields: [orders.user_id],
    references: [users.id],
  }),
  subscription: one(subscriptions, {
    fields: [orders.subscription_id],
    references: [subscriptions.id],
  }),
}));

export const credits_relations = relations(credit_records, ({ one, many }) => ({
  user: one(users, {
    fields: [credit_records.user_id],
    references: [users.id],
  }),
  consumptions: many(credit_consumptions), // 一条 credit_record 可被多次消耗
}));

export const credit_consumptions_relations = relations(
  credit_consumptions,
  ({ one }) => ({
    user: one(users, {
      fields: [credit_consumptions.user_id],
      references: [users.id],
    }),
    credit_record: one(credit_records, {
      fields: [credit_consumptions.credit_record_id],
      references: [credit_records.id],
    }),
  }),
);

export const subscriptions_relations = relations(
  subscriptions,
  ({ one, many }) => ({
    user: one(users, {
      fields: [subscriptions.user_id],
      references: [users.id],
    }),
    orders: many(orders), // 一对多：订阅关联的订单
  }),
);

export const ai_tasks_relations = relations(ai_tasks, ({ one, many }) => ({
  user: one(users, {
    fields: [ai_tasks.user_id],
    references: [users.id],
  }),
  characters: many(characters),
}));

export const characters_relations = relations(characters, ({ one }) => ({
  user: one(users, {
    fields: [characters.user_id],
    references: [users.id],
  }),
  source_task: one(ai_tasks, {
    fields: [characters.source_task_no],
    references: [ai_tasks.task_no],
  }),
}));

export const daily_checkins_relations = relations(
  daily_checkins,
  ({ one }) => ({
    user: one(users, {
      fields: [daily_checkins.user_id],
      references: [users.id],
    }),
  }),
);

export const invitations_relations = relations(invitations, ({ one }) => ({
  inviter: one(users, {
    fields: [invitations.inviter_user_id],
    references: [users.id],
    relationName: "inviter", // 邀请人关系
  }),
  invitee: one(users, {
    fields: [invitations.invitee_user_id],
    references: [users.id],
    relationName: "invitee", // 被邀请人关系
  }),
}));

// ======================= 类型定义 =======================

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export type UserAuth = typeof user_auth.$inferSelect;
export type InsertUserAuth = typeof user_auth.$inferInsert;

export type SigninLog = typeof signin_logs.$inferSelect;
export type InsertSigninLog = typeof signin_logs.$inferInsert;

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;

export type Credit = typeof credit_records.$inferSelect;
export type InsertCredit = typeof credit_records.$inferInsert;

export type CreditConsumption = typeof credit_consumptions.$inferSelect;
export type InsertCreditConsumption = typeof credit_consumptions.$inferInsert;

export type Subscription = typeof subscriptions.$inferSelect;
export type InsertSubscription = typeof subscriptions.$inferInsert;

export type AiTask = typeof ai_tasks.$inferSelect;
export type InsertAiTask = typeof ai_tasks.$inferInsert;

export type Character = typeof characters.$inferSelect;
export type InsertCharacter = typeof characters.$inferInsert;

export type DailyCheckin = typeof daily_checkins.$inferSelect;
export type InsertDailyCheckin = typeof daily_checkins.$inferInsert;

export type Invitation = typeof invitations.$inferSelect;
export type InsertInvitation = typeof invitations.$inferInsert;
