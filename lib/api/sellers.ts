import { apiFetchAuth } from "./endpoints";
import type { Product, Seller } from "@/lib/types";

export async function getSellers(accessToken?: string): Promise<Seller[]> {
  const data = await apiFetchAuth<any[]>("/api/v1/sellers", accessToken);
  return data.map(mapSeller);
}

export async function getSellerById(sellerId: string, accessToken?: string): Promise<Seller> {
  const data = await apiFetchAuth<any>(`/api/v1/sellers/${sellerId}`, accessToken);
  return mapSeller(data);
}

export async function getApprovedProductsBySeller(sellerId: string, accessToken?: string): Promise<Product[]> {
  const data = await apiFetchAuth<any[]>(`/api/v1/sellers/${sellerId}/products`, accessToken);
  return data.filter((p) => p.status === "approved").map((raw: any) => ({
    id: raw.id,
    sellerId: raw.seller_id,
    title: raw.title,
    description: raw.description,
    price: raw.price,
    currency: raw.currency ?? "USD",
    imageUrl: raw.image_url,
    status: raw.status,
    createdAt: raw.created_at,
  }));
}

export async function getMySeller(accessToken: string): Promise<Seller> {
  const data = await apiFetchAuth<any>("/api/v1/sellers/me", accessToken);
  return mapSeller(data);
}

export async function updateMySeller(accessToken: string, data: Record<string, any>): Promise<Seller> {
  const result = await apiFetchAuth<any>("/api/v1/sellers/me", accessToken, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
  return mapSeller(result);
}

function mapSeller(raw: any): Seller {
  return {
    id: raw.id,
    userId: raw.user_id,
    storeName: raw.store_name,
    description: raw.description,
    avatarUrl: raw.avatar_url ?? "",
    productCount: raw.product_count ?? null,
  };
}
