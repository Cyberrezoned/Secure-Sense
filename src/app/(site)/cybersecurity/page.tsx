import Link from 'next/link';
import { WorkflowExplorer } from '@/components/company/workflow-explorer';
import { Button } from '@/components/ui/button';
import { practices } from '@/lib/company';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata(
  'Cybersecurity',
  'Offensive security, managed detection and response, and compliance engineering from Sule Zeen. Evidence, remediation, and retesting on an open-source defensive stack.',
  '/cybersecurity',
);

const services = [
  {
    title: 'Offensive security',
    scope: 'Penetration testing and red teaming across web, API, cloud, and identity.',
    outputs: 'Reproducible findings, supporting evidence, prioritised remediation, and retest results for the agreed scope.',
    boundary: 'Targets, permitted techniques, access, and testing windows are agreed before assessment.',
  },
  {
    title: 'Detection & response',
    scope: 'Detection engineering, alert tuning, and incident workflows built on Wazuh, Suricata, and Sigma.',
    outputs: 'Detection rules, coverage reviews, triage procedures, and escalation paths for the monitored environment.',
    boundary: 'Monitoring hours, response commitments, and any 24/7 coverage are defined in the service agreement.',
  },
  {
    title: 'Compliance engineering',
    scope: 'Readiness programmes for ISO 27001, SOC 2, PCI DSS, and NDPR requirements.',
    outputs: 'Control mappings, an evidence register, gap assessments, and a remediation plan with named responsibilities.',
    boundary: 'The engagement supports audit readiness. Formal certification or assurance is determined by the relevant independent assessor.',
  },
  {
    title: 'Security engineering',
    scope: 'Application hardening, cloud and identity reviews, and secure development practices.',
    outputs: 'Architecture recommendations, configuration changes, and implementation checks agreed with your engineering team.',
    boundary: 'System ownership, change approvals, and verification criteria are established before implementation.',
  },
];

export default function CybersecurityPage() {
  return (
    <>
      <section className="border-b border-hairline">
        <div className="shell editorial-section">
          <p className="section-index">Practice 02 / Cybersecurity</p>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.5fr_0.7fr] lg:items-end lg:gap-16">
            <h1 className="editorial-title max-w-4xl">
              Find the weakness.<br />Verify the fix.
            </h1>
            <div className="border-l-2 border-primary pl-6">
              <p className="lede">
                Offensive security, detection and response, and compliance work
                carried through to evidence your team can use.
              </p>
              <p className="mt-5 text-sm leading-7 text-muted-foreground">
                Scope, technical findings, remediation, and verification stay connected
                throughout the engagement.
              </p>
            </div>
          </div>
          <a href="#security-scope" className="text-link mt-10">
            Explore the scope and deliverables <span aria-hidden="true">↘</span>
          </a>
        </div>
      </section>

      <section id="security-scope" className="shell editorial-section scroll-mt-24">
        <div className="grid gap-6 md:grid-cols-[0.45fr_1fr] md:gap-16">
          <p className="section-index">01 / What we deliver</p>
          <div>
            <h2 className="display-2 max-w-2xl">A defined scope.<br />A usable handover.</h2>
            <p className="lede mt-5 max-w-2xl">
              Engage a single service or connect assessment, implementation, and ongoing
              operations. Deliverables and responsibilities are agreed at the start.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-foreground/30 md:mt-16">
          {services.map((service, index) => (
            <article key={service.title} className="grid gap-7 border-b border-hairline py-9 lg:grid-cols-[0.75fr_1fr_0.85fr] lg:gap-12 lg:py-12">
              <div>
                <p className="section-index">0{index + 1}</p>
                <h3 className="mt-3 text-2xl font-semibold leading-tight">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{service.scope}</p>
              </div>
              <div>
                <p className="eyebrow">The handover</p>
                <p className="mt-4 text-base leading-7">{service.outputs}</p>
              </div>
              <div className="border-l border-hairline pl-5">
                <p className="eyebrow">Agreed before work begins</p>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{service.boundary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-hairline">
        <div className="shell editorial-section">
          <div className="grid gap-6 md:grid-cols-[0.45fr_1fr] md:gap-16">
            <p className="section-index">02 / How the work moves</p>
            <div>
              <h2 className="display-2 max-w-2xl">A finding is the beginning.</h2>
              <p className="lede mt-5 max-w-2xl">
                Follow an engagement from scope to assessment, evidence, remediation,
                and retesting. Each stage gives the next person something concrete to act on.
              </p>
            </div>
          </div>
          <div className="mt-10 md:mt-14"><WorkflowExplorer mode="security" /></div>
        </div>
      </section>

      <section className="shell editorial-section">
        <div className="blueprint-panel grid gap-10 p-7 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:p-14">
          <div>
            <p className="font-code text-xs uppercase tracking-[0.12em] text-white/70">03 / An inspectable defensive stack</p>
            <h2 className="mt-7 font-headline text-3xl font-semibold leading-tight !text-white sm:text-4xl">
              Open tools.<br />Visible engineering.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-white/80">
              The defensive stack is open-source and independently auditable.
              Your team can inspect the tools and the detection work behind them.
            </p>
          </div>
          <dl className="divide-y divide-white/20">
            {[
              ['Wazuh', 'Endpoint telemetry and security monitoring.'],
              ['Suricata', 'Network inspection and threat detection.'],
              ['Sigma', 'Detection rules that can be reviewed and adapted.'],
            ].map(([name, description]) => (
              <div key={name} className="grid gap-2 py-5 first:pt-0 sm:grid-cols-[7rem_1fr] sm:gap-6">
                <dt className="text-lg font-semibold text-white">{name}</dt>
                <dd className="text-sm leading-7 text-white/80">{description}</dd>
              </div>
            ))}
          </dl>
        </div>

        <details className="mt-10 border-y border-hairline py-6">
          <summary className="cursor-pointer text-sm font-semibold marker:text-primary">Full practice profile</summary>
          <p className="mt-5 max-w-4xl text-sm leading-8 text-muted-foreground">{practices[1].description}</p>
          <p className="mt-4 max-w-4xl border-l-2 border-primary pl-4 text-sm leading-7">
            Service hours, including any 24/7 coverage, response commitments, and the
            systems covered are agreed in the engagement contract.
          </p>
        </details>
      </section>

      <section className="border-t border-hairline">
        <div className="shell flex flex-col gap-8 py-14 md:flex-row md:items-end md:justify-between md:py-20">
          <div className="max-w-2xl">
            <p className="section-index">Work with Sule Zeen</p>
            <h2 className="display-2 mt-4">Start with the systems that matter.</h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              Bring your environment, a concern, or an upcoming audit. We will define the scope together.
            </p>
          </div>
          <Button asChild size="lg" className="self-start md:shrink-0">
            <Link href="/contact">Book a consultation <span aria-hidden="true">↗</span></Link>
          </Button>
        </div>
      </section>
    </>
  );
}
