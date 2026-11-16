'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { brandForPath } from '@/lib/brand-scope';

export function BrandScope({ children }: { children: ReactNode }) {
  const brand = brandForPath(usePathname());
  return <div data-brand={brand} className={`${brand === 'sulezeen' ? 'sulezeen-theme' : brand === 'cyber' ? 'cyber-theme' : ''} relative flex min-h-screen flex-col bg-background text-foreground font-body`}>{children}</div>;
}
