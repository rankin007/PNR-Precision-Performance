import { TrainerCockpit } from "@/components/portal/trainer-cockpit";
import { deriveCockpitSummary, deriveOperationalSummary } from "@/lib/domain/stable-workspace";

const reference = new Date("2026-08-11T01:30:00.000Z");
const rows = [
  {
    id: "synthetic-alpha", name: "Synthetic Alpha", status: "active", stableName: "Example Stable", lastActivity: "2026-08-11",
    operational: deriveOperationalSummary({ horseId: "synthetic-alpha", canWrite: true, tests: [
      { id: "alpha-new", horseId: "synthetic-alpha", testDate: "2026-08-11", scoringStatus: "scored", healthScore: 0.72, formulaVersion: "formula-v2", sourceVersion: "v3" },
      { id: "alpha-old", horseId: "synthetic-alpha", testDate: "2026-08-10", scoringStatus: "blocked", healthScore: null, formulaVersion: "formula-v2", sourceVersion: "v3" },
    ] }),
  },
  {
    id: "synthetic-bravo", name: "Synthetic Bravo", status: "active", stableName: "Example Stable", lastActivity: "2026-08-10",
    operational: deriveOperationalSummary({ horseId: "synthetic-bravo", canWrite: true, tests: [
      { id: "bravo-draft", horseId: "synthetic-bravo", testDate: "2026-08-10", scoringStatus: "unscored", healthScore: null, formulaVersion: "formula-v2", sourceVersion: "v3" },
    ] }),
  },
  { id: "synthetic-charlie", name: "Synthetic Charlie", status: "active", stableName: "Example Stable", lastActivity: null, operational: deriveOperationalSummary({ horseId: "synthetic-charlie", canWrite: false, tests: [] }) },
];

export default function EvidenceDashboard() {
  return (
    <main className="min-h-screen bg-canvas px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-7"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink">Synthetic local evidence</p><h1 className="mt-2 font-display text-4xl text-ink">Trainer daily cockpit</h1><p className="mt-3 max-w-3xl text-sm leading-6 text-ink">No real horse, client or provider data is used. This app is local-only and cannot submit a record.</p></header>
        <TrainerCockpit envReady cockpit={deriveCockpitSummary(rows, reference)} horses={rows} />
      </div>
    </main>
  );
}
