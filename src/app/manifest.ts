import type { MetadataRoute } from 'next';
import { SITE_NAME } from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: 'Web3, agricultural trade infrastructure and cybersecurity. Built in Nigeria.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F5F7EE',
    theme_color: '#0C5040',
    icons: [192, 512].map(size => ({ src: `/images/brand/icon-${size}.png`, sizes: `${size}x${size}`, type: 'image/png', purpose: 'any' })),
  };
}
