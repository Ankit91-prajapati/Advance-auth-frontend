// proxy.ts
import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  // const token = req.cookies.get("accessToken")?.value;
  // const { pathname } = req.nextUrl;

  // // 1. Redirect logged-in users away from auth pages
  // if (token && pathname.startsWith("/auth")) {
  //   return NextResponse.redirect(new URL("/dashboard", req.url));
  // }

  // // 2. Protect dashboard routes
  // if (!token && pathname.startsWith("/dashboard")) {
  //   const loginUrl = new URL("/auth/login", req.url);
  //   // Persist the attempted URL so we can redirect back after login
  //   loginUrl.searchParams.set("from", pathname);
  //   return NextResponse.redirect(loginUrl);
  // }

  return NextResponse.next();
}

// export const config = {
//   // matcher stays the same
//   matcher: ["/dashboard/:path*", "/auth/:path*"],
//};