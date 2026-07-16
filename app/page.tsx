import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Under Construction | PNR Precision Performance",
  description: "PNR Precision Performance is being prepared and is not yet publicly available.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-ink text-white">
      <Image
        src="/under-construction-thoroughbred.jpg"
        alt="Thoroughbred racehorse"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-ink/55" />
      <section className="relative z-10 flex min-h-screen items-center px-6 py-16 md:px-12">
        <div className="w-full max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/80">
            PNR Precision Performance
          </p>
          <h1 className="mt-6 max-w-4xl font-display text-6xl font-bold leading-none text-white md:text-8xl">
            Under Construction
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/85 md:text-xl">
            The platform is being prepared and is not yet publicly available.
            Access for approved operators remains through the secure sign-in path.
          </p>
          <div id="interest" className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="/sign-in"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:bg-mist"
            >
              Operator sign-in
            </a>
            <span className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/50 px-6 py-3 text-sm font-semibold text-white">
              Register your interest: opening soon
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
