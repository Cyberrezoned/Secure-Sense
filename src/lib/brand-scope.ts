/** Shared route ownership for both page styling and the navigation wordmark. */
export function brandForPath(path: string) {
  if (path === '/studio' || path.startsWith('/studio/')) return 'studio';
  if (['/cybersecurity', '/community', '/platform', '/integrations', '/solutions', '/products'].some(route => path === route || path.startsWith(`${route}/`))) return 'cyber';
  return 'sulezeen';
}
