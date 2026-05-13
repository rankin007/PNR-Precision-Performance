import Image from "next/image";
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
    videoSrc: "/IMG_3360.MOV",
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
              <p className="mt-4 max-w-lg text-[14pt] leading-8 text-steel">
                Precision Performance combines scientific data with stable knowledge to support clearer training,
                recovery, and raceday decisions.
              </p>
              <div className="mt-6">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0f1720]"
                    >
                      Contact Precision Performance
                    </Link>
                    <a
                      href="/Phillips%20bio%202026.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-ink/10 bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink/20"
                    >
                      Phillip Rankin, Founder, Precision Performance
                    </a>
                  </div>
                  <div className="max-w-[20rem] overflow-hidden rounded-[1.5rem] border border-ink/10 bg-white shadow-panel">
                    <div className="relative aspect-[4/5] w-full">
                      <Image
                        src="/IMG_9309.JPEG"
                        alt="Phillip Rankin, Founder of Precision Performance"
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
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
                    <div className="mt-4">
                      <details className="group">
                        <summary className="flex cursor-pointer list-none items-center justify-between rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-sm font-semibold text-ink">
                          <span>Watch testimonial video</span>
                          <svg
                            className="h-4 w-4 text-ink/50 transition-transform group-open:rotate-180"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </summary>
                        <div className="mt-3 max-w-sm">
                          <video
                            controls
                            playsInline
                            className="w-full rounded-2xl border border-ink/10 bg-black"
                            preload="metadata"
                          >
                            <source src={testimonial.videoSrc} />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      </details>
                    </div>
                  ) : null}

                  <p className="mt-4 text-[14pt] leading-8">{testimonial.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
