"use client";

import { useSession } from "next-auth/react";
import type { Role } from "@/lib/types";

export function useRole() {
  const { data: session, status } = useSession();
  return {
    role: (session?.user as { role?: Role } | undefined)?.role ?? null,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
    session,
  };
}
