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
          Supabase is not configured yet, so this page is showing sample review data.
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
        <div className="grid gap-4">
          <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">
              {submission.type}
            </p>
            <h2 className="mt-4 font-display text-3xl text-ink">{submission.horseName}</h2>
            <p className="mt-3 text-sm leading-7 text-steel">{submission.detail}</p>
            <p className="mt-3 text-sm text-steel">Submitted: {submission.submittedAtLabel}</p>
          </div>

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
      ) : null}

      <div className="mt-8">
        <Link
          href="/data-entry/submissions"
          className="rounded-full border border-ink/10 bg-sand px-4 py-2 text-sm font-semibold text-ink"
        >
          Back to submissions
        </Link>
      </div>
    </SectionCard>
  );
}
