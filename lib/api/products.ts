import type { Product } from "@/lib/types";

const delay = () => new Promise((r) => setTimeout(r, 300 + Math.random() * 300));

let products: Product[] = [
  { id: "prod-1", sellerId: "seller-1", title: "Organic Avocados (3 pack)", description: "Fresh organic Hass avocados.", price: 5.99, imageUrl: "https://images.unsplash.com/photo-1523049673856-4389f4fab2e6?w=400&h=400&fit=crop", status: "approved", createdAt: "2025-01-05T10:00:00Z" },
  { id: "prod-2", sellerId: "seller-1", title: "Farm Fresh Eggs (dozen)", description: "Free-range eggs from happy hens.", price: 4.5, imageUrl: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop", status: "approved", createdAt: "2025-01-06T10:00:00Z" },
  { id: "prod-3", sellerId: "seller-1", title: "Organic Honey 500g", description: "Raw, unfiltered local honey.", price: 12.0, imageUrl: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop", status: "approved", createdAt: "2025-01-07T10:00:00Z" },
  { id: "prod-4", sellerId: "seller-1", title: "Artisan Sourdough Loaf", description: "Hand-crafted sourdough from our bakery.", price: 7.0, imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop", status: "approved", createdAt: "2025-01-08T10:00:00Z" },
  { id: "prod-5", sellerId: "seller-2", title: "Wireless Earbuds Pro", description: "Noise cancelling, 30h battery, Bluetooth 5.3.", price: 49.99, imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop", status: "approved", createdAt: "2025-01-10T10:00:00Z" },
  { id: "prod-6", sellerId: "seller-2", title: "USB-C Charging Hub", description: "7-in-1 hub with HDMI, SD card, and USB 3.0.", price: 34.99, imageUrl: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=400&fit=crop", status: "approved", createdAt: "2025-01-11T10:00:00Z" },
  { id: "prod-7", sellerId: "seller-2", title: "Mechanical Keyboard", description: "RGB backlit, Cherry MX switches, compact 75% layout.", price: 89.99, imageUrl: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&h=400&fit=crop", status: "approved", createdAt: "2025-01-12T10:00:00Z" },
  { id: "prod-8", sellerId: "seller-2", title: "Smart Watch Ultra", description: "Health tracking, GPS, 7-day battery life.", price: 199.99, imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop", status: "approved", createdAt: "2025-01-13T10:00:00Z" },
  { id: "prod-9", sellerId: "seller-3", title: "Chocolate Croissants (4-pack)", description: "Buttery, flaky, and filled with rich chocolate.", price: 8.5, imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=400&h=400&fit=crop", status: "approved", createdAt: "2025-01-14T10:00:00Z" },
  { id: "prod-10", sellerId: "seller-3", title: "Sourdough Boule", description: "Traditional 24-hour fermented sourdough.", price: 6.5, imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop", status: "approved", createdAt: "2025-01-15T10:00:00Z" },
  { id: "prod-11", sellerId: "seller-3", title: "Rustic Baguette", description: "Classic French baguette, crispy crust.", price: 3.99, imageUrl: "https://images.unsplash.com/photo-1549931319-a545757f29e9?w=400&h=400&fit=crop", status: "pending", createdAt: "2025-01-16T10:00:00Z" },
  { id: "prod-12", sellerId: "seller-4", title: "Lavender Soy Candle", description: "Hand-poured, natural soy wax, lavender scent.", price: 18.0, imageUrl: "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=400&h=400&fit=crop", status: "approved", createdAt: "2025-01-17T10:00:00Z" },
  { id: "prod-13", sellerId: "seller-4", title: "Woven Wall Hanging", description: "Bohemian style, cotton rope, 24 inches wide.", price: 35.0, imageUrl: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&h=400&fit=crop", status: "approved", createdAt: "2025-01-18T10:00:00Z" },
  { id: "prod-14", sellerId: "seller-4", title: "Ceramic Plant Pot Set", description: "Set of 3 minimalist ceramic pots with drainage.", price: 28.0, imageUrl: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop", status: "rejected", rejectionReason: "Images do not meet quality standards.", createdAt: "2025-01-19T10:00:00Z" },
  { id: "prod-15", sellerId: "seller-5", title: "Yoga Mat Premium", description: "Non-slip, eco-friendly TPE, 6mm thick.", price: 45.0, imageUrl: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop", status: "approved", createdAt: "2025-01-20T10:00:00Z" },
  { id: "prod-16", sellerId: "seller-5", title: "Resistance Bands Set", description: "5 levels of resistance, includes door anchor.", price: 22.0, imageUrl: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&h=400&fit=crop", status: "approved", createdAt: "2025-01-21T10:00:00Z" },
  { id: "prod-17", sellerId: "seller-5", title: "Adjustable Dumbbells 40lb", description: "Quick-adjust, compact design for home gym.", price: 149.99, imageUrl: "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=400&h=400&fit=crop", status: "approved", createdAt: "2025-01-22T10:00:00Z" },
  { id: "prod-18", sellerId: "seller-2", title: "Portable SSD 1TB", description: "Fast NVMe, USB 3.2 Gen 2, compact.", price: 79.99, imageUrl: "https://images.unsplash.com/photo-1597872200967-794b1f30f6b4?w=400&h=400&fit=crop", status: "pending", createdAt: "2025-01-23T10:00:00Z" },
  { id: "prod-19", sellerId: "seller-3", title: "Almond Biscotti (6-pack)", description: "Crunchy Italian-style biscotti with almonds.", price: 9.0, imageUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop", status: "pending", createdAt: "2025-01-24T10:00:00Z" },
  { id: "prod-20", sellerId: "seller-1", title: "Organic Spinach Bundle", description: "Fresh baby spinach, washed and ready to eat.", price: 3.5, imageUrl: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop", status: "approved", createdAt: "2025-01-25T10:00:00Z" },
];

export async function getApprovedProducts(): Promise<Product[]> {
  await delay();
  return products.filter((p) => p.status === "approved");
}

export async function getApprovedProductsBySeller(sellerId: string): Promise<Product[]> {
  await delay();
  return products.filter((p) => p.sellerId === sellerId && p.status === "approved");
}

export async function getProductsBySeller(sellerId: string): Promise<Product[]> {
  await delay();
  return products.filter((p) => p.sellerId === sellerId);
}

export async function getProductById(productId: string): Promise<Product | undefined> {
  await delay();
  return products.find((p) => p.id === productId);
}

export async function createProduct(data: Omit<Product, "id" | "createdAt">): Promise<Product> {
  await delay();
  const product: Product = {
    ...data,
    id: `prod-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  products.push(product);
  return product;
}

export async function updateProduct(
  productId: string,
  data: Partial<Omit<Product, "id" | "createdAt">>
): Promise<Product> {
  await delay();
  const idx = products.findIndex((p) => p.id === productId);
  if (idx === -1) throw new Error("Product not found");
  products[idx] = { ...products[idx], ...data };
  return products[idx];
}

export async function getPendingProducts(): Promise<Product[]> {
  await delay();
  return products.filter((p) => p.status === "pending");
}

export async function approveProduct(productId: string): Promise<Product> {
  await delay();
  const idx = products.findIndex((p) => p.id === productId);
  if (idx === -1) throw new Error("Product not found");
  products[idx] = { ...products[idx], status: "approved", rejectionReason: undefined };
  return products[idx];
}

export async function rejectProduct(productId: string, reason: string): Promise<Product> {
  await delay();
  const idx = products.findIndex((p) => p.id === productId);
  if (idx === -1) throw new Error("Product not found");
  products[idx] = { ...products[idx], status: "rejected", rejectionReason: reason };
  return products[idx];
}
