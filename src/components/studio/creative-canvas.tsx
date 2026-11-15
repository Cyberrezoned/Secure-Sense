'use client';

import { useState } from 'react';
import { ArrowUpRight, AudioLines, Clapperboard, Play, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { INSTANT, studioMotion } from '@/lib/motion-tokens';
import styles from '@/app/(site)/studio/studio.module.css';

// `stamp` and `sticker` are resting angles in degrees. They differ a little
// per stage so the two pieces re-seat themselves when the stage changes.
const scenes = [
  { name: 'Find the idea', label: '01 / Creative direction', lines: ['You have', 'something', <em key="em">to say.</em>], note: 'Start with a question your audience actually asks.', tag: 'Make it yours', tone: 'lime', stamp: 13, sticker: -5 },
  { name: 'Shape the story', label: '02 / AI + your voice', lines: ['A rough idea.', 'A sharper', <em key="em">story.</em>], note: 'Explore with AI. Edit with your own judgement.', tag: 'Human in the loop', tone: 'lilac', stamp: 9, sticker: -3 },
  { name: 'Make the content', label: '03 / Production desk', lines: ['Frame it.', 'Cut it.', <em key="em">Make it move.</em>], note: 'Turn the script into something worth watching.', tag: 'Work in progress', tone: 'peach', stamp: 16, sticker: -6.5 },
] as const;

export function CreativeCanvas() {
  const reduced = usePrefersReducedMotion();
  const [scene, setScene] = useState(0);
  const active = scenes[scene];

  const seat = reduced ? INSTANT : studioMotion.sticker;
  const lineFrom = reduced ? false : { opacity: 0, y: 14, rotate: -1.5 };
  const textFrom = reduced ? false : { opacity: 0 };
  const copy = (order: number) => reduced ? INSTANT : { ...studioMotion.copy, delay: order * studioMotion.lineStep };

  return (
    <div className={styles.canvasWrap}>
      <motion.div className={styles.orbitStamp} aria-hidden="true" initial={false} animate={{ rotate: active.stamp }} transition={seat}>CREATE<br />WITH<br />INTENT ↗</motion.div>
      <div className={styles.composition}>
        <div className={styles.boardTop}><Clapperboard size={22} aria-hidden="true" /><span>The creative playground</span><span>0{scene + 1} / 03</span></div>
        <div className={styles.storyFrame} data-tone={active.tone} aria-live="polite" aria-atomic="true">
          <motion.span key={scene} className={styles.kicker} initial={textFrom} animate={{ opacity: 1 }} transition={copy(0)}>{active.label}</motion.span>
          {/* All three headlines share one cell so the frame keeps the height of the tallest. */}
          <div className={styles.reserve}>
            {scenes.map(item => <p key={item.name} className={`${styles.canvasHeadline} ${styles.reserveSizer}`} aria-hidden="true">{item.lines.map((line, index) => <span key={index}>{line}</span>)}</p>)}
            <p key={scene} className={styles.canvasHeadline}>
              {active.lines.map((line, index) => <motion.span key={index} initial={lineFrom} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={copy(index)}>{line}</motion.span>)}
            </p>
          </div>
          <span className={styles.frameCross} aria-hidden="true">+</span>
          <ArrowUpRight size={46} strokeWidth={1.2} aria-hidden="true" />
        </div>
        <div className={styles.audio}>
          <AudioLines size={26} aria-hidden="true" />
          <span className={styles.reserve}>
            {scenes.map(item => <span key={item.name} className={styles.reserveSizer} aria-hidden="true">{item.note}</span>)}
            <motion.span key={scene} initial={textFrom} animate={{ opacity: 1 }} transition={copy(3)}>{active.note}</motion.span>
          </span>
        </div>
        <div className={styles.canvasControls} role="group" aria-label="Explore the creative process">
          {scenes.map((item, index) => (
            <button key={item.name} type="button" aria-pressed={index === scene} onClick={() => setScene(index)}>
              <span>0{index + 1}</span>{item.name}
              {/* One marker, handed from button to button, instead of one that blinks off and on. */}
              {index === scene && (
                <motion.span layoutId="canvas-marker" className={styles.controlMarker} transition={{ layout: reduced ? INSTANT : studioMotion.arrange }} aria-hidden="true">
                  <Play size={11} fill="currentColor" />
                </motion.span>
              )}
            </button>
          ))}
        </div>
        <p className={styles.boardCaption}>Interactive studio sketch / Choose a stage to explore</p>
      </div>
      <motion.div className={styles.canvasSticker} initial={false} animate={{ rotate: active.sticker }} transition={seat}
        whileHover={reduced ? undefined : { rotate: active.sticker - 3, scale: 1.04 }} whileTap={reduced ? undefined : { scale: 0.97 }}>
        <Sparkles size={17} aria-hidden="true" />
        <motion.span key={scene} initial={textFrom} animate={{ opacity: 1 }} transition={copy(1)}>{active.tag}</motion.span>
      </motion.div>
    </div>
  );
}
