'use client';

import { useState } from 'react';
import { ArrowUpRight, AudioLines, Clapperboard, Play, Sparkles } from 'lucide-react';
import styles from '@/app/(site)/studio/studio.module.css';

const scenes = [
  { name: 'Find the idea', label: '01 / Creative direction', headline: <>You have<br />something<br /><em>to say.</em></>, note: 'Start with a question your audience actually asks.', tag: 'Make it yours', tone: 'lime' },
  { name: 'Shape the story', label: '02 / AI + your voice', headline: <>A rough idea.<br />A sharper<br /><em>story.</em></>, note: 'Explore with AI. Edit with your own judgement.', tag: 'Human in the loop', tone: 'lilac' },
  { name: 'Make the content', label: '03 / Production desk', headline: <>Frame it.<br />Cut it.<br /><em>Make it move.</em></>, note: 'Turn the script into something worth watching.', tag: 'Work in progress', tone: 'peach' },
] as const;

export function CreativeCanvas() {
  const [scene, setScene] = useState(0);
  const active = scenes[scene];
  return (
    <div className={styles.canvasWrap}>
      <div className={styles.orbitStamp} aria-hidden="true">CREATE<br />WITH<br />INTENT ↗</div>
      <div className={styles.composition}>
        <div className={styles.boardTop}><Clapperboard size={22} aria-hidden="true" /><span>The creative playground</span><span>0{scene + 1} / 03</span></div>
        <div className={styles.storyFrame} data-tone={active.tone} aria-live="polite" aria-atomic="true">
          <span className={styles.kicker}>{active.label}</span>
          <p key={scene} className={styles.canvasHeadline}>{active.headline}</p>
          <span className={styles.frameCross} aria-hidden="true">+</span>
          <ArrowUpRight size={46} strokeWidth={1.2} aria-hidden="true" />
        </div>
        <div className={styles.audio}><AudioLines size={26} aria-hidden="true" /><span>{active.note}</span></div>
        <div className={styles.canvasControls} role="group" aria-label="Explore the creative process">{scenes.map((item, i) => <button key={item.name} type="button" aria-pressed={i === scene} onClick={() => setScene(i)}><span>0{i + 1}</span>{item.name}{i === scene && <Play size={11} fill="currentColor" aria-hidden="true" />}</button>)}</div>
        <p className={styles.boardCaption}>Interactive studio sketch / Choose a stage to explore</p>
      </div>
      <div className={styles.canvasSticker}><Sparkles size={17} aria-hidden="true" />{active.tag}</div>
    </div>
  );
}
