"use client";

import { useQuery } from "@tanstack/react-query";
import { getSellers } from "@/lib/api/sellers";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/shared/ErrorState";
import { EmptyState } from "@/components/shared/EmptyState";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users } from "lucide-react";

export default function AdminSellersPage() {
  const { data: sellers, isLoading, error, refetch } = useQuery({ queryKey: ["sellers"], queryFn: getSellers });

  if (isLoading) return <div className="max-w-4xl mx-auto p-6 space-y-4"><Skeleton className="h-8 w-40" />{[1, 2, 3].map((i) => <Skeleton key={i} className="h-20" />)}</div>;
  if (error) return <div className="max-w-4xl mx-auto p-6"><ErrorState message="Could not load sellers." onRetry={() => refetch()} /></div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">All Sellers</h1>
      {!sellers?.length ? (
        <EmptyState title="No sellers" description="Sellers will appear here once they register." />
      ) : (
        <div className="space-y-3">
          {sellers.map((seller) => (
            <Card key={seller.id}>
              <CardContent className="flex items-center gap-4 p-4">
                <Avatar className="size-10">
                  <AvatarImage src={seller.avatarUrl} />
                  <AvatarFallback>{seller.storeName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">{seller.storeName}</CardTitle>
                  <CardDescription className="text-xs">{seller.description}</CardDescription>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
