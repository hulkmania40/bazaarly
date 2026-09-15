"use client";

import { useQuery } from "@tanstack/react-query";
import { getProductsBySeller } from "@/lib/api/products";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/shared/ErrorState";
import { EmptyState } from "@/components/shared/EmptyState";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Plus, Pencil } from "lucide-react";

export default function SellerProductsPage() {
  const { data: session } = useSession();
  const sellerId = (session?.user as { id?: string } | undefined)?.id ?? "seller-1";
  const { data: products, isLoading, error, refetch } = useQuery({ queryKey: ["seller-products", sellerId], queryFn: () => getProductsBySeller(sellerId) });

  if (isLoading) return <div className="max-w-4xl mx-auto p-6 space-y-4"><Skeleton className="h-8 w-40" />{[1, 2, 3].map((i) => <Skeleton key={i} className="h-20" />)}</div>;
  if (error) return <div className="max-w-4xl mx-auto p-6"><ErrorState message="Could not load products." onRetry={() => refetch()} /></div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Products</h1>
        <Link href="/seller/products/new"><Button><Plus className="mr-2 size-4" />New Product</Button></Link>
      </div>
      {!products?.length ? (
        <EmptyState title="No products yet" description="Create your first product listing." action={<Link href="/seller/products/new"><Button><Plus className="mr-2 size-4" />Add Product</Button></Link>} />
      ) : (
        <div className="space-y-3">
          {products.map((product) => (
            <Card key={product.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <img src={product.imageUrl} alt={product.title} className="size-14 rounded-md object-cover" />
                  <div>
                    <CardTitle className="text-base">{product.title}</CardTitle>
                    <CardDescription className="text-xs">${product.price.toFixed(2)}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={product.status} />
                  <Link href={`/seller/products/${product.id}/edit`}><Button variant="ghost" size="icon" className="size-8"><Pencil className="size-4" /></Button></Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
