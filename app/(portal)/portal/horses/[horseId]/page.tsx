import Link from "next/link";
import { SectionCard } from "@/components/layout/section-card";
import { getAccessibleHorseDetail } from "@/lib/domain/horses";
import { getAppAuthContext } from "@/lib/auth/session";
import { hasAppPermission } from "@/lib/auth/app-context";

type HorseDetailPageProps = {
  params: Promise<{ horseId: string }>;
};

export default async function HorseDetailPage({ params }: HorseDetailPageProps) {
  const { horseId } = await params;
  const context = await getAppAuthContext();
  const canWrite = hasAppPermission(context, "platform.admin") || hasAppPermission(context, "horse.records.write");
  const result = await getAccessibleHorseDetail(horseId, canWrite);

  if (!result.horse) {
    return (
      <SectionCard
        eyebrow="Horse Detail"
        title="Horse not available"
        description={
          "This horse could not be resolved for the current account or the record does not exist yet."
        }
      >
        <div className="mt-2">
          <Link
            href="/portal"
            className="rounded-full border border-ink/10 bg-sand px-4 py-2 text-sm font-semibold text-ink"
          >
            Back to trainer dashboard
          </Link>
        </div>
      </SectionCard>
    );
  }

  return (
    <SectionCard
      eyebrow="Horse Detail"
      title={result.horse.name}
      description="Permission-aware horse identity and current biochemistry workflow context."
    >
      {!result.envReady ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Horse workspace unavailable. The authorised data service is not configured and no sample record is shown.
        </div>
      ) : null}
      <div className="mt-8 grid gap-6">
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Profile</p>
          <div className="mt-5 grid gap-3 text-sm text-steel">
            <p>Status: {result.horse.status ?? "Awaiting status"}</p>
            <p>Stable: {result.horse.stableName ?? "Awaiting stable assignment"}</p>
            <p>Breed: {result.horse.breed ?? "Awaiting breed data"}</p>
            <p>Colour: {result.horse.colour ?? "Awaiting colour data"}</p>
            <p>Date of birth: {result.horse.dateOfBirth ?? "Awaiting date of birth"}</p>
          </div>
        </div>
      </div>
      <section className="mt-8 rounded-[1.75rem] border border-ink/10 bg-white p-6 shadow-panel" aria-labelledby="operational-summary">
        <h2 id="operational-summary" className="font-display text-2xl text-ink">Operational summary</h2>
        <p className="mt-2 text-sm text-steel">Informational workflow context only; it does not indicate clinical urgency.</p>
        <div className={result.horse.operational.workflow.state === "failed" ? "mt-5 rounded-2xl border border-red-200 bg-red-50 p-4" : "mt-5 rounded-2xl bg-sand p-4"} role={result.horse.operational.workflow.state === "failed" ? "alert" : "status"}><p className="text-xs font-semibold uppercase tracking-[0.14em] text-ember">Workflow state</p><p className="mt-2 font-semibold text-ink">{result.horse.operational.workflow.label}</p><p className="mt-1 text-sm leading-6 text-steel">{result.horse.operational.workflow.reason}</p></div>
        {result.horse.latestBiochemistry ? <p className="mt-4 text-sm text-steel">Latest result: {result.horse.latestBiochemistry.scoringStatus}; test date {result.horse.latestBiochemistry.testDate}; formula {result.horse.latestBiochemistry.formulaVersion}; source {result.horse.latestBiochemistry.sourceVersion}.</p> : <p className="mt-4 text-sm text-steel">Latest result unavailable. No missing value is treated as normal or complete.</p>}
        {result.horse.operational.nextAction ? <div className="mt-5"><Link href={result.horse.operational.nextAction.href} className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white">{result.horse.operational.nextAction.label}</Link></div> : <p className="mt-5 text-sm font-semibold text-steel">No record action is available while workflow information is unavailable.</p>}
      </section>
      <div className="mt-8"><Link href="/portal" className="rounded-full border border-ink/10 bg-sand px-4 py-2 text-sm font-semibold text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Back to trainer dashboard</Link></div>
    </SectionCard>
  );
}
