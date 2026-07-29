export type RecentTestSnapshot = { id: string; horseId: string; testDate: string; scoringStatus: "scored" | "blocked" | "unscored"; healthScore: number | null; formulaVersion: string; sourceVersion: string };
export type OperationalSummary = {
  attention: { status: "review" | "unavailable"; reason: string };
  incomplete: { status: "incomplete" | "complete" | "empty"; reason: string };
  changed: { status: "changed" | "unchanged" | "unavailable"; reason: string };
  nextAction: { label: string; href: string };
};
export function deriveOperationalSummary(input: { horseId: string; tests: RecentTestSnapshot[]; canWrite: boolean }): OperationalSummary {
  const tests = [...input.tests].sort((a, b) => b.testDate.localeCompare(a.testDate));
  const latest = tests[0]; const previous = tests[1];
  const incomplete = Boolean(latest && latest.scoringStatus !== "scored");
  const compatible = Boolean(latest && previous && latest.formulaVersion === previous.formulaVersion && latest.sourceVersion === previous.sourceVersion);
  const changed = Boolean(compatible && (latest!.scoringStatus !== previous!.scoringStatus || latest!.healthScore !== previous!.healthScore));
  return {
    attention: incomplete ? { status: "review", reason: "The latest biochemistry record is incomplete and needs operational review." } : { status: "unavailable", reason: "No approved clinical-priority rule is available. Horses remain alphabetically ordered." },
    incomplete: !latest ? { status: "empty", reason: "No biochemistry record is available." } : incomplete ? { status: "incomplete", reason: `Latest record is ${latest.scoringStatus}.` } : { status: "complete", reason: "Latest record is scored under its stored authority version." },
    changed: !latest || !previous ? { status: "unavailable", reason: "Two records are required for comparison." } : !compatible ? { status: "unavailable", reason: "The latest records use incompatible authority versions." } : changed ? { status: "changed", reason: "The stored score or completion state differs from the previous compatible record." } : { status: "unchanged", reason: "The stored score and completion state match the previous compatible record." },
    nextAction: input.canWrite && incomplete ? { label: "Review record", href: `/data-entry/biochemistry/${latest!.id}` } : input.canWrite && !latest ? { label: "Capture biochemistry", href: "/data-entry/biochemistry" } : { label: "Open horse workspace", href: `/portal/horses/${input.horseId}` },
  };
}
