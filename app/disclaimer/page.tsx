import Link from "next/link";
import { commercialAuthority } from "@/lib/commerce/commercial-authority";

export const metadata = {
  title: "Public Information Disclaimer",
  description: "Public information boundaries for Precision Performance.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen min-w-0 overflow-x-clip bg-canvas px-4 py-16 text-technical md:px-8 md:py-24">
      <article className="mx-auto min-w-0 max-w-3xl rounded-2xl border border-technical/10 bg-white p-7 shadow-panel md:p-10">
        <p className="eyebrow max-w-full">
          <span className="min-w-0 break-words">Public information disclaimer</span>
        </p>
        <h1 className="mt-6 break-words font-display text-4xl leading-tight md:text-5xl">
          Information supports professional judgement.
        </h1>
        <div className="mt-8 space-y-5 break-words leading-8 text-muted">
          <p>
            Precision Performance provides educational and informational support for qualified
            trainers and stable professionals.
          </p>
          <p>
            Public examples are anonymised demonstrations. They are not live horse records,
            clinical thresholds, diagnoses, treatment advice or automated recommendations.
          </p>
          <p>
            Precision Performance does not replace trainer observation, veterinary assessment or
            advice from other appropriately qualified professionals.
          </p>
          <p>{commercialAuthority.publicMessage}</p>
          <p>
            A stable-trial enquiry requests consultation only. It does not create an order,
            payment, account, subscription or other commerce state.
          </p>
          <p>
            The approved package, price, freight and complete consultation-led schedule are
            available on the
            <br />
            <Link href="/pricing" className="inline-flex min-h-11 items-center px-1 font-semibold text-brand underline underline-offset-4">
              Pricing page
            </Link>
            .
          </p>
          <p>
            Read the
            <br />
            <Link href="/privacy" className="inline-flex min-h-11 items-center px-1 font-semibold text-brand underline underline-offset-4">
              Privacy notice
            </Link>{" "}
            before sending an enquiry.
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/pricing" className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-6 py-3 text-center text-sm font-bold text-white hover:bg-technical">
            View approved Pricing
          </Link>
          <Link href="/" className="inline-flex min-h-12 items-center justify-center rounded-full border border-brand px-6 py-3 text-center text-sm font-bold text-brand">
            Return to Precision Performance
          </Link>
        </div>
      </article>
    </main>
  );
}
