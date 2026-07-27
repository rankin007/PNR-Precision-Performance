import Link from "next/link";
import { HorseMark } from "@/components/marketing/horse-mark";

export const metadata = { title: "Pricing | Precision Performance", description: "Confirmed equipment and training pricing for Precision Performance." };

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-canvas text-technical">
      <header className="border-b border-technical/10 bg-white"><div className="mx-auto flex max-w-[1180px] items-center justify-between px-4 py-5 md:px-6"><Link href="/" className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em]"><HorseMark className="h-8 w-8 text-brand" />Precision Performance</Link><Link href="/" className="text-sm font-semibold text-brand">Back to home</Link></div></header>
      <section className="px-4 py-16 md:px-8 md:py-24"><div className="mx-auto max-w-4xl"><p className="eyebrow">Pricing</p><h1 className="mt-6 font-display text-5xl leading-tight md:text-6xl">A clear starting point for equipment and training.</h1><div className="mt-10 rounded-2xl border border-accent/45 bg-white p-7 shadow-panel md:p-10"><p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">Equipment and training</p><p className="mt-5 font-display text-5xl text-technical">AUD $5,500</p><p className="mt-2 text-base font-semibold text-muted">Including GST</p><div className="mt-8 border-t border-technical/10 pt-6"><p className="text-lg font-semibold">Postage additional</p><p className="mt-3 leading-7 text-muted">Additional services and software options are discussed during consultation.</p></div><Link href="/#enquiry" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-bold text-white hover:bg-technical">Request Trainer Consultation</Link></div></div></section>
    </main>
  );
}
