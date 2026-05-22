import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // FOOLPROOF LOCK: If the URL does not start with /admin, ignore it completely and let the user pass.
  if (!req.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  const basicAuth = req.headers.get('authorization');
  const url = req.nextUrl;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    // Require the username to be exactly 'admin' and the password to match the environment variable
    if (user === 'admin' && pwd === adminPassword) {
      return NextResponse.next();
    }
  }

  // Trigger the browser pop-up
  url.pathname = '/api/auth';
  return new NextResponse('Auth required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Admin Area"',
    },
  });
}

export const config = {
  matcher: ['/admin/:path*'],
};
