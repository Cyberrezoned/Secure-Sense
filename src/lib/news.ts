import { z } from 'zod';
import seed from '@/data/news/headlines.json';
import { SITE_URL } from '@/lib/site';
import { fetchJson } from '@/lib/intel/fetch';

const secureUrl = z.string().url().startsWith('https://');
const story = z.object({
  title: z.string().min(1), url: secureUrl, date: z.string().datetime({ offset: true }),
  publisher: z.string().min(1), excerpt: z.string(), image: z.union([secureUrl, z.literal('')]),
});
const edition = z.array(story).min(1).max(4);
export type NewsTopic = keyof typeof seed;
export type NewsStory = z.infer<typeof story>;

export async function getHeadlines(topic: NewsTopic): Promise<NewsStory[]> {
  const publishers = [...new Set(seed[topic].map(item => item.publisher))];
  const editions = await Promise.all(publishers.map(async publisher => {
    const url = new URL('/api/publisher-news', SITE_URL);
    url.searchParams.set('publisher', publisher);
    const result = await fetchJson<unknown>(url.href, {
      name: publisher, url: url.href, attribution: publisher,
    }, { revalidate: 3600, timeoutMs: 9000 });
    const parsed = edition.safeParse(result.ok ? result.data : null);
    return parsed.success ? parsed.data : seed[topic].filter(item => item.publisher === publisher);
  }));
  return editions.flat().sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}
