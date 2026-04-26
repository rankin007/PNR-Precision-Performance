import { Hero } from "@/components/sections/hero";
import { PublicCtaStrip } from "@/components/sections/public-cta-strip";
import { ShowcaseStrip } from "@/components/sections/showcase-strip";
import { WorkflowStrip } from "@/components/sections/workflow-strip";

export default function HomePage() {
  return (
    <main className="site-shell overflow-hidden pb-16">
      <Hero />
      <PublicCtaStrip />
      <WorkflowStrip />
      <ShowcaseStrip
        id="phone-app-preview"
        eyebrow="Phone App Preview"
        title="Phone App Preview"
        description="Preview the mobile experience connected to the Precision Performance platform and the data flow behind day-to-day horse management."
        imageSrc="/phone-app.jpg"
        imageAlt="Precision Performance phone app preview"
        href="/platform-stack"
        ctaLabel="Open Phone App Preview"
      />
      <ShowcaseStrip
        id="members-experience"
        eyebrow="Members Experience"
        title="Members Experience"
        description="See the member-facing workspace built for owners, trainers, and staff to review horse data, reports, and connected platform tools."
        imageSrc="/member-experience.png"
        imageAlt="Precision Performance member experience interface preview"
        href="/member-experience"
        ctaLabel="Open Members Experience"
        reverse
      />
      <ShowcaseStrip
        id="members-signin"
        eyebrow="Members Signin"
        title="Members Signin"
        description="Move directly into the member access path for sign-in, portal access, and the connected operating environment behind the Precision Performance platform."
        href="/sign-in"
        ctaLabel="Open Members Signin"
      />
      <ShowcaseStrip
        id="shop-preview"
        eyebrow="Shop"
        title="Shop"
        description="Review the professional equipment and service pricing panels, then move directly into checkout and subscription pathways."
        imageSrc="/price list for web.jpg"
        imageAlt="Professional equipment pricing preview"
        href="/shop"
        ctaLabel="Open Shop"
        reverse
      />
    </main>
  );
}
