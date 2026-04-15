import { Hero } from "@/components/sections/hero";
import { FoundationChecklist } from "@/components/sections/foundation-checklist";
import { WorkflowStrip } from "@/components/sections/workflow-strip";

export default function MarketingHomePage() {
  return (
    <main className="site-shell overflow-hidden pb-16">
      <Hero />
      <WorkflowStrip />
      <FoundationChecklist />
    </main>
  );
}

