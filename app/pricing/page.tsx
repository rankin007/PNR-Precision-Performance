import Link from "next/link";
import { HorseMark } from "@/components/marketing/horse-mark";
import { commercialAuthority } from "@/lib/commerce/commercial-authority";

export const metadata = {
  title: "Commercial Information",
  description: "Consultation-led commercial information for Precision Performance.",
  alternates: { canonical: "/pricing" },
};

const scheduleSections = [
  ["Kit contents", commercialAuthority.schedule.kitContents],
  ["Training", commercialAuthority.schedule.training],
  ["Software and portal", commercialAuthority.schedule.softwareAndPortal],
  ["Setup support", commercialAuthority.schedule.support],
  ["Term and quote expiry", commercialAuthority.schedule.term],
  ["Payment", commercialAuthority.schedule.payment],
  ["Cancellation", commercialAuthority.schedule.cancellation],
  ["Refunds and returns", commercialAuthority.schedule.refundsAndReturns],
  ["Warranty and replacement", commercialAuthority.schedule.warrantyAndReplacement],
  ["Ownership", commercialAuthority.schedule.ownership],
  ["Buyback", commercialAuthority.schedule.buyback],
  ["Stable trial", commercialAuthority.schedule.stableTrial],
  ["Eligibility", commercialAuthority.schedule.eligibility],
  ["Fulfilment", commercialAuthority.schedule.fulfilment],
  ["Professional boundary", commercialAuthority.schedule.claims],
] as const;

export default function PricingPage() {
  return (
    <main className="min-h-screen min-w-0 overflow-x-clip bg-canvas text-technical">
      <header className="border-b border-technical/10 bg-white">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-4 py-5 md:px-6">
          <Link href="/" className="flex min-h-11 min-w-0 items-center gap-2 break-words text-sm font-bold uppercase tracking-[0.14em]">
            <HorseMark className="h-8 w-8 shrink-0 text-brand" />
            Precision Performance
          </Link>
          <Link href="/" className="inline-flex min-h-11 shrink-0 items-center font-semibold text-brand">
            Back to home
          </Link>
        </div>
      </header>

      <section className="px-4 py-12 md:px-8 md:py-20">
        <div className="mx-auto min-w-0 max-w-5xl">
          <p className="eyebrow">Approved commercial information</p>
          <h1 className="mt-6 break-words font-display text-4xl leading-tight md:text-6xl">
            {commercialAuthority.offer.name}
          </h1>
          <p className="mt-4 text-sm font-semibold text-muted">
            Offer {commercialAuthority.offer.identifier}
          </p>

          <div className="mt-10 rounded-2xl border border-accent/45 bg-white p-6 shadow-panel md:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">
              Consultation-led package
            </p>
            <p className="mt-5 break-words font-display text-4xl text-technical">
              {commercialAuthority.offer.price.display}
            </p>
            <p className="mt-4 leading-7 text-muted">{commercialAuthority.publicMessage}</p>
            <p className="mt-4 leading-7 text-muted">{commercialAuthority.schedule.freight}</p>
            <p className="mt-4 leading-7 text-muted">{commercialAuthority.schedule.salesModel}</p>
          </div>

          <div className="mt-8 grid min-w-0 gap-4 md:grid-cols-2">
            {scheduleSections.map(([title, description]) => (
              <section key={title} className="min-w-0 rounded-2xl border border-technical/10 bg-white p-5 shadow-panel">
                <h2 className="break-words font-display text-2xl text-technical">{title}</h2>
                <p className="mt-3 break-words leading-7 text-muted">{description}</p>
              </section>
            ))}
          </div>

          <section className="mt-8 rounded-2xl border border-technical/10 bg-white p-6 shadow-panel md:p-8">
            <h2 className="font-display text-2xl">Next step</h2>
            <p className="mt-3 leading-7 text-muted">{commercialAuthority.nextStep}</p>
            <p className="mt-3 leading-7 text-muted">
              An enquiry requests consultation only. It does not create an order, payment, account,
              subscription, onboarding entitlement or guaranteed trial eligibility.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/#enquiry" className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-6 py-3 text-center text-sm font-bold text-white hover:bg-technical">
                Check stable-trial enquiry availability
              </Link>
              <Link href="/disclaimer" className="inline-flex min-h-12 items-center justify-center rounded-full border border-brand px-6 py-3 text-center text-sm font-bold text-brand">
                Read the information disclaimer
              </Link>
            </div>
          </section>

          <p className="mt-8 text-sm leading-6 text-muted">
            {commercialAuthority.schedule.historicalRecords}
          </p>
        </div>
      </section>
    </main>
  );
}
