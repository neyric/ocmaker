import { env } from "cloudflare:workers";
import currency from "currency.js";
import dayjs from "dayjs";
import { PRODUCTS, type Product } from "~/.server/constants/product";
import { createCreem } from "~/.server/libs/creem";
import type { Customer, Subscription } from "~/.server/libs/creem/types";
import type { User } from "~/.server/libs/db";
import { insertCreditConsumption } from "~/.server/model/credit_consumptions";
import {
  getCreditRecordBySourceId,
  insertCreditRecord,
  updateCreditRecord,
} from "~/.server/model/credit_record";
import {
  getOrderBySessionId,
  insertOrder,
  updateOrder,
} from "~/.server/model/order";
import {
  getActiveSubscriptionsByUserId,
  getSubscriptionById,
  insertSubscription,
  updateSubscription,
} from "~/.server/model/subscriptions";

function generateUniqueOrderNo(prefix = "ORD") {
  const dateTimePart = dayjs().format("YYYYMMDDHHmmssSSS");
  const randomPart = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0");

  return [prefix, dateTimePart, randomPart].join("");
}

export const createOrder = async (
  payload: {
    product_id: string;
  },
  user: User,
) => {
  const product = PRODUCTS.find(
    (item) => item.product_id === payload.product_id,
  );
  if (!product) throw Error("Product not found");

  const orderNo = generateUniqueOrderNo();

  const [order] = await insertOrder({
    order_no: orderNo,
    order_detail: product,
    user_id: user.id,
    product_id: import.meta.env.PROD
      ? product.product_id
      : product.type === "credits" // Test ProductID
        ? "prod_5lfa0s1JyV5jPYKEsKLxpJ"
        : "prod_5dRsYe8RKk530U8ABGxUJN",
    product_name: product.product_name,
    amount: currency(product.price).intValue,
    status: "pending",
  });

  const creem = createCreem();
  const session = await creem.createCheckout({
    product_id: order.product_id,
    customer: { email: user.email },
    success_url: new URL(
      "/callback/payment",
      import.meta.env.PROD ? env.DOMAIN : "http://localhost:5173",
    ).toString(),
  });

  await updateOrder(order.id, {
    pay_session_id: session.id,
    pay_provider: "creem",
    session_detail: session,
  });

  return session;
};

export const handleOrderComplete = async (checkoutId: string) => {
  const creem = createCreem();
  const checkout = await creem.getCheckout(checkoutId);

  if (!checkout || checkout.status !== "completed") {
    throw Error("Invalid checkout");
  }

  const order = await getOrderBySessionId(checkout.id);
  if (!order) throw Error("Invalid transaction");
  if (order.status !== "pending") {
    throw Error(`Transaction is ${order.status}`);
  }
  const customer = checkout.customer as Customer;
  await updateOrder(order.id, {
    paid_at: new Date(),
    paid_email: customer.email,
    paid_detail: checkout,
    status: "processing",
  });

  const orderDetail = order.order_detail as Product;
  const { type } = orderDetail;

  if (type === "credits") {
    const { credits, bonus } = orderDetail;

    let receiveCredits = currency(credits, { precision: 0 });

    const subscription = await getActiveSubscriptionsByUserId(order.user_id);
    if (subscription) {
      const bonusCredit = bonus[subscription.plan_type as keyof typeof bonus];
      receiveCredits = receiveCredits.add(bonusCredit ?? 0);
    }

    if (credits) {
      await insertCreditRecord({
        user_id: order.user_id,
        credits: receiveCredits.value,
        remaining_credits: receiveCredits.value,
        record_type: "purchase",
        source_type: "order",
        source_id: order.order_no,
      });
    }

    const [result] = await updateOrder(order.id, {
      status: "completed",
    });

    return result;
  } else {
    const { plan, credits } = orderDetail;

    const expiredAt = dayjs()
      .add(1, orderDetail.interval === "yearly" ? "year" : "month")
      .endOf("day")
      .toDate();
    const subscription = checkout.subscription as Subscription;
    const [sub] = await insertSubscription({
      user_id: order.user_id,
      plan_type: plan,
      status: "active",
      interval: orderDetail.interval === "yearly" ? "year" : "month",
      interval_count: 1,
      platform_sub_id: subscription.id,
      start_at: dayjs().startOf("day").toDate(),
      expired_at: expiredAt,
      last_payment_at: new Date(),
    });

    await insertCreditRecord({
      user_id: order.user_id,
      credits: credits,
      remaining_credits: credits,
      record_type: "subscription",
      source_type: "order",
      source_id: order.order_no,
      expired_at: expiredAt,
    });

    const [result] = await updateOrder(order.id, {
      status: "completed",
      sub_id: subscription.id,
      subscription_id: sub.id,
    });

    return result;
  }
};

export const handleOrderRefund = async (checkoutId: string) => {
  const creem = createCreem();
  const checkout = await creem.getCheckout(checkoutId);
  if (!checkout || checkout.status !== "completed") {
    throw Error("Invalid checkout");
  }

  const order = await getOrderBySessionId(checkout.id);

  if (!order) throw Error("Invalid transaction");
  if (order.status !== "completed") {
    throw Error(`Transaction is ${order.status}`);
  }

  if (order.subscription_id) {
    const subscription = await getSubscriptionById(order.subscription_id);
    if (subscription) {
      await updateSubscription(subscription.id, {
        status: "cancelled",
        expired_at: new Date(),
        cancel_at: new Date(),
      });
    }
  }

  const credit = await getCreditRecordBySourceId(order.order_no);
  if (credit && credit.remaining_credits > 0) {
    await updateCreditRecord(credit.id, { remaining_credits: 0 });
    await insertCreditConsumption({
      user_id: credit.user_id,
      credits: credit.remaining_credits,
      credit_record_id: credit.id,
      reason: "Order refund",
    });
  }

  const [result] = await updateOrder(order.id, {
    status: "refunded",
  });

  return result;
};
