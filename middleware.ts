import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the auth cookie
  const isAuthenticated = request.cookies.get("eizy_auth")?.value === "true";

  // 1. PROTECT PRIVATE ROUTES
  // If not logged in, redirect away from products and checkout
  const isProtectedRoute =
    pathname.startsWith("/products") || pathname.startsWith("/checkout");

  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // 2. PREVENT LOGGED-IN USERS FROM SEEING AUTH PAGES
  // If logged in, redirect away from login/register back to home
  const isAuthRoute =
    pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register");

  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Ensure the middleware only runs on specific paths for better performance
export const config = {
  matcher: [
    "/products/:path*",
    "/checkout/:path*",
    "/auth/login",
    "/auth/register",
  ],
};
