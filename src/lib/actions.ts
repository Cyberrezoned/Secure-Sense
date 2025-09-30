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
import { z } from 'zod';

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

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});
export async function loginUser(_prevState: unknown, formData: FormData) {
  const validatedFields = loginSchema.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
    return {
      error: 'Invalid email or password.',
    };
  }
  console.log('Login attempt:', validatedFields.data);
  return { success: 'Login successful! Redirecting...' };
}

const signupSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
export async function signupUser(_prevState: unknown, formData: FormData) {
  const validatedFields = signupSchema.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
    return {
      error: 'Please check your information and try again.',
    };
  }
  console.log('New user signup:', validatedFields.data);
  return { success: 'Account created! Please login.' };
}


const pricingRequestSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  email: z.string().email(),
  employees: z.string().min(1, "Number of employees is required"),
  services: z.array(z.string()).min(1, "Please select at least one service"),
  message: z.string().optional(),
});

export async function requestPricing(_prevState: unknown, formData: FormData) {
  const services = formData.getAll('services');
  const data = {
    companyName: formData.get('companyName'),
    email: formData.get('email'),
    employees: formData.get('employees'),
    services,
    message: formData.get('message'),
  };

  const validatedFields = pricingRequestSchema.safeParse(data);

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      error: 'Please fill out all required fields.',
    };
  }
  console.log('New pricing request:', validatedFields.data);
  return { success: 'Thank you for your request! We will be in touch shortly.' };
}