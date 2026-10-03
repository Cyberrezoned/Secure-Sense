import { NextResponse } from 'next/server';

import { getDisclosureVolume, getEpssSnapshot, getKevSummary, getOssStackSnapshot } from '@/lib/intel';

/**
 * Aggregated feed for the internal Signal Desk.
 *
 * Reachable only through the middleware gate on /api/signal-desk/*. Responses
 * are never cached at the edge so the desk reflects the current upstream state
 * on each poll.
 */
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const [kev, epss, disclosures, stack] = await Promise.all([
    getKevSummary(),
    getEpssSnapshot(12),
    getDisclosureVolume(),
    getOssStackSnapshot(),
  ]);

  // The desk renders each panel independently, so one failing upstream must not
  // fail the whole response. Each feed carries its own ok/error state.
  return NextResponse.json(
    {
      generatedAt: new Date().toISOString(),
      kev,
      epss,
      disclosures,
      stack,
    },
    {
      headers: {
        'cache-control': 'no-store, max-age=0',
        'x-robots-tag': 'noindex, nofollow',
      },
    }
  );
}
