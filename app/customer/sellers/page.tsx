"use client";

import { useQuery } from "@tanstack/react-query";
import { getSellers } from "@/lib/api/sellers";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Store } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/shared/ErrorState";
import { EmptyState } from "@/components/shared/EmptyState";

export default function SellersPage() {
  const { data, isLoading, error, refetch } = useQuery({ queryKey: ["sellers"], queryFn: getSellers });

  if (isLoading) return <div className="max-w-6xl mx-auto p-6"><Skeleton className="h-8 w-40 mb-6" /><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{[1, 2, 3, 4, 5, 6].map((i) => <Skeleton key={i} className="h-40" />)}</div></div>;
  if (error) return <div className="max-w-6xl mx-auto p-6"><ErrorState message="Could not load sellers." onRetry={() => refetch()} /></div>;
  if (!data?.length) return <div className="max-w-6xl mx-auto p-6"><EmptyState title="No sellers found" description="Check back later for new sellers." /></div>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">All Sellers</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((seller) => (
          <Link key={seller.id} href={`/customer/sellers/${seller.id}`}>
            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="flex items-center gap-4 pt-6">
                <Avatar className="size-12">
                  <AvatarImage src={seller.avatarUrl} />
                  <AvatarFallback>{seller.storeName[0]}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <CardTitle className="text-base truncate">{seller.storeName}</CardTitle>
                  <CardDescription className="line-clamp-2 text-xs">{seller.description}</CardDescription>
                </div>
                <Store className="size-4 text-muted-foreground ml-auto shrink-0" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
