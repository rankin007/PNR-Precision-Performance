import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { compareOperationalHorses, deriveOperationalSummary, resolveHorseDetailWorkflow, type OperationalSummary, type RecentTestSnapshot } from "@/lib/domain/stable-workspace";

export type HorseSummary = {
  id: string;
  name: string;
  status: string | null;
  stableName: string | null;
  operational?: OperationalSummary;
  lastActivity?: string | null;
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
  if (Array.isArray(stables)) {
    return stables[0]?.name ?? null;
  }

  if (stables && typeof stables === "object" && "name" in stables) {
    return (stables as { name?: string | null }).name ?? null;
  }

  return null;
}

export async function getAccessibleHorseSummaries() {
  if (!hasSupabaseEnv()) {
    return {
      envReady: false,
      horses: [] as HorseSummary[],
    };
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("horses")
    .select("id, name, status, stables(name)")
    .order("name");

  if (error) {
    return {
      envReady: true,
      horses: [] as HorseSummary[],
      error: error.message,
    };
  }

  return {
    envReady: true,
    horses:
      (data as HorseSummaryRow[] | null)?.map((horse) => ({
        id: horse.id,
        name: horse.name,
        status: horse.status ?? null,
        stableName: extractStableName(horse.stables),
      })) ?? [],
  };
}

type TestSummaryRow = { id: string; horse_id: string; test_date: string; scoring_status: RecentTestSnapshot["scoringStatus"]; health_score: number | null; formula_version: string; lookup_source_version: string };

type HorseDetailRow = HorseSummaryRow & {
  breed?: string | null;
  colour?: string | null;
  date_of_birth?: string | null;
};

export function composeAccessibleHorseDetail(input: {
  horseId: string;
  canWrite: boolean;
  horse: HorseDetailRow | null;
  horseError: unknown;
  biochemistryRows: TestSummaryRow[] | null;
  biochemistryError: unknown;
}) {
  const tests = (input.biochemistryRows ?? []).map((row) => ({
    id: row.id,
    horseId: row.horse_id,
    testDate: row.test_date,
    scoringStatus: row.scoring_status,
    healthScore: row.health_score,
    formulaVersion: row.formula_version,
    sourceVersion: row.lookup_source_version,
  }));
  const workflow = resolveHorseDetailWorkflow({
    horseAccessible: !input.horseError && Boolean(input.horse),
    biochemistryError: input.biochemistryError,
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

export async function getStableWorkspaceOverview(canWrite: boolean) {
  const base = await getAccessibleHorseSummaries();
  if (!base.envReady || base.horses.length === 0 || "error" in base) return { ...base, horses: base.horses.map((horse) => ({ ...horse, lastActivity: null, operational: deriveOperationalSummary({ horseId: horse.id, tests: [], canWrite }) })) };
  const supabase = await createSupabaseServerClient();
  const horseIds = base.horses.slice(0, 100).map((horse) => horse.id);
  const { data, error } = await supabase.from("biochemistry_tests").select("id,horse_id,test_date,scoring_status,health_score,formula_version,lookup_source_version").in("horse_id", horseIds).is("deleted_at", null).order("test_date", { ascending: false }).limit(200);
  if (error) return { ...base, horses: [], error: "Biochemistry workflow information could not be loaded." };
  const rows = (data ?? []) as TestSummaryRow[];
  const horses = base.horses.slice(0, 100).map((horse) => {
    const tests = rows.filter((row) => row.horse_id === horse.id).slice(0, 2).map((row) => ({ id: row.id, horseId: row.horse_id, testDate: row.test_date, scoringStatus: row.scoring_status, healthScore: row.health_score, formulaVersion: row.formula_version, sourceVersion: row.lookup_source_version }));
    return { ...horse, lastActivity: tests[0]?.testDate ?? null, operational: deriveOperationalSummary({ horseId: horse.id, tests, canWrite }) };
  });
  return { ...base, horses: horses.sort(compareOperationalHorses) };
}

export async function getAccessibleHorseDetail(horseId: string, canWrite = false) {
  if (!hasSupabaseEnv()) {
    return {
      envReady: false,
      horse: null,
    };
  }

  const supabase = await createSupabaseServerClient();

  const [
    { data: horse, error: horseError },
    { data: biochemistryRows, error: biochemistryError },
  ] =
    await Promise.all([
      supabase
        .from("horses")
        .select("id, name, status, breed, colour, date_of_birth, stables(name)")
        .eq("id", horseId)
        .maybeSingle(),
      supabase.from("biochemistry_tests").select("id,horse_id,test_date,scoring_status,health_score,formula_version,lookup_source_version").eq("horse_id", horseId).is("deleted_at", null).order("test_date", { ascending: false }).limit(2),
    ]);

  return composeAccessibleHorseDetail({
    horseId,
    canWrite,
    horse: horse as HorseDetailRow | null,
    horseError,
    biochemistryRows: (biochemistryRows ?? null) as TestSummaryRow[] | null,
    biochemistryError,
  });
}
