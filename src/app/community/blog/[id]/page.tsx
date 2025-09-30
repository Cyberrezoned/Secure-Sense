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
  },
  { id: 3, title: "AI-Powered Phishing: The Next Frontier in Social Engineering", author: "Alex Chen", date: "August 5, 2024", imageId: "post-img-3", content: "<p>Generative AI is making phishing attacks more sophisticated than ever. We explore how attackers use AI and how you can defend against it.</p>" },
  { id: 4, title: "Deepfake Scams: When Seeing Isn't Believing", author: "Brenda Miller", date: "August 4, 2024", imageId: "post-img-4", content: "<p>Deepfake technology is being used for more than just memes. Learn how to spot and protect your organization from deepfake-based social engineering.</p>" },
  { id: 5, title: "Quantum's Shadow: Preparing for Post-Quantum Cryptography", author: "Carlos Rivera", date: "August 3, 2024", imageId: "post-img-5", content: "<p>Quantum computing threatens to break modern encryption. We discuss the race to develop quantum-resistant algorithms.</p>" },
  { id: 6, title: "Anatomy of a Supply Chain Attack: Lessons from Recent Breaches", author: "Diana Prince", date: "August 2, 2024", imageId: "post-img-6", content: "<p>Supply chain attacks are on the rise. We dissect how they work and how to mitigate your risk.</p>" },
  { id: 7, title: "Leveraging AI for Red Teaming: An Ethical Hacker's Guide", author: "Ethan Hunt", date: "August 1, 2024", imageId: "post-img-7", content: "<p>AI can be a powerful tool for ethical hackers. This post covers how to use AI to automate and enhance penetration testing.</p>" },
  { id: 8, title: "Cloud Security Posture Management (CSPM): Beyond Misconfigurations", author: "Fiona Glenanne", date: "July 31, 2024", imageId: "post-img-8", content: "<p>CSPM is essential for any organization in the cloud. Learn what it is and why you need it.</p>" },
  { id: 9, title: "Ransomware-as-a-Service (RaaS): The Industrialization of Cybercrime", author: "George Smiley", date: "July 30, 2024", imageId: "post-img-9", content: "<p>The RaaS model has made ransomware accessible to a wider range of criminals. We explore the ecosystem and its implications.</p>" },
  { id: 10, title: "Securing the Smart Home: Taming the IoT Beast", author: "Harriet Vane", date: "July 29, 2024", imageId: "post-img-10", content: "<p>Your smart devices could be a gateway for attackers. Learn how to secure your IoT ecosystem.</p>" },
  { id: 11, title: "Implementing Zero Trust: A Practical Roadmap", author: "Iris West", date: "July 28, 2024", imageId: "post-img-11", content: "<p>Zero Trust is a security model, not a product. We provide a step-by-step guide to implementing a Zero Trust architecture.</p>" },
  { id: 12, title: "Living Off the Land: The Rise of Fileless Malware", author: "Jack Ryan", date: "July 27, 2024", imageId: "post-img-12", content: "<p>Fileless malware is stealthy and hard to detect. Learn how it works and how to protect against it.</p>" },
  { id: 13, title: "The Hidden Dangers of 5G: A New Attack Surface", author: "Kim Possible", date: "July 26, 2024", imageId: "post-img-13", content: "<p>5G brings new capabilities, but also new security risks. We explore the challenges and potential solutions.</p>" },
  { id: 14, title: "Inside the Dark Web Economy: What's for Sale?", author: "Lisbeth Salander", date: "July 25, 2024", imageId: "post-img-14", content: "<p>We take a look at the illicit goods and services available on the dark web, from stolen data to hacking tools.</p>" },
  { id: 15, title: "Automated Threat Hunting with SOAR and ML", author: "Max Rockatansky", date: "July 24, 2024", imageId: "post-img-15", content: "<p>Security Orchestration, Automation, and Response (SOAR) combined with Machine Learning can supercharge your threat hunting capabilities.</p>" },
  { id: 16, title: "Web3 Security: Auditing Smart Contracts for Vulnerabilities", author: "Nancy Drew", date: "July 23, 2024", imageId: "post-img-16", content: "<p>Smart contracts are the backbone of Web3, but they can be vulnerable. Learn the basics of smart contract auditing.</p>" },
  { id: 17, title: "EDR vs. MDR: Choosing the Right Endpoint Security", author: "Optimus Prime", date: "July 22, 2024", imageId: "post-img-17", content: "<p>Endpoint Detection and Response (EDR) and Managed Detection and Response (MDR) are both crucial, but which is right for you?</p>" },
  { id: 18, title: "The Future is Passwordless: A Look at FIDO2 and Passkeys", author: "Peter Parker", date: "July 21, 2024", imageId: "post-img-18", content: "<p>Passwords are a liability. We explore the move towards passwordless authentication with technologies like FIDO2 and passkeys.</p>" },
  { id: 19, title: "Data Privacy in the Age of AI: Navigating GDPR and CCPA", author: "Quorra", date: "July 20, 2024", imageId: "post-img-19", content: "<p>AI adds new complexities to data privacy. We discuss the implications for regulations like GDPR and CCPA.</p>" },
  { id: 20, title: "Securing Operational Technology (OT): From Factories to Power Grids", author: "Ripley", date: "July 19, 2024", imageId: "post-img-20", content: "<p>The convergence of IT and OT has created new security challenges. Learn how to protect critical infrastructure.</p>" },
  { id: 21, title: "Cyber Insurance: Is Your Policy Really Protecting You?", author: "Sarah Connor", date: "July 18, 2024", imageId: "post-img-21", content: "<p>Cyber insurance is becoming a must-have, but not all policies are created equal. We discuss what to look for.</p>" },
  { id: 22, title: "Purple Teaming: Bridging the Gap Between Attack and Defense", author: "Trinity", date: "July 17, 2024", imageId: "post-img-22", content: "<p>Purple teaming fosters collaboration between red and blue teams to improve an organization's overall security posture.</p>" }
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
