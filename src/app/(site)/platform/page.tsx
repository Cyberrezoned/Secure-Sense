import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Bot, FileCheck2, Radar, Workflow } from 'lucide-react';

import { CtaBanner } from '@/components/company/cta-banner';
import { PageHero } from '@/components/company/page-hero';
import { SectionHeading } from '@/components/company/section-heading';
import { PlatformConsole } from '@/components/platform/platform-console';
import { Button } from '@/components/ui/button';
import { getKevSummary } from '@/lib/intel';

export const metadata: Metadata = {
  title: 'Compliance Platform',
  description:
    'Control mapping, evidence pipelines, and exposure prioritisation in one operational workspace, fed by live vulnerability intelligence.',
};

export const revalidate = 1800;

const platformHighlights = [
  {
    title: 'Compliance copilot',
    description:
      'Framework-aware guidance for ISO 27001, SOC 2, PCI DSS, and NDPR, grounded in the controls you already have in place.',
    icon: Bot,
  },
  {
    title: 'Exposure prioritisation',
    description:
      'Findings ranked against the CISA KEV catalogue and EPSS probabilities, so remediation order follows real-world exploitation.',
    icon: Radar,
  },
  {
    title: 'Evidence and reporting',
    description:
      'Evidence captured once at the point of work, then mapped to every framework that asks for it. Reports generate from the same source.',
    icon: FileCheck2,
  },
  {
    title: 'Workflow orchestration',
    description:
      'Findings routed into the systems your teams already run, with status flowing back so nothing closes without a retest.',
    icon: Workflow,
  },
];

export default async function PlatformPage() {
  const kev = await getKevSummary();

  return (
    <>
      <PageHero
        eyebrow="Compliance platform"
        title="One workspace for exposure, controls, and evidence."
        description="Compliance work fails when evidence lives in spreadsheets and remediation order is guesswork. The platform keeps both in one place and prioritises against vulnerabilities that are actually being exploited."
        actions={
          <>
            <Button asChild size="lg">
              <Link href="/contact">
                Book a walkthrough
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/integrations">View integrations</Link>
            </Button>
          </>
        }
        stats={[
          { value: '4', label: 'Frameworks mapped from one evidence set' },
          { value: 'KEV + EPSS', label: 'Exploitation data driving priority' },
          { value: 'Bi-directional', label: 'Sync with engineering workflow' },
          { value: 'Audit-ready', label: 'Evidence captured at the point of work' },
        ]}
      />

      <section className="shell py-20 lg:py-24">
        <SectionHeading
          eyebrow="Workspace"
          title="The console your team actually works in"
          description="Exposure data, framework guidance, research triage, and routing, reachable without switching tools."
        />
        <div className="mt-10">
          <PlatformConsole kev={kev} />
        </div>
      </section>

      <section className="border-t border-hairline bg-surface">
        <div className="shell py-20 lg:py-24">
          <SectionHeading
            eyebrow="Modules"
            title="Built around how compliance work actually proceeds"
            description="Each module removes a specific handoff where evidence or context is usually lost."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4" data-stagger>
            {platformHighlights.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="surface p-6">
                  <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  <h3 className="mt-5 text-base font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="shell py-20 lg:py-24">
        <CtaBanner
          title="See it against your own control set"
          description="A walkthrough uses your frameworks and current evidence, so you can judge the platform on your actual obligations rather than a demo tenant."
          primaryHref="/contact"
          primaryLabel="Book a walkthrough"
          secondaryHref="/services"
          secondaryLabel="Review services"
        />
      </div>
    </>
  );
}
