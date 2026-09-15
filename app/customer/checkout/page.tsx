"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/hooks/useCart";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder } from "@/lib/api/orders";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { EmptyState } from "@/components/shared/EmptyState";
import { ArrowLeft, CreditCard } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [processing, setProcessing] = useState(false);

  const createMutation = useMutation({
    mutationFn: async () => {
      const customerId = "customer-1";
      const sellerId = items[0].sellerId;
      const orderItems = items.map((i) => ({ ...i }));
      const order = await createOrder({ customerId, sellerId, items: orderItems, total: subtotal() });
      return order;
    },
    onSuccess: () => {
      clear();
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      alert("Order placed successfully!");
      router.push("/customer/orders");
    },
  });

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <EmptyState title="Your cart is empty" description="Add items before checking out." action={<Link href="/customer/sellers"><Button>Browse Sellers</Button></Link>} />
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => createMutation.mutate(), 800);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <Link href="/customer/cart"><Button variant="ghost" size="sm"><ArrowLeft className="mr-2 size-4" />Back to Cart</Button></Link>
      <h1 className="text-2xl font-semibold">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Payment Details</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="card">Card Number</Label>
                <Input id="card" required placeholder="4242 4242 4242 4242" maxLength={19} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry</Label>
                  <Input id="expiry" required placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" required placeholder="123" />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={processing || createMutation.isPending}>
                {processing || createMutation.isPending ? "Processing..." : <><CreditCard className="mr-2 size-4" />Pay {formatCurrency(subtotal())}</>}
              </Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Order Summary</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between text-sm">
                <span>{item.title} x{item.quantity}</span>
                <span>{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between font-semibold text-lg"><span>Total</span><span>{formatCurrency(subtotal())}</span></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
