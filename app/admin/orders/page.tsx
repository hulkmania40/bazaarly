"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getAllOrders } from "@/lib/api/orders";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/shared/ErrorState";
import { EmptyState } from "@/components/shared/EmptyState";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ClipboardList } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function AdminOrdersPage() {
  const { data: session } = useSession();
  const accessToken = (session?.user as any)?.accessToken;

  const { data: orders, isLoading, error, refetch } = useQuery({
    queryKey: ["all-orders"],
    queryFn: () => getAllOrders(accessToken ?? ""),
    enabled: !!accessToken,
  });

  if (isLoading) return <div className="max-w-4xl mx-auto p-6 space-y-4"><Skeleton className="h-8 w-40" />{[1, 2, 3].map((i) => <Skeleton key={i} className="h-24" />)}</div>;
  if (error) return <div className="max-w-4xl mx-auto p-6"><ErrorState message="Could not load orders." onRetry={() => refetch()} /></div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">All Orders</h1>
      {!orders?.length ? (
        <EmptyState title="No orders" description="Orders will appear here once placed." />
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <ClipboardList className="size-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">{order.id}</p>
                    <p className="text-xs text-muted-foreground">Customer: {order.customerId} | Seller: {order.sellerId}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(order.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-medium text-sm">{formatCurrency(order.total)}</span>
                  <StatusBadge status={order.status} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
