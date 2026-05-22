import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');
  const url = req.nextUrl;

  // Get the exact passcode from the environment variables
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [, pwd] = atob(authValue).split(':');

    // We only care about the password matching our secret env variable
    if (pwd === adminPassword) {
      return NextResponse.next();
    }
  }

  // If no auth or wrong password, trigger the browser's native pop-up
  url.pathname = '/api/auth';
  return new NextResponse('Auth required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Admin Area"',
    },
  });
}

export const config = {
  matcher: ['/admin/:path*'], // Only protect the admin routes
};
