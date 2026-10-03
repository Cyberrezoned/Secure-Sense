/**
 * Canonical public origin — single source of truth.
 *
 * Used for `metadataBase`, Open Graph URLs, the sitemap, and the robots
 * sitemap pointer. Keep it here rather than per-file: when these drifted
 * apart the sitemap advertised a hostname that no longer resolved.
 *
 * Override per environment with NEXT_PUBLIC_SITE_URL (no trailing slash).
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zeenthecyber.online').replace(
  /\/+$/,
  ''
);

export const SITE_NAME = 'Secure Sense';
