import Link from "next/link";
import { SectionCard } from "@/components/layout/section-card";
import { getAccessibleHorseDetail } from "@/lib/domain/horses";

type HorseDetailPageProps = {
  params: Promise<{ horseId: string }>;
};

export default async function HorseDetailPage({ params }: HorseDetailPageProps) {
  const { horseId } = await params;
  const result = await getAccessibleHorseDetail(horseId);
  const profileCompleteness = [
    result.horse?.stableName,
    result.horse?.breed,
    result.horse?.colour,
    result.horse?.dateOfBirth,
  ].filter(Boolean).length;

  if (!result.horse) {
    return (
      <SectionCard
        eyebrow="Horse Detail"
        title="Horse not available"
        description="This horse could not be resolved for the current account or the record does not exist yet."
      >
        <div className="mt-2">
          <Link
            href="/portal/horses"
            className="rounded-full border border-ink/10 bg-sand px-4 py-2 text-sm font-semibold text-ink"
          >
            Back to horses
          </Link>
        </div>
      </SectionCard>
    );
  }

  return (
    <SectionCard
      eyebrow="Horse Detail"
      title={result.horse.name}
      description="Permission-aware horse profile view with recent physiological snapshots, current profile data, and the latest timeline context."
    >
      {!result.envReady ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          This horse profile is currently running in preview mode, so sample timeline and metric data is being shown while the live horse record connection is still being completed.
        </div>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-4">
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5 lg:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Profile</p>
          <p className="mt-4 text-sm leading-7 text-steel">
            Stable: {result.horse.stableName ?? "Not yet assigned"} / Status: {result.horse.status ?? "Not yet captured"}
          </p>
          <p className="mt-2 text-sm leading-7 text-steel">
            Breed: {result.horse.breed ?? "Not yet captured"} / Colour: {result.horse.colour ?? "Not yet captured"}
          </p>
        </div>
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Date of birth</p>
          <p className="mt-4 text-sm font-semibold text-ink">{result.horse.dateOfBirth ?? "Not yet captured"}</p>
          <p className="mt-3 text-sm leading-7 text-steel">Core identity detail for the visible horse profile.</p>
        </div>
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Recent metrics</p>
          <p className="mt-4 font-display text-4xl text-ink">{result.horse.recentMetrics.length}</p>
          <p className="mt-3 text-sm leading-7 text-steel">Most recent physiological indicators currently available.</p>
        </div>
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Profile coverage</p>
          <p className="mt-4 font-display text-4xl text-ink">{profileCompleteness}</p>
          <p className="mt-3 text-sm leading-7 text-steel">Core profile fields populated for this visible horse record.</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[1.75rem] border border-ink/10 bg-white p-6 shadow-panel">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Current Profile</p>
          <div className="mt-5 grid gap-3 text-sm text-steel">
            <p>Status: {result.horse.status ?? "Not yet captured"}</p>
            <p>Stable: {result.horse.stableName ?? "Not yet assigned"}</p>
            <p>Breed: {result.horse.breed ?? "Not yet captured"}</p>
            <p>Colour: {result.horse.colour ?? "Not yet captured"}</p>
            <p>Date of birth: {result.horse.dateOfBirth ?? "Not yet captured"}</p>
          </div>
          <p className="mt-5 text-sm leading-7 text-steel">
            {!result.envReady
              ? "Preview data is being used to validate profile structure, horse summaries, and timeline framing before the live dataset is available."
              : "This panel is the member-facing summary view that should stay aligned with the latest trusted stable and horse profile data."}
          </p>
        </div>
        <div className="rounded-[1.75rem] border border-ink/10 bg-white p-6 shadow-panel">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">
            Recent Metrics
          </p>
          <div className="mt-5 grid gap-3">
            {result.horse.recentMetrics.length === 0 ? (
              <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-steel">
                No recent metric snapshots are available yet.
              </div>
            ) : (
              result.horse.recentMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-ink"
                >
                  <p className="font-semibold">{metric.label}</p>
                  <p className="mt-1 text-steel">{metric.value}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[1.75rem] border border-ink/10 bg-white p-6 shadow-panel">
          <p className="eyebrow">Profile readiness</p>
          <h2 className="mt-3 font-display text-2xl text-ink">What still needs context</h2>
          <div className="mt-5 grid gap-3">
            {[
              !result.horse.stableName ? "Add stable assignment so member-facing context is clearer." : null,
              !result.horse.breed ? "Capture breed data for a fuller horse identity record." : null,
              !result.horse.colour ? "Capture colour details to complete the visible profile." : null,
              !result.horse.dateOfBirth ? "Capture date of birth for identity and reporting completeness." : null,
            ].filter(Boolean).length === 0 ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-800">
                The visible horse profile has the main identity fields in place.
              </div>
            ) : (
              [
                !result.horse.stableName ? "Add stable assignment so member-facing context is clearer." : null,
                !result.horse.breed ? "Capture breed data for a fuller horse identity record." : null,
                !result.horse.colour ? "Capture colour details to complete the visible profile." : null,
                !result.horse.dateOfBirth ? "Capture date of birth for identity and reporting completeness." : null,
              ]
                .filter(Boolean)
                .map((item) => (
                  <div key={item} className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-ink">
                    {item}
                  </div>
                ))
            )}
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-ink/10 bg-white p-6 shadow-panel">
          <p className="eyebrow">Member use</p>
          <h2 className="mt-3 font-display text-2xl text-ink">How this page fits the portal</h2>
          <div className="mt-5 grid gap-3">
            <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-ink">
              <p className="font-semibold">Recent metrics</p>
              <p className="mt-1 text-steel">Keeps owners and trainers anchored to the most recent physiological indicators without exposing raw admin tooling.</p>
            </div>
            <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-ink">
              <p className="font-semibold">Timeline</p>
              <p className="mt-1 text-steel">Provides a lightweight history view that can later grow into deeper reporting and audit trails.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 rounded-[1.75rem] border border-ink/10 bg-white p-6 shadow-panel">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Recent History</p>
            <h2 className="mt-3 font-display text-2xl text-ink">Timeline</h2>
          </div>
          <Link
            href="/portal/horses"
            className="rounded-full border border-ink/10 bg-sand px-4 py-2 text-sm font-semibold text-ink"
          >
            Back to horses
          </Link>
        </div>
        <div className="mt-5 grid gap-4">
          {result.horse.recentTimeline.length === 0 ? (
            <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-steel">
              No recent history is available yet.
            </div>
          ) : (
            result.horse.recentTimeline.map((entry) => (
              <div
                key={`${entry.date}-${entry.summary}`}
                className="grid gap-2 rounded-2xl border border-ink/10 bg-sand px-4 py-4 md:grid-cols-[140px_minmax(0,1fr)]"
              >
                <p className="text-sm font-semibold text-ink">{entry.date}</p>
                <p className="text-sm leading-7 text-steel">{entry.summary}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </SectionCard>
  );
}
