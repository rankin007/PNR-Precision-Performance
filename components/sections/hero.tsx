import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="px-4 pb-16 pt-8 md:px-8 md:pb-24 md:pt-12">
      <div className="section-wrap">
        <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-panel backdrop-blur">
          <div className="grid gap-10 px-6 py-10 md:grid-cols-[1.25fr_0.75fr] md:px-10 md:py-14">
            <div className="overflow-hidden rounded-[1.75rem] border border-ink/10 bg-[#173126] shadow-panel">
              <Image
                src="/front-page.jpg"
                alt="Precision Performance homepage hero artwork"
                width={1600}
                height={1067}
                className="h-full w-full object-cover"
                priority
              />
            </div>

            <div className="grid gap-4 self-end">
              <Link
                href="/platform-stack"
                className="rounded-[1.5rem] bg-[#1d2732] p-6 text-white transition hover:bg-[#243140]"
              >
                <p className="text-sm uppercase tracking-[0.2em] text-white/60">Platform Stack</p>
                <p className="mt-4 text-2xl font-semibold">Next.js, Supabase, Railway</p>
                <p className="mt-2 text-sm leading-7 text-white/75">
                  Built for public web experiences, authenticated portals, and data-backed operational workflows.
                </p>
              </Link>
              <Link
                href="/member-experience"
                className="rounded-[1.5rem] border border-ink/10 bg-[#f7f2ea] p-6 transition hover:border-ink/20 hover:bg-[#f2ebdf]"
              >
                <p className="text-sm uppercase tracking-[0.2em] text-ember">Member Experience</p>
                <p className="mt-4 text-2xl font-semibold text-ink">Owners, Trainers, Staff</p>
                <p className="mt-2 text-sm leading-7 text-steel">
                  The platform is designed to support role-aware access, horse visibility, and future reporting growth.
                </p>
              </Link>
              <Link
                href="/onboarding"
                className="flex items-center justify-center rounded-[1.5rem] bg-ember px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-ember/25 transition hover:bg-[#a14e30]"
              >
                Let&apos;s Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
