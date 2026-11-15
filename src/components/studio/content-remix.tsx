'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowUpRight, Play, ArrowRight, Bookmark } from 'lucide-react';
import { animate, motion, useMotionValue } from 'motion/react';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { INSTANT, studioMotion } from '@/lib/motion-tokens';
import styles from '@/app/(site)/studio/studio.module.css';

const formats = [
  { name: 'YouTube', format: 'A practical video', title: 'Could you spot a fake brand deal?', hook: 'Open with a fictional partnership email. Pause before opening its attachment.', structure: 'Set up the scenario → examine the sender and request → explain the warning signs → recap the checks.', task: 'Write an opening, plan the screen demonstration, and design a thumbnail that asks a clear question.', check: 'Use fictional contact details and a safe mock-up rather than a live suspicious file.' },
  { name: 'Reels & TikTok', format: 'A short vertical story', title: 'A brand deal lands in your inbox. What next?', hook: 'Show the message first. Ask the viewer what they would check before replying.', structure: 'Hook → one visible warning sign → one practical check → invite the viewer to save the lesson.', task: 'Storyboard a short clip with readable captions, a close-up of the example, and a clear final action.', check: 'Keep enough context to explain the risk. Shorter content still needs accurate claims.' },
  { name: 'Instagram & LinkedIn', format: 'A swipeable explainer', title: 'Before you say yes to that collaboration…', hook: 'Lead with a question your audience has faced, then walk through the decision.', structure: 'Cover question → sender check → request check → independent verification → recap.', task: 'Draft five panels with one point per panel and a caption that adds context.', check: 'Use legible type and descriptive alt text. Avoid exposing someone’s real inbox.' },
  { name: 'Website & blog', format: 'A reference people can return to', title: 'A creator’s guide to checking partnership requests', hook: 'Start with the moment a creator receives an unfamiliar offer and needs a next step.', structure: 'Situation → annotated example → practical checklist → what to do if you already responded.', task: 'Outline a useful article, include an accessible example, and identify sources to review before publication.', check: 'Verify linked sources and date the guidance so readers can judge its context.' },
] as const;

type Format = (typeof formats)[number];
type Mockup = { tilt: number; sticker?: string; kicker?: string; headline: ReactNode; footer: ReactNode };

/** The artwork for each format's card. `tilt` is its resting angle in degrees. */
const mockups: Mockup[] = [
  { tilt: -2, sticker: 'Too good to be true?', headline: <>A brand deal.<br /><em>Or a trap?</em></>, footer: <><Play size={28} fill="currentColor" aria-hidden="true" /><span>The creator’s inbox / Video concept</span></> },
  { tilt: 3, sticker: 'Pause before you reply', headline: <>POV: your<br />first <em>brand<br />deal</em> arrives.</>, footer: <><span className={styles.waveform} aria-hidden="true">▂ ▆ ▃ █ ▅ ▂ ▇ ▃</span><span>Check the sender.<br />Then check the request.</span></> },
  { tilt: -2, sticker: 'Save this checklist', headline: <>Before<br />you say<br /><em>yes.</em></>, footer: <><span>01 / 05 — Swipe to investigate</span><ArrowRight size={25} aria-hidden="true" /></> },
  { tilt: 1, kicker: 'The creator’s field notes', headline: <>The offer<br />in your<br /><em>inbox.</em></>, footer: <><span>A guide to checking<br />partnership requests</span><Bookmark size={23} aria-hidden="true" /></> },
];
const STICKER_TILT = 5;

const facts = [
  { term: 'Shape the story', key: 'structure' },
  { term: 'Make it practical', key: 'task' },
  { term: 'Before publishing', key: 'check' },
] as const;

function MockupTop() {
  return <div className={styles.mockupTop}><span>STUDIO / AWARENESS</span><span>↗</span></div>;
}

/** A still copy of one format's card and caption, used only to hold its space. */
function MockupSizer({ index, cardRef }: { index: number; cardRef: (element: HTMLDivElement | null) => void }) {
  const mockup = mockups[index];
  return (
    <div className={styles.reserveSizer} aria-hidden="true">
      <div ref={cardRef} className={styles.contentMockup} data-format={index}>
        <MockupTop />
        {mockup.sticker ? <span className={styles.mockupSticker}>{mockup.sticker}</span> : <><div className={styles.articleRule} /><span className={styles.kicker}>{mockup.kicker}</span></>}
        <p>{mockup.headline}</p>
        <div className={styles.mockupBottom}><div className={styles.mockupFooter}>{mockup.footer}</div></div>
      </div>
      <p className={styles.mockupCaption}>Design study / {formats[index].format}</p>
    </div>
  );
}

function DetailsSizer({ format }: { format: Format }) {
  return (
    <div className={`${styles.remixDetails} ${styles.reserveSizer}`} aria-hidden="true">
      <p className={styles.kicker}>{format.format}</p><h3>{format.title}</h3><p className={styles.remixHook}>{format.hook}</p>
      <dl>{facts.map(fact => <div key={fact.key}><dt>{fact.term}</dt><dd>{format[fact.key]}</dd></div>)}</dl>
    </div>
  );
}

export function ContentRemix() {
  const reduced = usePrefersReducedMotion();
  const [selected, setSelected] = useState(0);
  const active = formats[selected];
  const mockup = mockups[selected];

  const card = useRef<HTMLDivElement>(null);
  const sizers = useRef<(HTMLDivElement | null)[]>([]);
  const resize = useRef<ReturnType<typeof animate>[]>([]);
  const run = useRef(0);
  // The card's size is its own (auto) at rest and is only driven while it
  // re-shapes, so the stylesheet stays in charge of every breakpoint.
  const width = useMotionValue<number | string>('auto');
  const height = useMotionValue<number | string>('auto');

  /** Hand the card's size back to the stylesheet. */
  function rest() {
    run.current++;
    resize.current.forEach(controls => controls.stop());
    resize.current = [];
    width.set('auto');
    height.set('auto');
    card.current?.removeAttribute('data-arranging');
  }
  const restLatest = useRef(rest);
  restLatest.current = rest;

  // Reduced motion switched on mid-move, or the page is left: stop at once.
  useEffect(() => {
    if (reduced) restLatest.current();
  }, [reduced]);
  useEffect(() => () => resize.current.forEach(controls => controls.stop()), []);

  /**
   * Re-shape the card from the size it has now to the size the next format
   * needs. Real width and height are animated rather than a scale transform:
   * the card is rotated, bordered and hard-shadowed, and scaling would warp
   * all three along with the type.
   */
  function reshape(index: number) {
    const element = card.current;
    const target = sizers.current[index];
    if (!element || !target || reduced) return;
    const from = { width: element.offsetWidth, height: element.offsetHeight };
    resize.current.forEach(controls => controls.stop());
    // Lifts the format's own size limits while the size is being driven.
    element.setAttribute('data-arranging', '');
    resize.current = [
      animate(width, [from.width, target.offsetWidth], studioMotion.arrange),
      animate(height, [from.height, target.offsetHeight], studioMotion.arrange),
    ];
    const current = ++run.current;
    Promise.all(resize.current).then(() => {
      if (run.current === current) rest();
    });
  }

  function select(index: number) {
    if (index === selected) return;
    reshape(index);
    setSelected(index);
  }

  // Beat one: the card and what it carries move into place. Beat two: copy.
  const arrange = reduced ? INSTANT : studioMotion.arrange;
  const copyFrom = reduced ? false : { opacity: 0, y: 8 };
  const copyIn = { opacity: 1, y: 0 };
  const copy = (order: number) => reduced ? INSTANT : { ...studioMotion.copy, delay: studioMotion.copyDelay + order * studioMotion.copyStep };

  return (
    <div className={styles.remix}>
      <div className={styles.brief}><span className={styles.kicker}>Example brief / Cyber awareness</span><p>Help a new creator recognise a suspicious brand collaboration.</p><span className={styles.note}>Illustrative content plan</span></div>
      <div className={styles.formatButtons} role="group" aria-label="Choose a content format">
        {formats.map((format, index) => (
          <button key={format.name} type="button" aria-pressed={selected === index} aria-controls="remix-output" onClick={() => select(index)}>
            {format.name}<ArrowUpRight size={15} aria-hidden="true" />
            {selected === index && <motion.span layoutId="remix-pointer" className={styles.formatPointer} transition={{ layout: arrange }} aria-hidden="true" />}
          </button>
        ))}
      </div>
      <div id="remix-output" className={styles.remixOutput} aria-live="polite" aria-atomic="true">
        {/* Every format is laid out invisibly in the same cell, so the output
            always has the height of the tallest and nothing around it moves. */}
        <div className={styles.reserve}>
          {formats.map((format, index) => <MockupSizer key={format.name} index={index} cardRef={element => { sizers.current[index] = element; }} />)}
          <div>
            <motion.div ref={card} className={styles.contentMockup} data-format={selected} aria-label={`Illustrative ${active.name} content design`}
              initial={false} animate={{ rotate: mockup.tilt }} transition={arrange} style={{ width, height }}>
              <MockupTop />
              {mockup.sticker
                ? <motion.span key={selected} className={styles.mockupSticker} initial={reduced ? false : { opacity: 0, scale: 0.9, rotate: STICKER_TILT + 7 }}
                    animate={{ opacity: 1, scale: 1, rotate: STICKER_TILT }} transition={reduced ? INSTANT : { ...studioMotion.sticker, delay: studioMotion.stickerDelay }}>{mockup.sticker}</motion.span>
                : <>
                    <motion.div className={styles.articleRule} initial={reduced ? false : { scaleX: 0 }} animate={{ scaleX: 1 }} transition={reduced ? INSTANT : { ...studioMotion.copy, delay: studioMotion.stickerDelay }} />
                    <motion.span className={styles.kicker} initial={copyFrom} animate={copyIn} transition={copy(0)}>{mockup.kicker}</motion.span>
                  </>}
              <motion.p key={`headline-${selected}`} initial={copyFrom} animate={copyIn} transition={copy(0)}>{mockup.headline}</motion.p>
              <div className={styles.mockupBottom}>
                <motion.div key={selected} className={styles.mockupFooter} initial={copyFrom} animate={copyIn} transition={copy(1)}>{mockup.footer}</motion.div>
              </div>
            </motion.div>
            <p className={styles.mockupCaption}>Design study / {active.format}</p>
          </div>
        </div>
        <div className={styles.reserve}>
          {formats.map(format => <DetailsSizer key={format.name} format={format} />)}
          <div key={selected} className={styles.remixDetails}>
            <motion.p className={styles.kicker} initial={copyFrom} animate={copyIn} transition={copy(2)}>{active.format}</motion.p>
            <motion.h3 initial={copyFrom} animate={copyIn} transition={copy(3)}>{active.title}</motion.h3>
            <motion.p className={styles.remixHook} initial={copyFrom} animate={copyIn} transition={copy(4)}>{active.hook}</motion.p>
            <dl>{facts.map((fact, row) => <motion.div key={fact.key} initial={copyFrom} animate={copyIn} transition={copy(5 + row)}><dt>{fact.term}</dt><dd>{active[fact.key]}</dd></motion.div>)}</dl>
          </div>
        </div>
      </div>
    </div>
  );
}
