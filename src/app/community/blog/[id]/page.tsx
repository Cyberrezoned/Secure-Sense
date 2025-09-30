import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// In a real app, you would fetch this from a CMS or database
const recentPosts = [
  {
    id: 1,
    title: "Understanding Zero-Day Vulnerabilities",
    author: "Jane Doe",
    date: "July 15, 2024",
    imageId: "community-blog-1",
    content: "<p>A zero-day vulnerability is a software security flaw that is known to the software vendor but doesn't have a patch in place to fix it. These are high-priority targets for attackers, as they can be exploited before a defense is available.</p><p>This article dives deep into how these vulnerabilities are discovered, exploited, and eventually patched. We'll look at famous examples and discuss how organizations can build resilient systems to mitigate the risk of zero-day attacks, focusing on proactive defense strategies and rapid response protocols.</p>"
  },
  {
    id: 2,
    title: "A Guide to Phishing Attack Prevention",
    author: "John Smith",
    date: "July 12, 2024",
    imageId: "community-blog-2",
    content: "<p>Phishing remains one of the most common and effective cyber attack vectors. It relies on social engineering to trick individuals into divulging sensitive information. This guide covers the various types of phishing attacks, from simple email scams to sophisticated spear-phishing campaigns.</p><p>We will provide actionable steps for both individuals and organizations to recognize and prevent these attacks. This includes technical controls like email filtering, as well as the critical importance of user awareness training to create a human firewall.</p>"
  }
]

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = recentPosts.find(p => p.id === parseInt(params.id));

  if (!post) {
    notFound();
  }

  const image = PlaceHolderImages.find(p => p.id === post.imageId);

  return (
    <div className="container py-8 px-4 md:px-6 max-w-4xl mx-auto">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/community">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Community Hub
        </Link>
      </Button>
      <article>
        <header className="space-y-4 mb-8">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
            {post.title}
          </h1>
          <p className="text-muted-foreground">
            By {post.author} on {post.date}
          </p>
        </header>

        {image && (
          <Image
            src={image.imageUrl}
            alt={image.description}
            data-ai-hint={image.imageHint}
            width={1200}
            height={600}
            className="rounded-lg object-cover aspect-video mb-8"
          />
        )}
        
        <div 
          className="prose dark:prose-invert max-w-none text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  )
}
