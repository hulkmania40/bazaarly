"use client";

import { useRole } from "@/lib/hooks/useRole";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const roleLinks: Record<string, { href: string; label: string }[]> = {
  admin: [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/products", label: "Products" },
    { href: "/admin/sellers", label: "Sellers" },
    { href: "/admin/orders", label: "Orders" },
  ],
  seller: [
    { href: "/seller", label: "Dashboard" },
    { href: "/seller/products", label: "Products" },
    { href: "/seller/orders", label: "Orders" },
  ],
  customer: [
    { href: "/customer/sellers", label: "Sellers" },
    { href: "/customer/cart", label: "Cart" },
    { href: "/customer/orders", label: "Orders" },
  ],
};

export function Sidebar() {
  const { role } = useRole();
  const pathname = usePathname();
  const links = role ? roleLinks[role] : [];

  return (
    <aside className="w-56 border-r bg-muted/30 hidden lg:block shrink-0">
      <div className="py-4 px-3">
        <p className="px-2 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider capitalize">
          {role} Menu
        </p>
        <nav className="space-y-1">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "block rounded-md px-3 py-2 text-sm transition-colors",
                  active ? "bg-primary text-primary-foreground font-medium" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
