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
                  Precision Performance has introduced an innovative equine performance and recovery program designed
                  to support thoroughbred trainers in making more informed decisions using real-time biometric
                  analysis.
                </p>
                <p>
                  Built around non-invasive urine and saliva testing, the Precision Performance system provides insight
                  into hydration, electrolyte balance, recovery efficiency, and nutritional response, helping
                  trainers better understand the individual needs of each horse.
                </p>
                <p>
                  The program focuses on combining scientific analysis with practical horsemanship to improve
                  recovery, support consistency during competition, and reduce the guesswork often associated with
                  elite performance management.
                </p>
                <p>
                  Precision Performance Founder Phillip Rankin brings over 15 years&apos; experience in optimizing body
                  chemistry in elite human athletes and said the program was developed to give trainers access to
                  practical, data-driven information that can assist with everyday training and recovery decisions.
                </p>
                <p>
                  &quot;Same as human athletes, every horse is different. Precision Performance is about understanding
                  what each individual horse needs to recover, perform, and stay in its optimal zone,&quot; Rankin said.
                </p>
                <p>
                  The system provides remarkable insight by analysing important markers including urine conductivity,
                  pH balance, hydration trends, carbohydrate and electrolyte ratios, and overall metabolic
                  efficiency. By combining the results in a complex mathematical equation using proprietary software,
                  trainers can monitor trends over time and identify areas that require change, making targeted
                  adjustments to feeding, hydration, and recovery strategies.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link
                href="/#footer-enquiry"
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
