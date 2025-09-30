import { Hero } from "@/components/landing/hero";
import { Services } from "@/components/landing/services";
import { DashboardMockup } from "@/components/landing/dashboard-mockup";
import { FeaturesOverview } from "@/components/landing/features-overview";
import { Cta } from "@/components/landing/cta";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <div className="container px-4 md:px-6">
        <Services />
        <Separator className="my-12 md:my-24" />
        <DashboardMockup />
        <Separator className="my-12 md:my-24" />
        <FeaturesOverview />
        <Separator className="my-12 md:my-24" />
        <Cta />
      </div>
    </div>
  );
}
