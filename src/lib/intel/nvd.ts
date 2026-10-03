/**
 * NIST National Vulnerability Database, CVE API 2.0.
 *
 * Used only for disclosure volume. The unauthenticated tier is rate limited to
 * 5 requests per 30s, so every call here asks for `resultsPerPage=1` and reads
 * `totalResults` out of the envelope rather than paging the actual records.
 */

import { type FeedResult, type FeedSource, fetchJson, isoDaysAgo, mapFeed } from './fetch';

const NVD_ENDPOINT = 'https://services.nvd.nist.gov/rest/json/cves/2.0';

export const NVD_SOURCE: FeedSource = {
  name: 'NIST NVD',
  url: 'https://nvd.nist.gov/',
  attribution: 'National Institute of Standards and Technology',
};

type RawNvdResponse = { totalResults: number; timestamp: string };

export type DisclosureVolume = {
  /** Every CVE record NVD holds. */
  totalCves: number;
  publishedLast7Days: number;
  publishedLast30Days: number;
  /** Mean new CVEs per day across the last 30 days. */
  dailyAverage: number;
  observedAt: string;
};

function countUrl(days: number): string {
  const params = new URLSearchParams({
    resultsPerPage: '1',
    noRejected: '',
    pubStartDate: isoDaysAgo(days).replace(/\.\d{3}Z$/, '.000'),
    pubEndDate: new Date().toISOString().replace(/\.\d{3}Z$/, '.000'),
  });

  return `${NVD_ENDPOINT}?${params.toString()}`;
}

export async function getDisclosureVolume(): Promise<FeedResult<DisclosureVolume>> {
  // Sequential, not parallel: the unauthenticated NVD tier rejects bursts.
  const total = await fetchJson<RawNvdResponse>(
    `${NVD_ENDPOINT}?resultsPerPage=1&noRejected`,
    NVD_SOURCE,
    { revalidate: 21_600, timeoutMs: 20_000 }
  );
  if (!total.ok) return mapFeed(total, () => ({}) as DisclosureVolume);

  const last7 = await fetchJson<RawNvdResponse>(countUrl(7), NVD_SOURCE, {
    revalidate: 21_600,
    timeoutMs: 20_000,
  });
  const last30 = await fetchJson<RawNvdResponse>(countUrl(30), NVD_SOURCE, {
    revalidate: 21_600,
    timeoutMs: 20_000,
  });

  if (!last7.ok) return mapFeed(last7, () => ({}) as DisclosureVolume);
  if (!last30.ok) return mapFeed(last30, () => ({}) as DisclosureVolume);

  return {
    ok: true,
    fetchedAt: total.fetchedAt,
    source: NVD_SOURCE,
    data: {
      totalCves: total.data.totalResults,
      publishedLast7Days: last7.data.totalResults,
      publishedLast30Days: last30.data.totalResults,
      dailyAverage: Math.round((last30.data.totalResults / 30) * 10) / 10,
      observedAt: total.data.timestamp,
    },
  };
}
