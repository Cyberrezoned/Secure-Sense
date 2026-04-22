import Link from 'next/link';
import { ArrowRight, Bot, FileCheck2, Radar, Workflow } from 'lucide-react';

import { CtaBanner } from '@/components/company/cta-banner';
import { PageHero } from '@/components/company/page-hero';
import { SectionHeading } from '@/components/company/section-heading';
import { PlatformConsole } from '@/components/platform/platform-console';
import { Button } from '@/components/ui/button';

const platformHighlights = [
  {
    title: 'Compliance Copilot',
    description: 'Interactive guidance for frameworks, controls, evidence, and audit planning across multiple standards.',
    icon: Bot,
  },
  {
    title: 'Operational Telemetry',
    description: 'Live views that make the platform feel active, measurable, and relevant to security and executive users.',
    icon: Radar,
  },
  {
    title: 'Evidence and Reporting',
    description: 'Connect controls, findings, progress, and leadership communication inside one operational thread.',
    icon: FileCheck2,
  },
  {
    title: 'Workflow Orchestration',
    description: 'Link the platform to collaboration, remediation, and program management motions across the team.',
    icon: Workflow,
  },
];

export default function PlatformPage() {
  return (
    <>
      <PageHero
        eyebrow="AI Compliance Platform"
        title="An AI-led cyber platform that now feels alive, usable, and enterprise-ready."
        description="Instead of keeping AI as an isolated widget, the platform route positions it inside telemetry, compliance, workflow, and reporting experiences. That makes the product story functional and much closer to a serious cybersecurity company site."
        actions={
          <>
            <Button asChild size="lg" className="rounded-full px-6">
              <Link href="/contact">
                Book a Platform Walkthrough
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-6">
              <Link href="/integrations">View Integrations</Link>
            </Button>
          </>
        }
        stats={[
          { value: 'AI-assisted', label: 'Copilot and content workflows' },
          { value: 'Live views', label: 'Operational telemetry' },
          { value: 'Multi-framework', label: 'Compliance orchestration' },
          { value: 'Workflow-driven', label: 'Connected execution' },
        ]}
      />

      <section className="container py-20 md:py-24">
        <SectionHeading
          eyebrow="Command Center"
          title="One route for the interactive product story."
          description="This page concentrates the dynamic parts of the experience so the platform reads as a real operational workspace instead of a generic marketing block."
        />
        <div className="mt-10">
          <PlatformConsole />
        </div>
      </section>

      <section className="container pb-20 md:pb-24">
        <SectionHeading
          eyebrow="Platform Modules"
          title="Designed around how enterprise teams evaluate cyber platforms."
          description="The platform is now broken into clear modules so technical buyers and executives can quickly understand where AI and workflow support fit."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {platformHighlights.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="panel p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 font-headline text-2xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <div className="container pb-20 md:pb-24">
        <CtaBanner
          title="Want the platform story tied directly to your security priorities?"
          description="Use the contact route to scope a walkthrough around compliance, operations, AI workflow, or executive reporting."
          primaryHref="/contact"
          primaryLabel="Schedule a Walkthrough"
          secondaryHref="/services"
          secondaryLabel="Review Services"
        />
      </div>
    </>
  );
}
