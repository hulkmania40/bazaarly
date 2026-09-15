"use client";

import { useCartStore } from "@/lib/store/cart";

export function useCart() {
  const { items, addItem, removeItem, updateQty, clear, subtotal, count } = useCartStore();
  return { items, addItem, removeItem, updateQty, clear, subtotal, count };
}
