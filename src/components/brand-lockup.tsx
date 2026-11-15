import Link from 'next/link';
import Image from 'next/image';

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
      className={cn('group inline-flex shrink-0 items-center rounded-sm bg-white px-3 py-2', className)}
      aria-label="SuleZeen home"
    >
      <Image src="/images/brand/sulezeen-logo.png" alt="SuleZeen" width={1664} height={388} className="h-auto w-[160px]" priority />
    </Link>
  );
}
