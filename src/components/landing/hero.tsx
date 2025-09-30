import { HeroAnimation } from '@/components/hero-animation';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative w-full h-[80vh] min-h-[500px] flex items-center justify-center text-center overflow-hidden">
      <HeroAnimation />
      <div className="absolute inset-0 bg-background/80" />
      <div className="container relative z-10 px-4 md:px-6">
        <div className="mx-auto max-w-3xl space-y-6">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
            The Future of Cybersecurity,
            <span className="block text-primary glow-md">Today.</span>
          </h1>
          <p className="text-lg text-muted-foreground md:text-xl">
            Secure Sense provides cutting-edge solutions to protect your digital assets. From real-time threat monitoring to AI-powered analysis, we are your trusted partner in security.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="glow-sm">
              <Link href="/signup">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#services">
                Explore Services
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
