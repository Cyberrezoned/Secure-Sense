import { z } from 'zod';
import seed from '@/data/news/headlines.json';
import { fetchJson } from '@/lib/intel/fetch';

const secureUrl = z.string().url().startsWith('https://');
const story = z.object({
  title: z.string().min(1), url: secureUrl, date: z.string().datetime({ offset: true }),
  publisher: z.string().min(1), excerpt: z.string(), image: z.union([secureUrl, z.literal('')]),
});
const edition = z.array(story).min(1).max(8);
export type NewsTopic = keyof typeof seed;
export type NewsStory = z.infer<typeof story>;

const url = 'https://raw.githubusercontent.com/Cyberrezoned/Secure-Sense/news-feed/headlines.json';

export async function getHeadlines(topic: NewsTopic): Promise<NewsStory[]> {
  const result = await fetchJson<Partial<Record<NewsTopic, unknown>>>(url, {
    name: 'Publisher headline index', url, attribution: 'Original publishers',
  }, { revalidate: 900, timeoutMs: 3500 });
  const parsed = edition.safeParse(result.ok ? result.data?.[topic] : undefined);
  return parsed.success ? parsed.data : seed[topic];
}
