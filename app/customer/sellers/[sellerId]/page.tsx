"use client";

import { useQuery } from "@tanstack/react-query";
import { getSellerById } from "@/lib/api/sellers";
import { getApprovedProductsBySeller } from "@/lib/api/products";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/shared/ErrorState";
import { EmptyState } from "@/components/shared/EmptyState";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/hooks/useCart";
import { useToast } from "@/components/ui/toast";

export default function SellerDetailPage() {
  const params = useParams();
  const sellerId = params.sellerId as string;
  const { data: seller, isLoading: sellerLoading, error: sellerError, refetch: refetchSeller } = useQuery({ queryKey: ["seller", sellerId], queryFn: () => getSellerById(sellerId), enabled: !!sellerId });
  const { data: products, isLoading: productsLoading, error: productsError, refetch: refetchProducts } = useQuery({ queryKey: ["seller-products", sellerId], queryFn: () => getApprovedProductsBySeller(sellerId), enabled: !!sellerId });
  const { toast } = useToast();
  const { addItem } = useCart();

  const handleAddToCart = (product: { id: string; title: string; price: number; imageUrl: string; sellerId: string }) => {
    addItem({ productId: product.id, sellerId: product.sellerId, title: product.title, price: product.price, imageUrl: product.imageUrl });
    toast({ title: "Added to cart", description: product.title });
  };

  const isLoading = sellerLoading || productsLoading;
  const error = sellerError || productsError;

  if (isLoading) return <div className="max-w-6xl mx-auto p-6 space-y-6"><Skeleton className="h-8 w-48" /><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{[1, 2, 3].map((i) => <Skeleton key={i} className="h-48" />)}</div></div>;
  if (error || !seller) return <div className="max-w-6xl mx-auto p-6"><ErrorState message="Could not load seller details." onRetry={() => { refetchSeller(); refetchProducts(); }} /></div>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Link href="/customer/sellers"><Button variant="ghost" size="sm"><ArrowLeft className="mr-2 size-4" />All Sellers</Button></Link>
      <div className="flex items-center gap-4">
        <Avatar className="size-16">
          <AvatarImage src={seller.avatarUrl} />
          <AvatarFallback className="text-2xl">{seller.storeName[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-semibold">{seller.storeName}</h1>
          <p className="text-muted-foreground text-sm">{seller.description}</p>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-medium mb-3">Products</h2>
        {productsLoading ? <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{[1, 2, 3].map((i) => <Skeleton key={i} className="h-48" />)}</div> : !products?.length ? (
          <EmptyState title="No products yet" description="This seller hasn't added any approved products." />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <img src={product.imageUrl} alt={product.title} className="w-full aspect-video object-cover" />
                <CardContent className="p-4 space-y-2">
                  <CardTitle className="text-base">{product.title}</CardTitle>
                  <CardDescription className="line-clamp-2 text-xs">{product.description}</CardDescription>
                  <div className="flex items-center justify-between pt-2">
                    <span className="font-semibold">${product.price.toFixed(2)}</span>
                    <Button size="sm" onClick={() => handleAddToCart(product)}><ShoppingCart className="size-3.5 mr-1.5" />Add</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
