import type {
  BiochemistryRecommendationResult,
  BiochemistryScoringResult,
  BiochemistryZoneSnapshot,
} from "@/lib/domain/biochemistry";
import { Notice } from "@/components/ui/notice";
import { StatusIndicator } from "@/components/ui/status-indicator";

function formatNumber(value: number | undefined) {
  if (value === undefined || !Number.isFinite(value)) {
    return "Unavailable";
  }

  return Number(value.toFixed(6)).toString();
}

function blockerLabel(reason: string) {
  return reason
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

type BiochemistryResultPanelProps = {
  scoringResult: BiochemistryScoringResult;
  zones: {
    hydration: BiochemistryZoneSnapshot;
    health: BiochemistryZoneSnapshot;
  };
  recommendations: BiochemistryRecommendationResult;
};

export function BiochemistryResultPanel({
  scoringResult,
  zones,
  recommendations,
}: BiochemistryResultPanelProps) {
  return (
    <div className="grid gap-4">
      <div className="rounded-[1.5rem] border border-ink/10 bg-sand p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Derived Readings</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div>
            <p className="text-sm text-steel">pH Average</p>
            <p className="mt-1 text-2xl font-semibold text-ink">
              {formatNumber(scoringResult.derivedReadings.phAverage)}
            </p>
          </div>
          <div>
            <p className="text-sm text-steel">Conductivity converted C</p>
            <p className="mt-1 text-2xl font-semibold text-ink">
              {formatNumber(scoringResult.derivedReadings.conductivityConvertedCValue)}C
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-[1.5rem] border border-ink/10 bg-white p-5 shadow-panel">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Scoring</p>
        {scoringResult.scoringStatus === "scored" ? (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <p className="text-sm text-steel">Hydration Score</p>
              <p className="mt-1 text-3xl font-semibold text-ink">
                {formatNumber(scoringResult.hydrationScore)}
              </p>
            </div>
            <div>
              <p className="text-sm text-steel">Biochemistry Trend Score <span className="text-xs">(provisional)</span></p>
              <p className="mt-1 text-3xl font-semibold text-ink">
                {formatNumber(scoringResult.healthScore)}
              </p>
            </div>
          </div>
        ) : (
          <Notice className="mt-4" tone="warning" title="Scoring blocked">
            This test is blocked because one or more exact lookup rows are missing. No fallback score was guessed.
          </Notice>
        )}

        {scoringResult.scoringBlockers.length > 0 ? (
          <div className="mt-4 grid gap-2">
            {scoringResult.scoringBlockers.map((blocker) => (
              <Notice
                key={`${blocker.lookupType}-${blocker.exactReading}`}
                tone="warning"
                title="Exact lookup unavailable"
              >
                Missing exact {blocker.lookupType} lookup for reading {blocker.exactReading}.
              </Notice>
            ))}
          </div>
        ) : null}
      </div>

      <div className="rounded-[1.5rem] border border-ink/10 bg-white p-5 shadow-panel">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Zones</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[zones.hydration, zones.health].map((zone) => (
            <div key={zone.scoreKind} className="rounded-2xl border border-ink/10 bg-sand px-4 py-4">
              <p className="text-sm font-semibold capitalize text-ink">
                {zone.scoreKind === "health" ? "Biochemistry Trend Score (provisional)" : "Hydration Score"}
              </p>
              <div className="mt-3">
                {zone.zoneStatus === "classified" && zone.zone ? (
                  <StatusIndicator
                    label={zone.label ?? zone.zone.toUpperCase()}
                    tone={zone.zone === "green" ? "success" : zone.zone === "amber" ? "warning" : "danger"}
                    context={zone.zone.toUpperCase()}
                  />
                ) : (
                  <StatusIndicator label="Unavailable" tone="unavailable" context="Approved thresholds required" />
                )}
              </div>
              {zone.blockers.length > 0 ? (
                <p className="mt-2 text-xs text-amber-700">
                  {zone.blockers.map((blocker) => blockerLabel(blocker.reason)).join(", ")}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[1.5rem] border border-ink/10 bg-white p-5 shadow-panel">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Recommendations</p>
        {recommendations.recommendations.length > 0 ? (
          <div className="mt-4 grid gap-3">
            {recommendations.recommendations.map((recommendation) => (
              <div key={recommendation.ruleId} className="rounded-2xl border border-ink/10 bg-sand px-4 py-4">
                <p className="text-sm font-semibold text-ink">{recommendation.category}</p>
                <p className="mt-2 text-sm leading-6 text-steel">{recommendation.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <Notice className="mt-4" tone="warning" title="Recommendations unavailable">
            Recommendations are unavailable until active approved Table of Knowledge rules are supplied.
          </Notice>
        )}
        {recommendations.blockers.length > 0 ? (
          <p className="mt-3 text-xs text-amber-700">
            {recommendations.blockers.map((blocker) => blockerLabel(blocker.reason)).join(", ")}
          </p>
        ) : null}
      </div>
    </div>
  );
}
