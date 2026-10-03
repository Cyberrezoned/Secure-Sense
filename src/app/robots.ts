import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Internal surfaces. The real control is the gate in src/proxy.ts;
        // this only keeps well-behaved crawlers away.
        disallow: ['/signal-desk', '/signal-desk/', '/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
