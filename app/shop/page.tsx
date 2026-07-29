import Link from "next/link";
import { commercialAuthority } from "@/lib/commerce/commercial-authority";

export default function ShopPage() {
  return <main className="min-h-screen bg-canvas px-4 py-20 text-technical"><section className="mx-auto max-w-3xl rounded-2xl border border-technical/10 bg-white p-8 shadow-panel"><p className="eyebrow">Shop unavailable</p><h1 className="mt-5 font-display text-5xl">Online purchasing is not available.</h1><p className="mt-6 leading-7 text-muted">{commercialAuthority.publicMessage} No product, price, inclusion or term shown in historical catalogue data is an active online offer.</p><p className="mt-3 leading-7 text-muted">{commercialAuthority.nextStep}</p><Link href="/#enquiry" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-brand px-6 py-3 text-sm font-bold text-white">Request Trainer Consultation</Link></section></main>;
}
