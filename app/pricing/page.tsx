import Link from "next/link";
import { HorseMark } from "@/components/marketing/horse-mark";
import { commercialAuthority } from "@/lib/commerce/commercial-authority";

export const metadata = {
  title: "Commercial Information",
  description: "Consultation-led commercial information for Precision Performance.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-canvas text-technical">
      <header className="border-b border-technical/10 bg-white"><div className="mx-auto flex max-w-[1180px] items-center justify-between px-4 py-5 md:px-6"><Link href="/" className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em]"><HorseMark className="h-8 w-8 text-brand" />Precision Performance</Link><Link href="/" className="text-sm font-semibold text-brand">Back to home</Link></div></header>
      <section className="px-4 py-16 md:px-8 md:py-24"><div className="mx-auto max-w-4xl"><p className="eyebrow">Commercial information</p><h1 className="mt-6 font-display text-5xl leading-tight md:text-6xl">Discuss the right starting point for your stable.</h1><div className="mt-10 rounded-2xl border border-accent/45 bg-white p-7 shadow-panel md:p-10"><p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">Consultation-led</p><p className="mt-5 text-xl font-semibold text-technical">{commercialAuthority.publicMessage}</p><p className="mt-4 leading-7 text-muted">Prices, inclusions, tax, freight, terms and availability are not confirmed for online purchase. {commercialAuthority.nextStep}</p><p className="mt-4 text-sm text-muted">The enquiry form prepares your request for review but does not transmit it online.</p><Link href="/#enquiry" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-bold text-white hover:bg-technical">Request a Stable Trial</Link></div></div></section>
    </main>
  );
}
