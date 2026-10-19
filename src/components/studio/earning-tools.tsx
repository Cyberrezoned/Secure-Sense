'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Download } from 'lucide-react';
import { earningPaths, channelSprints, studioContactHref } from '@/lib/studio-growth';
import styles from '@/app/(site)/studio/studio.module.css';

export function EarningExplorer() {
  const [selected, setSelected] = useState(0);
  const path = earningPaths[selected];
  return (
    <div className={styles.earnExplorer}>
      <div className={styles.earnChoices} role="group" aria-label="Explore ways to earn online">{earningPaths.map((item, i) => <button key={item.id} type="button" aria-pressed={i === selected} aria-controls="earning-path-detail" onClick={() => setSelected(i)}><span className={styles.kicker}>0{i + 1} / {item.category}</span><strong>{item.name}</strong><ArrowUpRight size={20} aria-hidden="true" /></button>)}</div>
      <div id="earning-path-detail" className={styles.earnDetail} aria-live="polite" aria-atomic="true">
        <div className={styles.earnHeadline}><p className={styles.kicker}>{path.category}</p><h3>{path.promise}</h3></div>
        <div className={styles.earnFacts}><div><h4>Who pays?</h4><p>{path.buyer}</p></div><div><h4>What could you offer?</h4><p>{path.offer}</p></div><div><h4>What do you need first?</h4><p>{path.needs}</p></div></div>
        <div className={styles.earnSteps}><div><p className={styles.kicker}>Your first practical moves</p><ol>{path.steps.map((step, i) => <li key={step}><span>0{i + 1}</span>{step}</li>)}</ol></div><aside><h4>How your channel supports this</h4><p>{path.channel}</p><h4>Keep this in mind</h4><p>{path.watch}</p><h4>Explore it with the Studio</h4><p>{path.help}</p><Link href={studioContactHref(path.id)} className={styles.primaryLink}>Help me explore this path <ArrowUpRight size={17} aria-hidden="true" /></Link></aside></div>
      </div>
      <p className={styles.smallNote}>These are earning models to learn and test, not job offers or guaranteed income. Your skills, demand, costs, agreements, and platform rules affect results.</p>
      <div className={styles.sourceLinks}><span>Platform references</span><a href="https://support.google.com/youtube/answer/94522?hl=en" target="_blank" rel="noopener noreferrer">YouTube earning features ↗</a><a href="https://support.google.com/youtube/answer/72851?hl=en" target="_blank" rel="noopener noreferrer">Eligibility and application ↗</a><a href="https://support.google.com/youtube/answer/1311392?hl=en" target="_blank" rel="noopener noreferrer">Originality and monetization policies ↗</a><a href="https://support.google.com/youtube/answer/154235?hl=en" target="_blank" rel="noopener noreferrer">Paid promotion disclosures ↗</a></div>
    </div>
  );
}

export function ChannelLaunchPlan() {
  const [phase, setPhase] = useState(0);
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('');
  const [hours, setHours] = useState('5');
  const [pathId, setPathId] = useState<string>(earningPaths[0].id);
  const [completed, setCompleted] = useState<string[]>([]);
  const [notice, setNotice] = useState('');
  const sprint = channelSprints[phase];
  const path = earningPaths.find(item => item.id === pathId)!;
  const canDownload = topic.trim().length > 0 && audience.trim().length > 0;
  function download() {
    const text = `# My creator channel plan\n\nSule Zeen Creative Studio\n\nTopic: ${topic.trim()}\nAudience: ${audience.trim()}\nWeekly time budget: ${hours} hours\nEarning path to explore: ${path.name}\n\nChannel promise: I help ${audience.trim()} understand or achieve [specific outcome] through original content about ${topic.trim()}.\n\nThis is a suggested 12-week learning sequence. Adjust the pace to your circumstances. It is not an enrollment, eligibility determination, or promise of earnings. Progress checks below reflect this browser session.\n\n${channelSprints.map((item, i) => `## ${item.weeks}: ${item.title}\n\n${item.objective}\n\n${item.tasks.map((task, j) => `- [${completed.includes(`${i}-${j}`) ? 'x' : ' '}] ${task}`).join('\n')}\n\nDeliverable: ${item.deliverable}\nReview: ${item.review}`).join('\n\n')}\n\n## My earning-path experiment\n\nWho pays: ${path.buyer}\nOffer to explore: ${path.offer}\n${path.steps.map((step, i) => `${i + 1}. ${step}`).join('\n')}\n\n## Official YouTube references\n\nEligibility: https://support.google.com/youtube/answer/72851?hl=en\nEarning features: https://support.google.com/youtube/answer/94522?hl=en\nMonetization policies: https://support.google.com/youtube/answer/1311392?hl=en\n\n## Discuss this with the Studio\n\nBring this plan, a content sample if you have one, and the part you want help with.\nContact: zenethecyber@icloud.com\n\nIncome depends on skills, demand, costs, delivery, and applicable platform and payment requirements.\n`;
    const url = URL.createObjectURL(new Blob([text], { type: 'text/markdown;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = 'sule-zeen-my-channel-plan.md'; document.body.appendChild(link); link.click(); link.remove(); window.setTimeout(() => URL.revokeObjectURL(url), 1000); setNotice('Your channel plan has been downloaded. Bring it to your Studio enquiry.');
  }
  return (
    <div className={styles.launchPlan}>
      <div className={styles.launchBrief}><p className={styles.kicker}>Make the plan yours</p><div className={styles.launchInputs}><div><label htmlFor="channel-topic" className={styles.fieldLabel}>What will your channel be about?</label><input id="channel-topic" value={topic} maxLength={160} placeholder="For example: practical design skills" onChange={event => {setTopic(event.target.value); setNotice('');}} /></div><div><label htmlFor="channel-audience" className={styles.fieldLabel}>Who will it help?</label><input id="channel-audience" value={audience} maxLength={160} placeholder="For example: students starting to design" onChange={event => {setAudience(event.target.value); setNotice('');}} /></div><div><label htmlFor="channel-hours" className={styles.fieldLabel}>Hours you can give each week</label><select id="channel-hours" value={hours} onChange={event => setHours(event.target.value)}>{['2', '5', '10', '15'].map(value => <option key={value} value={value}>{value} hours</option>)}</select></div><div><label htmlFor="channel-income" className={styles.fieldLabel}>Income path to explore</label><select id="channel-income" value={pathId} onChange={event => setPathId(event.target.value)}>{earningPaths.map(item => <option value={item.id} key={item.id}>{item.name}</option>)}</select></div></div><p className={styles.smallNote}>A suggested 12-week sequence, at your own pace. With {hours} hours a week, protect time for research, production, and review; stretch a sprint when the work needs longer.</p></div>
      <div className={styles.sprintButtons} role="group" aria-label="Channel-building stages">{channelSprints.map((item, i) => <button key={item.weeks} aria-pressed={phase === i} aria-controls="channel-sprint" type="button" onClick={() => setPhase(i)}><span>{item.weeks}</span><strong>{['Position', 'Produce', 'Publish', 'Offer', 'Test', 'Refine'][i]}</strong></button>)}</div>
      <div id="channel-sprint" className={styles.sprintBody}>
        <div><p className={styles.kicker}>{sprint.weeks} / {phase + 1} of {channelSprints.length}</p><h3>{sprint.title}</h3><p>{sprint.objective}</p><p className={styles.smallNote}>Mark tasks as you complete them. Progress stays in this page session; download your plan to keep a copy.</p></div>
        <div><fieldset className={styles.sprintTasks}><legend className="sr-only">Tasks for {sprint.weeks}</legend>{sprint.tasks.map((task, i) => { const id = `${phase}-${i}`; return <label key={id}><input type="checkbox" checked={completed.includes(id)} onChange={event => setCompleted(previous => event.target.checked ? [...previous, id] : previous.filter(value => value !== id))} /><span>{task}</span></label>; })}</fieldset><div className={styles.sprintDeliverable}><span className={styles.kicker}>What you leave with</span><p>{sprint.deliverable}</p><span className={styles.kicker}>Before moving on</span><p>{sprint.review}</p></div></div>
      </div>
      <div className={styles.planFooter}><p><strong>{completed.length} / 18</strong> tasks marked complete</p><div><button type="button" className={styles.downloadPlan} disabled={!canDownload} onClick={download}><Download size={16} aria-hidden="true" />Download my channel plan</button><Link href={studioContactHref(pathId)} className={styles.textCta}>Build this with the Studio <ArrowRight size={17} aria-hidden="true" /></Link></div></div>
      {!canDownload && <p className={styles.smallNote}>Add your channel topic and audience to download your personalised plan.</p>}<p role="status" className={styles.smallNote}>{notice}</p>
    </div>
  );
}

export function OfferWorksheet() {
  const [price, setPrice] = useState('');
  const [cost, setCost] = useState('');
  const [quantity, setQuantity] = useState('');
  const [currency, setCurrency] = useState('NGN');
  const numbers = [price, cost, quantity].map(Number);
  const valid = [price, cost, quantity].every(value => value.trim() !== '') && numbers.every(value => Number.isFinite(value) && value >= 0) && Number.isInteger(numbers[2]) && numbers[2] <= 10000 && numbers[0] <= 100000000 && numbers[1] <= 100000000;
  const revenue = numbers[0] * numbers[2];
  const totalCost = numbers[1] * numbers[2];
  const contribution = revenue - totalCost;
  const money = (value: number) => new Intl.NumberFormat('en-NG', { style: 'currency', currency, maximumFractionDigits: 2 }).format(value);
  return (
    <div className={styles.offerWorksheet}>
      <div><p className={styles.kicker}>Price an offer before pitching it</p><h3>What would the work need to earn?</h3><p className={styles.worksheetIntro}>Use your own assumptions for a service package or digital product. See the difference between sales and the amount left after direct delivery costs.</p><div className={styles.launchInputs}><div><label htmlFor="offer-currency" className={styles.fieldLabel}>Currency</label><select id="offer-currency" value={currency} onChange={event => setCurrency(event.target.value)}><option value="NGN">NGN</option><option value="USD">USD</option><option value="GBP">GBP</option></select></div><div><label htmlFor="offer-price" className={styles.fieldLabel}>Price per sale or package</label><input id="offer-price" inputMode="decimal" type="number" min="0" max="100000000" step="0.01" value={price} placeholder="Enter your own price" onChange={event => setPrice(event.target.value)} /></div><div><label htmlFor="offer-cost" className={styles.fieldLabel}>Direct cost per sale or package</label><input id="offer-cost" inputMode="decimal" type="number" min="0" max="100000000" step="0.01" value={cost} placeholder="Include delivery costs" onChange={event => setCost(event.target.value)} /></div><div><label htmlFor="offer-quantity" className={styles.fieldLabel}>Number of sales to model</label><input id="offer-quantity" inputMode="numeric" type="number" min="0" max="10000" step="1" value={quantity} placeholder="An assumption, not a forecast" onChange={event => setQuantity(event.target.value)} /></div></div></div>
      <div className={styles.worksheetResult} aria-live="polite" aria-atomic="true"><p className={styles.kicker}>Your scenario / {currency}</p><dl><div><dt>Gross sales</dt><dd>{valid ? money(revenue) : '—'}</dd></div><div><dt>Direct delivery costs</dt><dd>{valid ? money(totalCost) : '—'}</dd></div><div><dt>Remaining before overheads and tax</dt><dd>{valid ? money(contribution) : '—'}</dd></div></dl><p className={styles.smallNote}>{valid ? contribution < 0 ? 'Your direct delivery costs exceed sales in this scenario. Revisit the scope, costs, or price.' : 'Now account for your time, tools, marketing, payment fees, refunds, overheads, and tax before deciding whether the offer is sustainable.' : 'Enter non-negative prices and a whole number of sales (up to 10,000). Prices are limited to 100,000,000 per unit.'}</p><p className={styles.smallNote}>Illustrative arithmetic using your inputs, not an earnings forecast or a suggested price. Currency selection changes the display; no conversion is performed.</p><Link href={studioContactHref('creator-services')} className={styles.primaryLink}>Help me shape my first offer <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
    </div>
  );
}
