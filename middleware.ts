import { type NextRequest } from "next/server";
import { auth } from "@/lib/auth/config";

const protectedRoutes = ["/customer", "/seller", "/admin"];
const publicRoutes = ["/login", "/register"];
const adminRoutes = ["/admin"];
const sellerRoutes = ["/seller"];
const customerRoutes = ["/customer"];

export async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;
  const isAuthenticated = !!session?.user;
  const role = (session?.user as { role?: string } | undefined)?.role;

  if (pathname === "/unauthorized") return;

  if (publicRoutes.includes(pathname)) {
    if (isAuthenticated) {
      const redirect = role === "admin" ? "/admin" : role === "seller" ? "/seller" : "/customer";
      return Response.redirect(new URL(redirect, request.url));
    }
    return;
  }

  if (!isAuthenticated) {
    return Response.redirect(new URL("/login", request.url));
  }

  if (adminRoutes.some((r) => pathname.startsWith(r)) && role !== "admin") {
    return Response.redirect(new URL("/unauthorized", request.url));
  }
  if (sellerRoutes.some((r) => pathname.startsWith(r)) && role !== "seller") {
    return Response.redirect(new URL("/unauthorized", request.url));
  }
  if (customerRoutes.some((r) => pathname.startsWith(r)) && role !== "customer") {
    return Response.redirect(new URL("/unauthorized", request.url));
  }

  return;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
