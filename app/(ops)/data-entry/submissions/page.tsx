import Link from "next/link";
import { SectionCard } from "@/components/layout/section-card";
import { getRecentOperationSubmissions } from "@/lib/domain/operations";

export default async function SubmissionReviewPage() {
  const result = await getRecentOperationSubmissions();
  const dailyCount = result.submissions.filter((item) => item.id.startsWith("daily-")).length;
  const feedingCount = result.submissions.filter((item) => item.id.startsWith("feeding-")).length;
  const trackCount = result.submissions.filter((item) => item.id.startsWith("track-")).length;
  const reviewMode = !result.envReady
    ? "Preview queue"
    : result.submissions.length > 0
      ? "Live review"
      : "Waiting for submissions";

  return (
    <SectionCard
      eyebrow="Ops Submissions"
      title="Recent submission review"
      description="Review the latest operational submissions, jump into correction flows, and keep the stable activity feed moving cleanly."
    >
      {!result.envReady ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          The submission review board is currently running in preview mode, so curated sample records are shown while live operational submissions are still being connected.
        </div>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-4">
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">All submissions</p>
          <p className="mt-4 font-display text-4xl text-ink">{result.submissions.length}</p>
          <p className="mt-3 text-sm leading-7 text-steel">Current review items returned by the operations feed.</p>
        </div>
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Daily</p>
          <p className="mt-4 font-display text-4xl text-ink">{dailyCount}</p>
          <p className="mt-3 text-sm leading-7 text-steel">Daily records awaiting inspection or correction.</p>
        </div>
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Feeding</p>
          <p className="mt-4 font-display text-4xl text-ink">{feedingCount}</p>
          <p className="mt-3 text-sm leading-7 text-steel">Feeding logs visible in the current review set.</p>
        </div>
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Track</p>
          <p className="mt-4 font-display text-4xl text-ink">{trackCount}</p>
          <p className="mt-3 text-sm leading-7 text-steel">Track session items available for correction.</p>
        </div>
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Review mode</p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-ink">{reviewMode}</p>
          <p className="mt-3 text-sm leading-7 text-steel">
            {!result.envReady
              ? "Use this queue to review layout, correction entry, and workflow handoff before live ops data is fully wired."
              : "This queue reflects the latest operational records currently available for review and correction."}
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-4">
          {result.submissions.length === 0 ? (
            <div className="rounded-[1.75rem] border border-ink/10 bg-white p-5 text-sm text-steel shadow-panel">
              No submissions are available yet.
            </div>
          ) : (
            result.submissions.map((submission) => (
              <div
                key={submission.id}
                className="rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-panel"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">
                      {submission.type}
                    </p>
                    <h2 className="mt-3 font-display text-3xl text-ink">{submission.horseName}</h2>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-steel">{submission.detail}</p>
                    <p className="mt-3 text-sm leading-7 text-steel">
                      Review focus: confirm captured values, preserve context in notes, and move only trusted corrections forward.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={`/data-entry/submissions/${submission.id}`}
                      className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white"
                    >
                      Review submission
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="grid gap-6">
          <div className="rounded-[1.75rem] border border-ink/10 bg-white p-6 shadow-panel">
            <p className="eyebrow">Queue guidance</p>
            <h2 className="mt-3 font-display text-2xl text-ink">How to use this board</h2>
            <div className="mt-5 grid gap-3">
              <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-ink">
                Review daily records for core health and hydration values.
              </div>
              <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-ink">
                Review feeding logs for ration context and menu-linked notes.
              </div>
              <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-ink">
                Review track sessions for distance, duration, surface, and session-type accuracy.
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-ink/10 bg-white p-6 shadow-panel">
            <p className="eyebrow">Next routes</p>
            <h2 className="mt-3 font-display text-2xl text-ink">Continue operations</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/data-entry"
                className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white"
              >
                Daily entry
              </Link>
              <Link
                href="/data-entry/feeding"
                className="rounded-full border border-ink/10 bg-sand px-4 py-2 text-sm font-semibold text-ink"
              >
                Feeding
              </Link>
              <Link
                href="/data-entry/track"
                className="rounded-full border border-ink/10 bg-sand px-4 py-2 text-sm font-semibold text-ink"
              >
                Track
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
