import { HeroAnimation } from '@/components/hero-animation';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center text-center overflow-hidden">
      <HeroAnimation />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      <div className="container relative z-10 px-4 md:px-6">
        <div className="mx-auto max-w-4xl space-y-6">
          <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl font-headline">
            Elite Cybersecurity,
            <span className="block text-primary glow-md">Engineered for Resilience.</span>
          </h1>
          <p className="text-lg text-muted-foreground md:text-xl max-w-3xl mx-auto">
            Secure Sense delivers offensive and defensive solutions to protect your critical assets. From preemptive penetration testing to 24/7 managed detection and response, we are your trusted security partner.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="glow-sm">
              <Link href="/request-a-quote">
                Request a Quote
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
