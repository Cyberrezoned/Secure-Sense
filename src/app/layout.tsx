import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, Inter, Inter_Tight } from 'next/font/google';

import { Toaster } from '@/components/ui/toaster';
import { MotionOrchestrator } from '@/components/motion-orchestrator';
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import './globals.css';

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://securesense.io';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Secure Sense | Cyber Defence, Offensive Security and Compliance',
    template: '%s | Secure Sense',
  },
  description:
    'Secure Sense delivers offensive security, managed detection and response, and audit-ready compliance on an open-source defensive stack.',
  applicationName: 'Secure Sense',
  openGraph: {
    type: 'website',
    siteName: 'Secure Sense',
    url: siteUrl,
    title: 'Secure Sense | Cyber Defence, Offensive Security and Compliance',
    description:
      'Offensive security, managed detection and response, and audit-ready compliance built on an open-source defensive stack.',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0d1117' },
  ],
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
