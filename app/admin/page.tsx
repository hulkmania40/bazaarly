"use client";

import { useQuery } from "@tanstack/react-query";
import { getPendingProducts } from "@/lib/api/products";
import { getSellers } from "@/lib/api/sellers";
import { getAllOrders } from "@/lib/api/orders";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/shared/ErrorState";
import { ClipboardList, Users, ShoppingBag, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const { data: pending, isLoading: pLoading, error: pError } = useQuery({ queryKey: ["pending-products"], queryFn: getPendingProducts });
  const { data: sellers, isLoading: sLoading, error: sError } = useQuery({ queryKey: ["sellers"], queryFn: getSellers });
  const { data: orders, isLoading: oLoading, error: oError } = useQuery({ queryKey: ["all-orders"], queryFn: getAllOrders });

  if (pLoading || sLoading || oLoading) return <div className="max-w-4xl mx-auto p-6 grid sm:grid-cols-4 gap-4">{[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-32" />)}</div>;
  const error = pError || sError || oError;
  if (error) return <div className="max-w-4xl mx-auto p-6"><ErrorState message="Could not load dashboard." onRetry={() => window.location.reload()} /></div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <div className="grid sm:grid-cols-4 gap-4">
        <Card><CardContent className="flex items-center gap-4 p-6"><ClipboardList className="size-8 text-yellow-600" /><div><p className="text-2xl font-bold">{pending?.length ?? 0}</p><p className="text-xs text-muted-foreground">Pending Approvals</p></div></CardContent></Card>
        <Card><CardContent className="flex items-center gap-4 p-6"><Users className="size-8 text-blue-600" /><div><p className="text-2xl font-bold">{sellers?.length ?? 0}</p><p className="text-xs text-muted-foreground">Sellers</p></div></CardContent></Card>
        <Card><CardContent className="flex items-center gap-4 p-6"><ShoppingBag className="size-8 text-green-600" /><div><p className="text-2xl font-bold">{orders?.length ?? 0}</p><p className="text-xs text-muted-foreground">Total Orders</p></div></CardContent></Card>
        <Card><CardContent className="flex items-center gap-4 p-6"><Clock className="size-8 text-purple-600" /><div><p className="text-2xl font-bold">{orders?.filter((o) => o.status === "paid").length ?? 0}</p><p className="text-xs text-muted-foreground">Unprocessed</p></div></CardContent></Card>
      </div>
      <div className="flex gap-3">
        <a href="/admin/products"><Button>Review Products</Button></a>
        <a href="/admin/sellers"><Button variant="outline">Manage Sellers</Button></a>
        <a href="/admin/orders"><Button variant="outline">All Orders</Button></a>
      </div>
    </div>
  );
}
