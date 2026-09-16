import { apiFetchAuth } from "./endpoints";
import type { Product } from "@/lib/types";

export async function getApprovedProducts(accessToken?: string): Promise<Product[]> {
  const data = await apiFetchAuth<any[]>("/api/v1/products?status=approved", accessToken);
  return data.map(mapProduct);
}

export async function getApprovedProductsBySeller(sellerId: string, accessToken?: string): Promise<Product[]> {
  const data = await apiFetchAuth<any[]>(`/api/v1/sellers/${sellerId}/products`, accessToken);
  return data.filter((p) => p.status === "approved").map(mapProduct);
}

export async function getProductsBySeller(sellerId: string, accessToken?: string): Promise<Product[]> {
  const data = await apiFetchAuth<any[]>(`/api/v1/sellers/${sellerId}/products`, accessToken);
  return data.map(mapProduct);
}

export async function getProductById(productId: string, accessToken?: string): Promise<Product> {
  const data = await apiFetchAuth<any>(`/api/v1/products/${productId}`, accessToken);
  return mapProduct(data);
}

export async function createProduct(accessToken: string, data: {
  title: string;
  description: string;
  price: number;
  currency?: string;
  image_url: string;
}): Promise<Product> {
  const result = await apiFetchAuth<any>("/api/v1/products", accessToken, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return mapProduct(result);
}

export async function updateProduct(
  accessToken: string,
  productId: string,
  data: {
    title?: string | null;
    description?: string | null;
    price?: number | string | null;
    currency?: string | null;
    image_url?: string | null;
  }
): Promise<Product> {
  const result = await apiFetchAuth<any>(`/api/v1/products/${productId}`, accessToken, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
  return mapProduct(result);
}

export async function getPendingProducts(accessToken: string): Promise<Product[]> {
  const data = await apiFetchAuth<any[]>("/api/v1/products?status=pending", accessToken);
  return data.map(mapProduct);
}

export async function approveProduct(accessToken: string, productId: string): Promise<Product> {
  const result = await apiFetchAuth<any>(`/api/v1/products/${productId}/approve`, accessToken, {
    method: "POST",
  });
  return mapProduct(result);
}

export async function rejectProduct(accessToken: string, productId: string, reason: string): Promise<Product> {
  const result = await apiFetchAuth<any>(`/api/v1/products/${productId}/reject`, accessToken, {
    method: "POST",
    body: JSON.stringify({ reason }),
  });
  return mapProduct(result);
}

export async function getMyProducts(accessToken: string): Promise<Product[]> {
  const data = await apiFetchAuth<any[]>("/api/v1/products/mine", accessToken);
  return data.map(mapProduct);
}

function mapProduct(raw: any): Product {
  return {
    id: raw.id,
    sellerId: raw.seller_id,
    title: raw.title,
    description: raw.description,
    price: raw.price,
    currency: raw.currency ?? "USD",
    imageUrl: raw.image_url,
    status: raw.status,
    rejectionReason: raw.rejection_reason ?? undefined,
    approvedAt: raw.approved_at ?? null,
    approvedBy: raw.approved_by ?? null,
    createdAt: raw.created_at,
  };
}
