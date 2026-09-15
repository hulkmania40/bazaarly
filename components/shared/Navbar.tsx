"use client";

import { useRole } from "@/lib/hooks/useRole";
import { signOut } from "next-auth/react";
import type { Role } from "@/lib/types";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Package, ShoppingCart, Store, ShieldCheck, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const roleLinks: Record<Role, { href: string; label: string; icon: React.ElementType }[]> = {
  admin: [
    { href: "/admin", label: "Dashboard", icon: ShieldCheck },
    { href: "/admin/products", label: "Products", icon: Package },
    { href: "/admin/sellers", label: "Sellers", icon: Store },
    { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  ],
  seller: [
    { href: "/seller", label: "Dashboard", icon: Store },
    { href: "/seller/products", label: "Products", icon: Package },
    { href: "/seller/orders", label: "Orders", icon: ShoppingCart },
  ],
  customer: [
    { href: "/customer/sellers", label: "Sellers", icon: Store },
    { href: "/customer/cart", label: "Cart", icon: ShoppingCart },
    { href: "/customer/orders", label: "Orders", icon: Package },
  ],
};

export function Navbar() {
  const { role, isAuthenticated, isLoading } = useRole();
  const pathname = usePathname();
  const links = role ? roleLinks[role] : [];

  const handleSignOut = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <header className="border-b bg-background/80 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link href={isAuthenticated ? (role === "admin" ? "/admin" : role === "seller" ? "/seller" : "/customer") : "/"} className="font-bold text-lg tracking-tight">
          Bazaarly
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {isLoading
            ? null
            : isAuthenticated && role
              ? links.map((l) => {
                  const Icon = l.icon;
                  const active = pathname === l.href || pathname.startsWith(l.href + "/");
                  return (
                    <Link key={l.href} href={l.href}>
                      <Button
                        variant={active ? "secondary" : "ghost"}
                        size="sm"
                        className={cn("gap-1.5", active && "bg-muted")}
                      >
                        <Icon className="size-4" />
                        {l.label}
                      </Button>
                    </Link>
                  );
                })
              : null}
        </nav>

        <div className="flex items-center gap-2">
          {isLoading ? (
            <div className="size-8 rounded-full bg-muted animate-pulse" />
          ) : isAuthenticated && role ? (
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-xs text-muted-foreground capitalize">{role}</span>
              <Avatar className="size-8">
                <AvatarFallback className="text-xs">{(role as string)[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="icon" onClick={handleSignOut} className="size-8" title="Sign out">
                <LogOut className="size-4" />
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link href="/login"><Button variant="ghost" size="sm">Sign in</Button></Link>
              <Link href="/register"><Button size="sm">Get started</Button></Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
