import Link from 'next/link';
import {
  Activity,
  ArrowRight,
  Fingerprint,
  ShieldCheck,
  ShieldEllipsis,
  SquareTerminal,
} from 'lucide-react';

import { CtaBanner } from '@/components/company/cta-banner';
import { PageHero } from '@/components/company/page-hero';
import { SectionHeading } from '@/components/company/section-heading';
import { Button } from '@/components/ui/button';

const services = [
  {
    title: 'Offensive Security',
    description:
      'Penetration testing, red teaming, web application reviews, API assessments, cloud validation, and internal attack-path analysis.',
    icon: Fingerprint,
    items: ['Web, API, mobile, and cloud assessments', 'Red teaming and adversary simulation', 'Retesting and remediation validation'],
  },
  {
    title: 'Managed Defense',
    description:
      'Operational support for monitoring, incident readiness, detection coverage, and security program maturity.',
    icon: Activity,
    items: ['Detection tuning and coverage reviews', 'Incident response preparation', 'Vulnerability and exposure management'],
  },
  {
    title: 'Compliance and Assurance',
    description:
      'Programs that map controls, collect evidence, align stakeholders, and keep teams ready for audits and customer assurance requests.',
    icon: ShieldCheck,
    items: ['ISO 27001, PCI DSS, SOC 2, NDPR alignment', 'Control mapping and documentation', 'Audit readiness and gap assessments'],
  },
  {
    title: 'Security Engineering',
    description:
      'Secure architecture, DevSecOps, application hardening, and implementation support for companies building or scaling digital products.',
    icon: SquareTerminal,
    items: ['Secure SDLC and architecture reviews', 'Cloud hardening and IAM guardrails', 'Remediation support for engineering teams'],
  },
];

const deliverySteps = [
  {
    step: '01',
    title: 'Frame the risk',
    description: 'Define scope by business priority, technology context, regulatory pressure, and attack surface.',
  },
  {
    step: '02',
    title: 'Validate exposure',
    description: 'Run technical assessment, evidence gathering, and program review against realistic scenarios.',
  },
  {
    step: '03',
    title: 'Prioritize action',
    description: 'Translate findings into remediation paths, ownership, and decision-ready risk language.',
  },
  {
    step: '04',
    title: 'Track closure',
    description: 'Retest, document, and connect outcomes to the reporting and evidence workflows your team needs.',
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Security services structured around real operating functions."
        description="Secure Sense is positioned as a company that can assess, defend, govern, and engineer. Each service line exists as part of a broader operating model, not as an isolated checklist item."
        actions={
          <>
            <Button asChild size="lg" className="rounded-full px-6">
              <Link href="/contact">
                Request Assessment
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-6">
              <Link href="/solutions">See Industry Solutions</Link>
            </Button>
          </>
        }
        stats={[
          { value: 'Assess', label: 'Offensive validation' },
          { value: 'Defend', label: 'Managed security operations' },
          { value: 'Govern', label: 'Compliance and assurance' },
          { value: 'Build', label: 'Security engineering support' },
        ]}
      />

      <section className="container py-20 md:py-24">
        <SectionHeading
          eyebrow="Capability Lines"
          title="Services buyers can navigate without hunting through a single landing page."
          description="Each pillar below can be engaged independently or combined into a larger security transformation program."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article key={service.title} className="panel p-6 md:p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 font-headline text-3xl font-semibold text-foreground">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{service.description}</p>
                <div className="mt-6 space-y-3">
                  {service.items.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                      <p className="text-sm leading-7 text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="container pb-20 md:pb-24">
        <SectionHeading
          eyebrow="Delivery Model"
          title="Enterprise teams need more than findings. They need flow."
          description="The Secure Sense engagement model is built to carry work from scoping to validation, reporting, and remediation follow-through."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {deliverySteps.map((item) => (
            <div key={item.step} className="panel p-6">
              <p className="font-code text-sm uppercase tracking-[0.24em] text-primary">{item.step}</p>
              <h3 className="mt-5 font-headline text-2xl font-semibold text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="container pb-20 md:pb-24">
        <CtaBanner
          title="Need to combine offensive testing, compliance, and engineering support?"
          description="Use the contact flow to scope a multi-function security program rather than treating each need as a separate vendor search."
          primaryHref="/contact"
          primaryLabel="Scope an Engagement"
          secondaryHref="/platform"
          secondaryLabel="View the Platform"
        />
      </div>
    </>
  );
}
