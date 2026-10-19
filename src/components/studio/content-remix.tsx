'use client';

import { useState } from 'react';
import { ArrowUpRight, Play, ArrowRight, Bookmark } from 'lucide-react';
import styles from '@/app/(site)/studio/studio.module.css';

const formats = [
  { name: 'YouTube', format: 'A practical video', title: 'Could you spot a fake brand deal?', hook: 'Open with a fictional partnership email. Pause before opening its attachment.', structure: 'Set up the scenario → examine the sender and request → explain the warning signs → recap the checks.', task: 'Write an opening, plan the screen demonstration, and design a thumbnail that asks a clear question.', check: 'Use fictional contact details and a safe mock-up rather than a live suspicious file.' },
  { name: 'Reels & TikTok', format: 'A short vertical story', title: 'A brand deal lands in your inbox. What next?', hook: 'Show the message first. Ask the viewer what they would check before replying.', structure: 'Hook → one visible warning sign → one practical check → invite the viewer to save the lesson.', task: 'Storyboard a short clip with readable captions, a close-up of the example, and a clear final action.', check: 'Keep enough context to explain the risk. Shorter content still needs accurate claims.' },
  { name: 'Instagram & LinkedIn', format: 'A swipeable explainer', title: 'Before you say yes to that collaboration…', hook: 'Lead with a question your audience has faced, then walk through the decision.', structure: 'Cover question → sender check → request check → independent verification → recap.', task: 'Draft five panels with one point per panel and a caption that adds context.', check: 'Use legible type and descriptive alt text. Avoid exposing someone’s real inbox.' },
  { name: 'Website & blog', format: 'A reference people can return to', title: 'A creator’s guide to checking partnership requests', hook: 'Start with the moment a creator receives an unfamiliar offer and needs a next step.', structure: 'Situation → annotated example → practical checklist → what to do if you already responded.', task: 'Outline a useful article, include an accessible example, and identify sources to review before publication.', check: 'Verify linked sources and date the guidance so readers can judge its context.' },
] as const;

export function ContentRemix() {
  const [selected, setSelected] = useState(0);
  const active = formats[selected];
  return (
    <div className={styles.remix}>
      <div className={styles.brief}><span className={styles.kicker}>Example brief / Cyber awareness</span><p>Help a new creator recognise a suspicious brand collaboration.</p><span className={styles.note}>Illustrative content plan</span></div>
      <div className={styles.formatButtons} role="group" aria-label="Choose a content format">{formats.map((format, index) => <button key={format.name} type="button" aria-pressed={selected === index} aria-controls="remix-output" onClick={() => setSelected(index)}>{format.name}<ArrowUpRight size={15} aria-hidden="true" /></button>)}</div>
      <div id="remix-output" className={styles.remixOutput} aria-live="polite" aria-atomic="true">
        <div className={styles.mockupColumn}>
          <div key={selected} className={styles.contentMockup} data-format={selected} aria-label={`Illustrative ${active.name} content design`}>
            <div className={styles.mockupTop}><span>STUDIO / AWARENESS</span><span>↗</span></div>
            {selected === 0 && <><span className={styles.mockupSticker}>Too good to be true?</span><p>A brand deal.<br /><em>Or a trap?</em></p><div className={styles.mockupBottom}><Play size={28} fill="currentColor" aria-hidden="true" /><span>The creator’s inbox / Video concept</span></div></>}
            {selected === 1 && <><span className={styles.mockupSticker}>Pause before you reply</span><p>POV: your<br />first <em>brand<br />deal</em> arrives.</p><div className={styles.mockupBottom}><AudioLinesIcon /><span>Check the sender.<br />Then check the request.</span></div></>}
            {selected === 2 && <><span className={styles.mockupSticker}>Save this checklist</span><p>Before<br />you say<br /><em>yes.</em></p><div className={styles.mockupBottom}><span>01 / 05 — Swipe to investigate</span><ArrowRight size={25} aria-hidden="true" /></div></>}
            {selected === 3 && <><div className={styles.articleRule} /><span className={styles.kicker}>The creator’s field notes</span><p>The offer<br />in your<br /><em>inbox.</em></p><div className={styles.mockupBottom}><span>A guide to checking<br />partnership requests</span><Bookmark size={23} aria-hidden="true" /></div></>}
          </div>
          <p className={styles.mockupCaption}>Design study / {active.format}</p>
        </div>
        <div key={`copy-${selected}`} className={styles.remixDetails}><p className={styles.kicker}>{active.format}</p><h3>{active.title}</h3><p className={styles.remixHook}>{active.hook}</p><dl><div><dt>Shape the story</dt><dd>{active.structure}</dd></div><div><dt>Make it practical</dt><dd>{active.task}</dd></div><div><dt>Before publishing</dt><dd>{active.check}</dd></div></dl></div>
      </div>
    </div>
  );
}

function AudioLinesIcon() {
  return <span className={styles.waveform} aria-hidden="true">▂ ▆ ▃ █ ▅ ▂ ▇ ▃</span>;
}
