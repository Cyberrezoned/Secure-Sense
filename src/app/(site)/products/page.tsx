import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata(
  'Products / ZeenTheCyber',
  "ZeenTheCyber is Sule Zeen's distinct cybersecurity product brand, covering exposure prioritisation, control mapping, evidence and security workflows.",
  '/products',
);

const productAreas = [
  {
    number: '01',
    name: 'Platform',
    purpose: 'Exposure, controls and evidence',
    description: 'Review the workspace for vulnerability prioritisation, framework guidance and evidence management. The platform page brings together CISA KEV intelligence, compliance tools and workflow routing.',
    href: '/platform',
    action: 'Explore the platform',
  },
  {
    number: '02',
    name: 'Integrations',
    purpose: 'The handoff into operational work',
    description: 'Explore collaboration, engineering and reporting workflows: where alert summaries go, how findings become remediation tasks, and how their evidence is carried into reporting.',
    href: '/integrations',
    action: 'Review integration options',
  },
  {
    number: '03',
    name: 'Research',
    purpose: 'Context for security decisions',
    description: 'Browse technical articles and explainers on phishing, cloud security, identity and other threats, alongside tools for summarising and organising cybersecurity content.',
    href: '/community',
    action: 'Read the research',
  },
];

export default function ProductsPage() {
  return (
    <>
      <section className="shell editorial-section">
        <p className="section-index">Products / A Sule Zeen brand</p>
        <h1 className="editorial-title mt-10 text-[clamp(2.25rem,8.8vw,7.5rem)]">ZeenTheCyber.</h1>
        <div className="mt-10 grid gap-8 border-t border-hairline pt-8 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
          <h2 className="max-w-md font-headline text-2xl font-semibold leading-tight md:text-3xl">A security workspace for exposure, controls and evidence.</h2>
          <div>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">ZeenTheCyber is the distinct cybersecurity product brand within Sule Zeen. Its focus is the work between identifying a security problem, assigning action and keeping the evidence needed to review it.</p>
            <Link href="/platform" className="text-link mt-7">Explore the platform<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="blueprint-panel">
        <div className="shell editorial-section grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-white/60">The product question</p>
            <h2 className="mt-6 max-w-lg font-headline text-3xl font-semibold leading-tight text-white md:text-4xl">What needs attention, and what shows it has been addressed?</h2>
          </div>
          <ol className="divide-y divide-white/20 border-y border-white/20">
            {[
              { label: 'Exposure', detail: 'Understand the finding and the exploitation context behind its priority.' },
              { label: 'Action', detail: 'Connect the finding to an owner and the engineering workflow.' },
              { label: 'Evidence', detail: 'Keep the records required to review the action and map it to controls.' },
            ].map((item) => (
              <li key={item.label} className="grid gap-3 py-6 sm:grid-cols-[7rem_1fr] sm:gap-6">
                <span className="text-sm font-semibold text-white">{item.label}</span>
                <p className="text-sm leading-7 text-white/75">{item.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="shell editorial-section">
        <p className="section-index">Explore ZeenTheCyber</p>
        <div className="mt-10 border-t border-hairline">
          {productAreas.map((area) => (
            <article key={area.name} className="grid gap-6 border-b border-hairline py-10 md:grid-cols-[3rem_1fr_1.3fr] md:gap-8 lg:py-12">
              <span className="font-mono text-sm text-primary" aria-hidden="true">{area.number}</span>
              <div>
                <h2 className="font-headline text-2xl font-semibold md:text-3xl">{area.name}</h2>
                <p className="mt-3 text-sm text-muted-foreground">{area.purpose}</p>
              </div>
              <div>
                <p className="max-w-xl text-base leading-7 text-muted-foreground">{area.description}</p>
                <Link href={area.href} className="text-link mt-6">{area.action}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-hairline">
        <div className="shell editorial-section grid gap-8 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
          <div>
            <p className="section-index">Product and practice</p>
            <h2 className="mt-5 max-w-md font-headline text-3xl font-semibold leading-tight">Discuss the work around your security tools.</h2>
          </div>
          <div>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">Sule Zeen&apos;s cybersecurity practice covers penetration testing, detection and response, and compliance engineering. A consultation can establish where the product fits and where an engagement is needed.</p>
            <div className="mt-7 flex flex-wrap gap-x-8 gap-y-5">
              <Link href="/contact" className="text-link">Book a consultation<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              <Link href="/cybersecurity" className="text-link">Explore cybersecurity<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
