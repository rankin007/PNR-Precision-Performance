import Link from "next/link";

const testimonials = [
  {
    title: "Pardygm Shift",
    description: "Precision Performance gave us a far clearer picture of hydration, recovery, and race readiness.",
    videoSrc: "/Terry%20on%20Feeding.MOV",
  },
  {
    title: "Increase muscle with a reduced girth",
    description: "The analysis changed how we manage training loads, feeding rhythm, and recovery timing.",
    videoSrc: "/Checking%20Girth%20and%20Weight.MOV",
  },
  {
    title: "Testimonial 3",
    description: "The biometric reporting gave our stable more confidence in every performance decision we made.",
  },
  {
    title: "Testimonial 4",
    description: "The combination of science, observation, and equine knowledge created a stronger preparation system.",
  },
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
                  key={testimonial.title}
                  className="rounded-2xl border border-white bg-white px-4 py-4 text-sm leading-7 text-steel"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink text-xs font-bold text-white">
                      {index + 1}
                    </span>
                    <h3 className="font-semibold text-ink">{testimonial.title}</h3>
                  </div>

                  {testimonial.videoSrc ? (
                    <video
                      controls
                      className="mt-4 w-full rounded-2xl border border-ink/10 bg-black"
                      preload="metadata"
                    >
                      <source src={testimonial.videoSrc} type="video/quicktime" />
                      Your browser does not support the video tag.
                    </video>
                  ) : null}

                  <p className="mt-4">{testimonial.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
