import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '@/lib/site';

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = `${SITE_URL}${path}`;
  const socialTitle = `${title} | ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: 'website', siteName: SITE_NAME, title: socialTitle, description, url },
    twitter: { card: 'summary', title: socialTitle, description },
  };
}
