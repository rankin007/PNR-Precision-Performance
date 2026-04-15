import { SectionCard } from "@/components/layout/section-card";

export default function ContactPage() {
  return (
    <main className="section-wrap px-4 py-16 md:px-8">
      <SectionCard
        eyebrow="Contact"
        title="Enquiry path"
        description="This public path is the first contact and enquiry entry point for owners, trainers, and commercial leads."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-6">
            <h2 className="font-display text-3xl text-ink">Who this is for</h2>
            <p className="mt-3 text-sm leading-7 text-steel">
              Owners, trainers, stables, and prospective members who want platform access, reporting support, or product information.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-ink/10 bg-white p-6 shadow-panel">
            <h2 className="font-display text-3xl text-ink">Next integration</h2>
            <p className="mt-3 text-sm leading-7 text-steel">
              This route is ready for the final branded enquiry form and email workflow once the chosen delivery channel is configured.
            </p>
          </div>
        </div>
      </SectionCard>
    </main>
  );
}

