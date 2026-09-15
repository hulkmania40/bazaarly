import type { Order, OrderItem } from "@/lib/types";

const delay = () => new Promise((r) => setTimeout(r, 300 + Math.random() * 300));

let orders: Order[] = [
  {
    id: "order-1",
    customerId: "customer-1",
    sellerId: "seller-1",
    items: [
      { productId: "prod-1", sellerId: "seller-1", title: "Organic Avocados (3 pack)", price: 5.99, imageUrl: "https://images.unsplash.com/photo-1523049673856-4389f4fab2e6?w=400&h=400&fit=crop", quantity: 2 },
      { productId: "prod-2", sellerId: "seller-1", title: "Farm Fresh Eggs (dozen)", price: 4.5, imageUrl: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop", quantity: 1 },
    ],
    total: 16.48,
    status: "delivered",
    createdAt: "2025-01-20T14:00:00Z",
    updatedAt: "2025-01-22T10:00:00Z",
  },
  {
    id: "order-2",
    customerId: "customer-1",
    sellerId: "seller-2",
    items: [
      { productId: "prod-5", sellerId: "seller-2", title: "Wireless Earbuds Pro", price: 49.99, imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop", quantity: 1 },
    ],
    total: 49.99,
    status: "out_for_delivery",
    createdAt: "2025-01-25T09:00:00Z",
    updatedAt: "2025-01-26T08:00:00Z",
  },
  {
    id: "order-3",
    customerId: "customer-1",
    sellerId: "seller-3",
    items: [
      { productId: "prod-9", sellerId: "seller-3", title: "Chocolate Croissants (4-pack)", price: 8.5, imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=400&h=400&fit=crop", quantity: 2 },
    ],
    total: 17.0,
    status: "accepted",
    createdAt: "2025-01-26T11:00:00Z",
    updatedAt: "2025-01-26T11:00:00Z",
  },
  {
    id: "order-4",
    customerId: "customer-1",
    sellerId: "seller-4",
    items: [
      { productId: "prod-12", sellerId: "seller-4", title: "Lavender Soy Candle", price: 18.0, imageUrl: "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=400&h=400&fit=crop", quantity: 1 },
    ],
    total: 18.0,
    status: "paid",
    createdAt: "2025-01-27T08:00:00Z",
    updatedAt: "2025-01-27T08:00:00Z",
  },
];

export async function getOrdersByCustomer(customerId: string): Promise<Order[]> {
  await delay();
  return orders.filter((o) => o.customerId === customerId);
}

export async function getOrdersBySeller(sellerId: string): Promise<Order[]> {
  await delay();
  return orders.filter((o) => o.sellerId === sellerId);
}

export async function getOrderById(orderId: string): Promise<Order | undefined> {
  await delay();
  return orders.find((o) => o.id === orderId);
}

export async function createOrder(data: {
  customerId: string;
  sellerId: string;
  items: OrderItem[];
  total: number;
}): Promise<Order> {
  await delay();
  const order: Order = {
    id: `order-${Date.now()}`,
    ...data,
    status: "paid",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  orders.push(order);
  return order;
}

export async function updateOrderStatus(
  orderId: string,
  status: Order["status"]
): Promise<Order> {
  await delay();
  const idx = orders.findIndex((o) => o.id === orderId);
  if (idx === -1) throw new Error("Order not found");
  orders[idx] = { ...orders[idx], status, updatedAt: new Date().toISOString() };
  return orders[idx];
}

export async function getAllOrders(): Promise<Order[]> {
  await delay();
  return [...orders];
}
