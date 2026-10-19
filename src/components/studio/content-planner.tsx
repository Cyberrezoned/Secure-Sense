'use client';

import { useEffect, useState } from 'react';
import { Check, Copy, Download, RotateCcw, Save } from 'lucide-react';
import styles from '@/app/(site)/studio/studio.module.css';

const STORAGE_KEY = 'sule-zeen-studio-brief-v1';
const initialBrief = { topic: 'Spotting a fake brand collaboration', audience: 'New content creators', goal: 'Teach something useful', voice: 'Clear and friendly', platform: 'YouTube', action: 'Save the checklist before your next collaboration.' };
type Brief = typeof initialBrief;
const platformOptions = ['YouTube', 'Instagram', 'TikTok', 'LinkedIn', 'Website & blog'];
const slots = ['Monday', 'Wednesday', 'Friday'];

function readBrief(value: unknown): value is Brief {
  if (!value || typeof value !== 'object') return false;
  const data = value as Record<string, unknown>;
  return Object.keys(initialBrief).every(key => typeof data[key] === 'string' && (data[key] as string).length <= 300) && platformOptions.includes(data.platform as string);
}

export function ContentPlanner() {
  const [brief, setBrief] = useState<Brief>(initialBrief);
  const [reviewed, setReviewed] = useState<string[]>([]);
  const [notice, setNotice] = useState('');
  const [hasSaved, setHasSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  useEffect(() => { try { setHasSaved(!!localStorage.getItem(STORAGE_KEY)); } catch { /* Saving remains an explicit optional action. */ } }, []);
  const complete = brief.topic.trim().length > 0 && brief.audience.trim().length > 0 && brief.action.trim().length > 0;
  const topic = brief.topic.trim() || '[your topic]';
  const audience = brief.audience.trim() || '[your audience]';
  const action = brief.action.trim() || '[your next step]';
  const mainFormat = brief.platform === 'YouTube' ? 'Video outline' : brief.platform === 'Website & blog' ? 'Article outline' : brief.platform === 'TikTok' ? 'Vertical video storyboard' : 'Explainer post';
  const plan = [
    { day: slots[0], label: 'Open the conversation', format: mainFormat, task: `Topic: ${topic}. Open with a question for your audience (${audience}). Use one concrete example.`, next: 'Ask the audience which part is hardest.' },
    { day: slots[1], label: 'Make it practical', format: brief.platform === 'Website & blog' ? 'Companion checklist' : 'Short demonstration or carousel', task: `Turn your example into three steps. Keep each step focused on your topic: ${topic}. Give it a clear visual or explanation.`, next: action },
    { day: slots[2], label: 'Listen and follow up', format: 'Follow-up post', task: 'Review questions from the first two posts. Answer one recurring question, or use a clearly labelled example if no responses are available.', next: 'Invite one specific question for the next post.' },
  ];
  const prompt = `Help me draft content for ${brief.platform}.\nFormat: ${mainFormat}\nTopic: ${topic}\nAudience: ${audience}\nGoal: ${brief.goal}\nVoice: ${brief.voice}\nEnd with: ${action}\n\nStart with an audience question, explain one concrete example, and end with a practical takeaway. Suggest visual cues and accessible captions. Use [source needed] for claims that require verification. Do not invent facts, results, testimonials, or sources. Ask for missing context before making assumptions.\n\nSource material I will provide:\n[paste approved notes and references here]\n\nI will review the draft for accuracy, originality, permissions, and privacy before publishing.`;
  const checks = ['Facts and sources checked', 'Permissions and privacy reviewed', 'Captions and accessibility checked', 'Final draft approved'];
  function update(key: keyof Brief, value: string) { setBrief(previous => ({ ...previous, [key]: value })); setReviewed([]); setCopied(false); setNotice(''); }
  function save() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(brief)); setHasSaved(true); setNotice('Draft saved in this browser.'); } catch { setNotice('This browser could not save the draft. Download your plan to keep a copy.'); } }
  function load() { try { const data: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); if (!readBrief(data)) { setNotice('The saved draft could not be read. Your current brief is still here.'); return; } setBrief(data); setReviewed([]); setCopied(false); setNotice('Saved draft loaded.'); } catch { setNotice('The saved draft could not be loaded. Your current brief is still here.'); } }
  function reset() { setBrief(initialBrief); setReviewed([]); setCopied(false); setNotice('Example brief restored. Your saved draft is unchanged.'); }
  async function copyPrompt() { try { await navigator.clipboard.writeText(prompt); setCopied(true); setNotice('AI prompt copied. Add your source material before using it.'); } catch { setNotice('Copy is unavailable. Select the prompt text below to copy it manually.'); } }
  function download() {
    const text = `# Sule Zeen Studio — Weekly content plan\n\nTopic: ${topic}\nAudience: ${audience}\nPlatform: ${brief.platform}\nGoal: ${brief.goal}\nVoice: ${brief.voice}\n\nSuggested sequence; publishing dates and times are not scheduled.\n\n${plan.map(item => `## ${item.day}: ${item.label}\n\nFormat: ${item.format}\n${item.task}\nNext step: ${item.next}`).join('\n\n')}\n\n## AI drafting prompt\n\n${prompt}\n\n## Pre-publication review\n\n${checks.map(item => `- [${reviewed.includes(item) ? 'x' : ' '}] ${item}`).join('\n')}\n\nThis plan is a starting point for human review. It does not publish content or guarantee audience or revenue outcomes.\n`;
    const url = URL.createObjectURL(new Blob([text], { type: 'text/markdown;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = 'sule-zeen-studio-content-plan.md'; document.body.appendChild(link); link.click(); link.remove(); window.setTimeout(() => URL.revokeObjectURL(url), 1000); setNotice('Your content plan has been downloaded.');
  }
  return (
    <div className={styles.planner}>
      <div className={styles.plannerBrief}>
        <div className={styles.toolHeading}><span className={styles.kicker}>The brief</span><span className={styles.toolBadge}>Make it yours ↗</span></div>
        <label className={styles.fieldLabel} htmlFor="studio-topic">What are you creating about?</label><input id="studio-topic" value={brief.topic} maxLength={160} onChange={event => update('topic', event.target.value)} />
        <label className={styles.fieldLabel} htmlFor="studio-audience">Who is it for?</label><input id="studio-audience" value={brief.audience} maxLength={160} onChange={event => update('audience', event.target.value)} />
        <div className={styles.fieldPair}><div><label className={styles.fieldLabel} htmlFor="studio-platform">Main platform</label><select id="studio-platform" value={brief.platform} onChange={event => update('platform', event.target.value)}>{platformOptions.map(item => <option key={item}>{item}</option>)}</select></div><div><label className={styles.fieldLabel} htmlFor="studio-goal">Content goal</label><select id="studio-goal" value={brief.goal} onChange={event => update('goal', event.target.value)}>{['Teach something useful', 'Start a conversation', 'Introduce my work'].map(item => <option key={item}>{item}</option>)}</select></div></div>
        <label className={styles.fieldLabel} htmlFor="studio-voice">Your voice</label><select id="studio-voice" value={brief.voice} onChange={event => update('voice', event.target.value)}>{['Clear and friendly', 'Direct and practical', 'Thoughtful and professional'].map(item => <option key={item}>{item}</option>)}</select>
        <label className={styles.fieldLabel} htmlFor="studio-action">What should someone do next?</label><textarea id="studio-action" rows={3} value={brief.action} maxLength={300} onChange={event => update('action', event.target.value)} />
        {!complete && <p className={styles.smallNote}>Add a topic, audience, and next step before copying or downloading.</p>}
        <div className={styles.toolActions}><button type="button" onClick={save} disabled={!complete}><Save size={15} aria-hidden="true" />Save draft</button>{hasSaved && <button type="button" onClick={load}>Load saved</button>}<button type="button" onClick={reset}><RotateCcw size={15} aria-hidden="true" />Use example</button></div>
        <p className={styles.smallNote}>Saving keeps this brief only in this browser. It is not submitted to the Studio.</p>
      </div>
      <div className={styles.plannerResult}>
        <div className={styles.toolHeading}><span className={styles.kicker}>Your working week</span><span className={styles.toolBadge}>3 publishing moments</span></div>
        <p className={styles.smallNote}>A suggested sequence to edit around your own schedule. Nothing is published automatically.</p>
        <ol className={styles.weekPlan}>{plan.map(item => <li key={item.day}><span>{item.day.slice(0, 3)}</span><div><p className={styles.kicker}>{item.format}</p><h3>{item.label}</h3><p>{item.task}</p><p className={styles.planAction}><strong>Next step:</strong> {item.next}</p></div></li>)}</ol>
        <details className={styles.promptDrawer}><summary>Your reusable AI drafting prompt</summary><p className={styles.smallNote}>Bring this prompt to your preferred AI tool and add approved source material. Review its output before publishing.</p><pre>{prompt}</pre><button type="button" onClick={copyPrompt} disabled={!complete}>{copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}{copied ? 'Prompt copied' : 'Copy prompt'}</button></details>
        <fieldset className={styles.reviewChecks}><legend>Before you publish <span>{reviewed.length} / {checks.length}</span></legend>{checks.map(item => <label key={item}><input type="checkbox" checked={reviewed.includes(item)} onChange={event => setReviewed(previous => event.target.checked ? [...previous, item] : previous.filter(check => check !== item))} />{item}</label>)}</fieldset>
        <button type="button" className={styles.downloadPlan} onClick={download} disabled={!complete}><Download size={17} aria-hidden="true" />Download plan (.md)</button>
      </div>
      <p className={styles.toolNotice} role="status">{notice}</p>
    </div>
  );
}
