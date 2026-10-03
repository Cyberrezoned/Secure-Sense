import Link from 'next/link';

import { Logo } from '@/components/logo';
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
      className={cn('group inline-flex items-center gap-2.5', className)}
      aria-label="Secure Sense home"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <Logo className="h-[1.125rem] w-[1.125rem]" />
      </span>
      <span className="font-headline text-[1.0625rem] font-semibold tracking-tight text-foreground">
        Secure Sense
      </span>
    </Link>
  );
}
