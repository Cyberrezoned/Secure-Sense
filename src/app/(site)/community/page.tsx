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

const recentPosts = [
  { id: 3, title: 'AI-Powered Phishing: The Next Frontier in Social Engineering', author: 'Alex Chen', date: 'August 5, 2024', imageId: 'post-img-3' },
  { id: 4, title: "Deepfake Scams: When Seeing Isn't Believing", author: 'Brenda Miller', date: 'August 4, 2024', imageId: 'post-img-4' },
  { id: 6, title: 'Anatomy of a Supply Chain Attack: Lessons from Recent Breaches', author: 'Diana Prince', date: 'August 2, 2024', imageId: 'post-img-6' },
  { id: 8, title: 'Cloud Security Posture Management (CSPM): Beyond Misconfigurations', author: 'Fiona Glenanne', date: 'July 31, 2024', imageId: 'post-img-8' },
  { id: 11, title: 'Implementing Zero Trust: A Practical Roadmap', author: 'Iris West', date: 'July 28, 2024', imageId: 'post-img-11' },
  { id: 20, title: 'Securing Operational Technology (OT): From Factories to Power Grids', author: 'Ripley', date: 'July 19, 2024', imageId: 'post-img-20' },
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
    title: 'AI-assisted curation',
    copy: 'Moderate submissions, summarize articles, and generate categories before content reaches your hub.',
    icon: Sparkles,
  },
];

export default function CommunityPage() {
  return (
    <>
      <PageHero
        eyebrow="Research and Resources"
        title="A proper home for learning, threat research, and AI-assisted content workflows."
        description="This route separates thought leadership and community tooling from the main company pitch. It gives Secure Sense a cleaner research surface for articles, knowledge sharing, and AI-assisted publishing."
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
          description="Use this hub to publish research, guide internal learning, and keep your AI-assisted content tools in one clear place."
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
          title="Moderate, summarize, and tag cybersecurity content before publishing."
          description="Summarise long advisories, extract affected products, and tag them consistently so the library stays searchable as it grows."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="surface p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-md border border-primary/20 bg-primary/10 text-primary">
              <FileSearch className="h-5 w-5" />
            </div>
            <h3 className="mt-6 font-headline text-2xl font-semibold text-foreground">Why this matters</h3>
            <div className="mt-4 space-y-3">
              {[
                'Reduce low-quality or unsafe submissions before they reach your audience.',
                'Turn long-form articles into faster summaries for research teams and learners.',
                'Keep categories and tags consistent so the resource hub scales cleanly.',
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
          eyebrow="Recent Articles"
          title="Research, explainers, and strategic security reading."
          description="Technical write-ups from live engagements, threat analysis, and the practices we apply in client environments."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {recentPosts.map((post) => {
            const image = PlaceHolderImages.find((entry) => entry.id === post.imageId);

            return (
              <Card key={post.id} className="overflow-hidden rounded-lg border-hairline bg-card/75">
                {image ? (
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    data-ai-hint={image.imageHint}
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
          primaryHref="/contact"
          primaryLabel="Discuss a Program"
          secondaryHref="/platform"
          secondaryLabel="View the Platform"
        />
      </div>
    </>
  );
}
