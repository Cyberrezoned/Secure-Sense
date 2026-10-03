'use client';

import Link from 'next/link';
import { ArrowRight, BellRing, FileSearch, GitBranch, Workflow } from 'lucide-react';

import { ComplianceChatbot } from '@/components/compliance-chatbot';
import { ContentAnalysis } from '@/components/community/content-analysis';
import { KevTrendChart } from '@/components/intel/kev-trend-chart';
import { FeedAttribution, FeedUnavailable } from '@/components/intel/primitives';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { FeedResult, KevSummary } from '@/lib/intel';
import { formatCount, formatDate, formatPercent } from '@/lib/format';

const integrationCards = [
  {
    title: 'Alerting and collaboration',
    description: 'Detection summaries and triage state pushed into Slack or Teams with the evidence attached.',
    icon: BellRing,
  },
  {
    title: 'Engineering workflow',
    description: 'Findings routed into Jira or GitHub Issues carrying severity, reproduction steps, and retest status.',
    icon: GitBranch,
  },
  {
    title: 'Evidence pipeline',
    description: 'Assessment output and control evidence collected once, then reused across every framework in scope.',
    icon: Workflow,
  },
];

export function PlatformConsole({ kev }: { kev: FeedResult<KevSummary> }) {
  return (
    <div className="surface p-5 md:p-6">
      <Tabs defaultValue="exposure" className="space-y-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="eyebrow">Operational workspace</p>
            <h3 className="mt-3 text-xl font-semibold text-foreground">Exposure, guidance, and routing</h3>
          </div>
          <TabsList className="h-auto flex-wrap justify-start gap-1 rounded-full bg-secondary/60 p-1">
            <TabsTrigger value="exposure" className="rounded-full px-3.5 py-1.5 text-xs data-[state=active]:bg-card">
              Exposure
            </TabsTrigger>
            <TabsTrigger value="copilot" className="rounded-full px-3.5 py-1.5 text-xs data-[state=active]:bg-card">
              Compliance copilot
            </TabsTrigger>
            <TabsTrigger value="analysis" className="rounded-full px-3.5 py-1.5 text-xs data-[state=active]:bg-card">
              Content analysis
            </TabsTrigger>
            <TabsTrigger value="workflow" className="rounded-full px-3.5 py-1.5 text-xs data-[state=active]:bg-card">
              Workflow
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="exposure" className="mt-0">
          {kev.ok ? (
            <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
              <div className="rounded-md border border-hairline p-5">
                <KevTrendChart summary={kev.data} />
                <FeedAttribution
                  source={kev.source}
                  fetchedAt={kev.fetchedAt}
                  note={`Released ${formatDate(kev.data.releasedAt)}`}
                  className="mt-5 border-t border-hairline pt-4"
                />
              </div>

              <div className="flex flex-col gap-4">
                <div className="rounded-md border border-hairline p-5">
                  <p className="eyebrow">Prioritisation inputs</p>
                  <dl className="mt-4 space-y-3 text-sm">
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-muted-foreground">Actively exploited CVEs</dt>
                      <dd className="font-semibold tabular text-foreground">{formatCount(kev.data.total)}</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-muted-foreground">Added in 30 days</dt>
                      <dd className="font-semibold tabular text-foreground">
                        {formatCount(kev.data.addedLast30Days)}
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-muted-foreground">Ransomware-linked</dt>
                      <dd className="font-semibold tabular text-foreground">
                        {formatPercent(kev.data.ransomwareShare, 0)}
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-muted-foreground">Deadlines inside 7 days</dt>
                      <dd className="font-semibold tabular text-foreground">
                        {formatCount(kev.data.dueWithin7Days)}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="rounded-md border border-hairline p-5">
                  <p className="eyebrow">Most affected vendors</p>
                  <ul className="mt-4 space-y-2.5">
                    {kev.data.topVendors.slice(0, 5).map((vendor) => {
                      const share = vendor.count / kev.data.topVendors[0].count;

                      return (
                        <li key={vendor.vendor} className="text-sm">
                          <div className="flex items-baseline justify-between gap-4">
                            <span className="text-foreground">{vendor.vendor}</span>
                            <span className="tabular text-muted-foreground">{formatCount(vendor.count)}</span>
                          </div>
                          {/* Bar is a secondary encoding of the same number, not decoration. */}
                          <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-secondary">
                            <div
                              className="h-full rounded-full bg-chart-1"
                              style={{ width: `${Math.max(share * 100, 3)}%` }}
                            />
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <FeedUnavailable source={kev.source} error={kev.error} />
          )}
        </TabsContent>

        <TabsContent value="copilot" className="mt-0">
          <ComplianceChatbot />
        </TabsContent>

        <TabsContent value="analysis" className="mt-0">
          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-md border border-hairline p-5">
              <p className="eyebrow">Research workflow</p>
              <h3 className="mt-3 text-lg font-semibold text-foreground">
                Review advisories before they reach the hub
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Summarise long-form advisories, extract affected products, and generate tags so the research library
                stays searchable as it grows.
              </p>
              <ul className="mt-5 space-y-2.5">
                {[
                  'Summarisation for faster analyst triage',
                  'Automatic tagging and categorisation',
                  'Moderation pass before publication',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="status-dot mt-1.5" data-status="low" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <ContentAnalysis />
          </div>
        </TabsContent>

        <TabsContent value="workflow" className="mt-0">
          <div className="grid gap-4 md:grid-cols-3">
            {integrationCards.map((card) => {
              const Icon = card.icon;

              return (
                <div key={card.title} className="rounded-md border border-hairline p-5">
                  <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  <h3 className="mt-4 text-base font-semibold text-foreground">{card.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{card.description}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/integrations">
                View integrations
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">
                Scope a workflow
                <FileSearch className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
