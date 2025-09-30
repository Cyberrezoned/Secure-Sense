// Summarize security articles to quickly understand their content.

'use server';

/**
 * @fileOverview Summarizes security articles using AI.
 *
 * - summarizeSecurityArticle - A function that summarizes a security article.
 * - SummarizeSecurityArticleInput - The input type for the summarizeSecurityArticle function.
 * - SummarizeSecurityArticleOutput - The return type for the summarizeSecurityArticle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeSecurityArticleInputSchema = z.object({
  articleContent: z
    .string()
    .describe('The content of the security article to summarize.'),
});
export type SummarizeSecurityArticleInput = z.infer<
  typeof SummarizeSecurityArticleInputSchema
>;

const SummarizeSecurityArticleOutputSchema = z.object({
  summary: z.string().describe('The summarized content of the article.'),
});
export type SummarizeSecurityArticleOutput = z.infer<
  typeof SummarizeSecurityArticleOutputSchema
>;

export async function summarizeSecurityArticle(
  input: SummarizeSecurityArticleInput
): Promise<SummarizeSecurityArticleOutput> {
  return summarizeSecurityArticleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeSecurityArticlePrompt',
  input: {schema: SummarizeSecurityArticleInputSchema},
  output: {schema: SummarizeSecurityArticleOutputSchema},
  prompt: `Summarize the following security article.  The summary should be concise but informative.

Article Content:
{{articleContent}}`,
});

const summarizeSecurityArticleFlow = ai.defineFlow(
  {
    name: 'summarizeSecurityArticleFlow',
    inputSchema: SummarizeSecurityArticleInputSchema,
    outputSchema: SummarizeSecurityArticleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
