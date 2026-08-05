"use client";

import Link from "next/link";
import { FormEvent, useMemo, useRef, useState } from "react";
import { parseEnquiryPayload, type EnquiryFieldErrors } from "@/lib/enquiries/contract";

const initialValues = {
  trainerName: "",
  stableName: "",
  stableAddress: "",
  phone: "",
  email: "",
  horseVolume: "",
  referredBy: "",
  acknowledgement: false,
  website: "",
};

export function TrainerEnquiryForm({ submissionAvailable }: { submissionAvailable: boolean }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<EnquiryFieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "received">("idle");
  const [message, setMessage] = useState("");
  const [reference, setReference] = useState("");
  const requestId = useRef("");
  const summaryRef = useRef<HTMLDivElement>(null);
  const errorSummary = useMemo(() => Object.entries(errors), [errors]);

  function update(name: keyof typeof values, value: string | boolean) {
    setValues((current) => ({ ...current, [name]: value }));
    if (status !== "idle") setStatus("idle");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setReference("");
    if (!requestId.current) requestId.current = crypto.randomUUID();
    const candidate = { ...values, requestId: requestId.current };
    const parsed = parseEnquiryPayload(candidate);
    if (!parsed.ok) {
      setErrors(parsed.fields);
      setStatus("error");
      setMessage("Review the highlighted details before sending.");
      queueMicrotask(() => summaryRef.current?.focus());
      return;
    }
    if (!submissionAvailable) {
      setErrors({});
      setStatus("error");
      setMessage("Online enquiries are temporarily unavailable. Please use the published contact method.");
      return;
    }
    setErrors({});
    setStatus("sending");
    setMessage("Sending your enquiry securely.");
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(candidate),
      });
      const result = await response.json() as { result?: string; message?: string; reference?: string; fields?: EnquiryFieldErrors };
      if (response.ok && result.result === "received" && result.reference) {
        setStatus("received");
        setReference(result.reference);
        setMessage("Enquiry received. Keep this reference if you need to ask about, correct or delete your enquiry.");
        setValues(initialValues);
        requestId.current = "";
        return;
      }
      setErrors(result.fields ?? {});
      setStatus("error");
      setMessage(result.message ?? "Online enquiries are temporarily unavailable. Please try again later.");
      queueMicrotask(() => summaryRef.current?.focus());
    } catch {
      setStatus("error");
      setMessage("Online enquiries are temporarily unavailable. Please try again later.");
    }
  }

  const fieldClass = "mt-2 min-h-12 w-full rounded-md border border-technical/20 bg-white px-4 py-3 text-base text-technical shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/35";

  return (
    <form className="rounded-xl bg-white p-5 text-technical shadow-panel md:p-8" noValidate onSubmit={submit} aria-busy={status === "sending"}>
      <div className="flex flex-col gap-3 border-b border-technical/10 pb-5 md:flex-row md:items-start md:justify-between">
        <div><p className="eyebrow">Consultation enquiry</p><h3 className="mt-3 font-display text-3xl">Tell us about your stable</h3></div>
        <span className={`rounded-full px-3 py-2 text-xs font-bold ${submissionAvailable ? "bg-success/15 text-brand" : "bg-warning/15 text-technical"}`}>
          {submissionAvailable ? "Secure online enquiry" : "Online submission unavailable"}
        </span>
      </div>

      <p className="mt-5 text-sm leading-6 text-muted">Fields marked <span aria-hidden="true">*</span><span className="sr-only">required</span> are required. Stable address and person referred by are optional.</p>

      {errorSummary.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} className="mt-5 rounded-md border border-danger bg-danger/10 p-4 focus:outline-none focus:ring-2 focus:ring-danger" role="alert" aria-labelledby="enquiry-errors">
          <p id="enquiry-errors" className="font-semibold">Please correct the following:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">{errorSummary.map(([field, error]) => <li key={field}><a className="underline" href={`#${field}`}>{error}</a></li>)}</ul>
        </div>
      )}

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <Field label="Trainer name" name="trainerName" value={values.trainerName} error={errors.trainerName} onChange={update} className={fieldClass} required maxLength={120} autoComplete="name" />
        <Field label="Stable name" name="stableName" value={values.stableName} error={errors.stableName} onChange={update} className={fieldClass} required maxLength={160} autoComplete="organization" />
        <Field label="Phone number" name="phone" type="tel" value={values.phone} error={errors.phone} onChange={update} className={fieldClass} required maxLength={40} autoComplete="tel" />
        <Field label="Email address" name="email" type="email" value={values.email} error={errors.email} onChange={update} className={fieldClass} required maxLength={254} autoComplete="email" />
        <Field label="Approximate horse volume" name="horseVolume" type="number" value={values.horseVolume} error={errors.horseVolume} onChange={update} className={fieldClass} required min="1" max="9999" inputMode="numeric" />
        <Field label="Person referred by (optional)" name="referredBy" value={values.referredBy} error={errors.referredBy} onChange={update} className={fieldClass} maxLength={160} autoComplete="off" />
      </div>

      <label className="mt-5 block text-sm font-semibold" htmlFor="stableAddress">Stable address <span className="font-normal text-muted">(optional)</span></label>
      <textarea id="stableAddress" name="stableAddress" rows={3} maxLength={500} value={values.stableAddress} onChange={(event) => update("stableAddress", event.target.value)} aria-invalid={Boolean(errors.stableAddress)} aria-describedby={errors.stableAddress ? "stableAddress-error" : undefined} className={`${fieldClass} ${errors.stableAddress ? "border-danger" : ""}`} autoComplete="street-address" />
      {errors.stableAddress && <p id="stableAddress-error" className="mt-2 text-sm font-semibold text-danger">{errors.stableAddress}</p>}

      <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(event) => update("website", event.target.value)} />
      </div>

      <div className="mt-6 rounded-md bg-canvas p-4 text-sm leading-6 text-muted">
        <label className="flex items-start gap-3" htmlFor="acknowledgement">
          <input id="acknowledgement" name="acknowledgement" type="checkbox" checked={values.acknowledgement} onChange={(event) => update("acknowledgement", event.target.checked)} aria-invalid={Boolean(errors.acknowledgement)} aria-describedby={errors.acknowledgement ? "acknowledgement-error" : "enquiry-collection-notice"} className="mt-1 h-5 w-5 shrink-0 accent-brand" />
          <span id="enquiry-collection-notice">I have read the <Link href="/privacy" className="font-semibold text-brand underline underline-offset-4">Privacy notice</Link> and allow Aprec8 Pty Ltd trading as Precision Performance to use these details only to answer this enquiry. This is not marketing consent.</span>
        </label>
        {errors.acknowledgement && <p id="acknowledgement-error" className="mt-2 text-sm font-semibold text-danger">{errors.acknowledgement}</p>}
      </div>

      <button type="submit" disabled={!submissionAvailable || status === "sending"} className="mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-technical disabled:cursor-not-allowed disabled:opacity-55">
        {status === "sending" ? "Sending enquiry…" : "Send enquiry"}
      </button>
      <div className="mt-4 min-h-12 text-sm font-semibold leading-6" role="status" aria-live="polite" aria-atomic="true">
        {message && <p>{message}</p>}
        {reference && <p className="mt-2 font-mono text-base text-brand">Reference: {reference}</p>}
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: keyof typeof initialValues;
  value: string;
  error?: string;
  onChange: (name: keyof typeof initialValues, value: string | boolean) => void;
  className: string;
  type?: string;
  required?: boolean;
  min?: string;
  max?: string;
  maxLength?: number;
  autoComplete?: string;
  inputMode?: "numeric";
};

function Field({ label, name, value, error, onChange, className, type = "text", required, min, max, maxLength, autoComplete, inputMode }: FieldProps) {
  const errorId = `${name}-error`;
  return (
    <div>
      <label className="block text-sm font-semibold" htmlFor={name}>{label}{required && <span aria-hidden="true"> *</span>}</label>
      <input id={name} name={name} type={type} min={min} max={max} maxLength={maxLength} required={required} value={value} autoComplete={autoComplete} inputMode={inputMode} onChange={(event) => onChange(name, event.target.value)} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} className={`${className} ${error ? "border-danger" : ""}`} />
      {error && <p id={errorId} className="mt-2 text-sm font-semibold text-danger">{error}</p>}
    </div>
  );
}
