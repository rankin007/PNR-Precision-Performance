export function Hero() {
  return (
    <section className="px-4 pb-16 pt-8 md:px-8 md:pb-24 md:pt-12">
      <div className="section-wrap">
        <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-panel backdrop-blur">
          <div className="grid gap-10 px-6 py-10 md:grid-cols-[1.25fr_0.75fr] md:px-10 md:py-14">
            <div className="space-y-6">
              <span className="eyebrow">Equine Platform Foundation</span>
              <h1 className="balanced-text max-w-3xl font-display text-4xl leading-tight text-ink md:text-6xl">
                A digital platform foundation for racehorse data, member access, and future scale.
              </h1>
              <p className="balanced-text max-w-2xl text-base leading-8 text-steel md:text-lg">
                This repository is now aligned to a racehorse-focused equine platform with
                structured data capture, personalised member experiences, and a delivery model
                designed for web, app, and operational growth.
              </p>
              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <a
                  className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0f1720]"
                  href="#foundation"
                >
                  Review the foundation
                </a>
                <a
                  className="inline-flex items-center justify-center rounded-full border border-ink/10 bg-sand px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink/20 hover:bg-[#efe6d8]"
                  href="#workflow"
                >
                  See the workflow
                </a>
              </div>
            </div>

            <div className="grid gap-4 self-end">
              <div className="rounded-[1.5rem] bg-[#1d2732] p-6 text-white">
                <p className="text-sm uppercase tracking-[0.2em] text-white/60">Stack</p>
                <p className="mt-4 text-2xl font-semibold">Next.js, Supabase, Railway</p>
                <p className="mt-2 text-sm leading-7 text-white/75">
                  Ready for public web experiences, authenticated portals, and data-backed product features.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-ink/10 bg-[#f7f2ea] p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-ember">Control Layer</p>
                <p className="mt-4 text-2xl font-semibold text-ink">Orchestrated Delivery</p>
                <p className="mt-2 text-sm leading-7 text-steel">
                  Antigravity, repo docs, and specialist agent roles can coordinate platform work from a central source of truth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
