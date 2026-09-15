"use client";

import { useQuery } from "@tanstack/react-query";
import { useCart } from "@/lib/hooks/useCart";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/shared/EmptyState";
import { ArrowLeft, Trash2, ShoppingBag } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQty, subtotal, count } = useCart();
  const router = useRouter();

  if (count() === 0) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
        <EmptyState title="Your cart is empty" description="Browse sellers and add products to get started." action={<Link href="/customer/sellers"><Button>Browse Sellers</Button></Link>} />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Your Cart ({count()} items)</h1>
      <div className="space-y-3">
        {items.map((item) => (
          <Card key={item.productId}>
            <CardContent className="flex items-center gap-4 p-4">
              <img src={item.imageUrl} alt={item.title} className="size-16 rounded-md object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{item.title}</p>
                <p className="text-xs text-muted-foreground">{formatCurrency(item.price)} each</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="size-7" onClick={() => updateQty(item.productId, item.quantity - 1)}>-</Button>
                <span className="w-8 text-center text-sm">{item.quantity}</span>
                <Button variant="outline" size="icon" className="size-7" onClick={() => updateQty(item.productId, item.quantity + 1)}>+</Button>
              </div>
              <span className="font-medium w-20 text-right text-sm">{formatCurrency(item.price * item.quantity)}</span>
              <Button variant="ghost" size="icon" className="size-8 text-destructive" onClick={() => removeItem(item.productId)}><Trash2 className="size-4" /></Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="flex justify-between text-sm"><span>Subtotal</span><span>{formatCurrency(subtotal())}</span></div>
          <Separator />
          <div className="flex justify-between font-semibold text-lg"><span>Total</span><span>{formatCurrency(subtotal())}</span></div>
          <Button className="w-full" size="lg" onClick={() => router.push("/customer/checkout")}>
            <ShoppingBag className="mr-2 size-4" />Proceed to Checkout
          </Button>
        </CardContent>
      </Card>
      <Link href="/customer/sellers"><Button variant="ghost" size="sm"><ArrowLeft className="mr-2 size-4" />Continue Shopping</Button></Link>
    </div>
  );
}
