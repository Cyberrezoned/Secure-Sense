import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Siren, Activity } from "lucide-react";

const services = [
  {
    icon: Activity,
    title: "Threat Monitoring",
    description: "24/7 real-time monitoring of your infrastructure to detect and neutralize threats before they impact your business.",
  },
  {
    icon: Siren,
    title: "Incident Response",
    description: "Rapid response and remediation services to contain security incidents and minimize damage.",
  },
  {
    icon: ShieldCheck,
    title: "Vulnerability Assessment",
    description: "Proactive identification and analysis of security vulnerabilities in your systems and applications.",
  },
];

export function Services() {
  return (
    <section id="services" className="py-12 md:py-24">
      <div className="mx-auto max-w-5xl space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
          Our Core Services
        </h2>
        <p className="text-muted-foreground md:text-xl/relaxed">
          A comprehensive suite of security solutions tailored to your needs.
        </p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.title} className="group relative overflow-hidden bg-secondary/50 border-border/50 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-2">
             <div className="absolute -top-1 -left-1 w-20 h-20 bg-primary/20 blur-3xl group-hover:w-40 group-hover:h-40 transition-all duration-500" />
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                <service.icon className="h-6 w-6 text-primary glow-sm" />
              </div>
              <CardTitle className="font-headline">{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
