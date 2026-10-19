import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { studio } from '@/lib/company';
import { pageMetadata } from '@/lib/page-metadata';
import { CreativeCanvas } from '@/components/studio/creative-canvas';
import { LearningPath } from '@/components/studio/learning-path';
import { ContentPlanner } from '@/components/studio/content-planner';
import { ContentRemix } from '@/components/studio/content-remix';
import styles from './studio.module.css';

export const metadata = pageMetadata('Creative Studio — Content, AI & Digital Awareness', studio.description, '/studio');

export default function StudioPage() {
  return (
    <div className={styles.studio}>
      <section className="shell pb-14 pt-8 sm:pb-20 sm:pt-12">
        <div className={styles.masthead}><p>Sule Zeen <strong>Creative Studio</strong></p><span>Ideas / Skills / Digital culture</span></div>
        <nav className={styles.studioNav} aria-label="Studio sections"><a href="#learn">Learning areas</a><a href="#pathfinder">Find your path</a><a href="#remix">Remix desk</a><a href="#planner">Content planner</a></nav>
        <div className={styles.hero}>
          <div><p className={styles.kicker}>For people building a life online</p><h1 className={styles.title}>Learn to create.<br />Learn to be<br /><em>online.</em><span className={styles.asterisk} aria-hidden="true">✳</span></h1><p className={styles.intro}>Make content with purpose. Manage your platforms. Use AI thoughtfully. Understand the digital world you work in.</p><a href="#pathfinder" className={styles.primaryLink}>Find your starting point <ArrowDown size={17} aria-hidden="true" /></a></div>
          <CreativeCanvas />
        </div>
        <div className={styles.subjectStrip}><span>Content creation</span><span>Social media</span><span>AI literacy</span><span>Monetization</span><span>Cyber awareness</span></div>
      </section>
      <section id="learn" className={`${styles.learning} scroll-mt-24`}><div className="shell editorial-section">
        <div className={styles.sectionHeading}><p className={styles.kicker}>01 / What we teach</p><div><h2>Find your voice.<br />Build the skills behind it.</h2><p>{studio.audience}</p></div></div>
        <div className={styles.learningList}>{studio.series.map((item, i) => <article key={item.title} className={styles.learningRow}><span className={styles.number}>0{i + 1}</span><div><h3>{item.title}</h3><p className={styles.prompt}>{item.example}</p></div><div><p>{item.description}</p><p className={styles.output}><span>Practice project</span>{item.output}</p></div></article>)}</div>
        <p className={styles.note}>Learning areas and example projects. Contact the Studio for current program formats and availability. Monetization outcomes depend on your work, audience, and applicable platform requirements.</p>
      </div></section>
      <section id="pathfinder" className="shell editorial-section scroll-mt-24"><div className={styles.sectionHeading}><p className={styles.kicker}>02 / Your next move</p><div><h2>A starting point<br />that fits you.</h2><p>Pick a goal and tell us where you are starting. Leave with a small, practical project you can work on next.</p></div></div><LearningPath /></section>
      <section id="remix" className="shell editorial-section scroll-mt-24"><div className={styles.sectionHeading}><p className={styles.kicker}>03 / The remix desk</p><div><h2>One idea.<br />A different story on every platform.</h2><p>Good adaptation starts with the audience and the format. Explore this sample creative brief to see how the same message changes.</p></div></div><ContentRemix /></section>
      <section id="planner" className={`${styles.learning} scroll-mt-24`}><div className="shell editorial-section"><div className={styles.sectionHeading}><p className={styles.kicker}>04 / Your production desk</p><div><h2>Less blank page.<br />More working plan.</h2><p>Make a brief, map three publishing moments, and take a reusable AI prompt with you. Edit the fields to make the plan your own.</p></div></div><ContentPlanner /></div></section>
      <section className={styles.awareness}><div className="shell editorial-section"><p className={styles.kicker}>05 / Awareness is a creative skill</p><div className={styles.awarenessGrid}><h2>Be seen.<br />Stay informed.<br /><em>Stay in control.</em></h2><div><p className={styles.awarenessIntro}>We also create content that helps people understand cybersecurity, recognise information cues, and make better decisions about AI.</p><ul><li><strong>Cybersecurity education</strong><span>Explain account security, phishing, privacy, and everyday online risks in language people can use.</span></li><li><strong>AI awareness</strong><span>Explore generated media, unreliable outputs, responsible use, and the checks a creator needs before publishing.</span></li><li><strong>Programs and campaigns</strong><span>Bring these topics into explainers, demonstrations, community learning, and awareness content.</span></li></ul><Link href="/cybersecurity" className={styles.lightLink}>Explore our cybersecurity practice <ArrowUpRight size={17} aria-hidden="true" /></Link></div></div></div></section>
      <section className="shell editorial-section"><div className={styles.sectionHeading}><p className={styles.kicker}>06 / Work with the Studio</p><div><h2>Something to learn?<br />Something to make?</h2><p>Come with a content idea, a skill you want to build, or an audience you want to reach. We can discuss a learning program, content production, social media management, or an awareness campaign.</p><div className={styles.formats}>{studio.formats.map(format => <span key={format}>{format}</span>)}</div><Link href="/contact#engagement-form" className={styles.primaryLink}>Talk to the Studio <ArrowUpRight size={17} aria-hidden="true" /></Link></div></div></section>
    </div>
  );
}
