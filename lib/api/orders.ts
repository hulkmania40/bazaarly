import { apiFetchAuth } from "./endpoints";
import type { Order } from "@/lib/types";

export async function getOrdersByCustomer(accessToken: string): Promise<Order[]> {
  const data = await apiFetchAuth<any[]>("/api/v1/orders/mine", accessToken);
  return data.map(mapOrder);
}

export async function getOrdersBySeller(accessToken: string): Promise<Order[]> {
  const data = await apiFetchAuth<any[]>("/api/v1/orders/seller/mine", accessToken);
  return data.map(mapOrder);
}

export async function getOrderById(accessToken: string, orderId: string): Promise<Order> {
  const data = await apiFetchAuth<any>(`/api/v1/orders/${orderId}`, accessToken);
  return mapOrder(data);
}

export async function createOrder(accessToken: string, data: {
  items: { product_id: string; quantity: number }[];
  total: number;
}): Promise<Order> {
  const result = await apiFetchAuth<any>("/api/v1/orders/checkout", accessToken, {
    method: "POST",
    body: JSON.stringify({
      items: data.items,
      payment_method: "card",
    }),
  });
  return mapOrder(result);
}

export async function confirmOrder(accessToken: string, paymentRef: string, orderIds: string[]): Promise<Order[]> {
  const data = await apiFetchAuth<any[]>("/api/v1/orders/confirm", accessToken, {
    method: "POST",
    body: JSON.stringify({ payment_ref: paymentRef, order_ids: orderIds }),
  });
  return data.map(mapOrder);
}

export async function createPaymentIntent(accessToken: string, amount: number, currency = "usd"): Promise<{ client_secret: string; payment_intent_id: string }> {
  return apiFetchAuth<{ client_secret: string; payment_intent_id: string }>("/api/v1/payments/create-intent", accessToken, {
    method: "POST",
    body: JSON.stringify({ amount, currency }),
  });
}

export async function updateOrderStatus(
  accessToken: string,
  orderId: string,
  status: string
): Promise<Order> {
  if (status === "accepted") {
    const result = await apiFetchAuth<any>(`/api/v1/orders/${orderId}/accept`, accessToken, { method: "POST" });
    return mapOrder(result);
  }
  if (status === "out_for_delivery") {
    const result = await apiFetchAuth<any>(`/api/v1/orders/${orderId}/ship`, accessToken, { method: "POST" });
    return mapOrder(result);
  }
  if (status === "delivered") {
    const result = await apiFetchAuth<any>(`/api/v1/orders/${orderId}/deliver`, accessToken, { method: "POST" });
    return mapOrder(result);
  }
  throw new Error(`Unsupported status: ${status}`);
}

export async function cancelOrder(accessToken: string, orderId: string): Promise<Order> {
  const result = await apiFetchAuth<any>(`/api/v1/orders/${orderId}/cancel`, accessToken, { method: "POST" });
  return mapOrder(result);
}

export async function getAllOrders(accessToken: string): Promise<Order[]> {
  const data = await apiFetchAuth<any[]>("/api/v1/admin/orders", accessToken);
  return data.map(mapOrder);
}

function mapOrder(raw: any): Order {
  return {
    id: raw.id,
    customerId: raw.customer_id,
    sellerId: raw.seller_id,
    items: (raw.items ?? []).map((item: any) => ({
      id: item.id,
      productId: item.product_id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      imageUrl: item.image_url,
    })),
    total: raw.total,
    currency: raw.currency ?? "USD",
    status: raw.status,
    paymentRef: raw.payment_ref ?? null,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
  };
}
