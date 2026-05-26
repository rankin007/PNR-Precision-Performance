import Image from "next/image";
import Link from "next/link";

const heroNavigation = [
  { href: "/", label: "Home" },
  { href: "/#workflow", label: "Testimonials" },
  { href: "/shop", label: "Shop" },
  { href: "#footer-enquiry", label: "Contact" },
];

export function Hero() {
  return (
    <section className="relative px-4 pb-10 pt-6 md:px-8 md:pb-16 md:pt-8">
      <div className="section-wrap">
        <div className="relative overflow-hidden rounded-[2rem] border border-[#d4cbb7]/40 bg-[#193328] p-3 shadow-[0_28px_70px_rgba(0,0,0,0.28)] md:p-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.09),transparent_26%)]" />
          <div className="relative rounded-[1.7rem] border border-[#b9ab8f]/65 bg-[#0f2a1e] p-4 md:p-6">
            <div className="relative overflow-hidden rounded-[1.45rem] border border-white/10 bg-[#102117]">
              <div className="absolute inset-0 bg-gradient-to-r from-[#123020]/94 via-[#163826]/78 to-transparent" />
              <div className="absolute inset-y-0 right-0 w-full md:w-[58%]">
                <Image
                  src="/Thoroughbred-scaled.jpg"
                  alt="Precision Performance homepage hero artwork"
                  fill
                  priority
                  className="object-cover object-center opacity-50 saturate-50"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />

              <div className="relative flex min-h-[42rem] flex-col px-5 pb-5 pt-6 md:min-h-[46rem] md:px-8 md:pb-7 md:pt-7">
                <div className="flex flex-col gap-4 border-b border-white/10 pb-5 lg:flex-row lg:items-start lg:justify-between">
                  <Link href="/" className="max-w-[29rem] text-white">
                    <h1 className="font-display text-4xl leading-none md:text-5xl">
                      PRECISION PERFORMANCE
                    </h1>
                    <p className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#f1d6b6] md:text-base">
                      Biochemistry Analysis for Elite Equine
                    </p>
                    <p className="mt-2 max-w-2xl text-sm leading-5 text-white/74 md:text-base md:leading-6">
                      Advanced urine and saliva analysis to optimize equine performance and recovery.
                    </p>
                    <div className="mt-4 space-y-2.5 text-sm leading-5 text-white/82 md:text-base md:leading-6">
                      <p>
                        <span className="font-bold text-white">Real-Time Insights:</span> Immediate biochemical data.
                      </p>
                      <p>
                        <span className="font-bold text-white">No Guessing:</span> Exact measurements for nutrition,
                        supplementation, and hydration.
                      </p>
                      <p>
                        <span className="font-bold text-white">Minimized Recovery Times:</span> Identify and reduce
                        recovery times to maintain training momentum.
                      </p>
                      <div className="pt-1">
                        <p className="font-bold text-white">The program aims to support:</p>
                        <ul className="mt-1.5 list-disc space-y-1.5 pl-5">
                          <li>Improved recovery between training and event days</li>
                          <li>Better hydration and electrolyte management</li>
                          <li>Individualised feeding and supplementation strategies</li>
                          <li>Greater consistency throughout racing campaigns</li>
                          <li>Reduced metabolic stress and recovery downtime</li>
                        </ul>
                      </div>
                    </div>
                  </Link>

                  <div className="flex flex-col items-start gap-3 lg:items-end">
                    <nav className="flex flex-wrap justify-start gap-2 lg:justify-end">
                      {heroNavigation.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                            item.href === "/"
                              ? "bg-[#f0a35e] text-white"
                              : "border border-white/20 bg-white/10 text-white hover:bg-white/15"
                          }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </nav>

                    <div className="flex flex-wrap gap-2">
                      <Link
                        href="/onboarding"
                        className="rounded-full border border-white/15 bg-[#f0a35e] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#e49755]"
                      >
                        Apply Now
                      </Link>
                      <Link
                        href="/sign-in"
                        className="rounded-full border border-white/15 bg-[#f0a35e] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#e49755]"
                      >
                        Members Signin
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 items-center py-10 md:py-12" />

                <div className="grid gap-3 md:grid-cols-3">
            <Link
              href="/platform-stack"
              className="flex min-h-[72px] items-center justify-center rounded-[1.35rem] border border-white/15 bg-[#f0a35e] px-4 py-3 text-center text-[13px] font-extrabold uppercase tracking-[0.14em] text-white shadow-lg shadow-[#f0a35e]/25 transition hover:bg-[#e49755] md:min-h-[76px] md:px-5"
            >
              Phone App Preview
            </Link>
            <Link
              href="/member-experience"
              className="flex min-h-[72px] items-center justify-center rounded-[1.35rem] border border-white/15 bg-[#f0a35e] px-4 py-3 text-center text-[13px] font-extrabold uppercase tracking-[0.14em] text-white shadow-lg shadow-[#f0a35e]/25 transition hover:bg-[#e49755] md:min-h-[76px] md:px-5"
            >
              Members Experience
            </Link>
            <Link
              href="/onboarding"
              className="flex min-h-[72px] items-center justify-center rounded-[1.35rem] border border-white/15 bg-[#f0a35e] px-4 py-3 text-center text-[13px] font-extrabold uppercase tracking-[0.14em] text-white shadow-lg shadow-[#f0a35e]/25 transition hover:bg-[#e49755] md:min-h-[76px] md:px-5"
            >
              Let&apos;s Get Started
            </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
