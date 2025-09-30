import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Cta() {
  return (
    <section id="cta" className="py-12 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
          Ready to Fortify Your Defenses?
        </h2>
        <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
          Take the next step in securing your organization. Contact us for a personalized quote and discover how our expert-led cybersecurity services can protect your digital assets.
        </p>
        <div className="mt-8">
          <Button size="lg" asChild className="glow-sm">
            <Link href="/request-a-quote">
              Request a Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
