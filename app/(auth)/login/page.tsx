"use client";

import { signIn, getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [callbackUrl, setCallbackUrl] = useState("/customer");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setCallbackUrl(params.get("callbackUrl") ?? "/customer");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });
      if (res?.error) {
        setError("Invalid email or password");
      } else if (res?.ok) {
        const session = await getSession();
        const userRole = (session?.user as any)?.role;
        const roleUrl = userRole === "admin" ? "/admin" : userRole === "seller" ? "/seller" : "/customer";
        window.location.href = roleUrl;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign in to Bazaarly</CardTitle>
          <CardDescription>Use a mock account or register below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 text-sm text-destructive">
                <AlertTriangle className="size-4" />
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Don&apos;t have an account? <Link href="/register" className="underline">Register</Link>
          </p>
          <div className="mt-4 p-3 rounded-md bg-muted text-xs text-muted-foreground space-y-1">
            <p className="font-medium text-foreground">Mock accounts:</p>
            <p>Admin: admin@bazaarly.com / admin123</p>
            <p>Seller: seller1@bazaarly.com / seller123</p>
            <p>Customer: customer@bazaarly.com / customer123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
