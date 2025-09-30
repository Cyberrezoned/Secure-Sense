import { config } from 'dotenv';
config();

import '@/ai/flows/content-moderation.ts';
import '@/ai/flows/tag-relevant-articles.ts';
import '@/ai/flows/summarize-security-articles.ts';