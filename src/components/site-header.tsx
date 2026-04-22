'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ArrowRight, Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Overview' },
  { href: '/services', label: 'Services' },
  { href: '/platform', label: 'Platform' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/community', label: 'Resources' },
  { href: '/company', label: 'Company' },
  { href: '/contact', label: 'Contact' },
];

function isActive(pathname: string, href: string) {
  if (href === '/') {
    return pathname === '/';
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between gap-6">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
              <Logo className="h-6 w-6" />
            </div>
            <div>
              <p className="font-headline text-lg font-semibold text-foreground">Secure Sense</p>
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                Cyber Operations
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium text-muted-foreground transition-colors hover:text-foreground',
                  isActive(pathname, item.href) && 'text-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild variant="ghost" className="rounded-full">
            <Link href="/platform">AI Command Center</Link>
          </Button>
          <Button asChild className="rounded-full px-5">
            <Link href="/contact">
              Request Assessment
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full border border-border/70 lg:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open navigation</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[88vw] max-w-sm border-border/70 bg-background/95 p-0">
            <div className="flex h-full flex-col p-6">
              <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                  <Logo className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-headline text-lg font-semibold text-foreground">Secure Sense</p>
                  <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    Cyber Operations
                  </p>
                </div>
              </Link>

              <div className="mt-8 flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'rounded-2xl border border-transparent px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:border-border/70 hover:bg-card/70 hover:text-foreground',
                      isActive(pathname, item.href) && 'border-border/70 bg-card/70 text-foreground'
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="mt-auto rounded-[1.5rem] border border-border/70 bg-card/70 p-5">
                <p className="text-sm font-semibold text-foreground">Need a scoped engagement?</p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  Move straight into the contact flow and collect program details from buyers and technical teams.
                </p>
                <Button asChild className="mt-5 w-full rounded-full">
                  <Link href="/contact" onClick={() => setOpen(false)}>
                    Talk to the Team
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
