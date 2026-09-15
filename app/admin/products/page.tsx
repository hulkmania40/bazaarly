"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPendingProducts, approveProduct, rejectProduct } from "@/lib/api/products";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/shared/ErrorState";
import { EmptyState } from "@/components/shared/EmptyState";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Check, X } from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { formatCurrency } from "@/lib/utils";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function AdminProductsPage() {
  const { data: products, isLoading, error, refetch } = useQuery({ queryKey: ["pending-products"], queryFn: getPendingProducts });
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const approveMutation = useMutation({
    mutationFn: (id: string) => approveProduct(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["pending-products"] }); toast({ title: "Product approved" }); },
  });
  const rejectMutation = useMutation({
    mutationFn: (id: string) => rejectProduct(id, rejectReason),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["pending-products"] }); setRejectId(null); setRejectReason(""); toast({ title: "Product rejected" }); },
  });

  if (isLoading) return <div className="max-w-4xl mx-auto p-6 space-y-4"><Skeleton className="h-8 w-48" />{[1, 2, 3].map((i) => <Skeleton key={i} className="h-24" />)}</div>;
  if (error) return <div className="max-w-4xl mx-auto p-6"><ErrorState message="Could not load pending products." onRetry={() => refetch()} /></div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Pending Approvals</h1>
      {!products?.length ? (
        <EmptyState title="No pending products" description="All products have been reviewed." />
      ) : (
        <div className="space-y-3">
          {products.map((product) => (
            <Card key={product.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <img src={product.imageUrl} alt={product.title} className="size-14 rounded-md object-cover" />
                  <div>
                    <p className="font-medium text-sm">{product.title}</p>
                    <p className="text-xs text-muted-foreground">{formatCurrency(product.price)}</p>
                    <p className="text-xs text-muted-foreground">Seller: {product.sellerId}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost" className="size-8 text-green-600" onClick={() => approveMutation.mutate(product.id)} disabled={approveMutation.isPending}><Check className="size-4" /></Button>
                  <Button size="icon" variant="ghost" className="size-8 text-destructive" onClick={() => setRejectId(product.id)} disabled={rejectMutation.isPending}><X className="size-4" /></Button>
                  <a href={`/admin/products/${product.id}`}><Button variant="ghost" size="sm">Review</Button></a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <Dialog open={!!rejectId} onOpenChange={(o) => !o && setRejectId(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Reject Product</DialogTitle></DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="reason">Rejection Reason</Label>
            <Input id="reason" value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} placeholder="Why is this being rejected?" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => rejectId && rejectMutation.mutate(rejectId)} disabled={!rejectReason.trim() || rejectMutation.isPending}>Reject</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
