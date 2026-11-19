import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL, SOCIAL_IMAGE } from '@/lib/site';
import { brandForPath } from '@/lib/brand-scope';

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = `${SITE_URL}${path}`;
  const cyber = brandForPath(path) === 'cyber';
  const siteName = cyber ? 'ZeenTheCyber' : SITE_NAME;
  const socialTitle = title === siteName ? title : `${title} | ${siteName}`;
  const image = cyber ? { url: '/images/zeenthecyber/shield.png', width: 1440, height: 1600, alt: 'ZeenTheCyber shield and padlock' } : SOCIAL_IMAGE;
  return {
    title: cyber ? { absolute: socialTitle } : title,
    description,
    alternates: { canonical: url },
    ...(cyber ? { icons: { icon: [{ url: '/images/zeenthecyber/shield.svg', type: 'image/svg+xml', sizes: 'any' }] } } : {}),
    openGraph: { type: 'website', siteName, title: socialTitle, description, url, images: [image], locale: 'en_NG' },
    twitter: { card: cyber ? 'summary' : 'summary_large_image', title: socialTitle, description, images: [image] },
  };
}
