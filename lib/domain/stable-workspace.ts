export type RecentTestSnapshot = {
  id: string;
  horseId: string;
  testDate: string;
  scoringStatus: "scored" | "blocked" | "unscored";
  healthScore: number | null;
  formulaVersion: string;
  sourceVersion: string;
};

export type WorkflowState =
  | "no-result"
  | "draft-incomplete"
  | "pending-review"
  | "completed"
  | "failed";

export type OperationalSummary = {
  workflow: {
    state: WorkflowState;
    label: string;
    reason: string;
    occurredAt: string | null;
  };
  nextAction: { label: string; href: string } | null;
  sortRank: number;
};

const stateRank: Record<WorkflowState, number> = {
  "draft-incomplete": 0,
  "pending-review": 1,
  "no-result": 2,
  completed: 3,
  failed: 4,
};

export function deriveFailedOperationalSummary(): OperationalSummary {
  return {
    workflow: {
      state: "failed",
      label: "Unavailable",
      reason: "Biochemistry workflow information could not be loaded. No record state or action is inferred.",
      occurredAt: null,
    },
    nextAction: null,
    sortRank: stateRank.failed,
  };
}

export function resolveHorseDetailWorkflow(input: {
  horseAccessible: boolean;
  biochemistryError: unknown;
  tests: RecentTestSnapshot[];
  horseId: string;
  canWrite: boolean;
}) {
  if (!input.horseAccessible) {
    return { availability: "denied" as const, error: "Horse not available." };
  }
  if (input.biochemistryError) {
    return {
      availability: "available" as const,
      error: "Biochemistry workflow information could not be loaded.",
      operational: deriveFailedOperationalSummary(),
    };
  }
  return {
    availability: "available" as const,
    operational: deriveOperationalSummary({
      horseId: input.horseId,
      tests: input.tests,
      canWrite: input.canWrite,
    }),
  };
}

export function deriveOperationalSummary(input: {
  horseId: string;
  tests: RecentTestSnapshot[];
  canWrite: boolean;
}): OperationalSummary {
  const tests = [...input.tests].sort(
    (a, b) => b.testDate.localeCompare(a.testDate) || b.id.localeCompare(a.id),
  );
  const latest = tests[0];
  const state: WorkflowState = !latest
    ? "no-result"
    : latest.scoringStatus === "unscored"
      ? "draft-incomplete"
      : latest.scoringStatus === "blocked"
        ? "pending-review"
        : "completed";

  const workflow = !latest
    ? {
        state,
        label: "No result",
        reason: "No current biochemistry record is available.",
        occurredAt: null,
      }
    : state === "draft-incomplete"
      ? {
          state,
          label: "Draft / incomplete",
          reason: "The latest record is stored but scoring is incomplete.",
          occurredAt: latest.testDate,
        }
      : state === "pending-review"
        ? {
            state,
            label: "Pending review",
            reason: "The latest record is blocked and needs operational review.",
            occurredAt: latest.testDate,
          }
        : {
            state,
            label: "Completed",
            reason: "The latest record is scored under its stored authority versions.",
            occurredAt: latest.testDate,
          };

  const nextAction = input.canWrite && latest && state !== "completed"
    ? { label: "Review current record", href: `/data-entry/biochemistry/${latest.id}` }
    : input.canWrite && !latest
      ? { label: "Capture biochemistry", href: "/data-entry/biochemistry" }
      : { label: "Open horse workspace", href: `/portal/horses/${input.horseId}` };

  return { workflow, nextAction, sortRank: stateRank[state] };
}

export function compareOperationalHorses(
  a: { id: string; name: string; stableName: string | null; operational: OperationalSummary },
  b: { id: string; name: string; stableName: string | null; operational: OperationalSummary },
) {
  return (
    a.operational.sortRank - b.operational.sortRank ||
    a.name.localeCompare(b.name, "en-AU", { sensitivity: "base" }) ||
    (a.stableName ?? "").localeCompare(b.stableName ?? "", "en-AU", { sensitivity: "base" }) ||
    a.id.localeCompare(b.id)
  );
}
