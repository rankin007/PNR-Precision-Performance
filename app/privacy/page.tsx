import Link from "next/link";
import { ENQUIRY_NOTICE_VERSION } from "@/lib/enquiries/contract";
import { getPublicEnquiryAvailability } from "@/lib/enquiries/env";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = {
  title: "Privacy Notice",
  description: "How Precision Performance handles public stable-trial enquiries.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  const availability = getPublicEnquiryAvailability();
  return (
    <main className="min-h-screen bg-canvas px-4 py-16 text-technical md:px-8 md:py-24">
      <article className="mx-auto max-w-3xl rounded-2xl border border-technical/10 bg-white p-7 shadow-panel md:p-10">
        <p className="eyebrow">Privacy notice</p>
        <h1 className="mt-6 font-display text-4xl leading-tight md:text-5xl">Public stable-trial enquiries</h1>
        {!availability.available && <p className="mt-6 rounded-md border border-warning bg-warning/10 p-4 font-semibold">Online submission is currently unavailable because the protected delivery configuration is not complete and classified.</p>}
        <div className="mt-8 space-y-6 leading-8 text-muted">
          <section><h2 className="font-display text-2xl text-technical">Who collects the information</h2><p className="mt-2">Aprec8 Pty Ltd trading as Precision Performance collects the enquiry. Use the <Link href="/#enquiry" className="font-semibold text-brand underline underline-offset-4">public enquiry form</Link> to request contact about a privacy question, then quote your receipt reference when we respond. You can request access, correction or deletion.</p></section>
          <section><h2 className="font-display text-2xl text-technical">Why we collect it</h2><p className="mt-2">We use the details only to respond about a stable trial, consultation and related Precision Performance services. Trainer name, stable name, phone, email and approximate horse volume are needed so we can answer. Stable address and person referred by are optional.</p></section>
          <section><h2 className="font-display text-2xl text-technical">What not to include</h2><p className="mt-2">Do not include horse medical or health information. An enquiry is not used for marketing, profiling, commerce, onboarding, automated decision-making, analytics or model training.</p></section>
          <section><h2 className="font-display text-2xl text-technical">Storage and service providers</h2><p className="mt-2">The enquiry is stored in our restricted Supabase database in Singapore and hosted through Vercel. A text-only notification is sent to one protected Aprec8 recipient through {availability.providerLabel}. {availability.processingDisclosure}</p></section>
          <section><h2 className="font-display text-2xl text-technical">Access and disclosure</h2><p className="mt-2">Only authorised Aprec8 handlers and the providers needed for hosting and email delivery receive the information. We do not sell it. Provider acceptance means the email service accepted the notification; it does not prove that a person opened it.</p></section>
          <section><h2 className="font-display text-2xl text-technical">Retention and security</h2><p className="mt-2">The database enquiry and operational mailbox copy are retained for 90 days unless you separately enter a governed customer relationship. Raw IP addresses and user-agent strings are not retained. A pseudonymous HMAC abuse bucket is held for no more than 24 hours. Information is encrypted in transit and restricted to server-side access.</p></section>
          <section><h2 className="font-display text-2xl text-technical">Your requests</h2><p className="mt-2">Quote the opaque receipt reference when asking for access, correction or deletion. We may take reasonable steps to verify identity before acting on a request.</p></section>
          <p className="text-sm">Notice version and effective date: {ENQUIRY_NOTICE_VERSION}.</p>
        </div>
        <Link href="/#enquiry" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-bold text-white hover:bg-technical">Return to the enquiry</Link>
      </article>
    </main>
  );
}
