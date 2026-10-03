import type { Metadata } from 'next';
import { DeskConsole } from '@/components/signal-desk/desk-console';

/**
 * Signal Desk — internal operations surface.
 *
 * Reachable only when SIGNAL_DESK_ENABLED is set and the request clears the
 * credential (and optional IP allowlist) check in src/proxy.ts. It is not
 * linked from the public navigation, is excluded from the sitemap, and is
 * disallowed in robots.txt.
 */
export const metadata: Metadata = {
  title: 'Signal Desk',
  description: 'Internal threat intelligence console.',
  robots: { index: false, follow: false, nocache: true },
};

// Always rendered per request: the desk must never serve a cached snapshot.
export const dynamic = 'force-dynamic';

export default function SignalDeskPage() {
  return (
    <div className="shell py-10 lg:py-14">
      <header className="flex flex-wrap items-end justify-between gap-6 border-b border-hairline pb-6">
        <div>
          <p className="eyebrow">Threat intelligence</p>
          <h1 className="display-2 mt-3">Signal Desk</h1>
          <p className="lede mt-3 max-w-2xl">
            Consolidated exploitation, disclosure, and stack telemetry for the operations team. Figures come straight
            from CISA, NIST, FIRST, and GitHub; nothing on this page is modelled or illustrative.
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-x-8 gap-y-2 text-xs">
          <dt className="text-muted-foreground">Classification</dt>
          <dd className="font-medium text-foreground">Internal</dd>
          <dt className="text-muted-foreground">Access</dt>
          <dd className="font-medium text-foreground">Credentialed</dd>
        </dl>
      </header>

      <div className="mt-8">
        <DeskConsole />
      </div>

      <footer className="mt-10 border-t border-hairline pt-5 text-xs text-muted-foreground">
        Upstream sources are public. The aggregation, prioritisation, and client mapping shown here are internal
        working material and should not be shared outside Secure Sense.
      </footer>
    </div>
  );
}
