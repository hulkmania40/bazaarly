import type { Seller } from "@/lib/types";

const delay = () => new Promise((r) => setTimeout(r, 300 + Math.random() * 300));

let sellers: Seller[] = [
  {
    id: "seller-1",
    userId: "seller-1",
    storeName: "Green Valley Farm",
    description: "Organic produce grown with sustainable farming practices.",
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=GV",
  },
  {
    id: "seller-2",
    userId: "seller-2",
    storeName: "Tech Gadgets Hub",
    description: "Latest gadgets, accessories, and electronics at great prices.",
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=TG",
  },
  {
    id: "seller-3",
    userId: "seller-3",
    storeName: "Artisan Bakery",
    description: "Freshly baked bread, pastries, and cakes daily.",
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=AB",
  },
  {
    id: "seller-4",
    userId: "seller-4",
    storeName: "Home Comforts",
    description: "Handmade home decor, candles, and cozy accessories.",
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=HC",
  },
  {
    id: "seller-5",
    userId: "seller-5",
    storeName: "FitGear Pro",
    description: "Premium fitness equipment and athletic wear for all levels.",
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=FG",
  },
];

export async function getSellers(): Promise<Seller[]> {
  await delay();
  return [...sellers];
}

export async function getSellerById(sellerId: string): Promise<Seller | undefined> {
  await delay();
  return sellers.find((s) => s.id === sellerId);
}
