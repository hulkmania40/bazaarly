"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProductById, updateProduct } from "@/lib/api/products";
import { useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/shared/ErrorState";

export default function EditProductPage() {
  const params = useParams();
  const productId = params.productId as string;
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: product, isLoading, error, refetch } = useQuery({ queryKey: ["product", productId], queryFn: () => getProductById(productId), enabled: !!productId });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  if (isLoading) return <div className="max-w-2xl mx-auto p-6"><Skeleton className="h-64" /></div>;
  if (error || !product) return <div className="max-w-2xl mx-auto p-6"><ErrorState message="Product not found." onRetry={() => refetch()} /></div>;

  const mutation = useMutation({
    mutationFn: () => updateProduct(productId, { title, description, price: parseFloat(price), imageUrl }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seller-products"] });
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
      toast({ title: "Product updated!" });
      router.push("/seller/products");
    },
  });

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Edit Product</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Update Details</CardTitle>
          <CardDescription>Changes will be reviewed by admin if status is pending.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); mutation.mutate(); }} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price (USD)</Label>
              <Input id="price" type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
            </div>
            <div className="flex gap-3">
              <Button type="submit" disabled={mutation.isPending}>{mutation.isPending ? "Saving..." : "Save Changes"}</Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
