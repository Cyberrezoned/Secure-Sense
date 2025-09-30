import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ContentAnalysis } from './content-analysis';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const recentPosts = [
  { id: 3, title: "AI-Powered Phishing: The Next Frontier in Social Engineering", author: "Alex Chen", date: "August 5, 2024", imageId: "post-img-3" },
  { id: 4, title: "Deepfake Scams: When Seeing Isn't Believing", author: "Brenda Miller", date: "August 4, 2024", imageId: "post-img-4" },
  { id: 5, title: "Quantum's Shadow: Preparing for Post-Quantum Cryptography", author: "Carlos Rivera", date: "August 3, 2024", imageId: "post-img-5" },
  { id: 6, title: "Anatomy of a Supply Chain Attack: Lessons from Recent Breaches", author: "Diana Prince", date: "August 2, 2024", imageId: "post-img-6" },
  { id: 7, title: "Leveraging AI for Red Teaming: An Ethical Hacker's Guide", author: "Ethan Hunt", date: "August 1, 2024", imageId: "post-img-7" },
  { id: 8, title: "Cloud Security Posture Management (CSPM): Beyond Misconfigurations", author: "Fiona Glenanne", date: "July 31, 2024", imageId: "post-img-8" },
  { id: 9, title: "Ransomware-as-a-Service (RaaS): The Industrialization of Cybercrime", author: "George Smiley", date: "July 30, 2024", imageId: "post-img-9" },
  { id: 10, title: "Securing the Smart Home: Taming the IoT Beast", author: "Harriet Vane", date: "July 29, 2024", imageId: "post-img-10" },
  { id: 11, title: "Implementing Zero Trust: A Practical Roadmap", author: "Iris West", date: "July 28, 2024", imageId: "post-img-11" },
  { id: 12, title: "Living Off the Land: The Rise of Fileless Malware", author: "Jack Ryan", date: "July 27, 2024", imageId: "post-img-12" },
  { id: 13, title: "The Hidden Dangers of 5G: A New Attack Surface", author: "Kim Possible", date: "July 26, 2024", imageId: "post-img-13" },
  { id: 14, title: "Inside the Dark Web Economy: What's for Sale?", author: "Lisbeth Salander", date: "July 25, 2024", imageId: "post-img-14" },
  { id: 15, title: "Automated Threat Hunting with SOAR and ML", author: "Max Rockatansky", date: "July 24, 2024", imageId: "post-img-15" },
  { id: 16, title: "Web3 Security: Auditing Smart Contracts for Vulnerabilities", author: "Nancy Drew", date: "July 23, 2024", imageId: "post-img-16" },
  { id: 17, title: "EDR vs. MDR: Choosing the Right Endpoint Security", author: "Optimus Prime", date: "July 22, 2024", imageId: "post-img-17" },
  { id: 18, title: "The Future is Passwordless: A Look at FIDO2 and Passkeys", author: "Peter Parker", date: "July 21, 2024", imageId: "post-img-18" },
  { id: 19, title: "Data Privacy in the Age of AI: Navigating GDPR and CCPA", author: "Quorra", date: "July 20, 2024", imageId: "post-img-19" },
  { id: 20, title: "Securing Operational Technology (OT): From Factories to Power Grids", author: "Ripley", date: "July 19, 2024", imageId: "post-img-20" },
  { id: 21, title: "Cyber Insurance: Is Your Policy Really Protecting You?", author: "Sarah Connor", date: "July 18, 2024", imageId: "post-img-21" },
  { id: 22, title: "Purple Teaming: Bridging the Gap Between Attack and Defense", author: "Trinity", date: "July 17, 2024", imageId: "post-img-22" },
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

      <div className="mt-12 grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-bold tracking-tight font-headline mb-4">AI Content Analysis Tool</h2>
          <ContentAnalysis />
        </div>
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold tracking-tight font-headline">Recent Posts</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {recentPosts.map(post => {
              const image = PlaceHolderImages.find(p => p.id === post.imageId)
              return (
                <Card key={post.id} className="bg-secondary/50 border-border/50 flex flex-col">
                  {image && (
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      data-ai-hint={image.imageHint}
                      width={400}
                      height={250}
                      className="object-cover w-full rounded-t-lg aspect-video"
                    />
                  )}
                  <div className="flex flex-col flex-grow">
                    <CardHeader>
                      <CardTitle>{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm text-muted-foreground">By {post.author} on {post.date}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="link" asChild className="p-0"><Link href={`/community/blog/${post.id}`}>Read More</Link></Button>
                    </CardFooter>
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
