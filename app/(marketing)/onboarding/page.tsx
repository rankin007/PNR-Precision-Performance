"use client";

import { useState } from "react";
import { submitOnboardingForm } from "./actions";
import { SectionCard } from "@/components/layout/section-card";

export default function OnboardingPage() {
  const [isPending, setIsPending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    setStatus("idle");
    setErrorMsg("");

    const result = await submitOnboardingForm(formData);

    if (result?.error) {
      setErrorMsg(result.error);
      setStatus("error");
    } else if (result?.success) {
      setStatus("success");
    }

    setIsPending(false);
  }

  return (
    <main className="section-wrap px-4 py-16 md:px-8">
      <SectionCard
        eyebrow="Apply Now"
        title="Client Onboarding Application"
        description="Join Precision Performance. Complete the form below to begin tracking elite equine metrics with an unparalleled degree of detail."
      >
        {status === "success" ? (
          <div className="rounded-2xl border border-ink/10 bg-sand p-8 text-center text-ink">
              <h2 className="mb-4 font-display text-2xl">Application Received</h2>
              <p className="text-steel">
                Thank you for your application. We&apos;ve sent a verification email to your direct email address.
              <br />
              <br />
              <strong>Please check your inbox</strong> and click the link to confirm your application and agree to the clinical disclaimer.
            </p>
          </div>
        ) : (
          <form action={handleSubmit} className="mx-auto max-w-xl space-y-5">
            {status === "error" && (
              <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 border border-red-100">
                {errorMsg}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label htmlFor="clientName" className="mb-2 block text-sm font-semibold text-ink">
                  Client Name <span className="text-ember">*</span>
                </label>
                <input
                  type="text"
                  id="clientName"
                  name="clientName"
                  required
                  className="w-full rounded-lg border border-ink/20 px-4 py-3 outline-none focus:border-ink"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="businessName" className="mb-2 block text-sm font-semibold text-ink">
                  Business Name
                </label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  className="w-full rounded-lg border border-ink/20 px-4 py-3 outline-none focus:border-ink"
                  placeholder="e.g. Doe Racing Stables (Optional)"
                />
              </div>

              <div>
                <label htmlFor="stableAddress" className="mb-2 block text-sm font-semibold text-ink">
                  Stable Address <span className="text-ember">*</span>
                </label>
                <textarea
                  id="stableAddress"
                  name="stableAddress"
                  required
                  rows={2}
                  className="w-full rounded-lg border border-ink/20 px-4 py-3 outline-none focus:border-ink"
                  placeholder="123 Trackside Rd"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="directEmail" className="mb-2 block text-sm font-semibold text-ink">
                    Direct Email <span className="text-ember">*</span>
                  </label>
                  <input
                    type="email"
                    id="directEmail"
                    name="directEmail"
                    required
                    className="w-full rounded-lg border border-ink/20 px-4 py-3 outline-none focus:border-ink"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="adminEmail" className="mb-2 block text-sm font-semibold text-ink">
                    Admin / Billing Email
                  </label>
                  <input
                    type="email"
                    id="adminEmail"
                    name="adminEmail"
                    className="w-full rounded-lg border border-ink/20 px-4 py-3 outline-none focus:border-ink"
                    placeholder="admin@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="mobileNumber" className="mb-2 block text-sm font-semibold text-ink">
                  Mobile Number <span className="text-ember">*</span>
                </label>
                <input
                  type="tel"
                  id="mobileNumber"
                  name="mobileNumber"
                  required
                  className="w-full rounded-lg border border-ink/20 px-4 py-3 outline-none focus:border-ink"
                  placeholder="+61 400 000 000"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="mt-6 w-full rounded-full bg-ink px-5 py-4 text-sm font-semibold text-white transition hover:bg-ink/90 disabled:opacity-50"
            >
              {isPending ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        )}
      </SectionCard>
    </main>
  );
}
