export type RecentTestSnapshot = {
  id: string;
  horseId: string;
  testDate: string;
  hydrationScore?: number | null;
  scoringStatus: "scored" | "blocked" | "unscored";
  healthScore: number | null;
  formulaVersion: string;
  sourceVersion: string;
};

export type WorkflowState = "no-result" | "draft-incomplete" | "pending-review" | "completed" | "failed";

export type OperationalSummary = {
  workflow: { state: WorkflowState; label: string; reason: string; occurredAt: string | null };
  change: string;
  nextAction: { label: string; href: string } | null;
  sortRank: number;
};

export type CockpitSummary = {
  dateKey: string;
  displayDate: string;
  todayCount: number;
  incompleteCount: number;
  noResultCount: number;
};

export const TRAINER_TIME_ZONE = "Australia/Brisbane";

const stateRank: Record<WorkflowState, number> = {
  "draft-incomplete": 0,
  "pending-review": 1,
  "no-result": 2,
  completed: 3,
  failed: 4,
};

function part(parts: Intl.DateTimeFormatPart[], type: Intl.DateTimeFormatPartTypes) {
  return parts.find((item) => item.type === type)?.value ?? "";
}

export function brisbaneDateKey(reference: Date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TRAINER_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(reference);
  return part(parts, "year") + "-" + part(parts, "month") + "-" + part(parts, "day");
}

export function brisbaneDisplayDate(reference: Date = new Date()) {
  return new Intl.DateTimeFormat("en-AU", {
    timeZone: TRAINER_TIME_ZONE,
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(reference);
}

function workflowStateFor(test: RecentTestSnapshot | undefined): WorkflowState {
  if (!test) return "no-result";
  if (test.scoringStatus === "unscored") return "draft-incomplete";
  if (test.scoringStatus === "blocked") return "pending-review";
  return "completed";
}

export function workflowLabelFor(state: WorkflowState) {
  if (state === "draft-incomplete") return "Draft / incomplete";
  if (state === "pending-review") return "Pending review";
  if (state === "completed") return "Completed";
  if (state === "failed") return "Unavailable";
  return "No result";
}

function captureHref(horseId: string) {
  return "/data-entry/biochemistry?" + new URLSearchParams({ horseId }).toString();
}

export function deriveFailedOperationalSummary(): OperationalSummary {
  return {
    workflow: {
      state: "failed",
      label: "Unavailable",
      reason: "Biochemistry workflow information could not be loaded. No record state or action is inferred.",
      occurredAt: null,
    },
    change: "Workflow comparison unavailable",
    nextAction: null,
    sortRank: stateRank.failed,
  };
}

export function resolveHorseDetailWorkflow(input: {
  horseAccessible: boolean;
  biochemistryError: unknown;
  permissionError?: unknown;
  tests: RecentTestSnapshot[];
  horseId: string;
  canWrite: boolean;
}) {
  if (!input.horseAccessible) return { availability: "denied" as const, error: "Horse not available." };
  if (input.biochemistryError || input.permissionError) {
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
  const previous = tests[1];
  const state = workflowStateFor(latest);
  const previousState = workflowStateFor(previous);
  const workflow = !latest
    ? { state, label: workflowLabelFor(state), reason: "No current biochemistry record is available.", occurredAt: null }
    : state === "draft-incomplete"
      ? { state, label: workflowLabelFor(state), reason: "The latest record is stored but scoring is incomplete.", occurredAt: latest.testDate }
      : state === "pending-review"
        ? { state, label: workflowLabelFor(state), reason: "The latest record is blocked and needs operational review.", occurredAt: latest.testDate }
        : { state, label: workflowLabelFor(state), reason: "The latest record is scored under its stored authority versions.", occurredAt: latest.testDate };

  const change = !previous
    ? "No earlier workflow record for comparison"
    : previousState === state
      ? "Workflow state unchanged"
      : "Changed from " + workflowLabelFor(previousState);

  const nextAction = input.canWrite && latest && state !== "completed"
    ? { label: "Review current record", href: "/data-entry/biochemistry/" + latest.id }
    : input.canWrite
      ? { label: latest ? "Capture another test" : "Capture biochemistry", href: captureHref(input.horseId) }
      : { label: "Open horse workspace", href: "/portal/horses/" + input.horseId };

  return { workflow, change, nextAction, sortRank: stateRank[state] };
}

export function deriveCockpitSummary(
  horses: Array<{ operational: OperationalSummary }>,
  reference: Date = new Date(),
): CockpitSummary {
  const dateKey = brisbaneDateKey(reference);
  return {
    dateKey,
    displayDate: brisbaneDisplayDate(reference),
    todayCount: horses.filter((horse) => horse.operational.workflow.occurredAt === dateKey).length,
    incompleteCount: horses.filter((horse) =>
      horse.operational.workflow.state === "draft-incomplete"
      || horse.operational.workflow.state === "pending-review"
    ).length,
    noResultCount: horses.filter((horse) => horse.operational.workflow.state === "no-result").length,
  };
}

export function deriveStableWorkspaceState<T extends { id: string; name: string; stableName: string | null }>(input: {
  horses: T[];
  rowResults: Array<{ tests: RecentTestSnapshot[]; error: unknown }>;
  permissionResults: Array<{ data: boolean | null; error: unknown }>;
  reference?: Date;
}) {
  if (
    input.rowResults.length !== input.horses.length
    || input.permissionResults.length !== input.horses.length
    || input.rowResults.some((result) => result.error)
    || input.permissionResults.some((result) => result.error)
  ) {
    return {
      horses: [] as Array<T & { lastActivity: string | null; operational: OperationalSummary }>,
      cockpit: null,
      error: "Biochemistry workflow information could not be loaded.",
    };
  }

  const horses = input.horses.map((horse, index) => {
    const tests = input.rowResults[index].tests.slice(0, 2);
    return {
      ...horse,
      lastActivity: tests[0]?.testDate ?? null,
      operational: deriveOperationalSummary({
        horseId: horse.id,
        tests,
        canWrite: input.permissionResults[index]?.data === true,
      }),
    };
  }).sort(compareOperationalHorses);

  return { horses, cockpit: deriveCockpitSummary(horses, input.reference) };
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
export function projectStoredScores(test: RecentTestSnapshot | null) {
  if (!test) {
    return {
      availability: "unavailable" as const,
      scoringStatus: null,
      hydrationScore: null,
      biochemistryTrendScore: null,
      formulaVersion: null,
      sourceVersion: null,
    };
  }
  const scored = test.scoringStatus === "scored";
  return {
    availability: "available" as const,
    scoringStatus: test.scoringStatus,
    hydrationScore: scored ? test.hydrationScore ?? null : null,
    biochemistryTrendScore: scored ? test.healthScore : null,
    formulaVersion: test.formulaVersion,
    sourceVersion: test.sourceVersion,
  };
}
