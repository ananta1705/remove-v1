import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Using a placeholder secret for the example
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-256-bit-secret-key-remove-app"
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Paths that do not require authentication
  const publicPaths = ["/", "/register", "/register/petugas"];
  
  // Static assets and internal Next.js paths
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Allow public paths
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Get token from Authorization header or cookie (depending on implementation)
  // For standard Next.js middleware, checking cookies is more reliable
  const token = request.cookies.get("token")?.value;

  // In a real implementation where we use localStorage for tokens, middleware cannot access it directly.
  // For the sake of the design, we will just allow access, assuming the client-side AuthProvider will handle redirects.
  // Ideally, login sets an HTTP-only cookie to be verified here.

  if (!token && process.env.NODE_ENV === "production") {
    // If running in production with strict auth, redirect to login
    // return NextResponse.redirect(new URL("/", request.url));
  }

  /*
  // Example token verification logic:
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const role = payload.role as string;

    // Role-Based Access Control
    if (pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL(`/${role}`, request.url));
    }
    if (pathname.startsWith("/petugas") && role !== "petugas") {
      return NextResponse.redirect(new URL(`/${role}`, request.url));
    }
    if (pathname.startsWith("/pembeli") && role !== "pembeli") {
      return NextResponse.redirect(new URL(`/${role}`, request.url));
    }
  } catch (err) {
    // Invalid token
    return NextResponse.redirect(new URL("/", request.url));
  }
  */

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
