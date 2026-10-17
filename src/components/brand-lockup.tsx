import Link from 'next/link';

import { cn } from '@/lib/utils';

/**
 * The wordmark. Shared by the header and footer so the brand is defined once.
 */
export function BrandLockup({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      className={cn('group inline-flex shrink-0 items-baseline gap-1', className)}
      aria-label="Sule Zeen home"
    >
      <span className="font-headline text-[1.45rem] font-semibold tracking-[-0.055em] text-foreground">
        sule zeen
      </span>
      <span aria-hidden="true" className="text-[1.6rem] font-semibold leading-none text-primary">.</span>
    </Link>
  );
}
