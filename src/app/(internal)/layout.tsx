import type { Metadata } from 'next';
import Link from 'next/link';
import { Lock } from 'lucide-react';

import { BrandLockup } from '@/components/brand-lockup';
import { ThemeToggle } from '@/components/theme-toggle';

/**
 * Internal operations chrome.
 *
 * Deliberately free of marketing navigation and conversion CTAs: these routes
 * are tools, not pages a prospect should ever see. Access is enforced upstream
 * in src/proxy.ts, not here.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

const internalNav = [{ href: '/signal-desk', label: 'Signal Desk' }];

export default function InternalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <header className="border-b border-hairline bg-surface">
        <div className="shell flex h-14 items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <BrandLockup />
            <span className="chip gap-1.5 text-muted-foreground">
              <Lock className="h-3 w-3" aria-hidden="true" />
              Internal
            </span>
            <nav aria-label="Internal" className="hidden items-center gap-6 sm:flex">
              {internalNav.map((item) => (
                <Link key={item.href} href={item.href} className="nav-link" data-active>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main id="main" className="flex-1">
        {children}
      </main>

      <footer className="border-t border-hairline bg-surface">
        <div className="shell py-5 text-xs text-muted-foreground">
          Internal tooling. Not for distribution outside Secure Sense.
        </div>
      </footer>
    </div>
  );
}
