import { GamificationBadge } from "@/components/gamification-badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Code, Gamepad2, Award } from "lucide-react";
import Link from 'next/link';

const features = [
  {
    icon: Users,
    title: "Community Learning Hub",
    description: "Engage with peers, join webinars, and access a library of security articles. Content is summarized and tagged by our AI for easy browsing.",
    link: "/community"
  },
  {
    icon: Code,
    title: "Seamless API Integration",
    description: "Connect Secure Sense with your favorite tools. Our developer-friendly API and partner integrations streamline your security operations.",
    link: "/integrations"
  },
  {
    icon: Gamepad2,
    title: "Gamified Engagement",
    description: "Earn points and unlock badges as you learn and interact with the platform. Master cybersecurity concepts in a fun, rewarding way.",
    link: "#"
  },
];

export function FeaturesOverview() {
  return (
    <section id="features" className="py-12 md:py-24">
      <div className="mx-auto max-w-5xl space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
          More Than Just Security
        </h2>
        <p className="text-muted-foreground md:text-xl/relaxed">
          Powerful tools to foster growth, collaboration, and efficiency.
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-1 lg:grid-cols-3">
        {features.map((feature, index) => (
          <Link href={feature.link} key={feature.title} className="block group">
            <Card className="h-full bg-transparent border-none shadow-none text-center transition-transform duration-300 group-hover:-translate-y-2">
              <CardHeader className="items-center">
                {feature.title === "Gamified Engagement" ? (
                  <GamificationBadge icon={Award} />
                ) : (
                  <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-secondary/50 border border-border/50">
                    <feature.icon className="h-12 w-12 text-primary glow-md" />
                  </div>
                )}
                <CardTitle className="mt-4 font-headline">{feature.title}</CardTitle>
                <CardDescription className="mt-2 text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
