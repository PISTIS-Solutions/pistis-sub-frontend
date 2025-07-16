import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/courses"];

export default function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;
  const isAuthenticated = Boolean(token);

  if (
    !isAuthenticated &&
    isProtectedRoute(req.nextUrl.pathname, protectedRoutes)
  ) {
    const absoluteURL = new URL("/sign-in", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL);
  }

  return NextResponse.next();
}

function isProtectedRoute(path: string, protectedRoutes: string[]): boolean {
  return protectedRoutes.some((route) => {
    const regex = new RegExp(`^${route.replace(/\[.*\]/, ".*")}$`);
    return regex.test(path);
  });
}

export const config = {
  matcher: ["/courses/:path*"],
};