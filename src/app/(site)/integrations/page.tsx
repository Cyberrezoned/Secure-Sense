import Link from 'next/link';
import { ArrowRight, BellRing, GitBranch, Layers3, ShieldCheck } from 'lucide-react';

import { CtaBanner } from '@/components/company/cta-banner';
import { PageHero } from '@/components/company/page-hero';
import { SectionHeading } from '@/components/company/section-heading';
import { Button } from '@/components/ui/button';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata(
  'Integration Planning / ZeenTheCyber',
  'Scope collaboration, ticketing and reporting integrations with Sule Zeen. Define systems, owners, permissions and delivery requirements before implementation.',
  '/integrations'
);

const integrations = [
  {
    id: 'collaboration',
    name: 'Collaboration channels',
    description: 'Identify which Slack or Teams channels should receive alert summaries and triage updates, then agree the access and context required.',
    icon: BellRing,
  },
  {
    id: 'engineering',
    name: 'Engineering and ticketing',
    description: 'Define the finding details, responsible owner and retest criteria that your Jira or GitHub Issues workflow needs.',
    icon: GitBranch,
  },
  {
    id: 'evidence',
    name: 'Evidence and reporting',
    description: 'Agree the evidence sources, review responsibilities, retention needs and reporting audience before connecting systems.',
    icon: Layers3,
  },
];

export default function IntegrationsPage() {
  return (
    <>
      <PageHero
        eyebrow="ZeenTheCyber / Integration planning"
        title="Plan how your security workflows connect."
        description="Work with Sule Zeen to define the handoffs between security findings, collaboration channels, engineering tasks and evidence. Integration work starts with your systems and an agreed scope."
        actions={
          <>
            <Button asChild size="lg">
              <Link href="/contact">Scope an integration<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/platform">Explore community tools</Link>
            </Button>
          </>
        }
        stats={[
          { value: 'Inputs', label: 'Systems and events' },
          { value: 'Ownership', label: 'Responsible teams' },
          { value: 'Delivery', label: 'Scope and acceptance criteria' },
        ]}
      />

      <section className="shell py-20 md:py-24">
        <SectionHeading
          eyebrow="Workflow requirements"
          title="Start with the handoff."
          description="Decide what needs to move between systems, who should receive it and what must happen next."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {integrations.map((integration) => {
            const Icon = integration.icon;
            return (
              <div key={integration.id} className="surface p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-md border border-primary/20 bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-6 font-headline text-2xl font-semibold text-foreground">{integration.name}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{integration.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="shell pb-20 md:pb-24">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="surface p-6">
            <p className="eyebrow">A clear outcome</p>
            <h2 className="mt-5 font-headline text-3xl font-semibold text-foreground">Define what a useful connection should do.</h2>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
              <li>Name the person or team responsible when a finding arrives.</li>
              <li>Agree which technical details and evidence must follow the work.</li>
              <li>Set approval, escalation and verification criteria before implementation.</li>
            </ul>
          </div>
          <div className="surface p-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-primary" aria-hidden="true" />
              <h2 className="font-headline text-2xl font-semibold text-foreground">What to bring</h2>
            </div>
            <ol className="mt-6 list-decimal space-y-4 pl-5 text-sm leading-7 text-muted-foreground">
              <li>The tools you use and the events that should start a workflow.</li>
              <li>The destination, required fields and expected owner for each handoff.</li>
              <li>Your access approval, data handling and retention requirements.</li>
              <li>The result your team would use to accept the completed work.</li>
            </ol>
            <Button asChild className="mt-7"><Link href="/contact">Discuss the requirements<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></Button>
          </div>
        </div>
      </section>

      <div className="shell pb-20 md:pb-24">
        <CtaBanner
          title="Scope the integration your team needs."
          description="Share your systems, workflow requirements and delivery constraints with Sule Zeen to discuss a suitable approach."
          primaryHref="/contact"
          primaryLabel="Discuss an integration"
          secondaryHref="/platform"
          secondaryLabel="Explore community tools"
        />
      </div>
    </>
  );
}
