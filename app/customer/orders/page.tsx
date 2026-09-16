"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getOrdersByCustomer } from "@/lib/api/orders";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/shared/ErrorState";
import { EmptyState } from "@/components/shared/EmptyState";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Package, Plus } from "lucide-react";

export default function OrdersPage() {
  const { data: session } = useSession();
  const accessToken = (session?.user as any)?.accessToken;

  const { data: orders, isLoading, error, refetch } = useQuery({
    queryKey: ["customer-orders"],
    queryFn: () => getOrdersByCustomer(accessToken ?? ""),
    enabled: !!accessToken,
  });

  if (isLoading) return <div className="max-w-4xl mx-auto p-6 space-y-4"><Skeleton className="h-8 w-40" />{[1, 2, 3].map((i) => <Skeleton key={i} className="h-24" />)}</div>;
  if (error) return <div className="max-w-4xl mx-auto p-6"><ErrorState message="Could not load orders." onRetry={() => refetch()} /></div>;
  if (!orders?.length) return <div className="max-w-4xl mx-auto p-6"><EmptyState title="No orders yet" description="Your order history will appear here." action={<Link href="/customer/sellers"><Button><Plus className="mr-2 size-4" />Start Shopping</Button></Link>} /></div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">My Orders</h1>
      <div className="space-y-3">
        {orders.map((order) => (
          <Link key={order.id} href={`/customer/orders/${order.id}`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <Package className="size-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">{order.id}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(order.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-medium text-sm">{formatCurrency(order.total)}</span>
                  <StatusBadge status={order.status} />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
