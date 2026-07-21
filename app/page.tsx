import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Under Construction",
  description: "Precision Performance is being prepared and is not yet publicly available.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-brand text-white">
      <Image
        src="/under-construction-thoroughbred.jpg"
        alt="Thoroughbred racehorse"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-technical/65" />
      <section className="relative z-10 flex min-h-screen items-center px-6 py-16 md:px-12">
        <div className="w-full max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/80">
            Equine Biochemistry and Recovery Intelligence
          </p>
          <h1 className="mt-6 max-w-4xl font-display text-5xl font-bold leading-none text-white md:text-8xl">
            Under Construction
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/85 md:text-xl">
            Precision Performance is being prepared and is not yet publicly available.
            Approved operators can continue through the secure portal sign-in.
          </p>
          <div id="interest" className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="/sign-in"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand transition hover:bg-canvas"
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
