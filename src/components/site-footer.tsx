'use client';

import { usePathname } from 'next/navigation';
import { brandForPath } from '@/lib/brand-scope';
import { CyberText, CyberLogo } from '@/components/cybersecurity/cyber-logo';
import Link from 'next/link';
import { ArrowUp, Github, Mail, MapPin, MessageCircle } from 'lucide-react';

import { BrandLockup } from '@/components/brand-lockup';
import { cybersecurityCommunity } from '@/lib/company';
import { CONTACT_EMAIL, CONTACT_EMAIL_HREF, WHATSAPP_HREF } from '@/lib/contact';

const footerGroups = [
  {
    title: 'Explore SuleZeen',
    links: [
      { href: '/supply-chain', label: 'Supply Chain' },
      { href: cybersecurityCommunity.href, label: cybersecurityCommunity.name },
      { href: '/studio', label: 'SuleZeen Studio' },
      // Linked here so the route is reachable rather than sitemap-only.
      { href: '/solutions', label: 'Industry solutions' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/company', label: 'About' },
      { href: '/community', label: 'Research' },
      { href: CONTACT_EMAIL_HREF, label: 'Contact' },
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

const cyberFooterGroups = [
  {
    title: 'Community resources',
    links: [
      { href: '/community', label: 'Research and explainers' },
      { href: '/platform', label: 'Security tools' },
      { href: '/integrations', label: 'Integration planning' },
    ],
  },
  {
    title: 'Security support',
    links: [
      { href: '/cybersecurity#security-scope', label: 'Security services' },
      { href: '/solutions', label: 'Industry solutions' },
      { href: '/contact?securityReview=1', label: 'Request a security review' },
    ],
  },
  footerGroups[2],
];

export function SiteFooter() {
  const cyber = brandForPath(usePathname()) === 'cyber';
  return (
    <footer className="border-t border-hairline bg-surface">
      <div className="shell py-14">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div data-reveal className="max-w-sm">
            <BrandLockup />

            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              {cyber ? 'A Nigerian cybersecurity community for people learning to defend digital systems. Read threat research, explore vulnerability data, and find practical guides to staying secure.' : <>Dispatch, tracking and verified handover for agricultural marketplaces. Built in Nigeria, with Web3 at the core. Home to the <CyberLogo variant="inline" /> cybersecurity community.</>}
            </p>

            <div className="mt-6 space-y-2.5 text-sm text-muted-foreground">
              <a
                href={CONTACT_EMAIL_HREF}
                className="flex items-center gap-2.5 hover:text-foreground"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                {CONTACT_EMAIL}
              </a>
              <a
                href={WHATSAPP_HREF}
                className="flex items-center gap-2.5 hover:text-foreground"
              >
                <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                WhatsApp +234 814 403 6429
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

          {(cyber ? cyberFooterGroups : footerGroups).map((group) => (
            <div key={group.title} data-reveal>
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
                        <CyberText>{link.label}</CyberText>
                      </a>
                    ) : (
                      <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                        <CyberText>{link.label}</CyberText>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-hairline pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} SuleZeen. All rights reserved.</p>
          <a className="footer-top" href="#main">Back to top <ArrowUp size={14} aria-hidden="true" /></a>
          <p>
            {cyber ? <Link href="/company" className="hover:text-foreground">About the parent company</Link> : 'Trade infrastructure. Cybersecurity. Built in Nigeria.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
