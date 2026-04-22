import Link from 'next/link';
import { Github, Mail, MapPin } from 'lucide-react';

import { Logo } from '@/components/logo';

const footerGroups = [
  {
    title: 'Company',
    links: [
      { href: '/company', label: 'About Secure Sense' },
      { href: '/solutions', label: 'Industry Solutions' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Capabilities',
    links: [
      { href: '/services', label: 'Cybersecurity Services' },
      { href: '/platform', label: 'AI Compliance Platform' },
      { href: '/integrations', label: 'Integrations' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { href: '/community', label: 'Research Hub' },
      { href: '/community/blog/3', label: 'Threat Articles' },
      { href: '/contact', label: 'Request Assessment' },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background/80">
      <div className="container py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div className="max-w-md">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                <Logo className="h-6 w-6" />
              </div>
              <div>
                <p className="font-headline text-lg font-semibold text-foreground">Secure Sense</p>
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Cyber Operations and AI Compliance
                </p>
              </div>
            </Link>

            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              Security programs for modern organizations across offensive testing, managed defense,
              AI-assisted compliance, and security engineering.
            </p>

            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <a href="mailto:zenethecyber@icloud.com" className="flex items-center gap-3 hover:text-foreground">
                <Mail className="h-4 w-4 text-primary" />
                zenethecyber@icloud.com
              </a>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                Lagos, Nigeria
              </div>
              <a
                href="https://github.com/Cyberrezoned"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 hover:text-foreground"
              >
                <Github className="h-4 w-4 text-primary" />
                github.com/Cyberrezoned
              </a>
            </div>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <p className="font-headline text-base font-semibold text-foreground">{group.title}</p>
              <div className="mt-4 flex flex-col gap-3">
                {group.links.map((link) => (
                  <Link key={link.href} href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border/60 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Secure Sense. All rights reserved.</p>
          <p>Built for enterprise-grade cybersecurity positioning and routed by function.</p>
        </div>
      </div>
    </footer>
  );
}
