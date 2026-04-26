import Image from "next/image";
import Link from "next/link";

const heroNavigation = [
  { href: "/", label: "Home" },
  { href: "/#workflow", label: "Testimonials" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact" },
  { href: "/member-experience", label: "Members Experience" },
];

export function Hero() {
  return (
    <section className="relative px-4 pb-10 pt-6 md:px-8 md:pb-16 md:pt-8">
      <div className="section-wrap">
        <div className="relative overflow-hidden rounded-[2rem] border border-[#d4cbb7]/40 bg-[#193328] p-3 shadow-[0_28px_70px_rgba(0,0,0,0.28)] md:p-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.09),transparent_26%)]" />
          <div className="relative rounded-[1.7rem] border border-[#b9ab8f]/65 bg-[#0f2a1e] p-4 md:p-6">
            <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[#7c745f] bg-[#5d6650]/95 px-5 py-3 text-center shadow-lg shadow-black/25">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#f1d08f]">
                Home
              </p>
            </div>

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
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-white/74 md:text-base">
                      An advanced Urine and Saliva Analysis to optimize Equine Performance and Recovery.
                    </p>
                  </Link>

                  <div className="flex flex-col items-start gap-3 lg:items-end">
                    <nav className="flex flex-wrap gap-2">
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

                <div className="flex flex-1 items-center py-10 md:py-12">
                  <div className="max-w-[36rem]">
                    <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#f2c587]">
                      Home
                    </p>
                    <h2 className="mt-5 max-w-[26rem] font-display text-4xl leading-[0.94] text-white md:text-6xl">
                      Biochemistry For Elite Equine Athletes.
                    </h2>
                    <p className="mt-6 max-w-[30rem] text-base leading-8 text-white/84 md:text-lg">
                      Optimize health, enhance performance, and support recovery decisions with a science-led
                      analysis platform built for elite horses and the teams behind them.
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
            <Link
              href="/platform-stack"
              className="flex min-h-[92px] items-center justify-center rounded-[1.5rem] border border-white/15 bg-[#f0a35e] px-6 py-5 text-center text-sm font-extrabold uppercase tracking-[0.18em] text-white shadow-lg shadow-[#f0a35e]/25 transition hover:bg-[#e49755]"
            >
              Phone App Preview
            </Link>
            <Link
              href="/member-experience"
              className="flex min-h-[92px] items-center justify-center rounded-[1.5rem] border border-white/15 bg-[#f0a35e] px-6 py-5 text-center text-sm font-extrabold uppercase tracking-[0.18em] text-white shadow-lg shadow-[#f0a35e]/25 transition hover:bg-[#e49755]"
            >
              Members Experience
            </Link>
            <Link
              href="/onboarding"
              className="flex min-h-[92px] items-center justify-center rounded-[1.5rem] border border-white/15 bg-[#f0a35e] px-6 py-5 text-center text-sm font-extrabold uppercase tracking-[0.18em] text-white shadow-lg shadow-[#f0a35e]/25 transition hover:bg-[#e49755]"
            >
              Lets get started
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
