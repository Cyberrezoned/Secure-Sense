'use client';

import useSWR from 'swr';
import Link from 'next/link';
import { AlertTriangle, RefreshCw } from 'lucide-react';

import type { DisclosureVolume, EpssSnapshot, FeedResult, KevSummary, OssStackSnapshot } from '@/lib/intel';
import { KevTrendChart } from '@/components/intel/kev-trend-chart';
import { FeedAttribution, FeedUnavailable } from '@/components/intel/primitives';
import {
  dueSeverity,
  epssSeverity,
  formatCompact,
  formatCount,
  formatDate,
  formatEpss,
  formatPercent,
  formatRelative,
} from '@/lib/format';
import { cn } from '@/lib/utils';

type DeskFeed = {
  generatedAt: string;
  kev: FeedResult<KevSummary>;
  epss: FeedResult<EpssSnapshot>;
  disclosures: FeedResult<DisclosureVolume>;
  stack: FeedResult<OssStackSnapshot>;
};

const POLL_INTERVAL_MS = 120_000;

async function fetchFeed(url: string): Promise<DeskFeed> {
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Desk feed returned ${response.status}`);
  return response.json();
}

function Panel({
  title,
  meta,
  children,
  className,
}: {
  title: string;
  meta?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn('surface flex flex-col', className)}>
      <header className="flex items-center justify-between gap-4 border-b border-hairline px-5 py-3">
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
        {meta}
      </header>
      <div className="flex-1 p-5">{children}</div>
    </section>
  );
}

export function DeskConsole() {
  const { data, error, isLoading, isValidating, mutate } = useSWR<DeskFeed>(
    '/api/signal-desk/feed',
    fetchFeed,
    {
      refreshInterval: POLL_INTERVAL_MS,
      revalidateOnFocus: true,
      keepPreviousData: true,
    }
  );

  if (error && !data) {
    return (
      <div className="surface flex items-start gap-3 p-6" role="alert">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-signal-critical" aria-hidden="true" />
        <div>
          <p className="text-sm font-medium text-foreground">The desk feed is unreachable</p>
          <p className="mt-1 text-xs text-muted-foreground">{String(error.message ?? error)}</p>
          <button
            type="button"
            onClick={() => mutate()}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
          >
            <RefreshCw className="h-3 w-3" />
            Retry now
          </button>
        </div>
      </div>
    );
  }

  if (isLoading && !data) {
    return (
      <div className="grid gap-4 lg:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="surface h-56 animate-pulse" aria-hidden="true" />
        ))}
        <p className="sr-only">Loading desk feed</p>
      </div>
    );
  }

  if (!data) return null;

  const { kev, epss, disclosures, stack } = data;

  return (
    <div className="space-y-4">
      {/* Status bar */}
      <div className="surface flex flex-wrap items-center justify-between gap-4 px-5 py-3">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <span
              className="status-dot"
              data-status={isValidating ? 'low' : 'ok'}
              data-pulse="true"
              aria-hidden="true"
            />
            {isValidating ? 'Refreshing' : 'Live'}
          </span>
          <span>Snapshot {formatRelative(data.generatedAt)}</span>
          <span>Polling every {POLL_INTERVAL_MS / 1000}s</span>
        </div>
        <button
          type="button"
          onClick={() => mutate()}
          className="inline-flex items-center gap-1.5 rounded-full border border-hairline px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
        >
          <RefreshCw className={cn('h-3 w-3', isValidating && 'animate-spin')} />
          Refresh
        </button>
      </div>

      {/* Headline counters */}
      {kev.ok && disclosures.ok ? (
        <div className="surface grid grid-cols-2 divide-x divide-y divide-hairline sm:grid-cols-3 lg:grid-cols-6 lg:divide-y-0">
          {[
            { value: formatCount(kev.data.total), label: 'KEV entries' },
            { value: `+${formatCount(kev.data.addedLast7Days)}`, label: 'Added, 7d' },
            { value: formatCount(kev.data.dueWithin7Days), label: 'Deadlines inside 7d' },
            { value: formatPercent(kev.data.ransomwareShare, 0), label: 'Ransomware-linked' },
            { value: formatCompact(disclosures.data.totalCves), label: 'NVD records' },
            { value: formatCount(disclosures.data.dailyAverage), label: 'New CVEs/day' },
          ].map((tile) => (
            <div key={tile.label} className="px-4 py-5">
              <p className="font-headline text-2xl font-semibold tabular text-foreground">{tile.value}</p>
              <p className="mt-1 text-[0.6875rem] leading-snug text-muted-foreground">{tile.label}</p>
            </div>
          ))}
        </div>
      ) : null}

      <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <Panel title="KEV catalogue growth">
          {kev.ok ? (
            <>
              <KevTrendChart summary={kev.data} />
              <FeedAttribution
                source={kev.source}
                fetchedAt={kev.fetchedAt}
                note={`Released ${formatDate(kev.data.releasedAt)}`}
                className="mt-5 border-t border-hairline pt-4"
              />
            </>
          ) : (
            <FeedUnavailable source={kev.source} error={kev.error} className="border-0 shadow-none" />
          )}
        </Panel>

        <Panel
          title="Highest exploitation probability"
          meta={epss.ok ? <span className="mono-label">EPSS {epss.data.modelDate}</span> : null}
        >
          {epss.ok ? (
            <>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Modelled likelihood of exploitation within 30 days, across{' '}
                {formatCount(epss.data.scoredCves)} scored CVEs.
              </p>
              <ul className="mt-4 divide-y divide-hairline">
                {epss.data.highest.slice(0, 10).map((score) => (
                  <li key={score.cve} className="flex items-center justify-between gap-4 py-2">
                    <Link
                      href={`https://nvd.nist.gov/vuln/detail/${score.cve}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="font-code text-xs text-foreground hover:text-primary"
                    >
                      {score.cve}
                    </Link>
                    <span className="inline-flex items-center gap-2 text-xs">
                      <span
                        className="status-dot"
                        data-status={epssSeverity(score.probability)}
                        aria-hidden="true"
                      />
                      <span className="tabular font-medium text-foreground">
                        {formatEpss(score.probability)}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
              <FeedAttribution
                source={epss.source}
                fetchedAt={epss.fetchedAt}
                className="mt-5 border-t border-hairline pt-4"
              />
            </>
          ) : (
            <FeedUnavailable source={epss.source} error={epss.error} className="border-0 shadow-none" />
          )}
        </Panel>

        <Panel title="Newest KEV entries requiring action">
          {kev.ok ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-hairline">
                    <th scope="col" className="pb-2 pr-4 font-medium text-muted-foreground">CVE</th>
                    <th scope="col" className="pb-2 pr-4 font-medium text-muted-foreground">Vendor</th>
                    <th scope="col" className="pb-2 pr-4 font-medium text-muted-foreground">Added</th>
                    <th scope="col" className="pb-2 text-right font-medium text-muted-foreground">Deadline</th>
                  </tr>
                </thead>
                <tbody>
                  {kev.data.recent.map((entry) => (
                    <tr key={entry.cve} className="border-b border-hairline last:border-0">
                      <td className="py-2 pr-4">
                        <Link
                          href={`https://nvd.nist.gov/vuln/detail/${entry.cve}`}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="font-code text-foreground hover:text-primary"
                        >
                          {entry.cve}
                        </Link>
                        {entry.ransomware ? (
                          <span className="ml-2 chip text-signal-critical">ransomware</span>
                        ) : null}
                      </td>
                      <td className="py-2 pr-4 text-muted-foreground">{entry.vendor}</td>
                      <td className="py-2 pr-4 tabular text-muted-foreground">{formatDate(entry.dateAdded)}</td>
                      <td className="py-2 text-right">
                        <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                          <span
                            className="status-dot"
                            data-status={dueSeverity(entry.dueInDays)}
                            aria-hidden="true"
                          />
                          {entry.dueInDays < 0 ? 'passed' : `${entry.dueInDays}d`}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <FeedUnavailable source={kev.source} error={kev.error} className="border-0 shadow-none" />
          )}
        </Panel>

        <Panel
          title="Stack health"
          meta={
            stack.ok ? (
              <span className="mono-label">
                {stack.data.activeThisWeek}/{stack.data.projects.length} active
              </span>
            ) : null
          }
        >
          {stack.ok ? (
            <>
              <ul className="divide-y divide-hairline">
                {stack.data.projects.map((project) => (
                  <li key={project.repo} className="flex items-center justify-between gap-4 py-2">
                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium text-foreground">{project.name}</p>
                      <p className="font-code text-[0.625rem] text-muted-foreground">{project.repo}</p>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-2 text-[0.6875rem] text-muted-foreground">
                      <span className="tabular">{formatCompact(project.stars)}</span>
                      <span
                        className="status-dot"
                        data-status={project.daysSinceCommit > 90 ? 'moderate' : 'ok'}
                        aria-hidden="true"
                      />
                      {project.daysSinceCommit}d
                    </span>
                  </li>
                ))}
              </ul>
              <FeedAttribution
                source={stack.source}
                fetchedAt={stack.fetchedAt}
                className="mt-5 border-t border-hairline pt-4"
              />
            </>
          ) : (
            <FeedUnavailable source={stack.source} error={stack.error} className="border-0 shadow-none" />
          )}
        </Panel>
      </div>
    </div>
  );
}
