import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Cta() {
  return (
    <section id="cta" className="py-12 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
          Ready to Elevate Your Security?
        </h2>
        <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
          Join Secure Sense today and gain access to our full suite of security tools, community resources, and more. It&apos;s free to get started.
        </p>
        <div className="mt-8">
          <Button size="lg" asChild className="glow-sm">
            <Link href="/signup">
              Sign Up Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
