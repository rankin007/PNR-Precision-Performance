import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { deriveOperationalSummary, type OperationalSummary, type RecentTestSnapshot } from "@/lib/domain/stable-workspace";

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

const fallbackHorses: HorseSummary[] = [
  {
    id: "sample-horse-1",
    name: "Northern Comet",
    status: "active",
    stableName: "Sample Stable",
  },
  {
    id: "sample-horse-2",
    name: "Velvet Charge",
    status: "active",
    stableName: "Sample Stable",
  },
];

const fallbackHorseDetails: Record<string, HorseDetail> = {
  "sample-horse-1": {
    id: "sample-horse-1",
    name: "Northern Comet",
    status: "active",
    stableName: "Sample Stable",
    breed: "Thoroughbred",
    colour: "Bay",
    dateOfBirth: "2021-09-12",
    recentMetrics: [
      { label: "Latest temperature", value: "37.8 C" },
      { label: "Latest weight", value: "482.0 kg" },
      { label: "Latest water intake", value: "26.5 L" },
    ],
    recentTimeline: [
      { date: "2026-04-14", summary: "Morning monitoring completed with steady hydration and normal temperature." },
      { date: "2026-04-13", summary: "Track session recorded with stable recovery notes." },
      { date: "2026-04-12", summary: "Feeding and weight check completed without issue." },
    ],
    latestBiochemistry: null,
    operational: deriveOperationalSummary({ horseId: "sample-horse-1", tests: [], canWrite: false }),
  },
  "sample-horse-2": {
    id: "sample-horse-2",
    name: "Velvet Charge",
    status: "active",
    stableName: "Sample Stable",
    breed: "Thoroughbred",
    colour: "Chestnut",
    dateOfBirth: "2020-10-04",
    recentMetrics: [
      { label: "Latest temperature", value: "37.6 C" },
      { label: "Latest weight", value: "468.4 kg" },
      { label: "Latest water intake", value: "24.0 L" },
    ],
    recentTimeline: [
      { date: "2026-04-14", summary: "Daily record captured with normal observations." },
      { date: "2026-04-13", summary: "Track work logged with distance and context notes." },
      { date: "2026-04-12", summary: "Water intake and feeding notes updated." },
    ],
    latestBiochemistry: null,
    operational: deriveOperationalSummary({ horseId: "sample-horse-2", tests: [], canWrite: false }),
  },
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
      horses: fallbackHorses,
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
      horse: fallbackHorseDetails[horseId] ?? null,
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
      error: horseError?.message ?? "Horse not found.",
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
