/**
 * FIRST Exploit Prediction Scoring System.
 *
 * EPSS gives each CVE a 0–1 probability of exploitation in the next 30 days.
 * Pairing it with KEV is the useful move: KEV is "already exploited", EPSS is
 * "likely to be exploited next", so together they rank remediation order.
 */

import { type FeedResult, type FeedSource, fetchJson, mapFeed } from './fetch';

const EPSS_ENDPOINT = 'https://api.first.org/data/v1/epss';

export const EPSS_SOURCE: FeedSource = {
  name: 'FIRST EPSS',
  url: 'https://www.first.org/epss/',
  attribution: 'Forum of Incident Response and Security Teams',
};

type RawEpssResponse = {
  total: number;
  data: Array<{ cve: string; epss: string; percentile: string; date: string }>;
};

export type EpssScore = {
  cve: string;
  /** Probability of exploitation in the next 30 days, 0–1. */
  probability: number;
  /** Rank against every other scored CVE, 0–1. */
  percentile: number;
  scoredOn: string;
};

export type EpssSnapshot = {
  /** Total CVEs carrying an EPSS score — the full scored universe. */
  scoredCves: number;
  modelDate: string;
  highest: EpssScore[];
};

function normalise(row: RawEpssResponse['data'][number]): EpssScore {
  return {
    cve: row.cve,
    probability: Number.parseFloat(row.epss),
    percentile: Number.parseFloat(row.percentile),
    scoredOn: row.date,
  };
}

/** The highest-probability CVEs in the current model run. */
export async function getEpssSnapshot(limit = 10): Promise<FeedResult<EpssSnapshot>> {
  const url = `${EPSS_ENDPOINT}?order=!epss&limit=${limit}`;
  const result = await fetchJson<RawEpssResponse>(url, EPSS_SOURCE, { revalidate: 3600 });

  return mapFeed(result, (payload) => {
    const highest = payload.data.map(normalise);
    return {
      scoredCves: payload.total,
      modelDate: highest[0]?.scoredOn ?? '',
      highest,
    };
  });
}

/** EPSS scores for a specific set of CVEs, keyed by CVE id. */
export async function getEpssFor(cves: string[]): Promise<FeedResult<Record<string, EpssScore>>> {
  const requested = cves.filter(Boolean).slice(0, 100);
  const url = `${EPSS_ENDPOINT}?cve=${encodeURIComponent(requested.join(','))}`;
  const result = await fetchJson<RawEpssResponse>(url, EPSS_SOURCE, { revalidate: 3600 });

  return mapFeed(result, (payload) =>
    Object.fromEntries(payload.data.map((row) => [row.cve, normalise(row)]))
  );
}
