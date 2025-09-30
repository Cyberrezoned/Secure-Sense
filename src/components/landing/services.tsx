import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Swords, HeartPulse } from "lucide-react";

const services = [
  {
    icon: Swords,
    title: "Penetration Testing (Red Team)",
    description: "Simulate real-world attacks to identify and fix critical security weaknesses before attackers can exploit them.",
  },
  {
    icon: ShieldCheck,
    title: "Managed SOC & MDR (Blue Team)",
    description: "Our 24/7 Security Operations Center provides Managed Detection and Response to neutralize threats in real-time.",
  },
  {
    icon: HeartPulse,
    title: "Vulnerability Management",
    description: "Continuous scanning and proactive remediation of vulnerabilities across your digital infrastructure.",
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
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <Card key={service.title} className="group relative overflow-hidden bg-secondary border-border/50 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-2">
             <div className={`absolute -top-1 -left-1 w-24 h-24 blur-3xl group-hover:w-48 group-hover:h-48 transition-all duration-500 ${index === 0 ? 'bg-destructive/20' : 'bg-primary/20'}`} />
            <CardHeader>
              <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-lg border ${index === 0 ? 'bg-destructive/10 border-destructive/20' : 'bg-primary/10 border-primary/20'}`}>
                <service.icon className={`h-7 w-7 glow-sm ${index === 0 ? 'text-destructive' : 'text-primary'}`} />
              </div>
              <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
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
