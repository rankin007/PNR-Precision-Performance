import Link from "next/link";

export const metadata = {
  title: "Public Information Disclaimer",
  description: "Public information boundaries for Precision Performance.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-canvas px-4 py-16 text-technical md:px-8 md:py-24">
      <article className="mx-auto max-w-3xl rounded-2xl border border-technical/10 bg-white p-7 shadow-panel md:p-10">
        <p className="eyebrow">Public information disclaimer</p>
        <h1 className="mt-6 font-display text-4xl leading-tight md:text-5xl">Information supports professional judgement.</h1>
        <div className="mt-8 space-y-5 leading-8 text-muted">
          <p>Precision Performance provides educational and informational support for qualified trainers and stable professionals.</p>
          <p>Public examples are anonymised demonstrations. They are not live horse records, clinical thresholds, diagnoses, treatment advice or automated recommendations.</p>
          <p>Precision Performance does not replace trainer observation, veterinary assessment or advice from other appropriately qualified professionals.</p>
          <p>Commercial terms and online purchasing are not currently available. A stable-trial enquiry is used only to respond to the request and does not create an order, account or subscription.</p>
          <p>Read the <Link href="/privacy" className="font-semibold text-brand underline underline-offset-4">Privacy notice</Link> before sending an enquiry.</p>
        </div>
        <Link href="/" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-bold text-white hover:bg-technical">
          Return to Precision Performance
        </Link>
      </article>
    </main>
  );
}
