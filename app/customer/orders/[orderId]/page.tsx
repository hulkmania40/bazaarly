"use client";

import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "@/lib/api/orders";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/shared/ErrorState";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, MapPin } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

const statusSteps = ["paid", "accepted", "out_for_delivery", "delivered"] as const;

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.orderId as string;
  const { data: order, isLoading, error, refetch } = useQuery({ queryKey: ["order", orderId], queryFn: () => getOrderById(orderId), enabled: !!orderId });

  if (isLoading) return <div className="max-w-3xl mx-auto p-6 space-y-4"><Skeleton className="h-8 w-48" /><Skeleton className="h-64" /></div>;
  if (error || !order) return <div className="max-w-3xl mx-auto p-6"><ErrorState message="Could not load order details." onRetry={() => refetch()} /></div>;

  const currentStepIndex = statusSteps.indexOf(order.status);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <Link href="/customer/orders"><Button variant="ghost" size="sm"><ArrowLeft className="mr-2 size-4" />All Orders</Button></Link>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Order {order.id}</h1>
          <p className="text-sm text-muted-foreground">Placed on {formatDate(order.createdAt)}</p>
        </div>
        <StatusBadge status={order.status} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2"><MapPin className="size-4" />Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            {statusSteps.map((step, i) => (
              <div key={step} className="flex flex-col items-center gap-1">
                <div className={`size-6 rounded-full flex items-center justify-center text-xs font-medium ${i <= currentStepIndex ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{i + 1}</div>
                <span className="text-xs text-muted-foreground capitalize hidden sm:block">{step.replace(/_/g, " ")}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all" style={{ width: `${((currentStepIndex + 1) / statusSteps.length) * 100}%` }} />
          </div>
        </CardContent>
      </Card>
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
    </div>
  );
}
