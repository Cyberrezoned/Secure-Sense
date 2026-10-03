import { type NextRequest, NextResponse } from 'next/server';

import { SIGNAL_DESK_REALM, authorizeSignalDesk } from '@/lib/signal-desk/access';

/**
 * Request gate for the internal Signal Desk.
 *
 * Both the page and its data route are matched, so the API cannot be read
 * directly even if someone knows the path. Named `proxy` per the Next 16
 * convention that replaced `middleware`.
 */
export const config = {
  matcher: ['/signal-desk', '/signal-desk/:path*', '/api/signal-desk/:path*'],
};

function clientAddress(request: NextRequest): string | null {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    // Left-most entry is the originating client; the rest are proxy hops.
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }

  return request.headers.get('x-real-ip') ?? null;
}

export async function proxy(request: NextRequest) {
  const decision = await authorizeSignalDesk({
    env: {
      SIGNAL_DESK_ENABLED: process.env.SIGNAL_DESK_ENABLED,
      SIGNAL_DESK_USER: process.env.SIGNAL_DESK_USER,
      SIGNAL_DESK_PASSWORD: process.env.SIGNAL_DESK_PASSWORD,
      SIGNAL_DESK_ALLOWED_IPS: process.env.SIGNAL_DESK_ALLOWED_IPS,
    },
    authorization: request.headers.get('authorization'),
    clientIp: clientAddress(request),
  });

  if (decision.outcome === 'allow') {
    const response = NextResponse.next();
    // Internal surface: never index, never cache in a shared cache.
    response.headers.set('x-robots-tag', 'noindex, nofollow, noarchive');
    response.headers.set('cache-control', 'no-store, max-age=0');
    return response;
  }

  if (decision.outcome === 'not-found') {
    // Indistinguishable from a route that was never deployed.
    return new NextResponse('Not Found', {
      status: 404,
      headers: { 'content-type': 'text/plain', 'x-robots-tag': 'noindex, nofollow' },
    });
  }

  if (decision.outcome === 'forbidden') {
    return new NextResponse('Forbidden', {
      status: 403,
      headers: { 'content-type': 'text/plain', 'x-robots-tag': 'noindex, nofollow' },
    });
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'www-authenticate': `Basic realm="${SIGNAL_DESK_REALM}", charset="UTF-8"`,
      'content-type': 'text/plain',
      'x-robots-tag': 'noindex, nofollow',
    },
  });
}
