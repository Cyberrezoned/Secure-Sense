'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw } from 'lucide-react';

import { Button } from '@/components/ui/button';

/**
 * Route-level error boundary for the public site. Shows a styled page instead
 * of the unbranded framework default, and never prints the raw error to the
 * visitor — only the digest, which is safe to quote in a support request.
 */
export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled route error:', error);
  }, [error]);

  return (
    <section className="shell py-24 lg:py-32">
      <p className="eyebrow">Something went wrong</p>
      <h1 className="display-1 mt-5 max-w-2xl">This page failed to load.</h1>
      <p className="lede mt-5 max-w-xl">
        The error has been logged. Retrying often resolves it; if it persists, contact us and quote the reference
        below.
      </p>

      {error.digest ? (
        <p className="mono-label mt-6">Reference: {error.digest}</p>
      ) : null}

      <div className="mt-10 flex flex-wrap gap-3">
        <Button onClick={reset}>
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Try again
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Back to home</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/contact">Contact us</Link>
        </Button>
      </div>
    </section>
  );
}
