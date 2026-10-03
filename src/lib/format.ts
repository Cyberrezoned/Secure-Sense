/** Presentation helpers. Deterministic and locale-pinned so SSR and client agree. */

const LOCALE = 'en-US';

export function formatCount(value: number): string {
  return new Intl.NumberFormat(LOCALE).format(value);
}

/** 1_733 -> "1.7K", 145_442 -> "145K". For dense metric tiles. */
export function formatCompact(value: number): string {
  return new Intl.NumberFormat(LOCALE, { notation: 'compact', maximumFractionDigits: 1 }).format(value);
}

export function formatPercent(fraction: number, fractionDigits = 1): string {
  return new Intl.NumberFormat(LOCALE, {
    style: 'percent',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(fraction);
}

export function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return 'unknown';

  return new Intl.DateTimeFormat(LOCALE, { year: 'numeric', month: 'short', day: '2-digit', timeZone: 'UTC' }).format(date);
}

export function formatDateTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return 'unknown';

  return new Intl.DateTimeFormat(LOCALE, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
    timeZoneName: 'short',
  }).format(date);
}

/** "2026-09" -> "Sep 2026" for month-bucketed series. */
export function formatMonth(month: string): string {
  const date = new Date(`${month}-01T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return month;

  return new Intl.DateTimeFormat(LOCALE, { month: 'short', year: '2-digit', timeZone: 'UTC' }).format(date);
}

export function formatRelative(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return 'unknown';

  const seconds = Math.round((Date.now() - date.getTime()) / 1000);
  if (seconds < 45) return 'just now';
  if (seconds < 5400) return `${Math.round(seconds / 60)}m ago`;
  if (seconds < 172_800) return `${Math.round(seconds / 3600)}h ago`;
  return `${Math.round(seconds / 86_400)}d ago`;
}

export function formatDays(days: number): string {
  if (days === 0) return 'today';
  if (days === 1) return '1 day';
  return `${formatCount(days)} days`;
}

/**
 * EPSS probabilities, displayed honestly.
 *
 * The model saturates at 0.99999, which rounds to "100%" and reads as
 * certainty the model never asserts. Values at or near the ceiling are shown
 * as a bound instead, and very small ones avoid collapsing to a bare "0%".
 */
export function formatEpss(probability: number): string {
  if (probability >= 0.999) return '>99.9%';
  if (probability > 0 && probability < 0.001) return '<0.1%';
  return formatPercent(probability, 1);
}

export type Severity = 'critical' | 'high' | 'moderate' | 'low' | 'ok';

/** Map an EPSS probability (0-1) onto the severity channel. */
export function epssSeverity(probability: number): Severity {
  if (probability >= 0.5) return 'critical';
  if (probability >= 0.1) return 'high';
  if (probability >= 0.01) return 'moderate';
  return 'low';
}

/** Map a KEV remediation deadline onto the severity channel. */
export function dueSeverity(dueInDays: number): Severity {
  if (dueInDays < 0) return 'critical';
  if (dueInDays <= 7) return 'high';
  if (dueInDays <= 21) return 'moderate';
  return 'low';
}
