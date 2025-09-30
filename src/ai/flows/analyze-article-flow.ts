'use server';
/**
 * @fileOverview A comprehensive AI agent for analyzing user-generated articles.
 * This flow performs content moderation, summarization, and tagging in a single call.
 *
 * - analyzeArticle - A function that handles the entire article analysis process.
 * - AnalyzeArticleInput - The input type for the analyzeArticle function.
 * - AnalyzeArticleOutput - The return type for the analyzeArticle function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AnalyzeArticleInputSchema = z.object({
  content: z.string().describe('The content to be analyzed.'),
  contentType: z
    .enum(['blog', 'comment'])
    .describe('The type of the content being analyzed.'),
});
export type AnalyzeArticleInput = z.infer<typeof AnalyzeArticleInputSchema>;

const AnalyzeArticleOutputSchema = z.object({
  isSafe: z.boolean().describe('Whether the content is safe or not.'),
  reason: z
    .string()
    .describe(
      'The reason for the moderation decision. Required if isSafe is false.'
    ),
  summary: z.string().describe('A brief summary of the article.'),
  tags: z
    .array(z.string())
    .describe('An array of relevant tags for the article.'),
  categories: z
    .array(z.string())
    .describe('An array of categories the article belongs to.'),
});
export type AnalyzeArticleOutput = z.infer<typeof AnalyzeArticleOutputSchema>;

export async function analyzeArticle(
  input: AnalyzeArticleInput
): Promise<AnalyzeArticleOutput> {
  return analyzeArticleFlow(input);
}

const analyzeArticlePrompt = ai.definePrompt({
  name: 'analyzeArticlePrompt',
  input: { schema: AnalyzeArticleInputSchema },
  output: { schema: AnalyzeArticleOutputSchema },
  prompt: `You are an expert cybersecurity content analysis engine for a community learning hub. Your task is to perform three actions on the provided text:
1.  **Moderate**: Determine if the content is safe and appropriate. Check for hate speech, harassment, explicit material, promotion of illegal acts, spam, or cybersecurity misinformation.
2.  **Summarize**: Provide a concise but informative summary of the article.
3.  **Tag and Categorize**: Extract relevant tags and categories related to cybersecurity.

Content type: {{{contentType}}}
Content to analyze:
{{{content}}}

Based on your full analysis, provide a JSON object with the following fields: 'isSafe', 'reason' (especially if unsafe), 'summary', 'tags' (array of strings), and 'categories' (array of strings).`,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
    ],
  },
});

const analyzeArticleFlow = ai.defineFlow(
  {
    name: 'analyzeArticleFlow',
    inputSchema: AnalyzeArticleInputSchema,
    outputSchema: AnalyzeArticleOutputSchema,
  },
  async (input) => {
    const { output } = await analyzeArticlePrompt(input);
    return output!;
  }
);
