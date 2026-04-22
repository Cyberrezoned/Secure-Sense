import Link from 'next/link';
import {
  Activity,
  ArrowRight,
  Bot,
  Building2,
  ChevronRight,
  FileCheck2,
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
import { DashboardChart } from '@/components/dashboard-chart';
import { Button } from '@/components/ui/button';

const servicePillars = [
  {
    title: 'Offensive Security',
    description:
      'Penetration testing, red teaming, API reviews, and validation across web, cloud, identity, and internal environments.',
    href: '/services',
    icon: Fingerprint,
  },
  {
    title: 'Managed Defense',
    description:
      'Threat monitoring, detection engineering, incident readiness, and remediation programs that stay aligned with business risk.',
    href: '/services',
    icon: Radar,
  },
  {
    title: 'AI Compliance Platform',
    description:
      'Framework mapping, evidence workflows, control tracking, and executive reporting inside one operational platform.',
    href: '/platform',
    icon: Bot,
  },
  {
    title: 'Security Engineering',
    description:
      'Secure architecture reviews, AppSec, DevSecOps, cloud hardening, and implementation support for high-growth teams.',
    href: '/services',
    icon: Workflow,
  },
];

const sectors = [
  {
    title: 'Financial Services',
    description: 'Support for PCI DSS, NDPR, API risk, fraud-adjacent controls, and resilient customer-facing systems.',
    icon: Landmark,
  },
  {
    title: 'Healthcare',
    description: 'Protection for patient data, vendor ecosystems, cloud workloads, and audit-heavy security operations.',
    icon: Building2,
  },
  {
    title: 'Critical Infrastructure',
    description: 'Programs that bridge IT, OT, and operational resilience across high-consequence environments.',
    icon: Activity,
  },
  {
    title: 'SaaS and Product Teams',
    description: 'Application security, secure release pipelines, customer assurance, and scalable governance foundations.',
    icon: Lock,
  },
];

const platformModules = [
  {
    title: 'Compliance Copilot',
    copy: 'Guide teams through ISO 27001, PCI DSS, SOC 2, NDPR, and evidence planning with AI-assisted workflows.',
  },
  {
    title: 'Telemetry and Reporting',
    copy: 'Surface live operational context, remediation progress, and stakeholder-ready summaries in one view.',
  },
  {
    title: 'Workflow Automation',
    copy: 'Route findings into engineering, GRC, and operations processes without losing traceability.',
  },
];

const researchHighlights = [
  'AI-assisted article analysis for research teams and security communities',
  'Threat briefings, playbooks, and curated learning paths',
  'A dedicated resource hub instead of burying thought leadership on the homepage',
];

export default function Home() {
  return (
    <>
      <PageHero
        eyebrow="Enterprise Cybersecurity, AI, and Compliance"
        title="Cyber operations built like a platform, not a one-page brochure."
        description="Secure Sense helps modern organizations reduce risk across applications, cloud, identities, users, and regulation. We combine offensive security, managed defense, AI-assisted compliance, and security engineering in a structure enterprise teams can actually use."
        actions={
          <>
            <Button asChild size="lg" className="rounded-full px-6">
              <Link href="/services">
                Explore Services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-6">
              <Link href="/platform">See the Platform</Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="rounded-full px-4">
              <Link href="/contact">Request an Assessment</Link>
            </Button>
          </>
        }
        stats={[
          { value: '4', label: 'Integrated service pillars' },
          { value: 'Web to OT', label: 'Coverage across the attack surface' },
          { value: 'Multi-framework', label: 'Compliance-ready workflows' },
          { value: 'Lagos to global', label: 'Delivery for local and distributed teams' },
        ]}
        aside={
          <div className="space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-primary/30 bg-primary/10 text-primary shadow-[0_0_40px_rgba(31,227,179,0.18)]">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-emerald-200">
                Mission Active
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Attack Surface</p>
                <p className="mt-2 text-lg font-semibold text-foreground">Web, API, cloud, identity, endpoint, OT</p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Frameworks</p>
                <p className="mt-2 text-lg font-semibold text-foreground">ISO 27001, PCI DSS, SOC 2, NDPR</p>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-border/70 bg-background/75 p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">Operating model</p>
                <Activity className="h-4 w-4 text-primary" />
              </div>
              <div className="mt-4 space-y-3">
                {[
                  'Assess exposure and validate real attack paths',
                  'Prioritize fixes by business impact and exploitability',
                  'Track evidence, control maturity, and remediation momentum',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                    <p className="text-sm leading-6 text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      />

      <section className="container py-20 md:py-24">
        <SectionHeading
          eyebrow="Service Architecture"
          title="Structured into clear functions, not everything piled into one page."
          description="Each core capability now has its own destination so buyers, technical teams, and executives can move through the site by intent instead of scrolling through unrelated sections."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {servicePillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <article key={pillar.title} className="panel flex h-full flex-col p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 font-headline text-2xl font-semibold text-foreground">{pillar.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">{pillar.description}</p>
                <Button asChild variant="ghost" className="mt-6 justify-start px-0 text-sm text-primary hover:bg-transparent">
                  <Link href={pillar.href}>
                    Learn More
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </article>
            );
          })}
        </div>
      </section>

      <section className="container pb-20 md:pb-24">
        <SectionHeading
          eyebrow="Platform Preview"
          title="The AI layer now looks operational instead of static."
          description="The platform page pulls your AI assistant, telemetry view, integrations story, and workflow modules into a command-center experience. The homepage keeps a focused preview and routes deeper by function."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="panel p-3 sm:p-5">
            <DashboardChart />
          </div>
          <div className="space-y-5">
            {platformModules.map((module) => (
              <div key={module.title} className="panel p-6">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-headline text-xl font-semibold text-foreground">{module.title}</h3>
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{module.copy}</p>
              </div>
            ))}
            <div className="panel p-6">
              <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">Next Step</p>
              <h3 className="mt-3 font-headline text-2xl font-semibold text-foreground">
                Open the full command center.
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Review the AI copilot, integration fabric, and live operational views in the dedicated platform route.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild className="rounded-full">
                  <Link href="/platform">
                    Visit Platform
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/integrations">View Integrations</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container pb-20 md:pb-24">
        <SectionHeading
          eyebrow="Industry Solutions"
          title="Different sectors, different security pressure."
          description="Secure Sense is positioned around business context as well as technical depth, so regulated teams can land on solution pages that match their environment."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {sectors.map((sector) => {
            const Icon = sector.icon;

            return (
              <div key={sector.title} className="panel p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/70 bg-background/70 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-headline text-xl font-semibold text-foreground">{sector.title}</h3>
                </div>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{sector.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-end">
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/solutions">
              Explore Solution Pages
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="container pb-20 md:pb-24">
        <SectionHeading
          eyebrow="Resources and Adoption"
          title="Your research, training, and AI content tools now have a proper home."
          description="Instead of crowding the main landing page, the resource hub keeps learning content, AI-assisted analysis, and thought leadership in a separate destination."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="panel p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
              <FileCheck2 className="h-5 w-5" />
            </div>
            <h3 className="mt-6 font-headline text-2xl font-semibold text-foreground">Research hub and AI analysis</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Keep blog content, learning resources, and AI-assisted article analysis in a purpose-built research area for prospects, customers, and trainees.
            </p>
            <div className="mt-6 space-y-3">
              {researchHighlights.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                  <p className="text-sm leading-7 text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-6">
            <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">What changed</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                'Homepage now sells the company and routes deeper by intent.',
                'Dedicated pages for services, platform, solutions, company, and contact.',
                'Hero now includes an icon-led executive panel instead of plain text only.',
                'AI features now sit inside a platform story with workflow context.',
              ].map((point) => (
                <div key={point} className="rounded-2xl border border-border/70 bg-background/70 p-4">
                  <p className="text-sm leading-7 text-muted-foreground">{point}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="rounded-full">
                <Link href="/community">
                  Open Resource Hub
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="ghost" className="rounded-full">
                <Link href="/company">Meet the Company</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container pb-20 md:pb-24">
        <CtaBanner
          title="Ready to turn the site into a proper enterprise conversion funnel?"
          description="Use the dedicated contact page to collect scoped cybersecurity opportunities, or move prospects directly into services and platform flows."
          primaryHref="/contact"
          primaryLabel="Talk to Secure Sense"
          secondaryHref="/services"
          secondaryLabel="Review Capabilities"
        />
      </div>
    </>
  );
}
