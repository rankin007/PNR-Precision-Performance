import Link from "next/link";

const testimonials = [
  "Precision Performance gave us a far clearer picture of hydration, recovery, and race readiness.",
  "The analysis changed how we manage training loads, feeding rhythm, and recovery timing.",
  "The biometric reporting gave our stable more confidence in every performance decision we made.",
  "The combination of science, observation, and equine knowledge created a stronger preparation system.",
];

export function WorkflowStrip() {
  return (
    <section id="workflow" className="px-4 py-8 md:px-8 md:py-12">
      <div className="section-wrap">
        <div className="rounded-[2rem] border border-ink/10 bg-[#f8f5ef] px-6 py-8 md:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-xl">
              <span className="eyebrow">Testimonials</span>
              <h2 className="mt-5 font-display text-3xl text-ink md:text-4xl">
                Testimonials
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-8 text-steel">
                Precision Performance combines scientific data with stable knowledge to support clearer training,
                recovery, and raceday decisions.
              </p>
              <div className="mt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0f1720]"
                >
                  Contact Precision Performance
                </Link>
              </div>
            </div>
            <div className="grid gap-3 md:max-w-xl">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial}
                  className="rounded-2xl border border-white bg-white px-4 py-4 text-sm leading-7 text-steel"
                >
                  <span className="mr-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  {testimonial}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
