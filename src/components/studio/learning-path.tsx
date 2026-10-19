'use client';

import { useState } from 'react';
import { ArrowDownRight, ArrowRight, Check } from 'lucide-react';
import styles from '@/app/(site)/studio/studio.module.css';

const paths = [
  { goal: 'Create better content', title: 'From idea to first publish', focus: 'Build a repeatable process before adding more platforms.', steps: ['Write a one-sentence audience promise.', 'Outline a useful story: question, example, takeaway.', 'Make one video and adapt it into one supporting post.'], project: 'A video outline, a short clip, and a caption.', next: 'Compare the two formats. Which one makes the message easier to understand?' },
  { goal: 'Manage social media', title: 'Build your publishing rhythm', focus: 'Connect the brief, the calendar, and the approval process.', steps: ['Choose three content themes tied to an audience need.', 'Assign an owner, review step, and publishing slot.', 'Create a response guide and a simple weekly review.'], project: 'A weekly calendar with responsibilities and approval notes.', next: 'Review questions and responses alongside reach. What should the next post answer?' },
  { goal: 'Use AI thoughtfully', title: 'Give AI a useful creative role', focus: 'Keep your judgement and voice in the process.', steps: ['Give the tool an audience, task, format, and source material.', 'Compare its draft with your brief and rewrite weak sections.', 'Check factual claims, permissions, and sensitive information.'], project: 'A reusable prompt and a human-reviewed draft.', next: 'Record what you changed and why. Reuse those observations in your next brief.' },
  { goal: 'Explore monetization', title: 'Shape an offer around your work', focus: 'Understand the audience problem before choosing a revenue model.', steps: ['Describe one audience need you can help solve.', 'Compare a service, a product, and a sponsorship offer.', 'Draft a clear offer, deliverables, and media-kit outline.'], project: 'A one-page offer with scope, audience, and proof of work.', next: 'Ask potential customers what is useful and what is missing. No revenue outcome is guaranteed.' },
  { goal: 'Teach digital awareness', title: 'Make a useful awareness lesson', focus: 'Help someone practise a decision they may face online.', steps: ['Choose an everyday situation: an account, message, or AI output.', 'Use a fictional example to explain the warning signs.', 'Finish with a safe next step and sources to verify.'], project: 'A short explainer and a practical checklist.', next: 'Ask a learner to apply the checklist to a different example.' },
] as const;

export function LearningPath() {
  const [goal, setGoal] = useState(0);
  const [experience, setExperience] = useState('Starting out');
  const active = paths[goal];
  return (
    <div className={styles.pathFinder}>
      <div className={styles.pathChoices}>
        <p className={styles.kicker}>Choose what you want to work on</p>
        <div role="group" aria-label="Your learning goal">{paths.map((path, index) => <button key={path.goal} type="button" aria-pressed={goal === index} onClick={() => setGoal(index)}><span>{path.goal}</span>{goal === index ? <Check size={17} aria-hidden="true" /> : <ArrowDownRight size={17} aria-hidden="true" />}</button>)}</div>
        <label className={styles.fieldLabel} htmlFor="studio-experience">Where are you starting?</label>
        <select id="studio-experience" value={experience} onChange={event => setExperience(event.target.value)}><option>Starting out</option><option>Already creating</option></select>
      </div>
      <div className={styles.pathResult} aria-live="polite" aria-atomic="true">
        <p className={styles.kicker}>Your suggested practice path / {experience}</p><h3>{active.title}</h3><p>{active.focus}</p>
        <ol>{active.steps.map((step, i) => <li key={step}><span>0{i + 1}</span>{step}</li>)}</ol>
        <div className={styles.pathProject}><span className={styles.kicker}>{experience === 'Starting out' ? 'Your first practice project' : 'Your next improvement'}</span><p>{experience === 'Starting out' ? active.project : active.next}</p></div>
        <a href="#planner" className={styles.primaryLink}>Put it into a plan <ArrowRight size={17} aria-hidden="true" /></a>
        <p className={styles.smallNote}>A self-guided starting point. This does not enroll you in a course.</p>
      </div>
    </div>
  );
}
