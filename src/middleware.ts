import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // --- Hard ignore list: never touch static files or Next.js internals ---
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.includes('.') // favicon.ico, apple-icon.jpg, etc.
  ) {
    return NextResponse.next();
  }

  // --- Ignore background prefetch requests (triggered by <Link> hover) ---
  // Next.js sets this header on prefetch requests; we let them through
  // without triggering the auth challenge, because a 401 response to a
  // prefetch will cause the browser to surface the login popup immediately.
  const purpose = req.headers.get('purpose') ?? req.headers.get('x-purpose');
  const nextAction = req.headers.get('next-action');
  const fetchMode = req.headers.get('sec-fetch-mode');

  const isPrefetch =
    purpose === 'prefetch' ||
    req.headers.get('x-middleware-prefetch') === '1' ||
    (fetchMode === 'cors' && nextAction === null && req.headers.get('accept')?.includes('text/x-component'));

  if (isPrefetch) {
    return NextResponse.next();
  }

  // --- Only enforce auth on actual /admin navigation ---
  if (pathname.startsWith('/admin')) {
    const basicAuth = req.headers.get('authorization');
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      if (user === 'admin' && pwd === adminPassword) {
        return NextResponse.next();
      }
    }

    return new NextResponse('Auth required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Secure Admin Area"' },
    });
  }

  // Let everything else pass freely
  return NextResponse.next();
}

export const config = {
  // Intentionally broad so we can filter prefetches inside the function.
  // Static file bypass is handled explicitly above.
  matcher: ['/admin/:path*'],
};
