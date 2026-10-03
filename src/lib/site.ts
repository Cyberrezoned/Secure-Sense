/**
 * Canonical public origin — single source of truth.
 *
 * Used for `metadataBase`, Open Graph URLs, the sitemap, and the robots
 * sitemap pointer. Keep it here rather than per-file: when these drifted
 * apart the sitemap advertised a hostname that no longer resolved.
 *
 * Override per environment with NEXT_PUBLIC_SITE_URL (no trailing slash).
 */
/*
 * Must be the host that actually serves a 200. The apex
 * (zeenthecyber.online) 307-redirects to www, so declaring the apex here
 * would point every sitemap entry and og:url at a redirect. If the apex is
 * ever made primary in Vercel, change this to match.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zeenthecyber.online'
).replace(/\/+$/, '');

export const SITE_NAME = 'Secure Sense';
