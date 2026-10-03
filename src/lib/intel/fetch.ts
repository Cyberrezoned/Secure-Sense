/**
 * Shared fetch primitives for the public intelligence feeds.
 *
 * Every upstream call returns a `FeedResult`, never a partially-populated
 * object. Callers must branch on `ok` before reading `data`, which keeps
 * "the feed is down" visually distinct from "the number is zero" instead of
 * silently rendering invented figures.
 */

export type FeedResult<T> =
  | { ok: true; data: T; fetchedAt: string; source: FeedSource }
  | { ok: false; error: string; fetchedAt: string; source: FeedSource };

export type FeedSource = {
  name: string;
  url: string;
  attribution: string;
};

const DEFAULT_TIMEOUT_MS = 12_000;

export async function fetchJson<T>(
  url: string,
  source: FeedSource,
  options: {
    revalidate?: number;
    timeoutMs?: number;
    headers?: Record<string, string>;
    /**
     * Bypass the Next data cache entirely. Required for payloads above the
     * 2MB cache ceiling, where the caller caches its own derived summary
     * instead of the raw response.
     */
    noStore?: boolean;
  } = {}
): Promise<FeedResult<T>> {
  const { revalidate = 1800, timeoutMs = DEFAULT_TIMEOUT_MS, headers = {}, noStore = false } = options;
  const fetchedAt = new Date().toISOString();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        accept: 'application/json',
        'user-agent': 'secure-sense-intel/1.0 (+https://www.zeenthecyber.online)',
        ...headers,
      },
      // `next.revalidate` is a Next.js extension to RequestInit.
      ...(noStore ? { cache: 'no-store' as RequestCache } : { next: { revalidate } }),
    } as RequestInit & { next?: { revalidate: number } });

    if (!response.ok) {
      return { ok: false, error: `${source.name} responded ${response.status}`, fetchedAt, source };
    }

    return { ok: true, data: (await response.json()) as T, fetchedAt, source };
  } catch (error) {
    const reason =
      error instanceof Error && error.name === 'AbortError'
        ? `${source.name} timed out after ${timeoutMs}ms`
        : error instanceof Error
          ? error.message
          : 'unknown transport error';

    return { ok: false, error: reason, fetchedAt, source };
  } finally {
    clearTimeout(timer);
  }
}

/** Days between two ISO-ish dates, floored. Negative when `to` precedes `from`. */
export function daysBetween(from: string | Date, to: string | Date = new Date()): number {
  const start = typeof from === 'string' ? new Date(from) : from;
  const end = typeof to === 'string' ? new Date(to) : to;
  return Math.floor((end.getTime() - start.getTime()) / 86_400_000);
}

export function isoDaysAgo(days: number): string {
  return new Date(Date.now() - days * 86_400_000).toISOString();
}

/**
 * Transform a successful feed payload while preserving the failure branch and
 * its metadata. Spreading the result directly would widen `ok` back to
 * `boolean` and lose the discriminant.
 */
export function mapFeed<T, U>(result: FeedResult<T>, transform: (data: T) => U): FeedResult<U> {
  if (!result.ok) {
    return { ok: false, error: result.error, fetchedAt: result.fetchedAt, source: result.source };
  }

  return { ok: true, data: transform(result.data), fetchedAt: result.fetchedAt, source: result.source };
}
