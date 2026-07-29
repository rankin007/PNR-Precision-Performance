"use client";

import { FormEvent, useMemo, useState } from "react";

type FieldName = "trainerName" | "stableName" | "phone" | "email" | "horseVolume";
type Errors = Partial<Record<FieldName, string>>;

const initialValues = {
  trainerName: "",
  stableName: "",
  stableAddress: "",
  phone: "",
  email: "",
  horseVolume: "",
  referredBy: "",
};

export function TrainerEnquiryForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [reviewMessage, setReviewMessage] = useState("");

  const errorSummary = useMemo(() => Object.values(errors), [errors]);

  function update(name: keyof typeof values, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
  }

  function validate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Errors = {};
    if (!values.trainerName.trim()) next.trainerName = "Enter the trainer's name.";
    if (!values.stableName.trim()) next.stableName = "Enter the stable name.";
    if (!values.phone.trim()) next.phone = "Enter a contact phone number.";
    if (!/^\S+@\S+\.\S+$/.test(values.email)) next.email = "Enter a valid email address.";
    if (!values.horseVolume.trim() || Number(values.horseVolume) < 1) {
      next.horseVolume = "Enter an approximate horse volume of one or more.";
    }
    setErrors(next);
    setReviewMessage(
      Object.keys(next).length === 0
        ? "The presentation is complete. Submission remains unavailable until the privacy, storage and email-delivery requirements are approved. No information has been sent or saved."
        : "Review the highlighted fields. No information has been sent or saved.",
    );
  }

  const fieldClass =
    "mt-2 min-h-12 w-full rounded-md border border-technical/20 bg-white px-4 py-3 text-base text-technical shadow-sm";

  return (
    <form className="rounded-xl bg-white p-5 text-technical shadow-panel md:p-8" noValidate onSubmit={validate}>
      <div className="flex flex-col gap-3 border-b border-technical/10 pb-5 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="eyebrow">Consultation enquiry</p>
          <h3 className="mt-3 font-display text-3xl">Tell us about your stable</h3>
        </div>
        <span className="rounded-full bg-warning/15 px-3 py-2 text-xs font-bold text-technical">
          Online submission unavailable
        </span>
      </div>

      {errorSummary.length > 0 && (
        <div className="mt-5 rounded-md border border-danger bg-danger/10 p-4" role="alert" aria-labelledby="enquiry-errors">
          <p id="enquiry-errors" className="font-semibold">Please correct the following:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
            {errorSummary.map((error) => <li key={error}>{error}</li>)}
          </ul>
        </div>
      )}

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <Field label="Trainer name" name="trainerName" value={values.trainerName} error={errors.trainerName} onChange={update} className={fieldClass} required />
        <Field label="Stable name" name="stableName" value={values.stableName} error={errors.stableName} onChange={update} className={fieldClass} required />
        <Field label="Phone number" name="phone" type="tel" value={values.phone} error={errors.phone} onChange={update} className={fieldClass} required />
        <Field label="Email address" name="email" type="email" value={values.email} error={errors.email} onChange={update} className={fieldClass} required />
        <Field label="Approximate horse volume" name="horseVolume" type="number" value={values.horseVolume} error={errors.horseVolume} onChange={update} className={fieldClass} required min="1" />
        <Field label="Person referred by" name="referredBy" value={values.referredBy} onChange={update} className={fieldClass} />
      </div>

      <label className="mt-5 block text-sm font-semibold" htmlFor="stableAddress">
        Stable address <span className="font-normal text-muted">(optional while collection requirements are unresolved)</span>
      </label>
      <textarea id="stableAddress" name="stableAddress" rows={3} value={values.stableAddress} onChange={(event) => update("stableAddress", event.target.value)} className={fieldClass} />

      <div className="mt-6 rounded-md bg-canvas p-4 text-sm leading-6 text-muted">
        This form does not transmit, store, email or log information. Online submission will remain unavailable until the privacy notice, consent, recipient, storage, retention, access, deletion and spam-control requirements are approved.
      </div>
      <button type="submit" className="mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-technical">
        Check enquiry details
      </button>
      {reviewMessage && <p className="mt-4 text-sm font-semibold leading-6" role="status" aria-live="polite">{reviewMessage}</p>}
    </form>
  );
}

type FieldProps = {
  label: string;
  name: keyof typeof initialValues;
  value: string;
  error?: string;
  onChange: (name: keyof typeof initialValues, value: string) => void;
  className: string;
  type?: string;
  required?: boolean;
  min?: string;
};

function Field({ label, name, value, error, onChange, className, type = "text", required, min }: FieldProps) {
  const errorId = `${name}-error`;
  return (
    <div>
      <label className="block text-sm font-semibold" htmlFor={name}>
        {label}{required && <span aria-hidden="true"> *</span>}
      </label>
      <input id={name} name={name} type={type} min={min} required={required} value={value} onChange={(event) => onChange(name, event.target.value)} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} className={`${className} ${error ? "border-danger" : ""}`} />
      {error && <p id={errorId} className="mt-2 text-sm font-semibold text-danger">{error}</p>}
    </div>
  );
}
