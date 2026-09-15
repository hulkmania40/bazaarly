"use client";

import type { ReactNode } from "react";
import { useRole } from "@/lib/hooks/useRole";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type RoleGuardProps = {
  role: "admin" | "seller" | "customer";
  children: ReactNode;
  fallback?: ReactNode;
};

export function RoleGuard({ role, children, fallback }: RoleGuardProps) {
  const { role: currentRole, isLoading } = useRole();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && currentRole !== role) {
      router.push("/unauthorized");
    }
  }, [isLoading, currentRole, role, router]);

  if (isLoading) return <>{fallback ?? <Skeleton className="h-32 w-full" />}</>;
  if (currentRole !== role) return null;
  return <>{children}</>;
}
