import { BiochemistryResultPanel } from "@/components/ops/biochemistry-result-panel";
import type { AnyBiochemistryScoringResult } from "@/lib/domain/biochemistry";

const scoringResult = {
  formulaVersion: "biochemistry-score-v2",
  lookupSourceDocument: "Accepted synthetic lookup authority",
  lookupSourceVersion: "v3",
  rawReadings: { carbsReading: 4.5, phSaliva: 7.25, phUrine: 7.24, conductivityRawMeterValue: 18.18 },
  derivedReadings: { conductivityConvertedCValue: 26, conductivityLookupCValue: 26 },
  losses: {}, hydrationScoreEnergyLoss: 0.080299, hydrationScore: 0.919701,
  healthScoreEnergyLoss: 0.093316, healthScore: 0.906684,
  scoringStatus: "scored", scoringBlockers: [],
} as unknown as AnyBiochemistryScoringResult;

export default function EvidenceResult() {
  return <main className="min-h-screen bg-canvas px-2 py-2 sm:px-8 sm:py-8"><section className="mx-auto max-w-4xl">
    <header className="mb-2"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink">Synthetic local evidence · Example Alpha · no real data</p></header>
    <BiochemistryResultPanel scoringResult={scoringResult} />
  </section></main>;
}
