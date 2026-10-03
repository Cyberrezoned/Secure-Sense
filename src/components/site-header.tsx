'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { BrandLockup } from '@/components/brand-lockup';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/services', label: 'Services' },
  { href: '/platform', label: 'Platform' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/integrations', label: 'Integrations' },
  { href: '/community', label: 'Research' },
  { href: '/company', label: 'Company' },
];

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-surface">
      <div className="shell flex h-16 items-center justify-between gap-8">
        <div className="flex items-center gap-10">
          <BrandLockup />

          <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link"
                data-active={isActive(pathname, item.href) || undefined}
                aria-current={isActive(pathname, item.href) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Button asChild variant="ghost" size="sm">
            <Link href="/request-a-quote">Request a quote</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/contact">Book an assessment</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open navigation">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86vw] max-w-sm border-hairline p-0">
              <div className="flex h-full flex-col p-6">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <BrandLockup onNavigate={() => setOpen(false)} />

                <nav aria-label="Main" className="mt-8 flex flex-col">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'border-b border-hairline py-3 text-[0.9375rem] font-medium transition-colors',
                        isActive(pathname, item.href)
                          ? 'text-foreground'
                          : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <div className="mt-auto flex flex-col gap-2 pt-8">
                  <Button asChild>
                    <Link href="/contact" onClick={() => setOpen(false)}>
                      Book an assessment
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/request-a-quote" onClick={() => setOpen(false)}>
                      Request a quote
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
