import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://securesense.io';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Internal surfaces. Also enforced in middleware, which is the control
        // that actually matters; this only keeps well-behaved crawlers away.
        disallow: ['/signal-desk', '/signal-desk/', '/api/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
