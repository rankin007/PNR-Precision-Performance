import Link from "next/link";
import { commercialAuthority } from "@/lib/commerce/commercial-authority";

export default function ShopPage() {
  return (
    <main className="min-h-screen min-w-0 overflow-x-clip bg-canvas px-4 py-16 text-technical md:py-20">
      <section className="mx-auto min-w-0 max-w-3xl rounded-2xl border border-technical/10 bg-white p-7 shadow-panel md:p-10">
        <p className="eyebrow max-w-full">
          <span className="min-w-0 break-words">Consultation-led offer</span>
        </p>
        <h1 className="mt-5 break-words font-display text-4xl md:text-5xl">
          Online purchasing is unavailable.
        </h1>
        <p className="mt-6 break-words leading-7 text-muted">{commercialAuthority.publicMessage}</p>
        <p className="mt-3 break-words text-xl font-semibold text-technical">
          {commercialAuthority.offer.name}{" \u2014 "}{commercialAuthority.offer.price.display}
        </p>
        <p className="mt-3 break-words leading-7 text-muted">
          {commercialAuthority.schedule.freight}
        </p>
        <p className="mt-3 break-words leading-7 text-muted">
          Historical or seeded catalogue values are reconciliation evidence only and are not active
          offers. No product on this page can be purchased.
        </p>
        <Link href="/pricing" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-6 py-3 text-center text-sm font-bold text-white">
          View approved Pricing
        </Link>
      </section>
    </main>
  );
}
