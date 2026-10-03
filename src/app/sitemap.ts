import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://securesense.io';

/** Public routes only. The Signal Desk is deliberately absent. */
const routes: Array<{ path: string; priority: number; changeFrequency: 'daily' | 'weekly' | 'monthly' }> = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/platform', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/solutions', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/integrations', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/community', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/company', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/request-a-quote', priority: 0.7, changeFrequency: 'monthly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
