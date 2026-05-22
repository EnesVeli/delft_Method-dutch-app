import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // ONLY run authentication if the user is literally on an /admin route
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const basicAuth = req.headers.get('authorization');
    const url = req.nextUrl;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      // Require username 'admin' and the secret password
      if (user === 'admin' && pwd === adminPassword) {
        return NextResponse.next();
      }
    }

    url.pathname = '/api/auth';
    return new NextResponse('Auth required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Secure Admin Area"' },
    });
  }

  // Let everything else pass freely
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
