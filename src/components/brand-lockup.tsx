'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { brandForPath } from '@/lib/brand-scope';

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
  const brand = brandForPath(usePathname());
  if (brand !== 'sulezeen') {
    const studio = brand === 'studio';
    return <Link href={studio ? '/studio' : '/cybersecurity'} onClick={onNavigate} className={cn('inline-flex shrink-0 flex-col text-foreground', className)} aria-label={studio ? 'Creative Studio home' : 'ZeenTheCyber home'}>
      <span className="font-headline text-xl font-semibold tracking-tight">{studio ? 'Creative Studio' : 'ZeenTheCyber'}<span className={studio ? 'text-lime-500' : 'text-primary'}>.</span></span>
      <span className="mt-0.5 text-[10px] tracking-wide text-muted-foreground">By SuleZeen</span>
    </Link>;
  }
  return (
    <Link
      href="/"
      onClick={onNavigate}
      className={cn('group inline-flex shrink-0 items-center rounded-sm bg-white px-2 py-2', className)}
      aria-label="SuleZeen home"
    >
      <Image src="/images/brand/sulezeen-logo.png" alt="SuleZeen" width={1664} height={388} className="h-auto w-[160px]" priority />
    </Link>
  );
}
