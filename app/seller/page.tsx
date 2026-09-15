"use client";

import { useQuery } from "@tanstack/react-query";
import { getProductsBySeller } from "@/lib/api/products";
import { getOrdersBySeller } from "@/lib/api/orders";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/shared/ErrorState";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Package, ClipboardList, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function SellerDashboard() {
  const { data: session } = useSession();
  const sellerId = (session?.user as { id?: string } | undefined)?.id ?? "seller-1";
  const { data: products, isLoading: pLoading, error: pError } = useQuery({ queryKey: ["seller-products", sellerId], queryFn: () => getProductsBySeller(sellerId) });
  const { data: orders, isLoading: oLoading, error: oError } = useQuery({ queryKey: ["seller-orders", sellerId], queryFn: () => getOrdersBySeller(sellerId) });

  const pending = products?.filter((p) => p.status === "pending").length ?? 0;
  const approved = products?.filter((p) => p.status === "approved").length ?? 0;
  const activeOrders = orders?.filter((o) => o.status !== "delivered").length ?? 0;

  if (pLoading || oLoading) return <div className="max-w-4xl mx-auto p-6 grid sm:grid-cols-3 gap-4">{[1, 2, 3].map((i) => <Skeleton key={i} className="h-32" />)}</div>;
  const error = pError || oError;
  if (error) return <div className="max-w-4xl mx-auto p-6"><ErrorState message="Could not load dashboard data." onRetry={() => window.location.reload()} /></div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Seller Dashboard</h1>
      <div className="grid sm:grid-cols-3 gap-4">
        <Card><CardContent className="flex items-center gap-4 p-6"><Package className="size-8 text-primary" /><div><p className="text-2xl font-bold">{approved}</p><p className="text-xs text-muted-foreground">Approved Products</p></div></CardContent></Card>
        <Card><CardContent className="flex items-center gap-4 p-6"><ClipboardList className="size-8 text-yellow-600" /><div><p className="text-2xl font-bold">{pending}</p><p className="text-xs text-muted-foreground">Pending Approval</p></div></CardContent></Card>
        <Card><CardContent className="flex items-center gap-4 p-6"><TrendingUp className="size-8 text-green-600" /><div><p className="text-2xl font-bold">{activeOrders}</p><p className="text-xs text-muted-foreground">Active Orders</p></div></CardContent></Card>
      </div>
      <div className="flex gap-3">
        <Link href="/seller/products"><Button>Manage Products</Button></Link>
        <Link href="/seller/orders"><Button variant="outline">View Orders</Button></Link>
      </div>
    </div>
  );
}
