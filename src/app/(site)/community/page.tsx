import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, FileSearch, GraduationCap, Sparkles } from 'lucide-react';

import { CtaBanner } from '@/components/company/cta-banner';
import { PageHero } from '@/components/company/page-hero';
import { SectionHeading } from '@/components/company/section-heading';
import { ContentAnalysis } from '@/components/community/content-analysis';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { emailHref } from '@/lib/contact';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata(
  'Research',
  "Threat analysis, explainers, and security engineering write-ups from ZeenTheCyber, Sule Zeen's cybersecurity community.",
  '/community'
);

const recentPosts = [
  { id: 1, title: 'Understanding Zero-Day Vulnerabilities', author: 'Sule Zeen Research', date: 'July 15, 2024', imageId: 'community-blog-1' },
  { id: 2, title: 'A Guide to Phishing Attack Prevention', author: 'Sule Zeen Research', date: 'July 12, 2024', imageId: 'community-blog-2' },
];

const resourceTracks = [
  {
    title: 'Threat intelligence',
    copy: 'Briefings and explainers for evolving attack patterns, cloud risk, AI misuse, and emerging enterprise exposures.',
    icon: BookOpen,
  },
  {
    title: 'Learning and enablement',
    copy: 'Material for analysts, engineers, founders, and trainees who need security knowledge organized by function.',
    icon: GraduationCap,
  },
  {
    title: 'Article analysis',
    copy: 'Request a summary, suggested tags and a content review for security text you provide.',
    icon: Sparkles,
  },
];

export default function CommunityPage() {
  return (
    <>
      <PageHero
        eyebrow="ZeenTheCyber / Research and resources"
        title="Research and tools for practical cybersecurity."
        description="Explore cybersecurity research, practical guidance, and analysis from ZeenTheCyber, the cybersecurity community from Sule Zeen."
        actions={
          <Button asChild size="lg">
            <Link href="#analysis">
              Try AI Analysis
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        }
        stats={[
          { value: 'Threat research', label: 'Curated by topic and trend' },
          { value: 'AI moderation', label: 'Structured content review' },
          { value: 'Learning hub', label: 'Resources for teams and trainees' },
        ]}
      />

      <section className="shell py-20 md:py-24">
        <SectionHeading
          eyebrow="Resource Tracks"
          title="Organized around how people actually learn and browse."
          description="Browse security reading, plan your learning and review advisory text with the article analysis tool."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {resourceTracks.map((track) => {
            const Icon = track.icon;

            return (
              <div key={track.title} className="surface p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-md border border-primary/20 bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 font-headline text-2xl font-semibold text-foreground">{track.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{track.copy}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="analysis" className="shell pb-20 md:pb-24">
        <SectionHeading
          eyebrow="AI Analysis"
          title="Review a security article with a summary and suggested tags."
          description="Paste the source text for analysis, then check the generated summary and categories against the original before using them."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="surface p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-md border border-primary/20 bg-primary/10 text-primary">
              <FileSearch className="h-5 w-5" />
            </div>
            <h3 className="mt-6 font-headline text-2xl font-semibold text-foreground">Why this matters</h3>
            <div className="mt-4 space-y-3">
              {[
                'Review the content assessment alongside the original source.',
                'Turn long-form articles into faster summaries for research teams and learners.',
                'Use suggested categories and tags to organise your research.',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                  <p className="text-sm leading-7 text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <ContentAnalysis />
        </div>
      </section>

      <section className="shell pb-20 md:pb-24">
        <SectionHeading
          eyebrow="Security reading"
          title="Research, explainers, and strategic security reading."
          description="Explainers, threat analysis, and security engineering write-ups from ZeenTheCyber, the cybersecurity community from Sule Zeen."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {recentPosts.map((post) => {
            const image = PlaceHolderImages.find((entry) => entry.id === post.imageId);

            return (
              <Card key={post.id} className="overflow-hidden rounded-lg border-hairline bg-card/75">
                {image ? (
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    width={640}
                    height={360}
                    className="aspect-[16/9] w-full object-cover"
                  />
                ) : null}
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    By {post.author} on {post.date}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" className="px-0 text-primary hover:bg-transparent">
                    <Link href={`/community/blog/${post.id}`}>
                      Read Article
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </section>

      <div className="shell pb-20 md:pb-24">
        <CtaBanner
          title="Need this research applied to your own environment?"
          description="Research only pays off once it changes what you defend and in what order. Bring us your estate and we will map it."
          primaryHref={emailHref('Research and security program enquiry')}
          primaryLabel="Discuss a Program"
          secondaryHref="/platform"
          secondaryLabel="View the Platform"
        />
      </div>
    </>
  );
}
