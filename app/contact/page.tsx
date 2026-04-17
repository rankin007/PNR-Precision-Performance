import Link from "next/link";
import { SectionCard } from "@/components/layout/section-card";

export default function ContactPage() {
  return (
    <main className="section-wrap px-4 py-16 md:px-8">
      <SectionCard
        eyebrow="Contact"
        title="Enquiry and next-step paths"
        description="Use this page as the public handoff for owners, trainers, stables, and commercial leads who need platform access, reporting support, or product guidance."
      >
        <div className="grid gap-4 lg:grid-cols-4">
          <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5 lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Who this is for</p>
            <p className="mt-4 text-sm leading-7 text-steel">
              Owners, trainers, stables, and prospective members who want platform access, reporting support, or product information.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Commercial path</p>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-ink">Shop and consultation</p>
            <p className="mt-3 text-sm leading-7 text-steel">
              Review public offers first, then use this route for tailored follow-up and membership guidance.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Member path</p>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-ink">Portal and support</p>
            <p className="mt-3 text-sm leading-7 text-steel">
              Existing members should move from here into sign-in, portal access, and reporting follow-up.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
            <p className="eyebrow">Enquiry Paths</p>
            <h2 className="mt-3 font-display text-2xl text-ink">Choose the right next step</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-ink/10 bg-sand p-5">
                <h3 className="font-display text-2xl text-ink">Owners and trainers</h3>
                <p className="mt-3 text-sm leading-7 text-steel">
                  Start here if you need access to reports, horse updates, operational visibility, or membership setup.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href="/sign-in"
                    className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/portal"
                    className="rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-ink"
                  >
                    Portal
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-ink/10 bg-sand p-5">
                <h3 className="font-display text-2xl text-ink">Commercial leads</h3>
                <p className="mt-3 text-sm leading-7 text-steel">
                  Use the shop to review current offers, then return here if you need a tailored conversation or follow-up.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href="/shop"
                    className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white"
                  >
                    Browse products
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
              <p className="eyebrow">Contact channels</p>
              <h2 className="mt-3 font-display text-2xl text-ink">Current live routes</h2>
              <div className="mt-5 grid gap-3 text-sm leading-7 text-steel">
                <p className="rounded-2xl border border-ink/10 bg-sand px-4 py-4">
                  Public leads can review offerings in the shop and then move into a direct conversation when tailored scope is needed.
                </p>
                <p className="rounded-2xl border border-ink/10 bg-sand px-4 py-4">
                  Existing members can enter through sign-in and use the portal for horse visibility, reports, and support follow-up.
                </p>
                <p className="rounded-2xl border border-ink/10 bg-sand px-4 py-4">
                  This page acts as the central handoff route until the branded enquiry form and email delivery channel are fully activated.
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
              <p className="eyebrow">Current Contact Setup</p>
              <h2 className="mt-3 font-display text-2xl text-ink">Next integration</h2>
              <div className="mt-5 grid gap-3 text-sm leading-7 text-steel">
                <p className="rounded-2xl border border-ink/10 bg-sand px-4 py-4">
                  This route is ready for the final branded enquiry form and email workflow once the chosen delivery channel is configured.
                </p>
                <p className="rounded-2xl border border-ink/10 bg-sand px-4 py-4">
                  Until then, the strongest live paths are the shop, sign-in, and member portal entry points already wired into the app.
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
              <p className="eyebrow">Quick Navigation</p>
              <h2 className="mt-3 font-display text-2xl text-ink">Move through the platform</h2>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/member-experience"
                  className="rounded-full border border-ink/10 bg-sand px-4 py-2 text-sm font-semibold text-ink"
                >
                  Member experience
                </Link>
                <Link
                  href="/"
                  className="rounded-full border border-ink/10 bg-sand px-4 py-2 text-sm font-semibold text-ink"
                >
                  Public site
                </Link>
                <Link
                  href="/shop"
                  className="rounded-full border border-ink/10 bg-sand px-4 py-2 text-sm font-semibold text-ink"
                >
                  Shop
                </Link>
                <Link
                  href="/sign-in"
                  className="rounded-full border border-ink/10 bg-sand px-4 py-2 text-sm font-semibold text-ink"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>
    </main>
  );
}
