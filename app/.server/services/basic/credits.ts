import currency from "currency.js";
import type {
  CreditConsumption,
  InsertCreditConsumption,
  User,
} from "~/.server/libs/db";
import {
  getCreditConsumptionsBySourceId,
  insertCreditConsumption,
} from "~/.server/model/credit_consumptions";
import {
  listActiveCreditsByUser,
  updateCreditRecord,
} from "~/.server/model/credit_record";

export const getUserCredits = async (user: User) => {
  const list = await listActiveCreditsByUser(user.id);
  const credits = list.reduce(
    (prev, item) => prev.add(item.remaining_credits),
    currency(0),
  );

  return { balance: credits.value, list };
};

export const consumptionsCredits = async (
  user: User,
  payload: {
    credits: number;
    source_type?: CreditConsumption["source_type"];
    source_id?: string;
    reason?: string;
  },
) => {
  const { balance, list } = await getUserCredits(user);
  if (balance < payload.credits) {
    throw Error("Insufficient credits");
  }

  // Sort by expiration time: items with expiration time first (ascending), items without expiration time last
  const sortedList = list
    .filter((item) => item.remaining_credits > 0) // Only process records with remaining credits
    .sort((a, b) => {
      if (a.expired_at && !b.expired_at) return -1; // If a has expiration time and b doesn't, a takes priority
      if (!a.expired_at && b.expired_at) return 1; // If a has no expiration time and b has, b takes priority

      // If both have expiration time, sort in ascending order (expiring first takes priority)
      if (a.expired_at && b.expired_at) {
        return a.expired_at.valueOf() - b.expired_at.valueOf();
      }
      // If neither has expiration time, sort by creation time ascending (created first takes priority)
      return a.created_at.valueOf() - b.created_at.valueOf();
    });

  let remainingCreditsToConsume = payload.credits;
  const consumptionRecords: InsertCreditConsumption[] = [];

  // Start deducting credits
  for (const creditRecord of sortedList) {
    if (remainingCreditsToConsume <= 0) break;

    const availableCredits = creditRecord.remaining_credits;
    const creditsToConsume = Math.min(
      availableCredits,
      remainingCreditsToConsume,
    );

    if (creditsToConsume > 0) {
      // Update remaining credits in credit record
      const newRemainingCredits = availableCredits - creditsToConsume;
      await updateCreditRecord(creditRecord.id, {
        remaining_credits: newRemainingCredits,
      });

      // Create consumption record
      const consumptionRecord: InsertCreditConsumption = {
        user_id: user.id,
        credits: creditsToConsume,
        credit_record_id: creditRecord.id,
        source_type: payload.source_type || null,
        source_id: payload.source_id || null,
        reason: payload.reason || null,
      };

      consumptionRecords.push(consumptionRecord);
      remainingCreditsToConsume -= creditsToConsume;
    }
  }

  // Batch insert consumption records
  if (consumptionRecords.length > 0) {
    await insertCreditConsumption(consumptionRecords);
  }

  return {
    consumed: payload.credits,
    consumptionRecords: consumptionRecords.length,
    remainingBalance: balance - payload.credits,
  };
};

export const refundAiTaskCredits = async (taskId: string) => {
  const items = await getCreditConsumptionsBySourceId(taskId);
  for (const item of items) {
    await insertCreditConsumption({
      user_id: item.user_id,
      credits: -item.credits,
      credit_record_id: item.credit_record_id,
      source_type: "consumption",
      source_id: item.id.toString(),
      reason: "AI task credits refund",
    });
    await updateCreditRecord(item.credit_record_id, {
      remaining_credits: currency(item.credit_record.remaining_credits).add(
        item.credits,
      ).value,
    });
  }
};
