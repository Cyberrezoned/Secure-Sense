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
    content: `
      <p>A zero-day vulnerability is a software security flaw that is known to the software vendor but doesn't have a patch in place to fix it. These are high-priority targets for attackers, as they can be exploited before a defense is available. For an ethical hacker, discovering a zero-day is a critical finding during a penetration test.</p>
      <h3 class="font-bold text-xl my-4">The Lifecycle of an Exploit</h3>
      <p>This article dives deep into how these vulnerabilities are discovered, exploited, and eventually patched. We'll look at famous examples like Stuxnet and discuss how organizations can build resilient systems. A key ethical hacking technique is 'fuzzing,' which involves inputting massive amounts of random data into a system to see if it crashes. A crash can indicate a buffer overflow or other memory corruption flaw, a potential zero-day.</p>
      <pre class="bg-muted rounded-md p-4 my-4 overflow-x-auto text-sm"><code># Simple Python script to demonstrate a basic buffer overflow concept
# NOTE: This is for educational purposes only.

import socket

# Create a socket
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Craft a payload with an overly long string
buffer = "A" * 2000

try:
  s.connect(('192.168.1.100', 9999)) # Connect to a vulnerable service
  print("Sending malicious buffer...")
  s.send(buffer.encode())
  print("Done.")
except:
  print("Could not connect.")
finally:
  s.close()
</code></pre>
      <h3 class="font-bold text-xl my-4">Ethical Mitigation Strategies</h3>
      <p>For Blue Teams, the defense against zero-days focuses on proactive strategies. This includes network segmentation to limit lateral movement, implementing the principle of least privilege, and deploying behavior-based detection systems that can spot anomalies indicating an exploit, even if the specific vulnerability isn't known. Regular, thorough penetration tests by ethical hackers are crucial to finding and fixing flaws before they become zero-day events.</p>
    `
  },
  {
    id: 2,
    title: "A Guide to Phishing Attack Prevention",
    author: "John Smith",
    date: "July 12, 2024",
    imageId: "community-blog-2",
    content: `
      <p>Phishing remains one of the most common and effective cyber attack vectors. It relies on social engineering to trick individuals into divulging sensitive information. This guide covers the various types of phishing attacks, from simple email scams to sophisticated spear-phishing campaigns targeting specific individuals or organizations.</p>
      <h3 class="font-bold text-xl my-4">Simulating a Phishing Campaign</h3>
      <p>As part of a Red Team engagement, ethical hackers often conduct controlled phishing simulations to test an organization's susceptibility. This involves creating convincing emails and landing pages to gauge user awareness and response. Tools like GoPhish or the Social-Engineer Toolkit (SET) are commonly used for this purpose.</p>
      <pre class="bg-muted rounded-md p-4 my-4 overflow-x-auto text-sm"><code># Example of a command using the Social-Engineer Toolkit (SET)
# This would be run in a controlled, authorized environment.

# 1. Launch SET
sudo setoolkit

# 2. Select option '1' for Social-Engineering Attacks
# 3. Select option '2' for Website Attack Vectors
# 4. Select option '3' for Credential Harvester Attack Method
# 5. Select option '2' for Site Cloner
# 6. Enter the URL of the legitimate site to clone (e.g., a company portal)
# 7. SET creates a malicious clone and starts a server to harvest credentials.
</code></pre>
      <h3 class="font-bold text-xl my-4">Defensive Measures (Blue Team)</h3>
      <p>We will provide actionable steps for both individuals and organizations to recognize and prevent these attacks. This includes technical controls like DMARC, DKIM, and SPF to validate email senders, as well as advanced email filtering solutions. However, the most critical defense is a robust user awareness training program. Regular, engaging training that includes phishing simulations helps create a 'human firewall,' turning employees from potential victims into an active line of defense.</p>
    `
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
