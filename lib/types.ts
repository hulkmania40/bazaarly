export type Role = "admin" | "seller" | "customer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface Seller {
  id: string;
  userId: string;
  storeName: string;
  description: string;
  avatarUrl: string;
}

export interface Product {
  id: string;
  sellerId: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  status: "pending" | "approved" | "rejected";
  rejectionReason?: string;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  sellerId: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  sellerId: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export interface Order {
  id: string;
  customerId: string;
  sellerId: string;
  items: OrderItem[];
  total: number;
  status: "paid" | "accepted" | "out_for_delivery" | "delivered";
  createdAt: string;
  updatedAt: string;
}
