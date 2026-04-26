import Link from "next/link";

export function PublicCtaStrip() {
  return (
    <section className="px-4 py-8 md:px-8 md:py-14">
      <div className="section-wrap">
        <div className="rounded-[2rem] bg-[#18212b] px-8 py-10 text-white shadow-panel">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
            <div>
              <h2 className="mt-4 font-display text-4xl leading-tight">
                Precision Performance, A World First in Equine Analysis.
              </h2>
              <div className="mt-4 max-w-4xl space-y-4 text-[14pt] leading-8 text-white/75">
                <p>
                  Harness the power of an advanced urine and saliva analysis to optimize your Thoroughbreds&apos;
                  training, recovery, and race-day performance.
                </p>
                <p>
                  Real time testing system to enhance performance and lessen recovery times using biometric data. No
                  guessing.
                </p>
                <p>
                  Precise monitoring of hydration levels and the strategic tuning of the elite equine diet.
                </p>
                <p>
                  Ultimately, the goal is to combine scientific data with human intuition and knowledge to ensure
                  horses are physically prepared for elite competition.
                </p>
                <p>
                  Precision Performance offers a unique analysis creating an individualised program for elite
                  performance Thoroughbreds. The urine analysis software demonstrates remarkable insight into
                  monitoring critical health markers like hydration, electrolytes, and pH levels. The analysis provides
                  carbohydrate-to-salt ratios, aiming to establish a &quot;healing zone&quot; for recovery. By analysing the
                  turbidity and conductivity of urine, the team seeks to reduce wasted metabolic energy and refine
                  individualised feeding schedules.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link
                href="/contact"
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
