'use server';

import {
  moderateContent,
  type ModerateContentOutput,
} from '@/ai/flows/content-moderation';
import {
  tagRelevantArticles,
  type TagRelevantArticlesOutput,
} from '@/ai/flows/tag-relevant-articles';
import {
  summarizeSecurityArticle,
  type SummarizeSecurityArticleOutput,
} from '@/ai/flows/summarize-security-articles';

export interface AnalysisResult {
  moderation: ModerateContentOutput;
  tags: TagRelevantArticlesOutput;
  summary: SummarizeSecurityArticleOutput;
}

export async function analyzeContent(
  _prevState: unknown,
  formData: FormData
): Promise<{ result?: AnalysisResult; error?: string }> {
  const content = formData.get('content') as string;

  if (!content || content.length < 50) {
    return { error: 'Please provide at least 50 characters of content to analyze.' };
  }

  try {
    const [moderationResult, tagsResult, summaryResult] = await Promise.all([
      moderateContent({ content, contentType: 'blog' }),
      tagRelevantArticles({ articleText: content }),
      summarizeSecurityArticle({ articleContent: content }),
    ]);

    return {
      result: {
        moderation: moderationResult,
        tags: tagsResult,
        summary: summaryResult,
      },
    };
  } catch (error) {
    console.error('Error during content analysis:', error);
    return { error: 'An unexpected error occurred during analysis. Please try again.' };
  }
}
