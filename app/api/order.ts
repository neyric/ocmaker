import type { CreateOrderResult } from "~/routes/_api/basic/create-order";

export async function createOrder(
  productId: string,
): Promise<CreateOrderResult> {
  const response = await fetch("/api/create-order", {
    method: "post",
    body: JSON.stringify({ productId }),
  });

  if (!response.ok) throw Error(response.statusText);
  return response.json();
}
