// src/ai/flows/content-moderation.ts
'use server';

/**
 * @fileOverview A content moderation AI agent for user-generated content.
 *
 * - moderateContent - A function that moderates the content.
 * - ModerateContentInput - The input type for the moderateContent function.
 * - ModerateContentOutput - The return type for the moderateContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ModerateContentInputSchema = z.object({
  content: z.string().describe('The content to be moderated.'),
  contentType: z
    .enum(['blog', 'comment'])
    .describe('The type of the content being moderated.'),
});
export type ModerateContentInput = z.infer<typeof ModerateContentInputSchema>;

const ModerateContentOutputSchema = z.object({
  isSafe: z.boolean().describe('Whether the content is safe or not.'),
  reason: z.string().describe('The reason for the moderation decision.'),
});
export type ModerateContentOutput = z.infer<typeof ModerateContentOutputSchema>;

export async function moderateContent(input: ModerateContentInput): Promise<ModerateContentOutput> {
  return moderateContentFlow(input);
}

const moderateContentPrompt = ai.definePrompt({
  name: 'moderateContentPrompt',
  input: {schema: ModerateContentInputSchema},
  output: {schema: ModerateContentOutputSchema},
  prompt: `You are a content moderation expert for a cybersecurity community learning hub. Your task is to determine if the provided content is safe and appropriate for all audiences.

Review the content for any of the following violations:
- Hate speech, harassment, or threats
- Sexually explicit material
- Promotion of illegal acts or dangerous content
- Spam or excessive advertising
- Misinformation, especially related to cybersecurity topics

Content type: {{{contentType}}}
Content: {{{content}}}

Based on your analysis, set 'isSafe' to false if any violations are found, and true otherwise. Provide a concise, clear 'reason' for your decision, especially if the content is deemed unsafe.`,
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

const moderateContentFlow = ai.defineFlow(
  {
    name: 'moderateContentFlow',
    inputSchema: ModerateContentInputSchema,
    outputSchema: ModerateContentOutputSchema,
  },
  async input => {
    const {output} = await moderateContentPrompt(input);
    return output!;
  }
);
