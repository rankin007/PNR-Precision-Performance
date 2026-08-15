import type { AnyBiochemistryScoringResult } from "@/lib/domain/biochemistry";
import { Notice } from "@/components/ui/notice";

function formatScore(value: number | undefined) {
  if (value === undefined || !Number.isFinite(value)) {
    return "Unavailable";
  }

  return Number(value.toFixed(6)).toString();
}

function formatReading(value: number | undefined, decimalPlaces: number, unit = "") {
  if (value === undefined || !Number.isFinite(value)) {
    return "Unavailable";
  }

  const separator = unit === "%" || unit === "" ? "" : " ";
  return `${value.toFixed(decimalPlaces)}${separator}${unit}`;
}

type BiochemistryResultPanelProps = {
  scoringResult: AnyBiochemistryScoringResult;
};

export function BiochemistryResultPanel({ scoringResult }: BiochemistryResultPanelProps) {
  return (
    <div className="grid gap-4">
      <div className="rounded-[1.5rem] border border-ink/10 bg-white p-5 shadow-panel">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Entered Readings</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <ReadingValue label="Carbohydrate" value={formatReading(scoringResult.rawReadings.carbsReading, 1, "%")} />
          <ReadingValue label="Saliva pH" value={formatReading(scoringResult.rawReadings.phSaliva, 2)} />
          <ReadingValue label="Urine pH" value={formatReading(scoringResult.rawReadings.phUrine, 2)} />
          <ReadingValue label="Raw Conductivity" value={formatReading(scoringResult.rawReadings.conductivityRawMeterValue, 2, "mS/cm")} />
        </div>
      </div>

      <div className="rounded-[1.5rem] border border-ink/10 bg-sand p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Derived Conductivity</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <ReadingValue
            label="Effective converted C"
            value={formatReading(scoringResult.derivedReadings.conductivityConvertedCValue, 2, "C")}
          />
          {"conductivityLookupCValue" in scoringResult.derivedReadings ? (
            <ReadingValue
              label="Selected Salts table reading"
              value={formatReading(scoringResult.derivedReadings.conductivityLookupCValue, 2, "C")}
            />
          ) : null}
        </div>
      </div>

      <div className="rounded-[1.5rem] border border-ink/10 bg-white p-5 shadow-panel">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Scoring</p>
        {scoringResult.scoringStatus === "scored" ? (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <ReadingValue label="Hydration Score" value={formatScore(scoringResult.hydrationScore)} emphasis />
            <ReadingValue
              label="Biochemistry Trend Score (display-only label)"
              value={formatScore(scoringResult.healthScore)}
              emphasis
            />
          </div>
        ) : (
          <Notice className="mt-4" tone="warning" title="Scoring blocked">
            This test is blocked because an accepted lookup row is unavailable. No score was guessed.
          </Notice>
        )}

        {scoringResult.scoringBlockers.length > 0 ? (
          <div className="mt-4 grid gap-2">
            {(scoringResult.scoringBlockers as Array<{ lookupType: string; exactReading: number; reason: string }>).map((blocker) => (
              <Notice
                key={`${blocker.lookupType}-${blocker.exactReading}`}
                tone="warning"
                title="Lookup unavailable"
              >
                No approved lookup could be selected for reading {blocker.exactReading}.
              </Notice>
            ))}
          </div>
        ) : null}
        <p className="mt-4 text-xs leading-5 text-steel">
          Formula source: {scoringResult.formulaVersion}; lookup source: {scoringResult.lookupSourceDocument} {scoringResult.lookupSourceVersion}.
        </p>
      </div>
    </div>
  );
}

function ReadingValue({
  label,
  value,
  emphasis = false,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div>
      <p className="text-sm text-steel">{label}</p>
      <p className={`mt-1 font-semibold text-ink ${emphasis ? "text-3xl" : "text-2xl"}`}>
        {value}
      </p>
    </div>
  );
}
