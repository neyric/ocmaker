import { env } from "cloudflare:workers";
import dayjs from "dayjs";
import { and, desc, eq, sql } from "drizzle-orm";
import type { DailyCheckin, InsertCredit } from "~/.server/libs/db";
import { connectDB, schema } from "~/.server/libs/db";

export class CheckinService {
  /**
   * 检查用户今日是否已签到
   */
  async hasCheckedInToday(userId: DailyCheckin["user_id"]): Promise<boolean> {
    const db = connectDB();
    const today = dayjs().format("YYYY-MM-DD");

    const result = await db
      .select()
      .from(schema.daily_checkins)
      .where(
        and(
          eq(schema.daily_checkins.user_id, userId),
          eq(schema.daily_checkins.checkin_date, today),
        ),
      )
      .limit(1);

    return result.length > 0;
  }

  /**
   * 获取用户最近的签到记录，用于计算连续签到天数
   */
  private async getLastCheckin(userId: DailyCheckin["user_id"]) {
    const db = connectDB();

    const result = await db
      .select()
      .from(schema.daily_checkins)
      .where(eq(schema.daily_checkins.user_id, userId))
      .orderBy(desc(schema.daily_checkins.checkin_date))
      .limit(1);

    return result[0] || null;
  }

  /**
   * 计算签到奖励积分
   * 随机获得配置范围内的积分
   */
  private calculateRewardCredits(): number {
    const min = env.CHECKIN_MIN_CREDITS;
    const max = env.CHECKIN_MAX_CREDITS;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * 执行签到
   */
  async checkIn(userId: DailyCheckin["user_id"]) {
    const db = connectDB();
    const today = dayjs().format("YYYY-MM-DD");

    // 检查是否已签到
    const hasCheckedIn = await this.hasCheckedInToday(userId);
    if (hasCheckedIn) {
      throw new Error("Já fez check-in hoje");
    }

    // 获取最近签到记录
    const lastCheckin = await this.getLastCheckin(userId);

    // 计算连续签到天数
    let consecutiveDays = 1;
    let bonusCredits = 0;
    let newCycle = false;

    if (lastCheckin) {
      const yesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD");

      if (lastCheckin.checkin_date === yesterday) {
        consecutiveDays = lastCheckin.consecutive_days + 1;

        // 检查是否达到7天
        if (consecutiveDays === 7) {
          bonusCredits = env.CHECKIN_STREAK_BONUS;
          // 达到7天后，下次签到将重新开始新周期
        } else if (consecutiveDays > 7) {
          // 如果超过7天，重置为新周期的第1天
          consecutiveDays = 1;
          newCycle = true;
        }
      }
    }

    // 计算基础奖励积分
    const baseCredits = this.calculateRewardCredits();
    const totalCreditsEarned = baseCredits + bonusCredits;

    // 创建签到记录
    const [checkin] = await db
      .insert(schema.daily_checkins)
      .values({
        user_id: userId,
        checkin_date: today,
        credits_earned: totalCreditsEarned,
        consecutive_days: consecutiveDays,
      })
      .returning();

    // 增加基础积分记录
    const baseCreditRecord: InsertCredit = {
      user_id: userId,
      credits: baseCredits,
      remaining_credits: baseCredits,
      record_type: "checkin",
      source_type: "checkin",
      source_id: checkin.id,
      note: `Recompensa de check-in diário`,
    };

    await db.insert(schema.credit_records).values(baseCreditRecord);

    // 如果有额外奖励，创建额外积分记录
    if (bonusCredits > 0) {
      const bonusCreditRecord: InsertCredit = {
        user_id: userId,
        credits: bonusCredits,
        remaining_credits: bonusCredits,
        record_type: "checkin",
        source_type: "checkin",
        source_id: checkin.id,
        note: `Bônus de sequência de 7 dias`,
      };

      await db.insert(schema.credit_records).values(bonusCreditRecord);
    }

    // 获取用户当前总积分
    const totalCreditsResult = await db
      .select({
        total: sql<number>`SUM(remaining_credits)`,
      })
      .from(schema.credit_records)
      .where(eq(schema.credit_records.user_id, userId));

    const totalCredits = totalCreditsResult[0]?.total || 0;

    return {
      today: today,
      credits_earned: baseCredits,
      bonus_credits: bonusCredits > 0 ? bonusCredits : undefined,
      consecutive_days: consecutiveDays,
      total_credits: totalCredits,
      new_cycle: newCycle || undefined,
    };
  }

  /**
   * 获取用户签到统计信息
   */
  async getCheckinStats(userId: DailyCheckin["user_id"]) {
    const db = connectDB();

    // await db.delete(schema.daily_checkins).where(
    //   eq(schema.daily_checkins.user_id, userId)
    // );

    // 检查今日是否已签到
    const hasCheckedInToday = await this.hasCheckedInToday(userId);

    // 获取最近的签到记录
    const lastCheckin = await this.getLastCheckin(userId);

    // 获取总签到天数
    const totalDaysResult = await db
      .select({
        count: sql<number>`COUNT(*)`,
      })
      .from(schema.daily_checkins)
      .where(eq(schema.daily_checkins.user_id, userId));

    const totalDays = totalDaysResult[0]?.count || 0;

    // 计算当前连续签到天数
    let consecutiveDays = 0;

    if (lastCheckin) {
      const today = dayjs().format("YYYY-MM-DD");
      const yesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD");

      // 如果今天已签到，返回今天的连续天数
      if (lastCheckin.checkin_date === today) {
        consecutiveDays = lastCheckin.consecutive_days;
      }
      // 如果昨天签到了（但今天还没签），连续天数保持
      else if (lastCheckin.checkin_date === yesterday) {
        consecutiveDays = lastCheckin.consecutive_days;
      }
      // 如果最后签到日期既不是今天也不是昨天，连续天数归零
      else {
        consecutiveDays = 0;
      }
    }

    return {
      has_checked_in_today: hasCheckedInToday,
      consecutive_days: consecutiveDays,
      total_days: totalDays,
      last_checkin_date: lastCheckin?.checkin_date || null,
    };
  }
}
