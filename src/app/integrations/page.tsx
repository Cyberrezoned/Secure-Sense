import Link from 'next/link';
import { ArrowRight, BellRing, GitBranch, Layers3, ShieldCheck, Workflow } from 'lucide-react';

import { CtaBanner } from '@/components/company/cta-banner';
import { PageHero } from '@/components/company/page-hero';
import { SectionHeading } from '@/components/company/section-heading';
import { Button } from '@/components/ui/button';

const integrations = [
  {
    id: 'slack',
    name: 'Slack and Collaboration',
    description: 'Route alert summaries, triage updates, and compliance actions into collaboration channels.',
    icon: BellRing,
  },
  {
    id: 'jira',
    name: 'Engineering and Ticketing',
    description: 'Convert findings into tracked remediation work without losing technical detail or ownership context.',
    icon: GitBranch,
  },
  {
    id: 'evidence',
    name: 'Evidence and Reporting',
    description: 'Link findings, frameworks, and executive reporting so security work stays audit-ready.',
    icon: Layers3,
  },
];

export default function IntegrationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Integrations"
        title="Connect cybersecurity workflows to the systems your team already uses."
        description="The integrations route explains how Secure Sense fits into collaboration, engineering, and reporting workflows so the platform story feels connected to real operational work."
        actions={
          <>
            <Button asChild size="lg" className="rounded-full px-6">
              <Link href="/platform">
                Back to Platform
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-6">
              <Link href="/contact">Scope an Integration</Link>
            </Button>
          </>
        }
        stats={[
          { value: 'Collaboration', label: 'Alerts and shared response' },
          { value: 'Engineering', label: 'Tracked remediation workflows' },
          { value: 'Reporting', label: 'Evidence and stakeholder outputs' },
        ]}
      />

      <section className="container py-20 md:py-24">
        <SectionHeading
          eyebrow="Integration Fabric"
          title="Operational handoffs are part of the product story."
          description="A security platform only feels real when it fits into how teams communicate, build, respond, and report."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {integrations.map((integration) => {
            const Icon = integration.icon;

            return (
              <div key={integration.id} className="panel p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 font-headline text-2xl font-semibold text-foreground">{integration.name}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{integration.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container pb-20 md:pb-24">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="panel p-6">
            <p className="eyebrow">Why it matters</p>
            <h2 className="mt-5 font-headline text-3xl font-semibold text-foreground">Security outcomes need workflow continuity.</h2>
            <div className="mt-5 space-y-3">
              {[
                'Security findings need to land where remediation actually happens.',
                'Executives need reporting that stays connected to evidence and status.',
                'Collaboration tooling needs clear signals rather than noisy alerts.',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                  <p className="text-sm leading-7 text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="font-headline text-2xl font-semibold text-foreground">Example workflow</p>
                <p className="text-sm text-muted-foreground">From alert to engineering follow-through</p>
              </div>
            </div>
            <pre className="mt-5 overflow-x-auto rounded-[1.5rem] border border-border/70 bg-background/75 p-5 text-sm leading-7 text-muted-foreground">
{`POST /v1/alerts
{
  "channel": "slack",
  "severity": "critical",
  "workflow": "jira-ticket",
  "frameworks": ["PCI DSS", "ISO 27001"],
  "summary": "Public API exposure detected on production edge.",
  "owner": "security-platform"
}`}
            </pre>
          </div>
        </div>
      </section>

      <div className="container pb-20 md:pb-24">
        <CtaBanner
          title="Need Secure Sense to fit into your current stack?"
          description="Use the contact flow to scope workflow automation, ticket routing, reporting, or advisory integrations."
          primaryHref="/contact"
          primaryLabel="Discuss Integrations"
          secondaryHref="/platform"
          secondaryLabel="Return to Platform"
        />
      </div>
    </>
  );
}
