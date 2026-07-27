"use client";

import { useMemo, useRef, useState } from "react";
import type { submitBiochemistryTestAction } from "@/app/(ops)/data-entry/biochemistry/actions";
import { Notice } from "@/components/ui/notice";
import {
  BIOCHEMISTRY_NOTES_LIMIT,
  BIOCHEMISTRY_NUMERIC_FIELDS,
  BIOCHEMISTRY_TIME_OF_DAY_OPTIONS,
  EMPTY_BIOCHEMISTRY_CAPTURE_VALUES,
  type BiochemistryCaptureValues,
  type BiochemistryFieldError,
  type BiochemistryFieldName,
  type BiochemistryWorkflowStage,
  biochemistryServerErrorMessage,
  timeOfDayLabel,
  validateBiochemistryCaptureValues,
} from "@/components/ops/biochemistry-workflow-state";

type HorseOption = {
  id: string;
  name: string;
};

type BiochemistryCaptureWorkflowProps = {
  horses: HorseOption[];
  envReady: boolean;
  serverError?: string;
  action: typeof submitBiochemistryTestAction;
};

function errorId(field: BiochemistryFieldName) {
  return `${field}-error`;
}

function firstErrorFor(errors: BiochemistryFieldError[], field: BiochemistryFieldName) {
  return errors.find((error) => error.field === field);
}

export function BiochemistryCaptureWorkflow({
  horses,
  envReady,
  serverError,
  action,
}: BiochemistryCaptureWorkflowProps) {
  const [stage, setStage] = useState<BiochemistryWorkflowStage>("capture");
  const [values, setValues] = useState<BiochemistryCaptureValues>(EMPTY_BIOCHEMISTRY_CAPTURE_VALUES);
  const [errors, setErrors] = useState<BiochemistryFieldError[]>([]);
  const [submitLocked, setSubmitLocked] = useState(false);
  const submittedRef = useRef(false);
  const serverMessage = biochemistryServerErrorMessage(serverError);
  const unavailable = !envReady;
  const noHorses = horses.length === 0;
  const selectedHorseName = useMemo(
    () => horses.find((horse) => horse.id === values.horseId)?.name ?? values.horseName,
    [horses, values.horseId, values.horseName],
  );

  function updateField(field: BiochemistryFieldName, value: string) {
    setValues((current) => {
      if (field === "horseId") {
        return {
          ...current,
          horseId: value,
          horseName: horses.find((horse) => horse.id === value)?.name ?? "",
        };
      }

      return { ...current, [field]: value };
    });
    setErrors((current) => current.filter((error) => error.field !== field));
  }

  function moveToReview() {
    const result = validateBiochemistryCaptureValues(values);
    if (!result.ok) {
      setErrors(result.errors);
      setStage("capture");
      const firstField = result.errors[0]?.field;
      if (firstField) document.getElementById(String(firstField))?.focus();
      return;
    }

    setValues({ ...result.values, horseName: selectedHorseName });
    setErrors([]);
    setStage("review");
  }

  function editCapture() {
    setSubmitLocked(false);
    submittedRef.current = false;
    setStage("capture");
  }

  function handleSubmit() {
    if (submittedRef.current) {
      return false;
    }

    submittedRef.current = true;
    setSubmitLocked(true);
    setStage("submitting");
    return true;
  }

  const stageLabel = stage === "capture"
    ? "Step 1 of 2: capture values"
    : stage === "review"
      ? "Step 2 of 2: review before submit"
      : "Submitting test...";

  return (
    <div className="grid gap-6">
      <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-sm font-semibold text-ink">
        <span className="sr-only">Current workflow stage: </span>
        {stageLabel}
      </div>

      {unavailable ? (
        <Notice tone="warning" title="Live capture unavailable">
          Supabase is not configured yet. The typed workflow can be reviewed locally, but live submission is disabled.
        </Notice>
      ) : null}

      {noHorses && envReady ? (
        <Notice tone="warning" title="No writable horses available">
          No assigned horses are available for this account, so live submission is disabled.
        </Notice>
      ) : null}

      {serverMessage ? (
        <Notice tone="attention" title="Submission needs attention">
          {serverMessage} Return to capture, check the entered values, and try again when the blocker is resolved.
        </Notice>
      ) : null}

      {errors.length > 0 ? (
        <div
          id="biochemistry-error-summary"
          className="rounded-2xl border border-danger/35 bg-danger/10 px-4 py-3 text-sm text-technical"
          role="alert"
          tabIndex={-1}
        >
          <p className="font-semibold">Correct the highlighted fields before review.</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {errors.map((error) => (
              <li key={`${error.field}-${error.code}`}>
                <a className="underline" href={`#${error.field}`}>
                  {error.message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <form
        action={action}
        className="grid gap-6"
        onSubmit={(event) => {
          if (!handleSubmit()) event.preventDefault();
        }}
      >
        <input type="hidden" name="horseId" value={values.horseId} />
        <input type="hidden" name="testDate" value={values.testDate} />
        <input type="hidden" name="timeOfDay" value={values.timeOfDay} />
        <input type="hidden" name="carbsReading" value={values.carbsReading} />
        <input type="hidden" name="phSaliva" value={values.phSaliva} />
        <input type="hidden" name="phUrine" value={values.phUrine} />
        <input type="hidden" name="conductivityRawMeterValue" value={values.conductivityRawMeterValue} />
        <input type="hidden" name="ureaReading" value={values.ureaReading} />
        <input type="hidden" name="notes" value={values.notes} />

        {stage === "capture" ? (
          <CaptureFields
            values={values}
            horses={horses}
            errors={errors}
            disabled={false}
            updateField={updateField}
          />
        ) : (
          <ReviewFields values={{ ...values, horseName: selectedHorseName }} />
        )}

        <div className="grid gap-3 border-t border-ink/10 pt-5 sm:flex sm:items-center sm:justify-between">
          <p className="text-sm text-steel">
            Exact lookup only. Missing lookup rows block scoring rather than guessing.
          </p>
          <div className="flex flex-wrap gap-3">
            {stage !== "capture" ? (
              <button
                type="button"
                className="rounded-full border border-ink/15 bg-white px-5 py-3 text-sm font-semibold text-ink"
                onClick={editCapture}
                disabled={submitLocked}
              >
                Edit values
              </button>
            ) : null}
            {stage === "capture" ? (
              <button
                type="button"
                className="rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-technical focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-data"
                onClick={moveToReview}
                disabled={unavailable || noHorses}
                aria-disabled={unavailable || noHorses}
              >
                Review test
              </button>
            ) : (
              <button
                type="submit"
                className="rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-technical disabled:cursor-not-allowed disabled:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-data"
                disabled={submitLocked || unavailable || noHorses}
                aria-describedby="submit-limitation"
              >
                {submitLocked ? "Submitting test..." : "Submit test"}
              </button>
            )}
          </div>
        </div>
        <p id="submit-limitation" className="text-xs leading-5 text-steel">
          This screen prevents ordinary repeat taps during the current submission. Durable server idempotency is not claimed.
        </p>
      </form>
    </div>
  );
}

function CaptureFields({
  values,
  horses,
  errors,
  disabled,
  updateField,
}: {
  values: BiochemistryCaptureValues;
  horses: HorseOption[];
  errors: BiochemistryFieldError[];
  disabled: boolean;
  updateField: (field: BiochemistryFieldName, value: string) => void;
}) {
  return (
    <div className="grid gap-6">
      <section className="grid gap-4" aria-labelledby="context-heading">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Horse and test context</p>
          <h2 id="context-heading" className="mt-2 text-xl font-semibold text-ink">Identify this test</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-[1.4fr_1fr_1fr]">
          <FieldErrorWrapper field="horseId" errors={errors}>
            <label className="grid gap-2 text-sm font-medium text-ink" htmlFor="horseId">
              Horse
              <select
                id="horseId"
                value={values.horseId}
                disabled={disabled || horses.length === 0}
                required
                aria-invalid={Boolean(firstErrorFor(errors, "horseId"))}
                aria-describedby={firstErrorFor(errors, "horseId") ? errorId("horseId") : undefined}
                onChange={(event) => updateField("horseId", event.target.value)}
                className="min-h-12 rounded-xl border border-technical/20 bg-canvas px-4 py-3 text-base text-technical transition focus:border-data focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-data"
              >
                <option value="" disabled>Select a horse</option>
                {horses.map((horse) => (
                  <option key={horse.id} value={horse.id}>{horse.name}</option>
                ))}
              </select>
            </label>
          </FieldErrorWrapper>

          <FieldErrorWrapper field="testDate" errors={errors}>
            <label className="grid gap-2 text-sm font-medium text-ink" htmlFor="testDate">
              Test date
              <input
                id="testDate"
                value={values.testDate}
                type="date"
                required
                disabled={disabled}
                aria-invalid={Boolean(firstErrorFor(errors, "testDate"))}
                aria-describedby={firstErrorFor(errors, "testDate") ? errorId("testDate") : undefined}
                onChange={(event) => updateField("testDate", event.target.value)}
                className="min-h-12 rounded-xl border border-technical/20 bg-canvas px-4 py-3 text-base text-technical transition focus:border-data focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-data"
              />
            </label>
          </FieldErrorWrapper>

          <label className="grid gap-2 text-sm font-medium text-ink" htmlFor="timeOfDay">
            Time of day
            <select
              id="timeOfDay"
              value={values.timeOfDay}
              disabled={disabled}
              onChange={(event) => updateField("timeOfDay", event.target.value)}
              className="min-h-12 rounded-xl border border-technical/20 bg-canvas px-4 py-3 text-base text-technical transition focus:border-data focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-data"
            >
              {BIOCHEMISTRY_TIME_OF_DAY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className="grid gap-4 rounded-2xl border border-ink/10 bg-white p-4 shadow-panel" aria-labelledby="readings-heading">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Measurements</p>
          <h2 id="readings-heading" className="mt-2 text-xl font-semibold text-ink">Enter typed readings</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {BIOCHEMISTRY_NUMERIC_FIELDS.map(({ field, label, unit }) => (
            <FieldErrorWrapper key={field} field={field} errors={errors}>
              <label className="grid gap-2 text-sm font-medium text-ink" htmlFor={field}>
                {label}
                <span className="text-xs font-normal text-steel">{unit}</span>
                <input
                  id={field}
                  value={values[field]}
                  type="text"
                  inputMode="decimal"
                  required
                  disabled={disabled}
                  aria-invalid={Boolean(firstErrorFor(errors, field))}
                  aria-describedby={firstErrorFor(errors, field) ? errorId(field) : undefined}
                  onChange={(event) => updateField(field, event.target.value)}
                  className="min-h-12 rounded-xl border border-technical/20 bg-canvas px-4 py-3 text-base text-technical transition focus:border-data focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-data"
                />
              </label>
            </FieldErrorWrapper>
          ))}
        </div>
      </section>

      <section className="grid gap-4" aria-labelledby="notes-heading">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Optional typed notes</p>
          <h2 id="notes-heading" className="mt-2 text-xl font-semibold text-ink">Add context</h2>
        </div>
        <FieldErrorWrapper field="notes" errors={errors}>
          <label className="grid gap-2 text-sm font-medium text-ink" htmlFor="notes">
            Typed notes
            <textarea
              id="notes"
              value={values.notes}
              rows={5}
              maxLength={BIOCHEMISTRY_NOTES_LIMIT + 1}
              disabled={disabled}
              aria-invalid={Boolean(firstErrorFor(errors, "notes"))}
              aria-describedby={firstErrorFor(errors, "notes") ? `${errorId("notes")} notes-count` : "notes-count"}
              onChange={(event) => updateField("notes", event.target.value)}
              className="min-h-32 rounded-2xl border border-technical/20 bg-canvas px-4 py-3 text-base text-technical transition focus:border-data focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-data"
            />
          </label>
        </FieldErrorWrapper>
        <p id="notes-count" className="text-xs text-steel">
          {values.notes.length} / {BIOCHEMISTRY_NOTES_LIMIT} characters. Leave blank when no notes are needed.
        </p>
      </section>
    </div>
  );
}

function FieldErrorWrapper({
  field,
  errors,
  children,
}: {
  field: BiochemistryFieldName;
  errors: BiochemistryFieldError[];
  children: React.ReactNode;
}) {
  const error = firstErrorFor(errors, field);
  return (
    <div className="grid gap-2">
      {children}
      {error ? (
        <p id={errorId(field)} className="text-sm font-medium text-danger">
          {error.message}
        </p>
      ) : null}
    </div>
  );
}

function ReviewFields({ values }: { values: BiochemistryCaptureValues }) {
  const notes = values.notes.trim();
  return (
    <section className="grid gap-5 rounded-2xl border border-ink/10 bg-white p-4 shadow-panel" aria-labelledby="review-heading">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Review and submit</p>
        <h2 id="review-heading" className="mt-2 text-xl font-semibold text-ink">Confirm typed values</h2>
        <p className="mt-2 text-sm leading-6 text-steel">
          Review does not calculate production zones or recommendations.
        </p>
      </div>
      <dl className="grid gap-3 sm:grid-cols-2">
        <ReviewItem label="Horse" value={values.horseName || "Selected horse"} />
        <ReviewItem label="Test date" value={values.testDate} />
        <ReviewItem label="Time of day" value={timeOfDayLabel(values.timeOfDay)} />
        {BIOCHEMISTRY_NUMERIC_FIELDS.map(({ field, label, unit }) => (
          <ReviewItem key={field} label={`${label} (${unit})`} value={values[field]} />
        ))}
      </dl>
      <div className="rounded-2xl border border-ink/10 bg-sand p-4">
        <p className="text-sm font-semibold text-ink">Typed notes</p>
        <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-steel">
          {notes || "No notes added"}
        </p>
      </div>
    </section>
  );
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-sand p-4">
      <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-steel">{label}</dt>
      <dd className="mt-2 text-base font-semibold text-ink">{value}</dd>
    </div>
  );
}
