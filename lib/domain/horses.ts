import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { deriveOperationalSummary, type OperationalSummary, type RecentTestSnapshot } from "@/lib/domain/stable-workspace";
import { composeHorseAccessPresentation } from "@/lib/domain/trainer-journey";

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
  recentMetrics: Array<{
    label: string;
    value: string;
  }>;
  recentTimeline: Array<{
    date: string;
    summary: string;
  }>;
  latestBiochemistry: RecentTestSnapshot | null;
  operational: OperationalSummary;
};

type HorseSummaryRow = {
  id: string;
  name: string;
  status: string | null;
  stables?: { name?: string | null } | Array<{ name?: string | null }> | null;
};

type HorseTimelineRow = {
  record_date: string;
  notes: string | null;
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
      presentation: composeHorseAccessPresentation({ envReady: false, horseCount: 0 }),
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
      error: "Assigned horse data could not be loaded.",
      presentation: composeHorseAccessPresentation({ envReady: true, queryFailed: true, horseCount: 0 }),
    };
  }

  const horses = (data as HorseSummaryRow[] | null)?.map((horse) => ({
    id: horse.id,
    name: horse.name,
    status: horse.status ?? null,
    stableName: extractStableName(horse.stables),
  })) ?? [];

  return { envReady: true, horses, presentation: composeHorseAccessPresentation({ envReady: true, horseCount: horses.length }) };
}

type TestSummaryRow = { id: string; horse_id: string; test_date: string; scoring_status: RecentTestSnapshot["scoringStatus"]; health_score: number | null; formula_version: string; lookup_source_version: string };

export async function getStableWorkspaceOverview(canWrite: boolean) {
  const base = await getAccessibleHorseSummaries();
  if (!base.envReady || base.horses.length === 0 || "error" in base) return { ...base, horses: base.horses.map((horse) => ({ ...horse, lastActivity: null, operational: deriveOperationalSummary({ horseId: horse.id, tests: [], canWrite }) })) };
  const supabase = await createSupabaseServerClient();
  const horseIds = base.horses.slice(0, 100).map((horse) => horse.id);
  const { data, error } = await supabase.from("biochemistry_tests").select("id,horse_id,test_date,scoring_status,health_score,formula_version,lookup_source_version").in("horse_id", horseIds).is("deleted_at", null).order("test_date", { ascending: false }).limit(200);
  if (error) return { ...base, horses: [], error: error.message };
  const rows = (data ?? []) as TestSummaryRow[];
  return { ...base, horses: base.horses.slice(0, 100).map((horse) => {
    const tests = rows.filter((row) => row.horse_id === horse.id).slice(0, 2).map((row) => ({ id: row.id, horseId: row.horse_id, testDate: row.test_date, scoringStatus: row.scoring_status, healthScore: row.health_score, formulaVersion: row.formula_version, sourceVersion: row.lookup_source_version }));
    return { ...horse, lastActivity: tests[0]?.testDate ?? null, operational: deriveOperationalSummary({ horseId: horse.id, tests, canWrite }) };
  }) };
}

export async function getAccessibleHorseDetail(horseId: string, canWrite = false) {
  if (!hasSupabaseEnv()) {
    return {
      envReady: false,
      horse: null,
      state: "unavailable" as const,
    };
  }

  const supabase = await createSupabaseServerClient();

  const [
    { data: horse, error: horseError },
    { data: temperatures },
    { data: weights },
    { data: waters },
    { data: dailyRecords }, { data: biochemistryRows },
  ] =
    await Promise.all([
      supabase
        .from("horses")
        .select("id, name, status, breed, colour, date_of_birth, stables(name)")
        .eq("id", horseId)
        .maybeSingle(),
      supabase
        .from("temperature_logs")
        .select("temperature_value, temperature_unit, recorded_at")
        .eq("horse_id", horseId)
        .order("recorded_at", { ascending: false })
        .limit(1),
      supabase
        .from("weight_logs")
        .select("weight_value, weight_unit, recorded_at")
        .eq("horse_id", horseId)
        .order("recorded_at", { ascending: false })
        .limit(1),
      supabase
        .from("water_intake_logs")
        .select("volume_value, volume_unit, recorded_at")
        .eq("horse_id", horseId)
        .order("recorded_at", { ascending: false })
        .limit(1),
      supabase
        .from("daily_records")
        .select("record_date, notes")
        .eq("horse_id", horseId)
        .order("record_date", { ascending: false })
        .limit(5),
      supabase.from("biochemistry_tests").select("id,horse_id,test_date,scoring_status,health_score,formula_version,lookup_source_version").eq("horse_id", horseId).is("deleted_at", null).order("test_date", { ascending: false }).limit(2),
    ]);

  if (horseError || !horse) {
    return {
      envReady: true,
      horse: null,
      error: horseError ? "Horse workspace could not be loaded." : undefined,
      state: horseError ? "failed" as const : "denied" as const,
    };
  }

  const recentMetrics = [
    temperatures?.[0]
      ? {
          label: "Latest temperature",
          value: `${temperatures[0].temperature_value} ${temperatures[0].temperature_unit}`,
        }
      : null,
    weights?.[0]
      ? {
          label: "Latest weight",
          value: `${weights[0].weight_value} ${weights[0].weight_unit}`,
        }
      : null,
    waters?.[0]
      ? {
          label: "Latest water intake",
          value: `${waters[0].volume_value} ${waters[0].volume_unit}`,
        }
      : null,
  ].filter((metric): metric is { label: string; value: string } => Boolean(metric));

  const recentTimeline =
    (dailyRecords as HorseTimelineRow[] | null)?.map((record) => ({
      date: record.record_date,
      summary: record.notes || "Daily record captured.",
    })) ?? [];
  const tests = ((biochemistryRows ?? []) as TestSummaryRow[]).map((row) => ({ id: row.id, horseId: row.horse_id, testDate: row.test_date, scoringStatus: row.scoring_status, healthScore: row.health_score, formulaVersion: row.formula_version, sourceVersion: row.lookup_source_version }));

  return {
    envReady: true,
    horse: {
      id: horse.id,
      name: horse.name,
      status: horse.status ?? null,
      stableName: extractStableName(horse.stables),
      breed: horse.breed ?? null,
      colour: horse.colour ?? null,
      dateOfBirth: horse.date_of_birth ?? null,
      recentMetrics,
      recentTimeline,
      latestBiochemistry: tests[0] ?? null,
      operational: deriveOperationalSummary({ horseId, tests, canWrite }),
    } satisfies HorseDetail,
  };
}
