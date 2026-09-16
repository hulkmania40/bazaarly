export type Role = "admin" | "seller" | "customer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar_url: string | null;
}

export interface Seller {
  id: string;
  userId: string;
  storeName: string;
  description: string;
  avatarUrl: string;
  productCount: number | null;
}

export interface Product {
  id: string;
  sellerId: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  imageUrl: string;
  status: "pending" | "approved" | "rejected";
  rejectionReason?: string;
  approvedAt?: string | null;
  approvedBy?: string | null;
  createdAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  title: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface Order {
  id: string;
  customerId: string;
  sellerId: string;
  items: OrderItem[];
  total: number;
  currency: string;
  status: string;
  paymentRef: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  productId: string;
  sellerId: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
}
