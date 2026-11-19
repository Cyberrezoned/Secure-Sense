import { ArrowUpRight, AudioLines, Layers3, Radar } from 'lucide-react';
import { getHeadlines, type NewsStory as Story } from '@/lib/news';
import styles from './niche-news.module.css';

const editions = {
  cyber: { title: 'Cybersecurity news', summary: 'Security advisories and news from cyber defence organisations.', icon: Radar },
  supply: { title: 'Supply chain news', summary: 'Food markets in Africa and developments in global logistics.', icon: Layers3 },
  studio: { title: 'Creator news', summary: 'Platform announcements, publishing tools, and ideas for growing a channel.', icon: AudioLines },
};

type Topic = keyof typeof editions;

const dateFormat = new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeZone: 'UTC' });

function Byline({ story }: { story: Story }) {
  return <p className={styles.byline}>{story.publisher} <span aria-hidden="true">/</span> <time dateTime={story.date}>{dateFormat.format(new Date(story.date))}</time></p>;
}

export async function NicheNews({ topic }: { topic: Topic }) {
  const { title, summary, icon: Icon } = editions[topic];
  const stories = await getHeadlines(topic);
  // Lead with the newest story from each publisher so a high-volume feed does not crowd out the other.
  const publishers = new Set<string>();
  const leads = stories.filter(story => {
    if (publishers.has(story.publisher)) return false;
    publishers.add(story.publisher);
    return true;
  });
  const more = stories.filter(story => !leads.includes(story));

  return (
    <section id="news" aria-labelledby="news-title" data-edition={topic} className={`shell editorial-section scroll-mt-24 ${styles.edition}`}>
      <header className={styles.heading}>
        <h2 id="news-title">{title}</h2><p>{summary}</p>
      </header>
      <div className={styles.grid}>
        {leads.map(story => (
          <article key={story.url}>
            <a className={styles.story} href={story.url}>
              <div className={styles.cover} aria-hidden="true">
                {story.image ? <img src={story.image} alt="" loading="lazy" referrerPolicy="no-referrer" /> : <Icon size={76} strokeWidth={1.15} />}
              </div>
              <Byline story={story} />
              <h3>{story.title} <ArrowUpRight size={17} aria-hidden="true" /></h3>
            </a>
            {story.excerpt && <p className={styles.excerpt}>{story.excerpt}</p>}
          </article>
        ))}
      </div>
      {more.length > 0 && <details className={styles.archive}>
        <summary>More headlines ({more.length})</summary>
        <ul>{more.map(story => <li key={story.url}><Byline story={story} /><a href={story.url}>{story.title} <ArrowUpRight size={15} aria-hidden="true" /></a></li>)}</ul>
      </details>}
      {!stories.length && <p>Publisher headlines are currently unavailable.</p>}
    </section>
  );
}
