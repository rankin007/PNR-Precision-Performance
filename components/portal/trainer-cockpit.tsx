import Link from "next/link";
import type { CockpitSummary } from "@/lib/domain/stable-workspace";
import type { StableWorkspaceHorse } from "@/lib/domain/horses";

type TrainerCockpitProps = {
  envReady: boolean;
  error?: string;
  cockpit: CockpitSummary | null;
  horses: StableWorkspaceHorse[];
};

const actionClass =
  "inline-flex min-h-11 items-center justify-center rounded-full px-4 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

export function TrainerCockpit({ envReady, error, cockpit, horses }: TrainerCockpitProps) {
  return (
    <>
      <div className="mb-6 rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm leading-6 text-ink" role="status">
        Incomplete operational work is shown first, then horse name. This order does not indicate clinical priority, health urgency, treatment need or race readiness.
      </div>
      {!envReady ? (
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-900" role="status">
          Dashboard unavailable. The authorised data service is not configured, so no horse records are shown.
        </div>
      ) : null}
      {error ? (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-900" role="alert">
          Dashboard failed to load. No missing information is treated as complete or actionable. Reload to try again.
        </div>
      ) : null}
      {cockpit ? (
        <section className="mb-6 rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-panel" aria-labelledby="today-summary">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink">Today in Brisbane</p>
          <h2 id="today-summary" className="mt-2 font-display text-2xl text-ink">
            <time dateTime={cockpit.dateKey}>{cockpit.displayDate}</time>
          </h2>
          <dl className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <SummaryItem label="Latest record today" value={cockpit.todayCount} />
            <SummaryItem label="Incomplete or pending" value={cockpit.incompleteCount} />
            <SummaryItem label="No result" value={cockpit.noResultCount} />
          </dl>
        </section>
      ) : null}
      <section className="grid gap-4" aria-label="Accessible horse operational worklist">
        {horses.map((horse) => (
          <article key={horse.id} className="rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-panel">
            <div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink">
                  {horse.stableName ?? "Stable unavailable"}
                </p>
                <h2 className="mt-2 break-words font-display text-2xl text-ink">{horse.name}</h2>
              </div>
            </div>
            <div className="mt-5 rounded-2xl bg-sand p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink">Workflow state</p>
              <p className="mt-2 font-semibold text-ink">{horse.operational.workflow.label}</p>
              <p className="mt-1 text-sm leading-6 text-ink">{horse.operational.workflow.reason}</p>
              <p className="mt-2 text-xs text-ink">
                Basis: latest accessible biochemistry record
                {horse.operational.workflow.occurredAt
                  ? " dated " + horse.operational.workflow.occurredAt + "."
                  : "; no current record date."}
              </p>
              <p className="mt-2 text-sm font-medium text-ink">{horse.operational.change}.</p>
            </div>
            {horse.operational.nextAction ? (
              <div className="mt-4">
                <Link href={horse.operational.nextAction.href} className={actionClass + " bg-ink text-white"}>
                  {horse.operational.nextAction.label}
                </Link>
              </div>
            ) : (
              <p className="mt-4 text-sm font-semibold text-ink">No record action is available. Reload to try again.</p>
            )}
          </article>
        ))}
        {envReady && !error && horses.length === 0 ? (
          <p className="rounded-2xl border border-ink/10 bg-white p-5 text-sm text-ink">
            No accessible horses are assigned to this account. No sample records are shown.
          </p>
        ) : null}
      </section>
    </>
  );
}

function SummaryItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-sand p-4">
      <dt className="text-sm text-ink">{label}</dt>
      <dd className="mt-1 text-2xl font-semibold text-ink">{value}</dd>
    </div>
  );
}
