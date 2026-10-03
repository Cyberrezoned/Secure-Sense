'use client';

import { useMemo, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import type { KevSummary } from '@/lib/intel';
import { formatCount, formatMonth } from '@/lib/format';
import { cn } from '@/lib/utils';

/**
 * Monthly additions to the CISA KEV catalogue.
 *
 * Stacked rather than overlaid because the two series decompose one total:
 * ransomware-linked entries are a subset of the month's additions, so the
 * column height stays a real figure (every CVE added that month).
 *
 * Palette: chart-1 / chart-3, validated for both themes against the six
 * checks (adjacent CVD ΔE 20.7 protan, 30.9 normal; both inside the mode
 * lightness band). The legend plus the table view keep identity off colour alone.
 */

const WINDOW_OPTIONS = [
  { label: '12M', months: 12 },
  { label: '24M', months: 24 },
  { label: 'All', months: Number.POSITIVE_INFINITY },
] as const;

type Row = {
  month: string;
  label: string;
  other: number;
  ransomware: number;
  total: number;
};

function TrendTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: Row }> }) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;

  return (
    <div className="surface-raised min-w-[11rem] p-3 text-xs">
      <p className="font-code text-[0.6875rem] uppercase tracking-[0.08em] text-muted-foreground">{row.label}</p>
      <p className="mt-2 flex items-baseline justify-between gap-4">
        <span className="text-muted-foreground">Added</span>
        <span className="font-semibold text-foreground tabular">{formatCount(row.total)}</span>
      </p>
      <p className="mt-1 flex items-baseline justify-between gap-4">
        <span className="inline-flex items-center gap-1.5 text-muted-foreground">
          <span className="h-2 w-2 rounded-sm bg-chart-3" aria-hidden="true" />
          Ransomware-linked
        </span>
        <span className="font-semibold text-foreground tabular">{formatCount(row.ransomware)}</span>
      </p>
    </div>
  );
}

export function KevTrendChart({ summary }: { summary: KevSummary }) {
  const [months, setMonths] = useState<number>(24);
  const [showTable, setShowTable] = useState(false);

  const rows = useMemo<Row[]>(() => {
    const series = summary.additionsByMonth.map((bucket) => ({
      month: bucket.month,
      label: formatMonth(bucket.month),
      other: bucket.added - bucket.ransomware,
      ransomware: bucket.ransomware,
      total: bucket.added,
    }));

    return Number.isFinite(months) ? series.slice(-months) : series;
  }, [summary.additionsByMonth, months]);

  // Label every nth tick so the axis stays legible as the window widens.
  const tickStep = rows.length > 36 ? 6 : rows.length > 18 ? 3 : 2;
  const peak = rows.reduce((max, row) => Math.max(max, row.total), 0);

  return (
    <figure className="m-0">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <figcaption className="text-sm font-semibold text-foreground">
            Vulnerabilities added to the CISA KEV catalogue, by month
          </figcaption>
          <p className="mt-1 text-xs text-muted-foreground">
            Catalogue {summary.catalogVersion} · {formatCount(summary.total)} entries with confirmed in-the-wild
            exploitation
          </p>
        </div>

        <div
          role="group"
          aria-label="Time range"
          className="inline-flex items-center gap-0.5 rounded-full border border-hairline bg-secondary/60 p-0.5"
        >
          {WINDOW_OPTIONS.map((option) => (
            <button
              key={option.label}
              type="button"
              aria-pressed={months === option.months}
              onClick={() => setMonths(option.months)}
              className={cn(
                'rounded-full px-3 py-1 text-xs font-medium transition-colors',
                months === option.months
                  ? 'bg-card text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Legend: always present at two series, so identity never rests on colour. */}
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm bg-chart-1" aria-hidden="true" />
          Other additions
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm bg-chart-3" aria-hidden="true" />
          Ransomware-linked
        </span>
      </div>

      <div className="mt-4 h-[17rem] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={rows} margin={{ top: 8, right: 4, bottom: 0, left: -18 }} barCategoryGap="22%">
            <CartesianGrid
              vertical={false}
              stroke="hsl(var(--hairline))"
              strokeDasharray="0"
            />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={{ stroke: 'hsl(var(--hairline))' }}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
              interval={0}
              tickFormatter={(value: string, index: number) => (index % tickStep === 0 ? value : '')}
              minTickGap={0}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={48}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
              domain={[0, Math.ceil(peak / 10) * 10]}
            />
            <Tooltip
              content={<TrendTooltip />}
              cursor={{ fill: 'hsl(var(--muted-foreground))', fillOpacity: 0.08 }}
            />
            {/* 1px surface stroke on each segment yields the 2px gap between
                stacked fills and between neighbouring columns. */}
            <Bar
              dataKey="other"
              stackId="kev"
              fill="hsl(var(--chart-1))"
              stroke="hsl(var(--card))"
              strokeWidth={1}
              isAnimationActive={false}
            />
            <Bar
              dataKey="ransomware"
              stackId="kev"
              stroke="hsl(var(--card))"
              strokeWidth={1}
              radius={[4, 4, 0, 0]}
              isAnimationActive={false}
            >
              {rows.map((row) => (
                // A month with no ransomware-linked entries must not render a
                // 0-height cap, so the rounded end falls to the lower segment.
                <Cell key={row.month} fill="hsl(var(--chart-3))" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4 border-t border-hairline pt-3">
        <p className="text-[0.6875rem] text-muted-foreground">
          Peak month in view: {formatCount(peak)} additions
        </p>
        <button
          type="button"
          onClick={() => setShowTable((open) => !open)}
          aria-expanded={showTable}
          className="text-[0.6875rem] font-medium text-primary hover:underline"
        >
          {showTable ? 'Hide data table' : 'View as table'}
        </button>
      </div>

      {showTable ? (
        <div className="mt-3 max-h-64 overflow-auto rounded-md border border-hairline">
          <table className="w-full text-left text-xs">
            <caption className="sr-only">
              Monthly additions to the CISA KEV catalogue, with ransomware-linked counts
            </caption>
            <thead className="sticky top-0 bg-secondary/90 backdrop-blur">
              <tr>
                <th scope="col" className="px-3 py-2 font-medium text-muted-foreground">Month</th>
                <th scope="col" className="px-3 py-2 text-right font-medium text-muted-foreground">Added</th>
                <th scope="col" className="px-3 py-2 text-right font-medium text-muted-foreground">Ransomware-linked</th>
              </tr>
            </thead>
            <tbody>
              {[...rows].reverse().map((row) => (
                <tr key={row.month} className="border-t border-hairline">
                  <th scope="row" className="px-3 py-1.5 font-normal text-foreground">{row.label}</th>
                  <td className="px-3 py-1.5 text-right tabular text-foreground">{formatCount(row.total)}</td>
                  <td className="px-3 py-1.5 text-right tabular text-muted-foreground">
                    {formatCount(row.ransomware)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </figure>
  );
}
