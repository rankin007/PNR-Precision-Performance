import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="px-4 pb-16 pt-8 md:px-8 md:pb-24 md:pt-12">
      <div className="section-wrap">
        <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-panel backdrop-blur">
          <div className="px-6 py-10 md:px-10 md:py-14">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-ink/10 bg-[#173126] shadow-panel">
              <Image
                src="/front-page.jpg"
                alt="Precision Performance homepage hero artwork"
                width={1600}
                height={1067}
                className="h-[34rem] w-full object-cover md:h-[42rem]"
                priority
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
                <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
                  <Link
                    href="/platform-stack"
                    className="rounded-[1.5rem] border border-white/15 bg-[#1d2732]/90 p-5 text-white backdrop-blur-sm transition hover:bg-[#243140]"
                  >
                    <p className="text-sm uppercase tracking-[0.2em] text-white/60">Phone App Preview</p>
                  </Link>
                  <Link
                    href="/member-experience"
                    className="rounded-[1.5rem] border border-white/20 bg-[#f7f2ea]/92 p-5 text-ink backdrop-blur-sm transition hover:border-ink/20 hover:bg-[#f2ebdf]"
                  >
                    <p className="text-sm uppercase tracking-[0.2em] text-ember">Members Experience</p>
                  </Link>
                  <Link
                    href="/onboarding"
                    className="flex items-center justify-center rounded-[1.5rem] bg-ember px-6 py-5 text-sm font-semibold text-white shadow-lg shadow-ember/25 transition hover:bg-[#a14e30]"
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
