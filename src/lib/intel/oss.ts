/**
 * Live telemetry for the open-source stack Secure Sense builds on.
 *
 * Each entry is a real project with a real repository; every number shown in
 * the UI comes from the GitHub REST API at request time. Set GITHUB_TOKEN to
 * lift the unauthenticated 60 req/hour limit to 5,000.
 */

import { type FeedResult, type FeedSource, daysBetween, fetchJson } from './fetch';

export const GITHUB_SOURCE: FeedSource = {
  name: 'GitHub REST API',
  url: 'https://docs.github.com/rest',
  attribution: 'GitHub',
};

export type OssLayer = 'Detection' | 'Threat Intel' | 'Cloud & Workload' | 'Supply Chain' | 'Response';

export type OssProject = {
  repo: `${string}/${string}`;
  name: string;
  layer: OssLayer;
  /** What this component does inside a deployed Secure Sense pipeline. */
  role: string;
};

/**
 * The deployed reference architecture. Ordered by pipeline position:
 * collection, enrichment, workload coverage, build integrity, response.
 */
export const OSS_STACK: OssProject[] = [
  { repo: 'wazuh/wazuh', name: 'Wazuh', layer: 'Detection', role: 'Endpoint telemetry, log analysis, and file integrity monitoring across the estate.' },
  { repo: 'OISF/suricata', name: 'Suricata', layer: 'Detection', role: 'Network IDS/IPS inspection with protocol decoding at line rate.' },
  { repo: 'zeek/zeek', name: 'Zeek', layer: 'Detection', role: 'Network metadata and connection records for retrospective hunting.' },
  { repo: 'OpenCTI-Platform/opencti', name: 'OpenCTI', layer: 'Threat Intel', role: 'Structured STIX knowledge base correlating actors, TTPs, and indicators.' },
  { repo: 'MISP/MISP', name: 'MISP', layer: 'Threat Intel', role: 'Indicator sharing with sector peers and national CERT feeds.' },
  { repo: 'falcosecurity/falco', name: 'Falco', layer: 'Cloud & Workload', role: 'Kernel-level runtime detection for containers and Kubernetes nodes.' },
  { repo: 'osquery/osquery', name: 'osquery', layer: 'Cloud & Workload', role: 'Fleet-wide host state queried as relational tables.' },
  { repo: 'aquasecurity/trivy', name: 'Trivy', layer: 'Supply Chain', role: 'Image, IaC, and dependency scanning wired into release pipelines.' },
  { repo: 'sigstore/cosign', name: 'Sigstore Cosign', layer: 'Supply Chain', role: 'Artifact signing and provenance verification before deploy.' },
  { repo: 'Velocidex/velociraptor', name: 'Velociraptor', layer: 'Response', role: 'Endpoint forensics and live incident collection at scale.' },
  { repo: 'dfir-iris/iris-web', name: 'DFIR-IRIS', layer: 'Response', role: 'Incident case management and collaborative analyst triage.' },
  { repo: 'SigmaHQ/sigma', name: 'Sigma', layer: 'Detection', role: 'Vendor-neutral detection rules compiled to each SIEM backend.' },
];

type RawRepo = {
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  subscribers_count: number;
  pushed_at: string;
  created_at: string;
  language: string | null;
  license: { spdx_id: string | null; name: string } | null;
};

export type OssProjectMetrics = OssProject & {
  url: string;
  stars: number;
  forks: number;
  openIssues: number;
  watchers: number;
  language: string | null;
  license: string | null;
  lastPushedAt: string;
  /** Days since the most recent push — the honest liveness signal. */
  daysSinceCommit: number;
  ageYears: number;
};

export type OssStackSnapshot = {
  projects: OssProjectMetrics[];
  totalStars: number;
  totalForks: number;
  /** Projects pushed to within the last 7 days. */
  activeThisWeek: number;
  layers: OssLayer[];
  /** Projects whose metrics could not be retrieved this cycle. */
  unavailable: string[];
};

function toMetrics(project: OssProject, raw: RawRepo): OssProjectMetrics {
  return {
    ...project,
    url: raw.html_url,
    stars: raw.stargazers_count,
    forks: raw.forks_count,
    openIssues: raw.open_issues_count,
    watchers: raw.subscribers_count,
    language: raw.language,
    license: raw.license?.spdx_id && raw.license.spdx_id !== 'NOASSERTION' ? raw.license.spdx_id : null,
    lastPushedAt: raw.pushed_at,
    daysSinceCommit: daysBetween(raw.pushed_at),
    ageYears: Math.round((daysBetween(raw.created_at) / 365.25) * 10) / 10,
  };
}

export async function getOssStackSnapshot(): Promise<FeedResult<OssStackSnapshot>> {
  const token = process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = { accept: 'application/vnd.github+json' };
  if (token) headers.authorization = `Bearer ${token}`;

  const fetchedAt = new Date().toISOString();

  const results = await Promise.all(
    OSS_STACK.map(async (project) => {
      const result = await fetchJson<RawRepo>(
        `https://api.github.com/repos/${project.repo}`,
        GITHUB_SOURCE,
        { revalidate: 10_800, headers }
      );

      return result.ok ? toMetrics(project, result.data) : { failed: project.repo as string };
    })
  );

  const projects = results.filter((entry): entry is OssProjectMetrics => !('failed' in entry));
  const unavailable = results.flatMap((entry) => ('failed' in entry ? [entry.failed] : []));

  // Every repository failing means the API is rate limiting or unreachable,
  // which is a feed failure rather than a stack with no projects in it.
  if (projects.length === 0) {
    return {
      ok: false,
      error: 'GitHub API returned no repository metrics (likely rate limited)',
      fetchedAt,
      source: GITHUB_SOURCE,
    };
  }

  return {
    ok: true,
    fetchedAt,
    source: GITHUB_SOURCE,
    data: {
      projects: projects.sort((a, b) => b.stars - a.stars),
      totalStars: projects.reduce((sum, project) => sum + project.stars, 0),
      totalForks: projects.reduce((sum, project) => sum + project.forks, 0),
      activeThisWeek: projects.filter((project) => project.daysSinceCommit <= 7).length,
      layers: ['Detection', 'Threat Intel', 'Cloud & Workload', 'Supply Chain', 'Response'],
      unavailable,
    },
  };
}
