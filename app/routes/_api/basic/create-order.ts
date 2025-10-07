import { data } from "react-router";
import { getSessionHandler } from "~/.server/libs/session";
import { createOrder } from "~/.server/services/order";
import type { Route } from "./+types/create-order";

export async function action({ request }: Route.ActionArgs) {
  const [session] = await getSessionHandler(request);
  const user = session.get("user");

  if (!user) throw new Response("Unauthorized", { status: 401 });

  const raw = await request.json<{ productId: string }>();
  const id = raw.productId;

  try {
    if (!id || typeof id !== "string") throw Error("Invalid ID");

    const order = await createOrder(
      {
        product_id: id,
      },
      user,
    );

    return data(order);
  } catch (e) {
    console.error("Error creating order", e);
    throw new Response("Invalid product", { status: 400 });
  }
}

export type CreateOrderResult = Awaited<ReturnType<typeof action>>["data"];
