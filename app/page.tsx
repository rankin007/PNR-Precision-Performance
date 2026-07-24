import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

const methodSteps = [
  {
    label: "01",
    title: "Capture the stable picture",
    text: "Record horse, timing, workload context, observations, and instrument readings in one practical workflow.",
  },
  {
    label: "02",
    title: "Compare against the individual",
    text: "Use repeated biochemistry readings to support trend-based visibility instead of relying on isolated impressions.",
  },
  {
    label: "03",
    title: "Review with qualified judgement",
    text: "Bring the data back to trainer observation and professional veterinary care when further review is needed.",
  },
];

const trainerValues = [
  "Spot change over time before it becomes easy to miss in a busy stable.",
  "Keep morning checks, recovery context, and horse notes together for later review.",
  "Support conversations between trainers, staff, owners, and veterinarians with clearer evidence.",
  "Build a working baseline for each horse without presenting the system as a diagnosis tool.",
];

const evidenceRows = [
  { metric: "Carbohydrate", value: "Trend up", tone: "Review", color: "bg-warning" },
  { metric: "Conductivity", value: "Stable", tone: "Baseline", color: "bg-success" },
  { metric: "pH saliva", value: "Watch", tone: "Context", color: "bg-data" },
  { metric: "Workload", value: "Heavy AM", tone: "Note", color: "bg-accent" },
];

export const metadata: Metadata = {
  title: "Precision Performance",
  description:
    "Equine biochemistry and recovery intelligence supporting more informed trainer decisions.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-canvas text-technical">
      <section className="relative min-h-[92svh] overflow-hidden bg-technical text-white">
        <Image
          src="/under-construction-thoroughbred.jpg"
          alt="Thoroughbred in a professional racing stable context"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-technical via-technical/78 to-brand/35" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-canvas to-transparent" />

        <header className="relative z-10 mx-auto flex w-full max-w-[1180px] items-center justify-between px-4 py-6 md:px-6 xl:px-0">
          <Link href="/" className="text-sm font-semibold tracking-[0.18em] text-white uppercase">
            Precision Performance
          </Link>
          <nav aria-label="Public preview navigation" className="hidden items-center gap-6 text-sm text-white/82 md:flex">
            <a href="#method" className="transition hover:text-white">
              Method
            </a>
            <a href="#portal" className="transition hover:text-white">
              Portal
            </a>
            <a href="#kit" className="transition hover:text-white">
              Kit
            </a>
            <Link href="/sign-in" className="transition hover:text-white">
              Trainer Login
            </Link>
          </nav>
        </header>

        <div className="relative z-10 mx-auto grid min-h-[calc(92svh-5rem)] w-full max-w-[1180px] items-center gap-10 px-4 pb-20 pt-8 md:px-6 lg:grid-cols-[1.05fr_0.8fr] xl:px-0">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent md:text-sm">
              Equine Biochemistry and Recovery Intelligence
            </p>
            <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[0.98] text-white md:text-7xl">
              See what observation alone cannot show.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/84 md:text-lg">
              Precision Performance helps trainers bring practical stable observation together with
              measurable biochemistry trends, supporting more informed decisions about recovery,
              workload, and horse-by-horse review.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#trial"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand transition hover:bg-canvas"
              >
                Request a Stable Trial
              </a>
              <a
                href="#method"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/45 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
              >
                See How It Works
              </a>
            </div>
          </div>

          <div className="hidden rounded-lg border border-white/20 bg-white/12 p-5 backdrop-blur md:block">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/64">
              Preview Snapshot
            </p>
            <div className="mt-5 space-y-3">
              {evidenceRows.map((row) => (
                <div key={row.metric} className="grid grid-cols-[1fr_auto] gap-3 rounded-md bg-white/92 p-4 text-technical">
                  <div>
                    <p className="text-sm font-semibold">{row.metric}</p>
                    <p className="mt-1 text-xs text-muted">Recreated sample, not live horse data</p>
                  </div>
                  <div className="text-right">
                    <span className={`mb-2 inline-block h-2 w-12 rounded-full ${row.color}`} />
                    <p className="text-sm font-semibold">{row.value}</p>
                    <p className="text-xs text-muted">{row.tone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="method" className="px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto w-full max-w-[1180px]">
          <p className="eyebrow">The Precision Performance Method</p>
          <div className="mt-6 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <h2 className="font-display text-4xl leading-tight text-technical md:text-5xl">
              Professional horsemanship, made more measurable.
            </h2>
            <p className="text-base leading-8 text-muted md:text-lg">
              The platform is designed to complement stable craft, not replace it. It gives trainers
              a consistent way to capture readings, view change over time, and decide when a horse
              needs closer human or veterinary review.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {methodSteps.map((step) => (
              <article key={step.title} className="rounded-lg border border-technical/10 bg-white p-6 shadow-panel">
                <p className="text-sm font-bold text-accent">{step.label}</p>
                <h3 className="mt-4 font-display text-2xl leading-tight text-technical">{step.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid w-full max-w-[1180px] gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="eyebrow">For Trainers</p>
            <h2 className="mt-6 font-display text-4xl leading-tight text-technical md:text-5xl">
              A clearer daily view of horses that need attention.
            </h2>
            <p className="mt-6 text-base leading-8 text-muted">
              Precision Performance is being shaped around the morning stable rhythm: fast capture,
              clear review states, and useful context that can be revisited when workload, travel,
              temperature, or recovery patterns change.
            </p>
          </div>
          <ul className="grid gap-3">
            {trainerValues.map((item) => (
              <li key={item} className="rounded-lg border border-technical/10 bg-canvas px-5 py-4 text-sm font-medium leading-7 text-technical">
                <span className="mr-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-success text-xs font-bold text-white">
                  OK
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="portal" className="bg-technical px-4 py-16 text-white md:px-8 md:py-24">
        <div className="mx-auto grid w-full max-w-[1180px] gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
              Precision Performance Portal
            </p>
            <h2 className="mt-6 font-display text-4xl leading-tight md:text-5xl">
              Built for the working stable, not a generic dashboard.
            </h2>
            <p className="mt-6 text-base leading-8 text-white/75">
              The portal direction is practical: horse selection, test timing, instrument readings,
              notes, review states, and history. Final scoring thresholds and recommendation content
              remain gated until approved domain authority is supplied.
            </p>
          </div>
          <div className="rounded-lg border border-white/14 bg-white/8 p-5">
            <div className="grid gap-3">
              {["Mobile capture", "Trend review", "Role-aware access", "Unavailable states when authority is incomplete"].map(
                (item) => (
                  <div key={item} className="rounded-md bg-white px-4 py-4 text-sm font-semibold text-technical">
                    {item}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="kit" className="px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto w-full max-w-[1180px]">
          <p className="eyebrow">Testing Kit And Services</p>
          <div className="mt-6 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <h2 className="font-display text-4xl leading-tight text-technical md:text-5xl">
              Field measurements connected to a repeatable review process.
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {["Conductivity and carbohydrate context", "pH urine and saliva capture", "Turbidity, temperature, intake, and workload notes", "Trainer-reviewed interpretation before action"].map(
                (item) => (
                  <article key={item} className="rounded-lg border border-technical/10 bg-white p-5">
                    <h3 className="text-base font-semibold text-technical">{item}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted">
                      Preview content only. Final measurement rules, thresholds, and service terms
                      remain subject to approved domain and business authority.
                    </p>
                  </article>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid w-full max-w-[1180px] gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="eyebrow">Evidence Preview</p>
            <h2 className="mt-6 font-display text-4xl leading-tight text-technical md:text-5xl">
              Clear signals without exposing private horse records.
            </h2>
            <p className="mt-6 text-base leading-8 text-muted">
              Marketing examples on this page are recreated and anonymised. They demonstrate the
              intended style of review without publishing raw pathology, proprietary formulas, or
              identifiable stable information.
            </p>
          </div>
          <div className="rounded-lg border border-technical/10 bg-canvas p-5">
            <div className="flex h-56 items-end gap-3" aria-label="Recreated trend illustration">
              {[34, 48, 42, 58, 52, 68, 61, 74].map((height, index) => (
                <div key={height + index} className="flex flex-1 flex-col items-center gap-3">
                  <div
                    className="w-full rounded-t-md bg-data"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs font-semibold text-muted">W{index + 1}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm font-semibold text-technical">
              Recreated weekly trend example, for presentation only.
            </p>
          </div>
        </div>
      </section>

      <section id="trial" className="bg-brand px-4 py-16 text-white md:px-8 md:py-20">
        <div className="mx-auto grid w-full max-w-[1180px] gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
              Early Stable Review
            </p>
            <h2 className="mt-5 font-display text-4xl leading-tight md:text-5xl">
              Request a stable trial conversation.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-white/78">
              Stable trial enquiries are handled directly by the Precision Performance team while
              the full portal, commerce, and onboarding workflows remain gated.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link
              href="/sign-in"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand transition hover:bg-canvas"
            >
              Trainer Login
            </Link>
            <a
              href="#method"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/35 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Review the Method
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
