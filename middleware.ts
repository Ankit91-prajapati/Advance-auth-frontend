// middleware.ts - RECOMMENDED
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isLoggedIn = !!request.cookies.get('accessToken')?.value;
  const { pathname } = request.nextUrl;

  // Protected pages (require login)
  if (!isLoggedIn && pathname !== '/auth/login' && pathname !== '/auth/register') {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Already logged in users can't access login/register
  if (isLoggedIn && (pathname === '/auth/login' || pathname === '/auth/register')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
};