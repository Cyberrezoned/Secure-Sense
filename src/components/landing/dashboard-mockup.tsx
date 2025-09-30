import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { DashboardChart } from '@/components/dashboard-chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wifi, Users, ShieldAlert } from 'lucide-react';

const stats = [
  {
    icon: ShieldAlert,
    value: '1,492',
    label: 'Threats Neutralized (24h)',
    change: '+5.2%',
  },
  {
    icon: Wifi,
    value: '99.98%',
    label: 'System Uptime',
    change: '+0.01%',
  },
  {
    icon: Users,
    value: '25.4k',
    label: 'Protected Users',
    change: '+120',
  },
];

export function DashboardMockup() {
  const mapImage = PlaceHolderImages.find(p => p.id === 'dashboard-map');

  return (
    <section id="dashboard" className="py-12 md:py-24">
      <div className="mx-auto max-w-5xl space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
          Your Security Command Center
        </h2>
        <p className="text-muted-foreground md:text-xl/relaxed">
          Visualize your security posture with our intuitive real-time dashboard.
        </p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <DashboardChart />
        </div>
        <Card className="lg:col-span-2 bg-secondary border-border/50">
          <CardHeader>
            <CardTitle>Global Threat Map</CardTitle>
          </CardHeader>
          <CardContent>
            {mapImage && (
              <Image
                src={mapImage.imageUrl}
                alt={mapImage.description}
                data-ai-hint={mapImage.imageHint}
                width={1200}
                height={600}
                className="rounded-lg object-cover"
              />
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-secondary border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change} from last period</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
