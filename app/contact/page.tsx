import { SectionCard } from "@/components/layout/section-card";

export default function ContactPage() {
  return (
    <main className="section-wrap px-4 py-16 md:px-8">
      <SectionCard
        eyebrow="Contact"
        title="Elite Equine contact details"
        description="A world first in understanding accurate Performance and Recovery of Elite Equine Athletes."
      >
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-ink/10 bg-sand p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Direct Contact</p>
              <div className="mt-4 space-y-3 text-base leading-8 text-ink">
                <p>Phillip Rankin, Founder</p>
                <p>044 888 3838</p>
                <p>
                  <a
                    href="mailto:phillip@balanceenergyaustralia.com"
                    className="font-semibold text-ink transition hover:text-ember"
                  >
                    phillip@balanceenergyaustralia.com
                  </a>
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Contact Message</p>
              <p className="mt-4 text-sm leading-7 text-steel">
                Use the enquiry panel to leave your name, email, mobile number, and comment section details for a
                direct follow-up.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
            <p className="eyebrow">Email Enquiry</p>
            <h2 className="mt-3 font-display text-2xl text-ink">Send an enquiry</h2>

            <form className="mt-6 grid gap-4">
              <label className="grid gap-2 text-sm font-medium text-ink">
                <span>NAME</span>
                <input
                  type="text"
                  name="name"
                  className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-ink placeholder:text-steel/70 focus:border-ink/30 focus:outline-none"
                  placeholder="Your name"
                />
              </label>

              <label className="grid gap-2 text-sm font-medium text-ink">
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-ink placeholder:text-steel/70 focus:border-ink/30 focus:outline-none"
                  placeholder="Your email"
                />
              </label>

              <label className="grid gap-2 text-sm font-medium text-ink">
                <span>Mobile</span>
                <input
                  type="tel"
                  name="mobile"
                  className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-ink placeholder:text-steel/70 focus:border-ink/30 focus:outline-none"
                  placeholder="Your mobile number"
                />
              </label>

              <label className="grid gap-2 text-sm font-medium text-ink">
                <span>Comments</span>
                <textarea
                  name="comments"
                  rows={7}
                  className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-ink placeholder:text-steel/70 focus:border-ink/30 focus:outline-none"
                  placeholder="Comment Section"
                />
              </label>
            </form>
          </div>
        </div>
      </SectionCard>
    </main>
  );
}
