import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get token from cookies
  const token = request.cookies.get("critix.auth-token")?.value;
  const betterAuthToken = request.cookies.get("critix.session_token")?.value;
  const isAuthenticated = !!token || !!betterAuthToken;

  // Root path handling
  if (pathname === "/") {
    if (!isAuthenticated) {
      // Not authenticated -> redirect to lending page
      return NextResponse.redirect(new URL("/lending", request.url));
    }
    // Authenticated -> allow access to main app
    return NextResponse.next();
  }

  // Auth route handling
  if (pathname.startsWith("/auth")) {
    if (isAuthenticated) {
      // Authenticated user trying to access auth -> redirect to main app
      return NextResponse.redirect(new URL("/", request.url));
    }
    // Not authenticated -> allow access to auth
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)",
  ],
};
