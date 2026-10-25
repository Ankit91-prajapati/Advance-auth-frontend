import { NextResponse, type NextRequest } from "next/server";
export function proxy(request: NextRequest) {
  if (!request.cookies.has("refreshToken")) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.search = "";
    url.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*",  "/admin/:path*"],
};
