'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Shield } from 'lucide-react';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';

const mainNav = [
  { href: '/', label: 'Home' },
  { href: '/community', label: 'Community Hub' },
  { href: '/integrations', label: 'Integrations' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-6 text-primary glow-sm" />
            <span className="hidden font-bold sm:inline-block">Secure Sense</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'transition-colors hover:text-primary',
                  pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Search can go here */}
          </div>
          <nav className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild className="glow-sm">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </nav>
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link href="/" className="mr-6 flex items-center space-x-2" onClick={() => setOpen(false)}>
              <Logo className="h-6 w-6 text-primary glow-sm" />
              <span className="font-bold">Secure Sense</span>
            </Link>
            <div className="my-4 h-px w-full bg-border" />
            <div className="flex flex-col space-y-4">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'transition-colors hover:text-primary',
                    pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-auto flex flex-col space-y-2 pt-4">
              <Button variant="ghost" asChild>
                <Link href="/login" onClick={() => setOpen(false)}>Log In</Link>
              </Button>
              <Button asChild className="glow-sm">
                <Link href="/signup" onClick={() => setOpen(false)}>Sign Up</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
