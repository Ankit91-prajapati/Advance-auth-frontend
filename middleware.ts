// middleware.ts (not proxy.ts)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define which routes this proxy will run on
export const config = {
  matcher: [
    /*
     * Match all request paths except static files and images
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

export function middleware(request: NextRequest) {  // Changed from 'proxy' to 'middleware'
  // Example: Check for an authentication token in cookies
  const isLoggedIn = request.cookies.get('refreshToken')?.value;
  const isOnProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard');
  const isOnAuthPage = request.nextUrl.pathname.startsWith('/auth/login');

  // Case 1: Trying to access a protected route without being logged in
  if (isOnProtectedRoute && !isLoggedIn) {
    // Redirect to the login page
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Case 2: Logged-in user trying to access the login page
  if (isOnAuthPage && isLoggedIn) {
    // Redirect to their dashboard or a default protected page
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Allow the request to proceed normally
  return NextResponse.next();
}