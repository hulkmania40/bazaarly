"use client";

import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/lib/api/products";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/shared/ErrorState";
import { ArrowLeft } from "lucide-react";

export default function AdminProductReviewPage() {
  const params = useParams();
  const productId = params.productId as string;
  const { data: product, isLoading, error, refetch } = useQuery({ queryKey: ["product", productId], queryFn: () => getProductById(productId), enabled: !!productId });

  if (isLoading) return <div className="max-w-2xl mx-auto p-6"><Skeleton className="h-64" /></div>;
  if (error || !product) return <div className="max-w-2xl mx-auto p-6"><ErrorState message="Product not found." onRetry={() => refetch()} /></div>;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Link href="/admin/products"><Button variant="ghost" size="sm"><ArrowLeft className="mr-2 size-4" />Back to Queue</Button></Link>
      <div className="flex items-start gap-4">
        <img src={product.imageUrl} alt={product.title} className="size-32 rounded-md object-cover" />
        <div>
          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <p className="text-muted-foreground mt-1">{product.description}</p>
          <p className="font-semibold mt-2">${product.price.toFixed(2)}</p>
          <div className="flex items-center gap-2 mt-3">
            <Badge variant="outline">Seller: {product.sellerId}</Badge>
            <StatusBadge status={product.status} />
          </div>
          {product.rejectionReason && <p className="text-sm text-destructive mt-2">Reason: {product.rejectionReason}</p>}
          <p className="text-xs text-muted-foreground mt-1">Created: {new Date(product.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}
