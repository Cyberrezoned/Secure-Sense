import Link from 'next/link';
import {
  Activity,
  ArrowRight,
  Building2,
  ChevronRight,
  Fingerprint,
  Landmark,
  Lock,
  Radar,
  ShieldCheck,
  Workflow,
} from 'lucide-react';

import { PageHero } from '@/components/company/page-hero';
import { SectionHeading } from '@/components/company/section-heading';
import { CtaBanner } from '@/components/company/cta-banner';
import { ThreatExposure } from '@/components/intel/threat-exposure';
import { OssStack } from '@/components/intel/oss-stack';
import { Button } from '@/components/ui/button';

/**
 * Figures on this page come from live feeds (see components/intel). Static
 * marketing claims are kept to things that are actually verifiable.
 */
export const revalidate = 1800;

const servicePillars = [
  {
    title: 'Offensive Security',
    description:
      'Penetration testing and red teaming across web, API, cloud, identity, and internal networks. Every finding is reproduced, rated by exploitability, and retested after the fix.',
    href: '/services',
    icon: Fingerprint,
  },
  {
    title: 'Managed Detection and Response',
    description:
      'Detection engineering and 24/7 monitoring built on Wazuh, Suricata, and Sigma. Alerts arrive with the context needed to act, not a severity number on its own.',
    href: '/services',
    icon: Radar,
  },
  {
    title: 'Compliance and Assurance',
    description:
      'ISO 27001, SOC 2, PCI DSS, and NDPR programmes run as engineering work: control mapping, evidence pipelines, and audit-ready reporting.',
    href: '/platform',
    icon: ShieldCheck,
  },
  {
    title: 'Security Engineering',
    description:
      'Architecture review, AppSec, DevSecOps, and cloud hardening delivered alongside your engineers rather than handed over as a document.',
    href: '/services',
    icon: Workflow,
  },
];

const sectors = [
  {
    title: 'Financial Services',
    description: 'PCI DSS scope reduction, API abuse testing, and NDPR obligations for regulated institutions.',
    icon: Landmark,
  },
  {
    title: 'Healthcare',
    description: 'Patient data protection, vendor risk, and audit evidence across hybrid clinical environments.',
    icon: Building2,
  },
  {
    title: 'Critical Infrastructure',
    description: 'IT and OT segmentation, resilience testing, and incident readiness for high-consequence systems.',
    icon: Activity,
  },
  {
    title: 'SaaS and Product Teams',
    description: 'Application security, release pipeline integrity, and the security questionnaires that gate deals.',
    icon: Lock,
  },
];

const engagementPhases = [
  {
    phase: '01',
    title: 'Establish the real attack surface',
    copy: 'Asset discovery, external exposure, and identity mapping. Scope is set from what exists, not from what the asset register claims.',
  },
  {
    phase: '02',
    title: 'Validate exploitability',
    copy: 'Findings are proven end to end and ranked against exploitation data, so remediation starts where the actual risk is.',
  },
  {
    phase: '03',
    title: 'Remediate with the engineers',
    copy: 'Fixes are built with your teams, tracked to closure, and retested. Evidence is captured as the work happens.',
  },
  {
    phase: '04',
    title: 'Operate and measure',
    copy: 'Detection coverage, control maturity, and remediation velocity reported on a cadence your board can read.',
  },
];

export default function Home() {
  return (
    <>
      <PageHero
        eyebrow="Cyber defence · Offensive security · Compliance"
        title="Security programmes that hold up under audit and attack."
        description="Secure Sense reduces risk across applications, cloud, identity, and regulation. We test what attackers would reach first, build the detections that catch them, and leave evidence an auditor accepts."
        actions={
          <>
            <Button asChild size="lg">
              <Link href="/contact">
                Book an assessment
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/services">Review capabilities</Link>
            </Button>
          </>
        }
        stats={[
          { value: 'Web to OT', label: 'Coverage across the full attack surface' },
          { value: '4', label: 'Integrated delivery practices' },
          { value: 'ISO · SOC 2 · PCI · NDPR', label: 'Frameworks run as engineering work' },
          { value: 'Open source', label: 'Auditable stack, no licence lock-in' },
        ]}
      />

      {/* Live CISA KEV and NIST NVD figures. */}
      <ThreatExposure />

      <section className="border-t border-hairline bg-surface">
        <div className="shell py-20 lg:py-24">
          <SectionHeading
            eyebrow="Capabilities"
            title="Four practices, one delivery model"
            description="Offensive testing, detection, compliance, and engineering are run by the same team against the same findings, so nothing is lost between a report and a fix."
          />

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4" data-stagger>
            {servicePillars.map((pillar) => {
              const Icon = pillar.icon;

              return (
                <article key={pillar.title} className="surface-interactive flex h-full flex-col p-6">
                  <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  <h3 className="mt-5 text-lg font-semibold text-foreground">{pillar.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{pillar.description}</p>
                  <Link
                    href={pillar.href}
                    className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    Learn more
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Live GitHub telemetry for the deployed open-source stack. */}
      <OssStack />

      <section className="shell py-20 lg:py-24">
        <SectionHeading
          eyebrow="How engagements run"
          title="A sequence, not a deliverable"
          description="Each phase produces something the next one depends on. The programme is designed to end with your team operating it, not with a PDF."
        />

        <ol className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4" data-stagger>
          {engagementPhases.map((item) => (
            <li key={item.phase} className="surface flex h-full flex-col p-6">
              <span className="font-code text-xs font-medium text-primary">{item.phase}</span>
              <h3 className="mt-4 text-base font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{item.copy}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-hairline bg-surface">
        <div className="shell py-20 lg:py-24">
          <SectionHeading
            eyebrow="Industries"
            title="Regulated environments, different pressure"
            description="Sector context changes what matters first: the obligations, the downtime tolerance, and who signs off on residual risk."
          />

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4" data-stagger>
            {sectors.map((sector) => {
              const Icon = sector.icon;

              return (
                <div key={sector.title} className="surface p-6">
                  <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  <h3 className="mt-5 text-base font-semibold text-foreground">{sector.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{sector.description}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-8">
            <Button asChild variant="outline">
              <Link href="/solutions">
                Explore industry solutions
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="shell py-20 lg:py-24">
        <CtaBanner
          title="Start with the exposure you can already measure"
          description="An initial assessment establishes your external attack surface, maps it against actively exploited vulnerabilities, and gives you a remediation order you can defend to a board."
          primaryHref="/contact"
          primaryLabel="Book an assessment"
          secondaryHref="/request-a-quote"
          secondaryLabel="Request a quote"
        />
      </div>
    </>
  );
}
