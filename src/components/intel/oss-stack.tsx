import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { getOssStackSnapshot, type OssLayer, type OssProjectMetrics } from '@/lib/intel';
import { formatCompact, formatCount } from '@/lib/format';
import { FeedAttribution, FeedUnavailable, SectionHeader } from '@/components/intel/primitives';

/**
 * The open-source defensive stack, with live repository telemetry.
 *
 * Naming the actual components is the point: it is verifiable, it tells a
 * technical buyer exactly what they are getting, and it avoids the unfalsifiable
 * "proprietary AI engine" claim. Commit recency is shown as-is, including when
 * a project has gone quiet.
 */

const LAYER_ORDER: OssLayer[] = ['Detection', 'Threat Intel', 'Cloud & Workload', 'Supply Chain', 'Response'];

function ProjectRow({ project }: { project: OssProjectMetrics }) {
  const stale = project.daysSinceCommit > 90;

  return (
    <div className="flex items-start justify-between gap-4 py-3.5">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <Link
            href={project.url}
            target="_blank"
            rel="noreferrer noopener"
            className="text-sm font-medium text-foreground hover:text-primary"
          >
            {project.name}
          </Link>
          {project.license ? <span className="chip font-code">{project.license}</span> : null}
        </div>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{project.role}</p>
      </div>

      <div className="shrink-0 text-right">
        <p className="text-sm font-semibold tabular text-foreground">{formatCompact(project.stars)}</p>
        <p className="mt-0.5 inline-flex items-center gap-1.5 text-[0.6875rem] text-muted-foreground">
          <span className="status-dot" data-status={stale ? 'moderate' : 'ok'} aria-hidden="true" />
          {project.daysSinceCommit === 0
            ? 'pushed today'
            : `pushed ${formatCount(project.daysSinceCommit)}d ago`}
        </p>
      </div>
    </div>
  );
}

export async function OssStack() {
  const snapshot = await getOssStackSnapshot();

  return (
    <section className="border-y border-hairline bg-surface" aria-labelledby="oss-stack-title">
      <div className="shell py-20 lg:py-24">
        <SectionHeader
          eyebrow="Reference architecture"
          title="Built on an open-source stack you can audit"
          description="No black boxes and no licence lock-in. Every component below is open source, deployed in client environments, and independently verifiable. Repository activity is read live from GitHub."
        />
        <h2 id="oss-stack-title" className="sr-only">
          Open-source reference architecture
        </h2>

        {snapshot.ok ? (
          <>
            <div className="mt-10 grid grid-cols-2 divide-x divide-hairline border-y border-hairline sm:grid-cols-4">
              <div className="px-5 py-6">
                <p className="metric-value" data-metric>
                  {snapshot.data.projects.length}
                </p>
                <p className="metric-label">Components in the deployed stack</p>
              </div>
              <div className="px-5 py-6">
                <p className="metric-value" data-metric>
                  {formatCompact(snapshot.data.totalStars)}
                </p>
                <p className="metric-label">Combined GitHub stars</p>
              </div>
              <div className="px-5 py-6">
                <p className="metric-value" data-metric>
                  {formatCompact(snapshot.data.totalForks)}
                </p>
                <p className="metric-label">Community forks</p>
              </div>
              <div className="px-5 py-6">
                <p className="metric-value" data-metric>
                  {snapshot.data.activeThisWeek}/{snapshot.data.projects.length}
                </p>
                <p className="metric-label">Pushed to in the last seven days</p>
              </div>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
              {LAYER_ORDER.map((layer) => {
                const projects = snapshot.data.projects.filter((project) => project.layer === layer);
                if (projects.length === 0) return null;

                return (
                  <div key={layer} className="surface p-5">
                    <div className="flex items-center justify-between gap-3 border-b border-hairline pb-3">
                      <h3 className="text-sm font-semibold text-foreground">{layer}</h3>
                      <span className="mono-label">
                        {projects.length} {projects.length === 1 ? 'tool' : 'tools'}
                      </span>
                    </div>
                    <div className="divide-y divide-hairline">
                      {projects.map((project) => (
                        <ProjectRow key={project.repo} project={project} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-5">
              <FeedAttribution
                source={snapshot.source}
                fetchedAt={snapshot.fetchedAt}
                note={
                  snapshot.data.unavailable.length > 0
                    ? `${snapshot.data.unavailable.length} repository/repositories unavailable this cycle`
                    : undefined
                }
              />
              <Link
                href="/platform"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                How the stack is operated
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </>
        ) : (
          <FeedUnavailable source={snapshot.source} error={snapshot.error} className="mt-10" />
        )}
      </div>
    </section>
  );
}
