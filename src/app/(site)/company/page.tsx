import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { COMPANY_DESCRIPTION } from '@/lib/company';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata('Company', COMPANY_DESCRIPTION, '/company');

const practices = [
  {
    number: '01',
    name: 'Supply-chain infrastructure',
    description: 'Commodity records connect farmers, warehouse operators, merchants and financiers. Our work covers the path from a graded delivery to a verified warehouse receipt, an offtake order and a financing decision.',
    detail: 'Electronic warehouse receipts / signed records / escrow workflows',
    href: '/supply-chain',
  },
  {
    number: '02',
    name: 'Cybersecurity',
    description: 'We examine how systems can be compromised, develop detection and response workflows, and organise the controls and evidence required for compliance. The practice works across applications, APIs, cloud infrastructure and identity.',
    detail: 'Offensive security / detection and response / compliance engineering',
    href: '/cybersecurity',
  },
];

const brands = [
  {
    name: 'Sule Zeen',
    role: 'Company',
    description: 'The Nigerian technology company behind the supply-chain infrastructure and cybersecurity practices.',
  },
  {
    name: 'ZeenTheCyber',
    role: 'Product brand',
    description: 'A distinct cybersecurity product identity for the platform, integrations and research resources.',
    href: '/products',
  },
  {
    name: 'Sule Zeen Studio',
    role: 'Proposed media extension',
    description: 'A planned media and learning venture, beginning with digital safety for emerging creators and small online businesses.',
    href: '/studio',
  },
];

export default function CompanyPage() {
  return (
    <>
      <section className="shell editorial-section">
        <p className="section-index">Company / Nigeria</p>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-20">
          <h1 className="editorial-title">Sule Zeen.</h1>
          <p className="max-w-xl text-xl leading-relaxed text-muted-foreground md:text-2xl">{COMPANY_DESCRIPTION}</p>
        </div>
        <p className="mt-12 border-t border-hairline pt-6 text-sm text-muted-foreground">Trade infrastructure. Cybersecurity. Built in Nigeria.</p>
      </section>

      <section className="border-y border-hairline">
        <div className="shell editorial-section grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
          <div>
            <p className="section-index">01 / Why these practices</p>
            <h2 className="mt-6 max-w-sm font-headline text-3xl font-semibold leading-tight md:text-4xl">Who did what, under whose authority?</h2>
          </div>
          <div className="max-w-2xl space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>A warehouse receipt records a delivery. An access log records an action. Both become useful when the people relying on them can establish who created the record, what changed and who had permission to act.</p>
            <p>That is the engineering concern linking our two practices: identity, authenticity, access controls and accountable records. In commodity trade, these questions sit behind custody and financing decisions. In cybersecurity, they shape prevention, investigation and evidence.</p>
            <p>We approach each practice through its own operational requirements, with a shared emphasis on systems that can be examined and decisions that can be traced.</p>
          </div>
        </div>
      </section>

      <section className="shell editorial-section">
        <p className="section-index">02 / Our two practices</p>
        <div className="mt-10 border-t border-hairline">
          {practices.map((practice) => (
            <article key={practice.name} className="grid gap-6 border-b border-hairline py-10 md:grid-cols-[3rem_1fr_1.2fr] md:gap-8 lg:py-12">
              <span className="font-mono text-sm text-primary" aria-hidden="true">{practice.number}</span>
              <h2 className="max-w-sm font-headline text-2xl font-semibold leading-tight md:text-3xl">{practice.name}</h2>
              <div>
                <p className="text-base leading-7 text-muted-foreground">{practice.description}</p>
                <p className="mt-5 text-xs leading-6 text-muted-foreground">{practice.detail}</p>
                <Link href={practice.href} className="text-link mt-6">Explore the practice<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-hairline bg-surface">
        <div className="shell editorial-section">
          <div className="grid gap-6 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
            <p className="section-index">03 / Company and brands</p>
            <h2 className="max-w-xl font-headline text-3xl font-semibold leading-tight md:text-4xl">A clear role for each name.</h2>
          </div>
          <dl className="mt-12 border-t border-hairline">
            {brands.map((brand) => (
              <div key={brand.name} className="grid gap-4 border-b border-hairline py-7 md:grid-cols-[1fr_1fr_2fr] md:gap-8">
                <dt className="text-lg font-semibold">{brand.name}</dt>
                <dd className="text-sm text-muted-foreground">{brand.role}</dd>
                <dd>
                  <p className="text-sm leading-7 text-muted-foreground">{brand.description}</p>
                  {brand.href ? <Link href={brand.href} className="text-link mt-4">Explore {brand.name}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link> : null}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="shell editorial-section grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
        <div>
          <p className="section-index">Work with Sule Zeen</p>
          <h2 className="mt-5 max-w-xl font-headline text-3xl font-semibold leading-tight md:text-4xl">Start with the system you need to build or secure.</h2>
        </div>
        <div className="md:justify-self-end">
          <Link href="/contact" className="text-link">Book a consultation<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
      </section>
    </>
  );
}
