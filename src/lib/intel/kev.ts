/**
 * CISA Known Exploited Vulnerabilities catalogue.
 *
 * Authoritative list of CVEs with confirmed in-the-wild exploitation. Public
 * domain, no key required, republished by CISA roughly every weekday.
 */

import { unstable_cache } from 'next/cache';

import { type FeedResult, type FeedSource, daysBetween, fetchJson, mapFeed } from './fetch';

const KEV_URL = 'https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json';

export const KEV_SOURCE: FeedSource = {
  name: 'CISA KEV',
  url: 'https://www.cisa.gov/known-exploited-vulnerabilities-catalog',
  attribution: 'Cybersecurity and Infrastructure Security Agency',
};

type RawKevEntry = {
  cveID: string;
  vendorProject: string;
  product: string;
  vulnerabilityName: string;
  dateAdded: string;
  shortDescription: string;
  requiredAction: string;
  dueDate: string;
  knownRansomwareCampaignUse: string;
  cwes?: string[];
};

type RawKevCatalog = {
  title: string;
  catalogVersion: string;
  dateReleased: string;
  count: number;
  vulnerabilities: RawKevEntry[];
};

export type KevEntry = {
  cve: string;
  vendor: string;
  product: string;
  name: string;
  dateAdded: string;
  dueDate: string;
  description: string;
  requiredAction: string;
  ransomware: boolean;
  cwes: string[];
  /** Days remaining until the federal remediation deadline; negative when overdue. */
  dueInDays: number;
};

export type KevSummary = {
  catalogVersion: string;
  releasedAt: string;
  total: number;
  addedLast7Days: number;
  addedLast30Days: number;
  addedLast90Days: number;
  ransomwareLinked: number;
  ransomwareShare: number;
  /**
   * Entries whose federal remediation deadline falls inside the next 7 days.
   * Deliberately not a count of all past-due entries: almost every historical
   * entry is past its deadline, so that number is noise rather than signal.
   */
  dueWithin7Days: number;
  medianDaysToRemediate: number;
  topVendors: Array<{ vendor: string; count: number }>;
  topWeaknesses: Array<{ cwe: string; count: number }>;
  /** KEV additions bucketed by month, oldest first — real catalogue growth. */
  additionsByMonth: Array<{ month: string; added: number; ransomware: number }>;
  recent: KevEntry[];
};

function normalise(entry: RawKevEntry): KevEntry {
  return {
    cve: entry.cveID,
    vendor: entry.vendorProject,
    product: entry.product,
    name: entry.vulnerabilityName,
    dateAdded: entry.dateAdded,
    dueDate: entry.dueDate,
    description: entry.shortDescription,
    requiredAction: entry.requiredAction,
    ransomware: entry.knownRansomwareCampaignUse?.toLowerCase() === 'known',
    cwes: entry.cwes ?? [],
    dueInDays: -daysBetween(entry.dueDate),
  };
}

function tally<T extends string>(values: T[], limit: number): Array<{ key: T; count: number }> {
  const counts = new Map<T, number>();
  for (const value of values) {
    if (!value) continue;
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count || a.key.localeCompare(b.key))
    .slice(0, limit);
}

function median(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? Math.round((sorted[mid - 1] + sorted[mid]) / 2) : sorted[mid];
}

async function loadKevSummary(): Promise<FeedResult<KevSummary>> {
  const result = await fetchJson<RawKevCatalog>(KEV_URL, KEV_SOURCE, {
    // The catalogue is ~2.4MB, over the 2MB Next data-cache ceiling, so the
    // raw response is deliberately not cached. `getKevSummary` caches the
    // derived summary instead, which is a few kilobytes.
    noStore: true,
    timeoutMs: 20_000,
  });

  return mapFeed(result, (catalog) => buildSummary(catalog));
}

/**
 * Cached KEV summary.
 *
 * Caching the derivation rather than the download means one 2.4MB transfer per
 * hour at most, regardless of how many pages or panels read the summary.
 */
export const getKevSummary = unstable_cache(loadKevSummary, ['intel', 'kev-summary'], {
  revalidate: 3600,
  tags: ['intel:kev'],
});

function buildSummary(catalog: RawKevCatalog): KevSummary {
  const entries = catalog.vulnerabilities.map(normalise);
  const ransomwareLinked = entries.filter((entry) => entry.ransomware).length;

  const monthBuckets = new Map<string, { added: number; ransomware: number }>();
  for (const entry of entries) {
    const month = entry.dateAdded.slice(0, 7);
    const bucket = monthBuckets.get(month) ?? { added: 0, ransomware: 0 };
    bucket.added += 1;
    if (entry.ransomware) bucket.ransomware += 1;
    monthBuckets.set(month, bucket);
  }

  const additionsByMonth = [...monthBuckets.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, bucket]) => ({ month, ...bucket }));

  const remediationWindows = entries
    .map((entry) => daysBetween(entry.dateAdded, entry.dueDate))
    .filter((days) => Number.isFinite(days) && days >= 0);

  return {
    catalogVersion: catalog.catalogVersion,
    releasedAt: catalog.dateReleased,
    total: entries.length,
    addedLast7Days: entries.filter((entry) => daysBetween(entry.dateAdded) <= 7).length,
    addedLast30Days: entries.filter((entry) => daysBetween(entry.dateAdded) <= 30).length,
    addedLast90Days: entries.filter((entry) => daysBetween(entry.dateAdded) <= 90).length,
    ransomwareLinked,
    ransomwareShare: entries.length ? ransomwareLinked / entries.length : 0,
    dueWithin7Days: entries.filter((entry) => entry.dueInDays >= 0 && entry.dueInDays <= 7).length,
    medianDaysToRemediate: median(remediationWindows),
    topVendors: tally(entries.map((entry) => entry.vendor), 8).map(({ key, count }) => ({ vendor: key, count })),
    topWeaknesses: tally(entries.flatMap((entry) => entry.cwes), 6).map(({ key, count }) => ({ cwe: key, count })),
    additionsByMonth,
    recent: [...entries]
      .sort((a, b) => b.dateAdded.localeCompare(a.dateAdded) || a.cve.localeCompare(b.cve))
      .slice(0, 12),
  };
}
