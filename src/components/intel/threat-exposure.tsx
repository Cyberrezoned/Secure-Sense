import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { getDisclosureVolume, getKevSummary } from '@/lib/intel';
import { formatCompact, formatCount, formatDate, formatPercent } from '@/lib/format';
import { KevTrendChart } from '@/components/intel/kev-trend-chart';
import { FeedAttribution, FeedUnavailable, MetricTile, SectionHeader } from '@/components/intel/primitives';
import { dueSeverity } from '@/lib/format';

/**
 * Public threat-exposure panel.
 *
 * Every figure is pulled from CISA and NIST at render time and cached by the
 * Next data cache. Nothing here is illustrative: if a feed is down the panel
 * says so instead of showing a placeholder.
 */
export async function ThreatExposure() {
  const [kev, disclosures] = await Promise.all([getKevSummary(), getDisclosureVolume()]);

  return (
    <section className="shell py-20 lg:py-24" aria-labelledby="threat-exposure-title">
      <SectionHeader
        eyebrow="Live exposure data"
        title="The vulnerabilities being exploited right now"
        description="Drawn directly from the CISA Known Exploited Vulnerabilities catalogue and the National Vulnerability Database. These are the public figures our remediation priorities are built on."
        action={
          <Link
            href="https://www.cisa.gov/known-exploited-vulnerabilities-catalog"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            View the catalogue
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        }
      />
      <h2 id="threat-exposure-title" className="sr-only">
        Live exposure data
      </h2>

      <div className="mt-10 grid gap-4 lg:grid-cols-[1.35fr_1fr]">
        <div className="surface overflow-hidden">
          {kev.ok ? (
            <>
              <div className="grid grid-cols-2 divide-x divide-hairline border-b border-hairline sm:grid-cols-4">
                <MetricTile value={formatCount(kev.data.total)} label="CVEs confirmed exploited" />
                <MetricTile value={`+${formatCount(kev.data.addedLast30Days)}`} label="Added in the last 30 days" />
                <MetricTile
                  value={formatPercent(kev.data.ransomwareShare, 0)}
                  label="Linked to ransomware campaigns"
                />
                <MetricTile
                  value={formatCount(kev.data.medianDaysToRemediate)}
                  label="Median days granted to remediate"
                />
              </div>
              <div className="p-5 sm:p-6">
                <KevTrendChart summary={kev.data} />
                <FeedAttribution
                  source={kev.source}
                  fetchedAt={kev.fetchedAt}
                  note={`Catalogue released ${formatDate(kev.data.releasedAt)}`}
                  className="mt-5 border-t border-hairline pt-4"
                />
              </div>
            </>
          ) : (
            <FeedUnavailable source={kev.source} error={kev.error} className="m-5 border-0 shadow-none" />
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="surface p-5 sm:p-6">
            <p className="eyebrow">Disclosure volume</p>
            {disclosures.ok ? (
              <>
                <div className="mt-5 grid grid-cols-2 gap-5">
                  <div>
                    <p className="metric-value" data-metric>
                      {formatCompact(disclosures.data.totalCves)}
                    </p>
                    <p className="metric-label">CVE records in the NVD</p>
                  </div>
                  <div>
                    <p className="metric-value" data-metric>
                      {formatCount(disclosures.data.dailyAverage)}
                    </p>
                    <p className="metric-label">New CVEs per day, 30-day mean</p>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  {formatCount(disclosures.data.publishedLast7Days)} vulnerabilities were published in the last seven
                  days alone. Triage capacity, not disclosure volume, is the constraint most security programmes hit
                  first.
                </p>
                <FeedAttribution
                  source={disclosures.source}
                  fetchedAt={disclosures.fetchedAt}
                  className="mt-5 border-t border-hairline pt-4"
                />
              </>
            ) : (
              <FeedUnavailable
                source={disclosures.source}
                error={disclosures.error}
                className="mt-5 border-0 shadow-none px-0"
              />
            )}
          </div>

          {kev.ok ? (
            <div className="surface flex-1 p-5 sm:p-6">
              <div className="flex items-baseline justify-between gap-4">
                <p className="eyebrow">Newest entries</p>
                <p className="mono-label">Federal deadline</p>
              </div>
              <ul className="mt-4 divide-y divide-hairline">
                {kev.data.recent.slice(0, 5).map((entry) => (
                  <li key={entry.cve} className="flex items-start justify-between gap-4 py-3 first:pt-0">
                    <div className="min-w-0">
                      <p className="font-code text-xs font-medium text-foreground">{entry.cve}</p>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground" title={entry.name}>
                        {entry.vendor} · {entry.product}
                      </p>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
                      <span
                        className="status-dot"
                        data-status={dueSeverity(entry.dueInDays)}
                        aria-hidden="true"
                      />
                      {entry.dueInDays < 0 ? 'passed' : `${entry.dueInDays}d`}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-hairline pt-4 text-[0.6875rem] text-muted-foreground">
                Deadlines shown are the remediation dates CISA sets for federal civilian agencies under BOD 22-01.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
