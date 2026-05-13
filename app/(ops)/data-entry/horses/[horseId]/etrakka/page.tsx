import Link from "next/link";
import { SectionCard } from "@/components/layout/section-card";
import { EtrakkaSheet } from "@/components/ops/etrakka-sheet";
import { getTrainerHorseEtrakkaSessions } from "@/lib/domain/trainer-horses";

type TrainerHorseEtrakkaPageProps = {
  params: Promise<{ horseId: string }>;
};

function formatNumber(value: number | null, suffix?: string) {
  if (typeof value !== "number") {
    return "-";
  }

  return suffix ? `${value} ${suffix}` : String(value);
}

function toTitleCase(value: string | null) {
  if (!value) return "Unknown";
  return value
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => (word ? `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}` : word))
    .join(" ");
}

export default async function TrainerHorseEtrakkaPage({ params }: TrainerHorseEtrakkaPageProps) {
  const { horseId } = await params;
  const result = await getTrainerHorseEtrakkaSessions(horseId);

  if (!result.horse) {
    return (
      <SectionCard
        eyebrow="E-Trakka"
        title="Horse not available"
        description="This horse could not be resolved for the signed-in trainer context."
      >
        <Link
          href="/data-entry/horses"
          className="rounded-full border border-ink/10 bg-sand px-4 py-2 text-sm font-semibold text-ink"
        >
          Back to The Stable
        </Link>
      </SectionCard>
    );
  }

  const { horse, sessions, sheet, error } = result;

  return (
    <SectionCard
      eyebrow="E-Trakka"
      title={`${horse.name} E-Trakka Sessions`}
      description="Review imported E-Trakka performance sessions, split times, heart-rate markers, workload indicators, and recovery metrics for this horse."
    >
      <div className="flex flex-wrap gap-3">
        <Link
          href={`/data-entry/horses/${horse.id}`}
          className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
        >
          Back to workspace
        </Link>
        <Link
          href={`/data-entry/horses/${horse.id}/history`}
          className="rounded-full border border-ink/10 bg-sand px-5 py-3 text-sm font-semibold text-ink"
        >
          Full history
        </Link>
        <Link
          href="/data-entry/horses"
          className="rounded-full border border-ink/10 bg-sand px-5 py-3 text-sm font-semibold text-ink"
        >
          All horses
        </Link>
      </div>

      {error ? (
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {error}
        </div>
      ) : null}

      {sheet ? <EtrakkaSheet sheet={sheet} /> : null}

      <div className="mt-8 rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow">Imported Sessions</p>
            <h2 className="mt-3 font-display text-2xl text-ink">E-Trakka session review</h2>
          </div>
          <div className="rounded-full border border-ink/10 bg-sand px-4 py-2 text-sm font-semibold text-ink">
            {sessions.length} imported session{sessions.length === 1 ? "" : "s"}
          </div>
        </div>

        {sessions.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-steel">
            No imported E-Trakka data is visible yet. After an import, the sessions will appear here for review.
          </div>
        ) : (
          <div className="mt-6 grid gap-4">
            {sessions.map((session) => (
              <details key={session.id} className="group rounded-[1.5rem] border border-ink/10 bg-sand px-5 py-4">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                  <div className="grid gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-ember">
                        {toTitleCase(session.sessionCategory)}
                      </span>
                      <span className="text-sm font-semibold text-ink">
                        {session.sessionDate.slice(0, 16).replace("T", " ")}
                      </span>
                    </div>
                    <p className="text-sm text-steel">
                      {session.trackName ?? "Unknown track"} / {session.sessionType ?? "Unspecified type"} / Rider {session.riderName ?? "Not set"}
                    </p>
                    <p className="text-xs uppercase tracking-[0.14em] text-steel">
                      Source: {session.sourceRowType ?? "Unknown row"}{session.sourceFileName ? ` / ${session.sourceFileName}` : ""}
                    </p>
                  </div>
                  <svg className="mt-1 h-5 w-5 shrink-0 text-ink/40 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>

                <div className="mt-5 grid gap-6 border-t border-ink/10 pt-5 xl:grid-cols-3">
                  <div className="grid gap-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Splits</p>
                    <div className="grid gap-2 text-sm text-ink">
                      <p>BT200: {formatNumber(session.bt200)}</p>
                      <p>BT400: {formatNumber(session.bt400)}</p>
                      <p>BT600: {formatNumber(session.bt600)}</p>
                      <p>BT800: {formatNumber(session.bt800)}</p>
                      <p>BT1000: {formatNumber(session.bt1000)}</p>
                      <p>200: {formatNumber(session.s200)}</p>
                      <p>400: {formatNumber(session.s400)}</p>
                      <p>600: {formatNumber(session.s600)}</p>
                      <p>800: {formatNumber(session.s800)}</p>
                      <p>1000: {formatNumber(session.s1000)}</p>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Heart Rate</p>
                    <div className="grid gap-2 text-sm text-ink">
                      <p>HR Max: {formatNumber(session.hrMaxBpm, "bpm")}</p>
                      <p>HR 45: {formatNumber(session.hr45, "bpm")}</p>
                      <p>Trot Mean HR: {formatNumber(session.trotMeanHrBpm, "bpm")}</p>
                      <p>Canter Mean HR: {formatNumber(session.canterMeanHrBpm, "bpm")}</p>
                      <p>Gallop Mean HR: {formatNumber(session.gallopMeanHrBpm, "bpm")}</p>
                      <p>Avg HR 2.5 min: {formatNumber(session.recoveryAvgHr2_5minBpm, "bpm")}</p>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Performance</p>
                    <div className="grid gap-2 text-sm text-ink">
                      <p>Vmax: {formatNumber(session.vmaxKph, "kph")}</p>
                      <p>V200: {formatNumber(session.v200, "kph")}</p>
                      <p>MJ: {formatNumber(session.mj)}</p>
                      <p>SL 50: {formatNumber(session.sl50)}</p>
                      <p>Gallop &gt; 60kph: {formatNumber(session.gallopOver60kph)}</p>
                      <p>Secs &gt; 60kph: {formatNumber(session.secsOver60kph)}</p>
                      <p>Secs To HR Drop: {formatNumber(session.secsToHrDrop)}</p>
                      <p>48K Gap Secs: {formatNumber(session.gap48kSecs)}</p>
                      <p>Gallop Metres: {formatNumber(session.gallopMetres, "m")}</p>
                      <p>Device: {session.etrakkaDevice ?? "-"}</p>
                    </div>
                  </div>
                </div>

                {session.note ? (
                  <div className="mt-5 rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm text-steel">
                    <span className="font-semibold text-ink">Session note:</span> {session.note}
                  </div>
                ) : null}
              </details>
            ))}
          </div>
        )}
      </div>
    </SectionCard>
  );
}
