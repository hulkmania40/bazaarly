import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center gap-6 px-4">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
        Welcome to <span className="text-primary">Bazaarly</span>
      </h1>
      <p className="text-lg text-muted-foreground max-w-lg">
        A multi-vendor marketplace connecting customers with independent sellers. Browse, shop, and manage orders — all in one place.
      </p>
      <div className="flex gap-3">
        <Link href="/register"><Button size="lg">Get Started <ArrowRight className="ml-2 size-4" /></Button></Link>
        <Link href="/login"><Button variant="outline" size="lg">Sign In</Button></Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 max-w-2xl">
        {[
          { title: "For Customers", desc: "Browse sellers, add to cart, and track orders." },
          { title: "For Sellers", desc: "List products, manage orders, and grow your business." },
          { title: "For Admins", desc: "Approve listings and keep the marketplace safe." },
        ].map((f) => (
          <Card key={f.title} className="text-left">
            <CardHeader>
              <CardTitle className="text-base">{f.title}</CardTitle>
              <CardDescription className="text-xs">{f.desc}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
