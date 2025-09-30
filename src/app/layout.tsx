import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { cn } from '@/lib/utils';
import './globals.css';

export const metadata: Metadata = {
  title: 'Secure Sense',
  description: 'The future of cybersecurity, today.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn(
        "min-h-screen bg-background font-body antialiased",
      )}>
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
