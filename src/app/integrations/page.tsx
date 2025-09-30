import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ArrowRight } from 'lucide-react';

const integrations = [
  {
    id: "slack",
    name: "Slack",
    description: "Receive real-time security alerts and summaries in your Slack channels.",
    imageId: "integration-slack",
  },
  {
    id: "jira",
    name: "Jira",
    description: "Automatically create Jira tickets for security incidents and track them.",
    imageId: "integration-jira",
  },
  {
    id: "pagerduty",
    name: "PagerDuty",
    description: "Trigger PagerDuty incidents for critical alerts to notify your on-call team.",
    imageId: "integration-pagerduty",
  },
];

export default function IntegrationsPage() {
  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">
          API & Integrations
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Connect Secure Sense with your existing workflows for a seamless security operation.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {integrations.map((integration) => {
          const image = PlaceHolderImages.find(p => p.id === integration.imageId);
          return (
            <Card key={integration.id} className="group relative flex flex-col bg-secondary/50 border-border/50 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
              <CardHeader className="flex flex-row items-start gap-4">
                {image && (
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-background p-1">
                    <Image
                      src={image.imageUrl}
                      alt={`${integration.name} logo`}
                      data-ai-hint={image.imageHint}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                )}
                <div>
                  <CardTitle className="font-headline">{integration.name}</CardTitle>
                  <CardDescription className="mt-1">{integration.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex items-end">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      View Documentation
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{integration.name} Integration</DialogTitle>
                      <DialogDescription>
                        Follow these steps to connect your {integration.name} account with Secure Sense.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="prose prose-sm dark:prose-invert mt-4">
                      <p>1. Navigate to your Secure Sense account settings and find the &apos;Integrations&apos; tab.</p>
                      <p>2. Click &apos;Connect&apos; next to the {integration.name} logo.</p>
                      <p>3. You will be redirected to {integration.name} to authorize the connection.</p>
                      <p>4. Once authorized, you can configure your notification and automation preferences.</p>
                      <pre><code>
{`// Example API call to send an alert
const response = await fetch('https://api.securesense.com/v1/alerts', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    integration: '${integration.id}',
    message: 'Critical vulnerability detected on server X.'
  })
});`}
                      </code></pre>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
