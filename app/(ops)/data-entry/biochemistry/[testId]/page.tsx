import Link from "next/link";
import {
  createBiochemistryCommentAction,
  deleteBiochemistryCommentAction,
  getBiochemistryResult,
  updateBiochemistryCommentAction,
} from "@/app/(ops)/data-entry/biochemistry/actions";
import { SectionCard } from "@/components/layout/section-card";
import { BiochemistryResultPanel } from "@/components/ops/biochemistry-result-panel";

type BiochemistryResultPageProps = {
  params: Promise<{ testId: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function pickValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function timeLabel(value: string) {
  if (value === "am") {
    return "AM";
  }

  if (value === "pm") {
    return "PM";
  }

  return "Unspecified";
}

function errorMessage(error: string | undefined) {
  switch (error) {
    case "schema-unavailable":
      return "The biochemistry schema is not available yet, so saved result detail cannot be loaded.";
    case "load-failed":
      return "The biochemistry result could not be loaded.";
    case "not-found":
      return "This biochemistry test could not be found.";
    default:
      return null;
  }
}

export default async function BiochemistryResultPage({
  params,
  searchParams,
}: BiochemistryResultPageProps) {
  const { testId } = await params;
  const query = searchParams ? await searchParams : {};
  const warning = pickValue(query.warning);
  const commentStatus = pickValue(query.comment);
  const result = await getBiochemistryResult(testId);
  const message = errorMessage(result.error);

  return (
    <SectionCard
      eyebrow="Biochemistry Result"
      title={result.test ? `${result.test.horseName} test result` : "Biochemistry result"}
      description="Review the saved scoring snapshot, blocked lookup state, and unavailable production zone/recommendation state."
    >
      {!result.envReady || !result.schemaReady ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          The biochemistry schema is not available in Supabase yet. Apply the approved Sprint 013 migration before live result review.
        </div>
      ) : null}

      {message ? (
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {message}
        </div>
      ) : null}

      {warning === "note-save-failed" ? (
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          The test was saved, but the manual note could not be attached.
        </div>
      ) : null}

      {result.test && result.scoringResult && result.zones && result.recommendations ? (
        <div className="grid gap-5">
          <div className="rounded-[1.5rem] border border-ink/10 bg-sand p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Test Snapshot</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div>
                <p className="text-sm text-steel">Date</p>
                <p className="mt-1 font-semibold text-ink">{result.test.testDate}</p>
              </div>
              <div>
                <p className="text-sm text-steel">Time</p>
                <p className="mt-1 font-semibold text-ink">{timeLabel(result.test.timeOfDay)}</p>
              </div>
              <div>
                <p className="text-sm text-steel">Status</p>
                <p className="mt-1 font-semibold capitalize text-ink">
                  {result.scoringResult.scoringStatus}
                </p>
              </div>
            </div>
          </div>

          <BiochemistryResultPanel
            scoringResult={result.scoringResult}
            zones={result.zones}
            recommendations={result.recommendations}
          />
          <section className="rounded-[1.5rem] border border-ink/10 bg-white p-5 shadow-panel" aria-labelledby="comments-heading">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Entry notes</p>
            <h2 id="comments-heading" className="mt-2 text-xl font-semibold text-ink">Comments</h2>
            {commentStatus ? <p className="mt-3 text-sm text-steel" role="status">
              {commentStatus === "created" ? "Comment added." : commentStatus === "updated" ? "Comment updated." : commentStatus === "deleted" ? "Comment removed." : "The comment could not be changed."}
            </p> : null}
            <div className="mt-4 grid gap-4">
              {result.test.comments.map((comment) => (
                <article key={comment.id} className="rounded-2xl border border-ink/10 bg-sand p-4">
                  <p className="whitespace-pre-wrap text-sm leading-6 text-ink">{comment.text}</p>
                  <p className="mt-2 text-xs text-steel">{comment.authorLabel} · {new Date(comment.createdAt).toLocaleString("en-AU")}</p>
                  {comment.canManage ? <div className="mt-3 grid gap-3">
                    <form action={updateBiochemistryCommentAction} className="grid gap-2">
                      <input type="hidden" name="testId" value={testId} />
                      <input type="hidden" name="commentId" value={comment.id} />
                      <label className="text-xs font-semibold text-ink" htmlFor={`comment-${comment.id}`}>Edit your comment</label>
                      <textarea id={`comment-${comment.id}`} name="comment" defaultValue={comment.text} maxLength={2000} required className="min-h-24 rounded-xl border border-ink/20 bg-white p-3 text-sm" />
                      <button className="w-fit rounded-full border border-ink/20 px-4 py-2 text-sm font-semibold" type="submit">Save comment</button>
                    </form>
                    <form action={deleteBiochemistryCommentAction}>
                      <input type="hidden" name="testId" value={testId} />
                      <input type="hidden" name="commentId" value={comment.id} />
                      <button className="text-sm font-semibold text-red-700" type="submit">Remove comment</button>
                    </form>
                  </div> : null}
                </article>
              ))}
              {result.test.comments.length === 0 ? <p className="text-sm text-steel">No comments yet.</p> : null}
            </div>
            {result.test.canComment ? <form action={createBiochemistryCommentAction} className="mt-5 grid gap-2">
              <input type="hidden" name="testId" value={testId} />
              <label className="text-sm font-semibold text-ink" htmlFor="new-comment">Add a comment</label>
              <textarea id="new-comment" name="comment" maxLength={2000} required className="min-h-28 rounded-xl border border-ink/20 bg-white p-3 text-sm" />
              <p className="text-xs text-steel">Plain text, maximum 2,000 characters.</p>
              <button className="w-fit rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white" type="submit">Add comment</button>
            </form> : null}
          </section>
        </div>
      ) : null}

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/data-entry/biochemistry"
          className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
        >
          New biochemistry test
        </Link>
        <Link
          href="/data-entry"
          className="rounded-full border border-ink/10 bg-sand px-5 py-3 text-sm font-semibold text-ink"
        >
          Back to data entry
        </Link>
      </div>
    </SectionCard>
  );
}
