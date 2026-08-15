import Link from "next/link";
import { SectionCard } from "@/components/layout/section-card";
import { ManagedAccessWorkspace } from "@/components/ops/managed-access-workspace";
import {
  BiochemistryTrends,
  StoredScoreContext,
} from "@/components/portal/biochemistry-trends";
import {
  DEFAULT_TREND_PREFERENCE,
  type BiochemistryTrendRow,
  type TrendHistoryResult,
} from "@/lib/domain/biochemistry-trends";
import type { ManagedAccessSnapshot } from "@/lib/auth/managed-access-contract";

const ids = {
  actor: "00000000-0000-4000-8000-000000000001",
  actorProfile: "00000000-0000-4000-8000-000000000002",
  vetUser: "00000000-0000-4000-8000-000000000003",
  vetProfile: "00000000-0000-4000-8000-000000000004",
  staffUser: "00000000-0000-4000-8000-000000000005",
  staffProfile: "00000000-0000-4000-8000-000000000006",
  horse: "00000000-0000-4000-8000-000000000007",
  stable: "00000000-0000-4000-8000-000000000008",
  vetAssignment: "00000000-0000-4000-8000-000000000009",
  staffAssignment: "00000000-0000-4000-8000-000000000010",
};

const accessSnapshot: Extract<ManagedAccessSnapshot, { availability: "available" }> = {
  availability: "available",
  actorAppUserId: ids.actor,
  actorMemberProfileId: ids.actorProfile,
  actorRole: "trainer",
  candidates: [
    { id: ids.vetProfile, userId: ids.vetUser, displayName: "Veterinary Reviewer", roleCode: "veterinarian" },
    { id: ids.staffProfile, userId: ids.staffUser, displayName: "Stable Support", roleCode: "stable_hand" },
  ],
  horses: [{ id: ids.horse, name: "Example Horse", stableId: ids.stable }],
  assignments: [
    { id: ids.vetAssignment, horseId: ids.horse, stableId: ids.stable, memberProfileId: ids.vetProfile, roleCode: "veterinarian", accessLevel: "read", startsAt: "2026-08-10T00:00:00.000Z", endsAt: null },
    { id: ids.staffAssignment, horseId: ids.horse, stableId: ids.stable, memberProfileId: ids.staffProfile, roleCode: "stable_hand", accessLevel: "read", startsAt: "2026-08-10T00:00:00.000Z", endsAt: null },
  ],
};

const horse = { id: ids.horse, name: "Example Horse", stableName: "Example Stable" };
const rows: BiochemistryTrendRow[] = [
  { id: "synthetic-3", horseId: ids.horse, testDate: "2026-08-11", timeOfDay: "pm", scoringStatus: "scored", hydrationScore: 0.82, healthScore: 0.76, carbsReading: 4.1, phUrine: 6.72, phSaliva: 6.83, conductivityRawMeterValue: 18.4, formulaVersion: "biochemistry-score-v2", lookupSourceDocument: "Accepted synthetic authority", lookupSourceVersion: "v3" },
  { id: "synthetic-2", horseId: ids.horse, testDate: "2026-08-10", timeOfDay: "am", scoringStatus: "blocked", hydrationScore: null, healthScore: null, carbsReading: 4.8, phUrine: 6.61, phSaliva: 6.75, conductivityRawMeterValue: 20.1, formulaVersion: "biochemistry-score-v2", lookupSourceDocument: "Accepted synthetic authority", lookupSourceVersion: "v3" },
  { id: "synthetic-1", horseId: ids.horse, testDate: "2026-08-08", timeOfDay: "am", scoringStatus: "scored", hydrationScore: 0.74, healthScore: 0.68, carbsReading: 5.8, phUrine: 6.45, phSaliva: 6.58, conductivityRawMeterValue: 23.7, formulaVersion: "biochemistry-score-v1", lookupSourceDocument: "Prior synthetic authority", lookupSourceVersion: "v1" },
];
const history: TrendHistoryResult = {
  availability: "available",
  selectedHorseId: ids.horse,
  rows,
  totalCount: rows.length,
  startDate: "2026-05-14",
  endDate: "2026-08-11",
};

async function evidenceOnlyAction(_formData: FormData): Promise<void> {
  "use server";
}

function EvidenceHeader({ title, description }: { title: string; description: string }) {
  return (
    <header className="mb-7">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Synthetic local evidence</p>
      <h1 className="mt-2 break-words font-display text-4xl text-ink">{title}</h1>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-steel">{description}</p>
    </header>
  );
}

function AccessView({ permissionsOnly = false }: { permissionsOnly?: boolean }) {
  return (
    <>
      <EvidenceHeader
        title={permissionsOnly ? "Managed role permissions" : "Horse access"}
        description="Synthetic shared Product composition. No real person, horse, stable, account or provider record is used."
      />
      <ManagedAccessWorkspace
        snapshot={permissionsOnly ? { ...accessSnapshot, horses: [], assignments: [] } : accessSnapshot}
        status={permissionsOnly ? undefined : "assigned"}
        assignAction={evidenceOnlyAction}
        revokeAction={evidenceOnlyAction}
      />
    </>
  );
}

function OwnerResultView() {
  return (
    <>
      <EvidenceHeader
        title="Assigned horse"
        description="Read-only stored result context for one synthetic assigned horse."
      />
      <SectionCard eyebrow="Horse Detail" title="Example Horse" description="Permission-aware horse identity and stored biochemistry result context.">
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Profile</p>
          <p className="mt-3 text-sm text-steel">Status: active</p>
          <p className="mt-1 text-sm text-steel">Stable: Example Stable</p>
        </div>
        <StoredScoreContext testDate="2026-08-11" scoringStatus="scored" hydrationScore={0.82} biochemistryTrendScore={0.76} formulaVersion="biochemistry-score-v2" sourceVersion="v3" />
        <Link href="/?mode=trends" className="mt-5 inline-flex min-h-11 w-full items-center justify-center whitespace-normal rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">View trends</Link>
      </SectionCard>
    </>
  );
}

function TrendsView() {
  return (
    <>
      <EvidenceHeader
        title="Exact-horse trends"
        description="Stored synthetic history for the same assigned horse. Saved controls are visual evidence only."
      />
      <BiochemistryTrends
        envReady
        horses={[horse]}
        selectedHorse={horse}
        history={history}
        config={DEFAULT_TREND_PREFERENCE}
        preferences={[]}
        createPreferenceAction={evidenceOnlyAction}
        updatePreferenceAction={evidenceOnlyAction}
        deletePreferenceAction={evidenceOnlyAction}
        setDefaultPreferenceAction={evidenceOnlyAction}
      />
    </>
  );
}

type EvidenceProps = { searchParams?: Promise<Record<string, string | string[] | undefined>> };
export default async function EvidencePage({ searchParams }: EvidenceProps) {
  const params = searchParams ? await searchParams : {};
  const rawMode = Array.isArray(params.mode) ? params.mode[0] : params.mode;
  const mode = rawMode ?? "access";
  return (
    <main className="min-h-screen min-w-0 overflow-x-clip bg-canvas px-3 py-8 sm:px-8">
      <div className="mx-auto min-w-0 max-w-7xl">
        {mode === "access" ? <AccessView /> : null}
        {mode === "permissions" ? <AccessView permissionsOnly /> : null}
        {mode === "owner" ? <OwnerResultView /> : null}
        {mode === "trends" ? <TrendsView /> : null}
        {mode === "desktop" ? (
          <>
            <EvidenceHeader title="Managed access and Owner review" description="Full shared-component overview of managed access, Owner latest result and exact-horse trends." />
            <div className="grid min-w-0 gap-8 xl:grid-cols-2">
              <AccessView />
              <OwnerResultView />
            </div>
            <div className="mt-8 min-w-0"><TrendsView /></div>
          </>
        ) : null}
      </div>
    </main>
  );
}
