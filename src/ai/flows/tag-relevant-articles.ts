'use server';

/**
 * @fileOverview AI flow to tag and categorize security articles based on their content.
 *
 * - tagRelevantArticles - Function to tag and categorize articles.
 * - TagRelevantArticlesInput - Input type for the function.
 * - TagRelevantArticlesOutput - Output type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TagRelevantArticlesInputSchema = z.object({
  articleText: z
    .string()
    .describe('The content of the security article to be tagged.'),
});

export type TagRelevantArticlesInput = z.infer<typeof TagRelevantArticlesInputSchema>;

const TagRelevantArticlesOutputSchema = z.object({
  tags: z
    .array(z.string())
    .describe('An array of relevant tags for the article.'),
  categories: z
    .array(z.string())
    .describe('An array of categories the article belongs to.'),
  summary: z.string().describe('A brief summary of the article.'),
});

export type TagRelevantArticlesOutput = z.infer<typeof TagRelevantArticlesOutputSchema>;

export async function tagRelevantArticles(
  input: TagRelevantArticlesInput
): Promise<TagRelevantArticlesOutput> {
  return tagRelevantArticlesFlow(input);
}

const tagRelevantArticlesPrompt = ai.definePrompt({
  name: 'tagRelevantArticlesPrompt',
  input: {schema: TagRelevantArticlesInputSchema},
  output: {schema: TagRelevantArticlesOutputSchema},
  prompt: `You are an expert in cybersecurity content analysis.

  Analyze the following security article and provide relevant tags, categories, and a brief summary.

  Article Content: {{{articleText}}}

  Tags (as an array of strings):
  Categories (as an array of strings):
  Summary:`,
});

const tagRelevantArticlesFlow = ai.defineFlow(
  {
    name: 'tagRelevantArticlesFlow',
    inputSchema: TagRelevantArticlesInputSchema,
    outputSchema: TagRelevantArticlesOutputSchema,
  },
  async input => {
    const {output} = await tagRelevantArticlesPrompt(input);
    return output!;
  }
);
