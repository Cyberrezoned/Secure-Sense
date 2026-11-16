'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { brandForPath } from '@/lib/brand-scope';
import cyberStyles from '@/components/cybersecurity/cyber-brand.module.css';

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
  if (brand === 'cyber') {
    return <Link href="/cybersecurity" onClick={onNavigate} className={cn(cyberStyles.lockup, className)} aria-label="ZeenTheCyber home">
      <Image src="/images/zeenthecyber/shield.svg" alt="" width={72} height={80} className={cyberStyles.shield} unoptimized />
      <span><span className={cyberStyles.name}>ZeenThe<span className={cyberStyles.blue}>Cyber</span></span><span className={cyberStyles.tagline}>SECURE TODAY. STRONGER TOMORROW.</span></span>
    </Link>;
  }
  if (brand !== 'sulezeen') {
    return <Link href="/studio" onClick={onNavigate} className={cn('inline-flex shrink-0 flex-col text-foreground', className)} aria-label="Creative Studio home">
      <span className="font-headline text-xl font-semibold tracking-tight">Creative Studio<span className="text-lime-500">.</span></span>
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
