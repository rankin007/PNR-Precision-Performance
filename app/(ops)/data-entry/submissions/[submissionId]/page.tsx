import Link from "next/link";
import {
  updateDailyRecordSubmissionAction,
  updateFeedingLogSubmissionAction,
  updateTrackSessionSubmissionAction,
} from "@/app/(ops)/data-entry/actions";
import { SectionCard } from "@/components/layout/section-card";
import { getSubmissionDetail } from "@/lib/domain/operations";

type SubmissionDetailPageProps = {
  params: Promise<{ submissionId: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function pickValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function SubmissionDetailPage({
  params,
  searchParams,
}: SubmissionDetailPageProps) {
  const { submissionId } = await params;
  const query = searchParams ? await searchParams : {};
  const saved = pickValue(query.saved);
  const error = pickValue(query.error);
  const result = await getSubmissionDetail(submissionId);
  const submission = result.submission;
  const reviewMode = !result.envReady ? "Preview review" : submission ? "Live correction" : "Unavailable";

  return (
    <SectionCard
      eyebrow="Submission Review"
      title={submission ? `${submission.type} review` : "Submission not found"}
      description={
        submission
          ? "Review the submission, correct operational fields, and keep the record ready for future audit and approval workflows."
          : "This submission could not be resolved from the available operational data."
      }
    >
      {!result.envReady ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          This review page is currently running in preview mode, so sample correction data is being shown while live submission records are still being connected.
        </div>
      ) : null}

      {saved ? (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Submission changes saved.
        </div>
      ) : null}

      {error ? (
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {error === "update-failed"
            ? "The submission update did not complete."
            : "A required field was missing for this correction flow."}
        </div>
      ) : null}

      {submission ? (
        <div className="grid gap-6">
          <div className="grid gap-4 lg:grid-cols-4">
            <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5 lg:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">
                {submission.type}
              </p>
              <h2 className="mt-4 font-display text-3xl text-ink">{submission.horseName}</h2>
              <p className="mt-3 text-sm leading-7 text-steel">{submission.detail}</p>
            </div>
            <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Submitted</p>
              <p className="mt-4 text-sm font-semibold text-ink">{submission.submittedAtLabel}</p>
              <p className="mt-3 text-sm leading-7 text-steel">Current review timestamp for this record.</p>
            </div>
            <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Submission type</p>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-ink">
                {submission.submissionType}
              </p>
              <p className="mt-3 text-sm leading-7 text-steel">Correction fields below are tailored to this entry type.</p>
            </div>
            <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Review mode</p>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-ink">{reviewMode}</p>
              <p className="mt-3 text-sm leading-7 text-steel">
                {!result.envReady
                  ? "Use this page to validate form layout, correction flow, and review guidance before live records are wired in."
                  : "This page is ready to act as the trusted correction surface for the selected operational record."}
              </p>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="grid gap-4">
              {submission.submissionType === "daily" ? (
                <form
                  action={updateDailyRecordSubmissionAction}
                  className="rounded-[1.75rem] border border-ink/10 bg-white p-6 shadow-panel"
                >
                  <input type="hidden" name="submissionId" value={submission.id} />
                  <input type="hidden" name="entityId" value={submission.entityId} />
                  <input type="hidden" name="horseId" value={submission.horseId ?? ""} />
                  <h3 className="font-display text-2xl text-ink">Correct daily record</h3>
                  <div className="mt-5 grid gap-4 md:grid-cols-3">
                    <label className="grid gap-2 text-sm font-medium text-ink">
                      Temperature (C)
                      <input
                        name="temperatureValue"
                        type="number"
                        step="0.01"
                        defaultValue={submission.temperatureValue ?? ""}
                        className="rounded-2xl border border-ink/10 bg-sand px-4 py-3"
                      />
                    </label>
                    <label className="grid gap-2 text-sm font-medium text-ink">
                      Weight (kg)
                      <input
                        name="weightValue"
                        type="number"
                        step="0.01"
                        defaultValue={submission.weightValue ?? ""}
                        className="rounded-2xl border border-ink/10 bg-sand px-4 py-3"
                      />
                    </label>
                    <label className="grid gap-2 text-sm font-medium text-ink">
                      Water intake (L)
                      <input
                        name="waterValue"
                        type="number"
                        step="0.01"
                        defaultValue={submission.waterValue ?? ""}
                        className="rounded-2xl border border-ink/10 bg-sand px-4 py-3"
                      />
                    </label>
                  </div>
                  <label className="mt-4 grid gap-2 text-sm font-medium text-ink">
                    Notes
                    <textarea
                      name="notes"
                      defaultValue={submission.notes}
                      rows={5}
                      className="rounded-[1.5rem] border border-ink/10 bg-sand px-4 py-3"
                    />
                  </label>
                  <button
                    type="submit"
                    className="mt-5 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
                  >
                    Save daily corrections
                  </button>
                </form>
              ) : null}

              {submission.submissionType === "feeding" ? (
                <form
                  action={updateFeedingLogSubmissionAction}
                  className="rounded-[1.75rem] border border-ink/10 bg-white p-6 shadow-panel"
                >
                  <input type="hidden" name="submissionId" value={submission.id} />
                  <input type="hidden" name="entityId" value={submission.entityId} />
                  <h3 className="font-display text-2xl text-ink">Correct feeding log</h3>
                  <p className="mt-3 text-sm text-steel">
                    Menu: {submission.foodMenuName || "No menu linked"}
                  </p>
                  <label className="mt-4 grid gap-2 text-sm font-medium text-ink">
                    Notes
                    <textarea
                      name="notes"
                      defaultValue={submission.notes}
                      rows={5}
                      className="rounded-[1.5rem] border border-ink/10 bg-sand px-4 py-3"
                    />
                  </label>
                  <button
                    type="submit"
                    className="mt-5 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
                  >
                    Save feeding corrections
                  </button>
                </form>
              ) : null}

              {submission.submissionType === "track" ? (
                <form
                  action={updateTrackSessionSubmissionAction}
                  className="rounded-[1.75rem] border border-ink/10 bg-white p-6 shadow-panel"
                >
                  <input type="hidden" name="submissionId" value={submission.id} />
                  <input type="hidden" name="entityId" value={submission.entityId} />
                  <h3 className="font-display text-2xl text-ink">Correct track session</h3>
                  <div className="mt-5 grid gap-4 md:grid-cols-3">
                    <label className="grid gap-2 text-sm font-medium text-ink">
                      Session type
                      <input
                        name="sessionType"
                        defaultValue={submission.sessionType ?? ""}
                        className="rounded-2xl border border-ink/10 bg-sand px-4 py-3"
                      />
                    </label>
                    <label className="grid gap-2 text-sm font-medium text-ink">
                      Distance (m)
                      <input
                        name="distanceValue"
                        type="number"
                        step="0.01"
                        defaultValue={submission.distanceValue ?? ""}
                        className="rounded-2xl border border-ink/10 bg-sand px-4 py-3"
                      />
                    </label>
                    <label className="grid gap-2 text-sm font-medium text-ink">
                      Duration (sec)
                      <input
                        name="durationSeconds"
                        type="number"
                        defaultValue={submission.durationSeconds ?? ""}
                        className="rounded-2xl border border-ink/10 bg-sand px-4 py-3"
                      />
                    </label>
                  </div>
                  <label className="mt-4 grid gap-2 text-sm font-medium text-ink">
                    Surface
                    <input
                      name="surface"
                      defaultValue={submission.surface ?? ""}
                      className="rounded-2xl border border-ink/10 bg-sand px-4 py-3"
                    />
                  </label>
                  <label className="mt-4 grid gap-2 text-sm font-medium text-ink">
                    Notes
                    <textarea
                      name="notes"
                      defaultValue={submission.notes}
                      rows={5}
                      className="rounded-[1.5rem] border border-ink/10 bg-sand px-4 py-3"
                    />
                  </label>
                  <button
                    type="submit"
                    className="mt-5 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
                  >
                    Save track corrections
                  </button>
                </form>
              ) : null}
            </div>

            <div className="grid gap-6">
              <div className="rounded-[1.75rem] border border-ink/10 bg-white p-6 shadow-panel">
                <p className="eyebrow">Review Guidance</p>
                <h3 className="mt-3 font-display text-2xl text-ink">What to check</h3>
                <div className="mt-5 grid gap-3 text-sm leading-7 text-steel">
                  <p className="rounded-2xl border border-ink/10 bg-sand px-4 py-4">
                    Confirm the horse, session type, and captured values still match the real-world event.
                  </p>
                  <p className="rounded-2xl border border-ink/10 bg-sand px-4 py-4">
                    Use notes to preserve operational context rather than overwriting it with minimal corrections.
                  </p>
                  <p className="rounded-2xl border border-ink/10 bg-sand px-4 py-4">
                    Save only the values that should become the latest trusted record for downstream reports.
                  </p>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-ink/10 bg-white p-6 shadow-panel">
                <p className="eyebrow">Record readiness</p>
                <h3 className="mt-3 font-display text-2xl text-ink">Operational intent</h3>
                <div className="mt-5 grid gap-3 text-sm leading-7 text-steel">
                  <p className="rounded-2xl border border-ink/10 bg-sand px-4 py-4">
                    Daily records should leave with trusted temperature, weight, water, and context notes.
                  </p>
                  <p className="rounded-2xl border border-ink/10 bg-sand px-4 py-4">
                    Feeding logs should preserve menu context and any intake or behaviour observations.
                  </p>
                  <p className="rounded-2xl border border-ink/10 bg-sand px-4 py-4">
                    Track sessions should preserve session type, distance, duration, surface, and performance notes.
                  </p>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-ink/10 bg-white p-6 shadow-panel">
                <p className="eyebrow">Quick Navigation</p>
                <h3 className="mt-3 font-display text-2xl text-ink">Continue working</h3>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href="/data-entry/submissions"
                    className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white"
                  >
                    Back to submissions
                  </Link>
                  <Link
                    href="/data-entry"
                    className="rounded-full border border-ink/10 bg-sand px-4 py-2 text-sm font-semibold text-ink"
                  >
                    Daily entry
                  </Link>
                  <Link
                    href="/portal/reports"
                    className="rounded-full border border-ink/10 bg-sand px-4 py-2 text-sm font-semibold text-ink"
                  >
                    Member reports
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-[1.75rem] border border-ink/10 bg-white p-6 text-sm text-steel shadow-panel">
          This submission could not be found in the current review dataset.
        </div>
      )}
    </SectionCard>
  );
}
