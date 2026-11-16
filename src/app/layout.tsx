import type { Metadata, Viewport } from 'next';
import { Noto_Sans, Inter, Inter_Tight, IBM_Plex_Mono } from 'next/font/google';

import { Toaster } from '@/components/ui/toaster';
import { MotionOrchestrator } from '@/components/motion-orchestrator';
import { ThemeProvider } from '@/components/theme-provider';
import { SITE_NAME, SITE_URL, SOCIAL_IMAGE } from '@/lib/site';
import { COMPANY_DESCRIPTION, COMPANY_TITLE } from '@/lib/company';
import { cn } from '@/lib/utils';
import './globals.css';
import './cyber-theme.css';

/**
 * Document shell only.
 *
 * Page chrome belongs to the route groups: `(site)` carries the public header
 * and footer, `(internal)` carries the minimal operations chrome. Keeping that
 * split here is what stops internal surfaces inheriting marketing navigation.
 *
 * Fonts are self-hosted through next/font rather than a Google Fonts
 * stylesheet link, which removes a render-blocking third-party request.
 */
const brand = Noto_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-brand',
  weight: ['400', '700'],
});

const sans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const display = Inter_Tight({
  subsets: ['latin'],
  display: 'swap',
  weight: ['500', '600', '700'],
  variable: '--font-display',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: COMPANY_TITLE,
    template: '%s | SuleZeen',
  },
  description: COMPANY_DESCRIPTION,
  applicationName: SITE_NAME,
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [{ url: '/favicon.ico', sizes: '16x16 32x32 48x48' }, { url: '/images/brand/icon-192.png', sizes: '192x192', type: 'image/png' }],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    url: SITE_URL,
    title: COMPANY_TITLE,
    description: COMPANY_DESCRIPTION,
    images: [SOCIAL_IMAGE],
    locale: 'en_NG',
  },
  twitter: { card: 'summary_large_image', title: COMPANY_TITLE, description: COMPANY_DESCRIPTION, images: [SOCIAL_IMAGE] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0C5040',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          sans.variable,
          display.variable,
          mono.variable,
          brand.variable,
          'min-h-screen bg-background font-body text-foreground antialiased'
        )}
      >
        <ThemeProvider>
          <MotionOrchestrator />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
