import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ContentAnalysis } from './content-analysis';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const recentPosts = [
  {
    id: 1,
    title: "Understanding Zero-Day Vulnerabilities",
    author: "Jane Doe",
    date: "July 15, 2024",
    imageId: "community-blog-1"
  },
  {
    id: 2,
    title: "A Guide to Phishing Attack Prevention",
    author: "John Smith",
    date: "July 12, 2024",
    imageId: "community-blog-2"
  }
]

export default function CommunityPage() {
  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">
          Community Learning Hub
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Share knowledge, collaborate with peers, and explore AI-powered content tools.
        </p>
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight font-headline mb-4">AI Content Analysis Tool</h2>
          <ContentAnalysis />
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight font-headline">Recent Posts</h2>
          <div className="grid gap-6">
            {recentPosts.map(post => {
              const image = PlaceHolderImages.find(p => p.id === post.imageId)
              return (
                <Card key={post.id} className="bg-secondary/50 border-border/50">
                  <div className="grid md:grid-cols-3">
                    <div className="md:col-span-1">
                      {image && (
                        <Image
                          src={image.imageUrl}
                          alt={image.description}
                          data-ai-hint={image.imageHint}
                          width={400}
                          height={250}
                          className="object-cover h-full w-full rounded-l-lg"
                        />
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <CardHeader>
                        <CardTitle>{post.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">By {post.author} on {post.date}</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="link" asChild><Link href="#">Read More</Link></Button>
                      </CardFooter>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
