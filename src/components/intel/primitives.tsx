import Link from 'next/link';
import { AlertTriangle, ArrowUpRight } from 'lucide-react';

import type { FeedSource } from '@/lib/intel';
import { formatDateTime } from '@/lib/format';
import { cn } from '@/lib/utils';

/**
 * Display primitives for feed-backed data.
 *
 * The rule these enforce: a number is only ever rendered when the feed that
 * produced it actually responded. A failed feed renders `FeedUnavailable`,
 * never a zero, a dash, or a cached guess dressed up as current.
 */

export function MetricTile({
  value,
  label,
  detail,
  className,
}: {
  value: string;
  label: string;
  detail?: string;
  className?: string;
}) {
  return (
    <div className={cn('px-5 py-6', className)}>
      <p className="metric-value" data-metric>
        {value}
      </p>
      <p className="metric-label">{label}</p>
      {detail ? <p className="mt-1 text-xs text-muted-foreground/80">{detail}</p> : null}
    </div>
  );
}

/** Source attribution plus the observation time. Every live panel carries one. */
export function FeedAttribution({
  source,
  fetchedAt,
  note,
  className,
}: {
  source: FeedSource;
  fetchedAt: string;
  note?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.6875rem] text-muted-foreground',
        className
      )}
    >
      <span className="inline-flex items-center gap-1.5">
        <span className="status-dot" data-status="ok" data-pulse="true" aria-hidden="true" />
        Live
      </span>
      <span aria-hidden="true">·</span>
      <span>
        Source:{' '}
        <Link
          href={source.url}
          target="_blank"
          rel="noreferrer noopener"
          className="font-medium text-foreground underline decoration-hairline underline-offset-2 hover:decoration-foreground"
        >
          {source.name}
        </Link>
      </span>
      <span aria-hidden="true">·</span>
      <span>Retrieved {formatDateTime(fetchedAt)}</span>
      {note ? (
        <>
          <span aria-hidden="true">·</span>
          <span>{note}</span>
        </>
      ) : null}
    </div>
  );
}

/**
 * Shown when an upstream feed fails. States plainly that the data is missing
 * and names the upstream, which is more trustworthy than a plausible number.
 */
export function FeedUnavailable({
  source,
  error,
  className,
}: {
  source: FeedSource;
  error: string;
  className?: string;
}) {
  return (
    <div className={cn('surface flex items-start gap-3 p-5', className)} role="status">
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-signal-moderate" aria-hidden="true" />
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">{source.name} is not responding</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          Live figures are withheld rather than estimated. {error}
        </p>
        <Link
          href={source.url}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          Check the source directly
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-6 md:flex-row md:items-end md:justify-between', className)}>
      <div className="max-w-2xl">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 className="display-2 mt-3">{title}</h2>
        {description ? <p className="lede mt-4">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
