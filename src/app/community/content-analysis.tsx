'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { analyzeContent, type AnalysisResult } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle, XCircle, Tag, FileText, Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full glow-sm">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
         <>
          <Sparkles className="mr-2 h-4 w-4" />
          Analyze Content
        </>
      )}
    </Button>
  );
}

export function ContentAnalysis() {
  const [state, formAction] = useActionState(analyzeContent, {});

  return (
    <Card className="bg-secondary/50 border-border/50">
      <CardHeader>
        <CardTitle className="text-lg font-headline">Submit an Article for AI Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <Textarea
            name="content"
            placeholder="Paste your security article text here (min. 50 characters)..."
            rows={8}
            className="bg-background"
          />
          <SubmitButton />
        </form>

        {state.error && (
          <Alert variant="destructive" className="mt-4">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}

        {state.result && <AnalysisResults result={state.result} />}
      </CardContent>
    </Card>
  );
}

function AnalysisResults({ result }: { result: AnalysisResult }) {
  return (
    <div className="mt-6 space-y-6">
      <Card className="bg-background">
        <CardHeader className="flex flex-row items-center gap-2 space-y-0">
          {result.moderation.isSafe ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <XCircle className="h-5 w-5 text-red-500" />
          )}
          <CardTitle>Content Moderation</CardTitle>
        </CardHeader>
        <CardContent>
          <p className={result.moderation.isSafe ? 'text-green-400' : 'text-red-400'}>
            Status: {result.moderation.isSafe ? 'Safe for community' : 'Not safe'}
          </p>
          <p className="text-sm text-muted-foreground mt-1">Reason: {result.moderation.reason}</p>
        </CardContent>
      </Card>

      <Card className="bg-background">
        <CardHeader className="flex flex-row items-center gap-2 space-y-0">
          <FileText className="h-5 w-5 text-primary" />
          <CardTitle>AI Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{result.summary.summary}</p>
        </CardContent>
      </Card>

      <Card className="bg-background">
        <CardHeader className="flex flex-row items-center gap-2 space-y-0">
          <Tag className="h-5 w-5 text-primary" />
          <CardTitle>Generated Tags & Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <h4 className="font-semibold text-sm mb-2">Tags:</h4>
              <div className="flex flex-wrap gap-2">
                {result.tags.tags.map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">Categories:</h4>
              <div className="flex flex-wrap gap-2">
                {result.tags.categories.map(cat => (
                  <Badge key={cat} variant="outline">{cat}</Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
