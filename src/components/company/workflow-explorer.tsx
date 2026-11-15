'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { ArrowDownRight } from 'lucide-react';
import { animate, motion, useMotionValue, useTransform } from 'motion/react';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { supplyMotion } from '@/lib/motion-tokens';
import styles from './workflow-explorer.module.css';

const workflows = {
  supply: {
    label: 'Commodity infrastructure',
    title: 'From deposited produce to a financed order.',
    description: 'Select a stage to see who acts, what is recorded, and how the next decision is supported.',
    footer: 'Illustrated workflow / Hash-chained records / Base milestones planned',
    // The travelling record is a drawing, so its label says so.
    record: 'Sample receipt',
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
    record: 'Sample finding',
    steps: [
      { label: 'Scope', title: 'Define the systems and permitted work.', copy: 'Agree the assets, test boundaries, business priorities, and rules of engagement before technical assessment begins.', actor: 'Client owner and assessment team', record: 'Approved scope and rules of engagement', handoff: 'The assessment has explicit boundaries and an agreed reporting audience.' },
      { label: 'Assess', title: 'Connect each finding to evidence.', copy: 'Investigate the agreed attack surface and record reproducible observations. Describe the affected system, conditions, and potential impact.', actor: 'Assessment team', record: 'Findings, reproduction steps, and supporting evidence', handoff: 'Engineering and risk owners can prioritise work from a documented technical basis.' },
      { label: 'Remediate', title: 'Give each correction an owner.', copy: 'Translate findings into a remediation register with ownership, priorities, and acceptance criteria. Support engineering teams within the agreed engagement scope.', actor: 'Client engineering and risk owners', record: 'Remediation register and implementation evidence', handoff: 'Reported fixes are ready to be checked against the original finding.' },
      { label: 'Retest', title: 'Separate a reported fix from a verified result.', copy: 'Retest the affected behaviour and document the result, remaining exposure, and any limits to the validation.', actor: 'Assessment team and client owner', record: 'Retest evidence and finding status', handoff: 'The client receives a clear record of what was checked and what remains open.' },
    ],
  },
} as const;

/** Handle on a running animation, used to stop it when a newer selection arrives. */
type Playback = ReturnType<typeof animate>;
type Step = (typeof workflows)[keyof typeof workflows]['steps'][number];
/** How the current hand-off travels: 1 towards later stages, -1 towards earlier ones. */
type Move = { direction: 1 | -1; fillDelay: number };

const facts = [
  { term: 'Participants', key: 'actor', spacing: 'pb-4' },
  { term: 'Record', key: 'record', spacing: 'py-4' },
  { term: 'Next decision', key: 'handoff', spacing: 'pt-4' },
] as const;

function StageLabel({ index, label }: { index: number; label: string }) {
  return <>
    <span className="flex w-full items-center justify-between"><span className="font-code text-xs">0{index + 1}</span><ArrowDownRight className="h-4 w-4" aria-hidden="true" /></span>
    <span className="text-sm font-medium sm:text-base">{label}</span>
  </>;
}

function StageCopy({ index, step }: { index: number; step: Step }) {
  return <>
    <p className="font-code text-[0.6875rem] uppercase tracking-wider text-white/60">Stage 0{index + 1}</p>
    <h3 className="mt-3 text-2xl font-medium leading-snug sm:text-3xl">{step.title}</h3>
    <p className="mt-4 max-w-xl text-sm leading-7 text-white/80">{step.copy}</p>
  </>;
}

/**
 * One stage on the rail. The white active state is a second copy of the label
 * on a white panel that wipes across the button, so the label is legible at
 * every point of the wipe: white on the panel, ink on the white.
 */
function StageButton({ index, label, active, move, reduced, controls, onSelect }: {
  index: number; label: string; active: boolean; move: Move; reduced: boolean; controls: string; onSelect: () => void;
}) {
  // Percentage the white panel is pushed out of the button. Its content is
  // pulled back by the same amount, which keeps the label still while it wipes.
  const shift = useMotionValue(active ? 0 : 100);
  const panelX = useTransform(shift, value => `${value}%`);
  const labelX = useTransform(shift, value => `${-value}%`);
  const wasActive = useRef(active);
  const wipe = useRef<Playback | null>(null);

  useEffect(() => {
    if (wasActive.current === active) return;
    wasActive.current = active;
    wipe.current?.stop();
    // The fill leaves in the direction of travel and arrives from behind it.
    const ahead = move.direction * 100;
    if (reduced) {
      shift.set(active ? 0 : ahead);
    } else if (active) {
      if (Math.abs(shift.get()) > 99) shift.set(-ahead);
      wipe.current = animate(shift, 0, { duration: supplyMotion.fill, delay: move.fillDelay, ease: supplyMotion.ease });
    } else {
      wipe.current = animate(shift, ahead, { duration: supplyMotion.fill, ease: supplyMotion.ease });
    }
  }, [active, move, reduced, shift]);

  // Reduced motion switched on mid-wipe: finish it at once.
  useEffect(() => {
    if (!reduced) return;
    wipe.current?.stop();
    shift.set(wasActive.current ? 0 : shift.get() < 0 ? -100 : 100);
  }, [reduced, shift]);

  useEffect(() => () => wipe.current?.stop(), []);

  return (
    <button type="button" className="workflow-step" aria-pressed={active} aria-controls={controls} onClick={onSelect}>
      <StageLabel index={index} label={label} />
      <motion.span className={styles.fill} style={{ x: panelX }} aria-hidden="true">
        <motion.span className={`workflow-step-layout ${styles.fillLabel}`} style={{ x: labelX }}>
          <StageLabel index={index} label={label} />
        </motion.span>
      </motion.span>
    </button>
  );
}

export function WorkflowExplorer({ mode = 'supply' }: { mode?: keyof typeof workflows }) {
  const reduced = usePrefersReducedMotion();
  const id = useId();
  const workflow = workflows[mode];
  // `active` is the stage the visitor chose. `shown` is the stage whose detail
  // is on screen; it follows once the record has arrived.
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(0);
  const [inTransit, setInTransit] = useState(false);
  const [move, setMove] = useState<Move>({ direction: 1, fillDelay: 0 });
  const step = workflow.steps[shown];

  const rail = useRef<HTMLDivElement>(null);
  const stops = useRef<(HTMLLIElement | null)[]>([]);
  const anchors = useRef<{ x: number; y: number }[]>([]);
  const flight = useRef<Playback[]>([]);
  const run = useRef(0);
  const target = useRef(0);
  // Stage 01 sits at the rail's origin, so the record is placed correctly
  // before anything has been measured and without JavaScript.
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  /** End any flight and put record and detail on the given stage at once. */
  function settle(index: number) {
    run.current++;
    flight.current.forEach(controls => controls.stop());
    flight.current = [];
    const anchor = anchors.current[index];
    if (anchor) {
      x.set(anchor.x);
      y.set(anchor.y);
    }
    setShown(index);
    setInTransit(false);
  }
  const settleLatest = useRef(settle);
  settleLatest.current = settle;

  // Keep the stage positions current; the rail is one row or a 2x2 grid.
  useEffect(() => {
    const element = rail.current;
    if (!element) return;
    const measure = () => {
      anchors.current = stops.current.map(stop => ({ x: stop?.offsetLeft ?? 0, y: stop?.offsetTop ?? 0 }));
      settleLatest.current(target.current);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => {
      observer.disconnect();
      flight.current.forEach(controls => controls.stop());
    };
  }, []);

  // Reduced motion switched on mid-flight: finish where the record was going.
  useEffect(() => {
    if (reduced) settleLatest.current(target.current);
  }, [reduced]);

  /** Send the record to a stage, calling at each stage on the way. Returns the flight time. */
  function fly(index: number) {
    const points = anchors.current;
    // Start from the stage nearest the record, which matters when a flight is interrupted.
    let nearest = 0;
    points.forEach((point, position) => {
      if (Math.hypot(point.x - x.get(), point.y - y.get()) < Math.hypot(points[nearest].x - x.get(), points[nearest].y - y.get())) nearest = position;
    });
    const calls: number[] = [];
    const towards = index > nearest ? 1 : -1;
    for (let stop = nearest; stop !== index; stop += towards) calls.push(stop + towards);
    if (calls.length === 0) calls.push(index);

    const duration = supplyMotion.hop + supplyMotion.hopExtra * (calls.length - 1);
    const options = { duration, ease: supplyMotion.ease };
    flight.current.forEach(controls => controls.stop());
    flight.current = [
      animate(x, [x.get(), ...calls.map(stop => points[stop].x)], options),
      animate(y, [y.get(), ...calls.map(stop => points[stop].y)], options),
    ];
    const current = ++run.current;
    flight.current[0].then(() => {
      if (run.current !== current) return;
      setShown(index);
      setInTransit(false);
    });
    return duration;
  }

  function choose(index: number) {
    if (index === active) return;
    const direction = index > active ? 1 : -1;
    target.current = index;
    setActive(index);
    if (reduced || anchors.current.length === 0) {
      setMove({ direction, fillDelay: 0 });
      settle(index);
      return;
    }
    const duration = fly(index);
    setMove({ direction, fillDelay: Math.max(0, duration - supplyMotion.fillLead) });
    setInTransit(true);
  }

  // Detail text clears while the record is in transit, then enters from the
  // side the record came from. Nothing enters on first render.
  const enterFrom = reduced ? false : { opacity: 0, x: -move.direction * supplyMotion.shift };
  const detailTransition = (row: number) => reduced ? { duration: 0 }
    : inTransit ? { duration: supplyMotion.clear }
    : { duration: supplyMotion.detail, ease: supplyMotion.ease, delay: row * supplyMotion.rowStep };
  const detailState = { opacity: inTransit ? 0 : 1, x: 0 };

  return (
    <section className="blueprint-panel" aria-labelledby={`${id}-title`}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/25 px-5 py-5 sm:px-8 lg:px-10">
        <p className="font-code text-[0.6875rem] uppercase tracking-wider">{workflow.label}</p>
        <p className="font-code text-[0.625rem] uppercase tracking-wider text-white/70">How the work moves</p>
      </div>
      <div className="px-5 pb-8 pt-8 sm:px-8 lg:px-10 lg:pt-10">
        <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <h2 id={`${id}-title`} className="max-w-xl font-headline text-3xl font-medium leading-tight tracking-tight sm:text-4xl">{workflow.title}</h2>
          <p className="max-w-md text-sm leading-7 text-white/75 lg:pt-1">{workflow.description}</p>
        </div>
        <div ref={rail} className={`${styles.rail} mt-10`}>
          <ol className="grid grid-cols-2 gap-x-3 gap-y-4 md:grid-cols-4 lg:gap-x-5">
            {workflow.steps.map((item, index) => (
              <li key={item.label} ref={element => { stops.current[index] = element; }}>
                <StageButton index={index} label={item.label} active={active === index} move={move} reduced={reduced} controls={`${id}-detail`} onSelect={() => choose(index)} />
              </li>
            ))}
          </ol>
          <motion.div className={styles.record} style={{ x, y }} aria-hidden="true">
            <span className={styles.recordTag}>
              <svg viewBox="0 0 14 16" width="12" height="14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round">
                <path d="M1.5 1h11v14l-1.85-1.3-1.8 1.3L7 13.7 5.15 15l-1.8-1.3L1.5 15z" />
                {/* One line per fact below; they are written as the detail fills in. */}
                {['M4 4.5h6', 'M4 7.25h6', 'M4 10h3.5'].map((line, row) => (
                  <motion.path key={`${shown}-${row}`} d={line} initial={reduced ? false : { pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={reduced ? { duration: 0 } : { duration: supplyMotion.detail, ease: supplyMotion.ease, delay: (row + 1) * supplyMotion.rowStep }} />
                ))}
              </svg>
              {workflow.record}
            </span>
          </motion.div>
        </div>
        <div id={`${id}-detail`} className="mt-9 grid gap-8 border-b border-white/25 pb-9 md:min-h-[230px] md:grid-cols-2 lg:gap-20" aria-live="polite" aria-atomic="true" aria-busy={inTransit}>
          {/* Every stage is laid out invisibly in the same cell, so the panel
              always has the height of the longest stage and nothing below moves. */}
          <div className={styles.stack}>
            {workflow.steps.map((item, index) => <div key={item.label} className={styles.sizer} aria-hidden="true"><StageCopy index={index} step={item} /></div>)}
            <motion.div key={shown} initial={enterFrom} animate={detailState} transition={detailTransition(0)}><StageCopy index={shown} step={step} /></motion.div>
          </div>
          <dl className="divide-y divide-white/20 text-sm">
            {facts.map((fact, row) => (
              <div key={fact.term} className={`grid gap-2 ${fact.spacing} sm:grid-cols-[100px_1fr]`}>
                <dt className="text-white/60">{fact.term}</dt>
                <dd className={`${styles.stack} leading-6`}>
                  {workflow.steps.map(item => <span key={item.label} className={styles.sizer} aria-hidden="true">{item[fact.key]}</span>)}
                  <motion.span key={shown} initial={enterFrom} animate={detailState} transition={detailTransition(row + 1)}>{step[fact.key]}</motion.span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="mt-5 font-code text-[0.625rem] leading-6 tracking-wide text-white/65">{workflow.footer}</p>
      </div>
    </section>
  );
}
