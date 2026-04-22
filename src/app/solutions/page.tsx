import Link from 'next/link';
import { Activity, ArrowRight, Building2, Factory, GraduationCap, Hospital, Landmark, Rocket } from 'lucide-react';

import { CtaBanner } from '@/components/company/cta-banner';
import { PageHero } from '@/components/company/page-hero';
import { SectionHeading } from '@/components/company/section-heading';
import { Button } from '@/components/ui/button';

const sectors = [
  {
    title: 'Fintech and payments',
    description: 'PCI DSS alignment, API security, identity hardening, customer trust, and cloud resilience for fast-moving financial products.',
    icon: Landmark,
  },
  {
    title: 'Healthcare and healthtech',
    description: 'Protection for sensitive records, third-party systems, internal workflows, and compliance-heavy environments.',
    icon: Hospital,
  },
  {
    title: 'Critical infrastructure and OT',
    description: 'Support for environments where operational continuity and system integrity matter as much as confidentiality.',
    icon: Factory,
  },
  {
    title: 'SaaS and digital products',
    description: 'Security architecture, secure SDLC, assurance responses, and scalable controls for product-led organizations.',
    icon: Rocket,
  },
  {
    title: 'Public sector and institutions',
    description: 'Programs that balance governance, risk, and implementation while handling large stakeholder environments.',
    icon: Building2,
  },
  {
    title: 'Education and NGOs',
    description: 'Pragmatic security and compliance support for mission-driven teams with complex data and distributed collaboration.',
    icon: GraduationCap,
  },
];

const scenarioCards = [
  {
    title: 'Launch a stronger security baseline',
    description: 'Stand up core controls, identify high-risk exposures, and build a prioritized roadmap instead of reacting ad hoc.',
  },
  {
    title: 'Pass customer and regulatory scrutiny',
    description: 'Prepare for audits, assurance questionnaires, and control reviews with evidence-backed workflows.',
  },
  {
    title: 'Reduce operational risk during growth',
    description: 'Add secure architecture, cloud guardrails, and remediation programs before complexity outruns the team.',
  },
  {
    title: 'Modernize detection and response',
    description: 'Tighten visibility, incident readiness, and remediation loops across people, tooling, and leadership reporting.',
  },
];

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Industry Solutions"
        title="Security posture looks different in every environment. The site should reflect that."
        description="The solutions route gives Secure Sense a clear place to speak to regulated sectors, fast-growing product teams, and complex operational environments without forcing all audiences through the same homepage narrative."
        actions={
          <>
            <Button asChild size="lg" className="rounded-full px-6">
              <Link href="/contact">
                Discuss Your Environment
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-6">
              <Link href="/services">Review Services</Link>
            </Button>
          </>
        }
        stats={[
          { value: 'Regulated', label: 'Framework-heavy environments' },
          { value: 'Product-led', label: 'Cloud and application risk' },
          { value: 'Operational', label: 'Resilience-driven sectors' },
        ]}
      />

      <section className="container py-20 md:py-24">
        <SectionHeading
          eyebrow="Sector Pages"
          title="Built around business context, not just tooling."
          description="Each industry card speaks to the pressure points that actually shape cybersecurity buying decisions."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {sectors.map((sector) => {
            const Icon = sector.icon;

            return (
              <div key={sector.title} className="panel p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 font-headline text-2xl font-semibold text-foreground">{sector.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{sector.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container pb-20 md:pb-24">
        <SectionHeading
          eyebrow="Common Scenarios"
          title="Different teams come in with different urgency."
          description="These scenarios create a cleaner path from business problem to service, platform, and engagement route."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {scenarioCards.map((scenario) => (
            <div key={scenario.title} className="panel p-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                  <Activity className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-headline text-2xl font-semibold text-foreground">{scenario.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{scenario.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="container pb-20 md:pb-24">
        <CtaBanner
          title="Need a sector-specific security program rather than a generic package?"
          description="Use the contact flow to scope the business environment, regulatory pressure, and service mix that fit your organization."
          primaryHref="/contact"
          primaryLabel="Scope by Industry"
          secondaryHref="/platform"
          secondaryLabel="See the Platform"
        />
      </div>
    </>
  );
}
