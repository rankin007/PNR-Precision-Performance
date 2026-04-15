import { Hero } from "@/components/sections/hero";
import { FoundationChecklist } from "@/components/sections/foundation-checklist";
import { PlatformPillars } from "@/components/sections/platform-pillars";
import { PublicCtaStrip } from "@/components/sections/public-cta-strip";
import { WorkflowStrip } from "@/components/sections/workflow-strip";

export default function HomePage() {
  return (
    <main className="site-shell overflow-hidden pb-16">
      <Hero />
      <PlatformPillars />
      <WorkflowStrip />
      <PublicCtaStrip />
      <FoundationChecklist />
    </main>
  );
}
