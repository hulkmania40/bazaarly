"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getOrderById, updateOrderStatus } from "@/lib/api/orders";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/shared/ErrorState";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export default function SellerOrderDetailPage() {
  const params = useParams();
  const orderId = params.orderId as string;
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: order, isLoading, error, refetch } = useQuery({ queryKey: ["order", orderId], queryFn: () => getOrderById(orderId), enabled: !!orderId });

  const acceptMutation = useMutation({
    mutationFn: () => updateOrderStatus(orderId, "accepted"),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["order", orderId] }); queryClient.invalidateQueries({ queryKey: ["seller-orders"] }); toast({ title: "Order accepted" }); refetch(); },
  });
  const deliverMutation = useMutation({
    mutationFn: () => updateOrderStatus(orderId, "out_for_delivery"),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["order", orderId] }); queryClient.invalidateQueries({ queryKey: ["seller-orders"] }); toast({ title: "Order marked for delivery" }); refetch(); },
  });

  if (isLoading) return <div className="max-w-3xl mx-auto p-6 space-y-4"><Skeleton className="h-8 w-48" /><Skeleton className="h-64" /></div>;
  if (error || !order) return <div className="max-w-3xl mx-auto p-6"><ErrorState message="Could not load order details." onRetry={() => refetch()} /></div>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <Link href="/seller/orders"><Button variant="ghost" size="sm"><ArrowLeft className="mr-2 size-4" />All Orders</Button></Link>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Order {order.id}</h1>
          <p className="text-sm text-muted-foreground">Placed on {formatDate(order.createdAt)}</p>
        </div>
        <StatusBadge status={order.status} />
      </div>
      <Card>
        <CardHeader><CardTitle className="text-base">Items</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {order.items.map((item) => (
            <div key={item.productId} className="flex items-center gap-3">
              <img src={item.imageUrl} alt={item.title} className="size-12 rounded-md object-cover" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{item.title}</p>
                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
              </div>
              <span className="font-medium text-sm">{formatCurrency(item.price * item.quantity)}</span>
            </div>
          ))}
          <Separator />
          <div className="flex justify-between font-semibold text-lg"><span>Total</span><span>{formatCurrency(order.total)}</span></div>
        </CardContent>
      </Card>
      <div className="flex gap-3">
        {order.status === "paid" && <Button onClick={() => acceptMutation.mutate()} disabled={acceptMutation.isPending}>Accept Order</Button>}
        {order.status === "accepted" && <Button onClick={() => deliverMutation.mutate()} disabled={deliverMutation.isPending}>Mark for Delivery</Button>}
      </div>
    </div>
  );
}
