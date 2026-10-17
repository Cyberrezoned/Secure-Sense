import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Button } from '@/components/ui/button';

/**
 * Root 404.
 *
 * Lives at the app root rather than inside the (site) group: a not-found file
 * in a route group does not catch globally unmatched URLs, so placing it only
 * there left visitors on the unbranded framework default. The root layout is
 * the document shell only, so this supplies the site chrome itself.
 */
export const metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

const destinations = [
  { href: '/supply-chain', label: 'Supply Chain' },
  { href: '/cybersecurity', label: 'Cybersecurity' },
  { href: '/products', label: 'ZeenTheCyber' },
  { href: '/community', label: 'Research' },
];

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main" className="flex-1">
        <section className="shell py-24 lg:py-32">
          <p className="eyebrow">Error 404</p>
          <h1 className="display-1 mt-5 max-w-2xl">This page does not exist.</h1>
          <p className="lede mt-5 max-w-xl">
            The address may be mistyped, or the page may have moved. These are the main destinations.
          </p>

          <ul className="mt-10 grid max-w-2xl gap-px overflow-hidden rounded-md border border-hairline bg-hairline sm:grid-cols-2">
            {destinations.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between gap-4 bg-card px-5 py-4 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  {item.label}
                  <ArrowRight className="h-4 w-4 text-primary" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/">Back to home</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">Contact us</Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
