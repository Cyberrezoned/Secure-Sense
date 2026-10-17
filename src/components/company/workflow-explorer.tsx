'use client';

import { useId, useState } from 'react';
import { ArrowDownRight } from 'lucide-react';

const workflows = {
  supply: {
    label: 'Commodity infrastructure',
    title: 'From deposited produce to a financed order.',
    description: 'Select a stage to see who acts, what is recorded, and how the next decision is supported.',
    footer: 'Mobile PWA + web console / Hash-chained records / No blockchain dependency',
    steps: [
      { label: 'Deposit & grade', title: 'Establish what is in the warehouse.', copy: 'A farmer deposits produce. The warehouse grades the delivery and its operator signs the record before a receipt is issued.', actor: 'Farmer and warehouse operator', record: 'Graded delivery and operator signature', handoff: 'The delivery record becomes the basis for the electronic warehouse receipt.' },
      { label: 'Issue receipt', title: 'Make the delivery record verifiable.', copy: 'The signed delivery becomes an electronic warehouse receipt (e-WR). Cryptographic verification connects subsequent transactions to that record.', actor: 'Warehouse operator and platform', record: 'Cryptographically verified e-WR', handoff: 'A merchant can place an offtake order against the recorded commodity.' },
      { label: 'Order & finance', title: 'Connect the order to the financing decision.', copy: 'The merchant places an offtake order against the receipt. A financier assesses and underwrites the corresponding invoice.', actor: 'Merchant and financier', record: 'Offtake order and underwritten invoice', handoff: 'The approved financing decision supports the escrow disbursement workflow.' },
      { label: 'Disburse & record', title: 'Preserve the sequence of the transaction.', copy: 'Farmer advances are disbursed through escrow. The platform links the transaction records in a tamper-evident, hash-chained ledger.', actor: 'Platform escrow workflow', record: 'Disbursement and linked ledger entries', handoff: 'The record can be checked against the preceding events in the commodity transaction.' },
    ],
  },
  security: {
    label: 'Cybersecurity delivery',
    title: 'From an agreed scope to a tested correction.',
    description: 'Select a stage to inspect the work and the evidence an assessment engagement should produce.',
    footer: 'Agreed scope / Traceable findings / Assigned remediation / Documented retest',
    steps: [
      { label: 'Scope', title: 'Define the systems and permitted work.', copy: 'Agree the assets, test boundaries, business priorities, and rules of engagement before technical assessment begins.', actor: 'Client owner and assessment team', record: 'Approved scope and rules of engagement', handoff: 'The assessment has explicit boundaries and an agreed reporting audience.' },
      { label: 'Assess', title: 'Connect each finding to evidence.', copy: 'Investigate the agreed attack surface and record reproducible observations. Describe the affected system, conditions, and potential impact.', actor: 'Assessment team', record: 'Findings, reproduction steps, and supporting evidence', handoff: 'Engineering and risk owners can prioritise work from a documented technical basis.' },
      { label: 'Remediate', title: 'Give each correction an owner.', copy: 'Translate findings into a remediation register with ownership, priorities, and acceptance criteria. Support engineering teams within the agreed engagement scope.', actor: 'Client engineering and risk owners', record: 'Remediation register and implementation evidence', handoff: 'Reported fixes are ready to be checked against the original finding.' },
      { label: 'Retest', title: 'Separate a reported fix from a verified result.', copy: 'Retest the affected behaviour and document the result, remaining exposure, and any limits to the validation.', actor: 'Assessment team and client owner', record: 'Retest evidence and finding status', handoff: 'The client receives a clear record of what was checked and what remains open.' },
    ],
  },
} as const;

export function WorkflowExplorer({ mode = 'supply' }: { mode?: keyof typeof workflows }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const workflow = workflows[mode];
  const step = workflow.steps[active];

  return (
    <section className="blueprint-panel" aria-labelledby={`${id}-title`}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/25 px-5 py-5 sm:px-8 lg:px-10">
        <p className="font-code text-[0.6875rem] uppercase tracking-wider">{workflow.label}</p>
        <p className="font-code text-[0.625rem] uppercase tracking-wider text-white/70">Workflow illustration</p>
      </div>
      <div className="px-5 pb-8 pt-8 sm:px-8 lg:px-10 lg:pt-10">
        <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <h2 id={`${id}-title`} className="max-w-xl font-headline text-3xl font-medium leading-tight tracking-tight sm:text-4xl">{workflow.title}</h2>
          <p className="max-w-md text-sm leading-7 text-white/75 lg:pt-1">{workflow.description}</p>
        </div>
        <ol className="mt-10 grid grid-cols-2 gap-x-3 gap-y-4 md:grid-cols-4 lg:gap-x-5">
          {workflow.steps.map((item, index) => (
            <li key={item.label}>
              <button type="button" className="workflow-step" aria-pressed={active === index} aria-controls={`${id}-detail`} onClick={() => setActive(index)}>
                <span className="flex w-full items-center justify-between"><span className="font-code text-xs">0{index + 1}</span><ArrowDownRight className="h-4 w-4" aria-hidden="true" /></span>
                <span className="text-sm font-medium sm:text-base">{item.label}</span>
              </button>
            </li>
          ))}
        </ol>
        <div id={`${id}-detail`} className="mt-9 grid gap-8 border-b border-white/25 pb-9 md:min-h-[230px] md:grid-cols-2 lg:gap-20" aria-live="polite" aria-atomic="true">
          <div><p className="font-code text-[0.6875rem] uppercase tracking-wider text-white/60">Stage 0{active + 1}</p><h3 className="mt-3 text-2xl font-medium leading-snug sm:text-3xl">{step.title}</h3><p className="mt-4 max-w-xl text-sm leading-7 text-white/80">{step.copy}</p></div>
          <dl className="divide-y divide-white/20 text-sm">
            <div className="grid gap-2 pb-4 sm:grid-cols-[100px_1fr]"><dt className="text-white/60">Participants</dt><dd className="leading-6">{step.actor}</dd></div>
            <div className="grid gap-2 py-4 sm:grid-cols-[100px_1fr]"><dt className="text-white/60">Record</dt><dd className="leading-6">{step.record}</dd></div>
            <div className="grid gap-2 pt-4 sm:grid-cols-[100px_1fr]"><dt className="text-white/60">Next decision</dt><dd className="leading-6">{step.handoff}</dd></div>
          </dl>
        </div>
        <p className="mt-5 font-code text-[0.625rem] leading-6 tracking-wide text-white/65">{workflow.footer}</p>
      </div>
    </section>
  );
}
