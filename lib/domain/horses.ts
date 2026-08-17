import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  compareOperationalHorses,
  deriveCockpitSummary,
  deriveOperationalSummary,
  deriveStableWorkspaceState,
  resolveHorseDetailWorkflow,
  type CockpitSummary,
  type OperationalSummary,
  type RecentTestSnapshot,
} from "@/lib/domain/stable-workspace";
import {
  loadCompleteTrendHistory,
  resolveAccessibleHorseId,
  validateTrendPreferenceConfig,
  validateTrendPreferenceLabel,
  type RawBiochemistryTrendRow,
  type TrendPreference,
  type TrendRangeDays,
} from "@/lib/domain/biochemistry-trends";

export type HorseSummary = {
  id: string;
  name: string;
  status: string | null;
  stableName: string | null;
  operational?: OperationalSummary;
  lastActivity?: string | null;
};

export type StableWorkspaceHorse = HorseSummary & {
  operational: OperationalSummary;
  lastActivity: string | null;
};

export type StableWorkspaceOverview = {
  envReady: boolean;
  horses: StableWorkspaceHorse[];
  cockpit: CockpitSummary | null;
  error?: string;
};

export type HorseDetail = HorseSummary & {
  breed: string | null;
  colour: string | null;
  dateOfBirth: string | null;
  latestBiochemistry: RecentTestSnapshot | null;
  operational: OperationalSummary;
};

type HorseSummaryRow = {
  id: string;
  name: string;
  status: string | null;
  stables?: { name?: string | null } | Array<{ name?: string | null }> | null;
};

function extractStableName(stables: unknown) {
  if (Array.isArray(stables)) return stables[0]?.name ?? null;
  if (stables && typeof stables === "object" && "name" in stables) {
    return (stables as { name?: string | null }).name ?? null;
  }
  return null;
}

export async function getAccessibleHorseSummaries() {
  if (!hasSupabaseEnv()) return { envReady: false, horses: [] as HorseSummary[] };
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("horses").select("id, name, status, stables(name)").order("name");
  if (error) return { envReady: true, horses: [] as HorseSummary[], error: error.message };
  return {
    envReady: true,
    horses: (data as HorseSummaryRow[] | null)?.map((horse) => ({
      id: horse.id,
      name: horse.name,
      status: horse.status ?? null,
      stableName: extractStableName(horse.stables),
    })) ?? [],
  };
}

export type TestSummaryRow = {
  id: string;
  horse_id: string;
  test_date: string;
  scoring_status: RecentTestSnapshot["scoringStatus"];
  health_score: number | null;
  hydration_score: number | null;
  formula_version: string;
  lookup_source_version: string;
};

type HorseDetailRow = HorseSummaryRow & {
  breed?: string | null;
  colour?: string | null;
  date_of_birth?: string | null;
};

function toSnapshot(row: TestSummaryRow): RecentTestSnapshot {
  return {
    id: row.id,
    horseId: row.horse_id,
    testDate: row.test_date,
    hydrationScore: row.hydration_score,
    scoringStatus: row.scoring_status,
    healthScore: row.health_score,
    formulaVersion: row.formula_version,
    sourceVersion: row.lookup_source_version,
  };
}

export function composeAccessibleHorseDetail(input: {
  horseId: string;
  canWrite: boolean;
  horse: HorseDetailRow | null;
  horseError: unknown;
  biochemistryRows: TestSummaryRow[] | null;
  biochemistryError: unknown;
  permissionError?: unknown;
}) {
  const tests = (input.biochemistryRows ?? []).map(toSnapshot);
  const workflow = resolveHorseDetailWorkflow({
    horseAccessible: !input.horseError && Boolean(input.horse),
    biochemistryError: input.biochemistryError,
    permissionError: input.permissionError,
    tests,
    horseId: input.horseId,
    canWrite: input.canWrite,
  });
  if (workflow.availability === "denied" || !input.horse) {
    return { envReady: true, horse: null, error: workflow.error };
  }
  return {
    envReady: true,
    horse: {
      id: input.horse.id,
      name: input.horse.name,
      status: input.horse.status ?? null,
      stableName: extractStableName(input.horse.stables),
      breed: input.horse.breed ?? null,
      colour: input.horse.colour ?? null,
      dateOfBirth: input.horse.date_of_birth ?? null,
      latestBiochemistry: input.biochemistryError ? null : tests[0] ?? null,
      operational: workflow.operational,
    } satisfies HorseDetail,
    ...(workflow.error ? { error: workflow.error } : {}),
  };
}

export function composeStableWorkspaceOverview(input: {
  horses: HorseSummary[];
  rowResults: Array<{ data: TestSummaryRow[] | null; error: unknown }>;
  permissionResults: Array<{ data: boolean | null; error: unknown }>;
  reference?: Date;
}): StableWorkspaceOverview {
  const result = deriveStableWorkspaceState({
    horses: input.horses,
    rowResults: input.rowResults.map((rowResult) => ({
      tests: (rowResult.data ?? []).map(toSnapshot),
      error: rowResult.error,
    })),
    permissionResults: input.permissionResults,
    reference: input.reference,
  });
  return { envReady: true, ...result };
}
export async function getStableWorkspaceOverview(
  canWrite: boolean,
  reference: Date = new Date(),
): Promise<StableWorkspaceOverview> {
  const base = await getAccessibleHorseSummaries();
  if (!base.envReady) return { envReady: false, horses: [], cockpit: null };
  if ("error" in base) {
    return { envReady: true, horses: [], cockpit: null, error: "Biochemistry workflow information could not be loaded." };
  }
  const includedHorses = base.horses;
  if (includedHorses.length === 0) {
    return { envReady: true, horses: [], cockpit: deriveCockpitSummary([], reference) };
  }

  const supabase = await createSupabaseServerClient();
  const rowResults = await Promise.all(includedHorses.map((horse) =>
    supabase
      .from("biochemistry_tests")
      .select("id,horse_id,test_date,scoring_status,hydration_score,health_score,formula_version,lookup_source_version")
      .eq("horse_id", horse.id)
      .is("deleted_at", null)
      .order("test_date", { ascending: false })
      .order("id", { ascending: false })
      .limit(2)
  ));
  if (rowResults.some((result) => result.error)) {
    return { envReady: true, horses: [], cockpit: null, error: "Biochemistry workflow information could not be loaded." };
  }

  const permissionResults = canWrite
    ? await Promise.all(includedHorses.map((horse) =>
        supabase.rpc("can_write_biochemistry_horse", { target_horse_id: horse.id })
      ))
    : includedHorses.map(() => ({ data: false, error: null }));
  if (permissionResults.some((result) => result.error)) {
    return { envReady: true, horses: [], cockpit: null, error: "Biochemistry workflow information could not be loaded." };
  }

  const horses = includedHorses.map((horse, index) => {
    const tests = ((rowResults[index]?.data ?? []) as TestSummaryRow[]).map(toSnapshot);
    return {
      ...horse,
      lastActivity: tests[0]?.testDate ?? null,
      operational: deriveOperationalSummary({
        horseId: horse.id,
        tests,
        canWrite: permissionResults[index]?.data === true,
      }),
    };
  }).sort(compareOperationalHorses);

  return { envReady: true, horses, cockpit: deriveCockpitSummary(horses, reference) };
}

export async function getAccessibleHorseDetail(horseId: string, canWrite = false) {
  if (!hasSupabaseEnv()) return { envReady: false, horse: null };
  const supabase = await createSupabaseServerClient();
  const [{ data: horse, error: horseError }, { data: biochemistryRows, error: biochemistryError }, writeAccess] =
    await Promise.all([
      supabase
        .from("horses")
        .select("id, name, status, breed, colour, date_of_birth, stables(name)")
        .eq("id", horseId)
        .maybeSingle(),
      supabase
        .from("biochemistry_tests")
        .select("id,horse_id,test_date,scoring_status,hydration_score,health_score,formula_version,lookup_source_version")
        .eq("horse_id", horseId)
        .is("deleted_at", null)
        .order("test_date", { ascending: false })
        .order("id", { ascending: false })
        .limit(2),
      canWrite
        ? supabase.rpc("can_write_biochemistry_horse", { target_horse_id: horseId })
        : Promise.resolve({ data: false, error: null }),
    ]);

  return composeAccessibleHorseDetail({
    horseId,
    canWrite: !writeAccess.error && writeAccess.data === true,
    horse: horse as HorseDetailRow | null,
    horseError,
    biochemistryRows: (biochemistryRows ?? null) as TestSummaryRow[] | null,
    biochemistryError,
    permissionError: canWrite ? writeAccess.error : null,
  });
}

const TREND_ROW_SELECT = [
  "id",
  "horse_id",
  "test_date",
  "time_of_day",
  "scoring_status",
  "hydration_score",
  "health_score",
  "carbs_reading",
  "ph_urine",
  "ph_saliva",
  "conductivity_raw_meter_value",
  "formula_version",
  "lookup_source_document",
  "lookup_source_version",
].join(",");

export async function getAccessibleHorseTrendHistory(
  horseHint: unknown,
  rangeDays: TrendRangeDays,
  reference: Date = new Date(),
) {
  const base = await getAccessibleHorseSummaries();
  if (!base.envReady) {
    return {
      envReady: false,
      horses: base.horses,
      selectedHorse: null,
      history: { availability: "unavailable", selectedHorseId: null, error: "Trend history is unavailable." } as const,
    };
  }
  if ("error" in base) {
    return {
      envReady: true,
      horses: base.horses,
      selectedHorse: null,
      history: { availability: "unavailable", selectedHorseId: null, error: "Trend history is unavailable." } as const,
    };
  }

  const selectedHorseId = resolveAccessibleHorseId(base.horses.map((horse) => horse.id), horseHint);
  if (!selectedHorseId) {
    return {
      envReady: true,
      horses: base.horses,
      selectedHorse: null,
      history: { availability: "selection-required", selectedHorseId: null } as const,
    };
  }

  const supabase = await createSupabaseServerClient();
  const history = await loadCompleteTrendHistory({
    accessibleHorseIds: base.horses.map((horse) => horse.id),
    horseHint: selectedHorseId,
    rangeDays,
    reference,
    loadPage: async ({ offset, limit, horseId, startDate, endDate }) => {
      const result = await supabase
        .from("biochemistry_tests")
        .select(TREND_ROW_SELECT, { count: "exact" })
        .eq("horse_id", horseId)
        .is("deleted_at", null)
        .gte("test_date", startDate)
        .lte("test_date", endDate)
        .order("test_date", { ascending: false })
        .order("time_of_day", { ascending: false })
        .order("id", { ascending: false })
        .range(offset, offset + limit - 1);
      return {
        data: (result.data ?? null) as RawBiochemistryTrendRow[] | null,
        count: result.count,
        error: result.error,
      };
    },
  });

  return {
    envReady: true,
    horses: base.horses,
    selectedHorse: base.horses.find((horse) => horse.id === selectedHorseId) ?? null,
    history,
  };
}

export async function getTrendViewPreferences(appUserId: string | null) {
  if (!hasSupabaseEnv() || !appUserId) {
    return { preferences: [] as TrendPreference[], error: "Saved chart views are unavailable." };
  }
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("user_trend_view_preferences")
    .select("id,label,score_view,ph_view,show_carbohydrate,show_conductivity,time_filter,range_days,is_default")
    .eq("user_id", appUserId)
    .order("is_default", { ascending: false })
    .order("updated_at", { ascending: false })
    .order("id", { ascending: true });
  if (error || !Array.isArray(data)) return { preferences: [] as TrendPreference[], error: "Saved chart views are unavailable." };

  const preferences: TrendPreference[] = [];
  for (const row of data) {
    const label = validateTrendPreferenceLabel(row.label);
    const config = validateTrendPreferenceConfig({
      scoreView: row.score_view,
      phView: row.ph_view,
      showCarbohydrate: row.show_carbohydrate,
      showConductivity: row.show_conductivity,
      timeFilter: row.time_filter,
      rangeDays: row.range_days,
    });
    if (typeof row.id !== "string" || !label || !config || typeof row.is_default !== "boolean") {
      return { preferences: [] as TrendPreference[], error: "A saved chart view is invalid." };
    }
    preferences.push({ id: row.id, label, isDefault: row.is_default, ...config });
  }
  return { preferences };
}
