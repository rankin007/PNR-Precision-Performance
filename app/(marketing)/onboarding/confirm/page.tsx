"use client";

import { use, useState } from "react";
import { confirmOnboardingApplication } from "../actions";
import { SectionCard } from "@/components/layout/section-card";
import Link from "next/link";

interface ConfirmPageProps {
  searchParams: Promise<{ token?: string }>;
}

export default function ConfirmPage({ searchParams }: ConfirmPageProps) {
  // Extract token. In Next.js 15, searchParams is a Promise.
  const params = use(searchParams);
  const token = params?.token ?? "";

  const [isPending, setIsPending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleConfirm() {
    setIsPending(true);
    setStatus("idle");
    setErrorMsg("");

    const result = await confirmOnboardingApplication(token);

    if (result?.error) {
      setErrorMsg(result.error);
      setStatus("error");
    } else if (result?.success) {
      setStatus("success");
    }

    setIsPending(false);
  }

  if (!token) {
    return (
      <main className="section-wrap px-4 py-16 md:px-8">
        <SectionCard eyebrow="Error" title="Invalid Link" description="This link goes nowhere.">
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 border border-red-100">
            No secure token was found in the URL. Please use the link exactly as provided in your email.
          </div>
        </SectionCard>
      </main>
    );
  }

  return (
    <main className="section-wrap px-4 py-16 md:px-8">
      <SectionCard
        eyebrow="Verification"
        title="Application Confirmation & Disclaimer"
        description="Please review the clinical and operational disclaimers before finalizing your platform application."
      >
        {status === "success" ? (
          <div className="rounded-2xl border border-ink/10 bg-sand p-8 text-center text-ink">
            <h2 className="mb-4 font-display text-2xl text-emerald-700">✓ Verified</h2>
            <p className="text-steel">
              Thank you. Your email is confirmed and your agreement to the disclaimer has been recorded.
            </p>
            <p className="mt-4 text-steel">
              Our team will review your application and be in touch regarding the finalization of your membership and environment provisioning.
            </p>
            <div className="mt-8">
              <Link href="/" className="font-semibold underline text-ink">
                Return to Homepage
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-2xl border border-ink/20 bg-mist/30 p-6 text-sm text-ink leading-relaxed h-[400px] overflow-y-auto">
              <h3 className="font-bold text-lg mb-4">Precision Performance Platform Terms & Clinical Disclaimer</h3>
              <p className="mb-4">
                <strong>1. Nature of the System</strong><br/>
                The Precision Performance platform is a structured logging, reporting, and intelligence system designed for the elite equine sector. It captures performance metrics, biographical data, and biochemistry records.
              </p>
              <p className="mb-4">
                <strong>2. Not Veterinary Advice</strong><br/>
                The data managed within Precision Performance, including alerts, trends, and biochemistry interpretations, does not constitute professional veterinary advice. All medical, dietary, and training decisions must be verified independently by qualified professionals.
              </p>
              <p className="mb-4">
                <strong>3. Data Accuracy & Integrity</strong><br/>
                As an applicant, you represent the named stable/business and agree that all data manually entered into the ledger must be accurate and submitted chronologically. The system enforces "Clinical Law", meaning logged historical data may be immutable to preserve an accurate forensic audit trail.
              </p>
              <p className="mb-4">
                <strong>4. Membership Agreement</strong><br/>
                By verifying this application, you agree to become the primary contact for this stable entity. If accepted, you will be bound by the forthcoming formal Terms of Service and Privacy Policy associated with the paid or sponsored tiers of the platform.
              </p>
            </div>

            {status === "error" && (
              <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 border border-red-100">
                {errorMsg}
              </div>
            )}

            <button
              type="button"
              onClick={handleConfirm}
              disabled={isPending}
              className="mt-6 w-full rounded-full bg-ink px-5 py-4 text-sm font-semibold text-white transition hover:bg-ink/90 disabled:opacity-50"
            >
              {isPending ? "Recording Verification..." : "I Agree & Confirm Application"}
            </button>
          </div>
        )}
      </SectionCard>
    </main>
  );
}
