import Link from "next/link";
import { SectionCard } from "@/components/layout/section-card";
import { getRecentOperationSubmissions } from "@/lib/domain/operations";

export default async function SubmissionReviewPage() {
  const result = await getRecentOperationSubmissions();

  return (
    <SectionCard
      eyebrow="Ops Submissions"
      title="Recent submission review"
      description="Use this page to review the latest operational submissions before fuller edit-history and approval workflows are connected."
    >
      {!result.envReady ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Supabase is not configured yet, so sample submission records are shown.
        </div>
      ) : null}
      <div className="mt-8 grid gap-4">
        {result.submissions.map((submission) => (
          <div
            key={submission.id}
            className="rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-panel"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">
              {submission.type}
            </p>
            <h2 className="mt-3 font-display text-3xl text-ink">{submission.horseName}</h2>
            <p className="mt-3 text-sm leading-7 text-steel">{submission.detail}</p>
            <div className="mt-5">
              <Link
                href={`/data-entry/submissions/${submission.id}`}
                className="rounded-full border border-ink/10 bg-sand px-4 py-2 text-sm font-semibold text-ink"
              >
                Review submission
              </Link>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

