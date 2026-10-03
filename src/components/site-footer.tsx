import Link from 'next/link';
import { Github, Mail, MapPin } from 'lucide-react';

import { BrandLockup } from '@/components/brand-lockup';

const footerGroups = [
  {
    title: 'Capabilities',
    links: [
      { href: '/services', label: 'Security services' },
      { href: '/platform', label: 'Compliance platform' },
      { href: '/integrations', label: 'Integrations' },
      { href: '/solutions', label: 'Industry solutions' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/company', label: 'About' },
      { href: '/community', label: 'Research' },
      { href: '/contact', label: 'Contact' },
      { href: '/request-a-quote', label: 'Request a quote' },
    ],
  },
  {
    title: 'Data sources',
    links: [
      { href: 'https://www.cisa.gov/known-exploited-vulnerabilities-catalog', label: 'CISA KEV catalogue', external: true },
      { href: 'https://nvd.nist.gov/', label: 'NIST NVD', external: true },
      { href: 'https://www.first.org/epss/', label: 'FIRST EPSS', external: true },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-surface">
      <div className="shell py-14">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <BrandLockup />

            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Offensive security, managed detection and response, and audit-ready compliance, delivered on an
              open-source defensive stack.
            </p>

            <div className="mt-6 space-y-2.5 text-sm text-muted-foreground">
              <a
                href="mailto:zenethecyber@icloud.com"
                className="flex items-center gap-2.5 hover:text-foreground"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                zenethecyber@icloud.com
              </a>
              <p className="flex items-center gap-2.5">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                Lagos, Nigeria
              </p>
              <a
                href="https://github.com/Cyberrezoned"
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-2.5 hover:text-foreground"
              >
                <Github className="h-3.5 w-3.5" aria-hidden="true" />
                github.com/Cyberrezoned
              </a>
            </div>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <p className="text-[0.8125rem] font-semibold text-foreground">{group.title}</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    {'external' in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-hairline pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Secure Sense. All rights reserved.</p>
          <p>
            Vulnerability data courtesy of CISA, NIST, and FIRST. Figures are retrieved live and attributed at the
            point of use.
          </p>
        </div>
      </div>
    </footer>
  );
}
