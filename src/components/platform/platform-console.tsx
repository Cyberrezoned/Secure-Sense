'use client';

import Link from 'next/link';
import { ArrowRight, BellRing, Bot, FileSearch, GitBranch, Radar, ShieldCheck, Workflow } from 'lucide-react';

import { ComplianceChatbot } from '@/components/compliance-chatbot';
import { ContentAnalysis } from '@/components/community/content-analysis';
import { DashboardChart } from '@/components/dashboard-chart';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const integrationCards = [
  {
    title: 'Slack and alerting',
    description: 'Push detection summaries and triage updates into collaboration channels for faster alignment.',
    icon: BellRing,
  },
  {
    title: 'Engineering workflows',
    description: 'Route findings into ticketing and delivery systems without losing technical context or severity.',
    icon: GitBranch,
  },
  {
    title: 'Evidence pipelines',
    description: 'Keep assessment output, control evidence, and executive reporting linked to one source of truth.',
    icon: Workflow,
  },
];

export function PlatformConsole() {
  return (
    <div className="panel p-4 md:p-6">
      <Tabs defaultValue="telemetry" className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="eyebrow">Interactive Workspace</p>
            <h3 className="mt-5 font-headline text-3xl font-semibold text-foreground">Command center by function</h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
              Review telemetry, engage the compliance copilot, analyze content, and connect workflows from one route.
            </p>
          </div>
          <TabsList className="h-auto flex-wrap justify-start gap-2 rounded-3xl bg-background/60 p-2">
            <TabsTrigger value="telemetry" className="rounded-full px-4 py-2 data-[state=active]:bg-card">
              Telemetry
            </TabsTrigger>
            <TabsTrigger value="copilot" className="rounded-full px-4 py-2 data-[state=active]:bg-card">
              Copilot
            </TabsTrigger>
            <TabsTrigger value="analysis" className="rounded-full px-4 py-2 data-[state=active]:bg-card">
              AI Analysis
            </TabsTrigger>
            <TabsTrigger value="workflow" className="rounded-full px-4 py-2 data-[state=active]:bg-card">
              Workflows
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="telemetry" className="mt-0">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[1.5rem] border border-border/70 bg-background/50 p-2 md:p-4">
              <DashboardChart />
            </div>
            <div className="space-y-4">
              {[
                {
                  title: 'Live security posture view',
                  description: 'Turn dashboards into an operational story for leadership, security, and engineering teams.',
                  icon: Radar,
                },
                {
                  title: 'Remediation visibility',
                  description: 'Track what has been found, what has been fixed, and what still needs business decisions.',
                  icon: ShieldCheck,
                },
                {
                  title: 'Executive-ready reporting',
                  description: 'Translate security work into risk, compliance status, and delivery progress without another toolchain.',
                  icon: Bot,
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="rounded-[1.5rem] border border-border/70 bg-background/60 p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                        <Icon className="h-4 w-4" />
                      </div>
                      <p className="font-medium text-foreground">{item.title}</p>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="copilot" className="mt-0">
          <ComplianceChatbot />
        </TabsContent>

        <TabsContent value="analysis" className="mt-0">
          <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="rounded-[1.5rem] border border-border/70 bg-background/60 p-6">
              <p className="eyebrow">AI Content Workflows</p>
              <h3 className="mt-5 font-headline text-2xl font-semibold text-foreground">Analyze research before it hits your hub</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Moderate submissions, summarize long-form content, and generate tags and categories so your
                research area feels alive and curated rather than manually maintained.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  'Content moderation for community safety and misinformation reduction',
                  'AI summaries for faster knowledge transfer and browsing',
                  'Automatic categories and tags for a cleaner publishing workflow',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                    <p className="text-sm leading-7 text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <ContentAnalysis />
          </div>
        </TabsContent>

        <TabsContent value="workflow" className="mt-0">
          <div className="grid gap-5 md:grid-cols-3">
            {integrationCards.map((card) => {
              const Icon = card.icon;

              return (
                <div key={card.title} className="rounded-[1.5rem] border border-border/70 bg-background/60 p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-headline text-xl font-semibold text-foreground">{card.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{card.description}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="rounded-full">
              <Link href="/integrations">
                View Integrations
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/contact">
                Scope a Workflow
                <FileSearch className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
