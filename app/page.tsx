import { Hero } from "@/components/sections/hero";
import { FoundationChecklist } from "@/components/sections/foundation-checklist";
import { PublicCtaStrip } from "@/components/sections/public-cta-strip";
import { WorkflowStrip } from "@/components/sections/workflow-strip";

export default function HomePage() {
  return (
    <main className="site-shell overflow-hidden pb-16">
      <Hero />
      <WorkflowStrip />
      <PublicCtaStrip />
      <FoundationChecklist />
    </main>
  );
}
