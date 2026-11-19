import Link from 'next/link';
import { ArrowRight, FileSearch, FileCheck2, Radar, Workflow } from 'lucide-react';

import { CtaBanner } from '@/components/company/cta-banner';
import { PageHero } from '@/components/company/page-hero';
import { SectionHeading } from '@/components/company/section-heading';
import { PlatformConsole } from '@/components/platform/platform-console';
import { Button } from '@/components/ui/button';
import { emailHref } from '@/lib/contact';
import { getKevSummary } from '@/lib/intel';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata(
  'Security Tools',
  'Explore CISA vulnerability data, analyse security articles, and plan integrations with ZeenTheCyber.',
  '/platform'
);

export const revalidate = 1800;

const platformHighlights = [
  {
    title: 'Exploitation intelligence',
    description: 'Review CISA known exploited vulnerabilities, recent catalogue additions and affected vendors with the source and retrieval date attached.',
    icon: Radar,
  },
  {
    title: 'Article analysis',
    description: 'Request a summary, suggested tags and a content review for security text, then check the results against your source.',
    icon: FileSearch,
  },
  {
    title: 'Source context',
    description: 'See where the intelligence comes from and when it was retrieved. Feed interruptions are shown alongside the source.',
    icon: FileCheck2,
  },
  {
    title: 'Integration planning',
    description: 'Discuss your systems, permissions, owners and reporting needs with SuleZeen to define an implementation scope.',
    icon: Workflow,
  },
];

export default async function PlatformPage() {
  const kev = await getKevSummary();

  return (
    <>
      <PageHero
        eyebrow="ZeenTheCyber / Community tools"
        title="Explore exploitation data. Review security content."
        description="Check which vulnerabilities CISA lists as exploited, analyse a security article, or explore how findings reach the teams responsible for fixing them."
        actions={
          <>
            <Button asChild size="lg">
              <Link href={emailHref('Security workflow enquiry')}>
                Discuss your security workflow
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/integrations">Plan integrations</Link>
            </Button>
          </>
        }
        stats={[
          { value: 'CISA KEV', label: 'Known exploited vulnerabilities' },
          { value: '30-day view', label: 'Recent catalogue additions' },
          { value: 'Article analysis', label: 'Summaries, tags and content review' },
          { value: 'Planning', label: 'Map security workflows' },
        ]}
      />

      <section className="shell py-20 lg:py-24">
        <SectionHeading
          eyebrow="Workspace"
          title="Intelligence and tools for your next decision"
          description="Review the exploitation feed, analyse an advisory or prepare an integration conversation."
        />
        <div className="mt-10">
          <PlatformConsole kev={kev} />
        </div>
      </section>

      <section className="border-t border-hairline bg-surface">
        <div className="shell py-20 lg:py-24">
          <SectionHeading
            eyebrow="What you can use"
            title="Start with the context behind the finding"
            description="Source-backed intelligence and text analysis support your review; implementation work starts with an agreed scope."
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
          title="Plan the next step for your security team"
          description="Bring your findings, evidence requirements and existing tools. SuleZeen can help define the scope, owners and integration work."
          primaryHref={emailHref('Security workflow enquiry')}
          primaryLabel="Discuss your workflow"
          secondaryHref="/cybersecurity"
          secondaryLabel="Review services"
        />
      </div>
    </>
  );
}
