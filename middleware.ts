import { NextRequest, NextResponse } from 'next/server';
import { COOKIE_NAMES, DEFAULT_LOCALE, Locale, SUPPORTED_LOCALES } from '@/lib/constants';

/**
 * Middleware to handle locale detection and redirection.
 * Prioritizes the NEXT_LOCALE cookie (useful for SSO integration) 
 * followed by the Accept-Language header.
 */
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for static assets, api routes, and internal next.js paths
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('.') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // 1. Check for NEXT_LOCALE cookie
  const cookieLocale = request.cookies.get(COOKIE_NAMES.LOCALE)?.value;
  if (cookieLocale && (SUPPORTED_LOCALES as readonly string[]).includes(cookieLocale)) {
    // If cookie is present and valid, proceed
    return NextResponse.next();
  }

  // 2. Negotiate locale from Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  let detectedLocale = DEFAULT_LOCALE;

  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')[0]
      .split('-')[0]
      .toLowerCase();

    if ((SUPPORTED_LOCALES as readonly string[]).includes(preferredLocale)) {
      detectedLocale = preferredLocale as Locale;
    }
  }

  // Set the detected locale cookie so the client knows what language to use initially
  const response = NextResponse.next();
  response.cookies.set(COOKIE_NAMES.LOCALE, detectedLocale, {
    path: '/',
    maxAge: 31536000, // 1 year
    sameSite: 'lax',
  });

  return response;
}

export const config = {
  // We want the middleware to run on almost all pages
  matcher: [String.raw`/((?!api|_next/static|_next/image|favicon.ico|.*\..*).*)` ],
};
