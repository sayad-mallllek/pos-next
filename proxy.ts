import { NextRequest, NextResponse, ProxyConfig } from "next/server";

// const protectedRoutes = ["/dashboard"];
const authRoutes = ["/forgot-password", "/reset-password", "/signup", "/login"];
const publicRoutes = ["/", ...authRoutes];

export default async function proxy(request: NextRequest) {
  // optimistic check for authentication token
  const isAuthenticated = Boolean(
    request.cookies.get("better-auth.session_token")
  );

  const { pathname } = request.nextUrl;

  // Redirect unauthenticated users trying to access protected routes
  if (
    publicRoutes.some((route) => pathname.startsWith(route)) &&
    !isAuthenticated
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users away from auth routes
  if (
    isAuthenticated &&
    authRoutes.some((route) => pathname.startsWith(route))
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config: ProxyConfig = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
